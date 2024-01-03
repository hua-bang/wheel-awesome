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
    const absoluteDependencyPath = resolveModule(
      path.resolve(filePath, "..", dependency)
    );
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
