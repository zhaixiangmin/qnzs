	    /*表格初始化*/
	    $('#project-partake').datagrid({ title: '组织数据报表',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1500,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/report/reportFormsOrgList',   //获取表格数据时请求的地址
	           columns:[[
	             {field:'organizationName',title:'组织名称',width:150},
	             {field:'readSum',title:'青年之声.智慧团建有效访问量',width:150},
	             {field:'questionSum',title:'有效提问量',width:100},
	             {field:'fansSum',title:'新增粉丝数',width:100},
	             {field:'updateDays',title:'平台更新天数',width:100},
	             {field:'stationCount',title:'线下服务站数量（累计）',width:100},
	             {field:'stationCompleteSum',title:'线下服务完成数',width:100},
	             {field:'stationScoreSum',title:'线下服务评分',width:100},
	             {field:'replySum',title:'参与回答问题数',width:100},
	             {field:'projectCount',title:'活动发布数',width:100},
	             {field:'projectEnrollCount',title:'活动报名数',width:100},
	             {field:'projectReplySum',title:'活动评论数',width:100},
	             {field:'projectScoreSum',title:'活动评分',width:100},
	             {field:'activityCount',title:'重磅项目发布数',width:100},
	             {field:'activityEnrollCount',title:'重磅项目报名数',width:100},
	             {field:'activityVoteCount',title:'重磅项目投票数',width:100},
	             {field:'activityReplyCount',title:'重磅项目评论数',width:100},
	             {field:'helpCount',title:'求助受理数',width:100},
	             {field:'helpReplyCount',title:'求助评论数',width:100},
	             {field:'districtName',title:'归属地区',width:100}
//	             {field:'organizationType',title:'组织类型',width:100}
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
	  $('#keyWord').val('');
	  setSelectChecked('reportType', '日');
	  $('.startTime').css("display","none");
	  $('#startTimeDay').css("display","block");
	  setSelectChecked('orgType', '--请选择--');
	  setSelectChecked('oidType2', '--请选择--');
	  changeOid2Type('');
	  
//	  $('#oidType option:selected,#cityOid2 option:selected,#shcoolOid2 option:selected ,#areaOid2 option:selected,#classOid2 option:selected').attr('selected',false);
	});
	
	//数据过滤
	$('#searchBtn').bind('click', function(event) {
	      	var startTime = getReportFormsTime();
	      	console.log($("#reportType option:selected").val());
	      	console.log(startTime);
	      	console.log($('#keyWord').val());
	      	console.log(getDistrictId());
	      	
	      	if(startTime == ''){
	      		$.messager.alert("提示","请选择统计时间！");
	      		return;
	      	}

	      $('#project-partake').datagrid({
	        queryParams: {
	          'reportType': $("#reportType option:selected").val(),     //类型
	          'startTime': startTime,		//开始时间
	          'keyWord': $('#keyWord').val(),   		//关键字
	          'districtId' : getDistrictId(),			//所属地区
	          'orgType': $("#orgType option:selected").val()	//组织类型
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
	if (startTime == '') {
		$.messager.alert("提示", "请选择统计时间！");
		return;
	}

	$.messager.confirm("操作提示", "您确定要导出当前条件的查询结果吗？", function(data) {
		if (data) {
			/*obj.ajax('/bg/report/exportFormsDidList', {
				'reportType': $("#reportType option:selected").val(), //类型
				'startTime': startTime, //开始时间
				'keyWord': $('#keyWord').val(), //关键字
				'districtId': getDistrictId() //所属地区
			}, function(data) {
				$.messager.alert("提示", data.msg);
			}, function() {})*/
			var reportType = $("#reportType option:selected").val(); //类型
			var keyWord = $('#keyWord').val();//关键字
			window.location.href = Qnzs.path+'/bg/report/exportFormsOrgList?reportType='+reportType+'&startTime='+startTime+'&keyWord='+keyWord+'&districtId='+getDistrictId();
		} else {
			return;
		}
	});
});
	//切换报表类型
	function changeReportType(obj){
	 	var reportType = $(obj).val();
	 	if(reportType == 'W'){
	 		$('.startTime').css("display","none");
	 		$('#startTimeWeek').css("display","block");
	 	}else if(reportType == 'M'){
	 		$('.startTime').css("display","none");
	 		$('#startTimeMonth').css("display","block");
	 		$('#startTimeMonthD').css("display","block");
	 	}else if(reportType == 'S'){
	 		$('.startTime').css("display","none");
	 		$('#startTimeSeason').css("display","block");
	 		$('#startTimeSeasonM').css("display","block");
	 	}else if(reportType == 'Y'){
	 		$('.startTime').css("display","none");
	 		$('#startTimeYear').css("display","block");
	 	}else{//reportType == 'D'
	 		$('.startTime').css("display","none");
	 		$('#startTimeDay').css("display","block");
//	 		$('#startTimeWeek').css("display","none");
//	 		$('#startTimeMonth').css("display","none");
//	 		$('#startTimeSeason').css("display","none");
//	 		$('#startTimeYear').css("display","none");
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
	 	}else if(reportType == 'S'){
	 		var seasonStr = $("#startTimeSeason option:selected").val();
	 		var seasonStrM = $("#startTimeSeason option:selected").val();
	 		return seasonStr+seasonStrM;
	 	}else if(reportType == 'Y'){
	 		return $("#startTimeYear option:selected").val();
	 	}else{//reportType == 'D' || reportType == 'W'
	 		return $('#startTime').datebox('getValue')+" 00:00:00";
	 	}
	}

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

	//     var m=curr_time.getMonth()+1; 
	return strDate;
}

/** 
 * 设置select选中 
 * @param selectId select的id值 
 * @param checkValue 选中option的值 
 * @author lqy 
 * @since 2015-08-21 
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

