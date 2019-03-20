$(function () {

	// 切换菜单
	$('.menu ul li').click(function(){
		$(this).children().show().parent().siblings().children().next().hide();
	});
	$('.menu .sub_menu li a').click(function(){
		$(this).css("color","#5bc0de").parent().siblings().children().css("color","#a6a6a6");
	});

	// 获取账户信息
	Qnzs.getSessionAccount({}).then(function (data) {

		if(data.status == 'ALERT') {
			$.alert(data.msg).then(function () {
				window.location.href = '../pc/index.html'; // 跳转到pc网站首页
			});
			return;
		}

		var account = data.account;

		// $('.return ul').prepend('<li><a href="#shop"><span class="glyphicon glyphicon-globe">' + account.orgName + '</span></a></li>'); // 组织名称

		if (account.orgName){
            $('#orgName').text(',' + account.orgName); // 组织名称
		}else {
            $('#orgName').text(''); // 组织名称
		}

		var imgUrl = account.photoUrl ? account.photoUrl : 'public/images/default_avator.png'; // 用户头像
		$('.orange_ment').append('<img src="' + imgUrl + '" alt="" width="100%" height="100%" style="display: block; border-radius: 50%;">'); // 用户头像


		// 获取菜单列表
		// IndexApi.fingMenuByRid({}).then(function (data) {
		IndexApi.limit({}).then(function (data) {
			console.log(data)
			$('.menu').html('');
			// console.log('IndexApi.fingMenuByRid data', data);
//			var rows = data.rows;
//			var html = '';
//		    html += '<li><a class="J_menuItem" href="view/findConsult/single_sign.html" target="mainFrame" data-index="3"><span class="glyphicon glyphicon-file"></span>个人签到</a></li>';
//			for(var i=0; i<rows.length; i++) {
//				var item = rows[i];
//				var hrefHmtl = item.href; // 链接html
//				if(item.href && item.limt.length > 0) {
//					hrefHmtl = item.href + '?limit=' + item.limt.join(',');
//				}
//				// console.log('hrefHmtl', hrefHmtl);
//				html += '<li><a class="J_menuItem" href="' + hrefHmtl + '" target="mainFrame" data-index="3"><span class="glyphicon glyphicon-file"></span>' + item.title + '</a></li>';
//				// html += '<li><a class="J_menuItem" href="' + item.href + '" target="mainFrame" data-index="3"><span class="glyphicon glyphicon-file"></span>' + item.title + '</a></li>';
//			}
//			
//			 html +='<ul>'
//           $('.menu  .sub_menu').html(html);





                             console.log(data)
			        var limitList = data.rows;
			        for(var i=0; i<limitList.length; i++){
			            var html = '';
			            var limit = limitList[i];
			            // html += '<div>';
			            html += '<ul>';
			            for(var j=0; j<limit.child.length; j++) {
			                var subLimit = limit.child[j];
			
			                var hrefHmtl = subLimit.href; // 链接html
			                if(subLimit.href && subLimit.limt && subLimit.limt.length > 0) {
			                    hrefHmtl = subLimit.href + '?limit=' + subLimit.limt.join(',');
			                }
			
			                html += '	<li>';
			                html += '		<a class="J_menuItem"   target="mainFrame" href="' + hrefHmtl + '"  data-index="3">' + subLimit.name + '</a>';
			                html += '	</li>';
			            }
			
			            html += '</ul>';
			            
//			      
			            
			             html += '</div>';
			            console.log(hrefHmtl)
			            $('#nav').accordion('add', {
			                title : limit.name,
//			                 iconCls : n.iconCls,
			                selected : true,
			                content : html
			            });
			        }

                    
			
			
			
			
			

		})
	});

	// 返回pc网站
	$('#backPc').click(function () {
		window.location.href = '../pc/index.html'; // 跳转到pc网站首页
	})

});

// 点击'菜单导航'(创建/打开新面板)
//  $('#nav').on('click', 'li>a' , function () {
//      //获取id=tabs的元素
//      var $tabs = $("#tabs");
//
//      var text = $(this).text();
//      var url = this.href;
//
//      //根据标题看这个面板是否存在
//      if ($tabs.tabs("exists", text)) {
//          //如果存在 变成被选中的状态
//          $tabs.tabs("select", text);
//      } else {
//          //如果不存在则添加
//          $tabs.tabs('add', {
//              title : text,
//              closable : true,
//              content : '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>' //创建面板内容
//          });
//      }
//
//      return false;
//  });