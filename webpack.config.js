const path = require('path');

const FontPreloadPlugin = require("webpack-font-preload-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

var webpack = require('webpack');
let htmlPageNames = ['index', 'config'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, 
    filename: `${name}.html`,
    chunks: [`${name}`] 
  })
});


module.exports = {
    entry: {
        index: './src/js/index.js',
        vanilla: './src/js/vanilla.js',
        jquery: './src/js/jq.js',
	shared: './src/js/shared.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
 		$: "jquery/dist/jquery.min.js",
 		jQuery: "jquery/dist/jquery.min.js",
 		"window.jQuery": "jquery/dist/jquery.min.js",
 		common: "./src/js/common.js", // Add this line
	}),
//        new FontPreloadPlugin({
//            index: "index.html",
//            extensions: ["ttf", "off"],
//            loadType: "preload",
//        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['vanilla', 'jquery', 'index'],
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'config.html',
            template: './src/config.html',
            chunks: ['config', 'index'],
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
  	library: 'Cookies',
 	libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /.s?css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        }, ],
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
