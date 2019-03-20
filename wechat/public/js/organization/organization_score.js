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
        $('#photoUrl').attr('src', imgUrl); // 头像url地址

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
        $('#telephone').text(organization.telephone); // 电话
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

    var initial_rows = 5; // 初始每页记录数

    var loadedFlag_activity = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_activity = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)
    var loadedFlag_help = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag_help = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)


    // TA的活动
    var params_activity = {
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: initial_rows, // 每页记录数(可不传，默认为10)
        orgId : oid, // 组织ID
        type: 2 // 类型(1:找帮助，2：找活动)
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

            var imgUrl = item.markAccPhoto ? item.markAccPhoto : '../../public/img/default_img.png'; // 用户头像
            var remark = item.remark ? item.remark : '该用户没有评论'; // 用户评论

            html += '<li class="item">';
            html += ' <div class="item_con clearfix">';
            html += '  <div class="left fl">';
            html += '   <div class="imgBox"><img src="' + imgUrl + '" class="pic" /></div>';
            html += '  </div>';
            html += '  <div class="right">';
            html += '   <div class="top clearfix">';
            html += '     <div class="user_name fl">' + item.markAccName + '</div>';
            html += '     <span class="fr time">' + item.markTime + '</span>';
            html += '    </div>';
            html += '    <div class="scoreBox clearfix">';
            html += '     <ol class="score_ol clearfix fl"></ol>';
            html += '     <span class="fenshu fl"><em class="score_num">' + item.score + '</em>分</span>';
            html += '    </div>';
            html += '    <p class="user_evaluate">' + remark + '</p>';
            html += '    <p class="user_join_act"><span>主办活动：</span>' + item.title + '</p>';
            html += '  </div>';
            html += ' </div>';
            html += '</li>';
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
            console.log('FindHelpApi.getPostPage data', data);

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


    loadActivityList(OrganizationApi.listByType, params_activity, $('.host_list')); // 加载活动列表并渲染页面


    // TA的帮助
    var params_help = {
        // page: 1, // 当前页码(可不传，默认为1)
        // rows: initial_rows, // 每页记录数(可不传，默认为10)
        // oid : oid // 组织ID
        pageIndex: 1, // 当前页码(可不传，默认为1)
        pageSize: initial_rows, // 每页记录数(可不传，默认为10)
        orgId : oid, // 组织ID
        type: 1 // 类型(1:找帮助，2：找活动)
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
     * @param list {array} 帮助列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_helplist($listContent, list, isClear) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var imgUrl = item.markAccPhoto ? item.markAccPhoto : '../../public/img/default_img.png'; // 用户头像
            var remark = item.remark ? item.remark : '该用户没有评论'; // 用户评论

            html += '<li class="item">';
            html += ' <div class="item_con clearfix">';
            html += '  <div class="left fl">';
            html += '   <div class="imgBox"><img src="' + imgUrl + '" class="pic" /></div>';
            html += '  </div>';
            html += '  <div class="right">';
            html += '   <div class="top clearfix">';
            html += '     <div class="user_name fl">' + item.markAccName + '</div>';
            html += '     <span class="fr time">' + item.markTime + '</span>';
            html += '    </div>';
            html += '    <div class="scoreBox clearfix">';
            html += '     <ol class="score_ol clearfix fl"></ol>';
            html += '     <span class="fenshu fl"><em class="score_num">' + item.score + '</em>分</span>';
            html += '    </div>';
            html += '    <p class="user_evaluate">' + remark + '</p>';
            html += '    <p class="user_join_act"><span>帮助主题：</span>' + item.title + '</p>';
            html += '  </div>';
            html += ' </div>';
            html += '</li>';
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
            console.log('FindHelpApi.getPostPage data', data);

            if(params_help.pageIndex == 1) { // 第一页
                $('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
            }

            render_helplist($listContent, helps, isClear); // 渲染帮助列表
            if(helps && helps.length >= params_help.pageSize) { // 全部列表数据尚未查询完毕
                finishFlag_help = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag_help = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params_help.pageIndex++; // 页码自增
            loadedFlag_help = true; // 设置加载完成(全局变量)
        });
    }

    loadHelpList(OrganizationApi.listByType, params_help, $('.done_list')); // 加载帮助列表并渲染页面



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

            var imgUrl = item.applicantPhoto ? item.applicantPhoto : '../../public/img/default_img.png'; // 用户头像

            html += '<li class="item">';
            html += ' <div class="item_con clearfix">';
            html += '  <div class="left fl">';
            html += '   <div class="imgBox"><img src="' + imgUrl + '" class="pic" /></div>';
            html += '  </div>';
            html += '  <div class="right">';
            html += '   <div class="top clearfix">';
            html += '     <div class="user_name fl">' + item.applicantName + '</div>';
            html += '     <span class="fr time">' + item.applyTime + '</span>';
            html += '    </div>';
            html += '    <div class="scoreBox clearfix">';
            html += '     <ol class="score_ol clearfix fl"></ol>';
            html += '     <span class="fenshu fl"><em class="score_num">' + item.score + '</em>分</span>';
            html += '    </div>';
            html += '    <p class="user_evaluate">' + item.evaluate + '</p>';
            html += '    <p class="user_join_act"><span>问题标题：</span>' + item.quesTitle + '</p>';
            html += '  </div>';
            html += ' </div>';
            html += '</li>';
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

    loadServiceList(OrganizationApi.getOffLineServicePageByOid, params_service, $('.xxfw_list')); // 加载服务列表并渲染页面



    // var loadedFlag_service = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8) {
            var cur_title = $('.title_box .title_list').find('.title.cur .title_con').text();
            console.log('cur_title', cur_title);
            if(cur_title.indexOf('主办活动') != -1 && loadedFlag_activity && !finishFlag_activity) {
                loadedFlag_activity = false; // 设置正在加载，避免重复
                loadActivityList(OrganizationApi.listByType, params_activity, $('.host_list')); // 加载列表并渲染页面
            }else if(cur_title.indexOf('求助解决') != -1 && loadedFlag_help && !finishFlag_help) {
                loadedFlag_help = false; // 设置正在加载，避免重复
                loadHelpList(OrganizationApi.listByType, params_help, $('.done_list')); // 加载帮助列表并渲染页面
            }else if(cur_title.indexOf('线下服务') != -1 && loadedFlag_service && !finishFlag_service) {
                loadedFlag_service = false; // 设置正在加载，避免重复
                loadServiceList(OrganizationApi.getOffLineServicePageByOid, params_service, $('.xxfw_list')); // 加载服务列表并渲染页面
            }
        }
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

    /*子版块点击切换*/
    // $('#list_big_box .title:first').addClass('cur');
    $('#list_big_box .list_box:not(:first)').hide();
    $('#list_big_box .title').click(function(event) {
        $(this).addClass('cur').siblings('.title').removeClass('cur');
        $('#list_big_box .list_box').eq($(this).index()).show().siblings('.list_box').hide();
    });
});