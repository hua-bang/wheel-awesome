import { transformFromAstSync, traverse } from "@babel/core";
import { Module } from "./typings";
import * as fs from "fs";
import { parse } from "@babel/parser";
import * as path from "path";

let id = 0;

function getId() {
  return id++;
}

/**
 * 根据文件路径创建模块对象
 * @param filePath 文件路径
 * @returns 模块对象
 */
const createModule = (filePath: string): Module => {
  const dependencies: Module["dependencies"] = [];

  const content = fs.readFileSync(filePath, "utf-8");

  const ast = parse(content, { sourceType: "module" });

  const { code } =
    transformFromAstSync(ast, content, {
      presets: ["@babel/preset-env"],
    }) || {};

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  return {
    id: getId(),
    code: code || "",
    filePath,
    dependencies,
    mapping: {},
  };
};

/**
 * 根据文件路径创建模块依赖图
 * @param filePath 文件路径
 * @returns 模块依赖图
 */
const createDependencyGraph = (entry: string): Module[] => {
  const entryModule = createModule(entry);
  const graphArray: Module[] = [entryModule];

  for (const module of graphArray) {
    module.dependencies.forEach((dependencyPath) => {
      const absolutePath = path.resolve(
        path.dirname(entryModule.filePath),
        dependencyPath
      );
      const childModule = createModule(absolutePath);
      module.mapping[dependencyPath] = childModule.id;
      graphArray.push(childModule);
    });
  }

  return graphArray;
};

/**
 * 根据模块依赖图生成代码
 * @param graph 模块依赖图
 * @returns 生成代码
 */
const bundle = (graph: Module[]) => {
  let moduleStr = "";

  graph.forEach((module) => {
    moduleStr += `
    ${module.id}: [
      function(require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ],
    `;
  });

  const result = `
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

    })({${moduleStr}})
  `;

  return result;
};

export const run = (filePath: string) => {
  const moduleGraph = createDependencyGraph(filePath);

  const result = bundle(moduleGraph);

  fs.writeFileSync("./bundle.js", result);
};
