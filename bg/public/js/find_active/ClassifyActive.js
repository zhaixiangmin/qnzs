$(function() {

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


	$('#sample-table').datagrid({
		title: '活动分类', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: ClassifyApi.ClassifyListUrl, //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#sample-table').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#sample-table').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'id',
				title: '编号',
				//hidden:true,
				width: 100
			}, {
				field: 'name',
				title: '类别名称',
				width: 150
			}, {
				field: 'description',
				title: '类别介绍',
				width: 200
			}, {
				field: 'createTime',
				title: '创建时间',
				width: 200,
			}, {
				field: 'createOrgName',
				title: '创建者',
				width: 200
			}, {
				field: 'isUse',
				title: '使用状态',
				width: 100,
				formatter: function(value, row, index) {
					if (0 == value) {
						return "<font>禁用</font>";
					} else {
						return "<font>正常</font>";
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
			$('#sample-table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#sample-table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});

	//分类活动表单查询

	$('#classy_actit').click(function() {
		var keyWord = $('#key_Word').val();
		var isUse = $('#is_Use option:selected').val();

		$('#sample-table').datagrid({
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

	//分类增加管理	
	$('#btnn_add').click(function() {
		var sortnames = $('#sort_names').val();
		var sortdescriptions = $('#sort_inters').val();
		var isUseshows = $('#stor_shows option:selected').val();

		var data = {
			'name': sortnames,
			'description': sortdescriptions,
			'isUse': isUseshows
		};

		if (sortnames != '' && sortnames.length <= 6) {
			ClassifyApi.Classifyadd(data).then(function(data) {
				//alert(data.msg);
				if (data.status == 'OK') {
					$('#sample-table').datagrid('reload');
					$('#user-add').modal('hide');
					window.location.reload();
				} else {

				};
			})
		} else {
			$.alert("第二课堂活动类型名称必须填写，且不能超过6个字。");
		}
	});
})

//活动分类编辑
function updateredact(n) {
	var row = $('#sample-table').datagrid('getSelected');
	if (row) {
		$('#user-editor').modal('show');
		$('#sort_name').val(row.name);
		$('#sort_inter').val(row.description);
		$('#stor_show option:selected').val(row.isUse);
		
	} else {
		alert('请选择一项进行操作');
		$('#user-editor').modal('hide');
	}
};
$('#btn_editor').click(function() {
	       
	    var row = $('#sample-table').datagrid('getSelected');
			var sortname = $('#sort_name').val();
			var sortdescription = $('#sort_inter').val();
			var isUseshow = $('#stor_show option:selected').val();

			var data = {
				'name': sortname,
				'description': sortdescription,
				'activityTypeId': row.id

			};

			if (sortname != '' && sortname.length <= 6) {
				ClassifyApi.Classifyedit(data).then(function(data) {
					if (data.status == 'OK') {
						//alert(data.msg);
						$('#sample-table').datagrid('reload');
						$('#user-editor').modal('hide');
						window.location.reload();
					} else {

					};
				});
			} else {
				$.alert("第二课堂活动类型名称必须填写，且不能超过6个字。");
			}
		});
//活动分类启用
function startusing(n) {
	var row = $('#sample-table').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		$('#user-start').modal('show');

		//获取启动目标的
		
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要启用的目标');
		$('#user-start').modal('hide');
	}
}
$('#userStartBtn').click(function() { //确定启动发送到后台
	  var row = $('#sample-table').datagrid('getSelected');
	var data = {
			'activityTypeId': row.id
		};
			ClassifyApi.Classifyenable(data).then(function(data) {
				if (data.status == 'OK') {
					//alert(data.msg);
					$('#sample-table').datagrid('reload');
					$('#user-start').modal('hide');
					window.location.reload();
				} else {

				};
			});
		});
//活动分类禁用
function forbidden(n) {
	var row = $('#sample-table').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		$('#user-end').modal('show');

		//获取启动目标的
		
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要启用的目标');
		$('#user-end').modal('hide');
	}
}
$('#btn-forbidden').click(function() { //确定启动发送到后台
	
	
	var row = $('#sample-table').datagrid('getSelected');
	
	var data = {
			'activityTypeId': row.id
		};
			ClassifyApi.Classifydisable(data).then(function(data) {
				if (data.status == 'OK') {
					//alert(data.msg);
					$('#sample-table').datagrid('reload');
					$('#user-end').modal('hide');
					window.location.reload();
				} else {

				};
			});
		});
//删除分类管理
function storemove(n) {
	var row = $('#sample-table').datagrid('getSelected');
	//  console.log(row);
	if (row) {
		//		admin_del();
		layer.confirm('您是删除此条信息？删除后将无法恢复！', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			/*layer.msg('的确很重要', {
				time: 200,
				icon: 1
			});*/
			var data = {
				'typeIdsStr': row.id
			};
			ClassifyApi.ClassifydeleteBatch(data).then(function(data) {

				if (data.status == 'OK') {
					//alert(data.msg);
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
		$.alert('先禁用后才能删除哦！');
	}
}