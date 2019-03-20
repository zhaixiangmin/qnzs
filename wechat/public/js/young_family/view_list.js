/**
 * Created by Administrator on 2017/7/17.
 */
$(function () {
    var type = Utils.getQueryString('type'); // ()

    var fun = undefined; // 定义调用函数
    if(type == 1) {
        $('#stationName').text('您附近的服务站点'); // 渲染站点名称
        fun = YoungFamilyApi.getNearbyStation;
    }else {
        $('#stationName').text('人气服务站点'); // 渲染站点名称
        fun = YoungFamilyApi.getPopularityStation;
    }
    

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

    /**
     * 渲染站点列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param stations {array} 站点列表
     */
    function render_stationlist($listContent, stations) {
        var html = '';
        for(var i=0; i<stations.length; i++) {
            var station = stations[i];
            var starHtml = star_generate(station.star); // 星星评分
            var imgUrl = (station.imageUrl && station.imageUrl.indexOf('//') != -1) ? station.imageUrl : Utils.getDefaultImg();
            html += '<a href="detail.html?staId=' + station.staId + '" class="item clearfix borderBot" style="display: block;">';
            html += '    <div class="left fl">';
            html += '        <div class="imgDiv">';
            html += '            <img src="' + Utils.compressByAli(imgUrl, 125, 125) + '" />';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="right">';
            html += '        <div class="up pr_30">';
            html += '            <h3 class="color000 fz30">' + station.fullName + '</h3>';
            html += '            <div class="score clearfix">';
            html += '                <ol class="clearfix fl">' + starHtml + '</ol>';
            html += '                <span class="fz24 fl span01">' + station.star + '分</span>';
            html += '                <span class="fz24 color999 fl span02">' + station.evaluationNum + '人已评</span>';
            html += '            </div>';
            html += '            <p class="guanzhu color999 fz24">' + station.concernNum + '人关注</p>';
            html += '        </div>';
            html += '        <div class="down clearfix fz24 color999">';
            html += '            <p class="fl">' + station.address + '</p>';
            html += '            <span class="fr">&lt;' + station.distance + 'm</span>';
            html += '        </div>';
            html += '    </div>';
            html += '</a>';
        }

        $listContent.append(html); // 渲染站点列表
    }

    // var pageNo = 1; // 页码
    var params = {
        pageNo: 1,
        pageSize: 10
    };
    var loadedFlag = false; // 加载完成标识(true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(true：加载完毕，false：尚有数据)
    // 获取推荐服务站点列表
    fun(params).then(function (data) {

        console.log('fun data', data);
        render_stationlist($('#popularity'), data.rows); // 渲染站点列表
        // $('#stationName').append('(' + data.total + ')');

        if(data.rows && data.rows.length >= params.pageSize) { // 全部列表数据尚未查询完毕
            finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询
            return;
        }

        // 全部列表数据查询完毕
        $('#popularity').append('<div class="morebtn color333">全部数据加载完毕</div>');

    }).always(function () {
        params.pageNo++; // 页码自增
        loadedFlag = true; // 设置加载完成
    });

    // 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            // 这里加载数据..
            console.log('params.pageNo', params.pageNo);
            fun(params).then(function (data) {

                console.log('fun data', data);
                render_stationlist($('#popularity'), data.rows); // 渲染站点列表

                if(data.rows && data.rows.length >= params.pageSize) { // 全部列表数据尚未查询完毕
                    finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询
                    return;
                }

                // 全部列表数据查询完毕
                $('#popularity').append('<div class="morebtn color333">全部数据加载完毕</div>');

            }).always(function () {
                params.pageNo++; // 页码自增
                loadedFlag = true; // 设置加载完成
            });
        }
    });
});