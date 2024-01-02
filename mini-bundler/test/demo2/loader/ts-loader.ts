import * as ts from "typescript";
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
