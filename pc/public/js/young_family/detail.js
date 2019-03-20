/**
 * Created by Administrator on 2017/7/11.
 */
var longitude = $.cookie('longitudeCookie');
var latitude = $.cookie('latitudeCookie');

$(function () {
    if (!longitude || !latitude) {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(113.30764968, 23.1200491);
        map.centerAndZoom(point, 12);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                longitude = r.point.lng;
                latitude = r.point.lat
                console.log(longitude);
                console.log(latitude);
                $.cookie('longitudeCookie', longitude);
                $.cookie('latitudeCookie', latitude);
            } else {

            }
        }, {
            enableHighAccuracy: true
        })
    }


    var staId = Utils.getQueryString('staId');
    //console.log('staId', staId);
    if(!staId) {
        $.alert('站点ID不能为空').then(function () {
            window.location.href = 'young_family.html';
        });
    }

    var serviceTimesArr = []; // 时间段数组

    // // 服务站点详情
    // YoungFamilyApi.stationDetail({ staId: staId }).then(function (data) {
    //     //console.log('YoungFamilyApi.stationDetail data', data);
    //     var item = data.dataList;
    //     if(!item) {
    //         $.alert('获取服务站点详情错误');
    //         return;
    //     }
    //
    //
    //     var staCategoriesListHtml = ''; // 服务类别（详情服务）
    //     var serviceTypeHtml = ''; // 服务类型（预约服务弹出框）
    //     for(var i=0; i<item.staCategoriesList.length; i++) {
    //         var staCategories = item.staCategoriesList[i];
    //         staCategoriesListHtml += '<span class="fl conBgc01 colorfff font12">' + staCategories.name + '</span >';
    //         if(i == 0) {
    //             serviceTypeHtml += '<option value="' + staCategories.id + '" selected>' + staCategories.name + '</option>';
    //             continue;
    //         }
    //         serviceTypeHtml += '<option value="' + staCategories.id + '">' + staCategories.name + '</option>';
    //     }
    //
    //     // 详情内容
    //     $('#breadcrumbs_title').text(item.fullName); // 站点全称（面包屑导航）
    //     $('#fullName').text(item.fullName); // 站点全称
    //     $('#fullName_service').text(item.fullName); // 站点全称(线下预约弹出框)
    //     $('#address').text(item.address); // 地点
    //     $('#telephone').text(item.telephone); // 电话
    //     $('#serviceTime').text(item.serviceTime); // 上班时间
    //     $('#staCategoriesList').html(staCategoriesListHtml); // 服务类别
    //     $('#serviceContent').html(item.serviceContent); // 服务内容
    //     var text = item.isConcerned ? '取消关注': '关注';
    //     //console.log('item.isConcerned', item.isConcerned);
    //     //console.log('text', text);
    //     $('#concern_text').text(item.isConcerned ? '取消关注': '关注'); // 关注按钮文字(当前状态是关注，显示'取消关注'，否则'关注')
    //     $('#concernNum').html(item.concernNum); // 关注人数
    //     $('#evaluationNum').html(item.evaluationNum); // 评论人数
    //     $('#star').html(item.star); // 星级
    //
    //
    //     var starHtml = '';
    //
    //     /**
    //      * 生成星星的html字符串
    //      * @param starStr {int} 星级分数(eg. 4.5)
    //      * @returns {string}
    //      */
    //     function star_generate(starStr) {
    //         var html = '';
    //         var decimals = undefined; // 小数点位
    //         var integer = undefined; // 整数位
    //         if(starStr) {
    //             starStr = starStr + '';
    //             var arr = starStr.split('.'); // eg. 123.456 -> [123, 456]
    //             integer = arr[0];
    //             if(arr && arr.length > 1) {
    //                 decimals = arr[1].substring(0, 1); // 只取字符串的一位,eg. 4
    //             }
    //         }
    //
    //         for(var j=0; j<5; j++) {
    //             if(j < integer) {
    //                 html += '<li><span></span></li>'; // 亮星
    //                 continue;
    //             }
    //             if(decimals > 0) {
    //                 var percentage = decimals * 10;
    //                 html += '<li><span style="width: ' + percentage + '%"></span></li>';
    //                 decimals = undefined; // 只进来一次
    //                 continue;
    //             }
    //
    //             html += '<li></li>'; // 灭星
    //         }
    //
    //         return html;
    //     }
    //
    //     starHtml = star_generate(item.star);
    //
    //     $('#star_icon').append(starHtml); // 星星图标组
    //
    //     // 服务类型（预约服务弹出框）
    //     $('#serviceType').append(serviceTypeHtml);
    //
    // });



    // 服务站点详情
    $.ajax({
        type:"post",
        data:{staId: staId },
        url:Qnzs.path+"/stationManage/stationDetail",
        async:true,
        success:function(data){
            if(data.status=="ERROR"){
                $.alert('该ID对应的组织不存在，请检查ID是否输错！').then(function(){


                    window.location.href = 'young_family.html';
                })
                return ;
            }

        }

    });


    YoungFamilyApi.stationDetail({ staId: staId }).then(function (data) {
        //console.log('YoungFamilyApi.stationDetail data', data);
        console.log(data)
        var item = data.dataList;

        if(!item) {
            $.alert('获取服务站点详情错误');
            return;
        }

        var staCategoriesListHtml = ''; // 服务类别（详情服务）
        var serviceTypeHtml = ''; // 服务类型（预约服务弹出框）
        for(var i=0; i<item.staCategoriesList.length; i++) {
            var staCategories = item.staCategoriesList[i];
            staCategoriesListHtml += '<span class="fl conBgc01 colorfff font12">' + staCategories.name + '</span >';
            if(i == 0) {
                serviceTypeHtml += '<option value="' + staCategories.id + '" selected>' + staCategories.name + '</option>';
                continue;
            }
            serviceTypeHtml += '<option value="' + staCategories.id + '">' + staCategories.name + '</option>';
        }

        /***** 定位的地址  ******/

        // 详情内容
        // $('#address_a').attr('href','station2_map.html?mapLatitude='+item.mapLatitude+'&mapLongitude='+item.mapLongitude+''); // 地点
        longit =item.mapLongitude ; //全局变量
        lat  =item.mapLatitude ;//全局变量

        // $('#map_derl').append('<p class="color000 fl" style="cursor:pointer;" id="address" onclick="getDressclik('+item.mapLongitude+','+item.mapLatitude+')"></p>') ;
        $('#breadcrumbs_title').text(item.fullName); // 站点全称（面包屑导航）
        $('#fullName').text(item.fullName); // 站点全称
        $('#fullName_service').text(item.fullName); // 站点全称(线下预约弹出框)
        $('#address').text(item.address); // 地点
        $('#telephone').text(item.telephone); // 电话
        $('#serviceTime').text(item.serviceTime); // 上班时间
        $('#staCategoriesList').html(staCategoriesListHtml); // 服务类别
        $('#serviceContent').html(item.serviceContent); // 服务内容
        var text = item.isConcerned ? '取消关注': '关注';
        //console.log('item.isConcerned', item.isConcerned);
        //console.log('text', text);
        $('#concern_text').text(item.isConcerned ? '取消关注': '关注'); // 关注按钮文字(当前状态是关注，显示'取消关注'，否则'关注')
        $('#concernNum').html(item.concernNum); // 关注人数
        $('#evaluationNum').html(item.evaluationNum); // 评论人数
        $('#star').html(item.star); // 星级

        $('#serviceGroupList').html($('<span class="fl conBgc01 colorfff font12">'+item.serviceGroup+'</span>'));   //服务群体
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

        starHtml = star_generate(item.star);

        $('#star_icon').append(starHtml); // 星星图标组

        // 服务类型（预约服务弹出框）
        $('#serviceType').append(serviceTypeHtml);


        // 造数据
        var imgList = item.staSceneriesList; // 实景图片
        imgList = [
            'https://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20190102/20190102091011_8162bf0cfb4fe63131117e785fc615abc9.jpg',
            "https://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20190102/20190102090128_36620170424154858_954Banner-guangdognxiangshangxiangshan.png"
        ];
        if(!imgList || imgList.length <= 0) {
            imgList = ['../../public/img/young-home.png']; // 默认图片
        }

        if(imgList && imgList.length > 0) {
            var imgUrls = imgList;
            var autoPlay = imgUrls.length > 0 ? true : false;
            var html = '';
            var html_big = '';
            var html_li = '';
            for(var i=0; i<imgUrls.length; i++) {
                var imgUrl = imgUrls[i];
                html += '<li><img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_266,w_400') + '" /></li>';
                html_big += '<li><img src="' + imgUrl + '" /></li>';
                html_li += '<li>' + (i+1) + '</li>';
            }
            $('#slideBox .hd ul').html(html_li); // 渲染页码
            $('#slideBox .bd ul').html(html); // 渲染图片
            jQuery("#slideBox").slide({mainCell:".bd ul", autoPlay: autoPlay, mouseOverStop: true}); // SuperSlide插件滑动
            $('#slideBox').show(); // 显示SuperSlide插件

            $('#slideBox_Big .hd ul').html(html_li); // 渲染页码
            $('#slideBox_Big .bd ul').html(html_big); // 渲染图片
            jQuery("#slideBox_Big").slide({mainCell:".bd ul", autoPlay: autoPlay, mouseOverStop: true}); // SuperSlide插件滑动(大图)

            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var top = windowHeight * 0.1; // 窗口高度
            $('#slideBox_Big').css('margin-top', top); // Superslide垂直居中(相对浏览器窗口)
            $('#slideBox_Big .bd li').css('line-height', (windowHeight * 0.8) + 'px' ); // 图片垂直居中(Superslide里面)
            $('#slideBox_Big .bd li').css('height', (windowHeight * 0.8) + 'px' ); // 图片父容器高度(Superslide里面)
            $('#slideBox_Big .bd li').css('width', (windowWidth * 0.8) + 'px' ); // 图片父容器宽度(Superslide里面)
        }


        // 防止冒泡 防止点击SuperSlide区域(大图)关闭大图
        $('#mask_slideBox_Big #slideBox_Big .prev, #mask_slideBox_Big #slideBox_Big').click(function () {
            return false;
        });

        // 点击大图(隐藏大图)
        $('#mask_slideBox_Big').click(function () {
            $(this).hide();
        });

        // 点击小图(放大)
        $('#slideBox .bd ul').click(function () {
            var index = $('#slideBox .hd ul').find('li.on').text(); // 当前图片索引
            console.log('index', index);
            $('#mask_slideBox_Big #slideBox_Big .hd ul li').eq(index-1).mouseover(); // 手动选中相应大图
            $('#mask_slideBox_Big').show();
        });

    });

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
        // //console.log('dayHtml', dayHtml);
        // //console.log('serviceTimesArr', serviceTimesArr);
        $('#serviceDate').append(dayHtml); // 服务时间select插入页面数据
        $('#serviceClock').append(serviceTimesArr[0]); // 服务时间select插入页面数据
    });

    /**
     * 分页插入数据准备
     * @param list 根据服务站点ID分页获取服务申请列表 返回参数
     * @returns {string}
     */
    function anli(list){
        var html='';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var imgUrl = item.applicantPhoto ? item.applicantPhoto : '../../public/img/default_avator.png';

            html+='<div class="fl bgcWhite clearfix anli_list">';
            html+=' <div class="anli_l fl">';
            html+='  <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" alt="" />';
            html+=' </div>';
            html+=' <div class="anli_r fl">';
            html+='  <p class="color999 font12">' + item.applicantName + '</p>';
            html+='  <p class="color000 font12 mes">' + item.description + '</p>';
            html+='  <p class="font14 color2185cf pinglun">线下服务' + item.statusStr + '</p>';
            html+=' </div>';
            html+=' <span class="font12 color999 anli_time">' + item.applyTime + '</span>';
            html+='</div>';
        }

        return html;
    }

    // 点击关注/取消关注
    $('#concern').click(function () {
        var text = $('#concern_text').text();
        //console.log('text', text);
        if(text == '关注') {
            YoungFamilyApi.concern({staId: staId}).then(function (data) {
                // $('#concern_text').text('取消关注');
                // $.alert(data.msg);
                window.location.reload(); // 刷新当前页
                return;
            })
        }

        if(text == '取消关注') {
            // 如果当前按钮文字是'取消关注'
            YoungFamilyApi.cancelConcern({staId: staId}).then(function (data) {
                // $('#concern_text').text('关注');
                // $.alert(data.msg);
                window.location.reload(); // 刷新当前页
                return;
            })
        }
    });


    // 根据服务站点ID分页获取服务申请列表
    $('#case').pageFun({
        contentCell: '.anli_box', /*包裹数据列表的父容器*/
        // contentCell: '#case', /*包裹数据列表的父容器*/
        maxPage: 6,/*显示页码框个数*/
        pageFun: function(i){
            var pageHtml = '<li class="pageNum">'+i+'</li>';
            return pageHtml;
        },
        apiProxy: YoungFamilyApi.getApplicationPageByStationId, /*接口函数*/
        data: {
            staId: staId, // 服务站点ID
            pageNo: 1, // 页码(默认值为1)
            pageSize: 10 // 每页记录数(默认值为10)
        },
        listFun: anli, /*数据列表函数 -- 返回html字符串*/
        arg: undefined,  /*数据列表函数 的参数-可以是对象或数组等等*/
        insertTotalSeletor: '#service_total' // 插入记录总数的元素
    });


    // 活动状态对应名称
    var actStatusName = { '1': '活动预告', '2': '报名中', '3': '已满员', '4': '报名结束', '5': '活动进行中', '6': '活动结束' };


    /**
     * 活动 -- 分页插入数据准备
     * @param list 根据服务站点ID分页获取服务申请列表 返回参数
     * @returns {string}
     */
    function activity(list){
        var html='';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var imgUrl = item.imageUrl ? item.imageUrl : '../../public/img/default_avator.png';

            html += '<a class="clearfix activity_list" href="../find_active/zhd_xiangqing.html?activityId=' + item.id + '">';
            html += '    <div class="activity_l">';
            html += '        <img src="' + imgUrl + '" alt="" />';
            html += '    </div>';
            html += '    <div class="activity_r" style="padding-left: 140px;">';
            // html += '        <p class="color999 font14 create_org_name" style="height: 40px;">' + item.createOrgName + '</p>';
            html += '        <p class="color999 font14 create_org_name" style="height: 40px;">' + item.title + '</p>';
            html += '        <p class="color999 font12 type">' + item.type + '</p>';
            html += '        <p class="color999 activity_time">' + item.activityTime + '</p>';
            html += '        <div class="activity_bottom">';
            html += '            <p class="color999 address">' + item.address + '</p>';
            html += '            <p class="color999 actStatus">' + actStatusName[item.actStatus] + '</p>';
            html += '        </div>';
            html += '    </div>';
            html += '</a>';
        }

        return html;
    }

    // 根据服务站点ID分页获取自己发布的活动
    $('#activity').pageFun({
        contentCell: '.activity_box', /*包裹数据列表的父容器*/
        maxPage: 6,/*显示页码框个数*/
        pageFun: function(i){
            var pageHtml = '<li class="pageNum">'+i+'</li>';
            return pageHtml;
        },
        apiProxy: YoungFamilyApi.getSelfPublicshActivity, /*接口函数*/
        data: {
            staId: staId, // 服务站点ID
            pageNo: 1, // 页码(默认值为1)
            pageSize: 10 // 每页记录数(默认值为10)
        },
        listFun: activity, /*数据列表函数 -- 返回html字符串*/
        arg: undefined,  /*数据列表函数 的参数-可以是对象或数组等等*/
        insertTotalSeletor: '#activity_total' // 插入记录总数的元素
    });


    // 点击预约服务 按钮
    $('.tiwenBtn').click(function(event) {
        // 是否可以预约线下服务
        YoungFamilyApi.checkApplication({}).then(function (result){
            $('.bg_black').show();
            $('body').addClass('overflow_h');
        })
    });

    // 点击预约服务 弹出框 取消按钮、x按钮
    $('.serviceBottomBtns .cancel, .bg_black .delete').click(function(event) {
        $('.bg_black').hide();
        $('body').removeClass('overflow_h')
    });

    // 监控服务日期选中值
    $('#serviceDate').change(function (event) {
        var val = $(this).children('option:selected').val(); // 选中值
        //console.log('val', val);
        $('#serviceClock').html(serviceTimesArr[val-1]); // 服务时间select插入页面数据
    });

    // 提交预约服务
    $('#submitApply').click(function () {
        var data = {
            title: undefined, // 标题
            categoryId: undefined, // 服务类别ID
            stationId: staId, // 服务站点ID
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

    // 服务申请列表 选项卡 切换
    $('.list_box_title').click(function(event) {
        $(this).addClass('cur').siblings('.list_box_title').removeClass('cur');



        var index = $('.list_box_title').index(this);
        //console.log('index', index);
        if(index == 0) { // 点击案例
            $('#case').show();
            $('#activity').hide();
            return;
        }

        // 点击活动
        $('#case').hide();
        $('#activity').show();
    });


    // 举报弹出框
    var report_type=['其他','欺诈','色情','诱导行为','不实信息','违法犯罪','骚扰','侵权(冒充他人、侵犯名誉等)'];
    for (var i = 0; i < report_type.length; i++) {
        $('#report_type').append('<option value='+i+'>'+report_type[i]+'</option>')
    }
    // 点击 '举报'
    $('.report_inner').click(function(event) {
        Qnzs.getSessionAccount({}).then(function (data) {
            if(data.status == 'ALERT') {
                $.alert(data.msg);
                return;
            }

            $('.report_popup').show();
            $('body').addClass('overflow_h')
        });
    });
    // 点击 '取消'、'x'按钮(举报弹出框)
    $('.report_popup .cancel,.report_popup .delete').click(function(event) {
        $('.report_popup').hide();
        $('body').removeClass('overflow_h')
    });
    // 点击发布
    $('#submit_report').click(function () {
        var data = {
            module: 5, // 1-找活动、2-找咨询、3-找帮助、4-重磅项目、5-线下服务
            reportAgainstId: staId, // 站点ID(全局变量)
            reportType: $('#report_type').children('option:selected').val(), // 举报分类(0-其他、1-欺诈、2-色情、3-诱导行为、4-不实信息、5-违法犯罪、6-骚扰、7-侵权(冒充他人、侵犯名誉等))
            reportReason: $('#reason_report').val() // 举报理由/内容
        };
        //console.log('submit_report data', data);

        if(!data.reportType) {
            $.alert('请选择举报分类');
            return;
        }

        // 举报投诉
        YoungFamilyApi.report(data).then(function (data) {
            $('.report_popup .cancel,.report_popup .delete').click(); //  // 触发关闭弹出框事件（举报）
            $.alert(data.msg);
            return;
        });

    });

});


/***   百度地图 *******/






function getDressclik() {



    var lng = longit; //$('#address_parent').data('lng'); // 站点经度
    var lat1 = lat; //$('#address_parent').data('lat'); // 站点纬度

    /*var longitude = $('#address_parent').data('longitude'); // 当前定位经度
        var latitude = $('#address_parent').data('latitude'); // 当前定位纬度*/
    if(!lng || lng == 'undefined' || !lat1 || lat1 == 'undefined' || !longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
        // $.alert('站点位置参数不能为空');
        // $.alert('站点位置定位中，请稍后...');
        return;
    }
    window.location.href ='station2_map.html?lng=' + lng + '&lat=' + lat1 + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
};


