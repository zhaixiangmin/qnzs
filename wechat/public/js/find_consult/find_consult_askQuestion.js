/*
 向专家提问
 * */

$(document).ready(function() {
	
	
	//获取登录者信息
	obj.ajax('/commons/getSessionAccount',{},function(data){
		console.log(data)
		if(data.status =='OK'){
			username = data.account.username ;
		}
	})
	
	
	
	
	//function askExpertUI() {
		$("#quesCategory").empty();
		//var username = Utils.getQueryString('username');
		//console.log('专家11', username);
// 		FindConsultApi.getServiceCategory(data).then(function (data) {//类别列表
// console.log('data',data)
//
// 		})
	function work_list_team() {
		sendAjax();  //初始化列表
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
	
		//增加
		$('#submit_help').click(function () {
			
			console.log('submit_help');
			// var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
			var params = {
				categoryId: $('#quesCategory').val(), // 话题分类
				title: $('#quesTitle').val(), // 标题 
				askContent: $('#askContent').val(), // 内容
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
			
				console.log(data);
//				console.log('FindHelpApi.addHelp data', data);
				$(".bg_black .delete").click(); // 手动关闭求助申请对话框
				
				$.alert(data.msg).then(function () {
					
					window.location.href ='find_consult_question_detail.html?quId='+data.quId+'&username='+username;
                   
				});
			})
		});
	//}
})
console.log(base);

//获取浏览器的路径			
