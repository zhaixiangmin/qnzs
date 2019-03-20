$(function () {
    var nextUrl =Utils.getQueryString("nextUrl");
})

var  regiterObj = JSON.parse( $.cookie('regiterObj'));  //获取存储的cookit对象
   console.log(regiterObj)
 
 
 
 //地区，高校 
 
 $('#areadid').click();//自执行点击事件
 var s =1;  //oArea  初始化地区高校的值
 function changeType(n){
 	$('#classOid').val("")//置空第3级数据
 	s=n ;//改变值
 	if(n==1){
 		obj.ajax('/common/district/getCity',{'provinceId':440000,"type":1},function(data){
				if(data){
					$('#cityOid').html('')
					data = data.rows;
					var html ="";
					html+='<option value="-1">--请选择--</option>';
					for(var i = 0;i<21;i++){
						html+='<option value="'+data[i].did+'" did="'+data[i].did+'">'+data[i].districtName+'</option>';
					}
					$('#cityOid').html(html)
				}else{
					
				}
			
		});
 	}
 	if(n==2){
 		obj.ajax('/common/district/getCity',{'provinceId':440000,'type':2},function(data){
 			        console.log(data)
					$('#cityOid').html('')
					data = data.rows;
					console.log(data)
					
					var html ="";
					html+='<option value="-1">--请选择--</option>';
					for(var i = 21;i<186;i++){
						html+='<option value="'+data[i].did+'" did="'+data[i].did+'" >'+data[i].districtName+'</option>';
					}
					
					$('#cityOid').html(html)
				
		});
 	}
 }

//二级菜选择

function  cityOidChange(obj){
	var did =$(obj).val();
	
	$.ajax({
		type:"post",
		url: Qnzs.path+ "/common/district/getCity",
		data:{'provinceId':did},
		async:true,
		success:function(data){
			if(data){
					$('#classOid').html('')
					var data = data.rows;
					var html ="";
					html+='<option value="-1">--请选择--</option>';
					for(var j = 0;j<data.length;j++){
						
						html+='<option value="'+data[j].did+'" >'+data[j].districtName+'</option>';
					}
					$('#classOid').html(html)
				}else{
					
				}
			
		}
	});
	
}


/*****************  注册    ***************/
$('.submit_btn').click(function(){
	
	        //勾选验证
           if(!server_flay){
           	  $.alert('请阅读并接受用《用户服务协议》');
           	  return ;
           }
    	    //取出cookie保存的值
    	    var  regiterObj = JSON.parse( $.cookie('regiterObj'));  //获取存储的cookit对象
    	    
   	   	    obj.ajax('/pc/account/addAccount',{
   	   	    	'accountToken':$.cookie('__accessToken'),   //一号通
		   	    'mobile':regiterObj.mobile,      //  手机号
		   	    'password':regiterObj.newPassword,   //密码
		   	    'phoneCode':regiterObj.phoneSecurityCode,       //短信验证码
		        'did':$('#classOid').val(),      //地区
		        'typeDistrict':s            //高校或地区  int 如1
			},function(data){
				console.log(data);
				if(data.status=='OK'){
				   	  alert(data.msg); 
			          var nextUrl = Utils.getQueryString("nextUrl");
		            if (!nextUrl) {
		            	nextUrl = "../../index.html";

		            }
		            window.location.href=nextUrl;
		            //window.location.href = bigDataUrl+'/account/web/register.html?appId=0110&finishurl='+ctx;
		        }else{
			          alert(data.msg); 
		        };
			},function(data){})
	   	  
	  
})

