$(document).ready(function() {
	function getServiceCategory(){
		sendAjax();  //初始化列表
		function sendAjax(data){

			FindConsultApi.getServiceCategory(data).then(function (data) {
				createEle(data.rows);
				//console.log('专家11',data);
			})
		}
		//createEle();
		function createEle(data){
			//var num=3;
			var html='';
			for (var i = 0; i < data.length; i++) {
				// html+='<a href="javascript:getQuestionsByParams();" class="option" lang="'+data.rows[i].caId+'">'+data.rows[i].name+'</a>'

				html+='<li>'
				html+='<a href="find_consult_quesList.html?categoryId='+data[i].caId +'">'
				html+='<img src="../../public/img/zhaowendaMenu0'+(i+1)+'.png" />'
				html+='<h6 class="color000">'+data[i].name+'</h6>'
				html+='</a>'
				html+='</li>'
			};
			$('#category').append(html);
		}
	}
	getServiceCategory()
})


