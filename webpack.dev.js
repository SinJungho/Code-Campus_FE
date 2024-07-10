const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // 추가된 부분
  },
  devtool: "inline-source-map", // Source Map 설정 추가
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
    open: true,
    historyApiFallback: true, // 추가된 부분
    hot: true, // HMR 활성화
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i, // CSS 로더 추가
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR 플러그인 추가
  ],
  stats: {
    children: true,
  },
};
