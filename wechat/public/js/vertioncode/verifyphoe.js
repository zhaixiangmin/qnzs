//获取手机号
var phone =JSON.parse( $.cookie('getpsd')).mobile
var s = phone.slice(0,phone.length-4);
$('.phone_txt').html(s+"****");


//验证/替换手机号提交
$('.suergur').click(function(){
	
    //图片验证码
    if($('#suerpaserd').val()==""){
        alert("图片验证码不能为空！");    	
    	return ;
    }
    //图片验证码
    if($('#suernumber').val()==""){
        alert("短信验证码不能为空！");    	
    	return ;
    }
    console.log(phone) 
    console.log($('#suernumber').val())
     console.log($.cookie('__accessToken'))
     
    
    $.ajax({
	   	type:"post",
	   	url:Qnzs.path+"/pc/accountAppeal/validMobile",
	   	async:true,
	   	data:{
	        "mobile": phone,// 手机号
	        "phoneSecurityCode": $('#suernumber').val(),//验证码
	        "validType": "vaild",//验证类型   -验证
	        "accountToken": $.cookie('__accessToken'),//一号通接口
	    },
	   	success:function(data){
	   		if(data.errorcount==99){
	   			window.location.href = "succedpasswrd.html" ;//
	   		}else{
	   			window.location.href = "succeed.html" ;//
	   		}
	   	  		
	   	  		
	   	}
	});
    
    
})


/***************************  获取验证码**********************************/
/**** 点击获取验证码  ******/
       
    Code_flay =true;
function sendYanzhengCode(){
	
	var validCode= $("#suerpaserd").val();
     if(!validCode){

		     $.alert('图片验证码不能为空!')
		  	return;
    }
  if($('.newphone').val()!=''){
  	  
	    if(Code_flay ==true){
            Code_flay =false;
        	obj.ajax('/pc/accountAppeal/createSecurityCodeSend',{'phone':phone,'appealImageValidCode':$('#suerpaserd').val()+"",'validType':"vaild"},function(data){
			console.log(data);
			if(data.status == 'OK') {
						
					console.log(data.msg)
					$('.msgCode').html('(<i class="seconde">60</i>)秒后可以重发');
			     	
				    var  time =setInterval(function(){
					   	$('.seconde').html($('.seconde').html()-1);
					    if($('.seconde').html()<=0){
					    		   //重新打开锁
					    		   Code_flay =true ; 
					    		  clearInterval(time);
					    		  $('.msgCode').html('重发验证码')
					    	}
				   	},1000);
				   	
			} else {
				Code_flay =true ; 
					$.alert(data.msg)
					//currentAccount = data.account; // 账户信息
					
			    }
			
		    } ,function(data){})
	          
	    }
   }else{
    	$.alert('手机号不能为空')
    } 	
}

/**************   图片流   **************/
function  changeModel(){
					
		var xmlhttp;
		   
		xmlhttp=new XMLHttpRequest();
		//xmlHttp = createXMLHttpRequest();
		xmlhttp.open("GET",Qnzs.path+"/pc/accountAppeal/validCode",true);
		xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");  
		xmlhttp.setRequestHeader("Content-Type", "application/xml"); 
		xmlhttp.withCredentials = true;
		xmlhttp.responseType = "blob";
		xmlhttp.onload = function(){
		    console.log(this);
		    if (this.status == 200) {
		        var blob = this.response;
		        var img = document.getElementById("imagesyanz");
		        img.onload = function(e) {
		            window.URL.revokeObjectURL(img.src); 
		        };
		        img.src = window.URL.createObjectURL(blob);
		        
		        
		    }
		}
		xmlhttp.send();
				
}
      changeModel();//c初始化图片流
      