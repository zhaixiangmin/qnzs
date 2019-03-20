/**
 * Created by licong on 2017/8/15.
 */

// 创建首页接口对象
var IndexApi = {};

/**
 * 获取菜单列表
 * @param data {obj} 属性如下
 * @returns {*}
 */
IndexApi.fingMenuByRid = function (data) {
    return Qnzs.ApiProxy('/bg/menuManager/fingMenuByRid', data, '获取菜单列表');
};

/**
 * 获取后台管理权限获取
 * @param data {obj} 属性如下
 * @returns {*}
 */
IndexApi.limit = function (data) {
    return Qnzs.ApiProxy('/bg/role/limit', data, '获取后台管理权限获取');
};