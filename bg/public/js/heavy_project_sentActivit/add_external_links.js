/*重磅项目-后台管理-新增*/
$(document).ready(function(){
    // 重磅项目-后台管理-首页*****************************
    
    // 首页-活动类型
    $('#activityType').on("change",function(event){
        var _val = $(this).val();
        if(_val == "其他"){
            $('.moldInp').fadeIn(150);
        }else{
            $('.moldInp').fadeOut(150);
        }
    });
    
    // 添加按钮显示
    function addBtn (obj) {
        if(obj.find('.bgf').length == 0){
            obj.find('.jia').fadeIn(0);
        }else{
            obj.find('.jia').fadeOut(0);
        }
    }
    addBtn($(".project"));
	// ("display",imgLen<8?"block":"none");
	
	//参赛作品板块
	$(".close").click(function(){
	    $(this).addClass('current');
	});
   
   
});

