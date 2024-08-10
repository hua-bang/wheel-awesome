import {
  MiniMicroFrontendAppConfig,
  MiniMicroFrontendRunOptions,
} from "../typings";

class MiniMicroFrontendApp {
  private appConfig: MiniMicroFrontendAppConfig;
  private config: MiniMicroFrontendRunOptions;
  private sourceCode: string;
  private providerRes: any;

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
    const exports: Record<string, any> = {};

    const source = this.sourceCode;

    debugger;
    // 使用 Function 构造器创建一个新的作用域来执行 UMD 代码
    const executionFunction = new Function(
      "exports",
      `
      ${source};
      return exports;
    `
    );

    const { provider } = executionFunction(exports) || {};
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
