<?php
//设置接收数据的格式
	header('Content-Type:application/json;charset=utf-8');
	// 获取客户端发送过来的数据
	$data=json_decode(file_get_contents("php://input"));
// json_decode  json_encode对json编码解码
	die(json_encode(array('code'=>'0')));
	// echo　$data;
?>