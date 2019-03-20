$(document).ready(function(){
	var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
	var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)


	var data = {  /*接口参数*/
		page: 1,//当前页
		rows: 18,//显示总页数

	};
	function render_helplist($listContent, helps, isClear) {
		var status = {
			'0':'未读',
			'1':'<font style="color: #000">已读</font>'
		}
		var html = '';
		if(helps.length > 0 && helps[0]) {
            for (var i = 0; i < helps.length; i++) {
                var item = helps[i];
                var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
                html+='<div class="content_in clearfix">'
                html+='<a href="../find_consult/find_consult_question_detail.html?quId='+item.quId+'&username='+item.username+'">'
                html+='<div class="l">'
                html+='<div class="circle"><img src="'+ Utils.compressByAli(imgUrl, 120, 120) +'"/></div>'
                html+='</div>'
                html+='<div class="r">'
                html+='<div class="up">'
                html+='<h3>'+item.realname+'</h3>'
                html+='<p class="askcont">'+item.expProfession+'</p>'
                html+='</div>'
                html+='<div class="down clearfix">'
                html+='<div class="left clearfix">'
                html+='<span class="span03">'+item.description+'</span>'
                html+='</div>'
                html+='<div class="right">'
                html+='<em><img src="../../public/img/pinglun.png" /></em><span>'+item.questionAttentionCount+'</span>'
                html+='</div>'
                html+='</div>'
                html+='</div>'
                html+='</a>'
                html+='</div>'
            }
        }

		if(isClear) {
			$listContent.html(html); // 替换当前内容
			return;
		}

		$listContent.append(html); // 向后添加当前内容
	}

	function loadHelpList(fun, params, $listContent, isClear) {
		// 获取推荐服务帮助列表
		fun(params).then(function (data) {
			var helps = data.rows;
			console.log('找咨询', data);

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

	loadHelpList(FindConsultApi.followedExpertList, data, $('#followedExpertList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.followedExpertList, data, $('#followedExpertList')); // 加载帮助列表并渲染页面
		}
	});

});//文档准备结束
