// JavaScript Document
    //注：div的id名称最好不要改，要改的话在handlers.js文件中也要进行修改，div的名称已经在handlers.js文件中写死
//var imgurl="http://imgapi.nihaott.com";
var imgurl="http://ttimgapitest.nihaott.com";
var imgulr="http://ttimgapitest.nihaott.com";
var swfu;
var swfu1;
var swfu2;
var swf3;
var swf4;//修改图片
var picObj=null;
//修改产品描述图片
$("#detailContent").on("mouseover",".imgOutBox",function(){
    var len=$(this).find("#SWFUpload_4").length;
    if(len==0)
    {
        $("#SWFUpload_4").insertAfter($(this).children("a:eq(0)"));
        $("#SWFUpload_4").css({"display":"block"});
    }
    picObj=this;
});
//删除图片
function delPic(th,flag)
{
    var len=$(th).parent("div").find("#SWFUpload_4").length;
    var result="";
    if(len>0)
    {
        $("#SWFUpload_4").insertAfter($("#anchor"));
    }
    $(th).parent("div").remove();
    if(flag==1)
    {
        var str=$(th).parent("div").find("img").attr("src");
        /*str=str.replace("http://imgapi.nihaott.com","").trim();
        var sc=$("#firstUrl").attr("src").replace("http://imgapi.nihaott.com","").trim();*/
        str=str.replace(imgulr,"").trim();
        var sc=$("#firstUrl").attr("src").replace(imgulr,"").trim();
        var urls=$("#hold-pro-img").val().split('|');
        for(var i=0;i<urls.length-1;i++)
        {
            if(urls[i]!=str)
            {
                result+=urls[i]+"|"
            }
        }
        $("#hold-pro-img").val(result);
        $("#hold-first-img-url").val("");
        if(sc==str||$("#father").find("img").length==0)
        {
            $("#firstUrl").attr("src","images/img-information2.jpg");
        }
    }
}
//鼠标移到像是操作产品图片的按钮
$("#father").on("mouseover",".set-index-img",function(){
    var len=$(this).find("#SWFUpload_4").length;
    if(len==0)
    {
        $("#SWFUpload_4").insertAfter($(this).children("a:eq(0)"));
        $("#SWFUpload_4").css({"display":"block"});
    }
    picObj=this;
});
    window.onload = function () {
		var setting={
            // 后台设置，设置处理上传的页面
            //upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            upload_url:imgulr+'/Picture/UploadPicture',
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader.png",
            button_placeholder_id:"uploadButton",
            button_width:118,
            button_height:90,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        var setting1={
            // 后台设置，设置处理上传的页面
            upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess1,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader1.png",
            button_placeholder_id:"uploadButton1",
            button_width:375,
            button_height:145,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        var setting2={
            // 后台设置，设置处理上传的页面
            upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess2,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader2.png",
            button_placeholder_id:"uploadButton2",
            button_width:375,
            button_height:145,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        var setting3={
            // 后台设置，设置处理上传的页面
            upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess3,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader2.png",
            button_placeholder_id:"addPic",
            button_width:118,
            button_height:90,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode:SWFUpload.WINDOW_MODE.OPAQUE,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        var setting4={
            // 后台设置，设置处理上传的页面
            upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess4,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader.png",
            button_placeholder_id:"uploadButton4",
            button_width:118,
            button_height:40,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        var setting5={
            // 后台设置，设置处理上传的页面
            upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess5,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader.png",
            button_placeholder_id:"albums",
            button_width:118,
            button_height:90,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        var setting6={
            // 后台设置，设置处理上传的页面
            upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
            file_post_name : "filPicture",
            // 文件上传大小限制设置
            file_size_limit: "3 MB",
            //文件类型设置，多种格式以英文中的分号分开
            file_types: "*.jpg;*.png",
            //文件描述，与弹出的选择文件对话框相关
            file_types_description : "Images file",
            //设置上传文件数量限制
            file_upload_limit: "0",


            //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
            // Event Handler Settings - these functions as defined in Handlers.js
            // The handlers are not part of SWFUpload but are part of my website and control how
            // my website reacts to the SWFUpload events.
            file_queue_error_handler : fileQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            file_dialog_start_handler:fileDialogBegin,
            //upload_progress_handler : uploadProgress,
            upload_error_handler : uploadError,
            upload_success_handler : uploadSuccess6,
            upload_complete_handler : uploadComplete,

            // swfupload.swf flash设置
            flash_url : "js/uploader/swfupload.swf",

            // 上传按钮设置
            button_image_url:"js/uploader.png",
            button_placeholder_id:"firstPic",
            button_width:118,
            button_height:90,
            //button_text : '点击更改',
            //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
            //button_text_top_padding:5,
            //button_text_left_padding:15,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
            /*custom_settings : {
             upload_target: "divFileProgressContainer"
             },*/
            // 是否开启调试模式，调试时可以设置为true，发布时设置为false
            debug: false
        };
        swfu = new SWFUpload(setting);
        swfu1=new SWFUpload(setting1);
        swfu2=new SWFUpload(setting2);
        swf3=new SWFUpload(setting3);
        swf4=new SWFUpload(setting4);
        swf5=new SWFUpload(setting5);
        swf6=new SWFUpload(setting6);
    }
	function fileQueueError(file, errorCode, message) {
	  try {
			var imageName = "error.gif";
			var errorName = "";
			if (errorCode == SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
			  errorName = "最多只能上传3次！";
		}
 
    if (errorName != "") {
      alert(errorName);
      return;
    }
    switch (errorCode) {
    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
      imageName = "zerobyte.gif";
      break;
    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
      imageName = "toobig.gif";
      break;
    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
    default:
      alert(message);
      break;
    }
    //添加图片，注意路径
    //addImage("/swfupload/images/" + imageName);
 
  } catch (ex) {
    this.debug(ex);
  }
}
 function fileDialogBegin()
 {
     $("#pdf4").show();
 }
function fileDialogComplete(numFilesSelected, numFilesQueued) {
  try {
    if (numFilesQueued > 0) {
        $("#pdf4").show();
      this.startUpload();
    }
    else
    {
        $("#pdf4").hide();
    }
  } catch (ex) {
    this.debug(ex);
  }
}
 
/*function uploadProgress(file, bytesLoaded) {
 
  try {
    var percent = Math.ceil((bytesLoaded / file.size) * 100);
 
    var progress = new FileProgress(file, this.customSettings.upload_target);
    progress.setProgress(percent);
    if (percent === 100) {
      progress.setStatus("正在创建缩略图...");
      progress.toggleCancel(false, this);
    } else {
      progress.setStatus("正在上传...");
      progress.toggleCancel(true, this);
    }
  } catch (ex) {
    this.debug(ex);
  }
}*/
 var imgUrls="http://imgapi.nihaott.com";
function uploadSuccess(file, serverData) {
  try {
    //添加缩略图~~~
    //修改这里来设置生成缩略图的页面
    //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
	var obj=JSON.parse(serverData);//获取的结果数据json
      if(obj.Result==-99)
      {
          alert(obj.Message);
      }
      else
      {
          $("#pdf4").hide();
          var reaPathUrl=obj.SaveUrl;
          var absPathUrl=imgurl+reaPathUrl;
          $("#hold-upload-img-url").val(reaPathUrl);
          var str="";
          str+=$("#hold-pro-img").val()+reaPathUrl+"|";
          $("#hold-pro-img").val(str);
          $("#imgHead").attr("src",absPathUrl);
          $("#headerUrl").val(reaPathUrl);
          //把上传图片的相对路径放在一个隐藏域里，ajax传入服务器的时候直接在其取值
          $(".l-header-photo").attr("src",absPathUrl);//页面显示必须是绝对路径
          $("#father").append("<div class='set-index-img'><img id='pro-add-img' style='width: 100px;height: 100px;'/><a class='set-first-img' onclick='delPic(this,1)'>×</a></div>");
          $("#pro-add-img").attr("src",absPathUrl);
          $(".set-index-img").css("clear","none");
          $(".set-index-img:last").css("clear","both");
      }
    //var progress = new FileProgress(file, this.customSettings.upload_target);
   // progress.setStatus("缩略图创建成功！");
   // progress.toggleCancel(false);
  } catch (ex) {
    this.debug(ex);
  }
}
function uploadSuccess1(file, serverData) {
    try {
        //添加缩略图~~~
        //修改这里来设置生成缩略图的页面
        //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
        var obj=JSON.parse(serverData);//获取的结果数据json
        if(obj.Result==-99)
        {
            alert(obj.Message);
        }
        else
        {
            $("#pdf4").hide();
            var url=obj.SaveUrl;
            $("#hold-front-img").val(url);
            $("#IDcard-front-img").attr("src",imgurl+url);
        }
        //var progress = new FileProgress(file, this.customSettings.upload_target);
        // progress.setStatus("缩略图创建成功！");
        // progress.toggleCancel(false);
    } catch (ex) {
        this.debug(ex);
    }
}
function uploadSuccess2(file, serverData) {
    try {
        //添加缩略图~~~
        //修改这里来设置生成缩略图的页面
        //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
        var obj=JSON.parse(serverData);//获取的结果数据json
        if(obj.Result==-99)
        {
            alert(obj.Message);
        }
        else
        {
            $("#pdf4").hide();
            var url=obj.SaveUrl;
            $("#hold-behind-img").val(url);
            $("#IDcard-behind-img").attr("src",imgurl+url);

        }
        //var progress = new FileProgress(file, this.customSettings.upload_target);
        // progress.setStatus("缩略图创建成功！");
        // progress.toggleCancel(false);
    } catch (ex) {
        this.debug(ex);
    }
}
function uploadSuccess3(file, serverData) {
    try {
        //添加缩略图~~~
        //修改这里来设置生成缩略图的页面
        //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
        var obj=JSON.parse(serverData);//获取的结果数据json
        if(obj.Result==-99)
        {
            alert(obj.Message);
        }
        else
        {
            $("#pdf4").hide();
            var url=obj.SaveUrl;
            var str="<div class='imgOutBox' name='-1' style='width:100%'><a class='contentBox_Modify' name='1'>修改</a><a class='contentBox_del' name='1' onclick='delPic(this,2)'>删除</a><img src='"+imgurl+url+"'/></div>";
            $("#detailContent").append(str);
            //$("#headerUrl").val(obj.SaveUrl);
        }
        //var progress = new FileProgress(file, this.customSettings.upload_target);
        // progress.setStatus("缩略图创建成功！");
        // progress.toggleCancel(false);
    } catch (ex) {
        this.debug(ex);
    }
}
function uploadSuccess4(file, serverData) {
    try {
        //添加缩略图~~~
        //修改这里来设置生成缩略图的页面
        //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
        var obj=JSON.parse(serverData);//获取的结果数据json
        if(obj.Result==-99)
        {
            alert(obj.Message);
        }
        else
        {
            var url=obj.SaveUrl;
            $(picObj).find("img").attr("src",imgurl+url);
            $("#pdf4").hide();
        }
        //var progress = new FileProgress(file, this.customSettings.upload_target);
        // progress.setStatus("缩略图创建成功！");
        // progress.toggleCancel(false);
    } catch (ex) {
        this.debug(ex);
    }
}
function uploadSuccess5(file, serverData) {
    try {
        //添加缩略图~~~
        //修改这里来设置生成缩略图的页面
        //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
        var obj=JSON.parse(serverData);//获取的结果数据json
        if(obj.Result==-99)
        {
            alert(obj.Message);
        }
        else
        {
            var url=obj.SaveUrl;
            var str=$("#album").val();
            str+=obj.SaveUrl+"|";
            $("#album").val(str);
            $("#albumCons").append('<div class="albumsItem"><a name="'+url+'">×</a><img src="'+imgurl+url+'" style="width:118px;"/></div>');
            $("#pdf4").hide();
        }
        //var progress = new FileProgress(file, this.customSettings.upload_target);
        // progress.setStatus("缩略图创建成功！");
        // progress.toggleCancel(false);
    } catch (ex) {
        this.debug(ex);
    }
}
function uploadSuccess6(file, serverData) {
    try {
        //添加缩略图~~~
        //修改这里来设置生成缩略图的页面
        //addImage("/Handlers/GetThumbHandler.ashx?id=" + serverData);
        var obj=JSON.parse(serverData);//获取的结果数据json
        if(obj.Result==-99)
        {
            alert(obj.Message);
        }
        else
        {
            var url=obj.SaveUrl;
            $("#firstAlbum").val(obj.SaveUrl);
            $("#first").attr("src",imgurl+url);
            $("#pdf4").hide();
        }
        //var progress = new FileProgress(file, this.customSettings.upload_target);
        // progress.setStatus("缩略图创建成功！");
        // progress.toggleCancel(false);
    } catch (ex) {
        this.debug(ex);
    }
}
function uploadComplete(file) {
  try {
    /* I want the next upload to continue automatically so I'll call startUpload here */
    if (this.getStats().files_queued > 0) {
      this.startUpload();
    } else {
      var progress = new FileProgress(file, this.customSettings.upload_target);
      progress.setComplete();
      progress.setStatus("图片上传成功");
      progress.toggleCancel(false);
    }
  } catch (ex) {
    this.debug(ex);
  }
}
 
function uploadError(file, errorCode, message) {
  var imageName = "error.gif";
  var progress;
  try {
    switch (errorCode) {
    case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
      try {
        progress = new FileProgress(file, this.customSettings.upload_target);
        progress.setCancelled();
        progress.setStatus("上传操作被取消");
        progress.toggleCancel(false);
      }
      catch (ex1) {
        this.debug(ex1);
      }
      break;
    case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
      try {
        progress = new FileProgress(file, this.customSettings.upload_target);
        progress.setCancelled();
        progress.setStatus("上传停止！");
        progress.toggleCancel(true);
      }
      catch (ex2) {
        this.debug(ex2);
      }
    case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
      imageName = "uploadlimit.gif";
      break;
    default:
      alert(message);
      break;
    }
 
    addImage("/swfupload/images/" + imageName);
 
  } catch (ex3) {
    this.debug(ex3);
  }
}
 
function addImage(src) {
  var newImg = document.createElement("img");
  newImg.style.margin = "5px";
  document.getElementById("thumbnails").appendChild(newImg);
  if (newImg.filters) {
    try {
      newImg.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
    } catch (e) {
      // If it is not set initially, the browser will throw an error. This will set it if it is not set yet.
      newImg.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + 0 + ')';
    }
  } else {
    newImg.style.opacity = 0;
  }
 
  newImg.onload = function () {
    fadeIn(newImg, 0);
  };
  newImg.src = src;
}
 
function fadeIn(element, opacity) {
  var reduceOpacityBy = 5;
  var rate = 30;  // 15 fps
 
 
  if (opacity < 100) {
    opacity += reduceOpacityBy;
    if (opacity > 100) {
      opacity = 100;
    }
 
    if (element.filters) {
      try {
        element.filters.item("DXImageTransform.Microsoft.Alpha").opacity = opacity;
      } catch (e) {
        // If it is not set initially, the browser will throw an error. This will set it if it is not set yet.
        element.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')';
      }
    } else {
      element.style.opacity = opacity / 100;
    }
  }
 
  if (opacity < 100) {
    setTimeout(function () {
      fadeIn(element, opacity);
    }, rate);
  }
}
 
/* ******************************************
 *  FileProgress Object
 *  Control object for displaying file info
 * ****************************************** */
 
/*function FileProgress(file, targetID) {
  this.fileProgressID = "divFileProgress";
 
  this.fileProgressWrapper = document.getElementById(this.fileProgressID);
  if (!this.fileProgressWrapper) {
    this.fileProgressWrapper = document.createElement("div");
    this.fileProgressWrapper.className = "progressWrapper";
    this.fileProgressWrapper.id = this.fileProgressID;
 
    this.fileProgressElement = document.createElement("div");
    this.fileProgressElement.className = "progressContainer";
 
    var progressCancel = document.createElement("a");
    progressCancel.className = "progressCancel";
    progressCancel.href = "#";
    progressCancel.style.visibility = "hidden";
    progressCancel.appendChild(document.createTextNode(" "));
 
    var progressText = document.createElement("div");
    progressText.className = "progressName";
    progressText.appendChild(document.createTextNode(file.name));
 
    var progressBar = document.createElement("div");
    progressBar.className = "progressBarInProgress";
 
    var progressStatus = document.createElement("div");
    progressStatus.className = "progressBarStatus";
    progressStatus.innerHTML = " ";
 
    this.fileProgressElement.appendChild(progressCancel);
    this.fileProgressElement.appendChild(progressText);
    this.fileProgressElement.appendChild(progressStatus);
    this.fileProgressElement.appendChild(progressBar);
 
    this.fileProgressWrapper.appendChild(this.fileProgressElement);
 
    document.getElementById(targetID).appendChild(this.fileProgressWrapper);
    fadeIn(this.fileProgressWrapper, 0);
 
  } else {
    this.fileProgressElement = this.fileProgressWrapper.firstChild;
    this.fileProgressElement.childNodes[1].firstChild.nodeValue = file.name;
  }
 
  this.height = this.fileProgressWrapper.offsetHeight;
 
}
FileProgress.prototype.setProgress = function (percentage) {
  this.fileProgressElement.className = "progressContainer green";
  this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
  this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.setComplete = function () {
  this.fileProgressElement.className = "progressContainer blue";
  this.fileProgressElement.childNodes[3].className = "progressBarComplete";
  this.fileProgressElement.childNodes[3].style.width = "";
 
};
FileProgress.prototype.setError = function () {
  this.fileProgressElement.className = "progressContainer red";
  this.fileProgressElement.childNodes[3].className = "progressBarError";
  this.fileProgressElement.childNodes[3].style.width = "";
 
};
FileProgress.prototype.setCancelled = function () {
  this.fileProgressElement.className = "progressContainer";
  this.fileProgressElement.childNodes[3].className = "progressBarError";
  this.fileProgressElement.childNodes[3].style.width = "";
 
};
FileProgress.prototype.setStatus = function (status) {
  this.fileProgressElement.childNodes[2].innerHTML = status;
};
FileProgress.prototype.toggleCancel = function (show, swfuploadInstance) {
  this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
  if (swfuploadInstance) {
    var fileID = this.fileProgressID;
    this.fileProgressElement.childNodes[0].onclick = function () {
      swfuploadInstance.cancelUpload(fileID);
      return false;
    };
  }
};*/