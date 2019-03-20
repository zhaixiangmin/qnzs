
$(document).ready(function(){
   $('.qs_content:not(:first)').hide();
    $('.question .qs_box .title_item').click(function(event) {
        $(this).addClass('current').siblings('.title_item').removeClass('current');

        var idx = $(this).index();
        $('.question .qs_content').eq(idx).show().siblings('.qs_content').hide();
    });
});