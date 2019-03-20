
$(document).ready(function(){
	$('.promptly_btn').on('click',function(){
		if(!$('#inp_Agreement').is(':checked')) {
			$.alert('请选择用户协议');
			return ;
		}

		var title=$('.title_txt').val();
		var enrollStartTime=$('#stop_time').datetimebox('getValue');;
		var enrollEndTime=$('#stop_times').datetimebox('getValue');;
		var startTime=$('#start_time').datetimebox('getValue');;
		var endTime=$('#start_times').datetimebox('getValue');;
		var address=$('#sever_add').val();
		var longitude = $('#longitude_number').val(); //经度
		var latitude = $('#latitude_number').val(); //维度
		var activityMoney=$('#active_money').val();//费用
		var activityNumber=$('#active_people').val();//人数
		var phone=$('#iphonpeo').val();//电话
		var activityTypeId=$('.choose_body_list option:selected').val();
		var signTimes = $(".signTimes input[name='rd']:checked").val(); //获取签退次数
		var extracurricularType=$('.calss_body_list').val();
		var  extracurricularHour=$('#extracurricularHour').val();//学时
		var introduceContent= $('#summernote').summernote('code');//介绍
		var summary = $('.sharing').val(); //活动分享描述
		var text_inprtt = document.getElementsByClassName('text_input'); //获取单行文本
		var arrtext = []; //创建文本数组
		var arrobj; //创建字符串
		for (var i = 0; i < text_inprtt.length; i++) { //遍历获取文本数组
			arrtext.push(text_inprtt[i].value);
			arrobj = arrtext.join(",");
		};
		//alert(imageUrl)

		var flag = true;
		var itemNames = '';
		var itemTypes = '';
		var itemNameArr = new Array();
		var itemTypeArr = new Array();
		$('.itemName').each(function(index, item) {
			var itemName = $(item).val();
			/*if (!itemName) {
					alert("报名信息自定义项名称不能为空");
					flag = false;
					return;
				}*/
			if (itemName && itemName.length > 8) {
				$.alert("报名信息自定义项名称不能大于8个字符");
				flag = false;
				return;
			}
			itemNames += $(item).val() + ',';
			itemNameArr.push($(item).val());
		});
		$('.itemType').each(function(index, item) {
			itemTypes += $(item).val() + ',';
			itemTypeArr.push($(item).val());
		});
		if (itemNameArr && itemNameArr.length > 8) {
			$.alert("报名信息最多只可设置8个自定义项");
			flag = false;
			return;
		}

		if(!imageUrl || imageUrl.length <= 0) {
			$.alert('请您至少上传一张活动海报');
			return;
		}

		if(!sorttitle || sorttitle.length <= 0) {
			$.alert('请输入活动标题');
			return;
		} else if(sorttitle.length > 100) {
			$.alert('活动标题最多可输入100字');
			return;
		}
		
		if(!phone || phone.length <= 0) {
			$.alert('请输入联系电话');
			return;
		}

//		if (!province || province == "请选择省份") {
//			$.alert('请选择区域省');
//			return;
//		}
//		if (!city || city == "请选择地级市") {
//			$.alert('请选择区域市');
//			return;
//		}
//		if (!county || county=="请选择区、县") {
//			$.alert('请选择区域县');
//			return;
//		}

		if(!summary || summary.length <= 0) {
			$.alert('请输入分享描述，该分享描述将在您分享给他人时，出现在分享链接上，以增加活动的点击率。');
			return;
		} else if(summary.length > 500) {
			$.alert('分享描述最多可输入500字');
			return;
		}
		
		if(!signTimes || signTimes < 0 || signTimes > 2) {
			$.alert('请选择参与者可签到次数。');
			return;
		}

		var data={
			'title':title,
			'imageUrl':imageUrl,
			'enrollStartTime':enrollStartTime,
			'enrollEndTime':enrollEndTime,
			'startTime':startTime,
			'endTime':endTime,
			'address':address,
			'activityMoney':activityMoney,
			'activityNumber':activityNumber,
			'activityTypeId':activityTypeId,
			'introduceContent':introduceContent,
			'phone':phone,
			'summary':summary,
			'longitude':longitude,
			'latitude':latitude,
			'signTimes':signTimes,
			'extracurricularTypeId':extracurricularType,
			'extracurricularHour':extracurricularHour,
			'itemNames': itemNames,
			'itemTypes': itemTypes
		};
		
		if (flag == true) {
			$.ajax({
				type:"post",
				url:Qnzs.path+"/activity/offlineActivity/publish",
				data:data,
				dataType: "JSON",
				success:function(data){
					if (data.status == 'OK') {
						//alert(data.msg);
						//return;
						console.log(data);
						var data = data.data;
						$('.showDiv').show();

						$('#qrcode1').empty();
						$('#qrcode1').qrcode({
							width : 200,
							height : 200,
							text: data,
							src:'../../public/img/qnzslogon.jpg'
						});
					} else {
						$.alert(data.msg);
						return;
					}
				}
			});
		}
	})
	
	
	$('.del_rubsh').on('click',function(){
		$('.showDiv').hide();
	})

});

