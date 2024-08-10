export interface MiniMicroFrontendAppConfig {
  name: string;
  entry: string;
  activeWhen?: string;
}

export interface MiniMicroFrontendRunOptions {
  /** 主应用的路由 */
  basename?: string;
  /** 子应用容器的dom */
  domGetter?: string;
}

export interface MiniMicroFrontendAppInstance {
  /** 挂载 */
  mount: () => void;
  /** 卸载 */
  unmount: () => void;
}
