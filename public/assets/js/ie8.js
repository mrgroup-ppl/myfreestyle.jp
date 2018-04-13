jQuery('ul.page-nav li').click(function(){
  /* var src = jQuery(this).children('a').children('img').attr('src');
   var new_src = src.split('.png');
   jQuery(this).children('a').children('img').attr('src',new_src[0]+'-hover'+'.png');
   jQuery(this).siblings('li').each(function(){
        var ssrc = jQuery(this).children('a').children('img').attr('src');
        var snew_src = src.split('-hover');
            alert(snew_src.length);
         if(snew_src.length>1){
            jQuery(this).children('a').children('img').attr('src',snew_src[0]+'.png');
         }
   });*/
   jQuery(this).addClass('active');
   jQuery(this).siblings('li').removeClass('active');
   var id = jQuery(this).children('a').attr('href');
   jQuery('section'+id).show();
   jQuery('section'+id).siblings('section.product-element').hide();
});

jQuery('.faq-questions ul li').click(function(){
 jQuery(this).addClass('active');
 jQuery(this).siblings('li').removeClass('active');
  var id = jQuery(this).children('a').attr('href');
  jQuery('.faq-answers div'+id).addClass('active');
  jQuery('.faq-answers div'+id).siblings().removeClass('active');
})