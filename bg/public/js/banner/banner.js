 

  $(function(){
	     $('#banUpdateBtn').click(function(){
			      var row = $('#banner').datagrid('getSelected');
				    console.log($('#upd_banType').val())
				    console.log($('#upd_banActicey').val())
				    console.log($('#upd_activityTitle').val()) //重磅标题
				    console.log($('#upd_activityType').val()) //重磅标题
				    console.log($('#upd_activityStatusDesc').val()) //重磅标题
				  
				       
				   // imageUrl2 =imageUrl2;
					obj.ajax('/bg/imageManager/updateImage' ,{
						'title':$('#bannerName2').val(), //图片名称
						"url":$('#bannerLink2').val(),
						"sort": $('#bannerNum2').val(),     //序号
						"remark":$('#banDescribe2').val(),   //图片描述
						'id':row.id,
						'path':imageUrl2,
						'type': $('#upd_banType').val(),  //banner  类型    px- 0    移动1
				          'acticey':$('#upd_banActicey').val(), //banner  分类
				          'activityTitle':$('#upd_activityTitle').val(),   //重磅标题
					 	'activityType':$('#upd_activityType').val(),    //重磅类型
					 	'activityStatusDesc':$('#upd_activityStatusDesc').val()  // 重磅简介
					},function(data){
						console.log(data);
						if(data.status=='OK'){
				            $.alert('您的banner图片已修改成功！');
			   	    	    $('#banUpdate').modal('hide');
			   	    	    $('#banner').datagrid('reload'); 
				        }else{
				        	$.alert(data.msg);
				        };
					},function(data){ console.log('banner图片修改失败，请稍后再试。')});
					
				});
		    

			
		
  });
	
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
//	
	$('#banner').datagrid({ title: 'banner管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/imageManager/findAllImage',   //获取表格数据时请求的地址
	           columns:[[
			        {field:'id',title:'编号',hidden:true,align : 'center',width : $(this).width() * 0.08},
			        
			        {field:'title',title:'标题 ',align : 'center',width : $(this).width() * 0.08},
			        {field:'type',title:'类型',align : 'center',width : 150,
			        
			            formatter: function(value,row,index){
			        		if(value == 0){
			        			return 'pc端';
			        		}
			        		if(value == 1){
			        			
			        			return '移动端';
			        		}
				        }
			       },
			        {field:'acticey',title:'分类',align : 'center',width : 150,
			            formatter: function(value,row,index){
			        		if(value == 0){
			        			return '首页';
			        		}
			        		if(value == 1){
			        			return '找活动';
			        		}
			        		if(value == 2){
			        			return '找帮助';
			        		}
			        		if(value == 3){
			        			return '重磅项目';
			        		}
			        		if(value == 4){
			        			return '青年之家';
			        		}
			        		if(value == 5){
			        			return '首页推荐项目';
			        		}
				        }
			        },
			        {field:'activityTitle',title:'重磅标题 ',align : 'center',width :150},
			        {field:'activityType',title:'重磅类型 ',align : 'center',width :100,
			                    formatter: function(value,row,index){
						        		if(value == 0){
						        			return '';
						        		}
						        		if(value == 1){
						        			return '赛事';
						        		}
						        		if(value == 2){
						        			return '评选';
						        		}
						        		if(value == 3){
						        			return '培训';
						        		}
						        		if(value == 4){
						        			return '其他';
						        		}
							         
			              }
			        },
			        {field:'activityStatusDesc',title:'重磅描述 ',align : 'center',width :150},
			        {field:'sort',title:'序号 ',align : 'center',width : $(this).width() * 0.08},
			        {field:'remark',title:'简介 ',align : 'center',width :200},
			        
			        {field:'didName',title:'地区',align : 'center',width : $(this).width() * 0.08},
			        	
			        {field:'path',title:'预览 ',align : 'center',width : $(this).width() * 0.08,
			        	formatter: function(value,row,index){
			        		return "<img src='" + value + "' height='33px' width='120px'></img>";
				        }
			       },
			       {field:'createTime',title:'创建时间 ',align : 'center',width : $(this).width() * 0.08,
//			        	formatter: function(value,row,index){
//		                    if (value){
//		                        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//		                    }else{
//		                        return '';
//		                    }
//		             }
			       },
			   ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber:1,
	           pageSize:10,   //表格中每页显示的行数
	           pageList:[10,20,50],
	           rownumbers:true,   //是否显示行号
	           nowrap: false,   
	           striped: true,  //奇偶行是否使用不同的颜色
	           method:'get',   //表格数据获取方式,请求地址是上面定义的url
	           sortName: 'create_time',  //按照ID列的值排序
	           sortOrder: 'desc',  //使用倒序排序
	           idField: 'id',
	           loadMsg:'数据正在努力加载，请稍后...', 
	           singleSelect:true,//加载数据时显示提示信息
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
	
	
	
	
	//置空查询
	$('#banClearBtn').click(function(){
		$('#bannerTitle').val('');
	})
	    
	//列表数据过滤查询
	$('#banSearchBtn').click(function(){
		
		//测试地区编码440303   CJJDX
        var areaAndclass ;
        var cityAndshcool ;
    	var oArea =  $('#oidType2 option:selected').val();     //获取地区或高校
    	var areaAndclass1 = $('#areaOid2 option:selected').val() ;
    	var areaAndclass2 = $('#classOid2 option:selected').val();
    	var cityAndshcool1 = $('#cityOid2 option:selected').val() ;  //地址
    	var cityAndshcool2 = $('#shcoolOid2 option:selected').val();  //高校
    	
    	
    	if(cityAndshcool1!='-1'){
    	 	areaAndclass =cityAndshcool1 ;
    	}
    	if(cityAndshcool2 !='-1'){
    	 	areaAndclass =cityAndshcool2 ;
    	} 
    	if(areaAndclass2 !='-1'){
    	 	areaAndclass =areaAndclass2 ;
    	}
    	if(areaAndclass1!='-1'){
    	 	areaAndclass =areaAndclass1 ;
    	}
          console.log(areaAndclass)
		
	   	var keyWord = $('#bannerTitle').val();
	    console.log(keyWord);  
	     console.log($('#serch_banType').val());  
	     console.log($('#serch_banActicey').val());
	    
	    $('#banner').datagrid({
	    	queryParams:{
	    		'title':keyWord,
	    		'type': $('#serch_banType').val(),  //banner  类型    px- 0    移动1
	    		'acticey':$('#serch_banActicey').val(),   //分类
	    		'did':areaAndclass
	    	}
	    });
	});
	
	
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
	    
	//新增
	$('#addBannerBtn').click(function(){
		
		$('#banType option:selected').val();  // 类型
		$('#banActicey option:selected').val();  // 类型
		console.log($('#banType option:selected').val())	
		console.log($('#banActicey option:selected').val())
	     bannerLink
	    console.log($('#activityTitle').val())	
		console.log($('#activityType').val())
	    console.log($('#activityStatusDesc').val())
	      
		 obj.ajax('/bg/imageManager/addImage',{
		 	'url':$('#bannerLink').val(), // url的显示图片
		 	'sort':$('#bannerNum').val(),   //序号
		 	'remark':$('#banDescribe').val(),
		 	'title':$('#bannerName').val(),    //图片名称
		 	'path':imageUrl,
		 	'type': $('#banType').val(),  //banner  类型    px- 0    移动1
		 	'acticey':$('#banActicey').val(), //banner  分类,
		 	'activityTitle':$('#activityTitle').val(),   //重磅标题
		 	'activityType':$('#activityType').val(),    //重磅类型
		 	'activityStatusDesc':$('#activityStatusDesc').val()  // 重磅简介
		 	
		 },function(data){
		    
	           console.log(data);
	   	    	if(data.status=='OK'){
	   	    		
		            $.alert(data.msg);
	   	    	    $('#user-add').modal('hide');
	   	    	    $('#banner').datagrid('reload');
		        }else{
		           	$.alert(data.msg);
		        };
		        
			} ,function(data){
			  	console.log('数据添加失败！');
			}
		);
	});
	
	
	
	//修改
	function banUpdate(n){
	    var row = $('#banner').datagrid('getSelected');
	  console.log(row);
	    
		if (row){
			$('#banUpdate').modal('show');
			
			obj.ajax('/bg/imageManager/findImageById',{'id':row.id},function(data){
				 console.log(data);
				//回显数据
			    $('#bannerName2').val(data.rows.title);         //图片名称
			    $('#bannerNum2').val(data.rows.sort);           //序号
			    $('#bannerLink2').val(data.rows.url);           //图片链接地址
			    $('#banDescribe2').val(data.rows.remark);       //图片描述
			    $('#preview2').attr('src',data.rows.path) ;     //回显图片          
			    imageUrl2 = data.rows.path;
			    $('#upd_banType').val(data.rows.type)     // 类型
		        $('#upd_banActicey').val(data.rows.acticey); // 分类
		        
		        $('#upd_activityTitle').val(data.rows.activityTitle),   //重磅标题
			    $('#upd_activityType').val(data.rows.activityType),    //重磅类型
			    $('#upd_activityStatusDesc').val(data.rows.activityStatusDesc)  // 重磅简介
		        /***** 绑定点击修改按钮   避免多次点击    *******/
//			    $('#banUpdateBtn').click(function(){
//				   
//					    console.log($('#upd_banType').val())
//					    console.log($('#upd_banActicey').val())
//					    console.log($('#upd_activityTitle').val()) //重磅标题
//					    console.log($('#upd_activityType').val()) //重磅标题
//					    console.log($('#upd_activityStatusDesc').val()) //重磅标题
//					  
//					       
//					    imageUrl2 =imageUrl2;
//						obj.ajax('/bg/imageManager/updateImage' ,{
//							'title':$('#bannerName2').val(), //图片名称
//							"url":imageUrl2,
//							"sort": $('#bannerNum2').val(),     //序号
//							"remark":$('#banDescribe2').val(),   //图片描述
//							'id':data.rows.id,
//							'path':imageUrl2,
//							'type': $('#upd_banType').val(),  //banner  类型    px- 0    移动1
//				            'acticey':$('#upd_banActicey').val(), //banner  分类
//				            'activityTitle':$('#upd_activityTitle').val(),   //重磅标题
//						 	'activityType':$('#upd_activityType').val(),    //重磅类型
//						 	'activityStatusDesc':$('#upd_activityStatusDesc').val()  // 重磅简介
//						},function(data){
//							console.log(data);
//							if(data.status=='OK'){
//					            alert('修改成功！');
//				   	    	    $('#banUpdate').modal('hide');
//				   	    	    $('#banner').datagrid('reload'); 
//					        }else{
//					        	alert(data.msg);
//					        };
//						},function(data){ console.log('添加失败！')});
//						
//					});
			    
			}, function(){$.alert("系统繁忙，请稍后再试！");});
	     }else{     	
	          $.alert('请选择一项进行操作');
			$('#banUpdate').modal('hide');
	     }
	};
	
	
	//删除
	function banDel(n){
		
	       var row = $('#banner').datagrid('getSelected');
		if (row){
	           
			layer.confirm('您确定要删除吗，删除后将无法恢复哦！', {
				  btn: ['确定','取消'] //按钮
				}, function(){
				  layer.msg('删除成功！', {time: 200 ,icon: 1});
				  
				    obj.ajax('/bg/imageManager/deleteImage ',{'id':row.id},function(data){   //执行删除操作
						console.log(data);
						if(data.status=='ERROR'){
				           	
	//			           	alert(data.msg);
				        }else{
	//			            alert('删除成功！');
				        
			   	    	    $('#banUpdate').modal('hide');
			   	    	    $('#banner').datagrid('reload');
				        };
					 
					},function(data){console.log('删除失败')});
				  
				}, function(){
//				  layer.msg('', {
//				    time: 200, //20s后自动关闭
//				    btn: ['明白了', '知道了']
//				  });
			});
			
	    }else{     	
	          $.alert('请选择一项进行操作。');
	    }
		
	}
	
	
	
	
	function selectType(e){
	   
		
		console.log($(e).val())
		if($(e).val()==0){
			$('#uploadtext').html('建议尺寸(1900px*380px)');
			
		}else{
			
			$('#uploadtext').html('建议尺寸(750px*280px)');
			
		}
		
		
		
	}
	
	
	
	function slterlbanType(e){
		
		
		if($(e).val()==0){
			$('#sletetotext').html('建议尺寸(1900px*380px)');
			
		}else{
			
			$('#sletetotext').html('建议尺寸(750px*280px)');
			
		}
		
		
	}
    