var Jl = Object.defineProperty;
var Ql = (t, e, n) => e in t ? Jl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var re = (t, e, n) => Ql(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as p, jsxs as O, Fragment as Kt } from "react/jsx-runtime";
import zt, { createContext as Yr, useContext as Xr, useState as Ee, useRef as pe, useEffect as Me, useMemo as Be, useCallback as ue, Component as oa, memo as Jr, forwardRef as Cr, useImperativeHandle as xo } from "react";
import { createPortal as ec } from "react-dom";
const ze = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, vt = {
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
}, Mi = (t) => t === ze.SUBMITTED || t === ze.STREAMING, I0 = (t) => t === ze.IDLE, N0 = (t) => t === ze.ERROR, A0 = (t) => t === lt.PROCESSING, O0 = (t) => t === lt.COMPLETED, M0 = (t) => t === lt.ERROR;
var tc = /* @__PURE__ */ ((t) => (t.BRAND = "BRAND", t.ACCOUNT = "ACCOUNT", t.USER = "USER", t))(tc || {}), et = /* @__PURE__ */ ((t) => (t.DISCONNECTED = "disconnected", t.CONNECTING = "connecting", t.CONNECTED = "connected", t.RECONNECTING = "reconnecting", t))(et || {}), Ne;
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
})(Ne || (Ne = {}));
var Aa;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Aa || (Aa = {}));
const ae = Ne.arrayToEnum([
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
]), ln = (t) => {
  switch (typeof t) {
    case "undefined":
      return ae.undefined;
    case "string":
      return ae.string;
    case "number":
      return Number.isNaN(t) ? ae.nan : ae.number;
    case "boolean":
      return ae.boolean;
    case "function":
      return ae.function;
    case "bigint":
      return ae.bigint;
    case "symbol":
      return ae.symbol;
    case "object":
      return Array.isArray(t) ? ae.array : t === null ? ae.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? ae.promise : typeof Map < "u" && t instanceof Map ? ae.map : typeof Set < "u" && t instanceof Set ? ae.set : typeof Date < "u" && t instanceof Date ? ae.date : ae.object;
    default:
      return ae.unknown;
  }
}, B = Ne.arrayToEnum([
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
    return JSON.stringify(this.issues, Ne.jsonStringifyReplacer, 2);
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
    case B.invalid_type:
      t.received === ae.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case B.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, Ne.jsonStringifyReplacer)}`;
      break;
    case B.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Ne.joinValues(t.keys, ", ")}`;
      break;
    case B.invalid_union:
      n = "Invalid input";
      break;
    case B.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Ne.joinValues(t.options)}`;
      break;
    case B.invalid_enum_value:
      n = `Invalid enum value. Expected ${Ne.joinValues(t.options)}, received '${t.received}'`;
      break;
    case B.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case B.invalid_return_type:
      n = "Invalid function return type";
      break;
    case B.invalid_date:
      n = "Invalid date";
      break;
    case B.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : Ne.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case B.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case B.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case B.custom:
      n = "Invalid input";
      break;
    case B.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case B.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case B.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, Ne.assertNever(t);
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
function ee(t, e) {
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
class Et {
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
        return Ce;
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
    return Et.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const i of n) {
      const { key: a, value: s } = i;
      if (a.status === "aborted" || s.status === "aborted")
        return Ce;
      a.status === "dirty" && e.dirty(), s.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof s.value < "u" || i.alwaysSet) && (r[a.value] = s.value);
    }
    return { status: e.value, value: r };
  }
}
const Ce = Object.freeze({
  status: "aborted"
}), or = (t) => ({ status: "dirty", value: t }), Mt = (t) => ({ status: "valid", value: t }), Oa = (t) => t.status === "aborted", Ma = (t) => t.status === "dirty", Fn = (t) => t.status === "valid", Fr = (t) => typeof Promise < "u" && t instanceof Promise;
var le;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(le || (le = {}));
class dn {
  constructor(e, n, r, i) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const La = (t, e) => {
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
function be(t) {
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
class Ie {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return ln(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: ln(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new Et(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: ln(e.data),
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
      parsedType: ln(e)
    }, i = this._parseSync({ data: e, path: r.path, parent: r });
    return La(r, i);
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
      parsedType: ln(e)
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
      parsedType: ln(e)
    }, i = this._parse({ data: e, path: r.path, parent: r }), a = await (Fr(i) ? i : Promise.resolve(i));
    return La(r, a);
  }
  refine(e, n) {
    const r = (i) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(i) : n;
    return this._refinement((i, a) => {
      const s = e(i), o = () => a.addIssue({
        code: B.custom,
        ...r(i)
      });
      return typeof Promise < "u" && s instanceof Promise ? s.then((l) => l ? !0 : (o(), !1)) : s ? !0 : (o(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, i) => e(r) ? !0 : (i.addIssue(typeof n == "function" ? n(r, i) : n), !1));
  }
  _refinement(e) {
    return new Un({
      schema: this,
      typeName: Z.ZodEffects,
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
    return un.create(this, this._def);
  }
  nullable() {
    return Hn.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Yt.create(this);
  }
  promise() {
    return $r.create(this, this._def);
  }
  or(e) {
    return Ur.create([this, e], this._def);
  }
  and(e) {
    return Hr.create(this, e, this._def);
  }
  transform(e) {
    return new Un({
      ...be(this._def),
      schema: this,
      typeName: Z.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Fi({
      ...be(this._def),
      innerType: this,
      defaultValue: n,
      typeName: Z.ZodDefault
    });
  }
  brand() {
    return new Ec({
      typeName: Z.ZodBranded,
      type: this,
      ...be(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new zi({
      ...be(this._def),
      innerType: this,
      catchValue: n,
      typeName: Z.ZodCatch
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
    return Ui.create(this);
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
const fc = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, gc = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, mc = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, yc = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, wc = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Cc = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ko = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", xc = new RegExp(`^${ko}$`);
function _o(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function kc(t) {
  return new RegExp(`^${_o(t)}$`);
}
function _c(t) {
  let e = `${ko}T${_o(t)}`;
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
class cn extends Ie {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== ae.string) {
      const a = this._getOrReturnCtx(e);
      return ee(a, {
        code: B.invalid_type,
        expected: ae.string,
        received: a.parsedType
      }), Ce;
    }
    const r = new Et();
    let i;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (i = this._getOrReturnCtx(e, i), ee(i, {
          code: B.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (i = this._getOrReturnCtx(e, i), ee(i, {
          code: B.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const s = e.data.length > a.value, o = e.data.length < a.value;
        (s || o) && (i = this._getOrReturnCtx(e, i), s ? ee(i, {
          code: B.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && ee(i, {
          code: B.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        hc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "email",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        oi || (oi = new RegExp(pc, "u")), oi.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "emoji",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        lc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "uuid",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        cc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "nanoid",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        ac.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "cuid",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        sc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "cuid2",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        oc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
          validation: "ulid",
          code: B.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), ee(i, {
            validation: "url",
            code: B.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "regex",
        code: B.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? _c(a).test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? xc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? kc(a).test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? dc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "duration",
        code: B.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Sc(e.data, a.version) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "ip",
        code: B.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? bc(e.data, a.alg) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "jwt",
        code: B.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? vc(e.data, a.version) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "cidr",
        code: B.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? wc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "base64",
        code: B.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? Cc.test(e.data) || (i = this._getOrReturnCtx(e, i), ee(i, {
        validation: "base64url",
        code: B.invalid_string,
        message: a.message
      }), r.dirty()) : Ne.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((i) => e.test(i), {
      validation: n,
      code: B.invalid_string,
      ...le.errToObj(r)
    });
  }
  _addCheck(e) {
    return new cn({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...le.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...le.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...le.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...le.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...le.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...le.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...le.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...le.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...le.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...le.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...le.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...le.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...le.errToObj(e) });
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
      ...le.errToObj(e == null ? void 0 : e.message)
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
      ...le.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...le.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...le.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...le.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...le.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...le.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...le.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...le.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...le.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, le.errToObj(e));
  }
  trim() {
    return new cn({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new cn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new cn({
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
cn.create = (t) => new cn({
  checks: [],
  typeName: Z.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...be(t)
});
function Tc(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, i = n > r ? n : r, a = Number.parseInt(t.toFixed(i).replace(".", "")), s = Number.parseInt(e.toFixed(i).replace(".", ""));
  return a % s / 10 ** i;
}
class pr extends Ie {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== ae.number) {
      const a = this._getOrReturnCtx(e);
      return ee(a, {
        code: B.invalid_type,
        expected: ae.number,
        received: a.parsedType
      }), Ce;
    }
    let r;
    const i = new Et();
    for (const a of this._def.checks)
      a.kind === "int" ? Ne.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), i.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), i.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), i.dirty()) : a.kind === "multipleOf" ? Tc(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), i.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.not_finite,
        message: a.message
      }), i.dirty()) : Ne.assertNever(a);
    return { status: i.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, le.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, le.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, le.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, le.toString(n));
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
          message: le.toString(i)
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
      message: le.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: le.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: le.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: le.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: le.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: le.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: le.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: le.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: le.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Ne.isInteger(e.value));
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
  typeName: Z.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...be(t)
});
class fr extends Ie {
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
    if (this._getType(e) !== ae.bigint)
      return this._getInvalidInput(e);
    let r;
    const i = new Et();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), i.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), i.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), ee(r, {
        code: B.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), i.dirty()) : Ne.assertNever(a);
    return { status: i.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return ee(n, {
      code: B.invalid_type,
      expected: ae.bigint,
      received: n.parsedType
    }), Ce;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, le.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, le.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, le.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, le.toString(n));
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
          message: le.toString(i)
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
      message: le.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: le.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: le.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: le.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: le.toString(n)
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
  typeName: Z.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...be(t)
});
class Pi extends Ie {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== ae.boolean) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        code: B.invalid_type,
        expected: ae.boolean,
        received: r.parsedType
      }), Ce;
    }
    return Mt(e.data);
  }
}
Pi.create = (t) => new Pi({
  typeName: Z.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...be(t)
});
class zr extends Ie {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== ae.date) {
      const a = this._getOrReturnCtx(e);
      return ee(a, {
        code: B.invalid_type,
        expected: ae.date,
        received: a.parsedType
      }), Ce;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return ee(a, {
        code: B.invalid_date
      }), Ce;
    }
    const r = new Et();
    let i;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (i = this._getOrReturnCtx(e, i), ee(i, {
        code: B.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : Ne.assertNever(a);
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
      message: le.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: le.toString(n)
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
  typeName: Z.ZodDate,
  ...be(t)
});
class Pa extends Ie {
  _parse(e) {
    if (this._getType(e) !== ae.symbol) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        code: B.invalid_type,
        expected: ae.symbol,
        received: r.parsedType
      }), Ce;
    }
    return Mt(e.data);
  }
}
Pa.create = (t) => new Pa({
  typeName: Z.ZodSymbol,
  ...be(t)
});
class Da extends Ie {
  _parse(e) {
    if (this._getType(e) !== ae.undefined) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        code: B.invalid_type,
        expected: ae.undefined,
        received: r.parsedType
      }), Ce;
    }
    return Mt(e.data);
  }
}
Da.create = (t) => new Da({
  typeName: Z.ZodUndefined,
  ...be(t)
});
class Fa extends Ie {
  _parse(e) {
    if (this._getType(e) !== ae.null) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        code: B.invalid_type,
        expected: ae.null,
        received: r.parsedType
      }), Ce;
    }
    return Mt(e.data);
  }
}
Fa.create = (t) => new Fa({
  typeName: Z.ZodNull,
  ...be(t)
});
class za extends Ie {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Mt(e.data);
  }
}
za.create = (t) => new za({
  typeName: Z.ZodAny,
  ...be(t)
});
class Ua extends Ie {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Mt(e.data);
  }
}
Ua.create = (t) => new Ua({
  typeName: Z.ZodUnknown,
  ...be(t)
});
class hn extends Ie {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return ee(n, {
      code: B.invalid_type,
      expected: ae.never,
      received: n.parsedType
    }), Ce;
  }
}
hn.create = (t) => new hn({
  typeName: Z.ZodNever,
  ...be(t)
});
class Ha extends Ie {
  _parse(e) {
    if (this._getType(e) !== ae.undefined) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        code: B.invalid_type,
        expected: ae.void,
        received: r.parsedType
      }), Ce;
    }
    return Mt(e.data);
  }
}
Ha.create = (t) => new Ha({
  typeName: Z.ZodVoid,
  ...be(t)
});
class Yt extends Ie {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), i = this._def;
    if (n.parsedType !== ae.array)
      return ee(n, {
        code: B.invalid_type,
        expected: ae.array,
        received: n.parsedType
      }), Ce;
    if (i.exactLength !== null) {
      const s = n.data.length > i.exactLength.value, o = n.data.length < i.exactLength.value;
      (s || o) && (ee(n, {
        code: s ? B.too_big : B.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: s ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), r.dirty());
    }
    if (i.minLength !== null && n.data.length < i.minLength.value && (ee(n, {
      code: B.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), r.dirty()), i.maxLength !== null && n.data.length > i.maxLength.value && (ee(n, {
      code: B.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((s, o) => i.type._parseAsync(new dn(n, s, n.path, o)))).then((s) => Et.mergeArray(r, s));
    const a = [...n.data].map((s, o) => i.type._parseSync(new dn(n, s, n.path, o)));
    return Et.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Yt({
      ...this._def,
      minLength: { value: e, message: le.toString(n) }
    });
  }
  max(e, n) {
    return new Yt({
      ...this._def,
      maxLength: { value: e, message: le.toString(n) }
    });
  }
  length(e, n) {
    return new Yt({
      ...this._def,
      exactLength: { value: e, message: le.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Yt.create = (t, e) => new Yt({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: Z.ZodArray,
  ...be(e)
});
function Mn(t) {
  if (t instanceof tt) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = un.create(Mn(r));
    }
    return new tt({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Yt ? new Yt({
    ...t._def,
    type: Mn(t.element)
  }) : t instanceof un ? un.create(Mn(t.unwrap())) : t instanceof Hn ? Hn.create(Mn(t.unwrap())) : t instanceof bn ? bn.create(t.items.map((e) => Mn(e))) : t;
}
class tt extends Ie {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = Ne.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== ae.object) {
      const u = this._getOrReturnCtx(e);
      return ee(u, {
        code: B.invalid_type,
        expected: ae.object,
        received: u.parsedType
      }), Ce;
    }
    const { status: r, ctx: i } = this._processInputParams(e), { shape: a, keys: s } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof hn && this._def.unknownKeys === "strip"))
      for (const u in i.data)
        s.includes(u) || o.push(u);
    const l = [];
    for (const u of s) {
      const c = a[u], d = i.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: c._parse(new dn(i, d, i.path, u)),
        alwaysSet: u in i.data
      });
    }
    if (this._def.catchall instanceof hn) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const c of o)
          l.push({
            key: { status: "valid", value: c },
            value: { status: "valid", value: i.data[c] }
          });
      else if (u === "strict")
        o.length > 0 && (ee(i, {
          code: B.unrecognized_keys,
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
            new dn(i, d, i.path, c)
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
    }).then((u) => Et.mergeObjectSync(r, u)) : Et.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return le.errToObj, new tt({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var a, s;
          const i = ((s = (a = this._def).errorMap) == null ? void 0 : s.call(a, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: le.errToObj(e).message ?? i
          } : {
            message: i
          };
        }
      } : {}
    });
  }
  strip() {
    return new tt({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new tt({
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
    return new tt({
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
    return new tt({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: Z.ZodObject
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
    return new tt({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of Ne.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new tt({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of Ne.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new tt({
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
    for (const r of Ne.objectKeys(this.shape)) {
      const i = this.shape[r];
      e && !e[r] ? n[r] = i : n[r] = i.optional();
    }
    return new tt({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of Ne.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof un; )
          a = a._def.innerType;
        n[r] = a;
      }
    return new tt({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return So(Ne.objectKeys(this.shape));
  }
}
tt.create = (t, e) => new tt({
  shape: () => t,
  unknownKeys: "strip",
  catchall: hn.create(),
  typeName: Z.ZodObject,
  ...be(e)
});
tt.strictCreate = (t, e) => new tt({
  shape: () => t,
  unknownKeys: "strict",
  catchall: hn.create(),
  typeName: Z.ZodObject,
  ...be(e)
});
tt.lazycreate = (t, e) => new tt({
  shape: t,
  unknownKeys: "strip",
  catchall: hn.create(),
  typeName: Z.ZodObject,
  ...be(e)
});
class Ur extends Ie {
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
      return ee(n, {
        code: B.invalid_union,
        unionErrors: s
      }), Ce;
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
      return ee(n, {
        code: B.invalid_union,
        unionErrors: o
      }), Ce;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ur.create = (t, e) => new Ur({
  options: t,
  typeName: Z.ZodUnion,
  ...be(e)
});
function Di(t, e) {
  const n = ln(t), r = ln(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === ae.object && r === ae.object) {
    const i = Ne.objectKeys(e), a = Ne.objectKeys(t).filter((o) => i.indexOf(o) !== -1), s = { ...t, ...e };
    for (const o of a) {
      const l = Di(t[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      s[o] = l.data;
    }
    return { valid: !0, data: s };
  } else if (n === ae.array && r === ae.array) {
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
  } else return n === ae.date && r === ae.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class Hr extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), i = (a, s) => {
      if (Oa(a) || Oa(s))
        return Ce;
      const o = Di(a.value, s.value);
      return o.valid ? ((Ma(a) || Ma(s)) && n.dirty(), { status: n.value, value: o.data }) : (ee(r, {
        code: B.invalid_intersection_types
      }), Ce);
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
Hr.create = (t, e, n) => new Hr({
  left: t,
  right: e,
  typeName: Z.ZodIntersection,
  ...be(n)
});
class bn extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== ae.array)
      return ee(r, {
        code: B.invalid_type,
        expected: ae.array,
        received: r.parsedType
      }), Ce;
    if (r.data.length < this._def.items.length)
      return ee(r, {
        code: B.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), Ce;
    !this._def.rest && r.data.length > this._def.items.length && (ee(r, {
      code: B.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...r.data].map((s, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new dn(r, s, r.path, o)) : null;
    }).filter((s) => !!s);
    return r.common.async ? Promise.all(a).then((s) => Et.mergeArray(n, s)) : Et.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new bn({
      ...this._def,
      rest: e
    });
  }
}
bn.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new bn({
    items: t,
    typeName: Z.ZodTuple,
    rest: null,
    ...be(e)
  });
};
class $a extends Ie {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== ae.map)
      return ee(r, {
        code: B.invalid_type,
        expected: ae.map,
        received: r.parsedType
      }), Ce;
    const i = this._def.keyType, a = this._def.valueType, s = [...r.data.entries()].map(([o, l], u) => ({
      key: i._parse(new dn(r, o, r.path, [u, "key"])),
      value: a._parse(new dn(r, l, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of s) {
          const u = await l.key, c = await l.value;
          if (u.status === "aborted" || c.status === "aborted")
            return Ce;
          (u.status === "dirty" || c.status === "dirty") && n.dirty(), o.set(u.value, c.value);
        }
        return { status: n.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of s) {
        const u = l.key, c = l.value;
        if (u.status === "aborted" || c.status === "aborted")
          return Ce;
        (u.status === "dirty" || c.status === "dirty") && n.dirty(), o.set(u.value, c.value);
      }
      return { status: n.value, value: o };
    }
  }
}
$a.create = (t, e, n) => new $a({
  valueType: e,
  keyType: t,
  typeName: Z.ZodMap,
  ...be(n)
});
class gr extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== ae.set)
      return ee(r, {
        code: B.invalid_type,
        expected: ae.set,
        received: r.parsedType
      }), Ce;
    const i = this._def;
    i.minSize !== null && r.data.size < i.minSize.value && (ee(r, {
      code: B.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), n.dirty()), i.maxSize !== null && r.data.size > i.maxSize.value && (ee(r, {
      code: B.too_big,
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
          return Ce;
        c.status === "dirty" && n.dirty(), u.add(c.value);
      }
      return { status: n.value, value: u };
    }
    const o = [...r.data.values()].map((l, u) => a._parse(new dn(r, l, r.path, u)));
    return r.common.async ? Promise.all(o).then((l) => s(l)) : s(o);
  }
  min(e, n) {
    return new gr({
      ...this._def,
      minSize: { value: e, message: le.toString(n) }
    });
  }
  max(e, n) {
    return new gr({
      ...this._def,
      maxSize: { value: e, message: le.toString(n) }
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
  typeName: Z.ZodSet,
  ...be(e)
});
class Ba extends Ie {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Ba.create = (t, e) => new Ba({
  getter: t,
  typeName: Z.ZodLazy,
  ...be(e)
});
class ja extends Ie {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return ee(n, {
        received: n.data,
        code: B.invalid_literal,
        expected: this._def.value
      }), Ce;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
ja.create = (t, e) => new ja({
  value: t,
  typeName: Z.ZodLiteral,
  ...be(e)
});
function So(t, e) {
  return new zn({
    values: t,
    typeName: Z.ZodEnum,
    ...be(e)
  });
}
class zn extends Ie {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return ee(n, {
        expected: Ne.joinValues(r),
        received: n.parsedType,
        code: B.invalid_type
      }), Ce;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return ee(n, {
        received: n.data,
        code: B.invalid_enum_value,
        options: r
      }), Ce;
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
zn.create = So;
class Va extends Ie {
  _parse(e) {
    const n = Ne.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== ae.string && r.parsedType !== ae.number) {
      const i = Ne.objectValues(n);
      return ee(r, {
        expected: Ne.joinValues(i),
        received: r.parsedType,
        code: B.invalid_type
      }), Ce;
    }
    if (this._cache || (this._cache = new Set(Ne.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const i = Ne.objectValues(n);
      return ee(r, {
        received: r.data,
        code: B.invalid_enum_value,
        options: i
      }), Ce;
    }
    return Mt(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Va.create = (t, e) => new Va({
  values: t,
  typeName: Z.ZodNativeEnum,
  ...be(e)
});
class $r extends Ie {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== ae.promise && n.common.async === !1)
      return ee(n, {
        code: B.invalid_type,
        expected: ae.promise,
        received: n.parsedType
      }), Ce;
    const r = n.parsedType === ae.promise ? n.data : Promise.resolve(n.data);
    return Mt(r.then((i) => this._def.type.parseAsync(i, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
$r.create = (t, e) => new $r({
  type: t,
  typeName: Z.ZodPromise,
  ...be(e)
});
class Un extends Ie {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === Z.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), i = this._def.effect || null, a = {
      addIssue: (s) => {
        ee(r, s), s.fatal ? n.abort() : n.dirty();
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
            return Ce;
          const l = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return l.status === "aborted" ? Ce : l.status === "dirty" || n.value === "dirty" ? or(l.value) : l;
        });
      {
        if (n.value === "aborted")
          return Ce;
        const o = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? Ce : o.status === "dirty" || n.value === "dirty" ? or(o.value) : o;
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
        return o.status === "aborted" ? Ce : (o.status === "dirty" && n.dirty(), s(o.value), { status: n.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? Ce : (o.status === "dirty" && n.dirty(), s(o.value).then(() => ({ status: n.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (r.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Fn(s))
          return Ce;
        const o = i.transform(s.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((s) => Fn(s) ? Promise.resolve(i.transform(s.value, a)).then((o) => ({
          status: n.value,
          value: o
        })) : Ce);
    Ne.assertNever(i);
  }
}
Un.create = (t, e, n) => new Un({
  schema: t,
  typeName: Z.ZodEffects,
  effect: e,
  ...be(n)
});
Un.createWithPreprocess = (t, e, n) => new Un({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: Z.ZodEffects,
  ...be(n)
});
class un extends Ie {
  _parse(e) {
    return this._getType(e) === ae.undefined ? Mt(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
un.create = (t, e) => new un({
  innerType: t,
  typeName: Z.ZodOptional,
  ...be(e)
});
class Hn extends Ie {
  _parse(e) {
    return this._getType(e) === ae.null ? Mt(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Hn.create = (t, e) => new Hn({
  innerType: t,
  typeName: Z.ZodNullable,
  ...be(e)
});
class Fi extends Ie {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === ae.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
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
  typeName: Z.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...be(e)
});
class zi extends Ie {
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
  typeName: Z.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...be(e)
});
class Za extends Ie {
  _parse(e) {
    if (this._getType(e) !== ae.nan) {
      const r = this._getOrReturnCtx(e);
      return ee(r, {
        code: B.invalid_type,
        expected: ae.nan,
        received: r.parsedType
      }), Ce;
    }
    return { status: "valid", value: e.data };
  }
}
Za.create = (t) => new Za({
  typeName: Z.ZodNaN,
  ...be(t)
});
class Ec extends Ie {
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
class la extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? Ce : a.status === "dirty" ? (n.dirty(), or(a.value)) : this._def.out._parseAsync({
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
      return i.status === "aborted" ? Ce : i.status === "dirty" ? (n.dirty(), {
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
      typeName: Z.ZodPipeline
    });
  }
}
class Ui extends Ie {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (i) => (Fn(i) && (i.value = Object.freeze(i.value)), i);
    return Fr(n) ? n.then((i) => r(i)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ui.create = (t, e) => new Ui({
  innerType: t,
  typeName: Z.ZodReadonly,
  ...be(e)
});
var Z;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(Z || (Z = {}));
const Sn = cn.create, Rc = Pi.create;
hn.create;
const bo = Yt.create, ca = tt.create;
Ur.create;
Hr.create;
bn.create;
const Ic = zn.create;
$r.create;
un.create;
Hn.create;
const Nc = Symbol("Let zodToJsonSchema decide on which parser to use"), Wa = {
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
}, Ac = (t) => typeof t == "string" ? {
  ...Wa,
  name: t
} : {
  ...Wa,
  ...t
}, Oc = (t) => {
  const e = Ac(t), n = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
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
function vo(t, e, n, r) {
  r != null && r.errorMessages && n && (t.errorMessage = {
    ...t.errorMessage,
    [e]: n
  });
}
function De(t, e, n, r, i) {
  t[e] = n, vo(t, e, r, i);
}
const To = (t, e) => {
  let n = 0;
  for (; n < t.length && n < e.length && t[n] === e[n]; n++)
    ;
  return [(t.length - n).toString(), ...e.slice(n)].join("/");
};
function xt(t) {
  if (t.target !== "openAi")
    return {};
  const e = [
    ...t.basePath,
    t.definitionPath,
    t.openAiAnyTypeName
  ];
  return t.flags.hasReferencedOpenAiAnyType = !0, {
    $ref: t.$refStrategy === "relative" ? To(e, t.currentPath) : e.join("/")
  };
}
function Mc(t, e) {
  var r, i, a;
  const n = {
    type: "array"
  };
  return (r = t.type) != null && r._def && ((a = (i = t.type) == null ? void 0 : i._def) == null ? void 0 : a.typeName) !== Z.ZodAny && (n.items = Oe(t.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), t.minLength && De(n, "minItems", t.minLength.value, t.minLength.message, e), t.maxLength && De(n, "maxItems", t.maxLength.value, t.maxLength.message, e), t.exactLength && (De(n, "minItems", t.exactLength.value, t.exactLength.message, e), De(n, "maxItems", t.exactLength.value, t.exactLength.message, e)), n;
}
function Lc(t, e) {
  const n = {
    type: "integer",
    format: "int64"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? De(n, "minimum", r.value, r.message, e) : De(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), De(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? De(n, "maximum", r.value, r.message, e) : De(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), De(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        De(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function Pc() {
  return {
    type: "boolean"
  };
}
function Eo(t, e) {
  return Oe(t.type._def, e);
}
const Dc = (t, e) => Oe(t.innerType._def, e);
function Ro(t, e, n) {
  const r = n ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((i, a) => Ro(t, e, i))
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
      return Fc(t, e);
  }
}
const Fc = (t, e) => {
  const n = {
    type: "integer",
    format: "unix-time"
  };
  if (e.target === "openApi3")
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        De(
          n,
          "minimum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
      case "max":
        De(
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
function zc(t, e) {
  return {
    ...Oe(t.innerType._def, e),
    default: t.defaultValue()
  };
}
function Uc(t, e) {
  return e.effectStrategy === "input" ? Oe(t.schema._def, e) : xt(e);
}
function Hc(t) {
  return {
    type: "string",
    enum: Array.from(t.values)
  };
}
const $c = (t) => "type" in t && t.type === "string" ? !1 : "allOf" in t;
function Bc(t, e) {
  const n = [
    Oe(t.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    Oe(t.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((a) => !!a);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const i = [];
  return n.forEach((a) => {
    if ($c(a))
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
function jc(t, e) {
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
function Io(t, e) {
  const n = {
    type: "string"
  };
  if (t.checks)
    for (const r of t.checks)
      switch (r.kind) {
        case "min":
          De(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e);
          break;
        case "max":
          De(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
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
          De(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e), De(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
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
              De(n, "contentEncoding", "base64", r.message, e);
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
  return e.patternStrategy === "escape" ? Zc(t) : t;
}
const Vc = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function Zc(t) {
  let e = "";
  for (let n = 0; n < t.length; n++)
    Vc.has(t[n]) || (e += "\\"), e += t[n];
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
  })) : De(t, "format", e, n, r);
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
  })) : De(t, "pattern", Ga(e, r), n, r);
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
function No(t, e) {
  var r, i, a, s, o, l;
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && ((r = t.keyType) == null ? void 0 : r._def.typeName) === Z.ZodEnum)
    return {
      type: "object",
      required: t.keyType._def.values,
      properties: t.keyType._def.values.reduce((u, c) => ({
        ...u,
        [c]: Oe(t.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", c]
        }) ?? xt(e)
      }), {}),
      additionalProperties: e.rejectedAdditionalProperties
    };
  const n = {
    type: "object",
    additionalProperties: Oe(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? e.allowedAdditionalProperties
  };
  if (e.target === "openApi3")
    return n;
  if (((i = t.keyType) == null ? void 0 : i._def.typeName) === Z.ZodString && ((a = t.keyType._def.checks) != null && a.length)) {
    const { type: u, ...c } = Io(t.keyType._def, e);
    return {
      ...n,
      propertyNames: c
    };
  } else {
    if (((s = t.keyType) == null ? void 0 : s._def.typeName) === Z.ZodEnum)
      return {
        ...n,
        propertyNames: {
          enum: t.keyType._def.values
        }
      };
    if (((o = t.keyType) == null ? void 0 : o._def.typeName) === Z.ZodBranded && t.keyType._def.type._def.typeName === Z.ZodString && ((l = t.keyType._def.type._def.checks) != null && l.length)) {
      const { type: u, ...c } = Eo(t.keyType._def, e);
      return {
        ...n,
        propertyNames: c
      };
    }
  }
  return n;
}
function Wc(t, e) {
  if (e.mapStrategy === "record")
    return No(t, e);
  const n = Oe(t.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || xt(e), r = Oe(t.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || xt(e);
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
function Gc(t) {
  const e = t.values, r = Object.keys(t.values).filter((a) => typeof e[e[a]] != "number").map((a) => e[a]), i = Array.from(new Set(r.map((a) => typeof a)));
  return {
    type: i.length === 1 ? i[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function qc(t) {
  return t.target === "openAi" ? void 0 : {
    not: xt({
      ...t,
      currentPath: [...t.currentPath, "not"]
    })
  };
}
function Kc(t) {
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
function Yc(t, e) {
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
  const n = (t.options instanceof Map ? Array.from(t.options.values()) : t.options).map((r, i) => Oe(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", `${i}`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return n.length ? { anyOf: n } : void 0;
};
function Xc(t, e) {
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
    const r = Oe(t.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const n = Oe(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return n && { anyOf: [n, { type: "null" }] };
}
function Jc(t, e) {
  const n = {
    type: "number"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "int":
        n.type = "integer", vo(n, "type", r.message, e);
        break;
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? De(n, "minimum", r.value, r.message, e) : De(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), De(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? De(n, "maximum", r.value, r.message, e) : De(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), De(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        De(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function Qc(t, e) {
  const n = e.target === "openAi", r = {
    type: "object",
    properties: {}
  }, i = [], a = t.shape();
  for (const o in a) {
    let l = a[o];
    if (l === void 0 || l._def === void 0)
      continue;
    let u = tu(l);
    u && n && (l._def.typeName === "ZodOptional" && (l = l._def.innerType), l.isNullable() || (l = l.nullable()), u = !1);
    const c = Oe(l._def, {
      ...e,
      currentPath: [...e.currentPath, "properties", o],
      propertyPath: [...e.currentPath, "properties", o]
    });
    c !== void 0 && (r.properties[o] = c, u || i.push(o));
  }
  i.length && (r.required = i);
  const s = eu(t, e);
  return s !== void 0 && (r.additionalProperties = s), r;
}
function eu(t, e) {
  if (t.catchall._def.typeName !== "ZodNever")
    return Oe(t.catchall._def, {
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
function tu(t) {
  try {
    return t.isOptional();
  } catch {
    return !0;
  }
}
const nu = (t, e) => {
  var r;
  if (e.currentPath.toString() === ((r = e.propertyPath) == null ? void 0 : r.toString()))
    return Oe(t.innerType._def, e);
  const n = Oe(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return n ? {
    anyOf: [
      {
        not: xt(e)
      },
      n
    ]
  } : xt(e);
}, ru = (t, e) => {
  if (e.pipeStrategy === "input")
    return Oe(t.in._def, e);
  if (e.pipeStrategy === "output")
    return Oe(t.out._def, e);
  const n = Oe(t.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = Oe(t.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", n ? "1" : "0"]
  });
  return {
    allOf: [n, r].filter((i) => i !== void 0)
  };
};
function iu(t, e) {
  return Oe(t.type._def, e);
}
function au(t, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: Oe(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return t.minSize && De(r, "minItems", t.minSize.value, t.minSize.message, e), t.maxSize && De(r, "maxItems", t.maxSize.value, t.maxSize.message, e), r;
}
function su(t, e) {
  return t.rest ? {
    type: "array",
    minItems: t.items.length,
    items: t.items.map((n, r) => Oe(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], []),
    additionalItems: Oe(t.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: t.items.length,
    maxItems: t.items.length,
    items: t.items.map((n, r) => Oe(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], [])
  };
}
function ou(t) {
  return {
    not: xt(t)
  };
}
function lu(t) {
  return xt(t);
}
const cu = (t, e) => Oe(t.innerType._def, e), uu = (t, e, n) => {
  switch (e) {
    case Z.ZodString:
      return Io(t, n);
    case Z.ZodNumber:
      return Jc(t, n);
    case Z.ZodObject:
      return Qc(t, n);
    case Z.ZodBigInt:
      return Lc(t, n);
    case Z.ZodBoolean:
      return Pc();
    case Z.ZodDate:
      return Ro(t, n);
    case Z.ZodUndefined:
      return ou(n);
    case Z.ZodNull:
      return Kc(n);
    case Z.ZodArray:
      return Mc(t, n);
    case Z.ZodUnion:
    case Z.ZodDiscriminatedUnion:
      return Yc(t, n);
    case Z.ZodIntersection:
      return Bc(t, n);
    case Z.ZodTuple:
      return su(t, n);
    case Z.ZodRecord:
      return No(t, n);
    case Z.ZodLiteral:
      return jc(t, n);
    case Z.ZodEnum:
      return Hc(t);
    case Z.ZodNativeEnum:
      return Gc(t);
    case Z.ZodNullable:
      return Xc(t, n);
    case Z.ZodOptional:
      return nu(t, n);
    case Z.ZodMap:
      return Wc(t, n);
    case Z.ZodSet:
      return au(t, n);
    case Z.ZodLazy:
      return () => t.getter()._def;
    case Z.ZodPromise:
      return iu(t, n);
    case Z.ZodNaN:
    case Z.ZodNever:
      return qc(n);
    case Z.ZodEffects:
      return Uc(t, n);
    case Z.ZodAny:
      return xt(n);
    case Z.ZodUnknown:
      return lu(n);
    case Z.ZodDefault:
      return zc(t, n);
    case Z.ZodBranded:
      return Eo(t, n);
    case Z.ZodReadonly:
      return cu(t, n);
    case Z.ZodCatch:
      return Dc(t, n);
    case Z.ZodPipeline:
      return ru(t, n);
    case Z.ZodFunction:
    case Z.ZodVoid:
    case Z.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function Oe(t, e, n = !1) {
  var o;
  const r = e.seen.get(t);
  if (e.override) {
    const l = (o = e.override) == null ? void 0 : o.call(e, t, e, r, n);
    if (l !== Nc)
      return l;
  }
  if (r && !n) {
    const l = du(r, e);
    if (l !== void 0)
      return l;
  }
  const i = { def: t, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(t, i);
  const a = uu(t, t.typeName, e), s = typeof a == "function" ? Oe(a(), e) : a;
  if (s && hu(t, e, s), e.postProcess) {
    const l = e.postProcess(s, t, e);
    return i.jsonSchema = s, l;
  }
  return i.jsonSchema = s, s;
}
const du = (t, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: t.path.join("/") };
    case "relative":
      return { $ref: To(e.currentPath, t.path) };
    case "none":
    case "seen":
      return t.path.length < e.currentPath.length && t.path.every((n, r) => e.currentPath[r] === n) ? (console.warn(`Recursive reference detected at ${e.currentPath.join("/")}! Defaulting to any`), xt(e)) : e.$refStrategy === "seen" ? xt(e) : void 0;
  }
}, hu = (t, e, n) => (t.description && (n.description = t.description, e.markdownDescription && (n.markdownDescription = t.description)), n), pu = (t, e) => {
  const n = Oc(e);
  let r = typeof e == "object" && e.definitions ? Object.entries(e.definitions).reduce((l, [u, c]) => ({
    ...l,
    [u]: Oe(c._def, {
      ...n,
      currentPath: [...n.basePath, n.definitionPath, u]
    }, !0) ?? xt(n)
  }), {}) : void 0;
  const i = typeof e == "string" ? e : (e == null ? void 0 : e.nameStrategy) === "title" || e == null ? void 0 : e.name, a = Oe(t._def, i === void 0 ? n : {
    ...n,
    currentPath: [...n.basePath, n.definitionPath, i]
  }, !1) ?? xt(n), s = typeof e == "object" && e.name !== void 0 && e.nameStrategy === "title" ? e.name : void 0;
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
function fu(t) {
  return pu(t, {
    $refStrategy: "none"
  });
}
class gu {
  constructor(e = []) {
    re(this, "entries", /* @__PURE__ */ new Map());
    re(this, "schemas", []);
    e.forEach((n) => this.add(n));
  }
  add(e) {
    this.entries.has(e.name) || (this.entries.set(e.name, e), this.schemas.push({
      name: e.name,
      description: e.description,
      propsSchemaJson: fu(e.propsSchema)
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
const Ao = Yr(null);
function mu({ children: t, value: e }) {
  return /* @__PURE__ */ p(Ao.Provider, { value: e, children: t });
}
function jn() {
  const t = Xr(Ao);
  if (!t)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return t;
}
const Oo = Yr(null);
function yu({
  callId: t,
  status: e,
  source: n,
  isLatest: r,
  children: i
}) {
  return /* @__PURE__ */ p(
    Oo.Provider,
    {
      value: { callId: t, status: e, source: n, isLatest: r },
      children: i
    }
  );
}
function wu() {
  return Xr(Oo);
}
function Cu() {
  const { onSubmit: t, onStopGeneration: e, isStreaming: n, chatStatus: r } = jn();
  return {
    sendMessage: t,
    stopGeneration: e,
    isStreaming: n,
    chatStatus: r
  };
}
const xu = ca({
  label: Sn().optional().describe("Button label shown to the user. Keep short (≤ 32 chars)."),
  value: Sn().optional().describe(
    'Optional internal identifier for this option (e.g. a stable code like "winback" or "amount_off_min_spend"). The user-visible chat message echoes the `label` — not `value` — so pick a label that reads naturally as the user\'s reply. Defaults to `label` when omitted.'
  )
}), ku = Ic([
  "single_choice",
  "multi_choice"
]), _u = ca({
  id: Sn().optional().describe(
    "Stable identifier for this question. Optional — falls back to a positional id (q1, q2, …)."
  ),
  title: Sn().optional().describe(
    'The question text shown above the options (e.g. "Which campaign idea do you want to run next?").'
  ),
  type: ku.optional().describe(
    "single_choice = pick exactly one (radio). multi_choice = pick one or more (checkbox). Defaults to single_choice."
  ),
  options: bo(xu).optional().describe(
    "Reply options for this question. Provide 2–6 — fewer is not a meaningful choice; more hurts readability. Do not combine with `allowFreeText: true`; pick one input mode per question."
  ),
  helperText: Sn().optional().describe(
    'Hint shown inline after the bolded title (e.g. "Pick one", "Pick one or more"). Auto-derived from `type` when omitted.'
  ),
  allowFreeText: Rc().optional().describe(
    "When true, render a single text input where the user types their own answer — and do NOT also supply `options`. Use this for open-ended questions where preset choices wouldn't fit (e.g. a date, a name, free-form notes). Mixing options with a free-text input confuses users and is not supported. Defaults to false."
  )
}), Su = ca({
  prompt: Sn().optional().describe(
    "Optional intro shown above the questions. Plain text only."
  ),
  questions: bo(_u).optional().describe(
    "One or more questions. When the agent provides several, the form steps through them one at a time (Back/Next navigation) and submits all answers together as a single message when the user clicks Submit on the final step."
  ),
  submitLabel: Sn().optional().describe('Label for the submit button. Defaults to "Submit".')
}), bu = 6, vu = "Type your answer here…";
function kn(t, e) {
  var r;
  return `${((r = t.id) == null ? void 0 : r.trim()) || `q${e + 1}`}-${e}`;
}
function Tu(t) {
  return t === "multi_choice" ? "Pick one or more" : "Pick one";
}
function ua(t, e) {
  return (t == null ? void 0 : t.trim()) || `Option ${e + 1}`;
}
function Mo(t, e, n) {
  return (t == null ? void 0 : t.trim()) || ua(e, n);
}
function Lo(t, e) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Mo(r.value, r.label, n) === e)
      return ua(r.label, n);
  }
  return e;
}
function Eu(t, e) {
  return t && t.length > 0 ? t : e && e.length > 0 ? [
    {
      id: "q1",
      type: "single_choice",
      options: e
    }
  ] : [];
}
function Ru(t, e, n) {
  const r = [];
  return t.forEach(({ question: i, qIndex: a, opts: s }) => {
    var w;
    const o = kn(i, a), l = i.type ?? "single_choice", c = (e[o] ?? []).map((k) => Lo(s, k)), d = (n[o] ?? "").trim(), f = l === "multi_choice" ? [...c, ...d ? [d] : []] : c.length > 0 ? [...c] : d ? [d] : [];
    if (f.length === 0) return;
    const h = ((w = i.title) == null ? void 0 : w.trim()) || `Q${a + 1}`;
    r.push(`Q: ${h}`), r.push(`A: ${f.join(", ")}`), r.push("");
  }), r.join(`
`).trim();
}
function Iu(t) {
  const { prompt: e, questions: n, submitLabel: r } = t, i = t.options, { sendMessage: a, isStreaming: s } = Cu(), o = wu(), [l, u] = Ee({}), [c, d] = Ee({}), [f, h] = Ee(!1), [w, k] = Ee(1), [I, S] = Ee(() => /* @__PURE__ */ new Set()), v = pe(null), R = pe(w);
  Me(() => {
    var F;
    w > R.current && ((F = v.current) == null || F.scrollIntoView({
      behavior: "smooth",
      block: "end"
    })), R.current = w;
  }, [w]);
  const D = (o == null ? void 0 : o.isLatest) ?? !0, M = Eu(n, i), b = M.map((F, $) => ({
    question: F,
    qIndex: $,
    opts: (F.options ?? []).slice(0, bu)
  })).filter(
    ({ opts: F, question: $ }) => F.length > 0 || $.allowFreeText === !0
  ), j = b.length, V = Math.max(
    1,
    Math.min(w, Math.max(j, 1))
  ), K = b.slice(0, V), q = j > 0 && V >= j, ce = f || !D;
  Me(() => {
    if (ce || j === 0 || w >= j) return;
    const F = b[w - 1];
    if (!F) return;
    const $ = kn(F.question, F.qIndex), y = (l[$] ?? []).length > 0, J = (c[$] ?? "").trim().length > 0;
    (y || J) && k((z) => Math.min(z + 1, j));
  }, [l, c, ce, j, w]);
  const G = (F) => {
    const $ = kn(F.question, F.qIndex), y = l[$] ?? [], J = (c[$] ?? "").trim();
    return y.length > 0 || J.length > 0;
  }, N = (F, $, y) => {
    if (ce) return;
    const J = kn(M[F], F);
    u((z) => {
      if ($ === "multi_choice") {
        const oe = z[J] ?? [], ye = oe.includes(y) ? oe.filter((te) => te !== y) : [...oe, y];
        return { ...z, [J]: ye };
      }
      return { ...z, [J]: [y] };
    }), $ !== "multi_choice" && (d((z) => ({ ...z, [J]: "" })), S((z) => {
      if (!z.has(J)) return z;
      const oe = new Set(z);
      return oe.delete(J), oe;
    }));
  }, L = (F) => {
    if (ce) return;
    const $ = kn(M[F], F);
    S((y) => {
      if (y.has($)) return y;
      const J = new Set(y);
      return J.add($), J;
    });
  }, U = (F, $, y) => {
    if (ce) return;
    const J = kn(M[F], F);
    d((z) => ({ ...z, [J]: y })), $ !== "multi_choice" && u((z) => ({ ...z, [J]: [] }));
  }, ie = ce || s || j === 0 || !q ? !1 : b.every((F) => (F.question.type ?? "single_choice") === "multi_choice" ? !0 : G(F)), Y = () => {
    if (!ie) return;
    const F = Ru(
      b,
      l,
      c
    );
    F && (h(!0), a(F));
  };
  if (j === 0)
    return null;
  const me = (F) => {
    var Fe;
    const { question: $, qIndex: y, opts: J } = F, z = kn($, y), oe = $.type ?? "single_choice", ye = ((Fe = $.helperText) == null ? void 0 : Fe.trim()) || Tu(oe), te = l[z] ?? [], Le = c[z] ?? "", ke = oe === "multi_choice" ? "chat-wrapper__ask-user-input-v0-option-indicator--checkbox" : "chat-wrapper__ask-user-input-v0-option-indicator--radio", Se = $.allowFreeText === !0 && (!ce || Le.trim().length > 0), xe = !ce && oe === "single_choice" && te.length > 0 && !I.has(z);
    return /* @__PURE__ */ O(
      "div",
      {
        className: "chat-wrapper__ask-user-input-v0-question",
        "data-question-type": oe,
        "data-mode": xe ? "summary" : "edit",
        children: [
          /* @__PURE__ */ O("p", { className: "chat-wrapper__ask-user-input-v0-question-title", children: [
            $.title ? /* @__PURE__ */ p("strong", { children: $.title }) : null,
            $.title && ye ? " " : null,
            /* @__PURE__ */ p("span", { className: "chat-wrapper__ask-user-input-v0-helper", children: ye })
          ] }),
          xe ? /* @__PURE__ */ O(Kt, { children: [
            /* @__PURE__ */ O("p", { className: "chat-wrapper__ask-user-input-v0-summary-text", children: [
              "You selected: ",
              Lo(J, te[0])
            ] }),
            /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                className: "chat-wrapper__ask-user-input-v0-change-answer",
                onClick: () => L(y),
                children: "Change answer"
              }
            )
          ] }) : /* @__PURE__ */ O(Kt, { children: [
            J.length > 0 ? /* @__PURE__ */ p(
              "div",
              {
                className: "chat-wrapper__ask-user-input-v0-options",
                role: oe === "multi_choice" ? "group" : "radiogroup",
                children: J.map((je, $e) => {
                  const Ve = ua(je.label, $e), _t = Mo(je.value, je.label, $e), gt = te.includes(_t);
                  return /* @__PURE__ */ O(
                    "button",
                    {
                      type: "button",
                      className: `chat-wrapper__ask-user-input-v0-option${gt ? " chat-wrapper__ask-user-input-v0-option--picked" : ""}`,
                      disabled: ce,
                      role: oe === "multi_choice" ? "checkbox" : "radio",
                      "aria-checked": gt,
                      onClick: () => N(y, oe, _t),
                      children: [
                        /* @__PURE__ */ p(
                          "span",
                          {
                            className: `chat-wrapper__ask-user-input-v0-option-indicator ${ke}`,
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ p("span", { className: "chat-wrapper__ask-user-input-v0-option-label", children: Ve })
                      ]
                    },
                    `${z}-${_t}-${$e}`
                  );
                })
              }
            ) : null,
            Se ? /* @__PURE__ */ p(
              "input",
              {
                type: "text",
                className: "chat-wrapper__ask-user-input-v0-free-text-input",
                value: Le,
                onChange: (je) => U(y, oe, je.target.value),
                placeholder: vu,
                disabled: ce,
                "aria-label": $.title ? `Type your answer for: ${$.title}` : "Type your answer"
              }
            ) : null
          ] })
        ]
      },
      z
    );
  }, de = ce;
  return /* @__PURE__ */ O(
    "div",
    {
      ref: v,
      className: "chat-wrapper__ask-user-input-v0",
      children: [
        e ? /* @__PURE__ */ p("p", { className: "chat-wrapper__ask-user-input-v0-prompt", children: e }) : null,
        (de ? b : K).map(me),
        !de && q ? /* @__PURE__ */ p("div", { className: "chat-wrapper__ask-user-input-v0-actions", children: /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: "chat-wrapper__ask-user-input-v0-submit",
            disabled: !ie,
            onClick: Y,
            children: (r == null ? void 0 : r.trim()) || "Submit"
          }
        ) }) : null
      ]
    }
  );
}
const Nu = {
  name: "AskUserInputV0",
  description: 'Show a structured clarifying-question form with radio (single_choice) and/or checkbox (multi_choice) controls. Use whenever you would otherwise ask the user a small, well-defined set of clarifying questions before continuing — e.g. picking a campaign goal, confirming preferences, choosing a tone, narrowing an audience. Set `prompt` to an optional intro, list each question under `questions[]` with `title`, `type`, and `options[]` (2–6). Set `option.value` when the answer string sent back should differ from the visible `label`. Set `helperText` to override the default "Pick one" / "Pick one or more" hint shown inline after the title. Set `allowFreeText: true` on a question to render a text input below the options where the user can type their own answer in their own words; for single_choice the input is mutually exclusive with the radio picks (typing deselects radios), for multi_choice the typed text combines with any selected checkboxes. A question may use `allowFreeText: true` with no `options[]` to render as a pure text-input prompt. When you provide multiple `questions[]`, the form reveals them progressively inline: only the first question shows initially, and each subsequent question appears once the user picks an option or types into the input on the previous one. All revealed questions stay editable, so the user can change earlier answers before submitting. A single Submit button appears once every question is revealed and the required ones answered; clicking it sends all collected answers as a single message. The form locks after submit (the user cannot revise their answer); render a fresh AskUserInputV0 if you need a follow-up question. Do not use this for purely conversational free-form input or ranking interactions.',
  propsSchema: Su,
  component: Iu
}, Au = [
  Nu
];
function Ou(t) {
  return [...t ?? [], ...Au];
}
const Po = "ask_user_question", Mu = {
  name: Po,
  description: 'Render an in-chat form that asks the user one or more structured clarifying questions before continuing. Use whenever you would otherwise ask the user a small, well-defined set of choices — picking a campaign goal, confirming a preference, narrowing an audience, etc. Set `type` to "single" for radio (one answer per question) or "multiple" for checkbox (one or more answers per question); the mode applies to every question in `questions_list`. Each entry in `questions_list` is `{ title, options?, allow_free_text? }`. `options` is a list of short labels (2–6 per question) the user picks from. Set `allow_free_text: true` to render a text input the user types into — use for open-ended answers that can\'t be pre-enumerated (dates, names, free-form notes). A question with `allow_free_text: true` and no `options` renders as a pure text input; combining both is allowed (for "multiple" the typed text is included alongside any checked picks; for "single" the input and radios are mutually exclusive — typing deselects the picked option). The form reveals questions one at a time and submits the user\'s full set of answers as a single chat message when they hit Submit. Do not use for ranking or casual conversational replies — pose those in chat text instead.',
  parameters: [
    {
      name: "type",
      type: "string",
      description: 'Answer mode applied to every question: "single" renders radios (exactly one pick per question) and "multiple" renders checkboxes (one or more picks per question).',
      isRequired: !0,
      schema: {
        type: "string",
        enum: ["single", "multiple"]
      }
    },
    {
      name: "questions_list",
      type: "array",
      description: "Ordered list of questions to ask. Each item is `{ title, options?, allow_free_text? }`. Every item needs at least one of `options` (a list of 2–6 short string labels) or `allow_free_text: true` — a question with neither offers the user nothing to do and is skipped.",
      isRequired: !0,
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Question text shown above the input(s)."
            },
            options: {
              type: "array",
              items: { type: "string" },
              description: "Reply options for this question. 2–6 entries is the comfortable range; fewer isn't a real choice, more hurts readability. Omit when asking a pure free-text question."
            },
            allow_free_text: {
              type: "boolean",
              description: "When true, render a text input the user types into. Use for open-ended answers that can't be pre-enumerated (dates, names, free-form notes). Combine with `options` only when picking from the list AND typing a custom answer are both meaningful — otherwise drop `options` and ask pure free-text."
            }
          },
          required: ["title"]
        }
      }
    }
  ],
  execute: async () => ({ rendered: !0 })
}, Ka = [Mu];
function Lu(t) {
  if (!t || t.length === 0)
    return [...Ka];
  const e = new Set(t.map((r) => r.name)), n = Ka.filter(
    (r) => !e.has(r.name)
  );
  return [...t, ...n];
}
function Pu(t) {
  const e = t == null ? void 0 : t.type, n = e === "multiple" || e === "multi_choice" ? "multi_choice" : "single_choice";
  return { questions: (Array.isArray(t == null ? void 0 : t.questions_list) ? t.questions_list : []).map((a) => {
    const s = Array.isArray(a == null ? void 0 : a.options) ? a.options : [], o = (a == null ? void 0 : a.allow_free_text) === !0 || (a == null ? void 0 : a.allowFreeText) === !0;
    return {
      title: typeof (a == null ? void 0 : a.title) == "string" ? a.title : void 0,
      type: n,
      options: s.map(
        (l) => typeof l == "string" ? { label: l } : { label: l == null ? void 0 : l.label, value: l == null ? void 0 : l.value }
      ),
      allowFreeText: o
    };
  }) };
}
const Du = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, vr = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Nt = /* @__PURE__ */ ((t) => (t.CONNECTION_ESTABLISHED = "connection_established", t.CONNECTION_LOST = "connection_lost", t.CONNECTION_RESTORED = "connection_restored", t.CONNECTION_FAILED = "connection_failed", t.RECONNECTING = "reconnecting", t.CHAT_COMPLETED = "chat_completed", t.CHAT_ERROR = "chat_error", t))(Nt || {}), jt = /* @__PURE__ */ ((t) => (t.CHAT_MESSAGE = "chat_message", t.CONFIGURE_TOOLS = "configure_tools", t.UPDATE_TOOLS = "update_tools", t.UPDATE_CONTEXT_HELPERS = "update_context_helpers", t.TOOL_CALL_RESPONSE = "tool_call_response", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_PONG = "heartbeat_pong", t.STOP_RUN = "stop_run", t))(jt || {}), at = /* @__PURE__ */ ((t) => (t.SESSION_ESTABLISHED = "session_established", t.TOOLS_CONFIGURED = "tools_configured", t.CLIENT_TOOLS_UPDATED = "client_tools_updated", t.CONFIGURE_TOOLS = "configure_tools", t.CHAT_EVENT = "chat_event", t.CHAT_FINISHED = "chat_finished", t.CHAT_ERROR = "chat_error", t.MESSAGES_PERSISTED = "messages_persisted", t.THREAD_CREATED = "thread_created", t.TOOL_CALL_REQUEST = "tool_call_request", t.UI_COMPONENT = "ui_component", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_ACK = "heartbeat_ack", t.ERROR = "error", t))(at || {}), Mr = /* @__PURE__ */ ((t) => (t.PROVIDER_EVENT = "provider-event", t.LATITUDE_EVENT = "latitude-event", t.CONTENT_DELTA = "content-delta", t))(Mr || {}), on = /* @__PURE__ */ ((t) => (t.TEXT_DELTA = "text-delta", t.REASONING_START = "reasoning-start", t.REASONING_DELTA = "reasoning-delta", t.REASONING_END = "reasoning-end", t.TOOL_CALL = "tool-call", t.TOOL_RESULT = "tool-result", t))(on || {});
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
      type: jt.CHAT_MESSAGE,
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
      type: jt.CONFIGURE_TOOLS,
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
      type: jt.UPDATE_TOOLS,
      toolSchemas: e,
      generativeComponents: n
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(e) {
    return {
      type: jt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: e
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(e, n) {
    return {
      type: jt.TOOL_CALL_RESPONSE,
      callId: e,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(e, n) {
    return {
      type: jt.TOOL_CALL_RESPONSE,
      callId: e,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: jt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(e, n) {
    return {
      type: jt.HEARTBEAT_PONG,
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
      type: jt.STOP_RUN,
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
class Fu {
  constructor(e, n) {
    re(this, "ws", null);
    re(this, "config");
    re(this, "connectionState");
    re(this, "reconnectTimer", null);
    re(this, "heartbeatInterval", null);
    re(this, "visibilityChangeHandler");
    re(this, "currentTicket", null);
    re(this, "intentionalDisconnect", !1);
    // Track intentional disconnects
    re(this, "justRefreshedTicket", !1);
    // Track if ticket was just refreshed to skip duplicate validation
    re(this, "onOpen");
    re(this, "onMessage");
    re(this, "onError");
    re(this, "onClose");
    re(this, "onSystemEvent");
    re(this, "onTicketRefresh");
    re(this, "onTicketValidate");
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
class zu {
  constructor() {
    re(this, "state");
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
class Do {
  constructor(e = {}) {
    re(this, "handlers", {});
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
const he = {
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
}, nt = {
  isThinkingMessage: (t) => t.startsWith(he.THINKING_PREFIX) || t.startsWith(he.REASONING_PREFIX) || t.startsWith(he.THOUGHT_PREFIX),
  isCompletedMessage: (t) => t.includes(he.COMPLETED_MARKER),
  isErrorMessage: (t) => t.includes(he.ERROR_MARKER),
  isHandlingMessage: (t) => t.includes(he.HANDLING_MARKER),
  extractDuration: (t, e) => {
    const n = t.match(he.PATTERNS.DURATION);
    if (!n) return;
    const r = parseFloat(n[1]);
    if (e) {
      const a = e("chat.reasoning.duration.for"), s = e(r === 1 ? "chat.reasoning.duration.second" : "chat.reasoning.duration.seconds");
      return ` ${a} ${r} ${s}`;
    }
    const i = r === 1 ? he.UI_TEXT.DURATION_SECOND : he.UI_TEXT.DURATION_SECONDS;
    return ` ${he.UI_TEXT.DURATION_FOR} ${r} ${i}`;
  },
  cleanReasoningContent: (t) => {
    let e = t.replace(new RegExp(`^${he.THINKING_PREFIX}\\s*`), "").replace(new RegExp(`^${he.REASONING_PREFIX}\\s*`), "").replace(new RegExp(`^${he.THOUGHT_PREFIX}\\s*`), "");
    return e = e.replace(/\s*for [\d.]+\s+\w+$/, ""), e = e.replace(he.PATTERNS.THOUGHT_CONTENT, ""), e.trim();
  },
  getMessageType: (t, e) => e === !1 ? nt.isErrorMessage(t) ? he.MESSAGE_TYPES.ERROR : (nt.isThinkingMessage(t) && he.PATTERNS.DURATION.test(t) || nt.isThinkingMessage(t), he.MESSAGE_TYPES.THOUGHT) : nt.isCompletedMessage(t) ? he.MESSAGE_TYPES.COMPLETED : nt.isErrorMessage(t) ? he.MESSAGE_TYPES.ERROR : (nt.isHandlingMessage(t) || nt.isThinkingMessage(t) && !t.includes(he.UI_TEXT.AI_IS_THINKING), he.MESSAGE_TYPES.THINKING)
};
class Uu extends Do {
  constructor(n) {
    super({ onReasoningUpdate: n });
    re(this, "reasoningStartTimes", /* @__PURE__ */ new Map());
    re(this, "reasoningContent", /* @__PURE__ */ new Map());
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
    const s = `${he.THINKING_PREFIX} ${a}`;
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
    const o = i || he.UI_TEXT.THOUGHT, l = `${he.THOUGHT_PREFIX} ${o}${s}`;
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
const Hu = "render_ui", $u = "AskUserInputV0";
class Bu extends Do {
  constructor(n = {}, r, i) {
    super({ onReasoningUpdate: r, onUIComponent: i });
    re(this, "processedToolCalls", /* @__PURE__ */ new Set());
    re(this, "clientTools", {});
    re(this, "sendMessage");
    this.clientTools = n;
  }
  async handleToolCallRequest(n) {
    var s, o, l;
    const { callId: r, toolName: i, parameters: a } = n;
    if (!this.processedToolCalls.has(r)) {
      if (this.processedToolCalls.add(r), i === Hu) {
        this.sendToolResponse(r, { rendered: !0 });
        return;
      }
      if (i === Po) {
        const u = this.getHandler("onUIComponent");
        u && u({
          callId: r,
          componentName: $u,
          props: Pu(a),
          status: "complete"
        }), this.sendToolResponse(r, { rendered: !0 });
        return;
      }
      (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${he.HANDLING_MARKER} ${i}`, n);
      try {
        const u = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, u), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${he.COMPLETED_MARKER} ${i}`, n);
      } catch (u) {
        this.sendToolError(r, u), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${he.ERROR_MARKER} Error: ${i} - ${u}`, n);
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
      r(!0, `${he.HANDLING_MARKER} ${n.toolName}`, a);
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
        `${he.COMPLETED_MARKER} ${n.toolName}`,
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
class ju {
  constructor(e, n = {}) {
    re(this, "reasoningHandler");
    re(this, "toolHandler");
    re(this, "handlers");
    re(this, "sendMessage");
    this.handlers = e, this.reasoningHandler = new Uu(e.onReasoningUpdate), this.toolHandler = new Bu(
      n,
      e.onReasoningUpdate,
      e.onUIComponent
    );
  }
  handleMessage(e) {
    try {
      const n = JSON.parse(e.data);
      switch (n.type) {
        case at.SESSION_ESTABLISHED:
          this.handleSessionEstablished();
          break;
        case at.TOOLS_CONFIGURED:
          this.handleToolsConfigured();
          break;
        case at.CLIENT_TOOLS_UPDATED:
          this.handleClientToolsUpdated();
          break;
        case at.CONFIGURE_TOOLS:
          this.handleConfigureToolsRequest();
          break;
        case at.CHAT_EVENT:
          this.handleChatEvent(n);
          break;
        case at.CHAT_FINISHED:
          this.handleChatFinished(n);
          break;
        case at.MESSAGES_PERSISTED:
          this.handleMessagesPersisted(n);
          break;
        case at.CHAT_ERROR:
          this.handleChatError(n);
          break;
        case at.TOOL_CALL_REQUEST:
          this.handleToolCallRequest(n);
          break;
        case at.UI_COMPONENT:
          this.handleUIComponentMessage(n);
          break;
        case at.HEARTBEAT_PING:
          this.handleHeartbeatPing(n);
          break;
        case at.HEARTBEAT_ACK:
          break;
        case at.ERROR:
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
      case on.TEXT_DELTA:
        e.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, e.data.textDelta));
        break;
      case on.REASONING_START:
        this.reasoningHandler.handleReasoningStart(e.data);
        break;
      case on.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(e.data);
        break;
      case on.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(e.data);
        break;
      case on.TOOL_CALL:
        this.toolHandler.handleServerToolCall(e.data);
        break;
      case on.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(e.data);
        break;
    }
  }
  handleLatitudeEvent(e) {
    var n;
    if (((n = e.data) == null ? void 0 : n.type) === on.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = e.data;
      if (r.toolCallId && r.toolName) {
        const i = jr.createServerToolCall(
          r.toolName,
          r.toolCallId
        );
        this.handlers.onReasoningUpdate(
          !1,
          `${he.COMPLETED_MARKER} ${r.toolName}`,
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
async function Vu(t, e, n = 1e4) {
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
function Hi(t) {
  if (!t.success || !t.ticket || !t.expiresAt)
    return !1;
  const e = new Date(t.expiresAt).getTime();
  return Date.now() < e - 3e4;
}
function Ya(t) {
  const e = Hi(t), n = new Date(t.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: e,
    expiresIn: i,
    expired: r >= n
  };
}
async function Zu(t, e, n, r) {
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
function Wu(t) {
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
  const n = Wu(t);
  return console.error(`[${e}] Error occurred:`, {
    error: (t == null ? void 0 : t.message) || t,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class Gu {
  constructor(e, n, r = {}) {
    re(this, "ticket", null);
    re(this, "refreshPromise", null);
    re(this, "validationInterval", null);
    re(this, "authData");
    re(this, "apiUrl");
    re(this, "config");
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
    return this.ticket && Hi(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
        return this.ticket = await Vu(
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
      const r = Ya(this.ticket).expiresIn / 1e3;
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
    return this.ticket ? Hi(this.ticket) : !1;
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
      const e = await Zu(
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
        return Ya(this.ticket).expiresIn;
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
async function qu(t, e, n) {
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
async function Ku(t, e, n, r) {
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
async function Yu(t, e, n, r) {
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
class Xu {
  constructor() {
    re(this, "config");
    re(this, "connectionState");
    re(this, "wsManager");
    re(this, "messageHandler");
    re(this, "initResolve");
    re(this, "initReject");
    // Client tools and context
    re(this, "toolSchemas", []);
    re(this, "componentSchemas", []);
    re(this, "contextHelpers", {});
    // Ticket management - now centralized in TicketManager
    re(this, "ticketManager", null);
    // Authentication credentials for HTTP API calls
    re(this, "authCredentials", {});
    this.config = {
      ...Du
    }, this.connectionState = new zu(), this.wsManager = new Fu(this.config, this.connectionState), this.messageHandler = new ju({}), this.setupWebSocketHandlers();
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
    if ((n == null ? void 0 : n.type) === "authentication_error" && this.handleAuthenticationFailure(n), (n == null ? void 0 : n.type) === at.THREAD_CREATED) {
      (i = (r = this.messageHandler.handlers) == null ? void 0 : r.onThreadCreated) == null || i.call(r, n.data);
      return;
    }
    if ((n == null ? void 0 : n.type) === at.TOOLS_CONFIGURED) {
      (a = this.initResolve) == null || a.call(this);
      return;
    }
    if ((n == null ? void 0 : n.type) === at.SESSION_ESTABLISHED) {
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
    }, this.ticketManager = new Gu(
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
      await Ku(
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
      await Yu(
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
function Ju({
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
  const [k, I] = Ee(
    null
  ), [S, v] = Ee(
    et.DISCONNECTED
  ), [R, D] = Ee(0), [M, b] = Ee(!0), j = pe(null), V = pe(l), K = pe(u), q = pe(c), ce = pe(d), G = pe(f), N = pe(h), L = pe(t), U = pe(e), ie = pe(n), Y = pe(r), me = pe(i), de = pe(a), C = pe(a);
  Me(() => {
    JSON.stringify(a) !== JSON.stringify(de.current) && (de.current = a, C.current = a);
  }, [a]);
  const F = pe(
    s
  ), $ = pe(
    s
  );
  Me(() => {
    JSON.stringify(s) !== JSON.stringify(F.current) && (F.current = s, $.current = s);
  }, [s]);
  const y = pe(o), J = pe(
    o
  );
  Me(() => {
    JSON.stringify(o) !== JSON.stringify(y.current) && (y.current = o, J.current = o, j.current && o && j.current.updateContextHelpers(o));
  }, [o]), Me(() => {
    V.current = l, K.current = u, q.current = c, ce.current = d, G.current = f, N.current = h, L.current = t, U.current = e, ie.current = n, Y.current = r, me.current = i;
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
  const z = Be(() => {
    const Se = C.current;
    return Se && Se.length > 0 ? Se.map(({ execute: xe, ...Fe }) => Fe) : [];
  }, [C.current]), oe = Be(() => {
    if (a && a.length > 0) {
      const Se = {};
      return a.forEach((xe) => {
        Se[xe.name] = xe.execute;
      }), Se;
    }
    return {};
  }, [a]);
  Me(() => {
    j.current && Object.keys(oe).length > 0 && j.current.updateClientTools(oe);
  }, [oe]);
  const ye = pe(), te = ue(async () => {
    var Se;
    try {
      if (!navigator.onLine)
        throw v(et.DISCONNECTED), b(!1), new Error("No internet connection. Please check your network and try again.");
      if (v(et.CONNECTING), !L.current)
        throw new Error("userMpAuthToken is required");
      if (!U.current)
        throw new Error("chatServerUrl is required");
      if (!ie.current)
        throw new Error("chatServerKey is required");
      const xe = new Xu();
      j.current = xe, I(xe);
      const Fe = J.current || {};
      await xe.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: L.current,
        chatServerUrl: U.current,
        chatServerKey: ie.current,
        entityId: Y.current,
        entityType: (Se = me.current) == null ? void 0 : Se.toString(),
        // Tools configuration
        toolSchemas: z,
        clientTools: oe,
        componentSchemas: $.current,
        contextHelpers: Fe,
        onSetMessage: V.current,
        onSystemEvent: K.current,
        onReasoningUpdate: q.current,
        onUIComponent: (je) => {
          var $e;
          return ($e = ce.current) == null ? void 0 : $e.call(ce, je);
        },
        onThreadCreated: G.current,
        onMessagesPersisted: N.current,
        onError: w
      }), v(et.CONNECTED), b(!1);
    } catch (xe) {
      const Fe = $n(xe, "WebSocketConnection");
      v(et.DISCONNECTED), Fe.isRetryable ? setTimeout(() => {
        var je;
        (j.current === null || !j.current.getConnectionStatus().connected) && ((je = ye.current) == null || je.call(ye));
      }, 2e3) : b(!1);
    }
  }, [
    z,
    oe
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), Le = ue(() => {
    j.current && (j.current.disconnect(), j.current = null), I(null), v(et.DISCONNECTED);
  }, []);
  ye.current = te;
  const ke = pe(!1);
  return Me(() => (ke.current || (ke.current = !0, te()), () => {
    Le();
  }), []), Me(() => {
    const Se = setInterval(() => {
      if (j.current) {
        const xe = j.current.getConnectionStatus();
        if (M && S === et.CONNECTING)
          return;
        xe.connected && S !== et.CONNECTED ? v(et.CONNECTED) : xe.isReconnecting && S !== et.RECONNECTING ? v(et.RECONNECTING) : !xe.connected && !xe.isReconnecting && S !== et.DISCONNECTED && v(et.DISCONNECTED), D(xe.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(Se);
  }, [S, M]), {
    chatClient: k,
    connectionState: S,
    reconnectAttempts: R,
    isInitialConnection: M,
    connectChatClient: te,
    disconnectChatClient: Le
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Fo,
  setPrototypeOf: Xa,
  isFrozen: Qu,
  getPrototypeOf: ed,
  getOwnPropertyDescriptor: td
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
const Tr = pt(Array.prototype.forEach), nd = pt(Array.prototype.lastIndexOf), Ja = pt(Array.prototype.pop), Qn = pt(Array.prototype.push), rd = pt(Array.prototype.splice), Lr = pt(String.prototype.toLowerCase), ui = pt(String.prototype.toString), di = pt(String.prototype.match), er = pt(String.prototype.replace), id = pt(String.prototype.indexOf), ad = pt(String.prototype.trim), Ft = pt(Object.prototype.hasOwnProperty), dt = pt(RegExp.prototype.test), tr = sd(TypeError);
function pt(t) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return Bi(t, e, r);
  };
}
function sd(t) {
  return function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    return ji(t, n);
  };
}
function ve(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lr;
  Xa && Xa(t, null);
  let r = e.length;
  for (; r--; ) {
    let i = e[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (Qu(e) || (e[r] = a), i = a);
    }
    t[i] = !0;
  }
  return t;
}
function od(t) {
  for (let e = 0; e < t.length; e++)
    Ft(t, e) || (t[e] = null);
  return t;
}
function tn(t) {
  const e = $i(null);
  for (const [n, r] of Fo(t))
    Ft(t, n) && (Array.isArray(r) ? e[n] = od(r) : r && typeof r == "object" && r.constructor === Object ? e[n] = tn(r) : e[n] = r);
  return e;
}
function nr(t, e) {
  for (; t !== null; ) {
    const r = td(t, e);
    if (r) {
      if (r.get)
        return pt(r.get);
      if (typeof r.value == "function")
        return pt(r.value);
    }
    t = ed(t);
  }
  function n() {
    return null;
  }
  return n;
}
const Qa = ht(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), hi = ht(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), pi = ht(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), ld = ht(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), fi = ht(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), cd = ht(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), es = ht(["#text"]), ts = ht(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), gi = ht(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ns = ht(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Er = ht(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), ud = Ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm), dd = Ot(/<%[\w\W]*|[\w\W]*%>/gm), hd = Ot(/\$\{[\w\W]*/gm), pd = Ot(/^data-[\-\w.\u00B7-\uFFFF]+$/), fd = Ot(/^aria-[\-\w]+$/), zo = Ot(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), gd = Ot(/^(?:\w+script|data):/i), md = Ot(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Uo = Ot(/^html$/i), yd = Ot(/^[a-z][.\w]*(-[.\w]+)+$/i);
var rs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: fd,
  ATTR_WHITESPACE: md,
  CUSTOM_ELEMENT: yd,
  DATA_ATTR: pd,
  DOCTYPE_NAME: Uo,
  ERB_EXPR: dd,
  IS_ALLOWED_URI: zo,
  IS_SCRIPT_OR_DATA: gd,
  MUSTACHE_EXPR: ud,
  TMPLIT_EXPR: hd
});
const rr = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, wd = function() {
  return typeof window > "u" ? null : window;
}, Cd = function(e, n) {
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
}, is = function() {
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
function Ho() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wd();
  const e = (W) => Ho(W);
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
  } = t, w = l.prototype, k = nr(w, "cloneNode"), I = nr(w, "remove"), S = nr(w, "nextSibling"), v = nr(w, "childNodes"), R = nr(w, "parentNode");
  if (typeof s == "function") {
    const W = n.createElement("template");
    W.content && W.content.ownerDocument && (n = W.content.ownerDocument);
  }
  let D, M = "";
  const {
    implementation: b,
    createNodeIterator: j,
    createDocumentFragment: V,
    getElementsByTagName: K
  } = n, {
    importNode: q
  } = r;
  let ce = is();
  e.isSupported = typeof Fo == "function" && typeof R == "function" && b && b.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: G,
    ERB_EXPR: N,
    TMPLIT_EXPR: L,
    DATA_ATTR: U,
    ARIA_ATTR: ie,
    IS_SCRIPT_OR_DATA: Y,
    ATTR_WHITESPACE: me,
    CUSTOM_ELEMENT: de
  } = rs;
  let {
    IS_ALLOWED_URI: C
  } = rs, F = null;
  const $ = ve({}, [...Qa, ...hi, ...pi, ...fi, ...es]);
  let y = null;
  const J = ve({}, [...ts, ...gi, ...ns, ...Er]);
  let z = Object.seal($i(null, {
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
  })), oe = null, ye = null;
  const te = Object.seal($i(null, {
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
  let Le = !0, ke = !0, Se = !1, xe = !0, Fe = !1, je = !0, $e = !1, Ve = !1, _t = !1, gt = !1, Ht = !1, $t = !1, gn = !0, mn = !1;
  const En = "user-content-";
  let yn = !0, Jt = !1, T = {}, E = null;
  const Q = ve({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let we = null;
  const Te = ve({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ze = null;
  const mt = ve({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), st = "http://www.w3.org/1998/Math/MathML", Rt = "http://www.w3.org/2000/svg", rt = "http://www.w3.org/1999/xhtml";
  let Ge = rt, Pe = !1, Xe = null;
  const _r = ve({}, [st, Rt, rt], ui);
  let Lt = ve({}, ["mi", "mo", "mn", "ms", "mtext"]), wn = ve({}, ["annotation-xml"]);
  const Wn = ve({}, ["title", "style", "font", "a", "script"]);
  let Cn = null;
  const an = ["application/xhtml+xml", "text/html"], Rn = "text/html";
  let qe = null, Qt = null;
  const ii = n.createElement("form"), Sr = function(x) {
    return x instanceof RegExp || x instanceof Function;
  }, In = function() {
    let x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(Qt && Qt === x)) {
      if ((!x || typeof x != "object") && (x = {}), x = tn(x), Cn = // eslint-disable-next-line unicorn/prefer-includes
      an.indexOf(x.PARSER_MEDIA_TYPE) === -1 ? Rn : x.PARSER_MEDIA_TYPE, qe = Cn === "application/xhtml+xml" ? ui : Lr, F = Ft(x, "ALLOWED_TAGS") ? ve({}, x.ALLOWED_TAGS, qe) : $, y = Ft(x, "ALLOWED_ATTR") ? ve({}, x.ALLOWED_ATTR, qe) : J, Xe = Ft(x, "ALLOWED_NAMESPACES") ? ve({}, x.ALLOWED_NAMESPACES, ui) : _r, Ze = Ft(x, "ADD_URI_SAFE_ATTR") ? ve(tn(mt), x.ADD_URI_SAFE_ATTR, qe) : mt, we = Ft(x, "ADD_DATA_URI_TAGS") ? ve(tn(Te), x.ADD_DATA_URI_TAGS, qe) : Te, E = Ft(x, "FORBID_CONTENTS") ? ve({}, x.FORBID_CONTENTS, qe) : Q, oe = Ft(x, "FORBID_TAGS") ? ve({}, x.FORBID_TAGS, qe) : tn({}), ye = Ft(x, "FORBID_ATTR") ? ve({}, x.FORBID_ATTR, qe) : tn({}), T = Ft(x, "USE_PROFILES") ? x.USE_PROFILES : !1, Le = x.ALLOW_ARIA_ATTR !== !1, ke = x.ALLOW_DATA_ATTR !== !1, Se = x.ALLOW_UNKNOWN_PROTOCOLS || !1, xe = x.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Fe = x.SAFE_FOR_TEMPLATES || !1, je = x.SAFE_FOR_XML !== !1, $e = x.WHOLE_DOCUMENT || !1, gt = x.RETURN_DOM || !1, Ht = x.RETURN_DOM_FRAGMENT || !1, $t = x.RETURN_TRUSTED_TYPE || !1, _t = x.FORCE_BODY || !1, gn = x.SANITIZE_DOM !== !1, mn = x.SANITIZE_NAMED_PROPS || !1, yn = x.KEEP_CONTENT !== !1, Jt = x.IN_PLACE || !1, C = x.ALLOWED_URI_REGEXP || zo, Ge = x.NAMESPACE || rt, Lt = x.MATHML_TEXT_INTEGRATION_POINTS || Lt, wn = x.HTML_INTEGRATION_POINTS || wn, z = x.CUSTOM_ELEMENT_HANDLING || {}, x.CUSTOM_ELEMENT_HANDLING && Sr(x.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (z.tagNameCheck = x.CUSTOM_ELEMENT_HANDLING.tagNameCheck), x.CUSTOM_ELEMENT_HANDLING && Sr(x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (z.attributeNameCheck = x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), x.CUSTOM_ELEMENT_HANDLING && typeof x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (z.allowCustomizedBuiltInElements = x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Fe && (ke = !1), Ht && (gt = !0), T && (F = ve({}, es), y = [], T.html === !0 && (ve(F, Qa), ve(y, ts)), T.svg === !0 && (ve(F, hi), ve(y, gi), ve(y, Er)), T.svgFilters === !0 && (ve(F, pi), ve(y, gi), ve(y, Er)), T.mathMl === !0 && (ve(F, fi), ve(y, ns), ve(y, Er))), x.ADD_TAGS && (typeof x.ADD_TAGS == "function" ? te.tagCheck = x.ADD_TAGS : (F === $ && (F = tn(F)), ve(F, x.ADD_TAGS, qe))), x.ADD_ATTR && (typeof x.ADD_ATTR == "function" ? te.attributeCheck = x.ADD_ATTR : (y === J && (y = tn(y)), ve(y, x.ADD_ATTR, qe))), x.ADD_URI_SAFE_ATTR && ve(Ze, x.ADD_URI_SAFE_ATTR, qe), x.FORBID_CONTENTS && (E === Q && (E = tn(E)), ve(E, x.FORBID_CONTENTS, qe)), yn && (F["#text"] = !0), $e && ve(F, ["html", "head", "body"]), F.table && (ve(F, ["tbody"]), delete oe.tbody), x.TRUSTED_TYPES_POLICY) {
        if (typeof x.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw tr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof x.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw tr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        D = x.TRUSTED_TYPES_POLICY, M = D.createHTML("");
      } else
        D === void 0 && (D = Cd(h, i)), D !== null && typeof M == "string" && (M = D.createHTML(""));
      ht && ht(x), Qt = x;
    }
  }, Gn = ve({}, [...hi, ...pi, ...ld]), qn = ve({}, [...fi, ...cd]), br = function(x) {
    let P = R(x);
    (!P || !P.tagName) && (P = {
      namespaceURI: Ge,
      tagName: "template"
    });
    const ne = Lr(x.tagName), We = Lr(P.tagName);
    return Xe[x.namespaceURI] ? x.namespaceURI === Rt ? P.namespaceURI === rt ? ne === "svg" : P.namespaceURI === st ? ne === "svg" && (We === "annotation-xml" || Lt[We]) : !!Gn[ne] : x.namespaceURI === st ? P.namespaceURI === rt ? ne === "math" : P.namespaceURI === Rt ? ne === "math" && wn[We] : !!qn[ne] : x.namespaceURI === rt ? P.namespaceURI === Rt && !wn[We] || P.namespaceURI === st && !Lt[We] ? !1 : !qn[ne] && (Wn[ne] || !Gn[ne]) : !!(Cn === "application/xhtml+xml" && Xe[x.namespaceURI]) : !1;
  }, St = function(x) {
    Qn(e.removed, {
      element: x
    });
    try {
      R(x).removeChild(x);
    } catch {
      I(x);
    }
  }, Bt = function(x, P) {
    try {
      Qn(e.removed, {
        attribute: P.getAttributeNode(x),
        from: P
      });
    } catch {
      Qn(e.removed, {
        attribute: null,
        from: P
      });
    }
    if (P.removeAttribute(x), x === "is")
      if (gt || Ht)
        try {
          St(P);
        } catch {
        }
      else
        try {
          P.setAttribute(x, "");
        } catch {
        }
  }, Kn = function(x) {
    let P = null, ne = null;
    if (_t)
      x = "<remove></remove>" + x;
    else {
      const Je = di(x, /^[\r\n\t ]+/);
      ne = Je && Je[0];
    }
    Cn === "application/xhtml+xml" && Ge === rt && (x = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + x + "</body></html>");
    const We = D ? D.createHTML(x) : x;
    if (Ge === rt)
      try {
        P = new f().parseFromString(We, Cn);
      } catch {
      }
    if (!P || !P.documentElement) {
      P = b.createDocument(Ge, "template", null);
      try {
        P.documentElement.innerHTML = Pe ? M : We;
      } catch {
      }
    }
    const ot = P.body || P.documentElement;
    return x && ne && ot.insertBefore(n.createTextNode(ne), ot.childNodes[0] || null), Ge === rt ? K.call(P, $e ? "html" : "body")[0] : $e ? P.documentElement : ot;
  }, Yn = function(x) {
    return j.call(
      x.ownerDocument || x,
      x,
      // eslint-disable-next-line no-bitwise
      u.SHOW_ELEMENT | u.SHOW_COMMENT | u.SHOW_TEXT | u.SHOW_PROCESSING_INSTRUCTION | u.SHOW_CDATA_SECTION,
      null
    );
  }, Xn = function(x) {
    return x instanceof d && (typeof x.nodeName != "string" || typeof x.textContent != "string" || typeof x.removeChild != "function" || !(x.attributes instanceof c) || typeof x.removeAttribute != "function" || typeof x.setAttribute != "function" || typeof x.namespaceURI != "string" || typeof x.insertBefore != "function" || typeof x.hasChildNodes != "function");
  }, ai = function(x) {
    return typeof o == "function" && x instanceof o;
  };
  function It(W, x, P) {
    Tr(W, (ne) => {
      ne.call(e, x, P, Qt);
    });
  }
  const Jn = function(x) {
    let P = null;
    if (It(ce.beforeSanitizeElements, x, null), Xn(x))
      return St(x), !0;
    const ne = qe(x.nodeName);
    if (It(ce.uponSanitizeElement, x, {
      tagName: ne,
      allowedTags: F
    }), je && x.hasChildNodes() && !ai(x.firstElementChild) && dt(/<[/\w!]/g, x.innerHTML) && dt(/<[/\w!]/g, x.textContent) || x.nodeType === rr.progressingInstruction || je && x.nodeType === rr.comment && dt(/<[/\w]/g, x.data))
      return St(x), !0;
    if (!(te.tagCheck instanceof Function && te.tagCheck(ne)) && (!F[ne] || oe[ne])) {
      if (!oe[ne] && Re(ne) && (z.tagNameCheck instanceof RegExp && dt(z.tagNameCheck, ne) || z.tagNameCheck instanceof Function && z.tagNameCheck(ne)))
        return !1;
      if (yn && !E[ne]) {
        const We = R(x) || x.parentNode, ot = v(x) || x.childNodes;
        if (ot && We) {
          const Je = ot.length;
          for (let yt = Je - 1; yt >= 0; --yt) {
            const en = k(ot[yt], !0);
            en.__removalCount = (x.__removalCount || 0) + 1, We.insertBefore(en, S(x));
          }
        }
      }
      return St(x), !0;
    }
    return x instanceof l && !br(x) || (ne === "noscript" || ne === "noembed" || ne === "noframes") && dt(/<\/no(script|embed|frames)/i, x.innerHTML) ? (St(x), !0) : (Fe && x.nodeType === rr.text && (P = x.textContent, Tr([G, N, L], (We) => {
      P = er(P, We, " ");
    }), x.textContent !== P && (Qn(e.removed, {
      element: x.cloneNode()
    }), x.textContent = P)), It(ce.afterSanitizeElements, x, null), !1);
  }, A = function(x, P, ne) {
    if (gn && (P === "id" || P === "name") && (ne in n || ne in ii))
      return !1;
    if (!(ke && !ye[P] && dt(U, P))) {
      if (!(Le && dt(ie, P))) {
        if (!(te.attributeCheck instanceof Function && te.attributeCheck(P, x))) {
          if (!y[P] || ye[P]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Re(x) && (z.tagNameCheck instanceof RegExp && dt(z.tagNameCheck, x) || z.tagNameCheck instanceof Function && z.tagNameCheck(x)) && (z.attributeNameCheck instanceof RegExp && dt(z.attributeNameCheck, P) || z.attributeNameCheck instanceof Function && z.attributeNameCheck(P, x)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              P === "is" && z.allowCustomizedBuiltInElements && (z.tagNameCheck instanceof RegExp && dt(z.tagNameCheck, ne) || z.tagNameCheck instanceof Function && z.tagNameCheck(ne)))
            ) return !1;
          } else if (!Ze[P]) {
            if (!dt(C, er(ne, me, ""))) {
              if (!((P === "src" || P === "xlink:href" || P === "href") && x !== "script" && id(ne, "data:") === 0 && we[x])) {
                if (!(Se && !dt(Y, er(ne, me, "")))) {
                  if (ne)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Re = function(x) {
    return x !== "annotation-xml" && di(x, de);
  }, Ke = function(x) {
    It(ce.beforeSanitizeAttributes, x, null);
    const {
      attributes: P
    } = x;
    if (!P || Xn(x))
      return;
    const ne = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: y,
      forceKeepAttr: void 0
    };
    let We = P.length;
    for (; We--; ) {
      const ot = P[We], {
        name: Je,
        namespaceURI: yt,
        value: en
      } = ot, Nn = qe(Je), si = en;
      let it = Je === "value" ? si : ad(si);
      if (ne.attrName = Nn, ne.attrValue = it, ne.keepAttr = !0, ne.forceKeepAttr = void 0, It(ce.uponSanitizeAttribute, x, ne), it = ne.attrValue, mn && (Nn === "id" || Nn === "name") && (Bt(Je, x), it = En + it), je && dt(/((--!?|])>)|<\/(style|title|textarea)/i, it)) {
        Bt(Je, x);
        continue;
      }
      if (Nn === "attributename" && di(it, "href")) {
        Bt(Je, x);
        continue;
      }
      if (ne.forceKeepAttr)
        continue;
      if (!ne.keepAttr) {
        Bt(Je, x);
        continue;
      }
      if (!xe && dt(/\/>/i, it)) {
        Bt(Je, x);
        continue;
      }
      Fe && Tr([G, N, L], (Na) => {
        it = er(it, Na, " ");
      });
      const Ia = qe(x.nodeName);
      if (!A(Ia, Nn, it)) {
        Bt(Je, x);
        continue;
      }
      if (D && typeof h == "object" && typeof h.getAttributeType == "function" && !yt)
        switch (h.getAttributeType(Ia, Nn)) {
          case "TrustedHTML": {
            it = D.createHTML(it);
            break;
          }
          case "TrustedScriptURL": {
            it = D.createScriptURL(it);
            break;
          }
        }
      if (it !== si)
        try {
          yt ? x.setAttributeNS(yt, Je, it) : x.setAttribute(Je, it), Xn(x) ? St(x) : Ja(e.removed);
        } catch {
          Bt(Je, x);
        }
    }
    It(ce.afterSanitizeAttributes, x, null);
  }, Ye = function W(x) {
    let P = null;
    const ne = Yn(x);
    for (It(ce.beforeSanitizeShadowDOM, x, null); P = ne.nextNode(); )
      It(ce.uponSanitizeShadowNode, P, null), Jn(P), Ke(P), P.content instanceof a && W(P.content);
    It(ce.afterSanitizeShadowDOM, x, null);
  };
  return e.sanitize = function(W) {
    let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P = null, ne = null, We = null, ot = null;
    if (Pe = !W, Pe && (W = "<!-->"), typeof W != "string" && !ai(W))
      if (typeof W.toString == "function") {
        if (W = W.toString(), typeof W != "string")
          throw tr("dirty is not a string, aborting");
      } else
        throw tr("toString is not a function");
    if (!e.isSupported)
      return W;
    if (Ve || In(x), e.removed = [], typeof W == "string" && (Jt = !1), Jt) {
      if (W.nodeName) {
        const en = qe(W.nodeName);
        if (!F[en] || oe[en])
          throw tr("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (W instanceof o)
      P = Kn("<!---->"), ne = P.ownerDocument.importNode(W, !0), ne.nodeType === rr.element && ne.nodeName === "BODY" || ne.nodeName === "HTML" ? P = ne : P.appendChild(ne);
    else {
      if (!gt && !Fe && !$e && // eslint-disable-next-line unicorn/prefer-includes
      W.indexOf("<") === -1)
        return D && $t ? D.createHTML(W) : W;
      if (P = Kn(W), !P)
        return gt ? null : $t ? M : "";
    }
    P && _t && St(P.firstChild);
    const Je = Yn(Jt ? W : P);
    for (; We = Je.nextNode(); )
      Jn(We), Ke(We), We.content instanceof a && Ye(We.content);
    if (Jt)
      return W;
    if (gt) {
      if (Ht)
        for (ot = V.call(P.ownerDocument); P.firstChild; )
          ot.appendChild(P.firstChild);
      else
        ot = P;
      return (y.shadowroot || y.shadowrootmode) && (ot = q.call(r, ot, !0)), ot;
    }
    let yt = $e ? P.outerHTML : P.innerHTML;
    return $e && F["!doctype"] && P.ownerDocument && P.ownerDocument.doctype && P.ownerDocument.doctype.name && dt(Uo, P.ownerDocument.doctype.name) && (yt = "<!DOCTYPE " + P.ownerDocument.doctype.name + `>
` + yt), Fe && Tr([G, N, L], (en) => {
      yt = er(yt, en, " ");
    }), D && $t ? D.createHTML(yt) : yt;
  }, e.setConfig = function() {
    let W = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    In(W), Ve = !0;
  }, e.clearConfig = function() {
    Qt = null, Ve = !1;
  }, e.isValidAttribute = function(W, x, P) {
    Qt || In({});
    const ne = qe(W), We = qe(x);
    return A(ne, We, P);
  }, e.addHook = function(W, x) {
    typeof x == "function" && Qn(ce[W], x);
  }, e.removeHook = function(W, x) {
    if (x !== void 0) {
      const P = nd(ce[W], x);
      return P === -1 ? void 0 : rd(ce[W], P, 1)[0];
    }
    return Ja(ce[W]);
  }, e.removeHooks = function(W) {
    ce[W] = [];
  }, e.removeAllHooks = function() {
    ce = is();
  }, e;
}
var $o = Ho();
const xd = {
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
function kd(t, e = "userMessage") {
  if (typeof t != "string")
    return console.warn("sanitizeInput received non-string input:", typeof t), "";
  if (!t.trim())
    return "";
  try {
    const n = xd[e], r = $o.sanitize(t, n);
    return Bo(r) ? (console.warn("Suspicious content detected and removed:", t), r.replace(/javascript:/gi, "").replace(/data:/gi, "")) : r;
  } catch (n) {
    return console.error("Error sanitizing input:", n), "";
  }
}
function Bo(t) {
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
  return kd(r, e ? "assistantMessage" : "userMessage").replace(new RegExp(n, "g"), `
`);
}
function _d(t) {
  return typeof t != "string" ? "" : t.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function as(t) {
  if (typeof t != "string") return !1;
  try {
    const e = new URL(t);
    return !(!["http:", "https:", "data:"].includes(e.protocol) || Bo(t));
  } catch {
    return !1;
  }
}
function Sd() {
  $o.addHook("beforeSanitizeAttributes", (t) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      t.hasAttribute(n) && t.removeAttribute(n);
    }), t.hasAttribute("href")) {
      const n = t.getAttribute("href");
      n && !as(n) && t.removeAttribute("href");
    }
    if (t.hasAttribute("src")) {
      const n = t.getAttribute("src");
      n && !as(n) && t.removeAttribute("src");
    }
  });
}
Sd();
function bd() {
  const [t, e] = Ee([]), n = ue(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = ue(
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
  ), i = ue((s, o) => {
    e(
      (l) => l.map((u) => u.id === s ? { ...u, ...o } : u)
    );
  }, []), a = ue(
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
const ss = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), r = (u, c) => {
    const d = typeof u == "function" ? u(e) : u;
    if (!Object.is(d, e)) {
      const f = e;
      e = c ?? (typeof d != "object" || d === null) ? d : Object.assign({}, e, d), n.forEach((h) => h(e, f));
    }
  }, i = () => e, o = { setState: r, getState: i, getInitialState: () => l, subscribe: (u) => (n.add(u), () => n.delete(u)) }, l = e = t(r, i, o);
  return o;
}, vd = (t) => t ? ss(t) : ss, Td = (t) => t;
function Ed(t, e = Td) {
  const n = zt.useSyncExternalStore(
    t.subscribe,
    zt.useCallback(() => e(t.getState()), [t, e]),
    zt.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return zt.useDebugValue(n), n;
}
const Rd = (t) => {
  const e = vd(t), n = (r) => Ed(e, r);
  return Object.assign(n, e), n;
}, Id = (t) => Rd, os = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, mr = /* @__PURE__ */ new Map(), Rr = (t) => {
  const e = mr.get(t);
  return e ? Object.fromEntries(
    Object.entries(e.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, Nd = (t, e, n) => {
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
}, Ad = (t, e) => {
  if (e === void 0) return;
  const n = mr.get(t);
  n && (delete n.stores[e], Object.keys(n.stores).length === 0 && mr.delete(t));
}, Od = (t) => {
  var e, n;
  if (!t) return;
  const r = t.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((e = r[i + 1]) == null ? void 0 : e.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, Md = (t, e = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...l } = e;
  let u;
  try {
    u = (a ?? (os ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!u)
    return t(n, r, i);
  const { connection: c, ...d } = Nd(o, u, l);
  let f = !0;
  i.setState = (k, I, S) => {
    const v = n(k, I);
    if (!f) return v;
    const R = S === void 0 ? {
      type: s || Od(new Error().stack) || "anonymous"
    } : typeof S == "string" ? { type: S } : S;
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
      c && typeof c.unsubscribe == "function" && c.unsubscribe(), Ad(l.name, o);
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
    i.dispatch = (...S) => {
      (os ? "production" : void 0) !== "production" && S[0].type === "__setState" && !k && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), k = !0), I(...S);
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
          (S) => {
            if (S.type === "__setState") {
              if (o === void 0) {
                h(S.state);
                return;
              }
              Object.keys(S.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const v = S.state[o];
              if (v == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(v) && h(v);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(S);
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
            return mi(k.state, (S) => {
              if (o === void 0) {
                h(S), c == null || c.init(i.getState());
                return;
              }
              h(S[o]), c == null || c.init(Rr(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return mi(k.state, (S) => {
              if (o === void 0) {
                h(S);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(S[o]) && h(S[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: S } = k.payload, v = (I = S.computedStates.slice(-1)[0]) == null ? void 0 : I.state;
            if (!v) return;
            h(o === void 0 ? v : v[o]), c == null || c.send(
              null,
              // FIXME no-any
              S
            );
            return;
          }
          case "PAUSE_RECORDING":
            return f = !f;
        }
        return;
    }
  }), w;
}, Ld = Md, mi = (t, e) => {
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
}, Pd = (t) => ({
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
}), Dd = (t) => ({
  // Initial state
  chatStatus: ze.IDLE,
  streamingStatus: vt.IDLE,
  // Actions
  setChatStatus: (e) => t({ chatStatus: e }),
  setStreamingStatus: (e) => t({ streamingStatus: e }),
  resetChatStatus: () => t({
    chatStatus: ze.IDLE,
    streamingStatus: vt.IDLE
  })
}), Fd = (t) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (e) => t({ isLoadingConversation: e }),
  setConversationError: (e) => t({ conversationError: e }),
  clearConversationError: () => t({ conversationError: null })
}), zd = (t) => ({
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
}), Ud = (t) => ({
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
}), fe = Id()(
  Ld(
    (...t) => ({
      ...Pd(...t),
      ...Dd(...t),
      ...Fd(...t),
      ...zd(...t),
      ...Ud(...t)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), L0 = () => fe((t) => ({
  isModalOpen: t.isModalOpen,
  isCollapsed: t.isCollapsed,
  currentMode: t.currentMode,
  openModal: t.openModal,
  closeModal: t.closeModal,
  toggleCollapse: t.toggleCollapse,
  toggleFullscreen: t.toggleFullscreen
})), P0 = () => fe((t) => ({
  chatStatus: t.chatStatus,
  streamingStatus: t.streamingStatus,
  setChatStatus: t.setChatStatus,
  setStreamingStatus: t.setStreamingStatus,
  resetChatStatus: t.resetChatStatus
})), D0 = () => fe((t) => ({
  isLoadingConversation: t.isLoadingConversation,
  conversationError: t.conversationError,
  setIsLoadingConversation: t.setIsLoadingConversation,
  setConversationError: t.setConversationError,
  clearConversationError: t.clearConversationError
})), F0 = () => fe((t) => ({
  currentThreadId: t.currentThreadId,
  providerResId: t.providerResId,
  setCurrentThreadId: t.setCurrentThreadId,
  setProviderResId: t.setProviderResId,
  clearThreadData: t.clearThreadData
}));
function Hd() {
  const t = fe((v) => v.isStreaming), e = fe((v) => v.setIsStreaming), n = fe((v) => v.isThinking), r = fe((v) => v.setIsThinking), i = fe((v) => v.streamingContent), a = fe((v) => v.setStreamingContent), s = fe((v) => v.isHandlingTool), o = fe((v) => v.setIsHandlingTool), l = fe((v) => v.startStreaming), u = fe((v) => v.stopStreaming), c = fe((v) => v.clearStreamingBuffers), d = fe((v) => v.resetToolHandling), f = pe(""), h = Be(() => ({
    get current() {
      return fe.getState().currentAssistantMessageId;
    },
    set current(v) {
      fe.getState().setCurrentAssistantMessageId(v);
    }
  }), []), w = ue((v) => {
    v ? l(v) : (e(!0), r(!0), a("")), f.current = "";
  }, [l, e, r, a]), k = ue(() => {
    u(), f.current = "";
  }, [u]), I = ue(() => {
    d();
  }, [d]), S = ue(() => {
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
    clearStreamingBuffers: S
  };
}
const ge = (t) => typeof t == "string", ir = () => {
  let t, e;
  const n = new Promise((r, i) => {
    t = r, e = i;
  });
  return n.resolve = t, n.reject = e, n;
}, ls = (t) => t == null ? "" : "" + t, $d = (t, e, n) => {
  t.forEach((r) => {
    e[r] && (n[r] = e[r]);
  });
}, Bd = /###/g, cs = (t) => t && t.indexOf("###") > -1 ? t.replace(Bd, ".") : t, us = (t) => !t || ge(t), lr = (t, e, n) => {
  const r = ge(e) ? e.split(".") : e;
  let i = 0;
  for (; i < r.length - 1; ) {
    if (us(t)) return {};
    const a = cs(r[i]);
    !t[a] && n && (t[a] = new n()), Object.prototype.hasOwnProperty.call(t, a) ? t = t[a] : t = {}, ++i;
  }
  return us(t) ? {} : {
    obj: t,
    k: cs(r[i])
  };
}, ds = (t, e, n) => {
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
}, jd = (t, e, n, r) => {
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
}, Vd = (t, e, n) => {
  const r = Vr(t, n);
  return r !== void 0 ? r : Vr(e, n);
}, jo = (t, e, n) => {
  for (const r in e)
    r !== "__proto__" && r !== "constructor" && (r in t ? ge(t[r]) || t[r] instanceof String || ge(e[r]) || e[r] instanceof String ? n && (t[r] = e[r]) : jo(t[r], e[r], n) : t[r] = e[r]);
  return t;
}, An = (t) => t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var Zd = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const Wd = (t) => ge(t) ? t.replace(/[&<>"'\/]/g, (e) => Zd[e]) : t;
class Gd {
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
const qd = [" ", ",", "?", "!", ";"], Kd = new Gd(20), Yd = (t, e, n) => {
  e = e || "", n = n || "";
  const r = qd.filter((s) => e.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0) return !0;
  const i = Kd.getRegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
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
}, yr = (t) => t == null ? void 0 : t.replace("_", "-"), Xd = {
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
    this.prefix = n.prefix || "i18next:", this.logger = e || Xd, this.options = n, this.debug = n.debug;
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
    return i && !this.debug ? null : (ge(e[0]) && (e[0] = `${r}${this.prefix} ${e[0]}`), this.logger[n](e));
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
var qt = new Zr();
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
class hs extends Qr {
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
    e.indexOf(".") > -1 ? o = e.split(".") : (o = [e, n], r && (Array.isArray(r) ? o.push(...r) : ge(r) && a ? o.push(...r.split(a)) : o.push(r)));
    const l = Vr(this.data, o);
    return !l && !n && !r && e.indexOf(".") > -1 && (e = o[0], n = o[1], r = o.slice(2).join(".")), l || !s || !ge(r) ? l : Vi((c = (u = this.data) == null ? void 0 : u[e]) == null ? void 0 : c[n], r, a);
  }
  addResource(e, n, r, i, a = {
    silent: !1
  }) {
    const s = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [e, n];
    r && (o = o.concat(s ? r.split(s) : r)), e.indexOf(".") > -1 && (o = e.split("."), i = n, n = o[1]), this.addNamespaces(n), ds(this.data, o, i), a.silent || this.emit("added", e, n, r, i);
  }
  addResources(e, n, r, i = {
    silent: !1
  }) {
    for (const a in r)
      (ge(r[a]) || Array.isArray(r[a])) && this.addResource(e, n, a, r[a], {
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
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))), i ? jo(l, r, a) : l = {
      ...l,
      ...r
    }, ds(this.data, o, l), s.silent || this.emit("added", e, n, r);
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
var Vo = {
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
const Zo = Symbol("i18next/PATH_KEY");
function Jd() {
  const t = [], e = /* @__PURE__ */ Object.create(null);
  let n;
  return e.get = (r, i) => {
    var a;
    return (a = n == null ? void 0 : n.revoke) == null || a.call(n), i === Zo ? t : (t.push(i), n = Proxy.revocable(r, e), n.proxy);
  }, Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function Zi(t, e) {
  const {
    [Zo]: n
  } = t(Jd());
  return n.join((e == null ? void 0 : e.keySeparator) ?? ".");
}
const ps = {}, yi = (t) => !ge(t) && typeof t != "boolean" && typeof t != "number";
class Wr extends Qr {
  constructor(e, n = {}) {
    super(), $d(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = qt.create("translator");
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
    const s = r && e.indexOf(r) > -1, o = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !Yd(e, r, i);
    if (s && !o) {
      const l = e.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: e,
          namespaces: ge(a) ? [a] : a
        };
      const u = e.split(r);
      (r !== i || r === i && this.options.ns.indexOf(u[0]) > -1) && (a = u.shift()), e = u.join(i);
    }
    return {
      key: e,
      namespaces: ge(a) ? [a] : a
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
    const k = (h == null ? void 0 : h.usedKey) || o, I = (h == null ? void 0 : h.exactUsedKey) || o, S = ["[object Number]", "[object Function]", "[object RegExp]"], v = i.joinArrays !== void 0 ? i.joinArrays : this.options.joinArrays, R = !this.i18nFormat || this.i18nFormat.handleAsObject, D = i.count !== void 0 && !ge(i.count), M = Wr.hasDefaultValue(i), b = D ? this.pluralResolver.getSuffix(d, i.count, i) : "", j = i.ordinal && D ? this.pluralResolver.getSuffix(d, i.count, {
      ordinal: !1
    }) : "", V = D && !i.ordinal && i.count === 0, K = V && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${b}`] || i[`defaultValue${j}`] || i.defaultValue;
    let q = w;
    R && !w && M && (q = K);
    const ce = yi(q), G = Object.prototype.toString.apply(q);
    if (R && q && ce && S.indexOf(G) < 0 && !(ge(v) && Array.isArray(q))) {
      if (!i.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const N = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(k, q, {
          ...i,
          ns: l
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return a ? (h.res = N, h.usedParams = this.getUsedParamsDetails(i), h) : N;
      }
      if (s) {
        const N = Array.isArray(q), L = N ? [] : {}, U = N ? I : k;
        for (const ie in q)
          if (Object.prototype.hasOwnProperty.call(q, ie)) {
            const Y = `${U}${s}${ie}`;
            M && !w ? L[ie] = this.translate(Y, {
              ...i,
              defaultValue: yi(K) ? K[ie] : void 0,
              joinArrays: !1,
              ns: l
            }) : L[ie] = this.translate(Y, {
              ...i,
              joinArrays: !1,
              ns: l
            }), L[ie] === Y && (L[ie] = q[ie]);
          }
        w = L;
      }
    } else if (R && ge(v) && Array.isArray(w))
      w = w.join(v), w && (w = this.extendTranslation(w, e, i, r));
    else {
      let N = !1, L = !1;
      !this.isValidLookup(w) && M && (N = !0, w = K), this.isValidLookup(w) || (L = !0, w = o);
      const ie = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && L ? void 0 : w, Y = M && K !== w && this.options.updateMissing;
      if (L || N || Y) {
        if (this.logger.log(Y ? "updateKey" : "missingKey", d, u, o, Y ? K : w), s) {
          const F = this.resolve(o, {
            ...i,
            keySeparator: !1
          });
          F && F.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let me = [];
        const de = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && de && de[0])
          for (let F = 0; F < de.length; F++)
            me.push(de[F]);
        else this.options.saveMissingTo === "all" ? me = this.languageUtils.toResolveHierarchy(i.lng || this.language) : me.push(i.lng || this.language);
        const C = (F, $, y) => {
          var z;
          const J = M && y !== w ? y : ie;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(F, u, $, J, Y, i) : (z = this.backendConnector) != null && z.saveMissing && this.backendConnector.saveMissing(F, u, $, J, Y, i), this.emit("missingKey", F, u, $, w);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && D ? me.forEach((F) => {
          const $ = this.pluralResolver.getSuffixes(F, i);
          V && i[`defaultValue${this.options.pluralSeparator}zero`] && $.indexOf(`${this.options.pluralSeparator}zero`) < 0 && $.push(`${this.options.pluralSeparator}zero`), $.forEach((y) => {
            C([F], o + y, i[`defaultValue${y}`] || K);
          });
        }) : C(me, o, K));
      }
      w = this.extendTranslation(w, e, i, h, r), L && w === o && this.options.appendNamespaceToMissingKey && (w = `${u}${c}${o}`), (L || N) && this.options.parseMissingKeyHandler && (w = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${u}${c}${o}` : o, N ? w : void 0, i));
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
      const c = ge(e) && (((u = r == null ? void 0 : r.interpolation) == null ? void 0 : u.skipOnVariables) !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let d;
      if (c) {
        const h = e.match(this.interpolator.nestingRegexp);
        d = h && h.length;
      }
      let f = r.replace && !ge(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (f = {
        ...this.options.interpolation.defaultVariables,
        ...f
      }), e = this.interpolator.interpolate(e, f, r.lng || this.language || i.usedLng, r), c) {
        const h = e.match(this.interpolator.nestingRegexp), w = h && h.length;
        d < w && (r.nest = !1);
      }
      !r.lng && i && i.res && (r.lng = this.language || i.usedLng), r.nest !== !1 && (e = this.interpolator.nest(e, (...h) => (a == null ? void 0 : a[0]) === h[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${n[0]}`), null) : this.translate(...h, n), r)), r.interpolation && this.interpolator.reset();
    }
    const s = r.postProcess || this.options.postProcess, o = ge(s) ? [s] : s;
    return e != null && (o != null && o.length) && r.applyPostProcessor !== !1 && (e = Vo.handle(o, e, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), e;
  }
  resolve(e, n = {}) {
    let r, i, a, s, o;
    return ge(e) && (e = [e]), e.forEach((l) => {
      if (this.isValidLookup(r)) return;
      const u = this.extractFromKey(l, n), c = u.key;
      i = c;
      let d = u.namespaces;
      this.options.fallbackNS && (d = d.concat(this.options.fallbackNS));
      const f = n.count !== void 0 && !ge(n.count), h = f && !n.ordinal && n.count === 0, w = n.context !== void 0 && (ge(n.context) || typeof n.context == "number") && n.context !== "", k = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      d.forEach((I) => {
        var S, v;
        this.isValidLookup(r) || (o = I, !ps[`${k[0]}-${I}`] && ((S = this.utils) != null && S.hasLoadedNamespace) && !((v = this.utils) != null && v.hasLoadedNamespace(o)) && (ps[`${k[0]}-${I}`] = !0, this.logger.warn(`key "${i}" for languages "${k.join(", ")}" won't get resolved as namespace "${o}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), k.forEach((R) => {
          var b;
          if (this.isValidLookup(r)) return;
          s = R;
          const D = [c];
          if ((b = this.i18nFormat) != null && b.addLookupKeys)
            this.i18nFormat.addLookupKeys(D, c, R, I, n);
          else {
            let j;
            f && (j = this.pluralResolver.getSuffix(R, n.count, n));
            const V = `${this.options.pluralSeparator}zero`, K = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (f && (n.ordinal && j.indexOf(K) === 0 && D.push(c + j.replace(K, this.options.pluralSeparator)), D.push(c + j), h && D.push(c + V)), w) {
              const q = `${c}${this.options.contextSeparator || "_"}${n.context}`;
              D.push(q), f && (n.ordinal && j.indexOf(K) === 0 && D.push(q + j.replace(K, this.options.pluralSeparator)), D.push(q + j), h && D.push(q + V));
            }
          }
          let M;
          for (; M = D.pop(); )
            this.isValidLookup(r) || (a = M, r = this.getResource(R, I, M, n));
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
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = e.replace && !ge(e.replace);
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
class fs {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = qt.create("languageUtils");
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
    if (ge(e) && e.indexOf("-") > -1) {
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
    if (typeof e == "function" && (e = e(n)), ge(e) && (e = [e]), Array.isArray(e)) return e;
    if (!n) return e.default || [];
    let r = e[n];
    return r || (r = e[this.getScriptPartFromCode(n)]), r || (r = e[this.formatLanguageCode(n)]), r || (r = e[this.getLanguagePartFromCode(n)]), r || (r = e.default), r || [];
  }
  toResolveHierarchy(e, n) {
    const r = this.getFallbackCodes((n === !1 ? [] : n) || this.options.fallbackLng || [], e), i = [], a = (s) => {
      s && (this.isSupportedCode(s) ? i.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return ge(e) && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(e))) : ge(e) && a(this.formatLanguageCode(e)), r.forEach((s) => {
      i.indexOf(s) < 0 && a(this.formatLanguageCode(s));
    }), i;
  }
}
const gs = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, ms = {
  select: (t) => t === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class Qd {
  constructor(e, n = {}) {
    this.languageUtils = e, this.options = n, this.logger = qt.create("pluralResolver"), this.pluralRulesCache = {};
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
        return this.logger.error("No Intl support, please use an Intl polyfill!"), ms;
      if (!e.match(/-|_/)) return ms;
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
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((i, a) => gs[i] - gs[a]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(e, n, r = {}) {
    const i = this.getRule(e, r);
    return i ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", n, r));
  }
}
const ys = (t, e, n, r = ".", i = !0) => {
  let a = Vd(t, e, n);
  return !a && i && ge(n) && (a = Vi(t, n, r), a === void 0 && (a = Vi(e, n, r))), a;
}, wi = (t) => t.replace(/\$/g, "$$$$");
class ws {
  constructor(e = {}) {
    var n;
    this.logger = qt.create("interpolator"), this.options = e, this.format = ((n = e == null ? void 0 : e.interpolation) == null ? void 0 : n.format) || ((r) => r), this.init(e);
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
      maxReplaces: S,
      alwaysFormat: v
    } = e.interpolation;
    this.escape = n !== void 0 ? n : Wd, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = a ? An(a) : s || "{{", this.suffix = o ? An(o) : l || "}}", this.formatSeparator = u || ",", this.unescapePrefix = c ? "" : d || "-", this.unescapeSuffix = this.unescapePrefix ? "" : c || "", this.nestingPrefix = f ? An(f) : h || An("$t("), this.nestingSuffix = w ? An(w) : k || An(")"), this.nestingOptionsSeparator = I || ",", this.maxReplaces = S || 1e3, this.alwaysFormat = v !== void 0 ? v : !1, this.resetRegExp();
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
        const v = ys(n, l, w, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(v, void 0, r, {
          ...i,
          ...n,
          interpolationkey: w
        }) : v;
      }
      const k = w.split(this.formatSeparator), I = k.shift().trim(), S = k.join(this.formatSeparator).trim();
      return this.format(ys(n, l, I, this.options.keySeparator, this.options.ignoreJSONStructure), S, r, {
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
            const S = c(e, a, i);
            s = ge(S) ? S : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, k))
            s = "";
          else if (d) {
            s = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${k} for interpolating ${e}`), s = "";
        else !ge(s) && !this.useRawValueToEscape && (s = ls(s));
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
      }, s = s.replace && !ge(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      const u = /{.*}/.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
      if (u !== -1 && (l = i[1].slice(u).split(this.formatSeparator).map((c) => c.trim()).filter(Boolean), i[1] = i[1].slice(0, u)), a = n(o.call(this, i[1].trim(), s), s), a && i[0] === e && !ge(a)) return a;
      ge(a) || (a = ls(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), a = ""), l.length && (a = l.reduce((c, d) => this.format(c, d, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), a.trim())), e = e.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const eh = (t) => {
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
}, Cs = (t) => {
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
}, th = (t) => (e, n, r) => t(yr(n), r)(e);
class nh {
  constructor(e = {}) {
    this.logger = qt.create("formatter"), this.options = e, this.init(e);
  }
  init(e, n = {
    interpolation: {}
  }) {
    this.formatSeparator = n.interpolation.formatSeparator || ",";
    const r = n.cacheInBuiltFormats ? Cs : th;
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
    this.formats[e.toLowerCase().trim()] = Cs(n);
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
      } = eh(l);
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
const rh = (t, e) => {
  t.pending[e] !== void 0 && (delete t.pending[e], t.pendingCount--);
};
class ih extends Qr {
  constructor(e, n, r, i = {}) {
    var a, s;
    super(), this.backend = e, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = qt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], (s = (a = this.backend) == null ? void 0 : a.init) == null || s.call(a, r, i.backend, i);
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
      jd(l.loaded, [a], s), rh(l, e), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((u) => {
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
    ge(e) && (e = this.languageUtils.toResolveHierarchy(e)), ge(n) && (n = [n]);
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
    if (typeof t[1] == "object" && (e = t[1]), ge(t[1]) && (e.defaultValue = t[1]), ge(t[2]) && (e.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
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
}), xs = (t) => {
  var e, n;
  return ge(t.ns) && (t.ns = [t.ns]), ge(t.fallbackLng) && (t.fallbackLng = [t.fallbackLng]), ge(t.fallbackNS) && (t.fallbackNS = [t.fallbackNS]), ((n = (e = t.supportedLngs) == null ? void 0 : e.indexOf) == null ? void 0 : n.call(e, "cimode")) < 0 && (t.supportedLngs = t.supportedLngs.concat(["cimode"])), typeof t.initImmediate == "boolean" && (t.initAsync = t.initImmediate), t;
}, Ir = () => {
}, ah = (t) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach((n) => {
    typeof t[n] == "function" && (t[n] = t[n].bind(t));
  });
};
class cr extends Qr {
  constructor(e = {}, n) {
    if (super(), this.options = xs(e), this.services = {}, this.logger = qt, this.modules = {
      external: []
    }, ah(this), n && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, n), this;
      setTimeout(() => {
        this.init(e, n);
      }, 0);
    }
  }
  init(e = {}, n) {
    this.isInitializing = !0, typeof e == "function" && (n = e, e = {}), e.defaultNS == null && e.ns && (ge(e.ns) ? e.defaultNS = e.ns : e.ns.indexOf("translation") < 0 && (e.defaultNS = e.ns[0]));
    const r = Ci();
    this.options = {
      ...r,
      ...this.options,
      ...xs(e)
    }, this.options.interpolation = {
      ...r.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = r.overloadTranslationOptionHandler);
    const i = (u) => u ? typeof u == "function" ? new u() : u : null;
    if (!this.options.isClone) {
      this.modules.logger ? qt.init(i(this.modules.logger), this.options) : qt.init(null, this.options);
      let u;
      this.modules.formatter ? u = this.modules.formatter : u = nh;
      const c = new fs(this.options);
      this.store = new hs(this.options.resources, this.options);
      const d = this.services;
      d.logger = qt, d.resourceStore = this.store, d.languageUtils = c, d.pluralResolver = new Qd(c, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"), u && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (d.formatter = i(u), d.formatter.init && d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new ws(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new ih(i(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", (h, ...w) => {
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
    const i = ge(e) ? e : this.language;
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
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && Vo.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
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
      const l = ge(o) ? o : o && o[0], u = this.store.hasLanguageSomeTranslations(l) ? l : this.services.languageUtils.getBestMatchFromCodes(ge(o) ? [o] : o);
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
    return ge(e) ? i.lng = e : i.lngs = e, i.ns = n, i.keyPrefix = r, i;
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
    return this.options.ns ? (ge(e) && (e = [e]), e.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(e, n) {
    const r = ir();
    ge(e) && (e = [e]);
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
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = ((a = this.services) == null ? void 0 : a.languageUtils) || new fs(Ci());
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
      a.store = new hs(o, i), a.services.resourceStore = a.store;
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
      a.services.interpolator = new ws(u);
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
const sh = (t, e, n, r) => {
  var a, s, o, l;
  const i = [n, {
    code: e,
    ...r || {}
  }];
  if ((s = (a = t == null ? void 0 : t.services) == null ? void 0 : a.logger) != null && s.forward)
    return t.services.logger.forward(i, "warn", "react-i18next::", !0);
  vn(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (l = (o = t == null ? void 0 : t.services) == null ? void 0 : o.logger) != null && l.warn ? t.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, ks = {}, Wo = (t, e, n, r) => {
  vn(n) && ks[n] || (vn(n) && (ks[n] = /* @__PURE__ */ new Date()), sh(t, e, n, r));
}, Go = (t, e) => () => {
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
  t.loadNamespaces(e, Go(t, n));
}, _s = (t, e, n, r) => {
  if (vn(n) && (n = [n]), t.options.preload && t.options.preload.indexOf(e) > -1) return Wi(t, n, r);
  n.forEach((i) => {
    t.options.ns.indexOf(i) < 0 && t.options.ns.push(i);
  }), t.loadLanguages(e, Go(t, r));
}, oh = (t, e, n = {}) => !e.languages || !e.languages.length ? (Wo(e, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: e.languages
}), !0) : e.hasLoadedNamespace(t, {
  lng: n.lng,
  precheck: (r, i) => {
    if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && r.services.backendConnector.backend && r.isLanguageChangingTo && !i(r.isLanguageChangingTo, t)) return !1;
  }
}), vn = (t) => typeof t == "string", lh = (t) => typeof t == "object" && t !== null, ch = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, uh = {
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
}, dh = (t) => uh[t], hh = (t) => t.replace(ch, dh);
let Gi = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: hh,
  transDefaultProps: void 0
};
const ph = (t = {}) => {
  Gi = {
    ...Gi,
    ...t
  };
}, fh = () => Gi;
let qo;
const gh = (t) => {
  qo = t;
}, mh = () => qo, yh = {
  type: "3rdParty",
  init(t) {
    ph(t.options.react), gh(t);
  }
}, wh = Yr();
class Ch {
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
var Ko = { exports: {} }, Yo = {};
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
function xh(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var kh = typeof Object.is == "function" ? Object.is : xh, _h = Bn.useState, Sh = Bn.useEffect, bh = Bn.useLayoutEffect, vh = Bn.useDebugValue;
function Th(t, e) {
  var n = e(), r = _h({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return bh(
    function() {
      i.value = n, i.getSnapshot = e, xi(i) && a({ inst: i });
    },
    [t, n, e]
  ), Sh(
    function() {
      return xi(i) && a({ inst: i }), t(function() {
        xi(i) && a({ inst: i });
      });
    },
    [t]
  ), vh(n), n;
}
function xi(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !kh(t, n);
  } catch {
    return !0;
  }
}
function Eh(t, e) {
  return e();
}
var Rh = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Eh : Th;
Yo.useSyncExternalStore = Bn.useSyncExternalStore !== void 0 ? Bn.useSyncExternalStore : Rh;
Ko.exports = Yo;
var Ih = Ko.exports;
const Nh = (t, e) => vn(e) ? e : lh(e) && vn(e.defaultValue) ? e.defaultValue : Array.isArray(t) ? t[t.length - 1] : t, Ah = {
  t: Nh,
  ready: !1
}, Oh = () => () => {
}, Mh = (t, e = {}) => {
  var K, q, ce;
  const {
    i18n: n
  } = e, {
    i18n: r,
    defaultNS: i
  } = Xr(wh) || {}, a = n || r || mh();
  a && !a.reportNamespaces && (a.reportNamespaces = new Ch()), a || Wo(a, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
  const s = Be(() => {
    var G;
    return {
      ...fh(),
      ...(G = a == null ? void 0 : a.options) == null ? void 0 : G.react,
      ...e
    };
  }, [a, e]), {
    useSuspense: o,
    keyPrefix: l
  } = s, u = i || ((K = a == null ? void 0 : a.options) == null ? void 0 : K.defaultNS), c = vn(u) ? [u] : u || ["translation"], d = Be(() => c, c);
  (ce = (q = a == null ? void 0 : a.reportNamespaces) == null ? void 0 : q.addUsedNamespaces) == null || ce.call(q, d);
  const f = pe(0), h = ue((G) => {
    if (!a) return Oh;
    const {
      bindI18n: N,
      bindI18nStore: L
    } = s, U = () => {
      f.current += 1, G();
    };
    return N && a.on(N, U), L && a.store.on(L, U), () => {
      N && N.split(" ").forEach((ie) => a.off(ie, U)), L && L.split(" ").forEach((ie) => a.store.off(ie, U));
    };
  }, [a, s]), w = pe(), k = ue(() => {
    if (!a)
      return Ah;
    const G = !!(a.isInitialized || a.initializedStoreOnce) && d.every((me) => oh(me, a, s)), N = e.lng || a.language, L = f.current, U = w.current;
    if (U && U.ready === G && U.lng === N && U.keyPrefix === l && U.revision === L)
      return U;
    const Y = {
      t: a.getFixedT(N, s.nsMode === "fallback" ? d : d[0], l),
      ready: G,
      lng: N,
      keyPrefix: l,
      revision: L
    };
    return w.current = Y, Y;
  }, [a, d, l, s, e.lng]), [I, S] = Ee(0), {
    t: v,
    ready: R
  } = Ih.useSyncExternalStore(h, k, k);
  Me(() => {
    if (a && !R && !o) {
      const G = () => S((N) => N + 1);
      e.lng ? _s(a, e.lng, d, G) : Wi(a, d, G);
    }
  }, [a, e.lng, d, R, o, I]);
  const D = a || {}, M = pe(null), b = pe(), j = (G) => {
    const N = Object.getOwnPropertyDescriptors(G);
    N.__original && delete N.__original;
    const L = Object.create(Object.getPrototypeOf(G), N);
    if (!Object.prototype.hasOwnProperty.call(L, "__original"))
      try {
        Object.defineProperty(L, "__original", {
          value: G,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      } catch {
      }
    return L;
  }, V = Be(() => {
    const G = D, N = G == null ? void 0 : G.language;
    let L = G;
    G && (M.current && M.current.__original === G ? b.current !== N ? (L = j(G), M.current = L, b.current = N) : L = M.current : (L = j(G), M.current = L, b.current = N));
    const U = [v, L, R];
    return U.t = v, U.i18n = L, U.ready = R, U;
  }, [v, D, R, D.resolvedLanguage, D.language, D.languages]);
  if (a && o && !R)
    throw new Promise((G) => {
      const N = () => G();
      e.lng ? _s(a, e.lng, d, N) : Wi(a, d, N);
    });
  return V;
};
async function Xo({
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
      return console.warn(`Translations not found for locale '${r}', falling back to 'en'`), Xo({
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
const Lh = () => {
  const t = ft.createInstance();
  return t.use(yh), t;
}, Jo = Yr(null), Ph = {
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
function Dh({
  children: t,
  locale: e = "en",
  chatServerUrl: n,
  chatServerKey: r,
  mpAuthToken: i,
  fallback: a
}) {
  const [s] = Ee(() => Lh()), [o, l] = Ee(!0), [u, c] = Ee(!1), [d, f] = Ee(null), h = pe(!1), w = ue(
    async (S, v) => {
      s.isInitialized ? (s.addResourceBundle(
        v,
        "translation",
        S,
        !0,
        !0
      ), await s.changeLanguage(v)) : await s.init({
        lng: v,
        fallbackLng: "en",
        resources: {
          [v]: {
            translation: S
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
  Me(() => {
    if (h.current)
      return;
    let S = !0;
    return (async () => {
      l(!0), f(null);
      try {
        const R = await Xo({
          chatServerUrl: n,
          chatServerKey: r,
          mpAuthToken: i,
          locale: e
        });
        if (!S) return;
        await w(R, e), h.current = !0, c(!0);
      } catch (R) {
        if (!S) return;
        console.error("Failed to load translations:", R), f(
          R instanceof Error ? R : new Error("Failed to load translations")
        ), await w(Ph, "en"), h.current = !0, c(!0);
      } finally {
        S && l(!1);
      }
    })(), () => {
      S = !1;
    };
  }, [e, n, r, i, w]);
  const k = ue(
    (S, v) => s.isInitialized && s.t(S, v) || S,
    [s]
  ), I = Be(
    () => ({
      t: k,
      locale: e,
      isLoading: o,
      isReady: u,
      error: d
    }),
    [k, e, o, u, d]
  );
  return o && a ? /* @__PURE__ */ p(Kt, { children: a }) : /* @__PURE__ */ p(Jo.Provider, { value: I, children: t });
}
function pn() {
  const t = Xr(Jo);
  if (!t)
    throw new Error(
      "useTranslations must be used within TranslationProvider. Make sure your component is wrapped with <TranslationProvider>."
    );
  return t;
}
function z0() {
  return Mh();
}
function Fh() {
  const { t } = pn(), e = ue(
    (a, s) => s === !1 ? nt.isErrorMessage(a) ? lt.ERROR : lt.COMPLETED : nt.isCompletedMessage(a) ? lt.COMPLETED : nt.isErrorMessage(a) ? lt.ERROR : lt.PROCESSING,
    []
  ), n = ue(
    (a) => nt.extractDuration(a, t),
    [t]
  ), r = ue(
    (a) => nt.cleanReasoningContent(a),
    []
  ), i = ue(
    (a, s) => {
      switch (nt.getMessageType(
        a,
        s
      )) {
        case he.MESSAGE_TYPES.ERROR:
          return t("chat.reasoning.error");
        case he.MESSAGE_TYPES.COMPLETED:
          return t("chat.reasoning.completed");
        case he.MESSAGE_TYPES.THOUGHT:
          return t("chat.reasoning.thought");
        case he.MESSAGE_TYPES.THINKING:
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
function zh() {
  const { t } = pn(), e = ue(
    (r, i) => i === !1 ? r.includes(he.ERROR_MARKER) ? t("chat.tools.failed") : t("chat.tools.completed") : r.includes(he.COMPLETED_MARKER) || r.includes("✅") ? t("chat.tools.completed") : r.includes(he.ERROR_MARKER) ? t("chat.tools.failed") : (r.includes(he.HANDLING_MARKER), t("chat.tools.executing")),
    [t]
  ), n = ue(
    (r, i) => i === !1 ? r.includes(he.ERROR_MARKER) ? lt.ERROR : lt.COMPLETED : r.includes(he.COMPLETED_MARKER) || r.includes("✅") ? lt.COMPLETED : r.includes(he.ERROR_MARKER) ? lt.ERROR : lt.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: n
  };
}
function Uh({
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
  const f = pe(/* @__PURE__ */ new Map()), h = pe(/* @__PURE__ */ new Map()), w = ue(() => {
    window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, !l.current && t((M) => {
      var j;
      const b = (j = M.map((V, K) => ({ msg: V, index: K })).filter(({ msg: V }) => V.role === "user").pop()) == null ? void 0 : j.index;
      return b === void 0 ? M : M.map(
        (V, K) => K === b && (V.hasError || V.isRetrying) ? { ...V, hasError: !1, errorMessage: void 0, isRetrying: !1 } : V
      );
    }));
  }, [l, t]), k = ue(() => {
    if (l.current && u.current) {
      const M = da(
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
  ]), I = ue(
    (M) => {
      if (w(), l.current)
        u.current += M, s(u.current), n(
          l.current,
          u.current,
          !0
        );
      else {
        i(!1);
        const b = r();
        l.current = b, u.current = M, s(M);
        const j = {
          id: b,
          role: "assistant",
          content: M,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        t((V) => [...V, j]);
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
  ), S = ue(
    (M, b, j) => {
      const { callId: V } = j || {};
      if (o(M), !V) return;
      const K = nt.isThinkingMessage(b) && !he.PATTERNS.DURATION.test(b), q = nt.isThinkingMessage(b) && he.PATTERNS.DURATION.test(b), ce = nt.isHandlingMessage(b), G = nt.isCompletedMessage(b), N = nt.isErrorMessage(b);
      if (K || q) {
        const U = f.current.get(V);
        if (K && !U) {
          k();
          const ie = r();
          f.current.set(V, ie);
          const Y = {
            id: ie,
            role: "reasoning",
            content: b,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          t((me) => [...me, Y]);
        } else q && U ? (n(U, b, !1), f.current.delete(V)) : U && K && n(U, b, !0);
      }
      const L = h.current.get(V);
      if (ce && !L) {
        k();
        const U = b.match(
          he.PATTERNS.HANDLING_TOOL
        ), ie = U ? U[1] : "Unknown Tool", Y = r();
        h.current.set(V, Y);
        const me = {
          id: Y,
          role: "tooling",
          content: b,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...j,
            toolName: ie,
            callId: V,
            status: lt.PROCESSING
          }
        };
        t((de) => [...de, me]);
      } else if ((G || N) && L) {
        const U = b.match(
          he.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), ie = U ? U[1] : "Unknown Tool";
        t(
          (Y) => Y.map(
            (me) => me.id === L ? {
              ...me,
              content: b,
              isStreaming: !1,
              toolData: {
                ...me.toolData,
                toolName: ie,
                status: N ? lt.ERROR : lt.COMPLETED,
                callId: V ?? ""
              }
            } : me
          )
        ), h.current.delete(V);
      } else L && M && !G && !N && n(L, b, !0);
    },
    [
      o,
      k,
      r,
      t,
      n
    ]
  ), v = ue(() => {
    w(), a(!1), i(!1), k();
  }, [
    w,
    a,
    i,
    k
  ]), R = ue(
    (M) => {
      a(!1), i(!1), k(), e("system", `❌ Chat error: ${M}`);
    },
    [
      a,
      i,
      k,
      e
    ]
  ), D = ue(() => {
    a(!1), i(!1), c(), d();
  }, [
    a,
    i,
    c,
    d
  ]);
  return {
    handleSetMessage: I,
    handleReasoningUpdate: S,
    handleChatFinished: v,
    handleChatError: R,
    stopGeneration: D,
    finalizeCurrentStreamingMessage: k,
    clearResponseError: w
  };
}
function Hh() {
  const t = bd(), e = Hd(), n = Fh(), r = zh(), i = Uh({
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
function U0({ initialMode: t = "sidebar" }) {
  const e = fe();
  return Me(() => {
    t && e.currentMode !== t && e.setCurrentMode(t);
  }, [t]), Me(() => {
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
function $h(t) {
  var n;
  const e = [];
  for (const r of t)
    if (e.push(r), r.role === "assistant" && ((n = r.uiComponents) != null && n.length))
      for (const i of r.uiComponents)
        !i || !i.toolCallId || !i.componentName || e.push({
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
function Bh({
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
  const w = pe(!1), k = async () => {
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
          const S = await qu(
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
          s($h(S.messages)), S.threadId && u(S.threadId), S.providerResId && c(S.providerResId), S.messages.length > 0 && h && h(), w.current = !0;
        } catch (S) {
          $n(S, "ConversationLoader"), l(
            S instanceof Error ? S.message : "Failed to load conversation"
          ), w.current = !0;
        } finally {
          o(!1);
        }
    }
  };
  return Me(() => {
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
function Ss(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.keys(t);
  return e.length === 0 ? !1 : e.some((n) => t[n] != null);
}
function jh({
  metadata: t,
  chatClient: e,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: s
}) {
  const o = pe(void 0), l = pe(!1), u = pe(null), c = pe(void 0), d = pe(null);
  return Me(() => {
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
      if (console.log("[useMetadataSync] 🆕 Thread just created, syncing initial metadata"), d.current = n, Ss(t) && c.current !== t) {
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
    if (!Ss(t)) {
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
      const S = e.updateMetadata(n, { metadata: t }).then(() => {
        console.log("[useMetadataSync] ✅ Metadata updated successfully"), o.current = t, c.current = t, u.current = null;
      }).catch((v) => {
        console.error(
          "[useMetadataSync] ❌ Failed to update existing thread metadata:",
          v
        ), u.current = null;
      });
      u.current = S;
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
function Vh() {
  const [t, e] = Ee(navigator.onLine), [n, r] = Ee(!1);
  return Me(() => {
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
class Zh {
  // 15MB
  constructor(e) {
    re(this, "config");
    re(this, "defaultFolder", "chat-uploads");
    re(this, "defaultMaxFileSize", 15 * 1024 * 1024);
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
class Wh {
  constructor(e, n = {}) {
    re(this, "config");
    re(this, "chatClient");
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
const Gh = {
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
}, Qo = {
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
}, qh = {
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
    if (!Qo.isValidWebSocketUrl(t))
      throw new Error(`Invalid WebSocket URL: ${t}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (t) => t.trim().length > 0
}, el = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...t) => t.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (t, e, n, r, i) => el.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${t}`,
    e && `chat-wrapper--${e}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    t === "embedded" && i && "chat-wrapper--constrained"
  )
}, tl = {
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
  getUserFriendlyErrorMessage: (t) => tl.isNetworkError(t) ? "Connection error. Please check your internet connection and try again." : t.message.includes("authentication") || t.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : t.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, Wt = {
  state: Gh,
  url: Qo,
  validation: qh,
  css: el,
  error: tl
};
class bs extends oa {
  constructor(n) {
    super(n);
    re(this, "resetTimeoutId", null);
    re(this, "resetErrorBoundary", () => {
      this.resetTimeoutId && clearTimeout(this.resetTimeoutId), this.setState({
        hasError: !1,
        error: void 0,
        errorInfo: void 0
      });
    });
    re(this, "handleRetry", () => {
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
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: Wt.error.getUserFriendlyErrorMessage(r) }),
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
class Kh extends oa {
  constructor(n) {
    super(n);
    re(this, "retryCount", 0);
    re(this, "retryTimeoutId", null);
    re(this, "handleRetry", () => {
      const { maxRetries: n = 3, retryDelay: r = 1e3, onRetry: i } = this.props;
      this.retryCount >= n || (this.setState({ isRetrying: !0 }), this.retryCount++, this.retryTimeoutId = window.setTimeout(() => {
        this.setState({
          hasError: !1,
          error: void 0,
          isRetrying: !1
        }), i && i();
      }, r * this.retryCount));
    });
    re(this, "handleManualReset", () => {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Wt.error.isNetworkError(r)) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ O("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ p("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ O(Kt, { children: [
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
class Yh extends oa {
  constructor(n) {
    super(n);
    re(this, "handleRetry", () => {
      this.setState({
        hasError: !1,
        error: void 0,
        failedFiles: void 0
      }), this.props.onRetry && this.props.onRetry();
    });
    re(this, "handleDismiss", () => {
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
const Xh = ({
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
), Jh = ({
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
), Qh = ({
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
), ep = ({
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
), H0 = ({
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
), tp = ({
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
), np = ({
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
        /* @__PURE__ */ p(Xh, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, rp = ({
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
      children: /* @__PURE__ */ p(Jh, { size: 20 })
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
          children: /* @__PURE__ */ p(Qh, { size: 20, isFullscreen: c })
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
      children: /* @__PURE__ */ p(ep, { size: 20 })
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
class ip extends Error {
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
    re(
      this,
      "name",
      /** @type {const} */
      "Assertion"
    );
    re(
      this,
      "code",
      /** @type {const} */
      "ERR_ASSERTION"
    );
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.actual = r, this.expected = i, this.generated = s, this.operator = a;
  }
}
function _(t, e) {
  nl(
    !!t,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    e
  );
}
function qi(t) {
  nl(!1, !1, !0, "ok", "Unreachable", t);
}
function nl(t, e, n, r, i, a) {
  if (!t)
    throw a instanceof Error ? a : new ip(
      a || i,
      e,
      n,
      r,
      !a
    );
}
function ap(t, e) {
  const n = {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const sp = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, op = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, lp = {};
function vs(t, e) {
  return (lp.jsx ? op : sp).test(t);
}
const cp = /[ \t\n\f\r]/g;
function up(t) {
  return typeof t == "object" ? t.type === "text" ? Ts(t.value) : !1 : Ts(t);
}
function Ts(t) {
  return t.replace(cp, "") === "";
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
function rl(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new xr(n, r, e);
}
function Ki(t) {
  return t.toLowerCase();
}
class kt {
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
kt.prototype.attribute = "";
kt.prototype.booleanish = !1;
kt.prototype.boolean = !1;
kt.prototype.commaOrSpaceSeparated = !1;
kt.prototype.commaSeparated = !1;
kt.prototype.defined = !1;
kt.prototype.mustUseProperty = !1;
kt.prototype.number = !1;
kt.prototype.overloadedBoolean = !1;
kt.prototype.property = "";
kt.prototype.spaceSeparated = !1;
kt.prototype.space = void 0;
let dp = 0;
const _e = Tn(), Qe = Tn(), Yi = Tn(), H = Tn(), Ue = Tn(), Pn = Tn(), bt = Tn();
function Tn() {
  return 2 ** ++dp;
}
const Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: _e,
  booleanish: Qe,
  commaOrSpaceSeparated: bt,
  commaSeparated: Pn,
  number: H,
  overloadedBoolean: Yi,
  spaceSeparated: Ue
}, Symbol.toStringTag, { value: "Module" })), ki = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Xi)
);
class pa extends kt {
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
    if (super(e, n), Es(this, "space", i), typeof r == "number")
      for (; ++a < ki.length; ) {
        const s = ki[a];
        Es(this, ki[a], (r & Xi[s]) === Xi[s]);
      }
  }
}
pa.prototype.defined = !0;
function Es(t, e, n) {
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
const il = Vn({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Qe,
    ariaAutoComplete: null,
    ariaBusy: Qe,
    ariaChecked: Qe,
    ariaColCount: H,
    ariaColIndex: H,
    ariaColSpan: H,
    ariaControls: Ue,
    ariaCurrent: null,
    ariaDescribedBy: Ue,
    ariaDetails: null,
    ariaDisabled: Qe,
    ariaDropEffect: Ue,
    ariaErrorMessage: null,
    ariaExpanded: Qe,
    ariaFlowTo: Ue,
    ariaGrabbed: Qe,
    ariaHasPopup: null,
    ariaHidden: Qe,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Ue,
    ariaLevel: H,
    ariaLive: null,
    ariaModal: Qe,
    ariaMultiLine: Qe,
    ariaMultiSelectable: Qe,
    ariaOrientation: null,
    ariaOwns: Ue,
    ariaPlaceholder: null,
    ariaPosInSet: H,
    ariaPressed: Qe,
    ariaReadOnly: Qe,
    ariaRelevant: null,
    ariaRequired: Qe,
    ariaRoleDescription: Ue,
    ariaRowCount: H,
    ariaRowIndex: H,
    ariaRowSpan: H,
    ariaSelected: Qe,
    ariaSetSize: H,
    ariaSort: null,
    ariaValueMax: H,
    ariaValueMin: H,
    ariaValueNow: H,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function al(t, e) {
  return e in t ? t[e] : e;
}
function sl(t, e) {
  return al(t, e.toLowerCase());
}
const hp = Vn({
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
    acceptCharset: Ue,
    accessKey: Ue,
    action: null,
    allow: null,
    allowFullScreen: _e,
    allowPaymentRequest: _e,
    allowUserMedia: _e,
    alt: null,
    as: null,
    async: _e,
    autoCapitalize: null,
    autoComplete: Ue,
    autoFocus: _e,
    autoPlay: _e,
    blocking: Ue,
    capture: null,
    charSet: null,
    checked: _e,
    cite: null,
    className: Ue,
    cols: H,
    colSpan: null,
    content: null,
    contentEditable: Qe,
    controls: _e,
    controlsList: Ue,
    coords: H | Pn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: _e,
    defer: _e,
    dir: null,
    dirName: null,
    disabled: _e,
    download: Yi,
    draggable: Qe,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: _e,
    formTarget: null,
    headers: Ue,
    height: H,
    hidden: Yi,
    high: H,
    href: null,
    hrefLang: null,
    htmlFor: Ue,
    httpEquiv: Ue,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: _e,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: _e,
    itemId: null,
    itemProp: Ue,
    itemRef: Ue,
    itemScope: _e,
    itemType: Ue,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: _e,
    low: H,
    manifest: null,
    max: null,
    maxLength: H,
    media: null,
    method: null,
    min: null,
    minLength: H,
    multiple: _e,
    muted: _e,
    name: null,
    nonce: null,
    noModule: _e,
    noValidate: _e,
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
    open: _e,
    optimum: H,
    pattern: null,
    ping: Ue,
    placeholder: null,
    playsInline: _e,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: _e,
    referrerPolicy: null,
    rel: Ue,
    required: _e,
    reversed: _e,
    rows: H,
    rowSpan: H,
    sandbox: Ue,
    scope: null,
    scoped: _e,
    seamless: _e,
    selected: _e,
    shadowRootClonable: _e,
    shadowRootDelegatesFocus: _e,
    shadowRootMode: null,
    shape: null,
    size: H,
    sizes: null,
    slot: null,
    span: H,
    spellCheck: Qe,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: H,
    step: null,
    style: null,
    tabIndex: H,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: _e,
    useMap: null,
    value: Qe,
    width: H,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Ue,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: H,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: H,
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
    compact: _e,
    // Lists. Use CSS to reduce space between items instead
    declare: _e,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: H,
    // `<img>` and `<object>`
    leftMargin: H,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: H,
    // `<body>`
    marginWidth: H,
    // `<body>`
    noResize: _e,
    // `<frame>`
    noHref: _e,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: _e,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: _e,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: H,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Qe,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: H,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: H,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: _e,
    disableRemotePlayback: _e,
    prefix: null,
    property: null,
    results: H,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: sl
}), pp = Vn({
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
    about: bt,
    accentHeight: H,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: H,
    amplitude: H,
    arabicForm: null,
    ascent: H,
    attributeName: null,
    attributeType: null,
    azimuth: H,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: H,
    by: null,
    calcMode: null,
    capHeight: H,
    className: Ue,
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
    descent: H,
    diffuseConstant: H,
    direction: null,
    display: null,
    dur: null,
    divisor: H,
    dominantBaseline: null,
    download: _e,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: H,
    enableBackground: null,
    end: null,
    event: null,
    exponent: H,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: H,
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
    hanging: H,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: H,
    horizOriginX: H,
    horizOriginY: H,
    id: null,
    ideographic: H,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: H,
    k: H,
    k1: H,
    k2: H,
    k3: H,
    k4: H,
    kernelMatrix: bt,
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
    limitingConeAngle: H,
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
    mediaSize: H,
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
    overlinePosition: H,
    overlineThickness: H,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: H,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Ue,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: H,
    pointsAtY: H,
    pointsAtZ: H,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: bt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: bt,
    rev: bt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: bt,
    requiredFeatures: bt,
    requiredFonts: bt,
    requiredFormats: bt,
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
    specularConstant: H,
    specularExponent: H,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: H,
    strikethroughThickness: H,
    string: null,
    stroke: null,
    strokeDashArray: bt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: H,
    strokeOpacity: H,
    strokeWidth: null,
    style: null,
    surfaceScale: H,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: bt,
    tabIndex: H,
    tableValues: null,
    target: null,
    targetX: H,
    targetY: H,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: bt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: H,
    underlineThickness: H,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: H,
    values: null,
    vAlphabetic: H,
    vMathematical: H,
    vectorEffect: null,
    vHanging: H,
    vIdeographic: H,
    version: null,
    vertAdvY: H,
    vertOriginX: H,
    vertOriginY: H,
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
    xHeight: H,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: al
}), ol = Vn({
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
}), ll = Vn({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: sl
}), cl = Vn({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), fp = {
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
}, gp = /[A-Z]/g, Rs = /-[a-z]/g, mp = /^data[-\w.:]+$/i;
function yp(t, e) {
  const n = Ki(e);
  let r = e, i = kt;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && mp.test(e)) {
    if (e.charAt(4) === "-") {
      const a = e.slice(5).replace(Rs, Cp);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = e.slice(4);
      if (!Rs.test(a)) {
        let s = a.replace(gp, wp);
        s.charAt(0) !== "-" && (s = "-" + s), e = "data" + s;
      }
    }
    i = pa;
  }
  return new i(r, e);
}
function wp(t) {
  return "-" + t.toLowerCase();
}
function Cp(t) {
  return t.charAt(1).toUpperCase();
}
const xp = rl([il, hp, ol, ll, cl], "html"), fa = rl([il, pp, ol, ll, cl], "svg");
function kp(t) {
  return t.join(" ").trim();
}
var ga = {}, Is = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, _p = /\n/g, Sp = /^\s*/, bp = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, vp = /^:\s*/, Tp = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Ep = /^[;\s]*/, Rp = /^\s+|\s+$/g, Ip = `
`, Ns = "/", As = "*", _n = "", Np = "comment", Ap = "declaration", Op = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t) return [];
  e = e || {};
  var n = 1, r = 1;
  function i(w) {
    var k = w.match(_p);
    k && (n += k.length);
    var I = w.lastIndexOf(Ip);
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
    l(Sp);
  }
  function c(w) {
    var k;
    for (w = w || []; k = d(); )
      k !== !1 && w.push(k);
    return w;
  }
  function d() {
    var w = a();
    if (!(Ns != t.charAt(0) || As != t.charAt(1))) {
      for (var k = 2; _n != t.charAt(k) && (As != t.charAt(k) || Ns != t.charAt(k + 1)); )
        ++k;
      if (k += 2, _n === t.charAt(k - 1))
        return o("End of comment missing");
      var I = t.slice(2, k - 2);
      return r += 2, i(I), t = t.slice(k), r += 2, w({
        type: Np,
        comment: I
      });
    }
  }
  function f() {
    var w = a(), k = l(bp);
    if (k) {
      if (d(), !l(vp)) return o("property missing ':'");
      var I = l(Tp), S = w({
        type: Ap,
        property: Os(k[0].replace(Is, _n)),
        value: I ? Os(I[0].replace(Is, _n)) : _n
      });
      return l(Ep), S;
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
function Os(t) {
  return t ? t.replace(Rp, _n) : _n;
}
var Mp = Gr && Gr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(ga, "__esModule", { value: !0 });
ga.default = Pp;
var Lp = Mp(Op);
function Pp(t, e) {
  var n = null;
  if (!t || typeof t != "string")
    return n;
  var r = (0, Lp.default)(t), i = typeof e == "function";
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
var Dp = /^--[a-zA-Z0-9_-]+$/, Fp = /-([a-z])/g, zp = /^[^-]+$/, Up = /^-(webkit|moz|ms|o|khtml)-/, Hp = /^-(ms)-/, $p = function(t) {
  return !t || zp.test(t) || Dp.test(t);
}, Bp = function(t, e) {
  return e.toUpperCase();
}, Ms = function(t, e) {
  return "".concat(e, "-");
}, jp = function(t, e) {
  return e === void 0 && (e = {}), $p(t) ? t : (t = t.toLowerCase(), e.reactCompat ? t = t.replace(Hp, Ms) : t = t.replace(Up, Ms), t.replace(Fp, Bp));
};
ei.camelCase = jp;
var Vp = Gr && Gr.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
}, Zp = Vp(ga), Wp = ei;
function Ji(t, e) {
  var n = {};
  return !t || typeof t != "string" || (0, Zp.default)(t, function(r, i) {
    r && i && (n[(0, Wp.camelCase)(r, e)] = i);
  }), n;
}
Ji.default = Ji;
var Gp = Ji;
const qp = /* @__PURE__ */ ha(Gp), ul = dl("end"), ma = dl("start");
function dl(t) {
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
function Kp(t) {
  const e = ma(t), n = ul(t);
  if (e && n)
    return { start: e, end: n };
}
function ur(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? Ls(t.position) : "start" in t || "end" in t ? Ls(t) : "line" in t || "column" in t ? Qi(t) : "";
}
function Qi(t) {
  return Ps(t && t.line) + ":" + Ps(t && t.column);
}
function Ls(t) {
  return Qi(t && t.start) + "-" + Qi(t && t.end);
}
function Ps(t) {
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
const ya = {}.hasOwnProperty, Yp = /* @__PURE__ */ new Map(), Xp = /[A-Z]/g, Jp = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Qp = /* @__PURE__ */ new Set(["td", "th"]), hl = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function ef(t, e) {
  if (!e || e.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = e.filePath || void 0;
  let r;
  if (e.development) {
    if (typeof e.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = cf(n, e.jsxDEV);
  } else {
    if (typeof e.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof e.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = lf(n, e.jsx, e.jsxs);
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
    schema: e.space === "svg" ? fa : xp,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
  }, a = pl(i, t, void 0);
  return a && typeof a != "string" ? a : i.create(
    t,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function pl(t, e, n) {
  if (e.type === "element")
    return tf(t, e, n);
  if (e.type === "mdxFlowExpression" || e.type === "mdxTextExpression")
    return nf(t, e);
  if (e.type === "mdxJsxFlowElement" || e.type === "mdxJsxTextElement")
    return af(t, e, n);
  if (e.type === "mdxjsEsm")
    return rf(t, e);
  if (e.type === "root")
    return sf(t, e, n);
  if (e.type === "text")
    return of(t, e);
}
function tf(t, e, n) {
  const r = t.schema;
  let i = r;
  e.tagName.toLowerCase() === "svg" && r.space === "html" && (i = fa, t.schema = i), t.ancestors.push(e);
  const a = gl(t, e.tagName, !1), s = uf(t, e);
  let o = Ca(t, e);
  return Jp.has(e.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !up(l) : !0;
  })), fl(t, s, a, e), wa(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function nf(t, e) {
  if (e.data && e.data.estree && t.evaluater) {
    const r = e.data.estree.body[0];
    return _(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    t.evaluater.evaluateExpression(r.expression);
  }
  wr(t, e.position);
}
function rf(t, e) {
  if (e.data && e.data.estree && t.evaluater)
    return (
      /** @type {Child | undefined} */
      t.evaluater.evaluateProgram(e.data.estree)
    );
  wr(t, e.position);
}
function af(t, e, n) {
  const r = t.schema;
  let i = r;
  e.name === "svg" && r.space === "html" && (i = fa, t.schema = i), t.ancestors.push(e);
  const a = e.name === null ? t.Fragment : gl(t, e.name, !0), s = df(t, e), o = Ca(t, e);
  return fl(t, s, a, e), wa(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function sf(t, e, n) {
  const r = {};
  return wa(r, Ca(t, e)), t.create(e, t.Fragment, r, n);
}
function of(t, e) {
  return e.value;
}
function fl(t, e, n, r) {
  typeof n != "string" && n !== t.Fragment && t.passNode && (e.node = r);
}
function wa(t, e) {
  if (e.length > 0) {
    const n = e.length > 1 ? e : e[0];
    n && (t.children = n);
  }
}
function lf(t, e, n) {
  return r;
  function r(i, a, s, o) {
    const u = Array.isArray(s.children) ? n : e;
    return o ? u(a, s, o) : u(a, s);
  }
}
function cf(t, e) {
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
function uf(t, e) {
  const n = {};
  let r, i;
  for (i in e.properties)
    if (i !== "children" && ya.call(e.properties, i)) {
      const a = hf(t, i, e.properties[i]);
      if (a) {
        const [s, o] = a;
        t.tableCellAlignToStyle && s === "align" && typeof o == "string" && Qp.has(e.tagName) ? r = o : n[s] = o;
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
function df(t, e) {
  const n = {};
  for (const r of e.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && t.evaluater) {
        const a = r.data.estree.body[0];
        _(a.type === "ExpressionStatement");
        const s = a.expression;
        _(s.type === "ObjectExpression");
        const o = s.properties[0];
        _(o.type === "SpreadElement"), Object.assign(
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
          _(o.type === "ExpressionStatement"), a = t.evaluater.evaluateExpression(o.expression);
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
  const i = t.passKeys ? /* @__PURE__ */ new Map() : Yp;
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
    const o = pl(t, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function hf(t, e, n) {
  const r = yp(t.schema, e);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? ap(n) : kp(n)), r.property === "style") {
      let i = typeof n == "object" ? n : pf(t, String(n));
      return t.stylePropertyNameCase === "css" && (i = ff(i)), ["style", i];
    }
    return [
      t.elementAttributeNameCase === "react" && r.space ? fp[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function pf(t, e) {
  try {
    return qp(e, { reactCompat: !0 });
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
    throw i.file = t.filePath || void 0, i.url = hl + "#cannot-parse-style-attribute", i;
  }
}
function gl(t, e, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: e };
  else if (e.includes(".")) {
    const i = e.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = vs(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    _(s, "always a result"), r = s;
  } else
    r = vs(e) && !/^[a-z]/.test(e) ? { type: "Identifier", name: e } : { type: "Literal", value: e };
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
  throw n.file = t.filePath || void 0, n.url = hl + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function ff(t) {
  const e = {};
  let n;
  for (n in t)
    ya.call(t, n) && (e[gf(n)] = t[n]);
  return e;
}
function gf(t) {
  let e = t.replace(Xp, mf);
  return e.slice(0, 3) === "ms-" && (e = "-" + e), e;
}
function mf(t) {
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
}, yf = {};
function wf(t, e) {
  const n = yf, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return ml(t, r, i);
}
function ml(t, e, n) {
  if (Cf(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return Ds(t.children, e, n);
  }
  return Array.isArray(t) ? Ds(t, e, n) : "";
}
function Ds(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = ml(t[i], e, n);
  return r.join("");
}
function Cf(t) {
  return !!(t && typeof t == "object");
}
const Fs = document.createElement("i");
function xa(t) {
  const e = "&" + t + ";";
  Fs.innerHTML = e;
  const n = Fs.textContent;
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
), X = (
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
), Zt = (
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
function Xt(t, e, n, r) {
  const i = t.length;
  let a = 0, s;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < X.v8MaxSafeChunkSize)
    s = Array.from(r), s.unshift(e, n), t.splice(...s);
  else
    for (n && t.splice(e, n); a < r.length; )
      s = r.slice(
        a,
        a + X.v8MaxSafeChunkSize
      ), s.unshift(e, 0), t.splice(...s), a += X.v8MaxSafeChunkSize, e += X.v8MaxSafeChunkSize;
}
function At(t, e) {
  return t.length > 0 ? (Xt(t, t.length, 0, e), t) : e;
}
const zs = {}.hasOwnProperty;
function xf(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    kf(e, t[n]);
  return e;
}
function kf(t, e) {
  let n;
  for (n in e) {
    const i = (zs.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let s;
    if (a)
      for (s in a) {
        zs.call(i, s) || (i[s] = []);
        const o = a[s];
        _f(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function _f(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  Xt(t, 0, 0, r);
}
function yl(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < m.ht || n === m.vt || n > m.cr && n < m.space || // Control character (DEL) of C0, and C1 controls.
    n > m.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? Zt.replacementCharacter : String.fromCodePoint(n)
  );
}
function Dn(t) {
  return t.replace(/[\t\n\r ]+/g, Zt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Gt = fn(/[A-Za-z]/), Tt = fn(/[\dA-Za-z]/), Sf = fn(/[#-'*+\--9=?A-Z^-~]/);
function ea(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < m.space || t === m.del)
  );
}
const ta = fn(/\d/), bf = fn(/[\dA-Fa-f]/), vf = fn(/[!-/:-@[-`{-~]/);
function se(t) {
  return t !== null && t < m.horizontalTab;
}
function Ct(t) {
  return t !== null && (t < m.nul || t === m.space);
}
function Ae(t) {
  return t === m.horizontalTab || t === m.virtualSpace || t === m.space;
}
const Tf = fn(new RegExp("\\p{P}|\\p{S}", "u")), Ef = fn(/\s/);
function fn(t) {
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
    if (a === m.percentSign && Tt(t.charCodeAt(n + 1)) && Tt(t.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = t.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (s = String.fromCharCode(a, o), i = 1) : s = Zt.replacementCharacter;
    } else
      s = String.fromCharCode(a);
    s && (e.push(t.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return e.join("") + t.slice(r);
}
function He(t, e, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return s;
  function s(l) {
    return Ae(l) ? (t.enter(n), o(l)) : e(l);
  }
  function o(l) {
    return Ae(l) && a++ < i ? (t.consume(l), o) : (t.exit(n), e(l));
  }
}
const Rf = { tokenize: If };
function If(t) {
  const e = t.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return e;
  function r(o) {
    if (_(
      o === m.eof || se(o),
      "expected eol or eof"
    ), o === m.eof) {
      t.consume(o);
      return;
    }
    return t.enter(g.lineEnding), t.consume(o), t.exit(g.lineEnding), He(t, e, g.linePrefix);
  }
  function i(o) {
    return _(
      o !== m.eof && !se(o),
      "expected anything other than a line ending or EOF"
    ), t.enter(g.paragraph), a(o);
  }
  function a(o) {
    const l = t.enter(g.chunkText, {
      contentType: X.contentTypeText,
      previous: n
    });
    return n && (n.next = l), n = l, s(o);
  }
  function s(o) {
    if (o === m.eof) {
      t.exit(g.chunkText), t.exit(g.paragraph), t.consume(o);
      return;
    }
    return se(o) ? (t.consume(o), t.exit(g.chunkText), a) : (t.consume(o), s);
  }
}
const Nf = { tokenize: Af }, Us = { tokenize: Of };
function Af(t) {
  const e = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(R) {
    if (r < n.length) {
      const D = n[r];
      return e.containerState = D[1], _(
        D[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), t.attempt(
        D[0].continuation,
        l,
        u
      )(R);
    }
    return u(R);
  }
  function l(R) {
    if (_(
      e.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && v();
      const D = e.events.length;
      let M = D, b;
      for (; M--; )
        if (e.events[M][0] === "exit" && e.events[M][1].type === g.chunkFlow) {
          b = e.events[M][1].end;
          break;
        }
      _(b, "could not find previous flow chunk"), S(r);
      let j = D;
      for (; j < e.events.length; )
        e.events[j][1].end = { ...b }, j++;
      return Xt(
        e.events,
        M + 1,
        0,
        e.events.slice(D)
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
      Us,
      c,
      d
    )(R);
  }
  function c(R) {
    return i && v(), S(r), f(R);
  }
  function d(R) {
    return e.parser.lazy[e.now().line] = r !== n.length, s = e.now().offset, w(R);
  }
  function f(R) {
    return e.containerState = {}, t.attempt(
      Us,
      h,
      w
    )(R);
  }
  function h(R) {
    return _(
      e.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), _(
      e.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([e.currentConstruct, e.containerState]), f(R);
  }
  function w(R) {
    if (R === m.eof) {
      i && v(), S(0), t.consume(R);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter(g.chunkFlow, {
      _tokenizer: i,
      contentType: X.contentTypeFlow,
      previous: a
    }), k(R);
  }
  function k(R) {
    if (R === m.eof) {
      I(t.exit(g.chunkFlow), !0), S(0), t.consume(R);
      return;
    }
    return se(R) ? (t.consume(R), I(t.exit(g.chunkFlow)), r = 0, e.interrupt = void 0, o) : (t.consume(R), k);
  }
  function I(R, D) {
    _(i, "expected `childFlow` to be defined when continuing");
    const M = e.sliceStream(R);
    if (D && M.push(null), R.previous = a, a && (a.next = R), a = R, i.defineSkip(R.start), i.write(M), e.parser.lazy[R.start.line]) {
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
      let V = j, K, q;
      for (; V--; )
        if (e.events[V][0] === "exit" && e.events[V][1].type === g.chunkFlow) {
          if (K) {
            q = e.events[V][1].end;
            break;
          }
          K = !0;
        }
      for (_(q, "could not find previous flow chunk"), S(r), b = j; b < e.events.length; )
        e.events[b][1].end = { ...q }, b++;
      Xt(
        e.events,
        V + 1,
        0,
        e.events.slice(j)
      ), e.events.length = b;
    }
  }
  function S(R) {
    let D = n.length;
    for (; D-- > R; ) {
      const M = n[D];
      e.containerState = M[1], _(
        M[0].exit,
        "expected `exit` to be defined on container construct"
      ), M[0].exit.call(e, t);
    }
    n.length = R;
  }
  function v() {
    _(
      e.containerState,
      "expected `containerState` to be defined when closing flow"
    ), _(i, "expected `childFlow` to be defined when closing it"), i.write([m.eof]), a = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function Of(t, e, n) {
  return _(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), He(
    t,
    t.attempt(this.parser.constructs.document, e, n),
    g.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : X.tabSize
  );
}
function Hs(t) {
  if (t === m.eof || Ct(t) || Ef(t))
    return X.characterGroupWhitespace;
  if (Tf(t))
    return X.characterGroupPunctuation;
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
  resolveAll: Mf,
  tokenize: Lf
};
function Mf(t, e) {
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
          $s(d, -l), $s(f, l), s = {
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
          ]), _(
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
          ])) : c = 0, Xt(t, r - 1, n - r + 3, u), n = r + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function Lf(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Hs(r);
  let a;
  return s;
  function s(l) {
    return _(
      l === m.asterisk || l === m.underscore,
      "expected asterisk or underscore"
    ), a = l, t.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return t.consume(l), o;
    const u = t.exit("attentionSequence"), c = Hs(l);
    _(n, "expected `attentionMarkers` to be populated");
    const d = !c || c === X.characterGroupPunctuation && i || n.includes(l), f = !i || i === X.characterGroupPunctuation && c || n.includes(r);
    return u._open = !!(a === m.asterisk ? d : d && (i || !f)), u._close = !!(a === m.asterisk ? f : f && (c || !d)), e(l);
  }
}
function $s(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const Pf = { name: "autolink", tokenize: Df };
function Df(t, e, n) {
  let r = 0;
  return i;
  function i(h) {
    return _(h === m.lessThan, "expected `<`"), t.enter(g.autolink), t.enter(g.autolinkMarker), t.consume(h), t.exit(g.autolinkMarker), t.enter(g.autolinkProtocol), a;
  }
  function a(h) {
    return Gt(h) ? (t.consume(h), s) : h === m.atSign ? n(h) : u(h);
  }
  function s(h) {
    return h === m.plusSign || h === m.dash || h === m.dot || Tt(h) ? (r = 1, o(h)) : u(h);
  }
  function o(h) {
    return h === m.colon ? (t.consume(h), r = 0, l) : (h === m.plusSign || h === m.dash || h === m.dot || Tt(h)) && r++ < X.autolinkSchemeSizeMax ? (t.consume(h), o) : (r = 0, u(h));
  }
  function l(h) {
    return h === m.greaterThan ? (t.exit(g.autolinkProtocol), t.enter(g.autolinkMarker), t.consume(h), t.exit(g.autolinkMarker), t.exit(g.autolink), e) : h === m.eof || h === m.space || h === m.lessThan || ea(h) ? n(h) : (t.consume(h), l);
  }
  function u(h) {
    return h === m.atSign ? (t.consume(h), c) : Sf(h) ? (t.consume(h), u) : n(h);
  }
  function c(h) {
    return Tt(h) ? d(h) : n(h);
  }
  function d(h) {
    return h === m.dot ? (t.consume(h), r = 0, c) : h === m.greaterThan ? (t.exit(g.autolinkProtocol).type = g.autolinkEmail, t.enter(g.autolinkMarker), t.consume(h), t.exit(g.autolinkMarker), t.exit(g.autolink), e) : f(h);
  }
  function f(h) {
    if ((h === m.dash || Tt(h)) && r++ < X.autolinkDomainSizeMax) {
      const w = h === m.dash ? f : d;
      return t.consume(h), w;
    }
    return n(h);
  }
}
const ti = { partial: !0, tokenize: Ff };
function Ff(t, e, n) {
  return r;
  function r(a) {
    return Ae(a) ? He(t, i, g.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === m.eof || se(a) ? e(a) : n(a);
  }
}
const wl = {
  continuation: { tokenize: Uf },
  exit: Hf,
  name: "blockQuote",
  tokenize: zf
};
function zf(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === m.greaterThan) {
      const o = r.containerState;
      return _(o, "expected `containerState` to be defined in container"), o.open || (t.enter(g.blockQuote, { _container: !0 }), o.open = !0), t.enter(g.blockQuotePrefix), t.enter(g.blockQuoteMarker), t.consume(s), t.exit(g.blockQuoteMarker), a;
    }
    return n(s);
  }
  function a(s) {
    return Ae(s) ? (t.enter(g.blockQuotePrefixWhitespace), t.consume(s), t.exit(g.blockQuotePrefixWhitespace), t.exit(g.blockQuotePrefix), e) : (t.exit(g.blockQuotePrefix), e(s));
  }
}
function Uf(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return Ae(s) ? (_(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), He(
      t,
      a,
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : X.tabSize
    )(s)) : a(s);
  }
  function a(s) {
    return t.attempt(wl, e, n)(s);
  }
}
function Hf(t) {
  t.exit(g.blockQuote);
}
const Cl = {
  name: "characterEscape",
  tokenize: $f
};
function $f(t, e, n) {
  return r;
  function r(a) {
    return _(a === m.backslash, "expected `\\`"), t.enter(g.characterEscape), t.enter(g.escapeMarker), t.consume(a), t.exit(g.escapeMarker), i;
  }
  function i(a) {
    return vf(a) ? (t.enter(g.characterEscapeValue), t.consume(a), t.exit(g.characterEscapeValue), t.exit(g.characterEscape), e) : n(a);
  }
}
const xl = {
  name: "characterReference",
  tokenize: Bf
};
function Bf(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(d) {
    return _(d === m.ampersand, "expected `&`"), t.enter(g.characterReference), t.enter(g.characterReferenceMarker), t.consume(d), t.exit(g.characterReferenceMarker), l;
  }
  function l(d) {
    return d === m.numberSign ? (t.enter(g.characterReferenceMarkerNumeric), t.consume(d), t.exit(g.characterReferenceMarkerNumeric), u) : (t.enter(g.characterReferenceValue), a = X.characterReferenceNamedSizeMax, s = Tt, c(d));
  }
  function u(d) {
    return d === m.uppercaseX || d === m.lowercaseX ? (t.enter(g.characterReferenceMarkerHexadecimal), t.consume(d), t.exit(g.characterReferenceMarkerHexadecimal), t.enter(g.characterReferenceValue), a = X.characterReferenceHexadecimalSizeMax, s = bf, c) : (t.enter(g.characterReferenceValue), a = X.characterReferenceDecimalSizeMax, s = ta, c(d));
  }
  function c(d) {
    if (d === m.semicolon && i) {
      const f = t.exit(g.characterReferenceValue);
      return s === Tt && !xa(r.sliceSerialize(f)) ? n(d) : (t.enter(g.characterReferenceMarker), t.consume(d), t.exit(g.characterReferenceMarker), t.exit(g.characterReference), e);
    }
    return s(d) && i++ < a ? (t.consume(d), c) : n(d);
  }
}
const Bs = {
  partial: !0,
  tokenize: Vf
}, js = {
  concrete: !0,
  name: "codeFenced",
  tokenize: jf
};
function jf(t, e, n) {
  const r = this, i = { partial: !0, tokenize: M };
  let a = 0, s = 0, o;
  return l;
  function l(b) {
    return u(b);
  }
  function u(b) {
    _(
      b === m.graveAccent || b === m.tilde,
      "expected `` ` `` or `~`"
    );
    const j = r.events[r.events.length - 1];
    return a = j && j[1].type === g.linePrefix ? j[2].sliceSerialize(j[1], !0).length : 0, o = b, t.enter(g.codeFenced), t.enter(g.codeFencedFence), t.enter(g.codeFencedFenceSequence), c(b);
  }
  function c(b) {
    return b === o ? (s++, t.consume(b), c) : s < X.codeFencedSequenceSizeMin ? n(b) : (t.exit(g.codeFencedFenceSequence), Ae(b) ? He(t, d, g.whitespace)(b) : d(b));
  }
  function d(b) {
    return b === m.eof || se(b) ? (t.exit(g.codeFencedFence), r.interrupt ? e(b) : t.check(Bs, k, D)(b)) : (t.enter(g.codeFencedFenceInfo), t.enter(g.chunkString, { contentType: X.contentTypeString }), f(b));
  }
  function f(b) {
    return b === m.eof || se(b) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceInfo), d(b)) : Ae(b) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceInfo), He(t, h, g.whitespace)(b)) : b === m.graveAccent && b === o ? n(b) : (t.consume(b), f);
  }
  function h(b) {
    return b === m.eof || se(b) ? d(b) : (t.enter(g.codeFencedFenceMeta), t.enter(g.chunkString, { contentType: X.contentTypeString }), w(b));
  }
  function w(b) {
    return b === m.eof || se(b) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceMeta), d(b)) : b === m.graveAccent && b === o ? n(b) : (t.consume(b), w);
  }
  function k(b) {
    return _(se(b), "expected eol"), t.attempt(i, D, I)(b);
  }
  function I(b) {
    return _(se(b), "expected eol"), t.enter(g.lineEnding), t.consume(b), t.exit(g.lineEnding), S;
  }
  function S(b) {
    return a > 0 && Ae(b) ? He(
      t,
      v,
      g.linePrefix,
      a + 1
    )(b) : v(b);
  }
  function v(b) {
    return b === m.eof || se(b) ? t.check(Bs, k, D)(b) : (t.enter(g.codeFlowValue), R(b));
  }
  function R(b) {
    return b === m.eof || se(b) ? (t.exit(g.codeFlowValue), v(b)) : (t.consume(b), R);
  }
  function D(b) {
    return t.exit(g.codeFenced), e(b);
  }
  function M(b, j, V) {
    let K = 0;
    return q;
    function q(U) {
      return _(se(U), "expected eol"), b.enter(g.lineEnding), b.consume(U), b.exit(g.lineEnding), ce;
    }
    function ce(U) {
      return _(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), b.enter(g.codeFencedFence), Ae(U) ? He(
        b,
        G,
        g.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : X.tabSize
      )(U) : G(U);
    }
    function G(U) {
      return U === o ? (b.enter(g.codeFencedFenceSequence), N(U)) : V(U);
    }
    function N(U) {
      return U === o ? (K++, b.consume(U), N) : K >= s ? (b.exit(g.codeFencedFenceSequence), Ae(U) ? He(b, L, g.whitespace)(U) : L(U)) : V(U);
    }
    function L(U) {
      return U === m.eof || se(U) ? (b.exit(g.codeFencedFence), j(U)) : V(U);
    }
  }
}
function Vf(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s === m.eof ? n(s) : (_(se(s), "expected eol"), t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
const Si = {
  name: "codeIndented",
  tokenize: Wf
}, Zf = { partial: !0, tokenize: Gf };
function Wf(t, e, n) {
  const r = this;
  return i;
  function i(u) {
    return _(Ae(u)), t.enter(g.codeIndented), He(
      t,
      a,
      g.linePrefix,
      X.tabSize + 1
    )(u);
  }
  function a(u) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === g.linePrefix && c[2].sliceSerialize(c[1], !0).length >= X.tabSize ? s(u) : n(u);
  }
  function s(u) {
    return u === m.eof ? l(u) : se(u) ? t.attempt(Zf, s, l)(u) : (t.enter(g.codeFlowValue), o(u));
  }
  function o(u) {
    return u === m.eof || se(u) ? (t.exit(g.codeFlowValue), s(u)) : (t.consume(u), o);
  }
  function l(u) {
    return t.exit(g.codeIndented), e(u);
  }
}
function Gf(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : se(s) ? (t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), i) : He(
      t,
      a,
      g.linePrefix,
      X.tabSize + 1
    )(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === g.linePrefix && o[2].sliceSerialize(o[1], !0).length >= X.tabSize ? e(s) : se(s) ? i(s) : n(s);
  }
}
const qf = {
  name: "codeText",
  previous: kl,
  resolve: Kf,
  tokenize: Yf
};
function Kf(t) {
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
function kl(t) {
  return t !== m.graveAccent || this.events[this.events.length - 1][1].type === g.characterEscape;
}
function Yf(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(f) {
    return _(f === m.graveAccent, "expected `` ` ``"), _(kl.call(r, r.previous), "expected correct previous"), t.enter(g.codeText), t.enter(g.codeTextSequence), l(f);
  }
  function l(f) {
    return f === m.graveAccent ? (t.consume(f), i++, l) : (t.exit(g.codeTextSequence), u(f));
  }
  function u(f) {
    return f === m.eof ? n(f) : f === m.space ? (t.enter("space"), t.consume(f), t.exit("space"), u) : f === m.graveAccent ? (s = t.enter(g.codeTextSequence), a = 0, d(f)) : se(f) ? (t.enter(g.lineEnding), t.consume(f), t.exit(g.lineEnding), u) : (t.enter(g.codeTextData), c(f));
  }
  function c(f) {
    return f === m.eof || f === m.space || f === m.graveAccent || se(f) ? (t.exit(g.codeTextData), u(f)) : (t.consume(f), c);
  }
  function d(f) {
    return f === m.graveAccent ? (t.consume(f), a++, d) : a === i ? (t.exit(g.codeTextSequence), t.exit(g.codeText), e(f)) : (s.type = g.codeTextData, c(f));
  }
}
class Xf {
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
  if (e.length < X.v8MaxSafeChunkSize)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(
        ...e.slice(n, n + X.v8MaxSafeChunkSize)
      ), n += X.v8MaxSafeChunkSize;
}
function _l(t) {
  const e = {};
  let n = -1, r, i, a, s, o, l, u;
  const c = new Xf(t);
  for (; ++n < c.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = c.get(n), n && r[1].type === g.chunkFlow && c.get(n - 1)[1].type === g.listItemPrefix && (_(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === g.lineEndingBlank && (a += 2), a < l.length && l[a][1].type === g.content))
      for (; ++a < l.length && l[a][1].type !== g.content; )
        l[a][1].type === g.chunkText && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, Jf(c, n)), n = e[n], u = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (s = c.get(a), s[1].type === g.lineEnding || s[1].type === g.lineEndingBlank)
          s[0] === "enter" && (i && (c.get(i)[1].type = g.lineEndingBlank), s[1].type = g.lineEnding, i = a);
        else if (!(s[1].type === g.linePrefix || s[1].type === g.listItemIndent)) break;
      i && (r[1].end = { ...c.get(i)[1].start }, o = c.slice(i, n), o.unshift(r), c.splice(i, n - i + 1, o));
    }
  }
  return Xt(t, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function Jf(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const a = [];
  _(n.contentType, "expected `contentType` on subtokens");
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], u = {};
  let c, d, f = -1, h = n, w = 0, k = 0;
  const I = [k];
  for (; h; ) {
    for (; t.get(++i)[1] !== h; )
      ;
    _(
      !d || h.previous === d,
      "expected previous to match"
    ), _(!d || d.next === h, "expected next to match"), a.push(i), h._tokenizer || (c = r.sliceStream(h), h.next || c.push(m.eof), d && s.defineSkip(h.start), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(c), h._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = h, h = h.next;
  }
  for (h = n; ++f < o.length; )
    // Find a void token that includes a break.
    o[f][0] === "exit" && o[f - 1][0] === "enter" && o[f][1].type === o[f - 1][1].type && o[f][1].start.line !== o[f][1].end.line && (_(h, "expected a current token"), k = f + 1, I.push(k), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (s.events = [], h ? (h._tokenizer = void 0, h.previous = void 0, _(!h.next, "expected no next token")) : I.pop(), f = I.length; f--; ) {
    const S = o.slice(I[f], I[f + 1]), v = a.pop();
    _(v !== void 0, "expected a start position when splicing"), l.push([v, v + S.length - 1]), t.splice(v, 2, S);
  }
  for (l.reverse(), f = -1; ++f < l.length; )
    u[w + l[f][0]] = w + l[f][1], w += l[f][1] - l[f][0] - 1;
  return u;
}
const Qf = { resolve: tg, tokenize: ng }, eg = { partial: !0, tokenize: rg };
function tg(t) {
  return _l(t), t;
}
function ng(t, e) {
  let n;
  return r;
  function r(o) {
    return _(
      o !== m.eof && !se(o),
      "expected no eof or eol"
    ), t.enter(g.content), n = t.enter(g.chunkContent, {
      contentType: X.contentTypeContent
    }), i(o);
  }
  function i(o) {
    return o === m.eof ? a(o) : se(o) ? t.check(
      eg,
      s,
      a
    )(o) : (t.consume(o), i);
  }
  function a(o) {
    return t.exit(g.chunkContent), t.exit(g.content), e(o);
  }
  function s(o) {
    return _(se(o), "expected eol"), t.consume(o), t.exit(g.chunkContent), _(n, "expected previous token"), n.next = t.enter(g.chunkContent, {
      contentType: X.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function rg(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return _(se(s), "expected a line ending"), t.exit(g.chunkContent), t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), He(t, a, g.linePrefix);
  }
  function a(s) {
    if (s === m.eof || se(s))
      return n(s);
    _(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === g.linePrefix && o[2].sliceSerialize(o[1], !0).length >= X.tabSize ? e(s) : t.interrupt(r.parser.constructs.flow, n, e)(s);
  }
}
function Sl(t, e, n, r, i, a, s, o, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let c = 0;
  return d;
  function d(S) {
    return S === m.lessThan ? (t.enter(r), t.enter(i), t.enter(a), t.consume(S), t.exit(a), f) : S === m.eof || S === m.space || S === m.rightParenthesis || ea(S) ? n(S) : (t.enter(r), t.enter(s), t.enter(o), t.enter(g.chunkString, { contentType: X.contentTypeString }), k(S));
  }
  function f(S) {
    return S === m.greaterThan ? (t.enter(a), t.consume(S), t.exit(a), t.exit(i), t.exit(r), e) : (t.enter(o), t.enter(g.chunkString, { contentType: X.contentTypeString }), h(S));
  }
  function h(S) {
    return S === m.greaterThan ? (t.exit(g.chunkString), t.exit(o), f(S)) : S === m.eof || S === m.lessThan || se(S) ? n(S) : (t.consume(S), S === m.backslash ? w : h);
  }
  function w(S) {
    return S === m.lessThan || S === m.greaterThan || S === m.backslash ? (t.consume(S), h) : h(S);
  }
  function k(S) {
    return !c && (S === m.eof || S === m.rightParenthesis || Ct(S)) ? (t.exit(g.chunkString), t.exit(o), t.exit(s), t.exit(r), e(S)) : c < u && S === m.leftParenthesis ? (t.consume(S), c++, k) : S === m.rightParenthesis ? (t.consume(S), c--, k) : S === m.eof || S === m.space || S === m.leftParenthesis || ea(S) ? n(S) : (t.consume(S), S === m.backslash ? I : k);
  }
  function I(S) {
    return S === m.leftParenthesis || S === m.rightParenthesis || S === m.backslash ? (t.consume(S), k) : k(S);
  }
}
function bl(t, e, n, r, i, a) {
  const s = this;
  let o = 0, l;
  return u;
  function u(h) {
    return _(h === m.leftSquareBracket, "expected `[`"), t.enter(r), t.enter(i), t.consume(h), t.exit(i), t.enter(a), c;
  }
  function c(h) {
    return o > X.linkReferenceSizeMax || h === m.eof || h === m.leftSquareBracket || h === m.rightSquareBracket && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === m.caret && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(h) : h === m.rightSquareBracket ? (t.exit(a), t.enter(i), t.consume(h), t.exit(i), t.exit(r), e) : se(h) ? (t.enter(g.lineEnding), t.consume(h), t.exit(g.lineEnding), c) : (t.enter(g.chunkString, { contentType: X.contentTypeString }), d(h));
  }
  function d(h) {
    return h === m.eof || h === m.leftSquareBracket || h === m.rightSquareBracket || se(h) || o++ > X.linkReferenceSizeMax ? (t.exit(g.chunkString), c(h)) : (t.consume(h), l || (l = !Ae(h)), h === m.backslash ? f : d);
  }
  function f(h) {
    return h === m.leftSquareBracket || h === m.backslash || h === m.rightSquareBracket ? (t.consume(h), o++, d) : d(h);
  }
}
function vl(t, e, n, r, i, a) {
  let s;
  return o;
  function o(f) {
    return f === m.quotationMark || f === m.apostrophe || f === m.leftParenthesis ? (t.enter(r), t.enter(i), t.consume(f), t.exit(i), s = f === m.leftParenthesis ? m.rightParenthesis : f, l) : n(f);
  }
  function l(f) {
    return f === s ? (t.enter(i), t.consume(f), t.exit(i), t.exit(r), e) : (t.enter(a), u(f));
  }
  function u(f) {
    return f === s ? (t.exit(a), l(s)) : f === m.eof ? n(f) : se(f) ? (t.enter(g.lineEnding), t.consume(f), t.exit(g.lineEnding), He(t, u, g.linePrefix)) : (t.enter(g.chunkString, { contentType: X.contentTypeString }), c(f));
  }
  function c(f) {
    return f === s || f === m.eof || se(f) ? (t.exit(g.chunkString), u(f)) : (t.consume(f), f === m.backslash ? d : c);
  }
  function d(f) {
    return f === s || f === m.backslash ? (t.consume(f), c) : c(f);
  }
}
function dr(t, e) {
  let n;
  return r;
  function r(i) {
    return se(i) ? (t.enter(g.lineEnding), t.consume(i), t.exit(g.lineEnding), n = !0, r) : Ae(i) ? He(
      t,
      r,
      n ? g.linePrefix : g.lineSuffix
    )(i) : e(i);
  }
}
const ig = { name: "definition", tokenize: sg }, ag = { partial: !0, tokenize: og };
function sg(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    return t.enter(g.definition), s(h);
  }
  function s(h) {
    return _(h === m.leftSquareBracket, "expected `[`"), bl.call(
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
    return Ct(h) ? dr(t, u)(h) : u(h);
  }
  function u(h) {
    return Sl(
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
    return t.attempt(ag, d, d)(h);
  }
  function d(h) {
    return Ae(h) ? He(t, f, g.whitespace)(h) : f(h);
  }
  function f(h) {
    return h === m.eof || se(h) ? (t.exit(g.definition), r.parser.defined.push(i), e(h)) : n(h);
  }
}
function og(t, e, n) {
  return r;
  function r(o) {
    return Ct(o) ? dr(t, i)(o) : n(o);
  }
  function i(o) {
    return vl(
      t,
      a,
      n,
      g.definitionTitle,
      g.definitionTitleMarker,
      g.definitionTitleString
    )(o);
  }
  function a(o) {
    return Ae(o) ? He(
      t,
      s,
      g.whitespace
    )(o) : s(o);
  }
  function s(o) {
    return o === m.eof || se(o) ? e(o) : n(o);
  }
}
const lg = {
  name: "hardBreakEscape",
  tokenize: cg
};
function cg(t, e, n) {
  return r;
  function r(a) {
    return _(a === m.backslash, "expected `\\`"), t.enter(g.hardBreakEscape), t.consume(a), i;
  }
  function i(a) {
    return se(a) ? (t.exit(g.hardBreakEscape), e(a)) : n(a);
  }
}
const ug = {
  name: "headingAtx",
  resolve: dg,
  tokenize: hg
};
function dg(t, e) {
  let n = t.length - 2, r = 3, i, a;
  return t[r][1].type === g.whitespace && (r += 2), n - 2 > r && t[n][1].type === g.whitespace && (n -= 2), t[n][1].type === g.atxHeadingSequence && (r === n - 1 || n - 4 > r && t[n - 2][1].type === g.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: g.atxHeadingText,
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: g.chunkText,
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: X.contentTypeText
  }, Xt(t, r, n - r + 1, [
    ["enter", i, e],
    ["enter", a, e],
    ["exit", a, e],
    ["exit", i, e]
  ])), t;
}
function hg(t, e, n) {
  let r = 0;
  return i;
  function i(c) {
    return t.enter(g.atxHeading), a(c);
  }
  function a(c) {
    return _(c === m.numberSign, "expected `#`"), t.enter(g.atxHeadingSequence), s(c);
  }
  function s(c) {
    return c === m.numberSign && r++ < X.atxHeadingOpeningFenceSizeMax ? (t.consume(c), s) : c === m.eof || Ct(c) ? (t.exit(g.atxHeadingSequence), o(c)) : n(c);
  }
  function o(c) {
    return c === m.numberSign ? (t.enter(g.atxHeadingSequence), l(c)) : c === m.eof || se(c) ? (t.exit(g.atxHeading), e(c)) : Ae(c) ? He(t, o, g.whitespace)(c) : (t.enter(g.atxHeadingText), u(c));
  }
  function l(c) {
    return c === m.numberSign ? (t.consume(c), l) : (t.exit(g.atxHeadingSequence), o(c));
  }
  function u(c) {
    return c === m.eof || c === m.numberSign || Ct(c) ? (t.exit(g.atxHeadingText), o(c)) : (t.consume(c), u);
  }
}
const pg = [
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
], Vs = ["pre", "script", "style", "textarea"], fg = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: yg,
  tokenize: wg
}, gg = { partial: !0, tokenize: xg }, mg = {
  partial: !0,
  tokenize: Cg
};
function yg(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === g.htmlFlow); )
    ;
  return e > 1 && t[e - 2][1].type === g.linePrefix && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function wg(t, e, n) {
  const r = this;
  let i, a, s, o, l;
  return u;
  function u(y) {
    return c(y);
  }
  function c(y) {
    return _(y === m.lessThan, "expected `<`"), t.enter(g.htmlFlow), t.enter(g.htmlFlowData), t.consume(y), d;
  }
  function d(y) {
    return y === m.exclamationMark ? (t.consume(y), f) : y === m.slash ? (t.consume(y), a = !0, k) : y === m.questionMark ? (t.consume(y), i = X.htmlInstruction, r.interrupt ? e : C) : Gt(y) ? (_(y !== null), t.consume(y), s = String.fromCharCode(y), I) : n(y);
  }
  function f(y) {
    return y === m.dash ? (t.consume(y), i = X.htmlComment, h) : y === m.leftSquareBracket ? (t.consume(y), i = X.htmlCdata, o = 0, w) : Gt(y) ? (t.consume(y), i = X.htmlDeclaration, r.interrupt ? e : C) : n(y);
  }
  function h(y) {
    return y === m.dash ? (t.consume(y), r.interrupt ? e : C) : n(y);
  }
  function w(y) {
    const J = X.cdataOpeningString;
    return y === J.charCodeAt(o++) ? (t.consume(y), o === J.length ? r.interrupt ? e : G : w) : n(y);
  }
  function k(y) {
    return Gt(y) ? (_(y !== null), t.consume(y), s = String.fromCharCode(y), I) : n(y);
  }
  function I(y) {
    if (y === m.eof || y === m.slash || y === m.greaterThan || Ct(y)) {
      const J = y === m.slash, z = s.toLowerCase();
      return !J && !a && Vs.includes(z) ? (i = X.htmlRaw, r.interrupt ? e(y) : G(y)) : pg.includes(s.toLowerCase()) ? (i = X.htmlBasic, J ? (t.consume(y), S) : r.interrupt ? e(y) : G(y)) : (i = X.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(y) : a ? v(y) : R(y));
    }
    return y === m.dash || Tt(y) ? (t.consume(y), s += String.fromCharCode(y), I) : n(y);
  }
  function S(y) {
    return y === m.greaterThan ? (t.consume(y), r.interrupt ? e : G) : n(y);
  }
  function v(y) {
    return Ae(y) ? (t.consume(y), v) : q(y);
  }
  function R(y) {
    return y === m.slash ? (t.consume(y), q) : y === m.colon || y === m.underscore || Gt(y) ? (t.consume(y), D) : Ae(y) ? (t.consume(y), R) : q(y);
  }
  function D(y) {
    return y === m.dash || y === m.dot || y === m.colon || y === m.underscore || Tt(y) ? (t.consume(y), D) : M(y);
  }
  function M(y) {
    return y === m.equalsTo ? (t.consume(y), b) : Ae(y) ? (t.consume(y), M) : R(y);
  }
  function b(y) {
    return y === m.eof || y === m.lessThan || y === m.equalsTo || y === m.greaterThan || y === m.graveAccent ? n(y) : y === m.quotationMark || y === m.apostrophe ? (t.consume(y), l = y, j) : Ae(y) ? (t.consume(y), b) : V(y);
  }
  function j(y) {
    return y === l ? (t.consume(y), l = null, K) : y === m.eof || se(y) ? n(y) : (t.consume(y), j);
  }
  function V(y) {
    return y === m.eof || y === m.quotationMark || y === m.apostrophe || y === m.slash || y === m.lessThan || y === m.equalsTo || y === m.greaterThan || y === m.graveAccent || Ct(y) ? M(y) : (t.consume(y), V);
  }
  function K(y) {
    return y === m.slash || y === m.greaterThan || Ae(y) ? R(y) : n(y);
  }
  function q(y) {
    return y === m.greaterThan ? (t.consume(y), ce) : n(y);
  }
  function ce(y) {
    return y === m.eof || se(y) ? G(y) : Ae(y) ? (t.consume(y), ce) : n(y);
  }
  function G(y) {
    return y === m.dash && i === X.htmlComment ? (t.consume(y), ie) : y === m.lessThan && i === X.htmlRaw ? (t.consume(y), Y) : y === m.greaterThan && i === X.htmlDeclaration ? (t.consume(y), F) : y === m.questionMark && i === X.htmlInstruction ? (t.consume(y), C) : y === m.rightSquareBracket && i === X.htmlCdata ? (t.consume(y), de) : se(y) && (i === X.htmlBasic || i === X.htmlComplete) ? (t.exit(g.htmlFlowData), t.check(
      gg,
      $,
      N
    )(y)) : y === m.eof || se(y) ? (t.exit(g.htmlFlowData), N(y)) : (t.consume(y), G);
  }
  function N(y) {
    return t.check(
      mg,
      L,
      $
    )(y);
  }
  function L(y) {
    return _(se(y)), t.enter(g.lineEnding), t.consume(y), t.exit(g.lineEnding), U;
  }
  function U(y) {
    return y === m.eof || se(y) ? N(y) : (t.enter(g.htmlFlowData), G(y));
  }
  function ie(y) {
    return y === m.dash ? (t.consume(y), C) : G(y);
  }
  function Y(y) {
    return y === m.slash ? (t.consume(y), s = "", me) : G(y);
  }
  function me(y) {
    if (y === m.greaterThan) {
      const J = s.toLowerCase();
      return Vs.includes(J) ? (t.consume(y), F) : G(y);
    }
    return Gt(y) && s.length < X.htmlRawSizeMax ? (_(y !== null), t.consume(y), s += String.fromCharCode(y), me) : G(y);
  }
  function de(y) {
    return y === m.rightSquareBracket ? (t.consume(y), C) : G(y);
  }
  function C(y) {
    return y === m.greaterThan ? (t.consume(y), F) : y === m.dash && i === X.htmlComment ? (t.consume(y), C) : G(y);
  }
  function F(y) {
    return y === m.eof || se(y) ? (t.exit(g.htmlFlowData), $(y)) : (t.consume(y), F);
  }
  function $(y) {
    return t.exit(g.htmlFlow), e(y);
  }
}
function Cg(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return se(s) ? (t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
function xg(t, e, n) {
  return r;
  function r(i) {
    return _(se(i), "expected a line ending"), t.enter(g.lineEnding), t.consume(i), t.exit(g.lineEnding), t.attempt(ti, e, n);
  }
}
const kg = { name: "htmlText", tokenize: _g };
function _g(t, e, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(C) {
    return _(C === m.lessThan, "expected `<`"), t.enter(g.htmlText), t.enter(g.htmlTextData), t.consume(C), l;
  }
  function l(C) {
    return C === m.exclamationMark ? (t.consume(C), u) : C === m.slash ? (t.consume(C), M) : C === m.questionMark ? (t.consume(C), R) : Gt(C) ? (t.consume(C), V) : n(C);
  }
  function u(C) {
    return C === m.dash ? (t.consume(C), c) : C === m.leftSquareBracket ? (t.consume(C), a = 0, w) : Gt(C) ? (t.consume(C), v) : n(C);
  }
  function c(C) {
    return C === m.dash ? (t.consume(C), h) : n(C);
  }
  function d(C) {
    return C === m.eof ? n(C) : C === m.dash ? (t.consume(C), f) : se(C) ? (s = d, Y(C)) : (t.consume(C), d);
  }
  function f(C) {
    return C === m.dash ? (t.consume(C), h) : d(C);
  }
  function h(C) {
    return C === m.greaterThan ? ie(C) : C === m.dash ? f(C) : d(C);
  }
  function w(C) {
    const F = X.cdataOpeningString;
    return C === F.charCodeAt(a++) ? (t.consume(C), a === F.length ? k : w) : n(C);
  }
  function k(C) {
    return C === m.eof ? n(C) : C === m.rightSquareBracket ? (t.consume(C), I) : se(C) ? (s = k, Y(C)) : (t.consume(C), k);
  }
  function I(C) {
    return C === m.rightSquareBracket ? (t.consume(C), S) : k(C);
  }
  function S(C) {
    return C === m.greaterThan ? ie(C) : C === m.rightSquareBracket ? (t.consume(C), S) : k(C);
  }
  function v(C) {
    return C === m.eof || C === m.greaterThan ? ie(C) : se(C) ? (s = v, Y(C)) : (t.consume(C), v);
  }
  function R(C) {
    return C === m.eof ? n(C) : C === m.questionMark ? (t.consume(C), D) : se(C) ? (s = R, Y(C)) : (t.consume(C), R);
  }
  function D(C) {
    return C === m.greaterThan ? ie(C) : R(C);
  }
  function M(C) {
    return Gt(C) ? (t.consume(C), b) : n(C);
  }
  function b(C) {
    return C === m.dash || Tt(C) ? (t.consume(C), b) : j(C);
  }
  function j(C) {
    return se(C) ? (s = j, Y(C)) : Ae(C) ? (t.consume(C), j) : ie(C);
  }
  function V(C) {
    return C === m.dash || Tt(C) ? (t.consume(C), V) : C === m.slash || C === m.greaterThan || Ct(C) ? K(C) : n(C);
  }
  function K(C) {
    return C === m.slash ? (t.consume(C), ie) : C === m.colon || C === m.underscore || Gt(C) ? (t.consume(C), q) : se(C) ? (s = K, Y(C)) : Ae(C) ? (t.consume(C), K) : ie(C);
  }
  function q(C) {
    return C === m.dash || C === m.dot || C === m.colon || C === m.underscore || Tt(C) ? (t.consume(C), q) : ce(C);
  }
  function ce(C) {
    return C === m.equalsTo ? (t.consume(C), G) : se(C) ? (s = ce, Y(C)) : Ae(C) ? (t.consume(C), ce) : K(C);
  }
  function G(C) {
    return C === m.eof || C === m.lessThan || C === m.equalsTo || C === m.greaterThan || C === m.graveAccent ? n(C) : C === m.quotationMark || C === m.apostrophe ? (t.consume(C), i = C, N) : se(C) ? (s = G, Y(C)) : Ae(C) ? (t.consume(C), G) : (t.consume(C), L);
  }
  function N(C) {
    return C === i ? (t.consume(C), i = void 0, U) : C === m.eof ? n(C) : se(C) ? (s = N, Y(C)) : (t.consume(C), N);
  }
  function L(C) {
    return C === m.eof || C === m.quotationMark || C === m.apostrophe || C === m.lessThan || C === m.equalsTo || C === m.graveAccent ? n(C) : C === m.slash || C === m.greaterThan || Ct(C) ? K(C) : (t.consume(C), L);
  }
  function U(C) {
    return C === m.slash || C === m.greaterThan || Ct(C) ? K(C) : n(C);
  }
  function ie(C) {
    return C === m.greaterThan ? (t.consume(C), t.exit(g.htmlTextData), t.exit(g.htmlText), e) : n(C);
  }
  function Y(C) {
    return _(s, "expected return state"), _(se(C), "expected eol"), t.exit(g.htmlTextData), t.enter(g.lineEnding), t.consume(C), t.exit(g.lineEnding), me;
  }
  function me(C) {
    return _(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Ae(C) ? He(
      t,
      de,
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : X.tabSize
    )(C) : de(C);
  }
  function de(C) {
    return t.enter(g.htmlTextData), s(C);
  }
}
const _a = {
  name: "labelEnd",
  resolveAll: Tg,
  resolveTo: Eg,
  tokenize: Rg
}, Sg = { tokenize: Ig }, bg = { tokenize: Ng }, vg = { tokenize: Ag };
function Tg(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === g.labelImage || r.type === g.labelLink || r.type === g.labelEnd) {
      const i = r.type === g.labelImage ? 4 : 2;
      r.type = g.data, e += i;
    }
  }
  return t.length !== n.length && Xt(t, 0, t.length, n), t;
}
function Eg(t, e) {
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
  _(a !== void 0, "`open` is supposed to be found"), _(s !== void 0, "`close` is supposed to be found");
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
  ], o = At(o, t.slice(a + 1, a + r + 3)), o = At(o, [["enter", c, e]]), _(
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
  ]), o = At(o, t.slice(s + 1)), o = At(o, [["exit", l, e]]), Xt(t, a, t.length, o), t;
}
function Rg(t, e, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === g.labelImage || r.events[i][1].type === g.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(f) {
    return _(f === m.rightSquareBracket, "expected `]`"), a ? a._inactive ? d(f) : (s = r.parser.defined.includes(
      Dn(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), t.enter(g.labelEnd), t.enter(g.labelMarker), t.consume(f), t.exit(g.labelMarker), t.exit(g.labelEnd), l) : n(f);
  }
  function l(f) {
    return f === m.leftParenthesis ? t.attempt(
      Sg,
      c,
      s ? c : d
    )(f) : f === m.leftSquareBracket ? t.attempt(
      bg,
      c,
      s ? u : d
    )(f) : s ? c(f) : d(f);
  }
  function u(f) {
    return t.attempt(
      vg,
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
function Ig(t, e, n) {
  return r;
  function r(d) {
    return _(d === m.leftParenthesis, "expected left paren"), t.enter(g.resource), t.enter(g.resourceMarker), t.consume(d), t.exit(g.resourceMarker), i;
  }
  function i(d) {
    return Ct(d) ? dr(t, a)(d) : a(d);
  }
  function a(d) {
    return d === m.rightParenthesis ? c(d) : Sl(
      t,
      s,
      o,
      g.resourceDestination,
      g.resourceDestinationLiteral,
      g.resourceDestinationLiteralMarker,
      g.resourceDestinationRaw,
      g.resourceDestinationString,
      X.linkResourceDestinationBalanceMax
    )(d);
  }
  function s(d) {
    return Ct(d) ? dr(t, l)(d) : c(d);
  }
  function o(d) {
    return n(d);
  }
  function l(d) {
    return d === m.quotationMark || d === m.apostrophe || d === m.leftParenthesis ? vl(
      t,
      u,
      n,
      g.resourceTitle,
      g.resourceTitleMarker,
      g.resourceTitleString
    )(d) : c(d);
  }
  function u(d) {
    return Ct(d) ? dr(t, c)(d) : c(d);
  }
  function c(d) {
    return d === m.rightParenthesis ? (t.enter(g.resourceMarker), t.consume(d), t.exit(g.resourceMarker), t.exit(g.resource), e) : n(d);
  }
}
function Ng(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return _(o === m.leftSquareBracket, "expected left bracket"), bl.call(
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
function Ag(t, e, n) {
  return r;
  function r(a) {
    return _(a === m.leftSquareBracket, "expected left bracket"), t.enter(g.reference), t.enter(g.referenceMarker), t.consume(a), t.exit(g.referenceMarker), i;
  }
  function i(a) {
    return a === m.rightSquareBracket ? (t.enter(g.referenceMarker), t.consume(a), t.exit(g.referenceMarker), t.exit(g.reference), e) : n(a);
  }
}
const Og = {
  name: "labelStartImage",
  resolveAll: _a.resolveAll,
  tokenize: Mg
};
function Mg(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return _(o === m.exclamationMark, "expected `!`"), t.enter(g.labelImage), t.enter(g.labelImageMarker), t.consume(o), t.exit(g.labelImageMarker), a;
  }
  function a(o) {
    return o === m.leftSquareBracket ? (t.enter(g.labelMarker), t.consume(o), t.exit(g.labelMarker), t.exit(g.labelImage), s) : n(o);
  }
  function s(o) {
    return o === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : e(o);
  }
}
const Lg = {
  name: "labelStartLink",
  resolveAll: _a.resolveAll,
  tokenize: Pg
};
function Pg(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return _(s === m.leftSquareBracket, "expected `[`"), t.enter(g.labelLink), t.enter(g.labelMarker), t.consume(s), t.exit(g.labelMarker), t.exit(g.labelLink), a;
  }
  function a(s) {
    return s === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : e(s);
  }
}
const bi = { name: "lineEnding", tokenize: Dg };
function Dg(t, e) {
  return n;
  function n(r) {
    return _(se(r), "expected eol"), t.enter(g.lineEnding), t.consume(r), t.exit(g.lineEnding), He(t, e, g.linePrefix);
  }
}
const Pr = {
  name: "thematicBreak",
  tokenize: Fg
};
function Fg(t, e, n) {
  let r = 0, i;
  return a;
  function a(u) {
    return t.enter(g.thematicBreak), s(u);
  }
  function s(u) {
    return _(
      u === m.asterisk || u === m.dash || u === m.underscore,
      "expected `*`, `-`, or `_`"
    ), i = u, o(u);
  }
  function o(u) {
    return u === i ? (t.enter(g.thematicBreakSequence), l(u)) : r >= X.thematicBreakMarkerCountMin && (u === m.eof || se(u)) ? (t.exit(g.thematicBreak), e(u)) : n(u);
  }
  function l(u) {
    return u === i ? (t.consume(u), r++, l) : (t.exit(g.thematicBreakSequence), Ae(u) ? He(t, o, g.whitespace)(u) : o(u));
  }
}
const wt = {
  continuation: { tokenize: $g },
  exit: jg,
  name: "list",
  tokenize: Hg
}, zg = {
  partial: !0,
  tokenize: Vg
}, Ug = { partial: !0, tokenize: Bg };
function Hg(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === g.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(h) {
    _(r.containerState, "expected state");
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
    return _(r.containerState, "expected state"), ta(h) && ++s < X.listItemValueSizeMax ? (t.consume(h), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? h === r.containerState.marker : h === m.rightParenthesis || h === m.dot) ? (t.exit(g.listItemValue), u(h)) : n(h);
  }
  function u(h) {
    return _(r.containerState, "expected state"), _(h !== m.eof, "eof (`null`) is not a marker"), t.enter(g.listItemMarker), t.consume(h), t.exit(g.listItemMarker), r.containerState.marker = r.containerState.marker || h, t.check(
      ti,
      // Can’t be empty when interrupting.
      r.interrupt ? n : c,
      t.attempt(
        zg,
        f,
        d
      )
    );
  }
  function c(h) {
    return _(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, f(h);
  }
  function d(h) {
    return Ae(h) ? (t.enter(g.listItemPrefixWhitespace), t.consume(h), t.exit(g.listItemPrefixWhitespace), f) : n(h);
  }
  function f(h) {
    return _(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(t.exit(g.listItemPrefix), !0).length, e(h);
  }
}
function $g(t, e, n) {
  const r = this;
  return _(r.containerState, "expected state"), r.containerState._closeFlow = void 0, t.check(ti, i, a);
  function i(o) {
    return _(r.containerState, "expected state"), _(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, He(
      t,
      e,
      g.listItemIndent,
      r.containerState.size + 1
    )(o);
  }
  function a(o) {
    return _(r.containerState, "expected state"), r.containerState.furtherBlankLines || !Ae(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(Ug, e, s)(o));
  }
  function s(o) {
    return _(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, _(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), He(
      t,
      t.attempt(wt, e, n),
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : X.tabSize
    )(o);
  }
}
function Bg(t, e, n) {
  const r = this;
  return _(r.containerState, "expected state"), _(typeof r.containerState.size == "number", "expected size"), He(
    t,
    i,
    g.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    _(r.containerState, "expected state");
    const s = r.events[r.events.length - 1];
    return s && s[1].type === g.listItemIndent && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function jg(t) {
  _(this.containerState, "expected state"), _(typeof this.containerState.type == "string", "expected type"), t.exit(this.containerState.type);
}
function Vg(t, e, n) {
  const r = this;
  return _(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), He(
    t,
    i,
    g.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : X.tabSize + 1
  );
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !Ae(a) && s && s[1].type === g.listItemPrefixWhitespace ? e(a) : n(a);
  }
}
const Zs = {
  name: "setextUnderline",
  resolveTo: Zg,
  tokenize: Wg
};
function Zg(t, e) {
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
  _(i !== void 0, "expected a `text` index to be found"), _(r !== void 0, "expected a `text` index to be found"), _(t[r][2] === e, "enter context should be same"), _(
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
function Wg(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(u) {
    let c = r.events.length, d;
    for (_(
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
    return u === i ? (t.consume(u), o) : (t.exit(g.setextHeadingLineSequence), Ae(u) ? He(t, l, g.lineSuffix)(u) : l(u));
  }
  function l(u) {
    return u === m.eof || se(u) ? (t.exit(g.setextHeadingLine), e(u)) : n(u);
  }
}
const Gg = { tokenize: qg };
function qg(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    ti,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(
      this.parser.constructs.flowInitial,
      i,
      He(
        t,
        t.attempt(
          this.parser.constructs.flow,
          i,
          t.attempt(Qf, i)
        ),
        g.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (_(
      a === m.eof || se(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(g.lineEndingBlank), t.consume(a), t.exit(g.lineEndingBlank), e.currentConstruct = void 0, n;
  }
  function i(a) {
    if (_(
      a === m.eof || se(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(g.lineEnding), t.consume(a), t.exit(g.lineEnding), e.currentConstruct = void 0, n;
  }
}
const Kg = { resolveAll: El() }, Yg = Tl("string"), Xg = Tl("text");
function Tl(t) {
  return {
    resolveAll: El(
      t === "text" ? Jg : void 0
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
        for (_(Array.isArray(d), "expected `disable.null` to be populated"); ++f < d.length; ) {
          const h = d[f];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function El(t) {
  return e;
  function e(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === g.data && (a = i, i++) : (!n[i] || n[i][1].type !== g.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function Jg(t, e) {
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
          type: n === t.length || l || o < X.hardBreakPrefixSizeMin ? g.lineSuffix : g.hardBreakTrailing,
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
const Qg = {
  [m.asterisk]: wt,
  [m.plusSign]: wt,
  [m.dash]: wt,
  [m.digit0]: wt,
  [m.digit1]: wt,
  [m.digit2]: wt,
  [m.digit3]: wt,
  [m.digit4]: wt,
  [m.digit5]: wt,
  [m.digit6]: wt,
  [m.digit7]: wt,
  [m.digit8]: wt,
  [m.digit9]: wt,
  [m.greaterThan]: wl
}, e1 = {
  [m.leftSquareBracket]: ig
}, t1 = {
  [m.horizontalTab]: Si,
  [m.virtualSpace]: Si,
  [m.space]: Si
}, n1 = {
  [m.numberSign]: ug,
  [m.asterisk]: Pr,
  [m.dash]: [Zs, Pr],
  [m.lessThan]: fg,
  [m.equalsTo]: Zs,
  [m.underscore]: Pr,
  [m.graveAccent]: js,
  [m.tilde]: js
}, r1 = {
  [m.ampersand]: xl,
  [m.backslash]: Cl
}, i1 = {
  [m.carriageReturn]: bi,
  [m.lineFeed]: bi,
  [m.carriageReturnLineFeed]: bi,
  [m.exclamationMark]: Og,
  [m.ampersand]: xl,
  [m.asterisk]: na,
  [m.lessThan]: [Pf, kg],
  [m.leftSquareBracket]: Lg,
  [m.backslash]: [lg, Cl],
  [m.rightSquareBracket]: _a,
  [m.underscore]: na,
  [m.graveAccent]: qf
}, a1 = { null: [na, Kg] }, s1 = { null: [m.asterisk, m.underscore] }, o1 = { null: [] }, l1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: s1,
  contentInitial: e1,
  disable: o1,
  document: Qg,
  flow: n1,
  flowInitial: t1,
  insideSpan: a1,
  string: r1,
  text: i1
}, Symbol.toStringTag, { value: "Module" }));
var ra = { exports: {} }, vi, Ws;
function c1() {
  if (Ws) return vi;
  Ws = 1;
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
function u1(t) {
  n.debug = n, n.default = n, n.coerce = l, n.disable = s, n.enable = i, n.enabled = o, n.humanize = c1(), n.destroy = u, Object.keys(t).forEach((c) => {
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
      const S = k, v = Number(/* @__PURE__ */ new Date()), R = v - (d || v);
      S.diff = R, S.prev = d, S.curr = v, d = v, I[0] = n.coerce(I[0]), typeof I[0] != "string" && I.unshift("%O");
      let D = 0;
      I[0] = I[0].replace(/%([a-zA-Z%])/g, (b, j) => {
        if (b === "%%")
          return "%";
        D++;
        const V = n.formatters[j];
        if (typeof V == "function") {
          const K = I[D];
          b = V.call(S, K), I.splice(D, 1), D--;
        }
        return b;
      }), n.formatArgs.call(S, I), (S.log || n.log).apply(S, I);
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
var d1 = u1;
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
  t.exports = d1(e);
  const { formatters: o } = t.exports;
  o.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(ra, ra.exports);
var h1 = ra.exports;
const p1 = /* @__PURE__ */ ha(h1), xn = p1("micromark");
function f1(t, e, n) {
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
    attempt: K(j),
    check: K(V),
    consume: D,
    enter: M,
    exit: b,
    interrupt: K(V, { interrupt: !0 })
  }, c = {
    code: m.eof,
    containerState: {},
    defineSkip: S,
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
    return s = At(s, N), v(), s[s.length - 1] !== m.eof ? [] : (q(e, 0), c.events = ka(a, c.events, c), c.events);
  }
  function w(N, L) {
    return m1(k(N), L);
  }
  function k(N) {
    return g1(s, N);
  }
  function I() {
    const { _bufferIndex: N, _index: L, line: U, column: ie, offset: Y } = r;
    return { _bufferIndex: N, _index: L, line: U, column: ie, offset: Y };
  }
  function S(N) {
    i[N.line] = N.column, G(), xn("position: define skip: `%j`", r);
  }
  function v() {
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
    _(l === !0, "expected character to be consumed"), l = void 0, xn("main: passing `%s` to %s", N, d && d.name), f = N, _(typeof d == "function", "expected state"), d = d(N);
  }
  function D(N) {
    _(N === f, "expected given code to equal expected code"), xn("consume: `%s`", N), _(
      l === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), _(
      N === null ? c.events.length === 0 || c.events[c.events.length - 1][0] === "exit" : c.events[c.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), se(N) ? (r.line++, r.column = 1, r.offset += N === m.carriageReturnLineFeed ? 2 : 1, G(), xn("position: after eol: `%j`", r)) : N !== m.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), c.previous = N, l = !0;
  }
  function M(N, L) {
    const U = L || {};
    return U.type = N, U.start = I(), _(typeof N == "string", "expected string type"), _(N.length > 0, "expected non-empty string"), xn("enter: `%s`", N), c.events.push(["enter", U, c]), o.push(U), U;
  }
  function b(N) {
    _(typeof N == "string", "expected string type"), _(N.length > 0, "expected non-empty string");
    const L = o.pop();
    return _(L, "cannot close w/o open tokens"), L.end = I(), _(N === L.type, "expected exit token to match current token"), _(
      !(L.start._index === L.end._index && L.start._bufferIndex === L.end._bufferIndex),
      "expected non-empty token (`" + N + "`)"
    ), xn("exit: `%s`", L.type), c.events.push(["exit", L, c]), L;
  }
  function j(N, L) {
    q(N, L.from);
  }
  function V(N, L) {
    L.restore();
  }
  function K(N, L) {
    return U;
    function U(ie, Y, me) {
      let de, C, F, $;
      return Array.isArray(ie) ? (
        /* c8 ignore next 1 */
        J(ie)
      ) : "tokenize" in ie ? (
        // Looks like a construct.
        J([
          /** @type {Construct} */
          ie
        ])
      ) : y(ie);
      function y(te) {
        return Le;
        function Le(ke) {
          const Se = ke !== null && te[ke], xe = ke !== null && te.null, Fe = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Se) ? Se : Se ? [Se] : [],
            ...Array.isArray(xe) ? xe : xe ? [xe] : []
          ];
          return J(Fe)(ke);
        }
      }
      function J(te) {
        return de = te, C = 0, te.length === 0 ? (_(me, "expected `bogusState` to be given"), me) : z(te[C]);
      }
      function z(te) {
        return Le;
        function Le(ke) {
          return $ = ce(), F = te, te.partial || (c.currentConstruct = te), _(
            c.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), te.name && c.parser.constructs.disable.null.includes(te.name) ? ye(ke) : te.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(c), L) : c,
            u,
            oe,
            ye
          )(ke);
        }
      }
      function oe(te) {
        return _(te === f, "expected code"), l = !0, N(F, $), Y;
      }
      function ye(te) {
        return _(te === f, "expected code"), l = !0, $.restore(), ++C < de.length ? z(de[C]) : me;
      }
    }
  }
  function q(N, L) {
    N.resolveAll && !a.includes(N) && a.push(N), N.resolve && Xt(
      c.events,
      L,
      c.events.length - L,
      N.resolve(c.events.slice(L), c)
    ), N.resolveTo && (c.events = N.resolveTo(c.events, c)), _(
      N.partial || c.events.length === 0 || c.events[c.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function ce() {
    const N = I(), L = c.previous, U = c.currentConstruct, ie = c.events.length, Y = Array.from(o);
    return { from: ie, restore: me };
    function me() {
      r = N, c.previous = L, c.currentConstruct = U, c.events.length = ie, o = Y, G(), xn("position: restore: `%j`", r);
    }
  }
  function G() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function g1(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, a = e.end._bufferIndex;
  let s;
  if (n === i)
    _(a > -1, "expected non-negative end buffer index"), _(r > -1, "expected non-negative start buffer index"), s = [t[n].slice(r, a)];
  else {
    if (s = t.slice(n, i), r > -1) {
      const o = s[0];
      typeof o == "string" ? s[0] = o.slice(r) : (_(r === 0, "expected `startBufferIndex` to be `0`"), s.shift());
    }
    a > 0 && s.push(t[i].slice(0, a));
  }
  return s;
}
function m1(t, e) {
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
          s = Zt.cr;
          break;
        }
        case m.lineFeed: {
          s = Zt.lf;
          break;
        }
        case m.carriageReturnLineFeed: {
          s = Zt.cr + Zt.lf;
          break;
        }
        case m.horizontalTab: {
          s = e ? Zt.space : Zt.ht;
          break;
        }
        case m.virtualSpace: {
          if (!e && i) continue;
          s = Zt.space;
          break;
        }
        default:
          _(typeof a == "number", "expected number"), s = String.fromCharCode(a);
      }
    i = a === m.horizontalTab, r.push(s);
  }
  return r.join("");
}
function y1(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      xf([l1, ...(t || {}).extensions || []])
    ),
    content: i(Rf),
    defined: [],
    document: i(Nf),
    flow: i(Gg),
    lazy: {},
    string: i(Yg),
    text: i(Xg)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return f1(r, a, o);
    }
  }
}
function w1(t) {
  for (; !_l(t); )
    ;
  return t;
}
const Gs = /[\0\t\n\r]/g;
function C1() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let u, c, d, f, h;
    for (a = e + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), d = 0, e = "", n && (a.charCodeAt(0) === m.byteOrderMarker && d++, n = void 0); d < a.length; ) {
      if (Gs.lastIndex = d, u = Gs.exec(a), f = u && u.index !== void 0 ? u.index : a.length, h = a.charCodeAt(f), !u) {
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
            for (c = Math.ceil(t / X.tabSize) * X.tabSize, l.push(m.horizontalTab); t++ < c; ) l.push(m.virtualSpace);
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
const x1 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function k1(t) {
  return t.replace(x1, _1);
}
function _1(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === m.numberSign) {
    const i = n.charCodeAt(1), a = i === m.lowercaseX || i === m.uppercaseX;
    return yl(
      n.slice(a ? 2 : 1),
      a ? X.numericBaseHexadecimal : X.numericBaseDecimal
    );
  }
  return xa(n) || t;
}
const Rl = {}.hasOwnProperty;
function S1(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), b1(n)(
    w1(
      y1(n).document().write(C1()(t, e, !0))
    )
  );
}
function b1(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Ht),
      autolinkProtocol: K,
      autolinkEmail: K,
      atxHeading: a($e),
      blockQuote: a(ke),
      characterEscape: K,
      characterReference: K,
      codeFenced: a(Se),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(Se, s),
      codeText: a(xe, s),
      codeTextData: K,
      data: K,
      codeFlowValue: K,
      definition: a(Fe),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(je),
      hardBreakEscape: a(Ve),
      hardBreakTrailing: a(Ve),
      htmlFlow: a(_t, s),
      htmlFlowData: K,
      htmlText: a(_t, s),
      htmlTextData: K,
      image: a(gt),
      label: s,
      link: a(Ht),
      listItem: a(gn),
      listItemValue: f,
      listOrdered: a($t, d),
      listUnordered: a($t),
      paragraph: a(mn),
      reference: y,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a($e),
      strong: a(En),
      thematicBreak: a(Jt)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: M,
      autolink: l(),
      autolinkEmail: Le,
      autolinkProtocol: te,
      blockQuote: l(),
      characterEscapeValue: q,
      characterReferenceMarkerHexadecimal: z,
      characterReferenceMarkerNumeric: z,
      characterReferenceValue: oe,
      characterReference: ye,
      codeFenced: l(I),
      codeFencedFence: k,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: w,
      codeFlowValue: q,
      codeIndented: l(S),
      codeText: l(U),
      codeTextData: q,
      data: q,
      definition: l(),
      definitionDestinationString: D,
      definitionLabelString: v,
      definitionTitleString: R,
      emphasis: l(),
      hardBreakEscape: l(G),
      hardBreakTrailing: l(G),
      htmlFlow: l(N),
      htmlFlowData: q,
      htmlText: l(L),
      htmlTextData: q,
      image: l(Y),
      label: de,
      labelText: me,
      lineEnding: ce,
      link: l(ie),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: J,
      resourceDestinationString: C,
      resourceTitleString: F,
      resource: $,
      setextHeading: l(V),
      setextHeadingLineSequence: j,
      setextHeadingText: b,
      strong: l(),
      thematicBreak: l()
    }
  };
  Il(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(T) {
    let E = { type: "root", children: [] };
    const Q = {
      stack: [E],
      tokenStack: [],
      config: e,
      enter: o,
      exit: u,
      buffer: s,
      resume: c,
      data: n
    }, we = [];
    let Te = -1;
    for (; ++Te < T.length; )
      if (T[Te][1].type === g.listOrdered || T[Te][1].type === g.listUnordered)
        if (T[Te][0] === "enter")
          we.push(Te);
        else {
          const Ze = we.pop();
          _(typeof Ze == "number", "expected list ot be open"), Te = i(T, Ze, Te);
        }
    for (Te = -1; ++Te < T.length; ) {
      const Ze = e[T[Te][0]];
      Rl.call(Ze, T[Te][1].type) && Ze[T[Te][1].type].call(
        Object.assign(
          { sliceSerialize: T[Te][2].sliceSerialize },
          Q
        ),
        T[Te][1]
      );
    }
    if (Q.tokenStack.length > 0) {
      const Ze = Q.tokenStack[Q.tokenStack.length - 1];
      (Ze[1] || qs).call(Q, void 0, Ze[0]);
    }
    for (E.position = {
      start: sn(
        T.length > 0 ? T[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: sn(
        T.length > 0 ? T[T.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, Te = -1; ++Te < e.transforms.length; )
      E = e.transforms[Te](E) || E;
    return E;
  }
  function i(T, E, Q) {
    let we = E - 1, Te = -1, Ze = !1, mt, st, Rt, rt;
    for (; ++we <= Q; ) {
      const Ge = T[we];
      switch (Ge[1].type) {
        case g.listUnordered:
        case g.listOrdered:
        case g.blockQuote: {
          Ge[0] === "enter" ? Te++ : Te--, rt = void 0;
          break;
        }
        case g.lineEndingBlank: {
          Ge[0] === "enter" && (mt && !rt && !Te && !Rt && (Rt = we), rt = void 0);
          break;
        }
        case g.linePrefix:
        case g.listItemValue:
        case g.listItemMarker:
        case g.listItemPrefix:
        case g.listItemPrefixWhitespace:
          break;
        default:
          rt = void 0;
      }
      if (!Te && Ge[0] === "enter" && Ge[1].type === g.listItemPrefix || Te === -1 && Ge[0] === "exit" && (Ge[1].type === g.listUnordered || Ge[1].type === g.listOrdered)) {
        if (mt) {
          let Pe = we;
          for (st = void 0; Pe--; ) {
            const Xe = T[Pe];
            if (Xe[1].type === g.lineEnding || Xe[1].type === g.lineEndingBlank) {
              if (Xe[0] === "exit") continue;
              st && (T[st][1].type = g.lineEndingBlank, Ze = !0), Xe[1].type = g.lineEnding, st = Pe;
            } else if (!(Xe[1].type === g.linePrefix || Xe[1].type === g.blockQuotePrefix || Xe[1].type === g.blockQuotePrefixWhitespace || Xe[1].type === g.blockQuoteMarker || Xe[1].type === g.listItemIndent)) break;
          }
          Rt && (!st || Rt < st) && (mt._spread = !0), mt.end = Object.assign(
            {},
            st ? T[st][1].start : Ge[1].end
          ), T.splice(st || we, 0, ["exit", mt, Ge[2]]), we++, Q++;
        }
        if (Ge[1].type === g.listItemPrefix) {
          const Pe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ge[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          mt = Pe, T.splice(we, 0, ["enter", Pe, Ge[2]]), we++, Q++, Rt = void 0, rt = !0;
        }
      }
    }
    return T[E][1]._spread = Ze, Q;
  }
  function a(T, E) {
    return Q;
    function Q(we) {
      o.call(this, T(we), we), E && E.call(this, we);
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function o(T, E, Q) {
    const we = this.stack[this.stack.length - 1];
    _(we, "expected `parent`"), _("children" in we, "expected `parent`"), we.children.push(T), this.stack.push(T), this.tokenStack.push([E, Q || void 0]), T.position = {
      start: sn(E.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(T) {
    return E;
    function E(Q) {
      T && T.call(this, Q), u.call(this, Q);
    }
  }
  function u(T, E) {
    const Q = this.stack.pop();
    _(Q, "expected `node`");
    const we = this.tokenStack.pop();
    if (we)
      we[0].type !== T.type && (E ? E.call(this, T, we[0]) : (we[1] || qs).call(this, T, we[0]));
    else throw new Error(
      "Cannot close `" + T.type + "` (" + ur({ start: T.start, end: T.end }) + "): it’s not open"
    );
    _(Q.type !== "fragment", "unexpected fragment `exit`ed"), _(Q.position, "expected `position` to be defined"), Q.position.end = sn(T.end);
  }
  function c() {
    return wf(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function f(T) {
    if (this.data.expectingFirstListItemValue) {
      const E = this.stack[this.stack.length - 2];
      _(E, "expected nodes on stack"), _(E.type === "list", "expected list on stack"), E.start = Number.parseInt(
        this.sliceSerialize(T),
        X.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "code", "expected code on stack"), E.lang = T;
  }
  function w() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "code", "expected code on stack"), E.meta = T;
  }
  function k() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "code", "expected code on stack"), E.value = T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function S() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "code", "expected code on stack"), E.value = T.replace(/(\r?\n|\r)$/g, "");
  }
  function v(T) {
    const E = this.resume(), Q = this.stack[this.stack.length - 1];
    _(Q, "expected node on stack"), _(Q.type === "definition", "expected definition on stack"), Q.label = E, Q.identifier = Dn(
      this.sliceSerialize(T)
    ).toLowerCase();
  }
  function R() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "definition", "expected definition on stack"), E.title = T;
  }
  function D() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "definition", "expected definition on stack"), E.url = T;
  }
  function M(T) {
    const E = this.stack[this.stack.length - 1];
    if (_(E, "expected node on stack"), _(E.type === "heading", "expected heading on stack"), !E.depth) {
      const Q = this.sliceSerialize(T).length;
      _(
        Q === 1 || Q === 2 || Q === 3 || Q === 4 || Q === 5 || Q === 6,
        "expected `depth` between `1` and `6`"
      ), E.depth = Q;
    }
  }
  function b() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function j(T) {
    const E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "heading", "expected heading on stack"), E.depth = this.sliceSerialize(T).codePointAt(0) === m.equalsTo ? 1 : 2;
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function K(T) {
    const E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _("children" in E, "expected parent on stack");
    const Q = E.children;
    let we = Q[Q.length - 1];
    (!we || we.type !== "text") && (we = yn(), we.position = {
      start: sn(T.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, Q.push(we)), this.stack.push(we);
  }
  function q(T) {
    const E = this.stack.pop();
    _(E, "expected a `node` to be on the stack"), _("value" in E, "expected a `literal` to be on the stack"), _(E.position, "expected `node` to have an open position"), E.value += this.sliceSerialize(T), E.position.end = sn(T.end);
  }
  function ce(T) {
    const E = this.stack[this.stack.length - 1];
    if (_(E, "expected `node`"), this.data.atHardBreak) {
      _("children" in E, "expected `parent`");
      const Q = E.children[E.children.length - 1];
      _(Q.position, "expected tail to have a starting position"), Q.position.end = sn(T.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(E.type) && (K.call(this, T), q.call(this, T));
  }
  function G() {
    this.data.atHardBreak = !0;
  }
  function N() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "html", "expected html on stack"), E.value = T;
  }
  function L() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "html", "expected html on stack"), E.value = T;
  }
  function U() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "inlineCode", "expected inline code on stack"), E.value = T;
  }
  function ie() {
    const T = this.stack[this.stack.length - 1];
    if (_(T, "expected node on stack"), _(T.type === "link", "expected link on stack"), this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = E, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function Y() {
    const T = this.stack[this.stack.length - 1];
    if (_(T, "expected node on stack"), _(T.type === "image", "expected image on stack"), this.data.inReference) {
      const E = this.data.referenceType || "shortcut";
      T.type += "Reference", T.referenceType = E, delete T.url, delete T.title;
    } else
      delete T.identifier, delete T.label;
    this.data.referenceType = void 0;
  }
  function me(T) {
    const E = this.sliceSerialize(T), Q = this.stack[this.stack.length - 2];
    _(Q, "expected ancestor on stack"), _(
      Q.type === "image" || Q.type === "link",
      "expected image or link on stack"
    ), Q.label = k1(E), Q.identifier = Dn(E).toLowerCase();
  }
  function de() {
    const T = this.stack[this.stack.length - 1];
    _(T, "expected node on stack"), _(T.type === "fragment", "expected fragment on stack");
    const E = this.resume(), Q = this.stack[this.stack.length - 1];
    if (_(Q, "expected node on stack"), _(
      Q.type === "image" || Q.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, Q.type === "link") {
      const we = T.children;
      Q.children = we;
    } else
      Q.alt = E;
  }
  function C() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(
      E.type === "image" || E.type === "link",
      "expected image or link on stack"
    ), E.url = T;
  }
  function F() {
    const T = this.resume(), E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(
      E.type === "image" || E.type === "link",
      "expected image or link on stack"
    ), E.title = T;
  }
  function $() {
    this.data.inReference = void 0;
  }
  function y() {
    this.data.referenceType = "collapsed";
  }
  function J(T) {
    const E = this.resume(), Q = this.stack[this.stack.length - 1];
    _(Q, "expected node on stack"), _(
      Q.type === "image" || Q.type === "link",
      "expected image reference or link reference on stack"
    ), Q.label = E, Q.identifier = Dn(
      this.sliceSerialize(T)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function z(T) {
    _(
      T.type === "characterReferenceMarkerNumeric" || T.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = T.type;
  }
  function oe(T) {
    const E = this.sliceSerialize(T), Q = this.data.characterReferenceType;
    let we;
    if (Q)
      we = yl(
        E,
        Q === g.characterReferenceMarkerNumeric ? X.numericBaseDecimal : X.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Ze = xa(E);
      _(Ze !== !1, "expected reference to decode"), we = Ze;
    }
    const Te = this.stack[this.stack.length - 1];
    _(Te, "expected `node`"), _("value" in Te, "expected `node.value`"), Te.value += we;
  }
  function ye(T) {
    const E = this.stack.pop();
    _(E, "expected `node`"), _(E.position, "expected `node.position`"), E.position.end = sn(T.end);
  }
  function te(T) {
    q.call(this, T);
    const E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "link", "expected link on stack"), E.url = this.sliceSerialize(T);
  }
  function Le(T) {
    q.call(this, T);
    const E = this.stack[this.stack.length - 1];
    _(E, "expected node on stack"), _(E.type === "link", "expected link on stack"), E.url = "mailto:" + this.sliceSerialize(T);
  }
  function ke() {
    return { type: "blockquote", children: [] };
  }
  function Se() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function xe() {
    return { type: "inlineCode", value: "" };
  }
  function Fe() {
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
  function $e() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Ve() {
    return { type: "break" };
  }
  function _t() {
    return { type: "html", value: "" };
  }
  function gt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Ht() {
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
  function gn(T) {
    return {
      type: "listItem",
      spread: T._spread,
      checked: null,
      children: []
    };
  }
  function mn() {
    return { type: "paragraph", children: [] };
  }
  function En() {
    return { type: "strong", children: [] };
  }
  function yn() {
    return { type: "text", value: "" };
  }
  function Jt() {
    return { type: "thematicBreak" };
  }
}
function sn(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function Il(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? Il(t, r) : v1(t, r);
  }
}
function v1(t, e) {
  let n;
  for (n in e)
    if (Rl.call(e, n))
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
function qs(t, e) {
  throw t ? new Error(
    "Cannot close `" + t.type + "` (" + ur({ start: t.start, end: t.end }) + "): a different token (`" + e.type + "`, " + ur({ start: e.start, end: e.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + e.type + "`, " + ur({ start: e.start, end: e.end }) + ") is still open"
  );
}
function T1(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return S1(r, {
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
function E1(t, e) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: t.wrap(t.all(e), !0)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function R1(t, e) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return t.patch(e, n), [t.applyData(e, n), { type: "text", value: `
` }];
}
function I1(t, e) {
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
function N1(t, e) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function A1(t, e) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function O1(t, e) {
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
function M1(t, e) {
  const n = {
    type: "element",
    tagName: "h" + e.depth,
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function L1(t, e) {
  if (t.options.allowDangerousHtml) {
    const n = { type: "raw", value: e.value };
    return t.patch(e, n), t.applyData(e, n);
  }
}
function Nl(t, e) {
  const n = e.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference")
    return [{ type: "text", value: "![" + e.alt + r }];
  const i = t.all(e), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function P1(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return Nl(t, e);
  const i = { src: Zn(r.url || ""), alt: e.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return t.patch(e, a), t.applyData(e, a);
}
function D1(t, e) {
  const n = { src: Zn(e.url) };
  e.alt !== null && e.alt !== void 0 && (n.alt = e.alt), e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return t.patch(e, r), t.applyData(e, r);
}
function F1(t, e) {
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
function z1(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return Nl(t, e);
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
function U1(t, e) {
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
function H1(t, e, n) {
  const r = t.all(e), i = n ? $1(n) : Al(e), a = {}, s = [];
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
function $1(t) {
  let e = !1;
  if (t.type === "list") {
    e = t.spread || !1;
    const n = t.children;
    let r = -1;
    for (; !e && ++r < n.length; )
      e = Al(n[r]);
  }
  return e;
}
function Al(t) {
  const e = t.spread;
  return e ?? t.children.length > 1;
}
function B1(t, e) {
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
function j1(t, e) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function V1(t, e) {
  const n = { type: "root", children: t.wrap(t.all(e)) };
  return t.patch(e, n), t.applyData(e, n);
}
function Z1(t, e) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function W1(t, e) {
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
    }, o = ma(e.children[1]), l = ul(e.children[e.children.length - 1]);
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
function G1(t, e, n) {
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
function q1(t, e) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
const Ks = 9, Ys = 32;
function K1(t) {
  const e = String(t), n = /\r?\n|\r/g;
  let r = n.exec(e), i = 0;
  const a = [];
  for (; r; )
    a.push(
      Xs(e.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(e);
  return a.push(Xs(e.slice(i), i > 0, !1)), a.join("");
}
function Xs(t, e, n) {
  let r = 0, i = t.length;
  if (e) {
    let a = t.codePointAt(r);
    for (; a === Ks || a === Ys; )
      r++, a = t.codePointAt(r);
  }
  if (n) {
    let a = t.codePointAt(i - 1);
    for (; a === Ks || a === Ys; )
      i--, a = t.codePointAt(i - 1);
  }
  return i > r ? t.slice(r, i) : "";
}
function Y1(t, e) {
  const n = { type: "text", value: K1(String(e.value)) };
  return t.patch(e, n), t.applyData(e, n);
}
function X1(t, e) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return t.patch(e, n), t.applyData(e, n);
}
const J1 = {
  blockquote: E1,
  break: R1,
  code: I1,
  delete: N1,
  emphasis: A1,
  footnoteReference: O1,
  heading: M1,
  html: L1,
  imageReference: P1,
  image: D1,
  inlineCode: F1,
  linkReference: z1,
  link: U1,
  listItem: H1,
  list: B1,
  paragraph: j1,
  // @ts-expect-error: root is different, but hard to type.
  root: V1,
  strong: Z1,
  table: W1,
  tableCell: q1,
  tableRow: G1,
  text: Y1,
  thematicBreak: X1,
  toml: Nr,
  yaml: Nr,
  definition: Nr,
  footnoteDefinition: Nr
};
function Nr() {
}
const Ol = -1, ni = 0, hr = 1, qr = 2, Sa = 3, ba = 4, va = 5, Ta = 6, Ml = 7, Ll = 8, Js = typeof self == "object" ? self : globalThis, Q1 = (t, e) => {
  const n = (i, a) => (t.set(a, i), i), r = (i) => {
    if (t.has(i))
      return t.get(i);
    const [a, s] = e[i];
    switch (a) {
      case ni:
      case Ol:
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
      case Ml: {
        const { name: o, message: l } = s;
        return n(new Js[o](l), i);
      }
      case Ll:
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
    return n(new Js[a](s), i);
  };
  return r;
}, Qs = (t) => Q1(/* @__PURE__ */ new Map(), t)(0), On = "", { toString: em } = {}, { keys: tm } = Object, sr = (t) => {
  const e = typeof t;
  if (e !== "object" || !t)
    return [ni, e];
  const n = em.call(t).slice(8, -1);
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
  return n.includes("Array") ? [hr, n] : n.includes("Error") ? [Ml, n] : [qr, n];
}, Ar = ([t, e]) => t === ni && (e === "function" || e === "symbol"), nm = (t, e, n, r) => {
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
            o = Ll, c = s.toString();
            break;
          case "function":
          case "symbol":
            if (t)
              throw new TypeError("unable to serialize " + l);
            c = null;
            break;
          case "undefined":
            return i([Ol], s);
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
        for (const f of tm(s))
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
}, eo = (t, { json: e, lossy: n } = {}) => {
  const r = [];
  return nm(!(e || n), !!e, /* @__PURE__ */ new Map(), r)(t), r;
}, Kr = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (t, e) => e && ("json" in e || "lossy" in e) ? Qs(eo(t, e)) : structuredClone(t)
) : (t, e) => Qs(eo(t, e));
function rm(t, e) {
  const n = [{ type: "text", value: "↩" }];
  return e > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(e) }]
  }), n;
}
function im(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function am(t) {
  const e = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", n = t.options.footnoteBackContent || rm, r = t.options.footnoteBackLabel || im, i = t.options.footnoteLabel || "Footnotes", a = t.options.footnoteLabelTagName || "h2", s = t.options.footnoteLabelProperties || {
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
    const S = {
      type: "element",
      tagName: "li",
      properties: { id: e + "fn-" + f },
      children: t.wrap(c, !0)
    };
    t.patch(u, S), o.push(S);
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
      return cm;
    if (typeof t == "function")
      return ri(t);
    if (typeof t == "object")
      return Array.isArray(t) ? sm(t) : om(t);
    if (typeof t == "string")
      return lm(t);
    throw new Error("Expected function, string, or object as test");
  }
);
function sm(t) {
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
function om(t) {
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
function lm(t) {
  return ri(e);
  function e(n) {
    return n && n.type === t;
  }
}
function ri(t) {
  return e;
  function e(n, r, i) {
    return !!(um(n) && t.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function cm() {
  return !0;
}
function um(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const Pl = [], dm = !0, to = !1, hm = "skip";
function Dl(t, e, n, r) {
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
      let h = Pl, w, k, I;
      if ((!e || a(l, u, c[c.length - 1] || void 0)) && (h = pm(n(l, c)), h[0] === to))
        return h;
      if ("children" in l && l.children) {
        const S = (
          /** @type {UnistParent} */
          l
        );
        if (S.children && h[0] !== hm)
          for (k = (r ? S.children.length : -1) + s, I = c.concat(S); k > -1 && k < S.children.length; ) {
            const v = S.children[k];
            if (w = o(v, k, I)(), w[0] === to)
              return w;
            k = typeof w[1] == "number" ? w[1] : k + s;
          }
      }
      return h;
    }
  }
}
function pm(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [dm, t] : t == null ? Pl : [t];
}
function Fl(t, e, n, r) {
  let i, a, s;
  typeof e == "function" && typeof n != "function" ? (a = void 0, s = e, i = n) : (a = e, s = n, i = r), Dl(t, a, o, i);
  function o(l, u) {
    const c = u[u.length - 1], d = c ? c.children.indexOf(l) : void 0;
    return s(l, d, c);
  }
}
const ia = {}.hasOwnProperty, fm = {};
function gm(t, e) {
  const n = e || fm, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...J1, ...n.handlers }, o = {
    all: u,
    applyData: ym,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: mm,
    wrap: Cm
  };
  return Fl(t, function(c) {
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
        const { children: k, ...I } = c, S = Kr(I);
        return S.children = o.all(c), S;
      }
      return Kr(c);
    }
    return (o.options.unknownHandler || wm)(o, c, d);
  }
  function u(c) {
    const d = [];
    if ("children" in c) {
      const f = c.children;
      let h = -1;
      for (; ++h < f.length; ) {
        const w = o.one(f[h], c);
        if (w) {
          if (h && f[h - 1].type === "break" && (!Array.isArray(w) && w.type === "text" && (w.value = no(w.value)), !Array.isArray(w) && w.type === "element")) {
            const k = w.children[0];
            k && k.type === "text" && (k.value = no(k.value));
          }
          Array.isArray(w) ? d.push(...w) : d.push(w);
        }
      }
    }
    return d;
  }
}
function mm(t, e) {
  t.position && (e.position = Kp(t));
}
function ym(t, e) {
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
function wm(t, e) {
  const n = e.data || {}, r = "value" in e && !(ia.call(n, "hProperties") || ia.call(n, "hChildren")) ? { type: "text", value: e.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function Cm(t, e) {
  const n = [];
  let r = -1;
  for (e && n.push({ type: "text", value: `
` }); ++r < t.length; )
    r && n.push({ type: "text", value: `
` }), n.push(t[r]);
  return e && t.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function no(t) {
  let e = 0, n = t.charCodeAt(e);
  for (; n === 9 || n === 32; )
    e++, n = t.charCodeAt(e);
  return t.slice(e);
}
function ro(t, e) {
  const n = gm(t, e), r = n.one(t, void 0), i = am(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (_("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function xm(t, e) {
  return t && "run" in t ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      ro(n, { file: r, ...e })
    );
    await t.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      ro(n, { file: r, ...t || e })
    );
  };
}
function io(t) {
  if (t)
    throw t;
}
var Dr = Object.prototype.hasOwnProperty, zl = Object.prototype.toString, ao = Object.defineProperty, so = Object.getOwnPropertyDescriptor, oo = function(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : zl.call(e) === "[object Array]";
}, lo = function(e) {
  if (!e || zl.call(e) !== "[object Object]")
    return !1;
  var n = Dr.call(e, "constructor"), r = e.constructor && e.constructor.prototype && Dr.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !n && !r)
    return !1;
  var i;
  for (i in e)
    ;
  return typeof i > "u" || Dr.call(e, i);
}, co = function(e, n) {
  ao && n.name === "__proto__" ? ao(e, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : e[n.name] = n.newValue;
}, uo = function(e, n) {
  if (n === "__proto__")
    if (Dr.call(e, n)) {
      if (so)
        return so(e, n).value;
    } else return;
  return e[n];
}, km = function t() {
  var e, n, r, i, a, s, o = arguments[0], l = 1, u = arguments.length, c = !1;
  for (typeof o == "boolean" && (c = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < u; ++l)
    if (e = arguments[l], e != null)
      for (n in e)
        r = uo(o, n), i = uo(e, n), o !== i && (c && i && (lo(i) || (a = oo(i))) ? (a ? (a = !1, s = r && oo(r) ? r : []) : s = r && lo(r) ? r : {}, co(o, { name: n, newValue: t(c, s, i) })) : typeof i < "u" && co(o, { name: n, newValue: i }));
  return o;
};
const Ti = /* @__PURE__ */ ha(km);
function aa(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function _m() {
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
      i = u, c ? Sm(c, o)(...u) : s(null, ...u);
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
function Sm(t, e) {
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
const Vt = { basename: bm, dirname: vm, extname: Tm, join: Em, sep: "/" };
function bm(t, e) {
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
function vm(t) {
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
function Tm(t) {
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
function Em(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    kr(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : Rm(n);
}
function Rm(t) {
  kr(t);
  const e = t.codePointAt(0) === 47;
  let n = Im(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function Im(t, e) {
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
const Nm = { cwd: Am };
function Am() {
  return "/";
}
function sa(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function Om(t) {
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
  return Mm(t);
}
function Mm(t) {
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
class Ul {
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
    e ? sa(e) ? n = { path: e } : typeof e == "string" || Lm(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : Nm.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
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
    return typeof this.path == "string" ? Vt.basename(this.path) : void 0;
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
    Ii(e, "basename"), Ri(e, "basename"), this.path = Vt.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Vt.dirname(this.path) : void 0;
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
    ho(this.basename, "dirname"), this.path = Vt.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Vt.extname(this.path) : void 0;
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
    if (Ri(e, "extname"), ho(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Vt.join(this.dirname, this.stem + (e || ""));
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
    sa(e) && (e = Om(e)), Ii(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Vt.basename(this.path, this.extname) : void 0;
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
    Ii(e, "stem"), Ri(e, "stem"), this.path = Vt.join(this.dirname || "", e + (this.extname || ""));
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
  if (t && t.includes(Vt.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + Vt.sep + "`"
    );
}
function Ii(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function ho(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function Lm(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const Pm = (
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
), Dm = {}.hasOwnProperty;
class Ra extends Pm {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = _m();
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
    return typeof e == "string" ? arguments.length === 2 ? (Oi("data", this.frozen), this.namespace[e] = n, this) : Dm.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Oi("data", this.frozen), this.namespace = e, this) : this.namespace;
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
        Um(w) ? f.value = w : f.result = w, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          f
        );
      });
      function u(c, d) {
        c || !d ? s(c) : a ? a(d) : (_(n, "`done` is defined if `resolve` is not"), n(void 0, d));
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
    return this.freeze(), Ni("processSync", this.parser || this.Parser), Ai("processSync", this.compiler || this.Compiler), this.process(e, i), fo("processSync", "process", n), _(r, "we either bailed on an error or have a tree"), r;
    function i(a, s) {
      n = !0, io(a), r = s;
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
    po(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      _(
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
        c ? o(c) : s ? s(h) : (_(r, "`done` is defined if `resolve` is not"), r(void 0, h, f));
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
    return this.run(e, n, a), fo("runSync", "run", r), _(i, "we either bailed on an error or have a tree"), i;
    function a(s, o) {
      io(s), i = o, r = !0;
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
    return Ai("stringify", i), po(e), i(e, r);
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
const Fm = new Ra().freeze();
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
function po(t) {
  if (!aa(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function fo(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function Or(t) {
  return zm(t) ? t : new Ul(t);
}
function zm(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function Um(t) {
  return typeof t == "string" || Hm(t);
}
function Hm(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const $m = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", go = [], mo = { allowDangerousHtml: !0 }, Bm = /^(https?|ircs?|mailto|xmpp)$/i, jm = [
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
function yo(t) {
  const e = Vm(t), n = Zm(t);
  return Wm(e.runSync(e.parse(n), n), t);
}
function Vm(t) {
  const e = t.rehypePlugins || go, n = t.remarkPlugins || go, r = t.remarkRehypeOptions ? { ...t.remarkRehypeOptions, ...mo } : mo;
  return Fm().use(T1).use(n).use(xm, r).use(e);
}
function Zm(t) {
  const e = t.children || "", n = new Ul();
  return typeof e == "string" ? n.value = e : qi(
    "Unexpected value `" + e + "` for `children` prop, expected `string`"
  ), n;
}
function Wm(t, e) {
  const n = e.allowedElements, r = e.allowElement, i = e.components, a = e.disallowedElements, s = e.skipHtml, o = e.unwrapDisallowed, l = e.urlTransform || Gm;
  for (const c of jm)
    Object.hasOwn(e, c.from) && qi(
      "Unexpected `" + c.from + "` prop, " + (c.to ? "use `" + c.to + "` instead" : "remove it") + " (see <" + $m + "#" + c.id + "> for more info)"
    );
  return n && a && qi(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), Fl(t, u), ef(t, {
    Fragment: Kt,
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
function Gm(t) {
  const e = t.indexOf(":"), n = t.indexOf("?"), r = t.indexOf("#"), i = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && e > i || n !== -1 && e > n || r !== -1 && e > r || // It is a protocol, it should be allowed.
    Bm.test(t.slice(0, e)) ? t : ""
  );
}
function qm(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Km(t, e, n) {
  const i = Ea({}.ignore || []), a = Ym(e);
  let s = -1;
  for (; ++s < a.length; )
    Dl(t, "text", o);
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
    let S = !1, v = [];
    f.lastIndex = 0;
    let R = f.exec(u.value);
    for (; R; ) {
      const D = R.index, M = {
        index: R.index,
        input: R.input,
        stack: [...c, u]
      };
      let b = h(...R, M);
      if (typeof b == "string" && (b = b.length > 0 ? { type: "text", value: b } : void 0), b === !1 ? f.lastIndex = D + 1 : (w !== D && v.push({
        type: "text",
        value: u.value.slice(w, D)
      }), Array.isArray(b) ? v.push(...b) : b && v.push(b), w = D + R[0].length, S = !0), !f.global)
        break;
      R = f.exec(u.value);
    }
    return S ? (w < u.value.length && v.push({ type: "text", value: u.value.slice(w) }), d.children.splice(I, 1, ...v)) : v = [u], I + v.length;
  }
}
function Ym(t) {
  const e = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !t[0] || Array.isArray(t[0]) ? t : [t];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    e.push([Xm(i[0]), Jm(i[1])]);
  }
  return e;
}
function Xm(t) {
  return typeof t == "string" ? new RegExp(qm(t), "g") : t;
}
function Jm(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
function Qm(t) {
  Km(t, [/\r?\n|\r/g, e0]);
}
function e0() {
  return { type: "break" };
}
function wo() {
  return function(t) {
    Qm(t);
  };
}
function t0({ children: t, isStreaming: e }) {
  const [n, r] = Ee(!0), [i, a] = Ee(!1), [s, o] = Ee("");
  zt.useEffect(() => {
    !e && !i ? (a(!0), r(!1)) : e && (a(!1), r(!0));
  }, [e, i]);
  const l = () => {
    e || r(!n);
  }, u = zt.Children.map(t, (c) => {
    if (zt.isValidElement(c)) {
      if (c.type === Hl) {
        const d = c.props;
        return d.title && d.title !== s && o(d.title), zt.cloneElement(
          c,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      }
      if (c.type === $l)
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
function Hl({
  title: t,
  status: e = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const { t: a } = pn(), s = () => /* @__PURE__ */ O(
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
function $l({
  children: t,
  isVisible: e = !0,
  title: n = ""
}) {
  return !e || !(n.toLowerCase().includes("thinking") || n.toLowerCase().includes("thought")) ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: t }) });
}
function n0({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: t });
}
function r0({
  title: t,
  status: e = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var u, c;
  const { t: a } = pn(), s = () => {
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
const Bl = Jr(
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
      return /* @__PURE__ */ p(jl, { name: e, variant: r === "complete" ? "rehydrated" : "live" });
    const l = o.component;
    return /* @__PURE__ */ p(
      "div",
      {
        className: "chat-wrapper__generative-component",
        "data-component-name": e,
        "data-streaming": r === "streaming" ? "true" : void 0,
        "data-source": a,
        children: /* @__PURE__ */ p(
          yu,
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
Bl.displayName = "GenerativeComponentRenderer";
const jl = Jr(
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
jl.displayName = "UnknownComponentFallback";
const i0 = ({ message: t }) => {
  const [e, n] = Ee(!0);
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
function Vl({
  imageUrl: t,
  isOpen: e,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = ue((s) => {
    s.key === "Escape" && (s.stopImmediatePropagation(), n());
  }, [n]), a = ue((s) => {
    s.target === s.currentTarget && n();
  }, [n]);
  return Me(() => {
    const s = document.querySelector(".chat-wrapper__messages"), o = (l) => l.preventDefault();
    return e ? (document.addEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "hidden", s && (s.style.overflowY = "hidden", s.addEventListener("wheel", o, { passive: !1 }))) : (document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o))), () => {
      document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o));
    };
  }, [e, i]), !e || !t ? null : ec(
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
const Zl = ({ className: t }) => /* @__PURE__ */ O(
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
), Wl = ({ onImageClick: t, className: e, style: n, title: r, ...i }) => {
  const [a, s] = Ee(!1), o = pe(null);
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
}, a0 = (t) => {
  let e = t.replace(
    new RegExp("(?<!\\]\\()(?<!!.*\\]\\()https:\\/\\/ucarecdn\\.com\\/[^\\s)>]+", "g"),
    (n) => `![image](${n})`
  );
  return e = e.replace(
    new RegExp("(?<!\\]\\()(?<!!\\[.*\\]\\()(?<!\\()(https?:\\/\\/[^\\s)>]+)", "g"),
    (n) => `[${n}](${n})`
  ), e;
}, s0 = (t) => ({
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
    Wl,
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
}), Gl = Jr(
  ({ message: t, isLatestUiComponent: e = !1 }) => {
    var me;
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
    } = jn(), { t: f } = pn(), [h, w] = Ee(!1), [k, I] = Ee(!1), [S, v] = Ee(null), R = ue(async () => {
      try {
        await navigator.clipboard.writeText(t.content), w(!0), setTimeout(() => w(!1), 2e3);
      } catch (de) {
        console.error("Failed to copy message:", de);
      }
    }, [t.content]), D = ue(() => {
      d && d(t.id);
    }, [d, t.id]), M = ue((de) => {
      v(de);
    }, []), b = ue(() => {
      v(null);
    }, []), j = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__streaming-placeholder", children: /* @__PURE__ */ p(Zl, {}) }), V = () => d && /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: D,
        children: f("chat.errors.retry")
      }
    ), K = () => /* @__PURE__ */ O(Kt, { children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ p(
        "button",
        {
          className: `chat-wrapper__copy-button ${k ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: R,
          title: "Copy message",
          children: /* @__PURE__ */ p(tp, {})
        }
      ) }),
      h && /* @__PURE__ */ p("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), q = Be(() => s0(M), [M]), ce = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ O("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        yo,
        {
          components: q,
          remarkPlugins: [wo],
          children: a0(t.content)
        },
        `${t.id}-${t.isStreaming ? "streaming" : "final"}`
      ) }),
      K()
    ] }) }), G = () => /* @__PURE__ */ O("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        yo,
        {
          remarkPlugins: [wo],
          components: q,
          children: t.content
        },
        `${t.id}-user`
      ) }),
      t.media && t.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media", children: t.media.map((de, C) => /* @__PURE__ */ p(
        Wl,
        {
          src: de,
          alt: `Uploaded content ${C + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onImageClick: () => M(de),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: (F) => {
            F.currentTarget.style.transform = "scale(1.02)", F.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: (F) => {
            F.currentTarget.style.transform = "scale(1)", F.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        C
      )) })
    ] }), N = () => t.role === "assistant" && t.isStreaming && t.content === "" && t.id === c.current ? j() : t.role === "system" ? /* @__PURE__ */ p(i0, { message: t }) : t.role === "assistant" ? ce() : G(), L = () => /* @__PURE__ */ O(t0, { isStreaming: t.isStreaming || !1, children: [
      /* @__PURE__ */ p(
        Hl,
        {
          title: n(t.content, t.isStreaming),
          status: r(t.content, t.isStreaming),
          duration: i(t.content)
        }
      ),
      /* @__PURE__ */ p($l, { children: a(t.content) })
    ] }), U = () => {
      var de;
      return /* @__PURE__ */ p(n0, { isStreaming: t.isStreaming || !1, children: /* @__PURE__ */ p(
        r0,
        {
          title: s(t.content, t.isStreaming),
          status: o(t.content, t.isStreaming),
          toolData: t.toolData,
          toolName: (de = t.toolData) == null ? void 0 : de.toolName,
          clientTools: l
        }
      ) });
    }, ie = () => t.uiComponent ? /* @__PURE__ */ p(
      Bl,
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
    return t.role === "assistant" && !t.isStreaming && (t.content ?? "").trim() === "" && (((me = t.uiComponents) == null ? void 0 : me.length) ?? 0) > 0 ? null : /* @__PURE__ */ O(Kt, { children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${t.role === "system" ? "assistant" : t.role === "reasoning" ? "reasoning" : t.role === "tooling" ? "tooling" : t.role === "ui-component" ? "ui-component" : t.role}`,
          onMouseEnter: () => t.role === "assistant" && I(!0),
          onMouseLeave: () => t.role === "assistant" && I(!1),
          children: t.role === "reasoning" ? L() : t.role === "tooling" ? U() : t.role === "ui-component" ? ie() : /* @__PURE__ */ O(Kt, { children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: N() }),
            t.role === "user" && t.hasError && !t.isRetrying && V()
          ] })
        }
      ),
      /* @__PURE__ */ p(
        Vl,
        {
          imageUrl: S,
          isOpen: !!S,
          onClose: b,
          alt: "Message image"
        }
      )
    ] });
  }
);
Gl.displayName = "MessageItem";
const o0 = ({ isVisible: t }) => t ? /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ p(Zl, {}) }) }) }) : null, ql = Cr((t, e) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = jn(), a = Be(() => {
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
        Gl,
        {
          message: s,
          isLatestUiComponent: !!((o = s.uiComponent) != null && o.callId) && s.uiComponent.callId === a
        },
        s.id
      );
    }),
    /* @__PURE__ */ p(o0, { isVisible: r && !i }),
    /* @__PURE__ */ p("div", { ref: e })
  ] });
});
ql.displayName = "MessagesList";
const Ut = (...t) => t.filter(Boolean).join(" "), l0 = () => /* @__PURE__ */ O(
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
), c0 = () => /* @__PURE__ */ O(
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
), u0 = ({ className: t, ...e }) => /* @__PURE__ */ p("form", { className: Ut("chat-wrapper__prompt-input", t), ...e }), Kl = Cr(
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
        className: Ut("chat-wrapper__prompt-textarea", e),
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
Kl.displayName = "PromptInputTextarea";
const d0 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: Ut("chat-wrapper__prompt-toolbar", t), ...e }), h0 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: Ut("chat-wrapper__prompt-tools", t), ...e }), p0 = ({
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
      className: Ut(
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
}, f0 = ({
  className: t,
  variant: e = "default",
  size: n = "icon",
  status: r = ze.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  const o = Mi(r);
  let l = o ? /* @__PURE__ */ p(c0, {}) : /* @__PURE__ */ p(l0, {});
  return /* @__PURE__ */ p(
    "button",
    {
      className: Ut(
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
}, $0 = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p("select", { className: Ut("chat-wrapper__prompt-select", t), ...n, children: e }), B0 = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: Ut("chat-wrapper__prompt-select-trigger", t),
    type: "button",
    ...n,
    children: e
  }
), j0 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p(
  "div",
  {
    className: Ut("chat-wrapper__prompt-select-content", t),
    ...e
  }
), V0 = ({
  className: t,
  value: e,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: Ut("chat-wrapper__prompt-select-item", t),
    "data-value": e,
    ...n
  }
), Z0 = ({
  className: t,
  placeholder: e,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: Ut("chat-wrapper__prompt-select-value", t),
    ...n,
    children: e
  }
), g0 = ({
  placeholderTexts: t,
  shouldAnimate: e,
  className: n = ""
}) => {
  const [r, i] = Ee(0), [a, s] = Ee(!1), [o, l] = Ee(0);
  return Me(() => {
    if (!e || t.length <= 1) return;
    const u = setInterval(() => {
      s(!0), setTimeout(() => {
        i((c) => (c + 1) % t.length), l((c) => c + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(u);
  }, [e, t.length]), Me(() => {
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
}, m0 = Cr((t, e) => {
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
  } = jn(), { t: w } = pn(), k = r || i, I = c.length > 0, [S, v] = Ee(""), [R, D] = Ee([]), [M, b] = Ee([]), [j, V] = Ee(null), [K, q] = Ee(null), [ce, G] = Ee(!1), N = pe(null), L = ue(($) => {
    q($), G(!0);
  }, []), U = ue(($) => new Promise((y, J) => {
    const z = new FileReader();
    z.onload = () => y(z.result), z.onerror = J, z.readAsDataURL($);
  }), []), ie = n && n.length > 0 ? n : [w("chat.input.placeholder")], Y = S.length === 0 && !I && ie.length > 1;
  xo(
    e,
    () => ({
      focus: () => {
        var $;
        ($ = N.current) == null || $.focus();
      },
      setText: ($) => {
        v($), setTimeout(() => {
          if (N.current) {
            N.current.focus();
            const y = $.length;
            N.current.setSelectionRange(y, y);
          }
        }, 0);
      },
      textareaRef: N
    }),
    []
  );
  const me = ue(
    ($) => {
      $.preventDefault();
      const J = new FormData($.currentTarget).get("message");
      if (J != null && J.trim()) {
        const z = da(J.trim(), !1);
        if (!z.trim())
          return;
        d(z, R), v(""), D([]);
      }
    },
    [d, R]
  ), de = ue(
    ($) => {
      const J = $.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      v(J), j && J.trim() && V(null);
    },
    [j]
  ), C = ue(
    async ($) => {
      var z;
      const J = Array.from(((z = $.clipboardData) == null ? void 0 : z.items) || []).filter((oe) => oe.type.startsWith("image/"));
      if (J.length > 0) {
        $.preventDefault(), V(null);
        try {
          const oe = await Promise.all(
            J.map((ye) => {
              const te = ye.getAsFile();
              return te ? new File(
                [te],
                `clipboard-image-${Date.now()}.${te.type.split("/")[1]}`,
                {
                  type: te.type
                }
              ) : null;
            })
          ).then((ye) => ye.filter(Boolean));
          if (oe.length > 0) {
            const ye = oe.filter((te) => {
              const Le = (o == null ? void 0 : o.maxFileSize) ?? 15728640;
              return te.size > Le ? (V(
                w("chat.fileUpload.sizeLimitExceeded", {
                  maxSize: Math.round(Le / 1048576)
                })
              ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ]).includes(te.type) ? !0 : (V(w("chat.fileUpload.typeNotAllowed")), !1);
            });
            if (ye.length > 0) {
              const te = (o == null ? void 0 : o.maxFiles) ?? 5;
              if (R.length + M.length + ye.length > te) {
                V(
                  w("chat.fileUpload.maxFilesExceeded", { maxFiles: te })
                );
                return;
              }
              const ke = ye.map(async (xe) => ({
                file: xe,
                preview: await U(xe),
                isUploading: !0,
                progress: 0
              })), Se = await Promise.all(ke);
              b((xe) => [...xe, ...Se]);
              try {
                const xe = await f(ye);
                b(
                  (Fe) => Fe.filter((je) => !ye.includes(je.file))
                ), D((Fe) => [...Fe, ...xe]), V(null);
              } catch {
                b(
                  (Fe) => Fe.filter((je) => !ye.includes(je.file))
                ), V(w("chat.errors.connection"));
              }
            }
          }
        } catch (oe) {
          V(
            oe instanceof Error ? oe.message : w("chat.errors.unexpected")
          ), b([]);
        }
      }
    },
    [
      f,
      o,
      R,
      M,
      U,
      w
    ]
  ), F = ue(async () => {
    const $ = document.createElement("input");
    $.type = "file", $.accept = "image/*", $.multiple = !0, $.onchange = async (y) => {
      const J = y.target.files;
      if (J)
        try {
          V(null);
          const z = Array.from(J).filter((oe) => {
            const ye = _d(oe.name);
            oe.name;
            const te = (o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024;
            return oe.size > te ? (V(
              w("chat.fileUpload.sizeLimitExceeded", {
                maxSize: Math.round(te / (1024 * 1024))
              })
            ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]).includes(oe.type) ? !0 : (V(w("chat.fileUpload.typeNotAllowed")), !1);
          });
          if (z.length > 0) {
            const oe = (o == null ? void 0 : o.maxFiles) ?? 5;
            if (R.length + M.length + z.length > oe) {
              V(
                w("chat.fileUpload.maxFilesExceeded", { maxFiles: oe })
              );
              return;
            }
            const te = z.map(async (ke) => ({
              file: ke,
              preview: await U(ke),
              isUploading: !0,
              progress: 0
            })), Le = await Promise.all(te);
            b((ke) => [...ke, ...Le]);
            try {
              const ke = await f(z);
              b(
                (Se) => Se.filter((xe) => !z.includes(xe.file))
              ), D((Se) => [...Se, ...ke]), V(null);
            } catch {
              b(
                (Se) => Se.filter((xe) => !z.includes(xe.file))
              ), V(w("chat.errors.connection"));
            }
          }
        } catch (z) {
          V(
            z instanceof Error ? z.message : w("chat.errors.unexpected")
          ), b([]);
        }
    }, $.click();
  }, [
    f,
    o,
    R,
    M,
    U,
    w
  ]);
  return /* @__PURE__ */ O(
    u0,
    {
      onSubmit: me,
      className: `${k ? "chat-wrapper__prompt-input--disabled" : ""} ${R.length > 0 || M.length > 0 || j ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ p(
          Kl,
          {
            ref: N,
            name: "message",
            value: S,
            onChange: de,
            onPaste: C,
            placeholder: "",
            disabled: k
          }
        ),
        !S.trim() && /* @__PURE__ */ p(
          g0,
          {
            placeholderTexts: ie,
            shouldAnimate: Y
          }
        ),
        j && /* @__PURE__ */ O("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-message", children: j }),
          /* @__PURE__ */ p(
            "button",
            {
              className: "chat-wrapper__upload-error-dismiss",
              onClick: () => V(null),
              title: "Dismiss",
              children: "×"
            }
          )
        ] }),
        (R.length > 0 || M.length > 0) && /* @__PURE__ */ O("div", { className: "chat-wrapper__media-preview-container", children: [
          M.map(($, y) => /* @__PURE__ */ O(
            "div",
            {
              className: "chat-wrapper__media-item-wrapper",
              children: [
                /* @__PURE__ */ O("div", { className: "chat-wrapper__uploading-thumbnail", children: [
                  /* @__PURE__ */ p(
                    "img",
                    {
                      src: $.preview,
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
                        (J) => J.filter((z, oe) => oe !== y)
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
          R.map(($, y) => {
            const J = $.startsWith("data:image/"), z = $.startsWith("http://") || $.startsWith("https://"), oe = J || z;
            return /* @__PURE__ */ O(
              "div",
              {
                className: "chat-wrapper__media-item-wrapper",
                children: [
                  oe ? /* @__PURE__ */ O(
                    "div",
                    {
                      className: "chat-wrapper__media-thumbnail",
                      onClick: () => L($),
                      title: "Click to view full image",
                      children: [
                        /* @__PURE__ */ p(
                          "img",
                          {
                            src: $,
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
                        const ye = $.match(/name=([^;]+)/);
                        return ye ? decodeURIComponent(ye[1]) : "document.pdf";
                      })() }),
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-type", children: (() => {
                        const ye = $.match(/data:([^;]+)/);
                        if (ye) {
                          const te = ye[1];
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
                              const Le = te.split("/")[1];
                              return Le ? Le.toUpperCase().substring(0, 4) : "FILE";
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
                        D(
                          (ye) => ye.filter((te, Le) => Le !== y)
                        ), j && V(null);
                      },
                      className: `chat-wrapper__media-remove-button ${oe ? "" : "chat-wrapper__media-remove-button--file"}`,
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
        /* @__PURE__ */ O(d0, { children: [
          /* @__PURE__ */ O(h0, { children: [
            s && /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-container", children: /* @__PURE__ */ p(
              p0,
              {
                variant: "ghost",
                size: "icon",
                onClick: F,
                title: M.length > 0 ? `Uploading ${M.length} file(s)...` : R.length > 0 ? `${R.length}/${(o == null ? void 0 : o.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(o == null ? void 0 : o.maxFiles) ?? 5} files, ${Math.round(
                  ((o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024)
                )}MB each)`,
                disabled: k || M.length > 0,
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
            f0,
            {
              status: a,
              disabled: Mi(a) ? !1 : !S.trim() || k || M.length > 0,
              onClick: Mi(a) && h ? () => {
                h();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ p(
          Vl,
          {
            imageUrl: K,
            isOpen: ce,
            onClose: () => {
              G(!1), q(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), y0 = () => {
  const { suggestedPrompts: t, chatInputRef: e, enableSuggestedPromptsAnimation: n = !0 } = jn(), r = pe(!1), i = pe(null), a = pe(null);
  if (Me(() => () => {
    i.current && cancelAnimationFrame(i.current), a.current && clearTimeout(a.current);
  }, []), !t || t.length === 0)
    return null;
  const s = ue((h) => {
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
      let S = 1;
      const v = 10, R = () => {
        if (k || !e.current) {
          r.current = !1, a.current = null;
          return;
        }
        if (S < h.description.length) {
          const D = h.description.substring(0, S + 1);
          w.value = D;
          const M = new Event("input", { bubbles: !0 });
          w.dispatchEvent(M), S++, a.current = setTimeout(R, v);
        } else
          r.current = !1, a.current = null, e.current && e.current.setText(h.description);
      };
      R();
    }, 10), () => {
      k = !0, a.current && (clearTimeout(a.current), a.current = null), r.current = !1;
    };
  }, [e, n]), o = pe(null), l = pe({ isDown: !1, startX: 0, scrollLeft: 0, hasDragged: !1 }), u = ue((h) => {
    const w = o.current;
    w && (l.current = { isDown: !0, startX: h.pageX - w.offsetLeft, scrollLeft: w.scrollLeft, hasDragged: !1 }, w.style.cursor = "grabbing", w.style.userSelect = "none");
  }, []), c = ue((h) => {
    const w = o.current;
    if (!w || !l.current.isDown) return;
    const I = h.pageX - w.offsetLeft - l.current.startX;
    Math.abs(I) > 4 && (l.current.hasDragged = !0), w.scrollLeft = l.current.scrollLeft - I;
  }, []), d = ue(() => {
    const h = o.current;
    h && (l.current.isDown = !1, h.style.cursor = "grab", h.style.userSelect = "");
  }, []), f = ue((h) => {
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
function w0({ size: t = 16, variant: e = "dots" }) {
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
const C0 = ({
  size: t = 20,
  fullHeight: e = !1
}) => /* @__PURE__ */ p(
  "div",
  {
    className: `chat-wrapper__inline-loader ${e ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ p("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ p(w0, { size: t, variant: "dots" }) })
  }
), x0 = () => /* @__PURE__ */ O("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ O("g", { clipPath: "url(#clip0_1219_24100)", children: [
    /* @__PURE__ */ p("path", { d: "M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z", fill: "#637381" })
  ] }),
  /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", { id: "clip0_1219_24100", children: /* @__PURE__ */ p("rect", { width: "24", height: "24", fill: "white" }) }) })
] }), Co = ({
  headerName: t,
  headerDescription: e,
  showIcon: n = !1
}) => /* @__PURE__ */ O("div", { className: "chat-wrapper__main-header", children: [
  n && /* @__PURE__ */ p("div", { className: "chat-wrapper__main-header-icon", children: /* @__PURE__ */ p(x0, {}) }),
  /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t }),
  e && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: e })
] }), k0 = () => /* @__PURE__ */ O("div", { className: "chat-wrapper__skeleton", children: [
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
] }), _0 = ({
  errorType: t = "unknown",
  errorMessage: e,
  retryCount: n = 0,
  onRetry: r,
  footer: i
}) => {
  const { t: a } = pn(), s = () => {
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
}, S0 = () => {
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
  } = jn(), k = e || t.length === 0 && (f || d === et.CONNECTING), I = t.length === 0 && !e && d === et.DISCONNECTED && !f;
  if (k || I)
    return /* @__PURE__ */ O("div", { style: { position: "relative", height: "100%" }, children: [
      /* @__PURE__ */ p(k0, {}),
      I && /* @__PURE__ */ p(
        _0,
        {
          errorType: c ? "network" : "server",
          errorMessage: h || void 0,
          onRetry: w,
          footer: o
        }
      )
    ] });
  const S = Wt.state.shouldShowMainHeader(
    t.length,
    n,
    e
  ), v = Wt.state.shouldShowSuggestedPrompts(
    t.length,
    n,
    e,
    a,
    s
  ), R = Wt.state.getContentAreaClass(
    t.length,
    n,
    e,
    v
  ), D = R.includes("compact");
  return /* @__PURE__ */ O("div", { className: `chat-wrapper__scroll-container${v ? " chat-wrapper__scroll-container--scrollable" : ""}`, children: [
    S && !D && /* @__PURE__ */ p("div", { style: c ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ p(
      Co,
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
          S && D && /* @__PURE__ */ p("div", { style: {
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: c ? "48px" : void 0
          }, children: /* @__PURE__ */ p(
            Co,
            {
              headerName: r,
              headerDescription: i,
              showIcon: !0
            }
          ) }),
          !D && (e && t.length === 0 ? /* @__PURE__ */ p("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ p(C0, { fullHeight: !0 }) }) : /* @__PURE__ */ p(ql, { ref: l })),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(m0, { ref: u }) })
        ]
      }
    ),
    v && /* @__PURE__ */ p(y0, {}),
    v && o && /* @__PURE__ */ p("div", { children: o })
  ] });
};
function b0({
  isVisible: t,
  isReconnecting: e = !1
}) {
  const { t: n } = pn();
  return t ? /* @__PURE__ */ p("div", { className: "network-status-banner", children: /* @__PURE__ */ p("div", { className: "network-status-banner__content", children: e ? /* @__PURE__ */ O(Kt, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ p("span", { children: n("chat.connection.reconnecting") })
  ] }) : /* @__PURE__ */ O(Kt, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ p("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ p("span", { className: "network-status-banner__message", children: n("chat.errors.connection") })
  ] }) }) }) : null;
}
const Yl = Cr(
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
    var It, Jn;
    const { token: c, entityId: d, entityType: f } = t;
    Wt.validation.validateAuthProps({
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n
    });
    const h = Be(() => Wt.url.convertWebSocketToHttp(e), [e]), w = Be(
      () => {
        var A, Re;
        return new Zh({
          apiUrl: h,
          userMpAuthToken: c,
          chatServerKey: n,
          maxFileSize: (A = a.fileUploadConfig) == null ? void 0 : A.maxFileSize,
          allowedTypes: (Re = a.fileUploadConfig) == null ? void 0 : Re.allowedTypes
        });
      },
      [h, c, n, a.fileUploadConfig]
    ), k = Be(
      () => Lu(s),
      [s]
    ), I = Be(() => k.length > 0 ? k.map(({ execute: A, ...Re }) => Re) : [], [k]), S = Be(
      () => Ou(o),
      [o]
    ), v = Be(
      () => new gu(S),
      [S]
    ), R = Be(
      () => v.getSchemas().slice(0, 0),
      [v]
    ), D = Hh(), { isOnline: M, wasOffline: b } = Vh(), j = pe(!0), V = fe((A) => A.isModalOpen), K = fe((A) => A.isCollapsed), q = fe((A) => A.currentMode), ce = fe((A) => A.openModal), G = fe((A) => A.closeModal), N = fe((A) => A.toggleCollapse), L = fe((A) => A.toggleFullscreen), U = fe((A) => A.setCurrentMode), ie = fe((A) => A.chatStatus), Y = fe((A) => A.setChatStatus), me = fe((A) => A.streamingStatus), de = fe((A) => A.setStreamingStatus), C = fe(
      (A) => A.isLoadingConversation
    ), F = fe(
      (A) => A.setIsLoadingConversation
    ), $ = fe((A) => A.conversationError), y = fe(
      (A) => A.setConversationError
    ), J = fe((A) => A.setCurrentThreadId), z = fe((A) => A.providerResId), oe = fe((A) => A.setProviderResId), ye = fe((A) => A.isStreaming), te = fe((A) => A.setIsStreaming), Le = fe((A) => A.isThinking), ke = fe((A) => A.setIsThinking), Se = fe((A) => A.streamingContent), xe = fe(
      (A) => A.setStreamingContent
    ), Fe = fe((A) => A.isHandlingTool), je = fe((A) => A.setIsHandlingTool);
    Me(() => {
      a.mode && U(a.mode);
    }, [a.mode, U]), Me(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const A = (Re) => {
        Re.key === "Escape" && q === "modal" && V && G();
      };
      if (q === "modal" && V)
        return document.addEventListener("keydown", A), () => document.removeEventListener("keydown", A);
    }, [q, V, G]);
    const {
      messages: $e,
      setMessages: Ve,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: _t,
      getReasoningStatus: gt,
      getReasoningDuration: Ht,
      getReasoningContentOnly: $t,
      getReasoningTitle: gn,
      getToolingTitle: mn,
      getToolingStatus: En,
      handleSetMessage: yn,
      handleReasoningUpdate: Jt,
      handleChatFinished: T,
      handleChatError: E,
      stopGeneration: Q,
      clearResponseError: we
    } = D, Te = pe(null), Ze = pe(null), mt = pe(!1), st = pe(null), Rt = ue(
      (A) => {
        A.status !== "streaming" && (we(), Ve((Re) => {
          const Ke = Re.findIndex(
            (W) => {
              var x;
              return ((x = W.uiComponent) == null ? void 0 : x.callId) === A.callId;
            }
          ), Ye = {
            id: Ke >= 0 ? Re[Ke].id : A.callId,
            role: "ui-component",
            content: "",
            timestamp: Ke >= 0 ? Re[Ke].timestamp : /* @__PURE__ */ new Date(),
            uiComponent: {
              name: A.componentName,
              props: A.props,
              callId: A.callId,
              status: A.status
            }
          };
          if (Ke >= 0) {
            const W = [...Re];
            return W[Ke] = Ye, W;
          }
          return [...Re, Ye];
        }));
      },
      [Ve, we]
    ), rt = ue(
      (A) => {
        oe(A.providerResId), J(A.threadId);
      },
      [oe, J]
    ), Ge = ue(
      (A) => {
        var Re, Ke;
        switch (A.type) {
          case Nt.CHAT_COMPLETED:
            (Re = A.data) != null && Re.conversationId && oe(A.data.conversationId), T(), Y(ze.IDLE), de(vt.IDLE), setTimeout(() => {
              var Ye;
              (Ye = Ze.current) == null || Ye.focus();
            }, 0);
            break;
          case Nt.CHAT_ERROR:
            (Ke = A.data) != null && Ke.error && E(A.data.error);
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
        T,
        E,
        oe,
        J
      ]
    ), {
      chatClient: Pe,
      connectionState: Xe,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection: _r,
      connectChatClient: Lt
    } = Ju({
      // Authentication and server properties
      userMpAuthToken: c,
      chatServerUrl: e,
      chatServerKey: n,
      // Entity configuration
      entityId: d,
      entityType: f,
      // Tools configuration (consumer tools + library built-ins like
      // `ask_user_question`, merged in a stable order so the WS connection
      // hook doesn't see spurious tool-set changes).
      tools: k,
      // Generative-UI components
      componentSchemas: R,
      // Other properties
      contextHelpers: l,
      onSetMessage: yn,
      onSystemEvent: Ge,
      onReasoningUpdate: Jt,
      onUIComponent: Rt,
      onThreadCreated: rt,
      onMessagesPersisted: a.onMessagesPersisted,
      onError: a.onError
    });
    Me(() => {
      st.current = Pe;
    }, [Pe]), jh({
      metadata: r,
      chatClient: Pe,
      currentProviderResId: z,
      isLoadingConversation: C,
      messages: $e,
      entityId: d,
      entityType: f
    }), Me(() => {
      b && M && j.current ? Lt().catch((A) => {
        const Re = $n(
          A,
          "NetworkReconnection"
        );
        j.current = Re.isRetryable, Re.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${Re.reason}`
        );
      }) : b && M && !j.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [M, b, Lt]);
    const wn = ue(() => {
      Q(), Y(ze.IDLE), de(vt.IDLE), Pe && z && Pe.stopRun(z);
    }, [
      Q,
      Y,
      de,
      Pe,
      z
    ]);
    xo(
      u,
      () => ({
        updateMetadata: (A) => {
          Pe && z && Pe.updateMetadata(z, A).catch((Re) => {
          });
        }
      }),
      [Pe, z]
    );
    const Wn = Be(
      () => Pe ? new Wh(Pe, {
        onError: a.onError
      }) : null,
      [Pe, a.onError]
    ), {
      resetConversationLoader: Cn
      /*, reloadConversation*/
    } = Bh({
      entityId: d,
      entityType: f,
      httpApiUrl: h,
      userMpAuthToken: c,
      chatServerKey: n,
      messages: $e,
      setMessages: Ve,
      setIsLoadingConversation: F,
      setConversationError: y,
      setCurrentThreadId: J,
      setProviderResId: oe,
      metadata: r,
      isConnected: Xe === et.CONNECTED,
      // Only load after connection established
      onConversationInitialized: a.onConversationInitialized ? () => {
        var A;
        mt.current = !0, (A = a.onConversationInitialized) == null || A.call(a);
      } : void 0
    }), an = pe(null), Rn = ue(() => {
      an.current && cancelAnimationFrame(an.current), an.current = requestAnimationFrame(() => {
        var A;
        (A = Te.current) == null || A.scrollIntoView({ behavior: "smooth" }), an.current = null;
      });
    }, []);
    Me(() => {
      Rn();
    }, [$e, Rn]), Me(() => {
      Se && Rn();
    }, [Se, Rn]), Me(() => {
      a.onStreamingStatusChange && a.onStreamingStatusChange(me);
    }, [me, a]), Me(() => () => {
      an.current && cancelAnimationFrame(an.current);
    }, []), Me(() => () => {
      Ve([]), te(!1), ke(!1), xe(""), je(!1), Y(ze.IDLE), de(vt.IDLE), F(!1), y(null), J(null), oe(null);
    }, [
      Ve,
      te,
      ke,
      xe,
      je,
      Y,
      de,
      F,
      y,
      J,
      oe
    ]);
    const qe = ue(
      async (A, Re) => {
        if (!A.trim() || ye || !Wn || !Pe)
          return;
        te(!0), ke(!0), Y(ze.SUBMITTED), de(vt.STARTING);
        const Ke = Wn.createUserMessage(
          A,
          Re
        );
        if (Ve((W) => [...W, Ke]), a.onConversationInitialized && !mt.current && (mt.current = !0, a.onConversationInitialized()), !navigator.onLine) {
          ke(!1), Y(ze.ERROR), Ve(
            (W) => W.map(
              (x) => x.id === Ke.id ? {
                ...x,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : x
            )
          ), te(!1), Y(ze.IDLE), de(vt.IDLE);
          return;
        }
        try {
          const W = new Promise((P, ne) => {
            setTimeout(() => ne(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            Pe.onTriggerMessage({
              message: Ke.content,
              media: Re,
              providerResId: z || void 0,
              mcpHeaders: i
            }),
            W
          ]), Y(ze.STREAMING);
          const x = setTimeout(() => {
            ke(!1), Y(ze.ERROR), Ve(
              (P) => P.map(
                (ne) => ne.id === Ke.id ? {
                  ...ne,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : ne
              )
            ), te(!1), Y(ze.IDLE), de(vt.IDLE);
          }, 12e4);
          window.responseTimeoutId = x;
        } catch (W) {
          ke(!1), Y(ze.ERROR), Ve(
            (x) => x.map(
              (P) => P.id === Ke.id ? {
                ...P,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: Xe !== et.CONNECTED ? "Connection lost. Message not sent." : W instanceof Error ? W.message : "Failed to send message. Please try again."
              } : P
            )
          ), te(!1), Y(ze.IDLE), de(vt.IDLE);
        }
      },
      [
        Wn,
        Pe,
        ye,
        Xe,
        Ve,
        te,
        ke,
        Y,
        de,
        z
      ]
    ), Qt = ue(
      async (A) => await w.uploadFiles(A),
      [w]
    ), ii = Be(
      () => Wt.css.getContainerClasses(
        q,
        a.position,
        a.theme,
        K,
        a.constrainedHeight
      ),
      [
        q,
        a.position,
        a.theme,
        K,
        a.constrainedHeight
      ]
    ), Sr = ue(() => {
      q === "modal" ? ce() : N();
    }, [q, ce, N]), In = ue(
      (A) => {
        Ze.current && Ze.current.setText(A.description);
      },
      []
    ), Gn = Be(
      () => ({
        messages: $e,
        isStreaming: ye,
        isThinking: Le,
        isHandlingTool: Fe
      }),
      [$e, ye, Le, Fe]
    ), qn = Be(
      () => ({
        isLoadingConversation: C,
        chatStatus: ie,
        conversationError: $,
        isOffline: !M,
        connectionState: Xe,
        isInitialConnection: _r
      }),
      [
        C,
        ie,
        $,
        M,
        Xe,
        _r
      ]
    ), br = Be(
      () => {
        var A, Re, Ke, Ye;
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
          clientTools: I,
          generativeRegistry: v,
          fileUploadEnabled: (A = a.features) == null ? void 0 : A.fileUpload,
          fileUploadConfig: {
            maxFiles: ((Re = a.fileUploadConfig) == null ? void 0 : Re.maxFiles) ?? 5,
            maxFileSize: ((Ke = a.fileUploadConfig) == null ? void 0 : Ke.maxFileSize) ?? 15 * 1024 * 1024,
            // 15MB default
            allowedTypes: ((Ye = a.fileUploadConfig) == null ? void 0 : Ye.allowedTypes) ?? [
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
        (It = a.features) == null ? void 0 : It.fileUpload,
        a.fileUploadConfig,
        I,
        v
      ]
    ), St = Be(
      () => ({
        getReasoningTitle: gn,
        getReasoningStatus: gt,
        getReasoningDuration: Ht,
        getReasoningContentOnly: $t,
        getToolingTitle: mn,
        getToolingStatus: En
      }),
      [
        gn,
        gt,
        Ht,
        $t,
        mn,
        En
      ]
    ), Bt = ue(
      async (A) => {
        const Re = $e.find((Ye) => Ye.id === A);
        if (!Re)
          return;
        if (te(!0), ke(!0), Y(ze.SUBMITTED), de(vt.STARTING), Ve((Ye) => Ye.map(
          (W) => W.id === A ? {
            ...W,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : W
        )), !navigator.onLine) {
          ke(!1), te(!1), Y(ze.ERROR), Ve(
            (Ye) => Ye.map(
              (W) => W.id === A ? {
                ...W,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : W
            )
          ), Y(ze.IDLE), de(vt.IDLE);
          return;
        }
        try {
          Xe !== et.CONNECTED && await Lt(), await (Pe == null ? void 0 : Pe.onTriggerMessage({
            message: Re.content,
            media: Re.media,
            providerResId: z || void 0,
            mcpHeaders: i
          })), Y(ze.STREAMING);
          const Ye = setTimeout(() => {
            ke(!1), Y(ze.ERROR), Ve(
              (W) => W.map(
                (x) => x.id === A ? {
                  ...x,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : x
              )
            ), te(!1), Y(ze.IDLE), de(vt.IDLE);
          }, 12e4);
          window.responseTimeoutId = Ye;
        } catch (Ye) {
          ke(!1), te(!1), Y(ze.ERROR), de(vt.IDLE), Ve(
            (W) => W.map(
              (x) => x.id === A ? {
                ...x,
                isRetrying: !1,
                hasError: !0,
                errorMessage: Ye instanceof Error ? Ye.message : "Retry failed. Please try again."
              } : x
            )
          ), Y(ze.IDLE);
        }
      },
      [
        $e,
        Ve,
        Cn,
        Lt,
        qe
      ]
    ), Kn = ue(async () => {
      try {
        await Lt();
      } catch (A) {
        console.error("Failed to reconnect:", A);
      }
    }, [Lt]), Yn = Be(
      () => ({
        onSubmit: qe,
        onFileUpload: Qt,
        onStopGeneration: wn,
        onPromptSelect: In,
        onRetryMessage: Bt,
        onRetryConnection: Kn
      }),
      [
        qe,
        Qt,
        wn,
        In,
        Bt,
        Kn
      ]
    ), Xn = Be(
      () => ({
        ...Gn,
        ...qn,
        ...br,
        ...St,
        ...Yn,
        currentAssistantMessageIdRef: _t,
        messagesEndRef: Te,
        chatInputRef: Ze
      }),
      [
        Gn,
        qn,
        br,
        St,
        Yn,
        _t,
        Te,
        Ze
      ]
    );
    return Be(
      () => Wt.state.shouldShowBubble(
        q,
        V,
        K
      ),
      [q, V, K]
    ) ? /* @__PURE__ */ p(bs, { children: /* @__PURE__ */ p(
      np,
      {
        mode: q,
        headerName: a.headerName,
        bubbleText: a.bubbleText,
        showBubbleText: ((Jn = a.features) == null ? void 0 : Jn.showBubbleText) !== !1,
        onClick: Sr
      }
    ) }) : /* @__PURE__ */ p(bs, { children: /* @__PURE__ */ p(
      Kh,
      {
        onError: (A) => {
          a.onError && a.onError(A);
        },
        children: /* @__PURE__ */ O("div", { className: ii, style: a.customStyles, children: [
          /* @__PURE__ */ p(
            b0,
            {
              isVisible: !M,
              isReconnecting: Xe === et.RECONNECTING
            }
          ),
          Wt.state.shouldShowHeader(a.headerVisible) && /* @__PURE__ */ p(
            rp,
            {
              headerName: a.headerName,
              mode: q,
              isCollapsed: K,
              isModalOpen: V,
              onClose: G,
              onToggleFullscreen: L,
              onToggleCollapse: N
            }
          ),
          !K && /* @__PURE__ */ p(
            Yh,
            {
              onError: (A) => {
                a.onError && a.onError(A);
              },
              children: /* @__PURE__ */ p(mu, { value: Xn, children: /* @__PURE__ */ p(S0, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
Yl.displayName = "ChatWrapperInner";
const Xl = Cr(
  (t, e) => {
    const { auth: n, chatServerUrl: r, chatServerKey: i, contextHelpers: a } = t, s = (a == null ? void 0 : a.locale) || "en";
    return /* @__PURE__ */ p(
      Dh,
      {
        locale: s,
        chatServerUrl: r,
        chatServerKey: i,
        mpAuthToken: n.token,
        children: /* @__PURE__ */ p(Yl, { ref: e, ...t })
      }
    );
  }
);
Xl.displayName = "ChatWrapperContainer";
const W0 = Jr(Xl);
function G0({
  isConnected: t,
  isConnecting: e = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = Ee("hidden"), [u, c] = Ee(!1);
  if (Me(() => {
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
  g0 as AnimatedPlaceholder,
  ze as CHAT_STATUS,
  Xh as ChatIcon,
  k0 as ChatSkeleton,
  W0 as ChatWrapper,
  Jh as CloseIcon,
  ep as CollapseIcon,
  gu as ComponentRegistry,
  _0 as ConnectionError,
  G0 as ConnectionNotification,
  tp as CopyIcon,
  tc as EntityType,
  Qh as FullscreenIcon,
  Bl as GenerativeComponentRenderer,
  C0 as InlineLoader,
  w0 as Loader,
  lt as PROCESSING_STATUS,
  u0 as PromptInput,
  p0 as PromptInputButton,
  $0 as PromptInputModelSelect,
  j0 as PromptInputModelSelectContent,
  V0 as PromptInputModelSelectItem,
  B0 as PromptInputModelSelectTrigger,
  Z0 as PromptInputModelSelectValue,
  f0 as PromptInputSubmit,
  Kl as PromptInputTextarea,
  d0 as PromptInputToolbar,
  h0 as PromptInputTools,
  t0 as Reasoning,
  $l as ReasoningContent,
  Hl as ReasoningTrigger,
  vt as STREAMING_STATUS,
  H0 as SettingsIcon,
  y0 as SuggestedPrompts,
  Dh as TranslationProvider,
  jl as UnknownComponentFallback,
  qu as fetchThreadMessages,
  Xo as fetchTranslations,
  Mi as isChatActive,
  N0 as isChatError,
  I0 as isChatIdle,
  A0 as isProcessingActive,
  O0 as isProcessingComplete,
  M0 as isProcessingError,
  Ku as updateThread,
  Yu as updateThreadMetadata,
  Cu as useChatActions,
  P0 as useChatState,
  D0 as useConversationState,
  wu as useGenerativeRender,
  z0 as useI18next,
  L0 as useLayoutState,
  F0 as useThreadState,
  pn as useTranslations,
  U0 as useUIState,
  fe as useUIStore
};
