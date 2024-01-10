import { Compiler } from "../../../core/compiler";
import Plugin from "../../../plugin";
import { runHMR } from "./core";

class HMRPlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.afterRun.tap("HMRPlugin", () => {
      runHMR(
        {
          entry: compiler.context.options.entry,
        },
        compiler.context
      );
    });
  }
}

export default HMRPlugin;
