/**
 * Created by licong on 2017/8/8.
 */
$(function () {
    var hpId = Utils.getQueryString('hpId'); // 帮助ID
    console.log('hpId', hpId);
    if(!hpId) {
        $.alert('帮助ID不能为空').then(function () {
            window.history.back();  //返回上一页
        });
    }

    $('.scoreBox ul li em').click(function(event) {
        var thisIex = $(this).parent().parent().index();
        var thisNum = thisIex+1;
        $('input[name="score"]').val(thisNum); // 星级评分
        $('.scoreBox ul li:lt('+thisNum+')').children().children().addClass('cur');
        $('.scoreBox ul li:gt('+thisIex+')').find('em').removeClass('cur');
    });

    // 点击 '立即发表'
    $('#submit_appreciation').click(function () {
        var params = {
            hpId: hpId, // 找帮助ID
            evaluate: $('#evaluate').val(), // 答谢内容
            score: $('input[name="score"]').val() // 星级评分
        };
        if(!params.evaluate) {
            $.alert('请输入答谢感言');
            return;
        }
        if(params.evaluate.length < 5) {
            $.alert('够5个字才能提交哦！');
            return;
        }
        if(!params.score) {
            $.alert('评星才能提交哦！');
            return;
        }

        // 帮助添加答谢感言
        FindHelpApi.helpEvaluateByInterface(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.history.back(); // 返回上一页面
            })
        });

    })
});