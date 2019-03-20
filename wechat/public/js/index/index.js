$(function(){
	

    /*banner下方信息轮播*/
    var roll_num_2=5;
    function rollBox(){
        var html='';
        for (var i = 0; i < roll_num_2; i++) {
            html+='<a href="wode_xiangqing.html" class="roll_item">';
            html+=' <div class="fl headImg">';
            html+='  <img src="images/girl.png"/>';
            html+=' </div>';
            html+=' <div class="txt">';
            html+='  <h6 class="color333 fz28">哪一瞬间'+i+'</h6>';
            html+='  <p class="fz24 color999">ヾ零下１°C的心</p>';
            html+=' </div>';
            html+='</a>';
        }
        $('.rollOut').append(html);
        $('.rollOut').append($('.rollOut .roll_item:first').clone())
    }
    rollBox();

    var roll_num=0;    
    var roll_timer=null;
    function roll_auto(){
        roll_num++;
        if(roll_num>roll_num_2){
            roll_num=1;
            $('.rollBox .rollOut').css('top','0');
        }
        $('.rollBox .rollOut').stop().animate({top:-roll_num*1.3+'rem'}, 500);
    }
    roll_timer=setInterval(roll_auto, 3000);


   /*热门问答*/
    function hot_ask() {
        sendAjax();  //初始化列表

        function sendAjax(data) {
            FindConsultApi.getServiceList({page:0,rows:6,qType:1}).then(function (data) {
                createEle(data.rows);
                console.log('组织11', data);
            })
        }

        function createEle(data) {
            var html = '';

            for (var i = 0; i < data.length; i++) {
                var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
                html+='<a href="find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'">';
                html+='<div class="content_in clearfix">';
                html+=' <div class="l">';
                html+='  <div class="circle"><img src="'+data[i].photourl+'" class="pic"/></div>';
                html+=' </div>';
                html+=' <div class="r">';
                html+='  <div class="up">';
                html+='   <h3>' + data[i].title + '</h3>';
                html+='   <p>' + data[i].askContent + '</p>';
                html+='  </div>';
                html+='  <div class="down clearfix">';
                html+='   <div class="left clearfix fl">';
                html+='    <span class="span01 fl">' + data[i].realname + '</span>';
                html+='    <span class="span01 fl">' + data[i].categoryName + '</span>';
                html+='    <span class="span02 fl">' + datetime + '</span>';
                // html+='    <span class="fl">18:56</span>'
                html+='   </div>';
                html+='   <div class="right fz24 color666 fr"><em><img src="../../public/img/pinglun.png" /></em>' + data[i].commentsNum + '</div>';
                html+='  </div>';
                html+=' </div>';
                html+='</div>';
                html+='</a>';
            }
            $('.qs_content_1').append(html)
        }
    }
    hot_ask();

    /*精华问答*/
    function best_ask() {
        sendAjax();  //初始化列表

        //console.log('qType', qType);
        function sendAjax(data) {
            //var qType = $("#qType .cur").attr("lang");
            //var data={page:0,rows:3,qType:qType};

            FindConsultApi.getServiceList({page:0,rows:6,qType:2}).then(function (data) {
                createEle(data.rows);
                console.log('组织11', data);
            })
        }

        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
                html+='<a href="find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'">';
                html+='<div class="content_in clearfix">';
                html+=' <div class="l">';
                html+='  <div class="circle"><img src="'+data[i].photourl+'" class="pic"/></div>';
                html+=' </div>';
                html+=' <div class="r">';
                html+='  <div class="up">';
                html+='   <h3>' + data[i].title + '</h3>';
                html+='   <p>' + data[i].askContent + '</p>';
                html+='  </div>';
                html+='  <div class="down clearfix">';
                html+='   <div class="left clearfix fl">';
                html+='    <span class="span01 fl">' + data[i].realname + '</span>';
                html+='    <span class="span01 fl">' + data[i].categoryName + '</span>';
                html+='    <span class="span02 fl">' + datetime + '</span>';
                // html+='    <span class="fl">18:56</span>'
                html+='   </div>';
                html+='   <div class="right fz24 color666 fr"><em><img src="../../public/img/pinglun.png" /></em>' + data[i].commentsNum + '</div>';
                html+='  </div>';
                html+=' </div>';
                html+='</div>';
                html+='</a>';
            }
            $('.qs_content_2').append(html)
        }
    }

    best_ask();
    /*精华问答END*/

   /*本地问答*/
    function local_ask() {
        sendAjax();  //初始化列表

        function sendAjax(data) {
            FindConsultApi.getServiceList({page:0,rows:6,qType:3}).then(function (data) {
                createEle(data.rows);
                console.log('组织11', data);
            })
        }

        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
                html+='<a href="find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'">';
                html+='<div class="content_in clearfix">';
                html+=' <div class="l">';
                html+='  <div class="circle"><img src="'+data[i].photourl+'" class="pic"/></div>';
                html+=' </div>';
                html+=' <div class="r">';
                html+='  <div class="up">';
                html+='   <h3>' + data[i].title + '</h3>';
                html+='   <p>' + data[i].askContent + '</p>';
                html+='  </div>';
                html+='  <div class="down clearfix">';
                html+='   <div class="left clearfix fl">';
                html+='    <span class="span01 fl">' + data[i].realname + '</span>';
                html+='    <span class="span01 fl">' + data[i].categoryName + '</span>';
                html+='    <span class="span02 fl">' + datetime + '</span>';
                // html+='    <span class="fl">18:56</span>'
                html+='   </div>';
                html+='   <div class="right fz24 color666 fr"><em><img src="../../public/img/pinglun.png" /></em>' + data[i].commentsNum + '</div>';
                html+='  </div>';
                html+=' </div>';
                html+='</div>';
                html+='</a>';
            }
            $('.qs_content_3').append(html)
        }
    }

    local_ask();
    /*本地问答END*/

   $('.qs_content:not(:first)').hide();
    $('.question .qs_box .title_item').click(function(event) {
        $(this).addClass('current').siblings('.title_item').removeClass('current');

        var idx = $(this).index();
        $('.question .qs_content').eq(idx).show().siblings('.qs_content').hide();
    });


    // 点击 '>'，跳转到列表页(找咨询)
    $('#arrow_icon_find_consult').click(function () {
        var qType = $('.question .qs_box .title_item.current').data('id');
        console.log('qType', qType);
        window.location.href = 'view/find_consult/find_consult_quesList.html?qType=' + qType; // 跳转到找咨询列表页
    });
    

});
