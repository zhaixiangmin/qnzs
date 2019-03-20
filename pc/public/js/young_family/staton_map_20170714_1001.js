/**
 * Created by Administrator on 2017/7/13.
 */

function reserve(staId) {
    //console.log('测试点击事件，staId:', staId);

    $('#submitApply').attr('data-id', staId);

    // 是否可以预约线下服务
    // YoungFamilyApi.checkApplication({}).then(function (result){
        $('.bg_black').show();
        $('body').addClass('overflow_h');
    // })
}

$(function () {
   //console.log('staton_map');

    var staId = undefined; // 站点ID
    var map = undefined;
    var index = 1; // 查询服务站点页码
    var total = undefined; // 查询服务站点总页数

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

    // 分页查询已审核通过的服务站点
    var data = {
        pageNo: 1, // 页码
        pageSize: 10, // 每页记录数
        keyword: undefined, // 关键字
        categoryId: undefined, // 服务类型代码
        districtId: undefined, // 地区ID
        lng: undefined, // 经度
        lat: undefined // 纬度
    };

    var sContentArr = []; // 地图弹出框内容数组
    // 刷新地图站点和浮动框信息
    function refreshStations(data) {
        map.clearOverlays(); // 清除所有覆盖物
        YoungFamilyApi.getAuditedStationsPageByParam(data).then(function (data) {
            //console.log('YoungFamilyApi.getAuditedStationsPageByParam data', data);
            var rows = data.rows;

            total = data.total / 10;
            //console.log('total', total);
            var html = '';
            for(var i=0; i<rows.length; i++) {
                var item = rows[i];
                html += '<li class="item" data-lng="' + item.mapLongitude + '" data-lat="' + item.mapLatitude + '">' + item.fullName + '</li>';
                // //console.log('经度：' + item.mapLongitude + "，\t\t纬度：" + item.mapLatitude);
                var point = new BMap.Point(item.mapLongitude, item.mapLatitude);
                if(i == 0) {
                    map.panTo(point); // 根据经纬度定位
                }
                var marker = new BMap.Marker(point);
                map.addOverlay(marker); // 添加红色覆盖物
                var sContent = '';
                sContent += '<ul>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">站点名称：</span><p style="display: inline-block;">' + item.fullName + '</p></li>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">站点地址：</span><p style="display: inline-block;">' + item.address + '</p></li>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">服务群体：</span><p style="display: inline-block;">' + item.serviceGroup + '</p></li>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">服务时间：</span><p style="display: inline-block;">' + item.serviceTime + '</p></li>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">服务内容：</span><p style="display: inline-block;">' + item.serviceContent + '</p></li>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">服务评分：</span><p style="display: inline-block;">' + item.star + '</p></li>';
                // sContent += '    <li style="margin-top: 10px;text-align: center;"><button style="height: 30px; line-height: 30px; font-size: 14px; background: #0E85D7; color: #fff;cursor: pointer;" class="reserve">一键申请线下服务</button></li>';
                sContent += '    <li style="margin-top: 10px;text-align: center;"><button style="height: 30px; line-height: 30px; font-size: 14px; background: #0E85D7; color: #fff;cursor: pointer;" class="reserve" onclick="reserve(' + item.staId + ')">一键申请线下服务</button></li>';
                sContent += '</ul>';
                addClickHandler(marker, sContent);
            }

            function addClickHandler(marker, content) {
                marker.addEventListener('click', function (e) {
                    var p = e.target;
                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                    var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象
                    this.openInfoWindow(infoWindow, point); // 开启信息窗口
                });
            }

            $('.aside .content').html(html);

            // 点击站点名称
            $('.aside .content .item').click(function () {
                //console.log('.aside .content .item');
                var mapLongitude = $(this).data('lng'); // 经度
                var mapLatitude = $(this).data('lat'); // 纬度
                var point = new BMap.Point(mapLongitude, mapLatitude);
                map.panTo(point); // 根据经纬度定位
            });

        });
    }

    // 刷新地图站点和浮动框信息
    // 海量点
    // function refreshStations(data) {
    //     // map.clearOverlays(); // 清除所有覆盖物
    //     YoungFamilyApi.getAuditedStationsPageByParam(data).then(function (data) {
    //         //console.log('YoungFamilyApi.getAuditedStationsPageByParam data', data);
    //         var rows = data.rows;
    //
    //         total = data.total / 10;
    //         //console.log('total', total);
    //         var html = '';
    //         var points = []; // 添加海量点数据
    //         for(var i=0; i<rows.length; i++) {
    //             var item = rows[i];
    //             html += '<li class="item" data-lng="' + item.mapLongitude + '" data-lat="' + item.mapLatitude + '">' + item.fullName + '</li>';
    //             //console.log('经度：' + item.mapLongitude + "，\t\t纬度：" + item.mapLatitude);
    //             var point = new BMap.Point(item.mapLongitude, item.mapLatitude);
    //             if(i == 0) {
    //                 map.panTo(point); // 根据经纬度定位
    //             }
    //             points.push(point);
    //             // map.addOverlay(new BMap.Marker(point)); // 添加红色覆盖物
    //         }
    //
    //         // var pointCollection = new BMap.PointCollection(points, {shape: BMAP_POINT_SHAPE_WATERDROP, color: '#ff0000', size: BMAP_POINT_SIZE_NORMAL});  // 初始化PointCollection
    //         var pointCollection = new BMap.PointCollection(points, {shape: BMAP_POINT_SHAPE_WATERDROP, color: '#ff0000', size: BMAP_POINT_SIZE_HUGE});  // 初始化PointCollection
    //         pointCollection.addEventListener('click', function (e) {
    //             alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
    //         });
    //         map.addOverlay(pointCollection);  // 添加Overlay
    //
    //
    //         $('.aside .content').html(html);
    //
    //         // 点击站点名称
    //         $('.aside .content .item').click(function () {
    //             //console.log('.aside .content .item');
    //             var mapLongitude = $(this).data('lng'); // 经度
    //             var mapLatitude = $(this).data('lat'); // 纬度
    //             //console.log('mapLongitude:', mapLongitude);
    //             //console.log('mapLatitude:', mapLatitude);
    //             var point = new BMap.Point(mapLongitude, mapLatitude);
    //             // //console.log('point', point);
    //             map.panTo(point); // 根据经纬度定位
    //         });
    //     });
    // }
    refreshStations(data);

    // 点击向左图标
    $('#icon_left').click(function () {
        //console.log('#icon_left');
    });

    // 点击向右图标
    $('#icon_right').click(function () {
        //console.log('#icon_right');
        if(index < total) {
            index++;
            data.pageNo = index;
            refreshStations(data); // 刷新地图站点和浮动框信息
            // var overlays = map.getOverlays(); // 获取所有覆盖物
            // //console.log('overlays', overlays);
        }
    });



    // // 点击预约服务 按钮
    // $('.reserve').click(function(event) {
    //     //console.log('点击 #reserve');
    //     // 是否可以预约线下服务
    //     YoungFamilyApi.checkApplication({}).then(function (result){
    //         $('.bg_black').show();
    //         $('body').addClass('overflow_h');
    //     })
    // });

    // 点击预约服务 弹出框 取消按钮、x按钮
    $('.serviceBottomBtns .cancel, .bg_black .delete').click(function(event) {
        $('.bg_black').hide();
        $('body').removeClass('overflow_h')
    });


    // 提交预约服务
    $('#submitApply').click(function () {
        var staIdMe = $(this).data('id');
        //console.log('staIdMe', staIdMe);
        var data = {
            title: undefined, // 标题
            categoryId: undefined, // 服务类别ID
            stationId: staIdMe, // 服务站点ID
            description: undefined, // 提问内容
            serviceDay: undefined, // 服务日期
            serviceTime: undefined, // 服务时间段
            orgId: '001' // 当前分站
        };

        data.title = $('#title_register').val(); // 标题
        data.description = $('#description_register').val(); // 提问内容
        data.categoryId = $('#serviceType').children('option:selected').val(); // 服务类别ID
        data.serviceDay = $('#serviceDate').children('option:selected').text(); // 服务日期
        data.serviceTime = $('#serviceClock').children('option:selected').text(); // 服务时间段
        //console.log('submitApply data', data);
        if (!data.title) {
            $.alert('请输入问题标题');
            return;
        }
        if (!data.categoryId) {
            $.alert('请选择服务类别');
            return;
        }
        if (!data.description) {
            $.alert('请输入服务描述');
            return;
        }
        if (!data.serviceDay) {
            $.alert('请选择服务日期');
            return;
        }
        if (!data.serviceTime) {
            $.alert('请选择服务时间');
            return;
        }

        // 预约线下服务
        YoungFamilyApi.applicationService(data).then(function (data) {
            $('.serviceBottomBtns .cancel, .bg_black .delete').click(); // 触发关闭弹出框事件
            $.alert(data.msg).then(function () {
                // location.reload(); // 刷新页面
            });
        });
    });

});