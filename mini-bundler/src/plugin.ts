import { Compiler } from "./compiler";

interface Plugin {
  apply(compiler: Compiler): void;
}

export default Plugin;