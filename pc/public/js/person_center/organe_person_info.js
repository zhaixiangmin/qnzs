
$(document).ready(function(){
	
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
    	
    	 $('.prompt').html('');  //清空提示
    	
        $('.revise_popup').show().children('.phone_num_revise').show();
    });
//  
    
    
    /**手机号码修改 ***/
//  $('.phone_num_revise .make_sure').click(function(event) {
//  	
//       
//      $('.phone_num_revise .write_box').hide().siblings('.success_box').show();  //显示出修改手机框
//      
//       $('#mobile').html($('#newphone').val())    //改变手机号      
//      var num=3;
//      var timer=setInterval(function(){
//          num--;
//          if(num<1){
//              clearInterval(timer);
//              $('.revise_popup').hide().children('.phone_num_revise').hide();
//              // location.reload(true)
//          }
//          $('.phone_num_revise .success_box p:last').html(num+'秒后返回个人信息页，<a href="javascript:;" class="link">立即跳转</a>');
//      }, 1000)
//  });
    $('.phone_num_revise .cancel').click(function(event) {
        $('.revise_popup').hide().children('.phone_num_revise').hide();
    });

    $('.password_item .revise_btn').click(function(event) {
        $('.revise_popup').show().children('.password_revise').show();
    });
//  $('.password_revise .make_sure').click(function(event) {
//      $('.password_revise .write_box').hide().siblings('.success_box').show();
//      var num=3;
//      var timer=setInterval(function(){
//          num--;
//          if(num<1){
//              clearInterval(timer);
//              $('.revise_popup').hide().children('.password_revise').hide();
//          }
//          $('.password_revise .success_box p:last').html(num+'秒后返回个人信息页，<a href="javascript:;" class="link">立即跳转</a>');
//      }, 1000)
//  });
//  $('.password_revise .cancel').click(function(event) {
//      $('.revise_popup').hide().children('.password_revise').hide();
//  });
//  
    
       
});
/**
 * 初始化美图秀秀编辑器
 */
$(function(){
	
	//弹出隐藏框
    $('#upload2').click(function(){
        $('#mao').css('display','block');   //  显示遮罩层
        $('object').css('display','block');
	});
	
	
	//var ctx = "//192.168.100.49:8080/qnzs";
	/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
	xiuxiu.embedSWF("askBoxUpload", 5, "630", "420");
	//修改为您自己的图片上传接口
	xiuxiu.setUploadURL(base + '/file_upload');
	xiuxiu.setUploadType(2);
	xiuxiu.setUploadDataFieldName("upload_file");
	xiuxiu.onInit = function() {
		xiuxiu.loadPhoto("//open.web.meitu.com/sources/images/1.jpg"); //修改为要处理的图片url
	};
	xiuxiu.onUploadResponse = function(data) {
		xiuxiu.onDebug = function (data){$.alert("错误响应" + data);}
		data = JSON.parse(data);
		if(data.error == 0){
			//updatePhoto(data.url);
//			alert(data.url);
			$('#user_head_img').attr('src',data.url);
			$('object').css('display','none');   //隐藏美图秀秀框
			 $('#mao').css('display','none');   //  隐藏遮罩层
			
		}else{
            $.alert(data.message);
		}
//		alert("上传响应" + data); 可以开启调试
	};

	//上传头像按钮事件
//	$('#upload').click(function(){
////		$('.darkUpload').fadeTo(400,0.5);
////		$('.askBoxUpload').fadeIn(400);
//
//   
//	});
     
    /****** 获取当前登录者信息 *******/
   
    obj.ajax('/commons/getSessionAccount',{},function(data){
    	console.log(data);
    	if(data.account.oid){
    		fn(data.account.oid);
    		oid =data.account.oid;
    	}
    	
    },function(data){});
     function fn(data){
     	
		     	   /*** 获取个人基本信息***/ //bg/organization/findOrganizationById     /bg/account/findAccountById
		    obj.ajax('/bg/organization/findOrganizationById',{'oid':data},function(data){  
		    	
		    	 console.log(data)
		    	
		        $('#user_head_img').attr('src',data.rows.photoUrl);        //头像photoUrl
		     
		     
		        $('#areadis').text(data.rows.typeDistrict);   //所属地区  
		        $('#loginName').text(data.rows.username)      //登陆账号
		    
		        $('#telephone').val(data.rows.telephone)                //固定电话
			    $('#fullName').val(data.rows.fullName)  //组织全称
		        $('#name').val(data.rows.name)  //组织简称
		       
		        
		        $('#address').val(data.rows.address);          //联系地址
		         $('#description').val(data.rows.description)   //简介                               
		     
		        
		       
		  
		        obj.ajax('/common/district/getParentByUserDid',{'did':data.rows.did},function(data){
		        	
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
     
    /** 保存修改后的信息 ***/
    $('#savBtn').click(function(){
//  	alert(oid)
    	 //获取个人标签
    	var s = [];
    	$('.personal_tag').find('li.cur').each(function(i ,ele){
    	 	
    	 	s.push( $(this).attr('id'));
    	})
    	s = JSON.stringify(s);
    	
    
    	var gender = "3";
    	$('input[name="sex"]:checked').each(function(){  
    		gender = $(this).val();
		}); 
         
      
    	obj.ajax('/bg/organization/updateOrganization',{
    		    'telephone' :$('#telephone').val() ,               //固定电话
			    'fullName': $('#fullName').val(),    //组织全称
		        'name': $('#name').val(),     //组织简称
		        'address' :$('#address').val(),          //联系地址
		        'description':$('#description').val() ,  //简介  
    		    'photoUrl':$('#user_head_img').attr('src'),   
    		    'oid':oid,//传入字符串数组,
    		    'did':did
    	},function(data){
    		 console.log(data)
    		  if(data.status == 'OK'){
                  $.alert('组织信息修改成功！');
    		  	window.location.href = 'person_center.html';
    		  }else{
                  $.alert(data.msg);
    		  }
    	},function(data){})
    })
   
   
   
   
    /*** 获取个人标签****/
    obj.ajax('/bg/dictionary/findDictionary',{},function(data){
    	
    	if(data.status=='OK'){
    		var html='';
    		for (var i = 0; i < data.rows.length; i++) {
               $('.personal_tag .tag_list').append('<li class="tag fl"  id='+data.rows[i].id+' >'+data.rows[i].caption+'</li>')
//	            
    		};
	 		$('.personal_tag .tag').click(function(e) {
			        $(this).toggleClass('cur');
			     
            });
    	}
    },function(data){});
    
    /***************************       修改手机号用户           **********************************/
   
    //判断手机号是否已经注册
    $('#newphone').blur(function(){
    	if($(this).is("#newphone")){            //手机号判断
				var ph=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,10}$/
				if($("#newphone").val()!=""){
				if(!(ph.test($("#newphone").val()))){
					$('.prompt').text("亲，请输入正确手机号");
					$(this).css("border","1px solid #BD362F");
					
					 Code_flay =false;  
					return false;
				}else if(ph){
					$(".spa2").text("");
					// 验证手机号是否注册
					obj.ajax('/commons/checkMobile',{'mobile':$('#newphone').val()},function(data){
			            console.log(data);
			            if(data.status == 'OK'){
			            	 $('.prompt').html('亲，请此手机号可以使用！');
			            	 	Code_flay =true;  
			            }else{
			            	$('.prompt').html('亲，手机号已经注册，请换个手机号码吧！');
			            	
			            	 Code_flay =false;  
			            	
			            }
			        },function(data){})
					return true;
				}
				}else{
					$(".spa2").text("");
		    }
		}
    	
	});
    //聚焦提示
    $('#newphone').focus(function(){
    	if($(this).is("#newphone")){
    	$('.prompt').text("11位手机号码").css("color","#aaa")
    	$(this).css("border","1px solid #aaa")
    	}
    });
    
 
   
});




















