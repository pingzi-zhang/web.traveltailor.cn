/**
 * Created by Administrator on 2016/7/27.
 */
//var sUrl="http://192.168.10.130:801";
//var sUrl="http://192.168.10.10:8011";
var sUrl=jsgDataServer + jsgDataVisit;
var tUrl=jsgImageServer+'/Picture/GetGraphicCode';
//var sUrl="http://webapi.nihaott.com";
/*step1:*/
/***************1、手机号失去焦点验证(点击下一步还要进行验证，下面统一写)*********************/
$("#phone-number").blur(function(){
    var reg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;
    if(!reg.test($(this).val())){
        $("#phone-number-tip").html("请输入正确的手机号码").prev().css("display","inline-block");
    }else {
        $("#phone-number-tip").html("").prev().css("display","none");
    }
});
/***************2、短信验证码验证(点击下一步时进行验证，下面统一写)*********************/
//失去焦点验证
/*$("#message").blur(function(){
    if($("#message").val()==""){
        $("#message-tip").html("请输入验证码");
    }else{
        $("#message-tip").html("");
    }
});*/
/******点击获取短信验证码时显示的动态*****/
var timer=null;
function count() {
    var counter=parseInt($("#get-vfycode").val());
    counter--;
    $("#get-vfycode").val(counter+"S后重发");
    if(counter==0){
        $("#message-tip").prev().removeClass("active").css("display","inline-block");
        $("#message-tip").html("如未收到验证码，请重新发送").removeClass("correct").addClass("wrong");
        clearInterval(timer);
        timer=null;
        $("#get-vfycode").val("重获验证码").css("background","#ff9500").removeAttr("disabled");
        counter=parseInt($("#get-vfycode").val());
    }
}
$("#get-vfycode").click(function(){
    var arrParam = { Mobile:$("#phone-number").val()};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Login_SendResetSms", strParam);
    $.ajax({
        type: "post",
        url: sUrl,
        //data: {strMobile:$("#phone-number").val()},
        data:jsgSubmit,
        dataType: "json",
        success: function (data) {
            if(data.Result==1){
                $("#message-tip").html("验证码发送成功，10分钟内输入有效").addClass("correct").removeClass("wrong").prev().addClass("active").css("display","inline-block");
                $("#get-vfycode").css("background","#ddd").attr({value:"60S后重发",disabled:"disabled"});
                timer=setInterval(count,1000);
            }else if(data.Result==-1){
                $("#message-tip").prev().removeClass("active").css("display","inline-block");
                $("#message-tip").html(data.Message).removeClass("correct").addClass("wrong");
                return false;
            }else if(data.Result==-99){
                $("#message-tip").prev().removeClass("active").css("display","inline-block");
                $("#message-tip").html(data.Message).removeClass("correct").addClass("wrong");
                return false;
            }
        }
    });
});
/********************3、图片验证***********************************/
//失去焦点验证
$("#image").blur(function(){
    if($("#image").val().toLowerCase()!=$("input#code").val()){
        $("#image-tip").html("图片验证不正确，请重新输入").prev().css("display","inline-block");
    }else {
        $("#image-tip").html("").prev().css("display","none");
    }
});
//网页加载时要显示服务器传过来的验证码
$(function(){
    $.ajax({
        type: "post",
        //url: sUrl+"/Gate/GetGraphicCode",
        //url: 'http://imgapi.nihaott.com:8015/Picture/GetGraphicCode',
        url:tUrl,
        data: {},
        dataType: "json",
        success: function(data){
            if(data.Result==1){
                $("input#code").val(data.Code.toLowerCase());
                $("#image-vrify").attr("src",data.ShowUrl);
            }else if(data.Result==-1){

            }else if(data.Result==-99){

            }
        }
    });
    $("#get-vfycode").click(function () {
        if($("#phone-number").val()==""){
            $("#phone-number-tip").html("请输入电话号码！").prev().css("display","inline-block");
        }
    });
});
//点击时要也要显示服务器传过来的验证码
$("#image-vrify").click(function(){
    $.ajax({
        type: "post",
        //url: sUrl+"/Gate/GetGraphicCode?index="+Math.random(),
        url: tUrl,
        data: {},
        dataType: "json",
        success: function(data){
            if(data.Result==1){
                $("input#code").val(data.Code.toLowerCase());
                $("#image-vrify").attr("src",data.ShowUrl);
            }else if(data.Result==-1){
                console.log(data.Message)
            }else if(data.Result==-99){
                console.log(data.Message)
            }
        },
        error:function(data){
            console.log(data)
        }
    });
});
function getCode()
{
    $.ajax({
        type: "post",
        url: tUrl,
        data: {},
        dataType: "json",
        success: function(data){
            if(data.Result==1){
                $("input#code").val(data.Code.toLowerCase());
                $("#image-vrify").attr("src",data.ShowUrl);
                //$("#image-vrify").attr("src",data.CodeUrl);
            }else if(data.Result==-1){

            }else if(data.Result==-99){

            }
        }
    });
}
$("#changeBt").click(function(){
    getCode();
});
/******************点击下一步(form1)统一对手机号、短信、图片的验证******************/
$("#next").click(function(e){
    /*
     * a、手机号验证
     * b、短信验证码验证
     * c、图片验证码验证
     * d、隐藏之前的form1,显示form2
     * e、改变step的active值
     * */
    e.preventDefault();
    var reg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;
    if($("#phone-number").val()==""){
        $("#phone-number-tip").html("请输入电话号码！").prev().css("display","inline-block");
    }else if(!reg.test($("#phone-number").val())){
        $("#phone-number-tip").html("请输入正确的手机号码");
    }else if($("#message").val()==''){
        $("#message-tip").prev().removeClass("active").css("display","inline-block");
        $("#message-tip").html("请输入验证码").removeClass("correct").addClass("wrong");
    }else if($("#message-tip").hasClass("wrong")){
        $("#message-tip").prev().removeClass("active").css("display","inline-block");
        $("#message-tip").html("请输入正确的验证码").removeClass("correct").addClass("wrong");
    }else if($("#image").val().toLowerCase()!=$("input#code").val()){
        $("#image-tip").html("图片验证不正确，请重新输入");
    }else if($("#image").val()==""){
        $("#image-tip").html("请输入图片验证");
    }else{
        $("#message-tip").html("").prev().css("display","none");
        $("#image-tip").html("").prev().css("display","none");
        $(".login-main .content .form1").css("display","none");
        $(".login-main .content .form2").css("display","block");
        $("#step1").addClass("active");
        ($("#step1").next()).addClass("active");
    }
});


/*step2:*/
/************************step2失去焦点的操作(form2)***************************/
$("#new-pwd").blur(function(){
    var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/g;//密码正则
    if($("#new-pwd").val()=="") {
        $("#new-pwd-tip").html("请输入密码").prev().css("display","inline-block");
    }else if(!reg.test($("#new-pwd").val())){
        $("#new-pwd-tip").html("密码格式不正确，请重新输入").prev().css("display","inline-block");
    }else {
        $("#once-new-pwd-tip").html("").prev().css("display","none");
        $("#new-pwd-tip").html("").prev().css("display","none");
    }
    });
$("#once-new-pwd").blur(function(){
    if($("#new-pwd").val()!=$("#once-new-pwd").val()){
        $("#once-new-pwd-tip").html("密码不一致，请重新输入").prev().css("display","inline-block");
    }else {
        $("#once-new-pwd-tip").html("").prev().css("display","none");
    }
});
/**********重置成功后自动跳转*********/
var timer1=null;
var n=$("#jump").html();
function calc(){
    n--;
    $("#jump").html(n);
    if(n==0){
        window.location="login.html";
        clearInterval(timer1);
        timer1=null;
        n=$("#jump").html();
    }
}
/********点击确定的操作(form2)***********/
$("#confirm").click(function(){
    /*
    * 1、判断输入信息
    * 2、隐藏之前的form2,显示form3
    * 3、改变step的active值    *
    * */
    var arrParam = { Mobile: $("#phone-number").val(),Code:$("#message").val(),Password:$("#new-pwd").val()};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Login_ResetPassWord", strParam);
    /*$.ajax({
        type: "post",
        url: jsgDataServer+jsgDataVisit,
        data:jsgSubmit,
        dataType: "json",
        success: function (data) {
            console.log(data)
        },
        error:function(data){
            console.log(data)
        }
    });*/
    $.ajax({
        type:"post",
        url:jsgDataServer + jsgDataVisit,
        //data: {strMobile:$("#phone-number").val(),strSmsCode:$("#message").val(),strPassword:$("#new-pwd").val()},
        data:jsgSubmit,
        dataType: "json",
        success:function (data) {
            alert(1);
            console.log(data);
            if(data.Result==1){
                var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/g;//密码正则
                if($("#new-pwd").val()==""){
                    $("#new-pwd-tip").html("请输入密码").prev().css("display","inline-block");
                }else if(!reg.test($("#new-pwd").val())){
                    $("#new-pwd-tip").html("密码格式不正确，请重新输入").prev().css("display","inline-block");
                }else if($("#new-pwd").val()!=$("#once-new-pwd").val()){
                    $("#once-new-pwd-tip").html("密码不一致，请重新输入").prev().css("display","inline-block");
                }else {
                    $(".login-main .content .form2").css("display","none");
                    $(".login-main .content .form3").css("display","block");
                    $(".step ul").css("display","none");
                    $("#step2").addClass("active");
                    ($("#step2").next()).addClass("active");
                    timer1=setInterval(calc,1000);
                }
            }else if(data.Result==-1){
                alert(data.Message);
            }else if(data.Result==-99){
                alert(data.Message);
            }
        },
        error:function(data){
            console.log(data)
        }
    });
});




































