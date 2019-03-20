/**
 * Created by Administrator on 2017/7/11.
 */
$(function () {
    var caId = Utils.getQueryString('caId');
    var name = Utils.getQueryString('name');
    //console.log('caId', caId);
    //console.log('name', name);
    if(!caId) {
        $.alert('类别ID不能为空').then(function () {
            window.location.href = 'young_family.html';
        });
    }

    var staId = undefined; // 服务站ID
    if(!name){
    	
    	 $.alert('“该名称对应的服务类别不存在，请检查名称是否输错！').then(function () {
           window.location.href = 'young_family.html';
        });
    	
    }

    $('#type_name').text(name); // 分类名称
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

    function siteList(list){
        var html='';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            // var starHtml = '';
            var starHtml = star_generate(item.star);

            var imgUrl = item.imageUrl ? item.imageUrl : '../../public/img/default_avator.png';

            html+='<div class="fl bgcWhite clearfix anli_list">';
            html+=' <a href="detail.html?staId=' + item.staId + '">';
            html+='  <div class="anli_l fl">';
            html+='   <img src="' + imgUrl + '" alt="" />';
            html+='  </div>';
            html+='  <div class="rightTxt">';
            html+='   <h3 class="rightTxtTitle">' + item.fullName + '</h3>';
            html+='   <div class="scoreBox clearfix">';
            html+='    <ol class="clearfix fl scoreBox_ol">' + starHtml + '</ol>';
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>' + item.star + '</em>分</span>';
            html+='    <span class="yiping font12 color999" style="margin:0 20px;">' + item.evaluationNum + '人已评</span>';
            html+='    <span class="fl color000 guanzhurenshu">' + item.concernNum + '人关注</span>';
            html+='   </div>';
            html+='   <p class="address">' + item.address + '</p>';
            html+='  </div>';
            html+=' </a>';
            html+=' <button class="colorfff fr conBgc01 position_a yuyueBtn" style="cursor: pointer;" data-id="' + item.staId + '">预约服务</button>';
            html+='</div>';
        }

        // return html;
        $('#pageContent .anli_box').append(html);
    }

    var data = {
        caId: caId,
        districtId: undefined,
        pageNo: 1,
        pageSize: 10
    };

    // 推荐服务站点列表分页
    $('#pageContent').pageFun({
        contentCell: '.anli_box', /*包裹数据列表的父容器*/
        maxPage: 6,/*显示页码框个数*/
        pageFun: function(i){
            var pageHtml = '<li class="pageNum">'+i+'</li>';
            return pageHtml;
        },
        apiProxy: YoungFamilyApi.getRecommendStations, /*接口函数*/
        data: data,
        listFun: siteList, /*数据列表函数 -- 返回html字符串*/
        arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
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
        $('#serviceDate').append(dayHtml); // 服务时间select插入页面数据
        $('#serviceClock').append(serviceTimesArr[0]); // 服务时间select插入页面数据
    });


    // 监控服务日期选中值
    $('#serviceDate').change(function (event) {
        var val = $(this).children('option:selected').val(); // 选中值
        //console.log('val', val);
        $('#serviceClock').html(serviceTimesArr[val-1]); // 服务时间select插入页面数据
    });

    // 点击预约服务 按钮(动态绑定点击事件)
    $('#pageContent').on('click', '.yuyueBtn', function(event) {
    	  staId = $(this).attr('data-id');
        // 是否可以预约线下服务
        YoungFamilyApi.checkApplication({}).then(function (result){
        	
        	
           // staId = $(this).attr('data-id'); // 站点ID
            //console.log('staId', staId);
//          $('.bg_black').show();
            
        
             
//           return ;
            YoungFamilyApi.stationDetail({ staId: staId }).then(function (data) {
            	  // 弹出预约服务窗口
                $('.bg_black').show();
            
            	
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
             
                //服务站点
                $('#size_fuwu').html(data.dataList.fullName)  //站点名称
                 
                 
              
                $('body').addClass('overflow_h');  
                $('#serviceType').val(staCategories.id);  //服务类别
                
                
            });
        });

    });

    // 点击预约服务 弹出框 取消按钮、x按钮
    $('.serviceBottomBtns .cancel, .bg_black .delete').click(function(event) {
        $('.bg_black').hide();
        $('body').removeClass('overflow_h')
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