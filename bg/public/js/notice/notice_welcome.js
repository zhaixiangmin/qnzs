var pageNo = 1;
var pageSize = 10;

function getDatalist() {
	obj.ajax('/bg/notice/noticeList',{'keyWord': $('#keyWord').val(),'type': $('#type').val(),'pageNo':pageNo,'pageSize':pageSize},function(data){
	   		var noticeList = data.rows;
	   		$('#list_table').html('<tr><th>标题</th><th>发布者</th><th>发布时间</th></tr>');
		    var html=''
		    for (var i = 0; i < noticeList.length; i++) {
				if (noticeList[i].isTop) {
			     	html+='<tr class="top">'
				} else{
			     	html+='<tr>'
				}
	             html+='<td><a href="../notice/notice_detail.html?noticeId=' + noticeList[i].id+ '">【' + noticeList[i].type+ '】' + noticeList[i].title+ '</a></td>'
//				if (i == 1) {
//	             html+='<span class="new">&nbsp;&nbsp;New!</span>'
//				}
	             html+='<td>' + noticeList[i].orgName + '</td>'
	             html+='<td>' + noticeList[i].createTime + '</td>'
	         	 html+='</tr>'
		    };
		    $('#list_table').append(html);
		    
		    getPageBar(pageNo,parseInt(data.total)/parseInt(pageSize));
	   	},function(data){console.log(1);});
	}
getDatalist();

function getPageBar(curPageNo,totalPage){
	var html = '';
	if(curPageNo > 1){
		html += '<span class="prev" onclick="chagePage(-1)">&lt;上一页</span>'
	}else{
		html += '<span class="prev cloccc">&lt;上一页</span>'
	}
	
	if (totalPage > 1) {
		for (var i = 1; i <= totalPage; i++) {
			if(pageNo == i){
				html += '<em id="em_1" class="num cur" onclick="chagePage('+ i +')">'+ i +'</em>'
			}else{
				html += '<em id="em_'+ i +'" class="num" onclick="chagePage('+ i +')">'+ i +'</em>'
			}
		}
	} else{
			html += '<em class="num cur">1</em>'
	}
	
    if (curPageNo <  totalPage) {
		html += '<span class="next" onclick="chagePage(0)">下一页&gt;</span>'
    }else{
		html += '<span class="next cloccc">下一页&gt;</span>'
    }
    $('.page_box').html(html);
}

//翻页
function chagePage(num){
	if(num == -1){//上一页
		 pageNo = pageNo - 1;
	}
	if(num == 0){//下一页
		 pageNo = pageNo + 1;
	}
	if (num > 0) {//指定页
		pageNo = num;
	}
	getDatalist();
}

//数据过滤
function searchNotice() {
	     pageNo = 1 ;
	     getDatalist();
	};

/*清空查询*/
$('#clearBtn').click(function(event) {
	$('#keyWord').val('');
});