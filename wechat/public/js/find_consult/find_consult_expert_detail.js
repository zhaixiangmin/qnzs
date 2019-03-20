$(document).ready(function(){
	var username = Utils.getQueryString('username');
	//console.log('username', username);
	// function createEle(){
	FindConsultApi.findAccountById({username: username}).then(function (data) {
		//createEle(data);
		console.log('专家11',data);
		$("#address").text(data.rows.address);//地址
		$("#telephone").text(data.rows.mobile);//电话
		$("#orgName").text(data.rows.orgName);//姓名
		$("#exp_photoUrl").attr("src",data.rows.photoUrl);//头像
		$("#expProfession").text(data.rows.expProfession);//职业
		$("#speciality").text(data.rows.speciality);//专业特长
		$("#introduction").text(data.rows.introduction);//介绍
		$("#nav_usename").text(data.rows.orgName);//面包屑姓名
		$("#exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
		$("#exp_attentionCount").text(data.rows.questionAttentionCount);//关注
//向TA提问
		$("#tw_photoUrl").attr("src",data.rows.photoUrl);//头像
		$("#tw_orgName").text(data.rows.orgName);//姓名
		$("#til_orgName").text(data.rows.orgName);//姓名
		$("#tw_exp_replyCount").text(data.rows.answerQuestionCount);//已解决问题
		$("#tw_exp_attentionCount").text(data.rows.questionAttentionCount);//关注
		$('#wzjxqAttention').text(data.rows.isFollowed ? '取消关注': '关注'); // 是否关注
	});
	//}

	/*问题列表*/
	function activeOrg() {
		sendAjax();  //初始化列表
		function sendAjax(data) {
			FindConsultApi.getExpAnswerList({page: 0, rows: 16,username:username}).then(function (data) {
				createEle(data.rows);
				console.log('went组织11', data);
			})
		}
		function createEle(data) {
			var html = '';
			var num = 3;
			for (var i = 0; i < data.length; i++) {
				//var date = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
				html += '<div class="content_in clearfix" style="padding: 0 10px;">'
				html += '<div class="l">'
				html += '<div class="circle">'
				html += '<a href="" class="u_head">'
				html += '<img src="'+data[i].photourl+'" />'
				html += '</a>'
				html += '</div>'
				html += '</div>'
				html += '<div class="r">'
				html += '<a href="#">'
				html += '<div class="up">'
				html += '<h3>' + data[i].title + '</h3>'
				html += '<p>' + data[i].askContent + '</p>'
				html += '</div>'
				html += '<div class="down clearfix">'
				html += '<div class="left clearfix">'
				html += '<span class="span01">' + data[i].categoryName + '</span> '
				html += '<span class="span02">'+ data[i].realname+'</span> '
				html += '<span class="span02">'+data[i].askTime+'</span>'
				html += '</div>'
				html += '<div class="right">'
				html += '<em><img src="../../public/img/pinglun.png"></em>'
				html += '<span>2</span>'
				html += '</div>'
				html += '</div>'
				html += '</a>'
				html += '</div>'
				html += '</div>'
			}
			$('#expert_questionList').append(html)
		}
	}
	activeOrg()
//跳转到提问专家页
	$('#ask_expert').click(function () {
		//alert('2222')
		// var username = $(this).data('username');
		window.location.href = 'askToExpert.html?username=' + username; // 跳转到专家提问页面
	});
	//关注。取消关注
	$('#wzjxqAttention').click(function () {
		FindConsultApi.followOrCancelExpert({ userName: username }).then(function (data) {
			if(data.isFollowed==1){
				// $.alert(data.msg)
				$('#wzjxqAttention').text('取消关注');
				// console.log('关注',data.msg)
			}if(data.isFollowed==2) {
				$('#wzjxqAttention').text('关注');
				// console.log('取消关注',data.msg)
			}

		})
	})
});

// $('#quesList').on('click', '.showComment', function () {
// 	$(this).parents('.Rinfor').find('.msg_borad').slideToggle();
// })