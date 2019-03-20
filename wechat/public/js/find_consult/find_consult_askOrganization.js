$(document).ready(function() {
	
	var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
	var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

	var params = {
		fullName: "", // 找帮助名称(可不传，默认为null;搜索时用到)
		// helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
		// auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
		page: 1, // 当前页码
		rows: 6, // 每页记录数
		sort: 'answer_question_count', // 按时间问题数排序
		order: 'desc', // 排序方式(可不传，desc 降序 asc升序)
		// userType:"",
		// fullName:""
	};
	//渲染列表
	function render_helplist($listContent, helps, isClear) {
		var html = '';
		for (var i = 0; i < helps.length; i++) {
			var item = helps[i];
			var imgUrl = item.photoUrl ? item.photoUrl : '../../public/img/default_avator.png';
			html += '<div class="item clearfix">'
			html += '<a href="find_consult_organization_detail.html?oid=' + item.oid + '">'
			html += '<div class="item_l fl"><img src="' + Utils.compressByAli(imgUrl, 175, 175) + '" class="img01" /></div>'
			html += '<div class="item_r">'
			html += '<h2 class="color000">' + item.name + '</h2>'
			// html += '<p class="p01 color999">' + item.fullName + '</p>'
			html += '<p class="p01 color999"></p>'
			html += '<p class="fl p02">问答问题' + item.answerQuestionCount + '次</p>'
			html += '</div>'
			html += '</a>'
			html += '<a href="askToOrganization.html?oid=' + item.oid + '" class="wd_ask_box_alone fr askBtn">向TA提问</a>'
			html += '</div>'
		}

		if(isClear) {
			$listContent.html(html); // 替换当前内容
			return;
		}

		$listContent.append(html); // 向后添加当前内容
	}
	//加载列表平渲染页面
	function loadHelpList(fun, params, $listContent, isClear) {
		// 获取推荐服务帮助列表
		fun(params).then(function (data) {
			var helps = data.rows;
			// console.log('找咨询', data);

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
	loadHelpList(FindConsultApi.searchOrganization, params, $('#professorList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.searchOrganization, params, $('#professorList')); // 加载帮助列表并渲染页面
		}
	});
//点击搜索
// function searchExpert() {
	$('#searchExpert').click(function () {
		params.page = 1; // 重置页码
		var fullName = $("#searchKeyWord").val();
		console.log('找组织搜索', fullName);
		params.fullName = fullName;
		loadHelpList(FindConsultApi.searchOrganization, params, $('#professorList'), true); // 加载帮助列表并渲染页面
	})


})