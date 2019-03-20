$(document).ready(function(){
    var oid = Utils.getQueryString('oid'); // 组织ID
    console.log('oid', oid);
    if (!oid) {
        $.alert('组织ID不能为空').then(function () {
            window.history.back(); // 返回上一页
        });
    }

    var name = undefined; // 受理方(组织)名称,全局变量

    // 获取单个组织详情
    OrganizationApi.findOrganizationById({oid: oid}).then(function (data) {
        console.log('OrganizationApi.getPcHelpListByOid data', data);
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
                    html += '<li class="gray_star"><span class="cur_star"></span></li>'; // 亮星
                    continue;
                }
                if(decimals > 0) {
                    var percentage = decimals * 10;
                    html += '<li class="gray_star"><span class="cur_star" style="width: ' + percentage + '%"></span></li>';
                    decimals = undefined; // 只进来一次
                    continue;
                }

                html += '<li class="gray_star"></li>'; // 灭星
            }

            return html;
        }

        // 获取精度
        function getFixed(num){
            return num ? num.toFixed(1) : '0.0';
        }
        // 获取整数
        function getNum(num) {
            return num ? num : '0';
        }

        var imgUrl =  organization.photoUrl ? organization.photoUrl : '../../public/img/default_avator.png';

        var scoreCount = (organization.helpScoreCount + organization.activityScoreCount + organization.stationScoreCount); // 评分人数(主办活动、求助解决、线下服务的评分人数)
        // var averageScore = (organization.helpAverageScore + organization.activityAverageScore + organization.stationAverageScore) / 3; // 平均分(主办活动、求助解决、线下服务的平均分)
        var averageScore = scoreCount ? (organization.helpAverageScore * organization.helpScoreCount  + organization.activityAverageScore * organization.activityScoreCount) / scoreCount : 0; // 平均分(解决帮助和主办活动的平均分)

        starHtmlActivity = star_generate(organization.activityAverageScore); // 主办活动星星图标
        starHtmlHelp = star_generate(organization.helpAverageScore); // 求助解决星星图标
        starHtmlStation = star_generate(organization.stationAverageScore); // 线下服务星星图标
        starHtmlAverage = star_generate(averageScore); // 平均分星星图标

        $('#fullName').text(organization.fullName); // 组织全称
        $('#shortName').text(organization.name); // 组织简称
        $('#attentionCount').text(organization.attentionCount); // 关注数
        // $('#title_organization').text(organization.name); // 组织简称(面包屑)
        $('#photoUrl').attr('src', Utils.compressByAli(imgUrl, 160, 200)); // 头像url地址

        $('.headTxt .item .score_ol').html(starHtmlAverage); // 评分星星图标
        $('#averageScore').text(getFixed(averageScore)); // 平均分(主办活动、求助解决、线下服务的平均分)
        $('#scoreCount').text(getNum(scoreCount)); // 评分人数(主办活动、求助解决、线下服务的评分人数)

        $('#activityAverageScoreIcon').html(starHtmlActivity); // 主办活动评分星星图标
        $('#activityAverageScore').text(getFixed(organization.activityAverageScore)); // 主办活动平均分
        $('#activityScoreCount').text(getNum(organization.activityScoreCount)); // 主办活动评分人数

        $('#helpAverageScoreIcon').html(starHtmlHelp); // 求助解决评分星星图标
        $('#helpAverageScore').text(getFixed(organization.helpAverageScore)); // 求助解决平均分
        $('#helpScoreCount').text(getNum(organization.helpScoreCount)); // 求助解决评分人数

        $('#stationAverageScoreIcon').html(starHtmlStation); // 线下服务评分星星图标
        $('#stationAverageScore').text(getFixed(organization.stationAverageScore)); // 线下服务平均分
        $('#stationScoreCount').text(getNum(organization.stationScoreCount)); // 线下服务评分人数

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
                alert("您选择地址没有解析到结果!");
            }
        });


        $('#telephone').text(organization.telephone); // 电话
        $('#telephone_parent').attr('href', 'tel:' + organization.telephone); // 添加直接拨号功能
        $('#description').text(organization.description); // 描述


        // 初始化 '求助' 弹出框
        $('#organization_info').find('.chakan').data('id', organization.oid); // 受理方ID(组织ID)
        $('#organization_info').find('.photoUrl').attr('src', imgUrl); // 受理方头像
        $('.list_tanchuang .list_tanchuang_t').find('.fullName').text(organization.fullName); // 受理方(求助弹出框标题)
        $('#organization_info').find('.fullName').text(organization.fullName); // 受理方
        $('#organization_info').find('.helpAverageScore').text(organization.stationAverageScore); // 组织评分
        $('#organization_info').find('.helpScoreCount').text(organization.helpScoreCount); // 已评人数
        $('#organization_info').find('.solveHelpCount').text(organization.solveHelpCount); // 已受理求助数
        $('#organization_info').find('attentionCount').text(organization.attentionCount); // 关注数
        $('#concern').text(organization.isFollowed ? '取消关注': '关注'); // 是否关注关注(isFollowedf)


        name = organization.name; // 受理方(组织)名称,全局变量
    });


    // 定位(获取当前坐标)
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
            $('#address_parent').data('longitude', r.point.lng); // 当前定位经度
            $('#address_parent').data('latitude', r.point.lat); // 当前定位纬度
        }
        else {
            $.alert('获取定位失败：' + this.getStatus());
        }
    },{enableHighAccuracy: true});


    // 点击 '地址栏'
    $('#address_parent').click(function () {
        var lng = $('#address_parent').data('lng'); // 站点经度
        var lat = $('#address_parent').data('lat'); // 站点纬度
        var longitude = $('#address_parent').data('longitude'); // 当前定位经度
        var latitude = $('#address_parent').data('latitude'); // 当前定位纬度

        if(!lng || lng == 'undefined' || !lat || lat == 'undefined') {
            $.alert('无法解析组织地址');
            return;
        }
        if(!longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
            // $.alert('站点位置参数不能为空');
            $.alert('站点位置定位中，请稍后...');
            return;
        }
        window.location.href = '../young_family/route_map.html?lng=' + lng + '&lat=' + lat + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
    });


    var initial_rows = 5; // 初始每页记录数

    var loadedFlag_help = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_help = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)
    var loadedFlag_service = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_service = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)
    var loadedFlag_answer = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_answer = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)
    var loadedFlag_activity = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_activity = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)
    var loadedFlag_heavy = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_heavy = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    // TA的活动
    var params_activity = {
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: initial_rows, // 每页记录数(可不传，默认为10)
        orgId : oid // 组织ID
    };

    var actStatus= {
        '1': '活动预告',
        '2': '报名中',
        '3': '已满员',
        '4': '报名结束',
        '5': '活动中',
        '6': '活动结束'
    };

    /**
     * 渲染活动列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param list {array} 活动列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_activitylist($listContent, list, isClear) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            html += '<a href="../find_active/hd_xiangqing.html?activityId=' + item.id + '" class="disB">';
            html += ' <div class="zhaohd_box_in clearfix">';
            html += '<div class="zhaohd_box_l fl">';
            html += '<img src="' + Utils.compressByAli(item.imageUrl, 200, 200) + '" alt="" class="hd_pic" style="height:3.2rem;">';
            html += ' <p class="actese">' + actStatus[item.actStatus] + '</p>';
            html += '  </div>';
            html += '  <div class="zhaohd_box_r">';
            html += '   <h3 class="hd_zhuti">' + item.title + '</h3>';
            html += '   <p class="hd_style">' + item.type + '</p>';
            html += '   <p class="hd_time color999">' + item.activityTime + '</p>';
            html += '   <p class="hd_adress color999">';
            html += '    <span class="fl hd_adress_l">' + item.address + '</span>';
            /* html+='    <span class="fr">&lt;' + item.distance + '米</span>'*/
            html += '   </p>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载活动列表并渲染页面
     * @param fun {function} 加载活动函数
     * @param params_activity {obj} 加载活动函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadActivityList(fun, params_activity, $listContent, isClear) {
        // 获取推荐活动活动列表
        fun(params_activity).then(function (data) {
            var list = data.rows;

            if(params_activity.pageIndex == 1) { // 第一页
                $('#total_activity').append('(' + data.total + ')'); // 活动名称后面添加总记录数
            }

            render_activitylist($listContent, list, isClear); // 渲染活动列表
            if(list && list.length >= params_activity.pageSize) { // 全部列表数据尚未查询完毕
                finishFlag_activity = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag_activity = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params_activity.pageIndex++; // 页码自增
            loadedFlag_activity = true; // 设置加载完成(全局变量)
        });
    }

    loadActivityList(OrganizationApi.activitiesList, params_activity, $('.act_list')); // 加载活动列表并渲染页面

    var username = undefined; // 用户ID(全局变量)
    Qnzs.getSessionAccount({}).then(function (data) {
        console.log('Qnzs.getSessionAccount data', data);
        if(data.status == 'ALERT') { // 用户没有登录
            $.alert(data.msg).then(function () {
                window.location.href = '../logoin/login.html'; // 跳转到登录页面
            });
            return;
        }

        if(data.account && data.account.username) {
            username = data.account.username; // 用户ID
        }
    });

    // TA的回答
    var params_answer = {
        page: 1, // 当前页码(可不传，默认为1)
        rows: initial_rows, // 每页记录数(可不传，默认为10)
        username : oid // 组织ID
    };

    /**
     * 渲染服务列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param list {array} 服务列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_answerlist($listContent, list, isClear) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            // var answerTime = new Date(item.answerTime).format('yyyy-MM-dd hh:mm');
            var imgUrl = item.photourl ? item.photourl : '../../public/img/default_img.png';

            html += '<a href="../find_consult/find_consult_question_detail.html?quId=' + item.quId + '" class="content">';
            html += ' <div class="content_in clearfix">';
            html += '  <div class="l">';
            html += '   <div class="circle"><img src="' + Utils.compressByAli(imgUrl, 120, 120) + '"/></div>';
            html += '  </div>';
            html += '  <div class="r">';
            html += '   <div class="up" style="height:70px;overflow: hidden;">';
            html += '    <h3>' + item.title + '</h3>';
            html += '    <p>' + item.askContent + '</p>';
            
            
            html += '   </div>';
            html += '   <div class="down clearfix">';
            html += '    <div class="left clearfix">';
            html += '     <span class="span01">' + item.realname + '</span>';
            html += '     <span class="span02">' + item.categoryName + '</span>';
            // html += '     <span>18:56</span>';
            html += '    </div>';
            html += '    <div class="right" style="padding-right:20px;">';
            html += '     <span>' + item.commentsNum + '</span>';
            html += '    </div>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载服务列表并渲染页面
     * @param fun {function} 加载服务函数
     * @param params_answer {obj} 加载服务函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadAnswerList(fun, params_answer, $listContent, isClear) {
        // 获取推荐服务服务列表
        fun(params_answer).then(function (data) {
            var list = data.rows;

            if(params_answer.page == 1) { // 第一页
                $('#total_answer').append('(' + data.total + ')'); // 服务名称后面添加总记录数
            }

            render_answerlist($listContent, list, isClear); // 渲染服务列表
            if(list && list.length >= params_answer.rows) { // 全部列表数据尚未查询完毕
                finishFlag_answer = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag_answer = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params_answer.page++; // 页码自增
            loadedFlag_answer = true; // 设置加载完成(全局变量)
        });
    }

    loadAnswerList(OrganizationApi.getExpAnswerList, params_answer, $('.answer_list')); // 加载列表并渲染页面

    // TA的帮助
    var params_help = {
        page: 1, // 当前页码(可不传，默认为1)
        rows: initial_rows, // 每页记录数(可不传，默认为10)
        oid : oid // 组织ID
    };

    // 找帮助
    var auditTypeName = {
        '0': '处理中',
        '1': '求助中',
        '2': '已解决',
        '3': '等待处理',
        '4': '删除',
        '5': '退回',
        '6': '组织帮助'
    };


    /**
     * 渲染帮助列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param helps {array} 帮助列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_helplist($listContent, helps, isClear) {
        var html = '';
        for (var i = 0; i < helps.length; i++) {
            var help = helps[i];
            var imgUrl = '../../public/img/default_img.png';
            if(help.imgUrl) {
                imgUrl = help.imgUrl.split(',')[0]; // 默认获取第一张图片
            }

            html += '<a href="../find_help/find_help_detail.html?id=' + help.hpId + '" class="item clearfix disB">';
            html += '    <div class="left fl">';
            html += '        <img src="' + Utils.compressByAli(imgUrl, 160, 200) + '"/>';
            html += '    </div>';
            html += '    <div class="right">';
            html += '        <h3 class="color000 fz30">' + help.title + '</h3>';
            html += '        <p class="fz26 color666">' + help.helpType + '</p>';
            html += '        <div class="botTxt clearfix">';
            html += '            <span class="color999 fz24 fl">' + help.createTime + '</span>';
            html += '            <em class="fz24 fr">' + auditTypeName[help.auditStatus] + '</em>';
            html += '        </div>';
            html += '    </div>';
            html += '</a>';
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载帮助列表并渲染页面
     * @param fun {function} 加载帮助函数
     * @param params_help {obj} 加载帮助函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadHelpList(fun, params_help, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params_help).then(function (data) {
            var helps = data.rows;

            if(params_help.page == 1) { // 第一页
                $('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
            }

            render_helplist($listContent, helps, isClear); // 渲染帮助列表
            if(helps && helps.length >= params_help.rows) { // 全部列表数据尚未查询完毕
                finishFlag_help = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag_help = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params_help.page++; // 页码自增
            loadedFlag_help = true; // 设置加载完成(全局变量)
        });
    }

    loadHelpList(OrganizationApi.getPcHelpListByOid, params_help, $('.help_list')); // 加载帮助列表并渲染页面


    //  TA的服务
    var params_service = {
        pageNo: 1, // 当前页码(可不传，默认为1)
        pageSize: initial_rows, // 每页记录数(可不传，默认为10)
        oid : oid // 组织ID
    };

    /**
     * 渲染服务列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param list {array} 服务列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_servicelist($listContent, list, isClear) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var imgUrl = item.stationImg ? item.stationImg : '../../public/img/default_img.png';

            html += '<a href="../person_center/release_offline_service_detail.html?applicationId=' + item.apId + '" class="item">';
            html += ' <div class="item_con clearfix">';
            html += '  <div class="left fl">';
            html += '   <div class="imgBox"><img src="' + Utils.compressByAli(imgUrl, 120, 120) + '" class="pic" /></div>';
            html += '  </div>';
            html += '  <div class="right fz24">';
            html += '   <h1 class="user_name">' + item.quesTitle + '</h1>';
            html += '   <p class="ser_status">' + item.statusStr + '</p>';
            html += '   <p class="ser_describe"><span>服务描述：</span>' + item.description + '</p>';
            html += '   <div class="ser_time">';
            html += '    <span class="l">' + item.applyTime + '</span><span class="r">11:28:56</span>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载服务列表并渲染页面
     * @param fun {function} 加载服务函数
     * @param params_service {obj} 加载服务函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadServiceList(fun, params_service, $listContent, isClear) {
        // 获取推荐服务服务列表
        fun(params_service).then(function (data) {
            var list = data.rows;

            if(params_service.pageNo == 1) { // 第一页
                $('#total_service').append('(' + data.total + ')'); // 服务名称后面添加总记录数
            }

            render_servicelist($listContent, list, isClear); // 渲染服务列表
            if(list && list.length >= params_service.pageSize) { // 全部列表数据尚未查询完毕
                finishFlag_service = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag_service = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params_service.pageNo++; // 页码自增
            loadedFlag_service = true; // 设置加载完成(全局变量)
        });
    }

    loadServiceList(OrganizationApi.getOffLineServicePageByOid, params_service, $('.service_list')); // 加载服务列表并渲染页面


    //  TA的重磅
    var  params_heavy = {
        districtId: undefined, // 所属地区ID(可不传)
        activityType: undefined, // 活动类型(可不传，推荐、赛事、评选、培训、其他))
        stage: undefined, // 活动阶段(可不传，0-全部、1-未开始、2-报名中、3-投票中、4-活动结束、5-报名投票同时进行中)
        createOrgId: oid, // 发布组织(oid)(可不传)
        pageNo: 1, // 当前页码(可不传)
        pageSize: initial_rows // 每页记录数(可不传)
    };

    var stageName = {
        '1': '未开始',
        '2': '报名中',
        '3': '投票中',
        '4': '活动结束' //（2/3为活动进行中）
    };

    function newDate(strdate) {
        var arr = strdate.split(/[- : \/]/);
        date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        return date;
    }

    /**
     * 渲染服务列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param list {array} 服务列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_heavylist($listContent, list, isClear) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.bannerUrl ? item.bannerUrl : '../../public/img/default_img.png';
            html += '<a href="../heavy_project/heavy_project_details.html?activityId=' + item.id + '" class="disB recommend_project_item">';
            html += ' <div class="xiangmu_box">';
            html += '  <div class="xiangmu_box_in">';
            html += '   <div class="xiangmu_content">';
            html += '    <div class="pic_box">';
            html += '     <img src="' + Utils.compressByAli(imgUrl, 200, 690) + '" alt="" />';
            html += '    </div>';
            html += '    <p class="clearfix">';
            html += '     <span class="xm_fenlei fl">' + item.type + '</span>';
            html += '     <span class="xm_zhuti fl">' + item.title + '</span>';
            // html += '     <span class="xm_status fr clearfix">' + status_array[i] + '</span>';

            // 1：未开始 2/5：报名中（剩 ** 天 **小时） 3：投票中 4：活动结束
            if(item.stage == 2 || item.stage == 5) { // 报名中
                var nowMs = new Date().getTime();
                // var endTime = new Date(item.endTime).getTime();
                var endTime = newDate(item.endTime).getTime();
                var day = undefined; // 相隔天数
                var hour = undefined;  // 相隔小时数
                if(endTime > nowMs) {
                    var diffMs = endTime - nowMs; // 相隔毫秒数
                    day = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 相隔天数
                    hour = diffMs % (1000 * 60 * 60 * 24); // 相隔小时数
                    hour = Math.floor(hour / ( 1000 * 60 * 60 ));
                }

                html+='    <span class="xm_status fr clearfix">' + day + '天' + hour + '小时</span>';
                html+='    <em class="xm_status fr clearfix" style="margin-right: 10px; background: #1795ff; color: #fff; padding: 0 2px">剩</em>';
            }else {
                html+='    <span class="xm_status fr clearfix">' + stageName[item.stage] + '</span>';
            }

            html += '    </p>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载服务列表并渲染页面
     * @param fun {function} 加载服务函数
     * @param  params_heavy {obj} 加载服务函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadHeavyList(fun,  params_heavy, $listContent, isClear) {
        // 获取推荐服务服务列表
        fun( params_heavy).then(function (data) {
            var list = data.dataList;

            if( params_heavy.pageNo == 1) { // 第一页
                $('#total_heavy').append('(' + data.total + ')'); // 服务名称后面添加总记录数
            }

            render_heavylist($listContent, list, isClear); // 渲染服务列表
            if(list && list.length >=  params_heavy.pageSize) { // 全部列表数据尚未查询完毕
                finishFlag_heavy = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag_heavy = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
             params_heavy.pageNo++; // 页码自增
            loadedFlag_heavy = true; // 设置加载完成(全局变量)
        });
    }

    loadHeavyList(OrganizationApi.activityList,  params_heavy, $('.zbxm_list')); // 加载服务列表并渲染页面


    // var loadedFlag_service = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8) {
            var cur_title = $('.title_box .title_list').find('.title.cur').text();
            console.log('cur_title', cur_title);
            if(cur_title.indexOf('帮助') != -1 && loadedFlag_help && !finishFlag_help) {
                loadedFlag_help = false; // 设置正在加载，避免重复
                loadHelpList(OrganizationApi.getPcHelpListByOid, params_help, $('.help_list')); // 加载帮助列表并渲染页面
            }else if(cur_title.indexOf('服务') != -1 && loadedFlag_service && !finishFlag_service) {
                loadedFlag_service = false; // 设置正在加载，避免重复
                loadServiceList(OrganizationApi.getOffLineServicePageByOid, params_service, $('.service_list')); // 加载服务列表并渲染页面
            }else if(cur_title.indexOf('回答') != -1 && loadedFlag_answer && !finishFlag_answer) {
                loadedFlag_answer = false; // 设置正在加载，避免重复
                loadAnswerList(OrganizationApi.getExpAnswerList, params_answer, $('.answer_list')); // 加载列表并渲染页面
            }else if(cur_title.indexOf('活动') != -1 && loadedFlag_activity && !finishFlag_activity) {
                loadedFlag_activity = false; // 设置正在加载，避免重复
                loadActivityList(OrganizationApi.activitiesList, params_activity, $('.act_list')); // 加载列表并渲染页面
            }else if(cur_title.indexOf('重磅') != -1 && loadedFlag_heavy && !finishFlag_heavy) {
                loadedFlag_heavy = false; // 设置正在加载，避免重复
                loadHeavyList(OrganizationApi.activityList,  params_heavy, $('.zbxm_list')); // 加载服务列表并渲染页面
            }
        }
    });


    // 点击 '评分'(跳转到组织评分页面)
    $('#score').click(function () {
        window.location.href = 'organization_score.html?oid=' + oid; // 跳转到组织评分页面
    });


    // 点击 '向TA求助'
    $('#submit_help').click(function () {
        if(!name) {
            $.alert('正在获取受理方名称，请稍候点击...');
            return;
        }
        window.location.href = '../find_help/help_apply.html?acquirer=' + oid + '&name=' + name;
    });

    // 点击 '关注'
    $('#concern').click(function () {
        OrganizationApi.followOrCancel({ orgId: oid }).then(function (data) {
            if(data.msg.indexOf('取消') != -1) { // 取消关注成功，显示'关注'
                $('#concern').text('关注');
            }else { // 关注成功，显示'取消关注'
                $('#concern').text('取消关注');
            }
        });
    });

    // $('#list_big_box .list_box:not(:first)').hide();
    // 切换选项卡
    $('#list_big_box .title').click(function(event) {
        $(this).addClass('cur').siblings('.title').removeClass('cur');
        $('#list_big_box .list_box').eq($(this).index()).show().siblings('.list_box').hide();
    });
});