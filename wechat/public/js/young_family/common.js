/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
//	  var bigDataUrl ="//183.63.252.158:8080";
// var ctx ='//127.0.0.1:8080/qnzs/trunk/front/wechat/index.html';   //测试

   var bigDataUrl ="https://www.izyz.org.cn";//正式
   var ctx ='//www.12355.net/wechat/index.html';  //正式

	  var dynamicLoading = {
		    js: function(path){
				if(!path || path.length === 0){
					throw new Error('argument "path" is required !');
				}
				var head = document.getElementsByTagName('head')[0];
		        var script = document.createElement('script');
		        script.src = path+"/browser/0110/crossdomain.js";
		        script.type = 'text/javascript';
		        head.appendChild(script);
		    }
		}
		
		dynamicLoading.js(bigDataUrl);
	
		getToken();
	
	
});

 function getToken(){
 	
 	var localAccessToken = $.cookie('__accessToken'); //获取本地accessToken
	      console.log(localAccessToken)
	      //alert(localAccessToken);
		  if(!localAccessToken){//在一号通返回__accessToken之前循环调用该方法，直到返回
		  	
			var time= setTimeout("getToken()",100);return;
		  }else{
		   
			//  window.location.href = ctx + '/bd/grant?number='+random;
			 getAccessTokenAndLogin();
			
			  clearInterval(time);
		  }
 	
 }
function getAccessTokenAndLogin(random){	
	console.log($.cookie('__accessToken'));
	obj.ajax('/pc/bigData/login',{'accessToken':$.cookie('__accessToken')},function(data){ 
	
		console.log(data);
		if(data.msg){
			alert(data.msg);
		};
	  });  //一号通的接入
	
	
    var pathname =  window.location.pathname; // 链接的路径名称 -- > /front/pc/view/find_help/find_help.html(//localhost:63342/front/pc/view/find_help/find_help.html)
    var host = window.location.host; // 主机名
    var isNginx = false; // 是否nginx环境
    var isIndexPage = false; // 是否index页面(网站首页)
    console.log('pathname', pathname);
    console.log('host', host);
    var s=host.split('.'); 
//  window.location.href = s+'.wechat/index.html';
    console.log(host.split('.'));

    var district = {
        sitenavOrgId: 440000, // 区域ID
        sitenavOrgName: '广东' // 区域名称
    };
    var website_test = 'gdqnzs'; // 域名(测试)
    var website = '12355'; // 域名(正式)
    // if(host.indexOf('gdqnzs') != -1) { // 检测是否nginx环境
    if(host.indexOf(website) != -1 || host.indexOf(website_test) != -1) { // 检测是否nginx环境
        isNginx = true;
    }

    if(isNginx) { // nginx环境
        if(!pathname || pathname == '/' || pathname == '/wechat' || pathname == '/wechat/' || pathname == '/wechat/index.html') {
            isIndexPage = true; // 当前页面是首页
        }
    }else { // 本地开发环境
        var pathArr = pathname.split('/'); // /front/wechat/index.html?_ijt=t48h1o36ira9um9e4krltsoc14 --> ['', 'front', 'wechat', 'index.html?_ijt=t48h1o36ira9um9e4krltsoc14']
        console.log('pathArr', pathArr);
        var pathSuffix = pathArr[pathArr.length-1]; // index.html?_ijt=t48h1o36ira9um9e4krltsoc14
        var pathSuffix2 = pathArr[pathArr.length-2]; // wechat
        if(pathSuffix == 'index.html' && pathSuffix2 == 'wechat' || pathname == '/'|| pathname == '/index.html') { // pathname == '/'|| pathname == '/index.html'(iis发布)
            isIndexPage = true; // 当前页面是首页
        }
    }
    
    
    /********** 存储cookit **************/
	var s = window.location.href;
	var size ='';
//	var h = window.location.href.split('//');
	var h = s.split('//');
    if(h.length ==1){
       size= s.split('.')[0].toLocaleUpperCase();
    	console.log(s);
    }else{
    	
       size = h[1].split('.')[0].toLocaleUpperCase();
       console.log(s)
    }
    if(size!='WWW'){
	    $.ajax({
	    	type:"post",
	    	url:base+"/common/district/getDistrictIdBySubDomains",
	    	data:{'subDomains':size },
	    	success:function(data){
	    		console.log(data);
	    		
	    		$('.address_box .address').html(data.districtName)
	    		
	    		/***** 存入到cookie  *******/
	    		var district_qnzs = {
		            sitenavOrgId: data.data.districtId, // 区域ID
		            sitenavOrgName: data.data.districtName // 区域名称
		        };
		        district_qnzs = JSON.stringify(district_qnzs);
		        $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
		        console.log($.cookie('district_qnzs'))
				
	    	}
	    });
    	
    }
	
	/********** 存储cookit end **************/
  
  
  
    
    
    
    // 渲染公共底部栏
    function render() {
        // var pathname =  window.location.pathname; // 链接的路径名称 -- > /front/pc/view/find_help/find_help.html(//localhost:63342/front/pc/view/find_help/find_help.html)
        // console.log('pathname', pathname);

        var html = '';
        html += '<footer style="display:none;">';
        html += '    <ul class="clearfix">';

        for(var i=0; i<tabs.length; i++) {
            var tab = tabs[i];

            if(isNginx) { // nginx环境
                if(isIndexPage) { // 当前页是首页
                    if(i == 0) { // 首页选项卡
                        html += '        <li class="cur">';
                        html += '            <a>';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }else { // 非首页选项卡(view/find_help/find_help.html)
                        html += '        <li>';
                        html += '            <a href="/wechat/view' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }else { // 当前页非首页
                    if(i == 0) { // 首页选项卡
                        html += '        <li>';
                        html += '            <a href="/wechat' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }else { // 非首页选项卡(/view/find_help/find_help.html)
                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
                        console.log('keyword', keyword);
                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡

                            html += '        <li class="cur">';
                            html += '            <a href="/wechat/view' + tab.path + '">';
                            html += '                <div class="imgDiv"></div>';
                            html += '                <h6>' + tab.name + '</h6>';
                            html += '            </a>';
                            html += '        </li>';
                            continue;
                        }

                        // 去高亮当前页面选项卡
                        html += '        <li>';
                        html += '            <a href="/wechat/view' + tab.path + '">';
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
                        html += '        <li>';
                        html += '            <a href="view' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }else { // 当前页非首页
                    if(i == 0) { // 首页选项卡 ../../index.html
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
                            html += '        <li class="cur">';
                            html += '            <a href="..' + tab.path + '">';
                            html += '                <div class="imgDiv"></div>';
                            html += '                <h6>' + tab.name + '</h6>';
                            html += '            </a>';
                            html += '        </li>';
                            continue;
                        }

                        // 去高亮当前页面选项卡
                        html += '        <li>';
                        html += '            <a href="..' + tab.path + '">';
                        html += '                <div class="imgDiv"></div>';
                        html += '                <h6>' + tab.name + '</h6>';
                        html += '            </a>';
                        html += '        </li>';
                    }
                }
            }

        }
        html += '    </ul>';
        html += '</footer>';


        // 站长统计
        var vendor = '';
        vendor += '<div style="display:none">';
        vendor += '    <script src="https://s95.cnzz.com/stat.php?id=1258031328&web_id=1258031328" language="JavaScript"></script>';
        vendor += '</div>';

        $('body').append(html); // 渲染公共底部栏
        $('body').append(vendor); // 插入站长统计
    }

    // 选项卡数组
    var tabs = [
        { name: '首页', path: '/index.html' },
        { name: '找活动', path: '/find_active/hd_zhaohuodong.html' },
        { name: '找咨询', path: '/find_consult/find_consult_index.html' },
        { name: '找帮助', path: '/find_help/find_help.html' },
        { name: '我的', path: '/person_center/person_center.html'}
        // { name: '我的', path: '/logoin/login.html'}
        // { name: '我的', path: '/heavy_project/heavy_project_main.html '}
    ];

        render(); // 渲染公共底部栏
    
    
    
}

