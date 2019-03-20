 var HearylistApi = {}
 var activityId = "";
 var specialAid = 268;//不显示点赞按钮

 function getRequest() {
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) { //判断是否有参数
			activityId = Utils.getQueryString("activityId");
			$('#hidden_activity_id').val(activityId);
	    $('#project_main').attr('href','zbxm_index_model_2.html?activityId='+activityId+'');   //首页
	    $('#project_detail').attr('href','zbxm_index_model2_detail.html?activityId='+activityId+'');   //项目详情
		  $('#project_dynamic').attr('href','zbxm_index_model2_trends.html?activityId='+activityId+'');   //项目动态
			$('#team').attr('href', 'zbxm_index_model2_team.html?activityId=' + activityId + ''); //参赛团队
			$('.logo a').attr('href','../heavy_project/heavy_main_list.html');   //头部logo
		}
	}
    getRequest();

HearylistApi.getHearyList = function(data) {
	return Qnzs.ApiProxy('/project/enroll/projectList', data, '参赛项目列表');
};
 
 
	function getDatalist(data) {
 			var projectList = data;
		    var html=''
	    	var num= projectList.length <= 10 ? projectList.length : 10;
		    for (var i = 0; i < num; i++) {
					html += '<a href="../heavy_project/projectShow.html?projectId=' + projectList[i].id + '&activityId=' + activityId + '" target="_blank">'
		        html+='<li class="item fl">'
		        html+=' <div class="item_con">'
		        html+='  <div class="work_pic_box">'
			if (projectList[i].imageUrl == '') {
				html += '   <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" alt="" />'
			} else {
				html += '   <img src="' + projectList[i].imageUrl + '" alt="" />'
			}
		        html+='  </div>'
		        html+='  <div class="work_vote">'
		        html+='   <p class="project_name txt">名称：'+projectList[i].projectName+'</p>'
		        html+='   <p class="applicant txt">申报人：'+projectList[i].reporterName+'</p>'
		        if(activityId != specialAid){
		        	html+='   <button class="vote_btn">'+projectList[i].likesNum+'人点赞</button>'
		        }
		        html+='  </div>'
		        html+=' </div>'
		        html+='</li>'
		        html+='</a>'
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
    	var keywordType = '';
    	if (/^[0-9]*$/.test($('#key').val())) {
    		keywordType = 'id';
    	}
    	
    	var data = {
    		'districtId':districtId, //所属地区ID
    	    'keyWord':$('#key').val(),    //标题关键定
    	    'activityId':activityId,    //所属活动ID
    	    'creatorType':$('.select_title.cur').attr('value'),   //参赛者分类
    	    'keywordType': keywordType,	//关键字类型：标题/id
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
    function createReatorType(){                    //获取项目详情
	   	obj.ajax('/project/applicantTypes',{'activityId':activityId},function(data){
	   		console.log(data);
			var applicantTypes = data.dataList;
	   		if (data.status == 'OK') {
				var html = '';
		    	if(applicantTypes == ""){
		    		return;
		    	}
		   	    html+='<span class="select_title fl cur"  value="">全部</span>'
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
	   	},function(data){console.log(1);});
    }
    createReatorType();

 $(document).ready(function() {
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
			$('.content_title').html(labelName.cpxm);//参赛团队
	   	},function(data){console.log(1);});
    }
    ajaxCom();