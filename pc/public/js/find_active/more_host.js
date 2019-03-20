var publisherApi={}
var oid = "";
 var data = { /*接口参数*/

		pageIndex: 1, //当前页
		pageSize: 12 //页码数
		
	};
publisherApi.getpublishList = function(data) {

	return Qnzs.ApiProxy('/activity/publisher/list', data, '获取主办方分页');
};


$(document).ready(function(){
	Qnzs.getSessionAccount({}).then(function(data) {
		console.log('Qnzs.getSessionAccount data', data);
		currentAccount = data.account; // 账户信息
	});
	
	function indexSponsor(data) {
		
		  
		  console.log(data.length);
		             var html = '';
				$.each(data, function(index, item) {
					var coor = item.activityAverageScore;
					var corrnum = coor.toFixed(1);

					oid = item.oid; 

				

					html += '<li class="clearfix borderB01 position_r">'
					html += ' <a href="../../view/organization/organization_detail.html?oid=' + oid + '">'
					html += '  <div class="zhd_img fl">'
					html += '   <img class="imgURl" src="' + item.photoUrl + '" alt="" />'
					html += '  </div>'
					html += '  <div class="rightTxt">'
					html += '   <div class="titBox">'
					html += '    <p class="tit font14 color000">' + item.name + '</p>'
					html += '   </div>'
					html += '   <div class="scoreBox clearfix">'
					html += '    <ol class="clearfix fl"></ol>'
					html += '    <span class="fl scoreColor01 font14 fenshu"><em>' + corrnum + '</em>分</span>'
					html += '    <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span>'
					html += '   </div>'
					html += '   <div class="botBox clearfix">'
					html += '    <span class="left fl color000 font12" id="attentionCount_' + item.oid + '">' + item.attentionCount + '人关注</span>'
					html += '   </div>'
					html += '  </div>'
					html += ' </a>'
					/*if(item.isFollowed) { //已关注
						html += ' <input type="button" class="right fr colorfff disB guanzhu position_a" id="followBtn_' + item.oid + '" value="取消关注" onclick="followOrCancelOrganization(this, ' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />'
					} else { //未关注
						html += ' <input type="button" class="right fr colorfff disB guanzhu position_a" id="followBtn_' + item.oid + '" value="关注" onclick="followOrCancelOrganization(this, ' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />'
					}*/
					//		            html+=' <input type="button" class="right fr colorfff disB guanzhu position_a" id="follow_' + item.oid + '" value="关注" onclick="followOrganization(' + item.oid + ', ' + item.attentionCount + ');" />'
					//		            html+=' <input type="button" class="right fr colorfff disB guanzhu position_a" id="cancel_' + item.oid + '" style="display:none;" value="取消关注" onclick="cancelOrganizationFollow(' + item.oid + ', ' + item.attentionCount + ');" />'
					html += '</li>'
				});

				return html;
		
		
	}
	
	
	function pageCheck(parentCell, contentCell, data, arg) {
		$(parentCell).pageFun({
			contentCell: contentCell,
			/*包裹数据列表的父容器*/
			maxPage: 6,
			/*显示页码框个数*/
			apiProxy:publisherApi.getpublishList,
			/*接口函数*/
			data: data,
			/*接口参数*/
			listFun: indexSponsor,
			/*数据列表函数 -- 返回html字符串*/
			arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
     var data = { /*接口参数*/

		pageIndex: 1, //当前页
		pageSize: 12, //页码数
		keywords: undefined//关键字
	};
	pageCheck('.list', '.hot_acticve', data);
	
	
	$('#searchQuestion').on('click',function(){
		
		var keywords= $('#searchKeyWord').val();
		
		data.keywords = keywords;
		
		var html = '';
		
		html+='<ul class="clearfix hot_acticve"></ul>'
		
		$('.list').html(html);
		pageCheck('.list', '.hot_acticve', data);
	})
	

})

function followOrCancelOrganization(obj, orgId, isFollowed, attentionCount) {
	
	if(!currentAccount) {
		$.alert("请登录后再来哦！");
		$('#loginBtn').click();
		return;
	}

	$.ajax({
		type: "get",
		url: Qnzs.path + "/organizationAttention/followOrCancel",
		data: {
			'orgId': orgId
		},
		dataType: "JSON",
		success: function(data) {
			if(data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				$.alert(data.msg);
				var btnStr = "";
				
				if(isFollowed == true) { //已关注，取消关注
					attentionCount = !attentionCount || attentionCount <= 0 ? 0 : attentionCount - 1; //关注数-1
					btnStr = "关注";
				} else { //未关注，添加关注
					attentionCount = attentionCount + 1; //关注数+1
					btnStr = "取消关注";
				}

				$('#followBtn_' + orgId).val(btnStr);
				$('#attentionCount_' + orgId).text(attentionCount + '人关注');
			}
		}
	});
}