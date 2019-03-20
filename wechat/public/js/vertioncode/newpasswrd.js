		//获取手机号
var phone =JSON.parse( $.cookie('getpsd')).mobile
//var s = phone.slice(0,phone.length-4);
//$('.phone_txt').html(s+"****");


//提交申诉
$('.suergur').click(function(){
	
	 if($('#newpaserd').val()!=$('#suerpaserd').val()){
	   	alert('两次输入的密码不一致！');
	   	return;
	 }
	  console.log($('#newpaserd').val())
	  console.log($('#suerpaserd').val())
     $.ajax({
       	type:"post",
       	url:Qnzs.path+"/pc/accountAppeal/replacePassword",
       	async:true,
       	data:{
             "mobile":phone, // 用户ID
             "password": $('#newpaserd').val(), // 新密码
             "rePassword": $('#suerpaserd').val(), // 确认密码
        },
       	success:function(data){
       		
       		if(data.status =="OK"){
       			$.alert(data.msg).then(function(){
       				
       				window.location.href ="../../../index.html"
       			})
       		}
       	}
       });
	
})

//密码校验
$(".padd_box input").blur(function(){
	
	if($(this).is("#newpaserd")){             //姓名判断
		var na=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		if($("#newpaserd").val()!=""){
			if(!(na.test($("#newpaserd").val()))){
				
				$(this).css("border","1px solid #BD362F")
				alert("请输入6-12个数字和字母组合的密码")
				return false;
			}else if(na){
				$(this).css("border","none");
				
				return true;
			}
		}else{
			
		}
	}
	
})