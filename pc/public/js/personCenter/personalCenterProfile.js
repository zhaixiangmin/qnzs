
$(document).ready(function(){
	
	//个人标签
   /* var tag_name=['志愿者','支教','高考','心理','旅行','留学','创业','大学','婚恋','考研']
        for (var i = 0; i < tag_name.length; i++) {
            $('.personal_tag .tag_list').append('<li class="tag fl">'+tag_name[i]+'</li>')
        };
    $('.personal_tag .tag').click(function(event) {
        $(this).toggleClass('cur');
    });*/

    
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
    	
    	if(data.account.username){
    		fn(data.account.username);
    		username =data.account.username;
    	}
    	
    },function(data){});
     function fn(data){
     	 
		     	   /*** 获取个人基本信息***/
		    obj.ajax('/bg/account/findAccountById',{'username':data},function(data){
		    	
		    	
		    	$('#realname').val(data.rows.realname)  //昵称
		        $('#user_head_img').attr('src',data.rows.photoUrl);        //头像photoUrl
		        $('#userType').html(data.rows.type);          //用户类型
		        //用户类型
		        if(data.rows.type ==1){
		        	 $('#userType').html('公众用户');
		        }
		        if(data.rows.type ==3){
		        	$('#userType').html('咨询导师');
		        	
		        }
		        $('#areadis').text(data.rows.typeDistrict);   //所属地区  
		        $('#loginName').text(data.rows.username)      //登陆账号
		        $('#email').html(data.rows.email)             //电子邮箱
		        $('#mobile').html(data.rows.mobile)                //手机号
		        $('#password').html(data.rows.password);                //登录密码 
		
		        $('input:radio[name=sex][value='+data.rows.gender+']').attr('checked',true);   //性别
		    
		        
		        $('#address').val(data.rows.address);          //联系地址
		                                                       //个人标签
		        $('#description').val(data.rows.description)   //自我描素                                             //自我描述
		        
		        //个人标签
		        var personLab=[];
		        $.each(data.lable, function(i ,ele){
		        	personLab.push($(this)[0]['caption']);
		        	
		        })
		      
		        for(var i = 0;i<personLab.length;i++){
		        	$('.personal_tag .tag').each(function(){
		        		if($(this).html() ==personLab[i]+'' ){
		        			$(this).addClass('cur');
		        		}
		        	})
		        }
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

    	obj.ajax('/bg/account/pcUpdatAccount',{
    		 'username':username,     //隐藏掉
    		 'address':$('#address').val(),
    		 'description':$('#description').val(),
    		 'email':$('#email').html(),
    		 'mobile': $('#mobile').html(),
    		 'realname':$('#realname').val(),
    		 'gender' : gender,     //1是男  2 是女  3 是保密
    		 'photoUrl':$('#user_head_img').attr('src'),    
    		 'lable' :s ,
    		 'did':did//传入字符串数组
    	},function(data){
    		
    		  if(data.status == 'OK'){
                  $.alert(data.msg);
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
    
    
    
 
   
});




















