/**
 * Created by Administrator on 2017/6/27.
 */
$(function () {
    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params = {
        // page: 1, // 当前页码
        // rows: 6, // 每页记录数
        // fullName: undefined, // 组织名称
        // type: undefined, // 类型(2省级团委组织、3服务站点、4青年文明号、5学生社团 6社会组织、7合作机构)
        // did: undefined, // 类型(type为2 的时候传did，1-地市，2-高校)
        // sort: undefined, // 排序字段
        // order: undefined // 排序方式

        fullName: undefined, // 组织名称
        did: undefined, // 当前站点did
        type: undefined, // 类型(3：服务站点、4：青年文明号、5：学生社团 6：社会组织、7：合作机构)
        orgType: undefined, // 省级团委(1：省级团委，2：地市团委，3：高校团委)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        sort: undefined, // 排序字段
        order: undefined // 排序方式
    };

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
            var imgUrl = help.photoUrl ? help.photoUrl : '../../public/img/default_avator.png';

            html += '<a href="../organization/organization_detail.html?oid=' + help.oid + '" class="item clearfix disB">';
            html += '    <div class="left fl">';
            html += '        <img src="' + imgUrl + '"/>';
            html += '    </div>';
            html += '    <div class="right">';
            html += '        <h3 class="color000 fz30">' + help.fullName + '</h3>';
            if(help.description==null){
                html += '        <p class="fz26 color666"></p>';
            }else {
                html += '        <p class="fz26 color666">' + help.description + '</p>';

            }

            html += '        <div class="botTxt clearfix">';
            html += '            <span class="fz24 fl" style="color: #2185cf;">已受理求助<em style="color: #2185cf;">' + help.solveHelpCount + '</em>次</span>';
            html += '            <em class="fz24 fr" style="padding: 0.2rem 0.4rem; background: #2185cf; color: #fff; border-radius: 0.16rem;">向TA求助</em>';
            html += '        </div>';
            html += '    </div>';
            html += '</a>';
        }
        // $listContent.append(html);

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载帮助列表并渲染页面
     * @param fun {function} 加载帮助函数
     * @param params {obj} 加载帮助函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadHelpList(fun, params, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params).then(function (data) {
            var helps = data.rows;

            // if(params.page == 1) { // 第一页
            //     $('#total_organization').html('(' + data.total + ')'); // 帮助名称后面添加总记录数
            // }

            render_helplist($listContent, helps, isClear); // 渲染帮助列表
            if(helps && helps.length >= params.rows) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params.page++; // 页码自增
            loadedFlag = true; // 设置加载完成(全局变量)
        });
    }

    loadHelpList(FindHelpApi.findOrganization, params, $('.case .content')); // 加载帮助列表并渲染页面

    // var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadHelpList(FindHelpApi.findOrganization, params, $('.case .content')); // 加载帮助列表并渲染页面
        }
    });



    // 点击 '搜索' 按钮
    $('#submit_search').click(function () {
        params.fullName = $('#searchText').val();
        params.page = 1; // 重置当前页码
        if(!params.fullName) {
            $.alert('请输入关键字');
            return;
        }
        loadHelpList(FindHelpApi.findOrganization, params, $('.case .content'), true); // 加载帮助列表并渲染页面
    });


    // 点击下拉框
    $('.choose_box').click(function () {
        $('#league').show(); // 显示下拉框
    });

    // 选择 组织类型
    $('#league .league_child').click(function () {
        $('#league').hide(); // 隐藏下拉框
        $('#typeName').text($(this).text()); // 设置组织类型名称
        params.page = 1; // 重置页码
        params.type = $(this).data('type'); // 类型(3：服务站点、4：青年文明号、5：学生社团 6：社会组织、7：合作机构)
        params.orgType = $(this).data('org');  // 省级团委(1：省级团委，2：地市团委，3：高校团委)

        loadHelpList(FindHelpApi.findOrganization, params, $('.case .content'), true); // 加载帮助列表并渲染页面
    })

});