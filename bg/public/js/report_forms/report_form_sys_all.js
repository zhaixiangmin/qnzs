	    /*表格初始化*/
	    $('#project-partake').datagrid({ title: '组织数据报表',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1500,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/report/reportFormsSysAllList',   //获取表格数据时请求的地址
	           columns:[[
	             {field:'endDate',title:'统计时间',width:100},
	             {field:'userCount',title:'用户总数',width:100},
	             {field:'userOrgCount',title:'组织用户数',width:100},
	             {field:'orgSocietyCount',title:'社会组织总数',width:100},
	             {field:'orgSocietyProjectCount',title:'社会组织发布活动数',width:100},
	             {field:'orgStudentCount',title:'学生社团总数',width:100},
	             {field:'orgStudentProjectCount',title:'学生社团发布活动数',width:100},
	             {field:'userLoginCount',title:'活跃用户数',width:100},
	             {field:'userWeixinCount',title:'移动端绑定数',width:100},
	             {field:'expertCount',title:'专家数',width:100},
	             {field:'stationCount',title:'青年之家数',width:100},
	             {field:'activityCount',title:'活动发布数',width:100},
	             {field:'activityEnrollCount',title:'活动报名数',width:100},
	             {field:'activityReturnCount',title:'退回活动数',width:100},
	             {field:'projectCount',title:'项目发布数',width:100},
	             {field:'helpCount',title:'求助数',width:100},
	             {field:'helpSolveCount',title:'已解决求助数',width:100},
	             {field:'quesCount',title:'提问数',width:100},
	             {field:'likesCount',title:'点赞数',width:100},
	             {field:'replyCount',title:'评论数',width:100}
	          ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber: 1,
	           pageSize:15,   //表格中每页显示的行数
	           pageList:[15,30,50],
	           rownumbers:true,   //是否显示行号
	           nowrap: false,   
	           striped: true,  //奇偶行是否使用不同的颜色
	           method:'get',   //表格数据获取方式,请求地址是上面定义的url
	           sortName: 'id',  //按照ID列的值排序
	           sortOrder: 'asc',  //使用倒序排序
	           idField: 'id',
	           loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
	           singleSelect:true,
	           frozenColumns: [[  //固定在表格左侧的栏
	                       {field: 'ck', checkbox: true}
	                     ]],
	            onLoadSuccess:function(data){
                                   if (data.total == 0){
                                      $.messager.alert("提示","暂无统计数据！");
                                 }
                          },
	            onClickRow: function(index, data) {
	                //将所有checkbox修改为未选中
	                $('#project-partake').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
	                //将这次的checkbox标记为选中
	                $('#project-partake').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	});
    
	/*清空查询*/
	$('#clearBtn').click(function(event) {
		$('#startTime').datebox('setValue', '');
		$('#endTime').datebox('setValue', '');
	});
	
	//数据过滤
	$('#searchBtn').bind('click', function(event) {
	      	var startTime = $('#startTime').datebox('getValue');
	      	var endTime = $('#endTime').datebox('getValue');
	      	
	      	if(startTime && endTime && (endTime<startTime)){
	      		$.messager.alert("提示","结束时间需大于开始时间！");
	      		return;
	      	}

	      $('#project-partake').datagrid({
	        queryParams: {
	          'startTime': startTime,		//开始时间
	          'endTime': endTime		//结束时间
	        }
	      })
	});
	
//数据导出
$('#exportBtn').bind('click', function(event) {
	var data = $('#project-partake').datagrid('getData'); //tt为表格id
	if (!data.total || data.total < 1) {
		$.messager.alert("提示", "请先查询您要导出的数据！");
		return;
	}

	var startTime = $('#startTime').datebox('getValue');
	var endTime = $('#endTime').datebox('getValue');
	if (startTime && endTime && (endTime < startTime)) {
		$.messager.alert("提示", "结束时间需大于开始时间！");
		return;
	}

	$.messager.confirm("操作提示", "您确定要导出当前条件的查询结果吗？", function(data) {
		if (data) {
			window.location.href = Qnzs.path + '/bg/report/exportFormsSysAllList?startTime=' + startTime + '&endTime=' + endTime;
		} else {
			return;
		}
	});
});


$(function() {
	//日报默认显示前一天时间
	var curr_time = new Date();
	var curr_month = curr_time.getMonth() + 1;
	var curr_day = curr_time.getDate() - 1;
	var strDate = curr_time.getFullYear() + "-";
	strDate += (curr_month > 9 ? curr_month + "-" : "0" + curr_month + "-");
	strDate += (curr_day > 9 ? curr_day : "0" + curr_day);
	// 			strDate += " 00:00:00";
	//默认当天日期
	$('#startTime').datebox('setValue', strDate);
});

