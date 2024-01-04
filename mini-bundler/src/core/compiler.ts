import * as fs from "fs";
import { DependencyGraph } from "../typings";
import { bundle } from "./bundle";
import { createDependencyGraph } from "./create-dependency-graph";
import Hook from "./hook";
import Plugin from "../plugin";
import { Stats } from "./stats";
import { Loader } from "../loader";
import Context from "./context";

export class Compiler {
  hooks = {
    beforeRun: new Hook(),
    afterRun: new Hook(),
  };

  private context: Context;
  private dependencyGraph: DependencyGraph;

  public stats: Stats = new Stats();

  constructor(options: CompilerOptions) {
    this.context = new Context(options);
    this.context.plugins.forEach((plugin) => plugin.apply(this));

    const { entry } = this.context.options;

    this.dependencyGraph = createDependencyGraph(entry, this.context.loaders);
  }

  bundle() {
    const result = bundle(this.dependencyGraph);
    this.stats.setOutput(result);
    fs.writeFileSync(this.context.options.output, result);
  }

  run() {
    this.hooks.beforeRun.call();
    this.bundle();
    this.hooks.afterRun.call();
  }
}

export interface CompilerOptions {
  entry: string;
  output: string;
  plugins?: Plugin[];
  loaders?: Record<string, Loader[]>;
}
