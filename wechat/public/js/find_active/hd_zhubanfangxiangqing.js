$(document).ready(function() {

	/*TA的活动*/
	function act_list() {
		$.ajax({
			type: "get",
			url: Qnzs.path + "/activity/offlineActivity/recommendList",
			dataType: "JSON",
			success: function(data) {

				var data = data.rows;

				var html = ''
				var actStatus = {
					'1': '活动预告',
					'2': '报名中',
					'3': '已满员',
					'4': '报名结束',
					'5': '活动中',
					'6': '活动结束'
				};
				for (var i = 0; i < data.length; i++) {

					var temp = data[i];

					html += '<a href="hd_xiangqing.html" class="disB">'
					html += ' <div class="zhaohd_box_in clearfix">'
					html += '<span class="zhaohd_box_l fl">'
					html += '<img src="' + temp.imageUrl + '" alt="" class="hd_pic" / style="height:3.2rem;">'
					html += ' <p class="actese">' + actStatus[temp.actStatus] + '</p>'
					html += '  </span>'
					html += '  <div class="zhaohd_box_r">'
					html += '   <h3 class="hd_zhuti">' + temp.title + '</h3>'
					html += '   <p class="hd_style">' + temp.type + '</p>'
					html += '   <p class="hd_time color999">' + temp.activityTime + '</p>'
					html += '   <p class="hd_adress color999">'
					html += '    <span class="fl hd_adress_l">' + temp.address + '</span>'
						/* html+='    <span class="fr">&lt;'+temp.distance+'米</span>'*/
					html += '   </p>'
					html += '  </div>'
					html += ' </div>'
					html += '</a>'
				};
				$('.act_list').append(html)
			},

		});

	}
	act_list();

	/*TA的回答*/
	function answer_list() {
		var num = 4;
		var html = ''
		for (var i = 0; i < num; i++) {
			html += '<section class="content">'
			html += ' <div class="content_in clearfix">'
			html += '  <div class="l">'
			html += '   <div class="circle"><img src="../../public/img/ask_1.png"/></div>'
			html += '  </div>'
			html += '  <div class="r">'
			html += '   <div class="up">'
			html += '    <h3>哪一瞬间你觉得自己的努力白费了？</h3>'
			html += '    <p>帮爱奇艺做热播网剧的厦大校园行活动。 根本不认识厦大的同学</p>'
			html += '   </div>'
			html += '   <div class="down clearfix">'
			html += '    <div class="left clearfix">'
			html += '     <span class="span01">情感婚恋</span>'
			html += '     <span class="span02">2016/02/03</span>'
			html += '     <span>18:56</span>'
			html += '    </div>'
			html += '    <div class="right">'
			html += '     <em><img src="../../img/pinglun.png" /></em><span>125</span>'
			html += '    </div>'
			html += '   </div>'
			html += '  </div>'
			html += ' </div>'
			html += '</section>'
		};
		$('.answer_list').append(html)
	}
	answer_list();

	/*TA的帮助*/
	function help_list() {
		var num = 5;
		var html = ''
		for (var i = 0; i < num; i++) {
			html += '<a href="bz_bangzhuxiangqing.html" class="item clearfix disB">'
			html += ' <div class="left fl">'
			html += '  <img src="../../public/img/huodong_4.png"/>'
			html += ' </div>'
			html += ' <div class="right">'
			html += '  <h3 class="color000 fz30">队长是我别开枪</h3>'
			html += '  <p class="fz26 color666">医疗救助</p>'
			html += '  <div class="botTxt clearfix">'
			html += '   <span class="color999 fz24 fl">2016/08/10</span>'
			html += '   <em class="fz24 fr">求助中</em>'
			html += '  </div>'
			html += ' </div>'
			html += '</a>'
		};
		$('.help_list').append(html)
	}
	help_list();

	/*TA的服务*/
	function service_list() {
		var num = 3;
		var html = ''
		for (var i = 0; i < num; i++) {
			html += '<li class="item">'
			html += ' <div class="item_con clearfix">'
			html += '  <div class="left fl">'
			html += '   <div class="imgBox"><img src="../../public/img/yifuwu01.png" class="pic" /></div>'
			html += '  </div>'
			html += '  <div class="right fz24">'
			html += '   <h1 class="user_name">艾伦耶格尔</h1>'
			html += '   <p class="ser_status">已服务</p>'
			html += '   <p class="ser_describe"><span>服务描述：</span>中国青年网北京10月31日电</p>'
			html += '   <div class="ser_time">'
			html += '    <span class="l">2017-5-7</span><span class="r">11:28:56</span>'
			html += '   </div>'
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
		};
		$('.service_list').append(html)
	}
	service_list();

	/*TA的重磅*/
	function zbxm_list() {
		var num = 3;
		var html = ''
		var status_array = ['进行中', '已结束', '全年展开']
		for (var i = 0; i < num; i++) {
			html += '<a href="javascript:;" class="disB recommend_project_item">'
			html += ' <div class="xiangmu_box">'
			html += '  <div class="xiangmu_box_in">'
			html += '   <div class="xiangmu_content">'
			html += '    <div class="pic_box">'
			html += '     <img src="../../public/img/xiangmu_1.png" alt="" />'
			html += '    </div>'
			html += '    <p class="clearfix">'
			html += '     <span class="xm_fenlei fl">情感</span>'
			html += '     <span class="xm_zhuti fl">广外法学院Dreammakers</span>'
			html += '     <span class="xm_status fr clearfix">' + status_array[i] + '</span>'
			html += '    </p>'
			html += '   </div>'
			html += '  </div>'
			html += ' </div>'
			html += '</a>'
		};
		$('.zbxm_list').append(html)
		$('.xm_status').each(function(index, el) {
			var status = $(el).text()
			if (status == '已结束') {
				$(el).css('color', '#999');
			}
		});
	}
	zbxm_list();

	/*评论列表页面的*/
	/*主办活动*/
	function host_list() {
		var num = 3;
		var html = ''
		for (var i = 0; i < num; i++) {
			html += '<li class="item">'
			html += ' <div class="item_con clearfix">'
			html += '  <div class="left fl">'
			html += '   <div class="imgBox"><img src="../../public/img/ask_1.png" class="pic" /></div>'
			html += '  </div>'
			html += '  <div class="right">'
			html += '   <div class="top clearfix">'
			html += '     <div class="user_name fl">艾伦</div>'
			html += '     <span class="fr time">2016/9/10</span>'
			html += '    </div>'
			html += '    <div class="scoreBox clearfix">'
			html += '     <ol class="score_ol clearfix fl"></ol>'
			html += '     <span class="fenshu fl"><em class="score_num">3.5</em>分</span>'
			html += '    </div>'
			html += '    <p class="user_evaluate">我要把所有的巨人驱逐出去！一匹不留！</p>'
			html += '    <p class="user_join_act"><span>主办活动：</span>安全出行主题宣传活动</p>'
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
		};
		$('.host_list').append(html);
	}
	host_list();

	/*求助解决*/
	function done_list() {
		var num = 2;
		var html = ''
		for (var i = 0; i < num; i++) {
			html += '<li class="item">'
			html += ' <div class="item_con clearfix">'
			html += '  <div class="left fl">'
			html += '   <div class="imgBox"><img src="../../public/img/ask_1.png" class="pic" /></div>'
			html += '  </div>'
			html += '  <div class="right">'
			html += '   <div class="top clearfix">'
			html += '     <div class="user_name fl">艾伦</div>'
			html += '     <span class="fr time">2016/9/10</span>'
			html += '    </div>'
			html += '    <div class="scoreBox clearfix">'
			html += '     <ol class="score_ol clearfix fl"></ol>'
			html += '     <span class="fenshu fl"><em class="score_num">3.5</em>分</span>'
			html += '    </div>'
			html += '    <p class="user_evaluate">我要把所有的巨人驱逐出去！一匹不留！</p>'
			html += '    <p class="user_join_act"><span>主办活动：</span>安全出行主题宣传活动</p>'
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
		};
		$('.done_list').append(html);
	}
	done_list();

	/*线下服务*/
	function xxfw_list() {
		var num = 5;
		var html = ''
		for (var i = 0; i < num; i++) {
			html += '<li class="item">'
			html += ' <div class="item_con clearfix">'
			html += '  <div class="left fl">'
			html += '   <div class="imgBox"><img src="../../public/img/ask_1.png" class="pic" /></div>'
			html += '  </div>'
			html += '  <div class="right">'
			html += '   <div class="top clearfix">'
			html += '     <div class="user_name fl">艾伦</div>'
			html += '     <span class="fr time">2016/9/10</span>'
			html += '    </div>'
			html += '    <div class="scoreBox clearfix">'
			html += '     <ol class="score_ol clearfix fl"></ol>'
			html += '     <span class="fenshu fl"><em class="score_num">3.5</em>分</span>'
			html += '    </div>'
			html += '    <p class="user_evaluate">我要把所有的巨人驱逐出去！一匹不留！</p>'
			html += '    <p class="user_join_act"><span>主办活动：</span>安全出行主题宣传活动</p>'
			html += '  </div>'
			html += ' </div>'
			html += '</li>'
		};
		$('.xxfw_list').append(html);
	}
	xxfw_list();

	/*子版块点击切换*/
	$('#list_big_box .title:first').addClass('cur')
	$('#list_big_box .list_box:not(:first)').hide();
	$('#list_big_box .title').click(function(event) {
		$(this).addClass('cur').siblings('.title').removeClass('cur');
		$('#list_big_box .list_box').eq($(this).index()).show().siblings('.list_box').hide();
	});
});