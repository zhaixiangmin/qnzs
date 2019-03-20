var pageIndex = 1
var pageSize = 10;
var sitenavDid = 440000; // 默认广东省
if($.cookie && $.cookie('district_qnzs')) {
    var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
    district_qnzs = JSON.parse(district_qnzs);
    sitenavDid = district_qnzs.sitenavOrgId;
}

console.log(sitenavDid);

$(document).ready(function() {
    /*人气主办方*/
    function hot_sponsor() {
        $.ajax({
            type: "get",
            url: Qnzs.path + "/activity/publisher/list",
            data: {
                'pageIndex': pageIndex,
                'pageSize': pageSize
            },
            dataType: "JSON",
            success: function(data) {
                var data = data.dataList;
                if(data != null && data.length > 0) {
                    $.each(data, function(index, item) {
                        var coor = item.activityAverageScore;
                        var corrnum = coor.toFixed(1);
                        $('.hot_sponsor_list').append('<a href="../organization/organization_detail.html?oid=' + item.oid + '"><div class="zhaohd_box_in clearfix"><span class="zhaohd_box_l fl"><img src="' + Utils.compressByAli(item.photoUrl, 200, 200) + '" alt="" class="hd_pic" /></span><div class="zhaohd_box_r zb_box"><h3 class="zb_zhuti box_r_title">' + item.name + '</h3><div class="zb_pinglun scoreBox"><ol class="zb_star score_ol clearfix fl"></ol><span class="fenshu fl"><em class="score_num">' + corrnum + '</em>分</span><span class="pingjia color999 fl">' + item.activityScoreCount + '人已评</span></div><p class="guanzhu color999">' + item.answerQuestionCount + '人关注</p></div></div></a>');
                    });
                } else {
                    $('.hot_sponsor_list').append('<p style="text-align: center;">加载完了<p>');
                    $('.morebtn').hide();
                }
            }
        });
    }
    hot_sponsor();

    /* 点击加载更多
     */
    $('.morebtn').on("click", function() {
        pageIndex += 1;
        hot_sponsor();
    })
    /* 点击加载更多end
     */

    function recommendActivities() {
        var keywords = $('#active_secher').val();
        $.ajax({
            type: "get",
            url: Qnzs.path + "/activity/offlineActivity/recommendList",
            data: {
                'sitenavDid': sitenavDid,
                'keywords': keywords
            },
            dataType: "JSON",
            success: function(data) {
                var data = data.dataList;
                var html = ''
                var actStatus = {
                    '1': '活动预告',
                    '2': '报名中',
                    '3': '已满员',
                    '4': '报名结束',
                    '5': '活动中',
                    '6': '活动结束'
                };
                for(var i = 0; i < data.length; i++) {
                    var temp = data[i];
                    html += '<a href="../../view/find_active/hd_xiangqing.html?activityId=' + temp.id + '" class="disB">';
                    html += ' <div class="zhaohd_box_in clearfix">';
                    html += '<span class="zhaohd_box_l fl">';
                    html += '<img src="' + Utils.compressByAli(temp.imageUrl, 160, 200) + '" alt="" class="hd_pic" / style="height:3.2rem;">';
                    html += ' <span class="actese">' + actStatus[temp.actStatus] + '</span>';
                    html += '  </span>';
                    html += '  <div class="zhaohd_box_r">';
                    html += '   <h3 class="hd_zhuti">' + temp.title + '</h3>';
                    html += '   <p class="hd_style">' + temp.type + '</p>';
                    html += '   <p class="hd_time color999">' + temp.activityTime + '</p>';
                    html += '   <p class="hd_adress color999">';
                    html += '    <span class="fl hd_adress_l">' + temp.address + '</span>';
                    html += '   </p>';
                    html += '  </div>';
                    html += ' </div>';
                    html += '</a>';
                };
                $('.recommend_hd_box').append(html);
                //$('.act_list').append(html);
            },
        });
    }
    recommendActivities();

    //点击搜索活动
    $('#sou_sercher').on('click', function() {
        var keywords = $('#active_secher').val();
        window.location.href = '../find_active/hd_searchKeywordList.html?keywords=' + keywords;
    })

    //bnner图片
    function getIndeber() {
        $.ajax({
            type: "get",
            url: Qnzs.path + "/imageManager/findImageByType",
            data: {
                'did': sitenavDid,
                'type': 1,
                'acticey': 1
            },
            dataType: "JSON",
            success: function(data) {
                var data = data.dataList;
                var autoPlay = data.length > 1 ? true : false; // 只有一张banner，不自动轮播
                var htmlbr = '';
                for(var i = 0; i < data.length; i++) {
                    temp = data[i];
                    htmlbr += '<li>';
                    htmlbr += '<a href="' + temp.url + '" target="_blank" class="disB">';
                    htmlbr += '<img src="' + Utils.compressByAli(temp.path, 300, 750) + '" />';
                    htmlbr += '</a>';
                    htmlbr += '</li>';
                }
                $('#head-banner ul').append(htmlbr);
                TouchSlide({
                    slideCell: "#banner", // 这里一定要是id
                    titCell: ".hd ul",
                    mainCell: ".bd ul",
                    autoPage: true,
                    autoPlay: autoPlay,
                    effect: "leftLoop",
                    delayTime: 300,
                    interTime: 3000
                });
            }
        })
    }
    getIndeber()

});