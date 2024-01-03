
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

var _add = require("./add.ts");
console.log((0, _add.add)(1, 2));
        },
        {"./add.ts":"/Users/hujiahua/code/workBranch/wheel-awesome/mini-bundler/test/demo2/code/add.ts"},
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
    })
  