$(function () {
   if($.cookie) {
       var html = '';
       var ms_now = new Date().getTime(); // 当前毫秒数
       var str_start = '2019-02-02 00:00:00'; // 公告开始字符串
       var str_end = '2019-02-10 23:59:59'; // 公告结束字符串
       var ms_start = new Date(str_start).getTime(); // 公告开始毫秒数
       var ms_end = new Date(str_end).getTime(); // 公告结束毫秒数
       if(ms_now >= ms_start && ms_now <= ms_end) { // 公告期间
           if(!$.cookie('qnzs_fes_notice_flag')) { // 未曾弹出公告
               html += '<div>各位尊敬的青年之声用户：</div>';
               html += '<div style="text-indent: 2em;">根据国务院办公厅《关于2019年部分节假日安排的通知》，结合工作实际，2019年春节放假期间，客服工作有如下调整：</div>';
               html += '<div style="text-indent: 2em;">（1）在线客服将于2019年2月3日（周日，廿九）至2019年2月10日（周日，初六）服务暂停，2月11日（周一，初七）恢复服务。</div>';
               html += '<div style="text-indent: 2em;">（2）客服热线将于2019年2月4日（周一，除夕）至2019年2月8日（周五，初四）热线服务暂停，2月9日（周日，初五）恢复服务。</div>';
               html += '<div style="text-indent: 2em;">服务暂停期间如遇问题，可发邮件至客服邮箱 kf@izyz.org，  节后统一安排处理。</div>';
               html += '<div style="text-indent: 2em;">感谢您的理解与配合！</div>';
               html += '<div style="text-indent: 2em;">祝您春节快乐 阖家安康!</div>';
               $.alert(html).then(function () {
                   $.cookie('qnzs_fes_notice_flag', 'true', { expires: new Date(str_end), path: '/' });
               });
           }
       }
   }
});