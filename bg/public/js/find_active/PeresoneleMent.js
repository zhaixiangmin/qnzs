$(function() {


	// *** 获取权限 ***/
	/* var limits = Utils.getQueryString('limit'); // 权限
    console.log('limits', limits);

    $('#toolbar li').hide(); // 隐藏所有按钮

    if(limits) {
        limits = limits.split(','); // 将字符串解析成数组
        for(var i=0; i<limits.length; i++) {
            var limit = limits[i];
            $('#' + limit).show(); // 显示权限按钮
            }
    }*/


	//列表数据
	$('#personnele_model').datagrid({
		title: '第二课堂报名人员管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: PeresoneleMeneApi.PeresoneUrl, //获取表格数据时请求的地址
		//url: "public/json/extracurricular.json", //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#personnele_model').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#personnele_model').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
					field: 'enrollId',
					title: '编号',
					align: 'center',
					width: $(this).width() * 0.08
				}, {
					field: 'nickName',
					title: '报名人',
					align: 'center',
					width: $(this).width() * 0.08
				}, {
					field: 'phone',
					title: '手机号码',
					align: 'center',
					width: $(this).width() * 0.08
				}, {
					field: 'remark',
					title: '备注',
					align: 'center',
					width: $(this).width() * 0.08
				}, {
					field: 'realName',
					title: '姓名',
					align: 'center',
					width: $(this).width() * 0.08
				}, {
					field: 'stuNo',
					title: '学号',
					align: 'center',
					width: $(this).width() * 0.08
				}, {
					field: 'schoolName',
					title: '学校名称',
					align: 'center',
					width: $(this).width() * 0.1
				}, {
					field: 'academyName',
					title: '院系名称',
					align: 'center',
					width: $(this).width() * 0.1
				},
				/*多余列
				{
					field: 'totalHour',
					title: '学时',
					align : 'center',
					width:$(this).width() * 0.08
				},*/
				{
					field: 'status',
					title: '当前学生信息状态',
					align: 'center',
					width: $(this).width() * 0.08,
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
					field: 'gradeStatus',
					title: '当前活动成绩状态',
					align: 'center',
					width: $(this).width() * 0.08,
					formatter: function(value, row, index) {
						if (0 == value) {
							return "<font>待认定</font>";
						}
						if (1 == value) {
							return "<font>有效</font>";
						}
						if (2 == value) {
							return "<font>无效</font>";
						}
					}
				}
			]
		],
		pagination: true, //如果表格需要支持分页，必须设置该选项为true
		pageNumber: 1,
		pageSize: 500, //表格中每页显示的行数
		pageList: [50, 200, 500],
		rownumbers: true, //是否显示行号
		nowrap: false,
		striped: true, //奇偶行是否使用不同的颜色
		method: 'get', //表格数据获取方式,请求地址是上面定义的url
		//sortName: 'enrollId', //按照ID列的值排序
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
			$('#personnele_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#personnele_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});


	//清空数据
	$('#btn_empty').click(function() {

		$('#student_name').val('');
		$('#student_number').val('');
		$('#department').val('');
		$('#condition').val('');
		$('#Schoolpment').val('');
	})

	//数据筛选
	$('#classy_actit').click(function() {
		var name = $('#student_name').val();
		var stuNo = $('#student_number').val();
		var Status = $('#condition').val();
		var schoolDid = $('#Schoolpment').val();
		var academy = $('#department').val();
		$('#personnele_model').datagrid({
			queryParams: {
				name: name,
				stuNo: stuNo,
				status: status,
				schoolDid: schoolDid,
				academy: academy,
				"pageSize": function() {
					return $('#personnele_model').datagrid("getPager").pagination("options").pageSize;
				},
				"pageIndex": function() {
					return $('#personnele_model').datagrid("getPager").pagination("options").pageNumber;
				}
			}
		});
	})

})

//成绩认定审核
function modification(n) {
	var row = $('#personnele_model').datagrid('getSelected');
	if (row) {
		$('#user-editor').modal('show');
		$('#btn_editor').click(function() {
			var enrollIdsStr = row.enrollId;
			var isPass = $(".signTimes input[name='rd']:checked").val();
			var advice = $("#steudent_text").val();
			var data = {
				'enrollIdsStr': enrollIdsStr,
				'isValid': isPass,
				'advice': advice
			};

			PeresoneleMeneApi.PeresoneleMeneaconfirmBatch(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert(data.msg);
					$('#personnele_model').datagrid('reload');
					$('#user-editor').modal('hide');
				} else {

				};
			});
		});
	} else {
		alert('请选择需要认定审核的目标');
		$('#user-editor').modal('hide');
	}
}


$.ajax({
	type: "get",
	url: Qnzs.path + "/common/district/collegeList",
	dataType: "JSON",
	success: function(data) {
		var collegeList = data.dataList;
		$.each(collegeList, function(index, item) {
			$('#Schoolpment').append('<option value="' + item.did + '">' + item.districtName + '</option> ')
		});
	}
});
//院系下拉框



function getCoell() {
	var parentDid = $('#Schoolpment option:selected').val();
	$.ajax({
		type: "get",
		url: Qnzs.path + "/common/district/listByParent?parentDid=" + parentDid,
		dataType: "JSON",
		success: function(data) {
			var collegeList = data.dataList;
			$('#department').html('')
			$.each(collegeList, function(index, item) {
				$('#department').append('<option value="' + item.did + '" >' + item.districtName + '</option> ')
			});
		}
	});
}


/*导出下载*/
function updateredact(n) {
	var pageIndex = $('#personnele_model').datagrid("getPager").pagination("options").pageNumber;
	var pageSize = $('#personnele_model').datagrid("getPager").pagination("options").pageSize;

	window.location.href = Qnzs.path + '/activity/extracurricular/bg/enrollAcc/export?activityId=' + activityId + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
}