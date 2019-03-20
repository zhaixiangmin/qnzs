/* 后台管理-重磅项目-发布/编辑项目公用 */
$(document).ready(function() {
	// 第二页弹出浮窗
	// 添加
	$(".inner_box").on("click", ".key_box .add", function(event) {
		var htBlock = $('.htBlock');
		var _htBlock = $(this).parents('.htBlock');
		_htBlock.addClass('current').siblings('.htBlock').removeClass('current');
		htBlock.find(".bgcgrey").slideUp(150);
		htBlock.find(".add,.check.normalCur").fadeIn(0);
		htBlock.find(".add.normalCur").fadeOut(0);
		htBlock.find(".confirm,.cancel").fadeOut(0);
		_htBlock.find(".bgcgrey").slideDown(150);
		_htBlock.find(".add").fadeOut(0);
		_htBlock.find(".confirm,.cancel").fadeIn(0);
	});
	// 确定
	$(".inner_box").on("click", ".key_box .confirm", function(event) {
		$(this).siblings('.add,.check').addClass('normalCur');

		$(this).fadeOut(0);
		$(this).siblings('.cancel').fadeOut(0);
		$(this).siblings('.check').fadeIn(0);
		$(this).parent('.key_box').siblings('.bgcgrey').slideUp(150);
	});
	// 取消
	$(".inner_box").on("click", ".key_box .cancel", function(event) {
		$(this).fadeOut(0);
		$(this).siblings('.confirm').fadeOut(0).siblings('.add,.check.normalCur').fadeIn(0);
		$(this).siblings('.add.normalCur').fadeOut(0);
		$(this).addClass('current').siblings('.htBlock').removeClass('current');
	});
	// 查看
	$(".inner_box").on("click", ".key_box .check", function(event) {
		$(this).fadeOut(0);
		$(this).siblings('.confirm,.cancel').fadeIn(0);
		$(this).parent('.key_box').siblings('.bgcgrey').slideDown(150);
	});
});

//----------------------------------------------------------------------------------------预览/提交验证 ----------------------------------------------------------------------------------------
function saveValidate() {
		
 	
	if ($('#activityName').val() == "") {
		$('#activityName').focus();
		alert("请填写活动名称！");
		return false;
	}

	if ($('#preview2').attr('src') == "../../public/images/zbxm_logo.png") {
		alert("请上传banner图片！");
		return false;
	}
	
	var startTime = $('#beginTime1').datebox('getValue');
	var endTime = $('#endTime1').datebox('getValue');
	var voteStartTime = $('#beginTime2').datebox('getValue');
	var voteEndTime = $('#endTime2').datebox('getValue');
	if (startTime == "") {
		alert("请选择报名开始日期！");
		return false;
	} else if (endTime == "") {
		alert("请选择报名结束日期！");
		return false;
	} else if (voteStartTime == "") {
		alert("请选择投票开始日期！");
		return false;
	} else if (voteEndTime == "") {
		alert("请选择投票结束日期！");
		return false;
	} else if (endTime <= startTime) {
		alert("报名结束日期需大于开始日期，请重新输入！");
		return false;
	} else if (voteEndTime <= voteStartTime) {
		alert("投票结束日期需大于开始日期，请重新输入！");
		return false;
	}

	/*if (!/^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/.test($('#ac_mobile').val())) {
		alert("请正确填写联系电话！");
		return false;
	}*/

	if ($('#externalLinksPc').val() == "") {
		$('#externalLinksPc').focus();
		alert("请输入PC端外链网址！");
		return false;
	}
	
	if ($('#externalLinksWc').val() == "") {
		alert("请输入移动端外链网址！");
		$('#externalLinksWc').focus();
		return false;
	}
	return true;
}

//----------------------------------------------------------------------------------------获取封装好的activity对象信息----------------------------------------------------------------------------------------
function getObjAddInfo() {
	//活动类型
	function activityType() {
		var type = $('#activityType option:selected').val();
		
		
		if (type != "其他") {
			return type;
		} else {
			var activityTypeOther = $('#activityTypeOther').val();
			return activityTypeOther != "" ? activityTypeOther : "其他";
		}
	}

	var activiteObj = {};
	activiteObj['id'] = $('#activity_id').val(); //活动id
	activiteObj['type'] = activityType(); //活动类型
	activiteObj['title'] = $('#activityName').val(); // 活动名称

	activiteObj['startTime'] = $('#beginTime1').datetimebox('getValue'); //报名时间
	activiteObj['endTime'] = $('#endTime1').datetimebox('getValue'); //报名截止时间
	activiteObj['voteStartTime'] = $('#beginTime2').datetimebox('getValue'); //投票开始时间
	activiteObj['voteEndTime'] = $('#endTime2').datetimebox('getValue'); //投票结束时间
	activiteObj['bannerUrl'] = $('#preview2').attr('src'); //banner图片url
	////ymjh.gd12355.org  //www.gzqnzs.cn
	activiteObj['externalLinksPc'] = $('#externalLinksPc').val(); //PC端外部链接 
	activiteObj['externalLinksWc'] = $('#externalLinksWc').val(); //移动端外部链接

	console.log(activiteObj);
	return activiteObj;
}

//----------------------------------------------------------------------------------------新增/编辑活动----------------------------------------------------------------------------------------



function saveActivity() {
	
 
	//验证
	if (!saveValidate()) {
		return;
	}
	var activity = getObjAddInfo();
	var saveUrl = "/bg/project/addExternalActivity";
	if (activity.id != "") {
		saveUrl = "/bg/project/editExternalActivity";
	}

	$('#save_activity,#next_or_back').removeAttr('onclick');
	$('#save_activity,#next_or_back').html("提交中......");

	obj.ajax(saveUrl, {
		"activityStr": JSON.stringify(activity)
	}, function(data) {
		console.log(data);
		if (data.status == 'OK') {
			alert(data.msg);
			$('.inner_box').css('display', 'none');
			window.location.href = "../heavy_project/heavy_project.html";
		} else {
			alert(data.msg);
		}
	}, function() {})
}

//----------------------------------------------------------------------------------------图片上传处理 ----------------------------------------------------------------------------------------
var image = '';

function selectImage(file) {
	if (!file.files || !file.files[0]) {
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
$(document).ready(function() {
	//#file
	$('#image_file').fileupload({
		url: base + '/file_upload',
		dataType: 'json',
		autoUpload: true,
		done: function(e, data) {

			//			alert(data.result.url);
			imageUrl = data.result.url;
		},
		fail: function() {
			alert('出错');
		}
	});
	////192.168.100.49:8080/qnzs/file_upload
	$('#Updatefile').fileupload({
		url: base + '/file_upload',
		dataType: 'json',
		autoUpload: true,
		done: function(e, data) {

			//			alert(data.result.url);
			imageUrl2 = data.result.url;
			$('#preview2').attr('src', imageUrl2); //回显图片
		},
		fail: function() {
			alert('出错');
		}
	});
});

//----------------------------------------------------------------------------------------上一页/下一页/取消----------------------------------------------------------------------------------------
function cancelSave() { //取消新增/修改
	if (confirm("确认放弃当前输入内容？")) {
		window.location.href = "../heavy_project/heavy_project.html";
	} else {
		return;
	}
}

//----------------------------------------------------------------------------------------测试----------------------------------------------------------------------------------------
function addActivityProject() {
	obj.ajax('/project/enroll/addProject', {
		"activityId": 21, //问题类别：其他
		"reporterName": "reporterName", // 标题 question_title
		"mobile": "18256487895", // 内容
		"email": "email", // 内容
		"projectName": "projectName", // 内容
		"projectIntroduce": "projectIntroduce" // 内容
	}, function(data) {
		if (data.status == 'OK') {
			console.log(data)
			alert(data.msg);
		} else {
			alert(data.msg);
		}
	}, function() {})
}