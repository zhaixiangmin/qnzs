
$(function(){
	
	if (isWechat()) {
		// 从cookie中获取oauthCode
		var _oauthStatus = $.cookie('fcOauthStatus');
		if (!_oauthStatus || _oauthStatus > 3) {
			_oauthStatus = 1;
			$.cookie('fcOauthStatus', 1);
		}
		console.log($.cookie('fcOauthStatus'));
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
							+ '&response_type=code&scope=snsapi_userinfo&state=famousConsult_'
							+ _questionId + '#wechat_redirect';
					}
				}
			});
		}
		_oauthStatus = $.cookie('fcOauthStatus');
		if (_oauthStatus == 2) {
			changeStatus();
			if (!auth_url) {
				auth_url = window.location.href.split('&')[0];
			}
			window.location.href=auth_url;
			return;
		}
		_oauthStatus = $.cookie('fcOauthStatus');
		if (_oauthStatus == 3) {
			changeStatus();
		}
	}

    //最新or最热切换
    $('.commentBody:first').show();
    $('.seeMore:first').css('display','block');
    $('.commentTitle span').click(function(event) {
        $(this).addClass('cur').siblings('span').removeClass('cur');
        var thisIdx=$(this).index();
        $('.commentBody').eq(thisIdx).show().siblings('.commentBody').hide();
    });
    //评论
    $('.I_speak').click(function(event) {
            $('section.huifu').hide();
            $('.sayMyWords').toggle().toggleClass('cur');
            $('body').toggleClass('pb');
        });

    //取消评论or回复
    $('.cancelRep').click(function(event) {
        $(this).parents('section.comment').hide();
    });

    //回复评论
    $(document).on('click', '.commentBody .I_reply', function(event) {
        var thisUser = $(this).siblings('.userId').text();
        $('.comment.huifu').show().find('#sayMyWordsRe').attr('placeholder', '回复 '+thisUser);
    });



//详情数据回显
var quId = Utils.getQueryString('quId');//包裹字符串
//var username = Utils.getQueryString('username');

function createEle(){
    FindConsultApi.getQuesDetail({quId:quId}).then(function (data) {
        console.log('专家11',data);
        $("#username").text(data.rows.username);//提问者
        $("#categoryName").text(data.rows.categoryName);//服务类别
        $("#realname").text(data.account.realname);//名称
        $("#askTime").text(data.rows.askTime);//提问时间
        $("#title").text(data.rows.title);//标题
        $("#askContent").html(data.rows.askContent);//内容
        if(data.questionImage[0]!=null || data.questionImage[0]!=undefined){
            $("#image_url").attr("src", Utils.compressByAli(data.questionImage[0].imageUrl, 400, 750));//大图
        }
        $("#collectsNum").text(data.rows.collectsNum);//收藏
        $("#likesNum").text(data.rows.likesNum);//点赞
        $("#commentsNum").text(data.rows.commentsNum);//评论
        
        // 加载微信分享
        if (isWechat()) {
        	shareConsult(data.rows.title, data.rows.askContent, data.questionImage[0].imageUrl);
        }
    });
}

createEle()
//热门问题列表
var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

//        最新评论
    var paramNew = {
        keyword: undefined, // 找帮助名称(可不传，默认为null;搜索时用到)
        // helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
        // auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        quId:quId,
        repType:'new',
        // sort: undefined, // 排序字段(可不传)
        // order: undefined // 排序方式(可不传，desc 降序 asc升序)
    };
//最新评论END
//    最热评论
    var paraHot = {
        keyword: undefined, // 找帮助名称(可不传，默认为null;搜索时用到)
        // helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
        // auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        quId:quId,
        repType:'hot',
        // sort: undefined, // 排序字段(可不传)
        // order: undefined // 排序方式(可不传，desc 降序 asc升序)
    };


    /**
     * 渲染帮助列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param comments {array} 帮助列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_helplist($listContent, helps, isClear) {
        var html = '';
        for (var i = 0; i < helps.length; i++) {
            var item = helps[i];
            //var replyTime = new Date(item.replyTime).format('yyyy/MM/dd hh:mm');
            var creatorPhoto = item.creatorPhoto ? item.creatorPhoto : '../../public/img/default_avator.png';
            var orgPhotoUrl = item.orgPhotoUrl ? item.orgPhotoUrl:'../../public/img/default_avator.png';
            //var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
            html+='<div class="item clearfix">'
            html+=' <div class="userImg fl">'
            // html+='  <img src="'+imgUrl+'" />'
            if(item.isExpertreply==2 || item.isExpertreply==4){
                html += '<img src="' + Utils.compressByAli(orgPhotoUrl, 100, 100) + '"/>'
            }else{
                html += '<img src="' + Utils.compressByAli(creatorPhoto, 100, 100)+ '"/>'
            }
            html+=' </div>'
            html+=' <div class="item_right">'
            html+='  <div class="userIdBox clearfix">'
            // html+='   <span class="userId fl color2185cf">'+item.creatorName+'</span>'
            if(item.isExpertreply==2 || item.isExpertreply==4){
                html += '<span class="userId fl color2185cf">' + item.fullName + '</span>'
            }else{
                html += '<span class="userId fl color2185cf">' + item.creatorName + '</span>'
            }
            html+='   <a href="javascript:huifu('+item.repId+');" class="I_reply color2185cf fr">回复</a>'
            html+='  </div>'
            html+='  <div class="comment_date_box clearfix">'
            html+='   <div class="comment_date fl">'+item.replyTime+'</div>'
            html+='   <a href="javascript:;" onclick="likeReplyCommit(this,' + item.repId + ')" class="comment_dianzan fl">(<em>' + item.likesCount + '</em>)</a>'
            html+='  </div>'
            html+='  <div class="userWords">'+item.replyContent+'</div>'
            var childRepliesList=helps[i].childRepliesList;
            // console.log('打印二级',list[i].replyTime)
            if(childRepliesList!=null) {
                for (var j = 0; j < childRepliesList.length; j++) {
                    html += '<div class="talk_to_user">'
                    // html +='<span class="others color2185cf">' + childRepliesList[j].creatorName + '</span>'
                    // html += '&nbsp;回复&nbsp;<span class="userId color2185cf">' + item.creatorName + '</span>'
                    if(childRepliesList[j].isExpertreply==2 || childRepliesList[j].isExpertreply==4){
                        html += '<span class="others color2185cf">' + childRepliesList[j].fullName + '</span>'
                        html += '&nbsp;回复&nbsp;<span class="userId color2185cf">' + item.fullName + '</span> ：'
                    }else{
                        html += '<span class="others color2185cf">' + childRepliesList[j].creatorName + '</span>'
                        html += '&nbsp;回复&nbsp;<span class="userId color2185cf">' + item.creatorName + '</span> ：'
                    }
                    html +='</div>'
                    html += '<p class="others_words">' + childRepliesList[j].replyContent + '</p>'
                }
            }
            html+=' </div>'
            html+='</div>'
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载帮助列表并渲染页面
     * @param fun {function} 加载帮助函数
     * @param params {obj} 加载帮助函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadHelpList(fun, params, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params).then(function (data) {
            var helps = data.rows;
            console.log('找咨询', data);

            // if(params.page == 1) { // 第一页
            //     $('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
            // }

            render_helplist($listContent, helps, isClear); // 渲染帮助列表
            if(helps && helps.length >= params.rows) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">没有更多话题</div>');

        }).always(function () {
            params.page++; // 页码自增
            loadedFlag = true; // 设置加载完成(全局变量)
        });
    }
    //最新
    loadHelpList(FindConsultApi.getReplysByQuestionId, paramNew, $('#newComments')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadHelpList(FindConsultApi.getReplysByQuestionId, paramNew, $('#newComments')); // 加载帮助列表并渲染页面
        }
    });
//    最热
    loadHelpList(FindConsultApi.getReplysByQuestionId, paraHot, $('#hotComments')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadHelpList(FindConsultApi.getReplysByQuestionId, paraHot, $('#hotComments')); // 加载帮助列表并渲染页面
        }
    });

//发布评论
$('#publish').click(function(){
    $('#container').data('id', quId);//获取当前页面ID值
    var id = $('#container').data('id');
    console.log('回复获取id', id);
    var content = $('#sayMyWords').val();
    // alert(content)
    console.log('回复',content)
    FindConsultApi.repeatContent({quId:id,content:content}).then(function (data) {
        // console.log('内容',filterXSS(editor.txt.html()))
        // alert(data.flag);
        if (data.flag) {
//						重复评论
            $.alert("请勿重复评论！");
            return;
        }
        else{
            FindConsultApi.replyToQuestion({quId:id,content:content}).then(function (data) {
//console.log('内容',content)
//  					if(status == ok){
                $.alert("发布成功！");
                window.location.reload()
                // }
            })
        }
//         FindConsultApi.replyToQuestion({quId:id,content:content}).then(function (data) {
//             $.alert("发布成功！");
//             window.location.reload();
//             console.log('发布提示',data)         // }
//         })
        console.log('quId',data)
    })
});


// 收藏
$('#container').data('id', quId);//获取当前页面ID值
var id = $('#container').data('id');
console.log('收藏ID',id)
$('#likeOrCollectCommit').click(function(){
    Qnzs.getSessionAccount({}).then(function (data) {
        if (data.status == 'OK') {
            FindConsultApi.operatedCommit({quId: id, actionType: 11}).then(function (data) {
                console.log('收藏图片00')
                // $('#collectsNum').text(data.collectsNum);
                // if(data.actionFlag){
                //     $('.collect_btn').addClass('cur')
                // }else{ //取消点赞
                //     $('.collect_btn').removeClass('cur')
                // }
                $('.collect_btn').toggleClass('cur');

                if (data.actionFlag) {
                    $('.collect_btn').children('.txt').text('收藏');
                } else {
                    $('.collect_btn').children('.txt').text('已收藏');
                }
            })
        }else {
            $.alert('请先登录')
        }
    })
})
// 点赞
$('#collectGood').click(function(){
    Qnzs.getSessionAccount({}).then(function (data) {
        if (data.status == 'OK') {
            FindConsultApi.operatedCommit({quId: id, actionType: 10}).then(function (data) {
                // console.log('点赞图片')
                $('.dianzan').find('em').text(data.likesNum);
                $('.dianzan').toggleClass('cur');
            })
        }else {
            $.alert('请先登录')
        }
    })
})
//评论回复
    $('#toReply').click(function () {
        console.log('评论回复ID'+reply);
        var content = $('#sayMyWordsRe').val();
        console.log('回复',content)
        FindConsultApi.replyToReply({repId:reply,content:content}).then(function (data) {
            // window.location.reload();
            // if(data.status=='ok'){
            $.alert('回复成功').then(function () {
                window.location.reload();
            })
            //     console.log('回复成功',data)
            // }
            console.log('评论回复00', data)
        })
    })

})//文档准备结束


/**
 * 找咨询评论点赞
 */
function likeReplyCommit(obj,repId)
{
    // if(currentUser == ''){
    // 	$('.login_regist_box').fadeIn(400);
    // }else{
    // console.log('repId',repId)
    Qnzs.getSessionAccount({}).then(function (data) {
        if (data.status == 'OK') {
            FindConsultApi.replyLike({'repId': repId}).then(function (data) {
                // console.log('repId99',repId)
                $(obj).find('em').text(data.likesCount);
                // $(obj).next("font").text('（' + data.likesCount + '）');
                //判断是否点赞过
                // if (data.actionFlag) { //已点赞加绿
                //     $(obj).find('img').attr('src',Qnzs.path+'/wechat/public/img/collectGoodCur.png');
                // } else { //还没点赞加灰
                //     $(obj).find('img').attr('src',Qnzs.path+'/wechat/public/img/collectGood.png');
                // }
                $(obj).toggleClass('cur');
                // window.location.reload();
                console.log('评论点赞', repId)
            })
        }else {
            $.alert('请先登录')
        }
    })
    //}
}


function shareConsult(shareTitle, shareSummary, shareImg) {
	var currUrl = window.location.href;
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

function changeStatus() {
	var oauthStatus = $.cookie('fcOauthStatus');
	oauthStatus = Number(oauthStatus) + 1;
	$.cookie('fcOauthStatus', oauthStatus);
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