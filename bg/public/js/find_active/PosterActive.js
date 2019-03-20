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


	$('#poster-table').datagrid({
		title: '海报活动管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: PosterActiveApi.PosterActiveListUrl, //获取表格数据时请求的地址
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
				field: 'title',
				title: '海报标题',
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				/*field: 'createOrgid',*/
				field: 'createOrgName',
				title: '创建组织',
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'createTime',
				title: '创建时间',
				width: 200,
			}, {
				field: 'remark',
				title: '备注说明',
				align: 'center',
				width: $(this).width() * 0.08
			}, {
				field: 'posterUrl',
				title: '海报图片',
				align: 'center',
				width: $(this).width() * 0.08,
				formatter: function(value, row, index) {
					return "<img src='" + value + "' height='100px' width='200px'></img>";
				}
			}, {
				field: 'disable',
				title: '使用状态',
				width: 100,
				formatter: function(value, row, index) {
					if (1 == value) {
						return "<font>禁用</font>";
					} else {
						return "<font>启用</font>";
					}
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

	$('#classy_actit').click(function() {
		var keywords= $('#key_Word').val();
		var module= $('#is_Use option:selected').val();

		$('#poster-table').datagrid({
			queryParams: {
				keyWords: $('#key_Word').val(),
				isUse: $('#is_Use option:selected').val()
			}
		});
	})

	//清空数据
	$('#btn_empty').click(function() {
		$('#key_Word').val('');
		$('#is_Use option:selected').attr('selected', false);
	})


	//	添加海报管理
	$('#btnn_add').click(function() {
		var sortnames = $('#sort_names').val();
		var sortdescriptions = $('#sort_inters').val();
		var isUseshows = $('#stor_shows option:selected').val();
		var data = {
			'posterUrl': imageUrl,
			'title': sortnames,
			'remark': sortdescriptions
		};

		if (imageUrl != '') {
			PosterActiveApi.PosterActiveadd(data).then(function(data) {
				$.alert(data.msg);
				if (data.status == 'OK') {
					$('#poster-table').datagrid('reload');
					$('#user-add').modal('hide');
					window.location.reload();
				} else {

				};
			})
		} else {
			$.alert('海报很重要哦，不能为空！');
		}
	});
})

//活动海报编辑
function updateredact(n) {
	$('#myModalLabel').hide();
	$("#btnn_add").hide();
	$("#my_ModalLabel").show();
	$("#edit_add").show();

	var row = $('#poster-table').datagrid('getSelected');
	if (row) {
		$('#user-add').modal('show');
		$('#sort_names').val(row.title);
		$('#sort_inters').val(row.remark);
		$('#imghead')[0].src = (row.posterUrl);
		$('#stor_show option:selected').val(row.disable);
		$('#edit_add').click(function() {
			var activityPosterId = row.id;
			var sortname = $('#sort_names').val();
			var sortdescription = $('#sort_inters').val();
			var isUseshow = $('#stor_shows option:selected').val();

			var data = {
				'activityPosterId': activityPosterId,
				'posterUrl': imageUrl,
				'title': sortname,
				'remark': sortdescription
			};

			if (imageUrl != '') {
				PosterActiveApi.PosterActiveedit(data).then(function(data) {
					if (data.status == 'OK') {
						$.alert(data.msg);
						$('#poster-table').datagrid('reload');
						$('#user-add').modal('hide');
						window.location.reload();
					} else {

					};
				});
			} else {
				$.alert('海报很重要哦，不能为空！');
			}
		});
	} else {
		$.alert('请选择所编辑的目标');
		$('#user-add').modal('hide');
	}
};

//海报管理启用
function startusing(n) {
	var row = $('#poster-table').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		$('#user-start').modal('show');

		//获取启动目标的
		var data = {
			'activityPosterId': row.id
		};
		$('#userStartBtn').click(function() { //确定启动发送到后台
			PosterActiveApi.PosterActiveenable(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert(data.msg);
					$('#poster-table').datagrid('reload');
					$('#user-start').modal('hide');
					window.location.reload();
				} else {

				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要启用的目标');
		$('#user-start').modal('hide');
	}
}

//活动分类禁用
function forbidden(n) {
	var row = $('#poster-table').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		$('#user-end').modal('show');

		//获取启动目标的
		var data = {
			'activityPosterId': row.id
		};
		$('#btn-forbidden').click(function() { //确定启动发送到后台
			PosterActiveApi.PosterActivedisable(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert(data.msg);
					$('#poster-table').datagrid('reload');
					$('#user-end').modal('hide');
					window.location.reload();
				} else {

				};
			});
		});
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要启用的目标');
		$('#user-end').modal('hide');
	}
}

//海报管理删除		
function storemove(n) {
	var row = $('#poster-table').datagrid('getSelected');
	//  console.log(row);
	if (row) {
		//		admin_del();
		layer.confirm('您是删除此条信息？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			/*layer.msg('的确很重要', {
				time: 200,
				icon: 1
			});*/
			var data = {
				'posterIdsStr': row.id
			};
			PosterActiveApi.PosterActivedeleteBatch(data).then(function(data) {
				if (data.status == 'OK') {
					alert(data.msg);
					window.location.reload();
				} else {

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