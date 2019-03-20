
    var pageNo = 0;
    /*项目列表*/
    function project_item_list(){
        var pageSize = 4;
        obj.ajax('/project/myJoinActivityList',{},function(data){
        console.log(data);
        createE(data.rows);


     },function(data){console.log(1);});
        function createE(data){
            var html='';
            for (var i = 0; i < data.length; i++) {
//              html+='<a href="'+base+'/project/activityDetail?activityId='+data[i].id+'" target="_blank">'
            if(data[i].externalLinksPc == ''){
				if (data[i].templateName == "model1") {
					html += '<a href="view/heavy_project/heavy_project_model1_index.html?activityId=' + data[i].id + '">'
				} else {
					html += '<a href="view/heavy_project_model2/zbxm_index_model_2.html?activityId=' + data[i].id + '">'
				}
			}else{
				html += '<a href="' + data[i].externalLinksPc + '" target="_blank">'
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
                }else if(data[i].stage==2 || data[i].stage==5){
                    html+='<span class="xm_state fr clearfix">报名中</span>'
                }else if(data[i].stage==3){
                    html+='<span class="xm_state fr clearfix">投票中</span>'
                }else{
                    html+='<span class="xm_state fr clearfix">未开始</span>'
                }
                /*html+='     <span class="xm_time fr clearfix"><i class="rest fl">剩</i><i class="day fl">12天4小时</i></span>'*/
                html+='    </p>'
                html+='   </div>'
                html+='  </div>'
                html+=' </div>'
                html+='</a>'
            };
            $('.project_item_list').append(html)
            $('.xm_state').each(function(index, el) {
                if(!$(el).hasClass('color999')){
                    $(el).css('color','#3dba2b');
                }
            });

        }

    }
    project_item_list();

