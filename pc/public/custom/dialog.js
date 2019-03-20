/**
 * Created by licong on 2017/6/28.
 */
;(function ($) {
    $.alert = function (text, title) {
        var $dialog = $('#_dialog');

        // 页面已显示对话框，避免覆盖之前的提示文本
        if($dialog && $dialog.parent('.ui-dialog')) {
            if($dialog.parent('.ui-dialog').css('display') == 'block') {
                return;
            }
        }

        // 没有id为dialog的元素时
        if(!$dialog.length) {
            $('body').append('<div id="_dialog"></div>');
            $dialog = $('#_dialog');
        }

        var $d = $.Deferred();
        $dialog.html(text).dialog({
            modal: true, // 遮罩层
            draggable: false, // 拖动
            open:function(event, ui){ // 取消焦点
                $(this).parent().focus();
            },//取消获取焦点
            title: title || '温馨提示',
            buttons: {
                '确定': function() {
                    $(this).dialog( "close" );
                    $d.resolve();
                }
            }
        });
        return $d;
    };
    $.confirm = function (text, title) {
        var $dialog = $('#_dialog');

        // 页面已显示对话框，避免覆盖之前的提示文本
        if($dialog && $dialog.parent('.ui-dialog')) {
            if($dialog.parent('.ui-dialog').css('display') == 'block') {
                return;
            }
        }

        // 没有id为dialog的元素时
        if(!$dialog.length) {
            $('body').append('<div id="_dialog"></div>');
            $dialog = $('#_dialog');
        }

        var $d = $.Deferred();
        $dialog.html(text).dialog({
            modal: true, // 遮罩层
            draggable: false, // 拖动
            open:function(event, ui){ // 取消焦点
                $(this).parent().focus();
            },//取消获取焦点
            title: title || '温馨提示',
            buttons: [
                {
                    text: '取消',
                    click: function() {
                        $(this).dialog( "close" );
                        $d.reject();
                    }
                },
                {
                    text: '确定',
                    click: function() {
                        $(this).dialog( "close" );
                        $d.resolve();
                    }
                }
            ]
        });
        return $d;
    };
})(jQuery);