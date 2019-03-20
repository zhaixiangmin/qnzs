$(document).ready(function(){
	var id = Utils.getQueryString('messageId'); // 帮助ID
           //导航切换
	$('.sysinformation .title_item').click(function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.sysinformation .content').eq($(this).index()).show().siblings('.content').hide();
	});

	var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
	var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

	var data = {  /*接口参数*/
		pageNo: 1,//当前页
		pageSize: 18,//显示总页数
		msgType:"", // 站内信类型

	};
	var data_sys = {  /*接口参数*/
		pageNo: 1,//当前页
		pageSize: 18,//显示总页数
		msgType:0, // 站内信类型

	};
	var data_org = {  /*接口参数*/
		pageNo: 1,//当前页
		pageSize: 18,//显示总页数
		msgType:1, // 站内信类型

	};
	var data_user = {  /*接口参数*/
		pageNo: 1,//当前页
		pageSize: 18,//显示总页数
		msgType:2, // 站内信类型

	};
	/**
	 * 渲染帮助列表
	 * @param $listContent {jq} 列表包裹父容器(jq对象)
	 * @param comments {array} 帮助列表
	 * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
	 */
	function render_helplist($listContent, helps, isClear) {
		var status = {
			'0':'未读',
			'1':'<font style="color: #000">已读</font>'
		}
		var html = '';
		for (var i = 0; i < helps.length; i++) {
			var item = helps[i];
			
			
			// var createTime = new Date(help.createTime).format('yyyy/MM/dd hh:mm');
			// var datetime = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
			var imgUrl = item.sendPhoto ? item.sendPhoto : '../../public/img/default_avator.png';
			
			
			
			
			 content = item.content.replace(/\[<a\shref=[^移动端]*>PC端<\/a>]/,'');
			
			html+='<div class="content_in clearfix">'

			html+='<div class="l">'
			html+='<div class="circle"><img src="'+imgUrl+'"/></div>'
			html+='</div>'
			html+='<div class="r">'
			html+='<div class="up">'
			html+='<h3>'+item.title+'</h3>'
			html+='<p class="askcont">'+content+'</p>'
			html+='</div>'
			html+='<div class="down clearfix">'
			html+='<div class="left clearfix">'
			html+='<span class="span01">' + item.msgTypeStr + '</span>'
			html+='<span class="span02">'+status[item.status]+'</span>'
			html+='<span class="span03">'+item.receiveTime+'</span>'
			// html+='<span>18:56</span>'
			html+='</div>'
			html+='<div class="right">'
			html+='<span onclick="delMessage('+item.receiveId+');">删除</span>'
			html+='</div>'
			html+='</div>'
			html+='</div>'

			html+='</div>'
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

			if(params.page == 1) { // 第一页
				$('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
			}

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

	loadHelpList(FindConsultApi.findAllMessage, data, $('#list_all')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.findAllMessage, data, $('#list_all')); // 加载帮助列表并渲染页面
		}
	});
//	系统消息
	loadHelpList(FindConsultApi.findAllMessage, data_sys, $('#list_sys')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.findAllMessage, data_sys, $('#list_sys')); // 加载帮助列表并渲染页面
		}
	});
//	组织消息
	loadHelpList(FindConsultApi.findAllMessage, data_org, $('#list_org')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.findAllMessage, data_org, $('#list_org')); // 加载帮助列表并渲染页面
		}
	});
//	用户消息
	loadHelpList(FindConsultApi.findAllMessage, data_user, $('#list_user')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.findAllMessage, data_user, $('#list_user')); // 加载帮助列表并渲染页面
		}
	});

// 	$('#container').data('id', messageId);//获取当前页面ID值
// 	var id = $('#container').data('id');
// 根据站内信ID获取站内信
// 	FindConsultApi.userMessage({messageId:id}).then(function (data) {
// 	if(data.status=='ok'){
// 		$('#title').text(data.dataList.title);
// 		$('#content').text(data.dataList.content)
// 	}
// 	});
});//文档准备结束

//删除
function delMessage(receiveId) {
	FindConsultApi.changeStatus({receiveId:receiveId,type:'del'}).then(function (data) {
		$.alert('删除成功');
		// window.location.reload()
	});

	// return false;
}



function getsend(sendId){
	
	$('.content_box').show();
	
	
	$('.cererlde').click(function(){
		
		var nuumbere=$('.text_number').val();
	var data={'id':sendId,
	          'number':nuumbere
	}
		
	FindConsultApi.getPresent(data).then(function(data) {
		
		if (data.status == 'OK') {
			
		$('.content_box').hide();	
			
		}
		
	})
		
	})
	

}
