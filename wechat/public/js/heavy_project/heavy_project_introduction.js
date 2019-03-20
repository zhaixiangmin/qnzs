
/*******  获取列表传过来的id值，查询信息   *******/
	var activityId = "";

	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
			//    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			activityId = strs[1];
	   
		}
	}
    getRequest();


/********** ----------------评论---------*************/
	
	
//  var ctx = '//www.12355.net';
//	var activityProject = 'com.bluedon.wgj.entity.ActivityProject@6cc37f5a';
//	var activityId = '87';
//	var activityProjectId = '811';
//	var projectName = '四川行';
//	var projectIntro = '四川行';
//	var currentUrl = '//www.12355.net/activityProject/wapProjectDetailAno?projectId=801';
//	var encodeCurrentUrl = encodeURIComponent(currentUrl);
//	var weiboUrl = '//service.weibo.com/share/share.php?url=' + encodeCurrentUrl;
//	var qzoneUrl = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeCurrentUrl;

//	$(function(){
//		jQuery('#qrCode').qrcode({width:240,height:240,correctLevel:0,text:currentUrl}); 
//			getPostList(0, activityProjectId);
//	});
		



    /*********获取评论列表 ***********/
   var curr = 1;
    function projectDetailsList(curr){            //"pageSize":5,"   ///project/enroll/projectPostList
    	
    		obj.ajax('/project/enroll/projectDetail',{"pageNo":1,"projectId":activityId,"activityId" :21 },function(data){
    			console.log(data);
    			 $('#head-project-banner').attr('src',data.dataList.imageUrl);      //头部图片
    			 $('#head-reporterName').html(data.dataList.reporterName)      //申请人
    			 $('#head-title').html(data.dataList.projectName)              //项目名称 
    			 $('#head-time').html(data.dataList.enrollTime);           //时间
    			 $('#projec-introduction').html(data.dataList.projectIntroduce);   //项目介绍
				 createImageLisr(data.dataList.projectImageList)   //       创建图片列表
				
			},function(data){});
			
			/**  创建图片列表   projectImageList**/
			
			function  createImageLisr(data){
				$('#jianjie_box').html('');
			    var html ="";
	    	    for(var i=0;i<data.length;i++){ 
				    html+='<div>'
		            html+='<div class="box_t">'
		            html+=   '<img src="'+data[i].imageUrl+'" alt="" />'
		            html+= '</div>'
		            html+='<p class="fz24 color666">'+data[i].imageComment+'</p>'
		            html+='</div>'
				}         
				$('#jianjie_box').html(html+'');
			}
			
				
				
    }
	projectDetailsList();
	
	/****获取评论列表内容 ***/ 
	
	function  getPostList(){
		
	    obj.ajax('/project/enroll/projectPostList',{'projectId':351},function(data){
	   	
	   	console.log(data);
	   	 
	   	 creatPostList(data.dataList);    //遍历评论列表
	   	
	    },function(){});
		
		function creatPostList(data){
			var html ="";
	    	
    	    for(var i=0;i<data.length;i++){
    	    	
	    	    html+=	'<div class="item clearfix">'
		        html+=        '<div class="left fl">'
		        html+=          '  <div class="imgDiv">'
		        html+=                '<img src="'+data[i].accPhotoUrl+'">'
		        html+=            '</div>'
		        html+=        '</div>'
		        html+=        '<div class="right">'
		        html+=            '<div class="tit">'
				html+=		        '<h6 class="name fl">青年之声运营中心</h6>'
								      
		        html+=                '<div class="date fr">'
		        html+=                    '<span class="color999">'+data[i].createTime+'</span>'
		        html+=                    '<!-- <em class="color999">18:56</em> -->'
		        html+=                '</div>'
		        html+=            '</div>'
		        html+=            '<p class="color000">'+data[i].content+'</p>'
		                    
		        html+=            '<div class="edit fnt12">'
		        html+=              	'<span class="comment showComment">评论(0)</span>'
		                      	
		        html+=             		'<span class="delect"><a href="javascript:void(0);" onclick="deletePost('+data[i].postId+');">删除</a></span>'
		                      	
		        html+=            ' </div>'
		         html+=           '<div class="show_box clearfix " style="display: none;">'
		                    
		        html+=               ' <!--<form action="" class="clearfix">'
		        html+=                    '<textarea name="" id="huifu125138" placeholder="来说两句吧！" maxlength="300"></textarea>'
		        html+=                    '<div class="btn_box fr">'
		        html+=                        '<input type="button" value="提交" class="submit_btn" onclick="huifu(14523,125138)">'
		        html+=                   ' </div>'
		        html+=                '</form>-->'
		       	html+=			 '</div>'
		        html+=    '</div>'
    	    }
//	    		arrList = html.split(",");
//  			$.pagingParam("page1",arrList,nums,"postList",curr,getPostList,contPage,'#2185cf',activityProjectId);
			
			$('#comment').html(html);
		  
			
		}
		
		
		
	}
	getPostList();
	
	
	/***------删除评论-------***/
	function deletePost(postId){
		
		if(!confirm('确定删除这条评论?')){
			return;
		}
		obj.ajax('/project/enroll/delProjectPost',{'projectPostId':postId},function(data){
			console.log(data);
			if(data.status=='OK'){
                $.alert(data.msg);
			  		 location.reload();
			}else{
                $.alert(data.msg);
			}
			
			
		},function(data){});
			
	}
	
	/****** 投票支持他们 *********/
	
	//投票
	function likesProject(){
		
	
		obj.ajax('/project/enroll/voteProject',{'projectId':811,'activityId':21},function(data){
			
			console.log(data);  
			    if(data.resultType == "1"){
					if(confirm(data.msg)){//未登录
						//window.location.href = ctx + "/wapLogin";
							$('.dark02').fadeTo(400,0.5);
							$('.loginBox').fadeIn(400);
					}
				}else if(data.resultType == "0"){//成功
                    $.alert(data.msg);
				    var likesNum = parseInt(document.getElementById('likesNum').innerHTML)+1;
				    document.getElementById('likesNum').innerHTML = likesNum;
				}else if(data.resultType == "3"){//未关注微信服务号
					if(confirm(data.msg)){
						window.location.href = "//mp.weixin.qq.com/s?__biz=MTg1NjYxOTU0MQ==&mid=504564131&idx=1&sn=3e05b6d5a79641b4b179c3d54a2376b5#rd";
					}
				}else{//异常/重复/超过数量
                    $.alert(data.msg);
				}
			
		},function(data){})
		
	}
	
	
	/********** ----------------评论---end------*************/
	