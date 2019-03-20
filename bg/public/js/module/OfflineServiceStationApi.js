/**
 * Created by Administrator on 2017/6/30.
 */
// 接口IP地址
// Qnzs.path = '../../public/json';  // local
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev;  // 朱老大

// 创建线下服务站接口对象
var OfflineServiceStationApi = {};

/**
 前置条件：用户已登录系统。
 * 列表分页显示站点记录
 * @param data {obj} 属性如下
 * pageNo {int} 当前页码(默认值为1)
 * pageSize {int} 每页记录数(默认值为10)
 * keyword {string} 站点全称的关键字
 * beginTime {string} 开始时间
 * endTime {string} 结束时间
 * disabled {bool} 显示状态
 * status {int} 审核状态
 * adminOid {string} 站点管理员的Oid
 * districId {string} 地区编码
 * sort {string} 排序项、属性
 * order {string} 排序方式(desc-倒序，asc-顺序)
 * @returns {*}
 */
OfflineServiceStationApi.getStationPageByParam = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/getStationPageByParam', data, '列表分页显示站点记录');
    // return Qnzs.ApiProxy('/getStationPageByParam.json', data, '列表分页显示站点记录'); // 本地Json
};

// OfflineServiceStationApi.getStationPageByParamUrl = Qnzs.path + '/bg/stationManage/getStationPageByParam';

/**
 * 获取城市与高校列表
 * @param data {obj} 属性如下
 * provinceId {string} 上级ID(获取广东省的城市请传值440000) -- 0：省
 * type {int} 地区类型(1是地市，2是高校)
 * @returns {*}
 */
OfflineServiceStationApi.getCityByType = function (data) {
    return Qnzs.ApiProxy('/common/district/getCityByType', data, '获取城市与高校列表');
    // return Qnzs.ApiProxy('', data, '列表分页显示站点记录'); // 本地Json
};

/**
 * 获取线下服务的服务类别
 * @param data {obj} 属性如下
 * 无属性参数
 * @returns {*}
 */
OfflineServiceStationApi.findByOfflineService = function (data) {
    return Qnzs.ApiProxy('/serviceCategory/findByOfflineService', data, '获取线下服务的服务类别');
    // return Qnzs.ApiProxy('', data, '列表分页显示站点记录'); // 本地Json
};

/**
 * 新增服务站点
 * @param data {obj} 属性如下
 * // staId: 0, // 站点ID(无用)
 * fullName {string} 站点全称
 * shortName {string} 站点简称
 * // organizationId: undefined, // 站点管理员ID(无用)
 * districtId {string} 地区ID
 * address {string} 站点地址
 * serviceContent {string} 站点服务内容
 * capacity {int} 承载人数(默认8个)
 * // mapUrl: undefined, // 地图url(无用)
 * mapLongitude {double} 站点经度
 * mapLatitude {double} 站点纬度
 * // addTime: undefined, // 添加时间(无用)
 * disabled {int} 使用状态(0-正常，1-禁用)
 * // status: undefined, // 审核状态
 * // advise: undefined, // 审核意见(无用)
 * serviceTime {string} 站点服务时间
 * serviceGroup {string} 站点服务群体
 * // totalscore: undefined, // ?? 线下服务总评分(无用)
 // * imageUrl {string} 图片url(暂时无用)
 * staSceneries {string} 站点实景url(以英文逗号分隔)
 * staCategories {string} staCategories(以英文逗号分隔)
 * @returns {*}
 */
OfflineServiceStationApi.addStation = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/addStation', data, '新增服务站点');
    // return Qnzs.ApiProxy('/bg/stationManage/addStation', data, '新增服务站点', 'post');
    // return Qnzs.ApiProxy('', data, '新增服务站点'); // 本地Json
};


/**
 * 更新服务站点
 * @param data {obj} 属性如下
 *  // staId: 0, // 站点ID(无用)
 *  fullName {string} 站点全称
 *  shortName {string} 站点简称
 *  // organizationId: undefined, // 站点管理员ID(无用)
 *  districtId {string} 地区ID
 *  address {string} 站点地址
 *  serviceContent {string} 站点服务内容
 *  capacity {int} 承载人数(默认8个)
 *  // mapUrl: undefined, // 地图url(无用)
 *  mapLongitude {double} 站点经度
 *  mapLatitude {double} 站点纬度
 *  // addTime: undefined, // 添加时间(无用)
 *  disabled {int} 使用状态(0-正常，1-禁用)
 *  // status: undefined, // 审核状态
 *  // advise: undefined, // 审核意见(无用)
 *  serviceTime {string} 站点服务时间
 *  serviceGroup {string} 站点服务群体
 *  // totalscore: undefined, // ?? 线下服务总评分(无用)
 *  imageUrl {string} 图片url
 *  staCategories {string} staCategories(以英文逗号分隔)
 * @returns {*}
 */
OfflineServiceStationApi.updateStation = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/updateStation', data, '更新服务站点');
    // return Qnzs.ApiProxy('', data, '更新服务站点'); // 本地Json
};

/**
 * 服务站点审核
 * @param data 属性如下
 * staId {long} 服务站点ID(服务站点ID)
 * status {int} 审核状态(0-待审核，1-已通过，2-不通过)
 * advise {string} 审核意见(可不传)
 * @returns {*}
 */
OfflineServiceStationApi.auditStation = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/auditStation', data, '服务站点审核');
    // return Qnzs.ApiProxy('', data, '服务站点审核'); // 本地Json
};

/**
 * 启用或禁用站点
 * @param data {obj} 属性如下
 * staId {long} 服务站点ID(以英文逗号分隔)
 * disabled {bool} 状态(FALSE激活 / TRUE禁用)
 * @returns {*}
 */
OfflineServiceStationApi.disableStation = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/disableStation', data, '启用或禁用站点');
    // return Qnzs.ApiProxy('', data, '启用或禁用站点'); // 本地Json
};

/**
 * 删除站点
 * @param data
 * staId {long} 服务站点ID(以英文逗号分隔)
 * @returns {*}
 */
OfflineServiceStationApi.deleteStation = function (data) {
    return Qnzs.ApiProxy('/bg/stationManage/deleteStation', data, '删除站点');
    // return Qnzs.ApiProxy('', data, '删除站点'); // 本地Json
};

/**
 * 根据服务站点ID分页获取问题列表
 * @param data {obj} 属性如下
 * staId {long} 服务站点ID
 * pageNo {int} 页码(可不传，默认值为1)
 * pageSize {int} 每页记录数(可不传，默认值为10)
 * @returns {*}
 */
OfflineServiceStationApi.getApplicationsByStationId = function (data) {
    return Qnzs.ApiProxy('/stationManage/getApplicationsByStationId', data, '根据服务站点ID分页获取问题列表');
    // return Qnzs.ApiProxy('', data, '根据服务站点ID分页获取问题列表'); // 本地Json
};

/**
 * 生成站点二维码
 * @param data {obj} 属性如下
 * stationId {int} 站点ID
 * @returns {*}
 */
OfflineServiceStationApi.createStationQrCode = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/createStationQrCode', data, '生成站点二维码');
    // return Qnzs.ApiProxy('', data, '根据服务站点ID分页获取问题列表'); // 本地Json
};

OfflineServiceStationApi.getApplicationsByStationIdUrl = Qnzs.path + '/stationManage/getApplicationsByStationId';

