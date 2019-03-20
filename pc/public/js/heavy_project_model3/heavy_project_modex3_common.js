/*******  获取列表传过来的id值，查询信息   *******/
var activityId = "";
var questionId = "";
var replyPageNo = 1;

function getRequest() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
		//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		activityId = strs[1];
        
		$('#hidden_activity_id').val(activityId);
		$('#sign_up').attr('href', 'openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
		$('#project_main').attr('href', 'zbxm_index_model_3.html?activityId=' + activityId + ''); //首页
		$('#project_detalis').attr('href', 'zbxm_index_model3_detail.html?activityId=' + activityId + ''); //详情
		$('#team').attr('href', 'zbxm_index_model3_team.html?activityId=' + activityId + ''); //参赛团队
		$('#project_dynamic').attr('href', 'zbxm_index_model3_trends.html?activityId=' + activityId + ''); //项目动态
		$('.logo a').attr('href', 'heavy_main_list.html'); //头部logo

		$('#more_heavy_project').attr('href', 'heavy_project_model1_team.html?activityId=' + activityId + ''); //参赛团队-more
		$('#more_detail_list').attr('href', 'heavy_project_model1_trends_dynamic.html?activityId=' + activityId + ''); //项目动态-more 
			$('.active_more_btn').attr('href', 'zbxm_index_model3_trends.html?activityId=' + activityId + ''); //项目动态更多
	}
}
getRequest();

$('.header_nav .nav_li').click(function(event) {
	$(this).addClass('cur').siblings().removeClass('cur');
});

/*banner消息显示*/
$('.info_rolling_box.hasClose').mouseenter(function(event) {
	$('.close_btn').stop().animate({
		'width': '30px',
		'margin-left': '25px'
	}, 200)
}).mouseleave(function(event) {
	$('.close_btn').stop().animate({
		'width': '0',
		'margin-left': '0'
	}, 200)
});
$('.info_rolling_box.hasClose .close_btn').click(function(event) {
	$('.info_rolling_box.hasClose').hide();
});
/*banner上方消息轮播*/
/*function info_rolling(){
    var html=''
    var num=5;
    for (var i = 0; i < num; i++) {
        html+='<li>'
        html+=' <span class="user_photo_box fl">'
        html+='  <span class="user_photo"><img src="../../public/img/pro02.png" /></span>'
        html+=' </span>'
        html+=' <span class="user_name fl">三笠阿克曼</span>'
        html+=' <p class="fl p">为蓝盾团队团队投了一票</p>'
        html+=' <span class="fl how_long">1秒前</span>'
        html+='</li>'
    };
    $('.rolling_list').append(html);
    }
    info_rolling();
    jQuery(".info_rolling_box").slide({
        mainCell:".rolling_list",
        effect:"leftMarquee",
        autoPlay:true,
        interTime:30,
        mouseOverStop:false
    });*/

/*项目动态 新闻图片轮播*/
/*  jQuery(".picture_box").slide({
      mainCell:".picture_list",
      effect:"leftLoop",
      autoPlay:true,
      autoPage:true,
      interTime:3000,
      delayTime:300,
      trigger:"mouseover"
  });
    */
/*首页-项目动态列表*/
function createProjectList() {
	obj.ajax('/project/getActivityDetailList', {
		'activityId':activityId
	}, function(data) {
//		console.log(data)
		var html = '';
		var detailList = data.dataList;
		var num = detailList.length <= 6 ? detailList.length : 6;
//		console.log(detailList)
		for (var i = 0; i <num; i++) {
			if (i == 0) {
				var imgHtml = '';
				imgHtml += '<li>'
				if (detailList[i].imageUrl == "") {
					$('.body_l_pic img').attr('src', '../../public/img/act01.png' );
				
				} else {

				    $('.body_l_pic img').attr('src', detailList[0].imageUrl);
				}
				imgHtml += '</li>'
//				$('.picture_list').html(imgHtml);
//				$('.under_title_txt').html(detailList[i].title);
//				$('.under_title_txt').attr('href', 'heavy_project_model1_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + ''); //参赛团队-more
			} 
          
			html +='<a href=""heavy_project_model1_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + '"" class="r_news_title">' + detailList[i].title + '</a>'

		}
		$('.body_r_news').html(html);
	}, function(data) {});
}
createProjectList();

/**公共ajax请求**/
function ajaxCom() {
	obj.ajax('/project/activityDetail', {
		'activityId': activityId
	}, function(data) {
		console.log(data);
		var currActivity = data.dataList;
//		//more-项目详情
//		$('#project_detail,#more_heavy_remark,#more_heavy_process,#more_heavy_prize,#more_heavy_requirement').attr('href', 'heavy_project_model1_detail.html?activityId=' + activityId + '&activityDetailId=' + currActivity.newsUrl1 + ''); //项目详情
//
		requirement_list(currActivity.requirementsList) //报名要求
		process_list(currActivity.processList); //评选流程
//		//		createReatorType(currActivity.applicantTypes); //参赛者分类
//		prizeSet(currActivity.prizeList); //奖项
//		//		enrollStage(currActivity.stage);//报名状态
//		$('#banner_center').css("background-image", "url(" + currActivity.bannerUrl + ")"); //banner图
//		$('title').html(data.dataList.title); //网页标题
		$('#introduction_text').text(currActivity.remark); //活动介绍

		var mobile = currActivity.mobile;
		if (mobile.length < 11) {
			mobile = mobile.substr(0, 3) + " " + mobile.substr(3, 4) + " " + mobile.substr(7, 4)
		}
		$('.phone_number').html(mobile); //联系电话

		questionId = currActivity.askUrl; //在线咨询帖子地址
		if (questionId != "") {
			discuss_list(); //在线咨询讨论区
			$('#more_service_question').attr('href', '../find_consult/find_consult_quesdetail.html?quId=' + questionId + ''); //大家都在讨论-more
		} else {
			$('.load_more').html('暂无内容');
		}

		if (currActivity.sponsorUnit) {
			$('.sponsor_unit_list').html(currActivity.sponsorUnit); //主办单位
		} else {
			$('.sponsor_unit_list').parent().hide();
		}
		if (currActivity.assistUnit) {
			$('.assist_unit_list').html(currActivity.assistUnit); //协办单位
		} else {
			$('.assist_unit_list').parent().hide();
		}
		if (currActivity.undertakeUnit) {
			$('.undertake_unit_list').html(currActivity.undertakeUnit); //承办单位
		} else {
			$('.undertake_unit_list').parent().hide();
		}
		
		//投票指引
		if(currActivity.voteGuide){
			//$('.bg_black').show() //显示投票弹框
			$('.vote_content').html(currActivity.voteGuide)//显示内容
		}else{
			$('.vote_item').hide()
			
		}
		//报名指引 enrollGuide_content
		if(currActivity.enrollGuide){
			$('.enrollGuide_content').html(currActivity.enrollGuide);  //显示内容
		}else{
			$('.en_item').hide()
		}
		
		//下载附件
		if(currActivity.datazipUrl){
			$('#load_file').attr('href',currActivity.datazipUrl); //赋值 
		}else{
			$('#load_file_box').hide()
		}
		
		
		
		
		
	}, function(data) {
		
	});
}
ajaxCom();

/*报名要求*/ //project/enroll/projectList
function requirement_list(data) {
	var num = data.length <= 5 ? data.length : 5;
	var html = ''
	for (var i = 0; i < num; i++) {
//		html += '<li class="item">'
//		html += ' <div class="item_con">'
//		html += '  <div class="item_con_num"></div>'
//		html += '  <p class="item_con_txt">' + data[i].content + '</p>'
//		html += ' </div>'
//		html += '</li>'
        html +='<li class="item">'
        html +=           ' <div class="item_con">'
         html +=           ' <img src="../../public/img/require_'+(i+1)+'.png" class="requirement_list_img"/>'
        html +=                '<p class="item_con_txt">' + data[i].content + '</p>'
        html +=          '  </div>'
        html +=        '</li>'

	};

	$('.requirement_list').html(html);
	$('.requirement_box .item:last').css('margin-right', '0');
	$('.requirement_box .item_con_num').each(function(index, el) {
		$(el).css('background-image', 'url(../../public/img/zbxm_num0' + (index + 1) + '.png)');
	});
}

/*评选流程*/
function process_list(data) {
	var num = data.length <= 4 ? data.length : 4;
	var html = ''
	for (var i = 0; i < num; i++) {
		var startTime = data[i].startTime.substr(5, 2) + '/' + data[i].startTime.substr(8, 2);
		var endTime = data[i].endTime.substr(5, 2) + '/' + data[i].endTime.substr(8, 2);
//		html += '<li class="item">'
//		html += ' <div class="item_con">'
//		html += '  <div class="item_con_num">'
//		html += '   <img src="../../public/img/zbxm_pxlc_' + (i + 1) + '.png" class="bg" />'
//		html += '   <span class="year">2017</span>'
//		html += '  </div>'
//		html += '  <p class="process_text">' + data[i].content + '</p>'
//		html += '  <p class="process_date">' + startTime + ' - ' + endTime + '</p>'
//		html += ' </div>'
//		html += '</li>'
        html +='<li class="item">'
        html +=    '<div class="item_con">'
        html +=        '<span class="step_date"><em class="date_year">2016</em><i class="month">1/18-3/23</i></span>'
        html +=       '<div class="dot_line_up dot_line_bg"></div>'
        html +=        '<h1 class="process_title">征集期</h1>'
        html +=        '<div class="dot_line_down dot_line_bg"></div>'
        html +=        '<p class="process_text">' + data[i].content + '</p>'
        html +=    '</div>'
        html +='</li>'
	};
	$('.process_list').append(html);
//	$('.process_list .item:last').css('margin-right', '0');
//	$('.process_list .process_text').each(function(index, el) {
//		var this_h = $(el).height();
//		var this_line = this_h / 21;
//		if (this_line > 1) {
//			$(el).css('text-align', 'left')
//		} else {
//			$(el).css('text-align', 'center');
//		}
//	});
}

///*参赛者作品*/
sendAjax({
	'activityId': activityId
}); //初始化列表

function sendAjax(data) {
	$('.work_list').html('');
	obj.ajax('/project/enroll/projectList', data, function(data) {
//		console.log(data);
		var html = ''
		var projectList = data.dataList;
		var num = projectList.length <= 10 ? projectList.length : 10;
		if (num == 0) {
			$('.work_list').html('暂无参赛者');
			return;
		}
		for (var i = 0; i < num; i++) {
			html += '<a href="projectShow.html?activityId=' + projectList[i].id + '" target="_blank">'
			html += '<li class="item fl">'
			html += ' <div class="item_con">'
			html += '  <div class="work_pic_box" style="background-size: cover;">'
			if (projectList[i].imageUrl == '') {
				html += '   <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" alt="" />'
			} else {
				html += '   <img src="' + projectList[i].imageUrl + '" alt="" />'
			}
			html += '  </div>'
			html += '  <div class="work_vote">'
			html += '   <p class="project_name txt">名称：' + projectList[i].projectName + '</p>'
			html += '   <p class="applicant txt">申报人：' + projectList[i].reporterName + '</p>'
			html += '   <button class="vote_btn">' + projectList[i].likesNum + '点赞</button>'
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
			html += '</a>'
		};
		$('#team_list').html(html);
	}, function(data) {});	
}



 /*******      修改大的banner图        ******/
	obj.ajax('/project/activityDetailBaseInfo',{'activityId':activityId},function(data){
	 	console.log(data)
	    //大的banner图 
	    $('#banner_center').css("background-image","url("+data.dataList.bannerUrl+")"); 
	   
	},function(data){});



//
///***列表筛选**/
//function sreachList() {
//	var districtId = getDistrictId();
//	var data = {
//		'districtId': districtId, //所属地区ID
//		'keyWord': $('#key').val(), //标题关键定
//		'activityId': activityId, //所属活动ID
//		'creatorType': $('.select_title.cur').html(), //参赛者分类
//		'pageIndex': 1, //当前页码
//		'pageSize': 10 //每页记录数
//	};
////	console.log(data)
//	sendAjax(data);
//}
//
///*** 关键字查询 **/
//$('.search_btn').click(function() {
//	sreachList()
//})
//
///******* 动态生成参赛者  ***********/
///*function createReatorType(data) {
//	var html = '';
//	for (var i = 0; i < data.length; i++) {
//		html += '<span class="select_title fl">' + data[i] + '</span>'
//	}
//	$('#oidType2').before(html);
////	参赛者分类的高亮切换
//	$('.participator_work .select_title').click(function(event) {
//		$(this).addClass('cur').siblings('.select_title').removeClass('cur');
//		$('.participator_work .work_list').eq($(this).index()).show().siblings('.work_list').hide();
//		sreachList();
//	});
//}*/
//
///*讨论区*/
//function discuss_list() {
//	obj.ajax('/pc/service/getReplysByQuestionId', {
//		'quId': questionId,
//		'page': replyPageNo,
//		'rows': 8
//	}, function(data) {
////		console.log(data);
//		createEle1(data.rows);
//		if ($('.discuss_list .item').length >= data.total) {
//			$('.load_more').html('全部加载完啦')
//		} else {
//			$('.load_more').html('加载更多')
//
//		}
//	}, function(data) {});
//}
//
//function createEle1(data) {
//	// 	        $('.discuss_prize .discuss_list').html('');
//	var html = ''
//	for (var i = 0; i < data.length; i++) {
//		html += '<li class="item fl">'
//		html += ' <a href="javascript:;" class="disB" style="height:100%;">'
//		html += '  <div class="item_con">'
//		html += '   <div class="user_info clearfix">'
//		html += '    <span class="fl user_pic_box">'
//		if (!data[i].askUrl) {
//			html += ' <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" class="user_pic" />'
//		} else {
//			html += '     <img src="' + data[i].askUrl + '" class="user_pic" />'
//		}
//		html += '    </span>'
//		html += '    <div class="user_info_txt">'
//		html += '     <p class="user_name">' + data[i].creatorName + '</p>'
//		html += '     <p class="time">' + data[i].replyTime + '</p>'
//		html += '    </div>'
//		html += '   </div>'
//		html += '   <p class="discuss_main_txt">' + data[i].replyContent.replace("<p>", "").replace("</p>", "") + '</p>'
//		html += '  </div>'
//		html += ' </a>'
//		html += ' <em class="discuss_symbol"></em>'
//		html += '</li>'
//	};
//	$('.discuss_prize .discuss_list').append(html);
//	$('.discuss_prize .discuss_list .item:odd').css('margin-right', '0');
//}
//
///*** 评论加载更多 ****/
//$('.load_more').click(function() {
//	if (questionId != "") {
//		replyPageNo++;
//		discuss_list();
//	}
//})
//
///**奖品设置**/
//function prizeSet(data) {
//	var html = ''
//	for (var i = 0; i < data.length; i++) {
//		html += '<li class="item" style="float:left; margin-right:20px">'
//		html += '	<div class="item_con">'
//		html += '<div class="prize_bg"></div>'
//		html += '<h1 class="prize_rank">' + data[i].ranking + '</h1>'
//		html += '<p class="prize_show">' + data[i].prizes + '</p>'
//		html += '<span class="disB prize_man_num">' + data[i].count + '名</span>'
//		html += '	</div>'
//		html += '</li>'
//	}
//	$('.prize_list').append(html);
//
//	$('.discuss_prize .content_right .item:even').addClass('fl')
//	$('.discuss_prize .content_right .item:odd').addClass('fr')
//	$('.discuss_prize .prize_bg').each(function(index, el) {
//		$(el).css('background-image', 'url(../../public/img/prize_' + (index + 1) + '.png)');
//	});
//	var prize_color = ['#da4453', '#ff8814', '#f7d653', '#1bce8d']
//	$('.prize_man_num').each(function(index, el) {
//		$(el).css('background-color', prize_color[index]);
//	});
//}
//
////项目进行阶段（1未开始、2报名中、3投票中、4活动结束、5报名投票同时进行中，2/3/4为活动进行中）
//function enrollStage(stage) {
//	if (stage == 2 || stage == 5) {
//		$('#sign_up').attr('href', 'openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
//	} else if (stage < 2) {
//		alert('报名还未开始哦！');
//	} else {
//		alert('报名已经结束咯！');
//	}
//}
//
///*右侧悬浮导航*/
//$('.body_right_nav .item_con').mouseenter(function(event) {
//	$(this).stop().animate({
//		'width': '100px'
//	}, 100);
//}).mouseleave(function(event) {
//	if (!$(this).hasClass('cur')) {
//		$(this).stop().animate({
//			'width': '80px'
//		}, 100)
//	}
//}).click(function(event) {
//	$(this).addClass('cur').parent().siblings().children().removeClass('cur').animate({
//		'width': '80px'
//	}, 100);
//
//});
//
///*** 举报 ***/
//function report() {
//
//	alert(2)
//
//}