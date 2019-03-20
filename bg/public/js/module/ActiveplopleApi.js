var activityId = getUrlParam('activityId');

var columns = [{ //定义固定列（固定报名信息）
	field: 'id',
	title: '编号',
	width: 100
}, {
	field: 'enrollName',
	title: '报名人',
	width: 150
}, 
/*{
	field: 'gender',
	title: '性别',
	width: 200,
	formatter: function(value, row, index) {
		if (1 == value) {
			return "<font>男</font>";
		}
		if (2 == value) {
			return "<font>女</font>";
		}
		if (3 == value) {
			return "<font>保密</font>";
		}

	}
},*/ 
{
	field: 'telephone',
	title: '电话',
	width: 200
}, {
	field: 'enrollTime',
	title: '报名时间',
	width: 200
}, {
	field: 'enrollMemo',
	title: '备注',
	width: 200
}];



$(function() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/item/list",
		data: {
			'activityId': activityId
		},
		dataType: "JSON",
//		async: true,
		success: function(data) {
			var data = data.dataList;
			$.each(data, function(index, item) {
				columns.push({   //循环加载不定列（自定义报名项）
					field: 'itemId' + (index + 1),
					title: item.itemName,
					width: 100
				});
			});
			loadData(); //先加载出列再去使用datagrid加载数据
		}
	});


	function loadData() {
		$('#statistics_table').datagrid({
			title: '报名人员管理', //表格名称           iconCls: 'icon-edit',  //图标
			width: 1300, //表格宽度
			height: 520, //表格高度，可指定高度，可自动
			border: true, //表格是否显示边框
			url: Qnzs.path + '/activity/enroll/bg/enrolledAcc/list?activityId=' + activityId, //获取表格数据时请求的地址
			columns: [columns],
			queryParams: {
				"pageSize": function() {
					return $('#statistics_table').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#statistics_table').datagrid("getPager").pagination("options").pageNumber;
				}
			},
			/*columns: [
				[{
						field: 'id',
						title: '编号',
						width: 100
					}, {
						field: 'enrollName',
						title: '报名人',
						width: 150
					}, {
						field: 'gender',
						title: '性别',
						width: 200,
						formatter: function(value, row, index) {
							if (1 == value) {
								return "<font>男</font>";
							}
							if (2 == value) {
								return "<font>女</font>";
							}
							if (3 == value) {
								return "<font>保密</font>";
							}

						}
					}, {
						field: 'telephone',
						title: '电话',
						width: 200
					}, {
						field: 'enrollTime',
						title: '报名时间',
						width: 200
					}, {
						field: 'enrollMemo',
						title: '备注',
						width: 200
					},
					cols
				],
//			    cols
			],*/
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
			singleSelect:false, //加载数据时显示提示信息
			frozenColumns: 
				[[ //固定在表格左侧的栏
				   {
					   field: 'ck',
					   checkbox: true
				   },
			   ]],
			   onClickRow: function(index, data) {
				   //将所有checkbox修改为未选中
				   $('#statistics_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
				   //将这次的checkbox标记为选中
				   $('#statistics_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
			   }
		});
	}
});



/*导出下载*/
function startusing(n){
	window.location.href = Qnzs.path+'/activity/enroll/bg/enrolledAcc/export?activityId='+activityId;
}