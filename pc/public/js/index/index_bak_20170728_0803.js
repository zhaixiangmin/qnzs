Qnzs.path=Qnzs.env.dev //api

$(document).ready(function(){
    /*首页的  热门活动展示*/
       var pageIndex=1;//当前页数
		var pageSize=6;//显示条数
		var totalPage;//总页数；
		var total;
		  //获取数据 
    function getData(page){
 
    	 var actStatus= {
        '1': '活动预告',
        '2': '报名中',
        '3': '已满员',
        '4': '报名结束',
        '5': '活动中',
        '6': '活动结束'
       };
    	$.ajax({
    		type:"get",
    		url:Qnzs.path+"/activity/offlineActivity/recommendList",
    		data: {'pageNum':page-1}, 
            dataType:'json', 
             success : function(data){
             
             	$('.hot_acticve').empty();//清空数据
             	total=data.total; //总记录数 
             	pageSize=pageSize; //显示条数
             	pageIndex=page;  //当前条数
             	totalPage=data.total%pageSize;//总页数
             
               var data=data.rows;
              $.each(data,function(index,item){
            		var actiivtyId = item.id;
//          		$('.hot_acticve').append('<li><a href="' + Qnzs.path + '/activity/offlineActivity/detail?activityId=' + actiivtyId + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">'+actStatus[item.actStatus]+'</span><img src="'+item.imageUrl+'" width="400" alt="" /></div><div class="txt"><div class="conTit"><p class="font16 color000">'+item.title+'</p> </div><p class="address color999">'+item.address+'</p><div class="botTxt clearfix"> <p class="fl">'+item.activityTime+'</p> <span class="fr color01">'+item.type+'</span></div></div> </a></li>');
            		$('.hot_acticve').append('<li><a href="../../view/find_active/zhd_xiangqing.html?activityId=' + actiivtyId + '" class="disB bgcWhite"><div class="imgDiv"><span class="img01">'+actStatus[item.actStatus]+'</span><img src="'+item.imageUrl+'" width="400" alt="" /></div><div class="txt"><div class="conTit"><p class="font16 color000">'+item.title+'</p> </div><p class="address color999">'+item.address+'</p><div class="botTxt clearfix"> <p class="fl">'+item.activityTime+'</p> <span class="fr color01">'+item.type+'</span></div></div> </a></li>');
            		
            });
            },
             complete:function(){ //生成分页条 
                getPageBar();
                fun(); 
            },
    	});
    		
    }
    
    //获取分页条 
    function getPageBar(){ 
        //页码大于最大页数 
        if(pageIndex>totalPage) pageIndex=totalPage; 
        //页码小于1 
        if(pageIndex<1) pageIndex=1; 
        pageStr = "<span>共"+total+"条</span><span>"+pageIndex 
        +"/"+totalPage+"</span>"; 
         
        //如果是第一页 
        if(pageIndex==1){ 
            pageStr += "<span>首页</span><span>上一页</span>"; 
        }else{ 
            pageStr += "<span><a href='javascript:void(0)' rel='1'>首页</a></span><span><a href='javascript:void(0)' rel='"+(pageIndex-1)+"'>上一页</a></span>"; 
        } 
         
        //如果是最后页 
        if(pageIndex>=totalPage){ 
            pageStr += "<span>下一页</span><span>尾页</span>"; 
        }else{ 
            pageStr += "<span><a href='javascript:void(0)' rel='"+(parseInt(pageIndex)+1)+"'> 下一页</a></span><span><a href='javascript:void(0)' rel='"+totalPage+"'>尾页</a></span>"; 
        } 
        $("#pagecount").html(pageStr); 
    }
		
	   $(function(){ 
        getData(1);
    });	
			
	  function fun(){
        $("#pagecount span a").on('click',function(){ 
            var rel = $(this).attr("rel"); 
           // alert(rel)
            if(rel){ 
                getData(rel); 
            } 
        });  
    }
	

    /*首页的  热门活动展示  end*/

    /*-------------首页的  人气主办方展示------------------*/
    function indexSponsor(){
    /*    var indexSpon='';
        var indexSpon_num=5;
        var a=0;
        for(var i=0;i<indexSpon_num;i++){
            a+=0.5;
            if(a>5){a=0.5;}
            indexSpon+='<li class="clearfix borderB01 position_r list_li">'
            indexSpon+=' <a href="qnzs_zhd_zhubanfangxiangqing.html">'
            indexSpon+='  <div class="imgDiv">'
            indexSpon+='   <img src="public/img/host0'+(i+1)+'.png"  width="120" alt="" />'
            indexSpon+='  </div>'
            indexSpon+='  <div class="rightTxt">'
            indexSpon+='   <div class="titBox">'
            indexSpon+='    <p class="tit font14 color000">广州市爱心助学工程项目组</p>'
            indexSpon+='   </div>'
            indexSpon+='   <div class="scoreBox clearfix">'
            indexSpon+='    <ol class="clearfix fl"></ol>'
            indexSpon+='    <span class="fl scoreColor01 font14 fenshu"><em>'+a+'</em>分</span>'
            indexSpon+='    <span class="yiping font12 color999">65人已评</span>'
            indexSpon+='   </div>'
            indexSpon+='   <div class="botBox clearfix">'
            indexSpon+='    <span class="left fl color000 font12 guanzhuPeople"><em class="guanzhuNum">1</em>人关注</span>'
            indexSpon+='   </div>'
            indexSpon+='  </div>'
            indexSpon+=' </a>'
            indexSpon+=' <button class="right colorfff disB guanzhu guanzhuBtn position_a">关注</button>'
            indexSpon+=' <button class="right colorfff disB guanzhu guanzhuBtn position_a" style="display:none;">取消关注</button>'
            indexSpon+='</li>'
        }
        $('ul#indexSponsor').append(indexSpon);
        /*添加星星的标签*/
        /*for (var i = 0; i < 5; i++) {
            $('ul#indexSponsor ol').append('<li><span></span></li>')
        };*/
        /*对最后一项进行特殊关怀处理*/
       /* $('ul#indexSponsor>li:last').addClass('noBorderBottom');
        if(indexSpon_num>=5){
            $('ul#indexSponsor>li:last').addClass('last');
        }*/
       
       $.ajax({
        	type:"get",
        	url:Qnzs.path+"/activity/publisher/list",
        	dataType :"JSON",
        	success:function(data){
        		var data=data.rows;
        		
        		$.each(data,function(index,item) {
        		      var coor=item.activityAverageScore;
        		       var corrnum=coor.toFixed(1);
        		       
        		 $('ul#indexSponsor').append('<li class="clearfix borderB01"><div class="imgDiv"> <img src="'+item.photoUrl+'"  width="120" alt="" /></div><div class="rightTxt"><div class="titBox"><p class="tit font14 color000">'+item.name+'</p></div><div class="scoreBox clearfix"><ol class="clearfix fl"><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li></ol> <span class="fl scoreColor01 font14 fenshu"><em>'+corrnum+'</em>分</span><span class="yiping font12 color999">'+item.activityScoreCount+'人已评</span></div><div class="botBox clearfix"> <span class="left fl color000 font12">'+item.answerQuestionCount+'人关注</span><a href="javascript:;" class="right fr colorfff disB attention">关注</a></div></div></li>');
        		});
     
        	}
        }); 
        
    }
    indexSponsor();

    /*-------------首页的  人气主办方展示  end------------------*/
     
     
     
    //首页推键列表 
    
    function  recommendableProjects(){

	    obj.ajax('/project/indexActivityList',{},function(data){
	   	 	console.log(data);
	 	 	createEle(data.dataList);//  传递参数
	   	},function(data){console.log(1);});
	   	
	   	function createEle(data){
	   	    var num=5;
		    var html='';
		    for (var i = 0; i <data.length; i++) {
		    	
		    	html+= '<li class="d_pos'+i+'">'
                html+=       '<div>'
                html+=        '   <div class="clearfix">'
                html+=               '<div class="left fl">'
                html+=                   '<em class="fl color17c0ff">'+data[i].type+'</em>'
                html+=                   '<span class="fl colorfff">'+data[i].title+'</span>'
                html+=               ' </div>'
                html+=                '<div class="right fr">'
                html+=                   '<em class="bgc17c0ff dl colorfff">剩</em>'
                html+=                    '<span class="colorfff dl">'+data[i].voteEndTime+'</span>'
                html+=              ' </div>'
                html+=            '</div>'
                html+=       ' </div>'
                html+=        '<a href="javascript:;">'
                html+=           ' <img src="'+data[i].bannerUrl+'" alt=""/>'
                html+=       '</a>'
                html+=   '</li>'
		    };
	   	  
//	   	    $('.d_img').append(html);
	   	   
	   	}
	   	
    }
    recommendableProjects();
     
     
    /*-----------------------------问答板块-----------------------------*/
            /*热门问答*/
    function hotAsk(){
        var list='';
        for (var i = 0; i < 5; i++) {
            list+='<a href="qnzs_zbz_xiangqing.html" class="itemBox">'
            list+=' <div class="itemCon borderB01 clearfix">'
            list+='  <div class="imgDiv fl">'
            list+='   <img src="public/img/person0'+(i+1)+'.png" />'
            list+='  </div>'
            list+='  <div class="rightTxt">'
            list+='   <h3 class="font16 color2185cf">如何更好的去忘掉一个人？</h3>'
            list+='   <p class="color000">幸福不同于心情和稍纵即逝的情绪。幸福是回顾自己生活时的会心微笑，因为知道会有这样的时刻：孩子们不愿按时睡觉，可是过会儿再去查看</p>'
            list+='   <div class="botBox clearfix">'
            list+='    <div class="left fl">'
            list+='     <span class="span01 borderR01">桃子</span>'
            list+='     <span class="span02">情感婚恋</span>'
            list+='     <span class="span03">2016-09-20</span>'
            list+='    </div>'
            list+='    <span class="right fr color333 pinglun">224</span>'
            list+='   </div>'
            list+='  </div>'
            list+=' </div>'
            list+='</a>'
        }
        $('.ask_and_answer .list01').append(list);

    }
    hotAsk();
        /*精华问答*/
    function hotAsk_2(){
        var list='';
        for (var i = 0; i < 3; i++) {
            list+='<a href="qnzs_zbz_xiangqing.html" class="itemBox">'
            list+=' <div class="itemCon borderB01 clearfix">'
            list+='  <div class="imgDiv fl">'
            list+='   <img src="public/img/person0'+(i+2)+'.png" />'
            list+='  </div>'
            list+='  <div class="rightTxt">'
            list+='   <h3 class="font16 color2185cf">如何更好的去忘掉一个人？</h3>'
            list+='   <p class="color000">幸福不同于心情和稍纵即逝的情绪。幸福是回顾自己生活时的会心微笑，因为知道会有这样的时刻：孩子们不愿按时睡觉，可是过会儿再去查看</p>'
            list+='   <div class="botBox clearfix">'
            list+='    <div class="left fl">'
            list+='     <span class="span01 borderR01">桃子</span>'
            list+='     <span class="span02">情感婚恋</span>'
            list+='     <span class="span03">2016-09-20</span>'
            list+='    </div>'
            list+='    <span class="right fr color333 pinglun">224</span>'
            list+='   </div>'
            list+='  </div>'
            list+=' </div>'
            list+='</a>'
        }
        $('.ask_and_answer .list02').append(list)
    }
    hotAsk_2();

    /*问答板块右边列表 活跃组织*/
    function activeOrg() {
        var list='';
        var num=6;
        for (var i = 0; i < num; i++) {
            list+='<li class="clearfix borderB01">'
            list+=' <a href="qnzs_zzx_wenzuzhixiangqing.html">'
            list+='  <div class="imgDiv">'
            list+='   <img src="public/img/hyzz0'+(i+1)+'.png"  width="120" alt="" />'
            list+='  </div>'
            list+='  <div class="rightTxt">'
            list+='   <div class="titBox">'
            list+='    <p class="tit font14 color000">广州市爱心助学工程项目组</p>'
            list+='   </div>'
            list+='   <p class="middleTxt color666">已解答'+(550+i)+'个问题</p>'
            list+='   <div class="botBox clearfix">'
            list+='    <span class="left fl color000 font12">120人关注</span>'
            list+='    <input type="button" class="right fr colorfff disB guanzhu" value="向TA提问" />'
            list+='   </div>'
            list+='  </div>'
            list+=' </a>'
            list+='</li>'
        };
        $('.ask_and_answer .rightHost .itemBox ul').append(list);
        $('.ask_and_answer .rightHost .itemBox ul>li:last').css('border-bottom', 'none');
        if(num>=6){
            $('.ask_and_answer .rightHost .itemBox ul>li:last').css('padding-bottom', '15px');
        }
    }
    activeOrg();


    /*-----------------------------问答板块  end-----------------------------*/

    /*------------------------推荐专家 start------------------------*/
    function recommendPro(){
        var list='';
        var num=7;
        var proName=['李娟','张三','赵子龙','李四','王五','陈留','不知道']
        for (var i = 0; i < num; i++) {
            list+='<li>'
            list+=' <a href="qnzs_zzx_wenzhuanjiaxiangqing.html">'
            list+='  <div class="imgBox">'
            list+='   <div class="imgDiv">'
            list+='    <img src="public/img/pro0'+(i+1)+'.png" />'
            list+='   </div>'
            list+='  </div>'
            list+='  <h2 class="name color000 font16">'+proName[i]+'</h2>'
            list+='  <p class="touxian color666">国家二级心理咨询师</p>'
            list+='  <button class="colorfff">向TA提问</button>'
            list+=' </a>'
            list+='</li>'
        };
        $('.tuijianzhuanjia .bd ul').append(list);


    }
    recommendPro();
    jQuery(".tuijianzhuanjia .picScroll").slide({
                            mainCell:".bd ul",
                            autoPage:true,
                            effect:"leftLoop",
                            vis:6});

    /*------------------------推荐专家 end------------------------*/

    /*首页 求助版块    求助中*/
    function needHelp(){
        var list='';
        var num=5;
        for (var i = 0; i < num; i++) {
            list+='<a href="qnzs_zbz_xiangqing.html" class="disB itemBox">'
            list+=' <div class="itemCon borderB01 clearfix">'
            list+='  <div class="imgDiv fl">'
            list+='   <img src="public/img/ask0'+(i+1)+'.png"/>'
            list+='  </div>'
            list+='  <div class="rightTxt">'
            list+='   <div class="top clearfix">'
            list+='    <span class="fl colorfff">求助中</span>'
            list+='    <h3 class="color000 font16 fl">《创意之棒——希望之窗》</h3>'
            list+='   </div>'
            list+='   <p class="longTxt color999">幸福不同于心情和稍纵即逝的情绪。幸福是回顾自己生活时的会心微笑，因为知道会有这样的时刻：孩子们不愿按时睡觉，可是过会儿再去查看</p>'
            list+='   <div class="middle color000">'
            list+='    <span class="left borderR01">受理方：广东团省委</span>'
            list+='    <span class="right">求助类型：医疗求助</span>'
            list+='   </div>'
            list+='   <div class="bottom clearfix color000">'
            /*list+='    <span class="span01 fl">108</span>'*/
            list+='    <span class="span02 fl">62</span>'
            list+='    <span class="span03 fl">2016-09-20</span>'
            list+='    <button class="fr colorfff conBgc01">我要帮TA</button>'
            list+='   </div>'
            list+='  </div>'
            list+=' </div>'
            list+='</a>'
        };
        $('.askForHelp .list01').append(list);
    }
    needHelp();

    /*已解决*/
    function needHelp_2(){
        var list='';
        var num=3;
        for (var i = 0; i < num; i++) {
            list+='<a href="qnzs_zbz_xiangqing.html" class="disB itemBox">'
            list+=' <div class="itemCon borderB01 clearfix">'
            list+='  <div class="imgDiv fl">'
            list+='   <img src="public/img/ask02.png"/>'
            list+='  </div>'
            list+='  <div class="rightTxt">'
            list+='   <div class="top clearfix">'
            list+='    <span class="fl colorfff">已解决</span>'
            list+='    <h3 class="color000 font16 fl">《创意之棒——希望之窗》</h3>'
            list+='   </div>'
            list+='   <p class="longTxt color999">幸福不同于心情和稍纵即逝的情绪。幸福是回顾自己生活时的会心微笑，因为知道会有这样的时刻：孩子们不愿按时睡觉，可是过会儿再去查看</p>'
            list+='   <div class="middle color000">'
            list+='    <span class="left borderR01">受理方：广东团省委</span>'
            list+='    <span class="right">求助类型：医疗求助</span>'
            list+='   </div>'
            list+='   <div class="bottom clearfix color000">'
            list+='    <span class="span02 fl">62</span>'
            list+='    <span class="span03 fr">2016-09-20</span>'
            list+='   </div>'
            list+='  </div>'
            list+=' </div>'
            list+='</a>'
        };
        $('.askForHelp .list02').append(list);
    }
    needHelp_2();

    /*爱心组织*/
    function loveOrg(){
        var list='';
        var num=6;
        var img=0;
        for (var i = 0; i < num; i++) {
            img++;
            if(img>3){img=1;}
            list+='<li class="clearfix borderB01">'
            list+=' <a href="qnzs_zbz_zuzhixiangqing.html">'
            list+='  <div class="imgDiv">'
            list+='   <img src="public/img/host0'+img+'.png"  width="120" alt="" />'
            list+='  </div>'
            list+='  <div class="rightTxt">'
            list+='   <div class="titBox">'
            list+='    <p class="tit font14 color000">广州市爱心助学工程项目组</p>'
            list+='   </div>'
            list+='   <div class="scoreBox clearfix">'
            list+='    <ol class="clearfix fl"></ol>'
            list+='    <span class="fl scoreColor01 font14 fenshu"><em>3</em>分</span>'
            list+='    <span class="yiping font12 color999">'+i+'人已评</span>'
            list+='   </div>'
            list+='   <div class="botBox clearfix">'
            list+='    <span class="left fl color000 font12">已受理求助'+(i+100)+'次</span>'
            list+='    <a href="javascript:;" class="right fr color000 disB">'+(i+10)+'人关注</a>'
            list+='   </div>'
            list+='  </div>'
            list+=' </a>'
            list+='</li>'
        };
        $('.askForHelp .rightHost .bd ul').append(list);
        for (var i = 0; i < 5; i++) {
            $('.askForHelp .scoreBox ol').append('<li><span></span></li>')
        };
    }
    loveOrg();

    /*首页 求助版块   end*/
});