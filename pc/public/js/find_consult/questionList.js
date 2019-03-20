$(document).ready(function(){
  //问大家
  $('#oneAsk').click(function() {
    //用户未登录提问跳出登录弹窗
    Qnzs.getSessionAccount({}).then(function (data) {
      if(data.status == 'OK'){
        $('#quesCategory').html('');
        FindConsultApi.getServiceCategory(data).then(function (data) {

          var html = '';
          for (var i = 0; i < data.rows.length; i++) {
            html += '<option  value="' + data.rows[i].caId + '" >' + data.rows[i].name + '</option>'
          }
          $('#quesCategory').html(html);
        });
        // clearForm();
        $('.bg_black').show();
        $('.bg_black .list_tanchuang .name em').text("大家");
        $('.bg_black .list_tanchuang .list_tanchuang_b .content_r').hide();
        uploader.refresh();
      }
      else{
        $.alert('请先登录')
      }
    });
  });

  // 点击'问大家/问组织/问专家'
  $('.oneSection .ask').click(function () {
    var $ask = $(this);

    // 获取当前用户信息
    Qnzs.getSessionAccount({}).then(function (data) {
      if(data.status == 'ALERT') {
        $.alert(data.msg);
        return;
      }

      // 用户已登录
      account_common = data.account; // 账户信息
      // 角色
      if(account_common.orgType == 0 || account_common.orgType == 1 || account_common.orgType == 2) { // 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
        $.alert('组织不能提问哟，请切换到个人账号再来吧');
        return;
      }

      var name = $ask.data('name');
      if(!name) { // 获取不到name
        return;
      }

      if(name == 'everyone') { // 问大家
        $('#quesCategory').html('');
        FindConsultApi.getServiceCategory(data).then(function (data) {
          var html = '';
          for (var i = 0; i < data.rows.length; i++) {
            html += '<option  value="' + data.rows[i].caId + '" >' + data.rows[i].name + '</option>';
          }
          $('#quesCategory').html(html);
        });
        // clearForm();
        $('.bg_black').show();
        $('.bg_black .list_tanchuang .name em').text("大家");
        $('.bg_black .list_tanchuang .list_tanchuang_b .content_r').hide();
        uploader.refresh();
      }else if(name == 'organization') { // 问组织
        window.location.href = 'find_consult_wzz.html';
      }else { // 问专家
        window.location.href = 'find_consult_wzj.html';
      }


    });
  });

  $(".list_tanchuang .list_tanchuang_t .delete").click(function(){
    clearForm(); // 清空提问弹出框
    $(".bg_black").hide();
  });

  $(".tiwenBtn").click(function(){
    $(".bg_black").css("display","block");
    uploader.refresh();
  });


// 点击确定按钮--‘问大家’弹出框
  $('#submit_help').click(function () {
    var params = {
      title: $('#quesTitle').val(), // 标题 
      askContent: $('#editorContent').val(), // 内容
      categoryId: $('#quesCategory').val(), // 服务类别ID
      accExpertIdsStr: username_tiwen, // 组织ID(可不传，问组织必填，默认一个,问大家不传)accOrgIdsStr: $('#chakan').data('oid'),
      quesImagesStr: $('#imgUrl').text() // 图片(字符串)
    };
    if (!params.title) {
      $.alert('请输入标题');
      return;
    }
    if (!params.askContent) {
      $.alert('请输入问题描述');
      return;
    }


    // 提交增加
    FindConsultApi.add(params).then(function (data) {
      $(".bg_black .delete").click(); // 手动关闭求助申请对话框
      $.alert(data.msg).then(function () {
        window.location.reload(); // 刷新页面
      });
    })
  });
});

// 清空提问弹出框
function clearForm(){
  $("#exp_title").text("");
  $("#exp_realName").text("");
  $("#exp_photoUrl").attr("src","");
  $("#exp_profession").text("");
  $("#exp_replyCount").text("");
  $("#exp_attentionCount").text("");
  $("#exp_aid").val("");
  $("#quesAccExpert").val("");
  $("#exp_aid").attr("href","");

  //form表单清空
  $("#quesCategory").val("");
  $("#quesTitle").val("");
  $("#quesContent").val("");
  //$("div.u-item").remove();
  $("#editorContent").val("");

}

// 向专家提问
var username_tiwen ='';
function askExpertUI(username){
  Qnzs.getSessionAccount({}).then(function (data) {

    if(data.status == 'OK') {
      $("#quesCategory").html('')
      //var username = Utils.getQueryString('username');
      FindConsultApi.getServiceCategory(data).then(function (data) {//类别列表

        var html = '';
        for (var i = 0; i < data.rows.length; i++) {
          html += '<option  value="' + data.rows[i].caId + '" >' + data.rows[i].name + '</option>'
        }
        $('#quesCategory').html(html);
      });
      // clearForm();

      FindConsultApi.findAccountById({username: username}).then(function (data) {

        username_tiwen =data.rows.username;
        $("#exp_title").text(data.rows.orgName);//标题
        $("#exp_realName").text(data.rows.orgName);//专家名字
        $("#exp_profession").text(data.rows.expProfession);//专业特长
        var photo = data.rows.photoUrl?data.rows.photoUrl:'../../public/img/noimg.png';
        $("#exp_photoUrl").attr("src", photo);//头像
        $("#exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
        $("#exp_attentionCount").text(data.rows.questionAttentionCount);//关注

      });

      $(".bg_black").css("display", "block");
      $('.bg_black .list_tanchuang .list_tanchuang_b .content_r').show();
      // 点击 '查看' 按钮(求助弹出框)
      $('#chakan').click(function () {
        // var username = $(this).data('username');
        window.location.href = 'find_consult_wzj_detail.html?username=' + username; // 跳转到专家详情页面
      });
    }else
    {
      $.alert('请先登录')
    }

  })
}

var oid_tiwen='';
//问组织提问
function askAccPblicUI(oid){
  Qnzs.getSessionAccount({}).then(function (data) {
    if(data.status != 'OK') {
      $.alert(data.msg);
      return;
    }


    $("#quesCategory").html('');
    FindConsultApi.getServiceCategory(data).then(function (data) {//类别列表
      var html = '';
      for (var i = 0; i < data.rows.length; i++) {
        html += '<option  value="' + data.rows[i].caId + '" >' + data.rows[i].name + '</option>';
      }
      $('#quesCategory').html(html);
    });

    FindConsultApi.findOrganizationById({oid: oid}).then(function (data) {
      console.log(data);
      oid_tiwen =data.rows.oid;
      $("#exp_title").text(data.rows.name);//标题
      $("#exp_realName").text(data.rows.name);//组织名字
      $("#exp_profession").text(data.rows.expProfession);//专业特长
      var photo_org = data.rows.photoUrl?data.rows.photoUrl:'../../public/img/noimg.png';
      $("#exp_photoUrl").attr("src", photo_org);//头像
      $("#exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
      $("#exp_attentionCount").text(data.rows.attentionCount);//关注
      $('#chakan').data('oid', oid);
    });

    $(".bg_black").css("display", "block");
    $('.bg_black .list_tanchuang .list_tanchuang_b .content_r').show();
    // 点击 '查看' 按钮(求助弹出框)
    $('#chakan').click(function () {
      window.location.href = '../organization/organization_detail.html?oid=' + oid; // 跳转到组织详情页面
    });
  })
}



//像组织提问
$('#ask_org_tiwen_btn').click(function () {


  var params = {
    title: $('#quesTitle').val(), // 标题 
    askContent: $('#editorContent').val(), // 内容
    categoryId: $('#quesCategory').val(), // 服务类别ID
    accOrgIdsStr: oid_tiwen, // 组织ID(可不传，问组织必填，默认一个,问大家不传)accOrgIdsStr: $('#chakan').data('oid'),
    quesImagesStr: $('#imgUrl').text() // 图片(字符串)
  };
  // if (!params.accOrgIdsStr) {
  // 	$.alert('组织参数不能为空');
  // 	return;
  // }
  if (!params.title) {
    $.alert('请输入标题');
    return;
  }
  if (!params.askContent) {
    $.alert('请输入问题描述');
    return;
  }


  // 提交增加
  FindConsultApi.add(params).then(function (data) {
    $(".bg_black .delete").click(); // 手动关闭求助申请对话框
    $.alert(data.msg).then(function () {
      window.location.reload(); // 刷新页面
    });
  })
});
