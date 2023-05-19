const path = require('path');

const FontPreloadPlugin = require("webpack-font-preload-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/js/main.js',
        config: './src/js/config.js',
        index: './src/js/index.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        }),
//        new FontPreloadPlugin({
//            index: "index.html",
//            extensions: ["ttf", "off"],
//            loadType: "preload",
//        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'config.html',
            template: 'src/config.html',
        }),
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
					name: "commons",
					chunks: "initial",
					minChunks: 2,
					minSize: 0
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
