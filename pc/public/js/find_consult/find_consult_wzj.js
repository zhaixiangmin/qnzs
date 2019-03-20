$(document).ready(function(){
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
			}
			$('#category').append(html);
		}
	}
	getServiceCategory();
	//类型选择
	$('#category').on('click', ' .option,.listDiv .option', function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
	});
   /*人气专家*/
   //function work_list_team(){
   // 	   sendAjax();  //初始化列表
	//    function sendAjax(data) {
   //
	// 	   FindConsultApi.findAllExpertAccount({page: 0, rows: 16}).then(function (data) {
	// 		   createEle(data.rows);
	// 		   console.log('专家11', data);
	// 	   })
	//    }
       //createEle();
	function createEle(data){
		var num=3;
		var html='';
		for (var i = 0; i < data.length; i++) {
			var photoUrl = data[i].photoUrl ? data[i].photoUrl:'../../public/img/default_avator.png';
			html+='<li class="fl list_li clearfix" style="position: relative">';
			html+='<a href="find_consult_wzj_detail.html?username=' + data[i].username + '">';
			html+='<div class="list_box bgcWhite clearfix">';
			html+='<div class="list_box_l fl">';
			html+='<img src="'+photoUrl+'" alt=""/>';
			html+='</div>';
			html+='<div class="list_box_r fl">';
			html+='<h3 class="color000 font14">'+data[i].orgName+'</h3>';
			html+='<p class="color999 fnt12">'+data[i].expProfession+'</p>';
			html+='</div>';
			html+='</div>';
			html+='</a>';
			html+='<button class="colorfff fnt12 conBgc01 tiwenBtn" onclick="askExpertUI(\''+data[i].username+'\')">向TA提问</button>';
			// if(i == 0) {
			// 	// html+='<button class="colorfff fnt12 conBgc01 tiwenBtn" onclick="askExpertUI(15267985)">向TA提问</button>';
			// 	html+='<button class="colorfff fnt12 conBgc01 tiwenBtn" onclick="askExpertUI(\'0384b8d9-f452-420c-bd1c-ea6d7f8a3b4c\')">向TA提问</button>';
			// }else {
			// 	html+='<button class="colorfff fnt12 conBgc01 tiwenBtn" onclick="askExpertUI('+data[i].username+')">向TA提问</button>';
			// }
			html+='</li>';
		}
		//$('.list_ul').append(html);
		return html;
	}
   //}
    //work_list_team()

	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
			// pageFun:function(i){
			// 	var pageHtml = '<li class="pageNum">'+i+'</li>';
			// 	return pageHtml;
			// },
			apiProxy:FindConsultApi.findAllExpertAccount, /*接口函数*/
			data: data,
			listFun: createEle, /*数据列表函数 -- 返回html字符串*/
			arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}

	var data = {  /*接口参数*/
		page: 1,//当前页
		rows: 16,//显示总页数
		sitenavOrgId: undefined,//所属分站ID
		categoryId: undefined,//类别id
		keyword: undefined, // 关键字
		qType:undefined//选择

	};
// 分页器插件 -- 求助中
	pageCheck('.pageBoxList', '#quesList', data);

// 点击搜索
	$('#searchQuestion').click(function () {
		var search = $('#searchKeyWord').val();
		data.keyword = search;

		var html = '';

		html += '<ul class="clearfix list_ul" id="quesList">';
		html += '</ul>';

		$('.pageBoxList').html(html);
		pageCheck('.pageBoxList', '#quesList', data);
	});

	$('#searchKeyWord').keypress(function (event) {
		if (event.keyCode == "13") {//keyCode=13是回车键
			$('#searchQuestion').click();
		}
	});


// 	function pageCheck01(parentCell, contentCell, data) {
// 		$(parentCell).pageFun({
// 			contentCell: contentCell, /*包裹数据列表的父容器*/
// 			maxPage:6,/*显示页码框个数*/
// 			pageFun:function(i){
// 				var pageHtml = '<li class="pageNum">'+i+'</li>';
// 				return pageHtml;
// 			},
// 			apiProxy:FindConsultApi.findAllExpertAccount, /*接口函数*/
// 			data: data,
// 			listFun: createEle01, /*数据列表函数 -- 返回html字符串*/
// 			arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
// 		});
// 	}
//
//
// 	var data = {  /*接口参数*/
// 		page: 1,//当前页
// 		rows: 16,//显示总页数
// 		sitenavOrgId: undefined,//所属分站ID
// 		categoryId: undefined,//类别id
// 		keyword: undefined, // 关键字
// 		userType:undefined//选择
//
// 	};
// // 分页器插件 -- 求助中
// 	pageCheck01('.pageBoxList', '#quesList', data);


});//文档准备结束


/*
* 点击类型筛选
* */
function createEle(data){
	//var num=3;
	var html='';
	for (var i = 0; i < data.length; i++) {
		var photoUrl = data[i].photoUrl ? data[i].photoUrl:'../../public/img/default_avator.png';
		html+='<li class="fl list_li clearfix" style="position: relative">'
		html+='<a href="find_consult_wzj_detail.html?username=' + data[i].username + '">'
		html+='<div class="list_box bgcWhite clearfix">'
		html+='<div class="list_box_l fl">'
		html+='<img src="'+photoUrl+'" alt=""/>'
		html+='</div>'
		html+='<div class="list_box_r fl">'
		html+='<h3 class="color000 font14">'+data[i].orgName+'</h3>'
		html+='<p class="color999 fnt12">'+data[i].expProfession+'</p>'
		html+='</div>'
		html+='</div>'
		html+='</a>'
		html+='<button class="colorfff fnt12 conBgc01 tiwenBtn" onclick="askExpertUI(\''+data[i].username+'\')">向TA提问</button>'
		html+='</li>'
	};
	//$('.list_ul').append(html);
	return html;
}

function pageCheck(parentCell, contentCell, data) {
	$(parentCell).pageFun({
		contentCell: contentCell, /*包裹数据列表的父容器*/
		maxPage:6,/*显示页码框个数*/
		// pageFun:function(i){
		// 	var pageHtml = '<li class="pageNum">'+i+'</li>';
		// 	return pageHtml;
		// },
		apiProxy:FindConsultApi.findAllExpertAccount, /*接口函数*/
		data: data,
		listFun: createEle, /*数据列表函数 -- 返回html字符串*/
		arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
	});
}

var data = {  /*接口参数*/
	page: 1,//当前页
	rows: 16,//显示总页数
	sitenavOrgId: undefined,//所属分站ID
	categoryId: undefined,//类别id
	keyword: undefined, // 关键字
	qType:undefined//选择

};

//点击状态筛选
function getQuestionsByParams(keyWord){

	if('null' == keyWord || 'undefined' == keyWord){
		keyWord = null;
	}
	var categoryId = $("#category .cur").attr("lang");
	data.userType = categoryId;

	var html = '';
	html += '<ul class="clearfix list_ul" id="quesList">';
	html += '</ul>';
	$('.pageBoxList').html(html);
	pageCheck('.pageBoxList', '#quesList', data);
}
