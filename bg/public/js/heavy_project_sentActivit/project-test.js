
////192.168.100.47:8080/qnzs
//HeavyProjectApi.activityListUrl
   

    




 

//修改组织信息   
function updateInfo(){

    var row = $('#mytb').datagrid('getSelected');
  
    if(row){
              
       $('#user-modify').modal('show');
       obj.ajax("/bg/project/editActivityDetail",{'oid':row.oid},function(data){
       	 console.log(data);
       },function(data){});

    }else{    
         $('#user-modify').modal('hide');
         alert("请选择要修改的对象");
    };
}

//新增



//图片上传处理 start
     /* var image = '';

		function selectImage(file) {
			if(!file.files || !file.files[0]) {
				return;
			}
			var reader = new FileReader();
			reader.onload = function(evt) {
				document.getElementById('imghead').src = evt.target.result;
				
				image = evt.target.result;
			}
			reader.readAsDataURL(file.files[0]);
		}
    $(document).ready(function(){
    	
    	$('#file').fileupload({
			url:base + '/file_upload',
			dataType: 'json',
			autoUpload: true,
			done: function(e, data) {

				alert(data.result.url);
				imageUrl = data.result.url;
			},
			fail: function() {
				alert('出错');
			}
		});
       

    });*/
    
//图片上传处理  end

 //新增活动
function fn1(){
 	var activityType = $('#activityType option:selected').val();      //活动类型
 
    var activityName = $('#activityName').val();       //活动名称
 	
 	
 	var beginTime1= $('#beginTime1').datebox('getValue');    //活动报名时间开始
 	var endTime1= $('#endTime1').datebox('getValue');        //活动报名时间结束
 	var beginTime2= $('#beginTime2').datebox('getValue');    //活动时间开始
 	var endTime2= $('#endTime2').datebox('getValue');        //活动时间结束
 	
 	var longitude_number= $('#ac_mobile').val();             //联系电话
 	
    var  ordioSelect = $('input[name="radio2"]:checked').val()  //报名审核
    var TemplateType = $('#TemplateType option:selected').val()  //模板类型
    
   
//  console.log($('#yulan_box').attr('value'));
     var a =0;
     if($('#yulan_box').attr('value') ==1){
     	a =$('#yulan_box').attr('value');
     	alert(a);
     }
     
    console.log(activityName)   
//  console.log(imghead)
    console.log(activityType)
    console.log(beginTime1)
    console.log(endTime1)
    console.log(beginTime2)
    console.log(endTime2)
    console.log(longitude_number)
    console.log(ordioSelect)
    console.log(a);
    
    /********第2部分*********/
    var imghead = $('#preview2')[0].getAttribute('src');          //活动图片路径
    var edit_in =$('#edit_in').val()                               //项目动态-内容
    var porject_title =$('#porject_title').val()                 //项目标题
//  var activit_intruder =$('#activit_intruder').val()            //活动介绍
//  var request =$('.fl .takerequest').val();                    //报名要求
//  var pinxuan1 =$('#pinxuan1').val();                           //评选流程
    var prize  =$('#prize').val()                                 //奖项设置   
    
    
    function getAttrValue(){              //报名要求
        var request_arr = [];
	    $(".request input").each(function(i){
	        request_arr.push($(this).val());
	    });
	    console.log(request_arr);
	    
    
    }
    getAttrValue();
    function  getPinxuanValue(){        //评选
    	
    	var pinxuan1_arr = [];
    	var pinxuan2_arr = [];
	    
	       
	        $(".pinxuan2 input").each(function(i){
	           pinxuan2_arr.push($(this).val());
	        });
           pinxuan1_arr.push(JSON.stringify(pinxuan2_arr));
	    console.log(pinxuan1_arr);
	    console.log($(".pinxuan1>div").length);
	 
    }
    getPinxuanValue();
    
    function getPrizeValue(){                         //将项设置
    	var prize1_arr = [];
    	var prize2_arr = [];
        $(".prize2 input").each(function(i){
           prize2_arr.push($(this).val());
        });
       prize1_arr.push(JSON.stringify(prize2_arr));
	   
    }
    getPrizeValue()
    var mainCompany1= $('#mainCompany1').val()   //主办单位
    var mainCompany2= $('#mainCompany2').val()   //承办办单位
    var mainCompany3= $('#mainCompany3').val()   //协办单位
     
     console.log(imghead)
     console.log(edit_in)
     console.log(porject_title)
     console.log(activit_intruder)
//   console.log(request)
     console.log(pinxuan1.length)
     console.log(prize)
     console.log(mainCompany1)
     console.log(mainCompany2)
     console.log(mainCompany3)
     
     
     
     
    obj.ajax('/bg/project/addActivity',{
    	'did':areaName,
    	'name':activityType,
    	'activityName': activityName,
    	'type': activityType,
    	'TemplateType':$('#TemplateType option:selected').val() 
    	
        },
	    function(data){
	    
	    	console.log(data);
	            	    	   
    	    if(data.status=='OK'){
	            alert(data.msg);
	        	$('#mytb').datagrid('reload');
    		    $('#user-add').modal('hide');
    		     
	        }else{
	        	alert(data.msg);
	        };
	
	    },function(data){
	        alert('添加失败！');
	    })//ajax end
   
}   
 
//修改
// function updateInfo(){
// 	var row = $('#mytb').datagrid('getSelected');
//  if(row){
//   	     $('#user-update').modal('show');
//   	obj.ajax('',{},function(data){},function(data){});
//   	
//   	
//  }else{
//   	
//   	alert('请选择目标！');
//   	$('#user-update').modal('hide');
//  }
// 	
// }
 
//审核
//function examineHeary(n){
//	   var row = $('#mytb').datagrid('getSelected');
//
//	if (row){
//		layer.confirm('您确定要审核通过吗？', {
//			  btn: ['确定','取消'] //按钮
//			}, function(){
//			  layer.msg('审核通过成功！', {time: 1000 ,icon: 1});
//			  
//			    obj.ajax('/bg/project/auditActivityOne',{'orgId':row.orgId,"status":1},function(data){   //执行删除操作
//			    	console.log(data);
//			    	
//			    	if(data.status=='ERROR'){
//			    		
//			    		alert(data.msg);
//			    		
//			    	}else {
//			    		$('#mytb').datagrid('reload');
//			    	}
////					console.log('删除成功!');
//				
//				},function(){});
//			  
//			}, function(){
//				
//			  layer.msg('也可以这样', {
//			    time: 1000, //20s后自动关闭
//			    btn: ['明白了', '知道了']
//			  });
//		});
//   }else{   
//        alert('请选择目标');
//   }
//	
//	
//}


//删除
//function  delHeavy(n) {
// var row = $('#mytb').datagrid('getSelected');
//
//	if (row){
//		
//		layer.confirm('您确定要删除该用户吗！', {
//			  btn: ['确定','取消'] //按钮
//			}, function(){
//			  layer.msg('删除成功！', {time: 1000 ,icon: 1});
//			  
//			    obj.ajax('/bg/project/auditActivityOne',{'orgId':row.orgId,"status":3},function(data){   //执行删除操作
//			    	console.log(data);
//			    	
//			    	if(data.status=='ERROR'){
//			    		
//			    		alert(data.msg);
//			    		
//			    	}else {
//			    		
//			    		$('#mytb').datagrid('reload');
//			    	}
////					console.log('删除成功!');
//				
//				},function(){});
//			  
//			}, function(){
//				
//			  layer.msg('也可以这样', {
//			    time: 1000, //20s后自动关闭
//			    btn: ['考虑好了先吧', '知道了']
//			  });
//		});
//   }else{   
//        alert('请选择目标');
//   }
//	
//}

/******** 附件上传  *********/

//var oid = '001';
//var dg_activity;
//var ctx = '//www.12355.net';
//
////附件上传
//function uploadFile(){
//	$('#pickFileBtnNext').html("上传中......");
//	var dir  = 'activityFile';
//	var fileList =  document.getElementById("up_file").files;
//	$.ajaxFileUpload({
//      url: ctx+'/file_upload', //用于文件上传的服务器端请求地址
//      secureuri: false, //是否需要安全协议，一般设置为false
//      fileElementId: 'up_file', //文件上传域的ID
//      dataType: 'JSON', //返回值类型 一般设置为
//      success: function (data, status){
//      	data = JSON.parse(data);
//      	if(data.error == 0){
//  		    //alert("上传成功");
//  		    $('input[name="fileUrl"]').val(data.url);
//  		    $('#pickFileBtnNext').html("上传结束");
//      	}
//      },
//      error: function (data, status, e)//服务器响应失败处理函数
//      {
//          alert(e);
//      }
//	});
//	
//}


/*------三级联动--------*/

 	$(function(){
// 		alert("ddddd");
		/*初始化加载地市组织*/
		obj.ajax('/common/district/getCity',{'provinceId':440000},function(data){
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--市级--", "-1");
					var selects = document.getElementById("cityOid");
					selects.options.add(option);
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#cityOid").html("<option value='-1'>--暂无可选组织--</option>");
				}
			
		});
		/*初始化加载高校组织*/
		obj.ajax('/common/district/getShcool',{'provinceId':440000,'type':2},function(data){
				if(data){
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--请选择--", "-1");
					var selects = document.getElementById("shcoolOid");
					selects.options.add(option);    
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#shcoolOid").html("<option value='-1'>--暂无可选高校组织--</option>");
				}
			
		});
		
	  
	});
	

 function cityOidChange(obj){
		var pid = $(obj).val();
		var areaHtml = $('#areaOid').html('');
		if(pid != "-1"){
//			alert(pid);
			 obj.ajax('/common/district/getCity',{'provinceId':440100},function(data){
	   	alert(data.rows);
					if(data){
						data = data.rows;
						var selected = false;
						var option = null;
						option = new Option("--区/县--", "-1");
						var selects = document.getElementById("areaOid");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].districtName, data[i].did, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						//areaHtml.removeAttr("disabled");
					}else{
						$("#areaOid").html("<option value='-1'>--暂无--</option>");
						//areaHtml.attr("disabled","true");
					}
				});
			
			
			$.ajax({
				type: 'POST',
				url: base + '/common/district/getCity',
				data:{'provinceId':pid},
				dataType:'json',
				success:function(data){
					if(data){
						data = data.rows;
						var selected = false;
						var option = null;
						option = new Option("--区/县--", "-1");
						var selects = document.getElementById("areaOid");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].districtName, data[i].did, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						areaHtml.removeAttr("disabled");
					}else{
						$("#areaOid").html("<option value='-1'>--暂无--</option>");
						areaHtml.attr("disabled","true");
					}
				}
			});
			
			
		}else{
			areaHtml.html("<option value='-1'>--区/县--</option>");
			areaHtml.attr("disabled","true");
			$(obj).css("color","#999");

		}
	};
	
	
//获取高校下级 shcoolOid classOid
	function schoolOidChange(obj){
		var pid = $(obj).val();
		$("#reporterNames").val(pid);
		var areaHtml = $('#classOid').html('');
		if(pid != "-1"){
		//	areaHtml.removeAttr("disabled");
			$.ajax({
				type: 'POST',
				url: base + '/common/district/getCity',
				data:{'provinceId':pid},
				dataType:'json',
				success:function(data){
					if(data){
						data = data.rows;
						var selected = false;
						var option = null;
						option = new Option("--分院--", "-1");
						var selects = document.getElementById("classOid");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].districtName, data[i].did, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						areaHtml.removeAttr("disabled");
					}else{
						$("#classOid").html("<option value='-1'>--暂无--</option>");
						areaHtml.attr("disabled","true");
					}
				}
			});
		}else{
			areaHtml.html("<option value='-1'>--分院--</option>");
			areaHtml.attr("disabled","true");
			$(obj).css("color","#999");
//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
		}
	}	
	
	
// 
$('#cityOid').hide();
$('#shcoolOid').hide();
$('#areaOid').hide();
$('#classOid').hide();
//标签隐藏
$('#show1').hide();
$('#show2').hide();
function  changeOidType(n){
var n =	$('#oidType').val();
console.log(n);
	if(n==1){
		
		$('#cityOid').show();
		$('#areaOid').show();
		
		$('#shcoolOid').hide();
		$('#classOid').hide();
		$('#show1').show();
        $('#show2').show();
	}
	if(n==2) {
		
		$('#cityOid').hide();
		$('#areaOid').hide();
		
		$('#shcoolOid').show();
		$('#classOid').show();
		
	    $('#show1').show();
       $('#show2').show();
		
	}
	
}
/*------三级联动--end------*/	

