
$(document).ready(function(){

    var loadedFlag = false; // 加载完成标识(全局变量，true：加载完成，false：正在加载)
    var finishFlag = true; // 全部列表数据查询完毕标识(全局变量，true：加载完毕，false：尚有数据)

    var params = {
        keyWord: "", // 找帮助名称(可不传，默认为null;搜索时用到)
        // helpType   : helpType, // 求助类别(传中文，54:贫困助学; 53:重症救助; 52:灾害救助; 51:志愿服务; 50:残障帮助; 49:微心愿)
        // auditStatus: auditStatus, // 审核状态(1-求助中;2-已解决)
        page: 1, // 当前页码
        rows: 6, // 每页记录数
        // sort: undefined, // 排序字段(可不传)
        // order: undefined // 排序方式(可不传，desc 降序 asc升序)
    };


    /**
     * 渲染帮助列表
     * @param $listContent {jq} 列表包裹父容器(jq对象)
     * @param comments {array} 帮助列表
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function render_helplist($listContent, helps, isClear) {
        var html = '';
        for (var i = 0; i < helps.length; i++) {
            var item = helps[i];
            // var createTime = new Date(help.createTime).format('yyyy/MM/dd hh:mm');
            var imgUrl = item.imageUrl ? item.imageUrl : '../../public/img/default_avator.png';
            // var date = new Date(item.askTime).format('yyyy-MM-dd hh:mm:ss');
            html+='<div class="item">'
            html+=' <div class="topicImages">'
            html+='  <a href="find_consult_famousDetail.html?quId='+item.quId+'">'
            html+='   <img src="'+ Utils.compressByAli(imgUrl, 200, 690) +'" />'
            html+='  </a>'
            html+=' </div>'
            html+=' <p class="topicText">'
            html+='  <a href="find_consult_famousDetail.html?quId='+item.quId+'">'+item.title+'</a>'
            html+=' </p>'
            html+=' <div class="bottomBox clearfix">'
            html+='  <span class="topicType fl color2185cf">'+item.categoryName+'</span>'
            html+='  <span class="topicPeople fl">'+item.realname+'</span>'
            html+='  <div class="join_in fr clearfix">'
            html+='   <span class="join_in_number fl"><em>'+item.commentsNum+'</em>人参与</span>'
            html+='   <a href="javascript:;"onclick="likeReplyCommit('+item.quId+')" class="dianzan fl">'+item.likesNum+'</a>'
            html+='  </div>'
            html+=' </div>'
            html+='</div>'
        }

        if(isClear) {
            $listContent.html(html); // 替换当前内容
            return;
        }

        $listContent.append(html); // 向后添加当前内容
    }

    /**
     * 加载帮助列表并渲染页面
     * @param fun {function} 加载帮助函数
     * @param params {obj} 加载帮助函数的参数
     * @param $listContent {jq} 渲染页面的jq对象
     * @param isClear {bool} 是否清空之前的内容(true：清空，false：不清空)
     */
    function loadHelpList(fun, params, $listContent, isClear) {
        // 获取推荐服务帮助列表
        fun(params).then(function (data) {
            var helps = data.rows;
            console.log('找咨询', data);

            // if(params.page == 1) { // 第一页
            //     $('#total_help').append('(' + data.total + ')'); // 帮助名称后面添加总记录数
            // }

            render_helplist($listContent, helps, isClear); // 渲染帮助列表
            if(helps && helps.length >= params.rows) { // 全部列表数据尚未查询完毕
                finishFlag = false; // 全部列表数据尚未查询完毕，可以继续查询(全局变量)
                return;
            }

            finishFlag = true; // 全部列表数据查询完毕，禁止继续查询(全局变量)
            // 全部列表数据查询完毕
            $listContent.append('<div class="morebtn color333">全部数据加载完毕</div>');

        }).always(function () {
            params.page++; // 页码自增
            loadedFlag = true; // 设置加载完成(全局变量)
        });
    }

    loadHelpList(FindConsultApi.searchMrwbQuesList, params, $('#mrwbQuesList')); // 加载帮助列表并渲染页面

// var loadedFlag = true; // 加载完成标识(true：加载完成，false：正在加载)
// 监控窗口滚动事件(滑动滚动条自动加载事件)
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); // 滚动高度(范围：0 ~ 内容高度-可见高度)
        var scrollHeight = $(document).height(); // 内容高度(可见高度+可滚动高度)
        var windowHeight = $(this).height(); // 可见高度
        // 滑动滚动条 大于等于 80%，并且加载完成为true时，执行接口
        if (scrollTop/(scrollHeight - windowHeight) >= 0.8 && loadedFlag && !finishFlag) {
            loadedFlag = false; // 设置正在加载，避免重复
            loadHelpList(FindConsultApi.searchMrwbQuesList, params, $('#mrwbQuesList')); // 加载帮助列表并渲染页面
        }
    });


// 点击 '搜索' 按钮
    $('#ridiv').click(function () {

        params.keyWord = $('#keyWord').val();
        
        if(!params.keyWord) {
            $.alert('请输入关键字');
            return;
        }
        loadHelpList(FindConsultApi.searchMrwbQuesList, params, $('#mrwbQuesList'), true); // 加载帮助列表并渲染页面
    });

});
//是专家才能创建话题
Qnzs.getSessionAccount({}).then(function (data) {
    
     console.log('账号111',data)
    if (data.status == 'OK') {
        var username = data.account.username;
        // console.log('名人用户名',username)
        FindConsultApi.findAccountByIdmr({username:username}).then(function (data) {
            var type = data.rows.type;
            if(type==3){
                $('.createTopicIcon').show()
            }

        })
    }
})
function wapMrwbAskQues() {
    window.location.href = 'find_consult_famousAsk.html' // 跳转到结果列表页
}
//点赞
function likeReplyCommit(quId)
{
    FindConsultApi.operatedCommit({quId:quId,actionType:10}).then(function (data) {
        // console.log('点赞图片')
        $('.dianzan').text(data.likesNum);
        $('.dianzan').toggleClass('cur');

    })
}