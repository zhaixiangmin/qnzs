$(document).ready(function() {
	//热门专家
	function work_list_team() {
		sendAjax();  //初始化列表
		function sendAjax(data) {
			FindConsultApi.findAllExpertAccount({'page': 0, 'rows': 3}).then(function (data) {
				createEle(data.rows);
				// console.log('专家11',data);
			})
		}
		//createEle();
		function createEle(data) {
			var num = 3;
			var html = '';
			for (var i = 0; i < data.length; i++) {
				html += '<li class="fl">';
				html += ' <a href="find_consult_expert_detail.html?username=' + data[i].username + '">';
				html += '  <div class="imgDiv">';
				html += '   <img src="' + Utils.compressByAli(data[i].photoUrl, 130, 130) + '"/>';
				html += '  </div>';
				html += '  <h2 class="color000">' + data[i].orgName + '</h2>';
				html += '  <h6 class="color999">' + data[i].expProfession + '</h6>';
				html += '  <p class="color999">' + data[i].speciality + '</p>';
				html += ' </a>';
				html += '</li>';
			}
			$('.professor_list').append(html);
		}
	}

	work_list_team();
	/*热门专家END*/
	/*活跃组织*/
	function work_list_team02() {
		sendAjax();  //初始化列表
		function sendAjax(data) {

			FindConsultApi.searchOrganization({page: 0, rows: 3, order: 'desc', sort: 'answer_question_count'}).then(function (data) {
				createEle(data.rows);
				//console.log('组织11', data);
			})
		}
		function createEle(data) {
			var html = '';
			var num = 3;
			for (var i = 0; i < data.length; i++) {
				html += '<a href="find_consult_organization_detail.html?oid=' + data[i].oid + '">';
				html += '<div class="item clearfix">';
				html += '<div class="item_l fl"><img src="' + Utils.compressByAli(data[i].photoUrl, 175, 175) + '" class="img01" /></div>';
				html += '<div class="item_r">';
				html += '<h2 class="color000">' + data[i].name + '</h2>';
				html += '<p class="p01 color999"></p>';
				html += '<p class="fl p02">问答问题' + data[i].answerQuestionCount + '次</p>';
				html += '</div>';
				html += '</div>';
				html += '</a>';
			}
			$('.activityOrg_ul').append(html);
		}
	}

	work_list_team02()
	/*活跃组织END*/
	//导航切换

	$('.wenda .title_item').click(function(event) {
	    $(this).addClass('cur').siblings().removeClass('cur');
	    $('.wenda .content').eq($(this).index()).show().siblings('.content').hide();
	});
	//获取地区ID
	var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	var sitenavOrgId = undefined;
	if(district_qnzs) {
		district_qnzs = JSON.parse(district_qnzs);
		if(district_qnzs && district_qnzs.sitenavOrgId) {
			sitenavOrgId = district_qnzs.sitenavOrgId;
		}else {
			sitenavOrgId = 440000; // 默认广东省
		}
	}else {
		sitenavOrgId = 440000; // 默认广东省
	}
	console.log('sitenavOrgId',sitenavOrgId);
	/*热门问答*/
	function hot_ask() {
		sendAjax();  //初始化列表

		function sendAjax(data) {
			FindConsultApi.getServiceList({page:0,rows:6,qType:1,sitenavOrgId:sitenavOrgId}).then(function (data) {
				createEle(data.rows);
				console.log('组织11', data);
			})
		}

		function createEle(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				//var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
				html+='<a href="find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'">'
				html+='<div class="content_in clearfix" id="content_in">'
				html+=' <div class="l">'
				html+='  <div class="circle"><img src="'+ Utils.compressByAli(data[i].photourl, 120, 120) +'" class="pic"/></div>'
				html+=' </div>'
				html+=' <div class="r">'
				html+='  <div class="up">'
				html+='   <h3>' + data[i].title + '</h3>'
				html+='   <div class="askcont">' + data[i].askContent + '</div>'
				html+='  </div>'
				html+='  <div class="down clearfix">'
				html+='   <div class="left clearfix fl">'
				html+='    <span class="span01 fl" style="display:block;   width:2.0rem;  text-overflow: ellipsis;   overflow: hidden;  white-space: nowrap;">' + data[i].realname + '</span>'
				html+='    <span class="span01 fl">' + data[i].categoryName + '</span>'
				html+='    <span class="span02 fl">' + data[i].askTime + '</span>'
				// html+='    <span class="fl">18:56</span>'
				html+='   </div>'
				html+='   <div class="right fz24 color666 fr" style="padding-left:0px;padding-right:0.6rem;"><em style=" padding: 0 0.1rem 0 0;"><img src="../../public/img/pinglun.png" /></em>' + data[i].commentsNum + '</div>'
				html+='  </div>'
				html+=' </div>'
				html+='</div>'
				html+='</a>'
			}
			$('.hot_ask').append(html)
		}
	}

	hot_ask()
	/*热门问答END*/
	/*精华问答*/
	function best_ask() {
		sendAjax();  //初始化列表

		function sendAjax(data) {
			FindConsultApi.getServiceList({page:0,rows:6,qType:2,sitenavOrgId:sitenavOrgId}).then(function (data) {
				createEle(data.rows);
				console.log('组织11', data);
			})
		}

		function createEle(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				html+='<a href="find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'">'
				html+='<div class="content_in clearfix">'
				html+=' <div class="l">'
				html+='  <div class="circle"><img src="'+ Utils.compressByAli(data[i].photourl, 120, 120) +'" class="pic"/></div>'
				html+=' </div>'
				html+=' <div class="r">'
				html+='  <div class="up">'
				html+='   <h3>' + data[i].title + '</h3>'
				html+='   <div class="askcont">' + data[i].askContent + '</div>'
				html+='  </div>'
				html+='  <div class="down clearfix">'
				html+='   <div class="left clearfix fl">'
				html+='    <span class="span01 fl" style="display:block;   width:2.0rem;  text-overflow: ellipsis;   overflow: hidden;  white-space: nowrap;">' + data[i].realname + '</span>'
				html+='    <span class="span01 fl">' + data[i].categoryName + '</span>'
				html+='    <span class="span02 fl">' + data[i].askTime + '</span>'
				// html+='    <span class="fl">18:56</span>'
				html+='   </div>'
				html+='   <div class="right fz24 color666 fr"  style="padding-left:0px;padding-right:0.6rem;"><em style=" padding: 0 0.1rem 0 0;"><img src="../../public/img/pinglun.png" /></em>' + data[i].commentsNum + '</div>'
				html+='  </div>'
				html+=' </div>'
				html+='</div>'
				html+='</a>'
			}
			$('.best_ask').append(html)
		}
	}

	best_ask()
	/*精华问答END*/
	/*本地问答*/
	function local_ask() {
		sendAjax();  //初始化列表

		function sendAjax(data) {
			FindConsultApi.getServiceList({page:0,rows:6,qType:3}).then(function (data) {
				createEle(data.rows);
				console.log('组织11', data);
			})
		}

		function createEle(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				//var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
				html+='<a href="find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'">'
				html+='<div class="content_in clearfix">'
				html+=' <div class="l">'
				html+='  <div class="circle"><img src="'+ Utils.compressByAli(data[i].photourl, 120, 120) +'" class="pic"/></div>'
				html+=' </div>'
				html+=' <div class="r">'
				html+='  <div class="up">'
				html+='   <h3>' + data[i].title + '</h3>'
				html+='   <div class="askcont">' + data[i].askContent + '</div>'
				html+='  </div>'
				html+='  <div class="down clearfix">'
				html+='   <div class="left clearfix fl">'
				html+='    <span class="span01 fl" style="display:block;   width:2.0rem;  text-overflow: ellipsis;   overflow: hidden;  white-space: nowrap;">' + data[i].realname + '</span>'
				html+='    <span class="span01 fl">' + data[i].categoryName + '</span>'
				html+='    <span class="span02 fl">' + data[i].askTime + '</span>'
				// html+='    <span class="fl">18:56</span>'
				html+='   </div>'
				html+='   <div class="right fz24 color666 fr"  style="padding-left:0px;padding-right:0.6rem;"><em style=" padding: 0 0.1rem 0 0;"><img src="../../public/img/pinglun.png" /></em>' + data[i].commentsNum + '</div>'
				html+='  </div>'
				html+=' </div>'
				html+='</div>'
				html+='</a>'
			}
			$('.local_ask').append(html)
		}
	}

	local_ask()
	
	/*名人问吧*/
	function mrwbList() {
        sendAjax();
        function sendAjax(data) {
            FindConsultApi.indexMrwbQuesList({page:0,rows:5}).then(function (data) {
                createEle(data.rows);
            })
        }

        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<div class="content_item my">'
                html += ' <a href="find_consult_famousDetail.html?quId=' + data[i].quId +'" class="disB">'
                html += '  <div class="qs_box_in clearfix">'
                html += '  <div class="qs_touxiang_box fl">'
                html += '   <span class="qs_touxiang">'
                html += '    <img src="' + Utils.compressByAli(data[i].photourl, 120, 120) + '" alt="" class="tx_geren" />'
                html += '   </span>'
                if( data[i].accType == 3){
				    html +='<img class="v_icon" src="../../public/img/check_tercher.png"/>';
				}
                html += '  </div>'
                html += '   <div class="qs_detail">'
                html += '    <div class="qs_word">'
                html += '     <div class="qs_word_in">'
                html += '      <h3>' + data[i].title + '</h3>'
                html += '     </div>'
                html += '    </div>'
                html += '    <p class="qs_b clearfix">'
                html += '     <span class="fl">' + data[i].categoryName + '&nbsp;</span>'
            	html += '     <span class="topicPeople fl qs_fenlei">'+data[i].realname+'</span>'
            	html += '     <span class="qs_b_right fr color999">'
                html += '      <span class="join">'+data[i].commentsNum+'人参与</span>'
                html += '      <span class="fr">'
                html += '       <i class="qs_pinglun fl">'
                html += '        <img src="../../public/img/collectGood.png"alt="" />'
                html += '       </i>'
                html += '       <i class="fl">' + data[i].likesNum + '</i>'
                html += '      </span>'
                html += '     </span>'
                html += '    </p>'
                html += '   </div>'
                html += '  </div>'
                html += ' </a>'
                html += '</div>'
            }
            $('.recommend_mrwbList').append(html)
        }
    }
	mrwbList();
	
	/*本地问答END*/
	//获取类别
	function getServiceCategory(){
		sendAjax();  //初始化列表
		function sendAjax(data){

			FindConsultApi.getServiceCategory({rows:4}).then(function (data) {
				createEle(data.rows);
				console.log('类别11',data);
			})
		}
		//createEle();
		function createEle(data){
			//var num=4;
			var html='';
			for (var i = 0; i < 4; i++) {
				html+='<li>';
				html+='<a href="find_consult_quesList.html?categoryId='+data[i].caId +'">';
				html+='<img src="../../public/img/zhaowendaMenu0'+(i+1)+'.png" />';
				html+='<h6 class="color000">'+data[i].name+'</h6>';
				html+='</a>';
				html+='</li>';
			}
			$('#category').prepend(html);
		}
	}
	getServiceCategory();


	// 点击 '>'，跳转到列表页(找咨询)
	$('#arrow_icon_find_consult').click(function () {
		var qType = $('.wenda .title_item.cur').data('id');
		console.log('qType', qType);
		window.location.href = 'find_consult_quesList.html?qType=' + qType; // 跳转到找咨询列表页
	});
	
});//文档准备结束

//搜索

function toSearch(){
	//window.location="${ctx }/findAct/toSearch";
	$('.recentHotSearch').removeClass('none');
	$("#bodyDiv").hide();
	$("#ridiv").show();
	if($("#ridiv").is(":hidden")){
		$("section.searchBox #searchText").css("width","100%");
	}else{
		$("section.searchBox #searchText").css("width","77%");
	}
	$("#lastest").children().remove();
	$("#hotSc").children().remove();
	getRecentlySearch(pageNo);
}
function clearSearch(){
	$("#searchText").val("");
}
// 点击 '搜索' 按钮
function searchActs(){
	var keyword = $("#searchText").val();
	if(!keyword) {
		$.alert('请输入关键字');
		return;
	}
	// window.location = Qnzs.path + "/wechat/view/find_consult/SearchResult.html?keyWord="+encodeURI(keyword);
	window.location.href = 'SearchResult.htm?keyword=' + keyword; // 跳转到结果列表页
}
//判断登录才能提问
//问大家
function askEvery() {
Qnzs.getSessionAccount({}).then(function (data) {
	if (data.status == 'OK') {
		window.location.href='find_consult_askQuestion.html?';
	}else {
		$.alert('请先登录再提问').then(function () {
			window.location.href='../logoin/login.html'
		})
	}
})
}
//问组织
function askOrg() {
	Qnzs.getSessionAccount({}).then(function (data) {
		//alert(333)
		if (data.status == 'OK') {
			window.location.href='find_consult_askOrganization.html'
		}else {
			$.alert('请先登录再提问').then(function () {
				window.location.href='../logoin/login.html';
			})
		}
	})
}
//问专家
function askExpert() {
	Qnzs.getSessionAccount({}).then(function (data) {
		if (data.status == 'OK') {
			window.location.href='find_consult_expert.html'
		}else {
			$.alert('请先登录再提问').then(function () {
				window.location.href='../logoin/login.html';
			})
		}
	})
}

//获取浏览器的路径			
function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
    }  