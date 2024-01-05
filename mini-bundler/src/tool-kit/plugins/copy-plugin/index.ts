import * as fs from "fs";
import Plugin from "../../../plugin";
import { Compiler } from "../../../core/compiler";

interface CopyPluginOptions {
  output: string;
}

class CopyPlugin implements Plugin {
  options: CopyPluginOptions;

  constructor(options: CopyPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterRun.tap("LoggerPlugin", () => {
      const { output } = this.options;
      if (compiler.stats.output) {
        console.log(`copy file begin: output path is ${output}`);
        fs.writeFileSync(this.options.output, compiler.stats.output);
        console.log(`copy file finished.`);
      }
    });
  }
}

export default CopyPlugin;
