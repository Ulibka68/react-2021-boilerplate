const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      types: path.resolve(__dirname, "src/types"),
      components: path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // filename: "./index.js",
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      // CSS, PostCSS, Sass
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 2 },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|ts)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"), // шаблон
      filename: "index.html", // название выходного файла
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
