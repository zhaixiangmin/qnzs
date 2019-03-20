/**
 * Created by Administrator on 2017/8/4.
 */

// 接口对象 -- 个人中心
var PersonCenterApi = {};

/**
 * 获取发布的线下服务列表
 * @param data {object} 属性如下
 * pageNo {int} 页码
 * pageSize {int} 每页最大记录数
 * @returns {*}
 */
PersonCenterApi.getMyApplications = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/getMyApplications', data, '获取发布的线下服务列表');
};

/**
 * 获取关注的线下服务站点
 * @param data {object} 属性如下
 * pageNo {int} 页码
 * pageSize {int} 每页最大记录数
 * @returns {*}
 */
PersonCenterApi.myConcernStations = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/myConcernStations', data, '获取关注的线下服务站点');
};

/**
 * 获取发布的帮助分页列表
 * @param data {object} 属性如下
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
 * @param data {object} 属性如下
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
 * 服务站点详情
 * @param data {object} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
PersonCenterApi.stationDetail = function (data) {
    return Qnzs.ApiProxy('/stationManage/stationDetail', data, '服务站点详情');
};


/**
 * 获取线下服务详情
 * @param data {object} 属性如下
 * apId {long} 线下服务ID
 * @returns {*}
 */
PersonCenterApi.getApplication = function (data) {
    return Qnzs.ApiProxy('/applicationManage/getApplication', data, '获取线下服务详情');
};

/**
 * 线下服务申请签到
 * @param data {object} 属性如下
 * apId {string} 服务申请ID
 * lng {string} 经度(可不传)
 * lat {string} 纬度(可不传)
 * @returns {*}
 */
PersonCenterApi.applicationSignIn = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/applicationSignIn', data, '线下服务申请签到');
};

/**
 * 对服务站点进行评价
 * @param data {object} 属性如下
 * apId {string} 服务申请ID
 * score {string} 分数
 * evaluate {string} 评价
 * @returns {*}
 */
PersonCenterApi.evaluateStation = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/evaluateStation', data, '线下服务申请签到');
};

/**
 * 扫码评分(未预约)
 * @param data {object} 属性如下
 * stationId {long} 站点ID
 * supplyId {long} 服务快捷选择ID
 * score {int} 分数
 * evaluate {string} 评价
 * @returns {*}
 */
PersonCenterApi.evaluateApplicationByQrCode = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/evaluateApplicationByQrCode', data, '扫码评分');
};

/**
 * 根据服务站点ID获取服务快捷选项
 * @param data {object} 属性如下
 * stationId {int} 服务站点ID
 * @returns {*}
 */
PersonCenterApi.getServiceSupply = function (data) {
    return Qnzs.ApiProxy('/serviceSupplyManage/getServiceSupply', data, '获取服务快捷选项');
};

/**
 * 切换用户角色
 * @param data {object} 属性如下
 * username {string} 用户ID(可不传-后台获取)
 * status {string} 状态(0-组织角色，1-个人角色)
 * @returns {*}
 */
PersonCenterApi.changeAccountRole = function (data) {
    return Qnzs.ApiProxy('/bg/account/changeAccountRole', data, '切换用户角色');
};

/**
 * 手机号是否已验证判断
 * @param data {object} 属性如下
 * mobile {string} 手机号码
 * @returns {*}
 */
PersonCenterApi.checkMobile = function (data) {
    return Qnzs.ApiProxy('/commons/checkMobile', data, '手机号是否已验证判断');
};

/**
 * 更新手机号码
 * @param data {object} 属性如下
 * username {string} 用户名
 * phone {string} 原手机号
 * code {string} 图形验证码
 * @returns {*}
 */
PersonCenterApi.updatePhoone = function (data) {
    return Qnzs.ApiProxy('/bg/account/updatePhoone', data, '更新手机号码');
};

/**
 * 发送短信验证码接口
 * @param data {object} 属性如下
 * phone {string} 新手机号
 * updateMobileValidCode {string} 图形验证码
 * @returns {*}
 */
PersonCenterApi.updatePhoneSecurityCodea = function (data) {
    return Qnzs.ApiProxy('/bg/account/updatePhoneSecurityCodea', data, '发送短信验证码接口');
};

/**
 * 获取所有个性标签列表
 * @param data {object} 属性如下
 * 暂无参数
 * @returns {*}
 */
PersonCenterApi.findDictionary = function (data) {
    return Qnzs.ApiProxy('/bg/dictionary/findDictionary', data, '获取所有个性标签列表');
};

/**
 * 更新个人信息
 * @param data {object} 属性如下
 * username {string} 用户ID
 * photoUrl {string} 头像
 * address {string} 联系地址
 * description {string} 自我描述
 * email {string} 邮箱
 * realname {string} 昵称
 * gender {int} 性别(1：男，2：女，3：保密)
 * lable {string} 标签组数字符串 ["1d946096-cb90-11e3-a2ee-001e67a18a01","1d946093-cb90-11e3-a2ee-001e67a18a01","1d946095-cb90-11e3-a2ee-001e67a18a01"]
 * did {string} 区域ID
 * @returns {*}
 */
PersonCenterApi.pcUpdatAccount = function (data) {
    return Qnzs.ApiProxy('/bg/account/pcUpdatAccount', data, '更新个人信息');
};

