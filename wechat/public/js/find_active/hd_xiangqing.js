var activityId = "";
var orgId = "";
var currentAccount = "";
var imageUrl = "";
var longitude = $.cookie('lng');

console.log(longitude)
var latitude = $.cookie('lat');

console.log(latitude)
//var address = '';
var pageIndex = 1;
var pageSize = 6;

var indexApi={};
var activityId_detailt = Utils.getQueryString("id");

indexApi.getcommentlist= function (data) {
    return Qnzs.ApiProxy('/activity/comment/list', data, '获取评论列表');
};

$(document).ready(function() {
    if(isWechat()) {
        // 从cookie中获取oauthCode
        var _oauthStatus = $.cookie('hdOauthStatus');
        if(!_oauthStatus || _oauthStatus > 3) {
            _oauthStatus = 1;
            $.cookie('hdOauthStatus', 1);
        }
        console.log($.cookie('hdOauthStatus'));
        var auth_url;
        if(_oauthStatus == 1) {
            changeStatus();
            $.ajax({
                type: "POST",
                url: Qnzs.path + "/commons/getSessionAccount",
                dataType: "JSON",
                async: false,
                success: function(data) {
                    if(data.status != 'OK') {
                        var _activityId = Utils.getQueryString('activityId');
                        auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
                            encodeURIComponent(Qnzs.path + '/wechatOauth') +
                            '&response_type=code&scope=snsapi_userinfo&state=activityDetail_' +
                            _activityId + '#wechat_redirect';
                    }
                }
            });
        }
        _oauthStatus = $.cookie('hdOauthStatus');
        if(_oauthStatus == 2) {
            changeStatus();
            if(!auth_url) {
                auth_url = window.location.href.split('&')[0];
            }
            window.location.href = auth_url;
            return;
        }
        _oauthStatus = $.cookie('hdOauthStatus');
        if(_oauthStatus == 3) {
            changeStatus();
        }
    }

    if (!longitude || !latitude) {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(113.30764968, 23.1200491);
        map.centerAndZoom(point, 12);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if(this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                longitude = r.point.lng;
                latitude = r.point.lat
                console.log(longitude);
                console.log(latitude);
                $.cookie('lng', longitude);
                $.cookie('lat', latitude);
            } else {

            }
        }, {
            enableHighAccuracy: true
        })
    }

    Qnzs.getSessionAccount({}).then(function(data) {
        console.log('Qnzs.getSessionAccount data', data);
        currentAccount = data.account; // 账户信息
    });

    /*举报*/
    $('.main_content_box .report').click(function(event) {
        $('.main_content_box').hide();
        $('.report_box').show();
    });
    $('.report_box .sure_btn').click(function(event) {
        var thisVal = $('.report_box .report_select option:selected').val();
        if(thisVal == 0) {
            $.alert('请选择举报分类')
        } else {
            var thisTxt = $('.report_box .report_write').val();
            if($.trim(thisTxt) == '') {
                $.alert('请输入举报理由')
            } else {
                $.alert('待审核')
                $('.main_content_box').show();
                $('.report_box').hide();
            }
        }
    });
    /*举报 end*/

    /*找活动详情*/
    function activetitle() {
        var actStatus = {
            '1': '活动预告',
            '2': '报名中',
            '3': '已满员',
            '4': '报名结束',
            '5': '活动中',
            '6': '活动结束'
        };

        function getRequest() {
            if (!activityId_detailt) {
                activityId = Utils.getQueryString("activityId");
            } else {
                activityId = activityId_detailt;
            }
        }
        getRequest();

        $.ajax({
            type: "get",
            url: Qnzs.path + "/activity/offlineActivity/wechat/detail?activityId=" + activityId,
            dataType: "JSON",
            success: function(data) {
                if(data.status != 'OK') {
                    $.alert(data.msg);
                    return;
                } else {
                    var item = data.data;
                    orgId = item.createOrgid;

                    shareActivity(item.id, item.title, item.summary, item.imageUrl);

                    var enrollAccountsList = item.enrollAccountsList;
                    var commentsList = item.commentsList;
                    var imageUrlsArr = item.imageUrls.split(';');
                    var collectBtnStr = '';

                    var remainDayStr = "";
                    if(item.actStatus == 1) {
                        remainDayStr = '距离报名开始还剩' + item.remainDay + '天';
                        $('#presser').append('<div class="status-color"></div>')
                        $('.status-color').css({"background-color":"rgba(0,0,0,0.5)","width":"16%"});
                    }
                    if(item.actStatus == 2) {
                        remainDayStr = '距离报名结束还剩' + item.remainDay + '天';
                        $('#presser').append('<div class="status-color"></div>')
                        $('.status-color').css({"background-color":"#2185cf","width":"30%"});
                    }
                    if(item.actStatus == 3) {
                        remainDayStr = '距离报名结束还剩' + item.remainDay + '天';
                        $('#presser').append('<div class="status-color"></div>')
                        $('.status-color').css({"background-color":"#561216","width":"46%"});
                    }
                    if(item.actStatus == 4) {
                        remainDayStr = '距离活动结束还剩' + item.remainDay + '天';
                        $('#presser').append('<div class="status-color"></div>')
                        $('.status-color').css({"background-color":"#B22222","width":"65%"});
                    }
                    if(item.actStatus == 5) {
                        remainDayStr = '距离活动结束还剩' + item.remainDay + '天';
                        $('#presser').append('<div class="status-color"></div>')
                        $('.status-color').css({"background-color":"#00B2EE","width":"80%"});
                    }
                    if(item.actStatus == 6) {
                        remainDayStr = '活动结束了' + item.remainDay + '天';
                        $('#presser').append('<div class="status-color"></div>')
                        $('.status-color').css({"background-color":"#8B0000","width":"100%"});
                    }

                    if(item.isCollected == true) {
                        collectBtnStr = '取消收藏';
                    } else {
                        collectBtnStr = '收藏';
                    }

                    if(item.isYouthAccount) {
                        $('.head_link_box').hide();
                        $('.head_link_box_cloud').show();
                    }

                    $('.xiangqing_banner').append('<a href="hd_xiangce.html?activityId=' + item.id + '" class="banner_img disB"><img src="' + Utils.compressByAli(item.imageUrl, 240) + '"/></a>');
                    //					$('.collect').append('<p class="color000 fl">' + item.title + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="下载附件" class="btn3" onclick="javascript:window.location.href=\'' + Qnzs.path + '/downLoadFile?fileId=' + item.fileId + '&fileName=' + item.fileName + '\'" /></p><div class="col_star fr"><div class="star"><img src="../../public/img/collect_star.png"/></div><span class="color333" id="collectBtn" onclick="collectOrCancelActivity(' + item.id + ')">' + collectBtnStr + '</span></div>');
                    $('.collect').append('<p class="color000 fl">' + item.title + '</p><div class="col_star fr"><div class="star"><img src="../../public/img/collect_star.png"/></div><span class="color333" id="collectBtn" onclick="collectOrCancelActivity(' + item.id + ')">' + collectBtnStr + '</span></div>');
                    //					$('.act_status').append('<a href="javascript:;" class="fl status_show" style="margin-right:0.2rem;">' + actStatus[item.actStatus] + '</a><div class="fr"><span class="fl color999 left_time">距离开始剩' + item.remainDay + '天</span><span class="fl report">举报</span></div>');
                    if(item.isAddTemplate && item.isAddTemplate == true) {
                        $('.act_status').append('<a href="javascript:;" class="fl status_show" style="margin-right:0.2rem;">' + actStatus[item.actStatus] + '</a><a href="' + Qnzs.path + '/downLoadFile?fileId=' + item.fileId + '&fileName=' + item.fileName + '\" class="fl download_show" style="margin-right:0.2rem;" >下载附件</a><div class="col_star fr"><div class="fr"><span class="fl color999 left_time">' + remainDayStr + '</span><span class="fl report" onclick="getreport(' + item.id + ')">举报</span></div>');
                    } else {
                        $('.act_status').append('<a href="javascript:;" class="fl status_show" style="margin-right:0.2rem;">' + actStatus[item.actStatus] + '</a><div class="fr"><span class="fl color999 left_time">' + remainDayStr + '</span><span class="fl report" onclick="getreport(' + item.id + ')">举报</span></div>');
                    }
                    $('.timeAndAddress').append('<div class="divin clearfix time"><div class="imgDiv fl"><img src="../../public/img/iconTime.png"/></div><p class="fl color333" style="font-size: 0.55rem;">报名时间:' + item.enrollStartTime + '-' + item.enrollEndTime + '</p></div> <div class="divin clearfix time"><div class="imgDiv fl"><img src="../../public/img/iconTime.png"/></div><p class="fl color333" style="font-size: 0.55rem;">活动时间:' + item.startTime + '-' + item.endTime + '</p></div><div class="divin clearfix address" onclick="getDressclik(' + item.longitude + ',' + item.latitude + ')"><div class="imgDiv fl"><img src="../../public/img/iconAddress.png"/></div><p class="fl color333" id="address_parent">' + item.address + '</p><div class="arrow fr"><img src="../../public/img/next.png"/></div></div>');

                    $('.free').append('<div class="divin clearfix"><div class="imgDiv fl"><img src="../../public/img/iconFree.png"/></div><p class="fl color333">' + item.money + '</p></div>');
                    $('.Puhto_url').append('<a href="hd_xiangce.html?activityId=' + item.id + '" class="fl tit_2 color2185cf">图片</a>')
                    var divHtml = '';
                    divHtml += '<div class="divin holder clearfix">';
                    divHtml += '    <a href="../organization/organization_detail.html?oid=' + item.createOrgid + '">';
                    divHtml += '        <div class="imgDiv fl"><img src="../../public/img/iconHolder.png"/></div>';
                    divHtml += '        <div class="txt fl">';
                    divHtml += '            <p>' + item.createOrgName + '</p>';
                    //					divHtml += '            <p>广州国税系统共青团志愿者服务队</p>';
                    divHtml += '        </div>';
                    divHtml += '        <div class="arrow fr"><img src="../../public/img/next.png"/></div>';
                    divHtml += '    </a>';
                    divHtml += '</div>';
                    divHtml += '<div class="divin clearfix phone">';
                    divHtml += '    <div class="imgDiv fl"><img src="../../public/img/iconPhone.png"/></div>';
                    divHtml += '    <p class="fl color333"><a href="tel:' + item.telephone + '"></a>' + item.telephone + '</p>';
                    divHtml += '    <div class="arrow fr"><a href="tel:' + item.telephone + '"><img src="../../public/img/next.png"/></a></div>';
                    divHtml += '</div>';
                    divHtml += '<div class="divin clearfix peixun act_type" style="line-height:0.8rem;">';
                    divHtml += '    <div class="imgDiv fl"><img src="../../public/img/iconPeixun.png"/></div>';
                    divHtml += '    <p class="fl color333 class_info">' + item.type + '</p>';

                    if('第二课堂' == item.type) {
                        divHtml += '    <span class="fl color333 class_type class_info fz24">' + item.extracurricularType + '</span>';
                        divHtml += '    <span class="fl color333 class_hour class_info fz24">' + item.extracurricularHour + '学时</span>';
                    }
                    divHtml += '</div>';
                    $('.divoutsdd').append(divHtml);
                    //					$('.divoutsdd').append('<div class="divin holder clearfix"><a href="hd_zhubanfangxiangqing.html"><div class="imgDiv fl"><img src="../../public/img/iconHolder.png"/></div><div class="txt fl"><p>' + item.createOrgName + '</p></div> <div class="arrow fr"><img src="../../public/img/next.png"/></div></a></div><div class="divin clearfix phone"><div class="imgDiv fl"><img src="../../public/img/iconPhone.png"/></div><p class="fl color333">' + item.telephone + '</p><div class="arrow fr"><img src="../../public/img/next.png"/></div></div><div class="divin clearfix peixun act_type" style="line-height:0.8rem;"><div class="imgDiv fl"><img src="../../public/img/iconPeixun.png"/></div><p class="fl color333 class_info">' + item.type + '</p><span class="fl color333 class_type class_info fz24">' + item.extracurricularType + '</span><span class="fl color333 class_hour class_info fz24">' + item.extracurricularHour + '学时</span></div>');

                    $('.divincdf').append('<p class="fl color333">活动人数（' + item.activitiesNumber + '）</p><div class="fr color999"><span class="yibaoming">已有' + item.enrolledNum + '人报名</span><div class="arrow fr"><a href="hd_peopledeil.html?activityId=' + item.id + '"><img src="../../public/img/next.png"/></a></div></div>');
                    $('.act_introduction').append('<div class="content bgcWhite color000 " id="editor">' + item.remark + '</div>');
                    //					$('.morebtn color333').append('<a href="hd_baoming.html" class="to_sign_up">' + item.actButton + '</a>');

                    $('#commentsNum').text('评论（' + item.commentNum + '）');

                    //控制图片样式
                    $('.content img').css({
                        "width": "100%"
                    });
                    if(!item.actBtnRequest) {
                        $('.to_sign_up').append('<a href="javascript:activityOperate(' + item.id + ', ' + item.actStatus + ', \'' + item.actBtnRequest + '\', ' + item.isExtracurricular + ', \'' + item.enrollEndTime + '\', \'' + item.actButton + '\');" class="to_sign_up" style="background:gray;">' + item.actButton + '</a>');
                    } else {
                        $('.to_sign_up').append('<a href="javascript:activityOperate(' + item.id + ', ' + item.actStatus + ', \'' + item.actBtnRequest + '\', ' + item.isExtracurricular + ', \'' + item.enrollEndTime + '\', \'' + item.actButton + '\');" class="to_sign_up">' + item.actButton + '</a>');
                    }
                    //					$('.to_sign_up').append('<a href="javascript:activityOperate(' + item.id + ', ' + item.actStatus + ', \'' + item.actBtnRequest + '\', ' + item.isExtracurricular + ');" class="to_sign_up">' + item.actButton + '</a>');
                }
            }
        });







        /*我要评论*/
        $('.user_to_talk').click(function(event) {
            if(!currentAccount) {
                $.alert("请先登录");
                window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
                return;
            } else {
                $('.main_content_box').hide();
                $('.user_comment_pupop').show();
            }
        });

        /*提交评论列表*/

        $('.user_comment_pupop .sure_btn').click(function(event) {
            var thisTxt = $('.user_comment_pupop .comment_write').val();
            if($.trim(thisTxt).length < 5) {
                $.alert('请输入5个字以上的评论内容');
            } else {
                $.ajax({
                    type: "get",
                    url: Qnzs.path + "/activity/comment/commentActivity",
                    data: {
                        'activityId': activityId,
                        'content': thisTxt,
                        'imgUrls': imageUrl
                    },
                    dataType: "JSON",
                    success: function(data) {
                        if(data.status == 'OK') {
                            $.alert(data.msg);
                            window.location.reload();
                            return;
                        } else {
                            $.alert(data.msg);
                        }
                    }
                })
            }
        }); /*提交评论列表end*/

    };

    activetitle();

    /*图片上传*/
    $('#file').fileupload({
        /*url: base + '/file_upload',*/
        url: Qnzs.path + '/file_upload',
        dataType: 'json',
        autoUpload: true,
        done: function(e, data) {
            $.alert('上传成功');
            //			alert(data.result.url);
            imageUrl = data.result.url;
        },
        fail: function() {
            $.alert('出错');
        }
    });

    /*图片上传*end/

    /*找活动详情end*/

    /*删除已有的评论*/
    /*$(document).on('click', '.comment_big_box .delete', function(event) {
        if (!currentAccount) {
            alert('请先登录');
            return;
        }
        var msg = confirm('你确定要删除吗？')
        if (msg == true) {
            alert('删除成功');
            $(this).parents('.item').remove();
            var item_num = $('.comment_big_box .item').length;
            $('.comment_big_box .tit_1').html('评论（' + item_num + '）');

            $.ajax({
                type: "get",
                url: Qnzs.path + "/activity/comment/delete",
                data: {
                    'activityCommentId': activityId,
                },
                dataType: "JSON",
                success: function(data) {
                    if (data.status == 'OK') {
                        alert(data.msg);
                        window.location.reload();
                    } else {
                        alert(data.msg);
                        return;
                    }
                }
            });
        }
    });*/

    /*取消评论*/
    $('.user_comment_pupop .cancel').click(function(event) {
        $('.user_comment_pupop').hide();
        $('.main_content_box').show();
    });
    /*我要评论 end */

    /*第二课堂类型的弹窗*/
    $('.sec_class_pupop .continue').click(function(event) {
        $('.sec_class_pupop').fadeOut(200);
    });

    //  下拉查看更多
//	$('.morebtn').on('click', function() {
//
//
//		pageIndex += 1;
//		talk_each_ohter();
//	})
//

    /*  活动评论列表*/
    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params= {
        activityId:activityId,
        pageIndex: pageIndex, // 当前页码(可不传，默认为1)
        pageSize: pageSize // 每页记录数(可不传，默认为10)
    };

    function renderList($listContent, list, isClear) {


        console.log(list)
        var html = '';
        for(var i = 0; i <list.length; i++) {
            var item =list[i];

            html += '<div class="item clearfix">';
            html += ' <div class="left fl">';
            html += '  <div class="imgDiv">';
            html += '   <img src="' + item.commentAccPhoto + '"/>';
            html += '  </div>';
            html += ' </div>';
            html += ' <div class="right">';
            html += '  <div class="tit">';
            html += '   <h6 class="name fl">' + item.commentAccName + '</h6>';
            html += '   <div class="date fr">';
            html += '    <span class="color999">' + item.commentTime + '</span>';
            html += '   </div>';
            html += '  </div>';
            html += '  <p class="color000 long_txt">' + item.commentContent + '</p>';
            html += '  <div class="edit clearfix">';
            html += '   <span class="Comment_list fl edit_btn"id="commentCount_' + item.id + '" onclick="getChildCommments(' + item.id + ')">评论(' + item.childCommentCount + ')</span>';
            html += '   <span class="showComment fl edit_btn" >回复</span>';

            //					html += '   <span class="Comment_list fl edit_btn"id="commentCount_' + item.id + '" onclick="getChildCommments(' + item.id + ')">评论(' + item.childCommentCount + ')</span>';
            //					html += '   <span class="Comment_list fl edit_btn"id="commentCount_' + item.id + '" onclick="getChildCommments(' + item.id + ')">评论(' + item.childCommentCount + ')</span>';
            //					html += '   <span class="Comment_list fl edit_btn"id="commentCount_' + item.id + '" onclick="getChildCommments(' + item.id + ')">查看</span>';
            //					html += '   <span class="showComment fl edit_btn" >回复</span>';
            if(item.canDel && item.canDel == true) {
                html += '   <span class="delete fl edit_btn color999" onclick="deleteActivityComment(' + item.id + ')">删除</span>';
            }
            html += '	</div>';
            html += '	<div class="commentList" id="commentList_' + item.id + '">';
            html += '  	</div>';
            html += '  <div class="show_box clearfix ">';
            html += '   <form action="" class="clearfix">';
            html += '    <textarea class="write_txt commentContent" id="commentContent_' + item.id + '" placeholder="来说两句吧！" maxlength="300"></textarea>';
            html += '    <div class="btn_box clearfix">';
            html += '   <input class="parentCommentId" type="hidden" value="' + item.id + '" />';
            html += '     <input type="button" value="提交" class="submit_btn fr color2185cf" onclick="replyActivityComment(' + item.id + ')" />';
            html += '    </div>';
            html += '   </form>';
            html += '  </div>';
            html += ' </div>';
            html += '</div>'
        }
        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }
        $listContent.append(html); // 向后添加当前内容

        //回复
        var n=1;
        $('.comment_big_box').on('click', ' .showComment', function(event) {


            $('.commentList').hide();
            if(n%2!=0){ //奇偶判断显示隐藏
                $(this).parents('.edit').siblings('.show_box').show();
            }else{
                $(this).parents('.edit').siblings('.show_box').hide();
            }
            n++;

        });

        //评论
        var m=1;
        $(document).on('click', '.comment_big_box .Comment_list', function(event) {
            $('.show_box').hide();

            if(m%2!=0){ //奇偶判断显示隐藏
                $(this).parents('.edit').siblings('.commentList').show();

            }else{
                $(this).parents('.edit').siblings('.commentList').hide();
            }
            m++;

        });

    }

    function loadList(fun, params, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params).then(function (data) {
            var list = data.rows;

            if(params.pageIndex == 1) { // 第一页
                $('#total_help').html('(' + data.total + ')'); // 帮助名称后面添加总记录数
            }

            renderList($listContent, list, isClear); // 渲染帮助列表
            if(list && list.length >= params.pageSize) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div style="text-align: center;color: #333;">全部数据加载完毕</div>');

        }).always(function () {
            params.pageIndex++; // 页码自增
            loadedFlag = true; // 设置加载完成(全局变量)
        });
    }


    loadList(indexApi.getcommentlist, params, $('.comment_big_box .content')); // 加载帮助列表并渲染页面

    var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadList(indexApi.getcommentlist, params, $('.comment_big_box .content')); // 加载帮助列表并渲染页面
        }
    });




    /*  活动评论列表end*/

});

//点击跳转到定位地址
function getDressclik(longit, lat) {
    var lng = longit; //$('#address_parent').data('lng'); // 站点经度
    var lat = lat; //$('#address_parent').data('lat'); // 站点纬度
    /*var longitude = $('#address_parent').data('longitude'); // 当前定位经度
    var latitude = $('#address_parent').data('latitude'); // 当前定位纬度*/

    if(!lng || lng == 'undefined' || !lat || lat == 'undefined' || !longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
        // $.alert('站点位置参数不能为空');
        // $.alert('站点位置定位中，请稍后...');
        return;
    }
    window.location = 'route_map.html?lng=' + lng + '&lat=' + lat + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
};

//点击跳转到定位地址
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
 * @param {Object} enrollEndTime 报名结束时间
 */
function activityOperate(activityId, actStatus, actBtnRequest, isExtracurricular, enrollEndTime, actButton) {
    var actStatusStr = getActivityProgress(actStatus);
    var nowGetTime = new Date().getTime();
    var enrollEndGetTime = new Date(enrollEndTime).getTime();
    if(!currentAccount) {
        if(6 == actStatus) {
            $.alert("很遗憾，该活动已结束，去看看其他正在报名的活动吧。");
            //			alert("活动已结束，您无法立即报名活动");
        } else if(5 == actStatus) {
            if(nowGetTime < enrollEndGetTime) { //在报名时间内
                $.alert("请先登录后再来哦！");
                window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
            } else { //在报名时间外
                $.alert("活动已进行中，您无法立即报名活动");
            }
        } else if(4 == actStatus) {
            $.alert("报名时间已结束，您无法立即报名活动");
        } else if(3 == actStatus) {
            $.alert("亲，你来晚了，已经没名额了。");
        } else if(2 == actStatus) {
            $.alert("请先登录后再来哦！");
            window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
        } else if(1 == actStatus) {
            $.alert("请先登录后再来哦！");
            window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
        } else {
            $.alert(actStatusStr);
        }
        return;

        /*alert("请先登录");
        window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
        return;*/
    } else if(!actBtnRequest) {
        if(6 == actStatus) {
            //			alert("活动已结束，您无法立即报名活动");
            $.alert("很遗憾，该活动已结束，去看看其他正在报名的活动吧。");
        } else if(5 == actStatus) {
            //			alert("活动已进行中，您无法立即报名活动");
            //			alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");//new
            if("立即报名" == actButton) {
                $.alert("报名已结束，活动已进行中，您无法报名活动");
            } else if("我要签到" == actButton) {
                $.alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");
            }
        } else if(4 == actStatus) {
            //			alert("报名时间已结束，您无法立即报名活动");
            //			alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");//new
            if("立即报名" == actButton) {
                $.alert("报名时间已结束，您无法立即报名活动");
            } else if("我要签到" == actButton) {
                $.alert("该活动不需要签到，期待活动结束后您对活动的评价哦！");
            }
        } else if(3 == actStatus) {
            $.alert("亲，你来晚了，已经没名额了。");
        } else {
            //			alert(actStatusStr);
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
                data: {
                    'activityId': activityId
                },
                dataType: "JSON",
                success: function(data) {
                    if(data.status == 'ERROR') { //不可报名
                        $.alert(data.msg);
                        return;
                    } else { //可报名
                        if(data.status == 'alert' && data.msg) { //可报名但有确认提示条件
                            if(!confirm(data.msg)) { //是否确认 为否时，不往下操作
                                return;
                            }
                        }
                        console.log('enrollPageInfo', eval(data.data));
                        window.location.href = '../find_active/baoming_second_classroom.html?activityId=' + activityId + '&orgId=' + orgId; //跳转报名页面
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
                        window.location.reload(); //刷新当前页
                    }
                }
            });
        } else if(actBtnRequest == 'sign' || actBtnRequest == 'signIn' || actBtnRequest == 'signOut') { //活动签到签退
            //			alert('请使用手机在微信端扫描活动二维码进行签到');
            /*$.ajax({
                type: "post",
                url: Qnzs.path + "/activity/sign/activitySign",
                data: {
                    'activityId': activityId,
                    'longitude': longitude,
                    'latitude': latitude,
                    'address': address
                    //	'longitude': '113.270793',
                    //	'latitude':'23.135308',
                    //	'address': 'address'
                },
                dataType: "JSON",
                success: function(data) {
                    if(data.status != 'OK') {
                        alert(data.msg);
                        return;
                    } else {
                        alert(data.msg);
                        window.location.reload(); //刷新当前页
                    }
                }
            });*/
            //			window.location.href = '../find_active/actScanSignIn.html?activityId=' + activityId + '&actType=' + actType + '&actTitle=' + actTitle + '&actTime=' + actTime + '&address=' + address + '&imageUrl=' + imageUrl; //跳转签到页面
            window.location.href = '../find_active/actScanSignIn.html?activityId=' + activityId + '&online=' + true; //跳转签到页面(在线签到，非扫码签到)
        } else if(actBtnRequest == 'mark') { //活动评分（给活动主办方评分）
            window.location.href = '../find_active/actScanMark.html?activityId=' + activityId + '&orgId=' + orgId; //弹出评分弹窗或跳转评分页面
        }
    }
}

/**
 * 活动收藏或取消收藏
 * @param {Object} activityId 活动ID
 */
function collectOrCancelActivity(activityId) {
    if(!currentAccount) {
        $.alert("请先登录");
        window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
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
                var collectStr = $('#collectBtn').text();
                if(collectStr == '收藏') {
                    $('#collectBtn').text('取消收藏');
                } else {
                    $('#collectBtn').text('收藏');
                }
                //				window.location.reload(); //刷新当前页
            }
        }
    });
}

/*
  我要举报*/
function getreport(activityId) {
    if(!currentAccount) {
        $.alert("请先登录");
        window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
        return;
    }

    $('.contshow').show();

    $('.resushu').on('click', function() {
        $('.contshow').hide();
    });

    $('#resuf_sure').on('click', function() {
        var reportType = $('#report_select option:selected').val();
        console.log(reportType);

        var reportReason = $('#report_writes').val();
        console.log(reportReason);

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
                    $('.contshow').hide();
                    return;
                } else {
                    $.alert(data.msg);
                    return;
                }
            }
        });
    })
}



/**
 * 删除活动评论
 * @param activityCommentId 活动评论ID
 * @returns
 */
function deleteActivityComment(activityCommentId) {
    if(!currentAccount) {
        $.alert('请先登录');
        window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
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
                    /*alert('删除成功');
                    $(this).parents('.item').remove();
                    var item_num = $('.comment_big_box .item').length;
                    $('.comment_big_box .tit_1').html('评论（' + item_num + '）');*/

                    window.location.reload();
                } else {
                    $.alert(data.msg);
                    return;
                }
            }
        });
    }
}

function getChildCommments(parentCommentId) {
    //评论中的评论列表
    $.ajax({
        type: "get",
        url: Qnzs.path + "/activity/comment/listByParent?parentCommentId=" + parentCommentId,
        dataType: "JSON",
        success: function(data) {
            //			$('#commentCount_' + parentCommentId).text('评论(' + data.total + ')');
            var comments = data.rows;
            var htmls = '';
            if(comments && comments.length > 0) {
                for(var i = 0; i < comments.length; i++) {
                    var item = comments[i];
                    htmls += '<div class="human clearfix" style="padding-bottom:10px">';
                    htmls += ' <div class="imgbox fl" style="margin-right: 0.26rem">';
                    htmls += '   <img src="' + item.commentAccPhoto + '" />';
                    htmls += ' </div>';
                    htmls += ' <div class="txtbox">';
                    htmls += '  <p class="one color2185cf">';
                    htmls += '   <span class="name">' + item.commentAccName + '</span>';
                    htmls += '   <span class="time">' + item.commentTime + '</span>';
                    htmls += '  </p>';
                    htmls += '  <p class="two color333 long_txt">' + item.commentContent + '</p>';
                    htmls += ' </div>';
                    htmls += '</div>';
                }
                $('#commentList_' + parentCommentId).empty();
                $('#commentList_' + parentCommentId).append(htmls);

                $(this).parents('.edit').siblings('#commentList_' + parentCommentId).fadeToggle();
            }
        }
    });
}

/**
 * 回复评论（二级评论）
 * @param parentCommentId 父活动评论ID（一级评论）
 * @returns
 */
function replyActivityComment(parentCommentId) {
    if(!currentAccount) {
        $.alert('请先登录');
        window.location.href = '../logoin/login.html?nextUrl=../find_active/hd_xiangqing.html?activityId=' + activityId;
        return;
    }

    //	var commentContent = $('.comment_big_box .show_box  .commentContent').val();
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

/*//分享标题
title = item.title;
// 分享描述
desc = item.summary;
// 分享图标
img = item.imageUrl;*/
/**
 * 活动分享转发预加载
 * @param shareActivityId 分享标题
 * @param shareTitle 分享标题
 * @param shareSummary 分享描述
 * @param shareImg 分享图标
 * @returns
 */
function shareActivity(shareActivityId, shareTitle, shareSummary, shareImg) {
    //	var shareUrl = Qnzs.domain + '/wechat/view/find_active/hd_xiangqing.html?activityId=' + shareActivityId;
    var shareUrl = window.location.href;
    // console窗口打印一下入参
    console.log("link=" + shareUrl + ", title=" + shareTitle + ", imgUrl=" + shareImg + ", desc=" + shareSummary);
    var currUrl = window.location.href;
    console.log("currUrl=" + currUrl);
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
                    $.alert(res.errMsg);
                });
            });
        },
        error: function() {
            $.alert('ajax request failed!!!');
            return;
        }
    });

}

function changeStatus() {
    var oauthStatus = $.cookie('hdOauthStatus');
    oauthStatus = Number(oauthStatus) + 1;
    $.cookie('hdOauthStatus', oauthStatus);
}

//判断当前是否是微信内置浏览器
function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}