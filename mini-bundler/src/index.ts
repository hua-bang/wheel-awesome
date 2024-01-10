import { Compiler, CompilerOptions } from "./core/compiler";
import HMRPlugin from "./tool-kit/plugins/hmr-plugin";

const normalizeOptions = (options: CompilerOptions) => {
  const { devServer, plugins = [] } = options;

  if (devServer && devServer.hot) {
    plugins.push(new HMRPlugin());
  }

  return options;
};

export const run = (compilerOptions: CompilerOptions) => {
  const finalOptions = normalizeOptions(compilerOptions);
  const compiler = new Compiler(finalOptions);
  compiler.run();
};
