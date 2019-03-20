

/* 后台管理-重磅项目-发布/编辑项目公用 */
$(document).ready(function(){
	
	
	
	
	// 第二页弹出浮窗
    // 添加
    $(".inner_box").on("click",".key_box .add",function(event){
        var  htBlock = $('.htBlock');
        var  _htBlock = $(this).parents('.htBlock');
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
    $(".inner_box").on("click",".key_box .confirm",function(event){
        $(this).siblings('.add,.check').addClass('normalCur');
        
        $(this).fadeOut(0);
        $(this).siblings('.cancel').fadeOut(0);
        $(this).siblings('.check').fadeIn(0);
        $(this).parent('.key_box').siblings('.bgcgrey').slideUp(150);
    });
    // 取消
    $(".inner_box").on("click",".key_box .cancel",function(event){
        $(this).fadeOut(0);
        $(this).siblings('.confirm').fadeOut(0).siblings('.add,.check.normalCur').fadeIn(0);
        $(this).siblings('.add.normalCur').fadeOut(0);
        $(this).addClass('current').siblings('.htBlock').removeClass('current');
    });
    // 查看
    $(".inner_box").on("click",".key_box .check",function(event){
        $(this).fadeOut(0);
        $(this).siblings('.confirm,.cancel').fadeIn(0);
        $(this).parent('.key_box').siblings('.bgcgrey').slideDown(150);
    });
});

//----------------------------------------------------------------------------------------项目动态-追加编辑器----------------------------------------------------------------------------------------

function LoadEditor(TextName) {
    var editor = KindEditor.create('textarea[name="' + TextName + '"]', {
        allowFileManager: true,
//      autoHeightMode: true,
        afterCreate: function() {
//          this.loadPlugin('autoheight');
            this.sync();
        },
        afterChange: function() {
            this.sync();
        },
        afterBlur: function() {
            this.sync();
        }
    });
    return editor;
}
var editorNum=0 ;
function AddLoadEditor() {
	editorNum += 1;
    var strHtml;
    strHtml = '<textarea name="content" id="textarea_project_content_'+editorNum+'"  data-name="textarea" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>';
    $('#div_project_content_'+editorNum).append(strHtml);
    var arrEditor = $("textarea[data-name='textarea']");
    $.each(arrEditor, function() {
        // 加载编辑器
        LoadEditor($(this).attr('name'));
    });
}

var editorNum_edit= 100 ;
function AddLoadEditor_edit() {
	editorNum_edit += 1;
    var strHtml;
    strHtml = '<textarea name="content" id="textarea_project_content_'+editorNum_edit+'"  data-name="textarea" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>';
    $('#div_project_content_'+editorNum_edit).append(strHtml);
    var arrEditor = $("textarea[data-name='textarea']");
    $.each(arrEditor, function() {
        // 加载编辑器
        LoadEditor($(this).attr('name'));
    });
}

//----------------------------------------------------------------------------------------提交在线咨询发帖(保存/修改)----------------------------------------------------------------------------------------
function saveServiceQuestion() {
	var quId = $('#askUrl').val();
	var title = $('#question_title').val();
	var askContent = $('#question_content').val();
	if (!title) {
		alert('请输入标题');
		return;
	}
	if (!askContent) {
		alert('请输入内容');
		return;
	}
	
	if (!quId) { //保存
		obj.ajax('/pc/service/add', {
			"categoryId": 12, //问题类别：其他
			"title": title, // 标题 question_title
			"askContent": askContent // 内容
		}, function(data) {
			if (data.status == 'OK') {
				console.log(data)
				alert(data.msg);
				$('#askUrl').val(data.quId); //返回问题ID
			} else {
				alert(data.ERROR);
			}
		}, function() {})
	} else { //修改
		obj.ajax('/pc/service/simpleEdit', {
			"quId": quId,
			"title": title, // 标题 question_title
			"askContent": askContent // 内容
		}, function(data) {
			if (data.status == 'OK') {
				alert(data.msg);
			} else {
				alert(data.msg);
			}
		}, function() {})
	}
}

//----------------------------------------------------------------------------------------预览/提交验证 ----------------------------------------------------------------------------------------


function saveValidate() {
	
	
	// 指定系统管理员审核
	var a = $('input[type="radio"][name="radio1"]:checked').val(); //指定发布方
	var auditDidsSub_flay = false;
	if(a ==1){
		auditDidsSub_flay = true ;
		
	}else{
		
		auditDidsSub_flay = false ;
	}
    if(auditDidsSub_flay){
    	
    	if($('.area_b ul li').length == 0){
    		alert("请选择指定系统管理员审核！");
		    return false;
    		
    	}
    }
	
	//项目详情

	if($('.act_detail').summernote('isEmpty')){
		
		alert("请填写项目详情！");
		return false;
	}
	
		$('.act_detail').summernote('code');
		$('.add_activitDetails').val($('.act_detail').summernote('code'));
		
		// 给富文本框赋值并获取     项目
	    
	    var s = [];
	    var summernoteBox = $('#add_div_activity_detail .project_in');  //获取富文本箱的长度
		for(var i=0;i<summernoteBox.length;i++){
			
			  s.push($('.summernote'+i+'').summernote('code'));
			
		}
		var summernoteList = $('#add_div_activity_detail .add_activit_info');  //获取富文本编辑器的长度
		for(var j = 0;j<summernoteList.length;j++){
			
		   for(var k= 0;k<=j;k++){
			   summernoteList[k].value = s[k];
			
		   }
		}
		
	
	
	//项目动态
	if($('.summernote0').summernote('isEmpty')){
		
		alert("请填写项目动态！");
		return false;
	}
	

	if ($('#activityName').val() == "") {
		alert("请填写活动名称！");
		return false;
	}

	if (!/^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/.test($('#ac_mobile').val())) {
		alert("请正确填写联系电话！");
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
    
    
    
    
	if ($('#preview2').attr('src') == "../../public/images/20170420.png") {
		alert("请上传banner图片！");
		return false;
	}

	if (!/^[\s\S]{100,1000}$/.test($('#activity_introduce').val())) {
		alert("活动简介内容需在100字-1000字-,若需要更详细介绍或图文显示，可发布至项目详情或项目动态！");
		return false;
	}
	if ($('#project_content').val() == "") {
		alert("请填写项目详情！");
		return false;
	}

	var detailList = $('#ff_activityDetailList').serializeJSONArray();
	for (var i = 0, l = detailList.length; i < l; i++) {
		if (detailList[i]["content"] == "") {
			alert("请填写项目动态！");
			return false;
		}
	}
	console.log(detailList.length)
	console.log(detailList)
	var projectType = $('#projectType').val();
	if(projectType.indexOf("，") > -1){
			alert("请正确填写参赛者分类：多个之间(英文)逗号隔开，如：个人,集体");
			return false;
	}

	var modelName = $('#templateName').val(); //模版名称
	var requirementsList = $('#ff_requirements').serializeJSONArray(); //1报名要求
	var processList = $('#ff_process').serializeJSONArray(); //活动流程
	var prizeList = $('#ff_prize').serializeJSONArray(); //奖项设置

	for (var i = 0, l = requirementsList.length; i < l; i++) {
		//  		for(var key in requirementsList[i]){
		//      		alert(key+':'+requirementsList[i][key]);
		if (requirementsList[i]["content"] == "") {
			alert("请填写报名要求！");
			return false;
		}
	}

	if (modelName != "model2") {
		for (var i = 0, l = processList.length; i < l; i++) {
			for (var key in processList[i]) {
				if (processList[i][key] == "") {
					alert("请填写活动流程！");
					return false;
				}
			}

			if (processList[i]["endTime"] < processList[i]["startTime"]) {
				alert("活动流程结束时间需大于开始时间，请重新输入!");
				return false;
			}
		}
	}

	if (modelName == "model1") {
		for (var i = 0, l = prizeList.length; i < l; i++) {
			for (var key in prizeList[i]) {
				if (prizeList[i][key] == "") {
					alert("请填写奖项设置！");
					return false;
				}
			}
		}

		if ($('#askUrl').val() == "") {
			alert("请创建在线咨询！");
			return false;
		}
	}
	
	return true;
}

//----------------------------------------------------------------------------------------预览模板效果----------------------------------------------------------------------------------------
function yulan() {
	$('#box1').css('display', 'none');
	$('#htfuchuang').css('display', 'none');
	$('.step_div').show();
	
	/****** 第3部分  预览  ********/
	$('#bannerUrl2').attr('src', $('#preview2').attr('src')) //头部图片
	$('#askMobile').html($('#ac_mobile').val()) //热线电话
	$('#activityDate').html($('#beginTime1').datebox('getValue') + '-' + $('#endTime1').datebox('getValue')) //活动时间     会报错
	$('#activityRemark').html($('#activity_introduce').val()) //活动介绍
	$('.zhuban span').html($('#mainCompany1').val()); //主办单位

	//评选流程
	function getPinxuanValue() {
		var pinxuan1_arr = [];
		var pinxuan2_arr = [];
		$(".pinxuan2").each(function(i) {
			$(this).find('input').each(function(i) {
				pinxuan1_arr.push(($(this).val()));
			})
		});
		console.log(JSON.stringify(pinxuan1_arr));
		return pinxuan1_arr;
	}

var html = '';
	for (var i = 0; i < 4; i++) {
		html += '<li>'
		html += '<div class="li_con">'
		html += '<div class="imgDiv"><img src="img/00_process.png" alt="" class="a01" width="31" height="42"></div>'
		html += '<h3>07/20 - 07/24</h3>'
		html += '<p>gfbf </p>'
		html += '</div>'
		html += '</li>'
	}

	$('#yulan-activitLC').html(html) //活动流程

	/*** 评选规则 ***/
	//奖项设置
	function getPrizeValue() {
		var prize1_arr = [];
		$(".prize1").each(function(i) {
			$(this).find('input').each(function(i) {
				prize1_arr.push($(this).val());
			})
		});

		console.log(JSON.stringify(prize1_arr));
		console.log($(".prize1").length)
		return prize1_arr;
	}
	$('.rule >ul').html();
}

//----------------------------------------------------------------------------------------获取自定义栏目信息----------------------------------------------------------------------------------------
function getActivityLabelName() {
	//获取活动基本信息
	//	var activity = $('#ff_activity').serializeJSONObject();
	//	var actId = activity['id'];//活动id
	var hdjs = $('#hdjs').val(); //活动介绍/详情
	var news1 = $('#news1').val();
	//	var news2 = $('#news2').val();
	var newsList1 = $('#newsList1').val();
	//	var newsList2 = $('#newsList2').val();
	var hdlc = $('#hdlc').val(); //活动流程
	var bmyq = $('#bmyq').val(); //报名要求
	//	var xmyq = $('#xmyq').val();//项目要求
	//	var fj = $('#fj').val();//附件
	var jlsz = $('#jlsz').val(); //奖励设置
	//	var pxgz = $('#pxgz').val();//评选规则
	var zbdw = $('#zbdw').val(); //主办单位
	var xbdw = $('#xbdw').val(); //协办单位
	var cbdw = $('#cbdw').val(); //承办单位
	//	var zxzxlj = $('#zxzxlj').val();//在线咨询链接
	var cpxm = $('#cpxm').val(); //参评项目
	var cszfl = $('#cszfl').val(); //参赛者分类

	var txt = '{' +
		//	"actId":"'+actId+'",
		'"hdjs":"' + hdjs + '",' +
		'"news1":"' + news1 + '",' +
		'"newsList1":"' + newsList1 + '",' +
		'"hdlc":"' + hdlc + '",' +
		'"bmyq":"' + bmyq + '",' +
		'"jlsz":"' + jlsz + '",' +
		'"zbdw":"' + zbdw + '",' +
		'"xbdw":"' + xbdw + '",' +
		'"cbdw":"' + cbdw + '",' +
		'"cpxm":"' + cpxm + '",' +
		'"cszfl":"' + cszfl + '"' +
		'}';
	return JSON.parse(txt);
}

//----------------------------------------------------------------------------------------获取封装好的activity对象信息----------------------------------------------------------------------------------------
function getObjAddInfo() {
	$('#cat_pro_info').val($('.summernote1').summernote('code'));
     
    console.log($('#cat_pro_info').val());
 
	
	
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

	//报名审核 -指定下级区域管理员可以审核
	
	function auditDidsSub() {
		var a = $('input[type="radio"][name="radio1"]:checked').val(); //指定发布方
//		var a2 = $('input[type="checkbox"][name="radio2"]:checked').val(); //指定下级区域可以审核
		if (a == 0) { // 否 ，不可以审核
			
		}
		if (a == 1) { //可以审核
			//		    		var area_b_arr =[];
			var area_b_arr = '';
			$('.area_b').find('li').each(function(i) {
				//		    	    	area_b_arr.push($(this).attr('value'));
				area_b_arr += $(this).attr('value') + ',';
			})
			console.log(area_b_arr);
			return area_b_arr.substring(0, area_b_arr.length - 1);
			
		}
		
	}
    
    
	var activiteObj = {};
	activiteObj['id'] = $('#activity_id').val(); //活动id
//	activiteObj['id'] = 190; //活动id
	activiteObj['type'] = activityType(); //活动类型
	activiteObj['title'] = $('#activityName').val(); // 活动名称
	activiteObj['mobile'] = $('#ac_mobile').val(); //咨询电话
	
	activiteObj['startTime'] = $('#beginTime1').datetimebox('getValue'); //报名时间
	activiteObj['endTime'] = $('#endTime1').datetimebox('getValue'); //报名截止时间
	activiteObj['voteStartTime'] = $('#beginTime2').datetimebox('getValue'); //投票开始时间
	activiteObj['voteEndTime'] = $('#endTime2').datetimebox('getValue'); //投票结束时间
	activiteObj['auditDids'] = auditDidsSub(); //指定可审核地市/高校地区
	activiteObj['auditDidsSub'] = $('#auditDidsSub').is(':checked') ? 1 : 0; //指定可审核地市/高校地区 下级区域系统管理员是否可审核
	activiteObj['templateName'] = $('#templateName').val(); //模版名称
	activiteObj['bannerUrl'] = $('#preview2').attr('src'); //banner图片url
	activiteObj['remark'] = $('#activity_introduce').val(); //活动介绍
	activiteObj['detailList'] = $('#ff_activityDetailList').serializeJSONArray(); //项目动态
	activiteObj['requirementsList'] = $('#ff_requirements').serializeJSONArray(); //1报名要求，2项目要求
	activiteObj['processList'] = $('#ff_process').serializeJSONArray(); //活动流程
	activiteObj['prizeList'] = $('#ff_prize').serializeJSONArray(); //奖项设置
	activiteObj['showProject'] = $('input[name="takeProject"]:checked').val(); //是否显示参赛者列表 
	
	var projectType = $('#h2_project_type').html();
	if(projectType){
		projectType = projectType+","+$('#projectType').val();
	}else{
		projectType = $('#projectType').val();
	}
	activiteObj['projectType'] = projectType; //参赛者分类（多个逗号隔开，如：XX,XX,XX）
	
	activiteObj['voteGuide'] = $('#guide').val(); //投票指引
	activiteObj['enrollGuide'] = $('#guide2').val(); //报名指引
	activiteObj['askUrl'] = $('#askUrl').val(); //咨询链接
	activiteObj['datazipUrl'] = $('#datazipUrl').val(); //附件
	activiteObj['sponsorUnit'] = $('#mainCompany1').val(); //主办单位
	activiteObj['assistUnit'] = $('#mainCompany2').val();  //协办单位 
	activiteObj['undertakeUnit'] = $('#mainCompany3').val(); //承办单位

	console.log(activiteObj);
	return activiteObj;
}

//----------------------------------------------------------------------------------------新增/编辑活动----------------------------------------------------------------------------------------
function saveActivity() {
	//验证
	
//	
	if (!saveValidate()) {
		return;
	}
	var activity = getObjAddInfo();
	var activityLabelName = getActivityLabelName();
	var activityDetail = $('#ff_activityDetail').serializeJSONObject();
	console.log(activity)
	console.log(activityLabelName)
	console.log(activityDetail)
	console.log(activity.id)
	var saveUrl = "/bg/project/addActivity";
	if (activity.id != "") {
		saveUrl = "/bg/project/editActivity";
	}

	$('#save_activity,#next_or_back').removeAttr('onclick');
	$('#save_activity,#next_or_back').html("提交中......");

	obj.ajax(saveUrl, {
		"activityStr": JSON.stringify(activity),
		"activityLabelNameStr": JSON.stringify(activityLabelName),
		"activityDetailStr": JSON.stringify(activityDetail)
	}, function(data) {
		console.log(data);
		if (data.status == 'OK') {
			alert(data.msg);
			$('.inner_box').css('display', 'none');
			
			
				window.location.href = "../heavy_project/heavy_project.html?limit="+limits;
		} else {
			alert(data.msg);
		}
	}, function() {})
}

//----------------------------------------------------------------------------------------附件上传----------------------------------------------------------------------------------------
function uploadFile() {
	$('#pickFileBtnNext').html("上传中......");
	var dir = 'activityFile';
	var fileList = document.getElementById("up_file").files;
	$.ajaxFileUpload({
		url: ctx + '/file_upload', //用于文件上传的服务器端请求地址
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
			}
	});

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
//下一页
function nextPage(pageIndex){
	$('.inner_box').css('display', 'none');
	$('.box'+(pageIndex+1)).css('display', 'block');
}

//上一页
function backPage(pageIndex){
	$('.inner_box').css('display', 'none');
	$('.box'+(pageIndex-1)).css('display', 'block');
}

function cancelSave() { //取消新增/修改
	if (confirm("确认放弃当前输入内容？")) {
		$('#box1').css('display', 'none');
		$('#box2').css('display', 'none');
		$('.step_div').css('display', 'none');
		window.location.href = "../heavy_project/heavy_project.html";
	} else {
		return;
	}
}

//根据所选模板隐藏/显示第二步相应模块
function changeModel(modelName){
    if (modelName != "model2") {//隐藏活动流程
        $('#div_activity_process').css("display","block");
	}else{
        $('#div_activity_process').css("display","none");
	}
	
	if (modelName != "model1") {//隐藏奖项设置、咨询链接
        $('#div_activity_prize').css("display","none");
        $('#div_activity_question').css("display","none");
        
        $('#next_or_back').html("确认发布");
//      $("#next_or_back").attr('onclick','');
//      $("#next_or_back").click( eval(function(){saveActivity()}));
//      unbind
        $("#next_or_back").removeAttr('onclick');
        $("#next_or_back").attr('onclick','saveActivity()');
	}else{
        $('#div_activity_prize').css("display","block");
        $('#div_activity_question').css("display","block");
        $('#next_or_back').html("下一页");
        $("#next_or_back").removeAttr('onclick');
        $("#next_or_back").attr('onclick','nextPage(3)');
	}
	
    //根据所选模板显示banner尺寸提示
    if (modelName == "model1" || modelName == "model2"){
        $('#banner_size_span').html("建议尺寸（1200px * 437px）");
    }else if(modelName == "model3"){
        $('#banner_size_span').html("建议尺寸（1900px * 640px）");
    }else if(modelName == "model4"){
        $('#banner_size_span').html("建议尺寸（1900px * 400px）");
    }
}
//----------------------------------------------------------------------------------------测试----------------------------------------------------------------------------------------
function addActivityProject(){
	obj.ajax('/project/enroll/addProject', {
		"activityId": 21, //问题类别：其他
		"reporterName": "reporterName", // 标题 question_title
		"mobile": "18256487895", // 内容
		"email": "email", // 内容
		"projectName": "projectName",// 内容
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


