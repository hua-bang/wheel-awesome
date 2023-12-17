
    (function(modules) {

      let cache = {};

      function require(id) {
        if(cache[id]) {
          return cache[id].exports;
        }

        const [fn, mapping] = modules[id];

        const module = { exports: {} };

        function localRequire(name) {
          return require(mapping[name]);
        }

        fn(localRequire, module, module.exports)
        cache[id] = module;

        return module.exports;
      }

      require(0);

    })({
    0: [
      function(require, module, exports) {
        "use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _add = _interopRequireWildcard(require("./add.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
console.log((0, _add["default"])(2, 3), (0, _add.sub)(2, 3));
      },
      {"./add.js":1}
    ],
    
    1: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports["default"] = void 0;
Object.defineProperty(exports, "sub", {
  enumerable: true,
  get: function get() {
    return _sub.sub;
  }
});
var _sub = require("./sub.js");
function add(a, b) {
  return a + b;
}
var _default = exports["default"] = add;
      },
      {"./sub.js":2}
    ],
    
    2: [
      function(require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;
function sub(a, b) {
  return a - b;
}
      },
      {}
    ],
    })
  