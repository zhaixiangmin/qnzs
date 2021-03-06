
var activityId = "";
var activityDetailId = null;

$(document).ready(function(){

  function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) { //判断是否有参数
      var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      if(strs.indexOf("&") < 1){
        strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
        activityId = strs[1];
      }else{
        activityId = strs.substring(strs.indexOf("activityId=")+11,strs.indexOf("&"));
        activityDetailId = strs.substring(strs.indexOf("activityDetailId=")+17);
      }
      $('#sign_up').attr('href','openEnroll.html?activityId='+activityId+'');   //进到重磅项目的时候马上修改我要报名的路径
      $('#project_main').attr('href','heavy_project_model1_index.html?activityId='+activityId+'');   //首页
      $('#project_detail').attr('href','heavy_project_model1_detail.html?activityId='+activityId+'');   //项目详情
      $('#team').attr('href','heavy_project_model1_team.html?activityId='+activityId+'');   //参赛团队
      $('#project_dynamic').attr('href','heavy_project_model1_trends_dynamic.html?activityId='+activityId+'');   //项目动态
      $('.logo a').attr('href','heavy_main_list.html');   //头部logo

      //隐藏我要报名按钮和参赛者列表
      if(activityId == 373 || activityId == 505){
        $('.participator_work').hide();
      }
    }
  }
  getRequest();

  function act_intro(){
    obj.ajax('/project/getActivityDetail',{'activityId':activityId,'activityDetailId':activityDetailId},function(data){
      console.log(data);
      var currActivityDetail = data.dataList;
      $('#h1_detail_title').html(currActivityDetail.title);  //标题
      $('#h4_detail_time').html('发布时间：'+currActivityDetail.createTime.substr(0,16));
      $('#div_detail_content').html(currActivityDetail.content);    //内容通知
    },function(data){});
  }
  act_intro();

  function ajaxCom(){                    //获取项目详情
    obj.ajax('/project/activityDetail',{'activityId':activityId},function(data){
      console.log(data);
      if(data.status == 'ERROR'){
        alert(data.msg);//ID有误
        return;
      }
      var currActivity = data.dataList;

      /** 大的banner图 **/
      $('#banner_center').css("background-image","url("+ Utils.compressByAli(currActivity.bannerUrl, '?x-oss-process=image/resize,h_386') +")");
      $('title').html(currActivity.title);//网页标题
      //自定义标签
      var labelName = currActivity.activityLabelName;
      $('#project_detail').html(labelName.news1);//项目详情
      $('#project_dynamic').html(labelName.newsList1);//项目动态
      $('#team').html(labelName.cpxm);//参赛团队
      $('.DT_detail').html('首页>'+labelName.newsList1);//项目动态
    },function(data){console.log(1);});
  }
  ajaxCom();
});