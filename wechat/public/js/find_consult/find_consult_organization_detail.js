$(document).ready(function(){
	var oid = Utils.getQueryString('oid');
	var username = Utils.getQueryString('username');
	console.log('oid', oid);
	function createEle(){
		FindConsultApi.findOrganizationById({oid: oid}).then(function (data) {
			//createEle(data);
			console.log('专家11',data);
			$("#address").text(data.rows.address);//地址

			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			// 地址解析为Point
			myGeo.getPoint(data.rows.address, function(point){
				if (point) {
					$('#address_parent').data('lng', point.lng); // 站点经度
					$('#address_parent').data('lat', point.lat); // 站点纬度
					console.log('point.lng', point.lng);
					console.log('point.lat', point.lat);
				}else{
					alert("您选择地址没有解析到结果!");
				}
			});
			
			
			$("#telephone").text(data.rows.telephone);//电话
			$('#telephone_parent').attr('href', 'tel:' + data.rows.telephone); // 添加直接拨号功能
			$("#orgName").text(data.rows.name);//组织名称
			$("#exp_photoUrl").attr("src", Utils.compressByAli(data.rows.photoUrl, 160, 200));//头像
			$("#description").text(data.rows.description);//组织介绍
			$("#answerQuestionCount").text(data.rows.answerQuestionCount);//解决问题数
			$("#attentionCount").text(data.rows.attentionCount);//关注
			$("#nav_orgName").text(data.rows.name);//面包屑姓名
//向TA提问
			$("#tw_name").text(data.rows.name);//组织名称
			$("#tw_photoUrl").attr("src",data.rows.photoUrl);//头像
			$("#tw_answerQuestionCount").text(data.rows.answerQuestionCount);//解决问题数
			$("#tw_attentionCount").text(data.rows.attentionCount);//关注
		});

	}
	//}
	createEle();

	/*问题列表*/
	var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
	var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

	var params = {
		page: 1, // 当前页码
		rows: 6, // 每页记录数
		username:oid

	};


	/**
	 * 渲染帮助列表
	 * @param $listContent {jq} 列表包裹父容器(jq对象)
	 * @param comments {array} 帮助列表
	 * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
	 */
	function render_helplist($listContent, helps, isClear) {
		var html = '';
		for (var i = 0; i < helps.length; i++) {
			var item = helps[i];
			html += '<div class="content_in clearfix">';
			html += '<div class="l">';
			html += '<div class="circle">';
			html += '<a href="find_consult_question_detail.html?quId='+item.quId+'&username='+item.username+'" class="u_head">';
			html += '<img src="'+ Utils.compressByAli(item.photourl, 120, 120) +'" />';
			html += '</a>';
			html += '</div>';
			html += '</div>';
			html += '<div class="r">';
			html += '<a href="find_consult_question_detail.html?quId='+item.quId+'">';
			html += '<div class="up">';
			html += '<h3>' + item.title + '</h3>';
			html += '<p>' + item.askContent + '</p>';
			html += '</div>';
			html += '<div class="down clearfix">';
			html += '<div class="left clearfix">';
			html += '<span class="span01">' + item.categoryName + '</span> ';
			html += '<span class="span02">'+item.realname+'</span> ';
			html += '<span class="span02">'+item.askTime+'</span>';
			html += '</div>';
			html += '<div class="right">';
			html += '<em><img src="../../public/img/pinglun.png"></em>';
			html += '<span>'+ item.commentsNum+'</span>';
			html += '</div>';
			html += '</div>';
			html += '</a>';
			html += '</div>';
			html += '</div>';
		}

		if(isClear) {
			$listContent.html(html); // 替换当前内容
			return;
		}

		$listContent.append(html); // 向后添加当前内容
	}

	/**
	 * 加载帮助列表并渲染页面
	 * @param fun {function} 加载帮助函数
	 * @param params {obj} 加载帮助函数的参数
	 * @param $listContent {jq} 渲染页面的jq对象
	 * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
	 */
	function loadHelpList(fun, params, $listContent, isClear) {
		// 获取推荐服务帮助列表
		fun(params).then(function (data) {
			var helps = data.rows;
			console.log('找咨询', data);

			render_helplist($listContent, helps, isClear); // 渲染帮助列表
			if(helps && helps.length >= params.rows) { // 全部列表数据尚未查询完毕
				finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
				return;
			}

			finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
			// 全部列表数据查询完毕
			$listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

		}).always(function () {
			params.page++; // 页码自增
			loadedFlag = true; // 设置加载完成(全局变量)
		});
	}

	loadHelpList(FindConsultApi.getExpAnswerList, params, $('#expert_questionList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
		var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
		var windowHeight = $(this).height(); // 可见高度
		// 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
		if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
			loadedFlag = false; // 设置正在加载，避免重复
			loadHelpList(FindConsultApi.getExpAnswerList, params, $('#expert_questionList')); // 加载帮助列表并渲染页面
		}
	});

//跳转到提问组织
	$('#ask_expert').click(function () {
		window.location.href = 'askToOrganization.html?oid=' + oid; // 跳转到专家提问页面
	});
	// 点击 '关注'
	$('#concern').click(function () {
		FindConsultApi.followOrCancel({ orgId: oid }).then(function (data) {
			if(data.msg.indexOf('取消') != -1) { // 取消关注成功，显示'关注'
				$('#concern').text('关注');
			}else { // 关注成功，显示'取消关注'
				$('#concern').text('取消关注');
			}
		});
	});



	// 定位(获取当前坐标)
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			console.log('您的位置：'+r.point.lng+','+r.point.lat);
			$('#address_parent').data('longitude', r.point.lng); // 当前定位经度
			$('#address_parent').data('latitude', r.point.lat); // 当前定位纬度
		}
		else {
			$.alert('获取定位失败：' + this.getStatus());
		}
	},{enableHighAccuracy: true});


	// 点击 '地址栏'
	$('#address_parent').click(function () {
		var lng = $('#address_parent').data('lng'); // 站点经度
		var lat = $('#address_parent').data('lat'); // 站点纬度
		var longitude = $('#address_parent').data('longitude'); // 当前定位经度
		var latitude = $('#address_parent').data('latitude'); // 当前定位纬度

		if(!lng || lng == 'undefined' || !lat || lat == 'undefined') {
			$.alert('无法解析组织地址');
			return;
		}
		if(!longitude || longitude == 'undefined' || !latitude || latitude == 'undefined') {
			// $.alert('站点位置参数不能为空');
			$.alert('站点位置定位中，请稍后...');
			return;
		}
		window.location.href = '../young_family/route_map.html?lng=' + lng + '&lat=' + lat + '&longitude=' + longitude + '&latitude=' + latitude; // 跳转到地图规划路线页面
	});
	
});
