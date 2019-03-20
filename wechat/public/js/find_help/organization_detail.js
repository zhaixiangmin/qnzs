/**
 * Created by Administrator on 2017/7/24.
 */
$(function () {
    console.log('organization_detail');
    var oid = Utils.getQueryString('oid'); // 帮助ID
    console.log('oid', oid);
    if(!oid) {
        $.alert('组织ID不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }


    // 定位(获取当前坐标)
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
            $('#address_parent').data('longitude', r.point.lng); // 当前定位经度
            $('#address_parent').data('latitude', r.point.lat); // 当前定位纬度
        }
        else {
        	  $.alert('系统繁忙，请稍后再来吧！');
        	//$.alert('获取定位失败：' + this.getStatus());
        }
    },{enableHighAccuracy: true});


    // 点击 '地址栏'
    $('#address_parent').click(function () {
        var lng = $('#address_parent').data('lng'); // 站点经度
        var lat = $('#address_parent').data('lat'); // 站点纬度
        var longitude = $('#address_parent').data('longitude'); // 当前定位经度
        var latitude = $('#address_parent').data('latitude'); // 当前定位纬度
        if(!lng || lng == 'undefined' || !lat || lat == 'undefined' || !longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
            // $.alert('站点位置参数不能为空');
            $.alert('站点位置定位中，请稍等...');
            return;
        }
        window.location = '../young_family/route_map.html?lng=' + lng + '&lat=' + lat + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
    });

    var name = undefined; // 受理方(组织)名称,全局变量
    // 获取找帮助管理获取单个组织详情
    FindHelpApi.findOrganizationById({oid: oid}).then(function (data) {
        console.log('FindHelpApi.pcHelpDetail data', data);

        var organization = data.rows;

        var starHtml = '';
        /**
         * 生成星星的html字符串
         * @param starStr {int} 星级分数(eg. 4.5)
         * @returns {string}
         */
        function star_generate(starStr) {
            var html = '';
            var decimals = undefined; // 小数点位
            var integer = undefined; // 整数位
            if(starStr) {
                starStr = starStr + '';
                var arr = starStr.split('.'); // eg. 123.456 -> [123, 456]
                integer = arr[0];
                if(arr && arr.length > 1) {
                    decimals = arr[1].substring(0, 1); // 只取字符串的一位,eg. 4
                }
            }

            for(var j=0; j<5; j++) {
                if(j < integer) {
                    html += '<li><span></span></li>'; // 亮星
                    continue;
                }
                if(decimals > 0) {
                    var percentage = decimals * 10;
                    html += '<li><span style="width: ' + percentage + '%"></span></li>';
                    decimals = undefined; // 只进来一次
                    continue;
                }

                html += '<li></li>'; // 灭星
            }

            return html;
        }
        starHtml = star_generate(organization.helpAverageScore);

        var imgUrl =  organization.photoUrl ? organization.photoUrl : '../../public/img/default_avator.png';
        $('#fullName').text(organization.fullName); // 组织全称
        $('#photoUrl').attr('src', Utils.compressByAli(imgUrl, 160, 200)); // 头像url地址
        $('#helpAverageScoreIcon').html(starHtml); // 评分星星图标
        $('#helpAverageScore').text(organization.helpAverageScore); // 平均分
        $('#attentionCount').text(organization.attentionCount); // 关注数
        $('#solveHelpCount').text(organization.solveHelpCount); // 解决帮助数
        $('#address').text(organization.address); // 地址

        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 地址解析为Point
        myGeo.getPoint(organization.address, function(point){
            if (point) {
                $('#address_parent').data('lng', point.lng); // 站点经度
                $('#address_parent').data('lat', point.lat); // 站点纬度
                console.log('point.lng', point.lng);
                console.log('point.lat', point.lat);
            }else{
                alert("您选择地址没有检索到结果!");
            }
        });

        $('#telephone').text(organization.telephone); // 电话
        $('#description').text(organization.description); // 描述
        name = organization.name; // 受理方(组织)名称
    });

    // 点击 '向TA求助'
    $('#submit_help').click(function () {
        if(!name) {
            $.alert('正在获取受理方名称，请稍候...');
            return;
        }
        window.location.href = 'help_apply.html?acquirer=' + oid + '&name=' + name;
    });

    // 点击 '关注'
    $('#concern').click(function () {
        FindHelpApi.followOrCancel({ orgId: oid }).then(function (data) {
            if(data.msg.indexOf('取消') != -1) { // 取消关注成功，显示'关注'
                $('#concern').text('关注');
            }else { // 关注成功，显示'取消关注'
                $('#concern').text('取消关注');
            }
        });
    });
});