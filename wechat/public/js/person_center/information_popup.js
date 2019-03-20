$(document).ready(function(){
	var id = Utils.getQueryString('messageId'); // 帮助ID
           //导航切换

	
//根据站内信ID获取站内信
// 	$('#container').data('id', messageId);//获取当前页面ID值
// 	var id = $('#container').data('id');
	FindConsultApi.userMessage({messageId:id}).then(function (data) {
	//if(data.status == 'ok'){
	// 	console.log('回显数据',data)
		$('#title').text(data.dataList.title);
		$('#content').html(data.dataList.content);
	//}
	});
});//文档准备结束
