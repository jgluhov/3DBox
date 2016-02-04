/**
 * Created by jgluhov on 05/02/16.
 */

module.exports = {
	context: __dirname + '/src',
	entry: './main',
	output: {
		path: __dirname + '/public',
		publicPath: '/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader?presets[]=2015']
			}
		]
	}
};