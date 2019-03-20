
$(document).ready(function(){
	
	
	
	
	
	
	
	
	
	

    /*星级显示评分*/
    for (var i = 0; i < 5; i++) {
        $('.scoreBox .score_ol').append('<li class="gray_star"><span class="cur_star"></span></li>')
    };
    $('.scoreBox').each(function(index, el) {
        var num = $(el).find('.score_num').text();
        var numZ =Math.floor(num);
        var numX = ((num-numZ).toFixed(1));
        $(el).find('.gray_star:gt('+numZ+')').children('.cur_star').hide();
        $(el).find('.gray_star').eq(numZ).children('.cur_star').css('width',numX*100+'%');
    });

    /* 找活动——推荐活动(包括首页找活动展示)*/
   function act_1(){
        var num=5;
        var html=''
        for (var i = 0; i < num; i++) {
            html+='<a href="hd_xiangqing.html" class="disB">'
            html+=' <div class="zhaohd_box_in clearfix">'
            html+='  <span class="zhaohd_box_l fl">'
            html+='   <img src="images/huodong_1.png" alt="" class="hd_pic" />'
            html+='   <img src="images/baoming.png" alt="" class="hd_leixing" />'
            html+='  </span>'
            html+='  <div class="zhaohd_box_r">'
            html+='   <h3 class="hd_zhuti">#慈善羊城 志愿一夏#广州南站</h3>'
            html+='   <p class="hd_style">培训</p>'
            html+='   <p class="hd_time color999">2016.03.06--2016.05.13</p>'
            html+='   <p class="hd_adress color999">'
            html+='    <span class="fl hd_adress_l">成府路35号华清嘉园7号楼1楼</span>'
            /*html+='    <span class="fr">&lt;500m</span>'*/
            html+='   </p>'
            html+='  </div>'
            html+=' </div>'
            html+='</a>'
        };
        $('.recommend_hd_box').append(html);
   }
   act_1();

    /*找帮助、以及主页找帮助展示板块*/
    // $('.case .title_item').click(function(event) {
    //     $(this).addClass('cur').siblings().removeClass('cur');
    //     var thisIdx = $(this).index();
    //     $('.case .content').eq(thisIdx).show().siblings('.content').hide();
    // });
    //
    // function case_list_1(){
    //     var num=3;
    //     var html=''
    //     for (var i = 0; i < num; i++) {
    //         html+='<a href="bz_bangzhuxiangqing.html" class="item clearfix disB">'
    //         html+=' <div class="left fl">'
    //         html+='  <img src="../../public/img/huodong_4.png"/>'
    //         html+=' </div>'
    //         html+=' <div class="right">'
    //         html+='  <h3 class="color000 fz30">队长是我别开枪</h3>'
    //         html+='  <p class="fz26 color666">医疗救助</p>'
    //         html+='  <div class="botTxt clearfix">'
    //         html+='   <span class="color999 fz24 fl">2016/08/10</span>'
    //         html+='   <em class="fz24 fr">求助中</em>'
    //         html+='  </div>'
    //         html+=' </div>'
    //         html+='</a>'
    //     };
    //     $('.case .content').eq(0).append(html);
    // }
    // case_list_1();
    //
    // function case_list_2(){
    //     var num=2;
    //     var html=''
    //     for (var i = 0; i < num; i++) {
    //         html+='<a href="bz_bangzhuxiangqing.html" class="item clearfix disB">'
    //         html+=' <div class="left fl">'
    //         html+='  <img src="../../public/img/huodong_2.png"/>'
    //         html+=' </div>'
    //         html+=' <div class="right">'
    //         html+='  <h3 class="color000 fz30">队长是我别开枪</h3>'
    //         html+='  <p class="fz26 color666">医疗救助</p>'
    //         html+='  <div class="botTxt clearfix">'
    //         html+='   <span class="color999 fz24 fl">2016/08/10</span>'
    //         html+='   <em class="fz24 fr">已解决</em>'
    //         html+='  </div>'
    //         html+=' </div>'
    //         html+='</a>'
    //     };
    //     $('.case .content').eq(1).append(html);
    // }
    // case_list_2();

    /*星级评分-点击星星进行评分*/
    $('.mark_box .start_list .item').click(function(event) {
        var thisIdx=$(this).index();
        $('.mark_box .start_list .item:lt('+(thisIdx+1)+')').addClass('cur');
        $('.mark_box .start_list .item:gt('+thisIdx+')').removeClass('cur')
    });
    
  
    
});