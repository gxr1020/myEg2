module.exports={
	entry:'./src/app.js',
	output:{
		path:'./dist',
		filename:'bundle.js',

	},
	module:{
		loaders:[
		{
			test:/\.css$/,
			loader:'style!css'
		}]
	},
	resolve:{
		modulesDirectories:['node_modules','bower_components','web_modules']
	}
}