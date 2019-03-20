/**
 * Created by Administrator on 2017/6/21.
 */
// https://api.12355.net/pc/account/login?mobile=18826480174&password=000000
// //169.168.200.20:8080/qnzs/pc/account/login?mobile=18826480174&password=000000
// //api.gdqnzs.cn/pc/account/login?mobile=18826480174&password=000000
// //1678r246x6.imwork.net/qnzs/pc/account/login?mobile=18826480174&password=000000
// //169.168.200.4:8080/qnzs/pc/account/login?mobile=18826480174&password=000000 登陆链接
var Qnzs = new Object({
  // env : {
  //   // 必须添加http://前缀，否则字符串拼接时浏览器辨认不出来是http请求
  //   dev_yang: 'http://169.168.200.20:8080/qnzs', // 杨积林
  //   dev_tjk: 'http://169.168.200.21:8080/qnzs', // 唐佳康
  //   dev_wyh: 'http://169.168.200.22:8080/qnzs',// 文玉环
  //   dev_scy: 'http://169.168.200.6:8080/qnzs', // 石春燕
  //   dev_ymj8080: 'http://169.168.200.4:8080/qnzs', // 杨敏阶
  //   dev_ymj_peanut: 'http://1678r246x6.imwork.net/qnzs', // 杨敏阶花生壳
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
  domain: window.location.href.substring(0, window.location.href.lastIndexOf('/bg/')), // 域名(http://192.168.20.44:80)
});

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

// 设置ajax全局默认参数
$.ajaxSetup({
  cache: false,
  dataType: 'json',
  xhrFields: {
    withCredentials: true
  }
});

Qnzs.statusExplain = function (status) {
  var text = '未知错误';
  switch (status) {
    case 400:
      text = '客户端错误';
      break;
    case 403:
      text = '服务器禁止访问';
      break;
    case 404:
      text = '服务器没找到该资源';
      break;
    case 500:
      text = '内部服务器错误';
      break;
    case 501:
      text = '在参数中有语法错误';
      break;
    case 504:
      text = '网关超时';
      break;
  }
  return text;
};

/**
 * 封装接口
 * @param urlSuffix {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {obj} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @param {string} type 请求方法类型(eg. 'post') -- 默认是'get'
 */
Qnzs.ApiProxy = function (urlSuffix, data, text, type,query) {
  var url = Qnzs.path + urlSuffix;

  var option = {
    data: data
  };

  if(type &&typeof(value)!="undefined"&& type.toUpperCase() == 'POST') {
    option.type = 'POST';
  }

  var dfd = $.Deferred();
  $.ajax(url, option).then(function (result) {
    if(!result) {
      if(1 !== query) {
        // $.alert('业务级错误：调用正常，返回参数为空');
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
      console.log('text', text);
      console.log('result', result);
      if(text) {
        if(1 !== query) {
          //$.alert('业务级错误：' + text + '，错误信息：' + result.msg);
          $.alert(result.msg);
        }
      }else {
        if(1 !== query) {
          //$.alert('业务级错误：' + result.msg);
          $.alert(result.msg);
        }
      }
      dfd.reject(-1);
      console.log('after result', result);
    }

    dfd.resolve(result);
  }, function (XMLHttpRequest, textStatus) {
    var errorText = Qnzs.statusExplain(XMLHttpRequest.status);
    if(errorText == '系统繁忙，请稍后再试！') {
      errorText = textStatus;
    }
    if(text) {
      if(1 !== query) {
        //$.alert('系统级错误：' + text + '，错误信息：' + errorText);
        $.alert(errorText);
      }
    }else {
      if(1 !== query) {
        //$.alert('系统级错误：' + errorText);
        $.alert(errorText);
      }
    }
    dfd.reject(-2);
  });

  return dfd;
};


/**
 * 封装接口
 * @param url {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {obj} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @returns {*}
 * @constructor
 */
Qnzs.ApiProxyJson = function (url, data, text) {

  var dfd = $.Deferred();
  $.ajax(url, { data: data }).then(function (result) {
    if(!result) {
      //$.alert('业务级错误：调用正常，返回参数为空');
      dfd.reject(-1);
    }

    if(!result.status) {
      //$.alert('业务级错误：调用正常，status为空');
      dfd.reject(-1);
    }

    if(result.status != 'OK' && result.status != 1) {
      if(text) {
        //$.alert('业务级错误：' + text + '，错误信息：' + result.msg);
        $.alert(result.msg);
      }else {
        //$.alert('业务级错误：' + result.msg);
        $.alert(result.msg);
      }
      dfd.reject(-1);
      console.log('after result', result);
    }

    dfd.resolve(result);
  }, function (XMLHttpRequest, textStatus) {
    var errorText = Qnzs.statusExplain(XMLHttpRequest.status);
    if(errorText == '系统繁忙，请稍后再试！') {
      errorText = textStatus;
    }
    if(text) {
      //$.alert('系统级错误：' + text + '，错误信息：' + errorText);
      $.alert(errorText);
    }else {
      //$.alert('系统级错误：' + errorText);
      $.alert(errorText);
    }
    dfd.reject(-2);
  });

  return dfd;
};

/**
 * 上传图片
 * @param $elemnt 图片的jquery对象(eg. $('#img'))
 * @returns {*}
 */
Qnzs.upLoadFile = function ($elemnt) {
  var url = Qnzs.path + '/file_upload';

  if(!$elemnt) {
    $.alert('请上传图片');
    return;
  }

  //创建FormData对象
  var data = new FormData();

  //为FormData对象添加数据
  $.each($elemnt[0].files, function (i, file) {
    data.append('upload_file', file);
  });

  var dfd = $.Deferred();
  $.ajax(url, {
    type: 'POST',
    data: data,
    contentType: false,    //不可缺，否则$_FILES值为空
    processData: false    //不可缺，否则FF控制台报错：“NS_ERROR_XPC_BAD_OP_ON_WN_PROTO: Illegal operation on WrappedNative prototype object”，直接不能运行
  }).then(function (result) {
    if(!result) {
      //$.alert('业务级错误：调用正常，返回参数为空');
      dfd.reject(-1);
    }

    if(result.error != 0) {
      //$.alert('业务级错误：' + result.message);
      $.alert(result.message);           dfd.reject(-1);
    }

    if(!result.url) {
      //$.alert('业务级错误：调用正常，返回图片路径为空');
      dfd.reject(-1);
    }

    dfd.resolve(result);
  }, function (XMLHttpRequest, textStatus) {
    var errorText = Qnzs.statusExplain(XMLHttpRequest.status);
    if(errorText == '系统繁忙，请稍后再试！') {
      errorText = textStatus;
    }

    // $.alert('系统级错误：' + errorText);
    $.alert(errorText);
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