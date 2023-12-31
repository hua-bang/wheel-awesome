import { Compiler, CompilerOptions } from "./compiler";

export const run = (compilerOptions: CompilerOptions) => {
  const compiler = new Compiler(compilerOptions);
  compiler.run();
};
