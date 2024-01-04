import { CompilerOptions } from "./compiler";

class Context {
  options: CompilerOptions;

  constructor(options: CompilerOptions) {
    this.options = options;
  }
}

export default Context;
