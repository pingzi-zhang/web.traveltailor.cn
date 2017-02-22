// JavaScript Document
function checkInfo(num, str) {
    var mobileReg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;//验证手机号码的正则表达式
    var phoneReg = /^0\d{2,3}-\d{7,8}$/g;//固定电话正则表达式验证
    var loginReg = /^[a-zA_Z]\w{6,}$/g;//账号验证表达式
    var emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g;//邮箱验证表达式
    var chineseReg = /^[\u4E00-\u9FA5]+$/;//中文验证
    var vals = $(str).val();
    switch (num) {
        case 0:
            if (!mobileReg.test(vals)) {
                return -1;
            }
            else {
                return 1;
            }
            break;
        case 1:
            if (!phoneReg.test(vals)) {
                return -1;
            }
            else {
                return 1;
            }
            break;
        case 2:
            if (!loginReg.test(vals)) {
                return -1;
            }
            else {
                return 1;
            }
            break;
        case 3:
            if (!emailReg.test(vals)) {
                return -1;
            }
            else {
                return 1;
            }
            break;
        case 4:
            if (!chineseReg.test(vals)) {
                return -1;
            }
            else {
                return 1;
            }
            break;
    }
}
$("#phone").blur(function () {
    var result = checkInfo(0, "#phone");
    if (result == -1) {
        $("#tip").show();
        $("#tipRightTxt").text("请输入正确的手机号码");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
});

var counter = 0;
var seconds = 10;
var it = null;
$("#getCode").click(function () {
    $("#codetip").show();
    var t = setInterval(function () { $("#codetip").hide(300); clearInterval(t); }, 2000);
    if (counter == 0) {
        counter++;
        $(".tips1").text("验证码发送成功！30分钟内输入有效！");
        $("#getCode").css("background-color", "#cccccc");
        $("#getCode").attr("disabled", true);
        it = setInterval(
            function () {
                seconds--;
                $("#getCode").val(seconds + "S后重发");
                if (seconds == 0) {
                    clearInterval(it);
                    $("#getCode").css("background-color", "#ff9500");
                    $("#getCode").val("重新发送");
                    $("#getCode").attr("disabled", false);
                }
            }, 1000);
    }
    else {
        counter++;
        $(".tips1").text("未收到验证码，请重新获取");
        $("#getCode").val("获取验证码");
        counter = 0;
        seconds = 10;
    }
});
$(".check").click(function () {
    var obj = $(this).attr("alt");
    if (obj == "#mobile") {
        checkInfo(0, obj);
    }
    else if (obj == "#phone") {
        checkInfo(1, "#phone");
    }
    else if (obj == "#account") {
        checkInfo(2, "#account");
    }
    else if (obj == "#email") {
        checkInfo(3, "#email");
    }
    else if (obj == "#chinese") {
        checkInfo(4, "#chinese");
    }
});
$("#goSecond").click(function () {
    $("#firstStep").hide();
    $("#secondStep").show();
});
$("#mobile").focus(function () { $(this).val("").css("color", "#000"); });
$("#subData").click(function () {
    var result = checkInfo(0, "#mobile");
    if (result == -1) {
        $("#mobile").val("请输入正确的手机号码").css("color", "#f00");
    }
    else {
        $("#tipBox").show();
        $.ajax({
            type: "post",
            url: gUrl+"/Steward/CreateCustom",
            data: {
                strName: $("#name").val(),
                strPhone: $("#mobile").val(),
                strDestination: $("#dest").val(),
                intStar: $("#star").val(),
                dtmStart: $("#starttime").val(),
                intDay: $("#days").val(),
                intAdult: $("#adult").val(),
                intChildren: $("#child").val(),
                strTheme: $("#theme").val(),
                decBudget: $("#budget").val(),
                strDemand: $("#demand").val(),
                strFrom: "都江堰市"
            },
            dataType: "json",
            success: function (data) {
                if (data == 1) {
                    $("#tipBox").show();
                }
            },
            error: function () {
                alert("处理异常！");
            }
        });
    }
});
//banner切换
function changePics() {
    $("ul#banner li").css({ "opacity": "0" });
    $("ul#banner li:eq(" + index + ")").animate({ "opacity": "1" }, 1500, function () {
        if (index < imgCount - 1) {
            index++;
        }
        else {
            index = 0;
        }
    });
    $(".switchBt").css("background-color", "#939f80");
    $(".switchBt:eq(" + index + ")").css("background-color", "#fff");
}
var imgCount = 0;
var index = 1;
var timer = null;//计时器
$(document).ready(function () {
    imgCount = $("ul#banner li").length;
    timer = setInterval("changePics()", 5000);
    var reg = /MSIE\s[6-9]./g;
    if (reg.test(navigator.appVersion)) {
        $("table#imgs td").addClass("td");
    }
});
$(".switchBt").mouseover(function () {
    clearInterval(timer);
    index = $(this).index(".switchBt");
    changePics();
});
$(".switchBt").mouseout(function () {
    timer = setInterval("changePics()", 5000);
});
window.onscroll = function () {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    if (top >= window.innerHeight / 2) {
        $(".wleft:eq(2)").show();
    }
    else
    {
        $(".wleft:eq(2)").hide();
    }
}
$(".wleft1").mouseover(function () {
    $(".info").hide();
    var attr = $(this).attr("lang");
    if (attr == "phonePannel") {
        $(".phonePannel").show();
    }
    else{
        $(".dim2").show();
    }
});
$(".wleft1").mouseout(function () {
    $(".info").hide();
}
);
$(".wleft").click(function(){
    if($(".wleft").index(this)==2)
    {
        $('html, body').animate({ scrollTop: 0 }, 100);
    }
});
/*我的产品*/
$("div.p_allMsg_tbHeader_Item").delegate("a.unshelf","click",function(){
    $("#pdf3").show();
});


/*********添加我的产品页的设为首图鼠标效果**********/
/*$(".set-index-img").mouseover(function(){
    $(".set-index-img span").css("display","block");
});
$(".set-index-img").mouseout(function(){
    $(".set-index-img span").css("display","none");
});*/
/*$("body").delegate("#pro-add-img","mouseover",function(){
    $(".set-index-img span").css("display","block");
});
$("body").delegate(".set-index-img","mouseout",function(){
    $(".set-index-img span").css("display","none");
});*/
/*************添加代卖产品页点击效果*******************/
$(".operatBt").click(function(){
    $("#modal").show();
});
$("#modal .close").click(function(){
    $("#modal").hide();
});
$("#pro-desc-save").click(function(){
    $("#modal").hide();
});
/*************我的红包点击效果*******************/
$("#redbag-canuse").click(function () {
    $("#canuse").show();
    $("#used").hide();
    $("#expire").hide();
    $(this).css({"color":"#ff9500","border-bottom":"2px solid #ffbc7d"});
    $("#redbag-used").css({"color":"","border-bottom":"none"});
    $("#redbag-expire").css({"color":"","border-bottom":"none"});
});
$("#redbag-used").click(function () {
    $("#canuse").hide();
    $("#used").show();
    $("#expire").hide();
    $(this).css({"color":"#ff9500","border-bottom":"2px solid #ffbc7d"});
    $("#redbag-canuse").css({"color":"","border-bottom":"none"});
    $("#redbag-expire").css({"color":"","border-bottom":"none"});
});
$("#redbag-expire").click(function () {
    $("#canuse").hide();
    $("#used").hide();
    $("#expire").show();
    $(this).css({"color":"#ff9500","border-bottom":"2px solid #ffbc7d"});
    $("#redbag-canuse").css({"color":"","border-bottom":"none"});
    $("#redbag-used").css({"color":"","border-bottom":"none"});
});
/****************编辑标签*******************/
//点击‘编辑标签’弹出标签遮罩层
$("#p-mark").click(function () {
    $("#modal").show();
});
//点击遮罩层上的添加追加自定义的标签
$("#add-mark").click(function(){
    if($("input[name='input-mark']").val()!=""){
        $(".mark-middle").prepend("<span id='dynamic-mark' class='active'></span>");
        $("#dynamic-mark").text($("input[name='input-mark']").val());
        $("input[name='input-mark']").val("");
        $("#dynamic-mark").click(function(){
            $(this).toggleClass("active");
        });
    }
});
//点击已有的标签切换颜色等效果
$(".mark-middle span").click(function(){
    $(this).toggleClass("active");
});
//点击遮罩层上的取消取消当前自定义的标签
$(".mark-call").click(function(){
    $("#dynamic-mark").css("display","none");
});
//点击遮罩层上的保存把改变了颜色（选中）的标签克隆到遮罩层外
$(".mark-save").click(function(){
    var str="";//保存选择的标签
    $(".mark-middle span").each(function(){
        if($(this).hasClass("active"))
        {
            str+=$(this).text()+",";
        }
    });
    $("#hold-mark").val(str);
    var strArr=str.split(',');
    var s="";
    for(var i=0;i<strArr.length-1;i++)
    {
        s+="<span class='active'>"+strArr[i]+"</span>"
    }
    $("#selectedMark").html(s);
    $("#modal").hide();
});
// 点击删除不需要的标签
$("body").delegate(".p-mark-right span","click",function(){
    //$(this).css({"display":"none"});
    $(this).remove();
    var str="";
    $(".p-mark-right span").each(function(){
        str+=$(this).text()+",";
    });
    $(".mark-middle span").removeClass("active");
    $(".mark-middle span").each(function(){
        if(str.indexOf($(this).text())!=-1)
        {
            $(this).addClass("active");
        }
    });
    var newStr="";
    $(".mark-middle span").each(function(){
        if($(this).hasClass("active"))
        {
            newStr+=$(this).text()+",";
        }
    });
    $("#hold-mark").val(newStr);
});
// clone的元素鼠标划过状态
$("body").delegate(".p-mark-right span","mouseover",function(){
    $(this).css({"cursor":"pointer"});
});
/***************点击当地人那么多页面链接的判断********************/
//判断当前登录进来的游客(tourist)是否已经注册过当地人(registeredLocalTourist)
if(true){//tourist!=registeredLocalTourist
    //弹出  提醒“如何成为当地人页面链接”遮罩层
    $("#tip-change").show();
}else{
    if(true){//registeredLocalTourist=local
        //当地人页面链接随便点，不要钱
    }else{
        //弹出 提醒“三个工作日审核”遮罩层
        $("#tip-change").html("您已提交资料，我们会在3个工作日内<br>完成审核，请您耐心等待哦~");
    }
}
/***************成为当地人/提醒等待遮罩层点击X关闭遮罩层********************/
$("#local-close").click(function () {
    $("#modal-local").hide();
});
var gUrl="http://webapi.nihaott.com";
//var gUrl="http://192.168.10.10:8011";
//var gUrl="http://192.168.10.142:801";
/*图片路径*/
//var imgUrl='http://imgapi.nihaott.com';
var imgUrl='http://imgapi.traveltailor.cn';
/***************获取游客订单详情********************/
function GetTravelerOrder(){
    var arrParam = { OrderID:localStorage.getItem("oid")};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Member_GetOrderGoods", strParam);
    $.ajax({
        type: "post",
        url:jsgDataServer+jsgDataVisit,
        data:jsgSubmit,
        dataType: "json",
        success: function(data){
            if(data.Result==1){
                $("#OrderPayable").text(accounting.formatNumber(data.Model.Payable,2));
                $("#OrderTotal").text("￥"+accounting.formatNumber(data.Model.Total,2));
                $("#OrderDiscount").text("￥"+accounting.formatNumber(data.Model.RedValue,2));
                $("#holdPlaceOrderTime").val(data.Model.CreateTime);
                $("#TravelerName").text(data.Model.Name);
                $("#TravelerMobile").text(data.Model.Mobile);
                $("#TailorHead").attr("src",data.Model.TailorHead);
                $("#TailorName").text(data.Model.TailorName);
                $("#TailorMobile").text(data.Model.TailorMobile);
                if(data.Model.Status==0)
                {
                    $("#tod-pay").text("立即支付");
                    $(".same:eq(0) .CreateTime").text(data.Model.CreateTime);

                }
                else if(data.Model.Status==1)
                {
                    $(".same:eq(1)").addClass("active");
                    $(".same:eq(1) img").attr("src","images/circle1.jpg");
                    /*$("#tod-pay").text("申请退款");*/
                    $("#tod-pay").remove();
                    $("#tod-cancel-pay").remove();
                    $(".above").remove();
                    $("#tod-pay").parent().removeAttr("href");
                    $(".same:eq(1) .CreateTime").text(data.Model.CreateTime);
                    $("#curOrderStateText span").remove();
                }
                else if(data.Model.Status==2)
                {
                    $(".same:eq(1)").addClass("active");
                    $(".same:eq(1) img").attr("src","images/circle1.jpg");
                    $(".same:eq(2)").addClass("active").children("span").text("已使用");
                    $(".same:eq(2) img").attr("src","images/circle1.jpg");
                    $("#tod-pay").remove();
                    $("#tod-cancel-pay").remove();
                    $("#curOrderStateText span").remove();
                }
                else if(data.Model.Status==3)
                {
                    $(".same:eq(1)").addClass("active");
                    $(".same:eq(1) img").attr("src","images/circle1.jpg");
                    $(".same:eq(2)").addClass("active").children("span").text("已完成");
                    $(".same:eq(2) img").attr("src","images/circle1.jpg");
                    $("#tod-pay").remove();
                    $("#tod-cancel-pay").remove();
                    $("#curOrderStateText span").remove();
                }
                else if(data.Model.Status==-1)
                {
                    $(".same:eq(1)").addClass("active").children("span").text("已取消");
                    $(".same:eq(1) img").attr("src","images/circle1.jpg");
                    $("#tod-pay").remove();
                    $("#tod-cancel-pay").remove();
                    $("#curOrderStateText span").remove();
                }
                else if(data.Model.Status==-2)
                {
                    $(".same:eq(1)").addClass("active").children("span").text("已退订");
                    $(".same:eq(1) img").attr("src","images/circle1.jpg");
                    $("#tod-pay").remove();
                    $("#tod-cancel-pay").remove();
                    $("#curOrderStateText span").remove();
                }
                else
                {
                    $(".same:eq(1)").addClass("active").children("span").text("已关闭");
                    $(".same:eq(1) img").attr("src","images/circle1.jpg");
                    $("#tod-pay").remove();
                    $("#tod-cancel-pay").remove();
                    $("#curOrderStateText span").remove();
                }
                var subArr=new Array();
                var orderInfos={OrderID:data.Model.OrderID,OrderTime:data.Model.CreateTime,Payable:data.Model.Payable};
                var str='<table><thead><tr><th colspan="4"><s>订单号：</s><b style="color: #666666;" id="OrderID">'+data.Model.OrderID+'</b></th><th></th><th></th><th style="width:210px;padding-right: 10px;"><s>下单时间：</s><b style="color: #666666;" class="CreateTime">'+data.Model.CreateTime+'</b></th></tr></thead><tbody><tr><th>名称</th><th>价格</th><th>数量</th><th>小计</th></tr>';
                for(var i=0;i<data.Model.GoodsList.length;i++)
                {
                   var obj={pName:data.Model.GoodsList[i].Name,price:data.Model.GoodsList[i].SellPrice,pNum:data.Model.GoodsList[i].Quantity,pTotal:data.Model.GoodsList[i].Amount};
                    subArr.push(obj);
                    str+='<tr><td style="text-align:left;text-indent:20px;"><div><img src="'+data.Model.GoodsList[i].PictureUrl+'" id="ProductFirst" style="width:120px;height: 90px;"/><p id="Name">'+data.Model.GoodsList[i].Name+'</p></div></td><td id="GoodsPrice">￥'+accounting.formatNumber(data.Model.GoodsList[i].SellPrice,2)+'</td><td id="Quantity">'+data.Model.GoodsList[i].Quantity+'</td><td id="Amount">￥'+accounting.formatNumber(data.Model.GoodsList[i].Amount,2)+'</td></tr>';
                }
                str+="</tbody><tfoot></tfoot></table>";
                $(".group-c").html(str);
                str="";
                var order={info:subArr,Ord:orderInfos};
                localStorage.orderInfo=JSON.stringify(order);
            }else if(data.Result==-99){
                $(".p_rightBox div").hide();
                $("#error").text("没有此订单！");
                $("#pdf2").show();
                var t=setTimeout(function(){window.location='OrderOfGuider.html';},2000);
            }
        }
    });
}
//游客订单详情支付
/*$("#tod-pay").click(function(){
    if($(this).text()=="申请退款")
    {
        $.post(gUrl+"/Traveler/OrderRefund",{strOrderID:localStorage.getItem("oid")},function(data){
            if(data.Result==1){
                $("#error").text("退款成功！");
                $("#pdf2").show();
                var t=setTimeout(function(){window.location='tourismOrderDetail.html';clearTimeout(t);},1500);
            }else {
                $("#error").text(data.Message+"，请重新尝试！");
                $("#pdf2").show();
                var t=setTimeout(function(){window.location='tourismOrderDetail.html';clearTimeout(t);},1500);
            }
        });
    }
});*/
//游客订单详情以取消订单
$("#tod-cancel-pay").click(function(){
    var arrParam = { OrderID:localStorage.getItem("oid")};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Order_CancelOrder", strParam);
    $.post(jsgDataServer+jsgDataVisit,jsgSubmit,function(data){
        console.log(data);
        if(data.Result==1){
            $("#error").text("订单取消成功！");
            $("#pdf2").show();
            var t=setTimeout(function(){window.location='tourismOrderDetail.html';clearTimeout(t);},1500);
        }else {
            $("#error").text(data.Message+",请重新尝试！");
            $("#pdf2").show();
            var t=setTimeout(function(){window.location='tourismOrderDetail.html';clearTimeout(t);},1500);
        }
    });
    /*.success(function() { alert("second success"); })
    .error(function(data) { console.log(data) });*/
});
//订单退款

/***********************当地人个人资料编辑效果**************************************/
//*****************点基本信息编辑
$("#base-info-edit").click(function () {
    $("#base-info").hide();
    $(".base-info-edit").show();
});
//*****************点账户信息编辑
$("#account-info-edit").click(function () {
    $("#account-info").hide();
    $(".account-info-edit").show();
});
//*****************
$("#my-advance-edit").click(function () {
    $("#my-advance").hide();
    $(".my-advance-edit").show();
});
/*/*//*****************
$("#server-intro-edit").click(function () {
    $("#server-intro").hide();
    $(".server-intro-edit").show();
});
$("#server-intro-edit-save").click(function(){
    $(".server-intro-edit").hide();
    $("#server-intro").show();
});*/
/********************************我是当地人，添加我的产品*************************************************/

/*function setFirst(th)//设置产品首图
{
    var firstImgUrl=$(th).parent("div").find("img").attr("src");
    $("#firstUrl").attr("src",firstImgUrl);
    firstImgUrl=firstImgUrl.replace("http://imgapi.nihaott.com/","").trim();
    $("#hold-first-img-url").val(firstImgUrl);
}*/
//删除图片
function delPicture(th)
{
$(th).parent("div").remove();
}
//获取产品分类
function getProdctCator()
{
    $.ajax({
        type: "post",
        url: gUrl+"/Tailor/GetProductCategoryDrop",
        data: {},
        dataType: "json",
        success: function (data) {
            var str="";
            if(data.Result==1)
            {
                var len=data.List.length;
                for(var i=0;i<len;i++)
                {
                    str+="<option value="+data.List[i].CategorytID+">"+data.List[i].Name+"</option>";
                }
                $("#pCator").append(str);
            }
            else
            {
                //alert(data.Message);
            }
        }
    });
}
$(".weekday").click(function(){
    if(this.checked)
    {
        $(this).parent().find("img").attr("src","images/selected.jpg");
    }
    else
    {
        $(this).parent().find("img").attr("src","images/empt.jpg");
    }
});
//添加产品
$("#add-pro-save").click(function(){
    var reg=/\d{1,10}(\.\d{1,2})?$/g;
    var reg1=/\d{1,10}(\.\d{1,2})?$/g;
    var nReg=/^[\d]{1,}$/g;
    $("#SWFUpload_4").insertAfter($("#SWFUpload_2"));
    if($("#strName").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#strName").focus();
        $("#error").text("请输入产品名称");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else if($("#decSellPrice").val().replace(/(^\s*)|(\s*$)/g, "")==""||!reg.test($("#decSellPrice").val()))
    {
        $("#decSellPrice").focus();
        $("#error").text("请输入正确的从销售价格！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else if($("#decMarketPrice").val().replace(/(^\s*)|(\s*$)/g,"")==""||!reg1.test($("#decMarketPrice").val()))
    {
        $("#decMarketPrice").focus();
        $("#error").text("请输入正确的市场价格！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else if($("#balance").val().replace(/(^\s*)|(\s*$)/g,"")==""||!nReg.test($("#balance").val()))
    {
        $("#balance").focus();
        $("#error").text("请输入库存量！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else if($("#hold-pro-img").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#error").text("请上传产品相册！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else if($("#hold-first-img-url").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#error").text("请设置一张产品首图！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else if($("#detailContent").text().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#error").text("请输入产品描述！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
    }
    else
    {
        var u=JSON.parse(localStorage.person);
        var memId= u.user;
        if(u!=null&&u!=undefined) {
            $.ajax({
                type: "post",
                url: gUrl+"/Tailor/CreateProduct",
                data: {
                    strMemberID:memId,
                    strCategoryID:$("#pCator").val(),
                    strName:$("#strName").val(),
                    decSellPrice:$("#decSellPrice").val(),
                    strUnit:"元",
                    decMarketPrice:$("#decMarketPrice").val(),
                    strAlbumUrl:$("#hold-pro-img").val(),
                    strFirstUrl:$("#hold-first-img-url").val(),
                    strDescribe:$("#detailContent").html(),
                    decLimit:10,
                    strDetails:"1",
                    intPeople:"1",
                    intEffective:"1"
                },
                dataType: "json",
                success: function (data) {
                    if(data.Result==1){
                        $("#error").text("您的产品添加成功！");
                        $("#pdf2").show();
                        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                    }else if(data.Result==-1){
                        $("#error").text(data.Message);
                        $("#pdf2").show();
                        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                    }else if(data.Result==-99){
                        $("#error").text(data.Message);
                        $("#pdf2").show();
                        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                    }
                }
            });
        }
    }
});
/********************获取当地人的产品信息（详情）********************/
function getPro(){
    var proDetailId=localStorage.getItem("pId");
    var url="http://imgapi.nihaott.com";
    $.ajax({
        type:"post",
        url:gUrl+"/Tailor/GetTailorProduct",
        data:{strProductID:proDetailId},
        dataType:"json",
        success: function(data){
            if(data.Result==1){
                var strUrl="";
                $("#Pname").text(data.Model.Name);
                //$("#ModelSellPrice").text(data.Model.SellPrice);
                if(data.Model.StatusValue==0){
                    $("#ModelStatusValue").text("待审核");
                }else if(data.Model.StatusValue==1){
                    $("#ModelStatusValue").text("已上架");
                }else if(data.Model.StatusValue==-1){
                    $("#ModelStatusValue").text("已下架");
                }else if(data.Model.StatusValue==-2){
                    $("#ModelStatusValue").html("未通过<span>(该产品图片与名称不符合，请重新修改)</span>");
                }
                $("#price").text(accounting.formatNumber(data.Model.SellPrice,2));
                $("#description").html(data.Model.Describe);
                $("#imgContainer div:eq(0)").css("border","1px solid #ff0000");
                $("#imgContainer").css("width",(data.Model.AlbumUrl.split('|').length-1)*9+(data.Model.AlbumUrl.split('|').length-1)*122);
                var newUrl=data.Model.AlbumUrl.replace("http://imgapi.nihaott.com/","").trim();
                var strArr=newUrl.split('|');
                $("#ModelFirstUrl").attr("src",url+strArr[0]);
                var str="";
                for(var i=0;i<strArr.length-1;i++)
                {
                    str+="<div><img src='"+url+strArr[i]+"'/></div>";
                }
                $("#imgContainer").html(str);
                $("#imgContainer div:eq(0)").css("border","1px solid #ff0000");
                $(".imgOutBox a").remove();
            }
            else if(data.Result=-99){
                $("#error").text(data.Message);
                $("#pdf2").show();
                var t=setTimeout(function(){$("#pdf2").hide();window.location='Production.html';clearTimeout(t);},1500);
            }
        }
    });
}
///图片滚动
//m:图片索引
//imgLen:图片总数
//dir:移动方向,-1:向左，1：向右
var m=0;
var marginLeft=0;
function changeImg(dir)
{
    var imgLen=$("#imgContainer div").length;
    $("#imgContainer div").css("border","1px solid #fff");
    if(imgLen>4)
    {
        if(dir==1)
        {
            if(m<imgLen-4)
            {
                m++;
                $("#imgContainer").css({"margin-left":-m*129+"px"});
                $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
            }
            else
            {
                if(m<imgLen-1)
                {
                    m++;
                    $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
                }
                else
                {
                    m=0;
                    $("#imgContainer").css({"margin-left":-m*129+"px"});
                    $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
                }
            }
        }
        else
        {
            if(m>0)
            {
                m--;
                if(m>imgLen-4)
                {
                    $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
                }
                else
                {
                    $("#imgContainer").css({"margin-left":-m*129+"px"});
                    $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
                }
            }
            else
            {
                m=imgLen-1;
                $("#imgContainer").css({"margin-left":(-m+3)*129+"px"});
                $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
            }
        }
        var str=$("#imgContainer div:eq("+m+") img").attr("src");
        $("#ModelFirstUrl").attr("src",str);
        resetStatus();
    }
    else
    {
        if(dir==1)
        {
            if(m<imgLen-1)
            {
                m++;
            }
            else
            {
                m=0;
            }
            $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");
        }
        else
        {
            if(m>0)
            {
                m--;
            }
            else
            {
                m=imgLen-1;
            }
            $("#imgContainer div:eq("+m+")").css("border","1px solid #ff0000");

        }
        var str=$("#imgContainer div:eq("+m+") img").attr("src");
        $("#ModelFirstUrl").attr("src",str);
    }
}
function resetStatus()
{
    marginLeft=parseInt($("#imgContainer").css("margin-left"));
    var imgLen=$("#imgContainer div").length;
    $("#imgContainer div").attr("data-hide",0);
    var count=Math.abs(marginLeft/129);
    for(var i=0;i<count;i++)
    {
        $("#imgContainer div:eq("+i+")").attr("data-hide",1);
    }
    for(var j=count+4;j<imgLen;j++)
    {
        $("#imgContainer div:eq("+j+")").attr("data-hide",1);
    }
}
function setBorder(th)
{
    marginLeft=parseInt($("#imgContainer").css("margin-left"));
    m=$("#imgContainer div").index($(th).parent("div"));
    var imgLen=$("#imgContainer div").length;
    $("#imgContainer div").css("border","1px solid #fff");
    $(th).parent("div").css("border","1px solid #ff0000");
    $("#ModelFirstUrl").attr("src",$(th).attr("src"));
    if(m>0||m<(imgLen-4))
    {
        var attr1=$(th).parent("div").prev("div").attr("data-hide");
        var attr2=$(th).parent("div").next("div").attr("data-hide");
        if(attr1=="1"&&attr2=="0")
        {
            $("#imgContainer").css({"margin-left":(marginLeft+129)+"px"});
        }
        else if(attr1=="0"&&attr2=="1")
        {
            $("#imgContainer").css({"margin-left":(marginLeft-129)+"px"});
        }
    }
    resetStatus();
}
$("#imgContainer").delegate("img","click",function(){
    setBorder(this);
});
//图片滚动效果结束
/*****************如何成为当地人点击下一步效果********************/
$("#step1-next").click(function(){
    var reg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;
    var dateReg=/[0-9]{1,}/g;
    if($("#strMemberName").val()==""){
        $("#strMemberName").focus();
        $("#error").text("请输入姓名");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#deliverprovince").val()==""){
        $("#deliverprovince").focus();
        $("#error").text("请选择省份");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#delivercity").val()==""){
        $("#delivercity").focus();
        $("#error").text("请选择城市");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#deliverarea").val()==""){
        $("#deliverarea").focus();
        $("#error").text("请选择区县");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#strAddress").val()==""){
        $("#strAddress").focus();
        $("#error").text("请输入详细地址");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("input[name='profession']").val()==""){
        $("input[name='profession']").focus();
        $("#error").text("请输入职业");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#intMembYears").val()==""||!dateReg.test($("#intMembYears").val())){
        $("#intMembYears").focus();
        $("#error").text("请输入工作年限");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#strLabel span").text()==""){
        $("#error").text("请选择个人标签");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#motto").val()==""){
        $("#motto").focus();
        $("#error").text("请输入一句话了解我");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else if($("#detailContent").html().replace(/(^\s*)|(\s*$)/g, "")==""){
        $("#error").text("请输个人描述");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
    }else {
        $("#toBeLocalStep .step-content").hide();
        $("#toBeLocalStep .step-nav").html("账户信息");
        $("#toBeLocalStep .step-content-account").show();
        $(".step2").css("color","#ff9500");
    }
});
/**********************添加文字和图片描述**********************************/
/*var editor;
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
                var str="<div class='imgOutBox' name='1' title='点击修改' style='margin:0;color:#808080'>"+editor.html()+"</div>";
                $("#detailContent").append(str);
                editor.html("");
                $("#textContainer").hide();
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
});*/
/**********************点击添加文字区域弹出填写框**********************************/
var modal=null;
$("#add-text-information").click(function(){
    $("#textContainer").show();
    modal=null;
});
$("#detailContent").on("click",".imgOutBox",function(event){
    if($(this).attr("name")=="1")
    {
        /*var e=event||window.event;
        var px=e.clientX-55;
        var py= e.clientY-50;
        $("#modifyBt").css({"left":px,"top":py}).show();*/
        $("#textContainer").show();
        editor.html($(this).html());
        modal=this;
    }
});

/*获取省市区县地址信息*/
$("#deliverprovince").change(function(){/*选择省份*/
    var str=$(this).val();
    $("select#deliverprovince option").each(function(){
        if($(this).val()==str)
        {
            $("#deliverprovince").parent("div").find(".manBox_left").text($(this).text());
        }
    });
    getCity(str);
});
$("#delivercity").change(function(){/*选择市*/
    var str=$(this).val();
    $("select#delivercity option").each(function(){
        if($(this).val()==str)
        {
            $("#delivercity").parent("div").find(".manBox_left").text($(this).text());
        }
    });
    getArea(str);
});
$("#deliverarea").change(function(){
    var str=$(this).val();
    $("select#deliverarea option").each(function(){
        if($(this).val()==str)
        {
            $("#deliverarea").parent("div").find(".manBox_left").text($(this).text());
        }
    });
    getArea(str);
});
var perspective=[{"RegiID":"416404AA63D44C37A6CB8C4C253DAB69","ScenList":[{"ScenID":"00000000000000000000000000000000","ScenName":"青城山","ScenAddress":"青城山","ScenStar":5},{"ScenID":"11111111111111111111111111111111","ScenName":"都江堰","ScenAddress":"都江堰","ScenStar":5}]},{"RegiID":"A4DE6EDA9F374DF2A4B0254EE178D462","ScenList":[{"ScenID":"22222222222222222222222222222222","ScenName":"峨眉山","ScenAddress":"峨眉山","ScenStar":5},{"ScenID":"33333333333333333333333333333333","ScenName":"乐山大佛","ScenAddress":"乐山大佛","ScenStar":5}]}];
function getArea(str)/*选择景区*/
{
    var temp='';
    for(var g=0;g<perspective.length;g++)
    {
        if(str==perspective[g].RegiID)
        {
            for(var k=0;k<perspective[g].ScenList.length;k++)
            {
                temp+="<a class='prevColor' name='"+perspective[g].ScenList[k].ScenID+"'>"+perspective[g].ScenList[k].ScenName+"</a>";
            }
        }
    }
    $("#jingqu").html(temp);
    if(temp!="")
    {
        $("#jingqu").parent("div").find(".manBox_left").text("请选择景区");
    }
    else
    {
        $("#jingqu").parent("div").find(".manBox_left").text("暂无景区");
    }
    /*$.ajax({
        type:"get",
        url:'http://wx.nihaott.com/traveler/js/json.json',
        data:{
        },
        dataType:"json",
        success: function(data) {
            for(var i=0;i<data.length;i++)
            {
                if(data[i].StateCode="086")
                {
                    for(var j=0;j<data[i].ProvinceList.length;j++)
                    {
                        for(var m=0;m<data[i].ProvinceList[j].CityList.length;m++)
                        {
                            for(var g=0;g<perspective.length;g++)
                            {
                                if(data[i].ProvinceList[j].CityList[m].RegiID==perspective[g].RegiID)
                                {
                                    for(var k=0;k<perspective[g].ScenList.length;k++)
                                    {
                                        temp+="<a class='prevColor' name='"+data[i].ProvinceList[j].CityList[m].CityCode+"'>"+perspective[g].ScenList[k].ScenName+"</a>";
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(temp!="")
            {
                $("#jingqu").html(temp);
                $("#jingqu").parent("div").find(".manBox_left").text($("#jingqu a:first").text());
            }
            else
            {
                $("#jingqu").parent("div").find(".manBox_left").text("暂无景区");
            }
        }
    });*/
}
function getCity(str)
{
    var temp='';
    $.ajax({
        type:"get",
        url:'http://wx.nihaott.com/traveler/js/json.json',
        data:{
        },
        dataType:"json",
        success: function(data) {
            for(var i=0;i<data.length;i++)
            {
                if(data[i].StateCode="086")
                {
                    for(var j=0;j<data[i].ProvinceList.length;j++)
                    {
                        if(data[i].ProvinceList[j].RegiID==str)
                        {
                            for(var k=0;k<data[i].ProvinceList[j].CityList.length;k++)
                            {
                                temp+="<option value='"+data[i].ProvinceList[j].CityList[k].RegiID+"'>"+data[i].ProvinceList[j].CityList[k].CityName+"</option>";
                            }
                        }
                        $("#delivercity").html(temp);
                        $("select#delivercity option").each(function(){
                            if($(this).val()==$("#delivercity").val())
                            {
                                $("#delivercity").parent("div").find(".manBox_left").text($(this).text());
                            }
                        });
                        getArea($("#delivercity").val());
                    }
                }
            }
        }
    });
}
function initArea()
{
    $.ajax({
        type:"get",
        url:'http://wx.nihaott.com/traveler/js/json.json',
        data:{
        },
        dataType:"json",
        success: function(data) {
            for(var i=0;i<data.length;i++)
            {
                if(data[i].StateCode="086")
                {
                    for(var j=0;j<data[i].ProvinceList.length;j++)
                    {
                        $("#deliverprovince").append("<option value='"+data[i].ProvinceList[j].RegiID+"'>"+data[i].ProvinceList[j].ProvinceName+"</option>");
                    }
                    $("select#deliverprovince option").each(function(){
                        if($(this).val()==$("#deliverprovince").val())
                        {
                            $("#deliverprovince").parent("div").find(".manBox_left").text($(this).text());
                        }
                    });
                    getCity($("#deliverprovince").val())
                }
            }
        }
    });
}
$("#jingqu").on("click","a",function(){
        if($(this).hasClass("selectedColor"))
        {
            $(this).removeClass("selectedColor");
        }
        else
        {
            $(this).addClass("selectedColor");
        }
});
$(".manBox_left,.manBox_right").click(function(){
    if($(this).parent("div").find("#jingqu").children("a").length>0)
    {
        $(this).parent("div").find("#jingqu").slideToggle(200);
    }
    else
    {
        $(this).parent("div").find("#jingqu").hide();
    }
});
$("#addPlace").click(function(){
    var strCode='';
    var jingqu='';
    $("#jingqu a").each(function(){
        if($(this).hasClass("selectedColor"))
        {
            jingqu+=$(this).text()+",";
            strCode=$(this).attr("name")+",";
        }
    });
    if(strCode!="")
    {
        var city=$(".manBox_left:eq(1)").text();
        jingqu=jingqu.replace(/[,]$/g,"");
        $(".results:eq(1)").append("<div data-code='"+strCode+"'>"+city+"-"+jingqu+"<a class='deleteArea'>×</a></div>");
        $("#jingqu").slideUp();
    }
    else
    {
        $(this).parent(".selectArea").parent(".rigthInput").find(".i-style").show();
    }
});
$("#addCity").click(function(){
    var cityCode=$("#delivercity").val();
    var city='';
    $("#delivercity option").each(function(){
        if($(this).val()==cityCode)
        {
            city=$(this).text();
        }
    });
    var exist=false;
    $(".results:eq(0) div").each(function(){
        if($(this).text().indexOf(city)!=-1)
        {
            exist=true;
        }
    });
    if(!exist)
    {
        $(".results:eq(0)").append("<div data-code='"+cityCode+"'>"+city+"<a class='deleteArea'>×</a></div>");
    }
});
$(".results").on("click","a",function(){
    $(this).parent("div").remove();
});
$("#albumCon").on("click","a",function(){
    var url=$(this).attr("name");
    var strArr=$("#album").val().split(',');
    var strTemp="";
    for(var i=0;i<strArr.length-1;i++)
    {
        if(strArr[i]!=url)
        {
            strTemp+=strArr[i]+",";
        }
    }
    $("#album").val(strTemp);
    $(this).parent("div").remove();
});
/*获取省市区县地址信息结束*/
var strCode='';
var pers='';
$("#my-advance-edit-save").click(function(){
    strCode='';
    $(".i-style").hide();
    $(".results:eq(0) div").each(function(){
        strCode+=$(this).attr("data-code")+',';
    });
    $(".results:eq(1) div").each(function(){
        pers+=$(this).attr("data-code")+",";
    });
    strCode=strCode.replace(/[,]$/g,"");
    pers=pers.replace(/[,]$/g,"");
    if($("#strMemberName").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#strMemberName").focus();
        $("#strMemberName").next(".i-style").show();
    }
    else if($("#birth").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#birth").focus();
        $("#birth").next(".i-style").show();
    }
    else if($("#profession").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#profession").focus();
        $("#profession").next(".i-style").show();
    }
    else if($("#headerUrl").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#headerUrl").parent().find(".i-style").show();
    }
    else if($(".results:eq(0) div").length==0)
    {
        $(".results:eq(0)").prev(".i-style").show();
    }
    else if($("#selfDes").val().replace(/(^\s*)|(\s*$)/g,"")==""||$("#selfDes").val().length>30)
    {
        if($("#selfDes").val().replace(/(^\s*)|(\s*$)/g,"")=="")
        {
            $("#selfDes").next(".i-style").text("*请用一句话描述自己");
        }
        else if($("#selfDes").val().length>30)
        {
            $("#selfDes").next(".i-style").text("*自我描述在30个字以内");
        }
        $("#selfDes").focus();
        $("#selfDes").next(".i-style").show();
    }
    else if($("#album").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#album").next(".i-style").show();
    }
    else if($("#firstAlbum").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#firstAlbum").next(".i-style").show();
    }
    else
    {
        $(".profiles").hide();
        $(".profiles:eq(1)").show();
        $(".tainxieItem:eq(1)").css({"background":"url(images/tianxieZt_4.png) no-repeat","color":"#fff"});
    }
});
/**********************注册成为当地人（导游）**********************************/
$("#submitCheck").click(function(){
    var IDreg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/g;
    $(".i-style").hide();
    if($("#service").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#service").focus();
        $("#service").next(".i-style").show();
    }
    else if($("#service").val().replace(/(^\s*)|(\s*$)/g,"").length>80)
    {
        $("#service").focus();
        $("#service").next(".i-style").text("*产品及服务在80字以内").show();
    }
    else if($("#txtDescrible").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#txtDescrible").focus();
        $("#txtDescrible").next(".i-style").show();
    }
    else if($("#txtDescrible").val().length>80)
    {
        $("#txtDescrible").focus();
        $("#txtDescrible").next(".i-style").text("*文字介绍请在80字以内").show();
    }
    else if($("#detailContent").html().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $(".detaildes").show();
    }
    else if(!IDreg.test($("#strIDCardNumber").val())){
        $("#strIDCardNumber").focus();
        $("#strIDCardNumber").next(".i-style").show();
    }
    else if($("#hold-front-img").val().replace(/(^\s*)|(\s*$)/g,"")==""||$("#hold-behind-img").val().replace(/(^\s*)|(\s*$)/g,"")==""){
        $("#hold-behind-img").parent("div").next(".i-style").show();
    }
    else if($("#strAliPay").val().replace(/(^\s*)|(\s*$)/g,"")=="")
    {
        $("#strAliPay").focus();
        $("#strAliPay").next(".i-style").show();
    }
    else{
        /*var languageStr="";
        var elems=document.getElementsByName("language");
        for(var i=0;i<elems.length;i++){
            if(elems[i].checked){
                if(elems[i].value!="其它"){
                    languageStr+=elems[i].value+" ";
                }else{
                    languageStr+=$("#more-lang").val()+" ";
                }
            }
        }*/
        $("#SWFUpload_4").insertAfter($("#anchor"));
        $(".imgOutBox a").hide();
        var u=JSON.parse(localStorage.person);
        var memId= u.user;
        //ServeScenic:$("#results").val(),ServeCity:$("#jingqu").val()
        var arrParam = { TailorID:memId,Mender:memId,Head:$("#headerUrl").val(),Index:$("#firstAlbum").val(),Album:$("#album").val(),Scenic:pers,ServeCity:strCode,Name:$("#strMemberName").val(),Sex:$("input[name='sex']:checked").val(),Birth:$("#birth").val(),Inaword:$("#selfDes").val(),Occupation:$("#profession").val(),Service:$("#service").val(),Introduce:$("#txtDescrible").val(),Detail:$("#detailContent").html(),IdentityP:$("#hold-front-img").val()+"|"+$("#hold-behind-img").val(),Identity:$("#strIDCardNumber").val(),AliPay:$("#strAliPay").val()};
        console.log(arrParam)
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_RegisterTailor", strParam);
        $.ajax({
            type:"post",
            url:jsgDataServer+jsgDataVisit,
            /*data:{
                strMemberID:memId,
                //strHeadUrl:$("#strHeadUrl").attr("src"),
                strHeadUrl:$("#headerUrl").val(),//传相对路径到服务器
                strMemberName:$("#strMemberName").val(),
                intMemberSex:$("input[name='sex']:checked").val(),//将0（男）1（女）传到服务器
                strFirst:$("#firstAlbum").val(),
                strAlbum:$("#album").val(),
                strMemberInaword:$("#selfDes").val(),
                strMemberOccupation :$("#profession").val(),
                strService:$("#service").val(),
                strLabel:$("#txtDescrible").val(),
                strIntroduce:$("#detailContent").html(),
                strIDCardPicture:$("#hold-front-img").val()+"|"+$("#hold-behind-img").val(),
                strIDCardNumber:$("#strIDCardNumber").val(),
                strAliPay:$("#strAliPay").val(),
                strBrith:$("#birth").val(),
                strServeScenic:pers,
                strServeCity:strCode

        //intMembYears:$("#intMembYears").val(),
                //strMobile:$("#strMobile").val(),
                //strProvince:$("#deliverprovince").val(),
                //strCity:$("#delivercity").val(),
                //strTown:$("#deliverarea").val(),
                //strAddress:$("#selfDes").val(),//一句话

                //strLanguate:languageStr,//传多个值
                //strLabel:$("#hold-mark").val(),//传多个值



            },*/
            data:jsgSubmit,
            dataType:"json",
            success: function(data) {
                if (data.Result == 1) {
                    var obj=JSON.parse(localStorage.person);
                    obj.guider=true;
                    localStorage.person=JSON.stringify(obj);
                    $(".tainxieItem:eq(2)").css({"background":"url(images/tianxieZt_5.png) no-repeat","color":"#fff"});
                    if(u.guider)
                    {
                        $("#error").text("信息修改成功！");
                        $("#pdf2").show();
                        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                    }
                    else
                    {
                        $(".wenxinTip").text("温馨提示：您的资料已提交！我们将在1-3个工作日进行审核，请您耐心等待！");
                        $("#error").text("你已成功申请旅行管家！");
                        $("#pdf2").show();
                        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);window.location='applyDetail.html'},1000);
                    }
                }
                else if (data.Result == -1) {
                    $("#error").text("注册旅行管家失败，请重新尝试");
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                }
                else if (data.Result == -99) {
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                }
            }
        });
    }
});
/*********************获取当地人个人资料信息*********************************/
function initData(){
    var u=JSON.parse(localStorage.person);
    var memId= u.user;
    var arrParam = { MemberID:memId};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Member_GetMember", strParam);
    $.ajax({
        type:"post",
        url:jsgDataServer + jsgDataVisit,
        data:jsgSubmit,
        dataType:"json",
        success: function(data){
            console.log(data)
            if(data.Result==1){
                $("#imgHead").attr("src",data.Model.HeadUrl);
                $("#strMemberName").text(data.Model.Name);
                $("#sex").text(data.Model.Sex==1?"男":"女");
                $("#birth").text(data.Model.Birth);
                $("#occupation").text(data.Model.Occupation);
                //$("#imgHead").attr("src",data.Model.HeadUrl);
                $(".results1:eq(0)").append('<div style="margin-top:0">' + data.Model.ServeCity + '</div>');
                //$(".results1:eq(1)").append('<div style="margin-top:0">' + data.Model.ServeScenic + '</div>');
                /*var strArr=data.Model.ServeCity.split(',');
                var perspect=data.Model.ServeScenic.split(',');
                var str="";
                for(n=0;n<perspect.length;n++)
                {
                    if(str.indexOf(perspect[n])==-1)
                    {
                        str+=perspect[n]+',';
                    }
                }
                perspect=str.split(',');
                    $.ajax({
                        type:"get",
                        url:'http://wx.nihaott.com/traveler/js/json.json',
                        data:{
                        },
                        dataType:"json",
                        success: function(data) {
                            for (var i = 0; i < strArr.length; i++) {
                                for (var h = 0; h < data.length; h++) {
                                    if (data[h].StateCode = "086") {
                                        for (var j = 0; j < data[h].ProvinceList.length; j++) {
                                            for (var k = 0; k < data[h].ProvinceList[j].CityList.length; k++) {
                                                if (data[h].ProvinceList[j].CityList[k].RegiID == strArr[i]) {
                                                    $(".results:eq(0)").append('<div data-code="' + strArr[i] + '">' + data[h].ProvinceList[j].CityList[k].CityName + '<a class="deleteArea">×</a></div>');
                                                    $(".results1:eq(0)").append('<div style="margin-top:0" data-code="' + strArr[i] + '">' + data[h].ProvinceList[j].CityList[k].CityName + '</div>');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                for (var i = 0; i < perspect.length-1; i++) {
                    for (var h = 0; h < perspective.length; h++) {
                        for (var j = 0; j <perspective[h].ScenList.length; j++) {
                                if (perspective[h].ScenList[j].ScenID == perspect[i]) {
                                    $(".results:eq(1)").append('<div data-code="' + perspect[i] + '">' + perspective[h].ScenList[j].ScenName + '<a class="deleteArea">×</a></div>');
                                    $(".results1:eq(1)").append('<div style="margin-top:0" data-code="' + perspect[i] + '">' + perspective[h].ScenList[j].ScenName + '</div>');
                                }
                        }
                    }
                }*/
                $("#selfDes").text(data.Model.Inaword);
                var urls=data.Model.AlbumUrl.split(',');
                //console.log(urls)
                for(var i=0;i<urls.length-1;i++)
                {
                    //$("#albums").append('<div class="albumsItem"><img src="'+imgUrl+urls[i]+'"/></div>');
                    //AlbumUrl
                    $("#albums").append('<div class="albumsItem"><img src="'+urls[i]+'"/></div>');
                }
                $("#first").attr("src",data.Model.IndexUrl);
                $("#service").text(data.Model.Service);
                $("#txtDescrible").text(data.Model.Introduce);
                $("#detailContent").html(data.Model.Detail);
                $("#strIDCardNumber").text(data.Model.Identity);
                $("#strAliPay").text(data.Model.Alipay);
                if(data.Model.IdPictures.replace(/(^\s*)||(\s*$)/g,"")!="")
                {
                    $("#IDcard-front-img").attr("src",data.Model.IdPictures.split("|")[0]);
                    $("#IDcard-behind-img").attr("src",jsgImageServer+data.Model.IdPictures.split("|")[1]);
                }
                /*修改资料页面信息初始化*/
                $("#strMemberName").val(data.Model.Name);
                $("input[name=sex]").each(function(){
                    if($(this).val()==data.Model.Sex)
                    {
                        this.checked=true;
                    }
                });
                var stralbumval='';
                for(var i=0;i<urls.length-1;i++)
                {
                    var strurls=urls[i].replace(jsgImageServer,"")
                    //$("#albumCons").append('<div class="albumsItem"><a name="'+urls[i]+'">×</a><img src="'+imgurl+urls[i]+'" style="width:118px;"/></div>');
                    $("#albumCon").append('<div class="albumsItem"><a name="'+strurls+'">×</a><img src="'+urls[i]+'" style="width:118px;" /></div>');
                    stralbumval+=strurls+",";
                }
                $("#birth").val(data.Model.Birth);
                $("#profession").val(data.Model.Occupation);
                /*var arr=data.Model.ServeCity.split(',');
                for(var i=0;i<arr.length-1;i++)
                {
                    $(".results:eq(1)").append("<div data-code='"+arr[i]+",'>"+arr[i]+"<a class='deleteArea'>×</a></div>");
                }*/
                $("#album").val(stralbumval);
                $("#headerUrl").val(data.Model.HeadUrl.replace(jsgImageServer,"")); //ttimgapitest.nihaott.com
                $("#firstAlbum").val(data.Model.IndexUrl.replace(jsgImageServer,"")); //imgapi.nihaott.com
                $("#strIDCardNumber").val(data.Model.Identity);
                $("#strAliPay").val(data.Model.Alipay);
                if(data.Model.IdPictures.replace(/(^\s*)||(\s*$)/g,"")!="")
                {
                    $("#hold-front-img").val((data.Model.IdPictures.split("|")[0]).replace(jsgImageServer,""));
                    $("#hold-behind-img").val((data.Model.IdPictures.split("|")[1]).replace(jsgImageServer,""));
                }
                //alert()
                /*$("#l-profession").text(data.Model.Occupation);
                $("input[name='profession']").val(data.Model.Occupation);
                $("#l-work-time").text(data.Model.Years+"年");
                $("input[name='work-time']").val(data.Model.Years);

                $("#l-language").text(data.Model.Language);
                var arr1=data.Model.Language.split(" ");
                for(i=0;i<arr1.length;i++){
                    $("input[value='"+arr1[i]+"']").attr("checked",true);
                }
                var arr=data.Model.Label.split(",");
                $("#hold-mark").val(data.Model.Label);
                for(i=0;i<arr.length-1;i++){
                    $("#l-pmark").append("<b style='border: 1px solid #ffdf7f;background: #fff7eb;color: #ff9500;padding:5px;'>"+arr[i]+"</b>");
                    $("#tailor-mark").append("<span>"+arr[i]+"</span>");
                    //$(".p-mark-right").prepend("<b style='border: 1px solid #ffdf7f;background: #fff7eb;color: #ff9500;margin-right:10px;'>"+arr[i]+"</b>");
                }
                $("#l-knowme").text(data.Model.Inaword);
                $("textarea[name='knowme']").val(data.Model.Inaword);
                $("#l-p-intro").append(data.Model.Introduce);
                $("#detailContent").append(data.Model.Introduce);
                $("#l-p-intro .imgOutBox").children("a").remove();

                //旅游管家获取
                $("#tailor-photo").attr("src",data.Model.HeadUrl);
                $("#tailor-name").text(data.Model.Name);
                $("#tailor-Occupation").text(data.Model.Occupation);
                $("#tailor-addr").text(data.Model.City);
                var birthDate=data.Model.BirthDate;//2016-10-17
                var birthYear=birthDate.substr(0,4);
                var myDate=new Date();
                var myYear=myDate.getFullYear();
                $("#tailor-age").text((myYear-birthYear)+"岁");

                $("#tailor-Inaword").text(data.Model.Inaword);*/
            }else{
                $("#error").text(data.Message);
                $("#pdf2").show();
                var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};
/*********************修改当地人个人资料信息*********************************/
function modifyInfo() {
    $("#SWFUpload_4").insertAfter($("#anchor"));
    var languageStr="";
    var elems=document.getElementsByName("language");
    for(var i=0;i<elems.length;i++){
        if(elems[i].checked){
            if(elems[i].value!="其它"){
                languageStr+=elems[i].value+" ";
            }else{
                languageStr+=$("#more-lang").val()+" ";
            }
        }
    }
    var u = JSON.parse(localStorage.person);
    var memId = u.user;
    var arrParam = { MemberID:memId,HeadUrl:$("#headerUrl").val(),First:$("#firstAlbum").val(),Album:$("#albumCons").text(),ServeScenic:$("#results").val(),ServeCity:$("#jingqu").val(),MemberName:$("#strMemberName").val(),MemberSex:$("input[name='sex']:checked").val(),Birth:$("#birth").val(),Inaword:$("#selfDes").val(),Occupation:$("#profession").val(),Service:$("#service").val(),Label:$("#txtDescrible").val(),Introduce:$("#detailContent").html(),IdentityP:$("#hold-front-img").val()+"|"+$("#hold-behind-img").val(),Identity:$("#strIDCardNumber").val(),AliPay:$("#strAliPay").val()};
    console.log(arrParam);
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Member_GetMember", strParam);
    $.ajax({
        type: "post",
        url:jsgDataServer+jsgDataVisit,
        data:jsgSubmit,
        /*data: {
            strMemberID: memId,
            strHeadUrl: $("#hold-upload-img-url").val(),//传相对路径
            strMemberName: $("input[name='name']").val(),
            intMemberSex: $("input[name='sex1']:checked").val(),
            //strMobile:$("input[name='mobile']").val(),
            strProvince: $("#deliverprovince").val(),
            strCity: $("#delivercity").val(),
            strTown: $("#deliverarea").val(),
            strAddress: $("textarea[name='addr']").val(),
            strIDCardPicture: $("#hold-front-img").val()+"|"+$("#hold-behind-img").val(),//传相对路径
            strIDCardNumber: $("input[name='IDcard']").val(),
            strAliPay: $("input[name='AliPay']").val(),
            intMembYears: $("input[name='work-time']").val(),
            strLanguate: languageStr,//
            strLabel: $("#hold-mark").val(),//传隐藏域值，获取显示的时候样式要做处理
            strMemberInaword: $("textarea[name='knowme']").val(),
            strIntroduce: $("#detailContent").html(),
            strMemberOccupation:$("input[name='profession']").val()
        },*/
        dataType: "json",
        success: function (data) {
            if (data.Result == 1) {
                var obj = JSON.parse(localStorage.person);
                obj.header = $("#hold-upload-img-url").val();
                localStorage.person = JSON.stringify(obj);
                $("#error").text(data.Message);
                $("#pdf2").show();
                var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                $(".base-info-edit").hide();
                $("#base-info").show();
                window.location = "";
            } else if (data.Result == -99) {
                //alert(data.Message);
                $("#error").text("头像相对路径不对");
                $("#pdf2").show();
                var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
            }
        }
    });
}
$("#base-info-edit-save").click(function(){
    modifyInfo();
});
$("#account-info-edit-save").click(function(){
    modifyInfo();
});
$("#prev").click(function(){
    $(".profiles").hide();
    $(".profiles:eq(0)").show();
    $(".tainxieItem:eq(1)").css({"background":"url(images/tianxieZt_2.png) no-repeat","color":"#808080"});
});
/**************旅行管家详情***************/
$(".p-intro-s div:nth-child(1)").mouseover(function(){
   $(this).children(".active").css("display","inline-block");
});
$(".p-intro-s div:nth-child(1)").mouseout(function(){
    $(this).children(".active").hide();
});
$(".p-intro-s div:nth-last-child(1)").mouseover(function(){
    $(this).children(".active").css("display","inline-block");
});
$(".p-intro-s div:nth-last-child(1)").mouseout(function(){
    $(this).children(".active").hide();
});
$("#arrow-up").click(function(){

});
$("#arrow-down").click();
//合计价格
function calSum()
{
    var sum=0;
    $(".pro-box-sub").each(function(){
        sum+=parseFloat($(this).find(".pro-list-total-price").text());
    });
    $("#pro-list-sum").text(accounting.formatNumber(sum,2));
}
//产品价格加减
//
function AccurateAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
function AccurateSubtract(arg1, arg2) {
    return AccurateAdd(arg1, -arg2);
}
function AccurateMultiply(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
function AccurateVivide(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

$(".minus").click(function(){
    var name=$(this).attr("name");
    var num=parseInt($(this).prev().val())-1;
    var txt=$(this).parent().find("a").text().split('|');
    $(this).prev().val(num);
    if($(this).prev().val()>0){
        $("#"+name).find(".pro-list-amount").text(parseInt($(this).prev().val()));
        var fltTotal = AccurateMultiply(txt[2], parseInt($(this).prev().val()));
        //$("#"+name).find(".pro-list-total-price").text(txt[2]*parseInt($(this).prev().val()));
        $("#"+name).find(".pro-list-total-price").text(fltTotal);
        console.log(txt[2])
        calSum();
    }
    else
    {
        $("#"+name).remove();
        $(this).prev().val(0);
        $(this).parent().children().hide();
        $(this).parent().children("input:eq(0)").show();
        calSum();
    }
    var len=$(".pro-box-sub").length;
    if(len==0)
    {
        $("#wrap-div").hide();
    }
});
$(".plus").click(function(){
    var name=$(this).attr("name");
    var num=parseInt($(this).next().val())+1;
    if(num<=99)
    {
        $(this).next().val(num);
        $("#wrap-div").show();
        $(this).parent().children("input").show();
        var txt=$(this).parent().find("a").text().split('|');
        var str='<div class="pro-box-sub" id="'+name+'"><input type="hidden" value="'+txt[3]+'"/><span class="picture"><img src="'+txt[0]+'" class="pro-list-firstUrl" style="width: 60px;height: 60px;"/><a name="'+$(this).attr("name")+'" style="font-size:12px;color: #999999;cursor: pointer;<!--color: #ff9500-->;">删除</a></span><span class="text"><p class="pro-list-name" style="text-align: justify;" data_sell="'+txt[4]+'">'+txt[1]+'</p> <p><s>单价：</s><b class="pro-list-price" data_ver="'+txt[5]+'">'+txt[2]+'</b></p><p><s>数量：</s><b class="pro-list-amount"> </b>份</p><p><s>小计：</s><span style="color: #ff9500;">￥</span><b style="color: #ff9500;" class="pro-list-total-price"></b></p></span></div>'
        if($("#"+name).length==0)
        {
            $(".pro-box").append(str);
        }
        $("#"+name).find(".pro-list-amount").text(num);
        var fltTotal = AccurateMultiply(txt[2], num);
        //$("#"+name).find(".pro-list-total-price").text(Number(txt[2])*num,2);
        $("#"+name).find(".pro-list-total-price").text(fltTotal);

        var top=$(window).scrollTop();
        resetPos(top);
        calSum();
    }
});
$(".result").keyup(function(){
    var name=$(this).attr("name");
    var txt=$(this).parent().find("a").text().split('|');
    if($(this).val()>0){
        $("#"+name).find(".pro-list-amount").text(parseInt($(this).val()));
        $("#"+name).find(".pro-list-total-price").text(txt[2]*parseInt($(this).val()));
        calSum();
    }
    else
    {
        $("#"+name).remove();
        $(this).val(0);
    }
    var len=$(".pro-box-sub").length;
    if(len==0)
    {
        $("#wrap-div").hide();
    }
});
//产品详情删除
$(".pro-box").on("click","a",function(){
var n=$(this).attr("name");
    $("#"+n).remove();
    $("input[name="+n+"].result").val(0);
    $("input[name="+n+"].result").parent().children().hide();
    $("input[name="+n+"].result").parent().children("input:eq(0)").show();
    var len=$(".pro-box-sub").length;
    if(len==0)
    {
        $("#wrap-div").hide();
    }
});

//点击去结算
$("#go-pay").click(function(){
    var arr=new Array();
    var result=null;
    $(".pro-box-sub").each(function(){
        var obj={pid:$(this).find("input").val(),pname:$(this).find(".pro-list-name").text(),pimg:$(this).find(".pro-list-firstUrl").attr("src"),price:$(this).find(".pro-list-price").text(),pNum:$(this).find(".pro-list-amount").text(),totalPrice:$(this).find(".pro-list-total-price").text(),sell:$(this).find(".pro-list-name").attr("data_sell"),ver:$(this).find(".pro-list-price").attr("data_ver")};
        arr.push(obj);
        result={r:arr};
    });
    localStorage.product=JSON.stringify(result);
    window.location='SubInfo.html';
});
/******************获取导游商品列表***************************/
function GetTailorSellList(){
    var arrParam = { TailorID:localStorage.uId};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Index_GetTailorSellList", strParam);
    $.post(jsgDataServer+jsgDataVisit,
        jsgSubmit,
        function(data){
        if(data.Result==1){
            if(data.List.length>0)
            {
                var originLen=$(".title-box-sub").length;
                var index=0;
                $(".title-box-sub").each(function(){
                    if(index<originLen-data.List.length)
                    {
                        $(this).remove();
                        index++;
                    }
                });
                for(var i=0;i<data.List.length;i++)
                {
                    $(".tailor-pro-name:eq("+i+")").text(data.List[i].Name);
                    $(".pro-price:eq("+i+")").text(data.List[i].SellPrice);
                    $(".tailorFirstUrl:eq("+i+")").attr("src",data.List[i].FirstUrl);
                    $(".calc:eq("+i+") input").attr("name","pro"+i);
                    //$(".ammounts:eq("+i+")").text(data.List[i].TotalSales);
                    $(".tailortuijian:eq("+i+")").html("<b></b><s><i><img src='images/star10.jpg'/></i>"+data.List[i].Reason+"</s>");
                    $(".hiddenInfo:eq("+i+")").text(data.List[i].FirstUrl+"|"+data.List[i].Name+"|"+data.List[i].SellPrice+"|"+data.List[i].ProductID+"|"+data.List[i].SellID+"|"+data.List[i].Variety);
                }
                $(".title-box-sub").show();
            }
            else
            {
                $("#error").text("没有产品！");
                $("#pdf2").show();
                var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t)},2000);
            }
        }
        else {
            alert(data.Message);
        }
    });
}
//支付页面初始化数据字段，保存到本地数据(subInfo.html)
function initailProduct()
{
    if(localStorage.product==null||localStorage.product==undefined||localStorage.product=="null")
    {
        window.location='index.html';
    }
    else
    {
        var products=JSON.parse(localStorage.product);
        checkUser(1);
        var len=products.r.length;
        var dLen=$(".infoContnet").length;
        var index=0;
        var maintain=dLen-len;
        if(maintain>0)
        {
            $(".infoContnet").each(function(){
                if(index<maintain)
                {
                    $(this).remove();
                    index++;
                }
            });
        }
        var mLen=$(".infoContnet").length;
        var allMoney=0;
        var arr=[];
        for(var j=0;j<mLen;j++)
        {
            arr.push(products.r[j].ver);
            $(".leftImg:eq("+j+") img").attr("src",products.r[j].pimg);
            $(".rightContent:eq("+j+") div").text(products.r[j].pname);
            $(".singlePrice:eq("+j+")").text(accounting.formatNumber(products.r[j].price,2));
            $(".quantity:eq("+j+")").text(products.r[j].pNum);
            $(".totalPrice:eq("+j+")").text(accounting.formatNumber(products.r[j].totalPrice,2));
            var p=parseFloat(products.r[j].totalPrice);
            allMoney+=p;
        }
        if($.inArray("01",arr)==-1){
            $(".outing").css("display","none");
            $(".address").css("display","block");
            $(".addressdetail").css("display","block");
        }else if($.inArray("02",arr)==-1){
            $(".outing").css("display","block");
            $(".address").css("display","none");
            $(".addressdetail").css("display","none");
        }
        /*//for(var i=0;i<arr.length;i++){
            jQuery.inArray("01",arr)
        //}*/
        $(".infoContnet").show();
        $("#actMoney").text(accounting.formatNumber(allMoney,2));
        var proir=parseInt($("#proir").text());
        $("#allMoney").text(accounting.formatNumber(allMoney-proir,2));
    }
}
//修改日期
$(".modifyTime").click(function(){
    $(".hotelTip").children("input").removeAttr("id");
    $(this).parent("div").children("input:eq(0)").attr("id","stime");
    $(this).parent("div").children("input:eq(1)").attr("id","etime");
    $('#stime').datetimepicker({
        lang:'ch',
        timepicker:false,
        onChangeDateTime:function(){
            $(this).hide();
            $("#etime").focus();
        }
    });
    $('#etime').datetimepicker({
        lang:'ch',
        timepicker:false,
        onChangeDateTime:function(){$(this).hide();}
    });
    $("#stime").focus();
});
//开始创建订单
$("#submitButton").click(function(){
    var mobileReg = /(^1[3578][01379]\d{8}$)|(^1[34578][01256]\d{8}$)|(^(134[012345678]\d{7}|1[34578][012356789]\d{8})$)/g;//验证手机号码的正则表达式
    var name=$("#uName").val();
    var phone=$("#phone").val();
    var playdata=$("#playdate").val();
    var detailaddress=$("#txt_address").val()+$("#detailaddress1").val();
    if(localStorage.person==null||localStorage.person==undefined)
    {
        localStorage.setItem("url","SubInfo.html");
        $("#error").text("您还没有登录！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);window.location='Login.html';},1000);
    }
    else
    {
        if($("#uName").val().replace(/(^\s*)|(\s*$)/g, "")=="")
        {
            $("#uName").focus();
            $("#error").text("请填写您的姓名！");
            $("#pdf2").show();
            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
        }
        else if(name.replace(/(^\s*)|(\s*$)/g,"")==""||!mobileReg.test(phone))
        {
            $("#phone").focus();
            $("#error").text("请填写正确格式的手机号码");
            $("#pdf2").show();
            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
        }
        else if($(".outing").is(":visible") && playdata==""){
            $("#playdate").focus();
            $("#error").text("请填写出游日期");
            $("#pdf2").show();
            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
        }
        else if($(".address").is(":visible") && detailaddress=="" && $("#detailaddress1").val()==""){
            $("#detailaddress1").focus();
            $("#error").text("请填写收货地址");
            $("#pdf2").show();
            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
        }
        /*else if($("#playdate").val()=="")
        {
            $("#playdate").focus();
            $("#error").text("请填写出游日期");
            $("#pdf2").show();
            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
        }*/
        else
        {

            if($(".outing").is(":hidden")){
                if(GetString(playdata)==""){
                    playdata="1900-01-01";
                }
            }
            if(localStorage.product!=null&&localStorage.product!=undefined)
            {
                $("#pdf4").show();
                var arr=JSON.parse(localStorage.product).r;
                var proArr=new Array();
                var subArr=new Array();
                for(var i=0;i<arr.length;i++)
                {
                    var obj={SellID:arr[i].sell,ProductID:arr[i].pid,ThirdCode:"",Variety:arr[i].ver,Quantity:arr[i].pNum,Linkman:name,Linkphone:phone,Region:"",Address:detailaddress,PlayDate:playdata,InDate:"1900-01-01",OutDate:"1900-01-01",Identity:""};
                    proArr.push(JSON.stringify(obj));
                    obj={pName:arr[i].pname,price:arr[i].price,pNum:arr[i].pNum,pTotal:arr[i].totalPrice};
                    subArr.push(obj);
                }
                var u=JSON.parse(localStorage.person);
                var arrParam = { TailorID:localStorage.uId,TravelerID:u.user,Name:name,Mobile:phone,Identity:"",SmsCode:"",GoodsList:"["+proArr.toString()+"]"};
                console.log(arrParam)
                var strParam = JSON.stringify(arrParam);
                jsgSubmit = "strRequest=" + GetVisitData("Order_CreateOrder", strParam);
                $.ajax({
                    type: "post",
                    url:jsgDataServer+jsgDataVisit,
                    data:jsgSubmit,
                    /*data: {
                        strTailorID:localStorage.uId,
                        strTravelerID : u.user,
                        strName:name,
                        strMobile:phone,
                        strIdentity:"",
                        strRedID:"",
                        strGoodsJson:"["+proArr.toString()+"]"
                    },*/
                    dataType: "json",
                    success: function (data) {
                        if(data.Result==1)
                        {
                            $("#pdf4").hide();
                            var order={info:subArr,Ord:data.Model};
                            localStorage.orderInfo=JSON.stringify(order);
                            window.location='OrderCreated.html';
                        }
                        else
                        {
                            $("#pdf4").hide();
                            $("#error").text(data.Message);
                            $("#pdf2").show();
                            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);/*window.location="index.html";*/},1000);
                        }
                    },
                    error:function(data){
                        console.log(data);
                    }
                });
            }
            else
            {
                $("#pdf4").hide();
                $("#error").text("没有订单信息！");
                $("#pdf2").show();
                var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);window.location="index.html";},1000);
            }

        }
    }
});
//提交订单页面获取订单信息
function orderInfo()
{
    if(localStorage.person==null||localStorage.person==undefined)
    {
        $("#error").text("您还没有登录！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);window.location='Login.html';},1000);
    }
    else
    {
        if(localStorage.orderInfo!=undefined&&localStorage.orderInfo!=null)
        {
            var obj=JSON.parse(localStorage.orderInfo);
            var len=obj.info.length;
            var dlen=$(".orders").length;
            var maintain=dlen-len;
            var counter=0;
            $(".orders").each(function(){
                if(counter<maintain)
                {
                    $(this).remove();
                    counter++;
                }
            });
            for(var i=0;i<len;i++)
            {
                $(".orders:eq("+i+")").find(".name").text(obj.info[i].pName);
                $(".orders:eq("+i+")").find(".pprice").text(accounting.formatNumber(obj.info[i].price,2));
                $(".orders:eq("+i+")").find(".count").text(obj.info[i].pNum);
                $(".orders:eq("+i+")").find(".total").text(accounting.formatNumber(obj.info[i].pTotal,2));
                $("#orderId").text(obj.Ord.OrderID);
                $("#ctime").text(obj.Ord.CreateDate);
                $("#actPay").text(accounting.formatNumber(obj.Ord.Payable,2));
            }
        }
        else
        {
            $("#error").text("没有订单信息！");
            $("#pdf2").show();
            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);window.location="index.html";},1000);
        }
    }
}
//去支付
function goPay()
{
    //alert(localStorage.orderInfo);
    if(localStorage.orderInfo!=null&&localStorage.orderInfo!=undefined)
    {
        $("#pdf3").show();
        var obj=JSON.parse(localStorage.orderInfo);
        aa={strOrderID:obj.Ord.OrderID};
        console.log(aa);
        $.ajax({
            type:"post",
            url:jsgWxPayServer+'/UniformOrder/UniformOrderQrWx',
            //data:{strOrderID:obj.Ord.OrderID},
            //data: "strOrderID="+obj.Ord.OrderID,
            data:aa,
            dataType:"json",
            success: function(data){
                if(data.Result==1){
                    var url=data.CodeUrl;
                    localStorage.wUrl=url;
                    qrCode();
                }
                else{
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                }
            },
            error:function(data){
                console.log(data);
            }
        });
    }
    else
    {
        $("#error").text(data.Message);
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
        window.location='index.html';
    }
}
$(".pay").click(function(){
    $("#pdf4").show();
});
$(".confirmBt").click(function(){
    $("#pdf4").hide();
    window.location='OrderOfTourist.html';
});
//支付页面二维码生成
function toUtf8(str) {
    alert(str);
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    console.log(out);
    return out;
}
function qrCode()
{
    if(localStorage.wUrl!=null&&localStorage.wUrl!=undefined)
    {
        $("#code").empty();
        var str =localStorage.wUrl;
        str = toUtf8(str);
        $('#code').qrcode(str);
        $("#pdf3").hide();
        var obj=JSON.parse(localStorage.orderInfo);
        $(".wPrice").text(accounting.formatNumber(obj.Ord.Payable,2));
        setInterval(function(){
            var arrParam = {OrderID:obj.Ord.OrderID};
            var strParam = JSON.stringify(arrParam);
            jsgSubmit = "strRequest=" + GetVisitData("Order_GetOrderPayable", strParam);
            $.ajax({
                type:"post",
                //url:gUrl+"/Traveler/GetTravelerOrder",
                //data:{strOrderID:obj.Ord.OrderID},
                url:jsgDataServer+jsgDataVisit,
                data:jsgSubmit,
                dataType:"json",
                success: function(data){
                    if(data.Result==1){
                        if(data.Status==1)
                        {
                            var person=JSON.parse(localStorage.person);
                            localStorage.clear();
                            localStorage.person=JSON.stringify(person);
                            $("#error").text("您的订单已支付成功！");
                            $("#pdf2").show();
                            var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);window.location='OrderofTourist.html';},200);
                        }
                    }
                    else{
                        $("#error").text(data.Message);
                        $("#pdf2").show();
                        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},200);
                    }
                }
            });
        },800);
    }
    else
    {
        window.location='index.html';
    }
}
//获取旅行管家的详情(guiderDetail.html)
function managerInfo(){
    if(localStorage.uId!=null&&localStorage.uId!=undefined)
    {
        var u=localStorage.uId;
        var arrParam = { TailorID:u};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Index_GetTailor", strParam);
        $.ajax({
            type:"post",
            url:jsgDataServer+jsgDataVisit,
            data:jsgSubmit,
            dataType:"json",
            success: function(data){
                if(data.Result==1){
                    $("#tailor-photo").attr("src",data.Model.HeadUrl);
                    $("#tailor-name").text(data.Model.Name);
                    //$("#tailor-Occupation").text(data.Model.Occupation);
                    //$("#tailor-addr").text(data.Model.Province+data.Model.City+data.Model.Town);

                    //$("#tailor-age").text(diff);
                   // $("#tailor-lang").text(data.Model.Language);
                    if(data.Model.Occupation!="")
                    {
                        $("#personDes").append("<span>"+data.Model.Occupation+"</span>");
                    }
                    if(data.Model.ServiceCity!=""||data.Model.CityName!=""||data.Model.ScenicName!="")
                    {
                        $("#personDes").append("<span>"+data.Model.ServiceCity+data.Model.CityName+data.Model.ScenicName+"</span>");
                    }
                    $("#personDes").append("<span>"+data.Model.Age+"岁</span>");
                    /*if(data.Model.BirthDate!="")
                    {
                        var date=new Date();
                        var diff=parseInt((date-Date.parse(data.Model.BirthDate))/1000/60/60/24/365);
                        $("#personDes").append("<span>"+diff+"岁</span>");
                    }*/
                    if(data.Model.Language!="")
                    {
                        $("#personDes").append("<span>"+data.Model.Language+"</span>");
                    }
                    /*var str="";
                    for(var i=0;i<data.Model.Label.split(',').length-1;i++)
                    {
                        str+="<span>"+data.Model.Label.split(',')[i]+"</span>";
                    }
                    $("#tailor-mark").html(str);*/
                    $("#tailor-Inaword").text(data.Model.Inaword);
                    $("#big").attr("src",data.Model.IndexUrl);
                    str='<div class="thumb"><img src="'+data.Model.IndexUrl+'"/></div>';
                    for(var j=0;j<data.Model.AlbumUrl.split(',').length;j++)
                    {
                        str+='<div class="thumb"><img src="'+data.Model.AlbumUrl.split(',')[j]+'"/></div>';
                    }
                    $("#imgCon").html(str);
                    initialImg(5);
                    str="";
                }
                else{
                    alert(data.Message);
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
                }
            }
        });
    }
    else
    {
        window.location='index.html';
    }
};
//窗口滚动设置div的浮动效果
//leftOffset:div相对于网页左边的偏移量
//topOffset:div相对于网页顶部的偏移量
function resetPos(t)
{
    if($(".pro-box").find("div").length>0)
    {
        $("#wrap-div").show();
        if(t>topOffset)
        {
            $("#wrap-div").addClass("fixedDiv");
            $("#wrap-div").css({"left":leftOffset,"margin":0});
        }
        else
        {
            $("#wrap-div").removeClass("fixedDiv");
        }
    }
    else
    {
        $("#wrap-div").hide();
    }
}
$(window).scroll(function(){
    var top=$(window).scrollTop();
    resetPos(top);
});
var picIndex=0;
var imgLength=0;
var imgHeight=0;
//导游详情页的相册图片初始化
function initialImg(count)
{
    imgLength=$(".thumb").length;
    imgHeight=parseInt($(".thumb:eq(0)").css("height"));
    if(count<imgLength)
    {
        for(var i=0;i<imgLength;i++)
        {
            if(i<count)
            {
                $(".thumb:eq("+i+")").attr("name","0");//0：表示不需滚动
            }
            else
            {
                $(".thumb:eq("+i+")").attr("name","1");//1：需要滚动
            }
        }
    }
    else
    {

        for(var i=0;i<imgLength;i++)
        {
            $(".thumb:eq("+i+")").attr("name","0");//0：表示不需滚动
        }
    }
    if(imgLength<2)
    {
        $("#arrowUp").hide();
        $("#arrowDown").hide();
    }
    else
    {
        $("#arrowUp").hide();
    }
    $(".thumb:eq(0)").css({"opacity":"1","filter":"alpha(opacity=100)"});
}
//图片向上滚动
$("#arrowDown").click(function(){

    var marginTop=parseInt($("#imgCon").css("margin-top"));
    picIndex++;
    if(picIndex<imgLength-1)
    {
        var isHide=$(".thumb:eq("+picIndex+")").attr("name");
        if(isHide=="1")
        {
            $("#imgCon").css("margin-top",marginTop-imgHeight+"px");
            $(".thumb").attr("name","1");
            for(var i=picIndex-4;i<=picIndex;i++)
            {
                $(".thumb:eq("+i+")").attr("name","0")
            }
        }
    }
    else
    {
        var isHide=$(".thumb:eq("+picIndex+")").attr("name");
        if(isHide=="1")
        {
            $("#imgCon").css("margin-top",marginTop-imgHeight+"px");
            $(".thumb").attr("name","1");
            for(var i=picIndex-4;i<=picIndex;i++)
            {
                $(".thumb:eq("+i+")").attr("name","0")
            }
        }
        $(this).hide();
        $("#arrowUp").show();
    }
    $(".thumb").css({"opacity":"0.5","filter":"alpha(opcaity=50)"});
    $(".thumb:eq("+picIndex+")").css({"opacity":"1","filter":"alpha(opcaity=100)"});
    $("#big").attr("src",$(".thumb:eq("+picIndex+")").children("img").attr("src"));
});
//图片向下滚动
$("#arrowUp").click(function(){
    var marginTop=parseInt($("#imgCon").css("margin-top"));
        imgLength=$(".thumb").length;
        picIndex--;
        var isHide=$(".thumb:eq("+picIndex+")").attr("name");
        if(isHide=="1")
        {
            $("#imgCon").css("margin-top",marginTop+imgHeight+"px");
            $(".thumb").attr("name","1");
            for(var i=picIndex;i<=picIndex+4;i++)
            {
                $(".thumb:eq("+i+")").attr("name","0")
            }
        }
        if(picIndex==0)
        {
            $(this).hide();
            $("#arrowDown").show();
        }
        /*if(picIndex>5)
        {

        }
        else
        {
            if(picIndex!=0)
            {
                $("#imgCon").css("margin-top",marginTop+imgHeight+"px");
                $(".thumb").attr("name","1");
                for(var i=picIndex;i<=picIndex+4;i++)
                {
                    $(".thumb:eq("+i+")").attr("name","0")
                }
            }
            else
            {
                $(this).hide();
                $("#arrowDown").show();
            }
        }*/
        $(".thumb").css({"opacity":"0.5","filter":"alpha(opcaity=50)"});
        $(".thumb:eq("+picIndex+")").css({"opacity":"1","filter":"alpha(opcaity=100)"});
        $("#big").attr("src",$(".thumb:eq("+picIndex+")").children("img").attr("src"));
});
$("#imgCon").on("click",".thumb",function(){
    picIndex=$(this).index(".thumb");
    if(picIndex==imgLength-1)
    {
        $("#arrowUp").show();
        $("#arrowDown").hide();
    }
    else if(picIndex==0)
    {
        $("#arrowUp").hide();
        $("#arrowDown").show();
    }
    else
    {
        $("#arrowUp").show();
        $("#arrowDown").show();
    }
    $(".thumb").css({"opacity":"0.5","filter":"alpha(opcaity=50)"});
    $(".thumb:eq("+picIndex+")").css({"opacity":"1","filter":"alpha(opcaity=100)"});
    $("#big").attr("src",$(this).find("img").attr("src"));
});




