
$(document).ready(function(){
    $('.header_nav .nav_li').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    function rolling_list(){
        var item_num=4;
        var html=''
        for (var i = 0; i < item_num; i++) {
            html+='<li class="item">'
            html+=' <div class="item_con clearfix">'
            html+='  <span class="fl pic_box"><img src="resources/pcImages/pro02.png" class="pic" /></span>'
            html+='  <span class="fl user_name">希斯特利亚</span>'
            html+='  <p class="fl user_do">为汇青科技有限公司团队投了一票团队投了一票</p>'
            html+='  <em class="fl time">'+i+'秒前</em>'
            html+=' </div>'
            html+='</li>'
        };
        $('.rolling_list').append(html);
    }
    rolling_list();
    /*没添加item前*/
    var begin_len=$('.rolling_list .item').length;
    var begin_wid_1=0;
    $('.rolling_list .item').each(function(index, el) {
        begin_wid_1=begin_wid_1+$(el).width();
    });
    var begin_wid_2=begin_wid_1+20.5*begin_len;

    /*添加后*/
    $('.rolling_list').append($('.rolling_box .item:lt(4)').clone());
    var new_len=$('.rolling_list .item').length;
    var new_wid_1=0;
    $('.rolling_list .item').each(function(index, el) {
        new_wid_1=new_wid_1+$(el).width();
    });
    var new_wid_2=new_wid_1+20.5*new_len
    $('.rolling_list').css('width',new_wid_2);
    var num=0;
    function info_roll(){
        num++;
        if(num>begin_wid_2){
            num=0;
        }
        $('.rolling_list').css('margin-left', -num);
    }
    var timer=setInterval(info_roll, 10)
    $('.rolling_box').mouseenter(function(event) {
        clearInterval(timer)
    }).mouseleave(function(event) {
        timer=setInterval(info_roll, 10)
    });
    /*评选流程*/
    function process_list(){
        var num=5;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<li class="item">'
            html+=' <div class="item_con">'
            html+='  <div class="item_con_num">'
            html+='   <img src="resources/pcImages/zbxm4_pxlc_'+(i+1)+'.png" class="bg" />'
            html+='  </div>'
            html+='  <p class="process_text">在图书馆三号报告厅召开大赛启动仪式</p>'
            html+='  <p class="process_date">'
            html+='    <span class="fl">10/20 - 10/30</span><span class="fr year">2017</span>'
            html+='  </p>'
            html+=' </div>'
            html+='</li>'
        };
        $('.selection_process .content_b_list').append(html);
        $('.selection_process .item:last').css('margin-right', '0');
    }
    process_list();

    /*参赛者作品*/
   /*团队*/
   function work_list_team(){
    var num=8;
    var html=''
    for (var i = 0; i < num; i++) {
        html+='<li class="item fl">'
        html+=' <div class="item_con">'
        html+='  <div class="work_pic_box">'
        html+='   <img src="resources/pcImages/act02.png" class="work_pic" alt="" />'
        html+='  </div>'
        html+='  <div class="work_vote">'
        html+='   <p class="project_name txt">名称：超级环保项目</p>'
        html+='   <p class="applicant txt">申报人：华南理工大学</p>'
        html+='   <button class="vote_btn">'+i+'人投票</button>'
        html+='  </div>'
        html+=' </div>'
        html+='</li>'
    };
    $('.work_list.team').append(html)
   }
   work_list_team();
   /*个人*/
   function work_list_person(){
    var num=3;
    var html=''
    for (var i = 0; i < num; i++) {
        html+='<li class="item fl">'
        html+=' <div class="item_con">'
        html+='  <div class="work_pic_box">'
        html+='   <img src="resources/pcImages/act02.png" class="work_pic" alt="" />'
        html+='  </div>'
        html+='  <div class="work_vote">'
        html+='   <p class="project_name txt">名称：超级环保项目</p>'
        html+='   <p class="applicant txt">申报人：华南理工大学</p>'
        html+='   <button class="vote_btn">'+i+'人投票</button>'
        html+='  </div>'
        html+=' </div>'
        html+='</li>'
    };
    $('.work_list.person').append(html)
   }
   work_list_person();
   $('.participator_work .work_list.person').hide();
   $('.participator_work .select_title').click(function(event) {
       $(this).addClass('cur').siblings('.select_title').removeClass('cur');
       $('.participator_work .work_list').eq($(this).index()).show().siblings('.work_list').hide();
   });


   /*右侧悬浮导航*/
   $('.body_right_nav .item_con').mouseenter(function(event) {
       $(this).stop().animate({'width':'100px'}, 100);
   }).mouseleave(function(event) {
       if(!$(this).hasClass('cur')){
        $(this).stop().animate({'width':'80px'}, 100)
       }
   }).click(function(event) {
       $(this).addClass('cur').parent().siblings().children().removeClass('cur').animate({'width':'80px'}, 100);

   });
});