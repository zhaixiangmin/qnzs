
/*********************************************************************************************************************8/
 * 
 */
	var HearylistApi = {}
	var activityId = "";

    
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
	//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		activityId = strs[1];
	//			
		$('#hidden_activity_id').val(activityId);
		$('#sign_up').attr('href', 'openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
		$('#project_main').attr('href','zbxm_index_model_4.html?activityId='+activityId+'');   //首页
	    $('#project_detail').attr('href','zbxm_index_model4_detail.html?activityId='+activityId+'');   //项目详情
		$('#team').attr('href','zbxm_index_model4_team.html?activityId='+activityId+'');   //参赛团队
			$('.logo a').attr('href', '../heavy_project/heavy_main_list.html'); //头部logo
	
		$('#more_heavy_project').attr('href', 'heavy_project_model1_team.html?activityId=' + activityId + ''); //参赛团队-more
		$('#more_detail_list').attr('href', 'heavy_project_model1_trends_dynamic.html?activityId=' + activityId + ''); //项目动态-more
	}
  
 

	HearylistApi.getHearyList = function(data) {
		return Qnzs.ApiProxy('/project/enroll/projectList', data, '参赛项目列表');
	};
	 
 
	function getDatalist(data) {
        var num=8;
	    var html=''
	    for (var i = 0; i < data.length; i++) {
            html += '<a href="../heavy_project/projectShow.html?activityId=' + data[i].id + '" target="_blank">'
			html += '<li class="item fl">'
			html += ' <div class="item_con">'
			html += '  <div class="work_pic_box" style="background-size: cover;">'
			if (data[i].imageUrl == '') {
				html += '   <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" alt="" />'
			} else {
				html += '   <img src="' + data[i].imageUrl + '" alt="" />'
			}
			html += '  </div>'
			html += '  <div class="work_vote">'
			html += '   <p class="project_name txt">名称：' + data[i].projectName + '</p>'
			html += '   <p class="applicant txt">申报人：' + data[i].reporterName + '</p>'
			html += '   <button class="vote_btn">' + data[i].likesNum + '点赞</button>'
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
			html += '</a>'
	    };
		return html;
	}

	/*点击属性数据筛选*/
	function pageCheck(parentCell, contentCell, data, arg) {
		$(parentCell).pageFun({
			contentCell: contentCell,
			/*包裹数据列表的父容器*/
			maxPage: 6,
			/*显示页码框个数*/
			apiProxy: HearylistApi.getHearyList,
			/*接口函数*/
			data: data,
			listFun: getDatalist,
			/*数据列表函数 -- 返回html字符串*/
			arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
 
    /***列表筛选**/
    function sreachList(){
    var html = '';
	html += '<ul id="activityListHtmlStatic"></ul>';
	$('#activityList').html(html);
    	
    	var districtId = getDistrictId();
    	var data = {
    		'districtId':districtId, //所属地区ID
    	    'keyWord':$('#key').val(),    //标题关键定
    	    'activityId':activityId,    //所属活动ID
    	    'creatorType':$('.select_title.cur').attr('value'),   //参赛者分类
    	    'pageIndex':1,      //当前页码
    	    'pageSize' :10      //每页记录数
    	};
    	console.log(data)
//  	sendAjax(data);
	    pageCheck('#activityList', '#activityListHtmlStatic', data);

    }
    
   /*** 关键字查询 **/
   $('.search_btn').click(function(){
   	   sreachList();
   })
   	    
    /******* 动态生成参赛者  ***********/
    function ajaxCom(){                    //获取项目详情
	   	obj.ajax('/project/applicantTypes',{'activityId':activityId},function(data){
//	   		console.log('createReatorType');
	   		console.log(data);
	   		if (data.status == 'OK') {
	   			createReatorType(data.dataList)  //生成参赛者分类
	          /** 大的banner图 **/
	       
	        $('title').html(data.dataList.title);//网页标题
	   		}
	   	},function(data){console.log(1);});
    }
    ajaxCom();
  
    function createReatorType(applicantTypes){
    	var html = '';
    	if(applicantTypes == ""){
    		return;
    	}
   	    html+='<span class="select_title fl"  value="">全部</span>'
    	for(var i=0;i<applicantTypes.length;i++){
   	    	html+='<span class="select_title fl"  value="'+applicantTypes[i]+'">'+applicantTypes[i]+'</span>'
   	    }
    	$('#oidType2').before(html);
    	/*** 参赛者分类的高亮切换  *****/
	    $('.participator_work .select_title').click(function(event) {
	       $(this).addClass('cur').siblings('.select_title').removeClass('cur');
	       $('.participator_work .work_list').eq($(this).index()).show().siblings('.work_list').hide();
   	   	   sreachList();
	    });
    }  
    

 $(document).ready(function() {
 	
 	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
	//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		activityId = strs[1];

	}
  
	var districtId = getDistrictId();
	   
    	var data = {
    		'districtId':districtId, //所属地区ID
    	    'keyWord':$('#key').val(),    //标题关键定
    	    'activityId':activityId,    //所属活动ID
    	    'creatorType':$('.select_title.cur').html(),   //参赛者分类
    	    'pageIndex':1,      //当前页码
    	    'pageSize' :10      //每页记录数
    	};
	pageCheck('#activityList', '#activityListHtmlStatic', data);
})
    /****banner   *****/
    function ajaxCom(){                    //获取项目详情
	   	obj.ajax('/project/activityDetailBaseInfo',{'activityId':activityId},function(data){
	   		console.log(data);
	    

	         $('#banner_center').css("background-image", "url(" + data.dataList.bannerUrl + ")"); //banner图
	   	},function(data){});
    }
    ajaxCom();

