var activityId = '';

var pageIndex = 1;
var pageSize = 10;

console.log(activityId);
$(document).ready(function() {

	getRequest();

	enrollAccList();

	$('.morebtn').on('click', function() {
		pageIndex += 1;
		enrollAccList();
	})
})



function enrollAccList() {

	var Sex = {
		"1": '男',
		"2": '女',
		"3": '保密'
	};

	$.ajax({
		type: "get",
		url: Qnzs.path + "/activity/enroll/enrolledAccList",
		data: {
			"activityId": activityId,
			"pageIndex": pageIndex,
			"pageSize": pageSize
		},
		dataType: "JSON",
		success: function(data) {
			var data = data.rows;
			if(data!=null&&data.length>0){
			$.each(data, function(index, item) {
				$('.contentBox').append('<div class="item clearfix"><div class="sex fl">' + Sex[item.gender] + '</div><div class="headImg fl clearfix"><div class="imgDiv fl"><img src="' + item.photoUrl + '"/></div><h3 class="fl color333">' + item.mobile + '</h3></div><span class="chengyuan fr color999">' + item.realname + '</span></div>')
			});
			
			}else{
				$('.contentBox').append('<p style="text-align: center;">加载完了<p>');
				$('.morebtn').hide();
				
				
			}
		}
	});
}



function getRequest() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) { //判断是否有参数
		var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
		//    alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
		activityId = strs[1];
	}
}