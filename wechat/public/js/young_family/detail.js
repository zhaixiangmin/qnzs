/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    var staId = Utils.getQueryString('staId'); // 站点ID
    console.log('staId', staId);
    if(!staId) {
        $.alert('站点ID不能为空').then(function () {
            // window.location.href = 'young_family.html';
            window.history.back();  //返回上一页
        });
    }
    
    if (isWechat()) {
		// 从cookie中获取oauthCode
		var _oauthStatus = $.cookie('yfOauthStatus');
		if (!_oauthStatus || _oauthStatus > 3) {
			_oauthStatus = 1;
			$.cookie('yfOauthStatus', 1);
		}
		console.log($.cookie('yfOauthStatus'));
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
							+ '&response_type=code&scope=snsapi_userinfo&state=youngFamily_'
							+ staId + '#wechat_redirect';
					}
				}
			});
		}
		_oauthStatus = $.cookie('yfOauthStatus');
		if (_oauthStatus == 2) {
			changeStatus();
			if (!auth_url) {
				auth_url = window.location.href.split('&')[0];
			}
			window.location.href=auth_url;
			return;
		}
		_oauthStatus = $.cookie('yfOauthStatus');
		if (_oauthStatus == 3) {
			changeStatus();
		}
	}

    // 定位(获取当前坐标)
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
            $('#address_parent').data('longitude', r.point.lng); // 当前定位经度
            $('#address_parent').data('latitude', r.point.lat); // 当前定位纬度
        }
        else {
            $.alert('获取定位失败：' + this.getStatus());
        }
    },{enableHighAccuracy: true});

    
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
            integer = arr[0]; // 整数位
            if(arr && arr.length > 1) {
                decimals = arr[1].substring(0, 1); // 小数点位(只取字符串的一位,eg. 4)
            }
        }

        for(var j=0; j<5; j++) {
            if(j < integer) {
                html += '                    <li class="cur fl"></li>'; // 亮星
                continue;
            }
            if(decimals > 0) {
                var percentage = decimals * 10;
                html += '<li class="fl">';
                html += '    <div style="width: ' + percentage + '%;overflow: hidden;">';
                html += '        <span style="display: inline-block;width: 0.46rem;height: 0.44rem;background: url(../../public/img/star_1.png) no-repeat;background-size: 0.46rem;"></span>';
                html += '    </div>';
                html += '</li>';

                decimals = undefined; // 只进来一次
                continue;
            }

            html += '                    <li class="fl"></li>'; // 灭星
        }

        return html;
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

    // 服务站点详情
    YoungFamilyApi.stationDetail({staId: staId}).then(function (data) {
    	
        console.log('YoungFamilyApi.stationDetail data', data);
        var station = data.dataList;
        
        if(station.disabled!="正常"||station.status!="已通过"){
        	
	         $.alert("该站点已被禁用，您可以选择附近其他站点申请服务！").then(function(){
	         	window.location.href="young_family.html";
	         	
	         })
        	
        }
        
        var starHtml = star_generate(station.star); // 星星评分
        var html = '';
        for(var i=0; i<station.staCategoriesList.length; i++) {
            var category = station.staCategoriesList[i];
            html += '<li class="fl">';
            html += '    <a href="javascript:;" class="colorfff fz24">';
            html += '        <div>' + category.name + '</div>';
            html += '    </a>';
            html += '</li>';
        }
        // $('#imageUrl').attr('src', imgUrl); // 站点头像
        $('#fullName').text(station.fullName); // 站点全称
        $('#starIcon').html(starHtml); // 星级图标
        $('#star').text(station.star); // 星级
        $('#evaluationNum').text(station.evaluationNum); // 评论数
        $('#concernNum').text(station.concernNum); // 关注数
        $('#concern').text('关注');
        if(station.isConcerned) { // 是否已关注
            $('#concern').text('取消关注');
        }
        $('#serviceTime').text(station.serviceTime); // 站点服务时间
        $('#address').text(station.address); // 详细地址
        $('#address_parent').data('lng', station.mapLongitude); // 站点经度
        $('#address_parent').data('lat', station.mapLatitude); // 站点纬度
        $('#telephone').text(station.telephone); // 站点管理员电话
        $('#staCategoriesList').html(html); // 站点服务类别
        $('#serviceContent').text(station.serviceContent); // 站点介绍
        //服务群里
        if(station.serviceGroup!=''){
        	var  html_groun = '';
        	html_groun+='<li class="fl"> ' 
        	html_groun+='<a href="javascript:;" class="colorfff fz24">'    
        	html_groun+='<div>'+station.serviceGroup+'</div>'
        	html_groun+='</a></li>'
        
        	$('#serviceContentList').html(html_groun) //服务群里
        }

        var imgList = station.staSceneriesList; // 实景图片
        if(!imgList || imgList.length <= 0) {
            imgList = ['../../public/img/young-home.png']; // 默认图片
        }
        // var imgUrlArr = helpDetail.imgUrl.split(',');
        var autoPlay = imgList.length > 1 ? true : false;
        for(var i=0; i<imgList.length; i++) {
            var imgUrl = imgList[i];
            $('#bannerBox .bd').append('<ul><li><a><img src="' + Utils.compressByAli(imgUrl, 300, 750) + '"/></a></li></ul>');
            $('#bannerBox .hd ul').append('<li>' + (i+1) + '</li>');
            // if (i == 0) {
            //     _shareImageUrl = imgUrl;
            // }
        }
        TouchSlide({ slideCell:"#bannerBox", autoPlay: autoPlay, effect: "leftLoop", delayTime: 300, interTime: 3000 });

    });


    // 点击 '我要预约'
    $('#reserve').click(function () {

        // 是否可以预约线下服务
//      YoungFamilyApi.checkApplication({}).then(function (data) {
//      	console.log(data)
//          // 跳转到预约服务页面
//          window.location = 'reserve.html?staId=' + staId;
//      });
        
        $.ajax({
        	type:"post",
        	url:Qnzs.path+ "/bg/applicationManage/checkApplication",
        	async:true,
        	success:function(data){
        		if(data.status =="ERROR"){
        			
        			$.alert(data.msg).then(function(){
        				
        			window.location = '../logoin/login.html?nextUrl=../young_family/reserve.html?staId='+ staId;
        				
        			})
        		}else{
        			window.location = 'reserve.html?staId=' + staId;
        			
        		}
        		
        		
        	}
        });
    });

    // 点击 '举报'
    $('#report').click(function () {
        // 跳转到举报页面
        window.location = 'report.html?staId=' + staId;
    });

    var isClick = false; // 是否点击 '关注' 按钮，避免重复点击(true：已点击，false：未点击)
    // 点击 '关注' 按钮
    $('#concern').click(function () {
        if(isClick) { // 已点击
            // console.log('重复点击');
            return;
        }
        // console.log('有效点击');
        isClick = true; // 设置已点击
        var text = $(this).text();
        if(text == '关注') {
            YoungFamilyApi.concern({staId: staId}).then(function () {
                $('#concern').text('取消关注');
            }).always(function () {
                isClick = false; // 设置未点击
            });
            return;
        }

        // 如果当前文本是 '取消关注'
        YoungFamilyApi.cancelConcern({staId: staId}).then(function () {
            $('#concern').text('关注');
        }).always(function () {
            isClick = false; // 设置未点击
        });
    });

    // 点击 '已服务案例'
    $('#served').click(function () {
        YoungFamilyApi.checkApplicationByStationId({staId: staId}).then(function (data) {
            console.log('YoungFamilyApi.checkApplicationByStationId data', data);
            window.location = 'served.html?staId=' + staId; // 跳转到已服务案例页面
        })
    });

    // 点击 'TA的活动'
    $('#activity').click(function () {
        YoungFamilyApi.checkPublish({staId: staId}).then(function (data) {
            console.log('YoungFamilyApi.checkPublish data', data);
            window.location = 'activity.html?staId=' + staId; // 跳转到已服务案例页面
        })
    });

    // 点击 '地址栏'
    $('#address_parent').click(function () {
        var lng = $('#address_parent').data('lng'); // 站点经度
        var lat = $('#address_parent').data('lat'); // 站点纬度
        var longitude = $('#address_parent').data('longitude'); // 当前定位经度
        var latitude = $('#address_parent').data('latitude'); // 当前定位纬度
        if(!lng || lng == 'undefined' || !lat || lat == 'undefined' || !longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
            // $.alert('站点位置参数不能为空');
            $.alert('站点位置定位中，请稍后...');
            return;
        }
        window.location = 'route_map.html?lng=' + lng + '&lat=' + lat + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
    });


});

function changeStatus() {
	var oauthStatus = $.cookie('yfOauthStatus');
	oauthStatus = Number(oauthStatus) + 1;
	$.cookie('yfOauthStatus', oauthStatus);
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