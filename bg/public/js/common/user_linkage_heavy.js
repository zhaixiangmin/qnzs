
var lowerDids = new Array();//可选区域
var auditDidsSub = 0;//可选区域下级是否可审核

function loadOid(activityId,districtId) {
$('#cityOid').hide();
$('#shcoolOid').hide();
$('#areaOid').hide();
$('#classOid').hide();
	
	/*下级可审核区域*/
	$.ajax({
		type: 'POST',
		url: base + '/project/activityDetailBaseInfo',
		data: {
			'activityId': activityId
		},
		dataType: 'json',
		async: false,
		success: function(data) {
			if (data) {
	        	console.log(data);
				var currActivity = data.dataList;
				if (currActivity.auditDids != "") {
					$('.didSelect').show();
					lowerDids = currActivity.auditDids.split(',');//可选区域
					auditDidsSub = currActivity.auditDidsSub;//可选区域下级是否可审核（0-否(默认)，1-是）
				} else {
//					$('.didSelect').css("display", "none");//隐藏区域选择
					$('.didSelect').hide();//隐藏区域选择
				}
			}
		}
	});

	/*初始化加载地市组织*/
	obj.ajax('/common/district/getShcool', {
		'provinceId': 440000,
		'type': 1
	}, function(data) {
		if (data) {
			data = data.rows;
			var option = null;
			$('#cityOid').html('');
			option = new Option("--请选择--", "-1");
			var selects = document.getElementById("cityOid");
			selects.options.add(option);
			for (var i = 0; i < data.length; i++) {
				if (lowerDids.indexOf(data[i].did) > -1) {
					if (data[i].did == districtId) {
						option = new Option(data[i].districtName, data[i].did, null, true);
					} else{
						option = new Option(data[i].districtName, data[i].did, null, false);
					}
					selects.options.add(option);
				}
			}
		} else {
			$("#cityOid").html("<option value='-1'>--暂无可选组织--</option>");
		}

	});
	/*初始化加载高校组织*/
	obj.ajax('/common/district/getShcool', {
		'provinceId': 440000,
		'type': 2
	}, function(data) {
		if (data) {
			data = data.rows;
			var option = null;
			$('#shcoolOid').html('');
			option = new Option("--请选择--", "-1");
			var selects = document.getElementById("shcoolOid");
			selects.options.add(option);
			for (var i = 0; i < data.length; i++) {
				if (lowerDids.indexOf(data[i].did) > -1) {
					if (data[i].did == districtId) {
						option = new Option(data[i].districtName, data[i].did, null, true);
					} else{
						option = new Option(data[i].districtName, data[i].did, null, false);
					}
					selects.options.add(option);
				}
			}
		} else {
			$("#shcoolOid").html("<option value='-1'>--暂无可选高校组织--</option>");
		}

	});
}

//三级联动调用函数
function cityOidChange(obj) {
	console.log(lowerDids);
	var pid = $(obj).val();
	var areaHtml = $('#areaOid').html('');
	if (pid != "-1") {
		$.ajax({
			type: 'POST',
			url: base + '/common/district/getCity',
			data: {
				'provinceId': pid
			},
			dataType: 'json',
			success: function(data) {
				if (data) {
					data = data.rows;
					var option = null;
					option = new Option("--区/县--", "-1");
					var selects = document.getElementById("areaOid");
					selects.options.add(option);
					for (var i = 0; i < data.length; i++) {
							if (data[i].did == districtId) {
								option = new Option(data[i].districtName, data[i].did, null, true);
							} else{
								option = new Option(data[i].districtName, data[i].did, null, false);
							}
							selects.options.add(option);
					}
					areaHtml.removeAttr("disabled");
				} else {
					$("#areaOid").html("<option value='-1'>--暂无--</option>");
					areaHtml.attr("disabled", "true");
				}
			}
		});
	} else {
		areaHtml.html("<option value='-1'>--区/县--</option>");
		areaHtml.attr("disabled", "true");
		$(obj).css("color", "#999");
	}
};

//获取高校下级 shcoolOid classOid
function schoolOidChange(obj) {
	var pid = $(obj).val();
	$("#reporterNames").val(pid);
	var areaHtml = $('#classOid').html('');
	if (pid != "-1") {
		//	areaHtml.removeAttr("disabled");
		$.ajax({
			type: 'POST',
			url: base + '/common/district/getCity',
			data: {
				'provinceId': pid
			},
			dataType: 'json',
			success: function(data) {
				if (data) {
					data = data.rows;
					var option = null;
					option = new Option("--分院--", "-1");
					var selects = document.getElementById("classOid");
					selects.options.add(option);
					for (var i = 0; i < data.length; i++) {
							if (data[i].did == districtId) {
								option = new Option(data[i].districtName, data[i].did, null, true);
							} else{
								option = new Option(data[i].districtName, data[i].did, null, false);
							}
							selects.options.add(option);
					}
					areaHtml.removeAttr("disabled");
				} else {
					$("#classOid").html("<option value='-1'>--暂无--</option>");
					areaHtml.attr("disabled", "true");
				}
			}
		});
	} else {
		areaHtml.html("<option value='-1'>--分院--</option>");
		areaHtml.attr("disabled", "true");
		$(obj).css("color", "#999");
		//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
	}
}

//标签隐藏
function changeOidType(n) {
	var n = $('#oidType').val();
	if (n == 1) {
		$('#shcoolOid').hide();
		$('#classOid').hide();
		$('#cityOid').show();
		if (auditDidsSub != 0) {
			$('#areaOid').show();
		}
	} else if (n == 2) {
		$('#cityOid').hide();
		$('#areaOid').hide();
		$('#shcoolOid').show();
		if (auditDidsSub != 0) {
			$('#classOid').show();
		}
	} else {
		$('#cityOid').hide();
		$('#areaOid').hide();
		$('#shcoolOid').hide();
		$('#classOid').hide();
	}
}

//获取所选地区
function getDid() {
	var oidType = $('#oidType').val();
	var disId = "";
	if (oidType == 1) {
		if ($('#areaOid').val() != "-1") {
			disId = $('#areaOid').val();
		} else {
			disId = $('#cityOid').val() != "-1" ? $('#cityOid').val() : "";
		}
	}
	if (oidType == 2) {
		if ($('#classOid').val() != "-1") {
			disId = $('#classOid').val();
		} else {
			disId = $('#shcoolOid').val() != "-1" ? $('#shcoolOid').val() : "";
		}
	}
	return disId;
}
  
/**** 填充参赛者分类下拉列表 ****/
function createReatorType(creatorType){
    obj.ajax('/project/applicantTypes',{'activityId':activityId},function(data){
   	    var typeList = data.dataList;
   	    var html = $('#createReatorType').html('');
        html+='<option value="">--请选择--</option>';
   	    if(!typeList || typeList.length == 0){
   	    	$('.typeSelect').hide();
   	    	return;
   	    }else{
   	    	$('.typeSelect').show();
	   	    for(var i=0;i<typeList.length;i++){
	   	    	if(typeList[i] == creatorType){
	   	    		html+='<option value="'+typeList[i]+'" selected="selected">'+typeList[i]+'</option>';
	   	    	}else{
	   	    		html+='<option value="'+typeList[i]+'">'+typeList[i]+'</option>';
	   	    	}
	   	    }
	   	    $('#createReatorType').append(html);
   	    }
    },function(data){})
}  




