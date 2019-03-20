
 	$(function(){

		/*初始化加载地市组织*/
		obj.ajax('/common/district/getCityByType',{'provinceId':440000,'type':1},function(data){
				if(data){
					data = data.dataList;
					console.log(data);
					var selected = false;
					var option = null;
					option = new Option("--市级--", "-1");
					var selects = document.getElementById("cityOid1");
					selects.options.add(option);
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#cityOid1").html("<option value='-1'>--暂无可选组织--</option>");
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
					var selects = document.getElementById("shcoolOid1");
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
					$("#shcoolOid1").html("<option value='-1'>--暂无可选高校组织--</option>");
				}
			
		});
		
	  
	});
	

/*******----------------- 3 及联动-------------------*****/
		//获取区/县
	function cityOidChange1(pid){
		//var pid = $(obj).val();
	
		var areaHtml = $('#areaOid1').html('');
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
						var selects = document.getElementById("areaOid1");
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
						$("#areaOid1").html("<option value='-1'>--暂无--</option>");
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
	function schoolOidChange1(pid){
			
		//var pid = $(obj).val();
		$("#reporterNames").val(pid);
		var areaHtml = $('#classOid1').html('');
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
						var selects = document.getElementById("classOid1");
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
						$("#classOid1").html("<option value='-1'>--暂无--</option>");
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
$('#cityOid1').hide();
$('#shcoolOid1').hide();
$('#areaOid1').hide();
$('#classOid1').hide();
$('#zhi-city1').hide();
//标签隐藏
$('#show1').hide();
$('#show2').hide();
function  changeOidType1(n){
	  	$("#spa8").hide();

//var n =	$('#oidType').val();
console.log(n);
	if(n==1){
		
		$('#cityOid1').show();
		$('#areaOid1').show();
		$('#zhi-city').hide();
		$('#shcoolOid1').hide();
		$('#classOid1').hide();
		$('#show1').show();
      // $('#show2').show();
	}
	if(n==2) {
		
		$('#cityOid1').hide();
		$('#areaOid1').hide();
		$('#zhi-city').hide();
		$('#shcoolOid1').show();
		$('#classOid1').show();
		
	    $('#show1').show();
      // $('#show2').show();
		
	}
	
	
	if(n==3){
		$('#cityOid1').hide();
		$('#shcoolOid1').hide();
		$('#areaOid1').hide();
		$('#classOid1').hide();
		//$('#zhi-city').show();
		
		
	}
	
}
var updatedid = "";
function oidType(obj){
	var oidType = $(obj).val();
	changeOidType1(oidType);
	updatedid = "";
	$('#cityOid1').val("-1");
	$('#classOid1').val("");
	$('#areaOid1').val("");
	$('#classOid1').val("");
}

function oidCity(obj){
	updatedid = $(obj).val();
	cityOidChange1(updatedid);
}
function oidSchool(obj){
	updatedid = $(obj).val();
	schoolOidChange1(updatedid);
}
function quxuan1(obj){
	updatedid = $(obj).val();
}
function areaOida(obj){
	
	updatedid = $(obj).val();	
	if(updatedid=='-1'){
		updatedid=$('#cityOid1').val();
	}
}
function classOida(obj){
	updatedid = $(obj).val();
	if(updatedid=='-1'){
		updatedid=$('#classOid1').val();
	}
}
function oidCity4(obj){
	updatedid = $(obj).val();
	cityOidChange1(updatedid);
}

