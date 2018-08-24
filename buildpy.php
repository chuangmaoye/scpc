<?php
$pygz;
$stepnum;
if(isset($_POST['stepnum']) )
{
	$stepnum=$_POST['stepnum'];
}
if(isset($_POST['stepgz']) )
{
	$pygz=urldecode($_POST['stepgz']);
}
$pygz=rtrim($pygz,'|');
$steparr=explode('|',$pygz);
$outgz=array();
foreach($steparr as $value)
{
	$arrgz=explode('@',$value);
	//var_dump($arrgz);
	$arrkey=array();
	if($arrgz[0]!='' && $arrgz[0]!='null' )
	{
		$arrkey['element']=$arrgz[0];
	}
	if($arrgz[1]!="" && $arrgz[2]=='open')
	{
		$arrkey['url']=$arrgz[1];
		
	}
	if($arrgz[2]!="")
	{
		$arrkey['action']=$arrgz[2];
	}
	array_push($outgz,json_encode($arrkey));
}
$outwritepy="stepNum"."=".$stepnum."\r\n";

foreach($outgz as $key=>$gz)
{
	$outwritepy=$outwritepy."step".($key+1)."=".$gz."\r\n";
}
$file="gz.py";
if(!file_exists($file)){
$handle=fopen($file,"w+");
fwrite($handle,$outwritepy);
fclose($handle);


}
$jsondata['status']='100';
$jsondata['msg']='生成成功！';
echo json_encode($jsondata);