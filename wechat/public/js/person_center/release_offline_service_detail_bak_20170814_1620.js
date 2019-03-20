/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    var stationId = Utils.getQueryString('stationId'); // 站点ID
    var applicationId = Utils.getQueryString('applicationId'); // 服务ID
    var type = Utils.getQueryString('type'); // 类型(1-扫码签到(已预约)，2-扫码评分(未预约))
    console.log('applicationId', applicationId);
    if(!stationId && !applicationId) {
        $.alert('参数不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }

    // type = 2;
    // stationId = 1266;

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
            integer = arr[0]; // 整数位
            if(arr && arr.length > 1) {
                decimals = arr[1].substring(0, 1); // 小数点位(只取字符串的一位,eg. 4)
            }
        }

        for(var j=0; j<5; j++) {
            if(j < integer) {
                html += '                    <li class="cur fl"></li>'; // 亮星
                continue;
            }
            if(decimals > 0) {
                var percentage = decimals * 10;
                html += '<li class="fl">';
                html += '    <div style="width: ' + percentage + '%;overflow: hidden;">';
                html += '        <span style="display: inline-block;width: 0.46rem;height: 0.44rem;background: url(../../public/img/star_1.png) no-repeat;background-size: 0.46rem;"></span>';
                html += '    </div>';
                html += '</li>';

                decimals = undefined; // 只进来一次
                continue;
            }

            html += '                    <li class="fl"></li>'; // 灭星
        }

        return html;
    }

    var lng = undefined; // 当前定位经度
    var lat = undefined; // 当前定位纬度
    if(type == 2) { // 2-扫码评分(未预约)，获取到站点ID
        var isGetCurrentPosition = false; // 是否获取到当前定位
        // 定位(获取当前坐标)
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                console.log('您的位置：'+ r.point.lng +','+ r.point.lat);
                Qnzs.location({ lng: r.point.lng, lat: r.point.lat }).then(function () {
                    isGetCurrentPosition = true; // 获取到当前定位
                });
            }
            else {
                $.alert('获取定位失败：' + this.getStatus());
            }
        },{enableHighAccuracy: true});


        // 根据服务站点ID获取服务快捷选项
        PersonCenterApi.getServiceSupply({stationId: stationId}).then(function (data) {
            var list = data.dataList;
            var html = '';
            for(var i=0; i<list.length; i++) {
                var item = list[i];
                html += '<li class="fl category" data-id="' + item.id + '">';
                html += '    <a href="javascript:;" class="colorfff fz24">';
                html += '        <div>' + item.name + '</div>';
                html += '    </a>';
                html += '</li>';
            }
            $('#staCategoriesList').html(html); // 渲染服务快捷选项
        });

        var supplyId = undefined; // 服务快捷选择ID
        $('#staCategoriesList').on('click', '.category', function () {
            supplyId = $(this).data('id'); // 服务快捷选择ID
            $(this).addClass('cur').siblings().removeClass('cur');
        });


        // 服务站点详情
        PersonCenterApi.stationDetail({staId: stationId}).then(function (data) {
            console.log('YoungFamilyApi.stationDetail data', data);
            var station = data.dataList;
            var imgUrl = station.imageUrl ? station.imageUrl : '../../public/img/default_avator.png';
            var starHtml = star_generate(station.star); // 星星评分
            var html = '';
            for(var i=0; i<station.staCategoriesList.length; i++) {
                var category = station.staCategoriesList[i];
                html += '<li class="fl">';
                html += '    <a href="javascript:;" class="colorfff fz24">';
                html += '        <div>' + category.name + '</div>';
                html += '    </a>';
                html += '</li>';
            }
            $('#imageUrl').attr('src', imgUrl); // 站点头像
            $('#fullName').text(station.fullName); // 站点全称
            $('#starIcon').html(starHtml); // 星级图标
            $('#star').text(station.star); // 星级评分
            $('#evaluationNum').text(station.evaluationNum); // 评论数

        });

        $('#evaluateBox_code').show(); // 显示 评分页面(扫码评分(未预约))

        // 点击 '立即发表'(未预约服务)
        $('#submit_appreciation_unreserve').click(function () {
            if(!isGetCurrentPosition) { // 未获取到当前定位
                $.alert('正在定位中，请稍后点击...');
                return;
            }

            var params = {
                stationId: stationId, // 站点ID
                supplyId: supplyId, // 服务快捷选择ID
                evaluate: $('#evaluate_code').val(), // 答谢内容(评分页面(扫码评分(未预约)))
                score: $('input[name="score"]').val() // 星级评分
            };
            if(!params.supplyId) {
                $.alert('请选择服务快捷');
                return;
            }
            if(!params.evaluate) {
                $.alert('请输入答谢感言');
                return;
            }
            if(params.evaluate.length < 5) {
                $.alert('够5个字才能提交哦！');
                return;
            }
            if(!params.score) {
                $.alert('评星才能提交哦！');
                return;
            }

            // 帮助添加答谢感言
            PersonCenterApi.evaluateApplicationByQrCode(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    // window.history.back(); // 返回上一页面
                    // window.location.href = 'release_offline_service.html'; // 返回上一页面(扫码进来，没有history)
                    window.location.href = Qnzs.domain + '/wechat/view/person_center/release_offline_service.html'; // 返回上一页面(扫码进来，没有history)
                })
            });
        })
    }else { // 1-扫码签到(已预约)，获取到服务ID -- type == 1 或 type == undefined
        // 定位(获取当前坐标)
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                console.log('您的位置：' + r.point.lng+',' + r.point.lat);
                lng = r.point.lng;  // 当前定位经度
                lat = r.point.lat; // 当前定位纬度
            }
            else {
                $.alert('获取定位失败：' + this.getStatus());
            }
        },{enableHighAccuracy: true});


        // 获取线下服务详情
        PersonCenterApi.getApplication({apId: applicationId}).then(function (data) {
            var item = data.dataList;

            stationId = item.stationId; // 站点ID

            // 服务站点详情
            PersonCenterApi.stationDetail({staId: stationId}).then(function (data) {
                console.log('YoungFamilyApi.stationDetail data', data);
                var station = data.dataList;
                var imgUrl = station.imageUrl ? station.imageUrl : '../../public/img/default_avator.png';
                var starHtml = star_generate(station.star); // 星星评分
                var html = '';
                for(var i=0; i<station.staCategoriesList.length; i++) {
                    var category = station.staCategoriesList[i];
                    html += '<li class="fl">';
                    html += '    <a href="javascript:;" class="colorfff fz24">';
                    html += '        <div>' + category.name + '</div>';
                    html += '    </a>';
                    html += '</li>';
                }
                $('#imageUrl').attr('src', imgUrl); // 站点头像
                $('#fullName').text(station.fullName); // 站点全称
                $('#starIcon').html(starHtml); // 星级图标
                $('#star').text(station.star); // 星级评分
                $('#evaluationNum').text(station.evaluationNum); // 评论数
            });


            // statusStr：0-待审核，1-已通过，2-不通过，3-已完结，4-已评价
            if(item.statusStr == '已完结') {
                $('#evaluateBox').show(); // 显示评分页面
            }else {
                $('#statusStr').text(item.statusStr); // 线下服务审核状态字符串
                $('#quesTitle').text(item.quesTitle); // 问题标题
                $('#categoryName').text(item.categoryName); // 服务类型字符串
                $('#stationAddress').text(item.stationAddress); // 服务站点地址
                $('#description').text(item.description); // 服务描述

                $('#signBox').show(); // 显示签到/已签到页面
                // signStatus：0-未签到；1-已签到
                if(item.statusStr == '已通过' && item.signStatus == 0) {
                    $('#sign').parent().show(); // 显示 '签到'
                }else if(item.statusStr == '已通过' && item.signStatus == 1) {
                    $('#signed').parent().show(); // 显示 '已签到'
                }else if(item.statusStr == '已评价') {
                    $('#evaluated').parent().show(); // 显示 '已评价'
                }
            }
        });


        // 点击 '签到'
        $('#sign').click(function () {
            if(!lng || !lat) { // 全局变量
                $.alert('正在定位中，请稍后点击...');
                return;
            }

            window.location.href = 'sign_offline_service.html?staId=' + stationId + '&apId=' + applicationId + '&lng=' + lng + '&lat=' + lat; // 跳转到签到页面
        });


        // 点击 '立即发表'
        $('#submit_appreciation').click(function () {
            var params = {
                apId: applicationId, // 服务申请ID
                evaluate: $('#evaluate').val(), // 答谢内容
                score: $('input[name="score"]').val() // 星级评分
            };
            if(!params.evaluate) {
                $.alert('请输入答谢感言');
                return;
            }
            if(params.evaluate.length < 5) {
                $.alert('够5个字才能提交哦！');
                return;
            }
            if(!params.score) {
                $.alert('评星才能提交哦！');
                return;
            }

            // 帮助添加答谢感言
            PersonCenterApi.evaluateStation(params).then(function (data) {
                $.alert(data.msg).then(function () {
                    if(type) { // 扫码进来
                        window.location.href = Qnzs.domain + '/wechat/view/person_center/release_offline_service.html'; // 返回上一页面(扫码进来，没有history)
                        return;
                    }

                    // 正常进来
                    window.history.back(); // 返回上一页面
                })
            });
        })

    }

    // 点击 '星星'图标
    $('#evaluateBox .myScoreBox ul li em').click(function(event) {
        var thisIex = $(this).parent().parent().index();
        var thisNum = thisIex+1;
        $('input[name="score"]').val(thisNum);
        $('#evaluateBox .myScoreBox ul li:lt('+thisNum+')').children().children().addClass('cur');
        $('#evaluateBox .myScoreBox ul li:gt('+thisIex+')').find('em').removeClass('cur');
    });
    $('#evaluateBox_code .myScoreBox ul li em').click(function(event) {
        var thisIex = $(this).parent().parent().index();
        var thisNum = thisIex+1;
        $('input[name="score"]').val(thisNum);
        $('#evaluateBox_code .myScoreBox ul li:lt('+thisNum+')').children().children().addClass('cur');
        $('#evaluateBox_code .myScoreBox ul li:gt('+thisIex+')').find('em').removeClass('cur');
    });

});