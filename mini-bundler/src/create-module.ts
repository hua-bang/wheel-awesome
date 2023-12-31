import * as fs from "fs";
import * as path from "path";
import * as parser from "@babel/parser";
import * as BabelType from "@babel/types";
import { transformFromAstSync, traverse } from "@babel/core";
import { Module } from "./typings";
import { Loader, applyLoaders } from "./loader";

export function createModule(filePath: string, loaderMap?: Record<string, Loader[]>): Module {
  const fileExtension = path.extname(filePath);
  let content = "";
  let hasApplyLoaders = false;

  const dependencies: string[] = [];

  const mapping: Record<string, string> = {};

  if(loaderMap?.[fileExtension]) {
    content = applyLoaders(content, filePath, loaderMap);
    hasApplyLoaders = true;
  }

  if (fileExtension === ".js" || hasApplyLoaders) {
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
