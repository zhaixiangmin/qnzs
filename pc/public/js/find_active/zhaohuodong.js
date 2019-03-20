//接口IP地址

//Qnzs.path=Qnzs.env.dev_wyh;
//Qnzs.path = Qnzs.env.dev2;

var ActivityApi = {};
var currentAccount = "";
var oid = ""; //组织id

var sitenavDid = 440000; // 默认广东省
if($.cookie && $.cookie('district_qnzs')) {
	var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	district_qnzs = JSON.parse(district_qnzs);
	sitenavDid = district_qnzs.sitenavOrgId;
}

ActivityApi.getDistrict= function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/list', data, '获取活动分页');
};

/*
热门接口*/

ActivityApi.gethotList= function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/hotList', data, '获取热门活动分页');
};

$(document).ready(function() {
	/*活动的类型、状态*/
	//var actType=['全部','运动','派对','旅游','亲子','讲座','公益','同城','环保','交友','电竞','其它'];
	//var actStatus=['不限','活动预告','报名中','已满员','报名结束','活动结束'];
	Qnzs.getSessionAccount({}).then(function(data) {
		console.log('Qnzs.getSessionAccount data', data);
		currentAccount = data.account; // 账户信息
	});

	//活动类型
	function typeList(data) {
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/type/list",
			dataType: "JSON",
			success: function(data) {
				var data = data.dataList;
				for(var i = 0; i < data.length; i++) {
					var item = data[i];
					$('.titListBox .actType .listDiv').append('<a href="javascript:getQuestionsByParams();"   class="option" lang="' + item.id + '">' + item.name + '</a>');
				};
			},
		});
	}
	typeList();

	//活动类型点击筛选
	$('#listDiv').on('click', '.option', function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
	})

	//活动状态
	function pressList(data) {
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/offlineActivity/progressesList",
			dataType: "JSON",
			success: function(data) {
				var data = data.dataList;
				$.each(data, function(index, item) {
					$('.titListBox .actStatus .listDiv').append('<a href="javascript:getQuestionsByParam();" class="option" lang="' + item.id + '">' + item.name + '</a>');
				});
			}
		});
	}

	pressList();

	//活动状态筛选
	$('#pesserLst').on('click', '.option', function(event) {
		$(this).addClass('curr').siblings().removeClass('curr');
	})

	$('.titListBox .listDiv').each(function(index, el) {
		$(el).find('a.option:first').addClass('cur');
	});

	$('.titListBox a.option').click(function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');
	});

	/*获取数据分页*/
	function getData(data) {
		var htmlList = ""
			var actStatus = {
				'1': '活动预告',
				'2': '报名中',
				'3': '已满员',
				'4': '报名结束',
				'5': '活动中',
				'6': '活动结束'
		};

		for(var i = 0; i < data.length; i++) {
			var item = data[i];
			htmlList += '<li class="clearfix borderB01 list_content">';
			htmlList += '<a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.id + '">';
			htmlList += '<div class="content_box">';
			htmlList += '<div class="zhd_l fl">';
			htmlList += '<img src="' + Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_126,w_188') + '" width="100%" height:"100%" alt="" class="imgs" />';
			htmlList += '</div>';
			htmlList += '<div class="zhd_r fl">';
			htmlList += '<h3 class="font16 color000">' + item.title + '</h3>';
			htmlList += '<p class="font12 zhd_style">' + item.type + '</p>';
			htmlList += '<p class="font12 color999 zhd_time">' + item.activityTime + '</p>';
			htmlList += '<p class="font12 color999 zhd_adress">' + item.address + '</p>';
			htmlList += '</div>';
			htmlList += '<span class="conBgc01 font12 colorfff">' + actStatus[item.actStatus] + '</span>';
			htmlList += '</div>';
			htmlList += '</a>';
			htmlList += '</li>';
		}
		return htmlList;
	}

	function pageCheck(parentCell, contentCell, data, arg) {
		$(parentCell).pageFun({
			contentCell: contentCell,
			/*包裹数据列表的父容器*/
			maxPage: 6,
			/*显示页码框个数*/
			apiProxy: ActivityApi.getDistrict,
			/*接口函数*/
			data: data,
			/*接口参数*/
			listFun: getData,
			/*数据列表函数 -- 返回html字符串*/
			arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}

	var data = { /*接口参数*/
			sitenavDid:sitenavDid,
			pageIndex: 1, //当前页
			pageSize: 6, //页码数
			keywords: undefined,//关键字
			progress:undefined,//活动状态
			actType:undefined//活动类型
	};
	//获取数据 end

	// 分页器插件 -- 找活动
	pageCheck('.zhd_list_box', '#zhd_list_ul', data);

	/*	点击搜索*/
	$('#serchar').on('click', function() {
		var keywords = $('#sb_huodong').val(); //获取搜索关键字
		/*var progress=$("#pesserLst .curr").attr("lang");
     	var actType=$("#listDiv .cur").attr("lang");


     	data.actType=actType;
  	     data.progress=progress;*/
		data.keywords = keywords;
		var html = '';

		html += '<ul class="zhd_list_ul" id="zhd_list_ul"></ul>'
			$('.zhd_list_box').html(html);

		pageCheck('.zhd_list_box', '#zhd_list_ul', data);
	})


	/*活动浏览列表end*/
	function indexSponsor() {
		/*var html=''
        var num=10;
        var fenshu=0;
        for (var i = 0; i < num; i++) {
            fenshu++;
            if(fenshu>5){fenshu=1;}
            html+='<li class="clearfix borderB01 position_r">'
            html+=' <a href="../../view/organization/organization_detail.html?oid=' + oid + '">'
            html+='  <div class="zhd_img fl">'
            html+='   <img src="' + item.photoUrl + '" alt="" />'
            html+='  </div>'
            html+='  <div class="rightTxt">'
            html+='   <div class="titBox">'
            html+='    <p class="tit font14 color000">' + item.name + '</p>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'
            html+='    <ol class="clearfix fl"></ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+corrnum+'</em>分</span>'
            html+='    <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span>'
            html+='   </div>'
            html+='   <div class="botBox clearfix">'
            html+='    <span class="left fl color000 font12">' + item.attentionCount + '人关注</span>'
            html+='   </div>'
            html+='  </div>'
            html+=' </a>'
            html+=' <input type="button" class="right fr colorfff disB guanzhu position_a" value="关注" />'
            html+=' <input type="button" class="right fr colorfff disB guanzhu position_a" style="display:none;" value="取消关注" />'
            html+='</li>'
        };
        $('.hostUl').append(html);
        for (var i = 0; i < 5; i++) {
            $('ul.hostUl ol').append('<li><span></span></li>')
        };
    }*/

		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/publisher/list",
			dataType: "JSON",
			data:{//当前页
				pageSize: 10},
				success: function(data) {
					var data = data.dataList;
					var html = '';
					$.each(data, function(index, item) {
						var coor = item.activityAverageScore;
						var corrnum = coor.toFixed(1);

						oid = item.oid; //组织id

						//					$('.hostUl').append('<li class="clearfix borderB01 position_r"> <a href="../../view/organization/organization_detail.html?oid=' + oid + '"> <div class="zhd_img fl"><img src="' + item.photoUrl + '" alt="" /> </div> <div class="rightTxt"><div class="titBox"><p class="tit font14 color000">' + item.name + '</p></div><div class="scoreBox clearfix"><ol class="clearfix fl"><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li></ol><span class="fl scoreColor01 font14 fenshu"><em>' + corrnum + '</em>分</span><span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span></div><div class="botBox clearfix"><span class="left fl color000 font12">' + item.answerQuestionCount + '人关注</span></div></div></a><input type="button" class="right fr colorfff disB guanzhu position_a" value="关注" /><input type="button" class="right fr colorfff disB guanzhu position_a" style="display:none;" value="取消关注" /></li>');

						html += '<li class="clearfix borderB01 position_r">';
						html += ' <a href="../../view/organization/organization_detail.html?oid=' + oid + '">';
						html += '  <div class="zhd_img fl">';
						html += '   <img src="' + Utils.compressByAli(item.photoUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" width="100%" height:"100%" alt="" />';
						html += '  </div>';
						html += '  <div class="rightTxt">';
						html += '   <div class="titBox">';
						html += '    <p class="tit font14 color000">' + item.name + '</p>';
						html += '   </div>';
						html += '   <div class="scoreBox clearfix">';
						html += '    <ol class="clearfix fl"></ol>';
						html += '    <span class="fl scoreColor01 font14 fenshu"><em>' + corrnum + '</em>分</span>';
						html += '    <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span>';
						html += '   </div>';
						html += '   <div class="botBox clearfix">';
						html += '    <span class="left fl color000 font12" id="attentionCount_' + item.oid + '">' + item.attentionCount + '人关注</span>';
						html += '   </div>';
						html += '  </div>';
						html += ' </a>';
						/*if(item.isFollowed) { //已关注
								html += ' <input type="button" class="right fr colorfff disB guanzhu position_a" id="followBtn_' + item.oid + '" value="取消关注" onclick="followOrCancelOrganization(this, ' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />';
							} else { //未关注;
								html += ' <input type="button" class="right fr colorfff disB guanzhu position_a" id="followBtn_' + item.oid + '" value="关注" onclick="followOrCancelOrganization(this, ' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />';
							}*/
						//		            html+=' <input type="button" class="right fr colorfff disB guanzhu position_a" id="follow_' + item.oid + '" value="关注" onclick="followOrganization(' + item.oid + ', ' + item.attentionCount + ');" />';
						//		            html+=' <input type="button" class="right fr colorfff disB guanzhu position_a" id="cancel_' + item.oid + '" style="display:none;" value="取消关注" onclick="cancelOrganizationFollow(' + item.oid + ', ' + item.attentionCount + ');" />';
						html += '</li>';
					});

					$('.hostUl').append(html);
				}
		});
	};
	indexSponsor();

	function getIndeber() {
		$.ajax({
			type:"get",
			url:Qnzs.path+"/imageManager/findImageByType",
			data:{'did':sitenavDid,'type':0,'acticey':1},
			dataType :"JSON",
			success:function(data) {
				var data=data.dataList;
				var autoPlay = data.length > 1 ? true : false; // 只有一张banner，不自动轮播
				var htmlbr='';
				for(var i = 0; i < data.length; i++){
					temp=data[i];
					htmlbr+='<li>';
					htmlbr+='<a href="'+temp.url+'" target="_blank">';
					htmlbr+='<img src="'+temp.path+'" />';
					htmlbr+='</a>';
					htmlbr+='</li>';
				}
				$('#head-banner ul').append(htmlbr);

				jQuery(".banBox").slide({
					titCell: ".hd ul",
					mainCell: ".bd ul",
					effect: "leftLoop",
					autoPlay: autoPlay,
					autoPage:true,
					interTime: 3000,
					delayTime: 300,
					prevCell: ".change.prev",
					nextCell: ".change.next",
					trigger: "mouseover"
				});
			}
		})
	}
	getIndeber()
});

//获取数据先加载
function getData(data) {
	var htmlList = ""
		var actStatus = {
			'1': '活动预告',
			'2': '报名中',
			'3': '已满员',
			'4': '报名结束',
			'5': '活动中',
			'6': '活动结束'
	};

	for(var i = 0; i < data.length; i++) {
		var item = data[i];
		htmlList += '<li class="clearfix borderB01 list_content">';
		htmlList += '<a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.id + '">';
		htmlList += '<div class="content_box">';
		htmlList += '<div class="zhd_l fl">';
		htmlList += '<img src="' + Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '"  alt="" class="imgs" />';
		htmlList += '</div>';
		htmlList += '<div class="zhd_r fl">';
		htmlList += '<h3 class="font16 color000">' + item.title + '</h3>';
		htmlList += '<p class="font12 zhd_style">' + item.type + '</p>';
		htmlList += '<p class="font12 color999 zhd_time">' + item.activityTime + '</p>';
		htmlList += '<p class="font12 color999 zhd_adress">' + item.address + '</p>';
		htmlList += '</div>';
		htmlList += '<span class="conBgc01 font12 colorfff">' + actStatus[item.actStatus] + '</span>';
		htmlList += '</div>';
		htmlList += '</a>';
		htmlList += '</li>';
	}
	return htmlList;
}

function pageCheck(parentCell, contentCell,maxPage,apiProx, data, listFun,arg) {
	$(parentCell).pageFun({
		contentCell: contentCell,
		/*包裹数据列表的父容器*/
		maxPage:maxPage,
		/*显示页码框个数*/
		apiProxy: apiProx,
		/*接口函数*/
		data: data,
		/*接口参数*/
		listFun: listFun,
		/*数据列表函数 -- 返回html字符串*/
		arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
	});
}

var data = { /*接口参数*/
		sitenavDid:sitenavDid,
		pageIndex: 1, //当前页
		pageSize: 6, //页码数
		keywords: undefined,  //关键字
		progress:undefined,   //活动状态
		actType:undefined     //活动类型
};




function getQuestionsByParams(keywords){

	var keywords = $('#sb_huodong').val(); //获取搜索关键字
	var progress=$("#pesserLst .curr").attr("lang");
	var actType=$("#listDiv .cur").attr("lang");

	if('null' == keywords || 'undefined' == keywords){
		keywords = null;
	}

	data.actType=actType;
	data.progress=progress;
	data.keywords = keywords;

	var html = '';
	html += '<ul class="zhd_list_ul" id="zhd_list_ul"></ul>';
	$('.zhd_list_box').html(html);

	pageCheck('.zhd_list_box', '#zhd_list_ul', 6, ActivityApi.getDistrict,data,getData);
}

/*按照状态筛选*/
function getQuestionsByParam(keywords){
	var keywords = $('#sb_huodong').val(); //获取搜索关键字
	var progress=$("#pesserLst .curr").attr("lang");
	var actType=$("#listDiv .cur").attr("lang");

	if('null' == keywords || 'undefined' == keywords){
		keywords = null;
	}

	data.actType=actType;
	data.progress=progress;
	data.keywords = keywords;

	var html = '';
	html += '<ul class="zhd_list_ul" id="zhd_list_ul"></ul>';
	$('.zhd_list_box').html(html);

	pageCheck('.zhd_list_box', '#zhd_list_ul', 6, ActivityApi.getDistrict,data,getData);
}




/*按照状态热门*/
function gethotList(keywords){
	
	var keywords = $('#sb_huodong').val(); //获取搜索关键字
	var progress=$("#pesserLst .curr").attr("lang");
	var actType=$("#listDiv .cur").attr("lang");

	if('null' == keywords || 'undefined' == keywords){
		keywords = null;
	}

	data.actType=actType;
	data.progress=progress;
	data.keywords = keywords;
	var html = '';
	html += '<ul class="zhd_list_ul" id="zhd_list_ul"></ul>';
	$('.zhd_list_box').html(html);

	pageCheck('.zhd_list_box', '#zhd_list_ul', 1, ActivityApi.gethotList,data,getData);
	
	
	
}




/**
 * 关注或取消关注组织
 * @param obj
 * @param orgId
 * @param isFollowed
 * @returns
 */
function followOrCancelOrganization(obj, orgId, isFollowed, attentionCount) {
	if(!currentAccount) {
		alert("请先登陆后再来哦！");
		$('#loginBtn').click();
		return;
	}

	$.ajax({
		type: "get",
		url: Qnzs.path + "/organizationAttention/followOrCancel",
		data: {
			'orgId': orgId
		},
		dataType: "JSON",
		success: function(data) {
			if(data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				alert(data.msg);
				var btnStr = "";

				if(isFollowed == true) { //已关注，取消关注
					attentionCount = !attentionCount || attentionCount <= 0 ? 0 : attentionCount - 1; //关注数-1
					btnStr = "关注";
				} else { //未关注，添加关注
					attentionCount = attentionCount + 1; //关注数+1
					btnStr = "取消关注";
				}
				console.log('followBtn_' ,'followBtn_' + orgId);
				console.log('attentionCount_' ,'attentionCount_' + orgId);
				$('#followBtn_' + orgId).val('');
				$('#followBtn_' + orgId).val(btnStr);
				$('#attentionCount_' + orgId).html('');
				$('#attentionCount_' + orgId).html(attentionCount + '人关注');
			}
		}
	});
}