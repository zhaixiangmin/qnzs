var activityId=getUrlParam('activityId');


/*获取列表页*/
$(function(){

	$('#signedAccList').datagrid({
		title: '活动签到人员', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 520, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url:Qnzs.path+'/activity/sign/bg/signedAcc/list?activityId='+activityId, //获取表格数据时请求的地址
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
		        	   field: 'realname',
		        	   title: '签到人',
		        	   width: 150
		           },

		           /*{
				field: 'photoUrl',
				title: '头像',
				align: 'center',
				width: $(this).width() * 0.08,
				formatter: function(value, row, index) {
				return "<img src='" + value + "' height='100px' width='200px'></img>";
					}
			},

			{
				field: 'gender',
				title: '性别',
				width: 200,
				formatter: function(value, row, index) {
						if(1 == value) {
							return "<font>男</font>";
						}
						if(2 == value) {
							return "<font>女</font>";
						}
						if(3 == value) {
							return "<font>保密</font>";
						}

					}
			},*/
		           {
		        	   field: 'mobile',
		        	   title: '电话',
		        	   width: 200
		           },

		           {
		        	   field: 'signInTime',
		        	   title: '签到时间',
		        	   width: 200
		           },
		           {
		        	   field: 'signInAddress',
		        	   title: '签到地点',
		        	   width: 200
		           }
		           ]
		          ],
		          pagination: true, //如果表格需要支持分页，必须设置该选项为true
		          pageNumber: 1,
		          pageSize: 500, //表格中每页显示的行数
		          pageList: [50, 200, 500],
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

function startusing(n){
	window.location.href = Qnzs.path+'/activity/sign/bg/signedAcc/export?activityId='+activityId;
}