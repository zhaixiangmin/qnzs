
		$(function () {
	
   
	     getToken();
	     
    });
    
    function getToken(){
	      var localAccessToken = $.cookie('__accessToken'); //获取本地accessToken
	      console.log(localAccessToken)
	      //alert(localAccessToken);
		  if(!localAccessToken){//在一号通返回__accessToken之前循环调用该方法，直到返回
		  	
			var time= setTimeout("getToken()",100);return;
		  }else{
		     
			// window.location.href = ctx + '/bd/grant?number='+random;
			 //getAccessTokenAndLogin();
			
			  clearInterval(time);
		  }
    }
    
		function  getAccessTokenAndLogin() {
			
		
			var mobile=$('#username').val();
			var password=$('#password').val()
			var accessToken=$.cookie('__accessToken');
			var data={'mobile':mobile,
			         'password':password,
			         'accessToken':accessToken
			}
			
		$.ajax({
			type:"post",
			data:data,
			url:Qnzs.path+"/pc/bigData/accountValidate",
			success:function(data){
				
			 if(data.status=='OK') {
				   
				 if(!confirm(data.msg)){
				    	return
				    }
				 $('#username').val('');
				 $('#password').val('')
		             history.back();
			}else{
		     	 if(!confirm(data.msg)){
				    	
				    	return
				    }
		            $('#username').val('');
				 $('#password').val('')
		     	 history.back();
		    }
				
			}
			
		});
		
		
		
		
		
			
		}
		