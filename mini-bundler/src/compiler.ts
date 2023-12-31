import * as fs from "fs";
import { DependencyGraph } from './typings';
import { bundle } from './bundle';
import { createDependencyGraph } from './create-dependency-graph';
import Hook from "./hook";
import Plugin from "./plugin";
import { Stats } from "./stats";

export class Compiler {

  hooks = {
    beforeRun: new Hook(),
    afterRun: new Hook(),
  };

  private options: CompilerOptions;
  private dependencyGraph: DependencyGraph;
  private plugins: Plugin[];

  public stats: Stats = new Stats();

  constructor(options: CompilerOptions) {
    this.plugins = options.plugins || [];
    this.plugins.forEach(plugin => plugin.apply(this));

    this.options = options;

    const { entry } = this.options;

    this.dependencyGraph = createDependencyGraph(entry);
  }

  bundle() {
    const result = bundle(this.dependencyGraph);
    this.stats.setOutput(result);
    fs.writeFileSync(this.options.output, result);
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
};