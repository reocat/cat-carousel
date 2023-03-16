  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  const CompressionPlugin = require('compression-webpack-plugin');
  const zlib = require("zlib");
  const TerserPlugin = require('terser-webpack-plugin');

  module.exports = {
    entry: {
      main:'./src/js/index.js',
      vanilla:'./src/js/vanilla.js',
      jquery:'./src/js/jq.js'
    },
    plugins: [
     new MiniCssExtractPlugin(),
     new HtmlWebpackPlugin({
       template: './src/index.html',
       minify: {
         collapseWhitespace: true,
         removeComments: true,
         removeRedundantAttributes: true,
         removeScriptTypeAttributes: true,
         removeStyleLinkTypeAttributes: true,
         useShortDoctype: true
       }
     }),
     new CompressionPlugin({
       filename: "[path][base].br",
       algorithm: "brotliCompress",
       test: /\.(js|css|html|svg)$/,
       compressionOptions: {
         params: {
           [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
         },
       },
       threshold: 10240,
       minRatio: 0.8,
       deleteOriginalAssets: false,
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
        new TerserPlugin({
         parallel: true,
        }),
     ],
       minimize: true,
    },
  mode: 'development',
};




