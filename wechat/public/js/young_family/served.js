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

    YoungFamilyApi.getApplicationByStationId({staId: staId}).then(function (data) {
        console.log('YoungFamilyApi.getApplicationByStationId data', data);
        var applications = data.dataList; // 已服务案例列表

        $('#servedNum').text(applications.length);
        var html = '';
        for(var i=0; i<applications.length; i++) {
            var application = applications[i];
            var imgUrl = application.applicantPhoto ? application.applicantPhoto : '../../public/img/default_avator.png';
            html += '<a href="javascript:;" class="item clearfix borderBot disB">';
            html += '    <div class="left fl">';
            html += '        <img src="' + imgUrl + '"/>';
            html += '    </div>';
            html += '    <div class="right">';
            html += '        <h2 class="color000 fz30">' + application.applicantName + '</h2>';
            html += '        <p class="color999 fz24">' + application.statusStr + '</p>';
            html += '        <p class="color999 fz24">服务描述：' + application.description + '</p>';
            html += '    </div>';
            html += '</a>';
        }

        $('#appList').html(html); // 渲染已服务案例列表
    })
    
});