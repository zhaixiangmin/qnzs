var base = Qnzs.path;


//var base="//api.gdqnzs.cn";  //设置的url固定路径的路径
////api.gdqnzs.cn/project/activityDetail?activityId=21
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
	 	
	 },
	 ajaxGet:function(url , data , sucs ,failure){
	 	$.ajax({
	 		type:"get",
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