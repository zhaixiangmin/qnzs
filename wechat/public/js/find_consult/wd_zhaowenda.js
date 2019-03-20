
$(document).ready(function(){
    /*问答分类导航*/
    function ask_type_menu(){
        var type=['情感','职场','创业','公益']
        var html=''
        for (var i = 0; i < 4; i++) {
            html+='<li class="item">'
            html+=' <a href="wd_wenda.html" class="color000">'
            html+='  <img src="images/zhaowendaMenu0'+(i+1)+'.png" />'
            html+='  <h6>'+type[i]+'</h6>'
            html+=' </a>'
            html+='</li>'
        };
        $('.menu_list .item:last').before(html);
    }
    ask_type_menu();
    /*热门专家*/
    // function hot_professor(){
    //     var html=''
    //     for (var i = 0; i < 3; i++) {
    //         html+='<li class="fl">'
    //         html+=' <a href="wd_zhuanjiaxiangqing.html">'
    //         html+='  <div class="imgDiv">'
    //         html+='   <img src="images/pro01.png"/>'
    //         html+='  </div>'
    //         html+='  <h2 class="color000">张三</h2>'
    //         html+='  <h6 class="color999">大学教授</h6>'
    //         html+='  <p class="color999">情感关系、亲子交流</p>'
    //         html+=' </a>'
    //         html+='</li>'
    //     };
    //     $('.professor_list').append(html);
    // }
    // hot_professor();
    /*热门问答*/
    // function hot_ask(){
    //     var num=3;
    //     var html=''
    //     for (var i = 0; i < num; i++) {
    //         html+='<div class="content_in clearfix">'
    //         html+=' <div class="l">'
    //         html+='  <div class="circle"><img src="images/ask_1.png" class="pic"/></div>'
    //         html+=' </div>'
    //         html+=' <div class="r">'
    //         html+='  <div class="up">'
    //         html+='   <h3>哪一瞬间你觉得自己的努力白费了？</h3>'
    //         html+='   <p>帮爱奇艺做热播网剧的厦大校园行活动。 </p>'
    //         html+='  </div>'
    //         html+='  <div class="down clearfix">'
    //         html+='   <div class="left clearfix fl">'
    //         html+='    <span class="span01 fl">情感婚恋</span>'
    //         html+='    <span class="span02 fl">2016/02/03</span>'
    //         html+='    <span class="fl">18:56</span>'
    //         html+='   </div>'
    //         html+='   <div class="right fz24 color666 fr">125</div>'
    //         html+='  </div>'
    //         html+=' </div>'
    //         html+='</div>'
    //     };
    //     $('.wenda .hot_ask').append(html)
    // }
    // hot_ask();
    /*精华问答*/
    function best_ask(){
        var num=2;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<div class="content_in clearfix">'
            html+=' <div class="l">'
            html+='  <div class="circle"><img src="images/ask_2.png" class="pic"/></div>'
            html+=' </div>'
            html+=' <div class="r">'
            html+='  <div class="up">'
            html+='   <h3>哪一瞬间你觉得自己的努力白费了？</h3>'
            html+='   <p>帮爱奇艺做热播网剧的厦大校园行活动。 </p>'
            html+='  </div>'
            html+='  <div class="down clearfix">'
            html+='   <div class="left clearfix fl">'
            html+='    <span class="span01 fl">情感婚恋</span>'
            html+='    <span class="span02 fl">2016/02/03</span>'
            html+='    <span class="fl">18:56</span>'
            html+='   </div>'
            html+='   <div class="right fz24 color666 fr">125</div>'
            html+='  </div>'
            html+=' </div>'
            html+='</div>'
        };
        $('.wenda .best_ask').append(html)
    }
    best_ask();
    /*本地问答*/
    function local_ask(){
        var num=2;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<div class="content_in clearfix">'
            html+=' <div class="l">'
            html+='  <div class="circle"><img src="images/ask_3.png" class="pic"/></div>'
            html+=' </div>'
            html+=' <div class="r">'
            html+='  <div class="up">'
            html+='   <h3>哪一瞬间你觉得自己的努力白费了？</h3>'
            html+='   <p>帮爱奇艺做热播网剧的厦大校园行活动。 </p>'
            html+='  </div>'
            html+='  <div class="down clearfix">'
            html+='   <div class="left clearfix fl">'
            html+='    <span class="span01 fl">情感婚恋</span>'
            html+='    <span class="span02 fl">2016/02/03</span>'
            html+='    <span class="fl">18:56</span>'
            html+='   </div>'
            html+='   <div class="right fz24 color666 fr">125</div>'
            html+='  </div>'
            html+='  <div class="wd_location color999 fz24">广州</div>'
            html+=' </div>'
            html+='</div>'
        };
        $('.wenda .local_ask').append(html)
    }
    local_ask();

    /*搜索*/
    $('.searchBox .search_input').click(function(event) {
        $(this).css('width','77%').siblings('.sure_search').show();
        $('.recentHotSearch').removeClass('none');
        $('.main_container').hide();
    });

    $('.wenda .content:not(:first)').hide();
    // $('.wenda .title_item').click(function(event) {
    //     $(this).addClass('cur').siblings().removeClass('cur');
    //     $('.wenda .content').eq($(this).index()).show().siblings('.content').hide();
    // });
});