import { MiniMicroFrontendAppConfig } from "../typings";
import { AppLoaderInfo } from "./typings";
export * from "./typings";

class Loader {
  appMap: WeakMap<MiniMicroFrontendAppConfig, AppLoaderInfo> = new WeakMap();

  async loadApp(app: MiniMicroFrontendAppConfig) {
    if (this.appMap.has(app)) {
      return this.appMap.get(app) as AppLoaderInfo;
    }

    const sourceCode = await (await fetch(app.entry)).text();
    const appLoaderInfo: AppLoaderInfo = {
      sourceCode,
    };
    this.appMap.set(app, appLoaderInfo);

    return appLoaderInfo;
  }
}

export default Loader;
