// JavaScript Document

var imgstr="http://imgapi.traveltailor.cn";//获取图片的地址 http://ttimgapitest.nihaott.com/  http://imgapi.nihaott.com
//分页控件，需要提供的参数是总页数和当前页
//pgCount:总页数
//currentPage:当前页
//stat：产品状态
//count:每一页的显示数量
//total:总页数
var stat=1;//我的产品状态
var count=10;
function setPage(pgCount, currentPage) {
    if(pgCount>1)
    {
        var str = '';
        if (pgCount > 0) {
            if (currentPage != 1) {
                //str += "<a name='1'>首页</a><a name='"+(currentPage-1)+"'>上一页</a>";
                str += "<a class='pg' name='"+(currentPage-1)+"'>\<</a>";
            }
        }
        if (pgCount <=4) {
            for (var i = 1; i <= pgCount; i++) {
                str += "<a class='pg' name='"+i+"'>" + i + "</a>";
            }
        }
        else {
            if (currentPage < 4) {
                if (currentPage != 1) {
                    for (var i = 1; i < 5; i++) {
                        str += "<a class='pg' name='"+i+"'>" + i + "</a>";
                    }
                    str += "<a style='border:none;'>......</a><a name='"+pgCount+"'>" + pgCount + "</a>";
                }
                else {
                    for (var i = 1; i < 4; i++) {
                        str += "<a class='pg' name='"+i+"'>" + i + "</a>";
                    }
                    str += "<a style='border:none;'>......</a><a class='pg' name='"+pgCount+"'>" + pgCount + "</a>";
                }
            }
            else if (currentPage >= 4 && currentPage < pgCount - 3) {
                str += "<a class='pg'>1</a><a style='border:none;'>......</a>";
                for (var i = (currentPage -1) ; i <= currentPage+1; i++) {
                    str += "<a class='pg' name='"+i+"'>" + i + "</a>";
                }
                str += "<a style='border:none;'>......</a><a  class='pg' name='"+pgCount+"'>" + pgCount + "</a>";
            }
            else if (currentPage >= pgCount - 3) {
                str += "<a class='pg' name='1'>1</a><a style='border:none;'>......</a>";
                for (var i = pgCount - 4; i <= pgCount; i++) {
                    str += "<a class='pg' name='"+i+"'>" + i + "</a>";
                }
            }
        }
        if (pgCount > 0) {
            if (currentPage != pgCount) {
                //str += "<a name='"+(currentPage+1)+"'>下一页</a><a class='lastPg' name='"+pgCount+"'>尾页</a>";
                str += "<a class='pg' name='"+(currentPage+1)+"'>\></a>";
            }
            if(pgCount>5)
            {
                $(".jumpBt").show();
            }
            /*if (pgCount != 0) {
             str += "<span>第" + currentPage + "/共" + pgCount + "页</span>";
             }*/
        }
        if(pgCount>=currentPage)
        {
            $("div#pagers").html(str);
        }
        else
        {
            $("div#pagers").html("");
        }
        $("div#pager a").each(
            function () {
                if ($(this).text() == currentPage.toString()) {
                    $(this).css({"background-color":"#ff9500","color":"#fff","border":"1px solid #ff9500"});
                }
            }
        );
        $("div#pager a.lastPg").css("border-right", "1px solid rgb(204, 204, 204)");
    }
    else
    {
        $("#pagers").html("");
    }
}
//首页页面大小改变时出发该事件
function setSize() {
    var width = window.document.body.clientWidth;
    var imgWidth = (width - 15) / 4;
    var imgHeight = 295/ 476 * imgWidth;
    $(".rotatebox").css({ "height": imgHeight });
    $("#imgs").css("height", imgHeight + 10);
        $("div#imgBox").css("height",680/1920*width);
        $("#imgBox img").css("height",680/1920*width);
    $("#imgBanner").css("height",450/1920*width);
}
//计算页数
//total：总记录数
//pageSize:每一页记录数
function pages(total,psize)
{
    var p=parseInt(total/psize);
    var m=total%psize;
    if(m>0)
    {
        p++;
    }
    return p;
}
//查询订单详情(修改)所用的id值
function oDetail(strId,url)
{
    localStorage.setItem("oid",strId);
    window.location=url;
}
var hstr="http://webapi.nihaott.com"; //原正式
//var hstr="http://192.168.10.10:8011"; 原测试
//var jsgVistHost = jsgDataServer + jsgDataVisit;
//订单详情
function orderDetail()
{
    var mid=localStorage.getItem("oid");
    var arrParam = { OrderID:mid};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Member_GetOrderGoods", strParam);
    $.ajax({
        type: "post",
        url: jsgDataServer+jsgDataVisit,
        data:jsgSubmit,
        dataType: "json",
        success: function (data) {
            if(data.Result==1)
            {
                $("#oId").text(data.Model.OrderID);
                $("#oTime").text(data.Model.CreateTime);
                $("#tName").text(data.Model.Name);
                $("#tPhone").text(data.Model.Mobile);
                /*switch(data.List[j].OrderStatus)
                {
                    case 0:status="未付款";break;
                    case 1:status="已付款";break;
                    case 2:status="已使用";break;
                    case 3:status="已完成";break;
                    case -1:status="已取消";break;
                    case -2:status="已退订";break;
                    case -3:status="已关闭";break;
                }*/
                $("#ostatus").text("【"+data.Model.StatusText+"】");
                //$("#oProdcut").text(data.Model.GoodsList[0].GoodsName);
                //$("#pPrice").text(accounting.formatNumber(data.Model.GoodsList[0].GoodsPrice,2));
                //$("#oCount").text(data.Model.GoodsList.length);
                $("#afterProior").text(accounting.formatNumber(data.Model.OrderTotal,2));
                $("#proior").text(accounting.formatNumber(data.Model.OrdeRebate,2));
                $("#allMoney").text(accounting.formatNumber(data.Model.OrderTotal,2));
                $("#afterProior").text(accounting.formatNumber(data.Model.Payable,2));
                $("#proior").text(accounting.formatNumber(data.Model.RedValue,2));
                $("#allMoney").text(accounting.formatNumber(data.Model.Total,2));
                var str='<table id="orderDetail" cellpadding="0" cellspacing="0"><tr><th width="40%">产品名称</th><th width="20%">产品价格</th><th width="20%">数量</th><th width="20%">总计</th></tr>';
               
                for(var i=0;i<data.Model.GoodsList.length;i++)
                {
                    //str+="<tr><td>"+data.Model.GoodsList[i].GoodsName+"</td><td>"+accounting.formatNumber(data.Model.GoodsList[i].GoodsPrice,2)+"</td><td>"+data.Model.GoodsList[i].GoodsCount+"</td><td>"+accounting.formatNumber(data.Model.GoodsList[i].GoodsAmount,2)+"</td></tr>"
                    str+="<tr><td>"+data.Model.GoodsList[i].Name+"</td><td>"+accounting.formatNumber(data.Model.GoodsList[i].SellPrice,2)+"</td><td>"+data.Model.GoodsList[i].Quantity+"</td><td>"+accounting.formatNumber(data.Model.GoodsList[i].Amount,2)+"</td></tr>"
                }
                str+="</table>"
                $("#detailsInfo").html(str);
            }
            else{
                $(".p_rightBox div").hide();
                $("#error").text("没有此订单！");
                $("#pdf2").show();
                var t=setTimeout(function(){window.location='OrderOfGuider.html';},2000);
            }
        },
        error:function(data){
            console.log(data)
        }
    });
}

//获取旅行管家产品列表  我的产品
var pStatus=1;
function getGoods(currentPg)
{
    var result='<div class="p_allMsg p_allMsg_Areal product" style="height:auto;border:none;"> <div class="p_allMsg_tbHeader" style="border-bottom:1px solid #e0e0e0"> <div class="p_allMsg_tbHeader_Item" style="width:33%;font-weight:bold;">产品名称</div> <div class="p_allMsg_tbHeader_Item" style="width:17%;font-weight:bold;">销售价</div> <div class="p_allMsg_tbHeader_Item" style="width:17%;font-weight:bold;">库存</div> <div class="p_allMsg_tbHeader_Item" style="width:33%;font-weight:bold;">操作</div> <div style="clear:both;"></div> </div></div>';
    var u=JSON.parse(localStorage.getItem("person"));
    var isGuider= u.guider;
    if(u!=null&&u!=undefined)
    {
        var str= u.user;
        var url="productDetail.html";
        if(!isGuider)
        {
            $("#modal-local").show();
            //window.location='PCenter.html';
        }
        else
        {
            $("#pdf4").show();
            $.ajax({
                type: "post",
                url: hstr+"/Tailor/GetTailorProductList",
                data: {
                    //strMemberID:"c1e35e8b9b474698b0817c75f7377818",//测试用编号
                    strMemberID:str,
                    intStatus:pStatus,
                    intBegin:(currentPg-1)*count,
                    intCount:count
                },
                dataType: "json",
                success: function (data) {
                    if(data.Result==1)
                    {
                        if(pStatus=="1")
                        {
                            $(".p_Statuse:eq(0)").next("span").text("("+data.Total+")");
                        }
                        else if(pStatus=="-1")
                        {
                            $(".p_Statuse:eq(1)").next("span").text("("+data.Total+")");
                        }
                        else if(pStatus=="0")
                        {
                            $(".p_Statuse:eq(2)").next("span").text("("+data.Total+")");
                        }
                        else
                        {
                            $(".p_Statuse:eq(3)").next("span").text("("+data.Total+")");
                        }
                        var p=pages(data.Total,count);
                        setPage(p,currentPg);
                        var len=data.List.length;
                        if(len!=0)
                        {
                            for(var i=0;i<len;i++)
                            {
                               var id=data.List[i].ProductID;
                               result+="<div class='p_allMsg p_allMsg_Areal product'><div class='p_allMsg_tbHeader p_allMsg_tbHeader_ItemAreal'><div class='p_allMsg_tbHeader_Item' style='width:33%;'><div class='product_intro product_intro_areal'><img src='"+data.List[i].FirstUrl+"'/></div><div class='product_intro' style='text-indent: 10px;text-align:left;'><div><a href='ProductDetail.html' name='"+data.List[i].ProductID+"' onclick='setPid(this)'>"+data.List[i].ProductName+"</a></div></div></div><div class='p_allMsg_tbHeader_Item price'  style='width:17%;'><span class='mMark'>￥</span>"+accounting.formatNumber(data.List[i].SellPrice,2)+"</div><div class='p_allMsg_tbHeader_Item price' style='width:17%;font-weight:normal'>"+data.List[i].ProdBalance+"</div><div class='p_allMsg_tbHeader_Item'  style='width:33%;'><a class='operatBt unshelf' onclick='operate(this,0)' name='"+data.List[i].ProductID+"'>下架</a><a class='operatBt'  onclick='operate(this,1)' name='"+data.List[i].ProductID+"'>修改</a><a class='operatBt'  onclick='operate(this,2)' name='"+data.List[i].ProductID+"'>删除</a></div><div style='clear:both;'></div></div></div>";
                            }
                            $("#productContent").html(result);
                            $(".nothingTip").hide();
                        }
                        else{
                            $("#productContent").html("");
                            $(".nothingTip").show();
                        }
                        $("#pdf4").hide();
                    }
                    else{
                        alert(data.Message);
                    }
                }
            });
        }
    }
    else
    {
        window.location="index.html";
    }
}
function setPid(th)
{
    localStorage.pId=$(th).attr("name");
    window.location='ProductDetail.html';
}
////点击产品的状态信息 我的产品
$(".p_Statuse").click(function(){
    pStatus=$(this).attr("name");
    getGoods(1);
});
//点击头部信息切换样式
$(".p_allMsg_Header").click(function(){
    $(".p_allMsg_Header").css({"border-bottom":"none","color":"rgb(89, 89, 89)","font-weight":"normal"});
    $(this).css({"border-bottom":"2px solid #ff9500","color":"#ff9500","font-weight":"bold"});
});
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

//个人定制
$(".b_sbt").click(function(){
    
    var isComplete=true;//判断是否已全部填写完成
    var str="";
    var theme=$("#theme").val();
    $(".selTheme").each(function(){
        if(this.checked&&$(this).val()=="其他")
        {
            theme+=$("#custom").val();
        }
    });
    if($("#dest").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        str="请填写出目的地";
        $("#dest").focus();
        $("#dest").css("border","1px solid #ff9500");
        isComplete=false;
    }
    else if($("#target").val()=="1"&&$("#theme").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
            str="请选择旅游主题";
        $("#dest").focus();
        $("#dest").blur();
            isComplete=false;
    }
    else if($("#target").val()=="0"&&$("#custom").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
            str="请选择旅游主题";
        $("#dest").focus();
        $("#dest").blur();
            isComplete=false;
    }
    else if($("#getcity_name").val().replace(/(^\s*)|(\s*$)/g, "")==""||$("#getcity_name").val()=="中文/拼音")
    {
        str="请填写出发城市";
        $("#getcity_name").focus();
        isComplete=false;

    }
    else  if($("#time").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        str="请填写出发时间";
        $("#time").focus();
        isComplete=false;
    }
   /* else if($("#minPrice").val().replace(/(^\s*)|(\s*$)/g, "")==""||$("#maxPrice").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        str="请填写单人预算";
        $("#dest").focus();
        $("#dest").blur();
        isComplete=false;
    }*/
     else if($("#bugetprice").val()=="")
    {
        str="请填写单人预算";
        $("#bugetprice").focus();
        $("#bugetprice").css("border","1px solid #ff9500");
        isComplete=false;
    }
    else if(!/^[0-9]+$/.test($("#bugetprice").val())){
        str="输入的单人预算格式不正确";
        $("#bugetprice").focus();
        $("#bugetprice").css("border","1px solid #ff9500");
        isComplete=false;
    }
    else if($("#contactMan").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        str="请填写联系人";
        $("#contactMan").focus();
        isComplete=false;
    }
    else if(checkInfo(0, "#phone")==-1||$("#phone").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        str="请正确填写联系手机号";
        $("#phone").focus();
        isComplete=false;
    }
    else if($("#code").val().replace(/(^\s*)|(\s*$)/g, "")==""||$("#image").val().toLowerCase()!=$("#code").val())
    {
        str="验证码不正确";
        $("#code").focus();
        isComplete=false;
    }
    if(isComplete)
    {
        $("#pdf4").show();
        var u=JSON.parse(localStorage.person);
        var arrParam = { TravelerID:u.user,Theme:theme,Star:$("#star").val(),From:$("#getcity_name").val(),Destination:$("#dest").val(),Start:$("#time").val(),Adult:$("#adt").val(),Children:$("#child").val(),Budget:$("#bugetprice").val(),Demand:$("#otherDemand").val(),Name:$("#contactMan").val(),Phone:$("#phone").val(),SmsCode:"",Email:"",Day:$("#days").val()};
        console.log(arrParam);
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Custom_AddCustom", strParam);
        $.ajax({
            type: "post",
            url:jsgDataServer+jsgDataVisit,
            data:jsgSubmit,
            /*data: {
                strDestination:$("#dest").val(),
                strTheme:theme,
                intStar:$("#star").val(),
                dtmStart:$("#time").val(),
                strFrom:$("#getcity_name").val(),
                decMin:$("#minPrice").val(),
                decMax:$("#maxPrice").val(),
                intDay:$("#days").val(),
                intAdult:$("#adt").val(),
                intChildren:$("#child").val(),
                strName:$("#contactMan").val(),
                strPhone:$("#phone").val(),
                strDemand:$("#otherDemand").val(),
                strIdentifyCode:$("#code").val()
            },*/
            dataType: "json",
            success: function (data) {
                console.log(data)
                if(data.Result==1)
                {
                    /*localStorage.clear();
                    var date=new Date();
                    var days=date.getDate()+1;
                    date.setDate(days);
                    var obj={"user":data.Model.MemberID,"guider":data.Model.IsGuide,"header":data.Model.HeadUrl,"nick":data.Model.Nickname,"mobile":data.Model.Mobile ,"date":date};
                    localStorage.person=JSON.stringify(obj);*/
                    var t=setInterval(function(){
                        $("#pdf3").show();
                        $("#pdf4").hide();
                        var tm=setTimeout(function(){window.location='BookList.html';clearTimeout(tm);},3000);
                        clearInterval(t);
                    },1500);
                }
                else if(data.Result==-1){
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
                }
                else if(data.Result==-99){
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1500);
                }
            },
            error:function(data){
                console.log(data)
            }
        });
    }
    else
    {
        $("#error").text(str);
        $("#pdf2").show();
        $("#pdf4").hide();
        var t=setTimeout(function(){$("#pdf2").hide(500);clearTimeout(t);},1500);
    }
});
//旅行管家切换
$(".lText a").click(function(){
    $(".lText a").css("color","#737373");
    $(this).css("color","#ff9500");
});
//登录点击事件
$("#sbt").click(function () {
    var result = checkInfo(0, "#phone");    
    if (result == -1) {
        $("#tip").show();
        $("#tipRightTxt").text("请输入正确的手机号码");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else if($("#pwd").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#tip").show();
        $("#tipRightTxt").text("请输入密码！");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else
    {
    loginIn($("#phone").val(),$("#pwd").val());
    }
});
function loginIn(phone,pwd)
{
    $("#pdf4").show();
    var arrParam = { Mobile: $("#phone").val(),Password: $("#pwd").val()};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Login_MobileLogin", strParam);
    $.ajax({
        type: "post",
        url: jsgDataServer + jsgDataVisit,
        data: jsgSubmit,
        dataType: "json",
        success: function (data) {
            if(data.Result==1)
            {
                var date=new Date();
                var days=date.getDate()+1;
                date.setDate(days);
                var obj={"user":data.Model.MemberID,"guider":data.Model.Guide,"header":data.Model.HeadUrl,"nick":data.Model.Nickname,"mobile":$("#phone").val(),"date":date};
                window.localStorage.person=JSON.stringify(obj);
                console.log(localStorage.getItem("url"))
                if(localStorage.getItem("url")!=undefined&&localStorage.getItem("url")!=null)
                {
                    var str=localStorage.getItem("url");
                    localStorage.removeItem("url");
                    window.location=str;
                    alert(str);
                    console.log(str)
                }
                else
                {
                    window.location='PCenter.html';
                }
            }
            else if(data.Result==-1){
                $("#tip").show();
                $("#tipRightTxt").text("手机号码不存在！");
                $("#pdf4").hide();
                var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
            }
            else if(data.Result==-2){
                $("#tip").show();
                $("#tipRightTxt").text("密码错误！");
                $("#pdf4").hide();
                var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
            }
            else if(data.Message==-3){
                $("#tip").show();
                $("#tipRightTxt").text("账户异常！");
                $("#pdf4").hide();
                var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
            }
            else if(data.Result==-99){
                $("#tip").show();
                $("#tipRightTxt").text(data.Message);
                $("#pdf4").hide();
                var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
            }
        },
        error:function(data){
            console.log(data)
        }
    });
}
//获取个人定制信息
//cpg:当前起始页
var arrUser=new Array();
function getBookMsg(cpg)
{
    var u=JSON.parse(localStorage.person);
    if(u!=null&&u!=undefined)
    {
        var mobile= u.mobile;
            $("#pdf4").show();
            var arrParam = { TravelerID:u.user};
            var strParam = JSON.stringify(arrParam);
            jsgSubmit = "strRequest=" + GetVisitData("Member_GetCustomizationList", strParam);
            $.ajax({
                type: "post",
                url:jsgDataServer + jsgDataVisit,
                data:jsgSubmit,
                dataType: "json",
                success: function (data) {
                    if(data.Result==1)
                    {
                        $("#pdf4").hide();
                        var len=data.List.length;
                        if(len>0)
                        {
                            var str='';
                            str='<div class="sellHeader"><div class="sellItem sellItemArea">我的管家</div><div class="sellItem sellPlace">目的地</div><div class="sellItem">出发日期</div><div class="sellItem">行程天数</div><div class="sellItem">状态</div><div class="sellItem">操作</div><div style="clear:both;"></div></div>';
                            for(var i=0;i<len;i++)
                            {
                                if(data.List[i].Status==0)
                                {
                                    var stat="待处理";
                                    str+='<div class="sellContainer"><div class="sellItemHeader">提交时间：'+data.List[i].CreateDate +'</div><div class="sellItems itemsArea"><div class="sellItem sellItemArea sellItemContent1 colorArea">行程制定中...</div><div class="sellItem sellItemContent1 sellPlace">'+data.List[i].Destination+'</div><div class="sellItem sellItemContent1">'+data.List[i].Start  +'</div><div class="sellItem sellItemContent1">'+data.List[i].Day +'</div><div class="sellItem sellItemContent1">'+stat+'</div><div class="sellItem sellItemContent1"><a onclick="setBookIndex(\''+data.List[i].CustomizationID+'\',\'BookDetail.html\')">查看详情</a></div><div style="clear:both;"></div></div></div>';
                                }
                                else if(data.List[i].Status==1)
                                {
                                    var stat="已处理";
                                    str+='<div class="sellContainer"><div class="sellItemHeader">提交时间：'+data.List[i].CreateDate +'</div><div class="sellItems"><div class="sellItem sellItemArea"><div class="firstItem"><div class="firstItemImg"><img src="'+data.List[i].Index+'"/></div><div class="firstItemTxt"><div> 姓名：'+data.List[i].Name+'</div><div>电话：'+data.List[i].Mobile+'</div></div></div></div><div class="sellItem sellItemContent sellPlace">'+data.List[i].Destination+'</div> <div class="sellItem sellItemContent">'+data.List[i].Start  +'</div><div class="sellItem sellItemContent">'+data.List[i].Day +'</div><div class="sellItem sellItemContent">'+stat+'</div><div class="sellItem sellItemContent"><a onclick="setBookIndex(\''+data.List[i].CustomizationID+'\',\'BookDetail.html\')">查看详情</a></div> <div style="clear:both;"></div></div></div>';
                                }
                                else
                                {
                                    var stat="已完成";
                                    str+='<div class="sellContainer"><div class="sellItemHeader">提交时间：'+data.List[i].CreateDate +'</div><div class="sellItems"><div class="sellItem sellItemArea"><div class="firstItem"><div class="firstItemImg"><img src="'+data.List[i].Index+'"/></div><div class="firstItemTxt"><div> 姓名：'+data.List[i].Name+'</div><div>电话：'+data.List[i].Mobile+'</div></div></div></div><div class="sellItem sellItemContent sellPlace">'+data.List[i].Destination+'</div> <div class="sellItem sellItemContent">'+data.List[i].Start  +'</div><div class="sellItem sellItemContent">'+data.List[i].Day +'</div><div class="sellItem sellItemContent">'+stat+'</div><div class="sellItem sellItemContent"><a onclick="setBookIndex(\''+data.List[i].CustomizationID+'\',\'BookDetail.html\')">查看详情</a></div> <div style="clear:both;"></div></div></div>';
                                }
                            }
                            $("#sellProduct").html(str);
                            str='';
                        }
                        else
                        {
                            $(".nothingTip").show();
                        }
                    }
                    else
                    {
                        alert(data.Message);
                        $("#pdf4").hide();
                        //var t = setInterval(function () { $("#pdf2").hide(300); clearInterval(t); }, 2000);
                    }
                },
                error:function(data){
                    console.log(data);
                }
            });
    }
}
function setBookIndex(strId,url)
{
    localStorage.setItem("cusid",strId);
    window.location=url;
}
function BookDetail()
{
    var mid=localStorage.getItem("cusid");
    var arrParam = { CustID:mid};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Member_GetCustomization", strParam);
    $.ajax({
        type: "post",
        url: jsgDataServer+jsgDataVisit,
        data:jsgSubmit,pe: "json",
        success: function (data) {
            if(data.Result==1)
            {
                $("#dest").text(data.Model.Destination);
                $("#theme").html(data.Model.ThemeName);
                $("#budget").text(data.Model.Budget);
                $("#time").text(data.Model.Start);
                $("#days").text(data.Model.Day);
                $("#adult").text(data.Model.Adult);
                $("#child").text(data.Model.Children);
                $("#other").text(data.Model.Demand);
                $("#contactMan").text(data.Model.LinkName);
                $("#phone").text(data.Model.LinkPhone);
                $("#gPic img").attr("src",data.Model.Index);
                $("#gName").text(data.Model.TailorName);
                $("#gPhone").text(data.Model.TailorMobile);
                $("#statusTxt div.statusDesc").hide();
                $("#statusDescip div").hide();

                if(data.Model.Status==0)
                {
                    $("#statusTxt div.statusDesc:eq(0)").show();
                    $(".ctime:eq(0)").text(data.Model.CreateDate);
                    $("#statusImg img:eq(0)").attr("src","images/ConfirmBar_0.png");
                    $("#statusDescip div:eq(0)").show();
                    $("#statusTxt div.statusDesc:eq(1)").show();
                    $("#statusTxt div.statusDesc:eq(2)").show();
                }
                else if(data.Model.status==1)
                {   $(".ctime:eq(0)").text(data.Model.CreateDate);
                    $(".ctime:eq(1)").text(data.Model.CreateDate);
                    $("#statusTxt div.statusDesc:eq(0)").show();
                    $("#statusTxt div.statusDesc:eq(1)").show();
                    $("#statusTxt div.statusDesc:eq(2)").show();
                    $("#statusImg img:eq(0)").attr("src","images/ConfirmBar_0.png");
                    $("#statusImg img:eq(1)").attr("src","images/ConfirmBar_0.png");
                    $("#statusDescip div:eq(0)").show();
                    $("#statusDescip div:eq(1)").show();
                    $("#complete").show();
                    $(".takeCare").hide();
                }
                else
                {
                    $("#statusTxt div.statusDesc:eq(0)").show();
                    $("#statusTxt div.statusDesc:eq(1)").show();
                    $("#statusTxt div.statusDesc:eq(2)").show();
                    $("#statusImg img:eq(0)").attr("src","images/ConfirmBar_0.png");
                    $("#statusImg img:eq(1)").attr("src","images/ConfirmBar_0.png");
                    $("#statusImg img:eq(2)").attr("src","images/ConfirmBar_0.png");
                    $("#statusDescip div:eq(0)").show();
                    $("#statusDescip div:eq(1)").show();
                    $("#statusDescip div:eq(2)").show();
                    $("#complete").show();
                    $(".takeCare").hide();
                }
            }
            else{
                $(".nothingTip").show();
            }
        },
        error:function(data){
            console.log(data)
        }
    });
}

//每进入一个后台页面都要检查是否登录
//stat:表示前台页面还是后台页面,1:前台；2：后台
function checkUser(stat)
{
    if(localStorage.person!=null&&localStorage.person!=undefined)
    {
        var u=JSON.parse(localStorage.person);
        if(u!=null&&u!=undefined)
        {
            var date= u.date;
            var dateNow=new Date();
            if(Date.parse(dateNow.toString())>Date.parse(date))
            {
                localStorage.clear();
                window.location='index.html';
            }
            else
            {
                if(u.nick!=null&& u.nick!=undefined&& u.nick!="")
                {
                    $(".loginRight a:eq(0)").text(u.nick);
                    $("#uName").text(u.nick);
                }
                else
                {
                    $(".loginRight a:eq(0)").text(u.user);
                    $("#uName").text(u.user);
                }
                if(u.header!=null&&u.header!=undefined&&u.header!="")
                {
                    $("#userHeader div").css("background-image","url('"+jsgImageServer+u.header+"')");
                }
                $("#loginTip1").hide();
                $("#loginTip").show();

                //设置右上角的登录状态样式
                if($(".loginRight a:eq(0)").text().length>=3)
                {
                    $(".loginRight a:eq(0)").css({"width":"49px","text-align":"right"});
                    $(".loginRight:eq(0)").css("width","100px");
                }
                else
                {
                    $(".loginRight a:eq(0)").css({"width":"30px","text-align":"right"});
                    $(".loginRight:eq(0)").css("width","85px");
                }
                $(".loginRight a:eq(2)").css("width","30px");
            }
        }
        else
        {
            if(stat==2)
            {
                window.location="index.html";
            }
        }
    }
    else
    {
        if(stat==2)
        {
            window.location="index.html";
        }
        $("#loginTip").hide();
        $("#loginTip1").show();
    }
}

$("#userHeader").click(function(){
    window.location='Pcenter.html';
});
$(".loginRight a:eq(0)").click(function(){
    window.location='Pcenter.html';
});
//修改个人信息（游客）
$("#save").click(function(){
    var mId=JSON.parse(localStorage.person).user;
    var isComplete=true;
    if(checkInfo(3,"#email")==-1||$("#email").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#email").next("a.error").show();
        isComplete=false;
    }
    if($("#nickName").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#nickName").next("a.error").show();
        isComplete=false;
    }
    if($("#name").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#name").next("a.error").show();
        isComplete=false;
    }
    if($("#datetime").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#datetime").next("a.error").show();
        isComplete=false;
    }
    /*if($("#phone").val().replace(/(^\s*)|(\s*$)/g,"")==""||checkInfo(0,"#phone")==-1)
    {
        $("#phone").next("a.error").show();
        isComplete=false;
    }*/
    if(isComplete)
    {
        $("#pdf3").show();
        var arrParam = { MemberID: mId,HeadUrl: $("#headerUrl").val(),NickName:$("#nickName").val(),MemberName:$("#name").val(),MemberEmail:$("#email").val(),MemberSex:$("#sex").val(),BirthDay:$("#datetime").val()};
        console.log(arrParam)
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_ModifyMemberInfo", strParam);
        $.ajax({
            type: "post",
            /*data: {
                strMemberID :mId,
                //strMemberMobile :$("#phone").val(),
                strHeadUrl:$("#headerUrl").val(),
                strNickName:$("#nickName").val(),
                strMemberName:$("#name").val(),
                strMemberEmail:$("#email").val(),
                intMemberSex:$("#sex").val(),
                timBirthDay:$("#datetime").val()
            },*/
            url:jsgDataServer+jsgDataVisit,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                console.log(data)
                if(data.Result==1)
                {$("#modify").hide();
                    $("#succed").text("信息修改成功！").show();
                    var obj=JSON.parse(localStorage.person);
                    obj.header=$("#headerUrl").val();
                    obj.nick=$("#nickName").val();
                    localStorage.person=JSON.stringify(obj);
                    var t = setTimeout(function () {
                            $("#pdf3").hide();
                        clearTimeout(t); },
                        1500);
                    window.location='Pcenter.html';
                }
                else
                {
                    $("#succed").text("修改失败！请重新尝试！");
                }
            },
            error:function(data){
                console.log(data)
            }   
        });
    }
});
//点击性别选择按钮
$(".sex").click(function(){
    $("#sex").val($(this).val());
});
//修改密码
$("#saveBt_pwd").click(function(){
    var u=JSON.parse(localStorage.person);
    var isComplete=true;
    var pwdReg=/^[a-zA-Z0-9]{6,}$/g;
    $(".themeItem_right input").each(function(){
        if($(this).val().replace(/(^\s*)|(\s*$)/g, "")=="")
        {
            $(this).next("a.error").show();
            isComplete=false;
            return false;
        }
    });
    if(!pwdReg.test($("#cur_pwd").val()))
    {
        $("#cur_pwd").next("a.error").children("span").text("密码由大写字母、小写字母或数字组成");
        $("#cur_pwd").next("a.error").show();
        isComplete=false;
    }
    else{
        $("#cur_pwd").next("a.error").hide();
    }
    pwdReg.lastIndex=0;
    if($("#new_pwd").val().length<6||$("#new_pwd").val().length>24||!pwdReg.test($("#new_pwd").val()))
    {
        $("#new_pwd").next("a").show();
        isComplete=false;
    }
    if($("#new_pwd").val()!=$("#confirm_new_pwd").val())
    {
        $("#confirm_new_pwd").next("a").show();
        isComplete=false;
    }
    if(isComplete)
    {
        $("#pdf3").show();
        var arrParam = { MemberID:u.user,OldPass:$("#cur_pwd").val(),NewPass:$("#new_pwd").val()};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_ModifyMemberPassword", strParam);
        $.ajax({
            type: "post",
            url:jsgDataServer + jsgDataVisit,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.Result==1)
                {
                    setInterval(function(){
                        $("#modify").hide();
                        $("#succed").text("密码修改成功！").show();
                    },2000);
                    setTimeout(function(){$("#pdf3").hide(3000,function(){ window.location='login.html';});},2000);
                    localStorage.clear();
                }
                else if(data.Result==-1){
                    setInterval(function(){
                        $("#modify").hide();
                        $("#succed").text("修改失败！").show();
                    },2000);
                    setTimeout(function(){$("#pdf3").hide(3000);},2000);
                }
                else if(data.Result==-2)
                {
                    setInterval(function(){
                        $("#modify").hide();
                        $("#succed").text("原密码不正确！").show();

                    },2000);
                    $("#succed").text("正在修改密码，请稍等...").show();
                    setTimeout(function(){$("#pdf3").hide(3000);},2000);
                }
                else if(data.Result==-99){
                    setInterval(function(){
                        $("#modify").hide();
                        $("#succed").text("系统异常！").show();

                    },2000);
                    setTimeout(function(){$("#pdf3").hide(3000);},2000);
                }
                $("#modify").show();
                $("#succed").hide();
            },
            error:function(data){
                console.log(data)
            }
        });
    }
});
$(".pwd input:eq(0),.pwd input:eq(1)").blur(function(){
    var pwdReg=/^[a-zA-Z0-9]{6,}$/g;
    var pwd=$(this).val();
    if(!pwdReg.test(pwd))
    {
        $(this).next("a.error").children("span").text("密码由大写字母、小写字母或数字组成");
        $(this).next("a.error").show();
    }
    else{
        $(this).next("a.error").hide();
    }
});
//旅行管家添加商品
$("#addPro").click(function(){
    var u=JSON.parse(localStorage.person);
    var str= u.user;
    $.ajax({
        type: "post",
        url: hstr+"/Tailor/CreateProduct",
        data: {
            strMemberID:str,
        strCategoryID:$("#pCator").val(),
        strName:$("#name").val(),
        decSellPrice:$("#salePrice").val(),
        strUnit:$("#scPer").val(),
        decMarketPrice:$("#scPrice").val(),
        strFirstUrl:$("#firstPic").val(),
        strAlbumUrl:$("#strAlbumUrl").val(),
        strDescribe:$("#descible").val(),
        decLimit:$("#limit").val(),
        strDetails:$("#content").val(),
        intPeople:$("#limitP").val(),
        intEffective:$("#limitDays").val()
    },
        dataType: "json",
        success: function (data) {
            var str="";
            if(data.Result==1)
            {
                alert("成功添加产品！");
            }
            else if(data.Result==-1)
            {
                alert("添加产品失败！");
            }
            else
            {
                alert("系统异常！");
            }
        }
    });
});
//注册
$("#registersb").click(function () {
    var result = checkInfo(0, "#phone");
    var pwdReg=/^[a-zA-Z0-9]{6,}$/g;
    if (result == -1) {
        $("#tip").show();
        $("#tipRightTxt").text("请输入正确的手机号码");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else if($("#code").val().replace(/(^\s*)|(\s*$)/g, "")=="")
    {
        $("#tip").show();
        $("#tipRightTxt").text("请输入手机验证码！");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else if($("#pwd").val().replace(/(^\s*)|(\s*$)/g, "")==""||!pwdReg.test($("#pwd").val()))
    {
        $("#tip").show();
        $("#tipRightTxt").text("密码由大写字母、小写字母或数字组成");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else if($("#pwd").val()!=$("#confirmpwd").val())
    {
        $("#tip").show();
        $("#tipRightTxt").text("两次输入的密码不匹配！");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else {
        var arrParam = { Mobile:$("#phone").val(),Code:$("#code").val(),Password:$("#pwd").val()};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Login_MobileRegister", strParam);
        $.ajax({
            type: "post",
            url: jsgDataServer + jsgDataVisit,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                console.log(data)
                if(data.Result==1)
                {
                    loginIn($("#phone").val(),$("#pwd").val());
                    //window.location='Booking.html'
                }
                else if(data.Result==-1){
                    $("#tip").show();
                    $("#tipRightTxt").text("手机号码不存在！");
                    var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
                }
                else if(data.Result==-2){
                    $("#tip").show();
                    $("#tipRightTxt").text("密码错误！");
                    var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
                }
                else if(data.Result==-3){
                    $("#tip").show();
                    $("#tipRightTxt").text(data.Message);
                    var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
                }
                else if(data.Result==-99){
                    $("#tip").show();
                    $("#tipRightTxt").text(data.Message);
                    var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
                }
            }
        });
    }
});
var seconds =60;
var it = null;
//获取验证码后倒计时
function clock()
{
    seconds--;
    $("#getCode").val(seconds + "S后重发");
    if (seconds == 0) {
        clearInterval(it);
        $("#getCode").css("background-color", "#ff9500");
        $("#getCode").val("重新发送");
        $("#getCode").attr("disabled", false);
        seconds=60;
    }
}
//获取验证码
$("#getCode").click(function(){
    var result = checkInfo(0, "#phone");
    if(result==-1)
    {
        $("#tip").show();
        $("#tipRightTxt").text("请输入正确的手机号码!");
        var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
    }
    else
    {
        var arrParam = { Mobile:$("#phone").val()};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Login_SendRegisterSms", strParam);
        $.ajax({
            type: "post",
            url: jsgDataServer + jsgDataVisit,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                if(data.Result==1)
                {
                    $("#codetip").show()
                    $("#tipRightTxt").text("验证码发送成功！10分钟内输入有效！");
                    $("#getCode").css("background-color", "#cccccc");
                    $("#getCode").attr("disabled", true);
                    it = setInterval("clock()",1000);
                    var t = setInterval(function () { $("#codetip").hide(300); clearInterval(t); }, 2000);
                }
                else if(data.Result==-1)
                {
                    $(".tips1").text("发送验证码失败，请重新发送！");
                }
                else
                {
                    $("#tip").show();
                    $("#tipRightTxt").text(data.Message);
                    var t = setInterval(function () { $("#tip").hide(300); clearInterval(t); }, 2000);
                }
            }
        });
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
            url: hstr+"/Steward/CreateCustom",
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
var imgCount = 0;
var index = 1;
var timer = null;//计时器
$(document).ready(function () {
    imgCount = $("ul#banner li").length;
    timer = setInterval("changePics()", 5000);
    var reg = /MSIE\s[6-9]./g;
    var isTrue=reg.test(navigator.appVersion);
    /*$(".peopleItem").mouseover(function(){
        $(".peopleItem").find(".peopleItem_back").css({"z-index":-1,"backgorund-color":"#fff"});
        $(this).find(".peopleItem_back").css({"z-index":30,"background-color":"#ffc859"});
        if(!isTrue)
        {
            $(".peopleItem").find(".pImg").css({"border":"5px solid #d9d9d9"});
            $(this).find(".pImg").css({"border":"5px solid #fff"});
        }
    });
    if (isTrue) {
        $("table#imgs td").addClass("td");
        $(".pImg").css("border","none");
    }*/
});
//banner切换
function changePics() {
    $("ul#banner li").css({ "z-index": "-1" });
    $("ul#banner li:eq(" + index + ")").css("z-index","10");
    $(".switchBt").css("background-color", "#939f80");
    $(".switchBt:eq(" + index + ")").css("background-color", "#fff");
    if (index < imgCount - 1) {
        index++;
    }
    else
    {
        index = 0;
    }
}
$(".switchBt").mouseover(function () {
    clearInterval(timer);
    index = $(this).index(".switchBt");
    changePics();
});
$(".switchBt").mouseout(function () {
    timer = setInterval("changePics()", 8000);
});
//首页图片翻转
$("td").mouseover(function(){
    $(".rotatebox .backBox").css("z-index",-1);
    $(".layer").css("z-index",-1);
    $(this).find(".layer").css("z-index",9);
    $(this).find(".backBox").css("z-index",10);
});
$("td").mouseout(function(){
    $(".rotatebox .backBox").css("z-index",-1);
    $(".layer").css("z-index",-1);
});
//页面滚动时显示和隐藏浮动框
window.onscroll = function () {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var dheight=$(document).height();
    if (top >=dheight/6) {
        $(".wechat").show();
    }
    else
    {
        $(".wechat").hide();
        $(".wleft:eq(2)").hide();
    }
    if(top >=dheight/2)
    {
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
//专属定制
function setStar() {//星级选项
    $("input.starCheck").each(function () {
        if (this.checked) {
            $(this).prev("img").attr("src", "images/starSelected.png");
        }
        else {
            $(this).prev("img").attr("src", "images/starUnselected.png");
        }
    });
}

$("input.starCheck").click(function () {//星级选项
    var initStar = 3;
    var checkedNum=0;
    var index = $("input.starCheck").index(this);
    var elems = document.getElementsByName("starCheck");
    for (var i = index+1; i <=elems.length - 1; i++) {
        if(elems[i].checked)
        {
            checkedNum++;
        }
        elems[i].checked = false;
    }
    for (var j = 0; j < index;j++)
    {
        elems[j].checked = true;
        initStar++;
    }
    if(checkedNum>0)
    {
        this.checked=true;
    }
    if (this.checked)
    {
        initStar++;
    }
    setStar();
    $("#star").val(initStar);
});
function selectTheme()
{
    var str="";
    var themeArr=[];
    $(".selTheme").each(function(){
        if(this.checked)
        {
            $(this).parent(".themeItem").css("border-color","#ff7f00");
            $(this).parent(".themeItem").find(".selectedImg").show();
            if($(this).val()!="其他")
            {
                //str+=$(this).val()+",";
                themeArr.push($(this).attr("ThemeID"));
            }
            else
            {
                //str+=$("#custom").val()+",";
            }
        }
    });
    $("#theme").val(themeArr);
}
var num=0;
//勾选主题
$("input.selTheme").click(function(){
    $("div.theme").css("border-color","#d9d9d9").find(".selectedImg").hide();
    $("div.theme").find(".selectedImg").hide();
        if(this.checked)
        {
            if(num<3)
            {
                num++;
            }
            else
            {
                $("#error").text("主题最多选择3个");
                $("#pdf2").show();
                $(this).attr("checked",false);
                var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},1000);
            }
        }
    else
        {
            num--;
        }
    if($(this).val()=="其他"&&this.checked)
    {
        $("#other").show();
    }
    else
    {
        if(num<3)
        {
            $("#other").hide();
        }
    }
    selectTheme();
});
$("div.theme_areal .themeItemTxt").click(function(){
    $("div.theme_areal").css("border-color","#d9d9d9").find(".selectedImg").hide();
    $("div.theme_areal").find(".selectedImg").hide();
    $(this).parent(".theme_areal").css("border-color","#ff7f00");
    $(this).parent(".theme_areal").find(".selectedImg").show();
    $("#minPrice").val($(this).attr("title").split(',')[0]);
    $("#maxPrice").val($(this).attr("title").split(',')[1]);
});
//选择成人个数和儿童个数
$(".select").change(function(){
    var val=$(this).children("option:selected").text();
    var adult=$(this).val();
    var str=$(this).attr("lang");
    if(str=="1")
    {
        $("#children").text(val);
        $("#child").val(adult);
    }
    else
    {
        $("#adult").text(val);
        $("#adt").val(adult);
    }
});
//选择天数
$(".tickBt").click(function(){
    var str=$(this).text();
    var day=parseInt($("#days").val());
    if(str=="-")
    {
        if(day>1)
        {
            day--;
        }
    }
    else if(str=="+")
    {
        day++;
    }
    $("#days").val(day);
});

/*操作旅行管家的产品
flag:0,下架，1：修改，2：移除
*/
var pId=-1;
function operate(th,flag)
{
    if(flag==0)
    {
        $("#pdf3").show();
        pId=$(th).attr("name");
    }
    else if(flag==1)
    {
        localStorage.setItem("pid",$(th).attr("name"));
        window.location='addMyProduction.html';
    }
    else if(flag==2)
    {
        $("#pdf2").show();
       pId=$(th).attr("name");
    }
}
//退出登录
$("#droplist a:eq(2)").click(function(){
    localStorage.clear();
    window.location='index.html';
});
//加入我们弹出框
$(".ocupy a").click(function(){
    var index=$(".ocupy a").index(this);
    $(".out_box:eq("+index+")").show();
});
$("a.close_outbox").click(function(){
    var index=$("a.close_outbox").index(this);
    $(".out_box:eq("+index+")").hide();
});
var imgurl="http://imgapi.nihaott.com";
//获取游客当前订单信息
var curtStat=0;
function touristOrders(curtPg)
{
    $("#pdf4").show();
    var u=JSON.parse(localStorage.person).user;
    var urlStr="Member_GetTravelerOrderList";
    if(curtStat==1)
    {
        urlStr="Member_GetTravelerOrderHistoryList"
    }
    if(u!=null&&u!=undefined)
    {
        var str= u;
        var arrParam = { TravelerID:str,Skip:(curtPg-1)*count,Take:count};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData(urlStr, strParam);
        $.ajax({
            type: "post",
            url:jsgDataServer + jsgDataVisit ,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                var orders="";
                if(data.Result==1)
                {
                    /*if(curtStat==1)
                    {
                        $("#historyOrder").text("("+data.Total+")");
                    }
                    else{
                        $("#currentOrder").text("("+data.Total+")");
                    }*/
                    setPage(pages(data.Total,count),curtPg);
                    var len=data.List.length;
                    if(len>0)
                    {
                        $(".p_allMsg_Areal").show();
                        for(var i=0;i<len;i++)
                        {
                            var id=data.List[i].OrderID;
                            orders+='<div class="p_allMsg p_allMsg_Areal" style="height:auto;border:none;"><table class="o_table" width="100%;" cellpadding="0" cellspacing="0"><tr><td colspan="6" style="padding:0;"><div class="header"><div class="dleft">订单号：'+data.List[i].OrderID+'<span class="dtime">下单日期: '+data.List[i].CreateTime+'</span></div> <div class="dleft" style="text-align:right;"><span>订单总额：</span><span class="price_marker" style="font-size:14px;">￥</span><span class="price price_more">'+data.List[i].Total+'</span></div></div></td></tr>';
                            var rowspan=data.List[i].GoodsList.length;
                            for(var j=0;j<data.List[i].GoodsList.length;j++)
                            {
                                var status="";
                                if(data.List[i].GoodsList[j].GoodsStatus==0)//0未付款；1已付款；2已使用；3已完成；-1已取消；-2已退订；-3已关闭
                                {
                                    status="待付款";
                                }
                                else if(data.List[i].GoodsList[j].GoodsStatus==1)
                                {
                                    status="已支付";
                                }
                                else if(data.List[i].GoodsList[j].GoodsStatus==2)
                                {
                                    status="已消费";
                                }
                                else if(data.List[i].GoodsList[j].GoodsStatus==3)
                                {
                                    status="已完成";
                                }
                                else if(data.List[i].GoodsList[j].GoodsStatus==-2)
                                {
                                    status="已退订";
                                }
                                else if(data.List[i].GoodsList[j].GoodsStatus==-3)
                                {
                                    status="已关闭";
                                }
                                else if(data.List[i].GoodsList[j].GoodsStatus==-1)
                                {
                                    status="已取消";
                                }
                                if(rowspan>1)
                                {
                                    if(j==0)
                                    {
                                        orders+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;">'+data.List[i].GoodsList[j].Name+'</div><div class="o_name" style="width:128px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber(data.List[i].GoodsList[j].SellPrice,2)+'</span></div><div class="o_name" style="width:108px;">'+data.List[i].GoodsList[j].Quantity+'</div><div class="o_name" style="width:135px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber((data.List[i].GoodsList[j].SellPrice*data.List[i].GoodsList[j].Quantity),2)+'</span></div><div class="o_name" style="width:110px;">'+status+'</div></td><td valign="middle" align="center" rowspan="'+rowspan+'"  style="width:140px"><a class="operatBt" onclick="oDetail(\''+id+'\',\'tourismOrderDetail.html\')" class="operatBt">查看</a></td> </tr>';
                                    }
                                    else
                                    {
                                        orders+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;">'+data.List[i].GoodsList[j].Name+'</div><div class="o_name" style="width:128px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber(data.List[i].GoodsList[j].SellPrice,2)+'</span></div><div class="o_name" style="width:108px;">'+data.List[i].GoodsList[j].Quantity+'</div><div class="o_name" style="width:135px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber((data.List[i].GoodsList[j].SellPrice*data.List[i].GoodsList[j].Quantity),2)+'</span></div><div class="o_name" style="width:110px;">'+status+'</div></td></tr>';
                                    }
                                }
                                else
                                {
                                    orders+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;">'+data.List[i].GoodsList[j].Name+'</div><div class="o_name" style="width:128px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber(data.List[i].GoodsList[j].SellPrice,2)+'</span></div><div class="o_name" style="width:108px;">'+data.List[i].GoodsList[j].Quantity+'</div><div class="o_name" style="width:135px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber((data.List[i].GoodsList[j].SellPrice*data.List[i].GoodsList[j].Quantity),2)+'</span></div><div class="o_name" style="width:110px;">'+status+'</div></td><td valign="middle" align="center" rowspan="'+rowspan+'"  style="width:140px"><a class="operatBt" onclick="oDetail(\''+id+'\',\'tourismOrderDetail.html\')" class="operatBt">查看</a></td> </tr>';
                                }
                            }
                            orders+="<table></div>";
                        }
                        $("#orderContent").html(orders);
                        $(".nothingTip").hide();
                    }
                    else
                    {
                        $(".p_allMsg_Areal").hide();
                        $(".nothingTip").show();
                        $(".jumpBt").css("display","none");
                    }
                }
                else
                {
                   $("#orderContent").text(data.Message);
                }
                $("#pdf4").hide();
            },
            error:function(data){
                console.log(data)
            }
        });
    }
}
$(".orderOfTourist").on("click","a",function(){
    var index=parseInt($(this).attr("name"));
    touristOrders(index);
});
$("span.statusBar").click(function(){
    var stat=$(this).attr("name");
    if(stat==0)
    {
        curtStat=0;
    }
    else
    {
        curtStat=1;
    }
    touristOrders(1);
});
//获取旅行管家的当前订单信息
//cPg：当前页
//cPg：当前页
function GuiderOrders(cPg)
{
    var u=JSON.parse(localStorage.person);
    var urlStrname="Member_GetTailorOrderPage";
    if(curtStat==1)
    {
        urlStrname="Member_GetTailorOrderHistoryPage";
    }
    if(u.user!=null&&u.user!=undefined)
    {
        if(!u.guider)
        {
            $("#modal-local").show();
            window.location='Pcenter.html';
        }
        else
        {
            $("#pdf4").show();
            var arrParam = { TailorID:u.user,Skip:(cPg-1)*count,Take:count};
            var strParam = JSON.stringify(arrParam);
            jsgSubmit = "strRequest=" + GetVisitData(urlStrname, strParam);
            $.ajax({
                type: "post",
                url:jsgDataServer + jsgDataVisit,
                data:jsgSubmit,
                dataType: "json",
                success: function (data) {
                    var orders='<div><div class="o_name o_nameArea" style="width:320px;">产品名称</div><div class="o_name o_nameArea">分销价</div><div class="o_name o_nameArea">数量</div><div class="o_name o_nameArea">订单金额</div><div class="o_name o_nameArea">订单状态</div><div class="o_name o_nameArea" style="width:140px;">操作</div><div style="clear:both;"></div></div>';
                    if(data.Result==1)
                    {
                        //$("#GuiderOrders").text(accounting.formatNumber(data.TotalAmount));
                        //$("#count").text(data.TotalSell);
                        $("#count").text(data.Total);
                        setPage(pages(data.Total,count),cPg);
                        var len=data.List.length;
                        /*if(curtStat==0)
                        {
                            $("#current").text("("+data.Total+")");
                        }
                        else
                        {
                            $("#history").text("("+data.Total+")");
                        }*/
                        if(data.Total>0)
                        {
                            for(var i=0;i<len;i++)
                            {
                                var id=data.List[i].OrderID;
                                orders+='<div class="p_allMsg p_allMsg_Areal" style="height:auto;border:none;"><table class="o_table" width="100%;" cellpadding="0" cellspacing="0"><tr><td colspan="6" style="padding:0;"> <div class="header"> <div class="dleft">订单号：'+data.List[i].OrderID+'<span class="dtime">下单日期: '+data.List[i].CreateTime+'</span></div> <div class="dleft" style="text-align:right;"> <span>订单总额：</span> <span class="price_marker" style="font-size:14px;">￥</span><span class="price price_more">'+accounting.formatNumber(data.List[i].Total,2)+'</span> </div></div></td></tr>';

                                var pan=data.List[i].GoodsList.length;

                                for(var j=0;j<pan;j++)
                                {
                                    //var id=data.List[i].GoodsList[j].GoodsID;
                                    //var status="";
                                    /*if(data.List[i].GoodsList[j].GoodsStatus==0)//0未付款；1已付款；2已使用；3已完成；-1已取消；-2已退订；-3已关闭
                                    {
                                        status="待付款";
                                    }
                                    else if(data.List[i].GoodsList[j].GoodsStatus==1)
                                    {
                                        status="待使用";
                                    }
                                    else if(data.List[i].GoodsList[j].GoodsStatus==2)
                                    {
                                        status="已消费";
                                    }
                                    else if(data.List[i].GoodsList[j].GoodsStatus==3)
                                    {
                                        status="已完成";
                                    }
                                    else if(data.List[i].GoodsList[j].GoodsStatus==-2)
                                    {
                                        status="已退订";
                                    }
                                    else if(data.List[i].GoodsList[j].GoodsStatus==-3)
                                    {
                                        status="已关闭";
                                    }
                                    else{
                                        status="已取消";
                                    }*/
                                    if(pan>1)
                                    {
                                        if(j==0)
                                        {
                                            orders+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;"> '+data.List[i].GoodsList[j].Name+'</div><div class="o_name" style="width:128px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber(data.List[i].GoodsList[j].SellPrice,2)+'</span></div><div class="o_name" style="width:108px;">'+data.List[i].GoodsList[j].Quantity+'</div> <div class="o_name" style="width:135px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber((data.List[i].GoodsList[j].SellPrice*data.List[i].GoodsList[j].Quantity),2)+'</span></div> <div class="o_name" style="width:110px;">'+data.List[i].GoodsList[j].GoodsStatusText+'</div></td><td valign="middle" align="center" rowspan="'+pan+'" style="width:140px"><a onclick="oDetail(\''+id+'\',\'GOrderDetail.html\')" class="operatBt">查看</a></td></tr>';
                                        }
                                        else{
                                            orders+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;"> '+data.List[i].GoodsList[j].Name+'</div><div class="o_name" style="width:128px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber(data.List[i].GoodsList[j].SellPrice,2)+'</span></div><div class="o_name" style="width:108px;">'+data.List[i].GoodsList[j].Quantity+'</div> <div class="o_name"  style="width:135px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber((data.List[i].GoodsList[j].SellPrice*data.List[i].GoodsList[j].Quantity),2)+'</span></div> <div class="o_name" style="width:110px;">'+data.List[i].GoodsList[j].GoodsStatusText+'</div></td></tr>';
                                        }
                                    }
                                    else{
                                        orders+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;"> '+data.List[i].GoodsList[j].Name+'</div><div class="o_name" style="width:128px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber(data.List[i].GoodsList[j].SellPrice,2)+'</span></div><div class="o_name" style="width:108px;">'+data.List[i].GoodsList[j].Quantity+'</div> <div class="o_name" style="width:135px;"><span class="price_marker">￥</span><span class="price">'+accounting.formatNumber((data.List[i].GoodsList[j].SellPrice*data.List[i].GoodsList[j].Quantity),2)+'</span></div> <div class="o_name" style="width:110px;">'+data.List[i].GoodsList[j].GoodsStatusText+'</div></td><td valign="middle" align="center" rowspan="2"  style="width:140px"><a onclick="oDetail(\''+id+'\',\'GOrderDetail.html\')" class="operatBt">查看</a></td></tr>';
                                    }
                                }
                                orders+="<table></div>";
                            }
                            $("#orderContent").html(orders);
                            $(".nothingTip").hide();
                        }
                        else
                        {
                            $(".nothingTip").show();
                            $(".jumpBt").css("display","none");
                        }
                    }
                    else
                    {
                        $(".jumpBt").css("display","none");
                        $("#orderContent").text(data.Message);
                    }
                    $("#pdf4").hide();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    }
}
$(".guider").click(function(){
    var n=$(this).attr("name");
    if(n==0)
    {
        curtStat=0;
    }
    else
    {
        curtStat=1;
    }
    GuiderOrders(1);
});
$("#p_jump").click(function(){
    var reg=/[1-9]{1,}/g;
    var num=1;
    if(reg.test($("#jump_page").val()))
    {
        num=parseInt($("#jump_page").val());
    }
    GuiderOrders(num);
});
$(".myProduct").delegate("a","click",function(){
var p=parseInt($(this).attr("name"));
    getGoods(p);
});
//旅行管家订单分页标签事件代理
$(".gOrder").delegate("a","click",function(){
    var count=parseInt($(this).attr("name"));
    GuiderOrders(count);
});

//获取登录者的信息
function  getUser()
{
    var u=JSON.parse(localStorage.person);
    if(u!=null&&u!=undefined)
    {

        var str= u.user;
        var arrParam = { MemberID:str};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_GetMember", strParam);
        $.ajax(
            {type: "post",
                url:jsgDataServer + jsgDataVisit,
                data:jsgSubmit,
                dataType: "json",
                success: function(data){
                    if(data.Result==1)
                    {
                        if(data.Model!=null)
                        {
                            $("#nickName").val(data.Model.NickName);
                            $("#name").val(data.Model.Name);
                            $("#datetime").val(data.Model.Birth);
                            $("#phone").text(data.Model.Mobile);
                            $("#email").val(data.Model.Email);
                            $("#sex").val(data.Model.Sex);
                            var hurl=data.Model.HeadUrl;
                            //hurl=hurl.replace("http://ttimgapitest.nihaott.com","").trim();
                            hurl=hurl.replace(jsgImageServer,"").trim();
                            $("#headerUrl").val(hurl);
                            if(data.Model.Sex==0)
                            {
                                $("#female").attr("checked",true);
                            }
                            else if(data.Model.Sex==1)
                            {
                                $("#male").attr("checked",true);
                            }
                            if(data.Model.HeadUrl!=null&&data.Model.HeadUrl!=""&&data.Model.HeadUrl!=undefined)
                            {
                                $("#imgHead").attr("src",data.Model.HeadUrl);
                                $("#strHeadUrl").attr("src",data.Model.HeadUrl);
                            }
                            else
                            {
                                $("#imgHead").attr("src","images/default.png");
                            }
                        }
                    }
                    else
                    {
                        window.location='index.html';
                        localStorage.clear();
                    }
                }
            });
    }
    else{
        window.location='index.html';
    }
}
//游客提交审核成为旅行管家
$("#subAndCheck").click(function(){
    var mId=JSON.parse(localStorage.person).user;
    var headUrl=$("#headUrl");
    var name=$("#strMemberName").val();
    var sex="男";
    var elems=document.getElementsByName("sex");
    for(var i=0;i<elems.length;i++)
    {
        if(elems[i].checked)
        {
            sex=elems[i].value;
        }
    }
    var mobile=$("#strMobile").val();
    var province=$("#deliverprovince").val();
    var city=$("$delivercity").val();
    var workTime=$("#year").val();
    var lan=$("#language").val();
    elems=document.getElementsByName("lan");
    var strLan="";//语言
    for(var j=0;j<elems.length;j++)
    {
        if(elems[j].checked)
        {
            if(elems[j].value!="其他")
            {
                strLan+=elems[j].value+",";
            }
            else
            {
                strLan+=$("#language").val();
            }
        }
    }
    var evaluate=$("#evalue").val();//个人标签
    var intro=$("#intoduce").val();//个人简介
    $.ajax({
        type: "post",
        url:hstr+"/Tailor/RegisterTailor" ,
        data: {
            strMemberID:mId,
            strHeadUrl:headUrl,
            strMemberName:name,
            intMemberSex:sex,
            strMobile:mobile,
            strProvince:province,
            strCity:city,
            intMembYears:workTime,
            strLanguate:strLan,
            strLabel:evaluate,
            strIntroduce:intro
    },
        dataType: "json",
        success: function (data) {
            if(data.Result==1)
            {
                alert("提交成功，请等待审核！");
            }
            else
            {
                alert(data.Message);
            }
        }
    });
});
//我的钱包
function myPurse(pg)
{
    var u=JSON.parse(localStorage.person);
    var isGuider= u.guider;
    if(isGuider)
    {
        $("#pdf4").show();

        var arrParam1 = { TailorID:u.user};
        var strParam1 = JSON.stringify(arrParam1);
        jsgSubmit1 = "strRequest=" + GetVisitData("Member_GetBalance", strParam1);

        var arrParam = { TailorID:u.user,Skip:(pg-1)*count,Take:count};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_GetTailorOrderFinishPage", strParam);
        //现金余额
        $.ajax({
            type: "post",
            url:jsgDataServer+jsgDataVisit,
            data:jsgSubmit1,
            dataType: "json",
            success:function(data){
                if(data.Result==1){
                    $("#allMoney").text(accounting.formatNumber(data.Balance,2));
                }else{
                    console.log(data.Message);
                }
            },
            error:function(data){
                console.log(data)
            }
        })
        //订单列表
        $.ajax({
            type: "post",
            url:jsgDataServer+jsgDataVisit,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                if(data.Result==1)
                {
                    var result='<div class="p_allMsg p_allMsg_Areal" style="height:auto;border:none;margin-bottom:15px;"><div class="p_allMsg_tbHeader"><div class="p_allMsg_tbHeader_Item" style="width:290px;">产品名称</div><div class="p_allMsg_tbHeader_Item" style="width:215px">类型</div><!--<div class="p_allMsg_tbHeader_Item">金额</div>--><div class="p_allMsg_tbHeader_Item" style="width:215px">交易状态</div><div class="p_allMsg_tbHeader_Item" style="width:215px">操作</div><div style="clear:both;"></div></div></div>';
                    /*开始分页*/
                    var p=pages(pages(data.RecordCount,count),count);
                    setPage(p,pg);
                    var len=data.List.length;
                    /*开始分页*/
                    $(".p_allMsg_Header").children("span").text("("+data.Total+")");
                    //$("#allMoney").text(accounting.formatNumber(data.TotalAmount,2));
                    if(len==0)
                    {
                        $(".jumpBt").hide();
                        $(".nothingTip").show();
                    }
                    else
                    {
                        /*for(var j=0;j<data.List.length;j++)
                        {
                            var status="";
                            var type="卖票";
                            switch(data.List[j].OrderStatus)
                            {
                                case 0:status="未付款";break;
                                case 1:status="已付款";break;
                                case 2:status="已使用";break;
                                case 3:status="已完成";break;
                                case -1:status="已取消";break;
                                case -2:status="已退订";break;
                                case -3:status="已关闭";break;
                            }
                            if(data.List[j].OrderStatus==3)
                            {
                                for(var i=0;i<data.List[j].ProductList.length;i++)
                                {
                                    result+='<div class="p_allMsg p_allMsg_Areal"><div class="p_allMsg_tbHeader p_allMsg_tbHeader_ItemAreal" style="line-height:85px;"><div class="p_allMsg_tbHeader_Item" style="width:200px;">'+data.List[j].OrderTime+'</div><div class="p_allMsg_tbHeader_Item" style="width:290px;"><div class="product_intro"><img src="'+imgurl+data.List[j].ProductList[i].ProductFirst+'"/></div><div class="product_intro" style="text-indent: 10px;text-align:left;"><div><a href="">'+data.List[j].ProductList[i].ProductName+'</a></div><div style="font-size:12px;">订单号:'+data.List[j].OrderID +'</div></div></div><div class="p_allMsg_tbHeader_Item">'+type+'</div><div class="p_allMsg_tbHeader_Item price">\+'+accounting.formatNumber(data.List[j].OrderTotal,2)+'</div><div class="p_allMsg_tbHeader_Item">'+status+'</div><div class="p_allMsg_tbHeader_Item">'+data.List[j].OrderRemark +'</div><div style="clear:both;"></div></div></div>';
                                }
                            }
                        }*/
                        //var imgulr="http://imgapi.nihaott.com";
                        for(var i=0;i<len;i++)
                        {
                            result+='<div class="p_allMsg p_allMsg_Areal" style="height:auto;border:none;"><table class="o_table" width="100%;" cellpadding="0" cellspacing="0"><tr><td colspan="6" style="padding:0;"><div class="header"><div class="dleft">订单号：'+data.List[i].OrderID+'<span class="dtime">下单日期: '+data.List[i].CreateTime +'</span></div> <div class="dleft" style="text-align:right;"><span>订单总额：</span><span class="price_marker" style="font-size:14px;">￥</span><span class="price price_more">'+accounting.formatNumber(data.List[i].Total,2)+'</span></div></div></td></tr>';
                            var rowspan=data.List[i].GoodsList.length;
                            for(var j=0;j<data.List[i].GoodsList.length;j++)
                            {
                                var status="";
                                switch(data.List[i].GoodsList[j].GoodsStatus)//0未付款；1已付款；2已使用；3已完成；-1已取消；-2已退订；-3已关闭
                                {
                                    case 0:status="未付款";break;
                                    case 1:status="已付款";break;
                                    case 2:status="已使用";break;
                                    case 3:status="交易成功";break;
                                    case -1:status="已取消";break;
                                    case -2:status="已退订";break;
                                    case -3:status="已关闭";break;
                                    case 9:status="已完成";break;
                                }
                                if(rowspan>1)
                                {
                                    if(j==0)
                                    {
                                        result+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;width:185px;text-align:left;">'+data.List[i].GoodsList[j].Name+'</div><div class="o_name">卖票</div><div class="o_name">'+status+'</div></td><td valign="middle" align="center" rowspan="'+rowspan+'"  style="width:140px"><a class="operatBt">操作</a></td> </tr>';
                                    }
                                    else
                                    {
                                        result+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;width:185px;text-align:left;">'+data.List[i].GoodsList[j].Name+'</div><div class="o_name"><span>卖票</span></div><div class="o_name">'+status+'</div></td></tr>';
                                    }
                                }
                                else
                                {
                                    result+='<tr><td colspan="5" valign="middle" align="center" style="width:788px;"><div class="o_name"  style="margin-left:10px;width:100px;"><div class="o_imgbox"><img src="'+data.List[i].GoodsList[j].PictureUrl+'"/></div><div class="o_text"></div></div><div class="o_name" style="width:185px;line-height: 20px;margin-left:5px;width:185px;text-align:left;">'+data.List[i].GoodsList[j].Name+'</div><div class="o_name"><span>卖票</span></div><div class="o_name">'+status+'</div></td><td valign="middle" align="center" rowspan="'+rowspan+'"  style="width:140px"><a class="operatBt">操作</a></td> </tr>';
                                }
                            }
                            result+="<table></div>";
                        }

                        $(".nothingTip").hide();
                    }
                    $("#myPurseContent").html(result);
                    result="";
                    /*for(var i=0;i<8;i++)测试样式是否正常
                     {
                     result+='<div class="p_allMsg p_allMsg_Areal"><div class="p_allMsg_tbHeader p_allMsg_tbHeader_ItemAreal"><div class="p_allMsg_tbHeader_Item" style="width:200px;">2012-1-2</div><div class="p_allMsg_tbHeader_Item" style="width:290px;"><div class="product_intro"><img src="images/hk.jpg"/></div><div class="product_intro" style="text-indent: 10px;text-align:left;"><div><a href="">VIP通道+成人门票</a></div><div style="font-size:12px;">订单号:123658714269</div></div></div><div class="p_allMsg_tbHeader_Item">买票</div><div class="p_allMsg_tbHeader_Item price">+120.00</div><div class="p_allMsg_tbHeader_Item">交易成功</div><div class="p_allMsg_tbHeader_Item">门票订单</div><div style="clear:both;"></div></div></div>';
                     }
                     $("#myPurseContent").html(result);*/
                    $("#pdf4").hide();
                }
                else
                {
                    alert(data.Message);
                }
            },
            error:function(data){
                console.log(data)
            }
        });
    }
    else
    {
        $(".nothingTip").show();
    }
}
//分页查询钱包
$(".purse").delegate("a","click",function(){
    var n=parseInt($(this).attr("name"));
    myPurse(n);
});
//点击跳转按钮
$("#pursejump").click(function(){
    var p=$("#purse").val();
    if(isNaN(p))
    {
        p=1;
    }
    else
    {
        p=parseInt(p);
    }
    $("#purse").val(p);
    myPurse(p);
});
//点击跳转按钮跳转到指定页数
$("#goTo").click(function(){
    var pg=$("#jump_page").val();
    if(isNaN(pg))
    {
        $("#jump_page").val("1");
        pg=1;
    }
    else
    {
        pg=parseInt($("#jump_page").val());
    }
   myPurse(pg);
});
/*点击页码查询指定页数的钱包*/
$("#pursePager a").click(function(){
    var pg=$(this).attr("name");
    myPurse(pg);
});
//获取旅行管家的代卖产品
function getTailorCommodityList(replacePg)
{
    var u=JSON.parse(localStorage.person);
    var str= u.user;
    if(u!=null&&u!=undefined)
    {
        if(!u.guider)
        {
            $("#modal-local").show();
            $(".nothingTip").show();
            window.location='Pcenter.html';
        }
        else
        {
            $("#pdf4").show();
            var arrParam = { TailorID:str,Skip:(replacePg-1)*count,Take:count};
            var strParam = JSON.stringify(arrParam);
            jsgSubmit = "strRequest=" + GetVisitData("Member_GetTailorCommodityList", strParam);
            $.ajax({
                type: "post",
                url:jsgDataServer + jsgDataVisit,//测试地址
                data:jsgSubmit,
                dataType: "json",
                success: function (data) {
                    var result='<div class="p_allMsg p_allMsg_Areal product" style="height:auto;"><div class="p_allMsg_tbHeader"><div class="p_allMsg_tbHeader_Item" style="width:32%;font-weight:bold;">产品名称</div><div class="p_allMsg_tbHeader_Item" style="width:12%;font-weight:bold;">商家</div><div class="p_allMsg_tbHeader_Item" style="width:12%;font-weight:bold;">销售价</div><div class="p_allMsg_tbHeader_Item" style="width:11%;font-weight:bold;">分销价</div><div class="p_allMsg_tbHeader_Item" style="width:11%;font-weight:bold;">库存</div><div class="p_allMsg_tbHeader_Item" style="width:22%;font-weight:bold;">操作</div><div style="clear:both;"></div></div></div>';
                    if(data.Result==1)
                    {
                        setPage(pages(data.Totel,count),replacePg);
                        
                        if(data.List.length!=0)
                        {
                            for(var i=0;i<data.List.length;i++)
                            {
                                //<a onclick="setPid(this)" name="'+data.List[i].ProductID+'" target="_blank">
                                result+='<div class="p_allMsg p_allMsg_Areal product"><div class="p_allMsg_tbHeader p_allMsg_tbHeader_ItemAreal"><div class="p_allMsg_tbHeader_Item" style="width:32%;"><div class="product_intro product_intro_areal"><img src="'+data.List[i].First+'"/></div><div class="product_intro" style="text-indent: 10px;text-align:left;"><div><a name="'+data.List[i].ProductID+'" target="_blank">'+data.List[i].Name+'</a></div></div></div><div class="p_allMsg_tbHeader_Item"  style="width:12%;line-height:24px;margin-top:44px;height:60px;overflow:hidden;color:#737373;">'+data.List[i].MerchantName+'</div><div class="p_allMsg_tbHeader_Item price"  style="width:11%;color:#ff9500;">￥'+accounting.formatNumber(data.List[i].Price,2)+'</div><div class="p_allMsg_tbHeader_Item price"  style="width:11%;color:#ff9500;">￥'+data.List[i].Buy +'</div><div class="p_allMsg_tbHeader_Item price" style="width:12%;color:#737373;font-weight:normal">'+data.List[i].Balance +'</div><div class="p_allMsg_tbHeader_Item"  style="width:22%;"><a class="operatBt" id="removeoperatBt" sell="'+data.List[i].SellID+'">移除</a><a class="operatBt" onclick="editorinitPro(this)" name="'+data.List[i].SellID+'|'+data.List[i].Name+'|'+data.List[i].First+'|'+data.List[i].Buy +'" id="editproduct">编辑</a></div><div style="clear:both;"></div></div></div>';
                               
                            }
                            $("#sellProduct").html(result);
                            $(".nothingTip").hide();
                            
                        }
                        else
                        {
                            $(".nothingTip").show();
                            $("#sellProduct").html(result);
                        }
                        result="";
                    }
                    else
                    {
                        alert(data.Message);
                    }
                    $("#pdf4").hide();
                }
            });
        }
    }
}
//点击页数跳转页面
$(".replaceSellProduct").on("click","a",function(){
    var index=parseInt($(this).attr("name"));
    getTailorCommodityList(index);

});

//移除管家代卖产品
$("#sellProduct").on("click","#removeoperatBt",function(){
    var sell=$(this).attr("sell");
    var arrParam = {SellID:sell};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Member_RemoveSell", strParam);
    $.ajax({
        type: "post",
        url:jsgDataServer + jsgDataVisit,
        data:jsgSubmit,
        dataType: "json",
        success: function (data){
            if(data.Result==1){
                getTailorCommodityList(1);
            }
        },
        error:function(data){
            console.log(data);
        }
    })
});
//编辑管家代买产品
function editorinitPro(th)
{
    $("#modal").show();
    var strArr=$(th).attr("name").split('|');
    pId=strArr[0];
    $("#pName").text(strArr[1]);
    $("#first_Img").attr("src",strArr[2]);
    $("#price").text(strArr[3]);
}
$("#replaceselladdProd").click(function(){

    var reg=/^\d{1,10}(\.\d{1,2})?$/g;
    if($("#salePrice").val().replace(/(^\s*)|(\s*$)/g, "")==""||!reg.test($("#salePrice").val()))
    {
        $("#error").text("请填写正确格式的销售价格！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);
    }
    else if($("#salePrice").val()>=$("#price").text()){
        var arrParam = { SellID:pId,Price:$("#salePrice").val(),Reason:" "};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_UpdateSell", strParam);
        $.ajax({
            type: "post",
            url:jsgDataServer + jsgDataVisit,
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                if(data.Result==1)
                {
                    /*$("#error").text("成功添加代卖产品");
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);*/
                    $('#modal').hide();
                    getTailorCommodityList(1);
                }
                else
                {
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);
                }
            },
            error:function(data){
                console.log(data);
            }
        });
    }
    else 
    {
        //alert("销售价不能小于分销价");
        $("#error").text("销售价不能小于分销价");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);
    }
});

//获取旅行管家可代卖的产品
function getMerchantProductList(addPg)
{

    var u=JSON.parse(localStorage.person);
    if(u!=null&&u!=undefined)
    {
        if(!u.guider)
        {
            $("#modal-local").show();
        }
        else
        {
            $("#pdf4").show();
            var str= u.user;
            var arrParam = {Skip:(addPg-1)*count,Take:count,ProductName:""};
            var strParam = JSON.stringify(arrParam);
            jsgSubmit = "strRequest=" + GetVisitData("Member_GetMerchantProductList", strParam);
            $.ajax({
                type: "post",
                url:jsgDataServer + jsgDataVisit,
                data:jsgSubmit,
                dataType: "json",
                success: function (data) {
                    var result='<div class="p_allMsg p_allMsg_Areal product" style="height:auto;border:none;"><div class="p_allMsg_tbHeader" style="border-bottom:1px solid #e0e0e0"><div class="p_allMsg_tbHeader_Item" style="width:32%;font-weight:bold;">产品名称</div><div class="p_allMsg_tbHeader_Item" style="width:16%;font-weight:bold;">商家</div><div class="p_allMsg_tbHeader_Item" style="width:15%;font-weight:bold;">分销价</div><div class="p_allMsg_tbHeader_Item" style="width:15%;font-weight:bold;">库存</div><div class="p_allMsg_tbHeader_Item" style="width:22%;font-weight:bold;">操作</div><div style="clear:both;"></div></div></div>';
                    
                    if(data.Result==1)
                    {
                        setPage(pages(data.Totel,count),addPg);
                        if(data.List.length>0)
                        {
                            for(var i=0;i<data.List.length;i++)
                            {
                                //<a onclick="setPid(this)" name="'+data.List[i].ProductID+'">'+data.List[i].Name+'</a>
                                result+='<div class="p_allMsg p_allMsg_Areal product"><div class="p_allMsg_tbHeader p_allMsg_tbHeader_ItemAreal"><div class="p_allMsg_tbHeader_Item" style="width:32%;"><div class="product_intro product_intro_areal"><img src="'+data.List[i].First +'"/></div><div class="product_intro" style="text-indent: 10px;text-align:left;"><div><a name="'+data.List[i].ProductID+'">'+data.List[i].Name+'</a></div></div></div><div class="p_allMsg_tbHeader_Item price"  style="width:16%;color:#737373;line-height:25px;margin-top:40px;font-weight:normal;">'+data.List[i].MerchantName +'</div><div class="p_allMsg_tbHeader_Item price"  style="width:15%;color:#ff9500;">￥'+data.List[i].Buy  +'</div><div class="p_allMsg_tbHeader_Item price" style="width:15%;color:#737373;font-weight:normal">'+data.List[i].Balance+'</div><div class="p_allMsg_tbHeader_Item"  style="width:22%;"><a class="operatBt" onclick="initPro(this)" style="margin-top:25px;" name="'+data.List[i].ProductID+'|'+data.List[i].Variety+'|'+data.List[i].Name+'|'+data.List[i].First+'|'+data.List[i].Buy +'">添加</a></div><div style="clear:both;"></div></div></div>';
                            }
                            $("#sellProduction").html(result);
                            $(".nothingTip").hide();
                            result="";
                        }
                        else
                        {
                            $(".nothingTip").show();
                        }
                    }
                    else
                    {
                        alert(data.Message);
                    }
                    $("#pdf4").hide();
                }
            });
        }
    }
}
//点击页数跳转页面
$(".addReplacesellproduct").on("click","a",function(){
    var index=parseInt($(this).attr("name"));
    getMerchantProductList(index);

});
//点击跳转按钮
$("#addreplacejump").click(function(){
    var p=$("#jump_page").val();
    if(isNaN(p))
    {
        p=1;
    }
    else
    {
        p=parseInt(p);

    }
    $("#jump_page").val(p);
    getMerchantProductList(p);
});
//点击跳转按钮跳转到指定页数
/*$("#addreplacejump").click(function(){
    var pg=$("#jump_page").val();
    if(isNaN(pg))
    {
        $("#jump_page").val("1");
        pg=1;
    }
    else
    {
        pg=parseInt($("#jump_page").val());
    }
   getMerchantProductList(pg);
});*/

//初始化弹出窗的字段值
var pId=-1;
var pId1=-1;
function initPro(th)
{
    $("#modal").show();
    var strArr=$(th).attr("name").split('|');
    pId=strArr[0];
    pId1=strArr[1];
    $("#pName").text(strArr[2]);
    $("#first_Img").attr("src",strArr[3]);
    $("#price").text(strArr[4]);
}
//添加旅行管家的可代卖产品
$("#addProd").click(function(){
    var u=JSON.parse(localStorage.person);
    var str= u.user;
    var reg=/^\d{1,10}(\.\d{1,2})?$/g;
    if($("#salePrice").val().replace(/(^\s*)|(\s*$)/g, "")==""||!reg.test($("#salePrice").val()))
    {
        $("#error").text("请填写正确格式的销售价格！");
        $("#pdf2").show();
        var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);
    }
    else
    {
        var arrParam = { TailorID:str,ProductID:pId,VarietyID:pId1,Price:$("#salePrice").val(),Reason:" "};
        var strParam = JSON.stringify(arrParam);
        jsgSubmit = "strRequest=" + GetVisitData("Member_AddSell", strParam);
        $.ajax({
            type: "post",
            url:jsgDataServer + jsgDataVisit,//测试用地址
            data:jsgSubmit,
            dataType: "json",
            success: function (data) {
                if(data.Result==1)
                {
                    $("#error").text("成功添加代卖产品");
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);
                }
                else
                {
                    $("#error").text(data.Message);
                    $("#pdf2").show();
                    var t=setTimeout(function(){$("#pdf2").hide();clearTimeout(t);},2000);
                }
            }
        });
    }
});
//判断用户类型
function userType()
{
    var u=JSON.parse(localStorage.person);
    if(u!=null&&u!=undefined)
    {
        var isGuider= u.guider;
        if(isGuider)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        window.location='index.html';
        return false;
    }
}
//左边菜单点击事件
$(".pListMenu a").click(function(){
    var url=$(this).attr("name");
    var req=parseInt($(this).attr("data-required"));
    var guider=userType();
    if(req==1)
    {
        if(guider)
        {
            window.location=url;
        }
        else
        {
            var str='<div id="modal-local" style="display:block;"><div class="modal-local-dialog"><div class="modal-local-content"><div class="tip"><div class="left">提醒</div><div class="right" id="local-close" onclick="$(\'#modal-local\').hide()">×</div></div><div class="tip-under"><div id="tip-change">您好，您当前不是旅行管家<br><a href="howTobeLocal.html">点击这里</a>成为旅行管家</div></div></div> </div></div>';
            $("#modal-local").remove();
            $("body").append(str);
        }
    }
    else
    {
        window.location=url;
    }
});
//首页图片滚动
//len:设置图片容器的的宽度
var len=0;
var nextPage=0;
//首页获取导游列表
function getTailors()
{
    var arrParam = {Skip:nextPage,Take:20};
    var strParam = JSON.stringify(arrParam);
    jsgSubmit = "strRequest=" + GetVisitData("Index_GetHotTailorPage", strParam);
    $.ajax({
        type: "post",
        url:jsgDataServer+jsgDataVisit,
        data:jsgSubmit,
        cache: false,
        asyc : true,
        dataType: "json",
        success: function (data) {
            if(data.Result==1)
            {
                var str="";
                var header="";
                for(var i=0;i<data.List.length;i++)
                {
                    if(data.List[i].HeadUrl.replace(/(^\s*)|(\s*$)/g, "")=="")
                    {
                        header="images/default.png";
                    }
                    else
                    {
                        header=data.List[i].HeadUrl;
                    }
                   // <div>'+data.List[i].ProductCount+'个产品</div>  <div class="label">￥'+data.List[i].ProductPrice+'</div> <div class="personIntro"><img src="images/lock.png" class="marker"></div>
                    str+='<li><a name="'+data.List[i].TailorID+'" href="guiderDetail.html"  target="_blank"><div class="imgbox"><img src="'+data.List[i].IndexUrl+'"/><div class="profile">'+data.List[i].Lable+'</div></div><div class="txtDescrible"><div class="desContent"><div class="leftMember"><img src="'+header+'"></div><div class="rightDescrible"><div class="memberName">'+data.List[i].Name+'</div><div class="memberDes"><div><img src="images/cup.png"  class="marker"></div><div>'+data.List[i].Occupation+'</div><div></div></div><div class="words" title="'+data.List[i].Inaword+'">'+data.List[i].Inaword+'</div><div class="gobuy">去预定></div></div></div></div></a></li>';
                }
                $("#imgContainer ul").append(str);
                var count=$("#imgContainer ul li").length;
                len=parseInt(data.Total)*(384+24);
                $("#imgContainer").css("width",len+"px");
                $(".leftArrow").hide();
               /* if(count<parseInt(data.Total))
                {
                    if(nextPage!=0)
                    {
                        scrollPicture(1);
                    }
                    nextPage+=3;
                }
                else
                {
                    if(nextPage!=0)
                    {
                        scrollPicture(1);
                    }
                }*/
            }
            else
            {
                alert(data.Message);
            }
        },
        error:function(data){
            console.log(data);
        }
    });
}
$("#imgContainer").on("click","a",function(){
    var name=$(this).attr("name");
    localStorage.uId=name;
});
//图片滚动效果，滚动长度可以自定义
//progress:滚动完成后才能进行下一次滚动，false:本次滚动还没完成，不能进入下一次滚动，true:本次滚动完成，可以进入下一次滚动
var progress=true;
function scrollPicture(flag)
{
    if(flag==1)
    {
        if(progress)
        {
            progress=false;
            $(".leftArrow").show();
            var marginLeft=parseInt($("#imgContainer").css("margin-left"));
            var absMargeinLeft=Math.abs(marginLeft);
            var maintain=len-absMargeinLeft-1224;
            if(maintain>1224)
            {
                $("#imgContainer").animate({"marginLeft":(marginLeft-1224)+"px"},500,function(){
                    progress=true;
                });
            }
            else
            {
                if(maintain>384)
                {
                    $(".rightArrow").hide();
                    $("#imgContainer").animate({"marginLeft":-(len-1224)+"px"},500,function(){
                        progress=true;
                    });
                }
                else
                {
                    $("#imgContainer").animate({"marginLeft":0+"px"},500,function(){progress=true;});
                }
            }
        }
    }
    else
    {
        if(progress)
        {
            $(".rightArrow").show();
            var marginLeft=parseInt($("#imgContainer").css("margin-left"));
            if(marginLeft<0)
            {
                var absMargin=Math.abs(marginLeft);
                if(absMargin>1224)
                {
                    $("#imgContainer").animate({"marginLeft":-absMargin+1224+"px"},500,function(){
                        progress=true;
                    });
                }
                else
                {
                    $(".leftArrow").hide();
                    $("#imgContainer").animate({"marginLeft":0+"px"},500,function(){
                        progress=true;
                    });
                }
            }
            else
            {
                $("#imgContainer").animate({"marginLeft":-(len-1224)+"px"},500,function(){
                    progress=true;
                });
            }
        }
    }
}
$(".leftArrow").click(function(){
    scrollPicture(-1);
});
$(".rightArrow").click(function(){
    //getTailors();
    scrollPicture(1);
});



