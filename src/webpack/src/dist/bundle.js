(function(graph) {
        function require(file) {
            function absRequire(realPath) {
                return require(graph[file].deps[realPath])
            }
            var exports = {};
            (function(require, exports, code) {
                eval(code)
            })(absRequire, exports, graph[file].code)  // es6 -> es5后 import和export和对应变成require和exports 游览器没有对应的require函数, 所以编写require函数传递
            return exports;
        }
        require('./index.js') // 引入入口
    })({"./index.js":{"deps":{"./add.js":"./add.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(9, 19));"},"./add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"}})