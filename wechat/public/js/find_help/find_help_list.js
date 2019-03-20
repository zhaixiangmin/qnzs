/**
 * Created by Administrator on 2017/6/27.
 */
$(function () {
    var helpType = Utils.getQueryString('helpType'); // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
    var auditStatus = Utils.getQueryString('auditStatus'); // 审核状态(1-求助中;2-已解决)
    var keyword = Utils.getQueryString('keyword'); // 搜索关键字
    if (!helpType && !auditStatus && !keyword) {
        $.alert('找帮助参数不能为空').then(function () {
            window.history.back(); // 返回上一页
        });
    }
    
    var auditTypeName = {
        '0': '处理中',
        '1': '求助中',
        '2': '已解决',
        '3': '等待处理',
        '4': '删除',
        '5': '退回',
        '6': '组织帮助'
    };

    if(keyword) { // 关键字不为空，说明是通过搜索进来的
        $('.searchBox').show(); // 显示搜索栏
    }else {
        if(helpType) {
            $('#pre_name').text(helpType); // 上一页面名称
        }else if(auditStatus) {
            $('#pre_name').text(auditTypeName[auditStatus]); // 上一页面名称
        }
        $('#title_path').show(); // 显示路径标题

    }


    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params = {
        title: keyword, // 找帮助名称(可不传，默认为null;搜索时用到)
        helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
        auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        sort: 'create_time', // 排序字段(可不传)
        order: 'desc' // 排序方式(可不传，desc 降序 asc升序)
    };

    /**
     * 渲染帮助列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param comments {array} 帮助列表
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
            
            html += '<a href="find_help_detail.html?id=' + help.hpId + '" class="item clearfix disB">';
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
     * @param params {obj} 加载帮助函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadHelpList(fun, params, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params).then(function (data) {
            var helps = data.rows;

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

    loadHelpList(FindHelpApi.findAllHelp, params, $('.case .content')); // 加载帮助列表并渲染页面

    // var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadHelpList(FindHelpApi.findAllHelp, params, $('.case .content')); // 加载帮助列表并渲染页面
        }
    });


    // 点击 '搜索' 按钮
    $('#submit_search').click(function () {
        params.title = $('#searchText').val();
        params.page = 1; // 重置当前页码
        // if(!params.title) {
        //     $.alert('请输入关键字');
        //     return;
        // }
        loadHelpList(FindHelpApi.findAllHelp, params, $('.case .content'), true); // 加载帮助列表并渲染页面
    });


});