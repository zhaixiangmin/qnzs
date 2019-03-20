$(function () {
    var second_global = 60; // 倒数秒数(全局变量)
    var interval_global = undefined; // 计数器对象(全局变量)
    var username_global = undefined; // 用户名(全局变量)
    var url_global = Utils.getQueryString('url'); // 上一页面跳转链接(全局变量)

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function (data) {
        if(data.status != 'OK') {
            $.alert(data.msg);
            return;
        }

        var account = data.account;
        if(account) {
            username_global = account.username; // 用户ID(全局变量)
            $('#phone').text(account.mobile); // 手机号
        }
    });


    /**************   图片流   **************/
    function  changeModel(){
        var xmlhttp;
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",Qnzs.path+"/pc/account/updateMobileValidCode",true);
        xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");
        xmlhttp.setRequestHeader("Content-Type", "application/xml");
        xmlhttp.withCredentials = true;
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function(){
            // console.log(this);
            if (this.status == 200) {
                var blob = this.response;
                $('#img').attr('src', window.URL.createObjectURL(blob));
            }
        };
        xmlhttp.send();
    }
    changeModel(); // 初始化图形验证码

    // 新手机号 -- 失去焦点事件
    $('#new_phone').blur(function () {
        var mobile = $(this).val().trim();
        if(mobile) {
            if(!Utils.checkMobile(mobile)) {
                $.alert('请输入正确新手机号');
                return;
            }

            // 手机号是否已验证判断
            PersonCenterApi.checkMobile({mobile: mobile});
        }
    });

    // 点击'图形验证码'(更新图形验证码)
    $('#img').click(function () {
        changeModel(); // 更新图形验证码
    });


    /**
     * 计数器计数
     * @param second {int} 计时时间(单位：秒)
     */
    function timeCount(second) {
        interval_global = setInterval(function () {
            var $span = $('.code_count span'); // 倒数秒数选择器
            var current_sec = $span.text(); // 当前秒数
            if(current_sec <= 1) {
                clearInterval(interval_global); // 停止计数器
                $('.code_count').hide(); // 隐藏 倒数文本

                if($('.code_txt').text() == '发送验证码') {
                    $('.code_txt').text('发送验证码');
                }
                $('.code_txt').show(); // 显示 '发送验证码'
                return;
            }
            $span.text(--current_sec); // 渲染秒数选择器
        }, 1000);
    }

    var isClick_code = false; // 是否点击发送验证码(false：未点击，true：已点击)
    /**
     * 开始数秒
     * @param second {int} 计时时间(单位：秒)
     */
    function startCount(second) {
        var phone = $('#new_phone').val().trim(); // 新手机号
        if(!phone) {
            $.alert('新手机号不能为空');
            return;
        }

        var updateMobileValidCode = $('#pic_code').val().trim(); // 图形验证码
        if(!updateMobileValidCode) {
            $.alert('图形验证码不能为空');
            return;
        }

        if(isClick_code) { // 已点击
            return;
        }
        isClick_code = true; // 设置为 已点击
        $('.code_txt').css({opacity: 0.5});

        // 发送短信验证码接口
        PersonCenterApi.updatePhoneSecurityCodea({phone: phone, updateMobileValidCode: updateMobileValidCode}).then(function () {
            $('.code_txt').hide(); // 隐藏 '发送验证码'
            $('.code_count span').text(second); // 初始化秒数
            timeCount(second); // 计数器计数
            $('.code_count').show(); // 显示 倒数文本
        }, function () {
            changeModel(); // 更新图形验证码
        }).always(function () {
            isClick_code = false; // 设置为 未点击
            $('.code_txt').css({opacity: 1});
        });
    }

    // 点击'发送验证码'
    $('.code_txt').click(function () {
        startCount(second_global); // 开始数秒
    });

    var isClick = false; // 是否点击确定按钮(false：未点击，true：已点击)
    // 点击'确定修改'
    $('#confirm').click(function () {
        var params = {
            username: username_global, // 用户名
            phone: $('#new_phone').val().trim(), // 新手机号
            code: $('#msg_code').val().trim() // 短信验证码
        };

        if(!params.phone) {
            $.alert('新手机号不能为空');
            return;
        }
        if(!Utils.checkMobile(params.phone)) {
            $.alert('请输入正确新手机号');
            return;
        }
        if(!params.code) {
            $.alert('短信验证码不能为空');
            return;
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        // 更新手机号码
        PersonCenterApi.updatePhoone(params).then(function (data) {
            $.alert(data.msg).then(function () {
                if(url_global) { // 上一页面跳转链接(全局变量)
                    window.location.href = url_global; // 返回之前的页面
                } else {
                    window.location.href = '../person_center/user_info_edit.html'; // 返回'个人资料编辑'页面
                }
            });
        }, function () {
            changeModel(); // 更新图形验证码
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});