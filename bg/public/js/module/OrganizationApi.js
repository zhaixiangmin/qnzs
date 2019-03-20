 var OrganizationApi = {};
 
 
OrganizationApi.getDistrict = function (data) {
    return Qnzs.ApiProxy('/bg/organization/getDistrict', data, '获取下拉数据');
};

