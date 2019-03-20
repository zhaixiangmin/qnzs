$(function() { 
	    obj.ajax("/pc/account/quantRequest",{},function(data){

	    },function(data){});
    var nextUrl =Utils.getQueryString("nextUrl");
    if(nextUrl){

       $('#fast_reg').attr('href','register.html?nextUrl='+nextUrl);
	}
	     
});



function login(){
        if($('#password').val()==''){
        	$.alert("密码不能为空！");
        	return ;
        }
	   //  if($('#checkCodeamg_tow').val()==''){
       //
       // 	$.alert("图片验证码不能为空！");
       // 	return ;
       // }
       //验证手机号是否绑定过其他账户
       
	   /*if(Code_flay){*/
	 
	  	    if($('#username').val() !=''&& $('#password').val() !=''){
					obj.ajax('/pc/account/login',{'loginValidCode':$('#checkCodeamg_tow').val(), 'mobile':$('#username').val(),'password':$('#password').val(),'accountToken':$.cookie('__accessToken')},
					function(data){
						console.log(data)
						
						
						if(data.status =="ERROR"){
							
		            	    if(data.errorcount){
		            	    	//12. 是否绑定过其他用户   
		            	    	if(data.errorcount==99){
		            	    		
		            	    		//存储数据
									var getpsdObj = {
									    mobile:$('#username').val(),
									};
									getpsdObj = JSON.stringify(getpsdObj);
									$.cookie('getpsd', getpsdObj, {path: '/'}); // 存储到cookie(区域)
		            	    		
		            	    		
		            	          $.alert(data.msg).then(function(){
		            	          	
		            	          	window.location.href="../vertioncode/tologo.html"
		            	          })
		            	          	
		            	    	}
		   		            	if(data.errorcount>1){
						           	$.alert(data.msg)
						           	   $('.tucode').show() //显示图形验证码
						        }else{
						        	$.alert(data.msg)
						        	  $('.tucode').hide() //隐藏图形验证码
						        }
		   		            }
						}
						if(data.status=='OK'){
				           	$.alert(data.msg);

							var district = {
								sitenavOrgId: 440000, // 区域ID
								sitenavOrgName: '广东' // 区域名称
							};


							// 获取用户区域ID
							Qnzs.getDistrictIdByUserDistrictId({}).then(function (data) {
								// data.data = { // 造数据
								// 	districtId: 440100,
								// 	districtName: '广州'
								// };
								if(data.data) {
									district.sitenavOrgId = data.data.districtId; // 区域ID
									district.sitenavOrgName = data.data.districtName; // 区域名称
								}
							}).always(function () {
								// 存储到cookie
								var district_qnzs = {
									sitenavOrgId: district.sitenavOrgId, // 区域ID
									sitenavOrgName: district.sitenavOrgName // 区域名称
								};
								district_qnzs = JSON.stringify(district_qnzs);
								$.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)

								var nextUrl =Utils.getQueryString("nextUrl");
								if (!nextUrl) {
									nextUrl = "../../index.html";
								}
								window.location.href=nextUrl;
							});
						}else{
								$.alert(data.msg);
						}
						
					},function(){console.log('登录失败！')});
				}else{
					$.alert('用户名和密码不正确，请重新输入。')
				}
				
	    /*}else {
		   	flay =true; 
	    } 
	    */
	    
	    
	    
	
}


/************************************   验证码图片流   ***********************************/
$(function() { 
			  
			  
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
		/**********登陆 图片验证码**********/	
		var xmlhttp_tow;
			   
			xmlhttp_tow=new XMLHttpRequest();
			//xmlHttp = createXMLHttpRequest();
			xmlhttp_tow.open("GET",Qnzs.path+"/pc/account/loginValidCode",true);
			xmlhttp_tow.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");  
			xmlhttp_tow.setRequestHeader("Content-Type", "application/xml"); 
			xmlhttp_tow.withCredentials = true;
			xmlhttp_tow.responseType = "blob";
			xmlhttp_tow.onload = function(){
			    console.log(this);
			    if (this.status == 200) {
			        var blob = this.response;
			        var img = document.getElementById("imagesyanz_tow");
			        img.onload = function(e) {
			            window.URL.revokeObjectURL(img.src); 
			        };
			        img.src = window.URL.createObjectURL(blob);
			        
			        
			    }
			}
			xmlhttp_tow.send();
			
});

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
	
function  changeModel_tow(){
		
		var xmlhttp;
		   
		xmlhttp=new XMLHttpRequest();
		//xmlHttp = createXMLHttpRequest();
		xmlhttp.open("GET",Qnzs.path+"/pc/account/loginValidCode",true);
		xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");  
		xmlhttp.setRequestHeader("Content-Type", "application/xml"); 
		xmlhttp.withCredentials = true;
		xmlhttp.responseType = "blob";
		xmlhttp.onload = function(){
		    console.log(this);
		    if (this.status == 200) {
		        var blob = this.response;
		        var img = document.getElementById("imagesyanz_tow");
		        img.onload = function(e) {
		            window.URL.revokeObjectURL(img.src); 
		        };
		        img.src = window.URL.createObjectURL(blob);
		        
		        
		    }
		}
		xmlhttp.send();
		
	}		
	
/*********************************       手机号正则验证          ***********************************************/


    var  Code_flay  =true ;
    $('#username').blur(function(){
    	
    	   	
    	if($(this).is("#username")){            //手机号判断
			var ph=/^1[2|3|4|5|6|7|8|9][0-9]{9}$/
			if($("#username").val()!=""){
			if(!(ph.test($("#username").val()))){
				 //Code_flay =false;     //给发送验证码枷锁
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
    	if($('#username').val()==''){
       	    Code_flay =false;
       	  
	   	    $('#spa1').html('请输入手机号码').css('color','red');
       	 
       }
	   if(Code_flay){
	   	
	       obj.ajax('/commons/checkMobile',{'mobile':$('#username').val()},function(data){
	            console.log(data);
	            if(data.status =='ERROR'){
		           	$('#spa1').css('display','block') //.html('该账号已经注册,请在下方登录');
		            $('#sbumitBtn').html('登录')
		            $('#spa1').html(data.msg+',可直接登录。').css('color','red');
		           	flay=true;
		           	Code_flay= true;//该账号已经注册,请在下方登录   解锁
	            }
	            
	            if(data.status == 'OK'){
	            		Code_flay= false;////该账号没有注册,请在下方   加锁
	            	$.alert("该手机号没有注册，请注册再登陆！");
	            }
	        },function(data){})
	   }else{
	    $('#spa1').css('display','block');
	   
	   	$('#spa1').html('请输入正确手机号').css('color','red');
	   }	
});

























//什么是一号通  - 弹出窗
function one_indru(){

	
	$.alert('“一号通”   已接入  “青年之声” 、 “i志愿”等应用， “一号通”系统内的应用可实现“一个账号， 多个应用通行”，  用户可以注册使用   “一号通”账号直接登录以上应用。');
}

  //收不到验证码
   function show_yangzhengcode_info(){
   	
   	$.alert("<b>没有收到验证码？</b><br/><p style='margin-top:10px;'>1.请确认您已经输入了图形验证码并点击了<img src='../../public/img/111111.png' style='display: inline-block; '> 按钮；</p><p style='margin-top:10px;'>2. 点击发送短信验证码后，需隔60秒后才能再次发送验证码；</p><p style='margin-top:10px;'>3.同一手机号码一天只能发送5次验证码，如果尝试发送2-3次后仍然收不到验证码，可能处于注册高峰期，请间隔一段时间后再尝试发送。")
   	
   }
   

/*********** 获取链接路劲后的参数  *******************/

$(function(){
	
 	  

})
