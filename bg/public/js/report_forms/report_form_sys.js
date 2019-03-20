	    /*表格初始化*/
	    $('#project-partake').datagrid({ title: '组织数据报表',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1500,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/report/reportFormsSysList',   //获取表格数据时请求的地址
	           columns:[[
	             {field:'beginDate',title:'统计开始时间',width:100,
	                formatter: function(value,row,index){
			        		return value.substr(0,11);
			        }
	             },
	             {field:'endDate',title:'统计截止时间',width:100,
	                formatter: function(value,row,index){
			        		return value.substr(0,11);
			        }
	             },
	             {field:'ques100Reply',title:'找咨询板块的评论量超过100的问题数',width:100},
	             {field:'ques100Likes',title:'找咨询板块的点赞数超过100的问题数',width:100},
	             {field:'activity100Reply',title:'找活动板块的评论量超过100的活动数',width:100},
	             {field:'activity100Enroll',title:'找活动板块的活动报名人数超过100的活动数',width:100},
	             {field:'quesOrgCount',title:'平台各级组织用户、线下服务站管理员提问的总数',width:100},
	             {field:'replyOrgCount',title:'平台各级组织用户、线下服务站管理员回复的总数',width:100},
	             {field:'replyOrgQuesCount',title:'平台各级组织用户、线下服务站管理员所有提问下的评论数',width:100},
	             {field:'replyOrgHelpCount',title:'平台各级组织用户、线下服务站管理员所有发布的求助、活动下的评论数',width:100},
	             {field:'userCount',title:'注册用户数',width:100},
	             {field:'userLoginCount',title:'活跃用户数',width:100},
	             {field:'userWeixinCount',title:'用户绑定数',width:100},
	             {field:'helpCount',title:'受理求助数',width:100},
	             {field:'helpSolveCount',title:'求助解决数',width:100},
	             {field:'helpPostCount',title:'求助评论数',width:100},
	             {field:'activityCount',title:'活动发布数',width:100},
	             {field:'activityReturnCount',title:'活动退回数',width:100},
	             {field:'activityEnrollCount',title:'活动报名数',width:100},
	             {field:'qnzjActivityCount',title:'青年之家活动发布数',width:100},
	             {field:'qnzjActivityEnrollCount',title:'青年之家活动报名数',width:100},
	             {field:'qnzjServiceCount',title:'青年之家线下服务申请数',width:100},
	             {field:'quesCount',title:'提问数',width:100},
	             {field:'quesLikesCount',title:'点赞数',width:100},
	             {field:'quesReplyCount',title:'评论数',width:100}
	          ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber: 1,
	           pageSize: 15,   //表格中每页显示的行数
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
	  setSelectChecked('reportType', '周');
	  $('.startTime').css("display","none");
	  $('#startTimeWeek').css("display","block");
	});
	
	//数据过滤
	$('#searchBtn').bind('click', function(event) {
	      var startTime = getReportFormsTime();

	      $('#project-partake').datagrid({
	        queryParams: {
	          'reportType': $("#reportType option:selected").val(),     //类型
	          'startTime': startTime		//开始时间
	        }
	      })
	});
	
//数据导出
$('#exportBtn').bind('click', function(event) {
	var data=$('#project-partake').datagrid('getData');//tt为表格id
	if(!data.total || data.total < 1){
		$.messager.alert("提示", "请先查询您要导出的数据！");
		return;
	}

	var startTime = getReportFormsTime();

	$.messager.confirm("操作提示", "您确定要导出当前条件的查询结果吗？", function(data) {
		if (data) {
			var reportType = $("#reportType option:selected").val(); //类型
			var keyWord = $('#keyWord').val();//关键字
			window.location.href = Qnzs.path+'/bg/report/exportFormsSysList?reportType='+reportType+'&startTime='+startTime;
		} else {
			return;
		}
	});
});
	//切换报表类型
	function changeReportType(obj){
	 	var reportType = $(obj).val();
	 	if(reportType == 'W'){
	 		$('#startTimeMonth').css("display","none");
	 		$('#startTimeMonthD').css("display","none");
	 		$('#startTimeWeek').css("display","block");
	 	}else if(reportType == 'M'){
	 		$('#startTimeWeek').css("display","none");
	 		$('#startTimeMonth').css("display","block");
	 		$('#startTimeMonthD').css("display","block");
	 	}
	}

	function getReportFormsTime(){
		var reportType = $("#reportType option:selected").val();
		if(reportType == 'W'){
	 		return $("#startTimeWeek option:selected").val();
	 	}else if(reportType == 'M'){
	 		var monthStr = $("#startTimeMonth option:selected").val();
	 		var monthDStr = $("#startTimeMonthD option:selected").val();
	 		return monthStr+monthDStr;
	 	}
	}

$(function() {
	//周报时间段选择框
	var option = null;
	var beginTime = null;
	var endTime = null;
	var myDate = new Date();
	var selects = document.getElementById("startTimeWeek");
	for (var i = 1; i < 5; i++) {
		beginTime = addDate(myDate, -(myDate.getDay() - 1 + (i * 7)));
		endTime = addDate(myDate, -(myDate.getDay() - 1 + (1 + (i - 1) * 7)));
		option = new Option(beginTime + " 至 " + endTime, beginTime+" 00:00:00",true);
		selects.options.add(option);
	}
	option = new Option('全部', '',true);
	selects.options.add(option);
});
		
/*日期加减*/
function addDate(date, days) {
	var curr_time = new Date(date);
	curr_time.setDate(curr_time.getDate() + days);

	var curr_month = curr_time.getMonth() + 1;
	var curr_day = curr_time.getDate();
	var strDate = curr_time.getFullYear() + "-";
	strDate += (curr_month > 9 ? curr_month + "-" : "0" + curr_month + "-");
	strDate += (curr_day > 9 ? curr_day : "0" + curr_day);

	return strDate;
}

/** 
 * 设置select选中 
 * @param selectId select的id值 
 * @param checkValue 选中option的值 
*/  
function setSelectChecked(selectId, checkValue){  
    var select = document.getElementById(selectId);  
    for(var i=0; i<select.options.length; i++){  
        if(select.options[i].innerHTML == checkValue){  
            select.options[i].selected = true;  
            break;  
        }  
    }  
};  

