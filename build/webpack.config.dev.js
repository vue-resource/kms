'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const utils = require('./utils');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        stats:'minimal',
        quiet:false,
        historyApiFallback: true,
        noInfo: true,
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        contentBase: utils.resolve('dist'),
        compress: true,
        proxy: {
            '/api': {
                // target: 'http://crm.weizhipin.com/',
                target: 'http://localhost:2000',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api': '/' }
            }
        }
    },
    devtool: '#eval-source-map',
    entry: {
        app: utils.resolve('src/main.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            ...utils.styleLoader({ sourceMap: true, usePostCSS: false})
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
