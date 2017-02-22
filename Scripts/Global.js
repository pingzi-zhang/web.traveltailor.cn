var jsgSiteHost = window.location.protocol + "//" + window.location.host;
function GetString(objValue) {
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return "";
    } else {
        return objValue;
    }
}
function GetInt(objValue) {
    var intValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return 0;
    } else {
        intValue = parseInt(objValue);
    }
    return intValue;
}
function GetFloat(objValue) {
    var fltValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return 0;
    } else {
        fltValue = parseFloat(objValue);
    }
    return intVafltValuelue;
}