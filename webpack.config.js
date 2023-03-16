  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


  module.exports = {
    entry: {
      main:'./src/js/index.js',
      vanilla:'./src/js/vanilla.js',
      jquery:'./src/js/jq.js'
    },
    plugins: [
     new MiniCssExtractPlugin(),
     new HtmlWebpackPlugin({
       title: 'Caching',
       template: path.resolve(__dirname, "src", "index.html")
      }),
    ],
    output: {
     filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
     rules: [
       {
         test: /.s?css$/,
         use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
       },
     ],
    },
    optimization: {
     minimizer: [
           new CssMinimizerPlugin(),
	],
       minimize: true,
    },
  mode: 'development',
};
