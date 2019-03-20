$(function(){
// 		alert("ddddd");
		/*初始化加载地市组织*/
		obj.ajax('/common/district/getShcool',{'provinceId':440000,'type':1},function(data){
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--市级--", "-1");
					var selects = document.getElementById("cityOid2");
					selects.options.add(option);
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#cityOid2").html("<option value='-1'>--暂无可选组织--</option>");
				}
			
		});
		/*初始化加载高校组织*/
		obj.ajax('/common/district/getShcool',{'provinceId':440000,'type':2},function(data){
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--请选择--", "-1");
					var selects = document.getElementById("shcoolOid2");
					selects.options.add(option);    
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#shcoolOid2").html("<option value='-1'>--暂无可选高校组织--</option>");
				}
			
		});
		
	  
	});
	
	
// 三级联动
$('#cityOid2').hide();
//$('#shcoolOid2').hide();
$('#areaOid2').hide();
//$('#classOid2').hide();
//标签隐藏
//$('#show1').hide();
//$('#show2').hide();
 $('.showArea').hide() //  隐藏地市高校框
function  changeOid2Type(n){
var n =	$('#oidType2').val();

    $('.showArea').show() //  显示地市高校框
console.log(n);
	if(n==1){
		
		$('#cityOid2').show();
		$('#areaOid2').show();
		
		$('#shcoolOid2').hide();
		$('#classOid2').hide();
//		$('#show1').show();
//     $('#show2').show();
	}
	if(n==2) {
		
		$('#cityOid2').hide();
		$('#areaOid2').hide();
		
		$('#shcoolOid2').show();
		$('#classOid2').show();
//		
//	    $('#show1').show();
//     $('#show2').show();
		
	}
	
}

//三级联动调用函数
	//获取区/县
	function quxuan2(obj){
	var pid = $(obj).val();
	$("#areaId2").val(pid);
}
	
	
	
	
	function cityOid2Change(obj){
		var pid = $(obj).val();
		var areaHtml = $('#areaOid2').html('');
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
						var selects = document.getElementById("areaOid2");
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
						$("#areaOid2").html("<option value='-1'>--暂无--</option>");
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
	
	
		//获取高校下级 shcoolOid classOid
	function schoolOid2Change(obj){
		var pid = $(obj).val();
		$("#reporterNames").val(pid);
		var areaHtml = $('#classOid2').html('');
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
						var selects = document.getElementById("classOid2");
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
						$("#classOid2").html("<option value='-1'>--暂无--</option>");
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

	