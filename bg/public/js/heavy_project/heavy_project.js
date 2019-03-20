////192.168.100.47:8080/qnzs
//HeavyProjectApi.activityListUrl

/*** 获取权限 ***/
var limits = Utils.getQueryString('limit'); // 权限
console.log('limits', limits);
/***  隐藏权限 ***/
$('#toolbar li').hide(); // 隐藏所有按钮

if (limits) {
	limits = limits.split(','); // 将字符串解析成数组
	for (var i = 0; i < limits.length; i++) {
		var limit = limits[i];
		$('.' + limit).show(); // 显示权限按钮
	}
}

//所选操作行
var activityId = "";

/*表格初始化*/
$('#mytb').datagrid({
	title: '活动管理', //表格名称           iconCls: 'icon-edit',  //图标
	width: 1500, //表格宽度
	height: 520, //表格高度，可指定高度，可自动
	border: true, //表格是否显示边框
	url: base + '/bg/project/activityList', //获取表格数据时请求的地址
	columns: [
		[{
				field: 'id',
				title: '编号',
				width: 50
			}, {
				field: 'title',
				title: '项目名称',
				width: 250
			}, {
				field: 'orgName',
				title: '所属组织',
				width: 150
			}, {
				field: 'startTime',
				title: '报名开始时间',
				width: 150
			}, {
				field: 'endTime',
				title: '报名截止时间',
				width: 150
			}, {
				field: 'voteStartTime',
				title: '投票开始时间',
				width: 150
			}, {
				field: 'voteEndTime',
				title: '投票截止时间',
				width: 150
			}, {
				field: 'type',
				title: '活动类型',
				width: 50
			}, {
				field: 'enrollCount',
				title: '报名人数',
				width: 50
			},
			//           {field:'templateName',title:'模板',width:50},
			{
				field: 'status',
				title: '审核状态',
				align: 'center',
				width: 50,
				formatter: function(value, row, index) {
					if (0 == value) {
						return "<font>待审核</font>";
					}
					if (1 == value) {
						return "<font>已通过</font>";
					}
					if (2 == value) {
						return "<font>不通过</font>";
					}
				}
			}, {
				field: 'isTop',
				title: '置顶状态',
				align: 'center',
				width: 50,
				formatter: function(value, row, index) {
					if (0 == value) {
						return "<font>否</font>";
					}
					if (1 == value) {
						return "<font>是</font>";
					}
				}
			}, {
				field: 'externalLinksPc',
				title: '外链项目',
				align: 'center',
				width: 50,
				formatter: function(value, row, index) {
					if ('' == value) {
						return "<font>否</font>";
					}
					if ('' != value) {
						return "<font>是</font>";
					}
				}
			}, {
				field: 'yulan',
				title: '预览',
				align: 'center',
				formatter: formatView,
				width: 50
			}, {
				field: 'skipUrl',
				title: '分享页图片地址',
				width: 50
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
	sortName: 'ID', //按照ID列的值排序
	sortOrder: 'desc', //使用倒序排序
	idField: 'id',
	loadMsg: '数据正在努力加载，请稍后...', //加载数据时显示提示信息
	singleSelect: true,
	frozenColumns: [
		[ //固定在表格左侧的栏
			{
				field: 'ck',
				checkbox: true
			}
		]
	],
	onClickRow: function(index, data) {
		//将所有checkbox修改为未选中
		$('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
		//将这次的checkbox标记为选中
		$('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	}
});

//隐藏列
$("#mytb").datagrid('hideColumn', 'skipUrl');

//预览活动详情
function formatView(val, row, index) {
	var row = $('#mytb').datagrid('getData').rows[index];
	var templateUrl = "../../../pc/view/heavy_project/heavy_project_model1_index.html?activityId=" + row.id;
	if (row.externalLinksPc == '') {
		var templateName = row.templateName;
		/**if (templateName != "model1") {
			templateUrl = "../../../pc/view/heavy_project_model2/zbxm_index_model_2.html?activityId=" + row.id;
		}**/
		if(templateName == "model2"){
			templateUrl = "../../../pc/view/heavy_project_model2/zbxm_index_model_2.html?activityId="+row.id;
		}else if(templateName == "model3"){
			templateUrl = "../../../pc/view/heavy_project_model3/zbxm_index_model_3.html?activityId="+row.id;
		}else if(templateName == "model4"){
			
			templateUrl = "../../../pc/view/heavy_project_model4/zbxm_index_model_4.html?activityId="+row.id;
		}
	} else {
		templateUrl = row.externalLinksPc;
	}
	var html = '<a href="' + templateUrl + '" target="_blank">预览</a>';
	return html;
}
//参赛作品板块显示
/** 测试用**/
/*obj.ajax('/project/activityDetail',{'activityId':21},function(data){
	
	console.log(data);
},function(){})
*/

/*清空查询*/
$('#clearBtn').click(function(event) {
	$('#keyWord,.validatebox-text').val('');
	$('#areaSel option:selected,#auditStatusSel option:selected  ,#oidType option:selected').attr('selected', false);
	$('#cityOid option:selected,#shcoolOid option:selected ,#areaOid option:selected,#classOid option:selected').attr('selected', false);
});

/*数据过滤*/
$('#areaBtn').bind('click', function(event) {

	/*console.log($('#beginTime').datebox('getValue'));   //开始时间
	       console.log($('#endTime').datebox('getValue'));
	       console.log($("#areaSel option:selected").val());
	    	console.log($("#keyWord").val());
	    	console.log($("#auditStatusSel option:selected").val());
	    	console.log($("#areaOid option:selected").val());
	    	console.log($("#classOid option:selected").val());*/

	var orgtype = $("#oidType2 option:selected").val();
	var districtId = "";
	if (orgtype == 1) {
		var areaOrg = $("#areaOid2 option:selected").val();
		if (areaOrg != -1) {
			districtId = areaOrg; //区县
		} else {
			districtId = $("#cityOid2 option:selected").val(); //市级
		}
	} else if (orgtype == 2) {
		var classOrg = $("#classOid2 option:selected").val();
		if (classOrg != -1) {
			districtId = classOrg; //院系
		} else {
			districtId = $("#shcoolOid2 option:selected").val(); //高校
		}
	}
	$('#mytb').datagrid({
		queryParams: {
			title: '活动管理',
			districtId: districtId,
			beginTime: $('#beginTime').datebox('getValue'),
			endTime: $('#endTime').datebox('getValue'),
			keyWord: $("#keyWord").val(),
			status: $("#auditStatusSel option:selected").val()
		}
	})
});

//审核（0-待审核，1-初审通过,2-不通过,3-删除）
function auditedHeavy(status, keyWord) {
	var row = $('#mytb').datagrid('getSelected');
	console.log(row.id);
	if (row) {
		layer.confirm('您确定要（' + keyWord + '）该活动吗？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			layer.closeAll('dialog');
			obj.ajax('/bg/project/auditActivityOne', {
				'activityId': row.id,
				"status": status
			}, function(data) { //执行删除操作
				if (data.status == 'OK') {
					layer.confirm(data.msg);
					$('#mytb').datagrid('reload');
				} else {
					layer.confirm(data.msg);
				}
			}, function() {});
		}, function() {});
	} else {
		$.alert('请选择目标');
	}
}

//0-取消置顶，1-置顶
function topHeavy(isTop, keyWord) {
	var row = $('#mytb').datagrid('getSelected');
	console.log(row.id);
	if (row) {
		layer.confirm('您确定要（' + keyWord + '）该活动吗？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			layer.closeAll('dialog');
			obj.ajax('/bg/project/topActivityOne', {
				'activityId': row.id,
				"isTop": isTop
			}, function(data) { //执行删除操作
				if (data.status == 'OK') {
					layer.confirm(data.msg);
					$('#mytb').datagrid('reload');
				} else {
					layer.confirm(data.msg);
				}
			}, function() {});
		}, function() {});
	} else {
		$.alert('请选择目标');
	}
}

var oid = '001';
var dg_activity;
var ctx = '//www.12355.net';

$('#cityOid').hide();
$('#shcoolOid').hide();
$('#areaOid').hide();
$('#classOid').hide();
//标签隐藏
$('#show1').hide();
$('#show2').hide();

function changeOidType(n) {
	var n = $('#oidType').val();
	console.log(n);
	if (n == 1) {

		$('#cityOid').show();
		$('#areaOid').show();

		$('#shcoolOid').hide();
		$('#classOid').hide();
		$('#show1').show();
		$('#show2').show();
	}
	if (n == 2) {

		$('#cityOid').hide();
		$('#areaOid').hide();

		$('#shcoolOid').show();
		$('#classOid').show();

		$('#show1').show();
		$('#show2').show();

	}


}
/*------三级联动--end------*/

//弹出编辑页面
function updateActivityInfo() {
	var row = $('#mytb').datagrid('getSelected');
	if (row) {
		if(row.externalLinksPc != ''){
			$.alert('请编辑外链项目');
		}else{
			window.location.href = "../heavy_project_sentActivit/zbxm_CMS_detail.html?activityId=" + row.id+"&limits="+limits;
		
			
		}
	} else {
		$.alert('请选择目标');
	}
}


//重磅-新增

function heavy_add(){ 

	window.location.href = "../heavy_project_sentActivit/zbxm_CMS_index.html?limit="+limits;
}


//弹出编辑外链页面
function updateExternalInfo() {
	var row = $('#mytb').datagrid('getSelected');
	if (row) {
		if(row.externalLinksPc == ''){
			$.alert('此项目没有外链');
		}else{
			window.location.href = "../heavy_project_sentActivit/edit_external_links.html?activityId=" + row.id;
		}
	} else {
		$.alert('请选择目标');
	}
}

//省级管理员自定义分享页
function setSkipUrl() {
	var row = $('#mytb').datagrid('getSelected');
	if (row) {
		$('#set_skipurl').modal('show');
		activityId = row.id;
		if(row.skipUrl != ""){
			$('#preview2').attr('src', row.skipUrl); //回显图片
		}else{
			$('#preview2').attr('src', ''); 
		}
		console.log(row)
	} else {
		$.alert('请选择目标');
	}
}

function uploadImage() {
	$('#file').click();
}

//自定义分享页图片上传
$('#Updatefile').fileupload({
	url: base + '/file_upload',
	dataType: 'json',
	autoUpload: true,
	done: function(e, data) {
		//			alert(data.result.url);
		$('#path').val(data.result.url);
		$('#preview2').attr('src', data.result.url); //回显图片
	},
	fail: function() {
		$.alert('出错');
	}
});

$('#addInfoBtn').on("click", function(event) {
	var skipUrl = $('#path').val();
	if (skipUrl == "" || skipUrl == null) {
		$.alert('请先上传图片');
		return;
	}
    
	obj.ajax('/bg/project/setActivitySkipUrl', {
		"activityId": activityId,
		"skipUrl": skipUrl
	}, function(data) { //执行删除操作
		if (data.status == 'OK') {
			$.alert(data.msg);
		} else {
			$.alert(data.msg);
		}
		$('#set_skipurl').modal('hide');
		$('#path').val('');
		$('#preview2').attr('src', '../../images/zbxm_logo.png'); //回显图片
	}, function() {});
});