/**
 * Created by Administrator on 2017/6/21.
 */
var Qnzs = new Object({
  // env : {
  //   // 必须添加//前缀，否则字符串拼接时浏览器辨认不出来是http请求
  //   dev_yang: '//169.168.200.6:8080/qnzs', // 杨积林
  //   dev_tjk: '//169.168.200.17:8080/qnzs', // 唐佳康
  //   dev_wyh:'//169.168.200.22:8080/qnzs',// 文玉环
  //   dev_scy: '//169.168.200.6:8080/qnzs', // 石春燕
  //   dev_ymj80: '//169.168.200.4:80/qnzs', // 杨敏阶
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
  domain: window.location.href.substring(0, window.location.href.lastIndexOf('/wechat/')), // 域名(http://192.168.20.44:80)
  appid: 'wxfd72d1942e34cf11'
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
    Qnzs.appid = 'wx2cccc41315c0ac7a';
  }
}

Qnzs.zhtjUrl='https://tuan.12355.net';
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
 * 判断是否首页
 * @returns {boolean} true：首页，false：非首页
 */
function judgeIndex() {
  var pathname = window.location.pathname; // URL 的路径
  if(!pathname || pathname == '/') { // 首页
    return true;
  }

  var pathname_array = pathname.split('/'); // ['view', 'organization', 'organization_detail.html']
  var pathname_last = pathname_array[pathname_array.length -1]; // 'organization_detail.html'
  if(pathname_last == 'index.html') { // 首页
    return true;
  }

  return false; // 非首页
}

/**
 * 封装接口
 * @param urlSuffix {string} url后缀(eg. '/help/help/getPcHelpList')
 * @param data {obj} 接口数据参数
 * @param text {string} 接口说明文本(eg. '获取帮助列表')
 * @param query {string} 是否列表(1：是，否则不是)
 * @param {string} type 请求方法类型(eg. 'post') -- 默认是'get'
 * @returns {*}
 * @constructor
 */
Qnzs.ApiProxy = function (urlSuffix, data, text, query, type) {//query为1时，为查询列表，不弹框提示
  var url = Qnzs.path + urlSuffix;

  var option = {
    data: data
  };

  if(type && type.toUpperCase() == 'POST') {
    option.type = 'POST';
  }

  // 加载图标
  var html = '';
  var html_icon = '../../public/img/loading.gif'; // 加载图标
  if(judgeIndex()) { // 首页
    html_icon = 'public/img/loading.gif';
  }
  html += '<div class="loading_global" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: rgba(0, 0, 0, 0.1); z-index: 99999;">';
  html += '    <div class="txt" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0.5rem; width: 1rem; height: 1rem; font-size: 0.48rem; background: rgba(0, 0, 0, 0.5) url(' + html_icon + ') no-repeat center; background-size: 60%;"></div>';
  html += '</div>';
  if($('.loading_global').length > 0) {
    $('.loading_global').show();
  }else {
    $('body').append(html);
  }

  var dfd = $.Deferred();
  $.ajax(url, option).then(function (result) {
    if(!result) {
      if(1 !== query){
        //$.alert('业务级错误：调用正常，返回参数为空');
      }

      dfd.reject(-1);
    }

    if(!result.status) {
      if(1 !== query) {
        // $.alert('业务级错误：调用正常，status为空');
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
          //$.alert('业务级错误：' + result.msg);
          $.alert(result.msg);
        }

      }
      dfd.reject(-1);

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
  }).always(function () {
    $('.loading_global').hide(); // 隐藏 加载中
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
      // $.alert('业务级错误：调用正常，status为空');
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
 * @param $element 图片的jquery对象(eg. $('#img'))
 * @returns {*}
 */
Qnzs.upLoadFile = function ($element) {
  var url = Qnzs.path + '/file_upload';

  var dfd = $.Deferred();

  if(!$element) {
    $.alert('请上传图片');
    dfd.reject(-1);
    return dfd;
  }

  // console.log('$element[0].files', $element[0].files);
  // console.log('$element[0].files.length', $element[0].files.length);

  // 关闭选择图片 弹出框(没选择图片)
  if($element[0].files.length < 1) {
    // console.log('没选择图片');
    dfd.reject(-1);
    return dfd;
  }

  //创建FormData对象
  var data = new FormData();

  //为FormData对象添加数据
  $.each($element[0].files, function (i, file) {
    data.append('upload_file', file);
  });

  $.ajax(url, {
    type: 'POST',
    data: data,
    contentType: false,    //不可缺，否则$_FILES值为空
    processData: false    //不可缺，否则FF控制台报错：“NS_ERROR_XPC_BAD_OP_ON_WN_PROTO: Illegal operation on WrappedNative prototype object”，直接不能运行
  }).then(function (result) {
    if(!result) {
      // $.alert('业务级错误：调用正常，返回参数为空');
      // $.alert('出错了');
      dfd.reject(-1);
    }

    if(result.error != 0) {
      // $.alert('业务级错误：' + result.message);
      $.alert(result.message);
      dfd.reject(-1);
    }

    if(!result.url) {
      // $.alert('业务级错误：调用正常，返回图片路径为空');;
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

/**
 * 保存用户的经纬度
 * @param data
 * lng {string} 经度
 * lat {string} 纬度
 * @returns {*}
 */
Qnzs.location = function (data) {
  return Qnzs.ApiProxy('/stationManage/location', data, '保存用户的经纬度');
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

/**
 * 根据二级域名获取区域ID
 * @param data {obj} 属性如下
 * subDomains {string} 二级域名编码
 * @returns {*}
 */
Qnzs.getDistrictIdBySubDomains = function (data) {
  return Qnzs.ApiProxy('/common/district/getDistrictIdBySubDomains', data, '根据二级域名获取区域',1);
};