$(function () {
    // 点击 '搜索输入框'
    $('#searchText').click(function () {
        $(this).css('width', '77%'); // 改变搜索栏宽度
        $('#submit_search').show(); // 显示 '搜索'按钮
    });

    // 点击 '搜索' 按钮
    $('#submit_search').click(function () {
        var searchText = $('#searchText').val();
        if(!searchText) {
            $.alert('请输入关键字');
            return;
        }
        window.location.href = 'find_help_list.html?keyword=' + searchText; // 跳转到找帮助列表页
    });

    // 求助中、已解决列表
    function helping(list, auditText){
        var html='';
        if(!list || list.length <= 0) {
            $('.case .content').eq(0).append('暂无数据');
            return;
        }
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = '../../public/img/default_img.png';
            if(item.imgUrl) {
                imgUrl = item.imgUrl.split(',')[0]; // 默认获取第一张图片
            }else{
                imgUrl = '../../public/img/head_img/'+parseInt(Math.random()*40)+'.png';
            }

            html+='<a  href="find_help_detail.html?id=' + item.hpId + '" class="item clearfix disB">';
            html+=' <div class="left fl">';
            html+='  <img src="' + Utils.compressByAli(imgUrl, 160, 200) + '"/>';
            html+=' </div>';
            html+=' <div class="right">';
            html+='  <h3 class="color000 fz30">' + item.title + '</h3>';
            html+='  <p class="fz26 color666">' + item.helpType + '</p>';
            html+='  <div class="botTxt clearfix">';
            html+='   <span class="color999 fz24 fl">' + item.createTime + '</span>';
            html+='   <em class="fz24 fr">' + auditText + '</em>';
            html+='  </div>';
            html+=' </div>';
            html+='</a>';
        }
        if(auditText == '求助中') {
            $('.case .content').eq(0).append(html);
        } else if(auditText == '已解决') {
            $('.case .content').eq(1).append(html);
        }
    }

    var data = {
        title: '', // 找帮助名称(可不传，默认为null;搜索时用到)
        // caId: '', // 求助类别(54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
        auditStatus: 1, // 审核状态(1-求助中;2-已解决)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        sort: 'create_time', // 排序字段(可不传)
        order: 'desc' // 排序方式(可不传，desc 降序 asc升序)
    };
    // 帮助列表
    FindHelpApi.findAllHelp(data).then(function (result) {
        var helpList = result.rows;
        if(helpList) {
            helping(helpList, '求助中');
        }
    });
    data.auditStatus = 2; // 审核状态(1-求助中;2-已解决)
    data.sort = 'update_time'; // 排序字段(可不传)
    // 帮助列表
    FindHelpApi.findAllHelp(data).then(function (result) {
        var resolvedList = result.rows;
        if(resolvedList) {
            helping(resolvedList, '已解决');
        }
    });

    // 求助中、已解决 选项切换
    $('.case .title_item').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        var thisIdx = $(this).index();
        $('.case .content').eq(thisIdx).show().siblings('.content').hide();
    });

    // 点击 '>'，跳转到列表页(找帮助)
    $('#arrow_icon_find_help').click(function () {
        var text = $('.case .title_item.cur').text();
        console.log('text', text);
        if(text == '求助中') {
            window.location.href = 'find_help_list.html?auditStatus=1'
        }else if(text == '已解决') {
            window.location.href = 'find_help_list.html?auditStatus=2'
        }
    });

    // 点击 '>'，跳转到列表页(组织)
    $('#arrow_icon_organization').click(function () {
        window.location.href = 'organization_list.html';  // 跳转到组织列表页
    });


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

    FindHelpApi.findOrganization({ page: 1, rows: 6, sort: 'attention_count ', order: 'desc' }).then(function (data) {
        console.log('FindHelpApi.findOrganization data', data);
        var organizations = data.rows;
        var html = '';
        for(var i=0; i<organizations.length; i++) {
            var organization = organizations[i];
            var starHtml = star_generate(organization.helpAverageScore); // 星星评分
            var imgUrl =  organization.photoUrl ? organization.photoUrl : '../../public/img/default_avator.png';

            html += '<div class="content pl_30">';
            html += '    <a href="../organization/organization_detail.html?oid=' + organization.oid + '" class="item clearfix disB">';
            html += '        <div class="left fl">';
            html += '            <img src="' + Utils.compressByAli(imgUrl, 160, 200) + '"/>';
            html += '        </div>';
            html += '        <div class="right">';
            html += '            <h3 class="color000 fz30">' + organization.fullName + '</h3>';
            html += '            <div class="score clearfix fz24">';
            html += '                <ol class="fl clearfix">' + starHtml + '</ol>';
            html += '                <span>' + organization.helpScoreCount +  '人已评</span>';
            html += '            </div>';
            html += '            <div class="botTxt clearfix color999 ">';
            html += '                <span class="fz24 fl">已解决求助<em>' + organization.solveHelpCount + '</em>次</span>';
            html += '                <em class="fz24 fr">' + organization.attentionCount + '关注</em>';
            html += '            </div>';
            html += '        </div>';
            html += '    </a>';
            html += '</div>';
        }

        $('.tuijianzuzhi').append(html); // 组织列表
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
            acticey: 2 // 分类：0-首页banner；1-找活动；2-找帮助；3-重磅项目；4-青年之家;5-首页推荐项目
        };
        Qnzs.findImageByType(params).then(function (data) {
            var banners = data.dataList;
            // banners = [
            //     {path: 'http://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170329/20170329164430_761微信图片_20170329164724.jpg', url: '123'},
            //     {path: 'http://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170329/20170329133740_836微信图片_1.jpg', url: '123'},
            //     {path: 'http://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/activityImage/20170203/20170203165732_734QQ图片20170203165427.jpg', url: '123'},
            // ];
            if(banners && banners.length > 0) {
                var autoPlay = banners.length > 1 ? true : false;
                var html ='';
                for(var i = 0; i < banners.length; i++){
                    banner = banners[i];
                    html += '<li><a href="' + banner.url + '" class="disB"><img src="' + Utils.compressByAli(banner.path, 300, 750) + '"/></a></li>';
                }
                $('#banner .bd ul').append(html);

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
