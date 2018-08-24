var elewidth=0;
var eleheight=0;
var eletop=0;
var eleleft=0;
var url='';
function tagmouseenter(e)
{
		e.stopPropagation();
		
		var list= this.attributes;
		var tagname=this.tagName;
		this.onclick=function(e){
			stopDefault(e);
			}
		
		for(var i=0;i<list.length;i++)
		{
			
			if(list[i].name=='onclick')
			{
				oldclick=list[i].value;
				$(this).attr("onclick","void(0)");
			}
			if(list[i].name=='href')
			{
				
					oldhref=list[i].value;
					if(oldhref.indexOf("http")>=0)
					   locbreakurl=	oldhref;
					else
						locbreakurl=$("#lo").val()+oldhref;
				   
				
				
			}
			if(list[i].name=='id')
			{
				
				id='#'+list[i].value;
				showpost(id);
				$("#show_gz").html(id);
				id="";
				return;
			}else
			if(list[i].name=='class')
			{
				cssclass='.'+list[i].value;
				
				if($(cssclass).length==1)
				{
					
					cssclass='.'+list[i].value;
					showpost(cssclass);
					$("#show_gz").html(cssclass);
					cssclass="";
					return;
				}
					cssclass="";
				
				
			}
			//alert(list[i].name)
			//alert()	
		}
		try 
        { 
		//$("#show_gz").html(this.tagName.toLowerCase()+$(this).index().toString());
		arraytag[k][0]=this.tagName.toLowerCase();
		arraytag[k][1]=$(this).index();
		}
		catch(e)
		{
			
		}
		//arraytag.push([tagname, $(this).index().toString()]);
		serchfu(this);
		if(id!='')
		{
		  str=id;
		}
		if(cssclass!="")
		{
			str=cssclass;
		}
		for(var nb=arraytag.length-1;nb>=0;nb--)
		{
			var key= 1+parseInt(arraytag[nb][1]);
			str=str+">"+arraytag[nb][0]+":nth-child("+ key+")";
			}
		id="";
		cssclass="";
		
		console.log(str);
		$("#show_gz").html(str);
		showpost(str);
		arraytag=new Array(new Array());
		k=0;
		
}
function tagmouseleave(e){
			
			
			//$(this).attr("href",oldhref);
			//$(this).attr("onclick",oldclick);
			oldhref="#";
			oldclick="void(0)";
}
//获取需要爬的网站
function getajax(url)
{
	$.ajax({
     type: 'POST',
	 data:{lo:url},
     url: "gotourl.php" ,
    success: function (data)
	{
		$("#load_content_html").html(data);
		
	}
  });
}
function serchfu(obj)
{
	k++;
	var kk=$(obj).parent();
	
	//alert(kk.index());
	var list=kk.get(0).attributes;
	for(var i=0;i<list.length;i++)
		{
			if(list[i].name=='id')
			{
				id='#'+list[i].value;
				$("#show_gz").html(list[i].value);
				return;
			}
			if(list[i].name=='class')
			{
				cssclass='.'+list[i].value;
				
				if($(cssclass).length==1)
				{
					cssclass='.'+list[i].value;
					return;
				}
				cssclass="";
				//$("#show_gz").html(list[i].value);
			}
			//alert(list[i].name)
			//alert()	
		}
	
	if(kk.index()!=-1)
	{
		arraytag.push([kk.get(0).tagName.toLowerCase(),$(kk).index()]);
		serchfu(kk);
	}
	 
}

function stopDefault( e ) { 
     if ( e && e.preventDefault ) 
        e.preventDefault(); 
    else 
        window.event.returnValue = false; 
        
    return false; 
} 
//显示编辑框
function edittext(obj)
{
	//alert(obj);
	//console.log(this);
	$(obj).attr('onclick','');
	var txt=$(obj).text();
	var objtxt=$("<input text='text' value='' style='width:100%;border:none;background-color:transparent;' />");
	objtxt.on('blur',hidtext);
	objtxt.val(txt);
	$(obj).html(objtxt);
	objtxt.focus();
	
}
//隐藏编辑框
function hidtext(obj)
{
	var txt=$(this).val();
	var par= $(this).parent();
	par.html(txt);
	par.attr('onclick','edittext(this)');
	//par.on('click',edittext);
}
//添加元素
function addtm()
{
	var gz=$("#show_gz").text();
	var val="";
	if(gz!='')
	{
		val=$(gz).text()
	}
	else
	{
		gz='null';
		val=url;
	}
		var str="<tr onclick='setrgb(this);'>";
		str=str+"<td><span style='display: block; overflow: hidden; width: 196px; height: 30px;'  onclick='edittext(this);' >"+gz+"</span></td>";
		str=str+"<td><span style='display: block; overflow: hidden; width: 96px; height: 30px;' onclick='edittext(this);'>"+val+"</span></td>";
		var selec= $("<select></select>");
		selec.append("<option value ='click'>click</option>");
		selec.append("<option value ='open'>open</option>");
		selec.append("<option value ='goBack'>goBack</option>");
		selec.append("<option value ='refresh'>refresh</option>");
		selec.append("<option value ='close'>close</option>");
		selec.append("<option value ='input'>input</option>");
		
		selec.append("<option value ='doubleclick'>doubleclick</option>");
		selec.append("<option value ='nextPage'>nextPage</option>");
		selec.append("<option value ='startWhile'>startWhile</option>");
		selec.append("<option value ='Increment'>Increment</option>");
		selec.append("<option value ='decrement'>decrement</option>");
		selec.append("<option value ='startFor'>startFor</option>");
		selec.append("<option value ='endFor'>endFor</option>");
		selec.append("<option value ='connMongodb'>connMongodb</option>");
		selec.append("<option value ='storeMongodb'>storeMongodb</option>");
		
		selec.append("<option value ='closeMongodb'>closeMongodb</option>");
		selec.append("<option value ='storeSet'>storeSet</option>");
		selec.append("<option value ='storeValue'>storeValue</option>");
		selec.append("<option value ='storeElement'>storeElement</option>");
		selec.append("<option value ='startDoWhile'>startDoWhile</option>");
		selec.append("<option value ='endDoWhile'>endDoWhile</option>");
		selec.append("<option value ='assertExistence'>assertExistence</option>");
		str=str+"<td><span style='display: block; overflow: hidden; width: 96px; height: 30px;'><select style='width:100%' onchange='selectval(this)'> "+selec.html()+"</select></span></td>";
		str=str+"<td style='text-align:center;'><button>执行</button> <button onclick='deletegz(this)'>删除</button></td>";
		str=str+"</tr>"
		$("#showtmlist").append(str);
	
	
}
//触发当前行
function setrgb(obj)
{
	$(obj).css({'background-color':'#b9f'}).siblings().css({'background-color':'#fff'});
	setattribute(obj);
}
//选中的当前动作
function selectval(obj)
{
	var command=$(obj).val();
	var trpar=$(obj).parent().parent().parent();
	var tdgz=trpar.children('td:eq(0)').children('span');
	var tdval=trpar.children('td:eq(1)').children('span');
	
	
	switch(command)
	{
		case 'click':console.log(1);
		break;
		case 'open':console.log(1);
		break;
		case 'goBack':console.log(1);
		break;
		case 'refresh':console.log(1);
		break;
		case 'close':console.log(1);
		break;
		case 'input':console.log(1);
		break;
		case 'doubleclick':console.log(1);
		break;
		case 'nextPage':console.log(1);
		break;
		case 'startWhile':console.log(1);
		break;
		case 'Increment':console.log(1);
		break;
		case 'decrement':console.log(1);
		break;
		case 'startFor':console.log(1);
		break;
		case 'endFor':console.log(1);
		break;
		case 'connMongodb':console.log(1);
		break;
		case 'storeMongodb':console.log(1);
		break;
		case 'closeMongodb':console.log(1);
		break;
		case 'storeSet':console.log(1);
		break;
		case 'storeValue':console.log(1);
		break;
		case 'storeElement':console.log(1);
		break;
		case 'startDoWhile':console.log(1);
		break;
		case 'endDoWhile':console.log(1);
		break;
		case 'assertExistence':console.log(1);
		break;
		
		
	}
	//alert();
}
//绑定元素规则
function getgz()
{
	if(!buttonlist)
	{
		$("#load_content_html *").on("mouseenter",tagmouseenter);
		$("#load_content_html *").on("mouseleave",tagmouseleave);
		buttonlist=true;
	}
}
function openurl()
{
	url=$("#lo").val();
	getajax(url);
	addtm();
}
//删除行
function deletegz(obj)
{
	/*var table=$(obj).parent().parent();
	var ind=$(obj).index();
	table.remove*/
	$(obj).parent().parent().remove();
	
}
function showpost(obj)
{
	    elewidth=$(str).outerWidth(false);
		eleheight=$(str).outerHeight(false);
		eletop=$(str).offset().top;
		eleleft=$(str).offset().left;
		//$("#abspos").show().css("left",eleleft).css("top",eletop).css("width",elewidth).css("height",eleheight);
}
//生成规则文件
function build()
{
	var stepNum=$("#showtmlist tr").length;
	var stepgz="";
	$("#showtmlist tr").each(function(e){
		
		stepgz=stepgz+encodeURI($(this).children('td:eq(0)').children('span').text())+"@";//得到当前的规则
		stepgz=stepgz+encodeURI($(this).children('td:eq(1)').children('span').text())+"@";//得到当前值
		stepgz=stepgz+encodeURI($(this).children('td:eq(2)').children('span').children('select').val());//得到当前动作
		stepgz=stepgz+"|";
		
	});
	$.ajax({
     type: 'POST',
	 data:{stepnum:stepNum,stepgz:stepgz},
     url: "buildpy.php" ,
    success: function (data)
	{
		alert(data);
		
	}
  });
}
//设置当前规则的属性值
function setattribute(obj)
{
	//alert($(obj).index());
	var command=$(obj).children('td:eq(2)').children('span').children('select').val();
	switch(command)
	{
		case 'click':fclick(obj);
		break;
		case 'open':fopen(obj);
		break;
		case 'goBack':fgoBack(obj);
		break;
		case 'refresh':frefresh(obj);
		break;
		case 'close':fclose(obj);
		break;
		case 'input':finput(obj);
		break;
		case 'doubleclick':fdoubleclick(obj);
		break;
		case 'nextPage':fnextPage(obj);
		break;
		case 'startWhile':fstartWhile(obj);
		break;
		case 'Increment':fIncrement(obj);
		break;
		case 'decrement':fdecrement(obj);
		break;
		case 'startFor':fstartFor(obj);
		break;
		case 'endFor':fendFor(obj);
		break;
		case 'connMongodb':fconnMongodb(obj);
		break;
		case 'storeMongodb':fstoreMongodb(obj);
		break;
		case 'closeMongodb':fcloseMongodb(obj);
		break;
		case 'storeSet':fstoreSet(obj);
		break;
		case 'storeValue':fstoreValue(obj);
		break;
		case 'storeElement':fstoreElement(obj);
		break;
		case 'startDoWhile':fstartDoWhile(obj);
		break;
		case 'endDoWhile':fendDoWhile(obj);
		break;
		case 'assertExistence':fassertExistence(obj);
		break;
		
	}
	
}
function fclick(obj)
{
	
}
function fopen(obj)
{}
function fgoBack(obj)
{}

function frefresh(obj)
{}
function fclose(obj)
{}
function finput(obj)
{}


function fdoubleclick(obj)
{}
function fnextPage(obj)
{}
function fstartWhile(obj)
{}
function fIncrement(obj)
{}
function fdecrement(obj)
{}
function fstartFor(obj)
{
	
	var lenarr=attributearr['startFor'].length;
	$("#showattributelist tbody").html("");
	for(var i=0;i<lenarr;i++)
	{
		str="<tr>";
		str=str+"<td><span style='display: block; overflow: hidden; width: 100%; height: 30px;'  onclick='edittext(this);' >"+attributearr['storeSet'][i]+"</span></td>";
		str=str+"<td><span style='display: block; overflow: hidden; width: 100%; height: 30px;' onclick='edittext(this);'></span></td>";
		addshowattributelist(str);
		//alert(attributearr['storeSet'][i]);
	}
}
function fendFor(obj)
{}
function fconnMongodb(obj)
{}
function fstoreMongodb(obj)
{}
function fcloseMongodb(obj)
{}
function fstoreSet(obj)
{
	var lenarr=attributearr['storeSet'].length;
	$("#showattributelist tbody").html("");
	for(var i=0;i<lenarr;i++)
	{
		str="<tr>";
		str=str+"<td><span style='display: block; overflow: hidden; width: 100%; height: 30px;'  onclick='edittext(this);' >"+attributearr['storeSet'][i]+"</span></td>";
		str=str+"<td><span style='display: block; overflow: hidden; width: 100%; height: 30px;' onclick='edittext(this);'></span></td>";
		addshowattributelist(str);
		//alert(attributearr['storeSet'][i]);
	}
}
function fstoreValue(obj)
{}
function fstoreElement(obj)
{}
function fstartDoWhile(obj)
{}
function fendDoWhile(obj)
{}
function fassertExistence(obj)
{}
function addshowattributelist(txt)
{
	
	$("#showattributelist tbody").append(txt);
}