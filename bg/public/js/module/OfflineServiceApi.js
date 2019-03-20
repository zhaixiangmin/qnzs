/**
 * Created by Administrator on 2017/7/10.
 */
// 接口IP地址
// Qnzs.path = '../../public/json';  // local
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev;  // 朱老大

// 创建线下服务接口对象
var OfflineServiceApi = {};

// /bg/applicationManage/findAllApplication

/**
 * 列表分页显示线下服务
 * @param data {obj} 属性如下
 * keyword {string} 服务描述关键字(可不传)
 * categoryId {long} 服务类型ID(可不传)
 * status {int} 线下服务审核状态(可不传，0-待审核，1-已通过，2-不通过，3-已完结，4-已评价)
 * beginTimeApply {string} 申请开始时间(可不传)
 * endTimeApply {string} 申请结束时间(可不传)
 * pageNo {int} 页码
 * pageSize {int} 每页最大记录数
 * sort {string} 排序字段(可不传)
 * order {string} 排序方式(可不传，排序方式:asc/desc)
 * @returns {*}
 */
OfflineServiceApi.findAllApplication = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/findAllApplication', data, '列表分页显示线下服务');
};


/**
 * 获取线下服务的服务类别
 * @param data {obj} 属性如下
 * 无属性参数
 * @returns {*}
 */
OfflineServiceApi.findByOfflineService = function (data) {
    return Qnzs.ApiProxy('/serviceCategory/findByOfflineService', data, '获取线下服务的服务类别');
    // return Qnzs.ApiProxy('', data, '获取线下服务的服务类别'); // 本地Json
};

/**
 * 获取未来一周的服务时间
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
OfflineServiceApi.getServiceDateTime = function (data) {
    return Qnzs.ApiProxy('/applicationManage/getServiceDateTime', data, '获取未来一周的服务时间');
    // return Qnzs.ApiProxy('', data, '获取未来一周的服务时间'); // 本地Json
};

/**
 * 获取城市与高校列表
 * @param data {obj} 属性如下
 * provinceId {string} 上级ID(获取广东省的城市请传值440000) -- 0：省
 * type {int} 地区类型(1是地市，2是高校)
 * @returns {*}
 */
OfflineServiceApi.getCityByType = function (data) {
    return Qnzs.ApiProxy('/common/district/getCityByType', data, '获取城市与高校列表');
    // return Qnzs.ApiProxy('', data, '列表分页显示站点记录'); // 本地Json
};

/**
 * 据地区编码获取服务站点
 * @param data {obj} 属性对象
 * did {string} 地区ID
 * @returns {*}
 */
OfflineServiceApi.getStationsByDistrictId = function (data) {
    return Qnzs.ApiProxy('/stationManage/getStationsByDistrictId', data, '据地区编码获取服务站点');
    // return Qnzs.ApiProxy('', data, '列表分页显示站点记录'); // 本地Json
};

/**
 * 修改线下服务
 * @param data {obj} 属性如下
 * apId {long} 线下服务ID
 * categoryId {long} 服务类别ID
 * stationId {long} 服务站点ID
 * description {string} 提问内容
 * serviceDay {date} 服务日期
 * serviceTime {string} 服务时间段
 * @returns {*}
 */
OfflineServiceApi.updateApplication = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/updateApplication', data, '修改线下服务');
    // return Qnzs.ApiProxy('', data, '修改线下服务'); // 本地Json
};

/**
 * 删除线下服务
 * @param data {obj} 属性如下
 * apId {long} 线下服务ID
 * @returns {*}
 */
OfflineServiceApi.deleteApplication = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/deleteApplication', data, '删除线下服务');
    // return Qnzs.ApiProxy('', data, '删除线下服务'); // 本地Json
};

/**
 * 审核线下服务
 * @param data {obj} 属性如下
 * apId {Long} 线下服务ID
 * quesTitle {string} 问题标题
 * description {string} 问题描述
 * categoryId {Long} 服务类别ID
 * stationId {Long} 服务站点ID
 * serviceDay {date} 服务日期
 * serviceTime {string} 服务时间段
 // * questionId {Long} 问题ID(已删除)
 // * inform {int} 是否通知
 // * informContent {string} 通知内容
 * status {int} 审核状态(1-通过，2-不通过)
 * @returns {*}
 */
OfflineServiceApi.auditApplication = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/auditApplication', data, '审核线下服务');
    // return Qnzs.ApiProxy('', data, '删除线下服务'); // 本地Json
};

/**
 * 完结线下服务
 * @param data {obj} 属性如下
 * apId {long} 线下服务ID
 * questionId {long} 问题ID
 * status {int} 审核状态(0-待审核，1-已通过，2-不通过，3-已完结，4-已评价)
 * applySummary {string} 服务总结
 * @returns {*}
 */
OfflineServiceApi.finishApplication = function (data) {
    return Qnzs.ApiProxy('/bg/applicationManage/finishApplication', data, '完结线下服务');
    // return Qnzs.ApiProxy('', data, '删除线下服务'); // 本地Json
};