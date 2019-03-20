
var activityId = "";

var questionId = "";
var replyPageNo = 1;

function getRequest() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
		//			    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		activityId = strs[1];
        
		$('#hidden_activity_id').val(activityId);
		$('#sign_up').attr('href', 'openEnroll.html?activityId=' + activityId + ''); //进到重磅项目的时候马上修改我要报名的路径
		$('#project_main').attr('href', 'zbxm_index_model_3.html?activityId=' + activityId + ''); //首页
		$('#project_detalis').attr('href', 'zbxm_index_model3_detail.html?activityId=' + activityId + ''); //详情
		$('#team').attr('href', 'zbxm_index_model3_team.html?activityId=' + activityId + ''); //参赛团队
		$('#project_dynamic').attr('href', 'zbxm_index_model3_trends.html?activityId=' + activityId + ''); //项目动态
		$('.logo a').attr('href', 'heavy_main_list.html'); //头部logo

		$('#more_heavy_project').attr('href', 'heavy_project_model1_team.html?activityId=' + activityId + ''); //参赛团队-more
		$('#more_detail_list').attr('href', 'heavy_project_model1_trends_dynamic.html?activityId=' + activityId + ''); //项目动态-more
	}
}
getRequest();

   
/*******      修改大的banner图        ******/
obj.ajax('/project/activityDetailBaseInfo',{'activityId':activityId},function(data){
 	console.log(data)
    //大的banner图 
    $('#banner_center').css("background-image","url("+data.dataList.bannerUrl+")"); 
    $('.r_news_title').html(data.dataList[0].title);//网页标题
},function(data){});

//重磅项目-项目动态-项目动态
obj.ajax('/project/getActivityDetailList',{'activityId':activityId},function(data){
    console.log(data);
    var detailList = data.dataList;
    var html='';
	
	for (var i=1;i<detailList.length;i++) {
//      html+=   '<li>'
//      html+=       ' <a href="zbxm_index_model2_trends_detail.html?activityId='+ activityId +'&activityDetailId=' + detailList[i].id+'" >'   //项目详情
//      html+=           '<div class="clearfix tr_box">'
//      html+=               '<div class="trends_box_l fl">'
//		if (detailList[i].imageUrl == "") {
//			html += '   <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" alt="" />'
//		} else {
//      	html+=                   '<img src="'+detailList[i].imageUrl+'"alt=""/>'
//		}
//      html+=              '</div>'
//             
//      html+=             ' <div class="trends_box_r fl">'
//      html+=                   '<h4 class="font16 color000">'+detailList[i].title+'</h4>'
//      html+=                 '  <p class="font12 color999 uploading_num">发布时间：'+detailList[i].createTime.substr(0,16)+'</p>'
//      var contentHtml = detailList[i].content.replace(/<\/?.+?>/g,"");
//      html+=                  ' <p class="font14 color666 substance introduce">'+contentHtml+'</p>'
//      html+=               '</div>'
//      html+=          '</div>'
//      html+=      ' </a>'
//      html+=  '</li>'

        html+='<li class="clearfix">'
        html+=           '<a href="zbxm_index_model3_trends_detail.html?activityId='+ activityId +'&activityDetailId=' + detailList[i].id+'" >'
        html+=                 '<em class="fl"></em>'
        html+=                 '<p class="fl clearfix">'
        html+=                 '<span class="font16 fl zhuti">'+detailList[i].title+'</span>'
        html+=               '<span class="font16 fr">'+detailList[i].createTime.substr(0,16)+'</span> '
        html+=                 ' </p> '                              
        html+=           ' </a>'
        html+='</li>'
         
	}
    $('.body_l_list').html(html);
    $('.zhuti').css('width','500px');
    
    
    //热门推荐
    if (detailList[0].imageUrl == "") {    //图片
			html += '   <img src="../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg" alt="" />'
			$('.body_r_pic img').attr('src','../../public/img/head_img/1 (' + parseInt(Math.random() * 40) + ').jpg');
    }else{
			$('.body_r_pic img').attr('src',detailList[0].imageUrl);
    	
	}  
    $('.r_news_title').html('<em class="fl "></em>'+detailList[0].title)  ;
},function(data){});
