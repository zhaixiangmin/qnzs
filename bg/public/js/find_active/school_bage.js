var bageActiveApi = {};


bageActiveApi.bageActiveList = function(data) {
	return Qnzs.ApiProxy('/schoolBadge/bg/list', data, '获取校徽管理列表', 1);
};

bageActiveApi.bageActiveListUrl = Qnzs.path + '/schoolBadge/bg/list';

/*上传接口*/

bageActiveApi.bageActiveadd = function(data) {
	return Qnzs.ApiProxy('/schoolBadge/bg/add', data, '校徽上传');
};

/*上传修改*/

bageActiveApi.bageActiveedit = function(data) {
	return Qnzs.ApiProxy('/schoolBadge/bg/edit', data, '校徽修改');
};


$(function() {

	/*** 获取权限 ***/
	// var limits = Utils.getQueryString('limit'); // 权限
	// console.log('limits', limits);

	// $('#toolbar li').hide(); // 隐藏所有按钮

	/// if(limits) {
	// limits = limits.split(','); // 将字符串解析成数组
	// for(var i=0; i<limits.length; i++) {
	//    var limit = limits[i];
	//  $('#' + limit).show(); // 显示权限按钮
	//  }
	//}



	$('#poster-table').datagrid({
		title: '校徽管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: bageActiveApi.bageActiveListUrl, //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#poster-table').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#poster-table').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'id',
				title: '编号',
				hidden: true,
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'createTime',
				title: '创建时间',
				width: 200,
			}, {
				field: 'badgeUrl',
				title: '校徽logo',
				align: 'center',
				width: $(this).width() * 0.2,
				formatter: function(value, row, index) {
					return "<img src='" + value + "' height='150px' width='150px'></img>";
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
		sortName: 'ID', //按照ID列的值排序
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
			$('#poster-table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#poster-table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});


	//上传校徽
	$('#btnn_add').click(function() {
		var data = {
			'badgeUrl': imageUrl
		};

		if (imageUrl != '') {
			bageActiveApi.bageActiveadd(data).then(function(data) {
				$.alert(data.msg);
				if (data.status == 'OK') {
					$('#poster-table').datagrid('reload');
					$('#user-add').modal('hide');
					window.location.reload();
				} else {

				};
			})
		} else {
			$.alert('校徽很重要哦，不能为空！');
		}
	});
})

//校徽编辑
function updateredact(n) {
	$('#myModalLabel').hide();
	$("#btnn_add").hide();
	$("#my_ModalLabel").show();
	$("#edit_add").show();

	var row = $('#poster-table').datagrid('getSelected');
	if (row) {
		$('#user-add').modal('show');

		$('#imghead')[0].src = (row.badgeUrl);

		$('#edit_add').click(function() {
			var id = row.id;
			var data = {
				'id': id,
				'badgeUrl': imageUrl
			};

			if (imageUrl != '') {
				bageActiveApi.bageActiveedit(data).then(function(data) {
					if (data.status == 'OK') {
						$.alert(data.msg);
						$('#poster-table').datagrid('reload');
						$('#user-add').modal('hide');
						window.location.reload();
					} else {

					};
				});
			} else {
				$.alert('校徽很重要哦，不能为空！');
			}
		});
	} else {
		$.alert('请选择所编辑的目标');
		$('#user-add').modal('hide');
	}

};