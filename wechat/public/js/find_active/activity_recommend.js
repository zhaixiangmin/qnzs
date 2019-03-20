/**
 * 
 */


// Qnzs.path = Qnzs.env.dev2;
var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
district_qnzs = JSON.parse(district_qnzs);
var sitenavDid = district_qnzs.sitenavOrgId;

console.log(sitenavDid);

var pageIndex = 1;
var pageSize = 6;

$(document).ready(function() {

	hot_hd();

	$('.morebtn').on('click', function() {
		pageIndex += 1;
		hot_hd();
	})
});



function hot_hd() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/offlineActivity/recommendList",
		data: {
			'sitenavDid': sitenavDid,
			'pageIndex': pageIndex,
			'pageSize': pageSize
		},
		success: function(data) {
			//var totalRecord = data.total;
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
			
			if (data!=null&&data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				var temp = data[i];

				html += '<a href="hd_xiangqing.html?activityId=' + temp.id + '" class="item clearfix disB">'
				html += ' <div class="item_l fl">'
				html += ' <span class="actese">' + actStatus[temp.actStatus] + '</span>'
				html += '  <img src="' + Utils.compressByAli(temp.imageUrl, 160, 200) + '"/>'
				html += ' </div>'
				html += ' <div class="item_r">'
				html += '  <h2 class="color000">' + temp.title + '</h2>'
				html += '  <h6>' + temp.type + '</h6>'
				html += '  <p class="p01">' + temp.activityTime + '</p>'
				html += '  <p class="fl p02 color999">' + temp.address + '</p>'
				html += ' </div>'
				html += '</a>'
			};
			$('.hot_hd .content').append(html);
			
			//if (data > (pageIndex * pageSize)) {
				$('.morebtn').show();
			//}
		}else{
			$('.hot_hd .content').append('<p style="text-align: center;">加载完了<p>');
				$('.morebtn').hide();
			
		}

		}
	});
}