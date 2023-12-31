import { run } from "../../src/index";
import * as path from "path";
import LoggerPlugin from "./logger-plugin";

const filePath = path.resolve(__dirname, "./code/index.js");

const outputPath = path.resolve(__dirname, "./output/bundle.js");

run({
  entry: filePath,
  output: outputPath,
  plugins: [new LoggerPlugin()]
});
