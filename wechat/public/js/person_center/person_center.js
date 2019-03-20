$(function () {
    var typeName = {
        '1': '公众用户',
        '2': '咨询导师'
    };

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function (data) {
        if(data.status == 'ALERT') { // 用户没有登录
            $.alert(data.msg);
            return;
        }

        var account = data.account;
        if(account) {
            $('#photoUrl').attr('src', Utils.compressByAli(Utils.returnPhotoUrl(account.photoUrl), 120, 120)); // 头像
            $('.info .name').text(account.realname); // 呢称
            $('.info .type').text(typeName[account.type]); // 用户类型

            // 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
            if(account.orgType == 0 || account.orgType == 1 || account.orgType == 2) {  // 管理员
                $('.list .item.switch .icon_item').text('切换成个人'); // 修改切换角色名称
                $('.img_box').data('url', '../heavy_project/orgUserInfo.html'); // 链接修改为’组织信息‘页面
                $('.list .item.organization').data('url' , '../organization/organization_detail.html?oid=' + account.oid).show(); // 设置'组织主页'链接，并显示
                $('.list .item.activity').show(); // 显示'发布活动'
            }else { // 个人用户
                $('.list .item.switch .icon_item').text('切换成管理员'); // 修改切换角色名称
                $('.img_box').data('url', 'user_info.html'); // 链接修改为’个人资料‘页面
                $('.list .more_item.join').show(); // 显示'我的参与'
            }

            // 点击头部基本资料
            $('.img_box').click(function () {
                var url = $(this).data('url');
                if(url) {
                    window.location.href = url;
                }
            });

            // 点击带有下拉项的标题(“我的参与”、“我的发布”、“我的评价”、“我的关注”、“我的收藏”)
            $('.list .more_item').click(function () {
                if($(this).hasClass('active')) {
                    $('.list .more_item').removeClass('active'); // 禁止全部标题
                    $('.list .more_item .second_item').hide(); // 隐藏全部标题的下拉项
                }else {
                    $('.list .more_item').removeClass('active'); // 禁止全部标题
                    $('.list .more_item .second_item').hide(); // 隐藏全部标题的下拉项
                    $(this).addClass('active').find('.second_item').show(); // 使能当前标题，并显示的下拉项
                }
            });

            // 点击功能项(“我的消息”、“发布活动”、“我要吐槽”、“我的第二课堂”、“一号通”、“申请成为咨询导师”、“切换成为管理员”、“智慧团建”)
            $('.list .item').click(function () {
                if($(this).hasClass('switch')) { // 切换成为管理员
                    if(!account.oid) {
                        $.alert('本账户不拥有管理者身份');
                        return;
                    }

                    // orgType 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
                    if(account.orgType == 3) { // 个人用户
                        // status 状态(0-组织角色，1-个人角色)
                        PersonCenterApi.changeAccountRole({status: 0}).then(function (data) {
                            $.alert(data.msg).then(function () {
                                window.location.reload(); // 刷新当前页面
                            })
                        });
                    }else{
                        // status 状态(0-组织角色，1-个人角色)
                        PersonCenterApi.changeAccountRole({status: 1}).then(function (data) {
                            $.alert(data.msg).then(function () {
                                window.location.reload(); // 刷新当前页面
                            })
                        });
                    }
                }else if($(this).hasClass('league')) { // 智慧团建
                    // 接口IP地址(自动识别开发/生产环境)
                    var host = window.location.host.split(':')[0]; // 主机
                    if(host == 'localhost' || (host.split('.').length == 4 && host.split('.')[0] == '192')) { // 开发环境(localhost:63342 或者 192.168.20.44:8091)
                        window.location.href = Qnzs.path + '/toZhtj';
                    }else { // 生产环境
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Qnzs.appid + '&redirect_uri=' + Qnzs.path + '/wechatOauth&response_type=code&scope=snsapi_userinfo&state=zhtj#wechat_redirect';

                    }
                }else {
                    var url = $(this).data('url');
                    if(url) {
                        window.location.href = url;
                    }
                }
            });

        }
    });

});