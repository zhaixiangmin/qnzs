/**
 * Created by Administrator on 2017/6/27.
 */

$(function () {
	
   
	getToken();
	 getAccessTokenAndLogin();
	
});

 function getToken(){
	      var localAccessToken = $.cookie('__accessToken'); //获取本地accessToken
//	      console.log(localAccessToken)
	      //alert(localAccessToken);
	   
		  if(!localAccessToken){//在一号通返回__accessToken之前循环调用该方法，直到返回
			var time= setTimeout("getToken()",1000);return;
			
		  }else{
		     
			//  window.location.href = ctx + '/bd/grant?number='+random;
			
			
			    obj.ajax('/pc/bigData/login',{'accessToken':$.cookie('__accessToken')},function(data){
				
					if(data.msg){
						alert(data.msg);
						window.location.reload();
						
					};
				});
			    clearInterval(time);
			    
			  
		  }
    }
	/************* zhu  一号通接入   ****************/
	

 function getAccessTokenAndLogin(random){	
     
	//一号通调用
/*	obj.ajax('/pc/bigData/login',{'accessToken':$.cookie('__accessToken')},function(data){
		
		if(data.msg){
			alert(data.msg);
		};*/
		var account_common = undefined; // 用户信息
	    // 获取当前用户信息
	    Qnzs.getSessionAccount({}).then(function (data) {
	    	console.log(data);
	        //console.log('Qnzs.getSessionAccount data', data);
	        if(data.status != 'OK') { // 用户没有登录
	            return;
	        }
	
	        // 用户已登录
	        account_common = data.account; // 账户信息
	        $('#loginBtn .disB').text('退出');
	
	        $('#registerBtn .disB').text(account_common.realname); // 注册/(用户名)
	        // 角色
	        if(account_common.orgType == 0 || account_common.orgType == 1 || account_common.orgType == 2) { // 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
	            $('#bell_login').show(); // 显示铃铛图标与管理后台
	            
	            $('.setup_btn').attr('href' ,'organe_person_info.html');
	        }else {
	            $('#bell_login').hide(); // 显示铃铛图标与管理后台
	             $('.setup_btn').attr('href' ,'personalCenterProfile.html');
	        }
	    });
	  
	    var pathname =  window.location.pathname; // 链接的路径名称 -- > /front/pc/view/find_help/find_help.html(//localhost:63342/front/pc/view/find_help/find_help.html)
	    var host = window.location.host; // 主机名
	    var isNginx = false; // 是否nginx环境
	    var isIndexPage = false; // 是否index页面(网站首页)
	    var prefix = '../../'; // 引用路径前缀
	    // //console.log('pathname', pathname);
	    //console.log('host', host);
	    var district = {
	        sitenavOrgId: 440000, // 区域ID
	        sitenavOrgName: '广东' // 区域名称
	    };
	    var website_test = 'gdqnzs'; // 域名(测试)
	    var website = '12355'; // 域名(正式)
	    // 是否nginx环境
	    if(host.indexOf(website) != -1 || host.indexOf(website_test) != -1) { // 检测是否nginx环境
	        isNginx = true;
	    }
	
	    // 是否首页
	    if(isNginx) { // nginx环境
	        if(!pathname || pathname == '/' || pathname == '/index.html' || pathname == '/pc/index.html') {
	            isIndexPage = true; // 当前页面是首页
	            prefix = ''; // 设置首页前缀路径
	        }else {
	            prefix = '/'; // 设置非首页前缀路径
	        }
	    }else { // 本地开发环境
	        var pathArr = pathname.split('/'); // /front/pc/index.html?_ijt=t48h1o36ira9um9e4krltsoc14 --> ['', 'front', 'pc', 'index.html?_ijt=t48h1o36ira9um9e4krltsoc14']
	        var pathSuffix = pathArr[pathArr.length-1]; // index.html?_ijt=t48h1o36ira9um9e4krltsoc14
	        var pathSuffix2 = pathArr[pathArr.length-2]; // pc
	        if(pathSuffix == 'index.html' && pathSuffix2 == 'pc') {
	            isIndexPage = true; // 当前页面是首页
	            prefix = ''; // 设置首页前缀路径
	        }else {
	            prefix = '../../'; // 设置非首页前缀路径
	        }
	    }
	    //console.log('isIndexPage', isIndexPage);
	
	  
	    /**
	     * 渲染公共头部、尾部
	     * @param tabs {array} 选项卡数组
	     * @param district {obj} 地区对象
	     */
	    // function render(tabs, district) {
	    function render(tabs) {
	        var header = ''; // 公共头部
	        header += '<div class="topBlock poFix">';
	        header += '<div class="headTopBox">';
	        header += '<header class="headTop w1200 clearfix">';
	        header += '<div class="fr clearfix">';
	        header += '<div class="leftLink fl">';
	        header += '<a href="//qnzs.youth.cn/" target="_blank" class="fl a01">中国青年之声</a>';
	        header += '<a href="http://www.izyz.org/" target="_blank" class="fl a02">i 志愿</a>';
	        header += '<a href="//zcplan.cn/" target="_blank" class="fl a03">展翅网</a>';
	        header += '<a href="//www.gdtuanju.com/" target="_blank" class="fl a04">粤团聚</a>';
	        header += '</div>';
	        header += '<div class="rightLink fl">';
	        // header += '<a href="//120.25.215.237:18001/servicePlatform" class="fl ">';
	        // header += '<span class="disB">在线平台</span>';
	        // header += '</a>';
	        // header += '<a href="//120.25.215.237:18001/goAboutUs" class="fl">';
	        // header += '<span class="disB">联系我们</span>';
	        // header += '</a>';
	        header += '<a>';
	        header += '<span class="disB"  style="padding-left:40px;background: url(//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171012/20171012151942_68hotline.png) no-repeat 20px center;background-size: 15px 15px;">青少年服务热线：<em style="color:#12b7f5;">12355</em></span>';
	        header += '</a>';
	        header += '<a href="javascript:;" class="fl" id="registerBtn">';
	        header += '<span class="disB borderR01">注册</span>';
	        header += '</a>';
	
	        // 跳转到注册页面
	        if(isNginx) { // nginx环境
	            header += '<a href="' + Qnzs.domain + '/bg/" class="fl" id="bell_login" style="padding-top: 12px;padding-bottom: 10px;display: none;">';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                header += '<a href="../bg/index.html" class="fl" id="bell_login" style="padding-top: 12px;padding-bottom: 10px;display: none;">';
	            }else { // 当前页非首页
	                header += '<a href="../../../bg/index.html" class="fl" id="bell_login" style="padding-top: 12px;padding-bottom: 10px;display: none;">';
	            }
	        }
	        header += '<i class="icon" style="display: inline-block;width: 16px;height: 16px;background: url(' + prefix + 'public/img/message.png) no-repeat;"></i>';
	        header += '<span style="display: inline-block; vertical-align: super; ">管理后台</span>';
	        header += '</a>';
	        header += '<a href="javascript:;" class="fl" id="loginBtn" >';
	        header += '<span class="disB">登录</span>';

	        header += '</a>';
	        header += '<a href="javascript:;" class="fl">';
	        header += '<a href="javascript:;" class="fl" id="complian_global">';
	         header += '<span class="disB borderR01">我要吐槽</span>';
	        header += '</a>';
	        
	        

	        header += '</a>';
	        header += '</div>';
	        header += '</div>';
	        header += '</header>';
	        header += '</div>';
	        header += '<div class="navigation conBgc01 clearfix">';
	        header += '<div class="content w1200">';
	        header += '<div class="leftNav fl">';
	        header += '<div class="bigLogoDiv fl" style="cursor: pointer;">';
	        // header += '<img src="public/img/bigLogo.png" width="149"/>';
	        header += '<img src="' + prefix + 'public/img/bigLogo.png" width="149" id="logo_global"/>';
	        header += '</div>';
	        // header += '<a href="javascript:;" class="disIB colorfff font14 didian">' + district.sitenavOrgName + '</a>';
	        header += '<a href="javascript:;" class="disIB colorfff font14 didian">广东</a>';
	        header += '</div>';
	        header += '<div class="rightNav fr">';
	        header += '<ul class="ulNav fl">';
	
	
	        for(var i=0; i<tabs.length; i++) { // 选项卡加载
	            var tab = tabs[i];
	
	            if(isNginx) { // nginx环境
	                if(isIndexPage) { // 当前页是首页
	                    if(i == 0) { // 首页选项卡
	                        header += '<li><a href="/pc' + tab.path + '" class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }else { // 非首页选项卡(view/find_help/find_help.html)
	                        header += '<li><a href="/pc/view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }
	                }else { // 当前页非首页
	                    if(i == 0) { // 首页选项卡
	                        header += '<li><a href="/pc' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }else { // 非首页选项卡(/view/find_help/find_help.html)
	                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
	                        //console.log('keyword', keyword);
	                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡
	                            header += '<li><a href="/pc/view' + tab.path + '" class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
	                            continue;
	                        }
	
	                        // 去高亮当前页面选项卡
	                        header += '<li><a href="/pc/view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }
	                }
	            }else { // 本地开发
	                if(isIndexPage) { // 当前页是首页
	                    if(i == 0) { // 首页选项卡
	                        header += '<li><a href=".' + tab.path + '" class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }else { // 非首页选项卡(view/find_help/find_help.html)
	                        header += '<li><a href="view' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }
	                }else { // 当前页非首页
	                    if(i == 0) { // 首页选项卡 ../../index.html
	                        header += '<li><a href="../..' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }else { // 非首页选项卡(/view/find_help/find_help.html)
	                        var keyword = tab.path.split('/')[1]; // ['', 'find_help', 'find_help.html'] --> find_help
	                        // //console.log('keyword', keyword);
	                        if(pathname.indexOf(keyword) != -1) { // 高亮当前页面选项卡
	                            header += '<li><a href="..' + tab.path + '" class="disB conBgc02" style="cursor: pointer;">' + tab.name + '</a></li>';
	                            continue;
	                        }
	
	                        // 去高亮当前页面选项卡
	                        header += '<li><a href="..' + tab.path + '" class="disB" style="cursor: pointer;">' + tab.name + '</a></li>';
	                    }
	                }
	            }
	        }
	
	        header += '</ul>';
	        header += '</div>';
	        header += '</div>';
	        header += '</div>';
	        header += '</div> ';
	
	        var footer = '';
	        footer += '<footer class="conBgc01 colorfff font14">';
	        footer += '    <div class="box" style="width: 100%;">';
	        footer += '        <div class="box-centent" style="width: 600px;height: 100px;margin: 0 auto;overflow: hidden;">';
	        footer += '            <div class="box-centent-left" style="width: 80px;height: 80px;float: left;  margin-top: 5px;">';
	        footer += '                <span id="_ideConac"><a href="http://bszs.conac.cn/sitename?method=show&id=5418DCF51DDE4A7BE053012819AC5498"><img src="https://wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171227/20171227185720_784red.png"></a></span>';
	        footer += '            </div>';
	        footer += '            <div class="box-centent-rig" style=" margin-top: 5px;  width: 470px;height: 100px;float: left; text-align: center; line-height: 20px;">';
	        if(isNginx) { // nginx环境
	            footer += '                <a href="' + Qnzs.domain + '/wechat/" class="disB font14 colorfff">触屏版</a>';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                footer += '                <a href="../wechat/index.html" class="disB font14 colorfff">触屏版</a>';
	            }else { // 当前页非首页
	                footer += '                <a href="../../../wechat/index.html" class="disB font14 colorfff">触屏版</a>';
	            }
	        }
	        footer += '                <p>版权所有 copyright 2016 广东青年之声 中国共产主义青年团广东省委员会</p>';
	        footer += '                <p>技术支持：广东汇青信息科技有限公司  客服邮箱：kf@12355.net</p>';
	        footer += '                <a href="//www.miibeian.gov.cn/" target="_blank" style="color: #fff;">粤ICP备10214402号-4</a>';
	        footer += '            </div>';
	        footer += '        </div>';
	        footer += '    </div>';
	        footer += '</footer>';
	
	        // 站长统计
	        var vendor = '';
	        vendor += '<div style="display:none">';
	        vendor += '    <script src="https://s95.cnzz.com/stat.php?id=1258031328&web_id=1258031328" language="JavaScript"></script>';
	        vendor += '</div>';
	
	        $('body').prepend(header); // 插入公共头部
	        $('body').append(footer); // 插入公共尾部
	        $('body').append(vendor); // 插入站长统计
	           $('.topBlock').hide()//隐藏头部
	           $('footer').hide()  //隐藏底部
	      
	    }
	
	    // 选项卡数组
	    var tabs = [
	        { name: '首页', path: '/index.html' },
	        { name: '找活动', path: '/find_active/zhaohuodongIndex.html' },
	        { name: '找咨询', path: '/find_consult/find_consult.html'},
	        { name: '找帮助', path: '/find_help/find_help.html' },
	        { name: '重磅项目', path: '/heavy_project/heavy_main_list.html'},
	        { name: '青年之家', path: '/young_family/young_family.html' }
	    ];
	
	    render(tabs); // 渲染公共头部、尾部
	
	    if(isNginx) { // nginx环境
	        var hostArr = host.split('.'); // www.gdqnzs.cn、www.gz.gdqnzs.cn(www.12355.net、www.gz.12355.net)
	        if(hostArr.length >= 3) {
	            var regionName = hostArr[hostArr.length-3]; // www、gz
	            if(regionName == 'www'){ // 正常域名
	                if($.cookie && $.cookie('district_qnzs')) { // 有cookie
	                    var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	                    district_qnzs = JSON.parse(district_qnzs);
	                    district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
	                    district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID
	                }else {
	                    // 存储到cookie
	                    var district_qnzs = {
	                        sitenavOrgId: district.sitenavOrgId, // 区域ID
	                        sitenavOrgName: district.sitenavOrgName // 区域名称
	                    };
	                    district_qnzs = JSON.stringify(district_qnzs);
	                    $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
	                }
	
	                $('body .navigation .leftNav .didian').text(district.sitenavOrgName); // 渲染地区名称
	            }else { // 特定域名
	                if($.cookie && $.cookie('district_qnzs')) { // 有cookie(非第一次打开链接)
	                    var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	                    district_qnzs = JSON.parse(district_qnzs);
	                    district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
	                    district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID
	
	                    $('body .navigation .leftNav .didian').text(district.sitenavOrgName); // 渲染地区名称
	                }else { // 无cookie(第一次打开链接)
	                    // 根据二级域名获取区域ID
	                    Qnzs.getDistrictIdBySubDomains({subDomains: regionName}).then(function (data) {
	                        if(data.data) {
	                            district.sitenavOrgId = data.data.districtId; // 区域ID
	                            district.sitenavOrgName = data.data.districtName; // 区域名称
	                        }
	                    }).always(function () {
	
	                        if($.cookie) {
	                            // 存储到cookie
	                            var district_qnzs = {
	                                sitenavOrgId: district.sitenavOrgId, // 区域ID
	                                sitenavOrgName: district.sitenavOrgName // 区域名称
	                            };
	                            district_qnzs = JSON.stringify(district_qnzs);
	                            $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
	                        }
	                        // // 存储到cookie
	                        // var district_qnzs = {
	                        //     sitenavOrgId: district.sitenavOrgId, // 区域ID
	                        //     sitenavOrgName: district.sitenavOrgName // 区域名称
	                        // };
	                        // district_qnzs = JSON.stringify(district_qnzs);
	                        // $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
	
	                        $('body .navigation .leftNav .didian').text(district.sitenavOrgName); // 渲染地区名称
	                    });
	                }
	            }
	        }
	    }else { // 本地环境
	        if($.cookie && $.cookie('district_qnzs')) { // 有cookie
	            var district_qnzs = $.cookie('district_qnzs'); // 获取cookie(区域)
	            district_qnzs = JSON.parse(district_qnzs);
	            district.sitenavOrgId = district_qnzs.sitenavOrgId; // 区域ID
	            district.sitenavOrgName = district_qnzs.sitenavOrgName; // 区域ID
	        }else {
	            if($.cookie) {
	                // 存储到cookie
	                var district_qnzs = {
	                    sitenavOrgId: district.sitenavOrgId, // 区域ID
	                    sitenavOrgName: district.sitenavOrgName // 区域名称
	                };
	                district_qnzs = JSON.stringify(district_qnzs);
	                $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
	            }
	        }
	        
	        $('body .navigation .leftNav .didian').text(district.sitenavOrgName); // 渲染地区名称
	    }
	 
	
//	    var account_common = undefined; // 用户信息
//	    // 获取当前用户信息
//	    Qnzs.getSessionAccount({}).then(function (data) {
//	        //console.log('Qnzs.getSessionAccount data', data);
//	        if(data.status != 'OK') { // 用户没有登录
//	            return;
//	        }
//	
//	        // 用户已登录
//	        account_common = data.account; // 账户信息
//	        $('#loginBtn .disB').text('退出');
//	
//	        $('#registerBtn .disB').text(account_common.realname); // 注册/(用户名)
//	        // 角色
//	        if(account_common.orgType == 0 || account_common.orgType == 1 || account_common.orgType == 2) { // 0-超级管理员，1-系统管理员，2-组织管理员，3-个人用户
//	            $('#bell_login').show(); // 显示铃铛图标与管理后台
//	        }else {
//	            $('#bell_login').hide(); // 显示铃铛图标与管理后台
//	        }
//	    });
	
	
	    // 登录弹出框渲染
	    function login_box() {
	        var html = '';
	
	        html += '<div class="login_regist_box" id="login_regist_box">';
	        html += '    <form action="">';
	        html += '        <div class="login_regist_container bgcWhite">';
	        html += '            <div class="title_box clearfix colorfff">';
	        html += '                <h1 class="fl title_left">账号登录</h1>';
	        html += '                <em class="close fr">×</em>';
	        html += '            </div>';
	        html += '            <div class="info_input">';
	        html += '            	<h4 id="error_msg" class="error" style="display:none;color: red;">报错信息</h4>';
	        html += '                <div class="input_item user_name" >';
	        html += '                    <input type="text" class="input_txt" id="user_name" style="border:none;"  placeholder="请输入手机号" />';
	        html += '                </div>';
	        html += '                <div class="input_item pwd">';
	        html += '                    <input type="password" id="user_pwd" style="border:none;"   class="input_txt"  placeholder="请输入登录密码" />';
	        html += '                </div>';
	        html += '                <div class="input_check_casd_box clearfix" >';
	        html += '                    <input class="input_check_casd" type="text" id="img"   placeholder="请输入图片验证码"  />';
	        html += '                     <img id="imagesyanz" onclick="changeModel()" src="" alt="">    '
	        html += '                </div>';
	        
	        
	        html += '            </div>';
	        html += '            <div class="btn_box">';
	        html += '                <a href="javascript:;" class="btn login_btn" id="login_btn">登录</a>';
	        html += '                <a id="register_global" class="btn register_btn" style="cursor: pointer;">注册</a>';
	        // html += '                <a href="../user_register/user_register.html" class="btn register_btn">注册</a>';
	        html += '                <div class="forgot_pwd" id="forgot_pwd_global"><a href="javascript:;">--&nbsp;&nbsp;忘记密码&nbsp;&nbsp;--</a></div>';
	        html += '                <div class="forgot_pwd"><a href="javascript:;" onclick="one_indru()">--&nbsp;&nbsp;什么是一号通&nbsp;&nbsp;--</a></div>';
	         
	        html += '           </div>';
	        html += '            <div class="bot_link">';
	        html += '                <ul class="clearfix">';
	        html += '                   <li class="item wechat">';
	        html += '                       <a href="' + Qnzs.path + '/wechat/socialConnect">';
	        html += '                           <img src="' + prefix + 'public/img/login_wechat_ico.png" class="icon" width="28" alt=""';
	        html += '                           <span>微信</span>';
	        html += '                       </a>';
	        html += '                   </li>';
	        html += '                   <li class="item">';
	        html += '                       <a  href="'+bigDataUrl+'/account/login.html?appId=0110&amp;finishurl='+ctx+'">';
	//         html += '                           <img src="public/img/login_yht_ico.png" class="icon" width="28" alt="" />';
	          html += '                           <img src="' + prefix + 'public/img/login_yht_ico.png" class="icon" width="28" alt="" />';
	          html += '                           <span>一号通</span>';
	        html += '                       </a>';
	        html += '                   </li>';
	        html += '                </ul>';
	        html += '            </div>';
	        html += '        </div>';
	        html += '    </form>';
	        html += '</div>';
	
	        $('body').append(html);
	        
	    }
	    login_box();
	
	    // 点击logo(青年之声)
	    $('body').on('click', '#logo_global', function () {
	        // 跳转到注册页面
	        if(isNginx) { // nginx环境
	            window.location.href = '/pc/index.html';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                // window.location.href = 'view/person_center/person_center.html?link=complain';
	            }else { // 当前页非首页
	                window.location.href = '../../index.html';
	            }
	        }
	    });
	    
	    // 点击 '我要吐槽'
	    $('body').on('click', '#complian_global', function () {
	        // 跳转到注册页面
	        if(isNginx) { // nginx环境
	            window.location.href = '/pc/view/person_center/person_center.html?link=complain';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                window.location.href = 'view/person_center/person_center.html?link=complain';
	            }else { // 当前页非首页
	                window.location.href = '../person_center/person_center.html?link=complain';
	            }
	        }
	    });
	
	    // 点击 '注册'/('用户名') 按钮
	    $('body').on('click', '#registerBtn', function () {
	        if(!account_common) { // 用户还没登录(当前应该显示'注册'按钮)
	            // window.location = '../user_register/user_register.html'; // 跳转到注册页面
	            // 跳转到注册页面
	            if(isNginx) { // nginx环境
	                window.location.href = '/pc/view/user_register/user_register.html';
	            }else { // 本地开发
	                if(isIndexPage) { // 当前页是首页
	                    window.location.href = 'view/user_register/user_register.html';
	                }else { // 当前页非首页
	                    window.location.href = '../user_register/user_register.html';
	                }
	            }
	            return;
	        }
	
	        // 跳转到个人中心
	        if(isNginx) { // nginx环境
	            window.location.href = '/pc/view/person_center/person_center.html';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                window.location.href = 'view/person_center/person_center.html';
	            }else { // 当前页非首页
	                window.location.href = '../person_center/person_center.html';
	            }
	        }
	    });
	 
	    // 点击 头部的 '登录'/'退出' 按钮
	    $('body').on('click', '.headTopBox #loginBtn', function(event) {
	    	
	    	/**** 登录页面动态图片验证码  **********/
	    	
	    	 var xmlhttp;
   
			xmlhttp=new XMLHttpRequest();
			//xmlHttp = createXMLHttpRequest();
			xmlhttp.open("GET",Qnzs.path+"/pc/account/loginValidCode",true);
			xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");  
			xmlhttp.setRequestHeader("Content-Type", "application/xml"); 
			xmlhttp.withCredentials = true;
			xmlhttp.responseType = "blob";
			xmlhttp.onload = function(){
			    console.log(this);
			    if (this.status == 200) {
			        var blob = this.response;
			        var img = document.getElementById("imagesyanz");
			        img.onload = function(e) {
			            window.URL.revokeObjectURL(img.src); 
			        };
			        img.src = window.URL.createObjectURL(blob);
			        
			        
			    }
			}
			xmlhttp.send();
				    	
	    	
	    	
	    	/**** 登录页面动态图片验证码   end'' **********/
	    	
	        if(!account_common) { // 用户还没登录
	            var height = 416; // 弹出框高度
	            var top = ($(window).height() - height)*0.5;
	
	            $('.login_regist_container').css('top', top > 0 ? top : 0); // 弹出框垂直居中
	            $('.login_regist_box').show();
	            $('body').addClass('overflow_h');
	            return;
	        }
	
	        // 用户已经登录(当前应该显示 '退出' 按钮)
	        // 退出操作
	        $.alert('确定退出?').then(function () {
	            Qnzs.exitAccount({'accessToken':$.cookie('__accessToken')}).then(function () {
	                // window.location.reload(); // 刷新页面
	
	                var index_link = $('.navigation .ulNav li').eq(0).find('a').attr('href'); // 公共头部 '首页'导航 按钮的href值
	                // //console.log('index_link', index_link);
	                window.location.href = index_link; // 跳转到首页
	            });
	        });
	    });
	
	    // 点击'登录' 弹出框 的 'x' 按钮
	    $(".login_regist_box .close").click(function(){
	        $(".login_regist_box").hide();
	        $('#error_msg').hide(); // 隐藏错误信息
	        $('body').removeClass('overflow_h');
	    });
	
	    // 点击 弹出框的'登录'按钮
	    $('body').on("click", '#login_btn', function(){
	    
	//  	$.cookie('__accessToken');
	//      console.log($.cookie('__accessToken'))
	  	   
	        var data = {
	            mobile: $("#user_name").val(),
	            password: $("#user_pwd").val(),
	            loginValidCode:$('.input_check_casd').val(),
	            accountToken:$.cookie('__accessToken')
	            
	        };
	
	        if(!data.mobile) {
	            $("#error_msg").html("请输入用户名");
	            $("#error_msg").css("display","block");
	            return;
	        }
	
	        if(!data.password) {
	            $("#error_msg").html("请输入密码");
	            $("#error_msg").css("display","block");
	            return;
	        }
	         if(!data.loginValidCode) {
	            $("#error_msg").html("请输入的验证码不能为空");
	            $("#error_msg").css("display","block");
	            return;
	        }
	
	        // 用户登录
	        Qnzs.login(data).then(function (data) {
	        	//获取cookie的安全连接
	        	
	        	
	            //console.log('Qnzs.login data', data);
	          
	            // 获取用户区域ID
	            Qnzs.getDistrictIdByUserDistrictId({}).then(function (data) {
	                //console.log('Qnzs.getDistrictIdByUserDistrictId data', data);
	                if(data.data) {
	                    district.sitenavOrgId = data.data.districtId; // 区域ID
	                    district.sitenavOrgName = data.data.districtName; // 区域名称
	                }
	            }).always(function () {
	                // 存储到cookie
	                var district_qnzs = {
	                    sitenavOrgId: district.sitenavOrgId, // 区域ID
	                    sitenavOrgName: district.sitenavOrgName // 区域名称
	                };
	                district_qnzs = JSON.stringify(district_qnzs);
	                $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
	
	                window.location.reload(); // 刷新当前页面
	            });
	        });
	    });
	
	    // href="../user_register/user_register.html"
	    // 点击 '注册'(登录弹出框)
	    $('body').on('click', '#register_global', function () {
	        if(isNginx) { // nginx环境
	            window.location.href = '/pc/view/user_register/user_register.html';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                window.location.href = 'view/user_register/user_register.html';
	            }else { // 当前页非首页
	                window.location.href = '../user_register/user_register.html';
	            }
	        }
	    });
	
	    // 点击 '忘记密码'(登录弹出框)
	    $('body').on('click', '#forgot_pwd_global', function () {
	        // 跳转到忘记密码
	        if(isNginx) { // nginx环境
	            window.location.href = '/pc/view/psd_reset/psd_reset.html';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                window.location.href = 'view/psd_reset/psd_reset.html';
	            }else { // 当前页非首页
	                window.location.href = '../psd_reset/psd_reset.html';
	            }
	        }
	    });
	
	
	    // 鼠标悬浮(地址导航)
	    $('body').on('mouseover mouseout', '.navigation .didian', function (event) {
	        if(event.type  == 'mouseover') { // 鼠标悬浮
	            $('.popup').show(); // 显示地址导航弹出框
	        }else if(event.type  == 'mouseout') { // 鼠标离开
	            $('.popup').hide(); // 隐藏地址导航弹出框
	        }
	    });
	    $('body').on('mouseover mouseout', '.popup', function (event) {
	        if(event.type  == 'mouseover') { // 鼠标悬浮
	            $('.popup').show(); // 显示地址导航弹出框
	        }else if(event.type  == 'mouseout') { // 鼠标离开
	            $('.popup').hide(); // 隐藏地址导航弹出框
	        }
	    });
	
	    // 渲染地址导航弹出框
	    function render_popup() {
	        var html_popup = '';
	        html_popup += '<div class="popup">';
	        html_popup += '    <span class="triangle-up"></span>';
	        html_popup += '    <dl>';
	        html_popup += '        <dt>地市</dt>';
	        html_popup += '        <dd>';
	        html_popup += '            <span class="citylist" id="cityOrgList"></span>';
	        // html_popup += '            ';
	        html_popup += '        </dd>';
	
	        html_popup += '         <dt><nobr>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高校';
	        html_popup += '             <div class="orgslistorder_btn" style="line-height:30px;">';
	        html_popup += '                 <input class="orgslistorder_button inputfoucs" id="keyWordOrg" placeholder="请输入关键字" maxlength="10">';
	        html_popup += '                 <div class="orgslistorder_Iconsearch"></div>';
	        html_popup += '                 <a href="javascript:void(0);" id="keyWordOrgBtn" class="orgslistorder_searchbtn">搜索</a>';
	        html_popup += '             </div>';
	        html_popup += '         	<span style="display: inline-block;margin-left:73px;">';
	
	        // 跳转到注册页面
	        if(isNginx) { // nginx环境
	            // window.location.href = '/pc/view/user_register/user_register.html';
	
	            html_popup += '         		<a style="display: inline-block;cursor: pointer;" class="gxOrgListL"><img alt="" src="/pc/public/img/bannerbtnl.png" style="display:inline-block; vertical-align: middle;">&nbsp;&nbsp;</a>';
	            html_popup += '         		<a style="display: inline-block;cursor: pointer;" class="gxOrgListR">&nbsp;&nbsp;<img alt="" src="/pc/public/img/bannerbtnr.png" style="display:inline-block; vertical-align: middle;"></a></span>';
	        }else { // 本地开发
	            if(isIndexPage) { // 当前页是首页
	                // window.location.href = 'view/user_register/user_register.html';
	                html_popup += '         		<a style="display: inline-block;cursor: pointer;" class="gxOrgListL"><img alt="" src="public/img/bannerbtnl.png" style="display:inline-block; vertical-align: middle;">&nbsp;&nbsp;</a>';
	                html_popup += '         		<a style="display: inline-block;cursor: pointer;" class="gxOrgListR">&nbsp;&nbsp;<img alt="" src="public/img/bannerbtnr.png" style="display:inline-block; vertical-align: middle;"></a></span>';
	            }else { // 当前页非首页
	                // window.location.href = '../user_register/user_register.html';
	                html_popup += '         		<a style="display: inline-block;cursor: pointer;" class="gxOrgListL"><img alt="" src="../../public/img/bannerbtnl.png" style="display:inline-block; vertical-align: middle;">&nbsp;&nbsp;</a>';
	                html_popup += '         		<a style="display: inline-block;cursor: pointer;" class="gxOrgListR">&nbsp;&nbsp;<img alt="" src="../../public/img/bannerbtnr.png" style="display:inline-block; vertical-align: middle;"></a></span>';
	            }
	        }
	        html_popup += '         </nobr></dt>';
	
	        html_popup += '        <dd>';
	        html_popup += '            <span class="citylist" id="gxOrgList"></span>';
	        // html_popup += '            ';
	        html_popup += '        </dd>';
	
	        html_popup += '    </dl>';
	        html_popup += '</div>';
	        $('body').append(html_popup); // 渲染地址导航弹出框
	    }
	    render_popup();
	
	    // page {int} 当前页码(可不传，默认为1)
	    // rows {int} 每页记录数(可不传，默认为10)
	    // parentDid {int} 区域父ID(440000：广东省)
	    // type {int} 类型(1是组织，2是高校)
	    var params_city = {
	        page: 1, // 页码(默认值为1)
	        rows: 100, // 每页记录数(默认值为10)
	        type: 1, // 类型(1是组织，2是高校)
	        parentDid: 440000 // 区域父ID(440000：广东省)
	    };
	    // 加载城市列表
	    Qnzs.getDistrictByType(params_city).then(function (data) {
	        //console.log('getDistrictByType 地市 data', data);
	        var cities = data.rows;
	        var html = '';
	        html += '<a class="district" data-id="440000" data-name="广东">广东</a>';
	        // 城市列表
	        for(var i=0; i<cities.length; i++) {
	            var city = cities[i];
	            html += '<a class="district" data-id="' + city.did + '" data-name="' + city.districtName + '">' + city.districtName + '</a>';
	        }
	        $('#cityOrgList').html(html); // 渲染城市列表
	    });
	
	    var params_school = {
	        page: 1, // 页码(默认值为1)
	        rows: 50, // 每页记录数(默认值为10)
	        type: 2, // 类型(1是组织，2是高校)
	        parentDid: 440000, // 区域父ID(440000：广东省)
	        name: undefined // 名称搜索
	    };
	
	    var hasNext = true; // 是否还有下一页(true：有，false：没有)
	    var isFinishSchool = false; // 是否加载学校完毕(true：加载完毕，false：尚未完毕)
	    /**
	     * 渲染高校页面(地址导航浮动框)
	     * @param params_school
	     */
	    function render_school(params_school) {
	        Qnzs.getDistrictByType(params_school).then(function (data) {
	            //console.log('getDistrictByType 高校 data', data);
	            var schools = data.rows;
	            var html = '';
	            // 城市列表
	            for(var i=0; i<schools.length; i++) {
	                var school = schools[i];
	                html += '<a class="district" data-id="' + school.did + '" data-name="' + school.districtName + '">' + school.fullName + '</a>';
	            }
	            $('#gxOrgList').html(html); // 渲染城市列表
	            if(schools.length != params_school.rows) {
	                hasNext = false;
	            }
	        }).always(function () {
	            isFinishSchool = true;
	        });
	    }
	    render_school(params_school);
	
	    // 点击高校'上一页<'按钮(地址导航)
	    $('body').on('click', '.popup .gxOrgListL', function () {
	    
	        if(!isFinishSchool){
	            //console.log('gxOrgListL 正在加载高校中');
	            return;
	        }
	        isFinishSchool = false; // 设置尚未加载完毕
	        if(params_school.page <= 1) {
	            //console.log('gxOrgListL 没有上一页');
	            isFinishSchool = true;
	            return;
	        }
	        params_school.page--;
	        hasNext = true;
	        render_school(params_school);
	    });
	    // 点击高校'下一页>'按钮(地址导航)
	    $('body').on('click', '.popup .gxOrgListR', function () {
	        if(!isFinishSchool){
	            //console.log('gxOrgListR 正在加载高校中');
	            return;
	        }
	        isFinishSchool = false; // 设置尚未加载完毕
	        if(!hasNext) {
	            //console.log('gxOrgListR 没有下一页');
	            isFinishSchool = true;
	            return;
	        }
	        params_school.page++;
	        render_school(params_school);
	    });
	
	    // 点击 '区域名称'
	    $('body').on('click', '.popup .citylist .district', function () {
	    		
	       var sitenavOrgId = $(this).data('id');
	       var sitenavOrgName = $(this).data('name');
	        //console.log('sitenavOrgId', sitenavOrgId);
	        //console.log('sitenavOrgName', sitenavOrgName);
	
	        // var sitenavOrgIdSuffix = '?sitenavOrgId=' + sitenavOrgId;
	        if($.cookie) {
	            var district_qnzs = {
	                sitenavOrgId: sitenavOrgId,
	                sitenavOrgName: sitenavOrgName
	            };
	            district_qnzs = JSON.stringify(district_qnzs);
	            $.cookie('district_qnzs', district_qnzs, {path: '/'}); // 存储到cookie(区域)
	        }
	
	
	        var index_link = $('.navigation .ulNav li').eq(0).find('a').attr('href'); // 公共头部 '首页'导航 按钮的href值
	        // //console.log('index_link', index_link);
	        window.location.href = index_link; // 跳转到首页
	    });
	
	    // 点击 '搜索'(区域)
	    $('body').on('click', '.popup .orgslistorder_searchbtn', function () {

	           search();
	           	
	    })
	    
	    function search(){
	      	var name = $('#keyWordOrg').val(); // 搜索区域名称
	        params_school.name = name; // 名称搜索
	        params_school.page = 1; // 重置第一页
	        render_school(params_school); // 渲染高校页面(地址导航浮动框)
	    }
	    
	    $('#keyWordOrg').on('keydown' ,function(e){   //监听键盘按下的事件
	
			if(e.keyCode =='13'){
				search()   //调用查询的函数
				
			}
		})
			    
	    
	    
	    
	 //一号通
   //     })
    
};


//什么是一号通  - 弹出窗
function one_indru(){

	
	$.alert('“一号通”   已接入  “青年之声” 、 “i志愿”等应用， “一号通”系统内的应用可实现“一个账号， 多个应用通行”，  用户可以注册使用   “一号通”账号直接登录以上应用。');
}

/******  登录页面回调函数 ********/
function  changeModel(){
		
var xmlhttp;
   
xmlhttp=new XMLHttpRequest();
//xmlHttp = createXMLHttpRequest();
xmlhttp.open("GET",Qnzs.path+"/pc/account/loginValidCode",true);
xmlhttp.setRequestHeader("POWERED-BY-MENGXIANHUI", "Approve");  
xmlhttp.setRequestHeader("Content-Type", "application/xml"); 
xmlhttp.withCredentials = true;
xmlhttp.responseType = "blob";
xmlhttp.onload = function(){
    console.log(this);
    if (this.status == 200) {
        var blob = this.response;
        var img = document.getElementById("imagesyanz");
        img.onload = function(e) {
            window.URL.revokeObjectURL(img.src); 
        };
        img.src = window.URL.createObjectURL(blob);
        
        
    }
}
xmlhttp.send();
		
	}
/******  登录页面回调函数  end ********/


