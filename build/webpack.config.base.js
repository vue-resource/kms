'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const utils = require('./utils');

module.exports = {
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': utils.resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                    options: {
                      // 可以使 / 开头的文件相对于 root 目录解析。
                      // 那么，<img src="/favicon.png"> 就能顺利指向到 src 目录下的 favicon.png 文件，不需要关心当前文件和目标文件的相对路径
                      // root: utils.resolve('src'), 
                      
                      /*
                      html-loader 接受 attrs 参数，表示什么标签的什么属性需要调用 webpack 的 loader 进行打包。
                      比如 <img> 标签的 src 属性，webpack 会把 <img> 引用的图片打包，然后 src 的属性值替换为打包后的路径。
                      使用什么 loader 代码，同样是在 module.rules 定义中使用匹配的规则。
                        
                      如果 html-loader 不指定 attrs 参数，默认值是 img:src, 意味着会默认打包 <img> 标签的图片。
                      这里我们加上 <link> 标签的 href 属性，用来打包入口 index.html 引入的 favicon.png 文件。
                      */
                      attrs: ['img:src', 'link:href']
                    }
                  }
                ]
            },
            // {
            //     test: /\.(js|vue)$/,
            //     use: 'eslint-loader',
            //     exclude: /node_modules/,
            //     enforce: 'pre'
            // },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif|bmp|webp|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: utils.assetsPath('images/[name].[ext]')
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: utils.assetsPath('media/[name].[ext]')
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: utils.assetsPath('fonts/[name].[ext]')
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils.resolve('index.html'),
            inject: true
        }),
        new VueLoaderPlugin()
    ]
}
