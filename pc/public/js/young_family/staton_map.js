/**
 * Created by Administrator on 2017/7/13.
 */
function doReserve(staId, fullName) {
    //console.log('staId', staId);
    $('#dialog_reserve').data('id', staId);
    $('#fullName_reserve').text(fullName); // 站点全称
    $('#dialog_reserve').show(); // 弹出预约服务窗口
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

    // 刷新地图站点和浮动框信息
    function refreshStations(StationFun, data, isAll) {
        map.clearOverlays(); // 清除所有覆盖物
        StationFun(data).then(function (data) {
            //console.log('YoungFamilyApi.getAuditedStationsPageByParam data', data);
           
            var rows = undefined;
            if(isAll) { // 全部站点查询
                rows = data.dataList;
            } else { // 分页站点查询
                rows = data.rows;
                total = data.total / 10; // 查询服务站点总页数(全局变量)
                // if(index == 1) { // 第一页才执行
                //     $('#total_map').text('(' + data.total + ')'); // 服务站点总记录数
                // }
                //console.log('total', total);
            }
            var html = '';
           
            // 渲染地图覆盖物和绑定弹出框
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
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">简要介绍：</span><p style="display: inline-block;">' + item.serviceContent + '</p></li>';
                sContent += '    <li style="line-height: 20px;"><span style="display: inline-block;">服务评分：</span><p style="display: inline-block;">' + item.star + '</p></li>';
                // sContent += '    <li style="margin-top: 10px;text-align: center;"><button style="height: 30px; line-height: 30px; font-size: 14px; background: #0E85D7; color: #fff;cursor: pointer;" class="reserve">一键申请线下服务</button></li>';
                sContent += '    <li style="margin-top: 10px;text-align: center;"><button style="height: 30px; line-height: 30px; font-size: 14px; background: #0E85D7; color: #fff;cursor: pointer;" class="reserve" onclick="doReserve(' + item.staId + ', \'' + item.fullName + '\')">一键申请线下服务</button></li>';
                sContent += '</ul>';
                addClickHandler(marker, sContent ,item.staCategoriesList);
            }
            
           
            // 点击 '地图覆盖物'
            function addClickHandler(marker, content,staCategoriesList) {
                marker.addEventListener('click', function (e) {
                    var p = e.target;
                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                    var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象
                    this.openInfoWindow(infoWindow, point); // 开启信息窗口
                    
                    //服务群体类型
		            var staCategoriesList_html = '';
		            $('#category_reserve').html('');
		            for(var i=0; i<staCategoriesList.length; i++) {
			           
			            staCategoriesList_html += '<option value="' + staCategoriesList[i].caId + '">' + staCategoriesList[i].name + '</option>';
			        }
			        $('#category_reserve').html(staCategoriesList_html);
		            //服务群体类型  end
                    
                    
                    
                                        

                });
                
                
                
                
            }
          
           

            $('.aside_allmap, .aside').hide(); // 隐藏侧边栏悬浮框
            if(isAll) { // 全部站点查询
                $('.aside_allmap .content').html(html); // 浮动框插入内容(站点名称列表)
                $('.aside_allmap').show(); // 显示侧边栏悬浮框(全站)
            }else { // 分页站点查询
                $('.aside .content').html(html); // 浮动框插入内容(站点名称列表)
                $('.aside').show(); // 显示侧边栏悬浮框(分页)
            }

            // 点击站点名称
            $('.aside .content .item, .aside_allmap .content .item').click(function () {
                  console.log('.aside .content .item');
                var mapLongitude = $(this).data('lng'); // 经度
                var mapLatitude = $(this).data('lat'); // 纬度
                var point = new BMap.Point(mapLongitude, mapLatitude);
                map.panTo(point); // 根据经纬度定位
            });

        });
    }

    refreshStations(YoungFamilyApi.getAuditedStationsPageByParam, data); // 刷新地图站点和浮动框信息


    // 点击向左图标
    $('#icon_left').click(function () {
        //console.log('#icon_left');
        if(index > 1) {
            //console.log('#icon_left刷新');
            index--;
            data.pageNo = index;
            refreshStations(YoungFamilyApi.getAuditedStationsPageByParam, data); // 刷新地图站点和浮动框信息
        }
    });

    // 点击向右图标
    $('#icon_right').click(function () {
        //console.log('#icon_right');
        if(index < total) {
            //console.log('#icon_right刷新');
            index++;
            data.pageNo = index;
            refreshStations(YoungFamilyApi.getAuditedStationsPageByParam, data); // 刷新地图站点和浮动框信息
        }
    });

    // 获取线下服务的服务类别
    YoungFamilyApi.findByOfflineService({}).then(function (data) {
        //console.log('YoungFamilyApi.findByOfflineService data', data);\
        console.log(data);
        
        var services = data.rows;
        var html = '';
        for(var i=0; i<services.length; i++) {
            var service = services[i];
            html += '<option value="' + service.caId + '">' + service.name + '</option>';
        }
        $('#category').append(html);
    });


    var serviceTimesArr = []; // 时间段数组
    // 获取未来一周的服务时间
    YoungFamilyApi.getServiceDateTime({}).then(function (data) {

        var list = data.dataList;
        var dayHtml = ''; // 服务日期数据
        for(var i=0;i < list.length; i++) {
            var serviceTimesArrTemHtml = ''; // 时间段数据
            var item = list[i];
            var dayIndex = i + 1;
            var day = '<option value="' + dayIndex + '">' + item.serviceDay + '</option>';
            dayHtml += day;
            for(var j=0; j<item.serviceTimes.length; j++) {
                var time = item.serviceTimes[j];
                var timeIndex = j+1;
                var timeHtml = '<option value="' + timeIndex + '">' + time + '</option>';
                serviceTimesArrTemHtml += timeHtml;
            }
            serviceTimesArr.push(serviceTimesArrTemHtml); // 全局变量
        }
        $('#serviceDate_reserve').append(dayHtml); // 服务时间select插入页面数据
        $('#serviceTime_reserve').append(serviceTimesArr[0]); // 服务时间select插入页面数据
    });


    // 监控服务日期选中值
    $('#serviceDate_reserve').change(function (event) {
        var val = $(this).children('option:selected').val(); // 选中值
        //console.log('val', val);
        $('#serviceTime_reserve').html(serviceTimesArr[val-1]); // 服务时间select插入页面数据
    });

    // 获取所属地区、组织、区域(广东省地级市) -- 默认广州市
    YoungFamilyApi.getCityByType({provinceId: 440000, type: 1}).then(function (data) {
        //console.log('YoungFamilyApi.getCityByType data', data);
        var cities = data.dataList;
        var html = '';
        for(var i=0; i<cities.length; i++) {
            var city = cities[i];
            html += '<option value="' + city.did + '">' + city.districtName + '</option>';
        }
        $('#city').append(html);
    });

    // 监控地级市选中值
    $('#city').change(function () {
        var cityId = $(this).find('option:selected').val();
        //console.log('cityId', cityId);
        
        // 获取所属地区、组织、区域(地级市下的区县)
        YoungFamilyApi.getCityByType({provinceId: cityId, type: 1}).then(function (data) {
            //console.log('YoungFamilyApi.getCityByType data', data);
            var districts = data.dataList;
            var html = '<option value="">请选择</option>'; // 默认不选中
            for(var i=0; i<districts.length; i++) {
                var district = districts[i];
                html += '<option value="' + district.did + '">' + district.districtName + '</option>';
            }
            $('#district').html(html);
        });
    });

    // 点击'立即搜索'
    $('#submit_search').click(function () {
        data.categoryId = $('#category').find('option:selected').val(); // 服务类型代码
        data.districtId = $('#district').find('option:selected').val(); // 地区ID
        if(!data.districtId) { // 区县值为空，向上获取地级市的值
            data.districtId = $('#city').find('option:selected').val(); // 地区ID
        }
        data.keyword = $('#keyword').val();
        //console.log('submit_search data', data);

        refreshStations(YoungFamilyApi.getAuditedStationsPageByParam, data); // 刷新地图站点和浮动框信息
    });

    // 点击'全部'
    $('#submit_all').click(function () {
        //console.log('全部');

        refreshStations(YoungFamilyApi.getAllAuditedStations, {}, true); // 刷新地图站点和浮动框信息(全部)
    });

    // 点击 '预约服务-申请' 按钮
    $('#submitApply').click(function () {
        var staId = $('#dialog_reserve').data('id');
        var params = {
            title: $('#title_reserve').val(), // 标题
            categoryId: $('#category_reserve').find('option:selected').val(), // 服务类别ID
            stationId: $('#dialog_reserve').data('id'), // 服务站点ID
            description: $('#description_reserve').val(), // 服务描述
            serviceDay: $('#serviceDate_reserve').find('option:selected').text(), // 服务日期
            serviceTime: $('#serviceTime_reserve').find('option:selected').text(), // 服务时间段
            orgId: '001' // 当前分站
        };
        //console.log('submitApply params', params);
        if(!params.title) {
            $.alert('请输入问题标题');
            return;
        }
        if(!params.categoryId) {
            $.alert('请选择服务类别');
            return;
        }
        if(!params.stationId) {
            $.alert('站点ID不能为空');
            return;
        }
        if(!params.description) {
            $.alert('请输入服务描述');
            return;
        }
        if(!params.serviceDay) {
            $.alert('请选择服务日期');
            return;
        }
        if(!params.serviceTime) {
            $.alert('请选择服务时间段');
            return;
        }

        // 是否可以预约线下服务
        YoungFamilyApi.checkApplication({}).then(function (data) {
        //     //console.log('YoungFamilyApi.checkApplication data', data);
            // 预约线下服务
            YoungFamilyApi.applicationService(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    window.location.reload(); // 刷新当前页
                });
            });
        })
    });

    // 点击 '预约服务-取消' 按钮
    $('#submit_cancel, #dialog_reserve .delete').click(function () {
        $('#dialog_reserve').hide(); // 隐藏预约服务窗口
    });
    
    
    /*******
	 * 
	 * 朱 -修改地图站点
	 * 
	 * ***/
	
    
    
});