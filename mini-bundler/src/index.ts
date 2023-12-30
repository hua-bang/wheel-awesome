import * as fs from "fs";
import * as path from "path";
import * as parser from "@babel/parser";
import * as BabelType from "@babel/types";
import traverse from "@babel/traverse";

interface Module {
  id: string;
  filePath: string;
  content: string;
  dependencies: string[];
}

type DependencyGraph = Map<string, Module>;

function createModule(filePath: string): Module {
  const fileExtension = path.extname(filePath);
  let content = "";

  const dependencies: string[] = [];

  if (fileExtension === ".js") {
    content = fs.readFileSync(filePath, "utf-8");
    const ast = parser.parse(content, {
      sourceType: "module",
    });

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

const filePath = path.resolve(__dirname, "./index.js");

const graph = createDependencyGraph(filePath);

console.log(graph);
