
$(document).ready(function(){
    
     /****----我要报名 提示用户pc报名-----****/
    $('#suerBtn').click(function(){      
    	
    	$('#mailContent').val();
        $.alert($('#mailContent').val())
		  obj.ajax('/project/enroll/sendPcUrl',{'activityId':21,'activityTitle':'猪猪' ,'accEmail':$('#mailContent').val()},function(data){
		    	
		    	console.log(data);
		    	if(data.status=='OK'){
                    $.alert(data.msg);
					}else{
                    $.alert(data.msg);
					}
		  },function(data){});
		  
	    	
    });
  
  
  
  
    

    function voteProjectt(){
      obj.ajax('/project/enroll/voteProjectt',{'projectId':12,'activityId':21},function(data){
            console.log(data);
            /*createEle(data.rows);*/
            
          },function(data){console.log(1);});
    }
    voteProjectt();

    /*重磅项目首页-我要报名弹窗*/
   $(".baoming").click(function(){
       $.alert('朱朱1');
        $(".bg_black").css("display","block");
        $(".enroll").css("display","block");
   });
   $(".enroll_rule span").click(function(){
   	 console.log("朱朱2")
        $(".bg_black").css("display","none");
        $(".enroll").css("display","none");
   });

   /*重磅项目参赛项目-投票指引弹窗*/
   $(".zhiyin h3").click(function(){
   	 console.log("朱朱3")
        $(".bg_black").css("display","block");
        $(".guide").css("display","block");
   });
   $(".guide_centent span").click(function(){
   	 console.log("朱朱4")
        $(".bg_black").css("display","none");
        $(".guide").css("display","none");
   });

   $(".red").click(function(){
   	 console.log("朱朱5")
        $(".bg_black").css("display","none");
        $(".guide").css("display","none");
   });
    
    /*重磅项目参赛项目——我要投票*/
    $("#jieshao").click(function(){
         console.log("朱朱6")
        $(".bg_black").css("display","block");
        $(".HD_detail").css("display","block");
   });
   $(".detail_centent span").click(function(){
   	
        $(".bg_black").css("display","none");
        $(".HD_detail").css("display","none");
   });

   /*重磅项目参赛项目——投票成功*/
   $(".success_centent span").click(function(){
   	 console.log("朱朱8")
        $(".bg_black").css("display","none");
        $(".success").css("display","none");
   });

   /*优秀青年/集体*/
   $(".youxiu span").click(function(){
   	 console.log("朱朱8")
        var index = $(this).index()
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parent('.youxiu').siblings('.project').children(".XM_list").eq(index).css("display","block").siblings().css("display","none");     
    });
  /*条件筛选*/
    $(".zbxm_choose").on("click",".choose_box a",function(event) {
    	 console.log("朱朱10")
        $(".choose_box a span").removeClass('current');
        $(this).children('span').addClass('current');
        for (var i = 1; i < 4; i++) {
            if($("#typeName"+i+"").hasClass('current')){
                $(".choose_list,.choose_list ul,.bg_black").css("display","block");
                $(".choose_list ul li").css("display","none");
                $(".choose_list .list_"+i+"").stop().fadeIn(150);
            }
        };
    });
    /*条件筛选--点击筛选下拉菜单消失效果*/
    $(".zbxm_choose").on("click",".list a",function(event) {
    	 console.log("朱朱11")
    	console.log(44)
        var txt = $(this).html();
        var this_index = $(this).parents("li").index();
        $(".choose_t .choose_box").eq(this_index).find('.tit').html(txt);
        $(".choose_box a span").removeClass('current');
        $('.bg_black,.choose_list').fadeOut();
    });
    
    
    /******  弹窗的点击事件 ******/
    
   
    
});