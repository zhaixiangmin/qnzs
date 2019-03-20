$(function () {
    var typeName = {
        '1': '公众用户',
        '2': '咨询导师'
    };
    var genderName = {
        '1': '男',
        '2': '女',
        '3': '保密'
    };

    // 获取账户信息
    Qnzs.getSessionAccount({}).then(function (data) {
        if(data.status != 'OK') { // 用户没有登录
            $.alert(data.msg);
            return;
        }

        var account = data.account;
        if(account) {
            $('#photoUrl').attr('src', Utils.compressByAli(Utils.returnPhotoUrl(account.photoUrl), 110, 110)); // 头像
            $('#realname').text(Utils.returnValidString(account.realname)); // 呢称
            if(account.type) {
                $('#type').text(typeName[account.type]); // 用户类型
            }
            $('#mobile').text(Utils.returnValidString(account.mobile)); // 绑定手机号
            $('#gender').text(genderName[account.gender]); // 性别
            $('#email').text(Utils.returnValidString(account.email)); // 邮箱
            $('#address').text(Utils.returnValidString(account.address)); // 联系地址
            var districtOrSchool = account.parentDName + account.districtName;
            $('#district').text(districtOrSchool); // 所属地区/高校
            $('#description').text(Utils.returnValidString(account.description)); // 自我描述
        }

        var labels = data.lable;
        if(labels && labels.length > 0) {
            var html = '';
            for(var i=0; i<labels.length; i++) {
                var label = labels[i].caption;
                html += '<span>' + label + '</span>';
            }
            $('.info_item_rows .labels').html(html); // 个性标签
        }
    });
});