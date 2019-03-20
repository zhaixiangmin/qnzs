/**
 * Created by Administrator on 2017/7/17.
 */
$(function () {
    var loadedFlag = false; // 加载完成标识(true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(true：加载完毕，false：尚有数据)

    var params = {
        pageNo: 1, // 页码
        pageSize: 10, // 每页记录数
        keyword: undefined, // 关键字
        categoryId: undefined, // 服务类型代码
        districtId: undefined, // 地区ID
        lng: undefined, // 经度
        lat: undefined // 纬度
    };

    // 更新地图
    function refreshMap() {
        //    百度地图API功能
        var map = new BMap.Map("BMap_mask");
        map.centerAndZoom('广州', 12);
        map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); // ?? 启用连续缩放效果，默认禁用
        map.enableKeyboard(); // 启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级
        map.addControl(new BMap.NavigationControl()); // 添加默认缩放平移控件
        return map;
    }
    map = refreshMap();

    // 获取线下服务的服务类别
    YoungFamilyApi.findByOfflineService({}).then(function (data) {
        console.log('YoungFamilyApi.findByOfflineService data', data);
        var categories = data.rows;
        var html = '';
        for(var i=0; i<categories.length; i++) {
            var category = categories[i];
            html += '<option value="' + category.caId + '">' + category.name + '</option>';
        }
        $('#category').append(html); // 渲染服务类别列表
    });

    // 监控服务类别的值
    $('#category').change(function () {
        var caId = $(this).find('option:selected').val();
        console.log('caId', caId);
        params.categoryId = caId; // 服务类别ID
        params.pageNo = 1; // 初始化页码

        loadStationList(YoungFamilyApi.getAuditedStationsPageByParam, params, $('#station_list'), true); // 加载站点列表并渲染页面
    });

    // 获取所属地区、组织、区域
    YoungFamilyApi.getCityByType({provinceId: 440000, type: 1}).then(function (data) {
        console.log('YoungFamilyApi.getCityByType data', data);
        var cities = data.dataList;

        var html = '';
        for(var i=0; i<cities.length; i++) {
            var city = cities[i];
            html += '<option value="' + city.did + '">' + city.districtName + '</option>';
        }
        $('#city').append(html); // 渲染城市列表
    });

    // 监控区域ID的值
    $('#city').change(function () {
        var districtId = $(this).find('option:selected').val();
        console.log('districtId', districtId);
        params.districtId = districtId; // 区域ID
        params.pageNo = 1; // 初始化页码

        loadStationList(YoungFamilyApi.getAuditedStationsPageByParam, params, $('#station_list'), true); // 加载站点列表并渲染页面
    });

    /**
     * 渲染站点列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param stations {array} 站点列表
     * @param isClearOverlays {boolean} 是否清除覆盖物(true：清除，false：不清除--默认false)
     */
    function render_stationlist($listContent, stations, isClearOverlays, total) {
        var html = '';
        if(isClearOverlays) {
            map.clearOverlays(); // 清除所有覆盖物
        }
        for(var i=0; i<stations.length; i++) {
            var station = stations[i];
            html += '<li class="station" data-id="' + station.staId + '" data-lng="' + station.mapLongitude + '" data-lat="' + station.mapLatitude + '">';
            html += '    <p class="station_fullName">' + station.fullName + '</p>';
            var categoryHmtl = '';
            for(var j=0; j<station.staCategoriesList.length; j++) {
                var category = station.staCategoriesList[j];
                if(j != 0) {
                    categoryHmtl += ',';
                }
                categoryHmtl += category.name;
            }
            html += '    <p class="station_categories">' + categoryHmtl + '</p>';
            html += '    <p class="station_address">' + station.address + '</p>';
            html += '    <p class="station_serviceContent" style="display: none;">' + station.serviceContent + '</p>';
            html += '</li>';

            // 在地图添加覆盖物
            var point = new BMap.Point(station.mapLongitude, station.mapLatitude);

            var marker = new BMap.Marker(point);
            map.addOverlay(marker); // 添加红色覆盖物
        }

        if(params.pageNo == 1) { // 第一页加载才执行
            map.panTo(point); // 根据经纬度定位
            $('#station_total').text(total); // 渲染站点列表总数
            $listContent.html(html); // 渲染站点列表(清空原来的数据)
            return;
        }

        $listContent.append(html); // 渲染站点列表
    }


    /**
     * 加载站点列表并渲染页面
     * @param fun {function} 加载函数
     * @param params {obj} 加载函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClearOverlays {boolean} 是否清除覆盖物(true：清除，false：不清除--默认false)
     */
    function loadStationList(fun, params, $listContent, isClearOverlays) {
        fun(params).then(function (data) {
            console.log('YoungFamilyApi.getAuditedStationsPageByParam params', params);
            console.log('YoungFamilyApi.getAuditedStationsPageByParam data', data);
            var stations = data.rows;

            render_stationlist($listContent, stations, isClearOverlays, data.total); // 渲染站点列表

            if(stations && stations.length >= params.pageSize) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params.pageNo++; // 页码自增
            loadedFlag = true; // 设置加载完成
        });
    }

    loadStationList(YoungFamilyApi.getAuditedStationsPageByParam, params, $('#station_list')); // 加载站点列表并渲染页面

    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            // 这里加载数据..
            console.log('params.pageNo', params.pageNo);
            loadStationList(YoungFamilyApi.getAuditedStationsPageByParam, params, $('#station_list')); // 加载站点列表并渲染页面
        }
    });

    // 点击 具体 '站点''
    $('#station_list').on('click', '.station', function () {
        $('#station_list').hide(); // 隐藏站点列表

        var station = {
            staId: $(this).data('id'),
            lng: $(this).data('lng'),
            lat: $(this).data('lat'),
            fullName: $(this).find('.station_fullName').text(),
            categories: $(this).find('.station_categories').text(),
            address: $(this).find('.station_address').text(),
            serviceContent: $(this).find('.station_serviceContent').text()
        };
        console.log('station', station);
        $(window).off('scroll'); // 禁止滚动事件
        var point = new BMap.Point(station.lng, station.lat);
        map.panTo(point); // 根据经纬度定位
        $('#station_detail').find('#submit_service').data('id', station.staId); // 站点ID
        $('#station_detail').find('.station_address').data('lng', station.lng); // 站点经度
        $('#station_detail').find('.station_address').data('lat', station.lat); // 站点纬度
        $('#station_detail').find('.station_fullName').text(station.fullName);
        $('#station_detail').find('.station_address .station_address_text').text(station.address);
        $('#station_detail').find('.station_categories').text(station.categories);
        $('#station_detail').find('.station_serviceContent').text(station.serviceContent);
        $('#station_detail').show(); // 显示站点详细内容

    });


    // 定位(获取当前坐标)
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
            $('#station_detail').find('.station_address').data('longitude', r.point.lng); // 当前定位经度
            $('#station_detail').find('.station_address').data('latitude', r.point.lat); // 当前定位纬度
            // $('#address_parent').data('longitude', r.point.lng); // 当前定位经度
            // $('#address_parent').data('latitude', r.point.lat); // 当前定位纬度
        }
        else {
            $.alert('获取定位失败：' + this.getStatus());
        }
    },{enableHighAccuracy: true});

    // 点击 站点详情 地址栏
    $('#station_detail .station_address').click(function () {
        var lng = $(this).data('lng'); // 站点经度
        var lat = $(this).data('lat'); // 站点纬度
        var longitude = $(this).data('longitude'); // 当前定位经度
        var latitude = $(this).data('latitude'); // 当前定位纬度
        if(!lng || lng == 'undefined' || !lat || lat == 'undefined' || !longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
            // $.alert('站点位置参数不能为空');
            $.alert('站点位置定位中，请稍后...');
            return;
        }
        window.location = 'route_map.html?lng=' + lng + '&lat=' + lat + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
    });
    
    // 点击 '申请线下服务' 按钮
    $('#submit_service').click(function () {
        window.location = 'reserve.html?staId=' + $(this).data('id');
    });

    // 点击 '返回'' 图标
    $('#icon_left').click(function () {
        window.history.back();  //返回上一页
    });
    
});