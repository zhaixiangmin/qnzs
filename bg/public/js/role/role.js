/**** 修改数据 *****/

$(function(){
	$('#UpdateRoleBtn').click(function(){
	 	var row= $('#sortTable').datagrid('getSelected');
   	    var sortName =$('#sortName2').val();
        var sortDescribe =$('#sortDescribe2').val();
        var orgType = $('#orgType2').val();
        var didType = $('#didType2').val();
     
   	    obj.ajax('/bg/role/updateRole',{
   	    	'rid':row.rid,
   	    	'roleName':sortName,
   	    	'description':sortDescribe,
   	    	'orgType':orgType,
            'didType':didType,
            'isSystem':$("input[name='radioButtons2']:checked").val()
   	    },function(data){
   	    	console.log(data);
   	    	if(data.status=='ERROR'){
	           	$.alert(data.msg);
	        }else{
	           $.alert('保存成功！');
   	    	  $('#UpdateRoles').modal('hide');
   	    	  $('#sortTable').datagrid('reload');
	        };
   	    },function(){ $.alert('数据添加失败')});
   });
    //需要点击叶子节点的文字处，勾线复选框则还是能勾选
   $('#addAssBtn').click(function(){     
   	    var row = $('#sortTable').datagrid('getSelected');
   	   //提交新的角色
		var nodes = $('#box1').tree('getChecked');
        var s = '';	
        for(var i=0; i<nodes.length; i++){	
            if (s != '') s += '#';
            s += nodes[i].id;	
        }	     
	    console.log(s);                       
	    obj.ajax('/bg/role/updateRolePermission',{'changePermissions':s,'rid':row.rid},function(data){
	     	       console.log(data);
		   	    	if(data.status=='OK'){			   	    		
			            $.alert('成功！');
		   	    	    $('#UpdateRoles').modal('hide');
		   	    	    $('roleBistribution').modal('hide');
		   	    	    $('#sortTable').datagrid('reload');
			        }else{
			           	$.alert(data.msg);
			        };
	    },function(data){console.log('添加失败！')});
	});
   
   
   
   
   


})
	
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

	///角色数据列表
	
	$('#sortTable').datagrid({ title: '角色管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/role/findAllRole',   //获取表格数据时请求的地址
	           columns:[[
	             
	             {field:'rid',title:'编号',width:150},
	             {field:'roleName',title:'名称',width:150},
	             {field:'description',title:'描述',width:350},
	             {field:'isSystem',title:'类型',width:150,
	                  formatter: function(value,row,index){
		                   if(value ==1 ){return '默认类型'};
		                   if(value ==2 ){return '自定义类型'};
		                  
		            }
	             },
	             {field:'orgType',title:'默认类型',width:150,
	               formatter: function(value,row,index){
		                   if(value ==1 ){return '系统管理员'};
		                   if(value ==2 ){return '团委组织' };
		                   if(value ==3 ){return '服务站点'};
		                   if(value ==4 ){return '青年文明号'};
		                   if(value ==5 ){return '学生社团'};
		                   if(value ==6 ){return '社会组织'};
		                   if(value ==7 ){return '合作机构'};
		            }
	             
	             },
	             {field:'didType',title:'默认区域',width:150,
	                  formatter: function(value,row,index){
	                  	   if(value == 0 ){return '省级'};
		                   if(value == 1 ){return '高校'};
		                   if(value == 2 ){return '院系'};
		                   if(value ==3 ){return '地市'};
		                   if(value ==4 ){return '区县'};
		            }
	             },
	             {field:'createTime',title:'创建时间',width:150,
//	                formatter: function(value,row,index){
//		                    if (value){
//		                        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//		                    }else{
//		                        return '';
//		                    }
//		            }
	             }
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
	           idField: 'id',
	           loadMsg:'数据正在努力加载，请稍后...', 
	           singleSelect:true,//加载数据时显示提示信息
	           frozenColumns: [[  //固定在表格左侧的栏
	                       {field: 'ck', checkbox: true},
	                     ]],
	            
	            onClickRow: function(index, data) {
	                //将所有checkbox修改为未选中
	                $('#sortTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
	                //将这次的checkbox标记为选中
	                $('#sortTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	});
	
	// url:'//192.168.100.49:8080/qnzs/bg/rbac/permissionTreeOfRoleDetail?rid='+rid,  
	// url:'//192.168.100.49:8080/qnzs/bg/organization/getAllRole?rid='+rid,   //获取表格数据时请求的地址
	
	
	//置空查询
	$('#sortClearBtn').click(function(){
		$('#sort-keyWord').val('');
	})
	    
	//列表数据过滤查询
	$('#sortSearchBtn').click(function(){
	   	var keyWord = $('#sort-keyWord').val();
	      console.log(keyWord);    
	    $('#sortTable').datagrid({
	    	queryParams:{
	    		keyword:keyWord
	    	}
	    });
		
	});
	
	
	////192.168.100.49:8080/qnzs/bg/role/addRole
	////192.168.100.49:8080/qnzs/bg/organization/distrPermission  树api
	//初始化tree的数据列表
	//fn1(); 
	//fn2();
	////192.168.100.49:8080/qnzs/bg/role/distrPermission?rid='+n
	
	
	
	
	function fn1(n){
	$('#box1').tree({
			url :base+'/bg/role/distrPermission?rid='+n,
			animate : true,
			checkbox : true,
			cascadeCheck:false,
			lines : true,
			method:'get',
			scrollTo:52,
			dnd : true,
		/*	data : [{
				"text" : "本地节点"
			}],
			/*formatter : function (node) {
				return  node.text;
		 },*/
		  loadFilter: function(data){  
		  	var fileds = "id,text,checked";
		  	var nodes = ConvertToTreeGridJson(data.rows, "id", "pId", fileds) 
	            return nodes;        
	      }   
	    });
	}
	
	function fn2(n){
	$('#box2').tree({
			url :base+'/bg/role/distrPermission?rid='+n,
			animate : true,
			checkbox : true,
			cascadeCheck:false,
			lines : true,
			method:'get',
			scrollTo:52,
			dnd : true,
		/*	data : [{
				"text" : "本地节点"
			}],
			/*formatter : function (node) {
				return  node.text;
		 },*/
		  loadFilter: function(data){  
		  	var fileds = "id,text,checked";
		  	var nodes = ConvertToTreeGridJson(data.rows, "id", "pId", fileds) 
	            return nodes;        
	      }   
	});
	}
	
	//新增
	$('#addSortBtn').click(function(){
		
		var sortName =$('#sortName').val();
		var sortDescribe =$('#sortDescribe').val();
		console.log(sortName);
	    console.log(sortDescribe);
	    console.log($('#orgType').val());
	    console.log($('#didType').val());
	    var type = $("input[name='radioButtons']:checked").val();


       
	    if(Validator.validate('#form1')){
	   	    obj.ajax('/bg/role/addRole',{
	   	    	'roleName':sortName,
	   	    	'description':sortDescribe,
	   	    	'orgType':$('#orgType  option:selected').val(),
	   	    	'didType':$('#didType  option:selected').val(),
	   	    	'isSystem':$("input[name='radioButtons']:checked").val()
	   	 
	   	    },function(data){
				    console.log(data);
		   	    if(data.status=='OK'){
			          
			           	$.alert('节点新增成功！');
					    $('#sortTable').datagrid('reload');
					    $('#user-add').modal('hide');
			    }else{
			    	 	$.alert(data.msg);
			        };
				} ,function(data){
					console.log('新增节点失败！');
		   });
	    }else{
	    }
	});
	
	//修改
	function roleUpdate(n){
		var row= $('#sortTable').datagrid('getSelected');
		if (row){
			console.log(row);
		    console.log(row.didType);
			$('#UpdateRoles').modal('show');
				obj.ajax('/bg/role/findRoleById',{'rid':row.rid},function(data){
					console.log(data);
					    //回显数据
	//				    console.log(data.rows.roleName);
	//				    console.log(data.rows.description);
			  		    $('#sortName2').val(data.rows.roleName);   //名称
					    $('#sortDescribe2').val(data.rows.description);   //描述
					    $('#sortDescribe2').val(data.rows.orgType);  
					    $('#orgType2').val(data.rows.orgType);  
					    $('#didType2').val(data.rows.didType);  
					    
				        $("input[name='radioButtons2'][value='"+data.rows.isSystem+"']:checked").val();     //类型
					   
				  },function(){
				})
		
	     }else{     	
	         $.alert('请选择目标');
			  $('#UpdateRoles').modal('hide');
	     }
	}
	
	
	
	
	//删除
	function roleDel(n){
		
	    var row = $('#sortTable').datagrid('getSelected');
	
		if (row){
			
			layer.confirm('您确定要删除该用户吗！', {
				  btn: ['确定','取消'] //按钮
				}, function(){
				  layer.msg('删除成功！', {time: 1000 ,icon: 1});
				  
				    obj.ajax('/bg/role/deleteRole',{'rid':row.rid},function(data){   //执行删除操作
	//			    	console.log(data);
				    	
				    	if(data.status=='ERROR'){
				    		$.alert(data.msg);
				    	}else {
				    		$('#sortTable').datagrid('reload');
				    	}
				    	
	//					console.log('删除成功!');
					
					},function(){});
				  
				}, function(){
					
				  layer.msg('也可以这样', {
				    time: 1000, //20s后自动关闭
				    btn: ['明白了', '知道了']
				  });
			});
			
	     }else{   
	          $.alert('请选择目标');
	     }
	}
	   
	//分配权限         接口    distrPermission   参数：rid   结构是树
	
	
	    $('#box1').tree({
	    	onClick: function(node){
	    		$.alert(node.text);  // alert node text property when clicked
	    	}
	    });
	function rolesAssign(n){
	    var row = $('#sortTable').datagrid('getSelected');
		if (row){
	             fn1(row.rid);
			  //   alert(row.rid);
		        $('#roleBistribution').modal('show');
	
//	//	        obj.ajax('/bg/role/distrPermission',{'rid':row.rid},function(data){
//	//	        	console.log(data);
//	//	        	if(data ==''){
//	//	        		alert(row.roleName+'角色所属组织尚未授权。');
//	//	        		
//	//	        	}else {
//	//	        		//初始选中的权限
//	////					var originPermValues = "";
//	////					for (var i=0; i<data.length; i++) {
//	////						if(data[i].checked) {
//	////							originPermValues = originPermValues + data[i].value + "#";
//	////						}       		
//	////					}
//	//	        	}
//	//	        },function(data){});
//	
//	/*	        obj.ajax('/bg/role/distrPermission',{'rid':row.rid},function(data){
//		        	console.log(data);
//		        	if(data ==''){
//		        		alert(row.roleName+'角色所属组织尚未授权。');
//		        		
//		        	}else {
//		        		
//		        	//	fn1();
//		        		//初始选中的权限
//	//					var originPermValues = "";
//	//					for (var i=0; i<data.length; i++) {
//	//						if(data[i].checked) {
//	//							originPermValues = originPermValues + data[i].value + "#";
//	//						}       		
//	//					}
//		        	}
//		        },function(data){});*/
	
		         //需要点击叶子节点的文字处，勾线复选框则还是能勾选
//				$('#addAssBtn').click(function(){                             //提交新的角色			
//					var nodes = $('#box1').tree('getChecked');
//		            var s = '';	
//		            for(var i=0; i<nodes.length; i++){	
//		                if (s != '') s += '#';
//		                s += nodes[i].id;	
//		            }	     
//				    console.log(s);                       
//				    obj.ajax('/bg/role/updateRolePermission',{'changePermissions':s,'rid':row.rid},function(data){
//				     	       console.log(data);
//					   	    	if(data.status=='OK'){			   	    		
//						            alert('成功！');
//					   	    	    $('#UpdateRoles').modal('hide');
//					   	    	    $('roleBistribution').modal('hide');
//					   	    	    $('#sortTable').datagrid('reload');
//						        }else{
//						           	alert(data.msg);
//						        };
//				    },function(data){console.log('添加失败！')});
//				});
			     
	     }else{     	
	          $.alert('请选择目标');
			  $('#roleBistribution').modal('hide');
	    }
	}
   
   
    /***** 新增角色-自定义类型 *******/
	function custom_type(){
		$('.default-type').hide();   //隐藏默认类型+默认区域
	
		$('#orgType').val('');
	    $('#didType').val('');
	    
	    $('#orgType2').val('');
	    $('#didType2').val('');
	    
	};
	function default_type(){
	    $('.default-type').show();   //打开默认类型+默认区域
	};
	
	//查看权限                接口    distrPermission   参数：rid   结构是树
	
	function seeRole(n){
		
		var row = $('#sortTable').datagrid('getSelected');
		if (row){
			 fn2(row.rid);
		    $('#sort-View-permissions').modal('show');     //显示下拉框
		    
	    }else{     	
	          $.alert('请选择目标');
			  $('#sort-View-permissions').modal('hide');
	    }
		
	}
	
	/**************************  清除表单  *****************88***********/
	
	
	function orgReset(){                    //调用函数  清除表单
		
		$('#reset1').click(function(){
			
			Validator.removeErrors(document.getElementById('form1'));
		});
		$('#reset1').click();
		
	}
	
	//1.设置选中tree的节点
	//
	//var node = $('#tt').tree('find', 1);//找到id为”tt“这个树的节点id为”1“的对象
	//$('#tt').tree('select', node.target);//设置选中该节点
	//
	//2.获取选中节点的值
	//
	//$("#tt").tree('getSelected').id
	//
	//$("#tt").tree('getSelected').text
	//
	//2.通过子节点获取父节点
	//
	//var nodePar = $(”#tt“).tree("getParent",node.target);
	
	//初始选中的权限
	//var originPermValues = "";
	//for (var i=0; i<data.length; i++) {
	//	if(data[i].checked) {
	//		originPermValues = originPermValues + data[i].value + "#";
	//	}       		
	//}
	//遍历回显节点
	
	
	/********************************后台**********************************/
	
	
	 /*将一般的JSON格式转为EasyUI TreeGrid树控件的JSON格式
	        * @param rows:json数据对象
	        * @param idFieldName:表id的字段名
	        * @param pidFieldName:表父级id的字段名
	        * @param fileds:要显示的字段,多个字段用逗号分隔
	        */
	        function ConvertToTreeGridJson(rows, idFieldName, pidFieldName, fileds) {
	            function exists(rows, ParentId) {
	                for (var i = 0; i < rows.length; i++) {
	                    if (rows[i][idFieldName] == ParentId)
	                        return true;
	                }
	                return false;
	            }
	            var nodes = [];
	            // get the top level nodes
	            for (var i = 0; i < rows.length; i++) {
	                var row = rows[i];
	                if (!exists(rows, row[pidFieldName])) {
	                    var data = {
	                        id: row[idFieldName]
	                    }
	                    var arrFiled = fileds.split(",");
	                    for (var j = 0; j < arrFiled.length; j++)
	                    {
	                        if (arrFiled[j] != idFieldName)
	                            data[arrFiled[j]] = row[arrFiled[j]];
	                    }
	                    nodes.push(data);
	                }
	            }
	            console.info("根目录nodes："+JSON.stringify(nodes));
	
	
	            var toDo = [];
	            for (var i = 0; i < nodes.length; i++) {
	                toDo.push(nodes[i]);
	            }
	
	            while (toDo.length) {
	                var node = toDo.shift(); // the parent node
	                // get the children nodes
	                for (var i = 0; i < rows.length; i++) {
	                    var row = rows[i];
	                    if (row[pidFieldName] == node.id) {
	                        var child = {
	                            id: row[idFieldName]
	                        };
	                        var arrFiled = fileds.split(",");
	                        for (var j = 0; j < arrFiled.length; j++) {
	                            if (arrFiled[j] != idFieldName) {
	                                child[arrFiled[j]] = row[arrFiled[j]];
	                            }
	                        }
	                        if (node.children) {
	                            node.children.push(child);
	                        } else {
	                            node.children = [child];
	                        }
	                        toDo.push(child);
	                    }
	                }
	            }
	            return nodes;
	        };



