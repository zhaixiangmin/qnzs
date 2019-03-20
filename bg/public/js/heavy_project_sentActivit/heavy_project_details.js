/** 初始化回显数据列表**************/   
	/*******  获取列表传过来的id值，查询信息   *******/
	var activityId = "";
    var limits = Utils.getQueryString('limits'); // 权限
        activityId = Utils.getQueryString('activityId'); // 权限
       

	/********  获取其他页面传过来的id end ********/
	
obj.ajax('/bg/project/activityDetail',{'activityId':activityId},function(data){
         console.log(data);
        
//       console.log(currActivity);
//       console.log(currActivity.remark);
//       console.log(currActivity.activityDetail.title);
//       console.log(currActivity.activityDetail.content);
//       console.log(currActivity.requirementsList[1].content);
if(data.dataList){
	     	 var currActivity = data.dataList;
	     	$('#activity_id').val(currActivity.id);
	     	
	     	
	     	
	    

		
        /**活动类型***/
		$('#activityType').children('option').each(function(){
				if(currActivity.type == $(this).val()){
					$(this).attr("selected","selected");
					return;
				}
		})
		var allType = "赛事培训评选";
		if(allType.indexOf(currActivity.type) < 1){
				$('#activityType').val("其他");
				$('#activityTypeOther').css('display','block');
				$('#activityTypeOther').val(currActivity.type);
		}
		
		/** 活动名称 ** **/
        $('#activityName').val(currActivity.title);             
         /** 报名、投票时间***/
		$('#beginTime1').datetimebox('setValue',currActivity.startTime);
		$('#endTime1').datetimebox('setValue',currActivity.endTime);
		$('#beginTime2').datetimebox('setValue',currActivity.voteStartTime);
		$('#endTime2').datetimebox('setValue',currActivity.voteEndTime);

        /*** 联系电话  ***/
        $('#ac_mobile').val(currActivity.mobile);//联系电话
      
        /**报名审核**/
        if(currActivity.auditDidsSub == 1){
			$('input[name="radio2"]').attr('checked', 'checked');
        }
       
//      /***回显模板类型  **/'+data.templateName+'
		var curTemplateName = currActivity.templateName;
//		if(curTemplateName != "model1"){
//			curTemplateName = "model2";
//		}
		if(curTemplateName == "model1"){
			
			curTemplateName = "model1";
		}
		if(curTemplateName == "model2"){
			curTemplateName = "model2";
			
		}
		if(curTemplateName == "model4"){
			
			curTemplateName = "model4";
		}
		if(curTemplateName == "model3"){
			
			curTemplateName = "model3";
		}
		
		
        $('#templateName').val(curTemplateName);
	    $('.yulan_box[value ="'+curTemplateName+'"]').addClass('cur');
	    $('.yulan_box[value ="'+curTemplateName+'"]').children(".box_2").css("display","block");
        $('.yulan_box[value ="'+curTemplateName+'"]').children('.choice').stop().animate({"left":"62px"},350);
        
        //根据所选模板隐藏/显示第二步相应模块
//      changeModel(curTemplateName);
        
	    /** banner**/
	    $('#preview2').attr('src',currActivity.bannerUrl);//banner图片url
	     
//	    /*** 活动介绍 ***/
	   	$('#activity_introduce').val(currActivity.remark); //活动介绍
	   	
	    /**项目详情**/
	
	   if(currActivity.activityDetail!=null){
 
	   		$('#porject_id').val(currActivity.activityDetail.id);
	   		$('#porject_title').val(currActivity.activityDetail.title);
	   		KindEditor.html("#project_content",currActivity.activityDetail.content);
	   	    $('.act_detail').summernote('code' ,currActivity.activityDetail.content );
	   }
       
	    
	    
	    
//	    /**项目动态**/
        console.log(currActivity.detailList.length);
		if(currActivity.detailList.length > 0){
        	$('#add_div_activity_detail').html('');
	        var html ='';
			var contentNum = 100 ;
			if(currActivity.detailList.length ==1){
				var n =0;
					for(var i =0; i< currActivity.detailList.length;i++){
						var html ='';
						contentNum += 1;
						html+='<div class="project_in">'
			            html+=           ' <div class="list_t">'
			            html+=                '<div class="title mar_b20 clearfix">'
			            if(contentNum == 101){
			            	html+=                	'<a href="javascript:;" id="upd_add-more-info" >添加一条</a>'
			            }else{
			            	html+=                	'<span href="javascript:;" class="del-more-info">删除</span>'
			            }
			            
			            html+=                    '<em class="fl">标题</em>'
			            html += '<input value="'+currActivity.detailList[i].id+'" type="hidden" name="id">'

			            html+=                   ' <input name="title" class="fl bgf" maxlength="100" type="text" value="'+ currActivity.detailList[i].title+'">'
			            html+=                    '<div class="anniu clearfix fl">'
			            html+=                        '<!-- <span class="delete fl"></span> -->'
			            html+=                        '<span class="jia fl" style="display: none;"></span>'
			            html+=                   '</div>'
			            html+=                '</div>'   
			            html+=            '</div>'
			            html+=            '<div class="list_b">'
			            html+=            	'<em class="fl">内容</em>'
			            html+=                      '<input  name="content"  type="hidden" class ="cat_pro_info'+i+' add_activit_info"/>'
			            html+=                '<div class="edit">'
			            html+=                    '<div class="edit_in" id="div_project_content_'+contentNum+'">'
			            html+=                    	'<!--<textarea name="content" style="width: 100%;height: 100%;"></textarea>-->'
			            html+=                       '<!--富文本框 -->'
			            html+=                        '<!--<textarea id="project_content" name="content" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>-->'
			
			            html+=                                 ' <div class="summernote'+n+'"></div>'          
			            html+=                    	'<!--富文本框  end-->'
			            html+=                    '</div>'
			            html+=                '</div>'
			            html+=            '</div>'
			            html+=        '</div>'
						$('#add_div_activity_detail').append(html);
						fn(currActivity.detailList[i].content ,n);
						n+=1;
						
					}
				
			}
			if(currActivity.detailList.length>1){
				
					var n =0;
					for(var i =1; i< currActivity.detailList.length;i++){
						var html ='';
						contentNum += 1;
						html+='<div class="project_in">'
			            html+=           ' <div class="list_t">'
			            html+=                '<div class="title mar_b20 clearfix">'
			            if(contentNum == 101){
			            	html+=                	'<a href="javascript:;" id="upd_add-more-info" >添加一条</a>'
			            }else{
			            	html+=                	'<span href="javascript:;" class="del-more-info">删除</span>'
			            }
			            
			            html+=                    '<em class="fl">标题</em>'
			            html += '<input value="'+currActivity.detailList[i].id+'" type="hidden" name="id">'
			            html+=                   ' <input name="title" class="fl bgf" maxlength="100" type="text" value="'+ currActivity.detailList[i].title+'">'
			            html+=                    '<div class="anniu clearfix fl">'
			            html+=                        '<!-- <span class="delete fl"></span> -->'
			            html+=                        '<span class="jia fl" style="display: none;"></span>'
			            html+=                   '</div>'
			            html+=                '</div>'   
			            html+=            '</div>'
			            html+=            '<div class="list_b">'
			            html+=            	'<em class="fl">内容</em>'
			            html+=                      '<input  name="content"  type="hidden" class ="cat_pro_info'+i+' add_activit_info"/>'
			            html+=                '<div class="edit">'
			            html+=                    '<div class="edit_in" id="div_project_content_'+contentNum+'">'
			            html+=                    	'<!--<textarea name="content" style="width: 100%;height: 100%;"></textarea>-->'
			            html+=                       '<!--富文本框 -->'
			            html+=                        '<!--<textarea id="project_content" name="content" style="width:800px;height:300px;visibility:hidden; display: block;"></textarea>-->'
	
			            html+=                                 ' <div class="summernote'+n+'"></div>'          
			            html+=                    	'<!--富文本框  end-->'
			            html+=                    '</div>'
			            html+=                '</div>'
			            html+=            '</div>'
			            html+=        '</div>'
						$('#add_div_activity_detail').append(html);
						fn(currActivity.detailList[i].content ,n);
						n+=1;
						
					}
            }
       }
		
         $('#upd_add-more-info').click(function(){
         	
         	upd_add_more_info(n);
         })
       
//	    /***报名要求**/
        html ='';
        var requirementsList = currActivity.requirementsList;
        if(requirementsList.length > 0){
        	$('#activity_requirements_div').html('');
		}
        for(var i =0 ;i<requirementsList.length;i++){
        	html +='<div class="list mar_t20">'
        	html +='<div class="list_t request  clearfix">'
        	html +='<em class="font14 color333 fl">'+(i+1)+'</em>'
	    	html += '<input value="'+requirementsList[i].id+'" type="hidden" name="id">'
        	html += '<input class="fl" value="'+requirementsList[i].content+'" name="content" type="text">'
        	html +='<div class="anniu clearfix fl">'
        	if(i == 0){
        		html +='<span class="jia fl" style="margin-top: 10px;width: 80px;"><a href="javascript:;">currActivity</a></span>'
        	}else{
        		html +='<span class="delete fl" style="margin-top: 10px;width: 80px;">删除</span>'
        	}
        	html +='</div>'
        	html +='</div>'
        	html +='</div>'
        }
        $('#activity_requirements_div').html(html);

	    //评选流程
	    html ='';
	    var timeNum = 0 ;
	    var processList = currActivity.processList;
        if(processList.length > 0){
        	$('#activity_process_div').html('');
		}
	    for(var i =0 ;i<processList.length;i++){
	    	timeNum += 1;
	    	html +=  '<div class="list mar_t20">'
	    	html +=  '<div class="list_t ">'
	    	 html += '<div class="t_box clearfix">'
	    	html +=  '<em class="font14  color333 fl">'+(i+1)+'</em><div class="elect_time pinxuan2 clearfix fl ">'
	    	html += '<input value="'+processList[i].id+'" type="hidden" name="id">'
            html +=  '<input type="text" class="fl month easyui-datebox" name="startTime" placeholder="开始" value="'+processList[i].startTime+'"/>'
            html +=  '<input type="text" class="fl month easyui-datebox" name="endTime" placeholder="结束" value="'+processList[i].endTime+'" />'
            html +=  '<input type="text" class="fl month" name="content" placeholder="示例：项目申报" value="'+processList[i].content+'" maxlength="100"/>'
//		$('#endTime2').datetimebox('setValue',currActivity.voteEndTime);
	    	html += '</div>  '                              
	    	html +=  '<div class="anniu clearfix fl">'
        	if(i == 0){
        		html +='<span class="jia fl" style="margin-top: 10px;width: 80px;"><a href="javascript:;">currActivity</a></span>'
        	}else{
        		html +='<span class="delete fl" style="margin-top: 10px;width: 80px;">删除</span>'
        	}
	    	html +=  '</div>'
	    	html +=  '</div>'
	    	html += '</div>'
	    	html += '</div>'
	    }
	    var targetObj = $('#activity_process_div').html(html);
        $.parser.parse(targetObj);//局部渲染(easyui-datebox样式)

	    //奖项设置
	    html ='';
	    var prizeList = currActivity.prizeList;
        if(prizeList.length > 0){
        	$('#activity_prize_div').html('');
		}
	    for(var i =0 ;i<prizeList.length;i++){
           html += '<div class="list mar_t20">'
           html +='<div class="list_t ">'
           html += '<div class="t_box clearfix">'
           html += '<em class="font14 color333 fl">'+(i+1)+'</em>'
           html += '<div class="elect_time prize1 clearfix fl">'
	       html += '<input value="'+prizeList[i].id+'" type="hidden" name="id">'
           html +='<input type="text" class="fl month" name="ranking" placeholder="示例：一等奖" value="'+prizeList[i].ranking+'" maxlength="10" maxlength="10" />'
           html +='<input type="number" class="fl year" name="count" placeholder="1" value="'+prizeList[i].count+'"/>'
           html +='<input type="text" class="fl month" name="prizes" placeholder="示例：macbook air一台" value="'+prizeList[i].prizes+'" maxlength="20" maxlength="100"/>'
           html += '</div>'                                
           html +='<div class="anniu clearfix fl">'
        	if(i == 0){
        		html +='<span class="jia fl" style="margin-top: 10px;width: 80px;"><a href="javascript:;">currActivity</a></span>'
        	}else{
        		html +='<span class="delete fl" style="margin-top: 10px;width: 80px;">删除</span>'
        	}
            html +='</div>'
            html +='</div>'
            html +='</div>'
            html +='</div>'
        }
        $('#activity_prize_div').html(html);
        
        /**是否显示参赛作品**/
	    $('input[name="takeProject"][value = "'+currActivity.showProject+'"]').attr('checked','checked') //获取被选中Radio的Value值 showProject
	    
	    /**参赛者分类**/
	    if(!currActivity.projectType){
	   	$('#h2_project_type').parent().fadeOut(0);
	    }else{
	     $('#h2_project_type').html(currActivity.projectType);
	    }
//	   $('#projectType').val(currActivity.projectType);
	    
	    /*** 投票指引 **/
	    $('#guide').val(currActivity.voteGuide);
	    /*** 报名指引**/
	    $('#guide2').val(currActivity.enrollGuide) ;
	    
	   /*** 在线咨询**/
	   $('#askUrl').val(currActivity.askUrl)
	   $('#question_title').val(currActivity.questionTitle)//标题
	   KindEditor.html("#question_content",currActivity.questionContent);
	   
	   /*** 附件 **/
	   $('#datazipUrl').val(currActivity.datazipUrl);
	    
	   /***主办单位 承办单位 协办单位***/
    	$('#mainCompany1').val(currActivity.sponsorUnit);//主办单位
    	$('#mainCompany2').val(currActivity.undertakeUnit); //承办单位
    	$('#mainCompany3').val(currActivity.assistUnit) ;//协办单位 
    	
    	   	//自定义标签
		var labelName = currActivity.activityLabelName;
		$('#hdjs').prev().html(labelName.hdjs);//活动介绍
		$('#hdjs').val(labelName.hdjs);//活动介绍
		$('#bmyq').prev().html(labelName.bmyq);//报名要求
		$('#bmyq').val(labelName.bmyq);//报名要求
		$('#hdlc').prev().html(labelName.hdlc);//活动流程
		$('#hdlc').val(labelName.hdlc);//活动流程
		$('#jlsz').prev().html(labelName.jlsz);//奖项设置
		$('#jlsz').val(labelName.jlsz);//奖项设置
		$('#cpxm').prev().html(labelName.cpxm);//参赛者作品
		$('#cpxm').val(labelName.cpxm);//参赛者作品
//		$('#cszfl').prev().html(labelName.cszfl);//参赛者分类
//		$('#cszfl').val(labelName.cszfl);//参赛者分类
		$('#zbdw').prev().html(labelName.zbdw);//主办单位
		$('#zbdw').val(labelName.zbdw);//主办单位
		$('#xbdw').prev().html(labelName.xbdw);//协办单位
		$('#xbdw').val(labelName.xbdw);//协办单位
		$('#cbdw').prev().html(labelName.cbdw);//承办单位
		$('#cbdw').val(labelName.cbdw);//承办单位
		$('#news1').prev().html(labelName.news1);//项目详情
		$('#news1').val(labelName.news1);//项目详情
		$('#newsList1').prev().html(labelName.newsList1);//项目动态
		$('#newsList1').val(labelName.newsList1);//项目动态
    }	
},function(data){})

//报名审核
obj.ajax('/project/auditLowerDids', {
	'activityId': activityId
}, function(data) {
	console.log(data);
	if (data.dataList != null) {
		$('.area').fadeIn(0);
		$('input[name="radio1"][value = "1"]').attr('checked', 'checked');
		var _ul = $('.area_b ul');
		//对获取的数组遍历
		$.each(data.dataList, function(i, ele) {
			_ul.append('<li value="' + ele.did + '" data-attr="' + ele.districtName + '"><div class="font14 color333 clearfix"><span class="fl"><b>X</b></span>' + ele.districtName + '</div></li>');
		})
	} else {
		$('input[name="radio1"][value = "0"]').attr('checked', 'checked');
	}
}, function(data) {})

/*var questionId = $('#askUrl').val();
	console.log(questionId)
if (questionId != null) {
	//在咨询链接
	obj.ajax('/bg/serviceQuestion/findServiceQuestionbyId', {
		'quId':
	}, function(data) {
		console.log(data)
		$('#question_title').val(data.rows.title);
		KindEditor.html("#question_content", data.rows.askContent);
	}, function(data) {})
}*/
