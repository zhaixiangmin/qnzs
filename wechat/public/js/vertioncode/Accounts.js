//获取手机号码
    var phone =JSON.parse( $.cookie('getpsd')).mobile;
	var s = phone.slice(0,phone.length-4);
	$('.phone_txt').html(s+"****");
	var realname = JSON.parse( $.cookie('getpsd')).realname;
	$('#nickname').val(realname==null || realname=="" ? "该用户很懒，还没设置昵称！" : realname);
	

//  获取用户username
 var username =""
 
    username=JSON.parse( $.cookie('getpsd')).username
   $.ajax({
	   	type:"post",
	   	url:Qnzs.path+"/pc/accountAppeal/accountList",
	   	async:true,
	   	data:{
	        "mobile": phone,// 用户ID
	    },
	   	success:function(data){
	   		if(data.dataList.length>1){
	   			
	   			username =data.dataList[0].username;
	   		}
	   		
	   	}
	});



//曾经提问过的问题0-2个
var questionhtml ="";
var questionListLength=0;


$.ajax({
   	type:"post",
   	url:Qnzs.path+"/pc/accountAppeal/questionList",
   	async:true,
   	data:{
        "username": "00521349-fe63-4729-95a3-000f0e8e92ef",// 用户ID
    },
   	success:function(data){
   		var data=data.dataList;
   		if(data!=null){
   			questionListLength=data.length;
   		}
   		
        for(var i=0;i<data.length;i++){
        	questionhtml +='<li class="liser"><input type="radio" name="questionname" id="questionname1" class="clhebox" value="'+data[i].quId+'" /><span class="titlerx">'+data[i].title+'</span></li>'  	
        }
   	  
   	}
});
//.随机问题4个
$.ajax({
   	type:"post",
   	url:Qnzs.path+"/pc/accountAppeal/randQuestionList",
   	async:true,
   	data:{
    },
   	success:function(data){
   		var data=data.dataList;
   		var randQuestionLength=0;
   		if(questionListLength>0){
   			randQuestionLength =data.length-questionListLength;
   		}else{
   			randQuestionLength =data.length;
   		}
        for(var i=0;i<randQuestionLength;i++){
        	questionhtml +='<li class="liser"><input type="radio" id="questionname2"  name="questionname" class="clhebox" value="'+data[i].quId+'" /><span class="titlerx">'+data[i].title+'</span></li>'  	
        }
        questionhtml +='<li class="liser"><input type="radio" id="questionname2"  name="questionname" class="clhebox" value="0" checked="checked"/><span class="titlerx">以上都没有 / 不记得了</span></li>'  
   	    $('#randQuestionList').html(questionhtml);
   		
   	}
});

//曾经报名过的活动
var offlineActivityhtml ="";
var offlineActivityLength=0;
$.ajax({
   	type:"post",
   	url:Qnzs.path+"/pc/accountAppeal/offlineActivityList",
   	async:true,
   	data:{
        "username": username // 用户ID
    },
   	success:function(data){
   		var data=data.dataList;
   		if(data!=null){
   			offlineActivityLength=data.length;
   		}
   		
        for(var i=0;i<data.length;i++){
        	offlineActivityhtml +='<li class="liser"><input type="radio" id="offlineActivityname1"  name="offlineActivityname" class="clhebox" value="'+data[i].id+'" /><span class="titlerx">'+data[i].title+'</span></li>'  	
        }
   	}
});
//.随机活动4个
$.ajax({
   	type:"post",
   	url:Qnzs.path+"/pc/accountAppeal/randOfflineActivityList",
   	async:true,
   	data:{
         // 用户ID
    },
   	success:function(data){
   		console.log(data)
   		var data=data.dataList;
   		var randOfflineActivityLength=0;
   		if(offlineActivityLength>0){
   			randOfflineActivityLength = data.length-offlineActivityLength;
   		}else{
   			randOfflineActivityLength =data.length;
   		}
        for(var i=0;i<randOfflineActivityLength;i++){
        	offlineActivityhtml +='<li class="liser"><input type="radio" id="offlineActivityname2"  name="offlineActivityname" class="clhebox" value="'+data[i].id+'" /><span class="titlerx">'+data[i].title+'</span></li>'  	
        }
        offlineActivityhtml +='<li class="liser"><input type="radio" id="offlineActivityname2"  name="offlineActivityname" class="clhebox" value="0" checked="checked"/><span class="titlerx">以上都没有 / 不记得了</span></li>'  	
   	    $('#randOfflineActivityList').html(offlineActivityhtml);
   	}
});



//提交申诉

var flay=true;
$('#sure').click(function(){
	   
	  if(!validata()){
		 	return ;
	}
				
	    if(flay){
	    	
	    	flay=false;
	 
			    $('#sure').css("background","#cccc");
				
				
				
				//获取地区高校选中值
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
		            console.log(JSON.parse( $.cookie('getpsd')).username)
		            console.log(JSON.parse( $.cookie('getpsd')).mobile)
		            console.log(JSON.parse( $.cookie('getpsd')).realname)
		            console.log($('#nickmail').val())
		            console.log($('#datepicker').val())
		            console.log($('#datepickertme').val())
		            console.log(areaAndclass)
		            
			   
		       $.ajax({
		       	type:"post",
		       	url:Qnzs.path+"/pc/accountAppeal/addAccountAppeal",
		       	async:true,
		       	data:{
		            "username": JSON.parse( $.cookie('getpsd')).username, // 用户ID
		             "mobile":JSON.parse( $.cookie('getpsd')).mobile,  //手机号
		             "realname":$('#nickname').val(),//昵称
		             "sendEmail": $('#nickmail').val(), //邮箱 
		             "registerDate":  $('#datepicker').val() , // 账号注册时间
		             "lastLoginDate":$('#datepickertme').val() , // 最后登录时间
		             "schoolDid":areaAndclass, // 所属区域/高校
		             "askIds": getaskIds().toString(), // 曾提过的问题
		             "askPickIds": getaskPickIds().toString(), // 选择的问题id
		             "activIds": getactivIds().toString(), // 曾参与的活动
		             "activPickIds":getactivPickIds().toString() // 选择的活动id
		             
		        },
		       	success:function(data){
		       		flay =true;  //打开锁
		       		$('#sure').css("background","#2185CF");
		       		if(data.status=="OK"){
			   			$.alert(data.msg).then(function(){
			   				window.location.href ="../logoin/login.html";
			   			})
			   		}
		       	}
		       });
		}else{
			
			alert("您已提交申请！")
		}
	
})


//校验
function validata(){
	
	//昵称
	if($('#nickname').val()==""){
		
		$.alert("昵称不能为空！");
		return false ;
	}
	//邮箱
	if($('#nickmail').val()==""){
		
		$.alert("邮箱不能为空！");
		return false ;
	}
	//邮箱正则校验
	function checkEmail(){
		
		var str=$('#nickmail').val();
	    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
	    if (re.test(str)) {
	      
	    } else {
	      $.alert("请输入正确的邮箱");
	    }
	}
	checkEmail();
	//账号注册时间
	if($('#datepicker').val()==""){
		
		$.alert("账号注册时间不能为空！");
		return false ;
	}
	//最后登录时间
	if($('#datepickertme').val()==""){
		
		$.alert("最后登录时间不能为空！");
		return false ;
	}
	
	//所属高校
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
	
	
	//列举你参加过的高校
	return true ;
	
}



//曾经提问过的问题0-2个的id  曾提过的问题
function getaskIds(){
	var array1 = $('[id=questionname1]:checked');
	 
	  var askIdsArry =[];	
	  for(var i =0;i<array1.length;i++){
	  	askIdsArry.push(array1[i].value);
	  }
	   
	return askIdsArry;
	
}

//获取选择的问题id
function getaskPickIds(){
	var array1 = $('[id=questionname2]:checked');
	var PickIdsArry =[];
    for(var i =0;i<array1.length;i++){
  	  PickIdsArry.push(array1[i].value);
    }
	
	return PickIdsArry;
}
//获取曾参与的活动
function getactivIds (){
	var array1 = $('[id=offlineActivityname1]:checked');
	var activIdsArry =[];
	 for(var i =0;i<array1.length;i++){
	  	
	  	activIdsArry.push(array1[i].value);
	  }
	 
	return activIdsArry;
}
//获取选择的活动id
function getactivPickIds (){
	var array1 = $('[id=offlineActivityname2]:checked');
	 var activPickIdsArry =[];
	  for(var i =0;i<array1.length;i++){
	  	
	  	activPickIdsArry.push(array1[i].value);
	  }
	
	return activPickIdsArry;
}

