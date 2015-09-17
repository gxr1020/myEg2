module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        //打包输出文件
        filename: "bundle3.js"
    },
    module: {
        //loaders引入加载器
        loaders: [{
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }]
    }
};