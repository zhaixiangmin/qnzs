;$(function(){
	
	//图片上传处理 start
	   var image = '';
	               
		   function selectImage(file) {
			if(!file.files || !file.files[0]) {
				return;
			}
			var reader = new FileReader();
			reader.onload = function(evt) {
				document.getElementById('preview').src = evt.target.result;
				image = evt.target.result;
			
			}
			reader.readAsDataURL(file.files[0]);
		};
		//http://192.168.100.49:8080/qnzs/file_upload
	    $(document).ready(function(){
	    	//#file
	    	$('#image_file').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
	
//					alert(data.result.url);
					imageUrl = data.result.url;
					$('#preview').attr('src',imageUrl)
				},
				fail: function() {
                    $.alert('出错');
				}
			});
			//http://192.168.100.49:8080/qnzs/file_upload
	        $('#Updatefile').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
	
//					alert(data.result.url);
					imageUrl2 = data.result.url;
					$('#preview2').attr('src',imageUrl2) ;  //回显图片
				},
				fail: function() {
                    $.alert('出错');
				}
			});
	
	    });
	    
	//图片上传处理  end
	
	/************************************  个人信息处理    ***********************************************/
	
	 //个人标签
   /* var tag_name=['志愿者','支教','高考','心理','旅行','留学','创业','大学','婚恋','考研']
        for (var i = 0; i < tag_name.length; i++) {
            $('.personal_tag .tag_list').append('<li class="tag fl">'+tag_name[i]+'</li>')
        };
    $('.personal_tag .tag').click(function(event) {
        $(this).toggleClass('cur');
    });*/

    /*点击修改手机号、密码*/
    $('.phone_num_item .revise_btn').click(function(event) {
        $('.revise_popup').show().children('.phone_num_revise').show();
    });
    /**手机号码修改 ***/
    $('.phone_num_revise .make_sure').click(function(event) {
    	
         
        $('.phone_num_revise .write_box').hide().siblings('.success_box').show();  //显示出修改手机框
        
         $('#mobile').html($('#newphone').val())    //改变手机号      
        var num=3;
        var timer=setInterval(function(){
            num--;
            if(num<1){
                clearInterval(timer);
                $('.revise_popup').hide().children('.phone_num_revise').hide();
                // location.reload(true)
            }
            $('.phone_num_revise .success_box p:last').html(num+'秒后返回个人信息页，<a href="javascript:;" class="link">立即跳转</a>');
        }, 1000)
    });
    $('.phone_num_revise .cancel').click(function(event) {
        $('.revise_popup').hide().children('.phone_num_revise').hide();
    });

    $('.password_item .revise_btn').click(function(event) {
        $('.revise_popup').show().children('.password_revise').show();
    });
    $('.password_revise .make_sure').click(function(event) {
        $('.password_revise .write_box').hide().siblings('.success_box').show();
        var num=3;
        var timer=setInterval(function(){
            num--;
            if(num<1){
                clearInterval(timer);
                $('.revise_popup').hide().children('.password_revise').hide();
            }
            $('.password_revise .success_box p:last').html(num+'秒后返回个人信息页，<a href="javascript:;" class="link">立即跳转</a>');
        }, 1000)
    });
    $('.password_revise .cancel').click(function(event) {
        $('.revise_popup').hide().children('.password_revise').hide();
    });
    
    
       
});
/**
 * 初始化美图秀秀编辑器
 */
$(function(){
    /****** 获取当前登录者信息 *******/
   
     obj.ajax('/commons/getSessionAccount',{},function(data){
    	console.log(data);
    	if(data.account.oid){
    		fn(data.account.oid);
    		oid =data.account.oid;
    	}
    	
    },function(){});
     function fn(data){
     	   
		     	/*** 获取个人基本信息***/
		
		    obj.ajax('/bg/organization/findOrganizationById',{'oid':data},function(data){
		        console.log(data)
		    
		    	if(data.rows.photoUrl){
		    		$('#preview2').attr('src',data.rows.photoUrl);        //头像photoUrl
		    	
		    	}else{
		    		
		    		$('#preview2').attr('src','../../public/img/head_img/31.png');        //头像photoUrl
		    	}
		    
		        $('.realname').html(data.rows.name)  //简称
		        $('#fullName').html(data.rows.fullName)  //组织全称
		        $('.areadis').text(data.rows.typeDistrict);   //所属地区  
		        $('#loginName').text(data.rows.username)      //登陆账号
		        $('.mobile').html(data.rows.telephone)           //固定电话
		        $('.address').html(data.rows.address);          //联系地址
		        $('.description').html(data.rows.description);  //个人描述
		
		        
		        
		        
		        obj.ajax('/common/district/getParentByUserDid',{'did':data.rows.did},function(data){
		        	console.log(data);
		            if(data.three!=null){
		            	
		            	$('.areadis').html(data.three.districtName); //  所属组织   3级
		            }
		            if(data.three==''&&data.two!=null){
		        
		            	$('.areadis').html(data.two.districtName); //  所属组织   3级
		            	
		            }
		            if(data.three==null&&data.two==null){
		            	if(data.one ==1){
		            		$('.areadis').html('地区'); //  所属组织   3级
		            	}else{
		            		$('.areadis').html('高校'); //  所属组织   3级
		            		
		            	}
		            }
		        	
		        	$("#oidType").val(data.one);
		        	changeOidType(data.one);
		        	if(1==data.one){
		        		$("#cityOid").val(data.two.did);
		        		if(data.three.did!=""){
		        			cityOidChange(data.two.did);
		        			setTimeout(function () { 
							     $("#areaOid").val(data.three.did);
							    }, 500);
		        			
		        		}
		        	}
		        	if(2==data.one){		        		
		        		$("#shcoolOid").val(data.two.did);
		        		if(data.three.did!=""){		        			
		        			schoolOidChange(data.two.did);
		        			setTimeout(function () { 
							      $("#classOid").val(data.three.did);
							    }, 500);
		        			
		        		}
		        	}
		        	
		        },function(data){});
		    },function(data){});
     }
     
    
   
    
	/************** 提交编辑的信息   *********************/
	$('.bj').click(function(){
//		
		
		$('#Updatefile').removeAttr('disabled');  //移除属性
		$('#name').val($('.realname').html())  //简称
		$('#telephone').val($('.mobile').html())    //手机号
		$('#email').val($('.email').html())      //邮箱
		$('.fullName').val($('#fullName').html())  //全全称
		$('#address').val($('.address').html());//联系地址
		$('#description').val($('.description').html());//个人描述
		
		
		
		$(this).hide();  
		$('.bc').show();   //显示保存按钮
		$('.hideLabel').hide()  //隐藏回显的标签
		//显示隐藏的按钮
		$('.editInfor').show();
		$('.phone').css('height','7rem');
		$('#code_li').show()  //显示验证码框
		$('.label').css('height','7rem');  //个性标签框
		$('#labelDictionaryDiv li').css({'height':'1.5rem','line-height':'1.5rem'});
		/****  *****/
		
		
		
	})
	/*** 保存修改后的信息 ****/
	$('.bc').click(function(){
		
		$(this).hide();  
		$('.bj').show();
		
	
	  	obj.ajax('/bg/organization/updateOrganization',{
	  		 
	  		'telephone' :$('#telephone').val() ,   //手机号
		    'fullName': $('.fullName').val(),    //组织全称
	        'name': $('#name').val(),     //组织简称
	        'address' :$('#address').val(),          //联系地址
	        'description':$('#description').val() ,  //简介  
		    'photoUrl':$('#preview2').attr('src'),   
		    'oid':oid,//传入字符串数组,
		    'did':did
	  	},function(data){
	  		   console.log(data)
    		  if(data.status == 'OK'){
                  $.alert('组织信息修改成功！');
    		  	window.location.href = '../person_center/person_center.html';
    		  }else{
                  $.alert(data.msg);
    		  }
	  		  
	  	},function(data){})

	})
	
	/*********************************************************  修改手机号    **************************************************/
	 //判断手机号是否已经注册    //失焦判断
	    $('#telephone').blur(function(){
	    	
			var ph=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
			if($("#mobile").val()!=""){
				if(!(ph.test($("#mobile").val()))){
					$('.prompt').text("亲，请输入正确手机号");
					$(this).css("border","1px solid #BD362F");
					 Code_flay =false;  
					
					return false;
				}else if(ph){
					$(".prompt").text("");
					// 验证手机号是否注册
					obj.ajax('/commons/checkMobile',{'mobile':$('#mobile').val()},function(data){
			            console.log(data);
			            if(data.status == 'OK'){
			            	 $('.prompt').html('亲，请此手机号可以使用！');
			            	  Code_flay =true;  
			            }else{
			            	 Code_flay =false;  
			            	$('.prompt').html('亲，手机号已经注册！');
			            }
			        },function(data){})
					return true;
				}
			}else{
				$(".prompt").text("");
	       }
	    	
	    	
	    })
	  
	    //聚焦提示
	    $("#mobile").focus(function(){
		    if($(this).is("#mobile")){
		    	$('.prompt').text("11位手机号码").css("color","#aaa")
		    	$(this).css("border","1px solid #aaa")
	    	}
	    })

	  
	
})
	

//	
//	
	
	
	
	
	
	
	
	

