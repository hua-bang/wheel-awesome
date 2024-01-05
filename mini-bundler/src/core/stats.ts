export class Stats {
  output: string | undefined;

  outputPath: string | undefined;

  setOutput(output: string, outputPath: string) {
    this.output = output;
    this.outputPath = outputPath;
  }
}
