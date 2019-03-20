$(document).ready(function(){
    var quId = Utils.getQueryString('quId');//包裹字符串
    var _username = Utils.getQueryString('username');
    var account_global = undefined; // 用户信息(全局变量)
    var askerAccid_global = undefined; // 提问者ID(全局变量)

    if (isWechat()) {
        // 从cookie中获取oauthCode
        var _oauthStatus = $.cookie('fcqOauthStatus');
        if (!_oauthStatus || _oauthStatus > 3) {
            _oauthStatus = 1;
            $.cookie('fcqOauthStatus', 1);
        }
        console.log($.cookie('fcqOauthStatus'));
        var auth_url;
        if (_oauthStatus == 1) {
            changeStatus();
            $.ajax({
                type: "POST",
                url: Qnzs.path + "/commons/getSessionAccount",
                dataType: "JSON",
                async : false,
                success: function(data) {
                    if (data.status != 'OK') {
                        var _questionId = Utils.getQueryString('quId');
                        auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri='
                            + encodeURIComponent(Qnzs.path + '/wechatOauth')
                            + '&response_type=code&scope=snsapi_userinfo&state=findConsultQuestion_'
                            + quId + "_" + _username + '#wechat_redirect';
                    }
                }
            });
        }
        _oauthStatus = $.cookie('fcqOauthStatus');
        if (_oauthStatus == 2) {
            changeStatus();
            if (!auth_url) {
                auth_url = window.location.href.split('&')[0] + "&username=" + _username;
            }
            window.location.href=auth_url;
            return;
        }
        _oauthStatus = $.cookie('fcqOauthStatus');
        if (_oauthStatus == 3) {
            changeStatus();
        }
    }


    $('#bannerBox').on('click', '.bd ul li', function () {
        var imgUrl = $(this).find('img').attr('src');
        if(!imgUrl) {
            $.alert('图片链接为空');
            return;
        }

        window.location.href = '../img_scale/img_scale.html?imgUrl=' + imgUrl;
    });

    /**
     * 渲染问题详情部分
     * @param quId {int} 问题ID
     */
    function renderQuestionDetail(quId) {
        FindConsultApi.getQuesDetail({quId: quId}).then(function (data) {
            $("#username").text(data.rows.username);//提问者
            $("#askTime").text(data.rows.askTime);//提问时间
            $("#title").text(data.rows.title);//标题
            $("#askContent").html(data.rows.askContent);//内容
            $("#exp_photoUrl").attr("src", Utils.compressByAli(data.account.photoUrl, 70, 70));//头像
            askerAccid_global = data.rows.askerAccid; // 提问者ID(全局变量)
            if(account_global && account_global.username == data.rows.askerAccid) {
                $('#deleteQuestion').show(); // 显示'删除'按钮(问题详情)
            }

            if(data.questionImage && data.questionImage.length > 0) {
                var imgUrlArr = data.questionImage;
                var autoPlay = imgUrlArr.length > 1 ? true : false;
                for(var i=0; i<imgUrlArr.length; i++) {
                    var imgUrl = imgUrlArr[i].imageUrl;
                    $('#bannerBox .bd').append('<ul><li><a><img src="' + Utils.compressByAli(imgUrl, 70, 70) + '"/></a></li></ul>');
                    $('#bannerBox .hd ul').append('<li>' + (i+1) + '</li>');
                }
                TouchSlide({ slideCell:"#bannerBox", autoPlay: autoPlay, effect: "leftLoop", delayTime: 300, interTime: 3000 });
            }

            $("#collectsNum").text(data.rows.collectsNum);//收藏
            $("#likesNum").text(data.rows.likesNum);//点赞
            $("#commentsNum").text(data.rows.commentsNum);//评论

            //微信分享
            var _shareTitle = data.rows.title;
            var _shareDesc;
            if (data.rows.askContent) {
                _shareDesc = data.rows.askContent.replace(/<(?:.|\s)*?>/g, "").replace(/[\t\r\n]/g, "").replace(/[ ]/g,"");
            }
            shareConsult(_shareTitle, _shareDesc);
        });
    }


    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params = {
        quId: quId, // 找帮助名称(可不传，默认为null;搜索时用到)
        page: 1, // 当前页码
        rows: 6 // 每页记录数

    };
    //渲染列表
    function render_helplist($listContent, helps, isClear) {
        console.log(helps)

        var html = '';
        for (var i = 0; i < helps.length; i++) {
            var item = helps[i];
            var creatorPhoto = item.creatorPhoto ? item.creatorPhoto:'../../public/img/default_avator.png';
            var orgPhotoUrl = item.orgPhotoUrl ? item.orgPhotoUrl:'../../public/img/default_avator.png';
            var b  =item.type==3? 'block' :'none ';

            html += '<div id="listMsg' +item.repId + '" class="discuss bgcWhite">';
            html += '<div class="headTitle clearfix p_0_30">';
            html += '<div class="left fl" style=" float:left; position:relative;  width:2.4rem;height:2.4rem; border-radius:0%; " >';
            if( item.isExpertreply == 4){
                html += '<img src="' + Utils.compressByAli(orgPhotoUrl, 120, 120) + '" style="position:absolute;display:block; z-index: 1;width:100%;height:2.4rem; border-radius:50%;  " />';
                html +='<div style="width:15px;height:15px;position:absolute;z-index: 100; right:2px;bottom:1px;"><img src=""/>';
                html += '<img class="check_techer_imgBox" src="../../public/img/check_tercher.png" style="position:absolute; display: '+ b+';  width: 15px;height:15px;" />';
                html +='</div>';
            }else{
                html += '<img src="' + Utils.compressByAli(creatorPhoto, 120, 120)+ '"  style="position：absolute;display:block;width:100%;height:2.4rem; border-radius:50%;   z-index: 1;"/>';
                html +='<div class="check_techer_imgBox" style="width:15px;height:15px;position:absolute;z-index: 100;right:2px;bottom:2px">'
//
                html += '<img  src="../../public/img/check_tercher.png" style="position:absolute; display: '+ b+';  width: 15px;height:15px;" />';
                html +='</div>'
            }
            html += '</div>';
            html += '<div class="right pr_30 " style="width:10.5rem; padding-left:0.4rem; padding-right:0;  height:2.4rem;  top:0 ;left:0; float:left;">';
            html += '<div class="clearfix">';
            if( item.isExpertreply == 4){
                if(item.type ==3){
                    html += '<a href="javascript:;" class="color2185cf fz30 fl" style="color:#e07617;">' + item.fullName + '<em>（专家）</em></a>';
                }else{
                    html += '<a href="javascript:;" class="color2185cf fz30 fl">' + item.fullName + '</a>';
                }

            }else{
                if(item.type ==3){
                    html += '<a href="javascript:;" class="color2185cf fz30 fl" style="color:#e07617;">' + item.creatorName + '<em>（专家）</a>';
                }else{
                    html += '<a href="javascript:;" class="color2185cf fz30 fl">' + item.creatorName + '</a>';
                }
            }
            html += '<a href="javascript:huifu('+item.repId+');" class="fr color2185cf fz24 huifuBtn" >回复</a>';
            html += '</div>';
            html += '<p class="repyTitle clearfix">';
            html += '<em class="fl color999 fz24">' + item.replyTime + '</em>';
            html += '<a href="javascript:;" class="fl color2185cf fz24 huifuBtn" title="回复">';
            html += '<img src="../../public/img/commentIcon.png" width="16" height="14"/>';
            html += '</a>';
            html += '<i class="fl smallImg" onclick="likeReplyCommit(this,' + item.repId + ')">';
            html += '<img style="width:15px;hieght:15px;" alt="点赞" class="fl" src="../../public/img/collectGood.png">';
            html += '</i>';
            html += '<font class="gray wqd_fnt fl">('+item.likesCount+')</font>';
            if(account_global && (account_global.orgType == 0 || account_global.username == item.creatorAccid)) { // 超级系统管理员 或 自己的评论
                html += '<span class="delete" onclick="delReplyRe(' + item.repId + ')">删除</span>';
            }
            html += '</p>';
            html += '</div>';
            html += '<p></p>';
            html += '</div>';
            html += '<div class="huifuquBox" style="padding-left:3.6rem;">';
            html += '<div class="huifuqu" style="padding-top:0;">';
            html += '<div class="item fz28 color000" style="padding:0 0 0.15rem 0;"><p>'+item.replyContent+'</p></div>';
            var childRepliesList = item.childRepliesList;
            if (childRepliesList != null) {
                for (var j = 0; j < childRepliesList.length; j++) {
                    html += '<div class="item fz28 color000" style="padding:10px 0;">';
                    if(childRepliesList[j].isExpertreply==2 || childRepliesList[j].isExpertreply==4){
                        html += '<a href="javascript:;" class="color2185cf">' + childRepliesList[j].fullName + '</a>';
                        html += '&nbsp;回复&nbsp;<a href="javascript:;" class="color2185cf">' + item.fullName + '</a> ：';
                    }else{
                        html += '<a href="javascript:;" class="color2185cf">' + childRepliesList[j].creatorName + '</a>';
                        html += '&nbsp;回复&nbsp;<a href="javascript:;" class="color2185cf">' + item.creatorName + '</a> ：';

                    }
                    html += '<p class="clearfix">';
                    html += '<em class="fl color999 fz24" style="width:7.5rem;">'+childRepliesList[j].replyTime+'</em>';
                    html += '<a href="javascript:" title="回复" class="fl color2185cf fz24 huifuBtn" >';
                    html += '<img src="../../public/img/commentIcon.png" width="16" height="14"/>';
                    html += '</a>';
                    html += '<i class="fl smallImg" onclick="likeReplyCommit(this,' + childRepliesList[j].repId + ')">';
                    html += '<img class="fl"  style="width:15px; height:15px;" alt="点赞" src="../../public/img/collectGood.png">';
                    html += '</i>';
                    html += '<font class="gray wqd_fnt fl">(' + childRepliesList[j].likesCount + ')</font>';
                    if(account_global && (account_global.orgType == 0 || account_global.username == item.creatorAccid)) { // 超级系统管理员 或 自己的评论
                        html += '<span class="delete" onclick="delReplyRe(' + childRepliesList[j].repId + ')">删除</span>';
                    }
                    html += '</p>';



                    html += '<p>' + childRepliesList[j].replyContent + '<br></p>';
                    html += '</div>';

                }
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
//
        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    //加载列表平渲染页面
    function loadHelpList(fun, params, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params).then(function (data) {
            var helps = data.rows;

            // if(params.page == 1) { // 第一页
            // 	$('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
            // }

            render_helplist($listContent, helps, isClear); // 渲染帮助列表
            if(helps && helps.length >= params.rows) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params.page++; // 页码自增
            loadedFlag = true; // 设置加载完成(全局变量)
        });
    }

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function (data) {
        if(data.status == 'ALERT') { // 用户未登录
            return;
        }
        var account = data.account;
        if(account) {
            account_global = account; // 用户(全局变量)
        }

    }).always(function () {
        loadHelpList(FindConsultApi.getReplysByQuestionId, params, $('#quesList')); // 加载帮助列表并渲染页面

        renderQuestionDetail(quId); // 渲染问题详情部分
    });

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadHelpList(FindConsultApi.getReplysByQuestionId, params, $('#quesList')); // 加载帮助列表并渲染页面
        }
    });

    //发布评论
    $('#toReply').click(function(){
        var content = $('#messageText').val();
        FindConsultApi.repeatContent({quId: quId,content:content}).then(function (data) {
            if (data.flag) {
                // 重复评论
                $.alert("请勿重复评论！");
                return;
            }else{
                FindConsultApi.replyToQuestion({quId: quId,content:content}).then(function (list) {
                    $.alert(list.msg).then(function () {
                        window.location.reload();
                    });
                })
            }
        })
    });


    // 收藏
    $('#likeOrCollectCommit').click(function(){
        Qnzs.getSessionAccount({}).then(function (data) {
            if (data.status == 'OK') {
                FindConsultApi.operatedCommit({quId: quId, actionType: 11}).then(function (data) {
                    $('#collectsNum').text(data.collectsNum);
                    if (data.actionFlag) {
                        $('.collectimg').attr('src', '../../public/img/collectStarCur.png');
                    } else { //取消点赞
                        $('.collectimg').attr('src', '../../public/img/collectStar.png');
                    }
                })
            } else {
                $.alert('请先登录')
            }
        });

    });
    // 点赞
    $('#collectGood').click(function(){
        // console.log('点赞图片')
        Qnzs.getSessionAccount({}).then(function (data) {
            if (data.status == 'OK') {
                FindConsultApi.operatedCommit({quId: quId, actionType: 10}).then(function (data) {
                    $('#likesNum').text(data.likesNum);
                    if (data.actionFlag) {
                        $('.collectGoodimg').attr('src', '../../public/img/collectGoodCur.png');
                    } else { //取消点赞
                        $('.collectGoodimg').attr('src', '../../public/img/collectGood.png');
                    }
                })
            } else {
                $.alert('请先登录')
            }
        })

    });
    //举报
    $('#submit_report').click(function () {
        Qnzs.getSessionAccount({}).then(function (data) {
            if (data.status == 'OK') {
                var reportReason = $('#reportContent').val();//举报内容
                var reportType = $('#reportType').val();
                if (!reportType && reportType != 0) {
                    $.alert('请选择举报分类');
                    return;
                }
                FindConsultApi.report({
                    reportReason: reportReason,
                    reportType: reportType,
                    module: 2,
                    reportAgainstId: quId
                }).then(function (data) {
                    $('#report_cancel').click(); // 手动点击取消
                    $.alert(data.msg);
                    return;
                })
            } else {
                $.alert('请先登录')
            }
        })
    });
    // 删除(问题)
    $('#deleteQuestion').click(function () {
        Qnzs.getSessionAccount({}).then(function (data) {
            if (data.status != 'OK') {
                $.alert(data.msg);
                return;
            }

            var account = data.account;

            if(account && askerAccid_global && account.username == askerAccid_global) {
                // 问题管理删除
                FindConsultApi.delete({quId: quId}).then(function (data) {
                    $.alert(data.msg).then(function () {
                        window.history.back(); // 返回上一页面
                    });
                });
            }
        });
    });
});//文档准备结束

//评论回复
var reply = "";
function toReply_reply(){
    $('.box-showAndshow').show();

    var content = $('#messageText_reply').val();
    FindConsultApi.replyToReply({repId:reply, content:content}).then(function (data) {

        $('#closeSayMyWords_reply').click()
        $('.box-showAndshow').hide()   //隐藏遮罩

        $.alert('回复成功').then(function () {
            window.location.href = 'find_consult_quesList.html'
        });
    })
}
/**
 * 评论点赞
 */
function likeReplyCommit(obj,repId) {
    Qnzs.getSessionAccount({}).then(function (data) {
        if (data.status == 'OK') {
            FindConsultApi.replyLike({'repId': repId}).then(function (data) {
                $(obj).next("font").text('(' + data.likesCount + ')');
                //判断是否点赞过
                if (data.actionFlag) { //已点赞加绿
                    $(obj).find('img').attr('src', '../../public/img/collectGoodCur.png');
                } else { //还没点赞加灰
                    $(obj).find('img').attr('src', '../../public/img/collectGood.png');
                }
                console.log('评论点赞', repId)
            })
        }else {
            $.alert('请先登录')
        }
    });
}

//删除评论
function delReplyRe(repId){
    FindConsultApi.delReply({repId:repId}).then(function (data) {
        $('#listMsg' + repId).remove();
        window.location.reload();
    })
}

function shareConsult(shareTitle, shareDesc) {
    var currUrl = window.location.href;
    console.log("link=" + currUrl + ", title=" + shareTitle + ", desc=" + shareDesc);
    // 调用ajax获取后台权限验证配置
    $.ajax({
        url: Qnzs.path + '/wechat/share',
        type: 'POST',
        data: {
            // 分享链接
            "link": currUrl,
            // 分享标题
            "title": shareTitle,
            // 分享描述
            "desc": shareDesc,
            // 分享图标
            "imgUrl": "//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20170830/20170830155838_213qnzs_icon.jpg"
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

function changeStatus() {
    var oauthStatus = $.cookie('fcqOauthStatus');
    oauthStatus = Number(oauthStatus) + 1;
    $.cookie('fcqOauthStatus', oauthStatus);
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