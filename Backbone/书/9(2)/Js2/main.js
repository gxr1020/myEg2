require(['json','../lib/jquery'],function(json) {
	$('#tip').html(json.name+'<br/>'+json.sex+'<br/>'+json.email);
});