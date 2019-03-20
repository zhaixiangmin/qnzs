$(document).ready(function(){


  /*找咨询 ---类型、状态选项*/
  // $('.contentBigBox .leftBox .option,.titListBox .listBox .option').click(function(event) {
  // 	$(this).addClass('cur').siblings().removeClass('cur');
  // });
  $('.contentBigBox .leftBox').on('click', ' .option,.titListBox .listBox .option', function(event) {
    $(this).addClass('cur').siblings().removeClass('cur');
  });

  /*服务类别END*/
  getServiceCategory()

  /*人气专家END*/
  work_list_team()

  /*活跃组织END*/
  work_list_team02()
  // 分页器插件 -- 求助中
  pageCheck('.pageBoxList', '#quesList', data);

});

/*活跃组织*/
function work_list_team02() {
  sendAjax();  //初始化列表
  function sendAjax(data) {

    FindConsultApi.searchOrganization({page: 0, rows: 5,order: 'desc',sort:'answer_question_count'}).then(function (data) {
      createEle(data.rows);
      //console.log('组织11', data);
    })
  }
}
//活跃组织列表
function createEle(data) {
  var html = '';
  var num = 3;
  for (var i = 0; i < data.length; i++) {
    var imgUrl = Utils.compressByAli(data[i].photoUrl ? data[i].photoUrl : '../../public/img/default_avator.png', '?x-oss-process=image/resize,m_mfit,h_80,w_80');
    html += '<li class="clearfix borderB01 position_r">'
    // html += ' <a href="find_consult_wzz_detail.html?oid=' + data[i].oid + '">'
    html += ' <a href="../organization/organization_detail.html?oid=' + data[i].oid + '">'
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
    html += ' <button class="right fl colorfff disB tiwenBtn position_a" onclick="askAccPblicUI(\'' + data[i].oid + '\')">向TA提问</button>'
    html += '</li>'
  }
  $('.activityOrg_ul').append(html)
}
/*活跃组织END*/

//人气专家列表
function work_list_team(){
  sendAjax();  //初始化列表
  function sendAjax(data){

    FindConsultApi.findAllExpertAccount({'page':0,'rows':5}).then(function (data) {
      createEle(data.rows);
      // console.log('专家11',data);
    })
  }
  //createEle();
  function createEle(data){

    var num=3;
    var html='';
    for (var i = 0; i < data.length; i++) {
      var imgUrl = data[i].photoUrl ? data[i].photoUrl : '../../public/img/default_avator.png';
      html+='<li class="clearfix borderB01">'
      html+='<a href="find_consult_wzj_detail.html?username=' + data[i].username + '">'
      html+=' <div class="imgDiv">'
      html+='   <img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" alt="" />'
      html+='  </div>'
      html+='</a>'
      html+='  <div class="rightTxt">'
      html+='  <div class="titBox">'
      html+='   <p id="orgName" class="tit font14 color000">'+data[i].orgName+'</p>'
      html+='  </div>'
      html+='   <p id="expProfession" class="middleTxt color666">'+data[i].expProfession+'</p>'
      html+=' <div class="botBox clearfix">'
      html+='   <button class="right fl colorfff disB tiwenBtn" onclick="askExpertUI(\'' + data[i].username + '\')">向TA提问</button>'
      html+='  </div>'
      html+=' </div>'
      html+='</li>'
    };
    $('#hotPro_ul').append(html);
  }
}
/*状态类别列表*/
function getServiceCategory(){
  sendAjax();  //初始化列表
  function sendAjax(data){

    FindConsultApi.getServiceCategory(data).then(function (data) {
      createEle(data);
      //console.log('专家11',data);
    })
  }
  //createEle();
  function createEle(data){
    var num=3;
    var html='';
    for (var i = 0; i < data.rows.length; i++) {
      html+='<a href="javascript:getQuestionsByParams();" class="option" lang="'+data.rows[i].caId+'">'+data.rows[i].name+'</a>'
    };
    $('#category').append(html);
  }
}
/*状态类别列表END*/

//获取地区ID
var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
var sitenavOrgId = undefined;
if(district_qnzs) {
  district_qnzs = JSON.parse(district_qnzs);
  if(district_qnzs && district_qnzs.sitenavOrgId) {
    sitenavOrgId = district_qnzs.sitenavOrgId;
  }else {
    sitenavOrgId = 440000; // 默认广东省
  }
}else {
  sitenavOrgId = 440000; // 默认广东省
}

// console.log('地区ID',sitenavOrgId)
var data = {
  /*接口参数*/
  page: 1,//当前页
  rows: 15,//每页显示条数
  // sitenavOrgId: undefined,//所属分站ID
  categoryId:-1,//类别id
  keyword: "", // 关键字
  qType:-1,//选择
  sitenavOrgId: sitenavOrgId//所属分站ID
};
//筛选数据
var data_search = {
  /*接口参数*/
  page: 1,//当前页
  rows: 15,//每页显示条数
  // sitenavOrgId: undefined,//所属分站ID
  categoryId: "",//类别id
  keyword: "", // 关键字
  qType: "",//选择
  sitenavOrgId: sitenavOrgId//所属分站ID
};

//渲染列表
function helping(data) {

  var list = '';
  for(var i=0; i < data.length; i++) {
    var item = data[i];
    var imgUrl ='';
    if(item.photourl!=null){
      var  s1 = item.photourl.split('/');
      if(s1[0] !='http:'){

        imgUrl ='../../public/img/user_headImg/1 ('+parseInt(Math.random()*10*4)+').png';
      }else{

        imgUrl =item.photourl ;
      }
    }else{
      imgUrl ='../../public/img/user_headImg/1 ('+parseInt(Math.random()*10*4)+').png';

    }

    list += '<a href="find_consult_quesdetail.html?quId='+item.quId +'" class="itemBox">';
    list += ' <div class="itemCon borderB01 clearfix">';
    list += '  <div class="imgDiv fl">';
    list += '   <img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" />';
    list += '  </div>';
    list += '  <div class="rightTxt">';
    list += '   <h3 class="font16 color2185cf">' + item.title + '</h3>';
    list += '   <div class="color000 askcont">'+ item.askContent+'</div>';
    list += '   <div class="botBox clearfix">';
    list += '    <div class="left fl">';
    list += '     <span class="span01 borderR01">'+ item.realname+'</span>';
    list += '     <span class="span02">'+ item.categoryName+'</span>';
    list += '     <span class="span03">'+ item.askTime+'</span>';
    list += '    </div>';
    list += '    <span class="right fr color333 pinglun">'+ item.commentsNum+'</span>';
    list += '   </div>';
    list += '  </div>';
    list += ' </div>';
    list += '</a>';
  }
  return list;
}
function pageCheck(parentCell, contentCell, data) {
  $(parentCell).pageFun({
    contentCell: contentCell, /*包裹数据列表的父容器*/
    maxPage:6,/*显示页码框个数*/
    pageFun:function(i){
      var pageHtml = '<li class="pageNum">'+i+'</li>';
      return pageHtml;
    },
    apiProxy:FindConsultApi.getServiceList, /*接口函数*/
    data: data,
    listFun: helping, /*数据列表函数 -- 返回html字符串*/
    arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
  });
}
//筛选
// function pageCheck(parentCell, contentCell, data) {
// 	$(parentCell).pageFun({
// 		contentCell: contentCell, /*包裹数据列表的父容器*/
// 		maxPage:6,/*显示页码框个数*/
// 		pageFun:function(i){
// 			var pageHtml = '<li class="pageNum">'+i+'</li>';
// 			return pageHtml;
// 		},
// 		apiProxy:FindConsultApi.getServiceList, /*接口函数*/
// 		data: data,
// 		listFun: helping, /*数据列表函数 -- 返回html字符串*/
// 		arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
// 	});
// }
//点击状态类别筛选
function getQuestionsByParams(keyWord) {
  //}{
  //var search = $('#searchKeyWord').val();
  if('null' == keyWord || 'undefined' == keyWord){
    keyWord = null;
  }
  var qType = $("#qType .cur").attr("lang");
  var categoryId = $("#category .cur").attr("lang");
  data_search.qType = qType;
  data_search.categoryId = categoryId;

  var html = '';
  html += '<div class="list list01 bgcWhite" id="quesList">';
  html += '</div>';

  $('.pageBoxList').html(html);
  pageCheck('.pageBoxList', '#quesList', data_search);
}

// 点击搜索
$('#searchQuestion').click(function () {
  var search = $('#searchKeyWord').val();
  data_search.keyword = search;

  var html = '';
  html += '<div class="list list01 bgcWhite" id="quesList">';
  html += '</div>';

  $('.pageBoxList').html(html);
  pageCheck('.pageBoxList', '#quesList', data_search);
});
