var PosterActiveApi= {};
//活动海报管理列表及筛选接口
PosterActiveApi.PosterActiveList = function (data) {
    return Qnzs.ApiProxy('/activity/poster/bg/list', data, '获取海报管理列表',1);
};

PosterActiveApi.PosterActiveListUrl= Qnzs.path + '/activity/poster/bg/list';

//活动海报管理添加
PosterActiveApi.PosterActiveadd= function (data) {
    return Qnzs.ApiProxy('/activity/poster/bg/add', data, '获取海报管理添加');
};
//活动海报管理编辑
PosterActiveApi.PosterActiveedit= function (data) {
    return Qnzs.ApiProxy('/activity/poster/bg/edit', data, '获取海报管理添加');
};

//活动海报管理启用
PosterActiveApi.PosterActiveenable= function (data) {
    return Qnzs.ApiProxy('/activity/poster/bg/enable', data, '获取海报管理启用');
};

//活动海报管理禁用
PosterActiveApi.PosterActivedisable= function (data) {
    return Qnzs.ApiProxy('/activity/poster/bg/disable', data, '获取海报管理启用');
};

//活动海报管理删除
PosterActiveApi.PosterActivedeleteBatch= function (data) {
    return Qnzs.ApiProxy('/activity/poster/bg/deleteBatch', data, '获取海报管理删除');
};

