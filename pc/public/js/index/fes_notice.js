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
               html += '<div id="notice_box" style="position: fixed; top: 0; width: 100%;height: 100%;z-index: 9999;">';
               html += '    <div style="position: absolute;top: 0;width: 100%;height: 100%;background: #000;opacity: 0.5;"></div>';
               html += '    <div style="margin-top: 15px;position: absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); width: 734px; height: 600px;text-align: right;">';
               html += '        <img src="public/img/fes-notice.png" style="display: inline-block;max-height: 100%; max-width: 100%;" />';
               html += '        <img id="notice_close" src="public/img/fes-close.png" style="position: absolute; top: -15px; right: 8px;height: 30px; cursor: pointer; " />';
               html += '    </div>';
               html += '</div>';
               $('body').append(html); // 渲染春节公告框
           }

           // 春节公告框点击事件
           $('body').on('click', '#notice_close', function () {
               $.cookie('qnzs_fes_notice_flag', 'true', { expires: new Date(str_end), path: '/' });
               $('#notice_box').hide(); // 关闭春节公告框
           });
       }
   }
});