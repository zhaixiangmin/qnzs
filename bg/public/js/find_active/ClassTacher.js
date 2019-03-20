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


	$('#class_model').datagrid({
		title: '第二课堂类型管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: ClacssTachApi.ClacssTachListUrl, //获取表格数据时请求的地址
		//url: "public/json/extracurricular.json", //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#class_model').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#class_model').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'id',
				title: '编号',
				width: 80
			}, {
				field: 'name',
				title: '类型名称',
				width: 150
			}, {
				field: 'description',
				title: '类型介绍',
				width: 200
			}, {
				field: 'createOrgName',
				title: '创建者',
				width: 200
			}, {
				field: 'createTime',
				title: '创建时间',
				width: 200
			}, {
				field: 'sort',
				title: '显示顺序',
				width: 80
			}, {
				field: 'isUse',
				title: '使用状态',
				width: 100,
				formatter: function(value, row, index) {
					if (1 == value) {
						return "<font>正常</font>";
					} else {
						return "<font>禁用</font>";
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
			$('#class_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#class_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});

	//	分类活动表单查询
	$('#classy_actit').click(function() {
		var keyWord = $('#key_Word').val();
		var isUse = $('#is_Use option:selected').val();

		$('#class_model').datagrid({
			queryParams: {
				keyWords: $('#key_Word').val(),
				isUse: $('#is_Use option:selected').val()
			}
		});
	});

	//	清空数据
	$('#btn_empty').click(function() {
		$('#key_Word').val('');
		$('#is_Use option:selected').attr('selected', false);

	})

	$('#btnn_add').click(function() {
		var sortnames = $('#sort_names').val();
		var sortdescriptions = $('#sort_inters').val();
		var isUseshows = $('#stor_shows option:selected').val();

		var data = {
			'name': sortnames,
			'description': sortdescriptions
		};

		if (sortnames != '' && sortnames.length < 7) {
			ClacssTachApi.ClacssTachadd(data).then(function(data) {
				$.alert(data.msg);
				if (data.status == 'OK') {
					$('#class_model').datagrid('reload');
					$('#user-add').modal('hide');
				} else {

				};
			})
		} else {
			$.alert('活动类型名称必须填写，且不能超过6个字');
		}
	});
})


//第二课堂管理启用
function startusing(n) {
	var row = $('#class_model').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		$('#user-start').modal('show');

		//获取启动目标的
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要启用的目标');
		$('#user-start').modal('hide');
	}
}


$('#userStartBtn').click(function() { //确定启动发送到后台
	
	
	var row = $('#class_model').datagrid('getSelected');
	      var data = {
			'extracurricularTypeId': row.id
		};
		
			ClacssTachApi.ClacssTachenable(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert(data.msg);
					$('#class_model').datagrid('reload');
					$('#user-start').modal('hide');
				} else {

				};
			});
		});
//第二课堂管理禁用
function forbidden(n) {
	var row = $('#class_model').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		$('#user-end').modal('show');

		//获取启动目标的
		
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择需要禁用的目标');
		$('#user-end').modal('hide');
	}
}


$('#btn-forbidden').click(function() { //确定启动发送到后台
	
	var row = $('#class_model').datagrid('getSelected');
	
	var data = {
			'extracurricularTypeId': row.id
		};
			ClacssTachApi.ClacssTachdisable(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert(data.msg);
					$('#class_model').datagrid('reload');
					$('#user-end').modal('hide');
				} else {

				};
			});
		});