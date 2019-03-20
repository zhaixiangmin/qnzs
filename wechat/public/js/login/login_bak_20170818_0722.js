/**------登录按钮------**/


  flay =false;
function login(){
	
//	$('.useInfor .urow .tygys_1').css('display', 'block');
     
	   if(flay ==true){
	
	   	    flay =false;
//	   	    return ;   .Are you sure? Image will be deleted....
	  	    if($('#username').val() !=''&& $('#password').val() !=''){
					obj.ajax('/pc/account/login',{'mobile':$('#username').val(),'password':$('#password').val()},
					function(data){
						if(data.status=='OK'){
				           	alert(data.msg);
				            var nextUrl = GetQueryString("nextUrl");
				            if (!nextUrl) {
				            	nextUrl = "../../index.html";
				            }
			    		    window.location.href=nextUrl;
						}else{
				          }
					},function(){console.log('登录失败！')});
				}else{
					alert('用户名和密码不正确，请重新输入。')
				}
				
	    }else {
	    	
	    	$('#spa1').css('display','none');
		   	flay =true; 
		   	$('#sbumitBtn').html('登录')
		   	$('#sbumitBtn').css('background-color','#3ebb2b')  //登录按钮的背景颜色
		   	$('#area').hide();
		   	$('#rePassword_li').hide();
		   	$('#register').hide();
		   	$('#regist-box').hide()
	    } 
	
}


/*******************************  注册   *********************************/

    /**** 加载值市  *****/
	obj.ajax('/common/district/getShcool',{'provinceId': 440000,'type': 1},function(data){
		console.log(data);
		var html='';
		for(var i = 0 ;i<data.rows.length;i++){
		 html+='<option value="'+data.rows[i].did+'" >'+data.rows[i].districtName+'<option>'
		}
		$('#district').append(html);
	},function(data){})
	
	function register(){
	    
	    if($('#checkCode').val()==''){
	    	
	    	alert('请输入验证码');
	    	return ;
	    }
	    if($('#oidType option:selected').val()!='-1'){
	        //测试地区编码440303   CJJDX
			      var areaAndclass ;
			    	var oArea =  $('#oidType option:selected').val();     //获取地区或高校
			    	var areaAndclass1 = $('#areaOid option:selected').val() ;
			    	var areaAndclass2 = $('#classOid option:selected').val();

			    	 if(areaAndclass1!='-1'){
			    	 	
			    	 	areaAndclass =areaAndclass1 ;
			//  	 	alert(areaAndclass)
			    	 }
			    	 if(areaAndclass2 !='-1'){
			    	 	areaAndclass =areaAndclass2 ;
			//  	 	alert(areaAndclass)
			    	 }
//			          console.log(areaAndclass)
              console.log(oArea)
	    	      console.log(areaAndclass)
//	    	      return ;
	   	    if($('#password').val()==$('#rePassword').val()){
	   	    	       
				   	   	    obj.ajax('/pc/account/addAccount',{
						   	    'mobile':$('#username').val(),
						   	    'password':$('#password').val(),
						   	    'phoneCode':$('#checkCode').val(),       //校验码
						        'did':areaAndclass,  
						        'typeDistrict':oArea,            //高校或地区  int 如1
							},function(data){
							   if(data.status=='OK'){
							   	    alert(data.msg); 
							   	    
						          var nextUrl = GetQueryString("nextUrl");
				             if (!nextUrl) {
				            	nextUrl = "../../index.html";
				              }
			    		        window.location.href=nextUrl;
						        
					        }else{
						          alert(data.msg); 
					        };
							},function(data){})
	   	    }else {
	   	    	alert('密码与重置的密码不一致，请重新输入')
	   	   }
	    }else{
	   	  alert('请选择地市')
	    }
	}
    /*********** 校验用户是否已经注册  ************/
//   $('.regist-box').hide();
    $('#username').blur(function(){
    	console.log($('#username').val())
	   if( $('#username').val()!=''){
	       obj.ajax('/commons/checkMobile',{'mobile':$('#username').val()},function(data){
	            console.log(data);
	            if(data.status =='ERROR'){
		           	$('#spa1').css('display','block') //.html('该账号已经注册,请在下方登录');
		            $('#sbumitBtn').html('登录')
		            $('#sbumitBtn').css('background-color','#3ebb2b')  //登录按钮的背景颜色
		            $('#area').hide();  //地区
		            $('#register').hide();  //注册
		            $('#regist-box').hide();
		           	flay=true;
	            }
	            
	            if(data.status == 'OK'){
	            	  $('#title').html('手机号注册')    //修改标题
	                $('#area').show();  //地区
	                $('#spa1').css('display','block');
	                $('#spa1').html('手机号可以注册使用').css('color','red');
	                $('#sbumitBtn').hide(); // 登录
	                $('#register').show();
	                $('#regist-box').show();
	                $('#checkCode').val('')//验证码清空
	            }
	        },function(data){})
	   }else{
	   	alert('请输入用户名')
	   }	
	});
   
     $('#checkCode').val('')//验证码清空     
    /************** 发送验证码  ************/
       Code_flay =true;
    function sendYanzhengCode(){
       
       if(Code_flay ==true){
       	    Code_flay =false;
	        obj.ajax('/pc/account/createSecurityCode',{'phone':$('#username').val()},function(data){ 
					 console.log(data);
					 
				  },function(data){})
	        
	        
			    $('.sendSecurityCodeGray').css('display','none')
			
		      $('.sendSecurityCodeGreen').css({'display':'block','font-size':'14px'})   
		      $('.sendSecurityCodeGreen').html('(<em>60</em>)秒后可以重发');
		    
		      var  time =setInterval(function(){
		    	$('.sendSecurityCodeGreen em').html($('.sendSecurityCodeGreen em').html()-1);
		    	if($('.sendSecurityCodeGreen em').html()<=0){
		    		   Code_flay =true ;  //重新打开锁
		    		  clearInterval(time);
		    		  $('.sendSecurityCodeGreen').html('重发验证码')
		    	}
		   	    },1000);
       }
      
    }
 
   	
 function GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null)
					return unescape(r[2]);
				return null;
	}  	    
   	    
 