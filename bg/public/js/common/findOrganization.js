var imageCount = 0;//图片数量
	$(function(){
		/*初始化加载地市组织*/
		$.ajax({
			type: 'POST',
			url: ctx + '/getAllOrganizationByType',
			data:{'userOrgType':1},
			dataType:'json',
			success:function(data){
				if(data){
					var selected = false;
					var option = null;
					option = new Option("--市级--", "-1");
					var selects = document.getElementById("cityOid");
					selects.options.add(option);
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].name, data[i].oid, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#cityOid").html("<option value='-1'>--暂无可选组织--</option>");
				}
			}
		});
		/*初始化加载高校组织*/
		$.ajax({
			type: 'POST',
			url: ctx + '/getAllOrganizationByType',
			data:{'userOrgType':2},
			dataType:'json',
			success:function(data){
				if(data){
					var selected = false;
					var option = null;
					option = new Option("--请选择--", "-1");
					var selects = document.getElementById("shcoolOid");
					selects.options.add(option);    
					for(var i=0; i < data.length; i++){
						option = new Option(data[i].name, data[i].oid, null, selected);
						selects.options.add(option);
					}
					if(!selected){
						selects.options[0].selected=true;
					}
				}else{
					$("#shcoolOid").html("<option value='-1'>--暂无可选的高校组织--</option>");
				}
			}
		});
		
	    $(document).on('focus','.imgdiv input',function(){
	        $(this).addClass('bgClear');
	    });
	    $(document).on('blur','.imgdiv input',function(){
	        if($(this).val()==''){
	            $(this).removeClass('bgClear');
	        }else{
	            $(this).addClass('bgClear');
	        }
	    });
	});
	
	//切换地市/高校
	function changeOidType(obj){
		var type = $(obj).val();
		$("#idType").val(type);
		$('#fullName').val(''); 
		$('#fullNames').val(''); 
		$('#reporterName').val(''); 
		$('#reporterNames').val(''); 
		if(type == -1){
//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
			$("#cityOid").css("display","none");
			$("#areaOid").css("display","none");
			$("#shcoolOid").css("display","none");
			$("#classOid").css("display","none");
			$('#district_div').hide();
		}else if(type == 1){
			$("#shcoolOid").css("display","none");
			$("#classOid").css("display","none");
			$("#cityOid").show();
			$("#areaOid").show();
		/*	$("#cityOid").css("display","block");
			$("#areaOid").css("display","block");*/
//			if($("#cityOid").val() != "-1"){
//				$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/yes.png'/>");
//			}else{
//				$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
//			}
			$('#district_div').hide();
		}else if(type == 2){
			$("#cityOid").css("display","none");
			$("#areaOid").css("display","none");
			$("#shcoolOid").show();
			$("#classOid").show();
			/*$("#shcoolOid").css("display","block");
			$("#classOid").css("display","block");*/
//			if($("#shcoolOid").val() != "-1"){
//				$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/yes.png'/>");
//			}else{
//				$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
//			}
			$('#district_div').show();
		}
	}
	
	//获取高校下级 shcoolOid classOid
	function schoolOidChange(obj){
		var pid = $(obj).val();
		$("#reporterNames").val(pid);
		var areaHtml = $('#classOid').html('');
		if(pid != "-1"){
			$(obj).css("color","#333");
//			$("#oidLabel").html('<img width="28px" src="'+ctx+'/resources/images/yes.png"/>');
			areaHtml.removeAttr("disabled");
			$.ajax({
				type: 'POST',
				url: ctx + '/getAllOrganizationByType',
				data:{'userOrgType':2,'organizationId':pid},
				dataType:'json',
				success:function(data){
					if(data.length > 0){
						var selected = false;
						var option = null;
						option = new Option("--分院--", "-1");
						var selects = document.getElementById("classOid");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].name, data[i].oid, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						areaHtml.removeAttr("disabled");
					}else{
						$("#classOid").html("<option value='-1'>--暂无--</option>");
						areaHtml.attr("disabled","true");
					}
				}
			});
		}else{
			areaHtml.html("<option value='-1'>--分院--</option>");
			areaHtml.attr("disabled","true");
			$(obj).css("color","#999");
//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
		}
	}
	
	//获取区/县
	function cityOidChange(obj){
		var pid = $(obj).val();
		$("#reporterName").val(pid);
		$("#reporterNames").val("-1");
		var areaHtml = $('#areaOid').html('');
		if(pid != "-1"){
			$(obj).css("color","#333");
//			$("#oidLabel").html('<img width="28px" src="'+ctx+'/resources/images/yes.png"/>');
			areaHtml.removeAttr("disabled");
			$.ajax({
				type: 'POST',
				url: ctx + '/getAllOrganizationByType',
				data:{'userOrgType':1,'organizationId':pid},
				dataType:'json',
				success:function(data){
					if(data.length > 0){
						var selected = false;
						var option = null;
						option = new Option("--区/县--", "-1");
						var selects = document.getElementById("areaOid");
						selects.options.add(option);
						for(var i=0; i < data.length; i++){
							option = new Option(data[i].name, data[i].oid, null, selected);
							selects.options.add(option);
						}
						if(!selected){
							selects.options[0].selected=true;
						}
						areaHtml.removeAttr("disabled");
					}else{
						$("#areaOid").html("<option value='-1'>--暂无--</option>");
						areaHtml.attr("disabled","true");
					}
				}
			});
		}else{
			areaHtml.html("<option value='-1'>--区/县--</option>");
			areaHtml.attr("disabled","true");
			$(obj).css("color","#999");
//			$('#oidLabel').html("<img width='28px' src='"+ctx+"/resources/images/no.png'/>&nbsp;&nbsp;请选择地市/高校");
		}
	}
	
	//图片上传
	function uploadImage(){
		var dir  = 'activityImage';
		$.ajaxFileUpload({
            url: ctx+'/file_upload?dir='+dir, //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'up_img', //文件上传域的ID file
            dataType: 'JSON', //返回值类型 一般设置为json
            success: function (data, status){
            	data = JSON.parse(data);
            	if(data.error == 0){
            		$('#imgShow_0'+imageCount).attr('src',data.url);
            		$('#imageUrl_0'+imageCount).val(data.url);
            		imageCount += 1;
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
		});
		$('.imgL .imgdiv').eq(imageCount).css('display','block');
        if(imageCount < 7){
            $('.imgAdd').before('<div id="imgdiv_0'+(imageCount+1)+'" class="imgdiv" style="float:left;display:none;"><div class="imgOut"><img id="imgShow_0'+(imageCount+1)+'" class="imgShow" /></div><span class="cover"></span><input type="hidden" name="imageUrl" id="imageUrl_0'
            		+(imageCount+1)+'"><input name="imageComment" type="text" class="describe describe_spe" placeholder="描述一下这个图片"/></div>');
        }else{
        	$('.imgAdd').css('display','none');
        }
	}
	//附件上传
	function uploadFile(){
		$('#promptSpan').html("上传中......");
		var dir  = 'activityFile';
		var fileList =  document.getElementById("up_file").files;
		$.ajaxFileUpload({
            url: ctx+'/file_upload?dir='+dir, //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'up_file', //文件上传域的ID
            dataType: 'JSON', //返回值类型 一般设置为
            success: function (data, status){
            	data = JSON.parse(data);
            	if(data.error == 0){
        		    var dd = document.getElementById('fileUrlDiv');
        		    if(fileList.length > 0){
     		            var fileUrls = data.url.split(",");
            		    for( var i = 0 ; i < fileList.length ; i++ ){
            		           dd.innerHTML += fileList[i].name+"<br>";
            		           dd.innerHTML += '<input type="hidden" name="fileUrl" value="'+fileUrls[i]+'">';
            		    }
        		    }else{
     		           dd.innerHTML += fileList[0].name+"<br>";
     		           dd.innerHTML += '<input type="hidden" name="fileUrl" value="'+data.url+'">';
        		    }
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
		});
		$('#promptSpan').html("文件请控制在10M以内，文件类型为DOC/DOCX/RAR/ZIP格式(如有多份文件建议压缩后上传)");
	}
	
	function mySubmit(){
		if(verify()){
			$("#submitVc").html('提交中...');
			//ajax插入表单
			 $.ajax({
	        	 url: ctx + '/activityProject/projectEnroll',
	        	 data:$('#fm_enroll').serialize(),
	        	 type: "post",
	        	 dataType: "JSON",
	        	 //contentType: 'application/json; charset=utf-8',
	        	 success: function(data){
	        		 if(data.errcode == 0){
	 					$("#submitVc").html('提交成功！');
	 					alert('您的报名资料已成功提交！通过初审的项目名单将在广东“青年之声”相关栏目进行公示，敬请留意。');
	      				$("input,textarea").val("");
	      				window.location.href = ctx + "/activityProject/activityShow";
	        		 }else{
	 					$("#submitVc").html('<a href="#" onclick="javascript:mySubmit();">确认提交</a>');
						alert(data.msg);
						if(data.errcode == 1){
							//验证码错误
							nextImg();
							$('#code').val('');
						}else if(data.errcode == 3){//未登录
							window.location.href = ctx + "/index";
						}
					}
	        	 }
	        }); 
		}
	}
	
	function verify(){
    		if($("#reporterName").val() == ''){
    			alert("还有'申报者'一栏未填写");
    			$("#reporterName").focus();
    			return false;
    		}
    		var oid = oidValue();
    		if(oid == "-1" || oid == ""){
    			alert("请选择所属地市/高校");
    			$("#oid").focus();
    			return false;
    		}
    		if($("#mobile").val() == ''){
    			alert('请输入您的联系电话');
    			$("#mobile").focus();
    			return false;
    		}else if(!isMobile($("#mobile").val())){
    			alert("请填写正确的电话号码");
    			$("#mobile").focus();
    			return false;
    		}
    		if($("#email").val() == ''){
    			alert('请填写联系邮箱');
    			$("#email").focus();
    			return false;
    		}else if(!isEmail($("#email").val())){
    			alert("请填写正确的邮箱地址");
    			$("#email").focus();
    			return false;
    		}
    		if($("#projectName").val() == ''){
    			alert('请填写项目名称');
    			$("#projectName").focus();
    			return false;
    		}
    		if($("#projectIntroduce").val() == ''){
    			alert('请填写项目/个人简介');
    			$("#projectIntroduce").focus();
    			return false;
    		}
    		var videoUrl = $("#videoUrl").val();
    		if(videoUrl != '' && isVideoUrl(videoUrl)){
    			alert('无效的视频链接，请检查。');
    			$("#videoUrl").focus();
    			return false;
    		}
    		return true;
	}
	
	function oidValue(){
		var type = $("#oidType").val();
		if(type == 1){
			if($('#areaOid').val() != "-1"){
				$("#oid").val($("#areaOid").val());
			}else{
				$("#oid").val($("#cityOid").val());
			}
		}else if(type == 2){
			if($('#classOid').val() != "-1"){
				$("#oid").val($("#classOid").val());
			}else{
				$("#oid").val($("#shcoolOid").val());
			}
		}
		return $("#oid").val();
	}
	
	function isEmail(value){
		return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/i.test(value);
	}
	
	function isUserName(value){
		return  /^[\w]{6,12}$/.test(value);
	}
	
	function isMobile(value){
		return  /^[\d]+$/.test(value);
	}
	
	function isVideoUrl(value) {// 验证url  
	    var strRegex="^((https|http|ftp|rtsp|mms)?://)"  
	    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@  
	    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
	    + "|" // 允许IP和DOMAIN（域名）  
	    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
	    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
	    + "[a-z]{2,6})" // first level domain- .com or .museum  
	    + "(:[0-9]{1,4})?" // 端口- :80  
	    + "((/?)|" // a slash isn't required if there is no file name  
	    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
	    var re=new RegExp(strRegex); 
	    return re.test(value); 
	} 