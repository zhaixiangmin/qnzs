/*******  获取列表传过来的id值，查询信息   *******/
	var projectId = "";
	var activityId = "";
 	var specialAid = 268;//不显示点赞按钮

	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
			if(strs.length == 2){
				projectId = strs[1];
			}else if(strs.length == 3){
				var paramStr = strs[1];
				var actIdIndex = paramStr.indexOf("&");
				projectId = paramStr.substring(0,actIdIndex);
				activityId = strs[2];
				
				if(activityId == specialAid){
					$('.btn_blue').css("display","none");
				}
			}
		}
	}
    getRequest();
   

 
    /***  ***/
    obj.ajax('/project/enroll/projectDetail',{'projectId':projectId},function(data){
       console.log(data)
    	var project = data.dataList;
    	projectId = project.id;
//  	activityId = project.activityId;
    	
       document.title = project.projectName;
       $('#p1').html(project.projectName);   //项目名称
       $('#p2').html(project.reporterName);  //申请人
       $('#p3').html(project.projectIntroduce);  //简介
	   $('#likesNum').html(project.likesNum);//支持数
       
       //风采展示-图片
        var html = '';
        if(project.imageUrl!=''&&project.projectImageList == ''){
        	$('.img-box').show();
       	    html += '<div class="img" style=" width: 700px; margin: 0 auto; padding: 0 30px;">'
            html += '<img style="display: block; width:100%; height:100% ;" src="'+ project.imageUrl +'"/>'
        	html += '</div>'
       	
        }
       
        if (project.projectImageList != '') {
       	
		    $('.img-box').show();
	        for(var i=0; i<project.projectImageList.length; i++) {
	            var projectImage = project.projectImageList[i];
	            html += '<div class="img" style=" width: 700px;margin: 0 auto; padding: 0 30px;">'
	            html += '<img style="display: block; width:100%; height:100% ;" src="'+ projectImage.imageUrl +'"/>'
	        	html += '</div>'
	        	html += '<p style="text-align: center; margin: 5px 0px 15px 0px;">'+ projectImage.imageComment +'</p>'
	        }
        } 
        $('.imageList').append(html);
       
        //风采展示-视频
		if(project.videoUrl != '' && project.videoUrl.indexOf('://v.qq.com/x/') != -1){
			var h='';// https://v.qq.com/x/page/
			var indexOfNum = project.videoUrl.indexOf('.html');
			if(project.videoUrl.indexOf('https://v.qq.com/x/') != -1){
				h = project.videoUrl.substr(19);  //自己上传的 视频
			}else if(project.videoUrl.indexOf('http://v.qq.com/x/') != -1){
				h = project.videoUrl.substr(18); 
			}
			
	        if(h.indexOf('page/') != -1){   //自己上传的视频
	        	video_id = project.videoUrl.substring(24,indexOfNum);
	        } 
	        if(h.indexOf('cover/') != -1){    //腾讯的视频
	        	video_id = h.split('/');
	        	console.log(video_id)
		        video_id = video_id[video_id.length-1].split('.');
		        video_id =video_id[0];
	        }
			$('.youku-box').show(); //显示视频播放框
			$('.img iframe').attr('src','https://v.qq.com/iframe/player.html?vid='+video_id+'&tiny=0&auto=0') 
			$('.img iframe').attr('width','100%'); //设置宽度百分百
			$('.img iframe').attr('height','400'); //设置宽度百分百
			
		}else{
			$('.youku-box').hide(); //隐藏视频播放框
		}
		//风采展示-视频 end
		
		if(activityId == 511){
			$('.file_box').html('');
		   	if (project.projectFileList != '') {
						$('.file_box').css("display","block");
		   	   	    	var html = '<h3 class="fnt16 m_top5" id="p4">附件</h3>';
				        for(var i=0; i<project.projectFileList.length; i++) {
				            var projectFile = project.projectFileList[i];
				            var fileNameIndex = projectFile.fileUrl.lastIndexOf("/");
				            var fileName = projectFile.fileUrl.substring(fileNameIndex+1);
				            html += '<p style="margin-left:120px;" >'+ fileName +'<a href="'+ projectFile.fileUrl +'">&nbsp;&nbsp;&nbsp;&nbsp;下载</a></p>'
				        }
			        	$('.file_box').append(html);
		   	} else{
						$('.file_box').hide();
			}
		}
     
    },function(data){})
    
    /*****  获取评论的列表   ****/
   function getPostList(){
			
			obj.ajax('/project/enroll/projectPostList',{"pageIndex":1,"pageSize":5,"projectId":projectId},function(data){
				console.log(data);
				var html ="";
	    		var nums = 5;
	    		var contPage = 0;
	    		var arrList  = new Array();
	    	    for(var i=0;i<data.dataList.length;i++){
	    	    	   console.log(i)
	        		html+='<div class="userShow clearfix">';
	        		html+='<div class="imgBox fl"><img src="'+data.dataList[i].accPhotoUrl+'"/></div>';
	        		html+='<div class="txtBox">';
	        		html+='<div class="up">';
	        		html+='<span class="name">'+data.dataList[i].accRealName+'</span>';
	        		html+='<span class="time">'+data.dataList[i].createTime+'</span></div>';
	        		html+='<p>'+data.dataList[i].content+'</p></div></div>';
	        		if(data.dataList[i].isCandel){
	        			html+='<div class="handleBox clearfix"><a class="fr delete" onclick="deletePost('+data.dataList[i].postId+');">删除</a></div>';
	        		}
	    	    }
	    		arrList = html.split(",");
//  			$.pagingParam("page1",arrList,nums,"postList",curr,getPostList,contPage,'#2185cf',activityProjectId);
				
				$('#postList').html(html);
			},function(data){
				console.log('获取评论信息失败')
			})
			
			
			
//	    	$.post(ctx+"/activityProject/getPostList",{"pageNo":curr,"pageSize":5,"projectId":activityProjectId,},function(dataa){
//	    		var html ="";
//	    		var nums = 5;
//	    		var contPage = 0;
//	    		var arrList  = new Array();
//	    		var data = JSON.parse(dataa);
//	    		$.each(data,function(i,item){
//	        		html+='<div class="userShow clearfix">';
//	        		html+='<div class="imgBox fl"><img src="'+item.photoUrl+'"/></div>';
//	        		html+='<div class="txtBox">';
//	        		html+='<div class="up">';
//	        		html+='<span class="name">'+item.realname+'</span>';
//	        		html+='<span class="time">'+item.create_time+'</span></div>';
//	        		html+='<p>'+item.content+'</p></div></div>';
//	        		if(item.deletable == 1){
//	        			html+='<div class="handleBox clearfix"><a class="fr delete" onclick="deletePost('+item.postId+');">删除</a></div>';
//	        		}else{
//	        			html+='<div class="handleBox clearfix"><a class="fr delete"></a></div>';
//	        		}
//	        		html+=',';
//	        		contPage = item.con_sum;
//	    		})
//	    		arrList = html.split(",");
//  			$.pagingParam("page1",arrList,nums,"postList",curr,getPostList,contPage,'#2185cf',activityProjectId);
//	    	})
	    }
     getPostList();
    /******  删除评论 ********/
    function deletePost(postId){
			if(!confirm('确定删除这条评论?')){
				return;
			}
			obj.ajax('/project/enroll/delProjectPost',{'projectPostId':postId},function(data){
				console.log(data);
				
				
				if(data.status=="ERROR"){
                    $.alert(data.msg);
		   		}
				 if(data.status=="OK")   {
                     $.alert(data.msg);
		   		 	 location.reload(true);
		   		}
			},function(data){});
    }
    /****** 喜欢投票*******/
   
   //投票
		function likesProject(){
			$('#likesProject').removeAttr('onclick');
			
			obj.ajax('/project/enroll/voteProject',{'projectId':projectId},function(data){
				
				console.log(data);  
				if(data.status=="OK"){
                    $.alert(data.msg);
		   	  		var htmlNum = $('#likesNum').html();
		   	  		$('#likesNum').html(parseInt(htmlNum)+1);
		   	  }else {
                    $.alert(data.msg);
		   	  }
//				    if(data.resultType == "1"){
//						if(confirm(data.msg)){//未登录
//							//window.location.href = ctx + "/wapLogin";
//								$('.dark02').fadeTo(400,0.5);
//								$('.loginBox').fadeIn(400);
//						}
//					}else if(data.resultType == "0"){//成功
//						alert(data.msg);
//					    var likesNum = parseInt(document.getElementById('likesNum').innerHTML)+1;
//					    document.getElementById('likesNum').innerHTML = likesNum;
//					}else if(data.resultType == "3"){//未关注微信服务号
//						if(confirm(data.msg)){
//							window.location.href = "//mp.weixin.qq.com/s?__biz=MTg1NjYxOTU0MQ==&mid=504564131&idx=1&sn=3e05b6d5a79641b4b179c3d54a2376b5#rd";
//						}
//					}else{//异常/重复/超过数量
//						alert(data.msg);
//					}
				
			},function(data){})
        $("#likesProject").attr('onclick','likesProject()');
    }

   /**** 提交评论 ****/
   function tijiao(){
   	
		var comment = $("#comment").val();
	   	 if(comment.length==""){
             $.alert("内容不能为空！");
	   		 return "";
	   	 }
	   	  $("#tijiao").html('提交中...');
	   	  $("#tijiao").attr('onclick','');
	   	  
	   	  console.log(comment);
	   	  obj.ajax('/project/enroll/addProjectPost',{
	   	  	
	   	  	 'projectId':projectId,
	   	  	 'postContent':comment
	   	  	
	   	  },function(data){    //成功回调
	   	  	console.log(data);
	   	  	
	   	  	if(data.status=="OK"){

                $.alert(data.msg);
	   	  		  location.reload(true);
	   	  	}else {

                $.alert(data.msg);
	   	  	}
	   	  	
	   	},function(data){    //失败回调
	   	  	console.log('提交评论失败');
	   	})
	   	  
	}

/****  放回顶部  *****/
$('.back').click(function(){
	$("html,body").animate({
		scrollTop: 0
	}, 500);
	
})