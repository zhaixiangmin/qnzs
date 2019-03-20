/**------登录按钮------**/

$(function() { 
			    obj.ajax("/pc/account/quantRequest",{},function(data){
    	
			    	
			    },function(data){});
		});

flay =false;
function login(){
	
//	$('.useInfor .urow .tygys_1').css('display', 'block');
        
    
	   if(flay ==true){
	
	   	    flay =false;
//	   	    return ;   .Are you sure? Image will be deleted....
//          if(!$('#inp_Agreement').is(':checked')) {
//			   alert('请选择用户协议');
//			   return ;
//			}
            
            
	  	    if($('#username').val() !=''&& $('#password').val() !=''&&$('#checkCodeamg_tow').val()!=''){
	  	    
                  
					obj.ajax('/pc/account/login',{'loginValidCode':$('#checkCodeamg_tow').val(), 'mobile':$('#username').val(),'password':$('#password').val(),'accountToken':$.cookie('__accessToken')},
					function(data){
						console.log(data);
						if(data.status=='OK'){
				           	alert(data.msg);

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

								var nextUrl = GetQueryString("nextUrl");
								if (!nextUrl) {
									nextUrl = "../../index.html";
								}
								window.location.href=nextUrl;
							});
						}else{
								alert(data.msg);
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
		   	$('.gaoshi').hide();  //告示显示
		   	 $('.changeModel_tow_box').show() ;  //登陆图片验证码
//		   	$('#one_hao_tong').show()   //一号通的显示
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
	     
//	    if($('#checkCode').val()==''){
//	    	
//	    	alert('请输入验证码');
//	    	return ;
//	    }
	    if($('#oidType option:selected').val()!='-1'){
            //测试地区编码440303   CJJDX
	        var areaAndclass ;
	        var cityAndshcool ;
	    	var oArea =  $('#oidType').val();     //获取地区或高校
	    	var areaAndclass1 = $('#areaOid').val() ;
	    	var areaAndclass2 = $('#classOid').val();
	    	var cityAndshcool1 = $('#cityOid').val() ;  //地址
	    	var cityAndshcool2 = $('#shcoolOid').val();  //高校
	    	
	    	
	    	
	        if(cityAndshcool1!='-1'){
	    	 	areaAndclass =cityAndshcool1 ;
	    	 	$('#shcoolOid').val('-1');  //高校 
	    	}
	    	if(cityAndshcool2 !='-1'){
	    	 	areaAndclass =cityAndshcool2 ;
	    	 	$('#cityOid').val('-1') ;  //地址
	    	} 
	    	if(areaAndclass1!='-1'){
	    	 	areaAndclass =areaAndclass1;
	    	 	
	    	}
	    	if(areaAndclass2 !='-1'){
	    	 	areaAndclass =areaAndclass2 ;
	    	}
//	         
	        console.log(oArea)
		    console.log(areaAndclass)
	
		   
		   
	   	    if($('#password').val()==$('#rePassword').val()){
	   	    	       
		   	   	    obj.ajax('/pc/account/addAccount',{
		   	   	    	'accountToken':$.cookie('__accessToken'),
				   	    'mobile':$('#username').val(),
				   	    'password':$('#password').val(),
				   	    'phoneCode':$('#checkCode').val(),       //校验码
				        'did':areaAndclass,  
				        'typeDistrict':oArea,            //高校或地区  int 如1
					},function(data){
						console.log(data);
						if(data.status=='OK'){
						   	  alert(data.msg); 
					          var nextUrl = GetQueryString("nextUrl");
				            if (!nextUrl) {
				            	nextUrl = "../../index.html";

				            }
				            	
				            	
				            window.location.href=nextUrl;
                           
				          
				            //window.location.href = bigDataUrl+'/account/web/register.html?appId=0110&finishurl='+ctx;
				            
					        
				        }else{
					          alert(data.msg); 
				        };
					},function(data){})
	   	    }else {
	   	    	alert('两次输入的密码不一致')
	   	   }
	    }else{
	   	  alert('请选择地市')
	    }
	}
    /***********        bluer 失焦判断        ************/
    var  Code_flay  =true ;
    $('#username').blur(function(){
    	
    	   	
    	if($(this).is("#username")){            //手机号判断
			var ph=/^1[2|3|4|5|6|7|8|9][0-9]{9}$/
			if($("#username").val()!=""){
			if(!(ph.test($("#username").val()))){
				 Code_flay =false;     //给发送验证码枷锁
				  $('.sendSecurityCodeGray').css('background','#c8c8c8');//验证码高亮
				//return false;
			}else if(ph){
				//$(".spa2").text("");
				 Code_flay =true;     //给发送验证码解锁
				 
				 $('.sendSecurityCodeGray').css('background','#3ebb2b');//验证码高亮

				//return true;
			}
			}else{
				$(".spa2").text("");
			}
		}
    	console.log(Code_flay)
    	if($('#username').val()==''){
       	    Code_flay =false;
       	    $('#spa1').css('display','block');
	   	    $('#spa1').html('请输入手机号码').css('color','red');
       	 
        }
    	
	   if(Code_flay){
	   	
	       obj.ajax('/commons/checkMobile',{'mobile':$('#username').val()},function(data){
	            console.log(data);
	            if(data.status =='ERROR'){
		           	$('#spa1').css('display','block') //.html('该账号已经注册,请在下方登录');
		            $('#sbumitBtn').html('登录')
		            $('#spa1').html(data.msg+',可直接登录。').css('color','red');
		            $('#sbumitBtn').css('background-color','#3ebb2b')  //登录按钮的背景颜色
		            $('#area').hide();  //地区
		            $('#register').hide();  //注册
		            $('#regist-box').hide();
		            $('.gaoshi').show();  //告示显示
		            $('.changeModel_tow_box').show()   //登陆图片验证码
//		            $('#one_hao_tong').show()   //一号通的显示
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
	                $('#checkCode').val('');//验证码清空
	                $('.gaoshi').hide();  //告示隐藏
	                $('.changeModel_tow_box').hide();  //登陆图片验证码
//	                $('#one_hao_tong').hide()   //一号通的显示
	            }
	        },function(data){})
	   }else{
	    $('#spa1').css('display','block');
	   
	   	$('#spa1').html('请输入正确手机号').css('color','red');
	   }	
	});
   
    /***********        fouse   聚焦判断 ************/
     $('#username').focus(function(){
     	
     	 $('#spa1').css('display','none');
     	
     })
   
   
   
     $('#checkCode').val('')//验证码清空     
    /************** 发送验证码  ************/
   
  
     
    function sendYanzhengCode(){
    
        if($('#username').val()==''){
       	    Code_flay =false;
       	    $('#spa1').css('display','block');
	   	    $('#spa1').html('请输入手机号码').css('color','red');
       	 
        }
         var validCode= $("#checkCodeamg").val()
			if(!validCode){
				
				alert('图片验证码不能为空!')
				return;
			}
       
       if(Code_flay){
       	    Code_flay =false;
       	   
	        obj.ajax('/pc/account/createSecurityCodeSend',{'phone':$('#username').val(),'validCode':$("#checkCodeamg").val()},function(data){ 
					 console.log(data);
					 
					 if(data.status=='OK'){
					 	$.alert(data.msg);
					 	
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
						
					}else{
						$.alert(data.msg);
						Code_flay =true ; 
					}
		    },function(data){})
	        //延时器打开锁 
                           
            var timer2 =setTimeout(function(){
             	Code_flay =true ;
            },60000)
	        
       }
      
    }
 
   	
 function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
}  	    
   	    
 /****  校验手机号是否可以注册  *****/








