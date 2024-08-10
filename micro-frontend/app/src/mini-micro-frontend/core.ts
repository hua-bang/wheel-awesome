import MiniMicroFrontendApp from "./instance";
import Loader from "./loader";
import {
  MiniMicroFrontendAppConfig,
  MiniMicroFrontendRunOptions,
} from "./typings";

class MiniMicroFrontend {
  status: "started" | "stopped" = "stopped";
  loader: Loader = new Loader();
  options: MiniMicroFrontendRunOptions = {};
  activeApp: MiniMicroFrontendApp | null = null;

  run(userOptions?: MiniMicroFrontendRunOptions) {
    this.options = userOptions || {};
    this.status = "started";
  }

  async load(app: MiniMicroFrontendAppConfig) {
    const { sourceCode } = await this.loader.loadApp(app);
    const appInstance = new MiniMicroFrontendApp(app, sourceCode, this.options);
    return appInstance;
  }
}

const miniMicroFrontend = new MiniMicroFrontend();

export default miniMicroFrontend;
