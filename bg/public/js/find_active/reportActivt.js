var ComplainApi = {};
//举报管理列表
ComplainApi.ComplainList = function(data) {
	return Qnzs.ApiProxy('/complaint/bg/list', data, '获取举报管理列表', 1);
};

ComplainApi.ComplainListUrl = Qnzs.path + '/complaint/bg/list';



$(function() {

	$('#report_model').datagrid({
		title: '举报管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: ComplainApi.ComplainListUrl, //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#report_model').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#report_model').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'id',
				title: '编号',
				//hidden: true,
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'module',
				title: '来源板块',
				align: 'center',
				width: $(this).width() * 0.08,
				formatter: function(value, row, index) {
					if (1 == value) {
						return "<font>找活动</font>";
					}
					if (2 == value) {
						return "<font>找咨询</font>";
					}
					if (3 == value) {
						return "<font>找帮助</font>";
					}
					if (4 == value) {
						return "<font>重磅项目</font>";
					}
					if (5 == value) {
						return "<font>青年之家</font>";
					}
				}
			}, {
				/*field: 'createOrgid',*/
				field: 'content',
				title: '举报内容',
				align: 'center',
				width: $(this).width() * 0.2
			}, {
				field: 'url',
				title: '内容链接',
				align: 'center',
				width: 200,
				formatter: function(value, row, index) {
					return "<a target='_blank' href='" + value + "'>点击预览</a>"
				}
			}, {
				field: 'issuer',
				title: '内容发布方',
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'releaseDate',
				title: '内容发布日期',
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'reportCount',
				title: '举报次数',
				align: 'center',
				width: $(this).width() * 0.05
			}, {
				field: 'reportTime',
				title: '举报日期',
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'reportAgainstId',
				title: '举报清单',
				align: 'center',
				width: $(this).width() * 0.08,
				formatter: function(value, row, index) {
					return '<a target="_blank" href="reportAgains.html?activityId=' + row.id + '" >点击查看</a>'
				}
			}]
		],
		pagination: true, //如果表格需要支持分页，必须设置该选项为true
		pageNumber: 1,
		pageSize: 15, //表格中每页显示的行数
		pageList: [5, 10, 15],
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
			$('#report_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#report_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});


	$('#classy_actit').click(function() {
		var keyWords = $('#key_Word').val();
		var module = $('#is_Use option:selected').val();
		var beginTime = $('#staert_time').datetimebox('getValue');
		var endTime = $('#stop_time').datetimebox('getValue');

		$('#report_model').datagrid({
			queryParams: {
				keywords: keyWords,
				module: module,
				beginTime: beginTime,
				endTime: endTime,
				"pageSize": function() {
					return $('#report_model').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#report_model').datagrid("getPager").pagination("options").pageNumber;
				}
			}
		});
	})


	$('#btn_empty').click(function() {
		$('#key_Word').val('');
		$('#staert_time').combo('setText', '');
		$('#staert_time').combo('setValue', '');
		$('#stop_time').combo('setText', '');
		$('#stop_time').combo('setValue', '');
		$('#is_Use option:selected').attr('selected', false);
	})


})