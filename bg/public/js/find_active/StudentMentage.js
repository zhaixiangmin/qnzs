var limitUrl = ''; // 权限参数Url
/**
 * 跳转到 第二课堂报名人员管理
 * @param id
 */
function goPersonneleMent(id) {
	/*if(!limitUrl) {
		$.alert('正在获取权限，请稍后点击...');
		return;
	}*/

	window.location.href = 'PersonneleMent.html?activityId=' + id + limitUrl;
}

$(function() {

	// 获取菜单列表
	StudentMentagApi.limit({}).then(function(data) {
		console.log('IndexApi.fingMenuByRid data', data);
		var rows = data.rows;
		for (var i = 0; i < rows.length; i++) {
			var item = rows[i];
			if (item.href && item.limt.length > 0 && item.title == '第二课堂报名人员管理') {
				limitUrl = '&limit=' + item.limt.join(',');
			}
		}
		// console.log('limitUrl', limitUrl);
	});


	//清空数据
	$('#btn_empty').click(function() {
		$('#detail_title').val('');
		$('#staert_time').combo('setText', '');

		$('#stop_time').combo('setText', '');
		$('#detail_sort option:selected').attr('selected', false);
	});

	//数据筛选
	$('#classy_actit').click(function() {
		var title = $('#detail_title').val();
		var startTime = $('#staert_time').datebox('getValue');
		var endTime = $('#stop_time').datebox('getValue');

		$('#studentmentage_model').datagrid({
			queryParams: {
				keywords: title,
				beginTime: startTime,
				endTime: endTime
			}
		})
	});


	//列表数据
	$('#studentmentage_model').datagrid({
		title: '第二课堂活动管理', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: StudentMentagApi.StudentinfoUrl, //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#studentmentage_model').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#studentmentage_model').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
			[{
				field: 'id',
				title: '编号',
				width: $(this).width() * 0.05
			}, {
				field: 'title',
				title: '活动标题',
				width: $(this).width() * 0.2
			}, {
				field: 'extracurricularTypeName',
				title: '类型',
				width: $(this).width() * 0.08
			}, {
				field: 'a',
				title: '点击预览',
				width: $(this).width() * 0.05,
				formatter: function(value, row, index) {
					return '<a href="' + Qnzs.domain + '/pc/view/find_active/zhd_xiangqing.html?activityId=' + row.id + '" target="_blank">点击预览</a>'
				}
			}, {
				field: 'createOrgName',
				title: '内容发布方',
				width: $(this).width() * 0.15
			}, {
				field: 'createTime',
				title: '发布日期',
				width: $(this).width() * 0.1
			}, {
				field: 'extracurricularHour',
				title: '可获学时',
				width: $(this).width() * 0.05
			}, {
				field: 'enrolledNum',
				title: '活动报名人数',
				width: $(this).width() * 0.08,
				formatter: function(value, row, index) {
					// return '<a  href="PersonneleMent.html?activityId='+ row.id + '&' + limitUrl + '" >'+value+'</a>'
					return '<a onclick="goPersonneleMent(' + row.id + ')">' + value + '</a>'
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
		sortName: 'id', //按照ID列的值排序
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
			$('#studentmentage_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#studentmentage_model').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});


	//	下拉填充所属组织

	/* $.ajax({
    	type:"get",
    	url:Qnzs.path+"/extracurricular/bg/activity/list",
    	 dataType :"JSON",
    	 success : function(data){

            	var data=data.rows;

            	$.each(data,function(index,item){

            		$('#detail_sort').append('<option value="'+item.id+'">'+item.createOrgName+'</option>')


            	})

            },
            error : function(data){


            }
    });*/

})