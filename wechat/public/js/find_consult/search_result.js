
$(function () {
	var keyword = Utils.getQueryString('keyword'); // 搜索关键字
// function setSearchText(keyword){
// 	$("#searchText").val(keyword);
// }
//
// function clearSearch(){
// 	$("#searchText").val("");
// }

// $(function(){
// 	getRecentlySearch(page);
// 	$("#searchId").attr("href",Qnzs.path+"/view/find_consult/SearchResult.html?keyWord="+$("#keyWord").val());
// });
//
// function searchWordChange(obj){
// 	$("#searchId").attr("href",Qnzs.path+"/view/find_consult/SearchResult.html?keyWord="+obj);
// }

// function searchActs(){
// 	var keyword = $("#searchText").val();
// 	window.location = Qnzs.path + "/view/find_consult/SearchResult.html?keyWord="+encodeURI(keyword);
// }

/**
 * 获取提问分页列表
 */
// function getRecentlySearch(pageNo){
// 		pageNo = (pageNo-1)*pageSize;
// 		$.ajax({
// 			type: "POST",
// 			url: ctx + "/findInterlocution/getRecentlySearch",
// 			dataType: "json",
// 			async: false,
// 			data: "pageNo=" + pageNo + "&pageSize=" + pageSize, //+ "&categoryId=" + categoryId ,//+ "&keyWord=" + keyWord+ "&sitenavOrgId=" + sitenavOrgId,
// 			success: function(data){
// 				//有数据才翻页
// 				var html = '';
// 				var html2 = '';
// 				if(data.length > 0){
// 					$.each(data,function(index, sc){
// 						if (sc.recentlySearch != null) {
// 							$.each(sc.recentlySearch,function(index, rs){
//								
// 								var recentlySearchKeyword = rs == null ? "" : rs.keyWord == null ? "" :rs.keyWord;
//								
// 								html += '<div> <a href="'+ctx+'/findInterlocution/getInterlocutionSearchResult?keyWord='+recentlySearchKeyword+'"class="fz26">';
// 								if(recentlySearchKeyword.length > 10){
// 									html += recentlySearchKeyword.substr(0,10) +'...';
// 								}else{
// 									html += recentlySearchKeyword;
// 								}
// 								html += '</a></div>';
// 							});
// 						}
// 						if (sc.hotSearch != null) {
// 							$.each(sc.hotSearch,function(index, hs){
//								
// 								var hotSearchKeyword = hs == null ? "" : hs.keyWord == null ? "" :hs.keyWord;
//								
// 								html2 += '<div> <a href="'+ctx+'/findInterlocution/getInterlocutionSearchResult?keyWord='+hotSearchKeyword+'"class="fz26">';
// 								if(hotSearchKeyword.length > 10){
// 									html2 += hotSearchKeyword.substr(0,10) +'...';
// 								}else{
// 									html2 += hotSearchKeyword;
// 								}
// 								html2 += '</a></div>';
// 							});
// 						}
//						
//						
// 					});
// 					$('#lastest').append(html);
// 					$('#hotSc').append(html2);
// 				}else{
// 					$('#lastest').html("");
// 					$('#hotSc').html("");
// 				}
//				
// 			}
// 		}); 
// }

// 点击搜索
// $('#searchQuestion').click(function () {
// 	var search = $('#searchKeyWord').val();
// 	console.log('search', search);
// 	data.keyword = search;
//
// 	var html = '';
// 	html += '<div class="list list01 bgcWhite" id="quesList">';
// 	html += '</div>';
// 	html += '<div class="notContent hide">';
// 	html += '    <div class="error_wrap">囧~没有搜到相关信息哦</div>';
// 	html += '</div>';
// 	html += '<div class="page">';
// 	html += '    <ul class="pageMenu clearfix">';
// 	html += '        <li class="firstPage">首页</li>';
// 	html += '        <li class="prevPage"> < 上一页 </li>';
// 	html += '        <div class="pageObj ">';
// 	html += '        </div>';
// 	html += '        <li class="nextPage"> 下一页 > </li>';
// 	html += '        <li class="lastPage">尾页</li>';
// 	html += '        <li class="last" style="font-size: 14px;">';
// 	html += '            共<span class="totalPage"></span>页，跳转至 <input type="number" class="keuInput" value="1">';
// 	html += '            <button type="button" class="btnSure">确定</button>';
// 	html += '        </li>';
// 	html += '    </ul>';
// 	html += '</div>';
//
// 	$('.pageBoxList').html(html);
//	
// });
//	李聪代码开始
var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

var params = {
	keyword: keyword, // 找帮助名称(可不传，默认为null;搜索时用到)
	// helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
	// auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
	page: 1, // 当前页码
	rows: 6, // 每页记录数
	// sort: undefined, // 排序字段(可不传)
	// order: undefined // 排序方式(可不传，desc 降序 asc升序)
};


/**
 * 渲染帮助列表
 * @param $listContent {jq} 列表包裹父容器(jq对象)
 * @param comments {array} 帮助列表
 * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
 */
function render_helplist($listContent, helps, isClear) {
	var html = '';
	for (var i = 0; i < helps.length; i++) {
		var item = helps[i];
		// var createTime = new Date(help.createTime).format('yyyy/MM/dd hh:mm');
		var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
		//var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
		html += '<div class="content_in clearfix">';
		html += '<a href="find_consult_question_detail.html?quId='+item.quId+'&username='+item.username+'">';
		html += '	<div class="l">';
		html += '		<div class="circle">';
		html += '			<a href="find_consult_question_detail.html?quId='+item.quId+'" class="u_head">';
		html += '				<img src="'+imgUrl+'"/>';
		html += '			</a>';
		html += '		</div>';
		html += '	</div>';
		html += '	<div class="r">';
		html += '		<div class="up">';
		html += '			<h3>';
		html += '				<a href="find_consult_question_detail.html?quId='+item.quId+'" class="u_head">' + item.title + '</a>';
		html += '			</h3>';
		html += '			<p>';
		html += '				<a href="find_consult_question_detail.html?quId='+item.quId+'" class="u_head">' + item.askContent + '</a>';
		html += '			</p>';
		html += '		</div>';
		html += '		<div class="down clearfix">';
		html += '			<div class="left clearfix">';
		html += '				<span class="span01">' + item.categoryName + '</span>';
		html += ' 				<span class="span02">'+item.askTime+'</span>';
		html += ' 			</div>';
		html += '			<div class="right">';
		html += '			<span>'+item.commentsNum +'</span>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '	</a>';
		html += '</div>';
		// html += '<a href="find_help_detail.html?id=' + help.hpId + '" class="item clearfix disB">';
		// html += '    <div class="left fl">';
		// html += '        <img src="' + imgUrl + '"/>';
		// html += '    </div>';
		// html += '    <div class="right">';
		// html += '        <h3 class="color000 fz30">' + help.title + '</h3>';
		// html += '        <p class="fz26 color666">' + help.helpType + '</p>';
		// html += '        <div class="botTxt clearfix">';
		// html += '            <span class="color999 fz24 fl">' + createTime + '</span>';
		// html += '            <em class="fz24 fr">' + auditTypeName[help.auditStatus] + '</em>';
		// html += '        </div>';
		// html += '    </div>';
		// html += '</a>';
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

loadHelpList(FindConsultApi.getServiceList, params, $('#interlocutionList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
$(window).scroll(function(){
	var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
	var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
	var windowHeight = $(this).height(); // 可见高度
	// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
	if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
		loadedFlag = false; // 设置正在加载，避免重复
		loadHelpList(FindConsultApi.getServiceList, params, $('#interlocutionList')); // 加载帮助列表并渲染页面
	}
});


// 点击 '搜索' 按钮
$('#submit_search').click(function () {
	params.keyWord = $('#keyWord').val();
	if(!params.keyWord) {
		$.alert('请输入关键字');
		return;
	}
	loadHelpList(FindConsultApi.getServiceList, params, $('#interlocutionList'), true); // 加载帮助列表并渲染页面
});
//	李聪代码开始END

//	我的代码开始
// function work_list_team() {
// 	sendAjax();  //初始化列表
// 	function sendAjax(data) {
// 		var keyword = $("#keyWord").val();
// 		FindConsultApi.getServiceList({'page': 0, 'rows': 10,keyword:keyword}).then(function (data) {
// 			createEle(data.rows);
// 			// console.log('专家11',data);
// 		})
// 	}
// 	//createEle();
// 	function createEle(data) {
// 		//var num = 3;
// 		var html = '';
// 		for (var i = 0; i < data.length; i++) {
// 			var item = data[i];
// 			var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
// 			html += '<div class="content_in clearfix">';
// 			html += '<a href="find_consult_question_detail.html?quid='+item.quId+'">';
// 			html += '	<div class="l">';
// 			html += '		<div class="circle">';
// 			html += '			<a href="find_consult_question_detail.html?quid='+item.quId+'" class="u_head">';
// 			html += '				<img src="'+item.photoUrl+'"/>';
// 			html += '			</a>';
// 			html += '		</div>';
// 			html += '	</div>';
// 			html += '	<div class="r">';
// 			html += '		<div class="up">';
// 			html += '			<h3>';
// 			html += '				<a href="#" class="u_head">' + data[i].title + '</a>';
// 			html += '			</h3>';
// 			html += '			<p>';
// 			html += '				<a href="#" class="u_head">' + data[i].askContent + '</a>';
// 			html += '			</p>';
// 			html += '		</div>';
// 			html += '		<div class="down clearfix">';
// 			html += '			<div class="left clearfix">';
// 			html += '				<span class="span01">' + data[i].categoryName + '</span>';
// 			html += ' 				<span class="span02">'+date+'</span>';
// 			html += ' 			</div>';
// 			html += '			<div class="right">';
// 			html += '			<span>'+item.commentsNum +'</span>';
// 			html += '			</div>';
// 			html += '		</div>';
// 			html += '	</div>';
// 			html += '	</a>';
// 			html += '</div>';
// 		};
// 		if(page == 1){
// 			$('#interlocutionList').html("");
// 		}
// 		$('#interlocutionList').append(html);
// 		// $('#interlocutionList').append(html);
// 		if(data.length < rows){
// 			$('#moreSee').css("display", "none");
// 			var html = '';
// 			if(page > 1){//加载更多
// 				html += '<li class="clearfix">';
// 				html += '<p style="text-align:center; color:gray;">全部加载完啦</p>';
// 				html += '</li>';
// 			}else{
// 				if(data.length == 0) {
// 					html += '<div class="morebtn color333">';
// 					html += '	<a href="javascript:void(null)" class="blue fnt1">';
// 					html += '		<div class="morebtn color333">没有符合搜索条件的话题哦!</div>';
// 					html += '	</a>';
// 					html += '</div>';
// 				}
//
// 			}
// 			$('#interlocutionList').append(html);
// 		}
// 	}
// }
//
// work_list_team()

})