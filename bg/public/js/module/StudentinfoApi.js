var StudentinfoApi={};

//第二课堂学生信息管理列表

StudentinfoApi.StudentinfoList= function (data) {
	return Qnzs.ApiProxy('/activity/extracurricular/bg/student/list', data, '获取第二课堂信息管理列表',1);
};

StudentinfoApi.StudentinfoUrl=Qnzs.path+'/activity/extracurricular/bg/student/list';

//第二课堂学生信息修改列表
StudentinfoApi.Studentinfoedit= function (data) {
	return Qnzs.ApiProxy('/activity/extracurricular/bg/student/edit', data, '获取第二课堂信息管修改');
};
//第二课堂学生信息审核
StudentinfoApi.StudentinauditBatch= function (data) {
	return Qnzs.ApiProxy('/activity/extracurricular/bg/student/auditBatch', data, '获取第二课堂信息管审核');
};


/*//导出信息
function  startusing(n){
	window.location.href = Qnzs.path+'/activity/extracurricular/bg/student/export'	;
}*/
