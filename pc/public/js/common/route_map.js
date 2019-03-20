/**
 * Created by Administrator on 2017/7/18.
 */



$(function () {
	
//	var lat= Utils.getQueryString('mapLatitude');
//	var lng= Utils.getQueryString('mapLongitude');

	
	
      var lng = Utils.getQueryString('lng'); // 站点经度
      var lat = Utils.getQueryString('lat'); // 站点纬度
      
    var longitude = Utils.getQueryString('longitude'); // 当前定位经度
    var latitude = Utils.getQueryString('latitude'); // 当前定位纬度
    if(!lng || lng == 'undefined' || !lat || lat == 'undefined' || !longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
        $.alert('站点位置参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }

    var pointSource = new BMap.Point(longitude, latitude); // 原点(全局变量)
    var pointDest = new BMap.Point(lng, lat); // 终点(全局变量)
    var route = undefined; // 路径对象(全局变量,方便清除检索结果)

    // 百度地图API功能
    var map = new BMap.Map("l-map");
    map.centerAndZoom(new BMap.Point(lng, lat), 12);
    map.addControl(new BMap.NavigationControl()); // 添加默认缩放平移控件

    // 逆地址解析
    var geoc = new BMap.Geocoder();
    geoc.getLocation(pointDest, function (rs) {
        var addComp = rs.addressComponents;
        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        $('#dest_address').val(address); // 渲染终点地址的值
    });
    geoc.getLocation(pointSource, function (rs) {
        var addComp = rs.addressComponents;
        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
        $('#source_address').val(address); // 渲染原点地址的值
    });

    route = new BMap.TransitRoute(map, { renderOptions: {map: map, panel: "r-result", autoViewport: true}});
    route.search(pointSource, pointDest); // 搜索路径

    /**
     * 高亮出行图标按钮，并显示路线规划的结果面板
     * @param type {string} 线路规划类型('bus'：公交，'car'：驾车，'walking'：步行)
     */
    function highlightIcon(type) {
        route.clearResults(); // 清除最近一次检索的结果
        $('#bus_icon').css('background-position-x', '-0'); // 公交按钮 暗
        $('#car_icon').css('background-position-x', '-29px'); // 驾车按钮 暗
        $('#walking_icon').css('background-position-x', '-103px'); // 步行按钮 暗
        if(type == 'bus') {
            $('#bus_icon').css('background-position-x', '-14px'); // 公交按钮 高亮
            if(pointSource) {
                route = new BMap.TransitRoute(map, { renderOptions: {map: map, panel: "r-result", autoViewport: true}});
                route.search(pointSource, pointDest); // 搜索路径
            }
        } else if(type == 'car') {
            $('#car_icon').css('background-position-x', '-45px'); // 驾车按钮 高亮
            if(pointSource) {
                route = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
                route.search(pointSource, pointDest); // 搜索路径
            }
        } else if(type == 'walking') {
            $('#walking_icon').css('background-position-x', '-121px'); // 步行按钮 高亮
            if(pointSource) {
                route = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
                route.search(pointSource, pointDest); // 搜索路径
            }
        }
    }

    // 点击 '公交' 按钮
    $('.bus').click(function () {
        console.log('bus');
        highlightIcon('bus'); // 高亮出行图标按钮，并显示路线规划的结果面板
    });

    // 点击 '驾车' 按钮
    $('.car').click(function () {
        console.log('car');
        highlightIcon('car'); // 高亮出行图标按钮，并显示路线规划的结果面板
    });

    // 点击 '步行' 按钮
    $('.walking').click(function () {
        console.log('walking');
        highlightIcon('walking'); // 高亮出行图标按钮，并显示路线规划的结果面板
    });

    // 点击 '搜索' 按钮
    $('#submit_search').click(function () {
        var sourceText = $('#source_address').val(); // 获取原点地址的文本

        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(sourceText, function(point){
            if (point) {
                pointSource = point; // 原点(全局变量)
                highlightIcon('bus'); // 高亮出行图标按钮，并显示路线规划的结果面板
            }else{
                $.alert('您选择地址没有解析到结果!');
            }
        });
    })

});