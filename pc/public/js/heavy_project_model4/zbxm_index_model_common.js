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
		$('#sign_up').attr('href', '../heavy_project/openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
		$('#project_main').attr('href','zbxm_index_model_4.html?activityId='+activityId+'');   //首页
	    $('#project_detail').attr('href','zbxm_index_model4_detail.html?activityId='+activityId+'');   //项目详情
		$('#team').attr('href','zbxm_index_model4_team.html?activityId='+activityId+'');   //参赛团队
		$('.logo a').attr('href', '../heavy_project/heavy_main_list.html'); //头部logo
        
		$('#activit_jiesao_more').attr('href', 'zbxm_index_model4_detail.html?activityId=' + activityId + ''); //参赛团队-more
		$('#sign_up1').attr('href', 'zbxm_index_model4_detail.html?activityId=' + activityId + ''); //项目动态-more
		$('#tack_activit_mroe').attr('href', 'zbxm_index_model4_team.html?activityId=' + activityId + ''); //参赛者作品-more
		$('#tack_activit_mroe').attr('href', 'zbxm_index_model4_team.html?activityId=' + activityId + ''); //报名
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
		'activityId': activityId 
	}, function(data) {
		console.log(data)
		var html = '';
		var detailList = data.dataList;
		var num = detailList.length <= 6 ? detailList.length : 6;
		console.log(detailList)
		for (var i = 0; i < num; i++) {
			if (i == 0) {
				var imgHtml = '';
				imgHtml += '<li>'
				if (detailList[i].imageUrl == "") {
					imgHtml += ' <a href="javascript:;"><img src="../../public/img/head_img/1 (39).jpg" class="picture" /></a>'
				} else {
					imgHtml += ' <a href="javascript:;"><img src="' + detailList[i].imageUrl + '" class="picture" /></a>'
				}
				imgHtml += '</li>'
				$('.picture_list').html(imgHtml);
				$('.under_title_txt').html(detailList[i].title);
				$('.under_title_txt').attr('href', 'heavy_project_model1_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + ''); //参赛团队-more
			} else {
				html += '<li class="news_item">'
				html += '<a href="heavy_project_model1_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + '">' + detailList[i].title + '</a>'
				html += '<li>'
			}

		}
		$('.dynamic_box .new_list').html(html);
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
		//more-项目详情
//		$('#project_detail,#more_heavy_remark,#more_heavy_process,#more_heavy_prize,#more_heavy_requirement').attr('href', 'heavy_project_model1_detail.html?activityId=' + activityId + '&activityDetailId=' + currActivity.newsUrl1 + ''); //项目详情

		requirement_list(currActivity.requirementsList) //报名要求
		process_list(currActivity.processList); //评选流程
	    createReatorType(currActivity.applicantTypes); //参赛者分类
		prizeSet(currActivity.prizeList); //奖项
		//		enrollStage(currActivity.stage);//报名状态
		$('#banner_center').css("background-image", "url(" + currActivity.bannerUrl + ")"); //banner图
		$('title').html(data.dataList.title); //网页标题
		$('#div_activity_remark p').html(currActivity.remark); //活动介绍

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
			$('.sponsor_unit_list').parent().parent().hide();
		}
		if (currActivity.assistUnit) {
			$('.assist_unit_list').html(currActivity.assistUnit); //协办单位
		} else {
			$('.assist_unit_list').parent().parent().hide();
		}
		if (currActivity.undertakeUnit) {
			$('.undertake_unit_list').html(currActivity.undertakeUnit); //承办单位
		} else {
			$('.undertake_unit_list').parent().parent().hide();
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
		console.log(1);
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
        html +=    '<a href="javascript:;" class="item_con">' + data[i].content + '</a>'
        html +='</li>'

	};

	$('#requires').html(html);
	$('#requires li').css('list-style','disc')
//	$('.requirement_box .item:last').css('margin-right', '0');
//	$('.requirement_box .item_con_num').each(function(index, el) {
//		$(el).css('background-image', 'url(../../public/img/zbxm_num0' + (index + 1) + '.png)');
//	});
}

/*评选流程*/
function process_list(data) {
	
	var num = data.length <= 5 ? data.length : 5;
	var html = ''
    for (var i = 0; i < num; i++) {
        html+='<li class="item">'
        html+=' <div class="item_con">'
        html+='  <div class="item_con_num">'
        html+='   <img src="../../public/img/zbxm_pxlc_' + (i + 1) + '.png" class="bg" />'
        html+='  </div>'
        html+='  <p class="process_text">' + data[i].content + '</p>'
        html+='  <p class="process_date">'
        html+='    <span class="fl">10/20 - 10/30</span><span class="fr year">2018</span>'
        html+='  </p>'
        html+=' </div>'
        html+='</li>'
    };
    $('.content_b_list').append(html);
    $('.selection_process .item:last').css('margin-right', '0');


}

/*参赛者作品*/

function sendAjax(data) {
	
	$('.work_list').html('');
	obj.ajax('/project/enroll/projectList', data, function(data) { ///project/enroll/projectList
		console.log(data);
		var html = ''
		var projectList = data.dataList;
		var num = projectList.length <= 10 ? projectList.length : 10;
		if (num == 0) {
			$('.work_list').html('暂无参赛者');
			return;
		}
		for (var i = 0; i < num; i++) {
			html += '<a href="../heavy_project/projectShow.html?activityId=' + projectList[i].id + '" target="_blank">'
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
		$('.work_list').html(html);
	}, function(data) {});
}

sendAjax({
	'activityId': activityId
});

/***列表筛选**/
function sreachList() {
	var districtId = getDistrictId();
	var data = {
		'districtId': districtId, //所属地区ID
		'keyWord': $('#key').val(), //标题关键定
		'activityId': activityId, //所属活动ID
		'creatorType': $('.select_title.cur').html(), //参赛者分类
		'pageIndex': 1, //当前页码
		'pageSize': 10 //每页记录数
	};
	console.log(data)
	sendAjax(data);
}


/******* 动态生成参赛者  ***********/
function createReatorType(data) {
	var html = '';
	for (var i = 0; i < data.length; i++) {
		html += '<span class="select_title fl">' + data[i] + '</span>'
		if(i==0){
			
		}
	}
	$('.select_work_l').html(html);
	$('.select_title').first().addClass('cur')
	
//	参赛者分类的高亮切换
	$('.participator_work .select_title').click(function(event) {
		$(this).addClass('cur').siblings('.select_title').removeClass('cur');
		$('.participator_work .work_list').eq($(this).index()).show().siblings('.work_list').hide();
		sreachList();
	});
}

/*讨论区*/
function discuss_list() {
	obj.ajax('/pc/service/getReplysByQuestionId', {
		'quId': questionId,
		'page': replyPageNo,
		'rows': 8
	}, function(data) {
		console.log(data);
		createEle1(data.rows);
		if ($('.discuss_list .item').length >= data.total) {
			$('.load_more').html('全部加载完啦')
		} else {
			$('.load_more').html('加载更多')

		}
	}, function(data) {});
}

function createEle1(data) {
	// 	        $('.discuss_prize .discuss_list').html('');
	var html = ''
	for (var i = 0; i < data.length; i++) {
		html += '<li class="item fl">'
		html += ' <a href="javascript:;" class="disB" style="height:100%;">'
		html += '  <div class="item_con">'
		html += '   <div class="user_info clearfix">'
		html += '    <span class="fl user_pic_box">'
		if (!data[i].askUrl) {
			html += ' <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" class="user_pic" />'
		} else {
			html += '     <img src="' + data[i].askUrl + '" class="user_pic" />'
		}
		html += '    </span>'
		html += '    <div class="user_info_txt">'
		html += '     <p class="user_name">' + data[i].creatorName + '</p>'
		html += '     <p class="time">' + data[i].replyTime + '</p>'
		html += '    </div>'
		html += '   </div>'
		html += '   <p class="discuss_main_txt">' + data[i].replyContent.replace("<p>", "").replace("</p>", "") + '</p>'
		html += '  </div>'
		html += ' </a>'
		html += ' <em class="discuss_symbol"></em>'
		html += '</li>'
	};
	$('.discuss_prize .discuss_list').append(html);
	$('.discuss_prize .discuss_list .item:odd').css('margin-right', '0');
}

/*** 评论加载更多 ****/
$('.load_more').click(function() {
	if (questionId != "") {
		replyPageNo++;
		discuss_list();
	}
})

/**奖品设置**/
function prizeSet(data) {
	var html = ''
	for (var i = 0; i < data.length; i++) {
		html += '<li class="item" style="float:left; margin-right:20px">'
		html += '	<div class="item_con">'
		html += '<div class="prize_bg"></div>'
		html += '<h1 class="prize_rank">' + data[i].ranking + '</h1>'
		html += '<p class="prize_show">' + data[i].prizes + '</p>'
		html += '<span class="disB prize_man_num">' + data[i].count + '名</span>'
		html += '	</div>'
		html += '</li>'
	}
	$('.prize_list').append(html);

	$('.discuss_prize .content_right .item:even').addClass('fl')
	$('.discuss_prize .content_right .item:odd').addClass('fr')
	$('.discuss_prize .prize_bg').each(function(index, el) {
		$(el).css('background-image', 'url(../../public/img/prize_' + (index + 1) + '.png)');
	});
	var prize_color = ['#da4453', '#ff8814', '#f7d653', '#1bce8d']
	$('.prize_man_num').each(function(index, el) {
		$(el).css('background-color', prize_color[index]);
	});
}

//项目进行阶段（1未开始、2报名中、3投票中、4活动结束、5报名投票同时进行中，2/3/4为活动进行中）
function enrollStage(stage) {
	if (stage == 2 || stage == 5) {
		$('#sign_up').attr('href', 'openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
	} else if (stage < 2) {
		alert('报名还未开始哦！');
	} else {
		alert('报名已经结束咯！');
	}
}

/*右侧悬浮导航*/
$('.body_right_nav .item_con').mouseenter(function(event) {
	$(this).stop().animate({
		'width': '100px'
	}, 100);
}).mouseleave(function(event) {
	if (!$(this).hasClass('cur')) {
		$(this).stop().animate({
			'width': '80px'
		}, 100)
	}
}).click(function(event) {
	$(this).addClass('cur').parent().siblings().children().removeClass('cur').animate({
		'width': '80px'
	}, 100);

});

/*** 举报 ***/
function report() {

	

}