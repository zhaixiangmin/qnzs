/*重磅项目-后台管理-新增*/
$(document).ready(function(){
    // 重磅项目-后台管理-首页*****************************
    
    // 首页-活动类型
    $('#activityType').on("change",function(event){
        var _val = $(this).val();
        if(_val == "其他"){
            $('.moldInp').fadeIn(150);
        }else{
            $('.moldInp').fadeOut(150);
        }
    });
    // 报名审核
    $('.shenhe_in').on("change",'label input',function(event){
        if($('#showArea input').prop("checked") == true){
            $('.area').fadeIn(150);
            return
        }else{
            $('.area').fadeOut(150);
            return
        }
    });
    // 下拉选择添加
    $('#cityOid2').on("change",function(event){
        var _ul = $('.area_b ul');
        var _txt = $(this).find("option:selected").text();
        var did = $(this).find("option:selected").attr('value');
        
        if($('.area_b li[data-attr="'+_txt+'"]').length == 0){
            _ul.append('<li value="'+did+'" data-attr="'+_txt+'"><div class="font14 color333 clearfix"><span class="fl"><b>X</b></span>'+_txt+'</div></li>');
        }
    });
    $('#shcoolOid2').on("change",function(event){
        var _ul = $('.area_b ul');
        var _txt = $(this).find("option:selected").text();
        var did = $(this).find("option:selected").attr('value');
        if($('.area_b li[data-attr="'+_txt+'"]').length == 0){
            _ul.append('<li value="'+did+'" data-attr="'+_txt+'"><div class="font14 color333 clearfix"><span class="fl"><b>X</b></span>'+_txt+'</div></li>');
        }
    });

// 删除
    $('.area_b').on("click",".fl",function(event){
        $(this).parents('li').remove();
    });
    
    // 选择模板
    $(".yulan_box").hover(function(event) {
        if(!$(this).hasClass('cur')){
            $(this).children(".box_2").css("display","block");
            $(this).children('.choice').stop().animate({"left":"62px"},350);
        }
    },function(){
        if(!$(this).hasClass('cur')){
            $(this).children(".box_2").css("display","none");
            $(this).children('.choice').stop().animate({"left":"-55px"},350);
        }
    });
    
    $(".yulan_box").on("click",function(event){
        $(".yulan_box").removeClass('cur');
        $(this).addClass('cur');
        $(".yulan_box").children(".box_2").css("display","none");
        $(".yulan_box").children('.choice').css({"left":"-55px"});
        $(this).children(".box_2").css("display","block");
        $(this).children('.choice').css({"left":"62px"});
        
        var modelName = $(this).attr('value');
        $('#templateName').val(modelName);
        
    	//根据所选模板隐藏/显示第二步相应模块
    	changeModel(modelName);
    });
    
    //参赛作品板块显示
//   $("#showBtn a").on("click",function(event){
//  
////      $(this).addClass('current').siblings('fl').removeClass('current');
//$(this).addClass('current')
//  });
    
    
    // 重磅项目-后台管理-详情
    // 项目动态板块
    // 添加
    $(".project").on("click",".list_t .jia",function(event){
        if($(this).parent(".anniu").siblings("input").hasClass('disabled')){
            $(".project .list_t").append('<div class="title mar_b20 clearfix">'+
                                '<em class="fl">标题</em>'+
                                '<input type="text" class="fl bgf" />'+
                                '<div class="anniu clearfix fl">'+
                                    '<span class="delete fl">删除</span>'+
                                '</div>'+
                            '</div>');
        }
        addBtn($(".project"));
    });
    // 删除
    $(".project").on("click",".list_t .delete",function(event){
        $(this).parents(".title").remove();
        addBtn($(".project"));
    });
    // 保存
    $(".project").on("click",".save",function(event){
        $(this).parents(".bgcgrey").find('.bgf').addClass('disabled').removeClass('bgf');
        addBtn($(".project"));
        
    });
    $(".project").on("focus",".title input",function(event){
        $(this).addClass('bgf').removeClass('disabled');
        addBtn($(".project"));
    });
    $(".project").on("blur",".title input",function(event){
        $(this).addClass('disabled').removeClass('bgf');
        addBtn($(".project"));
    });
    
    
 
//-----------------------------------------------------------------------------------------------------------------------------------------------------   
    /************* 项目动态多添加一条  *********************/
	var projectContentNum = 0 ;
//	$('#add-more-info').click(function(){
	$('#div_activity_detail').on('click','#add-more-info',function(){
		projectContentNum += 1;
		/** 富文本框插件 **/
		var html ='';
		    html+='<div class="project_in">'
            html+=           ' <div class="list_t">'
            html+=                '<div class="title mar_b20 clearfix">'
            html+=                	'<a href="javascript:;" class="del-more-info">删除</a>'
            html+=                    '<em class="fl">标题</em>'
            html+=                   ' <input name="title" class="fl bgf" maxlength="100" type="text">'
            html+=                    '<div class="anniu clearfix fl">'
            html+=                        '<!-- <span class="delete fl"></span> -->'
            html+=                        '<span class="jia fl" style="display: none;"></span>'
            html+=                   '</div>'
            html+=                '</div>'   
            html+=            '</div>'
            html+=            '<div class="list_b">'
            html+=            	'<em class="fl">内容</em>'
            html+=                '<div class="edit">'
            html+=                    '<div class="edit_in" id="div_project_content_'+projectContentNum+'">'
            html+=                    	'<!--<textarea name="content" style="width: 100%;height: 100%;"></textarea>-->'
            html+=                       '<!--富文本框 -->'
//          html+=                        '<textarea id="project_content_add" name="content" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>'
//          html+=                    	       ' <textarea  id="project_content'+(n+1)+'"></textarea>'
            html+=                    	   ' <div class="summernote2'+(n+1)+'"></div>' 
            html+=                    	'<!--富文本框  end-->'
                                         
            html+=                    '</div>'
            html+=                '</div>'
            html+=            '</div>'
            html+=        '</div>'
		
            $('#div_activity_detail').append(html);
            AddLoadEditor();
           
	})
	/*** 删除动态详情  ****/
	
	$('#div_activity_detail').on('click','.del-more-info',function(){
		$(this).parents('.project_in').remove();
		
	})
//-----------------------------------------------------------------------------------------------------------------------------------------------------
    // 评选流程板块
    $(".elect").on("click",".key.bgccc",function(event){
        $(this).toggleClass('current');
        if($(this).hasClass('current')){
            $(this).parents('.list_t').siblings('.list_b').stop().slideDown(150);
        }else{
            $(this).parents('.list_t').siblings('.list_b').stop().slideUp(150);
        }
    });
    $(".elect").on("click",".list_t .jia",function(event){     //评选流程
        if($(this).parents('.fl').find('.list').length<5){
//          $(this).parents(".list").parent().append('<div class="list mar_t20">'+
		var html = '<div class="list mar_t20">'+
                            '<div class="list_t ">'+
                                '<div class="t_box   clearfix">'+
                                    '<em class="font14  color333 fl">1</em>'+
                                    '<div class="elect_time pinxuan2 clearfix fl">'+
                                        '<input type="text" class="fl month easyui-datebox" name="startTime" placeholder="开始" />'+
                                        '<input type="text" class="fl month easyui-datebox" name="endTime" placeholder="结束" />'+
                                        '<input type="text" class="fl month" name="content" placeholder="示例：项目申报"/>'+
                                    '</div>                                '+
                                    
                                    '<div class="anniu clearfix fl">'+
                                        '<span class="delete fl" style="margin-top: 10px;width: 80px;">删除</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            var targetObj = $(html).appendTo("#activity_process_div")
        }
        numberEm();
        $.parser.parse(targetObj);//局部渲染(easyui-datebox样式)
    });
    $(".elect").on("click",".list_t .delete",function(event){
        $(this).parents(".list").remove();
        numberEm();
    });
    
    //奖项设置
    $(".elect2").on("click",".key.bgccc",function(event){
        $(this).toggleClass('current');
        if($(this).hasClass('current')){
            $(this).parents('.list_t').siblings('.list_b').stop().slideDown(150);
        }else{
            $(this).parents('.list_t').siblings('.list_b').stop().slideUp(150);
        }
    });
    $(".elect2").on("click",".list_t .jia",function(event){                 //奖项设置
        if($(this).parents('.fl').find('.list').length<5){
            $(this).parents(".list").parent().append('<div class="list mar_t20">'+
                '<div class="list_t ">'+
                    '<div class="t_box clearfix">'+
                        '<em class="font14 color333 fl">1</em>'+
                        '<div class="elect_time prize1 clearfix fl">'+
                            '<input type="text" class="fl month" name="ranking" placeholder="示例：一等奖" maxlength="10"  />'+
                            '<input type="text" class="fl year" name="count" placeholder="示例：1"/>'+
                            '<input type="text" class="fl month" name="prizes" placeholder="示例：macbook air一台" maxlength="20"/>'+
                        '</div>                                '+
                        
                        '<div class="anniu clearfix fl">'+
                            '<span class="delete fl" style="margin-top: 10px;width: 80px;">删除</span>'+
                        '</div>'+
                    '</div>'+
                  
                              
                '</div>'+
                
            '</div>');
        }
        numberEm();
    });
    $(".elect2").on("click",".list_t .delete",function(event){
        $(this).parents(".list").remove();
        numberEm();
    });
    
    
    //奖项设置end
   
    // 报名要求板块/奖品展示板块
    $(".repCommer").on("click",".key.bgccc",function(event){
    	$(this).addClass('current').siblings('a').removeClass('current')
//      $(this).toggleClass('current');
//      if($(this).hasClass('current')){
//          $(this).parents('.list_t').siblings('.list_b').stop().slideDown(150);
//      }else{
//          $(this).parents('.list_t').siblings('.list_b').stop().slideUp(150);
//      }
    });
    $(".repCommer").on("click",".list_t .jia",function(event){             //报名要求
        if($(this).parents('.fl').find('.list').length<5){
            $(this).parents(".list").parent().append('<div class="list mar_t20">'+
                            '<div class="list_t request  clearfix">'+
                                '<em class="font14 color333 fl">1</em>'+
                                '<input type="text" class="fl takerequest" name="content" placeholder="示例：项目符合环保理念"/>'+
                                '<input type="hidden" name="type" value="1">'+
                                '<div class="anniu clearfix fl">'+
                                    '<span class="delete fl" style="margin-top: 10px;width: 80px;">删除</span>'+
                                '</div>'+
                            '</div>'+
                            
                        '</div>');
        }
        numberEm();
       
    });
    $(".repCommer").on("click",".list_t .delete",function(event){
        $(this).parents(".list").remove();
        numberEm();
    });


    // 序号
    function numberEm(){
        $('.require .list').each(function(index, el) {
            $(el).find('em').html(index+1);
        });
        $('.prize .list').each(function(index, el) {
            $(el).find('em').html(index+1);
        });
        $('.elect .list').each(function(index, el) {
            $(el).find('em').html(index+1);
        });
        $('.elect2 .list').each(function(index, el) {
            $(el).find('em').html(index+1);
        });
    }

    // 添加按钮显示
    function addBtn (obj) {
        if(obj.find('.bgf').length == 0){
            obj.find('.jia').fadeIn(0);
        }else{
            obj.find('.jia').fadeOut(0);
        }
    }
    addBtn($(".project"));
	// ("display",imgLen<8?"block":"none");
	
	//参赛作品板块
	$(".close").click(function(){
	    $(this).addClass('current');
	});
   
   /***  自定义栏目名称 **/
// alert(('.changeLabel').length)
  
   $('.changeLabel').click(function(){
	    s =$(this).html()
	    $(this).css('display','none')
	    $(this).siblings('.zhu').css('display','block');
	    $(this).siblings('.zhu').val(s)
   })
   
    $('.zhu').blur(function(){
	    	var s1 =$(this).val();
		    $(this).css('display','none')
	  	    $(this).siblings('.changeLabel').html(s1);
		    $(this).siblings('.changeLabel').css('display','block');
	})
  
/*  报名、投票默认时间*/
    /*$(function(){
			var curr_time = new Date();
			var curr_month = curr_time.getMonth()+1;
			var curr_day = curr_time.getDate()+1;
  		 	var strDate = curr_time.getFullYear()+"-";
   			strDate += (curr_month > 9 ? curr_month+"-" : "0"+curr_month+"-");
   			strDate += (curr_day > 9 ? curr_day : "0"+curr_day);
   			strDate += " 00:00:00";
			//默认当天日期
			$('#beginTime1').datetimebox('setValue',strDate);
			$('#endTime1').datetimebox('setValue',strDate);
			$('#beginTime2').datetimebox('setValue',strDate);
			$('#endTime2').datetimebox('setValue',strDate);
	});*/
	
	/**************************************************         项目动态多添加几条  -新增页面   *******************************************************/
	n =0;
	$('#add_div_activity_detail').on('click','.add-more-pro-info', function(){
		n+=1;
		/** 富文本框插件 **/
		var html ='';
		    html+='<div class="project_in">'
            html+=           ' <div class="list_t">'
            html+=                '<div class="title mar_b20 clearfix">'
            html+=                	'<span href="javascript:;" class="del-more-info">删除</span>'
            html+=                    '<em class="fl">标题</em>'
            html+=                   ' <input name="title" class="fl bgf" maxlength="100" type="text">'
            html+=                    '<div class="anniu clearfix fl">'
            html+=                        '<!-- <span class="delete fl"></span> -->'
            html+=                        '<span class="jia fl" style="display: none;"></span>'
            html+=                   '</div>'
            html+=                '</div>'   
            html+=            '</div>'
            html+=            '<div class="list_b">'
            html+=            	'<em class="fl">内容</em>'
            html+=                      '<input  name="content"  type="hidden" class ="cat_pro_info'+n+' add_activit_info"/>'
            html+=                '<div class="edit">'
            html+=                    '<div class="edit_in">'
            html+=                    	'<!--<textarea name="content" style="width: 100%;height: 100%;"></textarea>-->'
            html+=                       '<!--富文本框 -->'
            html+=                        '<!--<textarea id="project_content" name="content" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>-->'
//          html+=                    	       ' <textarea  id="project_content'+(n+1)+'"></textarea>'
            html+=                                 ' <div class="summernote'+n+'"></div>'          
            html+=                    	'<!--富文本框  end-->'
            html+=                    '</div>'
            html+=                '</div>'
            html+=            '</div>'
            html+=        '</div>'
		    
            $('#add_div_activity_detail').append(html);  
            
            fn(n);   //回掉富文本框
            
	})
	/*** 删除动态详情  ****/
	$('#add_div_activity_detail').on('click','.del-more-info',function(){
	
		$(this).parents('.project_in').remove();
		
	})
	
	
	
	/**************************************************         项目动态多添加几条  -修改页面   *******************************************************/
     var  k=n;
	$('.upd_add-more-info').click(function(){
		
	     console.log(k);
	     k +=1;
	      console.log(k);
		/** 富文本框插件 **/
		var html ='';
		    html+='<div class="project_in">'
            html+=           ' <div class="list_t">'
            html+=                '<div class="title mar_b20 clearfix">'
            html+=                	'<span href="javascript:;" class="del-more-info">删除</span>'
            html+=                    '<em class="fl">标题</em>'
            html+=                   ' <input name="title" class="fl bgf" maxlength="100" type="text">'
            html+=                    '<div class="anniu clearfix fl">'
            html+=                        '<!-- <span class="delete fl"></span> -->'
            html+=                        '<span class="jia fl" style="display: none;"></span>'
            html+=                   '</div>'
            html+=                '</div>'   
            html+=            '</div>'
            html+=            '<div class="list_b">'
            html+=            	'<em class="fl">内容</em>'
            html+=                       '<input  name="content"  type="hidden" class ="cat_pro_info'+k+' add_activit_info"/>'
            html+=                '<div class="edit">'
            html+=                    '<div class="edit_in">'
            html+=                    	'<!--<textarea name="content" style="width: 100%;height: 100%;"></textarea>-->'
            html+=                       '<!--富文本框 -->'
            html+=                        '<!--<textarea id="project_content" name="content" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>-->'

            html+=                                 ' <div class="summernote'+k+'"></div>'          
            html+=                    	'<!--富文本框  end-->'
            html+=                    '</div>'
            html+=                '</div>'
            html+=            '</div>'
            html+=        '</div>'
		    
            $('#add_div_activity_detail').append(html);  
            fn2(k);   //回掉富文本框
            
	})
	/*** 删除动态详情  ****/
	$('#upd_div_activity_detail').on('click','.del-more-info',function(){
	    
		$(this).parents('.project_in').remove();
	})

});

