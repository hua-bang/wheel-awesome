import * as fs from "fs";
import * as path from "path";
import * as parser from "@babel/parser";
import * as BabelType from "@babel/types";
import { transformFromAstSync, traverse } from "@babel/core";

interface Module {
  id: string;
  filePath: string;
  content: string;
  dependencies: string[];
  mapping?: Record<string, string>;
}

type DependencyGraph = Map<string, Module>;

function createModule(filePath: string): Module {
  const fileExtension = path.extname(filePath);
  let content = "";

  const dependencies: string[] = [];

  const mapping: Record<string, string> = {};

  if (fileExtension === ".js") {
    content = fs.readFileSync(filePath, "utf-8");
    const ast = parser.parse(content, {
      sourceType: "module",
    });

    const { code } =
      transformFromAstSync(ast, content, {
        presets: ["@babel/preset-env"],
      }) || {};

    content = code || content;

    traverse(ast, {
      ImportDeclaration({ node }) {
        dependencies.push(node.source.value);
      },
      CallExpression({ node }) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require"
        ) {
          if (BabelType.isStringLiteral(node.arguments[0])) {
            dependencies.push(node.arguments[0].value);
          }
        }
      },
    });

    dependencies.forEach((dependency) => {
      const absoluteDependencyPath = path.resolve(filePath, "..", dependency);
      mapping[dependency] = absoluteDependencyPath;
    });
  } else if (fileExtension === ".json") {
    // 直接读取JSON文件并转换为JavaScript对象
    const jsonContent = fs.readFileSync(filePath, "utf-8");
    content = `module.exports = ${jsonContent}`;
  }

  return {
    id: path.resolve(filePath),
    filePath,
    content,
    dependencies,
    mapping,
  };
}

/**
 * 创建依赖关系图。
 * 此函数根据入口文件路径构建项目的依赖关系图。它递归地遍历每个模块的依赖项，
 * 并将它们添加到依赖关系图中，这个图是一个映射，键为模块ID，值为模块对象。
 *
 * @param {string} entry - 入口文件的路径。
 * @returns {DependencyGraph} - 表示依赖关系的图，这是一个映射，其中键是模块ID，值是模块对象。
 */
const createDependencyGraph = (entry: string): DependencyGraph => {
  const entryModule = createModule(entry);

  const graph: DependencyGraph = new Map<string, Module>();

  const explore = (module: Module) => {
    if (graph.has(module.id)) {
      return;
    }

    graph.set(module.id, module);

    module.dependencies.forEach((dependencyPath) => {
      const absoluteDependencyPath = path.resolve(
        module.filePath,
        "..",
        dependencyPath
      );
      const dependencyModule = createModule(absoluteDependencyPath);
      explore(dependencyModule);
    });
  };

  explore(entryModule);
  return graph;
};

/**
 * 打包依赖关系图为单一字符串。
 * 此函数接收一个依赖关系图，将其转换为一个包含所有模块和它们依赖的单一字符串。
 * 字符串的格式允许它被执行并作为模块系统使用，其中每个模块都被封装在一个函数中，
 * 并且有一个映射来表示其依赖关系。
 *
 * @param {DependencyGraph} graph - 依赖关系图，包含项目中所有模块的信息。
 * @returns {string} - 一个字符串，包含所有模块及其依赖，可以被执行以模拟模块系统。
 */
const bundle = (graph: DependencyGraph): string => {
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

const run = () => {
  const filePath = path.resolve(__dirname, "./index.js");

  const graph = createDependencyGraph(filePath);
  const result = bundle(graph);

  const outputPath = path.resolve(__dirname, "./output/bundle.js");
  fs.writeFileSync(outputPath, result);
};

run();
