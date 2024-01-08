import * as path from "path";
import { cssLoader } from "../../src/tool-kit/loaders/css-loader";
import { tsLoader } from "../../src/tool-kit/loaders/ts-loader";
import LoggerPlugin from "../../src/tool-kit/plugins/logger-plugin";
import CopyPlugin from "../../src/tool-kit/plugins/copy-plugin";
import { run } from "../../src";

const filePath = path.resolve(__dirname, "./code/index.js");

const outputPath = path.resolve(__dirname, "./dist/bundle.js");

run({
  entry: filePath,
  output: outputPath,
  loaders: {
    ".css": [cssLoader],
    ".ts": [tsLoader],
  },
  plugins: [
    new LoggerPlugin(),
    new CopyPlugin({ output: path.resolve(__dirname, "./dist/copy.js") }),
  ],
});
