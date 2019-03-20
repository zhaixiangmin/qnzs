var nextUrl;
$(function () {
     nextUrl =Utils.getQueryString("nextUrl");
})

//失焦判断
var Code_flay =true;    
$('#newPassword').blur(function(){
	if($(this).is("#newPassword")){            //6-16位数字及字母组合的密码！
			var ph=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
			
			if($("#newPassword").val()!=""){
			if(!(ph.test($("#newPassword").val()))){
				 Code_flay =false;     //给发送验证码枷锁
				$.alert('请输入6-16位数字及字母组合的密码！')
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
//下一部
$('.submit_btn').click(function(){
	if(!Code_flay){
		
		$.alert("请输入正确的密码(6-16位数字字母组合)");
	    return ;
	}
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

    //数据存储到cookie
    var  regiterObj = JSON.parse( $.cookie('regiterObj'));  //获取存储的cookit对象
        regiterObj.newPassword =$('#newPassword').val();   //密码
        
        regiterObj = JSON.stringify(regiterObj);
	   $.cookie('regiterObj', regiterObj, {path: '/'}); // 存储到cookie(区域)
      if (nextUrl){
          window.location.href="register3.html?nextUrl="+nextUrl; //
	  }else {

          window.location.href="register3.html"; //
	  }

	
	
})
