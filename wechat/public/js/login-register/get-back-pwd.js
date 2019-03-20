

      
//cookit存储数据

function   submit_btn(){
	
	if($('#mobile').val()==''){
		
	    $.alert("手机号不能为空");
	    return ;
		
	}
	if($('#imageVal').val()==''){
		
		$.alert("图片验证不能为空");
	    return ;
	}
	if($('#verification').val()==''){
		$.alert("短信不能为空");
	    return ;
		
	}
	
	//校验验证码
	
	//校验验证码
	obj.ajax("/pc/account/checkMobileValidCodeByPassword",{ 'mobile':$('#mobile').val(),"phoneCode":$('#verification').val()},function(data){
		
		if(data.status =="OK"){
			
			Code_flay =true;
			 //手机号没有注册可以提交
  
		    if(Code_flay){
		   	     //存储数据
					    var getpsdObj = {
						    mobile:$('#mobile').val(),
						    imageVal:$('#imageVal').val(),
						    phoneSecurityCode:$('#verification').val()
						     
					    };
						  getpsdObj = JSON.stringify(getpsdObj);
						  $.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
					    console.log($.cookie('getpsd'))
							
					    window.location.href="set-password.html"; //
		    }else{
		    	
		    	$.alert("请输入正确的手机号！");
		    }
			
			
		}else {
			
			Code_flay =false;
	      		$.alert("短信验证码不正确！")
		}
		
	})
	
	
	
	
}



//手机验证
 $('#mobile').blur(function(){
 	
     if($(this).is("#mobile")){            //手机号判断
		var ph=/^1[2|3|4|6|5|7|8|9][0-9]{9}$/
			if($("#mobile").val()!=""){
				if(!(ph.test($("#mobile").val()))){
					$.alert("请输入正确手机号");
					    //$(this).css("border","1px solid #BD362F")
						// $('.btn_verification').css('background','#c8c8c8');//验证码高亮
					  Code_flay =false;
					return false;
				}else if(ph){
					$(".spa2").text("");
					Code_flay =true;
							 $('.btn_verification').css('background','#007AFF');//验证码高亮
					return true;
				}
			}else{
				//$(".spa2").text("");
			}
		}
      
 	
 }) 
 
 
 /**** 调用安全验证码   ******/
  
//obj.ajax('/pc/account/securityCode',{},function(data){
//			console.log(data);
//			if(data.status == 'OK') {
//					
//					 n =data.msg
//			} else {
//				currentAccount = data.account; // 账户信息
//				console.log('currentAccount', currentAccount);
//			}
//
//} ,function(data){})

/**** 点击获取验证码  ******/
       
    Code_flay =true;
function sendYanzhengCode(){
	
	var validCode= $("#imageVal").val();
     if(!validCode){

		     $.alert('图片验证码不能为空!')
		  	return;
     }
		
     
	  if($('#mobile').val()!=''){
	  	  
		    if(Code_flay ==true){
		    	
		    	   
		            Code_flay =false;
		        	obj.ajax('/pc/account/updatePasswordSecurityCodea',{'phone':$('#mobile').val(),'updatePasswordValidCode':$('#imageVal').val()},function(data){
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
							currentAccount = data.account; // 账户信息
							console.log('currentAccount', currentAccount);
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
		xmlhttp.open("GET",Qnzs.path+"/pc/account/updateValidCode",true);
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
      
/************************************  手机号申诉部分   ***********************************************/
//  去申诉
function toNotcode(){
	
	 if(!Code_flay){
	 	return ;
	 }
	
	
	if($('#mobile').val()==''){
	    $.alert("手机号不能为空");
	    return ;
	}
	 //存储数据
	var getpsdObj = {
	    mobile:$('#mobile').val(),
	};
	  getpsdObj = JSON.stringify(getpsdObj);
	  $.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
	 console.log($.cookie('getpsd'))
		
	 
	 
	 
	  $.ajax({
		   	type:"post",
		   	url:Qnzs.path+"/pc/accountAppeal/accountList",
		   	async:true,
		   	data:{
		        "mobile": $('#mobile').val(),// 用户ID
		    },
		   	success:function(data){
		   		
		   	    
		   	    if(data.dataList.length>0){
		   	  	
		   	  	 window.location.href="../vertioncode/notcode.html";
		   	    }else{
		   	    	
		   	    	alert("该手机号还没有注册过青年之声！");
		   		
		   	    }
		   	}
		});
	 

	 }



