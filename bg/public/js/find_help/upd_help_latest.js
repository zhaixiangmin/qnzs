function upd_help_latest(hpId){
	
	      var parent_hpId = JSON.stringify(hpId);
	       $.cookie('parent_hpId', parent_hpId, {path: '/'}); // 存储到cookie(区域)
	
	$('#upd_help_latest_table').datagrid({ title: '修改录入最新进展',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/help/findHelpAudit?hpId='+hpId,   //获取表格数据时请求的地址
	           columns:[[
			        {field:'auditId',title:'编号',hidden:false,align : 'center',width : $(this).width() * 0.08},
			        {field:'hpId',title:'求助id ',align : 'center',width : $(this).width() * 0.08},
			       
			        
			        
			        {field:'auditType',title:'状态',align : 'center',width :150,
			        
			          formatter: function(value,row,index){
			        		if(value == 3){
			        			return '等待处理';
			        		}
			        		if(value == 0){
			        			
			        			return '处理中';
			        		}
			        		if(value == 1){
			        			
			        			return '求助中';
			        		}
			        		if(value == 2){
			        			
			        			return '已解决';
			        		}
			        		if(value == 5){
			        			
			        			return '退回';
			        		}
			        		if(value == 6){
			        			
			        			return '组织帮助中';
			        		}
			        		if(value == 4){
			        			
			        			return '删除';
			        		}
				        }
			        },
			        {field:'updateTime',title:'创建时间 ',align : 'center',width : $(this).width() * 0.1},
			        {field:'content',title:'审核备注 ',align : 'center',width :200},
			        
			     
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
	                $('#upd_help_latest_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", true);
	                //将这次的checkbox标记为选中
	                $('#upd_help_latest_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	});
}

    
//修改调转

function upd_latestInfo(){
	 	var selectedData = $('#upd_help_latest_table').datagrid('getSelected');
	    console.log(selectedData)
	 	   var auditType = JSON.stringify(selectedData.auditType);
	       $.cookie('auditType', auditType, {path: '/'}); // 存储到cookie(区域)
          window.location.href ="upd_latest.html?auditId="+selectedData.auditId;
       
    
}
        
