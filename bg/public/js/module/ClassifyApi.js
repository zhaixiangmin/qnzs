var ClassifyApi= {};

 //分类管理列表
ClassifyApi.ClassifyList= function (data) {
    return Qnzs.ApiProxy('/activity/type/bg/list', data, '获取分类管理列表',1);
};

ClassifyApi.ClassifyListUrl= Qnzs.path + '/activity/type/bg/list';

//增加分类类别信息
ClassifyApi.Classifyadd = function (data) {
    return Qnzs.ApiProxy('/activity/type/bg/add', data, '活动类别添加');
};

//编辑分类类别
ClassifyApi.Classifyedit = function (data) {
    return Qnzs.ApiProxy('/activity/type/bg/edit', data, '活动类别编辑');
};
//活动类别启用
ClassifyApi.Classifyenable = function (data) {
    return Qnzs.ApiProxy('/activity/type/bg/enable', data, '活动类别启用');
};
//活动类别禁用
ClassifyApi.Classifydisable = function (data) {
    return Qnzs.ApiProxy('/activity/type/bg/disable', data, '活动类别禁用');
};
//活动类别删除
ClassifyApi.ClassifydeleteBatch = function (data) {
    return Qnzs.ApiProxy('/activity/type/bg/deleteBatch', data, '活动类别删除');
};
