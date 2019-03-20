$(function(){
	
//图片上传处理  end
	

/********************************    显示input  ******************************/
$('.editInfor').show()   //显示input

/***********************************  初始化服务类别   -新增           ********************/

obj.ajax('/pc/service/getServiceCategory',{},function(data){
	 
		var html = '';
	    for(var i =0 ;i<data.rows.length;i++ ){
	  	
	  	 html+='<option  value="'+data.rows[i].caId+'">'+data.rows[i].name+'</option>'
	    }
		$('.categoryId').append(html);
//	    $('#categoryId').val(categoryId)   //服务类别     注意要在动态创建后才可以回显
	   
},function(data){}) 

/******************************  获取当前登登陆者信息  *******************************/
//  obj.ajax('/commons/getSessionAccount', {}, function(data) {
//  	console.log(data);
//	
//			username = data.account.username;
//			
//	
//	}, function(data) {})

/********************************  咨询导师 -  新增   ***********************************/
$('#add_techer').click(function(){
		
        console.log($('.realname').val())    //用户名
        console.log($('.speciality').val()) //专业特长
        console.log($('.expProfession').val())//职业
        console.log($('.categoryId option:selected').attr('id')) //服务类别
////
		var areaAndclass ='';
     	var areaAndclass1 = $('#cityOid2 option:selected').val() ;
		var areaAndclass2 = $('#shcoolOid2 option:selected').val();
        if($('#oidType2').val() !=''){
	        if(areaAndclass1!='-1'){
	    	 	areaAndclass =areaAndclass1 ;
	    	}
	    	if(areaAndclass2 !='-1'){
	    	 	areaAndclass =areaAndclass2 ;
	    	}
	        if(areaAndclass ==''){
	        	$.alert('请完善所属地区资料');
	        	return;
	        }
        }else{
        	$.alert('请完善地区高校信息！');
        	return ;
        }

////		//测试地区编码440303   CJJDX
        var areaAndclass ;

    	var oArea =  $('#oidType2 option:selected').val();     //获取地区或高校
    	var areaAndclass1 = $('#areaOid2 option:selected').val() ;
    	var areaAndclass2 = $('#classOid2 option:selected').val();
    	var cityAndshcool1 = $('#cityOid2 option:selected').val() ;  //地址
    	var cityAndshcool2 = $('#shcoolOid2 option:selected').val();  //高校
	
    	if(areaAndclass1!='-1'){
    	 	areaAndclass =areaAndclass1 ;
    	}
    	if(areaAndclass2 !='-1'){
    	 	areaAndclass =areaAndclass2 ;
    	}
    	if(cityAndshcool1!='-1'){
    	 	areaAndclass =cityAndshcool1 ;
    	}
    	if(cityAndshcool2 !='-1'){
    	 	areaAndclass =cityAndshcool2 ;
    	} 
    	  console.log($('.realname').val());
          console.log(areaAndclass);
          console.log( $('.speciality').val())
          console.log($('.expProfession').val())
          console.log($('.description').val())
          console.log($('.categoryId').val())
      
		obj.ajax('/bg/accountExpert/addExpert', {
            'did':areaAndclass,     //测试地区编码440303   CJJDX
			'speciality': $('.speciality').val(),   //专业特长
            'accountExpert': $('.expProfession').val(),  //职业
			'introduction': $('.description').val(),   //自我描述
			'categoryId':$('.categoryId').val() ,   //服务类别
			'realname':$('.realname').val(),    //用户名
            'expertUrl' :$('#preview2').attr('src')
		}, function(data) {
			console.log(data)
			if (data.status == 'OK') {
                $.alert(data.msg);
			} else {
                $.alert(data.msg);
			}
		}, function(data) {});
		
	})



/******************************************  咨询导师 -   修改   **********************************/


   //回显
    obj.ajax('/commons/getSessionAccount', {}, function(data) {
    	console.log(data);
	    username = data.account.username;
	    
	    if(data.account.type == 3){
	    	
	    	$('.add_type1_btn').hide()   //隐藏类型为一的按钮
	    	$('.upd_type3_btn').show()   //显示类型为3的按钮
	    	obj.ajax('bg/accountExpert/findAccountById',{'username': username},function(data){
			
				console.log(data)
				
				$('.become_teacher').css('display','block');
				categoryId =data.rows.categoryId  //服务类别
				
				$('.realname').val(data.rows.orgName); //用户名
				$('.expProfession').val(data.rows.expProfession) //职业
			
				$('.speciality').val(data.rows.speciality) //专业特长
			//	 			$('.gender').val(data.rows.gender) //性别
				$('.typeDistrict').val(data.rows.typeDistrict); //typeDistrict;//用户地域归属类型（1-地市，2-高校）
				$('.description').val(data.rows.introduction) //自我描述
			//      /***** 服务类别  ******/
					obj.ajax('/pc/service/getServiceCategory',{},function(data){
						  console.log(data);
							var html = '';
						    for(var i =0 ;i<data.rows.length;i++ ){
						  	 html+='<option  value="'+data.rows[i].caId+'">'+data.rows[i].name+'</option>'
						    }
							$('.categoryId').append(html);
						   $('.categoryId').val(categoryId)   //服务类别     注意要在动态创建后才可以回显
					},function(data){}) 
					
					
			},function(data){})
		
	    }else {  
	    	
	    	$('.add_type1_btn').show()   //显示类型为一的按钮
	    	$('.upd_type3_btn').hide()   //隐藏类型为3的按钮
	    	
	    	//type =1  则清空数据
	    	$('.realname').val(''); //用户名
			$('.expProfession').val('') //职业
			$('.speciality').val('') //专业特长
	//		$('#gender').val(data.rows.gender) //性别
	//		$('#typeDistrict').val(data.rows.typeDistrict); //typeDistrict;//用户地域归属类型（1-地市，2-高校）
			$('.description').val('') //自我描述
            $('.categoryId ').val('')  //服务类别
           
	        
	        obj.ajax('/pc/service/getServiceCategory',{},function(data){   //服务类别
				var html = '';
			    for(var i =0 ;i<data.rows.length;i++ ){
			  	
			  	    html+='<option  value="'+data.rows[i].caId+'">'+data.rows[i].name+'</option>'
			    }
				$('.categoryId').append(html);
			
			},function(data){}) 
			//是否已经申请
			obj.ajax('/bg/accountExpert/checkExpert',{},function(data){
    		
	    		if(data.status==0){
	    			$('#form2').show()  //显示form2表单
	    			$('#form1').hide()  //隐藏form1表单
	    			
	    		}else{
	    			$('#form2').hide()  //显示form2表单
	    			$('#form1').show()  //隐藏form1表单
	    			
	    		}
	    	})
			
			
			
	    }
	    
	    
	}, function(data) {}) 
	
	//修改
	$('#upd_techer').click(function() {
	
		//测试地区编码440303   CJJDX
        var areaAndclass ;
    	var oArea =  $('#oidType2 option:selected').val();     //获取地区或高校
    	var areaAndclass1 = $('#areaOid2 option:selected').val() ;
    	var areaAndclass2 = $('#classOid2 option:selected').val();
    	var cityAndshcool1 = $('#cityOid2 option:selected').val() ;  //地址
    	var cityAndshcool2 = $('#shcoolOid2 option:selected').val();  //高校
////  	
    	if(areaAndclass1!='-1'){
    	 	areaAndclass =areaAndclass1 ;
    	}
    	if(areaAndclass2 !='-1'){
    	 	areaAndclass =areaAndclass2 ;
    	}
    	if(cityAndshcool1!='-1'){
    	 	areaAndclass =cityAndshcool1 ;
    	}
    	if(cityAndshcool2 !='-1'){
    	 	areaAndclass =cityAndshcool2 ;
    	} 
//        console.log(areaAndclass);
		
	    
	    alert($('#opload_img').val());
		obj.ajax('/bg/accountExpert/updateExpert', {
			'username': username,
            'did':areaAndclass,     //测试地区编码440303   CJJDX
			'speciality': $('.speciality').val(),   //专业特长
            'accountExpert': $('.expProfession').val(),  //职业
			'introduction': $('.description').val(),   //自我描述
			'categoryId':$('.categoryId option:selected').val() ,   //服务类别
			'orgName':$('.realname').val(),   //用户名
		    'expertUrl' :$('#preview2').attr('src')
		}, function(data) {
             console.log(data);
			if (data.status = 'OK') {
                $.alert(data.msg);
				 window.location.reload();   //页面重新加载
			} else {
                $.alert(data.msg);
			}
		}, function(data) {})
	})
	
	/***  咨询导师  注销 *******/
	
	$('.cancel2').click(function(){
		
		if(confirm("确定要注销导师吗？")){
			obj.ajax('/bg/accountExpert/deleteExpert',{'username': username},function(data){
			 console.log(data)
				if(data.status =='OK'){
                    $.alert('注销成功！')
    			 window.location.href='../person_center/person_center.html'   //页面重新加载
    		    }else{
                    $.alert('注销失败！')
    		    }
			},function(data){})
		}
	})
	
	
	
/********************************     **********************************/
	
	

	
})
 