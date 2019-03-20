/**
 * Created by Administrator on 2017/7/22.
 */
$(function () {
    console.log('find_help_detail');
    var id = Utils.getQueryString('id'); // 帮助ID
    console.log('id', id);
    if(!id) {
        $.alert('帮助ID不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }
    
    if (isWechat()) {
		// 从cookie中获取oauthCode
		var _oauthStatus = $.cookie('fhOauthStatus');
		if (!_oauthStatus || _oauthStatus > 3) {
			_oauthStatus = 1;
			$.cookie('fhOauthStatus', 1);
		}
		console.log($.cookie('fhOauthStatus'));
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
						auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri='
							+ encodeURIComponent(Qnzs.path + '/wechatOauth')
							+ '&response_type=code&scope=snsapi_userinfo&state=findHelp_'
							+ id + '#wechat_redirect';
					}
				}
			});
		}
		_oauthStatus = $.cookie('fhOauthStatus');
		if (_oauthStatus == 2) {
			changeStatus();
			if (!auth_url) {
				auth_url = window.location.href.split('&')[0];
			}
			window.location.href=auth_url;
			return;
		}
		_oauthStatus = $.cookie('fhOauthStatus');
		if (_oauthStatus == 3) {
			changeStatus();
		}
	}

    // 点击图片放大事件
    $('#bannerBox').on('click', '.bd ul li', function () {
        console.log('点击图片');
        var imgUrl = $(this).find('img').attr('src');
        console.log('imgUrl', imgUrl);
        if(!imgUrl) {
            $.alert('图片链接为空');
            return;
        }

        window.location.href = '../img_scale/img_scale.html?imgUrl=' + imgUrl;
    });

    var releaseType = undefined; // '我要帮TA' 类型(zhiyuan：i志愿，腾讯公益和i志愿，只有i志愿  才出提示)
    var releaseUrl = undefined; // '我要帮TA' 链接


    // 审核名称
    var auditTypeName = {
        '0': '处理中',
        '1': '求助中',
        '2': '已解决',
        '3': '等待处理',
        '4': '删除',
        '5': '退回',
        '6': '组织帮助',
        '': '' // 防止出现undefind
    };

    // 找帮助详情
    FindHelpApi.pcHelpDetail({id: id}).then(function (result) {
        console.log('FindHelpApi.pcHelpDetail result', result);
        // var helpDetail = result.helpApplication;
        var helpDetail = result.rows;
        // 微信分享变量
        var _shareTitle = "广东青年之声";
        var _shareDesc;
        var _shareImageUrl = "//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20170830/20170830155838_213qnzs_icon.jpg";

        releaseType = helpDetail.releaseType; // '我要帮TA' 类型(zhiyuan：i志愿，腾讯公益和i志愿，只有i志愿  才出提示) 全局变量
        releaseUrl = helpDetail.releaseUrl; // '我要帮TA' 链接(全局变量)

        // helpDetail.imgUrl = '//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/activityImage/20170804/20170804150558_4020170720215618_56IMG_5251.JPG,//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20170731/20170731204952_491IMG20170729190046.jpg';
        var imgUrlArr = helpDetail.imgUrl.split(',');
        var autoPlay = imgUrlArr.length > 1 ? true : false;
        for(var i=0; i<imgUrlArr.length; i++) {
            var imgUrl = imgUrlArr[i];
            $('#bannerBox .bd').append('<ul><li><a><img src="' + Utils.compressByAli(imgUrl, 200, 750) + '"/></a></li></ul>');
            $('#bannerBox .hd ul').append('<li>' + (i+1) + '</li>');
            if (i == 0) {
            	_shareImageUrl = imgUrl;
            }
        }
        TouchSlide({ slideCell:"#bannerBox", autoPlay: autoPlay, effect: "leftLoop", delayTime: 300, interTime: 3000 });

        $('#title').text(helpDetail.title); // 帮助名称
        $('#audit_status').text(auditTypeName[helpDetail.auditStatus]); // 帮助状态
        $('#helpPeople').text(helpDetail.helpPeople); // 求助人
        $('#helpType').text(helpDetail.helpType); // 求助类型
        $('#totalAmount').text(helpDetail.totalAmount); // 筹款金额
        $('#helpContent').html(helpDetail.helpContent); // 求助详情
        // helpDetail.recollections = '受助者感言内容'; // 造数据
        // $('.ganyanBox').val(helpDetail.recollections); // 受助者感言内容
        if(helpDetail.auditStatus == 1) { // 求助中
            $('#help_people').show(); // 显示 '我要帮TA'
        }else if(helpDetail.auditStatus == 2 && !helpDetail.recollections) { // 以解决

            // 获取当前用户信息
            Qnzs.getSessionAccount({}).then(function (data) {
                // console.log('Qnzs.getSessionAccount data', data);
                if(data.status != 'OK') { // 用户没有登录
                    return;
                }

                var account = data.account;
                if(account.username != helpDetail.applicant) { // 当前用户 非 求助申请人
                    return;
                }

                $('#appreciation').show(); // 显示 '发表答谢感言'
            });
            // $('#appreciation').show(); // 显示 '发表答谢感言'
        }


        // 获取找帮助管理获取单个组织详情
        FindHelpApi.findOrganizationById({oid: helpDetail.acquirer}).then(function (data) {
            console.log('FindHelpApi.findOrganizationById data', data);
            var acquirer = data.rows;
            
            $('#name_acquirer').text(acquirer.name); // 受理方名称
        });

        // 处理进度
        var helpAuditList = result.helpAudit;
        var textHtml = '';
        for (var i = 0; i < helpAuditList.length; i++) {
            var helpAudit = helpAuditList[i];
            //var updateTime = new Date(helpAudit.updateTime).format('yyyy/MM/dd hh:mm');
            var auditName = (helpAudit.auditType || helpAudit.auditType == 0) ? auditTypeName[helpAudit.auditType] : '';

            textHtml = '<li><i class="current"></i><span class="current">' + helpAudit.updateTime + '  ' + auditName  + '</span><div style="font-size: 0.6rem; margin-top: 0.1875rem;">' + helpAudit.content + '</div></li>';

            $('.help_detail .jinzhan_box_r').append(textHtml);
        }

        _shareTitle = helpDetail.title;
        if (helpDetail.helpContent) {
        	_shareDesc = helpDetail.helpContent.replace(/<(?:.|\s)*?>/g, "").replace(/[\t\r\n]/g, "").replace(/[ ]/g,"");
        }
        // 微信分享
        shareHelp(_shareTitle, _shareDesc, _shareImageUrl);
    });



    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params = {
        id: id, // 找帮助ID
        page: 1,
        rows: 5
    };

    /**
     * 渲染评论列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param comments {array} 评论列表
     */
    function render_commentlist($listContent, comments) {
        var html = '';
        for (var i = 0; i < comments.length; i++) {
            var comment = comments[i];
            var imgUrl = comment.photoUrl ? comment.photoUrl : '../../public/img/default_avator.png';

            html += '<div class="item clearfix">';
            html += '    <div class="left fl">';
            html += '        <div class="imgDiv">';
            html += '            <img src="' + Utils.compressByAli(imgUrl, 100, 100) + '"/>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="right">';
            html += '        <div class="tit">';
            html += '            <h6 class="name fl">' + comment.realname + '</h6>';
            html += '            <div class="date fr">';
            html += '                <span class="color999">' + comment.createTime + '</span>';
            // html += '                <em class="color999">18:56</em>';
            html += '            </div>';
            html += '        </div>';
            html += '        <p class="color000">' + comment.content + '</p>';
            html += '    </div>';
            html += '</div>';
        }

        $listContent.append(html);
    }

    /**
     * 加载评论列表并渲染页面
     * @param fun {function} 加载评论函数
     * @param params {obj} 加载评论函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     */
    function loadCommentList(fun, params, $listContent) {
        // 获取推荐服务评论列表
        fun(params).then(function (data) {
            var comments = data.rows;
            console.log('FindHelpApi.getPostPage data', data);

            if(params.page == 1) { // 第一页
                $('#total_comment').append('(' + data.total + ')'); // 评论名称后面添加总记录数
            }

            render_commentlist($listContent, comments); // 渲染评论列表
            if(comments && comments.length >= params.rows) { // 全部列表数据尚未查询完毕
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

    loadCommentList(FindHelpApi.getPostPage, params, $('.comment .content')); // 加载评论列表并渲染页面

    // var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadCommentList(FindHelpApi.getPostPage, params, $('.comment .content')); // 加载评论列表并渲染页面
        }
    });



    // 点击 '我要帮TA'
    $('#help_people').click(function () {
        // '我要帮TA' 类型(zhiyuan：i志愿，腾讯公益和i志愿，只有i志愿  才出提示)
        if (releaseType && releaseType == 'zhiyuan') {
            console.log('我要帮他');
            $.alert('助人自助，请登录i志愿平台帮TA一把！').then(function () {
                window.location = releaseUrl; // 跳转链接
            });
            return;
        }

        window.location = releaseUrl; // 跳转链接
    });

    // 点击 '我要评论'
    $('#submit_comment').click(function () {
    	var myDate = new Date();//获取系统当前时间
        var mytime=myDate.getHours();    //获取当前时间
       
    	if(0<=mytime&& mytime<=7){
    		
    		alert('该板块正在维护中，请早上7点后再试')
    		return ;
    	}
    
    	
        window.location.href = 'comment.html?id=' + id; // 跳转到评论页
    });
    
    // 点击 '我要举报'
    $('#submint_report').click(function () {
        window.location.href = 'report.html?id=' + id; // 跳转到举报页面
    });

    $('#appreciation').click(function () {
        window.location.href = 'appreciation.html?hpId=' + id; // 跳转到发表答谢感言页面
    })

});

function shareHelp(shareTitle, shareDesc, shareImg) {
	var currUrl = window.location.href;
	console.log("link=" + currUrl + ", title=" + shareTitle + ", imgUrl=" + shareImg + ", desc=" + shareDesc);
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
	var oauthStatus = $.cookie('fhOauthStatus');
	oauthStatus = Number(oauthStatus) + 1;
	$.cookie('fhOauthStatus', oauthStatus);
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