var currentAccount = "";


/**
 * 生成星星的html字符串
 * @param starStr {int} 星级分数(eg. 4.5)
 * @returns {string}
 */
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

    for(var j=0; j<5; j++) {
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

$(document).ready(function() {


    var link = Utils.getQueryString('link'); // 链接名称
    if(link && link == 'complain') { // 点击'我要吐槽'跳转过来
        var tabIndex = 6; // '我要吐槽'
        $('.gerenBox .leftNav .item').removeClass('cur').eq(tabIndex).addClass('cur'); // 高亮'我要吐槽'选项卡
        $('.rightBoxList').eq(tabIndex).show().siblings('.rightBoxList').hide();
    }

    Qnzs.getSessionAccount({}).then(function (data) {
        if(data.status == 'ALERT') { // 用户没有登录
            $.alert(data.msg);
            return;
        }

        // 用户的组织类型
        var userOrgName = {
            '0': '超级管理员',
            '1': '系统管理员',
            '2': '组织管理员',
            '3': '公众用户'
        };
        var account = data.account; // 用户信息
        var imgUrl = account.photoUrl ? account.photoUrl.split(',')[0] : '../../public/img/default_avator.png';
        // 用户已登录
        $('#realname').text(account.realname); // 用户名称
        $('#orgTypeName').text(userOrgName[account.orgType]); // 用户组织类型
        if(account.orgType == 3 && account.type == 3){
            $('#orgTypeName').text("专家");
        }
        $('#imgUrl').attr('src', Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_150,w_150')); // 用户头像

        // 个人用户
        if(account.orgType == 0 || account.orgType == 1 || account.orgType == 2) { // 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
            $('.administrator .changeIdentity').text('切换成个人');
            $('.consultant_tutor').hide();

        }else {
            $('.administrator .changeIdentity').text('切换成管理员');

        }

        if(account.oid) { // 有管理员身份
            // 显示 '切换账户'项
            $('.gerenBox .leftNav .administrator').show();
        }

    });

    // 点击 '切换账户'项
    $('.gerenBox').on('click', '.leftNav .administrator', function () {
        // 获取账户信息
        Qnzs.getSessionAccount({}).then(function (data) {
            var account = data.account;
            if(!account.oid) {
                $.alert('本账户不拥有管理者身份');
                return;
            }

            // orgType 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
            if(account.orgType == 3) { // 个人用户
                // status 状态(0-组织角色，1-个人角色)
                PersonCenterApi.changeAccountRole({status: 0}).then(function (data) {
                    $.alert(data.msg).then(function () {
                        window.location.reload(); // 刷新当前页面
                    })
                });
            }else{
                // status 状态(0-组织角色，1-个人角色)
                PersonCenterApi.changeAccountRole({status: 1}).then(function (data) {
                    $.alert(data.msg).then(function () {
                        window.location.reload(); // 刷新当前页面
                    })
                });
            }

        });
    });


    $.ajax({
        type: "POST",
        url: Qnzs.path + "/commons/getSessionAccount",
        dataType: "JSON",
        success: function(data) {

            if (data.status != 'OK') {
                alert(data.msg);
                return;
            } else {
                currentAccount = data.account; // 账户信息
                console.log('currentAccount', currentAccount);
            }
        }
    });

    $('#my_join').on('click', function() { //点击参与加载数据

        getEnrolledList();
    });


    $('#my_collection').on('click', function() { //点击收藏加载数据

        my_collect_act();
    });


    $('#second_classroom').on('click', function() { //点击第二课堂加载数据

        second_class_table();
    });

    /*---我的参与---*/
    function getEnrolledList() {
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
            url: Qnzs.path + "/personalCenter/offlineActivity/enrolledList",
            dataType: 'json',
            success: function(data) {
                var data = data.rows;
                var html = '';
                if(data != null && data.length > 0){
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        html += '<li class="clearfix list_content bgcWhite">'
                        html += ' <a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.id + '">'
                        html += '  <div class="content_box borderB01 clearfix">'
                        html += '   <div class="zhd_l fl">'
                        html += '   <p class="img01">' + actStatus[item.actStatus] + '<p>'
                        html += '    <img src="' + Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_126,w_188') + '"  alt="" />'
                        html += '   </div>'
                        html += '   <div class="zhd_r">'
                        html += '    <h3 class="font16 color000">' + item.title + '</h3>'
                        html += '    <p class="font12 zhd_style p01">' + item.type + '</p>'
                        html += '    <p class="font12 color999 zhd_time">' + item.activityTime + '</p>'
                        html += '    <p class="font12 color999 zhd_adress">' + item.address + '</p>'
                        html += '   </div>'
                        html += '   <span class="conBgc01 font12 colorfff atctivs">' + actStatus[item.actStatus] + '</span>'
                        html += '  </div>'
                        html += ' </a>'
                        html += '</li>'
                    }

                    $('.my_join_content .act_list').empty(); //加载之前清空之前的数据
                    $('.my_join_content .act_list').append(html);
                    $('.my_join_content .content_box:last').removeClass('borderB01');
                }
                else{
                    $('.my_join_content .act_list').empty();
                    $('.my_join_content .act_list').append('<p>无数据</p>')
                }
            }

        });



    }getEnrolledList();

    // 个人中心-我的参与 -重磅项目
    function list_server1(data) {
        var html = ''
        for (var i = 0; i < data.length; i++) {
            html += '<div class="bgcWhite" style="padding:10px; width:428px; float:left;margin-right:20px;margin-bottom:20px;">'
            if(data[i].externalLinksPc == '' || data[i].externalLinksPc == null){
                if (data[i].templateName == "model1") {
                    html += '<a href="../heavy_project/heavy_project_model1_index.html?activityId=' + data[i].id + '" target="_blank">'
                } else {
                    html += '<a href="../heavy_project_model2/zbxm_index_model_2.html?activityId=' + data[i].id + '" target="_blank">'
                }
            }else{
                html += '<a href="' + data[i].externalLinksPc + '" target="_blank">'
            }
            html += '  <div class="imgDiv"><img src="' + Utils.compressByAli(data[i].bannerUrl, '?x-oss-process=image/resize,m_mfit,h_180,w_452') + '" /></div>'
            html += '  <div class="botTxt clearfix" style="padding:0;">'
            html += '   <span class="span01 fl">' + data[i].type + '</span>'
            html += '   <span class="span02 fl">' + data[i].title + '</span>'
            //项目进行阶段（1未开始、2报名中、3投票中、4活动结束、5报名投票同时进行中，2/3/4为活动进行中）
            //未开始  startTime - now
            //报名中  endTime - startTime
            //投票中  voteEndTime - voteStartTime
            if (data[i].stage == 1) {
                var bigTime = new Date(data[i].startTime).getTime();
                var smaTime = new Date().getTime();
                var diffDate = diffDateTime(bigTime, smaTime);
                html += '    <span class=" fr" style="color: #33cc33; margin-top:10px;">未开始&nbsp;' + diffDate + '后</span>';
            } else if (data[i].stage == 2 || data[i].stage == 5) { // 报名中
                var bigTime = new Date(data[i].endTime).getTime();
                var smaTime = new Date(data[i].startTime).getTime();
                var diffDate = diffDateTime(bigTime, smaTime);
                html += '    <span class=" fr" style="color: #33cc33; margin-top:10px;">报名中&nbsp;剩' + diffDate + '</span>';
            } else if (data[i].stage == 3) {
                var bigTime = new Date(data[i].voteEndTime).getTime();
                var smaTime = new Date(data[i].voteStartTime).getTime();
                var diffDate = diffDateTime(bigTime, smaTime);
                html += '    <span class=" fr" style="color: #33cc33; margin-top:10px;">投票中&nbsp;剩' + diffDate + '</span>';
            } else {
                html += '    <span class=" fr" style="color: #ccc; margin-top:10px;">已结束</span>';
            }
            html += '  </div>'

            html += '  <div class="botTxt clearfix" style="padding:0;">'
            html += '   <span class="span02 fl">[' + data[i].apStatus + ']作品标题：' + data[i].projectName + '</span>'
            if (data[i].apStatus == '待审核') {
                html += '<a href="../heavy_project/editProject.html?projectId=' + data[i].apId + '&activityId=' + data[i].id + '" class=" fr" style=" margin-top:10px;" target="_blank">&nbsp;/&nbsp;修改</a>';
            }
            html += '    <a href="../heavy_project/projectShow.html?projectId=' + data[i].apId + '&activityId=' + data[i].id + '"class=" fr" style=" margin-top:10px;" target="_blank">查看</a>';
            html += '   </div>'
            html += ' </a>'
            html += '</div>'
        }
        return html;
    }
    var data_zbxm= {
        'pageNo':1,
        'pageSize':6
    };
    pageCheck('.activityList', '.activityListHtmlStatic', PersonCenterApi.getmyTack_zhxm,data_zbxm,list_server1);

    //个人人中心-我的发布-重磅项目
    function heavy_send() {
        obj.ajax('/project/myReleaseActivityList', {}, function(data) {
            createEle(data.dataList); //  传递参数
        });

        function createEle(data) {
            var html = '';

            for (var i = 0; i < data.length; i++) {
                html += '<div class="bgcWhite fl zbxm_box">'
                if(data[i].externalLinksPc == ''){
                    if (data[i].templateName == "model1") {
                        html += '<a href="../heavy_project/heavy_project_model1_index.html?activityId=' + data[i].id + '" target="_blank">'
                    } else {
                        html += '<a href="../heavy_project_model2/zbxm_index_model_2.html?activityId=' + data[i].id + '" target="_blank">'
                    }
                }else{
                    html += '<a href="' + data[i].externalLinksPc + '" target="_blank">'
                }
                html += '  <div class="imgDiv"><img src="' + Utils.compressByAli(data[i].bannerUrl, '?x-oss-process=image/resize,m_mfit,h_235,w_407') + '" /></div>'
                html += '  <div class="botTxt clearfix">'
                html += '   <span class="xm_style span01 fl">' + data[i].type + '</span>'
                html += '   <span class="font16 span02 fl">' + data[i].title + '</span>'
                html += '   <div class="r fr clear">'
                html += '    <em class="xm_state   em01 colorfff conBgc01 fl" style="display:none;">剩</em>'
                html += '    <em class="em02 color000 fr"></em>'
                html += '   </div>'
                html += '  </div>'
                html += ' </a>'
                html += '</div>'
            }
            $('.my_release_content .imgList').append(html);
            $('.my_release_content .imgList>div:even').addClass('fl');
            $('.my_release_content .imgList>div:odd').addClass('fr');
        }
    }
    heavy_send();

    /**
     * 分页插件封装函数
     * @param parentCell {string} 分页器的父容器
     * @param contentCell {string} 包裹数据列表的父容器
     * @param api {function} 接口函数
     * @param params {string} 接口参数
     * @param listFun {function} 数据列表函数 -- 返回html字符串
     */
    function pageCheck(parentCell, contentCell, api, params, listFun) {
        $(parentCell).pageFun({
            contentCell: contentCell,
            /*包裹数据列表的父容器*/
            maxPage: 6,
            /*显示页码框个数*/
            apiProxy: api,
            /*接口函数*/
            data: params,
            /*接口参数*/
            listFun: listFun /*数据列表函数 -- 返回html字符串*/
            // arg: arg  /*数据列表函数 的参数-可以是对象或数组等等*/
        });
    }


    // 帮助状态对应名称
    var auditStatusName = {
        '0': '处理中',
        '1': '求助中',
        '2': '已解决',
        '3': '等待处理',
        '4': '删除',
        '5': '退回',
        '6': '组织帮助中'
    };

    //我的发布 帮助
    function my_release_help(list) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var createTime = new Date(item.createTime).format('yyyy-MM-dd'); // 1498140055000
            var imgUrl = '../../public/img/default_img.png';
            if (item.imgUrl) {
                imgUrl = item.imgUrl.split(',')[0]; // 默认获取第一张图片
            }

            html += '<a href="../find_help/detail.html?id=' + item.hpId + '" class="disB itemBox bgcWhite">';
            html += ' <div class="itemCon borderB01 clearfix">';
            html += '  <div class="imgDiv fl">';
            html += '   <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_140,w_210') + '">';
            html += '  </div>';
            html += '  <div class="rightTxt">';
            html += '   <div class="top">';
            html += '    <span class="colorfff" style="display: inline-block;vertical-align: top;height: 22px;line-height: 22px;">' + auditStatusName[item.auditStatus] + '</span>';
            html += '    <h3 class="color000 font16" style="display: inline-block;vertical-align: top;height: 22px;line-height: 22px;">《' + item.title + '》</h3>';
            html += '   </div>';
            html += '   <div class="longTxt color999">' + item.helpContent + '</div>';
            html += '   <div class="middle color000">';
            html += '    <span class="left borderR01">受理方：' + item.acquirerRealName + '</span>';
            html += '    <span class="right">求助类型：' + item.helpType + '</span>';
            html += '   </div>';
            html += '   <div class="bottom clearfix color000">';
            html += '    <span class="span02 fl">' + item.countPost + '</span>';
            html += '    <span class="span03 fl">' + createTime + '</span>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }

        return html;
    }

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function(data) {
        if (data && data.account && data.account.username) {
            var params_release_help = {
                applicant: data.account.username,
                page: 1,
                rows: 8,
                sort: 'create_time',
                order: 'desc'
            };
            pageCheck('.my_release_content .list02', '.pageList', PersonCenterApi.fingHelpByUser, params_release_help, my_release_help);
        }
    });

    //我的发布线下服务
    function my_release_xxfw(list) {
        // var num = 3;
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var imgUrl = item.stationImg ? item.stationImg : '../../public/img/default_avator.png';

            html += '<div class="item clearfix bgcWhite">';
            html += ' <div class="imgDiv fl">';
            html += '  <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" />';
            html += ' </div>';
            html += ' <div class="rightTxt">';
            html += '  <h3 class="color000 font14">' + item.quesTitle + '</h3>';
            html += '  <p class="p01 color999">' + item.applyTime + '</p>';
            html += '  <div class="botBox clearfix">';
            html += '   <p class="P02 color666 fl">预约站点：' + item.stationName + '</P>';
            html += '   <button class="fr conBgc01 colorfff">' + item.statusStr + '</button>';
            html += '  </div>';
            html += ' </div>';
            html += '</div>';
        }
        // $('.my_release_content .list03 .pageList').append(html);
        return html;
    }
    //我的发布线下服务end


    var params_release_application = {
        pageNo: 1,
        pageSize: 8
    };
    pageCheck('.my_release_content .list03', '.pageList', PersonCenterApi.getMyApplications, params_release_application, my_release_xxfw);
    /*我的发布  end  */

    /*我的关注*/
    /* 活动*/
    function my_focus_act() {
        $.ajax({
            type: "get",
            url: base + "/activity/publisher/list",
            dataType: 'json',
            success: function(data) {
                var html = ''
                var data = data.dataList;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    var oid = item.oid; //组织id
                    html += '<a href="javascript:;" class="bgcWhite guanzhu_list clearfix fl">'
                    html += ' <div class="imgDiv fl guanzhu_l">'
                    html += '  <img src="' + Utils.compressByAli(item.photoUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_100') + '" />'
                    html += ' </div>'
                    html += ' <div class="rightTxt fl guanzhu_r">'
                    html += '  <div class="titBox">'
                    html += '   <p class="font14 color000">' + item.name + '</p>'
                    html += '  </div>'
                    html += '  <div class="scoreBox clearfix">'
                    html += '   <ol class="clearfix fl"></ol>'
                    html += '   <span class="fl scoreColor01 font14 fenshu"><em>' + item.activityAverageScore.toFixed(1) + '</em>分</span>'
                    html += '   <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span>'
                    html += '  </div>'
                    html += '  <span class=" font12 color000">TA的活动（' + item.publishActivityCount + '）</span>'
                    html += ' </div>'
                    html += '</a>'
                }
                $('.my_focus_act').append(html);
            }
        });
    }
    my_focus_act();
    /* 活动end*/

    /*  求助*/
    var username = '';
    function my_focus_qiuzhu(list) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.photoUrl ? item.photoUrl : '../../public/img/default_avator.png';
            html += '<a href="../organization/organization_detail.html?oid=' + item.oid + '" class="bgcWhite guanzhu_list clearfix fl">';
            html += ' <div class="imgDiv fl guanzhu_l">';
            html += '  <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_100') + '" />';
            html += ' </div>';
            html += ' <div class="rightTxt fl qiuzhu_r">';
            html += '  <p class="font14 color000">' + item.fullName + '</p>';
            html += '  <p class="wenti">已受理求助' + item.acquirerCount + '次</p>'; // 已受理求助次数
            html += '  <span class="conBgc01 font12 colorfff tiwen">向TA提问</span>';
            html += ' </div>';
            html += '</a>';
        }
        return html;
    }

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function(data) {
        if (data && data.account && data.account.username) {
            var params_focus_organization = {
                username: data.account.username,
                page: 1,
                rows: 8,
                sort: 'create_time',
                order: 'desc'
            };
            pageCheck('.my_attention_content .guanzhu.qiuzhu', '.my_focus_qiuzhu', PersonCenterApi.helpAttention, params_focus_organization, my_focus_qiuzhu);
        }
    });


    /*  求助end*/

    /* 线下服务*/
    function my_focus_xxfw(list) {
        var html = '';
        // var num = 3;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.imageUrl ? item.imageUrl : '../../public/img/default_avator.png';
            html += '<a href="../young_family/detail.html?staId=' + item.staId + '" class="bgcWhite service_list clearfix fl">';
            html += ' <div class="fl service_l">';
            html += '  <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" />';
            html += ' </div>';
            html += ' <div class="fl service_r">';
            html += '  <p class="font14 color000">' + item.fullName + '</p>';
            html += '  <div class="scoreBox clearfix">';
            html += '   <ol class="clearfix fl"></ol>';
            html += '   <span class="fl scoreColor01 font14 fenshu"><em>' + item.star + '</em>分</span>';
            html += '   <span class="pinglun font12 color999 fl">' + item.evaluationNum + '人已评</span>';
            html += '   <span class="font12 color000 fl">' + item.concernNum + '人关注</span>';
            html += '  </div>';
            html += '  <p class="font12 color666 adress">' + item.address + '</p>';
            html += '  <span class="conBgc01 font12 colorfff yuyue">预约服务</span>';
            html += ' </div>';
            html += '</a>';
        }
        return html;
    }
    // my_focus_xxfw();
    var params_focus_application = {
        pageNo: 1,
        pageSize: 8
    };
    pageCheck('.my_attention_content .guanzhu.service', '.my_focus_xxfw', PersonCenterApi.myConcernStations, params_focus_application, my_focus_xxfw);

    /*线下服务end*/
    /*我的关注 end*/


    /*我的评价*/
    /*  活动*/
    function helping(data) {
        var html ='';
        for(var i=0; i < data.length; i++) {
            var item = data[i];
            html+='<li class="item">'
            html+=' <a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.objectId+ '" class="disB item_con clearfix">'
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+ Utils.compressByAli(item.markAccPhoto, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" class="pic" />'
            html+='  </div>'
            html+='  <div  class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.markAccName+'</h1>'
            html+='    <span class="fr color666" style="float: left;margin-left:70%">'+item.markTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'

            var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+item.score+'</em>分</span>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.remark+'</p>'
            html+='   <p class="color666">活动：'+item.title+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
        }
        return html;
    }
    var params_marklist= {
        'pageIndex':1,
        'pageSize':10,
        'type':2
    };
    pageCheck('.my_comonet .list01', '.my_colleactivty',PersonCenterApi.changemarklist, params_marklist, helping);


    /* 求助*/
    function list_helpe(data) {
        var html ='';
        for(var i=0; i < data.length; i++) {
            var item = data[i];
            html+='<li class="item">'
            html+=' <a href="../../view/find_help/detail.html?id='+item.objectId+'" class="disB item_con clearfix">'
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+ Utils.compressByAli(item.markAccPhoto, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" class="pic" />'
            html+='  </div>'
            html+='  <div class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.markAccName+'</h1>'
            html+='    <span class="fr color666" style="float: left;margin-left:70%">'+item.markTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'

            var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+item.score+'</em>分</span>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.remark+'</p>'
            html+='   <p class="color666">活动：'+item.title+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
        }
        return html;

    }
    var params_mark= {

        'pageIndex':1,
        'pageSize':10,
        'type':1
    };
    pageCheck('.my_comonet .list02', '#list_helpe',PersonCenterApi.changemarklist,params_mark,list_helpe);

    /* 在线服务*/
    function list_server(data) {
        var html ='';
        for(var i=0; i < data.length; i++) {
            var item = data[i];
            html+='<li class="item">'
            html+=' <a href="../young_family/detail.html?staId=' +item.stationId+ '" class="disB item_con clearfix">'
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+ Utils.compressByAli(item.applicantPhoto, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" class="pic" />'
            html+='  </div>'
            html+='  <div style="padding-left:0px;width:864px;margin-left:100px;" class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.applicantName+'</h1>'
            html+='    <span class="fr color666" style="float: left;margin-left:70%">'+item.applyTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'

            var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+item.score+'</em>分</span>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.evaluate+'</p>'
            html+='   <p class="color666">服务全称：'+item.stationName+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
        }
        return html;

    }
    var params_server= {
        'pageNo':1,
        'pageSize':10
    };


    pageCheck('.my_comonet .list03', '#list_sever',PersonCenterApi.MyApplications,params_server,list_server);
    /*我的评价end*/
    /*我的收藏*/
    function my_collect_act() {
        var actStatus = {
            '1': '活动预告',
            '2': '报名中',
            '3': '已满员',
            '4': '报名结束',
            '5': '活动中',
            '6': '活动结束'
        };

        if (!currentAccount) {
            alert('请先登录!')
        } else {
            $.ajax({
                type: "get",
                url: Qnzs.path + "/personalCenter/offlineActivity/collectedList",
                dataType: 'json',
                success: function(data) {
                    var data = data.rows;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        html += '<li class="clearfix list_content bgcWhite">'
                        html += ' <a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.id + '">'
                        html += '  <div class="content_box borderB01 clearfix">'
                        html += '   <div class="zhd_l fl">'
                        html += '   <p class="img01">' + actStatus[item.actStatus] + '<p>'

                        html += '    <img src="' + Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_126,w_188') + '"  alt="" />'
                        html += '   </div>'
                        html += '   <div class="zhd_r">'
                        html += '    <h3 class="font16 color000">' + item.title + '</h3>'
                        html += '    <p class="font12 zhd_style p01">' + item.type + '</p>'
                        html += '    <p class="font12 color999 zhd_time">' + item.activityTime + '</p>'
                        html += '    <p class="font12 color999 zhd_adress">' + item.address + '</p>'
                        html += '   </div>'
                        html += '   <span class="conBgc01 font12 colorfff atctivs">' + actStatus[item.actStatus] + '</span>'
                        html += '  </div>'
                        html += ' </a>'
                        html += '</li>'
                    };
                    $('.my_collect_act').append(html);

                }
            });

        }

    }


    // function my_collect_zixun() {
    // 	var html = ''
    // 	var num = 3;
    // 	for (var i = 0; i < num; i++) {
    // 		html += '<a href="javascript:;" class="itemBox bgcWhite ">'
    // 		html += ' <div class="itemCon borderB01 clearfix">'
    // 		html += '  <div class="imgDiv fl">'
    // 		html += '   <img src="../../resources/pcImages/person01.png">'
    // 		html += '  </div>'
    // 		html += '  <div class="rightTxt">'
    // 		html += '   <h3 class="font16 color2185cf">如何更好的去忘掉一个人？</h3>'
    // 		html += '   <p class="color000">幸福不同于心情和稍纵即逝的情绪。</p>'
    // 		html += '   <div class="botBox clearfix">'
    // 		html += '    <div class="left fl">'
    // 		html += '     <span class="span01 borderR01">桃子</span>'
    // 		html += '     <span class="span02">情感婚恋</span>'
    // 		html += '     <span class="span03">2016-09-20</span>'
    // 		html += '    </div>'
    // 		html += '    <span class="right fr color333 pinglun">317</span>'
    // 		html += '   </div>'
    // 		html += '  </div>'
    // 		html += ' </div>'
    // 		html += '</a>'
    // 	};
    // 	$('.my_collect_zixun').append(html)
    // }
    // my_collect_zixun();
    /*我的收藏 end*/

    /*我要吐槽*/

    // $('#submitComplain').click(function() {
    //
    // 		var quesContent = $('#quesContent').val()
    // 		FindConsultApi.woyaoTucao({
    // 			quesContent: quesContent
    // 		}).then(function(data) {
    //
    // 		})
    // 	//}
    // })

    /*我要吐槽END*/


    /*第二课堂*/
    function second_class_table(academicYear) {
        if (!currentAccount) {
            $.alert('请先登录!');
        } else {
            console.log('academicYear', academicYear);
            /*成绩单信息*/
            $.ajax({
                type: "get",
                //				url:Qnzs.path +"/personalCenter/extracurricular/list?academicYear="+yearid,
                url: Qnzs.path + "/personalCenter/extracurricular/list",
                data: {
                    'academicYear': academicYear
                },
                dataType: 'json',
                success: function(data) {
                    $('.info_list').empty();
                    $('.TypeHour').empty();
                    $('.TotalHour').empty();
                    //$('.second_classroom .table tr').empty();
                    if (data.status != 'OK') {
                        $.alert(data.msg);
                        $('.not_done').show();
                        return;
                    } else {
                        $('.be_done').show();;
                        var itmp = data.data;
                        var TypeHour = data.data.perExtraTypeHour;

                        $('.info_list').append('<span class="info_item">姓名：' + itmp.name + '</span><span class="info_item">学号：' + itmp.stuNo + '</span><span class="info_item">学校：' + itmp.school + '</span><span class="info_item">院系：' + itmp.academy + '</span>')

                        $.each(TypeHour, function(index, item) {
                            $('.TypeHour').append('<h3 class="table_title fl font16 color2185cf">' + item.extracurricularTypeName + '：' + item.perExtraTypeHour + '</h3>');
                        });


                        $('.TotalHour').append('<h3 class="table_title fl font16 color2185cf">学年总学时：' + itmp.academicYearTotalHour + '</h3><h3 class="table_title fl font16 color2185cf">总学时：' + itmp.totalHour + '</h3>');

                        var html = ''
                        var gradesList = data.data.gradesList;

                        html += '<tr>';
                        html += '	<th>活动时间</th>';
                        html += '	<th>活动名称</th>';
                        html += '	<th>类型</th>';
                        html += '	<th>学时(h)</th>';
                        html += '</tr>';
                        if (gradesList && gradesList.length > 0) {
                            for (var i = 0; i < gradesList.length; i++) {
                                var List = gradesList[i];
                                html += '<tr>'
                                html += '	<td>' + List.activityTime + '</td>'
                                html += '	<td>' + List.title + '</td>'
                                html += ' 	<td>' + List.extracurricularTypeName + '</td>'
                                html += ' 	<td>' + List.extracurricularHour + '</td>'
                                html += '</tr>'
                            };
                        } else {
                            html += '<tr>'
                            html += ' 	<td  colspan="4">暂无成绩</td>'
                            html += '</tr>'
                        }
                        $('.second_classroom .table').empty();
                        $('.second_classroom .table').append(html);
                    }
                }
            });
            /*成绩单信息end*/
        }
    }


    //第二课堂学年成绩查询
    $('#academicYearSearch').click(function() {
        var yearStr = $('#select_Year option:selected').val();
        var yearid = yearStr.substr(0, 4);
        second_class_table(yearid);
    });


    //导出下载成绩单Excel
    $('#transcriptExport').on('click', function() {
        var yearStr = $('#select_Year option:selected').val();
        var yearid = yearStr.substr(0, 4);
        window.location.href = Qnzs.path + "/personalCenter/extracurricular/export?academicYear=" + yearid;
    })


    //预览成绩单PDF
    $('#transcriptPreview').on('click', function() {
        window.open("../../view/second_class/second_transcripts.html", "_blank");
//		window.location.href = "../../view/second_class/second_transcripts.html";
    })

    /*下载成绩单end*/


    /*第二课堂end*/

    // $('.rightBoxList:not(:first)').hide();

    $('.gerenBox .leftNav .item:last .divOut').css('border-bottom', '0');
    // $('.big_nav .item:first').addClass('cur')
    $('.gerenBox .leftNav .item').click(function(event) {
        $(this).addClass('cur').siblings('.item').removeClass('cur');
        var thisN = $(this).index() + 1;
        $('.rightBoxList').eq($(this).index()).show().siblings('.rightBoxList').hide();
    });
    $('.ask_and_answer .rightBoxList').each(function(index, el) {
        $(el).find('.askTit h3').click(function(event) {
            $(this).addClass('color2185cf').siblings('h3').removeClass('color2185cf');
            $(el).find('.list').eq($(this).index()).show().siblings('.list').hide();
        });
    });

    /*个人中心——我的关注——咨询列表——组织/专家-切换*/
    $(".zixun_t h4").click(function() {
        var index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parent('.zixun_t').siblings('.zixun_b').css("display", "none");
        $(this).parent('.zixun_t').siblings('.zixun_b').eq(index).css("display", "block");
    });

    /*性别*/
    $('.pubBox.sex select').change(function(event) {
        var sexTxt = $('.pubBox.sex select option:selected').text();
        $('.pubBox.sex p').text(sexTxt);
    });

    for (var i = 0; i < 5; i++) {
        $('.scoreBox ol').append('<li><span></span></li>')
    }

    /*---------------页码指示---------------*/

    $('.pageNumBox .pageNum a').click(function(event) {
        $(this).addClass('cur').siblings('a').removeClass('cur');
    });

    $('.scoreBox').each(function(index, el) {
        var num = $(el).find('.fenshu em').text();
        var numZ = Math.floor(num);
        var numX = ((num - numZ).toFixed(1));
        $(el).find('li:gt(' + numZ + ')').children('span').hide();
        $(el).find('li').eq(numZ).children('span').css('width', numX * 100 + '%');
    });

    /******************  修改密码-zhu  *******************/


    /** 判断用户是否登录 ***/

    obj.ajax('/commons/getSessionAccount', {}, function(data) {
        // $('#realname').html(data.account.realname);  //用户名称
        if (data) {
            username = data.account.username;
            // data.account=data.account;
            if (data.account.type == 3) {
                $('.check_techer').show()   //显示专家标志
                $('.apply-teach-box').hide();    //隐藏申请导师按钮
                $('#add_techer').hide()    //隐藏新增按钮
                $('#upd_techer').show()    //显示修改按钮
                $('.cancel2').show()    //显示2取消按钮
                $('.cancel1').hide()    //显示2取消按钮
            } else {
                $('.check_techer').hide()   //显示专家标志
                $('.apply-teach-box').show();    //显示申请导师按钮
                $('#add_techer').show()    //显示新增按钮
                $('#upd_techer').hide()    //隐藏修改按钮
                $('.cancel2').hide()    //显示2取消按钮
                $('.cancel1').show()    //显示1取消按钮

            }
        }


    }, function(data) {})

    $('#updatePsd').click(function() {
        if ($('#newPassword').val() == $('#confirmPassword').val()) {
            obj.ajax('/bg/account/updatePassword', {
                'oidPassword': $('#oidPassword').val(), //旧密码
                'newPassword': $('#newPassword').val(), //新密码
                'usernames': username //用户ID
            }, function(data) {
//				console.log(data);
                if (data.status == 'OK') {
                    $.alert(data.msg);
                    window.location.href = '../../index.html';
                } else {
                    $.alert(data.msg);
                };
            }, function() {});
        } else {
            $.alert('密码和重置密码不一致！')
        }
    })

    // /************************************************************   咨询导师 -zhu   ********************************************/
    $('#teacher').click(function() { //divOut


        obj.ajax('/commons/getSessionAccount', {///bg/accountExpert/findAccountById   ///commons/getSessionAccount
//
        }, function(data) {
            console.log(data);
//
            if(data.account.type ==3){


                obj.ajax('/bg/accountExpert/findAccountById',{'usernames':username},function(data){


                    console.log(data);
                    //判断是否为咨询导师    3为咨询导师
                    $('.become_teacher').css('display','block');
                    categoryId =data.rows.categoryId  //服务类别

                    $('.realname').val(data.rows.experName); //用户名
                    $('.expProfession').val(data.rows.expProfession) //职业

                    $('.speciality').val(data.rows.speciality) //专业特长
                    //	 			$('.gender').val(data.rows.gender) //性别
                    $('.typeDistrict').val(data.rows.typeDistrict); //typeDistrict;//用户地域归属类型（1-地市，2-高校）
                    $('.description').val(data.rows.introduction) //自我描述
                    /***** 服务类别  ******/
                    obj.ajax('/pc/service/getServiceCategory',{},function(data){
                        console.log(data);
                        var html = '';
                        for(var i =0 ;i<data.rows.length;i++ ){

                            html+='<option  value="'+data.rows[i].caId+'">'+data.rows[i].name+'</option>'
                        }
                        $('.categoryId').append(html);
                        $('#categoryId').val(categoryId)   //服务类别     注意要在动态创建后才可以回显

                    },function(data){})
                })


            }else {
                $('.become_teacher').css('display','none');
                $('.apply-teach-box').css('display','block');  //显示成为咨询导师的按钮
                obj.ajax('/bg/accountExpert/checkExpert',{},function(data){
                    if(data.status==0){
                        $('#apply_teacher_btn').hide()
                        $('#apply_er').show();
                    }
                })
            }
        });
        obj.ajax('/bg/accountExpert/findAccountById',{},function(data){},function(data){});
    });


    /**** 咨询导师- 新增 *****/

    $('#add_techer').click(function(){
        var areaAndclass ='';
        var areaAndclass1 = $('#cityOid option:selected').val() ;
        var areaAndclass2 = $('#shcoolOid option:selected').val();
        if($('#oidType').val() !=''){
            if(areaAndclass1!='-1'){
                areaAndclass =areaAndclass1 ;
            }
            if(areaAndclass2 !='-1'){
                areaAndclass =areaAndclass2 ;
            }
            if(areaAndclass ==''){
                $.alert('请完善所属地区资料');
                return;
            }
        }else{
            $.alert('请完善地区高校信息！');
            return ;
        }

        //测试地区编码440303   CJJDX
        var areaAndclass ;
////
        var oArea =  $('#oidType option:selected').val();     //获取地区或高校
        var areaAndclass1 = $('#areaOid option:selected').val() ;
        var areaAndclass2 = $('#classOid option:selected').val();
        var cityAndshcool1 = $('#cityOid option:selected').val() ;  //地址
        var cityAndshcool2 = $('#shcoolOid option:selected').val();  //高校
////
        if(areaAndclass1!='-1'){
            areaAndclass =areaAndclass1 ;
        }
        if(areaAndclass2 !='-1'){
            areaAndclass =areaAndclass2 ;
        }
        if(cityAndshcool1!='-1'){
            areaAndclass =cityAndshcool1 ;
        }
        if(cityAndshcool2 !='-1'){
            areaAndclass =cityAndshcool2 ;
        }
//        console.log(areaAndclass);

        obj.ajax('/bg/accountExpert/addExpert', {
            'did':areaAndclass,     //测试地区编码440303   CJJDX
            'speciality': $('.speciality').val(),   //专业特长
            'accountExpert': $('.expProfession').val(),  //职业
            'introduction': $('.description').val(),   //自我描述
            'categoryId':$('.categoryId option:selected').val() ,   //服务类别
            'realname':$('.realname').val(),    //用户名
            'expertUrl':$('#opload_img').val()   //上传附件
        }, function(data) {
            console.log(data)
            if (data.status == 'OK') {
                alert(data.msg);
                window.location.href = 'person_center.html';
            } else {
                alert(data.msg);
            }
        }, function(data) {});

    })




    /**** 咨询导师- 修改 ****/
    $('#upd_techer').click(function() {
        //测试地区编码440303   CJJDX
        var areaAndclass ;
        var oArea =  $('#oidType option:selected').val();     //获取地区或高校
        var areaAndclass1 = $('#areaOid option:selected').val() ;
        var areaAndclass2 = $('#classOid option:selected').val();
        var cityAndshcool1 = $('#cityOid option:selected').val() ;  //地址
        var cityAndshcool2 = $('#shcoolOid option:selected').val();  //高校
        if(areaAndclass1!='-1'){
            areaAndclass =areaAndclass1 ;
        }
        if(areaAndclass2 !='-1'){
            areaAndclass =areaAndclass2 ;
        }
        if(cityAndshcool1!='-1'){
            areaAndclass =cityAndshcool1 ;
        }
        if(cityAndshcool2 !='-1'){
            areaAndclass =cityAndshcool2 ;
        }

        obj.ajax('/bg/accountExpert/updateExpert', {
            'did':areaAndclass,     //测试地区编码440303   CJJDX
            'speciality': $('.speciality').val(),   //专业特长
            'accountExpert': $('.expProfession').val(),  //职业
            'introduction': $('.description').val(),   //自我描述
            'categoryId':$('.categoryId option:selected').val() ,   //服务类别
            'realname':$('.realname').val(),    //用户名
            'expertUrl':$('#opload_img').val()
        }, function(data) {
            console.log(data);
            if (data.status = 'OK') {
                $.alert(data.msg);
                window.location.reload();   //页面重新加载
            } else {
                $.alert(data.msg);
            }
        }, function(data) {})
    });

    /***  咨询导师  注销 *******/

    $('.cancel2').click(function(){
        if(confirm("确定要注销导师吗？")){
            obj.ajax('/bg/accountExpert/deleteExpert',{'username': username},function(data){
                console.log(data)
                if(data.status =='OK'){
                    $.alert('注销成功！')
                    window.location.reload();   //页面重新加载
                }else{
                    $.alert('注销失败！')
                }
            },function(data){})
        }
    })

    /****  清空  *****/
    $('#apply_teacher_btn').click(function(){

//  	$(this).hide()  //隐藏申请按钮
        $('.consultant_tutor').show();    //申请咨询导师页面显示
        $('.become_teacher').show();
//   	$('#upd_techer').hide()   //隐藏修改按钮
//   	$('.conBgc01').html('');

        $('.realname').val(''); //用户名
        $('.expProfession').val('') //职业
        $('.speciality').val('') //专业特长
//		$('#gender').val(data.rows.gender) //性别
//		$('#typeDistrict').val(data.rows.typeDistrict); //typeDistrict;//用户地域归属类型（1-地市，2-高校）
        $('.description').val('') //自我描述
        $('.apply-teach-box').hide();    //隐藏申请导师按钮

        obj.ajax('/pc/service/getServiceCategory',{},function(data){   //服务类别
            var html = '';
            for(var i =0 ;i<data.rows.length;i++ ){

                html+='<option  value="'+data.rows[i].caId+'">'+data.rows[i].name+'</option>'
            }
            $('.categoryId').append(html);

        },function(data){})

    })

    /**** 咨询导师- 取消 ***/
    $('.cancel1').click(function(){

        $('.become_teacher').hide()  //隐藏申请框
        $('.apply-teach-box').show()  //显示   大的申请按钮
    })

    /******************************  回显个人用户信息   *************************************/

//     obj.ajax('/commons/getSessionAccount',{},function(data){
//     	console.log(data)
//     	if(data.account.username){
//     		fn(data.account.username);
//     		username =data.account.username;
//     	}
//     },function(data){});
//
// 	function fn(data){
//      	/*** 获取个人基本信息***/
// 		obj.ajax('/bg/account/findAccountById',{'username':data},function(data){
// 		    console.log(data);
// 			$('#realname').text(data.rows.realname); // 用户名称
// //          $('#orgTypeName').text(userOrgName[account.orgType]); // 用户组织类型
//             $('#imgUrl').attr('src', data.rows.photoUrl); // 用户头像
//             $('#registerBtn span').text(data.rows.realname)  //登录名
// 		},function(data){})
//     }


});


function getsend(sendId){
    $('.cererlde').click(function(){
        var nuumbere=$('.text_number').val();
        var data = {
            'id':sendId,
            'number': nuumbere
        }

        FindConsultApi.getPresent(data).then(function(data) {
            if (data.status == 'OK') {
                $.alert(data.msg);
            }else{
                $.alert(data.msg);
            }
        })
    })
}

function diffDateTime(bigTime, smaTime) {
    var day = 0; // 相隔天数
    var hour = 0; // 相隔小时数
    if (bigTime > smaTime) {
        var diffMs = bigTime - smaTime; // 相隔毫秒数
        day = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 相隔天数
        hour = diffMs % (1000 * 60 * 60 * 24); // 相隔小时数
        hour = Math.floor(hour / (1000 * 60 * 60));
    }

    return day + '天' + hour + '小时';
}

