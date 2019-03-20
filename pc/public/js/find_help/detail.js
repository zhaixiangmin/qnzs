/**
 * Created by Administrator on 2017/6/26.
 */
$(function () {
    var id = Utils.getQueryString('id'); // 找帮助ID
    if (!id) {
        $.alert('找帮助ID不能为空').then(function () {
            window.history.back(); // 返回上一页
        });
    }
    //console.log('id', id);
    var releaseType = undefined; // '我要帮TA' 类型(zhiyuan：i志愿，腾讯公益和i志愿，只有i志愿  才出提示)
    var releaseUrl = undefined; // '我要帮TA' 链接
    var oid = undefined; // 组织ID(全局变量)

    // 审核名称
    var auditTypeName = {
        '0': '组织正在处理中',//1
        '1': '求助进行时',//
        '2': '困难已解决',//1
        '3': '等待组织处理',//1
        '4': '删除',
        '5': '被组织退回',//1
        '6': '组织帮助'//1
    };
    // 找帮助详情
    FindHelpApi.pcHelpDetail({id: id}).then(function (result) {
    	console.log(result)
        var helpDetail = result.rows;
         helpAudit_html =  result.helpAudit;
        releaseType = helpDetail.releaseType; // '我要帮TA' 类型(zhiyuan：i志愿，腾讯公益和i志愿，只有i志愿  才出提示) 全局变量
        releaseUrl = helpDetail.releaseUrl; // '我要帮TA' 链接(全局变量)

        $('.title').text(helpDetail.title); // 帮助名称
        $('.audit_status').text(auditTypeName[helpDetail.auditStatus]); // 帮助状态
        $('.helpPeople').text(helpDetail.helpPeople); // 求助人
        $('.helpType').text(helpDetail.helpType); // 求助类型
        $('.totalAmount').text(helpDetail.totalAmount); // 筹款金额
        $('.helpContent').html(helpDetail.helpContent); // 求助详情
        // helpDetail.recollections = '受助者感言内容'; // 造数据
        $('.ganyanBox').val(helpDetail.recollections); // 受助者感言内容

        if(helpDetail.auditStatus == 1) { // 求助中
            $('#help_people').show(); // 显示 '我要帮TA'
        }else if(helpDetail.auditStatus == 2 && !helpDetail.recollections) { // 已解决(且已发表答谢感言)

            // 获取当前用户信息
            Qnzs.getSessionAccount({}).then(function (data) {
                if(data.status != 'OK') { // 用户没有登录
                    return;
                }

                var account = data.account;
                if(account.username != helpDetail.applicant) { // 当前用户 非 求助申请人
                    return;
                }

                $('#appreciation').show(); // 显示 '发表答谢感言'
            });
        }

        // 造数据
        var imgList = helpDetail.imgUrl ? helpDetail.imgUrl.split(',') : [];
       
        if(imgList && imgList.length > 0) {
        
            var imgUrls = imgList;
            var autoPlay = imgUrls.length > 0 ? true : false;
            var html = '';
            var html_li = '';
            var img ='';
            for(var i=0; i<imgUrls.length; i++) {

                var imgUrl = imgUrls[i];
                if(imgUrl){
            	
	                  var  s1 = imgUrl.split('//');
	                  console.log(s1[0])
	                 if(s1[0] !='https:' &&s1[0] !='http:'){
	                 	console.log(1)
	                 
	                 	img ='../../public/img/user_headImg/1 ('+parseInt(Math.random()*10*4)+').png';
	                 }else{
	                 	
	                 	img =imgUrls[i] ;
	                 	
	                 }
	                 
	               
	            }else{
	                 	
	                 img ='//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171016/20171016164618_7141C0886B7-8E9E-4EA9-A7E4-7DF45C1EB329-189-0000000FEA4705E1_tmp.jpg';
	            	
	            	
	            }
	                
                html += '<li><img src="' + img + '" /></li>';
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
            var windowWidth = $(window).width();
            var top = windowHeight * 0.1; // 窗口高度
            $('#slideBox_Big').css('margin-top', top); // Superslide垂直居中(相对浏览器窗口)
            $('#slideBox_Big .bd li').css('line-height', (windowHeight * 0.8) + 'px' ); // 图片垂直居中(Superslide里面)
            $('#slideBox_Big .bd li').css('height', (windowHeight * 0.8) + 'px' ); // 图片父容器高度(Superslide里面)
            $('#slideBox_Big .bd li').css('width', (windowWidth * 0.8) + 'px' ); // 图片父容器宽度(Superslide里面)
        }else{
        	  
        	
        	   //由于前任写代码不严谨，判断不正确，故在else再判断一遍
        	
        	    var imgUrls = imgList;
	            var autoPlay = imgUrls.length > 0 ? true : false;
	            var html = '';
	            var html_li = '';
	            var img ='';
	           
	            img ='../../public/img/user_headImg/1 ('+parseInt(Math.random()*10*4)+').png';
	            html += '<li><img src="' + img + '" /></li>';
	            html_li += '<li>' + (i+1) + '</li>';
	            $('#slideBox .hd ul').html(html_li); // 渲染页码
	            $('#slideBox .bd ul').html(html); // 渲染图片
	            jQuery("#slideBox").slide({mainCell:".bd ul", autoPlay: autoPlay, mouseOverStop: true}); // SuperSlide插件滑动
	            $('#slideBox').show(); // 显示SuperSlide插件
	
	             $('.on').hide()  //隐藏no
	            $('#slideBox_Big .hd ul').html(html_li); // 渲染页码
	            $('#slideBox_Big .bd ul').html(html); // 渲染图片
	            jQuery("#slideBox_Big").slide({mainCell:".bd ul", autoPlay: autoPlay, mouseOverStop: true}); // SuperSlide插件滑动(大图)
	
	
	            var windowHeight = $(window).height();
	            var windowWidth = $(window).width();
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

        oid = helpDetail.acquirer; // 组织ID(全局变量)
        // 获取找帮助管理获取单个组织详情
        FindHelpApi.findOrganizationById({oid: helpDetail.acquirer}).then(function (data) {
            var acquirer = data.rows;
            var photoUrl = acquirer.photoUrl;
            if (!photoUrl) {
                photoUrl = '../../public/img/default_avator.png';
            }
            $('#photoUrl_acquirer').attr('src', photoUrl); // 受理方头像
            $('#name_acquirer').text(acquirer.name); // 受理方名称
            $('#helpAverageScore_acquirer').text(acquirer.helpAverageScore); // 平均分
            $('#helpScoreCount_acquirer').text(acquirer.helpScoreCount); // 评分人数
            $('#solveHelpCount_acquirer').text(acquirer.solveHelpCount); // 已受理求助
            $('#attentionCount_acquirer').text(acquirer.attentionCount); // 关注数
            $('#concern').text(acquirer.isFollowed ? '取消关注': '关注'); // 是否关注
        });

        // 处理进度
        var helpAuditList = result.helpAudit;
        var statusNum = 0;//最新进展
        for (var i = 0; i < helpAuditList.length; i++) {
            var helpAudit = helpAuditList[i];
            var auditName = (helpAudit.auditType || helpAudit.auditType == 0) ? auditTypeName[helpAudit.auditType] : '';
                var textHtml = '';
                textHtml += '<li>'
                 textHtml +='<i class="iDot"></i>' 
                 textHtml +='<div class="liDiv">' 
                textHtml +='<p class="status clearfix">'
                
               if(helpDetail.interfaceHpId != null && helpAudit.auditType == 6){
               	 if(statusNum > 0){
               	 	textHtml +=  ' <span class="fl">' + helpAudit.updateTime + ' 最新进展' + statusNum +'</span>'
               	 }else{
               	 	textHtml +=  ' <span class="fl">' + helpAudit.updateTime + ' ' + auditName +'</span>'
               	 }
               	 statusNum = statusNum + 1;
               }else{
               	 textHtml +=  ' <span class="fl">' + helpAudit.updateTime + ' ' + auditName +'</span>'
               }
               
               if(helpAudit.auditType != 3 && (helpAudit.imgUrl || helpAudit.fileUrl)){
                	textHtml += '<span class="show_back_hide" style="padding:2px 10px; background:#2185cf;border-radius:5px ;margin-left:10px;color:white; cursor: pointer;" onclick="f2('+ helpAudit.auditId+')" >进度详情</span >   '
               }
               
                 textHtml +=    '    </p> '
                 textHtml +='<div class="describe">' 
                 textHtml +='<p>' + helpAudit.content + '</p>' 
                 textHtml +='</div>' 
                 textHtml +='</div>' 
                 textHtml +='</li>'
            if (i == 0 && i == helpAuditList.length - 1) {
                textHtml = textHtml.replace('<li>', '<li class="cur lastLi lastLi">');
            } else if (i == 0) {
                textHtml = textHtml.replace('<li>', '<li class="firstLi">');
            } else if (i == helpAuditList.length - 1) {
                textHtml = textHtml.replace('<li>', '<li class="cur lastLi">');
            }
            $('.liuchengtu .rightP').append(textHtml);
            
		    /*** 显示进度详情  弹窗***/
			
			$('.show_back_hide').click(function(){
				
				$('.bg_black').show()  //显示背景
				
			})
            
            
            
        }
    });


    // 点击 '我要帮TA'
    $('#help_people').click(function () {
        // '我要帮TA' 类型(zhiyuan：i志愿，腾讯公益和i志愿，只有i志愿  才出提示)
        if (releaseType && releaseType == 'zhiyuan') {
            //console.log('我要帮他');
            $.alert('助人自助，请登录i志愿平台帮TA一把！').then(function () {
                window.location.href = releaseUrl; // 跳转链接
            });
            return;
        }

        window.location.href = releaseUrl; // 跳转链接
    });


    // // 图片放大浏览
    // var srcFirst = $('#imgList li:first img').attr('src');
    // $('.detailImgEnlarge img').attr('src', srcFirst);
    // jQuery('.leftBox').slide({
    //     mainCell: '.imgBox ul',
    //     autoPlay: false,
    //     autoPage: true,
    //     effect: 'fold',
    //     delayTime: 300,
    //     pnLoop: false
    // });
    // $('#imgList li:first').addClass('cur');
    // $('.leftBox .next').click(function (event) {
    //     if (!$('.imgBox .imgList li:last').hasClass('cur')) {
    //         $('.imgList .cur').removeClass('cur').next().addClass('cur');
    //         var thisSrc = $('.imgList .cur img').attr('src');
    //         $('.detailImgEnlarge img').attr('src', thisSrc);
    //     }
    // });
    // $('.leftBox .prev').click(function (event) {
    //     if (!$('.imgBox .imgList li:first').hasClass('cur')) {
    //         $('.imgList .cur').removeClass('cur').prev().addClass('cur');
    //         var thisSrc = $('.imgList .cur img').attr('src');
    //         $('.detailImgEnlarge img').attr('src', thisSrc);
    //     }
    // });
    // $('.botDiv span.fangda').click(function (event) {
    //     $('.detailImgEnlarge').fadeIn(200);
    //     $('body').addClass('overflow_h');
    // });
    // $('.detailImgEnlarge .close_img').click(function (event) {
    //     $('.detailImgEnlarge').fadeOut(200);
    //     $('body').removeClass('overflow_h');
    // });// 图片放大浏览

    /**
     * 评论列表函数
     * @param List {array} 评论列表
     */
    var commentFun = function (List) {
        var html = '';
        for (var i = 0; i < List.length; i++) {
            var item = List[i];
            //var createTime = new Date(item.createTime).format('yyyy/MM/dd hh:mm');
            if (!item.photoUrl) {
                item.photoUrl = '../../public/img/default_avator.png';
            }
            html += '<div class="userWordList clearfix">';
            html += ' <span class="imgSpan fl">';
            html += '  <img src="' + item.photoUrl + '" alt="" />';
            html += ' </span>';
            html += ' <div class="rightTxt">';
            html += '  <div class="topTxt">';
            html += '   <em class="color2185cf">' + item.realname + '</em>';
            html += '   <span class="span01">' + item.createTime + '</span>';
            html += '  </div>';
            html += '  <p class="botTxt color000">' + item.content + '</p>';
            html += ' </div>';
            // html+=' <div class="handleBox clearfix">';
            // html+='  <span class="fr delete color999o">删除</span>';
            // html+=' </div>';
            html += '</div>';
        }
        return html;
    };

    // 评论列表(分页器)
    $('.pageBox').pageFun({
        contentCell: '.pageDiv', /*包裹数据列表的父容器*/
        maxPage: 6, /*显示页码框个数*/
        pageFun: function (i) {
            var pageHtml = '<li class="pageNum">' + i + '</li>';
            return pageHtml;
        },
        apiProxy: FindHelpApi.getPostPage, /*接口函数*/
        data: {
            /*接口参数*/
            id: id, // 找帮助ID
            page: 1,
            rows: 5
        },
        listFun: commentFun, /*数据列表函数 -- 返回html字符串*/
        arg: '', /*数据列表函数 的参数-可以是对象或数组等等*/
        insertTotalSeletor: '#total_comment' // 评论总记录数
    });

    // 切换选项卡 -- 求助详情、处理进度、评论、受助者感言
    $('.act_jieshao .tit span').click(function (event) {
        $(this).addClass('cur').siblings('span').removeClass('cur');

        $('.commonTab').hide(); // 隐藏板块 -- 求助详情、处理进度、评论、受助者感言

        //console.log('$(this).text()', $(this).text());
        if ($(this).text() == '求助详情') { // 求助详情
            //console.log('求助详情');
            $('.huodongjieshao').show();
        } else if ($(this).text() == '处理进度') { // 处理进度
            //console.log('处理进度');
            $('.chulijindu').show();
        } else if ($(this).text().indexOf('评论') != -1) { // 评论
            //console.log('评论');
            $('.pinglun').show();
        } else if ($(this).text() == '受助者感言') { // 受助者感言
            //console.log('受助者感言');
            $('.shouzhuganyan').show();
        }
    });

    /*评论区域 */
    // 点击 '我要评论'
    $('#evaluate').click(function (event) {
    	
    	var myDate = new Date();//获取系统当前时间
    	
        var mytime=myDate.getHours();    //获取当前时间
     
    	if(0<=mytime&& mytime<=7){
    		
    		alert('该板块正在维护中，请早上7点后再试')
    		return ;
    	}
    
        // 获取账户信息
        Qnzs.getSessionAccount({}).then(function (data) {
            if (data.status != 'OK') { // 用户未登录
                $.alert('请先登录');
                return;
            }

            //console.log('Qnzs.getSessionAccount data', data);
            var account = data.account;
            var photoUrl = account.photoUrl;
            if (!photoUrl) {
                photoUrl = '../../public/img/default_avator.png';
            }
            $('#photoUrl_account').attr('src', photoUrl); // 用户头像
            $('#realname_account').text(account.realname); // 用户名称

            $('#evaluate').siblings('.show_box').stop().fadeIn(150);
        });

    });

    // 点击 '取消'(评论)
    $('.topTalk .cancel').click(function () {
        $(this).parents('.topTalk').fadeOut(150);
    });
    // 点击 '提交'(评论)
    $('.topTalk .submit_btn').click(function () {
        var content = $('#content_comment').val(); // 评论内容
        if (!content) {
            $.alert('请输入评论内容');
            return;
        }

        // 添加评论
        FindHelpApi.addPost({id: id, content: content}).then(function (data) {
            //console.log('FindHelpApi.addPost data', data);
            $.alert(data.msg).then(function () {
                window.location.reload(); // 刷新页面
            });
        });
    });


    // 举报弹出框
    var report_type=['其他','欺诈','色情','诱导行为','不实信息','违法犯罪','骚扰','侵权(冒充他人、侵犯名誉等)'];
    for (var i = 0; i < report_type.length; i++) {
        $('#report_type').append('<option value='+i+'>'+report_type[i]+'</option>')
    }
    // 点击 '举报'
    $('#report').click(function(event) {
        Qnzs.getSessionAccount({}).then(function (data) {
            if(data.status == 'ALERT') {
                $.alert(data.msg);
                return;
            }

            $('.report_popup').show();
            $('body').addClass('overflow_h');
        });
    });
    // 点击 '取消'、'x'按钮(举报弹出框)
    $('.report_popup .cancel,.report_popup .delete').click(function(event) {
        $('.report_popup').hide();
        $('body').removeClass('overflow_h')
    });
    // 点击发布(举报弹出框)
    $('#submit_report').click(function () {
        var data = {
            module: 3, // 1-找活动、2-找咨询、3-找帮助、4-重磅项目、5-线下服务
            reportAgainstId: id, // 找帮助ID(全局变量)
            reportType: $('#report_type').children('option:selected').val(), // 举报分类(0-其他、1-欺诈、2-色情、3-诱导行为、4-不实信息、5-违法犯罪、6-骚扰、7-侵权(冒充他人、侵犯名誉等))
            reportReason: $('#reason_report').val() // 举报理由/内容
        };
        //console.log('submit_report data', data);

        if(!data.reportType) {
            $.alert('请选择举报分类');
            return;
        }

        // 举报投诉
        FindHelpApi.report(data).then(function (data) {
            $('.report_popup .cancel,.report_popup .delete').click(); //  // 触发关闭弹出框事件（举报）
            $.alert(data.msg);
            return;
        });

    });

    // 点击 '发表答谢感言'
    $('#appreciation').click(function () {
        Qnzs.getSessionAccount({}).then(function (data) {
            if(data.status == 'ALERT') {
                $.alert(data.msg);
                return;
            }

            $('.bg_black').show();
            $('body').addClass('overflow_h');
        });
    });


    // 点击 'x'图标(求助对话框)
    $(".bg_black .delete").click(function(){
        // // 重置
        $('.list_tanchuang_b .content_l').find('.reset_val').val(''); // 标题、求助人、身份证号、联系电话、筹款金额
        $('#helpType').find('option').eq(0).prop('selected', true); // 求助类型
        $('#selectCK').find('option').eq(0).prop('selected', true); // 是否需要筹款
        editor.txt.html(''); // 求助详情(富文本)
        // uploader.reset(); // 清空图片


        $(".bg_black").hide();
        $('body').removeClass('overflow_h');
    });

    // 富文本框
    var E = window.wangEditor;
    var editor = new E('#editor');

    // 配置服务器端地址(上传图片)
    editor.customConfig.uploadImgServer = FindHelpApi.fileUploadUrl;

    // 监听函数(上传图片)
    editor.customConfig.uploadImgHooks = {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件
        before: function (xhr, editor, files) {
            //console.log('before');
            //console.log('xhr', xhr);
            //console.log('editor', editor);
            //console.log('files', files);
        },
        success: function (xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
            //console.log('success');
            //console.log('xhr', xhr);
            //console.log('editor', editor);
            //console.log('result', result);
        },
        fail: function (xhr, editor, result) {
            // 图片上传并返回结果，当图片插入错误时触发
            // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务端返回的结果
            //console.log('fail');
            //console.log('xhr', xhr);
            //console.log('editor', editor);
            //console.log('result', result);
            $.alert('图片插入错误');
        },
        error: function (xhr, editor) {
            // 图片上传错时触发
            // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
            //console.log('error');
            //console.log('xhr', xhr);
            //console.log('editor', editor);
        },
        timeout: function (xhr, editor) {
            // 图片上传超时触发
            // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
            //console.log('timeout');
            //console.log('xhr', xhr);
            //console.log('editor', editor);
            $.alert('图片上传超时');
        },
        customInsert: function (inserImg, result, editor) {
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

    editor.create();// 富文本框
    

    // 点击 '星星' 图标
    $('.myScoreBoxParent .myScoreBox ul li em').click(function(event) {
        var thisIex = $(this).parent().parent().index();
        var thisNum = thisIex+1;
        $('input[name="score"]').val(thisNum); // 星级评分
        $('.myScoreBox ul li:lt('+thisNum+')').children().children().addClass('cur');
        $('.myScoreBox ul li:gt('+thisIex+')').find('em').removeClass('cur');
    });
    // 点击 '确定'(评分功能)
    $('#submit_help').click(function () {
        var params = {
            hpId: id, // 找帮助ID
            evaluate: filterXSS(editor.txt.html()), // 答谢内容
            score: $('input[name="score"]').val() // 星级评分
        };
        if(!params.evaluate) {
            $.alert('请输入答谢感言');
            return;
        }
        if(params.evaluate.length < 12) { // <p>你好</p>
            $.alert('够5个字才能提交哦！');
            return;
        }
        if(!params.score) {
            $.alert('评星才能提交哦！');
            return;
        }

        // 帮助添加答谢感言
        FindHelpApi.helpEvaluateByInterface(params).then(function (data) {

            $(".bg_black").hide();
            $('body').removeClass('overflow_h');

            $.alert(data.msg).then(function () {
                window.location.reload(); // 刷新当前页面
            })
        });
    });


    var isClick = false; // 是否已点击(true：已点击，false：未点击)
    // 点击 '关注'
    $('#concern').click(function () {
        if(isClick) { // 如果已点击
            return;
        }
        isClick = true; // 设置已点击
        FindHelpApi.followOrCancel({ orgId: oid }).then(function (data) {
            if(data.msg.indexOf('取消') != -1) { // 取消关注成功，显示'关注'
                $('#concern').text('关注');
            }else { // 关注成功，显示'取消关注'
                $('#concern').text('取消关注');
            }
        }).always(function () {
            isClick = false;
        });
    });
});