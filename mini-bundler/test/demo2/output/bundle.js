
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

console.log('hello, world');
        },
        {},
      ],
    })
  