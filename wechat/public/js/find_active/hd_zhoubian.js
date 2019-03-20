var longitude = $.cookie('lng');
var latitude = $.cookie('lat');

var pageIndex = 1;
var pageSize = 10;

var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
district_qnzs = JSON.parse(district_qnzs);
var sitenavDid = district_qnzs.sitenavOrgId;

console.log(sitenavDid);


//$(document).ready(function() {
//	// var act_type=['全部','运动','派对','旅游','亲子','讲座','公益','同城','环保','交友','电竞','抢票','其它']
//	//var act_status=['全部','活动预告','报名中','已满员','报名结束','活动中','活动结束']
//	//活动类型
//
//
//	// 百度地图API功能
//	var map = new BMap.Map("allmap");
//	var point = new BMap.Point(113.30764968, 23.1200491);
//	map.centerAndZoom(point, 12);
//	var geolocation = new BMap.Geolocation();
//	geolocation.getCurrentPosition(function(r) {
//		if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//			var mk = new BMap.Marker(r.point);
//			map.addOverlay(mk);
//			map.panTo(r.point);
//			longitude = r.point.lng;
//			latitude = r.point.lat
//			console.log(longitude);
//			console.log(latitude);
//
//			hot_hd();
//		} else {
//
//		}
//	}, {
//		enableHighAccuracy: true
//	})
//
//
//	function typeList() {
//
//		$.ajax({
//			type: "get",
//			url: Qnzs.path + "/activity/type/list",
//			dataType: "JSON",
//			success: function(data) {
//				var act_type = data.dataList;
//
//				for (var i = 0; i < act_type.length; i++) {
//					var temp = act_type[i];
//					$('.choose_body_list').eq(0).append('<li class="choose_option_type" lang="' + temp.id + '">' + temp.name + '</li>')
//				};
//
//				$('.choose_body_list .choose_option').on('click', function() {
//
//					$('.hot_hd .content').empty();
//					$(this).addClass('currs').siblings('.choose_option').removeClass('currs');
//
//
//					/*var actType = $(this).attr('lang');
//					console.log("typeList: longitude == " + longitude + " latitude == " + latitude);
//					$.ajax({
//						type: "get",
//						url: Qnzs.path + "/activity/offlineActivity/nearList",
//						data: {
//							'longitude': longitude,
//							'latitude': latitude,
//							'actType': actType,
//							'sitenavDid': sitenavDid
//						},
//						dataType: "JSON",
//						success: function(data) {
//
//							var data = data.dataList;
//							var html = ''
//							var actStatus = {
//								'1': '活动预告',
//								'2': '报名中',
//								'3': '已满员',
//								'4': '报名结束',
//								'5': '活动中',
//								'6': '活动结束'
//							};
//
//							for (var i = 0; i < data.length; i++) {
//								var tem = data[i];
//
//								html += '<a href="hd_xiangqing.html?activityId=' + tem.id + '" class="item clearfix disB">'
//								html += '<div class="item_l fl">'
//								html += '<span class="actese">' + actStatus[tem.actStatus] + '</span>'
//								html += '<img src="' + tem.imageUrl + '"alt=""/>'
//								html += '</div>'
//								html += ' <div class="item_r">'
//								html += '  <h2 class="color000">' + tem.title + '</h2>'
//								html += '  <h6>' + tem.type + '</h6>'
//								html += '  <p class="p01">' + tem.activityTime + '</p>'
//								html += '  <p class="fl p02 color999">' + tem.address + '</p>'
//								if (tem.distance < 0) {
//									html += '    <span class="fr">未知</span>'
//								} else {
//									html += '    <span class="fr">' + tem.distance + '米</span>'
//								}
//								html += ' </div>'
//								html += '</a>'
//							};
//
//							$('.hot_hd .content').append(html);
//
//
//						}
//					});
//
//
//					$('.choose_body_list').hide();*/
//
//				})
//
//
//
//			}
//		});
//	}
//	typeList();
//	//活动类型end
//
//	//活动状态
//
//	function pressList() {
//		$.ajax({
//			type: "get",
//			url: Qnzs.path + "/activity/offlineActivity/progressesList",
//			dataType: "JSON",
//			success: function(data) {
//				var act_status = data.dataList;
//
//				for (var i = 0; i < act_status.length; i++) {
//
//					var tmp = act_status[i];
//					$('.choose_body_list').eq(1).append('<li class="choose_option_progress"  lang="' + tmp.id + '">' + tmp.name + '</li>')
//				};
//				/*$('.choose_body_list .choose_option').on('click', function() {
//					$('.hot_hd .content').empty();
//					$(this).addClass('currss').siblings('.choose_option').removeClass('currss');
//					var progress = $(this).attr('lang');
//					console.log("pressList: longitude == " + longitude + " latitude == " + latitude);
//					$('.choose_body_list').hide();
//				})*/
//			}
//		});
//	}
//
//	pressList();
//	//活动状态end
//
//
//
//
//	$('.choose_body_list .choose_option_type').on('click', function() {
//		$('.hot_hd .content').empty();
//		$(this).addClass('currs').siblings('.choose_option_type').removeClass('currs');
//		var actType = $(this).attr('lang');
////		nearActivity(actType, null);
////		$('.choose_body_list').hide();
//	});
//	$('.choose_body_list .choose_option_progress').on('click', function() {
//		$('.hot_hd .content').empty();
//		$(this).addClass('currss').siblings('.choose_option_progress').removeClass('currss');
//		var progress = $(this).attr('lang');
//		console.log("pressList: longitude == " + longitude + " latitude == " + latitude);
////		nearActivity(actType, null);
////		$('.choose_body_list').hide();
//
//	})
//	
//	$('.choose_item').click(function(event) {
//		if ($(this).hasClass('cur')) {
//			$(this).removeClass('cur');
//			$('.choose_head').removeClass('cur');
//			$('.choose_body_list').hide();
//			$('.dark_cover').hide();
//		} else {
//			$(this).addClass('cur').siblings('.choose_item').removeClass('cur');
//			$('.choose_head').addClass('cur');
//			$('.choose_body_list').eq($(this).index()).show().siblings('.choose_body_list').hide();
//			$('.dark_cover').show();
//		}
//	});
//
//	$('.choose_option').click(function(event) {
//		var this_txt = $(this).text();
//		$('.choose_item').eq($(this).parent().index()).find('.choose_txt').text(this_txt);
//		$('.choose_head,.choose_item').removeClass('cur');
//		$('.choose_body_list').hide();
//		$('.dark_cover').hide();
//	});
//
//	/*活动展示列表*/
//
//
//	function hot_hd() {
//		var actType = $(this).attr('lang');
//		
//		console.log("hot_hd: longitude == " + longitude + " latitude == " + latitude);
//		$.ajax({
//			type: "get",
//			url: Qnzs.path + "/activity/offlineActivity/nearList",
//			data: {
//				'longitude': longitude,
//				'latitude': latitude,
//				'actType': actType,
//				'progress': progress,
//				'sitenavDid': sitenavDid,
//				'pageIndex': pageIndex,
//				'pageSize': pageSize
//			},
//			dataType: "JSON",
//			success: function(data) {
//				var data = data.dataList;
//				var html = '' 
//				var actStatus = {
//					'1': '活动预告',
//					'2': '报名中',
//					'3': '已满员',
//					'4': '报名结束',
//					'5': '活动中',
//					'6': '活动结束'
//				};
//				
//				for (var i = 0; i < data.length; i++) {
//					var tem = data[i];
//
//					html += '<a href="hd_xiangqing.html?activityId=' + tem.id + '" class="item clearfix disB">'
//					html += '<div class="item_l fl">'
//					html += '<span class="actese">' + actStatus[tem.actStatus] + '</span>'
//					html += '<img src="' + tem.imageUrl + '"alt=""/>'
//					html += '</div>'
//					html += ' <div class="item_r">'
//					html += '  <h2 class="color000">' + tem.title + '</h2>'
//					html += '  <h6>' + tem.type + '</h6>'
//					html += '  <p class="p01">' + tem.activityTime + '</p>'
//					html += '  <p class="fl p02 color999">' + tem.address + '</p>'
//					if (tem.distance < 0) {
//						html += '    <span class="fr">未知</span>'
//					} else {
//						html += '    <span class="fr">' + tem.distance + '米</span>'
//					}
//					html += ' </div>'
//					html += '</a>'
//				};
//
//				$('.hot_hd .content').append(html);
//			}
//		});
//	}
//
//
//
//	//	hot_hd();	
//	//  下拉查看更多
//	$('.morebtn').on('click', function() {
//		pageIndex += 1;
////		$('.hot_hd .content').empty();
//		hot_hd();
//	})
//
//});



$(document).ready(function() {
	if (!longitude || !latitude) {
		// 百度地图API功能
		var map = new BMap.Map("allmap");
		var point = new BMap.Point(113.30764968, 23.1200491);
		map.centerAndZoom(point, 12);
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r) {
			if (this.getStatus() == BMAP_STATUS_SUCCESS) {
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				map.panTo(r.point);
				longitude = r.point.lng;
				latitude = r.point.lat
				console.log(longitude);
				console.log(latitude);
	        	$.cookie('lng', longitude);
	        	$.cookie('lat', latitude);
				
				nearActivityList();
			} else {
	
			}
		}, {
			enableHighAccuracy: true
		})
	}

	typeList();
	progressList();

	$('#actType').on('change', function() {
		$('.hot_hd .content').empty();
		pageIndex = 1;
		nearActivityList();
	})

	$('#actProgress').on('change', function() {
		$('.hot_hd .content').empty();
		pageIndex = 1;
		nearActivityList();
	})

	$('.choose_body_list .choose_option_type').on('click', function() {
		
		$('.hot_hd .content').empty();
		$(this).addClass('currs').siblings('.choose_option_type').removeClass('currs');
		var actType = $(this).attr('lang');
		//		nearActivity(actType, null);
		//		$('.choose_body_list').hide();
	});
	$('.choose_body_list .choose_option_progress').on('click', function() {
		
		$('.hot_hd .content').empty();
		$(this).addClass('currss').siblings('.choose_option_progress').removeClass('currss');
		var progress = $(this).attr('lang');
		console.log("pressList: longitude == " + longitude + " latitude == " + latitude);
		//		nearActivity(actType, null);
		//		$('.choose_body_list').hide();

	})

	$('.choose_item').click(function(event) {
		if ($(this).hasClass('cur')) {
			$(this).removeClass('cur');
			$('.choose_head').removeClass('cur');
			$('.choose_body_list').hide();
			$('.dark_cover').hide();
		} else {
			$(this).addClass('cur').siblings('.choose_item').removeClass('cur');
			$('.choose_head').addClass('cur');
			$('.choose_body_list').eq($(this).index()).show().siblings('.choose_body_list').hide();
			$('.dark_cover').show();
		}
	});

	$('.choose_option').click(function(event) {
		var this_txt = $(this).text();
		$('.choose_item').eq($(this).parent().index()).find('.choose_txt').text(this_txt);
		$('.choose_head,.choose_item').removeClass('cur');
		$('.choose_body_list').hide();
		$('.dark_cover').hide();
	});

	//	hot_hd();	
	//  下拉查看更多
	$('.morebtn').on('click', function() {
		pageIndex += 1;
		nearActivityList();
		
	})
nearActivityList();
	
});



function nearActivityList(actType ,progress) {
	
	/*var actType = $('#actType').val();
	var progress = $('#actProgress').val();*/

	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/offlineActivity/nearList",
//		url: "//169.168.200.19:8080/qnzs/activity/offlineActivity/nearList",
		data: {
			'longitude': longitude,
			'latitude': latitude,
			'actType': actType,
			'progress': progress,
			'sitenavDid': sitenavDid,
			'pageIndex': pageIndex,
			'pageSize': pageSize
		},
		dataType: "JSON",
		success: function(data) {
			var data = data.dataList;
			var html = ''
			var actStatus = {
				'1': '活动预告',
				'2': '报名中',
				'3': '已满员',
				'4': '报名结束',
				'5': '活动中',
				'6': '活动结束'
			};
            if(data != null && data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var tem = data[i];
				html += '<a href="hd_xiangqing.html?activityId=' + tem.id + '" class="item clearfix disB">';
				html += '<div class="item_l fl">';
				html += '<span class="actese">' + actStatus[tem.actStatus] + '</span>';
				html += '<img src="' + tem.imageUrl + '"alt=""/>';
				html += '</div>';
				html += ' <div class="item_r">';
				html += '  <h2 class="color000">' + tem.title + '</h2>';
				html += '  <h6>' + tem.type + '</h6>';
				html += '  <p class="p01">' + tem.activityTime + '</p>';
				html += '  <p class="fl p02 color999">' + tem.address + '</p>';
				if (tem.distance < 0) {
					html += '    <span class="fr"></span>';
				} else {
					html += '    <span class="fr">' + tem.distance+ '米</span>';
				}
				html += ' </div>';
				html += '</a>';
			};

			$('.hot_hd .content').append(html);
			
			}else{
				
				$('.hot_hd .content').append('<p style="text-align: center;">加载完了<p>');
				$('.morebtn').hide();
			}
            
		}
	})
}



function typeList() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/type/list",
		dataType: "JSON",
		success: function(data) {
			//			$('#actType').empty();
			var act_type = data.dataList;
			for (var i = 0; i < act_type.length; i++) {
				var temp = act_type[i];
				//$('#actType').append('<option value="' + temp.id + '">' + temp.name + '</option>');
				$('.choose_body_list').eq(0).append('<li class="choose_option_type" lang="' + temp.id + '"  name="'+temp.name+'" onclick="typea($(this))">' + temp.name + '</li>')
				
			};
		}
	});
}




function progressList() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/offlineActivity/progressesList",
		dataType: "JSON",
		success: function(data) {
			//			$('#actProgress').empty();
			var act_status = data.dataList;
			for (var i = 0; i < act_status.length; i++) {
				var temp = act_status[i];
				//$('#actProgress').append('<option value="' + temp.id + '">' + temp.name + '</option>');
				$('.choose_body_list').eq(1).append('<li class="choose_option_progress"  lang="' + temp.id + '" name="'+temp.name+'"   onclick="progress($(this))">' + temp.name + '</li>')
			};
		}
	});
}

//活动状态条件筛选


function typea(obj){
  	
  
  	//alert(obj.attr('name'));
  	//alert(obj.attr('lang'));
  	var actType=obj.attr('lang');
  	
  	$('#active_tepy').text(obj.attr('name'));
  	
  	$('#active_tepy').attr('teypid',obj.attr('lang'));
  	
  	$('.hot_hd .content').empty();
  		$('#actType').hide();
		pageIndex = 1;
		nearActivityList(actType ,$('#active_passty').attr('progree'));
  		
}





//活动类型条件筛选
function progress(porg){
	
	//alert(porg.attr('name'));
	
	var progress=porg.attr('lang');
	$('#active_passty').text(porg.attr('name'));
	$('#active_passty').attr('progree',porg.attr('lang'));
	
 	$('.hot_hd .content').empty();
  $('#actPrpgress').hide();
		pageIndex = 1;
		
		
		nearActivityList($('#active_tepy').attr('teypid'),progress);
}
