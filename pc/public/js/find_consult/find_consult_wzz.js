$(document).ready(function(){
	// 渲染专家列表
	function expertList(data){
		var html='';
		for (var i = 0; i < data.length; i++) {
			var imgUrl = data[i].photoUrl ? data[i].photoUrl : '../../public/img/default_avator.png';
			html+='<li class="list_li" data-oid="' + data[i].oid + '">';
			html+=' <a href="../organization/organization_detail.html?oid=' + data[i].oid + '" class="link_a disB">';
			html+='  <div class="listBox bgcWhite clearfix">';
			html+='   <div class="leftBox fl">';
			html+='    <img src="'+imgUrl+'" />';
			html+='   </div>';
			html+='   <div class="rightTxt list_box_r">';
			html+='    <h3 class="color000 font14">'+data[i].name+'</h3>';
			html+='    <p class="color666 fnt12">已解答'+data[i].answerQuestionCount+'个问题</p>';
			html+='   </div>';
			html+='  </div>';
			html+=' </a>';
			html+=' <button class="colorfff fnt12 conBgc01 tiwenBtn" onclick="askAccPblicUI(\'' + data[i].oid + '\')">向TA提问</button>';
			html+='</li>';

		}
		return html;
	}

	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
			apiProxy:FindConsultApi.searchOrganization, /*接口函数*/
			data: data,
			listFun: expertList /*数据列表函数 -- 返回html字符串*/
		});
	}

	var data = {  /*接口参数*/
		page: 1, //当前页
		rows: 18, //显示总页数
		// sitenavOrgId: "", //所属分站ID
		categoryId: "", //类别id
		fullName:"", // 关键字
		qType:"", //选择
		order: 'desc', //降序排序
		sort:'answer_question_count' //按时间问题数排序
	};

	// 分页器插件 -- 求助中
	pageCheck('.pageBoxList', '#quesList', data);

	//类型选择
	$('#category').on('click', ' .option', function(event) {
		$(this).addClass('cur').siblings().removeClass('cur');

		data.type = $(this).data('type');
		var html = '';
		html += '<ul class="clearfix zuzhiList_ul" id="quesList"></ul>';

		$('.pageBoxList').html(html);
		pageCheck('.pageBoxList', '#quesList', data);

	});

	// 点击搜索筛选
	$('#searchQuestion').click(function () {
		data.fullName = $('#searchKeyWord').val();

		var html = '';
		html += '<ul class="clearfix zuzhiList_ul" id="quesList"></ul>';

		$('.pageBoxList').html(html);
		pageCheck('.pageBoxList', '#quesList', data);
	});

	$('#searchKeyWord').keypress(function (event) {
		if (event.keyCode == "13") {//keyCode=13是回车键
			$('#searchQuestion').click();
		}
	});
});