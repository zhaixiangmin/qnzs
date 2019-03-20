/**
 * Created by Administrator on 2017/8/12.
 */

// 接口IP地址
// Qnzs.path = '../../public/json';  // local
// Qnzs.path = Qnzs.env.dev_yang;  // 杨积林
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev_wyh;  // 文玉环
// Qnzs.path = Qnzs.env.dev_ls;  // 张添
// Qnzs.path = Qnzs.env.dev;  // 朱老大

// 接口对象 -- 组织
var OrganizationApi = {};

/**
 * 获取找帮助管理获取单个组织详情
 * @param data {obj} 属性如下
 * oid {string} 组织ID
 * @returns {*}
 */
OrganizationApi.findOrganizationById = function (data) {
    return Qnzs.ApiProxy('/pc/help/findOrganizationById', data, '获取组织详情');
};


/**
 * 获取已解决帮助列表
 * @param data {obj} 属性如下
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为10)
 * oid  {string} 组织ID
 * @returns {*}
 */
OrganizationApi.getPcHelpListByOid = function (data) {
    return Qnzs.ApiProxy('/pc/help/getPcHelpListByOid', data, '获取已解决帮助列表');
};


/**
 * 获取线下服务列表
 * @param data {obj} 属性如下
 * oid {string} 组织ID
 * pageNo {int} 页码(默认值为1)
 * pageSize {int} 每页最大记录数(默认值为10)
 * @returns {*}
 */
OrganizationApi.getOffLineServicePageByOid = function (data) {
    return Qnzs.ApiProxy('/applicationManage/getOffLineServicePageByOid', data, '获取线下服务列表');
};


/**
 * 获取专家/组织已解答问题列表
 * @param data {obj} 属性如下
 * username {string} 专家ID/组织ID
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
OrganizationApi.getExpAnswerList = function (data) {
    return Qnzs.ApiProxy('/pc/service/getExpAnswerList', data, '获取组织的问答列表');
};

/**
 * 获取组织的活动列表
 * @param data {obj} 属性如下
 * orgId {string} 组织ID
 * pageIndex {int} 当前页码(可不传，默认为1)
 * pageSize {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
OrganizationApi.activitiesList = function (data) {
    return Qnzs.ApiProxy('/activity/publisher/activitiesList', data, '获取组织的活动列表');
};

/**
 * 获取组织的重磅项目列表
 * @param data {obj} 属性如下
 * districtId {string} 所属地区ID(可不传)
 * activityType {string} 活动类型(可不传，推荐、赛事、评选、培训、其他)
 * stage {int} 活动阶段(可不传，0-全部、1-未开始、2-报名中、3-投票中、4-活动结束、5-报名投票同时进行中)
 * createOrgId {int} 发布组织(oid)(可不传)
 * pageNo {int} 当前页码(可不传)
 * pageSize {int} 每页记录数(可不传)
 * @returns {*}
 */
OrganizationApi.activityList = function (data) {
    return Qnzs.ApiProxy('/project/activityList', data, '获取组织的重磅项目列表');
};

/**
 * 获取单个组织的评分列表(找帮助、找活动)
 * @param data {obj} 属性如下
 * orgId {int} 组织ID
 * type {int} 类型(1:找帮助，2：找活动)
 * @returns {*}
 */
OrganizationApi.listByType = function (data) {
    return Qnzs.ApiProxy('/organizationMark/listByType', data, '获取单个组织的评分列表');
};


/**
 * 关注/取消关注
 * @param data {obj} 属性如下
 * orgId {string} 组织ID
 * @returns {*}
 */
OrganizationApi.followOrCancel = function (data) {
    return Qnzs.ApiProxy('/organizationAttention/followOrCancel', data, '关注/取消关注');
};