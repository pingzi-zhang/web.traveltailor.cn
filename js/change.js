/*********************全局变量开始*********************/
var jsgSiteHost = window.location.protocol + "//" + window.location.host; 
var jsgWxJsapiAuthorize = jsgSiteHost + "/Weixin/WxJsapiAuthorize"
var jsgWxPayServer = "http://payapi2.traveltailor.cn";  //http://payapi2.traveltailor.cn http://paytest.traveltailor.cn
var jsgDataServer = "http://webapi.traveltailor.cn"; //webapi.traveltailor.cn  http://webapitest.traveltailor.cn
var jsgDataVisit = "/Gate/VisitChannel";
var jsgImageServer = "http://imgapi.traveltailor.cn"; //'http://ttimgapitest.nihaott.com/Picture/GetGraphicCode'
var jsgImageUpload = "/Picture/UploadPicture";
var jspPartnerID = "A001";
var jspApplyID = "zhtt2hvWebApi2_1.0";
var jspSignKey = "1234567812345678"; //1234567812345678  1

/*********************全 局变量结束*********************/
/*********************访问开始*********************/
function GetRandomString(intLength) {
    intLength = intLength || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < intLength; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function GetTimeStamp() {
    var dtmNow = new Date();
    dtmNow.setMinutes(dtmNow.getMinutes() + dtmNow.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
    //alert(dtmNow.toLocaleString());
    return dtmNow.getTime().toString();
}
function GetSignMd5(strActionName, strActionParam, strTimeStamp) {
    var strSign = jspApplyID;
    strSign += "&" + jspSignKey;
    strSign += "&" + strActionName;
    strSign += "&" + strActionParam;
    strSign += "&" + strTimeStamp;
    return CryptoJS.MD5(strSign);//$.md5(strRequest)
}
function GetVisitData(strActionName, strActionParam) {
    var arrVisitValue = { PartnerID: jspPartnerID, ApplyID: jspApplyID, ActionName: strActionName, ActionParam: strActionParam };
    var strVisitValue = JSON.stringify(arrVisitValue);
    var strVisitID = GetRandomString(16);
    strVisitValue = CryptoJS.AES.encrypt(strVisitValue, CryptoJS.enc.Utf8.parse(strVisitID), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    strVisitValue = encodeURI(strVisitValue);
    strVisitValue = strVisitValue.replace(/\+/g, '%2B');
    //strVisitValue = strVisitValue.replace(/\ /g, '%2B');
    strVisitValue = strVisitValue.replace(/\=/g, '%4S');
    var strTimeStamp = GetTimeStamp();
    var strSign = GetSignMd5(strActionName, strActionParam, strTimeStamp.toString());
    var arrRequest = { VisitID: strVisitID, VisitValue: strVisitValue, TimeStamp: strTimeStamp.toString(), Sign: strSign.toString() };
    var strRequest = JSON.stringify(arrRequest);
    return strRequest;
}
/*********************访问结束*********************/
/*********************全局函数开始*********************/
function GetString(objValue) {
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return "";
    } else {
        return new String(objValue);
    }
}
function GetInt(objValue) {
    var intValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
    } else {
        intValue = parseInt(objValue);
    }
    return intValue;
}
function GetFloat(objValue) {
    var fltValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
    } else {
        fltValue = parseFloat(objValue);
    }
    return fltValue;
}
function GetDatetime(objValue) {
    var dtmValue = jsgDefaultTime;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
    } else {
        dtmValue = new Date(objValue);
    }
    return dtmValue;
}
function IsEmail(strEmail) {
    var regEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    return regEmail.test(strEmail);
}
function GetParameterValue(strKey) {
    var strUrl = window.location.href;
    var intStart = strUrl.indexOf("?") + 1;
    var arrParameter = {};
    if (intStart !== 0) {
        var strQuery = strUrl.substring(intStart);
        var arrParaKey = strQuery.split("&");
        var arrSingle = [];
        var i = 0;
        for (; i < arrParaKey.length; i++) {
            arrSingle = arrParaKey[i].split("=");
            if (i === arrParaKey.length - 1) {
                var sIndex = arrSingle[1].indexOf("#");
                if (sIndex !== -1) {
                    arrSingle[1] = arrSingle[1].substring(0, sIndex);
                }
            }
            arrParameter[arrSingle[0]] = arrSingle[1]
        }
    }
    return decodeURIComponent(arrParameter[strKey] || "");
}