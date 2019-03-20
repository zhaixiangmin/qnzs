
	
	
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
	
	$('#look_expert').show();
	/************************************ expert_disabled 控制不通过按钮    ***********************************************/
	$('#showAndhide').css('display',$('#expert_disabled').css('display'));
	///组织管理数据表格以及分页
	////192.168.100.49:8080/qnzs/bg/accountExpert/findAllExpertAccount
	$('#expert').datagrid({ title: '专家管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/accountExpert/findAllExpertAccount',   //获取表格数据时请求的地址
	           columns:[[
	           
	             {field:'mobile',title:'手机号',width:150,
	             
	                formatter: function(value,row,index){
	                     	
	                 	if(value){
			        	   return  value.substr(0,(value.length-4))+'****';
			        	}else{
			        		
			        		return value ;
			        	}
			        	
			        },sortable:true
          
	             
	             },
	             {field:'realname',title:'昵称',width:200},
	             {field:'accountExpert',title:'专家职业',width:150},
	             {field:'speciality',title:'专业特长',width:150},
	             {field:'introduction',title:'专家介绍',width:300},
	             {field:'expertUrl',title:'职业（专业）技术证明',width:300,
	                	formatter: function(value,row,index){
	                		if(value!=null){
								var imgUrl ='';
					            var  s1 = value.split('/');
				                if(s1[0] !='http:'){
				                 	
				                 	imgUrl ='//wx.qlogo.cn/mmopen/PiajxSqBRaEKR5t42EEze08eyNw0QuxuqtRVoicA0t8lt13dKDxBCKuNNXgAvf6LvWuOyabibWncvQiaU9t6icyiaic4Q/0';
				                }else{
				                 	
				                 	imgUrl =value ;
				                }
								
							}else{
								
				                 	imgUrl ='//wx.qlogo.cn/mmopen/PiajxSqBRaEKR5t42EEze08eyNw0QuxuqtRVoicA0t8lt13dKDxBCKuNNXgAvf6LvWuOyabibWncvQiaU9t6icyiaic4Q/0';
								
							}
	                		
	                		
			        		return "<img src='" + imgUrl + "' height='33px' width='120px'></img>";
				        }
	             },
	             {field:'disabled',title:'审核状态',width:150,
                formatter: function(value,row,index){
	                    if(value ==0){
	                    	
	                      return  '未审核'
	                    }
	                    if(value==1){
	                    	
	                    	return '未通过'
	                    }
	                    if(value ==2){
	                    	return '已通过'
	                    }
	            }
           
           },
	             {field:'username',title:'用户ID',width:150,hidden:true}
	          ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber: 1,
	           pageSize:15,   //表格中每页显示的行数
	           pageList:[5,10,15],
	           rownumbers:true,   //是否显示行号
	           nowrap: false,   
	           striped: true,  //奇偶行是否使用不同的颜色
	           method:'get',   //表格数据获取方式,请求地址是上面定义的url
	           sortName: 'ID',  //按照ID列的值排序
	           sortOrder: 'desc',  //使用倒序排序
	          // idField: 'id',   打开只能选择单条记录
	           loadMsg:'数据正在努力加载，请稍后...', 
	           singleSelect:false,//加载数据时显示提示信息   false 可选择多条  true 选择一条数据
	           frozenColumns: [[  //固定在表格左侧的栏
	                       {field: 'ck', checkbox: true},
	                     ]],
	            
	            onClickRow: function(index, data) {
	                //将所有checkbox修改为未选中
	                $('#expert').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
	                //将这次的checkbox标记为选中
	                $('#expert').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	});
	
	
	
	
	//置空查询
	$('#expertClearBtn').click(function(){
		$('#expertKey').val(''); 
		$('#expertType1 option:selected').attr('selected',false);
		$('#expertType2 option:selected').attr('selected',false);
	})
	    
	//列表数据过滤查询
	$('#expertSearchtBtn').click(function(){
	   	var expertName =  $('#expertName').val();                      //昵称
	    var moblie = $('#moblie').val();                               //手机号
	    var expertType2= $('#expertType2 option:selected').val();      //类别选择
	    
	    $('#expert').datagrid({
	    	queryParams:{
	    		'keyword':expertName,
	    		'mobile': moblie,
	    		'type':expertType2
	    		
	    	}
	    });
		
	});
	
	//专家-回显
	function expertUpdate(n){
	    var row = $('#expert').datagrid('getSelections');
	    if(row.length>1||row.length<=0){
	     	$.alert('请选择一条数据操作')
	     	return ;
	    }
	    if(n==2){
	    	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	    	$('#expUpdateBtn').show();
	    	$('#myModalLabel').html('修改')
	    }else{
	    	
	    	$('#expUpdateBtn').hide();
	    	$('#myModalLabel').html('查看')
	    }
		    
	    
	    
		if (row){
		          
                console.log(row);
               
                //回显数据
//						console.log(row);
				$('#user-modify1').modal('show');
			    $('#realName').val(row[0].realname);                                         //真实姓名
			    $('#areaType').val(row[0].areaType);                                        //所属机构
			    $('#accountExpert').val(row[0].accountExpert);                               //职业
//					    $('#expMail').val(row.email);                                            //邮箱
			    $('#introduction').val(row[0].introduction);                                //个人介绍   speciality
			    $('#speciality').val(row[0].speciality) ;                                    //个人特长
	            $("#upd_moblie").val(row[0].mobile);
			   $('#preview').attr('src',row[0].expertUrl)                          //审核的图片
			    //专业类别
			    obj.ajax('/pc/service/getServiceCategory',{},function(data){
					  console.log(data);
						var html = '';
					    for(var i =0 ;i<data.rows.length;i++ ){
					  	
					  	 html+='<option  value="'+data.rows[i].caId+'">'+data.rows[i].name+'</option>'
					    }
						$('#majorType').append(html);
					$('#majorType').val(row.categoryId);                                   //专业类别
					   
				},function(data){}) 
		
			
	     }else{     	
	          $.alert('请选择一项进行操作');
			$('#user-modify1').modal('hide');
	     }
	};
	
	//专家-修改
	$('#expUpdateBtn').click(function(){    
	    var row = $('#expert').datagrid('getSelections');
		//专业类别
	    var categoryName = $('#majorType option:selected').val();                       //职业
	    var speciality= $('#speciality').val();                                         //邮箱
	    var introduction= $('#introduction').val(); 
		
		obj.ajax('/bg/accountExpert/updateExpert', {
			'categoryId':$('#majorType').val() , //专业类别
			'speciality':speciality,       //专业特长
            'accountExpert':$('#accountExpert').val(),  //职业
			'orgName':categoryName,
			'introduction':$('#introduction').val(),     //个人介绍
			'username':row[0].username,    //id
			'expertUrl':$('#preview').attr('src') ,  //专家图片
			'realname':$('#realName').val(),  //真实姓名
			'mobile':$("#upd_moblie").val()
			
		},function(data){
		   console.log(data);
			if(data.status=='OK'){   
		
		            $.alert('专家资料修改成功！');
	   	    	    $('#user-modify1').modal('hide');
	                $('#expert').datagrid('reload');
			}else{
				    $.alert(data.msg);
			};
		},function(){});
	});
	
	
	
	
	
	//启动
	function expertStart(n){
		var row = $('#expert').datagrid('getSelected');
		if(row){    
			   $('#user-start1').modal('show');
				$('#expertStartBtn').click(function(){ 
					obj.ajax('/bg/accountExpert/changeStatus' ,{'username':row.username,'status':1},
						function(data){
							console.log(data);
							if(data.status=='ERROR'){ 
						           	$.alert(data.msg);
						        }else{
						           $.alert('专家启用成功，赶快通知TA登陆平台吧！');
					   	    	   $('#user-start1').modal('hide');
						    };
						},
						function(data){
						}
				    );
				})
		}else{      
			$.alert('请选择一项进行操作');
			$('#user-start1').modal('hide');
		}
	}
	
	
	//禁用
	function expertStop(n){
		
		var row = $('#expert').datagrid('getSelected');
		if(row){     
			$('#user-end1').modal('show');
			
		}else{   
			$.alert('请选择一项进行操作');
			$('#user-end1').modal('hide');
		}
	}
	
	//审核通过  
	function yes_pass(n){
		
		var row = $('#expert').datagrid('getSelections');
		if(!(row.length<1)){   
			
			$('#yes_pass').modal('show');
			
		}else{   
			$.alert('请选择一项进行操作');
			$('#user-end1').modal('hide');
		}
	}
    $('#yes_pass_btn').click(function(){        //确定启动发送到后台
    	
    	
    	var row = $('#expert').datagrid('getSelections');
    	
    	var s1 = [];
		for(var i =0 ;i<row.length;i++){
			s1.push(row[i].username);
		} 
			
		obj.ajax('/bg/accountExpert/changeStatus' ,{'username':s1.toString(),'status':2},function(data){
				console.log(data);
				if(data.status=='ERROR'){ 
			           	$.alert(data.msg);
			        }else{
			           //alert('专家禁用成功，TA将无法登陆平台。');
			           
		   	    	   $('#yes_pass').modal('hide');
		   	    	   $('#expert').datagrid('reload');
		   	    	   $.alert('审核成功！');
			    };
			},
			function(data){
				console.log('系统繁忙，请稍后再试！');
			}
		);
	});
    
    
    
    
    //审核不通过  
    function no_pass(n){
		var row = $('#expert').datagrid('getSelections');
		console.log(row)
		if(!(row.length<1)){     
			$('#no_pass').modal('show');
			
		}else{   
			$.alert('请选择一项进行操作');
			$('#user-end1').modal('hide');
		}
	}
    $('#no_pass_btn').click(function(){        //确定启动发送到后台
    	
    	
    	var row = $('#expert').datagrid('getSelections');
    	
    	var s1 = [];
		for(var i =0 ;i<row.length;i++){
			s1.push(row[i].username);
		} 
    	
		obj.ajax('/bg/accountExpert/changeStatus' ,{'username':s1.toString(),'status':1},function(data){
				console.log(data);
				if(data.status=='ERROR'){ 
			           	$.alert(data.msg);
			        }else{
			           //alert('专家禁用成功，TA将无法登陆平台。');
			           
		   	    	   $('#no_pass').modal('hide');
		   	    	   $('#expert').datagrid('reload');
		   	    	   $.alert('审核成功！');
			    };
			},
			function(data){
				console.log('系统繁忙，请稍后再试！');
			}
		);
});

/************** 图片上传 ******************/
//图片上传处理 start
	   var image = '';
	               
		   function selectImage(file) {
			if(!file.files || !file.files[0]) {
				return;
			}
			var reader = new FileReader();
			reader.onload = function(evt) {
				document.getElementById('preview').src = evt.target.result;
				image = evt.target.result;
			
			}
			reader.readAsDataURL(file.files[0]);
		};
		////192.168.100.49:8080/qnzs/file_upload
	    $(document).ready(function(){
	    	//#file
	    	$('#image_file').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
	
				//	alert(data.result.url);
					imageUrl = data.result.url;
					$('#preview').attr('src',imageUrl)
				},
				fail: function() {
					$.alert('系统繁忙，请稍后再试！');
				}
			});
			////192.168.100.49:8080/qnzs/file_upload
	        $('#Updatefile').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
	
				//	alert(data.result.url);
					imageUrl2 = data.result.url;
					$('#preview2').attr('src',imageUrl2) ;  //回显图片
				},
				fail: function() {
					$.alert('系统繁忙，请稍后再试！');
				}
			});
	
	    });
	    
	//图片上传处理  end
	    