/****  验证 ******/



				$("#userName").focus()
		
		/************************  失焦判断  **********************************/
	
			$(".right_box input").blur(function(){
			 
			   
				$(".spa").css("color","#BD362F")
				if($(this).is("#userName")){             //姓名判断
					var na=/^[\u4e00-\u9fa5a-zA-Z]{2,7}$/
					if($("#userName").val()!=""){
						if(!(na.test($("#userName").val()))){
							$(".right_box .spa1").text("请输入2-7个汉字或英文");
							$(this).css("border","1px solid #BD362F")
							return false;
						}else if(na){
							//$(".spa1").text("");
						      $(".spa1").html('<img style="width:20px;height:20px;margin-top:8px;margin-left:5px;  " src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171207/20171207163742_598duigou.png">');
							
							return true;
						}
					}else{
						$(".spa1").text("");
					}
				}
				if($(this).is("#mobile")){            //手机号判断
					var ph=/^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/
					if($("#mobile").val()!=""){
					if(!(ph.test($("#mobile").val()))){
						$(".spa2").text("请输入正确手机号");
						$(this).css("border","1px solid #BD362F")
						 Code_flay =false;     //给发送验证码枷锁
						 // $('#yangzheng').css('background','#c8c8c8');//验证码高亮
						return false;
					}else if(ph){
						//$('#yangzheng').css('background','#3ebb2b');//验证码高亮
						//$(".spa2").text("");
						 Code_flay =true;     //给发送验证码解锁

						return true;
					}
					}else{
						$(".spa2").text("");
					}
				}
				
				if($(this).is("#checkCode")){            //验证码
					var yz=/^\d{6}$/;
					if($("#checkCode").val()!=""){
					if(!(yz.test($("#checkCode").val()))){
						$(".spa3").text("请输入正确的验证码");
						$(this).css("border","1px solid #BD362F")
						return false;
					}else if(yz){
						//$(".spa3").text("");
						
						$(".spa3").html('<img style="width:20px;height:20px;margin-top:8px;margin-left:5px;  " src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171207/20171207163742_598duigou.png">');
						
						return true;
					}
					}else{
						$(".spa3").text("");
					}
				}
				
				
				
				
				
				
				
				if($(this).is("#userPassword")){            //密码
					var mm=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
					if($("#userPassword").val()!=""){
					if(!(mm.test($("#userPassword").val()))){
						$(".spa4").text("输入6至12位的数字\英文组合的密码");
						$(this).css("border","1px solid #BD362F")
						return false;
					}else if(mm){
						//$(".spa4").text("");
						$(".spa4").html('<img style="width:20px;height:20px;margin-top:8px;margin-left:5px;  " src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171207/20171207163742_598duigou.png">');
						
						return true;
					}
					}else{
						$(".spa4").text("");
					}
				}
				
				if($(this).is("#confirmPassword")){            //确认密码
					
					if($("#userPassword").val()!=$("#confirmPassword").val()){
						$(".spa5").text("与初始密码不对！");
						$(this).css("border","1px solid #BD362F")
						return false;
				
					}else{
						$(".spa5").html('<img style="width:20px;height:20px;margin-top:8px;margin-left:5px;  " src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171207/20171207163742_598duigou.png">');
						$(this).css("border","1px solid #aaa")
					}
				}
				
			})
		/********************** 聚焦提示 ************************/	
			$("input").focus(function(){
				if($(this).is("#userName")){
					$(".spa1").text("请输入2-7个汉字或英文").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				if($(this).is("#mobile")){
					$(".spa2").text("11位手机号码").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				
				
				if($(this).is("#checkCode")){     //验证码
					$(".spa3").text("请输入正确的验证码").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				if($(this).is("#userPassword")){     //密码
					$(".spa4").text("输入6至12位的数字\英文组合的密码").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				if($(this).is("#confirmPassword")){     //确认密码密码
					$(".spa5").text("输入6至12位的数字\英文组合的密码").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
			})
		/*********************** 提交验证 ***************************/
		

        /**** 验证手机号是否可以注册 *****/
	    function sendYanzhengCode(){
	    	if(Code_flay){
	    		
		    	if($('#mobile').val() !=''){
			    	obj.ajax('/commons/checkMobile',{'mobile':$('#mobile').val()},function(data){   //校验手机是否注册
			      	  	console.log(data);
			      	    if(data.status=='OK'){
					          alert(data.msg); 
					         getYanzhengCode()  //调用发送验证码函数 
				        }else{
					          alert(data.msg); 
				        };
			      	},function(data){})
		    	}else{
		    		alert('手机号不能为空')
		    	}
		    	
	    	}
	    	
        }
		/**** 发送验证码 ****/   
	    Code_flay =true;  
		function getYanzhengCode(){
			
			  var validCode= $("#checkCodeiamge").val()
			if(!validCode){
				
				alert('图片验证码不能为空!')
				return;
			}
			
			
			
			if(Code_flay ==true){
		       	    Code_flay =false;
			        obj.ajax('/pc/account/createSecurityCodeSend',{'phone':$('#mobile').val(),'validCode':$("#checkCodeiamge").val()},function(data){ 
							console.log(data);
							if(data.status=='OK'){
								   $('#yangzheng').css('display','none')
							       $('#yangzheng').css({'display':'block','font-size':'14px'})   
							       $('#yangzheng').html('(<em>60</em>)秒后可以重发');
							    
							       var  time =setInterval(function(){
								    	$('#yangzheng em').html($('#yangzheng em').html()-1);
								    	if($('#yangzheng em').html()<=0){
								    		
								    		   Code_flay =true ;  //重新打开锁
								    		  clearInterval(time);
								    		  $('#yangzheng').html('重发验证码');
								    	}
							   	    },1000);
								
							}else{
								alert(data.msg);
								 Code_flay =true ; 
							}
                               
				    },function(data){})
			        //延时器打开锁 
                           
                    var timer2 =setTimeout(function(){
                     	Code_flay =true ;
                    },60000)
			        
				   
		    }  
		}
			
		
			$("#registerBtn").click(function(){
				var na=/^[\u4e00-\u9fa5a-zA-Z]{2,7}$/;   //姓名正则
				var ph=/^1[1|2|3|4|5|6|7|8|9][0-9]{9}/;    //手机号正则
				var yz=/^\d{6}$/;    //验证码
				var mm =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//密码正则
				
//				if($('#areaOid option:selected').val()=='-1'&&$('#classOid option:selected').val()=='-1'){
//				 
//					$("#spa8").text("请选择地市或高校").css("color","#BD362F")
//					alert('请完善地区资料')
//					return ;
//					
//				};   
					if(!$('#inp_Agreement').is(':checked')) {
					   alert('请选择用户协议');
					   return ;
					}
                   
                    var areaAndclass ='';
                 	var areaAndclass1 = $('#cityOid option:selected').val() ;
					var areaAndclass2 = $('#shcoolOid option:selected').val();
                    
			    	if(areaAndclass1!='-1'){
			    	 	areaAndclass =areaAndclass1 ;
			    	}
			    	if(areaAndclass2 !='-1'){
			    	 	areaAndclass =areaAndclass2 ;
			    	}
                    if(areaAndclass ==''){
                    	
                    	alert('请完善所属地区资料');
                    	return;
                    }

				
				
				if(na.test($("#userName").val())&&ph.test($("#mobile").val())&&yz.test($("#checkCode").val())&&mm.test($("#userPassword").val())){
					
						    var userName =  $('#userName').val()   //昵称
					 	    var mobile   = $('#mobile').val();   //手机号
					 	    var checkCode =$('#checkCode').val();  //验证码
					 	    var userPassword = $('#userPassword').val();    //密码
					 	    var confirmPassword = $('#confirmPassword').val()  //确认密码
					 	  
					 	   
					        var areaAndclass ;
					        var cityAndshcool ;
					    	var oArea =  $('#oidType').val();     //获取地区或高校
					    	var areaAndclass1 = $('#areaOid').val() ;
					    	var areaAndclass2 = $('#classOid').val();
					    	var cityAndshcool1 = $('#cityOid').val() ;  //地址
					    	var cityAndshcool2 = $('#shcoolOid').val();  //高校
					    	
					       
					        if(cityAndshcool1!='-1'){
					    	 	areaAndclass =cityAndshcool1 ;
					    	}
					    	if(cityAndshcool2 !='-1'){
					    	 	areaAndclass =cityAndshcool2 ;
					    	} 
					    	if(areaAndclass1!='-1'){
					    	 	areaAndclass =areaAndclass1 ;
					    	}
					    	if(areaAndclass2 !='-1'){
					    	 	areaAndclass =areaAndclass2 ;
					    	}
					          console.log(areaAndclass)
					          
					         
					        if(userPassword == confirmPassword){
					        	 
					        	 obj.ajax('/pc/account/addAccount',{
					        	 	'accountToken':$.cookie('__accessToken'),
					 	    	    'realname':userName,          //昵称
						 	    	'mobile':mobile,             //手机号
						 	    	'password':userPassword,     //密码
						 	    	'typeDistrict':oArea,            //高校或地区  int 如1
						 	    	'phoneCode':checkCode,       //校验码
						 	    	'did':areaAndclass,            // 地区id
						 	    	'photoUrl':'//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20170912/20170912113714_3041%20(14).jpg'
						 	    },function(data){
						 	    	
					 	        	console.log(data);
					 	        	if(data.status=='OK'){
							          alert(data.msg);               
					 	        		
//							            var nextUrl = GetQueryString("nextUrl");
//										if (!nextUrl) {
//											nextUrl = "../../index.html";
//										}
//										window.location.href=nextUrl;
										window.location.href = bigDataUrl+'/account/accountRegister.html?appId=0110&finishurl='+ctx;

							        }else{
								          alert(data.msg); 
							        	
							        };
						 	    },function(){});
					        	
					        }else{
					        	
					        	alert('两次输入的密码不一致！')
					        	
					        }
					
				}else{
					if($("#userName").val()==""){
						$(".spa1").text('请你填写用户名')
					} 
					if($("#mobile").val()==""){
						$(".spa2").text('请你填写手机号')
					} 
					if($("#checkCode").val()==""){
						$(".spa3").text('请填写你的验证码')
					}
					if($("#userPassword").val()==""){
						$(".spa4").text('请填写你的密码')
					}
					if($('#oidType  option:selected').val()=='-1'){
					
					    $("#spa8").text("请选择地市或高校").css("color","#BD362F")
					}else{
						
						$("#spa8").text("请选择地市或高校").css("color","#BD362F");
					}
					return false;
				}
			})
//获取浏览器的路径			
function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
    }  	