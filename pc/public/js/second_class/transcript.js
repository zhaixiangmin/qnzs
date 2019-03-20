//Qnzs.path = Qnzs.env.dev_wyh; 
// Qnzs.path = Qnzs.env.dev2;

var currentAccount = "";
var pageIndex = 1;
var pageSize = 6;


$(document).ready(function() {
	/*Qnzs.getSessionAccount({}).then(function(data) {
		console.log('Qnzs.getSessionAccount data', data);
		currentAccount = data.account; // 账户信息

		loadData();
	});*/

	getCurrentAccount();

	loadData();

	
	$("#printDiv").click(function() { 
		$("div#myPrintArea").printArea(); 
	});
	
});


function getCurrentAccount() {
	$.ajax({
		type: "POST",
		url: Qnzs.path + "/commons/getSessionAccount",
		dataType: "JSON",
		async : false,
		success: function(data) {
			if (data.status != 'OK') {
				alert(data.msg);
				return;
			} else {
				currentAccount = data.account; // 账户信息
				console.log('currentAccount', currentAccount);
			}
		}
	});
}


/**
 * 我的第二课堂成绩单证书预览
 */
function loadData() {
	if (!currentAccount) {
		alert("请先登录后再来哦！");
		$('#loginBtn').click();
		return;
	}

	$.ajax({
		type: "get",
		url: Qnzs.path + "/personalCenter/extracurricular/list",
//		url: "//169.168.200.11:8080/qnzs/personalCenter/extracurricular/list",
		data: {
//			'academicYear': academicYear,
			'pageIndex': pageIndex,
			'pageSize': pageSize
		},
		dataType: "JSON",
		success: function(data) {
			if (data.status != 'OK') {
				alert(data.msg);
				$('.not_done').show();
				return;
			} else {
				var result = data.data;
				var gradesList = result.gradesList;
				var gradeTotalRecord = result.gradeTotalRecord;
				var gradeTotalPage = result.gradeTotalPage;
				var TypeHour = result.perExtraTypeHour;

				var phone = result.phone;
				if (phone) {
					phone = phone.substring(phone.length - 6);
				}
				var credentialNo = result.stuNo + phone;

				var badgeUrl = '';
//				badgeUrl += '<div class="title_box">';
//				badgeUrl += '	<div class="school_badge title_box_part">';
				badgeUrl += '        <div class="badge_box"><img src="' + result.badgeUrl + '" class="badge" alt="" /></div>';
				badgeUrl += '        <p class="badge_txt"></p>';
//				badgeUrl += '    </div>';
//				badgeUrl += '    <div class="title_box_r title_box_part">';
//				badgeUrl += '        <h1 class="big_title">第二课堂成绩单</h1>';
//				badgeUrl += '        <p class="eng_title">Second class transcripts</p>';
//				badgeUrl += '    </div>';
//				badgeUrl += '</div>';
				$('.school_badge').empty();
				$('.school_badge').append(badgeUrl);
				
				var studentInfoHtml = '';
				studentInfoHtml += '<ul class="personal_info_left fl">';
				studentInfoHtml += '    <li class="item clearfix">';
				studentInfoHtml += '        <span class="item_left fl">姓名/Name</span>';
				studentInfoHtml += '        <span class="item_right fl">' + result.name + '</span>';
				studentInfoHtml += '    </li>';
				studentInfoHtml += '    <li class="item clearfix">';
				studentInfoHtml += '        <span class="item_left fl">学号/Student Num</span>';
				studentInfoHtml += '        <span class="item_right fl">' + result.stuNo + '</span>';
				studentInfoHtml += '    </li>';
				studentInfoHtml += '    <li class="item clearfix">';
				studentInfoHtml += '        <span class="item_left fl">学校/School</span>';
				studentInfoHtml += '        <span class="item_right fl">' + result.school + '</span>';
				studentInfoHtml += '    </li>';
				studentInfoHtml += '    <li class="item clearfix">';
				studentInfoHtml += '        <span class="item_left fl">院系/Department</span>';
				studentInfoHtml += '        <span class="item_right fl">' + result.academy + '</span>';
				studentInfoHtml += '    </li>';
				studentInfoHtml += '    <li class="item clearfix">';
				studentInfoHtml += '        <span class="item_left fl">总学时/Total Hours</span>';
				studentInfoHtml += '        <span class="item_right fl">' + result.totalHour + '学时</span>';
				studentInfoHtml += '    </li>';
				studentInfoHtml += '</ul>';
				studentInfoHtml += '<div class="personal_info_right fr">';
				studentInfoHtml += '    <div class="qr_code_box"><img src="../../public/img/second_class/qr_code.jpg" class="qr_code" /></div>';
				studentInfoHtml += '    <p class="txt">扫码参与第二课堂活动</p>';
				studentInfoHtml += '    <p class="txt">证书编号：' + credentialNo + '</p>';
				studentInfoHtml += '</div>';
				$('.personal_info').empty();
				$('.personal_info').append(studentInfoHtml);

				var gradeListHtml = '';
				gradeListHtml += '<tr>';
				gradeListHtml += '    <th>活动时间</th>';
				gradeListHtml += '    <th>活动名称</th>';
				gradeListHtml += '    <th>类型</th>';
				gradeListHtml += '    <th>学时(h)</th>';
				gradeListHtml += '</tr>';
				if (gradesList && gradesList.length > 0) {
					$.each(gradesList, function(index, item) {
						gradeListHtml += '<tr>';
						gradeListHtml += '    <td>' + item.activityTime.substring(0, 17) + "</br>" + item.activityTime.substring(17) + '</td>';
						gradeListHtml += '    <td>' + item.title + '</td>';
						gradeListHtml += '    <td>' + item.extracurricularTypeName + '</td>';
						gradeListHtml += '    <td>' + item.extracurricularHour + '</td>';
						gradeListHtml += '</tr>';
					});
				} else {
					gradeListHtml += '<tr>';
					gradeListHtml += ' 	<td  colspan="4">暂无成绩</td>';
					gradeListHtml += '</tr>';
				}
				$('.act_info_list').empty();
				$('.act_info_list').append(gradeListHtml);

				$('.bottom_page').text(pageIndex + "/" + gradeTotalPage);
				
				if (gradeTotalRecord && gradeTotalRecord > 0) {
					$('.bottom_page').text(pageIndex + "/" + gradeTotalPage);
				} else {
					$('.bottom_page').text('');
				}
				
				loadDataPage(gradeTotalPage);
			}
		}
	});
}




/**
 * 我的第二课堂成绩单证书预览
 */
function loadDataPage(gradeTotalPage) {
	if (!currentAccount) {
		alert("请先登录后再来哦！");
		$('#loginBtn').click();
		return;
	}

	if (gradeTotalPage > 1) {

		var moreGradeHtml = '';
		for (var i = 1; i < gradeTotalPage; i++) {

			moreGradeHtml += '<div class="transcripts_page transcripts_page2">';
			moreGradeHtml += '    <p class="top_p">接上页</p>';
			moreGradeHtml += '    <div class="act_info_box">';
			
			pageIndex++;
			$.ajax({
				type: "get",
				url: Qnzs.path + "/personalCenter/extracurricular/list",
//				url: "//169.168.200.19:8080/qnzs/personalCenter/extracurricular/list",
				data: {
//					'academicYear': academicYear,
					'pageIndex': pageIndex,
					'pageSize': pageSize
				},
				dataType: "JSON",
				async : false,
				success: function(data) {
					if (data.status != 'OK') {
						alert(data.msg);
						$('.not_done').show();
						return;
					} else {
						var result = data.data;
						var gradesList = result.gradesList;
						var gradeTotalRecord = result.gradeTotalRecord;
						var TypeHour = result.perExtraTypeHour;

						var phone = result.phone;
						if (phone) {
							phone = phone.substring(phone.length - 6);
						}
						var credentialNo = result.stuNo + phone;
						
						moreGradeHtml += '        <div class="act_info_title clearfix">';
						moreGradeHtml += '            <span class="fl">证书编号：' + credentialNo + '</span>';
						moreGradeHtml += '            <span class="fr">姓名：' + result.name + '</span>';
						moreGradeHtml += '        </div>';
						moreGradeHtml += '        <table class="act_info_list">';
						moreGradeHtml += '            <tr>';
						moreGradeHtml += '                <th>活动时间</th>';
						moreGradeHtml += '                <th>活动名称</th>';
						moreGradeHtml += '                <th>类型</th>';
						moreGradeHtml += '                 <th>学时(h)</th>';
						moreGradeHtml += '            </tr>';
						
						$.each(gradesList, function(index, item) {
							moreGradeHtml += '		  <tr>';
							moreGradeHtml += '    		<td>' + item.activityTime.substring(0, 17) + "</br>" + item.activityTime.substring(17) + '</td>';
							moreGradeHtml += '    		<td>' + item.title + '</td>';
							moreGradeHtml += '    		<td>' + item.extracurricularTypeName + '</td>';
							moreGradeHtml += '    		<td>' + item.extracurricularHour + '</td>';
							moreGradeHtml += '		  </tr>';
						});
					}

					moreGradeHtml += '        </table>';
					moreGradeHtml += '    </div>';
					moreGradeHtml += '    <p class="stamp">盖章认证：</p>';
					moreGradeHtml += '    <p class="bottom_page">' + pageIndex + "/" + gradeTotalPage + '</p>';
					moreGradeHtml += '</div>';

					console.log('pageIndex', pageIndex);
					console.log('pageSize', pageSize);
					console.log('gradeTotalRecord', gradeTotalRecord);
					console.log('gradeTotalPage', gradeTotalPage);
				}
			});
		}

		$('.transcripts_page1').after(moreGradeHtml);
	} else {
		$('.bottom_page').text('1/1');
	}
}
