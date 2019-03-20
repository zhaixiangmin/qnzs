
$(document).ready(function(){
    var staId = undefined; // 服务站ID
    var typeTitle=[
        {caId: 6, name: '心理咨询'},
        {caId: 25, name: '婚恋交友'},
        {caId: 26, name: '志愿服务'},
        {caId: 27, name: '关爱儿童'},
        {caId: 32, name: '社区矫正'},
        {caId: 33, name: '兴趣培养'},

        {caId: 28, name: '法律援助'},
        {caId: 24, name: '实习推荐'},
        {caId: 30, name: '就业指导'},
        {caId: 31, name: '政策咨询'},
        {caId: 34, name: '技能培训'},
        {caId: 35, name: '国学教育'},

        {caId: 36, name: '周末影院'},
        {caId: 37, name: '小升初适应'},
        {caId: 38, name: '中高考支援'},
        {caId: 39, name: '社会组织孵化'},
        {caId: 40, name: '家庭关系改善'},
        {caId: 41, name: '其他'}
    ];
    var html='';
    for (var i = 0; i < typeTitle.length; i++) {
        var type = typeTitle[i];
        html += '<li class="li'+(i+1)+'">';
        html += ' <a href="classification.html?caId=' + type.caId + '&name=' + type.name + '">';
        html += '  <div class="aCon clearfix">';
        html += '   <em class="em1"></em>';
        html += '   <span class="span01">' + type.name + '</span>';
        html += '  </div>';
        html += ' </a>';
        html += '</li>';
    }
    $('.typeTitle_ul').append(html);

    /**
     * 分页函数
     * @param data {obj} 属性如下
     * pageNo {int} 页码(默认值为1)
     * pageSize {int} 每页记录数(默认值为10
     * districtId {string} 地区ID
     * keyword {instringt} 站点名称关键字
     */
    function page(data) {
        // 人气服务站点数据列表分页
        $('.pageBox').pageFun({
            contentCell: '.siteList', /*包裹数据列表的父容器*/
            maxPage: 6,/*显示页码框个数*/
            pageFun: function(i){
                var pageHtml = '<li class="pageNum">'+i+'</li>';
                return pageHtml;
            },
            apiProxy: YoungFamilyApi.getStationsPageByParam, /*接口函数*/
            data: data,
            listFun: siteList, /*数据列表函数 -- 返回html字符串*/
            arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
        });
    }
    page({districtId: undefined, keyword: undefined, pageNo: 1, pageSize: 10}); // 分页函数

    // 人气服务站点数据列表插入
    function siteList (list, arg) {
        var html='';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

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

            var imgUrl = item.imageUrl ? item.imageUrl : '../../public/img/default_avator.png';

            var staCategoriesList = JSON.stringify(item.staCategoriesList);

            html += '<div class="listBox position_r">';
            html += ' <a href="detail.html?staId=' + item.staId + '" class="itemBox bgcWhite disB">';
            html += '  <div class="itemCon clearfix">';
            html += '   <div class="imgDiv fl">';
            html += '    <img src="' + imgUrl + '">';
            html += '   </div>';
            html += '   <div class="rightTxt">';
            html += '    <h3>' + item.fullName + '</h3>';
            html += '    <div class="scoreBox clearfix">';
            html += '     <ol class="clearfix fl scoreBox_ol">' + starHtml + '</ol>';
            html += '     <span class="fl scoreColor01 font14 fenshu"><em>'+ item.star +'</em>分</span>';
            html += '     <span class="yiping font12 color999">' + item.evaluationNum + '人已评</span>';
            html += '     <span class="fr color000 guanzhurenshu">' + item.concernNum + '人关注</span>';
            html += '    </div>';
            html += '    <div class="botBox clearfix">';
            html += '     <p class="color666 fl">' + item.address + '</p>';
            html += '    </div>';
            html += '   </div>';
            html += '  </div>';
            html += ' </a>';
            html += ' <button class="colorfff fr conBgc01 position_a yuyueBtn" style="cursor: pointer;" data-id="' + item.staId + '">预约服务</button>';
            html += '</div>';
        }

        // return html;

        $('.pageBox .siteList').append(html);

        // 点击预约服务 按钮（必须在元素加载完成后，再绑定点击事件，否则不生效）
        $('.listBox .yuyueBtn').click(function(event) {

            // 是否可以预约线下服务
            YoungFamilyApi.checkApplication({}).then(function (result){

                staId = $(this).data('id'); // 全局变量

                YoungFamilyApi.stationDetail({ staId: staId }).then(function (data) {
                    var staCategoriesList = data.dataList.staCategoriesList;
                    if(!staCategoriesList) {
                        $.alert('该站点服务类别列表为空');
                        return;
                    }
                    var serviceTypeHtml = ''; // 服务类型（预约服务弹出框）
                    for(var i=0; i<staCategoriesList.length; i++) {
                        var staCategories = staCategoriesList[i];
                        if(i == 0) {
                            serviceTypeHtml += '<option value="' + staCategories.id + '" selected>' + staCategories.name + '</option>';
                            continue;
                        }
                        serviceTypeHtml += '<option value="' + staCategories.id + '">' + staCategories.name + '</option>';
                    }

                    // 服务类型（预约服务弹出框）
                    $('#serviceType').html(serviceTypeHtml);

                    // 弹出预约服务窗口
                    $('.bg_black').show();
                    $('body').addClass('overflow_h');
                });
            });

        });

        // 点击预约服务 弹出框 取消按钮、x按钮
        $('.serviceBottomBtns .cancel, .bg_black .delete').click(function(event) {
            $('.bg_black').hide();
            $('body').removeClass('overflow_h')
        });
    }

    // 点击搜索
    $('#search_family').click(function () {
        var keyword = $('#sb_huodong').val(); // 获取搜索输入框的文本
        YoungFamilyApi.getStationsPageByParam({keyword: keyword}).then(function () {
            var html = '';
            html += '<div class="list clearfix siteList">';
            html += '</div>';
            html += '<div class="notContent hide">';
            html += '    <div class="error_wrap">囧~没有搜到相关信息哦</div>';
            html += '</div>';
            html += '<div class="page">';
            html += '    <ul class="pageMenu clearfix">';
            html += '        <li class="firstPage">首页</li>';
            html += '        <li class="prevPage"> < 上一页 </li>';
            html += '        <div class="pageObj ">';
            html += '        </div>';
            html += '        <li class="nextPage"> 下一页 > </li>';
            html += '        <li class="lastPage">尾页</li>';
            html += '        <li class="last" style="font-size: 14px;">';
            html += '            共<span class="totalPage"></span>页，跳转至 <input type="number" class="keuInput" value="1">';
            html += '            <button type="button" class="btnSure">确定</button>';
            html += '        </li>';
            html += '    </ul>';
            html += '</div>';

            $('#pageContent').html(html); // 清空分页内容和页码，并为即将新加分页做准备

            page({districtId: undefined, keyword: keyword, pageNo: 1, pageSize: 10}); // 分页函数
        });
    });


    // 线下预约弹出框 -- 数据绑定
    // var serviceTypeHtml = '<option value="' + caId + '">' + name + '</option>';
    // 服务类型（预约服务弹出框）
    // $('#serviceType').append(serviceTypeHtml);

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
        // //console.log('dayHtml', dayHtml);
        // //console.log('serviceTimesArr', serviceTimesArr);
        $('#serviceDate').append(dayHtml); // 服务时间select插入页面数据
        $('#serviceClock').append(serviceTimesArr[0]); // 服务时间select插入页面数据
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
        if(!data.title) {
            $.alert('请输入问题标题');
            return;
        }
        if(!data.categoryId) {
            $.alert('请选择服务类别');
            return;
        }
        if(!data.description) {
            $.alert('请输入服务描述');
            return;
        }
        if(!data.serviceDay) {
            $.alert('请选择服务日期');
            return;
        }
        if(!data.serviceTime) {
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