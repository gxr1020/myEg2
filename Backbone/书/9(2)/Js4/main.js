require(['string', '../lib/jquery'], function(str) {
	$('#Button1').on('click', function() {
		var $a=$('#Text1').val();
		var $s = str.OrE($a);
		$('#tip').show().html('您输入的是' + $s);
	});
});