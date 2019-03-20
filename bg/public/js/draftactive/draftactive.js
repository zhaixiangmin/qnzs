var activityURL = "";

var activityId = "";

var orgId = "";
var currentAccount = "";

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

	//活动管理列表
	$('#activitie').datagrid({
		title: '活动草稿', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: DraftactieApi.managementListUrl, //获取表格数据时请求的地址
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
					width: 80
				}, {
					field: 'enrolledNum',
					title: '已报名人数',
					width: 90,
					formatter: function(value, row, index) {
						return '<a  href="active_people.html?activityId=' + row.id + '"  >' + value + '</a>'
					}
				}, {
					field: 'signedNum',
					title: '已签到人数',
					width: 90,
					formatter: function(value, row, index) {
						return '<a  href="signedAccList.html?activityId=' + row.id + '" >' + value + '</a>'
					}
				}, {
					field: 'signTimes',
					title: '可签到次数',
					width: 90,
				}, {
					field: 'money',
					title: '活动费用',
					width: 80
				}, {
					field: 'address',
					title: '活动地点',
					width: 150
				}, {
					field: 'telephone',
					title: '联系电话',
					width: 80
				},
				{
					field: 'b',
					title: '预览',
					width: 60,
					formatter: function(value, row, index) {
						return '<a href="' + Qnzs.domain + '/pc/view/find_active/zhd_xiangqing.html?activityId=' + row.id + '" target="_blank">预览</a>'
					},
				}
				//  , {
				//		          field: 'isRecomend',
				//		          title: '是否推荐',
				//		          width: 50,
				//		          formatter: function(value, row, index) {
				//		          if (1 == row.isRecommend) {
				//		          return "<font>是</font>";
				//		          } else {
				//		          return "<font>否</font>";
				//		          }
				//		          }
				//		          }, {
				//		          field: 'topSite',
				//		          title: '是否全站推荐',
				//		          width: 70,
				//		          formatter: function(value, row, index) {
				//		          if (1 == row.topSite) {
				//		          return "<font>是</font>";
				//		          } else {
				//		          return "<font>否</font>";
				//		          }
				//		          }
				//		          }, {
				//		          field: 'topProvince',
				//		          title: '是否全省推荐',
				//		          width: 70,
				//		          formatter: function(value, row, index) {
				//		          if (1 == row.topProvince) {
				//		          return "<font>是</font>";
				//		          } else {
				//		          return "<font>否</font>";
				//		          }
				//		          }
				//		          }, {
				//		          field: 'available',
				//		          title: '使用状态',
				//		          width: 50,
				//		          formatter: function(value, row, index) {
				//		          if (1 == row.available) {
				//		          return "<font>启用</font>";
				//		          } else {
				//		          return "<font>禁用</font>";
				//		          }

				//		          }
				//		          }, {
				//		          field: 'auditStatus',
				//		          title: '审核状态',
				//		          width: 50,
				//		          formatter: function(value, row, index) {
				//		          if (0 == row.auditStatus) {
				//		          return "<font>待审核</font>";
				//		          }
				//		          if (1 == row.auditStatus) {
				//		          return "<font>审核通过</font>";
				//		          }
				//		          if (2 == row.auditStatus) {
				//		          return "<font>审核不通过</font>";
				//		          }
				//		          if (3 == row.auditStatus) {
				//		          return "<font>已删除</font>";
				//		          }
				//		          if (4 == row.auditStatus) {
				//		          return "<font>已完结</font>";
				//		          }
				//		          }

				//		          }, {
				//		          field: 'actStatus',
				//		          title: '活动状态',
				//		          width: 50,
				//		          formatter: function(value, row, index) {
				//		          if (1 == row.actStatus) {
				//		          return "<font>活动预告</font>";
				//		          }
				//		          if (2 == row.actStatus) {
				//		          return "<font>报名中</font>";
				//		          }
				//		          if (3 == row.actStatus) {
				//		          return "<font>已满员</font>";
				//		          }
				//		          if (4 == row.actStatus) {
				//		          return "<font>报名结束</font>";
				//		          }
				//		          if (5 == row.actStatus) {
				//		          return "<font>活动进行中</font>";
				//		          }
				//		          if (6 == row.actStatus) {
				//		          return "<font>活动结束</font>";
				//		          }
				//		          }
				//		          }, {
				//		          field: 'b',
				//		          title: '预览',
				//		          width: 30,
				//		          formatter: function(value, row, index) {
				//		          return '<a href="' + Qnzs.domain + '/view/find_active/zhd_xiangqing.html?activityId=' + row.id + '" target="_blank">预览</a>'
				//		          },
				//		          }, {
				//		          field: 'a',
				//		          title: '签到二维码',
				//		          width: 60,

				//		          formatter: function(value, row, index) {
				//		          return '<a href="javascript:createQrCode(' + row.id + ');" target="_blank">查看二维码</a>'
				//		          //					
				//		          },
				//		          }
			]
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
		singleSelect: true, //加载数据时显示提示信息
		frozenColumns: [
			[ //固定在表格左侧的栏
				{
					field: 'ck',
					checkbox: true
				},
			]
		],
		onLoadSuccess: function(data) {
			if(data.total == 0) {
				$.messager.alert("提示", "暂无活动数据！");
			}
		},
		onClickRow: function(index, data) {
			//将所有checkbox修改为未选中
			$('#activitie').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#activitie').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});

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
				$('.redact_class').append('<option value="' + item.id + '">' + item.name + '</option>')
			})
		},
		error: function(data) {

		}
	});

	$('.coloedown').click(function() {

		$('.marck_model').hide();
	})

});

//草稿编制

function usereditor(n) {
	$('.show_mode').html('草稿编辑');
	$('#btn_active').hide();
	$('.imgDiv').hide();
	$("#imgDiv").show();

	$('#btn_active_edit').removeAttr("disabled");
	$('#btn_active_officia').removeAttr("disabled");

	$('#staert_time').combo('setText', '');
	$('#staert_time').combo('setValue', '');
	$('#staert_times').combo('setText', '');
	$('#staert_times').combo('setValue', '');
	$('#stop_time').combo('setText', '');
	$('#stop_time').combo('setValue', '');
	$('#stop_times').combo('setText', '');
	$('#stop_times').combo('setValue', '');
	$('#fromadd')[0].reset();
	$('#summernote').summernote('code', '');
	$("#imghead").attr('src', '');
	$('input[name="isAddTemplate"]:checked').prop('checked', '');
	$(".signTimes input[name='rd']:checked").prop('checked', '');
//	$(".titleTag input[name='activity_title_tag']:checked").prop('checked', '');
	
	$('.activt_ullist li').remove();
	
	var row = $('#activitie').datagrid('getSelected');
	row2 = row;
	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-add').modal('show');
		$('.activt_ullist').show();
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/item/list",
			data: {
				'activityId': row.id
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

		DraftactieApi.managementedetail({
			activityId: row.id
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
			$('.signTimes input[name="rd"][value="' + data.data.signTimes + '"]').attr('checked', 'checked'); //签到次数

			$('#longitude_number').val(data.data.longitude); //经度
			$('#latitude_number').val(data.data.latitude); //维度
			$('#Sharing').val(data.data.summary); //活动分享描述:

			$('.redact_category').val(data.data.actType); //活动类型
			$(".redact_class").val(data.data.extracurricularTypeId); //第二课堂类型
			$('#period_room').val(data.data.extracurricularHour); //学时

			//editor.html(data.data.remark); //活动介绍
			$('#summernote').summernote('code', data.data.remark)
			$("#imghead")[0].src = data.data.imageUrl; //图片

			$('input[name="isAddTemplate"][value="' + data.data.isAddTemplate + '"]').attr('checked', 'checked');
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

			var isAdd = data.data.isAddTemplate;

			if(1 == isAdd) {

				$('.templateUrl').show();
			} else {
				$('.templateUrl').hide();

			}

		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要编辑目标');
		$('#user-add').modal('hide');
	}
}

var update_flay = true; //加锁   
$('#btn_active_edit').click(function() { //确定启动发送到后台
	$(this).attr({
		"disabled": "disabled"
	});
	var row = $('#activitie').datagrid('getSelected');
	row2 = row;

	var activityId = row2.id;

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
	var active_peoples = $('#active_people').val(); //人数
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
	if(itemNameArr && itemNameArr.length > 8) {
		$.alert("最多可设置8个自定义报名信息");
		flag = false;
		return;
	}
	var data = {
		'activityId': activityId,
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
		'activityNumber': active_peoples,
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
			url: Qnzs.path + "/activity/offlineActivity/bg/editDraft",
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

//正式发布草稿
$('#btn_active_officia').click(function() { //确定启动发送到后台
	$(this).attr({
		"disabled": "disabled"
	});
	var row = $('#activitie').datagrid('getSelected');
	row2 = row;

	var activityId = row2.id;

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
	var active_peoples = $('#active_people').val(); //人数
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
		$('#btn_active_officia').removeAttr("disabled");
		return;
	} else if(sorttitle.length > 100) {
		$.alert('活动标题最多可输入100字');
		$('#btn_active_officia').removeAttr("disabled");
		return;
	}
	if(!active_phones || active_phones.length <= 0) {
		$.alert('请输入联系电话');
		$('#btn_active_officia').removeAttr("disabled");
		return;
	}
	if(!summary || summary.length <= 0) {
		$.alert('请输入分享描述，该分享描述将在您分享给他人时，出现在分享链接上，以增加活动的点击率。');
		$('#btn_active_officia').removeAttr("disabled");
		return;
	} else if(summary.length > 500) {
		$.alert('分享描述最多可输入500字');
		$('#btn_active_officia').removeAttr("disabled");
		return;
	}
	if(!signTimes || signTimes < 0 || signTimes > 2) {
		$.alert('请选择参与者可签到次数。');
		$('#btn_active_officia').removeAttr("disabled");
		return;
	}
	if(!summary || summary.length <= 0) {
		$.alert('请输入分享描述，该分享描述将在您分享给他人时，出现在分享链接上，以增加活动的点击率。');
		$('#btn_active_officia').removeAttr("disabled");
		return;
	}

	var data = {
		'activityId': activityId,
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
		'activityNumber': active_peoples,
		'activityMoney': active_money,
		'extracurricularTypeId': setelist,
		'signTimes': signTimes,
		'summary': summary,
		'extracurricularHour': extracurricularHour,
		//					'itemIds': arrobj,
		'itemNames': itemNames,
		'itemTypes': itemTypes,
		'isAddTemplate': isAddTemplate,
		'templateUrl': fileId,
		'fileId': fileId,
		'fileName': fileName
	}

	if(update_flay) {
		update_flay = false;

		$.ajax({
			type: "POST",
			url: Qnzs.path + "/activity/offlineActivity/bg/publishDraft",
			data: data,
			dataType: "JSON",
			success: function(data) {
				$('#btn_active_officia').removeAttr("disabled");
				update_flay = true; //解锁

				if(data.status != 'OK') {
					alert(data.msg);
					// $('#btn_active_edit').removeAttr("disabled");
					//  update_flay =true ;  //解锁
					return;
				} else {
					// alert(data.msg);

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

//删除草稿
function delnumber(n) {
	var row = $('#activitie').datagrid('getSelected');
	//  console.log(row);
	if(row) {
		//		admin_del();
		layer.confirm('确定删除此活动？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			var data = {
				'activityId': row.id
			};
			DraftactieApi.removeDraft(data).then(function(data) {
				if(data.status == 'OK') {
					$('#activitie').datagrid('reload');
					//alert(data.msg);
					//					window.location.reload();
				} else {
					alert(data.msg);
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