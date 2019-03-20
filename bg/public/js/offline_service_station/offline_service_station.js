// 组织管理数据表格以及分页
$(function () {
	
    var map = undefined; // 地图对象
    // var photoUrl = undefined; // 图片链接
    // var staSceneries_global = undefined; // 站点实景url(全局变量)
    var actionName = '新增'; // 新增和编辑都是用同一个对话框，在点击确定按钮时候要区分新增还是编辑
    var staId = undefined; // 站点ID（编辑站点）


    var limits = Utils.getQueryString('limit'); // 权限

    // 检测是否支持transition(过渡，转变)
    var supportTransition = (function () {
        var s = document.createElement('p').style;
        var r = 'transition' in s || 'WebkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s;
        s = null;
        return r;
    })();

    // 更新网格数据
    function refreshDG() {
        // 初始化数据网格
        $('#offline_service_station').datagrid({
            title: '站点管理',  //表格名称           iconCls: 'icon-edit',  //图标
            // width: 1300,   //表格宽度
            // height: 520,   //表格高度，可指定高度，可自动
            border: true,  //表格是否显示边框
            columns:[[
                {field: 'staId', title: '编号', sortable:true},
                {field: 'organizationName', title :'站点管理员', sortable:true},
                {field: 'fullName', title: '站点全称', sortable:true},
                {field: 'shortName', title:'站点简称', sortable:true},
                // {field: '', title: '组织'}, // 合并到地区
                {field: 'district', title: '地区', sortable:true},
                {field: 'address', title: '详细地址', sortable:true},
                {field: 'capacity',title: '承载人数', sortable:true},
                {field: 'totalscore', title: '站点积分', sortable:true},
                {field: 'mapLongitude', title: '坐标经度', sortable:true},
                {field: 'mapLatitude', title: '坐标纬度', sortable:true},
                {field: 'addTime', title: '创建时间', sortable:true},
                {field: 'disabled', title: '使用状态', sortable:true},
                {field: 'status', title: '审核状态', sortable:true},
                {field: 'staSupplyList', title: '快捷服务',
                    formatter: function(value, row, index){
                        // console.log('value', value);
                        // console.log('row', row);
                        // console.log('index', index);
                        var staSupplyList = value;
                        var supplyArr = [];
                        for(var i=0; i<staSupplyList.length; i++) {
                            var staSupply = staSupplyList[i];
                            supplyArr.push(staSupply.name);
                        }
                        return supplyArr.join(',');
                    }
                },
                {field: 'code', title: '签到二维码',
                    formatter: function(value, row, index){
                        return '<a class="generate_code" style="color: #428bca;cursor: pointer;" onclick="gerenateCode(' + row.staId + ', \'' + row.fullName + '\')">查看二维码</a>';
                    }
                }
            ]],
            loader: function (param, success, error) {
                // console.log('loader param', param);
                OfflineServiceStationApi.getStationPageByParam({
                    pageNo: param.page,
                    pageSize: param.rows,
                    keyword: param.keyword, // 站点全称的关键字
                    districId: param.districId, // 地区编码
                    status: param.status, // 审核状态
                    // status: 'ni', // 审核状态
                    beginTime: param.beginTime, // 开始时间
                    endTime: param.endTime, // 结束时间
                    disabled: param.disabled, // 显示状态
                    sort: param.sort, // 排序项、属性
                    order: param.order // 排序方式
                }).then(function (data) {
                    $('#error_tips').remove(); // 如果有提示文字 '暂无数据'，先清除

                    success(data);
                    if(data.total == 0) {
                        // console.log('暂无数据');
                        $('.datagrid-view').after('<p id="error_tips" style="text-align: center;">暂无数据</p>');
                    }
                }, function () {
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
            sortName: 'staId',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
            sortOrder: 'desc',  //使用倒序排序
            // idField: 'ID', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
            singleSelect:false, // 设置为 true，则只允许选中一行
            frozenColumns: [[  //固定在表格左侧的栏
                // {field: 'ck', checkbox: true}
                {field: 'check', checkbox: true}
            ]],
            toolbar: [{
                id: 'station_view',
                text: '查看',
                iconCls: 'icon-detail',
                handler: function() {
                    // console.log('查看');
                    var selectedData = $('#offline_service_station').datagrid('getSelections');
                    
                    if(selectedData.length>1||selectedData.length<=0){
				     	$.alert('请选择一条数据操作')
				     	return ;
				    }
			               
                    
                    // console.log('selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var coordinate = '（' + selectedData[0].mapLongitude + '，' + selectedData[0].mapLatitude + '）';

                    // 加载数据 -- 查看窗口
                    $('#fm_stationshow').form('load',{
                        fullName: selectedData[0].fullName, // 站点全称
                        shortName: selectedData[0].shortName, // 站点简称
                        organizationName: selectedData[0].organizationName, // 站点管理员
                        capacity: selectedData[0].capacity, // 承载人数
                        totalscore: selectedData[0].totalscore, // 站点积分
                        serviceGroup: selectedData[0].serviceGroup, // 服务群体
                        serviceTime: selectedData[0].serviceTime, // 服务时间
                        // serviceContent: selectedData.serviceContent, // ？？
                        district: selectedData[0].district, // 所属区域
                        address: selectedData[0].address, // 详细地址
                        serviceContent: selectedData[0].serviceContent, // 服务内容
                        coordinate: coordinate, // 站点坐标
                        addTime: selectedData[0].addTime, // 添加时间
                        disabled: selectedData[0].disabled, // 是否禁用
                        status: selectedData[0].status, // 审核状态
                        advise: selectedData[0].advise // 审核意见
                    });


                    // 渲染快捷服务
                    var staSupplyList = selectedData[0].staSupplyList;
                    var html = '';
                    if(staSupplyList && staSupplyList.length > 0) {
                        for(var i=0; i<staSupplyList.length; i++) {
                            var staSupply = staSupplyList[i];
                            html += '<div class="supplies"><input class="easyui-textbox supplies_add" value="' + staSupply.name + '" data-id="' + staSupply.id + '" type="text" name="supplies"></div>';
                        }
                    }
                    $('#fm_stationshow table tr td.supplies_td').html(html); // 渲染快捷服务

                    // 弹窗位置居中
                    $("#window_stationshow").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#window_stationshow').height())*0.5});
                    $('#window_stationshow').window('open'); // 弹出查看模态框
                }
            }, '-', {
                id: 'station_add',
                text: '新增',
                iconCls: 'icon-add',
                handler: function() {
                    // console.log('新增');
                    actionName = '新增'; // 新增/编辑

                    var html = '<div class="supplies"><input class="easyui-textbox easyui-validatebox supplies_add" type="text" name="address"><i class="icon_delete" title="删除快捷服务">-</i><i class="icon_add" title="新增快捷服务">+</i></div>';
                    $('#fm_stationsadd table tr td.supplies_td').html(html); // 渲染快捷服务

                    $('#dialog_stationadd').dialog('setTitle', '新增站点'); // 设置对话框的标题


                    // 弹窗位置居中
                    $("#dialog_stationadd").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_stationadd').height())*0.5});
                    $('#dialog_stationadd').dialog('open'); // 弹出新增模态框
                }
            }, '-', {
                id: 'station_edit',
                text: '编辑',
                iconCls: 'icon-edit',
                handler: function() {
                    // console.log('编辑');

                    actionName = '编辑'; // 新增/编辑
                    
                    var selectedData = $('#offline_service_station').datagrid('getSelections');// 获取选中记录
                    console.log(selectedData)
                    if(selectedData.length>1||selectedData.length<=0){
				     	$.alert('请选择一条数据操作')
				     	return ;
				    }
                    
                    // console.log('编辑 selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }

                    var coordinate = selectedData[0].mapLongitude + ',' + selectedData[0].mapLatitude; // 坐标
                    staId = selectedData[0].staId; // 站点ID（编辑站点对话框，更新服务站点用到）
                    // 加载数据 -- 编辑窗口
                    $('#dialog_stationadd').form('load',{
                        fullName: selectedData[0].fullName, // 站点全称
                        shortName: selectedData[0].shortName, // 站点简称
                        organizationName: selectedData[0].organizationName, // 站点管理员
                        capacity: selectedData[0].capacity, // 承载人数
                        totalscore: selectedData[0].totalscore, // 站点积分
                        serviceGroup: selectedData[0].serviceGroup, // 服务群体
                        serviceTime: selectedData[0].serviceTime, // 服务时间
                        // district: selectedData.district, // 所属区域(只显示详细地址)
                        address: selectedData[0].address, // 详细地址
                        serviceContent: selectedData[0].serviceContent, // 服务内容
                        coordinate: coordinate, // 站点坐标
                        addTime: selectedData[0].addTime, // 添加时间
                        // disabled: selectedData.disabled, // 是否禁用
                        status: selectedData[0].status, // 审核状态
                        advise: selectedData[0].advise // 审核意见
                    });

                    var staSceneriesList = selectedData[0].staSceneriesList;
                    
                     // 渲染快捷服务
//                  var staSupplyList = selectedData[0].staSupplyList;
//                  var html = '';
//                  $('#supplies_td').html(''); //清空快捷服务
//                  if(staSupplyList && staSupplyList.length > 0) {
//                      for(var i=0; i<staSupplyList.length; i++) {
//                          var staSupply = staSupplyList[i];
//                          html += '<div class="supplies"><input class="easyui-textbox supplies_add" value="' + staSupply.name + '" data-id="' + staSupply.id + '" type="text" name="supplies"></div>';
//                      }
//                  }
//                  $('#supplies_td').html(html); // 渲染快捷服务
                    
                    
                    if(staSceneriesList.length > 0) {
                        $('#staSceneries').append($('<div>已上传实景图片</div>'));

                        // 添加图片view(已上传图片)
                        function addPhotos() {

                            var $file = $('<a class="file" data-rotation="0"><img src="' + staSceneries + '"/></a>');

                            var $myBtns = $('<div class="file-panel" style="height: 0;"><span class="cancel">删除</span><span class="rotateRight">向右旋转</span><span class="rotateLeft">向左旋转</span></div>').appendTo($file);

                            var $wrap = $file.find('img');

                            $file.on('mouseenter', function () {
                                $myBtns.stop().animate({height: 30});
                            });

                            $file.on('mouseleave', function () {
                                $myBtns.stop().animate({height: 0});
                            });

                            // 图片操作(左转、右转、删除)
                            $myBtns.on('click', 'span', function () {
                                var index = $(this).index();
                                var deg;

                                switch (index) {
                                    case 0:
                                        $file.off().find('.file-panel').off().end().remove();
                                        return;
                                    case 1:
                                        $file.data('rotation', $file.data('rotation') + 90);
                                        break;
                                    case 2:
                                        $file.data('rotation', $file.data('rotation') - 90);
                                        break;
                                }

                                if(supportTransition) {
                                    // deg = 'rotate(' + file.rotation + 'deg)';
                                    deg = 'rotate(' + $file.data('rotation') + 'deg)';
                                    $wrap.css({
                                        '-webkit-transform': deg,
                                        '-mos-transform': deg,
                                        '-o-transform': deg,
                                        'transform': deg
                                    })
                                }else {
                                    $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~(($file.data('rotation')/90)%4 + 4)%4) +')');

                                }

                            });

                            $file.appendTo($('#staSceneries'));
                        }

                        for(var i=0; i<staSceneriesList.length; i++) {
                            var staSceneries = staSceneriesList[i];
                            addPhotos(); // 添加图片view(已上传图片)
                        }
                    }

                    /**
                     * 绑定服务类别，筛选包含在findByOfflineService接口的记录 -- [{name: "国学教育", id: 35}, {name: "技能培训", id: 34}] ==> [35, 34]
                     * @param staCategoriesList
                     * @param $combobox jq对象
                     * @returns {Array}
                     */
                    function bindStaCategories(staCategoriesList, $combobox) {
                        if(!staCategoriesList || staCategoriesList.length <= 0) {
                            return;
                        }
                        OfflineServiceStationApi.findByOfflineService({}).then(function (data) {
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

                            // return staCategoriesIdArray;
                            $combobox.combobox('setValues', staCategoriesIdArray);
                        });
                    }
                    bindStaCategories(selectedData[0].staCategoriesList, $('#staCategories_add')); // 绑定服务类别
                    $('#showphoto_add').attr('src', selectedData.imageUrl); // 显示照片
                    // 默认选中radio单选框
                    if(selectedData.disabled == '正常') {
                        $('#disabled_0').prop('checked', 'checked');
                    }else {
                        $('#disabled_1').prop('checked', 'checked');
                    }

                    // 渲染快捷服务
                    var staSupplyList = selectedData[0].staSupplyList;
                    
                    if(staSupplyList && staSupplyList.length > 0) {
                    	
                        var html = '';
                        for(var i=0; i<staSupplyList.length; i++) {
                            var staSupply = staSupplyList[i];
                            html += '<div class="supplies"><input class="easyui-textbox easyui-validatebox supplies_add" value="' + staSupply.name + '" data-id="' + staSupply.id + '" type="text" name="supplies"><i class="icon_delete" title="删除快捷服务">-</i><i class="icon_add" title="新增快捷服务">+</i></div>';
                        }
                        $('#fm_stationsadd table tr td.supplies_td').html(html); // 渲染快捷服务
                    }else {
                        var html = '<div class="supplies"><input class="easyui-textbox easyui-validatebox supplies_add" type="text" name="supplies"><i class="icon_delete" title="删除快捷服务">-</i><i class="icon_add" title="新增快捷服务">+</i></div>';
                        $('#fm_stationsadd table tr td.supplies_td').html(html); // 渲染快捷服务
                    }

                    $('#dialog_stationadd').dialog('setTitle', '编辑站点'); // 设置对话框的标题
                    // 弹窗位置居中
                    $("#dialog_stationadd").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_stationadd').height())*0.5});
                    $('#dialog_stationadd').dialog('open'); // 弹出编辑模态框
                }
            }, '-', {
                id: 'station_audit',
                text: '审核',
                iconCls: 'icon-recheck', // wu
                handler: function() {
                    // console.log('审核');
                     var selectedData = $('#offline_service_station').datagrid('getSelections');  // 获取选中记录
                    // console.log('审核 selectedData', selectedData);
                    if(selectedData.length<1){     
						 $.alert('请选择需要操作的记录');
                        return;
						
					}
                    /**
                    if(selectedData.status != '待审核') {
                        $.alert('此服务站点已审核，无需再审核！');
                        return;
                    }**/

                  
                    
                    shenghe_ids = [];
					for(var i =0 ;i<selectedData.length;i++){
						shenghe_ids.push(selectedData[i].staId);
					} 
                    
                    
                    $('#dialog_stationaudit').dialog('open'); // 弹出审核模态框
                }
            }, '-', {
                id: 'station_disable',
                text: '启用',
                iconCls: 'icon-open', //
                handler: function() {
                    // console.log('启用');
                    var selectedData = $('#offline_service_station').datagrid('getSelections'); // 获取选中记录
                    
                    if(selectedData.length<1){     
						 $.alert('请选择需要操作的记录');
                        return;
						
					}
                    var s1 = [];
					for(var i =0 ;i<selectedData.length;i++){
						s1.push(selectedData[i].staId);
					} 
                    
                    // console.log('启用 selectedData', selectedData);
                    
                    /***if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }**/
                    
      
                    var params = {
                        staId: s1.toString(), // 站点ID
                        disabled: false // 状态(FALSE激活 / TRUE禁用)
                    };
                    /**
                    if(selectedData.disabled == '正常') {
                        params.disabled = true; // 状态(FALSE激活 / TRUE禁用)
                        
                    }else {
                        params.disabled = false; // 状态(FALSE激活 / TRUE禁用)
                    }**/
                 
                   	    OfflineServiceStationApi.disableStation(params).then(function (data) {
	                    	console.log(data)
	                        $.alert(data.msg).then(function () {
	                            // 分页插件自动传递 page页码和rows页大小
	                            $('#offline_service_station').datagrid('load',{});
	                        });
	                    });
                   	
                   	
                    
                }
            }, '-', {
                id: 'station_disable_false',
                text: '禁用',
                iconCls: 'icon-open', //
                handler: function() {
                    // console.log('启用');
                    var selectedData = $('#offline_service_station').datagrid('getSelections'); // 获取选中记录
                    
                    if(selectedData.length<1){     
						 $.alert('请选择需要操作的记录');
                        return;
						
					}
                    var s1 = [];
					for(var i =0 ;i<selectedData.length;i++){
						s1.push(selectedData[i].staId);
					} 
                    
                    // console.log('启用 selectedData', selectedData);
                    
                    /***if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }**/
                    
      
                    var params = {
                        staId: s1.toString(), // 站点ID
                        disabled: true // 状态(FALSE激活 / TRUE禁用)
                    };
                    /**
                    if(selectedData.disabled == '正常') {
                        params.disabled = true; // 状态(FALSE激活 / TRUE禁用)
                        
                    }else {
                        params.disabled = false; // 状态(FALSE激活 / TRUE禁用)
                    }**/
                  
                	OfflineServiceStationApi.disableStation(params).then(function (data) {
                		console.log(data)
                	    $.alert(data.msg).then(function () {
                	        // 分页插件自动传递 page页码和rows页大小
                	        $('#offline_service_station').datagrid('load',{});
                	    });
                	});
                    	
                   
                }
            }, '-', {
                id: 'station_del',
                text: '删除',
                iconCls: 'icon-remove',
                handler: function() {
                    // console.log('删除');
                    var selectedData = $('#offline_service_station').datagrid('getSelections'); // 获取选中记录
                    if(selectedData.length<1){     
						 $.alert('请选择需要操作的记录');
                        return;
						
					}
                    var s1 = [];
					for(var i =0 ;i<selectedData.length;i++){
						s1.push(selectedData[i].staId);
					} 
                    
                    var data = {
                        staId: s1.toString() // 站点ID
                    };
                    
                    
                    $.confirm('确定删除此服务站点').then(function () {
                    	
                        OfflineServiceStationApi.deleteStation(data).then(function (data) {
                        	console.log(data)
                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#offline_service_station').datagrid('load',{});
                            });
                        });
                    });
                }
            }, '-', {
                id: 'station_application_query',
                text: '服务查询',
                iconCls: 'icon-recheck',
                handler: function() {
                    // console.log('服务查询');
                    var selectedData = $('#offline_service_station').datagrid('getSelections'); // 获取选中记录
                    
                    if(selectedData.length>1||selectedData.length<=0){
				     	$.alert('请选择一条数据操作')
				     	return ;
				    }
                    // console.log('服务查询 selectedData', selectedData);
                    if(!selectedData) {
                        $.alert('请选择需要操作的记录');
                        return;
                    }
                    // staId = selectedData.staId;
                    // 分页插件自动传递 page页码和rows页大小
                    $('#servicequery').datagrid('load', {
                        staId: selectedData[0].staId
                    });
                    // 弹窗位置居中
                    $("#dialog_servicequery").panel("move",{top:$(document).scrollTop()+($(window).height()-$('#dialog_servicequery').height())*0.5});
                    $('#dialog_servicequery').dialog('open');
                }
            }, '-', {
                id:'station_auditOrganization',
                text: '更换站点管理员',
                iconCls: 'icon-recheck',
                handler: function() {
                    // console.log('服务查询');
                    var selectedData = $('#offline_service_station').datagrid('getSelections'); // 获取选中记录
                    
                    if(selectedData.length>1||selectedData.length<=0){
				     	$.alert('请选择一条数据操作')
				     	return ;
				    }
                     
                    $('#look-childs').modal('show')  //显示模板
                    setTimeout(function(){    //延迟一秒加载数据  ，避免拿不到表格dem
                    	
                    	show_org()//  
                    },500)
                }
            }],
            onClickRow: function(index, data) {
                //将所有checkbox修改为未选中
                // $('#offline_service_station').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
                // //将这次的checkbox标记为选中
                // $('#offline_service_station').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
            }
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
    
        
    // 更新地图
    function refreshMap() {
        //    百度地图API功能
        var map = new BMap.Map("allmap");
        map.centerAndZoom('广州', 12);
        map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); // ?? 启用连续缩放效果，默认禁用
        map.enableKeyboard(); // 启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级

        map.addControl(new BMap.NavigationControl()); // 添加默认缩放平移控件

           // 单击获取点击的经纬度
        map.addEventListener('click', function (e) {
            var coordinate = e.point.lng + ',' + e.point.lat;
            // console.log(e.point.lng + ',' + e.point.lat);
            $('#coordinate_map').val(coordinate);

            var pt = e.point;
            var geoc = new BMap.Geocoder();
            geoc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                // var address = addComp.province + ', ' + addComp.city + ', ' +  addComp.district + ', ' +  addComp.street + ', ' +  addComp.streetNumber;
                // console.log('address', address);
                $('#address_map').val(address);
            });
        });

        return map;
    }

    // 数据筛选（需要初始化的事件）
    function init_datafilter() {

        // 所属地区 -- 数据筛选
        $('#district').combobox({
            valueField: 'did',
            textField: 'districtName',
            // editable: false, // 不可编辑，只可选
            loader: function (param,success, error) {
                OfflineServiceStationApi.getCityByType({provinceId: 440000, type: 1}).then(function (data) {
                    if(!data.dataList || data.dataList.length <= 0) {
                        $.alert('所属地区返回列表为空');
                        error();
                        return;
                    }
                    success(data.dataList);
                })
            }
        });

        // 点击查询按钮 -- 数据筛选
        $('#check').click(function () {
            var keyword = $('#keyword').val(); // 关键词
            // 获取combobox的值和文本
            var districtValue = $('#district').combobox('getValue'); // 所属地区id
            // var districtText = $('#district').combobox('getText'); // 所属地区text
            var audit = $('#audit').combobox('getValue'); // 审核状态
            // var auditText = $('#audit').combobox('getText'); // 审核状态
            var beginTime = $('#start_time').datetimebox('getValue'); // 开始时间
            var endTime = $('#end_time').datetimebox('getValue'); // 结束时间
            var disabled = $('#display').combobox('getValue'); // 显示状态

            // 分页插件自动传递 page页码和rows页大小
            $('#offline_service_station').datagrid('load',{
                keyword: keyword, // 站点全称的关键字
                districId: districtValue, // 地区编码
                status: audit, // 审核状态
                beginTime: beginTime, // 开始时间
                endTime: endTime, // 结束时间
                disabled: disabled // 显示状态

            });
        });

        // 点击清空按钮 -- 数据筛选
        $('#clear').click(function () {
            // console.log('清空筛选条件');
            $('#df').form('clear'); // 清空表单
        });
    }


    // 新增（需要初始化的事件） -- 站点管理
    function init_add() {
        // // 新增 -- 监听图片变化
        // $('#photo_add').change(function () {
        //     console.log('photo_add');
        //     Qnzs.upLoadFile($('#photo_add')).then(function (data) {
        //         console.log('data', data);
        //         photoUrl = data.url;
        //         $('#showphoto_add').attr('src',photoUrl); // 显示图片
        //     });
        // });

        // 新增 -- 服务类别
        $('#staCategories_add').combobox({
            valueField: 'caId',
            textField: 'name',
            // editable: false, // 不可编辑，只可选
            multiple: true, // 多选
            loader: function (param,success, error) {
                OfflineServiceStationApi.findByOfflineService({}).then(function (data) {
                    if(!data.rows || data.rows.length <= 0) {
                        $.alert('获取线下服务的服务类别为空');
                        error();
                        return;
                    }
                    success(data.rows);
                })
            }
        });

        // 不用显示服务类别，只显示详细地址就可以了
        // // 新增 -- 所属区域（地市、高校）
        // $('#district_A').combobox({
        //     valueField: 'typeID',
        //     textField: 'typeName',
        //     loader: function (param,success, error) {
        //         var data = [
        //             {
        //                 typeID: 1,
        //                 typeName: '地市'
        //             },
        //             {
        //                 typeID: 2,
        //                 typeName: '高校'
        //             }
        //         ];
        //         success(data);
        //     },
        //     onSelect: function (record) {
        //         // console.log('district_A record', record);
        //         $('.district_add').hide(); // 隐藏下拉框
        //         $('#district_B').combobox('clear'); //清除数据
        //         $('.district_add').eq(0).css('display', 'inline-block'); // 显示下拉框
        //         $('.district_add').eq(1).css('display', 'inline-block');
        //     }
        // });
        // // 新增 -- 所属区域（省）
        // $('#district_B').combobox({
        //     valueField: 'did',
        //     textField: 'districtName',
        //     loader: function (param,success, error) {
        //         OfflineServiceStationApi.getCityByType({provinceId: 0}).then(function (data) {
        //             var dataList = data.dataList;
        //             if(!dataList || dataList.length <= 0) {
        //                 $.alert('获取省份列表为空');
        //                 error();
        //                 return;
        //             }
        //             // console.log('第二个下拉框 loader dataList', dataList);
        //             success(dataList);
        //         });
        //     },
        //     onSelect: function (record) {
        //         $('.district_add').hide();
        //         $('#district_C').combobox('loadData', []); //清除数据
        //         $('.district_add').eq(0).css('display', 'inline-block');
        //         $('.district_add').eq(1).css('display', 'inline-block');
        //         $('.district_add').eq(2).css('display', 'inline-block');
        //
        //         // console.log('第二个下拉框 onSelect record', record);
        //
        //         var type = $('#district_A').combobox('getValue');
        //         // console.log('type', type);
        //         if(!type) {
        //             $.alert('请选择所属区域的第一个下拉框');
        //             return;
        //         }
        //         if(!record || !record.did) {
        //             $.alert('请选择所属区域的第二个下拉框');
        //             return;
        //         }
        //
        //         OfflineServiceStationApi.getCityByType({provinceId: record.did, type: type}).then(function (data) {
        //             var dataList = data.dataList;
        //             // console.log('第三个下拉框 dataList', dataList);
        //             if(!dataList || dataList.length <= 0) {
        //                 if(type == 1) { // 地市
        //                     $.alert('暂无省城信息');
        //                     return;
        //                 }
        //                 // 高校
        //                 $.alert('暂无高校信息');
        //                 return;
        //             }
        //             $('#district_C').combobox('loadData', dataList);
        //         });
        //     }
        // });
        // // 新增 -- 所属区域（市、高校）
        // $('#district_C').combobox({
        //     valueField: 'did',
        //     textField: 'districtName',
        //     onSelect: function (record) {
        //         $('#district_D').combobox('loadData', []); //清除数据
        //         $('.district_add').eq(3).css('display', 'inline-block');
        //
        //         // console.log('第三个下拉框 onSelect record', record);
        //
        //         var type = $('#district_A').combobox('getValue'); // 地市、高校
        //         // console.log('type', type);
        //
        //         OfflineServiceStationApi.getCityByType({provinceId: record.did, type: type}).then(function (data) {
        //             var dataList = data.dataList;
        //             // console.log('第三个下拉框 dataList', dataList);
        //             if(!dataList || dataList.length <= 0) {
        //                 if(type == 1) { // 地市
        //                     $.alert('暂无地市或区域信息');
        //                     return;
        //                 }
        //                 // 高校
        //                 $.alert('暂无院系信息');
        //                 return;
        //             }
        //             $('#district_D').combobox('loadData', dataList);
        //         });
        //     }
        // });
        // // 新增 -- 所属区域（区、院系）
        // $('#district_D').combobox({
        //     valueField: 'did',
        //     textField: 'districtName',
        //     onSelect: function (record) {
        //         console.log('第四个下拉框 onSelect record', record);
        //     }
        // });

        // 更新地图
        map = refreshMap();

        // 新增 - 点击'获取坐标'
        $('#coordinateIcon_add').click(function () {
            map.centerAndZoom('广州', 12);
            $('#window_map').window('open');
        });

        // 点击'立即搜索'
        $('#search_map').click(function () {
            var word = $('#word_map').val(); // 输入地点的文本框
            console.log('word', word);
//            创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(word, function (point) {
                console.log('point', point);
                if (point) {
                    map.centerAndZoom(point, 16); // 定位
                    map.addOverlay(new BMap.Marker(point)); // 添加红色覆盖物
                    var local = new BMap.LocalSearch(map, {
                        renderOptions: {map: map, panel: 'r_result'}
                    });
                    local.search(word);
                } else {
                    console.log('您选择地址没有解析到结果！')
                }
            })
        });

        // 点击 地图上方'确定'按钮
        $('#submit_map').click(function () {
            var coordinate = $('#coordinate_map').val();
            var address = $('#address_map').val();
            if(!coordinate) {
                $.alert('当前坐标点不能为空！');
                return;
            }

            $('#address_add').val(address); // 赋值详细地址
            $('#coordinate_add').val(coordinate); // 赋值站点坐标

            $('#window_map').window('close');
        });

        // 新增/编辑 -- 对话框
        $('#dialog_stationadd').dialog({
            modal: true,
            closed: true,
            cache: false,
            onClose: function () {
                $('#imgUrl').click(); // 对话框关闭前，webuploader插件样式初始化(清空新添传图片列表$('#imgUrl').text(''))
                // $('#imgUrl').text(''); // 对话框关闭前，清空新添传图片列表
                $('#staSceneries').empty(); // 对话框关闭前，清空已上传图片列表

                $('#fullName_add').val(''); // 站点全称(置空)
                $('#shortName_add').val(''); // 站点简称(置空)
                $('#capacity_add').val(''); // 服务人数(置空)
                $('#serviceGroup_add').val(''); // 服务群体(置空)
                $('#serviceTime_add').val(''); // 服务时间(置空)
                $('#staCategories_add').combobox('clear'); // 服务类别(置空)
                $('#serviceContent_add').val(''); // 服务内容(置空)
                $('#coordinate_add').val(''); // 站点坐标(置空)
                $('#address_add').val(''); // 详细地址(置空)
            },
            buttons: [{
                text:'取消',
                iconCls:'icon-cancel',
                handler:function(){
                    $('#dialog_stationadd').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                iconCls:'icon-ok',
                handler:function(){
                    var validateFlag = $('#fm_stationsadd').form('validate'); // 验证表单，填写信息是否完整
                    console.log('validateFlag', validateFlag);
                    if(!validateFlag) { // 表单填写未完成
                        return;
                    }

                    // 验证经纬度
                    var mapLongitude = $('#coordinate_add').val().split(',')[0]; // 站点经度
                    var mapLatitude = $('#coordinate_add').val().split(',')[1]; // 站点纬度
                    if(!mapLongitude || !mapLatitude) {
                        $.alert('请正确填写或选择经纬度，格式如：12.121,15.12');
                        $('#fm_stationsadd').find('#coordinate_add').focus(); // 获取焦点
                        return;
                    }

                    // 验证禁用
                    var disabled_value = $('input[name="disabled"]:checked').val();
                    if(disabled_value == undefined) {
                        $.alert('请选择是否禁用');
                        $('#fm_stationsadd').find('#disabled_0').focus(); // 获取焦点
                        return;
                    }


                    var staSupplies = []; // 服务选项字符串(以英文逗号分隔，包括选项ID和选项名称，例如新增两个服务选项：,选项1,,选项2)
                    $('#fm_stationsadd table tr td.supplies_td .supplies .supplies_add').each(function () {
                        var supplyId = $(this).data('id'); // 单项快捷服务ID( 新增为空，也要传)
                        var supply = $(this).val(); // 单项快捷服务
                        staSupplies.push(supplyId); // 服务选项添加数据
                        staSupplies.push(supply); // 服务选项添加数据
                    });
                    staSupplies = staSupplies.join(','); // 将数组转为字符串
                    console.log('staSupplies', staSupplies);
                    var hasSupplies = staSupplies.replace(/,/g, ''); // 是否有快捷服务
                    if(!hasSupplies) { // 没有快捷服务
                        $.alert('请输入快捷服务项');
                        return;
                    }

                    var data = {
                        staCategories: $('#staCategories_add').combobox('getValues').join(','), // 服务类型
                        // staId: staId, // 站点ID
                        fullName: $('#fullName_add').val(), // 站点全称
                        shortName: $('#shortName_add').val(), // 站点简称
                        // organizationId: undefined, // 站点管理员ID(无用)
                        // districtId: $('#district_D').combobox('getValue'), // 地区ID(只显示详细地址)
                        address: $('#address_add').val(), // 站点地址
                        serviceContent: $('#serviceContent_add').val(), // 站点服务内容
                        capacity: $('#capacity_add').val(), // 承载人数
                        // mapUrl: undefined, // 地图url(无用)
                        mapLongitude: $('#coordinate_add').val().split(',')[0], // 站点经度
                        mapLatitude: $('#coordinate_add').val().split(',')[1], // 站点纬度
                        // addTime: undefined, // 添加时间(无用)
                        disabled: $('input[name="disabled"]:checked').val(), // 使用状态
                        // status: undefined, // 审核状态
                        // advise: undefined, // 审核意见(无用)
                        serviceTime: $('#serviceTime_add').val(), // 站点服务时间
                        serviceGroup: $('#serviceGroup_add').val(), // 站点服务群体
                        // totalscore: undefined, // ?? 线下服务总评分(无用)
                        // imageUrl: photoUrl, // 图片url(暂时无用)
                        staSceneries: $('#imgUrl').text(), // 站点实景url
                        staSupplies: staSupplies // 服务选项字符串(以英文逗号分隔，包括选项ID和选项名称，例如新增两个服务选项：,选项1,,选项2)

                        // evaluationNum: undefined, // 评论数(无用)
                        // concernNum: undefined // 关注数(无用)
                    };

                    console.log('新增/编辑 data', data);

                    if(actionName == '新增') {
                        if(!data.staSceneries) {
                            $.alert('站点实景图片不能为空');
                            return;
                        }
                        OfflineServiceStationApi.addStation(data).then(function (data) {
                            console.log('OfflineServiceStationApi.addStation data', data);
                            $('#dialog_stationadd').dialog('close'); // 关闭对话框

                            $.alert(data.msg).then(function () {
                                // 分页插件自动传递 page页码和rows页大小
                                $('#offline_service_station').datagrid('load',{});
                            });
                        });
                        return;
                    }

                    // 编辑
                    data.staId = staId;

                    var $imgs = $('#staSceneries').find('img'); // 已上传图片jquery对象
                    var imgArr = []; // 图片数组
                    $imgs.each(function (i) { // 已上传图片
                        imgArr.push($(this).attr('src'));
                    });
                    console.log('imgArr1', imgArr);
                    if($('#imgUrl').text()) { // 新添加图片
                        var imgUrlArr = $('#imgUrl').text().split(',');
                        $.each(imgUrlArr, function (i) {
                            imgArr.push(imgUrlArr[i]);
                        })
                    }

                    console.log('imgArr2', imgArr);
                    if(!imgArr || imgArr.length <= 0) {
                        $.alert('站点实景图片不能为空');
                        return;
                    }
                    if(imgArr.length > 5) {
                        $.alert('站点实景图片不能超过5张');
                        return;
                    }
                    data.staSceneries = imgArr.join(','); // 站点实景url(以英文逗号分隔)

                    console.log('编辑站点 data', data);
                    OfflineServiceStationApi.updateStation(data).then(function (data) {
                        console.log('OfflineServiceStationApi.updateStation data', data);
                        $('#dialog_stationadd').dialog('close'); // 关闭对话框

                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#offline_service_station').datagrid('load',{});
                        });
                    })


                }
            }]
        });

        // 点击 '+'图标(快捷服务)
        $('#fm_stationsadd table tr td.supplies_td').on('click', '.supplies .icon_add', function () {
            var html = '<div class="supplies"><input class="easyui-textbox easyui-validatebox supplies_add" type="text" name="address"><i class="icon_delete" title="删除快捷服务">-</i><i class="icon_add" title="新增快捷服务">+</i></div>';
            $('#fm_stationsadd table tr td.supplies_td').append(html); // 渲染快捷服务
        });
        // 点击 '-'图标(快捷服务)
        $('#fm_stationsadd table tr td.supplies_td').on('click', '.supplies .icon_delete', function () {
            $(this).parent().remove(); // 删除当前快捷服务
        });
    }

    // 审核（需要初始化的事件） -- 站点管理
    function init_audit() {
        // 审核 -- 对话框
        $('#dialog_stationaudit').dialog({
            modal: true,
            closed: true,
            cache: false,
            onClose: function () {
                $('#fm_stationaudit').form('clear'); // 对话框关闭前，清除表单数据
                // 对话框关闭前，是否通过单选框清空
                // $( '#fm_stationaudit input[name="audit"]').prop( "checked", function( i, val ) {
                //     // console.log('i', i);
                //     return false;
                // });
                // $('#advise_audit').val(''); // 对话框关闭前，审核意见清空
            },
            buttons: [{
                text:'取消',
                iconCls:'icon-cancel',
                handler:function(){
                    // console.log('取消');
                    $('#dialog_stationaudit').dialog('close'); // 关闭对话框
                }
            },{
                text:'确定',
                iconCls:'icon-ok',
                handler:function(){
                    console.log('确定');

                    // 验证审核是否通过单选框
                    var status_value = $('#fm_stationaudit input[name="audit"]:checked').val();
                    console.log('status_value', status_value);
                    if(status_value == undefined) {
                        $.alert('请选择是否通过');
                        return;
                    }

                    advise = $('#advise_audit').val(); // 审核意见
                    
                    var data = {
                        staId: shenghe_ids.toString(),
                        status: status_value,
                        advise: advise
                    };
                    console.log('审核 data', data);

                    console.log('审核提交');
                    OfflineServiceStationApi.auditStation(data).then(function (data) {
                        $('#dialog_stationaudit').dialog('close'); // 关闭对话框

                        $.alert(data.msg).then(function () {
                            // 分页插件自动传递 page页码和rows页大小
                            $('#offline_service_station').datagrid('load',{});
                        });
                    })
                }
            }]
        });
    }

    // 服务查询（需要初始化的事件） -- 站点管理
    function init_servicequery() {
        $('#servicequery').datagrid({
            url: OfflineServiceStationApi.getApplicationsByStationId,
            columns:[[
                {field: 'apId', title: '编号', sortable: true},
                {field: 'quesTitle', title: '对应问题', sortable: true},
                {field: 'categoryName', title: '服务类别', sortable: true},
                {field: 'serviceTime', title: '服务时间', sortable: true},
                {field: 'applicantName', title: '申请者', sortable: true},
                {field: 'applyTime', title: '申请时间', sortable: true},
                {field: 'statusStr', title: '审核状态', sortable: true}
            ]],
            loader: function (param, success, error) {
                console.log('loader param', param);
                if(!param.staId) {
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
                    return;
                }
                OfflineServiceStationApi.getApplicationsByStationId({
                    staId: param.staId, // 服务站点ID
                    pageNo: param.page,
                    pageSize: param.rows
                }).then(function (data) {
                    $('#error_tips_servicequery').remove(); // 如果有提示文字 '暂无数据'，先清除

                    console.log('OfflineServiceStationApi.getApplicationsByStationId data', data);
                    success(data);
                    if(data.total == 0) {
                        console.log('暂无数据');
                        $('#servicequery .datagrid-view').after('<p id="error_tips_servicequery" style="text-align: center;">暂无数据</p>');
                    }
                }, function () {
                    // console.log('error');
                    error(); // loader失败的回调函数，不能忽略，否则加载数据失败是，加载信息会一直显示在页面上
                });
            },
            pagination: true,//如果表格需要支持分页，必须设置该选项为true
            pagePosition: 'top', // 定义分页栏的位置。可用的值有：'top'、'bottom'、'both'。
            pageNumber: 1, // 初始化页码
            pageSize: 10,   //表格中每页显示的行数
            pageList: [10,20,30], // 初始化页面尺寸的选择列表
            rownumbers: true,   //是否显示行号
            
            nowrap: false,  // 设置为 true，则把数据显示在一行里。设置为 true 可提高加载性能
            striped: true,  // 设置为 true，则把行条纹化。（即奇偶行使用不同背景色）
            // method:'get',   //表格数据获取方式,请求地址是上面定义的url
            sortName: 'apId',  //定义可以排序的列,按照ID列的值排序，第一次默认使用这个字段排序
            sortOrder: 'desc',  //使用倒序排序
            // idField: 'ID', // 指示哪个字段是标识字段
            // fitColumns: true, // 设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
            loadMsg:'数据正在努力加载，请稍后...' //加载数据时显示提示信息
        });
    }

    function init() {
        //延迟加载,否则页面请求两次
        setTimeout(refreshDG, 100);

        init_datafilter(); // 数据筛选（需要初始化的事件）
        init_add(); // 新增（需要初始化的事件） -- 站点管理
        init_audit(); // 审核（需要初始化的事件） -- 站点管理
        init_servicequery(); // 服务查询（需要初始化的事件） -- 站点管理
    }

    init(); // 初始化函数


    // 关闭二维码
    $('body').click(function () {
        $('#QrCode').hide(); // 隐藏二维码
    })

});

/**
 * 生成二维码
 * @param staId {int} 站点ID
 * @param fullName {int} 站点全称
 */
function gerenateCode(staId, fullName) {
    console.log('offline_service_station staId', staId);
    OfflineServiceStationApi.createStationQrCode({stationId: staId}).then(function (data) {
        // console.log('OfflineServiceStationApi.createStationQrCode data', data);
        // window.location.href = data.data;

        $('#qrcode1').html(''); // 清空上次二维码
        $('#qrcode1').qrcode({
            width : 174,
            height : 174,
            text : data.data
        });

        $('#title').text(fullName); // 站点全称
        $('#QrCode').show(); // 显示二维码
        $('#QrCode_content').css('margin-top', ($(window).height()-$('#window_stationshow').height())*0.5); // 二维码垂直居中
    })
}


function show_org(){   //显示列表
	
	
		///初始化数据表格
	$('#mytb').datagrid({ title: '组织管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1300,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/organization/searchOrganization',   //获取表格数据时请求的地址
	           columns:[[
	             
	             {field:'name',title:'组织简称',width:150},
	             {field:'fullName',title:'组织全称',width:250},
	             {field:'sort',title:'群发站内信配额',width:150},
	             {field:'type',title:'类型',width:150,          
	             formatter: function(value,row,index){
	             	if(value ==1)	{
			        	  	 return '系统管理员';
			        	}
			        	if(value ==2)	{
			        	  	 return '团委组织';
			        	}
			        	if(value ==3)	{
			        	  	 return '服务站点';
			        	}
			        	if(value ==4)	{
			        	  	 return '青年文明号';
			        	}
			        	if(value ==5)	{
			        	  	 return '学生社团';
			        	}
			        	if(value ==6)	{
			        	  	 return '社会组织';
			        	}
			        	if(value ==7)	{
			        	  	 return '合作机构';
			        	}
			       },sortable:true},
	             {field:'createTime',title:'创建时间',width:150,
	//	            formatter: function(value,row,index){
	//	                    if (value){
	//	                        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
	//	                    }else{
	//	                        return '';
	//	                    }
	//	            }
	             },
	            {field:'oid',title:'id',width:150,hidden:true},
	           {field:'disabled',title:'审核状态',width:150,
	                formatter: function(value,row,index){
		                    if(value ==0){
		                    	
		                      return  '未审核'
		                    }
		                    if(value==1){
		                    	
		                    	return '未通过'
		                    }
		                    if(value ==2){
		                    	return '已通过'
		                    }
		            }
	           
	          },
	        
	          
	          {field:'telephone',title:'联系电话',width:150},
	          
	         
	          ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber: 1,
	           pageSize:15,   //表格中每页显示的行数
	           pageList:[5,10,15],
	           rownumbers:true,   //是否显示行号
	           nowrap: false,   
	           striped: true,  //奇偶行是否使用不同的颜色
	           method:'get',   //表格数据获取方式,请求地址是上面定义的url
	           sortName: 'create_time',  //按照ID列的值排序
	           sortOrder: 'desc',  //使用倒序排序
	           idField: 'id',    //打开只能获取单行
	           loadMsg:'数据正在努力加载，请稍后...', 
	           singleSelect:true,////加载数据时显示提示信息   false为全选  true为单选
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
}


$(function(){
	
	
	// 组织-   过滤数据列表查询
		$('#areaBtn').click(function(){
			console.log('2');
		   	var keyWord = $('#keyWord').val();
			//var areaName = $('#areaId').val();
	
		    $('#mytb').datagrid({
		    	queryParams:{'fullName':keyWord,'did':'','type':$('#selet_org_type').val()}
		    });
		
		});
	
	// 组织- 置空查询
		$('#clearBtn').click(function(){
		
			$('#keyWord').val('');
			$('#oidType').val('');
			$('#cityOid').val('');
			$('#shcoolOid').val('');
			$('#areaOid').val('');
			$('#classOid').val('');
			searchDid = "";
			$('#cityOid').hide();
			$('#shcoolOid').hide();
			$('#areaOid').hide();
			$('#classOid').hide();
			$('#show1').hide();
			$('#show2').hide();

			/*$('#areaSel option:selected').attr('selected',false);*/
			/*$('#areaSel option:selected,#auditStatusSel option:selected  ,#oidType option:selected').attr('selected',false);
		    $('#cityOid option:selected,#shcoolOid option:selected ,#areaOid option:selected,#classOid option:selected').attr('selected',false);*/
		});	
		
		// 添加组织

		$('#add_org_Btn').click(function(){
			
			var row = $('#mytb').datagrid('getSelected');
			 var row2 = $('#offline_service_station').datagrid('getSelections');
			
			if(row!=null){
				obj.ajax('/bg/stationManage/auditOrganization',{'stationId': row2[0].staId,'oid':row.oid},function(data){
					console.log(data);
					if(data.status =='OK'){
						$.alert('绑定组织成功！');
					    $('#look-childs').modal('hide')  
						 $('#offline_service_station').datagrid('load',{});
					}else{
						
						$.alert('绑定组织失败！')
					}
				})
				
				
			}
			
		})
		
		
	
})
   


