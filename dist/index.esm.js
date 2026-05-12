var lu = Object.defineProperty;
var cu = (t, e, n) => e in t ? lu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ne = (t, e, n) => cu(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as p, jsxs as M, Fragment as en } from "react/jsx-runtime";
import $t, { createContext as ki, useContext as Ci, useState as Te, useRef as fe, useEffect as Pe, useId as ps, useMemo as Ue, useLayoutEffect as uu, useCallback as de, Component as za, memo as _i, forwardRef as Mr, useImperativeHandle as _l } from "react";
import { createPortal as du } from "react-dom";
const Be = {
  IDLE: "idle",
  SUBMITTED: "submitted",
  STREAMING: "streaming",
  ERROR: "error"
}, St = {
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
}, sa = (t) => t === Be.SUBMITTED || t === Be.STREAMING, Jx = (t) => t === Be.IDLE, Qx = (t) => t === Be.ERROR, e9 = (t) => t === lt.PROCESSING, t9 = (t) => t === lt.COMPLETED, n9 = (t) => t === lt.ERROR;
var hu = /* @__PURE__ */ ((t) => (t.BRAND = "BRAND", t.ACCOUNT = "ACCOUNT", t.USER = "USER", t))(hu || {}), Je = /* @__PURE__ */ ((t) => (t.DISCONNECTED = "disconnected", t.CONNECTING = "connecting", t.CONNECTED = "connected", t.RECONNECTING = "reconnecting", t))(Je || {}), Oe;
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
})(Oe || (Oe = {}));
var gs;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(gs || (gs = {}));
const ie = Oe.arrayToEnum([
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
]), gn = (t) => {
  switch (typeof t) {
    case "undefined":
      return ie.undefined;
    case "string":
      return ie.string;
    case "number":
      return Number.isNaN(t) ? ie.nan : ie.number;
    case "boolean":
      return ie.boolean;
    case "function":
      return ie.function;
    case "bigint":
      return ie.bigint;
    case "symbol":
      return ie.symbol;
    case "object":
      return Array.isArray(t) ? ie.array : t === null ? ie.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? ie.promise : typeof Map < "u" && t instanceof Map ? ie.map : typeof Set < "u" && t instanceof Set ? ie.set : typeof Date < "u" && t instanceof Date ? ie.date : ie.object;
    default:
      return ie.unknown;
  }
}, W = Oe.arrayToEnum([
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
class cn extends Error {
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
            const c = s.path[l];
            l === s.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(n(s))) : o[c] = o[c] || { _errors: [] }, o = o[c], l++;
          }
        }
    };
    return i(this), r;
  }
  static assert(e) {
    if (!(e instanceof cn))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Oe.jsonStringifyReplacer, 2);
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
cn.create = (t) => new cn(t);
const oa = (t, e) => {
  let n;
  switch (t.code) {
    case W.invalid_type:
      t.received === ie.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case W.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, Oe.jsonStringifyReplacer)}`;
      break;
    case W.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${Oe.joinValues(t.keys, ", ")}`;
      break;
    case W.invalid_union:
      n = "Invalid input";
      break;
    case W.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${Oe.joinValues(t.options)}`;
      break;
    case W.invalid_enum_value:
      n = `Invalid enum value. Expected ${Oe.joinValues(t.options)}, received '${t.received}'`;
      break;
    case W.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case W.invalid_return_type:
      n = "Invalid function return type";
      break;
    case W.invalid_date:
      n = "Invalid date";
      break;
    case W.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : Oe.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case W.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case W.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case W.custom:
      n = "Invalid input";
      break;
    case W.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case W.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case W.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, Oe.assertNever(t);
  }
  return { message: n };
};
let fu = oa;
function pu() {
  return fu;
}
const gu = (t) => {
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
  const l = r.filter((c) => !!c).slice().reverse();
  for (const c of l)
    o = c(s, { data: e, defaultError: o }).message;
  return {
    ...i,
    path: a,
    message: o
  };
};
function te(t, e) {
  const n = pu(), r = gu({
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
      n === oa ? void 0 : oa
      // then global default map
    ].filter((i) => !!i)
  });
  t.common.issues.push(r);
}
class Rt {
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
        return we;
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
    return Rt.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const i of n) {
      const { key: a, value: s } = i;
      if (a.status === "aborted" || s.status === "aborted")
        return we;
      a.status === "dirty" && e.dirty(), s.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof s.value < "u" || i.alwaysSet) && (r[a.value] = s.value);
    }
    return { status: e.value, value: r };
  }
}
const we = Object.freeze({
  status: "aborted"
}), xr = (t) => ({ status: "dirty", value: t }), Dt = (t) => ({ status: "valid", value: t }), ms = (t) => t.status === "aborted", ys = (t) => t.status === "dirty", Zn = (t) => t.status === "valid", ti = (t) => typeof Promise < "u" && t instanceof Promise;
var oe;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(oe || (oe = {}));
class xn {
  constructor(e, n, r, i) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const xs = (t, e) => {
  if (Zn(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new cn(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function Ee(t) {
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
    return gn(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: gn(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new Rt(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: gn(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (ti(n))
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
      parsedType: gn(e)
    }, i = this._parseSync({ data: e, path: r.path, parent: r });
    return xs(r, i);
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
      parsedType: gn(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: n });
        return Zn(a) ? {
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
    return this._parseAsync({ data: e, path: [], parent: n }).then((a) => Zn(a) ? {
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
      parsedType: gn(e)
    }, i = this._parse({ data: e, path: r.path, parent: r }), a = await (ti(i) ? i : Promise.resolve(i));
    return xs(r, a);
  }
  refine(e, n) {
    const r = (i) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(i) : n;
    return this._refinement((i, a) => {
      const s = e(i), o = () => a.addIssue({
        code: W.custom,
        ...r(i)
      });
      return typeof Promise < "u" && s instanceof Promise ? s.then((l) => l ? !0 : (o(), !1)) : s ? !0 : (o(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, i) => e(r) ? !0 : (i.addIssue(typeof n == "function" ? n(r, i) : n), !1));
  }
  _refinement(e) {
    return new qn({
      schema: this,
      typeName: K.ZodEffects,
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
    return yn.create(this, this._def);
  }
  nullable() {
    return Kn.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return tn.create(this);
  }
  promise() {
    return ai.create(this, this._def);
  }
  or(e) {
    return ri.create([this, e], this._def);
  }
  and(e) {
    return ii.create(this, e, this._def);
  }
  transform(e) {
    return new qn({
      ...Ee(this._def),
      schema: this,
      typeName: K.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new ua({
      ...Ee(this._def),
      innerType: this,
      defaultValue: n,
      typeName: K.ZodDefault
    });
  }
  brand() {
    return new zu({
      typeName: K.ZodBranded,
      type: this,
      ...Ee(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new da({
      ...Ee(this._def),
      innerType: this,
      catchValue: n,
      typeName: K.ZodCatch
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
    return Ha.create(this, e);
  }
  readonly() {
    return ha.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const mu = /^c[^\s-]{8,}$/i, yu = /^[0-9a-z]+$/, xu = /^[0-9A-HJKMNP-TV-Z]{26}$/i, wu = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, bu = /^[a-z0-9_-]{21}$/i, ku = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Cu = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, _u = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, vu = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Mi;
const Su = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Tu = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Eu = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Ru = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Nu = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Au = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, vl = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Iu = new RegExp(`^${vl}$`);
function Sl(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function Mu(t) {
  return new RegExp(`^${Sl(t)}$`);
}
function Ou(t) {
  let e = `${vl}T${Sl(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function Lu(t, e) {
  return !!((e === "v4" || !e) && Su.test(t) || (e === "v6" || !e) && Eu.test(t));
}
function Pu(t, e) {
  if (!ku.test(t))
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
function Du(t, e) {
  return !!((e === "v4" || !e) && Tu.test(t) || (e === "v6" || !e) && Ru.test(t));
}
class mn extends Ie {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== ie.string) {
      const a = this._getOrReturnCtx(e);
      return te(a, {
        code: W.invalid_type,
        expected: ie.string,
        received: a.parsedType
      }), we;
    }
    const r = new Rt();
    let i;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (i = this._getOrReturnCtx(e, i), te(i, {
          code: W.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (i = this._getOrReturnCtx(e, i), te(i, {
          code: W.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const s = e.data.length > a.value, o = e.data.length < a.value;
        (s || o) && (i = this._getOrReturnCtx(e, i), s ? te(i, {
          code: W.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && te(i, {
          code: W.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        _u.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "email",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        Mi || (Mi = new RegExp(vu, "u")), Mi.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "emoji",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        wu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "uuid",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "nanoid")
        bu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "nanoid",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        mu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "cuid",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        yu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "cuid2",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        xu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
          validation: "ulid",
          code: W.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), te(i, {
            validation: "url",
            code: W.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "regex",
        code: W.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? Ou(a).test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "date" ? Iu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.invalid_string,
        validation: "date",
        message: a.message
      }), r.dirty()) : a.kind === "time" ? Mu(a).test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.invalid_string,
        validation: "time",
        message: a.message
      }), r.dirty()) : a.kind === "duration" ? Cu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "duration",
        code: W.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Lu(e.data, a.version) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "ip",
        code: W.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "jwt" ? Pu(e.data, a.alg) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "jwt",
        code: W.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "cidr" ? Du(e.data, a.version) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "cidr",
        code: W.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64" ? Nu.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "base64",
        code: W.invalid_string,
        message: a.message
      }), r.dirty()) : a.kind === "base64url" ? Au.test(e.data) || (i = this._getOrReturnCtx(e, i), te(i, {
        validation: "base64url",
        code: W.invalid_string,
        message: a.message
      }), r.dirty()) : Oe.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((i) => e.test(i), {
      validation: n,
      code: W.invalid_string,
      ...oe.errToObj(r)
    });
  }
  _addCheck(e) {
    return new mn({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...oe.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...oe.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...oe.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...oe.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...oe.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...oe.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...oe.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...oe.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...oe.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...oe.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...oe.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...oe.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...oe.errToObj(e) });
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
      ...oe.errToObj(e == null ? void 0 : e.message)
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
      ...oe.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...oe.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...oe.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...oe.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...oe.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...oe.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...oe.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...oe.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...oe.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, oe.errToObj(e));
  }
  trim() {
    return new mn({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new mn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new mn({
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
mn.create = (t) => new mn({
  checks: [],
  typeName: K.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...Ee(t)
});
function Fu(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, i = n > r ? n : r, a = Number.parseInt(t.toFixed(i).replace(".", "")), s = Number.parseInt(e.toFixed(i).replace(".", ""));
  return a % s / 10 ** i;
}
class Wn extends Ie {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== ie.number) {
      const a = this._getOrReturnCtx(e);
      return te(a, {
        code: W.invalid_type,
        expected: ie.number,
        received: a.parsedType
      }), we;
    }
    let r;
    const i = new Rt();
    for (const a of this._def.checks)
      a.kind === "int" ? Oe.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), i.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), i.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), i.dirty()) : a.kind === "multipleOf" ? Fu(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), i.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.not_finite,
        message: a.message
      }), i.dirty()) : Oe.assertNever(a);
    return { status: i.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, oe.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, oe.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, oe.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, oe.toString(n));
  }
  setLimit(e, n, r, i) {
    return new Wn({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: oe.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Wn({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: oe.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: oe.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: oe.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: oe.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: oe.toString(e)
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
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Oe.isInteger(e.value));
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
Wn.create = (t) => new Wn({
  checks: [],
  typeName: K.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...Ee(t)
});
class vr extends Ie {
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
    if (this._getType(e) !== ie.bigint)
      return this._getInvalidInput(e);
    let r;
    const i = new Rt();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), i.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), i.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), te(r, {
        code: W.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), i.dirty()) : Oe.assertNever(a);
    return { status: i.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return te(n, {
      code: W.invalid_type,
      expected: ie.bigint,
      received: n.parsedType
    }), we;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, oe.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, oe.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, oe.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, oe.toString(n));
  }
  setLimit(e, n, r, i) {
    return new vr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: oe.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new vr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: oe.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: oe.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: oe.toString(n)
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
vr.create = (t) => new vr({
  checks: [],
  typeName: K.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...Ee(t)
});
class la extends Ie {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== ie.boolean) {
      const r = this._getOrReturnCtx(e);
      return te(r, {
        code: W.invalid_type,
        expected: ie.boolean,
        received: r.parsedType
      }), we;
    }
    return Dt(e.data);
  }
}
la.create = (t) => new la({
  typeName: K.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...Ee(t)
});
class ni extends Ie {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== ie.date) {
      const a = this._getOrReturnCtx(e);
      return te(a, {
        code: W.invalid_type,
        expected: ie.date,
        received: a.parsedType
      }), we;
    }
    if (Number.isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return te(a, {
        code: W.invalid_date
      }), we;
    }
    const r = new Rt();
    let i;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (i = this._getOrReturnCtx(e, i), te(i, {
        code: W.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : Oe.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new ni({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: oe.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: oe.toString(n)
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
ni.create = (t) => new ni({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: K.ZodDate,
  ...Ee(t)
});
class ws extends Ie {
  _parse(e) {
    if (this._getType(e) !== ie.symbol) {
      const r = this._getOrReturnCtx(e);
      return te(r, {
        code: W.invalid_type,
        expected: ie.symbol,
        received: r.parsedType
      }), we;
    }
    return Dt(e.data);
  }
}
ws.create = (t) => new ws({
  typeName: K.ZodSymbol,
  ...Ee(t)
});
class bs extends Ie {
  _parse(e) {
    if (this._getType(e) !== ie.undefined) {
      const r = this._getOrReturnCtx(e);
      return te(r, {
        code: W.invalid_type,
        expected: ie.undefined,
        received: r.parsedType
      }), we;
    }
    return Dt(e.data);
  }
}
bs.create = (t) => new bs({
  typeName: K.ZodUndefined,
  ...Ee(t)
});
class ks extends Ie {
  _parse(e) {
    if (this._getType(e) !== ie.null) {
      const r = this._getOrReturnCtx(e);
      return te(r, {
        code: W.invalid_type,
        expected: ie.null,
        received: r.parsedType
      }), we;
    }
    return Dt(e.data);
  }
}
ks.create = (t) => new ks({
  typeName: K.ZodNull,
  ...Ee(t)
});
class Cs extends Ie {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Dt(e.data);
  }
}
Cs.create = (t) => new Cs({
  typeName: K.ZodAny,
  ...Ee(t)
});
class _s extends Ie {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Dt(e.data);
  }
}
_s.create = (t) => new _s({
  typeName: K.ZodUnknown,
  ...Ee(t)
});
class wn extends Ie {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return te(n, {
      code: W.invalid_type,
      expected: ie.never,
      received: n.parsedType
    }), we;
  }
}
wn.create = (t) => new wn({
  typeName: K.ZodNever,
  ...Ee(t)
});
class vs extends Ie {
  _parse(e) {
    if (this._getType(e) !== ie.undefined) {
      const r = this._getOrReturnCtx(e);
      return te(r, {
        code: W.invalid_type,
        expected: ie.void,
        received: r.parsedType
      }), we;
    }
    return Dt(e.data);
  }
}
vs.create = (t) => new vs({
  typeName: K.ZodVoid,
  ...Ee(t)
});
class tn extends Ie {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), i = this._def;
    if (n.parsedType !== ie.array)
      return te(n, {
        code: W.invalid_type,
        expected: ie.array,
        received: n.parsedType
      }), we;
    if (i.exactLength !== null) {
      const s = n.data.length > i.exactLength.value, o = n.data.length < i.exactLength.value;
      (s || o) && (te(n, {
        code: s ? W.too_big : W.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: s ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), r.dirty());
    }
    if (i.minLength !== null && n.data.length < i.minLength.value && (te(n, {
      code: W.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), r.dirty()), i.maxLength !== null && n.data.length > i.maxLength.value && (te(n, {
      code: W.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((s, o) => i.type._parseAsync(new xn(n, s, n.path, o)))).then((s) => Rt.mergeArray(r, s));
    const a = [...n.data].map((s, o) => i.type._parseSync(new xn(n, s, n.path, o)));
    return Rt.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new tn({
      ...this._def,
      minLength: { value: e, message: oe.toString(n) }
    });
  }
  max(e, n) {
    return new tn({
      ...this._def,
      maxLength: { value: e, message: oe.toString(n) }
    });
  }
  length(e, n) {
    return new tn({
      ...this._def,
      exactLength: { value: e, message: oe.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
tn.create = (t, e) => new tn({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: K.ZodArray,
  ...Ee(e)
});
function Hn(t) {
  if (t instanceof Qe) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = yn.create(Hn(r));
    }
    return new Qe({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof tn ? new tn({
    ...t._def,
    type: Hn(t.element)
  }) : t instanceof yn ? yn.create(Hn(t.unwrap())) : t instanceof Kn ? Kn.create(Hn(t.unwrap())) : t instanceof In ? In.create(t.items.map((e) => Hn(e))) : t;
}
class Qe extends Ie {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = Oe.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== ie.object) {
      const c = this._getOrReturnCtx(e);
      return te(c, {
        code: W.invalid_type,
        expected: ie.object,
        received: c.parsedType
      }), we;
    }
    const { status: r, ctx: i } = this._processInputParams(e), { shape: a, keys: s } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof wn && this._def.unknownKeys === "strip"))
      for (const c in i.data)
        s.includes(c) || o.push(c);
    const l = [];
    for (const c of s) {
      const u = a[c], d = i.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: u._parse(new xn(i, d, i.path, c)),
        alwaysSet: c in i.data
      });
    }
    if (this._def.catchall instanceof wn) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const u of o)
          l.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: i.data[u] }
          });
      else if (c === "strict")
        o.length > 0 && (te(i, {
          code: W.unrecognized_keys,
          keys: o
        }), r.dirty());
      else if (c !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const u of o) {
        const d = i.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: c._parse(
            new xn(i, d, i.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const u of l) {
        const d = await u.key, h = await u.value;
        c.push({
          key: d,
          value: h,
          alwaysSet: u.alwaysSet
        });
      }
      return c;
    }).then((c) => Rt.mergeObjectSync(r, c)) : Rt.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return oe.errToObj, new Qe({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var a, s;
          const i = ((s = (a = this._def).errorMap) == null ? void 0 : s.call(a, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: oe.errToObj(e).message ?? i
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
      typeName: K.ZodObject
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
    for (const r of Oe.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new Qe({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of Oe.objectKeys(this.shape))
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
    return Hn(this);
  }
  partial(e) {
    const n = {};
    for (const r of Oe.objectKeys(this.shape)) {
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
    for (const r of Oe.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof yn; )
          a = a._def.innerType;
        n[r] = a;
      }
    return new Qe({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return Tl(Oe.objectKeys(this.shape));
  }
}
Qe.create = (t, e) => new Qe({
  shape: () => t,
  unknownKeys: "strip",
  catchall: wn.create(),
  typeName: K.ZodObject,
  ...Ee(e)
});
Qe.strictCreate = (t, e) => new Qe({
  shape: () => t,
  unknownKeys: "strict",
  catchall: wn.create(),
  typeName: K.ZodObject,
  ...Ee(e)
});
Qe.lazycreate = (t, e) => new Qe({
  shape: t,
  unknownKeys: "strip",
  catchall: wn.create(),
  typeName: K.ZodObject,
  ...Ee(e)
});
class ri extends Ie {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function i(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return n.common.issues.push(...o.ctx.common.issues), o.result;
      const s = a.map((o) => new cn(o.ctx.common.issues));
      return te(n, {
        code: W.invalid_union,
        unionErrors: s
      }), we;
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
        const c = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, u = l._parseSync({
          data: n.data,
          path: n.path,
          parent: c
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !a && (a = { result: u, ctx: c }), c.common.issues.length && s.push(c.common.issues);
      }
      if (a)
        return n.common.issues.push(...a.ctx.common.issues), a.result;
      const o = s.map((l) => new cn(l));
      return te(n, {
        code: W.invalid_union,
        unionErrors: o
      }), we;
    }
  }
  get options() {
    return this._def.options;
  }
}
ri.create = (t, e) => new ri({
  options: t,
  typeName: K.ZodUnion,
  ...Ee(e)
});
function ca(t, e) {
  const n = gn(t), r = gn(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === ie.object && r === ie.object) {
    const i = Oe.objectKeys(e), a = Oe.objectKeys(t).filter((o) => i.indexOf(o) !== -1), s = { ...t, ...e };
    for (const o of a) {
      const l = ca(t[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      s[o] = l.data;
    }
    return { valid: !0, data: s };
  } else if (n === ie.array && r === ie.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const i = [];
    for (let a = 0; a < t.length; a++) {
      const s = t[a], o = e[a], l = ca(s, o);
      if (!l.valid)
        return { valid: !1 };
      i.push(l.data);
    }
    return { valid: !0, data: i };
  } else return n === ie.date && r === ie.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class ii extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), i = (a, s) => {
      if (ms(a) || ms(s))
        return we;
      const o = ca(a.value, s.value);
      return o.valid ? ((ys(a) || ys(s)) && n.dirty(), { status: n.value, value: o.data }) : (te(r, {
        code: W.invalid_intersection_types
      }), we);
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
ii.create = (t, e, n) => new ii({
  left: t,
  right: e,
  typeName: K.ZodIntersection,
  ...Ee(n)
});
class In extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== ie.array)
      return te(r, {
        code: W.invalid_type,
        expected: ie.array,
        received: r.parsedType
      }), we;
    if (r.data.length < this._def.items.length)
      return te(r, {
        code: W.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), we;
    !this._def.rest && r.data.length > this._def.items.length && (te(r, {
      code: W.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...r.data].map((s, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new xn(r, s, r.path, o)) : null;
    }).filter((s) => !!s);
    return r.common.async ? Promise.all(a).then((s) => Rt.mergeArray(n, s)) : Rt.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new In({
      ...this._def,
      rest: e
    });
  }
}
In.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new In({
    items: t,
    typeName: K.ZodTuple,
    rest: null,
    ...Ee(e)
  });
};
class Ss extends Ie {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== ie.map)
      return te(r, {
        code: W.invalid_type,
        expected: ie.map,
        received: r.parsedType
      }), we;
    const i = this._def.keyType, a = this._def.valueType, s = [...r.data.entries()].map(([o, l], c) => ({
      key: i._parse(new xn(r, o, r.path, [c, "key"])),
      value: a._parse(new xn(r, l, r.path, [c, "value"]))
    }));
    if (r.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of s) {
          const c = await l.key, u = await l.value;
          if (c.status === "aborted" || u.status === "aborted")
            return we;
          (c.status === "dirty" || u.status === "dirty") && n.dirty(), o.set(c.value, u.value);
        }
        return { status: n.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of s) {
        const c = l.key, u = l.value;
        if (c.status === "aborted" || u.status === "aborted")
          return we;
        (c.status === "dirty" || u.status === "dirty") && n.dirty(), o.set(c.value, u.value);
      }
      return { status: n.value, value: o };
    }
  }
}
Ss.create = (t, e, n) => new Ss({
  valueType: e,
  keyType: t,
  typeName: K.ZodMap,
  ...Ee(n)
});
class Sr extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== ie.set)
      return te(r, {
        code: W.invalid_type,
        expected: ie.set,
        received: r.parsedType
      }), we;
    const i = this._def;
    i.minSize !== null && r.data.size < i.minSize.value && (te(r, {
      code: W.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), n.dirty()), i.maxSize !== null && r.data.size > i.maxSize.value && (te(r, {
      code: W.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), n.dirty());
    const a = this._def.valueType;
    function s(l) {
      const c = /* @__PURE__ */ new Set();
      for (const u of l) {
        if (u.status === "aborted")
          return we;
        u.status === "dirty" && n.dirty(), c.add(u.value);
      }
      return { status: n.value, value: c };
    }
    const o = [...r.data.values()].map((l, c) => a._parse(new xn(r, l, r.path, c)));
    return r.common.async ? Promise.all(o).then((l) => s(l)) : s(o);
  }
  min(e, n) {
    return new Sr({
      ...this._def,
      minSize: { value: e, message: oe.toString(n) }
    });
  }
  max(e, n) {
    return new Sr({
      ...this._def,
      maxSize: { value: e, message: oe.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Sr.create = (t, e) => new Sr({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: K.ZodSet,
  ...Ee(e)
});
class Ts extends Ie {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Ts.create = (t, e) => new Ts({
  getter: t,
  typeName: K.ZodLazy,
  ...Ee(e)
});
class Es extends Ie {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return te(n, {
        received: n.data,
        code: W.invalid_literal,
        expected: this._def.value
      }), we;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Es.create = (t, e) => new Es({
  value: t,
  typeName: K.ZodLiteral,
  ...Ee(e)
});
function Tl(t, e) {
  return new Gn({
    values: t,
    typeName: K.ZodEnum,
    ...Ee(e)
  });
}
class Gn extends Ie {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return te(n, {
        expected: Oe.joinValues(r),
        received: n.parsedType,
        code: W.invalid_type
      }), we;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return te(n, {
        received: n.data,
        code: W.invalid_enum_value,
        options: r
      }), we;
    }
    return Dt(e.data);
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
    return Gn.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return Gn.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
Gn.create = Tl;
class Rs extends Ie {
  _parse(e) {
    const n = Oe.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== ie.string && r.parsedType !== ie.number) {
      const i = Oe.objectValues(n);
      return te(r, {
        expected: Oe.joinValues(i),
        received: r.parsedType,
        code: W.invalid_type
      }), we;
    }
    if (this._cache || (this._cache = new Set(Oe.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const i = Oe.objectValues(n);
      return te(r, {
        received: r.data,
        code: W.invalid_enum_value,
        options: i
      }), we;
    }
    return Dt(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Rs.create = (t, e) => new Rs({
  values: t,
  typeName: K.ZodNativeEnum,
  ...Ee(e)
});
class ai extends Ie {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== ie.promise && n.common.async === !1)
      return te(n, {
        code: W.invalid_type,
        expected: ie.promise,
        received: n.parsedType
      }), we;
    const r = n.parsedType === ie.promise ? n.data : Promise.resolve(n.data);
    return Dt(r.then((i) => this._def.type.parseAsync(i, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
ai.create = (t, e) => new ai({
  type: t,
  typeName: K.ZodPromise,
  ...Ee(e)
});
class qn extends Ie {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === K.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), i = this._def.effect || null, a = {
      addIssue: (s) => {
        te(r, s), s.fatal ? n.abort() : n.dirty();
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
            return we;
          const l = await this._def.schema._parseAsync({
            data: o,
            path: r.path,
            parent: r
          });
          return l.status === "aborted" ? we : l.status === "dirty" || n.value === "dirty" ? xr(l.value) : l;
        });
      {
        if (n.value === "aborted")
          return we;
        const o = this._def.schema._parseSync({
          data: s,
          path: r.path,
          parent: r
        });
        return o.status === "aborted" ? we : o.status === "dirty" || n.value === "dirty" ? xr(o.value) : o;
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
        return o.status === "aborted" ? we : (o.status === "dirty" && n.dirty(), s(o.value), { status: n.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => o.status === "aborted" ? we : (o.status === "dirty" && n.dirty(), s(o.value).then(() => ({ status: n.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (r.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Zn(s))
          return we;
        const o = i.transform(s.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((s) => Zn(s) ? Promise.resolve(i.transform(s.value, a)).then((o) => ({
          status: n.value,
          value: o
        })) : we);
    Oe.assertNever(i);
  }
}
qn.create = (t, e, n) => new qn({
  schema: t,
  typeName: K.ZodEffects,
  effect: e,
  ...Ee(n)
});
qn.createWithPreprocess = (t, e, n) => new qn({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: K.ZodEffects,
  ...Ee(n)
});
class yn extends Ie {
  _parse(e) {
    return this._getType(e) === ie.undefined ? Dt(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
yn.create = (t, e) => new yn({
  innerType: t,
  typeName: K.ZodOptional,
  ...Ee(e)
});
class Kn extends Ie {
  _parse(e) {
    return this._getType(e) === ie.null ? Dt(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Kn.create = (t, e) => new Kn({
  innerType: t,
  typeName: K.ZodNullable,
  ...Ee(e)
});
class ua extends Ie {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === ie.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ua.create = (t, e) => new ua({
  innerType: t,
  typeName: K.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...Ee(e)
});
class da extends Ie {
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
    return ti(i) ? i.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new cn(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new cn(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
da.create = (t, e) => new da({
  innerType: t,
  typeName: K.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...Ee(e)
});
class Ns extends Ie {
  _parse(e) {
    if (this._getType(e) !== ie.nan) {
      const r = this._getOrReturnCtx(e);
      return te(r, {
        code: W.invalid_type,
        expected: ie.nan,
        received: r.parsedType
      }), we;
    }
    return { status: "valid", value: e.data };
  }
}
Ns.create = (t) => new Ns({
  typeName: K.ZodNaN,
  ...Ee(t)
});
class zu extends Ie {
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
class Ha extends Ie {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? we : a.status === "dirty" ? (n.dirty(), xr(a.value)) : this._def.out._parseAsync({
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
      return i.status === "aborted" ? we : i.status === "dirty" ? (n.dirty(), {
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
    return new Ha({
      in: e,
      out: n,
      typeName: K.ZodPipeline
    });
  }
}
class ha extends Ie {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (i) => (Zn(i) && (i.value = Object.freeze(i.value)), i);
    return ti(n) ? n.then((i) => r(i)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ha.create = (t, e) => new ha({
  innerType: t,
  typeName: K.ZodReadonly,
  ...Ee(e)
});
var K;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(K || (K = {}));
const Tt = mn.create, El = Wn.create, Hu = la.create;
wn.create;
const Ua = tn.create, Qn = Qe.create;
ri.create;
ii.create;
In.create;
const $a = Gn.create;
ai.create;
yn.create;
Kn.create;
const Uu = Symbol("Let zodToJsonSchema decide on which parser to use"), As = {
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
}, $u = (t) => typeof t == "string" ? {
  ...As,
  name: t
} : {
  ...As,
  ...t
}, Bu = (t) => {
  const e = $u(t), n = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
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
function Rl(t, e, n, r) {
  r != null && r.errorMessages && n && (t.errorMessage = {
    ...t.errorMessage,
    [e]: n
  });
}
function ze(t, e, n, r, i) {
  t[e] = n, Rl(t, e, r, i);
}
const Nl = (t, e) => {
  let n = 0;
  for (; n < t.length && n < e.length && t[n] === e[n]; n++)
    ;
  return [(t.length - n).toString(), ...e.slice(n)].join("/");
};
function bt(t) {
  if (t.target !== "openAi")
    return {};
  const e = [
    ...t.basePath,
    t.definitionPath,
    t.openAiAnyTypeName
  ];
  return t.flags.hasReferencedOpenAiAnyType = !0, {
    $ref: t.$refStrategy === "relative" ? Nl(e, t.currentPath) : e.join("/")
  };
}
function ju(t, e) {
  var r, i, a;
  const n = {
    type: "array"
  };
  return (r = t.type) != null && r._def && ((a = (i = t.type) == null ? void 0 : i._def) == null ? void 0 : a.typeName) !== K.ZodAny && (n.items = De(t.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), t.minLength && ze(n, "minItems", t.minLength.value, t.minLength.message, e), t.maxLength && ze(n, "maxItems", t.maxLength.value, t.maxLength.message, e), t.exactLength && (ze(n, "minItems", t.exactLength.value, t.exactLength.message, e), ze(n, "maxItems", t.exactLength.value, t.exactLength.message, e)), n;
}
function Vu(t, e) {
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
function Zu() {
  return {
    type: "boolean"
  };
}
function Al(t, e) {
  return De(t.type._def, e);
}
const Wu = (t, e) => De(t.innerType._def, e);
function Il(t, e, n) {
  const r = n ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((i, a) => Il(t, e, i))
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
      return Gu(t, e);
  }
}
const Gu = (t, e) => {
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
function qu(t, e) {
  return {
    ...De(t.innerType._def, e),
    default: t.defaultValue()
  };
}
function Ku(t, e) {
  return e.effectStrategy === "input" ? De(t.schema._def, e) : bt(e);
}
function Xu(t) {
  return {
    type: "string",
    enum: Array.from(t.values)
  };
}
const Yu = (t) => "type" in t && t.type === "string" ? !1 : "allOf" in t;
function Ju(t, e) {
  const n = [
    De(t.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    De(t.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((a) => !!a);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const i = [];
  return n.forEach((a) => {
    if (Yu(a))
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
function Qu(t, e) {
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
let Oi;
const zt = {
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
  emoji: () => (Oi === void 0 && (Oi = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), Oi),
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
function Ml(t, e) {
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
              Ht(n, "email", r.message, e);
              break;
            case "format:idn-email":
              Ht(n, "idn-email", r.message, e);
              break;
            case "pattern:zod":
              ut(n, zt.email, r.message, e);
              break;
          }
          break;
        case "url":
          Ht(n, "uri", r.message, e);
          break;
        case "uuid":
          Ht(n, "uuid", r.message, e);
          break;
        case "regex":
          ut(n, r.regex, r.message, e);
          break;
        case "cuid":
          ut(n, zt.cuid, r.message, e);
          break;
        case "cuid2":
          ut(n, zt.cuid2, r.message, e);
          break;
        case "startsWith":
          ut(n, RegExp(`^${Li(r.value, e)}`), r.message, e);
          break;
        case "endsWith":
          ut(n, RegExp(`${Li(r.value, e)}$`), r.message, e);
          break;
        case "datetime":
          Ht(n, "date-time", r.message, e);
          break;
        case "date":
          Ht(n, "date", r.message, e);
          break;
        case "time":
          Ht(n, "time", r.message, e);
          break;
        case "duration":
          Ht(n, "duration", r.message, e);
          break;
        case "length":
          ze(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e), ze(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "includes": {
          ut(n, RegExp(Li(r.value, e)), r.message, e);
          break;
        }
        case "ip": {
          r.version !== "v6" && Ht(n, "ipv4", r.message, e), r.version !== "v4" && Ht(n, "ipv6", r.message, e);
          break;
        }
        case "base64url":
          ut(n, zt.base64url, r.message, e);
          break;
        case "jwt":
          ut(n, zt.jwt, r.message, e);
          break;
        case "cidr": {
          r.version !== "v6" && ut(n, zt.ipv4Cidr, r.message, e), r.version !== "v4" && ut(n, zt.ipv6Cidr, r.message, e);
          break;
        }
        case "emoji":
          ut(n, zt.emoji(), r.message, e);
          break;
        case "ulid": {
          ut(n, zt.ulid, r.message, e);
          break;
        }
        case "base64": {
          switch (e.base64Strategy) {
            case "format:binary": {
              Ht(n, "binary", r.message, e);
              break;
            }
            case "contentEncoding:base64": {
              ze(n, "contentEncoding", "base64", r.message, e);
              break;
            }
            case "pattern:zod": {
              ut(n, zt.base64, r.message, e);
              break;
            }
          }
          break;
        }
        case "nanoid":
          ut(n, zt.nanoid, r.message, e);
      }
  return n;
}
function Li(t, e) {
  return e.patternStrategy === "escape" ? td(t) : t;
}
const ed = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function td(t) {
  let e = "";
  for (let n = 0; n < t.length; n++)
    ed.has(t[n]) || (e += "\\"), e += t[n];
  return e;
}
function Ht(t, e, n, r) {
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
    pattern: Is(e, r),
    ...n && r.errorMessages && { errorMessage: { pattern: n } }
  })) : ze(t, "pattern", Is(e, r), n, r);
}
function Is(t, e) {
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
  for (let c = 0; c < r.length; c++) {
    if (a) {
      i += r[c], a = !1;
      continue;
    }
    if (n.i) {
      if (s) {
        if (r[c].match(/[a-z]/)) {
          o ? (i += r[c], i += `${r[c - 2]}-${r[c]}`.toUpperCase(), o = !1) : r[c + 1] === "-" && ((l = r[c + 2]) != null && l.match(/[a-z]/)) ? (i += r[c], o = !0) : i += `${r[c]}${r[c].toUpperCase()}`;
          continue;
        }
      } else if (r[c].match(/[a-z]/)) {
        i += `[${r[c]}${r[c].toUpperCase()}]`;
        continue;
      }
    }
    if (n.m) {
      if (r[c] === "^") {
        i += `(^|(?<=[\r
]))`;
        continue;
      } else if (r[c] === "$") {
        i += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (n.s && r[c] === ".") {
      i += s ? `${r[c]}\r
` : `[${r[c]}\r
]`;
      continue;
    }
    i += r[c], r[c] === "\\" ? a = !0 : s && r[c] === "]" ? s = !1 : !s && r[c] === "[" && (s = !0);
  }
  try {
    new RegExp(i);
  } catch {
    return console.warn(`Could not convert regex pattern at ${e.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), t.source;
  }
  return i;
}
function Ol(t, e) {
  var r, i, a, s, o, l;
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && ((r = t.keyType) == null ? void 0 : r._def.typeName) === K.ZodEnum)
    return {
      type: "object",
      required: t.keyType._def.values,
      properties: t.keyType._def.values.reduce((c, u) => ({
        ...c,
        [u]: De(t.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", u]
        }) ?? bt(e)
      }), {}),
      additionalProperties: e.rejectedAdditionalProperties
    };
  const n = {
    type: "object",
    additionalProperties: De(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? e.allowedAdditionalProperties
  };
  if (e.target === "openApi3")
    return n;
  if (((i = t.keyType) == null ? void 0 : i._def.typeName) === K.ZodString && ((a = t.keyType._def.checks) != null && a.length)) {
    const { type: c, ...u } = Ml(t.keyType._def, e);
    return {
      ...n,
      propertyNames: u
    };
  } else {
    if (((s = t.keyType) == null ? void 0 : s._def.typeName) === K.ZodEnum)
      return {
        ...n,
        propertyNames: {
          enum: t.keyType._def.values
        }
      };
    if (((o = t.keyType) == null ? void 0 : o._def.typeName) === K.ZodBranded && t.keyType._def.type._def.typeName === K.ZodString && ((l = t.keyType._def.type._def.checks) != null && l.length)) {
      const { type: c, ...u } = Al(t.keyType._def, e);
      return {
        ...n,
        propertyNames: u
      };
    }
  }
  return n;
}
function nd(t, e) {
  if (e.mapStrategy === "record")
    return Ol(t, e);
  const n = De(t.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || bt(e), r = De(t.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || bt(e);
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
function rd(t) {
  const e = t.values, r = Object.keys(t.values).filter((a) => typeof e[e[a]] != "number").map((a) => e[a]), i = Array.from(new Set(r.map((a) => typeof a)));
  return {
    type: i.length === 1 ? i[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function id(t) {
  return t.target === "openAi" ? void 0 : {
    not: bt({
      ...t,
      currentPath: [...t.currentPath, "not"]
    })
  };
}
function ad(t) {
  return t.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const si = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function sd(t, e) {
  if (e.target === "openApi3")
    return Ms(t, e);
  const n = t.options instanceof Map ? Array.from(t.options.values()) : t.options;
  if (n.every((r) => r._def.typeName in si && (!r._def.checks || !r._def.checks.length))) {
    const r = n.reduce((i, a) => {
      const s = si[a._def.typeName];
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
  return Ms(t, e);
}
const Ms = (t, e) => {
  const n = (t.options instanceof Map ? Array.from(t.options.values()) : t.options).map((r, i) => De(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", `${i}`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return n.length ? { anyOf: n } : void 0;
};
function od(t, e) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(t.innerType._def.typeName) && (!t.innerType._def.checks || !t.innerType._def.checks.length))
    return e.target === "openApi3" ? {
      type: si[t.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        si[t.innerType._def.typeName],
        "null"
      ]
    };
  if (e.target === "openApi3") {
    const r = De(t.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const n = De(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return n && { anyOf: [n, { type: "null" }] };
}
function ld(t, e) {
  const n = {
    type: "number"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "int":
        n.type = "integer", Rl(n, "type", r.message, e);
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
function cd(t, e) {
  const n = e.target === "openAi", r = {
    type: "object",
    properties: {}
  }, i = [], a = t.shape();
  for (const o in a) {
    let l = a[o];
    if (l === void 0 || l._def === void 0)
      continue;
    let c = dd(l);
    c && n && (l._def.typeName === "ZodOptional" && (l = l._def.innerType), l.isNullable() || (l = l.nullable()), c = !1);
    const u = De(l._def, {
      ...e,
      currentPath: [...e.currentPath, "properties", o],
      propertyPath: [...e.currentPath, "properties", o]
    });
    u !== void 0 && (r.properties[o] = u, c || i.push(o));
  }
  i.length && (r.required = i);
  const s = ud(t, e);
  return s !== void 0 && (r.additionalProperties = s), r;
}
function ud(t, e) {
  if (t.catchall._def.typeName !== "ZodNever")
    return De(t.catchall._def, {
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
function dd(t) {
  try {
    return t.isOptional();
  } catch {
    return !0;
  }
}
const hd = (t, e) => {
  var r;
  if (e.currentPath.toString() === ((r = e.propertyPath) == null ? void 0 : r.toString()))
    return De(t.innerType._def, e);
  const n = De(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return n ? {
    anyOf: [
      {
        not: bt(e)
      },
      n
    ]
  } : bt(e);
}, fd = (t, e) => {
  if (e.pipeStrategy === "input")
    return De(t.in._def, e);
  if (e.pipeStrategy === "output")
    return De(t.out._def, e);
  const n = De(t.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = De(t.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", n ? "1" : "0"]
  });
  return {
    allOf: [n, r].filter((i) => i !== void 0)
  };
};
function pd(t, e) {
  return De(t.type._def, e);
}
function gd(t, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: De(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return t.minSize && ze(r, "minItems", t.minSize.value, t.minSize.message, e), t.maxSize && ze(r, "maxItems", t.maxSize.value, t.maxSize.message, e), r;
}
function md(t, e) {
  return t.rest ? {
    type: "array",
    minItems: t.items.length,
    items: t.items.map((n, r) => De(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], []),
    additionalItems: De(t.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: t.items.length,
    maxItems: t.items.length,
    items: t.items.map((n, r) => De(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], [])
  };
}
function yd(t) {
  return {
    not: bt(t)
  };
}
function xd(t) {
  return bt(t);
}
const wd = (t, e) => De(t.innerType._def, e), bd = (t, e, n) => {
  switch (e) {
    case K.ZodString:
      return Ml(t, n);
    case K.ZodNumber:
      return ld(t, n);
    case K.ZodObject:
      return cd(t, n);
    case K.ZodBigInt:
      return Vu(t, n);
    case K.ZodBoolean:
      return Zu();
    case K.ZodDate:
      return Il(t, n);
    case K.ZodUndefined:
      return yd(n);
    case K.ZodNull:
      return ad(n);
    case K.ZodArray:
      return ju(t, n);
    case K.ZodUnion:
    case K.ZodDiscriminatedUnion:
      return sd(t, n);
    case K.ZodIntersection:
      return Ju(t, n);
    case K.ZodTuple:
      return md(t, n);
    case K.ZodRecord:
      return Ol(t, n);
    case K.ZodLiteral:
      return Qu(t, n);
    case K.ZodEnum:
      return Xu(t);
    case K.ZodNativeEnum:
      return rd(t);
    case K.ZodNullable:
      return od(t, n);
    case K.ZodOptional:
      return hd(t, n);
    case K.ZodMap:
      return nd(t, n);
    case K.ZodSet:
      return gd(t, n);
    case K.ZodLazy:
      return () => t.getter()._def;
    case K.ZodPromise:
      return pd(t, n);
    case K.ZodNaN:
    case K.ZodNever:
      return id(n);
    case K.ZodEffects:
      return Ku(t, n);
    case K.ZodAny:
      return bt(n);
    case K.ZodUnknown:
      return xd(n);
    case K.ZodDefault:
      return qu(t, n);
    case K.ZodBranded:
      return Al(t, n);
    case K.ZodReadonly:
      return wd(t, n);
    case K.ZodCatch:
      return Wu(t, n);
    case K.ZodPipeline:
      return fd(t, n);
    case K.ZodFunction:
    case K.ZodVoid:
    case K.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function De(t, e, n = !1) {
  var o;
  const r = e.seen.get(t);
  if (e.override) {
    const l = (o = e.override) == null ? void 0 : o.call(e, t, e, r, n);
    if (l !== Uu)
      return l;
  }
  if (r && !n) {
    const l = kd(r, e);
    if (l !== void 0)
      return l;
  }
  const i = { def: t, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(t, i);
  const a = bd(t, t.typeName, e), s = typeof a == "function" ? De(a(), e) : a;
  if (s && Cd(t, e, s), e.postProcess) {
    const l = e.postProcess(s, t, e);
    return i.jsonSchema = s, l;
  }
  return i.jsonSchema = s, s;
}
const kd = (t, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: t.path.join("/") };
    case "relative":
      return { $ref: Nl(e.currentPath, t.path) };
    case "none":
    case "seen":
      return t.path.length < e.currentPath.length && t.path.every((n, r) => e.currentPath[r] === n) ? (console.warn(`Recursive reference detected at ${e.currentPath.join("/")}! Defaulting to any`), bt(e)) : e.$refStrategy === "seen" ? bt(e) : void 0;
  }
}, Cd = (t, e, n) => (t.description && (n.description = t.description, e.markdownDescription && (n.markdownDescription = t.description)), n), _d = (t, e) => {
  const n = Bu(e);
  let r = typeof e == "object" && e.definitions ? Object.entries(e.definitions).reduce((l, [c, u]) => ({
    ...l,
    [c]: De(u._def, {
      ...n,
      currentPath: [...n.basePath, n.definitionPath, c]
    }, !0) ?? bt(n)
  }), {}) : void 0;
  const i = typeof e == "string" ? e : (e == null ? void 0 : e.nameStrategy) === "title" || e == null ? void 0 : e.name, a = De(t._def, i === void 0 ? n : {
    ...n,
    currentPath: [...n.basePath, n.definitionPath, i]
  }, !1) ?? bt(n), s = typeof e == "object" && e.name !== void 0 && e.nameStrategy === "title" ? e.name : void 0;
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
function vd(t) {
  return _d(t, {
    $refStrategy: "none"
  });
}
class Sd {
  constructor(e = []) {
    ne(this, "entries", /* @__PURE__ */ new Map());
    ne(this, "schemas", []);
    e.forEach((n) => this.add(n));
  }
  add(e) {
    this.entries.has(e.name) || (this.entries.set(e.name, e), this.schemas.push({
      name: e.name,
      description: e.description,
      propsSchemaJson: vd(e.propsSchema)
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
const Ll = ki(null);
function Td({ children: t, value: e }) {
  return /* @__PURE__ */ p(Ll.Provider, { value: e, children: t });
}
function er() {
  const t = Ci(Ll);
  if (!t)
    throw new Error(
      "useChatContext must be used within ChatProvider. Make sure your component is wrapped with <ChatProvider>."
    );
  return t;
}
const Pl = ki(null);
function Ed({
  callId: t,
  status: e,
  source: n,
  isLatest: r,
  children: i
}) {
  return /* @__PURE__ */ p(
    Pl.Provider,
    {
      value: { callId: t, status: e, source: n, isLatest: r },
      children: i
    }
  );
}
function Rd() {
  return Ci(Pl);
}
function Nd() {
  const { onSubmit: t, onStopGeneration: e, isStreaming: n, chatStatus: r } = er();
  return {
    sendMessage: t,
    stopGeneration: e,
    isStreaming: n,
    chatStatus: r
  };
}
const Ad = Qn({
  label: Tt().optional().describe("Button label shown to the user. Keep short (≤ 32 chars)."),
  value: Tt().optional().describe(
    'Optional value sent back when this option is selected. Defaults to `label`. Use this when the visible label differs from the answer you want the agent to receive (e.g. label "Yes" → value "Yes, schedule the campaign for next Friday").'
  )
}), Id = $a([
  "single_choice",
  "multi_choice"
]), Md = Qn({
  id: Tt().optional().describe(
    "Stable identifier for this question. Optional — falls back to a positional id (q1, q2, …)."
  ),
  title: Tt().optional().describe(
    'The question text shown above the options (e.g. "Which campaign idea do you want to run next?").'
  ),
  type: Id.optional().describe(
    "single_choice = pick exactly one (radio). multi_choice = pick one or more (checkbox). Defaults to single_choice."
  ),
  options: Ua(Ad).optional().describe(
    "Reply options for this question. Provide 2–6 — fewer is not a meaningful choice; more hurts readability."
  ),
  helperText: Tt().optional().describe(
    'Hint shown inline after the bolded title (e.g. "Pick one", "Pick one or more"). Auto-derived from `type` when omitted.'
  ),
  allowFreeText: Hu().optional().describe(
    "When true, render a text input below the options where the user can type their own answer. For single_choice, the input is mutually exclusive with the radio picks (typing into the input deselects radios; picking a radio clears the input). For multi_choice, the typed text combines with any selected checkboxes on submit. Defaults to false."
  )
}), Od = Qn({
  prompt: Tt().optional().describe(
    "Optional intro shown above the questions. Plain text only."
  ),
  questions: Ua(Md).optional().describe(
    "One or more questions. When the agent provides several, the form steps through them one at a time (Back/Next navigation) and submits all answers together as a single message when the user clicks Submit on the final step."
  ),
  submitLabel: Tt().optional().describe('Label for the submit button. Defaults to "Submit".')
}), Ld = 6, Pd = "Type your answer here…";
function En(t, e) {
  var n;
  return ((n = t.id) == null ? void 0 : n.trim()) || `q${e + 1}`;
}
function Dd(t) {
  return t === "multi_choice" ? "Pick one or more" : "Pick one";
}
function Ba(t, e) {
  return (t == null ? void 0 : t.trim()) || `Option ${e + 1}`;
}
function Dl(t, e, n) {
  return (t == null ? void 0 : t.trim()) || Ba(e, n);
}
function Fd(t, e) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (Dl(r.value, r.label, n) === e)
      return Ba(r.label, n);
  }
  return e;
}
function zd(t, e) {
  return t && t.length > 0 ? t : e && e.length > 0 ? [
    {
      id: "q1",
      type: "single_choice",
      options: e
    }
  ] : [];
}
function Hd(t, e, n, r) {
  const i = [];
  return t != null && t.trim() && (i.push(t.trim()), i.push("")), e.forEach(({ question: a, qIndex: s }) => {
    var f;
    const o = En(a, s), l = a.type ?? "single_choice", c = n[o] ?? [], u = (r[o] ?? "").trim(), d = l === "multi_choice" ? [...c, ...u ? [u] : []] : c.length > 0 ? [...c] : u ? [u] : [];
    if (d.length === 0) return;
    const h = ((f = a.title) == null ? void 0 : f.trim()) || `Q${s + 1}`;
    i.push(`${h} ${d.join(", ")}`);
  }), i.join(`
`).trim();
}
function Ud(t) {
  const { prompt: e, questions: n, submitLabel: r } = t, i = t.options, { sendMessage: a, isStreaming: s } = Nd(), o = Rd(), [l, c] = Te({}), [u, d] = Te({}), [h, f] = Te(!1), [y, b] = Te(1), [T, k] = Te(() => /* @__PURE__ */ new Set()), S = fe(null), R = fe(y);
  Pe(() => {
    var $;
    y > R.current && (($ = S.current) == null || $.scrollIntoView({
      behavior: "smooth",
      block: "end"
    })), R.current = y;
  }, [y]);
  const P = (o == null ? void 0 : o.isLatest) ?? !0, D = zd(n, i), _ = D.map(($, j) => ({
    question: $,
    qIndex: j,
    opts: ($.options ?? []).slice(0, Ld)
  })).filter(
    ({ opts: $, question: j }) => $.length > 0 || j.allowFreeText === !0
  ), H = _.length, U = Math.max(
    1,
    Math.min(y, Math.max(H, 1))
  ), G = _.slice(0, U), J = H > 0 && U >= H, Z = h || !P;
  Pe(() => {
    if (Z || H === 0 || y >= H) return;
    const $ = _[y - 1];
    if (!$) return;
    const j = En($.question, $.qIndex), x = (l[j] ?? []).length > 0, X = (u[j] ?? "").trim().length > 0;
    (x || X) && b((V) => Math.min(V + 1, H));
  }, [l, u, Z, H, y]);
  const I = ($) => {
    const j = En($.question, $.qIndex), x = l[j] ?? [], X = (u[j] ?? "").trim();
    return x.length > 0 || X.length > 0;
  }, E = ($, j, x) => {
    if (Z) return;
    const X = En(D[$], $);
    c((V) => {
      if (j === "multi_choice") {
        const ue = V[X] ?? [], he = ue.includes(x) ? ue.filter((le) => le !== x) : [...ue, x];
        return { ...V, [X]: he };
      }
      return { ...V, [X]: [x] };
    }), j !== "multi_choice" && (d((V) => ({ ...V, [X]: "" })), k((V) => {
      if (!V.has(X)) return V;
      const ue = new Set(V);
      return ue.delete(X), ue;
    }));
  }, O = ($) => {
    if (Z) return;
    const j = En(D[$], $);
    k((x) => {
      if (x.has(j)) return x;
      const X = new Set(x);
      return X.add(j), X;
    });
  }, F = ($, j, x) => {
    if (Z) return;
    const X = En(D[$], $);
    d((V) => ({ ...V, [X]: x })), j !== "multi_choice" && c((V) => ({ ...V, [X]: [] }));
  }, q = Z || s || H === 0 || !J ? !1 : _.every(($) => ($.question.type ?? "single_choice") === "multi_choice" ? !0 : I($)), ce = () => {
    if (!q) return;
    const $ = Hd(
      e,
      _,
      l,
      u
    );
    $ && (f(!0), a($));
  };
  if (H === 0)
    return null;
  const re = ($) => {
    var He;
    const { question: j, qIndex: x, opts: X } = $, V = En(j, x), ue = j.type ?? "single_choice", he = ((He = j.helperText) == null ? void 0 : He.trim()) || Dd(ue), le = l[V] ?? [], _e = u[V] ?? "", Me = ue === "multi_choice" ? "chat-wrapper__ask-user-input-v0-option-indicator--checkbox" : "chat-wrapper__ask-user-input-v0-option-indicator--radio", ve = j.allowFreeText === !0 && (!Z || _e.trim().length > 0), be = !Z && ue === "single_choice" && le.length > 0 && !T.has(V);
    return /* @__PURE__ */ M(
      "div",
      {
        className: "chat-wrapper__ask-user-input-v0-question",
        "data-question-type": ue,
        "data-mode": be ? "summary" : "edit",
        children: [
          /* @__PURE__ */ M("p", { className: "chat-wrapper__ask-user-input-v0-question-title", children: [
            j.title ? /* @__PURE__ */ p("strong", { children: j.title }) : null,
            j.title && he ? " " : null,
            /* @__PURE__ */ p("span", { className: "chat-wrapper__ask-user-input-v0-helper", children: he })
          ] }),
          be ? /* @__PURE__ */ M(en, { children: [
            /* @__PURE__ */ M("p", { className: "chat-wrapper__ask-user-input-v0-summary-text", children: [
              "You selected: ",
              Fd(X, le[0])
            ] }),
            /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                className: "chat-wrapper__ask-user-input-v0-change-answer",
                onClick: () => O(x),
                children: "Change answer"
              }
            )
          ] }) : /* @__PURE__ */ M(en, { children: [
            X.length > 0 ? /* @__PURE__ */ p(
              "div",
              {
                className: "chat-wrapper__ask-user-input-v0-options",
                role: ue === "multi_choice" ? "group" : "radiogroup",
                children: X.map((Fe, Ne) => {
                  const Ft = Ba(Fe.label, Ne), Ct = Dl(Fe.value, Fe.label, Ne), gt = le.includes(Ct);
                  return /* @__PURE__ */ M(
                    "button",
                    {
                      type: "button",
                      className: `chat-wrapper__ask-user-input-v0-option${gt ? " chat-wrapper__ask-user-input-v0-option--picked" : ""}`,
                      disabled: Z,
                      role: ue === "multi_choice" ? "checkbox" : "radio",
                      "aria-checked": gt,
                      onClick: () => E(x, ue, Ct),
                      children: [
                        /* @__PURE__ */ p(
                          "span",
                          {
                            className: `chat-wrapper__ask-user-input-v0-option-indicator ${Me}`,
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ p("span", { className: "chat-wrapper__ask-user-input-v0-option-label", children: Ft })
                      ]
                    },
                    `${V}-${Ct}-${Ne}`
                  );
                })
              }
            ) : null,
            ve ? /* @__PURE__ */ p(
              "input",
              {
                type: "text",
                className: "chat-wrapper__ask-user-input-v0-free-text-input",
                value: _e,
                onChange: (Fe) => F(x, ue, Fe.target.value),
                placeholder: Pd,
                disabled: Z,
                "aria-label": j.title ? `Type your answer for: ${j.title}` : "Type your answer"
              }
            ) : null
          ] })
        ]
      },
      V
    );
  }, ge = Z;
  return /* @__PURE__ */ M(
    "div",
    {
      ref: S,
      className: "chat-wrapper__ask-user-input-v0",
      children: [
        e ? /* @__PURE__ */ p("p", { className: "chat-wrapper__ask-user-input-v0-prompt", children: e }) : null,
        (ge ? _ : G).map(re),
        !ge && J ? /* @__PURE__ */ p("div", { className: "chat-wrapper__ask-user-input-v0-actions", children: /* @__PURE__ */ p(
          "button",
          {
            type: "button",
            className: "chat-wrapper__ask-user-input-v0-submit",
            disabled: !q,
            onClick: ce,
            children: (r == null ? void 0 : r.trim()) || "Submit"
          }
        ) }) : null
      ]
    }
  );
}
function Xr(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function $d(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Fl(t) {
  let e, n, r;
  t.length !== 2 ? (e = Xr, n = (o, l) => Xr(t(o), l), r = (o, l) => t(o) - l) : (e = t === Xr || t === $d ? t : Bd, n = t, r = t);
  function i(o, l, c = 0, u = o.length) {
    if (c < u) {
      if (e(l, l) !== 0) return u;
      do {
        const d = c + u >>> 1;
        n(o[d], l) < 0 ? c = d + 1 : u = d;
      } while (c < u);
    }
    return c;
  }
  function a(o, l, c = 0, u = o.length) {
    if (c < u) {
      if (e(l, l) !== 0) return u;
      do {
        const d = c + u >>> 1;
        n(o[d], l) <= 0 ? c = d + 1 : u = d;
      } while (c < u);
    }
    return c;
  }
  function s(o, l, c = 0, u = o.length) {
    const d = i(o, l, c, u - 1);
    return d > c && r(o[d - 1], l) > -r(o[d], l) ? d - 1 : d;
  }
  return { left: i, center: s, right: a };
}
function Bd() {
  return 0;
}
function jd(t) {
  return t === null ? NaN : +t;
}
const Vd = Fl(Xr), Zd = Vd.right;
Fl(jd).center;
class Os extends Map {
  constructor(e, n = qd) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null) for (const [r, i] of e) this.set(r, i);
  }
  get(e) {
    return super.get(Ls(this, e));
  }
  has(e) {
    return super.has(Ls(this, e));
  }
  set(e, n) {
    return super.set(Wd(this, e), n);
  }
  delete(e) {
    return super.delete(Gd(this, e));
  }
}
function Ls({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function Wd({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function Gd({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) && (n = t.get(r), t.delete(r)), n;
}
function qd(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
const Kd = Math.sqrt(50), Xd = Math.sqrt(10), Yd = Math.sqrt(2);
function oi(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / Math.pow(10, i), s = a >= Kd ? 10 : a >= Xd ? 5 : a >= Yd ? 2 : 1;
  let o, l, c;
  return i < 0 ? (c = Math.pow(10, -i) / s, o = Math.round(t * c), l = Math.round(e * c), o / c < t && ++o, l / c > e && --l, c = -c) : (c = Math.pow(10, i) * s, o = Math.round(t / c), l = Math.round(e / c), o * c < t && ++o, l * c > e && --l), l < o && 0.5 <= n && n < 2 ? oi(t, e, n * 2) : [o, l, c];
}
function Jd(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, a, s] = r ? oi(e, t, n) : oi(t, e, n);
  if (!(a >= i)) return [];
  const o = a - i + 1, l = new Array(o);
  if (r)
    if (s < 0) for (let c = 0; c < o; ++c) l[c] = (a - c) / -s;
    else for (let c = 0; c < o; ++c) l[c] = (a - c) * s;
  else if (s < 0) for (let c = 0; c < o; ++c) l[c] = (i + c) / -s;
  else for (let c = 0; c < o; ++c) l[c] = (i + c) * s;
  return l;
}
function fa(t, e, n) {
  return e = +e, t = +t, n = +n, oi(t, e, n)[2];
}
function Qd(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? fa(e, t, n) : fa(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function eh(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, a = new Array(i); ++r < i; )
    a[r] = t + r * n;
  return a;
}
function ja(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
const Ps = Symbol("implicit");
function zl() {
  var t = new Os(), e = [], n = [], r = Ps;
  function i(a) {
    let s = t.get(a);
    if (s === void 0) {
      if (r !== Ps) return r;
      t.set(a, s = e.push(a) - 1);
    }
    return n[s % n.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return e.slice();
    e = [], t = new Os();
    for (const s of a)
      t.has(s) || t.set(s, e.push(s) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (n = Array.from(a), i) : n.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return zl(e, n).unknown(r);
  }, ja.apply(i, arguments), i;
}
function Hl() {
  var t = zl().unknown(void 0), e = t.domain, n = t.range, r = 0, i = 1, a, s, o = !1, l = 0, c = 0, u = 0.5;
  delete t.unknown;
  function d() {
    var h = e().length, f = i < r, y = f ? i : r, b = f ? r : i;
    a = (b - y) / Math.max(1, h - l + c * 2), o && (a = Math.floor(a)), y += (b - y - a * (h - l)) * u, s = a * (1 - l), o && (y = Math.round(y), s = Math.round(s));
    var T = eh(h).map(function(k) {
      return y + a * k;
    });
    return n(f ? T.reverse() : T);
  }
  return t.domain = function(h) {
    return arguments.length ? (e(h), d()) : e();
  }, t.range = function(h) {
    return arguments.length ? ([r, i] = h, r = +r, i = +i, d()) : [r, i];
  }, t.rangeRound = function(h) {
    return [r, i] = h, r = +r, i = +i, o = !0, d();
  }, t.bandwidth = function() {
    return s;
  }, t.step = function() {
    return a;
  }, t.round = function(h) {
    return arguments.length ? (o = !!h, d()) : o;
  }, t.padding = function(h) {
    return arguments.length ? (l = Math.min(1, c = +h), d()) : l;
  }, t.paddingInner = function(h) {
    return arguments.length ? (l = Math.min(1, h), d()) : l;
  }, t.paddingOuter = function(h) {
    return arguments.length ? (c = +h, d()) : c;
  }, t.align = function(h) {
    return arguments.length ? (u = Math.max(0, Math.min(1, h)), d()) : u;
  }, t.copy = function() {
    return Hl(e(), [r, i]).round(o).paddingInner(l).paddingOuter(c).align(u);
  }, ja.apply(d(), arguments);
}
function Va(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ul(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Or() {
}
var Tr = 0.7, li = 1 / Tr, $n = "\\s*([+-]?\\d+)\\s*", Er = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", nn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", th = /^#([0-9a-f]{3,8})$/, nh = new RegExp(`^rgb\\(${$n},${$n},${$n}\\)$`), rh = new RegExp(`^rgb\\(${nn},${nn},${nn}\\)$`), ih = new RegExp(`^rgba\\(${$n},${$n},${$n},${Er}\\)$`), ah = new RegExp(`^rgba\\(${nn},${nn},${nn},${Er}\\)$`), sh = new RegExp(`^hsl\\(${Er},${nn},${nn}\\)$`), oh = new RegExp(`^hsla\\(${Er},${nn},${nn},${Er}\\)$`), Ds = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Va(Or, Rr, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Fs,
  // Deprecated! Use color.formatHex.
  formatHex: Fs,
  formatHex8: lh,
  formatHsl: ch,
  formatRgb: zs,
  toString: zs
});
function Fs() {
  return this.rgb().formatHex();
}
function lh() {
  return this.rgb().formatHex8();
}
function ch() {
  return $l(this).formatHsl();
}
function zs() {
  return this.rgb().formatRgb();
}
function Rr(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = th.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Hs(e) : n === 3 ? new xt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Hr(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Hr(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = nh.exec(t)) ? new xt(e[1], e[2], e[3], 1) : (e = rh.exec(t)) ? new xt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ih.exec(t)) ? Hr(e[1], e[2], e[3], e[4]) : (e = ah.exec(t)) ? Hr(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = sh.exec(t)) ? Bs(e[1], e[2] / 100, e[3] / 100, 1) : (e = oh.exec(t)) ? Bs(e[1], e[2] / 100, e[3] / 100, e[4]) : Ds.hasOwnProperty(t) ? Hs(Ds[t]) : t === "transparent" ? new xt(NaN, NaN, NaN, 0) : null;
}
function Hs(t) {
  return new xt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Hr(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new xt(t, e, n, r);
}
function uh(t) {
  return t instanceof Or || (t = Rr(t)), t ? (t = t.rgb(), new xt(t.r, t.g, t.b, t.opacity)) : new xt();
}
function pa(t, e, n, r) {
  return arguments.length === 1 ? uh(t) : new xt(t, e, n, r ?? 1);
}
function xt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Va(xt, pa, Ul(Or, {
  brighter(t) {
    return t = t == null ? li : Math.pow(li, t), new xt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Tr : Math.pow(Tr, t), new xt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new xt(An(this.r), An(this.g), An(this.b), ci(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Us,
  // Deprecated! Use color.formatHex.
  formatHex: Us,
  formatHex8: dh,
  formatRgb: $s,
  toString: $s
}));
function Us() {
  return `#${Nn(this.r)}${Nn(this.g)}${Nn(this.b)}`;
}
function dh() {
  return `#${Nn(this.r)}${Nn(this.g)}${Nn(this.b)}${Nn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $s() {
  const t = ci(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${An(this.r)}, ${An(this.g)}, ${An(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ci(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function An(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Nn(t) {
  return t = An(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Bs(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Bt(t, e, n, r);
}
function $l(t) {
  if (t instanceof Bt) return new Bt(t.h, t.s, t.l, t.opacity);
  if (t instanceof Or || (t = Rr(t)), !t) return new Bt();
  if (t instanceof Bt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), a = Math.max(e, n, r), s = NaN, o = a - i, l = (a + i) / 2;
  return o ? (e === a ? s = (n - r) / o + (n < r) * 6 : n === a ? s = (r - e) / o + 2 : s = (e - n) / o + 4, o /= l < 0.5 ? a + i : 2 - a - i, s *= 60) : o = l > 0 && l < 1 ? 0 : s, new Bt(s, o, l, t.opacity);
}
function hh(t, e, n, r) {
  return arguments.length === 1 ? $l(t) : new Bt(t, e, n, r ?? 1);
}
function Bt(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Va(Bt, hh, Ul(Or, {
  brighter(t) {
    return t = t == null ? li : Math.pow(li, t), new Bt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Tr : Math.pow(Tr, t), new Bt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new xt(
      Pi(t >= 240 ? t - 240 : t + 120, i, r),
      Pi(t, i, r),
      Pi(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new Bt(js(this.h), Ur(this.s), Ur(this.l), ci(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ci(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${js(this.h)}, ${Ur(this.s) * 100}%, ${Ur(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function js(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ur(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Pi(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Za = (t) => () => t;
function fh(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ph(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function gh(t) {
  return (t = +t) == 1 ? Bl : function(e, n) {
    return n - e ? ph(e, n, t) : Za(isNaN(e) ? n : e);
  };
}
function Bl(t, e) {
  var n = e - t;
  return n ? fh(t, n) : Za(isNaN(t) ? e : t);
}
const Vs = function t(e) {
  var n = gh(e);
  function r(i, a) {
    var s = n((i = pa(i)).r, (a = pa(a)).r), o = n(i.g, a.g), l = n(i.b, a.b), c = Bl(i.opacity, a.opacity);
    return function(u) {
      return i.r = s(u), i.g = o(u), i.b = l(u), i.opacity = c(u), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function mh(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function yh(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function xh(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Wa(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s) a[s] = i[s](o);
    return a;
  };
}
function wh(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function ui(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function bh(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Wa(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var ga = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Di = new RegExp(ga.source, "g");
function kh(t) {
  return function() {
    return t;
  };
}
function Ch(t) {
  return function(e) {
    return t(e) + "";
  };
}
function _h(t, e) {
  var n = ga.lastIndex = Di.lastIndex = 0, r, i, a, s = -1, o = [], l = [];
  for (t = t + "", e = e + ""; (r = ga.exec(t)) && (i = Di.exec(e)); )
    (a = i.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (r = r[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, l.push({ i: s, x: ui(r, i) })), n = Di.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? l[0] ? Ch(l[0].x) : kh(e) : (e = l.length, function(c) {
    for (var u = 0, d; u < e; ++u) o[(d = l[u]).i] = d.x(c);
    return o.join("");
  });
}
function Wa(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? Za(e) : (n === "number" ? ui : n === "string" ? (r = Rr(e)) ? (e = r, Vs) : _h : e instanceof Rr ? Vs : e instanceof Date ? wh : yh(e) ? mh : Array.isArray(e) ? xh : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? bh : ui)(t, e);
}
function vh(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
function Sh(t) {
  return function() {
    return t;
  };
}
function Th(t) {
  return +t;
}
var Zs = [0, 1];
function Un(t) {
  return t;
}
function ma(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Sh(isNaN(e) ? NaN : 0.5);
}
function Eh(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Rh(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = ma(i, r), a = n(s, a)) : (r = ma(r, i), a = n(a, s)), function(o) {
    return a(r(o));
  };
}
function Nh(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = ma(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var l = Zd(t, o, 1, r) - 1;
    return a[l](i[l](o));
  };
}
function Ah(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Ih() {
  var t = Zs, e = Zs, n = Wa, r, i, a, s = Un, o, l, c;
  function u() {
    var h = Math.min(t.length, e.length);
    return s !== Un && (s = Eh(t[0], t[h - 1])), o = h > 2 ? Nh : Rh, l = c = null, d;
  }
  function d(h) {
    return h == null || isNaN(h = +h) ? a : (l || (l = o(t.map(r), e, n)))(r(s(h)));
  }
  return d.invert = function(h) {
    return s(i((c || (c = o(e, t.map(r), ui)))(h)));
  }, d.domain = function(h) {
    return arguments.length ? (t = Array.from(h, Th), u()) : t.slice();
  }, d.range = function(h) {
    return arguments.length ? (e = Array.from(h), u()) : e.slice();
  }, d.rangeRound = function(h) {
    return e = Array.from(h), n = vh, u();
  }, d.clamp = function(h) {
    return arguments.length ? (s = h ? !0 : Un, u()) : s !== Un;
  }, d.interpolate = function(h) {
    return arguments.length ? (n = h, u()) : n;
  }, d.unknown = function(h) {
    return arguments.length ? (a = h, d) : a;
  }, function(h, f) {
    return r = h, i = f, u();
  };
}
function Mh() {
  return Ih()(Un, Un);
}
function Oh(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function di(t, e) {
  if (!isFinite(t) || t === 0) return null;
  var n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e"), r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function Xn(t) {
  return t = di(Math.abs(t)), t ? t[1] : NaN;
}
function Lh(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, o = t[0], l = 0; i > 0 && o > 0 && (l + o + 1 > r && (o = Math.max(1, r - l)), a.push(n.substring(i -= o, i + o)), !((l += o + 1) > r)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function Ph(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Dh = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function hi(t) {
  if (!(e = Dh.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Ga({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
hi.prototype = Ga.prototype;
function Ga(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ga.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Fh(t) {
  e: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break e;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var fi;
function zh(t, e) {
  var n = di(t, e);
  if (!n) return fi = void 0, t.toPrecision(e);
  var r = n[0], i = n[1], a = i - (fi = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + di(t, Math.max(0, e + a - 1))[0];
}
function Ws(t, e) {
  var n = di(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Gs = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Oh,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Ws(t * 100, e),
  r: Ws,
  s: zh,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function qs(t) {
  return t;
}
var Ks = Array.prototype.map, Xs = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Hh(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? qs : Lh(Ks.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? qs : Ph(Ks.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", l = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(d, h) {
    d = hi(d);
    var f = d.fill, y = d.align, b = d.sign, T = d.symbol, k = d.zero, S = d.width, R = d.comma, P = d.precision, D = d.trim, _ = d.type;
    _ === "n" ? (R = !0, _ = "g") : Gs[_] || (P === void 0 && (P = 12), D = !0, _ = "g"), (k || f === "0" && y === "=") && (k = !0, f = "0", y = "=");
    var H = (h && h.prefix !== void 0 ? h.prefix : "") + (T === "$" ? n : T === "#" && /[boxX]/.test(_) ? "0" + _.toLowerCase() : ""), U = (T === "$" ? r : /[%p]/.test(_) ? s : "") + (h && h.suffix !== void 0 ? h.suffix : ""), G = Gs[_], J = /[defgprs%]/.test(_);
    P = P === void 0 ? 6 : /[gprs]/.test(_) ? Math.max(1, Math.min(21, P)) : Math.max(0, Math.min(20, P));
    function Z(I) {
      var E = H, O = U, F, q, ce;
      if (_ === "c")
        O = G(I) + O, I = "";
      else {
        I = +I;
        var re = I < 0 || 1 / I < 0;
        if (I = isNaN(I) ? l : G(Math.abs(I), P), D && (I = Fh(I)), re && +I == 0 && b !== "+" && (re = !1), E = (re ? b === "(" ? b : o : b === "-" || b === "(" ? "" : b) + E, O = (_ === "s" && !isNaN(I) && fi !== void 0 ? Xs[8 + fi / 3] : "") + O + (re && b === "(" ? ")" : ""), J) {
          for (F = -1, q = I.length; ++F < q; )
            if (ce = I.charCodeAt(F), 48 > ce || ce > 57) {
              O = (ce === 46 ? i + I.slice(F + 1) : I.slice(F)) + O, I = I.slice(0, F);
              break;
            }
        }
      }
      R && !k && (I = e(I, 1 / 0));
      var ge = E.length + I.length + O.length, w = ge < S ? new Array(S - ge + 1).join(f) : "";
      switch (R && k && (I = e(w + I, w.length ? S - O.length : 1 / 0), w = ""), y) {
        case "<":
          I = E + I + O + w;
          break;
        case "=":
          I = E + w + I + O;
          break;
        case "^":
          I = w.slice(0, ge = w.length >> 1) + E + I + O + w.slice(ge);
          break;
        default:
          I = w + E + I + O;
          break;
      }
      return a(I);
    }
    return Z.toString = function() {
      return d + "";
    }, Z;
  }
  function u(d, h) {
    var f = Math.max(-8, Math.min(8, Math.floor(Xn(h) / 3))) * 3, y = Math.pow(10, -f), b = c((d = hi(d), d.type = "f", d), { suffix: Xs[8 + f / 3] });
    return function(T) {
      return b(y * T);
    };
  }
  return {
    format: c,
    formatPrefix: u
  };
}
var $r, jl, Vl;
Uh({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Uh(t) {
  return $r = Hh(t), jl = $r.format, Vl = $r.formatPrefix, $r;
}
function $h(t) {
  return Math.max(0, -Xn(Math.abs(t)));
}
function Bh(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Xn(e) / 3))) * 3 - Xn(Math.abs(t)));
}
function jh(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Xn(e) - Xn(t)) + 1;
}
function Vh(t, e, n, r) {
  var i = Qd(t, e, n), a;
  switch (r = hi(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = Bh(i, s)) && (r.precision = a), Vl(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = jh(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = $h(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return jl(r);
}
function Zh(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Jd(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Vh(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], o = r[a], l, c, u = 10;
    for (o < s && (c = s, s = o, o = c, c = i, i = a, a = c); u-- > 0; ) {
      if (c = fa(s, o, n), c === l)
        return r[i] = s, r[a] = o, e(r);
      if (c > 0)
        s = Math.floor(s / c) * c, o = Math.ceil(o / c) * c;
      else if (c < 0)
        s = Math.ceil(s * c) / c, o = Math.floor(o * c) / c;
      else
        break;
      l = c;
    }
    return t;
  }, t;
}
function Zl() {
  var t = Mh();
  return t.copy = function() {
    return Ah(t, Zl());
  }, ja.apply(t, arguments), Zh(t);
}
const Wh = Qn({
  label: Tt().describe(
    'X-axis category or time-bucket label (e.g. "Mon", "Week 1", "Espresso"). Keep short — long labels are decimated to fit.'
  ),
  value: El().describe(
    "Y-axis numeric value for this datum. Negative values are supported."
  )
}), Gh = Qn({
  style: $a(["decimal", "currency", "percent"]).optional().describe(
    'Number-formatting style applied to y-axis ticks and tooltip value. Defaults to "decimal".'
  ),
  currency: Tt().optional().describe(
    'ISO-4217 currency code (e.g. "USD", "SGD"). Required when style === "currency".'
  ),
  maximumFractionDigits: El().int().min(0).max(4).optional().describe(
    "Maximum decimal places shown in formatted values. Defaults to 0 for decimal/currency, 1 for percent."
  )
}), qh = Qn({
  type: $a(["bar", "line"]).describe(
    '"bar" for category comparisons (counts, totals across discrete buckets) or "line" for trends over an ordered series (time, sequence). Pick line when the x-axis order is meaningful and continuous; bar when it is categorical.'
  ),
  title: Tt().optional().describe(
    'Optional bold title shown above the chart (e.g. "Reservations this week"). Plain text only.'
  ),
  subtitle: Tt().optional().describe(
    "Optional secondary line shown under the title (e.g. unit hint, date range). Plain text only."
  ),
  data: Ua(Wh).min(1).max(60).describe(
    "Single-series data points, in display order. Provide 1–60 datapoints."
  ),
  xAxisLabel: Tt().optional().describe("Optional caption shown beneath the x-axis."),
  yAxisLabel: Tt().optional().describe("Optional caption shown to the left of the y-axis."),
  valueFormat: Gh.optional().describe(
    'Controls how y-axis ticks and tooltip values are formatted. Use { style: "currency", currency: "SGD" } for money, { style: "percent" } for ratios (values are multiplied by 100 by Intl).'
  )
}), Ys = 480, Kh = 9 / 16, sn = { top: 16, right: 16, bottom: 36, left: 48 }, Js = 5, Xh = 8;
function Yh(t) {
  const e = (t == null ? void 0 : t.style) ?? "decimal", n = (t == null ? void 0 : t.maximumFractionDigits) ?? (e === "percent" ? 1 : 0), r = {
    style: e,
    maximumFractionDigits: n
  };
  e === "currency" && (r.currency = (t == null ? void 0 : t.currency) ?? "USD");
  try {
    return new Intl.NumberFormat(void 0, r);
  } catch {
    return new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 });
  }
}
function Jh(t) {
  return Array.isArray(t) ? t.filter(
    (e) => !!e && typeof e.label == "string" && typeof e.value == "number" && Number.isFinite(e.value)
  ) : [];
}
function Qh(t) {
  const e = ps(), n = ps(), r = t.type === "line" ? "line" : "bar", i = Ue(() => Jh(t.data), [t.data]), a = Ue(
    () => Yh(t.valueFormat),
    [t.valueFormat]
  ), s = fe(null), [o, l] = Te(Ys);
  uu(() => {
    const Z = s.current;
    if (!Z || typeof ResizeObserver > "u") return;
    const I = new ResizeObserver((E) => {
      const O = E[0];
      if (!O) return;
      const F = Math.max(240, Math.floor(O.contentRect.width));
      l(F);
    });
    return I.observe(Z), l(Math.max(240, Math.floor(Z.getBoundingClientRect().width) || Ys)), () => I.disconnect();
  }, []);
  const c = Math.round(o * Kh), u = Math.max(0, o - sn.left - sn.right), d = Math.max(0, c - sn.top - sn.bottom), h = i.map((Z) => Z.value), f = Math.min(0, ...h), y = Math.max(0, ...h), b = i.length ? f === y ? [f, y + 1] : [f, y] : [0, 1], T = Ue(
    () => Zl().domain(b).range([d, 0]).nice(Js),
    [b[0], b[1], d]
  ), k = Ue(
    () => Hl().domain(i.map((Z, I) => String(I))).range([0, u]).padding(r === "bar" ? 0.2 : 0.5),
    [i.length, u, r]
  ), S = T.ticks(Js), R = Math.max(1, Math.ceil(i.length / Xh)), P = T(0), [D, _] = Te(null);
  Pe(() => {
    D !== null && D >= i.length && _(null);
  }, [i.length, D]);
  function H(Z) {
    if (!i.length) return;
    const E = Z.currentTarget.getBoundingClientRect(), O = Z.clientX - E.left;
    if (E.width <= 0) return;
    const F = O / E.width, q = Math.min(
      i.length - 1,
      Math.max(0, Math.floor(F * i.length))
    );
    _(q);
  }
  function U() {
    _(null);
  }
  const G = D !== null ? i[D] : null, J = D !== null ? k(String(D)) + k.bandwidth() / 2 : 0;
  return i.length ? /* @__PURE__ */ M(
    "div",
    {
      ref: s,
      className: "chat-wrapper__chart-card-v0",
      "data-chart-type": r,
      children: [
        (t.title || t.subtitle) && /* @__PURE__ */ M("div", { className: "chat-wrapper__chart-card-v0-header", children: [
          t.title ? /* @__PURE__ */ p(
            "div",
            {
              id: e,
              className: "chat-wrapper__chart-card-v0-title",
              children: t.title
            }
          ) : null,
          t.subtitle ? /* @__PURE__ */ p(
            "div",
            {
              id: n,
              className: "chat-wrapper__chart-card-v0-subtitle",
              children: t.subtitle
            }
          ) : null
        ] }),
        /* @__PURE__ */ M("div", { className: "chat-wrapper__chart-card-v0-canvas", children: [
          /* @__PURE__ */ p(
            "svg",
            {
              className: "chat-wrapper__chart-card-v0-svg",
              width: o,
              height: c,
              viewBox: `0 0 ${o} ${c}`,
              role: "img",
              "aria-labelledby": t.title ? e : void 0,
              "aria-describedby": t.subtitle ? n : void 0,
              children: /* @__PURE__ */ M("g", { transform: `translate(${sn.left}, ${sn.top})`, children: [
                /* @__PURE__ */ M("g", { className: "chat-wrapper__chart-card-v0-axis chat-wrapper__chart-card-v0-axis--y", children: [
                  S.map((Z) => {
                    const I = T(Z);
                    return /* @__PURE__ */ M(
                      "g",
                      {
                        className: "chat-wrapper__chart-card-v0-tick",
                        transform: `translate(0, ${I})`,
                        children: [
                          /* @__PURE__ */ p(
                            "line",
                            {
                              className: "chat-wrapper__chart-card-v0-gridline",
                              x1: 0,
                              x2: u,
                              y1: 0,
                              y2: 0
                            }
                          ),
                          /* @__PURE__ */ p(
                            "text",
                            {
                              className: "chat-wrapper__chart-card-v0-tick-label chat-wrapper__chart-card-v0-tick-label--y",
                              x: -8,
                              y: 0,
                              dy: "0.32em",
                              textAnchor: "end",
                              children: a.format(Z)
                            }
                          )
                        ]
                      },
                      `y-${Z}`
                    );
                  }),
                  t.yAxisLabel ? /* @__PURE__ */ p(
                    "text",
                    {
                      className: "chat-wrapper__chart-card-v0-axis-label",
                      transform: `translate(-36, ${d / 2}) rotate(-90)`,
                      textAnchor: "middle",
                      children: t.yAxisLabel
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ M("g", { className: "chat-wrapper__chart-card-v0-axis chat-wrapper__chart-card-v0-axis--x", children: [
                  /* @__PURE__ */ p(
                    "line",
                    {
                      className: "chat-wrapper__chart-card-v0-axis-line",
                      x1: 0,
                      x2: u,
                      y1: P,
                      y2: P
                    }
                  ),
                  i.map((Z, I) => {
                    if (I % R !== 0) return null;
                    const E = k(String(I)) + k.bandwidth() / 2;
                    return /* @__PURE__ */ p(
                      "text",
                      {
                        className: "chat-wrapper__chart-card-v0-tick-label chat-wrapper__chart-card-v0-tick-label--x",
                        x: E,
                        y: d + 18,
                        textAnchor: "middle",
                        children: Z.label
                      },
                      `x-${I}`
                    );
                  }),
                  t.xAxisLabel ? /* @__PURE__ */ p(
                    "text",
                    {
                      className: "chat-wrapper__chart-card-v0-axis-label",
                      x: u / 2,
                      y: d + sn.bottom - 2,
                      textAnchor: "middle",
                      children: t.xAxisLabel
                    }
                  ) : null
                ] }),
                r === "bar" ? /* @__PURE__ */ p(
                  ef,
                  {
                    data: i,
                    xScale: k,
                    yScale: T,
                    baseY: P,
                    hoveredIndex: D,
                    onFocus: _,
                    onBlur: U,
                    describeValue: (Z) => `${Z.label}: ${a.format(Z.value)}`
                  }
                ) : /* @__PURE__ */ p(
                  tf,
                  {
                    data: i,
                    xScale: k,
                    yScale: T,
                    hoveredIndex: D,
                    onFocus: _,
                    onBlur: U,
                    describeValue: (Z) => `${Z.label}: ${a.format(Z.value)}`
                  }
                ),
                G ? /* @__PURE__ */ p(
                  "line",
                  {
                    className: "chat-wrapper__chart-card-v0-focus-line",
                    x1: J,
                    x2: J,
                    y1: 0,
                    y2: d
                  }
                ) : null,
                /* @__PURE__ */ p(
                  "rect",
                  {
                    className: "chat-wrapper__chart-card-v0-overlay",
                    x: 0,
                    y: 0,
                    width: u,
                    height: d,
                    fill: "transparent",
                    onPointerMove: H,
                    onPointerLeave: U
                  }
                )
              ] })
            }
          ),
          G ? /* @__PURE__ */ M(
            "div",
            {
              className: "chat-wrapper__chart-card-v0-tooltip",
              role: "tooltip",
              style: {
                left: sn.left + J,
                top: sn.top
              },
              children: [
                /* @__PURE__ */ p("div", { className: "chat-wrapper__chart-card-v0-tooltip-label", children: G.label }),
                /* @__PURE__ */ p("div", { className: "chat-wrapper__chart-card-v0-tooltip-value", children: a.format(G.value) })
              ]
            }
          ) : null
        ] }),
        /* @__PURE__ */ M("table", { className: "chat-wrapper__chart-card-v0-sr-table", children: [
          /* @__PURE__ */ M("caption", { children: [
            t.title ?? "Chart data",
            t.subtitle ? ` — ${t.subtitle}` : ""
          ] }),
          /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ M("tr", { children: [
            /* @__PURE__ */ p("th", { scope: "col", children: t.xAxisLabel ?? "Label" }),
            /* @__PURE__ */ p("th", { scope: "col", children: t.yAxisLabel ?? "Value" })
          ] }) }),
          /* @__PURE__ */ p("tbody", { children: i.map((Z, I) => /* @__PURE__ */ M("tr", { children: [
            /* @__PURE__ */ p("th", { scope: "row", children: Z.label }),
            /* @__PURE__ */ p("td", { children: a.format(Z.value) })
          ] }, `sr-${I}`)) })
        ] })
      ]
    }
  ) : /* @__PURE__ */ p(
    "div",
    {
      ref: s,
      className: "chat-wrapper__chart-card-v0 chat-wrapper__chart-card-v0--empty",
      role: "status",
      children: /* @__PURE__ */ M("div", { className: "chat-wrapper__chart-card-v0-empty-text", children: [
        t.title ? t.title : "Chart",
        /* @__PURE__ */ p("span", { className: "chat-wrapper__chart-card-v0-empty-hint", children: "(no data)" })
      ] })
    }
  );
}
function ef({
  data: t,
  xScale: e,
  yScale: n,
  baseY: r,
  hoveredIndex: i,
  onFocus: a,
  onBlur: s,
  describeValue: o
}) {
  const l = e.bandwidth();
  return /* @__PURE__ */ p("g", { className: "chat-wrapper__chart-card-v0-series chat-wrapper__chart-card-v0-series--bar", children: t.map((c, u) => {
    const d = e(String(u)) ?? 0, h = n(Math.max(0, c.value)), f = n(Math.min(0, c.value)), y = Math.max(0, f - h);
    return /* @__PURE__ */ p(
      "rect",
      {
        className: i === u ? "chat-wrapper__chart-card-v0-bar chat-wrapper__chart-card-v0-bar--active" : "chat-wrapper__chart-card-v0-bar",
        x: d,
        y: c.value >= 0 ? h : r,
        width: l,
        height: y,
        tabIndex: 0,
        role: "img",
        "aria-label": o(c),
        onFocus: () => a(u),
        onBlur: s,
        onMouseEnter: () => a(u)
      },
      `bar-${u}`
    );
  }) });
}
function tf({
  data: t,
  xScale: e,
  yScale: n,
  hoveredIndex: r,
  onFocus: i,
  onBlur: a,
  describeValue: s
}) {
  const o = t.map((c, u) => {
    const d = (e(String(u)) ?? 0) + e.bandwidth() / 2, h = n(c.value);
    return { cx: d, cy: h, datum: c, index: u };
  }), l = o.map((c, u) => `${u === 0 ? "M" : "L"} ${c.cx} ${c.cy}`).join(" ");
  return /* @__PURE__ */ M("g", { className: "chat-wrapper__chart-card-v0-series chat-wrapper__chart-card-v0-series--line", children: [
    /* @__PURE__ */ p("path", { className: "chat-wrapper__chart-card-v0-line", d: l }),
    o.map((c) => {
      const u = r === c.index;
      return /* @__PURE__ */ p(
        "circle",
        {
          className: u ? "chat-wrapper__chart-card-v0-point chat-wrapper__chart-card-v0-point--active" : "chat-wrapper__chart-card-v0-point",
          cx: c.cx,
          cy: c.cy,
          r: u ? 5 : 3,
          tabIndex: 0,
          role: "img",
          "aria-label": s(c.datum),
          onFocus: () => i(c.index),
          onBlur: a,
          onMouseEnter: () => i(c.index)
        },
        `pt-${c.index}`
      );
    })
  ] });
}
const nf = {
  name: "AskUserInputV0",
  description: 'Show a structured clarifying-question form with radio (single_choice) and/or checkbox (multi_choice) controls. Use whenever you would otherwise ask the user a small, well-defined set of clarifying questions before continuing — e.g. picking a campaign goal, confirming preferences, choosing a tone, narrowing an audience. Set `prompt` to an optional intro, list each question under `questions[]` with `title`, `type`, and `options[]` (2–6). Set `option.value` when the answer string sent back should differ from the visible `label`. Set `helperText` to override the default "Pick one" / "Pick one or more" hint shown inline after the title. Set `allowFreeText: true` on a question to render a text input below the options where the user can type their own answer in their own words; for single_choice the input is mutually exclusive with the radio picks (typing deselects radios), for multi_choice the typed text combines with any selected checkboxes. A question may use `allowFreeText: true` with no `options[]` to render as a pure text-input prompt. When you provide multiple `questions[]`, the form reveals them progressively inline: only the first question shows initially, and each subsequent question appears once the user picks an option or types into the input on the previous one. All revealed questions stay editable, so the user can change earlier answers before submitting. A single Submit button appears once every question is revealed and the required ones answered; clicking it sends all collected answers as a single message. The form locks after submit (the user cannot revise their answer); render a fresh AskUserInputV0 if you need a follow-up question. Do not use this for purely conversational free-form input or ranking interactions.',
  propsSchema: Od,
  component: Ud
}, rf = {
  name: "ChartCardV0",
  description: 'Render a single-series bar or line chart inline in chat. Use for short numeric summaries (1–60 datapoints) such as daily counts, comparisons across categories, or a trend over an ordered series. Pick `type: "bar"` for category comparisons (counts, totals across discrete buckets) and `type: "line"` when the x-axis order is meaningful and continuous (e.g. days, weeks). Provide each datapoint under `data[]` with `label` (x-axis category/bucket name, kept short — long labels are decimated) and `value` (numeric; negative supported). Set `title`/`subtitle` for context (plain text, no markdown). Use `valueFormat` to control how y-axis ticks and the hover tooltip format the value: `{ style: "currency", currency: "SGD" }` for money, `{ style: "percent" }` for ratios (Intl multiplies by 100). Set `xAxisLabel`/`yAxisLabel` only when units are not obvious from the data. The card is display-only — the user reads the chart and continues the conversation in prose; do not use this when you need an answer back from the user.',
  propsSchema: qh,
  component: Qh
}, af = [
  nf,
  rf
];
function sf(t) {
  return [...t ?? [], ...af];
}
const of = {
  maxReconnectAttempts: 1 / 0,
  reconnectDelay: 1e3,
  heartbeatInterval: 3e4
}, Br = {
  NORMAL: 1e3,
  // Normal closure
  GOING_AWAY: 1001
};
var Ot = /* @__PURE__ */ ((t) => (t.CONNECTION_ESTABLISHED = "connection_established", t.CONNECTION_LOST = "connection_lost", t.CONNECTION_RESTORED = "connection_restored", t.CONNECTION_FAILED = "connection_failed", t.RECONNECTING = "reconnecting", t.CHAT_COMPLETED = "chat_completed", t.CHAT_ERROR = "chat_error", t))(Ot || {}), qt = /* @__PURE__ */ ((t) => (t.CHAT_MESSAGE = "chat_message", t.CONFIGURE_TOOLS = "configure_tools", t.UPDATE_TOOLS = "update_tools", t.UPDATE_CONTEXT_HELPERS = "update_context_helpers", t.TOOL_CALL_RESPONSE = "tool_call_response", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_PONG = "heartbeat_pong", t.STOP_RUN = "stop_run", t))(qt || {}), it = /* @__PURE__ */ ((t) => (t.SESSION_ESTABLISHED = "session_established", t.TOOLS_CONFIGURED = "tools_configured", t.CLIENT_TOOLS_UPDATED = "client_tools_updated", t.CONFIGURE_TOOLS = "configure_tools", t.CHAT_EVENT = "chat_event", t.CHAT_FINISHED = "chat_finished", t.CHAT_ERROR = "chat_error", t.MESSAGES_PERSISTED = "messages_persisted", t.THREAD_CREATED = "thread_created", t.TOOL_CALL_REQUEST = "tool_call_request", t.UI_COMPONENT = "ui_component", t.HEARTBEAT_PING = "heartbeat_ping", t.HEARTBEAT_ACK = "heartbeat_ack", t.ERROR = "error", t))(it || {}), Yr = /* @__PURE__ */ ((t) => (t.PROVIDER_EVENT = "provider-event", t.LATITUDE_EVENT = "latitude-event", t.CONTENT_DELTA = "content-delta", t))(Yr || {}), pn = /* @__PURE__ */ ((t) => (t.TEXT_DELTA = "text-delta", t.REASONING_START = "reasoning-start", t.REASONING_DELTA = "reasoning-delta", t.REASONING_END = "reasoning-end", t.TOOL_CALL = "tool-call", t.TOOL_RESULT = "tool-result", t))(pn || {});
class Bn {
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
    return this.createConnectionEvent(Ot.CONNECTION_ESTABLISHED);
  }
  static connectionLost(e) {
    return this.createConnectionEvent(Ot.CONNECTION_LOST, { reason: e });
  }
  static connectionRestored() {
    return this.createConnectionEvent(Ot.CONNECTION_RESTORED);
  }
  static reconnecting(e, n) {
    return this.createConnectionEvent(Ot.RECONNECTING, { attempt: e, maxAttempts: n });
  }
  static chatCompleted(e) {
    return this.createChatEvent(Ot.CHAT_COMPLETED, { conversationId: e });
  }
  static chatError(e, n) {
    return this.createChatEvent(Ot.CHAT_ERROR, { error: e, errorCode: n });
  }
}
class ln {
  /**
   * Create a chat message to send to the server
   */
  static createChatMessage(e) {
    return {
      type: qt.CHAT_MESSAGE,
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
      type: qt.CONFIGURE_TOOLS,
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
      type: qt.UPDATE_TOOLS,
      toolSchemas: e,
      generativeComponents: n
    };
  }
  /**
   * Create an update context helpers message
   */
  static createUpdateContextHelpersMessage(e) {
    return {
      type: qt.UPDATE_CONTEXT_HELPERS,
      contextHelpers: e
    };
  }
  /**
   * Create a successful tool call response
   */
  static createToolCallSuccessResponse(e, n) {
    return {
      type: qt.TOOL_CALL_RESPONSE,
      callId: e,
      result: n
    };
  }
  /**
   * Create an error tool call response
   */
  static createToolCallErrorResponse(e, n) {
    return {
      type: qt.TOOL_CALL_RESPONSE,
      callId: e,
      error: n
    };
  }
  /**
   * Create a heartbeat ping message
   */
  static createHeartbeatPing() {
    return {
      type: qt.HEARTBEAT_PING,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      pingTime: Date.now()
    };
  }
  /**
   * Create a heartbeat pong response
   */
  static createHeartbeatPong(e, n) {
    return {
      type: qt.HEARTBEAT_PONG,
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
      type: qt.STOP_RUN,
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
class lf {
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
      NORMAL: Br.NORMAL,
      GOING_AWAY: Br.GOING_AWAY
    }), this.intentionalDisconnect)
      return console.log("[WebSocketManager] Intentional disconnect - no reconnect"), !1;
    const { NORMAL: n } = Br, r = e !== n;
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
        Bn.connectionLost("Max reconnection attempts reached")
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
    }), (o = this.onSystemEvent) == null || o.call(this, Bn.reconnecting(e, n));
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
    this.updateConnectionState(!0, !1), this.justRefreshedTicket = !1, this.startHeartbeat(), (e = this.onSystemEvent) == null || e.call(this, Bn.connectionRestored()), (n = this.onOpen) == null || n.call(this);
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
    const e = ln.serializeHeartbeatPing();
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
    this.ws && this.ws.close(Br.NORMAL);
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
class cf {
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
class pi {
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
class Wl {
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
class uf extends Wl {
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
    const l = pi.createReasoningCall(
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
const df = "render_ui";
class hf extends Wl {
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
      if (this.processedToolCalls.add(r), i === df) {
        this.sendToolResponse(r, { rendered: !0 });
        return;
      }
      (s = this.getHandler("onReasoningUpdate")) == null || s(!0, `${pe.HANDLING_MARKER} ${i}`, n);
      try {
        const c = await this.executeToolFunction(i, a);
        this.sendToolResponse(r, c), (o = this.getHandler("onReasoningUpdate")) == null || o(!1, `${pe.COMPLETED_MARKER} ${i}`, n);
      } catch (c) {
        this.sendToolError(r, c), (l = this.getHandler("onReasoningUpdate")) == null || l(!1, `${pe.ERROR_MARKER} Error: ${i} - ${c}`, n);
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
    const i = ln.serializeToolCallSuccess(n, r);
    this.sendMessage(i);
  }
  sendToolError(n, r) {
    if (!this.sendMessage)
      return;
    const i = r instanceof Error ? r.message : "Unknown error", a = ln.serializeToolCallError(n, i);
    this.sendMessage(a);
  }
  handleServerToolCall(n) {
    var i;
    const r = this.getHandler("onReasoningUpdate");
    if (r && ((i = n.toolName) != null && i.startsWith("lat_")) && n.toolCallId) {
      const a = pi.createLatitudeToolCall(
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
      const a = pi.createLatitudeToolCall(
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
class ff {
  constructor(e, n = {}) {
    ne(this, "reasoningHandler");
    ne(this, "toolHandler");
    ne(this, "handlers");
    ne(this, "sendMessage");
    this.handlers = e, this.reasoningHandler = new uf(e.onReasoningUpdate), this.toolHandler = new hf(
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
      case Yr.PROVIDER_EVENT:
        this.handleProviderEvent(e);
        break;
      case Yr.LATITUDE_EVENT:
        this.handleLatitudeEvent(e);
        break;
      case Yr.CONTENT_DELTA:
        (n = e.data) != null && n.delta && ((i = (r = this.handlers).onSetMessage) == null || i.call(r, e.data.delta));
        break;
    }
  }
  handleProviderEvent(e) {
    var r, i, a;
    switch ((r = e.data) == null ? void 0 : r.type) {
      case pn.TEXT_DELTA:
        e.data.textDelta && ((a = (i = this.handlers).onSetMessage) == null || a.call(i, e.data.textDelta));
        break;
      case pn.REASONING_START:
        this.reasoningHandler.handleReasoningStart(e.data);
        break;
      case pn.REASONING_DELTA:
        this.reasoningHandler.handleReasoningDelta(e.data);
        break;
      case pn.REASONING_END:
        this.reasoningHandler.handleReasoningEnd(e.data);
        break;
      case pn.TOOL_CALL:
        this.toolHandler.handleServerToolCall(e.data);
        break;
      case pn.TOOL_RESULT:
        this.toolHandler.handleServerToolResult(e.data);
        break;
    }
  }
  handleLatitudeEvent(e) {
    var n;
    if (((n = e.data) == null ? void 0 : n.type) === pn.TOOL_RESULT && this.handlers.onReasoningUpdate) {
      const r = e.data;
      if (r.toolCallId && r.toolName) {
        const i = pi.createServerToolCall(
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
    (r = (n = this.handlers).onSystemEvent) == null || r.call(n, Bn.chatCompleted(e.uuid));
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
      Bn.chatError(e.error || "Unknown error")
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
    const n = ln.serializeHeartbeatPong(
      e.timestamp,
      e.pingTime
    );
    this.sendMessage(n);
  }
  handleError(e) {
    var n, r;
    (r = (n = this.handlers).onSystemEvent) == null || r.call(
      n,
      Bn.chatError(e.error || "Unknown WebSocket error")
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
async function pf(t, e, n = 1e4) {
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
function ya(t) {
  if (!t.success || !t.ticket || !t.expiresAt)
    return !1;
  const e = new Date(t.expiresAt).getTime();
  return Date.now() < e - 3e4;
}
function Qs(t) {
  const e = ya(t), n = new Date(t.expiresAt).getTime(), r = Date.now(), i = Math.max(
    0,
    Math.floor((n - r) / 1e3)
  );
  return {
    isValid: e,
    expiresIn: i,
    expired: r >= n
  };
}
async function gf(t, e, n, r) {
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
function mf(t) {
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
function Yn(t, e) {
  const n = mf(t);
  return console.error(`[${e}] Error occurred:`, {
    error: (t == null ? void 0 : t.message) || t,
    classification: n,
    shouldRetry: n.isRetryable
  }), n;
}
class yf {
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
    return this.ticket && ya(this.ticket) ? (console.log("TicketManager: Using existing valid ticket"), this.ticket.ticket) : (console.log("TicketManager: No valid ticket, refreshing..."), this.refreshTicket());
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
        return this.ticket = await pf(
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
        const a = Yn(i, "TicketManager");
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
      const r = Qs(this.ticket).expiresIn / 1e3;
      r < this.config.renewalThreshold && (console.log(
        `TicketManager: Ticket expires in ${r.toFixed(
          0
        )}s, renewing...`
      ), await this.refreshTicket(), console.log("TicketManager: Ticket renewed proactively"), e == null || e());
    } catch (n) {
      const r = Yn(
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
    return this.ticket ? ya(this.ticket) : !1;
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
      const e = await gf(
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
        return Qs(this.ticket).expiresIn;
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
async function xf(t, e, n) {
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
async function wf(t, e, n, r) {
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
async function bf(t, e, n, r) {
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
class kf {
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
      ...of
    }, this.connectionState = new cf(), this.wsManager = new lf(this.config, this.connectionState), this.messageHandler = new ff({}), this.setupWebSocketHandlers();
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
      Yn(i, "TicketRefresh").isRetryable, (s = this.initReject) == null || s.call(this, i);
    }) : (r = this.initReject) == null || r.call(
      this,
      new Error(`Authentication failed: ${n == null ? void 0 : n.error}`)
    );
  }
  sendToolConfiguration() {
    const e = ln.serializeConfigureTools(
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
    }, this.ticketManager = new yf(
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
      const l = ln.serializeChatMessage({
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
    const n = ln.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(n);
  }
  addClientTools(e, n) {
    this.messageHandler.updateClientTools(e), n && (this.toolSchemas = [...this.toolSchemas, ...n]);
    const r = ln.serializeUpdateTools(
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
    const n = ln.serializeStopRun(e);
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
      await wf(
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
      await bf(
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
function Cf({
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
  onSystemEvent: c,
  onReasoningUpdate: u,
  onUIComponent: d,
  onThreadCreated: h,
  onMessagesPersisted: f,
  onError: y
}) {
  const [b, T] = Te(
    null
  ), [k, S] = Te(
    Je.DISCONNECTED
  ), [R, P] = Te(0), [D, _] = Te(!0), H = fe(null), U = fe(l), G = fe(c), J = fe(u), Z = fe(d), I = fe(h), E = fe(f), O = fe(t), F = fe(e), q = fe(n), ce = fe(r), re = fe(i), ge = fe(a), w = fe(a);
  Pe(() => {
    JSON.stringify(a) !== JSON.stringify(ge.current) && (ge.current = a, w.current = a);
  }, [a]);
  const $ = fe(
    s
  ), j = fe(
    s
  );
  Pe(() => {
    JSON.stringify(s) !== JSON.stringify($.current) && ($.current = s, j.current = s);
  }, [s]);
  const x = fe(o), X = fe(
    o
  );
  Pe(() => {
    JSON.stringify(o) !== JSON.stringify(x.current) && (x.current = o, X.current = o, H.current && o && H.current.updateContextHelpers(o));
  }, [o]), Pe(() => {
    U.current = l, G.current = c, J.current = u, Z.current = d, I.current = h, E.current = f, O.current = t, F.current = e, q.current = n, ce.current = r, re.current = i;
  }, [
    l,
    c,
    u,
    d,
    h,
    f,
    t,
    e,
    n,
    r,
    i
  ]);
  const V = Ue(() => {
    const ve = w.current;
    return ve && ve.length > 0 ? ve.map(({ execute: be, ...He }) => He) : [];
  }, [w.current]), ue = Ue(() => {
    if (a && a.length > 0) {
      const ve = {};
      return a.forEach((be) => {
        ve[be.name] = be.execute;
      }), ve;
    }
    return {};
  }, [a]);
  Pe(() => {
    H.current && Object.keys(ue).length > 0 && H.current.updateClientTools(ue);
  }, [ue]);
  const he = fe(), le = de(async () => {
    var ve;
    try {
      if (!navigator.onLine)
        throw S(Je.DISCONNECTED), _(!1), new Error("No internet connection. Please check your network and try again.");
      if (S(Je.CONNECTING), !O.current)
        throw new Error("userMpAuthToken is required");
      if (!F.current)
        throw new Error("chatServerUrl is required");
      if (!q.current)
        throw new Error("chatServerKey is required");
      const be = new kf();
      H.current = be, T(be);
      const He = X.current || {};
      await be.onInit({
        // Authentication and server properties (from refs)
        userMpAuthToken: O.current,
        chatServerUrl: F.current,
        chatServerKey: q.current,
        entityId: ce.current,
        entityType: (ve = re.current) == null ? void 0 : ve.toString(),
        // Tools configuration
        toolSchemas: V,
        clientTools: ue,
        componentSchemas: j.current,
        contextHelpers: He,
        onSetMessage: U.current,
        onSystemEvent: G.current,
        onReasoningUpdate: J.current,
        onUIComponent: (Fe) => {
          var Ne;
          return (Ne = Z.current) == null ? void 0 : Ne.call(Z, Fe);
        },
        onThreadCreated: I.current,
        onMessagesPersisted: E.current,
        onError: y
      }), S(Je.CONNECTED), _(!1);
    } catch (be) {
      const He = Yn(be, "WebSocketConnection");
      S(Je.DISCONNECTED), He.isRetryable ? setTimeout(() => {
        var Fe;
        (H.current === null || !H.current.getConnectionStatus().connected) && ((Fe = he.current) == null || Fe.call(he));
      }, 2e3) : _(!1);
    }
  }, [
    V,
    ue
    // All other props use refs to prevent reconnections
    // connectChatClient only recreates when tools change
  ]), _e = de(() => {
    H.current && (H.current.disconnect(), H.current = null), T(null), S(Je.DISCONNECTED);
  }, []);
  he.current = le;
  const Me = fe(!1);
  return Pe(() => (Me.current || (Me.current = !0, le()), () => {
    _e();
  }), []), Pe(() => {
    const ve = setInterval(() => {
      if (H.current) {
        const be = H.current.getConnectionStatus();
        if (D && k === Je.CONNECTING)
          return;
        be.connected && k !== Je.CONNECTED ? S(Je.CONNECTED) : be.isReconnecting && k !== Je.RECONNECTING ? S(Je.RECONNECTING) : !be.connected && !be.isReconnecting && k !== Je.DISCONNECTED && S(Je.DISCONNECTED), P(be.reconnectAttempts);
      }
    }, 1e3);
    return () => clearInterval(ve);
  }, [k, D]), {
    chatClient: b,
    connectionState: k,
    reconnectAttempts: R,
    isInitialConnection: D,
    connectChatClient: le,
    disconnectChatClient: _e
  };
}
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries: Gl,
  setPrototypeOf: eo,
  isFrozen: _f,
  getPrototypeOf: vf,
  getOwnPropertyDescriptor: Sf
} = Object;
let {
  freeze: ht,
  seal: Pt,
  create: xa
} = Object, {
  apply: wa,
  construct: ba
} = typeof Reflect < "u" && Reflect;
ht || (ht = function(e) {
  return e;
});
Pt || (Pt = function(e) {
  return e;
});
wa || (wa = function(e, n) {
  for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++)
    i[a - 2] = arguments[a];
  return e.apply(n, i);
});
ba || (ba = function(e) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  return new e(...r);
});
const jr = ft(Array.prototype.forEach), Tf = ft(Array.prototype.lastIndexOf), to = ft(Array.prototype.pop), ur = ft(Array.prototype.push), Ef = ft(Array.prototype.splice), Jr = ft(String.prototype.toLowerCase), Fi = ft(String.prototype.toString), zi = ft(String.prototype.match), dr = ft(String.prototype.replace), Rf = ft(String.prototype.indexOf), Nf = ft(String.prototype.trim), Ut = ft(Object.prototype.hasOwnProperty), dt = ft(RegExp.prototype.test), hr = Af(TypeError);
function ft(t) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    return wa(t, e, r);
  };
}
function Af(t) {
  return function() {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
      n[r] = arguments[r];
    return ba(t, n);
  };
}
function Re(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Jr;
  eo && eo(t, null);
  let r = e.length;
  for (; r--; ) {
    let i = e[r];
    if (typeof i == "string") {
      const a = n(i);
      a !== i && (_f(e) || (e[r] = a), i = a);
    }
    t[i] = !0;
  }
  return t;
}
function If(t) {
  for (let e = 0; e < t.length; e++)
    Ut(t, e) || (t[e] = null);
  return t;
}
function on(t) {
  const e = xa(null);
  for (const [n, r] of Gl(t))
    Ut(t, n) && (Array.isArray(r) ? e[n] = If(r) : r && typeof r == "object" && r.constructor === Object ? e[n] = on(r) : e[n] = r);
  return e;
}
function fr(t, e) {
  for (; t !== null; ) {
    const r = Sf(t, e);
    if (r) {
      if (r.get)
        return ft(r.get);
      if (typeof r.value == "function")
        return ft(r.value);
    }
    t = vf(t);
  }
  function n() {
    return null;
  }
  return n;
}
const no = ht(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Hi = ht(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ui = ht(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Mf = ht(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), $i = ht(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Of = ht(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), ro = ht(["#text"]), io = ht(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Bi = ht(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ao = ht(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Vr = ht(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Lf = Pt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Pf = Pt(/<%[\w\W]*|[\w\W]*%>/gm), Df = Pt(/\$\{[\w\W]*/gm), Ff = Pt(/^data-[\-\w.\u00B7-\uFFFF]+$/), zf = Pt(/^aria-[\-\w]+$/), ql = Pt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Hf = Pt(/^(?:\w+script|data):/i), Uf = Pt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Kl = Pt(/^html$/i), $f = Pt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var so = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: zf,
  ATTR_WHITESPACE: Uf,
  CUSTOM_ELEMENT: $f,
  DATA_ATTR: Ff,
  DOCTYPE_NAME: Kl,
  ERB_EXPR: Pf,
  IS_ALLOWED_URI: ql,
  IS_SCRIPT_OR_DATA: Hf,
  MUSTACHE_EXPR: Lf,
  TMPLIT_EXPR: Df
});
const pr = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Bf = function() {
  return typeof window > "u" ? null : window;
}, jf = function(e, n) {
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
}, oo = function() {
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
function Xl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Bf();
  const e = (Y) => Xl(Y);
  if (e.version = "3.3.0", e.removed = [], !t || !t.document || t.document.nodeType !== pr.document || !t.Element)
    return e.isSupported = !1, e;
  let {
    document: n
  } = t;
  const r = n, i = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: s,
    Node: o,
    Element: l,
    NodeFilter: c,
    NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: h,
    trustedTypes: f
  } = t, y = l.prototype, b = fr(y, "cloneNode"), T = fr(y, "remove"), k = fr(y, "nextSibling"), S = fr(y, "childNodes"), R = fr(y, "parentNode");
  if (typeof s == "function") {
    const Y = n.createElement("template");
    Y.content && Y.content.ownerDocument && (n = Y.content.ownerDocument);
  }
  let P, D = "";
  const {
    implementation: _,
    createNodeIterator: H,
    createDocumentFragment: U,
    getElementsByTagName: G
  } = n, {
    importNode: J
  } = r;
  let Z = oo();
  e.isSupported = typeof Gl == "function" && typeof R == "function" && _ && _.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: I,
    ERB_EXPR: E,
    TMPLIT_EXPR: O,
    DATA_ATTR: F,
    ARIA_ATTR: q,
    IS_SCRIPT_OR_DATA: ce,
    ATTR_WHITESPACE: re,
    CUSTOM_ELEMENT: ge
  } = so;
  let {
    IS_ALLOWED_URI: w
  } = so, $ = null;
  const j = Re({}, [...no, ...Hi, ...Ui, ...$i, ...ro]);
  let x = null;
  const X = Re({}, [...io, ...Bi, ...ao, ...Vr]);
  let V = Object.seal(xa(null, {
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
  })), ue = null, he = null;
  const le = Object.seal(xa(null, {
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
  let _e = !0, Me = !0, ve = !1, be = !0, He = !1, Fe = !0, Ne = !1, Ft = !1, Ct = !1, gt = !1, Vt = !1, Zt = !1, Cn = !0, _n = !1;
  const rr = "user-content-";
  let vn = !0, Wt = !1, N = {}, A = null;
  const ee = Re({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let xe = null;
  const Se = Re({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ge = null;
  const Nt = Re({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), at = "http://www.w3.org/1998/Math/MathML", At = "http://www.w3.org/2000/svg", nt = "http://www.w3.org/1999/xhtml";
  let Ce = nt, et = !1, st = null;
  const un = Re({}, [at, At, nt], Fi);
  let Sn = Re({}, ["mi", "mo", "mn", "ms", "mtext"]), dn = Re({}, ["annotation-xml"]);
  const Ni = Re({}, ["title", "style", "font", "a", "script"]);
  let It = null;
  const Ln = ["application/xhtml+xml", "text/html"], ir = "text/html";
  let Ke = null, hn = null;
  const Ai = n.createElement("form"), ar = function(C) {
    return C instanceof RegExp || C instanceof Function;
  }, Pn = function() {
    let C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(hn && hn === C)) {
      if ((!C || typeof C != "object") && (C = {}), C = on(C), It = // eslint-disable-next-line unicorn/prefer-includes
      Ln.indexOf(C.PARSER_MEDIA_TYPE) === -1 ? ir : C.PARSER_MEDIA_TYPE, Ke = It === "application/xhtml+xml" ? Fi : Jr, $ = Ut(C, "ALLOWED_TAGS") ? Re({}, C.ALLOWED_TAGS, Ke) : j, x = Ut(C, "ALLOWED_ATTR") ? Re({}, C.ALLOWED_ATTR, Ke) : X, st = Ut(C, "ALLOWED_NAMESPACES") ? Re({}, C.ALLOWED_NAMESPACES, Fi) : un, Ge = Ut(C, "ADD_URI_SAFE_ATTR") ? Re(on(Nt), C.ADD_URI_SAFE_ATTR, Ke) : Nt, xe = Ut(C, "ADD_DATA_URI_TAGS") ? Re(on(Se), C.ADD_DATA_URI_TAGS, Ke) : Se, A = Ut(C, "FORBID_CONTENTS") ? Re({}, C.FORBID_CONTENTS, Ke) : ee, ue = Ut(C, "FORBID_TAGS") ? Re({}, C.FORBID_TAGS, Ke) : on({}), he = Ut(C, "FORBID_ATTR") ? Re({}, C.FORBID_ATTR, Ke) : on({}), N = Ut(C, "USE_PROFILES") ? C.USE_PROFILES : !1, _e = C.ALLOW_ARIA_ATTR !== !1, Me = C.ALLOW_DATA_ATTR !== !1, ve = C.ALLOW_UNKNOWN_PROTOCOLS || !1, be = C.ALLOW_SELF_CLOSE_IN_ATTR !== !1, He = C.SAFE_FOR_TEMPLATES || !1, Fe = C.SAFE_FOR_XML !== !1, Ne = C.WHOLE_DOCUMENT || !1, gt = C.RETURN_DOM || !1, Vt = C.RETURN_DOM_FRAGMENT || !1, Zt = C.RETURN_TRUSTED_TYPE || !1, Ct = C.FORCE_BODY || !1, Cn = C.SANITIZE_DOM !== !1, _n = C.SANITIZE_NAMED_PROPS || !1, vn = C.KEEP_CONTENT !== !1, Wt = C.IN_PLACE || !1, w = C.ALLOWED_URI_REGEXP || ql, Ce = C.NAMESPACE || nt, Sn = C.MATHML_TEXT_INTEGRATION_POINTS || Sn, dn = C.HTML_INTEGRATION_POINTS || dn, V = C.CUSTOM_ELEMENT_HANDLING || {}, C.CUSTOM_ELEMENT_HANDLING && ar(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (V.tagNameCheck = C.CUSTOM_ELEMENT_HANDLING.tagNameCheck), C.CUSTOM_ELEMENT_HANDLING && ar(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (V.attributeNameCheck = C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), C.CUSTOM_ELEMENT_HANDLING && typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (V.allowCustomizedBuiltInElements = C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), He && (Me = !1), Vt && (gt = !0), N && ($ = Re({}, ro), x = [], N.html === !0 && (Re($, no), Re(x, io)), N.svg === !0 && (Re($, Hi), Re(x, Bi), Re(x, Vr)), N.svgFilters === !0 && (Re($, Ui), Re(x, Bi), Re(x, Vr)), N.mathMl === !0 && (Re($, $i), Re(x, ao), Re(x, Vr))), C.ADD_TAGS && (typeof C.ADD_TAGS == "function" ? le.tagCheck = C.ADD_TAGS : ($ === j && ($ = on($)), Re($, C.ADD_TAGS, Ke))), C.ADD_ATTR && (typeof C.ADD_ATTR == "function" ? le.attributeCheck = C.ADD_ATTR : (x === X && (x = on(x)), Re(x, C.ADD_ATTR, Ke))), C.ADD_URI_SAFE_ATTR && Re(Ge, C.ADD_URI_SAFE_ATTR, Ke), C.FORBID_CONTENTS && (A === ee && (A = on(A)), Re(A, C.FORBID_CONTENTS, Ke)), vn && ($["#text"] = !0), Ne && Re($, ["html", "head", "body"]), $.table && (Re($, ["tbody"]), delete ue.tbody), C.TRUSTED_TYPES_POLICY) {
        if (typeof C.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw hr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof C.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw hr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        P = C.TRUSTED_TYPES_POLICY, D = P.createHTML("");
      } else
        P === void 0 && (P = jf(f, i)), P !== null && typeof D == "string" && (D = P.createHTML(""));
      ht && ht(C), hn = C;
    }
  }, sr = Re({}, [...Hi, ...Ui, ...Mf]), or = Re({}, [...$i, ...Of]), Dr = function(C) {
    let z = R(C);
    (!z || !z.tagName) && (z = {
      namespaceURI: Ce,
      tagName: "template"
    });
    const se = Jr(C.tagName), Ze = Jr(z.tagName);
    return st[C.namespaceURI] ? C.namespaceURI === At ? z.namespaceURI === nt ? se === "svg" : z.namespaceURI === at ? se === "svg" && (Ze === "annotation-xml" || Sn[Ze]) : !!sr[se] : C.namespaceURI === at ? z.namespaceURI === nt ? se === "math" : z.namespaceURI === At ? se === "math" && dn[Ze] : !!or[se] : C.namespaceURI === nt ? z.namespaceURI === At && !dn[Ze] || z.namespaceURI === at && !Sn[Ze] ? !1 : !or[se] && (Ni[se] || !sr[se]) : !!(It === "application/xhtml+xml" && st[C.namespaceURI]) : !1;
  }, _t = function(C) {
    ur(e.removed, {
      element: C
    });
    try {
      R(C).removeChild(C);
    } catch {
      T(C);
    }
  }, Gt = function(C, z) {
    try {
      ur(e.removed, {
        attribute: z.getAttributeNode(C),
        from: z
      });
    } catch {
      ur(e.removed, {
        attribute: null,
        from: z
      });
    }
    if (z.removeAttribute(C), C === "is")
      if (gt || Vt)
        try {
          _t(z);
        } catch {
        }
      else
        try {
          z.setAttribute(C, "");
        } catch {
        }
  }, lr = function(C) {
    let z = null, se = null;
    if (Ct)
      C = "<remove></remove>" + C;
    else {
      const Xe = zi(C, /^[\r\n\t ]+/);
      se = Xe && Xe[0];
    }
    It === "application/xhtml+xml" && Ce === nt && (C = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + C + "</body></html>");
    const Ze = P ? P.createHTML(C) : C;
    if (Ce === nt)
      try {
        z = new h().parseFromString(Ze, It);
      } catch {
      }
    if (!z || !z.documentElement) {
      z = _.createDocument(Ce, "template", null);
      try {
        z.documentElement.innerHTML = et ? D : Ze;
      } catch {
      }
    }
    const ot = z.body || z.documentElement;
    return C && se && ot.insertBefore(n.createTextNode(se), ot.childNodes[0] || null), Ce === nt ? G.call(z, Ne ? "html" : "body")[0] : Ne ? z.documentElement : ot;
  }, Fr = function(C) {
    return H.call(
      C.ownerDocument || C,
      C,
      // eslint-disable-next-line no-bitwise
      c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION,
      null
    );
  }, zr = function(C) {
    return C instanceof d && (typeof C.nodeName != "string" || typeof C.textContent != "string" || typeof C.removeChild != "function" || !(C.attributes instanceof u) || typeof C.removeAttribute != "function" || typeof C.setAttribute != "function" || typeof C.namespaceURI != "string" || typeof C.insertBefore != "function" || typeof C.hasChildNodes != "function");
  }, cr = function(C) {
    return typeof o == "function" && C instanceof o;
  };
  function Mt(Y, C, z) {
    jr(Y, (se) => {
      se.call(e, C, z, hn);
    });
  }
  const L = function(C) {
    let z = null;
    if (Mt(Z.beforeSanitizeElements, C, null), zr(C))
      return _t(C), !0;
    const se = Ke(C.nodeName);
    if (Mt(Z.uponSanitizeElement, C, {
      tagName: se,
      allowedTags: $
    }), Fe && C.hasChildNodes() && !cr(C.firstElementChild) && dt(/<[/\w!]/g, C.innerHTML) && dt(/<[/\w!]/g, C.textContent) || C.nodeType === pr.progressingInstruction || Fe && C.nodeType === pr.comment && dt(/<[/\w]/g, C.data))
      return _t(C), !0;
    if (!(le.tagCheck instanceof Function && le.tagCheck(se)) && (!$[se] || ue[se])) {
      if (!ue[se] && qe(se) && (V.tagNameCheck instanceof RegExp && dt(V.tagNameCheck, se) || V.tagNameCheck instanceof Function && V.tagNameCheck(se)))
        return !1;
      if (vn && !A[se]) {
        const Ze = R(C) || C.parentNode, ot = S(C) || C.childNodes;
        if (ot && Ze) {
          const Xe = ot.length;
          for (let mt = Xe - 1; mt >= 0; --mt) {
            const an = b(ot[mt], !0);
            an.__removalCount = (C.__removalCount || 0) + 1, Ze.insertBefore(an, k(C));
          }
        }
      }
      return _t(C), !0;
    }
    return C instanceof l && !Dr(C) || (se === "noscript" || se === "noembed" || se === "noframes") && dt(/<\/no(script|embed|frames)/i, C.innerHTML) ? (_t(C), !0) : (He && C.nodeType === pr.text && (z = C.textContent, jr([I, E, O], (Ze) => {
      z = dr(z, Ze, " ");
    }), C.textContent !== z && (ur(e.removed, {
      element: C.cloneNode()
    }), C.textContent = z)), Mt(Z.afterSanitizeElements, C, null), !1);
  }, Ae = function(C, z, se) {
    if (Cn && (z === "id" || z === "name") && (se in n || se in Ai))
      return !1;
    if (!(Me && !he[z] && dt(F, z))) {
      if (!(_e && dt(q, z))) {
        if (!(le.attributeCheck instanceof Function && le.attributeCheck(z, C))) {
          if (!x[z] || he[z]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(qe(C) && (V.tagNameCheck instanceof RegExp && dt(V.tagNameCheck, C) || V.tagNameCheck instanceof Function && V.tagNameCheck(C)) && (V.attributeNameCheck instanceof RegExp && dt(V.attributeNameCheck, z) || V.attributeNameCheck instanceof Function && V.attributeNameCheck(z, C)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              z === "is" && V.allowCustomizedBuiltInElements && (V.tagNameCheck instanceof RegExp && dt(V.tagNameCheck, se) || V.tagNameCheck instanceof Function && V.tagNameCheck(se)))
            ) return !1;
          } else if (!Ge[z]) {
            if (!dt(w, dr(se, re, ""))) {
              if (!((z === "src" || z === "xlink:href" || z === "href") && C !== "script" && Rf(se, "data:") === 0 && xe[C])) {
                if (!(ve && !dt(ce, dr(se, re, "")))) {
                  if (se)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, qe = function(C) {
    return C !== "annotation-xml" && zi(C, ge);
  }, We = function(C) {
    Mt(Z.beforeSanitizeAttributes, C, null);
    const {
      attributes: z
    } = C;
    if (!z || zr(C))
      return;
    const se = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: x,
      forceKeepAttr: void 0
    };
    let Ze = z.length;
    for (; Ze--; ) {
      const ot = z[Ze], {
        name: Xe,
        namespaceURI: mt,
        value: an
      } = ot, Dn = Ke(Xe), Ii = an;
      let rt = Xe === "value" ? Ii : Nf(Ii);
      if (se.attrName = Dn, se.attrValue = rt, se.keepAttr = !0, se.forceKeepAttr = void 0, Mt(Z.uponSanitizeAttribute, C, se), rt = se.attrValue, _n && (Dn === "id" || Dn === "name") && (Gt(Xe, C), rt = rr + rt), Fe && dt(/((--!?|])>)|<\/(style|title|textarea)/i, rt)) {
        Gt(Xe, C);
        continue;
      }
      if (Dn === "attributename" && zi(rt, "href")) {
        Gt(Xe, C);
        continue;
      }
      if (se.forceKeepAttr)
        continue;
      if (!se.keepAttr) {
        Gt(Xe, C);
        continue;
      }
      if (!be && dt(/\/>/i, rt)) {
        Gt(Xe, C);
        continue;
      }
      He && jr([I, E, O], (fs) => {
        rt = dr(rt, fs, " ");
      });
      const hs = Ke(C.nodeName);
      if (!Ae(hs, Dn, rt)) {
        Gt(Xe, C);
        continue;
      }
      if (P && typeof f == "object" && typeof f.getAttributeType == "function" && !mt)
        switch (f.getAttributeType(hs, Dn)) {
          case "TrustedHTML": {
            rt = P.createHTML(rt);
            break;
          }
          case "TrustedScriptURL": {
            rt = P.createScriptURL(rt);
            break;
          }
        }
      if (rt !== Ii)
        try {
          mt ? C.setAttributeNS(mt, Xe, rt) : C.setAttribute(Xe, rt), zr(C) ? _t(C) : to(e.removed);
        } catch {
          Gt(Xe, C);
        }
    }
    Mt(Z.afterSanitizeAttributes, C, null);
  }, $e = function Y(C) {
    let z = null;
    const se = Fr(C);
    for (Mt(Z.beforeSanitizeShadowDOM, C, null); z = se.nextNode(); )
      Mt(Z.uponSanitizeShadowNode, z, null), L(z), We(z), z.content instanceof a && Y(z.content);
    Mt(Z.afterSanitizeShadowDOM, C, null);
  };
  return e.sanitize = function(Y) {
    let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, z = null, se = null, Ze = null, ot = null;
    if (et = !Y, et && (Y = "<!-->"), typeof Y != "string" && !cr(Y))
      if (typeof Y.toString == "function") {
        if (Y = Y.toString(), typeof Y != "string")
          throw hr("dirty is not a string, aborting");
      } else
        throw hr("toString is not a function");
    if (!e.isSupported)
      return Y;
    if (Ft || Pn(C), e.removed = [], typeof Y == "string" && (Wt = !1), Wt) {
      if (Y.nodeName) {
        const an = Ke(Y.nodeName);
        if (!$[an] || ue[an])
          throw hr("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (Y instanceof o)
      z = lr("<!---->"), se = z.ownerDocument.importNode(Y, !0), se.nodeType === pr.element && se.nodeName === "BODY" || se.nodeName === "HTML" ? z = se : z.appendChild(se);
    else {
      if (!gt && !He && !Ne && // eslint-disable-next-line unicorn/prefer-includes
      Y.indexOf("<") === -1)
        return P && Zt ? P.createHTML(Y) : Y;
      if (z = lr(Y), !z)
        return gt ? null : Zt ? D : "";
    }
    z && Ct && _t(z.firstChild);
    const Xe = Fr(Wt ? Y : z);
    for (; Ze = Xe.nextNode(); )
      L(Ze), We(Ze), Ze.content instanceof a && $e(Ze.content);
    if (Wt)
      return Y;
    if (gt) {
      if (Vt)
        for (ot = U.call(z.ownerDocument); z.firstChild; )
          ot.appendChild(z.firstChild);
      else
        ot = z;
      return (x.shadowroot || x.shadowrootmode) && (ot = J.call(r, ot, !0)), ot;
    }
    let mt = Ne ? z.outerHTML : z.innerHTML;
    return Ne && $["!doctype"] && z.ownerDocument && z.ownerDocument.doctype && z.ownerDocument.doctype.name && dt(Kl, z.ownerDocument.doctype.name) && (mt = "<!DOCTYPE " + z.ownerDocument.doctype.name + `>
` + mt), He && jr([I, E, O], (an) => {
      mt = dr(mt, an, " ");
    }), P && Zt ? P.createHTML(mt) : mt;
  }, e.setConfig = function() {
    let Y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Pn(Y), Ft = !0;
  }, e.clearConfig = function() {
    hn = null, Ft = !1;
  }, e.isValidAttribute = function(Y, C, z) {
    hn || Pn({});
    const se = Ke(Y), Ze = Ke(C);
    return Ae(se, Ze, z);
  }, e.addHook = function(Y, C) {
    typeof C == "function" && ur(Z[Y], C);
  }, e.removeHook = function(Y, C) {
    if (C !== void 0) {
      const z = Tf(Z[Y], C);
      return z === -1 ? void 0 : Ef(Z[Y], z, 1)[0];
    }
    return to(Z[Y]);
  }, e.removeHooks = function(Y) {
    Z[Y] = [];
  }, e.removeAllHooks = function() {
    Z = oo();
  }, e;
}
var Yl = Xl();
const Vf = {
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
function Zf(t, e = "userMessage") {
  if (typeof t != "string")
    return console.warn("sanitizeInput received non-string input:", typeof t), "";
  if (!t.trim())
    return "";
  try {
    const n = Vf[e], r = Yl.sanitize(t, n);
    return Jl(r) ? (console.warn("Suspicious content detected and removed:", t), r.replace(/javascript:/gi, "").replace(/data:/gi, "")) : r;
  } catch (n) {
    return console.error("Error sanitizing input:", n), "";
  }
}
function Jl(t) {
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
function qa(t, e = !1) {
  const n = "___NEWLINE___", r = t.replace(/\n/g, n);
  return Zf(r, e ? "assistantMessage" : "userMessage").replace(new RegExp(n, "g"), `
`);
}
function Wf(t) {
  return typeof t != "string" ? "" : t.replace(/[<>:"/\\|?*]/g, "_").replace(/\.\./g, "_").replace(/^\./, "_").trim().substring(0, 255);
}
function lo(t) {
  if (typeof t != "string") return !1;
  try {
    const e = new URL(t);
    return !(!["http:", "https:", "data:"].includes(e.protocol) || Jl(t));
  } catch {
    return !1;
  }
}
function Gf() {
  Yl.addHook("beforeSanitizeAttributes", (t) => {
    if (["onclick", "onload", "onerror", "onmouseover", "onfocus"].forEach((n) => {
      t.hasAttribute(n) && t.removeAttribute(n);
    }), t.hasAttribute("href")) {
      const n = t.getAttribute("href");
      n && !lo(n) && t.removeAttribute("href");
    }
    if (t.hasAttribute("src")) {
      const n = t.getAttribute("src");
      n && !lo(n) && t.removeAttribute("src");
    }
  });
}
Gf();
function qf() {
  const [t, e] = Te([]), n = de(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  ), r = de(
    (s, o) => {
      const c = qa(o, s === "assistant");
      e((u) => [
        ...u,
        {
          id: n(),
          role: s,
          content: c,
          timestamp: /* @__PURE__ */ new Date()
        }
      ]);
    },
    [n]
  ), i = de((s, o) => {
    e(
      (l) => l.map((c) => c.id === s ? { ...c, ...o } : c)
    );
  }, []), a = de(
    (s, o, l) => {
      e(
        (c) => c.map(
          (u) => u.id === s ? {
            ...u,
            content: o,
            isStreaming: l
          } : u
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
const co = (t) => {
  let e;
  const n = /* @__PURE__ */ new Set(), r = (c, u) => {
    const d = typeof c == "function" ? c(e) : c;
    if (!Object.is(d, e)) {
      const h = e;
      e = u ?? (typeof d != "object" || d === null) ? d : Object.assign({}, e, d), n.forEach((f) => f(e, h));
    }
  }, i = () => e, o = { setState: r, getState: i, getInitialState: () => l, subscribe: (c) => (n.add(c), () => n.delete(c)) }, l = e = t(r, i, o);
  return o;
}, Kf = (t) => t ? co(t) : co, Xf = (t) => t;
function Yf(t, e = Xf) {
  const n = $t.useSyncExternalStore(
    t.subscribe,
    $t.useCallback(() => e(t.getState()), [t, e]),
    $t.useCallback(() => e(t.getInitialState()), [t, e])
  );
  return $t.useDebugValue(n), n;
}
const Jf = (t) => {
  const e = Kf(t), n = (r) => Yf(e, r);
  return Object.assign(n, e), n;
}, Qf = (t) => Jf, uo = { BASE_URL: "/", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_APP_TOLGEE_API_KEY: "tgpak_ge4v6ytcm5xtozdlobzxk4twgyzwqntjoe3xi4bwozygu5q", VITE_APP_TOLGEE_API_URL: "https://tolgee-translation.oddleapp.com", VITE_APP_TOLGEE_PROJECT_ID: "19", VITE_USER_NODE_ENV: "development" }, Nr = /* @__PURE__ */ new Map(), Zr = (t) => {
  const e = Nr.get(t);
  return e ? Object.fromEntries(
    Object.entries(e.stores).map(([n, r]) => [n, r.getState()])
  ) : {};
}, ep = (t, e, n) => {
  if (t === void 0)
    return {
      type: "untracked",
      connection: e.connect(n)
    };
  const r = Nr.get(n.name);
  if (r)
    return { type: "tracked", store: t, ...r };
  const i = {
    connection: e.connect(n),
    stores: {}
  };
  return Nr.set(n.name, i), { type: "tracked", store: t, ...i };
}, tp = (t, e) => {
  if (e === void 0) return;
  const n = Nr.get(t);
  n && (delete n.stores[e], Object.keys(n.stores).length === 0 && Nr.delete(t));
}, np = (t) => {
  var e, n;
  if (!t) return;
  const r = t.split(`
`), i = r.findIndex(
    (s) => s.includes("api.setState")
  );
  if (i < 0) return;
  const a = ((e = r[i + 1]) == null ? void 0 : e.trim()) || "";
  return (n = /.+ (.+) .+/.exec(a)) == null ? void 0 : n[1];
}, rp = (t, e = {}) => (n, r, i) => {
  const { enabled: a, anonymousActionType: s, store: o, ...l } = e;
  let c;
  try {
    c = (a ?? (uo ? "production" : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch {
  }
  if (!c)
    return t(n, r, i);
  const { connection: u, ...d } = ep(o, c, l);
  let h = !0;
  i.setState = (b, T, k) => {
    const S = n(b, T);
    if (!h) return S;
    const R = k === void 0 ? {
      type: s || np(new Error().stack) || "anonymous"
    } : typeof k == "string" ? { type: k } : k;
    return o === void 0 ? (u == null || u.send(R, r()), S) : (u == null || u.send(
      {
        ...R,
        type: `${o}/${R.type}`
      },
      {
        ...Zr(l.name),
        [o]: i.getState()
      }
    ), S);
  }, i.devtools = {
    cleanup: () => {
      u && typeof u.unsubscribe == "function" && u.unsubscribe(), tp(l.name, o);
    }
  };
  const f = (...b) => {
    const T = h;
    h = !1, n(...b), h = T;
  }, y = t(i.setState, r, i);
  if (d.type === "untracked" ? u == null || u.init(y) : (d.stores[d.store] = i, u == null || u.init(
    Object.fromEntries(
      Object.entries(d.stores).map(([b, T]) => [
        b,
        b === d.store ? y : T.getState()
      ])
    )
  )), i.dispatchFromDevtools && typeof i.dispatch == "function") {
    let b = !1;
    const T = i.dispatch;
    i.dispatch = (...k) => {
      (uo ? "production" : void 0) !== "production" && k[0].type === "__setState" && !b && (console.warn(
        '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
      ), b = !0), T(...k);
    };
  }
  return u.subscribe((b) => {
    var T;
    switch (b.type) {
      case "ACTION":
        if (typeof b.payload != "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return ji(
          b.payload,
          (k) => {
            if (k.type === "__setState") {
              if (o === void 0) {
                f(k.state);
                return;
              }
              Object.keys(k.state).length !== 1 && console.error(
                `
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
              );
              const S = k.state[o];
              if (S == null)
                return;
              JSON.stringify(i.getState()) !== JSON.stringify(S) && f(S);
              return;
            }
            i.dispatchFromDevtools && typeof i.dispatch == "function" && i.dispatch(k);
          }
        );
      case "DISPATCH":
        switch (b.payload.type) {
          case "RESET":
            return f(y), o === void 0 ? u == null ? void 0 : u.init(i.getState()) : u == null ? void 0 : u.init(Zr(l.name));
          case "COMMIT":
            if (o === void 0) {
              u == null || u.init(i.getState());
              return;
            }
            return u == null ? void 0 : u.init(Zr(l.name));
          case "ROLLBACK":
            return ji(b.state, (k) => {
              if (o === void 0) {
                f(k), u == null || u.init(i.getState());
                return;
              }
              f(k[o]), u == null || u.init(Zr(l.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return ji(b.state, (k) => {
              if (o === void 0) {
                f(k);
                return;
              }
              JSON.stringify(i.getState()) !== JSON.stringify(k[o]) && f(k[o]);
            });
          case "IMPORT_STATE": {
            const { nextLiftedState: k } = b.payload, S = (T = k.computedStates.slice(-1)[0]) == null ? void 0 : T.state;
            if (!S) return;
            f(o === void 0 ? S : S[o]), u == null || u.send(
              null,
              // FIXME no-any
              k
            );
            return;
          }
          case "PAUSE_RECORDING":
            return h = !h;
        }
        return;
    }
  }), y;
}, ip = rp, ji = (t, e) => {
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
}, ap = (t) => ({
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
}), sp = (t) => ({
  // Initial state
  chatStatus: Be.IDLE,
  streamingStatus: St.IDLE,
  // Actions
  setChatStatus: (e) => t({ chatStatus: e }),
  setStreamingStatus: (e) => t({ streamingStatus: e }),
  resetChatStatus: () => t({
    chatStatus: Be.IDLE,
    streamingStatus: St.IDLE
  })
}), op = (t) => ({
  // Initial state
  isLoadingConversation: !1,
  conversationError: null,
  // Actions
  setIsLoadingConversation: (e) => t({ isLoadingConversation: e }),
  setConversationError: (e) => t({ conversationError: e }),
  clearConversationError: () => t({ conversationError: null })
}), lp = (t) => ({
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
}), cp = (t) => ({
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
}), me = Qf()(
  ip(
    (...t) => ({
      ...ap(...t),
      ...sp(...t),
      ...op(...t),
      ...lp(...t),
      ...cp(...t)
    }),
    {
      name: "ChatUI-Store"
    }
  )
), r9 = () => me((t) => ({
  isModalOpen: t.isModalOpen,
  isCollapsed: t.isCollapsed,
  currentMode: t.currentMode,
  openModal: t.openModal,
  closeModal: t.closeModal,
  toggleCollapse: t.toggleCollapse,
  toggleFullscreen: t.toggleFullscreen
})), i9 = () => me((t) => ({
  chatStatus: t.chatStatus,
  streamingStatus: t.streamingStatus,
  setChatStatus: t.setChatStatus,
  setStreamingStatus: t.setStreamingStatus,
  resetChatStatus: t.resetChatStatus
})), a9 = () => me((t) => ({
  isLoadingConversation: t.isLoadingConversation,
  conversationError: t.conversationError,
  setIsLoadingConversation: t.setIsLoadingConversation,
  setConversationError: t.setConversationError,
  clearConversationError: t.clearConversationError
})), s9 = () => me((t) => ({
  currentThreadId: t.currentThreadId,
  providerResId: t.providerResId,
  setCurrentThreadId: t.setCurrentThreadId,
  setProviderResId: t.setProviderResId,
  clearThreadData: t.clearThreadData
}));
function up() {
  const t = me((S) => S.isStreaming), e = me((S) => S.setIsStreaming), n = me((S) => S.isThinking), r = me((S) => S.setIsThinking), i = me((S) => S.streamingContent), a = me((S) => S.setStreamingContent), s = me((S) => S.isHandlingTool), o = me((S) => S.setIsHandlingTool), l = me((S) => S.startStreaming), c = me((S) => S.stopStreaming), u = me((S) => S.clearStreamingBuffers), d = me((S) => S.resetToolHandling), h = fe(""), f = Ue(() => ({
    get current() {
      return me.getState().currentAssistantMessageId;
    },
    set current(S) {
      me.getState().setCurrentAssistantMessageId(S);
    }
  }), []), y = de((S) => {
    S ? l(S) : (e(!0), r(!0), a("")), h.current = "";
  }, [l, e, r, a]), b = de(() => {
    c(), h.current = "";
  }, [c]), T = de(() => {
    d();
  }, [d]), k = de(() => {
    u(), h.current = "";
  }, [u]);
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
    currentAssistantMessageIdRef: f,
    streamingContentRef: h,
    // Actions
    startStreaming: y,
    stopStreaming: b,
    resetToolHandling: T,
    clearStreamingBuffers: k
  };
}
const ye = (t) => typeof t == "string", gr = () => {
  let t, e;
  const n = new Promise((r, i) => {
    t = r, e = i;
  });
  return n.resolve = t, n.reject = e, n;
}, ho = (t) => t == null ? "" : "" + t, dp = (t, e, n) => {
  t.forEach((r) => {
    e[r] && (n[r] = e[r]);
  });
}, hp = /###/g, fo = (t) => t && t.indexOf("###") > -1 ? t.replace(hp, ".") : t, po = (t) => !t || ye(t), wr = (t, e, n) => {
  const r = ye(e) ? e.split(".") : e;
  let i = 0;
  for (; i < r.length - 1; ) {
    if (po(t)) return {};
    const a = fo(r[i]);
    !t[a] && n && (t[a] = new n()), Object.prototype.hasOwnProperty.call(t, a) ? t = t[a] : t = {}, ++i;
  }
  return po(t) ? {} : {
    obj: t,
    k: fo(r[i])
  };
}, go = (t, e, n) => {
  const {
    obj: r,
    k: i
  } = wr(t, e, Object);
  if (r !== void 0 || e.length === 1) {
    r[i] = n;
    return;
  }
  let a = e[e.length - 1], s = e.slice(0, e.length - 1), o = wr(t, s, Object);
  for (; o.obj === void 0 && s.length; )
    a = `${s[s.length - 1]}.${a}`, s = s.slice(0, s.length - 1), o = wr(t, s, Object), o != null && o.obj && typeof o.obj[`${o.k}.${a}`] < "u" && (o.obj = void 0);
  o.obj[`${o.k}.${a}`] = n;
}, fp = (t, e, n, r) => {
  const {
    obj: i,
    k: a
  } = wr(t, e, Object);
  i[a] = i[a] || [], i[a].push(n);
}, gi = (t, e) => {
  const {
    obj: n,
    k: r
  } = wr(t, e);
  if (n && Object.prototype.hasOwnProperty.call(n, r))
    return n[r];
}, pp = (t, e, n) => {
  const r = gi(t, n);
  return r !== void 0 ? r : gi(e, n);
}, Ql = (t, e, n) => {
  for (const r in e)
    r !== "__proto__" && r !== "constructor" && (r in t ? ye(t[r]) || t[r] instanceof String || ye(e[r]) || e[r] instanceof String ? n && (t[r] = e[r]) : Ql(t[r], e[r], n) : t[r] = e[r]);
  return t;
}, Fn = (t) => t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var gp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const mp = (t) => ye(t) ? t.replace(/[&<>"'\/]/g, (e) => gp[e]) : t;
class yp {
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
const xp = [" ", ",", "?", "!", ";"], wp = new yp(20), bp = (t, e, n) => {
  e = e || "", n = n || "";
  const r = xp.filter((s) => e.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0) return !0;
  const i = wp.getRegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
  let a = !i.test(t);
  if (!a) {
    const s = t.indexOf(n);
    s > 0 && !i.test(t.substring(0, s)) && (a = !0);
  }
  return a;
}, ka = (t, e, n = ".") => {
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
}, Ar = (t) => t == null ? void 0 : t.replace("_", "-"), kp = {
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
class mi {
  constructor(e, n = {}) {
    this.init(e, n);
  }
  init(e, n = {}) {
    this.prefix = n.prefix || "i18next:", this.logger = e || kp, this.options = n, this.debug = n.debug;
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
    return i && !this.debug ? null : (ye(e[0]) && (e[0] = `${r}${this.prefix} ${e[0]}`), this.logger[n](e));
  }
  create(e) {
    return new mi(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new mi(this.logger, e);
  }
}
var Qt = new mi();
class vi {
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
class mo extends vi {
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
    var c, u;
    const a = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, s = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let o;
    e.indexOf(".") > -1 ? o = e.split(".") : (o = [e, n], r && (Array.isArray(r) ? o.push(...r) : ye(r) && a ? o.push(...r.split(a)) : o.push(r)));
    const l = gi(this.data, o);
    return !l && !n && !r && e.indexOf(".") > -1 && (e = o[0], n = o[1], r = o.slice(2).join(".")), l || !s || !ye(r) ? l : ka((u = (c = this.data) == null ? void 0 : c[e]) == null ? void 0 : u[n], r, a);
  }
  addResource(e, n, r, i, a = {
    silent: !1
  }) {
    const s = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [e, n];
    r && (o = o.concat(s ? r.split(s) : r)), e.indexOf(".") > -1 && (o = e.split("."), i = n, n = o[1]), this.addNamespaces(n), go(this.data, o, i), a.silent || this.emit("added", e, n, r, i);
  }
  addResources(e, n, r, i = {
    silent: !1
  }) {
    for (const a in r)
      (ye(r[a]) || Array.isArray(r[a])) && this.addResource(e, n, a, r[a], {
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
    let l = gi(this.data, o) || {};
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))), i ? Ql(l, r, a) : l = {
      ...l,
      ...r
    }, go(this.data, o, l), s.silent || this.emit("added", e, n, r);
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
var ec = {
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
const tc = Symbol("i18next/PATH_KEY");
function Cp() {
  const t = [], e = /* @__PURE__ */ Object.create(null);
  let n;
  return e.get = (r, i) => {
    var a;
    return (a = n == null ? void 0 : n.revoke) == null || a.call(n), i === tc ? t : (t.push(i), n = Proxy.revocable(r, e), n.proxy);
  }, Proxy.revocable(/* @__PURE__ */ Object.create(null), e).proxy;
}
function Ca(t, e) {
  const {
    [tc]: n
  } = t(Cp());
  return n.join((e == null ? void 0 : e.keySeparator) ?? ".");
}
const yo = {}, Vi = (t) => !ye(t) && typeof t != "boolean" && typeof t != "number";
class yi extends vi {
  constructor(e, n = {}) {
    super(), dp(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = Qt.create("translator");
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
    const a = Vi(i.res);
    return !(r.returnObjects === !1 && a);
  }
  extractFromKey(e, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let a = n.ns || this.options.defaultNS || [];
    const s = r && e.indexOf(r) > -1, o = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !bp(e, r, i);
    if (s && !o) {
      const l = e.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: e,
          namespaces: ye(a) ? [a] : a
        };
      const c = e.split(r);
      (r !== i || r === i && this.options.ns.indexOf(c[0]) > -1) && (a = c.shift()), e = c.join(i);
    }
    return {
      key: e,
      namespaces: ye(a) ? [a] : a
    };
  }
  translate(e, n, r) {
    let i = typeof n == "object" ? {
      ...n
    } : n;
    if (typeof i != "object" && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)), typeof i == "object" && (i = {
      ...i
    }), i || (i = {}), e == null) return "";
    typeof e == "function" && (e = Ca(e, {
      ...this.options,
      ...i
    })), Array.isArray(e) || (e = [String(e)]);
    const a = i.returnDetails !== void 0 ? i.returnDetails : this.options.returnDetails, s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: l
    } = this.extractFromKey(e[e.length - 1], i), c = l[l.length - 1];
    let u = i.nsSeparator !== void 0 ? i.nsSeparator : this.options.nsSeparator;
    u === void 0 && (u = ":");
    const d = i.lng || this.language, h = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((d == null ? void 0 : d.toLowerCase()) === "cimode")
      return h ? a ? {
        res: `${c}${u}${o}`,
        usedKey: o,
        exactUsedKey: o,
        usedLng: d,
        usedNS: c,
        usedParams: this.getUsedParamsDetails(i)
      } : `${c}${u}${o}` : a ? {
        res: o,
        usedKey: o,
        exactUsedKey: o,
        usedLng: d,
        usedNS: c,
        usedParams: this.getUsedParamsDetails(i)
      } : o;
    const f = this.resolve(e, i);
    let y = f == null ? void 0 : f.res;
    const b = (f == null ? void 0 : f.usedKey) || o, T = (f == null ? void 0 : f.exactUsedKey) || o, k = ["[object Number]", "[object Function]", "[object RegExp]"], S = i.joinArrays !== void 0 ? i.joinArrays : this.options.joinArrays, R = !this.i18nFormat || this.i18nFormat.handleAsObject, P = i.count !== void 0 && !ye(i.count), D = yi.hasDefaultValue(i), _ = P ? this.pluralResolver.getSuffix(d, i.count, i) : "", H = i.ordinal && P ? this.pluralResolver.getSuffix(d, i.count, {
      ordinal: !1
    }) : "", U = P && !i.ordinal && i.count === 0, G = U && i[`defaultValue${this.options.pluralSeparator}zero`] || i[`defaultValue${_}`] || i[`defaultValue${H}`] || i.defaultValue;
    let J = y;
    R && !y && D && (J = G);
    const Z = Vi(J), I = Object.prototype.toString.apply(J);
    if (R && J && Z && k.indexOf(I) < 0 && !(ye(S) && Array.isArray(J))) {
      if (!i.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const E = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(b, J, {
          ...i,
          ns: l
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return a ? (f.res = E, f.usedParams = this.getUsedParamsDetails(i), f) : E;
      }
      if (s) {
        const E = Array.isArray(J), O = E ? [] : {}, F = E ? T : b;
        for (const q in J)
          if (Object.prototype.hasOwnProperty.call(J, q)) {
            const ce = `${F}${s}${q}`;
            D && !y ? O[q] = this.translate(ce, {
              ...i,
              defaultValue: Vi(G) ? G[q] : void 0,
              joinArrays: !1,
              ns: l
            }) : O[q] = this.translate(ce, {
              ...i,
              joinArrays: !1,
              ns: l
            }), O[q] === ce && (O[q] = J[q]);
          }
        y = O;
      }
    } else if (R && ye(S) && Array.isArray(y))
      y = y.join(S), y && (y = this.extendTranslation(y, e, i, r));
    else {
      let E = !1, O = !1;
      !this.isValidLookup(y) && D && (E = !0, y = G), this.isValidLookup(y) || (O = !0, y = o);
      const q = (i.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && O ? void 0 : y, ce = D && G !== y && this.options.updateMissing;
      if (O || E || ce) {
        if (this.logger.log(ce ? "updateKey" : "missingKey", d, c, o, ce ? G : y), s) {
          const $ = this.resolve(o, {
            ...i,
            keySeparator: !1
          });
          $ && $.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let re = [];
        const ge = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && ge && ge[0])
          for (let $ = 0; $ < ge.length; $++)
            re.push(ge[$]);
        else this.options.saveMissingTo === "all" ? re = this.languageUtils.toResolveHierarchy(i.lng || this.language) : re.push(i.lng || this.language);
        const w = ($, j, x) => {
          var V;
          const X = D && x !== y ? x : q;
          this.options.missingKeyHandler ? this.options.missingKeyHandler($, c, j, X, ce, i) : (V = this.backendConnector) != null && V.saveMissing && this.backendConnector.saveMissing($, c, j, X, ce, i), this.emit("missingKey", $, c, j, y);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && P ? re.forEach(($) => {
          const j = this.pluralResolver.getSuffixes($, i);
          U && i[`defaultValue${this.options.pluralSeparator}zero`] && j.indexOf(`${this.options.pluralSeparator}zero`) < 0 && j.push(`${this.options.pluralSeparator}zero`), j.forEach((x) => {
            w([$], o + x, i[`defaultValue${x}`] || G);
          });
        }) : w(re, o, G));
      }
      y = this.extendTranslation(y, e, i, f, r), O && y === o && this.options.appendNamespaceToMissingKey && (y = `${c}${u}${o}`), (O || E) && this.options.parseMissingKeyHandler && (y = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${c}${u}${o}` : o, E ? y : void 0, i));
    }
    return a ? (f.res = y, f.usedParams = this.getUsedParamsDetails(i), f) : y;
  }
  extendTranslation(e, n, r, i, a) {
    var l, c;
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
      const u = ye(e) && (((c = r == null ? void 0 : r.interpolation) == null ? void 0 : c.skipOnVariables) !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let d;
      if (u) {
        const f = e.match(this.interpolator.nestingRegexp);
        d = f && f.length;
      }
      let h = r.replace && !ye(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (h = {
        ...this.options.interpolation.defaultVariables,
        ...h
      }), e = this.interpolator.interpolate(e, h, r.lng || this.language || i.usedLng, r), u) {
        const f = e.match(this.interpolator.nestingRegexp), y = f && f.length;
        d < y && (r.nest = !1);
      }
      !r.lng && i && i.res && (r.lng = this.language || i.usedLng), r.nest !== !1 && (e = this.interpolator.nest(e, (...f) => (a == null ? void 0 : a[0]) === f[0] && !r.context ? (this.logger.warn(`It seems you are nesting recursively key: ${f[0]} in key: ${n[0]}`), null) : this.translate(...f, n), r)), r.interpolation && this.interpolator.reset();
    }
    const s = r.postProcess || this.options.postProcess, o = ye(s) ? [s] : s;
    return e != null && (o != null && o.length) && r.applyPostProcessor !== !1 && (e = ec.handle(o, e, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...i,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), e;
  }
  resolve(e, n = {}) {
    let r, i, a, s, o;
    return ye(e) && (e = [e]), e.forEach((l) => {
      if (this.isValidLookup(r)) return;
      const c = this.extractFromKey(l, n), u = c.key;
      i = u;
      let d = c.namespaces;
      this.options.fallbackNS && (d = d.concat(this.options.fallbackNS));
      const h = n.count !== void 0 && !ye(n.count), f = h && !n.ordinal && n.count === 0, y = n.context !== void 0 && (ye(n.context) || typeof n.context == "number") && n.context !== "", b = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      d.forEach((T) => {
        var k, S;
        this.isValidLookup(r) || (o = T, !yo[`${b[0]}-${T}`] && ((k = this.utils) != null && k.hasLoadedNamespace) && !((S = this.utils) != null && S.hasLoadedNamespace(o)) && (yo[`${b[0]}-${T}`] = !0, this.logger.warn(`key "${i}" for languages "${b.join(", ")}" won't get resolved as namespace "${o}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), b.forEach((R) => {
          var _;
          if (this.isValidLookup(r)) return;
          s = R;
          const P = [u];
          if ((_ = this.i18nFormat) != null && _.addLookupKeys)
            this.i18nFormat.addLookupKeys(P, u, R, T, n);
          else {
            let H;
            h && (H = this.pluralResolver.getSuffix(R, n.count, n));
            const U = `${this.options.pluralSeparator}zero`, G = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (h && (n.ordinal && H.indexOf(G) === 0 && P.push(u + H.replace(G, this.options.pluralSeparator)), P.push(u + H), f && P.push(u + U)), y) {
              const J = `${u}${this.options.contextSeparator || "_"}${n.context}`;
              P.push(J), h && (n.ordinal && H.indexOf(G) === 0 && P.push(J + H.replace(G, this.options.pluralSeparator)), P.push(J + H), f && P.push(J + U));
            }
          }
          let D;
          for (; D = P.pop(); )
            this.isValidLookup(r) || (a = D, r = this.getResource(R, T, D, n));
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
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = e.replace && !ye(e.replace);
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
class xo {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = Qt.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = Ar(e), !e || e.indexOf("-") < 0) return null;
    const n = e.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = Ar(e), !e || e.indexOf("-") < 0) return e;
    const n = e.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(e) {
    if (ye(e) && e.indexOf("-") > -1) {
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
    if (typeof e == "function" && (e = e(n)), ye(e) && (e = [e]), Array.isArray(e)) return e;
    if (!n) return e.default || [];
    let r = e[n];
    return r || (r = e[this.getScriptPartFromCode(n)]), r || (r = e[this.formatLanguageCode(n)]), r || (r = e[this.getLanguagePartFromCode(n)]), r || (r = e.default), r || [];
  }
  toResolveHierarchy(e, n) {
    const r = this.getFallbackCodes((n === !1 ? [] : n) || this.options.fallbackLng || [], e), i = [], a = (s) => {
      s && (this.isSupportedCode(s) ? i.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return ye(e) && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(e))) : ye(e) && a(this.formatLanguageCode(e)), r.forEach((s) => {
      i.indexOf(s) < 0 && a(this.formatLanguageCode(s));
    }), i;
  }
}
const wo = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, bo = {
  select: (t) => t === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class _p {
  constructor(e, n = {}) {
    this.languageUtils = e, this.options = n, this.logger = Qt.create("pluralResolver"), this.pluralRulesCache = {};
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(e, n = {}) {
    const r = Ar(e === "dev" ? "en" : e), i = n.ordinal ? "ordinal" : "cardinal", a = JSON.stringify({
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
        return this.logger.error("No Intl support, please use an Intl polyfill!"), bo;
      if (!e.match(/-|_/)) return bo;
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
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((i, a) => wo[i] - wo[a]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : [];
  }
  getSuffix(e, n, r = {}) {
    const i = this.getRule(e, r);
    return i ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : (this.logger.warn(`no plural rule found for: ${e}`), this.getSuffix("dev", n, r));
  }
}
const ko = (t, e, n, r = ".", i = !0) => {
  let a = pp(t, e, n);
  return !a && i && ye(n) && (a = ka(t, n, r), a === void 0 && (a = ka(e, n, r))), a;
}, Zi = (t) => t.replace(/\$/g, "$$$$");
class Co {
  constructor(e = {}) {
    var n;
    this.logger = Qt.create("interpolator"), this.options = e, this.format = ((n = e == null ? void 0 : e.interpolation) == null ? void 0 : n.format) || ((r) => r), this.init(e);
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
      formatSeparator: c,
      unescapeSuffix: u,
      unescapePrefix: d,
      nestingPrefix: h,
      nestingPrefixEscaped: f,
      nestingSuffix: y,
      nestingSuffixEscaped: b,
      nestingOptionsSeparator: T,
      maxReplaces: k,
      alwaysFormat: S
    } = e.interpolation;
    this.escape = n !== void 0 ? n : mp, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = i !== void 0 ? i : !1, this.prefix = a ? Fn(a) : s || "{{", this.suffix = o ? Fn(o) : l || "}}", this.formatSeparator = c || ",", this.unescapePrefix = u ? "" : d || "-", this.unescapeSuffix = this.unescapePrefix ? "" : u || "", this.nestingPrefix = h ? Fn(h) : f || Fn("$t("), this.nestingSuffix = y ? Fn(y) : b || Fn(")"), this.nestingOptionsSeparator = T || ",", this.maxReplaces = k || 1e3, this.alwaysFormat = S !== void 0 ? S : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = (n, r) => (n == null ? void 0 : n.source) === r ? (n.lastIndex = 0, n) : new RegExp(r, "g");
    this.regexp = e(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = e(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = e(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(e, n, r, i) {
    var f;
    let a, s, o;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, c = (y) => {
      if (y.indexOf(this.formatSeparator) < 0) {
        const S = ko(n, l, y, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(S, void 0, r, {
          ...i,
          ...n,
          interpolationkey: y
        }) : S;
      }
      const b = y.split(this.formatSeparator), T = b.shift().trim(), k = b.join(this.formatSeparator).trim();
      return this.format(ko(n, l, T, this.options.keySeparator, this.options.ignoreJSONStructure), k, r, {
        ...i,
        ...n,
        interpolationkey: T
      });
    };
    this.resetRegExp();
    const u = (i == null ? void 0 : i.missingInterpolationHandler) || this.options.missingInterpolationHandler, d = ((f = i == null ? void 0 : i.interpolation) == null ? void 0 : f.skipOnVariables) !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (y) => Zi(y)
    }, {
      regex: this.regexp,
      safeValue: (y) => this.escapeValue ? Zi(this.escape(y)) : Zi(y)
    }].forEach((y) => {
      for (o = 0; a = y.regex.exec(e); ) {
        const b = a[1].trim();
        if (s = c(b), s === void 0)
          if (typeof u == "function") {
            const k = u(e, a, i);
            s = ye(k) ? k : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, b))
            s = "";
          else if (d) {
            s = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${b} for interpolating ${e}`), s = "";
        else !ye(s) && !this.useRawValueToEscape && (s = ho(s));
        const T = y.safeValue(s);
        if (e = e.replace(a[0], T), d ? (y.regex.lastIndex += s.length, y.regex.lastIndex -= a[0].length) : y.regex.lastIndex = 0, o++, o >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, n, r = {}) {
    let i, a, s;
    const o = (l, c) => {
      const u = this.nestingOptionsSeparator;
      if (l.indexOf(u) < 0) return l;
      const d = l.split(new RegExp(`${u}[ ]*{`));
      let h = `{${d[1]}`;
      l = d[0], h = this.interpolate(h, s);
      const f = h.match(/'/g), y = h.match(/"/g);
      (((f == null ? void 0 : f.length) ?? 0) % 2 === 0 && !y || y.length % 2 !== 0) && (h = h.replace(/'/g, '"'));
      try {
        s = JSON.parse(h), c && (s = {
          ...c,
          ...s
        });
      } catch (b) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, b), `${l}${u}${h}`;
      }
      return s.defaultValue && s.defaultValue.indexOf(this.prefix) > -1 && delete s.defaultValue, l;
    };
    for (; i = this.nestingRegexp.exec(e); ) {
      let l = [];
      s = {
        ...r
      }, s = s.replace && !ye(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      const c = /{.*}/.test(i[1]) ? i[1].lastIndexOf("}") + 1 : i[1].indexOf(this.formatSeparator);
      if (c !== -1 && (l = i[1].slice(c).split(this.formatSeparator).map((u) => u.trim()).filter(Boolean), i[1] = i[1].slice(0, c)), a = n(o.call(this, i[1].trim(), s), s), a && i[0] === e && !ye(a)) return a;
      ye(a) || (a = ho(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${e}`), a = ""), l.length && (a = l.reduce((u, d) => this.format(u, d, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), a.trim())), e = e.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
const vp = (t) => {
  let e = t.toLowerCase().trim();
  const n = {};
  if (t.indexOf("(") > -1) {
    const r = t.split("(");
    e = r[0].toLowerCase().trim();
    const i = r[1].substring(0, r[1].length - 1);
    e === "currency" && i.indexOf(":") < 0 ? n.currency || (n.currency = i.trim()) : e === "relativetime" && i.indexOf(":") < 0 ? n.range || (n.range = i.trim()) : i.split(";").forEach((s) => {
      if (s) {
        const [o, ...l] = s.split(":"), c = l.join(":").trim().replace(/^'+|'+$/g, ""), u = o.trim();
        n[u] || (n[u] = c), c === "false" && (n[u] = !1), c === "true" && (n[u] = !0), isNaN(c) || (n[u] = parseInt(c, 10));
      }
    });
  }
  return {
    formatName: e,
    formatOptions: n
  };
}, _o = (t) => {
  const e = {};
  return (n, r, i) => {
    let a = i;
    i && i.interpolationkey && i.formatParams && i.formatParams[i.interpolationkey] && i[i.interpolationkey] && (a = {
      ...a,
      [i.interpolationkey]: void 0
    });
    const s = r + JSON.stringify(a);
    let o = e[s];
    return o || (o = t(Ar(r), i), e[s] = o), o(n);
  };
}, Sp = (t) => (e, n, r) => t(Ar(n), r)(e);
class Tp {
  constructor(e = {}) {
    this.logger = Qt.create("formatter"), this.options = e, this.init(e);
  }
  init(e, n = {
    interpolation: {}
  }) {
    this.formatSeparator = n.interpolation.formatSeparator || ",";
    const r = n.cacheInBuiltFormats ? _o : Sp;
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
    this.formats[e.toLowerCase().trim()] = _o(n);
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
        formatName: c,
        formatOptions: u
      } = vp(l);
      if (this.formats[c]) {
        let h = o;
        try {
          const f = ((d = i == null ? void 0 : i.formatParams) == null ? void 0 : d[i.interpolationkey]) || {}, y = f.locale || f.lng || i.locale || i.lng || r;
          h = this.formats[c](o, y, {
            ...u,
            ...i,
            ...f
          });
        } catch (f) {
          this.logger.warn(f);
        }
        return h;
      } else
        this.logger.warn(`there was no format function for ${c}`);
      return o;
    }, e);
  }
}
const Ep = (t, e) => {
  t.pending[e] !== void 0 && (delete t.pending[e], t.pendingCount--);
};
class Rp extends vi {
  constructor(e, n, r, i = {}) {
    var a, s;
    super(), this.backend = e, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = Qt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], (s = (a = this.backend) == null ? void 0 : a.init) == null || s.call(a, r, i.backend, i);
  }
  queueLoad(e, n, r, i) {
    const a = {}, s = {}, o = {}, l = {};
    return e.forEach((c) => {
      let u = !0;
      n.forEach((d) => {
        const h = `${c}|${d}`;
        !r.reload && this.store.hasResourceBundle(c, d) ? this.state[h] = 2 : this.state[h] < 0 || (this.state[h] === 1 ? s[h] === void 0 && (s[h] = !0) : (this.state[h] = 1, u = !1, s[h] === void 0 && (s[h] = !0), a[h] === void 0 && (a[h] = !0), l[d] === void 0 && (l[d] = !0)));
      }), u || (o[c] = !0);
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
      fp(l.loaded, [a], s), Ep(l, e), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((c) => {
        o[c] || (o[c] = {});
        const u = l.loaded[c];
        u.length && u.forEach((d) => {
          o[c][d] === void 0 && (o[c][d] = !0);
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
    const o = (c, u) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const d = this.waitingReads.shift();
        this.read(d.lng, d.ns, d.fcName, d.tried, d.wait, d.callback);
      }
      if (c && u && i < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, n, r, i + 1, a * 2, s);
        }, a);
        return;
      }
      s(c, u);
    }, l = this.backend[r].bind(this.backend);
    if (l.length === 2) {
      try {
        const c = l(e, n);
        c && typeof c.then == "function" ? c.then((u) => o(null, u)).catch(o) : o(null, c);
      } catch (c) {
        o(c);
      }
      return;
    }
    return l(e, n, o);
  }
  prepareLoading(e, n, r = {}, i) {
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    ye(e) && (e = this.languageUtils.toResolveHierarchy(e)), ye(n) && (n = [n]);
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
    var l, c, u, d, h;
    if ((c = (l = this.services) == null ? void 0 : l.utils) != null && c.hasLoadedNamespace && !((d = (u = this.services) == null ? void 0 : u.utils) != null && d.hasLoadedNamespace(n))) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if ((h = this.backend) != null && h.create) {
        const f = {
          ...s,
          isUpdate: a
        }, y = this.backend.create.bind(this.backend);
        if (y.length < 6)
          try {
            let b;
            y.length === 5 ? b = y(e, n, r, i, f) : b = y(e, n, r, i), b && typeof b.then == "function" ? b.then((T) => o(null, T)).catch(o) : o(null, b);
          } catch (b) {
            o(b);
          }
        else
          y(e, n, r, i, o, f);
      }
      !e || !e[0] || this.store.addResource(e[0], n, r, i);
    }
  }
}
const Wi = () => ({
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
    if (typeof t[1] == "object" && (e = t[1]), ye(t[1]) && (e.defaultValue = t[1]), ye(t[2]) && (e.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
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
}), vo = (t) => {
  var e, n;
  return ye(t.ns) && (t.ns = [t.ns]), ye(t.fallbackLng) && (t.fallbackLng = [t.fallbackLng]), ye(t.fallbackNS) && (t.fallbackNS = [t.fallbackNS]), ((n = (e = t.supportedLngs) == null ? void 0 : e.indexOf) == null ? void 0 : n.call(e, "cimode")) < 0 && (t.supportedLngs = t.supportedLngs.concat(["cimode"])), typeof t.initImmediate == "boolean" && (t.initAsync = t.initImmediate), t;
}, Wr = () => {
}, Np = (t) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(t)).forEach((n) => {
    typeof t[n] == "function" && (t[n] = t[n].bind(t));
  });
};
class br extends vi {
  constructor(e = {}, n) {
    if (super(), this.options = vo(e), this.services = {}, this.logger = Qt, this.modules = {
      external: []
    }, Np(this), n && !this.isInitialized && !e.isClone) {
      if (!this.options.initAsync)
        return this.init(e, n), this;
      setTimeout(() => {
        this.init(e, n);
      }, 0);
    }
  }
  init(e = {}, n) {
    this.isInitializing = !0, typeof e == "function" && (n = e, e = {}), e.defaultNS == null && e.ns && (ye(e.ns) ? e.defaultNS = e.ns : e.ns.indexOf("translation") < 0 && (e.defaultNS = e.ns[0]));
    const r = Wi();
    this.options = {
      ...r,
      ...this.options,
      ...vo(e)
    }, this.options.interpolation = {
      ...r.interpolation,
      ...this.options.interpolation
    }, e.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = e.keySeparator), e.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = e.nsSeparator), typeof this.options.overloadTranslationOptionHandler != "function" && (this.options.overloadTranslationOptionHandler = r.overloadTranslationOptionHandler);
    const i = (c) => c ? typeof c == "function" ? new c() : c : null;
    if (!this.options.isClone) {
      this.modules.logger ? Qt.init(i(this.modules.logger), this.options) : Qt.init(null, this.options);
      let c;
      this.modules.formatter ? c = this.modules.formatter : c = Tp;
      const u = new xo(this.options);
      this.store = new mo(this.options.resources, this.options);
      const d = this.services;
      d.logger = Qt, d.resourceStore = this.store, d.languageUtils = u, d.pluralResolver = new _p(u, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"), c && (!this.options.interpolation.format || this.options.interpolation.format === r.interpolation.format) && (d.formatter = i(c), d.formatter.init && d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new Co(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new Rp(i(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", (f, ...y) => {
        this.emit(f, ...y);
      }), this.modules.languageDetector && (d.languageDetector = i(this.modules.languageDetector), d.languageDetector.init && d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = i(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new yi(this.services, this.options), this.translator.on("*", (f, ...y) => {
        this.emit(f, ...y);
      }), this.modules.external.forEach((f) => {
        f.init && f.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, n || (n = Wr), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const c = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      c.length > 0 && c[0] !== "dev" && (this.options.lng = c[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((c) => {
      this[c] = (...u) => this.store[c](...u);
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((c) => {
      this[c] = (...u) => (this.store[c](...u), this);
    });
    const o = gr(), l = () => {
      const c = (u, d) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(d), n(u, d);
      };
      if (this.languages && !this.isInitialized) return c(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, c);
    };
    return this.options.resources || !this.options.initAsync ? l() : setTimeout(l, 0), o;
  }
  loadResources(e, n = Wr) {
    var a, s;
    let r = n;
    const i = ye(e) ? e : this.language;
    if (typeof e == "function" && (r = e), !this.options.resources || this.options.partialBundledLanguages) {
      if ((i == null ? void 0 : i.toLowerCase()) === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return r();
      const o = [], l = (c) => {
        if (!c || c === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(c).forEach((d) => {
          d !== "cimode" && o.indexOf(d) < 0 && o.push(d);
        });
      };
      i ? l(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((u) => l(u)), (s = (a = this.options.preload) == null ? void 0 : a.forEach) == null || s.call(a, (c) => l(c)), this.services.backendConnector.load(o, this.options.ns, (c) => {
        !c && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(c);
      });
    } else
      r(null);
  }
  reloadResources(e, n, r) {
    const i = gr();
    return typeof e == "function" && (r = e, e = void 0), typeof n == "function" && (r = n, n = void 0), e || (e = this.languages), n || (n = this.options.ns), r || (r = Wr), this.services.backendConnector.reload(e, n, (a) => {
      i.resolve(), r(a);
    }), i;
  }
  use(e) {
    if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && ec.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
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
    const r = gr();
    this.emit("languageChanging", e);
    const i = (o) => {
      this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o);
    }, a = (o, l) => {
      l ? this.isLanguageChangingTo === e && (i(l), this.translator.changeLanguage(l), this.isLanguageChangingTo = void 0, this.emit("languageChanged", l), this.logger.log("languageChanged", l)) : this.isLanguageChangingTo = void 0, r.resolve((...c) => this.t(...c)), n && n(o, (...c) => this.t(...c));
    }, s = (o) => {
      var u, d;
      !e && !o && this.services.languageDetector && (o = []);
      const l = ye(o) ? o : o && o[0], c = this.store.hasLanguageSomeTranslations(l) ? l : this.services.languageUtils.getBestMatchFromCodes(ye(o) ? [o] : o);
      c && (this.language || i(c), this.translator.language || this.translator.changeLanguage(c), (d = (u = this.services.languageDetector) == null ? void 0 : u.cacheUserLanguage) == null || d.call(u, c)), this.loadResources(c, (h) => {
        a(h, c);
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
      const c = this.options.keySeparator || ".";
      let u;
      return l.keyPrefix && Array.isArray(a) ? u = a.map((d) => (typeof d == "function" && (d = Ca(d, {
        ...this.options,
        ...s
      })), `${l.keyPrefix}${c}${d}`)) : (typeof a == "function" && (a = Ca(a, {
        ...this.options,
        ...s
      })), u = l.keyPrefix ? `${l.keyPrefix}${c}${a}` : a), this.t(u, l);
    };
    return ye(e) ? i.lng = e : i.lngs = e, i.ns = n, i.keyPrefix = r, i;
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
      const c = this.services.backendConnector.state[`${o}|${l}`];
      return c === -1 || c === 0 || c === 2;
    };
    if (n.precheck) {
      const o = n.precheck(this, s);
      if (o !== void 0) return o;
    }
    return !!(this.hasResourceBundle(r, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || s(r, e) && (!i || s(a, e)));
  }
  loadNamespaces(e, n) {
    const r = gr();
    return this.options.ns ? (ye(e) && (e = [e]), e.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(e, n) {
    const r = gr();
    ye(e) && (e = [e]);
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
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = ((a = this.services) == null ? void 0 : a.languageUtils) || new xo(Wi());
    return e.toLowerCase().indexOf("-latn") > 1 ? "ltr" : n.indexOf(r.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(e = {}, n) {
    const r = new br(e, n);
    return r.createInstance = br.createInstance, r;
  }
  cloneInstance(e = {}, n = Wr) {
    const r = e.forkResourceStore;
    r && delete e.forkResourceStore;
    const i = {
      ...this.options,
      ...e,
      isClone: !0
    }, a = new br(i);
    if ((e.debug !== void 0 || e.prefix !== void 0) && (a.logger = a.logger.clone(e)), ["store", "services", "language"].forEach((o) => {
      a[o] = this[o];
    }), a.services = {
      ...this.services
    }, a.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, r) {
      const o = Object.keys(this.store.data).reduce((l, c) => (l[c] = {
        ...this.store.data[c]
      }, l[c] = Object.keys(l[c]).reduce((u, d) => (u[d] = {
        ...l[c][d]
      }, u), l[c]), l), {});
      a.store = new mo(o, i), a.services.resourceStore = a.store;
    }
    if (e.interpolation) {
      const l = {
        ...Wi().interpolation,
        ...this.options.interpolation,
        ...e.interpolation
      }, c = {
        ...i,
        interpolation: l
      };
      a.services.interpolator = new Co(c);
    }
    return a.translator = new yi(a.services, i), a.translator.on("*", (o, ...l) => {
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
const pt = br.createInstance();
pt.createInstance;
pt.dir;
pt.init;
pt.loadResources;
pt.reloadResources;
pt.use;
pt.changeLanguage;
pt.getFixedT;
pt.t;
pt.exists;
pt.setDefaultNamespace;
pt.hasLoadedNamespace;
pt.loadNamespaces;
pt.loadLanguages;
var xi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ka(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
const Ap = (t, e, n, r) => {
  var a, s, o, l;
  const i = [n, {
    code: e,
    ...r || {}
  }];
  if ((s = (a = t == null ? void 0 : t.services) == null ? void 0 : a.logger) != null && s.forward)
    return t.services.logger.forward(i, "warn", "react-i18next::", !0);
  Mn(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (l = (o = t == null ? void 0 : t.services) == null ? void 0 : o.logger) != null && l.warn ? t.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, So = {}, nc = (t, e, n, r) => {
  Mn(n) && So[n] || (Mn(n) && (So[n] = /* @__PURE__ */ new Date()), Ap(t, e, n, r));
}, rc = (t, e) => () => {
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
}, _a = (t, e, n) => {
  t.loadNamespaces(e, rc(t, n));
}, To = (t, e, n, r) => {
  if (Mn(n) && (n = [n]), t.options.preload && t.options.preload.indexOf(e) > -1) return _a(t, n, r);
  n.forEach((i) => {
    t.options.ns.indexOf(i) < 0 && t.options.ns.push(i);
  }), t.loadLanguages(e, rc(t, r));
}, Ip = (t, e, n = {}) => !e.languages || !e.languages.length ? (nc(e, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: e.languages
}), !0) : e.hasLoadedNamespace(t, {
  lng: n.lng,
  precheck: (r, i) => {
    if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && r.services.backendConnector.backend && r.isLanguageChangingTo && !i(r.isLanguageChangingTo, t)) return !1;
  }
}), Mn = (t) => typeof t == "string", Mp = (t) => typeof t == "object" && t !== null, Op = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Lp = {
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
}, Pp = (t) => Lp[t], Dp = (t) => t.replace(Op, Pp);
let va = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Dp,
  transDefaultProps: void 0
};
const Fp = (t = {}) => {
  va = {
    ...va,
    ...t
  };
}, zp = () => va;
let ic;
const Hp = (t) => {
  ic = t;
}, Up = () => ic, $p = {
  type: "3rdParty",
  init(t) {
    Fp(t.options.react), Hp(t);
  }
}, Bp = ki();
class jp {
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
var ac = { exports: {} }, sc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jn = $t;
function Vp(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Zp = typeof Object.is == "function" ? Object.is : Vp, Wp = Jn.useState, Gp = Jn.useEffect, qp = Jn.useLayoutEffect, Kp = Jn.useDebugValue;
function Xp(t, e) {
  var n = e(), r = Wp({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return qp(
    function() {
      i.value = n, i.getSnapshot = e, Gi(i) && a({ inst: i });
    },
    [t, n, e]
  ), Gp(
    function() {
      return Gi(i) && a({ inst: i }), t(function() {
        Gi(i) && a({ inst: i });
      });
    },
    [t]
  ), Kp(n), n;
}
function Gi(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Zp(t, n);
  } catch {
    return !0;
  }
}
function Yp(t, e) {
  return e();
}
var Jp = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Yp : Xp;
sc.useSyncExternalStore = Jn.useSyncExternalStore !== void 0 ? Jn.useSyncExternalStore : Jp;
ac.exports = sc;
var Qp = ac.exports;
const eg = (t, e) => Mn(e) ? e : Mp(e) && Mn(e.defaultValue) ? e.defaultValue : Array.isArray(t) ? t[t.length - 1] : t, tg = {
  t: eg,
  ready: !1
}, ng = () => () => {
}, rg = (t, e = {}) => {
  var G, J, Z;
  const {
    i18n: n
  } = e, {
    i18n: r,
    defaultNS: i
  } = Ci(Bp) || {}, a = n || r || Up();
  a && !a.reportNamespaces && (a.reportNamespaces = new jp()), a || nc(a, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
  const s = Ue(() => {
    var I;
    return {
      ...zp(),
      ...(I = a == null ? void 0 : a.options) == null ? void 0 : I.react,
      ...e
    };
  }, [a, e]), {
    useSuspense: o,
    keyPrefix: l
  } = s, c = i || ((G = a == null ? void 0 : a.options) == null ? void 0 : G.defaultNS), u = Mn(c) ? [c] : c || ["translation"], d = Ue(() => u, u);
  (Z = (J = a == null ? void 0 : a.reportNamespaces) == null ? void 0 : J.addUsedNamespaces) == null || Z.call(J, d);
  const h = fe(0), f = de((I) => {
    if (!a) return ng;
    const {
      bindI18n: E,
      bindI18nStore: O
    } = s, F = () => {
      h.current += 1, I();
    };
    return E && a.on(E, F), O && a.store.on(O, F), () => {
      E && E.split(" ").forEach((q) => a.off(q, F)), O && O.split(" ").forEach((q) => a.store.off(q, F));
    };
  }, [a, s]), y = fe(), b = de(() => {
    if (!a)
      return tg;
    const I = !!(a.isInitialized || a.initializedStoreOnce) && d.every((re) => Ip(re, a, s)), E = e.lng || a.language, O = h.current, F = y.current;
    if (F && F.ready === I && F.lng === E && F.keyPrefix === l && F.revision === O)
      return F;
    const ce = {
      t: a.getFixedT(E, s.nsMode === "fallback" ? d : d[0], l),
      ready: I,
      lng: E,
      keyPrefix: l,
      revision: O
    };
    return y.current = ce, ce;
  }, [a, d, l, s, e.lng]), [T, k] = Te(0), {
    t: S,
    ready: R
  } = Qp.useSyncExternalStore(f, b, b);
  Pe(() => {
    if (a && !R && !o) {
      const I = () => k((E) => E + 1);
      e.lng ? To(a, e.lng, d, I) : _a(a, d, I);
    }
  }, [a, e.lng, d, R, o, T]);
  const P = a || {}, D = fe(null), _ = fe(), H = (I) => {
    const E = Object.getOwnPropertyDescriptors(I);
    E.__original && delete E.__original;
    const O = Object.create(Object.getPrototypeOf(I), E);
    if (!Object.prototype.hasOwnProperty.call(O, "__original"))
      try {
        Object.defineProperty(O, "__original", {
          value: I,
          writable: !1,
          enumerable: !1,
          configurable: !1
        });
      } catch {
      }
    return O;
  }, U = Ue(() => {
    const I = P, E = I == null ? void 0 : I.language;
    let O = I;
    I && (D.current && D.current.__original === I ? _.current !== E ? (O = H(I), D.current = O, _.current = E) : O = D.current : (O = H(I), D.current = O, _.current = E));
    const F = [S, O, R];
    return F.t = S, F.i18n = O, F.ready = R, F;
  }, [S, P, R, P.resolvedLanguage, P.language, P.languages]);
  if (a && o && !R)
    throw new Promise((I) => {
      const E = () => I();
      e.lng ? To(a, e.lng, d, E) : _a(a, d, E);
    });
  return U;
};
async function oc({
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
      return console.warn(`Translations not found for locale '${r}', falling back to 'en'`), oc({
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
const ig = () => {
  const t = pt.createInstance();
  return t.use($p), t;
}, lc = ki(null), ag = {
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
function sg({
  children: t,
  locale: e = "en",
  chatServerUrl: n,
  chatServerKey: r,
  mpAuthToken: i,
  fallback: a
}) {
  const [s] = Te(() => ig()), [o, l] = Te(!0), [c, u] = Te(!1), [d, h] = Te(null), f = fe(!1), y = de(
    async (k, S) => {
      s.isInitialized ? (s.addResourceBundle(
        S,
        "translation",
        k,
        !0,
        !0
      ), await s.changeLanguage(S)) : await s.init({
        lng: S,
        fallbackLng: "en",
        resources: {
          [S]: {
            translation: k
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
  Pe(() => {
    if (f.current)
      return;
    let k = !0;
    return (async () => {
      l(!0), h(null);
      try {
        const R = await oc({
          chatServerUrl: n,
          chatServerKey: r,
          mpAuthToken: i,
          locale: e
        });
        if (!k) return;
        await y(R, e), f.current = !0, u(!0);
      } catch (R) {
        if (!k) return;
        console.error("Failed to load translations:", R), h(
          R instanceof Error ? R : new Error("Failed to load translations")
        ), await y(ag, "en"), f.current = !0, u(!0);
      } finally {
        k && l(!1);
      }
    })(), () => {
      k = !1;
    };
  }, [e, n, r, i, y]);
  const b = de(
    (k, S) => s.isInitialized && s.t(k, S) || k,
    [s]
  ), T = Ue(
    () => ({
      t: b,
      locale: e,
      isLoading: o,
      isReady: c,
      error: d
    }),
    [b, e, o, c, d]
  );
  return o && a ? /* @__PURE__ */ p(en, { children: a }) : /* @__PURE__ */ p(lc.Provider, { value: T, children: t });
}
function bn() {
  const t = Ci(lc);
  if (!t)
    throw new Error(
      "useTranslations must be used within TranslationProvider. Make sure your component is wrapped with <TranslationProvider>."
    );
  return t;
}
function o9() {
  return rg();
}
function og() {
  const { t } = bn(), e = de(
    (a, s) => s === !1 ? tt.isErrorMessage(a) ? lt.ERROR : lt.COMPLETED : tt.isCompletedMessage(a) ? lt.COMPLETED : tt.isErrorMessage(a) ? lt.ERROR : lt.PROCESSING,
    []
  ), n = de(
    (a) => tt.extractDuration(a, t),
    [t]
  ), r = de(
    (a) => tt.cleanReasoningContent(a),
    []
  ), i = de(
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
function lg() {
  const { t } = bn(), e = de(
    (r, i) => i === !1 ? r.includes(pe.ERROR_MARKER) ? t("chat.tools.failed") : t("chat.tools.completed") : r.includes(pe.COMPLETED_MARKER) || r.includes("✅") ? t("chat.tools.completed") : r.includes(pe.ERROR_MARKER) ? t("chat.tools.failed") : (r.includes(pe.HANDLING_MARKER), t("chat.tools.executing")),
    [t]
  ), n = de(
    (r, i) => i === !1 ? r.includes(pe.ERROR_MARKER) ? lt.ERROR : lt.COMPLETED : r.includes(pe.COMPLETED_MARKER) || r.includes("✅") ? lt.COMPLETED : r.includes(pe.ERROR_MARKER) ? lt.ERROR : lt.PROCESSING,
    []
  );
  return {
    getToolingTitle: e,
    getToolingStatus: n
  };
}
function cg({
  setMessages: t,
  addMessage: e,
  updateMessageContent: n,
  generateId: r,
  setIsThinking: i,
  setIsStreaming: a,
  setStreamingContent: s,
  setIsHandlingTool: o,
  currentAssistantMessageIdRef: l,
  streamingContentRef: c,
  clearStreamingBuffers: u,
  resetToolHandling: d
}) {
  const h = fe(/* @__PURE__ */ new Map()), f = fe(/* @__PURE__ */ new Map()), y = de(() => {
    window.responseTimeoutId && (clearTimeout(window.responseTimeoutId), window.responseTimeoutId = null, !l.current && t((D) => {
      var H;
      const _ = (H = D.map((U, G) => ({ msg: U, index: G })).filter(({ msg: U }) => U.role === "user").pop()) == null ? void 0 : H.index;
      return _ === void 0 ? D : D.map(
        (U, G) => G === _ && (U.hasError || U.isRetrying) ? { ...U, hasError: !1, errorMessage: void 0, isRetrying: !1 } : U
      );
    }));
  }, [l, t]), b = de(() => {
    if (l.current && c.current) {
      const D = qa(
        c.current,
        !0
      );
      return n(
        l.current,
        D,
        !1
      ), u(), !0;
    }
    return !1;
  }, [
    l,
    c,
    n,
    u
  ]), T = de(
    (D) => {
      if (y(), l.current)
        c.current += D, s(c.current), n(
          l.current,
          c.current,
          !0
        );
      else {
        i(!1);
        const _ = r();
        l.current = _, c.current = D, s(D);
        const H = {
          id: _,
          role: "assistant",
          content: D,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0
        };
        t((U) => [...U, H]);
      }
    },
    [
      l,
      c,
      s,
      n,
      i,
      r,
      t
    ]
  ), k = de(
    (D, _, H) => {
      const { callId: U } = H || {};
      if (o(D), !U) return;
      const G = tt.isThinkingMessage(_) && !pe.PATTERNS.DURATION.test(_), J = tt.isThinkingMessage(_) && pe.PATTERNS.DURATION.test(_), Z = tt.isHandlingMessage(_), I = tt.isCompletedMessage(_), E = tt.isErrorMessage(_);
      if (G || J) {
        const F = h.current.get(U);
        if (G && !F) {
          b();
          const q = r();
          h.current.set(U, q);
          const ce = {
            id: q,
            role: "reasoning",
            content: _,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: !0
          };
          t((re) => [...re, ce]);
        } else J && F ? (n(F, _, !1), h.current.delete(U)) : F && G && n(F, _, !0);
      }
      const O = f.current.get(U);
      if (Z && !O) {
        b();
        const F = _.match(
          pe.PATTERNS.HANDLING_TOOL
        ), q = F ? F[1] : "Unknown Tool", ce = r();
        f.current.set(U, ce);
        const re = {
          id: ce,
          role: "tooling",
          content: _,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: !0,
          toolData: {
            ...H,
            toolName: q,
            callId: U,
            status: lt.PROCESSING
          }
        };
        t((ge) => [...ge, re]);
      } else if ((I || E) && O) {
        const F = _.match(
          pe.PATTERNS.COMPLETED_OR_ERROR_TOOL
        ), q = F ? F[1] : "Unknown Tool";
        t(
          (ce) => ce.map(
            (re) => re.id === O ? {
              ...re,
              content: _,
              isStreaming: !1,
              toolData: {
                ...re.toolData,
                toolName: q,
                status: E ? lt.ERROR : lt.COMPLETED,
                callId: U ?? ""
              }
            } : re
          )
        ), f.current.delete(U);
      } else O && D && !I && !E && n(O, _, !0);
    },
    [
      o,
      b,
      r,
      t,
      n
    ]
  ), S = de(() => {
    y(), a(!1), i(!1), b();
  }, [
    y,
    a,
    i,
    b
  ]), R = de(
    (D) => {
      a(!1), i(!1), b(), e("system", `❌ Chat error: ${D}`);
    },
    [
      a,
      i,
      b,
      e
    ]
  ), P = de(() => {
    a(!1), i(!1), u(), d();
  }, [
    a,
    i,
    u,
    d
  ]);
  return {
    handleSetMessage: T,
    handleReasoningUpdate: k,
    handleChatFinished: S,
    handleChatError: R,
    stopGeneration: P,
    finalizeCurrentStreamingMessage: b,
    clearResponseError: y
  };
}
function ug() {
  const t = qf(), e = up(), n = og(), r = lg(), i = cg({
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
function l9({ initialMode: t = "sidebar" }) {
  const e = me();
  return Pe(() => {
    t && e.currentMode !== t && e.setCurrentMode(t);
  }, [t]), Pe(() => {
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
function dg(t) {
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
function hg({
  entityId: t,
  entityType: e,
  httpApiUrl: n,
  userMpAuthToken: r,
  chatServerKey: i,
  messages: a,
  setMessages: s,
  setIsLoadingConversation: o,
  setConversationError: l,
  setCurrentThreadId: c,
  setProviderResId: u,
  metadata: d,
  isConnected: h = !0,
  // Default to true for backward compatibility
  onConversationInitialized: f
}) {
  const y = fe(!1), b = async () => {
    if (h) {
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
      if (!y.current && !(a.length > 0))
        try {
          o(!0), l(null);
          const k = await xf(
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
          s(dg(k.messages)), k.threadId && c(k.threadId), k.providerResId && u(k.providerResId), k.messages.length > 0 && f && f(), y.current = !0;
        } catch (k) {
          Yn(k, "ConversationLoader"), l(
            k instanceof Error ? k.message : "Failed to load conversation"
          ), y.current = !0;
        } finally {
          o(!1);
        }
    }
  };
  return Pe(() => {
    b();
  }, [
    h,
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
    c,
    u,
    d
  ]), {
    hasLoadedConversationRef: y,
    resetConversationLoader: () => {
      y.current = !1;
    },
    reloadConversation: b
  };
}
function Eo(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.keys(t);
  return e.length === 0 ? !1 : e.some((n) => t[n] != null);
}
function fg({
  metadata: t,
  chatClient: e,
  currentProviderResId: n,
  isLoadingConversation: r,
  messages: i = [],
  entityId: a,
  entityType: s
}) {
  const o = fe(void 0), l = fe(!1), c = fe(null), u = fe(void 0), d = fe(null);
  return Pe(() => {
    if (r || !e)
      return;
    const h = !n && i.length === 0, f = !!n;
    if (h && (!a || !s) || f && !n)
      return;
    if (!l.current) {
      l.current = !0, o.current = t, d.current = n;
      return;
    }
    const y = !d.current && n, b = o.current !== t;
    if (y) {
      if (console.log("[useMetadataSync] 🆕 Thread just created, syncing initial metadata"), d.current = n, Eo(t) && u.current !== t) {
        console.log("[useMetadataSync] 📤 Syncing metadata to newly created thread:", t);
        const S = e.updateMetadata(n, { metadata: t }).then(() => {
          console.log("[useMetadataSync] ✅ Initial metadata synced successfully"), o.current = t, u.current = t, c.current = null;
        }).catch((R) => {
          console.error(
            "[useMetadataSync] ❌ Failed to sync initial metadata to new thread:",
            R
          ), c.current = null;
        });
        c.current = S;
      }
      return;
    }
    if (d.current = n, !b)
      return;
    if (!Eo(t)) {
      o.current = t;
      return;
    }
    if (h)
      console.log("[useMetadataSync] 📝 Draft state: tracking metadata for future sync"), o.current = t;
    else if (f) {
      if (console.log("[useMetadataSync] 🔄 Existing thread: updating metadata"), u.current === t)
        return;
      if (c.current) {
        c.current.finally(() => {
          if (u.current !== t) {
            const S = e.updateMetadata(n, { metadata: t }).then(() => {
              console.log("[useMetadataSync] ✅ Metadata updated successfully (queued)"), o.current = t, u.current = t, c.current = null;
            }).catch((R) => {
              console.error(
                "[useMetadataSync] ❌ Failed to update existing thread metadata:",
                R
              ), c.current = null;
            });
            c.current = S;
          }
        });
        return;
      }
      const k = e.updateMetadata(n, { metadata: t }).then(() => {
        console.log("[useMetadataSync] ✅ Metadata updated successfully"), o.current = t, u.current = t, c.current = null;
      }).catch((S) => {
        console.error(
          "[useMetadataSync] ❌ Failed to update existing thread metadata:",
          S
        ), c.current = null;
      });
      c.current = k;
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
function pg() {
  const [t, e] = Te(navigator.onLine), [n, r] = Te(!1);
  return Pe(() => {
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
class gg {
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
      l.upload.addEventListener("progress", (c) => {
        if (c.lengthComputable && n) {
          const u = c.loaded / c.total * 100;
          a.forEach((d) => {
            d.progress = u;
          }), n([...a]);
        }
      }), l.addEventListener("load", async () => {
        if (l.status >= 200 && l.status < 300)
          try {
            const c = JSON.parse(l.responseText);
            let u;
            c.data && Array.isArray(c.data) ? u = c.data.map((d, h) => this.processUploadResult(e[h], d)) : Array.isArray(c) ? u = c.map((d, h) => this.processUploadResult(e[h], d)) : u = [this.processUploadResult(e[0], c)], a.forEach((d) => {
              d.status = "completed", d.progress = 100;
            }), n && n([...a]), s(u);
          } catch {
            a.forEach((u) => {
              u.status = "error";
            }), n && n([...a]), o(new Error("Invalid response format"));
          }
        else
          a.forEach((c) => {
            c.status = "error";
          }), n && n([...a]), o(new Error(`Upload failed with status ${l.status}`));
      }), l.addEventListener("error", () => {
        a.forEach((c) => {
          c.status = "error";
        }), n && n([...a]), o(new Error("Network error during upload"));
      }), l.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([c, u]) => {
        l.setRequestHeader(c, u);
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
          const c = l.loaded / l.total * 100;
          n(c);
        }
      }), o.addEventListener("load", async () => {
        if (o.status >= 200 && o.status < 300)
          try {
            const l = JSON.parse(o.responseText), c = this.processUploadResult(e, l);
            a(c);
          } catch {
            s(new Error("Invalid response format"));
          }
        else
          s(new Error(`Upload failed with status ${o.status}`));
      }), o.addEventListener("error", () => {
        s(new Error("Network error during upload"));
      }), o.open("POST", `${this.config.apiUrl}/api/v1/upload`), Object.entries(i).forEach(([l, c]) => {
        o.setRequestHeader(l, c);
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
class mg {
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
const yg = {
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
}, cc = {
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
}, xg = {
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
    if (!cc.isValidWebSocketUrl(t))
      throw new Error(`Invalid WebSocket URL: ${t}. Must start with ws:// or wss://`);
  },
  /**
   * Validate message content before sending
   */
  validateMessageContent: (t) => t.trim().length > 0
}, uc = {
  /**
   * Build CSS class names conditionally
   */
  buildClasses: (...t) => t.filter(Boolean).join(" "),
  /**
   * Get container CSS classes based on configuration
   */
  getContainerClasses: (t, e, n, r, i) => uc.buildClasses(
    "chat-wrapper",
    `chat-wrapper--${t}`,
    e && `chat-wrapper--${e}`,
    n && `chat-wrapper--${n}`,
    r && "chat-wrapper--collapsed",
    t === "embedded" && i && "chat-wrapper--constrained"
  )
}, dc = {
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
  getUserFriendlyErrorMessage: (t) => dc.isNetworkError(t) ? "Connection error. Please check your internet connection and try again." : t.message.includes("authentication") || t.message.includes("auth") ? "Authentication error. Please refresh the page and try again." : t.message.includes("timeout") ? "Request timed out. Please try again." : "An unexpected error occurred. Please try again."
}, Yt = {
  state: yg,
  url: cc,
  validation: xg,
  css: uc,
  error: dc
};
class Ro extends za {
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
        (l, c) => l !== s[c]
      ) && this.resetErrorBoundary();
    }
  }
  render() {
    const { hasError: n, error: r } = this.state, { children: i, fallback: a } = this.props;
    return n && r ? a ? a(r, this.handleRetry) : /* @__PURE__ */ p("div", { className: "chat-wrapper__error-boundary", children: /* @__PURE__ */ M("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "⚠️" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Something went wrong" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: Yt.error.getUserFriendlyErrorMessage(r) }),
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
      })() && /* @__PURE__ */ M("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : i;
  }
}
class wg extends za {
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
    return n && r && (r.message.includes("WebSocket") || r.message.includes("connection") || Yt.error.isNetworkError(r)) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__websocket-error", children: /* @__PURE__ */ M("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "🔌" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "Connection Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: "Unable to establish connection to the chat server." }),
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-actions", children: i ? /* @__PURE__ */ M("div", { className: "chat-wrapper__error-retrying", children: [
        /* @__PURE__ */ p("span", { children: "Reconnecting..." }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__spinner" })
      ] }) : /* @__PURE__ */ M(en, { children: [
        this.retryCount < s && /* @__PURE__ */ M(
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
      })() && /* @__PURE__ */ M("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
}
class bg extends za {
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
    return n && r && (r.message.includes("upload") || r.message.includes("file") || r.message.includes("attachment")) ? /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-error", children: /* @__PURE__ */ M("div", { className: "chat-wrapper__error-content", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__error-icon", children: "📁" }),
      /* @__PURE__ */ p("h3", { className: "chat-wrapper__error-title", children: "File Upload Error" }),
      /* @__PURE__ */ p("p", { className: "chat-wrapper__error-message", children: this.getFileUploadErrorMessage(r) }),
      i && i.length > 0 && /* @__PURE__ */ M("div", { className: "chat-wrapper__failed-files", children: [
        /* @__PURE__ */ p("p", { className: "chat-wrapper__failed-files-title", children: "Failed files:" }),
        /* @__PURE__ */ p("ul", { className: "chat-wrapper__failed-files-list", children: i.map((l, c) => /* @__PURE__ */ p("li", { className: "chat-wrapper__failed-file", children: l }, c)) })
      ] }),
      /* @__PURE__ */ M("div", { className: "chat-wrapper__error-actions", children: [
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
      })() && /* @__PURE__ */ M("details", { className: "chat-wrapper__error-details", children: [
        /* @__PURE__ */ p("summary", { children: "Error Details (Development)" }),
        /* @__PURE__ */ p("pre", { className: "chat-wrapper__error-stack", children: r.stack })
      ] })
    ] }) }) : a;
  }
  getFileUploadErrorMessage(n) {
    return n.message.includes("size") || n.message.includes("large") ? "File size is too large. Please try with smaller files." : n.message.includes("type") || n.message.includes("format") ? "File type is not supported. Please try with different file types." : n.message.includes("network") || n.message.includes("connection") ? "Network error during upload. Please check your connection and try again." : n.message.includes("timeout") ? "Upload timed out. Please try again with smaller files or better connection." : "Failed to upload files. Please try again.";
  }
}
const kg = ({
  className: t,
  onClick: e,
  size: n = 24,
  color: r = "currentColor"
}) => /* @__PURE__ */ M(
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
), Cg = ({
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
), _g = ({
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
), vg = ({
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
), c9 = ({
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
), Sg = ({
  className: t,
  onClick: e,
  size: n = 18,
  color: r = "currentColor"
}) => /* @__PURE__ */ M(
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
), Tg = ({
  mode: t,
  headerName: e,
  bubbleText: n,
  showBubbleText: r = !0,
  onClick: i
}) => {
  const a = t === "modal" ? `Open ${e}` : `Expand ${e}`;
  return /* @__PURE__ */ M(
    "button",
    {
      className: "chat-wrapper__bubble-button",
      onClick: i,
      title: a,
      children: [
        /* @__PURE__ */ p(kg, { className: "chat-wrapper__bubble-icon", size: 24 }),
        r && /* @__PURE__ */ p("span", { className: "chat-wrapper__bubble-text", children: n || "Chat" })
      ]
    }
  );
}, Eg = ({
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
      children: /* @__PURE__ */ p(Cg, { size: 20 })
    }
  ) : null, l = () => {
    if ((e === "sidebar" || e === "fullscreen") && !n && a) {
      const u = e === "fullscreen";
      return /* @__PURE__ */ p(
        "button",
        {
          className: u ? "chat-wrapper__minimize-button" : "chat-wrapper__fullscreen-button",
          onClick: a,
          title: u ? "Switch to sidebar" : "Switch to fullscreen",
          children: /* @__PURE__ */ p(_g, { size: 20, isFullscreen: u })
        }
      );
    }
    return null;
  }, c = () => (e === "sidebar" || e === "fullscreen") && !n && s ? /* @__PURE__ */ p(
    "button",
    {
      className: "chat-wrapper__collapse-button",
      onClick: s,
      title: "Collapse chat",
      children: /* @__PURE__ */ p(vg, { size: 20 })
    }
  ) : null;
  return /* @__PURE__ */ M("div", { className: "chat-wrapper__header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__title-area", children: /* @__PURE__ */ p("h2", { className: "chat-wrapper__title", children: t }) }),
    /* @__PURE__ */ M("div", { className: "chat-wrapper__header-controls", children: [
      l(),
      c(),
      o()
    ] })
  ] });
};
class Rg extends Error {
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
function v(t, e) {
  hc(
    !!t,
    !1,
    !0,
    "ok",
    "Expected value to be truthy",
    e
  );
}
function Sa(t) {
  hc(!1, !1, !0, "ok", "Unreachable", t);
}
function hc(t, e, n, r, i, a) {
  if (!t)
    throw a instanceof Error ? a : new Rg(
      a || i,
      e,
      n,
      r,
      !a
    );
}
function Ng(t, e) {
  const n = {};
  return (t[t.length - 1] === "" ? [...t, ""] : t).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Ag = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ig = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Mg = {};
function No(t, e) {
  return (Mg.jsx ? Ig : Ag).test(t);
}
const Og = /[ \t\n\f\r]/g;
function Lg(t) {
  return typeof t == "object" ? t.type === "text" ? Ao(t.value) : !1 : Ao(t);
}
function Ao(t) {
  return t.replace(Og, "") === "";
}
class Lr {
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
Lr.prototype.normal = {};
Lr.prototype.property = {};
Lr.prototype.space = void 0;
function fc(t, e) {
  const n = {}, r = {};
  for (const i of t)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Lr(n, r, e);
}
function Ta(t) {
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
let Pg = 0;
const ke = On(), Ye = On(), Ea = On(), B = On(), je = On(), jn = On(), vt = On();
function On() {
  return 2 ** ++Pg;
}
const Ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ke,
  booleanish: Ye,
  commaOrSpaceSeparated: vt,
  commaSeparated: jn,
  number: B,
  overloadedBoolean: Ea,
  spaceSeparated: je
}, Symbol.toStringTag, { value: "Module" })), qi = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Ra)
);
class Xa extends kt {
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
    if (super(e, n), Io(this, "space", i), typeof r == "number")
      for (; ++a < qi.length; ) {
        const s = qi[a];
        Io(this, qi[a], (r & Ra[s]) === Ra[s]);
      }
  }
}
Xa.prototype.defined = !0;
function Io(t, e, n) {
  n && (t[e] = n);
}
function tr(t) {
  const e = {}, n = {};
  for (const [r, i] of Object.entries(t.properties)) {
    const a = new Xa(
      r,
      t.transform(t.attributes || {}, r),
      i,
      t.space
    );
    t.mustUseProperty && t.mustUseProperty.includes(r) && (a.mustUseProperty = !0), e[r] = a, n[Ta(r)] = r, n[Ta(a.attribute)] = r;
  }
  return new Lr(e, n, t.space);
}
const pc = tr({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Ye,
    ariaAutoComplete: null,
    ariaBusy: Ye,
    ariaChecked: Ye,
    ariaColCount: B,
    ariaColIndex: B,
    ariaColSpan: B,
    ariaControls: je,
    ariaCurrent: null,
    ariaDescribedBy: je,
    ariaDetails: null,
    ariaDisabled: Ye,
    ariaDropEffect: je,
    ariaErrorMessage: null,
    ariaExpanded: Ye,
    ariaFlowTo: je,
    ariaGrabbed: Ye,
    ariaHasPopup: null,
    ariaHidden: Ye,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: je,
    ariaLevel: B,
    ariaLive: null,
    ariaModal: Ye,
    ariaMultiLine: Ye,
    ariaMultiSelectable: Ye,
    ariaOrientation: null,
    ariaOwns: je,
    ariaPlaceholder: null,
    ariaPosInSet: B,
    ariaPressed: Ye,
    ariaReadOnly: Ye,
    ariaRelevant: null,
    ariaRequired: Ye,
    ariaRoleDescription: je,
    ariaRowCount: B,
    ariaRowIndex: B,
    ariaRowSpan: B,
    ariaSelected: Ye,
    ariaSetSize: B,
    ariaSort: null,
    ariaValueMax: B,
    ariaValueMin: B,
    ariaValueNow: B,
    ariaValueText: null,
    role: null
  },
  transform(t, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function gc(t, e) {
  return e in t ? t[e] : e;
}
function mc(t, e) {
  return gc(t, e.toLowerCase());
}
const Dg = tr({
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
    accept: jn,
    acceptCharset: je,
    accessKey: je,
    action: null,
    allow: null,
    allowFullScreen: ke,
    allowPaymentRequest: ke,
    allowUserMedia: ke,
    alt: null,
    as: null,
    async: ke,
    autoCapitalize: null,
    autoComplete: je,
    autoFocus: ke,
    autoPlay: ke,
    blocking: je,
    capture: null,
    charSet: null,
    checked: ke,
    cite: null,
    className: je,
    cols: B,
    colSpan: null,
    content: null,
    contentEditable: Ye,
    controls: ke,
    controlsList: je,
    coords: B | jn,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ke,
    defer: ke,
    dir: null,
    dirName: null,
    disabled: ke,
    download: Ea,
    draggable: Ye,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ke,
    formTarget: null,
    headers: je,
    height: B,
    hidden: Ea,
    high: B,
    href: null,
    hrefLang: null,
    htmlFor: je,
    httpEquiv: je,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ke,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ke,
    itemId: null,
    itemProp: je,
    itemRef: je,
    itemScope: ke,
    itemType: je,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ke,
    low: B,
    manifest: null,
    max: null,
    maxLength: B,
    media: null,
    method: null,
    min: null,
    minLength: B,
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
    optimum: B,
    pattern: null,
    ping: je,
    placeholder: null,
    playsInline: ke,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ke,
    referrerPolicy: null,
    rel: je,
    required: ke,
    reversed: ke,
    rows: B,
    rowSpan: B,
    sandbox: je,
    scope: null,
    scoped: ke,
    seamless: ke,
    selected: ke,
    shadowRootClonable: ke,
    shadowRootDelegatesFocus: ke,
    shadowRootMode: null,
    shape: null,
    size: B,
    sizes: null,
    slot: null,
    span: B,
    spellCheck: Ye,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: B,
    step: null,
    style: null,
    tabIndex: B,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ke,
    useMap: null,
    value: Ye,
    width: B,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: je,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: B,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: B,
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
    hSpace: B,
    // `<img>` and `<object>`
    leftMargin: B,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: B,
    // `<body>`
    marginWidth: B,
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
    rightMargin: B,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: Ye,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: B,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: B,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: ke,
    disableRemotePlayback: ke,
    prefix: null,
    property: null,
    results: B,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: mc
}), Fg = tr({
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
    about: vt,
    accentHeight: B,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: B,
    amplitude: B,
    arabicForm: null,
    ascent: B,
    attributeName: null,
    attributeType: null,
    azimuth: B,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: B,
    by: null,
    calcMode: null,
    capHeight: B,
    className: je,
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
    descent: B,
    diffuseConstant: B,
    direction: null,
    display: null,
    dur: null,
    divisor: B,
    dominantBaseline: null,
    download: ke,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: B,
    enableBackground: null,
    end: null,
    event: null,
    exponent: B,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: B,
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
    g1: jn,
    g2: jn,
    glyphName: jn,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: B,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: B,
    horizOriginX: B,
    horizOriginY: B,
    id: null,
    ideographic: B,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: B,
    k: B,
    k1: B,
    k2: B,
    k3: B,
    k4: B,
    kernelMatrix: vt,
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
    limitingConeAngle: B,
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
    mediaSize: B,
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
    overlinePosition: B,
    overlineThickness: B,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: B,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: je,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: B,
    pointsAtY: B,
    pointsAtZ: B,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: vt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: vt,
    rev: vt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: vt,
    requiredFeatures: vt,
    requiredFonts: vt,
    requiredFormats: vt,
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
    specularConstant: B,
    specularExponent: B,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: B,
    strikethroughThickness: B,
    string: null,
    stroke: null,
    strokeDashArray: vt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: B,
    strokeOpacity: B,
    strokeWidth: null,
    style: null,
    surfaceScale: B,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: vt,
    tabIndex: B,
    tableValues: null,
    target: null,
    targetX: B,
    targetY: B,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: vt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: B,
    underlineThickness: B,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: B,
    values: null,
    vAlphabetic: B,
    vMathematical: B,
    vectorEffect: null,
    vHanging: B,
    vIdeographic: B,
    version: null,
    vertAdvY: B,
    vertOriginX: B,
    vertOriginY: B,
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
    xHeight: B,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: gc
}), yc = tr({
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
}), xc = tr({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: mc
}), wc = tr({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(t, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), zg = {
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
}, Hg = /[A-Z]/g, Mo = /-[a-z]/g, Ug = /^data[-\w.:]+$/i;
function $g(t, e) {
  const n = Ta(e);
  let r = e, i = kt;
  if (n in t.normal)
    return t.property[t.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Ug.test(e)) {
    if (e.charAt(4) === "-") {
      const a = e.slice(5).replace(Mo, jg);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = e.slice(4);
      if (!Mo.test(a)) {
        let s = a.replace(Hg, Bg);
        s.charAt(0) !== "-" && (s = "-" + s), e = "data" + s;
      }
    }
    i = Xa;
  }
  return new i(r, e);
}
function Bg(t) {
  return "-" + t.toLowerCase();
}
function jg(t) {
  return t.charAt(1).toUpperCase();
}
const Vg = fc([pc, Dg, yc, xc, wc], "html"), Ya = fc([pc, Fg, yc, xc, wc], "svg");
function Zg(t) {
  return t.join(" ").trim();
}
var Ja = {}, Oo = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Wg = /\n/g, Gg = /^\s*/, qg = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Kg = /^:\s*/, Xg = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Yg = /^[;\s]*/, Jg = /^\s+|\s+$/g, Qg = `
`, Lo = "/", Po = "*", Rn = "", em = "comment", tm = "declaration", nm = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t) return [];
  e = e || {};
  var n = 1, r = 1;
  function i(y) {
    var b = y.match(Wg);
    b && (n += b.length);
    var T = y.lastIndexOf(Qg);
    r = ~T ? y.length - T : r + y.length;
  }
  function a() {
    var y = { line: n, column: r };
    return function(b) {
      return b.position = new s(y), c(), b;
    };
  }
  function s(y) {
    this.start = y, this.end = { line: n, column: r }, this.source = e.source;
  }
  s.prototype.content = t;
  function o(y) {
    var b = new Error(
      e.source + ":" + n + ":" + r + ": " + y
    );
    if (b.reason = y, b.filename = e.source, b.line = n, b.column = r, b.source = t, !e.silent) throw b;
  }
  function l(y) {
    var b = y.exec(t);
    if (b) {
      var T = b[0];
      return i(T), t = t.slice(T.length), b;
    }
  }
  function c() {
    l(Gg);
  }
  function u(y) {
    var b;
    for (y = y || []; b = d(); )
      b !== !1 && y.push(b);
    return y;
  }
  function d() {
    var y = a();
    if (!(Lo != t.charAt(0) || Po != t.charAt(1))) {
      for (var b = 2; Rn != t.charAt(b) && (Po != t.charAt(b) || Lo != t.charAt(b + 1)); )
        ++b;
      if (b += 2, Rn === t.charAt(b - 1))
        return o("End of comment missing");
      var T = t.slice(2, b - 2);
      return r += 2, i(T), t = t.slice(b), r += 2, y({
        type: em,
        comment: T
      });
    }
  }
  function h() {
    var y = a(), b = l(qg);
    if (b) {
      if (d(), !l(Kg)) return o("property missing ':'");
      var T = l(Xg), k = y({
        type: tm,
        property: Do(b[0].replace(Oo, Rn)),
        value: T ? Do(T[0].replace(Oo, Rn)) : Rn
      });
      return l(Yg), k;
    }
  }
  function f() {
    var y = [];
    u(y);
    for (var b; b = h(); )
      b !== !1 && (y.push(b), u(y));
    return y;
  }
  return c(), f();
};
function Do(t) {
  return t ? t.replace(Jg, Rn) : Rn;
}
var rm = xi && xi.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Ja, "__esModule", { value: !0 });
Ja.default = am;
var im = rm(nm);
function am(t, e) {
  var n = null;
  if (!t || typeof t != "string")
    return n;
  var r = (0, im.default)(t), i = typeof e == "function";
  return r.forEach(function(a) {
    if (a.type === "declaration") {
      var s = a.property, o = a.value;
      i ? e(s, o, a) : o && (n = n || {}, n[s] = o);
    }
  }), n;
}
var Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
Si.camelCase = void 0;
var sm = /^--[a-zA-Z0-9_-]+$/, om = /-([a-z])/g, lm = /^[^-]+$/, cm = /^-(webkit|moz|ms|o|khtml)-/, um = /^-(ms)-/, dm = function(t) {
  return !t || lm.test(t) || sm.test(t);
}, hm = function(t, e) {
  return e.toUpperCase();
}, Fo = function(t, e) {
  return "".concat(e, "-");
}, fm = function(t, e) {
  return e === void 0 && (e = {}), dm(t) ? t : (t = t.toLowerCase(), e.reactCompat ? t = t.replace(um, Fo) : t = t.replace(cm, Fo), t.replace(om, hm));
};
Si.camelCase = fm;
var pm = xi && xi.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
}, gm = pm(Ja), mm = Si;
function Na(t, e) {
  var n = {};
  return !t || typeof t != "string" || (0, gm.default)(t, function(r, i) {
    r && i && (n[(0, mm.camelCase)(r, e)] = i);
  }), n;
}
Na.default = Na;
var ym = Na;
const xm = /* @__PURE__ */ Ka(ym), bc = kc("end"), Qa = kc("start");
function kc(t) {
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
function wm(t) {
  const e = Qa(t), n = bc(t);
  if (e && n)
    return { start: e, end: n };
}
function kr(t) {
  return !t || typeof t != "object" ? "" : "position" in t || "type" in t ? zo(t.position) : "start" in t || "end" in t ? zo(t) : "line" in t || "column" in t ? Aa(t) : "";
}
function Aa(t) {
  return Ho(t && t.line) + ":" + Ho(t && t.column);
}
function zo(t) {
  return Aa(t && t.start) + "-" + Aa(t && t.end);
}
function Ho(t) {
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
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = o ? o.line : void 0, this.name = kr(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = s && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
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
const es = {}.hasOwnProperty, bm = /* @__PURE__ */ new Map(), km = /[A-Z]/g, Cm = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), _m = /* @__PURE__ */ new Set(["td", "th"]), Cc = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function vm(t, e) {
  if (!e || e.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = e.filePath || void 0;
  let r;
  if (e.development) {
    if (typeof e.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Mm(n, e.jsxDEV);
  } else {
    if (typeof e.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof e.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = Im(n, e.jsx, e.jsxs);
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
    schema: e.space === "svg" ? Ya : Vg,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1
  }, a = _c(i, t, void 0);
  return a && typeof a != "string" ? a : i.create(
    t,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function _c(t, e, n) {
  if (e.type === "element")
    return Sm(t, e, n);
  if (e.type === "mdxFlowExpression" || e.type === "mdxTextExpression")
    return Tm(t, e);
  if (e.type === "mdxJsxFlowElement" || e.type === "mdxJsxTextElement")
    return Rm(t, e, n);
  if (e.type === "mdxjsEsm")
    return Em(t, e);
  if (e.type === "root")
    return Nm(t, e, n);
  if (e.type === "text")
    return Am(t, e);
}
function Sm(t, e, n) {
  const r = t.schema;
  let i = r;
  e.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Ya, t.schema = i), t.ancestors.push(e);
  const a = Sc(t, e.tagName, !1), s = Om(t, e);
  let o = ns(t, e);
  return Cm.has(e.tagName) && (o = o.filter(function(l) {
    return typeof l == "string" ? !Lg(l) : !0;
  })), vc(t, s, a, e), ts(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Tm(t, e) {
  if (e.data && e.data.estree && t.evaluater) {
    const r = e.data.estree.body[0];
    return v(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    t.evaluater.evaluateExpression(r.expression);
  }
  Ir(t, e.position);
}
function Em(t, e) {
  if (e.data && e.data.estree && t.evaluater)
    return (
      /** @type {Child | undefined} */
      t.evaluater.evaluateProgram(e.data.estree)
    );
  Ir(t, e.position);
}
function Rm(t, e, n) {
  const r = t.schema;
  let i = r;
  e.name === "svg" && r.space === "html" && (i = Ya, t.schema = i), t.ancestors.push(e);
  const a = e.name === null ? t.Fragment : Sc(t, e.name, !0), s = Lm(t, e), o = ns(t, e);
  return vc(t, s, a, e), ts(s, o), t.ancestors.pop(), t.schema = r, t.create(e, a, s, n);
}
function Nm(t, e, n) {
  const r = {};
  return ts(r, ns(t, e)), t.create(e, t.Fragment, r, n);
}
function Am(t, e) {
  return e.value;
}
function vc(t, e, n, r) {
  typeof n != "string" && n !== t.Fragment && t.passNode && (e.node = r);
}
function ts(t, e) {
  if (e.length > 0) {
    const n = e.length > 1 ? e : e[0];
    n && (t.children = n);
  }
}
function Im(t, e, n) {
  return r;
  function r(i, a, s, o) {
    const c = Array.isArray(s.children) ? n : e;
    return o ? c(a, s, o) : c(a, s);
  }
}
function Mm(t, e) {
  return n;
  function n(r, i, a, s) {
    const o = Array.isArray(a.children), l = Qa(r);
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
function Om(t, e) {
  const n = {};
  let r, i;
  for (i in e.properties)
    if (i !== "children" && es.call(e.properties, i)) {
      const a = Pm(t, i, e.properties[i]);
      if (a) {
        const [s, o] = a;
        t.tableCellAlignToStyle && s === "align" && typeof o == "string" && _m.has(e.tagName) ? r = o : n[s] = o;
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
function Lm(t, e) {
  const n = {};
  for (const r of e.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && t.evaluater) {
        const a = r.data.estree.body[0];
        v(a.type === "ExpressionStatement");
        const s = a.expression;
        v(s.type === "ObjectExpression");
        const o = s.properties[0];
        v(o.type === "SpreadElement"), Object.assign(
          n,
          t.evaluater.evaluateExpression(o.argument)
        );
      } else
        Ir(t, e.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && t.evaluater) {
          const o = r.value.data.estree.body[0];
          v(o.type === "ExpressionStatement"), a = t.evaluater.evaluateExpression(o.expression);
        } else
          Ir(t, e.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function ns(t, e) {
  const n = [];
  let r = -1;
  const i = t.passKeys ? /* @__PURE__ */ new Map() : bm;
  for (; ++r < e.children.length; ) {
    const a = e.children[r];
    let s;
    if (t.passKeys) {
      const l = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (l) {
        const c = i.get(l) || 0;
        s = l + "-" + c, i.set(l, c + 1);
      }
    }
    const o = _c(t, a, s);
    o !== void 0 && n.push(o);
  }
  return n;
}
function Pm(t, e, n) {
  const r = $g(t.schema, e);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Ng(n) : Zg(n)), r.property === "style") {
      let i = typeof n == "object" ? n : Dm(t, String(n));
      return t.stylePropertyNameCase === "css" && (i = Fm(i)), ["style", i];
    }
    return [
      t.elementAttributeNameCase === "react" && r.space ? zg[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function Dm(t, e) {
  try {
    return xm(e, { reactCompat: !0 });
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
    throw i.file = t.filePath || void 0, i.url = Cc + "#cannot-parse-style-attribute", i;
  }
}
function Sc(t, e, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: e };
  else if (e.includes(".")) {
    const i = e.split(".");
    let a = -1, s;
    for (; ++a < i.length; ) {
      const o = No(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      s = s ? {
        type: "MemberExpression",
        object: s,
        property: o,
        computed: !!(a && o.type === "Literal"),
        optional: !1
      } : o;
    }
    v(s, "always a result"), r = s;
  } else
    r = No(e) && !/^[a-z]/.test(e) ? { type: "Identifier", name: e } : { type: "Literal", value: e };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return es.call(t.components, i) ? t.components[i] : i;
  }
  if (t.evaluater)
    return t.evaluater.evaluateExpression(r);
  Ir(t);
}
function Ir(t, e) {
  const n = new ct(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: t.ancestors,
      place: e,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = t.filePath || void 0, n.url = Cc + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Fm(t) {
  const e = {};
  let n;
  for (n in t)
    es.call(t, n) && (e[zm(n)] = t[n]);
  return e;
}
function zm(t) {
  let e = t.replace(km, Hm);
  return e.slice(0, 3) === "ms-" && (e = "-" + e), e;
}
function Hm(t) {
  return "-" + t.toLowerCase();
}
const Ki = {
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
}, Um = {};
function $m(t, e) {
  const n = Um, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Tc(t, r, i);
}
function Tc(t, e, n) {
  if (Bm(t)) {
    if ("value" in t)
      return t.type === "html" && !n ? "" : t.value;
    if (e && "alt" in t && t.alt)
      return t.alt;
    if ("children" in t)
      return Uo(t.children, e, n);
  }
  return Array.isArray(t) ? Uo(t, e, n) : "";
}
function Uo(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; )
    r[i] = Tc(t[i], e, n);
  return r.join("");
}
function Bm(t) {
  return !!(t && typeof t == "object");
}
const $o = document.createElement("i");
function rs(t) {
  const e = "&" + t + ";";
  $o.innerHTML = e;
  const n = $o.textContent;
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
), Q = (
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
), Xt = (
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
function rn(t, e, n, r) {
  const i = t.length;
  let a = 0, s;
  if (e < 0 ? e = -e > i ? 0 : i + e : e = e > i ? i : e, n = n > 0 ? n : 0, r.length < Q.v8MaxSafeChunkSize)
    s = Array.from(r), s.unshift(e, n), t.splice(...s);
  else
    for (n && t.splice(e, n); a < r.length; )
      s = r.slice(
        a,
        a + Q.v8MaxSafeChunkSize
      ), s.unshift(e, 0), t.splice(...s), a += Q.v8MaxSafeChunkSize, e += Q.v8MaxSafeChunkSize;
}
function Lt(t, e) {
  return t.length > 0 ? (rn(t, t.length, 0, e), t) : e;
}
const Bo = {}.hasOwnProperty;
function jm(t) {
  const e = {};
  let n = -1;
  for (; ++n < t.length; )
    Vm(e, t[n]);
  return e;
}
function Vm(t, e) {
  let n;
  for (n in e) {
    const i = (Bo.call(t, n) ? t[n] : void 0) || (t[n] = {}), a = e[n];
    let s;
    if (a)
      for (s in a) {
        Bo.call(i, s) || (i[s] = []);
        const o = a[s];
        Zm(
          // @ts-expect-error Looks like a list.
          i[s],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function Zm(t, e) {
  let n = -1;
  const r = [];
  for (; ++n < e.length; )
    (e[n].add === "after" ? t : r).push(e[n]);
  rn(t, 0, 0, r);
}
function Ec(t, e) {
  const n = Number.parseInt(t, e);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < m.ht || n === m.vt || n > m.cr && n < m.space || // Control character (DEL) of C0, and C1 controls.
    n > m.tilde && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? Xt.replacementCharacter : String.fromCodePoint(n)
  );
}
function Vn(t) {
  return t.replace(/[\t\n\r ]+/g, Xt.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Jt = kn(/[A-Za-z]/), Et = kn(/[\dA-Za-z]/), Wm = kn(/[#-'*+\--9=?A-Z^-~]/);
function Ia(t) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    t !== null && (t < m.space || t === m.del)
  );
}
const Ma = kn(/\d/), Gm = kn(/[\dA-Fa-f]/), qm = kn(/[!-/:-@[-`{-~]/);
function ae(t) {
  return t !== null && t < m.horizontalTab;
}
function wt(t) {
  return t !== null && (t < m.nul || t === m.space);
}
function Le(t) {
  return t === m.horizontalTab || t === m.virtualSpace || t === m.space;
}
const Km = kn(new RegExp("\\p{P}|\\p{S}", "u")), Xm = kn(/\s/);
function kn(t) {
  return e;
  function e(n) {
    return n !== null && n > -1 && t.test(String.fromCharCode(n));
  }
}
function nr(t) {
  const e = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < t.length; ) {
    const a = t.charCodeAt(n);
    let s = "";
    if (a === m.percentSign && Et(t.charCodeAt(n + 1)) && Et(t.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const o = t.charCodeAt(n + 1);
      a < 56320 && o > 56319 && o < 57344 ? (s = String.fromCharCode(a, o), i = 1) : s = Xt.replacementCharacter;
    } else
      s = String.fromCharCode(a);
    s && (e.push(t.slice(r, n), encodeURIComponent(s)), r = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return e.join("") + t.slice(r);
}
function Ve(t, e, n, r) {
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
const Ym = { tokenize: Jm };
function Jm(t) {
  const e = t.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return e;
  function r(o) {
    if (v(
      o === m.eof || ae(o),
      "expected eol or eof"
    ), o === m.eof) {
      t.consume(o);
      return;
    }
    return t.enter(g.lineEnding), t.consume(o), t.exit(g.lineEnding), Ve(t, e, g.linePrefix);
  }
  function i(o) {
    return v(
      o !== m.eof && !ae(o),
      "expected anything other than a line ending or EOF"
    ), t.enter(g.paragraph), a(o);
  }
  function a(o) {
    const l = t.enter(g.chunkText, {
      contentType: Q.contentTypeText,
      previous: n
    });
    return n && (n.next = l), n = l, s(o);
  }
  function s(o) {
    if (o === m.eof) {
      t.exit(g.chunkText), t.exit(g.paragraph), t.consume(o);
      return;
    }
    return ae(o) ? (t.consume(o), t.exit(g.chunkText), a) : (t.consume(o), s);
  }
}
const Qm = { tokenize: e1 }, jo = { tokenize: t1 };
function e1(t) {
  const e = this, n = [];
  let r = 0, i, a, s;
  return o;
  function o(R) {
    if (r < n.length) {
      const P = n[r];
      return e.containerState = P[1], v(
        P[0].continuation,
        "expected `continuation` to be defined on container construct"
      ), t.attempt(
        P[0].continuation,
        l,
        c
      )(R);
    }
    return c(R);
  }
  function l(R) {
    if (v(
      e.containerState,
      "expected `containerState` to be defined after continuation"
    ), r++, e.containerState._closeFlow) {
      e.containerState._closeFlow = void 0, i && S();
      const P = e.events.length;
      let D = P, _;
      for (; D--; )
        if (e.events[D][0] === "exit" && e.events[D][1].type === g.chunkFlow) {
          _ = e.events[D][1].end;
          break;
        }
      v(_, "could not find previous flow chunk"), k(r);
      let H = P;
      for (; H < e.events.length; )
        e.events[H][1].end = { ..._ }, H++;
      return rn(
        e.events,
        D + 1,
        0,
        e.events.slice(P)
      ), e.events.length = H, c(R);
    }
    return o(R);
  }
  function c(R) {
    if (r === n.length) {
      if (!i)
        return h(R);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return y(R);
      e.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return e.containerState = {}, t.check(
      jo,
      u,
      d
    )(R);
  }
  function u(R) {
    return i && S(), k(r), h(R);
  }
  function d(R) {
    return e.parser.lazy[e.now().line] = r !== n.length, s = e.now().offset, y(R);
  }
  function h(R) {
    return e.containerState = {}, t.attempt(
      jo,
      f,
      y
    )(R);
  }
  function f(R) {
    return v(
      e.currentConstruct,
      "expected `currentConstruct` to be defined on tokenizer"
    ), v(
      e.containerState,
      "expected `containerState` to be defined on tokenizer"
    ), r++, n.push([e.currentConstruct, e.containerState]), h(R);
  }
  function y(R) {
    if (R === m.eof) {
      i && S(), k(0), t.consume(R);
      return;
    }
    return i = i || e.parser.flow(e.now()), t.enter(g.chunkFlow, {
      _tokenizer: i,
      contentType: Q.contentTypeFlow,
      previous: a
    }), b(R);
  }
  function b(R) {
    if (R === m.eof) {
      T(t.exit(g.chunkFlow), !0), k(0), t.consume(R);
      return;
    }
    return ae(R) ? (t.consume(R), T(t.exit(g.chunkFlow)), r = 0, e.interrupt = void 0, o) : (t.consume(R), b);
  }
  function T(R, P) {
    v(i, "expected `childFlow` to be defined when continuing");
    const D = e.sliceStream(R);
    if (P && D.push(null), R.previous = a, a && (a.next = R), a = R, i.defineSkip(R.start), i.write(D), e.parser.lazy[R.start.line]) {
      let _ = i.events.length;
      for (; _--; )
        if (
          // The token starts before the line ending…
          i.events[_][1].start.offset < s && // …and either is not ended yet…
          (!i.events[_][1].end || // …or ends after it.
          i.events[_][1].end.offset > s)
        )
          return;
      const H = e.events.length;
      let U = H, G, J;
      for (; U--; )
        if (e.events[U][0] === "exit" && e.events[U][1].type === g.chunkFlow) {
          if (G) {
            J = e.events[U][1].end;
            break;
          }
          G = !0;
        }
      for (v(J, "could not find previous flow chunk"), k(r), _ = H; _ < e.events.length; )
        e.events[_][1].end = { ...J }, _++;
      rn(
        e.events,
        U + 1,
        0,
        e.events.slice(H)
      ), e.events.length = _;
    }
  }
  function k(R) {
    let P = n.length;
    for (; P-- > R; ) {
      const D = n[P];
      e.containerState = D[1], v(
        D[0].exit,
        "expected `exit` to be defined on container construct"
      ), D[0].exit.call(e, t);
    }
    n.length = R;
  }
  function S() {
    v(
      e.containerState,
      "expected `containerState` to be defined when closing flow"
    ), v(i, "expected `childFlow` to be defined when closing it"), i.write([m.eof]), a = void 0, i = void 0, e.containerState._closeFlow = void 0;
  }
}
function t1(t, e, n) {
  return v(
    this.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Ve(
    t,
    t.attempt(this.parser.constructs.document, e, n),
    g.linePrefix,
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Q.tabSize
  );
}
function Vo(t) {
  if (t === m.eof || wt(t) || Xm(t))
    return Q.characterGroupWhitespace;
  if (Km(t))
    return Q.characterGroupPunctuation;
}
function is(t, e, n) {
  const r = [];
  let i = -1;
  for (; ++i < t.length; ) {
    const a = t[i].resolveAll;
    a && !r.includes(a) && (e = a(e, n), r.push(a));
  }
  return e;
}
const Oa = {
  name: "attention",
  resolveAll: n1,
  tokenize: r1
};
function n1(t, e) {
  let n = -1, r, i, a, s, o, l, c, u;
  for (; ++n < t.length; )
    if (t[n][0] === "enter" && t[n][1].type === "attentionSequence" && t[n][1]._close) {
      for (r = n; r--; )
        if (t[r][0] === "exit" && t[r][1].type === "attentionSequence" && t[r][1]._open && // If the markers are the same:
        e.sliceSerialize(t[r][1]).charCodeAt(0) === e.sliceSerialize(t[n][1]).charCodeAt(0)) {
          if ((t[r][1]._close || t[n][1]._open) && (t[n][1].end.offset - t[n][1].start.offset) % 3 && !((t[r][1].end.offset - t[r][1].start.offset + t[n][1].end.offset - t[n][1].start.offset) % 3))
            continue;
          l = t[r][1].end.offset - t[r][1].start.offset > 1 && t[n][1].end.offset - t[n][1].start.offset > 1 ? 2 : 1;
          const d = { ...t[r][1].end }, h = { ...t[n][1].start };
          Zo(d, -l), Zo(h, l), s = {
            type: l > 1 ? g.strongSequence : g.emphasisSequence,
            start: d,
            end: { ...t[r][1].end }
          }, o = {
            type: l > 1 ? g.strongSequence : g.emphasisSequence,
            start: { ...t[n][1].start },
            end: h
          }, a = {
            type: l > 1 ? g.strongText : g.emphasisText,
            start: { ...t[r][1].end },
            end: { ...t[n][1].start }
          }, i = {
            type: l > 1 ? g.strong : g.emphasis,
            start: { ...s.start },
            end: { ...o.end }
          }, t[r][1].end = { ...s.start }, t[n][1].start = { ...o.end }, c = [], t[r][1].end.offset - t[r][1].start.offset && (c = Lt(c, [
            ["enter", t[r][1], e],
            ["exit", t[r][1], e]
          ])), c = Lt(c, [
            ["enter", i, e],
            ["enter", s, e],
            ["exit", s, e],
            ["enter", a, e]
          ]), v(
            e.parser.constructs.insideSpan.null,
            "expected `insideSpan` to be populated"
          ), c = Lt(
            c,
            is(
              e.parser.constructs.insideSpan.null,
              t.slice(r + 1, n),
              e
            )
          ), c = Lt(c, [
            ["exit", a, e],
            ["enter", o, e],
            ["exit", o, e],
            ["exit", i, e]
          ]), t[n][1].end.offset - t[n][1].start.offset ? (u = 2, c = Lt(c, [
            ["enter", t[n][1], e],
            ["exit", t[n][1], e]
          ])) : u = 0, rn(t, r - 1, n - r + 3, c), n = r + c.length - u - 2;
          break;
        }
    }
  for (n = -1; ++n < t.length; )
    t[n][1].type === "attentionSequence" && (t[n][1].type = "data");
  return t;
}
function r1(t, e) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Vo(r);
  let a;
  return s;
  function s(l) {
    return v(
      l === m.asterisk || l === m.underscore,
      "expected asterisk or underscore"
    ), a = l, t.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === a)
      return t.consume(l), o;
    const c = t.exit("attentionSequence"), u = Vo(l);
    v(n, "expected `attentionMarkers` to be populated");
    const d = !u || u === Q.characterGroupPunctuation && i || n.includes(l), h = !i || i === Q.characterGroupPunctuation && u || n.includes(r);
    return c._open = !!(a === m.asterisk ? d : d && (i || !h)), c._close = !!(a === m.asterisk ? h : h && (u || !d)), e(l);
  }
}
function Zo(t, e) {
  t.column += e, t.offset += e, t._bufferIndex += e;
}
const i1 = { name: "autolink", tokenize: a1 };
function a1(t, e, n) {
  let r = 0;
  return i;
  function i(f) {
    return v(f === m.lessThan, "expected `<`"), t.enter(g.autolink), t.enter(g.autolinkMarker), t.consume(f), t.exit(g.autolinkMarker), t.enter(g.autolinkProtocol), a;
  }
  function a(f) {
    return Jt(f) ? (t.consume(f), s) : f === m.atSign ? n(f) : c(f);
  }
  function s(f) {
    return f === m.plusSign || f === m.dash || f === m.dot || Et(f) ? (r = 1, o(f)) : c(f);
  }
  function o(f) {
    return f === m.colon ? (t.consume(f), r = 0, l) : (f === m.plusSign || f === m.dash || f === m.dot || Et(f)) && r++ < Q.autolinkSchemeSizeMax ? (t.consume(f), o) : (r = 0, c(f));
  }
  function l(f) {
    return f === m.greaterThan ? (t.exit(g.autolinkProtocol), t.enter(g.autolinkMarker), t.consume(f), t.exit(g.autolinkMarker), t.exit(g.autolink), e) : f === m.eof || f === m.space || f === m.lessThan || Ia(f) ? n(f) : (t.consume(f), l);
  }
  function c(f) {
    return f === m.atSign ? (t.consume(f), u) : Wm(f) ? (t.consume(f), c) : n(f);
  }
  function u(f) {
    return Et(f) ? d(f) : n(f);
  }
  function d(f) {
    return f === m.dot ? (t.consume(f), r = 0, u) : f === m.greaterThan ? (t.exit(g.autolinkProtocol).type = g.autolinkEmail, t.enter(g.autolinkMarker), t.consume(f), t.exit(g.autolinkMarker), t.exit(g.autolink), e) : h(f);
  }
  function h(f) {
    if ((f === m.dash || Et(f)) && r++ < Q.autolinkDomainSizeMax) {
      const y = f === m.dash ? h : d;
      return t.consume(f), y;
    }
    return n(f);
  }
}
const Ti = { partial: !0, tokenize: s1 };
function s1(t, e, n) {
  return r;
  function r(a) {
    return Le(a) ? Ve(t, i, g.linePrefix)(a) : i(a);
  }
  function i(a) {
    return a === m.eof || ae(a) ? e(a) : n(a);
  }
}
const Rc = {
  continuation: { tokenize: l1 },
  exit: c1,
  name: "blockQuote",
  tokenize: o1
};
function o1(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    if (s === m.greaterThan) {
      const o = r.containerState;
      return v(o, "expected `containerState` to be defined in container"), o.open || (t.enter(g.blockQuote, { _container: !0 }), o.open = !0), t.enter(g.blockQuotePrefix), t.enter(g.blockQuoteMarker), t.consume(s), t.exit(g.blockQuoteMarker), a;
    }
    return n(s);
  }
  function a(s) {
    return Le(s) ? (t.enter(g.blockQuotePrefixWhitespace), t.consume(s), t.exit(g.blockQuotePrefixWhitespace), t.exit(g.blockQuotePrefix), e) : (t.exit(g.blockQuotePrefix), e(s));
  }
}
function l1(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return Le(s) ? (v(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Ve(
      t,
      a,
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Q.tabSize
    )(s)) : a(s);
  }
  function a(s) {
    return t.attempt(Rc, e, n)(s);
  }
}
function c1(t) {
  t.exit(g.blockQuote);
}
const Nc = {
  name: "characterEscape",
  tokenize: u1
};
function u1(t, e, n) {
  return r;
  function r(a) {
    return v(a === m.backslash, "expected `\\`"), t.enter(g.characterEscape), t.enter(g.escapeMarker), t.consume(a), t.exit(g.escapeMarker), i;
  }
  function i(a) {
    return qm(a) ? (t.enter(g.characterEscapeValue), t.consume(a), t.exit(g.characterEscapeValue), t.exit(g.characterEscape), e) : n(a);
  }
}
const Ac = {
  name: "characterReference",
  tokenize: d1
};
function d1(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(d) {
    return v(d === m.ampersand, "expected `&`"), t.enter(g.characterReference), t.enter(g.characterReferenceMarker), t.consume(d), t.exit(g.characterReferenceMarker), l;
  }
  function l(d) {
    return d === m.numberSign ? (t.enter(g.characterReferenceMarkerNumeric), t.consume(d), t.exit(g.characterReferenceMarkerNumeric), c) : (t.enter(g.characterReferenceValue), a = Q.characterReferenceNamedSizeMax, s = Et, u(d));
  }
  function c(d) {
    return d === m.uppercaseX || d === m.lowercaseX ? (t.enter(g.characterReferenceMarkerHexadecimal), t.consume(d), t.exit(g.characterReferenceMarkerHexadecimal), t.enter(g.characterReferenceValue), a = Q.characterReferenceHexadecimalSizeMax, s = Gm, u) : (t.enter(g.characterReferenceValue), a = Q.characterReferenceDecimalSizeMax, s = Ma, u(d));
  }
  function u(d) {
    if (d === m.semicolon && i) {
      const h = t.exit(g.characterReferenceValue);
      return s === Et && !rs(r.sliceSerialize(h)) ? n(d) : (t.enter(g.characterReferenceMarker), t.consume(d), t.exit(g.characterReferenceMarker), t.exit(g.characterReference), e);
    }
    return s(d) && i++ < a ? (t.consume(d), u) : n(d);
  }
}
const Wo = {
  partial: !0,
  tokenize: f1
}, Go = {
  concrete: !0,
  name: "codeFenced",
  tokenize: h1
};
function h1(t, e, n) {
  const r = this, i = { partial: !0, tokenize: D };
  let a = 0, s = 0, o;
  return l;
  function l(_) {
    return c(_);
  }
  function c(_) {
    v(
      _ === m.graveAccent || _ === m.tilde,
      "expected `` ` `` or `~`"
    );
    const H = r.events[r.events.length - 1];
    return a = H && H[1].type === g.linePrefix ? H[2].sliceSerialize(H[1], !0).length : 0, o = _, t.enter(g.codeFenced), t.enter(g.codeFencedFence), t.enter(g.codeFencedFenceSequence), u(_);
  }
  function u(_) {
    return _ === o ? (s++, t.consume(_), u) : s < Q.codeFencedSequenceSizeMin ? n(_) : (t.exit(g.codeFencedFenceSequence), Le(_) ? Ve(t, d, g.whitespace)(_) : d(_));
  }
  function d(_) {
    return _ === m.eof || ae(_) ? (t.exit(g.codeFencedFence), r.interrupt ? e(_) : t.check(Wo, b, P)(_)) : (t.enter(g.codeFencedFenceInfo), t.enter(g.chunkString, { contentType: Q.contentTypeString }), h(_));
  }
  function h(_) {
    return _ === m.eof || ae(_) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceInfo), d(_)) : Le(_) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceInfo), Ve(t, f, g.whitespace)(_)) : _ === m.graveAccent && _ === o ? n(_) : (t.consume(_), h);
  }
  function f(_) {
    return _ === m.eof || ae(_) ? d(_) : (t.enter(g.codeFencedFenceMeta), t.enter(g.chunkString, { contentType: Q.contentTypeString }), y(_));
  }
  function y(_) {
    return _ === m.eof || ae(_) ? (t.exit(g.chunkString), t.exit(g.codeFencedFenceMeta), d(_)) : _ === m.graveAccent && _ === o ? n(_) : (t.consume(_), y);
  }
  function b(_) {
    return v(ae(_), "expected eol"), t.attempt(i, P, T)(_);
  }
  function T(_) {
    return v(ae(_), "expected eol"), t.enter(g.lineEnding), t.consume(_), t.exit(g.lineEnding), k;
  }
  function k(_) {
    return a > 0 && Le(_) ? Ve(
      t,
      S,
      g.linePrefix,
      a + 1
    )(_) : S(_);
  }
  function S(_) {
    return _ === m.eof || ae(_) ? t.check(Wo, b, P)(_) : (t.enter(g.codeFlowValue), R(_));
  }
  function R(_) {
    return _ === m.eof || ae(_) ? (t.exit(g.codeFlowValue), S(_)) : (t.consume(_), R);
  }
  function P(_) {
    return t.exit(g.codeFenced), e(_);
  }
  function D(_, H, U) {
    let G = 0;
    return J;
    function J(F) {
      return v(ae(F), "expected eol"), _.enter(g.lineEnding), _.consume(F), _.exit(g.lineEnding), Z;
    }
    function Z(F) {
      return v(
        r.parser.constructs.disable.null,
        "expected `disable.null` to be populated"
      ), _.enter(g.codeFencedFence), Le(F) ? Ve(
        _,
        I,
        g.linePrefix,
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Q.tabSize
      )(F) : I(F);
    }
    function I(F) {
      return F === o ? (_.enter(g.codeFencedFenceSequence), E(F)) : U(F);
    }
    function E(F) {
      return F === o ? (G++, _.consume(F), E) : G >= s ? (_.exit(g.codeFencedFenceSequence), Le(F) ? Ve(_, O, g.whitespace)(F) : O(F)) : U(F);
    }
    function O(F) {
      return F === m.eof || ae(F) ? (_.exit(g.codeFencedFence), H(F)) : U(F);
    }
  }
}
function f1(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return s === m.eof ? n(s) : (v(ae(s), "expected eol"), t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), a);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
const Xi = {
  name: "codeIndented",
  tokenize: g1
}, p1 = { partial: !0, tokenize: m1 };
function g1(t, e, n) {
  const r = this;
  return i;
  function i(c) {
    return v(Le(c)), t.enter(g.codeIndented), Ve(
      t,
      a,
      g.linePrefix,
      Q.tabSize + 1
    )(c);
  }
  function a(c) {
    const u = r.events[r.events.length - 1];
    return u && u[1].type === g.linePrefix && u[2].sliceSerialize(u[1], !0).length >= Q.tabSize ? s(c) : n(c);
  }
  function s(c) {
    return c === m.eof ? l(c) : ae(c) ? t.attempt(p1, s, l)(c) : (t.enter(g.codeFlowValue), o(c));
  }
  function o(c) {
    return c === m.eof || ae(c) ? (t.exit(g.codeFlowValue), s(c)) : (t.consume(c), o);
  }
  function l(c) {
    return t.exit(g.codeIndented), e(c);
  }
}
function m1(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return r.parser.lazy[r.now().line] ? n(s) : ae(s) ? (t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), i) : Ve(
      t,
      a,
      g.linePrefix,
      Q.tabSize + 1
    )(s);
  }
  function a(s) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === g.linePrefix && o[2].sliceSerialize(o[1], !0).length >= Q.tabSize ? e(s) : ae(s) ? i(s) : n(s);
  }
}
const y1 = {
  name: "codeText",
  previous: Ic,
  resolve: x1,
  tokenize: w1
};
function x1(t) {
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
function Ic(t) {
  return t !== m.graveAccent || this.events[this.events.length - 1][1].type === g.characterEscape;
}
function w1(t, e, n) {
  const r = this;
  let i = 0, a, s;
  return o;
  function o(h) {
    return v(h === m.graveAccent, "expected `` ` ``"), v(Ic.call(r, r.previous), "expected correct previous"), t.enter(g.codeText), t.enter(g.codeTextSequence), l(h);
  }
  function l(h) {
    return h === m.graveAccent ? (t.consume(h), i++, l) : (t.exit(g.codeTextSequence), c(h));
  }
  function c(h) {
    return h === m.eof ? n(h) : h === m.space ? (t.enter("space"), t.consume(h), t.exit("space"), c) : h === m.graveAccent ? (s = t.enter(g.codeTextSequence), a = 0, d(h)) : ae(h) ? (t.enter(g.lineEnding), t.consume(h), t.exit(g.lineEnding), c) : (t.enter(g.codeTextData), u(h));
  }
  function u(h) {
    return h === m.eof || h === m.space || h === m.graveAccent || ae(h) ? (t.exit(g.codeTextData), c(h)) : (t.consume(h), u);
  }
  function d(h) {
    return h === m.graveAccent ? (t.consume(h), a++, d) : a === i ? (t.exit(g.codeTextSequence), t.exit(g.codeText), e(h)) : (s.type = g.codeTextData, u(h));
  }
}
class b1 {
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
    return r && mr(this.left, r), a.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), mr(this.left, e);
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
    this.setCursor(0), mr(this.right, e.reverse());
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
        mr(this.right, n.reverse());
      } else {
        const n = this.right.splice(
          this.left.length + this.right.length - e,
          Number.POSITIVE_INFINITY
        );
        mr(this.left, n.reverse());
      }
  }
}
function mr(t, e) {
  let n = 0;
  if (e.length < Q.v8MaxSafeChunkSize)
    t.push(...e);
  else
    for (; n < e.length; )
      t.push(
        ...e.slice(n, n + Q.v8MaxSafeChunkSize)
      ), n += Q.v8MaxSafeChunkSize;
}
function Mc(t) {
  const e = {};
  let n = -1, r, i, a, s, o, l, c;
  const u = new b1(t);
  for (; ++n < u.length; ) {
    for (; n in e; )
      n = e[n];
    if (r = u.get(n), n && r[1].type === g.chunkFlow && u.get(n - 1)[1].type === g.listItemPrefix && (v(r[1]._tokenizer, "expected `_tokenizer` on subtokens"), l = r[1]._tokenizer.events, a = 0, a < l.length && l[a][1].type === g.lineEndingBlank && (a += 2), a < l.length && l[a][1].type === g.content))
      for (; ++a < l.length && l[a][1].type !== g.content; )
        l[a][1].type === g.chunkText && (l[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(e, k1(u, n)), n = e[n], c = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (s = u.get(a), s[1].type === g.lineEnding || s[1].type === g.lineEndingBlank)
          s[0] === "enter" && (i && (u.get(i)[1].type = g.lineEndingBlank), s[1].type = g.lineEnding, i = a);
        else if (!(s[1].type === g.linePrefix || s[1].type === g.listItemIndent)) break;
      i && (r[1].end = { ...u.get(i)[1].start }, o = u.slice(i, n), o.unshift(r), u.splice(i, n - i + 1, o));
    }
  }
  return rn(t, 0, Number.POSITIVE_INFINITY, u.slice(0)), !c;
}
function k1(t, e) {
  const n = t.get(e)[1], r = t.get(e)[2];
  let i = e - 1;
  const a = [];
  v(n.contentType, "expected `contentType` on subtokens");
  let s = n._tokenizer;
  s || (s = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = !0));
  const o = s.events, l = [], c = {};
  let u, d, h = -1, f = n, y = 0, b = 0;
  const T = [b];
  for (; f; ) {
    for (; t.get(++i)[1] !== f; )
      ;
    v(
      !d || f.previous === d,
      "expected previous to match"
    ), v(!d || d.next === f, "expected next to match"), a.push(i), f._tokenizer || (u = r.sliceStream(f), f.next || u.push(m.eof), d && s.defineSkip(f.start), f._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = !0), s.write(u), f._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), d = f, f = f.next;
  }
  for (f = n; ++h < o.length; )
    // Find a void token that includes a break.
    o[h][0] === "exit" && o[h - 1][0] === "enter" && o[h][1].type === o[h - 1][1].type && o[h][1].start.line !== o[h][1].end.line && (v(f, "expected a current token"), b = h + 1, T.push(b), f._tokenizer = void 0, f.previous = void 0, f = f.next);
  for (s.events = [], f ? (f._tokenizer = void 0, f.previous = void 0, v(!f.next, "expected no next token")) : T.pop(), h = T.length; h--; ) {
    const k = o.slice(T[h], T[h + 1]), S = a.pop();
    v(S !== void 0, "expected a start position when splicing"), l.push([S, S + k.length - 1]), t.splice(S, 2, k);
  }
  for (l.reverse(), h = -1; ++h < l.length; )
    c[y + l[h][0]] = y + l[h][1], y += l[h][1] - l[h][0] - 1;
  return c;
}
const C1 = { resolve: v1, tokenize: S1 }, _1 = { partial: !0, tokenize: T1 };
function v1(t) {
  return Mc(t), t;
}
function S1(t, e) {
  let n;
  return r;
  function r(o) {
    return v(
      o !== m.eof && !ae(o),
      "expected no eof or eol"
    ), t.enter(g.content), n = t.enter(g.chunkContent, {
      contentType: Q.contentTypeContent
    }), i(o);
  }
  function i(o) {
    return o === m.eof ? a(o) : ae(o) ? t.check(
      _1,
      s,
      a
    )(o) : (t.consume(o), i);
  }
  function a(o) {
    return t.exit(g.chunkContent), t.exit(g.content), e(o);
  }
  function s(o) {
    return v(ae(o), "expected eol"), t.consume(o), t.exit(g.chunkContent), v(n, "expected previous token"), n.next = t.enter(g.chunkContent, {
      contentType: Q.contentTypeContent,
      previous: n
    }), n = n.next, i;
  }
}
function T1(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return v(ae(s), "expected a line ending"), t.exit(g.chunkContent), t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), Ve(t, a, g.linePrefix);
  }
  function a(s) {
    if (s === m.eof || ae(s))
      return n(s);
    v(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    );
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === g.linePrefix && o[2].sliceSerialize(o[1], !0).length >= Q.tabSize ? e(s) : t.interrupt(r.parser.constructs.flow, n, e)(s);
  }
}
function Oc(t, e, n, r, i, a, s, o, l) {
  const c = l || Number.POSITIVE_INFINITY;
  let u = 0;
  return d;
  function d(k) {
    return k === m.lessThan ? (t.enter(r), t.enter(i), t.enter(a), t.consume(k), t.exit(a), h) : k === m.eof || k === m.space || k === m.rightParenthesis || Ia(k) ? n(k) : (t.enter(r), t.enter(s), t.enter(o), t.enter(g.chunkString, { contentType: Q.contentTypeString }), b(k));
  }
  function h(k) {
    return k === m.greaterThan ? (t.enter(a), t.consume(k), t.exit(a), t.exit(i), t.exit(r), e) : (t.enter(o), t.enter(g.chunkString, { contentType: Q.contentTypeString }), f(k));
  }
  function f(k) {
    return k === m.greaterThan ? (t.exit(g.chunkString), t.exit(o), h(k)) : k === m.eof || k === m.lessThan || ae(k) ? n(k) : (t.consume(k), k === m.backslash ? y : f);
  }
  function y(k) {
    return k === m.lessThan || k === m.greaterThan || k === m.backslash ? (t.consume(k), f) : f(k);
  }
  function b(k) {
    return !u && (k === m.eof || k === m.rightParenthesis || wt(k)) ? (t.exit(g.chunkString), t.exit(o), t.exit(s), t.exit(r), e(k)) : u < c && k === m.leftParenthesis ? (t.consume(k), u++, b) : k === m.rightParenthesis ? (t.consume(k), u--, b) : k === m.eof || k === m.space || k === m.leftParenthesis || Ia(k) ? n(k) : (t.consume(k), k === m.backslash ? T : b);
  }
  function T(k) {
    return k === m.leftParenthesis || k === m.rightParenthesis || k === m.backslash ? (t.consume(k), b) : b(k);
  }
}
function Lc(t, e, n, r, i, a) {
  const s = this;
  let o = 0, l;
  return c;
  function c(f) {
    return v(f === m.leftSquareBracket, "expected `[`"), t.enter(r), t.enter(i), t.consume(f), t.exit(i), t.enter(a), u;
  }
  function u(f) {
    return o > Q.linkReferenceSizeMax || f === m.eof || f === m.leftSquareBracket || f === m.rightSquareBracket && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    f === m.caret && !o && "_hiddenFootnoteSupport" in s.parser.constructs ? n(f) : f === m.rightSquareBracket ? (t.exit(a), t.enter(i), t.consume(f), t.exit(i), t.exit(r), e) : ae(f) ? (t.enter(g.lineEnding), t.consume(f), t.exit(g.lineEnding), u) : (t.enter(g.chunkString, { contentType: Q.contentTypeString }), d(f));
  }
  function d(f) {
    return f === m.eof || f === m.leftSquareBracket || f === m.rightSquareBracket || ae(f) || o++ > Q.linkReferenceSizeMax ? (t.exit(g.chunkString), u(f)) : (t.consume(f), l || (l = !Le(f)), f === m.backslash ? h : d);
  }
  function h(f) {
    return f === m.leftSquareBracket || f === m.backslash || f === m.rightSquareBracket ? (t.consume(f), o++, d) : d(f);
  }
}
function Pc(t, e, n, r, i, a) {
  let s;
  return o;
  function o(h) {
    return h === m.quotationMark || h === m.apostrophe || h === m.leftParenthesis ? (t.enter(r), t.enter(i), t.consume(h), t.exit(i), s = h === m.leftParenthesis ? m.rightParenthesis : h, l) : n(h);
  }
  function l(h) {
    return h === s ? (t.enter(i), t.consume(h), t.exit(i), t.exit(r), e) : (t.enter(a), c(h));
  }
  function c(h) {
    return h === s ? (t.exit(a), l(s)) : h === m.eof ? n(h) : ae(h) ? (t.enter(g.lineEnding), t.consume(h), t.exit(g.lineEnding), Ve(t, c, g.linePrefix)) : (t.enter(g.chunkString, { contentType: Q.contentTypeString }), u(h));
  }
  function u(h) {
    return h === s || h === m.eof || ae(h) ? (t.exit(g.chunkString), c(h)) : (t.consume(h), h === m.backslash ? d : u);
  }
  function d(h) {
    return h === s || h === m.backslash ? (t.consume(h), u) : u(h);
  }
}
function Cr(t, e) {
  let n;
  return r;
  function r(i) {
    return ae(i) ? (t.enter(g.lineEnding), t.consume(i), t.exit(g.lineEnding), n = !0, r) : Le(i) ? Ve(
      t,
      r,
      n ? g.linePrefix : g.lineSuffix
    )(i) : e(i);
  }
}
const E1 = { name: "definition", tokenize: N1 }, R1 = { partial: !0, tokenize: A1 };
function N1(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(f) {
    return t.enter(g.definition), s(f);
  }
  function s(f) {
    return v(f === m.leftSquareBracket, "expected `[`"), Lc.call(
      r,
      t,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      g.definitionLabel,
      g.definitionLabelMarker,
      g.definitionLabelString
    )(f);
  }
  function o(f) {
    return i = Vn(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), f === m.colon ? (t.enter(g.definitionMarker), t.consume(f), t.exit(g.definitionMarker), l) : n(f);
  }
  function l(f) {
    return wt(f) ? Cr(t, c)(f) : c(f);
  }
  function c(f) {
    return Oc(
      t,
      u,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      g.definitionDestination,
      g.definitionDestinationLiteral,
      g.definitionDestinationLiteralMarker,
      g.definitionDestinationRaw,
      g.definitionDestinationString
    )(f);
  }
  function u(f) {
    return t.attempt(R1, d, d)(f);
  }
  function d(f) {
    return Le(f) ? Ve(t, h, g.whitespace)(f) : h(f);
  }
  function h(f) {
    return f === m.eof || ae(f) ? (t.exit(g.definition), r.parser.defined.push(i), e(f)) : n(f);
  }
}
function A1(t, e, n) {
  return r;
  function r(o) {
    return wt(o) ? Cr(t, i)(o) : n(o);
  }
  function i(o) {
    return Pc(
      t,
      a,
      n,
      g.definitionTitle,
      g.definitionTitleMarker,
      g.definitionTitleString
    )(o);
  }
  function a(o) {
    return Le(o) ? Ve(
      t,
      s,
      g.whitespace
    )(o) : s(o);
  }
  function s(o) {
    return o === m.eof || ae(o) ? e(o) : n(o);
  }
}
const I1 = {
  name: "hardBreakEscape",
  tokenize: M1
};
function M1(t, e, n) {
  return r;
  function r(a) {
    return v(a === m.backslash, "expected `\\`"), t.enter(g.hardBreakEscape), t.consume(a), i;
  }
  function i(a) {
    return ae(a) ? (t.exit(g.hardBreakEscape), e(a)) : n(a);
  }
}
const O1 = {
  name: "headingAtx",
  resolve: L1,
  tokenize: P1
};
function L1(t, e) {
  let n = t.length - 2, r = 3, i, a;
  return t[r][1].type === g.whitespace && (r += 2), n - 2 > r && t[n][1].type === g.whitespace && (n -= 2), t[n][1].type === g.atxHeadingSequence && (r === n - 1 || n - 4 > r && t[n - 2][1].type === g.whitespace) && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: g.atxHeadingText,
    start: t[r][1].start,
    end: t[n][1].end
  }, a = {
    type: g.chunkText,
    start: t[r][1].start,
    end: t[n][1].end,
    contentType: Q.contentTypeText
  }, rn(t, r, n - r + 1, [
    ["enter", i, e],
    ["enter", a, e],
    ["exit", a, e],
    ["exit", i, e]
  ])), t;
}
function P1(t, e, n) {
  let r = 0;
  return i;
  function i(u) {
    return t.enter(g.atxHeading), a(u);
  }
  function a(u) {
    return v(u === m.numberSign, "expected `#`"), t.enter(g.atxHeadingSequence), s(u);
  }
  function s(u) {
    return u === m.numberSign && r++ < Q.atxHeadingOpeningFenceSizeMax ? (t.consume(u), s) : u === m.eof || wt(u) ? (t.exit(g.atxHeadingSequence), o(u)) : n(u);
  }
  function o(u) {
    return u === m.numberSign ? (t.enter(g.atxHeadingSequence), l(u)) : u === m.eof || ae(u) ? (t.exit(g.atxHeading), e(u)) : Le(u) ? Ve(t, o, g.whitespace)(u) : (t.enter(g.atxHeadingText), c(u));
  }
  function l(u) {
    return u === m.numberSign ? (t.consume(u), l) : (t.exit(g.atxHeadingSequence), o(u));
  }
  function c(u) {
    return u === m.eof || u === m.numberSign || wt(u) ? (t.exit(g.atxHeadingText), o(u)) : (t.consume(u), c);
  }
}
const D1 = [
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
], qo = ["pre", "script", "style", "textarea"], F1 = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: U1,
  tokenize: $1
}, z1 = { partial: !0, tokenize: j1 }, H1 = {
  partial: !0,
  tokenize: B1
};
function U1(t) {
  let e = t.length;
  for (; e-- && !(t[e][0] === "enter" && t[e][1].type === g.htmlFlow); )
    ;
  return e > 1 && t[e - 2][1].type === g.linePrefix && (t[e][1].start = t[e - 2][1].start, t[e + 1][1].start = t[e - 2][1].start, t.splice(e - 2, 2)), t;
}
function $1(t, e, n) {
  const r = this;
  let i, a, s, o, l;
  return c;
  function c(x) {
    return u(x);
  }
  function u(x) {
    return v(x === m.lessThan, "expected `<`"), t.enter(g.htmlFlow), t.enter(g.htmlFlowData), t.consume(x), d;
  }
  function d(x) {
    return x === m.exclamationMark ? (t.consume(x), h) : x === m.slash ? (t.consume(x), a = !0, b) : x === m.questionMark ? (t.consume(x), i = Q.htmlInstruction, r.interrupt ? e : w) : Jt(x) ? (v(x !== null), t.consume(x), s = String.fromCharCode(x), T) : n(x);
  }
  function h(x) {
    return x === m.dash ? (t.consume(x), i = Q.htmlComment, f) : x === m.leftSquareBracket ? (t.consume(x), i = Q.htmlCdata, o = 0, y) : Jt(x) ? (t.consume(x), i = Q.htmlDeclaration, r.interrupt ? e : w) : n(x);
  }
  function f(x) {
    return x === m.dash ? (t.consume(x), r.interrupt ? e : w) : n(x);
  }
  function y(x) {
    const X = Q.cdataOpeningString;
    return x === X.charCodeAt(o++) ? (t.consume(x), o === X.length ? r.interrupt ? e : I : y) : n(x);
  }
  function b(x) {
    return Jt(x) ? (v(x !== null), t.consume(x), s = String.fromCharCode(x), T) : n(x);
  }
  function T(x) {
    if (x === m.eof || x === m.slash || x === m.greaterThan || wt(x)) {
      const X = x === m.slash, V = s.toLowerCase();
      return !X && !a && qo.includes(V) ? (i = Q.htmlRaw, r.interrupt ? e(x) : I(x)) : D1.includes(s.toLowerCase()) ? (i = Q.htmlBasic, X ? (t.consume(x), k) : r.interrupt ? e(x) : I(x)) : (i = Q.htmlComplete, r.interrupt && !r.parser.lazy[r.now().line] ? n(x) : a ? S(x) : R(x));
    }
    return x === m.dash || Et(x) ? (t.consume(x), s += String.fromCharCode(x), T) : n(x);
  }
  function k(x) {
    return x === m.greaterThan ? (t.consume(x), r.interrupt ? e : I) : n(x);
  }
  function S(x) {
    return Le(x) ? (t.consume(x), S) : J(x);
  }
  function R(x) {
    return x === m.slash ? (t.consume(x), J) : x === m.colon || x === m.underscore || Jt(x) ? (t.consume(x), P) : Le(x) ? (t.consume(x), R) : J(x);
  }
  function P(x) {
    return x === m.dash || x === m.dot || x === m.colon || x === m.underscore || Et(x) ? (t.consume(x), P) : D(x);
  }
  function D(x) {
    return x === m.equalsTo ? (t.consume(x), _) : Le(x) ? (t.consume(x), D) : R(x);
  }
  function _(x) {
    return x === m.eof || x === m.lessThan || x === m.equalsTo || x === m.greaterThan || x === m.graveAccent ? n(x) : x === m.quotationMark || x === m.apostrophe ? (t.consume(x), l = x, H) : Le(x) ? (t.consume(x), _) : U(x);
  }
  function H(x) {
    return x === l ? (t.consume(x), l = null, G) : x === m.eof || ae(x) ? n(x) : (t.consume(x), H);
  }
  function U(x) {
    return x === m.eof || x === m.quotationMark || x === m.apostrophe || x === m.slash || x === m.lessThan || x === m.equalsTo || x === m.greaterThan || x === m.graveAccent || wt(x) ? D(x) : (t.consume(x), U);
  }
  function G(x) {
    return x === m.slash || x === m.greaterThan || Le(x) ? R(x) : n(x);
  }
  function J(x) {
    return x === m.greaterThan ? (t.consume(x), Z) : n(x);
  }
  function Z(x) {
    return x === m.eof || ae(x) ? I(x) : Le(x) ? (t.consume(x), Z) : n(x);
  }
  function I(x) {
    return x === m.dash && i === Q.htmlComment ? (t.consume(x), q) : x === m.lessThan && i === Q.htmlRaw ? (t.consume(x), ce) : x === m.greaterThan && i === Q.htmlDeclaration ? (t.consume(x), $) : x === m.questionMark && i === Q.htmlInstruction ? (t.consume(x), w) : x === m.rightSquareBracket && i === Q.htmlCdata ? (t.consume(x), ge) : ae(x) && (i === Q.htmlBasic || i === Q.htmlComplete) ? (t.exit(g.htmlFlowData), t.check(
      z1,
      j,
      E
    )(x)) : x === m.eof || ae(x) ? (t.exit(g.htmlFlowData), E(x)) : (t.consume(x), I);
  }
  function E(x) {
    return t.check(
      H1,
      O,
      j
    )(x);
  }
  function O(x) {
    return v(ae(x)), t.enter(g.lineEnding), t.consume(x), t.exit(g.lineEnding), F;
  }
  function F(x) {
    return x === m.eof || ae(x) ? E(x) : (t.enter(g.htmlFlowData), I(x));
  }
  function q(x) {
    return x === m.dash ? (t.consume(x), w) : I(x);
  }
  function ce(x) {
    return x === m.slash ? (t.consume(x), s = "", re) : I(x);
  }
  function re(x) {
    if (x === m.greaterThan) {
      const X = s.toLowerCase();
      return qo.includes(X) ? (t.consume(x), $) : I(x);
    }
    return Jt(x) && s.length < Q.htmlRawSizeMax ? (v(x !== null), t.consume(x), s += String.fromCharCode(x), re) : I(x);
  }
  function ge(x) {
    return x === m.rightSquareBracket ? (t.consume(x), w) : I(x);
  }
  function w(x) {
    return x === m.greaterThan ? (t.consume(x), $) : x === m.dash && i === Q.htmlComment ? (t.consume(x), w) : I(x);
  }
  function $(x) {
    return x === m.eof || ae(x) ? (t.exit(g.htmlFlowData), j(x)) : (t.consume(x), $);
  }
  function j(x) {
    return t.exit(g.htmlFlow), e(x);
  }
}
function B1(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return ae(s) ? (t.enter(g.lineEnding), t.consume(s), t.exit(g.lineEnding), a) : n(s);
  }
  function a(s) {
    return r.parser.lazy[r.now().line] ? n(s) : e(s);
  }
}
function j1(t, e, n) {
  return r;
  function r(i) {
    return v(ae(i), "expected a line ending"), t.enter(g.lineEnding), t.consume(i), t.exit(g.lineEnding), t.attempt(Ti, e, n);
  }
}
const V1 = { name: "htmlText", tokenize: Z1 };
function Z1(t, e, n) {
  const r = this;
  let i, a, s;
  return o;
  function o(w) {
    return v(w === m.lessThan, "expected `<`"), t.enter(g.htmlText), t.enter(g.htmlTextData), t.consume(w), l;
  }
  function l(w) {
    return w === m.exclamationMark ? (t.consume(w), c) : w === m.slash ? (t.consume(w), D) : w === m.questionMark ? (t.consume(w), R) : Jt(w) ? (t.consume(w), U) : n(w);
  }
  function c(w) {
    return w === m.dash ? (t.consume(w), u) : w === m.leftSquareBracket ? (t.consume(w), a = 0, y) : Jt(w) ? (t.consume(w), S) : n(w);
  }
  function u(w) {
    return w === m.dash ? (t.consume(w), f) : n(w);
  }
  function d(w) {
    return w === m.eof ? n(w) : w === m.dash ? (t.consume(w), h) : ae(w) ? (s = d, ce(w)) : (t.consume(w), d);
  }
  function h(w) {
    return w === m.dash ? (t.consume(w), f) : d(w);
  }
  function f(w) {
    return w === m.greaterThan ? q(w) : w === m.dash ? h(w) : d(w);
  }
  function y(w) {
    const $ = Q.cdataOpeningString;
    return w === $.charCodeAt(a++) ? (t.consume(w), a === $.length ? b : y) : n(w);
  }
  function b(w) {
    return w === m.eof ? n(w) : w === m.rightSquareBracket ? (t.consume(w), T) : ae(w) ? (s = b, ce(w)) : (t.consume(w), b);
  }
  function T(w) {
    return w === m.rightSquareBracket ? (t.consume(w), k) : b(w);
  }
  function k(w) {
    return w === m.greaterThan ? q(w) : w === m.rightSquareBracket ? (t.consume(w), k) : b(w);
  }
  function S(w) {
    return w === m.eof || w === m.greaterThan ? q(w) : ae(w) ? (s = S, ce(w)) : (t.consume(w), S);
  }
  function R(w) {
    return w === m.eof ? n(w) : w === m.questionMark ? (t.consume(w), P) : ae(w) ? (s = R, ce(w)) : (t.consume(w), R);
  }
  function P(w) {
    return w === m.greaterThan ? q(w) : R(w);
  }
  function D(w) {
    return Jt(w) ? (t.consume(w), _) : n(w);
  }
  function _(w) {
    return w === m.dash || Et(w) ? (t.consume(w), _) : H(w);
  }
  function H(w) {
    return ae(w) ? (s = H, ce(w)) : Le(w) ? (t.consume(w), H) : q(w);
  }
  function U(w) {
    return w === m.dash || Et(w) ? (t.consume(w), U) : w === m.slash || w === m.greaterThan || wt(w) ? G(w) : n(w);
  }
  function G(w) {
    return w === m.slash ? (t.consume(w), q) : w === m.colon || w === m.underscore || Jt(w) ? (t.consume(w), J) : ae(w) ? (s = G, ce(w)) : Le(w) ? (t.consume(w), G) : q(w);
  }
  function J(w) {
    return w === m.dash || w === m.dot || w === m.colon || w === m.underscore || Et(w) ? (t.consume(w), J) : Z(w);
  }
  function Z(w) {
    return w === m.equalsTo ? (t.consume(w), I) : ae(w) ? (s = Z, ce(w)) : Le(w) ? (t.consume(w), Z) : G(w);
  }
  function I(w) {
    return w === m.eof || w === m.lessThan || w === m.equalsTo || w === m.greaterThan || w === m.graveAccent ? n(w) : w === m.quotationMark || w === m.apostrophe ? (t.consume(w), i = w, E) : ae(w) ? (s = I, ce(w)) : Le(w) ? (t.consume(w), I) : (t.consume(w), O);
  }
  function E(w) {
    return w === i ? (t.consume(w), i = void 0, F) : w === m.eof ? n(w) : ae(w) ? (s = E, ce(w)) : (t.consume(w), E);
  }
  function O(w) {
    return w === m.eof || w === m.quotationMark || w === m.apostrophe || w === m.lessThan || w === m.equalsTo || w === m.graveAccent ? n(w) : w === m.slash || w === m.greaterThan || wt(w) ? G(w) : (t.consume(w), O);
  }
  function F(w) {
    return w === m.slash || w === m.greaterThan || wt(w) ? G(w) : n(w);
  }
  function q(w) {
    return w === m.greaterThan ? (t.consume(w), t.exit(g.htmlTextData), t.exit(g.htmlText), e) : n(w);
  }
  function ce(w) {
    return v(s, "expected return state"), v(ae(w), "expected eol"), t.exit(g.htmlTextData), t.enter(g.lineEnding), t.consume(w), t.exit(g.lineEnding), re;
  }
  function re(w) {
    return v(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Le(w) ? Ve(
      t,
      ge,
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Q.tabSize
    )(w) : ge(w);
  }
  function ge(w) {
    return t.enter(g.htmlTextData), s(w);
  }
}
const as = {
  name: "labelEnd",
  resolveAll: K1,
  resolveTo: X1,
  tokenize: Y1
}, W1 = { tokenize: J1 }, G1 = { tokenize: Q1 }, q1 = { tokenize: e0 };
function K1(t) {
  let e = -1;
  const n = [];
  for (; ++e < t.length; ) {
    const r = t[e][1];
    if (n.push(t[e]), r.type === g.labelImage || r.type === g.labelLink || r.type === g.labelEnd) {
      const i = r.type === g.labelImage ? 4 : 2;
      r.type = g.data, e += i;
    }
  }
  return t.length !== n.length && rn(t, 0, t.length, n), t;
}
function X1(t, e) {
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
  v(a !== void 0, "`open` is supposed to be found"), v(s !== void 0, "`close` is supposed to be found");
  const l = {
    type: t[a][1].type === g.labelLink ? g.link : g.image,
    start: { ...t[a][1].start },
    end: { ...t[t.length - 1][1].end }
  }, c = {
    type: g.label,
    start: { ...t[a][1].start },
    end: { ...t[s][1].end }
  }, u = {
    type: g.labelText,
    start: { ...t[a + r + 2][1].end },
    end: { ...t[s - 2][1].start }
  };
  return o = [
    ["enter", l, e],
    ["enter", c, e]
  ], o = Lt(o, t.slice(a + 1, a + r + 3)), o = Lt(o, [["enter", u, e]]), v(
    e.parser.constructs.insideSpan.null,
    "expected `insideSpan.null` to be populated"
  ), o = Lt(
    o,
    is(
      e.parser.constructs.insideSpan.null,
      t.slice(a + r + 4, s - 3),
      e
    )
  ), o = Lt(o, [
    ["exit", u, e],
    t[s - 2],
    t[s - 1],
    ["exit", c, e]
  ]), o = Lt(o, t.slice(s + 1)), o = Lt(o, [["exit", l, e]]), rn(t, a, t.length, o), t;
}
function Y1(t, e, n) {
  const r = this;
  let i = r.events.length, a, s;
  for (; i--; )
    if ((r.events[i][1].type === g.labelImage || r.events[i][1].type === g.labelLink) && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(h) {
    return v(h === m.rightSquareBracket, "expected `]`"), a ? a._inactive ? d(h) : (s = r.parser.defined.includes(
      Vn(
        r.sliceSerialize({ start: a.end, end: r.now() })
      )
    ), t.enter(g.labelEnd), t.enter(g.labelMarker), t.consume(h), t.exit(g.labelMarker), t.exit(g.labelEnd), l) : n(h);
  }
  function l(h) {
    return h === m.leftParenthesis ? t.attempt(
      W1,
      u,
      s ? u : d
    )(h) : h === m.leftSquareBracket ? t.attempt(
      G1,
      u,
      s ? c : d
    )(h) : s ? u(h) : d(h);
  }
  function c(h) {
    return t.attempt(
      q1,
      u,
      d
    )(h);
  }
  function u(h) {
    return e(h);
  }
  function d(h) {
    return a._balanced = !0, n(h);
  }
}
function J1(t, e, n) {
  return r;
  function r(d) {
    return v(d === m.leftParenthesis, "expected left paren"), t.enter(g.resource), t.enter(g.resourceMarker), t.consume(d), t.exit(g.resourceMarker), i;
  }
  function i(d) {
    return wt(d) ? Cr(t, a)(d) : a(d);
  }
  function a(d) {
    return d === m.rightParenthesis ? u(d) : Oc(
      t,
      s,
      o,
      g.resourceDestination,
      g.resourceDestinationLiteral,
      g.resourceDestinationLiteralMarker,
      g.resourceDestinationRaw,
      g.resourceDestinationString,
      Q.linkResourceDestinationBalanceMax
    )(d);
  }
  function s(d) {
    return wt(d) ? Cr(t, l)(d) : u(d);
  }
  function o(d) {
    return n(d);
  }
  function l(d) {
    return d === m.quotationMark || d === m.apostrophe || d === m.leftParenthesis ? Pc(
      t,
      c,
      n,
      g.resourceTitle,
      g.resourceTitleMarker,
      g.resourceTitleString
    )(d) : u(d);
  }
  function c(d) {
    return wt(d) ? Cr(t, u)(d) : u(d);
  }
  function u(d) {
    return d === m.rightParenthesis ? (t.enter(g.resourceMarker), t.consume(d), t.exit(g.resourceMarker), t.exit(g.resource), e) : n(d);
  }
}
function Q1(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return v(o === m.leftSquareBracket, "expected left bracket"), Lc.call(
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
      Vn(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? e(o) : n(o);
  }
  function s(o) {
    return n(o);
  }
}
function e0(t, e, n) {
  return r;
  function r(a) {
    return v(a === m.leftSquareBracket, "expected left bracket"), t.enter(g.reference), t.enter(g.referenceMarker), t.consume(a), t.exit(g.referenceMarker), i;
  }
  function i(a) {
    return a === m.rightSquareBracket ? (t.enter(g.referenceMarker), t.consume(a), t.exit(g.referenceMarker), t.exit(g.reference), e) : n(a);
  }
}
const t0 = {
  name: "labelStartImage",
  resolveAll: as.resolveAll,
  tokenize: n0
};
function n0(t, e, n) {
  const r = this;
  return i;
  function i(o) {
    return v(o === m.exclamationMark, "expected `!`"), t.enter(g.labelImage), t.enter(g.labelImageMarker), t.consume(o), t.exit(g.labelImageMarker), a;
  }
  function a(o) {
    return o === m.leftSquareBracket ? (t.enter(g.labelMarker), t.consume(o), t.exit(g.labelMarker), t.exit(g.labelImage), s) : n(o);
  }
  function s(o) {
    return o === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : e(o);
  }
}
const r0 = {
  name: "labelStartLink",
  resolveAll: as.resolveAll,
  tokenize: i0
};
function i0(t, e, n) {
  const r = this;
  return i;
  function i(s) {
    return v(s === m.leftSquareBracket, "expected `[`"), t.enter(g.labelLink), t.enter(g.labelMarker), t.consume(s), t.exit(g.labelMarker), t.exit(g.labelLink), a;
  }
  function a(s) {
    return s === m.caret && "_hiddenFootnoteSupport" in r.parser.constructs ? n(s) : e(s);
  }
}
const Yi = { name: "lineEnding", tokenize: a0 };
function a0(t, e) {
  return n;
  function n(r) {
    return v(ae(r), "expected eol"), t.enter(g.lineEnding), t.consume(r), t.exit(g.lineEnding), Ve(t, e, g.linePrefix);
  }
}
const Qr = {
  name: "thematicBreak",
  tokenize: s0
};
function s0(t, e, n) {
  let r = 0, i;
  return a;
  function a(c) {
    return t.enter(g.thematicBreak), s(c);
  }
  function s(c) {
    return v(
      c === m.asterisk || c === m.dash || c === m.underscore,
      "expected `*`, `-`, or `_`"
    ), i = c, o(c);
  }
  function o(c) {
    return c === i ? (t.enter(g.thematicBreakSequence), l(c)) : r >= Q.thematicBreakMarkerCountMin && (c === m.eof || ae(c)) ? (t.exit(g.thematicBreak), e(c)) : n(c);
  }
  function l(c) {
    return c === i ? (t.consume(c), r++, l) : (t.exit(g.thematicBreakSequence), Le(c) ? Ve(t, o, g.whitespace)(c) : o(c));
  }
}
const yt = {
  continuation: { tokenize: u0 },
  exit: h0,
  name: "list",
  tokenize: c0
}, o0 = {
  partial: !0,
  tokenize: f0
}, l0 = { partial: !0, tokenize: d0 };
function c0(t, e, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === g.linePrefix ? i[2].sliceSerialize(i[1], !0).length : 0, s = 0;
  return o;
  function o(f) {
    v(r.containerState, "expected state");
    const y = r.containerState.type || (f === m.asterisk || f === m.plusSign || f === m.dash ? g.listUnordered : g.listOrdered);
    if (y === g.listUnordered ? !r.containerState.marker || f === r.containerState.marker : Ma(f)) {
      if (r.containerState.type || (r.containerState.type = y, t.enter(y, { _container: !0 })), y === g.listUnordered)
        return t.enter(g.listItemPrefix), f === m.asterisk || f === m.dash ? t.check(Qr, n, c)(f) : c(f);
      if (!r.interrupt || f === m.digit1)
        return t.enter(g.listItemPrefix), t.enter(g.listItemValue), l(f);
    }
    return n(f);
  }
  function l(f) {
    return v(r.containerState, "expected state"), Ma(f) && ++s < Q.listItemValueSizeMax ? (t.consume(f), l) : (!r.interrupt || s < 2) && (r.containerState.marker ? f === r.containerState.marker : f === m.rightParenthesis || f === m.dot) ? (t.exit(g.listItemValue), c(f)) : n(f);
  }
  function c(f) {
    return v(r.containerState, "expected state"), v(f !== m.eof, "eof (`null`) is not a marker"), t.enter(g.listItemMarker), t.consume(f), t.exit(g.listItemMarker), r.containerState.marker = r.containerState.marker || f, t.check(
      Ti,
      // Can’t be empty when interrupting.
      r.interrupt ? n : u,
      t.attempt(
        o0,
        h,
        d
      )
    );
  }
  function u(f) {
    return v(r.containerState, "expected state"), r.containerState.initialBlankLine = !0, a++, h(f);
  }
  function d(f) {
    return Le(f) ? (t.enter(g.listItemPrefixWhitespace), t.consume(f), t.exit(g.listItemPrefixWhitespace), h) : n(f);
  }
  function h(f) {
    return v(r.containerState, "expected state"), r.containerState.size = a + r.sliceSerialize(t.exit(g.listItemPrefix), !0).length, e(f);
  }
}
function u0(t, e, n) {
  const r = this;
  return v(r.containerState, "expected state"), r.containerState._closeFlow = void 0, t.check(Ti, i, a);
  function i(o) {
    return v(r.containerState, "expected state"), v(typeof r.containerState.size == "number", "expected size"), r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Ve(
      t,
      e,
      g.listItemIndent,
      r.containerState.size + 1
    )(o);
  }
  function a(o) {
    return v(r.containerState, "expected state"), r.containerState.furtherBlankLines || !Le(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, s(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, t.attempt(l0, e, s)(o));
  }
  function s(o) {
    return v(r.containerState, "expected state"), r.containerState._closeFlow = !0, r.interrupt = void 0, v(
      r.parser.constructs.disable.null,
      "expected `disable.null` to be populated"
    ), Ve(
      t,
      t.attempt(yt, e, n),
      g.linePrefix,
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Q.tabSize
    )(o);
  }
}
function d0(t, e, n) {
  const r = this;
  return v(r.containerState, "expected state"), v(typeof r.containerState.size == "number", "expected size"), Ve(
    t,
    i,
    g.listItemIndent,
    r.containerState.size + 1
  );
  function i(a) {
    v(r.containerState, "expected state");
    const s = r.events[r.events.length - 1];
    return s && s[1].type === g.listItemIndent && s[2].sliceSerialize(s[1], !0).length === r.containerState.size ? e(a) : n(a);
  }
}
function h0(t) {
  v(this.containerState, "expected state"), v(typeof this.containerState.type == "string", "expected type"), t.exit(this.containerState.type);
}
function f0(t, e, n) {
  const r = this;
  return v(
    r.parser.constructs.disable.null,
    "expected `disable.null` to be populated"
  ), Ve(
    t,
    i,
    g.listItemPrefixWhitespace,
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : Q.tabSize + 1
  );
  function i(a) {
    const s = r.events[r.events.length - 1];
    return !Le(a) && s && s[1].type === g.listItemPrefixWhitespace ? e(a) : n(a);
  }
}
const Ko = {
  name: "setextUnderline",
  resolveTo: p0,
  tokenize: g0
};
function p0(t, e) {
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
  v(i !== void 0, "expected a `text` index to be found"), v(r !== void 0, "expected a `text` index to be found"), v(t[r][2] === e, "enter context should be same"), v(
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
function g0(t, e, n) {
  const r = this;
  let i;
  return a;
  function a(c) {
    let u = r.events.length, d;
    for (v(
      c === m.dash || c === m.equalsTo,
      "expected `=` or `-`"
    ); u--; )
      if (r.events[u][1].type !== g.lineEnding && r.events[u][1].type !== g.linePrefix && r.events[u][1].type !== g.content) {
        d = r.events[u][1].type === g.paragraph;
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || d) ? (t.enter(g.setextHeadingLine), i = c, s(c)) : n(c);
  }
  function s(c) {
    return t.enter(g.setextHeadingLineSequence), o(c);
  }
  function o(c) {
    return c === i ? (t.consume(c), o) : (t.exit(g.setextHeadingLineSequence), Le(c) ? Ve(t, l, g.lineSuffix)(c) : l(c));
  }
  function l(c) {
    return c === m.eof || ae(c) ? (t.exit(g.setextHeadingLine), e(c)) : n(c);
  }
}
const m0 = { tokenize: y0 };
function y0(t) {
  const e = this, n = t.attempt(
    // Try to parse a blank line.
    Ti,
    r,
    // Try to parse initial flow (essentially, only code).
    t.attempt(
      this.parser.constructs.flowInitial,
      i,
      Ve(
        t,
        t.attempt(
          this.parser.constructs.flow,
          i,
          t.attempt(C1, i)
        ),
        g.linePrefix
      )
    )
  );
  return n;
  function r(a) {
    if (v(
      a === m.eof || ae(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(g.lineEndingBlank), t.consume(a), t.exit(g.lineEndingBlank), e.currentConstruct = void 0, n;
  }
  function i(a) {
    if (v(
      a === m.eof || ae(a),
      "expected eol or eof"
    ), a === m.eof) {
      t.consume(a);
      return;
    }
    return t.enter(g.lineEnding), t.consume(a), t.exit(g.lineEnding), e.currentConstruct = void 0, n;
  }
}
const x0 = { resolveAll: Fc() }, w0 = Dc("string"), b0 = Dc("text");
function Dc(t) {
  return {
    resolveAll: Fc(
      t === "text" ? k0 : void 0
    ),
    tokenize: e
  };
  function e(n) {
    const r = this, i = this.parser.constructs[t], a = n.attempt(i, s, o);
    return s;
    function s(u) {
      return c(u) ? a(u) : o(u);
    }
    function o(u) {
      if (u === m.eof) {
        n.consume(u);
        return;
      }
      return n.enter(g.data), n.consume(u), l;
    }
    function l(u) {
      return c(u) ? (n.exit(g.data), a(u)) : (n.consume(u), l);
    }
    function c(u) {
      if (u === m.eof)
        return !0;
      const d = i[u];
      let h = -1;
      if (d)
        for (v(Array.isArray(d), "expected `disable.null` to be populated"); ++h < d.length; ) {
          const f = d[h];
          if (!f.previous || f.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Fc(t) {
  return e;
  function e(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === g.data && (a = i, i++) : (!n[i] || n[i][1].type !== g.data) && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return t ? t(n, r) : n;
  }
}
function k0(t, e) {
  let n = 0;
  for (; ++n <= t.length; )
    if ((n === t.length || t[n][1].type === g.lineEnding) && t[n - 1][1].type === g.data) {
      const r = t[n - 1][1], i = e.sliceStream(r);
      let a = i.length, s = -1, o = 0, l;
      for (; a--; ) {
        const c = i[a];
        if (typeof c == "string") {
          for (s = c.length; c.charCodeAt(s - 1) === m.space; )
            o++, s--;
          if (s) break;
          s = -1;
        } else if (c === m.horizontalTab)
          l = !0, o++;
        else if (c !== m.virtualSpace) {
          a++;
          break;
        }
      }
      if (e._contentTypeTextTrailing && n === t.length && (o = 0), o) {
        const c = {
          type: n === t.length || l || o < Q.hardBreakPrefixSizeMin ? g.lineSuffix : g.hardBreakTrailing,
          start: {
            _bufferIndex: a ? s : r.start._bufferIndex + s,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o
          },
          end: { ...r.end }
        };
        r.end = { ...c.start }, r.start.offset === r.end.offset ? Object.assign(r, c) : (t.splice(
          n,
          0,
          ["enter", c, e],
          ["exit", c, e]
        ), n += 2);
      }
      n++;
    }
  return t;
}
const C0 = {
  [m.asterisk]: yt,
  [m.plusSign]: yt,
  [m.dash]: yt,
  [m.digit0]: yt,
  [m.digit1]: yt,
  [m.digit2]: yt,
  [m.digit3]: yt,
  [m.digit4]: yt,
  [m.digit5]: yt,
  [m.digit6]: yt,
  [m.digit7]: yt,
  [m.digit8]: yt,
  [m.digit9]: yt,
  [m.greaterThan]: Rc
}, _0 = {
  [m.leftSquareBracket]: E1
}, v0 = {
  [m.horizontalTab]: Xi,
  [m.virtualSpace]: Xi,
  [m.space]: Xi
}, S0 = {
  [m.numberSign]: O1,
  [m.asterisk]: Qr,
  [m.dash]: [Ko, Qr],
  [m.lessThan]: F1,
  [m.equalsTo]: Ko,
  [m.underscore]: Qr,
  [m.graveAccent]: Go,
  [m.tilde]: Go
}, T0 = {
  [m.ampersand]: Ac,
  [m.backslash]: Nc
}, E0 = {
  [m.carriageReturn]: Yi,
  [m.lineFeed]: Yi,
  [m.carriageReturnLineFeed]: Yi,
  [m.exclamationMark]: t0,
  [m.ampersand]: Ac,
  [m.asterisk]: Oa,
  [m.lessThan]: [i1, V1],
  [m.leftSquareBracket]: r0,
  [m.backslash]: [I1, Nc],
  [m.rightSquareBracket]: as,
  [m.underscore]: Oa,
  [m.graveAccent]: y1
}, R0 = { null: [Oa, x0] }, N0 = { null: [m.asterisk, m.underscore] }, A0 = { null: [] }, I0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: N0,
  contentInitial: _0,
  disable: A0,
  document: C0,
  flow: S0,
  flowInitial: v0,
  insideSpan: R0,
  string: T0,
  text: E0
}, Symbol.toStringTag, { value: "Module" }));
var La = { exports: {} }, Ji, Xo;
function M0() {
  if (Xo) return Ji;
  Xo = 1;
  var t = 1e3, e = t * 60, n = e * 60, r = n * 24, i = r * 7, a = r * 365.25;
  Ji = function(u, d) {
    d = d || {};
    var h = typeof u;
    if (h === "string" && u.length > 0)
      return s(u);
    if (h === "number" && isFinite(u))
      return d.long ? l(u) : o(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function s(u) {
    if (u = String(u), !(u.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (d) {
        var h = parseFloat(d[1]), f = (d[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * a;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function o(u) {
    var d = Math.abs(u);
    return d >= r ? Math.round(u / r) + "d" : d >= n ? Math.round(u / n) + "h" : d >= e ? Math.round(u / e) + "m" : d >= t ? Math.round(u / t) + "s" : u + "ms";
  }
  function l(u) {
    var d = Math.abs(u);
    return d >= r ? c(u, d, r, "day") : d >= n ? c(u, d, n, "hour") : d >= e ? c(u, d, e, "minute") : d >= t ? c(u, d, t, "second") : u + " ms";
  }
  function c(u, d, h, f) {
    var y = d >= h * 1.5;
    return Math.round(u / h) + " " + f + (y ? "s" : "");
  }
  return Ji;
}
function O0(t) {
  n.debug = n, n.default = n, n.coerce = l, n.disable = s, n.enable = i, n.enabled = o, n.humanize = M0(), n.destroy = c, Object.keys(t).forEach((u) => {
    n[u] = t[u];
  }), n.names = [], n.skips = [], n.formatters = {};
  function e(u) {
    let d = 0;
    for (let h = 0; h < u.length; h++)
      d = (d << 5) - d + u.charCodeAt(h), d |= 0;
    return n.colors[Math.abs(d) % n.colors.length];
  }
  n.selectColor = e;
  function n(u) {
    let d, h = null, f, y;
    function b(...T) {
      if (!b.enabled)
        return;
      const k = b, S = Number(/* @__PURE__ */ new Date()), R = S - (d || S);
      k.diff = R, k.prev = d, k.curr = S, d = S, T[0] = n.coerce(T[0]), typeof T[0] != "string" && T.unshift("%O");
      let P = 0;
      T[0] = T[0].replace(/%([a-zA-Z%])/g, (_, H) => {
        if (_ === "%%")
          return "%";
        P++;
        const U = n.formatters[H];
        if (typeof U == "function") {
          const G = T[P];
          _ = U.call(k, G), T.splice(P, 1), P--;
        }
        return _;
      }), n.formatArgs.call(k, T), (k.log || n.log).apply(k, T);
    }
    return b.namespace = u, b.useColors = n.useColors(), b.color = n.selectColor(u), b.extend = r, b.destroy = n.destroy, Object.defineProperty(b, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => h !== null ? h : (f !== n.namespaces && (f = n.namespaces, y = n.enabled(u)), y),
      set: (T) => {
        h = T;
      }
    }), typeof n.init == "function" && n.init(b), b;
  }
  function r(u, d) {
    const h = n(this.namespace + (typeof d > "u" ? ":" : d) + u);
    return h.log = this.log, h;
  }
  function i(u) {
    n.save(u), n.namespaces = u, n.names = [], n.skips = [];
    const d = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
    for (const h of d)
      h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
  }
  function a(u, d) {
    let h = 0, f = 0, y = -1, b = 0;
    for (; h < u.length; )
      if (f < d.length && (d[f] === u[h] || d[f] === "*"))
        d[f] === "*" ? (y = f, b = h, f++) : (h++, f++);
      else if (y !== -1)
        f = y + 1, b++, h = b;
      else
        return !1;
    for (; f < d.length && d[f] === "*"; )
      f++;
    return f === d.length;
  }
  function s() {
    const u = [
      ...n.names,
      ...n.skips.map((d) => "-" + d)
    ].join(",");
    return n.enable(""), u;
  }
  function o(u) {
    for (const d of n.skips)
      if (a(u, d))
        return !1;
    for (const d of n.names)
      if (a(u, d))
        return !0;
    return !1;
  }
  function l(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function c() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return n.enable(n.load()), n;
}
var L0 = O0;
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
    const c = "color: " + this.color;
    l.splice(1, 0, c, "color: inherit");
    let u = 0, d = 0;
    l[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== "%%" && (u++, h === "%c" && (d = u));
    }), l.splice(d, 0, c);
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
  t.exports = L0(e);
  const { formatters: o } = t.exports;
  o.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (c) {
      return "[UnexpectedJSONParseError]: " + c.message;
    }
  };
})(La, La.exports);
var P0 = La.exports;
const D0 = /* @__PURE__ */ Ka(P0), Tn = D0("micromark");
function F0(t, e, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let s = [], o = [], l = !0;
  const c = {
    attempt: G(H),
    check: G(U),
    consume: P,
    enter: D,
    exit: _,
    interrupt: G(U, { interrupt: !0 })
  }, u = {
    code: m.eof,
    containerState: {},
    defineSkip: k,
    events: [],
    now: T,
    parser: t,
    previous: m.eof,
    sliceSerialize: y,
    sliceStream: b,
    write: f
  };
  let d = e.tokenize.call(u, c), h;
  return e.resolveAll && a.push(e), u;
  function f(E) {
    return s = Lt(s, E), S(), s[s.length - 1] !== m.eof ? [] : (J(e, 0), u.events = is(a, u.events, u), u.events);
  }
  function y(E, O) {
    return H0(b(E), O);
  }
  function b(E) {
    return z0(s, E);
  }
  function T() {
    const { _bufferIndex: E, _index: O, line: F, column: q, offset: ce } = r;
    return { _bufferIndex: E, _index: O, line: F, column: q, offset: ce };
  }
  function k(E) {
    i[E.line] = E.column, I(), Tn("position: define skip: `%j`", r);
  }
  function S() {
    let E;
    for (; r._index < s.length; ) {
      const O = s[r._index];
      if (typeof O == "string")
        for (E = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === E && r._bufferIndex < O.length; )
          R(O.charCodeAt(r._bufferIndex));
      else
        R(O);
    }
  }
  function R(E) {
    v(l === !0, "expected character to be consumed"), l = void 0, Tn("main: passing `%s` to %s", E, d && d.name), h = E, v(typeof d == "function", "expected state"), d = d(E);
  }
  function P(E) {
    v(E === h, "expected given code to equal expected code"), Tn("consume: `%s`", E), v(
      l === void 0,
      "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used"
    ), v(
      E === null ? u.events.length === 0 || u.events[u.events.length - 1][0] === "exit" : u.events[u.events.length - 1][0] === "enter",
      "expected last token to be open"
    ), ae(E) ? (r.line++, r.column = 1, r.offset += E === m.carriageReturnLineFeed ? 2 : 1, I(), Tn("position: after eol: `%j`", r)) : E !== m.virtualSpace && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    s[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = E, l = !0;
  }
  function D(E, O) {
    const F = O || {};
    return F.type = E, F.start = T(), v(typeof E == "string", "expected string type"), v(E.length > 0, "expected non-empty string"), Tn("enter: `%s`", E), u.events.push(["enter", F, u]), o.push(F), F;
  }
  function _(E) {
    v(typeof E == "string", "expected string type"), v(E.length > 0, "expected non-empty string");
    const O = o.pop();
    return v(O, "cannot close w/o open tokens"), O.end = T(), v(E === O.type, "expected exit token to match current token"), v(
      !(O.start._index === O.end._index && O.start._bufferIndex === O.end._bufferIndex),
      "expected non-empty token (`" + E + "`)"
    ), Tn("exit: `%s`", O.type), u.events.push(["exit", O, u]), O;
  }
  function H(E, O) {
    J(E, O.from);
  }
  function U(E, O) {
    O.restore();
  }
  function G(E, O) {
    return F;
    function F(q, ce, re) {
      let ge, w, $, j;
      return Array.isArray(q) ? (
        /* c8 ignore next 1 */
        X(q)
      ) : "tokenize" in q ? (
        // Looks like a construct.
        X([
          /** @type {Construct} */
          q
        ])
      ) : x(q);
      function x(le) {
        return _e;
        function _e(Me) {
          const ve = Me !== null && le[Me], be = Me !== null && le.null, He = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ve) ? ve : ve ? [ve] : [],
            ...Array.isArray(be) ? be : be ? [be] : []
          ];
          return X(He)(Me);
        }
      }
      function X(le) {
        return ge = le, w = 0, le.length === 0 ? (v(re, "expected `bogusState` to be given"), re) : V(le[w]);
      }
      function V(le) {
        return _e;
        function _e(Me) {
          return j = Z(), $ = le, le.partial || (u.currentConstruct = le), v(
            u.parser.constructs.disable.null,
            "expected `disable.null` to be populated"
          ), le.name && u.parser.constructs.disable.null.includes(le.name) ? he(Me) : le.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            O ? Object.assign(Object.create(u), O) : u,
            c,
            ue,
            he
          )(Me);
        }
      }
      function ue(le) {
        return v(le === h, "expected code"), l = !0, E($, j), ce;
      }
      function he(le) {
        return v(le === h, "expected code"), l = !0, j.restore(), ++w < ge.length ? V(ge[w]) : re;
      }
    }
  }
  function J(E, O) {
    E.resolveAll && !a.includes(E) && a.push(E), E.resolve && rn(
      u.events,
      O,
      u.events.length - O,
      E.resolve(u.events.slice(O), u)
    ), E.resolveTo && (u.events = E.resolveTo(u.events, u)), v(
      E.partial || u.events.length === 0 || u.events[u.events.length - 1][0] === "exit",
      "expected last token to end"
    );
  }
  function Z() {
    const E = T(), O = u.previous, F = u.currentConstruct, q = u.events.length, ce = Array.from(o);
    return { from: q, restore: re };
    function re() {
      r = E, u.previous = O, u.currentConstruct = F, u.events.length = q, o = ce, I(), Tn("position: restore: `%j`", r);
    }
  }
  function I() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function z0(t, e) {
  const n = e.start._index, r = e.start._bufferIndex, i = e.end._index, a = e.end._bufferIndex;
  let s;
  if (n === i)
    v(a > -1, "expected non-negative end buffer index"), v(r > -1, "expected non-negative start buffer index"), s = [t[n].slice(r, a)];
  else {
    if (s = t.slice(n, i), r > -1) {
      const o = s[0];
      typeof o == "string" ? s[0] = o.slice(r) : (v(r === 0, "expected `startBufferIndex` to be `0`"), s.shift());
    }
    a > 0 && s.push(t[i].slice(0, a));
  }
  return s;
}
function H0(t, e) {
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
          s = Xt.cr;
          break;
        }
        case m.lineFeed: {
          s = Xt.lf;
          break;
        }
        case m.carriageReturnLineFeed: {
          s = Xt.cr + Xt.lf;
          break;
        }
        case m.horizontalTab: {
          s = e ? Xt.space : Xt.ht;
          break;
        }
        case m.virtualSpace: {
          if (!e && i) continue;
          s = Xt.space;
          break;
        }
        default:
          v(typeof a == "number", "expected number"), s = String.fromCharCode(a);
      }
    i = a === m.horizontalTab, r.push(s);
  }
  return r.join("");
}
function U0(t) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      jm([I0, ...(t || {}).extensions || []])
    ),
    content: i(Ym),
    defined: [],
    document: i(Qm),
    flow: i(m0),
    lazy: {},
    string: i(w0),
    text: i(b0)
  };
  return r;
  function i(a) {
    return s;
    function s(o) {
      return F0(r, a, o);
    }
  }
}
function $0(t) {
  for (; !Mc(t); )
    ;
  return t;
}
const Yo = /[\0\t\n\r]/g;
function B0() {
  let t = 1, e = "", n = !0, r;
  return i;
  function i(a, s, o) {
    const l = [];
    let c, u, d, h, f;
    for (a = e + (typeof a == "string" ? a.toString() : new TextDecoder(s || void 0).decode(a)), d = 0, e = "", n && (a.charCodeAt(0) === m.byteOrderMarker && d++, n = void 0); d < a.length; ) {
      if (Yo.lastIndex = d, c = Yo.exec(a), h = c && c.index !== void 0 ? c.index : a.length, f = a.charCodeAt(h), !c) {
        e = a.slice(d);
        break;
      }
      if (f === m.lf && d === h && r)
        l.push(m.carriageReturnLineFeed), r = void 0;
      else
        switch (r && (l.push(m.carriageReturn), r = void 0), d < h && (l.push(a.slice(d, h)), t += h - d), f) {
          case m.nul: {
            l.push(m.replacementCharacter), t++;
            break;
          }
          case m.ht: {
            for (u = Math.ceil(t / Q.tabSize) * Q.tabSize, l.push(m.horizontalTab); t++ < u; ) l.push(m.virtualSpace);
            break;
          }
          case m.lf: {
            l.push(m.lineFeed), t = 1;
            break;
          }
          default:
            r = !0, t = 1;
        }
      d = h + 1;
    }
    return o && (r && l.push(m.carriageReturn), e && l.push(e), l.push(m.eof)), l;
  }
}
const j0 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function V0(t) {
  return t.replace(j0, Z0);
}
function Z0(t, e, n) {
  if (e)
    return e;
  if (n.charCodeAt(0) === m.numberSign) {
    const i = n.charCodeAt(1), a = i === m.lowercaseX || i === m.uppercaseX;
    return Ec(
      n.slice(a ? 2 : 1),
      a ? Q.numericBaseHexadecimal : Q.numericBaseDecimal
    );
  }
  return rs(n) || t;
}
const zc = {}.hasOwnProperty;
function W0(t, e, n) {
  return typeof e != "string" && (n = e, e = void 0), G0(n)(
    $0(
      U0(n).document().write(B0()(t, e, !0))
    )
  );
}
function G0(t) {
  const e = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Vt),
      autolinkProtocol: G,
      autolinkEmail: G,
      atxHeading: a(Ne),
      blockQuote: a(Me),
      characterEscape: G,
      characterReference: G,
      codeFenced: a(ve),
      codeFencedFenceInfo: s,
      codeFencedFenceMeta: s,
      codeIndented: a(ve, s),
      codeText: a(be, s),
      codeTextData: G,
      data: G,
      codeFlowValue: G,
      definition: a(He),
      definitionDestinationString: s,
      definitionLabelString: s,
      definitionTitleString: s,
      emphasis: a(Fe),
      hardBreakEscape: a(Ft),
      hardBreakTrailing: a(Ft),
      htmlFlow: a(Ct, s),
      htmlFlowData: G,
      htmlText: a(Ct, s),
      htmlTextData: G,
      image: a(gt),
      label: s,
      link: a(Vt),
      listItem: a(Cn),
      listItemValue: h,
      listOrdered: a(Zt, d),
      listUnordered: a(Zt),
      paragraph: a(_n),
      reference: x,
      referenceString: s,
      resourceDestinationString: s,
      resourceTitleString: s,
      setextHeading: a(Ne),
      strong: a(rr),
      thematicBreak: a(Wt)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: D,
      autolink: l(),
      autolinkEmail: _e,
      autolinkProtocol: le,
      blockQuote: l(),
      characterEscapeValue: J,
      characterReferenceMarkerHexadecimal: V,
      characterReferenceMarkerNumeric: V,
      characterReferenceValue: ue,
      characterReference: he,
      codeFenced: l(T),
      codeFencedFence: b,
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: y,
      codeFlowValue: J,
      codeIndented: l(k),
      codeText: l(F),
      codeTextData: J,
      data: J,
      definition: l(),
      definitionDestinationString: P,
      definitionLabelString: S,
      definitionTitleString: R,
      emphasis: l(),
      hardBreakEscape: l(I),
      hardBreakTrailing: l(I),
      htmlFlow: l(E),
      htmlFlowData: J,
      htmlText: l(O),
      htmlTextData: J,
      image: l(ce),
      label: ge,
      labelText: re,
      lineEnding: Z,
      link: l(q),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: X,
      resourceDestinationString: w,
      resourceTitleString: $,
      resource: j,
      setextHeading: l(U),
      setextHeadingLineSequence: H,
      setextHeadingText: _,
      strong: l(),
      thematicBreak: l()
    }
  };
  Hc(e, (t || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(N) {
    let A = { type: "root", children: [] };
    const ee = {
      stack: [A],
      tokenStack: [],
      config: e,
      enter: o,
      exit: c,
      buffer: s,
      resume: u,
      data: n
    }, xe = [];
    let Se = -1;
    for (; ++Se < N.length; )
      if (N[Se][1].type === g.listOrdered || N[Se][1].type === g.listUnordered)
        if (N[Se][0] === "enter")
          xe.push(Se);
        else {
          const Ge = xe.pop();
          v(typeof Ge == "number", "expected list ot be open"), Se = i(N, Ge, Se);
        }
    for (Se = -1; ++Se < N.length; ) {
      const Ge = e[N[Se][0]];
      zc.call(Ge, N[Se][1].type) && Ge[N[Se][1].type].call(
        Object.assign(
          { sliceSerialize: N[Se][2].sliceSerialize },
          ee
        ),
        N[Se][1]
      );
    }
    if (ee.tokenStack.length > 0) {
      const Ge = ee.tokenStack[ee.tokenStack.length - 1];
      (Ge[1] || Jo).call(ee, void 0, Ge[0]);
    }
    for (A.position = {
      start: fn(
        N.length > 0 ? N[0][1].start : { line: 1, column: 1, offset: 0 }
      ),
      end: fn(
        N.length > 0 ? N[N.length - 2][1].end : { line: 1, column: 1, offset: 0 }
      )
    }, Se = -1; ++Se < e.transforms.length; )
      A = e.transforms[Se](A) || A;
    return A;
  }
  function i(N, A, ee) {
    let xe = A - 1, Se = -1, Ge = !1, Nt, at, At, nt;
    for (; ++xe <= ee; ) {
      const Ce = N[xe];
      switch (Ce[1].type) {
        case g.listUnordered:
        case g.listOrdered:
        case g.blockQuote: {
          Ce[0] === "enter" ? Se++ : Se--, nt = void 0;
          break;
        }
        case g.lineEndingBlank: {
          Ce[0] === "enter" && (Nt && !nt && !Se && !At && (At = xe), nt = void 0);
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
      if (!Se && Ce[0] === "enter" && Ce[1].type === g.listItemPrefix || Se === -1 && Ce[0] === "exit" && (Ce[1].type === g.listUnordered || Ce[1].type === g.listOrdered)) {
        if (Nt) {
          let et = xe;
          for (at = void 0; et--; ) {
            const st = N[et];
            if (st[1].type === g.lineEnding || st[1].type === g.lineEndingBlank) {
              if (st[0] === "exit") continue;
              at && (N[at][1].type = g.lineEndingBlank, Ge = !0), st[1].type = g.lineEnding, at = et;
            } else if (!(st[1].type === g.linePrefix || st[1].type === g.blockQuotePrefix || st[1].type === g.blockQuotePrefixWhitespace || st[1].type === g.blockQuoteMarker || st[1].type === g.listItemIndent)) break;
          }
          At && (!at || At < at) && (Nt._spread = !0), Nt.end = Object.assign(
            {},
            at ? N[at][1].start : Ce[1].end
          ), N.splice(at || xe, 0, ["exit", Nt, Ce[2]]), xe++, ee++;
        }
        if (Ce[1].type === g.listItemPrefix) {
          const et = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ce[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Nt = et, N.splice(xe, 0, ["enter", et, Ce[2]]), xe++, ee++, At = void 0, nt = !0;
        }
      }
    }
    return N[A][1]._spread = Ge, ee;
  }
  function a(N, A) {
    return ee;
    function ee(xe) {
      o.call(this, N(xe), xe), A && A.call(this, xe);
    }
  }
  function s() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function o(N, A, ee) {
    const xe = this.stack[this.stack.length - 1];
    v(xe, "expected `parent`"), v("children" in xe, "expected `parent`"), xe.children.push(N), this.stack.push(N), this.tokenStack.push([A, ee || void 0]), N.position = {
      start: fn(A.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(N) {
    return A;
    function A(ee) {
      N && N.call(this, ee), c.call(this, ee);
    }
  }
  function c(N, A) {
    const ee = this.stack.pop();
    v(ee, "expected `node`");
    const xe = this.tokenStack.pop();
    if (xe)
      xe[0].type !== N.type && (A ? A.call(this, N, xe[0]) : (xe[1] || Jo).call(this, N, xe[0]));
    else throw new Error(
      "Cannot close `" + N.type + "` (" + kr({ start: N.start, end: N.end }) + "): it’s not open"
    );
    v(ee.type !== "fragment", "unexpected fragment `exit`ed"), v(ee.position, "expected `position` to be defined"), ee.position.end = fn(N.end);
  }
  function u() {
    return $m(this.stack.pop());
  }
  function d() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(N) {
    if (this.data.expectingFirstListItemValue) {
      const A = this.stack[this.stack.length - 2];
      v(A, "expected nodes on stack"), v(A.type === "list", "expected list on stack"), A.start = Number.parseInt(
        this.sliceSerialize(N),
        Q.numericBaseDecimal
      ), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function f() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "code", "expected code on stack"), A.lang = N;
  }
  function y() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "code", "expected code on stack"), A.meta = N;
  }
  function b() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function T() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "code", "expected code on stack"), A.value = N.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function k() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "code", "expected code on stack"), A.value = N.replace(/(\r?\n|\r)$/g, "");
  }
  function S(N) {
    const A = this.resume(), ee = this.stack[this.stack.length - 1];
    v(ee, "expected node on stack"), v(ee.type === "definition", "expected definition on stack"), ee.label = A, ee.identifier = Vn(
      this.sliceSerialize(N)
    ).toLowerCase();
  }
  function R() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "definition", "expected definition on stack"), A.title = N;
  }
  function P() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "definition", "expected definition on stack"), A.url = N;
  }
  function D(N) {
    const A = this.stack[this.stack.length - 1];
    if (v(A, "expected node on stack"), v(A.type === "heading", "expected heading on stack"), !A.depth) {
      const ee = this.sliceSerialize(N).length;
      v(
        ee === 1 || ee === 2 || ee === 3 || ee === 4 || ee === 5 || ee === 6,
        "expected `depth` between `1` and `6`"
      ), A.depth = ee;
    }
  }
  function _() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function H(N) {
    const A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "heading", "expected heading on stack"), A.depth = this.sliceSerialize(N).codePointAt(0) === m.equalsTo ? 1 : 2;
  }
  function U() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function G(N) {
    const A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v("children" in A, "expected parent on stack");
    const ee = A.children;
    let xe = ee[ee.length - 1];
    (!xe || xe.type !== "text") && (xe = vn(), xe.position = {
      start: fn(N.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, ee.push(xe)), this.stack.push(xe);
  }
  function J(N) {
    const A = this.stack.pop();
    v(A, "expected a `node` to be on the stack"), v("value" in A, "expected a `literal` to be on the stack"), v(A.position, "expected `node` to have an open position"), A.value += this.sliceSerialize(N), A.position.end = fn(N.end);
  }
  function Z(N) {
    const A = this.stack[this.stack.length - 1];
    if (v(A, "expected `node`"), this.data.atHardBreak) {
      v("children" in A, "expected `parent`");
      const ee = A.children[A.children.length - 1];
      v(ee.position, "expected tail to have a starting position"), ee.position.end = fn(N.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && e.canContainEols.includes(A.type) && (G.call(this, N), J.call(this, N));
  }
  function I() {
    this.data.atHardBreak = !0;
  }
  function E() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "html", "expected html on stack"), A.value = N;
  }
  function O() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "html", "expected html on stack"), A.value = N;
  }
  function F() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "inlineCode", "expected inline code on stack"), A.value = N;
  }
  function q() {
    const N = this.stack[this.stack.length - 1];
    if (v(N, "expected node on stack"), v(N.type === "link", "expected link on stack"), this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      N.type += "Reference", N.referenceType = A, delete N.url, delete N.title;
    } else
      delete N.identifier, delete N.label;
    this.data.referenceType = void 0;
  }
  function ce() {
    const N = this.stack[this.stack.length - 1];
    if (v(N, "expected node on stack"), v(N.type === "image", "expected image on stack"), this.data.inReference) {
      const A = this.data.referenceType || "shortcut";
      N.type += "Reference", N.referenceType = A, delete N.url, delete N.title;
    } else
      delete N.identifier, delete N.label;
    this.data.referenceType = void 0;
  }
  function re(N) {
    const A = this.sliceSerialize(N), ee = this.stack[this.stack.length - 2];
    v(ee, "expected ancestor on stack"), v(
      ee.type === "image" || ee.type === "link",
      "expected image or link on stack"
    ), ee.label = V0(A), ee.identifier = Vn(A).toLowerCase();
  }
  function ge() {
    const N = this.stack[this.stack.length - 1];
    v(N, "expected node on stack"), v(N.type === "fragment", "expected fragment on stack");
    const A = this.resume(), ee = this.stack[this.stack.length - 1];
    if (v(ee, "expected node on stack"), v(
      ee.type === "image" || ee.type === "link",
      "expected image or link on stack"
    ), this.data.inReference = !0, ee.type === "link") {
      const xe = N.children;
      ee.children = xe;
    } else
      ee.alt = A;
  }
  function w() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(
      A.type === "image" || A.type === "link",
      "expected image or link on stack"
    ), A.url = N;
  }
  function $() {
    const N = this.resume(), A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(
      A.type === "image" || A.type === "link",
      "expected image or link on stack"
    ), A.title = N;
  }
  function j() {
    this.data.inReference = void 0;
  }
  function x() {
    this.data.referenceType = "collapsed";
  }
  function X(N) {
    const A = this.resume(), ee = this.stack[this.stack.length - 1];
    v(ee, "expected node on stack"), v(
      ee.type === "image" || ee.type === "link",
      "expected image reference or link reference on stack"
    ), ee.label = A, ee.identifier = Vn(
      this.sliceSerialize(N)
    ).toLowerCase(), this.data.referenceType = "full";
  }
  function V(N) {
    v(
      N.type === "characterReferenceMarkerNumeric" || N.type === "characterReferenceMarkerHexadecimal"
    ), this.data.characterReferenceType = N.type;
  }
  function ue(N) {
    const A = this.sliceSerialize(N), ee = this.data.characterReferenceType;
    let xe;
    if (ee)
      xe = Ec(
        A,
        ee === g.characterReferenceMarkerNumeric ? Q.numericBaseDecimal : Q.numericBaseHexadecimal
      ), this.data.characterReferenceType = void 0;
    else {
      const Ge = rs(A);
      v(Ge !== !1, "expected reference to decode"), xe = Ge;
    }
    const Se = this.stack[this.stack.length - 1];
    v(Se, "expected `node`"), v("value" in Se, "expected `node.value`"), Se.value += xe;
  }
  function he(N) {
    const A = this.stack.pop();
    v(A, "expected `node`"), v(A.position, "expected `node.position`"), A.position.end = fn(N.end);
  }
  function le(N) {
    J.call(this, N);
    const A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "link", "expected link on stack"), A.url = this.sliceSerialize(N);
  }
  function _e(N) {
    J.call(this, N);
    const A = this.stack[this.stack.length - 1];
    v(A, "expected node on stack"), v(A.type === "link", "expected link on stack"), A.url = "mailto:" + this.sliceSerialize(N);
  }
  function Me() {
    return { type: "blockquote", children: [] };
  }
  function ve() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function be() {
    return { type: "inlineCode", value: "" };
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
  function Fe() {
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
  function Ft() {
    return { type: "break" };
  }
  function Ct() {
    return { type: "html", value: "" };
  }
  function gt() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Vt() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function Zt(N) {
    return {
      type: "list",
      ordered: N.type === "listOrdered",
      start: null,
      spread: N._spread,
      children: []
    };
  }
  function Cn(N) {
    return {
      type: "listItem",
      spread: N._spread,
      checked: null,
      children: []
    };
  }
  function _n() {
    return { type: "paragraph", children: [] };
  }
  function rr() {
    return { type: "strong", children: [] };
  }
  function vn() {
    return { type: "text", value: "" };
  }
  function Wt() {
    return { type: "thematicBreak" };
  }
}
function fn(t) {
  return { line: t.line, column: t.column, offset: t.offset };
}
function Hc(t, e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const r = e[n];
    Array.isArray(r) ? Hc(t, r) : q0(t, r);
  }
}
function q0(t, e) {
  let n;
  for (n in e)
    if (zc.call(e, n))
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
function Jo(t, e) {
  throw t ? new Error(
    "Cannot close `" + t.type + "` (" + kr({ start: t.start, end: t.end }) + "): a different token (`" + e.type + "`, " + kr({ start: e.start, end: e.end }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + e.type + "`, " + kr({ start: e.start, end: e.end }) + ") is still open"
  );
}
function K0(t) {
  const e = this;
  e.parser = n;
  function n(r) {
    return W0(r, {
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
function X0(t, e) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: t.wrap(t.all(e), !0)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function Y0(t, e) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return t.patch(e, n), [t.applyData(e, n), { type: "text", value: `
` }];
}
function J0(t, e) {
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
function Q0(t, e) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function ey(t, e) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function ty(t, e) {
  const n = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", r = String(e.identifier).toUpperCase(), i = nr(r.toLowerCase()), a = t.footnoteOrder.indexOf(r);
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
  const c = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return t.patch(e, c), t.applyData(e, c);
}
function ny(t, e) {
  const n = {
    type: "element",
    tagName: "h" + e.depth,
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function ry(t, e) {
  if (t.options.allowDangerousHtml) {
    const n = { type: "raw", value: e.value };
    return t.patch(e, n), t.applyData(e, n);
  }
}
function Uc(t, e) {
  const n = e.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (e.label || e.identifier) + "]"), e.type === "imageReference")
    return [{ type: "text", value: "![" + e.alt + r }];
  const i = t.all(e), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && s.type === "text" ? s.value += r : i.push({ type: "text", value: r }), i;
}
function iy(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return Uc(t, e);
  const i = { src: nr(r.url || ""), alt: e.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return t.patch(e, a), t.applyData(e, a);
}
function ay(t, e) {
  const n = { src: nr(e.url) };
  e.alt !== null && e.alt !== void 0 && (n.alt = e.alt), e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return t.patch(e, r), t.applyData(e, r);
}
function sy(t, e) {
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
function oy(t, e) {
  const n = String(e.identifier).toUpperCase(), r = t.definitionById.get(n);
  if (!r)
    return Uc(t, e);
  const i = { href: nr(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: t.all(e)
  };
  return t.patch(e, a), t.applyData(e, a);
}
function ly(t, e) {
  const n = { href: nr(e.url) };
  e.title !== null && e.title !== void 0 && (n.title = e.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function cy(t, e, n) {
  const r = t.all(e), i = n ? uy(n) : $c(e), a = {}, s = [];
  if (typeof e.checked == "boolean") {
    const u = r[0];
    let d;
    u && u.type === "element" && u.tagName === "p" ? d = u : (d = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(d)), d.children.length > 0 && d.children.unshift({ type: "text", value: " " }), d.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: e.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const u = r[o];
    (i || o !== 0 || u.type !== "element" || u.tagName !== "p") && s.push({ type: "text", value: `
` }), u.type === "element" && u.tagName === "p" && !i ? s.push(...u.children) : s.push(u);
  }
  const l = r[r.length - 1];
  l && (i || l.type !== "element" || l.tagName !== "p") && s.push({ type: "text", value: `
` });
  const c = { type: "element", tagName: "li", properties: a, children: s };
  return t.patch(e, c), t.applyData(e, c);
}
function uy(t) {
  let e = !1;
  if (t.type === "list") {
    e = t.spread || !1;
    const n = t.children;
    let r = -1;
    for (; !e && ++r < n.length; )
      e = $c(n[r]);
  }
  return e;
}
function $c(t) {
  const e = t.spread;
  return e ?? t.children.length > 1;
}
function dy(t, e) {
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
function hy(t, e) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function fy(t, e) {
  const n = { type: "root", children: t.wrap(t.all(e)) };
  return t.patch(e, n), t.applyData(e, n);
}
function py(t, e) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
function gy(t, e) {
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
    }, o = Qa(e.children[1]), l = bc(e.children[e.children.length - 1]);
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
function my(t, e, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(e) : 1) === 0 ? "th" : "td", s = n && n.type === "table" ? n.align : void 0, o = s ? s.length : e.children.length;
  let l = -1;
  const c = [];
  for (; ++l < o; ) {
    const d = e.children[l], h = {}, f = s ? s[l] : void 0;
    f && (h.align = f);
    let y = { type: "element", tagName: a, properties: h, children: [] };
    d && (y.children = t.all(d), t.patch(d, y), y = t.applyData(d, y)), c.push(y);
  }
  const u = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: t.wrap(c, !0)
  };
  return t.patch(e, u), t.applyData(e, u);
}
function yy(t, e) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, n), t.applyData(e, n);
}
const Qo = 9, el = 32;
function xy(t) {
  const e = String(t), n = /\r?\n|\r/g;
  let r = n.exec(e), i = 0;
  const a = [];
  for (; r; )
    a.push(
      tl(e.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(e);
  return a.push(tl(e.slice(i), i > 0, !1)), a.join("");
}
function tl(t, e, n) {
  let r = 0, i = t.length;
  if (e) {
    let a = t.codePointAt(r);
    for (; a === Qo || a === el; )
      r++, a = t.codePointAt(r);
  }
  if (n) {
    let a = t.codePointAt(i - 1);
    for (; a === Qo || a === el; )
      i--, a = t.codePointAt(i - 1);
  }
  return i > r ? t.slice(r, i) : "";
}
function wy(t, e) {
  const n = { type: "text", value: xy(String(e.value)) };
  return t.patch(e, n), t.applyData(e, n);
}
function by(t, e) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return t.patch(e, n), t.applyData(e, n);
}
const ky = {
  blockquote: X0,
  break: Y0,
  code: J0,
  delete: Q0,
  emphasis: ey,
  footnoteReference: ty,
  heading: ny,
  html: ry,
  imageReference: iy,
  image: ay,
  inlineCode: sy,
  linkReference: oy,
  link: ly,
  listItem: cy,
  list: dy,
  paragraph: hy,
  // @ts-expect-error: root is different, but hard to type.
  root: fy,
  strong: py,
  table: gy,
  tableCell: yy,
  tableRow: my,
  text: wy,
  thematicBreak: by,
  toml: Gr,
  yaml: Gr,
  definition: Gr,
  footnoteDefinition: Gr
};
function Gr() {
}
const Bc = -1, Ei = 0, _r = 1, wi = 2, ss = 3, os = 4, ls = 5, cs = 6, jc = 7, Vc = 8, nl = typeof self == "object" ? self : globalThis, Cy = (t, e) => {
  const n = (i, a) => (t.set(a, i), i), r = (i) => {
    if (t.has(i))
      return t.get(i);
    const [a, s] = e[i];
    switch (a) {
      case Ei:
      case Bc:
        return n(s, i);
      case _r: {
        const o = n([], i);
        for (const l of s)
          o.push(r(l));
        return o;
      }
      case wi: {
        const o = n({}, i);
        for (const [l, c] of s)
          o[r(l)] = r(c);
        return o;
      }
      case ss:
        return n(new Date(s), i);
      case os: {
        const { source: o, flags: l } = s;
        return n(new RegExp(o, l), i);
      }
      case ls: {
        const o = n(/* @__PURE__ */ new Map(), i);
        for (const [l, c] of s)
          o.set(r(l), r(c));
        return o;
      }
      case cs: {
        const o = n(/* @__PURE__ */ new Set(), i);
        for (const l of s)
          o.add(r(l));
        return o;
      }
      case jc: {
        const { name: o, message: l } = s;
        return n(new nl[o](l), i);
      }
      case Vc:
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
    return n(new nl[a](s), i);
  };
  return r;
}, rl = (t) => Cy(/* @__PURE__ */ new Map(), t)(0), zn = "", { toString: _y } = {}, { keys: vy } = Object, yr = (t) => {
  const e = typeof t;
  if (e !== "object" || !t)
    return [Ei, e];
  const n = _y.call(t).slice(8, -1);
  switch (n) {
    case "Array":
      return [_r, zn];
    case "Object":
      return [wi, zn];
    case "Date":
      return [ss, zn];
    case "RegExp":
      return [os, zn];
    case "Map":
      return [ls, zn];
    case "Set":
      return [cs, zn];
    case "DataView":
      return [_r, n];
  }
  return n.includes("Array") ? [_r, n] : n.includes("Error") ? [jc, n] : [wi, n];
}, qr = ([t, e]) => t === Ei && (e === "function" || e === "symbol"), Sy = (t, e, n, r) => {
  const i = (s, o) => {
    const l = r.push(s) - 1;
    return n.set(o, l), l;
  }, a = (s) => {
    if (n.has(s))
      return n.get(s);
    let [o, l] = yr(s);
    switch (o) {
      case Ei: {
        let u = s;
        switch (l) {
          case "bigint":
            o = Vc, u = s.toString();
            break;
          case "function":
          case "symbol":
            if (t)
              throw new TypeError("unable to serialize " + l);
            u = null;
            break;
          case "undefined":
            return i([Bc], s);
        }
        return i([o, u], s);
      }
      case _r: {
        if (l) {
          let h = s;
          return l === "DataView" ? h = new Uint8Array(s.buffer) : l === "ArrayBuffer" && (h = new Uint8Array(s)), i([l, [...h]], s);
        }
        const u = [], d = i([o, u], s);
        for (const h of s)
          u.push(a(h));
        return d;
      }
      case wi: {
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
        const u = [], d = i([o, u], s);
        for (const h of vy(s))
          (t || !qr(yr(s[h]))) && u.push([a(h), a(s[h])]);
        return d;
      }
      case ss:
        return i([o, s.toISOString()], s);
      case os: {
        const { source: u, flags: d } = s;
        return i([o, { source: u, flags: d }], s);
      }
      case ls: {
        const u = [], d = i([o, u], s);
        for (const [h, f] of s)
          (t || !(qr(yr(h)) || qr(yr(f)))) && u.push([a(h), a(f)]);
        return d;
      }
      case cs: {
        const u = [], d = i([o, u], s);
        for (const h of s)
          (t || !qr(yr(h))) && u.push(a(h));
        return d;
      }
    }
    const { message: c } = s;
    return i([o, { name: l, message: c }], s);
  };
  return a;
}, il = (t, { json: e, lossy: n } = {}) => {
  const r = [];
  return Sy(!(e || n), !!e, /* @__PURE__ */ new Map(), r)(t), r;
}, bi = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (t, e) => e && ("json" in e || "lossy" in e) ? rl(il(t, e)) : structuredClone(t)
) : (t, e) => rl(il(t, e));
function Ty(t, e) {
  const n = [{ type: "text", value: "↩" }];
  return e > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(e) }]
  }), n;
}
function Ey(t, e) {
  return "Back to reference " + (t + 1) + (e > 1 ? "-" + e : "");
}
function Ry(t) {
  const e = typeof t.options.clobberPrefix == "string" ? t.options.clobberPrefix : "user-content-", n = t.options.footnoteBackContent || Ty, r = t.options.footnoteBackLabel || Ey, i = t.options.footnoteLabel || "Footnotes", a = t.options.footnoteLabelTagName || "h2", s = t.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < t.footnoteOrder.length; ) {
    const c = t.footnoteById.get(
      t.footnoteOrder[l]
    );
    if (!c)
      continue;
    const u = t.all(c), d = String(c.identifier).toUpperCase(), h = nr(d.toLowerCase());
    let f = 0;
    const y = [], b = t.footnoteCounts.get(d);
    for (; b !== void 0 && ++f <= b; ) {
      y.length > 0 && y.push({ type: "text", value: " " });
      let S = typeof n == "string" ? n : n(l, f);
      typeof S == "string" && (S = { type: "text", value: S }), y.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e + "fnref-" + h + (f > 1 ? "-" + f : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(l, f),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(S) ? S : [S]
      });
    }
    const T = u[u.length - 1];
    if (T && T.type === "element" && T.tagName === "p") {
      const S = T.children[T.children.length - 1];
      S && S.type === "text" ? S.value += " " : T.children.push({ type: "text", value: " " }), T.children.push(...y);
    } else
      u.push(...y);
    const k = {
      type: "element",
      tagName: "li",
      properties: { id: e + "fn-" + h },
      children: t.wrap(u, !0)
    };
    t.patch(c, k), o.push(k);
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
            ...bi(s),
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
const us = (
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
      return My;
    if (typeof t == "function")
      return Ri(t);
    if (typeof t == "object")
      return Array.isArray(t) ? Ny(t) : Ay(t);
    if (typeof t == "string")
      return Iy(t);
    throw new Error("Expected function, string, or object as test");
  }
);
function Ny(t) {
  const e = [];
  let n = -1;
  for (; ++n < t.length; )
    e[n] = us(t[n]);
  return Ri(r);
  function r(...i) {
    let a = -1;
    for (; ++a < e.length; )
      if (e[a].apply(this, i)) return !0;
    return !1;
  }
}
function Ay(t) {
  const e = (
    /** @type {Record<string, unknown>} */
    t
  );
  return Ri(n);
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
function Iy(t) {
  return Ri(e);
  function e(n) {
    return n && n.type === t;
  }
}
function Ri(t) {
  return e;
  function e(n, r, i) {
    return !!(Oy(n) && t.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function My() {
  return !0;
}
function Oy(t) {
  return t !== null && typeof t == "object" && "type" in t;
}
const Zc = [], Ly = !0, al = !1, Py = "skip";
function Wc(t, e, n, r) {
  let i;
  typeof e == "function" && typeof n != "function" ? (r = n, n = e) : i = e;
  const a = us(i), s = r ? -1 : 1;
  o(t, void 0, [])();
  function o(l, c, u) {
    const d = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof d.type == "string") {
      const f = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (l.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let f = Zc, y, b, T;
      if ((!e || a(l, c, u[u.length - 1] || void 0)) && (f = Dy(n(l, u)), f[0] === al))
        return f;
      if ("children" in l && l.children) {
        const k = (
          /** @type {UnistParent} */
          l
        );
        if (k.children && f[0] !== Py)
          for (b = (r ? k.children.length : -1) + s, T = u.concat(k); b > -1 && b < k.children.length; ) {
            const S = k.children[b];
            if (y = o(S, b, T)(), y[0] === al)
              return y;
            b = typeof y[1] == "number" ? y[1] : b + s;
          }
      }
      return f;
    }
  }
}
function Dy(t) {
  return Array.isArray(t) ? t : typeof t == "number" ? [Ly, t] : t == null ? Zc : [t];
}
function Gc(t, e, n, r) {
  let i, a, s;
  typeof e == "function" && typeof n != "function" ? (a = void 0, s = e, i = n) : (a = e, s = n, i = r), Wc(t, a, o, i);
  function o(l, c) {
    const u = c[c.length - 1], d = u ? u.children.indexOf(l) : void 0;
    return s(l, d, u);
  }
}
const Pa = {}.hasOwnProperty, Fy = {};
function zy(t, e) {
  const n = e || Fy, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = { ...ky, ...n.handlers }, o = {
    all: c,
    applyData: Uy,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: s,
    one: l,
    options: n,
    patch: Hy,
    wrap: By
  };
  return Gc(t, function(u) {
    if (u.type === "definition" || u.type === "footnoteDefinition") {
      const d = u.type === "definition" ? r : i, h = String(u.identifier).toUpperCase();
      d.has(h) || d.set(h, u);
    }
  }), o;
  function l(u, d) {
    const h = u.type, f = o.handlers[h];
    if (Pa.call(o.handlers, h) && f)
      return f(o, u, d);
    if (o.options.passThrough && o.options.passThrough.includes(h)) {
      if ("children" in u) {
        const { children: b, ...T } = u, k = bi(T);
        return k.children = o.all(u), k;
      }
      return bi(u);
    }
    return (o.options.unknownHandler || $y)(o, u, d);
  }
  function c(u) {
    const d = [];
    if ("children" in u) {
      const h = u.children;
      let f = -1;
      for (; ++f < h.length; ) {
        const y = o.one(h[f], u);
        if (y) {
          if (f && h[f - 1].type === "break" && (!Array.isArray(y) && y.type === "text" && (y.value = sl(y.value)), !Array.isArray(y) && y.type === "element")) {
            const b = y.children[0];
            b && b.type === "text" && (b.value = sl(b.value));
          }
          Array.isArray(y) ? d.push(...y) : d.push(y);
        }
      }
    }
    return d;
  }
}
function Hy(t, e) {
  t.position && (e.position = wm(t));
}
function Uy(t, e) {
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
    n.type === "element" && a && Object.assign(n.properties, bi(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function $y(t, e) {
  const n = e.data || {}, r = "value" in e && !(Pa.call(n, "hProperties") || Pa.call(n, "hChildren")) ? { type: "text", value: e.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: t.all(e)
  };
  return t.patch(e, r), t.applyData(e, r);
}
function By(t, e) {
  const n = [];
  let r = -1;
  for (e && n.push({ type: "text", value: `
` }); ++r < t.length; )
    r && n.push({ type: "text", value: `
` }), n.push(t[r]);
  return e && t.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function sl(t) {
  let e = 0, n = t.charCodeAt(e);
  for (; n === 9 || n === 32; )
    e++, n = t.charCodeAt(e);
  return t.slice(e);
}
function ol(t, e) {
  const n = zy(t, e), r = n.one(t, void 0), i = Ry(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && (v("children" in a), a.children.push({ type: "text", value: `
` }, i)), a;
}
function jy(t, e) {
  return t && "run" in t ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      ol(n, { file: r, ...e })
    );
    await t.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      ol(n, { file: r, ...t || e })
    );
  };
}
function ll(t) {
  if (t)
    throw t;
}
var ei = Object.prototype.hasOwnProperty, qc = Object.prototype.toString, cl = Object.defineProperty, ul = Object.getOwnPropertyDescriptor, dl = function(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : qc.call(e) === "[object Array]";
}, hl = function(e) {
  if (!e || qc.call(e) !== "[object Object]")
    return !1;
  var n = ei.call(e, "constructor"), r = e.constructor && e.constructor.prototype && ei.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !n && !r)
    return !1;
  var i;
  for (i in e)
    ;
  return typeof i > "u" || ei.call(e, i);
}, fl = function(e, n) {
  cl && n.name === "__proto__" ? cl(e, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : e[n.name] = n.newValue;
}, pl = function(e, n) {
  if (n === "__proto__")
    if (ei.call(e, n)) {
      if (ul)
        return ul(e, n).value;
    } else return;
  return e[n];
}, Vy = function t() {
  var e, n, r, i, a, s, o = arguments[0], l = 1, c = arguments.length, u = !1;
  for (typeof o == "boolean" && (u = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < c; ++l)
    if (e = arguments[l], e != null)
      for (n in e)
        r = pl(o, n), i = pl(e, n), o !== i && (u && i && (hl(i) || (a = dl(i))) ? (a ? (a = !1, s = r && dl(r) ? r : []) : s = r && hl(r) ? r : {}, fl(o, { name: n, newValue: t(u, s, i) })) : typeof i < "u" && fl(o, { name: n, newValue: i }));
  return o;
};
const Qi = /* @__PURE__ */ Ka(Vy);
function Da(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function Zy() {
  const t = [], e = { run: n, use: r };
  return e;
  function n(...i) {
    let a = -1;
    const s = i.pop();
    if (typeof s != "function")
      throw new TypeError("Expected function as last argument, not " + s);
    o(null, ...i);
    function o(l, ...c) {
      const u = t[++a];
      let d = -1;
      if (l) {
        s(l);
        return;
      }
      for (; ++d < i.length; )
        (c[d] === null || c[d] === void 0) && (c[d] = i[d]);
      i = c, u ? Wy(u, o)(...c) : s(null, ...c);
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
function Wy(t, e) {
  let n;
  return r;
  function r(...s) {
    const o = t.length > s.length;
    let l;
    o && s.push(i);
    try {
      l = t.apply(this, s);
    } catch (c) {
      const u = (
        /** @type {Error} */
        c
      );
      if (o && n)
        throw u;
      return i(u);
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
const Kt = { basename: Gy, dirname: qy, extname: Ky, join: Xy, sep: "/" };
function Gy(t, e) {
  if (e !== void 0 && typeof e != "string")
    throw new TypeError('"ext" argument must be a string');
  Pr(t);
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
function qy(t) {
  if (Pr(t), t.length === 0)
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
function Ky(t) {
  Pr(t);
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
function Xy(...t) {
  let e = -1, n;
  for (; ++e < t.length; )
    Pr(t[e]), t[e] && (n = n === void 0 ? t[e] : n + "/" + t[e]);
  return n === void 0 ? "." : Yy(n);
}
function Yy(t) {
  Pr(t);
  const e = t.codePointAt(0) === 47;
  let n = Jy(t, !e);
  return n.length === 0 && !e && (n = "."), n.length > 0 && t.codePointAt(t.length - 1) === 47 && (n += "/"), e ? "/" + n : n;
}
function Jy(t, e) {
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
function Pr(t) {
  if (typeof t != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(t)
    );
}
const Qy = { cwd: ex };
function ex() {
  return "/";
}
function Fa(t) {
  return !!(t !== null && typeof t == "object" && "href" in t && t.href && "protocol" in t && t.protocol && // @ts-expect-error: indexing is fine.
  t.auth === void 0);
}
function tx(t) {
  if (typeof t == "string")
    t = new URL(t);
  else if (!Fa(t)) {
    const e = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + t + "`"
    );
    throw e.code = "ERR_INVALID_ARG_TYPE", e;
  }
  if (t.protocol !== "file:") {
    const e = new TypeError("The URL must be of scheme file");
    throw e.code = "ERR_INVALID_URL_SCHEME", e;
  }
  return nx(t);
}
function nx(t) {
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
const ea = (
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
class Kc {
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
    e ? Fa(e) ? n = { path: e } : typeof e == "string" || rx(e) ? n = { value: e } : n = e : n = {}, this.cwd = "cwd" in n ? "" : Qy.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < ea.length; ) {
      const a = ea[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      ea.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Kt.basename(this.path) : void 0;
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
    na(e, "basename"), ta(e, "basename"), this.path = Kt.join(this.dirname || "", e);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Kt.dirname(this.path) : void 0;
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
    gl(this.basename, "dirname"), this.path = Kt.join(e || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Kt.extname(this.path) : void 0;
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
    if (ta(e, "extname"), gl(this.dirname, "extname"), e) {
      if (e.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Kt.join(this.dirname, this.stem + (e || ""));
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
    Fa(e) && (e = tx(e)), na(e, "path"), this.path !== e && this.history.push(e);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Kt.basename(this.path, this.extname) : void 0;
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
    na(e, "stem"), ta(e, "stem"), this.path = Kt.join(this.dirname || "", e + (this.extname || ""));
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
function ta(t, e) {
  if (t && t.includes(Kt.sep))
    throw new Error(
      "`" + e + "` cannot be a path: did not expect `" + Kt.sep + "`"
    );
}
function na(t, e) {
  if (!t)
    throw new Error("`" + e + "` cannot be empty");
}
function gl(t, e) {
  if (!t)
    throw new Error("Setting `" + e + "` requires `path` to be set too");
}
function rx(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const ix = (
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
), ax = {}.hasOwnProperty;
class ds extends ix {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Zy();
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
      new ds()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      e.use(...r);
    }
    return e.data(Qi(!0, {}, this.namespace)), e;
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
    return typeof e == "string" ? arguments.length === 2 ? (aa("data", this.frozen), this.namespace[e] = n, this) : ax.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (aa("data", this.frozen), this.namespace = e, this) : this.namespace;
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
    const n = Kr(e), r = this.parser || this.Parser;
    return ra("parse", r), r(String(n), n);
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
    return this.freeze(), ra("process", this.parser || this.Parser), ia("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, s) {
      const o = Kr(e), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(o)
      );
      r.run(l, o, function(u, d, h) {
        if (u || !d || !h)
          return c(u);
        const f = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          d
        ), y = r.stringify(f, h);
        lx(y) ? h.value = y : h.result = y, c(
          u,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function c(u, d) {
        u || !d ? s(u) : a ? a(d) : (v(n, "`done` is defined if `resolve` is not"), n(void 0, d));
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
    return this.freeze(), ra("processSync", this.parser || this.Parser), ia("processSync", this.compiler || this.Compiler), this.process(e, i), yl("processSync", "process", n), v(r, "we either bailed on an error or have a tree"), r;
    function i(a, s) {
      n = !0, ll(a), r = s;
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
    ml(e), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(s, o) {
      v(
        typeof n != "function",
        "`file` can’t be a `done` anymore, we checked"
      );
      const l = Kr(n);
      i.run(e, l, c);
      function c(u, d, h) {
        const f = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          d || e
        );
        u ? o(u) : s ? s(f) : (v(r, "`done` is defined if `resolve` is not"), r(void 0, f, h));
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
    return this.run(e, n, a), yl("runSync", "run", r), v(i, "we either bailed on an error or have a tree"), i;
    function a(s, o) {
      ll(s), i = o, r = !0;
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
    const r = Kr(n), i = this.compiler || this.Compiler;
    return ia("stringify", i), ml(e), i(e, r);
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
    if (aa("use", this.frozen), e != null) if (typeof e == "function")
      l(e, n);
    else if (typeof e == "object")
      Array.isArray(e) ? o(e) : s(e);
    else
      throw new TypeError("Expected usable value, not `" + e + "`");
    return this;
    function a(c) {
      if (typeof c == "function")
        l(c, []);
      else if (typeof c == "object")
        if (Array.isArray(c)) {
          const [u, ...d] = (
            /** @type {PluginTuple<Array<unknown>>} */
            c
          );
          l(u, d);
        } else
          s(c);
      else
        throw new TypeError("Expected usable value, not `" + c + "`");
    }
    function s(c) {
      if (!("plugins" in c) && !("settings" in c))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(c.plugins), c.settings && (i.settings = Qi(!0, i.settings, c.settings));
    }
    function o(c) {
      let u = -1;
      if (c != null) if (Array.isArray(c))
        for (; ++u < c.length; ) {
          const d = c[u];
          a(d);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + c + "`");
    }
    function l(c, u) {
      let d = -1, h = -1;
      for (; ++d < r.length; )
        if (r[d][0] === c) {
          h = d;
          break;
        }
      if (h === -1)
        r.push([c, ...u]);
      else if (u.length > 0) {
        let [f, ...y] = u;
        const b = r[h][1];
        Da(b) && Da(f) && (f = Qi(!0, b, f)), r[h] = [c, f, ...y];
      }
    }
  }
}
const sx = new ds().freeze();
function ra(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `parser`");
}
function ia(t, e) {
  if (typeof e != "function")
    throw new TypeError("Cannot `" + t + "` without `compiler`");
}
function aa(t, e) {
  if (e)
    throw new Error(
      "Cannot call `" + t + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function ml(t) {
  if (!Da(t) || typeof t.type != "string")
    throw new TypeError("Expected node, got `" + t + "`");
}
function yl(t, e, n) {
  if (!n)
    throw new Error(
      "`" + t + "` finished async. Use `" + e + "` instead"
    );
}
function Kr(t) {
  return ox(t) ? t : new Kc(t);
}
function ox(t) {
  return !!(t && typeof t == "object" && "message" in t && "messages" in t);
}
function lx(t) {
  return typeof t == "string" || cx(t);
}
function cx(t) {
  return !!(t && typeof t == "object" && "byteLength" in t && "byteOffset" in t);
}
const ux = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", xl = [], wl = { allowDangerousHtml: !0 }, dx = /^(https?|ircs?|mailto|xmpp)$/i, hx = [
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
function bl(t) {
  const e = fx(t), n = px(t);
  return gx(e.runSync(e.parse(n), n), t);
}
function fx(t) {
  const e = t.rehypePlugins || xl, n = t.remarkPlugins || xl, r = t.remarkRehypeOptions ? { ...t.remarkRehypeOptions, ...wl } : wl;
  return sx().use(K0).use(n).use(jy, r).use(e);
}
function px(t) {
  const e = t.children || "", n = new Kc();
  return typeof e == "string" ? n.value = e : Sa(
    "Unexpected value `" + e + "` for `children` prop, expected `string`"
  ), n;
}
function gx(t, e) {
  const n = e.allowedElements, r = e.allowElement, i = e.components, a = e.disallowedElements, s = e.skipHtml, o = e.unwrapDisallowed, l = e.urlTransform || mx;
  for (const u of hx)
    Object.hasOwn(e, u.from) && Sa(
      "Unexpected `" + u.from + "` prop, " + (u.to ? "use `" + u.to + "` instead" : "remove it") + " (see <" + ux + "#" + u.id + "> for more info)"
    );
  return n && a && Sa(
    "Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other"
  ), Gc(t, c), vm(t, {
    Fragment: en,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: p,
    jsxs: M,
    passKeys: !0,
    passNode: !0
  });
  function c(u, d, h) {
    if (u.type === "raw" && h && typeof d == "number")
      return s ? h.children.splice(d, 1) : h.children[d] = { type: "text", value: u.value }, d;
    if (u.type === "element") {
      let f;
      for (f in Ki)
        if (Object.hasOwn(Ki, f) && Object.hasOwn(u.properties, f)) {
          const y = u.properties[f], b = Ki[f];
          (b === null || b.includes(u.tagName)) && (u.properties[f] = l(String(y || ""), f, u));
        }
    }
    if (u.type === "element") {
      let f = n ? !n.includes(u.tagName) : a ? a.includes(u.tagName) : !1;
      if (!f && r && typeof d == "number" && (f = !r(u, d, h)), f && h && typeof d == "number")
        return o && u.children ? h.children.splice(d, 1, ...u.children) : h.children.splice(d, 1), d;
    }
  }
}
function mx(t) {
  const e = t.indexOf(":"), n = t.indexOf("?"), r = t.indexOf("#"), i = t.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    e === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && e > i || n !== -1 && e > n || r !== -1 && e > r || // It is a protocol, it should be allowed.
    dx.test(t.slice(0, e)) ? t : ""
  );
}
function yx(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function xx(t, e, n) {
  const i = us({}.ignore || []), a = wx(e);
  let s = -1;
  for (; ++s < a.length; )
    Wc(t, "text", o);
  function o(c, u) {
    let d = -1, h;
    for (; ++d < u.length; ) {
      const f = u[d], y = h ? h.children : void 0;
      if (i(
        f,
        y ? y.indexOf(f) : void 0,
        h
      ))
        return;
      h = f;
    }
    if (h)
      return l(c, u);
  }
  function l(c, u) {
    const d = u[u.length - 1], h = a[s][0], f = a[s][1];
    let y = 0;
    const T = d.children.indexOf(c);
    let k = !1, S = [];
    h.lastIndex = 0;
    let R = h.exec(c.value);
    for (; R; ) {
      const P = R.index, D = {
        index: R.index,
        input: R.input,
        stack: [...u, c]
      };
      let _ = f(...R, D);
      if (typeof _ == "string" && (_ = _.length > 0 ? { type: "text", value: _ } : void 0), _ === !1 ? h.lastIndex = P + 1 : (y !== P && S.push({
        type: "text",
        value: c.value.slice(y, P)
      }), Array.isArray(_) ? S.push(..._) : _ && S.push(_), y = P + R[0].length, k = !0), !h.global)
        break;
      R = h.exec(c.value);
    }
    return k ? (y < c.value.length && S.push({ type: "text", value: c.value.slice(y) }), d.children.splice(T, 1, ...S)) : S = [c], T + S.length;
  }
}
function wx(t) {
  const e = [];
  if (!Array.isArray(t))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !t[0] || Array.isArray(t[0]) ? t : [t];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    e.push([bx(i[0]), kx(i[1])]);
  }
  return e;
}
function bx(t) {
  return typeof t == "string" ? new RegExp(yx(t), "g") : t;
}
function kx(t) {
  return typeof t == "function" ? t : function() {
    return t;
  };
}
function Cx(t) {
  xx(t, [/\r?\n|\r/g, _x]);
}
function _x() {
  return { type: "break" };
}
function kl() {
  return function(t) {
    Cx(t);
  };
}
function vx({ children: t, isStreaming: e }) {
  const [n, r] = Te(!0), [i, a] = Te(!1), [s, o] = Te("");
  $t.useEffect(() => {
    !e && !i ? (a(!0), r(!1)) : e && (a(!1), r(!0));
  }, [e, i]);
  const l = () => {
    e || r(!n);
  }, c = $t.Children.map(t, (u) => {
    if ($t.isValidElement(u)) {
      if (u.type === Xc) {
        const d = u.props;
        return d.title && d.title !== s && o(d.title), $t.cloneElement(
          u,
          {
            onToggle: l,
            isExpanded: n
          }
        );
      }
      if (u.type === Yc)
        return $t.cloneElement(
          u,
          {
            isVisible: n,
            title: s
          }
        );
    }
    return u;
  });
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning", children: c });
}
function Xc({
  title: t,
  status: e = "processing",
  duration: n,
  onToggle: r,
  isExpanded: i = !0
}) {
  const { t: a } = bn(), s = () => /* @__PURE__ */ M(
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
  return /* @__PURE__ */ M(
    "div",
    {
      className: `chat-wrapper__reasoning-trigger ${o ? "chat-wrapper__reasoning-trigger--clickable" : ""}`,
      onClick: o ? r : void 0,
      style: { cursor: o ? "pointer" : "default" },
      children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-icon", children: s() }),
        /* @__PURE__ */ M("span", { className: "chat-wrapper__reasoning-title", children: [
          t,
          n && e === "completed" && /* @__PURE__ */ p("span", { className: "chat-wrapper__reasoning-duration", children: n })
        ] }),
        o && /* @__PURE__ */ p(
          "div",
          {
            className: `chat-wrapper__reasoning-arrow ${i ? "" : "chat-wrapper__reasoning-arrow--collapsed"}`,
            children: /* @__PURE__ */ M(
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
function Yc({
  children: t,
  isVisible: e = !0,
  title: n = ""
}) {
  return !e || !(n.toLowerCase().includes("thinking") || n.toLowerCase().includes("thought")) ? null : /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-content", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__reasoning-text", children: t }) });
}
function Sx({ children: t }) {
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle", children: t });
}
function Tx({
  title: t,
  status: e = "processing",
  toolData: n,
  toolName: r,
  clientTools: i
}) {
  var c, u;
  const { t: a } = bn(), s = () => {
    if (!r || !i) return null;
    const d = i.find((h) => h.name === r);
    return (d == null ? void 0 : d.description) || null;
  };
  let o;
  if (r != null && r.startsWith("lat_")) {
    const d = (c = n == null ? void 0 : n.parameters) == null ? void 0 : c.query, h = (u = n == null ? void 0 : n.parameters) == null ? void 0 : u.url;
    o = d || h || a("chat.tools.executing");
  } else
    o = s();
  return o && (o.startsWith("http://") || o.startsWith("https://") || (o = o.charAt(0).toUpperCase() + o.slice(1))), /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-trigger", children: (() => {
    switch (e) {
      case "processing":
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content chat-wrapper__tooling-handle-trigger-content--processing", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ M(
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
          ) : /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__tooling-handle-spinner" }),
            /* @__PURE__ */ p("span", { children: a("chat.tools.executing") })
          ] })
        ] });
      case "completed":
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ M(
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
          ) : /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("div", { className: "chat-wrapper__status-group", children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
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
        return /* @__PURE__ */ M("div", { className: "chat-wrapper__tooling-handle-trigger-content", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: r != null && r.startsWith("lat_tool_web_") ? /* @__PURE__ */ M(
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
          ) : /* @__PURE__ */ M(
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
          /* @__PURE__ */ M("span", { children: [
            `AI text input${r ? ` <${r}>` : ""}`,
            "..."
          ] }),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
const Jc = _i(
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
      return /* @__PURE__ */ p(Qc, { name: e, variant: r === "complete" ? "rehydrated" : "live" });
    const l = o.component;
    return /* @__PURE__ */ p(
      "div",
      {
        className: "chat-wrapper__generative-component",
        "data-component-name": e,
        "data-streaming": r === "streaming" ? "true" : void 0,
        "data-source": a,
        children: /* @__PURE__ */ p(
          Ed,
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
Jc.displayName = "GenerativeComponentRenderer";
const Qc = _i(
  ({ name: t, variant: e = "live" }) => e === "rehydrated" ? /* @__PURE__ */ M("div", { className: "chat-wrapper__generative-component-unknown", role: "note", children: [
    /* @__PURE__ */ p("strong", { children: "This card is no longer available." }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__generative-component-unknown-hint", children: "It was rendered in a previous conversation but the component is no longer part of this dashboard." })
  ] }) : /* @__PURE__ */ M("div", { className: "chat-wrapper__generative-component-unknown", role: "alert", children: [
    /* @__PURE__ */ p("strong", { children: "Unknown component:" }),
    " ",
    /* @__PURE__ */ p("code", { children: t }),
    /* @__PURE__ */ M("div", { className: "chat-wrapper__generative-component-unknown-hint", children: [
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
Qc.displayName = "UnknownComponentFallback";
const Ex = ({ message: t }) => {
  const [e, n] = Te(!0);
  return /* @__PURE__ */ M("div", { className: "chat-wrapper__system-message", children: [
    /* @__PURE__ */ M(
      "div",
      {
        className: "chat-wrapper__system-message-header",
        onClick: () => n(!e),
        style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
        children: [
          t.role === "system" ? /* @__PURE__ */ M("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
          /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-icon", children: /* @__PURE__ */ M(
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
function eu({
  imageUrl: t,
  isOpen: e,
  onClose: n,
  alt: r = "Image preview"
}) {
  const i = de((s) => {
    s.key === "Escape" && (s.stopImmediatePropagation(), n());
  }, [n]), a = de((s) => {
    s.target === s.currentTarget && n();
  }, [n]);
  return Pe(() => {
    const s = document.querySelector(".chat-wrapper__messages"), o = (l) => l.preventDefault();
    return e ? (document.addEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "hidden", s && (s.style.overflowY = "hidden", s.addEventListener("wheel", o, { passive: !1 }))) : (document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o))), () => {
      document.removeEventListener("keydown", i, { capture: !0 }), document.body.style.overflow = "", s && (s.style.overflowY = "", s.removeEventListener("wheel", o));
    };
  }, [e, i]), !e || !t ? null : du(
    /* @__PURE__ */ M(
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
const tu = ({ className: t }) => /* @__PURE__ */ M(
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
), nu = ({ onImageClick: t, className: e, style: n, title: r, ...i }) => {
  const [a, s] = Te(!1), o = fe(null);
  return a ? /* @__PURE__ */ M("div", { className: `chat-wrapper__image-unavailable ${e ?? ""}`, children: [
    /* @__PURE__ */ M("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
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
}, Rx = (t) => {
  let e = t.replace(
    new RegExp("(?<!\\]\\()(?<!!.*\\]\\()https:\\/\\/ucarecdn\\.com\\/[^\\s)>]+", "g"),
    (n) => `![image](${n})`
  );
  return e = e.replace(
    new RegExp("(?<!\\]\\()(?<!!\\[.*\\]\\()(?<!\\()(https?:\\/\\/[^\\s)>]+)", "g"),
    (n) => `[${n}](${n})`
  ), e;
}, Nx = (t) => ({
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
    nu,
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
}), ru = _i(
  ({ message: t, isLatestUiComponent: e = !1 }) => {
    var re;
    const {
      getReasoningTitle: n,
      getReasoningStatus: r,
      getReasoningDuration: i,
      getReasoningContentOnly: a,
      getToolingTitle: s,
      getToolingStatus: o,
      clientTools: l,
      generativeRegistry: c,
      currentAssistantMessageIdRef: u,
      onRetryMessage: d
    } = er(), { t: h } = bn(), [f, y] = Te(!1), [b, T] = Te(!1), [k, S] = Te(null), R = de(async () => {
      try {
        await navigator.clipboard.writeText(t.content), y(!0), setTimeout(() => y(!1), 2e3);
      } catch (ge) {
        console.error("Failed to copy message:", ge);
      }
    }, [t.content]), P = de(() => {
      d && d(t.id);
    }, [d, t.id]), D = de((ge) => {
      S(ge);
    }, []), _ = de(() => {
      S(null);
    }, []), H = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__streaming-placeholder", children: /* @__PURE__ */ p(tu, {}) }), U = () => d && /* @__PURE__ */ p(
      "button",
      {
        className: "chat-wrapper__retry-button",
        onClick: P,
        children: h("chat.errors.retry")
      }
    ), G = () => /* @__PURE__ */ M(en, { children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__copy-button-container", children: /* @__PURE__ */ p(
        "button",
        {
          className: `chat-wrapper__copy-button ${b ? "chat-wrapper__copy-button--visible" : "chat-wrapper__copy-button--hidden"}`,
          onClick: R,
          title: "Copy message",
          children: /* @__PURE__ */ p(Sg, {})
        }
      ) }),
      f && /* @__PURE__ */ p("div", { className: "chat-wrapper__copied-notification", children: "Copied!" })
    ] }), J = Ue(() => Nx(D), [D]), Z = () => /* @__PURE__ */ p("div", { className: "chat-wrapper__regular-message chat-wrapper__assistant-message-container", children: /* @__PURE__ */ M("div", { className: "chat-wrapper__assistant-content-wrapper", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        bl,
        {
          components: J,
          remarkPlugins: [kl],
          children: Rx(t.content)
        },
        `${t.id}-${t.isStreaming ? "streaming" : "final"}`
      ) }),
      G()
    ] }) }), I = () => /* @__PURE__ */ M("div", { className: "chat-wrapper__regular-message", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__markdown-content", children: /* @__PURE__ */ p(
        bl,
        {
          remarkPlugins: [kl],
          components: J,
          children: t.content
        },
        `${t.id}-user`
      ) }),
      t.media && t.media.length > 0 && /* @__PURE__ */ p("div", { className: "chat-wrapper__media", children: t.media.map((ge, w) => /* @__PURE__ */ p(
        nu,
        {
          src: ge,
          alt: `Uploaded content ${w + 1}`,
          className: "chat-wrapper__media-image chat-wrapper__media-image--clickable",
          onImageClick: () => D(ge),
          style: {
            cursor: "zoom-in",
            transition: "transform 0.2s, box-shadow 0.2s"
          },
          onMouseEnter: ($) => {
            $.currentTarget.style.transform = "scale(1.02)", $.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          },
          onMouseLeave: ($) => {
            $.currentTarget.style.transform = "scale(1)", $.currentTarget.style.boxShadow = "";
          },
          title: "Click to view full size"
        },
        w
      )) })
    ] }), E = () => t.role === "assistant" && t.isStreaming && t.content === "" && t.id === u.current ? H() : t.role === "system" ? /* @__PURE__ */ p(Ex, { message: t }) : t.role === "assistant" ? Z() : I(), O = () => /* @__PURE__ */ M(vx, { isStreaming: t.isStreaming || !1, children: [
      /* @__PURE__ */ p(
        Xc,
        {
          title: n(t.content, t.isStreaming),
          status: r(t.content, t.isStreaming),
          duration: i(t.content)
        }
      ),
      /* @__PURE__ */ p(Yc, { children: a(t.content) })
    ] }), F = () => {
      var ge;
      return /* @__PURE__ */ p(Sx, { isStreaming: t.isStreaming || !1, children: /* @__PURE__ */ p(
        Tx,
        {
          title: s(t.content, t.isStreaming),
          status: o(t.content, t.isStreaming),
          toolData: t.toolData,
          toolName: (ge = t.toolData) == null ? void 0 : ge.toolName,
          clientTools: l
        }
      ) });
    }, q = () => t.uiComponent ? /* @__PURE__ */ p(
      Jc,
      {
        registry: c,
        componentName: t.uiComponent.name,
        props: t.uiComponent.props,
        status: t.uiComponent.status,
        callId: t.uiComponent.callId,
        source: t.uiComponent.source,
        isLatest: e
      }
    ) : null;
    return t.role === "assistant" && !t.isStreaming && (t.content ?? "").trim() === "" && (((re = t.uiComponents) == null ? void 0 : re.length) ?? 0) > 0 ? null : /* @__PURE__ */ M(en, { children: [
      /* @__PURE__ */ p(
        "div",
        {
          className: `chat-wrapper__message chat-wrapper__message--${t.role === "system" ? "assistant" : t.role === "reasoning" ? "reasoning" : t.role === "tooling" ? "tooling" : t.role === "ui-component" ? "ui-component" : t.role}`,
          onMouseEnter: () => t.role === "assistant" && T(!0),
          onMouseLeave: () => t.role === "assistant" && T(!1),
          children: t.role === "reasoning" ? O() : t.role === "tooling" ? F() : t.role === "ui-component" ? q() : /* @__PURE__ */ M(en, { children: [
            /* @__PURE__ */ p("div", { className: "chat-wrapper__message-content", children: E() }),
            t.role === "user" && t.hasError && !t.isRetrying && U()
          ] })
        }
      ),
      /* @__PURE__ */ p(
        eu,
        {
          imageUrl: k,
          isOpen: !!k,
          onClose: _,
          alt: "Message image"
        }
      )
    ] });
  }
);
ru.displayName = "MessageItem";
const Ax = ({ isVisible: t }) => t ? /* @__PURE__ */ p("div", { className: "chat-wrapper__message chat-wrapper__message--assistant", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-bubble", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__thinking-content", children: /* @__PURE__ */ p(tu, {}) }) }) }) : null, iu = Mr((t, e) => {
  const {
    messages: n,
    isThinking: r,
    isHandlingTool: i
  } = er(), a = Ue(() => {
    var s;
    for (let o = n.length - 1; o >= 0; o--) {
      const l = n[o];
      if (l.role === "user") return null;
      if (l.role === "ui-component" && ((s = l.uiComponent) != null && s.callId))
        return l.uiComponent.callId;
    }
    return null;
  }, [n]);
  return /* @__PURE__ */ M("div", { className: "chat-wrapper__messages", children: [
    n.map((s) => {
      var o;
      return /* @__PURE__ */ p(
        ru,
        {
          message: s,
          isLatestUiComponent: !!((o = s.uiComponent) != null && o.callId) && s.uiComponent.callId === a
        },
        s.id
      );
    }),
    /* @__PURE__ */ p(Ax, { isVisible: r && !i }),
    /* @__PURE__ */ p("div", { ref: e })
  ] });
});
iu.displayName = "MessagesList";
const jt = (...t) => t.filter(Boolean).join(" "), Ix = () => /* @__PURE__ */ M(
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
), Mx = () => /* @__PURE__ */ M(
  "svg",
  {
    width: "54",
    height: "55",
    viewBox: "0 0 54 55",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ M("g", { filter: "url(#filter0_dd_stop_121_23927)", children: [
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
      /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ M(
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
), Ox = ({ className: t, ...e }) => /* @__PURE__ */ p("form", { className: jt("chat-wrapper__prompt-input", t), ...e }), au = Mr(
  ({
    onChange: t,
    className: e,
    placeholder: n = "What would you like to know?",
    minHeight: r = 48,
    maxHeight: i = 164,
    onKeyDown: a,
    ...s
  }, o) => {
    const l = (c) => {
      if (c.key === "Enter") {
        if (c.shiftKey)
          return;
        c.preventDefault();
        const u = c.currentTarget.form;
        if (u) {
          const d = new Event("submit", {
            cancelable: !0,
            bubbles: !0
          });
          u.dispatchEvent(d);
        }
      }
      a == null || a(c);
    };
    return /* @__PURE__ */ p(
      "textarea",
      {
        ref: o,
        className: jt("chat-wrapper__prompt-textarea", e),
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
au.displayName = "PromptInputTextarea";
const Lx = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: jt("chat-wrapper__prompt-toolbar", t), ...e }), Px = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p("div", { className: jt("chat-wrapper__prompt-tools", t), ...e }), Dx = ({
  variant: t = "ghost",
  size: e = "default",
  className: n,
  children: r,
  ...i
}) => {
  const a = e === "default" && (typeof r == "string" || $t.Children.count(r) === 1) ? "icon" : e;
  return /* @__PURE__ */ p(
    "button",
    {
      className: jt(
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
}, Fx = ({
  className: t,
  variant: e = "default",
  size: n = "icon",
  status: r = Be.IDLE,
  children: i,
  disabled: a,
  ...s
}) => {
  const o = sa(r);
  let l = o ? /* @__PURE__ */ p(Mx, {}) : /* @__PURE__ */ p(Ix, {});
  return /* @__PURE__ */ p(
    "button",
    {
      className: jt(
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
}, u9 = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p("select", { className: jt("chat-wrapper__prompt-select", t), ...n, children: e }), d9 = ({
  className: t,
  children: e,
  ...n
}) => /* @__PURE__ */ p(
  "button",
  {
    className: jt("chat-wrapper__prompt-select-trigger", t),
    type: "button",
    ...n,
    children: e
  }
), h9 = ({
  className: t,
  ...e
}) => /* @__PURE__ */ p(
  "div",
  {
    className: jt("chat-wrapper__prompt-select-content", t),
    ...e
  }
), f9 = ({
  className: t,
  value: e,
  ...n
}) => /* @__PURE__ */ p(
  "div",
  {
    className: jt("chat-wrapper__prompt-select-item", t),
    "data-value": e,
    ...n
  }
), p9 = ({
  className: t,
  placeholder: e,
  ...n
}) => /* @__PURE__ */ p(
  "span",
  {
    className: jt("chat-wrapper__prompt-select-value", t),
    ...n,
    children: e
  }
), zx = ({
  placeholderTexts: t,
  shouldAnimate: e,
  className: n = ""
}) => {
  const [r, i] = Te(0), [a, s] = Te(!1), [o, l] = Te(0);
  return Pe(() => {
    if (!e || t.length <= 1) return;
    const c = setInterval(() => {
      s(!0), setTimeout(() => {
        i((u) => (u + 1) % t.length), l((u) => u + 1), s(!1);
      }, 150);
    }, 2e3);
    return () => clearInterval(c);
  }, [e, t.length]), Pe(() => {
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
}, Hx = Mr((t, e) => {
  const {
    placeholderTexts: n,
    isStreaming: r,
    isLoadingConversation: i,
    chatStatus: a,
    fileUploadEnabled: s,
    fileUploadConfig: o,
    chipName: l,
    chipLogo: c,
    messages: u,
    onSubmit: d,
    onFileUpload: h,
    onStopGeneration: f
  } = er(), { t: y } = bn(), b = r || i, T = u.length > 0, [k, S] = Te(""), [R, P] = Te([]), [D, _] = Te([]), [H, U] = Te(null), [G, J] = Te(null), [Z, I] = Te(!1), E = fe(null), O = de((j) => {
    J(j), I(!0);
  }, []), F = de((j) => new Promise((x, X) => {
    const V = new FileReader();
    V.onload = () => x(V.result), V.onerror = X, V.readAsDataURL(j);
  }), []), q = n && n.length > 0 ? n : [y("chat.input.placeholder")], ce = k.length === 0 && !T && q.length > 1;
  _l(
    e,
    () => ({
      focus: () => {
        var j;
        (j = E.current) == null || j.focus();
      },
      setText: (j) => {
        S(j), setTimeout(() => {
          if (E.current) {
            E.current.focus();
            const x = j.length;
            E.current.setSelectionRange(x, x);
          }
        }, 0);
      },
      textareaRef: E
    }),
    []
  );
  const re = de(
    (j) => {
      j.preventDefault();
      const X = new FormData(j.currentTarget).get("message");
      if (X != null && X.trim()) {
        const V = qa(X.trim(), !1);
        if (!V.trim())
          return;
        d(V, R), S(""), P([]);
      }
    },
    [d, R]
  ), ge = de(
    (j) => {
      const X = j.target.value.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "");
      S(X), H && X.trim() && U(null);
    },
    [H]
  ), w = de(
    async (j) => {
      var V;
      const X = Array.from(((V = j.clipboardData) == null ? void 0 : V.items) || []).filter((ue) => ue.type.startsWith("image/"));
      if (X.length > 0) {
        j.preventDefault(), U(null);
        try {
          const ue = await Promise.all(
            X.map((he) => {
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
          if (ue.length > 0) {
            const he = ue.filter((le) => {
              const _e = (o == null ? void 0 : o.maxFileSize) ?? 15728640;
              return le.size > _e ? (U(
                y("chat.fileUpload.sizeLimitExceeded", {
                  maxSize: Math.round(_e / 1048576)
                })
              ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp"
              ]).includes(le.type) ? !0 : (U(y("chat.fileUpload.typeNotAllowed")), !1);
            });
            if (he.length > 0) {
              const le = (o == null ? void 0 : o.maxFiles) ?? 5;
              if (R.length + D.length + he.length > le) {
                U(
                  y("chat.fileUpload.maxFilesExceeded", { maxFiles: le })
                );
                return;
              }
              const Me = he.map(async (be) => ({
                file: be,
                preview: await F(be),
                isUploading: !0,
                progress: 0
              })), ve = await Promise.all(Me);
              _((be) => [...be, ...ve]);
              try {
                const be = await h(he);
                _(
                  (He) => He.filter((Fe) => !he.includes(Fe.file))
                ), P((He) => [...He, ...be]), U(null);
              } catch {
                _(
                  (He) => He.filter((Fe) => !he.includes(Fe.file))
                ), U(y("chat.errors.connection"));
              }
            }
          }
        } catch (ue) {
          U(
            ue instanceof Error ? ue.message : y("chat.errors.unexpected")
          ), _([]);
        }
      }
    },
    [
      h,
      o,
      R,
      D,
      F,
      y
    ]
  ), $ = de(async () => {
    const j = document.createElement("input");
    j.type = "file", j.accept = "image/*", j.multiple = !0, j.onchange = async (x) => {
      const X = x.target.files;
      if (X)
        try {
          U(null);
          const V = Array.from(X).filter((ue) => {
            const he = Wf(ue.name);
            ue.name;
            const le = (o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024;
            return ue.size > le ? (U(
              y("chat.fileUpload.sizeLimitExceeded", {
                maxSize: Math.round(le / (1024 * 1024))
              })
            ), !1) : ((o == null ? void 0 : o.allowedTypes) ?? [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp"
            ]).includes(ue.type) ? !0 : (U(y("chat.fileUpload.typeNotAllowed")), !1);
          });
          if (V.length > 0) {
            const ue = (o == null ? void 0 : o.maxFiles) ?? 5;
            if (R.length + D.length + V.length > ue) {
              U(
                y("chat.fileUpload.maxFilesExceeded", { maxFiles: ue })
              );
              return;
            }
            const le = V.map(async (Me) => ({
              file: Me,
              preview: await F(Me),
              isUploading: !0,
              progress: 0
            })), _e = await Promise.all(le);
            _((Me) => [...Me, ..._e]);
            try {
              const Me = await h(V);
              _(
                (ve) => ve.filter((be) => !V.includes(be.file))
              ), P((ve) => [...ve, ...Me]), U(null);
            } catch {
              _(
                (ve) => ve.filter((be) => !V.includes(be.file))
              ), U(y("chat.errors.connection"));
            }
          }
        } catch (V) {
          U(
            V instanceof Error ? V.message : y("chat.errors.unexpected")
          ), _([]);
        }
    }, j.click();
  }, [
    h,
    o,
    R,
    D,
    F,
    y
  ]);
  return /* @__PURE__ */ M(
    Ox,
    {
      onSubmit: re,
      className: `${b ? "chat-wrapper__prompt-input--disabled" : ""} ${R.length > 0 || D.length > 0 || H ? "chat-wrapper__prompt-input--with-media" : ""}`,
      children: [
        /* @__PURE__ */ p(
          au,
          {
            ref: E,
            name: "message",
            value: k,
            onChange: ge,
            onPaste: w,
            placeholder: "",
            disabled: b
          }
        ),
        !k.trim() && /* @__PURE__ */ p(
          zx,
          {
            placeholderTexts: q,
            shouldAnimate: ce
          }
        ),
        H && /* @__PURE__ */ M("div", { className: "chat-wrapper__upload-error", children: [
          /* @__PURE__ */ p("div", { className: "chat-wrapper__upload-error-icon", children: /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-icon-text", children: "!" }) }),
          /* @__PURE__ */ p("span", { className: "chat-wrapper__upload-error-message", children: H }),
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
        (R.length > 0 || D.length > 0) && /* @__PURE__ */ M("div", { className: "chat-wrapper__media-preview-container", children: [
          D.map((j, x) => /* @__PURE__ */ M(
            "div",
            {
              className: "chat-wrapper__media-item-wrapper",
              children: [
                /* @__PURE__ */ M("div", { className: "chat-wrapper__uploading-thumbnail", children: [
                  /* @__PURE__ */ p(
                    "img",
                    {
                      src: j.preview,
                      alt: `Uploading ${x + 1}`,
                      className: "chat-wrapper__uploading-thumbnail-image"
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "chat-wrapper__uploading-overlay", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__uploading-spinner" }) })
                ] }),
                /* @__PURE__ */ p(
                  "button",
                  {
                    onClick: () => {
                      _(
                        (X) => X.filter((V, ue) => ue !== x)
                      );
                    },
                    className: "chat-wrapper__media-remove-button",
                    title: "Cancel upload",
                    children: "×"
                  }
                )
              ]
            },
            `uploading-${x}`
          )),
          R.map((j, x) => {
            const X = j.startsWith("data:image/"), V = j.startsWith("http://") || j.startsWith("https://"), ue = X || V;
            return /* @__PURE__ */ M(
              "div",
              {
                className: "chat-wrapper__media-item-wrapper",
                children: [
                  ue ? /* @__PURE__ */ M(
                    "div",
                    {
                      className: "chat-wrapper__media-thumbnail",
                      onClick: () => O(j),
                      title: "Click to view full image",
                      children: [
                        /* @__PURE__ */ p(
                          "img",
                          {
                            src: j,
                            alt: `Attachment ${x + 1}`,
                            className: "chat-wrapper__media-thumbnail-image"
                          }
                        ),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-overlay" }),
                        /* @__PURE__ */ p("div", { className: "chat-wrapper__media-thumbnail-zoom-icon" })
                      ]
                    }
                  ) : /* @__PURE__ */ M("div", { className: "chat-wrapper__file-preview", children: [
                    /* @__PURE__ */ p("div", { className: "chat-wrapper__file-icon-container", children: /* @__PURE__ */ M(
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
                    /* @__PURE__ */ M("div", { className: "chat-wrapper__file-info", children: [
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-name", children: (() => {
                        const he = j.match(/name=([^;]+)/);
                        return he ? decodeURIComponent(he[1]) : "document.pdf";
                      })() }),
                      /* @__PURE__ */ p("div", { className: "chat-wrapper__file-type", children: (() => {
                        const he = j.match(/data:([^;]+)/);
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
                              const _e = le.split("/")[1];
                              return _e ? _e.toUpperCase().substring(0, 4) : "FILE";
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
                        P(
                          (he) => he.filter((le, _e) => _e !== x)
                        ), H && U(null);
                      },
                      className: `chat-wrapper__media-remove-button ${ue ? "" : "chat-wrapper__media-remove-button--file"}`,
                      title: "Remove attachment",
                      children: "×"
                    }
                  )
                ]
              },
              `uploaded-${x}`
            );
          })
        ] }),
        /* @__PURE__ */ M(Lx, { children: [
          /* @__PURE__ */ M(Px, { children: [
            s && /* @__PURE__ */ p("div", { className: "chat-wrapper__file-upload-container", children: /* @__PURE__ */ p(
              Dx,
              {
                variant: "ghost",
                size: "icon",
                onClick: $,
                title: D.length > 0 ? `Uploading ${D.length} file(s)...` : R.length > 0 ? `${R.length}/${(o == null ? void 0 : o.maxFiles) ?? 5} image(s) attached` : `Attach images (max ${(o == null ? void 0 : o.maxFiles) ?? 5} files, ${Math.round(
                  ((o == null ? void 0 : o.maxFileSize) ?? 15 * 1024 * 1024) / (1024 * 1024)
                )}MB each)`,
                disabled: b || D.length > 0,
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
            l && /* @__PURE__ */ M("div", { className: "chat-wrapper__restaurant-chip", children: [
              c && /* @__PURE__ */ p(
                "img",
                {
                  src: c,
                  alt: "Chip logo",
                  className: "chat-wrapper__restaurant-logo"
                }
              ),
              /* @__PURE__ */ p("span", { className: "chat-wrapper__restaurant-name", children: l })
            ] })
          ] }),
          /* @__PURE__ */ p(
            Fx,
            {
              status: a,
              disabled: sa(a) ? !1 : !k.trim() || b || D.length > 0,
              onClick: sa(a) && f ? () => {
                f();
              } : void 0
            }
          )
        ] }),
        /* @__PURE__ */ p(
          eu,
          {
            imageUrl: G,
            isOpen: Z,
            onClose: () => {
              I(!1), J(null);
            },
            alt: "Image preview"
          }
        )
      ]
    }
  );
}), Ux = () => {
  const { suggestedPrompts: t, chatInputRef: e, enableSuggestedPromptsAnimation: n = !0 } = er(), r = fe(!1), i = fe(null), a = fe(null);
  if (Pe(() => () => {
    i.current && cancelAnimationFrame(i.current), a.current && clearTimeout(a.current);
  }, []), !t || t.length === 0)
    return null;
  const s = de((f) => {
    var T;
    if (r.current)
      return;
    if (!e.current) {
      console.warn("Chat input ref not available");
      return;
    }
    if (!n) {
      e.current.setText(f.description), e.current.focus();
      return;
    }
    i.current && (cancelAnimationFrame(i.current), i.current = null), a.current && (clearTimeout(a.current), a.current = null);
    const y = (T = e.current.textareaRef) == null ? void 0 : T.current;
    if (!y) {
      console.warn("Textarea ref not available, using fallback"), e.current.setText(f.description);
      return;
    }
    e.current.setText(""), y.focus(), r.current = !0;
    let b = !1;
    return f.description.length > 0 && e.current.setText(f.description[0]), a.current = setTimeout(() => {
      let k = 1;
      const S = 10, R = () => {
        if (b || !e.current) {
          r.current = !1, a.current = null;
          return;
        }
        if (k < f.description.length) {
          const P = f.description.substring(0, k + 1);
          y.value = P;
          const D = new Event("input", { bubbles: !0 });
          y.dispatchEvent(D), k++, a.current = setTimeout(R, S);
        } else
          r.current = !1, a.current = null, e.current && e.current.setText(f.description);
      };
      R();
    }, 10), () => {
      b = !0, a.current && (clearTimeout(a.current), a.current = null), r.current = !1;
    };
  }, [e, n]), o = fe(null), l = fe({ isDown: !1, startX: 0, scrollLeft: 0, hasDragged: !1 }), c = de((f) => {
    const y = o.current;
    y && (l.current = { isDown: !0, startX: f.pageX - y.offsetLeft, scrollLeft: y.scrollLeft, hasDragged: !1 }, y.style.cursor = "grabbing", y.style.userSelect = "none");
  }, []), u = de((f) => {
    const y = o.current;
    if (!y || !l.current.isDown) return;
    const T = f.pageX - y.offsetLeft - l.current.startX;
    Math.abs(T) > 4 && (l.current.hasDragged = !0), y.scrollLeft = l.current.scrollLeft - T;
  }, []), d = de(() => {
    const f = o.current;
    f && (l.current.isDown = !1, f.style.cursor = "grab", f.style.userSelect = "");
  }, []), h = de((f) => {
    l.current.hasDragged && (f.stopPropagation(), l.current.hasDragged = !1);
  }, []);
  return /* @__PURE__ */ M("div", { className: "chat-wrapper__suggested-prompts", children: [
    /* @__PURE__ */ p("h3", { className: "chat-wrapper__suggested-prompts-title", children: "Suggested Prompts" }),
    /* @__PURE__ */ p(
      "div",
      {
        ref: o,
        className: "chat-wrapper__suggested-prompts-grid",
        onMouseDown: c,
        onMouseMove: u,
        onMouseUp: d,
        onMouseLeave: d,
        onClickCapture: h,
        style: { cursor: "grab" },
        children: t.map((f, y) => /* @__PURE__ */ p(
          "button",
          {
            className: "chat-wrapper__suggested-prompt-card",
            onClick: () => s(f),
            title: f.description,
            children: /* @__PURE__ */ M("div", { className: "chat-wrapper__suggested-prompt-content", children: [
              /* @__PURE__ */ p("h4", { className: "chat-wrapper__suggested-prompt-title", children: f.title }),
              /* @__PURE__ */ p("p", { className: "chat-wrapper__suggested-prompt-description", children: f.description })
            ] })
          },
          y
        ))
      }
    )
  ] });
};
function $x({ size: t = 16, variant: e = "dots" }) {
  return e === "dots" ? /* @__PURE__ */ M("div", { className: "chat-wrapper__loader-dots", style: { fontSize: t }, children: [
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
const Bx = ({
  size: t = 20,
  fullHeight: e = !1
}) => /* @__PURE__ */ p(
  "div",
  {
    className: `chat-wrapper__inline-loader ${e ? "chat-wrapper__inline-loader--full-height" : ""}`,
    children: /* @__PURE__ */ p("div", { className: "chat-wrapper__inline-loader-content", children: /* @__PURE__ */ p($x, { size: t, variant: "dots" }) })
  }
), jx = () => /* @__PURE__ */ M("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ M("g", { clipPath: "url(#clip0_1219_24100)", children: [
    /* @__PURE__ */ p("path", { d: "M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z", fill: "#637381" }),
    /* @__PURE__ */ p("path", { d: "M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z", fill: "#637381" })
  ] }),
  /* @__PURE__ */ p("defs", { children: /* @__PURE__ */ p("clipPath", { id: "clip0_1219_24100", children: /* @__PURE__ */ p("rect", { width: "24", height: "24", fill: "white" }) }) })
] }), Cl = ({
  headerName: t,
  headerDescription: e,
  showIcon: n = !1
}) => /* @__PURE__ */ M("div", { className: "chat-wrapper__main-header", children: [
  n && /* @__PURE__ */ p("div", { className: "chat-wrapper__main-header-icon", children: /* @__PURE__ */ p(jx, {}) }),
  /* @__PURE__ */ p("h1", { className: "chat-wrapper__main-title", children: t }),
  e && /* @__PURE__ */ p("p", { className: "chat-wrapper__description", children: e })
] }), Vx = () => /* @__PURE__ */ M("div", { className: "chat-wrapper__skeleton", children: [
  /* @__PURE__ */ M("div", { className: "chat-wrapper__skeleton-header", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-title" }),
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-description" })
  ] }),
  /* @__PURE__ */ M("div", { className: "chat-wrapper__skeleton-content", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input", children: /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-input-field" }) }),
    /* @__PURE__ */ M("div", { className: "chat-wrapper__skeleton-prompts", children: [
      /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompts-title" }),
      /* @__PURE__ */ M("div", { className: "chat-wrapper__skeleton-prompts-grid", children: [
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" }),
        /* @__PURE__ */ p("div", { className: "chat-wrapper__skeleton-prompt-card" })
      ] })
    ] })
  ] })
] }), Zx = ({
  errorType: t = "unknown",
  errorMessage: e,
  retryCount: n = 0,
  onRetry: r,
  footer: i
}) => {
  const { t: a } = bn(), s = () => {
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
  return /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-overlay", children: /* @__PURE__ */ M("div", { className: "chat-wrapper__connection-error-card", children: [
    /* @__PURE__ */ p("div", { className: "chat-wrapper__connection-error-icon", children: /* @__PURE__ */ M(
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
    n > 0 && /* @__PURE__ */ M("p", { className: "chat-wrapper__connection-error-retry-count", children: [
      "Retry attempt: ",
      n
    ] }),
    r && /* @__PURE__ */ M(
      "button",
      {
        className: "chat-wrapper__connection-error-button",
        onClick: r,
        children: [
          /* @__PURE__ */ M(
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
}, Wx = () => {
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
    chatInputRef: c,
    isOffline: u,
    connectionState: d,
    isInitialConnection: h,
    conversationError: f,
    onRetryConnection: y
  } = er(), b = e || t.length === 0 && (h || d === Je.CONNECTING), T = t.length === 0 && !e && d === Je.DISCONNECTED && !h;
  if (b || T)
    return /* @__PURE__ */ M("div", { style: { position: "relative", height: "100%" }, children: [
      /* @__PURE__ */ p(Vx, {}),
      T && /* @__PURE__ */ p(
        Zx,
        {
          errorType: u ? "network" : "server",
          errorMessage: f || void 0,
          onRetry: y,
          footer: o
        }
      )
    ] });
  const k = Yt.state.shouldShowMainHeader(
    t.length,
    n,
    e
  ), S = Yt.state.shouldShowSuggestedPrompts(
    t.length,
    n,
    e,
    a,
    s
  ), R = Yt.state.getContentAreaClass(
    t.length,
    n,
    e,
    S
  ), P = R.includes("compact");
  return /* @__PURE__ */ M("div", { className: `chat-wrapper__scroll-container${S ? " chat-wrapper__scroll-container--scrollable" : ""}`, children: [
    k && !P && /* @__PURE__ */ p("div", { style: u ? { paddingTop: "48px" } : void 0, children: /* @__PURE__ */ p(
      Cl,
      {
        headerName: r,
        headerDescription: i,
        showIcon: !1
      }
    ) }),
    /* @__PURE__ */ M(
      "div",
      {
        className: R,
        style: u && t.length > 0 ? { paddingTop: "72px" } : void 0,
        children: [
          k && P && /* @__PURE__ */ p("div", { style: {
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: u ? "48px" : void 0
          }, children: /* @__PURE__ */ p(
            Cl,
            {
              headerName: r,
              headerDescription: i,
              showIcon: !0
            }
          ) }),
          !P && (e && t.length === 0 ? /* @__PURE__ */ p("div", { className: "chat-wrapper__messages", children: /* @__PURE__ */ p(Bx, { fullHeight: !0 }) }) : /* @__PURE__ */ p(iu, { ref: l })),
          /* @__PURE__ */ p("div", { className: "chat-wrapper__input-container", children: /* @__PURE__ */ p(Hx, { ref: c }) })
        ]
      }
    ),
    S && /* @__PURE__ */ p(Ux, {}),
    S && o && /* @__PURE__ */ p("div", { children: o })
  ] });
};
function Gx({
  isVisible: t,
  isReconnecting: e = !1
}) {
  const { t: n } = bn();
  return t ? /* @__PURE__ */ p("div", { className: "network-status-banner", children: /* @__PURE__ */ p("div", { className: "network-status-banner__content", children: e ? /* @__PURE__ */ M(en, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__spinner" }),
    /* @__PURE__ */ p("span", { children: n("chat.connection.reconnecting") })
  ] }) : /* @__PURE__ */ M(en, { children: [
    /* @__PURE__ */ p("div", { className: "network-status-banner__icon", children: /* @__PURE__ */ p("span", { className: "network-status-banner__icon-text", children: "!" }) }),
    /* @__PURE__ */ p("span", { className: "network-status-banner__message", children: n("chat.errors.connection") })
  ] }) }) }) : null;
}
const su = Mr(
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
  }, c) => {
    var cr, Mt;
    const { token: u, entityId: d, entityType: h } = t;
    Yt.validation.validateAuthProps({
      userMpAuthToken: u,
      chatServerUrl: e,
      chatServerKey: n
    });
    const f = Ue(() => Yt.url.convertWebSocketToHttp(e), [e]), y = Ue(
      () => {
        var L, Ae;
        return new gg({
          apiUrl: f,
          userMpAuthToken: u,
          chatServerKey: n,
          maxFileSize: (L = a.fileUploadConfig) == null ? void 0 : L.maxFileSize,
          allowedTypes: (Ae = a.fileUploadConfig) == null ? void 0 : Ae.allowedTypes
        });
      },
      [f, u, n, a.fileUploadConfig]
    ), b = Ue(() => s && s.length > 0 ? s.map(({ execute: L, ...Ae }) => Ae) : [], [s]), T = Ue(
      () => sf(o),
      [o]
    ), k = Ue(
      () => new Sd(T),
      [T]
    ), S = Ue(
      () => k.getSchemas(),
      [k]
    ), R = ug(), { isOnline: P, wasOffline: D } = pg(), _ = fe(!0), H = me((L) => L.isModalOpen), U = me((L) => L.isCollapsed), G = me((L) => L.currentMode), J = me((L) => L.openModal), Z = me((L) => L.closeModal), I = me((L) => L.toggleCollapse), E = me((L) => L.toggleFullscreen), O = me((L) => L.setCurrentMode), F = me((L) => L.chatStatus), q = me((L) => L.setChatStatus), ce = me((L) => L.streamingStatus), re = me((L) => L.setStreamingStatus), ge = me(
      (L) => L.isLoadingConversation
    ), w = me(
      (L) => L.setIsLoadingConversation
    ), $ = me((L) => L.conversationError), j = me(
      (L) => L.setConversationError
    ), x = me((L) => L.setCurrentThreadId), X = me((L) => L.providerResId), V = me((L) => L.setProviderResId), ue = me((L) => L.isStreaming), he = me((L) => L.setIsStreaming), le = me((L) => L.isThinking), _e = me((L) => L.setIsThinking), Me = me((L) => L.streamingContent), ve = me(
      (L) => L.setStreamingContent
    ), be = me((L) => L.isHandlingTool), He = me((L) => L.setIsHandlingTool);
    Pe(() => {
      a.mode && O(a.mode);
    }, [a.mode, O]), Pe(() => {
      if (typeof window > "u" || typeof document > "u")
        return;
      const L = (Ae) => {
        Ae.key === "Escape" && G === "modal" && H && Z();
      };
      if (G === "modal" && H)
        return document.addEventListener("keydown", L), () => document.removeEventListener("keydown", L);
    }, [G, H, Z]);
    const {
      messages: Fe,
      setMessages: Ne,
      // Streaming state now comes from Zustand (see above)
      // isStreaming, setIsStreaming, isThinking, setIsThinking,
      // streamingContent, isHandlingTool, currentAssistantMessageIdRef,
      currentAssistantMessageIdRef: Ft,
      getReasoningStatus: Ct,
      getReasoningDuration: gt,
      getReasoningContentOnly: Vt,
      getReasoningTitle: Zt,
      getToolingTitle: Cn,
      getToolingStatus: _n,
      handleSetMessage: rr,
      handleReasoningUpdate: vn,
      handleChatFinished: Wt,
      handleChatError: N,
      stopGeneration: A,
      clearResponseError: ee
    } = R, xe = fe(null), Se = fe(null), Ge = fe(!1), Nt = fe(null), at = de(
      (L) => {
        L.status !== "streaming" && (ee(), Ne((Ae) => {
          const qe = Ae.findIndex(
            ($e) => {
              var Y;
              return ((Y = $e.uiComponent) == null ? void 0 : Y.callId) === L.callId;
            }
          ), We = {
            id: qe >= 0 ? Ae[qe].id : L.callId,
            role: "ui-component",
            content: "",
            timestamp: qe >= 0 ? Ae[qe].timestamp : /* @__PURE__ */ new Date(),
            uiComponent: {
              name: L.componentName,
              props: L.props,
              callId: L.callId,
              status: L.status
            }
          };
          if (qe >= 0) {
            const $e = [...Ae];
            return $e[qe] = We, $e;
          }
          return [...Ae, We];
        }));
      },
      [Ne, ee]
    ), At = de(
      (L) => {
        V(L.providerResId), x(L.threadId);
      },
      [V, x]
    ), nt = de(
      (L) => {
        var Ae, qe;
        switch (L.type) {
          case Ot.CHAT_COMPLETED:
            (Ae = L.data) != null && Ae.conversationId && V(L.data.conversationId), Wt(), q(Be.IDLE), re(St.IDLE), setTimeout(() => {
              var We;
              (We = Se.current) == null || We.focus();
            }, 0);
            break;
          case Ot.CHAT_ERROR:
            (qe = L.data) != null && qe.error && N(L.data.error);
            break;
          case Ot.CONNECTION_LOST:
            break;
          case Ot.CONNECTION_RESTORED:
            break;
          case Ot.RECONNECTING:
            break;
        }
      },
      [
        Wt,
        N,
        V,
        x
      ]
    ), {
      chatClient: Ce,
      connectionState: et,
      // reconnectAttempts: reconnectAttempt,
      isInitialConnection: st,
      connectChatClient: un
    } = Cf({
      // Authentication and server properties
      userMpAuthToken: u,
      chatServerUrl: e,
      chatServerKey: n,
      // Entity configuration
      entityId: d,
      entityType: h,
      // Tools configuration
      tools: s,
      // Generative-UI components
      componentSchemas: S,
      // Other properties
      contextHelpers: l,
      onSetMessage: rr,
      onSystemEvent: nt,
      onReasoningUpdate: vn,
      onUIComponent: at,
      onThreadCreated: At,
      onMessagesPersisted: a.onMessagesPersisted,
      onError: a.onError
    });
    Pe(() => {
      Nt.current = Ce;
    }, [Ce]), fg({
      metadata: r,
      chatClient: Ce,
      currentProviderResId: X,
      isLoadingConversation: ge,
      messages: Fe,
      entityId: d,
      entityType: h
    }), Pe(() => {
      D && P && _.current ? un().catch((L) => {
        const Ae = Yn(
          L,
          "NetworkReconnection"
        );
        _.current = Ae.isRetryable, Ae.isRetryable || console.warn(
          `[ChatWrapper] Network reconnection failed with non-retryable error: ${Ae.reason}`
        );
      }) : D && P && !_.current && console.warn(
        "[ChatWrapper] Network restored but last error was non-retryable (CORS/auth), skipping reconnection"
      );
    }, [P, D, un]);
    const Sn = de(() => {
      A(), q(Be.IDLE), re(St.IDLE), Ce && X && Ce.stopRun(X);
    }, [
      A,
      q,
      re,
      Ce,
      X
    ]);
    _l(
      c,
      () => ({
        updateMetadata: (L) => {
          Ce && X && Ce.updateMetadata(X, L).catch((Ae) => {
          });
        }
      }),
      [Ce, X]
    );
    const dn = Ue(
      () => Ce ? new mg(Ce, {
        onError: a.onError
      }) : null,
      [Ce, a.onError]
    ), {
      resetConversationLoader: Ni
      /*, reloadConversation*/
    } = hg({
      entityId: d,
      entityType: h,
      httpApiUrl: f,
      userMpAuthToken: u,
      chatServerKey: n,
      messages: Fe,
      setMessages: Ne,
      setIsLoadingConversation: w,
      setConversationError: j,
      setCurrentThreadId: x,
      setProviderResId: V,
      metadata: r,
      isConnected: et === Je.CONNECTED,
      // Only load after connection established
      onConversationInitialized: a.onConversationInitialized ? () => {
        var L;
        Ge.current = !0, (L = a.onConversationInitialized) == null || L.call(a);
      } : void 0
    }), It = fe(null), Ln = de(() => {
      It.current && cancelAnimationFrame(It.current), It.current = requestAnimationFrame(() => {
        var L;
        (L = xe.current) == null || L.scrollIntoView({ behavior: "smooth" }), It.current = null;
      });
    }, []);
    Pe(() => {
      Ln();
    }, [Fe, Ln]), Pe(() => {
      Me && Ln();
    }, [Me, Ln]), Pe(() => {
      a.onStreamingStatusChange && a.onStreamingStatusChange(ce);
    }, [ce, a]), Pe(() => () => {
      It.current && cancelAnimationFrame(It.current);
    }, []), Pe(() => () => {
      Ne([]), he(!1), _e(!1), ve(""), He(!1), q(Be.IDLE), re(St.IDLE), w(!1), j(null), x(null), V(null);
    }, [
      Ne,
      he,
      _e,
      ve,
      He,
      q,
      re,
      w,
      j,
      x,
      V
    ]);
    const ir = de(
      async (L, Ae) => {
        if (!L.trim() || ue || !dn || !Ce)
          return;
        he(!0), _e(!0), q(Be.SUBMITTED), re(St.STARTING);
        const qe = dn.createUserMessage(
          L,
          Ae
        );
        if (Ne(($e) => [...$e, qe]), a.onConversationInitialized && !Ge.current && (Ge.current = !0, a.onConversationInitialized()), !navigator.onLine) {
          _e(!1), q(Be.ERROR), Ne(
            ($e) => $e.map(
              (Y) => Y.id === qe.id ? {
                ...Y,
                hasError: !0,
                isRetrying: !1,
                errorMessage: "No internet connection. Please check your network and try again."
              } : Y
            )
          ), he(!1), q(Be.IDLE), re(St.IDLE);
          return;
        }
        try {
          const $e = new Promise((C, z) => {
            setTimeout(() => z(new Error("Message send timeout - connection may be lost")), 5e3);
          });
          await Promise.race([
            Ce.onTriggerMessage({
              message: qe.content,
              media: Ae,
              providerResId: X || void 0,
              mcpHeaders: i
            }),
            $e
          ]), q(Be.STREAMING);
          const Y = setTimeout(() => {
            _e(!1), q(Be.ERROR), Ne(
              (C) => C.map(
                (z) => z.id === qe.id ? {
                  ...z,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : z
              )
            ), he(!1), q(Be.IDLE), re(St.IDLE);
          }, 12e4);
          window.responseTimeoutId = Y;
        } catch ($e) {
          _e(!1), q(Be.ERROR), Ne(
            (Y) => Y.map(
              (C) => C.id === qe.id ? {
                ...C,
                hasError: !0,
                isRetrying: !1,
                // Explicitly ensure not in retrying state
                errorMessage: et !== Je.CONNECTED ? "Connection lost. Message not sent." : $e instanceof Error ? $e.message : "Failed to send message. Please try again."
              } : C
            )
          ), he(!1), q(Be.IDLE), re(St.IDLE);
        }
      },
      [
        dn,
        Ce,
        ue,
        et,
        Ne,
        he,
        _e,
        q,
        re,
        X
      ]
    ), Ke = de(
      async (L) => await y.uploadFiles(L),
      [y]
    ), hn = Ue(
      () => Yt.css.getContainerClasses(
        G,
        a.position,
        a.theme,
        U,
        a.constrainedHeight
      ),
      [
        G,
        a.position,
        a.theme,
        U,
        a.constrainedHeight
      ]
    ), Ai = de(() => {
      G === "modal" ? J() : I();
    }, [G, J, I]), ar = de(
      (L) => {
        Se.current && Se.current.setText(L.description);
      },
      []
    ), Pn = Ue(
      () => ({
        messages: Fe,
        isStreaming: ue,
        isThinking: le,
        isHandlingTool: be
      }),
      [Fe, ue, le, be]
    ), sr = Ue(
      () => ({
        isLoadingConversation: ge,
        chatStatus: F,
        conversationError: $,
        isOffline: !P,
        connectionState: et,
        isInitialConnection: st
      }),
      [
        ge,
        F,
        $,
        P,
        et,
        st
      ]
    ), or = Ue(
      () => {
        var L, Ae, qe, We;
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
          clientTools: b,
          generativeRegistry: k,
          fileUploadEnabled: (L = a.features) == null ? void 0 : L.fileUpload,
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
        (cr = a.features) == null ? void 0 : cr.fileUpload,
        a.fileUploadConfig,
        b,
        k
      ]
    ), Dr = Ue(
      () => ({
        getReasoningTitle: Zt,
        getReasoningStatus: Ct,
        getReasoningDuration: gt,
        getReasoningContentOnly: Vt,
        getToolingTitle: Cn,
        getToolingStatus: _n
      }),
      [
        Zt,
        Ct,
        gt,
        Vt,
        Cn,
        _n
      ]
    ), _t = de(
      async (L) => {
        const Ae = Fe.find((We) => We.id === L);
        if (!Ae)
          return;
        if (he(!0), _e(!0), q(Be.SUBMITTED), re(St.STARTING), Ne((We) => We.map(
          ($e) => $e.id === L ? {
            ...$e,
            hasError: !1,
            isRetrying: !0,
            errorMessage: void 0
          } : $e
        )), !navigator.onLine) {
          _e(!1), he(!1), q(Be.ERROR), Ne(
            (We) => We.map(
              ($e) => $e.id === L ? {
                ...$e,
                isRetrying: !1,
                hasError: !0,
                errorMessage: "Still no internet connection. Please check your network and try again."
              } : $e
            )
          ), q(Be.IDLE), re(St.IDLE);
          return;
        }
        try {
          et !== Je.CONNECTED && await un(), await (Ce == null ? void 0 : Ce.onTriggerMessage({
            message: Ae.content,
            media: Ae.media,
            providerResId: X || void 0,
            mcpHeaders: i
          })), q(Be.STREAMING);
          const We = setTimeout(() => {
            _e(!1), q(Be.ERROR), Ne(
              ($e) => $e.map(
                (Y) => Y.id === L ? {
                  ...Y,
                  hasError: !0,
                  isRetrying: !1,
                  errorMessage: "No response received. Connection may be lost."
                } : Y
              )
            ), he(!1), q(Be.IDLE), re(St.IDLE);
          }, 12e4);
          window.responseTimeoutId = We;
        } catch (We) {
          _e(!1), he(!1), q(Be.ERROR), re(St.IDLE), Ne(
            ($e) => $e.map(
              (Y) => Y.id === L ? {
                ...Y,
                isRetrying: !1,
                hasError: !0,
                errorMessage: We instanceof Error ? We.message : "Retry failed. Please try again."
              } : Y
            )
          ), q(Be.IDLE);
        }
      },
      [
        Fe,
        Ne,
        Ni,
        un,
        ir
      ]
    ), Gt = de(async () => {
      try {
        await un();
      } catch (L) {
        console.error("Failed to reconnect:", L);
      }
    }, [un]), lr = Ue(
      () => ({
        onSubmit: ir,
        onFileUpload: Ke,
        onStopGeneration: Sn,
        onPromptSelect: ar,
        onRetryMessage: _t,
        onRetryConnection: Gt
      }),
      [
        ir,
        Ke,
        Sn,
        ar,
        _t,
        Gt
      ]
    ), Fr = Ue(
      () => ({
        ...Pn,
        ...sr,
        ...or,
        ...Dr,
        ...lr,
        currentAssistantMessageIdRef: Ft,
        messagesEndRef: xe,
        chatInputRef: Se
      }),
      [
        Pn,
        sr,
        or,
        Dr,
        lr,
        Ft,
        xe,
        Se
      ]
    );
    return Ue(
      () => Yt.state.shouldShowBubble(
        G,
        H,
        U
      ),
      [G, H, U]
    ) ? /* @__PURE__ */ p(Ro, { children: /* @__PURE__ */ p(
      Tg,
      {
        mode: G,
        headerName: a.headerName,
        bubbleText: a.bubbleText,
        showBubbleText: ((Mt = a.features) == null ? void 0 : Mt.showBubbleText) !== !1,
        onClick: Ai
      }
    ) }) : /* @__PURE__ */ p(Ro, { children: /* @__PURE__ */ p(
      wg,
      {
        onError: (L) => {
          a.onError && a.onError(L);
        },
        children: /* @__PURE__ */ M("div", { className: hn, style: a.customStyles, children: [
          /* @__PURE__ */ p(
            Gx,
            {
              isVisible: !P,
              isReconnecting: et === Je.RECONNECTING
            }
          ),
          Yt.state.shouldShowHeader(a.headerVisible) && /* @__PURE__ */ p(
            Eg,
            {
              headerName: a.headerName,
              mode: G,
              isCollapsed: U,
              isModalOpen: H,
              onClose: Z,
              onToggleFullscreen: E,
              onToggleCollapse: I
            }
          ),
          !U && /* @__PURE__ */ p(
            bg,
            {
              onError: (L) => {
                a.onError && a.onError(L);
              },
              children: /* @__PURE__ */ p(Td, { value: Fr, children: /* @__PURE__ */ p(Wx, {}) })
            }
          )
        ] })
      }
    ) });
  }
);
su.displayName = "ChatWrapperInner";
const ou = Mr(
  (t, e) => {
    const { auth: n, chatServerUrl: r, chatServerKey: i, contextHelpers: a } = t, s = (a == null ? void 0 : a.locale) || "en";
    return /* @__PURE__ */ p(
      sg,
      {
        locale: s,
        chatServerUrl: r,
        chatServerKey: i,
        mpAuthToken: n.token,
        children: /* @__PURE__ */ p(su, { ref: e, ...t })
      }
    );
  }
);
ou.displayName = "ChatWrapperContainer";
const g9 = _i(ou);
function m9({
  isConnected: t,
  isConnecting: e = !1,
  isReconnecting: n = !1,
  reconnectAttempt: r = 0,
  maxReconnectAttempts: i = 1 / 0,
  onRetry: a,
  autoHideDuration: s = 3e3
}) {
  const [o, l] = Te("hidden"), [c, u] = Te(!1);
  if (Pe(() => {
    e ? l("connecting") : !t && !n ? (u(!0), i !== 1 / 0 && r >= i ? l("error") : l("hidden")) : n ? l("reconnecting") : t && c ? (l("hidden"), u(!1)) : t && !c && l("hidden");
  }, [t, e, n, r, i, c, s]), o === "hidden")
    return null;
  const d = () => {
    a && a();
  }, f = (() => {
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
  return f ? o === "connecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ M("div", { className: "connection-notification__bubbles", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" }),
    /* @__PURE__ */ p("div", { className: "connection-notification__bubble" })
  ] }) }) : o === "reconnecting" ? /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--banner connection-notification--${o}`, children: /* @__PURE__ */ M("div", { className: "connection-notification__banner-content", children: [
    /* @__PURE__ */ p("span", { className: "connection-notification__banner-spinner" }),
    /* @__PURE__ */ M("span", { className: "connection-notification__banner-text", children: [
      "Reconnecting... (attempt ",
      r,
      ")"
    ] })
  ] }) }) : /* @__PURE__ */ p("div", { className: `connection-notification connection-notification--${o}`, children: /* @__PURE__ */ M("div", { className: "connection-notification__content", children: [
    /* @__PURE__ */ p("div", { className: "connection-notification__icon", children: f.icon }),
    /* @__PURE__ */ p("div", { className: "connection-notification__title", children: f.title }),
    /* @__PURE__ */ p("div", { className: "connection-notification__message", children: f.message }),
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
  zx as AnimatedPlaceholder,
  Be as CHAT_STATUS,
  kg as ChatIcon,
  Vx as ChatSkeleton,
  g9 as ChatWrapper,
  Cg as CloseIcon,
  vg as CollapseIcon,
  Sd as ComponentRegistry,
  Zx as ConnectionError,
  m9 as ConnectionNotification,
  Sg as CopyIcon,
  hu as EntityType,
  _g as FullscreenIcon,
  Jc as GenerativeComponentRenderer,
  Bx as InlineLoader,
  $x as Loader,
  lt as PROCESSING_STATUS,
  Ox as PromptInput,
  Dx as PromptInputButton,
  u9 as PromptInputModelSelect,
  h9 as PromptInputModelSelectContent,
  f9 as PromptInputModelSelectItem,
  d9 as PromptInputModelSelectTrigger,
  p9 as PromptInputModelSelectValue,
  Fx as PromptInputSubmit,
  au as PromptInputTextarea,
  Lx as PromptInputToolbar,
  Px as PromptInputTools,
  vx as Reasoning,
  Yc as ReasoningContent,
  Xc as ReasoningTrigger,
  St as STREAMING_STATUS,
  c9 as SettingsIcon,
  Ux as SuggestedPrompts,
  sg as TranslationProvider,
  Qc as UnknownComponentFallback,
  xf as fetchThreadMessages,
  oc as fetchTranslations,
  sa as isChatActive,
  Qx as isChatError,
  Jx as isChatIdle,
  e9 as isProcessingActive,
  t9 as isProcessingComplete,
  n9 as isProcessingError,
  wf as updateThread,
  bf as updateThreadMetadata,
  Nd as useChatActions,
  i9 as useChatState,
  a9 as useConversationState,
  Rd as useGenerativeRender,
  o9 as useI18next,
  r9 as useLayoutState,
  s9 as useThreadState,
  bn as useTranslations,
  l9 as useUIState,
  me as useUIStore
};
