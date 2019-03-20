
function initCategory()
{
	$.ajax ({
		type: "GET",
		url : ctx + '/findInterlocution/findAllCategorySelect',
		success: function (data){
			$.each(data, function(i, item) {
				$("#quesCategoryList").append("<li onclick=chooseClose(this) value=" + item.caId + ">" + item.name + "ss</li>");
			});
		}
	});
}

function openLoginWindow(){
	$(".bg_black").hide();
	clearForm();
	window.imgUrl ="";//图片路径拼串
	window.index = 0;//上传预览图片数
	window.completeCount = 0;//已上传文件数
	$('.dark02').fadeTo(400,0.5);
	$('.loginBox').fadeIn(400);
}
/**
 * 验证提问表单
 */
function checkQuesForm()
{
	var flag = true;

	var quesTitle = $("#quesTitle").val();
	var quesCategory = $("#quesCategory").val();
	var quesContent = $("#quesContent").val();
	var isPublic = true;
//	var isPublicRadio = $("input[name='isPublic']:checked").val();
//	if (isPublicRadio != null && isPublicRadio != undefined) {
//		isPublic = isPublicRadio;
//	}
	var quesAccExperts = [];
	$("input[name='quesAccExpert']").each(function(){
		quesAccExperts.push($(this).val());
	});
//	if(quesAccExperts.length == 0 || quesAccExperts == null){
//		$("input[name='quesOrgAdmin']").each(function(){
//			quesAccExperts.push($(this).val());
//		});
//	}
	var quesLabels = new Array();
//	$("input[name='quesLabel']").each(function(){
//		quesLabels.push($(this).val());
//	});

	var quesImages = [];
	$("input[name^='img_']").each(function(){
		quesImages.push($(this).val());
	});

	if (quesCategory == null || quesCategory == undefined || quesCategory == "") {
//		alert("请选择话题分类");
		layer.open({
			content: '请选择话题分类',
			btn: '确定',
			shadeClose: false,
			yes: function(){
				layer.closeAll();
				$("#quesCategory").focus();
			}
		});
		flag = false;
		return;
	}  else if (quesTitle == null || quesTitle == undefined || quesTitle == "") {
//		alert("请输入你的问题");
//		$("#quesTitle").focus();
		layer.open({
			content: '请输入您的问题',
			btn: '确定',
			shadeClose: false,
			yes: function(){
				layer.closeAll();
				$("#quesTitle").focus();
			}
		});
		flag = false;
		return;
	} else if (quesContent == null || quesContent == undefined || quesContent == "") {
//		alert("请填写问题说明");
		layer.open({
			content: '请输入问题说明',
			btn: '确定',
			shadeClose: false,
			yes: function(){
				layer.closeAll();
				$("#quesContent").focus();
			}
		});
		flag = false;
		return;
	} else if (quesContent.length < 5) {
//		alert("请填写5个字以上的内容");
		layer.open({
			content: '请填写5个字以上的内容',
			btn: '确定',
			shadeClose: false,
			yes: function(){
				layer.closeAll();
				$("#quesContent").focus();
			}
		});
		flag = false;
		return;
	}

	$.ajax ({
		type: "POST",
		url : ctx + '/findInterlocution/getQuestionReplyStatus',
		data: {'title':quesTitle},
		success: function (data){
			var jsonObj = JSON.parse(data);
			if(jsonObj.status){
				layer.open({
					content: '标题相同的问题只能发布一次！',
					btn: '确定',
					shadeClose: false,
					yes: function(){
						layer.closeAll();
						$("#quesTitle").focus();
					}
				});
				flag = false;
				return;
			}else{
				//禁止重复点击
				$('#submitQuestion').removeAttr('href');//去掉a标签中的href属性
				$('#submitQuestion').removeAttr('onclick');//去掉a标签中的onclick事件
				$('#submitQuestion').text('提交中......');
				$("#submitQuestion").css({ "background-color": "gray" });
				if (flag) {
//					if (dosubmit()) {
					questionSubmit(quesCategory, quesTitle, quesContent, isPublic, quesAccExperts, quesLabels, quesImages);
//					}
				}
			}
		}
	});

}

function questionSubmit(quesCategory, quesTitle, quesContent, isPublic, quesAccExperts, quesLabels, quesImages)
{

	sitenavOrgId = curSitenavOrgId == ''?sitenavOrgId:curSitenavOrgId;
	$.ajax ({
		type: "POST",
		url : ctx + '/questionManage/front/questionAsk',
		data: {'quesCategory':quesCategory, 'quesTitle':quesTitle, 'quesContent':quesContent, 'isPublic':isPublic, 'quesAccExperts':quesAccExperts, 'quesLabels':quesLabels, 'quesImages':quesImages, 'sitenavOrgId':sitenavOrgId},
//		dataType: "json",
		success: function (data){
			var jsonObj = JSON.parse(data);
			if (jsonObj.success == 2) { //用户未登录
				openLoginWindow();
			}else if (jsonObj.success == 1) {
				//提问成功清空页面数据
				$("#quesCategory").val("");
				$("#quesTitle").val("");
				$("#quesContent").val("");
				$("#isPublic").val("");

				layer.open({
					content: jsonObj.msg,
					btn: '确定',
					shadeClose: false,
					yes: function(index){
						window.location.href = ctx + "/pcFindInterlocution/quesDetail?quId="+jsonObj.quId+"&sitenavOrgId=" + sitenavOrgId;//提问成功之后跳转至我的帖子
					}
				});
			}else{
				layer.open({
					content: jsonObj.msg,
					btn: '确定',
					shadeClose: false
				});
			}
//			alert(jsonObj.msg);

			//成功之后给提问专家发送站内信
//			sendMessage(receiverAccId, "[" + categoryName + "]'’向您提问通知", informContent, 0);
		}
	});
}
