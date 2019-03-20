$(document).ready(function(){

    //系统消息
    //统计总消息数
    $('.my_msg').click(function () {

        FindConsultApi.findAllMessage({}).then(function (data) {
            $("#sysmessage_total").text(data.total);//标题
        })

        //系统消息列表
        function createEle(data){
            var status = {
                '0':'未读',
                '1':'<font style="color: #2185cf">已读</font>'
            };
            var html='';
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var imgUrl = data[i].sendPhoto ? data[i].sendPhoto : '../../public/img/default_avator.png';
                var content = item.content.replace(/\[<a\shref=[^PC端]*>移动端<\/a>]/,'');
                html+='<div class="itemCon borderB01 clearfix" onclick="openMessage(this,'+item.receiveId+');" id="messageBox' + item.receiveId + '">';
                html+='<div class="imgDiv fl">';
                html+='<img src="'+imgUrl+'">';
                html+='</div>';
                html+='<div class="rightTxt">';
                html+='<p class="ptop">发件人:<span class="sender">'+data[i].sendName+'</span><em class="sendTime">'+data[i].receiveTime+'</em></p>';
                html+='<a class="title" style="display: none;">'+item.title+'</a>';
                html+='<a class="cont">'+content+'</a>';
                html+='<p class="pbottom">';
                html+='<span class="left">' + item.msgTypeStr + '</span>';
                html+='<span class="left read">'+status[item.status]+'</span>';
                html+='<span class="delete" onclick="delMessage(event, '+data[i].receiveId+');">删除</span>';
                html+='</p>';
                html+='</div>';
                html+='</div>';
            }
            return html;
        }

        function pageCheck(parentCell, contentCell, data) {
            $(parentCell).pageFun({
                contentCell: contentCell, /*包裹数据列表的父容器*/
                maxPage:6,/*显示页码框个数*/
                apiProxy:FindConsultApi.findAllMessage, /*接口函数*/
                data: data,
                listFun: createEle, /*数据列表函数 -- 返回html字符串*/
                arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
            });
        }

        var data = {  /*接口参数*/
            pageNo: 1,//当前页
            pageSize: 18,//显示总页数
            msgType:"", // 站内信类型

        };
        var data_sys = {  /*接口参数*/
            pageNo: 1,//当前页
            pageSize: 18,//显示总页数
            msgType:0, // 站内信类型

        };
        var data_org = {  /*接口参数*/
            pageNo: 1,//当前页
            pageSize: 18,//显示总页数
            msgType:1, // 站内信类型

        };
        var data_user = {  /*接口参数*/
            pageNo: 1,//当前页
            pageSize: 18,//显示总页数
            msgType:2, // 站内信类型

        };
// 分页器插件 -- 求助中
        pageCheck('.pageBoxList', '#list_all', data);
        pageCheck('.pageBoxList_sys', '#list_sys', data_sys);
        pageCheck('.pageBoxList_org', '#list_org', data_org);
        pageCheck('.pageBoxList_user', '#list_user', data_user);

    })
//关闭
    $('#smclose').click(function () {
        $('.sysmessage').hide()
    })
    $('.iclose').click(function () {
        $('.sysmessage').hide()
    })
//	全部标为已读
    $('#allRead').click(function () {
        FindConsultApi.changeStatus({type:'read'}).then(function (data) {
            $('#list_all').find('.rightTxt .pbottom .read').text('已读');
            $('#list_all').find('.rightTxt .pbottom .read').addClass('nored')
            // window.location.reload()
        })
    })
    //全部清空
    $('#allDelete').click(function () {
        FindConsultApi.changeAllStatus({status:'del'}).then(function (data) {
            // $.alert('删除成功')
            // window.location.reload()
        })
    })
    //	设置系统消息已读
    $('#allRead_sys').click(function () {
        FindConsultApi.changeAllStatus({msgType:0,status:'read'}).then(function (data) {
            $('#list_sys').find('.rightTxt .pbottom .read').text('已读');
            $('#list_sys').find('.rightTxt .pbottom .read').addClass('nored')
            // window.location.reload()
        })
    })
    //系统消息清空
    $('#allDelete_sys').click(function () {
        FindConsultApi.changeAllStatus({msgType:0,status:'del'}).then(function (data) {
            // $.alert('删除成功')
            // window.location.reload()
        })
    })
    //	设置组织消息已读
    $('#allRead_org').click(function () {
        FindConsultApi.changeAllStatus({msgType:1,status:'read'}).then(function (data) {
            $('#list_org').find('.rightTxt .pbottom .read').text('已读');
            $('#list_org').find('.rightTxt .pbottom .read').addClass('nored')
            // window.location.reload()
        })
    })
    //组织消息清空
    $('#allDelete_org').click(function () {
        FindConsultApi.changeAllStatus({msgType:1,status:'del'}).then(function (data) {
            // $.alert('删除成功')
            // window.location.reload()
        })
    })
    //	设置用户消息已读
    $('#allRead_user').click(function () {
        FindConsultApi.changeAllStatus({msgType:2,status:'read'}).then(function (data) {
            $('#list_user').find('.rightTxt .pbottom .read').text('已读');
            $('#list_user').find('.rightTxt .pbottom .read').addClass('nored')
            // window.location.reload()
        })
    })
    //用户消息清空
    $('#allDelete_user').click(function () {
        FindConsultApi.changeAllStatus({msgType:2,status:'del'}).then(function (data) {
            // $.alert('删除成功')
            // window.location.reload()
        })
    })

});//文档准备结束
//查看
function openMessage(cur, receiveId) {

    var sender = $(cur).find('.rightTxt .ptop .sender').text(); // 发送人
    var sendTime = $(cur).find('.rightTxt .ptop .sendTime').text(); // 发送时间
    var content = $(cur).find('.rightTxt .cont').text(); // 发送内容
    var title = $(cur).find('.rightTxt .title').text(); // 发送标题

    // 渲染消息弹出框
    $('.sysmessage #sendName').text(sender); // 发送人
    $('.sysmessage #sendTime').text(sendTime); // 发送时间
    $('.sysmessage #title').text(title); // 发送内容
    $('.sysmessage #content').text(content); // 发送标题

    $('.sysmessage').show();

//	标为已读
    FindConsultApi.changeStatus({receiveId:receiveId,type:'read'}).then(function (data) {
        $(cur).find('.rightTxt .pbottom .read').text('已读');
        $(cur).find('.rightTxt .pbottom .read').addClass('nored')
    })
}

//删除
function delMessage(event, receiveId) {
    event.stopPropagation();//阻止点击事件向上冒泡
    FindConsultApi.changeStatus({receiveId:receiveId,type:'del'}).then(function (data) {
        $.alert('删除成功');
        // window.location.reload()
    });

    // return false;
}