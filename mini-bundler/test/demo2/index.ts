import { run } from "../../src/index";
import * as path from "path";
import HtmlPlugin from "../../src/tool-kit/plugins/html-plugin";
import CopyPlugin from "../../src/tool-kit/plugins/copy-plugin";
import LoggerPlugin from "../../src/tool-kit/plugins/logger-plugin";
import { getTSLoader } from "../../src/tool-kit/loaders/ts-loader";
import { cssLoader } from "../../src/tool-kit/loaders/css-loader";

const tsLoader = getTSLoader({ useBabel: true });

const filePath = path.resolve(__dirname, "./code/index.tsx");

const outputPath = path.resolve(__dirname, "./output/bundle.js");

run({
  entry: filePath,
  output: outputPath,
  loaders: {
    ".css": [cssLoader],
    ".tsx": [tsLoader],
    ".ts": [tsLoader],
  },
  plugins: [
    new LoggerPlugin(),
    new CopyPlugin({ output: path.resolve(__dirname, "./output/copy.js") }),
    new HtmlPlugin(),
  ],
});
