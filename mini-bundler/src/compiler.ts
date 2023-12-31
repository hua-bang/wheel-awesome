import * as fs from "fs";
import { DependencyGraph } from './typings';
import { bundle } from './bundle';
import { createDependencyGraph } from './create-dependency-graph';

export class Compiler {

  private options: CompilerOptions;
  private dependencyGraph: DependencyGraph;

  constructor(options: CompilerOptions) {
    this.options = options;

    const { entry } = this.options;

    this.dependencyGraph = createDependencyGraph(entry);
  }

  bundle() {
    const result = bundle(this.dependencyGraph);
    fs.writeFileSync(this.options.output, result);
  }

  run() {
    this.bundle();
  }
}

export interface CompilerOptions {
  entry: string;
  output: string;
};