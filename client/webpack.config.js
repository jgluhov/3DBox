/**
 * Created by jgluhov on 05/02/16.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname + '/src',
	entry:  {
		main: [
			'./scripts/main.js'
		]
	},
	output: {
		path: __dirname + '/public',
		filename: 'js/bundle.js'
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader?presets[]=es2015']
			},
			{
				test: /\.jade$/,
				exclude: /node_modules/,
				loader: 'jade-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader","css-loader")
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract("style-loader","css-loader!stylus-loader?resolve url")
			},
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './templates/index.jade'
		}),
		new ExtractTextPlugin("./css/styles.css", {disable: process.env.NODE_ENV == 'development'})
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: __dirname
	}
};