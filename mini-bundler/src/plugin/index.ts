import { Compiler } from "../core/compiler";

interface Plugin {
  apply(compiler: Compiler): void;
}

export default Plugin;
