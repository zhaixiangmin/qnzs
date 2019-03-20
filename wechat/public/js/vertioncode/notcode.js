
//验证手机号是否绑定过其他账户

var phone =JSON.parse( $.cookie('getpsd')).mobile

var s = phone.slice(0,phone.length-4);
$('.phone_txt').html(s+"****");

var falAccount =0;
$.ajax({
   	type:"post",
   	url:Qnzs.path+"/pc/accountAppeal/accountList",
   	async:true,
   	data:{
        "mobile": phone,// 用户ID
    },
   	success:function(data){
   		
   	    console.log(data);
   	    if(data.dataList.length>1){
   	  	
   	  	  // $('#allege').attr("href","appealsSelection.html");
   	  	   falAccount =1;
   	    }else{
   	    	
   	    	var getpsdObj = {
			    username:data.dataList[0].username,
			    realname:data.dataList[0].realname,
			    mobile:data.dataList[0].mobile //现用手机号
			};
			getpsdObj = JSON.stringify(getpsdObj);
			$.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
   	    	
   	  	   //$('#allege').attr("href","Accounts.html");
   	  	   
   	  	    falAccount =2;
   	    }
   		
   	}
});

//调转到申诉
$('#allege').click(function(){
	
	if(falAccount ==1){
		
		window.location.href="appealsSelection.html";
	}else if(falAccount ==2){
		window.location.href="Accounts.html";
		
	}else{
		alert("请稍等！")
	}
})
