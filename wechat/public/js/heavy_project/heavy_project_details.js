var activityId = Utils.getQueryString('activityId'); ///调用方法获取
var specialAid = 410;//隐藏报名条件,了解更多;加一行字：点击下方“去点赞”，了解更多候选人信息。

$(document).ready(function(){
    if(activityId == specialAid){
        $('.bmxz').css("display","none");
        $('#activit_detail').parent().next().html("点击下方“去点赞”，了解更多候选人信息。");
    }

    $('#project-genduo').attr('href','heavy_project_vote.html?activityId='+activityId+'');   //项目动态
    $('#detail_maxlook').attr('href','heavy_project_vote.html?activityId='+activityId+'');   //加载更多
    $('#Learn_more').attr('href','wapNewDet.html?activityId='+activityId+'');   //加载更多

    //   重磅项目详情
    function  project_details(){

        obj.ajax('/project/activityDetail',{'activityId':activityId},function(data){

            var activityInfo = data.dataList;
            //***********************************微信分享内容begin******************************************
            var shareTitle = '我正在参加'+activityInfo.title+',来为我加油吧！';
            var shareContent = '快来为我点赞吧！';

            var shareImg = activityInfo.bannerUrl;
            shareHeavyProject(activityId, shareTitle, shareContent, shareImg);

            if(activityInfo.skipUrl == null || activityInfo.skipUrl == ""){
                $('#guideImg').hide();
                $('#listContent').show();
            }else{
                $('#guideImg img').attr("src",activityInfo.skipUrl);
                $('#guideImg').show();
                $('#listContent').hide();
            }
            title = activityInfo.title; //分享的标题
            desc  = activityInfo.remark;   //分享的描述
            imgUrl  = activityInfo.bannerUrl//分享图片
            //***********************************微信分享内容end******************************************

            $('#head-banner img').attr('src' , Utils.compressByAli(activityInfo.bannerUrl, 300, 750));
            console.log(data);
            $('#activity_type').html(activityInfo.type);   //赛事
            $('#activit_time').html(activityInfo.startTime+'   -   '+activityInfo.endTime)     //时间
            $('#activit_mobile').html(activityInfo.mobile)   //电话
            $('#activit_detail').html(activityInfo.remark)   // 简介

            signUp(activityInfo.requirementsList);        //报名条件
            rule(activityInfo.ruleList)                  //活动规则
            flowCheng (activityInfo.processList)         //活动流程
            PrizeSet(activityInfo.prizeList)                    //奖品设置
//			takepart_project(data.dataList)                      //参赛项目

        },function(data){});

        /********报名须知********/
        //报名条件
        function signUp(data){
            var html='';
            for (var i = 0; i < data.length; i++) {

                html+=   '<p class="color333 fz28">'+data[i].content+'</p>'
            }
            $('#signUp').html('<h6 class="fz30 color000">报名条件</h6>'+html);
        }

        //活动规则
        function  rule(data){
            var html='';
            for (var i = 0; i < data.length; i++) {

                html+=   '<p class="color333 fz28">'+data[i].centent+'</p>'
            }
            $('#rule').html('<h6 class="fz30 color000">活动规则</h6>'+html);
        }
        //活动流程

        function flowCheng (data){

            var html='';
            for (var i = 0; i < data.length; i++) {

                html+=   '<p class="color333 fz28">'+data[i].content+'</p>'
            }
            $('#flowCheng').html('<h6 class="fz30 color000">活动流程</h6>'+html);

        }
        /********报名须知*end*******/
        //奖品设置
        function PrizeSet(data){d
            var html='';
            for (var i = 0; i < data.length; i++) {

                html+=   '<li>'
                html+=            '<a href="javascript:;">'
                html+=                '<div>'
                html+=                   '<img src="../../public/img/gift0'+(i+1)+'.png"/>'
                html+=                 '  <h6 class="color333 fz28">'+data[i].ranking+'.'+data[i].count+'名</h6>'
                html+=                    '<p class="color999 fz24">'+data[i].prizes+'</p>'
                html+=                '</div>'
                html+=            '</a>'
                html+=    ' </li>'

                TouchSlide({
                    slideCell:"#picScroll",
                    titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                    autoPage:true, //自动分页
                    pnLoop:"false", // 前后按钮不循环
                    switchLoad:"_src" //切换加载，真实图片路径为"_src"
                });
            }
            $('.bd ul').html(html);

        }

        var n=10;
        //查看更多
        $('#detail_maxlook').click(function(){

            n+=10;
            work_list_team(n);

        })

        /*参赛者作品*/
        /*团队*/
        function work_list_team(n){
            sendAjax();  //初始化列表
            function sendAjax(data){
                obj.ajax('/project/enroll/projectList',{'pageIndex':1,'pageSize':n,'activityId':activityId},function(data){
                    console.log(data);
                    createEle(data.rows);
                },function(data){console.log(1);});
            }

            function createEle(data){
                $('#project_content').html('');     //清空之前的列表 ，刷新新的数据

                var html=''
                for (var i = 0; i < data.length; i++) {
                    html+='<a href="javascript:;" class="item clearfix disB">'
                    html+='<div class="left fl">'
                    html+=   '<img src="'+data[i].imageUrl+'"  />'
                    html+='</div>'
                    html+='<div class="right">'
                    html+=   ' <h4 class="color000 fz30">'+data[i].projectName+'</h4>'
                    html+=    '<p class="fz26 color666">'+data[i].reporterName+'</p>'
                    html+=    '<div class="bot clearfix fz24 color999">'
                    html+=       ' <span class="fl">'+data[i].enrollTime+'</span>'
                    html+=        '<em class="fr">'+data[i].likesNum+'</em>'
                    html+=   '</div>'
                    html+= '</div>'
                    html+='</a>'
                };
                $('#project_content').append(html);
            }
        }
        work_list_team(5);     //初始传入5条

    }
    project_details();



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
    var shareUrl = window.location.href.split('#')[0];
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
                    console.log(res.errMsg);
                });
            });
        },
        error: function() {
            console.log('ajax request failed!!!');
            return;
        }
    });

}

//判断当前是否是微信内置浏览器
function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
//cookie缓存
function changeStatus() {
    var oauthStatus = $.cookie('oauthStatus');
    oauthStatus = Number(oauthStatus) + 1;
    $.cookie('oauthStatus', oauthStatus);
}