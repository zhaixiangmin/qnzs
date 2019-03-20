//获取手机号
var phone =JSON.parse( $.cookie('getpsd')).mobile
//var s = phone.slice(0,phone.length-4);
//$('.phone_txt').html(s+"****");
//提交验证

$('.suergur').click(function(){
	
	//手机号
	if($('#newpaserd').val()==""){
		$.alert("请输入手机号");
		return ;
	}
	//图片验证码
	if($('#suerpaserd').val()==""){
		$.alert("请输入图片验证");
		return ;
	}
	//短信验证码
	if($('#suernumber').val()==""){
		$.alert("请输入短信验证码");
		return ;
	}
	
	$.ajax({
	   	type:"post",
	   	url:Qnzs.path+"/pc/accountAppeal/validMobile",
	   	async:true,
	   	data:{
	        "mobile": phone,// 手机号
	        "newMobile": $('#newpaserd').val(),// 替换的手机号
	        "phoneSecurityCode": $('#suernumber').val(),//验证码
	        "validType": "replace",//验证类型   -验证
	        "accountToken": $.cookie('__accessToken'),//一号通接口
	    },
	   	success:function(data){
	   		if(data.status=="OK"){
	   			$.alert(data.msg).then(function(){
	   				window.location.href ="..//logoin/login.html";
	   			})
	   		}
	   		
	   	}
	});
	
	
})




//手机号校验
$(".padd_box input").blur(function(){
	
	if($(this).is(".newphone")){             //姓名判断
		var na=/^1(2|3|4|5|6|7|8|9)\d{9}/;
		if($(".newphone").val()!=""){
			if(!(na.test($(".newphone").val()))){
				
				$(this).css("border","1px solid #BD362F")
				$.alert("请输入正确手机号")
				return false;
			}else if(na){
				$(this).css("border","none");
				
				//手机号是否已验证判断
				 obj.ajax('/commons/checkMobile',{'mobile':$('#newpaserd').val()},function(data){
			            console.log(data);
			            if(data.status =='ERROR'){
				           	$.alert("该手机号已注册，请更换！");
			            }
			            if(data.status == 'OK'){
			            	//Code_flay= false;////该账号没有注册,请在下方   加锁
			            	$.alert("该手机号没有注册，请注册再登陆！");
			            }
			        },function(data){})
				return true;
			}
		}else{
			
		}
	}
	
	
})

/***************************  获取验证码**********************************/
/**** 点击获取验证码  ******/
       
    Code_flay =true;
function sendYanzhengCode(){
	
	var validCode= $(".imgcode").val();
     if(!validCode){

		     $.alert('图片验证码不能为空!')
		  	return;
    }
  if($('.newphone').val()!=''){
  	  
	    if(Code_flay ==true){
            Code_flay =false;
        	obj.ajax('/pc/accountAppeal/createSecurityCodeSend',{'phone':$('#newpaserd').val(),'appealImageValidCode':$('#suerpaserd').val(),"validType":"replace"},function(data){
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
      