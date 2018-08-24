<?php 
$url='http://bj.58.com/';  
if(isset($_POST['lo']) )
{
	$url=$_POST['lo'];
}

$html = file_get_contents($url);  
$html=fixEncoding($html);
//$preg = "/<script[\s\S]*?<\/script>/i";
//$html = preg_replace($preg,"",$html,3); 
echo $html;

function fixEncoding($in_str)

{

$cur_encoding = mb_detect_encoding($in_str) ;

if($cur_encoding == "UTF-8" && mb_check_encoding($in_str,"UTF-8"))

return $in_str;

else

return utf8_encode($in_str);

} // fixEncoding
?>