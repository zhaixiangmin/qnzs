
$(document).ready(function(){

    // 定位(获取当前坐标)
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
    	console.log(this.getStatus())
    	console.log(BMAP_STATUS_SUCCESS)
    	
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
        	// 把经纬度保存到cookie
        	$.cookie('lng', r.point.lng, {path: '/' });
        	$.cookie('lat', r.point.lat, {path: '/' });
            console.log('您的位置：'+ r.point.lng +','+ r.point.lat);
            Qnzs.location({ lng: r.point.lng, lat: r.point.lat });
            // $('#address_parent').data('longitude', r.point.lng); // 当前定位经度
            // $('#address_parent').data('latitude', r.point.lat); // 当前定位纬度
        }
        else {
            $.alert('获取定位失败：' + this.getStatus());
        }
    },{enableHighAccuracy: true});

    // 点击'智慧团建'
    $('#league').click(function () {
        var host = window.location.host.split(':')[0]; // 主机
        if(host == 'localhost' || (host.split('.').length == 4 && host.split('.')[0] == '192')) { // 开发环境(localhost:63342 或者 192.168.20.44:8091)
            window.location.href = Qnzs.path + '/toZhtj';
        }else { // 生产环境
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Qnzs.appid + '&redirect_uri=' + Qnzs.path + '/wechatOauth&response_type=code&scope=snsapi_userinfo&state=zhtj#wechat_redirect';
    
        }
    });

    var district = {
        sitenavOrgId: 440000, // 区域ID
        sitenavOrgName: '广东' // 区域名称
    };


    if($.cookie && $.cookie('district_qnzs')) { // 有cookie
        var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
        district_qnzs = JSON.parse(district_qnzs);
        district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
        district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID

        // $('body .navigation .leftNav .didian').text(district.sitenavOrgName); // 渲染地区名称
        $('.address_box .address').text(district.sitenavOrgName); // 渲染地区名称
    }else { // 无cookie
        // 获取用户区域ID
        Qnzs.getDistrictIdByUserDistrictId({}).then(function (data) {
            console.log('Qnzs.getDistrictIdByUserDistrictId data', data);
            if(data.data) {
                district.sitenavOrgId = data.data.districtId; // 区域ID
                district.sitenavOrgName = data.data.districtName; // 区域名称
            }
        }).always(function () {
            // 存储到cookie
            var district_qnzs = {
                sitenavOrgId: district.sitenavOrgId, // 区域ID
                sitenavOrgName: district.sitenavOrgName // 区域名称
            };
            district_qnzs = JSON.stringify(district_qnzs);
            $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)

            // $('body .navigation .leftNav .didian').text(district.sitenavOrgName); // 渲染地区名称
            $('.address_box .address').text(district.sitenavOrgName); // 渲染地区名称
        });
    }

    
    /********** 存储cookit **************/
	var s = window.location.href;
	var size ='';
//	var h = window.location.href.split('//');
	var h = s.split('//');
    if(h.length ==1){
       size= s.split('.')[0].toLocaleUpperCase();
    	console.log(s);
    }else{
    	
       size = h[1].split('.')[0].toLocaleUpperCase();
       console.log(s)
    }
    if(size!='WWW'){
	    $.ajax({
	    	type:"post",
	    	url:base+"/common/district/getDistrictIdBySubDomains",
	    	data:{'subDomains':size },
	    	success:function(data){
	    		console.log(data);
	    		
	    		$('.address_box .address').html(data.districtName)
	    		
	    		/***** 存入到cookie  *******/
	    		var district_qnzs = {
		            sitenavOrgId: data.data.districtId, // 区域ID
		            sitenavOrgName: data.data.districtName // 区域名称
		        };
		        district_qnzs = JSON.stringify(district_qnzs);
		        $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
		        console.log($.cookie('district_qnzs'))
				
	    	}
	    });
    	
    }
	
	/********** 存储cookit end **************/
    
    
    
    


    // 救助中、已解决列表
    function helping(list, auditText){
        var html='';
        if(!list || list.length <= 0) {
            $('.case .content').eq(0).append('暂无数据');
            return;
        }
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var imgUrl = Utils.getDefaultImg(true);
            if(item.imgUrl) {
                imgUrl = item.imgUrl.split(',')[0]; // 默认获取第一张图片
            }

            html+='<a  href="view/find_help/find_help_detail.html?id=' + item.hpId + '" class="item clearfix disB">';
            html+=' <div class="left fl">';
            html+='  <img src="' + Utils.compressByAli(imgUrl, 160, 200) + '"/>';
            html+=' </div>';
            html+=' <div class="right">';
            html+='  <h3 class="color000 fz30">' + item.title + '</h3>';
            html+='  <p class="fz26 color666">' + item.helpType + '</p>';
            html+='  <div class="botTxt clearfix">';
            html+='   <span class="color999 fz24 fl">' + item.createTime + '</span>';
            html+='   <em class="fz24 fr">' + auditText + '</em>';
            html+='  </div>';
            html+=' </div>';
            html+='</a>';
        }
        if(auditText == '求助中') {
            $('.case .content').eq(0).append(html);
        } else if(auditText == '已解决') {
            $('.case .content').eq(1).append(html);
        }
    }

    var data = {
        title: '', // 找帮助名称(可不传，默认为null;搜索时用到)
        // caId: '', // 求助类别(54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
        auditStatus: 1, // 审核状态(1-求助中;2-已解决)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        sort: 'create_time', // 排序字段(可不传)
        order: 'desc' // 排序方式(可不传，desc 降序 asc升序)
    };
    // 帮助列表
    FindHelpApi.findAllHelp(data).then(function (result) {
        var helpList = result.rows;
        if(helpList) {
            helping(helpList, '求助中');
        }
    });
    data.auditStatus = 2; // 审核状态(1-求助中;2-已解决)
    // 帮助列表
    FindHelpApi.findAllHelp(data).then(function (result) {
        var resolvedList = result.rows;
        if(resolvedList) {
            helping(resolvedList, '已解决');
        }
    });

    // 救助中、已解决 选项切换
    $('.case .title_item').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        var thisIdx = $(this).index();
        $('.case .content').eq(thisIdx).show().siblings('.content').hide();
    });

    // 点击 '>'，跳转到列表页(找帮助)
    $('#arrow_icon_find_help').click(function () {
        var text = $('.case .title_item.cur').text();
        console.log('text', text);
        if(text == '求助中') {
            window.location.href = 'view/find_help/find_help_list.html?auditStatus=1'
        }else if(text == '已解决') {
            window.location.href = 'view/find_help/find_help_list.html?auditStatus=2'
        }
    });

});
