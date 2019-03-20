/**
 * Created by Administrator on 2017/07/07.
 */
// 接口IP地址
// Qnzs.path = '../../public/json';  // local
//Qnzs.path = './';  // local
// Qnzs.path = Qnzs.env.dev_yang;
// Qnzs.path = Qnzs.env.dev_ymj;  // 杨敏阶
// Qnzs.path = Qnzs.env.dev_ymj_peanut;  // 杨敏阶花生壳
// Qnzs.path = Qnzs.env.dev;  // 朱老大



// 创建线下服务站接口对象
var FindHelpApi = {};

/**
 * 帮助管理列表分页显示站点记录
 * @param data {obj} 属性如下
 * idCard {string} 身份证(可不传，默认为null;)
 * title {string} 帮助名称(可不传，默认为null)
 * helpPeople {string} 求助人(可不传，默认为null)
 * mobile {string} 手机号码(可不传，默认为null)
 * did {string} 所属机构(可不传，默认为null)
 * auditStatus {string} 审核状态(可不传，默认为null; 3-等待处理; 0-处理中; 1-求助中; 4-删除 6-组织帮助中; 2-已解决; 5-退回。)
 * page {string} 当前页码(可不传，默认为1)
 * rows {string} 每页记录数(可不传，默认为20)
 * sort {string} 排序字段(可不传按时间排序只能传“create_time“)
 * order {string} 排序方式(可不传desc 降序 asc升序)
 * @returns {*}
 */
FindHelpApi.findAllHelp = function (data) {
     return Qnzs.ApiProxy('/bg/help/findAllHelp', data, '帮助管理列表分页显示站点记录');
};

/**
 * 获取审核状态列表
 * @param data {obj} 属性如下
 * @returns {*}
 */
FindHelpApi.audit = function (data) {
    return Qnzs.ApiProxyJson('audit.json', data, '获取审核状态列表'); // 本地Json
};

/**
 * 删除
 * @param data {obj} 属性如下
 * @returns {*}
 */
FindHelpApi.delete = function (data) {
     return Qnzs.ApiProxy('/bg/help/deleteHelpPost', data, '删除');
};

/**
 * 修改 没写
 * @param data {obj} 属性如下
 * @returns {*}
 */
FindHelpApi.edit = function (data) {
    return Qnzs.ApiProxy('response.json', data, '修改'); // 本地Json
};


/**
 * 获取受理方列表
 * @param data {obj} 属性如下
 * @returns {*}
 */
FindHelpApi.getAcquirers = function (data) {
     return Qnzs.ApiProxy('/common/district/getCityByType', data, '获取受理方列表');
};

/**
 * 获取求助类型列表
 * @param data {obj} 属性如下
 * @returns {*}
 */
FindHelpApi.getHelpType = function (data) {
    return Qnzs.ApiProxyJson('helptype.json', data, '获取求助类型列表'); // 本地Json
};

// /**
//  * 获取城市或高校列表
//  * @param data {obj} 属性如下
//  * @returns {*}
//  */
// FindHelpApi.getCitiesOrSchools = function (data) {
//     return Qnzs.ApiProxyJson('city.json', data, '获取城市或高校列表'); // 本地Json
// };
// /**
//  * 获取区域或学院列表
//  * @param data {obj} 属性如下
//  * @returns {*}
//  */
// FindHelpApi.getDistrictOrCollages = function (data) {
//     return Qnzs.ApiProxyJson('district.json', data, '获取区域或学院列表'); // 本地Json
// };

/**
 * 删除图片
 * @param data {obj} 属性如下
 * postId {string} 找帮助ID
 * @returns {*}
 */
FindHelpApi.deleteImg = function (data) {
    return Qnzs.ApiProxy('/bg/help/deleteHelpPost', data, '删除图片');
};

/**
 * 找帮助（受理，退回，筹款筹人，直接帮肋，完成，启用/禁用）
 * @param data {obj} 属性如下
 * idsStr {string} 找帮助ID()
 * content {string} 内容(可不传)
 * status {string} 状态(0：受理，3：退回，1：筹款筹人:4：直接帮助，2：完成，5：启用，6：禁用)
 * @returns {*}
 */
FindHelpApi.changeBatchStatus = function (data) {
    var text = '';
    switch (data.status) {
        case 0:
            text = '受理';
            break;
        case 3:
            text = '退回';
            break;
        case 1:
            text = '筹款筹人';
            break;
        case 4:
            text = '直接帮助';
            break;
        case 2:
            text = '完成';
            break;
        case 5:
            text = '启用';
            break;
        case 6:
            text = '禁用';
            break;
        default:
            text = '暂无对应状态';
            break;
    }

    return Qnzs.ApiProxy('/bg/help/changeBatchStatus', data, '找帮助' + text,1,'POST');
    // return Qnzs.ApiProxy('response.json', data, '启动/禁用'); // 本地Json
};


/**
 * 获取组织分页列表
 * @param data {obj} 属性如下
 * fullName {string} 组织名称(可不传，默认为null;搜索时用到)
 * did {string} 类型
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
 * 获取站点列表
 * @param data {obj} 属性如下
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为10)
 * parentDid {int} 区域父ID(440000：广东省)
 * type {int} 类型(1是组织，2是高校)
 * name {string} 名称搜索
 * @returns {*}
 */
FindHelpApi.getDistrictByType = function (data) {
    return Qnzs.ApiProxy('/common/district/getDistrictByType', data, '获取站点列表',1);
};

/**
 * 找帮助管理(禁用/启用)
 * @param data {obj} 属性如下
 * helpId {string} 找帮助ID
 * status {string} 状态(是否被禁用 0：代表禁用 1：代表启动)
 * @returns {*}
 */
FindHelpApi.helpDisabled = function (data) {
    return Qnzs.ApiProxy('/bg/help/helpDisabled', data, '找帮助管理(禁用/启用)');
};

/**
 * 找帮助管理(修改)
 * @param data {obj} 属性如下
 * idCard {string} 身份证
 * title {string} 帮助名称
 * helpPeople {string} 求助人
 * mobile {string} 手机号码
 * helpType {string} 求助类型
 * whether {string} 是否筹款
 * orgId {string} 所属组织
 * imgUrl {string} 图片URL
 * helpContent {string} 求助详情
 * @returns {*}
 */
FindHelpApi.updateHelp = function (data) {
    return Qnzs.ApiProxy('/bg/help/updateHelp', data, '找帮助管理(修改)');
};

/**
 * 筹款筹人
 * @param data {obj} 属性如下
 * hId {string} 找帮助ID
 * releaseType {string} 类型（zhiyuan，tenxun, qita）
 * releaseUrl {string} 连接地址
 * @returns {*}
 */
FindHelpApi.releaseAdd = function (data) {
    return Qnzs.ApiProxy('/bg/help/releaseAdd', data, '筹款筹人');
};

/*筹款链接修改*/

FindHelpApi.releaseUpdateUrl = function (data) {
    return Qnzs.ApiProxy('/bg/help/releaseUpdateUrl', data, '筹款链接修改');
};



