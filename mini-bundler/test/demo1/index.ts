import { run } from "../../src/index";
import * as path from "path";
import LoggerPlugin from "./logger-plugin";
import CopyPlugin from "./copy-plugin";

const filePath = path.resolve(__dirname, "./code/index.js");

const outputPath = path.resolve(__dirname, "./output/bundle.js");

run({
  entry: filePath,
  output: outputPath,
  plugins: [new LoggerPlugin(), new CopyPlugin({ output: path.resolve(__dirname, "./output/copy.js") })]
});
