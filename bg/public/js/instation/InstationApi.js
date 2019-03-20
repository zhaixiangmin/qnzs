
//Qnzs.path = Qnzs.env.dev2;
var InstationApi = {};

/*获取列表*/
InstationApi.instationList = function(data) {
	return Qnzs.ApiProxy('/bg/message/findMsg', data, '获取站内管理列表',1);
};

InstationApi.instationListUrl= Qnzs.path + '/bg/message/findMsg';



/*审核接口*/
InstationApi.instationaudit= function(data) {
	return Qnzs.ApiProxy('/bg/message/changeAudit', data, '站内管理审核/退回');
};

//管理查看
InstationApi.instationById= function(data) {
	return Qnzs.ApiProxy('/bg/message/findMsgById', data, '站内管理查看');
};