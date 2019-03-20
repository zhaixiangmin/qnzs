// 微信JS-SDK分享
$(function() {
	var _selfUrl = window.location.href.split('#')[0];
	// 调用ajax获取后台权限验证配置
	$.ajax({
		url : 'https://api.12355.net/wechat/share',
//		url : Qnzs.path + '/wechat/share',
		type : 'POST',
		data : {
			// 分享链接
			"link" : _selfUrl,
			// 分享标题
			"title" : "广东青年之声",
			// 分享描述
			"desc" : "找活动、找帮助、找咨询，上广东青年之声。",
			// 分享图标
			"imgUrl" : "//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20170830/20170830155838_213qnzs_icon.jpg"
		},
		async : true,
		cache : false,
		dataType : 'json',
		success : function(data) {
			// 注意：所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里设置“JS接口安全域名”。
			wx.config({
				// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				debug : false,
				// 公众号的唯一标识
				appId : data.dataList.appId,
				// 生成签名的时间戳
				timestamp : data.dataList.timestamp,
				// 生成签名的随机串
				nonceStr : data.dataList.nonceStr,
				// 签名
				signature : data.dataList.signature,
				// 包括分享到朋友圈、分享给朋友、分享到QQ、分享到腾讯微博、分享到QQ空间
				jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone' ]
			});

			wx.ready(function() {
				// 分享到朋友圈
				wx.onMenuShareTimeline({
					// 分享标题
					title : data.dataList.title,
					// 分享链接
					link : data.dataList.link,
					// 分享图标
					imgUrl : data.dataList.imgUrl,
					// 用户确认分享后执行的回调函数
					success : function() {
						// alert("分享到朋友圈成功");
					},
					// 用户取消分享后执行的回调函数
					cancel : function() {
						// alert("分享到朋友圈取消");
					}
				});
				// 分享给朋友
				wx.onMenuShareAppMessage({
					// 分享标题
					title : data.dataList.title,
					// 分享描述
					desc : data.dataList.desc,
					// 分享链接
					link : data.dataList.link,
					// 分享图标
					imgUrl : data.dataList.imgUrl,
					// 分享类型,music、video或link，不填默认为link
					type : data.dataList.type,
					// 如果type是music或video，则要提供数据链接，默认为空
					dataUrl : data.dataList.dataUrl,
					// 用户确认分享后执行的回调函数
					success : function() {
						// alert("分享给朋友成功");
					},
					// 用户取消分享后执行的回调函数
					cancel : function() {
						// alert("分享给朋友取消");
					}
				});
				// 分享到QQ(这里需要注意的是:如果用户取消分享,执行的仍然是确认分享后的回调函数)
				wx.onMenuShareQQ({
					// 分享标题
					title : data.dataList.title,
					// 分享描述
					desc : data.dataList.desc,
					// 分享链接
					link : data.dataList.link,
					// 分享图标
					imgUrl : data.dataList.imgUrl,
					// 用户确认分享后执行的回调函数
					success : function() {
						// alert("分享到QQ成功");
					},
					// 用户取消分享后执行的回调函数
					cancel : function() {
						// alert("分享到QQ取消");
					}
				});
				// 分享到腾讯微博(未在微信中发现可以分享到腾讯微博)
				wx.onMenuShareWeibo({
					// 分享标题
					title : data.dataList.title,
					// 分享描述
					desc : data.dataList.desc,
					// 分享链接
					link : data.dataList.link,
					// 分享图标
					imgUrl : data.dataList.imgUrl,
					// 用户确认分享后执行的回调函数
					success : function() {
						// alert("分享到腾讯微博成功");
					},
					// 用户取消分享后执行的回调函数
					cancel : function() {
						// alert("分享到腾讯微博取消");
					}
				});
				// 分享到QQ空间(这里需要注意的是:如果用户取消分享,执行的仍然是确认分享后的回调函数)
				wx.onMenuShareQZone({
					// 分享标题
					title : data.dataList.title,
					// 分享描述
					desc : data.dataList.desc,
					// 分享链接
					link : data.dataList.link,
					// 分享图标
					imgUrl : data.dataList.imgUrl,
					// 用户确认分享后执行的回调函数
					success : function() {
						// alert("分享到QQ空间成功");
					},
					// 用户取消分享后执行的回调函数
					cancel : function() {
						// alert("分享到QQ空间取消");
					}
				});
				wx.error(function(res) {
					alert(res.errMsg);
					alert("===" + _selfUrl + "===");
				});
			});
		},
		error : function() {
			alert('ajax request failed!!!');
			return;
		}
	});
});
