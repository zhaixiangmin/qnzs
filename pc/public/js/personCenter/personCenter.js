//Qnzs.path = Qnzs.env.dev_wyh;//
// Qnzs.path = Qnzs.env.dev

var currentAccount = "";

$(document).ready(function() {

	$.ajax({
		type: "POST",
		url: Qnzs.path + "/commons/getSessionAccount",
		dataType: "JSON",
		success: function(data) {
		
			if(data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				currentAccount = data.account; // 账户信息
				console.log('currentAccount', currentAccount);
			}
		}
	});

	$('#my_join').on('click', function() {//点击参与加载数据
		
		getEnrolledList();
	});


  $('#my_collection').on('click', function() {//点击收藏加载数据
		
		my_collect_act();
	});
	
	
	$('#second_classroom').on('click', function() {//点击第二课堂加载数据
		
		second_class_table();
	});
	
	
	/*左侧菜单导航*/
	/*var nav_txt=['我的参与','我的发布','我的关注','我的收藏','我的消息','我要吐槽','个人资料','修改密码','一号通','第二课堂','咨询导师','管理后台']
	function nav_list(){
	    var html=''
	    for (var i = 0; i < nav_txt.length; i++) {
	        html+='<a href="javascript:;" class="font18 item a'+(i+1)+'">'
	        html+=' <div class="divOut">'
	        html+='  <div class="divIn clearfix">'
	        html+='   <em></em><span>'+nav_txt[i]+'</span>'
	        html+='  </div>'
	        html+=' </div>'
	        html+=' <i></i>'
	        html+='</a>'
	    };
	    $('.big_nav').append(html);
	    $('.big_nav .item:first').addClass('cur');
	}
	nav_list();*/
	/*左侧菜单导航 end*/

	/*---我的参与---*/

	function getEnrolledList() {
     var actStatus = {
		'1': '活动预告',
		'2': '报名中',
		'3': '已满员',
		'4': '报名结束',
		'5': '活动中',
		'6': '活动结束'
	};

	if(!currentAccount) {

		alert('请先登录');
		return;
	} else {
		
		$.ajax({
			type: "get",
			url: Qnzs.path + "/personalCenter/offlineActivity/enrolledList",
			dataType: 'json',
			success: function(data) {
				
				var data = data.rows;
				var html = ''

				for(var i = 0; i < data.length; i++) {
					var item = data[i];
					html += '<li class="clearfix list_content bgcWhite">'
					html += ' <a href="javascript:;">'
					html += '  <div class="content_box borderB01 clearfix">'
					html += '   <div class="zhd_l fl">'
					html += '   <p class="img01">' + actStatus[item.actStatus] + '<p>'
					html += '    <img src="' + item.imageUrl + '"  alt="" />'
					html += '   </div>'
					html += '   <div class="zhd_r">'
					html += '    <h3 class="font16 color000">' + item.title + '</h3>'
					html += '    <p class="font12 zhd_style p01">' + item.type + '</p>'
					html += '    <p class="font12 color999 zhd_time">' + item.activityTime + '</p>'
					html += '    <p class="font12 color999 zhd_adress">' + item.address + '</p>'
					html += '   </div>'
					html += '   <span class="conBgc01 font12 colorfff atctivs">' + actStatus[item.actStatus] + '</span>'
					html += '  </div>'
					html += ' </a>'
					html += '</li>'
				};
				$('.my_join_content .act_list').append(html);
				$('.my_join_content .content_box:last').removeClass('borderB01');

			}

		});

	}

}

	// 个人中心-我的参与 -重磅项目
	function my_join_zb() {
		obj.ajax('/project/myJoinActivityList', {}, function(data) {

			createEle(data.rows); //  传递参数

		}, function(data) {
			console.log(1);
		});

		function createEle(data) {

			var html = ''
			var num = 5;
			for(var i = 0; i < data.length; i++) {
				html += '<div class="bgcWhite">'
				if (data[i].externalLinksPc == '') {
					if (data[i].templateName == "model1") {
						html += '<a href="../heavy_project/heavy_project_model1_index.html?activityId=' + data[i].id + '">'
					} else {
						html += '<a href="../heavy_project_model2/zbxm_index_model_2.html?activityId=' + data[i].id + '">'
					}
				} else {
					html += '<a href="' + data[i].externalLinksPc + '" target="_blank">'
				}
				html += '  <div class="imgDiv"><img src="' + data[i].bannerUrl + '" /></div>'
				html += '  <div class="botTxt clearfix">'
				html += '   <span class="span01 fl">' + data[i].type + '</span>'
				html += '   <span class="span02 fl">' + data[i].title + '</span>'
				html += '   <div class="r fr clear">'
				html += '    <em class="em01 colorfff conBgc01 fl">剩</em>'
				html += '    <em class="em02 color000 fr">' + data[i].endTime + '</em>'
				html += '   </div>'
				html += '  </div>'
				html += ' </a>'
				html += '</div>'
			};
			$('.my_join_content .imgList').append(html);

			$('.my_join_content .imgList>div:even').addClass('fl');
			$('.my_join_content .imgList>div:odd').addClass('fr');
		}

	}
	my_join_zb();
	/*---我的参与---*/

	//个人人中心-我的发布-重磅项目

	function heavy_send() {
		obj.ajax('/project/myReleaseActivityList', {}, function(data) {

			createEle(data.rows); //  传递参数

		}, function(data) {
			console.log(1);
		});

		function createEle(data) {

			var html = ''
			var num = 5;
			for(var i = 0; i < data.length; i++) {
				html += '<div class="bgcWhite">'
			if(data[i].externalLinksPc == ''){
				if (data[i].templateName == "model1") {
					html += '<a href="../heavy_project/heavy_project_model1_index.html?activityId=' + data[i].id + '">'
				} else {
					html += '<a href="../heavy_project_model2/zbxm_index_model_2.html?activityId=' + data[i].id + '">'
				}
			}else{
				html += '<a href="' + data[i].externalLinksPc + '" target="_blank">'
			}
				html += '  <div class="imgDiv"><img src="' + data[i].bannerUrl + '" /></div>'
				html += '  <div class="botTxt clearfix">'
				html += '   <span class="span01 fl">' + data[i].type + '</span>'
				html += '   <span class="span02 fl">' + data[i].title + '</span>'
				html += '   <div class="r fr clear">'
				html += '    <em class="em01 colorfff conBgc01 fl">剩</em>'
				html += '    <em class="em02 color000 fr"></em>'
				html += '   </div>'
				html += '  </div>'
				html += ' </a>'
				html += '</div>'
			};
			$('.my_release_content .imgList').append(html);
			$('.my_release_content .imgList>div:even').addClass('fl');
			$('.my_release_content .imgList>div:odd').addClass('fr');
		}
	}
	heavy_send();

	//我的发布 咨询
	function createEle(data) {
		var num = 4;
		var html = ''
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="itemBox bgcWhite ">'
			html += ' <div class="itemCon borderB01 clearfix">'
			html += '  <div class="imgDiv fl"><img src="resources/pcImages/person01.png"></div>'
			html += '  <div class="rightTxt">'
			html += '   <h3 class="font16 color2185cf">如何更好的去忘掉一个人？</h3>'
			html += '   <p class="color000">幸福不同于心情和稍纵即逝的情绪。</p>'
			html += '   <div class="botBox clearfix">'
			html += '    <div class="left fl">'
			html += '     <span class="span01 borderR01">桃子</span>'
			html += '     <span class="span02">情感婚恋</span>'
			html += '     <span class="span03">2016-09-20</span>'
			html += '    </div>'
			html += '    <span class="right fr color333 pinglun">317</span>'
			html += '   </div>'
			html += '  </div>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_release_content .zixun').append(html);
		$('.my_release_content .zixun .itemCon:last').css('border-bottom', 'none')

	}

	createEle();

	//我的发布 咨询end

	//我的发布 帮助
	function my_release_help() {

		var num = 4;
		var html = ''
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="disB itemBox bgcWhite">'
			html += ' <div class="itemCon borderB01 clearfix">'
			html += '  <div class="imgDiv fl">'
			html += '   <img src="../../resources/pcImages/ask01.png">'
			html += '  </div>'
			html += '  <div class="rightTxt">'
			html += '   <div class="top clearfix">'
			html += '    <span class="fl colorfff">求助中</span>'
			html += '    <h3 class="color000 font16 fl">《创意之棒——希望之窗》</h3>'
			html += '   </div>'
			html += '   <p class="longTxt color999">幸福不同于心情和稍纵即逝的情绪。</p>'
			html += '   <div class="middle color000">'
			html += '    <span class="left borderR01">受理方：广东团省委</span>'
			html += '    <span class="right">求助类型：医疗求助</span>'
			html += '   </div>'
			html += '   <div class="bottom clearfix color000">'
			html += '    <span class="span01 fl">108</span>'
			html += '    <span class="span02 fl">62</span>'
			html += '    <span class="span03 fl">2016-09-20</span>'
			html += '   </div>'
			html += '  </div>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_release_content .list02').append(html);
		$('.my_release_content .list02 .itemCon:last').css('border-bottom', 'none')

	}
	my_release_help();

	//我的发布 帮助end
	//我的发布线下服务
	function my_release_xxfw() {
		var num = 3;
		var html = ''
		for(var i = 0; i < num; i++) {
			html += '<div class="item clearfix bgcWhite">'
			html += ' <div class="imgDiv fl">'
			html += '  <img src="../../resources/pcImages/head_1.png" />'
			html += ' </div>'
			html += ' <div class="rightTxt">'
			html += '  <h3 class="color000 font14">怎样参与志愿服务</h3>'
			html += '  <p class="p01 color999">2016-10-25</p>'
			html += '  <div class="botBox clearfix">'
			html += '   <p class="P02 color666 fl">预约站点：永和街社工辅导服务站</P>'
			html += '   <button class="fr conBgc01 colorfff">等待审核</button>'
			html += '  </div>'
			html += ' </div>'
			html += '</div>'
		};
		$('.my_release_content .list03').append(html);
	}
	my_release_xxfw();
	//我的发布线下服务end
	/*我的发布  end  */

	/*我的关注*/

	/* 活动*/
	function my_focus_act() {
		$.ajax({
			type: "get",
			url: base + "/activity/publisher/list",
			dataType: 'json',
			success: function(data) {

				var html = ''

				var data = data.rows;

				for(var i = 0; i < data.length; i++) {

					var item = data[i];

					var oid = item.oid; //组织id

					html += '<a href="javascript:;" class="bgcWhite guanzhu_list clearfix fl">'
					html += ' <div class="imgDiv fl guanzhu_l">'
					html += '  <img src="' + item.photoUrl + '" />'
					html += ' </div>'
					html += ' <div class="rightTxt fl guanzhu_r">'
					html += '  <div class="titBox">'
					html += '   <p class="font14 color000">' + item.name + '</p>'
					html += '  </div>'
					html += '  <div class="scoreBox clearfix">'
					html += '   <ol class="clearfix fl"></ol>'
					html += '   <span class="fl scoreColor01 font14 fenshu"><em>' + item.activityAverageScore.toFixed(1) + '</em>分</span>'
					html += '   <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span>'
					html += '  </div>'
					html += '  <span class=" font12 color000">TA的活动（' + item.publishActivityCount + '）</span>'
					html += ' </div>'
					html += '</a>'
				};
				$('.my_focus_act').append(html);

			}
		});

	}
	my_focus_act();

	/* 活动end*/

	/* 咨询*/
	function my_focus_zixunzuzhi() {
		var num = 3;
		var html = ''
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="bgcWhite guanzhu_list clearfix fl">'
			html += ' <div class="imgDiv fl guanzhu_l">'
			html += '  <img src="../../resources/pcImages/host01.png" />'
			html += ' </div>'
			html += ' <div class="rightTxt fl guanzhu_r">'
			html += '  <p class="font14 color000">高要共青团</p>'
			html += '  <p class="wenti">已解答500个问题</p>'
			html += '  <span class="conBgc01 font12 colorfff tiwen">向TA提问</span>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_focus_zixunzuzhi').append(html);
	}
	my_focus_zixunzuzhi();

	/* 咨询end*/

	/* 咨询专家*/

	function my_focus_zixunzhuanjia() {
		var num = 3;
		var html = ''
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="bgcWhite guanzhu_list clearfix fl">'
			html += ' <div class="imgDiv fl guanzhu_l">'
			html += '  <img src="../../resources/pcImages/host02.png" />'
			html += ' </div>'
			html += ' <div class="rightTxt fl zixun_r">'
			html += '  <p class="font14 color000">高要共青团</p>'
			html += '  <p class="jibie">已解答500个问题</p>'
			html += '  <span class="conBgc01 font12 colorfff tiwen">向TA提问</span>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_focus_zixunzhuanjia').append(html);
	}
	my_focus_zixunzhuanjia();
	/*  咨询专家end*/

	/*  求助*/
	function my_focus_qiuzhu() {
		var num = 3;
		var html = ''
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="bgcWhite guanzhu_list clearfix fl">'
			html += ' <div class="imgDiv fl guanzhu_l">'
			html += '  <img src="../../resources/pcImages/host02.png" />'
			html += ' </div>'
			html += ' <div class="rightTxt fl qiuzhu_r">'
			html += '  <p class="font14 color000">高要共青团</p>'
			html += '  <p class="wenti">已解答500个问题</p>'
			html += '  <span class="conBgc01 font12 colorfff tiwen">向TA提问</span>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_focus_qiuzhu').append(html)
	}
	my_focus_qiuzhu();
	/*  求助end*/

	/* 线下服务*/
	function my_focus_xxfw() {
		var html = ''
		var num = 3;
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="bgcWhite service_list clearfix fl">'
			html += ' <div class="fl service_l">'
			html += '  <img src="../../resources/pcImages/anli_1.png" />'
			html += ' </div>'
			html += ' <div class="fl service_r">'
			html += '  <p class="font14 color000">怎样参与志愿服务</p>'
			html += '  <div class="scoreBox clearfix">'
			html += '   <ol class="clearfix fl"></ol>'
			html += '   <span class="fl scoreColor01 font14 fenshu"><em>4.5</em>分</span>'
			html += '   <span class="pinglun font12 color999 fl">65人已评</span>'
			html += '   <span class="font12 color000 fl">10000人关注</span>'
			html += '  </div>'
			html += '  <p class="font12 color666 adress">广州市海珠区万寿路素社直街</p>'
			html += '  <span class="conBgc01 font12 colorfff yuyue">预约服务</span>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_focus_xxfw').append(html);
	}
	my_focus_xxfw();

	/*线下服务end*/
	/*我的关注 end*/

	/*我的收藏*/
	function my_collect_act() {
		var actStatus = {
			'1': '活动预告',
			'2': '报名中',
			'3': '已满员',
			'4': '报名结束',
			'5': '活动中',
			'6': '活动结束'
		};

    if(!currentAccount){
    	alert('请先登录!')
    	
    }else{

		$.ajax({
			type: "get",
			url: Qnzs.path + "/personalCenter/offlineActivity/collectedList",
			dataType: 'json',
			success: function(data) {

				var data = data.rows;
				var html = ''
				for(var i = 0; i < data.length; i++) {
					var item = data[i];
					html += '<li class="clearfix list_content bgcWhite">'
					html += ' <a href="javascript:;">'
					html += '  <div class="content_box borderB01 clearfix">'
					html += '   <div class="zhd_l fl">'
					html += '   <p class="img01">' + actStatus[item.actStatus] + '<p>'
					html += '    <img src="' + item.imageUrl + '"  alt="" />'
					html += '   </div>'
					html += '   <div class="zhd_r">'
					html += '    <h3 class="font16 color000">' + item.title + '</h3>'
					html += '    <p class="font12 zhd_style p01">' + item.type + '</p>'
					html += '    <p class="font12 color999 zhd_time">' + item.activityTime + '</p>'
					html += '    <p class="font12 color999 zhd_adress">' + item.address + '</p>'
					html += '   </div>'
					html += '   <span class="conBgc01 font12 colorfff atctivs">' + actStatus[item.actStatus] + '</span>'
					html += '  </div>'
					html += ' </a>'
					html += '</li>'
				};
				$('.my_collect_act').append(html);

			}
		});
		
		}

	}
	

	function my_collect_zixun() {
		var html = ''
		var num = 3;
		for(var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="itemBox bgcWhite ">'
			html += ' <div class="itemCon borderB01 clearfix">'
			html += '  <div class="imgDiv fl">'
			html += '   <img src="../../resources/pcImages/person01.png">'
			html += '  </div>'
			html += '  <div class="rightTxt">'
			html += '   <h3 class="font16 color2185cf">如何更好的去忘掉一个人？</h3>'
			html += '   <p class="color000">幸福不同于心情和稍纵即逝的情绪。</p>'
			html += '   <div class="botBox clearfix">'
			html += '    <div class="left fl">'
			html += '     <span class="span01 borderR01">桃子</span>'
			html += '     <span class="span02">情感婚恋</span>'
			html += '     <span class="span03">2016-09-20</span>'
			html += '    </div>'
			html += '    <span class="right fr color333 pinglun">317</span>'
			html += '   </div>'
			html += '  </div>'
			html += ' </div>'
			html += '</a>'
		};
		$('.my_collect_zixun').append(html)
	}
	my_collect_zixun();
	/*我的收藏 end*/

	/*第二课堂*/
	function second_class_table() {
		
		
		var yearid=$('#select_Year option:selected').val();
		
		if(!currentAccount){
			
		alert('请先登录!')	
			
		}
		else{
			/*成绩单信息*/
			$.ajax({
				type:"get",
				url:Qnzs.path +"/personalCenter/extracurricular/list?academicYear="+yearid,
				dataType: 'json',
				success:function(data){
					var itmp=data.data;
					var TypeHour=data.data.perExtraTypeHour;
					
			      $('.info_list').append('<span class="info_item">姓名：'+itmp.name+'</span><span class="info_item">学号：'+itmp.stuNo+'</span><span class="info_item">学校：'+itmp.school+'</span><span class="info_item">院系：'+itmp.academy+'</span>')
				 
				  $.each(TypeHour, function(index,item) {
				  	
				  	$('.TypeHour').append('<h3 class="table_title fl font16 color2185cf">'+item.extracurricularTypeName+'：'+item.perExtraTypeHour+'</h3>');
				  	
				  });
				 
				
				 $('.TotalHour').append('<h3 class="table_title fl font16 color2185cf">学年总学时：'+itmp.academicYearTotalHour+'</h3><h3 class="table_title fl font16 color2185cf">总学时：'+itmp.totalHour+'</h3>');
				 
				 var html = ''
				 var gradesList=data.data.gradesList;
		
		for(var i = 0; i <gradesList.length; i++) {
			
			   var List=gradesList[i];
			html += '<tr>'
			html += ' <td>'+List.activityTime+'</td>'
			html += ' <td>'+List.title+'</td>'
			html += ' <td>'+List.extracurricularTypeName+'</td>'
			html += ' <td>'+List.extracurricularHour+'</td>'
			html += '</tr>'
		};
		$('.second_classroom .table').append(html);
				 	 
				}
		
			});
			
			/*成绩单信息end*/
			
		
	
	}
			
	}
	//下载成绩单
	$('#transcript').on('click',function(){
		
		var yearid=$('#select_Year option:selected').val();
		
	   window.location.href = Qnzs.path+"/personalCenter/extracurricular/export?academicYear="+yearid;
			
		})
		/*下载成绩单end*/
	/*第二课堂end*/

	$('.rightBoxList:not(:first)').hide();

	$('.gerenBox .leftNav .item:last .divOut').css('border-bottom', '0');
	$('.big_nav .item:first').addClass('cur')
	$('.gerenBox .leftNav> .item').click(function(event) {
		$(this).addClass('cur').siblings('.item').removeClass('cur');
		var thisN = $(this).index() + 1;
		$('.rightBoxList').eq($(this).index()).show().siblings('.rightBoxList').hide();
		/*if(thisN>5&&!thisN==10){
		        $('.pageNumBox').hide();
		    }else{
		        $('.pageNumBox').show();
		    }*/
	});
	$('.ask_and_answer .rightBoxList').each(function(index, el) {
		$(el).find('.askTit h3').click(function(event) {
			$(this).addClass('color2185cf').siblings('h3').removeClass('color2185cf');
			$(el).find('.list').eq($(this).index()).show().siblings('.list').hide();
		});
	});

	/*个人中心——我的关注——咨询列表——组织/专家-切换*/
	$(".zixun_t h4").click(function() {
		var index = $(this).index()
		$(this).addClass('current').siblings().removeClass('current');
		$(this).parent('.zixun_t').siblings('.zixun_b').css("display", "none");
		$(this).parent('.zixun_t').siblings('.zixun_b').eq(index).css("display", "block");
	})

	/*性别*/
	$('.pubBox.sex select').change(function(event) {
		var sexTxt = $('.pubBox.sex select option:selected').text();
		$('.pubBox.sex p').text(sexTxt);
	});

	for(var i = 0; i < 5; i++) {
		$('.scoreBox ol').append('<li><span></span></li>')
	}

	/*---------------页码指示---------------*/

	$('.pageNumBox .pageNum a').click(function(event) {
		$(this).addClass('cur').siblings('a').removeClass('cur');

	});

	$('.scoreBox').each(function(index, el) {
		var num = $(el).find('.fenshu em').text();
		var numZ = Math.floor(num);
		var numX = ((num - numZ).toFixed(1));
		$(el).find('li:gt(' + numZ + ')').children('span').hide();
		$(el).find('li').eq(numZ).children('span').css('width', numX * 100 + '%');
	});



});



