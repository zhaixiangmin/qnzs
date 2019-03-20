$(function(){
          $('#edit1').editable({
              inlineMode: false, alwaysBlank: true,
              language: "zh_cn",
              imageUploadURL: 'lib/imgupload.php',//上传到本地服务器
              imageUploadParams: {id: "edit"},
              imageDeleteURL: 'lib/delete_image.php',//删除图片
              imagesLoadURL: 'lib/load_images.php' ,//管理图片
                height: '320px' //高度
            }).on('editable.afterRemoveImage', function (e, editor, $img) {
               // Set the image source to the image delete params.        
               editor.options.imageDeleteParams = {src: $img.attr('src')};
               // Make the delete request
             editor.deleteImage($img);
           });
            $('#edit2').editable({
              inlineMode: false, alwaysBlank: true,
              language: "zh_cn",
              imageUploadURL: 'lib/imgupload.php',//上传到本地服务器
              imageUploadParams: {id: "edit"},
              imageDeleteURL: 'lib/delete_image.php',//删除图片
              imagesLoadURL: 'lib/load_images.php',//管理图片
              height: '320px' //高度
            }).on('editable.afterRemoveImage', function (e, editor, $img) {
               // Set the image source to the image delete params.        
               editor.options.imageDeleteParams = {src: $img.attr('src')};
               // Make the delete request
             editor.deleteImage($img);
           });
});