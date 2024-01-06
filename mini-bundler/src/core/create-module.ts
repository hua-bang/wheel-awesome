import * as fs from "fs";
import * as path from "path";
import * as parser from "@babel/parser";
import * as BabelType from "@babel/types";
import { transformFromAstSync, traverse } from "@babel/core";
import { Module } from "../typings";
import { Loader, applyLoaders } from "../loader";
import { resolveModule } from "./resolve-module";

export function createModule(
  filePath: string,
  loaderMap?: Record<string, Loader[]>
): Module {
  const realFilePath = resolveModule(filePath);

  const fileExtension = path.extname(realFilePath);
  let content = fs.readFileSync(realFilePath, "utf-8") || "";

  const dependencies: string[] = [];

  const mapping: Record<string, string> = {};

  if (loaderMap?.[fileExtension]) {
    content = applyLoaders(content, realFilePath, loaderMap);
  }

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
      if (node.callee.type === "Identifier" && node.callee.name === "require") {
        if (BabelType.isStringLiteral(node.arguments[0])) {
          dependencies.push(node.arguments[0].value);
        }
      }
    },
  });

  dependencies.forEach((dependency) => {
    const dependencyPath = isRelativeOrAbsolutePath(dependency)
      ? path.resolve(filePath, "..", dependency)
      : dependency;

    const absoluteDependencyPath = resolveModule(dependencyPath);
    mapping[dependency] = absoluteDependencyPath;
  });

  return {
    id: path.resolve(realFilePath),
    filePath,
    content,
    dependencies,
    mapping,
  };
}

/**
 * 判断路径是否是相对路径或绝对路径
 * @param path 传入的路径
 * @returns { boolean } 返回是否是相对路径或绝对路径
 */
export function isRelativeOrAbsolutePath(path: string): boolean {
  return (
    path.startsWith("./") || path.startsWith("../") || path.startsWith("/")
  );
}
