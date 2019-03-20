//Qnzs.path=Qnzs.env.dev //api

var oid = '';
var currentAccount = "";
// var district_qnzs= $.cookie('district_qnzs'); // 获取cookie(区域)
// district_qnzs=JSON.parse(district_qnzs);
//   var sitenavDid=district_qnzs.sitenavOrgId;
//var sitenavDid = 440000;


// console.log(sitenavDid);
$(document).ready(function() {
  var sitenavDid ;





  Qnzs.getSessionAccount({}).then(function(data) {
    console.log('Qnzs.getSessionAccount data', data);
    currentAccount = data.account; // 账户信息

  });

  /*首页的  热门活动展示*/

  //获取推荐列表
  function getRecommandList(sitenavDid) {
    var actStatus = {
      '1': '活动预告',
      '2': '报名中',
      '3': '已满员',
      '4': '报名结束',
      '5': '活动中',
      '6': '活动结束'
    };
    $.ajax({
      type: "get",
      url: Qnzs.path + "/activity/offlineActivity/recommendList",
      data:{"sitenavDid":sitenavDid},
      dataType: 'json',
      success: function(data) {
        var data = data.dataList;
        $.each(data, function(index, item) {
          var actiivtyId = item.id;
          var actTitle = '';
          if (item.title && item.title.length <= 30) {
            actTitle = item.title;
          } else if (item.title && item.title.length > 30) {
            actTitle = item.title.substring(0, 29) + '...';
          }
          //					$('.hot_acticve').append('<li><a href="' + Qnzs.path + '/activity/offlineActivity/detail?activityId=' + actiivtyId + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">'+actStatus[item.actStatus]+'</span><img src="'+item.imageUrl+'" width="400" alt="" /></div><div class="txt"><div class="conTit"><p class="font16 color000">'+item.title+'</p> </div><p class="address color999">'+item.address+'</p><div class="botTxt clearfix"> <p class="fl">'+item.activityTime+'</p> <span class="fr color01">'+item.type+'</span></div></div> </a></li>');
          $('.hot_acticve').append('<li><a href="view/find_active/zhd_xiangqing.html?activityId=' + actiivtyId + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">' + actStatus[item.actStatus] + '</span><img class="imgURl" src="' + Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_260,w_173') + '" width="100%" height:"100%" alt="" /></div><div class="txt"><div class="conTit"><p class="font16 color000">' + actTitle + '</p> </div><p class="address color999">' + item.address + '</p><div class="botTxt clearfix"> <p class="fl">' + item.activityTime + '</p> <span class="fr color01">' + item.type + '</span></div></div> </a></li>');
        });
      }
    });
  }


  /*首页的  热门活动展示  end*/

  /*-------------首页的  人气主办方展示------------------*/
  function indexSponsor() {
    $.ajax({
      type: "get",
      url: Qnzs.path + "/activity/publisher/list",
      data: {
        'pageIndex':1,
        'pageSize': 5
      },
      dataType: "JSON",
      success: function(data) {
        var data = data.dataList;

        $.each(data, function(index, item) {
          var coor = item.activityAverageScore;
          var corrnum = coor.toFixed(1);
          oid = item.oid;
          //					$('ul#indexSponsor').append('<li class="clearfix borderB01"><a href="view/organization/organization_detail.html?oid='+oid+'"><div class="imgDiv"> <img src="'+item.photoUrl+'"  width="120" alt="" /></div><div class="rightTxt"><div class="titBox"><p class="tit font14 color000">'+item.name+'</p></div><div class="scoreBox clearfix"><ol class="clearfix fl"><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li></ol> <span class="fl scoreColor01 font14 fenshu"><em>'+corrnum+'</em>分</span><span class="yiping font12 color999">'+item.activityScoreCount+'人已评</span></div><div class="botBox clearfix"> <span class="left fl color000 font12">'+item.answerQuestionCount+'人关注</span><a href="javascript:;" class="right fr colorfff disB attention">关注</a><a href="javascript:;" class="right fr colorfff disB attention" style="display:none;width:60px;">取消关注</a></div></div></a></li>');

          var html = '';
          html += '';
          html += '<li class="clearfix borderB01">';
          html += '  <a href="view/organization/organization_detail.html?oid=' + oid + '">';
          html += '    <div class="imgDiv">';
          html += '        <img src="' + Utils.compressByAli(item.photoUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" width="100%" height:"100%" alt="" />';
          html += '    </div>';
          html += '    <div class="rightTxt">';
          html += '        <div class="titBox">';
          html += '             <p class="tit font14 color000">' + item.name + '</p>';
          html += '         </div>';
          html += '        <div class="scoreBox clearfix">';
          html += '             <ol class="clearfix fl">';
          html += '                <li><span></span></li>';
          html += '                <li><span></span></li>';
          html += '                <li><span></span></li>';
          html += '                <li><span></span></li>';
          html += '                <li><span></span></li>';
          html += '             </ol> ';
          html += '             <span class="fl scoreColor01 font14 fenshu"><em>' + corrnum + '</em>分</span>';
          html += '             <span class="yiping font12 color999">' + item.activityScoreCount + '人已评</span> ';
          html += '        </div>';
          html += '        <div class="botBox clearfix">';
          html += '              <span class="left fl color000 font12" id="attentionCount_' + item.oid + '">' + item.attentionCount + '人关注</span>';
          html += '        </div>';
          html += '    </div>';
          html += '  </a>';
          //					html += '  <a href="javascript:;" class="right fr colorfff disB attention" id="followBtn_' + item.oid + '" value="取消关注" onclick="followOrCancelOrganization(this, ' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');">关注</a>';
          /*if (item.isFollowed) { //已关注
            html += ' <input type="button" class="right fr colorfff disB guanzhu" id="followBtn_' + item.oid + '" value="取消关注" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />'
              //						html += ' <a href="javascript:;" class="right fr colorfff disB attention" id="followBtn_' + item.oid + '" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');">取消关注</a>';
          } else { //未关注
            //						html += ' <a href="javascript:;" class="right fr colorfff disB attention" id="followBtn_' + item.oid + '" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');">关&nbsp;&nbsp;注</a>';
            html += ' <input type="button" class="right fr colorfff disB guanzhu" id="followBtn_' + item.oid + '" value="关注" onclick="followOrCancelOrganization(' + item.oid + ', ' + item.isFollowed + ',' + item.attentionCount + ');" />'
          }*/
          html += '</li>';
          $('ul#indexSponsor').append(html);
        });

        $('ul#indexSponsor .attention').click(function() {
          $(this).hide().siblings('.attention').show();
        })
      }
    });
  }
  indexSponsor();

  /*-------------首页的  人气主办方展示  end------------------*/









  /*-----------------------------问答板块-----------------------------*/

  /*热门问答*/
  function hot_ask(sitenavOrgId) {
    sendAjax(); //初始化列表

    //console.log('qType', qType);
    function sendAjax(data) {
      //var qType = $("#qType .cur").attr("lang");
      //var data={page:0,rows:3,qType:qType};

      FindConsultApi.getServiceList({
        page: 0,
        rows: 5,
        qType: 1,
        sitenavOrgId: sitenavOrgId
      }).then(function(data) {
        createEle(data.rows);
        // console.log('组织11', data);
      })
    }

    function createEle(data) {
      var list = '';
      for (var i = 0; i < data.length; i++) {
        var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
        var imgUrl = data[i].photourl ? data[i].photourl : 'public/img/default_avator.png';
        list += '<a href="view/find_consult/find_consult_quesdetail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="itemBox">'
        list += ' <div class="itemCon borderB01 clearfix">'
        list += '  <div class="imgDiv fl">'
        var imgUrl_old=imgUrl;

        var img_attr = imgUrl.split('//');
        var imgUrls ='';
        console.log(img_attr)

        if(img_attr.length){

          for(var j=0;j<img_attr.length ; j++){

            if(img_attr[0] =='http:'&&img_attr.length==2){


              imgUrls = 'https:' +img_attr[1] ;

            }else{

              imgUrls =imgUrl_old;
            }

          }
        }

        console.log(imgUrls)


        list += '   <img src="' + Utils.compressByAli(imgUrls, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" />'
        list += '  </div>'
        list += '  <div class="rightTxt">'
        list += '   <h3 class="font16 color2185cf">' + data[i].title + '</h3>'
        list += '   <div class="color000 askcont">' + data[i].askContent + '</div>'
        list += '   <div class="botBox clearfix">'
        list += '    <div class="left fl">'
        list += '     <span class="span01 borderR01">' + data[i].realname + '</span>'
        list += '     <span class="span02">' + data[i].categoryName + '</span>'
        list += '     <span class="span03">' + datetime + '</span>'
        list += '    </div>'
        list += '    <span class="right fr color333 pinglun">' + data[i].commentsNum + '</span>'
        list += '   </div>'
        list += '  </div>'
        list += ' </div>'
        list += '</a>'
      }
      $('.ask_and_answer .list01').append(list)
    }
  }


  /*精华问答*/
  function best_ask(sitenavOrgId) {
    sendAjax(); //初始化列表

    //console.log('qType', qType);
    function sendAjax(data) {
      //var qType = $("#qType .cur").attr("lang");
      //var data={page:0,rows:3,qType:qType};

      FindConsultApi.getServiceList({
        page: 0,
        rows: 6,
        qType: 2,
        sitenavOrgId: sitenavOrgId
      }).then(function(data) {
        createEle(data.rows);
        // console.log('组织11', data);
      })
    }

    function createEle(data) {
      var list = '';

      for (var i = 0; i < data.length; i++) {
        var datetime = new Date(data[i].askTime).format('yyyy-MM-dd hh:mm:ss');
        var imgUrl = data[i].photourl ? data[i].photourl : 'public/img/default_avator.png';
        list += '<a href="view/find_consult/find_consult_quesdetail.html?quId=' + data[i].quId + '&username=' + data[i].username + '" class="itemBox">'
        list += ' <div class="itemCon borderB01 clearfix">'
        list += '  <div class="imgDiv fl">'



        var imgUrl_old=imgUrl;

        var img_attr = imgUrl.split('//');
        var imgUrls ='';
        console.log(img_attr)

        if(img_attr.length){

          for(var j=0;j<img_attr.length ; j++){

            if(img_attr[0] =='http:'&&img_attr.length==2){


              imgUrls = 'https:' +img_attr[1] ;

            }else{

              imgUrls =imgUrl_old;
            }

          }
        }

        console.log(imgUrls)





        list += '   <img src="' + Utils.compressByAli(imgUrls, '?x-oss-process=image/resize,m_mfit,h_80,w_80') + '" />'
        list += '  </div>'
        list += '  <div class="rightTxt">'
        list += '   <h3 class="font16 color2185cf">' + data[i].title + '</h3>'
        list += '   <div class="color000 askcont">' + data[i].askContent + '</div>'
        list += '   <div class="botBox clearfix">'
        list += '    <div class="left fl">'
        list += '     <span class="span01 borderR01">' + data[i].realname + '</span>'
        list += '     <span class="span02">' + data[i].categoryName + '</span>'
        list += '     <span class="span03">' + datetime + '</span>'
        list += '    </div>'
        list += '    <span class="right fr color333 pinglun">' + data[i].commentsNum + '</span>'
        list += '   </div>'
        list += '  </div>'
        list += ' </div>'
        list += '</a>'
      }
      $('.ask_and_answer .list02').append(list)
    }
  }

  /*问答板块右边列表 活跃组织*/
  function activeOrg() {
    sendAjax(); //初始化列表
    function sendAjax(data) {
      FindConsultApi.searchOrganization({
        page: 0,
        rows: 6,
        order: 'desc',
        sort: 'answer_question_count'
      }).then(function(data) {
        createEle(data.rows);
        //console.log('组织11', data);
      })
    }

    function createEle(data) {
      var html = '';
      var num = 3;
      for (var i = 0; i < data.length; i++) {
        var imgUrl = Utils.compressByAli(data[i].photoUrl ? data[i].photoUrl : 'public/img/default_avator.png', '?x-oss-process=image/resize,m_mfit,h_80,w_80');
        html += '<li class="clearfix borderB01 position_r">'
        html += ' <a href="view/organization/organization_detail.html?oid=' + data[i].oid + '">'
        html += '  <div class="imgDiv">'
        html += '   <img src="' + imgUrl + '" alt="">'
        html += '  </div>'
        html += '  <div class="rightTxt">'
        html += '   <div class="titBox">'
        html += '     <p class="tit font14 color000">' + data[i].name + '</p>'
        html += '   </div>'
        html += '   <p class="middleTxt color666">已解答<span>' + data[i].answerQuestionCount + '</span>个问题</p>'
        html += '   <div class="botBox clearfix">'
        html += '   </div>'
        html += '  </div>'
        html += ' </a>'
        html += ' <a href="view/organization/organization_detail.html?oid=' + data[i].oid + '" class="right fl colorfff disB tiwenBtn position_a">向TA提问</a>'
        html += '</li>'
      }
      $('.activityOrg_ul').append(html)
    }
  }
  activeOrg();


  /*-----------------------------问答板块  end-----------------------------*/

  /*------------------------推荐专家 start------------------------*/
  function recommendPro() {
    sendAjax(); //初始化列表
    function sendAjax(data) {
//			FindConsultApi.findAllExpertAccount({
      FindConsultApi.findIndexExpertAccounts({
        'page': 0,
        'rows': 12
      }).then(function(data) {
        createEle(data.rows);
      })
    }
    function createEle(data) {

      var num = 3;
      var html = '';
      for (var i = 0; i < data.length; i++) {
        var imgUrl = data[i].photoUrl ? data[i].photoUrl : 'public/img/default_avator.png';
        html += '<li>';
        html += '<a href="view/find_consult/find_consult_wzj_detail.html?username=' + data[i].username + '">';
        html += '  <div class="imgBox">';
        html += '   <div class="imgDiv">';
        html += '    <img src="' + Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_120,w_120') + '" />';
        html += '   </div>';
        html += '  </div>';
        html += '  <h2 class="name color000 font16">' + data[i].orgName + '</h2>';
        html += '  <p class="touxian color666">' + data[i].expProfession + '</p>';
        html += '  <button class="colorfff">向TA提问</button>';
        html += ' </a>';
        html += '</li>';
      }
      $('.tuijianzhuanjia .bd ul').append(html);
      jQuery(".tuijianzhuanjia .picScroll").slide({
        mainCell:".bd ul",
        autoPage:true,
        effect:"leftLoop",
        vis:6});
    }
  }
  recommendPro();
  /*------------------------推荐专家 end------------------------*/


  /**
   * 首页banners
   * @param sitenavDid {int} 区域ID
   */
  function getIndexBanners(sitenavDid){
    var params = {
      did: sitenavDid, //  地区ID
      type: 0, // 类型：0-pc端；1-移动端
      acticey: 0 // 分类：0-首页banner；1-找活动；2-找帮助；3-重磅项目；4-青年之家;5-首页推荐项目
    };
    Qnzs.findImageByType(params).then(function (data) {
      var banners = data.dataList;
      var autoPlay = banners.length > 1 ? true: false; // 只有一张banner，不自动轮播
      var html ='';
      for(var i = 0; i < banners.length; i++){
        banner = banners[i];
        html += '<li>';
        html += '	<a href="' + banner.url + '" target="_blank" >';
        html += '		<img src="' + Utils.compressByAli(banner.path, '?x-oss-process=image/resize,h_380')+ '" />';
        html += '	</a>';
        html += '</li>';

      }
      $('#head-banner ul').append(html);
      jQuery(".banBox").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPlay: true,
        autoPage: true,
        interTime: 3000,
        delayTime: 300,
        prevCell: ".change.prev",
        nextCell: ".change.next",
        trigger: "mouseover"
      });
    });
  }


  // 渲染页面(根据区域ID)
  function renderData() {
    /**
     * 根据区域ID获取数据(不同模块接口的数据)
     * @param sitenavOrgId {int} 区域ID
     */
    function getDataByDistrictId(sitenavOrgId) {
      best_ask(sitenavOrgId); // 精华问答
      hot_ask(sitenavOrgId); // 热门问答
      getRecommandList(sitenavOrgId); // 获取推荐列表
      getIndexBanners(sitenavOrgId); // 首页berner
      recommendableProjects(sitenavOrgId);  //首页重磅项目推荐项目
    }

    // 区域对象
    var district = {
      sitenavOrgId: 440000, // 区域ID
      sitenavOrgName: '广东省' // 区域名称
    };
    var website_test = 'gdqnzs'; // 域名(测试)
    var website = '12355'; // 域名(正式)
    var host = window.location.host; // 主机名
    var isNginx = false; // 是否nginx环境
    // 是否nginx环境
    // host = 'www.12355.net'; // 模拟真实环境(广东省)
    // host = 'GZ.12355.net'; // 模拟真实环境(广州市)
    if(host.indexOf(website) != -1 || host.indexOf(website_test) != -1) { // 检测是否nginx环境
      isNginx = true;
    }

    if(isNginx) { // nginx环境
      var hostArr = host.split('.'); // www.gdqnzs.cn、www.gz.gdqnzs.cn(www.12355.net、www.gz.12355.net)
      if(hostArr.length >= 3) {
        var regionName = hostArr[hostArr.length-3]; // www、gz
        if(regionName == 'www'){ // 正常域名
          if($.cookie && $.cookie('district_qnzs')) { // 有cookie
            var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
            district_qnzs = JSON.parse(district_qnzs);
            district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
            district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID
          }

          getDataByDistrictId(district.sitenavOrgId); // 根据区域ID渲染页面
          sitenavDid =district.sitenavOrgId;
          console.log(sitenavDid)

        }else { // 特定域名
          if($.cookie && $.cookie('district_qnzs')) { // 有cookie(非第一次打开链接)
            var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
            district_qnzs = JSON.parse(district_qnzs);
            district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
            district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID

            getDataByDistrictId(district.sitenavOrgId); // 根据区域ID渲染页面
            sitenavDid =district.sitenavOrgId;
            console.log(sitenavDid)
          }else { // 无cookie(第一次打开链接)
            // 根据二级域名获取区域ID
            Qnzs.getDistrictIdBySubDomains({subDomains: regionName}).then(function (data) {
              if(data.data) {
                district.sitenavOrgId = data.data.districtId; // 区域ID
                district.sitenavOrgName = data.data.districtName; // 区域名称
              }
            }).always(function () {
              if($.cookie && $.cookie('district_qnzs')) { // 有cookie
                var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
                district_qnzs = JSON.parse(district_qnzs);
                district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
                district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID
              }

              getDataByDistrictId(district.sitenavOrgId); // 根据区域ID渲染页面
              sitenavDid =district.sitenavOrgId;
              console.log(sitenavDid)

            });
          }
        }
      }
    }else { // 本地环境
      if($.cookie && $.cookie('district_qnzs')) { // 有cookie
        var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
        district_qnzs = JSON.parse(district_qnzs);
        district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
        district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID
      }

      getDataByDistrictId(district.sitenavOrgId); // 根据区域ID渲染页面
      sitenavDid =district.sitenavOrgId;
      console.log(sitenavDid)
    }
  }
  renderData(); // 渲染页面(根据区域ID)


  /****---------------------------------首页重磅项目推荐bnner------/project/indexActivityList------------------***/
  function recommendableProjects(sitenavOrgId) {

    console.log(sitenavOrgId);
    $.ajax({
      type:"get",
      url:Qnzs.path+"/imageManager/findImageByType",
      data:{'did':sitenavOrgId,'type':0,'acticey':5},//sitenavDid  //currentAccount.did
      dataType :"JSON",
      success:function(data){
        console.log(data);
        var data=data.dataList;
        var html = '';
        for (var i = 0; i < data.length; i++) {

          html += '<li class="d_pos' + (i+1) + '">'
          html += '<div>'
          html += '   <div class="clearfix">'
          html += '<div class="left fl">'
          var activityType='';
          if(data[i].activityType ==1){
            activityType ='赛事';

          }else if(data[i].activityType ==2){
            activityType ='评选';
          }else if(data[i].activityType ==3){
            activityType ='培训';
          }else if(data[i].activityType ==4){
            activityType ='其他';
          }

          html += '<em class="fl color17c0ff">' + activityType+ '</em>'
          html += '<span class="fl colorfff">' + data[i].title + '</span>'
          html += ' </div>'
          html += '<div class="right fr">'
//				html += '<em class="bgc17c0ff dl colorfff">剩</em>'
          var stageStr = '';
          if(data[i].stage==1){
            stageStr = '未开始';
            colorStr = 'color33cc33';
          }else if(data[i].stage==2 || data[i].stage==5){
            stageStr = '报名中';
            colorStr = 'color33cc33';
          }else if(data[i].stage==3){
            stageStr = '投票中';
            colorStr = 'color33cc33';
          }else{ //if(data[i].stage==4)
            stageStr = '活动结束';
            colorStr = 'colorfff';
          }
          html += '<span class="'+colorStr+' dl">'+data[i].activityStatusDesc+'</span>'
          html += ' </div>'
          html += '</div>'
          html += ' </div>'
          if(data[i].externalLinksPc == ''){
            if (data[i].templateName == "model1") {
              html += '<a href="'+data[i].url+'" target="_blank">'
            } else {
              html += '<a href="'+data[i].url+'" target="_blank">'
            }
          }else{
            html += '<a href="'+data[i].url+'" target="_blank">'
          }
//				html += '<a href="view/heavy_project_model2/zbxm_index_model_2.html?activityId=' + data[i].id + '" target="_blank">'
          html += ' <img src="' + Utils.compressByAli(data[i].path, '?x-oss-process=image/resize,h_295') + '" alt=""/>'
          html += '</a>'
          html += '</li>'
        };

        $('.d_img').append(html);
        $('.d_pos1').css({
          'display': 'block',
          'width': '460px',
          'left': '0',
          'top': '0',
          'z-index': '1'
        })
        $('.d_pos2').css({
          'display': 'block',
          'width': '580px',
          'left': '150px',
          'top': '0',
          'z-index': '2'
        })

        $('.d_pos3').css({
          'display': 'block',
          'width': '700px',
          'left': '250px',
          'top': '0',
          'z-index': '3'
        })
        $('.d_pos4').css({
          'display': 'block',
          'width': '580px',
          'right': '125px',
          'top': '0',
          'z-index': '2'
        })
        $('.d_pos5').css({
          'display': 'block',
          'width': '580px',
          'right': '0',
          'top': '0',
          'z-index': '1'
        })

        $('#d_tab29').DB_rotateRollingBanner({
          key:"c37080",
          moveSpeed:200,
          autoRollingTime:1000
        })
      }
    });
  }





});//文档准备结束





/**
 * 关注或取消关注组织
 * @param orgId 组织ID
 * @param isFollowed 是否已关注过
 * @param attentionCount 当前关注数
 * @returns
 */
function followOrCancelOrganization(orgId, isFollowed, attentionCount) {
  if (!currentAccount) {
    alert("请先登录");
    $('#loginBtn').click();
    return;
  }

  $.ajax({
    type: "get",
    url: Qnzs.path + "/organizationAttention/followOrCancel",
    data: {
      'orgId': orgId
    },
    dataType: "JSON",
    success: function(data) {
      if (data.status != 'OK') {
        alert(data.msg);
        return;
      } else {
        alert(data.msg);
        var btnStr = "";
        if (isFollowed == true) { //已关注，取消关注
          attentionCount = !attentionCount || attentionCount <= 0 ? 0 : attentionCount - 1; //关注数-1
          btnStr = "关注";
        } else { //未关注，添加关注
          attentionCount = attentionCount + 1; //关注数+1
          btnStr = "取消关注";
        }

        $('#followBtn_' + orgId).val(btnStr);
        $('#attentionCount_' + orgId).text(attentionCount + '人关注');
      }
    }
  });

}

/**
 * 青年之声所有域名 www.gd12355.org；www.gdqnzs.cn；www.12355.org；青年之声.cn访问时，地址栏都要统一指向跳转到 www.12355.net
 */
(function domainRedirect(){
  var host=$.trim(document.domain);
  if("www.gd12355.org" == host
    ||"gd12355.org" == host
    ||"www.gdqnzs.cn" == host
    ||"gdqnzs.cn" == host
    ||"www.12355.org" == host
    ||"12355.org" == host
    ||"www.青年之声.cn" == host
    ||"青年之声.cn" == host
    ||"www.xn--9iq62x8me052e.cn" == host
    ||"xn--9iq62x8me052e.cn" == host
    ||"12355.net" == host
  ){
    window.location.href = '//www.12355.net';
  }
}());



/**
 * 判断是否是pc设备
 */
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  console.log(userAgentInfo);
  var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      window.location.href = '/wechat/index.html';

      flag = false;
      break;
    }
  }
  if(window.screen.width>=768){


    flag = true;
  }
  return flag;
}

IsPC();

