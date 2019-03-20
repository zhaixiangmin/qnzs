var username = '';
var oid = '';
$(function() {

	/*初始化加载地市组织*/
	obj.ajax('/common/district/getCityByType', {
		'provinceId': 440000,
		'type': 1
	}, function(data) {
		if(data) {
			data = data.dataList;
			var selected = false;
			var option = null;
			option = new Option("--市级--", "-1");
			var selects = document.getElementById("cityOid");
			selects.options.add(option);
			for(var i = 0; i < data.length; i++) {
				option = new Option(data[i].districtName, data[i].did, null, selected);
				selects.options.add(option);
			}
			if(!selected) {
				selects.options[0].selected = true;
			}
		} else {
			$("#cityOid").html("<option value='-1'>--暂无可选组织--</option>");
		}
	});

	/*初始化加载高校组织*/
	obj.ajax('/common/district/getShcool', {
		'provinceId': 440000,
		'type': 2
	}, function(data) {
		if(data) {
			data = data.rows;
			var selected = false;
			var option = null;
			option = new Option("--请选择--", "-1");
			var selects = document.getElementById("shcoolOid");
			//var selects = document.getElementById("cityOid");
			selects.options.add(option);
			for(var i = 0; i < data.length; i++) {
				option = new Option(data[i].districtName, data[i].did, null, selected);
				selects.options.add(option);
			}
			if(!selected) {
				selects.options[0].selected = true;
			}
		} else {
			$("#shcoolOid").html("<option value='-1'>--暂无可选高校组织--</option>");
		}
	});

	// 过滤数据列表查询
	$('#areaBtn').click(function() {
		console.log('2');
		var keyWord = $('#keyWord').val();
		//var areaName = $('#areaId').val();

		$('#mytb').datagrid({
			queryParams: {
				'fullName': keyWord,
				'did': searchDid,
				'type': $('#selet_org_type').val()
			}
		});
	});

	//置空查询
	$('#clearBtn').click(function() {
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

	$('#newRoleBtn').click(function() { //提交新的角色
		var row = $('#addRole').datagrid('getSelected'); //获取选中角色的所在行
		var row2 = $('#mytb').datagrid('getSelections');
		console.log(row);
		console.log(row2);
		if(row2.length > 1 || row2.length <= 0) {
			$.alert('请选择一条数据操作')
			return;
		}
		//判断是否选中目标，选中触发模态框

		obj.ajax('/bg/organization/addRole', {
			'rid': row.rid,
			'oid': row2[0].oid
		}, function(data) {
			$.alert('添加成功!');
			$('#myModal').modal('hide');
		}, function(data) {
			console.log('添加失败！')
		});
	});
});

//填充下拉列表
obj.ajax('/bg/organization/getDistrict', {}, function(data) {
	$.each(data.dataList, function(obj, index) {
		$('#areaSel').append('<option value="' + index.did + '">' + index.districtName + '</option>');
		$('#areaName').append('<option value="' + index.did + '">' + index.districtName + '</option>');
		$('#did').append('<option value="' + index.did + '">' + index.districtName + '</option>');
		$('#sort-areaSel2').append('<option value="' + index.did + '">' + index.districtName + '</option>');
	});
}, function(data) {});

/*** 获取权限 ***/
var limits = Utils.getQueryString('limit'); // 权限
console.log('limits', limits);
/***  隐藏权限 ***/
$('#toolbar li').hide(); // 隐藏所有按钮

if(limits) {
	limits = limits.split(','); // 将字符串解析成数组
	for(var i = 0; i < limits.length; i++) {
		var limit = limits[i];
		$('#' + limit).show(); // 显示权限按钮
	}
}


if($('#rog_disabled').css('display') == 'block') {
	$('.org_see').show() //显示查看按钮、
	$('.rog_disabled_nopass').show();//不通过
} else {
	$('.org_see').hide() //隐藏查看按钮
	$('.rog_disabled_nopass').hide();//不通过
}

///初始化数据表格
$('#mytb').datagrid({
	title: '组织管理', //表格名称           iconCls: 'icon-edit',  //图标
	width: 1300, //表格宽度
	height: 520, //表格高度，可指定高度，可自动
	border: true, //表格是否显示边框
	url: base + '/bg/organization/searchOrganization', //获取表格数据时请求的地址
	columns: [
		[{
				field: 'name',
				title: '组织简称',
				width: 150
			},
			{
				field: 'fullName',
				title: '组织全称',
				width: 250
			},
			{
				field: 'sort',
				title: '群发站内信配额',
				width: 150
			},
			{
				field: 'type',
				title: '类型',
				width: 150,
				formatter: function(value, row, index) {
					if(value == 1) {
						return '系统管理员';
					}
					if(value == 2) {
						return '团委组织';
					}
					if(value == 3) {
						return '服务站点';
					}
					if(value == 4) {
						return '青年文明号';
					}
					if(value == 5) {
						return '学生社团';
					}
					if(value == 6) {
						return '社会组织';
					}
					if(value == 7) {
						return '合作机构';
					}
				},
				sortable: true
			},
			{
				field: 'createTime',
				title: '创建时间',
				width: 150
				//	        		  formatter: function(value,row,index){
				//	        		  if (value){
				//	        		  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				//	        		  }else{
				//	        		  return '';
				//	        		  }
				//	        		  }
			},
			{
				field: 'oid',
				title: 'id',
				width: 150,
				hidden: true
			},
			{
				field: 'disabled',
				title: '审核状态',
				width: 150,
				formatter: function(value, row, index) {
					if(value == 0) {
						return '未审核'
					}
					if(value == 1) {
						return '未通过'
					}
					if(value == 2) {
						return '已通过'
					}
				}
			},
			{
				field: 'telephone',
				title: '联系电话',
				width: 150,
				formatter: function(value, row, index) {
					if(value) {
						return value.substr(0, (value.length - 4)) + '****';
					} else {
						return value;
					}
				},
				sortable: true
			},
			{field:'fileUrl',title:'证明文件 ',align : 'center',width : $(this).width() * 0.08,
			        	formatter: function(value,row,index){
			        		if(value){
			        			
			        			var fileUrls = value.split(',');
			        			return "<div ><img onclick='showMaxImg(this)'   src='" + fileUrls[0] + "' height='33px' width='120px'></img></div>";
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
	sortName: 'create_time', //按照ID列的值排序
	sortOrder: 'desc', //使用倒序排序
	//  idField: 'id',    //打开只能获取单行
	loadMsg: '数据正在努力加载，请稍后...',
	singleSelect: false, ////加载数据时显示提示信息   false为全选  true为单选
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
		$('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
		//将这次的checkbox标记为选中
		$('#mytb').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	}
});

//初始化配置按钮的数据列表
//$('#tabYE').hide();

function yeInint(n) {
	$('#yeTable').datagrid({
		title: '查看运营者', //表格名称           iconCls: 'icon-edit',  //图标
		width: 1300, //表格宽度
		height: 550, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: base + '/bg/organization/getAccountOrgByOid?oid=' + n, //获取表格数据时请求的地址
		columns: [
			[{
					field: 'username',
					title: '手机号码',
					width: 155,
					hidden: true
				},
				{
					field: 'password',
					title: '密码',
					width: 255,
					hidden: true
				},
				{
					field: 'type',
					title: '类型',
					width: 100
				},
				{
					field: 'createTime',
					title: '创建时间',
					width: 155
					//		        	  formatter: function(value,row,index){
					//		        	  if (value){
					//		        	  return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
					//		        	  }else{
					//		        	  return '';
					//		        	  }
					//		        	  }
				},
				{
					field: 'email',
					title: '邮箱',
					width: 155
				},
				{
					field: 'realname',
					title: '昵称',
					width: 155
				},
				{
					field: 'mobile',
					title: '手机号',
					width: 155
				},
				{
					field: 'gender',
					title: '性别',
					width: 155,
					formatter: function(value, row, index) {
						if(value == 1) {
							return '男';
						}
						if(value == 2) {
							return '女';
						}
						if(value == 3) {
							return "保密";
						}
					}
				},
				{
					field: 'photoUrl',
					title: '预览',
					width: 155,
					formatter: function(value, row, index) {
						return "<img src='" + value + "' height='70%' width='80%'></img>";
					}
				},
			]
		],
		pagination: false, //如果表格需要支持分页，必须设置该选项为true
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
			$('#menuTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#menuTable').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});
};

//查看已添加到该处的管理员
function resetBtn() {
	var row = $('#mytb').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}

	if(row) { //判断是否是叶子节点
		$('#look-childs').modal('show');
		var i = 0;
		var times = setInterval(function() {
			yeInint(row[0].oid); //调用初始化函数

			if(i == 1) {
				clearInterval(times);
			}
			i++;
		}, 50)
	} else {
		$.alert('请选择正确的子节点！');
		$('#look-childs').modal('hide');
	}
}

//图片上传处理 start
var image = '';

function selectImage(file) {
	if(!file.files || !file.files[0]) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('preview').src = evt.target.result;
		image = evt.target.result;

	}
	reader.readAsDataURL(file.files[0]);
};

////192.168.100.49:8080/qnzs/file_upload
$(document).ready(function() {
	//#file
	$('#image_file').fileupload({
		url: base + '/file_upload',
		dataType: 'json',
		autoUpload: true,
		done: function(e, data) {
			//			alert(data.result.url);
			$.alert('新增成功')
			imageUrl = data.result.url;
			$('#preview').attr('src', imageUrl);
		},
		fail: function() {
			$.alert('出错');
		}
	});

	////192.168.100.49:8080/qnzs/file_upload
	$('#Updatefile').fileupload({
		url: base + '/file_upload',
		dataType: 'json',
		autoUpload: true,
		done: function(e, data) {
			$.alert('上传成功！');
			imageUrl2 = data.result.url;
			$('#preview2').attr('src', imageUrl2); //回显图片
		},
		fail: function() {
			$.alert('出错');
		}
	});

	/******  证明文件  start  ********/
	$('#check_file').fileupload({
		url: base + '/file_upload',
		dataType: 'json',
		autoUpload: true,
		done: function(e, data) {
			$.alert('上传成功！');
			$('#check_img_1').attr('src', data.result.url); //回显图片
		},
		fail: function() {
			$.alert('出错');
		}
	});

	/******  证明文件  start  ********/
});

//图片上传处理  end

////新增组织管理信息
$('#addInfo').click(function() {
	
	if($('#simpleName').val()==''){
			$.alert('组织简称不能为空！')
	    return;
	}
	
	if($('#fullName').val()==''){
			$.alert('组织全称不能为空！')
	    return;
	}

	if(isNaN($('#sort').val())) {
	  $.alert('序号只能是数字！');
	  return;
    }
	
	var validate = $("#form2").form('validate'); 
	  
	if(!validate) {
		$.alert('请正确填写表单！')
		$("#form2").find(".validatebox-invalid:first").focus();

		return false;
	} else {
		var OareaTypeAd = $('#OareaTypeAd').val(); //类型
		//所属地区
		var simpleName = $('#simpleName').val(); //机构简称
		var fullName = $('#fullName').val(); //机构全称
		var totalMsg1 = $('#totalMsg1').val();
		var type = $("input[name='areaType']:checked").val();
		var sort = $('#sort').val();
		//测试地区编码440303   CJJDX
		var areaAndclass;
		var cityAndshcool;
		var oArea = $('#oidType2 option:selected').val(); //获取地区或高校
		var areaAndclass1 = $('#areaOid2 option:selected').val();
		var areaAndclass2 = $('#classOid2 option:selected').val();
		var cityAndshcool1 = $('#cityOid2 option:selected').val(); //地址
		var cityAndshcool2 = $('#shcoolOid2 option:selected').val(); //高校

		if(cityAndshcool1 != '-1') {
			areaAndclass = cityAndshcool1;
		}
		if(cityAndshcool2 != '-1') {
			areaAndclass = cityAndshcool2;
		}
		if(areaAndclass2 != '-1') {
			areaAndclass = areaAndclass2;
		}
		if(areaAndclass1 != '-1') {
			areaAndclass = areaAndclass1;
		}
		console.log(areaAndclass)
		var imgUrls_files = $('#imgUrl').text(); //  证明文件
       
		obj.ajax('/bg/organization/addOrganization', {
			'did': areaAndclass, //测试地区编码440303   CJJDX
			'name': simpleName,
			'fullName': fullName,
			'type': OareaTypeAd,
			'sort': sort,
			'photoUrl': $('#preview').attr('src'),
			'typeDistrict': oArea, //高校或地区  int 如1
			'telephone': $('#phone2').val(), //办公电话
			'address': $('#add_address').val(), //地址
			'introduce': $('#add_introduce').val(), //介绍
			'fileUrl': imgUrls_files, //   证明文件
		}, function(data) {
			console.log(data);
			if(data.status == 'OK') {
				$.alert('添加成功！');
				$('#add_user').modal('hide');
				$('#mytb').datagrid('reload'); /*在向服务器改变数据之后，更新前台数据。*/
			} else {
				$.alert('添加失败！');
			}
		}, function(data) {
			$.alert('添加失败！');
		}) //ajax end
	}

});

//修改组织信息   
function updateIofn(n) {
	var row = $('#mytb').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}

	if(n == 2) {
		$('#addInfoBtn').hide(); //显示修改的确定按钮
		$('#updd_box').html('查看') //修改标题
	} else {
		$('#addInfoBtn').show(); //显示修改的确定按钮
		$('#updd_box').html('修改') //修改标题
	}

	if(row) {
		$('#user-modify').modal('show');

		obj.ajax("/bg/organization/findOrganizationById", {
			'oid': row[0].oid
		}, function(data) {
			console.log(data);
			// 成功 回显数据
			$("#OareaTypeUp option[value='" + data.rows.type + "']").attr("selected", "selected");

			//			$('#upd_did').val(data.rows.did);//所属地区
			$('#simpleName1').val(data.rows.name);
			$('#upd_fullName').val(data.rows.fullName); //组织全称
			$('#totalMsg2').val(data.rows.countMsgSend); //群发站内信配额

			$('input:checkbox[name=test]').prop("checked", false);
			$('input:checkbox[name=test][value=' + data.rows.type + ']').attr('checked', 'true');
			$('#upd_sort1').val(data.rows.sort); //序号
			$('#upd_address').val(data.rows.address); //地址
			$('#upd_phone2').val(data.rows.telephone) //办公电话
			$('#upd_OareaTypeUp').val(data.rows.type); //
			$('#introduce').val(data.rows.introduce) //介绍
			if(data.rows.fileUrl) {//文件
				var fileUrls = data.rows.fileUrl.split(',');
				var html = '';
				for(var i = 0; i < fileUrls.length; i++) {

					var a = fileUrls[i].split('.')
					var a1 = a[a.length - 1];
					if(a1 == 'doc' || a1 == 'txt') {

						html += ' <div class="form-group">';
						html += ' <label class="col-sm-2 control-label"><span id="checkRedFly">*</span>证明文件</label>';
						html += '<div class="col-sm-3">';
						html += ' <a id="files_a_' + (i + 1) + '" title="" href="' + fileUrls[i] + '" >下载</a>';
						html += ' <input type="file" name="image_file" id="files_' + (i + 1) + '" class="upload_pic" onChange="fileSelected();" />';
						html += '</div> ';
						html += '</div>';
					} else {
						html += ' <div class="form-group">';
						html += ' <label class="col-sm-2 control-label"><span id="checkRedFly">*</span>证明文件</label>';
						html += '<div class="col-sm-3">';
						html += ' <img id="img' + (i + 1) + '" height="100" border="0" title="" src=" ' + fileUrls[i] + '" />';
						html += ' <input type="file" name="image_file" id="update_file_' + (i + 1) + '" class="upload_pic" onChange="fileSelected();" />';
						html += '</div> ';
						html += '</div>';
					}

					if(i > 4) {
						break;
					}
				}
				$('.cheak_file_box').html(html);

				$(document).ready(function() {
					$('#update_file_1').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#img1').attr('src', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#update_file_2').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#img2').attr('src', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#update_file_3').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#img3').attr('src', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#update_file_4').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#img4').attr('src', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#update_file_5').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#img5').attr('src', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});
					//修改 -文件名下载

					$('#files_1').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#files_a_1').attr('href', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#files_2').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#files_a_2').attr('href', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#files_3').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#files_a_3').attr('href', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#files_4').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#files_a_4').attr('href', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});

					$('#files_5').fileupload({
						url: base + '/file_upload',
						dataType: 'json',
						autoUpload: true,
						done: function(e, data) {
							$.alert('上传成功！');

							$('#files_a_5').attr('href', data.result.url); //回显图片
						},
						fail: function() {
							$.alert('出错');
						}
					});
				})
			}else{

				var html ='';
				html += ' <div class="form-group">';
				html += ' <label class="col-sm-2 control-label"><span id="checkRedFly">*</span>证明文件</label>';
				html += '<div class="col-sm-3">';
				html += ' <img id="img1" height="100" border="0" title="" src="" />';
				html += ' <input type="file" name="image_file" id="update_file_1" class="upload_pic" onChange="fileSelected();" />';
				html += '</div> ';
				html += '</div>';

                $('.cheak_file_box').html(html);
				//$('.cheak_file_box').html('')//置空文件
				//$('#img1').attr('src',"")//置空图片
                $('#update_file_1').fileupload({
                    url: base + '/file_upload',
                    dataType: 'json',
                    autoUpload: true,
                    done: function(e, data) {
                        $.alert('上传成功！');

                        $('#img1').attr('src', data.result.url); //回显图片
                    },
                    fail: function() {
                        $.alert('出错');
                    }
                });
				
				
			}

			$('#preview2').attr('src', data.rows.photoUrl); //用户头像

			obj.ajax('/common/district/getParentByUserDid', {
				'did': data.rows.did //地区编码
			}, function(data) {
				$("#oidType1").val(data.one);
				changeOidType1(data.one);

				if(1 == data.one) {
					$("#cityOid1").val(data.two.did);
					if(data.three.did != "") {
						cityOidChange1(data.two.did);
						setTimeout(function() {
							$("#areaOid1").val(data.three.did);
						}, 300);

					}
				}

				if(2 == data.one) {
					$("#shcoolOid1").val(data.two.did);
					if(data.three.did != "") {
						schoolOidChange1(data.two.did);
						setTimeout(function() {
							$("#classOid1").val(data.three.did);
						}, 300);

					}
				}
			}, function(data) {});
		}, function(data) {}); //ajax end
	} else {
		$('#user-modify').modal('hide');
		$.alert("请选择要修改的对象");
	}
};

/******* 提交修改后的信息  ********/
$('#addInfoBtn').click(function() {
	//向后台添加数据
	var row = $('#mytb').treegrid('getSelected');
	var OareaTypeUp = $('#OareaTypeUp').val(); //组织类型
	var simpleName = $('#simpleName1').val();
	var fullName = $('#upd_fullName').val();
	var num = $('#totalMsg2').val();
	var sort = $('#sort1').val();
	var oid = row.oid;
	var areaAndclass;
	var cityAndshcool;
	var oArea = $('#oidType1 option:selected').val(); //获取地区或高校
	/**var areaAndclass1 = $('#areaOid1 option:selected').val() ;
    	var areaAndclass2 = $('#classOid1 option:selected').val();
    	var cityAndshcool1 = $('#cityOid1 option:selected').val() ;  //地址
    	var cityAndshcool2 = $('#shcoolOid1 option:selected').val();  //高校*/

	/*if(areaAndclass1!='-1'){
    	 	areaAndclass =areaAndclass1 ;
    	}
    	if(areaAndclass2 !='-1'){
    	 	areaAndclass =areaAndclass2 ;
    	}
    	if(cityAndshcool1!='-1'){
    	 	areaAndclass =cityAndshcool1 ;
    	}
    	if(cityAndshcool2 !='-1'){
    	 	areaAndclass =cityAndshcool2 ;
    	} */

	if(updatedid == '-1') {
		updatedid = "";
	}
	//获取证明文件的图片路径

	var attrImg = [];
	var s = $('.cheak_file_box img');
	for(var j = 0; j < $('.cheak_file_box img').length; j++) {
		attrImg.push(s[j].getAttribute('src'));
	}
	//	//获取证明文件的文件路径

	var attrfiles = [];
	for(var k = 0; k < $('.cheak_file_box a').length; k++) {
		attrfiles.push($('.cheak_file_box a')[k].getAttribute('href'));
	}

	//	alert(attrfiles.concat(attrImg))
	var aa = attrfiles.concat(attrImg)
	obj.ajax('/bg/organization/updateOrganization', {
		'did': updatedid,
		"name": simpleName, //组织简称
		"fullName": $('#upd_fullName').val(), //组织全称
		"sort": $('#upd_sort1').val(),
		"oid": oid,
		'telephone': $('#upd_phone2').val(), //办公电话
		'address': $('#upd_address').val(), //地址
		'type': $('#upd_OareaTypeUp').val(),
		'typeDistrict': oArea, //高校或地区  int 如1
		'photoUrl': $('#preview2').attr('src'),
		'introduce': $('#introduce').val(), //介绍
		'fileUrl': aa.toString() //证明文件
		//		"countMsgSend":num  
	}, function(data) {
		console.log(data);
		if(data.status == 'OK') {
			$.alert('修改成功！')
			$('#mytb').datagrid('reload');
			$('#user-modify').modal('hide');
		} else {
			$.alert('修改失败！')
		};
	}, function(data) {
		alert("组织信息添加失败")
	});
});

//分配用户到组织里
function addUserSort(n) {
	var row = $('#userTable').datagrid('getSelected');
	if(row) { //判断是否选中目标，选中触发模态框
		$('#user_add_role').modal('show');
	} else {
		$('#user_add_role').modal('hide');
		$.alert('请选择单个目标');
	}
}

/******* 查看 ********/
function examine() {
	var row = $('#mytb').datagrid('getSelected');
	if(row) { //判断是否选中目标，选中触发模态框
		$('#user-modify').modal('show');
		$('#addInfoBtn').hide();
	} else {
		$('#examine').modal('hide');
		$.alert('请选择单个目标');
		$('#addInfoBtn').show();
	}
}

/*** 启动审核对话框  **/
function examineBtn(k) {
	var row = $('#mytb').datagrid('getSelections');

	if(!(row.length < 1)) { //判断是否选中目标，选中触发模态框

		var s1 = [];
		for(var i = 0; i < row.length; i++) {
			s1.push(row[i].oid);
		}

		if(k == 2) {
			$.messager.confirm('审核通过', '确认吗?', function(r) {
				if(r) {
					obj.ajax('/bg/organization/updateAudit', {
							'oid': s1.toString(),
							"disabled": k
						},
						function(data) {
							console.log(data);
							if(data.status == 'ERROR') {
								$.alert(data.msg);
							} else {
								$.alert('审核成功！');

								$('#mytb').datagrid('reload');
							};
						},
						function(data) {

						});
				}
			});
		}

		if(k == 1) {
			$.messager.confirm('审核不通过', '确认吗?', function(r) {
				if(r) {
					obj.ajax('/bg/organization/updateAudit', {
							'oid': s1.toString(),
							"disabled": k
						},
						function(data) {
							console.log(data);
							if(data.status == 'ERROR') {
								$.alert(data.msg);
							} else {
								$.alert('审核成功！');
								$('#mytb').datagrid('reload');
							};
						},
						function(data) {

						});
				}
			});
		}
	} else { //没有选中目标执行以下程序
		$.alert('请选择一条用户');
	}
}

/*******----------------- 3 及联动-------------------*****/
//获取区/县
function cityOidChange(obj) {
	var pid = $(obj).val();
	searchDid = pid;
	var areaHtml = $('#areaOid').html('');
	if(pid != "-1") {
		$.ajax({
			type: 'POST',
			url: base + '/common/district/getCity',
			data: {
				'provinceId': pid
			},
			dataType: 'json',
			success: function(data) {
				if(data) {
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--区/县--", "-1");
					var selects = document.getElementById("areaOid");
					selects.options.add(option);
					for(var i = 0; i < data.length; i++) {
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected) {
						selects.options[0].selected = true;
					}
					areaHtml.removeAttr("disabled");
				} else {
					$("#areaOid").html("<option value='-1'>--暂无--</option>");
					areaHtml.attr("disabled", "true");
				}
			}
		});
	} else {
		areaHtml.html("<option value='-1'>--区/县--</option>");
		areaHtml.attr("disabled", "true");
		$(obj).css("color", "#999");
	}
};

//获取高校下级 shcoolOid classOid
function schoolOidChange(obj) {
	var pid = $(obj).val();
	searchDid = pid;
	$("#reporterNames").val(pid);
	var areaHtml = $('#classOid').html('');
	if(pid != "-1") {
		//	areaHtml.removeAttr("disabled");
		$.ajax({
			type: 'POST',
			url: base + '/common/district/getCity',
			data: {
				'provinceId': pid
			},
			dataType: 'json',
			success: function(data) {
				if(data) {
					data = data.rows;
					var selected = false;
					var option = null;
					option = new Option("--分院--", "-1");
					var selects = document.getElementById("classOid");
					selects.options.add(option);
					for(var i = 0; i < data.length; i++) {
						option = new Option(data[i].districtName, data[i].did, null, selected);
						selects.options.add(option);
					}
					if(!selected) {
						selects.options[0].selected = true;
					}
					areaHtml.removeAttr("disabled");
				} else {
					$("#classOid").html("<option value='-1'>--暂无--</option>");
					areaHtml.attr("disabled", "true");
				}
			}
		});
	} else {
		areaHtml.html("<option value='-1'>--分院--</option>");
		areaHtml.attr("disabled", "true");
		$(obj).css("color", "#999");
		//		$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
	}
}
/********* 3级联动 end**********/

var searchDid = "";

function quxuan(obj) {
	var pid = $(obj).val();
	$("#areaId").val(pid);
	searchDid = pid;
}

function fn1(oid) {
	//	初始化权限的数据列表
	$('#addRole').datagrid({
		title: '权限分配', //表格名称           iconCls: 'icon-edit',  //图标
		width: 550, //表格宽度
		height: 400, //表格高度，可指定高度，可自动
		border: true, //表格是否显示边框
		url: base + '/bg/organization/getAllRole?oid=' + oid, //获取表格数据时请求的地址
		columns: [
			[{
					field: 'roleName',
					title: '角色',
					width: 255
				},
				{
					field: 'description',
					title: '描述',
					width: 255
				}
			]
		],
		pagination: false, //如果表格需要支持分页，必须设置该选项为true
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
			$('#addRole').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
			//将这次的checkbox标记为选中
			$('#addRole').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
		}
	});
}

//分配角色
function newRole(n) {
	var row = $('#mytb').datagrid('getSelections');
	console.log(row)
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}

	if(row) { //判断是否选中目标，选中触发下拉框
		fn1(row[0].oid); //调用方法 ，
		$('#myModal').modal('show');
		selectRows(row[0].oid); //遍历回选节点
	} else { //没有选中目标执行以下程序
		$.alert('请选择目标');
		$('#myModal').modal('hide');
	}
}

//遍历回显节点
function selectRows(id) {
	//获取需要选中的记录ID
	//	var ids =new Array('001','002','003');
	//清除所有选中的行
	$("#addRole").datagrid("clearChecked");
	//获取数据列表中的所有数据
	var rows = $("#addRole").datagrid("getRows");
	//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
	for(var i = 0; i < rows.length; i++) {
		var rowId = rows[i].id;
		if(rowId == id) {
			var index = $("#addRole").datagrid("getRowIndex", rows[i]);
			$("#addRole").datagrid("checkRow", index);
		}
	}
}

function orgReset() { //调用函数  清除表单
	$('#orgReset').click(function() {
		Validator.removeErrors(document.getElementById('form1'));
	});

	$('#orgReset').click();
	$('#totalMsg1').val(1);
}

/***----- 添加到子目录------***/
function addChildsBtn() {
	var row = $('#mytb').datagrid('getSelections');
	if(row.length > 1 || row.length <= 0) {
		$.alert('请选择一条数据操作')
		return;
	}

	if(row) {
		layer.open({
			title: '添加组织运营者',
			shadeClose: false,
			btn: ['确定'],
			yes: function(index, layero) { //按钮【按钮一】的回调
				var $user = $('#checkMobile').val();
				if(!$user.match(/^\w+$/)) { ///^[1-3]\d{10}$/   手机号码的验证
					$("#error_msg").html("手机格式错误");
					$("#error_msg").css("display", "block");
					$(".p_inp").css("margin-top", "0px");
				} else { //校验成功执行此此处的代码
					$("#error_msg").html("");
					$("#error_msg").css("display", "none");

					obj.ajax('/bg/account/findAccountByMobile', {
						'mobile': $('#checkMobile').val()
					}, function(data) { //校验是否已经是组织运营者
						console.log(data)

						if(data.rows != null) {
							var account = data.rows;
							if(account.oid) {
								layer.close(index); //关闭电话号码框
								//								$.alert('该用户已是组织运营者，无法再添加，请选择其他用户吧！');
								//								$.alert('添加失败！该用户已经是【' + account.orgName + '】的运营者，同一手机号用户只能担任一个组织的运营者，请选择其他用户吧！');
								$.alert('该用户已经是【' + account.orgName + '】的运营者，同一手机号用户只能担任一个组织的运营者，请选择其他用户吧！');
								$(".true_ico").html('') //清空图标
							} else {
								obj.ajax('/bg/account/findAccountByMobile', {
									'mobile': $('#checkMobile').val()
								}, function(data) {
									console.log(data);
									if(data.status == 'OK') {
										layer.close(index); //关闭电话号码框
										$('#user_add_childs').modal('show');
										$('#o-detail-headImg').attr('src', account.photoUrl); //用户头像
										$('#o-detail-username').html(account.realname); //昵称
										$('#o-detail-area').html(account.typeDistrict); //所属地区

										obj.ajax('/common/district/getParentByUserDid', {
											'did': account.did //地区编码
										}, function(data) {
											var s = data.three != null ? data.three : data.two;
											$('#o-detail-area').html(s.districtName); //所属地区 	
										}, function(data) {});

										$('#o-detail-moblie').html(account.mobile); //手机号

										/***用户基本信息提交***/
										username = account.username;
										oid = row[0].oid;
									} else {
										$.alert(data.msg);
									}
								}, function(data) {

								})
							}
						} else {
                            layer.close(index); //关闭电话号码框
							$.alert('该手机号暂未注册成为青年之声个人用户，不能添加为组织运营者!')
						}
					})
				}
			},
			content: '<div id="" style="width: 150px; height: 100px; text-align: center;" ><span id="error_msg"></span> <input type="text" id="checkMobile"  placeholder="运营者手机号" /></div>'
		});
		//		对输入的手机号进行校验   01350304256
		$('#checkMobile').focus(function() { //获取焦点时清空错误信息
			$("#error_msg").html("");
		})
	} else {
		$.alert("请选择一项操作")
	}
}
/****  显示列表的大小 ****/
 function   showMaxImg(obj){
 	
 	$('.img_bg').show();//显示背景框
 	
 	$('#bg_img').attr("src",$(obj).attr('src'));
 	
 }
 /***关闭浏览框***/
 $('.close').click(function(){
 	
 	$('.img_bg').hide();//显示背景框
 })
 
 
/*** 添加运营者 ***/
$('#userAddqxBtn3').click(function() {
	var row = $('#mytb').datagrid('getSelected');
	//	alert($('#o-detail-moblie').html())

	obj.ajax('/bg/organization/addAccountOrg', {
		'mobile': $('#checkMobile').val(),
		'oid': oid,
		'username': username
	}, function(data) {
		console.log(data);
		if(data.status == 'OK') {
			$.alert(data.msg);
			$('#user_add_childs').modal('hide');
		} else {
			$.alert(data.msg);
		}
	}, function(data) {})
})

//删除  子管理员的子选项
function childDel(n) {
	var row = $('#yeTable').datagrid('getSelected');
	if(row) {
		layer.confirm('您确定要删除该用户吗！', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			obj.ajax('/bg/organization/deleteAccountOrg', {
				'username': row.username
			}, function(data) { //执行删除操作
				console.log(data);
				if(data.status == 'OK') {
					//alert(data.msg);
					layer.msg(data.msg, {
						time: 1000,
						icon: 1
					});
					$('#yeTable').datagrid('reload');
				} else {
					layer.msg('删除失败！', {
						time: 1000,
						icon: 1
					});
				}
			}, function() {});
		}, function() {

		});
	} else {
		$.alert('请选择目标');
	}
}

//function addReset(){
//alert(2)
//$('.add_title').html('新增组织');

//}

//三级联动 
$('#cityOid').hide();
$('#shcoolOid').hide();
$('#areaOid').hide();
$('#classOid').hide();
//标签隐藏
$('#show1').hide();
$('#show2').hide();

function changeOidType(n) {
	$('#cityOid').val("-1");
	$('#shcoolOid').val("");
	$('#areaOid').val("");
	$('#classOid').val("");

	var n = $('#oidType').val();
	console.log(n);

	if(n == 1) {
		$('#cityOid').show();
		$('#areaOid').show();

		$('#shcoolOid').hide();
		$('#classOid').hide();

		$('#show1').show();
		$('#show2').show();
	}

	if(n == 2) {
		$('#cityOid').hide();
		$('#areaOid').hide();

		$('#shcoolOid').show();
		$('#classOid').show();

		$('#show1').show();
		$('#show2').show();
	}
}