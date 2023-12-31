
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

      require("/workspaces/wheel-awesome/mini-bundler/test/demo1/code/index.js");
    })({
      "/workspaces/wheel-awesome/mini-bundler/test/demo1/code/index.js": [
        function (require, module, exports) {
          "use strict";

require("./index.css");
var _add = require("./add.js");
console.log((0, _add.add)(2, 3), (0, _add.sub)(3, 2));
        },
        {"./index.css":"/workspaces/wheel-awesome/mini-bundler/test/demo1/code/index.css","./add.js":"/workspaces/wheel-awesome/mini-bundler/test/demo1/code/add.js"},
      ],
    
      "/workspaces/wheel-awesome/mini-bundler/test/demo1/code/index.css": [
        function (require, module, exports) {
          
        },
        {},
      ],
    
      "/workspaces/wheel-awesome/mini-bundler/test/demo1/code/add.js": [
        function (require, module, exports) {
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
        {"./sub.js":"/workspaces/wheel-awesome/mini-bundler/test/demo1/code/sub.js"},
      ],
    
      "/workspaces/wheel-awesome/mini-bundler/test/demo1/code/sub.js": [
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
  