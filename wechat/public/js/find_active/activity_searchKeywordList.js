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
var keywords = '';

$(document).ready(function() {
	getRequestParams();
	
	hot_hd();

	$('.morebtn').on('click', function() {
		pageIndex += 1;
		hot_hd();
	})
});


function getRequestParams() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
		//    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		keywords = strs[1];
		
		//此句很关键
		keywords = decodeURI(keywords);//浏览器会将url中的中文参数进行encodeURI编码，所以要通过js使用decodeURI进行解码
	}
}

function hot_hd() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/offlineActivity/list",
//		url: "//169.168.200.19:8080/qnzs/activity/offlineActivity/list",
		data: {
			'sitenavDid': sitenavDid,
			'keywords': keywords,
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
					html += '  <img src="' + temp.imageUrl + '"/>'
					html += ' </div>'
					html += ' <div class="item_r">'
					html += '  <h2 class="color000">' + temp.title + '</h2>'
					html += '  <h6>' + temp.type + '</h6>'
					html += '  <p class="p01">' + temp.activityTime + '</p>'
					html += '  <p class="fl p02 color999">' + temp.address + '</p>'
						/* html+='  <span class="fr color999">&lt;'+temp.distance+'m</span>'*/
					html += ' </div>'
					html += '</a>'
				};
				$('.hot_hd .content').append(html);
				
				/*if (totalRecord > (pageSize * pageIndex)) {
					$('.morebtn').show();
				}*/
			}
			else{
				$('.hot_hd .content').append('<p style="text-align: center;">加载完了<p>');
				$('.morebtn').hide();
				
				
			}
		}
	});
}