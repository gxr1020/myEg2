require(['max','../lib/jquery'],function  (max) {
	$('#Button1').on('click',function(){
		var $txt1=$('#Text1').val();
		var $txt2=$('#Text2').val();
		var $m=max.Max($txt1,$txt2);
		$('#tip').show().html('最大值是:'+$m);
	})
})