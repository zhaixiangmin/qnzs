// var base ="http://qnzsapitest.2030y.com/";  //测试环境
// var base = "https://api.12355.net/";   //正式发布ip地址
// var base ="http://169.168.200.6:8080/qnzs"   //大神
//var base ="http://169.168.200.3:80/qnzs"   //敏捷
var base = Qnzs.path;
//var base="https://192.168.100.22:8080/qnzs";  //王玉环
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

 //表单序列化转为json数组,count字段个数
$.fn.serializeJSONArray = function(count)    
{
	var arr = [];
    var o1 = {};
    var a = this.serializeArray();
    $.each(a, function(index) {
    	if (o1[this.name]) {
    		arr.push(o1);
    		o1 = {};
    		o1[this.name] = this.value || '';
    	} else {
    		o1[this.name] = this.value || '';  
    	}
    	if((index + 1) == a.length){
    		arr.push(o1);
    	}
    });    
    return arr;    
};

//表单序列化转为json对象
$.fn.serializeJSONObject = function()    
{    
   var o2 = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o2[this.name]) {    
           if (!o2[this.name].push) {    
               o2[this.name] = [o2[this.name]];    
           }    
           o2[this.name].push(this.value || '');    
       } else {    
           o2[this.name] = this.value || '';    
       }    
   });    
   return o2;    
};
