
 	$(function(){

		/*初始化加载地市组织*/
		obj.ajax('/common/district/getCityByType',{'provinceId':440000,'type':1},function(data){
				if(data){
					data = data.dataList;
					var selected = false;
					var option = null;
					option = new Option("--市级--", "-1");
					var selects = document.getElementById("cityOid");
					selects.options.add(option);
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#cityOid").html("<option value='-1'>--暂无可选组织--</option>");
				}
			
		});
		/*初始化加载高校组织*/
		obj.ajax('/common/district/getShcool',{'provinceId':440000,'type':2},function(data){  //
			  //1是地市   2是高校
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--请选择--", "-1");
					var selects = document.getElementById("shcoolOid");
					//var selects = document.getElementById("cityOid");
					selects.options.add(option);    
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#shcoolOid").html("<option value='-1'>--暂无可选高校组织--</option>");
				}
			
		});
		
	  
	});
	

/*******----------------- 3 及联动-------------------*****/
		//获取区/县
	function cityOidChange(pid){
		
		//var pid = $(obj).val();
		var areaHtml = $('#areaOid').html('');
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
						var selects = document.getElementById("areaOid");
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
						$("#areaOid").html("<option value='-1'>--暂无--</option>");
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
	function schoolOidChange(pid){
		//var pid = $(obj).val();
		$("#reporterNames").val(pid);
		var areaHtml = $('#classOid').html('');
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
						var selects = document.getElementById("classOid");
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
						$("#classOid").html("<option value='-1'>--暂无--</option>");
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
/********* 3级联动 end**********/



//  三级联动 
$('#cityOid').hide();
$('#shcoolOid').hide();
$('#areaOid').hide();
$('#classOid').hide();
$('#zhi-city').hide();
////标签隐藏
//$('#show1').hide();
//$('#show2').hide();
function  changeOidType(n){
	  	$("#spa8").hide();
 
//var n =	$('#oidType').val();
console.log(n);
	if(n==1){
		
		$('#cityOid').show();
		$('#areaOid').show();

		$('#shcoolOid').hide();
		$('#classOid').hide();
//		$('#show1').show();
//     $('#show2').show();
	}
	if(n==2) {
		
		$('#cityOid').hide();
		$('#areaOid').hide();
		
		$('#shcoolOid').show();
		$('#classOid').show();
		
	    $('#show1').show();
       $('#show2').show();
		
	}
	if(n==3){
		$('#cityOid').hide();
		$('#shcoolOid').hide();
		$('#areaOid').hide();
		$('#classOid').hide();
	
		
		
	}
//	
	
	
}
var did = "";
function fn4(obj){

	var pid = $(obj).val();
	changeOidType(pid);
	did = pid;
	
}

function oidCity(obj){
	var pid = $(obj).val();
	cityOidChange(pid);
	did = pid;

}
function oidSchool(obj){
	var pid = $(obj).val();
	schoolOidChange(pid);
	did = pid;
		
}

function quxuan(obj){
	var pid = $(obj).val();
	did = pid;
}