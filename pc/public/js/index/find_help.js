
$(document).ready(function(){
    // 求助中、已解决按钮激活切换
    $('.askForHelp .tit h3').click(function(event) {
        $(this).addClass('color2185cf').siblings('h3').removeClass('color2185cf');
        var thisNum = $(this).index();
        console.log('thisNum', thisNum);
        if(thisNum == 0) { // 点击求助中
            $('.askForHelp .pageBox.helping').show();
            $('.askForHelp .pageBox.resolved').hide();
        }else {
            $('.askForHelp .pageBox.helping').hide();
            $('.askForHelp .pageBox.resolved').show();
        }
    });

    var params = {  /*接口参数*/
        title: undefined,
        auditStatus: 1, // 1-求助中 2-已解决
        page: 1,
        rows: 5,
        sort: 'create_time',
        order: 'desc'
    };

    function loadHelping($listContent, auditStatusName) {

        FindHelpApi.findAllHelp(params).then(function (data) {
            var helpList = data.rows;

            var list = '';
            for(var i=0; i < helpList.length; i++) {
                var item = helpList[i];
                var createTime = new Date(item.createTime).format('yyyy-MM-dd'); // 1498140055000

                // var imgUrl = item.imgUrl ? item.imgUrl : Utils.getDefaultImg(true);

                var imgUrl = Utils.getDefaultImg(true);
                if(item.imgUrl) {
                  imgUrl = item.imgUrl.split(',')[0]; // 默认获取第一张图片
                }

                list+='<a href="view/find_help/detail.html?id=' + item.hpId + '" class="disB itemBox">';
                // list+='<a href="find_help_detail.html?hpId=" class="disB itemBox">';
                list+=' <div class="itemCon borderB01 clearfix">';
                list+='  <div class="imgDiv fl">';
                list+='   <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_210,w_140') + '"/>';
                list+='  </div>';
                list+='  <div class="rightTxt">';
                list+='   <div class="top clearfix">';
                list+='    <span class="fl colorfff">' + auditStatusName + '</span>';
                list+='    <h3 class="color000 font16 fl">《' + item.title + '》</h3>';
                list+='   </div>';
                // list+='   <p class="longTxt color999">' + item.helpContent + '</p>'; // 如果内容含有子标签p，父标签p会包裹不住，子标签p与父标签p同级
                list+='   <div class="longTxt color999">' + item.helpContent + '</div>'; // 如果内容含有子标签p，父标签p会包裹不住，子标签p与父标签p同级
                list+='   <div class="middle color000">';
                list+='    <span class="left borderR01">受理方：' + item.acquirerRealName + '</span>';
                list+='    <span class="right">求助类型：' + item.helpType + '</span>';
                list+='   </div>';
                list+='   <div class="bottom clearfix color000">';
                list+='    <span class="span02 fl">' + item.countPost + '</span>';
                list+='    <span class="span03 fl">' + createTime + '</span>';
                list+='    <button class="fr colorfff conBgc01">我要帮TA</button>';
                list+='   </div>';
                list+='  </div>';
                list+=' </div>';
                list+='</a>';
            }

            $listContent.html(list); //  渲染页面
        });

    }

    // 分页器插件 -- 求助中
    loadHelping($('.pageBox.helping .list01'), '求助中');

    params.auditStatus = 2;
    // 分页器插件 -- 已解决
    loadHelping($('.pageBox.resolved .list02'), '已解决');


    // 获取组织分页列表
    FindHelpApi.findOrganization({ page: 1, rows: 6, sort: 'attention_count ', order: 'desc' }).then(function (data) {
        console.log('FindHelpApi.findOrganization data', data);
        var organizations = data.rows;
        var html = '';
        for(var i=0; i<organizations.length; i++) {
            var organization = organizations[i];


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
            starHtml = star_generate(organization.helpAverageScore);

            var imgUrl =  Utils.compressByAli(organization.photoUrl ? organization.photoUrl : 'public/img/default_avator.png', '?x-oss-process=image/resize,m_mfit,h_80,w_80');

            html += '<li class="clearfix borderB01">';
            html += ' <a href="view/organization/organization_detail.html?oid=' + organization.oid + '">';
            html += '  <div class="imgDiv">';
            html += '   <img src="' + imgUrl + '"  width="120" alt="" />';
            html += '  </div>';
            html += '  <div class="rightTxt">';
            html += '   <div class="titBox">';
            html += '    <p class="tit font14 color000">' + organization.fullName + '</p>';
            html += '   </div>';
            html += '   <div class="scoreBox clearfix">';
            html += '    <ol class="clearfix fl"></ol>';
            html += '    <span class="fl scoreColor01 font14 fenshu"><em>' + organization.helpAverageScore + '</em>分</span>';
            html += '    <span class="yiping font12 color999">' + organization.helpScoreCount + '人已评</span>';
            html += '   </div>';
            html += '   <div class="botBox clearfix">';
            html += '    <span class="left fl color000 font12">已解决求助 '+ organization.solveHelpCount + '次</span>';
            html += '    <a href="javascript:;" class="right fr color000 disB">' + organization.attentionCount + '人关注</a>';
            html += '   </div>';
            html += '  </div>';
            html += ' </a>';
            html += '</li>';
        }
        $('.askForHelp .rightHost .itemBox ul').html(html);
    });

    // 滚动事件
    $(window).scroll(function() {
        var _top = $(window).scrollTop();
        if (_top > 300) {
            $('.backTop').fadeIn(600);
        } else {
            $('.backTop').fadeOut(600);
        }
    });
    // 点击 '返回顶部'
    $(".backTop").click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });
    
});