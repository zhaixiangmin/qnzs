$(document).ready(function() {
	var params = {
		fullName: undefined, // 组织名称
		did: undefined, // 当前站点did
		type: undefined, // 类型(3：服务站点、4：青年文明号、5：学生社团 6：社会组织、7：合作机构)
		orgType: undefined, // 省级团委(1：省级团委，2：地市团委，3：高校团委)
		page: 1, // 当前页码
		rows: 18, // 每页记录数
		sort: undefined, // 排序字段
		order: undefined // 排序方式
	};

	// 点击 '类型'
	$('.actType .option').click(function() {
		// 团委
		if($(this).hasClass('league')) {
			return;
		}

		$(this).addClass('cur').siblings().removeClass('cur'); // 添加高亮
		params.type = $(this).data('id'); // 类型(3：服务站点、4：青年文明号、5：学生社团 6：社会组织、7：合作机构)

		//console.log('params', params);
		params.page = 1; // 重置当前页码
		params.orgType = undefined; // 省级团委(1：省级团委，2：地市团委，3：高校团委)
		$('.zuzhiList').html('<ul class="clearfix zuzhiList_ul"></ul>'); // 重置分页内容列表
		page(params);
	});

	//  悬浮 '团委' 上方
	$('.actType .option.league').hover(function() {
		$('#league').show(); // 显示下拉框
	}, function() {
		$('#league').hide(); // 隐藏下拉框
	});

	// 点击 '团委'下拉框
	$('#league .league_child').click(function() {
		$('.actType .option').removeClass('cur'); // 去高亮(一级类型)
		$('#league').hide(); // 隐藏下拉框
		var orgType = $(this).data('org'); // 省级团委(1：省级团委，2：地市团委，3：高校团委)
		var name = $(this).text(); // 获取二级团委名称
		//console.log('orgType', orgType);
		//console.log('name', name);

		params.orgType = orgType; // 省级团委(1：省级团委，2：地市团委，3：高校团委)
		params.type = undefined; // 类型(3：服务站点、4：青年文明号、5：学生社团 6：社会组织、7：合作机构)
		params.page = 1; // 重置当前页码
		$('#league_selected').text(name); // 渲染二级团委名称
		$('.actType .option.league').addClass('cur'); //
		$('.zuzhiList').html('<ul class="clearfix zuzhiList_ul"></ul>'); // 重置分页内容列表
		page(params);
	});

	/**
	 * 分页函数
	 * @param data {obj} 属性如下
	 * pageNo {int} 页码(默认值为1)
	 * pageSize {int} 每页记录数(默认值为10
	 * districtId {string} 地区ID
	 * keyword {instringt} 站点名称关键字
	 */
	function page(data) {
		// 人气服务站点数据列表分页
		$('.zuzhiList').pageFun({
			contentCell: '.zuzhiList_ul',
			/*包裹数据列表的父容器*/
			maxPage: 6,
			/*显示页码框个数*/
			apiProxy: FindHelpApi.findOrganization,
			/*接口函数*/
			data: data,
			listFun: organization,
			/*数据列表函数 -- 返回html字符串*/
			arg: undefined /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
	page(params); // 分页函数(获取组织分页列表)

	/* 组织列表*/
	function organization(list) {
		// //console.log('list', list);
		var html = '';
		for(var i = 0; i < list.length; i++) {
			var item = list[i];

			var starHtml = '';
			/**
			 * 生成星星的html字符串
			 * @param starStr {int} 星级分数(eg. 4.5)
			 * @returns {string}
			 */
			function star_generate(starStr) {
				var html = '';
				var decimals = undefined; // 小数点位
				var integer = undefined; // 整数位
				if(starStr) {
					starStr = starStr + '';
					var arr = starStr.split('.'); // eg. 123.456 -> [123, 456]
					integer = arr[0];
					if(arr && arr.length > 1) {
						decimals = arr[1].substring(0, 1); // 只取字符串的一位,eg. 4
					}
				}

				for(var j = 0; j < 5; j++) {
					if(j < integer) {
						html += '<li><span></span></li>'; // 亮星
						continue;
					}
					if(decimals > 0) {
						var percentage = decimals * 10;
						html += '<li><span style="width: ' + percentage + '%"></span></li>';
						decimals = undefined; // 只进来一次
						continue;
					}

					html += '<li></li>'; // 灭星
				}

				return html;
			}
			starHtml = star_generate(item.helpAverageScore);

			//          var imgUrl =  item.photoUrl ? item.photoUrl : '../../public/img/default_avator.png';  http:
			var imgUrl = '';
			if(item.photoUrl != null) {

				var s1 = item.photoUrl.split('/');
				if(s1[0] != 'http:') {

					imgUrl = '../../public/img/user_headImg/1 (' + parseInt(Math.random() * 10 * 4) + ').png';
				} else {

					imgUrl = item.photoUrl;
				}
			} else {
				imgUrl = '../../public/img/user_headImg/1 (' + parseInt(Math.random() * 10 * 4) + ').png';

			}

			html += '<li class="list_li position_r">';
			html += ' <a href="../organization/organization_detail.html?oid=' + item.oid + '" class="disB">';
			html += '  <div class="listBox bgcWhite clearfix">';
			html += '   <div class="leftBox fl">';

			html += '    <img class="photoUrl" src="' + imgUrl + '">';
			html += '   </div>';
			html += '   <div class="rightTxt list_box_r">';
			html += '    <h3 class="color000 font14 fullName">' + item.fullName + '</h3>';
			html += '    <div class="scoreBox clearfix">';
			html += '     <ol class="clearfix fl">' + starHtml + '</ol>';
			html += '     <span class="fl scoreColor01 font14 fenshu"><em class="helpAverageScore">' + item.helpAverageScore + '</em>分</span>';
			html += '     <span class="yiping font12 color999"><em class="helpScoreCount">' + item.helpScoreCount + '</em>人已评</span>';
			html += '    </div>';
			html += '   </div>';
			html += '  </div>';
			html += '  <div style="display: none;" class="solveHelpCount">' + item.solveHelpCount + '</div>'; // 已受理求助数
			html += '  <div style="display: none;" class="attentionCount">' + item.attentionCount + '</div>'; // 关注数
			html += ' </a>';
			html += ' <button class="colorfff fnt12 conBgc01 tiwenBtn position_a" data-id="' + item.oid + '">向TA求助</button>';
			html += "</li>";
		}
		return html;
	}

	// 点击 '搜索' 按钮
	$('#search').click(function() {
		params.fullName = $('#sb_huodong').val(); // 搜索输入框的值
		// YoungFamilyApi.getStationsPageByParam({keyword: keyword}).then(function () {
		var html = '';
		html += '<ul class="clearfix zuzhiList_ul">';
		html += '</ul>';

		$('#pageContent').html(html); // 清空分页内容和页码，并为即将新加分页做准备

		page(params); // 分页函数
		// });
	});

	// 点击 '向TA求助'(弹出求助对话框)
	$('.zuzhiList').on('click', '.tiwenBtn', function() {

		var $organization = $(this);

		// 获取账户信息
		Qnzs.getSessionAccount({}).then(function(data) {
			if(data.status == 'ALERT') {
				$.alert(data.msg);
				return;
			}

			var organization = {
				oid: $organization.data('id'), // 组织ID
				photoUrl: $organization.parent('.list_li').find('.photoUrl').attr('src'), // 组织头像
				fullName: $organization.parent('.list_li').find('.fullName').text(), // 受理方
				helpAverageScore: $organization.parent('.list_li').find('.helpAverageScore').text(), // 平均分
				helpScoreCount: $organization.parent('.list_li').find('.helpScoreCount').text(), // 已评人数
				solveHelpCount: $organization.parent('.list_li').find('.solveHelpCount').text(), // 已受理求助数
				attentionCount: $organization.parent('.list_li').find('.attentionCount').text() // 关注数
			};
			//console.log('organization', organization);
			$('#organization_info').find('.chakan').data('id', organization.oid); // 受理方ID(组织ID)
			$('#organization_info').find('.photoUrl').attr('src', organization.photoUrl); // 受理方头像
			$('.list_tanchuang .list_tanchuang_t').find('.fullName').text(organization.fullName); // 受理方(求助弹出框标题)
			$('#organization_info').find('.fullName').text(organization.fullName); // 受理方
			$('#organization_info').find('.helpAverageScore').text(organization.helpAverageScore); // 评分
			$('#organization_info').find('.helpScoreCount').text(organization.helpScoreCount); // 已评人数
			$('#organization_info').find('.solveHelpCount').text(organization.solveHelpCount); // 已受理求助数
			$('#organization_info').find('.attentionCount').text(organization.attentionCount); // 关注数
			$('.bg_black').show();
			$('body').addClass('overflow_h');
		});
	});

	// 点击 'x'图标(求助对话框)
	$(".bg_black .delete").click(function() {
		// // 重置
		$('.list_tanchuang_b .content_l').find('.reset_val').val(''); // 标题、求助人、身份证号、联系电话、筹款金额
		$('#helpType').find('option').eq(0).prop('selected', true); // 求助类型
		$('#selectCK').find('option').eq(0).prop('selected', true); // 是否需要筹款
		editor.txt.html(''); // 求助详情(富文本)
		// uploader.reset(); // 清空图片

		$(".bg_black").hide();
		$('body').removeClass('overflow_h');
	});

	// 监控 '是否需要筹款'
	$('#selectCK').change(function() {
		var opVal = $(this).children('option:selected').val();
		if(opVal == 0) {
			$('.moneyBox').hide();
		} else if(opVal == 1) {
			$('.moneyBox').show();
		}
	});

	// 富文本框
	var E = window.wangEditor;
	var editor = new E('#editor');
	// var editor = new window.wangEditor('#editor');

	// 配置服务器端地址(上传图片)
	editor.customConfig.uploadImgServer = FindHelpApi.fileUploadUrl;

	// 监听函数(上传图片)
	editor.customConfig.uploadImgHooks = {
		// 图片上传之前触发
		// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件
		before: function(xhr, editor, files) {
			//console.log('before');
			//console.log('xhr', xhr);
			//console.log('editor', editor);
			//console.log('files', files);
		},
		success: function(xhr, editor, result) {
			// 图片上传并返回结果，图片插入成功之后触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
			//console.log('success');
			//console.log('xhr', xhr);
			//console.log('editor', editor);
			//console.log('result', result);
		},
		fail: function(xhr, editor, result) {
			// 图片上传并返回结果，当图片插入错误时触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
			//console.log('fail');
			//console.log('xhr', xhr);
			//console.log('editor', editor);
			//console.log('result', result);
			$.alert('图片插入错误');
		},
		error: function(xhr, editor) {
			// 图片上传错时触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
			//console.log('error');
			//console.log('xhr', xhr);
			//console.log('editor', editor);
		},
		timeout: function(xhr, editor) {
			// 图片上传超时触发
			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
			//console.log('timeout');
			//console.log('xhr', xhr);
			//console.log('editor', editor);
			$.alert('图片上传超时');
		},
		customInsert: function(inserImg, result, editor) {
			// 图片上传并返回结果，自定义插入图片时间（而不是编辑器自动插入图片!!!）
			// inserImg 是 插入图片的函数，editor 是编辑器对象，result 是服务器端返回结果
			//console.log('customInsert');
			//console.log('result', result);
			//console.log('editor', editor);

			var url = result.url;
			inserImg(url);
			// result 必须是一个 JSON 格式字符串！！！否则报错
		}
	};

	editor.create(); // 富文本框

	// 点击 '查看' 按钮(求助弹出框)
	$('#organization_info .chakan').click(function() {
		var oid = $(this).data('id');
		window.location.href = '../../view/organization/organization_detail.html?oid=' + oid; // 跳转到组织详情页面
	});

	// 点击 '确认'(求助对话框)
	$('#submit_help').click(function() {
		//console.log('submit_help');
		// var imgUrlStr = imgUrl.join(''); // 图片字符串(imgUrl -> 图片列表(字符串数组,全局变量))
		var params = {
			title: $('#title').val(), // 帮助名称 
			helpPeople: $('#helpPeople').val(), // 求助人
			// acquirer: '15247590', // 受理方
			acquirer: $('#organization_info').find('.chakan').data('id'), // 受理方
			orgId: $('#organization_info').find('.chakan').data('id'), // 组织
			helpType: $('#helpType').find('option:selected').text(), // 求助类型(传中文名)
			idCard: $('#idCard').val(), // 身份证号
			mobile: $('#mobile').val(), // 电话
			whether: $('#selectCK').find('option:selected').text(), // 是否筹款(传中文名，是、否)
			totalAmount: $('#money').val(), // 筹款金额(传中文名，是、否)
			helpContent: filterXSS(editor.txt.html()), // 求助详情(进行过滤，以避免遭受XSS攻击)
			imgUrl: $('#imgUrl').text() // 找帮助图片(字符串)
		};
		//console.log('params', params);
		if(!params.acquirer) {
			$.alert('组织ID不能为空');
			return;
		}
		if(!params.title) {
			$.alert('请输入标题');
			return;
		}
		//console.log('params.title.length', params.title.length);
		if(params.title.length < 5) {
			$.alert('标题输入至少5个字');
			return;
		}
		if(!params.helpPeople) {
			$.alert('请输入求助人姓名');
			return;
		}
		if(!params.idCard) {
			$.alert('请输入求助人身份证号');
			return;
		}
		var checkIdCard = Utils.checkIdCard(params.idCard);
		if(checkIdCard != 'true') {
			$.alert(checkIdCard);
			return;
		}
		// //console.log('身份证验证成功');
		if(!params.mobile) {
			$.alert('请输入求助人联系电话');
			return;
		}
		if(!params.helpType) {
			$.alert('请选择求助类型');
			return;
		}
		if(!params.whether) {
			$.alert('请选择是否需要筹款');
			return;
		}
		if(params.whether == '是' && !params.totalAmount) {
			$.alert('请输入筹款金额');
			return;
		}
		if(!params.helpContent || params.helpContent == '<p><br></p>') {
			$.alert('请输入求助详情');
			return;
		}
		if(params.helpContent.length <= 107) { // <p>你</p> 长度8
			$.alert('请输入100字以上的求助详情！');
			return;
		}
		if(!params.imgUrl) {
			$.alert('请选择照片');
			return;
		}

		// 提交求助申请
		FindHelpApi.addHelp(params).then(function(data) {
			//console.log('FindHelpApi.addHelp data', data);
			$(".bg_black .delete").click(); // 手动关闭求助申请对话框
			$.alert(data.msg).then(function() {
				window.location.reload(); // 刷新页面
			});
		})
	});

});