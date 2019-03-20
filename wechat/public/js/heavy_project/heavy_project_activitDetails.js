;$(function(){
	
	/*******  获取列表传过来的id值，查询信息   *******/
	var activityId = "";

	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
			//    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			activityId = strs[1];
		}
	}
    getRequest();
	
	
	////192.168.100.47:8080/qnzs/project/getActivityDetail?activityDetailId=2114
	function  activityDetails(){
		
	   
		obj.ajax('/project/activityDetail',{'activityId':activityId},function(data){
			
	           console.log(data);
			cerateEle(data);
		
			$('#p1').html(data.dataList.title);//
			if(data.dataList.bannerUrl!=''){
				
				$('#p2').attr('src',data.dataList.bannerUrl);
				$('#p2').css('display','block')
			}
			
			$('#p3').append(data.dataList.content);
			
			$('#p5').html(data.dataList.remark)   //活动介绍
			$('#act_time').html(data.dataList.voteStartTime)   //活动投票时间
     	},function(data){});
     	
     	function cerateEle(data){
     		var html='';
		 	for (var i = 0; i < data.length; i++) {
		 		html+=   '<p class="color333 fz28">'+data[i].content+'</p>'
		 	}
		    $('#signUp').html('<h6 class="fz30 color000">报名条件</h6>'+html);
     	}
     	
	}
	
	activityDetails();
	
})