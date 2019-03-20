// 接口IP地址

//Qnzs.path=Qnzs.env.dev_wyh;
// Qnzs.path = Qnzs.env.dev2;

var ManagementApi = {};


/**
 * 找活动管理
 */

ManagementApi.managementList = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/list', data, '获取活动管理列表',1);
};

ManagementApi.managementListUrl = Qnzs.path + '/activity/offlineActivity/bg/list';

//线下活动添加接口
ManagementApi.managementAdd = function(data) {
	/*
	 * @param urlSuffix {string} url后缀(eg. '/help/help/getPcHelpList')
	 * @param data {obj} 接口数据参数
	 * @param text {string} 接口说明文本(eg. '获取帮助列表')
	 * @param {string} type 请求方法类型(eg. 'post') -- 默认是'get'
	 */
	//Qnzs.ApiProxy = function (urlSuffix, data, text, type, query) 
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/add', data, '活动管理添加', 'post');
};

//活动详情
ManagementApi.managementDetail = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/detail', data, '活动管理详情');
};

//活动内容编辑
ManagementApi.managementEdit = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/edit', data, '活动管理编辑');
};

//活动内容审核
ManagementApi.managementAudit = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/audit', data, '活动管理审核');
};
//活动管理退回
ManagementApi.managementRollback = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/rollback', data, '活动管理审核');
};

//活动管理启用
ManagementApi.managementEnable = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/enable', data, '活动管理启用');
};
//活动管理禁用
ManagementApi.managementDisable = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/disable', data, '活动管理禁用');
};

//活动内容批量审核
ManagementApi.managementAuditBatch = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/auditBatch', data, '活动管理审核');
};
//活动管理批量退回
ManagementApi.managementRollbackBatch = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/rollbackBatch', data, '活动管理审核');
};

//活动管理批量启用
ManagementApi.managementEnableBatch = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/enableBatch', data, '活动管理启用');
};
//活动管理批量禁用
ManagementApi.managementDisableBatch = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/disableBatch', data, '活动管理禁用');
};


//活动管理推荐
ManagementApi.managementRecommend = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/recommend', data, '活动管理推荐');
};

//活动管理取消推荐
ManagementApi.managementCancelRecommend = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/cancelRecommend', data, '活动管理取消推荐');
};
//活动管理全站推荐
ManagementApi.managementTopSite = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/topSite', data, '活动管理全站推荐');
};

//活动管理全站取消推荐
ManagementApi.managementCancelTopSite = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/cancelTopSite', data, '活动管理全站推荐');
};

//活动管理省级推荐
ManagementApi.managementTopProvince = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/topProvince', data, '活动管理省级推荐');
};
//活动管理省级取消
ManagementApi.managementCancelTopProvince = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/cancelTopProvince', data, '活动管理省级取消');
};

//活动管理删除
ManagementApi.managementRemove = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/remove', data, '活动管理删除');
};

//粉丝推送
ManagementApi.managementFansPushMsg= function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/fansPushMsg', data, '获取活动管理粉丝推送');
};



/**
 * 活动评论管理
 */
//活动管理评论列表
ManagementApi.commentManagementList = function(data) {
	return Qnzs.ApiProxy('/activity/comment/bg/list', data, '获取活动管理列表');
};

ManagementApi.commentManagementListUrl = Qnzs.path + '/activity/comment/bg/list';

//活动管理评论启用
ManagementApi.commentManagementEnableBatch = function(data) {
	return Qnzs.ApiProxy('/activity/comment/bg/enableBatch', data, '获取活动管理评论启用');
};

//活动管理评论禁用
ManagementApi.commentManagementDisableBatch = function(data) {
	return Qnzs.ApiProxy('/activity/comment/bg/disableBatch', data, '获取活动管理评论禁用');
};

//活动管理评论删除
ManagementApi.commentManagementRemoveBatch = function(data) {
	return Qnzs.ApiProxy('/activity/comment/bg/removeBatch', data, '获取活动管理评论删除');
};













//获取图片列表
function imag_gpj(n) {
 
	$('#imag_gpj').modal('show');
      $("#ulist").empty();
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/poster/list",
		dataType: "JSON",
		success: function(data) {

			var data = data.dataList;

			$.each(data, function(index, item) {

				$("#ulist").append('<li ><img src="' + item.posterUrl + '" alt=""> </li>');


			})
			$('#ulist li').click(function() {

				$(this).addClass('curlist').siblings('li').removeClass('curlist');

				var imgpurl = $("#ulist .curlist").find('img').attr('src');
				$('#imghead').attr("src", imgpurl);

			})

		},
		error: function(data) {


		}
	});

}


