'use strict';
// 参考： https://github.com/webpack/webpack/blob/master/schemas/WebpackOptions.json
//       https://github.com/wallstreetcn/webpack-and-spa-guide
const merge = require('webpack-merge');
const utils = require('./utils');
const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// 以下2行是为了做chunk缓存优化
const seen = new Set();
const nameLength = 4;

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: {
        app: [utils.resolve('src/main.js')]
    },
    output: {
        path: utils.resolve('dist'),
        publicPath: '/',
        filename: 'static/js/[name].bundle.[chunkhash:5].js',
        chunkFilename: 'static/js/[name].[chunkhash:5].js',
    },
    performance: {
        hints: 'warning'
    },
    optimization: {
        // 压缩优化相关
        minimizer: [
            // js mini
            new UglifyJsPlugin({
              cache: true, 
              parallel: true,
              sourceMap: true
            }),
            // css mini -- 压缩代码，删除无用注释，去除冗余css, 优化css书写顺序
            new OptimizeCSSPlugin({})
        ],
        // minimize: true, // 压缩优化

        // 持久化缓存  code-split
        runtimeChunk: true, // 将包含chunks 映射关系的 list单独从 app.js里提取出来mainfest   长缓存, 结合script-ext-html-webpack-plugin插件，内联到index.html中
        // 参考： https://www.jianshu.com/p/23dcabf35744
        // webpack.HashedModuleIdsPlugin  固定moduleId   lang-term-cache
        moduleIds: 'hashed', // natural、named、hashed、size、total-size 可选。原理类似于虚拟dom等更新策略，防止chunk中不必要的module更新
        
        // 分包策略 code-split  webpack.CommonsChunkPlugin
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10, 
                    chunks: 'all' // 只打包初始依赖的第三方包
                },
                elementUI: {
                    name: 'chunk-elementUI', // 单独打包ui库
                    priority: 20,  // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/
                },
                vued3tree: {
                    name: 'chunk-vued3tree', // 低频组件
                    priority: 30,  // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]vued3tree[\\/]/
                },
                common: {
                    name: 'chunk-common',
                    test: /[\\/]src[\\/](api|components|store|utils)[\\/]/,
                    minChunks: 5, // 最小公用次数
                    reuseExistingChunk: true, // 如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
                    priority: 5
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
        new SpeedMeasureWebpackPlugin(), // 测试打包各个阶段的耗时
        // 给每一个chunk制定 缓存策略，类似vue的虚拟dom的缓存优化策略
        // 自定义 nameResolver   lang-term-cache
        // NamedChunkPlugin  固定chunkId    
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }
            const modules = Array.from(chunk.modulesIterable);
            if (modules.length > 1) {
                const hash = require("hash-sum");
                const joinedHash = hash(modules.map(m => m.id).join("_"));
                let len = nameLength;
                while (seen.has(joinedHash.substr(0, len))) len++;
                seen.add(joinedHash.substr(0, len));
                return `chunk-${joinedHash.substr(0, len)}`;
            } else {
                return modules[0].id;
            }
        }),
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        new ScriptExtHtmlWebpackPlugin({
            //`runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime.*\.js$/
        }),
        // 分离js 和 css, 代替 extract-text-webpack-plugin
        // 使用contenthash 代替 hash 是为了在修改js的时候，不影响css,不至于让缓存失效
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].bundle.[contenthash: 5].css',
            chunkFilename: 'static/css/[name].chunk.[contenthash:5].css',
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
});