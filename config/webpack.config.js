/*
 * @Author: George Zhao
 * @Date: 2021-10-15 21:37:20
 * @LastEditors: George Zhao
 * @LastEditTime: 2021-10-26 21:51:12
 * @Description:
 * @Email: 2018221138@email.szu.edu.cn
 * @Company: SZU
 * @Version: 1.0
 */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

base_path = "./";

func_js = (pathData) => {
  return pathData.chunk.name === "index"
    ? "[name].bundle.[contenthash].js"
    : "[name]/[name].bundle.[contenthash].js";
};

module.exports = {
  name: "web_client",
  entry: {
    index: ["./src/js/index.js", "./src/scss/interface.scss"],
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: func_js,
    publicPath: base_path,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  mode: "production",
  devServer: {
    open: true,
    static: "./dist",
    compress: true,
    port: 18080,
    allowedHosts: "all",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 18081 }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "assets",
          globOptions: {
            // dot: true,
            // gitignore: true,
            ignore: ["**/src/assets/js/**", "**/src/assets/css/**"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      base: base_path,
      filename: "index.html",
      template: "src/templates/index.html",
      inject: "body",
      chunks: ["index"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false, // leaflet uses relative paths
              // minimize: false,
              // modules: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false, // leaflet uses relative paths
              // minimize: false,
              // modules: false,
            },
          },
        ],
      },
    ],
  },
};
