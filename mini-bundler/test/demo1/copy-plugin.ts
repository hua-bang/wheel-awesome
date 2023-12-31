import * as fs from 'fs';
import { Compiler } from "../../src/compiler";
import Plugin from "../../src/plugin";

interface CopyPluginOptions {
  output: string;
}

class CopyPlugin implements Plugin {

  options: CopyPluginOptions;

  constructor(options: CopyPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterRun.tap('LoggerPlugin', () => {
      const { output } = this.options;
      if (compiler.output) {
        console.log(`copy file begin: output path is ${output}`);
        fs.writeFileSync(this.options.output, compiler.output);
        console.log(`copy file finished.`);
      } 
    });
  }
}

export default CopyPlugin;