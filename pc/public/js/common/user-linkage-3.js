$(function(){
// 		alert("ddddd");
		/*初始化加载地市组织*/
		obj.ajax('/common/district/getCity',{'provinceId':440000},function(data){
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--市级--", "-1");
					var selects = document.getElementById("cityOid3");
					selects.options.add(option);
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#cityOid3").html("<option value='-1'>--暂无可选组织--</option>");
				}
			
		});
		/*初始化加载高校组织*/
		obj.ajax('/common/district/getShcool',{'provinceId':440000,'type':2},function(data){
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--请选择--", "-1");
					var selects = document.getElementById("shcoolOid3");
					selects.options.add(option);    
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#shcoolOid3").html("<option value='-1'>--暂无可选高校组织--</option>");
				}
			
		});
		
	  
	});
	
	
// 三级联动
$('#cityOid3').hide();
$('#shcoolOid3').hide();
$('#areaOid3').hide();
$('#classOid3').hide();
//标签隐藏
//$('#show1').hide();
//$('#show2').hide();
function  changeOid3Type(n){
var n =	$('#oidType3').val();
console.log(n);
	if(n==1){
		
		$('#cityOid3').show();
		$('#areaOid3').show();
		
		$('#shcoolOid3').hide();
		$('#classOid3').hide();
//		$('#show1').show();
//     $('#show2').show();
	}
	if(n==2) {
		
		$('#cityOid3').hide();
		$('#areaOid3').hide();
		
		$('#shcoolOid3').show();
		$('#classOid3').show();
//		
//	    $('#show1').show();
//     $('#show2').show();
		
	}
	
}

//三级联动调用函数
	//获取区/县
	function quxuan3(obj){
	var pid = $(obj).val();
	$("#areaId3").val(pid);
}
	
	
	
	
	function cityOid3Change(obj){
		var pid = $(obj).val();
		var areaHtml = $('#areaOid3').html('');
		if(pid != "-1"){
			
			$.ajax({
				type: 'POST',
				url: base + '/common/district/getCity',
				data:{'provinceId':pid},
				dataType:'json',
				success:function(data){
					if(data){
						data = data.rows;
						var selected = false;
						var option = null;
						option = new Option("--区/县--", "-1");
						var selects = document.getElementById("areaOid3");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].districtName, data[i].did, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						areaHtml.removeAttr("disabled");
					}else{
						$("#areaOid3").html("<option value='-1'>--暂无--</option>");
						areaHtml.attr("disabled","true");
					}
				}
			});
			
			
		}else{
			areaHtml.html("<option value='-1'>--区/县--</option>");
			areaHtml.attr("disabled","true");
			$(obj).css("color","#999");

		}
	};
	
	
		//获取高校下级 shcoolOid3 classOid
	function schoolOid3Change(obj){
		var pid = $(obj).val();
		$("#reporterNames").val(pid);
		var areaHtml = $('#classOid3').html('');
		if(pid != "-1"){
		//	areaHtml.removeAttr("disabled");
			$.ajax({
				type: 'POST',
				url: base + '/common/district/getCity',
				data:{'provinceId':pid},
				dataType:'json',
				success:function(data){
					if(data){
						data = data.rows;
						var selected = false;
						var option = null;
						option = new Option("--分院--", "-1");
						var selects = document.getElementById("classOid3");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].districtName, data[i].did, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						areaHtml.removeAttr("disabled");
					}else{
						$("#classOid3").html("<option value='-1'>--暂无--</option>");
						areaHtml.attr("disabled","true");
					}
				}
			});
		}else{
			areaHtml.html("<option value='-1'>--分院--</option>");
			areaHtml.attr("disabled","true");
			$(obj).css("color","#999");
//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
		}
	}

	