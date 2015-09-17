var ComponentPlugin = require("component-webpack-plugin");
module.exports = {
	entry:'./build.js',
	output:{
			path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.png$/, loader: "url-loader?limit=10000&minetype=image/png" }
		]
	},
	plugins: [
		new ComponentPlugin()
	]
}