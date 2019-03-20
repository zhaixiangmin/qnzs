$(function () {
    var hp_id = undefined; // 帮助ID
    var editor = undefined; // 富文本框编辑器

    var limits = Utils.getQueryString('limit'); // 权限
    console.log('limits', limits);

    // 更新网格数据
    function refreshDG() {
        var distrcitType = undefined; // 区域类型(1：城市，2：高校)
        $('#organization_B').parent().hide(); // 隐藏第二下拉框
        $('#organization_C').parent().hide(); // 隐藏第三下拉框
        // 城市或高校(第一级下拉框) -- 所属区域
        $('#organization_A').combobox({
            valueField: 'type',
            textField: 'name',
            // multiple: true, // 多选
            loader: function (param,success, error) {
                var data = [{type: 1, name: '城市'}, {type: 2, name: '高校'}];
                success(data);
            },
            onSelect: function (record) {
                console.log('organization_A record', record);
        
                distrcitType = record.type; // 区域类型(1：城市，2：高校)
                // 获取第二下拉框列表(根据所属区域第一级下拉框选中值：城市或高校)
                FindHelpApi.getDistrictByType({parentDid: 440000, type: record.type, page: 1, rows: 1000}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取城市或高校列表为空');
                        // error();
                        return;
                    }
                    $('#organization_B').combobox('clear');
                    $('#organization_B').combobox('loadData', data.rows); // 加载具体城市或高校（第二下拉框的列表）
                    $('#organization_B').parent().show(); // 隐藏第二下拉框
                });
        
                $('#organization_C').parent().hide(); // 隐藏第三下拉框
            }
        });
        // 具体城市或高校(第二级下拉框) -- 所属区域
        $('#organization_B').combobox({
            valueField: 'did',
            textField: 'districtName',
            // multiple: true, // 多选
            onSelect: function (record) {
                console.log('organization_B record', record);
        
                // 获取第三下拉框列表(根据所属区域第二级下拉框选中值：城市或高校)
                FindHelpApi.getDistrictByType({parentDid: record.did, type: distrcitType, page: 1, rows: 1000}).then(function (data) {
                    $('#organization_C').combobox('clear');
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取区域或学院列表为空');
                        $('#organization_C').parent().hide(); // 隐藏第三下拉框
                        // error();
                        return;
                    }

                    $('#organization_C').combobox('loadData', data.rows); // 加载区域或学院（第三下拉框的列表）
                    $('#organization_C').parent().show(); // 显示第三下拉框
                });

            }
        });
        // 区域或学院（第三级下拉框） -- 所属区域
        $('#organization_C').combobox({
            valueField: 'did',
            textField: 'districtName',
            onSelect: function (record) {
                console.log('organization_C record', record);
            }
        });
        
        // 帮助状态对应名称
        var auditStatusName = {
            '0': '处理中',
            '1': '求助中',
            '2': '已解决',
            '3': '等待处理',
            '4': '删除',
            '5': '退回',
            '6': '组织帮助中'
        };

        var disabledName = {
            '0': '禁用',
            '1': '启用'
        };

        // 初始化数据网格
        $('#help_manage').datagrid({
            title: '帮助管理',  //表格名称           iconCls: 'icon-edit',  //图标
            // width: 1300,   //表格宽度
            // height: 520,   //表格高度，可指定高度，可自动
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'hpId', title: '编号', sortable: false},
                {field: 'title', title :'帮助名称', sortable: false},
                {field: 'helpPeople', title: '求助人', sortable: false},
                {field: 'createTime', title:'申请时间', sortable: false,
                    formatter: function(value, row, index){
                        return new Date(value).format('yyyy-MM-dd hh:mm:ss')
                    }
                },
                {field: 'applicant', title: '是否答谢', sortable: false},
                {field: 'auditStatus', title: '帮助状态', sortable: false,
                    formatter: function(value, row, index){
                        return auditStatusName[value];
                    }
                },
                {field: 'acquirerRealName',title: '受理方', sortable: false},
                {field: 'helpType', title: '求助类型', sortable: false},
                {field: 'idCard', title: '身份证', sortable: false,width:150,
                   
	                    formatter: function(value,row,index){
	                     	
	                     	if(value){
				        	   return  value.substr(0,(value.length-8))+'********';
				        	}else{
				        		
				        		return value ;
				        	}
				        	
				        },sortable:true
	                    	
                   
                },
                {field: 'mobile', title: '电话', sortable: false},
                {field: 'whether', title: '是否筹款', sortable: false},
                {field: 'disabled', title: '是否禁用', sortable: false,
                    formatter: function(value, row, index){
                        return disabledName[value];
                    }
                }
            ]],
            // onBeforeLoad: function () {
            //     $('.datagrid-toolbar td').hide(); // 隐藏所有按钮
            //
            //     if(limits) {
            //         limits = limits.split(','); // 将字符串解析成数组
            //         for(var i=0; i<limits.length; i++) {
            //             var limit = limits[i];
            //             $('#' + limit).parent().show(); // 显示权限按钮
            //         }
            //     }
            // },
            loader: function (param, success, error) {
                console.log('loader param============', param);
                FindHelpApi.findAllHelp({
                    page: param.page,
                    rows: param.rows,
                    title: param.title, // 帮助名称
                    helpPeople: param.helpPeople, // 求助人
                    did: param.did, // 所属组织
                    idCard: param.idCard, // 身份证
                    mobile: param.mobile, // 手机号码
                    auditStatus: param.auditStatus, // 审核状态(可不传，默认为null; 3-等待处理; 0-处理中; 1-求助中; 4-删除 6-组织帮助中; 2-已解决; 5-退回。)
                    sort: param.sort, // 排序项、属性
                    order: param.order // 排序方式
                }).then(function (data) {
                    $('#error_tips').remove(); // 如果有提示文字 '暂无数据'，先清除

                    console.log('FindHelpApi.findAllHelp成功 data', data);
                    success(data);
                    if(data.total == 0) {
                        console.log('暂无数据');
                        $('.datagrid-view').after('<p id="error_tips" style="text-align: center;">暂无数据</p>');
                    }
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
                });
            },
            pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize: 20,   //表格中每页显示的行数
            pageList: [20, 50, 100, 200], // 初始化页面尺寸的选择列表
            rownumbers: true,   //是否显示行号
            nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
            // method:'get',   //表格数据获取方式,请求地址是上面定义的url
             sortName: 'create_time',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
             sortOrder: 'desc',  //使用倒序排序
            // idField: 'ID', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
            singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                {field: 'check', checkbox: true}
            ]],
            toolbar: [{
                id: 'help_accept',
                text: '受理',
                iconCls: 'icon-recheck',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
                    if(selectedData.auditStatus != 3) { // 非 等待处理
                        $.alert('此帮助项目已经处于' + auditStatusName[selectedData.auditStatus] + '状态！不能进行受理！');
                        return;
                    }
                    
                    hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                    window.location.href = 'shou_li.html?hpid='+ hp_id;

//                  // 弹窗位置居中
//                  $("#dialog_accept").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_accept').height())*0.5});
//                  $('#dialog_accept').dialog('open'); // 弹出对话框
                }
            }, '-', {
                id: 'help_back',
                text: '退回',
                iconCls: 'icon-remove',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
                    if(selectedData.auditStatus != 3) { // 非 等待处理
                        $.alert('此帮助项目已经处于' + auditStatusName[selectedData.auditStatus] + '状态！不能进行退回！');
                        return;
                    }
                    var tuihui_fly =true ;
                    
                    $.confirm('确定执行退回操作').then(function () {
                    	
                    	if(tuihui_fly ){
                    		tuihui_fly =false ;
                    		
                    		// 退回接口调用
                    		// FindHelpApi.sendback({idsStr: selectedData.hpId, status:3}).then(function (data) {
                    		// status 状态(0：受理，3：退回，1：筹款筹人，4：直接帮助，2：完成，5：启用，6：禁用)
                    		FindHelpApi.changeBatchStatus({idsStr: selectedData.hpId, status:3}).then(function (data) {
                    			tuihui_fly =true ;
                    		    $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
                    		})
                    		
                    	}
                    	
                    });
                }
            }, '-', {
                id: 'help_collecting',
                text: '筹款筹人',
                iconCls: 'icon-detail',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
                    if(selectedData.auditStatus != 0) { // 非 处理中
                        $.alert('此帮助项目已经处于' + auditStatusName[selectedData.auditStatus] + '状态！不能进行筹人筹款！');
                        return;
                    }

                    hp_id = selectedData.hpId;  // 帮助ID（全局变量）

                    // 弹窗位置居中
                    $("#dialog_findhelp").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_findhelp').height())*0.5});
                    $('#dialog_findhelp').dialog('open'); // 弹出对话框
                }
            }, '-', {
                id: 'help_direct',
                text: '直接帮助',
                iconCls: 'icon-off',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
                    if(selectedData.auditStatus != 0) { // 非 处理中
                        $.alert('此帮助项目已经处于' + auditStatusName[selectedData.auditStatus] + '状态！不能进行直接帮助！');
                        return;
                    }

                    hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                    window.location.href = 'zhijiebangzu.html?hpid='+ hp_id;
                    // 弹窗位置居中
//                  $("#dialog_direct").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_direct').height())*0.5});
//                  $('#dialog_direct').dialog('open'); // 弹出对话框
                    
                    
                    
                }
            }, '-', {
                id: 'help_finish',
                text: '完成',
                iconCls: 'icon-off', //
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
                    if(selectedData.auditStatus != 1 && selectedData.auditStatus != 6) { // 非 求助中/组织帮助中
                        $.alert('此帮助项目已经处于' + auditStatusName[selectedData.auditStatus] + '状态！不能进行完成！');
                        return;
                    }

                    hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                     window.location.href = 'complate.html?hpid='+ hp_id;
                    // 弹窗位置居中
//                  $("#dialog_finish").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_finish').height())*0.5});
//                  $('#dialog_finish').dialog('open'); // 弹出对话框
//              
//              
                }
            }, 
            '-', {
                id: 'help_latest',
                text: '录入最新进展',
                iconCls: 'icon-edit', //
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
                    if(selectedData.interfaceHpId == null || selectedData.auditStatus != 6) { // 非工单求助 / 状态非‘已解决’
                        $.alert('该类型帮助不可添加最新进展！');
                        return;
                    }
                    
                    if(selectedData.disabled == 0) { // //追加处理过程条数超过20条 已禁用求助
                        $.alert('此帮助项目已经处于' + disabledName[selectedData.disabled] + '状态！不能再追加进展！');
                        return;
                    }
                    
                    hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                     window.location.href = 'latest.html?hpid='+ hp_id;
                    // 弹窗位置居中
//                  $("#dialog_finish").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_finish').height())*0.5});
//                  $('#dialog_finish').dialog('open'); // 弹出对话框
//              
//              
                }
            },
            '-', {
                id: 'help_update',
                text: '修改',
                iconCls: 'icon-edit',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    console.log('修改 selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                    
                    $('#fm_edithelp').form('load', {
                        title: selectedData.title, // 帮助名称
                        people: selectedData.helpPeople, // 求助人
                        identity: selectedData.idCard, // 身份证
                        mobile: selectedData.mobile // 电话
                    });

                    // 求助类型 类型名称对应数值
                    var helptypeValue = {
                        '贫困助学': '1',
                        '重症救助': '2',
                        '灾害救助': '3',
                        '志愿服务': '4',
                        '残障帮助': '5',
                        '微心愿': '6',
                        '其他': '7'
                    };

                    // 是否筹款 类型名称对应数值
                    var payValue = {
                        '是': '1',
                        '否': '2'
                    };

                    // 设置组合框（combobox）的值
                    $('#acquirer_edithelp').combobox('setValue', selectedData.acquirer);  // 受理方选中
                    $('#helptype_edithelp').combobox('setValue', helptypeValue[selectedData.helpType]);  // 求助类型选中
                    $('#pay_edithelp').combobox('setValue', payValue[selectedData.whether]);  // 是否筹款选中
                    $('#identity_edithelp').val(selectedData.idCard)    //身份证
                    if(selectedData.whether == '是') { // 筹款
                        $('#amount_edithelp').val(selectedData.totalAmount);
                        $('#amount_edithelp').parents('tr').show();
                    }else {
                        $('#amount_edithelp').parents('tr').hide();
                    }

                    // 初始化照片
                    var html_img = '';
                    var imgUrlArr = selectedData.imgUrl.split(','); // 将图片字符串解析成图片数组
                    for(var i=0;i<imgUrlArr.length; i++) {
                        var imgUrl = imgUrlArr[i];
                        var html = '<a style="display: inline-block; margin-right: 48px; width: 200px; height: 200px; padding: 5px; border: 1px gray dashed; position: relative;vertical-align: top;"><img src="' + imgUrl + '" style="max-width: 200px; max-height: 200px;"><span class="delete_img" style="position: absolute; top: 92px; right: -36px; color: #428bca; cursor: pointer; cursor: pointer;">删除</span></a>';
                        html_img += html;
                    }
                    $('#img_edithelp').html(html_img);

                    // 点击删除按钮
                    $('#fm_edithelp .delete_img').click(function () {
                        console.log('点击删除图片');
                        // console.log('src', $(this).siblings('img').attr('src'));
                        var $img = $(this).siblings(); // 获取相对应的图片jq对象
                        var index = $('#img_edithelp a').index($(this).parent()); // 当前照片的索引（0开始）
                        console.log('index', index);
                        // index += 1;
                        console.log('src', $img.attr("src"));


                        $.alert('确定删除第' + (index+1) + '张图片').then(function () {
                            console.log('after src', $img.attr("src"));

                            $('#img_edithelp a').eq(index).remove(); // 删除图片
                        });
                    });

                    // 富文本框内容插入
//                  editor.txt.html(selectedData.helpContent);
                   $('.summernote1').summernote('code' ,selectedData.helpContent)   //新的富文本框-带图片

                    // 弹窗位置居中
                    // $("#window_edithelp").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#window_stationshow').height())*0.5});
                    $('#window_edithelp').window('open');
                }
            }, '-', {
                id: 'help_view',
                text: '查看详情',
                iconCls: 'icon-detail',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }
                    $.ajax({
                    	type:"post",
                    	url:Qnzs.path+"/bg/help/getHelpById",
                    	data:{id:selectedData.hpId},
                    	async:true,
                    	success:function(data){
                    	    console.log(data);
                    		var s ='';
                    		var rows_helpAudit = data.rows_helpAudit;  // 审核状态：3：等待处理 0:处理中 1:求助中 2:已解决 5:退回 6:组织帮助中 4:删除

                                // // 弹窗位置居中
                                $("#dialog_checkdetail").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_checkdetail').height())*0.5});
                                $('#dialog_checkdetail').dialog('open'); // 弹出查看模态框

                             if (rows_helpAudit.length>0) {

                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 0) {

                                     s = '处理中';
                                 }
                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 1) {

                                     s = '求助中';
                                 }
                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 2) {

                                     s = '已解决';
                                 }
                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 3) {

                                     s = '审核状态';
                                 }
                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 4) {

                                     s = '删除';
                                 }
                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 5) {

                                     s = '退回';
                                 }
                                 if (rows_helpAudit[rows_helpAudit.length - 1].auditType == 6) {

                                     s = '组织帮助中';
                                 }
                             }
                    		
		                    		// 加载数据 -- 查看窗口
		                    $('#fm_stationshow').form('load',{
		                        title: selectedData.title, // 帮助名称
		                        acquirer: selectedData.acquirer, // 受理方
		                        help_people: selectedData.helpPeople, // 求助人
		                        id_card: selectedData.idCard, // 身份证
		                        mobile: selectedData.mobile, // 电话
		                        help_type: selectedData.helpType, // 求助类型
		                        total_amount: selectedData.totalAmount, // 筹款金额
		                        audit_person: selectedData.whether, // 是否筹款
		                        help_content: selectedData.helpContent, // 求助详情
		                        audit_status: auditStatusName[selectedData.auditStatus], // 审核状态
		                        create_time: new Date(selectedData.createTime).format('yyyy-MM-dd hh:mm:ss'), // 申请时间
		                        update_time: s, // ?? 处理进度
		                        recollections: selectedData.recollections // 答谢感言
		                    });
		                    		
                    	}
                    });
                 
                    // // 弹窗位置居中
                    // $("#dialog_checkdetail").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_checkdetail').height())*0.5});
                    // $('#dialog_checkdetail').dialog('open'); // 弹出查看模态框

                }
            }, '-', {
                id: 'help_disabled',
                text: '启动/禁用',
                iconCls: 'icon-off',
                handler: function() {
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    if(selectedData.disabled == 0 && selectedData.applicant == '否') { // 如果目前为禁用 且 是否答谢为'否'
                        $.alert('该记录尚未答谢，不能启用');
                        return;
                    }

                    status = 0; // 0：代表禁用
                    text = '禁用';
                    if(selectedData.disabled == 0) { // 如果目前是禁用状态（0-禁用，1-启用）
                        var text = '启用';
                        var status = 1; // 1：代表启动
                    }
                     var help_disabled_fly = true ;   //启用警用锁
                     
                    
                     	
                     	$.confirm('确定执行' + text + '操作').then(function () {
                     		
                     		if(help_disabled_fly){
                 		       // 启动/禁用接口调用
	                     	    // status 状态(是否被禁用 0：代表禁用 1：代表启动)
	                     	    help_disabled_fly =false ;  //加锁
	                     	   
	                     	    FindHelpApi.helpDisabled({helpId:selectedData.hpId, status:status}).then(function (data) {
	                     	    	
	                     	    	console.log(data)
	                     	    	help_disabled_fly = true ;  //解锁
	                     	        $.alert(data.msg).then(function () {
	                     	            $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
	                     	        });
	                     	    })
                     		}
                     		
                     	  
                     	});
                     	
                    
                   }
               },'-',{
               	id: 'help_modification',
                text: '筹款链接修改',
                iconCls: 'icon-edit',
               	 handler: function() {

               	 	var selectedData = $('#help_manage').datagrid('getSelected');
                     $.ajax({  //获取筹款链接信息
                         type:"post",
                         url:Qnzs.path+"/bg/help/getHelpById",
                         dataType:'text',
                         data:{id:selectedData.hpId},
                         success:function(data){
                             console.log(data);
                           $('#res_url').html(data.rows.releaseUrl );      //筹款链接
                         }
                     });

                    // console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }


               	 	 hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                         
                    // 弹窗位置居中
                    $("#dialog_href").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_finish').height())*0.5});
                    $('#dialog_href').dialog('open'); // 弹出对话框
               	 }
               	
            },'-',{
               	id: 'upd_help_latest',
                text: '修改录入最新进展',
                iconCls: 'icon-edit',
               	 handler: function() {
               	 	
                   $('#help_latest_table').modal('show');
               	 	var selectedData = $('#help_manage').datagrid('getSelected');
                     
                     upd_help_latest(selectedData.hpId)
                     
                     
                    // console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }


               	 	// hp_id = selectedData.hpId;  // 帮助ID（全局变量）
                         
                    // 弹窗位置居中
                   /* $("#dialog_upd_help_latest").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_finish').height())*0.5});
                    $('#dialog_upd_help_latest').dialog('open');*/ // 弹出对话框
               	 }
               	
            }
            // ,'-',{
            //     id: 'update_detail_btn',
            //     text: '直接帮助修改',
            //     iconCls: 'icon-edit',
            //     handler: function() {
            //
            //         var selectedData = $('#help_manage').datagrid('getSelected');
            //         console.log(selectedData)
            //
            //         $.ajax({
            //             type: 'POST',
            //             url:Qnzs.path+'/bg/help/getHelpAuditById',
            //             data:{id:selectedData.hpId ,status:6},
            //             dataType:'json',
            //             success: function (data) {
            //                 console.log(data)
            //                 if (data.rows_helpAudit){
            //                     window.location.href = 'update_zhijiebangzu.html?hpid='+ data.rows_helpAudit.auditId+'&ID='+selectedData.hpId;
            //                 }
            //             }
            //
            //         });
            //
            //         if(!selectedData) {
            //             $.alert('请选择需要操作的记录');
            //             return;
            //         }
            //
            //         // auditStatus 帮助状态 0：处理中 1：求助中; 2：已解决; 4：删除 3：等待处理; 5：退回; 6：组织帮助中
            //         if(selectedData.auditStatus != 0) { // 非 处理中
            //             $.alert('此帮助项目已经处于' + auditStatusName[selectedData.auditStatus] + '状态！不能进行直接帮助！');
            //             return;
            //         }
            //
            //         hp_id = selectedData.hpId;  // 帮助ID（全局变量）
            //
            //         // 弹窗位置居中
            //      // $("#dialog_direct").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_direct').height())*0.5});
            //      // $('#dialog_direct').dialog('open'); // 弹出对话框
            //
            //     }

            // }


            ]
        });


        $('.datagrid-toolbar td').hide(); // 隐藏所有按钮

        if(limits) {
            limits = limits.split(','); // 将字符串解析成数组
            for(var i=0; i<limits.length; i++) {
                var limit = limits[i];
                $('#' + limit).parent().show(); // 显示权限按钮
            }
        }
    }

    // 数据筛选（需要初始化的事件）
    function init_datafilter() {
    	
        // 所属地区 -- 数据筛选
       $('#audit').combobox({
            valueField: 'value',
            textField: 'text',
            loader: function (param,success, error) {
                // 获取审核状态列表接口调用
                FindHelpApi.audit({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取审核状态列表为空');
                        error();
                        return;
                    }
                    success(data.rows);
                });
            }
        });

        // 点击查询按钮 -- 数据筛选
        $('#check').click(function () {
            
            
            var did ='';
            var a= $('#organization_A').combobox('getValue');
            var c= $('#organization_C').combobox('getValue');
            var b= $('#organization_B').combobox('getValue');
//          did =  c==''? b: c ;
            if(c!=''){
	           
	           	did =c;
            }else{
           	
           	    if(b!=''){
           	    	
           	    	did =b;
           	    }else{
           	    	
           	    	
           	    	did=a;
           	    }
            }
            
          
            var params = {
                idCard: $('#identity').val(), // 身份证
                title: $('#helpname').val(), // 帮助名称
                helpPeople: $('#helper').val(), // 求助人
                mobile: $('#phone').val(), // 手机号码
                did: did, // 所属机构
                auditStatus: $('#audit').combobox('getValue') // 审核状态
            };

            console.log('筛选 params', params);

            // 分页插件自动传递 page页码和rows页大小
           $('#help_manage').datagrid('load',params);
        });

        // 点击清空按钮 -- 数据筛选
        $('#clear').click(function () {
            console.log('清空筛选条件');
            $('#organization_B').parent().hide(); // 隐藏第二下拉框(数据筛选-所在地/高校)
            $('#organization_C').parent().hide(); // 隐藏第三下拉框(数据筛选-所在地/高校)
            $('#df').form('clear'); // 清空表单
        });
    }

    // 筹款筹人（需要初始化的事件）
    function init_findhelp() {
        // 监控单选框的值
        $('#fm_findhelp input[name="mode"]').change(function (event, value) {
           // console.log('fm_findhelp 单选框值改变 event.target.id', event.target.id);
            var id = event.target.id;
            if(id == 'mode_0') { // 腾讯公益
                $('#website_findhelp').attr('placeholder','如：//gongyi.qq.com');
            }else if(id == 'mode_1') { // i志愿
                $('#website_findhelp').attr('placeholder','如：//wxcs.gdzyz.cn');
            }
        });

        // 公布帮助（筹款筹人） -- 对话框
        $('#dialog_findhelp').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                $('#fm_findhelp').form('clear'); // 对话框关闭前，清除表单数据
            },
            buttons: [{
                text:'取消',
                iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_findhelp').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                iconCls:'icon-ok',
                handler:function(){
                    var selectedData = $('#help_manage').datagrid('getSelected');
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var flag = $('#fm_findhelp').form('validate'); // 表单验证
                    if(!flag) {
                        return;
                    }

                    var mode_value =  $('#fm_findhelp input[name="mode"]:checked').val(); // 0：腾讯公益，1：i志愿，2：其它
                    if(mode_value == undefined) {
                        $.alert('请选择公布方式').then(function () {
                            $('#mode_0').focus(); // 获取焦点
                        });
                    }
                    var website = $('#website_findhelp').val();

                    var releaseType = 'qita'; // 类型（zhiyuan，tenxun, qita）

                    if(mode_value == 0) { // 腾讯公益(单选框)
                        if(website.indexOf('//gongyi.qq.com') == -1) {
                            $.alert('请输入腾讯公益的正确网址');
                            return;
                        }else if(website == '//gongyi.qq.com' || website == '//gongyi.qq.com/'){
                            $.alert('请输入腾讯公益的具体页面网址');
                            return;
                        }
                        releaseType = 'tenxun'; // 类型（zhiyuan，tenxun, qita）
                    }else if(mode_value == 1) { // i志愿(单选框)
                        if(website.indexOf('//wxcs.gdzyz.cn') == -1) {
                            $.alert('请输入i志愿的正确网址');
                            return;
                        }else if(website == '//wxcs.gdzyz.cn' || website == '//wxcs.gdzyz.cn/'){
                            $.alert('请输入i志愿的具体页面网址');
                            return;
                        }
                        releaseType = 'zhiyuan'; // 类型（zhiyuan，tenxun, qita）
                    }else { // 其它(单选框)
                        if(website.indexOf('//') == -1) {
                            $.alert('请输入以//开头的网址');
                            return;
                        }
                    }
                    
                    
                    
                    var dialog_findhelp_fly =true ;
                    if(dialog_findhelp_fly){
                    	
                    	dialog_findhelp_fly =false;
                    	
	                    // //gongyi.qq.com/succor/detail.htm?id=1265
	                    var params = {
	                        hId: hp_id, // 帮助ID（全局变量）
	                        // mode: mode_value, // 公布方式（0：腾讯公益，1：i志愿，2：其它）
	                        releaseType: releaseType, // 类型（zhiyuan，tenxun, qita）
	                        releaseUrl: website // 网址
	                    };
	                    console.log('mode_value', mode_value);
	
	                    // 筹款筹人接口调用
	                    // status 状态(0：受理，3：退回，1：筹款筹人，4：直接帮助，2：完成，5：启用，6：禁用)
	                    // FindHelpApi.changeBatchStatus({idsStr: selectedData.hpId, status: 1, content: website}).then(function (data) {
	                    // FindHelpApi.changeBatchStatus(params).then(function (data) {
	                    FindHelpApi.releaseAdd(params).then(function (data) {
	                    	 dialog_findhelp_fly =true ;
	                        $('#dialog_findhelp').dialog('close'); // 关闭对话框
	                        $.alert(data.msg).then(function () {
	                            $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
	                        });
	                    })
                    }
                }
            }]
        })
    }

    // 直接帮助（需要初始化的事件）
//  function init_direct() {
//
//  
//      // 公布帮助（直接帮助） -- 对话框
//      $('#dialog_direct').dialog({
//          cache: false,
//          onClose: function () {
//              $('#fm_direct').form('clear'); // 对话框关闭前，清除表单数据
//          },
//          buttons: [{
//              text:'取消',
//              iconCls:'icon-cancel',
//              handler:function(){
//                  $('#dialog_direct').dialog('close'); // 关闭对话框
//              }
//          },{
//              text:'确定',
//              iconCls:'icon-ok',
//              handler:function(){
//                  var content = $('#content_direct').val(); // 内容
//                  if(!content) {
//                      $.alert('请输入内容');
//                      return;
//                  }
//                  if(content.length <= 10) {
//                      $.alert('请输入10字以上');
//                      return;
//                  }
//
//                  var params = {
//                      'idsStr': hp_id,  // 帮助ID（全局变量）
//                      'status': 4, // status 状态(0：受理，3：退回，1：筹款筹人，4：直接帮助，2：完成，5：启用，6：禁用)
//                      'content': content
//                  };
//
//                  // 直接帮助接口调用
//                  
//                  obj.ajax('/bg/help/changeBatchStatus',params,function(data){
//                  	if(data.status == 'OK'){
//                  		$('#dialog_direct').dialog('close'); // 关闭对话框
//                  		 $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
//                  	}
//                  	
//                  	
//                  })
//                  
//                 
//              }
//          }]
//      })
//  }
    
    // 受理（需要初始化的事件）
//  function init_accept() {
//      // 公布帮助（直接帮助） -- 对话框
//      $('#dialog_accept').dialog({
//          cache: false,
//          onClose: function () {
//              $('#fm_accept').form('clear'); // 对话框关闭前，清除表单数据
//          },
//          buttons: [{
//              text:'取消',
//              iconCls:'icon-cancel',
//              handler:function(){
//                  $('#dialog_accept').dialog('close'); // 关闭对话框
//              }
//          },{
//              text:'确定',
//              iconCls:'icon-ok',
//              handler:function(){
//                  var content = $('#content_accept').val(); // 内容
//                  if(!content) {
//                      $.alert('请输入内容');
//                      return;
//                  }
//                  if(content.length <= 10) {
//                      $.alert('请输入10字以上');
//                      return;
//                  }
//                  
//                  var a = ['//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/image/20170417/20170417165719_5291.jpg','//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/qnzs/image/20170417/20170417165719_5291.jpg'];
//                  console.log(a.toString());
//                
//                  var params = {
//                      idsStr: hp_id,  // 帮助ID（全局变量）
//                      status: 0, // status 状态(0：受理，3：退回，1：筹款筹人，4：直接帮助，2：完成，5：启用，6：禁用)
//                      content: content,
//                      fileUrl :'//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171114/20171114174142_337找帮助管理20171103.pdf',
//                      imageUrl:a.toString()
//                  };
//
//                  // 直接帮助接口调用
//                  FindHelpApi.changeBatchStatus(params).then(function (data) {
//                      $('#dialog_accept').dialog('close'); // 关闭对话框
//                      $.alert(data.msg).then(function () {
//                          $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
//                      });
//                  })
//              }
//          }]
//      })
//  }

    // 完成（需要初始化的事件）
//  function init_finish() {
//      // 公布帮助（直接帮助） -- 对话框
//      $('#dialog_finish').dialog({
//          cache: false,
//          onClose: function () {
//              $('#fm_finish').form('clear'); // 对话框关闭前，清除表单数据
//          },
//          buttons: [{
//              text:'取消',
//              iconCls:'icon-cancel',
//              handler:function(){
//                  $('#dialog_finish').dialog('close'); // 关闭对话框
//              }
//          },{
//              text:'确定',
//              iconCls:'icon-ok',
//              handler:function(){
//
//                  var content = $('#content_finish').val(); // 内容
//                  if(!content) {
//                      $.alert('请输入内容');
//                      return;
//                  }
//                  if(content.length <= 10) {
//                      $.alert('请输入10字以上');
//                      return;
//                  }
//
//                  var params = {
//                      idsStr: hp_id,  // 帮助ID（全局变量）
//                      status: 2, // status 状态(0：受理，3：退回，1：筹款筹人，4：直接帮助，2：完成，5：启用，6：禁用)
//                      content: content
//                  };
//
//                  // 直接帮助接口调用
//                  FindHelpApi.changeBatchStatus(params).then(function (data) {
//                      $('#dialog_finish').dialog('close'); // 关闭对话框
//                      $.alert(data.msg).then(function () {
//                          $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
//                      });
//                  })
//              }
//          }]
//      })
//  }

    // 修改（需要初始化的事件）
    var init_edit_flay = true ;  //修改标志  -枷锁
    function init_edit() {
        // 受理方下拉框
        $('#acquirer_edithelp').combobox({
            valueField: 'oid',
            textField: 'fullName',
            // editable: false, // 不可编辑，只可选
            // multiple: true, // 多选
            loader: function (param,success, error) {
                FindHelpApi.findOrganization({ page: 1, rows: 10000, sort: 'full_name', order: 'desc' }).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取受理方列表为空');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });
        // 求助类型下拉框
        $('#helptype_edithelp').combobox({
            valueField: 'value',
            textField: 'name',
            // editable: false, // 不可编辑，只可选
            // multiple: true, // 多选
            loader: function (param,success, error) {
                FindHelpApi.getHelpType({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取求助类型列表为空');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });
        // 是否筹款下拉框
        $('#pay_edithelp').combobox({
            valueField: 'value',
            textField: 'name',
            // multiple: true, // 多选
            loader: function (param,success, error) {
                var data = [{value: 1, name: '是'}, {value: 2, name: '否'}];
                success(data);
            },
            onSelect: function (record) {
                console.log('organization_A record', record);

                if(record.name == '是'){
                    $('#amount_edithelp').parents('tr').show();
                }else {
                    $('#amount_edithelp').parents('tr').hide();
                }
            }
        });

        // var distrcitType = undefined; // 区域类型(1：城市，2：高校)
        // // 城市或高校(第一级下拉框) -- 所属区域
        // $('#organization_A').combobox({
        //     valueField: 'type',
        //     textField: 'name',
        //     // multiple: true, // 多选
        //     loader: function (param,success, error) {
        //         var data = [{value: 1, name: '城市'}, {value: 2, name: '高校'}];
        //         success(data);
        //     },
        //     onSelect: function (record) {
        //         console.log('organization_A record', record);
        //
        //         distrcitType = record.type; // 区域类型(1：城市，2：高校)
        //         // 获取第二下拉框列表(根据所属区域第一级下拉框选中值：城市或高校)
        //         FindHelpApi.getDistrictByType({parentDid: 440000, type: record.type, page: 1, rows: 1000}).then(function (data) {
        //             if(!data.rows || data.rows.length <= 0) {
        //                 $.alert('获取城市或高校列表为空');
        //                 error();
        //                 return;
        //             }
        //             $('#organization_B').combobox('loadData', data.rows); // 加载具体城市或高校（第二下拉框的列表）
        //         });
        //
        //         $('#organization_C').parent().hide(); // 隐藏第三下拉框
        //     }
        // });
        // // 具体城市或高校(第二级下拉框) -- 所属区域
        // $('#organization_B').combobox({
        //     valueField: 'did',
        //     textField: 'districtName',
        //     // multiple: true, // 多选
        //     onSelect: function (record) {
        //         console.log('organization_B record', record);
        //
        //         // 获取第三下拉框列表(根据所属区域第二级下拉框选中值：城市或高校)
        //         FindHelpApi.getDistrictByType({parentDid: record.did, type: distrcitType, page: 1, rows: 1000}).then(function (data) {
        //             if(!data.rows || data.rows.length <= 0) {
        //                 $.alert('获取区域或学院列表为空');
        //                 error();
        //                 return;
        //             }
        //             $('#organization_C').combobox('loadData', data.rows); // 加载区域或学院（第三下拉框的列表）
        //         });
        //
        //         $('#organization_C').parent().show(); // 显示第三下拉框
        //     }
        // });
        // // 区域或学院（第三级下拉框） -- 所属区域
        // $('#organization_C').combobox({
        //     valueField: 'did',
        //     textField: 'districtName',
        //     onSelect: function (record) {
        //         console.log('organization_C record', record);
        //     }
        // });
        // 求助详情（富文本框），定义函数并执行
        function editor_create() {
            console.log('editor 初始化');
            var E = window.wangEditor;
            editor = new E('#editor_edithelp');

            FindHelpApi.fileUploadUrl = Qnzs.env.dev_ymj + '/file_upload';
//        配置服务器端地址
            editor.customConfig.uploadImgServer = FindHelpApi.fileUploadUrl;
            
            // 配置服务器端地址(上传图片)
            editor.customConfig.uploadImgServer = FindHelpApi.fileUploadUrl;

            // 监听函数(上传图片)
            editor.customConfig.uploadImgHooks = {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件
                before: function (xhr, editor, files) {
                    console.log('before');
                    console.log('xhr', xhr);
                    console.log('editor', editor);
                    console.log('files', files);
                },
                success: function (xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
                    console.log('success');
                    console.log('xhr', xhr);
                    console.log('editor', editor);
                    console.log('result', result);
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，当图片插入错误时触发
                    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
                    console.log('fail');
                    console.log('xhr', xhr);
                    console.log('editor', editor);
                    console.log('result', result);
                },
                error: function (xhr, editor) {
                    // 图片上传错时触发
                    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
                    console.log('error');
                    console.log('xhr', xhr);
                    console.log('editor', editor);
                },
                timeout: function (xhr, editor) {
                    // 图片上传超时触发
                    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
                    console.log('timeout');
                    console.log('xhr', xhr);
                    console.log('editor', editor);
                },
                customInsert: function (inserImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片时间（而不是编辑器自动插入图片!!!）
                    // inserImg 是 插入图片的函数，editor 是编辑器对象，result 是服务器端返回结果
                    console.log('customInsert');
                    console.log('result', result);
                    console.log('editor', editor);

                    var url = result.url;
                    inserImg(url);
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };

            editor.create();

            return editor;
        }
        editor = editor_create();
        console.log('after editor', editor);

        // 点击取消按钮
        $('#cancel_eidt').click(function () {
            console.log('取消 修改');
            $('#window_edithelp').window('close');
        });
        
        
        // 点击确定按钮
//      $('#confirm_eidt').click(function () {
//      	
//      	var sfz_code =/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
//      	if( !(sfz_code.test($('#identity_edithelp').val()))){
//      		
//      		alert('请输入正确的身份证号！');
//      		return ;
//      	}
//      	
//      	
////      	init_edit_flay =true ; //修改标志符号
//      	
//          console.log('确定 修改');
//
//          var validateFlag = $('#fm_edithelp').form('validate'); // 验证表单，填写信息是否完整
//          console.log('validateFlag', validateFlag);
//          if(!validateFlag) { // 表单填写未完成
//              return;
//          }
//
//          var imgUrlArr = []; // 显示图片数组
//          $('#img_edithelp img').each(function () {
//              var src = $(this).attr('src');
//              // console.log('img_edithelp img src', src);
//              imgUrlArr.push(src);
//          });
//          // console.log('步骤1');
//          var imgUrl = undefined; // 图片字符串
//          if(imgUrlArr && imgUrlArr.length > 0 && $('#imgUrl').text()) {
//              imgUrl = imgUrlArr.join(',') + ',' + $('#imgUrl').text();
//          }else if(imgUrlArr && imgUrlArr.length > 0) {
//              imgUrl = imgUrlArr.join(',');
//          }else if($('#imgUrl').text()) {
//              imgUrl = $('#imgUrl').text();
//          }
//
//          var params = {
//              hpId: hp_id, // 帮助ID（全局变量）
//              acquirer: $('#acquirer_edithelp').combobox('getValue'), // 受理方
//              idCard: $('#identity_edithelp').val(), // 身份证
//              title: $('#title_edithelp').val(), // 帮助名称
//              helpPeople: $('#people_edithelp').val(), // 求助人
//              mobile: $('#mobile_edithelp').val(), // 手机号码
//              helpType: $('#helptype_edithelp').combobox('getText'), // 求助类型
//              whether: $('#pay_edithelp').combobox('getText'), // 是否筹款
//              totalAmount: $('#amount_edithelp').val(), // 筹款金额
//              orgId: undefined, // 所属组织(所属区域)(暂时不需要)
//              // orgId: $('#organization_C').combobox('getValue'), // 所属组织(所属区域)
//              imgUrl: imgUrl, // 图片URL
//              helpContent: $('.summernote1').summernote('code') // 求助详情
//          };
//          
//          console.log('修改 params', params);
//          if(init_edit_flay){   //锁控制
//          	
//          	init_edit_flay = false;
//          	
//          	FindHelpApi.updateHelp(params).then(function (data) {
//          	    $('#window_edithelp').window('close');
//          	    $.alert(data.msg).then(function () {
//          	    	init_edit_flay = true ;   //修改锁的 标志
//          	        window.location.reload(); // 刷新当前页面
//          	        return;
//          	    });
//          	});
//          }
//
//      });
    }
    
 /**** 找帮助 -修改 -朱  *******/

 $('#confirm_eidt').click(function () {
        	
        	var sfz_code =/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        	if( !(sfz_code.test($('#identity_edithelp').val()))){
        		
        		alert('请输入正确的身份证号！');
        		return ;
        	}
        	
        	
//      	init_edit_flay =true ; //修改标志符号
        	
            console.log('确定 修改');

            var validateFlag = $('#fm_edithelp').form('validate'); // 验证表单，填写信息是否完整
            console.log('validateFlag', validateFlag);
            if(!validateFlag) { // 表单填写未完成
                return;
            }

            var imgUrlArr = []; // 显示图片数组
            $('#img_edithelp img').each(function () {
                var src = $(this).attr('src');
                // console.log('img_edithelp img src', src);
                imgUrlArr.push(src);
            });
            // console.log('步骤1');
            var imgUrl = undefined; // 图片字符串
            if(imgUrlArr && imgUrlArr.length > 0 && $('#imgUrl').text()) {
                imgUrl = imgUrlArr.join(',') + ',' + $('#imgUrl').text();
            }else if(imgUrlArr && imgUrlArr.length > 0) {
                imgUrl = imgUrlArr.join(',');
            }else if($('#imgUrl').text()) {
                imgUrl = $('#imgUrl').text();
            }
            
            
          
            var params = {
                hpId: hp_id, // 帮助ID（全局变量）
                acquirer: $('#acquirer_edithelp').combobox('getValue'), // 受理方
                idCard: $('#identity_edithelp').val(), // 身份证
                title: $('#title_edithelp').val(), // 帮助名称
                helpPeople: $('#people_edithelp').val(), // 求助人
                mobile: $('#mobile_edithelp').val(), // 手机号码
                helpType: $('#helptype_edithelp').combobox('getText'), // 求助类型
                whether: $('#pay_edithelp').combobox('getText'), // 是否筹款
                totalAmount: $('#amount_edithelp').val(), // 筹款金额
                orgId: undefined, // 所属组织(所属区域)(暂时不需要)
                // orgId: $('#organization_C').combobox('getValue'), // 所属组织(所属区域)
                imgUrl: imgUrl, // 图片URL
                helpContent: $('.summernote1').summernote('code') // 求助详情
            };
            
            
            if(init_edit_flay){   //锁控制
            	
            	init_edit_flay = false;
            	obj.ajax('/bg/help/updateHelp',params,function(data){
            	
            	    console.log(data);
            	    $('#window_edithelp').window('close');
	                $.alert(data.msg).then(function () {
	                	init_edit_flay = true ;   //修改锁的 标志
	                    window.location.reload(); // 刷新当前页面
	                    return;
	                });
                })
            	
            }
});












    
      /*修改链接*/
      function init_href(){
      	 $('#cancel_href').click(function () {
            console.log('取消 修改');
            $('#dialog_href').window('close');
        });
        
        
        var confirm_href_fly = true ;
      	$('#confirm_href').click(function () {
      		
      		    var content = $('#content_href').val(); // 内容
      		
                    if(!content) {
                        $.alert('请填入需要修改的链接');
                        return;
                    }
                   
                      var params = {
                        hId:hp_id,  // 帮助ID（全局变量）
                       
                        releaseUrl: content
                    };
                if(confirm_href_fly){
                	
                	confirm_href_fly =false ;
                	
	      		    FindHelpApi.releaseUpdateUrl(params).then(function (data) {
	      		    	    confirm_href_fly =true;
	                        $('#dialog_href').dialog('close'); // 关闭对话框
	                        $.alert(data.msg).then(function () {
	                            $('#help_manage').datagrid('load', {}); // 刷新帮助管理列表
	                        });
	                })
                }
      		
      	})
      	
      }
    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选（需要初始化的事件）
        //init_accept(); // 受理（需要初始化的事件）
       init_findhelp(); // 筹款筹人（需要初始化的事件）
       //init_direct(); // 直接帮助（需要初始化的事件）
        //init_finish(); // 完成（需要初始化的事件）
       init_edit(); // 修改（需要初始化的事件）
       init_href();  
    }

    init(); // 初始化函数
    
    
    
    
});