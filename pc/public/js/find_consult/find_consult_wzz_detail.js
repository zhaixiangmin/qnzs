//$(document).ready(function(){
	var oid = Utils.getQueryString('oid');
	//function createEle(){
		FindConsultApi.findOrganizationById({oid: oid}).then(function (data) {
			//createEle(data);
			$("#address").text(data.rows.address);//地址
			$("#telephone").text(data.rows.telephone);//电话
			$("#orgName").text(data.rows.name);//组织名称
			$("#exp_photoUrl").attr("src",data.rows.photoUrl);//头像
			$("#description").text(data.rows.description);//组织介绍
			$("#answerQuestionCount").text(data.rows.answerQuestionCount);//解决问题数
			$("#attentionCount").text(data.rows.attentionCount);//关注
			$("#nav_orgName").text(data.rows.name);//面包屑姓名
//向TA提问
			$("#exp_title").text(data.rows.name);//标题
			$("#tw_name").text(data.rows.name);//组织名称
			$("#tw_photoUrl").attr("src",data.rows.photoUrl);//头像
			$("#tw_answerQuestionCount").text(data.rows.answerQuestionCount);//解决问题数
			$("#tw_attentionCount").text(data.rows.attentionCount);//关注
		});

	// }
	// //}
	// createEle()
//关注。取消关注
// var isClick = false; // 是否已点击(true：已点击，false：未点击)
// // 点击 '关注'
// $('#wzjxqAttention').click(function () {
// 	if(isClick) { // 如果已点击
// 		return;
// 	}
// 	isClick = true; // 设置已点击
// 	FindConsultApi.followOrCancel({ orgId: oid }).then(function (data) {
// 		if(data.msg.indexOf('取消') != -1) { // 取消关注成功，显示'关注'
// 			$('#wzjxqAttention span').text('关注');
// 		}else { // 关注成功，显示'取消关注'
// 			$('#wzjxqAttention span').text('取消关注');
// 		}
// 	}).always(function () {
// 		isClick = false;
// 	});
// });

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

// askExpertUI()
//向TA提问
	$('#wzz_detail_ask').click(function () {
//alert(1111)
	$("#quesCategory").empty();
	//var username = Utils.getQueryString('username');
	//console.log('专家00',username);
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
				}
				;
				$('#quesCategory').append(html);
			}
		}
		work_list_team02()

	//用户未登录

	$(".bg_black").css("display","block");
		$('.list_tanchuang_t .delete').click(function () {
			$('.bg_black').hide();
		})
	$('.bg_black .list_tanchuang .list_tanchuang_b .content_r').show();

//增加
	$('#submit_help').click(function () {
		// var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
		var params = {
			categoryId: $('#quesCategory').val(), // 求助人
			title: $('#quesTitle').val(), // 标题 
			// askContent: $('#editor').val(), // 内容
			askContent: filterXSS(editor.txt.html()),
			//accExpertIdsStr: username, // 专家ID 
			quesImagesStr: $('#imgUrl').text() // 图片(字符串)
		};
		if(!params.title) {
			$.alert('请输入标题');
			return;
		}
		if(!params.askContent) {
			$.alert('请输入内容');
			return;
		}
		if(!params.quesImagesStr) {
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
});
//askExpertUI();
//增加END

//问题列表

function createEle(data){
	var num=3;
	var html='';
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		//var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
		html+='<li class="listBox">'
		html+='<a href="find_consult_quesdetail.html?quId=' + item.quId + '" class="itemBox bgcWhite disB">'
		html+='<div class="itemCon clearfix">'
		html+='<div class="imgDiv fl"><img src="'+item.photourl+'"></div>'
		html+='<div class="rightTxt"><h3>' + item.title + '</h3>'
		html+='<p class="middleP oneMarginTopBot">'+ item.askContent+'</p>'
		html+='<div class="botBox clearfix">'
		html+='<div class="left fl">'
		html+='<span class="span01 borderR01">'+ item.realname+'</span>'
		html+=' <span class="span02">'+ item.categoryName+'</span> '
		html+='<span class="span03">'+item.askTime+'</span>'
		html+='</div>'
		html+='<span class="right fr color333 pinglun">'+ item.commentsNum+'</span>'
		html+='</div>'
		html+='</div>'
		html+='</div>'
		html+='</a>'
		html+='</li>'
	};
	//$('.list_ul').append(html);
	return html;
}
//}
//work_list_team()
	//var username = Utils.getQueryString('username');
function pageCheck(parentCell, contentCell, data) {
	$(parentCell).pageFun({
		contentCell: contentCell, /*包裹数据列表的父容器*/
		maxPage:6,/*显示页码框个数*/
		pageFun:function(i){
			var pageHtml = '<li class="pageNum">'+i+'</li>';
			return pageHtml;
		},
		apiProxy:FindConsultApi.getExpAnswerList, /*接口函数*/
		data: data,
		listFun: createEle, /*数据列表函数 -- 返回html字符串*/
		arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
	});
}

var data = {  /*接口参数*/
	page: 1,//当前页
	rows: 8,//显示总页数
	sitenavOrgId: undefined,//所属分站ID
	categoryId: undefined,//类别id
	keyword: undefined, // 关键字
	username:oid//选择

};
// 分页器插件 -- 求助中
pageCheck('.pageBoxList', '#quesList', data);


//})
