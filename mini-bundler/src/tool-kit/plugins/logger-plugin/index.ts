import { Compiler } from "../../../core/compiler";
import Plugin from "../../../plugin";

class LoggerPlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.beforeRun.tap("LoggerPlugin", () => {
      console.log("The build is starting...");
    });
    compiler.hooks.afterRun.tap("LoggerPlugin", () => {
      console.log("The build is finished.");
    });
  }
}

export default LoggerPlugin;
