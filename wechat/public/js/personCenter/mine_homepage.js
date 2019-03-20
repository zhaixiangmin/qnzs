
$(document).ready(function(){
    $('.has_second_menu .tit').click(function(event) {
        if(!$(this).hasClass('cur')){
            $(this).addClass('cur').parent().siblings('.has_second_menu').children('.tit').removeClass('cur');
        }else{
            $(this).removeClass('cur');
        }
    });
});