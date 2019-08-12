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
        host: 'localhost',
        port: 8888,
        hot: true,
        contentBase: utils.resolve('dist'),
        compress: true,
        proxy: {
            '/rms/api': {   
                // target: 'http://crm.weizhipin.com/',
                target: 'http://39.100.134.212:8081/rms/api',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/rms/api': '/' }
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
