

$(function() {
    var imageUrl2 = "";
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
    if ($('#message_audit').is(':visible')){

        $('#message_find_return').show();
	}else {

        $('#message_find_return').hide();
	}


	
	$('#activitie').datagrid({
			title: '站内信管理', //表格名称           iconCls: 'icon-edit',  //图标
			width: 1300, //表格宽度
			height: 520, //表格高度，可指定高度，可自动
			border: true, //表格是否显示边框
			url: InstationApi.instationListUrl, //获取表格数据时请求的地址
			//url: "//169.168.200.19:8080/qnzs/activity/offlineActivity/bg/list", //获取表格数据时请求的地址
			
			columns: [
				[{
					field: 'sendId',
					title: '编号',
					width: 150
				}, {
					field: 'title',
					title: '标题',
					width: 200
				},  {
					field: 'receiveCnt',
					title: '接收人数',
					width: 60,
					formatter: function(value, row, index) {
		        		  return '<a href="sendpeople.html?sendId=' + row.sendId + '" >' + value + '</a>'
		        	  }
					
				}, {
                    field: 'receiveNumber',
                    title: '实际人数',
                    width: 60,
                    formatter: function(value, row, index) {
                        return '<a href="sendpeople.html?sendId=' + row.sendId + '" >' + value + '</a>'
                    }

                },/*{
					field: 'address',
					title: '所在地区',
					width: 200
				},*/
				// {
				// 	field: 'telephone',
				// 	title: '联系电话',
				// 	width: 120
				// },
                {
					field: 'sendTime',
					title: '发送时间',
					width: 220
				},  {
					field: 'fullName',
					title: '发送者',
					width: 220
				}, 
				{
					field: 'audit',
					title: '审核状态',
					width: 100,
					formatter: function(value, row, index) {
						if (0 == value) {
							return "<font>待审核</font>";
						}
						
						if (1 == value) {
							return "<font>审核不通过</font>";
						}
						if (2 == value) {
							return "<font>审核通过</font>";
						}
						
					}

				},{
					field: 'sendStatus',
					title: '发送状态',
					width: 100,
					formatter: function(value, row, index) {
						if (0 == row.sendStatus) {
							return "<font>待发送</font>";
						}
						if (1 == row.sendStatus) {
							return "<font>发送中</font>";
						}
						if (2 == row.sendStatus) {
							return "<font>发送成功</font>";
						}
						if (3== row.sendStatus) {
							return "<font>发送失败</font>";
						}
						
					}
					}]
			],
			pagination: true, //如果表格需要支持分页，必须设置该选项为true
			pageNumber: 1,
			pageSize: 20, //表格中每页显示的行数
			pageList: [20, 50, 100],
			rownumbers: true, //是否显示行号
			nowrap: false,
			striped: true, //奇偶行是否使用不同的颜色
			method: 'get', //表格数据获取方式,请求地址是上面定义的url
			sortName: 'send_time', //按照ID列的值排序
			sortOrder: 'desc', //使用倒序排序
			idField: 'id',
			scrollbarSize: 18,
			loadMsg: '数据正在努力加载，请稍后...',
			singleSelect: true, //加载数据时显示提示信息
			frozenColumns: [
				[ //固定在表格左侧的栏
					{
						field: 'ck',
						checkbox: true
					},
				]
			],
			onClickRow: function(index, data) {
				//将所有checkbox修改为未选中
				$('#activitie').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
				//将这次的checkbox标记为选中
				$('#activitie').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
			}
		});

    $(".pagination-page-list, .pagination .pagination-num").css("width","50px");   //修改页数宽度
	/* 查询搜索*/
	$('#activitie_btn').click(function() {
		
		var title=$('#act_title').val();
		//var districtType=$('#oidType').val();
		var sendTimeStart = $('#start_activde').datebox('getValue');
		
		var sendTimeEnd=$("#stop_activde").datebox('getValue');
		var  audit=$('#status_tepy').val();
		
		
		$('#activitie').datagrid({
				queryParams: {
					'title': title,
					'sendTimeStart': sendTimeStart, 
					'sendTimeEnd':sendTimeEnd,
					'audit':audit,
					'sendName':$('#send_people').val(), //发送者
					"pageSize": function() {
						return $('#activitie').datagrid("getPager").pagination("options").pageSize;
					},
					"pageIndex": function() {
						return $('#activitie').datagrid("getPager").pagination("options").pageNumber;
					}
				}
			});
		
		
	})
	
	
	/*清空数据*/
	
	$('#btn_del').click(function() {
		$('#act_title').val('');
		
		$('#oidType').val('');
		$('#send_people').val('');
		
		$('#status_tepy').val('');
		$('#start_activde').combo('setText', '');
		$('#start_activde').combo('setValue', '');
		$('#stop_activde').combo('setText', '');
		$('#stop_activde').combo('setValue', '');

	})
	//添加多个手机号码
		var mobile_fly = true;   //全局变量
	$("#addinput").click(function(){
        var targetType=$("input[name='radioarea']:checked").val();
		if (targetType!=1){
			$.alert("请选择指定的手机用户");
			return ;
		}
		$(".box_divlist").append('<li><input type="text" class="iphoenumber" placeholder="请输入用户手机号" ><span  type="button" class="btn_rmove" onclick="rmovedel($(this))">X</span></li>')
		
		
		/***************************  手机格式判断 与判断用户是否注册过***************************************/
			
	
	    $('.iphoenumber').bind('input propertychange',function(){
    	    
			if($(this).val().length==11){
			    		
			        if($(this).is(".iphoenumber")){            //手机号判断
		    		
						var ph=/^1[3|5|7|8|4][0-9]{9}$/
						if($("#username").val()!=""){
							
							if(!(ph.test($(this).val()))){   //校验错误
								 mobile_fly =false;     //给发送验证码枷锁
								 $.alert("请输入正确的手机号码！")
								  
							}else if(ph){    //校验正确
								
								    mobile_fly =true;     //给发送验证码解锁
							        var params ={
								    	'mobile': $(this).val()  
									}	
								    $.ajax({
								    	type:"post",
								    	url:Qnzs.path+"/commons/checkMobile",
								    	data:params,
								    	async:true,
								    	success:function(data){
								    		console.log(data)
								    		if(data.status=="ERROR"){
								    			mobile_fly = true;
                                                $.alert("该手机注册了可以使用").then(function(){

                                                })
								    		}else{
								    			mobile_fly = false;
								    		    $.alert("该手机号没有注册！不可以使用。").then(function(){
								    				
								    			})
								    		}
								    		console.log(data);
								    	}
								    });
								 
							}
						}else{
							
						}
					}
	    		
	    		
	    	}
	    })
		
	})
	
	


  /*所选地区*/
 $.ajax({
	type: "get",
	url: Qnzs.path + "/common/district/getCityByType", //原地市接口/common/district/getCityByType
	data:{'provinceId': 440000,
		'type': 1,},
	dataType: "JSON",
	success: function(data) {
		
		var collegeList = data.dataList;
		$.each(collegeList, function(index, item) {
			$('#schooe_dare').append('<option value="' + item.permCode + '">' + item.districtName + '</option> ')
		});
	}
});

})

  function rmovedel(obj){
  	
  	obj.parent('li').remove();
  }



//所选下级县区
function getctiy() {

	
	var provinceId=$("#schooe_dare").val();
    $('input[name="allselcet"][value="1"]').prop("checked", false); //取消勾选
	$.ajax({
	type: "get",
	url: Qnzs.path + "/common/district/getDistrictByPerm",
	data:{'permCode': provinceId
		},
	dataType: "JSON",
	success: function(data) {
		$('#schloolarea').html('');
		console.log(data);
		var comtList = data.rows;
		$.each(comtList, function(index, item) {
			$('#schloolarea').append('<li><span>'+item.districtName+'</span> <span class="checkour"><input type="checkbox" onclick="isAllsetectAraea()"  id="'+item.did+'"  name1="'+item.districtName+'"   onchange="getId(this)"  name="chockbox1" value="'+item.did+'"/></span></li>')
		});
	}
});
	
	
	
	
}

function  getschol(){	
	
	
$.ajax({
	type: "get",
	url: Qnzs.path + "/common/district/getCityByType",
	data:{'provinceId': 440000,
		'type': 2},
	dataType: "JSON",
	success: function(data) {

		var shcooList = data.dataList;
		$.each(shcooList, function(index, item) {
			$('#schooe_school').append('<option value="' + item.permCode + '">' + item.districtName + '</option> ')
		});
	}
});	
	
}

//所选下级高校

function  getscholl(){
	var did=$("#schooe_school").val();

    $('input[name="allselcetShool"][value="2"]').prop("checked", false); //取消勾选



	$.ajax({
	type: "get",
	url: Qnzs.path + "/common/district/getDistrictByPerm",
	data:{'permCode': did
		},
	dataType: "JSON",
	success: function(data) {
		 $('#schoolusfity').html('');
		var vsityList = data.rows;
		$.each(vsityList, function(index, item) {
			$('#schoolusfity').append('<li><span style="font-size: 10px;">'+item.fullName+'</span><span class="checkour"> <input type="checkbox" class="cbs" id="'+item.did+'" onchange="getId(this)"  onclick="isAllsetect()"  name1="'+item.districtName+'" name="chockbox2" value="'+item.did+'"></span></li>')
		});
	}



});	
			
}

//  地区或者高校选中
function getId(obj){
    if ($('.ullist li').length>0){
        for (var j =0;j<$('.ullist li').length;j++){

            if ($('.ullist li')[j].getAttribute("value") ==obj.getAttribute("value") ){
                return ;
                break ;
            }
        }
    }

	$('.ullist').append('<li value="'+obj.value+'"  onclick="del_id($(this))" >'+$(obj).attr("name1")+'<em class="glyphicon glyphicon-remove"></em></li>')

}
//删除指定区域
function del_id(obj) {
	

   var val=obj.attr('data-lag');

   $('#'+val).attr('checked',false);
   obj.remove();
  
}
 


/*新增*/
	
	function addtion(n){
		
		$('#user-add').modal('show');	
		$('.show_mode').html('添加');
		$('#btn_active').show();
		$('#btn_active_edit').hide();
		$('#fromadd')[0].reset();
		$(".box_divlist").empty('li');
		$('#schloolarea').html('');
		$('#summernote').summernote('code','');
		$('#schoolusfity').html('');
		$('.ullist').html('');
	}
	
	$('#btn_active').click(function() {
		
		
	    var title=$("#active_title").val();//标题
	 
	    var content=$('#summernote').summernote('code');//内容

		var chk_value='';//定义一个数组  发送给

		var  receiveType= $('input[name="Checkbox1"]:checked');//指定管理员
		var receiveTypeAttr = [];//指定管理员数组
		for (var i =0;i<receiveType.length;i++){
            receiveTypeAttr[i] =receiveType[i].value;
		}

		var tempArray = new Array(); //创建数组
		var receiveDistrict= $(".ullist>li");
		var receDisCode =[];  //初始化地区编码数组

		for(var i=0;i<receiveDistrict.length;i++){   //存储指定地区编码
            receDisCode.push(receiveDistrict[i].getAttribute("value"));
		}
		console.log(receDisCode)

		var  cellphone=[]; //创建数组
        var phonenumber=$(".box_divlist").find(':text'); // 获取所有文本框
              
		  for (var i = 0; i < phonenumber.length; i++) {
            cellphone.push(phonenumber.eq(i).val()); // 将文本框的值添加到数组中
          }  
		
		   var phodnumber=cellphone.join(',');  //指定用户
		
			var targetType=$("input[name='radioarea']:checked").val();
			var  user = '';//动态传入参数创建字符串
			if(targetType==0){
				 user =receDisCode.toString() ;
			  }
			else{
				 user =phodnumber ;
			}
				
			 if(!title){
				alert('标题不能为空')
				 return;
			 }

			if(!content){

				alert('请输入内容')
				return;
			}
				if($("input[name='username']:checked").val()==""){    //必选用户或者地市
	    	
			    	 $.alert('指定地区和指定用户要勾选其一');
					return;
			    	
			    }
			    if(targetType==0){
				   if (receiveType.length==0){
                       $.alert('请发送给指定的管理员');
                       return;
                   }

				}
//				if(!receiveDistrict){
//					 alert('请选择发送给所选组织')
//					return;
//					
//				}
//				if(!targetType){
//					alert('请请选择指定用户或者指定区域')
//					return;
//				}

				var data={
				 	  'title':title,
				 	  'content':content,
				 	  'msgType':1,
				 	  'receiveType':receiveTypeAttr.toString(),//地区管理员类型
				 	  'receiveDistrict':user,
					 'targetType':targetType   //指定手机用户还是地区管理员
				 }
				  $.ajax({
				  	type: "POST",
					url: Qnzs.path+"/bg/message/addMsg",
					data:data,
					dataType: "JSON",
					success: function(data) {
						console.log(data)
					if (data.status == 'OK') {
						
						
						    mobile_fly=true;  //打开新增锁
							alert("发送成功！");
							$('#activitie').datagrid('reload');
							$('#user-add').modal('hide');
						} else {
							 mobile_fly=true;  //打开新增锁
					alert(data.msg);
					}
					}
				  
				})
		
		
		
	     })
  


/*编辑*/
function usereditor(n) {
	mobile_fly=true;
	$('.show_mode').html('编辑');
    $('.ullist').html('');//清空指定区域
    $('#btn_active').hide();
	$('#btn_active_edit').show();
	$('#fromadd')[0].reset();
	$('#schloolarea').html('');
	$('#summernote').summernote('code','');
	$('#schoolusfity').html('');
	var row = $('#activitie').datagrid('getSelected');
	if (row) { 

		$.ajax({
			type:"post",
			data:{"sendId":row.sendId},
			url:Qnzs.path+"/bg/message/findMsgById",
			async:true,
			success:function(data){
				console.log(data);
				//判断是否是已审核状态
				if (data.rows.audit==2){
					$.alert("已经是审核通过状态！")
				}else {
                    $('#user-add').modal('show');  //弹出模态框
				}
				 mobile_fly=true;  //打开新增锁
//				$('#schloolarea').html('');
//				$('#schoolusfity').html('');
							
				$('#active_title').val(data.rows.title )//标题
				$('#summernote').summernote('code',data.rows.content );//内容
				var receiveTypeAttr=data.rows.receiveType.split(",");
				for (var i =0;i<receiveTypeAttr.length;i++){

                    $('input[name="Checkbox1"][value="'+receiveTypeAttr[i]+'"]').attr("checked",true);  //指定管理员
				}

                $('input[name="radioarea"][value="'+data.rows.targetType+'"]').attr("checked",true);  //指定手机或者地区类型
				if (data.rows.targetType ==1){
                    $('input[name="Checkbox1"][value="'+data.rows.receiveType+'"]').attr("checked",false); //取消勾选

				}
		        //指定地区
				var area_html = "";
				var  obj =  data.district;
				if (obj){

                    for(var i = 0;i<obj.length;i++){
                        area_html+='<li value="'+obj[i].did+'"  onclick="del_id($(this))" >'+obj[i].fullName+'<em class="glyphicon glyphicon-remove"></em></li>';

                    }
                }
				$('.ullist').append(area_html)
				//回显手机用户
				if (!obj){
                    $(".box_divlist").html('');//清空列表
					var disArray=[];
                    disArray =data.rows.receiveDistrict.split(",");
                    for(var i=0;i<disArray.length;i++){
                        $(".box_divlist").append('<li><input type="text" value="'+disArray[i]+'" class="iphoenumber" placeholder="请输入用户手机号" ><span  type="button" class="btn_rmove" onclick="rmovedel($(this))">X</span></li>')

                    }
				}

            }
		});

	}
	else{
		alert('请选择需要编辑目标');
		$('#user-add').modal('hide');
	}
		
}

$('#btn_active_edit').click(function() {
		var row = $('#activitie').datagrid('getSelected');
		if(!mobile_fly){
			$.alert("您添加的指定用户的手机号存在未在青年之声注册！，请使用注册过的手机号码！");
			return;
		}

	     var sendId = row.sendId;
	      var title=$("#active_title").val();//标题
	     var content=$('#summernote').summernote('code');//内容
		var  receiveType= $('input[name="Checkbox1"]:checked');//指定管理员
		var receiveTypeAttr = [];//指定管理员数组
		for (var i =0;i<receiveType.length;i++){
			receiveTypeAttr[i] =receiveType[i].value;
		}
		var receiveDistrict= $(".ullist>li");
		var receDisCode =[];  //初始化地区编码数组

		for(var i=0;i<receiveDistrict.length;i++){   //存储指定地区编码
			receDisCode.push(receiveDistrict[i].getAttribute("value"));
		}
		console.log(receDisCode)
          
          

	   var  cellphone=[]; //创建数组
	   var phonenumber=$(".box_divlist").find(':text'); // 获取所有文本框

	  for (var i = 0; i < phonenumber.length; i++) {
		cellphone.push(phonenumber.eq(i).val()); // 将文本框的值添加到数组中
	  }

	  var phodnumber=cellphone.join(',');  //指定用户

	  var targetType=$("input[name='radioarea']:checked").val();

	  var  user = '';//动态传入参数创建字符串
	  if(targetType==0){
          	 user =receDisCode.toString() ;
      } else{
			 user =phodnumber ;
	  }
		
	  if(!title){
		 	alert('标题不能为空')
		 	 return;
	  }
		
	  if(!content){

			alert('请输入内容')
			return;
	  }
		if(targetType==0){
			if (receiveType.length==0){
				$.alert('请发送给指定的管理员');
				return;
			}

		}
	    if($("input[name='radioarea']:checked").val()==""||$("input[name='radioarea']:checked").val()==undefined){    //必选用户或者地市
	    	
	    	 $.alert('指定地区和制定用户要勾选其一');
			return;
	    	
	    }
//		if(!receiveDistrict){
//			 alert('请选择发送给所选组织')
//			return;
//			
//		}
//		if(!targetType){
//			alert('请请选择指定用户或者指定区域')
//			return;
//		}
//

		  var data={
		 	  'title':title,
		 	  'content':content,
		 	  'receiveType':receiveTypeAttr.toString(),
		 	  'receiveDistrict':user,
			  'targetType':targetType,
			  'sendId':sendId
		 }
		  $.ajax({
		  	type: "POST",
			url: Qnzs.path+"/bg/message/editMsg",
			data:data,
			dataType: "JSON",
			success: function(data) {
			if (data.status == 'OK') {
			$.alert(data.msg);
			$('#activitie').datagrid('reload');
			$('#user-add').modal('hide');
				} else {
			$.alert(data.msg);
			}
			}
		  
		  })
		
	})

//站内管理审核
function actaudit(n) {
	var row = $('#activitie').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		

		$('#user-verify').modal('show');

		//获取启动目标的
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择未审核的目标');
		$('#user-verify').modal('hide');
	}
}
$('#comit_audit').click(function() { //确定启动发送到后台
			
			var row = $('#activitie').datagrid('getSelected');
			var sendId = row.sendId;
			var data = {
				'sendId':sendId,
				'status':2
			}
			InstationApi.instationaudit(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert(data.msg);
					$('#activitie').datagrid('reload');
					$('#user-verify').modal('hide');
					//					window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});
		});
//活动管理退回
function sendback1(n) {
	var row = $('#activitie').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		

		$('#user-user-back').modal('show');

		
			//获取启动目标的
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择未退回的目标');
		$('#user-user-back').modal('hide');
	}
}
$('#user-back').click(function() { //确定启动发送到后台
	

	  var row = $('#activitie').datagrid('getSelected');
	//获取启动目标的
		var advice=$('#donw_adave').val();
		var sendId = row.sendId;
		
		var data = {
			   
				'sendId':sendId,
				'content':advice,
				'status':1
			}
	
			InstationApi.instationaudit(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert("退回成功！");
					$('#activitie').datagrid('reload');
					$('#user-user-back').modal('hide');
					//					window.location.reload();
				} else {
					$.alert(data.msg);
				};
			});
		});
		
		
function check(n) {
	var row = $('#activitie').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		
		$('#user-start').modal('show');
        var sendId = row.sendId;
		var data = {
				'sendId':sendId}
		
		  $('.titltes').text('');
			$('.contentr').html('');
			$('.aderessses').html('');
			$('.Region').text('');
			
			$.ajax({
				type:"post",
				data:{"sendId":row.sendId},
				url:Qnzs.path+"/bg/message/findMsgById",//bg/message/findMsgById
				async:true,
				success:function(data){
					console.log(data)
					 mobile_fly=true;  //打开新增锁
	//				$('#schloolarea').html('');
	//				
	//				$('#schoolusfity').html('');
					$('.titltes').text(data.rows.title);//标题
			        $('.contentr').html(data.rows.content );//内容

                    //指定用户
					if (!data.district){
                        $('.aderessses').append(data.rows.receiveDistrict);

					}else if (data.district){
						var adm ="";//指定 的管理员
						if (data.rows.receiveType==1){
                            adm="咨询导师";
						}else if (data.rows.receiveType==2){
                            adm="系统管理员";
                        }else if (data.rows.receiveType==3){
                            adm="团委组织";
                        }else if (data.rows.receiveType==4){
                            adm="服务站点";
                        }else if (data.rows.receiveType==5){
                            adm="青年文明号";
                        }else if (data.rows.receiveType==6){
                            adm="学生社团";
                        }else {
                            adm="社会组织";
						}

                        //指定地区
                        var area_html = "";
                        var  obj =  data.district;
                        if (obj){
                           for(var i = 0;i<obj.length;i++){
                               area_html+='<span onclick="del_id($(this))" >'+adm+':  '+obj[i].fullName+',</span>';
                           }
                           $('.aderessses').append(area_html)
                        }
					}

				}
			});

		InstationApi.instationById(data).then(function(data) {
			
			  var item=data.rows;
			  var temp=data.district;

			  console.log(temp)
			  
			  
			  
			  
			  /**  朱国华修改
			   * 
			   * if(item.targetType==null){
			  	 $('.aderessses').html('');
			     $('.Region').text('');
			  }else if(item.targetType==0){
			  	 $('.Region').text('指定区域');
			  }
			  else if(item.targetType==1){
			  	 $('.Region').text('指定用户');
			    }
			    **/
		})
		
	
	} else { //没有选中目标执行以下程序
		$.alert('请选择查看的目标');
		$('#user-start').modal('hide');
	}
}

/**
 * 全选所选地区
 */
function allselcet1() {

    var b = $("input[name='allselcet']").is(':checked');
    if (b) {

    	$('[name=chockbox1]:checkbox').prop('checked',true);
        addArea();//全选

    } else {
        $('[name=chockbox1]:checkbox').prop('checked',false);

    }
}
/**
 * 全选所选高校
 */
function selectShool() {


    var b = $("input[name='allselcetShool']").is(':checked');
    if (b) {

        $('[name=chockbox2]:checkbox').prop('checked',true);
        addShool();//全选

    } else {
        $('[name=chockbox2]:checkbox').prop('checked',false);

    }
}

/**
 * 添加到指定地区
 */
 function addArea (){

 	var valueAttr =[];

 	if ($('#ullist >li').length>0){
		var html ="";
        var array1 =$('#ullist >li') ;
        var array2 = $('[name=chockbox1]:checked');
        var result = [];
        for(var i = 0; i < array2.length; i++){
            var obj = array2[i];
            var num = obj.getAttribute("id");
            var isExist = false;
            for(var j = 0; j < array1.length; j++){
                var aj = array1[j];
                var n = aj.getAttribute("value");
                if(n == num){
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                result.push(obj);
            }
        }
        console.log(result);
        //遍历数组添加
        for(var n =0;n<result.length;n++){
			html+='<li value="'+result[n].getAttribute("id")+'"  onclick="del_id($(this))" >'+result[n].getAttribute("name1")+'<em class="glyphicon glyphicon-remove"></em></li>'

        }
       $('#ullist').append(html);
    }else {

        for (var i =0 ;i<$('[name=chockbox1]:checked').length ;i++){
            var item =$('[name=chockbox1]:checked')[i];
            $('#ullist').append('<li value="'+item.value+'"  onclick="del_id($(this))" >'+item.getAttribute("name1")+'<em class="glyphicon glyphicon-remove"></em></li>')

        }

	}

}
/**
* 添加到指定学校
*/
function addShool (){

    var valueAttr =[];

    if ($('#ullist >li').length>0){
        var html ="";
        var array1 =$('#ullist >li') ;
        var array2 = $('[name=chockbox2]:checked');
        var result = [];
        for(var i = 0; i < array2.length; i++){
            var obj = array2[i];
            var num = obj.getAttribute("id");
            var isExist = false;
            for(var j = 0; j < array1.length; j++){
                var aj = array1[j];
                var n = aj.getAttribute("value");
                if(n == num){
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                result.push(obj);
            }
        }
        console.log(result);
        //遍历数组添加
        for(var n =0;n<result.length;n++){
            html+='<li value="'+result[n].getAttribute("id")+'"  onclick="del_id($(this))" >'+result[n].getAttribute("name1")+'<em class="glyphicon glyphicon-remove"></em></li>'

        }
        $('#ullist').append(html);
    }else {

        for (var i =0 ;i<$('[name=chockbox2]:checked').length ;i++){
            var item =$('[name=chockbox2]:checked')[i];
            $('#ullist').append('<li value="'+item.value+'"  onclick="del_id($(this))" >'+item.getAttribute("name1")+'<em class="glyphicon glyphicon-remove"></em></li>')

        }

    }

}
/**
 * 清空选
 */
 function  clearSlect() {

    $('input[name="allselcet"][value="1"]').attr("checked",false); //取消勾选
    $('[name=allselcet]:checkbox').attr('checked',false);//取消全选
}


/***
 * 全部选择  高校
 *
 */
function isAllsetect () {

    if($('[name=chockbox2]:checked').length ==$('#schoolusfity li').length){
        $("input[name='allselcetShool']").prop('checked',true);

    }else {

        $("input[name='allselcetShool']").prop('checked',false);
    }
}
/***
* 全部选择  地市
*
*/
function isAllsetectAraea () {
    if($('[name=chockbox1]:checked').length ==$('#schloolarea li').length){
        $("input[name='allselcet']").prop('checked',true);

    }else {

        $("input[name='allselcet']").prop('checked',false);
    }
}