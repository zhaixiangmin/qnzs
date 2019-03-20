//找活动相册

var activityId = "";

function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) { //判断是否有参数
        var strs = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
        strs = strs.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
        activityId = strs[1];
    }
}
getRequest();

function xiangce() {
    $.ajax({
        type: "get",
        url: Qnzs.path + "/activity/commentImg/list?activityId=" + activityId,
        dataType: "JSON",
        success: function(data) {
            if (data.status != 'OK') {
                alert(data.msg);
            }else{
                var data= data.dataList;
                if(data != null && data.length > 0){
                    $.each(data, function(index, item) {
                        $('.hd_xiangce').append('<div class="pic_box"><div class="boxCon"><img src="' + Utils.compressByAli(item.imageUrl, 270, 375) + '" alt="" /></div></div>');
                    });
                }
            }
        }
    });
}

xiangce();
//找活动相册end