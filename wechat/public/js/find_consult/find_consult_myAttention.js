$(document).ready(function(){
	var quId = Utils.getQueryString('quId');//包裹字符串
	var username = Utils.getQueryString('username');
	var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
	var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

	var data_publish = {  /*我的发布接口参数*/
		page: 1,//当前页
		rows: 18,//显示总页数
		dataType:'publish', // 站内信类型

	};
	var data_collect = {  /*我的收藏接口参数*/
		page: 1,//当前页
		rows: 18,//显示总页数
		dataType:'collect', // 站内信类型

	};
	function render_helplist($listContent, helps, isClear) {
		var status = {
			'0':'未读',
			'1':'<font style="color: #000">已读</font>'
		}
		var html = '';

		for (var i = 0; i < helps.length; i++) {
			var item = helps[i];
			//var askTime_zxfb = new Date(item.askTime).format('yyyy-MM-dd');
			var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
			html+='<div class="content_in clearfix">'
			html+='<a href="../find_consult/find_consult_question_detail.html?quId='+item.quId+'">'
			html+='<div class="l">'
			html+='<div class="circle"><img src="'+ Utils.compressByAli(imgUrl, 120, 120) +'"/></div>'
			html+='</div>'
			html+='<div class="r">'
			html+='<div class="up">'
			html+='<h3>'+item.title+'</h3>'
			html+='<p class="askcont">'+item.askContent+'</p>'
			html+='</div>'
			html+='<div class="down clearfix">'
			html+='<div class="left clearfix">'
			html+='<span class="span01">'+item.categoryName+'</span>'
			html+='<span class="span02">'+item.realname+'</span>'
			html+='<span class="span03">'+item.askTime+'</span>'
			// html+='<span>18:56</span>'
			html+='</div>'
			html+='<div class="right">'
			html+='<em><img src="../../public/img/pinglun.png" /></em><span>'+item.commentsNum+'</span>'
			html+='</div>'
			html+='</div>'
			html+='</div>'
			html+='</a>'
			html+='</div>'
			// html += '<a href="javascript:;" class="itemBox bgcWhite ">'
			// html += ' <div class="itemCon borderB01 clearfix">'
			// html += '  <div class="imgDiv fl"><img src="'+imgUrl+'"></div>'
			// html += '  <div class="rightTxt">'
			// html += '   <h3 class="font16 color2185cf">'+item.title+'</h3>'
			// html += '   <p class="color000">'+item.askContent+'</p>'
			// html += '   <div class="botBox clearfix">'
			// html += '    <div class="left fl">'
			// html += '     <span class="span01 borderR01">'+item.realname+'</span>'
			// html += '     <span class="span02">'+item.categoryName+'</span>'
			// html += '     <span class="span03">'+askTime_zxfb+'</span>'
			// html += '    </div>'
			// html += '    <span class="right fr color333 pinglun">'+item.commentsNum+'</span>'
			// html += '   </div>'
			// html += '  </div>'
			// html += ' </div>'
			// html += '</a>'

		}

		if(isClear) {
			$listContent.html(html); // 替换当前内容
			return;
		}

		$listContent.append(html); // 向后添加当前内容
	}

	/**
	 * 加载帮助列表并渲染页面
	 * @param fun {function} 加载帮助函数
	 * @param params {obj} 加载帮助函数的参数
	 * @param $listContent {jq} 渲染页面的jq对象
	 * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
	 */
	function loadHelpList(fun, params, $listContent, isClear) {
		// 获取推荐服务帮助列表
		fun(params).then(function (data) {
			var helps = data.rows;
			console.log('找咨询', data);

			// if(params.page == 1) { // 第一页
			// 	$('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
			// }

			render_helplist($listContent, helps, isClear); // 渲染帮助列表
			if(helps && helps.length >= params.rows) { // 全部列表数据尚未查询完毕
				finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
				return;
			}

			finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
			// 全部列表数据查询完毕
			$listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

		}).always(function () {
			params.page++; // 页码自增
			loadedFlag = true; // 设置加载完成(全局变量)
		});
	}

	loadHelpList(FindConsultApi.getMyQuestions, data_publish, $('#quesList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.getMyQuestions, data_publish, $('#quesList')); // 加载帮助列表并渲染页面
		}
	});
     // 我的收藏
	loadHelpList(FindConsultApi.getMyQuestions, data_collect, $('#collectList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.getMyQuestions, data_collect, $('#collectList')); // 加载帮助列表并渲染页面
		}
	});
	/*我要吐槽*/
	$('#submitComplain_tucao').click(function() {

		var quesContent = $('#quesContent').val()
		FindConsultApi.woyaoTucao({
			quesContent: quesContent
		}).then(function(data) {
			$.alert('拍砖成功！').then(function () {
				window.history.back();
				return;
			});
		});
		//}
	})
	//我的收藏 咨询
	// function createEle(data) {
	// 	var num = 4;
	// 	var html = ''
	// 	for (var i = 0; i < data.length; i++) {
	// 		var askTime_zxsc = new Date(data[i].askTime).format('yyyy-MM-dd');
	// 		var imgUrl = data[i].photourl ? data[i].photourl : '../../public/img/default_avator.png';
	// 		html += '<a href="javascript:;" class="itemBox bgcWhite ">'
	// 		html += ' <div class="itemCon borderB01 clearfix">'
	// 		html += '  <div class="imgDiv fl">'
	// 		html += '   <img src="'+imgUrl+'">'
	// 		html += '  </div>'
	// 		html += '  <div class="rightTxt">'
	// 		html += '   <h3 class="font16 color2185cf">'+data[i].title+'</h3>'
	// 		html += '   <p class="color000">'+data[i].askContent+'</p>'
	// 		html += '   <div class="botBox clearfix">'
	// 		html += '    <div class="left fl">'
	// 		html += '     <span class="span01 borderR01">'+data[i].realname+'</span>'
	// 		html += '     <span class="span02">'+data[i].categoryName+'</span>'
	// 		html += '     <span class="span03">'+askTime_zxsc+'</span>'
	// 		html += '    </div>'
	// 		html += '    <span class="right fr color333 pinglun">'+data[i].commentsNum+'</span>'
	// 		html += '   </div>'
	// 		html += '  </div>'
	// 		html += ' </div>'
	// 		html += '</a>'
    //
	// 	};
	// 	return html;
    //
	// }
	// function pageCheck(parentCell, contentCell, data) {
	// 	$(parentCell).pageFun({
	// 		contentCell: contentCell, /*包裹数据列表的父容器*/
	// 		maxPage:6,/*显示页码框个数*/
	// 		apiProxy:FindConsultApi.getMyQuestions, /*接口函数*/
	// 		data: data,
	// 		listFun: createEle, /*数据列表函数 -- 返回html字符串*/
	// 		arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
	// 	});
	// }
    //
	// var data_sczx = {  /*接口参数*/
	// 	page: 1,//当前页
	// 	rows: 18,//显示总页数
	// 	dataType:'collect', // 站内信类型
    //
	// };
	// pageCheck('.sczx_pageBoxList', '#list_cszx', data_sczx);
});//文档准备结束
