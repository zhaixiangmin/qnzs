/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    // 获取近期的搜索列表
    YoungFamilyApi.getRecentKeywordList({}).then(function (data) {
        console.log('YoungFamilyApi.getRecentKeywordList data', data);
        var keywordList = data.dataList;
        var html = '';
        for(var i=0; i<keywordList.length; i++) {
            var item = keywordList[i];
            if(!item.keyword.trim()) { // 空格、回车不显示
                continue;
            }
            html += '<div><a href="search_station.html?keyword=' + item.keyword + '" class="fz26">' + item.keyword + '</a></div>';
        }
        $('#lastest').html(html);
    });

    // 获取热搜列表
    YoungFamilyApi.getHotKeywordList({}).then(function (data) {
        console.log('YoungFamilyApi.getHotKeywordList data', data);
        var keywordList = data.dataList;
        var html = '';
        for(var i=0; i<keywordList.length; i++) {
            var item = keywordList[i];
            if(!item.keyword.trim()) { // 空格、回车不显示
                continue;
            }
            html += '<div><a href="search_station.html?keyword=' + item.keyword + '" class="fz26">' + item.keyword + '</a></div>';
        }
        $('#hot').html(html);
    });

    // 点击 '清除'
    $('#clear_search').click(function () {
        $('#searchText').val('');
    });
    
    // 点击 '搜索' 按钮
    $('#submit_aearch').click(function () {
        var keyword = $('#searchText').val();
        if(!keyword || !keyword.trim()) {
            return;
        }

        window.location = 'search_station.html?keyword=' + keyword; // 跳转到搜索站点结果页面
    })
    
});