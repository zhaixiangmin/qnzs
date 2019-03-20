var StudentMentagApi={};

//第二课堂学生信息活动管理列表
StudentMentagApi.StudentinfoList= function (data) {
    return Qnzs.ApiProxy('/activity/extracurricular/bg/activity/list', data, '获取第二课堂信息管理列表',1);
};


StudentMentagApi.StudentinfoUrl=Qnzs.path+'/activity/extracurricular/bg/activity/list';



/**
 * 获取后台管理权限获取
 * @param data {obj} 属性如下
 * @returns {*}
 */
StudentMentagApi.limit = function (data) {
    return Qnzs.ApiProxy('/bg/role/limit', data, '获取后台管理权限获取');
};