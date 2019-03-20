/**
 * Created by Administrator on 2017/7/21.
 */
$(function () {
    var oid = Utils.getQueryString('oid'); // 组织ID
    //console.log('oid', oid);
    if (!oid) {
        $.alert('组织ID不能为空').then(function () {
            window.history.back(); // 返回上一页
        });
    }

    $('#liebiaofenye_a').attr('href','../find_active/zhd_pingfenliebiao.html?oid='+oid);
   
    var ImgUrl = Utils.getDefaultImg();

    var referrer = document.referrer;
    //console.log('referrer', referrer);
    var type_referrer = '1'; // 找活动
    if(referrer.indexOf('find_active') != -1) {
        type_referrer = '1'; // 找活动
    }else if(referrer.indexOf('find_consult') != -1) {
        type_referrer = '2'; // 找咨询(问答)
    }else if(referrer.indexOf('find_help') != -1) {
        type_referrer = '3'; // 找帮助
    }else if(referrer.indexOf('heavy_project') != -1) {
        type_referrer = '4'; // 重磅项目
    }else if(referrer.indexOf('young_family') != -1) {
        type_referrer = '5'; // 服务(青年之家)
    }
    //console.log('type_referrer', type_referrer);
    var path_referrer = { // 根据上一页面路径，判断名称
        '1': '找活动',
        '2': '找咨询',
        '3': '找帮助',
        '4': '重磅项目',
        '5': '青年之家'
    };
    $('.navigation .ulNav li').eq(parseInt(type_referrer)).find('a').addClass('conBgc02'); // 高亮导航栏相应的名称
    $('#prev_organization').text(path_referrer[type_referrer]); // 设置上个页面的名称
    // 点击 上一页面名称(面包屑)
    $('#prev_organization').click(function () {
       window.history.back(); // 返回上一页面
    });

    // 点击 '首页'(面包屑)
    $('#index_organization').click(function () {
        var index_link = $('.navigation .ulNav li').eq(0).find('a').attr('href'); // 公共头部 '首页'导航 按钮的href值
        //console.log('index_link', index_link);
        window.location.href = index_link; // 跳转到首页
    });

    // 获取找帮助管理获取单个组织详情
    FindHelpApi.findOrganizationById({oid: oid}).then(function (data) {
        //console.log('FindHelpApi.findOrganizationById data', data);
        var organization = data.rows;

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

            for(var j=0; j<5; j++) {
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


        // 获取精度
        function getFixed(num){
            return num ? num.toFixed(1) : '0.0';
        }
        // 获取整数
        function getNum(num) {
            return num ? num : '0';
        }


        var imgUrl =  organization.photoUrl ? organization.photoUrl : '../../public/img/default_avator.png';

        // var averageScore = (organization.helpAverageScore + organization.activityAverageScore) / 2; // 平均分(解决帮助和主办活动的平均分)
        // var scoreCount = (organization.helpScoreCount + organization.activityScoreCount); // 评分人数(解决帮助和主办活动的评分人数)
        var scoreCount = (organization.helpScoreCount + organization.activityScoreCount); // 评分人数(解决帮助和主办活动的评分人数)
        var averageScore = scoreCount ? (organization.helpAverageScore * organization.helpScoreCount  + organization.activityAverageScore * organization.activityScoreCount) / scoreCount : 0; // 平均分(解决帮助和主办活动的平均分)

        starHtmlHelp = star_generate(organization.helpAverageScore); // 解决帮助星星图标
        starHtmlActivity = star_generate(organization.activityAverageScore); // 主办活动星星图标
        starHtmlAverage = star_generate(averageScore); // 平均分星星图标

        $('#fullName').text(organization.fullName); // 组织全称
        $('#shortName').text(organization.name); // 组织简称
        $('#attentionCount').text(organization.attentionCount); // 关注数
        $('#title_organization').text(organization.name); // 组织简称(面包屑)
        $('#photoUrl').attr('src', imgUrl); // 头像url地址

        $('#averageScoreIcon').html(starHtmlAverage); // 评分星星图标
        $('#averageScore').text(getFixed(averageScore)); // 平均分(解决帮助和主办活动的平均分)
        $('#scoreCount').text(getNum(scoreCount)); // 评分人数(解决帮助和主办活动的评分人数)
        
        $('#helpAverageScoreIcon').html(starHtmlHelp); // 解决帮助评分星星图标
        $('#helpAverageScore').text(getFixed(organization.helpAverageScore)); // 解决帮助平均分
        $('#helpScoreCount').text(getNum(organization.helpScoreCount)); // 解决帮助评分人数
        
        $('#activityAverageScoreIcon').html(starHtmlActivity); // 主办活动评分星星图标
        $('#activityAverageScore').text(getFixed(organization.activityAverageScore)); // 主办活动平均分
        $('#activityScoreCount').text(getNum(organization.activityScoreCount)); // 主办活动评分人数
        

        $('#address').text(organization.address); // 地址
        $('#telephone').text(organization.telephone); // 电话
        if (organization.description!=null){
            $('#description').text(organization.description); // 描述
        }else {

            $('#description').text(""); // 描述
        }



        // 初始化 '求助' 弹出框
        $('#organization_info').find('.chakan').data('id', organization.oid); // 受理方ID(组织ID)
        $('#organization_info').find('.photoUrl').attr('src', imgUrl); // 受理方头像
        $('.list_tanchuang .list_tanchuang_t').find('.fullName').text(organization.fullName); // 受理方(求助弹出框标题)
        $('#organization_info').find('.fullName').text(organization.fullName); // 受理方
        $('#organization_info').find('.helpAverageScore').text(organization.helpAverageScore); // 组织评分
        $('#organization_info').find('.helpScoreCount').text(organization.helpScoreCount); // 已评人数
        $('#organization_info').find('.solveHelpCount').text(organization.solveHelpCount); // 已受理求助数
        $('#organization_info').find('attentionCount').text(organization.attentionCount); // 关注数
        $('#concern span').text(organization.isFollowed ? '取消关注': '关注'); // 是否关注
    });

    $('.scoreBox').mouseenter(function(event) {
        $('.scoreBox .floatingBox').fadeIn(200);
    }).mouseleave(function(event) {
        $('.scoreBox .floatingBox').fadeOut(200);
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


    // 点击 '向TA求助'(弹出求助对话框)
    $('#find_help').click(function () {// 获取账户信息
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

    // 监控 '是否需要筹款'
    $('#selectCK').change(function(){
        var opVal=$(this).children('option:selected').val();
        if(opVal==0){
            $('.moneyBox').hide();
        }else if(opVal==1){
            $('.moneyBox').show();
        }
    });


    // 点击 '确认'(求助对话框)
    $('#submit_help').click(function () {
    	
        var params = {
            title: $('#title').val(), // 帮助名称 
            helpPeople: $('#helpPeople').val(), // 求助人
            acquirer: oid, // 受理方
            orgId: oid, // 组织
            helpType: $('#helpType').find('option:selected').text(), // 求助类型(传中文名)
            idCard: $('#idCard').val(), // 身份证号
            mobile: $('#mobile').val(), // 电话
            whether: $('#selectCK').find('option:selected').text(), // 是否筹款(传中文名，是、否)
            totalAmount: $('#money').val(), // 筹款金额(传中文名，是、否)
            helpContent: $('.summernote1').summernote('code'), // 求助详情(进行过滤，以避免遭受XSS攻击)
            imgUrl: $('#imgUrl').text() // 找帮助图片(字符串)
        };

        if(!params.title) {
            $.alert('请输入标题');
            return;
        }
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
        FindHelpApi.addHelp(params).then(function (data) {
            //console.log('FindHelpApi.addHelp data', data);
            $(".bg_black .delete").click(); // 手动关闭求助申请对话框
            $.alert(data.msg).then(function () {
                window.location.reload(); // 刷新页面
            });
        })
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
                $('#concern span').text('关注');
            }else { // 关注成功，显示'取消关注'
                $('#concern span').text('取消关注');
            }
        }).always(function () {
            isClick = false;
        });
    });


    /*标题点击切换*/
    $('#list_big_box .list_box:not(:first)').hide();
    $('#list_big_box .title').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#list_big_box .list_box').eq($(this).index()).show().siblings('.list_box').hide();
    });


    function pageCheck(parentCell, contentCell, apiProxy, params, listFun, insertTotalSeletor) {
        $(parentCell).pageFun({
            contentCell: contentCell, /*包裹数据列表的父容器*/
            maxPage:6,/*显示页码框个数*/
            apiProxy: apiProxy, /*接口函数*/
            data: params,
            listFun: listFun /*数据列表函数 -- 返回html字符串*/
            // arg: arg  /*数据列表函数 的参数-可以是对象或数组等等*/
            // insertTotalSeletor: insertTotalSeletor // 接口总记录数选择器
        });
    }


    // 活动列表接口参数
    var params_activity = {
        orgId: oid,
        pageIndex: 1,
        pageSize: 10
    };

    // 活动列表 -- 分页器插件
    pageCheck('.hd_list_box', '.hd_list_ul', FindHelpApi.activitiesList, params_activity, hd_list, '#total_activity');

    /*TA的活动*/
    function hd_list(list){
    	//console.log(list)
        var html='';
        // var num=10;
        //console.log('hd_list list', list);

        var auditStatusName = {
            '1': '活动预告',
            '2': '报名中',
            '3': '已满员',
            '4': '报名结束',
            '5': '活动中',
            '6': '活动结束'
        };

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.imageUrl ? item.imageUrl : Utils.getDefaultImg();

            html+='<li class="bgcWhite fl">';
            html+=' <a href="../find_active/zhd_xiangqing.html?activityId=' + item.id + '" class="disB clearfix">';
            html+='  <div class="list_box_l fl">';
            html+='   <img src="' + imgUrl + '" height="81" width="120" alt="" />';
            html+='  </div>';
            html+='  <div class="list_box_r fl">';
            html+='   <h4 class="font16 color000 title">' + item.title + '</h4>';
            html+='   <p class="font12 color999 hd_time">' + item.activityTime + '</p>';
            html+='   <p class="font12 color999" style="width:350px;">' + item.address + '</p>';
            html+='  </div>';
            html+='  <span class="hd_state font12 color2185cf">' + auditStatusName[item.actStatus] + '</span>  ';
            html+=' </a>';
            html+='</li>';
        }
        return html;
    }


    // 回答列表接口参数
    var params_answer = {
        page: 1, // 当前页码(可不传，默认为1)
        rows: 10, // 每页记录数(可不传，默认为10)
        username : oid // 专家ID/组织ID
    };

    /*TA的回答*/
    function ask_list(list){
        var html='';

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.photourl ? item.photourl : Utils.getDefaultImg();

            html += '<div onclick="window.location.href=\'../find_consult/find_consult_quesdetail.html?quId=' + item.quId + '\'" class="itemBox bgcWhite">';
            html += ' <div class="itemCon clearfix">';
            html += '  <div class="imgDiv fl">';
            html += '   <img src="' + imgUrl + '" />';
            html += '  </div>';
            html += '  <div class="rightTxt">';
            html += '   <h3 class="font16 color2185cf title">' + item.title + '</h3>';
            html += '   <div class="color000 content">' + item.askContent + '</div>';
            html += '   <div class="botBox clearfix">';
            html += '    <div class="left fl">';
            html += '     <span class="span01 borderR01">' + item.realname + '</span>';
            html += '     <span class="span02">' + item.categoryName + '</span>';
            html += '     <span class="span03">' + item.askTime + '</span>';
            html += '    </div>';
            html += '    <span class="right fr color333 pinglun">'+ item.commentsNum +'</span>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</div>';
        }

        return html;
    }

    // 回答列表 -- 分页器插件
    pageCheck('.answer_list_box', '.answer_list', FindHelpApi.getExpAnswerList, params_answer, ask_list, '#total_answer');

    // 解决帮助列表接口参数
    var params_help = {
        page: 1, // 当前页码(可不传，默认为1)
        rows: 10, // 每页记录数(可不传，默认为10)
        oid : oid // 组织ID
    };

    /*TA的帮助*/
    function help_list(list){
        var html='';
        var auditStatusName = {
            '0': '处理中',
            '1': '求助中',
            '2': '已解决',
            '3': '等待处理',
            '4': '删除',
            '5': '退回',
            '6': '组织帮助中'
        };

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.imgUrl ? item.imgUrl.split(',')[0] : Utils.getDefaultImg();

            html += '<a href="../find_help/detail.html?id=' + item.hpId + '" class="disB itemBox bgcWhite">';
            html += ' <div class="itemCon borderB01 clearfix">';
            html += '  <div class="imgDiv fl">';
            html += '   <img src="' + imgUrl + '"/>';
            html += '  </div>';
            html += '  <div class="rightTxt">';
            html += '   <div class="top clearfix" style="height:39px;">';
            html += '    <span class="fl colorfff">' + auditStatusName[item.auditStatus] + '</span>';
            html += '    <h3 class="color000 font16 fl" style="margin-top:0px;">《' + item.title + '》</h3>';
            html += '   </div>';
            html += '   <div class="longTxt color999" style="height:50px;">' + item.helpContent + '</div>';
            html += '   <div class="middle color000">';
            html += '    <span class="left borderR01">受理方：' + item.acquirerRealName + '</span>';
            html += '    <span class="right">求助类型：' + item.helpType + '</span>';
            html += '   </div>';
            html += '   <div class="bottom clearfix color000">';
            html += '    <span class="span02 fl">' + item.countPost + '</span>';
            html += '    <span class="span03 fl">' + item.createTime + '</span>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }
        return html;
    }

    // 解决帮助列表 -- 分页器插件
    pageCheck('.help_list_box', '.help_list', FindHelpApi.getPcHelpListByOid, params_help, help_list, '#total_help');

    // 重磅项目列表接口参数
    var params_heavy = {
        districtId: undefined, // 所属地区ID(可不传)
        activityType: undefined, // 活动类型(可不传，推荐、赛事、评选、培训、其他))
        stage: undefined, // 活动阶段(可不传，0-全部、1-未开始、2-报名中、3-投票中、4-活动结束、5-报名投票同时进行中)
        createOrgId: oid, // 发布组织(oid)(可不传)
        pageNo: 1, // 当前页码(可不传)
        pageSize: 10 // 每页记录数(可不传)
    };

    /*TA的重磅*/
    function heavy_list(list){
        var html='';

        var stageName = {
            '1': '未开始',
            '2': '报名中',
            '3': '投票中',
            '4': '活动结束' //（2/3为活动进行中）
        };

        function diffDateTime(bigTime, smaTime) {
            var day = 0; // 相隔天数
            var hour = 0; // 相隔小时数
            if (bigTime > smaTime) {
                var diffMs = bigTime - smaTime; // 相隔毫秒数
                day = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 相隔天数
                hour = diffMs % (1000 * 60 * 60 * 24); // 相隔小时数
                hour = Math.floor(hour / (1000 * 60 * 60));
            }
            return day + '天' + hour + '小时';
        }

        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.bannerUrl ? item.bannerUrl : Utils.getDefaultImg();
            html+='<li class="bgcWhite fl zbxm_box">';
            html+=' <a href="../heavy_project/heavy_project_model1_index.html?activityId=' + item.id + '">';
            html+='  <div class="xm_pic" style="width: 546px; height: 235px;">';
            html+='   <img src="' + imgUrl + '" class="pic" style="max-width: 100%;max-height: 100%;" />';
            html+='  </div>';
            html+='  <div class="xm_mes clearfix">';
            html+='   <span class="xm_style fl font16">' + item.type + '</span>';
            html+='   <h4 class="font16 color000 fl">' + item.title + '</h4>';
            html+='   <span class="xm_state fr">';

            if (item.stage == 1) {
                var bigTime = new Date(item.startTime).getTime();
                var smaTime = new Date().getTime();
                var diffDate = diffDateTime(bigTime, smaTime);
                html += '    <span class="xm_state fr" style="color: #33cc33;font-size: 12px; line-height: 23px;">未开始&nbsp;' + diffDate + '后</span>';
            } else if (item.stage == 2 || item.stage == 5) { // 报名中
                var bigTime = new Date(item.endTime).getTime();
                var smaTime = new Date(item.startTime).getTime();
                var diffDate = diffDateTime(bigTime, smaTime);
                html += '    <span class="xm_state fr" style="color: #33cc33;font-size: 12px; line-height: 23px;">报名中&nbsp;剩' + diffDate + '</span>';
            } else if (item.stage == 3) {
                var bigTime = new Date(item.voteEndTime).getTime();
                var smaTime = new Date(item.voteStartTime).getTime();
                var diffDate = diffDateTime(bigTime, smaTime);
                html += '    <span class="xm_state fr" style="color: #33cc33;font-size: 12px; line-height: 23px;">投票中&nbsp;剩' + diffDate + '</span>';
            } else {
                html += '    <span class="xm_state fr" style="color: #ccc;font-size: 12px; line-height: 23px;">已结束</span>';
            }


            html+='   </span>';
            html+='  </div>';
            html+=' </a>';
            html+='</li>';
        }
        return html;
    }

    // 重磅项目列表 -- 分页器插件
    pageCheck('.heavy_list_box', '.heavy_list', FindHelpApi.activityList, params_heavy, heavy_list, '#total_heavy');

    // 服务列表接口参数
    var params_service = {
        page: 1, // 当前页码(可不传，默认为1)
        rows: 10, // 每页记录数(可不传，默认为10)
        oid : oid // 组织ID
    };

    /*TA的服务*/
    function service_list(list){
        var html='';
        
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var imgUrl = item.stationImg ? item.stationImg : Utils.getDefaultImg();

            html+='<a href="../young_family/detail.html?staId=' + item.stationId + '" class="fl bgcWhite clearfix anli_list">';
            html+=' <div class="anli_l fl">';
            html+='  <img src="' + imgUrl + '" class="pic" />';
            html+=' </div>';
            html+=' <div class="anli_r fl">';
            html+='  <div class="color999 font14 color2185cf title">' + item.quesTitle + '</div>';
            if (item.description==null){
                html+='  <div class="color000 font12 mes content"></div>';
            }else {

                html+='  <div class="color000 font12 mes content">' + item.description + '</div>';
            }

            html+='  <p class="color666 pinglun">' + item.statusStr + '</p>';
            html+=' </div>';
            html+=' <span class="font12 color666 anli_time">' + item.applyTime + '</span>';
            html+='</a>';
        }

        return html;
    }

    // 解决帮助列表 -- 分页器插件
    pageCheck('.service_list_box', '.service_list', FindHelpApi.getOffLineServicePageByOid, params_service, service_list, '#total_service');
    
    
    
    
   
   
    
    
});