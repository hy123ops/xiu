var Dimg = document.querySelector('#Dimg');
var sbox = document.querySelector('#sbox');
var imgBox = document.querySelector('#imgBox');
var imgBoxImg = imgBox.querySelector('img');

Dimg.onmouseover = function(){
    sbox.style.display = 'block';
    imgBox.style.display = 'block';
};
Dimg.onmouseout = function(){
    sbox.style.display = 'none';
    imgBox.style.display = 'none';
};
Dimg.onmousemove = function(ev){

    var L = ev.pageX - Dimg.offsetLeft - sbox.offsetWidth*1.5;
    var T = ev.pageY - Dimg.offsetTop - sbox.offsetHeight*1.5;

    if(L < 0){
        L = 0;
    }
    else if( L > Dimg.offsetWidth - sbox.offsetWidth ){
        L = Dimg.offsetWidth - sbox.offsetWidth;
    }

    if(T < 0){
        T = 0;
    }
    else if( T > Dimg.offsetHeight - sbox.offsetHeight ){
        T = Dimg.offsetHeight - sbox.offsetHeight;
    }

    sbox.style.left = L  + 'px';
    sbox.style.top = T  + 'px';

    var scaleX = L / (Dimg.offsetWidth - sbox.offsetWidth);
    var scaleY = T / ( Dimg.offsetHeight - sbox.offsetHeight);

    imgBoxImg.style.left = - scaleX * ( imgBoxImg.offsetWidth - imgBox.offsetWidth ) + 'px';
    imgBoxImg.style.top = - scaleY * ( imgBoxImg.offsetHeight - imgBox.offsetHeight ) + 'px';
};