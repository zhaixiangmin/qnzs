var ClacssTachApi={};

//第二课堂活动列表

ClacssTachApi.ClacssTachList= function (data) {
    return Qnzs.ApiProxy('/activity/extracurricularType/bg/list', data, '获取第二课堂类型管理列表',1);
};

ClacssTachApi.ClacssTachListUrl= Qnzs.path+'/activity/extracurricularType/bg/list';

//第二课堂管理新增
ClacssTachApi.ClacssTachadd= function (data) {
    return Qnzs.ApiProxy('/activity/extracurricularType/bg/add', data, '获取第二课堂类型管理添加');
};

//第二课堂管理启动
ClacssTachApi.ClacssTachenable= function (data) {
    return Qnzs.ApiProxy('/activity/extracurricularType/bg/enable', data, '获取第二课堂类型管理启用');
};

//第二课堂管理禁用
ClacssTachApi.ClacssTachdisable= function (data) {
    return Qnzs.ApiProxy('/activity/extracurricularType/bg/disable', data, '获取第二课堂类型管理禁用');
};


