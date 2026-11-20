var Ic = { exports: {} }, Kl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qg;
function ab() {
  if (Qg) return Kl;
  Qg = 1;
  var a = Symbol.for("react.transitional.element"), l = Symbol.for("react.fragment");
  function r(o, c, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), c.key !== void 0 && (h = "" + c.key), "key" in c) {
      d = {};
      for (var y in c)
        y !== "key" && (d[y] = c[y]);
    } else d = c;
    return c = d.ref, {
      $$typeof: a,
      type: o,
      key: h,
      ref: c !== void 0 ? c : null,
      props: d
    };
  }
  return Kl.Fragment = l, Kl.jsx = r, Kl.jsxs = r, Kl;
}
var Zg;
function lb() {
  return Zg || (Zg = 1, Ic.exports = ab()), Ic.exports;
}
var Yt = lb(), $c = { exports: {} }, Jl = {}, tf = { exports: {} }, ef = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kg;
function ub() {
  return Kg || (Kg = 1, (function(a) {
    function l(L, it) {
      var K = L.length;
      L.push(it);
      t: for (; 0 < K; ) {
        var ot = K - 1 >>> 1, ft = L[ot];
        if (0 < c(ft, it))
          L[ot] = it, L[K] = ft, K = ot;
        else break t;
      }
    }
    function r(L) {
      return L.length === 0 ? null : L[0];
    }
    function o(L) {
      if (L.length === 0) return null;
      var it = L[0], K = L.pop();
      if (K !== it) {
        L[0] = K;
        t: for (var ot = 0, ft = L.length, $t = ft >>> 1; ot < $t; ) {
          var ke = 2 * (ot + 1) - 1, Ei = L[ke], A = ke + 1, B = L[A];
          if (0 > c(Ei, K))
            A < ft && 0 > c(B, Ei) ? (L[ot] = B, L[A] = K, ot = A) : (L[ot] = Ei, L[ke] = K, ot = ke);
          else if (A < ft && 0 > c(B, K))
            L[ot] = B, L[A] = K, ot = A;
          else break t;
        }
      }
      return it;
    }
    function c(L, it) {
      var K = L.sortIndex - it.sortIndex;
      return K !== 0 ? K : L.id - it.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, y = h.now();
      a.unstable_now = function() {
        return h.now() - y;
      };
    }
    var p = [], S = [], v = 1, g = null, b = 3, z = !1, N = !1, w = !1, U = !1, H = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, G = typeof setImmediate < "u" ? setImmediate : null;
    function X(L) {
      for (var it = r(S); it !== null; ) {
        if (it.callback === null) o(S);
        else if (it.startTime <= L)
          o(S), it.sortIndex = it.expirationTime, l(p, it);
        else break;
        it = r(S);
      }
    }
    function et(L) {
      if (w = !1, X(L), !N)
        if (r(p) !== null)
          N = !0, ct || (ct = !0, zt());
        else {
          var it = r(S);
          it !== null && Rt(et, it.startTime - L);
        }
    }
    var ct = !1, Z = -1, q = 5, Ot = -1;
    function W() {
      return U ? !0 : !(a.unstable_now() - Ot < q);
    }
    function vt() {
      if (U = !1, ct) {
        var L = a.unstable_now();
        Ot = L;
        var it = !0;
        try {
          t: {
            N = !1, w && (w = !1, j(Z), Z = -1), z = !0;
            var K = b;
            try {
              e: {
                for (X(L), g = r(p); g !== null && !(g.expirationTime > L && W()); ) {
                  var ot = g.callback;
                  if (typeof ot == "function") {
                    g.callback = null, b = g.priorityLevel;
                    var ft = ot(
                      g.expirationTime <= L
                    );
                    if (L = a.unstable_now(), typeof ft == "function") {
                      g.callback = ft, X(L), it = !0;
                      break e;
                    }
                    g === r(p) && o(p), X(L);
                  } else o(p);
                  g = r(p);
                }
                if (g !== null) it = !0;
                else {
                  var $t = r(S);
                  $t !== null && Rt(
                    et,
                    $t.startTime - L
                  ), it = !1;
                }
              }
              break t;
            } finally {
              g = null, b = K, z = !1;
            }
            it = void 0;
          }
        } finally {
          it ? zt() : ct = !1;
        }
      }
    }
    var zt;
    if (typeof G == "function")
      zt = function() {
        G(vt);
      };
    else if (typeof MessageChannel < "u") {
      var de = new MessageChannel(), It = de.port2;
      de.port1.onmessage = vt, zt = function() {
        It.postMessage(null);
      };
    } else
      zt = function() {
        H(vt, 0);
      };
    function Rt(L, it) {
      Z = H(function() {
        L(a.unstable_now());
      }, it);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, a.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : q = 0 < L ? Math.floor(1e3 / L) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(L) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var it = 3;
          break;
        default:
          it = b;
      }
      var K = b;
      b = it;
      try {
        return L();
      } finally {
        b = K;
      }
    }, a.unstable_requestPaint = function() {
      U = !0;
    }, a.unstable_runWithPriority = function(L, it) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var K = b;
      b = L;
      try {
        return it();
      } finally {
        b = K;
      }
    }, a.unstable_scheduleCallback = function(L, it, K) {
      var ot = a.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ot + K : ot) : K = ot, L) {
        case 1:
          var ft = -1;
          break;
        case 2:
          ft = 250;
          break;
        case 5:
          ft = 1073741823;
          break;
        case 4:
          ft = 1e4;
          break;
        default:
          ft = 5e3;
      }
      return ft = K + ft, L = {
        id: v++,
        callback: it,
        priorityLevel: L,
        startTime: K,
        expirationTime: ft,
        sortIndex: -1
      }, K > ot ? (L.sortIndex = K, l(S, L), r(p) === null && L === r(S) && (w ? (j(Z), Z = -1) : w = !0, Rt(et, K - ot))) : (L.sortIndex = ft, l(p, L), N || z || (N = !0, ct || (ct = !0, zt()))), L;
    }, a.unstable_shouldYield = W, a.unstable_wrapCallback = function(L) {
      var it = b;
      return function() {
        var K = b;
        b = it;
        try {
          return L.apply(this, arguments);
        } finally {
          b = K;
        }
      };
    };
  })(ef)), ef;
}
var Jg;
function sb() {
  return Jg || (Jg = 1, tf.exports = ub()), tf.exports;
}
var nf = { exports: {} }, lt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fg;
function ob() {
  if (Fg) return lt;
  Fg = 1;
  var a = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), h = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), b = Symbol.for("react.view_transition"), z = Symbol.iterator;
  function N(A) {
    return A === null || typeof A != "object" ? null : (A = z && A[z] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, U = Object.assign, H = {};
  function j(A, B, $) {
    this.props = A, this.context = B, this.refs = H, this.updater = $ || w;
  }
  j.prototype.isReactComponent = {}, j.prototype.setState = function(A, B) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, B, "setState");
  }, j.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function G() {
  }
  G.prototype = j.prototype;
  function X(A, B, $) {
    this.props = A, this.context = B, this.refs = H, this.updater = $ || w;
  }
  var et = X.prototype = new G();
  et.constructor = X, U(et, j.prototype), et.isPureReactComponent = !0;
  var ct = Array.isArray;
  function Z() {
  }
  var q = { H: null, A: null, T: null, S: null }, Ot = Object.prototype.hasOwnProperty;
  function W(A, B, $) {
    var tt = $.ref;
    return {
      $$typeof: a,
      type: A,
      key: B,
      ref: tt !== void 0 ? tt : null,
      props: $
    };
  }
  function vt(A, B) {
    return W(A.type, B, A.props);
  }
  function zt(A) {
    return typeof A == "object" && A !== null && A.$$typeof === a;
  }
  function de(A) {
    var B = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function($) {
      return B[$];
    });
  }
  var It = /\/+/g;
  function Rt(A, B) {
    return typeof A == "object" && A !== null && A.key != null ? de("" + A.key) : B.toString(36);
  }
  function L(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(Z, Z) : (A.status = "pending", A.then(
          function(B) {
            A.status === "pending" && (A.status = "fulfilled", A.value = B);
          },
          function(B) {
            A.status === "pending" && (A.status = "rejected", A.reason = B);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function it(A, B, $, tt, pt) {
    var St = typeof A;
    (St === "undefined" || St === "boolean") && (A = null);
    var bt = !1;
    if (A === null) bt = !0;
    else
      switch (St) {
        case "bigint":
        case "string":
        case "number":
          bt = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case a:
            case l:
              bt = !0;
              break;
            case v:
              return bt = A._init, it(
                bt(A._payload),
                B,
                $,
                tt,
                pt
              );
          }
      }
    if (bt)
      return pt = pt(A), bt = tt === "" ? "." + Rt(A, 0) : tt, ct(pt) ? ($ = "", bt != null && ($ = bt.replace(It, "$&/") + "/"), it(pt, B, $, "", function(Mn) {
        return Mn;
      })) : pt != null && (zt(pt) && (pt = vt(
        pt,
        $ + (pt.key == null || A && A.key === pt.key ? "" : ("" + pt.key).replace(
          It,
          "$&/"
        ) + "/") + bt
      )), B.push(pt)), 1;
    bt = 0;
    var P = tt === "" ? "." : tt + ":";
    if (ct(A))
      for (var at = 0; at < A.length; at++)
        tt = A[at], St = P + Rt(tt, at), bt += it(
          tt,
          B,
          $,
          St,
          pt
        );
    else if (at = N(A), typeof at == "function")
      for (A = at.call(A), at = 0; !(tt = A.next()).done; )
        tt = tt.value, St = P + Rt(tt, at++), bt += it(
          tt,
          B,
          $,
          St,
          pt
        );
    else if (St === "object") {
      if (typeof A.then == "function")
        return it(
          L(A),
          B,
          $,
          tt,
          pt
        );
      throw B = String(A), Error(
        "Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bt;
  }
  function K(A, B, $) {
    if (A == null) return A;
    var tt = [], pt = 0;
    return it(A, tt, "", "", function(St) {
      return B.call($, St, pt++);
    }), tt;
  }
  function ot(A) {
    if (A._status === -1) {
      var B = A._result, $ = B();
      $.then(
        function(tt) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = tt, $.status === void 0 && ($.status = "fulfilled", $.value = tt));
        },
        function(tt) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = tt, $.status === void 0 && ($.status = "rejected", $.reason = tt));
        }
      ), A._status === -1 && (A._status = 0, A._result = $);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var ft = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var B = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(B)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  };
  function $t(A) {
    var B = q.T, $ = {};
    $.types = B !== null ? B.types : null, q.T = $;
    try {
      var tt = A(), pt = q.S;
      pt !== null && pt($, tt), typeof tt == "object" && tt !== null && typeof tt.then == "function" && tt.then(Z, ft);
    } catch (St) {
      ft(St);
    } finally {
      B !== null && $.types !== null && (B.types = $.types), q.T = B;
    }
  }
  function ke(A) {
    var B = q.T;
    if (B !== null) {
      var $ = B.types;
      $ === null ? B.types = [A] : $.indexOf(A) === -1 && $.push(A);
    } else $t(ke.bind(null, A));
  }
  var Ei = {
    map: K,
    forEach: function(A, B, $) {
      K(
        A,
        function() {
          B.apply(this, arguments);
        },
        $
      );
    },
    count: function(A) {
      var B = 0;
      return K(A, function() {
        B++;
      }), B;
    },
    toArray: function(A) {
      return K(A, function(B) {
        return B;
      }) || [];
    },
    only: function(A) {
      if (!zt(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return lt.Activity = g, lt.Children = Ei, lt.Component = j, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = X, lt.StrictMode = o, lt.Suspense = p, lt.ViewTransition = b, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return q.H.useMemoCache(A);
    }
  }, lt.addTransitionType = ke, lt.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(A, B, $) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var tt = U({}, A.props), pt = A.key;
    if (B != null)
      for (St in B.key !== void 0 && (pt = "" + B.key), B)
        !Ot.call(B, St) || St === "key" || St === "__self" || St === "__source" || St === "ref" && B.ref === void 0 || (tt[St] = B[St]);
    var St = arguments.length - 2;
    if (St === 1) tt.children = $;
    else if (1 < St) {
      for (var bt = Array(St), P = 0; P < St; P++)
        bt[P] = arguments[P + 2];
      tt.children = bt;
    }
    return W(A.type, pt, tt);
  }, lt.createContext = function(A) {
    return A = {
      $$typeof: h,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: d,
      _context: A
    }, A;
  }, lt.createElement = function(A, B, $) {
    var tt, pt = {}, St = null;
    if (B != null)
      for (tt in B.key !== void 0 && (St = "" + B.key), B)
        Ot.call(B, tt) && tt !== "key" && tt !== "__self" && tt !== "__source" && (pt[tt] = B[tt]);
    var bt = arguments.length - 2;
    if (bt === 1) pt.children = $;
    else if (1 < bt) {
      for (var P = Array(bt), at = 0; at < bt; at++)
        P[at] = arguments[at + 2];
      pt.children = P;
    }
    if (A && A.defaultProps)
      for (tt in bt = A.defaultProps, bt)
        pt[tt] === void 0 && (pt[tt] = bt[tt]);
    return W(A, St, pt);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(A) {
    return { $$typeof: y, render: A };
  }, lt.isValidElement = zt, lt.lazy = function(A) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: A },
      _init: ot
    };
  }, lt.memo = function(A, B) {
    return {
      $$typeof: S,
      type: A,
      compare: B === void 0 ? null : B
    };
  }, lt.startTransition = $t, lt.unstable_useCacheRefresh = function() {
    return q.H.useCacheRefresh();
  }, lt.use = function(A) {
    return q.H.use(A);
  }, lt.useActionState = function(A, B, $) {
    return q.H.useActionState(A, B, $);
  }, lt.useCallback = function(A, B) {
    return q.H.useCallback(A, B);
  }, lt.useContext = function(A) {
    return q.H.useContext(A);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(A, B) {
    return q.H.useDeferredValue(A, B);
  }, lt.useEffect = function(A, B) {
    return q.H.useEffect(A, B);
  }, lt.useEffectEvent = function(A) {
    return q.H.useEffectEvent(A);
  }, lt.useId = function() {
    return q.H.useId();
  }, lt.useImperativeHandle = function(A, B, $) {
    return q.H.useImperativeHandle(A, B, $);
  }, lt.useInsertionEffect = function(A, B) {
    return q.H.useInsertionEffect(A, B);
  }, lt.useLayoutEffect = function(A, B) {
    return q.H.useLayoutEffect(A, B);
  }, lt.useMemo = function(A, B) {
    return q.H.useMemo(A, B);
  }, lt.useOptimistic = function(A, B) {
    return q.H.useOptimistic(A, B);
  }, lt.useReducer = function(A, B, $) {
    return q.H.useReducer(A, B, $);
  }, lt.useRef = function(A) {
    return q.H.useRef(A);
  }, lt.useState = function(A) {
    return q.H.useState(A);
  }, lt.useSyncExternalStore = function(A, B, $) {
    return q.H.useSyncExternalStore(
      A,
      B,
      $
    );
  }, lt.useTransition = function() {
    return q.H.useTransition();
  }, lt.version = "19.3.1", lt;
}
var Pg;
function Jf() {
  return Pg || (Pg = 1, nf.exports = ob()), nf.exports;
}
var af = { exports: {} }, fe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kg;
function rb() {
  if (kg) return fe;
  kg = 1;
  var a = Jf();
  function l(v) {
    var g = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        g += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + v + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var o = {
    d: {
      f: r,
      r: function() {
        throw Error(l(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, c = Symbol.for("react.portal"), d = Symbol.for("react.recoverable"), h = Symbol.for("react.optimistic_key");
  function y(v, g, b) {
    var z = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: z == null ? null : z === h ? h : "" + z,
      children: v,
      containerInfo: g,
      implementation: b
    };
  }
  var p = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function S(v, g) {
    if (v === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, fe.browser = function(v) {
    return { $$typeof: d, _reason: v };
  }, fe.createPortal = function(v, g) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(l(299));
    return y(v, g, null, b);
  }, fe.flushSync = function(v) {
    var g = p.T, b = o.p;
    try {
      if (p.T = null, o.p = 2, v) return v();
    } finally {
      p.T = g, o.p = b, o.d.f();
    }
  }, fe.preconnect = function(v, g) {
    typeof v == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(v, g));
  }, fe.prefetchDNS = function(v) {
    typeof v == "string" && o.d.D(v);
  }, fe.preinit = function(v, g) {
    if (typeof v == "string" && g && typeof g.as == "string") {
      var b = g.as, z = S(b, g.crossOrigin), N = typeof g.integrity == "string" ? g.integrity : void 0, w = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      b === "style" ? o.d.S(
        v,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: z,
          integrity: N,
          fetchPriority: w
        }
      ) : b === "script" && o.d.X(v, {
        crossOrigin: z,
        integrity: N,
        fetchPriority: w,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, fe.preinitModule = function(v, g) {
    if (typeof v == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var b = S(
            g.as,
            g.crossOrigin
          );
          o.d.M(v, {
            crossOrigin: b,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && o.d.M(v);
  }, fe.preload = function(v, g) {
    if (typeof v == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var b = g.as, z = S(b, g.crossOrigin);
      o.d.L(v, b, {
        crossOrigin: z,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, fe.preloadModule = function(v, g) {
    if (typeof v == "string")
      if (g) {
        var b = S(g.as, g.crossOrigin);
        o.d.m(v, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: b,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else o.d.m(v);
  }, fe.requestFormReset = function(v) {
    o.d.r(v);
  }, fe.unstable_batchedUpdates = function(v, g) {
    return v(g);
  }, fe.useFormState = function(v, g, b) {
    return p.H.useFormState(v, g, b);
  }, fe.useFormStatus = function() {
    return p.H.useHostTransitionStatus();
  }, fe.version = "19.3.1", fe;
}
var Wg;
function cb() {
  if (Wg) return af.exports;
  Wg = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), af.exports = rb(), af.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ig;
function fb() {
  if (Ig) return Jl;
  Ig = 1;
  var a = sb(), l = Jf(), r = cb();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    for (var e = t, n = e; n && !n.alternate; )
      e = n, (e.flags & 4098) !== 0 && (t = e.return), n = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function y(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (d(t) !== t)
      throw Error(o(188));
  }
  function S(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var u = n.return;
      if (u === null) break;
      var s = u.alternate;
      if (s === null) {
        if (i = u.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (u.child === s.child) {
        for (s = u.child; s; ) {
          if (s === n) return p(u), t;
          if (s === i) return p(u), e;
          s = s.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== i.return) n = u, i = s;
      else {
        for (var f = !1, m = u.child; m; ) {
          if (m === n) {
            f = !0, n = u, i = s;
            break;
          }
          if (m === i) {
            f = !0, i = u, n = s;
            break;
          }
          m = m.sibling;
        }
        if (!f) {
          for (m = s.child; m; ) {
            if (m === n) {
              f = !0, n = s, i = u;
              break;
            }
            if (m === i) {
              f = !0, i = s, n = u;
              break;
            }
            m = m.sibling;
          }
          if (!f) throw Error(o(189));
        }
      }
      if (n.alternate !== i) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? t : e;
  }
  function v(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = v(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function g(t, e, n, i, u, s) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, i, u, s) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && g(
        t.child,
        e,
        n,
        i,
        u,
        s
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function b(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function z(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function N(t) {
    var e = [null, null], n = b(t);
    return n === null || w(
      e,
      t,
      n.child,
      { foundSelf: !1 }
    ), e;
  }
  function w(t, e, n, i) {
    for (; n !== null; ) {
      if (n === e) i.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (i.foundSelf) return t[1] = n, !0;
        t[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && w(
        t,
        e,
        n.child,
        i
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function U(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(o(559));
    }
  }
  var H = null, j = null;
  function G(t, e, n) {
    return t === n ? !0 : t === e ? (H = t, !0) : !1;
  }
  function X(t, e, n) {
    return t === n ? (j = t, !1) : t === e ? (j !== null && (H = t), !0) : !1;
  }
  function et(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function ct(t, e, n) {
    for (var i = 0, u = t; u; u = n(u)) i++;
    u = 0;
    for (var s = e; s; s = n(s)) u++;
    for (; 0 < i - u; ) t = n(t), i--;
    for (; 0 < u - i; ) e = n(e), u--;
    for (; i--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var Z = Object.assign, q = Symbol.for("react.element"), Ot = Symbol.for("react.transitional.element"), W = Symbol.for("react.portal"), vt = Symbol.for("react.fragment"), zt = Symbol.for("react.strict_mode"), de = Symbol.for("react.profiler"), It = Symbol.for("react.consumer"), Rt = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), it = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), ot = Symbol.for("react.memo"), ft = Symbol.for("react.lazy"), $t = Symbol.for("react.activity"), ke = Symbol.for("react.legacy_hidden"), Ei = Symbol.for("react.memo_cache_sentinel"), A = Symbol.for("react.view_transition"), B = Symbol.for("react.recoverable"), $ = Symbol.iterator;
  function tt(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var pt = Symbol.for("react.client.reference");
  function St(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === pt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case vt:
        return "Fragment";
      case de:
        return "Profiler";
      case zt:
        return "StrictMode";
      case it:
        return "Suspense";
      case K:
        return "SuspenseList";
      case $t:
        return "Activity";
      case A:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case W:
          return "Portal";
        case Rt:
          return t.displayName || "Context";
        case It:
          return (t._context.displayName || "Context") + ".Consumer";
        case L:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case ot:
          return e = t.displayName || null, e !== null ? e : St(t.type) || "Memo";
        case ft:
          e = t._payload, t = t._init;
          try {
            return St(t(e));
          } catch {
          }
      }
    return null;
  }
  var bt = Array.isArray, P = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, at = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Mn = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, vo = [], $i = -1;
  function sn(t) {
    return { current: t };
  }
  function ae(t) {
    0 > $i || (t.current = vo[$i], vo[$i] = null, $i--);
  }
  function Ut(t, e) {
    $i++, vo[$i] = t.current, t.current = e;
  }
  var on = sn(null), Ia = sn(null), qn = sn(null), du = sn(null);
  function mu(t, e) {
    switch (Ut(qn, e), Ut(Ia, t), Ut(on, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? $y(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = $y(e), t = tg(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    ae(on), Ut(on, t);
  }
  function ta() {
    ae(on), ae(Ia), ae(qn);
  }
  function po(t) {
    var e = t.memoizedState;
    e !== null && (Ga._currentValue = e.memoizedState, Ut(du, t)), e = on.current;
    var n = tg(e, t.type);
    e !== n && (Ut(Ia, t), Ut(on, n));
  }
  function yu(t) {
    Ia.current === t && (ae(on), ae(Ia)), du.current === t && (ae(du), Ga._currentValue = Mn);
  }
  var So, Th;
  function Xn(t) {
    if (So === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        So = e && e[1] || "", Th = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + So + t + Th;
  }
  var To = !1;
  function bo(t, e) {
    if (!t || To) return "";
    To = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var V = function() {
                throw Error();
              };
              if (Object.defineProperty(V.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(V, []);
                } catch (Y) {
                  var M = Y;
                }
                Reflect.construct(t, [], V);
              } else {
                try {
                  V.call();
                } catch (Y) {
                  M = Y;
                }
                V = !1;
                try {
                  var O = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), V = !0, new t();
                } finally {
                  V && (O !== void 0 ? Object.defineProperty(t.prototype, "props", O) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                M = Y;
              }
              (V = t()) && typeof V.catch == "function" && V.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && M && typeof Y.stack == "string")
              return [Y.stack, M.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var s = i.DetermineComponentFrameRoot(), f = s[0], m = s[1];
      if (f && m) {
        var T = f.split(`
`), x = m.split(`
`);
        for (u = i = 0; i < T.length && !T[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; u < x.length && !x[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (i === T.length || u === x.length)
          for (i = T.length - 1, u = x.length - 1; 1 <= i && 0 <= u && T[i] !== x[u]; )
            u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (T[i] !== x[u]) {
            if (i !== 1 || u !== 1)
              do
                if (i--, u--, 0 > u || T[i] !== x[u]) {
                  var R = `
` + T[i].replace(" at new ", " at ");
                  return t.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", t.displayName)), R;
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      To = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Xn(n) : "";
  }
  function o1(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Xn(t.type);
      case 16:
        return Xn("Lazy");
      case 13:
        return t.child !== e && e !== null ? Xn("Suspense Fallback") : Xn("Suspense");
      case 19:
        return Xn("SuspenseList");
      case 0:
      case 15:
        return bo(t.type, !1);
      case 11:
        return bo(t.type.render, !1);
      case 1:
        return bo(t.type, !0);
      case 31:
        return Xn("Activity");
      case 30:
        return Xn("ViewTransition");
      default:
        return "";
    }
  }
  function bh(t) {
    try {
      var e = "", n = null;
      do
        e += o1(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Eo = Object.prototype.hasOwnProperty, Ao = a.unstable_scheduleCallback, Mo = a.unstable_cancelCallback, r1 = a.unstable_shouldYield, c1 = a.unstable_requestPaint, Oe = a.unstable_now, f1 = a.unstable_getCurrentPriorityLevel, Eh = a.unstable_ImmediatePriority, Ah = a.unstable_UserBlockingPriority, gu = a.unstable_NormalPriority, h1 = a.unstable_LowPriority, Mh = a.unstable_IdlePriority, d1 = a.log, m1 = a.unstable_setDisableYieldValue, $a = null, ze = null;
  function Qn(t) {
    if (typeof d1 == "function" && m1(t), ze && typeof ze.setStrictMode == "function")
      try {
        ze.setStrictMode($a, t);
      } catch {
      }
  }
  var Re = Math.clz32 ? Math.clz32 : v1, y1 = Math.log, g1 = Math.LN2;
  function v1(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (y1(t) / g1 | 0) | 0;
  }
  var vu = 256, pu = 262144, Su = 4194304;
  function Ai(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Tu(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var u = 0, s = t.suspendedLanes, f = t.pingedLanes;
    t = t.warmLanes;
    var m = i & 134217727;
    return m !== 0 ? (i = m & ~s, i !== 0 ? u = Ai(i) : (f &= m, f !== 0 ? u = Ai(f) : n || (n = m & ~t, n !== 0 && (u = Ai(n))))) : (m = i & ~s, m !== 0 ? u = Ai(m) : f !== 0 ? u = Ai(f) : n || (n = i & ~t, n !== 0 && (u = Ai(n)))), u === 0 ? 0 : e !== 0 && e !== u && (e & s) === 0 && (s = u & -u, n = e & -e, s >= n || s === 32 && (n & 4194048) !== 0) ? e : u;
  }
  function tl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Dh(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - Re(n), u = 1 << i;
        e |= t[i], n &= ~u;
      }
    return e;
  }
  function p1(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function xh() {
    var t = Su;
    return Su <<= 1, (Su & 62914560) === 0 && (Su = 4194304), t;
  }
  function Do(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function el(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function S1(t, e, n, i, u, s) {
    var f = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, T = t.expirationTimes, x = t.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var R = 31 - Re(n), V = 1 << R;
      m[R] = 0, T[R] = -1;
      var M = x[R];
      if (M !== null)
        for (x[R] = null, R = 0; R < M.length; R++) {
          var O = M[R];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~V;
    }
    i !== 0 && Ch(t, i, 0), s !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= s & ~(f & ~e));
  }
  function Ch(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var i = 31 - Re(e);
    t.entangledLanes |= e, t.entanglements[i] = t.entanglements[i] | 1073741824 | n & 261930;
  }
  function Oh(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var i = 31 - Re(n), u = 1 << i;
      u & e | t[i] & e && (t[i] |= e), n &= ~u;
    }
  }
  function zh(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : xo(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function xo(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Co(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Rh() {
    var t = at.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Hg(t.type));
  }
  function Nh(t, e) {
    var n = at.p;
    try {
      return at.p = t, e();
    } finally {
      at.p = n;
    }
  }
  var Dn = Math.random().toString(36).slice(2), le = "__reactFiber$" + Dn, be = "__reactProps$" + Dn, ea = "__reactContainer$" + Dn, _h = "__reactEvents$" + Dn, T1 = "__reactListeners$" + Dn, b1 = "__reactHandles$" + Dn, Vh = "__reactResources$" + Dn, nl = "__reactMarker$" + Dn, bu = "__reactLoad$" + Dn;
  function Eu(t) {
    delete t[le], delete t[be], delete t[T1], delete t[b1];
  }
  function Mi(t) {
    var e;
    if (e = t[le]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[ea] || n[le]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = vg(t); t !== null; ) {
            if (n = t[le]) return n;
            t = vg(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function na(t) {
    if (t = t[le] || t[ea]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function il(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function ia(t) {
    var e = t[Vh];
    return e || (e = t[Vh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function te(t) {
    t[nl] = !0;
  }
  function Uh(t) {
    t[bu] = void 0;
  }
  var wh = /* @__PURE__ */ new Set(), Bh = {};
  function Di(t, e) {
    aa(t, e), aa(t + "Capture", e);
  }
  function aa(t, e) {
    for (Bh[t] = e, t = 0; t < e.length; t++)
      wh.add(e[t]);
  }
  var E1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hh = {}, Lh = {};
  function A1(t) {
    return Eo.call(Lh, t) ? !0 : Eo.call(Hh, t) ? !1 : E1.test(t) ? Lh[t] = !0 : (Hh[t] = !0, !1);
  }
  var Tt = !1;
  function jh() {
    var t = Tt;
    return Tt = !1, t;
  }
  function Au(t, e, n) {
    if (A1(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var i = e.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function Mu(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, n);
    }
  }
  function xn(t, e, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, i);
    }
  }
  function Ne(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Yh(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function M1(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var u = i.get, s = i.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(f) {
          n = "" + f, s.call(this, f);
        }
      }), Object.defineProperty(t, e, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(f) {
          n = "" + f;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Oo(t) {
    if (!t._valueTracker) {
      var e = Yh(t) ? "checked" : "value";
      t._valueTracker = M1(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Gh(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), i = "";
    return t && (i = Yh(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
  }
  var D1 = /[\n"\\]/g;
  function je(t) {
    return t.replace(
      D1,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function zo(t, e, n, i, u, s, f, m) {
    t.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.type = f : t.removeAttribute("type"), e != null ? f === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ne(e)) : t.value !== "" + Ne(e) && (t.value = "" + Ne(e)) : f !== "submit" && f !== "reset" || t.removeAttribute("value"), e != null ? f === "number" && t.value == e ? Ro(t, Ne(t.value)) : Ro(t, Ne(e)) : n != null ? Ro(t, Ne(n)) : i != null && t.removeAttribute("value"), u == null && s != null && (t.defaultChecked = !!s), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + Ne(m) : t.removeAttribute("name");
  }
  function qh(t, e, n, i, u, s, f, m) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.type = s), e != null || n != null) {
      if (!(s !== "submit" && s !== "reset" || e != null)) {
        Oo(t);
        return;
      }
      n = n != null ? "" + Ne(n) : "", e = e != null ? "" + Ne(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    i = i ?? u, i = typeof i != "function" && typeof i != "symbol" && !!i, t.checked = m ? t.checked : !!i, t.defaultChecked = !!i, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.name = f), Oo(t);
  }
  function Ro(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function la(t, e, n, i) {
    if (t = t.options, e) {
      e = {};
      for (var u = 0; u < n.length; u++)
        e["$" + n[u]] = !0;
      for (n = 0; n < t.length; n++)
        u = e.hasOwnProperty("$" + t[n].value), t[n].selected !== u && (t[n].selected = u), u && i && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + Ne(n), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === n) {
          t[u].selected = !0, i && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Xh(t, e, n) {
    if (e != null && (e = "" + Ne(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Ne(n) : "";
  }
  function Qh(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(o(92));
        if (bt(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), e = n;
    }
    n = Ne(e), t.defaultValue = n, i = t.textContent, i === n && i !== "" && i !== null && (t.value = i), Oo(t);
  }
  function ua(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var x1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Zh(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : i ? t.setProperty(e, n) : typeof n != "number" || n === 0 || x1.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Kh(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(o(62));
    if (t = t.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || e != null && e.hasOwnProperty(i) || (i.indexOf("--") === 0 ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "", Tt = !0);
      for (var u in e)
        i = e[u], e.hasOwnProperty(u) && n[u] !== i && (Zh(t, u, i), Tt = !0);
    } else
      for (var s in e)
        e.hasOwnProperty(s) && Zh(t, s, e[s]);
  }
  function No(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var C1 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), O1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Du(t) {
    return O1.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function rn() {
  }
  var _o = null;
  function Vo(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var sa = null, oa = null;
  function Jh(t) {
    var e = na(t);
    if (e && (t = e.stateNode)) {
      var n = t[be] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (zo(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + je(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var u = i[be] || null;
                if (!u) throw Error(o(90));
                zo(
                  i,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              i = n[e], i.form === t.form && Gh(i);
          }
          break t;
        case "textarea":
          Xh(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && la(t, !!n.multiple, e, !1);
      }
    }
  }
  var Uo = !1;
  function Fh(t, e, n) {
    if (Uo) return t(e, n);
    Uo = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (Uo = !1, (sa !== null || oa !== null) && (Ds(), sa && (e = sa, t = oa, oa = sa = null, Jh(e), t)))
        for (e = 0; e < t.length; e++) Jh(t[e]);
    }
  }
  function al(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[be] || null;
    if (i === null) return null;
    n = i[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        o(231, e, typeof n)
      );
    return n;
  }
  var Cn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wo = !1;
  if (Cn)
    try {
      var ll = {};
      Object.defineProperty(ll, "passive", {
        get: function() {
          wo = !0;
        }
      }), window.addEventListener("test", ll, ll), window.removeEventListener("test", ll, ll);
    } catch {
      wo = !1;
    }
  var Zn = null, Bo = null, xu = null;
  function Ph() {
    if (xu) return xu;
    var t, e = Bo, n = e.length, i, u = "value" in Zn ? Zn.value : Zn.textContent, s = u.length;
    for (t = 0; t < n && e[t] === u[t]; t++) ;
    var f = n - t;
    for (i = 1; i <= f && e[n - i] === u[s - i]; i++) ;
    return xu = u.slice(t, 1 < i ? 1 - i : void 0);
  }
  function Cu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Ou() {
    return !0;
  }
  function kh() {
    return !1;
  }
  function ye(t) {
    function e(n, i, u, s, f) {
      this._reactName = n, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(s) : s[m]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Ou : kh, this.isPropagationStopped = kh, this;
    }
    return Z(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ou);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ou);
      },
      persist: function() {
      },
      isPersistent: Ou
    }), e;
  }
  var Kn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zu = ye(Kn), ul = Z({}, Kn, { view: 0, detail: 0 }), z1 = ye(ul), Ho, Lo, sl, Ru = Z({}, ul, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Yo,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== sl && (sl && t.type === "mousemove" ? (Ho = t.screenX - sl.screenX, Lo = t.screenY - sl.screenY) : Lo = Ho = 0, sl = t), Ho);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Lo;
    }
  }), Wh = ye(Ru), R1 = Z({}, Ru, { dataTransfer: 0 }), N1 = ye(R1), _1 = Z({}, ul, { relatedTarget: 0 }), jo = ye(_1), V1 = Z({}, Kn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), U1 = ye(V1), w1 = Z({}, Kn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), B1 = ye(w1), H1 = Z({}, Kn, { data: 0 }), Ih = ye(H1), L1 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, j1 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Y1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function G1(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Y1[t]) ? !!e[t] : !1;
  }
  function Yo() {
    return G1;
  }
  var q1 = Z({}, ul, {
    key: function(t) {
      if (t.key) {
        var e = L1[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Cu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? j1[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Yo,
    charCode: function(t) {
      return t.type === "keypress" ? Cu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Cu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), X1 = ye(q1), Q1 = Z({}, Ru, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), $h = ye(Q1), Z1 = Z({}, Kn, { submitter: 0 }), K1 = ye(Z1), J1 = Z({}, ul, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yo
  }), F1 = ye(J1), P1 = Z({}, Kn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k1 = ye(P1), W1 = Z({}, Ru, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), I1 = ye(W1), $1 = Z({}, Kn, {
    newState: 0,
    oldState: 0,
    source: 0
  }), tS = ye($1), eS = [9, 13, 27, 32], Go = Cn && "CompositionEvent" in window, ol = null;
  Cn && "documentMode" in document && (ol = document.documentMode);
  var nS = Cn && "TextEvent" in window && !ol, td = Cn && (!Go || ol && 8 < ol && 11 >= ol), ed = " ", nd = !1;
  function id(t, e) {
    switch (t) {
      case "keyup":
        return eS.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ad(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ra = !1;
  function iS(t, e) {
    switch (t) {
      case "compositionend":
        return ad(e);
      case "keypress":
        return e.which !== 32 ? null : (nd = !0, ed);
      case "textInput":
        return t = e.data, t === ed && nd ? null : t;
      default:
        return null;
    }
  }
  function aS(t, e) {
    if (ra)
      return t === "compositionend" || !Go && id(t, e) ? (t = Ph(), xu = Bo = Zn = null, ra = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return td && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var lS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ld(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!lS[t.type] : e === "textarea";
  }
  function ud(t, e, n, i) {
    sa ? oa ? oa.push(i) : oa = [i] : sa = i, e = Ns(e, "onChange"), 0 < e.length && (n = new zu(
      "onChange",
      "change",
      null,
      n,
      i
    ), t.push({ event: n, listeners: e }));
  }
  var rl = null, cl = null;
  function uS(t) {
    Jy(t, 0);
  }
  function Nu(t) {
    var e = il(t);
    if (Gh(e)) return t;
  }
  function sd(t, e) {
    if (t === "change") return e;
  }
  var od = !1;
  if (Cn) {
    var qo;
    if (Cn) {
      var Xo = "oninput" in document;
      if (!Xo) {
        var rd = document.createElement("div");
        rd.setAttribute("oninput", "return;"), Xo = typeof rd.oninput == "function";
      }
      qo = Xo;
    } else qo = !1;
    od = qo && (!document.documentMode || 9 < document.documentMode);
  }
  function cd() {
    rl && (rl.detachEvent("onpropertychange", fd), cl = rl = null);
  }
  function fd(t) {
    if (t.propertyName === "value" && Nu(cl)) {
      var e = [];
      ud(
        e,
        cl,
        t,
        Vo(t)
      ), Fh(uS, e);
    }
  }
  function sS(t, e, n) {
    t === "focusin" ? (cd(), rl = e, cl = n, rl.attachEvent("onpropertychange", fd)) : t === "focusout" && cd();
  }
  function oS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Nu(cl);
  }
  function rS(t, e) {
    if (t === "click") return Nu(e);
  }
  function cS(t, e) {
    if (t === "input" || t === "change")
      return Nu(e);
  }
  function fS(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var _e = typeof Object.is == "function" ? Object.is : fS;
  function fl(t, e) {
    if (_e(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var u = n[i];
      if (!Eo.call(e, u) || !_e(t[u], e[u]))
        return !1;
    }
    return !0;
  }
  function Qo(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function hd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function dd(t, e) {
    var n = hd(t);
    t = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = t + n.textContent.length, t <= e && i >= e)
          return { node: n, offset: e - t };
        t = i;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = hd(n);
    }
  }
  function md(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? md(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function yd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Qo(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Qo(t.document);
    }
    return e;
  }
  function Zo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var hS = Cn && "documentMode" in document && 11 >= document.documentMode, ca = null, Ko = null, hl = null, Jo = !1;
  function gd(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Jo || ca == null || ca !== Qo(i) || (i = ca, "selectionStart" in i && Zo(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), hl && fl(hl, i) || (hl = i, i = Ns(Ko, "onSelect"), 0 < i.length && (e = new zu(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: i }), e.target = ca)));
  }
  function xi(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var fa = {
    animationend: xi("Animation", "AnimationEnd"),
    animationiteration: xi("Animation", "AnimationIteration"),
    animationstart: xi("Animation", "AnimationStart"),
    transitionrun: xi("Transition", "TransitionRun"),
    transitionstart: xi("Transition", "TransitionStart"),
    transitioncancel: xi("Transition", "TransitionCancel"),
    transitionend: xi("Transition", "TransitionEnd")
  }, Fo = {}, vd = {};
  Cn && (vd = document.createElement("div").style, "AnimationEvent" in window || (delete fa.animationend.animation, delete fa.animationiteration.animation, delete fa.animationstart.animation), "TransitionEvent" in window || delete fa.transitionend.transition);
  function Ci(t) {
    if (Fo[t]) return Fo[t];
    if (!fa[t]) return t;
    var e = fa[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in vd)
        return Fo[t] = e[n];
    return t;
  }
  var pd = Ci("animationend"), Sd = Ci("animationiteration"), Td = Ci("animationstart"), dS = Ci("transitionrun"), mS = Ci("transitionstart"), yS = Ci("transitioncancel"), bd = Ci("transitionend"), Ed = /* @__PURE__ */ new Map(), Po = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Po.push("scrollEnd");
  function We(t, e) {
    Ed.set(t, e), Di(e, [t]);
  }
  var gS = 0;
  function On(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = en.identifierPrefix;
    var n = gS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function Ad(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = Na;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = t[n[i]];
        if (u != null) {
          if (u === "none") return "none";
          e = e == null ? u : e + (" " + u);
        }
      }
    return e ?? t.default;
  }
  function zn(t, e) {
    return t = Ad(t), e = Ad(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var _u = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ye = [], ha = 0, ko = 0;
  function Vu() {
    for (var t = ha, e = ko = ha = 0; e < t; ) {
      var n = Ye[e];
      Ye[e++] = null;
      var i = Ye[e];
      Ye[e++] = null;
      var u = Ye[e];
      Ye[e++] = null;
      var s = Ye[e];
      if (Ye[e++] = null, i !== null && u !== null) {
        var f = i.pending;
        f === null ? u.next = u : (u.next = f.next, f.next = u), i.pending = u;
      }
      s !== 0 && Md(n, u, s);
    }
  }
  function Uu(t, e, n, i) {
    Ye[ha++] = t, Ye[ha++] = e, Ye[ha++] = n, Ye[ha++] = i, ko |= i, t.lanes |= i, t = t.alternate, t !== null && (t.lanes |= i);
  }
  function Wo(t, e, n, i) {
    return Uu(t, e, n, i), wu(t);
  }
  function Oi(t, e) {
    return Uu(t, null, null, e), wu(t);
  }
  function Md(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var u = !1, s = t.return; s !== null; )
      s.childLanes |= n, i = s.alternate, i !== null && (i.childLanes |= n), s.tag === 22 && (t = s.stateNode, t === null || t._visibility & 1 || (u = !0)), t = s, s = s.return;
    return t.tag === 3 ? (s = t.stateNode, u && e !== null && (u = 31 - Re(n), t = s.hiddenUpdates, i = t[u], i === null ? t[u] = [e] : i.push(e), e.lane = n | 536870912), s) : null;
  }
  function wu(t) {
    if (50 < Ul)
      throw Ul = 0, Ms = null, Error(o(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var da = {};
  function vS(t, e, n, i) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ee(t, e, n, i) {
    return new vS(t, e, n, i);
  }
  function Io(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Rn(t, e) {
    var n = t.alternate;
    return n === null ? (n = Ee(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function Dd(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Bu(t, e, n, i, u, s) {
    var f = 0;
    if (i = t, typeof i == "function") Io(i) && (f = 1);
    else if (typeof i == "string")
      f = ZT(
        t,
        n,
        on.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (i) {
        case $t:
          return t = Ee(31, n, e, u), t.elementType = $t, t.lanes = s, t;
        case vt:
          return zi(n.children, u, s, e);
        case zt:
          f = 8, u |= 24;
          break;
        case de:
          return t = Ee(12, n, e, u | 2), t.elementType = de, t.lanes = s, t;
        case it:
          return t = Ee(13, n, e, u), t.elementType = it, t.lanes = s, t;
        case K:
          return t = Ee(19, n, e, u), t.elementType = K, t.lanes = s, t;
        case ke:
        case A:
          return t = u | 32, t = Ee(30, n, e, t), t.elementType = A, t.lanes = s, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case Rt:
                f = 10;
                break t;
              case It:
                f = 9;
                break t;
              case L:
                f = 11;
                break t;
              case ot:
                f = 14;
                break t;
              case ft:
                f = 16, i = null;
                break t;
            }
          f = 29, n = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), i = null;
      }
    return e = Ee(f, n, e, u), e.elementType = t, e.type = i, e.lanes = s, e;
  }
  function zi(t, e, n, i) {
    return t = Ee(7, t, i, e), t.lanes = n, t;
  }
  function $o(t, e, n) {
    return t = Ee(6, t, null, e), t.lanes = n, t;
  }
  function xd(t) {
    var e = Ee(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function tr(t, e, n) {
    return e = Ee(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Cd = /* @__PURE__ */ new WeakMap();
  function Ge(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Cd.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: bh(e)
      }, Cd.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: bh(e)
    };
  }
  var ma = [], ya = 0, Hu = null, dl = 0, qe = [], Xe = 0, Jn = null, cn = 1, fn = "";
  function Nn(t, e) {
    ma[ya++] = dl, ma[ya++] = Hu, Hu = t, dl = e;
  }
  function Od(t, e, n) {
    qe[Xe++] = cn, qe[Xe++] = fn, qe[Xe++] = Jn, Jn = t;
    var i = cn;
    t = fn;
    var u = 32 - Re(i) - 1;
    i &= ~(1 << u), n += 1;
    var s = 32 - Re(e) + u;
    if (30 < s) {
      var f = u - u % 5;
      s = (i & (1 << f) - 1).toString(32), i >>= f, u -= f, cn = 1 << 32 - Re(e) + u | n << u | i, fn = s + t;
    } else
      cn = 1 << s | n << u | i, fn = t;
  }
  function Lu(t) {
    t.return !== null && (Nn(t, 1), Od(t, 1, 0));
  }
  function er(t) {
    for (; t === Hu; )
      Hu = ma[--ya], ma[ya] = null, dl = ma[--ya], ma[ya] = null;
    for (; t === Jn; )
      Jn = qe[--Xe], qe[Xe] = null, fn = qe[--Xe], qe[Xe] = null, cn = qe[--Xe], qe[Xe] = null;
  }
  function zd(t, e) {
    qe[Xe++] = cn, qe[Xe++] = fn, qe[Xe++] = Jn, cn = e.id, fn = e.overflow, Jn = t;
  }
  var ee = null, wt = null, rt = !1, Fn = null, Qe = !1, nr = Error(o(519));
  function Pn(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ml(Ge(e, t)), nr;
  }
  function Rd(t) {
    var e = t.stateNode, n = t.type, i = t.memoizedProps;
    switch (e[le] = t, e[be] = i, n) {
      case "dialog":
        dt("cancel", e), dt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        dt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Bl.length; n++)
          dt(Bl[n], e);
        break;
      case "source":
        dt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        dt("error", e), dt("load", e);
        break;
      case "details":
        dt("toggle", e);
        break;
      case "input":
        dt("invalid", e), qh(
          e,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        dt("invalid", e);
        break;
      case "textarea":
        dt("invalid", e), Qh(e, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || i.suppressHydrationWarning === !0 || Wy(e.textContent, n) ? (i.popover != null && (dt("beforetoggle", e), dt("toggle", e)), i.onScroll != null && dt("scroll", e), i.onScrollEnd != null && dt("scrollend", e), i.onClick != null && (e.onclick = rn), e = !0) : e = !1, e || Pn(t, !0);
  }
  function ju(t) {
    for (ee = t.return; ee; )
      switch (ee.tag) {
        case 5:
        case 31:
        case 13:
          Qe = !1;
          return;
        case 27:
        case 3:
          Qe = !0;
          return;
        default:
          ee = ee.return;
      }
  }
  function ga(t) {
    if (t !== ee) return !1;
    if (!rt) return ju(t), rt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || _c(t.type, t.memoizedProps)), n = !n), n && wt && Pn(t), ju(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      wt = gg(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      wt = gg(t);
    } else
      e === 27 ? (e = wt, fi(t.type) ? (t = Gc, Gc = null, wt = t) : wt = e) : wt = ee ? Ke(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ri() {
    wt = ee = null, rt = !1;
  }
  function ir() {
    var t = Fn;
    return t !== null && (De === null ? De = t : De.push.apply(
      De,
      t
    ), Fn = null), t;
  }
  function ml(t) {
    Fn === null ? Fn = [t] : Fn.push(t);
  }
  var ar = sn(null), Ni = null, _n = null;
  function kn(t, e, n) {
    Ut(ar, e._currentValue), e._currentValue = n;
  }
  function Vn(t) {
    t._currentValue = ar.current, ae(ar);
  }
  function Yu(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function lr(t, e, n, i) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var s = u.dependencies;
      if (s !== null) {
        var f = u.child;
        s = s.firstContext;
        t: for (; s !== null; ) {
          var m = s;
          s = u;
          for (var T = 0; T < e.length; T++)
            if (m.context === e[T]) {
              s.lanes |= n, m = s.alternate, m !== null && (m.lanes |= n), Yu(
                s.return,
                n,
                t
              ), i || (f = null);
              break t;
            }
          s = m.next;
        }
      } else if (u.tag === 18) {
        if (f = u.return, f === null) throw Error(o(341));
        f.lanes |= n, s = f.alternate, s !== null && (s.lanes |= n), Yu(f, n, t), f = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= n, f = u.alternate, f !== null && (f.lanes |= n), Yu(
          u.return,
          n,
          t
        ), f = u.child, f = f !== null ? f.sibling : null) : f = u.child;
      if (f !== null) f.return = u;
      else
        for (f = u; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (u = f.sibling, u !== null) {
            u.return = f.return, f = u;
            break;
          }
          f = f.return;
        }
      u = f;
    }
  }
  function _i(t, e, n, i) {
    t = null;
    for (var u = e, s = !1; u !== null; ) {
      if (!s) {
        if ((u.flags & 524288) !== 0) s = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(o(387));
        if (f = f.memoizedProps, f !== null) {
          var m = u.type;
          _e(u.pendingProps.value, f.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (u === du.current) {
        if (f = u.alternate, f === null) throw Error(o(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Ga) : t = [Ga]);
      }
      u = u.return;
    }
    return t !== null && lr(
      e,
      t,
      n,
      i
    ), e.flags |= 262144, t !== null;
  }
  function Gu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!_e(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Vi(t) {
    Ni = t, _n = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ue(t) {
    return Nd(Ni, t);
  }
  function qu(t, e) {
    return Ni === null && Vi(t), Nd(t, e);
  }
  function Nd(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, _n === null) {
      if (t === null) throw Error(o(308));
      _n = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else _n = _n.next = e;
    return n;
  }
  var pS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        t.push(i);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, SS = a.unstable_scheduleCallback, TS = a.unstable_NormalPriority, Qt = {
    $$typeof: Rt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ur() {
    return {
      controller: new pS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yl(t) {
    t.refCount--, t.refCount === 0 && SS(TS, function() {
      t.controller.abort();
    });
  }
  function _d(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var i = e[t];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var gl = null;
  function bS(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var vl = null, sr = 0, Ui = 0, va = null;
  function ES(t, e) {
    if (vl === null) {
      var n = vl = [];
      sr = 0, Ui = Ac(), va = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return sr++, e.then(Vd, Vd), e;
  }
  function Vd() {
    if (--sr === 0 && (gl = null, vl !== null)) {
      va !== null && (va.status = "fulfilled");
      var t = vl;
      vl = null, Ui = 0, va = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function AS(t, e) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return t.then(
      function() {
        i.status = "fulfilled", i.value = e;
        for (var u = 0; u < n.length; u++) (0, n[u])(e);
      },
      function(u) {
        for (i.status = "rejected", i.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), i;
  }
  var Ud = P.S;
  P.S = function(t, e) {
    if (xy = Oe(), typeof e == "object" && e !== null && typeof e.then == "function" && ES(t, e), gl !== null)
      for (var n = wa; n !== null; )
        _d(n, gl), n = n.next;
    if (n = t.types, n !== null) {
      for (var i = wa; i !== null; )
        _d(i, n), i = i.next;
      if (Ui !== 0) {
        i = gl, i === null && (i = gl = []);
        for (var u = 0; u < n.length; u++) {
          var s = n[u];
          i.indexOf(s) === -1 && i.push(s);
        }
      }
    }
    Ud !== null && Ud(t, e);
  };
  var wi = sn(null);
  function or() {
    var t = wi.current;
    return t !== null ? t : _t.pooledCache;
  }
  function Xu(t, e) {
    e === null ? Ut(wi, wi.current) : Ut(wi, e.pool);
  }
  function wd() {
    var t = or();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var pa = Error(o(460)), rr = Error(o(474)), Qu = Error(o(542)), Zu = { then: function() {
  } };
  function Bd(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Hd(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(rn, rn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, jd(t), t === void 0 && !("reason" in e) ? Error(o(600)) : t;
      default:
        if (typeof e.status == "string") e.then(rn, rn);
        else {
          if (t = _t, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = e, t.status = "pending", t.then(
            function(i) {
              if (e.status === "pending") {
                var u = e;
                u.status = "fulfilled", u.value = i;
              }
            },
            function(i) {
              if (e.status === "pending") {
                var u = e;
                u.status = "rejected", u.reason = i;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, jd(t), t;
        }
        throw Hi = e, pa;
    }
  }
  function Bi(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Hi = n, pa) : n;
    }
  }
  var Hi = null;
  function Ld() {
    if (Hi === null) throw Error(o(459));
    var t = Hi;
    return Hi = null, t;
  }
  function jd(t) {
    if (t === pa || t === Qu)
      throw Error(o(483));
  }
  var Sa = null, pl = 0;
  function Ku(t) {
    var e = pl;
    return pl += 1, Sa === null && (Sa = []), Hd(Sa, t, e);
  }
  function Wn(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ju(t, e) {
    throw e.$$typeof === q ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Yd(t) {
    function e(D, E) {
      if (t) {
        var C = D.deletions;
        C === null ? (D.deletions = [E], D.flags |= 16) : C.push(E);
      }
    }
    function n(D, E) {
      if (!t) return null;
      for (; E !== null; )
        e(D, E), E = E.sibling;
      return null;
    }
    function i(D) {
      for (var E = /* @__PURE__ */ new Map(); D !== null; )
        D.key === null ? E.set(D.index, D) : E.set(D.key, D), D = D.sibling;
      return E;
    }
    function u(D, E) {
      return D = Rn(D, E), D.index = 0, D.sibling = null, D;
    }
    function s(D, E, C) {
      return D.index = C, t ? (C = D.alternate, C !== null ? (C = C.index, C < E ? (D.flags |= 2, E) : C) : (D.flags |= 134217730, E)) : (D.flags |= 1048576, E);
    }
    function f(D) {
      return t && D.alternate === null && (D.flags |= 134217730), D;
    }
    function m(D, E, C, _) {
      return E === null || E.tag !== 6 ? (E = $o(C, D.mode, _), E.return = D, E) : (E = u(E, C), E.return = D, E);
    }
    function T(D, E, C, _) {
      var Q = C.type;
      return Q === vt ? (D = R(
        D,
        E,
        C.props.children,
        _,
        C.key
      ), Wn(D, C), D) : E !== null && (E.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === ft && Bi(Q) === E.type) ? (E = u(E, C.props), Wn(E, C), E.return = D, E) : (E = Bu(
        C.type,
        C.key,
        C.props,
        null,
        D.mode,
        _
      ), Wn(E, C), E.return = D, E);
    }
    function x(D, E, C, _) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== C.containerInfo || E.stateNode.implementation !== C.implementation ? (E = tr(C, D.mode, _), E.return = D, E) : (E = u(E, C.children || []), E.return = D, E);
    }
    function R(D, E, C, _, Q) {
      return E === null || E.tag !== 7 ? (E = zi(
        C,
        D.mode,
        _,
        Q
      ), E.return = D, E) : (E = u(E, C), E.return = D, E);
    }
    function V(D, E, C) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = $o(
          "" + E,
          D.mode,
          C
        ), E.return = D, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Ot:
            return C = Bu(
              E.type,
              E.key,
              E.props,
              null,
              D.mode,
              C
            ), Wn(C, E), C.return = D, C;
          case W:
            return E = tr(
              E,
              D.mode,
              C
            ), E.return = D, E;
          case ft:
            return E = Bi(E), V(D, E, C);
        }
        if (bt(E) || tt(E))
          return E = zi(
            E,
            D.mode,
            C,
            null
          ), E.return = D, E;
        if (typeof E.then == "function")
          return V(D, Ku(E), C);
        if (E.$$typeof === Rt)
          return V(
            D,
            qu(D, E),
            C
          );
        Ju(D, E);
      }
      return null;
    }
    function M(D, E, C, _) {
      var Q = E !== null ? E.key : null;
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return Q !== null ? null : m(D, E, "" + C, _);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case Ot:
            return C.key === Q ? T(D, E, C, _) : null;
          case W:
            return C.key === Q ? x(D, E, C, _) : null;
          case ft:
            return C = Bi(C), M(D, E, C, _);
        }
        if (bt(C) || tt(C))
          return Q !== null ? null : R(D, E, C, _, null);
        if (typeof C.then == "function")
          return M(
            D,
            E,
            Ku(C),
            _
          );
        if (C.$$typeof === Rt)
          return M(
            D,
            E,
            qu(D, C),
            _
          );
        Ju(D, C);
      }
      return null;
    }
    function O(D, E, C, _, Q) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return D = D.get(C) || null, m(E, D, "" + _, Q);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case Ot:
            return D = D.get(
              _.key === null ? C : _.key
            ) || null, T(E, D, _, Q);
          case W:
            return D = D.get(
              _.key === null ? C : _.key
            ) || null, x(E, D, _, Q);
          case ft:
            return _ = Bi(_), O(
              D,
              E,
              C,
              _,
              Q
            );
        }
        if (bt(_) || tt(_))
          return D = D.get(C) || null, R(E, D, _, Q, null);
        if (typeof _.then == "function")
          return O(
            D,
            E,
            C,
            Ku(_),
            Q
          );
        if (_.$$typeof === Rt)
          return O(
            D,
            E,
            C,
            qu(E, _),
            Q
          );
        Ju(E, _);
      }
      return null;
    }
    function Y(D, E, C, _) {
      for (var Q = null, yt = null, k = E, nt = E = 0, Jt = null; k !== null && nt < C.length; nt++) {
        k.index > nt ? (Jt = k, k = null) : Jt = k.sibling;
        var gt = M(
          D,
          k,
          C[nt],
          _
        );
        if (gt === null) {
          k === null && (k = Jt);
          break;
        }
        t && k && gt.alternate === null && e(D, k), E = s(gt, E, nt), yt === null ? Q = gt : yt.sibling = gt, yt = gt, k = Jt;
      }
      if (nt === C.length)
        return n(D, k), rt && Nn(D, nt), Q;
      if (k === null) {
        for (; nt < C.length; nt++)
          k = V(D, C[nt], _), k !== null && (E = s(
            k,
            E,
            nt
          ), yt === null ? Q = k : yt.sibling = k, yt = k);
        return rt && Nn(D, nt), Q;
      }
      for (k = i(k); nt < C.length; nt++)
        Jt = O(
          k,
          D,
          nt,
          C[nt],
          _
        ), Jt !== null && (t && (gt = Jt.alternate, gt !== null && k.delete(gt.key === null ? nt : gt.key)), E = s(
          Jt,
          E,
          nt
        ), yt === null ? Q = Jt : yt.sibling = Jt, yt = Jt);
      return t && k.forEach(function(gi) {
        return e(D, gi);
      }), rt && Nn(D, nt), Q;
    }
    function J(D, E, C, _) {
      if (C == null) throw Error(o(151));
      for (var Q = null, yt = null, k = E, nt = E = 0, Jt = null, gt = C.next(); k !== null && !gt.done; nt++, gt = C.next()) {
        k.index > nt ? (Jt = k, k = null) : Jt = k.sibling;
        var gi = M(D, k, gt.value, _);
        if (gi === null) {
          k === null && (k = Jt);
          break;
        }
        t && k && gi.alternate === null && e(D, k), E = s(gi, E, nt), yt === null ? Q = gi : yt.sibling = gi, yt = gi, k = Jt;
      }
      if (gt.done)
        return n(D, k), rt && Nn(D, nt), Q;
      if (k === null) {
        for (; !gt.done; nt++, gt = C.next())
          gt = V(D, gt.value, _), gt !== null && (E = s(gt, E, nt), yt === null ? Q = gt : yt.sibling = gt, yt = gt);
        return rt && Nn(D, nt), Q;
      }
      for (k = i(k); !gt.done; nt++, gt = C.next())
        gt = O(k, D, nt, gt.value, _), gt !== null && (t && (Jt = gt.alternate, Jt !== null && k.delete(
          Jt.key === null ? nt : Jt.key
        )), E = s(gt, E, nt), yt === null ? Q = gt : yt.sibling = gt, yt = gt);
      return t && k.forEach(function(ib) {
        return e(D, ib);
      }), rt && Nn(D, nt), Q;
    }
    function st(D, E, C, _) {
      if (typeof C == "object" && C !== null && C.type === vt && C.key === null && C.props.ref === void 0 && (C = C.props.children), typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case Ot:
            t: {
              for (var Q = C.key; E !== null; ) {
                if (E.key === Q) {
                  if (Q = C.type, Q === vt) {
                    if (E.tag === 7) {
                      n(
                        D,
                        E.sibling
                      ), _ = u(
                        E,
                        C.props.children
                      ), Wn(_, C), _.return = D, D = _;
                      break t;
                    }
                  } else if (E.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === ft && Bi(Q) === E.type) {
                    n(
                      D,
                      E.sibling
                    ), _ = u(E, C.props), Wn(_, C), _.return = D, D = _;
                    break t;
                  }
                  n(D, E);
                  break;
                } else e(D, E);
                E = E.sibling;
              }
              C.type === vt ? (_ = zi(
                C.props.children,
                D.mode,
                _,
                C.key
              ), Wn(_, C), _.return = D, D = _) : (_ = Bu(
                C.type,
                C.key,
                C.props,
                null,
                D.mode,
                _
              ), Wn(_, C), _.return = D, D = _);
            }
            return f(D);
          case W:
            t: {
              for (Q = C.key; E !== null; ) {
                if (E.key === Q)
                  if (E.tag === 4 && E.stateNode.containerInfo === C.containerInfo && E.stateNode.implementation === C.implementation) {
                    n(
                      D,
                      E.sibling
                    ), _ = u(E, C.children || []), _.return = D, D = _;
                    break t;
                  } else {
                    n(D, E);
                    break;
                  }
                else e(D, E);
                E = E.sibling;
              }
              _ = tr(C, D.mode, _), _.return = D, D = _;
            }
            return f(D);
          case ft:
            return C = Bi(C), st(
              D,
              E,
              C,
              _
            );
        }
        if (bt(C))
          return Y(
            D,
            E,
            C,
            _
          );
        if (tt(C)) {
          if (Q = tt(C), typeof Q != "function") throw Error(o(150));
          return C = Q.call(C), J(
            D,
            E,
            C,
            _
          );
        }
        if (typeof C.then == "function")
          return st(
            D,
            E,
            Ku(C),
            _
          );
        if (C.$$typeof === Rt)
          return st(
            D,
            E,
            qu(D, C),
            _
          );
        Ju(D, C);
      }
      return typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint" ? (C = "" + C, E !== null && E.tag === 6 ? (n(D, E.sibling), _ = u(E, C), _.return = D, D = _) : (n(D, E), _ = $o(C, D.mode, _), _.return = D, D = _), f(D)) : n(D, E);
    }
    return function(D, E, C, _) {
      try {
        pl = 0;
        var Q = st(
          D,
          E,
          C,
          _
        );
        return Sa = null, Q;
      } catch (k) {
        if (k === pa || k === Qu) throw k;
        var yt = Ee(29, k, null, D.mode);
        return yt.lanes = _, yt.return = D, yt;
      } finally {
      }
    };
  }
  var Li = Yd(!0), Gd = Yd(!1), In = !1;
  function cr(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function fr(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function $n(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ti(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Et & 2) !== 0) {
      var u = i.pending;
      return u === null ? e.next = e : (e.next = u.next, u.next = e), i.pending = e, e = wu(t), Md(t, null, n), e;
    }
    return Uu(t, i, e, n), wu(t);
  }
  function Sl(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, Oh(t, n);
    }
  }
  function hr(t, e) {
    var n = t.updateQueue, i = t.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var u = null, s = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          s === null ? u = s = f : s = s.next = f, n = n.next;
        } while (n !== null);
        s === null ? u = s = e : s = s.next = e;
      } else u = s = e;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var dr = !1;
  function Tl() {
    if (dr) {
      var t = va;
      if (t !== null) throw t;
    }
  }
  function bl(t, e, n, i) {
    dr = !1;
    var u = t.updateQueue;
    In = !1;
    var s = u.firstBaseUpdate, f = u.lastBaseUpdate, m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var T = m, x = T.next;
      T.next = null, f === null ? s = x : f.next = x, f = T;
      var R = t.alternate;
      R !== null && (R = R.updateQueue, m = R.lastBaseUpdate, m !== f && (m === null ? R.firstBaseUpdate = x : m.next = x, R.lastBaseUpdate = T));
    }
    if (s !== null) {
      var V = u.baseState;
      f = 0, R = x = T = null, m = s;
      do {
        var M = m.lane & -536870913, O = M !== m.lane;
        if (O ? (mt & M) === M : (i & M) === M) {
          M !== 0 && M === Ui && (dr = !0), R !== null && (R = R.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, J = m;
            M = e;
            var st = n;
            switch (J.tag) {
              case 1:
                if (Y = J.payload, typeof Y == "function") {
                  V = Y.call(st, V, M);
                  break t;
                }
                V = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = J.payload, M = typeof Y == "function" ? Y.call(st, V, M) : Y, M == null) break t;
                V = Z({}, V, M);
                break t;
              case 2:
                In = !0;
            }
          }
          M = m.callback, M !== null && (t.flags |= 64, O && (t.flags |= 8192), O = u.callbacks, O === null ? u.callbacks = [M] : O.push(M));
        } else
          O = {
            lane: M,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, R === null ? (x = R = O, T = V) : R = R.next = O, f |= M;
        if (m = m.next, m === null) {
          if (m = u.shared.pending, m === null)
            break;
          O = m, m = O.next, O.next = null, u.lastBaseUpdate = O, u.shared.pending = null;
        }
      } while (!0);
      R === null && (T = V), u.baseState = T, u.firstBaseUpdate = x, u.lastBaseUpdate = R, s === null && (u.shared.lanes = 0), si |= f, t.lanes = f, t.memoizedState = V;
    }
  }
  function qd(t, e) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(e);
  }
  function Xd(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        qd(n[t], e);
  }
  var ei = sn(null), Fu = sn(0);
  function Qd(t, e) {
    t = Ln, Ut(Fu, t), Ut(ei, e), Ln = t | e.baseLanes;
  }
  function mr() {
    Ut(Fu, Ln), Ut(ei, ei.current);
  }
  function yr() {
    Ln = Fu.current, ae(ei), ae(Fu);
  }
  var se = sn(null), me = null;
  function ni(t) {
    var e = t.alternate;
    Ut(oe, oe.current & 1), Ut(se, t), me === null && (e === null || ei.current !== null || e.memoizedState !== null) && (me = t);
  }
  function gr(t) {
    Ut(oe, oe.current), Ut(se, t), me === null && (me = t);
  }
  function Zd(t) {
    t.tag === 22 ? (Ut(oe, oe.current), Ut(se, t), me === null && (me = t)) : ii();
  }
  function ii() {
    Ut(oe, oe.current), Ut(se, se.current);
  }
  function Ve(t) {
    ae(se), me === t && (me = null), ae(oe);
  }
  var oe = sn(0);
  function El(t, e) {
    Ut(se, se.current), Ut(oe, e);
  }
  function vr(t) {
    ae(oe), ae(se), me === t && (me = null);
  }
  function Pu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || jc(n) || Yc(n)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Un = 0, ut = null, Nt = null, Zt = null, ku = !1, Ta = !1, ji = !1, Wu = 0, Al = 0, ba = null, MS = 0;
  function Gt() {
    throw Error(o(321));
  }
  function pr(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!_e(t[n], e[n])) return !1;
    return !0;
  }
  function Sr(t, e, n, i, u, s) {
    return Un = s, ut = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, P.H = t === null || t.memoizedState === null ? Om : zm, ji = !1, s = n(i, u), ji = !1, Ta && (s = Jd(
      e,
      n,
      i,
      u
    )), Kd(t), s;
  }
  function Kd(t) {
    P.H = as;
    var e = Nt !== null && Nt.next !== null;
    if (Un = 0, Zt = Nt = ut = null, ku = !1, Al = 0, ba = null, e) throw Error(o(300));
    t === null || Kt || (t = t.dependencies, t !== null && Gu(t) && (Kt = !0));
  }
  function Jd(t, e, n, i) {
    ut = t;
    var u = 0;
    do {
      if (Ta && (ba = null), Al = 0, Ta = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Zt = Nt = null, t.updateQueue != null) {
        var s = t.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      P.H = _S, s = e(n, i);
    } while (Ta);
    return s;
  }
  function DS() {
    var t = P.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Ml(e) : e, t = t.useState()[0], (Nt !== null ? Nt.memoizedState : null) !== t && (ut.flags |= 1024), e;
  }
  function Tr() {
    var t = Wu !== 0;
    return Wu = 0, t;
  }
  function br(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function Er(t) {
    if (ku) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      ku = !1;
    }
    Un = 0, Zt = Nt = ut = null, Ta = !1, Al = Wu = 0, ba = null;
  }
  function ge() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Zt === null ? ut.memoizedState = Zt = t : Zt = Zt.next = t, Zt;
  }
  function Xt() {
    if (Nt === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Nt.next;
    var e = Zt === null ? ut.memoizedState : Zt.next;
    if (e !== null)
      Zt = e, Nt = t;
    else {
      if (t === null)
        throw ut.alternate === null ? Error(o(467)) : Error(o(310));
      Nt = t, t = {
        memoizedState: Nt.memoizedState,
        baseState: Nt.baseState,
        baseQueue: Nt.baseQueue,
        queue: Nt.queue,
        next: null
      }, Zt === null ? ut.memoizedState = Zt = t : Zt = Zt.next = t;
    }
    return Zt;
  }
  function Iu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ml(t) {
    var e = Al;
    return Al += 1, ba === null && (ba = []), t = Hd(ba, t, e), e = ut, (Zt === null ? e.memoizedState : Zt.next) === null && (e = e.alternate, P.H = e === null || e.memoizedState === null ? Om : zm), t;
  }
  function $u(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ml(t);
      if (t.$$typeof === B) return;
      if (t.$$typeof === Rt) return ue(t);
    }
    throw Error(o(438, String(t)));
  }
  function Ar(t) {
    var e = null, n = ut.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var i = ut.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (e = {
        data: i.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Iu(), ut.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++)
        n[i] = Ei;
    return e.index++, n;
  }
  function wn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ts(t) {
    var e = Xt();
    return Mr(e, Nt, t);
  }
  function Mr(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = n;
    var u = t.baseQueue, s = i.pending;
    if (s !== null) {
      if (u !== null) {
        var f = u.next;
        u.next = s.next, s.next = f;
      }
      e.baseQueue = u = s, i.pending = null;
    }
    if (s = t.baseState, u === null) t.memoizedState = s;
    else {
      e = u.next;
      var m = f = null, T = null, x = e, R = !1;
      do {
        var V = x.lane & -536870913;
        if (V !== x.lane ? (mt & V) === V : (Un & V) === V) {
          var M = x.revertLane;
          if (M === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), V === Ui && (R = !0);
          else if ((Un & M) === M) {
            x = x.next, M === Ui && (R = !0);
            continue;
          } else
            V = {
              lane: 0,
              revertLane: x.revertLane,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, T === null ? (m = T = V, f = s) : T = T.next = V, ut.lanes |= M, si |= M;
          V = x.action, ji && n(s, V), s = x.hasEagerState ? x.eagerState : n(s, V);
        } else
          M = {
            lane: V,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, T === null ? (m = T = M, f = s) : T = T.next = M, ut.lanes |= V, si |= V;
        x = x.next;
      } while (x !== null && x !== e);
      if (T === null ? f = s : T.next = m, !_e(s, t.memoizedState) && (Kt = !0, R && (n = va, n !== null)))
        throw n;
      t.memoizedState = s, t.baseState = f, t.baseQueue = T, i.lastRenderedState = s;
    }
    return u === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
  }
  function Dr(t) {
    var e = Xt(), n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch, u = n.pending, s = e.memoizedState;
    if (u !== null) {
      n.pending = null;
      var f = u = u.next;
      do
        s = t(s, f.action), f = f.next;
      while (f !== u);
      _e(s, e.memoizedState) || (Kt = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
    }
    return [s, i];
  }
  function Fd(t, e, n) {
    var i = ut, u = Xt(), s = rt;
    if (s) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = e();
    var f = !_e(
      (Nt || u).memoizedState,
      n
    );
    if (f && (u.memoizedState = n, Kt = !0), u = u.queue, Or(Wd.bind(null, i, u, t), [
      t
    ]), t = u.getSnapshot !== e || f || Zt !== null && (Zt.memoizedState.tag & 1) !== 0, Ea(
      t ? 9 : 8,
      { destroy: void 0 },
      kd.bind(null, i, u, n, e),
      null
    ), t) {
      if (i.flags |= 2048, _t === null) throw Error(o(349));
      s || (Un & 127) !== 0 || Pd(i, e, n);
    }
    return n;
  }
  function Pd(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = ut.updateQueue, e === null ? (e = Iu(), ut.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function kd(t, e, n, i) {
    e.value = n, e.getSnapshot = i, Id(e) && $d(t);
  }
  function Wd(t, e, n) {
    return n(function() {
      Id(e) && $d(t);
    });
  }
  function Id(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !_e(t, n);
    } catch {
      return !0;
    }
  }
  function $d(t) {
    var e = Oi(t, 2);
    e !== null && xe(e, t, 2);
  }
  function xr(t) {
    var e = ge();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), ji) {
        Qn(!0);
        try {
          n();
        } finally {
          Qn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wn,
      lastRenderedState: t
    }, e;
  }
  function tm(t, e, n, i) {
    return t.baseState = n, Mr(
      t,
      Nt,
      typeof i == "function" ? i : wn
    );
  }
  function xS(t, e, n, i, u) {
    if (is(t)) throw Error(o(485));
    if (t = e.action, t !== null) {
      var s = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          s.listeners.push(f);
        }
      };
      P.T !== null ? n(!0) : s.isTransition = !1, i(s), n = e.pending, n === null ? (s.next = e.pending = s, em(e, s)) : (s.next = n.next, e.pending = n.next = s);
    }
  }
  function em(t, e) {
    var n = e.action, i = e.payload, u = t.state;
    if (e.isTransition) {
      var s = P.T, f = {};
      f.types = s !== null ? s.types : null, P.T = f;
      try {
        var m = n(u, i), T = P.S;
        T !== null && T(f, m), nm(t, e, m);
      } catch (x) {
        Cr(t, e, x);
      } finally {
        s !== null && f.types !== null && (s.types = f.types), P.T = s;
      }
    } else
      try {
        s = n(u, i), nm(t, e, s);
      } catch (x) {
        Cr(t, e, x);
      }
  }
  function nm(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        im(t, e, i);
      },
      function(i) {
        return Cr(t, e, i);
      }
    ) : im(t, e, n);
  }
  function im(t, e, n) {
    e.status = "fulfilled", e.value = n, am(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, em(t, n)));
  }
  function Cr(t, e, n) {
    var i = t.pending;
    if (t.pending = null, i !== null) {
      i = i.next;
      do
        e.status = "rejected", e.reason = n, am(e), e = e.next;
      while (e !== i);
    }
    t.action = null;
  }
  function am(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function lm(t, e) {
    return e;
  }
  function um(t, e) {
    if (rt) {
      var n = _t.formState;
      if (n !== null) {
        t: {
          var i = ut;
          if (rt) {
            if (wt) {
              e: {
                for (var u = wt, s = Qe; u.nodeType !== 8; ) {
                  if (!s) {
                    u = null;
                    break e;
                  }
                  if (u = Ke(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                s = u.data, u = s === "F!" || s === "F" ? u : null;
              }
              if (u) {
                wt = Ke(
                  u.nextSibling
                ), i = u.data === "F!";
                break t;
              }
            }
            Pn(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return n = ge(), n.memoizedState = n.baseState = e, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lm,
      lastRenderedState: e
    }, n.queue = i, n = Dm.bind(
      null,
      ut,
      i
    ), i.dispatch = n, i = xr(!1), s = Vr.bind(
      null,
      ut,
      !1,
      i.queue
    ), i = ge(), u = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, i.queue = u, n = xS.bind(
      null,
      ut,
      u,
      s,
      n
    ), u.dispatch = n, i.memoizedState = t, [e, n, !1];
  }
  function sm(t) {
    var e = Xt();
    return om(e, Nt, t);
  }
  function om(t, e, n) {
    if (e = Mr(
      t,
      e,
      lm
    )[0], t = ts(wn)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var i = Ml(e);
      } catch (f) {
        throw f === pa ? Qu : f;
      }
    else i = e;
    e = Xt();
    var u = e.queue, s = u.dispatch;
    return n !== e.memoizedState && (ut.flags |= 2048, Ea(
      9,
      { destroy: void 0 },
      CS.bind(null, u, n),
      null
    )), [i, s, t];
  }
  function CS(t, e) {
    t.action = e;
  }
  function rm(t) {
    var e = Xt(), n = Nt;
    if (n !== null)
      return om(e, n, t);
    Xt(), e = e.memoizedState, n = Xt();
    var i = n.queue.dispatch;
    return n.memoizedState = t, [e, i, !1];
  }
  function Ea(t, e, n, i) {
    return t = { tag: t, create: n, deps: i, inst: e, next: null }, e = ut.updateQueue, e === null && (e = Iu(), ut.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t), t;
  }
  function cm() {
    return Xt().memoizedState;
  }
  function es(t, e, n, i) {
    var u = ge();
    ut.flags |= t, u.memoizedState = Ea(
      1 | e,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function ns(t, e, n, i) {
    var u = Xt();
    i = i === void 0 ? null : i;
    var s = u.memoizedState.inst;
    Nt !== null && i !== null && pr(i, Nt.memoizedState.deps) ? u.memoizedState = Ea(e, s, n, i) : (ut.flags |= t, u.memoizedState = Ea(
      1 | e,
      s,
      n,
      i
    ));
  }
  function fm(t, e) {
    es(8390656, 8, t, e);
  }
  function Or(t, e) {
    ns(2048, 8, t, e);
  }
  function OS(t) {
    ut.flags |= 4;
    var e = ut.updateQueue;
    if (e === null)
      e = Iu(), ut.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function hm(t) {
    var e = Xt().memoizedState;
    return OS({ ref: e, nextImpl: t }), function() {
      if ((Et & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function dm(t, e) {
    return ns(4, 2, t, e);
  }
  function mm(t, e) {
    return ns(4, 4, t, e);
  }
  function ym(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function gm(t, e, n) {
    n = n != null ? n.concat([t]) : null, ns(4, 4, ym.bind(null, e, t), n);
  }
  function zr() {
  }
  function vm(t, e) {
    var n = Xt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && pr(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
  }
  function pm(t, e) {
    var n = Xt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && pr(e, i[1]))
      return i[0];
    if (i = t(), ji) {
      Qn(!0);
      try {
        t();
      } finally {
        Qn(!1);
      }
    }
    return n.memoizedState = [i, e], i;
  }
  function Rr(t, e, n) {
    return n === void 0 || (Un & 1073741824) !== 0 && (mt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = Oy(), ut.lanes |= t, si |= t, n);
  }
  function Sm(t, e, n, i) {
    return _e(n, e) ? n : ei.current !== null ? (t = Rr(t, n, i), _e(t, e) || (Kt = !0), t) : (Un & 106) === 0 || (Un & 1073741824) !== 0 && (mt & 261930) === 0 ? (Kt = !0, t.memoizedState = n) : (t = Oy(), ut.lanes |= t, si |= t, e);
  }
  function Tm(t, e, n, i, u) {
    var s = at.p;
    at.p = s !== 0 && 8 > s ? s : 8;
    var f = P.T, m = {};
    m.types = f !== null ? f.types : null, P.T = m, Vr(t, !1, e, n);
    try {
      var T = u(), x = P.S;
      if (x !== null && x(m, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var R = AS(
          T,
          i
        );
        Dl(
          t,
          e,
          R,
          He(t)
        );
      } else
        Dl(
          t,
          e,
          i,
          He(t)
        );
    } catch (V) {
      Dl(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: V },
        He()
      );
    } finally {
      at.p = s, f !== null && m.types !== null && (f.types = m.types), P.T = f;
    }
  }
  function zS() {
  }
  function Nr(t, e, n, i) {
    if (t.tag !== 5) throw Error(o(476));
    var u = bm(t).queue;
    Tm(
      t,
      u,
      e,
      Mn,
      n === null ? zS : function() {
        return Em(t), n(i);
      }
    );
  }
  function bm(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Mn,
      baseState: Mn,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wn,
        lastRenderedState: Mn
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wn,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Em(t) {
    var e = bm(t);
    e.next === null && (e = t.alternate.memoizedState), Dl(
      t,
      e.next.queue,
      {},
      He()
    );
  }
  function _r() {
    return ue(Ga);
  }
  function Am() {
    return Xt().memoizedState;
  }
  function Mm() {
    return Xt().memoizedState;
  }
  function RS(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = He();
          t = $n(n);
          var i = ti(e, t, n);
          i !== null && (xe(i, e, n), Sl(i, e, n)), e = { cache: ur() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function NS(t, e, n) {
    var i = He();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, is(t) ? xm(e, n) : (n = Wo(t, e, n, i), n !== null && (xe(n, t, i), Cm(n, e, i)));
  }
  function Dm(t, e, n) {
    var i = He();
    Dl(t, e, n, i);
  }
  function Dl(t, e, n, i) {
    var u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (is(t)) xm(e, u);
    else {
      var s = t.alternate;
      if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null))
        try {
          var f = e.lastRenderedState, m = s(f, n);
          if (u.hasEagerState = !0, u.eagerState = m, _e(m, f))
            return Uu(t, e, u, 0), _t === null && Vu(), !1;
        } catch {
        } finally {
        }
      if (n = Wo(t, e, u, i), n !== null)
        return xe(n, t, i), Cm(n, e, i), !0;
    }
    return !1;
  }
  function Vr(t, e, n, i) {
    if (i = {
      lane: 2,
      revertLane: Ac(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, is(t)) {
      if (e) throw Error(o(479));
    } else
      e = Wo(
        t,
        n,
        i,
        2
      ), e !== null && xe(e, t, 2);
  }
  function is(t) {
    var e = t.alternate;
    return t === ut || e !== null && e === ut;
  }
  function xm(t, e) {
    Ta = ku = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function Cm(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, Oh(t, n);
    }
  }
  var as = {
    readContext: ue,
    use: $u,
    useCallback: Gt,
    useContext: Gt,
    useEffect: Gt,
    useImperativeHandle: Gt,
    useLayoutEffect: Gt,
    useInsertionEffect: Gt,
    useMemo: Gt,
    useReducer: Gt,
    useRef: Gt,
    useState: Gt,
    useDebugValue: Gt,
    useDeferredValue: Gt,
    useTransition: Gt,
    useSyncExternalStore: Gt,
    useId: Gt,
    useHostTransitionStatus: Gt,
    useFormState: Gt,
    useActionState: Gt,
    useOptimistic: Gt,
    useMemoCache: Gt,
    useCacheRefresh: Gt,
    useEffectEvent: Gt
  }, Om = {
    readContext: ue,
    use: $u,
    useCallback: function(t, e) {
      return ge().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ue,
    useEffect: fm,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, es(
        4194308,
        4,
        ym.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return es(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      es(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = ge();
      e = e === void 0 ? null : e;
      var i = t();
      if (ji) {
        Qn(!0);
        try {
          t();
        } finally {
          Qn(!1);
        }
      }
      return n.memoizedState = [i, e], i;
    },
    useReducer: function(t, e, n) {
      var i = ge();
      if (n !== void 0) {
        var u = n(e);
        if (ji) {
          Qn(!0);
          try {
            n(e);
          } finally {
            Qn(!1);
          }
        }
      } else u = e;
      return i.memoizedState = i.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, i.queue = t, t = t.dispatch = NS.bind(
        null,
        ut,
        t
      ), [i.memoizedState, t];
    },
    useRef: function(t) {
      var e = ge();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = xr(t);
      var e = t.queue, n = Dm.bind(null, ut, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: zr,
    useDeferredValue: function(t, e) {
      var n = ge();
      return Rr(n, t, e);
    },
    useTransition: function() {
      var t = xr(!1);
      return t = Tm.bind(
        null,
        ut,
        t.queue,
        !0,
        !1
      ), ge().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var i = ut, u = ge();
      if (rt) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = e(), _t === null)
          throw Error(o(349));
        (mt & 127) !== 0 || Pd(i, e, n);
      }
      u.memoizedState = n;
      var s = { value: n, getSnapshot: e };
      return u.queue = s, fm(Wd.bind(null, i, s, t), [
        t
      ]), i.flags |= 2048, Ea(
        9,
        { destroy: void 0 },
        kd.bind(
          null,
          i,
          s,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = ge(), e = _t.identifierPrefix;
      if (rt) {
        var n = fn, i = cn;
        n = (i & ~(1 << 32 - Re(i) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Wu++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = MS++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: _r,
    useFormState: um,
    useActionState: um,
    useOptimistic: function(t) {
      var e = ge();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Vr.bind(
        null,
        ut,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: Ar,
    useCacheRefresh: function() {
      return ge().memoizedState = RS.bind(
        null,
        ut
      );
    },
    useEffectEvent: function(t) {
      var e = ge(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((Et & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, zm = {
    readContext: ue,
    use: $u,
    useCallback: vm,
    useContext: ue,
    useEffect: Or,
    useImperativeHandle: gm,
    useInsertionEffect: dm,
    useLayoutEffect: mm,
    useMemo: pm,
    useReducer: ts,
    useRef: cm,
    useState: function() {
      return ts(wn);
    },
    useDebugValue: zr,
    useDeferredValue: function(t, e) {
      var n = Xt();
      return Sm(
        n,
        Nt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ts(wn)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ml(t),
        e
      ];
    },
    useSyncExternalStore: Fd,
    useId: Am,
    useHostTransitionStatus: _r,
    useFormState: sm,
    useActionState: sm,
    useOptimistic: function(t, e) {
      var n = Xt();
      return tm(n, Nt, t, e);
    },
    useMemoCache: Ar,
    useCacheRefresh: Mm,
    useEffectEvent: hm
  }, _S = {
    readContext: ue,
    use: $u,
    useCallback: vm,
    useContext: ue,
    useEffect: Or,
    useImperativeHandle: gm,
    useInsertionEffect: dm,
    useLayoutEffect: mm,
    useMemo: pm,
    useReducer: Dr,
    useRef: cm,
    useState: function() {
      return Dr(wn);
    },
    useDebugValue: zr,
    useDeferredValue: function(t, e) {
      var n = Xt();
      return Nt === null ? Rr(n, t, e) : Sm(
        n,
        Nt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Dr(wn)[0], e = Xt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ml(t),
        e
      ];
    },
    useSyncExternalStore: Fd,
    useId: Am,
    useHostTransitionStatus: _r,
    useFormState: rm,
    useActionState: rm,
    useOptimistic: function(t, e) {
      var n = Xt();
      return Nt !== null ? tm(n, Nt, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: Ar,
    useCacheRefresh: Mm,
    useEffectEvent: hm
  };
  function Ur(t, e, n, i) {
    e = t.memoizedState, n = n(i, e), n = n == null ? e : Z({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var wr = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var i = He(), u = $n(i);
      u.payload = e, n != null && (u.callback = n), e = ti(t, u, i), e !== null && (xe(e, t, i), Sl(e, t, i));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var i = He(), u = $n(i);
      u.tag = 1, u.payload = e, n != null && (u.callback = n), e = ti(t, u, i), e !== null && (xe(e, t, i), Sl(e, t, i));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = He(), i = $n(n);
      i.tag = 2, e != null && (i.callback = e), e = ti(t, i, n), e !== null && (xe(e, t, n), Sl(e, t, n));
    }
  };
  function Rm(t, e, n, i, u, s, f) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, s, f) : e.prototype && e.prototype.isPureReactComponent ? !fl(n, i) || !fl(u, s) : !0;
  }
  function Nm(t, e, n, i) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && wr.enqueueReplaceState(e, e.state, null);
  }
  function Yi(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e)
        i !== "ref" && (n[i] = e[i]);
    }
    if (t = t.defaultProps) {
      n === e && (n = Z({}, n));
      for (var u in t)
        n[u] === void 0 && (n[u] = t[u]);
    }
    return n;
  }
  function _m(t) {
    _u(t);
  }
  function Vm(t) {
    console.error(t);
  }
  function Um(t) {
    _u(t);
  }
  function ls(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function wm(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Br(t, e, n) {
    return n = $n(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ls(t, e);
    }, n;
  }
  function Bm(t) {
    return t = $n(t), t.tag = 3, t;
  }
  function Hm(t, e, n, i) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var s = i.value;
      t.payload = function() {
        return u(s);
      }, t.callback = function() {
        wm(e, n, i);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (t.callback = function() {
      wm(e, n, i), typeof u != "function" && (oi === null ? oi = /* @__PURE__ */ new Set([this]) : oi.add(this));
      var m = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function VS(t, e, n, i, u) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (e = n.alternate, e !== null && _i(
        e,
        n,
        u,
        !0
      ), n = se.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return me === null ? xs() : n.alternate === null && qt === 0 && (qt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, i === Zu ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : e.add(i), Tc(t, i, u)), !1;
          case 22:
            return n.flags |= 65536, i === Zu ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Tc(t, i, u)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return Tc(t, i, u), xs(), !1;
    }
    if (rt)
      return e = se.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = u, i !== nr && (t = Error(o(422), { cause: i }), ml(Ge(t, n)))) : (i !== nr && (e = Error(o(423), {
        cause: i
      }), ml(
        Ge(e, n)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, i = Ge(i, n), u = Br(
        t.stateNode,
        i,
        u
      ), hr(t, u), qt !== 4 && (qt = 2)), !1;
    var s = Error(o(520), { cause: i });
    if (s = Ge(s, n), Vl === null ? Vl = [s] : Vl.push(s), qt !== 4 && (qt = 2), e === null) return !0;
    i = Ge(i, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = u & -u, n.lanes |= t, t = Br(n.stateNode, i, t), hr(n, t), !1;
        case 1:
          if (e = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (oi === null || !oi.has(s))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = Bm(u), Hm(
              u,
              t,
              n,
              i
            ), hr(n, u), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Hr = Error(o(461)), Kt = !1;
  function Pt(t, e, n, i) {
    e.child = t === null ? Gd(e, null, n, i) : Li(
      e,
      t.child,
      n,
      i
    );
  }
  function Lm(t, e, n, i, u) {
    n = n.render;
    var s = e.ref;
    if ("ref" in i) {
      var f = {};
      for (var m in i)
        m !== "ref" && (f[m] = i[m]);
    } else f = i;
    return Vi(e), i = Sr(
      t,
      e,
      n,
      f,
      s,
      u
    ), m = Tr(), t !== null && !Kt ? (br(t, e, u), Bn(t, e, u)) : (rt && m && Lu(e), e.flags |= 1, Pt(t, e, i, u), e.child);
  }
  function jm(t, e, n, i, u) {
    if (t === null) {
      var s = n.type;
      return typeof s == "function" && !Io(s) && s.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = s, Ym(
        t,
        e,
        s,
        i,
        u
      )) : (t = Bu(
        n.type,
        null,
        i,
        e,
        e.mode,
        u
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (s = t.child, !Zr(t, u)) {
      var f = s.memoizedProps;
      if (n = n.compare, n = n !== null ? n : fl, n(f, i) && t.ref === e.ref)
        return Bn(t, e, u);
    }
    return e.flags |= 1, t = Rn(s, i), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ym(t, e, n, i, u) {
    if (t !== null) {
      var s = t.memoizedProps;
      if (fl(s, i) && t.ref === e.ref)
        if (Kt = !1, e.pendingProps = i = s, Zr(t, u))
          (t.flags & 131072) !== 0 && (Kt = !0);
        else
          return e.lanes = t.lanes, Bn(t, e, u);
    }
    return Lr(
      t,
      e,
      n,
      i,
      u
    );
  }
  function Gm(t, e, n, i) {
    var u = i.children, s = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | n : n, t !== null) {
          for (i = e.child = t.child, u = 0; i !== null; )
            u = u | i.lanes | i.childLanes, i = i.sibling;
          i = u & ~s;
        } else i = 0, e.child = null;
        return qm(
          t,
          e,
          s,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Xu(
          e,
          s !== null ? s.cachePool : null
        ), s !== null ? Qd(e, s) : mr(), Zd(e);
      else
        return i = e.lanes = 536870912, qm(
          t,
          e,
          s !== null ? s.baseLanes | n : n,
          n,
          i
        );
    } else
      s !== null ? (Xu(e, s.cachePool), Qd(e, s), ii(), e.memoizedState = null) : (t !== null && Xu(e, null), mr(), ii());
    return Pt(t, e, u, n), e.child;
  }
  function xl(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function qm(t, e, n, i, u) {
    var s = or();
    return s = s === null ? null : { parent: Qt._currentValue, pool: s }, e.memoizedState = {
      baseLanes: n,
      cachePool: s
    }, t !== null && Xu(e, null), mr(), Zd(e), t !== null && _i(t, e, i, !0), e.childLanes = u, null;
  }
  function us(t, e) {
    return e = ss(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Xm(t, e, n) {
    return Li(e, t.child, null, n), t = us(e, e.pendingProps), t.flags |= 2, Ve(e), e.memoizedState = null, t;
  }
  function US(t, e, n) {
    var i = e.pendingProps, u = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (rt) {
        if (i.mode === "hidden")
          return t = us(e, i), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, xl(null, t);
        if (gr(e), (t = wt) ? (t = yg(
          t,
          Qe
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: cn, overflow: fn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = xd(t), n.return = e, e.child = n, ee = e, wt = null)) : t = null, t === null) throw Pn(e);
        return e.lanes = 536870912, null;
      }
      return us(e, i);
    }
    var s = t.memoizedState;
    if (s !== null) {
      var f = s.dehydrated;
      if (gr(e), u)
        if (e.flags & 256)
          e.flags &= -257, e = Xm(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(o(558));
      else if (Kt || _i(t, e, n, !1), u = (n & t.childLanes) !== 0, Kt || u) {
        if (ei.current === null) {
          if (i = _t, i !== null && (f = zh(i, n), f !== 0 && f !== s.retryLane))
            throw s.retryLane = f, Oi(t, f), xe(i, t, f), Hr;
          xs();
        }
        e = Xm(
          t,
          e,
          n
        );
      } else
        t = s.treeContext, wt = Ke(f.nextSibling), ee = e, rt = !0, Fn = null, Qe = !1, t !== null && zd(e, t), e = us(e, i), e.flags |= 134221824;
      return e;
    }
    return t = Rn(t.child, {
      mode: i.mode,
      children: i.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Aa(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Lr(t, e, n, i, u) {
    return Vi(e), n = Sr(
      t,
      e,
      n,
      i,
      void 0,
      u
    ), i = Tr(), t !== null && !Kt ? (br(t, e, u), Bn(t, e, u)) : (rt && i && Lu(e), e.flags |= 1, Pt(t, e, n, u), e.child);
  }
  function Qm(t, e, n, i, u, s) {
    return Vi(e), e.updateQueue = null, n = Jd(
      e,
      i,
      n,
      u
    ), Kd(t), i = Tr(), t !== null && !Kt ? (br(t, e, s), Bn(t, e, s)) : (rt && i && Lu(e), e.flags |= 1, Pt(t, e, n, s), e.child);
  }
  function Zm(t, e, n, i, u) {
    if (Vi(e), e.stateNode === null) {
      var s = da, f = n.contextType;
      typeof f == "object" && f !== null && (s = ue(f)), s = new n(i, s), e.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = wr, e.stateNode = s, s._reactInternals = e, s = e.stateNode, s.props = i, s.state = e.memoizedState, s.refs = {}, cr(e), f = n.contextType, s.context = typeof f == "object" && f !== null ? ue(f) : da, s.state = e.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Ur(
        e,
        n,
        f,
        i
      ), s.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (f = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), f !== s.state && wr.enqueueReplaceState(s, s.state, null), bl(e, i, s, u), Tl(), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308), i = !0;
    } else if (t === null) {
      s = e.stateNode;
      var m = e.memoizedProps, T = Yi(n, m);
      s.props = T;
      var x = s.context, R = n.contextType;
      f = da, typeof R == "object" && R !== null && (f = ue(R));
      var V = n.getDerivedStateFromProps;
      R = typeof V == "function" || typeof s.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, R || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (m || x !== f) && Nm(
        e,
        s,
        i,
        f
      ), In = !1;
      var M = e.memoizedState;
      s.state = M, bl(e, i, s, u), Tl(), x = e.memoizedState, m || M !== x || In ? (typeof V == "function" && (Ur(
        e,
        n,
        V,
        i
      ), x = e.memoizedState), (T = In || Rm(
        e,
        n,
        T,
        i,
        M,
        x,
        f
      )) ? (R || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = x), s.props = i, s.state = x, s.context = f, i = T) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
    } else {
      s = e.stateNode, fr(t, e), f = e.memoizedProps, R = Yi(n, f), s.props = R, V = e.pendingProps, M = s.context, x = n.contextType, T = da, typeof x == "object" && x !== null && (T = ue(x)), m = n.getDerivedStateFromProps, (x = typeof m == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (f !== V || M !== T) && Nm(
        e,
        s,
        i,
        T
      ), In = !1, M = e.memoizedState, s.state = M, bl(e, i, s, u), Tl();
      var O = e.memoizedState;
      f !== V || M !== O || In || t !== null && t.dependencies !== null && Gu(t.dependencies) ? (typeof m == "function" && (Ur(
        e,
        n,
        m,
        i
      ), O = e.memoizedState), (R = In || Rm(
        e,
        n,
        R,
        i,
        M,
        O,
        T
      ) || t !== null && t.dependencies !== null && Gu(t.dependencies)) ? (x || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, O, T), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        i,
        O,
        T
      )), typeof s.componentDidUpdate == "function" && (e.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = O), s.props = i, s.state = O, s.context = T, i = R) : (typeof s.componentDidUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && M === t.memoizedState || (e.flags |= 1024), i = !1);
    }
    return s = i, Aa(t, e), i = (e.flags & 128) !== 0, s || i ? (s = e.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : s.render(), e.flags |= 1, t !== null && i ? (e.child = Li(
      e,
      t.child,
      null,
      u
    ), e.child = Li(
      e,
      null,
      n,
      u
    )) : Pt(t, e, n, u), e.memoizedState = s.state, t = e.child) : t = Bn(
      t,
      e,
      u
    ), t;
  }
  function Km(t, e, n, i) {
    return Ri(), e.flags |= 256, Pt(t, e, n, i), e.child;
  }
  var jr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Yr(t) {
    return { baseLanes: t, cachePool: wd() };
  }
  function Gr(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Be), t;
  }
  function Jm(t, e, n) {
    var i = e.pendingProps, u = !1, s = (e.flags & 128) !== 0, f;
    if ((f = s) || (f = t !== null && t.memoizedState === null ? !1 : (oe.current & 2) !== 0), f && (u = !0, e.flags &= -129), f = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (rt) {
        if (u ? ni(e) : ii(), (t = wt) ? (t = yg(
          t,
          Qe
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: cn, overflow: fn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = xd(t), n.return = e, e.child = n, ee = e, wt = null)) : t = null, t === null) throw Pn(e);
        return Yc(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return s = i.children, i = i.fallback, u ? (ii(), u = e.mode, s = ss(
        { mode: "hidden", children: s },
        u
      ), i = zi(
        i,
        u,
        n,
        null
      ), s.return = e, i.return = e, s.sibling = i, e.child = s, i = e.child, i.memoizedState = Yr(n), i.childLanes = Gr(
        t,
        f,
        n
      ), e.memoizedState = jr, xl(null, i)) : (ni(e), qr(e, s));
    }
    var m = t.memoizedState;
    if (m !== null) {
      var T = m.dehydrated;
      if (T !== null)
        return wS(
          t,
          e,
          s,
          f,
          i,
          T,
          m,
          n
        );
    }
    return u ? (ii(), u = i.fallback, s = e.mode, m = t.child, T = m.sibling, i = Rn(m, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = m.subtreeFlags & 1206910976, T !== null ? u = Rn(T, u) : (u = zi(
      u,
      s,
      n,
      null
    ), u.flags |= 2), u.return = e, i.return = e, i.sibling = u, e.child = i, xl(null, i), i = e.child, u = t.child.memoizedState, u === null ? u = Yr(n) : (s = u.cachePool, s !== null ? (m = Qt._currentValue, s = s.parent !== m ? { parent: m, pool: m } : s) : s = wd(), u = {
      baseLanes: u.baseLanes | n,
      cachePool: s
    }), i.memoizedState = u, i.childLanes = Gr(
      t,
      f,
      n
    ), e.memoizedState = jr, xl(t.child, i)) : (ni(e), n = t.child, t = n.sibling, n = Rn(n, {
      mode: "visible",
      children: i.children
    }), n.return = e, n.sibling = null, t !== null && (f = e.deletions, f === null ? (e.deletions = [t], e.flags |= 16) : f.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function qr(t, e) {
    return e = ss(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function ss(t, e) {
    return t = Ee(22, t, null, e), t.lanes = 0, t;
  }
  function os(t, e, n) {
    return Li(e, t.child, null, n), t = qr(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function wS(t, e, n, i, u, s, f, m) {
    if (n)
      return e.flags & 256 ? (ni(e), e.flags &= -257, os(
        t,
        e,
        m
      )) : e.memoizedState !== null ? (ii(), e.child = t.child, e.flags |= 128, null) : (ii(), s = u.fallback, f = e.mode, u = ss(
        { mode: "visible", children: u.children },
        f
      ), s = zi(
        s,
        f,
        m,
        null
      ), s.flags |= 2, u.return = e, s.return = e, u.sibling = s, e.child = u, Li(e, t.child, null, m), u = e.child, u.memoizedState = Yr(m), u.childLanes = Gr(
        t,
        i,
        m
      ), e.memoizedState = jr, xl(null, u));
    if (ni(e), Yc(s)) {
      if (i = s.nextSibling && s.nextSibling.dataset, i) var T = i.dgst;
      return i = T, i !== "" && (u = Error(o(419)), u.stack = "", u.digest = i, ml({ value: u, source: null, stack: null })), os(
        t,
        e,
        m
      );
    }
    if (Kt || _i(t, e, m, !1), i = (m & t.childLanes) !== 0, Kt || i) {
      if (ei.current !== null)
        return os(
          t,
          e,
          m
        );
      if (i = _t, i !== null && (u = zh(
        i,
        m
      ), u !== 0 && u !== f.retryLane))
        throw f.retryLane = u, Oi(t, u), xe(i, t, u), Hr;
      return jc(s) || xs(), os(
        t,
        e,
        m
      );
    }
    return jc(s) ? (e.flags |= 192, e.child = t.child, null) : (t = f.treeContext, wt = Ke(s.nextSibling), ee = e, rt = !0, Fn = null, Qe = !1, t !== null && zd(e, t), e = qr(
      e,
      u.children
    ), e.flags |= 134221824, e);
  }
  function Fm(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    i !== null && (i.lanes |= e), Yu(t.return, e, n);
  }
  function Pm(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Pu(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function rs(t, e, n, i, u, s) {
    var f = t.memoizedState;
    f === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: u,
      treeForkCount: s
    } : (f.isBackwards = e, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = n, f.tailMode = u, f.treeForkCount = s);
  }
  function Xr(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Qr(t, e, n) {
    var i = e.pendingProps, u = i.revealOrder, s = i.tail;
    i = i.children;
    var f = oe.current;
    if (e.flags & 128)
      return El(e, f), null;
    var m = (f & 2) !== 0;
    if (m ? (f = f & 1 | 2, e.flags |= 128) : f &= 1, El(e, f), u === "backwards" && t !== null ? (Xr(t), Pt(t, e, i, n), Xr(t)) : Pt(t, e, i, n), i = rt ? dl : 0, !m && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Fm(t, n, e);
        else if (t.tag === 19)
          Fm(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "backwards":
        n = Pm(e.child), n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null, Xr(e)), rs(
          e,
          !0,
          u,
          null,
          s,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, u = e.child, e.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Pu(t) === null) {
            e.child = u;
            break;
          }
          t = u.sibling, u.sibling = n, n = u, u = t;
        }
        rs(
          e,
          !0,
          n,
          null,
          s,
          i
        );
        break;
      case "together":
        rs(
          e,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        n = Pm(e.child), n === null ? (u = e.child, e.child = null) : (u = n.sibling, n.sibling = null), rs(
          e,
          !1,
          u,
          n,
          s,
          i
        );
    }
    return e.child;
  }
  function km(t, e, n) {
    var i = e.pendingProps;
    return kn(e, e.type, i.value), Pt(t, e, i.children, n), e.child;
  }
  function Bn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), si |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (_i(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, n = Rn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Rn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Zr(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Gu(t)));
  }
  function BS(t, e, n) {
    switch (e.tag) {
      case 3:
        mu(e, e.stateNode.containerInfo), kn(e, Qt, t.memoizedState.cache), Ri();
        break;
      case 27:
      case 5:
        po(e);
        break;
      case 4:
        mu(e, e.stateNode.containerInfo);
        break;
      case 10:
        kn(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, gr(e), null;
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return ni(e), e.flags |= 128, null;
          i = _i(
            t,
            e,
            n,
            !1
          );
          var u = e.child.childLanes;
          return i || (n & u) !== 0 ? Jm(t, e, n) : (ni(e), t = Bn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        ni(e);
        break;
      case 19:
        if (e.flags & 128)
          return Qr(
            t,
            e,
            n
          );
        if (u = (t.flags & 128) !== 0, i = (n & e.childLanes) !== 0, i || (_i(
          t,
          e,
          n,
          !1
        ), i = (n & e.childLanes) !== 0), u) {
          if (i)
            return Qr(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (u = e.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), El(e, oe.current), i) break;
        return null;
      case 22:
        return e.lanes = 0, Gm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        kn(e, Qt, t.memoizedState.cache);
    }
    return Bn(t, e, n);
  }
  function Wm(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Kt = !0;
      else {
        if (!Zr(t, n) && (e.flags & 128) === 0)
          return Kt = !1, BS(
            t,
            e,
            n
          );
        Kt = (t.flags & 131072) !== 0;
      }
    else
      Kt = !1, rt && (e.flags & 1048576) !== 0 && Od(e, dl, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (t = Bi(e.elementType), e.type = t, typeof t == "function")
            Io(t) ? (i = Yi(t, i), e.tag = 1, e = Zm(
              null,
              e,
              t,
              i,
              n
            )) : (e.tag = 0, e = Lr(
              null,
              e,
              t,
              i,
              n
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === L) {
                e.tag = 11, e = Lm(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (u === ot) {
                e.tag = 14, e = jm(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (u === Rt) {
                e.tag = 10, e.type = t, e = km(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = St(t) || t, Error(o(306, e, ""));
          }
        }
        return e;
      case 0:
        return Lr(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return i = e.type, u = Yi(
          i,
          e.pendingProps
        ), Zm(
          t,
          e,
          i,
          u,
          n
        );
      case 3:
        t: {
          if (mu(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          i = e.pendingProps;
          var s = e.memoizedState;
          u = s.element, fr(t, e), bl(e, i, null, n);
          var f = e.memoizedState;
          if (i = f.cache, kn(e, Qt, i), i !== s.cache && lr(
            e,
            [Qt],
            n,
            !0
          ), Tl(), i = f.element, s.isDehydrated)
            if (s = {
              element: i,
              isDehydrated: !1,
              cache: f.cache
            }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
              e = Km(
                t,
                e,
                i,
                n
              );
              break t;
            } else if (i !== u) {
              u = Ge(
                Error(o(424)),
                e
              ), ml(u), e = Km(
                t,
                e,
                i,
                n
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (wt = Ke(t.firstChild), ee = e, rt = !0, Fn = null, Qe = !0, n = Gd(
                e,
                null,
                i,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
            }
          else {
            if (Ri(), i === u) {
              e = Bn(
                t,
                e,
                n
              );
              break t;
            }
            Pt(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Aa(t, e), t === null ? (n = Eg(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : rt || (e.stateNode = eg(
          e.type,
          e.pendingProps,
          qn.current,
          e
        )) : e.memoizedState = Eg(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return po(e), t === null && rt && (i = e.stateNode = pg(
          e.type,
          e.pendingProps,
          qn.current
        ), ee = e, Qe = !0, u = wt, fi(e.type) ? (Gc = u, wt = Ke(i.firstChild)) : wt = u), Pt(
          t,
          e,
          e.pendingProps.children,
          n
        ), Aa(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && rt && ((u = i = wt) && (i = RT(
          i,
          e.type,
          e.pendingProps,
          Qe
        ), i !== null ? (e.stateNode = i, ee = e, wt = Ke(i.firstChild), Qe = !1, u = !0) : u = !1), u || Pn(e)), po(e), u = e.type, s = e.pendingProps, f = t !== null ? t.memoizedProps : null, i = s.children, _c(u, s) ? i = null : f !== null && _c(u, f) && (e.flags |= 32), e.memoizedState !== null && (u = Sr(
          t,
          e,
          DS,
          null,
          null,
          n
        ), Ga._currentValue = u), Aa(t, e), Pt(t, e, i, n), e.child;
      case 6:
        return t === null && rt && ((t = n = wt) && (n = NT(
          n,
          e.pendingProps,
          Qe
        ), n !== null ? (e.stateNode = n, ee = e, wt = null, t = !0) : t = !1), t || Pn(e)), null;
      case 13:
        return Jm(t, e, n);
      case 4:
        return mu(
          e,
          e.stateNode.containerInfo
        ), i = e.pendingProps, t === null ? e.child = Li(
          e,
          null,
          i,
          n
        ) : Pt(t, e, i, n), e.child;
      case 11:
        return Lm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return i = e.pendingProps, Aa(t, e), Pt(t, e, i, n), e.child;
      case 8:
        return Pt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Pt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return km(t, e, n);
      case 9:
        return u = e.type._context, i = e.pendingProps.children, Vi(e), u = ue(u), i = i(u), e.flags |= 1, Pt(t, e, i, n), e.child;
      case 14:
        return jm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Ym(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Qr(t, e, n);
      case 31:
        return US(t, e, n);
      case 22:
        return Gm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Vi(e), i = ue(Qt), t === null ? (u = or(), u === null && (u = _t, s = ur(), u.pooledCache = s, s.refCount++, s !== null && (u.pooledCacheLanes |= n), u = s), e.memoizedState = { parent: i, cache: u }, cr(e), kn(e, Qt, u)) : ((t.lanes & n) !== 0 && (fr(t, e), bl(e, null, null, n), Tl()), u = t.memoizedState, s = e.memoizedState, u.parent !== i ? (u = { parent: i, cache: i }, e.memoizedState = u, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u), kn(e, Qt, i)) : (i = s.cache, kn(e, Qt, i), i !== u.cache && lr(
          e,
          [Qt],
          n,
          !0
        ))), Pt(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), i = e.pendingProps, i.name != null && i.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : rt && Lu(e), t !== null && t.memoizedProps.name !== i.name ? e.flags |= 4194816 : Aa(t, e), Pt(t, e, i.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Hn(t) {
    t.flags |= 4;
  }
  function Kr(t, e, n, i, u) {
    var s;
    if ((s = (t.mode & 32) !== 0) && (s = n === null ? xg(e, i) : xg(e, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), s) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (_y()) t.flags |= 8192;
        else
          throw Hi = Zu, rr;
    } else t.flags &= -16777217;
  }
  function Im(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Cg(e))
      if (_y()) t.flags |= 8192;
      else
        throw Hi = Zu, rr;
  }
  function cs(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? xh() : 536870912, t.lanes |= e, Oa |= e);
  }
  function Cl(t, e) {
    if (!rt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = t.tail, i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
          break;
        default:
          for (e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
      }
  }
  function Bt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
    if (e)
      for (var u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags & 1206910976, i |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags, i |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= i, t.childLanes = n, e;
  }
  function HS(t, e, n) {
    var i = e.pendingProps;
    switch (er(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Bt(e), null;
      case 1:
        return Bt(e), null;
      case 3:
        return n = e.stateNode, i = null, t !== null && (i = t.memoizedState.cache), e.memoizedState.cache !== i && (e.flags |= 2048), Vn(Qt), ta(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (ga(e) ? Hn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ir())), Bt(e), null;
      case 26:
        var u = e.type, s = e.memoizedState;
        return t === null ? (Hn(e), s !== null ? (Bt(e), Im(e, s)) : (Bt(e), Kr(
          e,
          u,
          null,
          i,
          n
        ))) : s ? s !== t.memoizedState ? (Hn(e), Bt(e), Im(e, s)) : (Bt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== i && Hn(e), Bt(e), Kr(
          e,
          u,
          t,
          i,
          n
        )), null;
      case 27:
        if (yu(e), n = qn.current, u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Hn(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Bt(e), e.subtreeFlags &= -33554433, null;
          }
          t = on.current, ga(e) ? Rd(e) : (t = pg(u, i, n), e.stateNode = t, Hn(e));
        }
        return Bt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (yu(e), u = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Hn(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Bt(e), e.subtreeFlags &= -33554433, null;
          }
          if (s = on.current, ga(e))
            Rd(e);
          else {
            var f = Ll(
              qn.current
            );
            switch (s) {
              case 1:
                s = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                s = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    s = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    s = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    s = f.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(
                      s.firstChild
                    );
                    break;
                  case "select":
                    s = typeof i.is == "string" ? f.createElement("select", {
                      is: i.is
                    }) : f.createElement("select"), i.multiple ? s.multiple = !0 : i.size && (s.size = i.size);
                    break;
                  default:
                    s = typeof i.is == "string" ? f.createElement(u, { is: i.is }) : f.createElement(u);
                }
            }
            s[le] = e, s[be] = i;
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                s.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e)
                  break t;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            e.stateNode = s;
            t: switch (ce(s, u, i), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
            i && Hn(e);
          }
        }
        return Bt(e), e.subtreeFlags &= -33554433, Kr(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== i && Hn(e);
        else {
          if (typeof i != "string" && e.stateNode === null)
            throw Error(o(166));
          if (t = qn.current, ga(e)) {
            if (t = e.stateNode, n = e.memoizedProps, i = null, u = ee, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            t[le] = e, t = !!(t.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || Wy(t.nodeValue, n)), t || Pn(e, !0);
          } else
            t = Ll(t).createTextNode(
              i
            ), t[le] = e, e.stateNode = t;
        }
        return Bt(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (i = ga(e), n !== null) {
            if (t === null) {
              if (!i) throw Error(o(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[le] = e;
            } else
              Ri(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Bt(e), t = !1;
          } else
            n = ir(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Bt(e), null;
      case 13:
        if (i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = ga(e), i !== null && i.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(o(318));
              if (u = e.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[le] = e;
            } else
              Ri(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Bt(e), u = !1;
          } else
            u = ir(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
        }
        return Ve(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = i !== null, t = t !== null && t.memoizedState !== null, n && (i = e.child, u = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (u = i.alternate.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== u && (i.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), cs(e, e.updateQueue), Bt(e), null);
      case 4:
        return ta(), t === null && Cc(e.stateNode.containerInfo), e.flags |= 67108864, Bt(e), null;
      case 10:
        return Vn(e.type), Bt(e), null;
      case 19:
        if (vr(e), i = e.memoizedState, i === null) return Bt(e), null;
        if (u = (e.flags & 128) !== 0, s = i.rendering, s === null)
          if (u) Cl(i, !1);
          else {
            if (qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (s = Pu(t), s !== null) {
                  for (e.flags |= 128, Cl(i, !1), t = s.updateQueue, e.updateQueue = t, cs(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    Dd(n, t), n = n.sibling;
                  return El(
                    e,
                    oe.current & 1 | 2
                  ), rt && Nn(e, i.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            i.tail !== null && Oe() > Es && (e.flags |= 128, u = !0, Cl(i, !1), e.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Pu(s), t !== null) {
              if (e.flags |= 128, u = !0, t = t.updateQueue, e.updateQueue = t, cs(e, t), Cl(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !s.alternate && !rt)
                return Bt(e), null;
            } else
              2 * Oe() - i.renderingStartTime > Es && n !== 536870912 && (e.flags |= 128, u = !0, Cl(i, !1), e.lanes = 4194304);
          i.isBackwards ? (s.sibling = e.child, e.child = s) : (t = i.last, t !== null ? t.sibling = s : e.child = s, i.last = s);
        }
        if (i.tail !== null) {
          t = i.tail;
          t: {
            for (n = t; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break t;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Oe(), t.sibling = null, s = oe.current, s = u ? s & 1 | 2 : s & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || rt ? El(e, s) : (n = s, Ut(se, e), Ut(oe, n), me === null && (me = e)), rt && Nn(e, i.treeForkCount), t;
        }
        return Bt(e), null;
      case 22:
      case 23:
        return Ve(e), yr(), i = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== i && (e.flags |= 8192) : i && (e.flags |= 8192), i ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Bt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Bt(e), n = e.updateQueue, n !== null && cs(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), i = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), i !== n && (e.flags |= 2048), t !== null && ae(wi), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Vn(Qt), Bt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Bt(e), null;
    }
    throw Error(o(156, e.tag));
  }
  function LS(t, e) {
    switch (er(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Vn(Qt), ta(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return yu(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ve(e), e.alternate === null)
            throw Error(o(340));
          Ri();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ve(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(o(340));
          Ri();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return vr(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return ta(), null;
      case 10:
        return Vn(e.type), null;
      case 22:
      case 23:
        return Ve(e), yr(), t !== null && ae(wi), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Vn(Qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $m(t, e) {
    switch (er(e), e.tag) {
      case 3:
        Vn(Qt), ta();
        break;
      case 26:
      case 27:
      case 5:
        yu(e);
        break;
      case 4:
        ta();
        break;
      case 31:
        e.memoizedState !== null && Ve(e);
        break;
      case 13:
        Ve(e);
        break;
      case 19:
        vr(e);
        break;
      case 10:
        Vn(e.type);
        break;
      case 22:
      case 23:
        Ve(e), yr(), t !== null && ae(wi);
        break;
      case 24:
        Vn(Qt);
    }
  }
  function Ol(t, e) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        n = u;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var s = n.create, f = n.inst;
            i = s(), f.destroy = i;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (m) {
      Dt(e, e.return, m);
    }
  }
  function ai(t, e, n) {
    try {
      var i = e.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next;
        i = s;
        do {
          if ((i.tag & t) === t) {
            var f = i.inst, m = f.destroy;
            if (m !== void 0) {
              f.destroy = void 0, u = e;
              var T = n, x = m;
              try {
                x();
              } catch (R) {
                Dt(
                  u,
                  T,
                  R
                );
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (R) {
      Dt(e, e.return, R);
    }
  }
  function ty(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        Xd(e, n);
      } catch (i) {
        Dt(t, t.return, i);
      }
    }
  }
  function ey(t, e, n) {
    n.props = Yi(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      Dt(t, e, i);
    }
  }
  function hn(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var i = t.stateNode;
            break;
          case 30:
            var u = t.stateNode, s = On(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== s) && (u.ref = og(s)), i = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var f = new Le(t);
              g(
                t.child,
                !1,
                OT,
                f,
                void 0,
                void 0
              ), t.stateNode = f;
            }
            i = t.stateNode;
            break;
          default:
            i = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(i) : n.current = i;
      }
    } catch (m) {
      Dt(t, e, m);
    }
  }
  function re(t, e) {
    var n = t.ref, i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          Dt(t, e, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Dt(t, e, u);
        }
      else n.current = null;
  }
  function fs(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        mg(
          t.stateNode,
          e[n]
        );
  }
  function ny(t) {
    for (var e = t.return; e !== null && (Fr(e) && mg(t.stateNode, e.stateNode), !Jr(e)); )
      e = e.return;
  }
  function zl(t) {
    for (var e = t.return; e !== null && (Fr(e) && zT(t.stateNode, e.stateNode), !Jr(e)); )
      e = e.return;
  }
  function Jr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Fr(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Pr(t) {
    var e = t.type, n = t.memoizedProps, i = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break t;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (u) {
      Dt(t, t.return, u);
    }
  }
  function kr(t, e, n) {
    try {
      var i = t.stateNode;
      cT(i, t.type, n, e), i[be] = e;
    } catch (u) {
      Dt(t, t.return, u);
    }
  }
  function iy(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && fi(t.type) || t.tag === 4;
  }
  function Wr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || iy(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && fi(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ir(t, e, n, i) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(u, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(u), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = rn)), fs(t, i), Tt = !0;
    else if (u !== 4 && (u === 27 && (fs(t, i), i = null, fi(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Ir(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        Ir(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function hs(t, e, n, i) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, e ? n.insertBefore(u, e) : n.appendChild(u), fs(t, i), Tt = !0;
    else if (u !== 4 && (u === 27 && (fs(t, i), i = null, fi(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (hs(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        hs(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function ay(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var i = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      ce(e, i, n), e[le] = t, e[be] = n;
    } catch (s) {
      Dt(t, t.return, s);
    }
  }
  var ds = !1, Ue = null;
  function ly(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ds = !0);
  }
  var dn = null;
  function uy() {
    var t = dn;
    return dn = null, t;
  }
  var Ae = 0;
  function Ma(t, e, n, i, u) {
    return Ae = 0, sy(
      t.child,
      e,
      n,
      i,
      u
    );
  }
  function sy(t, e, n, i, u) {
    for (var s = !1; t !== null; ) {
      if (t.tag === 5) {
        var f = t.stateNode;
        if (i !== null) {
          var m = wc(f);
          i.push(m), m.view && (s = !0);
        } else
          s || wc(f).view && (s = !0);
        ds = !0, ug(
          f,
          Ae === 0 ? e : e + "_" + Ae,
          n
        ), Ae++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || sy(
        t.child,
        e,
        n,
        i,
        u
      ) && (s = !0));
      t = t.sibling;
    }
    return s;
  }
  function mn(t, e) {
    for (; t !== null; )
      t.tag === 5 ? sg(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || mn(
        t.child,
        e
      )), t = t.sibling;
  }
  function ms(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (ms(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(o(544));
          var n = e.name;
          e = zn(e.default, e.share), e !== "none" && (Ma(
            t,
            n,
            e,
            null,
            !1
          ) || mn(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function $r(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, i = t.memoizedProps, u = On(i, n), s = zn(
        i.default,
        n.paired ? i.share : i.enter
      );
      s !== "none" ? Ma(t, u, s, null, !1) ? (ms(t), n.paired || e || _a(t, i.onEnter)) : mn(t.child, !1) : ms(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        $r(t, e), t = t.sibling;
    else ms(t);
  }
  function tc(t) {
    if (Ue !== null && Ue.size !== 0) {
      var e = Ue;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var u = e.get(i);
                if (u !== void 0) {
                  var s = zn(
                    n.default,
                    n.share
                  );
                  if (s !== "none" && (Ma(
                    t,
                    i,
                    s,
                    null,
                    !1
                  ) ? (s = t.stateNode, u.paired = s, s.paired = u, _a(t, n.onShare)) : mn(t.child, !1)), e.delete(i), e.size === 0) break;
                }
              }
            }
            tc(t);
          }
          t = t.sibling;
        }
    }
  }
  function ec(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = On(e, t.stateNode), i = Ue !== null ? Ue.get(n) : void 0, u = zn(
        e.default,
        i !== void 0 ? e.share : e.exit
      );
      u !== "none" && (Ma(t, n, u, null, !1) ? i !== void 0 ? (u = t.stateNode, i.paired = u, u.paired = i, Ue.delete(n), _a(t, e.onShare)) : _a(t, e.onExit) : mn(t.child, !1)), Ue !== null && tc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ec(t), t = t.sibling;
    else
      Ue !== null && tc(t);
  }
  function oy(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = On(e, t.stateNode);
        e = zn(e.default, e.update), t.flags &= -5, e !== "none" && Ma(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && oy(t);
      t = t.sibling;
    }
  }
  function nc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, mn(t.child, !1));
          }
          nc(t);
        }
        t = t.sibling;
      }
  }
  function ys(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, mn(t.child, !1), nc(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ys(t), t = t.sibling;
    else nc(t);
  }
  function ry(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? mn(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && ry(t), t = t.sibling;
  }
  function ic(t, e, n, i, u, s, f) {
    for (var m = !1; e !== null; ) {
      if (e.tag === 5) {
        var T = e.stateNode;
        if (s !== null && Ae < s.length) {
          var x = s[Ae], R = wc(T);
          (x.view || R.view) && (m = !0);
          var V;
          if (V = (t.flags & 4) === 0)
            if (R.clip) V = !0;
            else {
              V = x.rect;
              var M = R.rect;
              V = V.y !== M.y || V.x !== M.x || V.height !== M.height || V.width !== M.width;
            }
          V && (t.flags |= 4), R.abs ? R = !x.abs : (x = x.rect, R = R.rect, R = x.height !== R.height || x.width !== R.width), R && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && ug(
          T,
          Ae === 0 ? n : n + "_" + Ae,
          u
        ), m && (t.flags & 4) !== 0 || (dn === null && (dn = []), dn.push(
          T,
          Ae === 0 ? i : i + "_" + Ae,
          e.memoizedProps
        )), Ae++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && f ? t.flags |= e.flags & 32 : ic(
        t,
        e.child,
        n,
        i,
        u,
        s,
        f
      ) && (m = !0));
      e = e.sibling;
    }
    return m;
  }
  function cy(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, i = t.stateNode, u = On(n, i), s = zn(n.default, n.update), f;
        f = t.memoizedState, t.memoizedState = null, i = t;
        var m = t.child;
        Ae = 0, u = ic(
          i,
          m,
          u,
          u,
          s,
          f,
          !1
        ), (t.flags & 4) !== 0 && u && _a(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && cy(t);
      t = t.sibling;
    }
  }
  var ne = !1, At = !1, yn = !1, ac = !1, fy = typeof WeakSet == "function" ? WeakSet : Set, ie = null, gn = !1, Rl = !1, gs = !1, lc = !1;
  function jS(t, e, n) {
    if (t = t.containerInfo, Rc = qa, t = yd(t), Zo(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var u = i.getSelection && i.getSelection();
          if (u && u.rangeCount !== 0) {
            i = u.anchorNode;
            var s = u.anchorOffset, f = u.focusNode;
            u = u.focusOffset;
            try {
              i.nodeType, f.nodeType;
            } catch {
              i = null;
              break t;
            }
            var m = 0, T = -1, x = -1, R = 0, V = 0, M = t, O = null;
            e: for (; ; ) {
              for (var Y; M !== i || s !== 0 && M.nodeType !== 3 || (T = m + s), M !== f || u !== 0 && M.nodeType !== 3 || (x = m + u), M.nodeType === 3 && (m += M.nodeValue.length), (Y = M.firstChild) !== null; )
                O = M, M = Y;
              for (; ; ) {
                if (M === t) break e;
                if (O === i && ++R === s && (T = m), O === f && ++V === u && (x = m), (Y = M.nextSibling) !== null) break;
                M = O, O = M.parentNode;
              }
              M = Y;
            }
            i = T === -1 || x === -1 ? null : { start: T, end: x };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Nc = { focusedElem: t, selectionRange: i }, qa = !1, n = (n & 335544064) === n, ie = e, e = n ? 9270 : 1024; ie !== null; ) {
      if (t = ie, n && (i = t.deletions, i !== null))
        for (s = 0; s < i.length; s++)
          n && ec(i[s]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && ly(t), vs(n);
      else {
        if (t.tag === 22) {
          if (i = t.alternate, t.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && ec(i), vs(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && ly(t), vs(n);
            continue;
          }
        }
        i = t.child, (t.subtreeFlags & e) !== 0 && i !== null ? (i.return = t, ie = i) : (n && oy(t), vs(n));
      }
    }
    Ue = null;
  }
  function vs(t) {
    for (; ie !== null; ) {
      var e = ie, n = t, i = e.alternate, u = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && i !== null) {
            n = void 0, u = i.memoizedProps, i = i.memoizedState;
            var s = e.stateNode;
            try {
              var f = Yi(
                e.type,
                u
              );
              n = s.getSnapshotBeforeUpdate(
                f,
                i
              ), s.__reactInternalSnapshotBeforeUpdate = n;
            } catch (m) {
              Dt(e, e.return, m);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (i = e.stateNode.containerInfo, n = i.nodeType, n === 9)
              Lc(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Lc(i);
                  break;
                default:
                  i.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && i !== null && (n = On(
            i.memoizedProps,
            i.stateNode
          ), u = e.memoizedProps, u = zn(u.default, u.update), u !== "none" && Ma(
            i,
            n,
            u,
            i.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(o(163));
      }
      if (i = e.sibling, i !== null) {
        i.return = e.return, ie = i;
        break;
      }
      ie = e.return;
    }
  }
  function hy(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        vn(t, n), i & 4 && Ol(5, n);
        break;
      case 1:
        if (vn(t, n), i & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (f) {
              Dt(n, n.return, f);
            }
          else {
            var u = Yi(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              Dt(
                n,
                n.return,
                f
              );
            }
          }
        i & 64 && ty(n), i & 512 && hn(n, n.return);
        break;
      case 3:
        if (vn(t, n), i & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            Xd(t, e);
          } catch (f) {
            Dt(n, n.return, f);
          }
        }
        break;
      case 27:
        e === null && i & 4 && ay(n);
      case 26:
      case 5:
        vn(t, n), e === null && i & 4 && Pr(n), i & 512 && hn(n, n.return);
        break;
      case 12:
        vn(t, n);
        break;
      case 31:
        vn(t, n), i & 4 && gy(t, n);
        break;
      case 13:
        vn(t, n), i & 4 && vy(t, n), i & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = WS.bind(
          null,
          n
        ), _T(t, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || ne, !i) {
          var s = e !== null && e.memoizedState !== null || At;
          e = ne, u = At, ne = i, (At = s) && !u ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), tn(
            t,
            n,
            i
          )) : vn(t, n), ne = e, At = u;
        }
        break;
      case 30:
        vn(t, n), i & 512 && hn(n, n.return);
        break;
      case 7:
        i & 512 && hn(n, n.return);
      default:
        vn(t, n);
    }
  }
  function uc(t, e) {
    for (t = t.child; t !== null; )
      dy(t, e), t = t.sibling;
  }
  function dy(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var u = t.stateNode, s = t.memoizedProps.style, f = s != null && s.hasOwnProperty("display") ? s.display : null;
            u.style.display = f == null || typeof f == "boolean" ? "" : ("" + f).trim();
          }
        } catch (T) {
          Dt(t, t.return, T);
        }
        sc(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Tt = !0;
        } catch (T) {
          Dt(t, t.return, T);
        }
        break;
      case 18:
        try {
          var m = t.stateNode;
          e ? lg(m, !0) : lg(t.stateNode, !1);
        } catch (T) {
          Dt(t, t.return, T);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && uc(t, e);
        break;
      default:
        uc(t, e);
    }
  }
  function sc(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, i = e;
          switch (n.tag) {
            case 4:
              dy(n, i);
              break t;
            case 22:
              n.memoizedState === null && sc(n, i);
              break t;
            default:
              sc(n, i);
          }
        }
        t = t.sibling;
      }
  }
  function my(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, my(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Eu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ht = null, Me = !1;
  function Ie(t, e, n) {
    for (n = n.child; n !== null; )
      yy(t, e, n), n = n.sibling;
  }
  function yy(t, e, n) {
    if (ze && typeof ze.onCommitFiberUnmount == "function")
      try {
        ze.onCommitFiberUnmount($a, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        At || re(n, e), Ie(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !At && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        At || re(n, e), zl(n);
        var i = Ht, u = Me;
        fi(n.type) && (Ht = n.stateNode, Me = !1), Ie(
          t,
          e,
          n
        ), Sg(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Ht = i, Me = u;
        break;
      case 5:
        At || re(n, e), zl(n);
      case 6:
        if (n.tag === 6 && zl(n), i = Ht, u = Me, Ht = null, Ie(
          t,
          e,
          n
        ), Ht = i, Me = u, Ht !== null)
          if (Me)
            try {
              (Ht.nodeType === 9 ? Ht.body : Ht.nodeName === "HTML" ? Ht.ownerDocument.body : Ht).removeChild(n.stateNode), Tt = !0;
            } catch (s) {
              Dt(
                n,
                e,
                s
              );
            }
          else
            try {
              Ht.removeChild(n.stateNode), Tt = !0;
            } catch (s) {
              Dt(
                n,
                e,
                s
              );
            }
        break;
      case 18:
        Ht !== null && (Me ? (t = Ht, ag(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), Xa(t)) : ag(Ht, n.stateNode));
        break;
      case 4:
        i = Ht, u = Me, Ht = n.stateNode.containerInfo, Me = !0, Ie(
          t,
          e,
          n
        ), Ht = i, Me = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ai(2, n, e), At || ai(4, n, e), Ie(
          t,
          e,
          n
        );
        break;
      case 1:
        At || (re(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function" && ey(
          n,
          e,
          i
        )), Ie(
          t,
          e,
          n
        );
        break;
      case 21:
        Ie(
          t,
          e,
          n
        );
        break;
      case 22:
        At = (i = At) || n.memoizedState !== null, Ie(
          t,
          e,
          n
        ), At = i;
        break;
      case 30:
        re(n, e), Ie(
          t,
          e,
          n
        );
        break;
      case 7:
        At || re(n, e), Ie(
          t,
          e,
          n
        );
        break;
      default:
        Ie(
          t,
          e,
          n
        );
    }
  }
  function gy(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Xa(t);
      } catch (n) {
        Dt(e, e.return, n);
      }
    }
  }
  function vy(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Xa(t);
      } catch (n) {
        Dt(e, e.return, n);
      }
  }
  function YS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new fy()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new fy()), e;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function ps(t, e) {
    var n = YS(t);
    e.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var u = IS.bind(null, t, i);
        i.then(u, u);
      }
    });
  }
  function ve(t, e, n) {
    var i = e.deletions;
    if (i !== null)
      for (var u = 0; u < i.length; u++) {
        var s = i[u], f = t, m = e, T = m;
        t: for (; T !== null; ) {
          switch (T.tag) {
            case 27:
              if (fi(T.type)) {
                Ht = T.stateNode, Me = !1;
                break t;
              }
              break;
            case 5:
              Ht = T.stateNode, Me = !1;
              break t;
            case 3:
            case 4:
              Ht = T.stateNode.containerInfo, Me = !0;
              break t;
          }
          T = T.return;
        }
        if (Ht === null) throw Error(o(160));
        yy(f, m, s), Ht = null, Me = !1, f = s.alternate, f !== null && (f.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        py(e, t, n), e = e.sibling;
  }
  var $e = null;
  function py(t, e, n) {
    var i = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (i = t.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var s = 0; s < i.length; s++) {
            var f = i[s];
            f.ref.impl = f.nextImpl;
          }
        ve(e, t, n), pe(t), u & 4 && (ai(3, t, t.return), Ol(3, t), ai(5, t, t.return));
        break;
      case 1:
        ve(e, t, n), pe(t), u & 512 && (At || i === null || re(i, i.return)), u & 64 && ne && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (s = $e, ve(e, t, n), pe(t), u & 512 && (At || i === null || re(i, i.return)), u & 4)
          if (u = i !== null ? i.memoizedState : null, n = t.memoizedState, i === null)
            if (n === null)
              if (t.stateNode === null)
                if (ne)
                  t.stateNode = eg(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, u = s.ownerDocument || s;
                    e: switch (e) {
                      case "title":
                        i = u.getElementsByTagName("title")[0], (!i || i[nl] || i[le] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = u.createElement(e), u.head.insertBefore(
                          i,
                          u.querySelector("head > title")
                        )), ce(i, e, n), i[le] = t, te(i), e = i;
                        break t;
                      case "link":
                        if (s = Dg(
                          "link",
                          "href",
                          u
                        ).get(e + (n.href || ""))) {
                          for (f = 0; f < s.length; f++)
                            if (i = s[f], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              s.splice(f, 1);
                              break e;
                            }
                        }
                        i = u.createElement(e), ce(i, e, n), u.head.appendChild(i);
                        break;
                      case "meta":
                        if (s = Dg(
                          "meta",
                          "content",
                          u
                        ).get(e + (n.content || ""))) {
                          for (f = 0; f < s.length; f++)
                            if (i = s[f], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              s.splice(f, 1);
                              break e;
                            }
                        }
                        i = u.createElement(e), ce(i, e, n), u.head.appendChild(i);
                        break;
                      default:
                        throw Error(o(468, e));
                    }
                    i[le] = t, te(i), e = i;
                  }
                  t.stateNode = e;
                }
              else
                ne || Zc(s, t.type, t.stateNode);
            else
              t.stateNode = Mg(
                s,
                n,
                t.memoizedProps
              );
          else
            u !== n ? (u === null ? (e = i.stateNode, e === null || At || e.parentNode.removeChild(e)) : u.count--, n === null ? ne || Zc(s, t.type, t.stateNode) : Mg(s, n, t.memoizedProps)) : n === null && t.stateNode !== null && kr(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        ve(e, t, n), pe(t), u & 512 && (At || i === null || re(i, i.return)), i !== null && u & 4 && kr(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (s = yn, yn = !1, ve(e, t, n), yn = s, pe(t), u & 512 && (At || i === null || re(i, i.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            ua(e, ""), Tt = !0;
          } catch (R) {
            Dt(t, t.return, R);
          }
        }
        u & 4 && t.stateNode != null && (e = t.memoizedProps, kr(
          t,
          e,
          i !== null ? i.memoizedProps : e
        )), u & 1024 && (ac = !0);
        break;
      case 6:
        if (ve(e, t, n), pe(t), u & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, Tt = !0;
          } catch (R) {
            Dt(t, t.return, R);
          }
        }
        break;
      case 3:
        if (Tt = !1, Vs = null, s = $e, $e = jl(e.containerInfo), ve(e, t, n), $e = s, pe(t), u & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Xa(e.containerInfo);
          } catch (R) {
            Dt(t, t.return, R);
          }
        ac && (ac = !1, Sy(t)), Tt = !1;
        break;
      case 4:
        u = yn, yn = ne, i = jh(), s = $e, $e = jl(
          t.stateNode.containerInfo
        ), ve(e, t, n), pe(t), $e = s, Tt && Rl && (gs = !0), Tt = i, yn = u;
        break;
      case 12:
        ve(e, t, n), pe(t);
        break;
      case 31:
        ve(e, t, n), pe(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ps(t, e)));
        break;
      case 13:
        ve(e, t, n), pe(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (bs = Oe()), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ps(t, e)));
        break;
      case 22:
        s = t.memoizedState !== null, f = i !== null && i.memoizedState !== null;
        var m = ne, T = At, x = yn;
        ne = m || s, yn = x || s, At = T || f, ve(e, t, n), At = T, yn = x, ne = m, pe(t), u & 8192 && (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, !s || i === null || f || ne || At || (e = f || At, n = ne, i = At, ne = s || ne, At = e, li(t, 2), ne = n, At = i), !s && yn || uc(t, s)), u & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, ps(t, n))));
        break;
      case 19:
        ve(e, t, n), pe(t), u & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ps(t, e)));
        break;
      case 30:
        u & 512 && (At || i === null || re(i, i.return)), u = jh(), s = Rl, f = (n & 335544064) === n, m = t.memoizedProps, Rl = f && zn(
          m.default,
          m.update
        ) !== "none", ve(e, t, n), pe(t), f && i !== null && Tt && (t.flags |= 4), Rl = s, Tt = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (At || i === null || re(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = t);
      default:
        ve(e, t, n), pe(t);
    }
  }
  function pe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (iy(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var u = t.return; u !== null; ) {
          if (Fr(u)) {
            var s = u.stateNode;
            i === null ? i = [s] : i.push(s);
          }
          if (Jr(u)) break;
          u = u.return;
        }
        var f = i;
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var m = n.stateNode, T = Wr(t);
            hs(
              t,
              T,
              m,
              f
            );
            break;
          case 5:
            var x = n.stateNode;
            n.flags & 32 && (ua(x, ""), n.flags &= -33);
            var R = Wr(t);
            hs(
              t,
              R,
              x,
              f
            );
            break;
          case 3:
          case 4:
            var V = n.stateNode.containerInfo, M = Wr(t);
            Ir(
              t,
              M,
              V,
              f
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (O) {
        Dt(t, t.return, O);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Sy(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Sy(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, qa = !0, e.reset(), qa = !1), t = t.sibling;
      }
  }
  function Da(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        Ty(e, t), e = e.sibling;
    else cy(e);
  }
  function Ty(t, e) {
    var n = t.alternate;
    if (n === null) $r(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (lc = gn = !1, uy(), Da(e, t), !gn && !gs) {
            if (t = dn, t !== null)
              for (var i = 0; i < t.length; i += 3) {
                n = t[i];
                var u = t[i + 1];
                sg(n, t[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), lc = !0;
          }
          dn = null;
          break;
        case 5:
          Da(e, t);
          break;
        case 4:
          i = gn, gn = !1, Da(e, t), gn && (gs = !0), gn = i;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? $r(t, !1) : Da(e, t));
          break;
        case 30:
          i = gn, u = uy(), gn = !1, Da(e, t), gn && (t.flags |= 4);
          var s = t.memoizedProps, f = t.stateNode;
          e = On(s, f), f = On(n.memoizedProps, f);
          var m = zn(s.default, s.update);
          m === "none" ? e = !1 : (s = n.memoizedState, n.memoizedState = null, n = t.child, Ae = 0, e = ic(
            t,
            n,
            e,
            f,
            m,
            s,
            !0
          ), Ae !== (s === null ? 0 : s.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (_a(
            t,
            t.memoizedProps.onUpdate
          ), dn = u) : u !== null && (u.push.apply(u, dn), dn = u), gn = (t.flags & 32) !== 0 ? !0 : i;
          break;
        default:
          Da(e, t);
      }
  }
  function vn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        hy(t, e.alternate, e), e = e.sibling;
  }
  function li(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, i = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ai(4, n, n.return), li(
            n,
            i
          );
          break;
        case 1:
          re(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && ey(
            n,
            n.return,
            u
          ), li(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && Sg(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          re(n, n.return), n.tag !== 5 && n.tag !== 27 || zl(n), li(
            n,
            i
          );
          break;
        case 6:
          zl(n);
          break;
        case 26:
          re(n, n.return), u = n.stateNode, n.memoizedState !== null || u === null || At || u.parentNode.removeChild(u), li(
            n,
            i
          );
          break;
        case 22:
          n.memoizedState === null && li(
            n,
            i
          );
          break;
        case 30:
          re(n, n.return), li(
            n,
            i
          );
          break;
        case 7:
          re(n, n.return);
        default:
          li(
            n,
            i
          );
      }
      t = t.sibling;
    }
  }
  function tn(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var i = e.alternate, u = t, s = e, f = s.flags, m = (n & 1) !== 0;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          tn(
            u,
            s,
            n
          ), Ol(4, s);
          break;
        case 1:
          if (tn(
            u,
            s,
            n
          ), i = s, u = i.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (R) {
              Dt(i, i.return, R);
            }
          if (i = s, u = i.updateQueue, u !== null) {
            var T = i.stateNode;
            try {
              var x = u.shared.hiddenCallbacks;
              if (x !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < x.length; u++)
                  qd(x[u], T);
            } catch (R) {
              Dt(i, i.return, R);
            }
          }
          m && f & 64 && ty(s), hn(s, s.return);
          break;
        case 27:
          (n & 2) !== 0 && ay(s);
        case 5:
          s.tag !== 5 && s.tag !== 27 || ny(s), tn(
            u,
            s,
            n
          ), m && i === null && f & 4 && Pr(s), hn(s, s.return);
          break;
        case 6:
          ny(s);
          break;
        case 26:
          T = s.stateNode, s.memoizedState !== null || T === null || ne || Zc(
            jl(T.ownerDocument),
            s.type,
            T
          ), tn(
            u,
            s,
            n
          ), m && i === null && f & 4 && Pr(s), hn(s, s.return);
          break;
        case 12:
          tn(
            u,
            s,
            n
          );
          break;
        case 31:
          tn(
            u,
            s,
            n
          ), m && f & 4 && gy(u, s);
          break;
        case 13:
          tn(
            u,
            s,
            n
          ), m && f & 4 && vy(u, s);
          break;
        case 22:
          s.memoizedState === null && tn(
            u,
            s,
            n
          ), hn(s, s.return);
          break;
        case 30:
          tn(
            u,
            s,
            n
          ), hn(s, s.return);
          break;
        case 7:
          hn(s, s.return);
        default:
          tn(
            u,
            s,
            n
          );
      }
      e = e.sibling;
    }
  }
  function oc(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && yl(n));
  }
  function rc(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && yl(t));
  }
  function Ze(t, e, n, i) {
    var u = (n & 335544064) === n;
    if (e.subtreeFlags & (u ? 10262 : 10256))
      for (e = e.child; e !== null; )
        by(
          t,
          e,
          n,
          i
        ), e = e.sibling;
    else u && ry(e);
  }
  function by(t, e, n, i) {
    var u = (n & 335544064) === n;
    u && e.alternate === null && e.return !== null && e.return.alternate !== null && ys(e);
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ze(
          t,
          e,
          n,
          i
        ), s & 2048 && Ol(9, e);
        break;
      case 1:
        Ze(
          t,
          e,
          n,
          i
        );
        break;
      case 3:
        Ze(
          t,
          e,
          n,
          i
        ), u && lc && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), s & 2048 && (s = null, e.alternate !== null && (s = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== s && (e.refCount++, s != null && yl(s)));
        break;
      case 12:
        if (s & 2048) {
          Ze(
            t,
            e,
            n,
            i
          ), s = e.stateNode;
          try {
            var f = e.memoizedProps, m = f.id, T = f.onPostCommit;
            typeof T == "function" && T(
              m,
              e.alternate === null ? "mount" : "update",
              s.passiveEffectDuration,
              -0
            );
          } catch (x) {
            Dt(e, e.return, x);
          }
        } else
          Ze(
            t,
            e,
            n,
            i
          );
        break;
      case 31:
        Ze(
          t,
          e,
          n,
          i
        );
        break;
      case 13:
        Ze(
          t,
          e,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        f = e.stateNode, m = e.alternate, e.memoizedState !== null ? (u && m !== null && m.memoizedState === null && ys(m), f._visibility & 2 ? Ze(
          t,
          e,
          n,
          i
        ) : Nl(
          t,
          e
        )) : (u && m !== null && m.memoizedState !== null && ys(e), f._visibility & 2 ? Ze(
          t,
          e,
          n,
          i
        ) : (f._visibility |= 2, xa(
          t,
          e,
          n,
          i,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), s & 2048 && oc(m, e);
        break;
      case 24:
        Ze(
          t,
          e,
          n,
          i
        ), s & 2048 && rc(e.alternate, e);
        break;
      case 30:
        u && (s = e.alternate, s !== null && (mn(s.child, !0), mn(e.child, !0))), Ze(
          t,
          e,
          n,
          i
        );
        break;
      default:
        Ze(
          t,
          e,
          n,
          i
        );
    }
  }
  function xa(t, e, n, i, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var s = t, f = e, m = n, T = i, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          xa(
            s,
            f,
            m,
            T,
            u
          ), Ol(8, f);
          break;
        case 23:
          break;
        case 22:
          var R = f.stateNode;
          f.memoizedState !== null ? R._visibility & 2 ? xa(
            s,
            f,
            m,
            T,
            u
          ) : Nl(
            s,
            f
          ) : (R._visibility |= 2, xa(
            s,
            f,
            m,
            T,
            u
          )), u && x & 2048 && oc(
            f.alternate,
            f
          );
          break;
        case 24:
          xa(
            s,
            f,
            m,
            T,
            u
          ), u && x & 2048 && rc(f.alternate, f);
          break;
        default:
          xa(
            s,
            f,
            m,
            T,
            u
          );
      }
      e = e.sibling;
    }
  }
  function Nl(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, i = e, u = i.flags;
        switch (i.tag) {
          case 22:
            Nl(n, i), u & 2048 && oc(
              i.alternate,
              i
            );
            break;
          case 24:
            Nl(n, i), u & 2048 && rc(i.alternate, i);
            break;
          default:
            Nl(n, i);
        }
        e = e.sibling;
      }
  }
  var Gi = 8192;
  function qi(t, e, n) {
    if (t.subtreeFlags & Gi)
      for (t = t.child; t !== null; )
        Ey(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Ey(t, e, n) {
    switch (t.tag) {
      case 26:
        qi(
          t,
          e,
          n
        ), t.flags & Gi && (t.memoizedState !== null ? KT(
          n,
          $e,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && zg(n, t)));
        break;
      case 5:
        qi(
          t,
          e,
          n
        ), t.flags & Gi && (t = t.stateNode, (e & 335544128) === e && zg(n, t));
        break;
      case 3:
      case 4:
        var i = $e;
        $e = jl(t.stateNode.containerInfo), qi(
          t,
          e,
          n
        ), $e = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = Gi, Gi = 16777216, qi(
          t,
          e,
          n
        ), Gi = i) : qi(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & Gi) !== 0 && (i = t.memoizedProps.name, i != null && i !== "auto")) {
          var u = t.stateNode;
          u.paired = null, Ue === null && (Ue = /* @__PURE__ */ new Map()), Ue.set(i, u);
        }
        qi(
          t,
          e,
          n
        );
        break;
      default:
        qi(
          t,
          e,
          n
        );
    }
  }
  function Ay(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function _l(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ie = i, Dy(
            i,
            t
          );
        }
      Ay(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        My(t), t = t.sibling;
  }
  function My(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        _l(t), t.flags & 2048 && ai(9, t, t.return);
        break;
      case 3:
        _l(t);
        break;
      case 12:
        _l(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Ss(t)) : _l(t);
        break;
      default:
        _l(t);
    }
  }
  function Ss(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          ie = i, Dy(
            i,
            t
          );
        }
      Ay(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ai(8, e, e.return), Ss(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, Ss(e));
          break;
        default:
          Ss(e);
      }
      t = t.sibling;
    }
  }
  function Dy(t, e) {
    for (; ie !== null; ) {
      var n = ie;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ai(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          yl(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, ie = i;
      else
        t: for (n = t; ie !== null; ) {
          i = ie;
          var u = i.sibling, s = i.return;
          if (my(i), i === n) {
            ie = null;
            break t;
          }
          if (u !== null) {
            u.return = s, ie = u;
            break t;
          }
          ie = s;
        }
    }
  }
  var GS = {
    getCacheForType: function(t) {
      var e = ue(Qt), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return ue(Qt).controller.signal;
    }
  }, qS = typeof WeakMap == "function" ? WeakMap : Map, Et = 0, _t = null, ht = null, mt = 0, Mt = 0, we = null, ui = !1, Ca = !1, cc = !1, Ln = 0, qt = 0, si = 0, Xi = 0, Ts = 0, Be = 0, Oa = 0, Vl = null, De = null, fc = !1, bs = 0, xy = 0, Es = 1 / 0, As = null, oi = null, Lt = 0, en = null, Qi = null, pn = 0, hc = 0, dc = null, Cy = null, za = null, Ra = null, Na = null, Ul = 0, Ms = null;
  function He() {
    return (Et & 2) !== 0 && mt !== 0 ? mt & -mt : P.T !== null ? Ac() : Rh();
  }
  function Oy() {
    if (Be === 0)
      if ((mt & 536870912) === 0 || rt) {
        var t = pu;
        pu <<= 1, (pu & 3932160) === 0 && (pu = 262144), Be = t;
      } else Be = 536870912;
    return t = se.current, t !== null && (t.flags |= 32), Be;
  }
  function _a(t, e) {
    if (e != null) {
      var n = t.stateNode, i = n.ref;
      i === null && (i = n.ref = og(
        On(t.memoizedProps, n)
      )), Ra === null && (Ra = []), Ra.push(e.bind(null, i));
    }
  }
  function xe(t, e, n) {
    (t === _t && (Mt === 2 || Mt === 9) || t.cancelPendingCommit !== null) && (Va(t, 0), ri(
      t,
      mt,
      Be,
      !1
    )), el(t, n), ((Et & 2) === 0 || t !== _t) && (t === _t && ((Et & 2) === 0 && (Xi |= n), qt === 4 && ri(
      t,
      mt,
      Be,
      !1
    )), Sn(t));
  }
  function zy(t, e, n) {
    if ((Et & 6) !== 0) throw Error(o(327));
    var i = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || tl(t, e), u = i ? ZS(t, e) : yc(t, e, !0), s = i;
    do {
      if (u === 0) {
        Ca && !i && ri(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, s && !XS(n)) {
          u = yc(t, e, !1), s = !1;
          continue;
        }
        if (u === 2) {
          if (s = e, t.errorRecoveryDisabledLanes & s)
            var f = 0;
          else
            f = t.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            e = f;
            t: {
              var m = t;
              u = Vl;
              var T = m.current.memoizedState.isDehydrated;
              if (T && (Va(m, f).flags |= 256), f = yc(
                m,
                f,
                !1
              ), f !== 2 && f !== 6) {
                if (cc && !T) {
                  m.errorRecoveryDisabledLanes |= s, Xi |= s, u = 4;
                  break t;
                }
                s = De, De = u, s !== null && (De === null ? De = s : De.push.apply(
                  De,
                  s
                ));
              }
              u = f;
            }
            if (s = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Va(t, 0), ri(t, e, 0, !0);
          break;
        }
        t: {
          switch (i = t, s = u, s) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ri(
                i,
                e,
                Be,
                !ui
              );
              break t;
            case 2:
              De = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && (u = bs + 300 - Oe(), 10 < u)) {
            if (ri(
              i,
              e,
              Be,
              !ui
            ), Tu(i, 0, !0) !== 0) break t;
            pn = e, i.timeoutHandle = Uc(
              Ry.bind(
                null,
                i,
                n,
                De,
                As,
                fc,
                e,
                Be,
                Xi,
                Oa,
                ui,
                s,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          Ry(
            i,
            n,
            De,
            As,
            fc,
            e,
            Be,
            Xi,
            Oa,
            ui,
            s,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Sn(t);
  }
  function Ry(t, e, n, i, u, s, f, m, T, x, R, V, M, O) {
    t.timeoutHandle = -1;
    var Y = e.subtreeFlags, J = (s & 335544064) === s;
    if (V = null, (J || Y & 8192 || (Y & 16785408) === 16785408) && (V = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: rn
    }, Ue = null, Ey(
      e,
      s,
      V
    ), J && (Y = V, J = t.containerInfo, J = (J.nodeType === 9 ? J : J.ownerDocument).__reactViewTransition, J != null && (Y.count++, Y.waitingForViewTransition = !0, Y = ql.bind(Y), J.finished.then(Y, Y))), Y = (s & 62914560) === s ? bs - Oe() : (s & 4194048) === s ? xy - Oe() : 0, Y = JT(
      V,
      Y
    ), Y !== null)) {
      pn = s, t.cancelPendingCommit = Y(
        Ly.bind(
          null,
          t,
          e,
          s,
          n,
          i,
          u,
          f,
          m,
          T,
          x,
          R,
          V,
          null,
          M,
          O
        )
      ), ri(t, s, f, !x);
      return;
    }
    Ly(
      t,
      e,
      s,
      n,
      i,
      u,
      f,
      m,
      T,
      x,
      R,
      V
    );
  }
  function XS(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var u = n[i], s = u.getSnapshot;
          u = u.value;
          try {
            if (!_e(s(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function ri(t, e, n, i) {
    e = Dh(t, e), e &= ~Ts, e &= ~Xi, t.suspendedLanes |= e, t.pingedLanes &= ~e, i && (t.warmLanes |= e), i = t.expirationTimes;
    for (var u = e; 0 < u; ) {
      var s = 31 - Re(u), f = 1 << s;
      i[s] = -1, u &= ~f;
    }
    n !== 0 && Ch(t, n, e);
  }
  function Ds() {
    return (Et & 6) === 0 ? (wl(0), !1) : !0;
  }
  function mc() {
    if (ht !== null) {
      if (Mt === 0)
        var t = ht.return;
      else
        t = ht, _n = Ni = null, Er(t), Sa = null, pl = 0, t = ht;
      for (; t !== null; )
        $m(t.alternate, t), t = t.return;
      ht = null;
    }
  }
  function Va(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, dT(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), pn = 0, mc(), _t = t, ht = n = Rn(t.current, null), mt = e, Mt = 0, we = null, ui = !1, Ca = tl(t, e), cc = !1, Oa = Be = Ts = Xi = si = qt = 0, De = Vl = null, fc = !1, Ln = Dh(t, e), Vu(), n;
  }
  function Ny(t, e) {
    ut = null, P.H = as, e === pa || e === Qu ? (e = Ld(), Mt = 3) : e === rr ? (e = Ld(), Mt = 4) : Mt = e === Hr ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, we = e, ht === null && (qt = 1, ls(
      t,
      Ge(e, t.current)
    ));
  }
  function _y() {
    var t = se.current;
    return t === null ? !0 : (mt & 4194048) === mt ? me === null : (mt & 62914560) === mt || (mt & 536870912) !== 0 ? t === me : !1;
  }
  function Vy() {
    var t = P.H;
    return P.H = as, t === null ? as : t;
  }
  function Uy() {
    var t = P.A;
    return P.A = GS, t;
  }
  function xs() {
    qt = 4, ui || (mt & 4194048) !== mt && se.current !== null || (Ca = !0), (si & 134217727) === 0 && (Xi & 134217727) === 0 || _t === null || ri(
      _t,
      mt,
      Be,
      !1
    );
  }
  function yc(t, e, n) {
    var i = Et;
    Et |= 2;
    var u = Vy(), s = Uy();
    (_t !== t || mt !== e) && (As = null, Va(t, e)), e = !1;
    var f = qt;
    t: do
      try {
        if (Mt !== 0 && ht !== null) {
          var m = ht, T = we;
          switch (Mt) {
            case 8:
              mc(), f = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              se.current === null && (e = !0);
              var x = Mt;
              if (Mt = 0, we = null, Ua(t, m, T, x), n && Ca) {
                f = 0;
                break t;
              }
              break;
            default:
              x = Mt, Mt = 0, we = null, Ua(t, m, T, x);
          }
        }
        QS(), f = qt;
        break;
      } catch (R) {
        Ny(t, R);
      }
    while (!0);
    return e && t.shellSuspendCounter++, _n = Ni = null, Et = i, P.H = u, P.A = s, ht === null && (_t = null, mt = 0, Vu()), f;
  }
  function QS() {
    for (; ht !== null; ) wy(ht);
  }
  function ZS(t, e) {
    var n = Et;
    Et |= 2;
    var i = Vy(), u = Uy();
    _t !== t || mt !== e ? (As = null, Es = Oe() + 500, Va(t, e)) : Ca = tl(
      t,
      e
    );
    t: do
      try {
        if (Mt !== 0 && ht !== null) {
          e = ht;
          var s = we;
          e: switch (Mt) {
            case 1:
              Mt = 0, we = null, Ua(t, e, s, 1);
              break;
            case 2:
            case 9:
              if (Bd(s)) {
                Mt = 0, we = null, By(e);
                break;
              }
              e = function() {
                Mt !== 2 && Mt !== 9 || _t !== t || (Mt = 7), Sn(t);
              }, s.then(e, e);
              break t;
            case 3:
              Mt = 7;
              break t;
            case 4:
              Mt = 5;
              break t;
            case 7:
              Bd(s) ? (Mt = 0, we = null, By(e)) : (Mt = 0, we = null, Ua(t, e, s, 7));
              break;
            case 5:
              var f = null;
              switch (ht.tag) {
                case 26:
                  f = ht.memoizedState;
                case 5:
                case 27:
                  var m = ht;
                  if (f ? Cg(f) : m.stateNode.complete) {
                    Mt = 0, we = null;
                    var T = m.sibling;
                    if (T !== null) ht = T;
                    else {
                      var x = m.return;
                      x !== null ? (ht = x, Cs(x)) : ht = null;
                    }
                    break e;
                  }
              }
              Mt = 0, we = null, Ua(t, e, s, 5);
              break;
            case 6:
              Mt = 0, we = null, Ua(t, e, s, 6);
              break;
            case 8:
              mc(), qt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        KS();
        break;
      } catch (R) {
        Ny(t, R);
      }
    while (!0);
    return _n = Ni = null, P.H = i, P.A = u, Et = n, ht !== null ? 0 : (_t = null, mt = 0, Vu(), qt);
  }
  function KS() {
    for (; ht !== null && !r1(); )
      wy(ht);
  }
  function wy(t) {
    var e = Wm(t.alternate, t, Ln);
    t.memoizedProps = t.pendingProps, e === null ? Cs(t) : ht = e;
  }
  function By(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Qm(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          mt
        );
        break;
      case 11:
        e = Qm(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          mt
        );
        break;
      case 5:
        Er(e);
        var i = e;
        i === ee && (rt ? (ju(i), i.tag === 5 && i.stateNode != null && (wt = i.stateNode)) : (ju(i), rt = !0));
      default:
        $m(n, e), e = ht = Dd(e, Ln), e = Wm(n, e, Ln);
    }
    t.memoizedProps = t.pendingProps, e === null ? Cs(t) : ht = e;
  }
  function Ua(t, e, n, i) {
    _n = Ni = null, Er(e), Sa = null, pl = 0;
    var u = e.return;
    try {
      if (VS(
        t,
        u,
        e,
        n,
        mt
      )) {
        qt = 1, ls(
          t,
          Ge(n, t.current)
        ), ht = null;
        return;
      }
    } catch (s) {
      if (u !== null) throw ht = u, s;
      qt = 1, ls(
        t,
        Ge(n, t.current)
      ), ht = null;
      return;
    }
    e.flags & 32768 ? (rt || i === 1 ? t = !0 : Ca || (mt & 536870912) !== 0 ? t = !1 : (ui = t = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = se.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Hy(e, t)) : Cs(e);
  }
  function Cs(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Hy(
          e,
          ui
        );
        return;
      }
      t = e.return;
      var n = HS(
        e.alternate,
        e,
        Ln
      );
      if (n !== null) {
        ht = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        ht = e;
        return;
      }
      ht = e = t;
    } while (e !== null);
    qt === 0 && (qt = 5);
  }
  function Hy(t, e) {
    do {
      var n = LS(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, ht = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        ht = t;
        return;
      }
      ht = t = n;
    } while (t !== null);
    qt = 6, ht = null;
  }
  function Ly(t, e, n, i, u, s, f, m, T, x, R, V) {
    t.cancelPendingCommit = null;
    do
      Os();
    while (Lt !== 0);
    if ((Et & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      t === _t && (ht = _t = null, mt = 0), Qi = e, en = t, pn = n, dc = u, Cy = i, JS(
        t,
        e,
        n,
        f,
        m,
        T,
        V
      );
    }
  }
  function JS(t, e, n, i, u, s, f) {
    var m = e.lanes | e.childLanes;
    if (hc = m, m |= ko, S1(
      t,
      n,
      m,
      i,
      u,
      s
    ), Ra = null, (n & 335544064) === n ? (Na = bS(t), i = 10262) : (Na = null, i = 10256), (e.subtreeFlags & i) !== 0 || (e.flags & i) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, $S(gu, function() {
      return Sc(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), ds = !1, i = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || i) {
      i = P.T, P.T = null, u = at.p, at.p = 2, s = Et, Et |= 4;
      try {
        jS(t, e, n);
      } finally {
        Et = s, at.p = u, P.T = i;
      }
    }
    Lt = 1, ds ? za = ST(
      f,
      t.containerInfo,
      Na,
      gc,
      vc,
      PS,
      pc,
      Sc,
      FS
    ) : (gc(), vc(), pc());
  }
  function FS(t) {
    if (Lt !== 0) {
      var e = en.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function PS() {
    Lt === 3 && (Lt = 0, Ty(Qi, en), Lt = 4);
  }
  function gc() {
    if (Lt === 1) {
      Lt = 0;
      var t = en, e = Qi, n = pn, i = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || i) {
        i = P.T, P.T = null;
        var u = at.p;
        at.p = 2;
        var s = Et;
        Et |= 4;
        try {
          Rl = gs = !1, py(e, t, n), n = Nc;
          var f = yd(t.containerInfo), m = n.focusedElem, T = n.selectionRange;
          if (f !== m && m && m.ownerDocument && md(
            m.ownerDocument.documentElement,
            m
          )) {
            if (T !== null && Zo(m)) {
              var x = T.start, R = T.end;
              if (R === void 0 && (R = x), "selectionStart" in m)
                m.selectionStart = x, m.selectionEnd = Math.min(
                  R,
                  m.value.length
                );
              else {
                var V = m.ownerDocument || document, M = V && V.defaultView || window;
                if (M.getSelection) {
                  var O = M.getSelection(), Y = m.textContent.length, J = Math.min(T.start, Y), st = T.end === void 0 ? J : Math.min(T.end, Y);
                  !O.extend && J > st && (f = st, st = J, J = f);
                  var D = dd(
                    m,
                    J
                  ), E = dd(
                    m,
                    st
                  );
                  if (D && E && (O.rangeCount !== 1 || O.anchorNode !== D.node || O.anchorOffset !== D.offset || O.focusNode !== E.node || O.focusOffset !== E.offset)) {
                    var C = V.createRange();
                    C.setStart(D.node, D.offset), O.removeAllRanges(), J > st ? (O.addRange(C), O.extend(E.node, E.offset)) : (C.setEnd(E.node, E.offset), O.addRange(C));
                  }
                }
              }
            }
            for (V = [], O = m; O = O.parentNode; )
              O.nodeType === 1 && V.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < V.length; m++) {
              var _ = V[m];
              _.element.scrollLeft = _.left, _.element.scrollTop = _.top;
            }
          }
          qa = !!Rc, Nc = Rc = null;
        } finally {
          Et = s, at.p = u, P.T = i;
        }
      }
      t.current = e, Lt = 2;
    }
  }
  function vc() {
    if (Lt === 2) {
      Lt = 0;
      var t = en, e = Qi, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = P.T, P.T = null;
        var i = at.p;
        at.p = 2;
        var u = Et;
        Et |= 4;
        try {
          hy(t, e.alternate, e);
        } finally {
          Et = u, at.p = i, P.T = n;
        }
      }
      Lt = 3;
    }
  }
  function pc() {
    if (Lt === 4 || Lt === 3) {
      Lt = 0;
      var t = za;
      za = null, c1();
      var e = en, n = Qi, i = pn, u = Cy, s = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & s) !== 0 || (n.flags & s) !== 0 ? Lt = 5 : (Lt = 0, Qi = en = null, jy(e, e.pendingLanes)), s = e.pendingLanes, s === 0 && (oi = null), Co(i), n = n.stateNode, ze && typeof ze.onCommitFiberRoot == "function")
        try {
          ze.onCommitFiberRoot(
            $a,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        n = P.T, s = at.p, at.p = 2, P.T = null;
        try {
          for (var f = e.onRecoverableError, m = 0; m < u.length; m++) {
            var T = u[m];
            f(T.value, {
              componentStack: T.stack
            });
          }
        } finally {
          P.T = n, at.p = s;
        }
      }
      if (u = Ra, f = Na, Na = null, u !== null && (Ra = null, f === null && (f = []), t !== null))
        for (T = 0; T < u.length; T++)
          n = (0, u[T])(
            f
          ), n !== void 0 && t.finished.finally(n);
      (pn & 3) !== 0 && Os(), Sn(e), s = e.pendingLanes, (i & 261930) !== 0 && (s & 42) !== 0 ? e === Ms ? Ul++ : (Ul = 0, Ms = e) : (Ul = 0, Ms = null), wl(0);
    }
  }
  function jy(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, yl(e)));
  }
  function Os() {
    return za !== null && (za.skipTransition(), za = null), gc(), vc(), pc(), Sc();
  }
  function Sc() {
    if (Lt !== 5) return !1;
    var t = en, e = hc;
    hc = 0;
    var n = Co(pn), i = P.T, u = at.p;
    try {
      at.p = 32 > n ? 32 : n, P.T = null, n = dc, dc = null;
      var s = en, f = pn;
      if (Lt = 0, Qi = en = null, pn = 0, (Et & 6) !== 0) throw Error(o(331));
      var m = Et;
      if (Et |= 4, My(s.current), by(
        s,
        s.current,
        f,
        n
      ), Et = m, wl(0, !1), ze && typeof ze.onPostCommitFiberRoot == "function")
        try {
          ze.onPostCommitFiberRoot($a, s);
        } catch {
        }
      return !0;
    } finally {
      at.p = u, P.T = i, jy(t, e);
    }
  }
  function Yy(t, e, n) {
    e = Ge(n, e), e = Br(t.stateNode, e, 2), t = ti(t, e, 2), t !== null && (el(t, 2), Sn(t));
  }
  function Dt(t, e, n) {
    if (t.tag === 3)
      Yy(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Yy(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (oi === null || !oi.has(i))) {
            t = Ge(n, t), n = Bm(2), i = ti(e, n, 2), i !== null && (Hm(
              n,
              i,
              e,
              t
            ), el(i, 2), Sn(i));
            break;
          }
        }
        e = e.return;
      }
  }
  function Tc(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new qS();
      var u = /* @__PURE__ */ new Set();
      i.set(e, u);
    } else
      u = i.get(e), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(e, u));
    u.has(n) || (cc = !0, u.add(n), t = kS.bind(null, t, e, n), e.then(t, t));
  }
  function kS(t, e, n) {
    var i = t.pingCache;
    i !== null && i.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, _t === t && (mt & n) === n && ((qt === 4 || qt === 3 && (mt & 62914560) === mt && 300 > Oe() - bs) && (Et & 2) === 0 ? Va(t, 0) : Ts |= n, Oa === mt && (Oa = 0)), Sn(t);
  }
  function Gy(t, e) {
    e === 0 && (e = xh()), t = Oi(t, e), t !== null && (el(t, e), Sn(t));
  }
  function WS(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), Gy(t, n);
  }
  function IS(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var i = t.stateNode, u = t.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        i = t.stateNode;
        break;
      case 22:
        i = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    i !== null && i.delete(e), Gy(t, n);
  }
  function $S(t, e) {
    return Ao(t, e);
  }
  var wa = null, Ba = null, bc = !1, zs = !1, Ec = !1, ci = 0;
  function Sn(t) {
    t !== Ba && t.next === null && (Ba === null ? wa = Ba = t : Ba = Ba.next = t), zs = !0, bc || (bc = !0, eT());
  }
  function wl(t, e) {
    if (!Ec && zs) {
      Ec = !0;
      do
        for (var n = !1, i = wa; i !== null; ) {
          if (t !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var s = 0;
            else {
              var f = i.suspendedLanes, m = i.pingedLanes;
              s = (1 << 31 - Re(42 | t) + 1) - 1, s &= u & ~(f & ~m), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (n = !0, Zy(i, s));
          } else
            s = mt, s = Tu(
              i,
              i === _t ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (s & 3) === 0 || tl(i, s) || (n = !0, Zy(i, s));
          i = i.next;
        }
      while (n);
      Ec = !1;
    }
  }
  function tT() {
    qy();
  }
  function qy() {
    zs = bc = !1;
    var t = 0;
    ci !== 0 && hT() && (t = ci);
    for (var e = Oe(), n = null, i = wa; i !== null; ) {
      var u = i.next, s = Xy(i, e);
      s === 0 ? (i.next = null, n === null ? wa = u : n.next = u, u === null && (Ba = n)) : (n = i, (t !== 0 || (s & 3) !== 0) && (zs = !0)), i = u;
    }
    Lt !== 0 && Lt !== 5 || wl(t), ci !== 0 && (ci = 0);
  }
  function Xy(t, e) {
    for (var n = t.suspendedLanes, i = t.pingedLanes, u = t.expirationTimes, s = t.pendingLanes & -62914561; 0 < s; ) {
      var f = 31 - Re(s), m = 1 << f, T = u[f];
      T === -1 ? ((m & n) === 0 || (m & i) !== 0) && (u[f] = p1(m, e)) : T <= e && (t.expiredLanes |= m), s &= ~m;
    }
    if (e = _t, n = mt, n = Tu(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i = t.callbackNode, n === 0 || t === e && (Mt === 2 || Mt === 9) || t.cancelPendingCommit !== null)
      return i !== null && i !== null && Mo(i), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || tl(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (i !== null && Mo(i), Co(n)) {
        case 2:
        case 8:
          n = Ah;
          break;
        case 32:
          n = gu;
          break;
        case 268435456:
          n = Mh;
          break;
        default:
          n = gu;
      }
      return i = Qy.bind(null, t), n = Ao(n, i), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return i !== null && i !== null && Mo(i), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Qy(t, e) {
    if (Lt !== 0 && Lt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (Os() && t.callbackNode !== n)
      return null;
    var i = mt;
    return i = Tu(
      t,
      t === _t ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i === 0 ? null : (zy(t, i, e), Xy(t, Oe()), t.callbackNode != null && t.callbackNode === n ? Qy.bind(null, t) : null);
  }
  function Zy(t, e) {
    if (Os()) return null;
    zy(t, e, !0);
  }
  function eT() {
    mT(function() {
      (Et & 6) !== 0 ? Ao(
        Eh,
        tT
      ) : qy();
    });
  }
  function Ac() {
    if (ci === 0) {
      var t = Ui;
      t === 0 && (t = vu, vu <<= 1, (vu & 261888) === 0 && (vu = 256)), ci = t;
    }
    return ci;
  }
  function Ky(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Du(t);
  }
  function nT(t, e, n, i, u) {
    if (e === "submit" && n && n.stateNode === u) {
      var s = Ky(
        (u[be] || null).action
      ), f = i.submitter;
      f && (e = (e = f[be] || null) ? Ky(e.formAction) : f.getAttribute("formAction"), e !== null && (s = e, f = null));
      var m = new zu(
        "action",
        "action",
        null,
        i,
        u
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (ci !== 0) {
                  var T = new FormData(u, f);
                  Nr(
                    n,
                    {
                      pending: !0,
                      data: T,
                      method: u.method,
                      action: s
                    },
                    null,
                    T
                  );
                }
              } else
                typeof s == "function" && (m.preventDefault(), T = new FormData(u, f), Nr(
                  n,
                  {
                    pending: !0,
                    data: T,
                    method: u.method,
                    action: s
                  },
                  s,
                  T
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Mc = 0; Mc < Po.length; Mc++) {
    var Dc = Po[Mc], iT = Dc.toLowerCase(), aT = Dc[0].toUpperCase() + Dc.slice(1);
    We(
      iT,
      "on" + aT
    );
  }
  We(pd, "onAnimationEnd"), We(Sd, "onAnimationIteration"), We(Td, "onAnimationStart"), We("dblclick", "onDoubleClick"), We("focusin", "onFocus"), We("focusout", "onBlur"), We(dS, "onTransitionRun"), We(mS, "onTransitionStart"), We(yS, "onTransitionCancel"), We(bd, "onTransitionEnd"), aa("onMouseEnter", ["mouseout", "mouseover"]), aa("onMouseLeave", ["mouseout", "mouseover"]), aa("onPointerEnter", ["pointerout", "pointerover"]), aa("onPointerLeave", ["pointerout", "pointerover"]), Di(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Di(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Di("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Di(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Di(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Di(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), lT = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bl)
  );
  function Jy(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n], u = i.event;
      i = i.listeners;
      t: {
        var s = void 0;
        if (e)
          for (var f = i.length - 1; 0 <= f; f--) {
            var m = i[f], T = m.instance, x = m.currentTarget;
            if (m = m.listener, T !== s && u.isPropagationStopped())
              break t;
            s = m, u.currentTarget = x;
            try {
              s(u);
            } catch (R) {
              _u(R);
            }
            u.currentTarget = null, s = T;
          }
        else
          for (f = 0; f < i.length; f++) {
            if (m = i[f], T = m.instance, x = m.currentTarget, m = m.listener, T !== s && u.isPropagationStopped())
              break t;
            s = m, u.currentTarget = x;
            try {
              s(u);
            } catch (R) {
              _u(R);
            }
            u.currentTarget = null, s = T;
          }
      }
    }
  }
  function dt(t, e) {
    var n = e[_h];
    n === void 0 && (n = e[_h] = /* @__PURE__ */ new Set());
    var i = t + "__bubble";
    n.has(i) || (Fy(e, t, 2, !1), n.add(i));
  }
  function xc(t, e, n) {
    var i = 0;
    e && (i |= 4), Fy(
      n,
      t,
      i,
      e
    );
  }
  var Rs = "_reactListening" + Math.random().toString(36).slice(2);
  function Cc(t) {
    if (!t[Rs]) {
      t[Rs] = !0, wh.forEach(function(n) {
        n !== "selectionchange" && (lT.has(n) || xc(n, !1, t), xc(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Rs] || (e[Rs] = !0, xc("selectionchange", !1, e));
    }
  }
  function Fy(t, e, n, i) {
    switch (Hg(e)) {
      case 2:
        var u = WT;
        break;
      case 8:
        u = IT;
        break;
      default:
        u = Jc;
    }
    n = u.bind(
      null,
      e,
      n,
      t
    ), u = void 0, !wo || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (u = !0), i ? u !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: u
    }) : t.addEventListener(e, n, !0) : u !== void 0 ? t.addEventListener(e, n, {
      passive: u
    }) : t.addEventListener(e, n, !1);
  }
  function Oc(t, e, n, i, u) {
    var s = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var f = i.tag;
        if (f === 3 || f === 4) {
          var m = i.stateNode.containerInfo;
          if (m === u) break;
          if (f === 4)
            for (f = i.return; f !== null; ) {
              var T = f.tag;
              if ((T === 3 || T === 4) && f.stateNode.containerInfo === u)
                return;
              f = f.return;
            }
          for (; m !== null; ) {
            if (f = Mi(m), f === null) return;
            if (T = f.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              i = s = f;
              continue t;
            }
            m = m.parentNode;
          }
        }
        i = i.return;
      }
    Fh(function() {
      var x = s, R = Vo(n), V = [];
      t: {
        var M = Ed.get(t);
        if (M !== void 0) {
          var O = zu, Y = t;
          switch (t) {
            case "keypress":
              if (Cu(n) === 0) break t;
            case "keydown":
            case "keyup":
              O = X1;
              break;
            case "focusin":
              Y = "focus", O = jo;
              break;
            case "focusout":
              Y = "blur", O = jo;
              break;
            case "beforeblur":
            case "afterblur":
              O = jo;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              O = Wh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = N1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = F1;
              break;
            case pd:
            case Sd:
            case Td:
              O = U1;
              break;
            case bd:
              O = k1;
              break;
            case "scroll":
            case "scrollend":
              O = z1;
              break;
            case "wheel":
              O = I1;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = B1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = $h;
              break;
            case "submit":
              O = K1;
              break;
            case "toggle":
            case "beforetoggle":
              O = tS;
          }
          var J = (e & 4) !== 0, st = !J && (t === "scroll" || t === "scrollend"), D = J ? M !== null ? M + "Capture" : null : M;
          J = [];
          for (var E = x, C; E !== null; ) {
            var _ = E;
            if (C = _.stateNode, _ = _.tag, _ !== 5 && _ !== 26 && _ !== 27 || C === null || D === null || (_ = al(E, D), _ != null && J.push(
              Hl(E, _, C)
            )), st) break;
            E = E.return;
          }
          0 < J.length && (M = new O(
            M,
            Y,
            null,
            n,
            R
          ), V.push({ event: M, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", M = t === "mouseout" || t === "pointerout", O && n !== _o && (Y = n.relatedTarget || n.fromElement) && (Mi(Y) || Y[ea]))
            break t;
          (M || O) && (Y = R.window === R ? R : (O = R.ownerDocument) ? O.defaultView || O.parentWindow : window, M ? (O = n.relatedTarget || n.toElement, M = x, O = O ? Mi(O) : null, O !== null && (st = d(O), J = O.tag, O !== st || J !== 5 && J !== 27 && J !== 6) && (O = null)) : (M = null, O = x), M !== O && (J = Wh, _ = "onMouseLeave", D = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (J = $h, _ = "onPointerLeave", D = "onPointerEnter", E = "pointer"), st = M == null ? Y : il(M), C = O == null ? Y : il(O), Y = new J(
            _,
            E + "leave",
            M,
            n,
            R
          ), Y.target = st, Y.relatedTarget = C, _ = null, Mi(R) === x && (J = new J(
            D,
            E + "enter",
            O,
            n,
            R
          ), J.target = C, J.relatedTarget = st, _ = J), st = _, J = M && O ? ct(
            M,
            O,
            uT
          ) : null, M !== null && Py(
            V,
            Y,
            M,
            J,
            !1
          ), O !== null && st !== null && Py(
            V,
            st,
            O,
            J,
            !0
          )));
        }
        t: {
          if (M = x ? il(x) : window, O = M.nodeName && M.nodeName.toLowerCase(), O === "select" || O === "input" && M.type === "file")
            var Q = sd;
          else if (ld(M))
            if (od)
              Q = cS;
            else {
              Q = oS;
              var yt = sS;
            }
          else
            O = M.nodeName, !O || O.toLowerCase() !== "input" || M.type !== "checkbox" && M.type !== "radio" ? x && No(x.elementType) && (Q = sd) : Q = rS;
          if (Q && (Q = Q(t, x))) {
            ud(
              V,
              Q,
              n,
              R
            );
            break t;
          }
          yt && yt(t, M, x);
        }
        switch (yt = x ? il(x) : window, t) {
          case "focusin":
            (ld(yt) || yt.contentEditable === "true") && (ca = yt, Ko = x, hl = null);
            break;
          case "focusout":
            hl = Ko = ca = null;
            break;
          case "mousedown":
            Jo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jo = !1, gd(V, n, R);
            break;
          case "selectionchange":
            if (hS) break;
          case "keydown":
          case "keyup":
            gd(V, n, R);
        }
        var k;
        if (Go)
          t: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break t;
              case "compositionend":
                nt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break t;
            }
            nt = void 0;
          }
        else
          ra ? id(t, n) && (nt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (nt = "onCompositionStart");
        nt && (td && n.locale !== "ko" && (ra || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && ra && (k = Ph()) : (Zn = R, Bo = "value" in Zn ? Zn.value : Zn.textContent, ra = !0)), yt = Ns(x, nt), 0 < yt.length && (nt = new Ih(
          nt,
          t,
          null,
          n,
          R
        ), V.push({ event: nt, listeners: yt }), k ? nt.data = k : (k = ad(n), k !== null && (nt.data = k)))), (k = nS ? iS(t, n) : aS(t, n)) && (nt = Ns(x, "onBeforeInput"), 0 < nt.length && (yt = new Ih(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          R
        ), V.push({
          event: yt,
          listeners: nt
        }), yt.data = k)), nT(
          V,
          t,
          x,
          n,
          R
        );
      }
      Jy(V, e);
    });
  }
  function Hl(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Ns(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var u = t, s = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || s === null || (u = al(t, n), u != null && i.unshift(
        Hl(t, u, s)
      ), u = al(t, e), u != null && i.push(
        Hl(t, u, s)
      )), t.tag === 3) return i;
      t = t.return;
    }
    return [];
  }
  function uT(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Py(t, e, n, i, u) {
    for (var s = e._reactName, f = []; n !== null && n !== i; ) {
      var m = n, T = m.alternate, x = m.stateNode;
      if (m = m.tag, T !== null && T === i) break;
      m !== 5 && m !== 26 && m !== 27 || x === null || (T = x, u ? (x = al(n, s), x != null && f.unshift(
        Hl(n, x, T)
      )) : u || (x = al(n, s), x != null && f.push(
        Hl(n, x, T)
      ))), n = n.return;
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var sT = /\r\n?/g, oT = /\u0000|\uFFFD/g;
  function ky(t) {
    return (typeof t == "string" ? t : "" + t).replace(sT, `
`).replace(oT, "");
  }
  function Wy(t, e) {
    return e = ky(e), ky(t) === e;
  }
  function xt(t, e, n, i, u, s) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          e === "body" || e === "textarea" && i === "" || ua(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          e !== "body" && ua(t, "" + i);
        else return;
        break;
      case "className":
        Mu(t, "class", i);
        break;
      case "tabIndex":
        Mu(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Mu(t, n, i);
        break;
      case "style":
        Kh(t, i, s);
        return;
      case "data":
        if (e !== "object") {
          Mu(t, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Du(i), t.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == "function" && (n === "formAction" ? (e !== "input" && xt(t, e, "name", u.name, u, null), xt(
            t,
            e,
            "formEncType",
            u.formEncType,
            u,
            null
          ), xt(
            t,
            e,
            "formMethod",
            u.formMethod,
            u,
            null
          ), xt(
            t,
            e,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (xt(t, e, "encType", u.encType, u, null), xt(t, e, "method", u.method, u, null), xt(t, e, "target", u.target, u, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Du(i), t.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (t.onclick = rn);
        return;
      case "onScroll":
        i != null && dt("scroll", t);
        return;
      case "onScrollEnd":
        i != null && dt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(o(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(o(60));
            (s != null ? s.__html : void 0) !== n && (t.innerHTML = n);
          }
        }
        break;
      case "multiple":
        t.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        t.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = Du(i), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? t.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? t.removeAttribute(n) : t.setAttribute(n, i);
        break;
      case "popover":
        dt("beforetoggle", t), dt("toggle", t), Au(t, "popover", i);
        break;
      case "xlinkActuate":
        xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        xn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        xn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        xn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        xn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Au(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = C1.get(n) || n, Au(t, n, i);
        else return;
    }
    Tt = !0;
  }
  function zc(t, e, n, i, u, s) {
    switch (n) {
      case "style":
        Kh(t, i, s);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(o(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(o(60));
            (s != null ? s.__html : void 0) !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof i == "string") ua(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          ua(t, "" + i);
        else return;
        break;
      case "onScroll":
        i != null && dt("scroll", t);
        return;
      case "onScrollEnd":
        i != null && dt("scrollend", t);
        return;
      case "onClick":
        i != null && (t.onclick = rn);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Bh.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), s = n.slice(2, u ? n.length - 7 : void 0), e = t[be] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(s, e, u), typeof i == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(s, i, u);
              break t;
            }
            Tt = !0, n in t ? t[n] = i : i === !0 ? t.setAttribute(n, "") : Au(t, n, i);
          }
        return;
    }
    Tt = !0;
  }
  function ce(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        dt("error", t), dt("load", t);
        var i = !1, u = !1, s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var f = n[s];
            if (f != null)
              switch (s) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  xt(t, e, s, f, n, null);
              }
          }
        u && xt(t, e, "srcSet", n.srcSet, n, null), i && xt(t, e, "src", n.src, n, null);
        return;
      case "input":
        dt("invalid", t);
        var m = s = f = u = null, T = null, x = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var R = n[i];
            if (R != null)
              switch (i) {
                case "name":
                  u = R;
                  break;
                case "type":
                  f = R;
                  break;
                case "checked":
                  T = R;
                  break;
                case "defaultChecked":
                  x = R;
                  break;
                case "value":
                  s = R;
                  break;
                case "defaultValue":
                  m = R;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null)
                    throw Error(o(137, e));
                  break;
                default:
                  xt(t, e, i, R, n, null);
              }
          }
        qh(
          t,
          s,
          m,
          T,
          x,
          f,
          u,
          !1
        );
        return;
      case "select":
        dt("invalid", t), i = f = s = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (m = n[u], m != null))
            switch (u) {
              case "value":
                s = m;
                break;
              case "defaultValue":
                f = m;
                break;
              case "multiple":
                i = m;
              default:
                xt(t, e, u, m, n, null);
            }
        e = s, n = f, t.multiple = !!i, e != null ? la(t, !!i, e, !1) : n != null && la(t, !!i, n, !0);
        return;
      case "textarea":
        dt("invalid", t), s = u = i = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (m = n[f], m != null))
            switch (f) {
              case "value":
                i = m;
                break;
              case "defaultValue":
                u = m;
                break;
              case "children":
                s = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(o(91));
                break;
              default:
                xt(t, e, f, m, n, null);
            }
        Qh(t, i, u, s);
        return;
      case "option":
        for (T in n)
          if (n.hasOwnProperty(T) && (i = n[T], i != null))
            switch (T) {
              case "selected":
                t.selected = i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                xt(t, e, T, i, n, null);
            }
        return;
      case "dialog":
        dt("beforetoggle", t), dt("toggle", t), dt("cancel", t), dt("close", t);
        break;
      case "iframe":
      case "object":
        dt("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Bl.length; i++)
          dt(Bl[i], t);
        break;
      case "image":
        dt("error", t), dt("load", t);
        break;
      case "details":
        dt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        dt("error", t), dt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (x in n)
          if (n.hasOwnProperty(x) && (i = n[x], i != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                xt(t, e, x, i, n, null);
            }
        return;
      default:
        if (No(e)) {
          for (R in n)
            n.hasOwnProperty(R) && (i = n[R], i !== void 0 && zc(
              t,
              e,
              R,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (i = n[m], i != null && xt(t, e, m, i, n, null));
  }
  var rT = {};
  function cT(t, e, n, i) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, s = null, f = null, m = null, T = null, x = null, R = null;
        for (O in n) {
          var V = n[O];
          if (n.hasOwnProperty(O) && V != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = V;
              default:
                i.hasOwnProperty(O) || xt(t, e, O, null, i, V);
            }
        }
        for (var M in i) {
          var O = i[M];
          if (V = n[M], i.hasOwnProperty(M) && (O != null || V != null))
            switch (M) {
              case "type":
                O !== V && (Tt = !0), s = O;
                break;
              case "name":
                O !== V && (Tt = !0), u = O;
                break;
              case "checked":
                O !== V && (Tt = !0), x = O;
                break;
              case "defaultChecked":
                O !== V && (Tt = !0), R = O;
                break;
              case "value":
                O !== V && (Tt = !0), f = O;
                break;
              case "defaultValue":
                O !== V && (Tt = !0), m = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(o(137, e));
                break;
              default:
                O !== V && xt(
                  t,
                  e,
                  M,
                  O,
                  i,
                  V
                );
            }
        }
        zo(
          t,
          f,
          m,
          T,
          x,
          R,
          s,
          u
        );
        return;
      case "select":
        O = f = m = M = null;
        for (s in n)
          if (T = n[s], n.hasOwnProperty(s) && T != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                O = T;
              default:
                i.hasOwnProperty(s) || xt(
                  t,
                  e,
                  s,
                  null,
                  i,
                  T
                );
            }
        for (u in i)
          if (s = i[u], T = n[u], i.hasOwnProperty(u) && (s != null || T != null))
            switch (u) {
              case "value":
                s !== T && (Tt = !0), M = s;
                break;
              case "defaultValue":
                s !== T && (Tt = !0), m = s;
                break;
              case "multiple":
                s !== T && (Tt = !0), f = s;
              default:
                s !== T && xt(
                  t,
                  e,
                  u,
                  s,
                  i,
                  T
                );
            }
        e = m, n = f, i = O, M != null ? la(t, !!n, M, !1) : !!i != !!n && (e != null ? la(t, !!n, e, !0) : la(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        O = M = null;
        for (m in n)
          if (u = n[m], n.hasOwnProperty(m) && u != null && !i.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                xt(t, e, m, null, i, u);
            }
        for (f in i)
          if (u = i[f], s = n[f], i.hasOwnProperty(f) && (u != null || s != null))
            switch (f) {
              case "value":
                u !== s && (Tt = !0), M = u;
                break;
              case "defaultValue":
                u !== s && (Tt = !0), O = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== s && xt(t, e, f, u, i, s);
            }
        Xh(t, M, O);
        return;
      case "option":
        for (var Y in n)
          if (M = n[Y], n.hasOwnProperty(Y) && M != null && !i.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                xt(
                  t,
                  e,
                  Y,
                  null,
                  i,
                  M
                );
            }
        for (T in i)
          if (M = i[T], O = n[T], i.hasOwnProperty(T) && M !== O && (M != null || O != null))
            switch (T) {
              case "selected":
                M !== O && (Tt = !0), t.selected = M && typeof M != "function" && typeof M != "symbol";
                break;
              default:
                xt(
                  t,
                  e,
                  T,
                  M,
                  i,
                  O
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var J in n)
          M = n[J], n.hasOwnProperty(J) && M != null && !i.hasOwnProperty(J) && xt(t, e, J, null, i, M);
        for (x in i)
          if (M = i[x], O = n[x], i.hasOwnProperty(x) && M !== O && (M != null || O != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null)
                  throw Error(o(137, e));
                break;
              default:
                xt(
                  t,
                  e,
                  x,
                  M,
                  i,
                  O
                );
            }
        return;
      default:
        if (No(e)) {
          for (var st in n)
            M = n[st], n.hasOwnProperty(st) && M !== void 0 && !i.hasOwnProperty(st) && zc(
              t,
              e,
              st,
              void 0,
              i,
              M
            );
          for (R in i)
            M = i[R], O = n[R], !i.hasOwnProperty(R) || M === O || M === void 0 && O === void 0 || zc(
              t,
              e,
              R,
              M,
              i,
              O
            );
          return;
        }
    }
    for (var D in n)
      M = n[D], n.hasOwnProperty(D) && M != null && !i.hasOwnProperty(D) && xt(t, e, D, null, i, M);
    for (V in i)
      M = i[V], O = n[V], !i.hasOwnProperty(V) || M === O || M == null && O == null || xt(t, e, V, M, i, O);
  }
  function Iy(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function fT() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var u = n[i], s = u.transferSize, f = u.initiatorType, m = u.duration;
        if (s && m && Iy(f)) {
          for (f = 0, m = u.responseEnd, i += 1; i < n.length; i++) {
            var T = n[i], x = T.startTime;
            if (x > m) break;
            var R = T.transferSize, V = T.initiatorType;
            R && Iy(V) && (T = T.responseEnd, f += R * (T < m ? 1 : (m - x) / (T - x)));
          }
          if (--i, e += 8 * (s + f) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Rc = null, Nc = null;
  function Ll(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function $y(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function tg(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function eg(t, e, n, i) {
    return n = Ll(
      n
    ).createElement(t), n[le] = i, n[be] = e, ce(n, t, e), te(n), n;
  }
  function _c(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Vc = null;
  function hT() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Vc ? !1 : (Vc = t, !0) : (Vc = null, !1);
  }
  var Uc = typeof setTimeout == "function" ? setTimeout : void 0, dT = typeof clearTimeout == "function" ? clearTimeout : void 0, ng = typeof Promise == "function" ? Promise : void 0, ig = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Uc, mT = typeof queueMicrotask == "function" ? queueMicrotask : typeof ng < "u" ? function(t) {
    return ng.resolve(null).then(t).catch(yT);
  } : Uc;
  function yT(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function fi(t) {
    return t === "head";
  }
  function ag(t, e) {
    var n = e, i = 0;
    do {
      var u = n.nextSibling;
      if (t.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (i === 0) {
            t.removeChild(u), Xa(e);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          qc(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, qc(n);
          for (var s = n.firstChild; s; ) {
            var f = s.nextSibling, m = s.nodeName;
            s[nl] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = f;
          }
        } else
          n === "body" && qc(t.ownerDocument.body);
      n = u;
    } while (n);
    Xa(e);
  }
  function lg(t, e) {
    var n = t;
    t = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = i;
    } while (n);
  }
  function ug(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var i = 1;
      else
        for (var u = i = 0; u < e.length; u++) {
          var s = e[u];
          0 < s.width && 0 < s.height && i++;
        }
      i === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function sg(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function gT(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function wc(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return gT(e, n, t);
  }
  function vT(t) {
    return t.documentElement.clientHeight;
  }
  function pT(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function ST(t, e, n, i, u, s, f, m, T) {
    var x = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var R = x.startViewTransition({
        update: function() {
          var M = x.defaultView, O = M.navigation && M.navigation.transition, Y = x.fonts.status;
          i();
          var J = [];
          if (Y === "loaded" && (vT(x), x.fonts.status === "loading" && J.push(x.fonts.ready)), Y = J.length, t !== null)
            for (var st = t.suspenseyImages, D = 0, E = 0; E < st.length; E++) {
              var C = st[E];
              if (!C.complete) {
                var _ = C.getBoundingClientRect();
                if (0 < _.bottom && 0 < _.right && _.top < M.innerHeight && _.left < M.innerWidth) {
                  if (D += Og(C), D > Us) {
                    J.length = Y;
                    break;
                  }
                  C = new Promise(
                    pT.bind(C)
                  ), J.push(C);
                }
              }
            }
          if (0 < J.length)
            return M = Promise.race([
              Promise.all(J),
              new Promise(function(Q) {
                return setTimeout(Q, 500);
              })
            ]).then(u, u), (O ? Promise.allSettled([O.finished, M]) : M).then(s, s);
          if (u(), O)
            return O.finished.then(
              s,
              s
            );
          s();
        },
        types: n
      });
      x.__reactViewTransition = R;
      var V = [];
      return R.ready.then(
        function() {
          for (var M = x.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < M.length; O++) {
            var Y = M[O], J = Y.effect, st = J.pseudoElement;
            if (st != null && st.startsWith("::view-transition")) {
              V.push(Y), Y = J.getKeyframes();
              for (var D = st = void 0, E = !0, C = 0; C < Y.length; C++) {
                var _ = Y[C], Q = _.width;
                if (st === void 0) st = Q;
                else if (st !== Q) {
                  E = !1;
                  break;
                }
                if (Q = _.height, D === void 0) D = Q;
                else if (D !== Q) {
                  E = !1;
                  break;
                }
                delete _.width, delete _.height, _.transform === "none" && delete _.transform;
              }
              E && st !== void 0 && D !== void 0 && (J.setKeyframes(Y), E = getComputedStyle(
                J.target,
                J.pseudoElement
              ), E.width !== st || E.height !== D) && (E = Y[0], E.width = st, E.height = D, E = Y[Y.length - 1], E.width = st, E.height = D, J.setKeyframes(Y));
            }
          }
          f();
        },
        function(M) {
          x.__reactViewTransition === R && (x.__reactViewTransition = null);
          try {
            if (typeof M == "object" && M !== null)
              switch (M.name) {
                case "InvalidStateError":
                  (M.message === "View transition was skipped because document visibility state is hidden." || M.message === "Skipping view transition because document visibility state has become hidden." || M.message === "Skipping view transition because viewport size changed." || M.message === "Transition was aborted because of invalid state") && (M = null);
              }
            M !== null && T(M);
          } finally {
            i(), u(), f();
          }
        }
      ), R.finished.finally(function() {
        for (var M = 0; M < V.length; M++)
          V[M].cancel();
        x.__reactViewTransition === R && (x.__reactViewTransition = null), m();
      }), R;
    } catch {
      return i(), u(), f(), null;
    }
  }
  function Zi(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Zi.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : Z({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Zi.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), i = [], u = 0; u < n.length; u++) {
      var s = n[u].effect;
      s !== null && s.target === t && s.pseudoElement === e && i.push(n[u]);
    }
    return i;
  }, Zi.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function og(t) {
    return {
      name: t,
      group: new Zi("group", t),
      imagePair: new Zi("image-pair", t),
      old: new Zi("old", t),
      new: new Zi("new", t)
    };
  }
  function Le(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Le.prototype.addEventListener = function(t, e, n) {
    var i = null, u = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var s = this._eventListeners;
      if (cg(s, t, e, n) === -1) {
        var f = this, m = e;
        n != null && typeof n != "boolean" && n.once === !0 && (m = function(T) {
          f.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, T) : e.handleEvent(T);
        }), i !== null && (u = f.removeEventListener.bind(
          f,
          t,
          e,
          n
        ), i.addEventListener("abort", u, { once: !0 }), u = i.removeEventListener.bind(i, "abort", u)), i = Ha(n), s.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: m,
          cleanup: u
        }), g(
          this._fragmentFiber.child,
          !1,
          TT,
          t,
          m,
          i
        );
      }
      this._eventListeners = s;
    }
  };
  function TT(t, e, n, i) {
    return U(t).addEventListener(
      e,
      n,
      i
    ), !1;
  }
  Le.prototype.removeEventListener = function(t, e, n) {
    var i = this._eventListeners;
    if (i !== null && (e = cg(
      i,
      t,
      e,
      n
    ), e !== -1)) {
      var u = i[e];
      n = u.attachedListener;
      var s = u.cleanup;
      u = Ha(u.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        bT,
        t,
        n,
        u
      ), i.splice(e, 1), s !== null && s();
    }
  };
  function bT(t, e, n, i) {
    return U(t).removeEventListener(
      e,
      n,
      i
    ), !1;
  }
  function Ha(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function rg(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function cg(t, e, n, i) {
    if (t.length === 0) return -1;
    i = rg(i);
    for (var u = 0; u < t.length; u++) {
      var s = t[u];
      if (s.type === e && s.listener === n && rg(s.optionsOrUseCapture) === i)
        return u;
    }
    return -1;
  }
  Le.prototype.dispatchEvent = function(t) {
    var e = b(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = U(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var i = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var u = 0; u < n.length; u++) {
          var s = n[u];
          i.addEventListener(
            s.type,
            s.attachedListener,
            Ha(s.optionsOrUseCapture)
          );
        }
      if (e.appendChild(i), t = i.dispatchEvent(t), n)
        for (u = 0; u < n.length; u++)
          s = n[u], i.removeEventListener(
            s.type,
            s.attachedListener,
            Ha(s.optionsOrUseCapture)
          );
      return e.removeChild(i), t;
    }
    return e.dispatchEvent(t);
  }, Le.prototype.focus = function(t) {
    g(
      this._fragmentFiber.child,
      !0,
      fg,
      t,
      void 0,
      void 0
    );
  };
  function fg(t, e) {
    return t.tag === 6 ? !1 : (t = U(t), VT(t, e));
  }
  Le.prototype.focusLast = function(t) {
    var e = [];
    g(
      this._fragmentFiber.child,
      !0,
      Bc,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !fg(e[n], t); n--) ;
  };
  function Bc(t, e) {
    return e.push(t), !1;
  }
  Le.prototype.blur = function() {
    var t = b(
      this._fragmentFiber
    );
    t !== null && (t = U(t), t = Ll(t).activeElement, t !== null && g(
      this._fragmentFiber.child,
      !1,
      ET,
      t,
      void 0,
      void 0
    ));
  };
  function ET(t, e) {
    return t.tag === 6 ? !1 : (t = U(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Le.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), g(
      this._fragmentFiber.child,
      !1,
      AT,
      t,
      void 0,
      void 0
    );
  };
  function AT(t, e) {
    return t.tag === 6 || (t = U(t), e.observe(t)), !1;
  }
  Le.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), g(
        this._fragmentFiber.child,
        !1,
        MT,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < nn.length; n++) {
        var i = nn[n];
        i.fragmentInstance === this && i.observer === t ? t.unobserve(i.instance) : nn[e++] = i;
      }
      nn.length = e;
    }
  };
  function MT(t, e) {
    return t.tag === 6 || (t = U(t), e.unobserve(t)), !1;
  }
  var nn = [], Hc = !1;
  function DT(t, e, n) {
    nn.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Hc || (Hc = !0, UT(function() {
      Hc = !1;
      var i = nn;
      nn = [];
      for (var u = 0; u < i.length; u++) {
        var s = i[u];
        s.observer.unobserve(s.instance);
      }
    }));
  }
  Le.prototype.getClientRects = function() {
    var t = [];
    return g(
      this._fragmentFiber.child,
      !1,
      xT,
      t,
      void 0,
      void 0
    ), t;
  };
  function xT(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = U(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Le.prototype.getRootNode = function(t) {
    var e = b(
      this._fragmentFiber
    );
    return e === null ? this : U(e).getRootNode(t);
  }, Le.prototype.compareDocumentPosition = function(t) {
    var e = b(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    g(
      this._fragmentFiber.child,
      !1,
      Bc,
      n,
      void 0,
      void 0
    );
    var i = U(e);
    if (n.length === 0) {
      if (n = i, z(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (n = e);
      }
      e = this._fragmentFiber;
      var u = i = n.compareDocumentPosition(t);
      return n === t ? u = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = N(e)[1], n === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = U(n).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = U(n[0]), u = U(n[n.length - 1]);
    var s = z(this._fragmentFiber) ? e.parentElement : i;
    if (s == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = s.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = s.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var f = e.compareDocumentPosition(t), m = u.compareDocumentPosition(t), T = f & Node.DOCUMENT_POSITION_CONTAINED_BY || m & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return m = i && s && f & Node.DOCUMENT_POSITION_FOLLOWING && m & Node.DOCUMENT_POSITION_PRECEDING, e = i && e === t || s && u === t || T || m ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && e === t || !s && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : f, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || CT(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function CT(t, e, n, i, u) {
    var s = Mi(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!s)
        t: {
          for (; s !== null; ) {
            if (s.tag === 7 && (s === e || s.alternate === e)) {
              n = !0;
              break t;
            }
            s = s.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (s === null)
        return s = u.ownerDocument, u === s || u === s.documentElement || u === s.body;
      t: {
        for (s = e, e = b(e); s !== null; ) {
          if (!(s.tag !== 5 && s.tag !== 3 && s.tag !== 27 || s !== e && s.alternate !== e)) {
            s = !0;
            break t;
          }
          s = s.return;
        }
        s = !1;
      }
      return s;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!s) && !(e = s === n) && (e = ct(
      n,
      s,
      et
    ), e === null ? e = !1 : (g(
      e,
      !0,
      G,
      s,
      n
    ), s = H, H = null, e = s !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!s) && !(e = s === i) && (e = ct(
      i,
      s,
      et
    ), e === null ? e = !1 : (g(
      e,
      !0,
      X,
      s,
      i
    ), s = H, j = H = null, e = s !== null)), e) : !1;
  }
  function hg(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Le.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(o(566));
    var e = [];
    g(
      this._fragmentFiber.child,
      !1,
      Bc,
      e,
      void 0,
      void 0
    );
    var n = t !== !1;
    if (e.length === 0) {
      var i = N(
        this._fragmentFiber
      );
      if (i = n ? i[1] || i[0] || b(this._fragmentFiber) : i[0] || i[1], i === null) return;
      if (i.tag === 6) {
        t = U(i), hg(t, n);
        return;
      }
      if (i = U(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        i.scrollIntoView(t);
      }
    }
    for (i = n ? e.length - 1 : 0; i !== (n ? -1 : e.length); ) {
      var u = e[i];
      u.tag === 6 ? (u = U(u), hg(u, n)) : U(u).scrollIntoView(t), i += n ? -1 : 1;
    }
  };
  function OT(t, e) {
    return t = U(t), dg(t, e), !1;
  }
  function dg(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function mg(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i];
        t.addEventListener(
          u.type,
          u.attachedListener,
          Ha(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      for (var f = 0, m = 0; m < nn.length; m++) {
        var T = nn[m];
        (T.fragmentInstance !== e || T.observer !== s || T.instance !== t) && (nn[f++] = T);
      }
      nn.length = f, s.observe(t);
    }), dg(t, e));
  }
  function zT(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          Ha(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      typeof s.rootMargin == "string" ? DT(
        e,
        s,
        t
      ) : s.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Lc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Lc(n), Eu(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function RT(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var u = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (i) {
        if (!t[nl])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (s = t.getAttribute("rel"), s === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (s !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (s = t.getAttribute("src"), (s !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && s && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var s = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === s)
          return t;
      } else return t;
      if (t = Ke(t.nextSibling), t === null) break;
    }
    return null;
  }
  function NT(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Ke(t.nextSibling), t === null)) return null;
    return t;
  }
  function yg(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ke(t.nextSibling), t === null)) return null;
    return t;
  }
  function jc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Yc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function _T(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var i = function() {
        e(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), t._reactRetry = i;
    }
  }
  function Ke(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Gc = null;
  function gg(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Ke(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function vg(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function VT(t, e) {
    function n() {
      i = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var i = !1;
    try {
      t.ownerDocument.addEventListener("focus", n, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", n, !0);
    }
    return i;
  }
  function UT(t) {
    ig(function() {
      ig(function(e) {
        return t(e);
      });
    });
  }
  function pg(t, e, n) {
    switch (e = Ll(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function Sg(t, e, n) {
    for (var i in n) {
      var u = n[i];
      n.hasOwnProperty(i) && u != null && xt(t, e, i, null, rT, u);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === rn && (t.onclick = null), Eu(t);
  }
  function qc(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Eu(t);
  }
  var Je = /* @__PURE__ */ new Map(), Tg = /* @__PURE__ */ new Set();
  function jl(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var jn = at.d;
  at.d = {
    f: wT,
    r: BT,
    D: HT,
    C: LT,
    L: jT,
    m: YT,
    X: qT,
    S: GT,
    M: XT
  };
  function wT() {
    var t = jn.f(), e = Ds();
    return t || e;
  }
  function BT(t) {
    var e = na(t);
    e !== null && e.tag === 5 && e.type === "form" ? Em(e) : jn.r(t);
  }
  var La = typeof document > "u" ? null : document;
  function bg(t, e, n) {
    var i = La;
    if (i && typeof e == "string" && e) {
      var u = je(e);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Tg.has(u) || (Tg.add(u), t = { rel: t, crossOrigin: n, href: e }, i.querySelector(u) === null && (e = i.createElement("link"), ce(e, "link", t), te(e), i.head.appendChild(e)));
    }
  }
  function HT(t) {
    jn.D(t), bg("dns-prefetch", t, null);
  }
  function LT(t, e) {
    jn.C(t, e), bg("preconnect", t, e);
  }
  function jT(t, e, n) {
    jn.L(t, e, n);
    var i = La;
    if (i && t && e) {
      var u = 'link[rel="preload"][as="' + je(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + je(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + je(
        n.imageSizes
      ) + '"]')) : u += '[href="' + je(t) + '"]';
      var s = u;
      switch (e) {
        case "style":
          s = ja(t);
          break;
        case "script":
          s = Ya(t);
      }
      if (!(Je.has(s) || (t = Z(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Je.set(s, t), i.querySelector(u) !== null || e === "style" && i.querySelector(Yl(s)) || e === "script" && i.querySelector(Gl(s))))) {
        var f = i.createElement("link");
        ce(f, "link", t), e === "style" && (f[bu] = !0, f.onload = f.onerror = function() {
          Uh(f);
        }), te(f), i.head.appendChild(f);
      }
    }
  }
  function YT(t, e) {
    jn.m(t, e);
    var n = La;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script", u = 'link[rel="modulepreload"][as="' + je(i) + '"][href="' + je(t) + '"]', s = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = Ya(t);
      }
      if (!Je.has(s) && (t = Z({ rel: "modulepreload", href: t }, e), Je.set(s, t), n.querySelector(u) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Gl(s)))
              return;
        }
        i = n.createElement("link"), ce(i, "link", t), te(i), n.head.appendChild(i);
      }
    }
  }
  function GT(t, e, n) {
    jn.S(t, e, n);
    var i = La;
    if (i && t) {
      var u = ia(i).hoistableStyles, s = ja(t);
      e = e || "default";
      var f = u.get(s);
      if (!f) {
        var m = { loading: 0, preload: null };
        if (f = i.querySelector(
          Yl(s)
        ))
          m.loading = 5;
        else {
          t = Z(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Je.get(s)) && Xc(t, n);
          var T = f = i.createElement("link");
          te(T), ce(T, "link", t), T._p = new Promise(function(x, R) {
            T.onload = x, T.onerror = R;
          }), T.addEventListener("load", function() {
            m.loading |= 1;
          }), T.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, _s(f, e, i);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: m
        }, u.set(s, f);
      }
    }
  }
  function qT(t, e) {
    jn.X(t, e);
    var n = La;
    if (n && t) {
      var i = ia(n).hoistableScripts, u = Ya(t), s = i.get(u);
      s || (s = n.querySelector(Gl(u)), s || (t = Z({ src: t, async: !0 }, e), (e = Je.get(u)) && Qc(t, e), s = n.createElement("script"), te(s), ce(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(u, s));
    }
  }
  function XT(t, e) {
    jn.M(t, e);
    var n = La;
    if (n && t) {
      var i = ia(n).hoistableScripts, u = Ya(t), s = i.get(u);
      s || (s = n.querySelector(Gl(u)), s || (t = Z({ src: t, async: !0, type: "module" }, e), (e = Je.get(u)) && Qc(t, e), s = n.createElement("script"), te(s), ce(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(u, s));
    }
  }
  function Eg(t, e, n, i) {
    var u = (u = qn.current) ? jl(u) : null;
    if (!u) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = ja(n.href), e = ia(
          u
        ).hoistableStyles, i = e.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = ja(n.href);
          var s = ia(
            u
          ).hoistableStyles, f = s.get(t);
          if (f || (u = u.ownerDocument || u, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(t, f), (s = u.querySelector(
            Yl(t)
          )) ? s._p || (f.instance = s, f.state.loading = 5) : (s = Je.get(t), s || (s = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Je.set(t, s)), QT(
            u,
            t,
            s,
            f.state
          ))), e && i === null)
            throw Error(o(528, ""));
          return f;
        }
        if (e && i !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = Ya(n), e = ia(
          u
        ).hoistableScripts, i = e.get(n), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function ja(t) {
    return 'href="' + je(t) + '"';
  }
  function Yl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ag(t) {
    return Z({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function QT(t, e, n, i) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[bu] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[bu] = !0, e.onload = e.onerror = Uh.bind(null, e), ce(e, "link", n), te(e), t.head.appendChild(e);
    i.preload = e, e.addEventListener("load", function() {
      return i.loading |= 1;
    }), e.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function Ya(t) {
    return '[src="' + je(t) + '"]';
  }
  function Gl(t) {
    return "script[async]" + t;
  }
  function Mg(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var i = t.querySelector(
            'style[data-href~="' + je(n.href) + '"]'
          );
          if (i)
            return e.instance = i, te(i), i;
          var u = Z({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (t.ownerDocument || t).createElement(
            "style"
          ), te(i), ce(i, "style", u), _s(i, n.precedence, t), e.instance = i;
        case "stylesheet":
          u = ja(n.href);
          var s = t.querySelector(
            Yl(u)
          );
          if (s)
            return e.state.loading |= 4, e.instance = s, te(s), s;
          i = Ag(n), (u = Je.get(u)) && Xc(i, u), s = (t.ownerDocument || t).createElement("link"), te(s);
          var f = s;
          return f._p = new Promise(function(m, T) {
            f.onload = m, f.onerror = T;
          }), ce(s, "link", i), e.state.loading |= 4, _s(s, n.precedence, t), e.instance = s;
        case "script":
          return s = Ya(n.src), (u = t.querySelector(
            Gl(s)
          )) ? (e.instance = u, te(u), u) : (i = n, (u = Je.get(s)) && (i = Z({}, n), Qc(i, u)), t = t.ownerDocument || t, u = t.createElement("script"), te(u), ce(u, "link", i), t.head.appendChild(u), e.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (i = e.instance, e.state.loading |= 4, _s(i, n.precedence, t));
    return e.instance;
  }
  function _s(t, e, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = i.length ? i[i.length - 1] : null, s = u, f = 0; f < i.length; f++) {
      var m = i[f];
      if (m.dataset.precedence === e) s = m;
      else if (s !== u) break;
    }
    s ? s.parentNode.insertBefore(t, s.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Xc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Qc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Vs = null;
  function Dg(t, e, n) {
    if (Vs === null) {
      var i = /* @__PURE__ */ new Map(), u = Vs = /* @__PURE__ */ new Map();
      u.set(n, i);
    } else
      u = Vs, i = u.get(n), i || (i = /* @__PURE__ */ new Map(), u.set(n, i));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), u = 0; u < n.length; u++) {
      var s = n[u];
      if (!(s[nl] || s[le] || t === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = s.getAttribute(e) || "";
        f = t + f;
        var m = i.get(f);
        m ? m.push(s) : i.set(f, [s]);
      }
    }
    return i;
  }
  function Zc(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function ZT(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function xg(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function Cg(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Og(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function zg(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Og(e), t.suspenseyImages.push(e)), t = FT.bind(t), e.decode().then(t, t));
  }
  function KT(t, e, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = ja(i.href), s = e.querySelector(
          Yl(u)
        );
        if (s) {
          e = s._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ql.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = s, te(s);
          return;
        }
        s = e.ownerDocument || e, i = Ag(i), (u = Je.get(u)) && Xc(i, u), s = s.createElement("link"), te(s);
        var f = s;
        f._p = new Promise(function(m, T) {
          f.onload = m, f.onerror = T;
        }), ce(s, "link", i), n.instance = s;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = ql.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Us = 0;
  function JT(t, e) {
    return t.stylesheets && t.count === 0 && Bs(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (t.stylesheets && Bs(t, t.stylesheets), t.unsuspend) {
          var s = t.unsuspend;
          t.unsuspend = null, s();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Us === 0 && (Us = 62500 * fT());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Bs(t, t.stylesheets), t.unsuspend)) {
            var s = t.unsuspend;
            t.unsuspend = null, s();
          }
        },
        (t.imgBytes > Us ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(i), clearTimeout(u);
      };
    } : null;
  }
  function Rg(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Bs(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function ql() {
    this.count--, Rg(this);
  }
  function FT() {
    this.imgCount--, Rg(this);
  }
  var ws = null;
  function Bs(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ws = /* @__PURE__ */ new Map(), e.forEach(PT, t), ws = null, ql.call(t));
  }
  function PT(t, e) {
    if (!(e.state.loading & 4)) {
      var n = ws.get(t);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), ws.set(t, n);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < u.length; s++) {
          var f = u[s];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), i = f);
        }
        i && n.set(null, i);
      }
      u = e.instance, f = u.getAttribute("data-precedence"), s = n.get(f) || i, s === i && n.set(null, u), n.set(f, u), this.count++, i = ql.bind(this), u.addEventListener("load", i), u.addEventListener("error", i), s ? s.parentNode.insertBefore(u, s.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Ga = {
    $$typeof: Rt,
    Provider: null,
    Consumer: null,
    _currentValue: Mn,
    _currentValue2: Mn,
    _threadCount: 0
  };
  function kT(t, e, n, i, u, s, f, m, T) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Do(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Do(0), this.hiddenUpdates = Do(null), this.identifierPrefix = i, this.onUncaughtError = u, this.onCaughtError = s, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = T, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ng(t, e, n, i, u, s, f, m, T, x, R, V) {
    return t = new kT(
      t,
      e,
      n,
      f,
      T,
      x,
      R,
      V,
      m
    ), e = 1, s === !0 && (e |= 24), s = Ee(3, null, null, e), t.current = s, s.stateNode = t, e = ur(), e.refCount++, t.pooledCache = e, e.refCount++, s.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: e
    }, cr(s), t;
  }
  function _g(t) {
    return t ? (t = da, t) : da;
  }
  function Vg(t, e, n, i, u, s) {
    u = _g(u), i.context === null ? i.context = u : i.pendingContext = u, i = $n(e), i.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (i.callback = s), n = ti(t, i, e), n !== null && (xe(n, t, e), Sl(n, t, e));
  }
  function Ug(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Kc(t, e) {
    Ug(t, e), (t = t.alternate) && Ug(t, e);
  }
  function wg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Oi(t, 67108864);
      e !== null && xe(e, t, 67108864), Kc(t, 67108864);
    }
  }
  function Bg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = He();
      e = xo(e);
      var n = Oi(t, e);
      n !== null && xe(n, t, e), Kc(t, e);
    }
  }
  var qa = !0;
  function WT(t, e, n, i) {
    var u = P.T;
    P.T = null;
    var s = at.p;
    try {
      at.p = 2, Jc(t, e, n, i);
    } finally {
      at.p = s, P.T = u;
    }
  }
  function IT(t, e, n, i) {
    var u = P.T;
    P.T = null;
    var s = at.p;
    try {
      at.p = 8, Jc(t, e, n, i);
    } finally {
      at.p = s, P.T = u;
    }
  }
  function Jc(t, e, n, i) {
    if (qa) {
      var u = Fc(i);
      if (u === null)
        Oc(
          t,
          e,
          i,
          Hs,
          n
        ), Lg(t, i);
      else if (tb(
        u,
        t,
        e,
        n,
        i
      ))
        i.stopPropagation();
      else if (Lg(t, i), e & 4 && -1 < $T.indexOf(t)) {
        for (; u !== null; ) {
          var s = na(u);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var f = Ai(s.pendingLanes);
                  if (f !== 0) {
                    var m = s;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; f; ) {
                      var T = 1 << 31 - Re(f);
                      m.entanglements[1] |= T, f &= ~T;
                    }
                    Sn(s), (Et & 6) === 0 && (Es = Oe() + 500, wl(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Oi(s, 2), m !== null && xe(m, s, 2), Ds(), Kc(s, 2);
            }
          if (s = Fc(i), s === null && Oc(
            t,
            e,
            i,
            Hs,
            n
          ), s === u) break;
          u = s;
        }
        u !== null && i.stopPropagation();
      } else
        Oc(
          t,
          e,
          i,
          null,
          n
        );
    }
  }
  function Fc(t) {
    return t = Vo(t), Pc(t);
  }
  var Hs = null;
  function Pc(t) {
    if (Hs = null, t = Mi(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = y(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Hs = t, null;
  }
  function Hg(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (f1()) {
          case Eh:
            return 2;
          case Ah:
            return 8;
          case gu:
          case h1:
            return 32;
          case Mh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var kc = !1, hi = null, di = null, mi = null, Xl = /* @__PURE__ */ new Map(), Ql = /* @__PURE__ */ new Map(), yi = [], $T = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Lg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        hi = null;
        break;
      case "dragenter":
      case "dragleave":
        di = null;
        break;
      case "mouseover":
      case "mouseout":
        mi = null;
        break;
      case "pointerover":
      case "pointerout":
        Xl.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ql.delete(e.pointerId);
    }
  }
  function Zl(t, e, n, i, u, s) {
    return t === null || t.nativeEvent !== s ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: s,
      targetContainers: [u]
    }, e !== null && (e = na(e), e !== null && wg(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, u !== null && e.indexOf(u) === -1 && e.push(u), t);
  }
  function tb(t, e, n, i, u) {
    switch (e) {
      case "focusin":
        return hi = Zl(
          hi,
          t,
          e,
          n,
          i,
          u
        ), !0;
      case "dragenter":
        return di = Zl(
          di,
          t,
          e,
          n,
          i,
          u
        ), !0;
      case "mouseover":
        return mi = Zl(
          mi,
          t,
          e,
          n,
          i,
          u
        ), !0;
      case "pointerover":
        var s = u.pointerId;
        return Xl.set(
          s,
          Zl(
            Xl.get(s) || null,
            t,
            e,
            n,
            i,
            u
          )
        ), !0;
      case "gotpointercapture":
        return s = u.pointerId, Ql.set(
          s,
          Zl(
            Ql.get(s) || null,
            t,
            e,
            n,
            i,
            u
          )
        ), !0;
    }
    return !1;
  }
  function jg(t) {
    var e = Mi(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, Nh(t.priority, function() {
              Bg(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = y(n), e !== null) {
            t.blockedOn = e, Nh(t.priority, function() {
              Bg(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ls(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Fc(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        _o = i, n.target.dispatchEvent(i), _o = null;
      } else
        return e = na(n), e !== null && wg(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Yg(t, e, n) {
    Ls(t) && n.delete(e);
  }
  function eb() {
    kc = !1, hi !== null && Ls(hi) && (hi = null), di !== null && Ls(di) && (di = null), mi !== null && Ls(mi) && (mi = null), Xl.forEach(Yg), Ql.forEach(Yg);
  }
  function js(t, e) {
    t.blockedOn === e && (t.blockedOn = null, kc || (kc = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      eb
    )));
  }
  var Ys = null;
  function Gg(t) {
    Ys !== t && (Ys = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Ys === t && (Ys = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], i = t[e + 1], u = t[e + 2];
          if (typeof i != "function") {
            if (Pc(i || n) === null)
              continue;
            break;
          }
          var s = na(n);
          s !== null && (t.splice(e, 3), e -= 3, Nr(
            s,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: i
            },
            i,
            u
          ));
        }
      }
    ));
  }
  function Xa(t) {
    function e(T) {
      return js(T, t);
    }
    hi !== null && js(hi, t), di !== null && js(di, t), mi !== null && js(mi, t), Xl.forEach(e), Ql.forEach(e);
    for (var n = 0; n < yi.length; n++) {
      var i = yi[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < yi.length && (n = yi[0], n.blockedOn === null); )
      jg(n), n.blockedOn === null && yi.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var u = n[i], s = n[i + 1], f = u[be] || null;
        if (typeof s == "function")
          f || Gg(n);
        else if (f) {
          var m = null;
          if (s && s.hasAttribute("formAction")) {
            if (u = s, f = s[be] || null)
              m = f.formAction;
            else if (Pc(u) !== null) continue;
          } else m = f.action;
          typeof m == "function" ? n[i + 1] = m : (n.splice(i, 3), i -= 3), Gg(n);
        }
      }
  }
  function qg() {
    function t(s) {
      s.canIntercept && s.info === "react-transition" && s.intercept({
        handler: function() {
          return new Promise(function(f) {
            return u = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      u !== null && (u(), u = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), u !== null && (u(), u = null);
      };
    }
  }
  function Wc(t) {
    this._internalRoot = t;
  }
  Gs.prototype.render = Wc.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(o(409));
    var n = e.current, i = He();
    Vg(n, i, t, e, null, null);
  }, Gs.prototype.unmount = Wc.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Vg(t.current, 2, null, t, null, null), Ds(), e[ea] = null;
    }
  };
  function Gs(t) {
    this._internalRoot = t;
  }
  Gs.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Rh();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < yi.length && e !== 0 && e < yi[n].priority; n++) ;
      yi.splice(n, 0, t), n === 0 && jg(t);
    }
  };
  var Xg = l.version;
  if (Xg !== "19.3.1")
    throw Error(
      o(
        527,
        Xg,
        "19.3.1"
      )
    );
  at.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = S(e), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var nb = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: P,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qs.isDisabled && qs.supportsFiber)
      try {
        $a = qs.inject(
          nb
        ), ze = qs;
      } catch {
      }
  }
  return Jl.createRoot = function(t, e) {
    if (!c(t)) throw Error(o(299));
    var n = !1, i = "", u = _m, s = Vm, f = Um;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError)), e = Ng(
      t,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      u,
      s,
      f,
      qg
    ), t[ea] = e.current, Cc(t), new Wc(e);
  }, Jl.hydrateRoot = function(t, e, n) {
    if (!c(t)) throw Error(o(299));
    var i = !1, u = "", s = _m, f = Vm, m = Um, T = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (T = n.formState)), e = Ng(
      t,
      1,
      !0,
      e,
      n ?? null,
      i,
      u,
      T,
      s,
      f,
      m,
      qg
    ), e.context = _g(null), n = e.current, i = He(), i = xo(i), u = $n(i), u.callback = null, ti(n, u, i), n = i, e.current.lanes = n, el(e, n), Sn(e), t[ea] = e.current, Cc(t), new Gs(e);
  }, Jl.version = "19.3.1", Jl;
}
var $g;
function hb() {
  if ($g) return $c.exports;
  $g = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), $c.exports = fb(), $c.exports;
}
var db = hb(), I = Jf();
const bv = I.createContext({});
function nu(a) {
  const l = I.useRef(null);
  return l.current === null && (l.current = a()), l.current;
}
const mb = typeof window < "u", Ev = mb ? I.useLayoutEffect : I.useEffect, Ff = /* @__PURE__ */ I.createContext(null);
function Pf(a, l) {
  a.indexOf(l) === -1 && a.push(l);
}
function to(a, l) {
  const r = a.indexOf(l);
  r > -1 && a.splice(r, 1);
}
const An = (a, l, r) => r > l ? l : r < a ? a : r;
function t0(a, l) {
  return l ? `${a}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${l}` : a;
}
let ou = () => {
}, Si = () => {
};
var Tv;
typeof process < "u" && ((Tv = process.env) == null ? void 0 : Tv.NODE_ENV) !== "production" && (ou = (a, l, r) => {
  !a && typeof console < "u" && console.warn(t0(l, r));
}, Si = (a, l, r) => {
  if (!a)
    throw new Error(t0(l, r));
});
const Ti = {}, Av = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), Mv = (a) => typeof a == "object" && a !== null, Dv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function xv(a) {
  let l;
  return () => (l === void 0 && (l = a()), l);
}
const Pe = /* @__NO_SIDE_EFFECTS__ */ (a) => a, ru = (...a) => a.reduce((l, r) => (o) => r(l(o))), iu = /* @__NO_SIDE_EFFECTS__ */ (a, l, r) => {
  const o = l - a;
  return o ? (r - a) / o : 1;
};
class kf {
  constructor() {
    this.subscriptions = [];
  }
  add(l) {
    return Pf(this.subscriptions, l), () => to(this.subscriptions, l);
  }
  notify(l, r, o) {
    const c = this.subscriptions.length;
    if (c)
      if (c === 1)
        this.subscriptions[0](l, r, o);
      else
        for (let d = 0; d < c; d++) {
          const h = this.subscriptions[d];
          h && h(l, r, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Ce = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, Fe = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, Cv = /* @__NO_SIDE_EFFECTS__ */ (a, l) => l ? a * (1e3 / l) : 0, Ov = (a, l, r) => (((1 - 3 * r + 3 * l) * a + (3 * r - 6 * l)) * a + 3 * l) * a, yb = 1e-7, gb = 12;
function vb(a, l, r, o, c) {
  let d, h, y = 0;
  do
    h = l + (r - l) / 2, d = Ov(h, o, c) - a, d > 0 ? r = h : l = h;
  while (Math.abs(d) > yb && ++y < gb);
  return h;
}
// @__NO_SIDE_EFFECTS__
function cu(a, l, r, o) {
  if (a === l && r === o)
    return Pe;
  const c = (d) => vb(d, 0, 1, a, r);
  return (d) => d === 0 || d === 1 ? d : Ov(c(d), l, o);
}
const zv = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => l <= 0.5 ? a(2 * l) / 2 : (2 - a(2 * (1 - l))) / 2, Rv = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => 1 - a(1 - l), Nv = /* @__PURE__ */ cu(0.33, 1.53, 0.69, 0.99), Wf = /* @__PURE__ */ Rv(Nv), _v = /* @__PURE__ */ zv(Wf), Vv = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Wf(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), If = (a) => 1 - Math.sin(Math.acos(a)), Uv = /* @__PURE__ */ Rv(If), wv = /* @__PURE__ */ zv(If), pb = /* @__PURE__ */ cu(0.42, 0, 1, 1), Sb = /* @__PURE__ */ cu(0, 0, 0.58, 1), Bv = /* @__PURE__ */ cu(0.42, 0, 0.58, 1), Tb = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", Hv = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", e0 = {
  linear: Pe,
  easeIn: pb,
  easeInOut: Bv,
  easeOut: Sb,
  circIn: If,
  circInOut: wv,
  circOut: Uv,
  backIn: Wf,
  backInOut: _v,
  backOut: Nv,
  anticipate: Vv
}, bb = (a) => typeof a == "string", n0 = (a) => {
  if (/* @__PURE__ */ Hv(a)) {
    Si(a.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [l, r, o, c] = a;
    return /* @__PURE__ */ cu(l, r, o, c);
  } else if (bb(a))
    return Si(e0[a] !== void 0, `Invalid easing type '${a}'`, "invalid-easing-type"), e0[a];
  return a;
}, Xs = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Eb(a) {
  let l = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(S) {
    d.has(S) && (p.schedule(S), a()), S(h);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (S, v = !1, g = !1) => {
      const z = g && o ? l : r;
      return v && d.add(S), z.add(S), S;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (S) => {
      r.delete(S), d.delete(S);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (S) => {
      if (h = S, o) {
        c = !0;
        return;
      }
      o = !0;
      const v = l;
      l = r, r = v, l.forEach(y), l.clear(), o = !1, c && (c = !1, p.process(S));
    }
  };
  return p;
}
const Ab = 40;
function Lv(a, l) {
  let r = !1, o = !0;
  const c = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => r = !0, h = Xs.reduce((G, X) => (G[X] = Eb(d), G), {}), { setup: y, read: p, resolveKeyframes: S, preUpdate: v, update: g, preRender: b, render: z, postRender: N } = h, w = () => {
    const G = Ti.useManualTiming, X = G ? c.timestamp : performance.now();
    r = !1, G || (c.delta = o ? 1e3 / 60 : Math.max(Math.min(X - c.timestamp, Ab), 1)), c.timestamp = X, c.isProcessing = !0, y.process(c), p.process(c), S.process(c), v.process(c), g.process(c), b.process(c), z.process(c), N.process(c), c.isProcessing = !1, r && l && (o = !1, a(w));
  }, U = () => {
    r = !0, o = !0, c.isProcessing || a(w);
  };
  return { schedule: Xs.reduce((G, X) => {
    const et = h[X];
    return G[X] = (ct, Z = !1, q = !1) => (r || U(), et.schedule(ct, Z, q)), G;
  }, {}), cancel: (G) => {
    for (let X = 0; X < Xs.length; X++)
      h[Xs[X]].cancel(G);
  }, state: c, steps: h };
}
const { schedule: Ct, cancel: Gn, state: he, steps: lf } = /* @__PURE__ */ Lv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Pe, !0);
let Js;
function Mb() {
  Js = void 0;
}
const Se = {
  now: () => (Js === void 0 && Se.set(he.isProcessing || Ti.useManualTiming ? he.timestamp : performance.now()), Js),
  set: (a) => {
    Js = a, queueMicrotask(Mb);
  }
}, jv = (a) => (l) => typeof l == "string" && l.startsWith(a), Yv = /* @__PURE__ */ jv("--"), Db = /* @__PURE__ */ jv("var(--"), $f = (a) => Db(a) ? xb.test(a.split("/*")[0].trim()) : !1, xb = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function i0(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const Pa = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, au = {
  ...Pa,
  transform: (a) => An(0, 1, a)
}, Qs = {
  ...Pa,
  default: 1
}, Wl = (a) => Math.round(a * 1e5) / 1e5, th = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Cb(a) {
  return a == null;
}
const Ob = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, eh = (a, l) => (r) => !!(typeof r == "string" && Ob.test(r) && r.startsWith(a) || l && !Cb(r) && Object.prototype.hasOwnProperty.call(r, l)), Gv = (a, l, r) => (o) => {
  if (typeof o != "string")
    return o;
  const [c, d, h, y] = o.match(th);
  return {
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    [r]: parseFloat(h),
    alpha: y !== void 0 ? parseFloat(y) : 1
  };
}, zb = (a) => An(0, 255, a), uf = {
  ...Pa,
  transform: (a) => Math.round(zb(a))
}, Fi = {
  test: /* @__PURE__ */ eh("rgb", "red"),
  parse: /* @__PURE__ */ Gv("red", "green", "blue"),
  transform: ({ red: a, green: l, blue: r, alpha: o = 1 }) => "rgba(" + uf.transform(a) + ", " + uf.transform(l) + ", " + uf.transform(r) + ", " + Wl(au.transform(o)) + ")"
};
function Rb(a) {
  let l = "", r = "", o = "", c = "";
  return a.length > 5 ? (l = a.substring(1, 3), r = a.substring(3, 5), o = a.substring(5, 7), c = a.substring(7, 9)) : (l = a.substring(1, 2), r = a.substring(2, 3), o = a.substring(3, 4), c = a.substring(4, 5), l += l, r += r, o += o, c += c), {
    red: parseInt(l, 16),
    green: parseInt(r, 16),
    blue: parseInt(o, 16),
    alpha: c ? parseInt(c, 16) / 255 : 1
  };
}
const Ef = {
  test: /* @__PURE__ */ eh("#"),
  parse: Rb,
  transform: Fi.transform
}, fu = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (l) => typeof l == "string" && l.endsWith(a) && l.split(" ").length === 1,
  parse: parseFloat,
  transform: (l) => `${l}${a}`
}), Yn = /* @__PURE__ */ fu("deg"), En = /* @__PURE__ */ fu("%"), F = /* @__PURE__ */ fu("px"), Nb = /* @__PURE__ */ fu("vh"), _b = /* @__PURE__ */ fu("vw"), a0 = {
  ...En,
  parse: (a) => En.parse(a) / 100,
  transform: (a) => En.transform(a * 100)
}, Za = {
  test: /* @__PURE__ */ eh("hsl", "hue"),
  parse: /* @__PURE__ */ Gv("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: l, lightness: r, alpha: o = 1 }) => "hsla(" + Math.round(a) + ", " + En.transform(Wl(l)) + ", " + En.transform(Wl(r)) + ", " + Wl(au.transform(o)) + ")"
}, Ft = {
  test: (a) => Fi.test(a) || Ef.test(a) || Za.test(a),
  parse: (a) => Fi.test(a) ? Fi.parse(a) : Za.test(a) ? Za.parse(a) : Ef.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Fi.transform(a) : Za.transform(a),
  getAnimatableNone: (a) => {
    const l = Ft.parse(a);
    return l.alpha = 0, Ft.transform(l);
  }
}, Vb = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ub(a) {
  var l, r;
  return isNaN(a) && typeof a == "string" && (((l = a.match(th)) == null ? void 0 : l.length) || 0) + (((r = a.match(Vb)) == null ? void 0 : r.length) || 0) > 0;
}
const qv = "number", Xv = "color", wb = "var", Bb = "var(", l0 = "${}", Hb = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Fa(a) {
  const l = a.toString(), r = [], o = {
    color: [],
    number: [],
    var: []
  }, c = [];
  let d = 0;
  const y = l.replace(Hb, (p) => (Ft.test(p) ? (o.color.push(d), c.push(Xv), r.push(Ft.parse(p))) : p.startsWith(Bb) ? (o.var.push(d), c.push(wb), r.push(p)) : (o.number.push(d), c.push(qv), r.push(parseFloat(p))), ++d, l0)).split(l0);
  return { values: r, split: y, indexes: o, types: c };
}
function Lb(a) {
  return Fa(a).values;
}
function Qv({ split: a, types: l }) {
  const r = a.length;
  return (o) => {
    let c = "";
    for (let d = 0; d < r; d++)
      if (c += a[d], o[d] !== void 0) {
        const h = l[d];
        h === qv ? c += Wl(o[d]) : h === Xv ? c += Ft.transform(o[d]) : c += o[d];
      }
    return c;
  };
}
function jb(a) {
  return Qv(Fa(a));
}
const Yb = (a) => typeof a == "number" ? 0 : Ft.test(a) ? Ft.getAnimatableNone(a) : a, Gb = (a, l) => typeof a == "number" ? l != null && l.trim().endsWith("/") ? a : 0 : Yb(a);
function qb(a) {
  const l = Fa(a);
  return Qv(l)(l.values.map((o, c) => Gb(o, l.split[c])));
}
const un = {
  test: Ub,
  parse: Lb,
  createTransformer: jb,
  getAnimatableNone: qb
};
function sf(a, l, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? a + (l - a) * 6 * r : r < 1 / 2 ? l : r < 2 / 3 ? a + (l - a) * (2 / 3 - r) * 6 : a;
}
function Xb({ hue: a, saturation: l, lightness: r, alpha: o }) {
  a /= 360, l /= 100, r /= 100;
  let c = 0, d = 0, h = 0;
  if (!l)
    c = d = h = r;
  else {
    const y = r < 0.5 ? r * (1 + l) : r + l - r * l, p = 2 * r - y;
    c = sf(p, y, a + 1 / 3), d = sf(p, y, a), h = sf(p, y, a - 1 / 3);
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: o
  };
}
function eo(a, l) {
  return (r) => r > 0 ? l : a;
}
const Vt = (a, l, r) => a + (l - a) * r, of = (a, l, r) => {
  const o = a * a, c = r * (l * l - o) + o;
  return c < 0 ? 0 : Math.sqrt(c);
}, Qb = [Ef, Fi, Za], Zb = (a) => Qb.find((l) => l.test(a));
function u0(a) {
  const l = Zb(a);
  if (ou(!!l, `'${a}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !l)
    return !1;
  let r = l.parse(a);
  return l === Za && (r = Xb(r)), r;
}
const s0 = (a, l) => {
  const r = u0(a), o = u0(l);
  if (!r || !o)
    return eo(a, l);
  const c = { ...r };
  return (d) => (c.red = of(r.red, o.red, d), c.green = of(r.green, o.green, d), c.blue = of(r.blue, o.blue, d), c.alpha = Vt(r.alpha, o.alpha, d), Fi.transform(c));
}, Af = /* @__PURE__ */ new Set(["none", "hidden"]);
function Kb(a, l) {
  return Af.has(a) ? (r) => r <= 0 ? a : l : (r) => r >= 1 ? l : a;
}
function Jb(a, l) {
  return (r) => Vt(a, l, r);
}
function nh(a) {
  return typeof a == "number" ? Jb : typeof a == "string" ? $f(a) ? eo : Ft.test(a) ? s0 : kb : Array.isArray(a) ? Zv : typeof a == "object" ? Ft.test(a) ? s0 : Fb : eo;
}
function Zv(a, l) {
  const r = [...a], o = r.length, c = a.map((d, h) => nh(d)(d, l[h]));
  return (d) => {
    for (let h = 0; h < o; h++)
      r[h] = c[h](d);
    return r;
  };
}
function Fb(a, l) {
  const r = { ...a, ...l }, o = {};
  for (const c in r)
    a[c] !== void 0 && l[c] !== void 0 && (o[c] = nh(a[c])(a[c], l[c]));
  return (c) => {
    for (const d in o)
      r[d] = o[d](c);
    return r;
  };
}
function Pb(a, l) {
  const r = [], o = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < l.values.length; c++) {
    const d = l.types[c], h = a.indexes[d][o[d]], y = a.values[h] ?? 0;
    r[c] = y, o[d]++;
  }
  return r;
}
const kb = (a, l) => {
  const r = un.createTransformer(l), o = Fa(a), c = Fa(l);
  return o.indexes.var.length === c.indexes.var.length && o.indexes.color.length === c.indexes.color.length && o.indexes.number.length >= c.indexes.number.length ? Af.has(a) && !c.values.length || Af.has(l) && !o.values.length ? Kb(a, l) : ru(Zv(Pb(o, c), c.values), r) : (ou(!0, `Complex values '${a}' and '${l}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), eo(a, l));
};
function Kv(a, l, r) {
  return typeof a == "number" && typeof l == "number" && typeof r == "number" ? Vt(a, l, r) : nh(a)(a, l);
}
const Wb = (a) => {
  const l = ({ timestamp: r }) => a(r);
  return {
    start: (r = !0) => Ct.update(l, r),
    stop: () => Gn(l),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => he.isProcessing ? he.timestamp : Se.now()
  };
}, Jv = (a, l, r = 10) => {
  let o = "";
  const c = Math.max(Math.round(l / r), 2);
  for (let d = 0; d < c; d++)
    o += Math.round(a(d / (c - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${o.substring(0, o.length - 2)})`;
}, no = 2e4;
function ih(a) {
  let l = 0;
  const r = 50;
  let o = a.next(l);
  for (; !o.done && l < no; )
    l += r, o = a.next(l);
  return l >= no ? 1 / 0 : l;
}
function Ib(a, l = 100, r) {
  const o = r({ ...a, keyframes: [0, l] }), c = Math.min(ih(o), no);
  return {
    type: "keyframes",
    ease: (d) => o.next(c * d).value / l,
    duration: /* @__PURE__ */ Fe(c)
  };
}
const jt = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Mf(a, l) {
  return a * Math.sqrt(1 - l * l);
}
const $b = 12;
function tE(a, l, r) {
  let o = r;
  for (let c = 1; c < $b; c++)
    o = o - a(o) / l(o);
  return o;
}
const rf = 1e-3;
function eE({ duration: a = jt.duration, bounce: l = jt.bounce, velocity: r = jt.velocity, mass: o = jt.mass }) {
  let c, d;
  ou(a <= /* @__PURE__ */ Ce(jt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - l;
  h = An(jt.minDamping, jt.maxDamping, h), a = An(jt.minDuration, jt.maxDuration, /* @__PURE__ */ Fe(a)), h < 1 ? (c = (S) => {
    const v = S * h, g = v * a, b = v - r, z = Mf(S, h), N = Math.exp(-g);
    return rf - b / z * N;
  }, d = (S) => {
    const g = S * h * a, b = g * r + r, z = Math.pow(h, 2) * Math.pow(S, 2) * a, N = Math.exp(-g), w = Mf(Math.pow(S, 2), h);
    return (-c(S) + rf > 0 ? -1 : 1) * ((b - z) * N) / w;
  }) : (c = (S) => {
    const v = Math.exp(-S * a), g = (S - r) * a + 1;
    return -rf + v * g;
  }, d = (S) => {
    const v = Math.exp(-S * a), g = (r - S) * (a * a);
    return v * g;
  });
  const y = 5 / a, p = tE(c, d, y);
  if (a = /* @__PURE__ */ Ce(a), isNaN(p))
    return {
      stiffness: jt.stiffness,
      damping: jt.damping,
      duration: a
    };
  {
    const S = Math.pow(p, 2) * o;
    return {
      stiffness: S,
      damping: h * 2 * Math.sqrt(o * S),
      duration: a
    };
  }
}
const nE = ["duration", "bounce"], iE = ["stiffness", "damping", "mass"];
function o0(a, l) {
  return l.some((r) => a[r] !== void 0);
}
function aE(a) {
  let l = {
    velocity: jt.velocity,
    stiffness: jt.stiffness,
    damping: jt.damping,
    mass: jt.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!o0(a, iE) && o0(a, nE))
    if (l.velocity = 0, a.visualDuration) {
      const r = a.visualDuration, o = 2 * Math.PI / (r * 1.2), c = o * o, d = 2 * An(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(c);
      l = {
        ...l,
        mass: jt.mass,
        stiffness: c,
        damping: d
      };
    } else {
      const r = eE({ ...a, velocity: 0 });
      l = {
        ...l,
        ...r,
        mass: jt.mass
      }, l.isResolvedFromDuration = !0;
    }
  return l;
}
function io(a = jt.visualDuration, l = jt.bounce) {
  const r = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: l
  } : a;
  let { restSpeed: o, restDelta: c } = r;
  const d = r.keyframes[0], h = r.keyframes[r.keyframes.length - 1], y = { done: !1, value: d }, { stiffness: p, damping: S, mass: v, duration: g, velocity: b, isResolvedFromDuration: z } = aE({
    ...r,
    velocity: -/* @__PURE__ */ Fe(r.velocity || 0)
  }), N = b || 0, w = S / (2 * Math.sqrt(p * v)), U = h - d, H = /* @__PURE__ */ Fe(Math.sqrt(p / v)), j = Math.abs(U) < 5;
  o || (o = j ? jt.restSpeed.granular : jt.restSpeed.default), c || (c = j ? jt.restDelta.granular : jt.restDelta.default);
  let G, X, et, ct, Z, q;
  if (w < 1)
    et = Mf(H, w), ct = (N + w * H * U) / et, G = (W) => {
      const vt = Math.exp(-w * H * W);
      return h - vt * (ct * Math.sin(et * W) + U * Math.cos(et * W));
    }, Z = w * H * ct + U * et, q = w * H * U - ct * et, X = (W) => Math.exp(-w * H * W) * (Z * Math.sin(et * W) + q * Math.cos(et * W));
  else if (w === 1) {
    G = (vt) => h - Math.exp(-H * vt) * (U + (N + H * U) * vt);
    const W = N + H * U;
    X = (vt) => Math.exp(-H * vt) * (H * W * vt - N);
  } else {
    const W = H * Math.sqrt(w * w - 1);
    G = (It) => {
      const Rt = Math.exp(-w * H * It), L = Math.min(W * It, 300);
      return h - Rt * ((N + w * H * U) * Math.sinh(L) + W * U * Math.cosh(L)) / W;
    };
    const vt = (N + w * H * U) / W, zt = w * H * vt - U * W, de = w * H * U - vt * W;
    X = (It) => {
      const Rt = Math.exp(-w * H * It), L = Math.min(W * It, 300);
      return Rt * (zt * Math.sinh(L) + de * Math.cosh(L));
    };
  }
  const Ot = {
    calculatedDuration: z && g || null,
    velocity: (W) => /* @__PURE__ */ Ce(X(W)),
    next: (W) => {
      if (!z && w < 1) {
        const zt = Math.exp(-w * H * W), de = Math.sin(et * W), It = Math.cos(et * W), Rt = h - zt * (ct * de + U * It), L = /* @__PURE__ */ Ce(zt * (Z * de + q * It));
        return y.done = Math.abs(L) <= o && Math.abs(h - Rt) <= c, y.value = y.done ? h : Rt, y;
      }
      const vt = G(W);
      if (z)
        y.done = W >= g;
      else {
        const zt = /* @__PURE__ */ Ce(X(W));
        y.done = Math.abs(zt) <= o && Math.abs(h - vt) <= c;
      }
      return y.value = y.done ? h : vt, y;
    },
    toString: () => {
      const W = Math.min(ih(Ot), no), vt = Jv((zt) => Ot.next(W * zt).value, W, 30);
      return W + "ms " + vt;
    },
    toTransition: () => {
    }
  };
  return Ot;
}
io.applyToOptions = (a) => {
  const l = Ib(a, 100, io);
  return a.ease = l.ease, a.duration = /* @__PURE__ */ Ce(l.duration), a.type = "keyframes", a;
};
const lE = 5;
function Fv(a, l, r) {
  const o = Math.max(l - lE, 0);
  return /* @__PURE__ */ Cv(r - a(o), l - o);
}
function Df({ keyframes: a, velocity: l = 0, power: r = 0.8, timeConstant: o = 325, bounceDamping: c = 10, bounceStiffness: d = 500, modifyTarget: h, min: y, max: p, restDelta: S = 0.5, restSpeed: v }) {
  const g = a[0], b = {
    done: !1,
    value: g
  }, z = (q) => y !== void 0 && q < y || p !== void 0 && q > p, N = (q) => y === void 0 ? p : p === void 0 || Math.abs(y - q) < Math.abs(p - q) ? y : p;
  let w = r * l;
  const U = g + w, H = h === void 0 ? U : h(U);
  H !== U && (w = H - g);
  const j = (q) => -w * Math.exp(-q / o), G = (q) => H + j(q), X = (q) => {
    const Ot = j(q), W = G(q);
    b.done = Math.abs(Ot) <= S, b.value = b.done ? H : W;
  };
  let et, ct;
  const Z = (q) => {
    z(b.value) && (et = q, ct = io({
      keyframes: [b.value, N(b.value)],
      velocity: Fv(G, q, b.value),
      // TODO: This should be passing * 1000
      damping: c,
      stiffness: d,
      restDelta: S,
      restSpeed: v
    }));
  };
  return Z(0), {
    calculatedDuration: null,
    next: (q) => {
      let Ot = !1;
      return !ct && et === void 0 && (Ot = !0, X(q), Z(q)), et !== void 0 && q >= et ? ct.next(q - et) : (!Ot && X(q), b);
    }
  };
}
function uE(a, l, r) {
  const o = [], c = r || Ti.mix || Kv, d = a.length - 1;
  for (let h = 0; h < d; h++) {
    let y = c(a[h], a[h + 1]);
    if (l) {
      const p = Array.isArray(l) ? l[h] || Pe : l;
      y = ru(p, y);
    }
    o.push(y);
  }
  return o;
}
function Pv(a, l, { clamp: r = !0, ease: o, mixer: c } = {}) {
  const d = a.length;
  if (Si(d === l.length, "Both input and output ranges must be the same length", "range-length"), d === 1)
    return () => l[0];
  if (d === 2 && l[0] === l[1])
    return () => l[1];
  const h = a[0] === a[1];
  a[0] > a[d - 1] && (a = [...a].reverse(), l = [...l].reverse());
  const y = uE(l, o, c), p = y.length, S = (v) => {
    if (h && v < a[0])
      return l[0];
    let g = 0;
    if (p > 1)
      for (; g < a.length - 2 && !(v < a[g + 1]); g++)
        ;
    const b = /* @__PURE__ */ iu(a[g], a[g + 1], v);
    return y[g](b);
  };
  return r ? (v) => S(An(a[0], a[d - 1], v)) : S;
}
function sE(a, l) {
  const r = a[a.length - 1];
  for (let o = 1; o <= l; o++) {
    const c = /* @__PURE__ */ iu(0, l, o);
    a.push(Vt(r, 1, c));
  }
}
function oE(a) {
  const l = [0];
  return sE(l, a.length - 1), l;
}
function rE(a, l) {
  return a.map((r) => r * l);
}
function cE(a, l) {
  return a.map(() => l || Bv).splice(0, a.length - 1);
}
function Il({ duration: a = 300, keyframes: l, times: r, ease: o = "easeInOut" }) {
  const c = /* @__PURE__ */ Tb(o) ? o.map(n0) : n0(o), d = {
    done: !1,
    value: l[0]
  }, h = rE(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === l.length ? r : oE(l),
    a
  ), y = Pv(h, l, {
    ease: Array.isArray(c) ? c : cE(l, c)
  });
  return {
    calculatedDuration: a,
    next: (p) => (d.value = y(p), d.done = p >= a, d)
  };
}
const fE = (a) => a !== null;
function fo(a, { repeat: l, repeatType: r = "loop" }, o, c = 1) {
  const d = a.filter(fE), y = c < 0 || l && r !== "loop" && l % 2 === 1 ? 0 : d.length - 1;
  return !y || o === void 0 ? d[y] : o;
}
const hE = {
  decay: Df,
  inertia: Df,
  tween: Il,
  keyframes: Il,
  spring: io
};
function kv(a) {
  typeof a.type == "string" && (a.type = hE[a.type]);
}
class ah {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((l) => {
      this.resolve = l;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(l, r) {
    return this.finished.then(l, r);
  }
}
const dE = (a) => a / 100;
class lu extends ah {
  constructor(l) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      var o, c;
      const { motionValue: r } = this.options;
      r && r.updatedAt !== Se.now() && this.tick(Se.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (c = (o = this.options).onStop) == null || c.call(o));
    }, this.options = l, this.initAnimation(), this.play(), l.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: l } = this;
    kv(l);
    const { type: r = Il, repeat: o = 0, repeatDelay: c = 0, repeatType: d, velocity: h = 0 } = l;
    let { keyframes: y } = l;
    const p = r || Il;
    p !== Il && typeof y[0] != "number" && (this.mixKeyframes = ru(dE, Kv(y[0], y[1])), y = [0, 100]);
    const S = p({ ...l, keyframes: y });
    d === "mirror" && (this.mirroredGenerator = p({
      ...l,
      keyframes: [...y].reverse(),
      velocity: -h
    })), S.calculatedDuration === null && (S.calculatedDuration = ih(S));
    const { calculatedDuration: v } = S;
    this.calculatedDuration = v, this.resolvedDuration = v + c, this.totalDuration = this.resolvedDuration * (o + 1) - c, this.generator = S;
  }
  updateTime(l) {
    const r = Math.round(l - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(l, r = !1) {
    const { generator: o, totalDuration: c, mixKeyframes: d, mirroredGenerator: h, resolvedDuration: y, calculatedDuration: p } = this;
    if (this.startTime === null)
      return o.next(0);
    const { delay: S = 0, keyframes: v, repeat: g, repeatType: b, repeatDelay: z, type: N, onUpdate: w, finalKeyframe: U } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, l) : this.speed < 0 && (this.startTime = Math.min(l - c / this.speed, this.startTime)), r ? this.currentTime = l : this.updateTime(l);
    const H = this.currentTime - S * (this.playbackSpeed >= 0 ? 1 : -1), j = this.playbackSpeed >= 0 ? H < 0 : H > c;
    this.currentTime = Math.max(H, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let G = this.currentTime, X = o;
    if (g) {
      const q = Math.min(this.currentTime, c) / y;
      let Ot = Math.floor(q), W = q % 1;
      !W && q >= 1 && (W = 1), W === 1 && Ot--, Ot = Math.min(Ot, g + 1), !!(Ot % 2) && (b === "reverse" ? (W = 1 - W, z && (W -= z / y)) : b === "mirror" && (X = h)), G = An(0, 1, W) * y;
    }
    let et;
    j ? (this.delayState.value = v[0], et = this.delayState) : et = X.next(G), d && !j && (et.value = d(et.value));
    let { done: ct } = et;
    !j && p !== null && (ct = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const Z = this.holdTime === null && (this.state === "finished" || this.state === "running" && ct);
    return Z && N !== Df && (et.value = fo(v, this.options, U, this.speed)), w && w(et.value), Z && this.finish(), et;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(l, r) {
    return this.finished.then(l, r);
  }
  get duration() {
    return /* @__PURE__ */ Fe(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Fe(l);
  }
  get time() {
    return /* @__PURE__ */ Fe(this.currentTime);
  }
  set time(l) {
    l = /* @__PURE__ */ Ce(l), this.currentTime = l, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = l : this.driver && (this.startTime = this.driver.now() - l / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = l, this.tick(l));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const l = this.currentTime;
    if (l <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(l);
    const r = this.generator.next(l).value;
    return Fv((o) => this.generator.next(o).value, l, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(l) {
    const r = this.playbackSpeed !== l;
    r && this.driver && this.updateTime(Se.now()), this.playbackSpeed = l, r && this.driver && (this.time = /* @__PURE__ */ Fe(this.currentTime));
  }
  play() {
    var c, d;
    if (this.isStopped)
      return;
    const { driver: l = Wb, startTime: r } = this.options;
    this.driver || (this.driver = l((h) => this.tick(h))), (d = (c = this.options).onPlay) == null || d.call(c);
    const o = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = o) : this.holdTime !== null ? this.startTime = o - this.holdTime : this.startTime || (this.startTime = r ?? o), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Se.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var l, r;
    this.notifyFinished(), this.teardown(), this.state = "finished", (r = (l = this.options).onComplete) == null || r.call(l);
  }
  cancel() {
    var l, r;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (r = (l = this.options).onCancel) == null || r.call(l);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(l) {
    return this.startTime = 0, this.tick(l, !0);
  }
  attachTimeline(l) {
    var r;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (r = this.driver) == null || r.stop(), l.observe(this);
  }
}
function mE(a) {
  for (let l = 1; l < a.length; l++)
    a[l] ?? (a[l] = a[l - 1]);
}
const Pi = (a) => a * 180 / Math.PI, xf = (a) => {
  const l = Pi(Math.atan2(a[1], a[0]));
  return Cf(l);
}, yE = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: xf,
  rotateZ: xf,
  skewX: (a) => Pi(Math.atan(a[1])),
  skewY: (a) => Pi(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, Cf = (a) => (a = a % 360, a < 0 && (a += 360), a), r0 = xf, c0 = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), f0 = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), gE = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: c0,
  scaleY: f0,
  scale: (a) => (c0(a) + f0(a)) / 2,
  rotateX: (a) => Cf(Pi(Math.atan2(a[6], a[5]))),
  rotateY: (a) => Cf(Pi(Math.atan2(-a[2], a[0]))),
  rotateZ: r0,
  rotate: r0,
  skewX: (a) => Pi(Math.atan(a[4])),
  skewY: (a) => Pi(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function Of(a) {
  return a.includes("scale") ? 1 : 0;
}
function zf(a, l) {
  if (!a || a === "none")
    return Of(l);
  const r = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let o, c;
  if (r)
    o = gE, c = r;
  else {
    const y = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    o = yE, c = y;
  }
  if (!c)
    return Of(l);
  const d = o[l], h = c[1].split(",").map(pE);
  return typeof d == "function" ? d(h) : h[d];
}
const vE = (a, l) => {
  const { transform: r = "none" } = getComputedStyle(a);
  return zf(r, l);
};
function pE(a) {
  return parseFloat(a.trim());
}
const ka = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Wa = /* @__PURE__ */ new Set([...ka, "pathRotation"]), h0 = (a) => a === Pa || a === F, SE = /* @__PURE__ */ new Set(["x", "y", "z"]), TE = ka.filter((a) => !SE.has(a));
function bE(a) {
  const l = [];
  return TE.forEach((r) => {
    const o = a.getValue(r);
    o !== void 0 && (l.push([r, o.get()]), o.set(r.startsWith("scale") ? 1 : 0));
  }), l;
}
const pi = {
  // Dimensions
  width: ({ x: a }, { paddingLeft: l = "0", paddingRight: r = "0", boxSizing: o }) => {
    const c = a.max - a.min;
    return o === "border-box" ? c : c - parseFloat(l) - parseFloat(r);
  },
  height: ({ y: a }, { paddingTop: l = "0", paddingBottom: r = "0", boxSizing: o }) => {
    const c = a.max - a.min;
    return o === "border-box" ? c : c - parseFloat(l) - parseFloat(r);
  },
  top: (a, { top: l }) => parseFloat(l),
  left: (a, { left: l }) => parseFloat(l),
  bottom: ({ y: a }, { top: l }) => parseFloat(l) + (a.max - a.min),
  right: ({ x: a }, { left: l }) => parseFloat(l) + (a.max - a.min),
  // Transform
  x: (a, { transform: l }) => zf(l, "x"),
  y: (a, { transform: l }) => zf(l, "y")
};
pi.translateX = pi.x;
pi.translateY = pi.y;
const ki = /* @__PURE__ */ new Set();
let Rf = !1, Nf = !1, _f = !1;
function Wv() {
  if (Nf) {
    const a = Array.from(ki).filter((o) => o.needsMeasurement), l = new Set(a.map((o) => o.element)), r = /* @__PURE__ */ new Map();
    l.forEach((o) => {
      const c = bE(o);
      c.length && (r.set(o, c), o.render());
    }), a.forEach((o) => o.measureInitialState()), l.forEach((o) => {
      o.render();
      const c = r.get(o);
      c && c.forEach(([d, h]) => {
        var y;
        (y = o.getValue(d)) == null || y.set(h);
      });
    }), a.forEach((o) => o.measureEndState()), a.forEach((o) => {
      o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
    });
  }
  Nf = !1, Rf = !1, ki.forEach((a) => a.complete(_f)), ki.clear();
}
function Iv() {
  ki.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (Nf = !0);
  });
}
function EE() {
  _f = !0, Iv(), Wv(), _f = !1;
}
class lh {
  constructor(l, r, o, c, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...l], this.onComplete = r, this.name = o, this.motionValue = c, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ki.add(this), Rf || (Rf = !0, Ct.read(Iv), Ct.resolveKeyframes(Wv))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, name: r, element: o, motionValue: c } = this;
    if (l[0] === null) {
      const d = c == null ? void 0 : c.get(), h = l[l.length - 1];
      if (d !== void 0)
        l[0] = d;
      else if (o && r) {
        const y = o.readValue(r, h);
        y != null && (l[0] = y);
      }
      l[0] === void 0 && (l[0] = h), c && d === void 0 && c.set(l[0]);
    }
    mE(l);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(l = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, l), ki.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ki.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const AE = (a) => a.startsWith("--");
function $v(a, l, r) {
  AE(l) ? a.style.setProperty(l, r) : a.style[l] = r;
}
const ME = {};
function tp(a, l) {
  const r = /* @__PURE__ */ xv(a);
  return () => ME[l] ?? r();
}
const DE = /* @__PURE__ */ tp(() => window.ScrollTimeline !== void 0, "scrollTimeline"), ep = /* @__PURE__ */ tp(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), kl = ([a, l, r, o]) => `cubic-bezier(${a}, ${l}, ${r}, ${o})`, d0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ kl([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ kl([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ kl([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ kl([0.33, 1.53, 0.69, 0.99])
};
function np(a, l) {
  if (a)
    return typeof a == "function" ? ep() ? Jv(a, l) : "ease-out" : /* @__PURE__ */ Hv(a) ? kl(a) : Array.isArray(a) ? a.map((r) => np(r, l) || d0.easeOut) : d0[a];
}
function xE(a, l, r, { delay: o = 0, duration: c = 300, repeat: d = 0, repeatType: h = "loop", ease: y = "easeOut", times: p } = {}, S = void 0) {
  const v = {
    [l]: r
  };
  p && (v.offset = p);
  const g = np(y, c);
  Array.isArray(g) && (v.easing = g);
  const b = {
    delay: o,
    duration: c,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return S && (b.pseudoElement = S), a.animate(v, b);
}
function ip(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function CE({ type: a, ...l }) {
  return ip(a) && ep() ? a.applyToOptions(l) : (l.duration ?? (l.duration = 300), l.ease ?? (l.ease = "easeOut"), l);
}
class ap extends ah {
  constructor(l) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !l)
      return;
    const { element: r, name: o, keyframes: c, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: y, onComplete: p } = l;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = l, Si(typeof l.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const S = CE(l);
    this.animation = xE(r, o, c, S, d), S.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const v = fo(c, this.options, y, this.speed);
        this.updateMotionValue && this.updateMotionValue(v), $v(r, o, v), this.animation.cancel();
      }
      p == null || p(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var l, r;
    (r = (l = this.animation).finish) == null || r.call(l);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: l } = this;
    l === "idle" || l === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var r, o, c;
    const l = (r = this.options) == null ? void 0 : r.element;
    !this.isPseudoElement && (l != null && l.isConnected) && ((c = (o = this.animation).commitStyles) == null || c.call(o));
  }
  get duration() {
    var r, o;
    const l = ((o = (r = this.animation.effect) == null ? void 0 : r.getComputedTiming) == null ? void 0 : o.call(r).duration) || 0;
    return /* @__PURE__ */ Fe(Number(l));
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Fe(l);
  }
  get time() {
    return /* @__PURE__ */ Fe(Number(this.animation.currentTime) || 0);
  }
  set time(l) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Ce(l), r && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(l) {
    l < 0 && (this.finishedTime = null), this.animation.playbackRate = l;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(l) {
    this.manualStartTime = this.animation.startTime = l;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: l, rangeStart: r, rangeEnd: o, observe: c }) {
    var d;
    return this.allowFlatten && ((d = this.animation.effect) == null || d.updateTiming({ easing: "linear" })), this.animation.onfinish = null, l && DE() ? (this.animation.timeline = l, r && (this.animation.rangeStart = r), o && (this.animation.rangeEnd = o), Pe) : c(this);
  }
}
const lp = {
  anticipate: Vv,
  backInOut: _v,
  circInOut: wv
};
function OE(a) {
  return a in lp;
}
function zE(a) {
  typeof a.ease == "string" && OE(a.ease) && (a.ease = lp[a.ease]);
}
const cf = 10;
class RE extends ap {
  constructor(l) {
    zE(l), kv(l), super(l), l.startTime !== void 0 && l.autoplay !== !1 && (this.startTime = l.startTime), this.options = l;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(l) {
    const { motionValue: r, onUpdate: o, onComplete: c, element: d, ...h } = this.options;
    if (!r)
      return;
    if (l !== void 0) {
      r.set(l);
      return;
    }
    const y = new lu({
      ...h,
      autoplay: !1
    }), p = Math.max(cf, Se.now() - this.startTime), S = An(0, cf, p - cf), v = y.sample(p).value, { name: g } = this.options;
    d && g && $v(d, g, v), r.setWithVelocity(y.sample(Math.max(0, p - S)).value, v, S), y.stop();
  }
}
const m0 = (a, l) => l === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(un.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function NE(a) {
  const l = a[0];
  if (a.length === 1)
    return !0;
  for (let r = 0; r < a.length; r++)
    if (a[r] !== l)
      return !0;
}
function _E(a, l, r, o) {
  const c = a[0];
  if (c === null)
    return !1;
  if (l === "display" || l === "visibility")
    return !0;
  const d = a[a.length - 1], h = m0(c, l), y = m0(d, l);
  return ou(h === y, `You are trying to animate ${l} from "${c}" to "${d}". "${h ? d : c}" is not an animatable value.`, "value-not-animatable"), !h || !y ? !1 : NE(a) || (r === "spring" || ip(r)) && o;
}
function Vf(a) {
  a.duration = 0, a.type = "keyframes";
}
const up = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), VE = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function UE(a) {
  for (let l = 0; l < a.length; l++)
    if (typeof a[l] == "string" && VE.test(a[l]))
      return !0;
  return !1;
}
const wE = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), BE = /* @__PURE__ */ xv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function HE(a) {
  var g;
  const { motionValue: l, name: r, repeatDelay: o, repeatType: c, damping: d, type: h, keyframes: y } = a, p = (g = l == null ? void 0 : l.owner) == null ? void 0 : g.current;
  if (!(p instanceof HTMLElement) && !(p instanceof SVGElement))
    return !1;
  const { onUpdate: S, transformTemplate: v } = l.owner.getProps();
  return BE() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (up.has(r) || wE.has(r) && UE(y)) && (r !== "transform" || !v) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !S && !o && c !== "mirror" && d !== 0 && h !== "inertia";
}
const LE = 40;
class jE extends ah {
  constructor({ autoplay: l = !0, delay: r = 0, type: o = "keyframes", repeat: c = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: y, name: p, motionValue: S, element: v, ...g }) {
    var N;
    super(), this.stop = () => {
      var w, U;
      this._animation && (this._animation.stop(), (w = this.stopTimeline) == null || w.call(this)), (U = this.keyframeResolver) == null || U.cancel();
    }, this.createdAt = Se.now();
    const b = {
      autoplay: l,
      delay: r,
      type: o,
      repeat: c,
      repeatDelay: d,
      repeatType: h,
      name: p,
      motionValue: S,
      element: v,
      ...g
    }, z = (v == null ? void 0 : v.KeyframeResolver) || lh;
    this.keyframeResolver = new z(y, (w, U, H) => this.onKeyframesResolved(w, U, b, !H), p, S, v), (N = this.keyframeResolver) == null || N.scheduleResolve();
  }
  onKeyframesResolved(l, r, o, c) {
    var H, j;
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: y, delay: p, isHandoff: S, onUpdate: v } = o;
    this.resolvedAt = Se.now();
    let g = !0;
    _E(l, d, h, y) || (g = !1, (Ti.instantAnimations || !p) && (v == null || v(fo(l, o, r))), l[0] = l[l.length - 1], Vf(o), o.repeat = 0);
    const z = {
      startTime: c ? this.resolvedAt ? this.resolvedAt - this.createdAt > LE ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...o,
      keyframes: l
    }, N = g && !S && HE(z), w = (j = (H = z.motionValue) == null ? void 0 : H.owner) == null ? void 0 : j.current;
    let U;
    if (N)
      try {
        U = new RE({
          ...z,
          element: w
        });
      } catch {
        U = new lu(z);
      }
    else
      U = new lu(z);
    U.finished.then(() => {
      this.notifyFinished();
    }).catch(Pe), this.pendingTimeline && (this.stopTimeline = U.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = U;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(l, r) {
    return this.finished.finally(l).then(() => {
    });
  }
  get animation() {
    var l;
    return this._animation || ((l = this.keyframeResolver) == null || l.resume(), EE()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(l) {
    this.animation.time = l;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(l) {
    this.animation.speed = l;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(l) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(l) : this.pendingTimeline = l, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var l;
    this._animation && this.animation.cancel(), (l = this.keyframeResolver) == null || l.cancel();
  }
}
function sp(a, l, r, o = 0, c = 1) {
  const d = Array.from(a).sort((S, v) => S.sortNodePosition(v)).indexOf(l), h = a.size, y = (h - 1) * o;
  return typeof r == "function" ? r(d, h) : c === 1 ? d * o : y - d * o;
}
const y0 = 30, YE = (a) => !isNaN(parseFloat(a)), $l = {
  current: void 0
};
class GE {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(l, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (o) => {
      var d;
      const c = Se.now();
      if (this.updatedAt !== c && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(o), this.current !== this.prev && ((d = this.events.change) == null || d.notify(this.current), this.dependents))
        for (const h of this.dependents)
          h.dirty();
    }, this.hasAnimated = !1, this.setCurrent(l), this.owner = r.owner;
  }
  setCurrent(l) {
    this.current = l, this.updatedAt = Se.now(), this.canTrackVelocity === null && l !== void 0 && (this.canTrackVelocity = YE(this.current));
  }
  setPrevFrameValue(l = this.current) {
    this.prevFrameValue = l, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(l) {
    return this.on("change", l);
  }
  on(l, r) {
    this.events[l] || (this.events[l] = new kf());
    const o = this.events[l].add(r);
    return l === "change" ? () => {
      o(), Ct.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : o;
  }
  clearListeners() {
    for (const l in this.events)
      this.events[l].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(l, r) {
    this.passiveEffect = l, this.stopPassiveEffect = r;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(l) {
    this.passiveEffect ? this.passiveEffect(l, this.updateAndNotify) : this.updateAndNotify(l);
  }
  setWithVelocity(l, r, o) {
    this.set(r), this.prev = void 0, this.prevFrameValue = l, this.prevUpdatedAt = this.updatedAt - o;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(l, r = !0) {
    this.updateAndNotify(l), this.prev = l, this.prevUpdatedAt = this.prevFrameValue = void 0, r && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var l;
    (l = this.events.change) == null || l.notify(this.current);
  }
  addDependent(l) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(l);
  }
  removeDependent(l) {
    this.dependents && this.dependents.delete(l);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return $l.current && $l.current.push(this), this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const l = Se.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || l - this.updatedAt > y0)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, y0);
    return /* @__PURE__ */ Cv(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(l) {
    return this.stop(), new Promise((r) => {
      this.hasAnimated = !0, this.animation = l(r), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var l, r;
    (l = this.dependents) == null || l.clear(), (r = this.events.destroy) == null || r.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Ii(a, l) {
  return new GE(a, l);
}
function op(a, l) {
  if (a != null && a.inherit && l) {
    const { inherit: r, ...o } = a;
    return { ...l, ...o };
  }
  return a;
}
function uh(a, l) {
  const r = (a == null ? void 0 : a[l]) ?? (a == null ? void 0 : a.default) ?? a;
  return r !== a ? op(r, a) : r;
}
const qE = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, XE = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), QE = {
  type: "keyframes",
  duration: 0.8
}, ZE = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, KE = (a, { keyframes: l }) => l.length > 2 ? QE : Wa.has(a) ? a.startsWith("scale") ? XE(l[1]) : qE : ZE, JE = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function FE(a) {
  for (const l in a)
    if (!JE.has(l))
      return !0;
  return !1;
}
const sh = (a, l, r, o = {}, c, d) => (h) => {
  const y = uh(o, a) || {}, p = y.delay || o.delay || 0;
  let { elapsed: S = 0 } = o;
  S = S - /* @__PURE__ */ Ce(p);
  const v = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: l.getVelocity(),
    ...y,
    delay: -S,
    onUpdate: (b) => {
      l.set(b), y.onUpdate && y.onUpdate(b);
    },
    onComplete: () => {
      h(), y.onComplete && y.onComplete();
    },
    name: a,
    motionValue: l,
    element: d ? void 0 : c
  };
  FE(y) || Object.assign(v, KE(a, v)), v.duration && (v.duration = /* @__PURE__ */ Ce(v.duration)), v.repeatDelay && (v.repeatDelay = /* @__PURE__ */ Ce(v.repeatDelay)), v.from !== void 0 && (v.keyframes[0] = v.from);
  let g = !1;
  if ((v.type === !1 || v.duration === 0 && !v.repeatDelay) && (Vf(v), v.delay === 0 && (g = !0)), (Ti.instantAnimations || Ti.skipAnimations || c != null && c.shouldSkipAnimations || y.skipAnimations) && (g = !0, Vf(v), v.delay = 0), v.allowFlatten = !y.type && !y.ease, g && !d && l.get() !== void 0) {
    const b = fo(v.keyframes, y);
    if (b !== void 0) {
      Ct.update(() => {
        v.onUpdate(b), v.onComplete();
      });
      return;
    }
  }
  return y.isSync ? new lu(v) : new jE(v);
}, PE = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function kE(a) {
  const l = PE.exec(a);
  if (!l)
    return [,];
  const [, r, o, c] = l;
  return [`--${r ?? o}`, c];
}
const WE = 4;
function rp(a, l, r = 1) {
  Si(r <= WE, `Max CSS variable fallback depth detected in property "${a}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [o, c] = kE(a);
  if (!o)
    return;
  const d = window.getComputedStyle(l).getPropertyValue(o);
  if (d) {
    const h = d.trim();
    return Av(h) ? parseFloat(h) : h;
  }
  return $f(c) ? rp(c, l, r + 1) : c;
}
function g0(a) {
  const l = [{}, {}];
  return a == null || a.values.forEach((r, o) => {
    l[0][o] = r.get(), l[1][o] = r.getVelocity();
  }), l;
}
function oh(a, l, r, o) {
  if (typeof l == "function") {
    const [c, d] = g0(o);
    l = l(r !== void 0 ? r : a.custom, c, d);
  }
  if (typeof l == "string" && (l = a.variants && a.variants[l]), typeof l == "function") {
    const [c, d] = g0(o);
    l = l(r !== void 0 ? r : a.custom, c, d);
  }
  return l;
}
function Wi(a, l, r) {
  const o = a.getProps();
  return oh(o, l, r !== void 0 ? r : o.custom, a);
}
const cp = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ka
]), Uf = (a) => Array.isArray(a);
function IE(a, l, r) {
  a.hasValue(l) ? a.getValue(l).set(r) : a.addValue(l, Ii(r));
}
function $E(a) {
  return Uf(a) ? a[a.length - 1] || 0 : a;
}
function tA(a, l) {
  const r = Wi(a, l);
  let { transitionEnd: o = {}, transition: c = {}, ...d } = r || {};
  d = { ...d, ...o };
  for (const h in d) {
    const y = $E(d[h]);
    IE(a, h, y);
  }
}
const Wt = (a) => !!(a && a.getVelocity);
function eA(a) {
  return !!(Wt(a) && a.add);
}
function wf(a, l) {
  const r = a.getValue("willChange");
  if (eA(r))
    return r.add(l);
  if (!r && Ti.WillChange) {
    const o = new Ti.WillChange("auto");
    a.addValue("willChange", o), o.add(l);
  }
}
function rh(a) {
  return a.replace(/([A-Z])/g, (l) => `-${l.toLowerCase()}`);
}
const nA = "framerAppearId", fp = "data-" + rh(nA);
function hp(a) {
  return a.props[fp];
}
function iA({ protectedKeys: a, needsAnimating: l }, r) {
  const o = a.hasOwnProperty(r) && l[r] !== !0;
  return l[r] = !1, o;
}
function dp(a, l, { delay: r = 0, transitionOverride: o, type: c } = {}) {
  let { transition: d, transitionEnd: h, ...y } = l;
  const p = a.getDefaultTransition();
  d = d ? op(d, p) : p;
  const S = d == null ? void 0 : d.reduceMotion, v = d == null ? void 0 : d.skipAnimations;
  o && (d = o);
  const g = [], b = c && a.animationState && a.animationState.getState()[c], z = d == null ? void 0 : d.path;
  z && z.animateVisualElement(a, y, d, r, g);
  for (const N in y) {
    const w = a.getValue(N, a.latestValues[N] ?? null), U = y[N];
    if (U === void 0 || b && iA(b, N))
      continue;
    const H = {
      delay: r,
      ...uh(d || {}, N)
    };
    v && (H.skipAnimations = !0);
    const j = w.get();
    if (j !== void 0 && !w.isAnimating() && !Array.isArray(U) && U === j && !H.velocity) {
      Ct.update(() => w.set(U));
      continue;
    }
    let G = !1;
    if (window.MotionHandoffAnimation) {
      const ct = hp(a);
      if (ct) {
        const Z = window.MotionHandoffAnimation(ct, N, Ct);
        Z !== null && (H.startTime = Z, G = !0);
      }
    }
    wf(a, N);
    const X = S ?? a.shouldReduceMotion;
    w.start(sh(N, w, U, X && cp.has(N) ? { type: !1 } : H, a, G));
    const et = w.animation;
    et && g.push(et);
  }
  if (h) {
    const N = () => Ct.update(() => {
      h && tA(a, h);
    });
    g.length ? Promise.all(g).then(N) : N();
  }
  return g;
}
function Bf(a, l, r = {}) {
  var p;
  const o = Wi(a, l, r.type === "exit" ? (p = a.presenceContext) == null ? void 0 : p.custom : void 0);
  let { transition: c = a.getDefaultTransition() || {} } = o || {};
  r.transitionOverride && (c = r.transitionOverride);
  const d = o ? () => Promise.all(dp(a, o, r)) : () => Promise.resolve(), h = a.variantChildren && a.variantChildren.size ? (S = 0) => {
    const { delayChildren: v = 0, staggerChildren: g, staggerDirection: b } = c;
    return aA(a, l, S, v, g, b, r);
  } : () => Promise.resolve(), { when: y } = c;
  if (y) {
    const [S, v] = y === "beforeChildren" ? [d, h] : [h, d];
    return S().then(() => v());
  } else
    return Promise.all([d(), h(r.delay)]);
}
function aA(a, l, r = 0, o = 0, c = 0, d = 1, h) {
  const y = [];
  for (const p of a.variantChildren)
    p.notify("AnimationStart", l), y.push(Bf(p, l, {
      ...h,
      delay: r + (typeof o == "function" ? 0 : o) + sp(a.variantChildren, p, o, c, d)
    }).then(() => p.notify("AnimationComplete", l)));
  return Promise.all(y);
}
function lA(a, l, r = {}) {
  a.notify("AnimationStart", l);
  let o;
  if (Array.isArray(l)) {
    const c = l.map((d) => Bf(a, d, r));
    o = Promise.all(c);
  } else if (typeof l == "string")
    o = Bf(a, l, r);
  else {
    const c = typeof l == "function" ? Wi(a, l, r.custom) : l;
    o = Promise.all(dp(a, c, r));
  }
  return o.then(() => {
    a.notify("AnimationComplete", l);
  });
}
const uA = {
  test: (a) => a === "auto",
  parse: (a) => a
}, mp = (a) => (l) => l.test(a), yp = [Pa, F, En, Yn, _b, Nb, uA], v0 = (a) => yp.find(mp(a));
function sA(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || Dv(a) : !0;
}
const oA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function rA(a) {
  const [l, r] = a.slice(0, -1).split("(");
  if (l === "drop-shadow")
    return a;
  const [o] = r.match(th) || [];
  if (!o)
    return a;
  const c = r.replace(o, "");
  let d = oA.has(l) ? 1 : 0;
  return o !== r && (d *= 100), l + "(" + d + c + ")";
}
const cA = /\b([a-z-]*)\(.*?\)/gu, Hf = {
  ...un,
  getAnimatableNone: (a) => {
    const l = a.match(cA);
    return l ? l.map(rA).join(" ") : a;
  }
}, Lf = {
  ...un,
  getAnimatableNone: (a) => {
    const l = un.parse(a);
    return un.createTransformer(a)(l.map((o) => typeof o == "number" ? 0 : typeof o == "object" ? { ...o, alpha: 1 } : o));
  }
}, p0 = {
  ...Pa,
  transform: Math.round
}, fA = {
  rotate: Yn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Yn,
  rotateX: Yn,
  rotateY: Yn,
  rotateZ: Yn,
  scale: Qs,
  scaleX: Qs,
  scaleY: Qs,
  scaleZ: Qs,
  skew: Yn,
  skewX: Yn,
  skewY: Yn,
  distance: F,
  translateX: F,
  translateY: F,
  translateZ: F,
  x: F,
  y: F,
  z: F,
  perspective: F,
  transformPerspective: F,
  opacity: au,
  originX: a0,
  originY: a0,
  originZ: F
}, ao = {
  // Border props
  borderWidth: F,
  borderTopWidth: F,
  borderRightWidth: F,
  borderBottomWidth: F,
  borderLeftWidth: F,
  borderRadius: F,
  borderTopLeftRadius: F,
  borderTopRightRadius: F,
  borderBottomRightRadius: F,
  borderBottomLeftRadius: F,
  // Positioning props
  width: F,
  maxWidth: F,
  height: F,
  maxHeight: F,
  top: F,
  right: F,
  bottom: F,
  left: F,
  inset: F,
  insetBlock: F,
  insetBlockStart: F,
  insetBlockEnd: F,
  insetInline: F,
  insetInlineStart: F,
  insetInlineEnd: F,
  // Spacing props
  padding: F,
  paddingTop: F,
  paddingRight: F,
  paddingBottom: F,
  paddingLeft: F,
  paddingBlock: F,
  paddingBlockStart: F,
  paddingBlockEnd: F,
  paddingInline: F,
  paddingInlineStart: F,
  paddingInlineEnd: F,
  margin: F,
  marginTop: F,
  marginRight: F,
  marginBottom: F,
  marginLeft: F,
  marginBlock: F,
  marginBlockStart: F,
  marginBlockEnd: F,
  marginInline: F,
  marginInlineStart: F,
  marginInlineEnd: F,
  // Typography
  fontSize: F,
  // Misc
  backgroundPositionX: F,
  backgroundPositionY: F,
  ...fA,
  zIndex: p0,
  // SVG
  fillOpacity: au,
  strokeOpacity: au,
  numOctaves: p0
}, hA = {
  ...ao,
  // Color props
  color: Ft,
  backgroundColor: Ft,
  outlineColor: Ft,
  fill: Ft,
  stroke: Ft,
  // Border props
  borderColor: Ft,
  borderTopColor: Ft,
  borderRightColor: Ft,
  borderBottomColor: Ft,
  borderLeftColor: Ft,
  filter: Hf,
  WebkitFilter: Hf,
  mask: Lf,
  WebkitMask: Lf
}, gp = (a) => hA[a], dA = /* @__PURE__ */ new Set([Hf, Lf]);
function vp(a, l) {
  let r = gp(a);
  return dA.has(r) || (r = un), r.getAnimatableNone ? r.getAnimatableNone(l) : void 0;
}
const mA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function yA(a, l, r) {
  let o = 0, c;
  for (; o < a.length && !c; ) {
    const d = a[o];
    typeof d == "string" && !mA.has(d) && Fa(d).values.length && (c = a[o]), o++;
  }
  if (c && r)
    for (const d of l)
      a[d] = vp(r, c);
}
class gA extends lh {
  constructor(l, r, o, c, d) {
    super(l, r, o, c, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, element: r, name: o } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let v = 0; v < l.length; v++) {
      let g = l[v];
      if (typeof g == "string" && (g = g.trim(), $f(g))) {
        const b = rp(g, r.current);
        b !== void 0 && (l[v] = b), v === l.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !cp.has(o) || l.length !== 2)
      return;
    const [c, d] = l, h = v0(c), y = v0(d), p = i0(c), S = i0(d);
    if (p !== S && pi[o]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== y)
      if (h0(h) && h0(y))
        for (let v = 0; v < l.length; v++) {
          const g = l[v];
          typeof g == "string" && (l[v] = parseFloat(g));
        }
      else pi[o] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: l, name: r } = this, o = [];
    for (let c = 0; c < l.length; c++)
      (l[c] === null || sA(l[c])) && o.push(c);
    o.length && yA(l, o, r);
  }
  measureInitialState() {
    const { element: l, unresolvedKeyframes: r, name: o } = this;
    if (!l || !l.current)
      return;
    o === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = pi[o](l.measureViewportBox(), window.getComputedStyle(l.current)), r[0] = this.measuredOrigin;
    const c = r[r.length - 1];
    c !== void 0 && l.getValue(o, c).jump(c, !1);
  }
  measureEndState() {
    var y;
    const { element: l, name: r, unresolvedKeyframes: o } = this;
    if (!l || !l.current)
      return;
    const c = l.getValue(r);
    c && c.jump(this.measuredOrigin, !1);
    const d = o.length - 1, h = o[d];
    o[d] = pi[r](l.measureViewportBox(), window.getComputedStyle(l.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), (y = this.removedTransforms) != null && y.length && this.removedTransforms.forEach(([p, S]) => {
      l.getValue(p).set(S);
    }), this.resolveNoneKeyframes();
  }
}
const ch = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function pp(a, l, r) {
  if (a == null)
    return [];
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    let o = document;
    const c = (r == null ? void 0 : r[a]) ?? o.querySelectorAll(a);
    return c ? Array.from(c) : [];
  }
  return Array.from(a).filter((o) => o != null);
}
const jf = (a, l) => l && typeof a == "number" ? l.transform(a) : a;
function vA(a) {
  return Mv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: fh } = /* @__PURE__ */ Lv(queueMicrotask, !1), ln = {
  x: !1,
  y: !1
};
function Sp() {
  return ln.x || ln.y;
}
function pA(a) {
  return a === "x" || a === "y" ? ln[a] ? null : (ln[a] = !0, () => {
    ln[a] = !1;
  }) : ln.x || ln.y ? null : (ln.x = ln.y = !0, () => {
    ln.x = ln.y = !1;
  });
}
function Tp(a, l) {
  const r = pp(a), o = new AbortController(), c = {
    passive: !0,
    ...l,
    signal: o.signal
  };
  return [r, c, () => o.abort()];
}
function SA(a) {
  return !(a.pointerType === "touch" || Sp());
}
function TA(a, l, r = {}) {
  const [o, c, d] = Tp(a, r);
  return o.forEach((h) => {
    let y = !1, p = !1, S;
    const v = () => {
      h.removeEventListener("pointerleave", N);
    }, g = (U) => {
      S && (S(U), S = void 0), v();
    }, b = (U) => {
      y = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), p && (p = !1, g(U));
    }, z = () => {
      y = !0, window.addEventListener("pointerup", b, c), window.addEventListener("pointercancel", b, c);
    }, N = (U) => {
      if (U.pointerType !== "touch") {
        if (y) {
          p = !0;
          return;
        }
        g(U);
      }
    }, w = (U) => {
      if (!SA(U))
        return;
      p = !1;
      const H = l(h, U);
      typeof H == "function" && (S = H, h.addEventListener("pointerleave", N, c));
    };
    h.addEventListener("pointerenter", w, c), h.addEventListener("pointerdown", z, c);
  }), d;
}
const bp = (a, l) => l ? a === l ? !0 : bp(a, l.parentElement) : !1, hh = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, bA = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function EA(a) {
  return bA.has(a.tagName) || a.isContentEditable === !0;
}
const AA = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function MA(a) {
  return AA.has(a.tagName) || a.isContentEditable === !0;
}
const Fs = /* @__PURE__ */ new WeakSet();
function S0(a) {
  return (l) => {
    l.key === "Enter" && a(l);
  };
}
function ff(a, l) {
  a.dispatchEvent(new PointerEvent("pointer" + l, { isPrimary: !0, bubbles: !0 }));
}
const DA = (a, l) => {
  const r = a.currentTarget;
  if (!r)
    return;
  const o = S0(() => {
    if (Fs.has(r))
      return;
    ff(r, "down");
    const c = S0(() => {
      ff(r, "up");
    }), d = () => ff(r, "cancel");
    r.addEventListener("keyup", c, l), r.addEventListener("blur", d, l);
  });
  r.addEventListener("keydown", o, l), r.addEventListener("blur", () => r.removeEventListener("keydown", o), l);
};
function T0(a) {
  return hh(a) && !Sp();
}
const b0 = /* @__PURE__ */ new WeakSet();
function xA(a, l, r = {}) {
  const [o, c, d] = Tp(a, r), h = (y) => {
    const p = y.currentTarget;
    if (!T0(y) || b0.has(y))
      return;
    Fs.add(p), r.stopPropagation && b0.add(y);
    const S = l(p, y), v = { ...c, capture: !0 }, g = (N, w) => {
      window.removeEventListener("pointerup", b, v), window.removeEventListener("pointercancel", z, v), Fs.has(p) && Fs.delete(p), T0(N) && typeof S == "function" && S(N, { success: w });
    }, b = (N) => {
      g(N, p === window || p === document || r.useGlobalTarget || bp(p, N.target));
    }, z = (N) => {
      g(N, !1);
    };
    window.addEventListener("pointerup", b, v), window.addEventListener("pointercancel", z, v);
  };
  return o.forEach((y) => {
    (r.useGlobalTarget ? window : y).addEventListener("pointerdown", h, c), vA(y) && (y.addEventListener("focus", (S) => DA(S, c)), !EA(y) && !y.hasAttribute("tabindex") && (y.tabIndex = 0));
  }), d;
}
function dh(a) {
  return Mv(a) && "ownerSVGElement" in a;
}
const Ps = /* @__PURE__ */ new WeakMap();
let vi;
const Ep = (a, l, r) => (o, c) => c && c[0] ? c[0][a + "Size"] : dh(o) && "getBBox" in o ? o.getBBox()[l] : o[r], CA = /* @__PURE__ */ Ep("inline", "width", "offsetWidth"), OA = /* @__PURE__ */ Ep("block", "height", "offsetHeight");
function zA({ target: a, borderBoxSize: l }) {
  var r;
  (r = Ps.get(a)) == null || r.forEach((o) => {
    o(a, {
      get width() {
        return CA(a, l);
      },
      get height() {
        return OA(a, l);
      }
    });
  });
}
function RA(a) {
  a.forEach(zA);
}
function NA() {
  typeof ResizeObserver > "u" || (vi = new ResizeObserver(RA));
}
function _A(a, l) {
  vi || NA();
  const r = pp(a);
  return r.forEach((o) => {
    let c = Ps.get(o);
    c || (c = /* @__PURE__ */ new Set(), Ps.set(o, c)), c.add(l), vi == null || vi.observe(o);
  }), () => {
    r.forEach((o) => {
      const c = Ps.get(o);
      c == null || c.delete(l), c != null && c.size || vi == null || vi.unobserve(o);
    });
  };
}
const ks = /* @__PURE__ */ new Set();
let Ka;
function VA() {
  Ka = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    ks.forEach((l) => l(a));
  }, window.addEventListener("resize", Ka);
}
function UA(a) {
  return ks.add(a), Ka || VA(), () => {
    ks.delete(a), !ks.size && typeof Ka == "function" && (window.removeEventListener("resize", Ka), Ka = void 0);
  };
}
function E0(a, l) {
  return typeof a == "function" ? UA(a) : _A(a, l);
}
function wA(a) {
  return dh(a) && a.tagName === "svg";
}
function BA(...a) {
  const l = !Array.isArray(a[0]), r = l ? 0 : -1, o = a[0 + r], c = a[1 + r], d = a[2 + r], h = a[3 + r], y = Pv(c, d, h);
  return l ? y(o) : y;
}
function HA(a, l, r = {}) {
  const o = a.get();
  let c = null, d = o, h;
  const y = typeof o == "string" ? o.replace(/[\d.-]/g, "") : void 0, p = () => {
    c && (c.stop(), c = null), a.animation = void 0;
  }, S = () => {
    const g = A0(a.get()), b = A0(d);
    if (g === b) {
      p();
      return;
    }
    const z = c ? c.getGeneratorVelocity() : a.getVelocity();
    p(), c = new lu({
      keyframes: [g, b],
      velocity: z,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...r,
      onUpdate: h
    });
  }, v = () => {
    var g;
    S(), a.animation = c ?? void 0, (g = a.events.animationStart) == null || g.notify(), c == null || c.then(() => {
      var b;
      a.animation = void 0, (b = a.events.animationComplete) == null || b.notify();
    });
  };
  if (a.attach((g, b) => {
    d = g, h = (z) => b(hf(z, y)), Ct.postRender(v);
  }, p), Wt(l)) {
    let g = r.skipInitialAnimation === !0;
    const b = l.on("change", (N) => {
      g ? (g = !1, a.jump(hf(N, y), !1)) : a.set(hf(N, y));
    }), z = a.on("destroy", b);
    return () => {
      b(), z();
    };
  }
  return p;
}
function hf(a, l) {
  return l ? a + l : a;
}
function A0(a) {
  return typeof a == "number" ? a : parseFloat(a);
}
const LA = [...yp, Ft, un], jA = (a) => LA.find(mp(a)), M0 = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ja = () => ({
  x: M0(),
  y: M0()
}), D0 = () => ({ min: 0, max: 0 }), kt = () => ({
  x: D0(),
  y: D0()
}), YA = /* @__PURE__ */ new WeakMap();
function ho(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function uu(a) {
  return typeof a == "string" || Array.isArray(a);
}
const mh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], yh = ["initial", ...mh];
function mo(a) {
  return ho(a.animate) || yh.some((l) => uu(a[l]));
}
function Ap(a) {
  return !!(mo(a) || a.variants);
}
function GA(a, l, r) {
  for (const o in l) {
    const c = l[o], d = r[o];
    if (Wt(c))
      a.addValue(o, c);
    else if (Wt(d))
      a.addValue(o, Ii(c, { owner: a }));
    else if (d !== c)
      if (a.hasValue(o)) {
        const h = a.getValue(o);
        h.liveStyle === !0 ? h.jump(c) : h.hasAnimated || h.set(c);
      } else {
        const h = a.getStaticValue(o);
        a.addValue(o, Ii(h !== void 0 ? h : c, { owner: a }));
      }
  }
  for (const o in r)
    l[o] === void 0 && a.removeValue(o);
  return l;
}
const Yf = { current: null }, Mp = { current: !1 }, qA = typeof window < "u";
function XA() {
  if (Mp.current = !0, !!qA)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), l = () => Yf.current = a.matches;
      a.addEventListener("change", l), l();
    } else
      Yf.current = !1;
}
const x0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let lo = {};
function Dp(a) {
  lo = a;
}
function QA() {
  return lo;
}
class ZA {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(l, r, o) {
    return {};
  }
  constructor({ parent: l, props: r, presenceContext: o, reducedMotionConfig: c, skipAnimations: d, blockInitialAnimation: h, visualState: y }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = lh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const z = Se.now();
      this.renderScheduledAt < z && (this.renderScheduledAt = z, Ct.render(this.render, !1, !0));
    };
    const { latestValues: S, renderState: v } = y;
    this.latestValues = S, this.baseTarget = { ...S }, this.initialValues = r.initial ? { ...S } : {}, this.renderState = v, this.parent = l, this.props = r, this.presenceContext = o, this.depth = l ? l.depth + 1 : 0, this.reducedMotionConfig = c, this.skipAnimationsConfig = d, this.options = p, this.blockInitialAnimation = !!h, this.isControllingVariants = mo(r), this.isVariantNode = Ap(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(l && l.current);
    const { willChange: g, ...b } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const z in b) {
      const N = b[z];
      S[z] !== void 0 && Wt(N) && N.set(S[z]);
    }
  }
  mount(l) {
    var r, o;
    if (this.hasBeenMounted)
      for (const c in this.initialValues)
        (r = this.values.get(c)) == null || r.jump(this.initialValues[c]), this.latestValues[c] = this.initialValues[c];
    this.current = l, YA.set(l, this), this.projection && !this.projection.instance && this.projection.mount(l), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((c, d) => this.bindToMotionValue(d, c)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Mp.current || XA(), this.shouldReduceMotion = Yf.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (o = this.parent) == null || o.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var l;
    this.projection && this.projection.unmount(), Gn(this.notifyUpdate), Gn(this.render), this.valueSubscriptions.forEach((r) => r()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (l = this.parent) == null || l.removeChild(this);
    for (const r in this.events)
      this.events[r].clear();
    for (const r in this.features) {
      const o = this.features[r];
      o && (o.unmount(), o.isMounted = !1);
    }
    this.current = null;
  }
  addChild(l) {
    this.children.add(l), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(l);
  }
  removeChild(l) {
    this.children.delete(l), this.enteringChildren && this.enteringChildren.delete(l);
  }
  bindToMotionValue(l, r) {
    if (this.valueSubscriptions.has(l) && this.valueSubscriptions.get(l)(), r.accelerate && up.has(l) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: y, times: p, ease: S, duration: v } = r.accelerate, g = new ap({
        element: this.current,
        name: l,
        keyframes: y,
        times: p,
        ease: S,
        duration: /* @__PURE__ */ Ce(v)
      }), b = h(g);
      this.valueSubscriptions.set(l, () => {
        b(), g.cancel();
      });
      return;
    }
    const o = Wa.has(l);
    o && this.onBindTransform && this.onBindTransform();
    const c = r.on("change", (h) => {
      this.latestValues[l] = h, this.props.onUpdate && Ct.preRender(this.notifyUpdate), o && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, l, r)), this.valueSubscriptions.set(l, () => {
      c(), d && d();
    });
  }
  sortNodePosition(l) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== l.type ? 0 : this.sortInstanceNodePosition(this.current, l.current);
  }
  updateFeatures() {
    let l = "animation";
    for (l in lo) {
      const r = lo[l];
      if (!r)
        continue;
      const { isEnabled: o, Feature: c } = r;
      if (!this.features[l] && c && o(this.props) && (this.features[l] = new c(this)), this.features[l]) {
        const d = this.features[l];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : kt();
  }
  getStaticValue(l) {
    return this.latestValues[l];
  }
  setStaticValue(l, r) {
    this.latestValues[l] = r;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(l, r) {
    (l.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = l, this.prevPresenceContext = this.presenceContext, this.presenceContext = r;
    for (let o = 0; o < x0.length; o++) {
      const c = x0[o];
      this.propEventSubscriptions[c] && (this.propEventSubscriptions[c](), delete this.propEventSubscriptions[c]);
      const d = "on" + c, h = l[d];
      h && (this.propEventSubscriptions[c] = this.on(c, h));
    }
    this.prevMotionValues = GA(this, this.scrapeMotionValuesFromProps(l, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(l) {
    return this.props.variants ? this.props.variants[l] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(l) {
    const r = this.getClosestVariantNode();
    if (r)
      return r.variantChildren && r.variantChildren.add(l), () => r.variantChildren.delete(l);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(l, r) {
    const o = this.values.get(l);
    r !== o && (o && this.removeValue(l), this.bindToMotionValue(l, r), this.values.set(l, r), this.latestValues[l] = r.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(l) {
    this.values.delete(l);
    const r = this.valueSubscriptions.get(l);
    r && (r(), this.valueSubscriptions.delete(l)), delete this.latestValues[l], this.removeValueFromRenderState(l, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(l) {
    return this.values.has(l);
  }
  getValue(l, r) {
    if (this.props.values && this.props.values[l])
      return this.props.values[l];
    let o = this.values.get(l);
    return o === void 0 && r !== void 0 && (o = Ii(r === null ? void 0 : r, { owner: this }), this.addValue(l, o)), o;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(l, r) {
    let o = this.latestValues[l] !== void 0 || !this.current ? this.latestValues[l] : this.getBaseTargetFromProps(this.props, l) ?? this.readValueFromInstance(this.current, l, this.options);
    return o != null && (typeof o == "string" && (Av(o) || Dv(o)) ? o = parseFloat(o) : !jA(o) && un.test(r) && (o = vp(l, r)), this.setBaseTarget(l, Wt(o) ? o.get() : o)), Wt(o) ? o.get() : o;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(l, r) {
    this.baseTarget[l] = r;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(l) {
    var d;
    const { initial: r } = this.props;
    let o;
    if (typeof r == "string" || typeof r == "object") {
      const h = oh(this.props, r, (d = this.presenceContext) == null ? void 0 : d.custom);
      h && (o = h[l]);
    }
    if (r && o !== void 0)
      return o;
    const c = this.getBaseTargetFromProps(this.props, l);
    return c !== void 0 && !Wt(c) ? c : this.initialValues[l] !== void 0 && o === void 0 ? void 0 : this.baseTarget[l];
  }
  on(l, r) {
    return this.events[l] || (this.events[l] = new kf()), this.events[l].add(r);
  }
  notify(l, ...r) {
    this.events[l] && this.events[l].notify(...r);
  }
  scheduleRenderMicrotask() {
    fh.render(this.render);
  }
}
class xp extends ZA {
  constructor() {
    super(...arguments), this.KeyframeResolver = gA;
  }
  sortInstanceNodePosition(l, r) {
    return l.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(l, r) {
    const o = l.style;
    return o ? o[r] : void 0;
  }
  removeValueFromRenderState(l, { vars: r, style: o }) {
    delete r[l], delete o[l];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: l } = this.props;
    Wt(l) && (this.childSubscription = l.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class bi {
  constructor(l) {
    this.isMounted = !1, this.node = l;
  }
  update() {
  }
}
function Cp({ top: a, left: l, right: r, bottom: o }) {
  return {
    x: { min: l, max: r },
    y: { min: a, max: o }
  };
}
function KA({ x: a, y: l }) {
  return { top: l.min, right: a.max, bottom: l.max, left: a.min };
}
function JA(a, l) {
  if (!l)
    return a;
  const r = l({ x: a.left, y: a.top }), o = l({ x: a.right, y: a.bottom });
  return {
    top: r.y,
    left: r.x,
    bottom: o.y,
    right: o.x
  };
}
function df(a) {
  return a === void 0 || a === 1;
}
function Gf({ scale: a, scaleX: l, scaleY: r }) {
  return !df(a) || !df(l) || !df(r);
}
function Ji(a) {
  return Gf(a) || Op(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function Op(a) {
  return C0(a.x) || C0(a.y);
}
function C0(a) {
  return a && a !== "0%";
}
function uo(a, l, r) {
  const o = a - r, c = l * o;
  return r + c;
}
function O0(a, l, r, o, c) {
  return c !== void 0 && (a = uo(a, c, o)), uo(a, r, o) + l;
}
function qf(a, l = 0, r = 1, o, c) {
  a.min = O0(a.min, l, r, o, c), a.max = O0(a.max, l, r, o, c);
}
function zp(a, { x: l, y: r }) {
  qf(a.x, l.translate, l.scale, l.originPoint), qf(a.y, r.translate, r.scale, r.originPoint);
}
const z0 = 0.999999999999, R0 = 1.0000000000001;
function FA(a, l, r, o = !1) {
  var y;
  const c = r.length;
  if (!c)
    return;
  l.x = l.y = 1;
  let d, h;
  for (let p = 0; p < c; p++) {
    d = r[p], h = d.projectionDelta;
    const { visualElement: S } = d.options;
    S && S.props.style && S.props.style.display === "contents" || (o && d.options.layoutScroll && d.scroll && d !== d.root && (bn(a.x, -d.scroll.offset.x), bn(a.y, -d.scroll.offset.y)), h && (l.x *= h.x.scale, l.y *= h.y.scale, zp(a, h)), o && Ji(d.latestValues) && Ws(a, d.latestValues, (y = d.layout) == null ? void 0 : y.layoutBox));
  }
  l.x < R0 && l.x > z0 && (l.x = 1), l.y < R0 && l.y > z0 && (l.y = 1);
}
function bn(a, l) {
  a.min += l, a.max += l;
}
function N0(a, l, r, o, c = 0.5) {
  const d = Vt(a.min, a.max, c);
  qf(a, l, r, d, o);
}
function _0(a, l) {
  return typeof a == "string" ? parseFloat(a) / 100 * (l.max - l.min) : a;
}
function Ws(a, l, r) {
  const o = r ?? a;
  N0(a.x, _0(l.x, o.x), l.scaleX, l.scale, l.originX), N0(a.y, _0(l.y, o.y), l.scaleY, l.scale, l.originY);
}
function Rp(a, l) {
  return Cp(JA(a.getBoundingClientRect(), l));
}
function PA(a, l, r) {
  const o = Rp(a, r), { scroll: c } = l;
  return c && (bn(o.x, c.offset.x), bn(o.y, c.offset.y)), o;
}
const kA = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, WA = ka.length;
function IA(a, l, r) {
  let o = "", c = !0;
  for (let h = 0; h < WA; h++) {
    const y = ka[h], p = a[y];
    if (p === void 0)
      continue;
    let S = !0;
    if (typeof p == "number")
      S = p === (y.startsWith("scale") ? 1 : 0);
    else {
      const v = parseFloat(p);
      S = y.startsWith("scale") ? v === 1 : v === 0;
    }
    if (!S || r) {
      const v = jf(p, ao[y]);
      if (!S) {
        c = !1;
        const g = kA[y] || y;
        o += `${g}(${v}) `;
      }
      r && (l[y] = v);
    }
  }
  const d = a.pathRotation;
  return d && (c = !1, o += `rotate(${jf(d, ao.pathRotation)}) `), o = o.trim(), r ? o = r(l, c ? "" : o) : c && (o = "none"), o;
}
function gh(a, l, r) {
  const { style: o, vars: c, transformOrigin: d } = a;
  let h = !1, y = !1;
  for (const p in l) {
    const S = l[p];
    if (Wa.has(p)) {
      h = !0;
      continue;
    } else if (Yv(p)) {
      c[p] = S;
      continue;
    } else {
      const v = jf(S, ao[p]);
      p.startsWith("origin") ? (y = !0, d[p] = v) : o[p] = v;
    }
  }
  if (l.transform || (h || r ? o.transform = IA(l, a.transform, r) : o.transform && (o.transform = "none")), y) {
    const { originX: p = "50%", originY: S = "50%", originZ: v = 0 } = d;
    o.transformOrigin = `${p} ${S} ${v}`;
  }
}
function Np(a, { style: l, vars: r }, o, c) {
  const d = a.style;
  let h;
  for (h in l)
    d[h] = l[h];
  c == null || c.applyProjectionStyles(d, o);
  for (h in r)
    d.setProperty(h, r[h]);
}
function V0(a, l) {
  return l.max === l.min ? 0 : a / (l.max - l.min) * 100;
}
const Fl = {
  correct: (a, l) => {
    if (!l.target)
      return a;
    if (typeof a == "string")
      if (F.test(a))
        a = parseFloat(a);
      else
        return a;
    const r = V0(a, l.target.x), o = V0(a, l.target.y);
    return `${r}% ${o}%`;
  }
}, $A = {
  correct: (a, { treeScale: l, projectionDelta: r }) => {
    const o = a, c = un.parse(a);
    if (c.length > 5)
      return o;
    const d = un.createTransformer(a), h = typeof c[0] != "number" ? 1 : 0, y = r.x.scale * l.x, p = r.y.scale * l.y;
    c[0 + h] /= y, c[1 + h] /= p;
    const S = Vt(y, p, 0.5);
    return typeof c[2 + h] == "number" && (c[2 + h] /= S), typeof c[3 + h] == "number" && (c[3 + h] /= S), d(c);
  }
}, Xf = {
  borderRadius: {
    ...Fl,
    applyTo: [...ch]
  },
  borderTopLeftRadius: Fl,
  borderTopRightRadius: Fl,
  borderBottomLeftRadius: Fl,
  borderBottomRightRadius: Fl,
  boxShadow: $A
};
function _p(a, { layout: l, layoutId: r }) {
  return Wa.has(a) || a.startsWith("origin") || (l || r !== void 0) && (!!Xf[a] || a === "opacity");
}
function vh(a, l, r) {
  var h;
  const o = a.style, c = l == null ? void 0 : l.style, d = {};
  if (!o)
    return d;
  for (const y in o)
    (Wt(o[y]) || c && Wt(c[y]) || _p(y, a) || ((h = r == null ? void 0 : r.getValue(y)) == null ? void 0 : h.liveStyle) !== void 0) && (d[y] = o[y]);
  return d;
}
function t2(a) {
  return window.getComputedStyle(a);
}
class e2 extends xp {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Np;
  }
  mount(l) {
    Si(!!l.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(l);
  }
  readValueFromInstance(l, r) {
    var o;
    if (Wa.has(r))
      return (o = this.projection) != null && o.isProjecting ? Of(r) : vE(l, r);
    {
      const c = t2(l), d = (Yv(r) ? c.getPropertyValue(r) : c[r]) || 0;
      return typeof d == "string" ? d.trim() : d;
    }
  }
  measureInstanceViewportBox(l, { transformPagePoint: r }) {
    return Rp(l, r);
  }
  build(l, r, o) {
    gh(l, r, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(l, r, o) {
    return vh(l, r, o);
  }
}
const n2 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, i2 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function a2(a, l, r = 1, o = 0, c = !0) {
  a.pathLength = 1;
  const d = c ? n2 : i2;
  a[d.offset] = `${-o}`, a[d.array] = `${l} ${r}`;
}
const l2 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Vp(a, {
  attrX: l,
  attrY: r,
  attrScale: o,
  pathLength: c,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...y
}, p, S, v) {
  if (gh(a, y, S), p) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: g, style: b } = a;
  g.transform && (b.transform = g.transform, delete g.transform), (b.transform || g.transformOrigin) && (b.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), b.transform && (b.transformBox = (v == null ? void 0 : v.transformBox) ?? "fill-box", delete g.transformBox);
  for (const z of l2)
    g[z] !== void 0 && (b[z] = g[z], delete g[z]);
  l !== void 0 && (g.x = l), r !== void 0 && (g.y = r), o !== void 0 && (g.scale = o), c !== void 0 && a2(g, c, d, h, !1);
}
const Up = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), wp = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function u2(a, l, r, o) {
  Np(a, l, void 0, o);
  for (const c in l.attrs)
    a.setAttribute(Up.has(c) ? c : rh(c), l.attrs[c]);
}
function Bp(a, l, r) {
  const o = vh(a, l, r);
  for (const c in a)
    if (Wt(a[c]) || Wt(l[c])) {
      const d = ka.indexOf(c) !== -1 ? "attr" + c.charAt(0).toUpperCase() + c.substring(1) : c;
      o[d] = a[c];
    }
  return o;
}
class s2 extends xp {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = kt;
  }
  getBaseTargetFromProps(l, r) {
    return l[r];
  }
  readValueFromInstance(l, r) {
    if (Wa.has(r)) {
      const o = gp(r);
      return o && o.default || 0;
    }
    return r = Up.has(r) ? r : rh(r), l.getAttribute(r);
  }
  scrapeMotionValuesFromProps(l, r, o) {
    return Bp(l, r, o);
  }
  build(l, r, o) {
    Vp(l, r, this.isSVGTag, o.transformTemplate, o.style);
  }
  renderInstance(l, r, o, c) {
    u2(l, r, o, c);
  }
  mount(l) {
    this.isSVGTag = wp(l.tagName), super.mount(l);
  }
}
const o2 = yh.length;
function Hp(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const r = a.parent ? Hp(a.parent) || {} : {};
    return a.props.initial !== void 0 && (r.initial = a.props.initial), r;
  }
  const l = {};
  for (let r = 0; r < o2; r++) {
    const o = yh[r], c = a.props[o];
    (uu(c) || c === !1) && (l[o] = c);
  }
  return l;
}
function Lp(a, l) {
  if (!Array.isArray(l))
    return !1;
  const r = l.length;
  if (r !== a.length)
    return !1;
  for (let o = 0; o < r; o++)
    if (l[o] !== a[o])
      return !1;
  return !0;
}
const r2 = [...mh].reverse(), c2 = mh.length;
function f2(a) {
  return (l) => Promise.all(l.map(({ animation: r, options: o }) => lA(a, r, o)));
}
function h2(a) {
  let l = f2(a), r = U0(), o = !0, c = !1;
  const d = (S) => (v, g) => {
    var z;
    const b = Wi(a, g, S === "exit" ? (z = a.presenceContext) == null ? void 0 : z.custom : void 0);
    if (b) {
      const { transition: N, transitionEnd: w, ...U } = b;
      v = { ...v, ...U, ...w };
    }
    return v;
  };
  function h(S) {
    l = S(a);
  }
  function y(S) {
    const { props: v } = a, g = Hp(a.parent) || {}, b = [], z = /* @__PURE__ */ new Set();
    let N = {}, w = 1 / 0;
    for (let H = 0; H < c2; H++) {
      const j = r2[H], G = r[j], X = v[j] !== void 0 ? v[j] : g[j], et = uu(X), ct = j === S ? G.isActive : null;
      ct === !1 && (w = H);
      let Z = X === g[j] && X !== v[j] && et;
      if (Z && (o || c) && a.manuallyAnimateOnMount && (Z = !1), G.protectedKeys = { ...N }, // If it isn't active and hasn't *just* been set as inactive
      !G.isActive && ct === null || // If we didn't and don't have any defined prop for this animation type
      !X && !G.prevProp || // Or if the prop doesn't define an animation
      ho(X) || typeof X == "boolean")
        continue;
      if (j === "exit" && G.isActive && ct !== !0) {
        G.prevResolvedValues && (N = {
          ...N,
          ...G.prevResolvedValues
        });
        continue;
      }
      const q = d2(G.prevProp, X);
      let Ot = q || // If we're making this variant active, we want to always make it active
      j === S && G.isActive && !Z && et || // If we removed a higher-priority variant (i is in reverse order)
      H > w && et, W = !1;
      const vt = Array.isArray(X) ? X : [X];
      let zt = vt.reduce(d(j), {});
      ct === !1 && (zt = {});
      const { prevResolvedValues: de = {} } = G, It = {
        ...de,
        ...zt
      }, Rt = (K) => {
        Ot = !0, z.has(K) && (W = !0, z.delete(K)), G.needsAnimating[K] = !0;
        const ot = a.getValue(K);
        ot && (ot.liveStyle = !1);
      };
      for (const K in It) {
        const ot = zt[K], ft = de[K];
        if (N.hasOwnProperty(K))
          continue;
        let $t = !1;
        Uf(ot) && Uf(ft) ? $t = !Lp(ot, ft) || q : $t = ot !== ft, $t ? ot != null ? Rt(K) : z.add(K) : ot !== void 0 && z.has(K) ? Rt(K) : G.protectedKeys[K] = !0;
      }
      G.prevProp = X, G.prevResolvedValues = zt, G.isActive && (N = { ...N, ...zt }), (o || c) && a.blockInitialAnimation && (Ot = !1);
      const L = Z && q;
      Ot && (!L || W) && b.push(...vt.map((K) => {
        const ot = { type: j };
        if (typeof K == "string" && (o || c) && !L && a.manuallyAnimateOnMount && a.parent) {
          const { parent: ft } = a, $t = Wi(ft, K);
          if (ft.enteringChildren && $t) {
            const { delayChildren: ke } = $t.transition || {};
            ot.delay = sp(ft.enteringChildren, a, ke);
          }
        }
        return {
          animation: K,
          options: ot
        };
      }));
    }
    if (z.size) {
      const H = {};
      if (typeof v.initial != "boolean") {
        const j = Wi(a, Array.isArray(v.initial) ? v.initial[0] : v.initial);
        j && j.transition && (H.transition = j.transition);
      }
      z.forEach((j) => {
        const G = a.getBaseTarget(j), X = a.getValue(j);
        X && (X.liveStyle = !0), H[j] = G ?? null;
      }), b.push({ animation: H });
    }
    let U = !!b.length;
    return o && (v.initial === !1 || v.initial === v.animate) && !a.manuallyAnimateOnMount && (U = !1), o = !1, c = !1, U ? l(b) : Promise.resolve();
  }
  function p(S, v) {
    var b;
    if (r[S].isActive === v)
      return Promise.resolve();
    (b = a.variantChildren) == null || b.forEach((z) => {
      var N;
      return (N = z.animationState) == null ? void 0 : N.setActive(S, v);
    }), r[S].isActive = v;
    const g = y(S);
    for (const z in r)
      r[z].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: y,
    setActive: p,
    setAnimateFunction: h,
    getState: () => r,
    reset: () => {
      r = U0(), c = !0;
    }
  };
}
function d2(a, l) {
  return typeof l == "string" ? l !== a : Array.isArray(l) ? !Lp(l, a) : !1;
}
function Ki(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function U0() {
  return {
    animate: Ki(!0),
    whileInView: Ki(),
    whileHover: Ki(),
    whileTap: Ki(),
    whileDrag: Ki(),
    whileFocus: Ki(),
    exit: Ki()
  };
}
function Qf(a, l) {
  a.min = l.min, a.max = l.max;
}
function an(a, l) {
  Qf(a.x, l.x), Qf(a.y, l.y);
}
function w0(a, l) {
  a.translate = l.translate, a.scale = l.scale, a.originPoint = l.originPoint, a.origin = l.origin;
}
const jp = 1e-4, m2 = 1 - jp, y2 = 1 + jp, Yp = 0.01, g2 = 0 - Yp, v2 = 0 + Yp;
function Te(a) {
  return a.max - a.min;
}
function p2(a, l, r) {
  return Math.abs(a - l) <= r;
}
function B0(a, l, r, o = 0.5) {
  a.origin = o, a.originPoint = Vt(l.min, l.max, a.origin), a.scale = Te(r) / Te(l), a.translate = Vt(r.min, r.max, a.origin) - a.originPoint, (a.scale >= m2 && a.scale <= y2 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= g2 && a.translate <= v2 || isNaN(a.translate)) && (a.translate = 0);
}
function tu(a, l, r, o) {
  B0(a.x, l.x, r.x, o ? o.originX : void 0), B0(a.y, l.y, r.y, o ? o.originY : void 0);
}
function H0(a, l, r, o = 0) {
  const c = o ? Vt(r.min, r.max, o) : r.min;
  a.min = c + l.min, a.max = a.min + Te(l);
}
function S2(a, l, r, o) {
  H0(a.x, l.x, r.x, o == null ? void 0 : o.x), H0(a.y, l.y, r.y, o == null ? void 0 : o.y);
}
function L0(a, l, r, o = 0) {
  const c = o ? Vt(r.min, r.max, o) : r.min;
  a.min = l.min - c, a.max = a.min + Te(l);
}
function so(a, l, r, o) {
  L0(a.x, l.x, r.x, o == null ? void 0 : o.x), L0(a.y, l.y, r.y, o == null ? void 0 : o.y);
}
function j0(a, l, r, o, c) {
  return a -= l, a = uo(a, 1 / r, o), c !== void 0 && (a = uo(a, 1 / c, o)), a;
}
function T2(a, l = 0, r = 1, o = 0.5, c, d = a, h = a) {
  if (En.test(l) && (l = parseFloat(l), l = Vt(h.min, h.max, l / 100) - h.min), typeof l != "number")
    return;
  let y = Vt(d.min, d.max, o);
  a === d && (y -= l), a.min = j0(a.min, l, r, y, c), a.max = j0(a.max, l, r, y, c);
}
function Y0(a, l, [r, o, c], d, h) {
  T2(a, l[r], l[o], l[c], l.scale, d, h);
}
const b2 = ["x", "scaleX", "originX"], E2 = ["y", "scaleY", "originY"];
function G0(a, l, r, o) {
  Y0(a.x, l, b2, r ? r.x : void 0, o ? o.x : void 0), Y0(a.y, l, E2, r ? r.y : void 0, o ? o.y : void 0);
}
function q0(a) {
  return a.translate === 0 && a.scale === 1;
}
function Gp(a) {
  return q0(a.x) && q0(a.y);
}
function X0(a, l) {
  return a.min === l.min && a.max === l.max;
}
function A2(a, l) {
  return X0(a.x, l.x) && X0(a.y, l.y);
}
function Q0(a, l) {
  return Math.round(a.min) === Math.round(l.min) && Math.round(a.max) === Math.round(l.max);
}
function qp(a, l) {
  return Q0(a.x, l.x) && Q0(a.y, l.y);
}
function Z0(a) {
  return Te(a.x) / Te(a.y);
}
function K0(a, l) {
  return a.translate === l.translate && a.scale === l.scale && a.originPoint === l.originPoint;
}
function Tn(a) {
  return [a("x"), a("y")];
}
function M2(a, l, r) {
  let o = "";
  const c = a.x.translate / l.x, d = a.y.translate / l.y, h = (r == null ? void 0 : r.z) || 0;
  if ((c || d || h) && (o = `translate3d(${c}px, ${d}px, ${h}px) `), (l.x !== 1 || l.y !== 1) && (o += `scale(${1 / l.x}, ${1 / l.y}) `), r) {
    const { transformPerspective: S, rotate: v, pathRotation: g, rotateX: b, rotateY: z, skewX: N, skewY: w } = r;
    S && (o = `perspective(${S}px) ${o}`), v && (o += `rotate(${v}deg) `), g && (o += `rotate(${g}deg) `), b && (o += `rotateX(${b}deg) `), z && (o += `rotateY(${z}deg) `), N && (o += `skewX(${N}deg) `), w && (o += `skewY(${w}deg) `);
  }
  const y = a.x.scale * l.x, p = a.y.scale * l.y;
  return (y !== 1 || p !== 1) && (o += `scale(${y}, ${p})`), o || "none";
}
const D2 = ch.length, J0 = (a) => typeof a == "string" ? parseFloat(a) : a, F0 = (a) => typeof a == "number" || F.test(a);
function x2(a, l, r, o, c, d) {
  c ? (a.opacity = Vt(0, r.opacity ?? 1, C2(o)), a.opacityExit = Vt(l.opacity ?? 1, 0, O2(o))) : d && (a.opacity = Vt(l.opacity ?? 1, r.opacity ?? 1, o));
  for (let h = 0; h < D2; h++) {
    const y = ch[h];
    let p = P0(l, y), S = P0(r, y);
    if (p === void 0 && S === void 0)
      continue;
    p || (p = 0), S || (S = 0), p === 0 || S === 0 || F0(p) === F0(S) ? (a[y] = Math.max(Vt(J0(p), J0(S), o), 0), (En.test(S) || En.test(p)) && (a[y] += "%")) : a[y] = S;
  }
  (l.rotate || r.rotate) && (a.rotate = Vt(l.rotate || 0, r.rotate || 0, o));
}
function P0(a, l) {
  return a[l] !== void 0 ? a[l] : a.borderRadius;
}
const C2 = /* @__PURE__ */ Xp(0, 0.5, Uv), O2 = /* @__PURE__ */ Xp(0.5, 0.95, Pe);
function Xp(a, l, r) {
  return (o) => o < a ? 0 : o > l ? 1 : r(/* @__PURE__ */ iu(a, l, o));
}
function z2(a, l, r) {
  const o = Wt(a) ? a : Ii(a);
  return o.start(sh("", o, l, r)), o.animation;
}
function su(a, l, r, o = { passive: !0 }) {
  return a.addEventListener(l, r, o), () => a.removeEventListener(l, r, o);
}
const R2 = (a, l) => a.depth - l.depth;
class N2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(l) {
    Pf(this.children, l), this.isDirty = !0;
  }
  remove(l) {
    to(this.children, l), this.isDirty = !0;
  }
  forEach(l) {
    this.isDirty && this.children.sort(R2), this.isDirty = !1, this.children.forEach(l);
  }
}
function _2(a, l) {
  const r = Se.now(), o = ({ timestamp: c }) => {
    const d = c - r;
    d >= l && (Gn(o), a(d - l));
  };
  return Ct.setup(o, !0), () => Gn(o);
}
function Is(a) {
  return Wt(a) ? a.get() : a;
}
class V2 {
  constructor() {
    this.members = [];
  }
  add(l) {
    Pf(this.members, l);
    for (let r = this.members.length - 1; r >= 0; r--) {
      const o = this.members[r];
      if (o === l || o === this.lead || o === this.prevLead)
        continue;
      const c = o.instance;
      (!c || c.isConnected === !1) && !o.snapshot && (to(this.members, o), o.unmount());
    }
    l.scheduleRender();
  }
  remove(l) {
    if (to(this.members, l), l === this.prevLead && (this.prevLead = void 0), l === this.lead) {
      const r = this.members[this.members.length - 1];
      r && this.promote(r);
    }
  }
  relegate(l) {
    var r;
    for (let o = this.members.indexOf(l) - 1; o >= 0; o--) {
      const c = this.members[o];
      if (c.isPresent !== !1 && ((r = c.instance) == null ? void 0 : r.isConnected) !== !1)
        return this.promote(c), !0;
    }
    return !1;
  }
  promote(l, r) {
    var c;
    const o = this.lead;
    if (l !== o && (this.prevLead = o, this.lead = l, l.show(), o)) {
      o.updateSnapshot(), l.scheduleRender();
      const { layoutDependency: d } = o.options, { layoutDependency: h } = l.options;
      (d === void 0 || d !== h) && (l.resumeFrom = o, r && (o.preserveOpacity = !0), o.snapshot && (l.snapshot = o.snapshot, l.snapshot.latestValues = o.animationValues || o.latestValues), (c = l.root) != null && c.isUpdating && (l.isLayoutDirty = !0)), l.options.crossfade === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((l) => {
      var r, o, c, d, h;
      (o = (r = l.options).onExitComplete) == null || o.call(r), (h = (c = l.resumingFrom) == null ? void 0 : (d = c.options).onExitComplete) == null || h.call(d);
    });
  }
  scheduleRender() {
    this.members.forEach((l) => l.instance && l.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    var l;
    (l = this.lead) != null && l.snapshot && (this.lead.snapshot = void 0);
  }
}
const $s = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, mf = ["", "X", "Y", "Z"], U2 = 1e3;
let w2 = 0;
function yf(a, l, r, o) {
  const { latestValues: c } = l;
  c[a] && (r[a] = c[a], l.setStaticValue(a, 0), o && (o[a] = 0));
}
function Qp(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: l } = a.options;
  if (!l)
    return;
  const r = hp(l);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: c, layoutId: d } = a.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Ct, !(c || d));
  }
  const { parent: o } = a;
  o && !o.hasCheckedOptimisedAppear && Qp(o);
}
function Zp({ attachResizeListener: a, defaultParent: l, measureScroll: r, checkIsScrollRoot: o, resetTransform: c }) {
  return class {
    constructor(h = {}, y = l == null ? void 0 : l()) {
      this.id = w2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(L2), this.nodes.forEach(Q2), this.nodes.forEach(Z2), this.nodes.forEach(j2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = h, this.root = y ? y.root || y : this, this.path = y ? [...y.path, y] : [], this.parent = y, this.depth = y ? y.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new N2());
    }
    addEventListener(h, y) {
      return this.eventHandlers.has(h) || this.eventHandlers.set(h, new kf()), this.eventHandlers.get(h).add(y);
    }
    notifyListeners(h, ...y) {
      const p = this.eventHandlers.get(h);
      p && p.notify(...y);
    }
    hasListeners(h) {
      return this.eventHandlers.has(h);
    }
    /**
     * Lifecycles
     */
    mount(h) {
      if (this.instance)
        return;
      this.isSVG = dh(h) && !wA(h), this.instance = h;
      const { layoutId: y, layout: p, visualElement: S } = this.options;
      if (S && !S.current && S.mount(h), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || y) && (this.isLayoutDirty = !0), a) {
        let v, g = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Ct.read(() => {
          g = window.innerWidth;
        }), a(h, () => {
          const z = window.innerWidth;
          z !== g && (g = z, this.root.updateBlockedByResize = !0, v && v(), v = _2(b, 250), $s.hasAnimatedSinceResize && ($s.hasAnimatedSinceResize = !1, this.nodes.forEach(I0)));
        });
      }
      y && this.root.registerSharedNode(y, this), this.options.animate !== !1 && S && (y || p) && this.addEventListener("didUpdate", ({ delta: v, hasLayoutChanged: g, hasRelativeLayoutChanged: b, layout: z }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const N = this.options.transition || S.getDefaultTransition() || k2, { onLayoutAnimationStart: w, onLayoutAnimationComplete: U } = S.getProps(), H = !this.targetLayout || !qp(this.targetLayout, z), j = !g && b;
        if (this.options.layoutRoot || this.resumeFrom || j || g && (H || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const G = {
            ...uh(N, "layout"),
            onPlay: w,
            onComplete: U
          };
          (S.shouldReduceMotion || this.options.layoutRoot) && (G.delay = 0, G.type = !1), this.startAnimation(G), this.setAnimationOrigin(v, j, G.path);
        } else
          g || I0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = z;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const h = this.getStack();
      h && h.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Gn(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(K2), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: h } = this.options;
      return h && h.getProps().transformTemplate;
    }
    willUpdate(h = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Qp(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let v = 0; v < this.path.length; v++) {
        const g = this.path[v];
        g.shouldResetTransform = !0, (typeof g.latestValues.x == "string" || typeof g.latestValues.y == "string") && (g.isLayoutDirty = !0), g.updateScroll("snapshot"), g.options.layoutRoot && g.willUpdate(!1);
      }
      const { layoutId: y, layout: p } = this.options;
      if (y === void 0 && !p)
        return;
      const S = this.getTransformTemplate();
      this.prevTransformTemplateValue = S ? S(this.latestValues, "") : void 0, this.updateSnapshot(), h && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(G2), this.nodes.forEach(k0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(W0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(q2), this.nodes.forEach(X2), this.nodes.forEach(B2), this.nodes.forEach(H2)) : this.nodes.forEach(W0), this.clearAllSnapshots();
      const y = Se.now();
      he.delta = An(0, 1e3 / 60, y - he.timestamp), he.timestamp = y, he.isProcessing = !0, lf.update.process(he), lf.preRender.process(he), lf.render.process(he), he.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, fh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Y2), this.sharedNodes.forEach(J2);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ct.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ct.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Te(this.snapshot.measuredBox.x) && !Te(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const h = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = kt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: y } = this.options;
      y && y.notify("LayoutMeasure", this.layout.layoutBox, h ? h.layoutBox : void 0);
    }
    updateScroll(h = "measure") {
      let y = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === h && (y = !1), y && this.instance) {
        const p = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: h,
          isRoot: p,
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!c)
        return;
      const h = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, y = this.projectionDelta && !Gp(this.projectionDelta), p = this.getTransformTemplate(), S = p ? p(this.latestValues, "") : void 0, v = S !== this.prevTransformTemplateValue;
      h && this.instance && (y || Ji(this.latestValues) || v) && (c(this.instance, S), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(h = !0) {
      const y = this.measurePageBox();
      let p = this.removeElementScroll(y);
      return h && (p = this.removeTransform(p)), W2(p), {
        animationId: this.root.animationId,
        measuredBox: y,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var S;
      const { visualElement: h } = this.options;
      if (!h)
        return kt();
      const y = h.measureViewportBox();
      if (!(((S = this.scroll) == null ? void 0 : S.wasRoot) || this.path.some(I2))) {
        const { scroll: v } = this.root;
        v && (bn(y.x, v.offset.x), bn(y.y, v.offset.y));
      }
      return y;
    }
    removeElementScroll(h) {
      var p;
      const y = kt();
      if (an(y, h), (p = this.scroll) != null && p.wasRoot)
        return y;
      for (let S = 0; S < this.path.length; S++) {
        const v = this.path[S], { scroll: g, options: b } = v;
        v !== this.root && g && b.layoutScroll && (g.wasRoot && an(y, h), bn(y.x, g.offset.x), bn(y.y, g.offset.y));
      }
      return y;
    }
    applyTransform(h, y = !1, p) {
      var v, g;
      const S = p || kt();
      an(S, h);
      for (let b = 0; b < this.path.length; b++) {
        const z = this.path[b];
        !y && z.options.layoutScroll && z.scroll && z !== z.root && (bn(S.x, -z.scroll.offset.x), bn(S.y, -z.scroll.offset.y)), Ji(z.latestValues) && Ws(S, z.latestValues, (v = z.layout) == null ? void 0 : v.layoutBox);
      }
      return Ji(this.latestValues) && Ws(S, this.latestValues, (g = this.layout) == null ? void 0 : g.layoutBox), S;
    }
    removeTransform(h) {
      var p;
      const y = kt();
      an(y, h);
      for (let S = 0; S < this.path.length; S++) {
        const v = this.path[S];
        if (!Ji(v.latestValues))
          continue;
        let g;
        v.instance && (Gf(v.latestValues) && v.updateSnapshot(), g = kt(), an(g, v.measurePageBox())), G0(y, v.latestValues, (p = v.snapshot) == null ? void 0 : p.layoutBox, g);
      }
      return Ji(this.latestValues) && G0(y, this.latestValues), y;
    }
    setTargetDelta(h) {
      this.targetDelta = h, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(h) {
      this.options = {
        ...this.options,
        ...h,
        crossfade: h.crossfade !== void 0 ? h.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== he.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(h = !1) {
      var z;
      const y = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = y.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = y.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = y.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== y;
      if (!(h || p && this.isSharedProjectionDirty || this.isProjectionDirty || (z = this.parent) != null && z.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: v, layoutId: g } = this.options;
      if (!this.layout || !(v || g))
        return;
      this.resolvedRelativeTargetAt = he.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = kt(), this.targetWithTransforms = kt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), S2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : an(this.target, this.layout.layoutBox), zp(this.target, this.targetDelta)) : an(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Gf(this.parent.latestValues) || Op(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(h, y, p) {
      this.relativeParent = h, this.linkedParentVersion = h.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = kt(), this.relativeTargetOrigin = kt(), so(this.relativeTargetOrigin, y, p, this.options.layoutAnchor || void 0), an(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var N;
      const h = this.getLead(), y = !!this.resumingFrom || this !== h;
      let p = !0;
      if ((this.isProjectionDirty || (N = this.parent) != null && N.isProjectionDirty) && (p = !1), y && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === he.timestamp && (p = !1), p)
        return;
      const { layout: S, layoutId: v } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(S || v))
        return;
      an(this.layoutCorrected, this.layout.layoutBox);
      const g = this.treeScale.x, b = this.treeScale.y;
      FA(this.layoutCorrected, this.treeScale, this.path, y), h.layout && !h.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (h.target = h.layout.layoutBox, h.targetWithTransforms = kt());
      const { target: z } = h;
      if (!z) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (w0(this.prevProjectionDelta.x, this.projectionDelta.x), w0(this.prevProjectionDelta.y, this.projectionDelta.y)), tu(this.projectionDelta, this.layoutCorrected, z, this.latestValues), (this.treeScale.x !== g || this.treeScale.y !== b || !K0(this.projectionDelta.x, this.prevProjectionDelta.x) || !K0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", z));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(h = !0) {
      var y;
      if ((y = this.options.visualElement) == null || y.scheduleRender(), h) {
        const p = this.getStack();
        p && p.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Ja(), this.projectionDelta = Ja(), this.projectionDeltaWithTransform = Ja();
    }
    setAnimationOrigin(h, y = !1, p) {
      const S = this.snapshot, v = S ? S.latestValues : {}, g = { ...this.latestValues }, b = Ja();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !y;
      const z = kt(), N = S ? S.source : void 0, w = this.layout ? this.layout.source : void 0, U = N !== w, H = this.getStack(), j = !H || H.members.length <= 1, G = !!(U && !j && this.options.crossfade === !0 && !this.path.some(P2));
      this.animationProgress = 0;
      let X;
      const et = p == null ? void 0 : p.interpolateProjection(h);
      this.mixTargetDelta = (ct) => {
        const Z = ct / 1e3, q = et == null ? void 0 : et(Z);
        q ? (b.x.translate = q.x, b.x.scale = Vt(h.x.scale, 1, Z), b.x.origin = h.x.origin, b.x.originPoint = h.x.originPoint, b.y.translate = q.y, b.y.scale = Vt(h.y.scale, 1, Z), b.y.origin = h.y.origin, b.y.originPoint = h.y.originPoint) : ($0(b.x, h.x, Z), $0(b.y, h.y, Z)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (so(z, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), F2(this.relativeTarget, this.relativeTargetOrigin, z, Z), X && A2(this.relativeTarget, X) && (this.isProjectionDirty = !1), X || (X = kt()), an(X, this.relativeTarget)), U && (this.animationValues = g, x2(g, v, this.latestValues, Z, G, j)), q && q.rotate !== void 0 && (this.animationValues || (this.animationValues = g), this.animationValues.pathRotation = q.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = Z;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(h) {
      var y, p, S;
      this.notifyListeners("animationStart"), (y = this.currentAnimation) == null || y.stop(), (S = (p = this.resumingFrom) == null ? void 0 : p.currentAnimation) == null || S.stop(), this.pendingAnimation && (Gn(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ct.update(() => {
        $s.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ii(0)), this.motionValue.jump(0, !1), this.currentAnimation = z2(this.motionValue, [0, 1e3], {
          ...h,
          velocity: 0,
          isSync: !0,
          onUpdate: (v) => {
            this.mixTargetDelta(v), h.onUpdate && h.onUpdate(v);
          },
          onComplete: () => {
            h.onComplete && h.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const h = this.getStack();
      h && h.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(U2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const h = this.getLead();
      let { targetWithTransforms: y, target: p, layout: S, latestValues: v } = h;
      if (!(!y || !p || !S)) {
        if (this !== h && this.layout && S && Kp(this.options.animationType, this.layout.layoutBox, S.layoutBox)) {
          p = this.target || kt();
          const g = Te(this.layout.layoutBox.x);
          p.x.min = h.target.x.min, p.x.max = p.x.min + g;
          const b = Te(this.layout.layoutBox.y);
          p.y.min = h.target.y.min, p.y.max = p.y.min + b;
        }
        an(y, p), Ws(y, v), tu(this.projectionDeltaWithTransform, this.layoutCorrected, y, v);
      }
    }
    registerSharedNode(h, y) {
      this.sharedNodes.has(h) || this.sharedNodes.set(h, new V2()), this.sharedNodes.get(h).add(y);
      const S = y.options.initialPromotionConfig;
      y.promote({
        transition: S ? S.transition : void 0,
        preserveFollowOpacity: S && S.shouldPreserveFollowOpacity ? S.shouldPreserveFollowOpacity(y) : void 0
      });
    }
    isLead() {
      const h = this.getStack();
      return h ? h.lead === this : !0;
    }
    getLead() {
      var y;
      const { layoutId: h } = this.options;
      return h ? ((y = this.getStack()) == null ? void 0 : y.lead) || this : this;
    }
    getPrevLead() {
      var y;
      const { layoutId: h } = this.options;
      return h ? (y = this.getStack()) == null ? void 0 : y.prevLead : void 0;
    }
    getStack() {
      const { layoutId: h } = this.options;
      if (h)
        return this.root.sharedNodes.get(h);
    }
    promote({ needsReset: h, transition: y, preserveFollowOpacity: p } = {}) {
      const S = this.getStack();
      S && S.promote(this, p), h && (this.projectionDelta = void 0, this.needsReset = !0), y && this.setOptions({ transition: y });
    }
    relegate() {
      const h = this.getStack();
      return h ? h.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: h } = this.options;
      if (!h)
        return;
      let y = !1;
      const { latestValues: p } = h;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (y = !0), !y)
        return;
      const S = {};
      p.z && yf("z", h, S, this.animationValues);
      for (let v = 0; v < mf.length; v++)
        yf(`rotate${mf[v]}`, h, S, this.animationValues), yf(`skew${mf[v]}`, h, S, this.animationValues);
      h.render();
      for (const v in S)
        h.setStaticValue(v, S[v]), this.animationValues && (this.animationValues[v] = S[v]);
      h.scheduleRender();
    }
    applyProjectionStyles(h, y) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        h.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, h.visibility = "", h.opacity = "", h.pointerEvents = Is(y == null ? void 0 : y.pointerEvents) || "", h.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const S = this.getLead();
      if (!this.projectionDelta || !this.layout || !S.target) {
        this.options.layoutId && (h.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, h.pointerEvents = Is(y == null ? void 0 : y.pointerEvents) || ""), this.hasProjected && !Ji(this.latestValues) && (h.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      h.visibility = "";
      const v = S.animationValues || S.latestValues;
      this.applyTransformsToTarget();
      let g = M2(this.projectionDeltaWithTransform, this.treeScale, v);
      p && (g = p(v, g)), h.transform = g;
      const { x: b, y: z } = this.projectionDelta;
      h.transformOrigin = `${b.origin * 100}% ${z.origin * 100}% 0`, S.animationValues ? h.opacity = S === this ? v.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : v.opacityExit : h.opacity = S === this ? v.opacity !== void 0 ? v.opacity : "" : v.opacityExit !== void 0 ? v.opacityExit : 0;
      for (const N in Xf) {
        if (v[N] === void 0)
          continue;
        const { correct: w, applyTo: U, isCSSVariable: H } = Xf[N], j = g === "none" ? v[N] : w(v[N], S);
        if (U) {
          const G = U.length;
          for (let X = 0; X < G; X++)
            h[U[X]] = j;
        } else
          H ? this.options.visualElement.renderState.vars[N] = j : h[N] = j;
      }
      this.options.layoutId && (h.pointerEvents = S === this ? Is(y == null ? void 0 : y.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((h) => {
        var y;
        return (y = h.currentAnimation) == null ? void 0 : y.stop();
      }), this.root.nodes.forEach(k0), this.root.sharedNodes.clear();
    }
  };
}
function B2(a) {
  a.updateLayout();
}
function H2(a) {
  var r;
  const l = ((r = a.resumeFrom) == null ? void 0 : r.snapshot) || a.snapshot;
  if (a.isLead() && a.layout && l && a.hasListeners("didUpdate")) {
    const { layoutBox: o, measuredBox: c } = a.layout, { animationType: d } = a.options, h = l.source !== a.layout.source;
    if (d === "size")
      Tn((g) => {
        const b = h ? l.measuredBox[g] : l.layoutBox[g], z = Te(b);
        b.min = o[g].min, b.max = b.min + z;
      });
    else if (d === "x" || d === "y") {
      const g = d === "x" ? "y" : "x";
      Qf(h ? l.measuredBox[g] : l.layoutBox[g], o[g]);
    } else Kp(d, l.layoutBox, o) && Tn((g) => {
      const b = h ? l.measuredBox[g] : l.layoutBox[g], z = Te(o[g]);
      b.max = b.min + z, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + z);
    });
    const y = Ja();
    tu(y, o, l.layoutBox);
    const p = Ja();
    h ? tu(p, a.applyTransform(c, !0), l.measuredBox) : tu(p, o, l.layoutBox);
    const S = !Gp(y);
    let v = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: b, layout: z } = g;
        if (b && z) {
          const N = a.options.layoutAnchor || void 0, w = kt();
          so(w, l.layoutBox, b.layoutBox, N);
          const U = kt();
          so(U, o, z.layoutBox, N), qp(w, U) || (v = !0), g.options.layoutRoot && (a.relativeTarget = U, a.relativeTargetOrigin = w, a.relativeParent = g);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: o,
      snapshot: l,
      delta: p,
      layoutDelta: y,
      hasLayoutChanged: S,
      hasRelativeLayoutChanged: v
    });
  } else if (a.isLead()) {
    const { onExitComplete: o } = a.options;
    o && o();
  }
  a.options.transition = void 0;
}
function L2(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function j2(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function Y2(a) {
  a.clearSnapshot();
}
function k0(a) {
  a.clearMeasurements();
}
function G2(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function W0(a) {
  a.isLayoutDirty = !1;
}
function q2(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function X2(a) {
  const { visualElement: l } = a.options;
  l && l.getProps().onBeforeLayoutMeasure && l.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function I0(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function Q2(a) {
  a.resolveTargetDelta();
}
function Z2(a) {
  a.calcProjection();
}
function K2(a) {
  a.resetSkewAndRotation();
}
function J2(a) {
  a.removeLeadSnapshot();
}
function $0(a, l, r) {
  a.translate = Vt(l.translate, 0, r), a.scale = Vt(l.scale, 1, r), a.origin = l.origin, a.originPoint = l.originPoint;
}
function tv(a, l, r, o) {
  a.min = Vt(l.min, r.min, o), a.max = Vt(l.max, r.max, o);
}
function F2(a, l, r, o) {
  tv(a.x, l.x, r.x, o), tv(a.y, l.y, r.y, o);
}
function P2(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const k2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ev = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), nv = ev("applewebkit/") && !ev("chrome/") ? Math.round : Pe;
function iv(a) {
  a.min = nv(a.min), a.max = nv(a.max);
}
function W2(a) {
  iv(a.x), iv(a.y);
}
function Kp(a, l, r) {
  return a === "position" || a === "preserve-aspect" && !p2(Z0(l), Z0(r), 0.2);
}
function I2(a) {
  var l;
  return a !== a.root && ((l = a.scroll) == null ? void 0 : l.wasRoot);
}
const $2 = Zp({
  attachResizeListener: (a, l) => su(a, "resize", l),
  measureScroll: () => {
    var a, l;
    return {
      x: document.documentElement.scrollLeft || ((a = document.body) == null ? void 0 : a.scrollLeft) || 0,
      y: document.documentElement.scrollTop || ((l = document.body) == null ? void 0 : l.scrollTop) || 0
    };
  },
  checkIsScrollRoot: () => !0
}), gf = {
  current: void 0
}, Jp = Zp({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!gf.current) {
      const a = new $2({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), gf.current = a;
    }
    return gf.current;
  },
  resetTransform: (a, l) => {
    a.style.transform = l !== void 0 ? l : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
}), yo = I.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
});
function t3(a = !0) {
  const l = I.useContext(Ff);
  if (l === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: o, register: c } = l, d = I.useId();
  I.useEffect(() => {
    if (a)
      return c(d);
  }, [a]);
  const h = I.useCallback(() => a && o && o(d), [d, o, a]);
  return !r && o ? [!1, h] : [!0];
}
const Fp = I.createContext({ strict: !1 }), av = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let lv = !1;
function e3() {
  if (lv)
    return;
  const a = {};
  for (const l in av)
    a[l] = {
      isEnabled: (r) => av[l].some((o) => !!r[o])
    };
  Dp(a), lv = !0;
}
function Pp() {
  return e3(), QA();
}
function n3(a) {
  const l = Pp();
  for (const r in a)
    l[r] = {
      ...l[r],
      ...a[r]
    };
  Dp(l);
}
const i3 = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function oo(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || i3.has(a);
}
let kp = (a) => !oo(a);
function a3(a) {
  typeof a == "function" && (kp = (l) => l.startsWith("on") ? !oo(l) : a(l));
}
try {
  a3(require("@emotion/is-prop-valid").default);
} catch {
}
function l3(a, l, r) {
  const o = {};
  for (const c in a)
    c === "values" && typeof a.values == "object" || Wt(a[c]) || (kp(c) || r === !0 && oo(c) || !l && !oo(c) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && c.startsWith("onDrag")) && (o[c] = a[c]);
  return o;
}
const go = /* @__PURE__ */ I.createContext({});
function u3(a, l) {
  if (mo(a)) {
    const { initial: r, animate: o } = a;
    return {
      initial: r === !1 || uu(r) ? r : void 0,
      animate: uu(o) ? o : void 0
    };
  }
  return a.inherit !== !1 ? l : {};
}
function s3(a) {
  const { initial: l, animate: r } = u3(a, I.useContext(go));
  return I.useMemo(() => ({ initial: l, animate: r }), [uv(l), uv(r)]);
}
function uv(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const ph = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Wp(a, l, r) {
  for (const o in l)
    !Wt(l[o]) && !_p(o, r) && (a[o] = l[o]);
}
function o3({ transformTemplate: a }, l) {
  return I.useMemo(() => {
    const r = ph();
    return gh(r, l, a), Object.assign({}, r.vars, r.style);
  }, [l]);
}
function r3(a, l) {
  const r = a.style || {}, o = {};
  return Wp(o, r, a), Object.assign(o, o3(a, l)), o;
}
function c3(a, l) {
  const r = {}, o = r3(a, l);
  return a.drag && a.dragListener !== !1 && (r.draggable = !1, o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none", o.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (r.tabIndex = 0), r.style = o, r;
}
const Ip = () => ({
  ...ph(),
  attrs: {}
});
function f3(a, l, r, o) {
  const c = I.useMemo(() => {
    const d = Ip();
    return Vp(d, l, wp(o), a.transformTemplate, a.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [l]);
  if (a.style) {
    const d = {};
    Wp(d, a.style, a), c.style = { ...d, ...c.style };
  }
  return c;
}
const h3 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Sh(a) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof a != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    a.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(h3.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function d3(a, l, r, { latestValues: o }, c, d = !1, h) {
  const p = (h ?? Sh(a) ? f3 : c3)(l, o, c, a), S = l3(l, typeof a == "string", d), v = a !== I.Fragment ? { ...S, ...p, ref: r } : {}, { children: g } = l, b = I.useMemo(() => Wt(g) ? g.get() : g, [g]);
  return I.createElement(a, {
    ...v,
    children: b
  });
}
function m3({ scrapeMotionValuesFromProps: a, createRenderState: l }, r, o, c) {
  return {
    latestValues: y3(r, o, c, a),
    renderState: l()
  };
}
function y3(a, l, r, o) {
  const c = {}, d = o(a, {});
  for (const b in d)
    c[b] = Is(d[b]);
  let { initial: h, animate: y } = a;
  const p = mo(a), S = Ap(a);
  l && S && !p && a.inherit !== !1 && (h === void 0 && (h = l.initial), y === void 0 && (y = l.animate));
  let v = r ? r.initial === !1 : !1;
  v = v || h === !1;
  const g = v ? y : h;
  if (g && typeof g != "boolean" && !ho(g)) {
    const b = Array.isArray(g) ? g : [g];
    for (let z = 0; z < b.length; z++) {
      const N = oh(a, b[z]);
      if (N) {
        const { transitionEnd: w, transition: U, ...H } = N;
        for (const j in H) {
          let G = H[j];
          if (Array.isArray(G)) {
            const X = v ? G.length - 1 : 0;
            G = G[X];
          }
          G !== null && (c[j] = G);
        }
        for (const j in w)
          c[j] = w[j];
      }
    }
  }
  return c;
}
const $p = (a) => (l, r) => {
  const o = I.useContext(go), c = I.useContext(Ff), d = () => m3(a, l, o, c);
  return r ? d() : nu(d);
}, g3 = /* @__PURE__ */ $p({
  scrapeMotionValuesFromProps: vh,
  createRenderState: ph
}), v3 = /* @__PURE__ */ $p({
  scrapeMotionValuesFromProps: Bp,
  createRenderState: Ip
}), p3 = Symbol.for("motionComponentSymbol");
function S3(a, l, r) {
  const o = I.useRef(r);
  I.useInsertionEffect(() => {
    o.current = r;
  });
  const c = I.useRef(null);
  return I.useCallback((d) => {
    var y;
    d && ((y = a.onMount) == null || y.call(a, d)), l && (d ? l.mount(d) : l.unmount());
    const h = o.current;
    if (typeof h == "function")
      if (d) {
        const p = h(d);
        typeof p == "function" && (c.current = p);
      } else c.current ? (c.current(), c.current = null) : h(d);
    else h && (h.current = d);
  }, [l]);
}
const t1 = I.createContext({});
function Qa(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
function T3(a, l, r, o, c, d) {
  var G, X;
  const { visualElement: h } = I.useContext(go), y = I.useContext(Fp), p = I.useContext(Ff), S = I.useContext(yo), v = S.reducedMotion, g = S.skipAnimations, b = I.useRef(null), z = I.useRef(!1);
  o = o || y.renderer, !b.current && o && (b.current = o(a, {
    visualState: l,
    parent: h,
    props: r,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: v,
    skipAnimations: g,
    isSVG: d
  }), z.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const N = b.current, w = I.useContext(t1);
  N && !N.projection && c && (N.type === "html" || N.type === "svg") && b3(b.current, r, c, w);
  const U = I.useRef(!1);
  I.useInsertionEffect(() => {
    N && U.current && N.update(r, p);
  });
  const H = r[fp], j = I.useRef(!!H && typeof window < "u" && !((G = window.MotionHandoffIsComplete) != null && G.call(window, H)) && ((X = window.MotionHasOptimisedAnimation) == null ? void 0 : X.call(window, H)));
  return Ev(() => {
    z.current = !0, N && (U.current = !0, window.MotionIsMounted = !0, N.updateFeatures(), N.scheduleRenderMicrotask(), j.current && N.animationState && N.animationState.animateChanges());
  }), I.useEffect(() => {
    N && (!j.current && N.animationState && N.animationState.animateChanges(), j.current && (queueMicrotask(() => {
      var et;
      (et = window.MotionHandoffMarkAsComplete) == null || et.call(window, H);
    }), j.current = !1), N.enteringChildren = void 0);
  }), N;
}
function b3(a, l, r, o) {
  const { layoutId: c, layout: d, drag: h, dragConstraints: y, layoutScroll: p, layoutRoot: S, layoutAnchor: v, layoutCrossfade: g } = l;
  a.projection = new r(a.latestValues, l["data-framer-portal-id"] ? void 0 : e1(a.parent)), a.projection.setOptions({
    layoutId: c,
    layout: d,
    alwaysMeasureLayout: !!h || y && Qa(y),
    visualElement: a,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof d == "string" ? d : "both",
    initialPromotionConfig: o,
    crossfade: g,
    layoutScroll: p,
    layoutRoot: S,
    layoutAnchor: v
  });
}
function e1(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : e1(a.parent);
}
function vf(a, { forwardMotionProps: l = !1, type: r } = {}, o, c) {
  o && n3(o);
  const d = r ? r === "svg" : Sh(a), h = d ? v3 : g3;
  function y(S, v) {
    let g;
    const b = {
      ...I.useContext(yo),
      ...S,
      layoutId: E3(S)
    }, { isStatic: z } = b, N = s3(S), w = h(S, z);
    if (!z && typeof window < "u") {
      A3();
      const U = M3(b);
      g = U.MeasureLayout, N.visualElement = T3(a, w, b, c, U.ProjectionNode, d);
    }
    return Yt.jsxs(go.Provider, { value: N, children: [g && N.visualElement ? Yt.jsx(g, { visualElement: N.visualElement, ...b }) : null, d3(a, S, S3(w, N.visualElement, v), w, z, l, d)] });
  }
  y.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const p = I.forwardRef(y);
  return p[p3] = a, p;
}
function E3({ layoutId: a }) {
  const l = I.useContext(bv).id;
  return l && a !== void 0 ? l + "-" + a : a;
}
function A3(a, l) {
  I.useContext(Fp).strict;
}
function M3(a) {
  const l = Pp(), { drag: r, layout: o } = l;
  if (!r && !o)
    return {};
  const c = { ...r, ...o };
  return {
    MeasureLayout: r != null && r.isEnabled(a) || o != null && o.isEnabled(a) ? c.MeasureLayout : void 0,
    ProjectionNode: c.ProjectionNode
  };
}
function D3(a, l) {
  if (typeof Proxy > "u")
    return vf;
  const r = /* @__PURE__ */ new Map(), o = (d, h) => vf(d, h, a, l), c = (d, h) => o(d, h);
  return new Proxy(c, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? o : (r.has(h) || r.set(h, vf(h, void 0, a, l)), r.get(h))
  });
}
const x3 = (a, l) => l.isSVG ?? Sh(a) ? new s2(l) : new e2(l, {
  allowProjection: a !== I.Fragment
});
class C3 extends bi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(l) {
    super(l), l.animationState || (l.animationState = h2(l));
  }
  updateAnimationControlsSubscription() {
    const { animate: l } = this.node.getProps();
    ho(l) && (this.unmountControls = l.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: l } = this.node.getProps(), { animate: r } = this.node.prevProps || {};
    l !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var l;
    this.node.animationState.reset(), (l = this.unmountControls) == null || l.call(this);
  }
}
let O3 = 0;
class z3 extends bi {
  constructor() {
    super(...arguments), this.id = O3++, this.isExitComplete = !1;
  }
  update() {
    var d;
    if (!this.node.presenceContext)
      return;
    const { isPresent: l, onExitComplete: r } = this.node.presenceContext, { isPresent: o } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || l === o)
      return;
    if (l && o === !1) {
      if (this.isExitComplete) {
        const { initial: h, custom: y } = this.node.getProps();
        if (typeof h == "string" || typeof h == "object" && h !== null && !Array.isArray(h)) {
          const p = Wi(this.node, h, y);
          if (p) {
            const { transition: S, transitionEnd: v, ...g } = p;
            for (const b in g)
              (d = this.node.getValue(b)) == null || d.jump(g[b]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const c = this.node.animationState.setActive("exit", !l);
    r && !l && c.then(() => {
      this.isExitComplete = !0, r(this.id);
    });
  }
  mount() {
    const { register: l, onExitComplete: r } = this.node.presenceContext || {};
    r && r(this.id), l && (this.unmount = l(this.id));
  }
  unmount() {
  }
}
const R3 = {
  animation: {
    Feature: C3
  },
  exit: {
    Feature: z3
  }
};
function hu(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const N3 = (a) => (l) => hh(l) && a(l, hu(l));
function eu(a, l, r, o) {
  return su(a, l, N3(r), o);
}
const n1 = ({ current: a }) => a ? a.ownerDocument.defaultView : null, sv = (a, l) => Math.abs(a - l);
function _3(a, l) {
  const r = sv(a.x, l.x), o = sv(a.y, l.y);
  return Math.sqrt(r ** 2 + o ** 2);
}
const ov = /* @__PURE__ */ new Set(["auto", "scroll"]);
class i1 {
  constructor(l, r, { transformPagePoint: o, contextWindow: c = window, dragSnapToOrigin: d = !1, distanceThreshold: h = 3, element: y } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (N) => {
      this.handleScroll(N.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Zs(this.lastRawMoveEventInfo, this.transformPagePoint));
      const N = pf(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, U = _3(N.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !U)
        return;
      const { point: H } = N, { timestamp: j } = he;
      this.history.push({ ...H, timestamp: j });
      const { onStart: G, onMove: X } = this.handlers;
      w || (G && G(this.lastMoveEvent, N), this.startEvent = this.lastMoveEvent), X && X(this.lastMoveEvent, N);
    }, this.handlePointerMove = (N, w) => {
      this.lastMoveEvent = N, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Zs(w, this.transformPagePoint), Ct.update(this.updatePoint, !0);
    }, this.handlePointerUp = (N, w) => {
      this.end();
      const { onEnd: U, onSessionEnd: H, resumeAnimation: j } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && j && j(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const G = pf(N.type === "pointercancel" ? this.lastMoveEventInfo : Zs(w, this.transformPagePoint), this.history);
      this.startEvent && U && U(N, G), H && H(N, G);
    }, !hh(l))
      return;
    this.dragSnapToOrigin = d, this.handlers = r, this.transformPagePoint = o, this.distanceThreshold = h, this.contextWindow = c || window;
    const p = hu(l), S = Zs(p, this.transformPagePoint), { point: v } = S, { timestamp: g } = he;
    this.history = [{ ...v, timestamp: g }];
    const { onSessionStart: b } = r;
    b && b(l, pf(S, this.history));
    const z = { passive: !0, capture: !0 };
    this.removeListeners = ru(eu(this.contextWindow, "pointermove", this.handlePointerMove, z), eu(this.contextWindow, "pointerup", this.handlePointerUp, z), eu(this.contextWindow, "pointercancel", this.handlePointerUp, z)), y && this.startScrollTracking(y);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(l) {
    let r = l.parentElement;
    for (; r; ) {
      const o = getComputedStyle(r);
      (ov.has(o.overflowX) || ov.has(o.overflowY)) && this.scrollPositions.set(r, {
        x: r.scrollLeft,
        y: r.scrollTop
      }), r = r.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(l) {
    const r = this.scrollPositions.get(l);
    if (!r)
      return;
    const o = l === window, c = o ? { x: window.scrollX, y: window.scrollY } : {
      x: l.scrollLeft,
      y: l.scrollTop
    }, d = { x: c.x - r.x, y: c.y - r.y };
    d.x === 0 && d.y === 0 || (o ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += d.x, this.lastMoveEventInfo.point.y += d.y) : this.history.length > 0 && (this.history[0].x -= d.x, this.history[0].y -= d.y), this.scrollPositions.set(l, c), Ct.update(this.updatePoint, !0));
  }
  updateHandlers(l) {
    this.handlers = l;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Gn(this.updatePoint);
  }
}
function Zs(a, l) {
  return l ? { point: l(a.point) } : a;
}
function rv(a, l) {
  return { x: a.x - l.x, y: a.y - l.y };
}
function pf({ point: a }, l) {
  return {
    point: a,
    delta: rv(a, a1(l)),
    offset: rv(a, V3(l)),
    velocity: U3(l, 0.1)
  };
}
function V3(a) {
  return a[0];
}
function a1(a) {
  return a[a.length - 1];
}
function U3(a, l) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let r = a.length - 1, o = null;
  const c = a1(a);
  for (; r >= 0 && (o = a[r], !(c.timestamp - o.timestamp > /* @__PURE__ */ Ce(l))); )
    r--;
  if (!o)
    return { x: 0, y: 0 };
  o === a[0] && a.length > 2 && c.timestamp - o.timestamp > /* @__PURE__ */ Ce(l) * 2 && (o = a[1]);
  const d = /* @__PURE__ */ Fe(c.timestamp - o.timestamp);
  if (d === 0)
    return { x: 0, y: 0 };
  const h = {
    x: (c.x - o.x) / d,
    y: (c.y - o.y) / d
  };
  return h.x === 1 / 0 && (h.x = 0), h.y === 1 / 0 && (h.y = 0), h;
}
function w3(a, { min: l, max: r }, o) {
  return l !== void 0 && a < l ? a = o ? Vt(l, a, o.min) : Math.max(a, l) : r !== void 0 && a > r && (a = o ? Vt(r, a, o.max) : Math.min(a, r)), a;
}
function cv(a, l, r) {
  return {
    min: l !== void 0 ? a.min + l : void 0,
    max: r !== void 0 ? a.max + r - (a.max - a.min) : void 0
  };
}
function B3(a, { top: l, left: r, bottom: o, right: c }) {
  return {
    x: cv(a.x, r, c),
    y: cv(a.y, l, o)
  };
}
function fv(a, l) {
  let r = l.min - a.min, o = l.max - a.max;
  return l.max - l.min < a.max - a.min && ([r, o] = [o, r]), { min: r, max: o };
}
function H3(a, l) {
  return {
    x: fv(a.x, l.x),
    y: fv(a.y, l.y)
  };
}
function L3(a, l) {
  let r = 0.5;
  const o = Te(a), c = Te(l);
  return c > o ? r = /* @__PURE__ */ iu(l.min, l.max - o, a.min) : o > c && (r = /* @__PURE__ */ iu(a.min, a.max - c, l.min)), An(0, 1, r);
}
function j3(a, l) {
  const r = {};
  return l.min !== void 0 && (r.min = l.min - a.min), l.max !== void 0 && (r.max = l.max - a.min), r;
}
const Zf = 0.35;
function Y3(a = Zf) {
  return a === !1 ? a = 0 : a === !0 && (a = Zf), {
    x: hv(a, "left", "right"),
    y: hv(a, "top", "bottom")
  };
}
function hv(a, l, r) {
  return {
    min: dv(a, l),
    max: dv(a, r)
  };
}
function dv(a, l) {
  return typeof a == "number" ? a : a[l] || 0;
}
const G3 = /* @__PURE__ */ new WeakMap();
class q3 {
  constructor(l) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = kt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = l;
  }
  start(l, { snapToCursor: r = !1, distanceThreshold: o } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === !1)
      return;
    const d = (g) => {
      r && this.snapToCursor(hu(g).point), this.stopAnimation();
    }, h = (g, b) => {
      const { drag: z, dragPropagation: N, onDragStart: w } = this.getProps();
      if (z && !N && (this.openDragLock && this.openDragLock(), this.openDragLock = pA(z), !this.openDragLock))
        return;
      this.latestPointerEvent = g, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Tn((H) => {
        let j = this.getAxisMotionValue(H).get() || 0;
        if (En.test(j)) {
          const { projection: G } = this.visualElement;
          if (G && G.layout) {
            const X = G.layout.layoutBox[H];
            X && (j = Te(X) * (parseFloat(j) / 100));
          }
        }
        this.originPoint[H] = j;
      }), w && Ct.update(() => w(g, b), !1, !0), wf(this.visualElement, "transform");
      const { animationState: U } = this.visualElement;
      U && U.setActive("whileDrag", !0);
    }, y = (g, b) => {
      this.latestPointerEvent = g, this.latestPanInfo = b;
      const { dragPropagation: z, dragDirectionLock: N, onDirectionLock: w, onDrag: U } = this.getProps();
      if (!z && !this.openDragLock)
        return;
      const { offset: H } = b;
      if (N && this.currentDirection === null) {
        this.currentDirection = Q3(H), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, H), this.updateAxis("y", b.point, H), this.visualElement.render(), U && Ct.update(() => U(g, b), !1, !0);
    }, p = (g, b) => {
      this.latestPointerEvent = g, this.latestPanInfo = b, this.stop(g, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, S = () => {
      const { dragSnapToOrigin: g } = this.getProps();
      (g || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: v } = this.getProps();
    this.panSession = new i1(l, {
      onSessionStart: d,
      onStart: h,
      onMove: y,
      onSessionEnd: p,
      resumeAnimation: S
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: v,
      distanceThreshold: o,
      contextWindow: n1(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(l, r) {
    const o = l || this.latestPointerEvent, c = r || this.latestPanInfo, d = this.isDragging;
    if (this.cancel(), !d || !c || !o)
      return;
    const { velocity: h } = c;
    this.startAnimation(h);
    const { onDragEnd: y } = this.getProps();
    y && Ct.postRender(() => y(o, c));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: l, animationState: r } = this.visualElement;
    l && (l.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: o } = this.getProps();
    !o && this.openDragLock && (this.openDragLock(), this.openDragLock = null), r && r.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(l, r, o) {
    const { drag: c } = this.getProps();
    if (!o || !Ks(l, c, this.currentDirection))
      return;
    const d = this.getAxisMotionValue(l);
    let h = this.originPoint[l] + o[l];
    this.constraints && this.constraints[l] && (h = w3(h, this.constraints[l], this.elastic[l])), d.set(h);
  }
  resolveConstraints() {
    var d;
    const { dragConstraints: l, dragElastic: r } = this.getProps(), o = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (d = this.visualElement.projection) == null ? void 0 : d.layout, c = this.constraints;
    l && Qa(l) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : l && o ? this.constraints = B3(o.layoutBox, l) : this.constraints = !1, this.elastic = Y3(r), c !== this.constraints && !Qa(l) && o && this.constraints && !this.hasMutatedConstraints && Tn((h) => {
      this.constraints !== !1 && this.getAxisMotionValue(h) && (this.constraints[h] = j3(o.layoutBox[h], this.constraints[h]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: l, onMeasureDragConstraints: r } = this.getProps();
    if (!l || !Qa(l))
      return !1;
    const o = l.current;
    Si(o !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: c } = this.visualElement;
    if (!c || !c.layout)
      return !1;
    c.root && (c.root.scroll = void 0, c.root.updateScroll());
    const d = PA(o, c.root, this.visualElement.getTransformPagePoint());
    let h = H3(c.layout.layoutBox, d);
    if (r) {
      const y = r(KA(h));
      this.hasMutatedConstraints = !!y, y && (h = Cp(y));
    }
    return h;
  }
  startAnimation(l) {
    const { drag: r, dragMomentum: o, dragElastic: c, dragTransition: d, dragSnapToOrigin: h, onDragTransitionEnd: y } = this.getProps(), p = this.constraints || {}, S = Tn((v) => {
      if (!Ks(v, r, this.currentDirection))
        return;
      let g = p && p[v] || {};
      (h === !0 || h === v) && (g = { min: 0, max: 0 });
      const b = c ? 200 : 1e6, z = c ? 40 : 1e7, N = {
        type: "inertia",
        velocity: o ? l[v] : 0,
        bounceStiffness: b,
        bounceDamping: z,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...d,
        ...g
      };
      return this.startAxisValueAnimation(v, N);
    });
    return Promise.all(S).then(y);
  }
  startAxisValueAnimation(l, r) {
    const o = this.getAxisMotionValue(l);
    return wf(this.visualElement, l), o.start(sh(l, o, 0, r, this.visualElement, !1));
  }
  stopAnimation() {
    Tn((l) => this.getAxisMotionValue(l).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(l) {
    const r = `_drag${l.toUpperCase()}`, c = this.visualElement.getProps()[r];
    return c || this.visualElement.getValue(l, this.visualElement.latestValues[l] ?? 0);
  }
  snapToCursor(l) {
    Tn((r) => {
      const { drag: o } = this.getProps();
      if (!Ks(r, o, this.currentDirection))
        return;
      const { projection: c } = this.visualElement, d = this.getAxisMotionValue(r);
      if (c && c.layout) {
        const { min: h, max: y } = c.layout.layoutBox[r], p = d.get() || 0;
        d.set(l[r] - Vt(h, y, 0.5) + p);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: l, dragConstraints: r } = this.getProps(), { projection: o } = this.visualElement;
    if (!Qa(r) || !o || !this.constraints)
      return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    Tn((h) => {
      const y = this.getAxisMotionValue(h);
      if (y && this.constraints !== !1) {
        const p = y.get();
        c[h] = L3({ min: p, max: p }, this.constraints[h]);
      }
    });
    const { transformTemplate: d } = this.visualElement.getProps();
    this.visualElement.current.style.transform = d ? d({}, "") : "none", o.root && o.root.updateScroll(), o.updateLayout(), this.constraints = !1, this.resolveConstraints(), Tn((h) => {
      if (!Ks(h, l, null))
        return;
      const y = this.getAxisMotionValue(h), { min: p, max: S } = this.constraints[h];
      y.set(Vt(p, S, c[h]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    G3.set(this.visualElement, this);
    const l = this.visualElement.current, r = eu(l, "pointerdown", (S) => {
      const { drag: v, dragListener: g = !0 } = this.getProps(), b = S.target, z = b !== l && MA(b);
      v && g && !z && this.start(S);
    });
    let o;
    const c = () => {
      const { dragConstraints: S } = this.getProps();
      Qa(S) && S.current && (this.constraints = this.resolveRefConstraints(), o || (o = X3(l, S.current, () => this.scalePositionWithinConstraints())));
    }, { projection: d } = this.visualElement, h = d.addEventListener("measure", c);
    d && !d.layout && (d.root && d.root.updateScroll(), d.updateLayout()), Ct.read(c);
    const y = su(window, "resize", () => this.scalePositionWithinConstraints()), p = d.addEventListener("didUpdate", (({ delta: S, hasLayoutChanged: v }) => {
      this.isDragging && v && (Tn((g) => {
        const b = this.getAxisMotionValue(g);
        b && (this.originPoint[g] += S[g].translate, b.set(b.get() + S[g].translate));
      }), this.visualElement.render());
    }));
    return () => {
      y(), r(), h(), p && p(), o && o();
    };
  }
  getProps() {
    const l = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: o = !1, dragPropagation: c = !1, dragConstraints: d = !1, dragElastic: h = Zf, dragMomentum: y = !0 } = l;
    return {
      ...l,
      drag: r,
      dragDirectionLock: o,
      dragPropagation: c,
      dragConstraints: d,
      dragElastic: h,
      dragMomentum: y
    };
  }
}
function mv(a) {
  let l = !0;
  return () => {
    if (l) {
      l = !1;
      return;
    }
    a();
  };
}
function X3(a, l, r) {
  const o = E0(a, mv(r)), c = E0(l, mv(r));
  return () => {
    o(), c();
  };
}
function Ks(a, l, r) {
  return (l === !0 || l === a) && (r === null || r === a);
}
function Q3(a, l = 10) {
  let r = null;
  return Math.abs(a.y) > l ? r = "y" : Math.abs(a.x) > l && (r = "x"), r;
}
class Z3 extends bi {
  constructor(l) {
    super(l), this.removeGroupControls = Pe, this.removeListeners = Pe, this.controls = new q3(l);
  }
  mount() {
    const { dragControls: l } = this.node.getProps();
    l && (this.removeGroupControls = l.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Pe;
  }
  update() {
    const { dragControls: l } = this.node.getProps(), { dragControls: r } = this.node.prevProps || {};
    l !== r && (this.removeGroupControls(), l && (this.removeGroupControls = l.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Sf = (a) => (l, r) => {
  a && Ct.update(() => a(l, r), !1, !0);
};
class K3 extends bi {
  constructor() {
    super(...arguments), this.removePointerDownListener = Pe;
  }
  onPointerDown(l) {
    this.session = new i1(l, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: n1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: l, onPanStart: r, onPan: o, onPanEnd: c } = this.node.getProps();
    return {
      onSessionStart: Sf(l),
      onStart: Sf(r),
      onMove: Sf(o),
      onEnd: (d, h) => {
        delete this.session, c && Ct.postRender(() => c(d, h));
      }
    };
  }
  mount() {
    this.removePointerDownListener = eu(this.node.current, "pointerdown", (l) => this.onPointerDown(l));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Tf = !1;
class J3 extends I.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: l, layoutGroup: r, switchLayoutGroup: o, layoutId: c } = this.props, { projection: d } = l;
    d && (r.group && r.group.add(d), o && o.register && c && o.register(d), Tf && d.root.didUpdate(), d.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), d.setOptions({
      ...d.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), $s.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(l) {
    const { layoutDependency: r, visualElement: o, drag: c, isPresent: d } = this.props, { projection: h } = o;
    return h && (h.isPresent = d, l.layoutDependency !== r && h.setOptions({
      ...h.options,
      layoutDependency: r
    }), Tf = !0, c || l.layoutDependency !== r || r === void 0 || l.isPresent !== d ? h.willUpdate() : this.safeToRemove(), l.isPresent !== d && (d ? h.promote() : h.relegate() || Ct.postRender(() => {
      const y = h.getStack();
      (!y || !y.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: l, layoutAnchor: r } = this.props, { projection: o } = l;
    o && (o.options.layoutAnchor = r, o.root.didUpdate(), fh.postRender(() => {
      !o.currentAnimation && o.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: l, layoutGroup: r, switchLayoutGroup: o } = this.props, { projection: c } = l;
    Tf = !0, c && (c.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(c), o && o.deregister && o.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: l } = this.props;
    l && l();
  }
  render() {
    return null;
  }
}
function l1(a) {
  const [l, r] = t3(), o = I.useContext(bv);
  return Yt.jsx(J3, { ...a, layoutGroup: o, switchLayoutGroup: I.useContext(t1), isPresent: l, safeToRemove: r });
}
const F3 = {
  pan: {
    Feature: K3
  },
  drag: {
    Feature: Z3,
    ProjectionNode: Jp,
    MeasureLayout: l1
  }
};
function yv(a, l, r) {
  const { props: o } = a;
  a.animationState && o.whileHover && a.animationState.setActive("whileHover", r === "Start");
  const c = "onHover" + r, d = o[c];
  d && Ct.postRender(() => d(l, hu(l)));
}
class P3 extends bi {
  mount() {
    const { current: l } = this.node;
    l && (this.unmount = TA(l, (r, o) => (yv(this.node, o, "Start"), (c) => yv(this.node, c, "End"))));
  }
  unmount() {
  }
}
class k3 extends bi {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let l = !1;
    try {
      l = this.node.current.matches(":focus-visible");
    } catch {
      l = !0;
    }
    !l || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = ru(su(this.node.current, "focus", () => this.onFocus()), su(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function gv(a, l, r) {
  const { props: o } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && o.whileTap && a.animationState.setActive("whileTap", r === "Start");
  const c = "onTap" + (r === "End" ? "" : r), d = o[c];
  d && Ct.postRender(() => d(l, hu(l)));
}
class W3 extends bi {
  mount() {
    const { current: l } = this.node;
    if (!l)
      return;
    const { globalTapTarget: r, propagate: o } = this.node.props;
    this.unmount = xA(l, (c, d) => (gv(this.node, d, "Start"), (h, { success: y }) => gv(this.node, h, y ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: (o == null ? void 0 : o.tap) === !1
    });
  }
  unmount() {
  }
}
const Kf = /* @__PURE__ */ new WeakMap(), bf = /* @__PURE__ */ new WeakMap(), I3 = (a) => {
  const l = Kf.get(a.target);
  l && l(a);
}, $3 = (a) => {
  a.forEach(I3);
};
function tM({ root: a, ...l }) {
  const r = a || document;
  bf.has(r) || bf.set(r, {});
  const o = bf.get(r), c = JSON.stringify(l);
  return o[c] || (o[c] = new IntersectionObserver($3, { root: a, ...l })), o[c];
}
function eM(a, l, r) {
  const o = tM(l);
  return Kf.set(a, r), o.observe(a), () => {
    Kf.delete(a), o.unobserve(a);
  };
}
const nM = {
  some: 0,
  all: 1
};
class iM extends bi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    var p;
    (p = this.stopObserver) == null || p.call(this);
    const { viewport: l = {} } = this.node.getProps(), { root: r, margin: o, amount: c = "some", once: d } = l, h = {
      root: r ? r.current : void 0,
      rootMargin: o,
      threshold: typeof c == "number" ? c : nM[c]
    }, y = (S) => {
      const { isIntersecting: v } = S;
      if (this.isInView === v || (this.isInView = v, d && !v && this.hasEnteredView))
        return;
      v && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", v);
      const { onViewportEnter: g, onViewportLeave: b } = this.node.getProps(), z = v ? g : b;
      z && z(S);
    };
    this.stopObserver = eM(this.node.current, h, y);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: l, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(aM(l, r)) && this.startObserver();
  }
  unmount() {
    var l;
    (l = this.stopObserver) == null || l.call(this), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function aM({ viewport: a = {} }, { viewport: l = {} } = {}) {
  return (r) => a[r] !== l[r];
}
const lM = {
  inView: {
    Feature: iM
  },
  tap: {
    Feature: W3
  },
  focus: {
    Feature: k3
  },
  hover: {
    Feature: P3
  }
}, uM = {
  layout: {
    ProjectionNode: Jp,
    MeasureLayout: l1
  }
}, sM = {
  ...R3,
  ...lM,
  ...F3,
  ...uM
}, oM = /* @__PURE__ */ D3(sM, x3);
function ro(a) {
  const l = nu(() => Ii(a)), { isStatic: r } = I.useContext(yo);
  if (r) {
    const [, o] = I.useState(a);
    I.useEffect(() => l.on("change", o), []);
  }
  return l;
}
function u1(a, l) {
  const r = ro(l()), o = () => r.set(l());
  return o(), Ev(() => {
    const c = () => Ct.preRender(o, !1, !0), d = a.map((h) => h.on("change", c));
    return () => {
      d.forEach((h) => h()), Gn(o);
    };
  }), r;
}
function rM(a) {
  $l.current = [], a();
  const l = u1($l.current, a);
  return $l.current = void 0, l;
}
function co(a, l, r, o) {
  if (typeof a == "function")
    return rM(a);
  if (r !== void 0 && !Array.isArray(r) && typeof l != "function")
    return cM(a, l, r, o);
  const h = typeof l == "function" ? l : BA(l, r, o), y = Array.isArray(a) ? vv(a, h) : vv([a], ([S]) => h(S)), p = Array.isArray(a) ? void 0 : a.accelerate;
  return p && !p.isTransformed && typeof l != "function" && Array.isArray(r) && (o == null ? void 0 : o.clamp) !== !1 && (y.accelerate = {
    ...p,
    times: l,
    keyframes: r,
    isTransformed: !0
  }), y;
}
function vv(a, l) {
  const r = nu(() => []);
  return u1(a, () => {
    r.length = 0;
    const o = a.length;
    for (let c = 0; c < o; c++)
      r[c] = a[c].get();
    return l(r);
  });
}
function cM(a, l, r, o) {
  const c = nu(() => Object.keys(r)), d = nu(() => ({}));
  for (const h of c)
    d[h] = co(a, l, r[h], o);
  return d;
}
function fM(a, l = {}) {
  const { isStatic: r } = I.useContext(yo), o = () => Wt(a) ? a.get() : a;
  if (r)
    return co(o);
  const c = ro(o());
  return I.useInsertionEffect(() => HA(c, a, l), [c, JSON.stringify(l)]), c;
}
function pv(a, l = {}) {
  return fM(a, { type: "spring", ...l });
}
const Pl = oM;
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hM = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), s1 = (...a) => a.filter((l, r, o) => !!l && l.trim() !== "" && o.indexOf(l) === r).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var dM = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mM = I.forwardRef(
  ({
    color: a = "currentColor",
    size: l = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: o,
    className: c = "",
    children: d,
    iconNode: h,
    ...y
  }, p) => I.createElement(
    "svg",
    {
      ref: p,
      ...dM,
      width: l,
      height: l,
      stroke: a,
      strokeWidth: o ? Number(r) * 24 / Number(l) : r,
      className: s1("lucide", c),
      ...y
    },
    [
      ...h.map(([S, v]) => I.createElement(S, v)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yM = (a, l) => {
  const r = I.forwardRef(
    ({ className: o, ...c }, d) => I.createElement(mM, {
      ref: d,
      iconNode: l,
      className: s1(`lucide-${hM(a)}`, o),
      ...c
    })
  );
  return r.displayName = `${a}`, r;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gM = yM("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
function vM({
  links: a = SM
}) {
  return /* @__PURE__ */ Yt.jsx("section", { className: "bg-background w-full p-4 md:px-8 md:py-16", "aria-label": "Explore Momentum Strategies", children: /* @__PURE__ */ Yt.jsx("div", { className: "mx-auto max-w-5xl", children: a.map((l) => /* @__PURE__ */ Yt.jsx(pM, { ...l }, l.heading)) }) });
}
function pM({ heading: a, imgSrc: l, subheading: r, href: o }) {
  const c = I.useRef(null), d = ro(0), h = ro(0), y = pv(d), p = pv(h), S = co(p, [0.5, -0.5], ["40%", "60%"]), v = co(y, [0.5, -0.5], ["60%", "40%"]), g = (b) => {
    var U;
    const z = (U = c.current) == null ? void 0 : U.getBoundingClientRect();
    if (!z) return;
    const N = b.clientX - z.left, w = b.clientY - z.top;
    d.set(N / z.width - 0.5), h.set(w / z.height - 0.5);
  };
  return /* @__PURE__ */ Yt.jsxs(
    Pl.a,
    {
      href: o,
      ref: c,
      onMouseMove: g,
      onMouseLeave: () => {
        d.set(0), h.set(0);
      },
      initial: "initial",
      whileHover: "whileHover",
      className: "group relative flex items-center justify-between border-b-2 border-muted py-4 transition-colors duration-500 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground md:py-8",
      children: [
        /* @__PURE__ */ Yt.jsxs("div", { children: [
          /* @__PURE__ */ Yt.jsx(
            Pl.span,
            {
              variants: { initial: { x: 0 }, whileHover: { x: -16 } },
              transition: { type: "spring", staggerChildren: 0.075, delayChildren: 0.25 },
              className: "relative z-10 block text-4xl font-bold text-muted-foreground transition-colors duration-500 group-hover:text-foreground md:text-6xl",
              "aria-label": a,
              children: a.split("").map((b, z) => /* @__PURE__ */ Yt.jsx(
                Pl.span,
                {
                  variants: { initial: { x: 0 }, whileHover: { x: 16 } },
                  transition: { type: "spring" },
                  className: "inline-block",
                  "aria-hidden": "true",
                  children: b === " " ? " " : b
                },
                z
              ))
            }
          ),
          /* @__PURE__ */ Yt.jsx("span", { className: "relative z-10 mt-2 block text-base text-muted-foreground transition-colors duration-500 group-hover:text-foreground", children: r })
        ] }),
        /* @__PURE__ */ Yt.jsx(
          Pl.img,
          {
            style: { top: S, left: v, translateX: "-10%", translateY: "-50%" },
            variants: { initial: { scale: 0, rotate: "-12.5deg" }, whileHover: { scale: 1, rotate: "12.5deg" } },
            transition: { type: "spring" },
            src: l,
            className: "pointer-events-none absolute z-0 h-24 w-32 rounded-lg object-cover shadow-lg md:h-48 md:w-64",
            alt: `Image representing ${a}`,
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ Yt.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ Yt.jsx(
          Pl.div,
          {
            variants: { initial: { x: "100%", opacity: 0 }, whileHover: { x: "0%", opacity: 1 } },
            transition: { type: "spring" },
            className: "relative z-10 p-4",
            children: /* @__PURE__ */ Yt.jsx(gM, { className: "size-8 text-foreground md:size-12", "aria-hidden": "true" })
          }
        ) })
      ]
    }
  );
}
const SM = [
  { heading: "Services", subheading: "Every phase of the federal lifecycle", imgSrc: "assets/hover/services-v2.webp", href: "#services" },
  { heading: "Our approach", subheading: "A connected operating model", imgSrc: "assets/hover/approach-v2.webp", href: "#approach" },
  { heading: "About", subheading: "Get to know Momentum Strategies", imgSrc: "assets/hover/about-v2.webp", href: "#about" },
  { heading: "Start a conversation", subheading: "Tell us what you are building", imgSrc: "assets/hover/contact-v2.webp", href: "#contact" }
], TM = [
  { heading: "Services", subheading: "Every phase of the federal lifecycle", imgSrc: "assets/hover/services-v2.webp", href: "#services" },
  { heading: "Our approach", subheading: "A connected operating model", imgSrc: "assets/hover/approach-v2.webp", href: "#approach" },
  { heading: "About", subheading: "Get to know Momentum Strategies", imgSrc: "assets/hover/about-v2.webp", href: "#about" },
  { heading: "Start a conversation", subheading: "Tell us what you are building", imgSrc: "assets/hover/contact-v2.webp", href: "#contact" }
], Sv = document.getElementById("interactive-hover-links-root");
Sv && db.createRoot(Sv).render(
  /* @__PURE__ */ Yt.jsxs(Yt.Fragment, { children: [
    /* @__PURE__ */ Yt.jsx("div", { className: "hover-links-intro", children: /* @__PURE__ */ Yt.jsxs("div", { className: "hover-links-intro-inner", children: [
      /* @__PURE__ */ Yt.jsx("p", { children: "EXPLORE MOMENTUM" }),
      /* @__PURE__ */ Yt.jsxs("h2", { children: [
        "Find your ",
        /* @__PURE__ */ Yt.jsx("span", { children: "next move." })
      ] })
    ] }) }),
    /* @__PURE__ */ Yt.jsx(vM, { links: TM })
  ] })
);
