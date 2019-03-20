$(function () {
    var username_global = undefined; // 用户ID(全局变量)
    // var mobile_global = undefined; // 手机号(全局变量)
    var did_global = undefined; // 区域ID(全局变量)
    var typeName = {
        '1': '公众用户',
        '2': '咨询导师'
    };

    // 性别名称
    var genderName = {
        '1': '男',
        '2': '女',
        '3': '保密'
    };

    // 性别列表
    var list_gender = [
        { name: '男', id: '1' },
        { name: '女', id: '2' },
        { name: '保密', id: '3' }
    ];

    $('#img_content').myUploader(); // 初始化图片上传控件


    // 点击 '单选框'(添加选中样式)
    $('.info_item_rows .labels').on('click', '.checkbox_label', function () {
        $(this).toggleClass('active');
    });

    /**
     * 渲染页面(选择弹出框)
     * @param $selector {jquery对象} 数据父元素(选择器jquery对象)
     * @param list {array} 数据列表
     * @param name {string} 名称(列表数据项的显示名称)
     */
    var initialSelect = function ($selector, list, name) {
        var html = '';
        for(var i=0; i<list.length; i++) {
            var item = list[i];
            var name = name ? name : 'name';
            html += '<li class="select_item" data-id="' + item.id + '">' + item[name] + '</li>';
        }
        $selector.html(html);
    };


    // 点击'可选择项'(转出原因,可弹出框)
    $('#gender_box').click(function () {
        // currentSelectName_global = 'cause'; // 当前选择框名称(全局变量，residence：学习/工作单位地点，cause：转出原因)
        initialSelect($('.select_popup .select_list'), list_gender); // 渲染页面(选择弹出框)
        $('.select_popup').fadeIn(150); // 显示选择弹出框
    });


    // 点击选中项
    $('.select_popup .select_list').on('click', '.select_item', function(event) {
        $('.select_popup').fadeOut(150);
        $('#gender').data('id', $(this).data('id')).text($(this).text());
        return false; // 防止冒泡事件
    });


    // 点击遮罩层(弹出框)
    $('.select_popup').click(function () {
        $('.select_popup').fadeOut(150); // 关闭弹出框
    });

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function (data) {
        if(data.status != 'OK') { // 用户没有登录
            $.alert(data.msg);
            return;
        }

        var account = data.account;
        if(account) {
            username_global = account.username; // 用户ID(全局变量)
            did_global = account.did; // 区域ID(全局变量)
            $('#photoUrl').attr('src', Utils.compressByAli(Utils.returnPhotoUrl(account.photoUrl), 110, 110)); // 头像
            $('#realname').val(Utils.returnValidString(account.realname)); // 呢称
            if(account.type) {
                $('#type').text(typeName[account.type]); // 用户类型
            }
            $('#mobile').text(Utils.returnValidString(account.mobile)); // 绑定手机号
            $('#gender').text(genderName[account.gender]); // 性别
            $('#email').val(Utils.returnValidString(account.email)); // 邮箱
            $('#address').val(Utils.returnValidString(account.address)); // 联系地址
            var districtOrSchool = account.parentDName + account.districtName;
            $('#district').text(districtOrSchool); // 所属地区/高校
            $('#description').val(Utils.returnValidString(account.description)); // 自我描述
        }


        var labelsList = []; // 已选中个性标签
        var labels = data.lable;
        if(labels && labels.length > 0) {
            for(var i=0; i<labels.length; i++) {
                labelsList.push(labels[i].caption);
            }
        }
        labelsList = labelsList.join(',');

        // 获取所有个性标签列表
        PersonCenterApi.findDictionary({}).then(function (data) {
            var labels = data.rows;
            var html = '';
            for(var i=0; i<labels.length; i++) {
                var label = labels[i];
                if(labelsList.indexOf(label.caption) != -1) { // 匹配
                    html += '<span data-id="' + label.id + '" class="checkbox_label active">' + label.caption + '</span>';
                } else {
                    html += '<span data-id="' + label.id + '" class="checkbox_label">' + label.caption + '</span>';
                }
            }
            $('.info_item_rows .labels').html(html);
        });
    });


    var isClick = false; // 是否点击确定按钮(false：未点击，true：已点击)
    // 点击保存
    $('#confirm').click(function () {
        var labelList = []; // 个性标签列表
        $('.info_item_rows .labels .checkbox_label.active').each(function () {
            labelList.push($(this).data('id'));
        });
        var params = {
            username: username_global, // 用户ID
            photoUrl: $('#photoUrl').attr('src'), // 用户头像
            realname: $('#realname').val().trim(), // 昵称
            did: did_global, // 区域ID
            address: $('#address').val().trim(), // 联系地址
            gender: $('#gender').data('id'), // 性别(1：男，2：女，3：保密)
            email: $('#email').val().trim(), // 邮箱
            lable: JSON.stringify(labelList.join(',')), // 标签组数字符串 ["1d946096-cb90-11e3-a2ee-001e67a18a01","1d946093-cb90-11e3-a2ee-001e67a18a01","1d946095-cb90-11e3-a2ee-001e67a18a01"]
            description: $('#description').val().trim() // 自我描述
        };

        console.log('PersonCenterApi.pcUpdatAccount params', params);

        if(!params.username) {
            $.alert('用户ID不能为空');
            return;
        }
        if(!params.realname) {
            $.alert('请输入昵称');
            return;
        }
        if(!params.did) {
            $.alert('区域ID不能为空');
            return;
        }
        if(!params.gender) {
            params.gender = 3; // 性别默认设置为保密
        }

        if(isClick) { // 已点击
            return;
        }
        isClick = true; // 设置为 已点击
        $('#confirm').css({opacity: 0.5});

        // 更新个人信息
        PersonCenterApi.pcUpdatAccount(params).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.href = 'user_info.html'; // 返回'个人资料'页面
            });
        }).always(function () {
            isClick = false; // 设置为 未点击
            $('#confirm').css({opacity: 1});
        });
    });
});