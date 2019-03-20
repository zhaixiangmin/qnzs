var choolid = "";
var currentAccount = "";

$(function() {
	/*** 获取权限 ***/
	var limits = Utils.getQueryString('limit'); // 权限
	console.log('limits', limits);

	$('#toolbar li').hide(); // 隐藏所有按钮

	if(limits) {
		limits = limits.split(','); // 将字符串解析成数组
		for(var i = 0; i < limits.length; i++) {
			var limit = limits[i];
			$('#' + limit).show(); // 显示权限按钮
		}
	}

	Qnzs.getSessionAccount({}).then(function(data) {
		console.log('Qnzs.getSessionAccount data', data);
		currentAccount = data.account; // 账户信息

		districtSearch();
		//		districtSelect();
	});

	//清空数据
	$('#btn_empty').click(function() {
		$('#student_name').val('');
		$('#student_number').val('');
		$('#Schoolpment').val('');
		$('#department').val('');
		$('#condition').val('');
		$('#oidType').val('');
		$('#shcoolOid').val('');
		$('#classOid').val('');
		$('#cityDistrict').val('');
		$('#areaDistrict').val('');
	})

	//数据筛选
	$('#classy_actit').click(function() {
		var name = $('#student_name').val();
		var stuNo = $('#student_number').val();
		var status = $('#condition').val();
		//		var schoolDid = $('#Schoolpment').val();
		//		var academy = $('#department').val();
		var shcoolDistrictDid = '';
		var academyDistrictDid = '';
		//		var cityDid = $('#cityOid').val(); //所属地市
		var shcoolDid = $('#shcoolOid').val(); //所属高校
		//		var areaDid = $('#areaOid').val(); //超管所能选的所属区县
		var classDid = $('#classOid').val(); //超管所能选的所属院系
		var cityDid2 = $('#cityDistrict').val(); //系统管理员的所属区域
		var areaDid2 = $('#areaDistrict').val(); //系统管理员所能选的所属区域
		if((areaDid2 && areaDid2 != '-1') || (cityDid2 && cityDid2 != '-1')) {
			if(areaDid2 && areaDid2 != '-1') {
				academyDistrictDid = areaDid2;
			} else {
				shcoolDistrictDid = cityDid2;
			}
		} else if((classDid && classDid != '-1') || (shcoolDid && shcoolDid != '-1')) {
			if(classDid && classDid != '-1') {
				academyDistrictDid = classDid;
			} else {
				shcoolDistrictDid = shcoolDid;
			}
		}

		console.log('search shcoolDistrictDid', shcoolDistrictDid);
		console.log('search academyDistrictDid', academyDistrictDid);

		$('#student_model').datagrid({
			queryParams: {
				name: name,
				stuNo: stuNo,
				status: status,
				sschoolDid: shcoolDistrictDid,
				academyDid: academyDistrictDid,
				"pageSize": function() {
					return $('#student_model').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#student_model').datagrid("getPager").pagination("options").pageNumber;
				}
			}
		});
	})

	//列表数据
	$('#student_model').datagrid({
		title: '第二课堂学生信息管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: StudentinfoApi.StudentinfoUrl, //获取表格数据时请求的地址
		//url: "public/json/extracurricular.json", //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#student_model').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#student_model').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'username',
				title: '编号',
				width: 150
			}, {
				field: 'nickName',
				title: '昵称',
				width: 100
			}, {
				field: 'phone',
				title: '手机号码',
				width: 80,
				formatter: function(value, row, index) {
					if(value) {
						return value.substr(0, (value.length - 4)) + '****';
					} else {
						return value;
					}
				},
				sortable: true
			}, {
				field: 'realName',
				title: '姓名',
				width: 100
			}, {
				field: 'stuNo',
				title: '学号',
				width: 100
			}, {
				field: 'schoolDid',
				title: '学校id',
				hidden: true,
				width: 200
			}, {
				field: 'schoolName',
				title: '学校名称',
				width: 150
			}, {
				field: 'academyDid',
				title: '院系id',
				hidden: true,
				width: 200
			}, {
				field: 'academyName',
				title: '院系名称',
				width: 150
			}, {
				field: 'status',
				title: '使用状态',
				width: 80,
				formatter: function(value, row, index) {
					if(0 == value) {
						return "<font>待审核</font>";
					}
					if(1 == value) {
						return "<font>已通过</font>";
					}
					if(2 == value) {
						return "<font>不通过</font>";
					}
				}
			}, {
				field: 'totalHour',
				title: '总学时',
				width: 50
			}, {
				field: 'c',
				title: '成绩明细',
				width: 80,
				formatter: function(value, row, index) {
					return '<a  href="Resultsdetail.html?extraStuId=' + row.username + '&totalHour=' + row.totalHour + '" >查看</a>'
				}
			}]
		],
		pagination: true, //如果表格需要支持分页，必须设置该选项为true
		pageNumber: 1,
		pageSize: 500, //表格中每页显示的行数
		pageList: [50, 200, 500],
		rownumbers: true, //是否显示行号
		nowrap: false,
		striped: true, //奇偶行是否使用不同的颜色
		method: 'get', //表格数据获取方式,请求地址是上面定义的url
		//sortName: 'ID', //按照ID列的值排序
		sortOrder: 'desc', //使用倒序排序
		idField: 'id',
		loadMsg: '数据正在努力加载，请稍后...',
		singleSelect: true, //加载数据时显示提示信息
		frozenColumns: [
			[ //固定在表格左侧的栏
				{
					field: 'ck',
					checkbox: true
				},
			]
		],
		onClickRow: function(index, data) {
			//将所有checkbox修改为未选中
			$('#student_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#student_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});
});

//所属院系下拉

//var row = $('#student_model').datagrid('getSelected');

/*有误代码
$('.departments').on('click', function() {
	districtSelect();
})*/

function districtSelect() {
	var selectValue = row.academyDid;
	var parentDid = row.schoolDid;

	$.ajax({
		type: "get",
		url: Qnzs.path + "/common/district/listByParent",
		dataType: "JSON",
		data: {
			'parentDid': parentDid
		},
		success: function(data) {
			if(data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				var districtsList = data.dataList;
				if(districtsList == !null && districtsList.length > 0) {
					$.each(districtsList, function(index, item) {
						if(selectValue && item.did == selectValue) {
							$('.departments').append('<option name="academy" value="' + item.did + '" selected>' + item.districtName + '</option>');
						} else {
							$('.departments').append('<option name="academy" value="' + item.did + '">' + item.districtName + '</option>');
						}
					})
				}
			}
		}
	});
}

//修改信息
function modification(n) {
	var row = $('#student_model').datagrid('getSelected');
	if(row) {
		console.log(row);

		$('#user-add').modal('show');

		$('#realName').val(row.realName);
		$('#stuNo').val(row.stuNo);
		$('#school_name').val(row.schoolName);

		$.ajax({
			type: "get",
			url: Qnzs.path + "/common/district/collegeList",
			dataType: "JSON",
			success: function(data) {
				var collegeList = data.dataList;
				$('#school_name').html('<option value="' + row.schoolDid + '">' + row.schoolName + '</option>');
				$.each(collegeList, function(index, item) {
					$('#school_name').append('<option value="' + item.did + '" >' + item.districtName + '</option> ');
				});
				$('#school_name').val(row.schoolDid);
				if(currentAccount.orgType == 0 || currentAccount.did == '440000') { //超级管理员或省管理员，才可修改学校
					$('#school_name').attr("disabled", false); //不禁用，可下拉选择
				}
			}
		});

		choolid = row.schoolDid;
		$.ajax({
			type: "get",
//			url: Qnzs.path + "/common/district/listByParent?parentDid=" + choolid,
			url: Qnzs.path + "/common/district/getCityByType",
			data: {
				'provinceId': choolid,
				'type': 2
			},
			dataType: "JSON",
			success: function(data) {
				var collegeList = data.dataList;
				$('#departments').html('<option value=""></option>');
				$.each(collegeList, function(index, item) {
					$('#departments').append('<option value="' + item.did + '" >' + item.districtName + '</option> ');
				});
				$('#departments').val(row.academyDid);
			}
		});
	} else {
		$.alert('请选择所修改的目标');
		$('#user-add').modal('hide');
	}
};

$('#btnn_add').click(function() {
	var row = $('#student_model').datagrid('getSelected');
	var extraStuId = row.username;
	var realName = $('#realName').val();
	var stuNo = $('#stuNo').val();
	var academyDid = $('#departments option:selected').val();
	var schoolDid = "";
	if(currentAccount.orgType == 0 || currentAccount.did == '440000') { //超级管理员或省管理员，才可修改学校
		schoolDid = $('#school_name option:selected').val();
	}

	var data = {
		'extraStuId': extraStuId,
		'name': realName,
		'stuNo': stuNo,
		'schoolDid': schoolDid,
		'academyDid': academyDid
	};

	StudentinfoApi.Studentinfoedit(data).then(function(data) {
		if(data.status == 'OK') {
			$.alert(data.msg);
			$('#student_model').datagrid('reload');
			$('#user-add').modal('hide');
		} else {

		};
	});
});

//认定审核
function updateredact(n) {
	var row = $('#student_model').datagrid('getSelected');
	if(row) {
		/*不限制，可重复审核
		if (row.status != 0) {
			$.alert('学生信息已经通过审核!');
			return;
		}*/
		$('#user-editor').modal('show');
	} else {
		$.alert('请先选择需要审核的目标');
		$('#user-editor').modal('hide');
	}
}

$('#btn_editor').click(function() {
	var row = $('#student_model').datagrid('getSelected');
	var stuIdsStr = row.username;
	var isPass = $(".signTimes input[name='rd']:checked").val();
	var advice = $("#steudent_text").val();
	var data = {
		'isPass': isPass,
		'advice': advice,
		'stuIdsStr': stuIdsStr
	};

	StudentinfoApi.StudentinauditBatch(data).then(function(data) {
		if(data.status == 'OK') {
			$.alert(data.msg);
			$('#student_model').datagrid('reload');
			$('#user-editor').modal('hide');
			$('#student_model').datagrid('checkbox:false');
		} else {

		};
	});
});

$.ajax({
	type: "get",
	url: Qnzs.path + "/common/district/collegeList",
	dataType: "JSON",
	success: function(data) {
		var collegeList = data.dataList;
		$.each(collegeList, function(index, item) {
			$('#Schoolpment').append('<option value="' + item.did + '">' + item.districtName + '</option> ')
		});
	}
});

/*
//院系下拉框
function getCoell() {
	var parentDid = $('#Schoolpment option:selected').val();
	$.ajax({
		type: "get",
		url: Qnzs.path + "/common/district/listByParent?parentDid=" + parentDid,
		dataType: "JSON",
		success: function(data) {
			var collegeList = data.dataList;
			$('#department').html('')
			$.each(collegeList, function(index, item) {
				$('#department').append('<option value="' + item.did + '" >' + item.districtName + '</option> ')
			});
		}
	});
}*/

function districtSearch() {
	var html = '';
	if(!currentAccount || !currentAccount.orgType || currentAccount.orgType == 3) {
		//		alert('请使用管理员账户登录');
		//		return;
	} else {
		if(currentAccount.orgType == 0 || currentAccount.did == '440000') { //超级管理员或省管理员，筛选三级区域（区域类型，地市/高校，区县/院系）
//			html += '<div class="form-group sz_height" id="searchDistrict">';
			html += '	<label class="col-sm-1">区域类型</label>';
			html += '	<div class="col-sm-2">';
			html += '		<select class="form-control" id="oidType" onchange="changeOidType(this)">';
			html += '			<option value="-1">请选择</option>';
//			html += '			<option value="1">地市</option>';
			html += '			<option value="2">高校</option>';
			html += '		</select>';
			html += '	</div>';
			html += '	<label class="col-sm-1" id="show1">所在高校</label>';
			html += '	<div class="col-sm-2">';
//			html += '		<select id="cityOid" class="form-control" name="cityOid" onchange="cityOidChange(this)">';
//			html += '		</select>';
			html += '		<select id="shcoolOid" class="form-control" name="shcoolOid" onchange="schoolOidChange(this)">';
			html += '		</select>';
			html += '	</div>';
			html += '	<label class="col-sm-1" id="show2">所在院系</label>';
			html += '	<div class="col-sm-2">';
//			html += '		<select id="areaOid" class="form-control">';
//			html += '			<option value="-1">--区/县--</option>';
//			html += '		</select>';
			html += '		<select id="classOid" class="form-control">';
			html += '			<option value="-1">--分院--</option>';
			html += '		</select>';
			html += '		<input type="hidden" id="areaId" name="areaId">';
			html += '	</div>';
//			html += '	<div class="col-sm-2">';
//			html += '		<button type="button" class="btn btn-warning btn-sm" id="activitie_btn"><span class="glyphicon glyphicon-search"></span>查询</button>';
//			html += '		<button type="button" class="btn btn-info btn-sm" id="btn_del"><span class="glyphicon glyphicon-refresh"></span>清空</button>';
//			html += '	</div>';
//			html += '</div>';

			$('#searchDistrict').empty();
			$('#searchDistrict').append(html);

			getSysAdminOrgDistrict();
		} else if(currentAccount.orgType == 1) { //系统管理员 两级筛选（所在地市/高校，区县/院系）
//			html += '<div class="form-group sz_height" id="searchDistrict">';
//			html += '	<label class="col-sm-1">区域类型</label>';
//			html += '	<div class="col-sm-2">';
//			html += '		<select class="form-control" id="oidType" onchange="changeOidType(this)">';
//			html += '			<option value="">请选择</option>';
//			html += '			<option value="1">地市</option>';
//			html += '			<option value="2">高校</option>';
//			html += '		</select>';
//			html += '	</div>';
//			html += '	<label class="col-sm-1" id="show1"></label>';
			html += '	<label class="col-sm-1" id="show1">所属高校</label>';
			html += '	<div class="col-sm-2">';
			html += '		<select id="cityDistrict" class="form-control" name="cityDistrict" disabled="disabled">';
			html += '			<option value=' + currentAccount.did + '>' + currentAccount.districtName + '</option>';
			html += '		</select>';
			html += '	</div>';
			html += '	<label class="col-sm-1" id="show2">所属院系</label>';
			html += '	<div class="col-sm-2">';
			html += '		<select id="areaDistrict" class="form-control">';
			html += '			<option value="">--请选择--</option>';
			html += '		</select>';
//			html += '		<input type="hidden" id="areaId" name="areaId">';
			html += '	</div>';
//			html += '	<div class="col-sm-2">';
//			html += '		<button type="button" class="btn btn-warning btn-sm" id="activitie_btn"><span class="glyphicon glyphicon-search"></span>查询</button>';
//			html += '		<button type="button" class="btn btn-info btn-sm" id="btn_del"><span class="glyphicon glyphicon-refresh"></span>清空</button>';
//			html += '	</div>';
//			html += '</div>';

			$('#searchDistrict').empty();
			$('#searchDistrict').append(html);

			districtSelect();
		} else if(currentAccount.orgType == 2) { //组织管理员  一级筛选（无筛选查询，显示当前管理员所属区域）
			html += '<div class="form-group sz_height" id="searchDistrict">';
			html += '	<label class="col-sm-1">所属区域</label>';
//			html += '	<div class="col-sm-2">';
//			html += '		<select class="form-control" id="oidType" onchange="changeOidType(this)">';
//			html += '			<option value="">请选择</option>';
//			html += '			<option value="1">地市</option>';
//			html += '			<option value="2">高校</option>';
//			html += '		</select>';
//			html += '	</div>';
//			html += '	<label class="col-sm-1" id="show1"></label>';
			html += '	<div class="col-sm-2">';
			html += '		<select id="cityDistrict" class="form-control" name="cityDistrict" disabled="disabled">';
			html += '			<option value=' + currentAccount.did + '>' + currentAccount.districtName + '</option>';
			html += '		</select>';
			html += '	</div>';
//			html += '	<label class="col-sm-1" id="show2"></label>';
//			html += '	<div class="col-sm-2">';
//			html += '		<select id="areaDistrict" class="form-control">';
//			html += '			<option value="">--请选择--</option>';
//			html += '		</select>';
//			html += '	</div>';
//			html += '	<div class="col-sm-2">';
//			html += '		<button type="button" class="btn btn-warning btn-sm" id="activitie_btn"><span class="glyphicon glyphicon-search"></span>查询</button>';
//			html += '		<button type="button" class="btn btn-info btn-sm" id="btn_del"><span class="glyphicon glyphicon-refresh"></span>清空</button>';
//			html += '	</div>';
			html += '</div>';

			$('#searchDistrict').empty();
			$('#searchDistrict').append(html);

			districtSelect();
		}
	}

//	$('#searchDistrict').append(html);
}

/**
 * 地区下拉框选择
 * @param {Object} selectValue 默认选中值
 */
function districtSelect(obj) {
	$('#areaDistrict').val('');
	$('#cityOid').val('');
	$('#shcoolOid').val('');
	$('#areaOid').val('');
	$('#classOid').val('');

//	var parentDid = $(obj).val();
	var parentDid = $('#cityDistrict').val();
	var selectValue = currentAccount.did;

	$.ajax({
		type: "get",
		/*url: Qnzs.path + "/common/district/listByOrg",
		data: {
			'orgId': orgId
		},*/
		url: Qnzs.path + "/common/district/listByParent",
		data: {
			'parentDid': parentDid
		},
		dataType: "JSON",
		success: function(data) {
			if(data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				var districtsList = data.dataList;
				$.each(districtsList, function(index, item) {
					if(selectValue && item.did == selectValue) {
						$('#areaDistrict').append('<option name="academy" value="' + item.did + '" selected>' + item.districtName + '</option>');
					} else {
						$('#areaDistrict').append('<option name="academy" value="' + item.did + '">' + item.districtName + '</option>');
					}
				});
			}
		}
	});
}

function getSysAdminOrgDistrict() {
	//  三级联动 
	$('#cityOid').hide();
	$('#shcoolOid').hide();
	$('#areaOid').hide();
	$('#classOid').hide();
	$('#zhi-city').hide();
	//标签隐藏
	$('#show1').hide();
	$('#show2').hide();

	$('#cityDistrict').val('');
	$('#areaDistrict').val('');
	$('#cityOid').val('');
	$('#shcoolOid').val('');
	$('#areaOid').val('');
	$('#classOid').val('');

	/*初始化加载地市组织*/
	obj.ajax('/common/district/getCityByType', {
		'provinceId': 440000,
		'type': 1
	}, function(data) {
		if(data) {
			data = data.dataList;
			var selected = false;
			var option = null;
			option = new Option("--市级--", "-1");
			var selects = document.getElementById("cityOid");
			selects.options.add(option);
			for(var i = 0; i < data.length; i++) {
				option = new Option(data[i].districtName, data[i].did, null, selected);
				selects.options.add(option);
			}
			if(!selected) {
				selects.options[0].selected = true;
			}
		} else {
			$("#cityOid").html("<option value='-1'>--暂无可选组织--</option>");
		}
	});

	/*初始化加载高校组织*/
	obj.ajax('/common/district/getShcool', {
		'provinceId': 440000,
		'type': 2
	}, function(data) { //
		//1是地市   2是高校
		if(data) {
			data = data.rows;
			var selected = false;
			var option = null;
			option = new Option("--请选择--", "-1");
			var selects = document.getElementById("shcoolOid");
			//var selects = document.getElementById("cityOid");
			selects.options.add(option);
			for(var i = 0; i < data.length; i++) {
				option = new Option(data[i].districtName, data[i].did, null, selected);
				selects.options.add(option);
			}
			if(!selected) {
				selects.options[0].selected = true;
			}
		} else {
			$("#shcoolOid").html("<option value='-1'>--暂无可选高校组织--</option>");
		}
	});
}

function changeOidType(n) {
// 第二课堂学生列表 只能是高校
//	$('#oidType').val(2);//设置高校类型
//	$('#oidType').attr("disabled", "true");//禁用下拉

	$('#areaDistrict').val('');
	$('#cityOid').val('');
	$('#shcoolOid').val('');
	$('#areaOid').val('');
	$('#classOid').val('');

	$("#spa8").hide();

	var n = $('#oidType').val();
	console.log(n);
	if(n == 1) {
		$('#cityOid').show();
		$('#areaOid').show();

		$('#zhi-city').hide();
		$('#shcoolOid').hide();
		$('#classOid').hide();

		$('#show1').show();
		$('#show2').show();
	}
	if(n == 2) {
		$('#cityOid').hide();
		$('#areaOid').hide();
		$('#zhi-city').hide();

		$('#shcoolOid').show();
		$('#classOid').show();

		$('#show1').show();
		$('#show2').show();
	}
	if(n == 3) {
		$('#cityOid').hide();
		$('#shcoolOid').hide();
		$('#areaOid').hide();
		$('#classOid').hide();

		$('#zhi-city').show();
	}
}

//获取区/县
function cityOidChange(obj) {
	$('#areaDistrict').val('');
	//	$('#cityOid').val('');
	$('#shcoolOid').val('');
	$('#areaOid').val('');
	$('#classOid').val('');

	var pid = $(obj).val();
	var areaHtml = $('#areaOid').html('');
	if(pid != "-1") {
		$.ajax({
			type: 'POST',
			url: base + '/common/district/getCity',
			data: {
				'provinceId': pid
			},
			dataType: 'json',
			success: function(data) {
				if(data) {
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--区/县--", "-1");
					var selects = document.getElementById("areaOid");
					selects.options.add(option);
					for(var i = 0; i < data.length; i++) {
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected) {
						selects.options[0].selected = true;
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
}

//获取高校下级 shcoolOid classOid
function schoolOidChange(obj) {
	$('#areaDistrict').val('');
	$('#cityOid').val('');
//	$('#shcoolOid').val('');
	$('#areaOid').val('');
	$('#classOid').val('');

	var pid = $(obj).val();
	$("#reporterNames").val(pid);
	var areaHtml = $('#classOid').html('');
	if(pid != "-1") {
//		areaHtml.removeAttr("disabled");
		$.ajax({
			type: 'POST',
			url: base + '/common/district/getCity',
			data: {
				'provinceId': pid
			},
			dataType: 'json',
			success: function(data) {
				if(data) {
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--分院--", "-1");
					var selects = document.getElementById("classOid");
					selects.options.add(option);
					for(var i = 0; i < data.length; i++) {
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected) {
						selects.options[0].selected = true;
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
//		$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
	}
}

function districtChange(obj) {
	var parentDid = $('#school_name option:selected').val();
	$.ajax({
		type: "get",
		//		url: Qnzs.path + "/common/district/listByParent?parentDid=" + parentDid,
		url: Qnzs.path + "/common/district/getCityByType",
		data: {
			'provinceId': parentDid,
			'type': 2
		},
		dataType: "JSON",
		success: function(data) {
			var collegeList = data.dataList;
			//			$('#departments').html('<option value=""></option>');
			$('#departments').html('');
			$.each(collegeList, function(index, item) {
				$('#departments').append('<option value="' + item.did + '" >' + item.districtName + '</option>');
			});
		}
	});
}

//导出信息mm
function exportData(n) {
	var pageIndex = $('#student_model').datagrid("getPager").pagination("options").pageNumber;
	var pageSize = $('#student_model').datagrid("getPager").pagination("options").pageSize;
	window.location.href = Qnzs.path + '/activity/extracurricular/bg/student/export?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}