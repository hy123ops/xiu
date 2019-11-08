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

/* 筛选 */
var dlNum = $("#aui-selectList").find("dl");
	        for (i = 0; i < dlNum.length; i++) {
	            $(".aui-screen-head-choice .aui-clear-list").append("<div class=\"aui-selected-info selectedShow\" style=\"display:none\"><span></span><label></label><em></em></div>");
	        }
	        var refresh = "true";
	        $(".aui-screen-list-item a ").live("click", function() {
	            var text = $(this).text();
	            var selectedShow = $(".selectedShow");
	            var textTypeIndex = $(this).parents("dl").index();
	            var textType = $(this).parent("dd").siblings("dt").text();
	            index = textTypeIndex - (2);
	            $(".aui-clear-delete").show();
	            $(".selectedShow").eq(index).show();
	            $(this).addClass("selected").siblings().removeClass("selected");
	            selectedShow.eq(index).find("span").text(textType);
	            selectedShow.eq(index).find("label").text(text);
	            var show = $(".selectedShow").length - $(".selectedShow:hidden").length;
	            if (show > 1) {
	                $(".aui-eliminate").show();
	            }

	        });
	        $(".selectedShow em").live("click", function() {
	            $(this).parents(".selectedShow").hide();
	            var textTypeIndex = $(this).parents(".selectedShow").index();
	            index = textTypeIndex;
	            $(".aui-screen-list-item").eq(index).find("a").removeClass("selected");

	            if ($(".aui-screen-list-item .selected").length < 2) {
	                $(".aui-eliminate").hide();
	            }
	        });

	        $(".aui-eliminate").live("click", function() {
	            $(".selectedShow").hide();
	            $(this).hide();
				$(".aui-screen-list-item a ").removeClass("selected");
				
			});
		
/* 搜索 */
$.getJSON("/bb/product/search?v=1&appKey=100001&pageSize=20&pageNum=1&dispId=003,004,015,016&sessionId=fc20c395-a6b2-471d-8f18-b58144be2cb8&deviceNumber=1568880196292&channel=1",function(data){
    console.log(data);

    $items=$(".aui-screen-box .item-list li a img");
    $ps=$(".aui-screen-box .item-list li p");
    $gn=$(".aui-screen-box .goods-name");
    $spans=$(".aui-screen-box .item-list li span");

    $brand=$('.aui-screen-list-item .brands')
    $cate=$('.aui-screen-list-item .categorys')
    $add=$('.aui-screen-list-item .address')
    $col=$('.aui-screen-list-item .color')
    $size=$('.aui-screen-list-item .size')
    $pre=$('.aui-screen-list-item .prices')


    for(let i=0;i<20;i++){
        $items.eq(i).attr('src',data.data.esProducts[i].proPictDir)
        $ps.eq(i).html(data.data.esProducts[i].brandNameEn)
        $gn.eq(i).html(data.data.esProducts[i].productName)
        $spans.eq(i).html('￥'+data.data.esProducts[i].brandSid)
    }

    $arrData=[];
    for(var i=0;i<data.data.esProducts.length;i++){
        $arrData.push(data.data.esProducts[i])
    }

    //$arrData=data.data.esProducts;

        $(".sort").eq(0).click(function(){
            // $(".product-list-wrap").empty();
            change($(this).html());
        })
        $(".sort").eq(1).click(function(){
            // $(".product-list-wrap").empty();
            change($(this).html());
        })
        $(".sort").eq(2).click(function(){
            // $(".product-list-wrap").empty();
            change($(this).html());
        })
        $(".sort").eq(3).click(function(){
            // $(".product-list-wrap").empty();
            change($(this).html());
        })

        function change(str){
            if(str=='默认'){
                for(let j=0;j<20;j++){
                    $items.eq(j).attr('src',data.data.esProducts[j].proPictDir)
                    $ps.eq(j).html(data.data.esProducts[j].brandNameEn)
                    $gn.eq(j).html(data.data.esProducts[j].productName)
                    $spans.eq(j).html('￥'+data.data.esProducts[j].brandSid)
                }
            }else if(str=='按时间'){
                $arrData.sort(function(n1,n2){
                   return n1.shelveUpTime - n2.shelveUpTime;
                })
                for(let j=0;j<20;j++){
                    $items.eq(j).attr('src',$arrData[j].proPictDir)
                    $ps.eq(j).html($arrData[j].brandNameEn)
                    $gn.eq(j).html($arrData[j].productName)
                    $spans.eq(j).html('￥'+$arrData[j].brandSid)
                }

            }else if(str=='按销量'){
                $arrData.sort(function(n1,n2){
                    return n1.stockBlance - n2.stockBlance;
                 })
                for(let j=0;j<20;j++){
                    $items.eq(j).attr('src',data.data.esProducts[j].proPictDir)
                    $ps.eq(j).html(data.data.esProducts[j].brandNameEn)
                    $gn.eq(j).html(data.data.esProducts[j].productName)
                    $spans.eq(j).html('￥'+data.data.esProducts[j].brandSid)
                }
            }else{
                $arrData.sort(function(n1,n2){
                    //console.log(n1.brandSid,n2.brandSid)
                    return n1.brandSid - n2.brandSid;
                 })
                 for(let j=0;j<20;j++){
                     $items.eq(j).attr('src',$arrData[j].proPictDir)
                     $ps.eq(j).html($arrData[j].brandNameEn)
                     $gn.eq(j).html($arrData[j].productName)
                     $spans.eq(j).html('￥'+$arrData[j].brandSid)
                 }
            }
            
        }
        

    for(let i=0;i<data.data.brands.length;i++){
        var rel=/\d*\@*/g;
        $brand.next().children().eq(i).html(data.data.brands[i].replace(rel,''))
    }

    for(let i=0;i<data.data.categorys.length;i++){
        var rel=/\d*\@*/g;
        $cate.next().children().eq(i).html(data.data.categorys[i].replace(rel,''))
    }

    for(let i=0;i<data.data.deliveryRegions.length;i++){
        $add.next().children().eq(i).html(data.data.deliveryRegions[i])
    }

    for(let i=0;i<data.data.prices.length;i++){
        $pre.next().children().eq(i).html(data.data.prices[i])
    }

    for(let i=0;i<data.data.colors.length;i++){
        $col.next().children().eq(i).html(data.data.colors[i])
    }

    for(let i=0;i<data.data.taglias.length;i++){
        $size.next().children().eq(i).html(data.data.taglias[i])
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


