const MinimalSourceMapMismatchPlugin = require("./plugin/minimal-source-map-mismatc-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  plugins: [new MinimalSourceMapMismatchPlugin()],
};
