/**
 * Created by Administrator on 2017/7/25.
 */
$(function () {
   console.log('comment');
    var id = Utils.getQueryString('id'); // 搜索关键字
    if (!id) {
        $.alert('找帮助ID不能为空').then(function () {
            window.history.back(); // 返回上一页
        });
    }
    console.log('id', id);

    // 点击 '提交' 按钮
    $('#submit_comment').click(function () {
        var params = {
            id: id, // 找帮助ID
            content: $('#help_content').val() //  评论内容
        };

        if(!params.content) {
            $.alert('评论内容不能为空');
            return;
        }

        // 添加评论
        FindHelpApi.addPost(params).then(function (data) {
           $.alert(data.msg).then(function () {
               window.history.back(); // 返回上一页
           })
        });
    });
});