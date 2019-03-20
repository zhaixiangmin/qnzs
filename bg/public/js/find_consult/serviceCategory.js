

var limits = Utils.getQueryString('limit'); // 权限

$('#toolbar li').hide(); // 隐藏所有按钮

if (limits) {
    limits = limits.split(','); // 将字符串解析成数组
    for (var i = 0; i < limits.length; i++) {
        var limit = limits[i];
        $('#' + limit).show(); // 显示权限按钮
    }
}
//初始化组织管理数据表格以及分页
$('#mytb').datagrid({ title: '服务类别管理',  //表格名称           iconCls: 'icon-edit',  //图标
    width:$(this).width() * 0.97,   //表格宽度
    height:$(this).outerHeight(), //表格高度，可指定高度，可自动
    fitColumns:false,//表格滚动
    border:true,  //表格是否显示边框
    url:FindConsultApi.serviceCategoryListUrl,   //获取表格数据时请求的地址
    columns:[[

        {field:'caId',title:'编号',width:150},
        {field:'scName',title:'类别名称',width:150},
        {field:'description',title:'类别介绍',width:150},
        {field:'createTime',title:'创建时间',width:150,
            // formatter: function(value,row,index){
            //     if (value){
            //         return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            //     }else{
            //         return '';
            //     }
            // }
        },
        {field:'orderId',title:'显示顺序(数字大优先)',width:150},
        {field:'orgName',title:'创建者',width:150,},

        {field:'isUse',title:'使用状态',width:150,
            formatter: function(value, row, index){
                return value ? '<font color="green">正常</font>' : '<font color="red">禁用</font>';
            }},
        {field:'type',title:'分类类型',width:150,
            formatter: function(value, row, index){
                if(value==1){
                    return '<font color="green">找咨询</font>';
                }else if(value==2){
                    return '<font color="green">高校</font>';
                }else if(value==3){
                    return '<font color="green">线下服务</font>';
                }else if(value==5){
                    return '<font color="green">找帮助</font>';
                }else if(value==4){
                    return '<font color="green">其他</font>';
                }

            }},
        {field:'photoUrl',title:'预览',width:100,
            formatter: function(value,row,index){
                return "<img src='" + value + "' height='60px' width='60px' style='padding: 5px'></img>";
            }
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
        $('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
        //将这次的checkbox标记为选中
        $('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
    }
});


// 过滤数据列表查询
$('#searchBtn').click(function () {
    var userkeyWord = $('#userkeyWord').val();//关键字
    var userType = $('#isUser option:selected').val(); //用户类型
    // console.log(userkeyWord);
    // console.log(userType);
    $('#mytb').datagrid({
        queryParams: {
            name:userkeyWord,
            isUse:userType
        },
        //// console.log(userType),
        onLoadSuccess:function(){
            //一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题。
            $('#mytb').datagrid('clearSelections');
        }
    });
});

//置空查询
$('#clearBtn').click(function(){
    $('#userkeyWord').val('');
    $('#isUser option:selected').attr('selected',false);

})
/*
 新增
 */
$('#addInfo').click(function () {

    var sortName = $('#sortName').val();
    var descriName = $('#descriName').val();
    var isUseName = $('#isUseName option:selected').val();
    var typeName = $('#typeName option:selected').val();
    var orderIdName = $('#orderIdName').val();
    var photoUrlName = $('#photoUrlName').val();

    var validateFlag = $('#fm_serviceCategoryAdd').form('validate'); // 验证表单，填写信息是否完整
    // console.log('validateFlag', validateFlag);
    if (!validateFlag) { // 表单填写未完成
        return;
    }

    FindConsultApi.serviceCategoryAdd({
        name: sortName,
        description: descriName,//类别
        isUse: isUseName,//问题内容
        type: typeName,//专家
        orderId: orderIdName, // 问题标签
        photoUrl: photoUrlName, // 问题等级

    }).then(function (data) {
        //// console.log('添加结果data', data);
        $('#mytb').datagrid('reload');
        // $('#serviceQuestion_add').window('close');
        // $('#serviceQuestion_add').form('clear');
        $('#user-add').modal('hide');
        $('#user-add').form('clear');
        // if (!data.rows || data.rows.length <= 0) {
        //     $.alert('所属类别返回列表为空');
        //     error();
        //     return;
        // }
        //success(data.rows);
    })
//     if (!sortName || !orderIdName) { // '' 、 null 、 undefind
//          $.messager.alert('Warning', '此为必填项');
//      }
//     else {
//     obj.ajax('/bg/serviceCategory/add', {
//             'name': sortName,
//             'description': descriName,
//             'isUse': isUseName,
//             'type': typeName,
//             'orderId': orderIdName,
//             'photoUrl': photoUrlName
//         },
//
//         function (data) {
//             $('#mytb').datagrid('reload');
//             $('#user-add').modal('hide');
//             $('#user-add').form('clear');
//             //}
//             $('#user-add').modal('hide');
//         }, function (data) {
//             $.messager.alert('My Title', '添加失败！', 'info');
//         }
//     );
// }

});
/**
 * 新增上传图片
 */
// function uploadImage(){
//     $('#file').click();
// }
$(document).ready(function() {

    $('#file').fileupload({
        url: Qnzs.path+'/file_upload',
        dataType: 'json',
        autoUpload: true,
        done: function(e, data) {

            // console.log(data.result.url);
        },
        fail: function() {
            alert('系统繁忙，请稍后再试！');
        }
    });

})

var image = '';

function selectImage(file) {
    if(!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('photoUrlName').src = evt.target.result;
        image = evt.target.result;
        //// console.alert(data.result.url);
    }
    reader.readAsDataURL(file.files[0]);
}

/*
编辑
*/
function updateIofn() {

    var row = $('#mytb').datagrid('getSelected');

    if (row) {

        $('#user-editor').modal('show');
        FindConsultApi.findCategorieById({caId: row.caId }).then(function (data) {
            // 成功 回显数据
            //$('#caId').val(data.caId);
            $('#sortName_update').val(data.rows.name);//类别名称
            $('#descriName_update').val(data.rows.description);//类别栏目介绍
            $('#isUseName_update').val(data.rows.isUse);//使用状态
            $('#typeName_update').val(data.rows.type);//分类类型
            $('#orderIdName_update').val(data.rows.orderId);//显示顺序
            $('#photoUrlName_update').val(data.rows.photoUrl);//分类logo地址
            // console.log('huan obj is'+obj);
            //向后台添加数据
            $('#updateInfoBtn').click(function () {

                var sortName = $('#sortName_update').val();//类别名称
                var descriName = $('#descriName_update').val();//类别栏目介绍
                var isUseName = $('#isUseName_update option:selected').val();//使用状态
                var typeName = $('#typeName_update option:selected').val();//分类类型
                var orderIdName = $('#orderIdName_update').val();//显示顺序
                var photoUrlName = $('#photoUrlName_update').val();//分类logo地址
                var caId = data.rows.caId;

                // console.log(sortName);
                // console.log(descriName);
                // console.log(isUseName);
                if(!sortName || !orderIdName){
                    $.messager.alert('',"该项是必填项",'info')
                    $('#user-editor').modal('show');
                }else {

                    FindConsultApi.serviceCategoryEdit({
                        'name': sortName,
                        "description": descriName,
                        "isUse": isUseName,
                        "type": typeName,
                        "orderId": orderIdName,
                        "photoUrl": photoUrlName,
                        "caId": caId,
                    }).then(function (data) {
                        if (data.status == 'OK') {
                            $.messager.alert('', "信息修改成功", 'info');
                            $('#mytb').datagrid('reload');
                            $('#user-editor').modal('hide');
                        } else {
                            $.messager.alert('', "信息修改失败，请稍后再试。")
                        }
                        ;
                    })
                }
        })
        })


        //ajax atart
        // obj.ajax("/bg/serviceCategory/findCategorieById", {'caId': row.caId}, function (data) {
        //
        //     // 成功 回显数据
        //     //$('#caId').val(data.caId);
        //    $('#sortName_update').val(data.rows.name);//类别名称
        //    $('#descriName_update').val(data.rows.description);//类别栏目介绍
        //    $('#isUseName_update').val(data.rows.isUse);//使用状态
        //     $('#typeName_update').val(data.rows.type);//分类类型
        //     $('#orderIdName_update').val(data.rows.orderId);//显示顺序
        //     $('#photoUrlName_update').val(data.rows.photoUrl);//分类logo地址
        //     // console.log('huan obj is'+obj);
        //     //向后台添加数据
        //     $('#updateInfoBtn').click(function () {
        //
        //         var sortName = $('#sortName_update').val();//类别名称
        //         var descriName = $('#descriName_update').val();//类别栏目介绍
        //         var isUseName = $('#isUseName_update option:selected').val();//使用状态
        //         var typeName = $('#typeName_update option:selected').val();//分类类型
        //         var orderIdName = $('#orderIdName_update').val();//显示顺序
        //         var photoUrlName = $('#photoUrlName_update').val();//分类logo地址
        //         var caId = data.rows.caId;
        //
        //         // console.log(sortName);
        //         // console.log(descriName);
        //         // console.log(isUseName);
        //        if(!sortName || !orderIdName){
        //            $.messager.alert('',"此为必填项",'info')
        //            $('#user-editor').modal('show');
        //        }else {
        //         obj.ajax('/bg/serviceCategory/edit', {
        //                 'name': sortName,
        //                 "description": descriName,
        //                 "isUse": isUseName,
        //                 "type": typeName,
        //                 "orderId": orderIdName,
        //                 "photoUrl": photoUrlName,
        //                 "caId": caId,
        //             },
        //             function (data) {
        //                 $.messager.alert('',"信息修改成功",'info');
        //                 $('#mytb').datagrid('reload');
        //                 $('#user-editor').modal('hide');
        //             }, function (data) {
        //                 $.messager.alert('',"信息修改失败")
        //             });
        //        }
        //
        //
        //     })
        //
        // });
        //ajax end
    } else {
        $('#user-editor').modal('hide');
        $.messager.alert('Warning', '请选择要修改的对象');
    }
};
/**
 * 编辑上传图片
 */
// function uploadImage(){
//     $('#file').click();
// }
$(document).ready(function() {

    $('#file_update').fileupload({
        url: Qnzs.path+'/file_upload',
        dataType: 'json',
        autoUpload: true,
        done: function(e, data) {

            alert(data.result.url);
        },
        fail: function() {
            alert('系统繁忙，请稍后再试！');
        }
    });

})

var image = '';
function selectImage_update(file) {
    if(!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('photoUrlName_update').src = evt.target.result;
        image = evt.target.result;
    }
    reader.readAsDataURL(file.files[0]);
}
//删除
//function serviceCategoryDelete(){

$('#seCategoryDelete').click(function () {

    var row = $('#mytb').datagrid('getSelected');
 // console.log('row is',row);
    if (row) {

//      admin_del();
//         layer.confirm('您确定要删除该用户吗！', {
//                 btn: ['确定', '取消'] //按钮
//             },
            //layer.msg('的确很重要', {time: 200 ,icon: 1}),
            //     function(){
            //     layer.msg('的确很重要', {time: 200 ,icon: 1});
            //
            //     obj.ajax('//192.168.100.49:8080/qnzs/bg/role/updateRole',{'oid':row.id},function(data){   //执行删除操作
            //         // console.log('删除成功！');
            //
            //     },function(){});
            //
            // }, function(){
            //     layer.msg('也可以这样', {
            //         time: 200, //20s后自动关闭
            //         btn: ['明白了', '知道了']
            //     });
            // }
            FindConsultApi.serviceCategoryDelete({idsStr: row.caId}).then(function (data) {//获取启动目标的
               // $('#userStartBtn').click(function () { //确定启动发送到后台

                    if (data.status == 'OK') {
                        $.messager.alert('', '删除成功！');
                        $('#mytb').datagrid('reload');
                    } else {
                        $.messager.alert('', "删除失败")
                    }

               // })
            })
        //);

    } else {
        $.alert('请选择目标');
    }
})

/**
 * 启用(显示)
 */
function userStart() {
//  alert("openDisabled");
    var row = $('#mytb').datagrid('getSelected');
    if (row == null) {
        $.messager.alert('Warning', '请选择需要操作的内容');
    } else {
        var isUse = row.isUse;
        if (isUse) {  //不显示-禁用状态
           // $.messager.alert('Warning', '此服务类别已经处于正常启用显示状态！');
        } else if (!isUse) {  //显示-启用状态
          //  $.messager.confirm('提示', "确定要启用此服务类别吗？", function () {
                if (row) {
                    $('#user-start').modal('show');
                    // obj.ajax('/bg/serviceCategory/enable', {'caId': row.caId}, function (data) {  //获取启动目标的
                    //     $('#userStartBtn').click(function () {     //确定启动发送到后台
                    //         // obj.ajax('/bg/serviceCategory/enable', {}, function () {
                    //         //     // console.log('启用成功！');
                    //         // }, function () {
                    //         //     // console.log('启用失败！');
                    //         // });
                    //         $.messager.alert('', '启用成功！');
                    //         $('#user-start').modal('hide');
                    //         $('#mytb').datagrid('reload');
                    //     })
                    // }, function () {
                    //         $.messager.alert('', '启用失败！', 'info');
                    // }
                    // );

                    FindConsultApi.serviceCategoryEnable({caId: row.caId}).then(function (data) {//获取启动目标的
                        $('#userStartBtn').click(function () { //确定启动发送到后台

                            if (data.status == 'OK') {
                                $.messager.alert('', '启用成功！');
                                $('#user-start').modal('hide');
                                $('#mytb').datagrid('reload');
                            } else {
                                $.messager.alert('', "启用失败")
                            }
                        })
                    })
//                  alert("isUse == " + isUse);
                    //$('#mytb').(row.caId, 0);+
                }
           // });
        }
    }
}
/**
 * 禁用（不显示）
 */
function userStopt() {
//  alert("openDisabled");
    var row = $('#mytb').datagrid('getSelected');
    if (row == null) {
        $.messager.alert('温馨提示', '请选择需要操作的内容');
    } else {
        var isUse = row.isUse;
        if (!isUse) {  //不显示-禁用 状态
            $.messager.alert('温馨提示', '此服务类别已经处于禁用状态！');
        } else if (isUse) {  //显示-启用 状态
            //$.messager.confirm('提示', "确定要禁用此服务类别吗？", function () {
                if (row) {
                    $('#user-stop').modal('show');
                    // obj.ajax('/bg/serviceCategory/disable', {'caId': row.caId}, function (data) {  //获取启动目标的
                    //     $('#userStoptBtn').click(function () {     //确定启动发送到后台
                    //         $.messager.alert('', '禁用成功！');
                    //         $('#user-stop').modal('hide');
                    //         $('#mytb').datagrid('reload');
                    //     }
                    //     )
                    // },function () {
                    //         $.messager.alert('', '禁用失败！', 'info');
                    //     }
                    // );
                    FindConsultApi.serviceCategoryDisable({caId: row.caId}).then(function (data) {//获取禁用目标
                        $('#userStoptBtn').click(function () { //确定禁用发送到后台

                            if (data.status == 'OK') {
                                $.messager.alert('', '禁用成功！');
                                $('#user-stop').modal('hide');
                                $('#mytb').datagrid('reload');
                            } else {
                                $.messager.alert('', "禁用失败")
                            }
                        })
                    })
//                  alert("isUse == " + isUse);
                    //$('#mytb').(row.caId, 0);
                }
            //});
        }
    }
}
/**
 * 上传图片
 */
// function uploadImage(){
//     $('#file').click();
// }
// $(document).ready(function() {
//
//     $('#file').fileupload({
//         url: base+'/file_upload',
//         dataType: 'json',
//         autoUpload: true,
//         done: function(e, data) {
//
//             alert(data.result.url);
//         },
//         fail: function() {
//             alert('出错');
//         }
//     });
//
// })
// var image = '';
//
// function selectImage(file) {
//     if(!file.files || !file.files[0]) {
//         return;
//     }
//     var reader = new FileReader();
//     reader.onload = function(evt) {
//         document.getElementById('imghead').src = evt.target.result;
//         image = evt.target.result;
//     }
//     reader.readAsDataURL(file.files[0]);
// }





// function uploadImage(){
//     $('#file').click();
// }
//
// $(function(){
//     $('#file').change(function(){
//         $.ajaxFileUpload({
//             url: base+'/file_upload', //用于文件上传的服务器端请求地址
//             secureuri: false, //是否需要安全协议，一般设置为false
//             fileElementId: 'file', //文件上传域的ID
//             dataType: 'JSON', //返回值类型 一般设置为json
//             success: function (data, status){
//                 data = JSON.parse(data);
//                 if(data.error == 0){
//                     $('#photoUrl').val(data.url);
//                     $('#imagePath').attr('src',data.url).show();
//                 }
//             },
//             error: function (data, status, e)//服务器响应失败处理函数
//             {
//                 alert(e);
//             }
//         });
//     });
// });