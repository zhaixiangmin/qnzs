// 接口IP地址
// Qnzs.path = Qnzs.env.dev_yang;

// 接口对象 -- 在线问题管理：列表及筛选
var FindConsultApi = {};

/*  PC-后台页面-重磅项目管理
 categoryId      服务类别ID    Long
 askerAccId      提问者用户ID  Long
 answerAccId     回答者用户ID  Long
 keyword         关键字        String
 beginTimeAsk    提问开始时间  Date
 endTimeAsk      提问结束时间  Date
 beginTimeAnswer 回答开始时间  Date
 endTimeAnswer   回答结束时间  Date
 isPublic        是否公开      Int
 level           问题分级      Int
 status          状态          Int
 isDisabled      是否禁用      Int
 isEssence       是否精华帖    Int
*/
FindConsultApi.serviceQuestionList = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/list',data,'找咨询-问题管理：列表及筛选',1)
};
FindConsultApi.serviceQuestionListUrl = Qnzs.path+'/bg/serviceQuestion/list';

/**
 * 查询服务类别为找咨询列表
 * @param data {obj}
 * hpId {int} 找帮助ID
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为5)
 * @returns {*}
 */
// FindConsultApi.findByAdvice = function (data) {
//    return Qnzs.ApiProxy('/bg/serviceCategory/findByAdvice', data, '查询服务类别为找咨询列表');
// };
//查询服务类别为找咨询列表
FindConsultApi.findByAdvice = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/findByAdvice',data,'获取所属服务类别列表',1)
};
FindConsultApi.findByAdviceUrl = Qnzs.path+'/bg/serviceCategory/findByAdvice';//查询服务类别为找咨询列表（后台）
//问题管理新增接口
FindConsultApi.serviceQuestionAdd = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/add',data,'找咨询-问题管理：新增接口')
};
//新增-查询所有问题标签
FindConsultApi.findDictionary = function (data){
   return Qnzs.ApiProxy('/bg/dictionary/findDictionary',data,'查询所有问题标签')
};
FindConsultApi.findDictionaryUrl = Qnzs.path+'/bg/dictionary/findDictionary';//查询所有问题标签（后台）
//新增-根据类别查询对应专家接口
FindConsultApi.findExpertsByCategory = function (data){
   return Qnzs.ApiProxy('/bg/accountExpert/findExpertsByCategory',data,'根据类别查询对应专家接口')
};
//问题管理编辑接口
FindConsultApi.serviceQuestionEdit = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/edit',data,'找咨询-问题管理：编辑接口')
};
FindConsultApi.serviceQuestionEditUrl = Qnzs.path+'/bg/serviceQuestion/edit';//问题管理编辑接口
//编辑-根据问题ID查该问题
FindConsultApi.findServiceQuestionbyId = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/findServiceQuestionbyId',data,'问题管理-编辑-根据问题ID查该问题')
};
//编辑-根据问题ID查询对应专家
FindConsultApi.findAllExpertByQuestion = function (data){
   return Qnzs.ApiProxy('/bg/accountExpert/findAllExpertByQuestion',data,'问题管理-编辑-根据问题ID查询对应专家')
};
FindConsultApi.findAllExpertByQuestionUrl = Qnzs.path+'/bg/accountExpert/findAllExpertByQuestion';//根据问题ID查询对应专家
//编辑-加载当前用户组织下的所有的组织(不包括下级分站)
FindConsultApi.getAllCurrOrgByAcc = function (data){
   return Qnzs.ApiProxy('/bg/organization/getAllCurrOrgByAcc',data,'问题管理-编辑-加载当前用户组织下的所有的组织',1)
};
FindConsultApi.getAllCurrOrgByAccUrl = Qnzs.path+'/bg/organization/getAllCurrOrgByAcc';//加载当前用户组织下的所有的组织
//编辑-根据问题ID查询对应组织
FindConsultApi.findAllOrgByQuestion = function (data){
   return Qnzs.ApiProxy('/bg/organization/findAllOrgByQuestion',data,'问题管理-编辑-根据问题ID查询对应组织')
};
FindConsultApi.findAllOrgByQuestionUrl = Qnzs.path+'/bg/organization/findAllOrgByQuestion';//根据问题ID查询对应组织
//编辑-根据问题ID查询标签
FindConsultApi.findDictionaryByQuestion = function (data){
   return Qnzs.ApiProxy('/bg/dictionary/findDictionaryByQuestion',data,'问题管理-编辑-根据问题ID查询标签')
};
FindConsultApi.findDictionaryByQuestionUrl = Qnzs.path+'/bg/dictionary/findDictionaryByQuestion';//根据问题ID查询标签
//问题管理删除接口
FindConsultApi.serviceQuestionDele = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/delete',data,'找咨询-问题管理：删除接口')
};
//问题管理启用接口
FindConsultApi.serviceQuestionStart = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/enable',data,'找咨询-问题管理：启用接口')
};
//问题管理禁用接口
FindConsultApi.serviceQuestionStop = function (data){
   return Qnzs.ApiProxy('/bg/serviceQuestion/disable',data,'找咨询-问题管理：禁用接口')
};


/*服务类别管理*/
FindConsultApi.serviceCategoryListUrl = Qnzs.path+'/bg/serviceCategory/list';//服务类别查询列表
//服务类别管理-新增
FindConsultApi.serviceCategoryAdd = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/add',data,'找咨询-服务类别管理：新增接口')
};
FindConsultApi.serviceCategoryAddUrl = Qnzs.path+'/bg/serviceCategory/add';//服务类别管理新增
//服务类别管理-编辑
FindConsultApi.serviceCategoryEdit = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/edit',data,'找咨询-服务类别管理：编辑接口')
};
FindConsultApi.serviceCategoryAddUrl = Qnzs.path+'/bg/serviceCategory/edit';//服务类别管理编辑
//根据ID查询服务类别接口
FindConsultApi.findCategorieById = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/findCategorieById',data,'找咨询-服务类别管理：根据ID查询服务类别接口',1)
};
FindConsultApi.findCategorieByIdUrl = Qnzs.path+'/bg/serviceCategory/findCategorieById';//根据ID查询服务类别接口
//服务类别管理-启用
FindConsultApi.serviceCategoryEnable = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/enable',data,'找咨询-服务类别管理：根据ID查询服务类别接口')
};
//服务类别管理-禁用
FindConsultApi.serviceCategoryDisable = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/disable',data,'找咨询-服务类别管理：根据ID查询服务类别接口')
};
//服务类别管理-删除
FindConsultApi.serviceCategoryDelete = function (data){
   return Qnzs.ApiProxy('/bg/serviceCategory/delete',data,'找咨询-服务类别管理：服务类别删除接口')
};

/*在线回答管理*/
FindConsultApi.serviceAnswerListUrl = Qnzs.path+'/bg/serviceReply/list';//服务类别查询列表
//在线回答管理-审核通过
FindConsultApi.auditUpdate = function (data){
   return Qnzs.ApiProxy('/bg/serviceReply/auditUpdate',data,'找咨询-在线回答管理：审核通过')
};
//在线回答管理-审核不通过
FindConsultApi.deletePost = function (data){
   return Qnzs.ApiProxy('/bg/serviceReply/deletePost',data,'找咨询-在线回答管理：审核不通过')
};