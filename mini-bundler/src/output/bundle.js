
    (function(modules) {
      function require(id) {
        const [fn, dependencies] = modules[id];

        function localRequire(relativePath) {
          return require(dependencies[relativePath]);
        }

        const module = { exports: {} };

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require("/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/src/index.js");
    })({
      "/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/src/index.js": [
        function (require, module, exports) {
          "use strict";

var _add = require("./add.js");
var a = (0, _add.add)(1, 12);
var b = (0, _add.sub)(1, 12);
console.log(a, b);
        },
        {"./add.js":"/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/src/add.js"},
      ],
    
      "/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/src/add.js": [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.add = void 0;
Object.defineProperty(exports, "sub", {
  enumerable: true,
  get: function get() {
    return _sub.sub;
  }
});
var _sub = require("./sub.js");
var add = exports.add = function add(a, b) {
  return a + b;
};
var _default = exports["default"] = add;
        },
        {"./sub.js":"/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/src/sub.js"},
      ],
    
      "/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/src/sub.js": [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;
function sub(a, b) {
  return a - b;
}
        },
        {},
      ],
    })
  