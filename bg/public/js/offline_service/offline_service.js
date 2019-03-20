/**
 * Created by Administrator on 2017/7/10.
 */
$(function () {
    var serviceDayArr = []; // 日期数组
    var serviceTimesArr = []; // 时间段数组
    var apId = undefined; // 线下服务ID
    var questionId = undefined; // 问题ID

    var limits = Utils.getQueryString('limit'); // 权限
    console.log('limits', limits);

    // /**
    //  * 绑定三级下拉框联动事件
    //  * @param {jq} $comA 第一级下拉框jq对象
    //  * @param {jq} $comB 第一级下拉框jq对象
    //  * @param {jq} $comC 第一级下拉框jq对象
    //  * @param selectedData {obj} 选中记录
    //  */
    // function combo($comA, $comB, $comC, selectedData) {
    //
    //     // 服务站点 -- 第一下拉框(地级市)
    //     $comA.combobox({
    //         valueField: 'did',
    //         textField: 'districtName',
    //         value: selectedData.parentId, // 默认值
    //         loader: function (param, success, error) {
    //             // 默认广东省地级市
    //             OfflineServiceApi.getCityByType({provinceId: 440000, type: 1}).then(function (data) {
    //                 if(!data.dataList || data.dataList.length <= 0) {
    //                     $.alert('获取城市列表');
    //                     error();
    //                     return;
    //                 }
    //                 success(data.dataList);
    //             }, function () {
    //                 error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
    //             })
    //         },
    //         onSelect: function (record) {
    //             console.log('stationA_edit onSelect record', record);
    //
    //             $('#stationB_edit').combobox('clear'); // 清除组件的值
    //             $('#stationC_edit').parent().hide(); // 隐藏第三下拉框
    //             // 此时provinceId为地市(did)
    //             OfflineServiceApi.getCityByType({provinceId: record.did, type: 1}).then(function (data) {
    //                 if(!data.dataList || data.dataList.length <= 0) {
    //                     $.alert('获取县区列表');
    //                     return;
    //                 }
    //
    //                 console.log('stationA_edit onSelect data.dataList', data.dataList);
    //                 $('#stationB_edit').combobox('loadData', data.dataList);
    //             }, function () {
    //                 error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
    //             });
    //         }
    //     });
    //
    //     // 服务站点 -- 第二下拉框(县区)
    //     $comB.combobox({
    //         valueField: 'did',
    //         textField: 'districtName',
    //         value: selectedData.districtId, // 默认值
    //         loader: function (param, success, error) {
    //             console.log('stationB_edit param', param);
    //             // if(!param || !param.did) {
    //             //     return;
    //             // }
    //
    //             // 此时provinceId为地市(did)
    //             OfflineServiceApi.getCityByType({provinceId: selectedData.parentId, type: 1}).then(function (data) {
    //                 if(!data.dataList || data.dataList.length <= 0) {
    //                     $.alert('获取县区列表为空');
    //                     error();
    //                     return;
    //                 }
    //
    //                 success(data.dataList);
    //             }, function () {
    //                 error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
    //             })
    //         },
    //         onSelect: function (record) {
    //             console.log('stationB_edit onSelect record', record);
    //             // 据地区编码获取服务站点(did)
    //             OfflineServiceApi.getStationsByDistrictId({did: record.did}).then(function (data) {
    //                 if(!data.dataList || data.dataList.length <= 0) {
    //                     $.alert('据地区编码获取服务站点为空');
    //                     error();
    //                     return;
    //                 }
    //
    //
    //                 var list = data.dataList;
    //                 var arr = [];
    //                 for(var i=0; i<list.length; i++) {
    //                     var item = list[i];
    //                     var staId = item.staId;
    //                     var fullName = item.fullName;
    //                     arr.push({staId: staId, fullName: fullName}); // 数组的对象元素属性不能含有disabled，否则不能选择
    //                 }
    //
    //                 console.log('stationB_edit onSelect data.dataList', data.dataList);
    //                 $('#stationC_edit').combobox('clear'); // 清除组件的值
    //                 $('#stationC_edit').parent().show();
    //                 $('#stationC_edit').combobox('loadData', arr);
    //             }, function () {
    //                 error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
    //             })
    //         }
    //     });
    //
    //     // 服务站点 -- 第三下拉框(基地、委员会)
    //     $comC.combobox({
    //         valueField: 'staId',
    //         textField: 'fullName',
    //         value: selectedData.stationId, // 默认值
    //         loader: function (param, success, error) {
    //             console.log('stationC_edit param', param);
    //             // if(!param || !param.did) {
    //             //     return;
    //             // }
    //
    //             // 据地区编码获取服务站点(did)
    //             // OfflineServiceApi.getStationsByDistrictId({did: 440303, type: 1}).then(function (data) {
    //             OfflineServiceApi.getStationsByDistrictId({did: selectedData.districtId, type: 1}).then(function (data) {
    //                 // OfflineServiceApi.getCityByType({did: 440305, type: 1}).then(function (data) {
    //                 console.log('stationC_edit OfflineServiceApi.getStationsByDistrictId data', data);
    //                 if(!data.dataList || data.dataList.length <= 0) {
    //                     $.alert('据地区编码获取服务站点为空');
    //                     error();
    //                     return;
    //                 }
    //
    //                 var list = data.dataList;
    //                 var arr = [];
    //                 for(var i=0; i<list.length; i++) {
    //                     var item = list[i];
    //                     var staId = item.staId;
    //                     var fullName = item.fullName;
    //                     arr.push({staId: staId, fullName: fullName}); // 数组的对象元素属性不能含有disabled，否则不能选择
    //                 }
    //
    //                 success(arr);
    //             }, function () {
    //                 error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
    //             })
    //         }
    //     });
    // }


    /**
     * 绑定服务类别，筛选包含在findByOfflineService接口的记录 -- [{name: "国学教育", id: 35}, {name: "技能培训", id: 34}] ==> [35, 34]
     * @param staCategoriesList {array} 选中类别数组（元素是对象，eg [{id: 1}, {id: 2}]）
     * @param $combobox {jq}下拉框(jq对象)
     * @returns {Array}
     */
    function bindStaCategories(staCategoriesList, $combobox) {
        if(!staCategoriesList || staCategoriesList.length <= 0) {
            return;
        }
        OfflineServiceApi.findByOfflineService({}).then(function (data) {
            var totalCategoriesList = data.rows; // 全部服务类别列表
            if(!totalCategoriesList || totalCategoriesList.length <= 0) {
                $.alert('获取线下服务的服务类别为空');
                return;
            }

            var staCategoriesIdArray = [];
            for(var i=0; i<staCategoriesList.length; i++) {
                var item = staCategoriesList[i];

                for(var j=0; j<totalCategoriesList.length; j++) {
                    var totalItem =  totalCategoriesList[j];
                    if(item.id == totalItem.caId) {
                        staCategoriesIdArray.push(item.id);
                        break;
                    }
                }
            }

            console.log('staCategoriesIdArray', staCategoriesIdArray);
            $combobox.combobox('setValues', staCategoriesIdArray);
        });
    }

    /**
     * 绑定服务时间
     * @param $serviceDay {jq} 服务日期jq对象
     * @param $serviceTime {jq} 服务时间jq对象
     * @param selectedData {obj} 选中记录
     */
    function bindServiceDateTime($serviceDay, $serviceTime, selectedData) {
        // 获取未来一周的服务时间
        OfflineServiceApi.getServiceDateTime({}).then(function (data) {
            var selectedIndex = undefined; // 选中下标索引
            serviceDayArr = []; // 清空
            serviceTimesArr = []; // 清空
            /**
             * 获取服务日期列表，并设置默认值
             * @param list
             */
            function getServiceDay(list) {
                for(var i=0;i < list.length; i++) {
                    var serviceTimesArrTem = []; // 时间段数组（一维，为二维数组服务）
                    var item = list[i];
                    var serviceDay = { value: i+1, text: item.serviceDay }; // 如果是0开始，默认选中0（combobox插件的bug）
                    if(serviceDay.text == selectedData.serviceDay) { // 服务日期，默认选中值
                        serviceDay.selected = true;
                        selectedIndex = i;
                    }
                    serviceDayArr.push(serviceDay); // 全局变量
                    for(var j=0; j<item.serviceTimes.length; j++) {
                        var time = item.serviceTimes[j];
                        var serviceTimes = { value: j+1, text: time };
                        if(selectedIndex != undefined) {
                            if(serviceTimes.text == selectedData.serviceTime) { // 服务时间，默认选中值
                                serviceTimes.selected = true;
                            }
                        }
                        serviceTimesArrTem.push(serviceTimes);
                    }
                    serviceTimesArr.push(serviceTimesArrTem); // 全局变量
                }
            }
            getServiceDay(data.dataList);
            console.log('serviceDayArr', serviceDayArr);
            console.log('serviceTimesArr', serviceTimesArr);
            $serviceDay.combobox('loadData', serviceDayArr);
            if(selectedIndex != undefined) {
                $serviceTime.combobox('loadData', serviceTimesArr[selectedIndex]);
            }
        });
    }

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#offline_service').datagrid({
            title: '线下服务申请管理',  //表格名称
            // width: 1300,   //表格宽度
            // height: 520,   //表格高度，可指定高度，可自动
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'apId', title: '编号', sortable:true},
                {field: 'quesTitle', title: '对应问题', sortable:true},
                {field: 'categoryName', title: '服务类别', sortable:true},
                {field: 'stationName', title: '服务站点', sortable:true},
                {field: 'description', title: '服务描述', sortable:true},
                {field: 'serviceTimeStr', title: '服务时间', sortable:true},
                {field: 'applicantName', title: '申请者', sortable:true},
                {field: 'applicantMobile', title: '申请者电话', sortable:true,
                
                    formatter: function(value,row,index){
	                     	
	                 	if(value){
			        	   return  value.substr(0,(value.length-4))+'****';
			        	}else{
			        		
			        		return value ;
			        	}
			        	
			        },sortable:true
                
                
                },
                {field: 'applyTime', title: '申请时间', sortable:true},
                {field: 'signTime', title: '签到时间', sortable:true},
                {field: 'statusStr', title: '审核状态', sortable:true},
                {field: 'scoreStr', title: '评价', sortable:true},
                {field: 'evaluate', title: '评价内容', sortable:true}
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
                console.log('loader param', param);
                OfflineServiceApi.findAllApplication({
                    pageNo: param.page,
                    pageSize: param.rows,
                    keyword: param.keyword, // 服务描述关键字,
                    categoryId: param.categoryId, // 服务类型ID
                    status: param.status, // 线下服务审核状态(可不传，0-待审核，1-已通过，2-不通过，3-已完结，4-已评价)
                    beginTimeApply: param.beginTimeApply, // 申请开始时间
                    endTimeApply : param.endTimeApply, // 申请结束时间
                    sort: param.sort, // 排序项、属性
                    order: param.order // 排序方式
                }).then(function (data) {
                    $('#error_tips').remove(); // 如果有提示文字 '暂无数据'，先清除

                    console.log('OfflineServiceStationApi.findAllApplication data', data);
                    success(data);
                    if(data.total == 0) {
                        console.log('暂无数据');
                        $('.datagrid-view').after('<p id="error_tips" style="text-align: center;">暂无数据</p>');
                    }
                }, function () {
                    // console.log('error');
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
                });
            },
            pagination:true,//如果表格需要支持分页，必须设置该选项为true
            pageNumber: 1, // 初始化页码
            pageSize:20,   //表格中每页显示的行数
            pageList:[10,20,50], // 初始化页面尺寸的选择列表
            rownumbers:true,   //是否显示行号
            nowrap: true,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
            // method:'get',   //表格数据获取方式,请求地址是上面定义的url
            sortName: 'apId',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
            sortOrder: 'desc',  //使用倒序排序
            // idField: 'ID', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
            singleSelect:true, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                // {field: 'ck', checkbox: true}
                {field: 'check', checkbox: true}
            ]],
            toolbar: [{
                id: 'application_view',
                text: '查看',
                iconCls: 'icon-detail',
                handler: function() {
                    console.log('查看');
                    var selectedData = $('#offline_service').datagrid('getSelected');
                    console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    // 加载数据 -- 查看窗口
                    $('#fm_show').form('load',{
                        quesTitle: selectedData.quesTitle, // 所属问题
                        categoryName: selectedData.categoryName, // 所属类别
                        serviceTimeStr: selectedData.serviceTimeStr, // 服务时间
                        stationName: selectedData.stationName, // 服务站点
                        description: selectedData.description, // 服务描述
                        applicantName: selectedData.applicantName, // 申请者
                        applyTime: selectedData.applyTime, // 申请时间
                        statusStr: selectedData.statusStr, // 审核状态
                        applySummary: selectedData.applySummary, // 服务总结
                        scoreStr: selectedData.scoreStr, // 评价
                        evaluate: selectedData.evaluate ,// 评价内容
                        applyMoblie:selectedData.applicantMobile
                    });
                    // 弹窗位置居中
                    $("#dialog_show").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_show').height())*0.5});
                    $('#dialog_show').window('open'); // 弹出查看模态框
                }
            }, '-', {
                id: 'application_del',
                text: '删除',
                iconCls: 'icon-remove',
                handler: function() {
                    console.log('删除');
                    var selectedData = $('#offline_service').datagrid('getSelected'); // 获取选中记录
                    console.log('删除 selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var data = {
                        apId: selectedData.apId // 线下服务ID
                    };

                    $.confirm('确定删除此服务').then(function () {
                        OfflineServiceApi.deleteApplication(data).then(function (data) {
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#offline_service').datagrid('load',{});
                            });
                        });
                    });
                }
            }, '-', {
                id: 'application_audit',
                text: '审核',
                iconCls: 'icon-recheck',
                handler: function() {
                    console.log('审核');
                    var selectedData = $('#offline_service').datagrid('getSelected'); // 获取选中记录
                    console.log('审核 selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    if(selectedData.statusStr != '待审核') {
                        $.alert('此服务站点已审核，无需再审核！');
                        return;
                    }

                    $('#quesTitle_audit').val(selectedData.quesTitle); // 服务标题
                    $('#description_audit').val(selectedData.description); // 服务描述
                    $('#category_audit').val(selectedData.categoryName); // 服务类别
                    $('#station_audit').val(selectedData.stationName); // 服务站点
                    $('#servicetime_audit').val(selectedData.serviceDay + ' ' + selectedData.serviceTime); // 服务时间
                    // $('#category_audit').val(selectedData.categoryName).data('id', selectedData.categoryId); // 服务类别
                    // $('#station_audit').val(selectedData.stationName).data('id', selectedData.stationId); // 服务站点
                    // $('#servicetime_audit').val(selectedData.serviceDay + ' ' + selectedData.serviceTime).data('serviceday', selectedData.serviceDay).data('servicetime', selectedData.serviceTime); // 服务时间


                    // bindServiceDateTime($('#serviceday_audit'), $('#servicetime_audit'), selectedData); // 绑定服务时间
                    //
                    // bindStaCategories(new Array({id: selectedData.categoryId}), $('#category_audit')); // 绑定服务类别
                    //
                    // combo($('#stationA_audit'), $('#stationB_audit'), $('#stationC_audit'), selectedData); // 绑定三级下拉框联动事件
                    //
                    apId = selectedData.apId; // 线下服务ID(全局变量)

                    // 弹窗位置居中
                    $("#dialog_audit").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_audit').height())*0.5});
                    $('#dialog_audit').dialog('open'); // 弹出审核模态框
                }
            }, '-', {
                id: 'application_finish',
                text: '完结',
                iconCls: 'icon-cancel',
                handler: function() {
                    console.log('完结');
                    var selectedData = $('#offline_service').datagrid('getSelected'); // 获取选中记录
                    console.log('完结 selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    if(selectedData.statusStr == '待审核') {
                        $.alert('此服务还未审核，不能完结！');
                        return;
                    }
                    if(selectedData.statusStr == '已完结') {
                        $.alert('此服务已完结，无需完结！');
                        return;
                    }

                    var data = {
                        staId: selectedData.staId, // 站点ID
                        disabled: false // 状态(FALSE激活 / TRUE禁用)
                    };

                    $('#quesTitle_finish').val(selectedData.quesTitle); // 服务标题
                    $('#description_finish').val(selectedData.description); // 服务描述
                    $('#category_finish').val(selectedData.categoryName); // 服务类别
                    $('#station_finish').val(selectedData.stationName); // 服务站点
                    $('#servicedate_finish').val(selectedData.serviceTimeStr); // 服务时间
                    $('#applysummary_finish').val(selectedData.applySummary); // 服务总结


                    apId = selectedData.apId; // 线下服务ID(全局变量)

                    // 弹窗位置居中
                    $("#dialog_finish").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_finish').height())*0.5});
                    $('#dialog_finish').dialog('open'); // 弹出审核模态框
                }
            }]
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
        // 服务类别 -- 数据筛选
        $('#category').combobox({
            valueField: 'caId',
            textField: 'name',
            // editable: false, // 不可编辑，只可选
            // multiple: true, // 多选
            loader: function (param,success, error) {
                OfflineServiceApi.findByOfflineService({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取线下服务的服务类别为空');
                        error();
                        return;
                    }
                    success(data.rows);
                }, function () {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
                })
            }
        });

        // 查询 -- 数据筛选
        $('#check').click(function () {
            var data = {};
            data.keyword = $('#keyword').val(); // 关键词
            data.category = $("#category").combobox('getValue'); // 服务类别
            data.status = $("#status").combobox('getValue'); // 审核状态
            data.start_time = $('#start_time').datetimebox('getValue'); // 开始时间
            data.end_time = $('#end_time').datetimebox('getValue'); // 结束时间
            console.log('查询 -- 数据筛选 data', data);
            $('#offline_service').datagrid('load', {
                keyword: data.keyword,
                categoryId: data.category,
                status: data.status,
                beginTimeApply: data.start_time,
                endTimeApply: data.end_time
            });
        });

        // 清空 -- 数据筛选
        $('#clear').click(function () {
            $("#df").form('clear');
        });
    }

    // 审核（需要初始化的事件）
    function init_audit() {
        // 审核 -- 对话框
        $('#dialog_audit').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                // console.log('关闭面板');
                $('#fm_audit').form('clear'); // 对话框关闭前，清除表单数据
            },
            buttons: [{
                text:'取消',
                iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_audit').dialog('close'); // 关闭对话框
                }
            },{
                text:'不通过',
                iconCls:'icon-no',
                handler:function(){
                    console.log('不通过');

                    var data = {
                        apId: apId, // 线下服务ID
                        // quesTitle: $('#quesTitle_audit').val(), // 问题标题
                        // description: $('#description_audit').val(), // 问题描述
                        // categoryId: $('#category_audit').data('id'), // 服务类别ID
                        // stationId: $('#station_audit').data('id'), //  服务站点ID
                        // serviceDay: $('#servicetime_audit').data('serviceday'), // 服务日期
                        // serviceTime: $('#servicetime_audit').data('servicetime'), // 服务时间段
                        status: 2 // 1-通过，2-不通过
                    };

                    console.log('dialog_audit 不通过 data', data);

                    OfflineServiceApi.auditApplication(data).then(function (data) {
                        console.log('OfflineServiceApi.auditApplication data', data);
                        $('#dialog_audit').dialog('close'); // 关闭对话框

                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#offline_service').datagrid('load',{});
                        });
                    });
                }
            },{
                text:'通过',
                iconCls:'icon-ok',
                handler:function(){
                    console.log('通过');

                    var data = {
                        apId: apId, // 线下服务ID
                        // quesTitle: $('#quesTitle_audit').val(), // 问题标题
                        // description: $('#description_audit').val(), // 问题描述
                        // categoryId: $('#category_audit').data('id'), // 服务类别ID
                        // stationId: $('#station_audit').data('id'), //  服务站点ID
                        // serviceDay: $('#servicetime_audit').data('serviceday'), // 服务日期
                        // serviceTime: $('#servicetime_audit').data('servicetime'), // 服务时间段
                        status: 1 // 1-通过，2-不通过
                    };

                    console.log('dialog_audit 通过 data', data);

                    OfflineServiceApi.auditApplication(data).then(function (data) {
                        console.log('OfflineServiceApi.auditApplication data', data);
                        $('#dialog_audit').dialog('close'); // 关闭对话框
                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#offline_service').datagrid('load',{});
                        });
                    });
                }
            }]
        });


        // // 服务日期 -- 服务时间
        // $('#serviceday_audit').combobox({
        //     valueField: 'value',
        //     textField: 'text',
        //     onSelect: function (data) {
        //         var value = data.value - 1;
        //         // console.log('serviceday_edit onSelect data', data);
        //         $('#servicetime_audit').combobox('loadData', serviceTimesArr[value]);
        //     }
        // });
        //
        // // 服务时间段 -- 服务时间
        // $('#servicetime_audit').combobox({
        //     valueField: 'value',
        //     textField: 'text'
        // });
        //
        // // 服务类别
        // $('#category_audit').combobox({
        //     valueField: 'caId',
        //     textField: 'name',
        //     loader: function (param, success, error) {
        //         OfflineServiceApi.findByOfflineService({}).then(function (data) {
        //             if(!data.rows || data.rows.length <= 0) {
        //                 $.alert('获取线下服务的服务类别为空');
        //                 error();
        //                 return;
        //             }
        //             success(data.rows);
        //         }, function () {
        //             error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
        //         })
        //     }
        // });
    }

    // 完结（需要初始化的事件）
    function init_finish() {

        // 完结 -- 对话框
        $('#dialog_finish').dialog({
            // modal: true,
            // closed: true,
            cache: false,
            onClose: function () {
                $('#fm_finish').form('clear'); // 对话框关闭前，清除表单数据
            },
            buttons: [{
                text:'取消',
                iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_finish').dialog('close'); // 关闭对话框
                }
            },{
                text:'完结',
                iconCls:'icon-ok',
                handler:function(){
                    console.log('完结');

                    var validateFlag = $('#fm_finish').form('validate'); // 验证表单，填写信息是否完整
                    console.log('validateFlag', validateFlag);
                    if(!validateFlag) { // 表单填写未完成
                        return;
                    }

                    var data = {
                        apId: apId, // 线下服务ID
                        // questionId: questionId, // 问题ID
                        applySummary: $('#applysummary_finish').val(), // 服务总结
                        status: 3 // 0-待审核，1-已通过，2-不通过，3-已完结，4-已评价
                    };

                    console.log('dialog_audit 完结 data', data);

                    OfflineServiceApi.finishApplication(data).then(function (data) {
                        console.log('OfflineServiceApi.finishApplication data', data);
                        $('#dialog_finish').dialog('close'); // 关闭对话框

                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#offline_service').datagrid('load',{});
                        });
                    })
                }
            }]
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选（需要初始化的事件）
        // init_eidt(); // 编辑（需要初始化的事件）
        init_audit(); // 审核（需要初始化的事件）
        init_finish(); // 完结（需要初始化的事件）
    }

    init(); // 初始化函数
});