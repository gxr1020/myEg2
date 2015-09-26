<?php
// $num=0;
$stulist=array(
	array('Code'=>'123','Name'=>'gxr1','Score'=>123),
	
	array('Code'=>'123','Name'=>'gxr1','Score'=>123),
	array('Code'=>'456','Name'=>'gxr2','Score'=>456),
	array('Code'=>'789','Name'=>'gxr3','Score'=>789),
	array('Code'=>'123[new]','Name'=>'gxr1[new]','Score'=>123),
	array('Code'=>'456[new]','Name'=>'gxr2[new]','Score'=>456),
	array('Code'=>'789[new]','Name'=>'gxr3[new]','Score'=>789),
	);
echo json_encode($stulist);
?>
