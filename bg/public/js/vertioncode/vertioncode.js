$('#vertioncode').datagrid({ title: '申诉管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/accountAppealManager/accountAppealList',   //获取表格数据时请求的地址
	           columns:[[
			        {field:'id',title:'编号',hidden:true,align : 'center',width : $(this).width() * 0.08},
			        {field:'mobile',title:'手机号 ',align : 'center',width : $(this).width() * 0.1},
			        {field:'realname',title:'昵称',align : 'center',width : $(this).width() * 0.1},
			        {field:'sendEmail',title:'邮箱',align : 'center',width : $(this).width() * 0.1},
			        {field:'districtName',title:'所属区域/高校',align : 'center',width :$(this).width() * 0.1},
			        {field:'createDate',title:'申诉提交时间 ',align : 'center',width : $(this).width() * 0.1},
			        {field:'validNum',title:'正确项数',align : 'center',width :100,sortable:true},
			        {field:'auditStatus',title:'审核状态 ',align : 'center', width :$(this).width() * 0.1,
			        	formatter: function(value,row,index){
			        		if(value ==0){
			        			return "待审核";
			        		}
			        		if(value ==1){
			        			return "审核通过";
			        		}
			        		if(value ==2){
			        			return "审核不通过";
			        		}
				        }
			       }
			   ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber:1,
	           pageSize:10,   //表格中每页显示的行数
	           pageList:[10,20,50],
	           rownumbers:true,   //是否显示行号
	           nowrap: false,   
	           striped: true,  //奇偶行是否使用不同的颜色
	           method:'get',   //表格数据获取方式,请求地址是上面定义的url
	           sortName: 'create_date',  //按照ID列的值排序
	           sortOrder: 'desc',  //使用倒序排序
	           idField: 'id',
	           loadMsg:'数据正在努力加载，请稍后...', 
	           singleSelect:false,//加载数据时显示提示信息
	           frozenColumns: [[  //固定在表格左侧的栏
	                       {field: 'ck', checkbox: true},
	                     ]],
	            onClickRow: function(index, data) {
	                //将所有checkbox修改为未选中
	                $('#banner').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", true);
	                //将这次的checkbox标记为选中
	                $('#banner').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	});

function appealDetail(){
	var row = $('#vertioncode').datagrid('getSelections');
	console.log(row)
	
	if(row.length == 1){
		$('#user-look').modal('show');
		//审核状态  0待审核，1审核通过，2审核不通过
		if(row[0].auditStatus==0){
			$(".pass_statue").html("待审核");
			$(".btn1").show();//隐藏审核按钮
			$(".btn2").hide();//显示查看按钮
		}
		if(row[0].auditStatus==1){
			$(".pass_statue").html("审核通过");
			$(".btn1").hide();//隐藏审核按钮
			$(".btn2").show();//显示查看按钮
		}
		if(row[0].auditStatus==2){
			$(".pass_statue").html("审核不通过");
			$(".btn1").hide();//隐藏审核按钮
			$(".btn2").show();//显示查看按钮
		}
		openAppealDetail(row[0].id);//调用函数
	}else{
		 $.alert('请选择一项进行操作');
	}
	
}

//申诉详情
function openAppealDetail(id){
	$.ajax({
	   	type:"post",
	   	url:Qnzs.path+"/bg/accountAppealManager/accountAppealDetail",
	   	async:true,
	   	data:{
	        "accountAppealId": id,// 用户ID
	    },
	   	success:function(data){
	   		var data =data.dataList;
	   	     $('.mobile').html(data.mobile?data.mobile:"无");
	   	     $('.realname').html(data.realname?data.realname:"无");
	   	     $('.sendEmail').html(data.sendEmail?data.sendEmail:"无");
	   	     $('.districtName').html(data.districtName?data.districtName:"无");
	   	     $('.createDate').html(data.createDate?data.createDate:"无");//申诉提交时间
	   	      $('.registerDate').html(data.registerDate?data.registerDate:"无");//最后登录时间
	   	     $('.lastLoginDate').html(data.lastLoginDate?data.lastLoginDate:"无");//最后登录时间
	   	     $('.activityTitle').html(data.activityTitle?data.activityTitle:"无");//最后登录时间
	   	   
	   	     //比对结果
	   	     //邮箱
	   	      $('.sendEmailValid').html("");
	   	     if(data.sendEmailValid=="1"){
	   	     	$('.sendEmailValid').parent().css("color","#333");
	   	     	 $('.sendEmailValid').addClass("icon-true");  
	   	     	 $('.sendEmailValid').html("");
	   	     }else{
	   	     	
	   	     	$('.sendEmailValid').removeClass("icon-true").parent().css("color","red");  //邮箱
	   	     	$('.sendEmailValid').html(data.accountEmail?data.accountEmail:"无");
	   	     }
	   	    //地区高校
	   	    $('.schoolDidValid').html("");
	   	     if(data.schoolDidValid=="1"){
	   	     	$('.schoolDidValid').parent().css("color","#333");
	   	     	 $('.schoolDidValid').addClass("icon-true");  
	   	     	 $('.schoolDidValid').html("");
	   	     }else{
	   	     	
	   	     	$('.schoolDidValid').removeClass("icon-true").parent().css("color","red");  //邮箱
	   	     	$('.schoolDidValid').html(data.accountDistrictName?data.accountDistrictName:"无");
	   	     }
	   	     //注册时间比对结果
	   	      $('.registerDateValid').html("");
	   	     if(data.registerDateValid=="1"){
	   	     	$('.registerDateValid').parent().css("color","#333");
	   	     	 $('.registerDateValid').addClass("icon-true");  
	   	     	 $('.registerDateValid').html("");
	   	     }else{
	   	     	
	   	     	$('.registerDateValid').removeClass("icon-true").parent().css("color","red");  //邮箱
	   	     	$('.registerDateValid').html(data.accountRegisterDate?data.accountRegisterDate:"无");
	   	     }
	   	     //最后登录时间比对结果
	   	     $('.loginDateValid').html("");
	   	     $('.loginDateValid').html("");
	   	     if(data.loginDateValid=="1"){
	   	     	$('.loginDateValid').parent().css("color","#333");
	   	     	 $('.loginDateValid').addClass("icon-true");  
	   	     	 $('.loginDateValid').html("");
	   	     }else{
	   	     	
	   	     	$('.loginDateValid').removeClass("icon-true").parent().css("color","red");  //邮箱
	   	     	$('.loginDateValid').html(data.accountLastLoginDate?data.accountLastLoginDate:"无");
	   	     }
	   	     // 参与活动比对结果
	   	     $('.activValid').html("");
	   	     $('.activityTitleList').html("");
	   	    if(data.activValid=="1"){
	   	      	$('.activValid').parent().css("color","#333");
	   	     	 $('.activValid').addClass("icon-true");  
	   	     	 $('.activValid').html("");
	   	    }else{
	   	     	$('.activValid').removeClass("icon-true").parent().css("color","red");  //邮箱
	   	     	$('.activValid').html("X");
	   	     	if(data.activityTitleList){
	   	     		$('.activityTitleList').html(data.activityTitleList[0].title).css("color","red");  //参加过的活动
	   	     	}
	   	     }
	   	    //提问对比结果
	   	    $('.askValid').html("");
	   	     if(data.askValid=="1"){
	   	     	$('.askValid').parent().css("color","#333");
	   	     	 $('.askValid').addClass("icon-true");  
	   	     	 $('.askValid').html("");
	   	     }else{
	   	     	$('.askValid').removeClass("icon-true").parent().css("color","red");  //邮箱
	   	     	$('.askValid').html("X");
	   	     }
	   	}
	});
	$('input[name=appeal]').removeAttr("checked");//审核单选框置空
}

//查询
$('#vertionSearchtBtn').click(function(){
	//获取地区高校选中值
	var areaAndclass ;
    var cityAndshcool ;
	var oArea =  $('#oidType').val();     //获取地区或高校
	var areaAndclass1 = $('#areaOid').val() ;
	var areaAndclass2 = $('#classOid').val();
	var cityAndshcool1 = $('#cityOid').val() ;  //地址
	var cityAndshcool2 = $('#shcoolOid').val();  //高校
   
    if(cityAndshcool1!='-1'){
	 	areaAndclass =cityAndshcool1 ;
	}
	if(cityAndshcool2 !='-1'){
	 	areaAndclass =cityAndshcool2 ;	
	} 
	if(areaAndclass1!='-1'){
	 	areaAndclass =areaAndclass1 ;
	}
	if(areaAndclass2 !='-1'){
	 	areaAndclass =areaAndclass2 ;
	}
	 $('#vertioncode').datagrid({
	    	queryParams:{
	    		'mobile':$('#se_mobile').val(), //手机号
	    		'districtId': areaAndclass,  //地区高校
	    		'status':$('#vertioncodeStatus').val(),  //申诉状态
	    		'validNum':$('#validNum').val()
	    	}
	});
	
})

////关闭查看框
$('.colseBtn').click(function(){
	$('#user-look').modal('hide');
})

// 审核  
$('#sure').click(function(){
	var row = $('#vertioncode').datagrid('getSelections');
	var appealStatus =$("input[name=appeal]:checked").attr("value");
	
	if (appealStatus) {
		if(confirm("审核结果将发送至用户邮箱！确定审核该申诉？")){
			$.ajax({
			   	type:"post",
			   	url:Qnzs.path+"/bg/accountAppealManager/sendEmail",
			   	async:true,
			   	data:{
			        "accountAppealId": row[0].id,
			        "validStatus": appealStatus
			    },
			   	success:function(data){
			   		if(data.status=="OK"){
			   			 $.alert(data.msg);
		   	    	    $('#user-look').modal('hide');
		   	    	    $('#vertioncode').datagrid('reload');
		   	    	    $('input[name=appeal]').removeAttr("checked");//置空
			   		}else{
			   			 $.alert(data.msg);
			   		}
			   	}
			});
		}
	} else{
		$('#user-look').modal('hide');
	}
});


function auditAppeal(appealStatus){
	var row = $('#vertioncode').datagrid('getChecked');
	if (row.length > 0){
		var ids = [];
		var validResult = true;
        $.each(row, function(index, item){
            if(item.auditStatus != 0){
		 		validResult = false;
            }
            ids.push(item.id);
        }); 
        
        if (!validResult) {
		 		$.alert('包含已审核过的申诉！');
        } else{
        	if(confirm("审核结果将发送至用户邮箱！确定审核该申诉？")){
				$.ajax({
				   	type:"post",
				   	url:Qnzs.path+"/bg/accountAppealManager/sendEmailBatch",
				   	async:true,
				   	data:{
				        "appealIdsStr": ids.join(","),
				        "validStatus": appealStatus
				    },
				   	success:function(data){
				   		if(data.status=="OK"){
				   			 $.alert(data.msg);
			   	    	    $('#vertioncode').datagrid('reload');
				   		}else{
				   			 $.alert(data.msg);
				   		}
				   	}
				});
			}
        }
	} else{
		$.alert('请至少选择一条数据进行操作！');
	}
	
}
