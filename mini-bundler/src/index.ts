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

const filePath = path.resolve(__dirname, "./index.js");

const currModule = createModule(filePath);

console.log(currModule);
