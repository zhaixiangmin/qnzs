//var base ="//192.168.100.14:8080/qnzs/activity";  //设置的url固定路径的路径
//var base ="//192.168.100.14:8080/qnzs";//设置服务类别管理接口路径
var base ="//api.12355.net";
//var base ="//169.168.200.19:8080/qnzs"
var obj = {


	ajax: function (url, data, sucs, failure) {

		$.ajax({
			type: "post",
			url: base + url,
			dataType: 'json',
			data: data,
			xhrFields: {
				withCredentials: true
			},
			success: function (data) {
                        sucs(data);
				console.log(data);
				

			},
			error: function (data) {

			}

		});

	},
	
	 chatsend:function(url , data , sucs ,failure){
	 	$.ajax({
	 		type:"post",
	 		url:base+url,
	 		dataType:'text',
	 		data:data,
	 		 xhrFields: {
	          withCredentials: true
	       	},
	 		success:function(data){
	 			
	 		 console.log(data);	
	 			 sucs(data);
	 		},
	 		error:function(data){
	 			
	 		}
	 	
	 	});
	 	
	 }

	
}


//服务类别管理
var obj_ServiceCategory = {

	ajax: function (url, data, sucs, failure) {

		$.ajax({
			type: "post",
			url: base + url,
			dataType: 'json',
			data: data,
			success: function (data) {

				console.log(data);
				sucs(data);

			},
			error: function (data) {

			}

		});
	}
}
