/*******  获取列表传过来的id值，查询信息   *******/
var activityId = "";
var questionId = "";
var replyPageNo = 1;

function getRequest() {
  var url = location.search; //获取url中"?"符后的字串
  if (url.indexOf("?") != -1) { //判断是否有参数
    activityId = Utils.getQueryString("activityId");

    $('#hidden_activity_id').val(activityId);
    //$('#sign_up').attr('href', 'openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
    $('#project_main').attr('href', 'heavy_project_model1_index.html?activityId=' + activityId + ''); //首页
    $('#team').attr('href', 'heavy_project_model1_team.html?activityId=' + activityId + ''); //参赛团队
    $('#project_dynamic').attr('href', 'heavy_project_model1_trends_dynamic.html?activityId=' + activityId + ''); //项目动态
    $('.logo a').attr('href', 'heavy_main_list.html'); //头部logo

    $('#more_heavy_project').attr('href', 'heavy_project_model1_team.html?activityId=' + activityId + ''); //参赛团队-more
    $('#more_detail_list').attr('href', 'heavy_project_model1_trends_dynamic.html?activityId=' + activityId + ''); //项目动态-more

    if(activityId == 373 || activityId == 505){
      //隐藏我要报名按钮和参赛者列表
      $('.enroll_item,.participator_work').hide();
      //自定义标签（暂做373特殊处理）
      $('.requirement_list').parent().find('h1').html('服务对象')
      $('.process_list').parent().find('h1').html('活动内容');
      $('.prize_box').prev().hide();//隐藏奖项设置
    }
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

/**公共ajax请求**/
function ajaxCom() {
  obj.ajax('/project/activityDetail', {
    'activityId': activityId
  }, function(data) {
    console.log(data);
    if(data.status == 'ERROR'){
      alert(data.msg);//ID有误
      return;
    }
    var currActivity = data.dataList;

    //------------------------------微信分享begin
    var shareTitle = '我正在参加'+currActivity.title+',来为我加油吧！';
    var shareContent = '快来为我点赞吧！';
    var shareImg = currActivity.bannerUrl;
    if(currActivity.id == 268){
      shareContent = '网络队日活动进行中……';
    }
    if(currActivity.id == 373 || currActivity.id == 505){
      shareTitle = '快来一起参加'+currActivity.title+'吧！';
      shareContent = currActivity.remark;
    }
    shareHeavyProject(currActivity.id, shareTitle, shareContent, shareImg);
    //------------------------------微信分享begin


    vote_end_time = currActivity.endTime  ;//报名结束时间
    //more-项目详情
    $('#project_detail,#more_heavy_remark,#more_heavy_process,#more_heavy_prize,#more_heavy_requirement').attr('href', 'heavy_project_model1_detail.html?activityId=' + activityId + '&activityDetailId=' + currActivity.newsUrl1 + ''); //项目详情

    requirement_list(currActivity.requirementsList) //报名要求
    process_list(currActivity.processList); //评选流程
    //		createReatorType(currActivity.applicantTypes); //参赛者分类
    prizeSet(currActivity.prizeList); //奖项
    //		enrollStage(currActivity.stage);//报名状态
    $('#banner_center').css("background-image", "url(" + Utils.compressByAli(currActivity.bannerUrl, '?x-oss-process=image/resize,h_386') + ")"); //banner图
    $('title').html(data.dataList.title); //网页标题
    $('#div_activity_remark').children().html(currActivity.remark); //活动介绍

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

    //cszfl:"参赛者分类"//fj:"附件"//pxgz:"评选规则"//xmyq:"项目要求"
    //自定义标签
    var labelName = currActivity.activityLabelName;
    $('#project_detail').html(labelName.news1);//项目详情
    $('#project_dynamic').html(labelName.newsList1);//项目动态
    $('#team').html(labelName.cpxm);//参赛团队
    $('#more_detail_list').prev().html(labelName.newsList1);//项目动态
    $('#more_heavy_remark').prev().html(labelName.hdjs);//活动介绍
    $('#more_heavy_requirement').prev().html(labelName.bmyq);//报名要求
    $('#more_heavy_process').prev().html(labelName.hdlc);//活动流程
    $('#more_heavy_project').prev().html(labelName.cpxm);//参赛者作品
    $('#more_heavy_prize').prev().html(labelName.jlsz);//奖项设置
    $('.sponsor_unit_list').prev().html(labelName.zbdw);//主办单位
    $('.assist_unit_list').prev().html(labelName.xbdw);//协办单位
    $('.undertake_unit_list').prev().html(labelName.cbdw);//承办单位
//		$('.DT_detail').html('首页>'+labelName.newsList1);//项目动态列表
//		$('#dynamicOul').parent().prev().html(labelName.newsList1);//项目动态
  }, function(data) {
    console.log(1);
  });
}
ajaxCom();

/*function setLabelName(){
  obj.ajax('/project/getActivityLabelName',{'activityId':activityId},function(data){
       //自定义标签
    var labelName = data.dataList
    $('#project_detail').html(labelName.news1);//项目详情
    $('#project_dynamic').html(labelName.newsList1);//项目动态
    $('#team').html(labelName.cpxm);//参赛团队
    $('.DT_detail').html('首页>'+labelName.newsList1);
     },function(data){});
}
setLabelName();*/

/*首页-项目动态列表*/
function createProjectList() {
  obj.ajax('/project/getActivityDetailList', {
    'activityId': activityId
  }, function(data) {
    console.log(data)
    var html = '';
    var detailList = data.dataList;

    var num = detailList.length <= 6 ? detailList.length : 6;
    console.log(detailList);
    for (var i = 0; i < num; i++) {
      if (i == 0) {
        var imgHtml = '';
        imgHtml += '<li>';
        detailList[i].imageUrl = 'https://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20190307/20190307103508_426微信图片_20190307103007.jpg';
        if (detailList[i].imageUrl == "") {
          imgHtml += ' <a href="javascript:;"><img src="../../public/img/head_img/1 (39).jpg" class="picture" /></a>'
        } else {
          imgHtml += ' <a href="javascript:;" class="under_picture"><img src="' + Utils.compressByAli(detailList[i].imageUrl, '?x-oss-process=image/resize,m_mfit,h_200,w_280') + '" class="picture" /></a>'
        }
        imgHtml += '</li>'
        $('.picture_list').html(imgHtml);
        $('.under_title_txt').html(detailList[i].title);
        $('.under_title_txt,.under_picture').attr('href', 'heavy_project_model1_trends_detail.html?activityId=' + activityId + '&activityDetailId=' + detailList[i].id + ''); //参赛团队-more
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

/*报名要求*/ //project/enroll/projectList
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

/*评选流程*/
function process_list(data) {
  var num = data.length <= 5 ? data.length : 5;
  var html = ''
  for (var i = 0; i < num; i++) {
    html += '<li class="item">'
    html += ' <div class="item_con">'
    html += '  <div class="item_con_num">'
    html += '   <img src="../../public/img/zbxm_pxlc_' + (i + 1) + '.png" class="bg" />'
    html += '   <span class="year">2018</span>'
    html += '  </div>'
    html += '  <p class="process_text" style="    display: -webkit-box;width:178px;height:126px;  overflow: hidden; text-overflow: ellipsis;     -webkit-line-clamp: 10;   -webkit-box-orient: vertical;      ">' + data[i].content + '</p>'
    if(activityId != 373 && activityId != 505){
      var startTime = data[i].startTime.substr(5, 2) + '/' + data[i].startTime.substr(8, 2);
      var endTime = data[i].endTime.substr(5, 2) + '/' + data[i].endTime.substr(8, 2);
      html += '  <p class="process_date" style="bottom:7px;">' + startTime + ' - ' + endTime + '</p>'
    }
    html += ' </div>'
    html += '</li>'
  };
  $('.process_list .list').append(html);
  $('.process_list .item:last').css('margin-right', '0');
  $('.process_list .process_text').each(function(index, el) {
    var this_h = $(el).height();
    var this_line = this_h / 21;
    if (this_line > 1) {
      $(el).css('text-align', 'left')
    } else {
      $(el).css('text-align', 'center');
    }
  });
}

/*参赛者作品*/
sendAjax({
  'activityId': activityId
}); //初始化列表

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

/******* 动态生成参赛者  ***********/
/*function createReatorType(data) {
	var html = '';
	for (var i = 0; i < data.length; i++) {
		html += '<span class="select_title fl">' + data[i] + '</span>'
	}
	$('#oidType2').before(html);
//	参赛者分类的高亮切换
	$('.participator_work .select_title').click(function(event) {
		$(this).addClass('cur').siblings('.select_title').removeClass('cur');
		$('.participator_work .work_list').eq($(this).index()).show().siblings('.work_list').hide();
		sreachList();
	});
}*/

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



//我要报名-  校验时间是否过期

$('#sign_up').click(function(){

  var bigTime = new Date(vote_end_time).getTime();
  var smaTime = new Date().getTime();

  if(smaTime<bigTime){
    window.location.href = 'openEnroll.html?activityId='+activityId; //进到重磅项目的时候马上修改我要报名的路径
  }else{
    $.alert('你来晚咯，报名已经结束了！');
  }

})

/**
 * 重磅项目分享转发预加载
 * @param shareActivityId 重磅项目ID
 * @param shareTitle 分享标题
 * @param shareSummary 分享描述
 * @param shareImg 分享图标
 * @returns
 */
function shareHeavyProject(shareActivityId, shareTitle, shareSummary, shareImg) {
//	var shareUrl = Qnzs.domain + '/pc/view/heavy_project/heavy_project_model1_index.html?activityId=' + shareActivityId;
  var shareUrl = window.location.href;
  // console窗口打印一下入参
  console.log("link=" + shareUrl + ", title=" + shareTitle + ", imgUrl=" + shareImg + ", desc=" + shareSummary);
  // 调用ajax获取后台权限验证配置
  $.ajax({
    url: Qnzs.path + '/wechat/share',
    type: 'POST',
    data: {
      // 分享链接
      "link": shareUrl,
      // 分享标题
      "title": shareTitle,
      // 分享描述
      "desc": shareSummary,
      // 分享图标
      "imgUrl": shareImg
    },
    async: true,
    cache: false,
    dataType: 'json',
    success: function(data) {
      console.log('wechatShare data', data);
      // 注意：所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里设置“JS接口安全域名”。
      wx.config({
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: false,
        // 公众号的唯一标识
        appId: data.dataList.appId,
        // 生成签名的时间戳
        timestamp: data.dataList.timestamp,
        // 生成签名的随机串
        nonceStr: data.dataList.nonceStr,
        // 签名
        signature: data.dataList.signature,
        // 包括分享到朋友圈、分享给朋友、分享到QQ、分享到腾讯微博、分享到QQ空间
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      });

      wx.ready(function() {
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          // 分享标题
          title: data.dataList.title,
          // 分享链接
          link: data.dataList.link,
          // 分享图标
          imgUrl: data.dataList.imgUrl,
          // 用户确认分享后执行的回调函数
          success: function() {
            // alert("分享到朋友圈成功");
          },
          // 用户取消分享后执行的回调函数
          cancel: function() {
            // alert("分享到朋友圈取消");
          }
        });
        // 分享给朋友
        wx.onMenuShareAppMessage({
          // 分享标题
          title: data.dataList.title,
          // 分享描述
          desc: data.dataList.desc,
          // 分享链接
          link: data.dataList.link,
          // 分享图标
          imgUrl: data.dataList.imgUrl,
          // 分享类型,music、video或link，不填默认为link
          type: data.dataList.type,
          // 如果type是music或video，则要提供数据链接，默认为空
          dataUrl: data.dataList.dataUrl,
          // 用户确认分享后执行的回调函数
          success: function() {
            // alert("分享给朋友成功");
          },
          // 用户取消分享后执行的回调函数
          cancel: function() {
            // alert("分享给朋友取消");
          }
        });
        // 分享到QQ(这里需要注意的是:如果用户取消分享,执行的仍然是确认分享后的回调函数)
        wx.onMenuShareQQ({
          // 分享标题
          title: data.dataList.title,
          // 分享描述
          desc: data.dataList.desc,
          // 分享链接
          link: data.dataList.link,
          // 分享图标
          imgUrl: data.dataList.imgUrl,
          // 用户确认分享后执行的回调函数
          success: function() {
            // alert("分享到QQ成功");
          },
          // 用户取消分享后执行的回调函数
          cancel: function() {
            // alert("分享到QQ取消");
          }
        });
        // 分享到腾讯微博(未在微信中发现可以分享到腾讯微博)
        wx.onMenuShareWeibo({
          // 分享标题
          title: data.dataList.title,
          // 分享描述
          desc: data.dataList.desc,
          // 分享链接
          link: data.dataList.link,
          // 分享图标
          imgUrl: data.dataList.imgUrl,
          // 用户确认分享后执行的回调函数
          success: function() {
            // alert("分享到腾讯微博成功");
          },
          // 用户取消分享后执行的回调函数
          cancel: function() {
            // alert("分享到腾讯微博取消");
          }
        });
        // 分享到QQ空间(这里需要注意的是:如果用户取消分享,执行的仍然是确认分享后的回调函数)
        wx.onMenuShareQZone({
          // 分享标题
          title: data.dataList.title,
          // 分享描述
          desc: data.dataList.desc,
          // 分享链接
          link: data.dataList.link,
          // 分享图标
          imgUrl: data.dataList.imgUrl,
          // 用户确认分享后执行的回调函数
          success: function() {
            // alert("分享到QQ空间成功");
          },
          // 用户取消分享后执行的回调函数
          cancel: function() {
            // alert("分享到QQ空间取消");
          }
        });
        wx.error(function(res) {
          alert(res.errMsg);
        });
      });
    },
    error: function() {
      alert('ajax request failed!!!');
      return;
    }
  });

}