
    /*项目列表*/
    function myReleaseActivityList(num){
        function begin(data){
            obj.ajax('/project/myReleaseActivityList',{'pageIndex':1,'pageSize':num},function(data){
                console.log(data);
                createE(data.rows);
                if($('.project_item_list .item').length>=data.total){
                    $('.gengduo a').text('已经加载完了！');
                }
         },function(data){console.log(1);});
        }
        begin();

        function createE(data){  //  '+base+'/project/activityDetail?activityId='+data[i].id+'
            $('.project_item_list').html('');
            var html='';
            for (var i = 0; i < data.length; i++) {
	    	if(data[i].externalLinksWc == ''){
                html+='<a href="heavy_project_details.html?activityId=' + data[i].id + '"  class="item">'
	    	}else{
	        	html+='<a href="'+data[i].externalLinksWc+'" class="item">'
	    	}
                html+=' <div class="xiangmu_box">'
                html+='  <div class="xiangmu_box_in">'
                html+='   <div class="xiangmu_content">'
                html+='    <div class="pic_box">'
                html+='     <img src="'+data[i].bannerUrl+'" />'
                html+='    </div>'
                html+='    <p class="clearfix">'
                html+='     <span class="xm_fenlei fl">'+data[i].type+'</span>'
                html+='     <span class="xm_zhuti fl">'+data[i].title+'</span>'
                if(data[i].stage==4){
                    html+='<span class="xm_state fr clearfix color999">已结束</span>'
                }else if(data[i].stage==1){
                    html+='<span class="xm_state fr clearfix">未开始</span>'
                }else if(data[i].stage==2 || data[i].stage==5){
                    html+='<span class="xm_state fr clearfix">报名中</span>'
                }else if(data[i].stage==3){
                    html+='<span class="xm_state fr clearfix">投票中</span>'
                }
                /*html+='     <span class="xm_time fr clearfix"><i class="rest fl">剩</i><i class="day fl">12天4小时</i></span>'*/
                html+='    </p>'
                html+='   </div>'
                html+='  </div>'
                html+=' </div>'
                html+='</a>'
            };
            $('.project_item_list').append(html);
            $('.xm_state').each(function(index, el) {
                if(!$(el).hasClass('color999')){
                    $(el).css('color','#3dba2b');
                }
            });

        }

    }
    myReleaseActivityList(3);/*初始，传入3条*/

    $(function(){
        var num = 3;
        $('.gengduo').click(function(){
            var more_txt = $('.gengduo a').text();
            if($.trim(more_txt) == '查看更多'){
               num+=1;
               myReleaseActivityList(num);
            }
            
        })
    })

