/*******  获取列表传过来的id值，查询信息   *******/
var activityId = "";
 var specialAid = 268;//不显示点赞按钮
/*初始化导航栏*/
function getRequest() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
		//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		activityId = strs[1];
		$('#hidden_activity_id').val(activityId);
		//$('#sign_up').attr('href','../heavy_project/openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
	    $('#project_main').attr('href','zbxm_index_model_2.html?activityId='+activityId+'');   //首页
		$('#project_dynamic').attr('href', 'zbxm_index_model2_trends.html?activityId=' + activityId + ''); //项目动态
		$('#team').attr('href', 'zbxm_index_model2_team.html?activityId=' + activityId + ''); //参赛团队
		$('.logo a').attr('href','../heavy_project/heavy_main_list.html');   //头部logo

		$('#more_heavy_project').attr('href', 'zbxm_index_model2_team.html?activityId=' + activityId + ''); //参赛团队-more
		$('#more_detail_list').attr('href', 'zbxm_index_model2_trends.html?activityId=' + activityId + ''); //项目动态-more
		
		//隐藏我要报名按钮和参赛者列表
		if(activityId == 373){
			$('.enroll_item,.participator_work').hide();
		}
		//隐藏报名要求
		if (activityId == 410) {
			$('.requirement_box').html("");
		}
	}
}
getRequest();

$('.header_nav .nav_li').click(function(event) {
	$(this).addClass('cur').siblings().removeClass('cur');
});

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

/**公共ajax请求**/
function ajaxCom() {
	obj.ajax('/project/activityDetail', {
		'activityId': activityId
	}, function(data) {
		console.log(data);
		var currActivity = data.dataList;
		vote_end_time = currActivity.endTime  ;//报名结束时间
	    $('title').html(currActivity.title);//网页标题
		//more转至项目详情页
		$('#project_detail,#more_heavy_remark,#more_heavy_process,#more_heavy_prize,#more_heavy_requirement').attr('href', 'zbxm_index_model2_detail.html?activityId=' + activityId + '&activityDetailId=' + currActivity.newsUrl1 + ''); //项目详情

		requirement_list(currActivity.requirementsList) //报名要求
		$('#banner_center').css("background-image", "url(" + currActivity.bannerUrl + ")");//banner图
		$('#div_activity_remark').children().html(currActivity.remark); //活动介绍

		var mobile = currActivity.mobile;
		if (mobile.length < 11) {
			mobile = mobile.substr(0, 3) + " " + mobile.substr(3, 4) + " " + mobile.substr(7, 4)
		}
		$('.phone_number').html(mobile); //联系电话
		
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
		
		//自定义标签
		var labelName = currActivity.activityLabelName;
		$('#project_detail').html(labelName.news1);//项目详情
		$('#project_dynamic').html(labelName.newsList1);//项目动态
		$('#team').html(labelName.cpxm);//参赛团队
		$('#more_detail_list').prev().html(labelName.newsList1);//项目动态
		$('#more_heavy_remark').prev().html(labelName.hdjs);//活动介绍
		$('#more_heavy_requirement').prev().html(labelName.bmyq);//报名要求
		$('#more_heavy_project').prev().html(labelName.cpxm);//参赛者作品
		$('#more_heavy_prize').prev().html(labelName.jlsz);//奖项设置
		$('.sponsor_unit_list').prev().html(labelName.zbdw);//主办单位
		$('.assist_unit_list').prev().html(labelName.xbdw);//协办单位
		$('.undertake_unit_list').prev().html(labelName.cbdw);//承办单位
		
	}, function(data) {
		console.log(1);
	});
}
ajaxCom();
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
					imgHtml += ' <a href="javascript:;" class="under_picture"><img src="' + detailList[i].imageUrl + '" class="picture" /></a>'
				}
				imgHtml += '</li>'
				$('.picture_list').html(imgHtml);
				$('.under_title_txt').html(detailList[i].title);
				$('.under_title_txt,.under_picture').attr('href', 'zbxm_index_model2_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + ''); //参赛团队-more
			} else {
				html += '<li class="news_item">'
				html += '<a href="zbxm_index_model2_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + '">' + detailList[i].title + '</a>'
				html += '<li>'
			}

		}
		$('.dynamic_box .new_list').html(html);
	}, function(data) {});
}
createProjectList();

/*报名要求*/
function requirement_list(data) {
	var num = data.length <= 5 ? data.length : 5;
	var html = ''
	for (var i = 0; i < num; i++) {
		html += '<li class="item">'
		html += ' <div class="item_con">'
		html += '  <div class="item_con_num"></div>'
		html += '  <p class="item_con_txt">' + data[i].content + '</p>'
		html += ' </div>'
		html += '</li>'
	};

	$('.requirement_list .list').html(html);
	$('.requirement_box .item:last').css('margin-right', '0');
	$('.requirement_box .item_con_num').each(function(index, el) {
		$(el).css('background-image', 'url(../../public/img/zbxm_num0' + (index + 1) + '.png)');
	});
}

/*参赛者作品*/
sendAjax({
	'activityId': activityId
});

//初始化参赛者列表
function sendAjax(data) {
	$('.work_list').html('');
	obj.ajax('/project/enroll/projectList', data, function(data) {
		console.log(data);
		var html = ''
		var projectList = data.dataList;
		var num = projectList.length <= 10 ? projectList.length : 10;
		
		if (num == 0) {
			$('.work_list').html('暂无参赛者');
			return;
		}
		for (var i = 0; i < num; i++) {
			html += '<a href="../heavy_project/projectShow.html?projectId=' + projectList[i].id + '&activityId=' + activityId + '" target="_blank">'
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
		    if(activityId != specialAid){
				html += '   <button class="vote_btn">' + projectList[i].likesNum + '人点赞</button>'
		    }
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
			html += '</a>'
		};
		$('.work_list').html(html);
	}, function(data) {});
}

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

/*** 关键字查询 **/
$('.search_btn').click(function() {
	sreachList()
})

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

$('#sign_up').click(function(){
	
	var bigTime = new Date(vote_end_time).getTime();
	var smaTime = new Date().getTime();
	
	if(smaTime<bigTime){
		window.location.href = '../heavy_project/openEnroll.html?activityId='+activityId; //进到重磅项目的时候马上修改我要报名的路径
	
	}else{
		$.alert('你来晚咯，报名已经结束了！');
	}
	
})
