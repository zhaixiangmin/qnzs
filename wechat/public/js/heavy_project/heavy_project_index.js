$(document).ready(function(){
  
//  /*项目列表*/   
    function project_item_list(data){
        obj.ajax('/project/activityList',data,function(data){///project/activityList  
           console.log(data);
        if($('.project_item_list a').length <data.dataList.length){
        	$('.gengduo a').html('加载更多');
        }else{
        	$('.gengduo a').html('亲，已加载完...');
        }
       
        createEle(data.dataList);/*传递参数*/
        
     },function(data){});
     
        function createEle(data){
        	 $('.project_item_list').html('');
            var html = '';
            for (var i = 0; i < data.length; i++) {
			    	if(data[i].externalLinksWc == ''){
		                html+='<a id="item-a" href="heavy_project_details.html?activityId=' + data[i].id + '" >'
			    	}else{
			        	html+='<a id="item-a" href="'+data[i].externalLinksWc+'">'
			    	}
                html+=' <div class="xiangmu_box">'
                html+='  <div class="xiangmu_box_in">'
                html+='   <div class="xiangmu_content">'
                html+='    <div class="pic_box">'
                html+='     <img src="'+Utils.compressByAli(data[i].bannerUrl, 200, 690)+'" />'
                html+='    </div>'
                html+='    <p class="clearfix">'
                html+='     <span class="xm_fenlei fl">'+data[i].type+'</span>'
                html+='     <span class="xm_zhuti fl">'+data[i].title+'</span>'
                if(data[i].stage==4){
                    html+='<span class="xm_state fr clearfix color999">已结束</span>'
                }
                html+='    </p>'
                html+='   </div>'
                html+='  </div>'
                html+=' </div>'
                html+='</a>'
           };
            $('.project_item_list').append(html)
        }


    }
    project_item_list({'pageNo':1, 'pageSize':80});
    
   
    /**获取所有市级和高校(微信端列表筛选)**/
    
    function listByParent(){
    	obj.ajax('/common/district/listByParent',{'parentDid':440000},function(data){
	        console.log(data);
	          /*console.log(data.rows[0].createTime)*/
	        createEle(data.dataList);/*传递参数*/

        },function(data){console.log(1);});
        
         function createEle(data){
         
         	var html = '';
         	for (var i = 0; i < data.length; i++) {
//       	html+='<a href="javascript:;" class="fz28 color333" name="type1"  districtId="'+data[i].districtId+'">'+data[i].districtName+'</a>'
         	html+='<a href="javascript:;" class="fz28 color333" name="type1"  districtId="'+data[i].did+'">'+data[i].districtName+'</a>'
         	}
//       	$('#area_list1').html(html); 
            $('#area_list1').append(html); 
         }
    	
    }
    listByParent();

    
    /*  活动类型**/
   
// function activiteType (){
// 	obj.ajax('/common/district/listByParent',{'parentDid':440000},function(data){
//	        console.log(data);
//	          /*console.log(data.rows[0].createTime)*/
//	        createEle(data.dataList);/*传递参数*/
//
//  },function(data){console.log(1);});
//      
// }
// activiteType();
    
   
    // 点击筛选
    $('.zbxm_choose .list').append('<div class="bg"></div>');
    $('.zbxm_choose .bg').click(function(){
        $(".choose_box.cur").removeClass('cur');
        $(this).parents('.list').fadeOut(150);
    })

    $(".zbxm_choose").on("click",".choose_box",function(event) {
        if(!$(this).hasClass('cur')){
            $(this).addClass('cur').siblings('.choose_box').removeClass('cur');
            $('.choose_list .list').eq($(this).index()).fadeIn(150).siblings().fadeOut(150);
        }else{
            $(this).removeClass('cur');
            $('.choose_list .list').eq($(this).index()).fadeOut(150);
        }
       
    });
    // 点击筛选下拉菜单消失效果
    $(".zbxm_choose").on("click",".list a",function(event) {
        var txt = $(this).html();
        var this_index = $(this).parents("li").index();
        $(".choose_t .choose_box").eq(this_index).find('.tit').html(txt);
        $(".choose_box.cur").removeClass('cur');
        $('.choose_list .list').fadeOut(150);
        
      
     
      //清空已有的列表数据
        $('.project_item_list').html('');
        
      //if判断，传入不同类型的参数
      
        var data ={};              
        if($(this).attr('name') == 'type1'){    // 拼接所属地区
//      	    
		    	var activityType =$('#typeName2').html() != '活动类型'?   $('#typeName2').html() :'';   // 参赛项目
		    	var  stage =$('#typeName3').html() != '活动状态'?  $('#typeName3').attr('value') :'';   //活动状态
		    	
		    	console.log($(this).attr('districtid'));
		    	console.log(activityType);
		    	console.log(stage);
		    	
		    	var data ={'pageSize':n, 'districtId':$(this).attr('districtid'),  'activityType':activityType, 'stage':stage};
        	    $('#typeName1').attr('districtid',$(this).attr('districtid'))
        }
        if($(this).attr('name') == 'type2')  {    //  活动类型
        	var districtId =  $('#typeName1').html() !='活动区域'?  $('#typeName1').attr('districtId'):'' ;  //地市
	    	var  stage =$('#typeName3').html() != '活动状态'?  $('#typeName3').attr('value') :'';   //活动状态
	    	
	    	console.log(districtId);
	    	console.log($(this).html());
	    	console.log(stage);
	    	
	    	var data ={'pageSize':n, 'districtId':districtId,  'activityType':$(this).attr('districtid'), 'stage':stage};
    	
        }
      
        if($(this).attr('name')=='type3'){       // 活动阶段
        	
        	var districtId =  $('#typeName1').html() !='活动区域'?  $('#typeName1').attr('districtId'):'' ;  //地市
            var activityType =$('#typeName2').html() != '活动类型'?   $('#typeName2').html() :'';   // 参赛项目
	    	
	    	console.log(districtId);
	    	console.log(activityType);
	    	console.log($(this).attr('value'));
	    	
	    	var data ={'pageSize':n, 'districtId':districtId,  'activityType':activityType, 'stage':$(this).attr('value')};
    	

        	$('#typeName3').attr('value',$(this).attr('value'))
        } 
        
        project_item_list(data);               //传入选中的data  对象 
      
    });
   
   
    
    /*底部菜单栏*/
    $('footer ul li').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    /**** 加载更多  ****/
    var n=5;
    $('.gengduo').click(function(){   
    	 n+=5  ;
//  	data = {'activityType':activityType};
	    var districtId =  $('#typeName1').html() !='活动区域'?  $('#typeName1').attr('districtId'):'' ;  //地市
    	var activityType =$('#typeName2').html() != '活动类型'?   $('#typeName2').html() :'';   // 参赛项目
    	var  stage =$('#typeName3').html() != '活动状态'?  $('#typeName3').attr('value') :'';   //活动状态
    	
    	
    	
    	console.log(districtId);
    	console.log(activityType);
    	console.log(stage);
    	
    	var data ={'pageSize':n, 'districtId':districtId,  'activityType':activityType, 'stage':stage};
//     
    	project_item_list(data);   //回调函数
    })
    
    

});