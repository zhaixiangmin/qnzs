/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    var pathname =  window.location.pathname; // 链接的路径名称 -- > /front/pc/view/find_help/find_help.html(//localhost:63342/front/pc/view/find_help/find_help.html)
    var host = window.location.host; // 主机名
    var isNginx = false; // 是否nginx环境
    var isIndexPage = false; // 是否index页面(网站首页)
    console.log('pathname', pathname);
    console.log('host', host);
    if(host.indexOf('gdqnzs') != -1) { // 检测是否nginx环境
        isNginx = true;
    }

    if(isNginx) { // nginx环境
        if(!pathname) {
            isIndexPage = true; // 当前页面是首页
        }
    }else { // 本地开发环境
        var pathArr = pathname.split('/'); // /front/pc/index.html?_ijt=t48h1o36ira9um9e4krltsoc14 --> ['', 'front', 'pc', 'index.html?_ijt=t48h1o36ira9um9e4krltsoc14']
        console.log('pathArr', pathArr);
        var pathSuffix = pathArr[pathArr.length-1]; // index.html?_ijt=t48h1o36ira9um9e4krltsoc14
        if(pathSuffix.indexOf('index') != -1) {
            isIndexPage = true; // 当前页面是首页
        }
    }
    console.log('isIndexPage', isIndexPage);
    
    // 渲染公共底部栏
    function render() {
        // var pathname =  window.location.pathname; // 链接的路径名称 -- > /front/pc/view/find_help/find_help.html(//localhost:63342/front/pc/view/find_help/find_help.html)
        // console.log('pathname', pathname);

        var html = '';
        html += '<footer>';
        html += '    <ul class="clearfix">';

        for(var i=0; i<tabs.length; i++) {
            var tab = tabs[i];
            // var shortPath = tab.path.replace('../', '').replace(/\/.*$/, ''); // (../index/index.html --> index)
            //
            // if(pathname.indexOf(shortPath) != -1) { // 匹配到路径
            //     html += '        <li class="cur">';
            //     // continue;
            // }else {
            //     html += '        <li>';
            // }

            if(isNginx) { // nginx环境
                if(isIndexPage) { // 当前页是首页
                    if(i == 0) { // 首页选项卡
                        // header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li class="cur">';
                        html += '            <a>';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }else { // 非首页选项卡(view/find_help/find_help.html)
                        // header += '<li><a href="/view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li>';
                        html += '            <a href="/view' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }else { // 当前页非首页
                    if(i == 0) { // 首页选项卡
                        // header += '<li><a href="' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li>';
                        html += '            <a href="' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }else { // 非首页选项卡(/view/find_help/find_help.html)
                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
                        console.log('keyword', keyword);
                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡
                            // header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                            html += '        <li class="cur">';
                            html += '            <a>';
                            html += '                <div class="imgDiv"></div>';
                            html += '                <h6>' + tab.name + '</h6>';
                            html += '            </a>';
                            html += '        </li>';
                            continue;
                        }

                        // 去高亮当前页面选项卡
                        // header += '<li><a href="/view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li>';
                        html += '            <a href="/view' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }
            }else { // 本地开发
                if(isIndexPage) { // 当前页是首页
                    if(i == 0) { // 首页选项卡
                        // header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li class="cur">';
                        html += '            <a>';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }else { // 非首页选项卡(view/find_help/find_help.html)
                        // header += '<li><a href="view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li>';
                        html += '            <a href="view' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }else { // 当前页非首页
                    if(i == 0) { // 首页选项卡 ../../index.html
                        // header += '<li><a href="../..' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li>';
                        html += '            <a href="../..' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }else { // 非首页选项卡(/view/find_help/find_help.html)
                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
                        console.log('keyword', keyword);
                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡
                            // header += '<li><a class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
                            html += '        <li class="cur">';
                            html += '            <a>';
                            html += '                <div class="imgDiv"></div>';
                            html += '                <h6>' + tab.name + '</h6>';
                            html += '            </a>';
                            html += '        </li>';
                            continue;
                        }

                        // 去高亮当前页面选项卡
                        // header += '<li><a href="..' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
                        html += '        <li>';
                        html += '            <a href="..' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }
            }
            
            

            // html += '            <a href="' + tab.path + '">';
            // html += '                <div class="imgDiv"></div>';
            // html += '                <h6>' + tab.name + '</h6>';
            // html += '            </a>';
            // html += '        </li>';
        }
        html += '    </ul>';
        html += '</footer>';

        $('body').append(html); // 渲染公共底部栏
    }

    // 选项卡数组
    var tabs = [
        { name: '首页', path: '/index.html' },
        { name: '找活动', path: '/find_active/hd_zhaohuodong.html' },
        { name: '找问答', path: '/find_consult/find_consult_index.html' },
        { name: '找帮助', path: '/find_help/find_help.html' },
        { name: '我的', path: '/heavy_project/heavy_project_main.html '}
    ];

    render();

});