$(document).ready(function(){
	var quId = Utils.getQueryString('quId');
	var account_global = undefined; // 用户信息(全局变量)
	var askerAccid_global = undefined; // 提问者ID(全局变量)
   
    obj.ajax('/commons/getSessionAccount',{},function(data){
    	console.log(data);
    	if(data.status =='OK'){
    		
    		minId =data.account.username //获取登录者的id
    	}
    });
    


	// 渲染问题详情部分
	function renderQuestionDetail(quId) {
		FindConsultApi.getQuesDetail({quId: quId}).then(function (data) {
			
			$("#askTime").text(data.rows.askTime);//提问时间
			$("#title").text(data.rows.title);//标题
			$("#realname").text(data.account.realname);//名字
			$("#askContent").html(data.rows.askContent);//内容
			$("#address").text(data.account.districName);//地址
			$("#likesNum").text(data.rows.likesNum);//点赞
			$("#collectsNum").text(data.rows.collectsNum);//收藏
			$("#commentsNum").text(data.rows.commentsNum);//评论(问题标题)
			$("#list_commentsNum").text(data.rows.commentsNum);//列表评论总数(评论列表头部)
			var photoUrl = data.account.photoUrl? data.account.photoUrl : '//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171009/20171009163424_965243805.png';
			$("#exp_photoUrl22").attr("src", Utils.compressByAli(photoUrl, '?x-oss-process=image/resize,m_mfit,h_85,w_85'));//头像
			askerAccid_global = data.rows.askerAccid; // 提问者ID(全局变量)
			if(account_global && account_global.username == data.rows.askerAccid) {
				$('.edit .delete').show(); // 显示'删除'按钮(问题详情)
			}

			// 显示图片滑动
			if(data.questionImage && data.questionImage.length > 0) {
				var imgUrls = data.questionImage;
				var autoPlay = imgUrls.length > 0 ? true : false;
				var html = '';
				var html_li = '';
				for(var i=0; i<imgUrls.length; i++) {
					var imgUrl = imgUrls[i].imageUrl;
					html += '<li><img src="' + imgUrl + '" /></li>';
					html_li += '<li>' + (i+1) + '</li>';
				}
				$('#slideBox .hd ul').html(html_li); // 渲染页码
				$('#slideBox .bd ul').html(html); // 渲染图片
				jQuery("#slideBox").slide({mainCell:".bd ul", autoPlay: autoPlay, mouseOverStop: true}); // SuperSlide插件滑动
				$('#slideBox').show(); // 显示SuperSlide插件


				$('#slideBox_Big .hd ul').html(html_li); // 渲染页码
				$('#slideBox_Big .bd ul').html(html); // 渲染图片
				jQuery("#slideBox_Big").slide({mainCell:".bd ul", autoPlay: autoPlay, mouseOverStop: true}); // SuperSlide插件滑动(大图)


				var windowHeight = $(window).height();
				var top = windowHeight * 0.1; // 窗口高度
				$('#slideBox_Big').css('margin-top', top); // Superslide垂直居中(相对浏览器窗口)
				$('#slideBox_Big .bd li').css('line-height', (windowHeight * 0.8) + 'px' ); // 图片垂直居中(Superslide里面)
				$('#slideBox_Big .bd li').css('height', (windowHeight * 0.8) + 'px' ); // 图片父容器高度(Superslide里面)
				$('#slideBox_Big .bd li').css('width', (windowWidth * 0.8) + 'px' ); // 图片父容器宽度(Superslide里面)
			}


			// 防止冒泡 防止点击SuperSlide区域(大图)关闭大图
			$('#mask_slideBox_Big #slideBox_Big .prev, #mask_slideBox_Big #slideBox_Big').click(function () {
				return false;
			});

			// 点击大图(隐藏大图)
			$('#mask_slideBox_Big').click(function () {
				$(this).hide();
			});

			// 点击小图(放大)
			$('#slideBox .bd ul').click(function () {
				var index = $('#slideBox .hd ul').find('li.on').text(); // 当前图片索引
				console.log('index', index);
				$('#mask_slideBox_Big #slideBox_Big .hd ul li').eq(index-1).mouseover(); // 手动选中相应大图
				$('#mask_slideBox_Big').show();
			});
		});
	}

	//评论列表
	function commentList(data) {
		console.log(data);
		var list = '';
		for(var i=0; i < data.length; i++) {
			var item = data[i];
			var creatorPhoto = item.creatorPhoto ? item.creatorPhoto:'//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171009/20171009163424_965243805.png';
			var orgPhotoUrl = item.creatorPhoto ? item.creatorPhoto:'//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171009/20171009163424_965243805.png';
      creatorPhoto = Utils.compressByAli(creatorPhoto, '?x-oss-process=image/resize,m_mfit,h_46,w_46');
      orgPhotoUrl = Utils.compressByAli(orgPhotoUrl, '?x-oss-process=image/resize,m_mfit,h_46,w_46');

			list += '<ul  id="listMsg'+ item.repId +'" class="listMsg">';
			if(item.isExpertreply==2 || item.isExpertreply==4){
				
				if(item.type ==3){
					list += '<a class="headimg" style="position: relative;" > <img style="position: absolute; z-index:10;" src="' + orgPhotoUrl + '" width="88" height="88"> <img style="  width:15px;height:15px;position:absolute;z-index:100;bottom:-47px;right:-42px;  " src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171013/20171013162656_826check_tercher.png">   </a>';
				}else{
					list += '<a class="headimg" style="position: relative;" > <img style="position: absolute; z-index:10;" src="' + orgPhotoUrl + '" width="88" height="88"> <img style="width:15px;height:15px;position:absolute;z-index:100;bottom:-47px;right:-42px; display:none;" src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171013/20171013162656_826check_tercher.png">   </a>';
				}
				
			}else{
				if(item.type ==3){
					list += '<a class="headimg" style="position: relative;"> <img  style="position: absolute; z-index:10;" src="' + creatorPhoto + '" width="88" height="88"><img style="width:15px;height:15px;position:absolute;z-index:100; bottom:-47px;right:-42px;"  src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171013/20171013162656_826check_tercher.png"> </a>';
				}else{
					list += '<a class="headimg" style="position: relative;"> <img  style="position: absolute; z-index:10;" src="' + creatorPhoto + '" width="88" height="88"><img style="width:15px;height:15px;position:absolute;z-index:100; bottom:-47px;right:-42px;display:none;"  src="//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171013/20171013162656_826check_tercher.png"> </a>';
				}
			}
			list += '<ol class="Rinfor">';
			if(item.isExpertreply == 2 || item.isExpertreply == 4){
				if(item.type ==3){
				  list += '<li><a class="titlecolor" style="color:#e07617;">'+item.fullName+'<em class="techer_showAndenhide" style="padding-left:10px;">(专家)</em></a>';
					
				}else{
				  list += '<li><a class="titlecolor"  >'+item.fullName+'<em class="techer_showAndenhide" style="padding-left:10px;"></em></a>';
					
				}
			}else{
				if(item.type ==3){
				     list += '<li><a class="titlecolor" style="color:#e07617;" >'+item.creatorName+'<em class="techer_showAndenhide" style="padding-left:10px;">(专家)</em></a>';
					
				}else{
					list += '<li><a class="titlecolor" >'+item.creatorName+'<em class="techer_showAndenhide" style="padding-left:10px;"></em></a>';
					
				}
				
			}
			list += '<p class="txt_small">'+item.replyTime+'</p>';
			list += '<div><p>'+item.replyContent+'</p></div>';
			list += '<div class="edit fnt12">';
			list += '<span class="noZan" id="good_detail" onclick="likeReplyCommit(this,' + item.repId + ')">';
			list += '<a href="javascript:void(0)" >赞(<em>' + item.likesCount + '</em>)</a>';
			list += '</span>';
			list += '<span class="comment showComment'+i+' comment02" onclick="showComment0('+i+')"  id="showComment0">评论('+item.replyCount+')</span>';
			if(account_global && (account_global.orgType == 0 || account_global.username == item.creatorAccid)) { // 超级系统管理员 或 自己的评论
				list += '<span class="delete" onclick="delReply('+item.repId+')">删除</span>';
			}
			list += '</div>';
			list += '</li>';
			list += '<li class="comment msg_borad msg_borad_'+i+'" style="margin-top: 25px; display:none" id="msgBorad_0">';
			list += '<b class="arrowTop"> </b>';
			var childRepliesList = data[i].childRepliesList;
			if(childRepliesList != null){
				for(var j=0; j < childRepliesList.length; j++) {
					var reimg = childRepliesList[j].creatorPhoto ? childRepliesList[j].creatorPhoto:'../../public/img/default_avator.png';
					var orgreimg = childRepliesList[j].orgPhotoUrl ? childRepliesList[j].orgPhotoUrl:'../../public/img/default_avator.png';

					list += '<ul class="m_top10 clearfix" id="listMsg_to'+ data[i].repId +'">';
					list += '<span class="closeBorad" id="closeBorad"></span>';
					if(childRepliesList[j].isExpertreply == 2 || childRepliesList[j].isExpertreply == 4){
						list += '<a class="headimg">	<img src="' + orgreimg + '" width="46" height="46"></a>';
					}else{
						list += '<a class="headimg">	<img src="' + reimg + '" width="46" height="46"></a>';
					}
					list += '<ol class="Rinfor" id="comment11825254">';
					list += '<li>';
					if(childRepliesList[j].isExpertreply == 2 || childRepliesList[j].isExpertreply == 4){
						list += '<p class="blue">' + childRepliesList[j].fullName + '<font class="black"> 回复 </font>' + item.fullName + '</p>';
					}else{
						list += '<p class="blue">' + childRepliesList[j].creatorName + '<font class="black"> 回复 </font>' + item.creatorName + '</p>';
					}
					list += '<div class="edit fnt12 gray">';
					list += '<span  lang="">' + childRepliesList[j].replyTime + '</span>';
					list += '<span class="div-border noZan" id="good_detail[i]" onclick="likeReplyCommit(this,' + childRepliesList[j].repId + ')">';
					list += '<a href="javascript:void(0)">赞(<em>' + childRepliesList[j].likesCount + '</em>)</a>';
					list += '</span>';
					
//					if(  minId == childRepliesList[j].creatorAccid) { // 超级系统管理员 或 自己的评论
//						list += '<span class="delete delete02"><a href="javascript:void(0);" onclick="delReply_to(' + childRepliesList[j].repId + ')">删除</a></span>';
//					}
					list += '</div>';
					list += '<div>' + childRepliesList[j].replyContent + '</div>';
					list += '</li>';
					list += '</ol>';
					list += '</ul>';
				}
			}
			list += '<div class="clearfix">';
			list += '<form action="" class="replyForm" onkeydown="if(event.keyCode==13){return false;}">';
			list += '<span class="closeBorad" id="closeBorad"></span>';
			list += '<div class="commentbox">';
			list += '<input name="content" class="comt_input InputSort"  id="comt_input' + i + '"  >';
			list += '<input class="buttonhuifu" onclick="buttonhuifu('+ item.repId + ','+i+')" value="回复" id="submit0" type="button"></div>';
			list += '</form>';
			list += '</div>';
			list += '</li>';

			list += '</ol>';
			list += '</ul>';
			
		}
		return list;
	}

	/**
	 * 分页器插件(评论列表)
	 * @param parentCell {string} 分页器父容器
	 * @param contentCell {string} 内容列表父容器
	 * @param data {object} 接口请求参数
     */
	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
			apiProxy:FindConsultApi.getReplysByQuestionId, /*接口函数*/
			data: data,
			listFun: commentList /*数据列表函数 -- 返回html字符串*/
		});
	}

	var data = {  /*接口参数*/
		page: 1,//当前页
		rows: 5,//每页显示条数
		sitenavOrgId: undefined,//所属分站ID
		categoryId: undefined,//类别id
		keyword: undefined, // 关键字
		quId:quId//选择
	};

	// 获取账户信息
	Qnzs.getSessionAccount({}).then(function (data) {
		if(data.status == 'ALERT') { // 用户未登录
			return;
		}
		var account = data.account;
		if(account) {
			account_global = account; // 用户(全局变量)
		}

	}).always(function () {
		// 分页器插件(评论列表)
		pageCheck('.pageBoxList', '#quesList', data);

		renderQuestionDetail(quId); // 渲染问题详情部分
	});


// 	/*
// 	 * 富文本框编辑内容上传图片
// 	 * */
// 	var E = window.wangEditor;
// 	var editor = new E('#editor');
// // var editor = new window.wangEditor('#editor');
//
// // 配置服务器端地址(上传图片)
// 	editor.customConfig.uploadImgServer = Qnzs.path + '/file_upload';
//
// // 监听函数(上传图片)
// 	editor.customConfig.uploadImgHooks = {
// 		// 图片上传之前触发
// 		// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件
// 		before: function (xhr, editor, files) {
//
// 		},
// 		success: function (xhr, editor, result) {
// 			// 图片上传并返回结果，图片插入成功之后触发
// 			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
//
// 		},
// 		fail: function (xhr, editor, result) {
// 			// 图片上传并返回结果，当图片插入错误时触发
// 			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
//
// 			$.alert('系统繁忙，请稍后再来吧！');
// 		},
// 		error: function (xhr, editor) {
// 			// 图片上传错时触发
// 			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
//
// 		},
// 		timeout: function (xhr, editor) {
// 			// 图片上传超时触发
// 			// xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
//
// 			$.alert('系统繁忙，请稍后再来吧！');
// 		},
// 		customInsert: function (inserImg, result, editor) {
// 			// 图片上传并返回结果，自定义插入图片时间（而不是编辑器自动插入图片!!!）
// 			// inserImg 是 插入图片的函数，editor 是编辑器对象，result 是服务器端返回结果
//
// 			var url = result.url;
// 			inserImg(url);
// 			// result 必须是一个 JSON 格式字符串！！！否则报错
// 		}
// 	};
//
// 	editor.create();

	//发布评论
	$('#toReply').click(function(){

		Qnzs.getSessionAccount({}).then(function (data) {
			if(data.status == 'ALERT') {
				$.alert(data.msg);
				return;
			}

			$('#container').data('id', quId);//获取当前页面ID值
			var id = $('#container').data('id');
			var content = $('#editorContent').val();

			FindConsultApi.repeatContent({quId:id,content:content}).then(function (data) {
				if (data.flag) {
					// 重复评论
					$.alert("请勿重复评论！");
					return;
				}else{
					FindConsultApi.replyToQuestion({quId:id,content:content}).then(function (list) {
						$.alert(list.msg).then(function () {
							//window.location.href='find_consult.html';
							//window.history.back();
							window.location.reload();
						});
					})
				}
			})
		});


	});


	// 举报(弹出框)
	$('#show_report').click(function () {
		Qnzs.getSessionAccount({}).then(function (data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			}

			$('.askBox2').show();
			$('#dark_report').show();
		});
	});

	// 举报(关闭)
	$('#askBox_report .fabu2,#askBox_report .quxiao').click(function(event) {
		$('#askBox_report').hide();
		$('#dark_report').hide();
	});

	// 举报(发布)
	$('#submit_report').click(function () {
		Qnzs.getSessionAccount({}).then(function (data) {
			if(data.status != 'OK') {
				$.alert(data.msg);
				return;
			}

			var reportReason = $('#reportContent').val();//举报内容
			var reportType = $('#reportType').val();
			if (!reportType && reportType != 0) {
				$.alert('请选择举报分类');
				return;
			}
			FindConsultApi.report({
				reportReason: reportReason,
				reportType: reportType,
				module: 2,
				reportAgainstId: quId
			}).then(function (data) {
				$('#askBox_report .fabu2,#askBox_report .quxiao').click();
				$.alert(data.msg);
				return;
				// console.log('举报', data)
			})
		})
	});
	// 点赞
	$('#likesGoodCommit').click(function () {
		
		
		Qnzs.getSessionAccount({}).then(function (data) {
			if (data.status == 'OK') {
				FindConsultApi.operatedCommit({quId: quId, actionType: 10}).then(function (data) {
					$('#likesGoodCommit').find("em").text(data.likesNum);
					$('#likesGoodCommit').toggleClass('cur');
					// console.log('点赞', data)

				})
			}else {
				$.alert('请先登录')
			}
		})
	});
	//收藏
	$('#CollectCommit').click(function () {
		Qnzs.getSessionAccount({}).then(function (data) {
			if (data.status == 'OK') {
				FindConsultApi.operatedCommit({quId: quId, actionType: 11}).then(function (data) {
					$('#CollectCommit').find("em").text(data.collectsNum);
					$('#CollectCommit').toggleClass('cur');
					// console.log('点赞', data)
				})
			}else {
				$.alert('请先登录')
			}
		})
	});

	// 删除帖子
	$('.edit .delete').click(function () {
		Qnzs.getSessionAccount({}).then(function (data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			}

			var account = data.account;

			if(account && askerAccid_global && account.username == askerAccid_global) {
				// 问题管理删除
				FindConsultApi.delete({quId: quId}).then(function (data) {
					$.alert(data.msg).then(function () {
						window.history.back(); // 返回上一页面
					});
				});
			}
		});
	});


	//打开发布
	$('#fbcomment').click(function () {
		Qnzs.getSessionAccount({}).then(function (data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			}

			$('#comment').show();
			var t = $('#comment').offset().top;  //#test是需要跳转的div id位置
			$(window).scrollTop(t);
		});
	});
	//打开回复
	$('#quesList').on('click', '.showComment', function () {
		Qnzs.getSessionAccount({}).then(function (data) {
			if (data.status != 'OK') {
				$.alert(data.msg);
				return;
			}

			$(this).parents('.Rinfor').find('.msg_borad').slideToggle();
		});
	});
	//关闭回复
	$('#quesList').on('click', '.closeBorad', function () {
		$(this).parents('.Rinfor').find('.msg_borad').hide();
	});
	
	$('#showComment0').click(function(){
		alert(1)
	})
	
});//文档准备结束









//删除评论
function delReply(repId){
	FindConsultApi.delReply({repId:repId}).then(function (data) {
		$('#listMsg' + repId).remove();
		window.location.reload();
	})
}

//删除回复
function delReply_to(repId){
	FindConsultApi.delReply({repId:repId}).then(function (data) {
		$('#listMsg_to' + repId).remove();
		window.location.reload();
	})
}

/**
 * 找咨询评论点赞
 * @param repId 评论ID
 * @param index 序号
 */
function likeReplyCommit(obj,repId){
	
	Qnzs.getSessionAccount({}).then(function (data) {
		if (data.status == 'OK') {
			FindConsultApi.replyLike({repId: repId}).then(function (data) {
				$(obj).find("em").text(data.likesCount);
				//判断是否点赞过
				$(obj).toggleClass('cur');
			})
		}else {
			$.alert('请先登录')
		}
	});
}




//评论回复
function buttonhuifu(repId,i) {

	// console.log('评论回复')
	var content = $('#comt_input'+i).val();
	FindConsultApi.replyToReply({repId:repId,content:content}).then(function (data) {
		window.location.reload();
		// console.log('评论回复00',data)
	});
}




//关闭发布
function comment() {
	$('#comment').hide();
}
//点击发开评论
function showComment0(i){

   $('.msg_borad_'+i).css({'display':'block','background':'#efefef'});

   
}
