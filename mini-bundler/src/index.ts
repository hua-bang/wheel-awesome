import { Compiler, CompilerOptions } from "./core/compiler";
import DevServerPlugin from "./tool-kit/plugins/dev-server-plugin";
import { DevServerOptions } from "./tool-kit/plugins/dev-server-plugin/core";
import HMRPlugin from "./tool-kit/plugins/hmr-plugin";

const normalizeOptions = (options: RunOptions) => {
  const { devServer, plugins = [] } = options;

  if (devServer) {
    plugins.push(new DevServerPlugin(devServer));
  }

  if (devServer?.hot) {
    plugins.push(new HMRPlugin());
  }

  return options;
};

export const run = (option: RunOptions) => {
  const finalOptions = normalizeOptions(option);
  const compiler = new Compiler(finalOptions);
  compiler.run();
};

interface RunOptions extends CompilerOptions {
  devServer?: DevServerOptions;
}
