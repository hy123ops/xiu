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


/* 商品详情 */
var r=window.location.search;
var arr=[];
arr=r.split('=');
//console.log(arr[1])

$.getJSON('/fl/router?appKey=100001&v=1.0&method=product.newDetail.get&pid='+arr[1]+'&sessionId=2f927db4-0e39-49eb-84e5-6f78be630ddb&deviceNumber=1569485722798&channel=1', function (data) {
    console.log(data)
    imgs = data.data.skuList[0].imgUrlList.length;
    for (let i = 0; i < imgs; i++) {
        $('#Dimg').append($('<img>'));
        $('#Dimg img').eq(i).attr('src', data.data.skuList[0].imgUrlList[i])
        $('#imgBox').append($('<img>'));
        $('#imgBox img').eq(i).attr('src', data.data.skuList[0].imgUrlList[i])
        $('#img-list').append($('<img>'));
        $('#img-list img').eq(i).attr('src', data.data.skuList[0].imgUrlList[i])
    }
    $('.details').html(data.data.productDetail);
    $('.product-wrap .nav-wrap .zp').html(data.data.saleCategoryList[0].categName)
    $('.product-wrap .nav-wrap .mm').html(data.data.productName)
    $('.product-name').html(data.data.productName)
    $('.brand-name').html("品牌：" + data.data.brand.brandCname)
    $('.product-no').html("商品编号：" + data.data.productId)
    $('.price-1').html(data.data.minSellingPrice)
    $('.price-2').html("￥" + data.data.minMarkOffPrice)  
    $('.regin').html(data.data.deliveryRegion);



/* 放大镜 */
    var num = 0;
    $('#img-list img').click(function () {
        num = $(this).index();
        $('#Dimg img').each(function () {
            $('#Dimg img').css('z-index', '1');
        })
        $('#Dimg img').eq(num).css('z-index', '3');
        
        
        $('#imgBox img').each(function () {
            $('#imgBox img').css('z-index', '1');
        })
        $('#imgBox img').eq(num).css('z-index', '3');
        

        
        $('#img-list img').each(function () {
            $('#img-list img').css('border', '1px solid #fff')
        })
        $(this).css('border', '1px solid #000')


        $('#imgBox img').each(function () {
            $('#imgBox img').attr('id', '');
        })
        $('#imgBox img').eq(num).attr('id', 'img');
    })

    $('.lt').click(function () {
        $('#img-list').css('left', '-460px'),
            $('.lt').css('color', '#ccc'),
            $('.rt').css('color', '#000')
    })

    $('.rt').click(function () {
        $('#img-list').css('left', ''),
            $('.rt').css('color', '#ccc'),
            $('.lt').css('color', '#000')
    })
})



$('#Dimg').mouseover(function () {
    $('#sbox').css('display', 'block');
    $('#imgBox').css('display', 'block');
})
$('#Dimg').mouseout(function () {
    $('#sbox').css('display', 'none');
    $('#imgBox').css('display', 'none');
})
$('#Dimg').mousemove(function (ev) {

    let L = ev.pageX - $('#Dimg').position().left - $('#sbox').width() * 1.5;
    let T = ev.pageY - $('#Dimg').position().top - $('#sbox').height() * 1.5;

    if (L < 0) {
        L = 0;
    } else if (L > $('#Dimg').width() - $('#sbox').width()) {
        L = $('#Dimg').width() - $('#sbox').width();
    }

    if (T < 0) {
        T = 0;
    } else if (T > $('#Dimg').height() - $('#sbox').height()) {
        T = $('#Dimg').height() - $('#sbox').height();
    }

    $('#sbox').css('left', L)
    $('#sbox').css('top', T)

    var sX = L / ($('#Dimg').width() - $('#sbox').width());
    var sY = T / ($('#Dimg').height() - $('#sbox').height());

    imgBoxImgleft = -sX * ($('#imgBox img').width() - $('#imgBox').width()) + 'px';
    imgBoxImgtop = -sY * ($('#imgBox img').height() - $('#imgBox').height()) + 'px';

    $('#imgBox img').css('left', imgBoxImgleft)
    $('#imgBox img').css('top', imgBoxImgtop)


})

/* 数量加减 */
var number=0;
$('#jia').click(function(){
    number=$('#shuru').val();
    number++;
    console.log(number)
    $('#shuru').val(number);
    $('#jian').css('color','#000')
})

$('#jian').click(function(){
    number=$('#shuru').val();
    if(number<=1)
    {
        $(this).css('color','#ccc')
    }
    else{

        number--;
    }
    $('#shuru').val(number);
    if($('#shuru').val()>=1)
    {
        $('#jian').css('color','#ccc')
    }
})



/* 详情切换 */
function Tab(id){
    this.parent = document.getElementById(id);
    this.lis = this.parent.getElementsByTagName('li');
    //this.divs = this.parent.getElementsByTagName('div');
    this.init();//在谁里面调用指向的就是谁，这里this指向的是tab，而tab在t1里调用。
}
Tab.prototype.init = function(){
    for(var i=0;i<this.lis.length;i++){
        this.lis[i].index = i;
        this.lis[i].onclick = this.change.bind(this);//this.change中的this指向的是init，加bind（this）使this都指向对象。
    }
};
Tab.prototype.change = function(ev){
    var target = ev.target;//事件源
    for(var i=0;i<this.lis.length;i++){
        this.lis[i].className = '';
        //this.divs[i].display = 'block';
    }
    target.className = 'active';
    //this.divs[target.index].display = 'none';
};

var t1 = new Tab('shop-list');


/* 收藏 */

var is = document.getElementsByClassName('iconxin');
    for(var i=0;i<is.length;i++){
        is[i].index = i;
        is[i].onoff=true;
        is[i].onclick = function(){
            if(this.onoff){
                is[this.index].style.backgroundImage = 'url(../static/images/black.png)';
            }
            else{
                is[this.index].style.backgroundImage = 'url()';
            }
            this.onoff=!this.onoff;
        };
    }

    /* 加入购物车 */
    $('.btn-2').click(function(){
    
        let nub=Math.floor($('.icongouwuche').html());
        let nua=$('#shuru').val();
        let nuc=Math.floor(nua);
        $('.icongouwuche').html(nuc+nub)
            huoqu();
    })
    
    
    
    
    function huoqu()
    {   let index=null;
        if($.cookie("index")){
            index=parseInt($.cookie("index"));
        }else{
            $.cookie("index","0",{ path:"/pages"});
            index=0;
        }
       var $name = $('.product-name').html();
       var $paric= $('.price-1').html();
       var $number= $('#shuru').val();
       var $img=$('#img-list img').eq(0).attr('src')
       console.log($img);
       var $value=[$name,$paric,$number,$img,index];
       $.cookie(index, $value,{ expires: 10 })
       alert('添加购物车成功');
    
       index++;
       $.cookie("index",index+"",{ expires: 10 });
        console.log(index);
        
        //console.log(decodeURIComponent(document.cookie))
       
    }


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