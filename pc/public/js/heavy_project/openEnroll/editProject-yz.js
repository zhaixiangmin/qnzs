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
					var tempFileUrl = data.result.url;
					$('#fileUrl').val(tempFileUrl); //附件地址
    							var index = tempFileUrl.indexOf('_');
				       	        var fileHtml = tempFileUrl.substr(index+4);
					$('#pickFileBtnNext').html("上传成功："+fileHtml);
				},
				fail: function() {
                    $.alert('出错');
				}
			});
			
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

//----------------------------------------------------------------------------------------附件上传----------------------------------------------------------------------------------------
function uploadFile() {
	$('#pickFileBtnNext').html("上传中......");
}
