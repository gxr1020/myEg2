//样式文件同样以模块方式引入
// require("!style!css!./style.css");
// require("./style.css");
require("!style!css!autoprefixer!./style.css");
//以CMD引入content.js
var content = require("./content.js");

function a() {
    document.write(content);
};
a();