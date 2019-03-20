var activityId = "";

$(function(){
	
	function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			activityId = strs[1];
	        $('#project_main').attr('href','zbxm_index_model_2.html?activityId='+activityId+'');   //首页
	        $('#project_detail').attr('href','zbxm_index_model2_detail.html?activityId='+activityId+'');   //项目详情
		    $('#project_dynamic').attr('href','zbxm_index_model2_trends.html?activityId='+activityId+'');   //项目动态
			$('#team').attr('href', 'zbxm_index_model2_team.html?activityId=' + activityId + ''); //参赛团队
			$('.logo a').attr('href','../heavy_project/heavy_main_list.html');   //头部logo
			
		//隐藏我要报名按钮和参赛者列表
		if(activityId == 373){
			$('.participator_work').hide();
		}
		}
	}
    getRequest();
   
	function ajaxCom(){                    //获取项目详情
	   	obj.ajax('/project/activityDetail',{'activityId':activityId},function(data){
	   		console.log(data);
		   	if(data.status == 'ERROR'){
                $.alert(data.msg);//ID有误
				return;
			}
			var currActivity = data.dataList;
		
	        /** 大的banner图 **/
	        $('#banner_center').css("background-image","url("+currActivity.bannerUrl+")"); 
	        $('title').html(currActivity.title);//网页标题
	        //自定义标签
			var labelName = currActivity.activityLabelName;
			$('#project_detail').html(labelName.news1);//项目详情
			$('#project_dynamic').html(labelName.newsList1);//项目动态
			$('#team').html(labelName.cpxm);//参赛团队
			$('#dynamicOul').parent().prev().html(labelName.newsList1);//项目动态
	   	},function(data){console.log(1);});
    }
    ajaxCom();
	
	//重磅项目-项目动态-项目动态
		obj.ajax('/project/getActivityDetailList',{'activityId':activityId},function(data){
            console.log(data);
            var detailList = data.dataList;
            var html='';
			
			for (var i=0;i<detailList.length;i++) {
                html+=   '<li>'
                html+=       ' <a href="zbxm_index_model2_trends_detail.html?activityId='+ activityId +'&activityDetailId=' + detailList[i].id+'" >'   //项目详情
                html+=           '<div class="clearfix tr_box">'
                html+=               '<div class="trends_box_l fl">'
				if (detailList[i].imageUrl == "") {
					html += '   <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" alt="" />'
				} else {
                	html+=                   '<img src="'+detailList[i].imageUrl+'"alt=""/>'
				}
                html+=              '</div>'
                       
                html+=             ' <div class="trends_box_r fl">'
                html+=                   '<h4 class="font16 color000">'+detailList[i].title+'</h4>'
                html+=                 '  <p class="font12 color999 uploading_num">发布时间：'+detailList[i].createTime.substr(0,16)+'</p>'
                var contentHtml = detailList[i].content.replace(/<\/?.+?>/g,"");
                html+=                  ' <p class="font14 color666 substance introduce">'+contentHtml+'</p>'
                html+=               '</div>'
                html+=          '</div>'
                html+=      ' </a>'
                html+=  '</li>'
			}
            $('#dynamicOul').html(html);
        },function(data){});
})