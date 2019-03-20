/**
 * Created by licong on 2017/8/18.
 */
$(function () {


    // page {int} 当前页码(可不传，默认为1)
    // rows {int} 每页记录数(可不传，默认为10)
    // parentDid {int} 区域父ID(440000：广东省)
    // type {int} 类型(1是组织，2是高校)
    var params_city = {
        page: 1, // 页码(默认值为1)
        rows: 100, // 每页记录数(默认值为10)
        type: 1, // 类型(1是组织，2是高校)
        parentDid: 440000 // 区域父ID(440000：广东省)
    };
    // 加载城市列表
    Qnzs.getDistrictByType(params_city).then(function (data) {
        console.log('getDistrictByType 地市 data', data);
        var cities = data.rows;
        var html = '';
        // html += '<a class="district" data-id="440000" data-name="广东省">广东省</a>';
        html += '<li class="list_item" data-id="440000"><a href="javascript:;" class="item_link">广东</a></li>';
        // 城市列表
        for(var i=0; i<cities.length; i++) {
            var city = cities[i];
            html += '<li class="list_item" data-id="' + city.did + '"><a href="javascript:;" class="item_link">' + city.districtName + '</a></li>';
        }
        $('.city_list .list_ul').html(html); // 渲染城市列表
    });

    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params_school = {
        page: 1, // 页码(默认值为1)
        rows: 50, // 每页记录数(默认值为10)
        type: 2, // 类型(1是组织，2是高校)
        parentDid: 440000, // 区域父ID(440000：广东省)
        name: undefined // 名称搜索
    };


    /**
     * 渲染高校列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param list {array} 数据列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_list($listContent, list, isClear) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            html += '<li class="list_item" data-id="' + item.did + '"><a href="javascript:;" class="item_link">' + item.fullName + '</a></li>';
        }

        // $('.school_list .list_ul').append(html);

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载帮助列表并渲染页面
     * @param fun {function} 加载帮助函数
     * @param params_school {obj} 加载帮助函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadList(fun, params_school, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params_school).then(function (data) {
            var list = data.rows;
            console.log('FindHelpApi.getPostPage data', data);

            if(params_school.page == 1) { // 第一页
                $('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
            }

            render_list($listContent, list, isClear); // 渲染帮助列表
            if(list && list.length >= params_school.rows) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            // $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');
            $('.school_list').append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params_school.page++; // 页码自增
            loadedFlag = true; // 设置加载完成(全局变量)
        });
    }

    loadList(Qnzs.getDistrictByType, params_school, $('.school_list .list_ul')); // 加载帮助列表并渲染页面

    // var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadList(Qnzs.getDistrictByType, params_school, $('.school_list .list_ul')); // 加载帮助列表并渲染页面
        }
    });


    // 点击 '搜索' 按钮
    $('#submit_search').click(function () {
        params_school.name = $('#searchText').val();
        params_school.page = 1; // 重置当前页码
        if(!params_school.name) {
            $.alert('请输入关键字');
            return;
        }
        loadList(Qnzs.getDistrictByType, params_school, $('.school_list .list_ul'), true); // 加载帮助列表并渲染页面
    });

    // 点击 地市/高校
    $('#siteBox').on('click', '.list_item', function () {
        // 存储到cookie
        var district_qnzs = {
            sitenavOrgId: $(this).data('id'), // 区域ID
            sitenavOrgName: $(this).find('.item_link').text() // 区域名称
        };

        if(!district_qnzs.sitenavOrgId || !district_qnzs.sitenavOrgName) {
            $.alert('区域为空');
            return;
        }

        district_qnzs = JSON.stringify(district_qnzs);
        $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)

        // window.history.back(); // 返回上一页面
        var refreshMs = (new Date()).getTime();
        window.location.href = '../../index.html?refresh=' + refreshMs; // 防止苹果手机不自动刷新
    });
    
    

    // 切换地市/高校
    $('.header_btn .btn').click(function(event) {
        $(this).addClass('cur').siblings('.btn').removeClass('cur');
        $('.area_list').eq($(this).index()).show().siblings('.area_list').hide();
    });
});