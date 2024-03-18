const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    hot: true
  }
};