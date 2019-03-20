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


    var data = {
        module: 5, // 来源版块(1-找活动、2-找咨询、3-找帮助、4-重磅项目、5-线下服务)
        reportAgainstId: staId, // 站点ID
        reportType: undefined,// 举报分类(0-其他、1-欺诈、2-色情、3-诱导行为、4-不实信息、5-违法犯罪、6-骚扰、7-侵权(冒充他人、侵犯名誉等))
        reportReason: $('#content').val() // 举报理由/内容
    };

    var isClicked = false; // 是否点击按钮(true：已点击，false：未点击)
    // 点击 '确定' 按钮
    $('#submit_report').click(function () {
        if(isClicked) { // 如果'提交'按钮已点击，直接返回
            console.log('重复按钮');
            return;
        }
        console.log('进入按钮');
        isClicked = true; // 设置'确定'按钮 已点击
        $('#sureReportBtn a').css('opacity', 0.5); // 设置'确定'按钮透明

        data.reportType = $('#reportType').find('option:selected').val();
        data.reportReason = $('#content').val();
        console.log('submit_report data', data);
        if(!data.reportType) {
            isClicked = false; // 设置'确定'按钮 未点击
            $('#sureReportBtn a').css('opacity', 1); // 设置'确定'按钮不透明
            $.alert('请选择举报分类');
            return;
        }
        // 举报投诉
        YoungFamilyApi.report(data).then(function (data) {
            console.log('YoungFamilyApi.report data', data);
            $.alert('举报成功').then(function () {
                // 跳转到详情页码
                // window.location = 'detail.html?staId=' + staId;
                window.history.back();  //返回上一页
            })
        }).always(function () {
            // 接口错误，恢复按钮点击状态
            isClicked = false; // 设置'提交'按钮 未点击
            $('#sureReportBtn a').css('opacity', 1); // 设置'提交'按钮不透明
        });
    })
    
});