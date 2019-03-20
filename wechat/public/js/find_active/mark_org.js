//Qnzs.path = Qnzs.env.dev_wyh;
// Qnzs.path = Qnzs.env.dev2;


var activityId = '';
var orgId = '';
var currentAccount = "";

$(document).ready(function() {
	getRequestParams();
	
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
			}
		}
	});
	
	$.ajax({
		type: "GET",
		url: Qnzs.path + "/activity/publisher/detail",
		data: {
			'orgId': orgId
		},
		dataType: "JSON",
		success: function(data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				var organization = data.data;
				var html = '';
				html += '<section class="headTxt bgcWhite mb20">';
		    	html += '	<div class="item clearfix">';
		        html += '		<div class="left fl">';
				html += '           <img src="' + organization.photoUrl + '">';
				html += '       </div>';
				html += '       <div class="right">';
				html += '       	<h2 class="color000">' + organization.fullName + '</h2>';
				html += '       	<p class="fz24 color999 short_name">简称：' + organization.name + '</p>';
				html += '       	<div class="follow_box clearfix fz24 color999">' + organization.description + '</div>';
				html += '       	<div class="follow_box clearfix fz24 color999">' + organization.address + '</div>';
				html += '       </div>';
				html += '	</div>';
				html += '</section>';
				html += '<a href="javascript:;" class="person_info bgcWhite disB color333 mb20">';
				html += '	<div class="info_in clearfix">';
				html += '       <h1 class="title fl fz30">报名人信息</h1>';
				html += '       <span class="fr fz30">' + currentAccount.realname + '(' + currentAccount.mobile + ')</span>';
				html += '	</div>';
				html += '</a>';
		
				$('#orgMark').prepend(html);
			}
		}
	});
	
	/*$('.publish_btn bgc2185cf fz28 colorfff').click(function(){
		var score = $('.mark_box .start_list .item.cur:last').index() + 1;
		var isNick = $('#anonymous').prop('checked');
		var remark = $('#remark').val();
		$.ajax({
			type: "get",
			url: Qnzs.path + "/organizationMark/markOrganization",
			data: {
				'orgId': orgId,
				'type': 2, //评分类型/模块 (1-找帮助爱心组织，2-找活动主办方)
				'objectId': activityId,
				'score': score,
				'isNick': isNick,
				'remark': remark
			},
			dataType: "JSON",
			success: function(data) {
				if (data.status != 'OK') {
					alert(data.msg);
					return;
				} else {
					window.location.href = '../find_active/hd_xiangqing.html?activityId=' + activityId; //弹出评分弹窗或跳转评分页面
				}
			}
		});
	});*/
});



function getRequestParams() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		var params = strs.split('&');
		var actIdStr = params[0];
		var actIds = actIdStr.split("=");
		activityId = actIds[1];
		var orgIdStr = params[1];
		var orgIds = orgIdStr.split("=");
		orgId = orgIds[1];
//		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
//		
//		activityId = strs[1];

	}
}
	

/**
 * 给活动主办方评分
 */
function markActivityOrg() {
	var score = $('.mark_box .start_list .item.cur:last').index() + 1;
	var isNick = $('#anonymous').prop('checked');
	var remark = $('#remark').val();
	$.ajax({
		type: "POST",
		url: Qnzs.path + "/organizationMark/markOrganization",
		data: {
			'orgId': orgId,
			'type': 2, //评分类型/模块 (1-找帮助爱心组织，2-找活动主办方)
			'objectId': activityId,
			'score': score,
			'isNick': isNick,
			'remark': remark
		},
		dataType: "JSON",
		success: function(data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				$.alert(data.msg);
				window.location.href = '../find_active/hd_xiangqing.html?activityId=' + activityId; //弹出评分弹窗或跳转评分页面
			}
		}
	});
}
