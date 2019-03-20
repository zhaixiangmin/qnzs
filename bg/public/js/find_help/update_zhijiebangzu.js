//
var id = getUrlParam('hpid');//2330的
var ID =getUrlParam('ID')//通过2330获取的id
//获取详情
$.ajax({
    type: 'POST',
    url:Qnzs.path+'/bg/help/getHelpAuditById',
    data:{id:ID,status:6},
    dataType:'json',
    success: function (data) {
        console.log(data)
        $('#content_direct').val(data.rows_helpAudit.content)//内容
        $('#upd_fileUrl').val(data.rows_helpAudit.fileUrl)//文件


        //获取图片数组
        var imgAttr= data.rows_helpAudit.imgUrl.split(",");  //新数组
        //回显图片
        if(imgAttr.length > 0){
            var html = "";
            for(var i= 0;i<imgAttr.length;i++){
                html+="<div>"
                html+='    <div style="width: 150px;height: 150px; border: 1px solid #000000;">'
                html+=        ' <img  id="imgFile'+(i+1)+'"   src="'+imgAttr[i]+'"  style="width: 150px;height: 150px;">'
                html+=   '</div>'
                html+=   '<div class="content">'
                html+=       '<div class="step photoUpload clearfix ">'
                html+=       '<a class="upload"> <!-- accept="application/msword,aplication/zip" -->'
                html+=          '<input type="file" style="float: left;"class="uploadFileBtn" id="up_img_file'+(i+1)+'"  name="up_file_1" multiple="multiple" onchange="uploadFile()"/>'
                html+=           '<input type="hidden" class="hidd_imgUrl" id="hidd_fileUrl'+(i+1)+'"  name="fileUrl" value="'+imgAttr[i]+'"  />'
                html+=       '</a>'
                html+=       '</div>'
                html+=   '</div>'
                html+=    '</div>'

            }
            $('#img_ul').append(html);

        }else{


        }
       console.log(imgAttr);
        $('#up_img_file1').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile1').attr("src",data.result.url); //附件地址
                $('#hidd_fileUrl1').val(data.result.url);

            },
            fail: function() {
                $.alert('出错');
            }
        });
        $('#up_img_file2').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile2').attr("src",data.result.url); //附件地址
                $('#hidd_fileUrl2').val(data.result.url);
            },
            fail: function() {
                $.alert('出错');
            }
        });
        $('#up_img_file3').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile3').attr("src",data.result.url); //附件地址
                $('#hidd_fileUrl3').val(data.result.url);
            },
            fail: function() {
                $.alert('出错');
            }
        });
        $('#up_img_file4').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile4').attr("src",data.result.url); //附件地址
                $('#pickFileBtnNext_1').html("上传成功");
                $('#hidd_fileUrl4').val(data.result.url);
            },
            fail: function() {
                $.alert('出错');
            }
        });
        $('#up_img_file5').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile5').attr("src",data.result.url); //附件地址
                $('#hidd_fileUrl5').val(data.result.url);
            },
            fail: function() {
                $.alert('出错');
            }
        });
        $('#up_img_file6').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile6').attr("src",data.result.url); //附件地址
                $('#hidd_fileUrl6').val(data.result.url);
            },
            fail: function() {
                $.alert('出错');
            }
        }); $('#up_img_file7').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#imgFile7').attr("src",data.result.url); //附件地址
                $('#hidd_fileUrl7').val(data.result.url);
            },
            fail: function() {
                $.alert('出错');
            }
        });
        $('#up_img_file8').fileupload({
            url: base + '/file_upload',
            dataType: 'json',
            autoUpload: true,
            done: function(e, data) {

                $.alert("上传成功");
                $('#fileUrl').val(data.result.url); //附件地址
                $('#pickFileBtnNext_1').html("上传成功");
                console.log(data.result.url)
                straight_help_file= data.result.url;
//					 alert(straight_help_file)
                console.log(data.result.url);

                var file_attr = straight_help_file.split('/');  //获取文件命
                file_name = file_attr[file_attr.length-1];
            },
            fail: function() {
                $.alert('出错');
            }
        });




    }
});

//直接帮助
var straight_help_file= '';
var imgUrls = '';
var file_name ='' ;

var help_direct_flay =true ;
$('#help_direct_btn').click(function(){
    console.log($('.hidd_imgUrl').length);
    //存储图片数组
    var imgAttr = [];
    for (var i = 0;i<$('.hidd_imgUrl').length;i++){

        imgAttr.push( $('.hidd_imgUrl').get(i).value) ; //存入数组

    }
     console.log(imgAttr)



    imgUrls = $('#imgUrl').text();

    if(help_direct_flay){

        help_direct_flay =false ;
        obj.ajax('/bg/help/updateHelpAudit',{ //修改帮助详情
            'idsStr': id,
            'content':$('#content_direct').val(),//内容
            'fileUrl': $('#upd_fileUrl').val(), //文件
            'imageUrl':imgAttr.toString(),//imgUrls,图片
            'fileName':file_name

        },function(data){
            help_direct_flay =true ;
            console.log(data);
            if(data.status =='OK'){
                $.alert(data.msg);

                window.location.href = 'find_help.html?limit=help_accept,help_back,help_collecting,help_direct,help_finish,help_delete,help_update,help_view,help_disabled,help_modification,update_detail_btn';

            }
        })
    }
})
//取消
$('#cancl').click(function(){
    window.location.href = 'find_help.html?limit=help_accept,help_back,help_collecting,help_direct,help_finish,help_delete,help_update,help_view,help_disabled,help_modification';

})