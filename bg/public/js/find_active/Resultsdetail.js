var extraStuId = getUrlParam('extraStuId');
var totalHour = getUrlParam('totalHour');

console.log('extraStuId', extraStuId);
console.log('totalHour', totalHour);

$(function() {
	/*** 获取权限 ***/
	var limits = Utils.getQueryString('limit'); // 权限
	console.log('limits', limits);

	$('#toolbar li').hide(); // 隐藏所有按钮

	if (limits) {
		limits = limits.split(','); // 将字符串解析成数组
		for (var i = 0; i < limits.length; i++) {
			var limit = limits[i];
			$('#' + limit).show(); // 显示权限按钮
		}
	}


	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/extracurricular/bg/perExtraTypeHour/list",
		data: {
			'extraStuId': extraStuId
		},
		dataType: "JSON",
		success: function(data) {
			if (data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				var html = '';
				html += '<li><label>总学时:</label><sapn>' + totalHour + '</sapn>&nbsp; &nbsp;&nbsp; &nbsp;</li>';

				var list = data.dataList;
				$.each(list, function(index, item) {
					html += '<li><label>' + item.extracurricularTypeName + ':</label>' + item.perExtraTypeHour + '</sapn>&nbsp; &nbsp;</li>';
				});
				html += '<li onclick="enrollGrade(1)" id="extracurricular_enrollGrade_export">&nbsp; &nbsp;&nbsp; &nbsp;<a href="javascript:void(0);" ><span class="glyphicon glyphicon-share" data-toggle="modal">导出  (每页最多导出500条，超过500请翻页)</span></a></li>';
				$('.nav').append(html);
			}
		},
		error: function(data) {

		}
	});




	//数据清空
	$('#btn_empty').click(function() {
		$('#detail_title').val('');
		$('#staert_time').combo('setText', '')
		$('#stop_time').combo('setText', '');
		$('#detail_sort option:selected').attr('selected', false);
	})


	//数据筛选
	$('#classy_actit').click(function() {
		var title = $('#detail_title').val();
		var startTime = $('#staert_time').datebox('getValue');
		var endTime = $('#stop_time').datebox('getValue');
		var extracurricularTypeId = ('#detail_sort option:selected').val();

		$('#Results_model').datagrid({
			queryParams: {
				keywords: title,
				beginTime: startTime,
				endTime: endTime,
				extracurricularTypeId: extracurricularTypeId
			}
		})
	});

	//列表数据
	$('#Results_model').datagrid({
		title: '第二课堂成绩明细', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: ResultsdetailApi.StudentinfoUrl, //获取表格数据时请求的地址
		//url: "public/json/extracurricular.json", //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#Results_model').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#Results_model').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'enrollId',
				title: '编号',
				width: 80
			}, {
				field: 'title',
				title: '活动名称',
				width: 250
			}, {
				field: 'activityTime',
				title: '活动时间',
				width: 230
			}, {
				field: 'extracurricularTypeName',
				title: '第二课堂类型',
				width: 150
			}, {
				field: 'extracurricularHour',
				title: '学时',
				width: 80
			}, {
				field: 'extracurricularStatus',
				title: '成绩认定状态',
				width: 150,
				formatter: function(value, row, index) {
					if (0 == value) {
						return "<font>待认定</font>";
					} else if (1 == value) {
						return "<font>有效</font>";
					} else if (2 == value) {
						return "<font>无效</font>";
					}
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
		singleSelect: false, //加载数据时显示提示信息
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
			$('#Results_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#Results_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});

	//填充下拉类别列表
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/extracurricularType/list",
		dataType: "JSON",
		success: function(data) {
			var data = data.dataList;
			$.each(data, function(index, item) {
				$('#detail_sort').append('<option value="' + item.id + '">' + item.name + '</option>')
			})
		},
		error: function(data) {

		}
	});

})



//导出成绩
function enrollGrade(n) {
	var pageIndex = $('#Results_model').datagrid("getPager").pagination("options").pageNumber;
	var pageSize = $('#Results_model').datagrid("getPager").pagination("options").pageSize;
	var extraStuId = getUrlParam('extraStuId');

	window.location.href = Qnzs.path + '/activity/extracurricular/bg/enrollGrade/export?extraStuId=' + extraStuId + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}