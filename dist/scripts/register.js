var oTel = document.getElementById("tel");
var oKey = document.getElementById("key");
var oBtn = document.getElementById("btn");
var oTelwarn = document.getElementById("tel-warn");
var oKeywarn = document.getElementById("key-warn");
var reg = /^1[34578]\d{9}$/ //11位手机号
var reg1 = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,10}$/ //字母数字中文下划线
var reg2 = /^\w{6,12}$/ //  字母数字下划线
    //设置失焦事件



$('#login').blur=fnTel;
$('#login-key').blur=fnKey;
$('#btn').click(function(){

//点击注册时再次进行正则判断(2)
if (!(fnTel()&fnKey())){
    return;
}
//把信息拼成一个键值对形式 例如 name:17dian,key:123456,tel:18810701077（2）
var val ="tel" + ":" + oTel.value+ "," +  "key" + ":" + oKey.value ;
createCookie("user", val); //存放到当前用户中，
if (getCookie("bank")) {
    var bankVal = getCookie("bank") + "&" + val;
} else {
    var bankVal = val;
}
createCookie("bank", bankVal , setCookieDate(100));
window.location.href = "index.html";
})



// oBtn.onclick = function() {
        
//     }

//     //封装正在判断函数(1)

function fnTel() {
    //判断手机号之前是否被注册过(3)
    if (getCookie("bank")) {
        var arrBank = getCookie("bank").split("&");
        for (var i = 0; i < arrBank.length; i++) {
            var obj = convertCartStrToObj(arrBank[i]);
            if (oTel.value == obj.tel) {
                oTelwarn.innerHTML = "您的手机号已经被注册";
                oTel.value = "";
                oTelwarn.style.color = "red"
                return;
            }
        }
    }
    if (reg.test(oTel.value)) {
        oTelwarn.innerHTML = "√";
        oTelwarn.style.color = "green";
        return  true;
    } else {
        oTelwarn.innerHTML = "X请输入11位手机号";
        oTel.value = "";
        oTelwarn.style.color = "red"
    }
}   
function fnKey() {
    if (reg2.test(oKey.value)) {
        oKeywarn.innerHTML = "√";
        oKeywarn.style.color = "green"
        return  true;
    } else {
        oKeywarn.innerHTML = "X请输入6-12位字母数字下划线";
        oKeywarn.value = "";
        oKeywarn.style.color = "red"
    }
}
function convertCartStrToObj(cartStr) {
    var obj = {};
    var arrVal = cartStr.split(",");
    for (var i = 0; i < arrVal.length; i++) {
        data = arrVal[i].split(":"); 
        obj[data[0]] = data[1]; //给对象添加属性
    }
    return obj;
}