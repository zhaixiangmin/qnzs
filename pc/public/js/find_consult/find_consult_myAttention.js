
var HuiTie = {};
HuiTie.findServiceReplyAcc= function(data) {
    return Qnzs.ApiProxy('/bg/serviceQuestion/findServiceReplyAcc', data, '获取回帖列表',1);
};

$(document).ready(function(){
    //我的发布 咨询
    $('.my_release').click(function () {
        function createEle(data) {
            var num = 4;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var imgUrl = data[i].photourl ? data[i].photourl : '../../public/img/default_avator.png';
                html += '<a onclick="goDetail(' + data[i].quId + ')" class="itemBox bgcWhite">';
                html += ' <div class="itemCon borderB01 clearfix">';
                html += '  <div class="imgDiv fl"><img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'"></div>';
                html += '  <div class="rightTxt">';
                html += '   <h3 class="font16 color2185cf">'+data[i].title+'</h3>';
                html += '   <p class="color000">'+data[i].askContent+'</p>';
                html += '   <div class="botBox clearfix">';
                html += '    <div class="left fl">';
                html += '     <span class="span01 borderR01">'+data[i].realname+'</span>';
                html += '     <span class="span03">'+data[i].askTime+'</span>';
                html += '    </div>';
                html += '    <span class="right fr color333 pinglun">'+data[i].commentsNum+'</span>';
                html += '    <span class="right fr color333 delete" onclick="deleteQuestion(event, ' + data[i].quId + ')" style=" background-position: left center; background-repeat: no-repeat; background-size: 16px auto; background-image: url(../../public/img/talk_delete.png); color: #333; cursor: pointer; margin-right: 15px; overflow: hidden; padding-left: 18px;">删除</span>';
                html += '   </div>';
                html += '  </div>';
                html += ' </div>';
                html += '</a>';
            }
            return html;
        }

        function pageCheck(parentCell, contentCell, data) {
            $(parentCell).pageFun({
                contentCell: contentCell, /*包裹数据列表的父容器*/
                maxPage:6,/*显示页码框个数*/
                apiProxy:FindConsultApi.getMyQuestions, /*接口函数*/
                data: data,
                listFun: createEle /*数据列表函数 -- 返回html字符串*/
            });
        }

        var data_fbzx = {  /*接口参数*/
            page: 1, //当前页
            rows: 18, //显示总页数
            dataType:'publish' // 站内信类型

        };
        pageCheck('.fbzx_pageBoxList', '#list_fbzx', data_fbzx);





    });





    //我的收藏 咨询
    $('.my_collection').click(function () {

        function createEle(data) {
            console.log(data)
            var num = 4;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var imgUrl = data[i].photourl ? data[i].photourl : '//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171009/20171009163424_965243805.png';
                if(data[i].photourl!=null){
                    var imgUrl ='';
                    var  s1 = data[i].photourl.split('/');
                    if(s1[0] !='http:'){
                        imgUrl ='//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171009/20171009163424_965243805.png';
                    }else{
                        imgUrl =data[i].photourl ;
                    }
                }else{
                    imgUrl ='//wgj-web-admin.oss-cn-shenzhen.aliyuncs.com/temp/image/20171009/20171009163424_965243805.png';
                }
                html += '<a href="../find_consult/find_consult_quesdetail.html?quId='+data[i].quId +'" class="itemBox bgcWhite ">';
                html += ' <div class="itemCon borderB01 clearfix">';
                html += '  <div class="imgDiv fl">';
                html += '   <img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'">';
                html += '  </div>';
                html += '  <div class="rightTxt">';
                html += '   <h3 class="font16 color2185cf">'+data[i].title+'</h3>';
                html += '   <p class="color000">'+data[i].askContent+'</p>';
                html += '   <div class="botBox clearfix">';
                html += '    <div class="left fl">';
                html += '     <span class="span01 borderR01">'+data[i].realname+'</span>';
                //html += '     <span class="span02">'+data[i].categoryName+'</span>';
                html += '     <span class="span03">'+data[i].askTime+'</span>';
                html += '    </div>';
                html += '    <span class="right fr color333 pinglun">'+data[i].commentsNum+'</span>';
                html += '   </div>';
                html += '  </div>';
                html += ' </div>';
                html += '</a>';

            };
            return html;

        }
        function pageCheck(parentCell, contentCell, data) {
            $(parentCell).pageFun({
                contentCell: contentCell, /*包裹数据列表的父容器*/
                maxPage:6,/*显示页码框个数*/
                apiProxy:FindConsultApi.getMyQuestions, /*接口函数*/
                data: data,
                listFun: createEle, /*数据列表函数 -- 返回html字符串*/
                arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
            });
        }

        var data_sczx = {  /*接口参数*/
            page: 1, //当前页
            rows: 18, //显示总页数
            dataType:'collect' // 站内信类型

        };
        pageCheck('.sczx_pageBoxList', '#list_cszx', data_sczx);
    });
    //我的关注 组织
    $('.my_attention').click(function () {

        function createEle_org(data) {
            var num = 4;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var imgUrl = data[i].photoUrl ? data[i].photoUrl : '../../public/img/default_avator.png';
                html += '<a href="../organization/organization_detail.html?oid=' + data[i].oid + '" class="bgcWhite guanzhu_list clearfix fl">';
                html += ' <div class="imgDiv fl guanzhu_l">';
                html += '  <img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_100') +'" />';
                html += ' </div>';
                html += ' <div class="rightTxt fl guanzhu_r">';
                html += '  <p class="font14 color000">'+data[i].name+'</p>';
                html += '  <p class="wenti">已解答<span>'+data[i].answerQuestionCount+'</span>个问题</p>';
                html += '  <span class="conBgc01 font12 colorfff tiwen">向TA提问</span>';
                html += ' </div>';
                html += '</a>';
            }
            return html;

        }
        function pageCheck_org(parentCell, contentCell, data) {
            $(parentCell).pageFun({
                contentCell: contentCell, /*包裹数据列表的父容器*/
                maxPage:6,/*显示页码框个数*/
                apiProxy:FindConsultApi.followedList, /*接口函数*/
                data: data,
                listFun: createEle_org, /*数据列表函数 -- 返回html字符串*/
                arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
            });
        }

        var data_focus = {  /*接口参数*/
            pageIndex: 1, //当前页
            pageSize: 18 //显示总页数


        };
        pageCheck_org('.focus_pageBoxList', '#focusList_org', data_focus);
        //我的关注 专家
        function createEle(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                var imgUrl = data[i].photoUrl ? data[i].photoUrl : '../../public/img/default_avator.png';
                html += '<a href="../find_consult/find_consult_wzj_detail.html?username=' + data[i].username + '" class="bgcWhite guanzhu_list clearfix fl">';
                html += ' <div class="imgDiv fl guanzhu_l">';
                html += '  <img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" />';
                html += ' </div>';
                html += ' <div class="rightTxt fl guanzhu_r">';
                html += '  <p class="font14 color000">'+data[i].realname+'</p>';
                html += '  <p class="wenti">已解答<span>'+data[i].answerQuestionCount+'</span>个问题</p>';
                html += '  <span class="conBgc01 font12 colorfff tiwen">向TA提问</span>';
                html += ' </div>';
                html += '</a>';
            }
            return html;

        }
        function pageCheck(parentCell, contentCell, data) {
            $(parentCell).pageFun({
                contentCell: contentCell, /*包裹数据列表的父容器*/
                maxPage:6,/*显示页码框个数*/
                apiProxy:FindConsultApi.followedExpertList, /*接口函数*/
                data: data,
                listFun: createEle, /*数据列表函数 -- 返回html字符串*/
                arg: undefined  /*数据列表函数 的参数-可以是对象或数组等等*/
            });
        }

        var data_focuszj = {  /*接口参数*/
            page: 1, //当前页
            rows: 18 //显示总页数
        };
        pageCheck('.focuszj_pageBoxList', '#focusList_zj', data_focuszj);
    });
    /*我要吐槽*/
    $('#submitComplain_tucao').click(function() {

        var quesContent = $('#quesContent').val()
        FindConsultApi.woyaoTucao({
            quesContent: quesContent
        }).then(function(data) {
            $.alert('拍砖成功！')
        })
        //}
    })
});//文档准备结束


function goDetail(quId) {
    window.location.href = '../find_consult/find_consult_quesdetail.html?quId=' + quId; // 跳转到咨询详情
}

/**
 * 删除问题
 * @param event {object} 事件
 * @param quId {int} 问题ID
 */
function deleteQuestion(event, quId) {
    event.stopPropagation();//阻止点击事件向上冒泡
    Qnzs.getSessionAccount({}).then(function (data) {
        if (data.status != 'OK') {
            $.alert(data.msg);
            return;
        }

        var account = data.account;

        // 问题管理删除
        FindConsultApi.delete({quId: quId}).then(function (data) {
            $.alert(data.msg).then(function () {
                window.location.reload(); // 刷新当前页面
            });
        });
    });
}


//我的发布 -回帖
function return_tie(){

    function createEle2(data) {
        console.log(data);
        var num = 4;
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var imgUrl = data[i].photourl ? data[i].photourl : '../../public/img/default_avator.png';
            // html += '<a href="../find_consult/find_consult_quesdetail.html?quId='+data[i].quId +'" class="itemBox bgcWhite ">';
            html += '<a onclick="goDetail(' + data[i].quId + ')" class="itemBox bgcWhite">';
            html += ' <div class="itemCon borderB01 clearfix">';
            html += '  <div class="imgDiv fl" style="width:80px;height:80px;border-radius:500%;"><img src="'+ Utils.compressByAli(imgUrl, '?x-oss-process=image/resize,m_mfit,h_80,w_80') +'" style="width:80px;height:80px;border-radius:500%;"></div>';
            html += '  <div class="rightTxt" style="padding-left:110px;">';
            html += '   <h3 class="font16 color2185cf">'+data[i].title+'</h3>';
            html += '   <p class="color000">'+data[i].askContent+'</p>';
            html += '   <div class="botBox clearfix">';
            html += '    <div class="left fl">';
            html += '     <span class="span01 borderR01">'+data[i].realname+'</span>';
            //html += '     <span class="span02" >'+data[i].categoryName+'</span>';
            html += '     <span class="span03">'+data[i].askTime+'</span>';
            html += '    </div>';
            html += '    <span class="right fr color333 pinglun">'+data[i].commentsNum+'</span>';
//				html += '    <span class="right fr color333 delete" onclick="deleteQuestion(event, ' + data[i].quId + ')" style=" background-position: left center; background-repeat: no-repeat; background-size: 16px auto; background-image: url(../../public/img/talk_delete.png); color: #333; cursor: pointer; margin-right: 15px; overflow: hidden; padding-left: 18px;">删除</span>';
            html += '   </div>';
            html += '  </div>';
            html += ' </div>';
            html += '</a>';
        }
        return html;
    }

    function pageCheck(parentCell, contentCell, data) {
        $(parentCell).pageFun({
            contentCell: contentCell, /*包裹数据列表的父容器*/
            maxPage:6,/*显示页码框个数*/
            apiProxy:HuiTie.findServiceReplyAcc, /*接口函数*/
            data: data,
            listFun: createEle2 /*数据列表函数 -- 返回html字符串*/
        });
    }

    var data_fbht = {  /*接口参数*/
        page: 1, //当前页
        rows: 10, //显示总页数
        dataType:'publish' // 站内信类型

    };
    pageCheck('.fbht_pageBoxList', '#list_fbht', data_fbht);



}
