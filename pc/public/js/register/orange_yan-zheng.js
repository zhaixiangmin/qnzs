/****  验证 ******/



//				$("#userName").focus()
		
		/************************  失焦判断  **********************************/
	     var checkMobile_flay =true ;
			$("body  input").blur(function(){
			 
			   
				$(".spa").css("color","#BD362F")
				if($(this).is("#fullName")){             //组织全称   
					
					if($("#fullName").val()!=""){
						
						if($("#fullName").val().length>20){
							$(".spa1").text("请输入20字以内");
							$(this).css("border","1px solid #BD362F");
							
							return false;
						}else{
							$(".spa1").text("");
						
							return true;
						}
					}else{
						$(".spa1").text("");
					}
				}
				if($(this).is("#name")){             //组织简称2
				
					if($("#name").val()!=""){
						if($("#name").val().length>8){
							$(".spa2").text("请输入8字以内");
							$(this).css("border","1px solid #BD362F")
							return false;
						}else{
							$(".spa2").text("");
							return true;
						}
					}else{
						$(".spa2").text("");
					}
				}
				if($(this).is("#address")){             //组织地址3
					
					if($("#address").val()!=''){
						if($("#address").val().length>50){
							$(".spa3").text("请输入50字以内");
							$(this).css("border","1px solid #BD362F")
							return false;
						}else{
							$(".spa3").text("");
							return true;
						}
					}else{
						$(".spa3").text("");
					}
				}
				if($(this).is("#telephone")){           //联系电话4
					var ph=/^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/;
				
					if($("#telephone").val()!=""){
						if(!(ph.test($("#telephone").val()))){
							$(".spa4").text("请输入正确手机号");
							$(this).css("border","1px solid #BD362F");
							return false;
						}else if(ph){
							$(".spa4").text("");
							return true;
						}
					}else{
						$(".spa4").text("");
					}
				}
				
//				
				if($(this).is("#checkMobile")){            //组织运营者6
					var checkMobile=/^1[3|5|7|8|4][0-9]{9}$/;
					if($("#checkMobile").val()!=""){
					if(!(checkMobile.test($("#checkMobile").val()))){
						$(".spa6").text("请输入正确手机号");
						$(this).css("border","1px solid #BD362F");
						checkMobile_flay =true ;
						return false;
					}else if(checkMobile){
						//$(".spa6").text("");
                     
						//$(".true_ico").html($('<img style="display:block;   width：25px;height:25px;" src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171207/20171207163742_598duigou.png"/>') ).css("color","#aaa")
						$(".spa6").css("color","#aaa");
						checkMobile_flay =true ;
						return true;
					}
					}else{
					    $(".spa6").text("组织运营者以个人用户身份登录成功后，可在［个人中心]点击［切换成管理员]进入组织管理后台。请务必添加已注册的青年之声个人用户作为组织运营者。").css("color","#aaa")
						checkMobile_flay =true ;
						//$(".spa6").text("");
					}
				}
				
			})
			$("body  textarea").blur(function(){
				
				if($(this).is("#introduce")){            //组织介绍5
				
					if($("#introduce").val()!=""){
						if($("#introduce").val().length<50||$("#introduce").val().length>500){
							$(".spa5").text("请输入50-500字以内");
							$(this).css("border","1px solid #BD362F")
							
							return false;
						}else{
							$(".spa5").text("");
							return true;
						}
					}else{
						$(".spa5").text("");
					}
				}
				
			});
		/********************** 聚焦提示 ************************/	
		
			$("input").focus(function(){
				if($(this).is("#fullName")){   //组织全称
					$(".spa1").text("请输入20字以内").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				if($(this).is("#name")){   //组织简称
					$(".spa2").text("请输入8字以内").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				if($(this).is("#address")){     // 组织地址
					$(this).val('')  //清空选择
//					
					$(".spa3").text("请输入50字以内").css("color","#aaa")
					$(this).css("border","1px solid #aaa");
					
					var areaAndclass ;
			        var cityAndshcool ;
			        var areaAndclass_name ='';
			        var tow_name =''
			    	var oArea =  $('#oidType').val();     //获取地区或高校
			    	var areaAndclass1 = $('#areaOid').val() ;
			    	var areaAndclass2 = $('#classOid').val();
			    	var cityAndshcool1 = $('#cityOid').val() ;  //地址
			    	var cityAndshcool2 = $('#shcoolOid').val();  //高校
			    	
			    	if(cityAndshcool1!='-1'){
			    	 	areaAndclass_name =$('#cityOid').find("option:selected").text() ;
			    	 	console.log(areaAndclass_name)
			    	    tow_name =  areaAndclass_name;
			    	
			    	}
			    	if(cityAndshcool2 !='-1'){
			    	 	areaAndclass_name =$('#shcoolOid').find("option:selected").text();
			    	 	console.log(areaAndclass_name)
			    	 	tow_name =areaAndclass_name;
			    	} 
			    	
			        if(areaAndclass1!='-1'){
			    	 	areaAndclass_name =$('#areaOid').find("option:selected").text();
			    	 	console.log(areaAndclass_name)
			    	 	
			    	}
			    	if(areaAndclass2 !='-1'){
			    	 	areaAndclass_name = $('#classOid').find("option:selected").text();
			    	 	
			    	 	console.log(areaAndclass_name)
			    	}
			        
			    	
//                          if(cityAndshcool1!='-1'){
//					    	 	areaAndclass =cityAndshcool1 ;
//					    	}
//					    	if(cityAndshcool2 !='-1'){
//					    	 	areaAndclass =cityAndshcool2 ;
//					    	} 
//					    	if(areaAndclass1!='-1'){
//					    	 	areaAndclass =areaAndclass1 ;
//					    	}
//					    	if(areaAndclass2 !='-1'){
//					    	 	areaAndclass =areaAndclass2 ;
//					    	}
//					          console.log(areaAndclass)
					          
			          
					if(tow_name ==areaAndclass_name){   
							$(this).val( areaAndclass_name)
					}else{
						
						$(this).val( tow_name +""+ areaAndclass_name)
					}
					
				}
				if($(this).is("#telephone")){     //联系电话
					$(".spa4").text("请输入联系电话").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				if($(this).is("#checkMobile")){     //组织运营者 
					$(".true_ico").html("");
					$(this).css("border","1px solid #aaa")
					$(".spa6").text("组织运营者以个人用户身份登录成功后，可在［个人中心]点击［切换成管理员]进入组织管理后台。请务必添加已注册的青年之声个人用户作为组织运营者。").css("color","#aaa")
					
				}
			})
			$('textarea').focus(function(){
				
				if($(this).is("#introduce")){     //组织介绍
					$(".spa5").text("请输入50-500字以内").css("color","#aaa")
					$(this).css("border","1px solid #aaa")
				}
				
			})
		/*********************** 提交验证 ***************************/
		
		
			$("#orange_Btn").click(function(){
				
			
				

				
				var ph=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,10}$/;
				var checkMobile=/^1[3|5|7|8|4][0-9]{9}$/ ;
				
				  
				if(!$('#inp_Agreement').is(':checked')) {    //协议内容  必选
				   alert('请选择用户协议');
				   $('html , body').animate({scrollTop: 0},1000);
				   return ;
				}
				
				
				if($('#type').val() == '-1'){       //组织类型
					$(".spa0").text("亲 ，请选择组织类型");
					$('#type').css("border","1px solid #BD362F");
				    $('html , body').animate({scrollTop: 0},1000);
					
					return ;
					
				}else{
					
					$('#type').css("border","1px solid #ccc");
					$(".spa0").text(" ");
				}
				

				var areaAndclass ='';
             	var areaAndclass1 = $('#cityOid option:selected').val() ;   //所属地区
				var areaAndclass2 = $('#shcoolOid option:selected').val();
                
		    	if(areaAndclass1!='-1'){
		    	 	areaAndclass =areaAndclass1 ;
		    	}
		    	if(areaAndclass2 !='-1'){
		    	 	areaAndclass =areaAndclass2 ;
		    	}
                if(areaAndclass ==''){
                	
                	alert('请完善所属地区资料');
                	$('html , body').animate({scrollTop: 0},1000);
                	return;
                }

				
				if($("#fullName").val().length>20){    //组织全称
					$(".spa1").text("亲 ，请输入20字以内");
					$("#fullName").css("border","1px solid #BD362F");
					$('html , body').animate({scrollTop: 0},1000);
					
					return ;
				}
				if($("#name").val().length>8){     //组织简称
					$(".spa2").text("亲 ，请输入8字以内");
					$("#name").css("border","1px solid #BD362F");
					$('html , body').animate({scrollTop: 0},1000);
					return ;
				}
				
				if($("#address").val().length>50){   //组织地址
					$(".spa3").text("亲 ，请输入50字以内");
					$("#address").css("border","1px solid #BD362F")
					$('html , body').animate({scrollTop: 0},1000);
					return ;
				}
		        if($("#introduce").val().length<50||$("#introduce").val().length>500){   //组织介绍
					$(".spa5").text("亲 ，请输入50-500字以内");
					$("#introduce").css("border","1px solid #BD362F");
					$('html , body').animate({scrollTop: 0},1000);
					
					return ;
				}
		        get_org_id();  // 初始化 -组织运营者id
				
				
//				if($('#areaOid option:selected').val()=='-1'&&$('#classOid option:selected').val()=='-1'){
//				 
//					$("#spa8").text("请选择地市或高校").css("color","#BD362F")
//					alert('请完善地区资料')
//					return ;
//					
//				}; 
                   
                
				
			
				if(checkMobile.test($("#checkMobile").val())&&ph.test($("#telephone").val())){
					   
						  
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
					          	var imgUrls_files = $('#imgUrl').text();	  
					         obj.ajax('/pc/account/registerOrganization',{
						  		'accountToken':$.cookie('__accessToken'),
						  		'type':$('#type').val(),
						  		'name':$('#name').val(),    // 昵称 间
				 	    	    'fullName':$('#fullName').val(),       //全昵称
					 	    	'telephone':$('#telephone').val(),             //联系电话 -组织运营者
					 	    	'address':$('#address').val(),     //地址
					 	    	'operation':$('#checkMobile').val(),     // 组织运营者
					 	    	'did': areaAndclass,          // 地区id
				//	 	    	'description':$('#description').val(),  //介绍
					 	        'photoUrl':$('#ora_headImg').attr('src'),//  组织头像
					 	        'introduce':$('#introduce').val(),     //介绍
					 	    	'fileUrl':imgUrls_files,        //   证明文件
					 	    	'username':o_detail_username   //组织运营者id
						  	   },function(data){
						  		console.log(data)
						  		
						  		if(data.status == 'OK'){
						  			
						  			alert('您的组织注册申请已提交至所在区域系统管理员，审核结果将通过站内信发送至运营者账号，请留意查收。');
						  			window.location.href ='../../index.html';
						  		}else{
						  			
						  			alert('注册失败！')
						  		}
						  		
						  	
						  	})
					        
					
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
					
					$('html , body').animate({scrollTop: 0},1000);
					
					
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