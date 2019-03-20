$(function(){
	
	
	var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	district_qnzs = JSON.parse(district_qnzs);
    console.log(district_qnzs);
	
	/**** pc首页banner *****/
	obj.ajax('/imageManager/findImageByType',{ 'did':440800,'type':0, 'acticey':0},function(data){
		console.log(data);
	    var	html = '';
	    for(var i= 0 ;i<data.dataList.length;i++){
	    	
    	    html += '<li>'
            html +=    '<a href="'+data.dataList[i].url+'" target="_blank">'
            html +=        '<img src="'+data.dataList[i].path+'" />'
            html +=    '</a>'
            html +='</li>'
	    }
//		$('#head-banner ul').append(html);
//			
//	    jQuery(".banBox").slide({
//	        titCell:".hd ul",
//	        mainCell:".bd ul",
//	        effect:"leftLoop",
//	        autoPlay:true,
//	        autoPage:true,
//	        interTime:3000,
//	        delayTime:300,
//	        prevCell:".change.prev",
//	        nextCell:".change.next",
//	        trigger:"mouseover"
//	    });
		
	},function(data){})
	
	
	/****  推荐项目  ****/
	obj.ajax('/project/indexActivityList', {}, function(data) {
			console.log(data);
			createEle(data.dataList); //  传递参数
   }, function(data) {console.log(1);});

		function createEle(data) {
			var num = 5;
			var html = '';
			for (var i = 0; i < data.length; i++) {

				html += '<li class="d_pos' + i + '">'
				html += '<div>'
				html += '   <div class="clearfix">'
				html += '<div class="left fl">'
				html += '<em class="fl color17c0ff">' + data[i].type + '</em>'
				html += '<span class="fl colorfff">' + data[i].title + '</span>'
				html += ' </div>'
				html += '<div class="right fr">'
				html += '<em class="bgc17c0ff dl colorfff">剩</em>'
				html += '<span class="colorfff dl">' + data[i].voteEndTime + '</span>'
				html += ' </div>'
				html += '</div>'
				html += ' </div>'
				html += '<a href="javascript:;">'
				html += ' <img src="' + data[i].bannerUrl + '" alt=""/>'
				html += '</a>'
				html += '</li>'
			};

			//			$('.d_img').append(html);

		}
       
        /****  找活动  ****/
        /****  找帮助  ****/
        /****  重磅项目 ****/
		       

})