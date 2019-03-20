/**
 * Created by licong on 2018/11/26.
 */
;(function ($) {
    $.fn.myUploader = function () {
        var idName = $(this).attr('id'); // 父容器类名字符串

        // 检测是否已经安装flash，检测flash的版本
        var flashVersion = (function () {
            var version;

            try {
                version = navigator.plugins['Shockwave Flash'];
                version = version.description;
            }catch(ex) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
                }catch(ex2) {
                    version = '0.0';
                }
            }
            version = version.match(/\d+/g);
            return parseFloat(version[0] + '.' + version[1], 10);
        })();

        // 针对是否已经安装flash，做一些处理
        if(!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {

            // flash 安装了但是版本过低
            if(flashVersion) {
                (function (container) {
                    window['expressinstallcallback'] = function (state) {
                        switch(state) {
                            case 'Download.Cancelled':
                                $.alert('您取消了更新！');
                                break;
                            case 'Download.Failed':
                                $.alert('安装失败！');
                                break;
                            default:
                                $.alert('安装已成功，请刷新！');
                                break;
                        }
                        delete window['expressinstallcallback'];
                    };

                    var swf = '../../public/js/image-upload/expressInstall.swf';

                    var html = '<object type="application/x-shockwave-flash" data=' + swf + '"';

                    if(WebUploader.browser.ie) {
                        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
                    }

                    html += 'width="100%" height="100%" style="outline:0">' +
                        '<param name="movie" value="' + swf + '" />' +
                        '<param name="wmode" value="transparent" />' +
                        '<param name="allowscriptaccess" value="always" />' +
                        '</object>';

                    container.html(html);

                })($uploader_custom_control);
            }else { // 压根就没有安装
                $uploader_custom_control.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
            }

        }else if(!WebUploader.Uploader.support()) {
            $.alert('Web Uploader 不支持您的浏览器！');
            return;
        }

        var uploader = WebUploader.create({
            auto: true, // 不需要手动调用上传，有文件选择即开始上传
            pick: { // 指定选择文件的按钮容器，不指定则不创建按钮
                id: '#' + idName,
                label: ''
            },
            swf: '../../public/vendor/webuploader/Uploader.swf',
            server: Qnzs.path + '/file_upload', // 服务器路径
            disableGlobalDnd: true, // 是否禁掉整个页面的拖拽功能，如果不禁用，文件拖进来的时候会默认被浏览器打开
            // fileNumLimit: 1, // 验证文件总数量, 超出则不允许加入队列
            // fileSingleSizeLimit: 5 * 1024 * 1024, // 验证单个文件大小是否超出限制, 超出则不允许加入队列
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,png,bmp',
                mimeTypes: 'image/*'
            } // 允许上传文件类型
        });

        // 拖拽时不接受 js, txt 文件。
        uploader.on('dndAccept', function (items) {
            var denied = false;
            var len = items.length;
            // 修改js类型
            var unAllowed = 'text/plain;application/javascript';

            for(var i= 0; i<len; i++) {
                // ~(-1) = 0, ~(0) = -1, ~(1) = -2
                if(~unAllowed.indexOf(items[i].type)) {
                    denied = true;
                    break;
                }
            }

            return !denied;
        });

        // 文件资源浏览器打开事件
        uploader.on('dialogOpen', function () {
            console.log('dialogOpen');
        });

        // 当文件被加入队列以后触发
        uploader.onFileQueued = function (file) {
            console.log('onFileQueued file', file);
            // 加载图标
            var html = '';
            var html_icon = '../../public/img/loading.gif'; // 加载图标
            if(judgeIndex()) { // 首页
                html_icon = 'public/img/loading.gif';
            }
            html += '<div class="loading_global" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: rgba(0, 0, 0, 0.1); z-index: 99999;">';
            html += '    <div class="txt" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0.5rem; width: 1rem; height: 1rem; font-size: 0.48rem; background: rgba(0, 0, 0, 0.5) url(' + html_icon + ') no-repeat center; background-size: 60%;"></div>';
            html += '</div>';
            if($('.loading_global').length > 0) {
                $('.loading_global').show();
            }else {
                $('body').append(html);
            }
        };

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            console.log('uploadProgress file', file);
            console.log('uploadProgress percentage', percentage);
        });

        // 上传成功
        uploader.on('uploadSuccess', function(file, result) {
            console.log('uploadSuccess file', file);
            if(result.error == 1) {
                $.alert(file.name + ' 上传失败，原因：' + result.message).then(function () {
                    uploader.removeFile(file); // 触发 onFileDequeued 事件
                });
                return;
            }

            $('#' + idName).find('img').attr('src', result.url); // 渲染图片到指定容器
            uploader.reset(); // 重置uploader目前只重置了队列
            $('.loading_global').hide(); // 隐藏 加载中
        });

        // 失败处理
        uploader.on('uploadError', function(file, reason) {
            console.log('uploadError file', file);
            $.alert(file.name + ' 上传出错');
            uploader.reset(); // 重置uploader目前只重置了队列
            $('.loading_global').hide(); // 隐藏 加载中
        });

        // 当validate不通过时，会以派送错误事件的形式通知调用者。
        uploader.onError = function (code) {
            console.log('onError code', code);
            $.alert('错误：' + code);
            uploader.reset(); // 重置uploader目前只重置了队列
            $('.loading_global').hide(); // 隐藏 加载中
        };

        // 监听上传插件的所有事件
        uploader.on('all', function (type) {
            console.log('all type', type);
        });
    }
})(jQuery);