
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

      require("/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/index.ts");
    })({
      "/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/index.ts": [
        function (require, module, exports) {
          "use strict";

var _add = require("./add");
var _sub = require("./sub");
console.log((0, _add.add)(1, 2), (0, _sub.sub)(2, 3));
        },
        {"./add":"/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/add.ts","./sub":"/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/sub.ts"},
      ],
    
      "/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/add.ts": [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = void 0;
var add = exports.add = function add(a, b) {
  return a + b;
};
        },
        {},
      ],
    
      "/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/sub.ts": [
        function (require, module, exports) {
          "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = void 0;
var sub = exports.sub = function sub(a, b) {
  return a - b;
};
        },
        {},
      ],
    })
  