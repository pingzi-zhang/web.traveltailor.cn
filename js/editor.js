var editor;
KindEditor.ready(function (K) {
    editor = K.create('#pDescription', {
        cssPath: 'js/kindeditor-4.1.10/plugins/code/prettify.css',
        height:"300px",
        width:"248px",
        minWidth:"248px",
        items: [
            'justifyleft', 'justifycenter', 'justifyright','insertorderedlist', 'insertunorderedlist',
            'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'bold',
            'italic', 'underline','lineheight', 'table', 'hr','link', 'unlink'
        ],
        cssData:'body{color:#999999;}',
        resizeType:0
    });
    $("#saveButton").click(function(){//添加个人描述
        if(editor.html().replace(/(^\s*)|(\s*$)/g,"")!="")
        {
            if(modal==null)
            {
                var str="<div class='imgOutBox' name='1' title='点击修改' style='margin:0;'>"+editor.html()+"</div>";
                $("#detailContent").append(str);
                editor.html("");
                $("#textContainer").hide();
                $(".description").remove();
            }
            else
            {
                $(modal).html(editor.html());
                editor.html("");
                $("#textContainer").hide();
            }
        }
        else
        {
            if(modal!=null)
            {
                $(modal).remove();
                editor.html("");
                $("#textContainer").hide();
            }
        }
    });
});
