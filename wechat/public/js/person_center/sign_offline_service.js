/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    var lng = Utils.getQueryString('lng'); // 当前定位经度
    var lat = Utils.getQueryString('lat'); // 当前定位纬度
    var apId = Utils.getQueryString('apId'); // 服务ID
    var staId = Utils.getQueryString('staId'); // 站点ID
    if(!lng) {
        $.alert('定位参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }
    if(!lat) {
        $.alert('定位参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }
    if(!apId) {
        $.alert('服务参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }
    if(!staId) {
        $.alert('站点参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }


    //  百度地图API功能
    var map = new BMap.Map("all_map");
    var point = new BMap.Point(lng, lat);
    map.centerAndZoom(point, 16);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); // ?? 启用连续缩放效果，默认禁用
    map.enableKeyboard(); // 启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级
    // map.setAnchor(BMap.BMAP_ANCHOR_TOP_LEFT);
    map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT})); // 添加默认缩放平移控件，同时停靠在左上角

    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中

    PersonCenterApi.stationDetail({staId: staId}).then(function (data) {
        var item = data.dataList;
        $('#fullName').text(item.fullName); // 站点全称
        $('#address').text(item.address); // 站点地址
    });
    
    // 点击 '签到'
    $('#goOffine').click(function () {
        var params = {
            apId: apId, // 服务申请ID
            lng: lng, // 经度
            lat: lat // 纬度
        };
        // 线下服务申请签到
        PersonCenterApi.applicationSignIn(params).then(function (data) {
            $.alert(data.msg).then(function () {
                // window.history.back();  //返回上一页(??暂时不能用)
                window.location.href = 'release_offline_service_detail.html?applicationId=' + apId;  //返回上一页
            })
        })
    })

});