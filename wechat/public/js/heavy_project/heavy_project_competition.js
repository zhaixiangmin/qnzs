
;
$(function(){
	
     //重磅项目-参赛项目-PC端/微信端：列表及筛选
    var n=10;
	function enrollDetails (n){
	 	obj.ajax('/project/enroll/projectList',{'activityId':21,'pageIndex':1,'pageSize':n},function(data){
	        console.log(data);
	        /*console.log(data.rows[0].createTime)*/
	        createEle(data.rows);/*传递参数*/

        },function(data){console.log(1);});
       
        function createEle(data){
        	 $('#pl_30').html('');
            var html = '';
            for (var i = 0; i <data.length; i++) {
               
		        html+=  '<a href="javascript:;" class="item clearfix disB">'
                html+= '<div class="left fl">'
                html+=    ' <img src="'+data[i].imageUrl+'"  />'
                html+=' </div>'
                html+= '<div class="right">'
                html+=    '<h4 class="color000 fz30">'+data[i].projectName+'</h4>'
                html+=     ' <p class="fz26 color666">'+data[i].reporterName+'</p>'
                html+=    ' <div class="bot clearfix fz24 color999">'
                html+=         '<span class="fl">'+data[i].enrollTime+'</span>'
                html+=        ' <em class="fr">'+data[i].likesNum+'</em>'
                html+=   '  </div>'
                html+= '</div>'
                html+= '</a>'
		       
           };
            $('#pl_30').append(html);
	 	}
	 	
	 }
	 enrollDetails (5);
	 
	 //查看更多
	 $('.morebtn').click(function(){
	  
	    n+=5;
	   enrollDetails (n);    //回到函数  ，改变加载的条数
	
	 })
		 
	 
	 
	
})