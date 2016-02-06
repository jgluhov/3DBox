/**
 * Created by jgluhov on 05/02/16.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname + '/src',
	entry:  {
		main: [
			'webpack-dev-server/client?http://localhost:8080',
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
				loader: "style-loader!css-loader"
			},
			{
				test: /\.styl$/,
				loader: "style-loader!css-loader!stylus-loader"
			},
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './templates/index.jade'
		})
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: __dirname
	}
};