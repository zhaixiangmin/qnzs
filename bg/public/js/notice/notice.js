
	
	/*** 获取权限 ***/
    var limits = Utils.getQueryString('limit'); // 权限
    console.log('limits', limits);
    /***  隐藏权限 ***/
    $('#toolbar li').hide(); // 隐藏所有按钮

    if(limits) {
        limits = limits.split(','); // 将字符串解析成数组
        for(var i=0; i<limits.length; i++) {
            var limit = limits[i];
            $('.' + limit).show(); // 显示权限按钮
        }
    }

	//HeavyProjectApi.activityListUrl
	    /*表格初始化*/
	    $('#notice-partake').datagrid({ title: '公告管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1500,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/notice/findAllNotice',   //获取表格数据时请求的地址
	           columns:[[
	             {field:'id',title:'编号',width:50,sortable:true},
	             {field:'title',title:'标题',width:200},
	             {field:'type',title:'公告类型',width:100},
	             {field:'orgName',title:'发布者',width:200},
	             {field:'createTime',title:'发布时间',width:150},
	             {field:'isTop',title:'是否置顶',width:100,
	                formatter: function(value,row,index){
			        	if(value == 0){
			        		return '否';
			        	}else if(value == 1){
			        		return '是';
			        	}
			        },sortable:true
	             },
	             {field:'status',title:'使用状态',width:100,
	                formatter: function(value,row,index){
			        	if(value == 1){
			        		return '禁用';
			        	}else if(value == 0){
			        		return '正常';
			        	}
			        },sortable:true
	             },
	             {field: 'yulan',title: '预览',align: 'center',formatter: formatView,width: 50}
	          ]],
	           pagination:true,//如果表格需要支持分页，必须设置该选项为true
	           pageNumber: 1,
	           pageSize:15,   //表格中每页显示的行数
	           pageList:[15,100,200],
	           rownumbers:true,   //是否显示行号
	           nowrap: false,   
	           striped: true,  //奇偶行是否使用不同的颜色
	           method:'get',   //表格数据获取方式,请求地址是上面定义的url
	           sortName: 'ID',  //按照ID列的值排序
	           sortOrder: 'desc',  //使用倒序排序
	           idField: 'id',
	           loadMsg:'数据正在努力加载，请稍后...', //加载数据时显示提示信息
	           singleSelect:true,
	           frozenColumns: [[  //固定在表格左侧的栏
	                       {field: 'ck', checkbox: true}
	                     ]],
	            onClickRow: function(index, data) {
	                //将所有checkbox修改为未选中
	                $('#notice-partake').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
	                //将这次的checkbox标记为选中
	                $('#notice-partake').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	            
	});
    
    //隐藏列
//  $("#notice-partake").datagrid('hideColumn', 'activityId');
    
    //预览活动详情
function formatView(val, row, index) {
	var row = $('#notice-partake').datagrid('getData').rows[index];
//	var templateUrl = "notice_detail.html?noticeId=" + row.id+"&backPage=2";
//	var html = '<a href="' + templateUrl + ' " target="_blank">预览</a>';
	var html = '<a href="#" onclick="showNoticeDetail(' + row.id+')">预览</a>';
	return html;
}
    
	/*清空查询*/
	$('#clearBtn').click(function(event) {
	  $('#keyWord,#searchType,#isTop,#status').val('');
	});
	
	//数据过滤
	$('#searchBtn').bind('click', function(event) {
	      $('#notice-partake').datagrid({
	        queryParams: {
	          'keyWord': $('#keyWord').val(),
	          'type': $('#searchType').val(),
	          'isTop': $('#isTop option:selected').val(),
	          'status':$("#status option:selected").val()
	        }
	      })
	});
	
//弹出发布框
function addNotice(){
        $('#notice-add').modal('show');
	 	$('#add_title').val('');
     	$('#summernote').summernote('code','');
     	$('#fileUrl').val('');
		$('#pickFileBtnNext').html('<em style="color: red; ">非必填（请压缩为zip格式上传，文件名中勿带有","、"/"、"+"等中英文标点符号，否则将会上传失败。）</em>');
}

//发布
$('#btn_add_notice').click(function() {
		  var noticeData = {
		  	'title' : $('#add_title').val(),
		  	'type' : $("#add_type option:selected").val(),
		  	'content' : $('#summernote').summernote('code'), //活动介绍信息
		  	'fileUrl' : $('#fileUrl').val()
		  }
		  console.log(noticeData);

		if (noticeData.title.length == 0) {
			alert("请输入20字以内的标题");
			$('#add_title').focus();
			return;
		}

		$('#btn_add_notice').html('提交中...');
		$.ajax({
				type: "POST",
				url: Qnzs.path + "/bg/notice/addNotice",
				data: noticeData,
				dataType: "JSON",
				success: function(data) {
					alert(data.msg);
        			$('#notice-add').modal('hide');
				}
		});
		$('#btn_add_notice').html('确定发布');
		$('#notice-partake').datagrid('reload');
});

function uploadFile() {
	$('#pickFileBtnNext,#edit_pickFileBtnNext').html("上传中......");
}

//弹出编辑框
function editNotice(){
	 	var row = $('#notice-partake').datagrid('getSelected');
	    if(row){
        	$('#notice-edit').modal('show');
	 	    obj.ajax('/bg/notice/noticeDetail',{'noticeId':row.id},function(data){
	 	   	    console.log(data);
    			var notice = data.dataList;
	 	   	    $('#edit_title').val(notice.title);
	 	   	    setSelectChecked('edit_type', notice.type);
     			$('#summernote_edit').summernote('code',notice.content);
       			//附件
     			$('#edit_fileUrl').val('');
       			$('#fileUrlOld').html('');
       			
       			var tempFileUrl = notice.fileUrl;
       			console.log(tempFileUrl.length);
       			if(tempFileUrl.length > 0){
       				var index = tempFileUrl.indexOf('_');
					var fileHtml = tempFileUrl.substr(index+4);
   	    			$('#fileUrlOld').html('原：'+fileHtml+'<a href="'+ tempFileUrl +'">&nbsp;&nbsp;&nbsp;&nbsp;下载</a>');
       			}
				$('#edit_pickFileBtnNext').html('<em style="color: red; ">非必填（请压缩为zip格式上传，文件名中勿带有","、"/"、"+"等中英文标点符号，否则将会上传失败。）</em>');
       		},function(data){});
	    }else{
	     	alert('请选择目标！');
	     	$('#user-look').modal('hide');
	    }
}
	
//修改
$('#btn_edit_notice').click(function() {
	 	var row = $('#notice-partake').datagrid('getSelected');
		  var noticeData = {
		  	'noticeId' : row.id,
		  	'title' : $('#edit_title').val(),
		  	'type' : $("#edit_type option:selected").val(),
		  	'content' : $('#summernote_edit').summernote('code'), //活动介绍信息
		  	'fileUrl' : $('#edit_fileUrl').val()
		  }
		  console.log(noticeData);

		if (noticeData.title.length == 0) {
			alert("请输入20字以内的标题");
			$('#add_title').focus();
			return;
		}
		if (noticeData.content.length < 100 || noticeData.content.length > 3000) {
			alert("请输入100-3000个字符以内的正文内容");
			return;
		}
		
		$('#btn_edit_notice').html('提交中...');
		$.ajax({
				type: "POST",
				url: Qnzs.path + "/bg/notice/editNotice",
				data: noticeData,
				dataType: "JSON",
				success: function(data) {
					alert(data.msg);
        			$('#notice-edit').modal('hide');
				}
		});
		$('#btn_edit_notice').html('确定修改');
		$('#notice-partake').datagrid('reload');
});
	
//	审核（0-启用，1-禁用,2-删除）
function auditedNotice(status, keyWord) {
	var row = $('#notice-partake').datagrid('getSelected');
	console.log(row.id);
	if (row) {
			if (status == row.status) {
				alert('该公告已经是'+ keyWord +'状态！')
				return;
			}else if(status == 2 && row.status != 1){
				alert('当前公告为启用中，禁用状态下的公告才能删除！')
				return;
			}
		
		layer.confirm('您确定要（' + keyWord + '）该公告吗？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			layer.closeAll('dialog');
			obj.ajax('/bg/notice/auditNotice', {
				'noticeId': row.id,
				"status": status
			}, function(data) { //执行删除操作
				if (data.status == 'OK') {
					layer.confirm(data.msg);
					$('#notice-partake').datagrid('reload');
				} else {
					layer.confirm(data.msg);
				}
			}, function() {});
		}, function() {});
	} else {
		alert('请选择目标');
	}
}

//0-取消置顶，1-置顶
function topNotice(isTop, keyWord) {
	var row = $('#notice-partake').datagrid('getSelected');
	console.log(row.id);
	if (row) {
		if (isTop == row.isTop) {
				alert('该公告已经是'+ keyWord +'状态！')
				return;
		}
		
		layer.confirm('您确定要（' + keyWord + '）该公告吗？', {
			btn: ['确定', '取消'] //按钮
		}, function() {
			layer.closeAll('dialog');
			obj.ajax('/bg/notice/topNotice', {
				'noticeId': row.id,
				"isTop": isTop
			}, function(data) {
				if (data.status == 'OK') {
					layer.confirm(data.msg);
					$('#notice-partake').datagrid('reload');
				} else {
					layer.confirm(data.msg);
				}
			}, function() {});
		}, function() {});
	} else {
		alert('请选择目标');
	}
}

/** 
 * 设置select选中 
 * @param selectId select的id值 
 * @param checkValue 选中option的值 
 * @author lqy 
 * @since 2015-08-21 
*/  
function setSelectChecked(selectId, checkValue){  
    var select = document.getElementById(selectId);  
    for(var i=0; i<select.options.length; i++){  
        if(select.options[i].innerHTML == checkValue){  
            select.options[i].selected = true;  
            break;  
        }  
    }  
}; 

//预览
function showNoticeDetail(noticeId){     
    	$('#notice-detail').modal('show');               //获取项目详情
	   	obj.ajax('/bg/notice/noticeDetail',{'noticeId':noticeId},function(data){
	   		console.log(data);
	   		var notice = data.dataList;
	        $('#titleShow').html(notice.title);
	        $('#createTimeShow').html('发布时间：'+ notice.createTime);
	        $('#createOrgShow').html('发布者：'+notice.orgName);
	        $('#typeShow').html('公告类型：'+notice.type);
	        $('#contentShow').html(notice.content);
   	    	$('#fileUrlShow').html('相关附件：无');
	        
	        var tempFileUrl = notice.fileUrl;
       		if(tempFileUrl.length > 0){
       			var index = tempFileUrl.indexOf('_');
				var fileHtml = tempFileUrl.substr(index+4);
   	    		$('#fileUrlShow').html(fileHtml);
   	    		$('#fileUrlShow').html('相关附件：'+fileHtml+'<a href="'+ tempFileUrl +'">&nbsp;&nbsp;&nbsp;&nbsp;下载</a>');
       		}
	   	},function(data){console.log(1);});
    }

		