// alert("app.js");
require('./css/style.css');
var yell=require('./js/alert.js');
yell('world');
require('hash-change').on('change',function(hash){
	yell(hash);
});