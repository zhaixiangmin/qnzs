//var base ="//192.168.100.49:8080/qnzs"
//var base ="//api.gdqnzs.cn";  //设置的url固定路径的路径
//var base ="//169.168.200.20:8080/qnzs";  //设置的url固定路径的路径  积林
// var base = "//api.12355.net/";
var base = Qnzs.path;

// 青年之声appid
   var appid = 'wx2cccc41315c0ac7a';
// 青年惠appid
// var appid = 'wx0bd816b3200db578';
// 测试appid
//	var appid = 'wxa3d6dc0937208f1d';
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
