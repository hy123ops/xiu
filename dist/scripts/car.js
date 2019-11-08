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

/* 购物车 */
window.onload = function () {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var table = document.getElementById('cartTable'); // 购物车表格
    var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
    var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
    var tr = table.children[1].rows; //行
    var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
    var priceTotal = document.getElementById('priceTotal'); //总计
    var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
    var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
    var selected = document.getElementById('selected'); //已选商品
    var foot = document.getElementById('foot');
    
    // 更新总数和总价格，已选浮层
    function getTotal() {
		var seleted = 0;
		var price = 0;
		var HTMLstr = '';
		for (var i = 0, len = tr.length; i < len; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) {
				tr[i].className = 'on';
				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML);
				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
			}
			else {
				tr[i].className = '';
			}
		}
	
		selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2);
		selectedViewList.innerHTML = HTMLstr;
	
		if (seleted == 0) {
			foot.className = 'foot';
		}
	}

    // 计算单行价格
    function getSubtotal(tr) {
        var cells = tr.cells;
        var price = cells[2]; //单价
        var subtotal = cells[4]; //小计td
        var countInput = tr.getElementsByTagName('input')[1]; //数目input
        var span = tr.getElementsByTagName('span')[1]; //-号
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
        //如果数目只有一个，把-号去掉
        if (countInput.value == 1) {
            span.innerHTML= '';
        }else{
            span.innerHTML = '-';
        }
    }

    // 点击选择框
    for(var i = 0; i < selectInputs.length; i++ ){
        selectInputs[i].onclick = function () {
            if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;
                }
            }
            if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                for (var i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false;
                }
            }
            getTotal();//选完更新总计
        }
    }

    // 显示已选商品弹层
    selected.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
        }
    }

    //已选商品弹层中的取消选择按钮
    selectedViewList.onclick = function (e) {
        var e = e || window.event;
        var el = e.srcElement;
        if (el.className=='del') {
            var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
            input.checked = false;
            input.onclick();
        }
    }

    //为每行元素添加事件
    for (var i = 0; i < tr.length; i++) {
        //将点击事件绑定到tr元素
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
            var cls = el.className; //触发元素的class
            var countInout = this.getElementsByTagName('input')[1]; // 数目input
            var value = parseInt(countInout.value); //数目
            //通过判断触发元素的class确定用户点击了哪个元素
            switch (cls) {
                case 'add': //点击了加号
                    countInout.value = value + 1;
                    getSubtotal(this);
                    break;
                case 'reduce': //点击了减号
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'delete': //点击了删除
                    var conf = confirm('确定删除此商品吗？');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }
                    break;
            }
            getTotal();
        }
        // 给数目输入框绑定keyup事件
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value != val) {
                this.value = val;
            }
            getSubtotal(this.parentNode.parentNode); //更新小计
            getTotal(); //更新总数
        }
    }

    // 点击全部删除
    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            var con = confirm('确定删除所选商品吗？'); //弹出确认框
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    // 如果被选中，就删除相应的行
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                        i--; //回退下标位置
                    }
                }
            }
        } else {
            alert('请选择商品！');
        }
        getTotal(); //更新总数
    }

    // 默认全选
    checkAllInputs[0].checked = false;
    checkAllInputs[0].onclick();
}



  
/* 加入购物车 */
var $cookielmy=document.cookie;
var dataArr={};
var index=0;
for(let i=0;i<100;i++)
{
    
    if($.cookie(i+""))
    {
        console.log($.cookie(i+""));
        
        dataArr[index]=[];
        dataArr[index]=([]).concat($.cookie(i+"").split(","));
        index++;
    }
}      
//console.log(dataArr);

        var arr = Object.keys(dataArr); 
        console.log(dataArr)
    for(let i=0;i<arr.length;i++)
    {
        var a=`<tr index="${dataArr[i][4]}"}">
        <td class="checkbox"><input class="check-one check" type="checkbox"/></td>
        <td class="goods"><img src="${dataArr[i][3]}"/><span>${dataArr[i][0]}</span></td>
        <td class="price">${dataArr[i][1]}</td>
        <td class="count"><span class="reduce"></span><input class="count-input" type="text" value="${dataArr[i][2]}"/><span class="add">+</span></td>
        <td class="subtotal">${dataArr[i][1]*dataArr[i][2]}元</td>
        <td class="operation"><span class="delete">删除</span></td>
        </tr>`
        
        $('tbody').append(a)
    }
    
  
    $('.delete').click(function(){
        $(this).parent().parent().remove()
        //$.cookie("token", { expires: -1 })
        //$.removeCookie($(this).parent().parent().attr('index')+"",{path:"/pages" });
        //delete dataArr[$(this).parent().parent().attr('index')]
        console.log($(this).parent().parent().attr('index'));
        
        $.cookie($(this).parent().parent().attr('index')+"",'',{ expires: -1,path:"/pages" });
        // console.log( $.cookie($(this).parent().parent().attr('index')))

    })