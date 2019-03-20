/**
 * Created by Administrator on 2017/7/24.
 */
$(function () {
    var acquirer = Utils.getQueryString('acquirer'); // 受理方ID
    var name = Utils.getQueryString('name'); // 受理方名称
    if (!acquirer || !name) {
        $.alert('受理方不能为空').then(function () {
            window.history.back(); // 返回上一页
        });
    }
    console.log('acquirer', acquirer);
    console.log('name', name);


    $('#acquirer').text(name); // 受理方名称
    
    // 点击 '求助类型'
    $('#choose2').click(function () {
        $('.bgcBlackwindow').show(); // 背景幕 显示
        $('.askQuestionBottom .askQuestionUL2').show(); // 求助类型 下拉框显示
    });

    // 点击 '求助类型' 下拉框
    $('.askQuestionBottom .askQuestionUL2 li').click(function () {
        var type = $(this).text();
        console.log('type', type);
        $('#helpType').text(type);
        $('.bgcBlackwindow').hide(); // 背景幕 隐藏
        $('.askQuestionBottom .askQuestionUL2').hide(); // 求助类型 下拉框隐藏
    });

    // 点击 '是否筹款'
    $('#choose3').click(function () {
        $('.bgcBlackwindow').show(); // 背景幕 显示
        $('.askQuestionBottom .askQuestionUL3').show(); // 是否筹款 下拉框显示
    });

    // 点击 '是否筹款' 下拉框
    $('.askQuestionBottom .askQuestionUL3 li').click(function () {
        var whether = $(this).text();
      
        console.log('whether', whether);
        $('#whether').html(whether);
        $('#whether').val(whether);
        $('.bgcBlackwindow').hide(); // 背景幕 隐藏
        $('.askQuestionBottom .askQuestionUL3').hide(); // 是否筹款 下拉框隐藏
        if(whether == '是'){
            $('#totalAmount_parent').show(); // 显示 筹款金额 输入框
        }else {
            $('#totalAmount_parent').hide(); // 隐藏 筹款金额 输入框
        }
    });

    // 点击 '图片+'
    $('#imgAdd').click(function () {
        var len = $('.imgdiv').length;
        console.log('图片数量 len', len);

        if(len >=8) {
            $.alert('图片上传最多8张');
            return;
        }

        $('#photo_add').click(); // 手动触发图片文件选择
    });


    // 新增 -- 监听图片变化
    $('#photo_add').change(function () {
        console.log('photo_add');
        Qnzs.upLoadFile($('#photo_add')).then(function (data) {
            var html = '';
            // console.log('data', data);
            photoUrl = data.url;
            // $('#showphoto_add').attr('src',photoUrl); // 显示图片

            html += '<div class="imgdiv" style="float:left;">';
            html += '    <div class="imgOut">';
            html += '        <div class="imgIn">';
            html += '            <img class="imgShow" src="' + photoUrl + '" />';
            html += '        </div>';
            html += '    </div>';
            html += '</div>';

            $('#imgAdd').before(html); // 添加图片按钮前 插入图片
        });

    });

    // 点击 '提交' 按钮
    $('#submit_help').click(function () {
        var imgUrlArr = []; // 图片数组
        $('.imgdiv').each(function () {
            var src = $(this).find('.imgShow').attr('src');
            // console.log('src', src);
            imgUrlArr.push(src);
        });

        console.log('imgUrlArr', imgUrlArr);
        // params.imgUrl = imgUrlArr.join(',');
        // console.log('params.imgUrl', params.imgUrl);
        
        var params = {
            title: $('#title').val(), //  帮助名称
            helpPeople: $('#helpPeople').val(), //  求助人
            acquirer: acquirer, //  受理方
            helpType: $('#helpType').text(), //  求助类型(传中文名)
            idCard: $('#idCard').val(), //  身份证号
            mobile: $('#mobile').val(), //  电话
            whether: $('#whether').text(), //  是否筹款(传中文名，是、否)
            totalAmount: $('#totalAmount').val(), //  筹款金额
            imgUrl: imgUrlArr.join(','), //  找帮助图片
            helpContent: $('#helpContent').val() // 求助详情
        };

        if(!params.title) {
            $.alert('请输入标题');
            return;
        }
        console.log('params.title.length', params.title.length);
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
        if(!params.helpContent) {
            $.alert('请输入求助详情');
            return;
        }
        if(params.helpContent.length <= 100) {
            $.alert('请输入100字以上的求助详情！');
            return;
        }
        if(!params.imgUrl) {
            $.alert('请选择照片');
            return;
        }


        // 提交求助
        FindHelpApi.addHelp(params).then(function (data) {
            console.log('FindHelpApi.addHelp data', data);
            $.alert(data.msg).then(function () {
                window.history.back(); // 返回上一页
            })
        })
    })
});