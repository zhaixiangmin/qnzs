var activityId=getUrlParam('activityId');


/*获取列表页*/
$(function(){
	$('#signedAccList').datagrid({
		title: '举报清单', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url:Qnzs.path+'/complaint/bg/detailList?complaintId='+activityId, //获取表格数据时请求的地址
		queryParams: {
			"pageSize": function() {
				return $('#signedAccList').datagrid("getPager").pagination("options").pageSize;
			},
			"pageIndex": function() {
				return $('#signedAccList').datagrid("getPager").pagination("options").pageNumber;
			}
		},
		columns: [
		          [
		           {
		        	   field: 'id',
		        	   title: '编号',
		        	   width: 100
		           },
		           {
		        	   field: 'content',
		        	   title: '举报内容',
		        	   width: 150
		           },
		           {
		        	   field: 'reportTime',
		        	   title: '举报时间',
		        	   width: 200
		           },
		           {
		        	   field: 'reportUserMobile',
		        	   title: '举报人电话',
		        	   width: 200
		           },
		           {
		        	   field: 'reportUserName',
		        	   title: '举报人姓名',
		        	   width: 200
		           },
		           {
		        	   field: 'reportType',
		        	   title: '举报分类',
		        	   width: 200,
		        	   formatter: function(value, row, index) {
		        		   if(0 == value) {
		        			   return "<font>其他</font>";
		        		   }
		        		   if(1 == value) {
		        			   return "<font>欺诈</font>";
		        		   }
		        		   if(2 == value) {
		        			   return "<font>色情</font>";
		        		   }
		        		   if(3 == value) {
		        			   return "<font>诱导行为</font>";
		        		   }
		        		   if(4 == value) {
		        			   return "<font>不实信息</font>";
		        		   }
		        		   if(5 == value) {
		        			   return "<font>违法犯罪</font>";
		        		   }
		        		   if(6 == value) {
		        			   return "<font>骚扰</font>";
		        		   }
		        		   if(7 == value) {
		        			   return "<font>侵权</font>";
		        		   }
		        	   }
		           }
		           ]
		          ],
		          pagination: true, //如果表格需要支持分页，必须设置该选项为true
		          pageNumber: 1,
		          pageSize: 15, //表格中每页显示的行数
		          pageList: [5, 10, 15],
		          rownumbers: true, //是否显示行号
		          nowrap: false,
		          striped: true, //奇偶行是否使用不同的颜色
		          method: 'get', //表格数据获取方式,请求地址是上面定义的url
		          sortName: 'ID', //按照ID列的值排序
		          sortOrder: 'desc', //使用倒序排序
		          idField: 'id',
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
		                        	  $('#signedAccList').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
		                        	  //将这次的checkbox标记为选中
		                        	  $('#signedAccList').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		                          }



	});
});

/*导出下载*/

/*function startusing(n){


window.location.href = Qnzs.path+'/activity/sign/bg/signedAcc/export?activityId='+activityId;


}*/