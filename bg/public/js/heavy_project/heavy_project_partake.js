
	
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
	    $('#project-partake').datagrid({ title: '活动管理',  //表格名称           iconCls: 'icon-edit',  //图标
	           width:1500,   //表格宽度
	           height:520,   //表格高度，可指定高度，可自动
	           border:true,  //表格是否显示边框
	           url:base+'/bg/project/enroll/projectList',   //获取表格数据时请求的地址
	           columns:[[
	             {field:'id',title:'编号',width:50,sortable:true},
	             {field:'activityId',title:'所属项目',width:50},
	             {field:'projectName',title:'标题',width:200},
	             {field:'reporterName',title:'申报人/组织',width:200},
	             {field:'enrollTime',title:'报名时间',width:150},
	             {field:'mobile',title:'联系电话',width:100,
	                formatter: function(value,row,index){
			        	return  value.substr(0,(value.length-4))+'****';
			        },sortable:true
	             },
	             {field:'email',title:'邮箱',width:150},
	             {field:'creatorType',title:'类别',width:50,sortable:true},
	             {field:'districtName',title:'所属地区',width:100},
	             {field:'activityName',title:'所属项目',width:200},
	             {field:'accMobile',title:'申报者账号',width:100,
	                formatter: function(value,row,index){
			        	return  value.substr(0,(value.length-4))+'****';
			        },sortable:true
	             },
	             {field:'status',title:'审核状态',width:50,
	                formatter: function(value,row,index){
			        	if(value ==1){
			        		return '通过';
			        	}else if(value==2){
			        		return '不通过';
			        	}else if(value==0){
			        		return  '待审核';
			        	}
			        },sortable:true
	             },
	             {field:'likesNum',title:'支持数',width:50,sortable:true}
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
	           singleSelect:false,
	           frozenColumns: [[  //固定在表格左侧的栏
	                       {field: 'ck', checkbox: true}
	                     ]],
	            
	            onClickRow: function(index, data) {
	                //将所有checkbox修改为未选中
	                $('#project-partake').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox'] ").attr("checked", false);
	                //将这次的checkbox标记为选中
	                $('#project-partake').datagrid("getPanel").find(".datagrid-view2 .datagrid-body table input[type='checkbox']:eq(" + index + ") ").attr("checked", true);
	            }
	            
	});
    
    //隐藏列
    $("#project-partake").datagrid('hideColumn', 'activityId');
    
	/*清空查询*/
	$('#clearBtn').click(function(event) {
	  $('#projectId,#projectName,#activityName,#beginTime,#endTime,#creatorType').val('');
	  $('#beginTime').datebox('setValue','');
	  $('#endTime').datebox('setValue','');
	});
	
	//数据过滤
	$('#areaBtn').bind('click', function(event) {
	      $('#project-partake').datagrid({
	        queryParams: {
	          'projectId': $("#projectId").val(),     //项目编码
	          'keyWord': $('#projectName').val(),   //项目名称
	          'activityName': $('#activityName').val(),//活动名称
	          'enrollTime' :$('#beginTime').datebox('getValue'),
	          'endTime':$('#endTime').datebox('getValue'),
	          'creatorType': $('#creatorType').val(), //参赛者类别
	          'status':$("#auditStatusSel option:selected").val(),
	          'districtId':getDistrictId()
	        }
	      })
	});
	
	//查看参赛者详情
	function look(n){
	 	var row = $('#project-partake').datagrid('getSelections');

        if(row.length > 1 || row.length <= 0) {
            $.alert('请选择一条数据操作')
            return;
        }

        if(row){
	 	    $('#user-look').modal('show');
	 	    obj.ajax('/project/enroll/projectDetailAll',{'projectId':row[0].id},function(data){
	 	   	     console.log(data);
    			var project = data.dataList;
	 	   	    $('#projectName_look').html(project.projectName);     //项目名称
	 	   	    $('#mobile_look').html(project.mobile);  //联系电话
	 	   	    $('#reporterName_look').html(project.reporterName);  //申请人
       			$('#projectIntroduce').html(project.projectIntroduce);  //简介
//	   	   	    $('#projectFileList_look1').html(project.projectFileList[0].fileUrl);

				//封面图片
	   	   	    $('.cover_box').html('');
	   	   	    if (project.imageUrl != '') {
					$('.cover_box').css("display","block");
	   	   	    	var html = '<h2>封面图片:</h2>';
	   	   	    	html += '<p style="margin-left:120px;" ><img src="'+ project.imageUrl +'" style="width: 500px;height: auto;display: block;"/></p>';
		        	$('.cover_box').append(html);
	   	   	    } else{
					$('.cover_box').hide();
		        }
	   	   	    
	   	   	    //项目附件
	   	   	    $('.file_box').html('');
	   	   	    if (project.projectFileList != '') {
					$('.file_box').css("display","block");
	   	   	    	var html = '<h2>报名附件:</h2>';
			        for(var i=0; i<project.projectFileList.length; i++) {
			            var projectFile = project.projectFileList[i];
			            var fileNameIndex = projectFile.fileUrl.lastIndexOf("/");
			            var fileName = projectFile.fileUrl.substring(fileNameIndex+1);
			            html += '<p style="margin-left:120px;" >'+ fileName +'<a href="'+ projectFile.fileUrl +'">&nbsp;&nbsp;&nbsp;&nbsp;下载</a></p>'
			        }
		        	$('.file_box').append(html);
	   	   	    } else{
					$('.file_box').hide();
		        }
	   	   	     
	   			//风采展示图片
	   	   	    $('.imageList').html('');
		        if (project.projectImageList != '') {
					$('.img_box').css("display","inline-block");
		       		var html = '';
			        for(var i=0; i<project.projectImageList.length; i++) {
			            var projectImage = project.projectImageList[i];
			            if (i == 0) {
			            	html += '<li><div class="fencai_item" style="width: 500px;height: auto;margin-left: 120px;">'
			            } else{
			            	html += '<li><div class="fencai_item" style="width: 500px;height: auto;margin-left: 120px;margin-top: 80px;">'
			            }
			            html += '<img src="'+ projectImage.imageUrl +'" style="width: 500px;height: auto;display: block;"/>'
			        	html += '</div>'
			        	html += '<p style="width: 500px; margin:5px 0 -50px 0;text-align: center; margin-left: 120px;">'+ projectImage.imageComment +'</p></li>'
			        }
		        	$('.imageList').append(html);
		        	
		        } else{
					$('.img_box').hide();
		        }
	 	   	   
	 	   	   
	 	   	    //风采展示-视频
        
				if(project.videoUrl != ''){
					var j =   project.videoUrl.split('//');
					console.log(j)
					if(j[0]=="https:"){
						
						var h = project.videoUrl.split('https://v.qq.com/x/');  //自己上传的 视频
						
					}else{
						var h = project.videoUrl.split('http://v.qq.com/x/');  //自己上传的 视频
						
						
					}
					
			         sh =h;
			         console.log(sh);
			        h= h[1].split('/');
			        console.log(h);
			        if(h[0]=='page'){   //自己上传的视频
			        	video_id =sh[1];
			        	video_id = video_id.split('/');
			        	video_id = video_id[1].split('.');
			        	video_id =video_id[0];
			        } 
			        if(h[0]=='cover'){    //腾讯的视频
			        	video_id =sh[1];
			        	video_id = video_id.split('/');
			        	if(video_id.length==2){
				        	video_id = video_id[1].split('.');
				        	video_id =video_id[0];
			        	
			        	}
			        	if(video_id.length==3){
			        		console.log(video_id)
			        		video_id = video_id[2].split('.');
				        	video_id =video_id[0];
			        	}
			        	
			        }
				        console.log(video_id);
					$('.youku-box').show(); //显示视频播放框
					$('.img iframe').attr('src','https://v.qq.com/iframe/player.html?vid='+video_id+'&tiny=0&auto=0') 
					$('.img iframe').attr('width','100%'); //设置宽度百分百
					$('.img iframe').attr('height','400'); //设置宽度百分百
					
				}else{
					$('.youku-box').hide(); //隐藏视频播放框
					
				}
				//风采展示-视频 end
				
	 	    },function(data){});
	    }else{
	     	alert('请选择目标！');
	     	$('#user-look').modal('hide');
	    }
	 }
	
	//图片上传处理 start    ----------------------------------/
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
	    $(document).ready(function(){
	    	//#file
	    	$('#image_file').fileupload({
				url: base +  '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
	
					imageUrl = data.result.url;
//					$('#preview2').attr('src',imageUrl);
				},
				fail: function() {
					alert('出错');
				}
			});
	        $('#Updatefile').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
					alert('上传成功')
//					alert(data.result.url);
					imageUrl2 = data.result.url;
					$('#preview0').attr('src',imageUrl2) ;  //回显图片
				},
				fail: function() {
					alert('出错');
				}
			});
	        //附件上传
	        $('#up_file').fileupload({
				url: base + '/file_upload',
				dataType: 'json',
				autoUpload: true,
				done: function(e, data) {
//					alert(data.result.url);
					alert("上传成功");
					$('#projectFileList_hidden_input').val(data.result.url); //附件地址
					$('#pickFileBtnNext').html("上传成功");
				},
				fail: function() {
					alert('出错');
				}
			});
	    });
	//图片上传处理  end ----------------------------------/
	
	//修改 -回显
	var s =new Array();   //图片
    var b= new Array();   //图片说明
    var c= new Array();
    var projectId ='';
    var activityId = '';
    var creatorType ='';	//参赛者分类
    var districtId = '';	//所属地区
	function updateAct(n){

	 	var row = $('#project-partake').datagrid('getSelections');
        if(row.length > 1 || row.length <= 0) {
            $.alert('请选择一条数据操作')
            return;
        }
	 	$('#upd_imgshow input[name="imageComment"]').each(function(i , e){
   	      	   $(this).attr('value','')   //清空value值
	 	});
	 	
	    if(row){
	        projectId = row[0].id;
	        activityId = row[0].activityId;
	        districtId = row[0].districtId;
	        creatorType = row[0].creatorType;
	    	
	    	$('#updateActivite').modal('show');
	        obj.ajax('/project/enroll/projectDetail',{'projectId':projectId},function(data){
			 	    $('#reporterName').val(data.dataList.reporterName);    //申报者名称
			 	    $('#mobile').val(data.dataList.mobile);    // 联系电话
			 	    $('#email').val(data.dataList.email);  //邮箱的设置
			 	    $('#upd_projectName').val(data.dataList.projectName);  //项目名称
			 	    $('#upd_projectIntroduce').val(data.dataList.projectIntroduce);  //项目简介
			 	    $('#upd_videoUrl').val(data.dataList.videoUrl);  //视频链接
	       	        $('#preview0').attr('src',data.dataList.imageUrl);  // 首页 bnner图
		       	    $('#fileProjectId').val(projectId);	//附件上传
		       	    //恢复默认值
	  				setSelectChecked('oidType', '--请选择--');  //地区类型
	  				setSelectChecked('shcoolOid', '--请选择--');
	  				setSelectChecked('cityOid', '--请选择--');
	  				setSelectChecked('areaOid', '--区/县--');
	  				setSelectChecked('classOid', '--分院--');
	  				setSelectChecked('createReatorType', '--请选择--');
	  				
	       	        //附件
	       	        var projectFileList=  data.dataList.projectFileList;
	       	        if(projectFileList.length > 0){
		       	        $('#fileId').val(projectFileList[0].id);
//		       	        $('#fileProjectId').val(projectFileList[0].projectId);
		       	    }else{
		       	        $('#fileId').val('');
		       	        $('#projectFileList_hidden_input').val('');
						$('#pickFileBtnNext').html('<em style="color: red; ">（请压缩为zip格式上传，文件名中勿带有","、"/"、"+"等中英文标点符号，否则将会上传失败。）</em>');
		       	    }
	       	        
	       	        //风采展示start
	       	        var projectImageList = data.dataList.projectImageList;
	       	        var html ='';
	       	        $('#upd_imgshow').html('');
	       	        if(projectImageList.length > 0){
		       	        for(var i= 0;i<projectImageList.length;i++){
		       	         	html+= '<div style="width: 500px; margin-top: 10px;">'
	                        html+=	'<div>'
		                    html+=        '<img id="preview'+(i+1)+'" height="100" border="0" title=""  src="'+projectImageList[i].imageUrl+'" />'
		                    html+=        '<div  class="btn upload" style="width: 250px;"><input type="file" name="image_file" id="Updatefile_img'+(i+1)+'" class="upload_pic" onChange="fileSelected(preview'+(i+1)+',image_file1);" /></div>'
		                    html+=		'<input type="hidden" name="id" value="'+projectImageList[i].id+'" />'
		                    html+=		'<input type="hidden" name="projectId" value="'+projectImageList[i].projectId+'" />'
		                    html+=		'<input id="imageUrl'+(i+1)+'" type="hidden" name="imageUrl" value="'+projectImageList[i].imageUrl+'" />'
	                        html+=	'</div>'
	                        html+='</div>'
	                        html+='<div>'
		                    html+=    '<input type="" name="imageComment" value="'+projectImageList[i].imageComment+'" placeholder="请输入图片描述" class="imageComment  form-control" />'
	                        html+='</div>'
		       	        }
		       	        $('#upd_imgshow').append(html);
		       	        $('#projectImageList').show();
	       	        }else{
	       	        	$('#upd_imgshow').html('');
	       	        	$('#projectImageList').hide();
	       	        }
	       	        /*if (projectImageList.length < 8) {
	       	        		var i = projectImageList.length;
//	       	        		<div style="width: 500px; margin-top: 20px; "><b>添加一张</b></div>
	       	        		var html = ''
		       	         	html+= '<div style="width: 500px; margin-top: 10px;">'
	                        html+=	'<div>'
		                    html+=        '<img id="preview'+(i+1)+'" height="100" border="0" title=""  src="" />'
		                    html+=        '<div  class="btn upload" style="width: 250px;"><input type="file" name="image_file" id="Updatefile_img'+(i+1)+'" class="upload_pic" onChange="fileSelected(preview'+(i+1)+',image_file1);" /></div>'
		                    html+=		'<input type="hidden" name="projectId" value="'+row.id+'" />'
		                    html+=		'<input id="imageUrl'+(i+1)+'" type="hidden" name="imageUrl" value="" />'
	                        html+=	'</div>'
	                        html+='</div>'
	                        html+='<div>'
		                    html+=    '<input type="" name="imageComment" value="" placeholder="请输入图片描述" class="imageComment  form-control" />'
	                        html+='</div>'
		       	        	$('#upd_imgshow').append(html);
	       	        }*/
							$('#Updatefile_img1').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview1').attr('src',imageUrl);
									$('#imageUrl1').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img2').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview2').attr('src',imageUrl);
									$('#imageUrl2').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img3').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview3').attr('src',imageUrl);
									$('#imageUrl3').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img4').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview4').attr('src',imageUrl);
									$('#imageUrl4').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img5').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview5').attr('src',imageUrl);
									$('#imageUrl5').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img6').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview6').attr('src',imageUrl);
									$('#imageUrl6').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img7').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview7').attr('src',imageUrl);
									$('#imageUrl7').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
							$('#Updatefile_img8').fileupload({
								url: base +  '/file_upload',
								dataType: 'json',
								autoUpload: true,
								done: function(e, data) {
						             alert('上传成功')
									imageUrl = data.result.url;
									$('#preview8').attr('src',imageUrl);
									$('#imageUrl5').val(imageUrl);
								},
								fail: function() {
									alert('出错');
								}
							});
					    //风采展示 end
	        });
	        
	        loadOid(activityId,districtId);	//可选地区
	        createReatorType(creatorType);	//生成参赛者分类
	    }else{
	     	alert('请选择目标！');
	     	$('#updateActivite').modal('hide');
	    }
	 }
	
	//修改 -提交
	function editProject(){
	 	var row = $('#project-partake').datagrid('getSelections');
		var projectObj = {};
		projectObj['id'] = row[0].id;
		projectObj['reporterName'] = $('#reporterName').val();	//申报人
		projectObj['mobile'] = $('#mobile').val();				//电话
		projectObj['email'] = $('#email').val();				//邮箱
		projectObj['projectName'] = $('#upd_projectName').val();	// 项目名称   ,标题
		projectObj['projectIntroduce'] = $('#upd_projectIntroduce').val();// 项目简介
		projectObj['imageUrl'] = $('#preview0')[0].src;			//封面图片地址
		projectObj['videoUrl'] = $('#upd_videoUrl').val();		//视频链接
		projectObj['districtId'] = getDid();         		//所属地区
		projectObj['creatorType'] = $('#createReatorType').val();       			//参赛者分类----
		projectObj['projectImageList'] = $('#projectImageList').serializeJSONArray();//风采图片
		projectObj['projectFileList'] = $('#projectFileList').serializeJSONArray();  // 附件地址 
		console.log(projectObj)
		
		var validate = $("#form2").form('validate'); 
		    if (!validate) {  
			    $.messager.alert("确认", '请正确填写表单！',"",function(){  
			      $("#form2").find(".validatebox-invalid:first").focus();  
			    });  
		    	return false ;
		    }else {
		        $.messager.confirm('修改', '是否确认修改?', function(r){
		            if(r){
		            	obj.ajax('/bg/project/enroll/editProject',{
				 	        'projectStr' : JSON.stringify(projectObj)
				 	    },function(data){ 
				 	    	console.log(data);
				 	    	if(data.status=='OK'){
						    		alert(data.msg);
						    		$('#updateActivite').modal('hide');
						    		$('#project-partake').datagrid('reload');
						    }else {
						    		alert(data.msg);
						    }
				 	    },function(data){});
		            }
		        });
		    }
	}
	
	
	function auditedProjectOld(status, keyWord) {
        var rows = $("#project-partake").datagrid('getSelections');
        if (rows.length==0){
            $.alert('请选择目标');
            return;
        }
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].id);
        }
        if(rows.length == 0){
			alert('请选择目标');
        }else  if(rows.length > 10){
			alert('单次最多批量操作10个参赛者');
        }else{
            layer.confirm('您确定要（' + keyWord + '）所选参赛者吗？', {
				btn: ['确定', '取消'] //按钮
			}, function() {
				layer.closeAll('dialog');
				
				var ids = [];
	            for (var i = 0; i < rows.length; i++) {
	                ids.push(rows[i].id);
	            }
				obj.ajax('/bg/project/enroll/auditProjectList', {
					'projectIds': ids.toString(),
					'status': status
				}, function(data) {
					if (data.status == 'OK') {
						layer.confirm(data.msg);
						$('#project-partake').datagrid('reload');
					} else {
						layer.confirm(data.msg);
					}
				}, function() {});
			}, function() {});
        }
	}
	

	//审核（0-待审核，2-不通过）
	function auditedProject(status, keyWord) {
		var rows = $('#project-partake').datagrid('getSelections');
		console.log(rows)

		if (rows.length==0){
			$.alert('请选择目标');
			return;
		}

        var ids = [];
        for (var i = 0; i < rows.length; i++) {
            ids.push(rows[i].id);
        }
        alert(ids)
		if (rows) {

			$('#auditedProject').modal('show');
			$('#auditedProjectH4').html(keyWord);

			$('#btn-forbidden').click(function() {
				obj.ajax('/bg/project/enroll/auditProjectList', {
					'projectIds': ids.toString(),
					'status': status,
					'advice': $('#auditedAdvice').val()
				}, function(data) {
					if (data.status == 'OK') {
						$('#project-partake').datagrid('reload');
						$('#auditedProject').modal('hide');
					} else {
						layer.confirm(data.msg);
					}
				}, function() {});
			});

		} else {

			$('#auditedProject').modal('hide');
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


	
