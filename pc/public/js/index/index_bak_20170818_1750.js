//Qnzs.path=Qnzs.env.dev //api

var oid = '';
var currentAccount = "";
var district_qnzs= $.cookie('district_qnzs'); // 获取cookie(区域)
district_qnzs=JSON.parse(district_qnzs);
  var sitenavDid=district_qnzs.sitenavOrgId;

 console.log(sitenavDid);
$(document).ready(function() {
	Qnzs.getSessionAccount({}).then(function(data) {
		console.log('Qnzs.getSessionAccount data', data);
		currentAccount = data.account; // 账户信息
	});

	/*首页的  热门活动展示*/

	//获取数据 
	function getData() {
		var actStatus = {
			'1': '活动预告',
			'2': '报名中',
			'3': '已满员',
			'4': '报名结束',
			'5': '活动中',
			'6': '活动结束'
		};
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/offlineActivity/recommendList",
			data:{"sitenavDid":sitenavDid},
			dataType: 'json',
			success: function(data) {
				var data = data.rows;
				$.each(data, function(index, item) {
					var actiivtyId = item.id;
					var actTitle = '';
					console.log('item.title.length', item.title.length);
					if (item.title && item.title.length <= 30) {
						actTitle = item.title;
					} else if (item.title && item.title.length > 30) {
						actTitle = item.title.substring(0, 29) + '...';
					}
					//					$('.hot_acticve').append('<li><a href="' + Qnzs.path + '/activity/offlineActivity/detail?activityId=' + actiivtyId + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">'+actStatus[item.actStatus]+'</span><img src="'+item.imageUrl+'" width="400" alt="" /></div><div class="txt"><div class="conTit"><p class="font16 color000">'+item.title+'</p> </div><p class="address color999">'+item.address+'</p><div class="botTxt clearfix"> <p class="fl">'+item.activityTime+'</p> <span class="fr color01">'+item.type+'</span></div></div> </a></li>');
					$('.hot_acticve').append('<li><a href="view/find_active/zhd_xiangqing.html?activityId=' + actiivtyId + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">' + actStatus[item.actStatus] + '</span><img class="imgURl" src="' + item.imageUrl + '" width="100%" height:"100%" alt="" /></div><div class="txt"><div class="conTit"><p class="font16 color000">' + actTitle + '</p> </div><p class="address color999">' + item.address + '</p><div class="botTxt clearfix"> <p class="fl">' + item.activityTime + '</p> <span class="fr color01">' + item.type + '</span></div></div> </a></li>');
				});
			},
		});
	}
	getData();


	/*首页的  热门活动展示  end*/

	/*-------------首页的  人气主办方展示------------------*/
	function indexSponsor() {
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/publisher/list",
			data: {
				'pageSize': 5
			},
			dataType: "JSON",
			success: function(data) {
				var data = data.rows;

				$.each(data, function(index, item) {
					var coor = item.activityAverageScore;
					var corrnum = coor.toFixed(1);
					oid = item.oid;
					//					$('ul#indexSponsor').append('<li class="clearfix borderB01"><a href="view/organization/organization_detail.html?oid='+oid+'"><div class="imgDiv"> <img src="'+item.photoUrl+'"  width="120" alt="" /></div><div class="rightTxt"><div class="titBox"><p class="tit font14 color000">'+item.name+'</p></div><div class="scoreBox clearfix"><ol class="clearfix fl"><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li></ol> <span class="fl scoreColor01 font14 fenshu"><em>'+corrnum+'</em>分</span><span class="yiping font12 color999">'+item.activityScoreCount+'人已评</span></div><div class="botBox clearfix"> <span class="left fl color000 font12">'+item.answerQuestionCount+'人关注</span><a href="javascript:;" class="right fr colorfff disB attention">关注</a><a href="javascript:;" class="right fr colorfff disB attention" style="display:none;width:60px;">取消关注</a></div></div></a></li>');

					var html = '';
					html += '';
					html += '<li class="clearfix borderB01">';
					html += '  <a href="view/organization/organization_detail.html?oid=' + oid + '">';
					html += '    <div class="imgDiv">';
					html += '        <img src="' + item.photoUrl + '" width="100%" height:"100%" alt="" />';
					html += '    </div>';
					html += '    <div class="rightTxt">';
					html += '        <div class="titBox">';
					html += '             <p class="tit font14 color000">' + item.name + '</p>';
					html += '         </div>';
					html += '        <div class="scoreBox clearfix">';
					html += '             <ol class="clearfix fl">';
					html += '                <li><span></span></li>';
					html += '                <li><span></span></li>';
					html += '                <li><span></span></li>';
					html += '                <li><span></span></li>';
					html += '                <li><span></span></li>';
					html += '             </ol> ';
					html += '             <span class="fl scoreColor01 font14 fenshu"><em>' + corrnum + '</em>分</span>';
					html += '             <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span> ';
					html += '        </div>';
					html += '        <div class="botBox clearfix">';
					html += '              <span class="left fl color000 font12" id="attentionCount_' + item.oid + '">' + item.attentionCount + '人关注</span>';
					html += '        </div>';
					html += '    </div>';
					html += '  </a>';
					//					html += '  <a href="javascript:;" class="right fr colorfff disB attention" id="followBtn_' + item.oid + '" value="取消关注" onclick="followOrCancelOrganization(this, ' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');">关注</a>';
					if (item.isFollowed) { //已关注
						html += ' <input type="button" class="right fr colorfff disB guanzhu" id="followBtn_' + item.oid + '" value="取消关注" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />'
							//						html += ' <a href="javascript:;" class="right fr colorfff disB attention" id="followBtn_' + item.oid + '" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');">取消关注</a>';
					} else { //未关注
						//						html += ' <a href="javascript:;" class="right fr colorfff disB attention" id="followBtn_' + item.oid + '" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');">关&nbsp;&nbsp;注</a>';
						html += ' <input type="button" class="right fr colorfff disB guanzhu" id="followBtn_' + item.oid + '" value="关注" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />'
					}
					html += '</li>';
					$('ul#indexSponsor').append(html);
				});

				$('ul#indexSponsor .attention').click(function() {
					$(this).hide().siblings('.attention').show();
				})
			}
		});
	}
	indexSponsor();

	/*-------------首页的  人气主办方展示  end------------------*/



	//首页推键列表 

	function recommendableProjects() {

		obj.ajax('/project/indexActivityList', {}, function(data) {
			console.log(data);
			createEle(data.dataList); //  传递参数
		}, function(data) {
			console.log(1);
		});

		function createEle(data) {
			var num = 5;
			var html = '';
			for (var i = 0; i < data.length; i++) {

				html += '<li class="d_pos' + i + '">'
				html += '<div>'
				html += '   <div class="clearfix">'
				html += '<div class="left fl">'
				html += '<em class="fl color17c0ff">' + data[i].type + '</em>'
				html += '<span class="fl colorfff">' + data[i].title + '</span>'
				html += ' </div>'
				html += '<div class="right fr">'
				html += '<em class="bgc17c0ff dl colorfff">剩</em>'
				html += '<span class="colorfff dl">' + data[i].voteEndTime + '</span>'
				html += ' </div>'
				html += '</div>'
				html += ' </div>'
				html += '<a href="javascript:;">'
				html += ' <img src="' + data[i].bannerUrl + '" alt=""/>'
				html += '</a>'
				html += '</li>'
			};

			//			$('.d_img').append(html);

		}

	}
	recommendableProjects();


	/*-----------------------------问答板块-----------------------------*/
	//获取地区ID
	var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	var sitenavOrgId
	if (district_qnzs) {
		district_qnzs = JSON.parse(district_qnzs);
		if (district_qnzs && district_qnzs.sitenavOrgId) {
			sitenavOrgId = district_qnzs.sitenavOrgId;
		} else {
			sitenavOrgId = 440000; // 默认广东省
		}
	} else {
		sitenavOrgId = 440000; // 默认广东省
	}
	/*热门问答*/
	// console.log('地区ID',sitenavOrgId)
	function hot_ask() {
		sendAjax(); //初始化列表

		//console.log('qType', qType);
		function sendAjax(data) {
			//var qType = $("#qType .cur").attr("lang");
			//var data={page:0,rows:3,qType:qType};

			FindConsultApi.getServiceList({
				page: 0,
				rows: 5,
				qType: 1,
				sitenavOrgId: sitenavOrgId
			}).then(function(data) {
				createEle(data.rows);
				// console.log('组织11', data);
			})
		}

		function createEle(data) {
			var list = '';
			for (var i = 0; i < data.length; i++) {
				var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
				var imgUrl = data[i].photourl ? data[i].photourl : 'public/img/default_avator.png';
				list += '<a href="view/find_consult/find_consult_quesdetail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="itemBox">'
				list += ' <div class="itemCon borderB01 clearfix">'
				list += '  <div class="imgDiv fl">'
				list += '   <img src="' + imgUrl + '" />'
				list += '  </div>'
				list += '  <div class="rightTxt">'
				list += '   <h3 class="font16 color2185cf">' + data[i].title + '</h3>'
				list += '   <div class="color000 askcont">' + data[i].askContent + '</div>'
				list += '   <div class="botBox clearfix">'
				list += '    <div class="left fl">'
				list += '     <span class="span01 borderR01">' + data[i].realname + '</span>'
				list += '     <span class="span02">' + data[i].categoryName + '</span>'
				list += '     <span class="span03">' + datetime + '</span>'
				list += '    </div>'
				list += '    <span class="right fr color333 pinglun">' + data[i].commentsNum + '</span>'
				list += '   </div>'
				list += '  </div>'
				list += ' </div>'
				list += '</a>'
			}
			$('.ask_and_answer .list01').append(list)
		}
	}

	hot_ask()

	/*精华问答*/
	function best_ask() {
		sendAjax(); //初始化列表

		//console.log('qType', qType);
		function sendAjax(data) {
			//var qType = $("#qType .cur").attr("lang");
			//var data={page:0,rows:3,qType:qType};

			FindConsultApi.getServiceList({
				page: 0,
				rows: 6,
				qType: 2,
				sitenavOrgId: sitenavOrgId
			}).then(function(data) {
				createEle(data.rows);
				// console.log('组织11', data);
			})
		}

		function createEle(data) {
			var list = '';

			for (var i = 0; i < data.length; i++) {
				var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
				var imgUrl = data[i].photourl ? data[i].photourl : 'public/img/default_avator.png';
				list += '<a href="view/find_consult/find_consult_quesdetail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="itemBox">'
				list += ' <div class="itemCon borderB01 clearfix">'
				list += '  <div class="imgDiv fl">'
				list += '   <img src="' + imgUrl + '" />'
				list += '  </div>'
				list += '  <div class="rightTxt">'
				list += '   <h3 class="font16 color2185cf">' + data[i].title + '</h3>'
				list += '   <div class="color000 askcont">' + data[i].askContent + '</div>'
				list += '   <div class="botBox clearfix">'
				list += '    <div class="left fl">'
				list += '     <span class="span01 borderR01">' + data[i].realname + '</span>'
				list += '     <span class="span02">' + data[i].categoryName + '</span>'
				list += '     <span class="span03">' + datetime + '</span>'
				list += '    </div>'
				list += '    <span class="right fr color333 pinglun">' + data[i].commentsNum + '</span>'
				list += '   </div>'
				list += '  </div>'
				list += ' </div>'
				list += '</a>'
			}
			$('.ask_and_answer .list02').append(list)
		}
	}
	best_ask()

	/*问答板块右边列表 活跃组织*/
	function activeOrg() {
		sendAjax(); //初始化列表
		function sendAjax(data) {
			FindConsultApi.searchOrganization({
				page: 0,
				rows: 6,
				order: 'desc',
				sort: 'answer_question_count'
			}).then(function(data) {
				createEle(data.rows);
				//console.log('组织11', data);
			})
		}

		function createEle(data) {
			var html = '';
			var num = 3;
			for (var i = 0; i < data.length; i++) {
				var imgUrl = data[i].photoUrl ? data[i].photoUrl : 'public/img/default_avator.png';
				html += '<li class="clearfix borderB01 position_r">'
				html += ' <a href="view/organization/organization_detail.html?oid=' + data[i].oid + '">'
				html += '  <div class="imgDiv">'
				html += '   <img src="' + imgUrl + '" alt="">'
				html += '  </div>'
				html += '  <div class="rightTxt">'
				html += '   <div class="titBox">'
				html += '     <p class="tit font14 color000">' + data[i].name + '</p>'
				html += '   </div>'
				html += '   <p class="middleTxt color666">已解答<span>' + data[i].answerQuestionCount + '</span>个问题</p>'
				html += '   <div class="botBox clearfix">'
				html += '   </div>'
				html += '  </div>'
				html += ' </a>'
				html += ' <a href="view/organization/organization_detail.html?oid=' + data[i].oid + '" class="right fl colorfff disB tiwenBtn position_a">向TA提问</a>'
				html += '</li>'
			}
			$('.activityOrg_ul').append(html)
		}
	}
	activeOrg()


	/*-----------------------------问答板块  end-----------------------------*/

	/*------------------------推荐专家 start------------------------*/
	function recommendPro() {
		sendAjax(); //初始化列表
		function sendAjax(data) {

			FindConsultApi.findAllExpertAccount({
				'page': 0,
				'rows': 6
			}).then(function(data) {
				createEle(data.rows);

				// console.log('专家11',data);
			})
		}
		//createEle();
		function createEle(data) {

			var num = 3;
			var html = '';
			for (var i = 0; i < data.length; i++) {
				var imgUrl = data[i].photoUrl ? data[i].photoUrl : 'public/img/default_avator.png';
				html += '<li>'
				html += '<a href="view/find_consult/find_consult_wzj_detail.html?username=' + data[i].username + '">'
				html += '  <div class="imgBox">'
				html += '   <div class="imgDiv">'
				html += '    <img src="' + imgUrl + '" />'
				html += '   </div>'
				html += '  </div>'
				html += '  <h2 class="name color000 font16">' + data[i].orgName + '</h2>'
				html += '  <p class="touxian color666">' + data[i].expProfession + '</p>'
				html += '  <button class="colorfff")">向TA提问</button>'
				html += ' </a>'
				html += '</li>'
			};
			$('.tuijianzhuanjia .bd ul').append(html);
		}
	}
	recommendPro()

	// function recommendPro(){
	//     var list='';
	//     var num=7;
	//     var proName=['李娟','张三','赵子龙','李四','王五','陈留','不知道']
	//     for (var i = 0; i < num; i++) {
	//         list+='<li>'
	//         list+=' <a href="qnzs_zzx_wenzhuanjiaxiangqing.html">'
	//         list+='  <div class="imgBox">'
	//         list+='   <div class="imgDiv">'
	//         list+='    <img src="public/img/pro0'+(i+1)+'.png" />'
	//         list+='   </div>'
	//         list+='  </div>'
	//         list+='  <h2 class="name color000 font16">'+proName[i]+'</h2>'
	//         list+='  <p class="touxian color666">国家二级心理咨询师</p>'
	//         list+='  <button class="colorfff">向TA提问</button>'
	//         list+=' </a>'
	//         list+='</li>'
	//     };
	//     $('.tuijianzhuanjia .bd ul').append(list);
	//
	//
	// }
	// recommendPro();
	jQuery(".tuijianzhuanjia .picScroll").slide({
		mainCell: ".bd ul",
		autoPage: true,
		effect: "leftLoop",
		vis: 6
	});

	/*------------------------推荐专家 end------------------------*/

	// /*首页 求助版块    求助中*/
	// function needHelp(){
	//     var list='';
	//     var num=5;
	//     for (var i = 0; i < num; i++) {
	//         list+='<a href="qnzs_zbz_xiangqing.html" class="disB itemBox">'
	//         list+=' <div class="itemCon borderB01 clearfix">'
	//         list+='  <div class="imgDiv fl">'
	//         list+='   <img src="public/img/ask0'+(i+1)+'.png"/>'
	//         list+='  </div>'
	//         list+='  <div class="rightTxt">'
	//         list+='   <div class="top clearfix">'
	//         list+='    <span class="fl colorfff">求助中</span>'
	//         list+='    <h3 class="color000 font16 fl">《创意之棒——希望之窗》</h3>'
	//         list+='   </div>'
	//         list+='   <p class="longTxt color999">幸福不同于心情和稍纵即逝的情绪。幸福是回顾自己生活时的会心微笑，因为知道会有这样的时刻：孩子们不愿按时睡觉，可是过会儿再去查看</p>'
	//         list+='   <div class="middle color000">'
	//         list+='    <span class="left borderR01">受理方：广东团省委</span>'
	//         list+='    <span class="right">求助类型：医疗求助</span>'
	//         list+='   </div>'
	//         list+='   <div class="bottom clearfix color000">'
	//         /*list+='    <span class="span01 fl">108</span>'*/
	//         list+='    <span class="span02 fl">62</span>'
	//         list+='    <span class="span03 fl">2016-09-20</span>'
	//         list+='    <button class="fr colorfff conBgc01">我要帮TA</button>'
	//         list+='   </div>'
	//         list+='  </div>'
	//         list+=' </div>'
	//         list+='</a>'
	//     };
	//     $('.askForHelp .list01').append(list);
	// }
	// needHelp();
	//
	// /*已解决*/
	// function needHelp_2(){
	//     var list='';
	//     var num=3;
	//     for (var i = 0; i < num; i++) {
	//         list+='<a href="qnzs_zbz_xiangqing.html" class="disB itemBox">'
	//         list+=' <div class="itemCon borderB01 clearfix">'
	//         list+='  <div class="imgDiv fl">'
	//         list+='   <img src="public/img/ask02.png"/>'
	//         list+='  </div>'
	//         list+='  <div class="rightTxt">'
	//         list+='   <div class="top clearfix">'
	//         list+='    <span class="fl colorfff">已解决</span>'
	//         list+='    <h3 class="color000 font16 fl">《创意之棒——希望之窗》</h3>'
	//         list+='   </div>'
	//         list+='   <p class="longTxt color999">幸福不同于心情和稍纵即逝的情绪。幸福是回顾自己生活时的会心微笑，因为知道会有这样的时刻：孩子们不愿按时睡觉，可是过会儿再去查看</p>'
	//         list+='   <div class="middle color000">'
	//         list+='    <span class="left borderR01">受理方：广东团省委</span>'
	//         list+='    <span class="right">求助类型：医疗求助</span>'
	//         list+='   </div>'
	//         list+='   <div class="bottom clearfix color000">'
	//         list+='    <span class="span02 fl">62</span>'
	//         list+='    <span class="span03 fr">2016-09-20</span>'
	//         list+='   </div>'
	//         list+='  </div>'
	//         list+=' </div>'
	//         list+='</a>'
	//     };
	//     $('.askForHelp .list02').append(list);
	// }
	// needHelp_2();
	//
	// /*爱心组织*/
	// function loveOrg(){
	//     var list='';
	//     var num=6;
	//     var img=0;
	//     for (var i = 0; i < num; i++) {
	//         img++;
	//         if(img>3){img=1;}
	//         list+='<li class="clearfix borderB01">'
	//         list+=' <a href="qnzs_zbz_zuzhixiangqing.html">'
	//         list+='  <div class="imgDiv">'
	//         list+='   <img src="public/img/host0'+img+'.png"  width="120" alt="" />'
	//         list+='  </div>'
	//         list+='  <div class="rightTxt">'
	//         list+='   <div class="titBox">'
	//         list+='    <p class="tit font14 color000">广州市爱心助学工程项目组</p>'
	//         list+='   </div>'
	//         list+='   <div class="scoreBox clearfix">'
	//         list+='    <ol class="clearfix fl"></ol>'
	//         list+='    <span class="fl scoreColor01 font14 fenshu"><em>3</em>分</span>'
	//         list+='    <span class="yiping font12 color999">'+i+'人已评</span>'
	//         list+='   </div>'
	//         list+='   <div class="botBox clearfix">'
	//         list+='    <span class="left fl color000 font12">已受理求助'+(i+100)+'次</span>'
	//         list+='    <a href="javascript:;" class="right fr color000 disB">'+(i+10)+'人关注</a>'
	//         list+='   </div>'
	//         list+='  </div>'
	//         list+=' </a>'
	//         list+='</li>'
	//     };
	//     $('.askForHelp .rightHost .bd ul').append(list);
	//     for (var i = 0; i < 5; i++) {
	//         $('.askForHelp .scoreBox ol').append('<li><span></span></li>')
	//     };
	// }
	// loveOrg();
	//
	// /*首页 求助版块   end*/
});





/**
 * 关注或取消关注组织
 * @param orgId 组织ID
 * @param isFollowed 是否已关注过
 * @param attentionCount 当前关注数
 * @returns
 */
function followOrCancelOrganization(orgId, isFollowed, attentionCount) {
	if (!currentAccount) {
		alert("请先登录");
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
			if (data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				alert(data.msg);
				var btnStr = "";
				if (isFollowed == true) { //已关注，取消关注
					attentionCount = !attentionCount || attentionCount <= 0 ? 0 : attentionCount - 1; //关注数-1
					btnStr = "关注";
				} else { //未关注，添加关注
					attentionCount = attentionCount + 1; //关注数+1
					btnStr = "取消关注";
				}

				$('#followBtn_' + orgId).val(btnStr);
				$('#attentionCount_' + orgId).text(attentionCount + '人关注');
			}
		}
	});
}