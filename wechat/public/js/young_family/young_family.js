/**
 * Created by Administrator on 2017/7/15.
 */
$(document).ready(function(){
    // 推荐服务站点列表
    var typeTitle=[
        {caId: 6, name: '心理咨询'},
        {caId: 25, name: '婚恋交友'},
        {caId: 26, name: '志愿服务'},
        {caId: 32, name: '社区矫正'},
        {caId: 28, name: '法律援助'},
        {caId: 24, name: '实习推荐'},
        {caId: 30, name: '就业指导'},
        {caId: 41, name: '其他'}
    ];

    var html = '';
    for(var i=0; i<typeTitle.length; i++) {
        var type = typeTitle[i];
        var index = i+1;
        html += '<li class="fl">';
        html += '    <a href="classification.html?caId=' + type.caId + '&name=' + type.name + '">';
        html += '        <div class="divout">';
        html += '            <div class="divin" style="background-image: url(../../public/img/xxfwIcon0' + (i+1) + '.png">';
        html += '                <h6 class="color000 fz26">' + type.name + '</h6>';
        html += '            </div>';
        html += '        </div>';
        html += '    </a>';
        html += '</li>';
    }
    $('#recommendStations').append(html); // 渲染推荐服务站点

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

        $listContent.html(html); // 渲染站点列表
    }

    var params = {
        pageNo: 1,
        pageSize: 5
    };
    // 获取附近的青年之家列表
    YoungFamilyApi.getNearbyStation(params).then(function (data) {
        console.log('YoungFamilyApi.getNearbyStation data', data);
        var stations = data.rows;

        render_stationlist($('#nearbySite .content'), stations); // 渲染附近的青年之家站点列表
    });


    // 获取人气青年之家列表
    YoungFamilyApi.getPopularityStation(params).then(function (data) {
        console.log('YoungFamilyApi.getPopularityStation data', data);
        // var stations = data.datalist;

        var stations = data.rows;


        render_stationlist($('#popularityStation .content'), stations); // 渲染气服务站点列表
    });


    /**
     * 头部banners
     */
    function getBanners(){
        var sitenavOrgId = 440000; // 默认广东省
        if($.cookie && $.cookie('district_qnzs')) {
            var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
            district_qnzs = JSON.parse(district_qnzs);
            sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
        }
        console.log('sitenavOrgId', sitenavOrgId);

        var params = {
            did: sitenavOrgId, //  地区ID
            type: 1, // 类型：0-pc端；1-移动端
            acticey: 4 // 分类：0-首页banner；1-找活动；2-找帮助；3-重磅项目；4-青年之家;5-首页推荐项目
        };
        Qnzs.findImageByType(params).then(function (data) {
            var banners = data.dataList;

            if(banners && banners.length > 0) {
                var autoPlay = banners.length > 1 ? true : false;
                var html ='';
                for(var i = 0; i < banners.length; i++){
                    banner = banners[i];
                    html += '<li><a href="' + banner.url + '" class="disB"><img src="' + Utils.compressByAli(banner.path, 300, 750) + '"/></a></li>';
                }
                $('#banner #head-banner ul').append(html);
                // $('#head-banner ul').append(html);

                TouchSlide({
                    slideCell: "#banner",// 这里一定要是id
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    autoPage: true,
                    autoPlay: autoPlay,
                    effect: "leftLoop",
                    delayTime: 300,
                    interTime: 3000
                });
            }

        });
    }
    getBanners(); // 头部banners
});