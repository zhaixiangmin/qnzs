/**
 * Created by Administrator on 2017/6/28.
 */
;(function ($) {
    $.alert = function (text, title) {
        var $d = $.Deferred();

        // 页面已显示对话框，避免覆盖之前的提示文本
        var $dialog = $('.messager-window');
        if($dialog && $dialog.length > 0) { // 有弹出框
            if($dialog.find('.messager-button .l-btn-left').length == 1) { // 有警告框(不是确认框)
                return $d;
            }
        }


        title = title || '温馨提示';
        $.messager.alert(title, text, 'info', function () {
            $d.resolve();
        });

        return $d;
    };
    $.confirm = function (text, title) {
        var $d = $.Deferred();

        // 页面已显示对话框，避免覆盖之前的提示文本
        var $dialog = $('.messager-window');
        if($dialog && $dialog.length > 0) {
            if($dialog.find('.messager-button .l-btn-left').length == 2) { // 有确认框(不是警告框)
                return $d;
            }
        }

        if ($.messager){
            $.messager.defaults.ok = '取消';
            $.messager.defaults.cancel = '确定';
        }


        title = title || '温馨提示';
        $.messager.confirm(title, text, function (r) {
            // 恢复消息对话框的按钮顺序
            if ($.messager){
                $.messager.defaults.ok = '确定';
                $.messager.defaults.cancel = '取消';
            }

            if(r) { // 取消
                $d.reject();
                return;
            }
            $d.resolve();
        });
        return $d;
    };
})(jQuery);