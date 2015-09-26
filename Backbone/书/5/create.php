<?php
	// 设置接收数据的格式
	header('Content-Type:application/json;charset=utf-8');
	//获取客户端发送的数据
	$data=json_decode(file_get_contents('php://input'));
	/*
	获得各个属性值保存到服务器中
	 */
	
	// 返回更新成功的标志
	// class test2 
	// 	{ 
	// 	   var $_value; 
		    
	// 	   function test2() { 
	// 	      $this->_value = 100; 
	// 	   } 
		    
	// 	   function GetValue() { 
	// 	      return $this->_value; 
	// 	   } 
		    
	// 	   function SetValue($new_value) { 
	// 	      $this->_value = $new_value; 
	// 	   } 
	// 	} 
	// 	$t = new test2(); 
	// echo var_dump($t);//->["Code"];
	// $data->Code=$data->Code;
	// die( $data->Name); //返回字符串 会执行backbone 会error函数 返回数字  执行success
	// echo 0;


	// echo is_array($data);
	die(json_encode(array('code'=>'206')));
?>