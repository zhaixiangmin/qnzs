var activityId = Utils.getQueryString('activityId'); ///调用方法获取
var specialAid = 268;//不显示点赞按钮
var data = {
    'activityId': activityId, //所属活动ID
    'keyWord': '',
    'keywordType': '',
    'creatorType': '', //参赛者分类
    'pageIndex': 1, //当前页码
    'pageSize': 10 //每页记录数
};

$(document).ready(function() {
    var projectId = '';

    // 微信oauth认证
    if (isWechat()) {
        // 从cookie中获取oauthCode
        var _oauthStatus = $.cookie('oauthStatus');
        if (!_oauthStatus || _oauthStatus >= 3) {
            _oauthStatus = 1;
            $.cookie('oauthStatus', 1);
        }
        if (_oauthStatus == 1) {
            var auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri='
                + encodeURIComponent(Qnzs.path + '/wechatOauth')
                + '&response_type=code&scope=snsapi_userinfo&state=heavyProject_'
                + activityId + '#wechat_redirect';
            changeStatus();
            window.location.href=auth_url;
            return;
        } else {
            changeStatus();
        }
    }

    $('#XM_list').on('click', '.btn_vote', function(){
        var isclick = true;
        if(isclick == false){
            $.alert('请勿重复点赞！');
            return;
        }
        isclick = false;
        var id =$(this).data('id');    //项目id
        obj.ajax('/project/enroll/voteProject',{'projectId':id},function(data){
            console.log(data);

            if(data.status=='OK'){
                $.alert(data.msg);
                $('#totlNum_'+id).html( parseInt($('#totlNum_'+id).html())+1);
            }else{
                $.alert(data.msg);
            };
            isclick = true;
        },function(data){

            isclick = true;
        });
    });

    if(activityId == specialAid){
        $('.btn_box').css("display","none");
    }

    $('.colse-jj').click(function(){   //隐藏弹出框

        $('.HD_detail').hide();
        $('.bg_black').hide();
    });

    sendAjax(data);

    /******* 搜索   *********/
    $('#search').click(function(){
        data.keyWord = $('#key').val(); // 搜索框内容
        data.keywordType = $('#keyType').val();
        data.creatorType = '';
        if(data.keyWord == ''){
            return;
        }
        if(data.keywordType == 'id' && !/^[0-9]*$/.test(data.keyWord)){
            $.alert('请正确输入参赛者编号!');
            return;
        }


        $('.swiper-wrapper').find('.swiper-slide').css('background', '#fff');
        $('.swiper-wrapper').find('.swiper-slide').css('color', '#000');
        $('#XM_list').html('');     //清空之前的列表 ，刷新新的数据
        data.pageIndex = 1; // 重置页码
        sendAjax(data);
    })

    /****** 点击加载更多  ******/
    $('.addmore-btn').click(function(){
        data.pageIndex += 1 ;
        data.keyWord = $('#key').val();
        if(data.keyWord == ''){
            data.creatorType = $('.currCreateType').attr('value');
        }
        sendAjax(data);
    });


    /***************************************** 参赛者列表   **************************************************/
//点赞指引
//   var n=10;
//   sendAjax({ 'pageIndex':1,'pageSize':n,'activityId':activityId});

    //获取项目详情
    obj.ajax('/project/activityDetail',{'activityId':activityId},function(data){
        console.log(data);
        var activityInfo = data.dataList;
        createReatorType(activityInfo)  //生成参赛者分类
        // 微信分享
        var shareTitle = '我正在参加'+activityInfo.title+',来为我加油吧！';
//  	var shareContent = activityInfo.remark;
        var shareContent = '快来为我点赞吧！';
        if(activityInfo.id == 268){
            shareContent = '网络队日活动进行中……';
        }

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
        //分享内容
        /*if(data.dataList.skipUrl==''){
        	url = window.location.href.split('#')[0];
        }else{
        	url =data.dataList.skipUrl;  //分享的链接
        }*/
        title = activityInfo.title; //分享的标题
        desc  = activityInfo.remark;   //分享的描述
        imgUrl  = activityInfo.bannerUrl//分享图片
        /** 大的banner图 **/
        $('#img').attr("src", Utils.compressByAli(activityInfo.bannerUrl, 300, 750));

        /***** 活动简介弹出框内容 ****/
        $('#HD_jianjie-img').attr("src",activityInfo.bannerUrl);
    },function(data){console.log(1);});

    function createReatorType(data){


        var html = '';
        if(data.applicantTypes!=null){
            if(data.applicantTypes.length==2){
                for(var i=0;i<data.applicantTypes.length;i++){
                    html+= ' <div onclick="sreachList(this)" style="width:50%; "  class="swiper-slide" value="'+data.applicantTypes[i]+'">'+data.applicantTypes[i]+'</div>'
                }
            }
            if(data.applicantTypes.length==1){
                for(var i=0;i<data.applicantTypes.length;i++){
                    html+= ' <div onclick="sreachList(this)" style="width:100%"  class="swiper-slide" value="'+data.applicantTypes[i]+'">'+data.applicantTypes[i]+'</div>'
                }
            }
            if(data.applicantTypes.length==0){
//			    		for(var i=0;i<data.applicantTypes.length;i++){
//				    		html+= ' <div onclick="sreachList(this)" style="width:62%"  class="swiper-slide" value="集体">集体</div>'
//				    		html+= ' <div onclick="sreachList(this)" style="width:62%"  class="swiper-slide" value="个人">个人</div>'
//				   	    }
                $('.youxiu').css("display","none");
            }
            if(data.applicantTypes.length >2){
                for(var i=0;i<data.applicantTypes.length;i++){
                    html+= ' <div onclick="sreachList(this)" style="width:33%"  class="swiper-slide" value="'+data.applicantTypes[i]+'">'+data.applicantTypes[i]+'</div>'
                }
            }

        }

        $('.swiper-wrapper').html(html);
        /*** 参赛者分类的高亮切换  *****/
        $('.participator_work .work_list.person').hide();
        $('.participator_work .select_title').click(function(event) {

            $(this).addClass('cur').siblings('.select_title').removeClass('cur');
            $('.participator_work .work_list').eq($(this).index()).show().siblings('.work_list').hide();
        });
    }
});

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

/********************************* sentajax  ***********************************************/

/*****  参赛者类别筛选    ******/
function sreachList(obj) {
    $('.swiper-wrapper').find('.swiper-slide').css('background', '#fff');
    $('.swiper-wrapper').find('.swiper-slide').css('color', '#000');
    $('.swiper-wrapper').find('.swiper-slide').removeClass('currCreateType');
    $(obj).css('background', '#228ddc');
    $(obj).css('color', '#fff');
    $(obj).addClass('currCreateType');
    $('#XM_list').html(''); //清空之前的列表 ，刷新新的数据
    $('#key').val(''); // 清空搜索框内容
    sendAjax(null);
}

function sendAjax(object){
    if(object == null){
        data.creatorType =  $('.currCreateType').attr('value'); //参赛者分类
        data.pageIndex = 1;
        data.keyWord = '';
        data.keywordType = '';
    }
    obj.ajax('/project/enroll/projectList',data,function(result){
//		   	 	console.log(data);
        createEle(result.dataList);
        if(result.dataList.length < 10){
            $('.addmore-btn').html('已加载完咯');
        }else{
            $('.addmore-btn').html('加载更多');
        }
    },function(data){console.log(1);});

    function createEle(data){
        if(data.pageIndex == 1){
            ('#XM_list').html('');     //清空之前的列表 ，刷新新的数据
        }
        var html=''
        for (var i = 0; i < data.length; i++) {

            html+=  '<div class="list_box bgcWhite">'
            html+=     '<a  href="javascript:;" class="jieshao" id ="'+data[i].id+'"  activityId="'+data[i].activityId+'">'
            html+=         ' <div class="XM_pic">'

            if(data[i].imageUrl==''){

                html+=          ' <img src="../../public/img/head_img/31.png" alt="" />'
            }
            if(data[i].imageUrl!='')
            {
                html+=          ' <img src="'+ Utils.compressByAli(data[i].imageUrl, 225, 350) +'" alt="" />'
            }
            html+=        '</div>'
            html+=          '<h3 class="fz30 color000">'+data[i].projectName+'</h3>'
            html+=           ' <p class="vote-name">'
            html+=           '   <span class="shenbao colorfff">编号</span>'
//	                html+=               '<span  class="fz24 reporterName color666">'+data[i].reporterName+'</span>'
            html+=               '<span  class="fz26 reporterName color999">'+data[i].id+'</span>'
            html+=           '</p>'
            html+=       '</a>  '
            if(activityId != specialAid){
                html+=     '<a href="javascript:;" data-id="' + data[i].id + '" class="fz28 colorfff btn_vote bgcgrey">(<em id="totlNum_'+data[i].id+'">'+data[i].likesNum+'</em>/人) 点赞</a>'
            }
            html+= ' </div>'


        };
        $('#XM_list').append(html);



        //点击列表子项显示点赞的详细页面
        $(".jieshao").click(function(){

            id =$(this).attr('id');    //项目id
            activityId =$(this).attr('activityId');   //活动id

            obj.ajax('/project/enroll/projectDetail',{'projectId':$(this).attr('id')},function(data){
                console.log(data);
                var project = data.dataList;

                $('.p1').html(project.projectName) //项目名
                $('.p2').html('简介：'+project.projectIntroduce) //项目介绍
                $('.person').html(project.reporterName)  //报名人
                //点击点赞
                projectId = project.id;

                //风采展示图片
                $('.img-box').html('');
                $('.img-box-first').html('')
                var html = '';
                var html_1 = '';
                if(project.imageUrl!=''){
                    $('.img-box-first').show()  //隐藏第一张图 //显示第一张图片
                    html_1+= '<img class="img_1" style="display: block; width:100%; height:100% ;margin-bottom:10px;" src="'+ project.imageUrl +'"/>'
                    $('.img-box-first').html(html_1)
                }else{
                    $('.img-box-first').hide()  //隐藏第一张图
                }

                if (project.projectImageList.length>=1) {
                    $('.img-box').show();
                    for(var i=0; i<project.projectImageList.length; i++) {
                        var projectImage = project.projectImageList[i];
                        //					            html += '<div class="img" style=" width: 700px; height: 400px;margin: 0 auto; padding: 0 30px;">'
                        html += '<img style="display: block; width:100%; height:100% ;" src="'+ projectImage.imageUrl +'"/>'
                        //					        	html += '</div>'
                        html += '<p style="text-align: center; margin: 5px 0px 15px 0px;">'+ projectImage.imageComment +'</p>'
                    }
                }else{
                    $('.img-box').hide();  //隐藏第2图片显示框
                }

                $('.img-box').append(html);

//                          //视频链接处理
                if(data.dataList.videoUrl!=''){
                    $('#iframe_box').show() //显示视频框
                    var h = project.videoUrl.split('https://v.qq.com/x/');  //自己上传的 视频
                    sh =h;
                    console.log(sh);
                    h= h[1].split('/');
                    console.log(h);
                    if(h[0]=='page'){   //自己上传的视频
                        video_id =sh[1];
                        video_id = video_id.split('/');
                        video_id = video_id[1].split('.');
                        video_id =video_id[0];
                    }
                    if(h[0]=='cover'){    //腾讯的视频
                        video_id =sh[1];
                        video_id = video_id.split('/');
                        if(video_id.length==2){
                            video_id = video_id[1].split('.');
                            video_id =video_id[0];

                        }
                        if(video_id.length==3){
                            console.log(video_id)
                            video_id = video_id[2].split('.');
                            video_id =video_id[0];
                        }

                    }
                    console.log(video_id);
                    $('#iframe_box iframe').attr('src','https://v.qq.com/iframe/player.html?vid='+video_id+'&tiny=0&auto=0') //腾讯视频

                }else{
                    $('#iframe_box').hide()  //隐藏视频框
                }
                //视频链接处理 end

            },function(data){})


            $(".bg_black").css("display","block");
            $(".HD_detail").css("display","block");

        });

    }

    /**** 获取参赛者类型   *****/
}

//	详情弹框里点赞
function clickProjectDetail(){
    var isclick = true;
//			    $('#voteBtn').click(function(){
    if(isclick == false){
        $.alert('请勿重复点赞！');
        return;
    }
    isclick = false;
    obj.ajax('/project/enroll/voteProject',{'projectId':projectId},function(data){
        if(data.status=='OK'){
            $.alert(data.msg);
            $('#totlNum_'+projectId).html( parseInt($('#totlNum_'+projectId).html())+1);
        }else{
            $.alert(data.msg);
        };
        isclick = true;
    },function(data){
        isclick = true;
    });
//					})
}

/**搜索类型**/
function changeKeyType(obj){
    if ($(obj).val() == 'name') {
        $('#key').attr("placeholder","请输入参赛者名称进行搜索");
    } else{
        $('#key').attr("placeholder","请输入参赛者编号进行搜索");
    }
}

