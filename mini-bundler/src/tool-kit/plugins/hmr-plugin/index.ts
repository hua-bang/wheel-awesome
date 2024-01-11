import { Compiler } from "../../../core/compiler";
import Plugin from "../../../plugin";
import { runHMR } from "./core";
import { InjectCode } from "./inject";

class HMRPlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.afterRun.tap("HMRPlugin", () => {
      runHMR(compiler.context);
    });

    compiler.hooks.createdDependencyGraph.tap("HMRPlugin", () => {
      const { dependencyGraph } = compiler;

      if (!dependencyGraph) {
        return;
      }

      dependencyGraph.forEach((node) => {
        if (node.id === compiler.context.options.entry) {
          node.content = `
            ${node.content}

            ${InjectCode}
          `;
        }
      });
    });
  }
}

export default HMRPlugin;
