'use strict'

const path = require('path')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = {
	resolve: function (dir) {
		return path.join(__dirname, '..', dir)
	},
	assetsPath: function (_path) {
		const assetsSubDirectory = 'static'
		return path.posix.join(assetsSubDirectory, _path)
	},
	cssLoaders: function(option) {
		option = option || {}
		var cssloader = {
			loader: 'css-loader',
			options: {
				sourceMap: option.sourceMap
			}
		}
		var postcssLoader = {
			loader: 'postcss-loader',
			options: {
				sourceMap: option.sourceMap
			}
		}
		var generatorLoader = function (loadername, opt) {
			var loaders = option.usePostCSS ? [cssloader, postcssLoader] : [cssloader]
			if(loadername){
				loaders.push({
					loader: loadername + '-loader',
					options: Object.assign({}, opt, {
						sourceMap: option.sourceMap
					})
				})
			}
			// Extract CSS when that option is specified
			// (which is the case during production build)
			if(option.extract){
				let extractLoader = {
					loader: MiniCssExtractPlugin.loader
				}
				return [extractLoader].concat(loaders)
			} else {
				// 由于使用vue开发，使用此loader;其它情况使用style-loader
				return ['vue-style-loader'].concat(loaders)
			}
		}
		return {
			css: generatorLoader(),
			postcss: generatorLoader(),
			less: generatorLoader('less'),
			sass: generatorLoader('sass', { indentedSyntax: true }),
			scss: generatorLoader('sass'),
			stylus: generatorLoader('stylus'),
			styl: generatorLoader('stylus')
		}
	},
	styleLoader: function (option) {
		var output = []
		var loaders = this.cssLoaders(option)
		for(let key in loaders){
			output.push({
				test: new RegExp('\\.'+key+'$'),
				use: loaders[key]
			})
		}
		return output
	}
}
