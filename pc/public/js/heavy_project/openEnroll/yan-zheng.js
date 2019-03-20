
/**** 上传图片-朱  *****/
//图片上传处理 start
	   var image = '';
	               
		   function selectImage(file) {
			if(!file.files || !file.files[0]) {
				return;
			}
			var reader = new FileReader();
			reader.onload = function(evt) {
				document.getElementById('preview').src = evt.target.result;
				image = evt.target.result;
			
			}
			reader.readAsDataURL(file.files[0]);
		};
		////192.168.100.49:8080/qnzs/file_upload
	    $(document).ready(function(){
	    	
	    	$('#image_file').fileupload({
				url:base+'/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
                    $.alert("上传成功");
					$('#preview2').attr('src',data.result.url)
					
				},
				fail: function() {
                    $.alert('出错');
				}
			});

			$('#up_file').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
		//			alert(data.result.url);
                    $.alert("上传成功");
					$('#fileUrl').val(data.result.url); //附件地址
					$('#pickFileBtnNext').html("上传成功");
				},
				fail: function() {
                    $.alert('出错');
				}
			});
		
	    });
	    
	//图片上传处理  end



/****  验证 ******/
$("#userName").focus();

/************************  失焦判断  **********************************/

$(".basic_info input").blur(function() {


	$(".spa").css("color", "#BD362F")
	if ($(this).is("#realname")) { //申报单位
		var na = /^[a-zA-Z\s\d\u4e00-\u9fa5]{2,30}$/
		if ($("#realname").val() != "") {
			if (!(na.test($("#realname").val()))) {
				$(".right_box .spa1").text("请输入2-30个汉字或英文");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else if (na) {
				$(".spa1").text("");
				return true;
			}
		} else {
			$(".spa1").text("");
		}
	}
	if ($(this).is("#mobile")) { //手机号判断
		var ph = /^1[3|5|7|8|][0-9]{9}$/
		if ($("#mobile").val() != "") {
			if (!(ph.test($("#mobile").val()))) {
				$(".spa2").text("请输入正确手机号");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else if (ph) {
				$(".spa2").text("");
				return true;
			}
		} else {
			$(".spa2").text("");
		}
	}

	if ($(this).is("#checkCode")) { //验证码
		var yz = /^\d{6}$/;
		if ($("#checkCode").val() != "") {
			if (!(yz.test($("#checkCode").val()))) {
				$(".spa3").text("请输入正确的验证码");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else if (yz) {
				$(".spa3").text("");
				return true;
			}
		} else {
			$(".spa3").text("");
		}
	}

	if ($(this).is("#userPassword")) { //密码
		var mm = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
		if ($("#userPassword").val() != "") {
			if (!(mm.test($("#userPassword").val()))) {
				$(".spa4").text("输入6至12位的数字\英文组合的密码");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else if (mm) {
				$(".spa4").text("");
				return true;
			}
		} else {
			$(".spa4").text("");
		}
	}
	if ($(this).is("#email")) { //邮箱
		var emal = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if ($("#email").val() != "") {
			if (!(emal.test($("#email").val()))) {
				$(".spa5").text("输入正确的邮箱地址");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else if (emal) {
				$(".spa5").text("");
				return true;
			}
		} else {
			$(".spa5").text("");
		}
	}

})

$(".self_introduce input").blur(function() {

	if ($(this).is("#projectName")) { //标题名称
		var projectName = /^[a-zA-Z\s\d\u4e00-\u9fa5]{1,29}\S$/; //项目名称    [a-zA-Z\s\d\u4e00-\u9fa5]  \S[a-zA-Z0-9\s\u4e00-\u9fa5\_]{2,10}\S
		if ($("#projectName").val() != "") {
			if (!(projectName.test($("#projectName").val()))) {
				$(".spa6").text("请输入2-30个汉字或英文");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else if (projectName) {
				$(".spa6").text("");
				return true;
			}
		} else {
			$(".spa6").text("");
		}
	}

});

$('.self_introduce textarea').blur(function() {
	if ($(this).is("#projectIntroduce")) { //集体简介
		//var projectIntroduce =/^[\u4e00-\u9fa5a-zA-Z]{10,1000}$/;   
//		var projectIntroduce = /^[\s\S]*{10,1000}$/;
		if ($("#projectIntroduce").val() != "") {
			if ($("#projectIntroduce").val().length<10||$("#projectIntroduce").val().length>1000) {
				$(".spa7").text("请输入10-1000个汉字或英文");
				$(this).css("border", "1px solid #BD362F")
				return false;
			} else  {
				$(".spa7").text("");
				return true;
			}
		} else {
			$(".spa7").text("");
		}
	}
})

/********************** 聚焦提示 ************************/
$("input").focus(function() {
	if ($(this).is("#realname")) {
		$(".spa1").text("请输入2-30个汉字或英文").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}
	if ($(this).is("#mobile")) {
		$(".spa2").text("请输入11位手机号码").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}
	if ($(this).is("#checkCode")) { //验证码
		$(".spa3").text("请输入正确的验证码").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}
	if ($(this).is("#userPassword")) { //密码
		$(".spa4").text("输入6至12位的数字\英文组合的密码").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}
	if ($(this).is("#email")) { //邮箱
		$(".spa5").text("输入正确的邮箱地址").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}
	if ($(this).is("#projectName")) { //邮箱
		$(".spa6").text("").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}

})

$("textarea").focus(function() {
	if ($(this).is("#projectIntroduce")) { //简介
		$(".spa7").text("").css("color", "#aaa")
		$(this).css("border", "1px solid #aaa")
	}
});

/*********** 提交验证 ***************************/
$('#yangzheng').click(function() { //获取验证码

	obj.ajax('/pc/account/createSecurityCode', {
		'phone': $('#mobile').val()
	}, function(data) {

		console.log(data);
		$('#showCode').html(data.msg);
	}, function(data) {})
})

/**测试**/
$("#submitVcc").click(function() {
	var districtId = getDistrictId();
	
	var imageUrls = [];
	$("input[name^='img_']").each(function() {
		imageUrls.push($(this).val());
	});
	

	var imageComments = [];
	$("input[name^='comment_']").each(function() {
		imageComments.push($(this).val());
	});

	var fileUrls = [];
	$("input[name='fileUrl']").each(function() {
		fileUrls.push($(this).val());
	});
	
	var dataList = {
		"activityId": 21, //所属重磅项目
		"reporterName": '申报人', //  申报人
		"mobile": '15268598475', //  //联系电话
		"email": '15268598475@qq.com', //  联系邮箱
		"projectName": '项目名称 ', // 项目名称 
		"projectIntroduce": '项目简介', // 项目简介
		'creatorType': '个人',
		'imageUrl': '//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170415/20170415175319_935宣传栏5.jpg', //封面图片地址
		'imageUrls': imageUrls.join('/,/'), //风采展示图片
		'imageComments': imageComments.join('/,/'), //风采展示图片说明
		"fileUrls": fileUrls.join('/,/'), // 附件地址
		"districtId": districtId, // 所属地区
		'videoUrl': '//player.youku.com/player.php/sid/XMTcyMzU0OTI4MA==/v.swf'
	}
	console.log(dataList);

	/*obj.ajax("/project/enroll/addProject", {
		"activityId": 21, //所属重磅项目
		"reporterName": '申报人', //  申报人
		"mobile": '15268598475', //  //联系电话
		"email": '15268598475@qq.com', //  联系邮箱
		"projectName": '项目名称 ', // 项目名称 
		"projectIntroduce": '项目简介', // 项目简介
		'creatorType': '个人',
		'imageUrl': '//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170415/20170415175319_935宣传栏5.jpg', //封面图片地址
		'imageUrls': imageUrls.join('/,/'), //风采展示图片
		'imageComments': imageComments.join('/,/'), //风采展示图片说明
		"fileUrls": fileUrls.join('/,/'), // 附件地址
		"districtId": districtId, // 所属地区
		'videoUrl': '//player.youku.com/player.php/sid/XMTcyMzU0OTI4MA==/v.swf'
	}, function(data) {
		console.log(data);
		alert(data.msg)
	}, function(data) {});*/
})


$("#submitVc").click(function() {
	//			
	var na = /^[a-zA-Z\s\d\u4e00-\u9fa5]{2,30}$/; //申报单位正则
	var ph = /^1[3|5|7|8|][0-9]{9}$/; //手机号正则
	var yz = /^\d{6}$/; //验证码
	var mm = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; //密码正则
	var emal = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/; //邮箱正则     //&&ph.test($("#mobile").val())&&emal.test($("#email").val())&&projectName.test($("#projectName").val()
	var projectName = /^[a-zA-Z\s\d\u4e00-\u9fa5]{1,29}\S$/; //项目名称
	var projectIntroduce = /^[\s\S*]{10,1000}$/; //集体简介
	
	if(!sizeImg_flay && activityId != 511){
		alert('您上传的图片超出了500KB，请压缩图片大小后上传。');
		return ;
	}
	
	//地市必选
	if(auditDids_flay ==true){
		var areaAndclass ='';
     	var areaAndclass1 = $('#cityOid2 option:selected').val() ;
		var areaAndclass2 = $('#shcoolOid2 option:selected').val();
        
    	if(areaAndclass1!='-1'){
    	 	areaAndclass =areaAndclass1 ;
    	}
    	if(areaAndclass2 !='-1'){
    	 	areaAndclass =areaAndclass2 ;
    	}
        if(areaAndclass ==''){
        	alert('请完善所属地区资料！');
        	return;
        }
	}
	
	if($('#preview2').attr('src') == "openEnroll-css/cover.jpg"){
        	alert('请上传封面图片！');
        	return;
	}
	
	if (na.test($('#realname').val()) && ph.test($("#mobile").val()) && emal.test($("#email").val()) && projectName.test($("#projectName").val()) && ($("#projectIntroduce").val().length>10||$("#projectIntroduce").val().length<1000)) {
		var districtId = getDistrictId();

		var imageUrls = [];
		$("input[name^='img_']").each(function() {
			imageUrls.push($(this).val());
		});

		var imageComments = [];
		$("input[name^='comment_']").each(function() {
			imageComments.push($(this).val());
		});

		var fileUrls = [];
		$("input[name='fileUrl']").each(function() {
			fileUrls.push($(this).val());
		});
        
        console.log(fileUrls)      
        console.log(imageUrls)

      
		obj.ajax("/project/enroll/addProject", {
			"activityId": activityId, //所属重磅项目
			"reporterName": $('#realname').val(), //  申报人
			"mobile": $('#mobile').val(), //  //联系电话
			"email": $('#email').val(), //  联系邮箱
			"projectName": $('#projectName').val(), // 项目名称 
			"projectIntroduce": $('#projectIntroduce').val(), // 项目简介
			'creatorType': $('#applicantTypes option:selected').val(),
			'imageUrl': $('#preview2').attr('src'), //封面图片地址
			'imageUrls': imageUrls.join('/,/'), //风采展示图片
			'imageComments': imageComments.join('/,/'), //风采展示图片说明
			"fileUrls": fileUrls.join('/,/'), // 附件地址
			"districtId": districtId, // 所属地区
			'videoUrl': $('#videoUrl').val()
		}, function(data) {
			console.log(data);
			if(data.status=='OK'){

                $.alert('报名成功！');
				window.location.href='heavy_project_model1_index.html?activityId='+activityId;
			}else{
                $.alert(data.msg);
			};
		}, function(data) {});

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
})

//----------------------------------------------------------------------------------------附件上传----------------------------------------------------------------------------------------
function uploadFile() {
	$('#pickFileBtnNext').html("上传中......");
	/*var dir = 'activityFile';
	var fileList = document.getElementById("up_file").files;
	$.ajaxFileUpload({
		url: base + '/file_upload', //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'up_file', //文件上传域的ID
		dataType: 'JSON', //返回值类型 一般设置为
		success: function(data, status) {
			data = JSON.parse(data);
			if (data.error == 0) {
				alert("上传成功");
				$('input[name="fileUrl"]').val(data.url);
				$('#pickFileBtnNext').html("上传结束");
			}
		},
		error: function(data, status, e) //服务器响应失败处理函数
			{
				alert(e);
				$('#pickFileBtnNext').html("上传结束");
			}
	});*/
}
//----------------------------------------------------------------------------------------图片上传处理 ----------------------------------------------------------------------------------------


//图片上传
/*function uploadImage(){
		var dir  = 'activityImage';
		$.ajaxFileUpload({
            url: base+'/file_upload?dir='+dir, //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'up_img', //文件上传域的ID file
            dataType: 'JSON', //返回值类型 一般设置为json
            success: function (data, status){
            	data = JSON.parse(data);
            	if(data.error == 0){
            		$('#imgShow_0'+imageCount).attr('src',data.url);
            		$('#imageUrl_0'+imageCount).val(data.url);
            		imageCount += 1;
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
		});
		$('.imgL .imgdiv').eq(imageCount).css('display','block');
        if(imageCount < 7){
            $('.imgAdd').before('<div id="imgdiv_0'+(imageCount+1)+'" class="imgdiv" style="float:left;display:none;"><div class="imgOut"><img id="imgShow_0'+(imageCount+1)+'" class="imgShow" /></div><span class="cover"></span><input type="hidden" name="imageUrl" id="imageUrl_0'
            		+(imageCount+1)+'"><input name="imageComment" type="text" class="describe describe_spe" placeholder="描述一下这个图片"/></div>');
        }else{
        	$('.imgAdd').css('display','none');
        }
	}*/