import { Loader } from "../loader";
import Plugin from "../plugin";
import { Compiler, CompilerOptions } from "./compiler";

class Context {
  options: CompilerOptions;
  loaders: Record<string, Loader[]>;
  plugins: Plugin[];
  compiler: Compiler;

  constructor(options: CompilerOptions, compiler: Compiler) {
    this.options = options;
    this.loaders = options.loaders || {};
    this.plugins = options.plugins || [];
    this.compiler = compiler;
  }
}

export default Context;
