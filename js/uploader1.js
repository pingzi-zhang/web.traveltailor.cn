// JavaScript Document
    //注：div的id名称最好不要改，要改的话在handlers.js文件中也要进行修改，div的名称已经在handlers.js文件中写死
//var imgurl="http://imgapi.nihaott.com";
var imgurl="http://ttimgapitest.nihaott.com";
var swfu;
    window.onload = function () {
		var setting={
        // 后台设置，设置处理上传的页面
        //upload_url: "http://imgapi.nihaott.com/Picture/UploadPicture",
        upload_url: imgurl+"/Picture/UploadPicture",
		    file_post_name : "filPicture",
        // 文件上传大小限制设置
        file_size_limit: "3 MB",
        //文件类型设置，多种格式以英文中的分号分开
        file_types: "*.jpg;*.png",
        //文件描述，与弹出的选择文件对话框相关
        file_types_description : "Images file",
        //设置上传文件数量限制
        file_upload_limit: "2",
 
        //事件处理程序，最好不要改，事件处理程序已在handlers.js文件中定义
        // Event Handler Settings - these functions as defined in Handlers.js
        // The handlers are not part of SWFUpload but are part of my website and control how
        // my website reacts to the SWFUpload events.
        file_queue_error_handler : fileQueueError,
        file_dialog_complete_handler : fileDialogComplete,
        //upload_progress_handler : uploadProgress,
        upload_error_handler : uploadError,
        upload_success_handler : uploadSuccess,
        upload_complete_handler : uploadComplete,

        // swfupload.swf flash设置
        flash_url : "js/uploader/swfupload.swf",
 
        // 上传按钮设置
        button_image_url:"js/uploader/uploader.png",
        button_placeholder_id:"uploadButton",
            button_cursor : SWFUpload.CURSOR.HAND,
        button_width:90,
        button_height:40,
        //button_text : '点击更改',
        //button_text_style : '.confirmBt{font-family:Microsoft YaHei;font-size: 14pt;color:red;}',
        //button_text_top_padding:5,
        //button_text_left_padding:15,
        //button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        //button_cursor: SWFUpload.CURSOR.HAND,

            //自定义的其他设置
        /*custom_settings : {
          upload_target: "divFileProgressContainer"
        },*/
        // 是否开启调试模式，调试时可以设置为true，发布时设置为false
        debug: false
      };
      
      swfu = new SWFUpload(setting);
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
function fileDialogComplete(numFilesSelected, numFilesQueued) {
  try {
    if (numFilesQueued > 0) {
      this.startUpload();
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
          var url=obj.SaveUrl;
          $("#headerUrl").val(obj.SaveUrl);
          $("#imgHead").attr("src",imgurl+url);
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