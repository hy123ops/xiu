
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


