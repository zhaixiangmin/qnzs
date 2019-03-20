
var activityURL = "";
var activityId = "";
var orgId = "";
var currentAccount = "";
var row2;

$(function() {
	Qnzs.getSessionAccount({}).then(function(data) {
		console.log('Qnzs.getSessionAccount data', data);
		currentAccount = data.account; // 账户信息

		districtSearch();
		//		districtSelect();
	});

	$(".isAddTemplate").click(function() {
		var isPermanentValue = $('input[name="isAddTemplate"]:checked ').val();
		if(isPermanentValue == 0) {
			$("#scmb").hide();
		}
		if(isPermanentValue == 1) {
			$("#scmb").show();
		}
	});

	$('#activitie_btn').click(function() {
		var activityIdQuery = $('#activityIdQuery').val() //活动id
		
		var act_title = $("#act_title").val();
//		debugger
//		var titleTagQuery = $('#titleTagQuery').val(); //选中标注/标签
		
		var contmtont_start = $('#contmtont_start').val();
		var start_time = $("#start_activde").datetimebox('getValue');;
		var end_time = $("#sotp_timeact").datetimebox('getValue');
		
		var districtId = '';
		var districtType = $('#oidType').val(); //区域类型
		var cityDid = $('#cityOid').val(); //所属地市
		var shcoolDid = $('#shcoolOid').val(); //所属高校
		var areaDid = $('#areaOid').val(); //超管所能选的所属区县
		var classDid = $('#classOid').val(); //超管所能选的所属院系
		var cityDid2 = $('#cityDistrict').val(); //系统管理员所能选的所属机构
		var areaDid2 = $('#areaDistrict').val(); //系统管理员所能选的所属机构

		if((areaDid2 && areaDid2 != '-1') || (cityDid2 && cityDid2 != '-1')) {
			if(areaDid2 && areaDid2 != '-1') {
				districtId = areaDid2;
			} else {
				districtId = cityDid2;
			}
		} else if((classDid && classDid != '-1') || (shcoolDid && shcoolDid != '-1')) {
			if(classDid && classDid != '-1') {
				districtId = classDid;
			} else {
				districtId = shcoolDid;
			}
		} else if((areaDid && areaDid != '-1') || (cityDid && cityDid != '-1')) {
			if(areaDid && areaDid != '-1') {
				districtId = areaDid;
			} else {
				districtId = cityDid;
			}
		}

		console.log('search districtId', districtId);
		console.log('search districtType', districtType);

		/*var active_omtion = $('#active_omtion option:selected').val();
				var data = {};*/

		$('#activitie').datagrid({
			queryParams: {
				keywords: act_title,
				beginTime: start_time,
				endTime: end_time,
				districtType: districtType,
				districtId: districtId,
				activityIdQuery: activityIdQuery,
//				titleTag: titleTagQuery,
				status: contmtont_start,
				"pageSize": function() {
					return $('#activitie').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#activitie').datagrid("getPager").pagination("options").pageNumber;
				}
			}
		});
	});

	//清空数据
	$('#btn_del').click(function() {
		$('#act_title').val('');
		$('#start_activde').combo('setText', '');
		$('#sotp_timeact').combo('setText', '');
		$('#oidType').val('');
		$('#cityOid').val('');
		$('#areaOid').val('');
		$('#activityIdQuery').val('');
		$('#contmtont_start').val();
//		$('#titleTagQuery').val('');
		//$('#active_omtion option:selected').attr('selected', false);
	});

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

	//活动管理列表
	$('#activitie').datagrid({
		title: '活动管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: ManagementApi.managementListUrl, //获取表格数据时请求的地址
		//		url: "//169.168.200.19:8080/qnzs/activity/offlineActivity/bg/list", //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#activitie').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#activitie').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'id',
				title: '编号',
				width: 50
			}, {
				field: 'title',
				title: '活动主题',
				width: 100
			}, {
				field: 'createOrgName',
				title: '组织名称',
				width: 100
			}, {
				field: 'createTime',
				title: '发布时间',
				width: 80
			}, {
				field: 'activitiesNumber',
				title: '活动人数',
				width: 50
			}, {
				field: 'enrolledNum',
				title: '已报名人数',
				width: 60,
				formatter: function(value, row, index) {
					return '<a  href="active_people.html?activityId=' + row.id + '"  target="_Blank"  >' + value + '</a>'
				}
			}, {
				field: 'signedNum',
				title: '已签到人数',
				width: 60,
				formatter: function(value, row, index) {
					return '<a  href="signedAccList.html?activityId=' + row.id + '"  target="_Blank">' + value + '</a>'
				}
			}, {
				field: 'signTimes',
				title: '可签到次数',
				width: 60,
			}, {
				field: 'money',
				title: '活动费用',
				width: 50
			}, {
				field: 'address',
				title: '活动地点',
				width: 150
			}, {
				field: 'telephone',
				title: '联系电话',
				width: 80
			}, {
				field: 'isRecomend',
				title: '是否推荐',
				width: 50,
				formatter: function(value, row, index) {
					if(1 == row.isRecommend) {
						return "<font>是</font>";
					} else {
						return "<font>否</font>";
					}
				}
			}, {
				field: 'topSite',
				title: '是否全站推荐',
				width: 70,
				formatter: function(value, row, index) {
					if(1 == row.topSite) {
						return "<font>是</font>";
					} else {
						return "<font>否</font>";
					}
				}
			}, {
				field: 'topProvince',
				title: '是否全省推荐',
				width: 70,
				formatter: function(value, row, index) {
					if(1 == row.topProvince) {
						return "<font>是</font>";
					} else {
						return "<font>否</font>";
					}
				}
			}, {
				field: 'available',
				title: '使用状态',
				width: 50,
				formatter: function(value, row, index) {
					if(1 == row.available) {
						return "<font>启用</font>";
					} else {
						return "<font>禁用</font>";
					}
				}
			}, {
				field: 'auditStatus',
				title: '审核状态',
				width: 50,
				formatter: function(value, row, index) {
					if(0 == row.auditStatus) {
						return "<font>待审核</font>";
					}
					if(1 == row.auditStatus) {
						return "<font>审核通过</font>";
					}
					if(2 == row.auditStatus) {
						return "<font>审核不通过</font>";
					}
					if(3 == row.auditStatus) {
						return "<font>已删除</font>";
					}
					if(4 == row.auditStatus) {
						return "<font>已完结</font>";
					}
				}
			}, {
				field: 'actStatus',
				title: '活动状态',
				width: 50,
				formatter: function(value, row, index) {
					if(1 == row.actStatus) {
						return "<font>活动预告</font>";
					}
					if(2 == row.actStatus) {
						return "<font>报名中</font>";
					}
					if(3 == row.actStatus) {
						return "<font>已满员</font>";
					}
					if(4 == row.actStatus) {
						return "<font>报名结束</font>";
					}
					if(5 == row.actStatus) {
						return "<font>活动进行中</font>";
					}
					if(6 == row.actStatus) {
						return "<font>活动结束</font>";
					}
				}
			}, {
				field: 'b',
				title: '预览',
				width: 30,
				formatter: function(value, row, index) {
					return '<a href="' + Qnzs.domain + '/pc/view/find_active/zhd_xiangqing.html?activityId=' + row.id + '" target="_blank">预览</a>';
				},
			}, {
				field: 'a',
				title: '签到二维码',
				width: 60,
				formatter: function(value, row, index) {
					return '<a href="javascript:createQrCode(' + row.id + ');" target="_blank">查看二维码</a>';
					//					
				},
			}]
		],
		pagination: true, //如果表格需要支持分页，必须设置该选项为true
		pageNumber: 1,
		pageSize: 20, //表格中每页显示的行数
		pageList: [20, 50, 200],
		rownumbers: true, //是否显示行号
		nowrap: false,
		striped: true, //奇偶行是否使用不同的颜色
		method: 'get', //表格数据获取方式,请求地址是上面定义的url
		//sortName: 'ID', //按照ID列的值排序
		sortOrder: 'desc', //使用倒序排序
		idField: 'id',
		scrollbarSize: 18,
		loadMsg: '数据正在努力加载，请稍后...',
		singleSelect: false, //是否单选，false-可多选，true-只可单选
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
			$('#activitie').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#activitie').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});

	/*
	$('#activitie').datagrid('getPager').pagination({
		pageSize: 10,
		pageNumber: 1,
		pageList: [10, 20, 30, 40, 50],
		beforePageText: '第', //页数文本框前显示的汉字   
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
	});
	*/

	//填充下拉类别列表
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/type/listByOrg",
		dataType: "JSON",
		success: function(data) {
			var data = data.dataList;
			$.each(data, function(index, item) {
				$('.redact_category').append('<option value="' + item.id + '">' + item.name + '</option>')
			})
		},
		error: function(data) {

		}
	});

	//填充下拉第二课堂类别列表
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/extracurricularType/listByOrg",
		dataType: "JSON",
		success: function(data) {
			var data = data.dataList;
			$.each(data, function(index, item) {
				$('.redact_class').append('<option value="' + item.id + '">' + item.name + '</option>');
			})
		},
		error: function(data) {

		}
	});

	//活动评论管理列表
	$("#activity_comment_list").click(function() {
		$('.border').hide();
		$('.commentlist').show();
		$('.actlist_hide').hide();

		$('.actlist_show').show();
		$('#actilist').datagrid({
			title: '活动评论管理', //表格名称           iconCls: 'icon-edit',  //图标
			width: 1300, //表格宽度
			height: 520, //表格高度，可指定高度，可自动
			border: true, //表格是否显示边框
			url: ManagementApi.commentManagementListUrl, //获取表格数据时请求的地址
			queryParams: {
				"pageSize": function() {
					return $('#actilist').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#actilist').datagrid("getPager").pagination("options").pageNumber;
				}
			},
			columns: [
				[{
						field: 'activityId',
						title: '编号',
						width: 100
					},
					{
						field: 'activityTitle',
						title: '活动标题',
						width: 200
					}, {
						field: 'commentContent',
						title: '评论内容',
						width: 450
					}, {
						field: 'commentAccName',
						title: '评论人',
						width: 100
					}, {
						field: 'commentTime',
						title: '评论时间',
						width: 200
					}, {
						field: 'status',
						title: '状态',
						width: 100,
						formatter: function(value, row, index) {
							if(0 == value) {
								return "<font>启用</font>";
							}
							if(1 == value) {
								return "<font>禁用</font>";
							}
							if(2 == value) {
								return "<font>删除</font>";
							}
						}
					}, {
						field: 'a',
						title: '进入活动',
						width: 100,
						formatter: function(value, row, index) {
							return '<a href="' + Qnzs.domain + '/pc/view/find_active/zhd_xiangqing.html?activityId=' + row.activityId + '" target="_blank">进入活动</a>';
						}
					}
				]
			],
			pagination: true, //如果表格需要支持分页，必须设置该选项为true
			pageNumber: 1,
			pageSize: 15, //表格中每页显示的行数
			pageList: [5, 10, 15],
			rownumbers: true, //是否显示行号
			nowrap: false,
			striped: true, //奇偶行是否使用不同的颜色
			method: 'get', //表格数据获取方式,请求地址是上面定义的url
			//sortName: 'activityId', //按照ID列的值排序
			// sortOrder: 'desc', //使用倒序排序
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
				$('#actilist').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
				//将这次的checkbox标记为选中
				$('#actilist').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
			}
		});
	});

	/*评论管理搜索*/
	$('#activitie_cometbtn').click(function() {
		var id = $('#cont_ID').val();
		var keywords = $('#cont_title').val();
		var status = $('#contmt_start').val();

		$('#actilist').datagrid({
			queryParams: {
				id: id,
				keywords: keywords,
				status: status,
				"pageSize": function() {
					return $('#actilist').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#actilist').datagrid("getPager").pagination("options").pageNumber;
				}
			}
		});
	});

	/*清空数据*/
	$('#btnconmet_del').click(function() {
		$('#cont_ID').val('');
		$('#cont_title').val('');
		$('#contmt_start').val('');
	});

	//关闭遮罩层
	$('.coloedown').click(function() {
		$('.marck_model').hide();
	})

	//发布活动不限于规则
	$('#guz_Agreement').click(function() {
		$('#march-box').show();
	})
	
	$("#readinger").click(function() {
		$('#march-box').hide();
	})

}) //$(function()结束


//添加活动管理信息
function usdershow(n) {
	$('#user-add').modal('show');
	$('#fromadd')[0].reset();
	$('.imgDiv').show();
	$("#imgDiv").hide();
	$('.show_mode').html('添加活动');
	$('#btn_active').show();
	$('#btn_draft').show();
	$('#btn_active_edit').hide();
	$('#btn_editraft').hide();
	
	$('#summernote').summernote('code', '');
	$("#imghead").attr('src', '');
	$(".signTimes input[name='rd']:checked").prop('checked', '');
	$('input[name="isAddTemplate"]:checked').prop('checked', '');
//	$(".titleTag input[name='activity_title_tag']:checked").prop('checked', '');

	$('.activt_ullist li').remove();
}

$('#btn_active').click(function() {
	/*$(this).attr({
			"disabled": "disabled"
		});*/
	$('.marck_model').show();
	if(!$('#inp_Agreement').is(':checked')) {
		$.alert('请选择用户协议');
		return;
	}

	var sorttitle = $('#active_title').val(); //活动标题
//	debugger
//	var titleTag = $("input[name='activity_title_tag']:checked").map(function () {
//        return $(this).val();
//    }).get().join('#');
	
	var start_time = $('#staert_time').datetimebox('getValue'); //活动报名开始时间
	var start_times = $("#staert_times").datetimebox('getValue'); //活动报名结束时间
	var stop_time = $("#stop_time").datetimebox('getValue'); //活动开始时间
	var stop_times = $("#stop_times").datetimebox('getValue'); //活动结束时间

	console.log('$("#imghead")', $("#imghead"))
	//		var imageUrl = $("#imghead")[0].src; //获取图片
	var imageUrl = $("#imghead").attr('src'); //获取图片
	var imageUrl1 = $("#imghead")[0].currentSrc; //获取图片

	console.log('add', imageUrl);
	var active_phones = $('#active_phone').val(); //联系电话
	var signTimes = $(".signTimes input[name='rd']:checked").val(); //获取签退次数                                           //签退
	var activityNumber = $('#active_people').val(); //人数
	//var areaDid = $('#severadd').val();
	var active_money = $('#active_money').val(); //报名收费
	var active_category = $('.redact_category option:selected').val(); //活动类别
	var setelist = $(".redact_class option:selected").val(); //第二课堂类型
	var extracurricularHour = $('#period_room').val(); //第二课堂学时
	var longitude = $('#longitude_number').val(); //经度
	var latitude = $('#latitude_number').val(); //维度
	var addresses = $('#sever_add').val(); //地址选点
	var summary = $('#Sharing').val(); //活动分享描述
	var introduceContes = $('#summernote').summernote('code'); //活动介绍信息

	var province = $('#province').val(); //省
	var city = $('#city').val(); //市
	var county = $('#county').val(); //县
	//var guz_Agreement=$('#guz_Agreement').is(':checked');//是否选中
	var fileId = $('#fileId').val();
	var fileName = $('#fileName').val();
	var templateUrl = $('#templateUrl').val();
	var isAddTemplate = $('input[name="isAddTemplate"]:checked').val();
	if(isAddTemplate == 1) {
		if(fileId == "") {
			$.alert("请上传报名附件");
			flag = false;
			return;
		}
	} else {
		templateUrl = "";
		fileId = "";
		fileName = "";
	}

	var extracurricularHour = $('#period_room').val(); //学时
	var text_inprtt = document.getElementsByClassName('text_input'); //获取单行文本
	var arrtext = []; //创建文本数组
	var arrobj; //创建字符串
	for(var i = 0; i < text_inprtt.length; i++) { //遍历获取文本数组
		arrtext.push(text_inprtt[i].value);
		arrobj = arrtext.join(",");
	};
	//alert(imageUrl)
	console.log(arrobj);
	
	var flag = true;
	var itemNames = '';
	var itemTypes = '';
	var itemNameArr = new Array();
	var itemTypeArr = new Array();
	$('.itemName').each(function(index, item) {
		var itemName = $(item).val();
		/*if (!itemName) {
			alert("报名信息自定义项名称不能为空");
			flag = false;
			return;
		}*/
		if(itemName && itemName.length > 8) {
			$.alert("自定义报名项的长度不能大于8个中文字符");
			flag = false;
			return;
		}
		itemNames += $(item).val() + ',';
		itemNameArr.push($(item).val());
	});
	$('.itemType').each(function(index, item) {
		itemTypes += $(item).val() + ',';
		itemTypeArr.push($(item).val());
	});
	if(itemNameArr && itemNameArr.length > 8) {
		$.alert("最多可设置8个自定义报名信息");
		flag = false;
		return;
	}

	if(!imageUrl || imageUrl.length <= 0) {
		$.alert('请您至少上传一张活动海报');
		return;
	}

	if(!sorttitle || sorttitle.length <= 0) {
		$.alert('请输入活动标题');
		return;
	} else if(sorttitle.length > 100) {
		$.alert('活动标题最多可输入100字');
		return;
	}

	if(!active_phones || active_phones.length <= 0) {
		$.alert('请输入联系电话');
		return;
	}

	if(!province || province == "请选择省份") {
		$.alert('请选择区域省');
		return;
	}
	if(!city || city == "请选择地级市") {
		$.alert('请选择区域市');
		return;
	}
	if(!county || county == "请选择区、县") {
		$.alert('请选择区域县');
		return;
	}

	if(!summary || summary.length <= 0) {
		$.alert('请输入分享描述，该分享描述将在您分享给他人时，出现在分享链接上，以增加活动的点击率。');
		return;
	} else if(summary.length > 500) {
		$.alert('分享描述最多可输入500字');
		return;
	}

	if(!signTimes || signTimes < 0 || signTimes > 2) {
		$.alert('请选择参与者可签到次数。');
		return;
	}

	//	if(!guz_Agreement){
	//		$.alert('请阅读会被“退回”和“禁用”的活动包括但不限于以下类别规则');
	//		return;
	//	}
	
	var data = {
		'title': sorttitle,
//		'titleTag': titleTag,
		'enrollStartTime': start_time,
		'enrollEndTime': start_times,
		'startTime': stop_time,
		'endTime': stop_times,
		'address': addresses,
		'activityTypeId': active_category,
		'phone': active_phones,
		'imageUrl': imageUrl,
		'introduceContent': introduceContes,
		'longitude': longitude,
		'latitude': latitude,
		'activityNumber': activityNumber,
		'activityMoney': active_money,
		'extracurricularTypeId': setelist,
		'signTimes': signTimes,
		'summary': summary,
		'extracurricularHour': extracurricularHour,
		//'itemIds': arrobj,
		'itemNames': itemNames,
		'itemTypes': itemTypes,
		'isAddTemplate': isAddTemplate,
		'templateUrl': templateUrl,
		'fileId': fileId,
		'fileName': fileName
	};

	if(flag == true) {
		$.ajax({
			type: "POST",
			url: Qnzs.path + "/activity/offlineActivity/bg/add",
			data: data,
			dataType: "JSON",
			success: function(data) {
				console.log(data);
				if(data.status != 'OK') {
					$.alert(data.msg);
					$('.marck_model').hide();
					/*  $('#btn_active').removeAttr("disabled");*/
					return;
				} else {
					var data = data.data;
					$('#QRcodePub').modal('show');
					$('#activitie').datagrid('reload'); //已经刷新
					$('#user-add').modal('hide');
					$('.marck_model').hide();
					$('#qrcode1Pub').empty();
					$('#qrcode1Pub').qrcode({
						width: 200,
						height: 200,
						text: data,
						src: '../../public/images/qnzslogon.jpg'
					});
					$('#fromadd')[0].reset();
					$('#btn_active').show();
					$('#btn_active_edit').hide();
					$('#summernote').summernote('code', '');
					$("#imghead").attr('src', '');
					$(".signTimes input[name='rd']:checked").prop('checked', '');
					$('input[name="isAddTemplate"]:checked').prop('checked', '');
//					$(".titleTag input[name='activity_title_tag']:checked").prop('checked', '');
					//						window.location.reload();//此处不能刷新
				}
			}
		});
	}
});

//保存草稿
$('#btn_draft').click(function() {
	//	var msg = "是否需要继续编辑"; 
	//	if (confirm(msg)==true){ 
	//	return true; 
	//	}

	$.messager.defaults = {
		ok: "继续编辑",
		cancel: "生成草稿"
	};

	$.messager.confirm("操作提示", "是否需要继续编辑？", function(data) {
		if(data) {
			return;
		} else {
			/*$(this).attr({
						"disabled": "disabled"
					});*/
			$('.marck_model').show();
			if(!$('#inp_Agreement').is(':checked')) {
				$.alert('请选择用户协议');
				return;
			}

			var sorttitle = $('#active_title').val(); //活动标题
//			debugger
//			var titleTag = $("input[name='activity_title_tag']:checked").map(function () {
//	            return $(this).val();
//	        }).get().join('#');
			
			var start_time = $('#staert_time').datetimebox('getValue'); //活动报名开始时间
			var start_times = $("#staert_times").datetimebox('getValue'); //活动报名结束时间
			var stop_time = $("#stop_time").datetimebox('getValue'); //活动开始时间
			var stop_times = $("#stop_times").datetimebox('getValue'); //活动结束时间

			console.log('$("#imghead")', $("#imghead"))
			//		var imageUrl = $("#imghead")[0].src; //获取图片
			var imageUrl = $("#imghead").attr('src'); //获取图片
			var imageUrl1 = $("#imghead")[0].currentSrc; //获取图片

			console.log('add', imageUrl);
			var active_phones = $('#active_phone').val(); //联系电话
			var signTimes = $(".signTimes input[name='rd']:checked").val(); //获取签退次数                                           //签退
			var activityNumber = $('#active_people').val(); //人数
			//var areaDid = $('#severadd').val();
			var active_money = $('#active_money').val(); //报名收费
			var active_category = $('.redact_category option:selected').val(); //活动类别
			var setelist = $(".redact_class option:selected").val(); //第二课堂类型
			var extracurricularHour = $('#period_room').val(); //第二课堂学时
			var longitude = $('#longitude_number').val(); //经度
			var latitude = $('#latitude_number').val(); //维度
			var addresses = $('#sever_add').val(); //地址选点
			var summary = $('#Sharing').val(); //活动分享描述
			var introduceContes = $('#summernote').summernote('code'); //活动介绍信息

			var fileId = $('#fileId').val();
			var fileName = $('#fileName').val();
			var templateUrl = $('#templateUrl').val();
			var isAddTemplate = $('input[name="isAddTemplate"]:checked').val();
			if(isAddTemplate == 1) {
				if(fileId == "") {
					$.alert("请上传报名附件");
					flag = false;
					return;
				}
			} else {
				templateUrl = "";
				fileId = "";
				fileName = "";
			}

			var extracurricularHour = $('#period_room').val(); //学时
			var text_inprtt = document.getElementsByClassName('text_input'); //获取单行文本
			var arrtext = []; //创建文本数组
			var arrobj; //创建字符串
			for(var i = 0; i < text_inprtt.length; i++) { //遍历获取文本数组
				arrtext.push(text_inprtt[i].value);
				arrobj = arrtext.join(",");
			};
			//alert(imageUrl)
			console.log(arrobj);
			var flag = true;
			var itemNames = '';
			var itemTypes = '';
			var itemNameArr = new Array();
			var itemTypeArr = new Array();
			$('.itemName').each(function(index, item) {
				var itemName = $(item).val();
				/*if (!itemName) {
					alert("报名信息自定义项名称不能为空");
					flag = false;
					return;
				}*/
				if(itemName && itemName.length > 8) {
					$.alert("自定义报名项的长度不能大于8个中文字符");
					flag = false;
					return;
				}
				itemNames += $(item).val() + ',';
				itemNameArr.push($(item).val());
			});
			$('.itemType').each(function(index, item) {
				itemTypes += $(item).val() + ',';
				itemTypeArr.push($(item).val());
			});
			if(itemNameArr && itemNameArr.length > 8) {
				$.alert("最多可设置8个自定义报名信息");
				flag = false;
				return;
			}

			var data = {
				'title': sorttitle,
//				'titleTag': titleTag,
				'enrollStartTime': start_time,
				'enrollEndTime': start_times,
				'startTime': stop_time,
				'endTime': stop_times,
				'address': addresses,
				'activityTypeId': active_category,
				'phone': active_phones,
				'imageUrl': imageUrl,
				'introduceContent': introduceContes,
				'longitude': longitude,
				'latitude': latitude,
				'activityNumber': activityNumber,
				'activityMoney': active_money,
				'extracurricularTypeId': setelist,
				'signTimes': signTimes,
				'summary': summary,
				'extracurricularHour': extracurricularHour,
				//'itemIds': arrobj,
				'itemNames': itemNames,
				'itemTypes': itemTypes,
				'isAddTemplate': isAddTemplate,
				'templateUrl': templateUrl,
				'fileId': fileId,
				'fileName': fileName
			};

			if(flag == true) {
				$.ajax({
					type: "POST",
					url: Qnzs.path + "/activity/offlineActivity/bg/addDraft",
					data: data,
					dataType: "JSON",
					success: function(data) {
						if(data.status == 'OK') {
							$.alert(data.msg);
							$('.marck_model').hide();
							//window.location.href='../draftactive/draftactive.html'
							/*  $('#btn_active').removeAttr("disabled");*/

							/*$('#QRcodePub').modal('show');*/
							$('#activitie').datagrid('reload'); //已经刷新
							$('#user-add').modal('hide');

							/*$('#qrcode1Pub').empty();
						$('#qrcode1Pub').qrcode({
							width: 200,
							height: 200,
							text: data,
							src: '../../public/images/qnzslogon.jpg'
						});*/
							$('#fromadd')[0].reset();
							$('#btn_active').show();
							$('#btn_draft').show();
							$('#btn_active_edit').hide();
							$('#btn_editraft').hide();
							$('#summernote').summernote('code', '');
							$("#imghead").attr('src', '');
							$(".signTimes input[name='rd']:checked").prop('checked', '');
							$('input[name="isAddTemplate"]:checked').prop('checked', '');
//							$(".titleTag input[name='activity_title_tag']:checked").prop('checked', '');
							//						window.location.reload();//此处不能刷新
						}
					}
				});
			}
		}
	});
});

//保存草稿end

//活动管理内容编辑
function usereditor(n) {
	$('.show_mode').html('编辑活动');
	$('#btn_active').hide();
	$('#btn_draft').hide();
	$('.imgDiv').hide();
	$("#imgDiv").show();
	$('#btn_active_edit').show();
	$('#btn_editraft').show();
	$('#btn_active_edit').removeAttr("disabled");
	$('#fromadd')[0].reset();
	$('#summernote').summernote('code', '');
	$("#imghead").attr('src', '');
	$('input[name="isAddTemplate"]:checked').prop('checked', '');
	$(".signTimes input[name='rd']:checked").prop('checked', '');
//	$(".titleTag input[name='activity_title_tag']:checked").prop('checked', '');
	
	$('.activt_ullist li').remove();
	
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}

	row2 = row;
	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-add').modal('show');
		$('.activt_ullist').show();
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/item/list",
			data: {
				'activityId': row[0].id
			},
			dataType: "JSON",
			success: function(data) {
				var datalist = data.dataList
				if(datalist != null && datalist.length > 0) {
					$('.activt_ullist').html('');
					for(var i = 0; i < datalist.length; i++) {
						var item = datalist[i]
						var ulli = ('<li><input type="text" name="itemName" class="text_input itemName" placeholder="请输入您必须收集的报名者信息字段，例如“单位”、“职业”、“身份证号”等" value="' + item.itemName + '"><input type="hidden" name="itemType" value="1" class="itemType" />   <span class="glyphicon glyphicon-trash btn btn-warning"></span></li>');
						$('.activt_ullist').append(ulli);
					}
				}
			}
		})

		ManagementApi.managementDetail({
			activityId: row[0].id
		}).then(function(data) {
			var enrollStartTime = data.data.enrollStartTime; //报名开始时间
			var enrollEndTime = data.data.enrollEndTime; //报名结束时间
			var startTime = data.data.startTime; //活动开始时间
			var endTime = data.data.endTime; //活动结束时间
			var curStartTime = new Date((new Date(enrollStartTime))).format("yyyy-MM-dd hh:mm:ss");
			var curEndTime = new Date((new Date(enrollEndTime))).format("yyyy-MM-dd hh:mm:ss");
			var curstopTime = new Date((new Date(startTime))).format("yyyy-MM-dd hh:mm:ss");
			var curstopendTime = new Date((new Date(endTime))).format("yyyy-MM-dd hh:mm:ss");

			$('#staert_time').datetimebox('setValue', curStartTime); //报名开始时间
			$("#staert_times").datetimebox('setValue', curEndTime); //报名结束时间
			$("#stop_time").datetimebox('setValue', curstopTime); //活动开始时间
			$("#stop_times").datetimebox('setValue', curstopendTime); //活动结束时间
			
			$('#active_title').val(data.data.title); //标题
//			debugger
//			$('.titleTag input[name="activity_title_tag"][value="' + data.data.titleTag + '"]').prop('checked', 'checked'); //活动标题标注
			
			$('#active_phone').val(data.data.telephone); //电话
			$('#active_people').val(data.data.activitiesNumber); //人数
			$('#active_money').val(data.data.money); //费用
			$('#sever_add').val(data.data.address); //地址
			$('.signTimes input[name="rd"][value="' + data.data.signTimes + '"]').prop('checked', 'checked'); //签到次数

			$('#longitude_number').val(data.data.longitude); //经度
			$('#latitude_number').val(data.data.latitude); //维度
			$('#Sharing').val(data.data.summary); //活动分享描述:

			$('.redact_category').val(data.data.actType); //活动类型
			$(".redact_class").val(data.data.extracurricularTypeId); //第二课堂类型
			$('#period_room').val(data.data.extracurricularHour); //学时

			//editor.html(data.data.remark); //活动介绍
			$('#summernote').summernote('code', data.data.remark)
			$("#imghead")[0].src = data.data.imageUrl; //图片

			$('input[name="isAddTemplate"][value="' + data.data.isAddTemplate + '"]').prop('checked', 'checked');
			$("#fileId").val(data.data.fileId);
			$("#fileName").val(data.data.fileName);
			$("#fileNameShow").text(data.data.fileName);
			$("#templateUrl").val(data.data.url);

			var setelist = data.data.type;
			if('第二课堂' == setelist) {
				$('#class_rooms').show();
			} else {
				$('#class_rooms').hide();
			}

		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要编辑目标');
		$('#user-add').modal('hide');
	}
}

var update_flay = true; //加锁   
$('#btn_active_edit').click(function() { //确定启动发送到后台编辑
	//当datagrid列表中singleSelect为false时是可多选，要获取选中行的row[0]
	var activityIdParam = row2[0].id;

	var sorttitle = $('#active_title').val(); //活动标题
//	debugger
//	var titleTag = $("input[name='activity_title_tag']:checked").map(function () {
//        return $(this).val();
//    }).get().join('#');
	
	var start_time = $('#staert_time').datetimebox('getValue'); //活动报名开始时间
	var start_times = $("#staert_times").datetimebox('getValue'); //活动报名结束时间
	var stop_time = $("#stop_time").datetimebox('getValue'); //活动开始时间
	var stop_times = $("#stop_times").datetimebox('getValue'); //活动结束时间

	var imageUrl = $("#imghead")[0].src; //获取图片

	var active_phones = $('#active_phone').val(); //联系电话
	var signTimes = $(".signTimes input[name='rd']:checked").val(); //获取签退次数                                           //签退
	var activityNumber = $('#active_people').val(); //人数
	var areaDid = $('#severadd').val();
	var active_money = $('#active_money').val(); //报名收费

	var active_category = $('.redact_category').val(); //活动类型
	console.log('active_category', active_category);

	var setelist = $(".redact_class").val(); //第二课堂类型
	var extracurricularHour = $('#period_room').val(); //第二课堂学时
	var longitude = $('#longitude_number').val(); //经度
	var latitude = $('#latitude_number').val(); //维度
	var addresses = $('#sever_add').val(); //地址选点
	var summary = $('#Sharing').val(); //活动分享描述
	var introduceContes = $('#summernote').summernote('code'); //活动介绍信息
	var province = $('#province').val(); //省
	var city = $('#city').val(); //市
	var county = $('#county').val(); //县
	var fileId = $('#fileId').val();
	var fileName = $('#fileName').val();
	var templateUrl = $('#templateUrl').val();
	var isAddTemplate = $('input[name="isAddTemplate"]:checked').val();
	if(isAddTemplate == 1) {
		if(fileId == "") {
			$.alert("请上传报名附件");
			flag = false;
			return;
		}
	} else {
		templateUrl = "";
		fileId = "";
		fileName = "";
	}

	var extracurricularHour = $('#period_room').val(); //学时
	var text_inprtt = document.getElementsByClassName('text_input'); //获取单行文本
	var arrtext = []; //创建文本数组
	var arrobj; //创建字符串
	for(var i = 0; i < text_inprtt.length; i++) { //遍历获取文本数组
		arrtext.push(text_inprtt[i].value);
		arrobj = arrtext.join(",");
	};
	var itemNames = '';
	var itemTypes = '';
	var itemNameArr = new Array();
	var itemTypeArr = new Array();
	$('.itemName').each(function(index, item) {
		var itemName = $(item).val();
		/*if (!itemName) {
			alert("报名信息自定义项名称不能为空");
			flag = false;
			return;
		}*/
		if(itemName && itemName.length > 8) {
			$.alert("自定义报名项的长度不能大于8个中文字符");
			flag = false;
			return;
		}
		itemNames += $(item).val() + ',';
		itemNameArr.push($(item).val());
	});
	$('.itemType').each(function(index, item) {
		itemTypes += $(item).val() + ',';
		itemTypeArr.push($(item).val());
	});
	if(itemNameArr && itemNameArr.length > 9) {
		$.alert("最多可设置8个自定义报名信息");
		flag = false;
		$('#btn_active_edit').removeAttr("disabled");
		return;
	}
	
	if(!province || province == "请选择省份") {
		$.alert('请选择区域省');
		return;
	}
	if(!city || city == "请选择地级市") {
		$.alert('请选择区域市');
		return;
	}
	if(!county || county == "请选择区、县") {
		$.alert('请选择区域县');
		return;
	}
	
	//在表单验证完成后才去禁用提交按钮，否则表编辑单某项未填或有误时 提交按钮也被禁用无法正常操作
	$(this).attr({
		"disabled": "disabled"
	});

	var data = {
		'activityId': activityIdParam,
		'title': sorttitle,
//		'titleTag': titleTag,
		'enrollStartTime': start_time,
		'enrollEndTime': start_times,
		'startTime': stop_time,
		'endTime': stop_times,
		'address': addresses,
		'activityTypeId': active_category,
		'phone': active_phones,
		'imageUrl': imageUrl,
		'introduceContent': introduceContes,
		'longitude': longitude,
		'latitude': latitude,
		'activityNumber': activityNumber,
		'activityMoney': active_money,
		'extracurricularTypeId': setelist,
		'signTimes': signTimes,
		'summary': summary,
		'extracurricularHour': extracurricularHour,
		//					'itemIds': arrobj,
		'itemNames': itemNames,
		'itemTypes': itemTypes,
		'isAddTemplate': isAddTemplate,
		'templateUrl': templateUrl,
		'fileId': fileId,
		'fileName': fileName
	}

	if(update_flay) {
		update_flay = false;

		$.ajax({
			type: "POST",
			url: Qnzs.path + "/activity/offlineActivity/bg/edit",
			data: data,
			dataType: "JSON",
			success: function(data) {
				$('#btn_active_edit').removeAttr("disabled");
				update_flay = true; //解锁
				$.alert(data.msg);
				if(data.status != 'OK') {
					// alert(data.msg);
					// $('#btn_active_edit').removeAttr("disabled");
					//  update_flay =true ;  //解锁
					return;
				} else {
					// alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#user-add').modal('hide');
					$('#fromadd')[0].reset();
					$("#imghead").attr('src', ''); //获取图片

					// update_flay =true ;  //解锁
					$(".signTimes input[name='rd']:checked").prop('checked', ''); //获取签退次数                                           //签退
					$('#summernote').summernote('code', ''); //活动介绍信息
					$('input[name="isAddTemplate"]:checked').prop('checked', '');
//					$(".titleTag input[name='activity_title_tag']:checked").prop('checked', '');
				}
			},
			error: function(data) {
				update_flay = true; //解锁
			}
		});
	}
});

//活动管理内容编辑end

//活动管理审核
function actaudit(n) {
	var row = $('#activitie').datagrid('getSelections'); // 返回选中多行数据
	if(row.length == 0) {
		$.alert('请选择目标');
		return;
	}

	var ids = [];
	for(var i = 0; i < row.length; i++) {
		ids.push(row[i].id);
	}

	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-verify').modal('show');

		//获取启动目标的
		$('#comit_audit').click(function() { //确定启动发送到后台
			var activityIdsStr = ids.toString();
			var data = {
				'activityIdsStr': activityIdsStr,
				'auditStatus': 1
			}
			ManagementApi.managementAuditBatch(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#user-verify').modal('hide');
					//					window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择未审核的目标');
		$('#user-verify').modal('hide');
	}
}

//活动管理退回
function sendback(n) {
	var row = $('#activitie').datagrid('getSelections'); // 返回选中多行数据
	if(row.length == 0) {
		$.alert('请选择目标');
		return;
	}

	var ids = [];
	for(var i = 0; i < row.length; i++) {
		ids.push(row[i].id);
	}

	console.log(ids)
	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-user-back').modal('show');

		//获取启动目标的
		var advice = $('#donw_adave').val();
		var activityIdsStr = ids.toString();

		var data = {
			'activityIdsStr': activityIdsStr,
			'advice': advice
		}
		//获取启动目标的
		$('#user-back').click(function() { //确定启动发送到后台
			ManagementApi.managementRollbackBatch(data).then(function(data) {
				if(data.status == 'OK') {
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#user-user-back').modal('hide');
					//					window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择未审核的目标');
		$('#user-user-back').modal('hide');
	}
}

//活动管理启用
function actstartusing(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length == 0) {
		$.alert('请选择目标');
		return;
	}

	var ids = [];
	for(var i = 0; i < row.length; i++) {
		ids.push(row[i].id);
	}

	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.available == 1) {
			alert('该活动已经启用了，无需再启用');
			return;
		}*/

		$('#user-start').modal('show');

		//获取启动目标的
		$('#userStartBtn').click(function() { //确定启动发送到后台
			var activityIdsStr = ids.toString();
			var data = {
				'activityIdsStr': activityIdsStr
			}
			ManagementApi.managementEnableBatch(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#user-start').modal('hide');
					//					window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择未启用的目标');
		$('#user-start').modal('hide');
	}
}

//活动管理禁用
function actforbidden(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length == 0) {
		$.alert('请选择目标');
		return;
	}

	var ids = [];
	for(var i = 0; i < row.length; i++) {
		ids.push(row[i].id);
	}
	
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.available == 1) {
			alert('此活动已是禁用状态，无需再禁用');
			return;
		}*/

		$('#user-end').modal('show');

		//获取启动目标的
		$('#btn-forbidden').click(function() { //确定启动发送到后台
			var advice = $('#forbi_adave').val();
			var activityIdsStr = ids.toString();
			
			var data = {
				'activityIdsStr': activityIdsStr,
				'advice': advice
			}
			ManagementApi.managementDisableBatch(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#user-end').modal('hide');
					//window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择未禁用的目标');
		$('#user-end').modal('hide');
	}
}

//粉丝推送
function fansPushMsg(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}

	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.available == 1) {
			alert('此活动已是禁用状态，无需再禁用');
			return;
		}*/

		$('#user-fans').modal('show');

		//获取启动目标的

	} else { //没有选中目标执行以下程序
		$.alert('请选择粉丝推送的目标');
		$('#user-fans').modal('hide');
	}
}

$('#btn-fans').click(function() { //确定启动发送到后台
	var row = $('#activitie').datagrid('getSelections');
	var activityIdParam = row[0].id;
	var data = {
		'activityId': activityIdParam
	}
	ManagementApi.managementFansPushMsg(data).then(function(data) {
		if(data.status == 'OK') {
			//alert(data.msg);
			$.alert(data.msg);
			$('#activitie').datagrid('reload');
			$('#user-fans').modal('hide');
			//					window.location.reload();
		} else {
			$.alert(data.msg);
		};
	});
});

//粉丝推送end
//活动管理推荐
function recommend(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.isRecommend == 1) {
			alert('此活动已被推荐了，无需再推荐');
			return;
		}*/

		$('#recommend').modal('show');

		//获取启动目标的
		$('#btn_recommend').click(function() { //确定启动发送到后台
			var activityIdParam = row[0].id;
			var data = {
				'activityId': activityIdParam
			}
			ManagementApi.managementRecommend(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#recommend').modal('hide');
					//					window.location.reload();
				} else {
					alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择未推荐的目标');
		$('#recommend').modal('hide');
	}
}

//活动管理取消推荐
function recommendcancel(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.isRecommend == 1) {
			alert('此活动未被推荐，无需取消推荐');
			return;
		}*/

		$('#recommend-cancel').modal('show');

		//获取启动目标的
		$('#activcancel').click(function() { //确定启动发送到后台
			var activityIdParam = row[0].id;
			var data = {
				'activityId': activityIdParam
			}
			ManagementApi.managementCancelRecommend(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#recommend-cancel').modal('hide');
					//					window.location.reload();
				} else {
					alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择取消推荐的目标');
		$('#recommend-cancel').modal('hide');
	}
}

//活动管理全站推荐
function stationrecommend(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.topSite == 1) {
			alert('此活动已被全站推荐，无需再次全站推荐');
			return;
		}*/

		$('#station-recommend').modal('show');
		//获取启动目标的
		$('#station-recommend').click(function() { //确定启动发送到后台
			var activityIdParam = row[0].id;
			var data = {
				'activityId': activityIdParam
			}
			ManagementApi.managementTopSite(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#station-recommend').modal('hide');
					//					window.location.reload();
				} else {
					alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择全站推荐的目标');
		$('#station-recommend').modal('hide');
	}
}

////活动管理全站取消推荐
function stationcancel(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.topSite == 1) {
			alert('此活动未被全站推荐，无需取消全站推荐');
			return;
		}*/

		$('#station-recommend-cancel').modal('show');

		//获取启动目标的
		$('#btn_recommendcancel').click(function() { //确定启动发送到后台
			var activityIdParam = row[0].id;
			var data = {
				'activityId': activityIdParam
			}
			ManagementApi.managementCancelTopSite(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#station-recommend-cancel').modal('hide');
					//					window.location.reload();
				} else {
					alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择全站推荐的目标');
		$('#station-recommend-cancel').modal('hide');
	}
}

//活动管理省级推荐
function provincerecommend(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.topProvince == 1) {
			alert('此活动已被全省推荐，无需再次全省推荐');
			return;
		}*/

		$('#province-recommend').modal('show');

		//获取启动目标的
		$('#btn_province').click(function() { //确定启动发送到后台
			var activityIdParam = row[0].id;
			var data = {
				'activityId': activityIdParam
			}
			ManagementApi.managementTopProvince(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#province-recommend').modal('hide');
					//					window.location.reload();
				} else {
					alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择省级推荐的目标');
		$('#province-recommend').modal('hide');
	}
}

//活动管理省级取消
function provincecancel(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) { //判断是否选中目标，选中触发模态框
		/*if (row.topProvince == 1) {
			alert('此活动已被全省推荐，无需取消全省推荐');
			return;
		}*/

		$('#province-recommend-cancel').modal('show');

		//获取启动目标的
		$('#btn_provincecancel').click(function() { //确定启动发送到后台
			var activityIdParam = row[0].id;
			var data = {
				'activityId': activityIdParam
			}
			ManagementApi.managementCancelTopProvince(data).then(function(data) {
				if(data.status == 'OK') {
					//alert(data.msg);
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#province-recommend-cancel').modal('hide');
					//					window.location.reload();
				} else {
					alert(data.msg);
				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择省级取消推荐的目标');
		$('#province-recommend-cancel').modal('hide');
	}
}

//删除活动管理
function delnumber(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	//  console.log(row);
	if(row) {
		//		admin_del();
		layer.confirm('确定删除此活动？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			var data = {
				'activityId': row[0].id
			};
			ManagementApi.managementRemove(data).then(function(data) {
				if(data.status == 'OK') {
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					//alert(data.msg);
					//					window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});

		}, function() {
			//			layer.msg('也可以这样', {
			//			time: 200, //20s后自动关闭
			//			btn: ['明白了', '知道了']
			//			});
		});
	} else {
		$.alert('请先选择禁用的目标,再删除？');
	}
}

//活动管理评论启用
function commentstart(n) {
	var row = $('#actilist').datagrid('getSelected');

	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-starter').modal('show');

		//获取启动目标的

	} else { //没有选中目标执行以下程序
		$.alert('请先选择需要启用的评论');
		$('#user-starter').modal('hide');
	}
}

$('#userStartBtner').click(function() { //确定启动发送到后台
	var row = $('#actilist').datagrid('getSelected');
	var commentIdsStr = row.id;
	var data = {
		'commentIdsStr': commentIdsStr
	}
	ManagementApi.commentManagementEnableBatch(data).then(function(data) {
		if(data.status == 'OK') {
			//alert(data.msg);
			$.alert(data.msg);
			$('#actilist').datagrid('reload');
			$('#user-starter').modal('hide');
		} else {

		};
	});
});

//评论管理禁用
function commentstop(n) {
	var row = $('#actilist').datagrid('getSelected');

	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-ender').modal('show');

		//获取启动目标的

	} else { //没有选中目标执行以下程序
		$.alert('请先选择需要禁用的评论');
		$('#user-ender').modal('hide');
	}
}

$('#btn-forbiddener').click(function() { //确定启动发送到后台
	var row = $('#actilist').datagrid('getSelected');

	var commentIdsStr = row.id;
	var data = {
		'commentIdsStr': commentIdsStr
	}
	ManagementApi.commentManagementDisableBatch(data).then(function(data) {
		if(data.status == 'OK') {
			//alert(data.msg);
			$('#actilist').datagrid('reload');
			$('#user-ender').modal('hide');
		} else {

		};
	});
});

//活动管理评论删除
function commentdel(n) {
	var row = $('#actilist').datagrid('getSelected');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) {
		$("#deltete").modal('show');
	} else {
		$.alert('请先选择禁用的目标,再删除？');
	}
}

$('#btn-deltete').click(function() {
	var row = $('#actilist').datagrid('getSelected');
	var data = {
		'commentIdsStr': row.id
	};
	ManagementApi.commentManagementRemoveBatch(data).then(function(data) {
		if(data.status == 'OK') {
			$('#actilist').datagrid('reload');
			$("#deltete").modal('hide');
			//$.alert(data.msg);
		} else {
			//$.alert(data.msg);
		};
	});
});

//活动管理评论删除end
function createQrCode(activityId) {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/offlineActivity/createActivityQrCode",
		data: {
			'activityId': activityId
		},
		success: function(data) {
			if(data.status == 'OK') {
				var url = data.data;
				$('#QRcode').modal('show');
				//				$('#activitie').datagrid('reload');
				$('#user-add').modal('hide');
				$('#qrcode1').empty();
				$('#qrcode1').qrcode({

					width: 200,
					height: 200,
					text: url,
					src: '../../public/images/qnzslogon.jpg'
				});
			} else {
				$.alert(data.msg);
			};
		}
	});
}

function districtSearch() {
	var html = '';

	if(!currentAccount || !currentAccount.orgType || currentAccount.orgType == 3) {
		//		alert('请使用管理员账户登录');
		//		return;
	} else {
		if(currentAccount.orgType == 0 || currentAccount.did == '440000') { //超级管理员，筛选三级区域

			//			html += '<div class="form-group sz_height" id="searchDistrict">';
			html += '	<label class="col-sm-1">区域类型</label>';
			html += '	<div class="col-sm-2">';
			html += '		<select class="form-control" id="oidType" onchange="changeOidType(this)">';
			html += '			<option value="-1">请选择</option>';
			html += '			<option value="1">地市</option>';
			html += '			<option value="2">高校</option>';
			html += '		</select>';
			html += '	</div>';
			html += '	<label class="col-sm-1" id="show1"></label>';
			html += '	<div class="col-sm-2">';
			html += '		<select id="cityOid" class="form-control" name="cityOid" onchange="cityOidChange(this)">';
			html += '		</select>';
			html += '		<select id="shcoolOid" class="form-control" name="shcoolOid" onchange="schoolOidChange(this)">';
			html += '		</select>';
			html += '	</div>';
			html += '	<label class="col-sm-1" id="show2"></label>';
			html += '	<div class="col-sm-2">';
			html += '		<select id="areaOid" class="form-control">';
			html += '			<option value="-1">--区/县--</option>';
			html += '		</select>';
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
		} else if(currentAccount.orgType == 1) { //系统管理员
			//			html += '<div class="form-group sz_height" id="searchDistrict">';
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
			html += '	<label class="col-sm-1" id="show2"></label>';
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
		} else if(currentAccount.orgType == 2) { //组织管理员
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
				$.alert(data.msg);
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

/*******----------------- 3 及联动-------------------*****/
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
		//	areaHtml.removeAttr("disabled");
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
		//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
	}
}
/********* 3级联动 end**********/

function changeOidType(n) {
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

//活动回顾照片
function terminate(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) {
		$('#look_back').modal('show');
		$('#btn_imglook').click(function() {
			var activityIdParam = row[0].id;
			var imgUrls = $('#imgUrl').text();
//			var videoUrl1 = $('#videoUrl').text();
//			var videoUrl = $('#videoUrl').val();
			var data = {
				'activityId': activityIdParam,
				'imgUrls': imgUrls
			}
			$.ajax({
				type: "POST",
				url: Qnzs.path + "/activity/reviewImg/bg/saveBatch",
				data: data,
				dataType: "JSON",
				success: function(data) {
					if(data.status != 'OK') {
						$.alert(data.msg);
						window.location.reload();
						return;
					} else {
						$('#look_back').modal('hide');
						window.location.reload();
					}
				}
			});
		});
	} else {
		$.alert('请选择需要活动目标');
		$('#look_back').modal('hide');
	}
}
//活动回顾照结束

//活动回顾删除照片
function deletimg(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作');
		return;
	}
	
	if(row) {
		$('#imgdelte').modal('show');
		$("#img_list").empty();
		var activityIdParam = row[0].id;
		var data = {
			'activityId': activityIdParam
		}

		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/reviewImg/list",
			data: data,
			dataType: "JSON",
			success: function(data) {
				var data = data.dataList;
				if(data != null && data.length > 0) {
					$.each(data, function(index, item) {
						$("#img_list").append('<li><img data-img="' + item.id + '" src="' + item.imageUrl + '" alt=""> </li>');
					})
//					var videoUrlSrc = data[0].videoUrl;
//					$("#videoUrlEdit").append('<iframe frameborder="0" width="220" height="100" src="' + videoUrlSrc + '" allowFullScreen="true"></iframe>');
				} else {
					$("#img_list").append('<p style="text-align: center;">暂无活动回顾图片</p>');
//					$("#videoUrlEdit").append('<p style="text-align: center;">暂无活动回顾视频</p>');
				}
				$('#img_list li').click(function() {
					$(this).addClass('curlist').siblings('li').removeClass('curlist');
					var imgpurl = $("#img_list .curlist").find('img').attr('data-img');
					//$('#imghead').attr("src", imgpurl);

					$('#btn_imgdelte').click(function() {
						var data = {
							'activityId': activityIdParam,
							'reviewImgIdStrs': imgpurl
						}
						$.ajax({
							type: "get",
							url: Qnzs.path + "/activity/reviewImg/bg/removeBatch",
							data: data,
							dataType: "JSON",
							success: function(data) {
								if(data.status == 'OK') {
									$.alert(data.msg);
									$('#activitie').datagrid('reload');
									$('#imgdelte').modal('hide');
									window.location.reload();
								} else {
									$.alert(data.msg);
									window.location.reload();
								}
							}
						});
					})
				})
			},
			error: function(data) {

			}
		});
	} else {
		$.alert('请选择需要活动目标');
		$('#imgdelte').modal('hide');
	}
}
//活动回顾删除照片end





//活动回顾添加视频
function reviewVideoAdd(n) {
	var row = $('#activitie').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}
	if(row) {
		$('#reviewVideoModal').modal('show');
		$('#reviewVideoBodyShow').show();
		$('#reviewVideoBodySave').hide();
		$('#btn_reviewVideoSavePage').show();
		$('#btn_reviewVideoSubmit').hide();
		$('#btn_reviewVideoRemove').show();
		$("#reviewVideo_list").empty();
		var activityIdParam = row[0].id;
		var data = {
			'activityId': activityIdParam
		}
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/reviewVideo/list",
			data: data,
			dataType: "JSON",
			success: function(data) {
				var data = data.dataList;
				if(data != null && data.length > 0) {
					$.each(data, function(index, item) {
						var videoUrl = item.videoUrl;
						videoUrl = getVideoIdUrl(videoUrl);
						$("#reviewVideo_list").append('<iframe frameborder="0" width="420" height="300" style="margin-right: 20px; margin-bottom: 15px;" src="' + videoUrl + '" allowFullScreen="true"></iframe>');
					});
					$("#btn_reviewVideoSavePage").html("编辑");
					$("#btn_reviewVideoRemove").show();
				} else {
					$("#reviewVideo_list").append('<p style="text-align: center;">暂无活动回顾视频</p>');
					$("#btn_reviewVideoSavePage").html("添加");
					$("#btn_reviewVideoRemove").hide();
				}
				
				/*$('#reviewVideo_list li').click(function() {
					$(this).addClass('curlist').siblings('li').removeClass('curlist');
					var imgpurl = $("#reviewVideo_list .curlist").find('img').attr('data-img');
					//$('#imghead').attr("src", imgpurl);

				});*/
			}
		});

		$('#btn_reviewVideoSavePage').click(function() {
			$.messager.confirm("操作提示", "确定重新编辑吗？", function(data) {
				if(!data) {
					return;
				}
				$('#reviewVideoBodyShow').hide();
				$('#reviewVideoBodySave').show();
				$('#btn_reviewVideoSavePage').hide();
				$('#btn_reviewVideoSubmit').show();
				$('#btn_reviewVideoRemove').hide();
				$("#reviewVideo_list").empty();
			});
		});


		//添加自定单行文本框
		/*$('.videoUrl_add').click(function() {
			$('.videoUrl_showtext').show();
		});*/
		
		var j=0;
		$('.videoUrl_showtext i').click(function() {
			if(j>4){
				alert('最多可添加6个视频链接信息');
				return;
			}
			j++;
			var ulli = ('<li><input type="text" name="videoUrl" class="text_input videoUrl" placeholder="请输入内容"><span class="glyphicon glyphicon-trash btn btn-warning"></span></li>');
			$('.videoUrl_ullist').append(ulli);
		});
		
		//删除自己本身的文本框
		$(document).on('click', '.videoUrl_ullist span', function() {
			$(this).parent().slideUp(500, function() {
				$(this).remove();
			});
		});

		
		
		//添加/编辑的内容提交保存
		$('#btn_reviewVideoSubmit').click(function() {
			//var activityIdParam = row[0].id;
			var flag = true;
			var videoUrls = '';
			var videoUrlArr = new Array();
			var urlReg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
			$('.videoUrl').each(function(index, item) {
				var videoUrl = $(item).val();
				if (!videoUrl) {
					alert("活动回顾视频URL地址不能为空");
					flag = false;
					return;
				}
				if (!urlReg.test(videoUrl)) {
					alert("活动回顾视频URL地址格式不正确");
					flag = false;
					return;
				}
				videoUrls += $(item).val() + ',';
				videoUrlArr.push($(item).val());
			});
			if (!flag) {
				return;
			}
			if(videoUrlArr && videoUrlArr.length > 6) {
				$.alert("最多可设置6个自定义报名信息");
				flag = false;
				return;
			}

			var data = {
				'activityId': activityIdParam,
				'videoUrls': videoUrls
			}
			$.ajax({
				type: "POST",
				url: Qnzs.path + "/activity/reviewVideo/bg/saveBatch",
				data: data,
				dataType: "JSON",
				success: function(data) {
					$.alert(data.msg);
//					$('#activitie').datagrid('reload');
//					$('#reviewVideoModal').modal('hide');
//					window.location.reload();
					if(data.status == 'OK') {
//						$.alert(data.msg);
						$('#activitie').datagrid('reload');
						$('#reviewVideoModal').modal('hide');
						$('.videoUrl').val("");
						$('.videoUrl').text("");
						return;
					} else {
//						$('.videoUrl').val("");
//						$('.videoUrl').text("");
//						$('#reviewVideoModal').modal('hide');
//						window.location.reload();
						return;
					}
				}
			});
		});
		
		

		$('#btn_reviewVideoRemove').click(function() {
			$.messager.confirm("操作提示", "是否确定删除？", function(data) {
				if(!data) {
					return;
				}
				var videoUrls = '';
				$('.videoUrl').each(function(index, item) {
					videoUrls += $(item).val() + ',';
				});
				
				var data = {
					'activityId': activityIdParam
				}
				$.ajax({
					type: "get",
					url: Qnzs.path + "/activity/reviewVideo/bg/removeBatch",
					data: data,
					dataType: "JSON",
					success: function(data) {
						$.alert(data.msg);
						$('#activitie').datagrid('reload');
						$('#reviewVideoModal').modal('hide');
	//					window.location.reload();
						/*if(data.status == 'OK') {
							$('#activitie').datagrid('reload');
							$('#reviewVideoModal').modal('hide');
						} else {
							$.alert(data.msg);
							$('#activitie').datagrid('reload');
							$('#reviewVideoModal').modal('hide');
						}*/
					}
				});
			});
		});
	} else {
		$.alert('请选择需要活动目标');
		$('#reviewVideoModal').modal('hide');
	}
}
//活动回顾添加视频结束

//活动回顾删除视频
//function reviewVideoRemove(n) {
//	var row = $('#activitie').datagrid('getSelections');
//	if(row.length > 1 || row.length <= 0) {
//		$.alert('请选择一条数据操作');
//		return;
//	}
//	
//	if(row) {
//		$('#reviewVideoRemoveModal').modal('show');
//		$("#reviewVideo_list_remove").empty();
//		var activityIdParam = row[0].id;
//		var data = {
//			'activityId': activityIdParam
//		}
//
//		$.ajax({
//			type: "get",
//			url: Qnzs.path + "/activity/reviewVideo/list",
//			data: data,
//			dataType: "JSON",
//			success: function(data) {
//				var data = data.dataList;
//				if(data != null && data.length > 0) {
//					$.each(data, function(index, item) {
//						var videoUrlSrc = item.videoUrl;
//						$("#reviewVideo_list_remove").append('<iframe frameborder="0" width="430" height="300" src="' + videoUrlSrc + '" allowFullScreen="true"></iframe>');
//						/*$("#img_list").append('<li><img data-img="' + item.id + '" src="' + item.imageUrl + '" alt=""> </li>');*/
//					})
//				} else {
//					/*$("#img_list").append('<p style="text-align: center;">暂无活动回顾图片</p>');*/
//					$("#reviewVideo_list_remove").append('<p style="text-align: center;">暂无活动回顾视频</p>');
//				}
//				$('#reviewVideo_list_remove li').click(function() {
//					$(this).addClass('curlist').siblings('li').removeClass('curlist');
//					var imgpurl = $("#reviewVideo_list_remove .curlist").find('img').attr('data-img');
//					//$('#imghead').attr("src", imgpurl);
//
//					$('#btn_reviewVideoRemove').click(function() {
//						var data = {
//							'activityId': activityIdParam,
//							'reviewVideoIdStrs': imgpurl
//						}
//						$.ajax({
//							type: "get",
//							url: Qnzs.path + "/activity/reviewVideo/bg/removeBatch",
//							data: data,
//							dataType: "JSON",
//							success: function(data) {
//								if(data.status == 'OK') {
//									$.alert(data.msg);
//									$('#activitie').datagrid('reload');
//									$('#imgdelte').modal('hide');
//								} else {
//									$.alert(data.msg);
//								}
//							}
//						});
//					})
//				})
//			},
//			error: function(data) {
//
//			}
//		});
//	} else {
//		$.alert('请选择需要活动目标');
//		$('#imgdelte').modal('hide');
//	}
//}
////活动回顾删除视频end




//活动总结回顾视频用 腾讯视频 展示 
function getVideoIdUrl(videoUrl) {
	var videoIdUrl = "";

    if (videoUrl.indexOf('vid=') != -1) {
    	videoIdUrl = videoUrl + '&tiny=0&auto=0&autoplay=false';
    	debugger
    } else if(videoUrl != '' && videoUrl.indexOf('://v.qq.com/x/') != -1){
		var h = '';// https://v.qq.com/x/page/
		var videoId = "";
		var indexOfNum = videoUrl.indexOf('.html');
		if(videoUrl.indexOf('https://v.qq.com/x/') != -1){
			h = videoUrl.substr(19);  //自己上传的 视频
		}else if(videoUrl.indexOf('http://v.qq.com/x/') != -1){
			h = videoUrl.substr(18); 
		}
		
	    if(h.indexOf('page/') != -1){   //自己上传的视频
	    	videoId = videoUrl.substring(24,indexOfNum);
	    } 
	    if(h.indexOf('cover/') != -1){    //腾讯的视频
	    	videoId = h.split('/');
	    	console.log("videoId == " + videoId)
	        videoId = videoId[videoId.length-1].split('.');
	        videoId =videoId[0];
	    }
	    
	    //txp/-无需插件;&autoplay=true-自动播放
	    videoIdUrl = 'https://v.qq.com/txp/iframe/player.html?vid=' + videoId + '&tiny=0&auto=0&autoplay=false';
//    	videoIdUrl = 'https://v.qq.com/iframe/player.html?vid=' + videoId + '&tiny=0&auto=0&autoplay=true';
//		$('.youku-box').show(); //显示视频播放框
//		$('.reviewVideo_list iframe').attr('src','https://v.qq.com/iframe/player.html?vid='+videoId+'&tiny=0&auto=0') 
//		$('.reviewVideo_list iframe').attr('width','100%'); //设置宽度百分百
//		$('.reviewVideo_list iframe').attr('height','400'); //设置宽度百分百
//	}else{
//		$('.youku-box').hide(); //隐藏视频播放框
	}
	return videoIdUrl;
}
//活动总结回顾视频展示 end

