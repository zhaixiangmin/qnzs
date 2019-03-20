/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    var staId = Utils.getQueryString('staId'); // 站点ID
    console.log('staId', staId);
    if(!staId) {
        $.alert('站点ID不能为空').then(function () {
            window.location.href = 'young_family.html';
        });
    }
    
    var statusName = {
        '1': '活动预告',
        '2': '报名中',
        '3': '已满员',
        '4': '报名结束',
        '5': '活动进行中',
        '6': '活动结束'
    };

    YoungFamilyApi.getStationPublishedActivity({staId: staId}).then(function (data) {
        console.log('YoungFamilyApi.getStationPublishedActivity data', data);
        var activities = data.rows; // TA的活动列表

        $('#activityNum').text(activities.length);
        var html = '';
        for(var i=0; i<activities.length; i++) {
            var activity = activities[i];
            var imgUrl = activity.imageUrl ? activity.imageUrl : '../../public/img/default_avator.png';
            // 点击跳到找活动主页
            html += '<a href="../find_active/hd_xiangqing.html?id=' + activity.id + '"  class="item clearfix borderBot disB">';
            html += '    <div class="left fl">';
            html += '        <img src="' + imgUrl + '"/>';
            html += '    </div>';
            html += '    <div class="right">';
            html += '        <h2 class="color000 fz30">' + activity.title + '</h2>';
            html += '        <p class="color999 fz24">类型：' + activity.type + '</p>';
            html += '        <p class="color999 fz24 color2185cf">' + statusName[activity.actStatus] + '</p>';
            html += '        <p class="color999 fz24">活动地点：' + activity.address + '</p>';
            html += '        <p class="color999 fz24">活动时间：' + activity.activityTime + '</p>';
            html += '    </div>';
            html += '</a>';
        }

        $('#activityList').html(html); // 渲染TA的活动列表
    })
    
});