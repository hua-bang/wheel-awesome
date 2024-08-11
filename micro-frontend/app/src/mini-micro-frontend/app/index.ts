import Sandbox from "../sandbox";
import {
  MiniMicroFrontendAppConfig,
  MiniMicroFrontendRunOptions,
} from "../typings";

class MiniMicroFrontendApp {
  private appConfig: MiniMicroFrontendAppConfig;
  private config: MiniMicroFrontendRunOptions;
  private sourceCode: string;
  private providerRes: any;
  private sandbox: Sandbox = new Sandbox();

  constructor(
    appConfig: MiniMicroFrontendAppConfig,
    sourceCode: string,
    config: MiniMicroFrontendRunOptions
  ) {
    this.appConfig = appConfig;
    this.sourceCode = sourceCode;
    this.config = config;
  }

  mount() {
    const source = this.sourceCode;

    const { provider } = this.sandbox.run(source);
    this.providerRes = provider();
    this.providerRes?.render({
      dom: document.querySelector(this.config.domGetter!),
    });
  }

  unmount() {
    this.providerRes?.destroy({
      dom: document.querySelector(this.config.domGetter!),
    });
  }
}

export default MiniMicroFrontendApp;
