function getUsernameId(){
	
	//获取手机号
    var phone =JSON.parse( $.cookie('getpsd')).mobile
	//1.手机号曾绑定过的账号  获取username

	var userName ="";
	$.ajax({
	   	type:"post",
	   	url:Qnzs.path+"/pc/accountAppeal/accountList",
	   	async:true,
	   	data:{
	        "mobile": phone,// 用户ID
	    },
	   	success:function(data){
	   		
	   		console.log(data)
	   		userName =data.username;
	   	}
	});
	
	return userName;

}
