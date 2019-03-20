
$(document).ready(function(){
    // function topic_type(){
    //     for (var i = 0; i < 5; i++) {
    //         $('.askQuestionUL').append('<li>情感</li>')
    //     };
    //     if($('.askQuestionUL li').length>9){
    //         $('.askQuestionUL').addClass('liGt10');
    //     }
    // }
    // topic_type();
    //wo



    function getServiceCategory(){//类型列表
        sendAjax();
        function sendAjax(data){

            FindConsultApi.getServiceCategory(data).then(function (data) {
                createEle(data);
                //console.log('专家11',data);
            })
        }
        //createEle();
        function createEle(data){
            var num=3;
            var html='';
            for (var i = 0; i < data.rows.length; i++) {
                // html+='<li onclick="chooseClose(this)" lang="'+data.rows[i].caId+'">'+data.rows[i].name+'</li>'
                html += '<option  value="' + data.rows[i].caId + '" >' + data.rows[i].name + '</option>'
            };
            $('#quesCategory').append(html);
        }
    }
    getServiceCategory()
//    wo
//服务类别
//     FindConsultApi.getServiceCategory(data).then(function (data) {//类别列表
//
//         var html = '';
//         for (var i = 0; i < data.rows.length; i++) {
//             html += '<option  value="' + data.rows[i].caId + '" >' + data.rows[i].name + '</option>'
//         }
//         ;
//         $('#askQuestionUL').append(html);
//     })
    //服务类别END
    // $('.askQchooseOL').click(function(){
    //     $('.darkBg,.askQuestionBottom').fadeIn(150);
    // })
    // $('.askQuestionUL li').click(function(){
    //     $('#quesCategory').text($(this).text());
    //     $('.darkBg,.askQuestionBottom').fadeOut(150);
    // })

    // $('.askQchooseOL').click(function(){
    //     $('body').css('overflow','hidden');
    //     $('.darkBg,.askQuestionBottom').fadeIn();
    // })

//提交
    $('#submitQuestion').click(function () {
        console.log('submit_help');
        // var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
        var params = {
            categoryId: $('#quesCategory').val(), // 求助人
            title: $('#quesTitle').val(), // 标题 
            // askContent: $('#editor').val(), // 内容
            askContent: $('#quesContent').val(),
            isCelebrity: 1, // 名人问吧帖子 
            quesImagesStr: $('#imgUrl').text() // 图片(字符串)
        };
        console.log('params', params);
        if (!params.title) {
            $.alert('请输入标题');
            return;
        }
        console.log('params.title.length', params.title.length);
        if (!params.askContent) {
            $.alert('请输入内容');
            return;
        }

        // 提交提问
        FindConsultApi.add(params).then(function (data) {
            console.log('FindHelpApi.addHelp data', data);
            $(".bg_black .delete").click(); // 手动关闭求助申请对话框
            $.alert(data.msg).then(function () {
                window.location.reload(); // 刷新页面
            });
        })
    });
});//文档准备结束

// function chooseClose(li){
//     $('body').css('overflow','visible');
//     $('.darkBg,.askQuestionUL').fadeOut();
//     $('#quesCategory').text($(li).text());
//     $('#quesCategory').val($(li).attr('lang'));
//     changeText($(li).text().trim()+'');
// }
// $(function(){
//     var liLen = $('.askQuestionBottom ul li').length;
//
//     if(liLen>10){
//         $('.askQuestionBottom ul').addClass('liGt10');
//     }else{
//         $('.askQuestionBottom ul').removeClass('liGt10');
//     }
//
// })