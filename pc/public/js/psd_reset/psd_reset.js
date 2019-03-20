      /*************** blur  失焦判断 *********************/
     $('#mobile').blur(function(){
     	
	     if($(this).is("#mobile")){            //手机号判断
						var ph=/^1[3|5|7|8|4][0-9]{9}$/
						if($("#mobile").val()!=""){
						if(!(ph.test($("#mobile").val()))){
							$(".spa2").text("请输入正确手机号");
							$(this).css("border","1px solid #BD362F")
							code_flay = false;  //给发送验证码解锁
							return false;
						}else if(ph){
							$(".spa2").text("");
							return true;
						}
						}else{
							$(".spa2").text("");
						}
					}
	      
     	
     })
     
      
      /**** 调用安全验证码   ******/
      
     obj.ajax('/pc/account/securityCode',{},function(data){
					console.log(data);
					if(data.status == 'OK') {
							
							 n =data.msg
					} else {
						currentAccount = data.account; // 账户信息
						console.log('currentAccount', currentAccount);
					}
				
	    } ,function(data){})
       
        /**** 点击获取验证码  ******/
       
         code_flay = true ;  //给发送验证码加锁
        $('#get-yangzhengcode').click(function(){
        	
        	  var validCode= $("#imageVal").val();
			          if(!validCode){
				
				     alert('图片验证码不能为空!')
			      	return;
			         }
			
        
        	if(code_flay){
        		    code_flay = false ;  //给发送验证码加锁
		        	  if($('#mobile').val()!=''){
		        	  	
						      obj.ajax('/pc/account/updatePasswordSecurityCodea',{'phone':$('#mobile').val(),'securityCode':n,'updatePasswordValidCode':$("#imageVal").val()},function(data){
													console.log(data);
													if(data.status == 'OK') {
															
														   alert(data.msg)
															 
												       $('#get-yangzhengcode').html('(<em>60</em>)秒后可以重发');
												    
												       var  time =setInterval(function(){
													    	$('#get-yangzhengcode em').html($('#get-yangzhengcode em').html()-1);
															    	if($('#get-yangzhengcode em').html()<=0){
															    		   code_flay = true;  //给发送验证码解锁
															    		  clearInterval(time);
															    		  $('#get-yangzhengcode').html('重发验证码');
															    	}
												   	    },1000);
															 
															 
															 
														} else {

                                                        $.
                                                        $.alert(data.msg)
															currentAccount = data.account; // 账户信息
															console.log('currentAccount', currentAccount);
															code_flay = true;  //给发送验证码解锁
														}
									
								  } ,function(data){})
		        	  }else {

                          $.alert('请输入手机号')
		        	  	code_flay = true;  //给发送验证码解锁
		        	  }
        	}
              
			        	
        	
        })
     
       
          
          
 	    var mobile  = $('#mobile').val();   //手机号
 	
 	    var userPassword = $('#userPassword').val();    //密码
 	    var confirmPassword = $('#confirmPassword').val()  //确认密码
      
      //提交重置  
    	function resetBtn(){   
    	  var ph=/^1[3|5|7|8|4][0-9]{9}$/;    //手机号正则
    	  if(ph.test($("#mobile").val())) {
    	  	if($('#userPassword').val()+''== $('#confirmPassword').val()+''){
    			 
	        	obj.ajax('/pc/account/resetPassword',{
		 	    	'phoneSecurityCode':$('#emailVal').val(),  //验证码
		 	    	'newPassword':$('#userPassword').val(),  //新密码
		 	    	'phone':$('#mobile').val()             //用户ID
		 	    },function(data){
		 	    	
	   	        	console.log(data);
	   	        	if(data.status=='OK'){

                        $.alert(data.msg);
				          window.location.href='../../index.html';
			        }else{
                        $.alert(data.msg);
			        	
			        };
		 	    },function(){});
	        	
	        }else{

                $.alert('密码和重置密码不一致！')
	        	
	        }
    	  	
    	  }else{
    	  	if($("#mobile").val()==""){
						$(".spa2").text('正确的手机号码')
					} 
    	  	
    	  }
    	    
	    		
    	}
       