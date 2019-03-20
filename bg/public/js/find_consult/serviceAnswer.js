
    //console.log(base+'base');
    var limits = Utils.getQueryString('limit'); // 权限
    console.log('limits', limits);
    $('#toolbar li').hide(); // 隐藏所有按钮

    if (limits) {
        limits = limits.split(','); // 将字符串解析成数组
        for (var i = 0; i < limits.length; i++) {
            var limit = limits[i];
            $('#' + limit).show(); // 显示权限按钮
        }
    }
   
/*表格初始化*/
    $('#mytb').datagrid({ title: '问题管理',  //表格名称           iconCls: 'icon-edit',  //图标
           width:$(this).width() * 0.97,   //表格宽度
           height:$(this).outerHeight(),   //表格高度，可指定高度，可自动
           border:true,  //表格是否显示边框
           url:FindConsultApi.serviceAnswerListUrl,   //获取表格数据时请求的地址
           columns:[[
               {field: 'repId', title: '编号', width: 150},
               {field: 'replyContent', title: '回复内容', width: 255,},
               {field: 'replyTime', title: '回复时间', width: 150,
                   // formatter: function(value,row,index){
                   //     if (value){
                   //         return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                   //     }else{
                   //         return '';
                   //     }
                   // }
               },
               {field: 'status', title: '审核状态', width: 150,
                   formatter: function(value, row, index){
                       if (value == 2) {
                           return '待审核';
                       } else if (value == 0) {
                           return '<font color="green">已通过</font>';
                       } else if (value == 1) {
                           return '<font color="red">不通过</font>';
                       }
                   }
               },
               {field: 'questionTitle', title: '问题标题', width: 150},
               {field: 'categoryName', title: '服务类别', width: 150},
               {field: 'askContent', title: '提问内容', width: 270,
                   formatter: function(value,row,index){
                       if (value == null || value == undefined) {
                           return '';
                       }
                       if (value.length > 20) {
                           var content = value.substring(0, 20) + "...";
                           return content;
                       }
                       return value;
                   }
               },

          ]],
           pagination:true,//如果表格需要支持分页，必须设置该选项为true
           pageNumber: 1,
           pageSize:15,   //表格中每页显示的行数
           pageList:[20,100,200],
           rownumbers:true,   //是否显示行号
           nowrap: false,   
           striped: true,  //奇偶行是否使用不同的颜色
           method:'get',   //表格数据获取方式,请求地址是上面定义的url
           sortName: 'ID',  //按照ID列的值排序
           sortOrder: 'desc',  //使用倒序排序
           //idField: 'quId',
           loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
           singleSelect:false,
           frozenColumns: [[  //固定在表格左侧的栏
                       {field: 'ck', checkbox: true}
                     ]],
            
            onClickRow: function(index, data) {
                //将所有checkbox修改为未选中
                $('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
                //将这次的checkbox标记为选中
                $('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
            }
            
});
    
/**
 * 搜索-数据筛选
 */
// 数据筛选 -- 所属类别
$('#categoryId').combobox({
    valueField: 'caId',
    textField: 'name',
    //url: Qnzs.path+'/bg/serviceCategory/findByAdvice',
    // editable: false, // 不可编辑，只可选
    loader: function (param,success, error) {
        FindConsultApi.findByAdvice({}).then(function (data) {
            console.log('data',data);
            if(!data.rows || data.rows.length <= 0) {
                $.alert('所属类别返回列表为空');
                error();
                return;
            }
            success(data.rows);
        })
    }
})

$("#searchbtn").click(function (){
    var keyword = $("#keyword").val();//关键字
    var title = $("#title").val();//问题标题
    var status = $("#status").val();//审核状态
    var categoryId = $("#categoryId").combobox("getValue");//所属类别
    console.log('status', status);
    console.log('keyword', keyword);
    console.log('categoryId', categoryId);

    $('#mytb').datagrid('load',{
        keyword: keyword, // 站点全称的关键字
        categoryId:categoryId,//所属类别
        title: title, // 问题标题
        status: status // 审核状态

    });
   })

//清空操作
$('#clearbtn').click(function () {
   $('#ff_question').form('clear')    
})


/**
 * 查看
 */
function openDetail() {
    var row= $('#mytb').datagrid('getSelected');
    if(row = null)
    {$.alert('请选择一条数据进行操作')}else {
        $('#user-see').modal('show');
        $('#user-see').form('load',{
            fullName: selectedData.fullName, // 站点全称
            shortName: selectedData.shortName, // 站点简称
            organizationName: selectedData.organizationName, // 站点管理员

        });
    }
}

/*
 审核通过
 */
$('#reply_pass').click(function () {
    //alert('111')
    var row =$('#mytb').datagrid('getSelections');// 返回选中多行数据
//  var row =$('#mytb').datagrid('getSeleced');
    if(row.length<=0){     
     	$.alert('请选择一条数据操作');
     	return ;
    }
    
    if(row == null){
    	$.alert('请选择一条数据进行操作')
    }else {
        $('#user-verify').modal('show');
       
    }
})  //

 $('#yes_btn-primary').click(function () {
 
    
        var row =$('#mytb').datagrid('getSelections');// 返回选中多行数据
        if(row.length<=0){     
	     	$.alert('请选择一条数据操作');
	     	return ;
	    }
		var s1 = [];  //获取id存入数组
		for(var i =0 ;i<row.length;i++){   
			s1.push(row[i].repId);
		} 
        FindConsultApi.auditUpdate({'repId': s1.toString()}).then(
            function (data) {
                if(data.status=='OK'){
                	
                    $.messager.alert('', '操作成功！');
                    $('#mytb').datagrid('reload');
                    $('#user-verify').modal('hide');
                }else{
                    $.alert('操作失败')
                };
            }
        )
    })// 审核通过  end



/*
 审核取消
 */
$('#reply_notPass').click(function () {

    var row =$('#mytb').datagrid('getSelections');// 返回选中多行数据
    if(row.length<=0){     
     	$.alert('请选择一条数据操作');
     	return ;
    }
	
    
    if(row == null){
    	$.alert('请选择一条数据进行操作');
   }else {
        $('#user-verify-not').modal('show');
        
    }
})
 $('#del_btn-primary').click(function () {
 	
    var row =$('#mytb').datagrid('getSelections');
    
    var s1 = [];  //获取id存入数组
	for(var i =0 ;i<row.length;i++){   
		s1.push(row[i].repId);
	} 
    
    FindConsultApi.deletePost({'repId': s1.toString()}).then(
        function (data) {
        	
            if(data.status=='OK'){
            	
                $.messager.alert('', '操作成功！');
                $('#mytb').datagrid('reload');
                $('#user-verify-not').modal('hide');
            }else{
                $.alert('操作失败')
            };
        }
    )
})  //审核取消 end





/**
  审核
 */
// function auditQuestionByIds(){
//     var selRows = $('#mytb').datagrid('getSelections');// 返回选中多行数据
//     console.log("selRows == " + selRows);
//     if (selRows.length <= 0) {
//         $.messager.alert('Warning', '请至少选择一行数据进行操作');
//         return;
//     } else {
//         var quId = '';
//         $.each(selRows, function(index, row){
//             if(row.isDisabled == 0 && row.status == 0){
//                 quId += row.quId + ',';
//             }
//         });
//         quId = quId.substring(0, quId.length - 1);
//         $.messager.confirm('确认对话框', '这些问题确认要审核通过吗', function(r){
//             if (selRows){
//                 $.getJSON(Qnzs.path + '/bg/serviceQuestion/examine', {'quId': quId,}, function(data){
//
//                     $.messager.alert('Warning', '设置成功');
//                     $('#mytb').datagrid('reload');
//                     $('#dg_question').datagrid('clearSelections');
//                     $('#dg_question').datagrid('clearChecked');
//                 },function () {
//                     $.messager.alert('Warning', '设置失败');
//                     }
//                 );
//             }
//         });
//     }
// }
// /**
//  * 启用(显示)
//  */
// function userStart() {
// //  alert("openDisabled");
//     var row = $('#mytb').datagrid('getSelected');
//     if (row == null) {
//         $.messager.alert('Warning', '请选择需要操作的内容');
//     } else {
//         var isDisabled = row.isDisabled;
//
//         if (isDisabled == 0) {  //不显示-禁用 状态
//              $.messager.alert('Warning', '此服务类别已经处于正常启用显示状态！')
//         } else if (isDisabled == 1) {  //显示-启用 状态
//             //$.messager.confirm('提示', "确定要启用此服务类别吗？", function () {
//             if (row) {
//
//                 $('#user-start').modal('show');
//                 //获取启动目标的
//                 $('#userStartBtn').click(function() { //确定启动发送到后台
//
//                     FindConsultApi.serviceQuestionStart({'quId': row.quId}).then(function(data){
//                         if(data.status=='OK'){
//                             $.messager.alert('', '启用成功！');
//                             $('#mytb').datagrid('reload');
//                             $('#user-start').modal('hide');
//                         }else{
//                             $.alert('启动失败')
//                         };
//                     });
//                 });
//
//             }
//         }
//     }
// }
// /**
//  * 禁用（不显示）
//  */
// function userStopt() {
// //  alert("openDisabled");
//     var row = $('#mytb').datagrid('getSelected');
//
//     if (row == null) {
//         $.alert('请选择需要操作的内容');
//         return;
//     } else {
//         var isDisabled = row.isDisabled;
//         console.log(isDisabled);
//         if (isDisabled == 1) {  //不显示-禁用 状态
//             $.messager.alert('Warning', '此服务类别已经处于禁用不显示状态！');
//         } else if (isDisabled == 0) {  //显示-启用 状态
//             //$.messager.confirm('提示', "确定要禁用此服务类别吗？", function () {
//             if (row) {
//
//                 $('#user-end').modal('show');
//                 //获取启动目标的
//                 $('#userStoptBtn').click(function() { //确定启动发送到后台
//
//                     FindConsultApi.serviceQuestionStop({'quId': row.quId}).then(function(data){
//                         if(data.status=='OK'){
//                             $.messager.alert('', '禁用成功！');
//                             $('#mytb').datagrid('reload');
//                             $('#user-end').modal('hide');
//                         }else{
//                             $.alert('禁用失败')
//                         };
//                     });
//                 });
//             }
//         }
//     }
// }
// /**
//  * 设置精华帖
//  */
// function setEssenceQuestion()
// {
//     var row = $('#mytb').datagrid('getSelected');//返回选择一条
//     if (row == null) {
//         $.messager.alert('Warning', '请选择需要操作的内容');
//     } else {
//
//         var isEssenceRow = row.isEssence;
//         console.log("isEssence == " + isEssence + "; isEssenceRow == " + isEssenceRow);
//         if(isEssenceRow == 1) {
//             $.messager.alert('Warning', '此服务问题已进行过此操作！');
//         } else {
//             //$.messager.progress();
//
//             $.getJSON(Qnzs.path + '/bg/serviceQuestion/setEssence', {'quId' : row.quId}, function(data) {
//                 //$.messager.progress('close');
//                // if (data.success == 1) {  // 操作成功
//                     $.messager.alert('title', '设置成功.');
//                     $('#mytb').datagrid('reload');
//                     // $.messager.show({
//                     //     title : '提示',
//                     //     msg : data.msg
//                     // });
//                // }
//             },function () {
//                 $.messager.alert('Warning', '操作失败.');
//             });
//         }
//     }
// }
// /**
//  * 移除精华帖
//  */
// function essenceQuestionRemove(isEssence)
// {
//     var row = $('#mytb').datagrid('getSelected');
//     if (row == null) {
//         $.messager.alert('Warning', '请选择需要操作的内容');
//     } else {
//
//         var isEssenceRow = row.isEssence;
//         console.log("isEssence == " + isEssence + "; isEssenceRow == " + isEssenceRow);
//         if(isEssenceRow == 0) {
//             $.messager.alert('Warning', '此服务问题已进行过此操作！');
//         } else {
//            // $.messager.progress();
//
//             $.getJSON(Qnzs.path + '/bg/serviceQuestion/removeEssence', {'quId' : row.quId}, function(data) {
//                 //$.messager.progress('close');
//                 //if (data.success == 0) {  // 操作成功
//                     $('#mytb').datagrid('reload');
//                     $.messager.alert('title', '设置成功.');
//
//             },function () {
//                 $.messager.alert('Warning', '操作失败.');
//             });
//         }
//     }
// }