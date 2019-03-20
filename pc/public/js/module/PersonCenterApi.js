/**
 * Created by Administrator on 2017/8/4.
 */

// 接口对象 -- 个人中心
var PersonCenterApi = {};

/**
 * 获取发布的线下服务列表
 * @param data {obj} 属性如下
 * pageNo {int} 页码
 * pageSize {int} 每页最大记录数
 * @returns {*}
 */
PersonCenterApi.getMyApplications = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/getMyApplications', data, '获取发布的线下服务列表');
};

/**
 * 获取关注的线下服务站点
 * @param data {obj} 属性如下
 * pageNo {int} 页码
 * pageSize {int} 每页最大记录数
 * @returns {*}
 */
PersonCenterApi.myConcernStations = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/myConcernStations', data, '获取关注的线下服务站点');
};

/**
 * 获取发布的帮助分页列表
 * @param data {obj} 属性如下
 * applicant {string} 申请人(必传个人中心用户ID )
 * page {string} 当前页码(可不传，默认为1)
 * rows {string} 每页记录数(可不传，默认为20)
 * sort {string} 排序字段(可不传)
 * order {string} 排序方式(可不传desc 降序 asc升序)
 * @returns {*}
 */
PersonCenterApi.fingHelpByUser = function (data) {
    return Qnzs.ApiProxy('/bg/help/fingHelpByUser', data, '获取发布的帮助分页列表');
};

/**
 * 获取关注的求助组织分页列表
 * @param data {obj} 属性如下
 * username {string} 当前登录ID
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为20)
 * sort {string} 排序字段(可不传)
 * order {string} 排序方式(可不传desc 降序 asc升序)
 * @returns {*}
 */
PersonCenterApi.helpAttention = function (data) {
    return Qnzs.ApiProxy('/bg/help/helpAttention', data, '获取关注的求助组织分页列表');
};

/**
 * 切换用户角色
 * @param data {obj} 属性如下
 * username {string} 用户ID(可不传-后台获取)
 * status {string} 状态(0-组织角色，1-个人角色)
 * @returns {*}
 */
PersonCenterApi.changeAccountRole = function (data) {
    return Qnzs.ApiProxy('/bg/account/changeAccountRole', data, '切换用户角色');
};


/**
 * 我要吐槽
 * @param data {obj} 属性如下
 * quesContent {string} 吐槽内容(必传)
 * @returns {*}
 */
// PersonCenterApi.woyaoTucao = function (data) {
//     return Qnzs.ApiProxy('/pc/service/woyaoTucao', data, '我要吐槽');
// };

PersonCenterApi.changemarklist= function (data) {
    return Qnzs.ApiProxy('/personalCenter/mark/list', data, '评价列表');
};



PersonCenterApi.MyApplications= function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/getMyApplications', data, '下线服务评价');
};
/**  我参与的-重磅项目 ****/
PersonCenterApi.getmyTack_zhxm = function (data) {
    return Qnzs.ApiProxy('/project/myJoinActivityList', data, '获取发布的线下服务列表');
   };