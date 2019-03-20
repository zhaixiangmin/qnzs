var noticeId = "";
var backPage = "";

function getRequest() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		noticeId = Utils.getQueryString("noticeId");
//		backPage = Utils.getQueryString("backPage");
//		if (backPage == 2) {//返回管理页
//			console.log(bakePage)
//			$('#backPage').attr('href','notice.html');
//		}else{//返回首页
//			console.log(backPage)
//			$('#backPage').attr('href','../index/welcome.html');
//		}
//		console.log($('#backPage').attr('href'))
	}
}
getRequest();

	function ajaxCom(id){                    //获取项目详情
	   	obj.ajax('/bg/notice/noticeDetail',{'noticeId':id},function(data){
	   		console.log(data);
	   		var notice = data.dataList;
	        $('#title').html(notice.title);
	        $('#createTime').html('发布时间：'+ notice.createTime);
	        $('#createOrg').html('发布者：'+notice.orgName);
	        $('#type').html('公告类型：'+notice.type);
	        $('#content').html(notice.content);
   	    	$('#fileUrl').html('相关附件：无');
	        
	        var tempFileUrl = notice.fileUrl;
       		if(tempFileUrl.length > 0){
       			var index = tempFileUrl.indexOf('_');
				var fileHtml = tempFileUrl.substr(index+4);
   	    		$('#fileUrl').html('相关附件：'+fileHtml+'<a href="'+ tempFileUrl +'">&nbsp;&nbsp;&nbsp;&nbsp;下载</a>');
       		}
       		
       		if(notice.prevId > 0){
        		$("#prev").attr('onclick','ajaxCom('+notice.prevId+')');
       			$('#prev').html('上一篇');
       		}else{
        		$("#prev").removeAttr('onclick');
       			$('#prev').html('已经是第一篇了');
       		}
       		if(notice.nextId > 0){
        		$("#next").attr('onclick','ajaxCom('+notice.nextId+')');
       			$('#next').html('下一篇');
       		}else{
        		$("#next").removeAttr('onclick');
       			$('#next').html('已经是最后一篇了');
       		}
	   	},function(data){console.log(1);});
    }
    ajaxCom(noticeId);

