$(document).ready(function(){
	var username = Utils.getQueryString('username');
	//console.log('username', username);
	// function createEle(){
	FindConsultApi.findAccountById({username: username}).then(function (data) {
		//createEle(data);
		console.log('专家11',data);
		$("#address").text(data.rows.address);//地址
		$("#telephone").text(data.rows.mobile);//电话
		$("#orgName").text(data.rows.orgName);//姓名
		$("#exp_photoUrl").attr("src",data.rows.photoUrl);//头像
		$("#expProfession").text(data.rows.expProfession);//职业
		$("#speciality").text(data.rows.speciality);//专业特长
		$("#introduction").text(data.rows.introduction);//介绍
		$("#nav_usename").text(data.rows.orgName);//面包屑姓名
		$("#exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
		$("#exp_attentionCount").text(data.rows.questionAttentionCount);//关注
//向TA提问
		$("#tw_photoUrl").attr("src",data.rows.photoUrl);//头像
		$("#tw_orgName").text(data.rows.orgName);//姓名
		$("#til_orgName").text(data.rows.orgName);//姓名
		$("#tw_exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
		$("#tw_exp_attentionCount").text(data.rows.questionAttentionCount);//关注
	});
	
//初始化类别列表
	function work_list_team() {
		sendAjax();  
		function sendAjax(data) {

			FindConsultApi.getServiceCategory(data).then(function (data) {
				createEle(data.rows);
				console.log('专家22',data);
			})
		}
		//createEle();
		function createEle(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				html += '<option  value="' + data[i].caId + '" >' + data[i].name + '</option>'
			}
			$('#quesCategory').append(html);
		}
	}
	work_list_team()
	//初始化类别列表END

	//增加
	$('#submit_help').click(function () {
		
		$('#exp_photoUrl').data('id', username);//获取当前页面ID值
		var id = $('#exp_photoUrl').data('id');
		console.log('回复获取id', id);
		//console.log('submit_help');
		// var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
		var params = {
			categoryId: $('#quesCategory').val(), // 话题分类
			title: $('#quesTitle').val(), // 标题 
			askContent: $('#askContent').val(), // 内容
			accExpertIdsStr:id,//问专家必填（专家ID）
			//askContent: filterXSS(editor.txt.html()),
			//accExpertIdsStr: username, // 专家ID 
			quesImagesStr: $('#imgUrl').text() // 图片(字符串)
		};
		console.log('params', params);
		if (!params.title) {
			$.alert('请输入标题');
			return;
		}
		console.log('params.title.length', params.title.length);
		if (!params.askContent) {
			$.alert('请输入内容');
			return;
		}

		// if (!params.quesImagesStr) {
		// 	$.alert('请上传图片');
		// 	return;
		// }

		// 提交求助申请
		FindConsultApi.add(params).then(function (data) {
		
			
	
			$(".bg_black .delete").click(); // 手动关闭求助申请对话框
			$.alert(data.msg).then(function () {
				
				window.location.href ='find_consult_expert_detail.html?username='+username;
//				window.location.reload(); // 刷新页面
//
			});
		})
	});

});
console.log(base)
