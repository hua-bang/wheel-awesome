import MiniMicroFrontendApp from "./instance";
import Loader from "./loader";
import {
  MiniMicroFrontendAppConfig,
  MiniMicroFrontendAppInstance,
  MiniMicroFrontendRunOptions,
} from "./typings";

class MiniMicroFrontend {
  status: "started" | "stopped" = "stopped";
  loader: Loader = new Loader();
  options: MiniMicroFrontendRunOptions = {};

  run(userOptions?: MiniMicroFrontendRunOptions) {
    this.options = userOptions || {};
    this.status = "started";
  }

  async load(app: MiniMicroFrontendAppConfig) {
    const { sourceCode } = await this.loader.loadApp(app);
    const appInstance: MiniMicroFrontendAppInstance = new MiniMicroFrontendApp(
      app,
      sourceCode
    );

    return appInstance;
  }
}

const miniMicroFrontend = new MiniMicroFrontend();

export default miniMicroFrontend;
