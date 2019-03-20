$(function(){

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
    

   
})