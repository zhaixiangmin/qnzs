var MoreactiveApi={}

MoreactiveApi.recommendList = function(data) {
  return Qnzs.ApiProxy('/activity/offlineActivity/recommendList', data, '获取活动列表分页');
};


$(document).ready(function(){

  var actStatus= {
    '1': '活动预告',
    '2': '报名中',
    '3': '已满员',
    '4': '报名结束',
    '5': '活动中',
    '6': '活动结束'
  };

  function getData(data){

    $.each(data,function(index,item){


      $('.hot_acticve').append('<li><a href="../find_active/zhd_xiangqing.html?activityId=' + item.id + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">'+actStatus[item.actStatus]+'</span><img src="'+Utils.compressByAli(item.imageUrl, '?x-oss-process=image/resize,m_mfit,h_260,w_173')+'" width="100%" height:"100%" alt="" class="imgURl"/></div><div class="txt"><div class="conTit"><p class="font16 color000">'+item.title+'</p> </div><p class="address color999">'+item.address+'</p><div class="botTxt clearfix"> <p class="fl">'+item.activityTime+'</p> <span class="fr color01">'+item.type+'</span></div></div> </a></li>');

    });

  }

  function pageCheck(parentCell, contentCell, data, arg) {
    $(parentCell).pageFun({
      contentCell: contentCell,
      /*包裹数据列表的父容器*/
      maxPage: 6,
      /*显示页码框个数*/
      apiProxy:MoreactiveApi.recommendList,
      /*接口函数*/
      data: data,
      /*接口参数*/
      listFun: getData,
      /*数据列表函数 -- 返回html字符串*/
      arg: arg /*数据列表函数 的参数-可以是对象或数组等等*/
    });
  }
  var data = { /*接口参数*/

    pageIndex: 1, //当前页
    pageSize: 12, //页码数

  };
  pageCheck('#list_more', '.hot_acticve', data);

  $('#searchQuestion').on('click',function(){

    var keywords= $('#searchKeyWord').val();

    data.keywords = keywords;

    var html = '';

    html+='<ul class="clearfix hot_acticve"></ul>'

    $('list_more').html(html);
    pageCheck('#list_more', '.hot_acticve', data);
  })


});
