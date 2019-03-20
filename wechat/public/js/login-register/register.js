//下一部
var nextUrl;
$(function () {
    nextUrl =Utils.getQueryString("nextUrl");
})

$('.submit_btn').click(function(){
	
	
	if($('#mobile').val()==''){
		
	    $.alert("手机号不能为空");
	    return ;
		
	}
	if($('#imageVal').val()==''){
		
		$.alert("图片验证码不能为空");
	    return ;
	}
	if($('#verification').val()==''){
		$.alert("短信验证码不能为空");
	    return ;
		
	}
	//校验验证码
	obj.ajax("/pc/account/checkMobileValidCode",{ 'mobile':$('#mobile').val(),"phoneCode":$('#verification').val()},function(data){
		
		if(data.status =="OK"){
			
			Code_flay =true;
			 //手机号没有注册可以提交
  
		    if(Code_flay){
		   	    //存储数据
			    var regiterObj = {
				    mobile:$('#mobile').val(),  //手机号
				    imageVal:$('#imageVal').val(),  //图片验证码
				    phoneSecurityCode:$('#verification').val()  //短信验证码
			    };
				regiterObj = JSON.stringify(regiterObj);
				$.cookie('regiterObj', regiterObj, {path: '/'}); // 存储到cookie(区域)
				    console.log($.cookie('getpsd'))
				if (nextUrl){

                    window.location.href="register2.html?nextUrl="+nextUrl; //
				}else {
                    window.location.href="register2.html"; //
				}

		    }else{
		    	
		    	$.alert("请输入正确的手机号！");
		    }
			
			
		}else {
			
			Code_flay =false;
	      		$.alert("短信验证码不正确！")
		}
		
	})
	
	
})


/*********************************       手机号正则验证          ***********************************************/



var  Code_flay  =true ;
$('#mobile').bind( 'input propertychange' ,   function(){
       if($(this).val().length==11){
    	  
    	   		
    	   		      if($(this).is("#mobile")){            //手机号判断
						var ph=/^1[2|3|4|5|6|7|8|9][0-9]{9}$/
						if($("#mobile").val()!=""){
						if(!(ph.test($("#mobile").val()))){
							 Code_flay =false;     //给发送验证码枷锁
							$.alert('请填写正确的手机号！')
							//return false;   //验证失败
						}else if(ph){
							//$(".spa2").text("");
							 Code_flay =true;     //给发送验证码解锁
							 
							//return true;  //验证成功
						}
						}else{
							//$(".spa2").text("");
						}
					}
			    	console.log(Code_flay)
			    	if($('#mobile').val()==''){
			       	    Code_flay =false;
			       	  
				   	    $('#spa1').html('请输入手机号码').css('color','red');
			       	 
			       }
    	   		   if(Code_flay){
	   	  
	   	
			       obj.ajax('/commons/checkMobile',{'mobile':$('#mobile').val()},function(data){
			            console.log(data);
			            if(data.status =='ERROR'){
				           $.alert("该手机号已注册，请重新输入！");
				           	Code_flay= false;//该账号已经注册,请在下方登录   解锁
			            }
			            
			            if(data.status == 'OK'){
			            		Code_flay= true;////该账号没有注册,请在下方直接注册  加锁
			            	
			            }
			        },function(data){})
			   }else{
			    $('#spa1').css('display','block');
			   
			   	$('#spa1').html('请输入正确手机号').css('color','red');
			   }	
    	   	
    	}else{
    		
    		Code_flay= false;//该账号已经注册,请在下方登录   解锁
    	}
	   
});

/*******************************************     发送验证码  ************************************/
   
  
     
    function sendYanzhengCode(){
    	
	   	
        if($('#mobile').val()==''){
       	    Code_flay =false;
       	    return;
        }
         var validCode= $("#imageVal").val()
			if(!validCode){
				
				alert('图片验证码不能为空!')
				return;
			}
       
       if(Code_flay){
       	    Code_flay =false;
       	   
	        obj.ajax('/pc/account/createSecurityCodeSend',{'phone':$('#mobile').val(),'validCode':$("#imageVal").val()},function(data){ 
					 console.log(data);
					 
					 if(data.status=='OK'){
					 	$.alert(data.msg);
					 	 Code_flay =true ; 
				          
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
						
					}else{
						$.alert(data.msg);
						Code_flay =true ; 
					}
		    },function(data){})
	        //延时器打开锁 
                           
            var timer2 =setTimeout(function(){
             	Code_flay =true ;
            },60000)
	        
       }else{
       	
       	  $.alert("手机号码已注册！")
       }
      
    }

/****************************   图片验证码   流       ********************************/
function  changeModel(){
		
		var xmlhttp;
		   
		xmlhttp=new XMLHttpRequest();
		//xmlHttp = createXMLHttpRequest();
		xmlhttp.open("GET",Qnzs.path+"/pc/account/validCode",true);
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
changeModel() ;   //初始化图片流

