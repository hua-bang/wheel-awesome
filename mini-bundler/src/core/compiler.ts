import * as fs from "fs";
import { DependencyGraph } from "../typings";
import { bundle } from "./bundle";
import { createDependencyGraph } from "./create-dependency-graph";
import Hook from "./hook";
import Plugin from "../plugin";
import { Stats } from "./stats";
import { Loader } from "../loader";
import Context from "./context";
import DevServer, { DevServerOptions } from "./devServer";

export class Compiler {
  hooks = {
    beforeRun: new Hook(),
    afterRun: new Hook(),
  };

  private context: Context;
  private dependencyGraph: DependencyGraph | undefined;

  public stats: Stats = new Stats();

  private devServer: DevServer | undefined;

  constructor(options: CompilerOptions) {
    // create context
    this.context = new Context(options);
    // register plugins
    this.context.plugins.forEach((plugin) => plugin.apply(this));
    // register devServer
    if (options.devServer && options.devServer) {
      this.devServer = new DevServer(options.devServer);
    }
  }

  bundle() {
    const { entry } = this.context.options;
    this.dependencyGraph = createDependencyGraph(entry, this.context.loaders);
    const result = bundle(this.dependencyGraph);
    this.stats.setOutput(result, this.context.options.output);
    fs.writeFileSync(this.context.options.output, result);
  }

  run() {
    this.hooks.beforeRun.call();
    this.bundle();
    if (this.devServer) {
      this.devServer.run();
    }
    this.hooks.afterRun.call();
  }
}

export interface CompilerOptions {
  entry: string;
  output: string;
  plugins?: Plugin[];
  loaders?: Record<string, Loader[]>;
  devServer?: DevServerOptions;
}
