
var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

var params = {
	keyword: undefined, // 找帮助名称(可不传，默认为null;搜索时用到)
	// helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
	// auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
	page: 1, // 当前页码
	rows: 6, // 每页记录数
	sort: undefined, // 排序字段(可不传)
	order: undefined, // 排序方式(可不传，desc 降序 asc升序)
	userType:undefined
};

//渲染列表
function render_helplist($listContent, helps, isClear) {
	var html = '';
	for (var i = 0; i < helps.length; i++) {
		var item = helps[i];
		var imgUrl = item.photoUrl ? item.photoUrl : '../../public/img/default_avator.png';
		html += '<div class="item clearfix borderBot">'
		html += '<a href="find_consult_expert_detail.html?username=' + item.username + '">'
		html += '<div class="left fl">'
		html += '<img src="' + Utils.compressByAli(imgUrl, 125, 125) + '"/>'
		html += '</div>'
		html += '<div class="right">'
		html += '<h2 class="color000 fz30">' + item.orgName + '</h2>'
		html += '<p class="fz26 p01">' + item.expProfession + '</p>'
		html += '<p class="color999 fz24">擅长领域：' + item.speciality + '</p>'
		html += '</div>'
		html += '</a>'
		html += '<a href="askToExpert.html?username=' + item.username + '" class="wd_ask_box_alone fr askBtn">向TA提问</a>'
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
$(document).ready(function() {
//	服务类别列表

	$('#popupcategory').click(function () {
		$('#category').show();
	})
	$('#category').on('click', '.option', function(event) {//类别列表选择
		$(this).addClass('cur').siblings().removeClass('cur');
	});
	function getServiceCategory(){//类型列表
		sendAjax();
		function sendAjax(data){

			FindConsultApi.getServiceCategory(data).then(function (data) {
				createEle(data);
				//console.log('专家11',data);
			})
		}
		//createEle();
		function createEle(data){
			var num=3;
			var html='';
			for (var i = 0; i < data.rows.length; i++) {
				html+='<a href="javascript:getQuestionsByParams();" class="option" lang="'+data.rows[i].caId+'">'+data.rows[i].name+'</a>'
			};
			$('#category').append(html);
		}
	}
	getServiceCategory()
	//	服务类别列表END


loadHelpList(FindConsultApi.findAllExpertAccount, params, $('.professorList')); // 加载专家列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
$(window).scroll(function(){
	var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
	var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
	var windowHeight = $(this).height(); // 可见高度
	// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
	if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
		loadedFlag = false; // 设置正在加载，避免重复
		loadHelpList(FindConsultApi.findAllExpertAccount, params, $('.professorList')); // 加载帮助列表并渲染页面
	}
});

//点击搜索
// function searchExpert() {
	$('#searchExpert').click(function () {
		params.page = 1; // 重置页码
		var keyword = $("#searchKeyWord").val();
		// console.log('categoryId', categoryId);
		params.keyword = keyword;
		loadHelpList(FindConsultApi.findAllExpertAccount, params, $('.professorList'), true); // 加载帮助列表并渲染页面
	})

})//文档准备结束

// 点击筛选
function getQuestionsByParams(){
	params.page = 1; // 重置页码
	// params.keyWord = $('#keyWord').val();
	$('#category').hide();
	var categoryId = $("#category .cur").attr("lang");
	console.log('categoryId', categoryId);
	params.userType = categoryId;
	loadHelpList(FindConsultApi.findAllExpertAccount, params, $('.professorList'), true); // 加载帮助列表并渲染页面
};


// }

