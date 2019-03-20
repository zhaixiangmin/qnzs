var sendId= getUrlParam('sendId');

$(function() {
	
	$('#statistics_table').datagrid({
			title: '接收人员管理', //表格名称           iconCls: 'icon-edit',  //图标
			width: 1300, //表格宽度
			height: 520, //表格高度，可指定高度，可自动
			border: true, //表格是否显示边框
			url: Qnzs.path + '/bg/message/findMsgReceive?sendId='+ sendId, //获取表格数据时请求的地址
			//url: "//169.168.200.19:8080/qnzs/activity/offlineActivity/bg/list", //获取表格数据时请求的地址
			
			columns: [
				[{
					field: 'receiveId',
					title: '编号',
					width: 120
				}, {
					field: 'realname',
					title: '发送人',
					width: 200
				},  {
					field: 'receiveTime',
					title: '发送时间',
					width: 200
				} ,{
					field: 'districtName',
					title: '所在地区',
					width: 200
				}, {
					field: 'mobile',
					title: '联系电话',
					width: 120
				}, {
					field: 'status',
					title: '发送状态',
					width: 100,
					formatter: function(value, row, index) {
						if (0 == value) {
							return "<font>发送成功</font>";
						}
						
						if (1 == value) {
							return "<font>发送失败</font>";
						}
						
						
					}

				}]
			],
			pagination: true, //如果表格需要支持分页，必须设置该选项为true
			pageNumber: 1,
			pageSize: 20, //表格中每页显示的行数
			pageList: [20, 25, 30],
			rownumbers: true, //是否显示行号
			nowrap: false,
			striped: true, //奇偶行是否使用不同的颜色
			method: 'get', //表格数据获取方式,请求地址是上面定义的url
			//sortName: 'ID', //按照ID列的值排序
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
				$('#statistics_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
				//将这次的checkbox标记为选中
				$('#statistics_table').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
			}
		});
		
		
		
		//搜索功能
		$("#classy_actit").click(function(){

			var realName=$('#key_Word').val();
			var phone=$('#send_phone').val();
			var status=$('#is_Use').val();
			 $('#statistics_table').datagrid({
	        queryParams: {
			   'realName':realName,
			   'phone':phone,
			   'status':status
			 
			
			  }
	        
	      })
			
		})
		//清空数据
		
		$("#btn_empty").click(function(){
			
			$('#key_Word').val('');
			$('#send_phone').val('');
			$('#is_Use').val('');
			
		})
		
		
		
		
});


//站内管理一键重发
function senddata(n) {
	var row = $('#statistics_table').datagrid('getSelected');
	if (row) { //判断是否选中目标，选中触发模态框
		

		$('#user-verify').modal('show');

		//获取启动目标的
		
	} else { //没有选中目标执行以下程序
		$.alert('请选择一键重发的目标');
		$('#user-verify').modal('hide');
	}
}
$('#comit_audit').click(function() { //确定启动发送到后台
			
			var row = $('#statistics_table').datagrid('getSelected');
			var sendId = row.sendId;
			var data = {
				'sendId':sendId,
				'status':2
			}
			InstationApi.instationaudit(data).then(function(data) {
				if (data.status == 'OK') {
					$.alert("发送成功！");
					$('#activitie').datagrid('reload');
					$('#user-verify').modal('hide');
					//					window.location.reload();
				} else {
					$.alert("发送失败！");
				};
			});
		});
		