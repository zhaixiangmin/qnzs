var limits = Utils.getQueryString('limit'); // 权限

$('#toolbar li').hide(); // 隐藏所有按钮

if (limits) {
    limits = limits.split(','); // 将字符串解析成数组
    for (var i = 0; i < limits.length; i++) {
        var limit = limits[i];
        $('#' + limit).show(); // 显示权限按钮
    }
}

if($('#question_top').is(':visible') ){
	
	$('.show_hide_1').show()
}else{
	$('.show_hide_1').hide()
	
}
if($('#cancel_top').is(':visible') ){
	
	$('.show_hide_2').show()
}else{
	
	$('.show_hide_2').hide()
}



    /*表格初始化*/
    //console.log(base+'base');
    $('#mytb').datagrid({ title: '问题管理',  //表格名称           iconCls: 'icon-edit',  //图标
           width:$(this).width() * 0.97,   //表格宽度
           height:$(this).outerHeight(),   //表格高度，可指定高度，可自动
           border:true,  //表格是否显示边框
           url:FindConsultApi.serviceQuestionListUrl,   //获取表格数据时请求的地址
           columns:[[
               {field: 'quId', title: '编号', width: 150},
               {field: 'title', title: '问题标题', width: 150,
                   formatter: function(value,row,index){
                       if (value == null || value == undefined) {
                           return '';
                       }/*
                        if (value.length > 20) {
                        var content = value.substring(0, 20) + "...";
                        return content;
                        }*/
                       if(row.isCelebrity == 1){
//		            			var content = value.length < 20 ? value : value.substring(0, 20) + "...";
                           return "<b>[名人问吧]</b>" + value;
                       }
                       return value;
                   }
               },
               {field: 'categoryName', title: '服务类别', width: 150,
                   // formatter: function(value,row,index){
                   //     return value.name;
                   // }
               },
               {field: 'askContent', title: '提问内容', width: 250,
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
               {field: 'askTime', title: '提问时间', width: 150,
                   // formatter: function(value,row,index){
                   //     if (value){
                   //         return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                   //     }else{
                   //         return '';
                   //     }
                   // }
               },
               {field: 'realname', title: '提问者', width: 150
               },
               {field: 'level', title: '问题等级', width: 150,
                   formatter: function(value, row, index){
                       if (value == 1) {
                           return '低';
                       } else if (value == 2) {
                           return '中';
                       } else if (value == 3) {
                           return '高';
                       }
                   }
               },
               {field: 'isPublic', title: '是否公开', width: 150,
                   formatter: function(value, row, index){
                       return value ? '公开' : '匿名';
                   }
               },
               {field: 'status', title: '审核状态', width: 150,
                   formatter: function(value, row, index){
                       if (value == 0) {
                           return '待审核';
                       } else if (value == 1) {
                           return '<font color="green">已通过</font>';
                       } else if (value == 2) {
                           return '<font color="red">不通过</font>';
                       } else if (value == 3) {
                           return '已回复';
                       } else if (value == 4) {
                           return '已完成';
                       } else if (value == 5) {
                           return '<font color="purple">转线下服务</font>';
                       } else if (value == 6) {
                           return '线下服务已审核';
                       } else if (value == 7) {
                           return '线下服务已完成';
                       } else if (value == 8) {
                           return '线下服务已撤销';
                       }
                   }
               },
               {field: 'isDisabled', title: '是否禁用', width: 150,
                   formatter: function(value, row, index){
                       return !value ? '<font color="green">正常</font>' : '<font color="red">禁用</font>';
                   }
               },
               {field: 'isEssence', title: '是否是精华帖', width: 150,
                   formatter: function(value, row, index){
                       return value ? '<font color="green">精华帖</font>' : '否';
                   }
               },
               {field: 'commentsNum', title: '评论数', width: 150},
               {field: 'likesNum', title: '点赞数', width: 150},
               {field: 'visitsNum', title: '浏览数', width: 150},
               {field: 'orgName', title: '提问平台', width: 150,ortable:true,
                   formatter: function(value,row,index){
                       if (value == null || value == undefined) {
                           return '';
                       }/*
                        if (value.length > 20) {
                        var content = value.substring(0, 20) + "...";
                        return content;
                        }*/
//                        if(row.isCelebrity == 1){
// //		            			var content = value.length < 20 ? value : value.substring(0, 20) + "...";
//                            return "<b>[名人问吧]</b>" + value;
//                        }
                       return value;
                   }
               }

          ]],
           pagination:true,//如果表格需要支持分页，必须设置该选项为true
           pageNumber: 1, // 初始化页码
           pageSize: 20,   //表格中每页显示的行数
           pageList: [20, 50, 100, 200], // 初始化页面尺寸的选择列表
        //total:0,
          // pageList:[5,10,15],
           rownumbers:true,   //是否显示行号
           nowrap: false,   
           striped: true,  //奇偶行是否使用不同的颜色
           method:'get',   //表格数据获取方式,请求地址是上面定义的url
           sortName: 'create_time',  //按照ID列的值排序
           sortOrder: 'desc',  //使用倒序排序
           idField: 'quId',
           loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
           singleSelect:true,
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
    var keyword = $('#keyword').val();//关键字
    var isPublic = $('#isPublic').val();//是否公开
    var isEssence = $('#isEssence').val();//是否精华
    var status = $('#status').val();//审核状态
    var categoryId = $('#categoryId').combobox('getValue');//所属类别
    var beginTime = $('#start_time').datetimebox('getValue'); // 开始时间
    var endTime = $('#end_time').datetimebox('getValue'); // 开始时间
    //beginTime = new Date(beginTime);
    //endTime = new Date(endTime);
//  console.log('是否精华贴', isEssence);
//  console.log('关键字', keyword);
    
    var areaAndclass ;
    var cityAndshcool ;
	var oArea =  $('#oidType').val();     //获取地区或高校
	var areaAndclass1 = $('#areaOid').val() ;
	var areaAndclass2 = $('#classOid').val();
	var cityAndshcool1 = $('#cityOid').val() ;  //地址
	var cityAndshcool2 = $('#shcoolOid').val();  //高校
	
   
    if(cityAndshcool1!='-1'){
	 	areaAndclass =cityAndshcool1 ;
	}
	if(cityAndshcool2 !='-1'){
	 	areaAndclass =cityAndshcool2 ;
	} 
	if(areaAndclass1!='-1'){
	 	areaAndclass =areaAndclass1 ;
	}
	if(areaAndclass2 !='-1'){
	 	areaAndclass =areaAndclass2 ;
	}
      console.log(areaAndclass)
					          

    if(areaAndclass ==null){
    	
    	areaAndclass =$('#oidType').val();
    	
    }

    
    $('#mytb').datagrid('load',{
        keyword: keyword, // 站点全称的关键字
        categoryId:categoryId,
        isPublic: isPublic, // 是否公开
        isEssence:isEssence,
        status: status, // 审核状态
        beginTimeAsk: beginTime, // 开始时间
        endTimeAsk: endTime, // 结束时间
        searchDid:areaAndclass
        //disabled: disabled // 显示状态

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
 新增
 */
//根据类别查询专家
$(function () {
    //专家显示个数

    $('#categoryId_add').combobox({
        valueField: 'caId',
        textField: 'name',
        // editable: false,
        // required: true,
        loader: function (param, success, error) {
            FindConsultApi.findByAdvice({}).then(function (data) {
                console.log('服务类别data', data);
                if (!data.rows || data.rows.length <= 0) {
                    $.alert('专家-所属类别返回列表为空');
                    error();
                    return;
                }
                success(data.rows);
            })
        },

        onChange: function (record) {
            //alert("onChange");
            var categoryId = $("#categoryId_add").combobox("getValue");
            var showMaxExpert = 30;
            //alert("categoryId == " + categoryId);
            // 动态加载该类别下的所有专家
            $('#accExpertIdsStr_add').combobox({
                valueField: 'username',
                textField: 'realname',
                editable: false,
                required: false,
                multiple: true,
                panelHeight: '300',
                //url: Qnzs.path + '/bg/accountExpert/findExpertsByCategory?categoryId=' + categoryId + '&maxExpert=' + showMaxExpert
                loader: function (param, success, error) {
                    FindConsultApi.findExpertsByCategory({caId:categoryId,maxExpert:showMaxExpert}).then(function (data) {
                        console.log('专家data', data);
                        if (!data.rows || data.rows.length <= 0) {
                            $.alert('专家-所属类别返回列表为空');
                            error();
                            return;
                        }
                        success(data.rows);
                    })
                }
            });
        }
    });
});

// 新增 -- 查询所有问题标签
$('#quesLabelIdsStr').combobox({
    valueField: 'id',
    textField: 'caption',
    multiple:true,
    //url:FindConsultApi.findDictionaryUrl
    //url: Qnzs.path+'/bg/dictionary/findDictionary',
    // editable: false, // 不可编辑，只可选
    loader: function (param,success, error) {
        FindConsultApi.findDictionary({}).then(function (data) {
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
//新增-等级
$('#level').combobox({
    valueField: 'typeID',
    textField: 'typeName',
    loader: function (param,success, error) {
        var data = [
            {
                typeID: 1,
                typeName: '低'
            },
            {
                typeID: 2,
                typeName: '中'
            },
            {
                typeID: 3,
                typeName: '高'
            }
        ];
        success(data);
    },
})
//新增-是否公开
$('#isPublic_add').combobox({
    valueField: 'isPublicID',
    textField: 'isPublicName',
    loader: function (param,success, error) {
        var data = [
            {
                isPublicID: 0,
                isPublicName: '匿名'
            },
            {
                isPublicID: 1,
                isPublicName: '公开'
            }
        ];
        success(data);
    },
})
//新增-是否公开
//新增数据提交
function serviceQuestion_add() {

    $('#serviceQuestion_add').window('open');
    //var level = $('#level').combobox("getValue");//问题分级
    //console.log('level', level);
    $('#addInfo').click(function () {
        var title = $('#title').val();//标题
        var categoryId = $('#categoryId_add').combobox("getValue");//所属类别
        var accExpertIdsStr = $('#accExpertIdsStr_add').combobox("getValues");//专家ID
        var quesLabelIdsStr = $('#quesLabelIdsStr').combobox("getValues");//问题标签ID
        var askContent = $('#askContent').val();//内容
        var level = $('#level').combobox("getValue");//问题分级
        var isPublic_add = $('#isPublic_add').combobox("getValue");//是否公开
        console.log('标题', title);
        console.log('专家ID', accExpertIdsStr);
        console.log('问题标签ID', quesLabelIdsStr);

        var validateFlag = $('#fm_stationsadd').form('validate'); // 验证表单，填写信息是否完整
        //console.log('validateFlag', validateFlag);
        if (!validateFlag) { // 表单填写未完成
            return;
        }
        FindConsultApi.serviceQuestionAdd({
            title: title,
            categoryId: categoryId,//类别
            askContent: askContent,//问题内容
            accExpertIdsStr: accExpertIdsStr,//专家
            quesLabelIdsStr: quesLabelIdsStr, // 问题标签
            level: level, // 问题等级
            isPublic: isPublic_add // 是否公开
        }).then(function (data) {
            //console.log('添加结果data', data);
                        $('#mytb').datagrid('reload');
                        $('#serviceQuestion_add').window('close');
                        $('#serviceQuestion_add').form('clear');
            // if (!data.rows || data.rows.length <= 0) {
            //     $.alert('所属类别返回列表为空');
            //     error();
            //     return;
            // }
            //success(data.rows);
        })
        // }
        //}
    });
};
//新增END
//关闭新增框
$('#cancel').click(function () {
    $('#serviceQuestion_add').window('close');
   // $('#serviceQuestion_add').hide();
})


//编辑
function serviceQuestion_edit() {
   //$('#updater_edit').onclick(function ()
   //{
    var row = $('#mytb').datagrid('getSelected');

    console.log('编辑 selectedData', row);
        if(row) {
            //var title = $('#title_edit').val();//标题
           // console.log('title is',title);
            $('#serviceQuestion_edit').window('open');
            $('#fm_stationsadd_edit').form('load', row);
            $('#accExpertIdsStr_edit').combobox('setValues', '');// 先清空专家
            $('#organization_edit').combobox('setValues', '');// 先清空组织
            $('#quesLabelIdsStr_edit').combobox('setValues', '');// 先清空标签
            /* 动态加载所有服务类别 */
            $('#categoryId_edit').combobox({
                valueField: 'caId',
                textField: 'name',
                editable: false,
                required: true,
                loader: function (param, success, error) {
                    FindConsultApi.findByAdvice({}).then(function (data) {
                        //console.log('服务类别data', data);
                        if (!data.rows || data.rows.length <= 0) {
                            $.alert('专家-所属类别返回列表为空');
                            error();
                            return;
                        }
                        success(data.rows);
                    })
                },
                onLoadSuccess: function (){
// alert("id == " + row.categoryId + ";name == " +
// row.name);
                    //console.log('加载成功','row.serviceCategory.caId')
                   $("#categoryId_edit").combobox('select', row.categoryId);
                    //$("#categoryId_edit").val(data.rows.caId);
                },
                onChange:function(){
// alert("onChange");
                    var showMaxExpert = 30;
                    var categoryId = $("#categoryId_edit").combobox("getValue");
// alert("categoryId == " + categoryId);

                    // 动态加载每个类别下的专家
                    $('#accExpertIdsStr_edit').combobox({
                        valueField: 'username',
                        textField: 'realname',
                        editable: false,
                        required: false,
                        multiple: true,// 多选
					    panelHeight: 300,// 自适应
                        loader: function (param, success, error) {
                            FindConsultApi.findExpertsByCategory({caId:categoryId,maxExpert:showMaxExpert}).then(function (data) {
                               // console.log('专家data', data);
                                if (!data.rows || data.rows.length <= 0) {
                                    $.alert('专家-所属类别返回列表为空');
                                    error();
                                    return;
                                }
                                success(data.rows);
                            })
                        },
                        onLoadSuccess: function (){
                            console.log('提问专家',row.quId)
                            // 动态加载改问题的所有提问专家
                            $.ajax ({
                                type:"GET",
                                url:FindConsultApi.findAllExpertByQuestionUrl,
                                data: {'quId': row.quId,'accType':3},
                                dataType: "json",
                                success: function (data){
                                    if (data.success == 1) {

                                        $("#accExpertIdsStr_edit").combobox('setValues', data.accExpertIdsStr.split(','));
                                        $("input[name='accExperts']").remove();
                                    }
                                },
                            });
                        },

                    });
                },
            });

            /* 动态加载所有问题标签 */
            $('#quesLabelIdsStr_edit').combobox({
                valueField: 'id',
                textField: 'caption',
                editable: false,
                required: true,
                multiple: true,// 多选
                //url: FindConsultApi.findDictionaryUrl,
                loader: function (param, success, error) {
                    FindConsultApi.findDictionary({}).then(function (data) {
                        //console.log('服务类别data', data);
                        if (!data.rows || data.rows.length <= 0) {
                            $.alert('所有问题标签为空');
                            error();
                            return;
                        }
                        success(data.rows);
                    })
                },
                onLoadSuccess: function (){
                    
                    obj.ajax('/bg/serviceQuestion/findServiceQuestionbyId',{'quId':row.quId},function(data){
			              console.log(data);
			            
			           	if(data.labels!=null){
			           		
			           		var s =[];
			           		for(var i =0 ;i<data.labels.length;i++){
			           			s.push(data.labels[i].dictionaryId);
			           			
			           		}
			           		s2 =s.toString();
			           		
			           	}
			           
			           	$("#quesLabelIdsStr_edit").combobox('setValues',s2.split(','));
			        })


                },
            });

            // 动态加载本级所有组织
            $('#organization_edit').combobox({
                valueField: 'username',
                textField: 'realname',
                editable: false,
                required: false,
                multiple: true,// 多选
                //url:FindConsultApi.getAllCurrOrgByAccUrl,
                loader: function (param, success, error) {
                    FindConsultApi.getAllCurrOrgByAcc({}).then(function (data) {
                        console.log('本级组织ID', 'username');
                        if (!data.rows || data.rows.length <= 0) {
                            $.alert('本级所有组织为空');
                            error();
                            return;
                        }
                        success(data.rows);
                    })
                },
                onLoadSuccess: function (){
                    // 动态加载该问题的所有提问组织
                    $.ajax ({
                        type:"GET",
                        //url: FindConsultApi.findAllOrgByQuestionUrl,
                        loader: function (param, success, error) {
                            FindConsultApi.findAllOrgByQuestion({}).then(function (data) {
                                console.log('本级组织ID', 'username');
                                if (!data.rows || data.rows.length <= 0) {
                                    $.alert('本级所有组织为空');
                                    error();
                                    return;
                                }
                                success(data.rows);
                            })
                        },
                        data: {'questionId': row.quId,'accType':4,'orgType':1},
                        dataType: "json",
                        success: function (data){
                            if (data.success == 1) {
                                $("#organization_edit").combobox('setValues', data.accExpertIdsStr.split(','));
//								$("input[name='accCurrOrgs']").remove();
                            }
                        },
                    });
                },
            });
//编辑数据提交
            var isValid = $(this).form('validate');
            if (!isValid){// 表单填写未完成
                //$.messager.progress('close');
                return
            }
            
            //编辑数据提交END
            // 动态加载下级所有组织
            // $('#accOrg_edit').combobox({
            //     valueField: 'aid',
            //     textField: 'realname',
            //     editable: false,
            //     required: false,
            //     multiple: true,// 多选
            //     url: ctx + '/questionManage/getAllLowerOrgByAcc',
            //     onLoadSuccess: function (){
            //         // 动态加载改问题的所有提问组织
            //         $.ajax ({
            //             type:"GET",
            //             url: ctx + '/questionManage/findAllExpertByQuestion',
            //             data: {'questionId': row.quId,'accType':4,'orgType':2},
            //             dataType: "json",
            //             success: function (data){
            //                 if (data.success == 1) {
            //                     $("#accOrg_edit").combobox('setValues', data.accExpertIdsStr.split(','));
            //                 }
            //             },
            //         });
            //     },
            // });


        } else {
            $.alert('请选择所编辑的目标');
            $('#serviceQuestion_edit').modal('hide');
        }

    //});
}
//编辑数据提交


 $('#updater_edit').click(function () {
	var row = $('#mytb').datagrid('getSelected');

	console.log(row);
    var title_edit = $('#title_edit').val();//标题
    var categoryId_edit = $('#categoryId_edit').combobox("getValue");//所属类别
//              var accExpertIdsStr_edit = $('#accExpertIdsStr_edit').combobox("getValue");//专家ID   注意，此字段为启用
//              var organization_edit = $('#organization_edit').combobox("getValue");//组织   注意，此字段为启用
    var quesLabelIdsStr_edit = $('#quesLabelIdsStr_edit').combobox("getValues").toString();//问题
    var askContent_edit = $('#askContent_edit').val();//内容
    var level_edit = $('#level_edit').combobox("getValue");//等级
    var isPublic_edit = $('#isPublic_edit').combobox("getValue");//公开
            
            
    console.log(quesLabelIdsStr_edit)
    console.log(categoryId_edit)
    FindConsultApi.serviceQuestionEdit({
        title: title_edit,
        categoryId: categoryId_edit,//类别
//                  accExpertIdsStr: accExpertIdsStr_edit,//专家
//                  accOrgIdsStr: organization_edit,//组织
        quesLabelIdsStr: quesLabelIdsStr_edit, // 问题标签
        askContent: askContent_edit,//问题内容
        level: level_edit, // 问题等级
        isPublic: isPublic_edit, // 是否公开
        quId:row.quId
    }).then(function (data) {
    	
    	console.log(data)
    	if(data.status=='OK'){
	        $.alert('操作成功！');
	    	
	    	$('#mytb').datagrid('reload');
	    	$('#serviceQuestion_edit').window('close');
	    	$('#serviceQuestion_edit').form('clear');
        }else{
            
        };

    })
})

//$('#updater_edit').click(function()
// function editQuestion(){
//     $.messager.progress();
// // $('#ff_questionedit').form({
//     console.log('本级组织ID', 'click');
//     $('#fm_stationsadd_edit').form('submit', {
//         //url:FindConsultApi.serviceQuestionEditUrl,
//         loader: function (param, success, error) {
//             FindConsultApi.serviceQuestionEdit({}).then(function (data) {
//
//                 if (!data.rows || data.rows.length <= 0) {
//                     $.alert('编辑数据为空');
//                     error();
//                     return;
//                 }
//                 success(data.rows);
//             })
//         },
//         onSubmit: function(){
//             // 验证编辑提交表单
//             var isValid = $(this).form('validate');
//             if (!isValid){// 表单填写未完成
//                 //$.messager.progress('close');
//                 return
//             }
//             return isValid;
//         },
//         success: function(data){
//             //$.messager.progress('close');
//             //var data = eval('(' + data + ')');
//             if(data.success == 1){  // 操作成功
//                 $('#serviceQuestion_edit').window('close');
//                 $('#mytb').datagrid('reload');
//                // $.alert('编辑成功')
//                 // $.messager.show({
//                 //     title : '提示',
//                 //     msg : data.msg,
//                 // });
//            }else{
//                $.messager.alert('Warning', '修改问题失败!');
//            }
//         }
//     });
//
// }
//);
//编辑数据提交END
//关闭编辑框
$('#cancel_edit').click(function () {
    $('#serviceQuestion_edit').window('close');
})
/*
 问题管理删除接口
 */
function serviceQuestionDele() {
    var row = $('#mytb').datagrid('getSelected');

    if(row != null){
        if(row.isDisabled != 0){

                    var data={'idsStr':row.quId};
                    FindConsultApi.serviceQuestionDele(data).then(function(data){
                        //alert(555)
                        if(data.status=='OK'){
                            $.alert(data.msg);
                            $('#mytb').datagrid('reload');
                        }else{
                            $.alert('删除失败')
                        };

                    }) ;
        }else{
            $.messager.alert('Warning', '正常显示的问题不能删除.');
        }
    }else{
        $.messager.alert('Warning', '请选择需要操作的记录.');
    }
}
/**
  审核
 */
function auditQuestionByIds(){
    var selRows = $('#mytb').datagrid('getSelections');// 返回选中多行数据
    console.log("selRows == " + selRows);
    if (selRows.length <= 0) {
        $.messager.alert('Warning', '请至少选择一行数据进行操作');
        return;
    } else {
        var quId = '';
        $.each(selRows, function(index, row){
            if(row.isDisabled == 0 && row.status == 0){
                quId += row.quId + ',';
            }
        });
        quId = quId.substring(0, quId.length - 1);
        $.messager.confirm('确认对话框', '这些问题确认要审核通过吗', function(r){
            if (selRows){
                $.getJSON(Qnzs.path + '/bg/serviceQuestion/examine', {'quId': quId,}, function(data){

                    $.messager.alert('Warning', '设置成功');
                    $('#mytb').datagrid('reload');
                    $('#dg_question').datagrid('clearSelections');
                    $('#dg_question').datagrid('clearChecked');
                },function () {
                    $.messager.alert('Warning', '设置失败');
                    }
                );
            }
        });
    }
}
/**
 * 启用(显示)
 */
function userStart() {
//  alert("openDisabled");
    var row = $('#mytb').datagrid('getSelected');
    if (row == null) {
        $.messager.alert('Warning', '请选择需要操作的内容');
    } else {
        var isDisabled = row.isDisabled;

        if (isDisabled == 0) {  //不显示-禁用 状态
             $.messager.alert('Warning', '此服务类别已经处于正常启用显示状态！')
        } else if (isDisabled == 1) {  //显示-启用 状态
            //$.messager.confirm('提示', "确定要启用此服务类别吗？", function () {
            if (row) {

                // $.confirm('是否启用',function (data) {
                //
                //     FindConsultApi.serviceQuestionStart({'quId': row.quId}).then(function(data){
                //         if(data.status=='OK'){
                //             alert(data.msg);
                //             $('#mytb').datagrid('reload');
                //             //$('#user-start').modal('hide');
                //         }
                //     },function () {
                //         $.alert('启动失败')
                //     });
                // });
                $('#user-start').modal('show');
                //获取启动目标的
                $('#userStartBtn').click(function() { //确定启动发送到后台

                    FindConsultApi.serviceQuestionStart({'quId': row.quId}).then(function(data){
                        if(data.status=='OK'){
                            $.messager.alert('', '启用成功！');
                            $('#mytb').datagrid('reload');
                            $('#user-start').modal('hide');
                        }else{
                            $.alert('启动失败')
                        };
                    });
                });

            }
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
        $.alert('请选择需要操作的内容');
        return;
    } else {
        var isDisabled = row.isDisabled;
        console.log(isDisabled);
        if (isDisabled == 1) {  //不显示-禁用 状态
            $.messager.alert('Warning', '此服务类别已经处于禁用不显示状态！');
        } else if (isDisabled == 0) {  //显示-启用 状态
            //$.messager.confirm('提示', "确定要禁用此服务类别吗？", function () {
            if (row) {
                // $('#user-end').modal('show');
                // FindConsultApi.serviceQuestionStop( {'quId': row.quId}, function (data) {  //获取启动目标的
                //         $('#userStoptBtn').click(function () {     //确定启动发送到后台
                //             console.log(isDisabled);
                //             console.log(row.quId);
                //                 $.messager.alert('', '禁用成功！');
                //                 $('#user-end').modal('hide');
                //                 $('#mytb').datagrid('reload');
                //             }
                //         )
                //     },function () {
                //         $.messager.alert('', '禁用失败！', 'info');
                //     }
                // );
                $('#user-end').modal('show');
                //获取启动目标的
                $('#userStoptBtn').click(function() { //确定启动发送到后台

                    FindConsultApi.serviceQuestionStop({'quId': row.quId}).then(function(data){
                        if(data.status=='OK'){
                            $.messager.alert('', '禁用成功！');
                            $('#mytb').datagrid('reload');
                            $('#user-end').modal('hide');
                        }else{
                            $.alert('禁用失败')
                        };
                    });
                });
            }
        }
    }
}
/**
 * 设置精华帖
 */
function setEssenceQuestion()
{
    var row = $('#mytb').datagrid('getSelected');//返回选择一条
    if (row == null) {
        $.messager.alert('Warning', '请选择需要操作的内容');
    } else {

        var isEssenceRow = row.isEssence;
        console.log("isEssence == " + isEssence + "; isEssenceRow == " + isEssenceRow);
        if(isEssenceRow == 1) {
            $.messager.alert('Warning', '此服务问题已进行过此操作！');
        } else {
            //$.messager.progress();

            $.getJSON(Qnzs.path + '/bg/serviceQuestion/setEssence', {'quId' : row.quId}, function(data) {
                //$.messager.progress('close');
               // if (data.success == 1) {  // 操作成功
                    $.messager.alert('title', '设置成功.');
                    $('#mytb').datagrid('reload');
                    // $.messager.show({
                    //     title : '提示',
                    //     msg : data.msg
                    // });
               // }
            },function () {
                $.messager.alert('Warning', '操作失败.');
            });
        }
    }
}
/**
 * 移除精华帖
 */
function essenceQuestionRemove(isEssence)
{
    var row = $('#mytb').datagrid('getSelected');
    if (row == null) {
        $.messager.alert('Warning', '请选择需要操作的内容');
    } else {

        var isEssenceRow = row.isEssence;
        console.log("isEssence == " + isEssence + "; isEssenceRow == " + isEssenceRow);
        if(isEssenceRow == 0) {
            $.messager.alert('Warning', '此服务问题已进行过此操作！');
        } else {
           // $.messager.progress();

            $.getJSON(Qnzs.path + '/bg/serviceQuestion/removeEssence', {'quId' : row.quId}, function(data) {
                //$.messager.progress('close');
                //if (data.success == 0) {  // 操作成功
                    $('#mytb').datagrid('reload');
                    $.messager.alert('title', '设置成功.');
                    // $.messager.show({
                    //     title : '提示',
                    //     msg : data.msg
                    // });
                //}
            },function () {
                $.messager.alert('Warning', '操作失败.');
            });
        }
    }
}

//打开帖子
function openQuestion(obj){
    var selRows = $('#mytb').datagrid('getSelections');// 返回选中多行数据
    if (selRows.length <= 0) {
        $.messager.alert('Warning', '请选择一行数据进行操作');
        return;
    } else if (selRows.length > 1) {
        $.messager.alert('Warning', '请最多选择一行数据进行操作');
        return;
    } else {
//		window.open(ctx + '/questionManage/detail?quId='+row.quId+'&sitenavOrgId=',"_blank");
        window.open(Qnzs.domain + 'pc/view/find_consult/find_consult_quesdetail.html?quId='+selRows[0].quId+'&username=' + selRows[0].username + '',"_blank");
    }
}



//  测试权限打开
$('.show').show();
//全站置顶-添加
function  add_allsize_top(){
   var row = $('#mytb').datagrid('getSelected');
   if(row){
		console.log(row)
		$.messager.alert("确认", '确定置顶吗 ？',"",function(){ 
			
		    obj.ajax('/bg/serviceQuestion/topQuestion',{'quid': row.quId,'status':1},function(data){
		     	    console.log(data)
		     	
			     	if(data.status =='OK'){
			     		$.messager.alert('title', data.msg);
			     		$('#mytb').datagrid('reload');
			     	}else{
			     		$.messager.alert('title', data.msg);
			     
			     	}
		    })
	     
	    }); 
		
	}else{
		
		alert('请选择一条记录操作！')
	}
	
}
//全站置顶-取消
function cancel_allsize_top(){
  var row = $('#mytb').datagrid('getSelected');
  	console.log(row)

  if(row){
		$.messager.alert("确认", '确定置顶吗 ？',"",function(){ 
			
		    obj.ajax('/bg/serviceQuestion/cancelTopQuestion',{'quid': row.quId,'status':1},function(data){
		     	    console.log(data)
		     	
			     	if(data.status =='OK'){
			     		$.messager.alert('title', data.msg);
			     		$('#mytb').datagrid('reload');
			     	}else{
			     		$.messager.alert('title', data.msg);
			     
			     	}
		    })
	     
	    }); 
		
		
	}else{
		
		alert('请选择一条记录操作！')
	}
	
}

//省级置顶-添加
function add_province_top(){
	var row = $('#mytb').datagrid('getSelected');
		console.log(row)

	if(row){
		
	    $.messager.alert("确认", '确定置顶吗 ？',"",function(){ 
			
		    obj.ajax('/bg/serviceQuestion/topQuestion',{'quid': row.quId,'status':2},function(data){
		     	
		     	console.log(data)
		     	
			     	if(data.status =='OK'){
			     		$.messager.alert('title', data.msg);
			     		$('#mytb').datagrid('reload');
			     	}else{
			     		$.messager.alert('title', data.msg);
			     
			     	}
		    })
		     
	    }); 
		
	}else{
		
		alert('请选择一条记录操作！')
	}
}
//省级置顶-取消
function cancel_province_top(){
	
	var row = $('#mytb').datagrid('getSelected');
		console.log(row)

	if(row){
		
		$.messager.alert("确认", '确定置顶吗 ？',"",function(){ 
			
		    obj.ajax('/bg/serviceQuestion/cancelTopQuestion',{'quid':row.quId ,'status':2},function(data){
		     	    console.log(data)
		     	
			     	if(data.status =='OK'){
			     		$.messager.alert('title', data.msg);
			     		$('#mytb').datagrid('reload');
			     	}else{
			     		$.messager.alert('title', data.msg);
			     
			     	}
		    })
	     
	    }); 
		
	}else{
		
		alert('请选择一条记录操作！')
	}
}
//名人问吧帖子置顶-添加
function add_ask_bar_top(){
	
	var row = $('#mytb').datagrid('getSelected');
		console.log(row)

	if(row){
	    $.messager.alert("确认", '确定置顶吗 ？',"",function(){ 
			
	        obj.ajax('/bg/serviceQuestion/topQuestion',{'quid':row.quId ,'status':3},function(data){
	     	
	     	  console.log(data)
	     	        if(data.status =='OK'){
			     		$.messager.alert('title', data.msg);
			     		$('#mytb').datagrid('reload');
			     	}else{
			     		$.messager.alert('title', data.msg);
			     
			     	}
	        })
	     
	    }); 
		
		
	}else{
		
		alert('请选择一条记录操作！')
	}
}
//名人问吧帖子置顶-取消
function cannel_ask_bar_top() {
	
	var row = $('#mytb').datagrid('getSelected');
		console.log(row)

	if(row){
		  $.messager.alert("确认", '确定置顶吗 ？',"",function(){ 
			
		    obj.ajax('/bg/serviceQuestion/cancelTopQuestion',{'quid': row.quId,'status':3},function(data){
		     	    console.log(data)
		     	   if(data.status =='OK'){
			     		$.messager.alert('title', data.msg);
			     		$('#mytb').datagrid('reload');
			     	}else{
			     		$.messager.alert('title', data.msg);
			     
			     	}
		    })
	     
	    }); 
		
		
	}else{
		
		alert('请选择一条记录操作！')
	}
}
