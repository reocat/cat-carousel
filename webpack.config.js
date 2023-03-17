  const FontPreloadPlugin = require("webpack-font-preload-plugin");
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  const TerserPlugin = require('terser-webpack-plugin');

  module.exports = {
    entry: {
      main:'./src/js/index.js',
      vanilla:'./src/js/vanilla.js',
      jquery:'./src/js/jq.js'
    },
    plugins: [
     new FontPreloadPlugin({
       extensions: ["woff", "ttf", "eot"],
       loadType: "preload",
     }),
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
   ],
    output: {
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
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
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        }, 
      },
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




