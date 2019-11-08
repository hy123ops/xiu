var oTel = document.getElementById("login-tel");
var oKey = document.getElementById("login-key");
var oLbtn = document.getElementById("login-btn");
var oTelwarn = document.getElementById("tel-warn");
var oKeywarn = document.getElementById("key-warn");



var reg = /^1[34578]\d{9}$/ //11位手机号
var reg2 = /^\w{6,12}$/ //  字母数字下划线

 $('#one').click(function () {
     $('.content_2').css('display','none');
     $('.content_1').css('display','block');
     $('#one').css('color','#000');
     $('#two').css('color','#bbb');
   })
 $('#two').click(function () {
     $('.content_1').css('display','none');
     $('.content_2').css('display','block');
     $('#one').css('color','#bbb');
     $('#two').css('color','#000');
   })




$('#login').blur=fnTel;
$('#login-key').blur=fnKey;


$('#login-btn').click(function(){
    if (!(fnTel()&fnKey())) {
        return;
     }
      //去判断这两个和库中是否相同 oTel.value  oKey.value;
      if (getCookie("bank")) { 
          var arrBank = getCookie("bank").split("&");
          var boo = false;
          for (var i = 0; i < arrBank.length; i++) {
              var obj = convertCartStrToObj(arrBank[i]);
              if (oTel.value == obj.tel) {//通过对象.属性的方法获取手机号，并与文本框输入对比（3）
                   if(oKey.value == obj.key){  //通过对象.属性的方法获取密码，并与文本框输入对比（4）
                      alert("登陆成功")
                      createCookie("user", arrBank[i]);
                      window.location.href = 'index.html';
                      return ;
                  }else{
                      alert("密码错误")
                      oKey.innerHTMl = "";
                      return;
                   }
               var boo = true;
              }
          }
          alert("这个用户不存在");
      }
})

//把正则判断的函数封装起来(1)
function fnTel() {
    if (reg.test(oTel.value)) {
        oTelwarn.innerHTML = "";
        oTelwarn.style.color = "green"
        return true;
    } else {
        oTelwarn.innerHTML = "X请输入11位手机号";
        oTel.value = "";
        oTelwarn.style.color = "red"
    }

}
 function fnKey() {
    if (reg2.test(oKey.value)) {
        oKeywarn.innerHTML = "";
        oKeywarn.style.color = "green";
        return true;
    } else {
        oKeywarn.innerHTML = "X请输入6-12位字母数字下划线";
        oKeywarn.value = "";
        oKeywarn.style.color = "red"
    }
}
//前面封装好的函数拷过来
function convertCartStrToObj(cartStr) {
    var obj = {};
    var arrVal = cartStr.split(",");
    for (var i = 0; i < arrVal.length; i++) {
        data = arrVal[i].split(":"); 
        console.log(data)
        obj[data[0]] = data[1];
    }
    return obj;
}