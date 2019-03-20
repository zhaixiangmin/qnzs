
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
	

    /*** 获取权限 ***/
    var limits = Utils.getQueryString('limit'); // 权限
    console.log('limits', limits);
    /***  隐藏权限 ***/
    $('#toolbar li').hide(); // 隐藏所有按钮

    if(limits) {
        limits = limits.split(','); // 将字符串解析成数组
        for(var i=0; i<limits.length; i++) {
            var limit = limits[i];
            $('#' + limit).show(); // 显示权限按钮
            }
    }
    
    
    var banner_flay =$('#user_disabled').css('display');  //获取显示和隐藏的属性值
   
    if(banner_flay =='block' ){
    	$('#stop_use').show();   //显示禁用按钮
    }else{
    	
    	$('#stop_use').hide();  
    	
    }
   
///组织管理数据表格以及分页
$('#userTable').datagrid({ title: '用户管理',  //表格名称           iconCls: 'icon-edit',  //图标
           width:1300,   //表格宽度
           height:490,   //表格高度，可指定高度，可自动
           border:true,  //表格是否显示边框
           url:base+'/bg/account/findAllAccount',   //获取表格数据时请求的地址
           columns:[[
             
             {field:'mobile',title:'手机',width:150 ,
                formatter: function(value,row,index){
			        	return  value.substr(0,(value.length-4))+'****';
			    },sortable:true
             
             
             },
             {field:'realname',title:'昵称',width:150},
             {field:'type',title:'用户类型',width:200,
             formatter: function(value,row,index){
		        		  return 1 == value ? '公众用户' : 3 == value ? '咨询导师' : 2 == value ? '站点管理员' : 4 == value ? '团组织用户' : '公众用户';
		        	  },sortable:true},
             {field:'email',title:'邮箱',width:150},
             {field:'createTime',title:'创建时间',sortable:true,width:200,
//	             formatter: function(value,row,index){
//	                    if (value){
//	                        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//	                    }else{
//	                        return '';
//	
//	                    }
//	
//	                }
             },
             {field:'lastSigninTime',title:'最近登录时间',sortable:true,width:200,
                
//              formatter: function(value,row,index){
//                  if (value){
//                      return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//                  }else{
//                      return '';
//
//                  }
//
//              }
             },
             {field:'disabled',title:'使用状态',width:100,sortable:true,formatter: function(value,row,index){
	                //   return 0 == value ? '启用' : 1 == value ? '禁用';
	                   return 0 == value ? '启用' : 1 == value ? '禁用' : '';
	
	             }
             },
             {field:'username',title:'username',width:150,hidden:true}
             
        
          ]],
           pagination:true,//如果表格需要支持分页，必须设置该选项为true
           pageNumber: 1,
           pageSize:15,   //表格中每页显示的行数
           pageList:[5,10,15],
           rownumbers:true,   //是否显示行号
           nowrap: false,   
           striped: true,  //奇偶行是否使用不同的颜色
           method:'get',   //表格数据获取方式,请求地址是上面定义的url
           sortName: 'create_time',  //按照ID列的值排序
           sortOrder: 'desc',  //使用倒序排序
//         idField: 'id',    //打开只能获取单行
          
           loadMsg:'数据正在努力加载，请稍后...', 
           singleSelect:false,//加载数据时显示提示信息   false为全选  true为单选
           frozenColumns: [[  //固定在表格左侧的栏
                       {field: 'ck', checkbox: true},
                     ]],
           onBeforeLoad:function(param){  
//         	var map = new Map();
//			map['createTime']='create_time'; 
//			map['lastSigninTime']='last_signin_time'; 
//			map['type']='type'; 
//			
//		        onSortColumn(param,map);  
		    },
            
            onClickRow: function(index, data) {
                //将所有checkbox修改为未选中
               // $('#userTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
                //将这次的checkbox标记为选中
               // $('#userTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
            }
});

   

	
function onSortColumn(param,map){  

    //取出map中字段的映射关系值  
    var fieldSort=map[param.sort]; 
    if(fieldSort!='' && fieldSort!=undefined){  
        //设置新的排序字段名，设置完之后，发送请求时一并会发送到服务端  
        param.sort=fieldSort;  
    }  
} 

//数据列表过滤
$('#userSearchBtn').click(function(){

   	var userkeyWord = $('#userkeyWord').val();//关键字
	var userType = $('#userType  option:selected').val(); //用户类型
    var userTal = $('#userTal').val();  //用户手机
	//var areaId = $('#areaId').val();//所属机构
	var data={'keyword':userkeyWord,'userType':userType,'mobiles':userTal,'quxian':searchDid};
	
    $('#userTable').datagrid({
    	queryParams: data
    });
    
	
});

function quxuan(obj){
	var pid = $(obj).val();
	$("#areaId").val(pid);
	if(pid!='-1'){
		searchDid = pid;
	}
	
}

//置空查询
$('#userClearBtn').click(function(){
	
	 $('#userkeyWord').val('');
	 $('#userType option:selected').attr('selected',false);
	 $('#userMechanism option:selected').attr('selected',false);
	 $('#userTal').val('');
	
	  $('#areaSel option:selected,#auditStatusSel option:selected  ,#oidType option:selected').attr('selected',false);
      $('#cityOid option:selected,#shcoolOid option:selected ,#areaOid option:selected,#classOid option:selected').attr('selected',false);
})

var did = "";
//新增
$('#userInfoAdd').click(function(){
	
	var userPsd = $('#userPsd').val();                             //密码
	var ConfirmPsd = $('#ConfirmPsd').val();	                   //确认密码
	console.log(userPsd,ConfirmPsd);
	console.log($('#oidType option:selected').val());
	console.log($('#userAreaType3 option:selected').val());
	if(userPsd ==ConfirmPsd){   
		
	 	//var userAreaType3 = $('#userAreaType3 option:selected').val(); //所属机构类型3
	 	
	 	if($('#cityOid2 option:selected').val()!="-1"){
	 		did = $('#cityOid2 option:selected').val();
	 	}
	 	
	 	
	 	if($('#shcoolOid2 option:selected').val()!="-1"){
	 		did = $('#shcoolOid2 option:selected').val();
	 	}
	 	
	 	if(!$('#areaOid2 option:selected').val()=="-1"){
	 		did = $('#areaOid2 option:selected').val();
	 	}
	 	
	 	if(!$('#classOid2 option:selected').val()=="-1"){
	 		did = $('#classOid2 option:selected').val();
	 	}
	 	
	 	var userType = $('#userTy option:selected').val();           //用户类型
	    var userName = $('#userName').val();                           //姓名
	 	var userMail = $('#userMail').val();                           //邮箱
	 	var userTal = $('#UuserTal').val();	                           //手机
	    var userTal2 = $('#userTal2').val();                           //办公电话
	 	var userPsd = $('#userPsd').val();                             //密码
	 	var ConfirmPsd = $('#ConfirmPsd').val();	                   //确认密码
	    var userState = $('#userState').val();  
	   
	   
	    if(Validator.validate('#form1')){
	    	console.log($('#oidType option:selected').val());
	    
		    obj.ajax('/bg/account/addAccount',{
		            	'type': userType,            //用户类型
		            	'did':did,          //所属机构
		            	'realname':userName,          //姓名
		            	'email':userMail ,            //邮件
		            	'mobile': userTal,            //手机号码
		            	'telephoneAdd':userTal2 ,     //办公电话
		            	'password': userPsd,          //密码
		            	'disabled':userState,          //使用状态
		            	'typeDistrict':$('#oidType2 option:selected').val(),   //用户地域归属类型（1-地市，2-高校）
		            	'address':$('#address').val()
		            },function(data){
		            	
		            	console.log(data);
			   	    	if(data.status=='ERROR'){
				           	$.alert(data.msg);
				        }else{
				            	$.alert('新增成功！');
			   	    	    $('#user-add').modal('hide');
			   	    	    $('#userTable').datagrid('reload');
				        };
		            },function(data){
		            	console.log('请求失败！');
		        }
		    );
	    	
	    }else{
//	    	
	    }  
    }else{
    		$.alert('密码和重置密码不对！请重新输入');
    }
})



//修改
function updateUserInfo(n){

    var row = $('#userTable').datagrid('getSelections');
     if(row.length>1||row.length<=0){
     	$.alert('请选择一条数据操作')
     	return ;
    }
     

	if (row){
		  
		$('#user-modify').modal('show');
		
		obj.ajax('/bg/account/findAccountById',{'username':row[0].username},function(data){
			    //回显数据 
			    console.log(data);
			    $("#oidType3 option[value='"+data.rows.typeDistrict+"']").attr("selected", "selected"); //所属机构类型1
//	            $("#ZuserAreaType2 option[value='1']").attr("selected", "selected"); //所属机构类型2 
//			    $("#ZuserAreaType3 option[value='1']").attr("selected", "selected"); //所属机构类型3*/
            	$('#userType3').val(data.rows.type);
			    $('#userName2').val(data.rows.realname);                                               //姓名
			 	$('#userMail2').val(data.rows.email);                                               //邮箱
			 	$('#ZuserTal').val(data.rows.mobile);	                                             //手机                           
			   // $('#ZuserTal2').val(data.rows.telephoneAdd);                                               //办公电话
			    $('#userID2').val(data.rows.username);                                                 //登陆账号
			   // $('#userPsd2').val(data.rows.password);                                                //登陆密码
	           // $('#ConfirmPsd2').val(data.rows.password);	                                         //确认登陆密码
	            $('#userState2').val(data.rows.disabled); 
				    //状态
				 
				 obj.ajax('/common/district/getParentByUserDid',{'did':data.rows.did},function(data){
        			
		        	$("#oidType1").val(data.one);
		        	changeOidType1(data.one);
		        	if(1==data.one){
		        		$("#cityOid1").val(data.two.did);
		        		if(data.three.did!=""){
		        			cityOidChange1(data.two.did);
		        			setTimeout(function () { 
							     $("#areaOid1").val(data.three.did);
							    }, 300);
		        			
		        		}
		        	}
		        	if(2==data.one){		        		
		        		$("#shcoolOid1").val(data.two.did);
		        		if(data.three.did!=""){		        			
		        			schoolOidChange1(data.two.did);
		        			setTimeout(function () { 
							      $("#classOid1").val(data.three.did);
							    }, 300);
		        			
		        		}
		        	}
		        	
		        },function(data){}); 
				    
				    
				    
				    
				    
			     		
		}, function(){$.alert("信息添加失败");});
		
     }else{     	
          $.alert('请选择目标');
		$('#user-modify').modal('hide');
     }
};
var did_2='';
function updateInfo(){
	
	$.messager.confirm('修改', '确认吗?', function(r){
    if (r){
                   
			var row = $('#userTable').datagrid('getSelected');
		//	var	ZuserAreaType3 = $('#ZuserAreaType3 option:selected').val();  //所属机构类型3
			var userType3 =	$('#userType3').val();            //用户类型
			var userName2 = $('#userName2').val();                            //姓名
			var userMail2 =	$('#userMail2').val();                            //邮箱
			var ZuserTal  =	$('#ZuserTal').val();	                          //手机                           
			//var ZuserTal2 = $('#ZuserTal2').val();                            //办公电话

		//	var userPsd2  = $('#userPsd2').val();                             //密码
		//	var ConfirmPsd2 =$('#ConfirmPsd2').val();                        //确认密码
			
			var userState2 =$('#userState2').val();                           //状态
			
			//console.log(userType3+""+userName2+"--"+userMail2+"--"+ZuserTal+"--"+ZuserTal2+"--"+userID2+"--"+userPsd2+"--"+userState2);
			
			/*if($('#userPsd2').val() !=$('#ConfirmPsd2').val() ){
				alert('密码和确认密码不对，请重新输入!');
				return ;
			}*/
			
			/*if($('#cityOid3 option:selected').val()!="-1"){
		 		did_2 = $('#cityOid3 option:selected').val();
		 	}
		 	
		 	
		 	if($('#shcoolOid3 option:selected').val()!="-1"){
		 		did_2 = $('#shcoolOid3 option:selected').val();
		 	}
		 	
		 	if(!$('#areaOid3 option:selected').val()=="-1"){
		 		did_2 = $('#areaOid3 option:selected').val();
		 	}
		 	
		 	if(!$('#classOid3 option:selected').val()=="-1"){
		 		did_2 = $('#classOid3 option:selected').val();
		 	}*/
 	
			if(Validator.validate('from2')){
				
				obj.ajax('/bg/account/updatAccount' ,{
		        	'did':updatedid,          //所属机构
		        	'type': userType3, 
		        	'realname':userName2,          //姓名
		        	'email':userMail2 ,            //邮件
		        	'mobile': ZuserTal,            //手机号码
		        	//'telephoneAdd':ZuserTal2 ,     //办公电话
		        	'disabled':userState2 ,         //使用状态
		        	'username': row.username,         //密码
		        	'address':$('#upd_ZuserAddres').val() ,  //
		        	'typeDistrict':$('#oidType3 option:selected').val()   //用户地域归属类型（1-地市，2-高校）
		            
			   },function(data){
			   	  console.log(data)
						if(data.status=='ERROR'){  
				           	$.alert('您输入的手机号已有注册，请输入其他手机号吧！');
				        }else{
				           $.alert('修改成功！');
			   	    	  $('#user-modify').modal('hide');
			   	    	  $('#userTable').datagrid('reload');
				        };
		               // $('#mytb').datagrid('reload');
					},function(data){
						console.log('信息修改失败！');
				});	
			}
           }
        });
			
}

//启动
function userStart(){
	
	var row = $('#userTable').datagrid('getSelections');
	
	
	if(!(row.length<1)){         
		
		    var s1 = [];
			for(var i =0 ;i<row.length;i++){
				s1.push(row[i].username);
			} 
		
				$.messager.confirm('启用', '确认吗?', function(r){
                if (r){
                    obj.ajax('/bg/account/changeStatus',{'username':s1.toString(),"status":0},
						function(data){
							console.log(data);
							if(data.status=='ERROR'){ 
							           	
							           $.alert(data.msg);
							}else{
							           $.alert('启用成功！');
						   	    	 $('#userTable').datagrid('reload');
							};
						},
					   function(data){
			
					   });

                }

        });
	}else{                                                                       //没有选中目标执行以下程序
		
		$.alert('请选择目标');
		$('#user-start').modal('hide');
		
	}
}


//禁用
function userStop(n){
	
	var row = $('#userTable').datagrid('getSelections');
	if(!(row.length<1)){                                                            //判断是否选中目标，选中触发模态框
		
		var s2 = [];
		for(var i =0 ;i<row.length;i++){
			s2.push(row[i].username);
		} 
		
		$.messager.confirm('禁用', '确认吗?', function(r){
                if (r){
                    obj.ajax('/bg/account/changeStatus',{'username':s2.toString(),"status":1},
						function(data){
							console.log(data);
							if(data.status=='ERROR'){ 
							           	
							           $.alert(data.msg);
							}else{
							           $.alert('禁用成功！');
						   	    	 $('#userTable').datagrid('reload');
							};
						},
					   function(data){
			
					   });

                }

        });

	}else{   //没有选中目标执行以下程序
		
		$.alert('请选择目标');
		$('#user-stop').modal('hide');
	}
}

//重置密码

function userReset(n){
	var row = $('#userTable').datagrid('getSelections');
	
	if(!(row.length<1)){ //判断是否选中目标，选中触发模态框
	
		$('#userReset').modal('show');
		
	}else{   //没有选中目标执行以下程序
		
		$.alert('请选择一条用户');
		$('#user-reset').modal('hide');
		
	}
}

$('#userRrsetBtn').click(function(){                                   //确定启动发送到后台
	var row = $('#userTable').datagrid('getSelections');
	var s3 = [];
	for(var i =0 ;i<row.length;i++){
		s3.push(row[i].username);
	} 
			
	obj.ajax('/bg/account/resetBatchAccountPW',{'usernames':s3.toString()},function(data){ 
		console.log(data)
		if(data.status=='OK'){ 
	            $.alert('重置成功！');
	    	  $('#userReset').modal('hide');
	    }else{
	          
	          $.alert(data.msg);
	    };
	},function(data){
						console.log('重置失败！')
	});
});

//重置密码  end





// 三级联动
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
var searchDid = '';
//三级联动调用函数
	//获取区/县
	function cityOidChange(obj){
		var pid = $(obj).val();
		searchDid = pid;
		var areaHtml = $('#areaOid').html('');
		if(pid != "-1"){
			
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
		searchDid = pid;
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



$('#maxSeaBtn').click(function(){
//	layer.open({
//	  type: 1,
//	  skin: 'layui-layer-demo', //加上边框
//	  area: ['250px', '300px'], //宽高
//	  content:''
//	});
	
//	layer.open({
//	  type: 1, 
//	   area: ['450px', '300px'], //宽高
//	  content: '<div> <textarea rows=10 cols=43></textarea><button>确定</button></div>' //这里content是一个普通的String
//	});
		layer.open({
		     title: '手机号批量查询',
		  
		  content: '<textarea rows=7 cols=34></textarea>'
		}); 	
	   
	
	
	
	
	
})

	/******  调用函数清楚 新增表单 ******/
	function orgReset(){      
		$('#user-reset').click(function(){
			Validator.removeErrors(document.getElementById('form1'));
			
		});
		
		$('#user-reset').click();
	}



/*************************                    手机号修改                      *****************************/
//判断手机号是否已经注册
$('#newphone').blur(function(){

	if($(this).is("#newphone")){            //手机号判断
			var ph=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
			if($("#newphone").val()!=""){
			if(!(ph.test($("#newphone").val()))){
				$.alert("亲，请输入正确手机号")
				
				
				$(this).css("border","1px solid #BD362F");
			  
				 Code_flay =false;  
				return false;
			}else if(ph){
			
				// 验证手机号是否注册
				obj.ajax('/commons/checkMobile',{'mobile':$('#newphone').val()},function(data){
		            console.log(data);
		            if(data.status == 'ERROR'){
		            	$.alert("手机号码已注册,请换个手机号码！")
		            	
		            	 	Code_flay =true;  
		            }else{
		            		$.alert('亲，手机号未注册，可以使用！')
		            	 Code_flay =false;  
		            	
		            }
		        },function(data){})
				return true;
			}
			}else{
				$(".spa2").text("");
	    }
	}
	
});
$('#update_moblie').click(function(){
	    $('#user-modify').modal('hide');
	    setTimeout(function(){
	    	
	    	$('#update_moblie_box').modal('show');
	    	
	    },500)
	    
	
})
 //获取手机验证码
 
Code_flay =true;  
function sendYanzhengCode(){
	   var PhoneSecur=$('#newphone').val();
	   
	   
	   if(!PhoneSecur){
	   	   alert('新手机号码不能为空!')
		      	return;
	   	
	   	
	   }
	  var validCode= $("#verification").val();
		          if(!validCode){
			
			     alert('图片验证码不能为空!')
		      	return;
		         }
     Code_flay =true;  
	if(Code_flay ==true){
   	    Code_flay =false;
        obj.ajax('/bg/account/updatePhoneSecurityCodea',{'phone':$('#newphone').val(),'updateMobileValidCode':$("#verification").val()},function(data){
			
			console.log(data);
			if(data.status =='ERROR'){
			   alert('图片验证码错误，请重新输入!');
			   
			    
			   $('.prompt').html('亲，验证码在发送失败！');
			}
			if(data.status =='OK'){
			   alert(data.msg);
			   $('.prompt').html('亲，验证码在发送成功！');
			   
			    $('.get_code').css('display','none');
		        $('.get_code').css({'display':'block','font-size':'14px'});   
		        $('.get_code').html('(<em>60</em>)秒后可以重发');
		    
		        var  time =setInterval(function(){
			    	$('.get_code em').html($('.get_code em').html()-1);
			    	if($('.get_code em').html()<=0){
			    		$('.get_code').css('background','#c8c8c8');//验证码高亮
			    		   Code_flay =true ;  //重新打开锁
			    		  clearInterval(time);
			    		  $('.get_code').html('重发验证码');
			    	}
		   	    },1000);
			   
			   
			   
			}
		},function(data){})
        
	   
    }  
	
}

// 获取图片流
		
function  changeModel(){
		
var xmlhttp;
   
xmlhttp=new XMLHttpRequest();
//xmlHttp = createXMLHttpRequest();
xmlhttp.open("GET",Qnzs.path+"/pc/account/updateMobileValidCode",true);
xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");  
xmlhttp.setRequestHeader("Content-Type", "application/xml"); 
xmlhttp.withCredentials = true;
xmlhttp.responseType = "blob";
xmlhttp.onload = function(){
    console.log(this);
    if (this.status == 200) {
        var blob = this.response;
        var img = document.getElementById("imagesyanz");
        img.onload = function(e) {
            window.URL.revokeObjectURL(img.src); 
        };
        img.src = window.URL.createObjectURL(blob);
        
        
    }
}
xmlhttp.send();
		
}
	
changeModel()  //初始化一遍

/******     获取用户id        ******/
obj.ajax('/commons/getSessionAccount',{},function(data){
	console.log(data)
	if(data.account.username){
		
		username =data.account.username;
	}
},function(data){});
    
	
/******* 手机号提交修改  ********/
$('#Upate_moblie_btn').click(function(){
	
   var 	copy_newphone =$('#newphone').val();
    var row = $('#userTable').datagrid('getSelections');
	
    if($('#newphone').val() !=''&&$('#yangzheng_code').val()!=''){
    	obj.ajax('/bg/account/updatePhoone',{'username':row[0].username,'phone':$('#newphone').val(),'code':$('#yangzheng_code').val()},function(data){
	  	  	if(data.status == 'OK'){
	  	  		
	        	
	       }else {
	       	   
	        	alert(data.msg);
	       }
    	},function(data){});
    }else {
    	alert('亲，手机号和验证码不能为空！');
    }
})