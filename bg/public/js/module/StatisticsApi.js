var StatisticsApi= {};

StatisticsApi.StatisticsList= function (data) {
    return Qnzs.ApiProxy('/activity/publisher/statisticList', data, '获取统计列表');
};

StatisticsApi.StatisticsListUrl= Qnzs.path+'/activity/publisher/bg/statisticList';


//获取列表

$(function(){
	$('#statistics_table').datagrid({
		title: '活动统计', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: StatisticsApi.StatisticsListUrl, //获取表格数据时请求的地址
		columns: [
			[

				{
					field: 'oid',
					title: '编号',
					//hidden: true,隐藏
					align: 'center',
					width: $(this).width() * 0.08
				},

				{
					field: 'fullName',
					title: '主办方全称',
					align: 'center',
					width: $(this).width() * 0.08
				},
				{
					field: 'name',
					title: '主办方简称',
					align: 'center',
					width: $(this).width() * 0.08
				},
				{
					field: 'enrollCount',
					title: '活动参与人数',
					width: $(this).width() * 0.08
				},
				{
					field: 'publishActivityCount',
					title: '发布活动数',
					align: 'center',
					width: $(this).width() * 0.08
				},

				{
					field: 'activityScoreCount',
					title: '参与评分人数',
					align: 'center',
					width: $(this).width() * 0.08
				},
				{
					field: 'activityTotalScore',
					title: '找活动总评分',
					align: 'center',
					width: $(this).width() * 0.08
					
				}

			]
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
			$('#statistics_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#statistics_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});
	
	
	
	
	
	/*清空数据*/
	$('#btn_empty').click(function(){
	
	$('#staert_time').combo('setText','')
	
	$('#stop_time').combo('setText','');
	
})
	
	/*数据查询*/
	
	$('#classy_actit').click(function(){
		
		var  startTime=$('#staert_time').datebox('getValue');
		var endTime=$('#stop_time').datebox('getValue');
		   
		 $('#statistics_table').datagrid({
        queryParams: {
        	
        	startTime:startTime,
        	endTime:endTime
        	
        }
        
      })
		
		
	})
	


})






