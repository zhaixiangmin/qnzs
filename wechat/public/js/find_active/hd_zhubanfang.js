//Qnzs.path = Qnzs.env.dev_wyh;//王玉环
// Qnzs.path = Qnzs.env.dev2;
var pageIndex = 1
var pageSize = 10;
var orgType;
var orgDid = '';

$(document).ready(function() {
	/*var group_1=['省级团委','地市团委','高校团委', '服务站点', '青年文明号', '学生社团', '社会组织', '合作机构'];
	var group_2=['789','586','869','52'];
	var group_3=['8956','7536','89'];
	for (var i = 0; i < group_1.length; i++) {
		$('.choose_body_list').eq(0).append('<li class="choose_option">'+group_1[i]+'</li>')
	};
	for (var i = 0; i < group_2.length; i++) {
		$('.choose_body_list').eq(1).append('<li class="choose_option">'+group_2[i]+'</li>')
	};
	for (var i = 0; i < group_3.length; i++) {
		$('.choose_body_list').eq(2).append('<li class="choose_option">'+group_3[i]+'</li>')
	};*/

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

	/*人气主办方*/
	//  function hot_sponsor(){
	/*var num=5;
        var a=0;
        var html='';
        for (var i = 0; i < num; i++) {
            a++;
            if(a>5){a=1}
            html+='<a href="hd_zhubanfangxiangqing.html">'
            html+=' <div class="zhaohd_box_in clearfix">'
            html+='  <span class="zhaohd_box_l fl">'
            html+='   <img src="images/zhuban_1.png" alt="" class="hd_pic" />'
            html+='  </span>'
            html+='  <div class="zhaohd_box_r zb_box">'
            html+='   <h3 class="zb_zhuti box_r_title">冰聚印度时尚餐吧</h3>'
            html+='   <div class="zb_pinglun scoreBox">'
            html+='    <ol class="zb_star score_ol clearfix fl">'
            html+='    </ol>'
            html+='    <span class="fenshu fl"><em class="score_num">'+a+'</em>分</span>'
            html+='    <span class="pingjia color999 fl">65人已评</span>'
            html+='   </div>'
            html+='   <p class="guanzhu color999">12人关注</p>'
            html+='  </div>'
            html+=' </div>'
            html+='</a>'
        };*/

	// $('.hot_sponsor_list').append(html);
	//}
	//hot_sponsor();

	//人气主办方搜索功能
	$('#seraherse').on('click', function() {
		$('.hot_sponsor_list').empty();
		getPublisher();
	})

	$('.morebtn').on('click', function() {
		pageIndex += 1;
		//		$('.hot_sponsor_list').empty();
		getPublisher();
	})

	//人气主办方搜索功能
	/*$('#cityDistrict').on('click',function(){
		$('.hot_sponsor_list').empty();
		getPublisher();
	})*/

	//人气主办方点击事件
	$('#areaDistrict').on('click', function() {
		$('.hot_sponsor_list').empty();
		getPublisher();
	})

	//人气主办方变化事件
	$('#areaDistrict').on('change', function() {
		$('.hot_sponsor_list').empty();
		getPublisher();
	})


	getPublisher();
});

function getPublisher() {
	var keywords = $('#keywordss').val();
	orgType = $("#orgType option:selected").val();
	orgDid = $("#areaDistrict option:selected").val();
	if (!orgDid) {
		orgDid = $("#cityDistrict option:selected").val();
	}

	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/publisher/list",
		//		url: "//169.168.200.19:8080/qnzs/activity/publisher/list",
		data: {
			'orgType': orgType,
			'districtId': orgDid,
			'keywords': keywords,
			'pageIndex': pageIndex,
			'pageSize': pageSize
		},
		dataType: "JSON",
		success: function(data) {
			var data = data.dataList;
			if (data && data.length > 0) {
				$.each(data, function(index, item) {
					var coor = item.activityAverageScore;
					var corrnum = coor.toFixed(1);
					$('.hot_sponsor_list').append('<a href="../organization/organization_detail.html?oid=' + item.oid + '"><div class="zhaohd_box_in clearfix"><span class="zhaohd_box_l fl"><img src="' + item.photoUrl + '" alt="" class="hd_pic" /></span><div class="zhaohd_box_r zb_box"><h3 class="zb_zhuti box_r_title">' + item.name + '</h3><div class="zb_pinglun scoreBox"><ol class="zb_star score_ol clearfix fl"></ol><span class="fenshu fl"><em class="score_num">' + corrnum + '</em>分</span><span class="pingjia color999 fl">' + item.activityScoreCount + '人已评</span></div><p class="guanzhu color999">' + item.attentionCount + '人关注</p></div></div></a>');
				});
				$('.morebtn').show();
				$('.dark_cover').hide();  //隐藏遮罩
			} else {
				$('.hot_sponsor_list').append('暂无更多');
				$('.morebtn').hide();
				$('.dark_cover').hide();  //隐藏遮罩
			}
		}
	});
}

function orgTypeChange() {
	orgType = $("#orgType option:selected").val();
	
	$('#cityDistrict').empty();
	$('#cityDistrict').append('<option name="cityDistrict" value="">全部</option>');
	$('#areaDistrict').empty();
	$('#areaDistrict').append('<option name="areaDistrict" value="">全部</option>');
	if (orgType == 1 || orgType == 2) { //地市团委 或 高校团委
		$.ajax({
			type: 'get',
			url: Qnzs.path + "/common/district/getCityByType",
			data: {
				'provinceId': '440000',
				'type': orgType
			},
			dataType: "JSON",
			success: function(data) {
				var districtsList = data.dataList;
				var html = '';
				$.each(districtsList, function(index, item) {
					$('#cityDistrict').append('<option name="cityDistrict" value="' + item.did + '">' + item.districtName + '</option>');
				});
			}
		});
	}

	$('.hot_sponsor_list').empty();
	getPublisher();
}


function cityChange() {
	var parentDid = $("#cityDistrict option:selected").val();
	
	$('#areaDistrict').empty();
	$('#areaDistrict').append('<option name="areaDistrict" value="">全部</option>');
	if (orgType == 1 || orgType == 2) { //地市团委 或 高校团委下级
		$.ajax({
			type: 'get',
			url: Qnzs.path + "/common/district/listByParent",
			data: {
				'parentDid': parentDid
			},
			dataType: "JSON",
			success: function(data) {
				var districtsList = data.dataList;
				$.each(districtsList, function(index, item) {
					$('#areaDistrict').append('<option name="areaDistrict" value="' + item.did + '">' + item.districtName + '</option>');
				});
			}
		});
	}

	$('.hot_sponsor_list').empty();
	getPublisher();
}