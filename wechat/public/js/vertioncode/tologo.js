//获取手机号码
    var phone =JSON.parse( $.cookie('getpsd')).mobile
	var s = phone.slice(0,phone.length-4);
	$('.phone_txt').html(s+"****");
	

//1.手机号曾绑定过的账号
$.ajax({
   	type:"post",
   	url:"/pc/accountAppeal/accountList",
   	async:true,
   	data:{
        "mobile":11 , // 用户ID
    },
   	success:function(data){
   		
   		console.log(data)
   	}
   });