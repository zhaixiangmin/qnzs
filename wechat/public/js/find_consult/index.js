$(function(){



    var roll_num_2=5;
    function rollBox(){
        sendAjax();  //��ʼ���б�

        function sendAjax(data) {
            FindConsultApi.getServiceList({page:0,rows:6,}).then(function (data) {
                createEle(data.rows);
            })
        }

        function createEle(data) {
            var html='';
            for (var i = 0; i < roll_num_2; i++) {
                html+='<a href="view/find_consult/find_consult_question_detail.html?quId='+data[i].quId+'&username='+data[i].username+'" class="roll_item">';
                html+=' <div class="fl headImg">';
                html+='  <img src="'+ Utils.compressByAli(data[i].photourl, 60, 60) +'"/>';
                html+=' </div>';
                html+=' <div class="txt">';
                html+='  <h6 class="color333 fz28">' + data[i].title + '</h6>';
                html+='  <p class="fz24 color999">' + data[i].realname + '</p>';
                html+=' </div>';
                html+='</a>';
            };
            $('.rollOut').append(html);
            $('.rollOut').append($('.rollOut .roll_item:first').clone())
        }

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
//获取地区ID
    var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
    var sitenavOrgId
    if(district_qnzs) {
        district_qnzs = JSON.parse(district_qnzs);
        if(district_qnzs && district_qnzs.sitenavOrgId) {
            sitenavOrgId = district_qnzs.sitenavOrgId;
        }else {
            sitenavOrgId = 440000; // 默认广东省
        }
    }else {
        sitenavOrgId = 440000; // 默认广东省
    }
    console.log('sitenavOrgId',sitenavOrgId)
    // hot_ask();
    function hot_ask() {
        sendAjax();  //��ʼ���б�

        //console.log('qType', qType);
        function sendAjax(data) {
            //var qType = $("#qType .cur").attr("lang");
            //var data={page:0,rows:3,qType:qType};

            FindConsultApi.getServiceList({page:0,rows:6,qType:1,sitenavOrgId:sitenavOrgId}).then(function (data) {
                createEle(data.rows);
                console.log('��֯11', data);
            })
        }

        function createEle(data) {
            var html = '';
            //console.log('qType', data);
            //var num = 3;
            //var item = data[i]
            //var datetime = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
            for (var i = 0; i < data.length; i++) {
                //var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');


                html += ' <a href="view/find_consult/find_consult_question_detail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="disB">'
                html += '  <div class="qs_box_in clearfix">'
                html += '   <span class="qs_touxiang fl">'
                html += '    <img src="' + Utils.compressByAli(data[i].photourl, 120, 120) + '" alt="" class="tx_geren" />'
                html += '   </span>'
                html += '   <div class="qs_detail">'
                html += '    <div class="qs_word">'
                html += '     <div class="qs_word_in">'
                html += '      <h3>' + data[i].title + '</h3>'
                html += '      <div class="color000 askcont">' + data[i].askContent + '</div>'
                html += '     </div>'
                html += '    </div>'
                html += '    <p class="color999 qs_b">'
                html += '     <span class="fl qs_fenlei">' + data[i].realname + '</span>'
                html += '     <span class="fl">' + data[i].askTime + '</span>'
                html += '     <span class="fr">'
                html += '      <i class="qs_pinglun fl">'
                html += '       <img src="public/img/pinglun.png"alt="" />'
                html += '      </i>'
                html += '      <i class="fl">' + data[i].commentsNum + '</i>'
                html += '     </span>'
                html += '    </p>'
                html += '   </div>'
                html += '  </div>'
                html += ' </a>'
                html += '</div>'
            }
            $('.qs_content_2').append(html)
        }
    }

//  hot_ask()
    /*�����ʴ�END*/

    // best_ask();/*�����ʴ�*/
    function best_ask() {
        sendAjax();  //��ʼ���б�

        //console.log('qType', qType);
        function sendAjax(data) {
            //var qType = $("#qType .cur").attr("lang");
            //var data={page:0,rows:3,qType:qType};

            FindConsultApi.getServiceList({page:0,rows:6,qType:2,sitenavOrgId:sitenavOrgId}).then(function (data) {
                createEle(data.rows);
                console.log('��֯11', data);
            })
        }

        function createEle(data) {
            var html = '';
            //console.log('qType', data);
            //var num = 3;
            //var item = data[i]
            //var datetime = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
            for (var i = 0; i < data.length; i++) {
                //var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');

                html += '<div class="content_item">'
                html += ' <a href="view/find_consult/find_consult_question_detail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="disB">'
                html += '  <div class="qs_box_in clearfix">'
                html += '   <span class="qs_touxiang fl">'
                html += '    <img src="' + Utils.compressByAli(data[i].photourl, 120, 120) + '" alt="" class="tx_geren" />'
                html += '   </span>'
                html += '   <div class="qs_detail">'
                html += '    <div class="qs_word">'
                html += '     <div class="qs_word_in">'
                html += '      <h3>' + data[i].title + '</h3>'
                html += '      <div class="color000 askcont">' + data[i].askContent + '</div>'
                html += '     </div>'
                html += '    </div>'
                html += '    <p class="color999 qs_b">'
                html += '     <span class="fl qs_fenlei">' + data[i].realname + '</span>'
                html += '     <span class="fl">' + data[i].askTime + '</span>'
                html += '     <span class="fr">'
                html += '      <i class="qs_pinglun fl">'
                html += '       <img src="public/img/pinglun.png"alt="" />'
                html += '      </i>'
                html += '      <i class="fl">' + data[i].commentsNum + '</i>'
                html += '     </span>'
                html += '    </p>'
                html += '   </div>'
                html += '  </div>'
                html += ' </a>'
                html += '</div>'
            }
            $('.qs_content_3').append(html)
        }
    }


    function local_ask() {
        sendAjax();  //��ʼ���б�
        function sendAjax(data) {
            FindConsultApi.getServiceList({page:0,rows:6,qType:3,sitenavOrgId:sitenavOrgId}).then(function (data) {
                createEle(data.rows);
            })
        }

        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<div class="content_item">'
                html += ' <a href="view/find_consult/find_consult_question_detail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="disB">'
                html += '  <div class="qs_box_in clearfix">'
                html += '   <span class="qs_touxiang fl">'
                html += '    <img src="' + data[i].photourl + '" alt="" class="tx_geren" />'
                html += '   </span>'
                html += '   <div class="qs_detail">'
                html += '    <div class="qs_word">'
                html += '     <div class="qs_word_in">'
                html += '      <h3>' + data[i].title + '</h3>'
                html += '      <div class="color000 askcont">' + data[i].askContent + '</div>'
                html += '     </div>'
                html += '    </div>'
                html += '    <p class="color999 qs_b">'
                html += '     <span class="fl qs_fenlei">' + data[i].realname + '</span>'
                html += '     <span class="fl">' + data[i].askTime + '</span>'
                html += '     <span class="fr">'
                html += '      <i class="qs_pinglun fl">'
                html += '       <img src="public/img/pinglun.png"alt="" />'
                html += '      </i>'
                html += '      <i class="fl">' + data[i].commentsNum + '</i>'
                html += '     </span>'
                html += '    </p>'
                html += '   </div>'
                html += '  </div>'
                html += ' </a>'
                html += '</div>'
            }
            $('.qs_content_1').append(html)
        }
    }

    function mrwbList() {
        sendAjax();  //��ʼ���б�
        function sendAjax(data) {
            FindConsultApi.indexMrwbQuesList({page:0,rows:5}).then(function (data) {
                createEle(data.rows);
                console.log('��֯11', data);
            })
        }

        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<div class="content_item">'
                html += ' <a href="view/find_consult/find_consult_famousDetail.html?quId=' + data[i].quId +'" class="disB">'
                html += '  <div class="qs_box_in clearfix">'
                html += '  <div class="qs_touxiang_box fl">'
                html += '   <span class="qs_touxiang">'
                html += '    <img src="' + Utils.compressByAli(data[i].photourl, 120, 120) + '" alt="" class="tx_geren" />'
                html += '   </span>'
                if( data[i].accType == 3){
                    html +='<img class="v_icon" src="public/img/check_tercher.png"/>';
                }
                html += '  </div>'
                html += '   <div class="qs_detail">'
                html += '    <div class="">'
                html += '     <div class="qs_word_in">'
                html += '      <h3>' + data[i].title + '</h3>'
                html += '     </div>'
                html += '    </div>'
                html += '    <p class="qs_b">'
                html += '     <span class="fl">' + data[i].categoryName + '&nbsp;</span>'
                html += '     <span class="topicPeople fl qs_fenlei">'+data[i].realname+'</span>'
                html += '     <span class="fr qs_b_right color999">'
                html += '     <span class="fl join"><em>'+data[i].commentsNum+'</em>人参与</span>'
                html += '     <span class="fl">'
                html += '      <i class="qs_pinglun fl">'
                html += '       <img src="public/img/collectGood.png"alt="" />'
                html += '      </i>'
                html += '      <i class="fl">' + data[i].likesNum + '</i>'
                html += '     </span>'
                html += '     </span>'
                html += '    </p>'
                html += '   </div>'
                html += '  </div>'
                html += ' </a>'
                html += '</div>'
            }
            $('.recommend_mrwbList').append(html)
        }
    }
    mrwbList();

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
