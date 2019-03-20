var DraftactieApi={};

DraftactieApi.managementList = function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/draftList', data, '获取活动草稿列表',1);
};

DraftactieApi.managementListUrl= Qnzs.path +'/activity/offlineActivity/bg/draftList';



//活动详情
DraftactieApi.managementedetail= function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/detail', data, '活动管理详情');
};

//单个删除

DraftactieApi.removeDraft= function(data) {
	return Qnzs.ApiProxy('/activity/offlineActivity/bg/removeDraft', data, '草稿删除');
};












