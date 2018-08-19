$(document).ready(function(){
	"use strict";
	$('.toggleNav').click(function(){
       if($(".toggleNav").hasClass("toggleactive")){
           $('#menu').stop().slideDown();
           $(".toggleNav").removeClass("toggleactive")
       }
        else{
             $('#menu').stop().slideUp();
            $(".toggleNav").addClass("toggleactive")
        }
		
            
       
            $(this).addClass('active');
	});
	$('#menu > ul > li').hover(function(){$('body').css('overflow-x','hidden');}
	,function(){
		$('body').css('overflow-x','inherit');});
	navigation();
	heritageAcc();
	$('.searchClr').click(function(){
		$('.serachField').val('');});
	$('.serchIco a').click(function(){
		$('.serachField').val('');
		$('.serachOuter').slideToggle();
		$('.serachField').focus();var winWid=$(window).width();if(winWid<768){$('#menu').slideUp();}});$(window).resize(function(){var winWid=$(window).width();if(winWid<768){}else{$('#menu, #menu > ul > li > div, .TL-content p').show();herigateTime();}});$(".expandAll").click(function(){$(".acc_content").slideDown();$(".accordion_in").addClass('acc_active');});$(".collapseAll").click(function(){$(".acc_content").slideUp();$(".accordion_in").removeClass('acc_active');});$(window).resize(function(){var conWid=$(".page-container").width();$(".TL-nav").width(conWid);});herigateTime();function herigateTime(){if($("#heritage-TL").length){var HeritageTLNav=Math.round($("#heritage-TL").offset().top),tomorrowOff=Math.round($("#1996 p").offset().top);$(window).scroll(function(){if($(window).scrollTop()>HeritageTLNav&&$(window).scrollTop()<tomorrowOff){var conWid=$(".page-container").width();$(".TL-nav").width(conWid);$(".TL-nav").addClass("sticky");$('.TL').css({'padding-top':'65px'});}else{$('.TL').css({'padding-top':'0'});$(".TL-nav").removeClass("sticky");}});}}$(".TL-nav ul li a").click(function(){var targethash=$(this).attr("href"),scrollToPos=Math.round($(targethash).offset().top)-65;$('html,body').animate({scrollTop:scrollToPos},400);return false;});var new_width=$('.container').width();$('.sticky').width(new_width);var aChildren=$(".TL-nav ul li").children(),aArray=[];for(var i=0;i<aChildren.length;i++){var aChild=aChildren[i];var ahref=$(aChild).attr('href');aArray.push(ahref);}$(window).scroll(function(){var windowPos=$(window).scrollTop();var windowHeight=$(window).height();var docHeight=$(document).height();for(var i=0;i<aArray.length;i++){var theID=aArray[i];var divPos=Math.round($(theID).offset().top)-65;var divHeight=$(theID).outerHeight();var newString=theID.substr(1);if(windowPos>=divPos&&windowPos<(divPos+divHeight)){$(".TL-nav ul li a[href='"+theID+"']").addClass("nav-active");$('#'+newString).addClass('active');}else{$(".TL-nav ul li a[href='"+theID+"']").removeClass("nav-active");$('#'+newString).removeClass('active');}}});});function navigation(){$('#menu > ul > li > a').click(function(e){var winWid=$(window).width();if(winWid<768){$('#menu > ul > li > a').removeClass('active');$(this).addClass('active');var subNav=$(this).next('div');if(subNav.is(':visible')){$('#menu > ul > li > a').removeClass('active');subNav.slideUp('normal');}else{$('#menu > ul > li > div:visible').slideUp('normal');subNav.slideDown('normal');}}});}function heritageAcc(){$('.TL-content h3').click(function(e){var winWid=$(window).width();if(winWid<768){$('.TL-content h3').removeClass('active');$(this).addClass('active');var accCon=$(this).next('p');if(accCon.is(':visible')){$('.TL-content h3').removeClass('active');accCon.slideUp('normal');}else{$('.TL-content p:visible').slideUp('normal');accCon.slideDown('normal');setTimeout(function(){$('html, body').animate({scrollTop:$(accCon).offset().top-49},'slow');},500);}}});}



		jQuery(document).ready(function() {
			jQuery("#libre-video-button1,#libre-video-button2").click(function() {
				jQuery('#videoModal1').modal({
					show: true
				});
				jQuery('#video1').get(0).play();
			});

			jQuery("#libre-pro-video-button1,#libre-pro-video-button2").click(function() {
				jQuery('#videoModal2').modal({
					show: true
				});
				jQuery('#video2').get(0).play();
			});

			jQuery("#libre-combine-video-button1,#libre-combine-video-button2").click(function() {
				jQuery('#videoModal3').modal({
					show: true
				});
				jQuery('#video3').get(0).play();
			});

			jQuery('#videoModal1').on('hidden.bs.modal', function() {
				jQuery('#video1').get(0).pause();
			});

			jQuery('#videoModal2').on('hidden.bs.modal', function() {
				jQuery('#video2').get(0).pause();
			});

			jQuery('#videoModal3').on('hidden.bs.modal', function() {
				jQuery('#video3').get(0).pause();
			});


			// Form validation //
			$(document).ready(function() {
				$('.thanks').hide();
				$("#register").validate({

					showErrors: function(errorMap, errorList) {
						// Clean up any tooltips for valid elements
						$.each(this.validElements(), function(index, element) {
							var $element = $(element);
							$element.data("title", "") // Clear the title - there is no error associated anymore
								.removeClass("error")
								.tooltip("destroy");
						});
						// Create new tooltips for invalid elements
						$.each(errorList, function(index, error) {
							var $element = $(error.element);
							$element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
								.data("title", error.message)
								.addClass("error")
								.tooltip(); // Create a new tooltip based on the error messsage we just set in the title
						});
					},
					submitHandler: function(form) {
						$("#ajaxMain").show();
						$.ajax({
							type: "POST",
							url: "//diabetesfrontier.us15.list-manage.com/subscribe/post?u=bbf89b7fb48d2ab31388ba9e2&amp;id=f20cd30b72",

							data: {
								LNAME: $('#lname').val(),
								FNAME: $('#fname').val(),
								AGE: $('#age').val(),
								EMAIL: $('#email').val(),
								PHONE: $('#phone').val(),
								INSULIN: $('.radioUser').val(),
								DIABETYP: $('#dType').val()
							},
							success: function(response) {

							},
							error: function(err) {
								console.log(err);
								$('.thanks').show();
								$('.form-view').hide();
								$('#register')[0].reset();
								// $(".agrBox > div").removeClass("active");
								$("#ajaxMain").hide();
							}
						});
					}
				});
			});
			jQuery("#tar").click(function() {
				$("#yes").val("Yes");
				$("#no").val("No");
			});
			jQuery("#tar2").click(function() {
				$("#yes").val("Yes");
				$("#no").val("No");
			});

			jQuery('.close-reveal-modal').click(function() {
				$('.thanks').hide();
				$('.form-view').show();
			});

		});

		$(window).load(function() {
			var t;
			var start = $('#carousel-home').find('.active').attr('data-interval');
			t = setTimeout("$('#carousel-home').carousel({interval: 1000});", start - 1000);

			$('#carousel-home').on('slid.bs.carousel', function() {
				clearTimeout(t);
				var duration = $(this).find('.active').attr('data-interval');

				$('#carousel-home').carousel('pause');
				t = setTimeout("$('#carousel-home').carousel();", duration - 1000);
			})

			$('.custom-control.right').on('click', function() {
				clearTimeout(t);
			});

			$('.custom-control.left').on('click', function() {
				clearTimeout(t);
			});
		});
