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