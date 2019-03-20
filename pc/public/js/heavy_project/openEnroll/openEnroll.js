/*******  获取列表传过来的id值，查询信息   *******/
	var activityId = "";

	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			activityId = strs[1];
			$('#hidden_activity_id').val(activityId);
			//是否是268重磅项目，特殊处理
			if(activityId ==268){
				
				$('form').css('margin-top','100px');
				$('.customer_banner_box').show()   //显示顶部banner
			}else {
				
				$('form').css('margin-top','0');
				$('.customer_banner_box').hide()   //显示顶部banner
			}
			
		}
	}
    getRequest();
    
    
    /*** 修改头部标题   ***/    
    auditDids_flay=false;
	obj.ajax('/project/activityDetailBaseInfo',{'activityId':activityId},function(data){
   	 	console.log(data);
   	 	if(data){
   	 		$('#base_info_title').html(data.dataList.title);
   	 		$('#title').html(data.dataList.title);
   	 	}
        if(data.dataList.auditDids!=''){
        	
        	auditDids_flay = true ;
        	
        }else{
        	auditDids_flay = false;
        	
        }
        
        
   	},function(data){console.log(1);});
   	
    /**** 填充参赛者分类下拉列表 ****/
    obj.ajax('/project/applicantTypes',{'activityId':activityId},function(data){
   	    console.log(data);
   	    var html = '';
   	    if(!data.dataList || data.dataList.length == 0){
   	    	$('#applicantTypes').parent().hide();
   	    	return;
   	    }
   	    for(var i=0;i<data.dataList.length;i++){
   	    	html+='<option value="'+data.dataList[i]+'">'+data.dataList[i]+'</option>'
   	    }
   	    $('#applicantTypes').append(html);
   	    
   	    
   	    
    },function(data){})
   

   
    
    
    
    
  
   
   