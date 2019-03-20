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
				$('#hidden_activity_id').val(activityId);
				
				if(activityId == specialAid){
					$('form').css('margin-top','100px');
					$('.customer_banner_box').show()   //显示顶部banner
				}else {
					$('form').css('margin-top','0');
					$('.customer_banner_box').hide()   //显示顶部banner
				}
			}
		}
	}
    getRequest();
    
    
/*** 修改头部标题   ***/ 
function activityTitle(){
	obj.ajax('/project/activityDetailBaseInfo',{'activityId':activityId},function(data){
   	 	console.log(data);
   	 	if(data){
   	 		$('#base_info_title').html(data.dataList.title);
   	 		$('#title').html(data.dataList.title);
   	 	}
   	},function(data){});
}
activityTitle();

/*回显详细信息*/
function projectDetail(){
	obj.ajax('/project/enroll/projectDetailAll',{'projectId':projectId},function(data){
		var activityProject = data.dataList;
					 	    $('#realname').val(activityProject.reporterName);    //申报者名称
					 	    $('#mobile').val(activityProject.mobile);    // 联系电话
					 	    $('#email').val(activityProject.email);  //邮箱的设置
					 	    $('#projectName').val(activityProject.projectName);  //项目名称
					 	    $('#projectIntroduce').val(activityProject.projectIntroduce);  //项目简介
					 	    $('#videoUrl').val(activityProject.videoUrl);  //视频链接
			       	        $('#preview2').attr('src',activityProject.imageUrl);  // 首页 bnner图
   	    					$('#applicantTypesOld').html('原：'+activityProject.creatorType);
   	    					$('#organizationOld').html('原：'+activityProject.districtName);
				
			       	        //附件
			       	        var projectFileList=  activityProject.projectFileList;
			       	        if(projectFileList.length > 0){
				       	        $('#fileId').val(projectFileList[0].id);
				       	        var tempFileUrl = projectFileList[0].fileUrl;
    							var index = tempFileUrl.indexOf('_');
				       	        var fileHtml = tempFileUrl.substr(index+4);
   	    						$('#fileUrlOld').html('原：'+fileHtml+'<a href="'+ tempFileUrl +'">&nbsp;&nbsp;&nbsp;&nbsp;下载</a>');
				       	    }else{
				       	        $('#fileId').val('');
				       	        $('#fileUrl').val('');
								$('#pickFileBtnNext').html('<em style="color: red; ">（请压缩为zip格式上传，文件名中勿带有","、"/"、"+"等中英文标点符号，否则将会上传失败。）</em>');
				       	    }
			       	        
			       	        //风采展示start
			       	        var projectImageList = activityProject.projectImageList;
			       	        var html ='';
//			       	        $('#upd_imgshow').html('');
			       	        if(projectImageList.length > 0){
				       	        for(var i= 0;i<projectImageList.length;i++){
				       	         	html+= '<div style="width: 500px; margin-top: 10px;">'
				                    html+=        '<img id="preview'+(i+1)+'" style="height:100px;border:0px;margin-bottom:3px;" title="" src="'+projectImageList[i].imageUrl+'" />'
				                    html+=        '<div  class="btn upload" style="width: 250px;"><input type="file" name="image_file" id="Updatefile_img'+(i+1)+'" class="upload_pic" onChange="fileSelected(preview'+(i+1)+',image_file1);" /></div>'
				                    html+=		'<input type="hidden" name="imgid_" value="'+projectImageList[i].id+'" />'
//				                    html+=		'<input type="hidden" name="projectId" value="'+projectImageList[i].projectId+'" />'
				                    html+=		'<input id="imageUrl'+(i+1)+'" type="hidden" name="imgurl_" value="'+projectImageList[i].imageUrl+'" />'
				                    html+=    '<input type="" name="imgcomment_" value="'+projectImageList[i].imageComment+'" placeholder="请输入图片描述" class="imageComment  form-control" />'
			                        html+='</div>'
				       	        }
				       	        $('#upd_imgshow').append(html);
				       	        $('#projectImageList').show();
			       	        }else{
			       	        	$('#upd_imgshow').html('');
			       	        	$('#projectImageList').hide();
			       	        }
			       	        
			       	        $('#Updatefile_img1').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview1').attr('src',imageUrl);
									$('#imageUrl1').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img2').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview2').attr('src',imageUrl);
									$('#imageUrl2').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img3').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview3').attr('src',imageUrl);
									$('#imageUrl3').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img4').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview4').attr('src',imageUrl);
									$('#imageUrl4').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img5').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview5').attr('src',imageUrl);
									$('#imageUrl5').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img6').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview6').attr('src',imageUrl);
									$('#imageUrl6').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img7').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview7').attr('src',imageUrl);
									$('#imageUrl7').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
							$('#Updatefile_img8').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
                                    $.alert('上传成功')
									imageUrl = data.result.url;
									$('#preview8').attr('src',imageUrl);
									$('#imageUrl5').val(imageUrl);
								},
								fail: function() {
                                    $.alert('出错');
								}
							});
	});
}
projectDetail();			        

/**** 填充参赛者分类下拉列表 ****/
function createReatorType(){
    obj.ajax('/project/applicantTypes',{'activityId':activityId},function(data){
   	    console.log(data);
   	    var html = '';
   	    if(!data.dataList || data.dataList.length == 0){
   	    	$('#applicantTypes').parent().hide();
   	    	return;
   	    }
   	    for(var i=0;i<data.dataList.length;i++){
	   	    if(data.dataList[i] == $('#applicantTypes').val()){
   	    		html+='<option value="'+data.dataList[i]+'" selected="selected">'+data.dataList[i]+'</option>';
	   	    }else{
	   	    	html+='<option value="'+data.dataList[i]+'">'+data.dataList[i]+'</option>';
	   	    }
   	    }
   	    $('#applicantTypes').append(html);
    },function(data){});
} 
createReatorType();	//生成参赛者分类

/*提交修改*/
$("#submitVc").click(function() {
	//			
	var na = /^[a-zA-Z\s\d\u4e00-\u9fa5]{2,30}$/; //申报单位正则
	var ph = /^1[3|5|7|8|][0-9]{9}$/; //手机号正则
	var yz = /^\d{6}$/; //验证码
	var mm = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; //密码正则
	var emal = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱正则     //&&ph.test($("#mobile").val())&&emal.test($("#email").val())&&projectName.test($("#projectName").val()
	var projectName = /^[a-zA-Z\s\d\u4e00-\u9fa5]{1,29}\S$/; //项目名称
	var projectIntroduce = /^[\s\S*]{10,1000}$/; //集体简介
	if(!sizeImg_flay){
        $.alert('您上传的图片超出了500KB，请压缩图片大小后上传。');
		return ;
	}
	
	if (na.test($('#realname').val()) && ph.test($("#mobile").val()) && emal.test($("#email").val()) && projectName.test($("#projectName").val()) && ($("#projectIntroduce").val().length>10||$("#projectIntroduce").val().length<1000)) {
		$("#submitVc").html('提交中...');
		
		var projectObj = {};
		projectObj['id'] = projectId;
		projectObj['reporterName'] = $('#realname').val();	//申报人
		projectObj['mobile'] = $('#mobile').val();				//电话
		projectObj['email'] = $('#email').val();				//邮箱
		projectObj['projectName'] = $('#projectName').val();	// 项目名称   ,标题
		projectObj['projectIntroduce'] = $('#projectIntroduce').val();// 项目简介
		projectObj['imageUrl'] = $('#preview2').attr('src');			//封面图片地址
		projectObj['videoUrl'] = $('#videoUrl').val();		//视频链接
		projectObj['districtId'] = getDistrictId();         		//所属地区
		projectObj['creatorType'] = $('#applicantTypes option:selected').val();       			//参赛者分类
//		projectObj['projectImageList'] = $('#projectImageList').serializeJSONArray();//风采图片
//		projectObj['projectFileList'] = $('#projectFileList').serializeJSONArray();  // 附件地址 
		console.log(projectObj)
		
		var imageIds = [];
		$("input[name^='imgid_']").each(function() {
			imageIds.push($(this).val());
		});
		var imageUrls = [];
		$("input[name^='imgurl_']").each(function() {
			imageUrls.push($(this).val());
		});
		var imageComments = [];
		$("input[name^='imgcomment_']").each(function() {
			imageComments.push($(this).val());
		});

		var fileId = $('#fileId').val();
		var fileUrl = $('#fileUrl').val();
		
						obj.ajax('/project/enroll/updateProject',{
				 	        'projectStr' : JSON.stringify(projectObj),
							'imageIds': imageIds.join('/,/'), //风采展示图片
							'imageUrls': imageUrls.join('/,/'), //风采展示图片
							'imageComments': imageComments.join('/,/'), //风采展示图片说明
							"fileId": fileId, // 附件地址
							"fileUrl": fileUrl, // 附件地址
				 	    },function(data){ 
//						    alert(data.msg);
						    if (confirm(data.msg)) {
						    	location.reload();
						    }
				 	    },function(data){});
				 	    
	} else {
		if ($("#realname").val() == "") {
			$(".spa1").text('请填写申报者名称')
		}
		if ($("#mobile").val() == "") {
			$(".spa2").text('请填写手机号')
		}
		if ($("#checkCode").val() == "") {
			$(".spa3").text('请填写你的验证码')
		}
		if ($("#userPassword").val() == "") {
			$(".spa4").text('请填写你的密码')
		}
		if ($("#email").val() == "") {
			$(".spa5").text('请填写邮箱地址')
		}
		if ($("#projectName").val() == "") {
			$(".spa6").text('请填写项目、个人或集体的名称')
		}
		if ($("#projectIntroduce").val() == "") {
			$(".spa7").text('根据报名内容的不同，请简单介绍您的项目/个人 /集体。').css("color", "#BD362F")
		}

		$("html,body").animate({
			scrollTop: 0
		}, 500);
		return false;
	}
});

/*获取一个字符串值在指定字符串第n次出现的位置*/
function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
    }
    
    
    
  
   
   