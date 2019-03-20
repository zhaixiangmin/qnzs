/**
 * Created by Administrator on 2017/6/21.
 */
var Qnzs = new Object({
  // env : {
  //   // 必须添加//前缀，否则字符串拼接时浏览器辨认不出来是http请求
  //   dev_yang: '//169.168.200.6:8080/qnzs', // 杨积林
  //   dev_tjk: '//169.168.200.21:8090/qnzs', // 唐佳康
  //   dev_wyh:'//169.168.200.22:8080/qnzs',// 文玉环
  //   dev_scy: '//169.168.200.14:8080/qnzs', // 石春燕
  //   dev_ymj8080: '//169.168.200.3:80/qnzs', // 杨敏阶
  //   dev_ymj_peanut: '//1678r246x6.imwork.net/qnzs', // 杨敏阶花生壳
  //   dev_lc: 'http://192.168.20.44:8089/qnzs', // 李聪
  //   dev_ymy: 'https://qnzsapi2.12355.net', // 游美英
  //   publish: 'https://api.12355.net' // 正式环境
  // },
  env: {
    '192.168.20.43': 'http://192.168.20.43:80/qnzs', // 杨敏阶
    '192.168.20.34': 'http://192.168.20.34:8080/qnzs', // 文玉环
    '192.168.20.44': 'http://192.168.20.44:8089/qnzs', // 李聪
    dev_ymj_peanut: 'http://1678r246x6.imwork.net/qnzs', // 杨敏阶花生壳
    dev_ymy: 'https://qnzsapi2.12355.net', // 游美英
    publish: 'https://api.12355.net' // 正式环境
  },
  domain: '', // 域名(http://192.168.20.44:80)
  // domain: function () {
  //   var href = window.location.href;
  //   var pos = href.lastIndexOf('/pc/') || href.lastIndexOf('/view/');
  //   return href.substring(0, pos);
  // }, // 域名(http://192.168.20.44:80)
});

(function setDomain(href) {
  // var href = window.location.href;
  var pos = href.lastIndexOf('/pc/') || href.lastIndexOf('/view/');
  if(pos != -1) { // 含有 `/pc/或/view/`
    Qnzs.domain = href.substring(0, pos);
  }else {
    Qnzs.domain = href;
  }
})(window.location.href);

// 接口IP地址(自动识别开发/生产环境)
if(Qnzs.domain) {
  var host = window.location.host; // 主机
  if(host == 'localhost' || (host.split('.').length == 4 && host.split('.')[0] == '192')) { // 开发环境(localhost:63342 或者 192.168.20.44)
    var ip = host.indexOf(':') != -1 ? host.substring(0, host.indexOf(':')) : host;
    Qnzs.path = Qnzs.env[ip];
  }else if(host.indexOf('1678r246x6.imwork.net') != -1) { // 杨敏阶花生壳
    Qnzs.path = Qnzs.env.dev_ymj_peanut;
  }else if(host.indexOf('qnzs2.12355.net') != -1) { // 外网环境(游美英)
    Qnzs.path = Qnzs.env.dev_ymy;
  }else { // 生产环境
    Qnzs.path = Qnzs.env.publish;
  }
}

console.log('Qnzs.path', Qnzs.path);

// 设置ajax全局默认参数
$.ajaxSetup({
  cache: false,
  dataType: 'json',
  xhrFields: {
    withCredentials: true
  }
});

Qnzs.statusExplain = function (status) {
  var text = '系统繁忙，请稍后再试！';
  switch (status) {
    case 400:
      text = '系统繁忙，请稍后再试！';
      break;
    case 403:
      text = '系统繁忙，请稍后再试！';
      break;
    case 404:
      text = '系统繁忙，请稍后再试！';
      break;
    case 500:
      text = '系统繁忙，请稍后再试！';
      break;
    case 501:
      text = '系统繁忙，请稍后再试！';
      break;
    case 504:
      text = '系统繁忙，请稍后再试！';
      break;
  }
  return text;
};

/**
 * 封装接口
 * @param urlSuffix {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {obj} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @param query {string} 是否列表(1：是，否则不是)
 * @param {string} type 请求方法类型(eg. 'post') -- 默认是'get'
 */
Qnzs.ApiProxy = function (urlSuffix, data, text, query, type) {
  var url = Qnzs.path + urlSuffix;

  var option = {
    data: data
  };

  if(type && type.toUpperCase() == 'POST') {
    option.type = 'POST';
  }

  var dfd = $.Deferred();
  $.ajax(url, option).then(function (result) {
    if(!result) {
      if(1 !== query) {
        //$.alert('业务级错误：调用正常，返回参数为空');
      }
      dfd.reject(-1);
    }

    if(!result.status) {
      if(1 !== query) {
        //$.alert('业务级错误：调用正常，status为空');
      }
      dfd.reject(-1);
    }

    if(result.status != 'OK' && result.status != 1 && result.status != 'ALERT') {
      if(text) {
        if(1 !== query) {
          //$.alert('业务级错误：' + text + '，错误信息：' + result.msg);
          $.alert(result.msg);
        }
      }else {
        if(1 !== query) {
          // $.alert('业务级错误：' + result.msg);
          $.alert(result.msg);
        }
      }
      dfd.reject(-1);
    }

    dfd.resolve(result);
  }, function (XMLHttpRequest, textStatus) {
    // var errorText = Qnzs.statusExplain(XMLHttpRequest.status);
    // if(errorText == '系统繁忙，请稍后再试！') {
    //     errorText = textStatus;
    // }
    // if(text) {
    //     if(1 !== query) {
    //         //$.alert('系统级错误：' + text + '，错误信息：' + errorText);
    //         $.alert(errorText);
    //     }
    // }else {
    //     if(1 !== query) {
    //         //$.alert('系统级错误：' + errorText);
    //         $.alert(errorText);
    //     }
    // }
    $.alert('系统繁忙，请稍后再试！');
    dfd.reject(-2);
  });

  return dfd;
};

/**
 * 获取账户信息
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
Qnzs.getSessionAccount = function (data) {
  return Qnzs.ApiProxy('/commons/getSessionAccount', data, '获取账户信息');
};

/**
 *
 * @param data {obj} 属性如下
 * mobile {string} 账号
 * password {string} 密码
 * @returns {*}
 */
Qnzs.login = function (data) {
  return Qnzs.ApiProxy('/pc/account/login', data, '登录', 'post');
};

/**
 * 退出登录
 * @param data {obj} 属性如下
 * 无参数
 * @returns {*}
 */
Qnzs.exitAccount = function (data) {
  return Qnzs.ApiProxy('/commons/exitAccount', data, '退出登录');
};

/**
 * 获取站点列表
 * @param data {obj} 属性如下
 * page {int} 当前页码(可不传，默认为1)
 * rows {int} 每页记录数(可不传，默认为10)
 * parentDid {int} 区域父ID(440000：广东省)
 * type {int} 类型(1是组织，2是高校)
 * name {string} 名称搜索
 * @returns {*}
 */
Qnzs.getDistrictByType = function (data) {
  return Qnzs.ApiProxy('/common/district/getDistrictByType', data, '获取站点列表',1);
};

/**
 * 根据二级域名获取区域ID
 * @param data {obj} 属性如下
 * subDomains {string} 二级域名编码
 * @returns {*}
 */
Qnzs.getDistrictIdBySubDomains = function (data) {
  return Qnzs.ApiProxy('/common/district/getDistrictIdBySubDomains', data, '根据二级域名获取区域',1);
};

/**
 * 获取用户区域ID
 * @param data {obj} 属性如下
 * @returns {*}
 */
Qnzs.getDistrictIdByUserDistrictId = function (data) {
  return Qnzs.ApiProxy('/common/district/getDistrictIdByUserDistrictId', data, '获取用户区域',1);
};

/**
 * 通过类型和分类获取banner图
 * @param data {obj} 属性如下
 * did {int} 地区ID
 * type {int} 类型：0-pc端；1-移动端。
 * acticey {int} 分类：0-首页banner；1-找活动；2-找帮助；3-重磅项目；4-青年之家;5-首页推荐项目

 * @returns {*}
 */
Qnzs.findImageByType = function (data) {
  return Qnzs.ApiProxy('/imageManager/findImageByType', data, '获取横幅图片',1);
};


