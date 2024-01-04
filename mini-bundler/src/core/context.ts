import { Loader } from "../loader";
import Plugin from "../plugin";
import { CompilerOptions } from "./compiler";

class Context {
  options: CompilerOptions;
  loaders: Record<string, Loader[]>;
  plugins: Plugin[];

  constructor(options: CompilerOptions) {
    this.options = options;
    this.loaders = options.loaders || {};
    this.plugins = options.plugins || [];
  }
}

export default Context;
