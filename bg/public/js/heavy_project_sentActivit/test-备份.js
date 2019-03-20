/*特效begin*/
$(function(){
    var i01 = 1;
    var i02 = 1;
    var i03 = 1;
    var i04 = 1;
    var i05 = 1;
    $('.public div input.cb').click(function(event) {
        $(this).parent().parent('.public02').toggleClass('cur');
    });
    $('.public03 div input.cb').click(function(event) {
        $(this).parent().parent('.public03').toggleClass('cur');
    });
    
    /*删除最后一个选项后，将添加符号赋给上一个元素*/
    $(document).on('click','.flow .content ul li.cur .delete',function(){
        $(this).parent().prev().addClass('cur');
        i01 = $(this).parent().index();
    });

    $(document).on('click','.require .content ul li.cur .delete',function(){
        $(this).parent().prev().addClass('cur');
        i02 = $(this).parent().index();
    });

    $(document).on('click','.project .content ul li.cur .delete',function(){
        $(this).parent().prev().addClass('cur');
        i03 = $(this).parent().index();
    });

    $(document).on('click','.prizes .content ul li.cur .delete',function(){
        $(this).parent().prev().addClass('cur');
        i04 = $(this).parent().index();
    });

    $(document).on('click','.rule .content ul li.cur .delete',function(){
        $(this).parent().prev().addClass('cur');
        i05 = $(this).parent().index();
    });
    /*删除选项*/
    $(document).on('click','.flow .content ul li .delete',function(){
        
        $(this).parent().siblings().each(function(index, el) {
            $(el).children('i').text(index+1);
        });
        i01 = $(this).parent().parent().children('li:last').index();
        if(i01 > 0)
        	$(this).parent().remove();
  
    });

    $(document).on('click','.require .content ul li .delete',function(){
        
        $(this).parent().siblings().each(function(index, el) {
            $(el).children('i').text(index+1);
        });
        i02 = $(this).parent().parent().children('li:last').index();
        if(i02 > 0)
        	$(this).parent().remove();
        
    });

    $(document).on('click','.project .content ul li .delete',function(){
        
        $(this).parent().siblings().each(function(index, el) {
            $(el).children('i').text(index+1);
        });
        i03 = $(this).parent().parent().children('li:last').index();
        if(i03 > 0)
        	$(this).parent().remove();
        
    });

    $(document).on('click','.prizes .content ul li .delete',function(){
        
        $(this).parent().siblings().each(function(index, el) {
            $(el).children('i').text(index+1);
        });
        i04 = $(this).parent().parent().children('li:last').index();
        if(i04 > 0)
        	$(this).parent().remove();
        
    });

    $(document).on('click','.rule .content ul li .delete',function(){
        
        $(this).parent().siblings().each(function(index, el) {
            $(el).children('i').text(index+1);
        });
        i05 = $(this).parent().parent().children('li:last').index();
        if(i05 > 0)
        	$(this).parent().remove();
        
    });
    
    /*--------添加选项------------*/
    /*活动流程*/
    $(document).on('click','.flow_add',function(){
        /*i01++;
        $(this).parent().parent().append('<li class="clearfix"><i>'+i01+'</i><span class="combo datebox"><input type="text" class="easyui-datebox" name="startTime" id="startTime" data-options="deltaX:100"  /><span><span class="combo-arrow"></span></span></span><span class="combo datebox"><input type="text" class="easyui-datebox" name="endTime" id="startTime" data-options="deltaX:100"/><span><span class="combo-arrow"></span></span></span><input name="content" type="text" class="con" placeholder="示例：项目申报" /><em class="delete">×</em><em class="flow_add add">+</em>');
        $(this).parent().removeClass('cur').next().addClass('cur');
    });*/
    	if ($(this).siblings("i").text() != null && $(this).siblings("i").text() != '') {
			i01 = $(this).siblings("i").text();
		}
	  	if(i01==0){
	  		i01++;
	  	}
	  	i01++;
		$(this).parent().parent().append('<li class="clearfix"><i>'+i01+'</i><input type="text" class="start"  onclick="WdatePicker()" placeholder="开始" name="startTime" id="startTime" data-options="deltaX:100"  /><input type="text" class="end" onclick="WdatePicker()" name="endTime" placeholder="结束" id="startTime" data-options="deltaX:100"/><input name="content" type="text" class="con" placeholder="示例：项目申报" /><em class="delete">×</em><em class="flow_add add">+</em>');
		$(this).parent().removeClass('cur').next().addClass('cur');
	 });
   
    

    /*报名要求*/
    $(document).on('click','.require_add',function(){
    	if(i02==0){
    		i02++;
    	}
        i02++;
        $(this).parent().parent().append('<li class="clearfix"><i>'+i02+'</i><input name="content" type="text" class="con" placeholder="示例：年满18岁" maxlength="50"/><input type="hidden" name="type" value="1"><em class="delete">×</em><em class="require_add add">+</em></li>');
        $(this).parent().removeClass('cur').next().addClass('cur');
    });
    
    /*项目要求*/
    $(document).on('click','.project_add',function(){
    	if(i03==0){
    		i03++;
    	}
        i03++;
        $(this).parent().parent().append('<li class="clearfix"><i>'+i03+'</i><input name="content" type="text" class="con" placeholder="示例：项目符合环保理念" maxlength="50"/><input type="hidden" name="type" value="2"><em class="delete">×</em><em class="project_add add">+</em></li>');
        $(this).parent().removeClass('cur').next().addClass('cur');
    });
    
    /*奖励设置*/
    $(document).on('click', '.prize_add', function(){
    	if(i04==0){
    		i04++;
    	}
        i04++;
        $(this).parent().parent().append('<li class="clearfix"><i>'+i04+'</i><input name="ranking" class="prize_kind start" placeholder="示例：一等奖" maxlength="10" /><input name="count" class="prize_count end" placeholder="示例：1" /><input name="prizes" type="text" class="con" placeholder="示例：macbook air一台" maxlength="20" /><em class="delete">×</em><em class="prize_add add">+</em>');
        $(this).parent().removeClass('cur').next().addClass('cur');
    });
    
    /*规则设置*/
    $(document).on('click', '.rule_add', function(){
    	if(i05==0){
    		i05++;
    	}
        i05++;
        $(this).parent().parent().append('<li class="clearfix"><i>'+i05+'</i><input name="weight" class="weight" placeholder="30" /><input name="rule" type="text" class="con" placeholder="示例：在线投票" maxlength="50" /><em class="delete">×</em><em class="rule_add add">+</em>');
        $(this).parent().removeClass('cur').next().addClass('cur');
    });
    
    
    /*电话验证*/
    /*$('#mobile').blur(function(){
    	var myMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    	if(!myMobile.test($('#mobile').val())&&!$.trim($('#mobile').val())==''){
    		alert('请输入正确的手机号码');
    		
    	}
    	if($.trim($('#mobile').val())==''){
			alert('请输入手机号码');
		}
    })*/
    function dump(myObject) { 
    	var s = ""; 
    	for (var property in myObject) { 
    	s = s + "\n"+property +": " + myObject[property] ; 
    	} 
    	alert(s);
    	}
    
    
    //下一步的特效
    $('.next_step').click(function(){
    	var index = $('.step_div').index($(this).parents('.step_div').eq(0));
    	var flag = true;
    	if(index == 0){
        	$('input[require="true"]').each(function(){
        		if($(this).val() == ''){
        			flag = false;
        			alert($(this).closest('div').find('span').text() + '不能为空!');
        			return false;
        		}
        		/*if(this.name == "mobile" && !/^[\d]+$/.test(this.value)){
        			flag = false;
        			alert('请填写正确的电话号码!');
        			return false;
        		}*/
        	});
        	if(flag){
        		var startTime = $('#startTime').datebox('getValue');
    			var endTime = $('#endTime').datebox('getValue');
    			var voteStartTime = $('#voteStartTime').datebox('getValue');
    			var voteEndTime = $('#voteEndTime').datebox('getValue');
    			if(startTime == ""){
    				alert("请选择报名开始日期！");
        			flag = false;
    				return false;
    			}else if(endTime == ""){
    				alert("请选择报名结束日期！");
        			flag = false;
    				return false;
    			}else if(voteStartTime == ""){
    				alert("请选择投票开始日期！");
        			flag = false;
    				return false;
    			}else if(voteEndTime == ""){
    				alert("请选择投票结束日期！");
        			flag = false;
    				return false;
    			}else if(endTime < startTime){
    				alert("报名结束日期小于开始日期，请重新选择！");
        			flag = false;
    				return false;
    			}else if(voteEndTime < voteStartTime){
    				alert("投票结束日期小于开始日期，请重新选择！");
        			flag = false;
    				return false;
    			}
        	}
    	}else if(index == 1){
    		if(!/^[\s\S]{100,1000}$/.test($('#remark').val())){
    			alert("活动介绍内容100字以上1000字以下,若需要介绍更详细或图文显示，可发布相应文章！");
    			$('#remark').focus();
    			return false;
    		}
    		/*if($('#newsUrl').val() && !/^[\d]+$/.test($('#newsUrl').val())){
    			alert("请输入正确文章编号！");
    			$('#newsUrl').focus();
    			return false;
    		}*/
    		
        	//预览
    		var activity = getActivity();
    		var activityLabelName = getActivityLabelName();
    		//校验
    		var processList = activity.processList;
    		delete activity['shenhe'];
    		$.each(processList, function(index, process){
    			if(new Date(process.endTime) < new Date(process.startTime)){
    				flag = false;
    				alert("活动流程开始时间不能大于结束时间，请重新输入!");
    				return false;
    			}
    		});
    		var array= [JSON.stringify(activity),JSON.stringify(activityLabelName)];
    		$.ajax({
    			url: ctx + '/activity/getTemplate/',
    			traditional: true,
    			data: {"array":array},
    			type: "post",								
    			dataType: "JSON",
//    			contentType: 'application/json; charset=utf-8',
    			success: function(data){
    				if(data.errcode == 0){
    					$('#templateDiv').html(data.templateHtml);
    					/*小导航*/
    					 $(".nav_small li").click(function(){
    					        $(this).addClass('current').siblings("li").removeClass('current');
    					        var index=this.lang;
    					        $('.list_box .list0'+index).show().siblings('.list').hide();
    					     });
    					    $("#nav_small_w").width($("#nav_small_w li").length*$("#nav_small_w li").width()+6);

    				}
    			}
           });
    		/*$('#bannerUrl2').attr('src', activity.bannerUrl);//banner图片
    		$('#askMobile').text(activity.mobile);//热线电话
    		$('#activityDate').text(new Date(activity.startTime).Format("yyyy/MM/dd") + '-' + new Date(activity.endTime).Format("yyyy/MM/dd"));//活动起止时间
    		$('#activityRemark').text(activity.remark);//活动介绍

    		//奖励
    		if(activity.prizeList.length > 0){
    			var html = '';
    			$.each(activity.prizeList, function(index, prize){
    				html += '<li>';
    				html += '<img src="'+ctx+'/resources/images/onlineEvents/0'+(index+1)+'_prize.png" alt="" class="pic_touguan" />';
    				html += '<h2>'+prize.ranking +prize.count+'名</h2>';
    				html += '<p>'+prize.prizes+'</p>';
    				html += '</li>';
    			});
    			$('.prize').find('ul').html(html);
    		}else{
    			$('.prize').hide();
    		}
    		//流程
    		if(activity.processList.length > 0){
    			var html = '';
    			$.each(activity.processList, function(index, process){
    				html += '<li>';
    				html += '	<div><img src="'+ctx+'/resources/images/onlineEvents/0'+index+'_process.png" height="42" width="31" alt="" class="img'+index+'" /></div>';
        			html += '	<h3>'+new Date(process.startTime).Format("MM/dd") + ' - ' + new Date(process.endTime).Format("MM/dd")+'</h3>';
    				html += '	<p>'+process.content+'</p>';
    				html += '</li>';
    			});
    			$('.liucheng').find('ul').html(html);
    		}else{
    			$('.liucheng').hide();
    		}

    		//报名要求
    		if(activity.requirementsList.length > 0){
    			var signHtml = '';
    			var missionHtml = '';
    			$.each(activity.requirementsList, function(index, require){
    				if(require.type == 1){
    					signHtml +='<li>';
    					signHtml +='	<em>'+(index + 1)+'</em>';
    					signHtml +='	<span>';
    					signHtml += require.content;
    					signHtml +='	</span>';
    					signHtml +='</li>';
    				}else if(require.type == 2){
    					missionHtml += '<li>';
    					missionHtml += '	<em>'+(index+1)+'</em>';
    					missionHtml += '	<span>';
    					missionHtml += require.content;
    					missionHtml += '	</span>';
    					missionHtml += '</li>';
    				}
    			});
    			$('.enroll_yaoqiu').find('ul').html(signHtml);
    			$('.project_yaoqiu').find('ul').html(missionHtml);
    		}else{
    			$('.enroll_yaoqiu').hide();
    			$('.project_yaoqiu').hide();
    		}
    		//规则
    		if(activity.ruleList.length > 0){
    			var html = '';
    			$.each(activity.ruleList, function(index, rule){
    				html +='<li>';
    				html += '	<em>'+(index+1)+'</em>';
    				html += '	<span>'+rule.rule;
    				if(rule.weight != null && rule.weight != ""){
        				html +='	占比重'+rule.weight+'%';
    				}
    				html += '	</span>';
    				html +='</li>';
    			});
    			$('.huodong_guize').find('ul').html(html);
    		}else{
    			$('.huodong_guize').hide();
    		}
    		//主办
    		if( activity.sponsorUnit){
        		var danweiHtml = '';
    			danweiHtml += '<h3>主办单位</h3>';
    			danweiHtml += '<span>'+activity.sponsorUnit+'</span> />';
        		$('.danwei zhuban').html(danweiHtml);
    		}
    		//协办
    		if( activity.assistUnit){
        		var danweiHtml = '';
    			danweiHtml += '<h3>协办单位</h3>';
    			danweiHtml += '<span>'+activity.assistUnit+'</span> />';
        		$('.danwei chenban').html(danweiHtml);
    		}
    		//承办
			if( activity.undertakeUnit){
        		var danweiHtml = '';
    			danweiHtml += '<h3>承办单位</h3>';
    			danweiHtml += '<span>'+activity.undertakeUnit+'</span> />';
        		$('.danwei xieban').html(danweiHtml);
			}*/
    	}
    	
    	//通过校验，才显示下一步
    	if(flag){
    		$('.step_div').hide();
        	$('.step_div').eq(index + 1).show();
        	$('.head1').removeClass('cur');
        	$('.head2').removeClass('cur');
        	$('.head1').eq(index + 1).addClass('cur');
        	$('.head2').eq(index + 1).addClass('cur');
    	}
    });
    
    //上一步的特效
    $('.last_step').click(function(){
    	var index = $('.step_div').index($(this).parents('.step_div').eq(0));
    	$('.step_div').hide();
    	$('.step_div').eq(index - 1).show();
    	$('.head1').removeClass('cur');
    	$('.head2').removeClass('cur');
    	$('.head1').eq(index - 1).addClass('cur');
    	$('.head2').eq(index - 1).addClass('cur');
    });
});
/*特效end*/

$(function(){
	//加载下级组织
	$('input[name="shenhe"]').change(function(){
		if($(this).val() == '指定下级组织审核'){
			$.getJSON(ctx + '/commons/organization/getOrganizationByParentId?parentId=' + oid, function(data){
				if(data.length > 0){
					var html = '';
					$.each(data, function(index, organization){
						//activity_oid是编辑时活动的组织id
						if(activity_oid == organization.oid){
							html += '<option value="'+organization.oid+'" selected>'+organization.name+'</option>';
						}else{
							html += '<option value="'+organization.oid+'">'+organization.name+'</option>';
						}
					});
					$('.orgId').show(0);
					$('#orgId').html(html);
				}
			});
		}else{
			$('.orgId').hide(0);
			$('#orgId').html('');
		}
	});
	//上传banner图片
	$('#up_img').change(function(){
		$.ajaxFileUpload({
            url: ctx+'/file_upload', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'up_img', //文件上传域的ID
            dataType: 'JSON', //返回值类型 一般设置为json
            success: function (data, status){
            	data = JSON.parse(data);
            	if(data.error == 0){
            		$('#bannerUrl').val(data.url);
            		$('#imgShow').attr('src',data.url);
            		$('#imgdiv').show();
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
		});
	});
	
	//上传附件图片
	$('#attachment').change(function(){
		$.ajaxFileUpload({
            url: ctx+'/file_upload', //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'attachment', //文件上传域的ID
            dataType: 'JSON', //返回值类型 一般设置为json
            success: function (data, status){
            	data = JSON.parse(data);
            	if(data.error == 0){
            		$('#attachmentUrl').val(data.url);
            		$('#attachmentShow').attr('src',data.url);
            		$('#attachmentdiv').show();
            	}
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
		});
	});
	//新增表单提交
	$('#add_btn').click(function(){
		var activity = getActivity();
		var activityLabelName = getActivityLabelName();
		
		delete activity['shenhe'];
		$("#add_btn").html('提交中...');
		$("#add_btn").attr('onclick','');
		var array= [JSON.stringify(activity),JSON.stringify(activityLabelName)];
		$.ajax({
        	 url: ctx + '/activity/addActivity',
        	 traditional: true,
        	 data: {"array":array},
        	 type: "post",
        	 dataType: "JSON",
//        	 contentType: 'application/json; charset=utf-8',
        	 success: function(data){
        		 if(data.errcode == 0){
        			 alert(data.msg);
        			 parent.$('#win_button_activity').window('close');
        		 }else{
        			 alert("添加出错，请稍后再试！");
        			 parent.$('#win_button_activity').window('close');
        		 }
        	 }
        }); 
	});
	
	//修改表单提交
	$('#edit_btn').click(function(){
		var activity = getActivity();
		var activityLabelName = getActivityLabelName();
		delete activity['shenhe'];
		$("#edit_btn").html('提交中...');
		$("#edit_btn").attr('onclick','');
		var array= [JSON.stringify(activity),JSON.stringify(activityLabelName)];
        $.ajax({
        	 url: ctx + '/activity/editActivity',
 			 traditional: true,
        	 data: {"array":array},
        	 type: "post",
        	 dataType: "JSON",
//        	 contentType: 'application/json; charset=utf-8',
        	 success: function(data){
        		 if(data.errcode == 0){
        			 alert(data.msg);
        			 parent.$('#win_button_activity').window('close');
        		 }else{
        			 alert("修改出错，请稍后再试！");
        			 parent.$('#win_button_activity').window('close');
        		 }
        	 }
        }); 
	});
});

function getActivity(){
	var object = {};
	//获取活动基本信息
	var activity = $('#ff_activity').serializeJSONObject();
	//获取组织id
	var organization = {};
	if(activity.shenhe == '所有下级组织可审核'){
		organization['oid'] = oid;
	}else{
		organization['oid'] = $('#orgId').val();
	}
	//获取活动流程
	var processList = [];
	if($('#ff_process').find(':checkbox').is(':checked')){
		processList = $('#ff_process').serializeJSONArray();
	}
	//获取报名要求和项目要求并合并数组
	var ff_sign = [];
	if($('#ff_sign').find(':checkbox').is(':checked')){
		ff_sign = $('#ff_sign').serializeJSONArray();
	}
	var ff_mission = [];
	if($('#ff_mission').find(':checkbox').is(':checked')){
		ff_mission = $('#ff_mission').serializeJSONArray();
	}
	var requirementsList = ff_sign.concat(ff_mission);
	//获取奖励设置
	var prizeList = [];
	if($('#ff_prize').find(':checkbox').is(':checked')){
		prizeList = $('#ff_prize').serializeJSONArray();
	}
	
	//获取附件设置 
	var datazipUrl = '';
	if($('#datazipUrl').find(':checkbox').is(':checked')){
		datazipUrl = $('input[name="fileUrl"]').val();
	}

	//获取评选规则
	var ruleList = [];
	if($('#ff_rule').find(':checkbox').is(':checked')){
		ruleList = $('#ff_rule').serializeJSONArray();
	}
	
	//文章详情1
	var newsUrl1 = '';
	if($('.news1').find(':checkbox').is(':checked')){
		newsUrl1 = $('#newsUrl1').val();
	}
	//文章详情2
	var newsUrl2 = '';
	if($('.news2').find(':checkbox').is(':checked')){
		newsUrl2 = $('#newsUrl2').val();
	}
	//文章列表1
	var newsList1 = '';
	if($('.newsList1').find(':checkbox').is(':checked')){
		var checkedCount = $("input[name='newsList1']:checked").length;
		var index = 0;
		$("input[name='newsList1']:checked").each(function(){
			index += 1;
			newsList1 += $(this).val();
			if(index < checkedCount){
				newsList1 += ",";
			}
		});
	}
	//文章列表2
	var newsList2 = '';
	if($('.newsList2').find(':checkbox').is(':checked')){
//		newsList2 = $('#_newsList2').val();
//		var checkedCount2 = $("input[type=checkbox][name='newsList2'][checked]").length;
		var checkedCount2 = $("input[name='newsList2']:checked").length;
		var index2 = 0;
		$("input[name='newsList2']:checked").each(function(){
			index2 += 1;
			newsList2 += $(this).val();
			if(index2 < checkedCount2){
				newsList2 += ",";
			}
		});
	}
	
	//参评项目
	var enrollProject = '';
	if($('.canping').find(':checkbox').is(':checked')){
		enrollProject = $('#cpxm').val();
	}
	
	//获取活动介绍
	var remark = $('#remark').val();
	//获取主办单位
//	var sponsorUnit = $('#sponsorUnit').val();
	var sponsorUnit = '';
	if($('.zhuban').find(':checkbox').is(':checked')){
		sponsorUnit = $('#sponsorUnit').val();
	}
	//获取协办单位
//	var assistUnit = $('#assistUnit').val();
	var assistUnit = '';
	if($('.xieban').find(':checkbox').is(':checked')){
		assistUnit = $('#assistUnit').val();
	}
	//获取承办单位
//	var undertakeUnit = $('#undertakeUnit').val();
	var undertakeUnit = '';
	if($('.chengban').find(':checkbox').is(':checked')){
		undertakeUnit = $('#undertakeUnit').val();
	}
	//获取联系电话
	var mobile = $('#mobile').val();
	//获取在线咨询链接
	var askUrl = $('#askUrl').val();
	
	//封装为请求的json对象
	activity['remark'] = remark;
	activity['organization'] = organization;
	activity['processList'] = processList;
	activity['requirementsList'] = requirementsList;
	activity['prizeList'] = prizeList;
	activity['ruleList'] = ruleList;
	activity['sponsorUnit'] = sponsorUnit;
	activity['assistUnit'] = assistUnit;
	activity['undertakeUnit'] = undertakeUnit;
	activity['mobile'] = mobile;
	activity['askUrl'] = askUrl;
	activity['newsUrl1'] = newsUrl1;
	activity['newsUrl2'] = newsUrl2;
	activity['newsList1'] = newsList1;
	activity['newsList2'] = newsList2;
	activity['enrollProject'] = enrollProject;
	activity['datazipUrl'] = datazipUrl;
	
	/*activity['startTime']  = $('#startTime').datetimebox('getValue');
	activity['endTime']  = $('#endTime').datetimebox('getValue');
	activity['voteStartTime']  = $('#voteStartTime').datetimebox('getValue');
	activity['voteEndTime']  = $('#voteEndTime').datetimebox('getValue');*/
	return activity;
}

function getActivityLabelName(){
	//获取活动基本信息
	var activity = $('#ff_activity').serializeJSONObject();
	var actId = activity['id'];//活动id
	var hdjs = $('#hdjs').val();//活动介绍/详情
	var news1 = $('#news1').val();
	var news2 = $('#news2').val();
	var newsList1 = $('#newsList1').val();
	var newsList2 = $('#newsList2').val();
	var hdlc = $('#hdlc').val();//活动流程
	var bmyq = $('#bmyq').val();//报名要求
	var xmyq = $('#xmyq').val();//项目要求
	var fj = $('#fj').val();//附件
	var jlsz = $('#jlsz').val();//奖励设置
	var pxgz = $('#pxgz').val();//评选规则
	var zbdw = $('#zbdw').val();//主办单位
	var xbdw = $('#xbdw').val();//协办单位
	var cbdw = $('#cbdw').val();//承办单位
	var zxzxlj = $('#zxzxlj').val();//在线咨询链接
	var cpxm = $('#cpxm').val();//参评项目
	
	var txt = '{"actId":"'+actId+'",'+
	'"hdjs":"'+hdjs+'","news1":"'+news1+'",' +
	'"news2":"'+news2+'","newsList1":"'+newsList1+'",' +
	'"newsList2":"'+newsList2+'",' +
	'"hdlc":"'+hdlc+'","bmyq":"'+bmyq+'",' +
	'"xmyq":"'+xmyq+'","fj":"'+fj+'",'+
	'"jlsz":"'+jlsz+'","pxgz":"'+pxgz+'",'+
	'"pxgz":"'+pxgz+'","zbdw":"'+zbdw+'",'+
	'"xbdw":"'+xbdw+'","cbdw":"'+cbdw+'",'+
	'"zxzxlj":"'+zxzxlj+'","cpxm":"'+cpxm+'"'+
	'}';
	return JSON.parse(txt);
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


//附件上传
function uploadFile(){
	$('#pickFileBtnNext').html("上传中......");
	var dir  = 'activityFile';
	var fileList =  document.getElementById("up_file").files;
	$.ajaxFileUpload({
        url: ctx+'/file_upload', //用于文件上传的服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'up_file', //文件上传域的ID
        dataType: 'JSON', //返回值类型 一般设置为
        success: function (data, status){
        	data = JSON.parse(data);
        	if(data.error == 0){
    		    //alert("上传成功");
    		    $('input[name="fileUrl"]').val(data.url);
    		    $('#pickFileBtnNext').html("上传结束");
        	}
        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
            alert(e);
        }
	});
	
}






















