
var phone =JSON.parse( $.cookie('getpsd')).mobile
	var s = phone.slice(0,phone.length-4);

//验证手机号是否绑定过其他账户
       
    
$.ajax({
	   	type:"post",
   	url:Qnzs.path+"/pc/accountAppeal/accountList",
   	async:true,
   	data:{
        "mobile": phone,// 用户ID
    },
   	success:function(data){
   		var data =data.dataList;
   		var html ="";
   		for(var i =0;i<data.length;i++){
			var realname = data[i].realname;
			realname= (realname==null || realname=="") ? "该用户很懒，还没设置昵称！" : realname;
			
   		 	html+='<li style="position: relative;"> <input type="radio" name="oldphone" realname="'+realname+'" username="'+data[i].username+'"   value="'+data[i].mobile+'"  style="position: absolute;top: 0.08rem;left: 0;"/>'
	     	html+='<div style="display: inline-block;width:70%;padding-left: 0.6rem;">'	  
	     	html+='<p class="p_txt"></label>昵称:<span>'+realname+'</span></p>'	  	
		    html+= '<p class="p_txt"><label></label>曾用手机号:<span>'+data[i].oldMobile+'</span></p>'		
		    html+='<p class="p_txt"><label></label>现用手机号:<span>'+data[i].mobile+'</span></p>' 		
	     	html+=' </div>'	 
	     	html+='</li>'
   		 	
   		}
   		$('.phone_list').html(html);
   	}
});

//确定
$('.suergur').click(function(){
	
	
	var obj =$("input[name=oldphone]:checked");
	//存储数据
	
//	var getpsdObj = {
//	    mobile:obj.attr("value"),
//	};
//	getpsdObj = JSON.stringify(getpsdObj);
//	$.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
var getpsdObj = {
	    username:obj.attr("username"),
	    realname:obj.attr("realname"),
	    mobile:obj.attr("value")  //现用手机号
	    
	};
	getpsdObj = JSON.stringify(getpsdObj);
	$.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
	console.log(JSON.parse( $.cookie('getpsd')))
    window.location.href="Accounts.html";
})
