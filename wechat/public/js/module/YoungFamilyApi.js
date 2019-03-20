/**
 * Created by Administrator on 2017/7/15.
 */

// 接口IP地址
// Qnzs.path = '../../public/json';  // local
// Qnzs.path = Qnzs.env.dev_yang;  // 杨积林
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj8080;  // 杨敏阶8080
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev_wyh;  // 文玉环
// Qnzs.path = Qnzs.env.dev_ls;  // 张添
// Qnzs.path = Qnzs.env.dev_yang;  // 杨积林
// Qnzs.path = Qnzs.env.dev;  // 朱老大

// 接口对象 -- 青年之家
var YoungFamilyApi = {};

/**
 * 获取附近的青年之家列表
 * @param data {obj} 属性如下
 * 无属性参数
 * @returns {*}
 */
YoungFamilyApi.getNearbyStation = function (data) {
    return Qnzs.ApiProxy('/stationManage/getNearbyStation', data, '获取附近的青年之家列表',1);
    // return Qnzs.ApiProxy('../../public/json/getNearbyStation.json', data, '获取附近的青年之家列表');


    // return Qnzs.ApiProxyJson('../../public/json/getNearbyStation.json', data, '获取附近的青年之家列表');
};

/**
 * 获取人气青年之家列表
 * @param data {obj} 属性如下
 * 无属性参数
 * @returns {*}
 */
YoungFamilyApi.getPopularityStation = function (data) {
    return Qnzs.ApiProxy('/stationManage/getPopularityStation', data, '获取人气青年之家列表',1);

    // return Qnzs.ApiProxyJson('../../public/json/getNearbyStation.json', data, '获取人气青年之家列表');
};

/**
 * 获取推荐服务站点列表
 * @param data {obj} 属性如下
 * caId {string} 服务类别ID
 * pageNo {int} 页码(默认值为1)
 * pageSize {int} 每页记录数(默认值为10)
 * @returns {*}
 */
YoungFamilyApi.getWapRecommendStations = function (data) {
    return Qnzs.ApiProxy('/stationManage/getWapRecommendStations', data, '获取推荐服务站点列表',1);

    // return Qnzs.ApiProxyJson('../../public/json/getNearbyStation.json', data, '获取推荐服务站点列表');
};


/**
 * 服务站点详情
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.stationDetail = function (data) {
    return Qnzs.ApiProxy('/stationManage/stationDetail', data, '服务站点详情');
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
 * 查询服务站点是否存在已服务案例
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.checkApplicationByStationId = function (data) {
    return Qnzs.ApiProxy('/stationManage/checkApplicationByStationId', data, '查询服务站点是否存在已服务案例');
};

/**
 * 获取站点的已服务案例
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.getApplicationByStationId = function (data) {
    return Qnzs.ApiProxy('/stationManage/getApplicationByStationId', data, '获取站点的已服务案例');
};

/**
 * 查询服务站点是否发布过线下活动
 * @param data 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.checkPublish = function (data) {
    return Qnzs.ApiProxy('/stationManage/checkPublish', data, '查询服务站点是否发布过线下活动');
};

/**
 * 获取站点的线下活动
 * @param data {obj} 属性如下
 * staId {int} 站点ID
 * @returns {*}
 */
YoungFamilyApi.getStationPublishedActivity = function (data) {
    return Qnzs.ApiProxy('/stationManage/getStationPublishedActivity', data, '获取站点的线下活动');
};

/**
 * 查询站点全称与关键字相似的记录
 * @param data {obj} 属性如下
 * lng {string} 经度(可不传)
 * lat {string} 纬度(可不传)
 * keyword {string} 关键字(可不传)
 * pageNo {string} 页码(可不传，默认值为1)
 * pageSize {string} 每页记录数(可不传，默认值为10)
 * @returns {*}
 */
YoungFamilyApi.getStationPageByKeyword = function (data) {
    return Qnzs.ApiProxy('/stationManage/getStationPageByKeyword', data, '查询站点全称与关键字相似的记录');
};

/**
 * 获取近期的搜索列表
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
YoungFamilyApi.getRecentKeywordList = function (data) {
    return Qnzs.ApiProxy('/stationManage/getRecentKeywordList', data, '获取近期的搜索列表',1);
};


/**
 * 获取热搜列表
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
YoungFamilyApi.getHotKeywordList = function (data) {
    return Qnzs.ApiProxy('/stationManage/getHotKeywordList', data, '获取热搜列表',1);
};


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
 * 获取未来一周的服务时间
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
YoungFamilyApi.getServiceDateTime = function (data) {
    return Qnzs.ApiProxy('/applicationManage/getServiceDateTime', data, '获取未来一周的服务时间');
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
    return Qnzs.ApiProxy('/common/district/getCityByType', data, '获取所属地区、组织、区域');
};

/**
 * 搜索青年之家
 * @param data {obj} 属性如下
 * keyword {int} 关键字(可不传)
 * pageNo {int} 页码(可不传，默认值为1)
 * pageSize {int} 每页记录数(可不传，默认值为10)
 * @returns {*}
 */
YoungFamilyApi.getWapStationsByKeyword = function (data) {
    return Qnzs.ApiProxy('/stationManage/getWapStationsByKeyword', data, '搜索青年之家');
};