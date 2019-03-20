/** 初始化回显数据列表**************/   
	/*******  获取列表传过来的id值，查询信息   *******/
	var activityId = "";

	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			activityId = strs[1];
	
		}
	}
    getRequest();
	/********  获取其他页面传过来的id end ********/
	
obj.ajax('/bg/project/activityDetail',{'activityId':activityId},function(data){
         console.log(data);
         var currActivity = data.dataList;
//       console.log(currActivity);
//       console.log(currActivity.remark);
//       console.log(currActivity.activityDetail.title);
//       console.log(currActivity.activityDetail.content);
//       console.log(currActivity.requirementsList[1].content);
		$('#activity_id').val(currActivity.id);
		
        /**活动类型***/
		$('#activityType').children('option').each(function(){
				if(currActivity.type == $(this).val()){
					$(this).attr("selected","selected");
					return;
				}
		})
		var allType = "赛事培训评选";
		if(allType.indexOf(currActivity.type) < 1){
				$('#activityType').val("其他");
				$('#activityTypeOther').css('display','block');
				$('#activityTypeOther').val(currActivity.type);
		}
		
		/** 活动名称 ** **/
        $('#activityName').val(currActivity.title);             
         /** 报名、投票时间***/
		$('#beginTime1').datetimebox('setValue',currActivity.startTime);
		$('#endTime1').datetimebox('setValue',currActivity.endTime);
		$('#beginTime2').datetimebox('setValue',currActivity.voteStartTime);
		$('#endTime2').datetimebox('setValue',currActivity.voteEndTime);

	    /** banner**/
	     $('#preview2').attr('src',currActivity.bannerUrl);//banner图片url
	     
    	$('#externalLinksPc').val(currActivity.externalLinksPc);//PC端外部链接 
    	$('#externalLinksWc').val(currActivity.externalLinksWc) ;//移动端外部链接
    	
},function(data){})
