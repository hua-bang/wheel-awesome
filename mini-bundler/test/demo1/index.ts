import { run } from "../../src/index";
import * as path from "path";
import LoggerPlugin from "./logger-plugin";
import CopyPlugin from "./copy-plugin";
import { cssLoader } from "./css-loader";

const filePath = path.resolve(__dirname, "./code/index.js");

const outputPath = path.resolve(__dirname, "./output/bundle.js");

run({
  entry: filePath,
  output: outputPath,
  loaders: {
    '.css': [cssLoader]
  },
  plugins: [new LoggerPlugin(), new CopyPlugin({ output: path.resolve(__dirname, "./output/copy.js") })]
});
