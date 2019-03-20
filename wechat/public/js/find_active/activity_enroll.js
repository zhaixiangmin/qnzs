var activityId = "";
var orgId = "";
var currentAccount = "";

$(document).ready(function() {
	getRequestParams();
	getCurrentAccount();
	loadEnrollPage();

	uploadEnrollFile();

});

function getRequestParams() {
	var url = location.search; //获取url中"?"符后的字串
	if(url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		var params = strs.split('&');
		var actIdStr = params[0];
		var actIds = actIdStr.split("=");
		activityId = actIds[1];
		var orgIdStr = params[1];
		var orgIds = orgIdStr.split("=");
		orgId = orgIds[1];
		/*var dataStr = params[2];
		var datas = dataStr.split("=");
		data = datas[1];*/
	}

	console.log('activityId', activityId);
}

function getCurrentAccount() {
	$.ajax({
		type: "POST",
		url: Qnzs.path + "/commons/getSessionAccount",
		dataType: "JSON",
		success: function(data) {
			if(data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				currentAccount = data.account; // 账户信息
				console.log('currentAccount', currentAccount);
			}
		}
	});
}

function loadEnrollPage() {
	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/enroll/checkEnroll",
		data: {
			'activityId': activityId
		},
		dataType: "JSON",
		success: function(data) {
			if(data.status != 'ERROR') { //可报名
				/*if (data.status == 'alert' && data.msg) { //可报名但有确认提示条件
					if (!confirm(data.msg)) { //是否确认 为否时，不往下操作
						return;
					}
				}*/
				/*返回data.data*/
				var enrollInfo = data.data;
				console.log('enrollInfo', enrollInfo);
				if(enrollInfo) {
					$('#isAddTemplate').val(enrollInfo.isAddTemplate);
					if(enrollInfo.isAddTemplate && enrollInfo.isAddTemplate == true) {
						$('#uploadEnrollFile').show();
					}

					var activityItemsList = null;
					if(enrollInfo.activityItemsList) {
						activityItemsList = enrollInfo.activityItemsList;
					}

					/*根据data返回数据动态加载报名页面*/

					//加载报名自定义项并设值
					if(activityItemsList && activityItemsList.length > 0) { //活动有自定义报名项
						var activityItemHtml = '';
						for(var i = 0; i < activityItemsList.length; i++) {
							var activityItem = activityItemsList[i];
							activityItemHtml += '<div class="common_item_box mb20 clearfix">';
							activityItemHtml += '    <span class="left_title fl">' + activityItem.itemName + '</span>';
							activityItemHtml += '    <div class="right">';
							activityItemHtml += '		 <input type="hidden" class="activity_item_id" value="' + activityItem.id + '" />';
							activityItemHtml += '        <input type="text" class="fl right_input activity_item_value" placeholder="请输入内容" />';
							activityItemHtml += '    </div>';
							activityItemHtml += '</div>';
							//								activityItemHtml += '<div class="job_position commonDiv">';
							//								activityItemHtml += '	<label for="name" class="fnt14 fl color333 left_title">' + activityItem.itemName + '</label>';
							//								activityItemHtml += '	<input type="hidden" class="border01 activity_item_id" value="' + activityItem.id + '" />';
							//								activityItemHtml += '	<input type="text" class="border01 activity_item_value" />';
							//								activityItemHtml += '</div>';
						}
						//							$('.note_box').empty();

						/*activityItemHtml += '<div class="common_item_box mb20 clearfix note_box">';
					        activityItemHtml += '    <span class="left_title">备注：</span>';
					        activityItemHtml += '    <textarea id="editorContent" class="textarea fz30" placeholder="请输入备注内容"></textarea>';
					        activityItemHtml += '</div>';*/

						$('.note_box').before(activityItemHtml);
					}

					$('.second_class').empty();
					if(enrollInfo.isExtracurricular == true) { //是第二课堂类别的活动
						var extracurricularHtml = ''; //如果是第二课堂则加载第二课堂报名信息div
						//							extracurricularHtml += '<div class="second_class">';
						extracurricularHtml += '<div class="sec_title mb20">';
						extracurricularHtml += '    <h1 class="fz30 color333">第二课堂</h1>';
						extracurricularHtml += '</div>';
						extracurricularHtml += '<div class="common_item_box mb20 clearfix">';
						extracurricularHtml += '    <span class="left_title fl">姓名</span>';
						extracurricularHtml += '    <div class="right">';
						extracurricularHtml += '        <input type="text" class="fl right_input student_name" placeholder="请输入姓名" />';
						extracurricularHtml += '    </div>';
						extracurricularHtml += '</div>';
						extracurricularHtml += '<div class="common_item_box clearfix mb20">';
						extracurricularHtml += '    <span class="left_title fl">学号</span>';
						extracurricularHtml += '    <div class="right">';
						extracurricularHtml += '        <input type="text" class="fl right_input student_no" placeholder="请输入学号" />';
						extracurricularHtml += '    </div>';
						extracurricularHtml += '</div>';
						extracurricularHtml += '<div class="common_item_box clearfix borderBotPub">';
						extracurricularHtml += '    <span class="left_title fl">学校</span>';
						extracurricularHtml += '    <div class="right">';
						extracurricularHtml += '		<input type="hidden" class="fl right_input schoolDid" value="' + currentAccount.parentDid + '" />';
						extracurricularHtml += '        <input type="text" class="fl right_input school" value="' + currentAccount.parentDName + '" />';
						extracurricularHtml += '    </div>';
						extracurricularHtml += '</div>';
						extracurricularHtml += '<div class="common_item_box clearfix">';
						extracurricularHtml += '    <span class="left_title fl">院系</span>';
						extracurricularHtml += '    <div class="right">';
						extracurricularHtml += '        <!--<input type="text" class="fl right_input" readonly />-->';
						extracurricularHtml += '        <select class="border01 academy" id="academy" name="academy">';
						extracurricularHtml += '			<option value="">请选择</option>';
						extracurricularHtml += '		</select>';
						extracurricularHtml += '    </div>';
						extracurricularHtml += '</div>';
						extracurricularHtml += '<p class="kindly_reminder fz24 color333 mb20">温馨提示：第二课堂信息一旦确认后不可修改，请核对学生证上信息后填写。如填写有误，请联系学校/学院管理员更正。</p>';

						//							extracurricularHtml += '	<h1 class="title">第二课堂</h1>';
						//							extracurricularHtml += '	<div class="question commonDiv">';
						//							extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">姓名</label>';
						//							extracurricularHtml += '		<input type="text" class="border01 student_name" />';
						//							extracurricularHtml += '	</div>';
						//							extracurricularHtml += '	<div class="question commonDiv">';
						//							extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">学号</label>';
						//							extracurricularHtml += '		<input type="text" class="border01 student_no" />';
						//							extracurricularHtml += '	</div>';
						//							extracurricularHtml += '	<div class="question commonDiv">';
						//							extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">学校</label>';
						//							extracurricularHtml += '		<input type="hidden" class="border01 schoolDid" value="' + currentAccount.did + '" />';
						//							extracurricularHtml += '		<input type="text" class="border01 school" readonly value="' + currentAccount.districtName + '" />';
						//							extracurricularHtml += '	</div>';
						//							extracurricularHtml += '	<div class="question commonDiv">';
						//							extracurricularHtml += '		<label for="name" class="fnt14 fl color333 left_title">院系</label>';
						//							extracurricularHtml += '		<input type="hidden" class="border01 academyDid" value="" />';
						//							//							extracurricularHtml += '		<input type="text" class="border01 academy" />';
						//							extracurricularHtml += '		<select class="academy" id="academy" name="academy">';
						//							extracurricularHtml += '			<option value="">请选择</option>';
						//							extracurricularHtml += '		</select>';
						//							extracurricularHtml += '	</div>';
						//							extracurricularHtml += '</div>';

						$('.second_class').append(extracurricularHtml);

						districtSelect(currentAccount.did, enrollInfo.extracurricularStuStatus);
						/*districtSelect(currentAccount.did, currentAccount.did);*/
					}

					//给报名页面设置初始默认值
					if(enrollInfo && enrollInfo.name) {
						$('.sign_up_name').val(enrollInfo.name);
					}
					if(enrollInfo && enrollInfo.telephone) {
						$('.contact_phone').val(enrollInfo.telephone);
					}
					if(enrollInfo && enrollInfo.extracurricularName) {
						$('.student_name').val(enrollInfo.extracurricularName);
						$('.student_name').attr("readonly", true);
					}
					if(enrollInfo && enrollInfo.extracurricularStuNo) {
						$('.student_no').val(enrollInfo.extracurricularStuNo);
						$('.student_no').attr("readonly", true);
					}
					if(enrollInfo && enrollInfo.extracurricularSchoolName) {
						$('.school').val(enrollInfo.extracurricularSchoolName);
						$('.school').attr("readonly", true);
					}
					if(enrollInfo && enrollInfo.extracurricularSchoolDid) {
						$('.schoolDid').val(enrollInfo.extracurricularSchoolDid);
					}
					/*if (enrollInfo && enrollInfo.extracurricularAcademyName) {
	//							$('.academy').val(enrollInfo.extracurricularAcademyName);
	//							$('.academy').attr("readonly", true);
								$('.academy option[text=\'' + enrollInfo.extracurricularAcademyName + '\']').attr("selected", true);   //设置Select的Text值为jQuery的项选中
								$('.academy').attr("disabled", true);
							}*/
					if(enrollInfo && enrollInfo.extracurricularAcademyDid) {
						//							$('.academyDid').val(enrollInfo.extracurricularAcademyDid);
						$('.academy option[value=' + enrollInfo.extracurricularAcademyDid + ']').attr('selected', true); //设置Select的value值为jQuery的项选中
						//							$('.academy').attr('disabled', true);
					}
				}

				//提交按钮
				var submitBtnHtml = '';
				submitBtnHtml += '<div class="p_0_30">';
				submitBtnHtml += '    <a href="javascript:enrollActivity();" class="submit_btn colorfff fz30 bgc2185cf">提交</a>';
				submitBtnHtml += '</div>';
				$('#submitBtn').append(submitBtnHtml);

				if(activityId == '18068') {
					/*window.open('https://activity.mingbikes.com/public/app/send__card_for_new.html', '_blank');
					return;*/
					alert('报名后，即可免费领取小鸣单车月卡。');
				}
			}
		}
	});
}

function enrollActivity() {
	var name = $('.sign_up_name').val();
	var telephone = $('.contact_phone').val();
	var remark = $('#editorContent').val();
	var extracurricularName = $('.student_name').val();
	var extracurricularStuNo = $('.student_no').val();
	var extracurricularSchoolDid = $('.schoolDid').val();
	var extracurricularSchoolName = $('.school').val();
	//		var extracurricularAcademyDid = $('.academyDid').val();
	//		var extracurricularAcademyName = $('.academy').val();
	var extracurricularAcademyDid = $('.academy').val(); //获取Select选择的Value
	var extracurricularAcademyName = $(".academy").find("option:selected").text(); //获取Select选择的Text
	var extracurricularAcademyName2 = $('.academy').text();

	var fileId = $('#fileId').val();
	var fileName = $('#fileName').val();
	var templateUrl = $('#templateUrl').val();
	var isAddTemplate = $('#isAddTemplate').val();

	var itemIdArr = new Array();
	var itemValueArr = new Array();
	var itemIds = '';
	var itemValues = '';
	$('.activity_item_id').each(function(index, item) {
		itemIdArr.push($(item).val());
		itemIds += $(item).val() + ',';
	});
	var isItemEmpty = false;
	$('.activity_item_value').each(function(index, item) {
		itemValueArr.push($(item).val());
		itemValues += $(item).val() + ',';
		if(!$(item).val()) {
			isItemEmpty = true;
			return;
		}
	});
	if($.trim(name) == '') {
		$.alert('请输入报名人姓名');
		return;
	}
	if($.trim(telephone) == '') {
		$.alert('请输入联系电话');
		return;
	}
	if(isItemEmpty) {
		$.alert('自定义项都不能为空');
		return;
	}

	var display = $('#uploadEnrollFile').css('display');
	if(display == 'block') {
		if(isAddTemplate != null && isAddTemplate == 1 && !fileId) {
			$.alert("请上传报名附件");
			return;
		}
	}

	$.ajax({
		type: "post",
		url: Qnzs.path + "/activity/enroll/enrollActivity",
		data: {
			'activityId': activityId,
			'name': name,
			'telephone': telephone,
			'remark': remark,
			'extracurricularName': extracurricularName,
			'extracurricularStuNo': extracurricularStuNo,
			'extracurricularSchoolDid': extracurricularSchoolDid,
			'extracurricularAcademyDid': extracurricularAcademyDid,
			'itemIds': itemIds,
			'itemValues': itemValues,
			'itemIdArr': itemIdArr,
			'itemValueArr': itemValueArr,
			'templateUrl': templateUrl,
			'fileId': fileId,
			'fileName': fileName
		},
		dataType: "JSON",
		//			async:true,		
		success: function(data) {
			if(data.status != 'OK') {
				$.alert(data.msg);
				return;
			} else {
				$.alert(data.msg);
				$('.bg_black').hide();
				$('body').removeClass('overflow_h');

				//活动外链特殊处理，活动ID-18068、活动名称-开学礼：10万张免费骑行月卡，0元畅骑30天！点击报名改为一个链接-https://activity.mingbikes.com/public/app/send__card_for_new.html
				if(activityId == '18068') {
					//					window.open('https://activity.mingbikes.com/public/app/send__card_for_new.html', '_blank');
					window.location.href = 'https://activity.mingbikes.com/public/app/send__card_for_new.html';
					return;
					/*alert('报名后，即可免费领取小鸣单车月卡。');
					return;*/
				}
				//活动外链特殊处理，活动ID-18527：//www.belltrip.cn/dx/a-58.html?s=1057
				if(activityId == '18527') {
					$.alert('预报名成功，请继续完成报名缴费！');
					window.location.href = '//www.belltrip.cn/dx/a-58.html?s=1057';
					return;
				}
				//活动外链特殊处理，活动ID-18526：//www.belltrip.cn/dx/a-54.html?s=1057
				if(activityId == '18523') {
					$.alert('预报名成功，请继续完成报名缴费！');
					window.location.href = '//www.belltrip.cn/dx/a-57.html?s=1057';
					return;
				}
				//活动外链特殊处理，活动ID-18526：//www.belltrip.cn/dx/a-54.html?s=1057
				if(activityId == '18526') {
					$.alert('预报名成功，请继续完成报名缴费！');
					window.location.href = '//www.belltrip.cn/dx/a-54.html?s=1057';
					return;
				}
				//活动外链特殊处理，活动ID-18521：//www.belltrip.cn/dx/a-59.html?s=1057
				if(activityId == '18521') {
					$.alert('预报名成功，请继续完成报名缴费！');
					window.location.href = '//www.belltrip.cn/dx/a-59.html?s=1057';
					return;
				}
				//活动外链特殊处理，活动ID-20634：https://weidian.com/item_classes.html?userid=1237367894&c=110107243&des=%E4%B9%90%E5%96%84%E8%A1%8C&wfr=wx
				if(activityId == '20634') {
					$.alert('恭喜你已成功填写报名资料，请继续完成支付，即可成功报名！');
					window.location.href = '//weidian.com/item_classes.html?userid=1237367894&c=110107243&des=%E4%B9%90%E5%96%84%E8%A1%8C&wfr=wx';
					return;
				}
				//活动外链特殊处理，活动ID-20921：//www.belltrip.cn/dx/a-60.html?s=1057
				if(activityId == '20921') {
					$.alert('恭喜你已成功填写报名资料，请继续完成支付，即可成功报名！');
					window.location.href = '//www.belltrip.cn/dx/a-60.html?s=1057';
					return;
				}
				//活动外链特殊处理，活动ID-47900：https://weibo.com/p/1008087f4b5f4baf1b0bc3267aa1c1bb9a3c6c
				if(activityId == '47900') {
					window.location.href = '//weibo.com/p/1008087f4b5f4baf1b0bc3267aa1c1bb9a3c6c';
					return;
				}
				//活动外链特殊处理，活动ID-48142：https://www.wjx.cn/jq/22655867.aspx
				if(activityId == '48142') {
					window.location.href = '//www.wjx.cn/jq/22655867.aspx';
					return;
				}
				//活动外链特殊处理，活动ID-50954：https://w.wjx.top/jq/23197158.aspx
				if(activityId == '50954') {
					window.location.href = '//w.wjx.top/jq/23197158.aspx';
					return;
				}
				//活动外链特殊处理，活动ID-64356：http://www.meilizhongguo.org/to_teach/
				if(activityId == '64356') {
					window.location.href = 'http://www.meilizhongguo.org/to_teach/';
					return;
				}
				//活动外链特殊处理，活动ID-72080：http://tvs1runup.greatimeco.com/tvs1runup/index.php?s=/Wxhome/Goods/detail/id/3/from/singlemessage/isappinstalled/0
				if(activityId == '72080') {
					window.location.href = 'http://tvs1runup.greatimeco.com/tvs1runup/index.php?s=/Wxhome/Goods/detail/id/3/from/singlemessage/isappinstalled/0';
					return;
				}
				//活动外链特殊处理，活动ID-85068：http://u.cyol.com/index/login/from/aHR0cDovL3hzeHMyMDE5LmN5b2wuY29t/parame/L2dzdGVwL2dzdGVwMQ==
				/*if(activityId == '85068') {
					window.location.href = 'http://u.cyol.com/index/login/from/aHR0cDovL3hzeHMyMDE5LmN5b2wuY29t/parame/L2dzdGVwL2dzdGVwMQ==';
					return;
				}*/
				
				window.location.href = '../../view/find_active/hd_xiangqing.html?activityId=' + activityId;
			}
		}
	});
	//		alert('报名成功')
	//		$('.bg_black').hide();
	//		$('body').removeClass('overflow_h');
}

/**
 * 地区下拉框选择
 * @param {Object} selectValue 默认选中值
 * @param {Object} extracurricularStuStatus 第二课堂学生审核状态(0-待审核，1-已通过，2-不通过，默认0待审核)
 */
function districtSelect(selectValue, extracurricularStuStatus) {
	if(currentAccount) {
		$.ajax({
			type: "get",
			/*url: Qnzs.path + "/common/district/listByOrg",
			data: {
				'orgId': orgId
			},*/
			url: Qnzs.path + "/common/district/listByParent",
			data: {
				//				'parentDid': currentAccount.did
				'parentDid': currentAccount.parentDid
			},
			dataType: "JSON",
			success: function(data) {
				if(data.status != 'OK') {
					$.alert(data.msg);
					return;
				} else {
					var districtsList = data.dataList;
					if(extracurricularStuStatus && extracurricularStuStatus == 1 && selectValue) {
						$('.academy').attr('disabled', true);
					}
					$.each(districtsList, function(index, item) {
						if(selectValue && item.did == selectValue) {
							$('.academy').append('<option name="academy" value="' + item.did + '" selected>' + item.districtName + '</option>');
						} else {
							$('.academy').append('<option name="academy" value="' + item.did + '">' + item.districtName + '</option>');
						}
					});
				}
			}
		});
	}
}

function uploadEnrollFile() {
	//	var fileValue = $("input[name='template']").val();  
	//	var point = fileValue.lastIndexOf(".");   
	//	var fileType = fileValue.substr(point);  
	//	if (fileType != ".xls" && fileType != ".xlsx" && fileType != ".doc" && fileType != ".docx") {   
	//	alert("请上传文件后缀名为(doc,docx,xls,xlsx)的文件！");  
	//	return false;  
	//	} else {
	//报名模板上传
	$('#template').fileupload({
		//url: Qnzs.path + '/file_upload',
		url: Qnzs.path + '/file_uploadTwo',
		dataType: 'json',
		autoUpload: true,
		done: function(e, data) {
			data = data.result;
			if(data.error == 0) {
				/* $('#path2').val(data.url); */
				$("#fileId").val(data.fileId);
				$("#fileName").val(data.fileName);
				$("#fileNameShow").text(data.fileName);
				$("#templateUrl").val(data.url);
				$("input[name='template']").val('');
				$.alert("上传附件成功!");
				/* $('#imagePath').attr('src',data.url).show(); */ //显示图片
			}
			/*imageUrl = data.result.url;
				$('#imag_gpj').hide();
				console.log(imageUrl);
				$('#imghead').attr('src', imageUrl)*/
		},
		fail: function() {
			$.alert('出错');
		}
	}); //海报图片上传end

	/*$.ajaxFileUpload({
	        url: Qnzs.path + '/file_uploadTwo', //用于文件上传的服务器端请求地址
	        secureuri: false, //是否需要安全协议，一般设置为false
	        fileElementId: 'template', //文件上传域的ID
	        dataType: 'JSON', //返回值类型 一般设置为json
	        success: function (data, status) {
	        	data = JSON.parse(data);
	        	if (data.error == 0) {
	        		$("#fileId").val(data.fileId);
	        		$("#fileName").val(data.fileName);
	        		alert("上传附件成功!");
	        	}
	        },
	        error: function (data, status, e) //服务器响应失败处理函数
	        {
	            alert(e);
	        }
		});*/
	//	}
}