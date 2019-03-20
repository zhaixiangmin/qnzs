
	
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
    };

	
	
	//加载树数据网格列表//192.168.100.49:8080/qnzs/bg/organization/findOrgTree
	//url:'//192.168.100.49:8080/qnzs/bg/menuManager/getAllMenuTree',   //获取表格数据时请求的地址
	
	$('#menuTable').treegrid({
			title:'菜单管理',
			toolbar: '#tb_menu',
			width : $(this).width() * 0.98,
			height:600,
			rownumbers: true,
	        animate:true,
	        state:close,
			animate:true,
			collapsible:true,
			fitColumns:true,
			url: base+'/bg/menuManager/getAllMenuTree',
			idField:'mid',
			treeField:'text',
			showFooter:true,
			pagination: false,
	//		pageNumber:1,//在设置分页属性的时候初始化页码。
	//		pageSize: 10,//在设置分页属性的时候初始化页面大小。
	//		pageList: [10,20,30],//在设置分页属性的时候 初始化页面大小选择列表。
			columns:[[
			          //{field:'mid',title:'编号',align : 'center',width:50}, 
			          {field:'text',title:'标题 '},   
			          {field:'href',title:'链接'}, 
			          {field:'types',title:'身份',align : 'center',width : $(this).width() * 0.12,
			        	  formatter: function(value,row,index){
			        		  if(0==value){return "<font>管理员</font>";};
			        		  if(1==value){return "<font>用户</font>";};
			        		  if(2==value){return "<font>弃用</font>";};
			        	  }
			          }, 
			          {field:'isLeaf',title:'叶节点',align : 'center',width : $(this).width() * 0.08,
			        	  formatter: function(value,row,index){
			        		  if(value == 1){return "<font style='color:red;'>是</font>";}
			        		  if(value == 0){return "<font>否</font>";}
			        	  }
			          }, 
			          {field:'sortBy',title:'排序',align : 'center',width : $(this).width() * 0.12,sortable:true }, 
			          {field:'status',title:'状态',align : 'center',width : $(this).width() * 0.12,sortable:true,
			        	  formatter: function(value,row,index){
			        		  if(0==value){return "<font>启用</font>";}
			        		  if(1==value){return "<font>禁用</font>";}
			        	  }
			          }, 
			        ]]
		});
	
	
	$('#menuTable').treegrid({
		
		toggle:function(node){
		
			console.log(node);
		}
	});
	
	
	
	
	//初始化配置按钮的数据列表
	//$('#tabYE').hide();
	function yeInint(n){
	$('#yeTable').datagrid({ title: '配置按钮',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:550,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/menuManager/findButtonsByPpid?mid='+n,   //获取表格数据时请求的地址
	           columns:[[
	             
	            
	             {field:'permissionName',title:'按钮名称',width:355},
	             {field:'permissionCode',title:'按钮编码',width:355},
	             {field:'description',title:'备注',width:355},
	             {field:'pid',title:'id',width:255,hidden:true}
	            
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
	                $('#menuTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
	                //将这次的checkbox标记为选中
	                $('#menuTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	});
	};
	//base+'/bg/menuManager/getAllMenuTree'
	////api.gdqnzs.cn/bg/menuManager/getAllMenuTree
	//初始化修改的父列表
	
	
	fn1(); //初始化新增树菜单    
	function fn1(n){
	$('#box2').tree({
			url :base+'/bg/menuManager/getAllMenuTree',
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
	//	  	console.log(data.rows);
		  	var fileds = "mid,text,checked";
		  	var nodes = ConvertToTreeGridJson(data.rows, "mid", "_parentId", fileds) ;
	            return nodes;        
	      }   
	});
	}
	
	//初始化新增树菜单    
	function fn2(n){
	$('#box3').tree({
			url :base+'/bg/menuManager/getAllMenuTree?id='+n,
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
		  	var fileds = "mid,text";
		  	var nodes = ConvertToTreeGridJson(data.rows, "mid", "_parentId", fileds) ;
	            return nodes;        
	      }   
	});
	}
	
	
	//新增
	$('#addInfoBtn').click(function(){
		  
		    var nodes = $('#box2').tree('getChecked');	
		 	var menuName = $('#menuName').val();                                          //名称
		 	var menuLink = $('#menuLink').val();	                                      //链接                  	
		    var isChild = $("input[name='isChild']:checked").val();                      //子节点
		    var menuNum = $('#menuNum').val();   
	//	    alert(nodes[0].id);
		    console.log(nodes);
		    console.log(nodes[0].id);
			console.log(menuLink);
			console.log(menuName);
			console.log(isChild);
			console.log(menuNum);
			
			if(Validator.validate('#form1')){
				
		      obj.ajax('/bg/menuManager/addMenu',{
		      	
		      	'parentId':nodes[0].id,
		      	'title':menuName,
		      	'href':menuLink,
		      	'isLeaf':1,
		      	'sortBy':menuNum
		        },function(data){
		        	$.alert(data.msg);
		        	
		      		  $('#menuTable').treegrid('reload');
		      		  $('#box2').tree('reload');
		
		                  fn1();    //再次回调刷新
		      		console.log(data);
		      		
		      	},function(data){console.log('添加失败')});
		      	
			}else{
				
			}
		  	
	});
	
	//修改
	 function menuUpdate(n){
		
		var row = $('#menuTable').datagrid('getSelected');
	     console.log(row)
		if (row){
		        console.log(row);
			    fn2(row.id);
			    $('#menuUpdate').modal('show');
			   //回显数据
			   //父节点
			 	$('#menuName2').val(row.title);                                                           //名称
			 	$('#menuLink2').val(row.href);     
			 	$('input:checkbox[name=test]').prop("checked",false);
			    $('input:checkbox[name=test][value='+row.isLeaf+']').attr('checked','true'); //子节点	 
			    
			    $('#menuNum2').val(row.sortBy);                                                            //序号
			    
				
	     }else{   
	     	
	          $.alert('请选择目标');
			  $('#menuUpdate').modal('hide');
	     }
	}
	 
	 $('#menUpdateBtn').click(function(){
	   var row = $('#menuTable').datagrid('getSelected');			
		var nodes = $('#box3').tree('getChecked');	
	                                      //父节点
	 	var menuName2 = $('#menuName2').val();                                           //名称
	 	var menuLink2 = $('#menuLink2').val();	                                         //链接                  	
	    var menuChild2 = $("input[name='upd_radio']:checked").val();                      //子节点
	    var menuNum2 =$('#menuNum2').val();                                              //序号
	  
		
		obj.ajax('/bg/menuManager/updateMenu' ,{
			'mid':row.mid,
			'parentId':nodes[0].id,
	      	'title':menuName2,
	      	'href':menuLink2,
	      	'isLeaf':1,
	      	'sortBy':menuNum2
		},function(data){
			console.log(data);
		     $.alert(data.msg)
		     if(data.status = 'OK'){
		     	  $('#menuTable').treegrid('reload');
		     	 $('#menuUpdate').modal('hide');
		     }
           
            
		},function(data){})
	});
		
	//修改  end
	 
	
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
	
	
	//分配角色
	//function addMenuSort(n){
	//	
	//	var row = $('#menuTable').datagrid('getSelected');
	////  console.log(row);
	//  
	//	if(row){                                                                               //判断是否选中目标，选中触发下拉框
	//		$('#user-btn').modal('show');
	//		fn();                   
	//		     //回显row的数据表格部分
	//		$('#addSortBtn').click(function(){                      //提交新的角色
	//			
	//		    var row = $('#addMenuRole').datagrid('getSelected'); //获取选中角色的所在行
	//			
	//			obj.ajax('/role/addRole',{'rid':row.rid},function(data){alert('新角色权限添加成功！')},function(){alert('新角色权限添加成功！')});
	//		    //
	//		});
	//			
	//	}else{                                                                   //没有选中目标执行以下程序
	//		
	//		alert('请选择目标');
	//		$('#user-btn').modal('hide');
	//		
	//	}
	//}
	
	//启用
	function menuStart(n){
		var row = $('#menuTable').datagrid('getSelected');
		if(row){                                                                //判断是否选中目标，选中触发模态框
			
			$('#user-start').modal('show');
			$('#menuStartBtn').click(function(){
				
				obj.ajax('/bg/menuManager/changeStatus',{'mid':row.mid,"status":0},function(data){    
					console.log(data);
					if(data.status=='ERROR'){  
				           	$.alert(data.msg);
				    }else{
				           alert('启动成功！');
			   	    	   $('#user-start').modal('hide');
			   	    	   $('#menuTable').treegrid('reload');
				    };
				}, function(data){ console.log('启用失败！')});
			});
			
		}else{                                                                   //没有选中目标执行以下程序
			  
			$.alert('请选择目标');
			$('#user-start').modal('hide');
		}
	}
	
	//禁用
	function menuStop(n){
		
		var row = $('#menuTable').datagrid('getSelected');
		   
		if(row){                                                                //判断是否选中目标，选中触发模态框
			   $.alert(row.mid);
			$('#user-end').modal('show');
			$('#menuStopBtn').click(function(){                                   //确定启动发送到后台
				
				obj.ajax('/bg/menuManager/changeStatus' ,{'mid':row.mid,"status":1},function(data){ 
					console.log(data);
					if(data.status=='ERROR'){  
				           	$.alert(data.msg);
				           	
				           	
				        }else{
				           $.alert('禁用成功！');
			   	    	   $('#user-end').modal('hide');
			   	    	    $('#menuTable').treegrid('reload');
				    };
					
			   },function(data){
					console.log('禁用失败！');});
			});
		}else{        
			$.alert('请选择目标');	
			$('#user-end').modal('hide');
		}
	}
	
	
	// 重置密码
	
	//function menuReset(n){
	//	
	//	var row = $('#menuTable').datagrid('getSelected');
	//	
	//	if(row){                                                              //判断是否选中目标，选中触发模态框
	//		
	//		$('#user-pass').modal('show');
	//		
	//		$('#menuResetBtn2').click(function(){
	//			
	//			$('#user-pass').modal('hide');
	//			$('#user-pass2').modal('show');
	//			
	//			$('#menuResetBtn').click(function(){
	//			  
	//				var oldPsd = $('#oldPsd').val();
	//				var newPsd = $('#newPsd').val();
	//				  
	//				obj.ajax('url' ,{},function(){ console.log('重置成功！');},function(){console.log('重置失败！');});
	//			
	//			});
	//	   });
	//		
	//	}else{                                                           //没有选中目标执行以下程序
	//		
	//		alert('请选择目标');
	//		$('#user-pass').modal('hide');
	//	}
	//}
	
	//$('#menuTable').treegrid({
	//      onSelect: function (node) {
	//          if (node.state == "closed")
	//              $(this).tree('expand', node.target);
	//          else
	//              $(this).tree('collapse', node.target);
	//      }
	//});
	
	$('#menuTableBox').show();         //初始化隐藏  menuTab 数据表格  
	$('#tabYE').hide();                //初始化 隐藏tabYE
	
	
	//配置按钮 
	function resetBtn(){
		var nodes = $('#menuTable').treegrid('getSelected');
		
	//	alert(nodes.mid);
	    console.log(nodes);
	    if(nodes.isLeaf==1){//判断是否是叶子节点
	    
	        yeInint(nodes.mid);            //调用初始化函数
	    	$('#menuTableBox').hide();
	        $('#tabYE').show();
	        $('#menuBox1').hide();
	        $('#menuBox2').show();
	    	console.log('是叶子节点');
	    		
	    }else{
	        	
	       console.log('不是是叶子节点');
	       $('#menuTable').show();
	       $('#yeTable').hide();
	       $('#menuBox1').show();
	       $('#menuBox2').hide();
	       $.alert('请选择正确的子节点！');
	    }
	}
	
	//配置按钮新增
	
	 $('#addConfigureBtn').click(function(){
	 	var nodes = $('#menuTable').treegrid('getSelected');
	 	$.alert(nodes.mid);
	 	var permissionName = $('#permissionName').val();     //按钮名称
	 	var permissionCode =$('#permissionCode').val();      //按钮编码
	 	var description    = $('#description').val();         //备注
	 	
	 	console.log(permissionName);
	 	console.log( permissionCode);
	 	console.log(description);
	 	obj.ajax('/bg/menuManager/addButtonMenu',{
	 		'permissionName':permissionName,
	 		'permissionCode':permissionCode,
	 		'description':description,
	 		'mid':nodes.mid
	 	    },function(data){
	 		console.log(data);
				    if(data.status=='OK'){
			           $.alert(data.msg);
			          
			           $('#yeTable').datagrid('reload');
			    	   $('#addConfigure').modal('hide');
			        }else{
			          
					};
					
			    },function(data){
			});
	 })
	
	//配置按钮修改 
	function  updateConfigure(n){
		
		var row= $('#yeTable').datagrid('getSelected');
	
		if (row){
			   $.alert(row.pid)
			$('#updateConfigure').modal('show');
			obj.ajax('/bg/menuManager/fingButtonById',{
				'pid':row.pid
				
			},function(data){
	  		     //回显数据
	  		     console.log(data);
	  		    $('#permissionName2').val(data.rows.permissionName);     //按钮名称
			 	$('#permissionCode2').val(data.rows.permissionCode);      //按钮编码
			 	$('#description2').val(data.rows.description);         //备注
			      		     
		  		     
				    $('#updateBtn22').click(function(){
				    var nodes= $('#yeTable').datagrid('getSelected');
				    	
				   	  console.log(nodes);
				   	    var permissionName2 = $('#permissionName2').val();     //按钮名称
					 	var permissionCode2 =$('#permissionCode2').val();      //按钮编码
					 	var description2   = $('#description2').val();         //备注
					
				   	     obj.ajax('/bg/menuManager/updateButton',{
				   	     	'permissionName':permissionName2,
				   	     	'permissionCode':permissionCode2,
				   	     	'description':description2,
				   	     	'pid':nodes.pid
				   	     	
				   	     },function(data){
				   	     	console.log(data);
					   	     	if(data.status=='ERROR'){  
						           	$.alert(data.msg);
						        }else{
						           $.alert('按钮修改成功！');
						           $('#yeTable').datagrid('reload');
						    	   $('#updateConfigure').modal('hide');
								};
				   	     	
				   	     	console.log('数据添加成功！')},function(data){
				   	     		
				   	     	});
				   });
			   },function(){
			})
			
	     }else{     	
	          $.alert('请选择目标');
			  $('#updateConfigure').modal('hide');
	     }
	}
	
	
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
	
	
	//*将一般的JSON格式转为EasyUI TreeGrid树控件的JSON格式    end
	/*******************菜单***********************/

	 