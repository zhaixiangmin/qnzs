/**
 * Created by Administrator on 2017/6/27.
 */
$(function () {
    var pathname =  window.location.pathname; // 链接的路径名称 -- > /front/pc/view/find_help/find_help.html(//localhost:63342/front/pc/view/find_help/find_help.html)
    var host = window.location.host; // 主机名
    var isNginx = false; // 是否nginx环境
    var isIndexPage = false; // 是否index页面(网站首页)
    var prefix = '../../'; // 引用路径前缀
    //console.log('pathname', pathname);
    //console.log('host', host);
    if(host.indexOf('gdqnzs') != -1) { // 检测是否nginx环境
        isNginx = true;
    }

    if(isNginx) { // nginx环境
        if(!pathname) {
            isIndexPage = true; // 当前页面是首页
            prefix = ''; // 设置首页前缀路径
        }else {
            prefix = '/'; // 设置非首页前缀路径
        }
    }else { // 本地开发环境
        var pathArr = pathname.split('/'); // /front/pc/index.html?_ijt=t48h1o36ira9um9e4krltsoc14 --> ['', 'front', 'pc', 'index.html?_ijt=t48h1o36ira9um9e4krltsoc14']
        //console.log('pathArr', pathArr);
        var pathSuffix = pathArr[pathArr.length-1]; // index.html?_ijt=t48h1o36ira9um9e4krltsoc14
        if(pathSuffix.indexOf('index') != -1) {
            isIndexPage = true; // 当前页面是首页
            prefix = ''; // 设置首页前缀路径
        }else {
            prefix = '../../'; // 设置非首页前缀路径
        }
    }
    //console.log('isIndexPage', isIndexPage);

    var account_common = undefined; // 用户信息
    // 获取当前用户信息
    Qnzs.getSessionAccount({}).then(function (data) {
        //console.log('Qnzs.getSessionAccount data', data);
        if(data.status != 'OK') {
            return;
        }

        // 用户已登录
        account_common = data.account; // 账户信息gghgg
        $('#loginBtn .disB').text('退出');

        $('#registerBtn .disB').text(account_common.realname); // 注册/(用户名)
        // 个人用户
        if(account_common.orgType != 3) { // 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
            $('#bell_login').show(); // 显示铃铛图标与管理后台
        }
    });

    /**
     * 渲染公共头部、尾部
     * @param tabs {array} 选项卡数组
     */
    function render(tabs) {
        var header = ''; // 公共头部
        header += '<div class="topBlock poFix">';
        header += '<div class="headTopBox">';
        header += '<header class="headTop w1200 clearfix">';
        header += '<div class="fr clearfix">';
        header += '<div class="leftLink fl">';
        header += '<a href="//qnzs.youth.cn/" target="_blank" class="fl a01">中国青年之声</a>';
        header += '<a href="//www.izyz.org/" target="_blank" class="fl a02">i 志愿</a>';
        header += '<a href="//zcplan.cn/" target="_blank" class="fl a03">展翅网</a>';
        header += '<a href="//www.gdtuanju.com/" target="_blank" class="fl a04">粤团聚</a>';
        header += '</div>';
        header += '<div class="rightLink fl">';
        header += '<a href="//www.12355.net/servicePlatform" class="fl ">';
        header += '<span class="disB">在线平台</span>';
        header += '</a>';
        header += '<a href="//www.12355.net/goAboutUs" class="fl">';
        header += '<span class="disB">联系我们</span>';
        header += '</a>';
        header += '<a href="javascript:;" class="fl" id="tucaoBtn">';
        header += '<span class="disB borderR01">我要吐槽</span>';
        header += '</a>';
        header += '<a href="javascript:;" class="fl" id="registerBtn">';
        header += '<span class="disB borderR01">注册</span>';
        header += '</a>';
        header += '<a href="//www.12355.net/bg/view/index/index.html" class="fl" id="bell_login" style="padding-top: 12px;padding-bottom: 10px;display: none;">';
        // header += '<a href="javascript:;" class="fl" id="bell_login" style="padding-top: 12px;padding-bottom: 10px;">';
        header += '<i class="icon" style="display: inline-block;width: 16px;height: 16px;background: url(' + prefix + 'public/img/message.png) no-repeat;"></i>';
        // header += '<i class="icon" style="display: inline-block;width: 16px;height: 16px;background: url(public/img/message.png) no-repeat;"></i>';
        header += '<span style="display: inline-block; vertical-align: super; ">管理后台</span>';
        header += '</a>';
        header += '<a href="javascript:;" class="fl" id="loginBtn">';
        header += '<span class="disB">登录</span>';
        header += '</a>';
        header += '</div>';
        header += '</div>';
        header += '</header>';
        header += '</div>';
        header += '<div class="navigation conBgc01 clearfix">';
        header += '<div class="content w1200">';
        header += '<div class="leftNav fl">';
        header += '<div class="bigLogoDiv fl" onclick="window.location.href=\'qnzs_index.html\'">';
        // header += '<img src="public/img/bigLogo.png" width="149"/>';
        header += '<img src="' + prefix + 'public/img/bigLogo.png" width="149"/>';
        header += '</div>';
        header += '<a href="javascript:;" class="disIB colorfff font14 didian">广东</a>';
        header += '</div>';
        header += '<div class="rightNav fr">';
        header += '<ul class="ulNav fl">';
        for(var i=0; i<tabs.length; i++) { // 选项卡加载
            var tab = tabs[i];

            if(isNginx) { // nginx环境
                if(isIndexPage) { // 当前页是首页
                    if(i == 0) { // 首页选项卡
                        header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }else { // 非首页选项卡(view/find_help/find_help.html)
                        header += '<li><a href="/view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }
                }else { // 当前页非首页
                    if(i == 0) { // 首页选项卡
                        header += '<li><a href="' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }else { // 非首页选项卡(/view/find_help/find_help.html)
                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
                        //console.log('keyword', keyword);
                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡
                            header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                            continue;
                        }

                        // 去高亮当前页面选项卡
                        header += '<li><a href="/view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }
                }
            }else { // 本地开发
                if(isIndexPage) { // 当前页是首页
                    if(i == 0) { // 首页选项卡
                        header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }else { // 非首页选项卡(view/find_help/find_help.html)
                        header += '<li><a href="view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }
                }else { // 当前页非首页
                    if(i == 0) { // 首页选项卡 ../../index.html
                        header += '<li><a href="../..' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }else { // 非首页选项卡(/view/find_help/find_help.html)
                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
                        //console.log('keyword', keyword);
                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡
                            header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                            continue;
                        }

                        // 去高亮当前页面选项卡
                        header += '<li><a href="..' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                    }
                }
            }


            // var shortPath = tab.path.replace('../', '').replace(/\/.*$/, ''); // (../index/index.html --> index)
            //
            // if(pathname.indexOf(shortPath) != -1) { // 匹配到路径
            //     // //console.log('高亮 shortPath', shortPath);
            //     header += '<li><a href="' + tab.path + '" class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
            //     continue;
            // }
            // header += '<li><a href="' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';

            // if(pathname.indexOf(shortPath) != -1) { // 匹配到路径
            //     // //console.log('高亮 shortPath', shortPath);
            //     header += '<li><a href="' + tab.path + '" class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
            //     continue;
            // }
            // header += '<li><a href="' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
        }

        header += '</ul>';
        header += '</div>';
        header += '</div>';
        header += '</div>';
        header += '</div> ';

        var footer = '';
        footer += '<footer class="conBgc01 colorfff font14">';
        footer += '    <div class="box" style="width: 100%;">';
        footer += '        <div class="box-centent" style="width: 600px;height: 100px;margin: 0 auto;overflow: hidden;">';
        footer += '            <div class="box-centent-left" style="width: 80px;height: 80px;float: left;  margin-top: 5px;">';
        footer += '                <span id="_ideConac"></span><script src="//dcs.conac.cn/js/20/000/0000/60564709/CA200000000605647090001.js" type="text/javascript"></script>';
        // footer += src;
        footer += '            </div>';
        footer += '            <div class="box-centent-rig" style=" margin-top: 5px;  width: 400px;height: 100px;float: left; text-align: center; line-height: 20px;">';
        footer += '                <a href="//www.12355.net/wechat/view/index/index.html" class="disB font14 colorfff">触屏版</a>';
        footer += '                <p>版权所有 copyright 2016 广东青年之声</p>';
        footer += '                <p>粤ICP备10214402号-4</p>';
        footer += '            </div>';
        footer += '        </div>';
        footer += '    </div>';
        footer += '</footer>';


        // footer += '<footer class="conBgc01 colorfff font14">';
        // footer += '<p>版权所有 copyright 2016 广东青年之声</p>';
        // footer += '<p>粤ICP备10214402号-4</p>';
        // footer += '</footer>';

        $('body').prepend(header); // 插入公共头部
        $('body').append(footer); // 插入公共尾部
    }

    // 选项卡数组
    var tabs = [
        { name: '首页', path: '/index.html' },
        { name: '找活动', path: '/find_active/zhaohuodongIndex.html' },
        { name: '找咨询', path: '/find_consult/find_consult.html '},
        { name: '找帮助', path: '/find_help/find_help.html' },
        { name: '重磅项目', path: '/heavy_project/heavy_main_list.html'},
        { name: '青年之家', path: '/young_family/young_family.html' }
    ];


    render(tabs); // 渲染公共头部、尾部

    // var tabs_nginx = [
    //     { name: '首页', path: '/index.html' },
    //     { name: '找活动', path: '/view/find_active/zhaohuodongIndex.html' },
    //     { name: '找咨询', path: '/view/find_consult/find_consult.html '},
    //     { name: '找帮助', path: '/view/find_help/find_help.html' },
    //     { name: '重磅项目', path: '/view/heavy_project/heavy_main_list.html'},
    //     { name: '青年之家', path: '/view/young_family/young_family.html' }
    // ];

    // if(isNginx) { // nginx环境
    //     render(tabs_nginx); // 渲染公共头部、尾部
    // }else {
    //     render(tabs_local); // 渲染公共头部、尾部
    // }

    // 登录弹出框渲染
    function login_box() {
        var html = '';

        html += '<div class="login_regist_box" id="login_regist_box">';
        html += '    <form action="">';
        html += '        <div class="login_regist_container bgcWhite">';
        html += '            <div class="title_box clearfix colorfff">';
        html += '                <h1 class="fl title_left">账号登录</h1>';
        html += '                <em class="close fr">×</em>';
        html += '            </div>';
        html += '            <div class="info_input">';
        html += '            	<h4 id="error_msg" class="error" style="display:none;">报错信息</h4>';
        html += '                <div class="input_item user_name" >';
        html += '                    <input type="text" class="input_txt" id="user_name" placeholder="请输入注册账号或手机号" />';
        html += '                </div>';
        html += '                <div class="input_item pwd">';
        html += '                    <input type="password" id="user_pwd" class="input_txt"  placeholder="请输入登录密码" />';
        html += '                </div>';
        html += '            </div>';
        html += '            <div class="btn_box">';
        html += '                <a href="javascript:;" class="btn login_btn" id="login_btn">登录</a>';
        html += '                <a href="../user_register/user_register.html" class="btn register_btn">注册</a>';
        html += '                <div class="forgot_pwd"><a href="javascript:;">--&nbsp;&nbsp;忘记密码&nbsp;&nbsp;--</a></div>';
        html += '            </div>';
        html += '            <div class="bot_link">';
        html += '                <ul class="clearfix">';
        html += '                   <li class="item wechat">';
        html += '                       <a href="//www.12355.net/socialauth/weixinConnect">';
        // html += '                           <img src="public/img/login_wechat_ico.png" class="icon" width="28" alt=""';
        html += '                           <img src="' + prefix + 'public/img/login_wechat_ico.png" class="icon" width="28" alt=""';
        html += '                           <span>微信</span>';
        html += '                       </a>';
        html += '                   </li>';
        html += '                   <li class="item">';
        html += '                       <a href="https://www.izyz.org.cn/account/login.html?appId=0110&amp;finishurl=//www.12355.net/index">';
        // html += '                           <img src="public/img/login_yht_ico.png" class="icon" width="28" alt="" />';
        html += '                           <img src="' + prefix + 'public/img/login_yht_ico.png" class="icon" width="28" alt="" />';
        html += '                           <span>一号通</span>';
        html += '                       </a>';
        html += '                   </li>';
        html += '                </ul>';
        html += '            </div>';
        html += '        </div>';
        html += '    </form>';
        html += '</div>';

        $('body').append(html);
    }
    login_box();


    // 点击 '注册'/('用户名') 按钮
    $('body').on('click', '#registerBtn', function () {
        if(!account_common) { // 用户还没登录(当前应该显示'注册'按钮)
            window.location = '../user_register/user_register.html'; // 跳转到注册页面
            return;
        }

        // 跳转到个人中心
        window.location = '../personCenter/personCenter.html';
    });

    // 点击 头部的 '登录'/'退出' 按钮
    $('body').on('click', '.headTopBox #loginBtn', function(event) {
        if(!account_common) { // 用户还没登录
            $('.login_regist_box').show();
            $('body').addClass('overflow_h');
            return;
        }

        // 用户已经登录(当前应该显示 '退出' 按钮)
        // 退出操作
        $.alert('确定退出?').then(function () {
            Qnzs.exitAccount({}).then(function () {
                window.location.reload(); // 刷新页面
            });
        });
    });

    // 点击'登录' 弹出框 的 'x' 按钮
    $(".login_regist_box .close").click(function(){
        $(".login_regist_box").hide();
        $('body').removeClass('overflow_h');
    });

    // 点击 弹出框的'登录'按钮
    $('body').on("click",'#login_btn', function(){
        var data = {
            mobile: $("#user_name").val(),
            password: $("#user_pwd").val()
        };

        if(!data.mobile) {
            $("#error_msg").html("请输入用户名");
            $("#error_msg").css("display","block");
            // $(".p_inp").css("margin-top","0px");
            return;
        }

        if(!data.password) {
            $("#error_msg").html("请输入密码");
            $("#error_msg").css("display","block");
            // $(".p_inp").css("margin-top","0px");
            return;
        }

        // 用户登录
        Qnzs.login(data).then(function (data) {
            //console.log('Qnzs.login data', data);
            window.location.reload(); // 刷新当前页面
        });
    });

});