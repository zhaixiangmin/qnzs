
$(document).ready(function(){
    $('.page_head .nav_li:last').css('margin-right', '0');
    $('.page_head .nav_li').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
    });
    /*项目动态*/
    function body_r_list(){
        var num=4;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<li class="item">'
            html+=' <a href="javascript:;" class="item_con">'
            html+='  <span class="fl item_con_l">由腾讯开放平台发起的“应用创新大赛”。</span>'
            html+='  <span class="fr item_con_r">2012-09-09</span>'
            html+=' </a>'
            html+='</li>'
        };
        $('.project_dynamic .body_r_list').append(html);
    }
    body_r_list();
    /*报名要求*/
    $('.sign_up_requirement .item').each(function(index, el) {
        $(el).css('background-image', 'url(../../public/img/require_'+(index+1)+'.png)');
    });

    /*评选流程*/
    $('.selection_process .process_list .item').eq(0).css('width', '264px');
    $('.selection_process .process_list .item').eq(1).css('width', '279px');
    $('.selection_process .process_list .item').eq(2).css('width', '278px');
    $('.selection_process .process_list .item').eq(3).css('width', '288px');
    $('.selection_process .process_list .item:last').css('margin-right', '0');
    $('.selection_process .process_list .item').each(function(index, el) {
        var txtHei=$(el).find('.process_text').height();
        var line=txtHei/24;
        if(line>=2){
            $(el).find('.process_text').css('text-align', 'left');
        }
    });

    /*参赛团队*/
    function team_list(){
        var num=5;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<li class="item fl">'
            html+=' <div class="item_con">'
            html+='  <div class="pic_box"><img src="../../public/img/66.png" class="pic" /></div>'
            html+='  <div class="item_con_down">'
            html+='   <div class="fl con_down_l">'
            html+='    <p class="txt_1 txt">中国华西企业有限公司</p>'
            html+='    <p class="txt_2 txt">申报人：陈浩</p>'
            html+='   </div>'
            html+='   <div class="fr con_down_r">'
            html+='    <span class="vote_num">200人投票</span>'
            html+='   </div>'
            html+='  </div>'
            html+=' </div>'
            html+='</li>'
        };
        $('.competition_team .team_list').eq(0).append(html);
        $('.competition_team .team_list:eq(0) .item:eq(1)').find('.vote_num').addClass('end').text('200人投票(结束)')
    }
    team_list();

    function team_list_person(){
        var num=3;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<li class="item fl">'
            html+=' <div class="item_con">'
            html+='  <div class="pic_box"><img src="../../public/img/66.png" class="pic" /></div>'
            html+='  <div class="item_con_down">'
            html+='   <div class="fl con_down_l">'
            html+='    <p class="txt_1 txt">中国华西企业有限公司</p>'
            html+='    <p class="txt_2 txt">申报人：陈浩</p>'
            html+='   </div>'
            html+='   <div class="fr con_down_r">'
            html+='    <span class="vote_num">200人投票</span>'
            html+='   </div>'
            html+='  </div>'
            html+=' </div>'
            html+='</li>'
        };
        $('.competition_team .team_list').eq(1).append(html);
        $('.competition_team .team_list:eq(1) .item:eq(2)').find('.vote_num').addClass('end').text('200人投票(结束)')
    }
    team_list_person();
    $('.competition_team .team_list').eq(1).hide();

    $('.competition_team .select_title').click(function(event) {
        $(this).addClass('cur').siblings('.select_title').removeClass('cur');
        $('.competition_team .team_list').eq($(this).index()).show().siblings().hide();
    });

    /*右侧悬浮导航*/
    $('.body_r_nav .item:not(:last)').click(function(event) {
        $(this).addClass('mb20').siblings().removeClass('mb20');
    });
    $('.body_r_nav .item').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
    });
});