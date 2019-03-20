/**
 * Created by Administrator on 2017/7/11.
 */
// 接口IP地址
// Qnzs.path = '../../public/json';  // local
// Qnzs.path = Qnzs.env.dev_yang;  // 杨积林
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj8080;  // 杨敏阶8080
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev;  // 朱老大
// Qnzs.path = Qnzs.env.dev_wyh;  // 文玉环

// 接口对象 -- 青年之家
var YoungFamilyApi = {};

/**
 * 获取线下服务的服务类别
 * @param data {obj} 属性如下
 * 无属性参数
 * @returns {*}
 */
YoungFamilyApi.findByOfflineService = function (data) {
    return Qnzs.ApiProxy('/serviceCategory/findByOfflineService', data, '获取线下服务的服务类别',1);
};

/**
 * 站点关键字分页搜索
 * @param data {obj} 属性如下
 * pageNo {int} 页码(默认值为1)
 * pageSize {int} 每页记录数(默认值为10)
 * districtId {string} 地区ID
 * keyword {instringt} 站点名称关键字
 * @returns {*}
 */
YoungFamilyApi.getStationsPageByParam = function (data) {
    return Qnzs.ApiProxy('/stationManage/getStationsPageByParam', data, '站点关键字分页搜索',1);
};

/**
 * 根据服务站点ID分页获取服务申请列表
 * @param data {obj} 属性如下
 * staId {long} 服务站点ID
 * pageNo {int} 页码(默认值为1)
 * pageSize {int} 每页记录数(默认值为10)
 * @returns {*}
 */
YoungFamilyApi.getApplicationPageByStationId = function (data) {
    return Qnzs.ApiProxy('/stationManage/getApplicationPageByStationId', data, '根据服务站点ID分页获取服务申请列表',1);
};

/**
 * 服务站点详情
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.stationDetail = function (data) {
    return Qnzs.ApiProxy('/stationManage/stationDetail', data, '服务站点详情',1);
};

/**
 * 获取未来一周的服务时间
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
YoungFamilyApi.getServiceDateTime = function (data) {
    return Qnzs.ApiProxy('/applicationManage/getServiceDateTime', data, '获取未来一周的服务时间',1);
};

/**
 * 是否可以预约线下服务
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
YoungFamilyApi.checkApplication = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/checkApplication', data, '是否可以预约线下服务');
};

/**
 * 预约线下服务
 * @param data {obj} 属性如下
 * title {string} 标题
 * categoryId {long} 服务类别ID
 * stationId {long} 服务站点ID
 * description {string} 提问内容
 * serviceDay {date} 服务日期
 * serviceTime {string} 服务时间段
 * orgId {int} 当前分站
 * @returns {*}
 */
YoungFamilyApi.applicationService = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/applicationService', data, '预约线下服务');
};

/**
 * 关注服务站点
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.concern = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/concern', data, '关注服务站点');
};

/**
 * 取消站点关注
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.cancelConcern = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/cancelConcern', data, '取消站点关注');
};

/**
 * 根据服务站点ID分页获取自己发布的活动
 * @param data {obj} 属性如下
 * staId {long} 服务站点ID
 * pageNo {int} 页码(默认值为1)
 * pageSize {int} 每页记录数(默认值为10)
 * @returns {*}
 */
YoungFamilyApi.getSelfPublicshActivity = function (data) {
    return Qnzs.ApiProxy('/stationManage/getSelfPublicshActivity', data, '根据服务站点ID分页获取自己发布的活动',1);
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
YoungFamilyApi.report = function (data) {
    return Qnzs.ApiProxy('/complaint/report', data, '举报投诉');
};

/**
 * 推荐服务站点列表
 * @param data {obj} 属性如下
 * caId {string} 服务类别ID(可不传)
 * districtId {string} 地区ID(可不传)
 * pageNo {int} 页码(默认值为1)
 * pageSize {int} 每页记录数(默认值为10)
 * @returns {*}
 */
YoungFamilyApi.getRecommendStations = function (data) {
    return Qnzs.ApiProxy('/stationManage/getRecommendStations', data, '推荐服务站点列表',1);
};

/**
 * 分页查询已审核通过的服务站点
 * @param data {obj} 属性如下
 * pageNo {int} 页码(可不传，默认值为1)
 * pageSize {int} 每页记录数(可不传，默认值为10)
 * keyword {string} 关键字(可不传)
 * categoryId {long} 服务类型代码(可不传)
 * districtId {string} 地区ID(可不传)
 * lng {double} 经度(可不传)
 * lat {double} 纬度(可不传)
 * @returns {*}
 */
YoungFamilyApi.getAuditedStationsPageByParam = function (data) {
    return Qnzs.ApiProxy('/stationManage/getAuditedStationsPageByParam', data, '分页查询已审核通过的服务站点',1);
};

/**
 * 获取所属地区、组织、区域
 * @param data {obj} 属性如下
 * provinceId {string} 上级ID(获取广东省的城市请传值440000)
 * type {int} 地区类型(1是地市，2是高校)
 * @returns {*}
 */
YoungFamilyApi.getCityByType = function (data) {
    return Qnzs.ApiProxy('/common/district/getCityByType', data, '获取所属地区、组织、区域',1);
};

/**
 * 获取全部审核通过的服务站点
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
YoungFamilyApi.getAllAuditedStations = function (data) {
    return Qnzs.ApiProxy('/stationManage/getAllAuditedStations', data, '获取全部审核通过的服务站点',1);
};

