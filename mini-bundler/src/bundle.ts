import { DependencyGraph } from "./typings";

/**
 * 打包依赖关系图为单一字符串。
 * 此函数接收一个依赖关系图，将其转换为一个包含所有模块和它们依赖的单一字符串。
 * 字符串的格式允许它被执行并作为模块系统使用，其中每个模块都被封装在一个函数中，
 * 并且有一个映射来表示其依赖关系。
 *
 * @param {DependencyGraph} graph - 依赖关系图，包含项目中所有模块的信息。
 * @returns {string} - 一个字符串，包含所有模块及其依赖，可以被执行以模拟模块系统。
 */
export const bundle = (graph: DependencyGraph): string => {
  let modules = "";

  graph.forEach((mod) => {
    modules += `
      "${mod.id}": [
        function (require, module, exports) {
          ${mod.content}
        },
        ${JSON.stringify(mod.mapping)},
      ],
    `;
  });

  return `
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

      require("${graph.keys().next().value}");
    })({${modules}})
  `;
};
