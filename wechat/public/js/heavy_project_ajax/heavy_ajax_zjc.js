//var base ="//api.gdqnzs.cn";  //设置的url固定路径的路径
var base ="//192.168.100.47:8080/qnzs";  //设置的url固定路径的路径
 var obj = {
	
	 ajax:function(url , data , sucs ,failure){
	 	
	 	$.ajax({
	 		type:"post",
	 		url:base+url,
	 		dataType:'json',
	 		data:data,
	 		 xhrFields: {
	          withCredentials: true
	       	},
	 		success:function(data){
	 			
	 		
	 		 sucs(data);
	 			
	 		},
	 		error:function(data){
	 			
	 		}
	 		
	 	});
	 	
	 },
	 
	 chatsend:function(url , data , sucs ,failure){
	 	$.ajax({
	 		type:"post",
	 		url:base+url,
	 		dataType:'text',
	 		data:data,
	 		success:function(data){
	 			
	 		 console.log(data);	
	 			 sucs(data);
	 		},
	 		error:function(data){
	 			
	 		}
	 	
	 	
	 	});
	 	
	 }
	
}
