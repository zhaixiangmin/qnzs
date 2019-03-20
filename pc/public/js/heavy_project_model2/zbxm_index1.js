
$(document).ready(function(){
  $('.more_btn').click(function(event) {
        $(this).addClass('cur')

    });

  baoming_box();
    
  });

/* 模板一—项目详情页面 */
/* 报名要求 */
   function baoming_box(){
    var num=5;
    var html=''
    for (var i = 1; i <= num; i++) {
        html+='<li class="neirong">'
        html+='<p class="font14 color333 clearfix">'
        html+='<span class="fl number">'+0+i+'</span>'
        html+='<span class="fl">参加过省级或以上号长资格培训班并获得资格证书</span>'
        html+='</p>'
        html+='<div class="font12 color666">2012年9月9日，由腾讯开放平台发起的“应用创新大赛”中首档大型创业真人秀 《腾飞之役·创业季》正式启动。全新的形式一经推出就已经引起了业界的极大关注。在经历了两个半月的筹备后11月29日《腾飞之役》携手深圳财经生活频道正式开始录制节目，栏目中共有60款应用开发者，十余位重量级投资者与企业家担当嘉宾。2013年3月31日正式登上大荧幕，每周日21:20深圳财经生活频道准时播出，腾讯视频同步播放，敬请关注</div>'
        html+='</li>'
    };
    $('.baoming_box').append(html)
   }


  