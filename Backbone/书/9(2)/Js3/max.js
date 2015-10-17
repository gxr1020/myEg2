define(function  () {
	var max=function(x,y){
		if(x>y){
			return x;
		}else{
			return y;
		}
	};
	return {Max:max};
})