/**
 * Created by Administrator on 2017/6/21.
 */

//日期格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

var Utils = {};


Utils.getQueryString = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r) {
        // return  unescape(r[2]); // 中文会乱码，已废弃
        return  decodeURI(r[2]);
    }
    return null;
};


/**
 * 验证ID，正确返回“true”，错误则返回错误信息
 * @param {Object} idCard
 */
Utils.checkIdCard = function(idCard) {
    //错误信息
    var status = ["true", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!"];

    //去掉首尾空格
    idCard = trim(idCard.replace(/ /g, ""));

    if (idCard.length == 15 || idCard.length == 18) {
        if (!checkArea(idCard)) {
            return status[4];
        } else if (!checkBrith(idCard)) {
            return status[2];
        } else if (idCard.length == 18 && !check18Code(idCard)) {
            return status[3];
        } else {
            return status[0];
        }
    } else {
        //不是15或者18，位数不对
        return status[1];
    }
};


/**
 * 验证身份证的地区码
 * @param {Object} idCard 身份证字符串
 */
function checkArea(idCard) {
    // 区域ID
    var areaMap = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };

    if (areaMap[parseInt(idCard.substr(0, 2))] == null) {
        return false;
    } else {
        return true;
    }
}


/**
 * 验证身份证号码中的生日是否是有效生日
 * @param idCard 身份证字符串
 * @return
 */
function checkBrith(idCard) {
    var result = true;

    if (15 == idCard.length) {
        var year = idCard.substring(6, 8);
        var month = idCard.substring(8, 10);
        var day = idCard.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
        if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            result = false;
        }
    } else if (18 == idCard.length) {
        var year = idCard.substring(6, 10);
        var month = idCard.substring(10, 12);
        var day = idCard.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

        // 这里用getFullYear()获取年份，避免千年虫问题
        if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            result = false;
        }
    } else {
        result = false;
    }

    return result;
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param idCardArr 身份证号码数组
 * @return
 */
function check18Code(idCardArr) {

    /**
     * 身份证15位编码规则：dddddd yymmdd xx p
     * dddddd：地区码
     * yymmdd: 出生年月日
     * xx: 顺序类编码，无法确定
     * p: 性别，奇数为男，偶数为女
     * <p />
     * 身份证18位编码规则：dddddd yyyymmdd xxx y
     * dddddd：地区码
     * yyyymmdd: 出生年月日
     * xxx:顺序类编码，无法确定，奇数为男，偶数为女
     * y: 校验码，该位数值可通过前17位计算获得
     * <p />
     * 18位号码加权因子为(从右到左) wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
     * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
     * 校验位计算公式：Y_P = mod( ∑(Ai×wi),11 )
     * i为身份证号码从右往左数的 2...18 位; Y_P为校验码所在校验码数组位置
     *
     */
    // 加权因子
    var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

    // 身份证验证位值.10代表X
    var valideCodeArr = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0; // 声明加权求和变量

    var verificationCode = idCardArr[17]; // 验证码
    if (idCardArr[17].toLowerCase() == 'x') {
        verificationCode = 10;// 将最后位为x的验证码替换为10方便后续操作
    }

    for (var i = 0; i < 17; i++) {
        sum += wi[i] * idCardArr[i];// 加权求和
    }
    // //console.log('sum', sum);

    var valCodePosition = sum % 11;// 得到验证码所位置
    //console.log('valideCodeArr[valCodePosition]', valideCodeArr[valCodePosition]);
    if (verificationCode == valideCodeArr[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}


//去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 获取默认图片(随机)
 * @param isIndex {boolean} 是否首页(true：是，false：否)
 * @returns {string}
 */
Utils.getDefaultImg = function (isIndex) {
    var preffix = '../../public/img/default/';
    if(isIndex) {
        preffix = 'public/img/default/';
    }
    return preffix + 'default_' + (Math.floor(Math.random() * 18) + 1) + '.jpg';
};

/**
 * 阿里云压缩
 * @param img {string} 图片链接
 * @param suffix {string} 压缩格式
 * @returns {*}
 */
Utils.compressByAli = function (img, suffix) {
  if(!img) {
    return '';
  }

  return img + suffix;
};

/**
 * 更换阿里云图片后缀
 * @param img {string} 图片链接
 * @param suffix {string} 压缩格式
 * @returns {string}
 */
Utils.updateSuffix = function (img, suffix) {
  if(!img) {
    return '';
  }

  if(img.lastIndexOf('?') == -1) {
    return img;
  }

  img = img.substring(0, img.lastIndexOf('?'));
  img = suffix ? img + suffix : img;
  return img;
};