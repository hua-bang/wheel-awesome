import { Compiler } from "../../../core/compiler";
import Plugin from "../../../plugin";
import DevServer, { DevServerOptions } from "./core";

class DevServerPlugin implements Plugin {
  private devServerInstance: DevServer;

  constructor(options: DevServerOptions) {
    this.devServerInstance = new DevServer(options);
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterRun.tap("DevServerPlugin", () => {
      this.devServerInstance.run();
    });
  }
}

export default DevServerPlugin;
