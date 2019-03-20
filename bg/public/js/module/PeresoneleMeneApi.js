var activityId=getUrlParam('activityId');




var PeresoneleMeneApi={};


//第二课堂报名人员管理列表
PeresoneleMeneApi.PeresoneleMeneList= function (data) {
	return Qnzs.ApiProxy('/activity/extracurricular/bg/enrollAcc/list?activityId='+activityId, data, '获取第二课堂信成绩列表',1);
};

PeresoneleMeneApi.PeresoneUrl=Qnzs.path+'/activity/extracurricular/bg/enrollAcc/list?activityId='+activityId;


//第二课堂学生信息批量确认(认定/审核)接口
PeresoneleMeneApi.PeresoneleMeneaconfirmBatch= function (data) {
	return Qnzs.ApiProxy('/activity/extracurricular/bg/enrollAcc/confirmBatch', data, '认定/审核');
};


/*//人员导出接口
function updateredact(){
	window.location.href = Qnzs.path+'/activity/extracurricular/bg/enrollAcc/export?activityId='+activityId;
}*/
