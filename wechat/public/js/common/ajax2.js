//var base ="//192.168.100.49:8080/qnzs"
var base ="https://api.12355.net";  //设置的url固定路径的路径
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
