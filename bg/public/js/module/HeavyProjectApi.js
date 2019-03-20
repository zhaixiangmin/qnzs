// 接口IP地址
Qnzs.path = Qnzs.env.dev_scy;

// 接口对象 -- 重磅项目-后台管理：列表及筛选
var HeavyProjectApi = {};

/*  PC-后台页面-重磅项目管理
createOrgId 发布组织ID  String
districtId  所属地区ID  String
beginTime   报名开始时间  String
endTime 报名结束时间  String
keyWord 项目标题    String
status  审核状态    int 默认为1
pageSize    每页记录数   int 默认为10
pageIndex   当前页码    int
sort    排序字段    String
order   升序/降序   String
*/
/*HeavyProjectApi.activityList = function (data){
   return Qnzs.ApiProxy('/bg/project/activityList',data,'重磅项目-后台管理：列表及筛选')
};*/
HeavyProjectApi.activityListUrl = Qnzs.path+'/bg/project/activityList';
HeavyProjectApi.delActivityDetailUrl = Qnzs.path+'/bg/project/delActivityDetail'
