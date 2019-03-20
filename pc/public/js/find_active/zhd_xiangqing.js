//Qnzs.path = Qnzs.env.dev_wyh;
//Qnzs.path = Qnzs.env.dev2;

var activityId = "";
var orgId = "";
var currentAccount = "";
var ActivityAccList = {};

/*报名人员*/
ActivityAccList.getDAccList = function(data) {
  return Qnzs.ApiProxy('/activity/enroll/enrolledAccList', data, '获取报名人员分页');
};

/*互动评论*/
ActivityAccList.getCommentList = function(data) {
  return Qnzs.ApiProxy('/activity/comment/list', data, '获取互动评论分页');
};

/* 活动照片*/

ActivityAccList.getCommentImg = function(data) {
  return Qnzs.ApiProxy('/activity/commentImg/list', data, '活动照片分页');
};

/*var uploadUrl = '';*/

function getRequestParam() {
  /*var url = location.search; //获取url中"?"符后的字串
  if (url.indexOf("?") != -1) { //判断是否有参数
      var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
      activityId = strs[1]; //第一个参数 （如果有多个参数 还要进行循环的）
  }*/
  activityId = Utils.getQueryString("activityId");
}

getRequestParam();

$(document).ready(function() {

  Qnzs.getSessionAccount({}).then(function(data) {
    console.log('Qnzs.getSessionAccount data', data);
    currentAccount = data.account; // 账户信息
  });


  function star_generate(starStr) {
    var html = '';
    var decimals = undefined; // 小数点位
    var integer = undefined; // 整数位
    if(starStr) {
      starStr = starStr + '';
      var arr = starStr.split('.'); // eg. 123.456 -> [123, 456]
      integer = arr[0];
      if(arr && arr.length > 1) {
        decimals = arr[1].substring(0, 1); // 只取字符串的一位,eg. 4
      }
    }

    for(var j = 0; j < 5; j++) {
      if(j < integer) {
        html += '<li><span></span></li>'; // 亮星
        continue;
      }
      if(decimals > 0) {
        var percentage = decimals * 10;
        html += '<li><span style="width: ' + percentage + '%"></span></li>';
        decimals = undefined; // 只进来一次
        continue;
      }

      html += '<li></li>'; // 灭星
    }

    return html;
  }

  //活动标题内容
  function activetitle() {
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
      url: Qnzs.path + "/activity/offlineActivity/detail?activityId=" + activityId,
      //			url: "//169.168.200.19:8080/qnzs/activity/offlineActivity/detail?activityId=" + activityId,
      dataType: "JSON",
      success: function(data) {
        if(data.status != 'OK') {
          $.alert(data.msg);
          return;
        } else {
          var activity = data.data;
          console.log('activity', activity);
          orgId = activity.createOrgid;
          var enrollAccountsList = activity.enrollAccountsList;
          var commentsList = activity.commentsList;
          var imageUrlsArr = activity.imageUrls.split(';');


          var score_ico = star_generate(activity.markScore.toFixed(1)); // 平均分星星图标
          $('#averageScoreIcon').html('<ol class="clearfix fl" >' + score_ico + '</ol>');

          var remainDayStr = "";
          if(activity.actStatus == 1) {
            remainDayStr = '距离报名开始还剩' + activity.remainDay + '天';
          }
          if(activity.actStatus == 2) {
            remainDayStr = '距离报名结束还剩' + activity.remainDay + '天';
          }
          if(activity.actStatus == 3) {
            remainDayStr = '距离报名结束还剩' + activity.remainDay + '天';
          }
          if(activity.actStatus == 4) {
            remainDayStr = '距离活动结束还剩' + activity.remainDay + '天';
          }
          if(activity.actStatus == 5) {
            remainDayStr = '距离活动结束还剩' + activity.remainDay + '天';
          }
          if(activity.actStatus == 6) {
            remainDayStr = '活动结束了' + activity.remainDay + '天';
          }

          $('.breadcrumbs .content #actType').html(activity.type + '&nbsp;&nbsp;');
          $('.breadcrumbs .content #title').text(activity.title);
          $('.pageState font16 fl').html(activity.imageCount);

          $.each(imageUrlsArr, function(index, item) {
            if(3 != null && item != undefined && item != '') {
              $('#imgList').append('<li><img src="' + Utils.compressByAli(item, '?x-oss-process=image/resize,m_mfit,h_320,w_480') + '"/></li>');
              $('.fangda').on('click', function() {
                var imgDger = $('#imgList li img').attr('src');
                $('.detailImgEnlarge img').attr('src', imgDger)
              })

              $('#imgList').on('click', function() {

                $('.detailImgEnlarge').show();
                var imgDger = $('#imgList li img').attr('src');
                $('.detailImgEnlarge img').attr('src', Utils.updateSuffix(imgDger))

              })
            }
          });
          var imgurl = '//img02.sogoucdn.com/app/a/100520021/eb2afc84d7dc879c9f0c633eced16030';
          var actBtnRequest = activity.actBtnRequest;
          var divHtml = '';
          divHtml += '<div class="box_top">';
          divHtml += '	<h3>' + activity.title + '</h3> ';
          divHtml += '<h3><a href="javascript:" onclick="getcomplain()"><img src="../../public/img/reportBg.png" alt=""/ style="float: left;">举报</a><h3>';
          divHtml += '	<p class="clearfix">';
          if('第二课堂' == activity.type) {
            divHtml += '	<span><strong>类型：</strong>' + activity.type + '&nbsp;&nbsp;' + activity.extracurricularType + '&nbsp;&nbsp;' + activity.extracurricularHour + '学时</span> ';
            //						$('.breadcrumbs .content #actType').html(activity.type + '&nbsp;&nbsp;' +  activity.extracurricularType + '&nbsp;&nbsp;' + activity.extracurricularHour);
          } else {
            divHtml += '	<span><strong>类型：</strong>' + activity.type + '</span> ';
          }
          //					divHtml += '		<span><strong>类型：</strong>' + activity.type + '</span> ';
          divHtml += '		<span>' + remainDayStr + '</span>';
          divHtml += '		<span class="endtxt">' + actStatus[activity.actStatus] + '</span>';
          divHtml += '	</p>';
          divHtml += '</div>';
          divHtml += '<div class="box_bottom"> ';
          divHtml += '	<p><span class="attr">报名时间：</span><span>' + activity.enrollStartTime + '-' + activity.enrollEndTime + '</span></p>';
          divHtml += '	<p><span class="attr">活动时间：</span><span>' + activity.startTime + '-' + activity.endTime + '</span></p>';
          divHtml += '	<p><span class="attr">活动地点：</span><span class="two">' + activity.address + '</span></p>';
          divHtml += '	<p><span class="attr">费<em></em>用：</span><span>' + activity.money + '</span></p> ';
          divHtml += '	<p><span class="attr">活动人员：</span><span>' + activity.activitiesNumber + '人/已有' + activity.enrolledNum + '人报名</span></p>';
          divHtml += '	<p><span class="attr">活动电话：</span><span>' + activity.telephone + '</span></p> ';
          divHtml += '</div>';
          divHtml += '<div class="btn_box clearfix">';
          if(!actBtnRequest) {
            divHtml += '<a href="javascript:activityOperate(' + activity.id + ', ' + activity.actStatus + ', \'' + actBtnRequest + '\', ' + activity.isExtracurricular + ', \'' + activity.enrollEndTime + '\', \'' + activity.actButton + '\');" class="btn1 sign_up" id="btn_baomings" style="background:gray;">' + activity.actButton + '</a>';
          } else {
            divHtml += '<a href="javascript:activityOperate(' + activity.id + ', ' + activity.actStatus + ', \'' + actBtnRequest + '\', ' + activity.isExtracurricular + ', \'' + activity.enrollEndTime + '\', \'' + activity.actButton + '\');" class="btn1 sign_up" id="btn_baomings">' + activity.actButton + '</a>';
          }
          //					divHtml += '		<a class="btn1 sign_up" id="btn_baomings" onclick="activityOperate(' + activity.id + ', "' + activity.actBtnRequest + '")">' + activity.actButton + '</a>';

          if(activity.isAddTemplate && activity.isAddTemplate == true) {
            divHtml += '<a class="btn3" href="javascript:;" onclick="javascript:window.location.href=\'' + Qnzs.path + '/downLoadFile?fileId=' + activity.fileId + '&fileName=' + activity.fileName + '\'">下载附件</a>';
          }

          if(activity.isCollected == true) {
            divHtml += '<a class="btn2" href="javascript:collectOrCancelActivity(' + activity.id + ');">取消收藏</a>';
          } else {
            divHtml += '<a class="btn2" href="javascript:collectOrCancelActivity(' + activity.id + ');">收藏</a>';
          }

          divHtml += '</div>';

          $('.activetitle').append(divHtml);
          $('.scoreBox').append('<span class="fl scoreColor01 font14 fenshu"><em>' + activity.markScore.toFixed(1) + '</em>分</span> <span class="yiping font14 color999 fr">' + activity.markedNum + '人评分</span>');
          $('.activity_l').prepend('<div class="txtbox" id="editor">' + activity.remark + '</div>');
          $('.activity_r').prepend(' <div class="imgbox"><img src="' + activity.orgPhotoUrl + '" alt="" /></div> <p class="name">' + activity.createOrgName +
            '</p><p class="txt"><span class="attr">' + activity.orgMarkScore.toFixed(1) + '分</span><span>' + activity.orgMarkedNum + '人已评</span> </p><div class="box_b clearfix"> <div class="box_l"><p class="attr">' +
            activity.orgPublishActivityCount + '</p> <p class="val">TA的活动</p></div><div class="box_r"><p class="attr">' + activity.orgFollowNum + '</p><p class="val">关注</p></div></div><a href="../../view/organization/organization_detail.html?oid=' + orgId + '" class="jinruzuzhi">进入组织</a>');

          if(activity.orgPhotoUrl == null) {
            $('.activity_r').prepend(' <div class="imgbox"><img src="' + imgurl + '" alt="" /></div> <p class="name">' + activity.createOrgName +
              '</p><p class="txt"><span class="attr">' + activity.orgMarkScore.toFixed(1) + '分</span><span>' + activity.orgMarkedNum + '人已评</span> </p><div class="box_b clearfix"> <div class="box_l"><p class="attr">' +
              activity.orgPublishActivityCount + '</p> <p class="val">TA的活动</p></div><div class="box_r"><p class="attr">' + activity.orgFollowNum + '</p><p class="val">关注</p></div></div><a href="../../view/organization/organization_detail.html?oid=' + orgId + '" class="jinruzuzhi">进入组织</a>');
          }
        }
      }
    });

    /*报名人员*/
    function getAccList(data) {
      if(data != null && data.length > 0) {
        var AccList = '';
        for(var i = 0; i < data.length; i++) {
          var item = data[i];
          AccList += '<li>';
          AccList += '<div class="imgbox">';
          AccList += '<img src="' + Utils.compressByAli(item.photoUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" alt="" />';
          AccList += '</div>';
          AccList += '<p class="name">' + item.realname + '</p>';
          AccList += '</li>';
        }

        return AccList;
      }
    }

    /*分页插件回调函数参数方法*/
    function pageCheck(parentCell, contentCell, maxPage, apiProxy, data, listFun) {
      $(parentCell).pageFun({
        contentCell: contentCell,
        /*包裹数据列表的父容器*/
        maxPage: maxPage,
        /*显示页码框个数*/
        apiProxy: apiProxy,
        /*接口函数*/
        data: data,
        /*接口参数*/
        listFun: listFun,
        /*数据列表函数 -- 返回html字符串*/
        //arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
      });
    }

    var data = { /*接口参数*/
      pageIndex: 1, //当前页
      pageSize: 14, //页码数
      activityId: activityId
    };
    pageCheck('.zhd_list_box', '.Number', 3, ActivityAccList.getDAccList, data, getAccList);
    /*报名人员end*/

    /*活动照片*/
    function getCommentImg(data) {
      if(data != null && data.length > 0) {
        var imghtml = "";
        for(var i = 0; i < data.length; i++) {
          var imagge = data[i];
          imghtml += '<li>';
          imghtml += ' <div class="imgbox">';
          imghtml += '  <img src="' + Utils.compressByAli(imagge.imageUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_116') + '" alt="" class=""/>';
          imghtml += ' </div>';
          imghtml += '</li>';
        };
        $('.img_ul').append(imghtml);

        $(".img_ul  li").on('click', function() {
          $('#imgMagnify').show();
          $(this).addClass('curimg').siblings('li').removeClass('curimg');
          var imgsrc = $(".img_ul .curimg").find('img').attr('src');
          $('#imgMagnify').attr('src', Utils.updateSuffix(imgsrc));
        })

        $('#imgMagnify').click(function() {
          $(this).hide();
        })
      }
    }

    var datalist = { /*接口参数*/
      pageIndex: 1, //当前页
      pageSize: 6, //页码数
      activityId: activityId
    };
    pageCheck('.imgpohot', '.img_ul', 6, ActivityAccList.getCommentImg, datalist, getCommentImg);
    /*活动照片end*/

    //图片回顾
    $.ajax({
      type: "get",
      url: Qnzs.path + "/activity/reviewImg/list?activityId=" + activityId,
      dataType: "JSON",
      success: function(data) {
        if(data.status != 'OK') {
          $.alert(data.msg);
        } else {
          var reviewImgsList = data.dataList;

          if(reviewImgsList != null && reviewImgsList.length > 0) {
            $.each(reviewImgsList, function(index, item) {
              $('.reviewImg').append(' <li style="width: 190px; height: 200px;"><img src="' + Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_170,w_190') + '" alt="" style="width: 190px; height: 170px;"><p><span>' + item.createTime + '</span><span ></span></p></li>');
            });

            $('.reviewImg li').on('click', function() {
              $('#imglocale').show();
              $(this).addClass('currimg').siblings('li').removeClass('currimg');
              var imagsrc = $(".reviewImg .currimg").find('img').attr('src');
              $('#imglocale').attr('src', Utils.updateSuffix(imagsrc));
            });

            $('#imglocale').click(function() {
              $(this).hide();
            })
          }
        }
      }
    });
    //图片回顾end

    //视频回顾
//    $.ajax({
//      type: "get",
//      url: Qnzs.path + "/activity/reviewVideo/list?activityId=" + activityId,
//      dataType: "JSON",
//      success: function(data) {
//        if(data.status != 'OK') {
//          $.alert(data.msg);
//        } else {
//          var reviewVideosList = data.dataList;
//          if(reviewVideosList != null && reviewVideosList.length > 0) {
//            $.each(reviewVideosList, function(index, item) {
//              var videoUrl = item.videoUrl;
//              debugger
//              videoUrl = getVideoIdUrl(videoUrl);
//              $('.reviewVideo').append('<li style="float: left; margin-right: 20px; margin-bottom: 15px;"><iframe frameborder="10" width="250" height="180" style=" " src="' + videoUrl + '" allowFullScreen="true"></iframe><p><span style="padding-left:40px;">' + item.createTime + '</span><span ></span></p></li>');
//            });
//          }
//        }
//      }
//    });
    //视频回顾end
  }
  activetitle();

  var sainup = $("#btn_baomings");
  sainup.click(function(e) {
    console.log(2);
  })

  //活动标题内容end

  /*----------------------------互动评论-----------------------------------*/

  function talk_each_ohter(data) {
    if(data != null && data.length > 0) {
      var html = '';
      for(var i = 0; i < data.length; i++) {
        var item = data[i];
        html += '<li>';
        html += '<div class="human humanBox clearfix">';
        html += ' <div class="imgbox">';
        html += '  <img src="' + Utils.compressByAli(item.commentAccPhoto, '?x-oss-process=image/resize,m_mfit,h_42,w_42') + '" alt="" />';
        html += ' </div>';
        html += ' <div class="txtbox">';
        html += '  <p class="one">';
        html += '   <span class="name">' + item.commentAccName + '</span>';
        html += '   <span class="time">' + item.commentTime + '</span>';
        html += '  </p>';
        html += '  <p class="two">' + item.commentContent + '</p>';
        html += '  <div class="edit clearfix">';
        html += '   <span class="talk editBtn" id="commentCount_' + item.id + '" onclick="getChildCommments(' + item.id + ')">评论(' + item.childCommentCount + ')</span>';
        //				html += '   <span class="talk editBtn" id="commentCount_' + item.id + '" onclick="getChildCommments(' + item.id + ')">查看</span>';
        //				html += '   <span class="talk editBtn" id="commentCount_' + item.id + '">查看</span>';
        html += '   <span class="editBtn huifu">回复</span>';
        if(item.canDel && item.canDel == true) {
          html += '   <span class="editBtn delete" onclick="deleteActivityComment(' + item.id + ')">删除</span>';
        }
        html += '  </div>';
        html += '  <div class="commentList" id="commentList_' + item.id + '" style="display:none;">';
        html += '</div>';
        html += '<div class="replyBox show_box">';
        html += ' <form>';
        html += '  <textarea class="commentContent" id="commentContent_' + item.id + '" placeholder="来说两句吧！" maxlength="300"></textarea>';
        html += '  <div class="btn_box">';
        html += '   <input class="parentCommentId" type="hidden" value="' + item.id + '" />';
        html += '   <input type="button" value="提交" class="submit_btn" onclick="replyActivityComment(' + item.id + ')" />';
        html += '   <a href="javascript:;" class="cancel">取消</a>';
        html += '  </div>';
        html += ' </form>';
        html += '  </div>';
        html += ' </div>';
        html += '</div>';
        html += '</li>';
      }

      return html;
    }
  }

  function pageCheck(parentCell, contentCell, data, arg) {
    $(parentCell).pageFun({
      contentCell: contentCell,
      /*包裹数据列表的父容器*/
      maxPage: 3,
      /*显示页码框个数*/
      apiProxy: ActivityAccList.getCommentList,
      /*接口函数*/
      data: data,
      /*接口参数*/
      listFun: talk_each_ohter,
      /*数据列表函数 -- 返回html字符串*/
      arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
    });
  }

  var data = { /*接口参数*/
    pageIndex: 1, //当前页
    pageSize: 10, //页码数
    activityId: activityId
  };

  pageCheck('.talk_each_ohter', '.talk_comment', data);

  /*----------------------------互动评论end-----------------------------------*/

  /*评论里的回复评论框*/

  /*--------在已有评论下点击回复--------*/
  /*$(document).on('click', '.talk_each_ohter .editBtn.talk', function(event) {
      var parentCommentId = $('.parentCommentId').val();
      if ($('.commentList').is(':hidden')) {//如果当前隐藏
          $('.commentList').show();//那么就显示div
          getChildCommments(parentCommentId);
      } else {//否则
          $('.commentList').hide();//就隐藏div
      }
  });*/

  /*$('.talk_each_ohter .talk .editBtn').click(function() {//点击a标签
      if ($('.commentList').is(':hidden')) {//如果当前隐藏
          $('.commentList').show();//那么就显示div
          var parentCommentId = $('.parentCommentId').val();
          getChildCommments(parentCommentId);
      } else {//否则
          $('.commentList').hide();//就隐藏div
      }
  });*/

  $(document).on('click', '.talk_each_ohter .editBtn.huifu', function(event) {
    if(!currentAccount) {
      $.alert("请先登录后再来哦！").then(function() {
        $('#loginBtn').click();
      })
      return;
    }

    $(this).parent().siblings('.replyBox').fadeToggle(150);
  });

  $(document).on('click', '.talk_each_ohter .replyBox .cancel', function(event) {
    $(this).parents('.replyBox').fadeOut(150);
  });

  /*最上面点击 我要评论 */
  $(".hascomment").on("click", function(event) {
    if(!currentAccount) {
      $.alert("请先登录后再来哦！").then(function() {
        $('#loginBtn').click();
      })
      return;
    }

    $(this).siblings('.show_box').stop().fadeIn(150);
  });
  $(".show_box .cancel").on("click", function(event) {
    $(this).parents(".show_box").stop().fadeOut(150);
  });

  console.log(uploadUrl);
  $('.show_box.topTalk .submit_btn').click(function(event) {
    var thisTextarea = $(this).parent().siblings('textarea');
    var thisTxt = thisTextarea.val();
    var imgUrls = $('#imgUrl').text();
    console.log('uploadUrl', uploadUrl);
    console.log('imgUrls', imgUrls);
    if($.trim(thisTxt) == '' || $.trim(thisTxt).length < 5) {
      layer.alert('请输入5个字以上的内容！')
      thisTextarea.focus();
    } else {
      $.ajax({
        type: "POST",
        url: Qnzs.path + "/activity/comment/commentActivity",
        data: {
          'activityId': activityId,
          'content': thisTxt,
          'imgUrls': imgUrls
        },
        dataType: "JSON",
        success: function(data) {
          if(data.status == 'OK') {
            $.alert(data.msg);
            window.location.reload();
          } else {
            $.alert(data.msg);
            return;
          }
        }
      })

      $(this).parent().siblings('textarea').val('');
      $('.show_box.topTalk').hide();
    }
  });

  /*是否删除评论*/

  /*----------------------------互动评论 end-----------------------------------*/

  /*活动报名提交*/
  $('.list_tanchuang .sure').click(function(event) {
    var name = $('.sign_up_name').val();
    var telephone = $('.contact_phone').val();
    var remark = $('#editorContent').val();
    var lenghtdiv = $('.item_div').children('.job_position').length;
    var extracurricularName = $('.student_name').val();
    var extracurricularStuNo = $('.student_no').val();
    var extracurricularSchoolDid = $('.schoolDid').val();
    var extracurricularSchoolName = $('.school').val();
    //		var extracurricularAcademyDid = $('.academyDid').val();
    //		var extracurricularAcademyName = $('.academy').val();
    var extracurricularAcademyDid = $('.academy').val(); //获取Select选择的Value
    var extracurricularAcademyName = $(".academy").find("option:selected").text(); //获取Select选择的Text
    var extracurricularAcademyName2 = $('.academy').text();
    // var  activity_value=$('.activity_item_value').val();

    var fileId = $('#fileId').val();
    var fileName = $('#fileName').val();
    var templateUrl = $('#templateUrl').val();
    var isAddTemplate = $('#isAddTemplate').val();

    var itemIdArr = new Array();
    var itemValueArr = new Array();
    var itemIds = '';
    var itemValues = '';

    if(!name) {
      $.alert('请输入报名者姓名');
      return;
    }
    if(!telephone) {
      $.alert('请输入联系电话');
      return;
    }

    $('.activity_item_id').each(function(index, item) {
      itemIdArr.push($(item).val());
      itemIds += $(item).val() + ',';
    });
    var isItemEmpty = false;
    $('.activity_item_value').each(function(index, item) {
      itemValueArr.push($(item).val());
      itemValues += $(item).val() + ',';
      if(!$(item).val()) {
        isItemEmpty = true;
        return;
      }
    });
    if(isItemEmpty) {
      $.alert('自定义项都不能为空');
      return;
    }

    var display = $('#uploadEnrollFile').css('display');
    if(display == 'block') {
      if(isAddTemplate != null && isAddTemplate == 1 && !fileId) {
        $.alert("请上传报名附件");
        return;
      }
    }

    $.ajax({
      type: "post",
      url: Qnzs.path + "/activity/enroll/enrollActivity",
      data: {
        'activityId': activityId,
        'name': name,
        'telephone': telephone,
        'remark': remark,
        'extracurricularName': extracurricularName,
        'extracurricularStuNo': extracurricularStuNo,
        'extracurricularSchoolDid': extracurricularSchoolDid,
        'extracurricularAcademyDid': extracurricularAcademyDid,
        'itemIds': itemIds,
        'itemValues': itemValues,
        'itemIdArr': itemIdArr,
        'itemValueArr': itemValueArr,
        'templateUrl': templateUrl,
        'fileId': fileId,
        'fileName': fileName
      },
      dataType: "JSON",
      //			async:true,
      success: function(data) {
        if(data.status != 'OK') {
          $.alert(data.msg);
          return;
        } else {
          $.alert(data.msg);
          $('.bg_black').hide();
          $('body').removeClass('overflow_h');

          //活动外链特殊处理，活动ID-18068、活动名称-开学礼：10万张免费骑行月卡，0元畅骑30天！点击报名改为一个链接-https://activity.mingbikes.com/public/app/send__card_for_new.html
          if(activityId == '18068') {
            //						window.open('https://activity.mingbikes.com/public/app/send__card_for_new.html', '_blank');
            window.location.href = 'https://activity.mingbikes.com/public/app/send__card_for_new.html';
            return;
            /*$.alert('报名后，即可免费领取小鸣单车月卡。');
            return;*/
          }
          //活动外链特殊处理，活动ID-18527：//www.belltrip.cn/dx/a-58.html?s=1057
          if(activityId == '18527') {
            $.alert('预报名成功，请继续完成报名缴费！');
            window.location.href = '//www.belltrip.cn/dx/a-58.html?s=1057';
            return;
          }
          //活动外链特殊处理，活动ID-18526：//www.belltrip.cn/dx/a-54.html?s=1057
          if(activityId == '18523') {
            $.alert('预报名成功，请继续完成报名缴费！');
            window.location.href = '//www.belltrip.cn/dx/a-57.html?s=1057';
            return;
          }
          //活动外链特殊处理，活动ID-18526：//www.belltrip.cn/dx/a-54.html?s=1057
          if(activityId == '18526') {
            $.alert('预报名成功，请继续完成报名缴费！');
            window.location.href = '//www.belltrip.cn/dx/a-54.html?s=1057';
            return;
          }
          //活动外链特殊处理，活动ID-18521：//www.belltrip.cn/dx/a-59.html?s=1057
          if(activityId == '18521') {
            $.alert('预报名成功，请继续完成报名缴费！');
            window.location.href = '//www.belltrip.cn/dx/a-59.html?s=1057';
            return;
          }
          //活动外链特殊处理，活动ID-20634：https://weidian.com/item_classes.html?userid=1237367894&c=110107243&des=%E4%B9%90%E5%96%84%E8%A1%8C&wfr=wx
          if(activityId == '20634') {
            $.alert('恭喜你已成功填写报名资料，请继续完成支付，即可成功报名！');
            window.location.href = '//weidian.com/item_classes.html?userid=1237367894&c=110107243&des=%E4%B9%90%E5%96%84%E8%A1%8C&wfr=wx';
            return;
          }
          //活动外链特殊处理，活动ID-20921：//www.belltrip.cn/dx/a-60.html?s=1057
          if(activityId == '20921') {
            $.alert('恭喜你已成功填写报名资料，请继续完成支付，即可成功报名！');
            window.location.href = '//www.belltrip.cn/dx/a-60.html?s=1057';
            return;
          }
          //活动外链特殊处理，活动ID-47900：https://weibo.com/p/1008087f4b5f4baf1b0bc3267aa1c1bb9a3c6c
          if(activityId == '47900') {
            window.location.href = '//weibo.com/p/1008087f4b5f4baf1b0bc3267aa1c1bb9a3c6c';
            return;
          }
          //活动外链特殊处理，活动ID-48142：https://www.wjx.cn/jq/22655867.aspx
          if(activityId == '48142') {
            window.location.href = '//www.wjx.cn/jq/22655867.aspx';
            return;
          }
          //活动外链特殊处理，活动ID-50954：https://w.wjx.top/jq/23197158.aspx
          if(activityId == '50954') {
            window.location.href = '//w.wjx.top/jq/23197158.aspx';
            return;
          }
          //活动外链特殊处理，活动ID-64356：http://www.meilizhongguo.org/to_teach/
          if(activityId == '64356') {
            window.location.href = 'http://www.meilizhongguo.org/to_teach/';
            return;
          }
          //活动外链特殊处理，活动ID-72080：http://tvs1runup.greatimeco.com/tvs1runup/index.php?s=/Wxhome/Goods/detail/id/3/from/singlemessage/isappinstalled/0
          if(activityId == '72080') {
            window.location.href = 'http://tvs1runup.greatimeco.com/tvs1runup/index.php?s=/Wxhome/Goods/detail/id/3/from/singlemessage/isappinstalled/0';
            return;
          }
          //活动外链特殊处理，活动ID-85068：http://u.cyol.com/index/login/from/aHR0cDovL3hzeHMyMDE5LmN5b2wuY29t/parame/L2dzdGVwL2dzdGVwMQ==
          /*if(activityId == '85068') {
              window.location.href = 'http://u.cyol.com/index/login/from/aHR0cDovL3hzeHMyMDE5LmN5b2wuY29t/parame/L2dzdGVwL2dzdGVwMQ==';
              return;
          }*/

          $('.ui-button-text').click(function(){
            window.location.reload(); //刷新当前页
          })
        }
      }
    });

    //		$.alert('报名成功')
    //		$('.bg_black').hide();
    //		$('body').removeClass('overflow_h');
  });

  uploadEnrollFile();

});

/**
 * 活动进程/状态
 * @param {Object} actStatus
 */
function getActivityProgress(actStatus) {
  var actStatusStr = '';
  switch(actStatus) {
    case 1:
      actStatusStr = "活动预告";
      break;
    case 2:
      actStatusStr = "报名中";
      break;
    case 3:
      actStatusStr = "已满员";
      break;
    case 4:
      actStatusStr = "报名结束";
      break;
    case 5:
      actStatusStr = "进行中";
      break;
    case 6:
      actStatusStr = "活动结束";
      break;
  }
  return actStatusStr;
}

/**
 * 活动操作（报名/取消报名/签到/评分）
 * @param {Object} activityId 活动ID
 * @param {Object} actStatus 活动状态
 * @param {Object} actBtnRequest 操作按钮 可用时的请求
 * @param {Object} isExtracurricular 是否是第二课堂
 * @param {enrollEndTime} 报名结束时间
 */
function activityOperate(activityId, actStatus, actBtnRequest, isExtracurricular, enrollEndTime, actButton) {
  var actStatusStr = getActivityProgress(actStatus);
  var nowGetTime = new Date().getTime();
  var enrollEndGetTime = new Date(enrollEndTime).getTime();
  if(!currentAccount) {
    if(6 == actStatus) {
      $.alert("很遗憾，该活动已结束，去看看其他正在报名的活动吧。");
      //			$.alert("活动已结束，您无法立即报名活动");
    } else if(5 == actStatus) {
      if(nowGetTime < enrollEndGetTime) { //在报名时间内
        $.alert("请先登录后再来哦！").then(function() {
          $('#loginBtn').click();
        })
      } else { //在报名时间外
        $.alert("活动已进行中，您无法立即报名活动");
      }
    } else if(4 == actStatus) {
      $.alert("报名时间已结束，您无法立即报名活动");
    } else if(3 == actStatus) {
      $.alert("亲，你来晚了，已经没名额了。");
    } else if(2 == actStatus) {
      $.alert("请先登录后再来哦！");
      $('#loginBtn').click();
    } else if(1 == actStatus) {
      $.alert("请先登录后再来哦！").then(function() {
        $('#loginBtn').click();
      })
    } else {
      $.alert(actStatusStr);
    }
    return;

    /*$.alert("请先登录");
    window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
    return;*/
  } else if(!actBtnRequest) {
    if(6 == actStatus) {
      //			$.alert("活动已结束，您无法立即报名活动");
      $.alert("很遗憾，该活动已结束，去看看其他正在报名的活动吧。"); //new
    } else if(5 == actStatus) {
      //			$.alert("活动已进行中，您无法立即报名活动");
      //			$.alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");//new
      if("立即报名" == actButton) {
        $.alert("报名已结束，活动已进行中，您无法报名活动");
      } else if("我要签到" == actButton) {
        $.alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");
      }
    } else if(4 == actStatus) {
      //			$.alert("报名时间已结束，您无法立即报名活动");
      //			$.alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");//new
      if("立即报名" == actButton) {
        $.alert("报名时间已结束，您无法立即报名活动");
      } else if("我要签到" == actButton) {
        $.alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");
      }
    } else if(3 == actStatus) {
      $.alert("亲，你来晚了，已经没名额了。");
    } else {
      //			$.alert(actStatusStr);
    }
    return;
  } else {
    if(actBtnRequest == 'remind') { //活动预告提醒
      $.ajax({
        type: "get",
        url: Qnzs.path + "/activity/remind/remindAccount",
        data: {
          'activityId': activityId
        },
        dataType: "JSON",
        success: function(data) {
          if(data.status != 'OK') {
            $.alert(data.msg);
            return;
          } else {
            $.alert(data.msg);
            window.location.reload(); //刷新当前页
          }
        }
      });
    } else if(actBtnRequest == 'enroll') { //活动报名（先检测是否可以报名）
      $.ajax({
        type: "get",
        url: Qnzs.path + "/activity/enroll/checkEnroll",
        //				url: "//169.168.200.19:8080/qnzs//activity/enroll/checkEnroll",
        data: {
          'activityId': activityId
        },
        dataType: "JSON",
        success: function(data) {
          if(data.status == 'ERROR') { //不可报名
            $.alert(data.msg);
            return;
          } else { //可报名
            if(data.msg) { //可报名但有确认提示条件
              if(!confirm(data.msg)) { //是否确认 为否时，不往下操作
                return;
              }
            }
            $('.bg_black').show(); //弹出报名弹窗或跳转报名页面

            //活动外链特殊处理，活动ID-18068、活动名称-开学礼：10万张免费骑行月卡，0元畅骑30天！点击报名改为一个链接-https://activity.mingbikes.com/public/app/send__card_for_new.html
            if(activityId == '18068') {
              $.alert('报名后，即可免费领取小鸣单车月卡。');
            }

            /*返回data.data*/
            var enrollInfo = data.data;
            console.log('enrollInfo', enrollInfo);
            if(enrollInfo) {
              $('#isAddTemplate').val(enrollInfo.isAddTemplate);
              if(enrollInfo.isAddTemplate && enrollInfo.isAddTemplate == true) {
                $('#uploadEnrollFile').show();
              }

              var activityItemsList = null;
              if(enrollInfo.activityItemsList) {
                activityItemsList = enrollInfo.activityItemsList;
              }

              var activityItemsList = null;
              if(enrollInfo.activityItemsList) {
                activityItemsList = enrollInfo.activityItemsList;
              }

              /*根据data返回数据动态加载报名页面*/

              //加载报名自定义项并设值
              $('.item_div').html('');
              if(activityItemsList && activityItemsList.length > 0) { //活动有自定义报名项
                var activityItemHtml = '';
                for(var i = 0; i < activityItemsList.length; i++) {
                  var activityItem = activityItemsList[i];
                  activityItemHtml += '<div class="job_position commonDiv">';
                  activityItemHtml += '	<label for="name" class="fnt14 fl color333 left_title">' + activityItem.itemName + '<span style="color:red;" >*</span></label>';
                  activityItemHtml += '	<input type="hidden" class="border01 activity_item_id" value="' + activityItem.id + '" />';
                  activityItemHtml += '	<input type="text" class="border01 activity_item_value" value=""/>';
                  activityItemHtml += '</div>';
                }
                /*$('.wenti_shuoming').empty();
                $('.wenti_shuoming').append(activityItemHtml);*/

                $('.item_div').append(activityItemHtml);
              }
            }
            if(isExtracurricular == true) { //是第二课堂类别的活动
              var extracurricularHtml = ''; //如果是第二课堂则加载第二课堂报名信息div
              //							extracurricularHtml += '<div class="second_class">';
              extracurricularHtml += '	<h1 class="title">第二课堂</h1>';
              extracurricularHtml += '	<div class="question commonDiv">';
              extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">姓名</label>';
              extracurricularHtml += '		<input type="text" class="border01 student_name" />';
              extracurricularHtml += '	</div>';
              extracurricularHtml += '	<div class="question commonDiv">';
              extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">学号</label>';
              extracurricularHtml += '		<input type="text" class="border01 student_no" />';
              extracurricularHtml += '	</div>';
              extracurricularHtml += '	<div class="question commonDiv">';
              extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">学校</label>';
              extracurricularHtml += '		<input type="hidden" class="border01 schoolDid" value="' + currentAccount.parentDid + '" />';
              extracurricularHtml += '		<input type="text" class="border01 school" readonly value="' + currentAccount.parentDName + '" />';
              extracurricularHtml += '	</div>';
              extracurricularHtml += '	<div class="question commonDiv">';
              extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">院系</label>';
              extracurricularHtml += '		<input type="hidden" class="border01 academyDid" value="" />';
              //							extracurricularHtml += '		<input type="text" class="border01 academy" />';
              extracurricularHtml += '		<select class="academy" id="academy" name="academy">';
              extracurricularHtml += '			<option value="">请选择</option>';
              extracurricularHtml += '		</select>';
              extracurricularHtml += '	</div>';
              //							extracurricularHtml += '</div>';

              $('.second_class').empty();
              $('.second_class').append(extracurricularHtml);

              districtSelect(currentAccount.did, enrollInfo.extracurricularStuStatus);
              /*districtSelect(enrollInfo.extracurricularAcademyDid, currentAccount.did);*/
            }

            //给报名页面设置初始默认值
            if(enrollInfo && enrollInfo.name) {
              $('.sign_up_name').val(enrollInfo.name);
            }
            if(enrollInfo && enrollInfo.telephone) {
              $('.contact_phone').val(enrollInfo.telephone);
            }

            if(enrollInfo && enrollInfo.extracurricularName) {
              $('.student_name').val(enrollInfo.extracurricularName);
              $('.student_name').attr("readonly", true);
            }
            if(enrollInfo && enrollInfo.extracurricularStuNo) {
              $('.student_no').val(enrollInfo.extracurricularStuNo);
              $('.student_no').attr("readonly", true);
            }
            if(enrollInfo && enrollInfo.extracurricularSchoolName) {
              $('.school').val(enrollInfo.extracurricularSchoolName);
              $('.school').attr("readonly", true);
            }
            if(enrollInfo && enrollInfo.extracurricularSchoolDid) {
              $('.schoolDid').val(enrollInfo.extracurricularSchoolDid);
            }
            /*if (enrollInfo && enrollInfo.extracurricularAcademyName) {
//							$('.academy').val(enrollInfo.extracurricularAcademyName);
//							$('.academy').attr("readonly", true);
                $('.academy option[text=\'' + enrollInfo.extracurricularAcademyName + '\']').attr("selected", true);   //设置Select的Text值为jQuery的项选中
                $('.academy').attr("disabled", true);
            }*/
            if(enrollInfo && enrollInfo.extracurricularAcademyDid) {
              //							$('.academyDid').val(enrollInfo.extracurricularAcademyDid);
              $('.academy option[value=' + enrollInfo.extracurricularAcademyDid + ']').attr('selected', true); //设置Select的value值为jQuery的项选中
              //							$('.academy').attr('disabled', true);
            }
          }
        }
      });
    } else if(actBtnRequest == 'cancel') { //取消报名
      if(!confirm("你确认要取消报名吗？")) { //不确认取消
        return;
      }
      $.ajax({
        type: "get",
        url: Qnzs.path + "/activity/enroll/cancelEnroll",
        data: {
          'activityId': activityId
        },
        dataType: "JSON",
        success: function(data) {
          if(data.status != 'OK') {
            $.alert(data.msg);
            return;
          } else {
            $.alert(data.msg);
            $('.ui-button-text').click(function(){
              window.location.reload(); //刷新当前页
            })
          }
        }
      });
    } else if(actBtnRequest == 'sign' || actBtnRequest == 'signIn' || actBtnRequest == 'signOut') { //活动签到签退
      $.alert('请使用微信扫描活动二维码签到');
      /*$.ajax({
          type: "post",
          url: Qnzs.path + "/activity/sign/activitySign",
          data: {
              'activityId': activityId,
              'longitude': longitude,
              'latitude':latitude,
              'address': address
          },
          dataType: "JSON",
          success: function(data) {
              if (data.status != 'OK') {
                  $.alert(data.msg);
                  return;
              } else {
                  $.alert(data.msg);
                  window.location.reload(); //刷新当前页
              }
          }
      });*/
    } else if(actBtnRequest == 'mark') { //活动评分（给活动主办方评分）
      window.location.href = '../find_active/actScanMark.html?activityId=' + activityId + '&orgId=' + orgId; //弹出评分弹窗或跳转评分页面
      /*$.ajax({
          type: "get",
          url: Qnzs.path + "/organizationMark/markOrganization",
          data: {
              'activityId': activityId
          },
          dataType: "JSON",
          success: function(data) {
              if (data.status != 'OK') {
                  $.alert(data.msg);
                  return;
              } else {
                  $('.bg_black').show(); //弹出评分弹窗或跳转评分页面
              }
          }
      });*/
    }
  }
}

/**
 * 活动收藏或取消收藏
 * @param {Object} activityId 活动ID
 */
function collectOrCancelActivity(activityId) {
  if(!currentAccount) {
    $.alert("请先登录后再来哦！").then(function() {
      $('#loginBtn').click();
    })
    return;
  }

  $.ajax({
    type: "get",
    url: Qnzs.path + "/activity/collection/collectOrCancel",
    data: {
      'activityId': activityId
    },
    dataType: "JSON",
    success: function(data) {
      if(data.status != 'OK') {
        $.alert(data.msg);
        return;
      } else {
        $.alert(data.msg);
        var collectStr = $('.btn2').text();
        if(collectStr == '收藏') {
          $('.btn2').text('取消收藏');
        } else {
          $('.btn2').text('收藏');
        }
        //				window.location.reload(); //刷新当前页
      }
    }
  });
}

/**
 * 地区下拉框选择
 * @param {Object} selectValue 默认选中值
 * @param {Object} extracurricularStuStatus 第二课堂学生审核状态(0-待审核，1-已通过，2-不通过，默认0待审核)
 */
function districtSelect(selectValue, extracurricularStuStatus) {
  if(currentAccount) {
    $.ajax({
      type: "get",
      url: Qnzs.path + "/common/district/listByParent",
      data: {
        'parentDid': currentAccount.parentDid
      },
      dataType: "JSON",
      success: function(data) {
        if(data.status != 'OK') {
          $.alert(data.msg);
          return;
        } else {
          var districtsList = data.dataList;

          if(extracurricularStuStatus && extracurricularStuStatus == 1 && selectValue) {
            $('.academy').attr('disabled', true);
          }
          $.each(districtsList, function(index, item) {
            if(selectValue && item.did == selectValue) {
              $('.academy').append('<option name="academy" value="' + item.did + '" selected>' + item.districtName + '</option>');
            } else {
              $('.academy').append('<option name="academy" value="' + item.did + '">' + item.districtName + '</option>');
            }
          });
        }
      }
    });
  }
}

function getChildCommments(parentCommentId) {
  if($('#commentList_' + parentCommentId).is(':hidden')) { //如果当前隐藏
    $('#commentList_' + parentCommentId).show(); //那么就显示div
    //评论中的评论列表
    $.ajax({
      type: "get",
      url: Qnzs.path + "/activity/comment/listByParent?parentCommentId=" + parentCommentId,
      dataType: "JSON",
      success: function(data) {
        //				$('#commentCount_' + parentCommentId).text('评论(' + data.total + ')');
        var comments = data.rows;
        var htmls = '';
        if(comments && comments.length > 0) {
          for(var i = 0; i < comments.length; i++) {
            var item = comments[i];
            htmls += '<div class="human clearfix">';
            htmls += ' <div class="imgbox">';
            htmls += '   <img src="' + item.commentAccPhoto + '" />';
            htmls += ' </div>';
            htmls += ' <div class="txtbox">';
            htmls += '  <p class="one">';
            htmls += '   <span class="name">' + item.commentAccName + '</span>';
            htmls += '   <span class="time">' + item.commentTime + '</span>';
            htmls += '  </p>';
            htmls += '  <p class="two">' + item.commentContent + '</p>';
            htmls += ' </div>';
            htmls += '</div>';
          }
          $('#commentList_' + parentCommentId).empty();
          $('#commentList_' + parentCommentId).append(htmls);
        }
      }
    });
  } else { //否则
    $('#commentList_' + parentCommentId).hide(); //就隐藏div
  }
}

/**
 * 回复评论（二级评论）
 * @param parentCommentId 父活动评论ID（一级评论）
 * @returns
 */
function replyActivityComment(parentCommentId) {
  if(!currentAccount) {
    $.alert("请先登录后再来哦！").then(function() {
      $('#loginBtn').click();
    })
    return;
  }

  //	var commentContent = $('.talk_each_ohter .replyBox .commentContent').val();
  var commentContent = $('#commentContent_' + parentCommentId).val();
  if(!commentContent) {
    $.alert('回复内容不能为空');
    return;
  }

  $.ajax({
    type: "POST",
    url: Qnzs.path + "/activity/comment/commentActivity",
    data: {
      'activityId': activityId,
      'parentCommentId': parentCommentId,
      'content': commentContent
    },
    dataType: "JSON",
    success: function(data) {
      if(data.status == 'OK') {
        $.alert(data.msg);
        window.location.reload();
      } else {
        $.alert(data.msg);
        return;
      }
    }
  })
}

/**
 * 删除活动评论
 * @param activityCommentId 活动评论ID
 * @returns
 */
function deleteActivityComment(activityCommentId) {
  if(!currentAccount) {
    $.alert("请先登录后再来哦！").then(function() {
      $('#loginBtn').click();
    })
    return;
  }

  var msg = confirm('你确定要删除吗？')
  if(msg == true) {
    $.ajax({
      type: "get",
      url: Qnzs.path + "/activity/comment/delete",
      data: {
        'activityCommentId': activityCommentId,
      },
      dataType: "JSON",
      success: function(data) {
        if(data.status == 'OK') {
          $.alert(data.msg);
          window.location.reload();
        } else {
          $.alert(data.msg);
          return;
        }
      }
    });
  }
}

/*举报功能*/
function getcomplain() {
  if(!currentAccount) {
    $.alert("请先登录后再来哦！").then(function() {
      $('#loginBtn').click();
    })
    return;
  }

  $('.bgg_black').show();
  $('#inform_del').click(function() {
    $('.bgg_black').hide();
  });
  $('.bgg_black .delete').click(function() {
    $('.bgg_black').hide();
  });

  $('#inform_push').click(function() {
    var reportType = $('#list_option option:selected').val();
    var reportReason = $('#text_vomt').val();
    var module = 1;

    $.ajax({
      type: "post",
      url: Qnzs.path + "/complaint/report",
      data: {
        'module': module,
        'reportAgainstId': activityId,
        'reportType': reportType,
        'reportReason': reportReason
      },
      dataType: "JSON",
      success: function(data) {
        if(data.status == 'OK') {
          $.alert(data.msg);
          $('.bgg_black').hide();
          return;
        } else {
          $.alert(data.msg);
          return;
        }
      }
    });
  })
}

function uploadEnrollFile() {
  //	var fileValue = $("input[name='template']").val();
  //	var point = fileValue.lastIndexOf(".");
  //	var fileType = fileValue.substr(point);
  //	if (fileType != ".xls" && fileType != ".xlsx" && fileType != ".doc" && fileType != ".docx") {
  //	$.alert("请上传文件后缀名为(doc,docx,xls,xlsx)的文件！");
  //	return false;
  //	} else {
  //报名模板上传
  $('#template').fileupload({
    //url: Qnzs.path + '/file_upload',
    url: Qnzs.path + '/file_uploadTwo',
    dataType: 'json',
    autoUpload: true,
    done: function(e, data) {
      data = data.result;
      if(data.error == 0) {
        /* $('#path2').val(data.url); */
        $("#fileId").val(data.fileId);
        $("#fileName").val(data.fileName);
        $("#fileNameShow").text(data.fileName);
        $("#templateUrl").val(data.url);
        $("input[name='template']").val('');
        $.alert("上传附件成功!");
        /* $('#imagePath').attr('src',data.url).show(); */ //显示图片
      }
      /*imageUrl = data.result.url;
          $('#imag_gpj').hide();
          console.log(imageUrl);
          $('#imghead').attr('src', imageUrl)*/
    },
    fail: function() {
      $.alert('出错');
    }
  }); //海报图片上传end
  //	}
}






//活动总结回顾视频用 腾讯视频 展示
function getVideoIdUrl(videoUrl) {
  var videoIdUrl = "";

  if (videoUrl.indexOf('vid=') != -1) {
    videoIdUrl = videoUrl + '&tiny=0&auto=0&autoplay=false';
    debugger
  } else if(videoUrl != '' && videoUrl.indexOf('://v.qq.com/x/') != -1){
    var h = '';// https://v.qq.com/x/page/
    var videoId = "";
    var indexOfNum = videoUrl.indexOf('.html');
    if(videoUrl.indexOf('https://v.qq.com/x/') != -1){
      h = videoUrl.substr(19);  //自己上传的 视频
    }else if(videoUrl.indexOf('http://v.qq.com/x/') != -1){
      h = videoUrl.substr(18);
    }

    if(h.indexOf('page/') != -1){   //自己上传的视频
      videoId = videoUrl.substring(24,indexOfNum);
    }
    if(h.indexOf('cover/') != -1){    //腾讯的视频
      videoId = h.split('/');
      console.log(videoId)
      videoId = videoId[videoId.length-1].split('.');
      videoId =videoId[0];
    }

    //txp/-无需插件;&autoplay=true-自动播放
    videoIdUrl = 'https://v.qq.com/txp/iframe/player.html?vid=' + videoId + '&tiny=0&auto=0&autoplay=false';
//	    videoIdUrl = 'https://v.qq.com/iframe/player.html?vid=' + videoId + '&tiny=0&auto=0&autoplay=false';
//		$('.youku-box').show(); //显示视频播放框
//		$('.reviewVideo_list iframe').attr('src','https://v.qq.com/iframe/player.html?vid='+videoId+'&tiny=0&auto=0')
//		$('.reviewVideo_list iframe').attr('width','100%'); //设置宽度百分百
//		$('.reviewVideo_list iframe').attr('height','400'); //设置宽度百分百
//	}else{
//		$('.youku-box').hide(); //隐藏视频播放框
  }
  return videoIdUrl;
}
//活动总结回顾视频展示 end

