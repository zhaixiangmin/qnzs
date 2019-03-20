$(document).ready(function(){
    var oid = Utils.getQueryString('oid');
    FindConsultApi.findOrganizationById({oid: oid}).then(function (data) {
        console.log('专家11',data);
        $("#telephone").text(data.rows.telephone);//电话
        $("#orgName").text(data.rows.name);//组织名称
        $("#exp_photoUrl").attr("src", Utils.compressByAli(data.rows.photoUrl, 160, 200));//头像
        $("#description").text(data.rows.description);//组织介绍
        $("#answerQuestionCount").text(data.rows.answerQuestionCount);//解决问题数
        $("#attentionCount").text(data.rows.attentionCount);//关注
        $("#nav_orgName").text(data.rows.name);//面包屑姓名
//向TA提问
        $("#exp_title").text(data.rows.name);//标题
        $("#tw_name").text(data.rows.name);//组织名称
        $("#tw_photoUrl").attr("src",data.rows.photoUrl);//头像
        $("#tw_answerQuestionCount").text(data.rows.answerQuestionCount);//解决问题数
        $("#tw_attentionCount").text(data.rows.attentionCount);//关注
    });

//初始化类别列表
    function work_list_team() {
        sendAjax();
        function sendAjax(data) {

            FindConsultApi.getServiceCategory(data).then(function (data) {
                createEle(data.rows);
                console.log('专家22',data);
            })
        }
        //createEle();
        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<option  value="' + data[i].caId + '" >' + data[i].name + '</option>'
            }
            $('#quesCategory').append(html);
        }
    }
    work_list_team()
    //初始化类别列表END

    //增加
    $('#submit_help').click(function () {


        $('#exp_photoUrl').data('id', oid);//获取当前页面ID值
        var id = $('#exp_photoUrl').data('id');
        console.log('回复获取id', id);
        //console.log('submit_help');
        // var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
        var params = {
            categoryId: $('#quesCategory').val(), // 话题分类
            title: $('#quesTitle').val(), // 标题 
            askContent: $('#askContent').val(), // 内容
            accOrgIdsStr: id, // 组织ID
            //askContent: filterXSS(editor.txt.html()),
            //accExpertIdsStr: username, // 专家ID 
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

        // if (!params.quesImagesStr) {
        // 	$.alert('请上传图片');
        // 	return;
        // }

        // 提交求助申请
        FindConsultApi.add(params).then(function (data) {

            $(".bg_black .delete").click(); // 手动关闭求助申请对话框
            $.alert(data.msg).then(function () {


                window.location.href = 'find_consult_organization_detail.html?oid='+id;
//				window.location.reload(); // 刷新页面
            });
        })
    });

});

