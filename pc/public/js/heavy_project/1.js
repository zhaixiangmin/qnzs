var datas;
 function sub2(){
     alert(datas);
     datas=eval(datas);
     return datas;
 }
 
$(document).ready(function sub(){
   alert("hi");
     $.ajax({  
       dataTypes:"JSON",//数据类型为json格式
       contentType: "application/x-www-form-urlencoded; charset=utf-8", 
       type:"GET",  
       data:null,
       async:false,
       url:"/Blog/GetListBlogServlet",  
       success:function(data){ 
         alert(data);
         datas=data;
       } ,
       error:function(){
         alert("error");
       },
       statusCode: {404: function() {  
            alert('page not found'); }  
         }
       }); 
       
  });
var options={
    "id":"page",//显示页码的元素
    "data":datas,//显示数据
    "maxshowpageitem":3,//最多显示的页码个数
    "pagelistcount":2,//每页显示数据个数
    "callBack":function(result){
             var cHtml="";
        for(var i=0;i<result.length;i++){
            cHtml+="<li>"+ result[i].title+"</li>";//处理数据
        }
        $("#demoContent").html(cHtml);//将数据增加到页面中
    }
};
   page.init(datas.length,1,options);