
$(document).ready(function(){

    /*获取文档当前宽度*/
    var docWid=$(document).width();
    /*$('html').width(docWid);*/
    

    $('.navigation .rightNav li').click(function(event) {
        $(this).children().addClass('conBgc02').parent().siblings().children().removeClass('conBgc02');
    });

     /* --------------------- banner --------------------- */

    $('.banBox').mouseenter(function(event) {
        $('a.change').fadeIn(200);
    }).mouseleave(function(event) {
        $('a.change').fadeOut(200);
    });
 
    $('.act_and_host').each(function(index, el) {
        $(el).find('.rightHost .itemBox ul>li:last').removeClass('borderB01').css('padding-bottom','15px');
    });

/*------------------------------------------------*/

    $('.ask_and_answer .list').each(function(index, el) {
        $(el).find('.itemBox:last').children('.itemCon').removeClass('borderB01');
    });

    /*问答切换*/
    $('.ask_and_answer .askTit h3').click(function(event) {
        $(this).addClass('color2185cf').siblings('h3').removeClass('color2185cf');
        var thisNum = $(this).index()+1;
        $('.ask_and_answer .list0'+thisNum).show().siblings('.list').hide();
    });

    /*点击关注按钮*/
    $('.act_and_host .rightHost .itemBox ul li .guanzhuBtn').click(function(){
        $(this).hide().siblings('.guanzhuBtn').show();
        var guanzhuNum=$(this).parents('.list_li').find('.guanzhuNum').html();
        /*if($(this).parent().children('.guanzhu:first').show()){
            guanzhuNum--;
            $(this).parents('.list_li').find('.guanzhuNum').html(guanzhuNum);
        }
        if($(this).parent().children('.guanzhu:last').show()){
            guanzhuNum++;
            $(this).parents('.list_li').find('.guanzhuNum').html(guanzhuNum);
        }*/
    })
    
/*--------------求助 --  licong 2017-06-23 09:48-----------------------*/
    $('.askForHelp .list').each(function(index, el) {
        $(el).find('.itemBox:last').children('.itemCon').removeClass('borderB01');
    });
    $('.askForHelp .tit h3').click(function(event) {
        $(this).addClass('color2185cf').siblings('h3').removeClass('color2185cf');
        var thisNum = $(this).index();
        $('.askForHelp .list').eq(thisNum).show().siblings('.list').hide();
    });


    /*找咨询 ---类型、状态选项*/
    $('.contentBigBox .leftBox .option,.zhuanjia .listBox .option').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    /*找咨询————问专家———弹窗出现 & 找咨询————问大家———弹窗出现 & 报名-弹窗*/
    $('.contentBigBox .rightBox .oneAsk, .tiwenBtn, .yuyueBtn,.btn_box .sign_up').click(function(event) {
        $('.bg_black').show();
        $('body').addClass('overflow_h');
    });

    $(".bg_black .delete").click(function(){
        $(".bg_black").hide();
        $('body').removeClass('overflow_h');
    })



    /*找咨询————问专家———弹窗——上传图片*/

    $('.district_select span').click(function(event) {
        $(this).siblings().toggle();
    });
    $('.district_select ol li').click(function(event) {
        var olliTxt = $(this).text();
        $(this).parent().hide().siblings().text(olliTxt);
    });
    $('.district_select').mouseleave(function(event) {
        $(this).children('ol').css('display', 'none');
    });

    $(document).on('focus','.imgdiv input',function(){
        $(this).addClass('bgClear');
    })
    $(document).on('blur','.imgdiv input',function(){
        if($(this).val()==''){
            $(this).removeClass('bgClear');
        }else{
            $(this).addClass('bgClear');
        }
    })


    /*星星百分比显示评分*/
   $('.scoreBox').each(function(index, el) {
        var num = $(el).find('.fenshu em').text();
        var numZ =Math.floor(num);
        var numX = ((num-numZ).toFixed(1));
        $(el).find('li:gt('+numZ+')').children('span').hide();
        $(el).find('li').eq(numZ).children('span').css('width',numX*100+'%');
    });
   /*星星百分比显示评分  end*/


    $('.pageNumBox .pageNum a').click(function(event) {
        $(this).addClass('cur').siblings('a').removeClass('cur');
    });

    /*发现线下--预约服务弹窗*/
    $('.serviceBottomBtns .apply').click(function(){
        var questionTitle=$('.questionTitle').val();
        if($.trim(questionTitle)==''){
            $.alert('请输入服务标题');
            $('.questionTitle').focus();
        }else{
            var serviceDescribe=$('.serviceDescribe').val();
            if($.trim(serviceDescribe)==''){
                $.alert('请输入服务描述')
                $('.serviceDescribe').focus();
            }else{
                $('.bg_black').hide();
                $.alert('申请已发送，待审核');
                $('.questionTitle,.serviceDescribe').val('')
            }
        }
    })
    /*发现线下-站点详情-举报弹窗*/
    $('.report_popup .btn.ok').click(function(event) {
        var val=$('.report_popup option:selected').val();
        if(val=='0'){
            $.alert('请选择举报分类');
        }else{
            var txt=$('.report_popup .write_area').val();

            if($.trim(txt)==''){
                $.alert('请输入举报理由');
                $('.report_popup .write_area').focus();
            }else{
                $.alert('举报已提交，待审核')
                $('.report_popup').hide().find('.write_area').val('');
            }
        }
    });
    $('.serviceBottomBtns .cancel').click(function(event) {
        $('.bg_black').hide();
    });

    /*登录、注册弹窗*/
    $('.headTopBox #loginBtn').click(function(event) {
    	console.log(2);
        $('.login_regist_box').show();
        $('body').addClass('overflow_h');
    });

    $(".login_regist_box .close").click(function(){
        $(".login_regist_box").hide();
        $('body').removeClass('overflow_h');
    })

 
});

