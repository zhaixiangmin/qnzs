console.log($.cookie('getpsd'))

//失焦判断
var Code_flay =true;    
$('#newPassword').blur(function(){
	if($(this).is("#newPassword")){            //手机号判断
			var ph=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
			
			if($("#newPassword").val()!=""){
			if(!(ph.test($("#newPassword").val()))){
				 Code_flay =false;     //给发送验证码枷锁
				$.alert('请输入(6-16位数字字母组合)的密码！')
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
	
})
var reset_pass=true;
$('.submit_btn').click(function(){
	
	if(!Code_flay){
		
		$.alert('请输入(6-16位数字字母组合)的密码！')
		return;
	};
	
	if($('#newPassword').val()==''){
		
	    $.alert("密码不能为空");
	    return ;
	}
	if($('#turepassword').val()==''){
		$.alert("确认密码不能为空");
	    return ;
	}
	if($('#turepassword').val()!=$('#newPassword').val()){
		$.alert(" 密码与确认密码不一致");
	    return ;
	}

	
	reset_pass =false;
	var  getpsdObj = JSON.parse( $.cookie('getpsd'));  //获取存储的cookit对象
    
    getpsdObj.newPassword =$('#newPassword').val();   //密码
    
      
//  getpsdObj = JSON.stringify(getpsdObj);
//	$.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
//  console.log($.cookie('getpsd'));
		
        console.log(getpsdObj)
       
	    if($('#newPassword').val()+''== $('#turepassword').val()+''){
	    	
	    	    var data={
	    			'phoneSecurityCode':getpsdObj.phoneSecurityCode,  //验证码
		 	    	'newPassword':getpsdObj.newPassword,  //新密码
		 	    	'phone':getpsdObj.mobile            //用户ID
	    	   }
	    		$.ajax({
	    			type:"post",
	    			url:Qnzs.path + "/pc/account/resetPassword",
	    			data:data,
	    			async:true,
	    			success:function(data){
	    				reset_pass=true;  //打开锁
		    				console.log(data);
			   	        	if(data.status=='OK'){
						           
						          alert(data.msg); 
						          window.location.href='login.html';
					        }else{
						          alert(data.msg); 
					        	
					        };
	    				
	    			}
	    		});
	    	
	    }else{
	    		reset_pass=true;  //打开锁
	    	alert('密码与确认密码不一致')
	    	
	    }

})
 
