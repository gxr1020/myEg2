(function(window, undefined) {

	var jQuery = (function() {
		//构建jQuery对象
		var jQuery = function(selector, context) {
				return new jQuery.fn.init(selector, context, rootjQuery);
			}
			//jQuery原型对象
		jQuery.fn = jQuery.prototype = {
			constructor: jQuery, //修复construction指向
			init: function(selector, context, rootjQuery) {

			}

		};

		jQuery.prototype.init.prototype = jQuery.fn;
		// 此时 jQuery.prototype\jQuery.fn\jQuery.prototype.init.prototype指向都是同一个对象

		//给jQuery添加静态方法(jQuery.extend)，也添加实例方法(原型方法)(jQuery.fn.extend)
		jQuery.extend = jQuery.fn.extend = function() {

			var options,name,src,copy, copyIsArray, clone,
				target=arguments[0]||{}, //保存参数的第一个值
				i=1, //保存参数的第一个对象的索引
				length=arguments.length, //保存传递参数的个数
				deep=false;  //用于标记是否是深拷贝

			//如果参数第一个值是布尔值且为true 则是深拷贝
			if(typeof target==='boolean'){
				deep=target; //改标记
				target=arguments[1]|{}; //target重新指向第一个参数对象
				i=2;//该第一个参数对象对应的索引号
			}	
			//第一个参数对象必须是对象或函数，否则强制设为空对象
			if(typeof target !=='object' && !jQuery.isFunction(target)){
				target={};
			}

			//如果只传一个参数，则是jQuery这个对象的扩展
			if(length === i){ 
				target=this;
				--i; //0  因为如果是扩展 argumetn[i]是指向null 所以自减
						//1 深拷贝且jquery扩展
			} 
			//如果是jQuery扩展 此时i为0  length为1  jQuery.extend({xxx})   target 指向this jq对象
			//如果是深拷贝 此时 i为2   length为3   jQuery.extend(boolean,{},{})  target 指向第一个对象参数
			//如果深拷贝且jq扩展  i为1  length为2    jQuery.extend(boolean,{})  target指向this jq对象
			for(;i<length;i++){

				//只处理非空参数 
				if((options=arguments[i])!=null){ 
					for(name in options){
						src=target[name];  //如果是jQuery扩展 此时的target指向的是this 是jQuery 
										   //如果不是jQuery扩展 此时target为第一个参数对象
						copy=options[name]; //如果是jQuery扩展options 此时指向第一个参数对象
											// 如果不是jQuery扩展，此时options则指向第二个参数对象
						
						//避免循环引用
						if(target===copy){  //比如jQuery.extend({myjquery:jQuery}) 或jQuery.extend(a对象,{mysx:a对象})
							continue;//跳出本次循环
						}
					}
				}
			}


		};

		//扩展静态方法
		jQuery.extend({

		})

		return jQuery;

	})();

	window.jQuery = window.$ = jQuery;

})(window)