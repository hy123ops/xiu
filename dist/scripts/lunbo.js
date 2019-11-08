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