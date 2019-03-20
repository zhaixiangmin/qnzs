






$(document).ready(function(){

  // 求助中、已解决按钮激活切换
  $('.askForHelp .tit h3').click(function(event) {
    $(this).addClass('color2185cf').siblings('h3').removeClass('color2185cf');
    var thisNum = $(this).index();
    //console.log('thisNum', thisNum);
    if(thisNum == 0) { // 点击求助中
      $('.askForHelp .pageBox.helping').show();
      $('.askForHelp .pageBox.resolved').hide();
    }else {
      $('.askForHelp .pageBox.helping').hide();
      $('.askForHelp .pageBox.resolved').show();
    }
  });

  /**
   * 找帮助列表（求助中、已解决）
   * @param helpList {array} 求助中列表
   * @param text {string} 标签文本(eg.求助中)
   */
  function helping(helpList) {
    var text = '无内容';
    if(arguments.length > 0) {
      text = arguments[1]; // arguments[0] ==> helpList
      // //console.log('text', text)
    }

    var list = '';
    //console.log('helpList', helpList);
    for(var i=0; i < helpList.length; i++) {
      var item = helpList[i];
      //var createTime = new Date(item.createTime).format('yyyy-MM-dd'); // 1498140055000

      // var imgUrl = item.imgUrl ? item.imgUrl : Utils.getDefaultImg();
      var imgUrl = Utils.getDefaultImg();
      if(item.imgUrl) {
        imgUrl = item.imgUrl.split(',')[0]; // 默认获取第一张图片
      }

      list+='<a href="detail.html?id=' + item.hpId + '" class="disB itemBox">';
      // list+='<a href="find_help_detail.html?hpId=" class="disB itemBox">';
      list+=' <div class="itemCon borderB01 clearfix">';
      list+='  <div class="imgDiv fl">';
      list+='   <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_210,w_140') + '"/>';
      list+='  </div>';
      list+='  <div class="rightTxt">';
      list+='   <div class="top clearfix">';
      list+='    <span class="fl colorfff">' + text + '</span>';
      list+='    <h3 class="color000 font16 fl">《' + item.title + '》</h3>';
      list+='   </div>';
      // list+='   <p class="longTxt color999">' + item.helpContent + '</p>'; // 如果内容含有子标签p，父标签p会包裹不住，子标签p与父标签p同级
      list+='   <div class="longTxt color999">' + item.helpContent + '</div>'; // 如果内容含有子标签p，父标签p会包裹不住，子标签p与父标签p同级
      list+='   <div class="middle color000">';
      list+='    <span class="left borderR01">受理方：' + item.acquirerRealName + '</span>';
      list+='    <span class="right">求助类型：' + item.helpType + '</span>';
      list+='   </div>';
      list+='   <div class="bottom clearfix color000">';
      list+='    <span class="span02 fl">' + item.countPost + '</span>';
      list+='    <span class="span03 fl">' + item.createTime + '</span>';
      list+='    <button class="fr colorfff conBgc01" style="cursor:pointer;">我要帮TA</button>';
      list+='   </div>';
      list+='  </div>';
      list+=' </div>';
      list+='</a>';
    }
    return list;
  }

  function pageCheck(parentCell, contentCell, params_help, arg) {
    $(parentCell).pageFun({
      contentCell: contentCell, /*包裹数据列表的父容器*/
      maxPage:6,/*显示页码框个数*/
      apiProxy:FindHelpApi.findAllHelp, /*接口函数*/
      data: params_help,  /*接口参数*/
      listFun: helping, /*数据列表函数 -- 返回html字符串*/
      arg: arg  /*数据列表函数 的参数-可以是对象或数组等等*/
    });
  }

  var params_helping = {  /*接口参数*/
    title: undefined,
    auditStatus: 1, // 1：求助中 2：已解决
    page: 1,
    rows: 5,
    sort:'create_time',
    order:'desc'
  };

  // 分页器插件 -- 求助中
  pageCheck('.pageBox.helping', '.list01', params_helping, '求助中');


  var params_resolved = {  /*接口参数*/
    title: undefined,
    auditStatus: 2, // 1：求助中 2：已解决
    page: 1,
    rows: 5,
    sort:'update_time',
    order:'desc'
  };
  // 分页器插件 -- 已解决
  pageCheck('.pageBox.resolved', '.list02', params_resolved, '已解决');

  // 点击搜索
  $('.secondSearch .disB').click(function () {
    var keyword = $('#sb_huodong').val(); // 搜索关键词
    //console.log('keyword', keyword);

    var title = $('.askForHelp .tit h3.color2185cf').text(); // 获取当前高亮选项('求助中'、'已解决')
    //console.log('title', title);
    if(title == '求助中') {
      var html =  '<div class="list list01 bgcWhite"></div>';
      $('.pageBox.helping .pageDiv').html(html);
      params_helping.title = keyword;
      params_helping.page = 1;
      pageCheck('.pageBox.helping', '.list01', params_helping, '求助中');
    }else {
      var html =  '<div class="list list02 bgcWhite"></div>';
      $('.pageBox.resolved .pageDiv').html(html);
      params_resolved.title = keyword;
      params_resolved.page = 1;
      // 分页器插件 -- 已解决
      pageCheck('.pageBox.resolved', '.list02', params_resolved, '已解决');
    }
  });

  // 在输入框按下回车键
  $('#sb_huodong').keypress(function (event) {
    if (event.keyCode == "13") {//keyCode=13是回车键
      //console.log('回车事件');
      $('.secondSearch .disB').click();
    }
  });


  // 点击 '我要求助'
  $('#askForHelpBtn').click(function () {
    var notice = '<p>1. 同一求助者对于同一诉求仅能求助一次；</p>';
    notice += '<p>2. 请选择户籍或常住所在地团委作为受理方（例如，小明户籍为韶关南雄，在广州海珠工作，那么他可向南雄、海珠任意一方团委求助，也可韶关、广州任意一方市级团委求助，若所选组织长时间未受理，可联系本平台）；</p>';
    notice += '<p>3. 疾病求助中金额大于30万的请事先联系本平台；</p>';
    notice += '<p>4. 涉嫌欺诈虚假等的求助，本平台有权追究法律责任。</p>';
    $.alert(notice).then(function () {
      window.location = 'organization.html'; // 求助分类页面
    });
  });

  // 获取组织分页列表
  FindHelpApi.findOrganization({ page: 1, rows: 6, sort: 'attention_count', order: 'desc' }).then(function (data) {
    //console.log('FindHelpApi.findOrganization data', data);
    var organizations = data.rows;
    var html = '';
    for(var i=0; i<organizations.length; i++) {
      var organization = organizations[i];

      var starHtml = '';
      /**
       * 生成星星的html字符串
       * @param starStr {int} 星级分数(eg. 4.5)
       * @returns {string}
       */
      function star_generate(starStr) {
        var html = '';
        var decimals = undefined; // 小数点位
        var integer = undefined; // 整数位
        if(starStr) {
          starStr = starStr + '';
          var arr = starStr.split('.'); // eg. 123.456 -> [123, 456]
          integer = arr[0];
          if(arr && arr.length > 1) {
            decimals = arr[1].substring(0, 1); // 只取字符串的一位,eg. 4
          }
        }

        for(var j=0; j<5; j++) {
          if(j < integer) {
            html += '<li><span></span></li>'; // 亮星
            continue;
          }
          if(decimals > 0) {
            var percentage = decimals * 10;
            html += '<li><span style="width: ' + percentage + '%"></span></li>';
            decimals = undefined; // 只进来一次
            continue;
          }

          html += '<li></li>'; // 灭星
        }

        return html;
      }
      starHtml = star_generate(organization.helpAverageScore);

      var imgUrl =  organization.photoUrl ? organization.photoUrl : '../../public/img/default_avator.png';

      html += '<li class="clearfix borderB01">';
      html += ' <a href="../organization/organization_detail.html?oid=' + organization.oid + '">';
      html += '  <div class="imgDiv">';
      html += '   <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '"  />';
      html += '  </div>';
      html += '  <div class="rightTxt">';
      html += '   <div class="titBox">';
      html += '    <p class="tit font14 color000">' + organization.fullName + '</p>';
      html += '   </div>';
      html += '   <div class="scoreBox clearfix">';
      html += '    <ol class="clearfix fl"></ol>';
      html += '    <span class="fl scoreColor01 font14 fenshu"><em>' + organization.helpAverageScore + '</em>分</span>';
      html += '    <span class="yiping font12 color999">' + organization.helpScoreCount + '人已评</span>';
      html += '   </div>';
      html += '   <div class="botBox clearfix">';
      html += '    <span class="left fl color000 font12">已解决求助 '+ organization.solveHelpCount + '次</span>';
      html += '    <a href="javascript:;" class="right fr color000 disB">' + organization.attentionCount + '人关注</a>';
      html += '   </div>';
      html += '  </div>';
      html += ' </a>';
      html += '</li>';
    }
    $('.askForHelp .rightHost .itemBox ul').html(html);
  });

  /**
   * 头部banners
   */
  function getBanners(){
    var sitenavOrgId = 440000; // 默认广东省
    if($.cookie && $.cookie('district_qnzs')) {
      var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
      district_qnzs = JSON.parse(district_qnzs);
      sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
    }
    //console.log('sitenavOrgId', sitenavOrgId);

    var params = {
      did: sitenavOrgId, //  地区ID
      type: 0, // 类型：0-pc端；1-移动端
      acticey: 2 // 分类：0-首页banner；1-找活动；2-找帮助；3-重磅项目；4-青年之家;5-首页推荐项目
    };
    Qnzs.findImageByType(params).then(function (data) {
      var banners = data.dataList;
      var autoPlay = banners.length > 1 ? true: false; // 只有一张banner，不自动轮播
      var html ='';
      for(var i = 0; i < banners.length; i++){
        banner = banners[i];
        html += '<li>';
        html += '	<a href="' + banner.url + '" target="_blank" >';
        html += '		<img src="' + Utils.compressByAli(banner.path, '?x-oss-process=image/resize,h_380') + '" />';
        html += '	</a>';
        html += '</li>';
      }
      $('#head-banner ul').append(html);
      jQuery(".banBox").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPlay: autoPlay,
        autoPage: true,
        interTime: 3000,
        delayTime: 300,
        prevCell: ".change.prev",
        nextCell: ".change.next",
        trigger: "mouseover"
      });
    });
  }
  getBanners(); // 头部banners

});