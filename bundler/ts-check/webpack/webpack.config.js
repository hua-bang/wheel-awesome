const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      // ts-loader
      // {
      //   test: /\.tsx?$/,
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      // babel-loader
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },

      // swc-loader
      // {
      //   test: /\.tsx?$/,
      //   use: {
      //     loader: "swc-loader",
      //     options: {
      //       jsc: {
      //         parser: {
      //           syntax: "typescript",
      //           tsx: true,
      //         },
      //         target: "es5",
      //       },
      //     },
      //   },
      //   exclude: /node_modules/,
      // },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
