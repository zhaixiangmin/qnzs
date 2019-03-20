$(function(){
	
	//重磅项目-项目动态-项目动态
	function dynmeic(){
		
		obj.ajax('/project/getActivityDetail',{'activityDetailId':2114},function(data){
            console.log(data);
            createEle(data.dataList);
            
        },function(data){console.log(1);});
        
        function createEle(data){
            var html='';
//          for (var i = 0; i < data.requirementsList.length; i++) { 
            
                html+=   '<li>'
                html+=       ' <a href="zbxm_index_trends_detail.html">'
                html+=           '<div class="clearfix tr_box">'
                html+=               '<div class="trends_box_l fl">'
                html+=                   '<img src="'+data.bannerUrl+'"alt=""/>'
                html+=              '</div>'
                html+=             
                html+=             ' <div class="trends_box_r fl">'
                html+=                   '<h4 class="font16 color000">浪漫夏日</h4>'
                html+=                  ' <p class="font14 color666 substance introduce">'+data.title+'</p>'
                html+=                 '  <p class="font12 color999">发布时间：2017年06月01日</p>'
                html+=               '</div>'
                html+=          '</div>'
                html+=      ' </a>'
                html+=  '</li>'
//          }
            $('#dynamicOul').html(html);
           
        }
		
	}
	dynmeic()
})