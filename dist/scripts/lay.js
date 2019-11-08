var pic = document.getElementById('pic-list');
var imgs = pic.getElementsByTagName('img');
    for(var i=0;i<imgs.length;i++){
        imgs[i].flag = true;
    }

    change();
    window.onscroll = change;

    function change(){
        var a = document.documentElement.clientHeight;
        var b = document.documentElement.scrollTop;
        for(var i=0;i<imgs.length;i++){
            var c = imgs[i].offsetTop;
            if( c < a + b && imgs[i].flag ){
                imgs[i].src = imgs[i].dataset.src;
                imgs[i].flag = false;
            }
        }

    }