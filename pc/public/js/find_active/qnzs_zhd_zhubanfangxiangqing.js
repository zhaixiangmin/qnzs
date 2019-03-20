	var oid = Utils.getQueryString('oid'); // 组织ID
	
	
	//组织详情
obj.ajax('/pc/help/findOrganizationById',{'oid':oid},function(data){
	console.log(data);
	$('#address').html(data.rows.address)   //活动地址
	$('#attentionCount_1').html(data.rows.attentionCount)  //关注
	$('#fullName').html(data.rows.fullName)  //全称
	$('#name').html(data.rows.name)  //简称
	$('#telephone').html(data.rows.telephone)  //电话
	$('#answerQuestionCount').html(data.rows.activityScoreCount+'已评')  //多少人以评
	
    $('#activityAverageScore').html(data.rows.activityAverageScore.toFixed(1))  //多少分
   
     
     $('#imgBox_img').attr('src',data.rows.photoUrl);
     
     
        starHtmlAverage = star_generate(data.rows.activityAverageScore.toFixed(1)); // 平均分星星图标
       
        $('#averageScoreIcon').html(starHtmlAverage); // 评分星星图标
})

$(document).ready(function(){
	var oid = Utils.getQueryString('oid'); // 组织ID
	
    /*图片查看*/
    $('.imgList .item:first').addClass('cur');
    $('.imgBox .prev').click(function(event) {
        if(!$('.imgList .item:first').hasClass('cur')){
            $('.imgList .cur').fadeOut(300).removeClass('cur').prev().fadeIn(300).addClass('cur');
            
        }
    });
    $('.imgBox .next').click(function(event) {
        if(!$('.imgList .item:last').hasClass('cur')){
            $('.imgList .cur').fadeOut(300).removeClass('cur').next().fadeIn(300).addClass('cur');
            
        }
    });

    $('.answered .listBox:even').addClass('marginR30');
        
        $('.answered .listBox').each(function(index, el) {
            var pHei = $(el).find('.rightTxt p').height();
            var pLinage = pHei/20;
            if(pLinage>=2){
                $(el).find('.rightTxt p').addClass('twoMarginTopBot');
            }else{
                $(el).find('.rightTxt p').addClass('oneMarginTopBot');
            }
        });


    /*评分列表 以及 主办方详情跳转到的评分列表页面的js*/
    
   
//  for (var i = 0; i < 5; i++) {
//      $('.scoreBox .score_list').append('<li><span></span></li>')
//  };
//
//
//  $('.score_show_box .con_item:last').css('margin-bottom', '0');
//  $('.scoreBox.position_r').mouseenter(function(event) {
//      $('.score_show_box').fadeIn(200);
//  }).mouseleave(function(event) {
//      $('.score_show_box').fadeOut(200);
//  });

    /*插入页码*/
    

    /*标题点击切换*/
    $('#list_big_box .list_box:not(:first)').hide();
    $('#list_big_box .title').click(function(event) {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#list_big_box .list_box').eq($(this).index()).show().siblings('.list_box').hide();
    });
   
});



var Findcativit = {};
 Findcativit.getPingfenList= function(data) {
	return Qnzs.ApiProxy('/organizationMark/list', data, '获取全部',1);   //获取全部
};

Findcativit.getlistByType= function(data) {
	return Qnzs.ApiProxy('/organizationMark/listByType', data, '获取全部',1);
};

Findcativit.getOffLineServicePageByOid= function(data) {
	return Qnzs.ApiProxy('/applicationManage/getOffLineServicePageByOid', data, '获取全部',1);
};




//全部 
all1();  //初始化列表
function all1(){
	
		//渲染列表
	function helping(data) {
		//var text = '无内容';
		console.log(data);
	
//		return ;
		var html ='';
		for(var i=0; i < data.length; i++) {
			//var item = helpList[i];
			var item = data[i];
		

			//var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
			var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
			// var askContent = html.item.askContent
			html+='<li class="item">'
			if(item.type==2){   //2是找活动
				html+=' <a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.objectId + '" class="disB item_con clearfix">'
			}
			if(item.type==1){
                html+=' <a href="../../view/find_help/detail.html?id='+item.objectId+'" class="disB item_con clearfix">'
			}
			
			if(item.type!=1&&item.type !=2){
				
                html+=' <a href="#" class="disB item_con clearfix">'
				
			}
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+item.markAccPhoto+'" class="pic" />'
            html+='  </div>'
            html+='  <div class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.markAccName+'</h1>'
            html+='    <span class="fr color666">'+item.markTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'
            
			var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            
            
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+item.score+'</em>分</span>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.remark+'</p>'
            html+='   <p class="color666">主办活动：'+item.title+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
		}
		return html;
		// $('#quesList').append(list);
		// $('.pageBoxList #quesList').append(list);
	}
	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
	//		pageFun:function(i){
	//			var pageHtml = '<li class="pageNum">'+i+'</li>';
	//			return pageHtml;
	//		},
			apiProxy: Findcativit.getPingfenList, /*接口函数*/
			data: data,
			listFun: helping, /*数据列表函数 -- 返回html字符串*/
			arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
	
	var data1 = {
		'orgId':oid,
		'pageIndex':1,
		'pageSize':20,
	};
	
	pageCheck('.all_list_box', '.all_list',data1);

}

//平分列表 -找活动
function all2(){
	
		//渲染列表
	function helping(data) {
		//var text = '无内容';
		console.log(data);
		
		var html ='';
		for(var i=0; i < data.length; i++) {
			//var item = helpList[i];
			var item = data[i];
			var score_ico='';
			//var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
			var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
			// var askContent = html.item.askContent
			html+='<li class="item">'
            html+=' <a href="../../view/find_active/zhd_xiangqing.html?activityId=' + item.objectId + '" class="disB item_con clearfix">'
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+item.markAccPhoto+'" class="pic" />'
            html+='  </div>'
            html+='  <div class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.markAccName+'</h1>'
            html+='    <span class="fr color666">'+item.markTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'
            
             	var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+item.score+'</em>分</span>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.remark+'</p>'
            html+='   <p class="color666">主办活动：'+item.title+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
		}
		return html;
		// $('#quesList').append(list);
		// $('.pageBoxList #quesList').append(list);
	}
	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
	//		pageFun:function(i){
	//			var pageHtml = '<li class="pageNum">'+i+'</li>';
	//			return pageHtml;
	//		},
			apiProxy: Findcativit.getlistByType, /*接口函数*/
			data: data,
			listFun: helping, /*数据列表函数 -- 返回html字符串*/
			arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
	
	var data2 = {
		'orgId':oid,
		'pageIndex':1,
		'pageSize':20,
		'type':2
	};
	
	pageCheck('.zhuban_list_box', '.zhuban_list',data2);
}

//平分列表  -找帮助
function all3(){
	
		//渲染列表
	function helping(data) {
		//var text = '无内容';
		console.log(data);
		
		var html ='';
		for(var i=0; i < data.length; i++) {
			//var item = helpList[i];
			var item = data[i];
			//var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
			var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
			// var askContent = html.item.askContent
			html+='<li class="item">'
            html+=' <a href="../../view/find_help/detail.html?id='+item.objectId+'" class="disB item_con clearfix">'
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+item.markAccPhoto+'" class="pic" />'
            html+='  </div>'
            html+='  <div class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.markAccName+'</h1>'
            html+='    <span class="fr color666">'+item.markTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'
            
            var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='    <span class="fl scoreColor01 font14 fenshu"><em>'+item.score+'</em>分</span>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.remark+'</p>'
            html+='   <p class="color666">主办活动：'+item.title+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
		}
		return html;
		// $('#quesList').append(list);
		// $('.pageBoxList #quesList').append(list);
	}
	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
	//		pageFun:function(i){
	//			var pageHtml = '<li class="pageNum">'+i+'</li>';
	//			return pageHtml;
	//		},
			apiProxy: Findcativit.getlistByType, /*接口函数*/
			data: data,
			listFun: helping, /*数据列表函数 -- 返回html字符串*/
			arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
	
	var data3 = {
		'orgId':oid,
		'pageIndex':1,
		'pageSize':20,
		'type':1
	};
	
	pageCheck('.done_list_box', '.done_list',data3);
}


//平分列表  -线下服务
function all4(){

		//渲染列表
	function helping(data) {
		//var text = '无内容';
		console.log(data);
		
		var html ='';
		for(var i=0; i < data.length; i++) {
			//var item = helpList[i];
			var item = data[i];
			//var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
			var imgUrl = item.photourl ? item.photourl : '../../public/img/default_avator.png';
			// var askContent = html.item.askContent
			html+='<li class="item">'
            html+=' <a href="javascript:;" class="disB item_con clearfix">'
            html+='  <div class="imgBox fl">'
            html+='   <img src="'+item.markAccPhoto+'" class="pic" />'
            html+='  </div>'
            html+='  <div class="rightBox clearfix">'
            html+='   <div class="clearfix top_txt">'
            html+='    <h1 class="font14 color2185cf fl">'+item.title+'</h1>'
            html+='    <span class="fr color666">'+item.markTime+'</span>'
            html+='   </div>'
            html+='   <div class="scoreBox clearfix">'
           var score_ico =star_generate(item.score.toFixed(1)); // 平均分星星图标
            html+='    <ol class="clearfix fl score_list common_score">'+score_ico+'</ol>'
            html+='   </div>'
            html+='   <p class="color000" style="margin-bottom:20px;">'+item.remark+'</p>'
            html+='   <p class="color666">主办活动：'+item.markAccName+'</p>'
            html+='  </div>'
            html+=' </a>'
            html+='</li>'
		}
		return html;
		// $('#quesList').append(list);
		// $('.pageBoxList #quesList').append(list);
	}
	function pageCheck(parentCell, contentCell, data) {
		$(parentCell).pageFun({
			contentCell: contentCell, /*包裹数据列表的父容器*/
			maxPage:6,/*显示页码框个数*/
	//		pageFun:function(i){
	//			var pageHtml = '<li class="pageNum">'+i+'</li>';
	//			return pageHtml;
	//		},
			apiProxy: Findcativit.getOffLineServicePageByOid, /*接口函数*/
			data: data,
			listFun: helping, /*数据列表函数 -- 返回html字符串*/
			arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
		});
	}
	
	var data4= {
		'oid':oid,
		'pageNo':5,  //页码
		'pageSize':20 //每页最大记录数
		
	};
	
	pageCheck('.xianxia_list_box', '.xianxia_list',data4);
}

//关注
$('.btn_care').click(function(){
	
	obj.ajax('/organizationAttention/followOrCancel',{'orgId': oid},function(data){
		console.log(data);
	   if(data.status == 'OK'){
	   	  $('.btn_care').text('关注');
	   	  
	   	  if(data.msg.indexOf('取消') ==-1){
	   	  	
	   	  	$('.btn_care').html('关注');
	   	  	alert(data.msg);
	   	  }else{
	   	  	alert(data.msg);
	   	  	$('.btn_care').html('取消关注');
	   	  }
	   }else{
	   	 $('.btn_care').html('取消关注');
	   	
	   }
	   
	   
	})
})




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