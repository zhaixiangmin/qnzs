//$(document).ready(function() {
// 	//问大家
// 	$('#oneAsk').click(function() {
// 		//用户未登录提问跳出登录弹窗
// 		// if(currentUser == null || currentUser == ""){
// 		// 	if(confirm("请先登录！")){
// 		// 		$('.dark02').fadeTo(400,0.5);
// 		// 		$('.loginBox').fadeIn(400);
// 		// 	}
// 		// }else
// 		// {
// 			$("#quesCategory").empty();
//
// 		FindConsultApi.getServiceCategory(data).then(function (data) {
//
// 			var html='';
// 			for (var i = 0; i < data.rows.length; i++) {
// 				html+='<option  value="'+data.rows[i].caId+'" >'+data.rows[i].name+'</option>'
// 			};
// 			$('#quesCategory').append(html);
// 		})
// 			clearForm();
// 			$('.bg_black').show();
// 			$('.bg_black .list_tanchuang .name em').text("大家");
// 			$('.bg_black .list_tanchuang .list_tanchuang_b .content_r').hide();
// 			uploader.refresh();
// 		//}
// 	});
//
// 	$(".list_tanchuang .list_tanchuang_t .delete").click(function(){
// 		$(".bg_black").hide();
// 	});
//
// 	$(".tiwenBtn").click(function(){
// 		$(".bg_black").css("display","block");
// 		uploader.refresh();
// 	});
//
//
//
//
// });
	function clearForm() {
		$("#exp_title").text("");
		$("#exp_realName").text("");
		$("#exp_photoUrl").attr("src", "");
		$("#exp_profession").text("");
		$("#exp_replyCount").text("");
		$("#exp_attentionCount").text("");
		$("#exp_aid").val("");
		$("#quesAccExpert").val("");
		$("#exp_aid").attr("href", "");

		//form表单清空
		$("#quesCategory").val("");
		$("#quesTitle").val("");
		$("#quesContent").val("");
		//$("div.u-item").remove();
		$("#editor").val("");

	}


	/*
	 * 编辑内容上传图片
	 * */
	var E = window.wangEditor;
	var editor = new E('#editor');
// var editor = new window.wangEditor('#editor');

// 配置服务器端地址(上传图片)
	editor.customConfig.uploadImgServer = Qnzs.path + '/file_upload';

// 监听函数(上传图片)
	editor.customConfig.uploadImgHooks = {
		// 图片上传之前触发
		// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件
		before: function (xhr, editor, files) {
			
		},
		success: function (xhr, editor, result) {
			// 图片上传并返回结果，图片插入成功之后触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
			
		},
		fail: function (xhr, editor, result) {
			// 图片上传并返回结果，当图片插入错误时触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
			
			$.alert('系统繁忙，请稍后再来吧！');
		},
		error: function (xhr, editor) {
			// 图片上传错时触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
			
		},
		timeout: function (xhr, editor) {
			// 图片上传超时触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
		
			$.alert('系统繁忙，请稍后再来吧！');
		},
		customInsert: function (inserImg, result, editor) {
			// 图片上传并返回结果，自定义插入图片时间（而不是编辑器自动插入图片!!!）
			// inserImg 是 插入图片的函数，editor 是编辑器对象，result 是服务器端返回结果

			var url = result.url;
			inserImg(url);
			// result 必须是一个 JSON 格式字符串！！！否则报错
		}
	};

	editor.create();


//问组织提问
	function askAccPblicUI(oid) {
		$("#quesCategory").empty();
		
		//服务类别列表
		function work_list_team02() {
			sendAjax();  //初始化列表
			function sendAjax(data) {
				FindConsultApi.getServiceCategory(data).then(function (data) {//类别列表
					createEle(data.rows);
					
				})
			}
			function createEle(data) {
				var html = '';
				for (var i = 0; i < data.length; i++) {
					html += '<option  value="' + data[i].caId + '" >' + data[i].name + '</option>'
				};

				$('#quesCategory').append(html);
			}
		}

		work_list_team02()
		//用户未登录提问跳出登录弹窗
		clearForm();
//  window.event.stopPropagation();
// 	if(currentUser == null || currentUser == ""){
// 		if(confirm("请先登录！")){
// 			$('.dark02').fadeTo(400,0.5);
// 			$('.loginBox').fadeIn(400);
// 		}
// 	}else{
		FindConsultApi.findOrganizationById({oid: oid}).then(function (data) {
			$("#exp_title").text(data.rows.name);//标题
			$("#exp_realName").text(data.rows.name);//组织名字
			//$("#exp_profession").text(data.rows.expProfession);//专业特长
			$("#exp_photoUrl").attr("src", data.rows.photoUrl);//头像
			$("#exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
			$("#exp_attentionCount").text(data.rows.attentionCount);//关注

			//$("#exp_aid").attr("href",base+"/find_consult_wzj_detail.html?username=");
		})

		// $("#exp_aid").val(aid);
		// $("#quesAccExpert").val(aid);
		// $("#exp_aid").attr("href",Qnzs.path+"/pcFindInterlocution/getExpertDetail?aId="+aid+"&count="+replyCount);
		$(".bg_black").css("display", "block");
		$('.bg_black .list_tanchuang .list_tanchuang_b .content_r').show();
		$('.list_tanchuang_t .delete').click(function () {
			$('.bg_black').hide();
		})
		// 点击 '查看' 按钮(求助弹出框)
		$('#chakan').click(function () {
			// var username = $(this).data('username');
			window.location.href = 'find_consult_wzz_detail.html?username=' + oid; // 跳转到组织详情页面
		});
		//uploader.refresh();
		//}

//增加
		$('#submit_help').click(function () {
			
			
			// var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
			var params = {
				categoryId: $('#quesCategory').val(), // 求助人
				title: $('#quesTitle').val(), // 标题 
				// askContent: $('#editor').val(), // 内容
				askContent: filterXSS(editor.txt.html()),
				accOrgIdsStr: oid, // 组织ID 
				quesImagesStr: $('#imgUrl').text() // 图片(字符串)
			};
			if (!params.title) {
				$.alert('请输入标题');
				return;
			}
			if (!params.askContent) {
				$.alert('请输入内容');
				return;
			}

			if (!params.quesImagesStr) {
				$.alert('请上传图片');
				return;
			}


			// 提交求助申请
			FindConsultApi.add(params).then(function (data) {
				$(".bg_black .delete").click(); // 手动关闭求助申请对话框
				$.alert(data.msg).then(function () {
					window.location.reload(); // 刷新页面
				});
			})
		});
		//}

	}
//})


