// Qnzs.path = Qnzs.env.dev2;//api
//Qnzs.path = Qnzs.env.dev_wyh;

var currentAccount = "";

var longitude = $.cookie('longitudeCookie');
var latitude = $.cookie('latitudeCookie');

var activityId= "";
var online = false;
var actType = "";
var actTitle = "";
var actTime = "";
var address = "";
var imageUrl = "";



$(document).ready(function() {
	if (!longitude || !latitude) {
		// 百度地图API功能
		var map = new BMap.Map("allmap");
		var point = new BMap.Point(113.30764968,23.1200491);
		map.centerAndZoom(point,12);
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				
				longitude=r.point.lng;
				latitude=r.point.lat
				console.log(longitude);
			    console.log(latitude);
	        	$.cookie('longitudeCookie', longitude);
	        	$.cookie('latitudeCookie', latitude);
			} else {
				
			}        
		},{
			enableHighAccuracy: true
		})
	}
	
	getRequestParams();
	getCurrentAccount();
});


function getRequestParams() {
	var reg = new RegExp('%20', 'g');
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		var params = strs.split('&');
		
		var actIdStr = params[0];
		var actIds = actIdStr.split("=");
		activityId = actIds[1];
		
		/*var actBtnRequestsStr = params[1];
		var actBtnRequests = actBtnRequestsStr.split("==");
		actBtnRequest = actBtnRequests[1];*/
		
		/*var onlinesStr = params[1];
		var onlines = onlinesStr.split("==");
		online = onlines[1];*/
		
		/*var actTypeStr = params[1];
		var actTypes = actTypeStr.split("=");
		actType = actTypes[1];
		
		var titleStr = params[2];
		var titles = titleStr.split("=");
		actTitle = titles[1];
		
		var actTimeStr = params[3];
		var actTimes = actTimeStr.split("=");
		actTime = actTimes[1];
		if(actTime.indexOf('%20') != -1) { //空格处理
			actTime = actTime.replace(reg, ' ');
		}
		
		var addressStr = params[4];
		var addresses = addressStr.split("=");
		address = addresses[1];
		
		var iamgeUrlStr = params[5];
		var img = iamgeUrlStr.split("=");
		imageUrl = img[1];
		if (imageUrl.indexOf('%20') != -1) { //空格处理
			imageUrl = imageUrl.replace(reg, ' ');
		}*/
	}

	console.log('activityId', activityId);
}

function getCurrentAccount() {
	$.ajax({
		type: "POST",
		url: Qnzs.path + "/commons/getSessionAccount",
		dataType: "JSON",
		success: function(data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				currentAccount = data.account; // 账户信息
				console.log('currentAccount', currentAccount);
				
				loadSignPage();
			}
		}
	});
}

function loadSignPage() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/offlineActivity/detail?activityId=" + activityId,
		dataType: "JSON",
		success: function(data) {
			$('#activitySign').empty();
			if(data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				var activity = data.data;
				console.log('activity', activity);
				/*var signHtml = $('#activitySign');
				signHtml.empty();
				signHtml.append('<section class="headTxt bgcWhite mb20">');
				signHtml.append('    <div class="item clearfix">');
				signHtml.append('    	<div>' + activity.type + '<div>');
				signHtml.append('        <div class="left fl">');
				signHtml.append('            <img src="' + activity.imageUrl + '">');
				signHtml.append('        </div>');
				signHtml.append('        <div class="right">');
				signHtml.append('            <h2 class="color000">' + activity.title + '</h2>');
				signHtml.append('            <p class="fz24 color999 short_name">' + activity.activityTime + '</p>');
				signHtml.append('            <div class="follow_box clearfix fz24 color999">' + activity.address + '</div>');
				signHtml.append('        </div>'); 
				signHtml.append('    </div>');
				signHtml.append('</section>');
				signHtml.append('<a href="javascript:;" class="person_info bgcWhite disB color333 mb20">');
				signHtml.append('    <div class="info_in clearfix">');
				signHtml.append('        <h1 class="title fl fz30">报名人信息</h1>');
				signHtml.append('        <span class="fr fz30">' + currentAccount.realname + '(' + currentAccount.mobile + ')</span>');
				signHtml.append('    </div>');
				signHtml.append('</a>');
				signHtml.append('<div class="sure_sign_in">');
				signHtml.append('    <a href="javascript:signActivity();" class="disB colorfff fz30 bgc2185cf sign_in_btn">确定签到</a>');
				signHtml.append('</div>');*/
				if (activity) {
					var actBtnRequest = activity.actBtnRequest;
					if (!actBtnRequest.startsWith('sign')) {
						window.location.href = '../../view/find_active/hd_xiangqing.html?activityId=' + activityId;//未报名到登录页则跳转回活动详情页先报名
					} else {
						var signBtn = '确定签到';
						if (actBtnRequest == 'signIn') {
							signBtn = '确定签到';
						} else if (actBtnRequest == 'signOut') {
							signBtn = '确定签退';
						}
						var signHtml = '';
						signHtml += '<section class="headTxt bgcWhite mb20">';
						signHtml += '    <div class="item clearfix">';
						signHtml += '    	<div>' + activity.type + '<div>';
						signHtml += '        <div class="left fl">';
						signHtml += '            <img src="' + activity.imageUrl + '">';
						signHtml += '        </div>';
						signHtml += '        <div class="right">';
						signHtml += '            <h2 class="color000">' + activity.title + '</h2>';
						signHtml += '            <p class="fz24 color999 short_name">' + activity.activityTime + '</p>';
						signHtml += '            <div class="follow_box clearfix fz24 color999">' + activity.address + '</div>';
						signHtml += '        </div>'; 
						signHtml += '    </div>';
						signHtml += '</section>';
						signHtml += '<a href="javascript:;" class="person_info bgcWhite disB color333 mb20">';
						signHtml += '    <div class="info_in clearfix">';
						signHtml += '        <h1 class="title fl fz30">报名人信息</h1>';
						signHtml += '        <span class="fr fz30">' + currentAccount.realname + '(' + currentAccount.mobile + ')</span>';
						signHtml += '    </div>';
						signHtml += '</a>';
						signHtml += '<div class="sure_sign_in">';
						signHtml += '    <a href="javascript:signActivity();" class="disB colorfff fz30 bgc2185cf sign_in_btn">' + signBtn + '</a>';
						signHtml += '</div>';
						
						$('#activitySign').html(signHtml);
					}
				}
			}
		}
	});
}



function signActivity() {
	/*if (online == true) { *///是在线签到
		$.ajax({
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
					$.alert(data.msg);
					return;
				} else {
					$.alert(data.msg);
					window.location.href = '../../view/find_active/hd_xiangqing.html?activityId=' + activityId;
				}
			}
		});
	/*} else { //是现场扫码签到
		$.ajax({
			type: "post",
			url: Qnzs.path + "/activity/sign/activitySignOnsite",
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
					window.location.href = '../../view/find_active/hd_xiangqing.html?activityId=' + activityId;
					return;
				} else {
					alert(data.msg);
					window.location.href = '../../view/find_active/hd_xiangqing.html?activityId=' + activityId;
				}
			}
		});
	}*/
}




