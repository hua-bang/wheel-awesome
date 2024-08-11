import MiniMicroFrontendApp from "./app";
import { LifeCyclePluginOptions, getLifeCyclePlugin } from "./built-in";
import PluginSystem from "./hooks/pluginSystem";
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
  hooks: PluginSystem = new PluginSystem();

  run(userOptions?: MiniMicroFrontendRunOptions & LifeCyclePluginOptions) {
    this.options = userOptions || {};
    this.hooks.usePlugin(getLifeCyclePlugin(userOptions || {}));
    this.status = "started";
    this.hooks.lifeCycle.bootstrap.emit(this.options);
  }

  async load(app: MiniMicroFrontendAppConfig) {
    this.hooks.lifeCycle.beforeLoad.emit(app);
    const { sourceCode } = await this.loader.loadApp(app);
    const appInstance = new MiniMicroFrontendApp(app, sourceCode, this.options);
    this.hooks.lifeCycle.afterLoad.emit(app);
    return appInstance;
  }
}

const miniMicroFrontend = new MiniMicroFrontend();

export default miniMicroFrontend;
