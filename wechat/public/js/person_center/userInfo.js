
	/*************  用户信息-zhu   ****************/
    obj.ajax('/commons/getSessionAccount',{},function(data){
    	console.log(data);
    	if(data.account.username){
    		fn(data.account.username);
    		username =data.account.username;
    	}
    },function(data){});
    
	function fn(data){
    	
     	/*** 获取个人基本信息***/
		obj.ajax('/bg/account/findAccountById',{'username':data},function(data){
			
			$('#realname').text(data.rows.realname); // 用户名称
//          $('#orgTypeName').text(userOrgName[account.orgType]); // 用户组织类型
            $('#imgUrl').attr('src', data.rows.photoUrl); // 用户头像
			
		},function(data){})
     	
    }
	
	

	
	
