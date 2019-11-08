// 登录注册
var oTL = document.getElementById("btn-wrap");
var oHome = document.getElementById("home");
var oOut = document.getElementById("outlogin");
var oLoginName = document.getElementById("login-name");
	if(getCookie("user")){  
           $('#btn-wrap').css('display','none'),
           $('#home').css('display','block')
           
      var obj = convertCartStrToObj(getCookie("user")); //*重点：将字符串转化成对象的形式（2）
       oLoginName.innerHTML = obj.tel; //通过对象.属性的方式去获取用户名（3）
 }


 $('#outlogin').click(function(){
	removeCookie("user");
	window.location.href = "index.html";
 })
function convertCartStrToObj(cartStr){        
         var obj ={};
        //将字符串name:17dian,key:123456,tel:18810701077 按“,”拆分成数组["name:17dian", "key:123456", "tel:18810701077"]
         var arrVal = cartStr.split(",");  
         for ( var i = 0; i < arrVal.length ;i++){
                  data = arrVal[i].split(":"); // 在将每一项拆分 例如arrVal[0]时 data =["name", "17dian"]
                  //console.log(data);
                  obj[data[0]] = data[1]; //给对象添加属性
         }
        return obj;
}


/* 轮播 */
var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 水平切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
                el: '.swiper-pagination',
                clickable :true,
        },

        autoplay:true,

}) 


/* 尖货推荐 */
$.getJSON("/pp/operationContent/getByCode?code=尖货推荐",function(data){
        imgsl=data.data.contentList.length;
        for(let i=0;i<imgsl;i++){
                $('.img-list').append($('<li>'))
        }
        $('.img-list li').append($('<a>'))
        $('.img-list li a').append($('<img>'))

        let $lis=$(".img-list li a img")
        for(let i=0;i<$lis.length;i++){
                $lis.eq(i).attr('src',data.data.contentList[i].image_url)
        }
})

/* 发现好货 */
$.getJSON("/bb/plan/search?pageNum=1&pageSize=20&planId=496",function(data){
//console.log(data);

        mas=data.data.esProducts.length;
        for(let i=0;i<mas;i++){
                $('.goods-list').append($('<li>'))
                //$('.goods-list li a').eq(i).attr('href','http://localhost:8000/pages/goods.html?goodsid='+data.data.esProducts[i].productSid)
                //$('.goods-list li a').eq(i).attr('href','http://localhost:8000/pages/goods.html')
        }
        $('.goods-list li').append($('<a>'))
        $('.goods-list li').append($('<p>'))
        $('.goods-list li').append($('<div>'))
        $('.goods-list li div').attr('class','goods-name')

        $('.goods-list li').append($('<span>'))
        $('.goods-list li a').append($('<img>'))

        for (let i = 0; i < mas; i++) {
                $('.goods-list li a').eq(i).attr('href', 'http://localhost:8000/pages/goods.html?goodsid='+data.data.esProducts[i].productSid)    
        }

        $gis=$(".main .goods-list li a img");
        $pis=$(".main .goods-list li p");
        $gin=$(".main .goods-name");
        $spanis=$(".main .goods-list li span");
        //$('.goods-list li a').attr('href','http://localhost:8000/pages/goods.html')

        for(let i=0;i<$gis.length;i++){
                $gis.eq(i).attr('src',data.data.esProducts[i].proPictDir);
                $pis.eq(i).html(data.data.esProducts[i].brandNameEn)
                $gin.eq(i).html(data.data.esProducts[i].productName)
                $spanis.eq(i).html('￥'+data.data.esProducts[i].brandSid)
        }
})


/* 返回顶部 */
var dingbu = document.getElementById('dingbu');

window.onscroll = function(){
    var sy = getScrollY();
    if( sy > 600 ){
        dingbu.style.display = 'block';
    }
    else{
        dingbu.style.display = 'none';
    }
};

dingbu.onclick = function(){
    setScrollY(0);
};

function getScrollY(){
    return window.pageYOffset || document.documentElement.scrollTop;
}
function setScrollY(n){
    document.documentElement.scrollTop = n;
}
