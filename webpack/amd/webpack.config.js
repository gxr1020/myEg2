module.exports={
	entry:'./m2.js',
	output:{
		path:__dirname,
		filename:"bundle2.js"
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:"style!css"}
		]
	}
}