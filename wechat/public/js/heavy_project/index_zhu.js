$(function(){
	/********** 存储cookit **************/
	var s = window.location.href;
	var size ='';
//	var h = window.location.href.split('//');
	var h = s.split('//');
    if(h.length ==1){
       size= s.split('.')[0].toLocaleUpperCase();
    	console.log(s);
    }else{
    	
       size = h[1].split('.')[0].toLocaleUpperCase();
       console.log(s)
    }
    if(size!='WWW'){
	    $.ajax({
	    	type:"post",
	    	url:base+"/common/district/getDistrictIdBySubDomains",
	    	data:{'subDomains':size},
	    	success:function(data){
	    		console.log(data);
	    		
	    		$('.address_box .address').html(data.districtName)
	    		
	    		/***** 存入到cookie  *******/
	    		var district_qnzs = {
		            sitenavOrgId: data.data.districtId, // 区域ID
		            sitenavOrgName: data.data.districtName // 区域名称
		        };
		        district_qnzs = JSON.stringify(district_qnzs);
		        $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
		        console.log($.cookie('district_qnzs'))
				
	    	}
	    });
    	
    }
	
	/********** 存储cookit end **************/
	
	
	
	/*** 推荐项目 ***/
	obj.ajax('/project/indexActivityList',{'showNumber':3},function(data){
        console.log(data);
     
        createEle(data.dataList);/*传递参数*/
         
    },function(data){console.log(1);});
    
    function createEle(data){
    	$('.recommend_project').html('')
 	    var html=''
//      var status_array=['未开始','报名中','投票中','活动结束'];
	    for (var i = 0; i <data.length; i++) {
	    	if(data[i].externalLinksWc == ''){
	        	html+='<a href="view/heavy_project/heavy_project_details.html?activityId='+data[i].id+'" class="disB recommend_project_item">'
	    	}else{
	        	html+='<a href="'+data[i].externalLinksWc+'" class="disB recommend_project_item">'
	    	}
	        html+=' <div class="xiangmu_box">'
	        html+='  <div class="xiangmu_box_in">'
	        html+='   <div class="xiangmu_content">'
	        html+='    <div class="pic_box">'
	        html+='     <img src="'+ Utils.compressByAli(data[i].bannerUrl, 200) +'" alt="" />'
	        html+='    </div>'
	        html+='    <p class="clearfix">'
	        html+='     <span class="xm_fenlei fl">'+data[i].type+'</span>'
	        html+='     <span class="xm_zhuti fl">'+data[i].title+'</span>'
	        var stageStr = '';
	                if(data[i].stage==1){
			             stageStr = '未开始';
			             colorStr = '#33cc33;';
			        }else if(data[i].stage==2 || data[i].stage==5){
			             stageStr = '报名中';
			             colorStr = '#33cc33;';
			        }else if(data[i].stage==3){
			             stageStr = '投票中';
			             colorStr = '#33cc33;';
			        }else{//if(data[i].stage==4)
			             stageStr = '活动结束';
			             colorStr = '#ccc;';
			        }
	        html+='     <span class="xm_status fr clearfix"  style="color: '+colorStr+'">'+stageStr+'</span>'
	        html+='    </p>'
	        html+='   </div>'
	        html+='  </div>'
	        html+=' </div>'
	        html+='</a>'
	    };
	    $('.recommend_project').append(html);
    }
	
	
})