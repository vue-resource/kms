'use strict';

const merge = require('webpack-merge');
const utils = require('./utils');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: {
        app: ['@babel/polyfill', utils.resolve('src/main.js')]
    },
    output: {
        path: utils.resolve('dist'),
        publicPath: '/',
        filename: 'static/js/[name].bundle.[hash:5].js',
        chunkFilename: 'static/js/[name].chunk.[chunkhash:5]js'
    },
    optimization: {
        minimizer: [
            // js mini
            new UglifyJsPlugin({
              cache: false,
              parallel: false,
              sourceMap: false
            }),
            // css mini
            new OptimizeCSSPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 100,
            cacheGroups: {
                default: false,
                common: {
                    name: "common",
                    minChunks: 2,
                    priority: -20,
                    chunks: "all"
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -10
                }
            }
        }
    },
    module: {
        rules: [
            ...utils.styleLoader({
                sourceMap: true,
                extract: true,
                usePostCSS: false
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
});