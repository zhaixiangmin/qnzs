/*******  获取列表传过来的id值，查询信息   *******/
	var activityId = "";

	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
			//    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			activityId = strs[1];
//	       alert(activityId)
		}
	}
    getRequest();



function tijiao(){
		var comment = $("#help_content").val();
	   	 if(comment.length==""){
             $.alert("内容不能为空！");
	   		 return "";
	   	 }
	   	  $("#tijiao").html('提交中...');
	   	  $("#tijiao").attr('onclick','');
	   	  
	   	  console.log(comment);
	   	  obj.ajax('/project/enroll/addProjectPost',{
	   	  	
	   	  	 'projectId':activityId,
	   	  	 'postContent':comment
	   	  	
	   	  },function(data){    //成功回调
	   	  	console.log(data);
	   	  	
	   	  	if(data.status=="OK"){

                $.alert(data.msg);
	   	  		 window.location.href = 'heavy_project_introduction.html'
	   	  	}else{

                $.alert(data.msg);
	   	  	}
	   	  	
	   	  	if(data.eeorcode=="1"){
                $.alert(data.msg);
	   				  location.reload(true);
	   				  
	   				 
	   			  }else
		    if(data.eeorcode=="0"){
				if(confirm(data.msg)){
					$('.dark02').fadeTo(400,0.5);
					$('.loginBox').fadeIn(400);
				  }
		    }else
		    if(data.eeorcode=="2"){
                $.alert(data.msg);
		    }  
  	
	   	  },function(data){    //失败回调
	   	  	console.log('提交评论失败');
	   	  })
	   	  
	}