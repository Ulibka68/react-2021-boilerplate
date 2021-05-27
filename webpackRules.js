module.exports = [
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
  // CSS, PostCSS, Sass
  {
    test: /\.(scss|css)$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
  },
];
