$(document).ready(function () {

	"use strict";

	// Open Main Navigation

	// $('.toggleNav').click(function () {

	// 	$('#menu').slideToggle();

	// 	$(this).toggleClass('active');

	// });

	// on hover on navigation apply overflow to body

	$('#menu > ul > li').hover(function () {

		$('body').css('overflow-x', 'hidden');

	}, function () {

		$('body').css('overflow-x', 'inherit');

	});

	// Call function for Sub Navigation

	navigation();

	// Call function for Heritage Accordion

	heritageAcc();

	// Clear Search value

	$('.searchClr').click(function () {

		$('.serachField').val('');

	});

	// Open Search Bar

	$('.serchIco a').click(function () {

		$('.serachField').val('');

		$('.serachOuter').slideToggle();

		$('.serachField').focus();

		var winWid = $(window).width();

		if (winWid < 768) {

			$('#menu').slideUp();

		}

	});

	/*$('#menu > ul > li > a, .toggleNav').mouseenter(function () {

		setTimeout(function () {

			$('.serachOuter').slideUp();

		}, 500);

	});*/

	// Open Sub Navigation on window resize

	$(window).resize(function () {

		var winWid = $(window).width();

		if (winWid < 768) {

			//$('#menu, #menu > ul > li > div, .TL-content p').hide();

			//$('.toggleNav').removeClass('active');

		} else {

			$('#menu, #menu > ul > li > div, .TL-content p').show();

			herigateTime();

		}

	});

	// SMK Accordion - NewsRoom

	$(".accordion_example2, .accordion_example3").smk_Accordion({

		closeAble : true

	});

	$(".expandAll").click(function() {

        $(".acc_content").slideDown();

        $(".accordion_in").addClass('acc_active');

    });

    $(".collapseAll").click(function() {

        $(".acc_content").slideUp();

        $(".accordion_in").removeClass('acc_active');

    });

	$(window).resize(function () {

		var conWid = $(".page-container").width();

		$(".TL-nav").width(conWid);

	});

	herigateTime();

	// Heritage Timeline

	function herigateTime() {

		if ($("#heritage-TL").length) {

			var HeritageTLNav = Math.round($("#heritage-TL").offset().top),

				tomorrowOff = Math.round($("#1996 p").offset().top);

			$(window).scroll(function () {

				if ($(window).scrollTop() > HeritageTLNav && $(window).scrollTop() < tomorrowOff) {

					var conWid = $(".page-container").width();

					$(".TL-nav").width(conWid);

					$(".TL-nav").addClass("sticky");

					$('.TL').css({'padding-top' : '65px'});

				} else {

					$('.TL').css({

						'padding-top' : '0'

					});

					$(".TL-nav").removeClass("sticky");

				}

			});

		}

	}

	$(".TL-nav ul li a").click(function () {

		var targethash = $(this).attr("href"),

			scrollToPos = Math.round($(targethash).offset().top) - 65;

		//console.log(scrollToPos)

		$('html,body').animate({

			scrollTop : scrollToPos

		}, 400);

		return false;

	});

	var new_width = $('.container').width();

	$('.sticky').width(new_width);

	/* This part handles the highlighting functionality. We use the scroll functionality again, some array creation and manipulation, class adding and class removing, and conditional testing */

	var aChildren = $(".TL-nav ul li").children(), // find the a children of the list items

		aArray = []; // create the empty aArray

	for (var i = 0; i < aChildren.length; i++) {

		var aChild = aChildren[i];

		var ahref = $(aChild).attr('href');

		aArray.push(ahref);

	} // this for loop fills the aArray with attribute href values

	$(window).scroll(function () {

		var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page

		var windowHeight = $(window).height(); // get the height of the window

		var docHeight = $(document).height();

		for (var i = 0; i < aArray.length; i++) {

			var theID = aArray[i];

			var divPos = Math.round($(theID).offset().top) - 65; // get the offset of the div from the top of page

			var divHeight = $(theID).outerHeight(); // get the height of the div in question

			var newString = theID.substr(1);

			if (windowPos >= divPos && windowPos < (divPos + divHeight)) {

				$(".TL-nav ul li a[href='" + theID + "']").addClass("nav-active");

				$('#' + newString).addClass('active');

			} else {

				$(".TL-nav ul li a[href='" + theID + "']").removeClass("nav-active");

				$('#' + newString).removeClass('active');

			}

		}

	});

});

// Sub Navigation

function navigation() {

	$('#menu > ul > li > a').click(function (e) {

		var winWid = $(window).width();

		if (winWid < 768) {

			$('#menu > ul > li > a').removeClass('active');

			$(this).addClass('active');

			var subNav = $(this).next('div');

			if (subNav.is(':visible')) {

				$('#menu > ul > li > a').removeClass('active');

				subNav.slideUp('normal');

			} else {

				$('#menu > ul > li > div:visible').slideUp('normal');

				subNav.slideDown('normal');

			}

		}

	});

}

// Heritage Accordion

function heritageAcc() {

	$('.TL-content h3').click(function (e) {

		var winWid = $(window).width();

		if (winWid < 768) {

			$('.TL-content h3').removeClass('active');

			$(this).addClass('active');

			var accCon = $(this).next('p');

			if (accCon.is(':visible')) {

				$('.TL-content h3').removeClass('active');

				accCon.slideUp('normal');

			} else {

				$('.TL-content p:visible').slideUp('normal');

				accCon.slideDown('normal');

				setTimeout(function () {

					$('html, body').animate({

						scrollTop : $(accCon).offset().top - 49

					}, 'slow');

				}, 500);

			}

		}

	});

}



// Begin Search Implementation for Highlight Keyword

$(function() {

	function searchAndScrollTop(search) {

		if(search.length > 0) {

			$(".highlight").removeClass("highlight");

			if(window.location.href.indexOf("press-room") > -1) {

			   $(".acc_active").highlight(search);

			}

			else {

				$(".acc_active, .region-content-head, .region-content").highlight(search);

			}



			var offset = $(".highlight:first").offset();

			var top = 0;

			if(typeof offset !== 'undefined') {

				top = $(".highlight:first").offset().top - 100;

			}

			var body = $("html, body");

				$(".hlf:first").removeClass("hlf");

				console.info($.cookie("search"));

				body.animate({scrollTop:top}, '500', 'swing', function() {

					$(".highlight:first").addClass("hlf");

					$.removeCookie('search');

				});

		}

	}



	$("#edit-search-block-form--2").keyup(function(e) {

		if(e.keyCode === 13) {

			var search = $(this).val();

			if(search.toString().trim().length >= 3) {

				$.cookie('search', search);

				//searchAndScrollTop(search.toString().trim());

			}

		}

	});



	$(window).keydown(function(event){

		if($('#edit-search-block-form--2').val() == '' && event.keyCode == 13) {

			event.preventDefault();

			return false;

		}

	});



	$(window).load(function(e){

		if($.cookie("search") && $.cookie("search").length >= 3) {

			if(window.location.href.indexOf("search") > 1) {

				var search = $.cookie("search").toString().trim();

				searchAndScrollTop(search);

			}

		}

	});

});

// End Search Implementation for Highlight Keyword
