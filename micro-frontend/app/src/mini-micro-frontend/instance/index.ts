import { MiniMicroFrontendAppConfig } from "../typings";

class MiniMicroFrontendApp {
  private appConfig: MiniMicroFrontendAppConfig;
  private sourceCode: string;
  private providerRes: any;

  constructor(appConfig: MiniMicroFrontendAppConfig, sourceCode: string) {
    this.appConfig = appConfig;
    this.sourceCode = sourceCode;
  }

  mount() {
    const exports: Record<string, any> = {};

    // 使用 Function 构造器创建一个新的作用域来执行 UMD 代码
    const executionFunction = new Function(
      "exports",
      `
      ${this.sourceCode};
      return exports;
    `
    );

    const { provider } = executionFunction(exports) || {};
    this.providerRes = provider();
    this.providerRes?.render();
  }

  unmount() {}
}

export default MiniMicroFrontendApp;
