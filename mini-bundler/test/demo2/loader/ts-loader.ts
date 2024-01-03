import * as ts from "typescript";
import * as babel from "@babel/core";
import { Loader } from "../../../src/loader";

export const tsLoader: Loader = (content, filePath) => {
  // 使用 TypeScript 编译器 API 编译代码
  const transpiled = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.ES2015,
      target: ts.ScriptTarget.ES5,
    },
  });
  return transpiled.outputText;
};

export const tsLoaderUserBabel: Loader = (content, filePath) => {
  const res = babel.transformSync(content, {
    // Babel 配置，您可以在这里指定预设、插件等
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    filename: filePath,
  });

  return res?.code || "";
};

export const getTSLoader = (options: TsLoaderOptions) => {
  return options.useBabel ? tsLoaderUserBabel : tsLoader;
};

interface TsLoaderOptions {
  useBabel?: boolean;
}
