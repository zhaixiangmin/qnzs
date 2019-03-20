/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    var staId = Utils.getQueryString('staId'); // 站点ID
    console.log('staId', staId);
    if(!staId) {
        $.alert('站点ID不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }

    // 服务站点详情
    YoungFamilyApi.stationDetail({staId: staId}).then(function (data) {
        console.log('YoungFamilyApi.stationDetail data', data);
        var categories = data.dataList.staCategoriesList; // 服务类别列表
        var html = '';
        for(var i=0; i<categories.length; i++) {
            var category = categories[i];
            html += '<option value="' + category.id + '">' + category.name + '</option>';
        }
        $('#category').html(html); // 渲染服务类别下拉框
    });

    var serviceDayArr = []; // 日期数组
    var serviceTimesArr = []; // 时间段数组

    /**
     * 绑定服务时间
     * @param $serviceDay {jq} 服务日期jq对象
     * @param $serviceTime {jq} 服务时间jq对象
     * @param selectedData {obj} 选中记录
     */
    function bindServiceDateTime($serviceDay, $serviceTime, selectedData) {
        // 获取未来一周的服务时间
        YoungFamilyApi.getServiceDateTime({}).then(function (data) {
            // var selectedIndex = undefined; // 选中下标索引
            serviceDayArr = []; // 清空
            serviceTimesArr = []; // 清空
            /**
             * 获取服务日期列表，并设置默认值
             * @param list
             */
            function getServiceDay(list) {
                serviceDayHmtl = ''; // 服务时间html
                for(var i=0;i < list.length; i++) {
                    var serviceTimesArrTem = []; // 时间段数组（一维，为二维数组服务）
                    var item = list[i];
                    var serviceDay = { value: i+1, text: item.serviceDay }; // 如果是0开始，默认选中0（combobox插件的bug）

                    serviceDayHmtl += '<option value="' + serviceDay.value + '">' + serviceDay.text  + '</option>'; // 服务日期html
                    serviceDayArr.push(serviceDay); // 全局变量
                    var serviceTimesHtml = '';
                    for(var j=0; j<item.serviceTimes.length; j++) {
                        var time = item.serviceTimes[j];
                        var serviceTimes = { value: j+1, text: time };

                        if(i == 0) { // 初始化服务时间
                            serviceTimesHtml += '<option value="' + serviceTimes.value + '">' + serviceTimes.text + '</option>';
                        }
                        serviceTimesArrTem.push(serviceTimes);
                    }
                    if(i == 0) {
                        $serviceTime.html(serviceTimesHtml); // 渲染服务时间下拉框
                    }
                    serviceTimesArr.push(serviceTimesArrTem); // 全局变量
                }
                $serviceDay.html(serviceDayHmtl); // 渲染服务日期下拉框
            }
            getServiceDay(data.dataList);
            console.log('serviceDayArr', serviceDayArr);
            console.log('serviceTimesArr', serviceTimesArr);
        });
    }

    bindServiceDateTime($('#serviceDay'), $('#serviceTime')); // 绑定服务时间

    $('#serviceDay').change(function () {
       var serviceDay = $(this).find('option:selected').val(); // 获取服务日期的值
        console.log('change serviceDay', serviceDay);
        var html = '';
        var index = serviceDay - 1;
        var list = serviceTimesArr[index];
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            html += '<option value="' + item.value + '">' + item.text + '</option>';
        }
        $('#serviceTime').html(html); // 渲染服务时间下拉框
    });

    var isClicked = false; // 是否点击按钮(true：已点击，false：未点击)
    // 点击 '提交' 按钮
    $('#submit_reserve').click(function () {
        if(isClicked) { // 如果'提交'按钮已点击，直接返回
            console.log('重复按钮');
            return;
        }
        // console.log('进入按钮');
        isClicked = true; // 设置'提交'按钮 已点击
        $('#sureReportBtn a').css('opacity', 0.5); // 设置'提交'按钮透明

       var data = {
           title: $('#title').val(), // 标题
           categoryId: $('#category').find('option:selected').val(), // 服务类别ID
           stationId: staId, // 服务站点ID
           description: $('#description').val(), // 提问内容
           serviceDay: $('#serviceDay').find('option:selected').text(), // 服务日期文本
           serviceTime: $('#serviceTime').find('option:selected').text(), // 服务时间段文本
           orgId: '001' // 当前分站
       };

        // 是否可以预约线下服务
        YoungFamilyApi.checkApplication({}).then(function () {
            // console.log('YoungFamilyApi.checkApplication data', data);
            if(!data.title) {
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
                $.alert('请输入标题');
                return;
            }
            if(!data.categoryId) {
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
                $.alert('请选择服务类别');
                return;
            }
            if(!data.serviceDay) {
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
                $.alert('请选择服务服务时间');
                return;
            }
            if(!data.serviceTime) {
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
                $.alert('请选择服务服务时间');
                return;
            }
            if(!data.description) {
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
                $.alert('请输入服务描述');
                return;
            }
            if(!data.stationId) {
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
                $.alert('站点ID不能为空');
                return;
            }

            // 预约线下服务
            YoungFamilyApi.applicationService(data).then(function (data) {
                $.alert(data.msg).then(function () {
                    window.history.back();  //返回上一页
                })
            }).always(function () {
                // 接口错误，恢复按钮点击状态
                isClicked = false; // 设置'提交'按钮 未点击
                $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
            });
        }, function () {
            // 接口错误，恢复按钮点击状态
            isClicked = false; // 设置'提交'按钮 未点击
            $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
        });

    });

    // var data = {
    //     module: 5, // 来源版块(1-找活动、2-找咨询、3-找帮助、4-重磅项目、5-线下服务)
    //     reportAgainstId: staId, // 站点ID
    //     reportType: undefined,// 举报分类(0-其他、1-欺诈、2-色情、3-诱导行为、4-不实信息、5-违法犯罪、6-骚扰、7-侵权(冒充他人、侵犯名誉等))
    //     reportReason: $('#content').val() // 举报理由/内容
    // };
    // // 点击 '提交' 按钮
    // $('#submit_application').click(function () {
    //     data.reportType = $('#reportType').find('option:selected').val();
    //     data.reportReason = $('#content').val();
    //     console.log('submit_report data', data);
    //     if(!data.reportType) {
    //         $.alert('请选择举报分类');
    //         return;
    //     }
    //     // 举报投诉
    //     YoungFamilyApi.report(data).then(function (data) {
    //         console.log('YoungFamilyApi.report data', data);
    //         $.alert('举报成功').then(function () {
    //             // 跳转到详情页码
    //             window.location = 'detail.html?staId=' + staId;
    //         })
    //     })
    // })
    
});