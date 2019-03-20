var HearylistApi = {}
HearylistApi.getHearyList = function(data) {
	return Qnzs.ApiProxy('/project/activityList', data, '获取发布重大项目列表');
};

$(document).ready(function() {

	$('.zbxm_t .font16').click(function() {
		$(this).addClass('current').siblings('.list_b').removeClass('current')
	})

	function getDatalist(data) {
		
		
		
		console.log(data);
		var html = "";
		for (var i = 0; i < data.length; i++) {
			var curActivity = data[i];
			html += '<div class="bgcWhite fl zbxm_box">'
			if(curActivity.externalLinksPc == ''){
				
				if (curActivity.templateName == "model1") {  //模板1
					
					html += '<a href="heavy_project_model1_index.html?activityId=' + curActivity.id + '" target="_blank">'
				} 
				if(curActivity.templateName == "model2"){//模板2
					
					html += '<a href="../heavy_project_model2/zbxm_index_model_2.html?activityId=' + curActivity.id + '" target="_blank">'
				}
				if(curActivity.templateName == "model3"){ //模板3
					
//					html += '<a href="../heavy_project_model3/zbxm_index_model_3.html?activityId=' + curActivity.id + '" target="_blank">'
					html += '<a href="heavy_project_model1_index.html?activityId=' + curActivity.id + '" target="_blank">'
				}
				
				if(curActivity.templateName == "model4"){ //模板4
					html += '<a href="../heavy_project_model4/zbxm_index_model_4.html?activityId=' + curActivity.id + '" target="_blank">'
					
				}
				
				
			}else{
				html += '<a href="' + curActivity.externalLinksPc + '" target="_blank">'
			}
			html += ' <div class="xm_pic">'
			html += ' <img src="' + Utils.compressByAli(curActivity.bannerUrl, '?x-oss-process=image/resize,m_mfit,h_235,w_547') + '" height="235" width="547" alt="" />'
			html += '</div>'
			html += ' <div class="xm_mes clearfix">'
			html += '<span class="xm_style fl font16">' + curActivity.type + '</span>'
			html += '<h4 class="font16 color000 fl">' + curActivity.title + '</h4>'

			//项目进行阶段（1未开始、2报名中、3投票中、4活动结束、5报名投票同时进行中，2/3/4为活动进行中）
			//未开始  startTime - now
			//报名中  endTime - startTime
			//投票中  voteEndTime - voteStartTime
			if (curActivity.stage == 1) {
				var bigTime = new Date(curActivity.startTime).getTime();
				var smaTime = new Date().getTime();
				var diffDate = diffDateTime(bigTime, smaTime);
				html += '    <span class="xm_state fr" style="color: #33cc33;">未开始&nbsp;' + diffDate + '后</span>';
			} else if (curActivity.stage == 2 || curActivity.stage == 5) { // 报名中
				var bigTime = new Date(curActivity.endTime).getTime();
			var smaTime = new Date().getTime();
			var diffDate = diffDateTime(bigTime, smaTime);
			
			
				html += '    <span class="xm_state fr" style="color: #33cc33;">报名中&nbsp;剩' + diffDate + '</span>';
			} else if (curActivity.stage == 3) {
				var bigTime = new Date(curActivity.voteEndTime).getTime();
				var smaTime = new Date(curActivity.voteStartTime).getTime();
				var diffDate = diffDateTime(bigTime, smaTime);
				html += '    <span class="xm_state fr" style="color: #33cc33;">投票中&nbsp;剩' + diffDate + '</span>';
			} else {
				html += '    <span class="xm_state fr" style="color: #ccc;">已结束</span>';
			}

			html += '</div> '
			html += ' </a>'
			html += '</div>'
		}

		return html;

	}



	/*点击属性数据筛选*/

	function pageCheck(parentCell, contentCell, data, arg) {
		$(parentCell).pageFun({
			contentCell: contentCell,
			/*包裹数据列表的父容器*/
			maxPage: 6,
			/*显示页码框个数*/
			// pageFun:function(i){
			// 	var pageHtml = '<li class="pageNum">'+i+'</li>';
			// 	return pageHtml;
			// },
			apiProxy: HearylistApi.getHearyList,
			/*接口函数*/
			data: data,
			listFun: getDatalist,
			/*数据列表函数 -- 返回html字符串*/
			arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}


	var data = {
		pageNo: 1, //当前页
		pageSize: 6 //显示总页数

	}


	pageCheck('#activityList', '#activityListHtmlStatic', data);



	/**
	 * 头部banners
	 */
	function getBanners(){
		var sitenavOrgId = 440000; // 默认广东省
		if($.cookie && $.cookie('district_qnzs')) {
			var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
			district_qnzs = JSON.parse(district_qnzs);
			sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
		}
		console.log('sitenavOrgId', sitenavOrgId);

		var params = {
			did: sitenavOrgId, //  地区ID
			type: 0, // 类型：0-pc端；1-移动端
			acticey: 3 // 分类：0-首页banner；1-找活动；2-找帮助；3-重磅项目；4-青年之家;5-首页推荐项目
		};
		Qnzs.findImageByType(params).then(function (data) {
			var banners = data.dataList;
			var autoPlay = banners.length > 1 ? true: false; // 只有一张banner，不自动轮播
			var html ='';
			for(var i = 0; i < banners.length; i++){
				banner = banners[i];
				html += '<li>';
				html += '	<a href="' + banner.url + '" target="_blank" >';
				html += '		<img src="' + Utils.compressByAli(banner.path, '?x-oss-process=image/resize,h_380') + '" />';
				html += '	</a>';
				html += '</li>';
			}
			$('#head-banner ul').append(html);
			jQuery(".banBox").slide({
				titCell:".hd ul",
				mainCell:".bd ul",
				effect:"leftLoop",
				autoPlay:autoPlay,
				autoPage:true,
				interTime:3000,
				delayTime:300,
				prevCell:".change.prev",
				nextCell:".change.next",
				trigger:"mouseover"
			});
		});
	}
	getBanners(); // 头部banners
	
	
// 	//bern图
//
//    function getIndeber(){
//
// 	 $.ajax({
//     	type:"get",
//     	url:Qnzs.path+"/imageManager/findImageByType",
//     	data:{'did':sitenavDid,'type':0,'acticey':3},
//     	 dataType :"JSON",
//     	success:function(data){
//
//     		var data=data.dataList;
//
//     		 var htmlbr='';
//
//     		for(var i = 0; i < data.length; i++){
//     			  temp=data[i];
//     			htmlbr+='<li>';
//     			htmlbr+='<a href="'+temp.url+'" target="_blank">';
//     			htmlbr+='<img src="'+temp.path+'" />';
//
//     			htmlbr+='</a>';
//     			htmlbr+='</li>';
//
//     		}
//     		$('#head-banner ul').append(htmlbr);
//
//
//     		 jQuery(".banBox").slide({
//         titCell:".hd ul",
//         mainCell:".bd ul",
//         effect:"leftLoop",
//         autoPlay:true,
//         autoPage:true,
//         interTime:3000,
//         delayTime:300,
//         prevCell:".change.prev",
//         nextCell:".change.next",
//         trigger:"mouseover"
//     });
//
//     	}
//
//
//     	 })
//
// }
// getIndeber()
    
    
	
	
	
	
	
	
	
	

})


function getDatalist(data) {
console.log(data);

	var html = "";
	for (var i = 0; i < data.length; i++) {
		var curActivity = data[i];
		
		html += '<div class="bgcWhite fl zbxm_box">'
		if(curActivity.externalLinksPc == ''){
			if (curActivity.templateName == "model1") {  //模板1
				console.log("模板1")
				html += '<a href="heavy_project_model1_index.html?activityId=' + curActivity.id + '" target="_blank">'
			} 
			if(curActivity.templateName == "model2"){//模板2
				console.log("模板2")
				html += '<a href="../heavy_project_model2/zbxm_index_model_2.html?activityId=' + curActivity.id + '" target="_blank">'
			}
			if(curActivity.templateName == "model3"){ //模板3
				console.log("模板3")
				html += '<a href="../heavy_project_model3/zbxm_index_model_3.html?activityId=' + curActivity.id + '" target="_blank">'
				
			}
			if(curActivity.templateName == "model4"){ //模板4
				console.log("模板4")
				html += '<a href="../heavy_project_model4/zbxm_index_model_4.html?activityId=' + curActivity.id + '" target="_blank">'
				
			}
			
			
		}else{
			html += '<a href="' + curActivity.externalLinksPc + '" target="_blank">'
		}
		
//		html += '<a href="heavy_project_model1_index.html?activityId=' + curActivity.id + '" target="_blank">'
		html += ' <div class="xm_pic">'
		html += ' <img src="' + curActivity.bannerUrl + '" height="235" width="547" alt="" />'
		html += '</div>'
		html += ' <div class="xm_mes clearfix">'
		html += '<span class="xm_style fl font16">' + curActivity.type + '</span>'
		html += '<h4 class="font16 color000 fl">' + curActivity.title + '</h4>'
			//项目进行阶段（1未开始、2报名中、3投票中、4活动结束、5报名投票同时进行中，2/3/4为活动进行中）
		if (curActivity.stage == 1) {
			var bigTime = new Date(curActivity.startTime).getTime();
			var smaTime = new Date().getTime();
			var diffDate = diffDateTime(bigTime, smaTime);
			html += '    <span class="xm_state fr" style="color: #33cc33;">未开始&nbsp;' + diffDate + '后</span>';
		} else if (curActivity.stage == 2 || curActivity.stage == 5) { // 报名中
			var bigTime = new Date(curActivity.endTime).getTime();
			var smaTime = new Date().getTime();
			var diffDate = diffDateTime(bigTime, smaTime);
			html += '    <span class="xm_state fr" style="color: #33cc33;">报名中&nbsp;剩' + diffDate + '</span>';
		} else if (curActivity.stage == 3) {
			var bigTime = new Date(curActivity.voteEndTime).getTime();
			var smaTime = new Date().getTime();
			var diffDate = diffDateTime(bigTime, smaTime);
			html += '    <span class="xm_state fr" style="color: #33cc33;">投票中&nbsp;剩' + diffDate + '</span>';
		} else {
			html += '    <span class="xm_state fr" style="color: #ccc;">已结束</span>';
		}

		html += '</div> '
		html += ' </a>'
		html += '</div>'
	}

	return html;


}



function pageCheck(parentCell, contentCell, data, arg) {
	$(parentCell).pageFun({
		contentCell: contentCell,
		/*包裹数据列表的父容器*/
		maxPage: 6,
		/*显示页码框个数*/
		// pageFun:function(i){
		// 	var pageHtml = '<li class="pageNum">'+i+'</li>';
		// 	return pageHtml;
		// },
		apiProxy: HearylistApi.getHearyList,
		/*接口函数*/
		data: data,
		listFun: getDatalist,
		/*数据列表函数 -- 返回html字符串*/
		arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
	});
}


var data = {
	pageNo: 1, //当前页
	pageSize: 6, //显示总页数
	activityType: undefined
}

function getQuestionsByParams(e) {

	var activityType = $(e).attr('value');
	
	data.activityType = activityType;

	var html = '';

	html += '<ul id="activityListHtmlStatic"> </ul>';

	$('#activityList').html(html);

	pageCheck('#activityList', '#activityListHtmlStatic', data);

}

function diffDateTime(bigTime, smaTime) {
	var day = 0; // 相隔天数
	var hour = 0; // 相隔小时数
	if (bigTime > smaTime) {
		var diffMs = bigTime - smaTime; // 相隔毫秒数
		day = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 相隔天数
		hour = diffMs % (1000 * 60 * 60 * 24); // 相隔小时数
		hour = Math.floor(hour / (1000 * 60 * 60));
	}
	
	return day + '天' + hour + '小时';
}

