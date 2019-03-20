;
$(function(){
	
	
	/**  我参与的项目  ***/
	
	function activitProjectList () {
	
	     obj.ajax('/project/myJoinActivityList',{},function(data){
	        console.log(data);
	        /*console.log(data.rows[0].createTime)*/
	        createEle(data.dataList);/*传递参数*/

        },function(data){console.log(1);});
       
        function createEle(data){
        	 $('.project_item_list').html('');
            var html = '';
            for (var i = 0; i <data.length; i++) {
	    	if(data[i].externalLinksWc == ''){
	        	html+='<a href="view/heavy_project/heavy_project_details.html?activityId='+data[i].id+'">'
	    	}else{
	        	html+='<a href="'+data[i].externalLinksWc+'">'
	    	}
		        html+=    ' <div class="xiangmu_box">'
		        html+=       '<div class="xiangmu_box_in">'
		        html+=          '<div class="xiangmu_content">'
		        html+=               '<div class="pic_box">'
		        html+=                    '<img src="'+data[i].bannerUrl+'" />'
		        html+=               '</div>'
		        html+=              '<p class="clearfix">'
		        html+=                    '<span class="xm_fenlei fl">'+data[i].type+'</span>'
		        html+=                  '<span class="xm_zhuti fl">'+data[i].title+'</span>'
		        html+=                   '<span class="xm_time fr clearfix"><i class="rest fl">剩</i><i class="day fl">'+data[i].endTime+'</i></span>'
		        html+=              '</p>'
		        html+=         '</div>'
		        html+=        '</div>'
		        html+=   '</div>'
		        html+= '</a>'
		       
                /*console.log(data[i].stage)*/
           };
            $('.project_item_list').append(html)
        }
	
	}
	activitProjectList() ;
	
	
	
	
	
	
})
