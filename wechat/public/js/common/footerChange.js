/* 
底部导航切换
*/

$(document).ready(function(){
    $('footer ul li').click(function(event) {
        var liNum = $(this).index()+1;
        $(this).addClass('cur').siblings().removeClass('cur');
        
    });
     

});