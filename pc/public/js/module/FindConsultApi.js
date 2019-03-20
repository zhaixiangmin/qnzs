// 接口对象 -- 找咨询
var FindConsultApi = {};
// Qnzs.path = Qnzs.env.dev;

/**
 * PC--找咨询--帮助列表
 * @param data {obj} 属性如下
 * spage 传的参数对应字段起始页
 * rows 显示记录数
 * keyword 关键字查询
 * @returns {*}
 */

/**
 * 查询找咨询全部服务类别接口
 * @param {obj} data 属性如下
 * hpId 找帮助ID
 * @returns {*}
 */
FindConsultApi.getServiceCategory = function (data) {
  return Qnzs.ApiProxy('/pc/service/getServiceCategory', data, '查询找咨询全部服务类别接口',1);
};

/**
 * 找咨询列表
 * @param {obj} data 属性如下
 * hpId 找帮助ID
 * @returns 数组[{}, {}]
 */
FindConsultApi.getServiceList = function (data) {
  return Qnzs.ApiProxy('/pc/service/index', data, '找咨询列表',1);
};

//获取人气专家
FindConsultApi.findAllExpertAccount = function (data) {
  return Qnzs.ApiProxy('/pc/service/findAllExpertAccount', data, '人气专家列表',1);
};

//获取首页推荐专家，应根据每周回答量，从多到少，每周更新一批
//根据每周专家回答问题数排序，获取专家列表
FindConsultApi.findIndexExpertAccounts = function (data) {
  return Qnzs.ApiProxy('/pc/service/findIndexExpertAccounts', data, '人气专家列表',1);
};

//专家详情
FindConsultApi.findAccountById = function (data) {
  return Qnzs.ApiProxy('/pc/service/findAccountById', data, '专家详情',1);
};

//获取活跃组织
FindConsultApi.searchOrganization = function (data) {
  return Qnzs.ApiProxy('/pc/service/searchOrganization', data, '获取活跃组织',1);
};
//组织详情
FindConsultApi.findOrganizationById = function (data) {
  return Qnzs.ApiProxy('/pc/service/findOrganizationById', data, '组织详情',1);
};
//问题详情
//* username 用户名 必传
//* quId 问题ID 必传
FindConsultApi.getQuesDetail = function (data) {
  return Qnzs.ApiProxy('/pc/service/getQuesDetail', data, '问题详情',1);
};
//问题管理新增接口
/**
 * 问题管理新增接口
 * @param data {object} 属性如下
 * title {string} 标题(问题标题)
 * askContent {string} 内容(问题内容)
 * categoryId {string} 服务类别ID(服务类别ID)
 * sitenavOrgId {string} 站点ID(可不传，站点ID)
 * accOrgIdsStr {string} 组织ID(可不传，问组织必填，默认一个,问大家不传)
 * accExpertIdsStr {string} 专家ID(可不传，问专家必填，默认一个，问大家不传)
 * quesLabelIdsStr {string} 标签ID(可不传，标签ID)
 * quesImagesStr {string} 图片URL(可不传，阿里云图片URL)
 * isCelebrity {string} 名人问吧帖子(可不传，名人问吧帖子，必须传1)
 * @returns {*}
 */
FindConsultApi.add = function (data) {
  return Qnzs.ApiProxy('/pc/service/add', data, '问题管理新增接口');
};

/**
 * 获取专家/组织已解答问题列表
 * @param data {obj} 属性如下
 * username {string} 专家ID/组织ID
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为10)
 * @returns {*}
 */
FindConsultApi.getExpAnswerList = function (data) {
  return Qnzs.ApiProxy('/pc/service/getExpAnswerList', data, '专家详情下面问题列表',1);
};

/**
 * 问题详情获取评论
 * @param {obj} data 属性如下
 * quId {Long} 问题ID(必传)
 * page {Int} 当前页（为空=1）(可不传)
 * rows {Int} 每页显示条数（为空=10）(可不传)
 * @returns {*}
 */
FindConsultApi.getReplysByQuestionId = function (data) {
  return Qnzs.ApiProxy('/pc/service/getReplysByQuestionId', data, '问题评论列表',1);
};
/**
 * 找咨询问题点赞或收藏
 * @param {obj} data 属性如下
 * actionType {Int} 类型10：点赞，11：收藏(必传)
 * quId {Long} 问题ID (可不传)
 * @returns {*}
 */
FindConsultApi.operatedCommit = function (data) {
  return Qnzs.ApiProxy('/pc/service/operatedCommit', data, '找咨询问题点赞或收藏');
};
/**
 * 找咨询问题评论
 * @param {obj} data 属性如下
 * queId {Long} 问题ID(必传)
 * content {String} 回复内容 (必传)
 * @returns {*}
 */
FindConsultApi.replyToQuestion = function (data) {
  return Qnzs.ApiProxy('/pc/service/replyToQuestion', data, '找咨询问题评论');
};
/**
 * 问题是否重复评论
 * @param {obj} data 属性如下
 * queId {Long} 问题ID(必传)
 * content {String} 回复内容 (可不传)
 * @returns {*}
 */
FindConsultApi.repeatContent = function (data) {
  return Qnzs.ApiProxy('/pc/service/repeatContent', data, '问题是否重复评论');
};
/**
 * 找咨询评论点赞
 * @param {obj} data 属性如下
 * repId {Long} 评论ID(必传)
 * @returns {*}
 */
FindConsultApi.replyLike = function (data) {
  return Qnzs.ApiProxy('/pc/service/replyLike', data, '找咨询评论点赞');
};
/**
 * 找咨询评论删除
 * @param {obj} data 属性如下
 * repId {Long} 评论ID(必传)
 * @returns {*}
 */
FindConsultApi.delReply = function (data) {
  return Qnzs.ApiProxy('/pc/service/delReply', data, '找咨询评论删除');
};
/**
 * 找咨询评论回复
 * @param {obj} data 属性如下
 * repId {Long} 回复ID(可不传)
 *  content {String} 回复内容(可不传)
 * @returns {*}
 */
FindConsultApi.replyToReply = function (data) {
  return Qnzs.ApiProxy('/pc/service/replyToReply', data, '找咨询评论回复');
};
/**
 * 关注/取消关注
 * @param data {obj} 属性如下
 * orgId {string} 组织ID(必传)
 * @returns {*}
 */
FindConsultApi.followOrCancel = function (data) {
  return Qnzs.ApiProxy('/organizationAttention/followOrCancel', data, '关注/取消关注');
};
/**
 * 举报
 * @param data {obj} 属性如下
 * module {int} 举报来源模块(必传) 1-找活动、2-找咨询、3-找帮助、4-重磅项目、5-线下服务
 * reportAgainstId {long} 被举报实体ID(必传) 如活动/问题/求助/重磅项目/线下服务ID
 * reportType {int} 举报分类(必传) 0-其他、1-欺诈、2-色情、3-诱导行为、4-不实信息、5-违法犯罪、6-骚扰、7-侵权(冒充他人、侵犯名誉等)
 * reportReason {String} 举报理由/内容(可不传)
 * @returns {*}
 */
FindConsultApi.report = function (data) {
  return Qnzs.ApiProxy('/complaint/report', data, '举报');
};
/**
 * 我要吐槽
 * @param data {obj} 属性如下
 * quesContent {string} 吐槽内容(必传)
 * @returns {*}
 */
FindConsultApi.woyaoTucao = function (data) {
  return Qnzs.ApiProxy('/pc/service/woyaoTucao', data, '我要吐槽');
};
/**
 * 个人中心-系统消息
 * @param data {obj} 属性如下
 * title {string} 标题()
 * msgType {string} 站内信类型()
 * status {string} 消息状态(0未读，1已读，2已删)
 * pageNo {string} 当前页码()
 * pageSize {string} 每页记录数()
 * @returns {*}
 */
FindConsultApi.findAllMessage = function (data) {
  return Qnzs.ApiProxy('/bg/message/findAllMessage', data, '系统消息',1);
};
/**
 * 改变私信的状态
 * @param data {obj} 属性如下
 * receiveId {string} 站内信ID(必传)
 * type {string} 站内信状态(必传)
 * @returns {*}
 */
FindConsultApi.changeStatus = function (data) {
  return Qnzs.ApiProxy('/bg/message/changeStatus', data, '改变私信的状态');
};
/**
 * 批量改变私信状态
 * @param data {obj} 属性如下
 * status {string} 站内信状态(必传,read=已读 / del=删除)
 * msgType {string} 站内信类型(0系统级，1组织级，2用户级)
 * @returns {*}
 */
FindConsultApi.changeAllStatus = function (data) {
  return Qnzs.ApiProxy('/bg/message/changeAllStatus', data, '改变私信的状态');
};
//找咨询个人中心我的发布
FindConsultApi.getMyQuestions = function (data) {
  return Qnzs.ApiProxy('/pc/service/getMyQuestions', data, '找咨询个人中心我的发布');
};
//个人中心组织关注列表
FindConsultApi.followedList = function (data) {
  return Qnzs.ApiProxy('/personalCenter/organization/followedList', data, '个人中心组织关注列表',1);
};
//个人中心专家关注列表
FindConsultApi.followedExpertList = function (data) {
  return Qnzs.ApiProxy('/pc/service/followedExpertList', data, '个人中心专家关注列表',1);
};
//关注专家 /取消关注专家
FindConsultApi.followOrCancelExpert = function (data) {
  return Qnzs.ApiProxy('/pc/service/followOrCancelExpert', data, '关注专家 /取消关注专家');
};

/**
 * 问题管理删除接口
 * @param data {object} 属性如下
 * quId {int} 问题ID
 * @returns {*}
 */
FindConsultApi.delete = function (data) {
  return Qnzs.ApiProxy('/pc/service/delete', data, '问题管理删除');
};

/**
 * 领取接口
 * @param data {object} 属性如下
 * Id {int} 问题ID
 *
 */

FindConsultApi.getPresent= function (data) {
  return Qnzs.ApiProxy('/bg/getPresent', data, '点击领取');
};