var extraStuId=getUrlParam('extraStuId');
var ResultsdetailApi={};
//第二课堂成绩明细列表
ResultsdetailApi.StudentinfoList= function (data) {
	return Qnzs.ApiProxy('/activity/extracurricular/bg/enrollGrade/list?extraStuId='+extraStuId, data, '获取第二课堂信成绩列表');
};

ResultsdetailApi.StudentinfoUrl=Qnzs.path+'/activity/extracurricular/bg/enrollGrade/list?extraStuId='+extraStuId;


/*//导出成绩
function enrollGrade(n){
	window.location.href = Qnzs.path+'/activity/extracurricular/bg/enrollGrade/export?extraStuId='+extraStuId;	
}*/
