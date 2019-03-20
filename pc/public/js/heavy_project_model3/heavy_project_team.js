;
$(function(){
	
	
//	 参赛者作品
   /*团队*/
   function work_list_team(){
   	    sendAjax();  //初始化列表
   	    function sendAjax(data){
	   	    obj.ajax('/project/enroll/projectList',data,function(data){
		   	 	console.log(data);
		   	 	createEle(data.rows);
	   	    },function(data){console.log(1);});
   	    }
   	    
   	    function createEle(data){
   	    	
		    var num=8;
		    var html=''
		    for (var i = 0; i < data.length; i++) {
		        html+='<li class="item fl">'
		        html+=' <div class="item_con">'
		        html+='  <div class="work_pic_box">'
		        html+='   <img src="'+data[i].imageUrl+'" alt="" />'
		        html+='  </div>'
		        html+='  <div class="work_vote">'
		        html+='   <p class="project_name txt">名称：'+data[i].projectName+'</p>'
		        html+='   <p class="applicant txt">申报人：'+data[i].reporterName+'</p>'
		        html+='   <button class="vote_btn">'+data[i].likesNum+'人投票</button>'
		        html+='  </div>'
		        html+=' </div>'
		        html+='</li>'
		    };
		    $('.work_list.team').append(html)
   	    }
   	    //团队筛选
   	      	    
   	    //个人筛选
// 	    $('#seachPerson').click(function(){
// 	    	
// 	    	var data = {
// 	    		'districtId': , //所属地区ID
// 	    	    'keyWord': ,    //标题关键定
// 	    	    'activityId':,    //所属活动ID
// 	    	    'creatorType':,   //参赛者分类
// 	    	    'pageIndex':10,      //当前页码
// 	    	    'pageSize' :10 ,     //每页记录数
// 	    	};
// 	    	sendAjax();
// 	    	
// 	    })
   	    
   	
   }
   work_list_team();
	
	
	
	
})
