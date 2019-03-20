/**
 * Created by Administrator on 2017/7/15.
 */

// 接口IP地址
// Qnzs.path = '../../public/json';  // local
// Qnzs.path = Qnzs.env.dev_yang;  // 杨积林
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev_wyh;  // 文玉环
// Qnzs.path = Qnzs.env.dev_ls;  // 张添
// Qnzs.path = Qnzs.env.dev;  // 朱老大

// 接口对象 -- 找帮助
var FindHelpApi = {};

/**
 * 获取找帮助分页列表
 * @param data {obj} 属性如下
 * title {string} 找帮助名称(可不传，默认为null;搜索时用到)
 * auditStatus {int} 审核状态(可不传，默认全部，1-求助中，2-已解决)
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为20)
 * sort {string} 排序字段(可不传)
 * order {string} 排序方式(可不传，desc 降序 asc升序)
 * @returns {*}
 */
FindHelpApi.findAllHelp = function (data) {
    return Qnzs.ApiProxy('/pc/help/findAllHelp', data, '获取找帮助分页列表',1);
};


/**
 * 获取找帮助查看详情
 * @param data {obj} 属性如下
 * id {string} 找帮助ID
 * @returns {*}
 */
FindHelpApi.pcHelpDetail = function (data) {
    return Qnzs.ApiProxy('/pc/help/pcHelpDetail', data, '获取详情');
};


/**
 * 获取组织分页列表
 * @param data {obj} 属性如下
 * fullName {string} 组织名称(可不传，默认为null;搜索时用到)
 * did {string} 当前站点did
 * type {string} 类型(3：服务站点、4：青年文明号、5：学生社团 6：社会组织、7：合作机构)
 * orgType {int} 省级团委(1：省级团委，2：地市团委，3：高校团委)
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为20)
 * sort {string} 排序字段(可不传)
 * order {string} 排序方式(可不传desc 降序 asc升序)
 * @returns {*}
 */
FindHelpApi.findOrganization = function (data) {
    return Qnzs.ApiProxy('/pc/help/findOrganization', data, '获取组织分页列表',1);
};


/**
 * 获取找帮助管理获取单个组织详情
 * @param data {obj} 属性如下
 * oid {string} 组织ID
 * @returns {*}
 */
FindHelpApi.findOrganizationById = function (data) {
    return Qnzs.ApiProxy('/pc/help/findOrganizationById', data, '获取组织详情');
};


/**
 * 获取找帮助评论列表
 * @param data {obj} 属性如下
 * id {int} 找帮助ID
 * page {int} 当前页码
 * rows {int} 每页记录数
 * @returns {*}
 */
FindHelpApi.getPostPage = function (data) {
    return Qnzs.ApiProxy('/pc/help/getPostPage', data, '获取评论列表',1);
};


/**
 * 添加评论
 * @param data {obj} 属性如下
 * id {int} 找帮助ID
 * content {string} 评论内容
 * @returns {*}
 */
FindHelpApi.addPost = function (data) {
    return Qnzs.ApiProxy('/pc/help/addPost', data, '添加评论');
};

/**
 * 提交求助
 * @param data {obj} 属性如下
 * title {string} 帮助名称
 * helpPeople {string} 求助人
 * acquirer {string} 受理方
 * helpType {string} 求助类型(传中文名)
 * idCard {string} 身份证号
 * mobile {string} 电话
 * whether {string} 是否筹款(传中文名，是、否)
 * totalAmount {string} 筹款金额
 * imgUrl {string} 找帮助图片
 * @returns {*}
 */
FindHelpApi.addHelp = function (data) {
    return Qnzs.ApiProxy('/bg/help/addHelp', data, '提交求助', undefined, 'post');
};


/**
 * 举报投诉
 * @param data {obj} 属性如下
 * module {int} 来源版块(1-找活动、2-找咨询、3-找帮助、4-重磅项目、5-线下服务)
 * reportAgainstId {long} 站点ID
 * reportType {int} 举报分类(0-其他、1-欺诈、2-色情、3-诱导行为、4-不实信息、5-违法犯罪、6-骚扰、7-侵权(冒充他人、侵犯名誉等))
 * reportReason {string} 举报理由/内容(可不传)
 * @returns {*}
 */
FindHelpApi.report = function (data) {
    return Qnzs.ApiProxy('/complaint/report', data, '举报投诉');
};

/**
 * 关注/取消关注
 * @param data {obj} 属性如下
 * orgId {string} 组织ID
 * @returns {*}
 */
FindHelpApi.followOrCancel = function (data) {
    return Qnzs.ApiProxy('/organizationAttention/followOrCancel', data, '关注/取消关注');
};

/**
 * 帮助添加答谢感言
 * @param data {obj} 属性如下
 * hpId  {int} 找帮助ID
 * evaluate {string} 感言内容
 * score {int} 评分
 * @returns {*}
 */
FindHelpApi.helpEvaluateByInterface = function (data) {
    return Qnzs.ApiProxy('/bg/help/helpEvaluateByInterface', data, '帮助添加答谢感言');
};