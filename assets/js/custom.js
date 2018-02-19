// JavaScript Document
$('.social-view').css({
    'display': 'none'
});
$(window).load(function() {
    $('.social-view').css({
        'display': 'block'
    });
    var tHe = jQuery("#carousel-home").height() + $('.social-view').height() + 170;
    $('.social-view').css({
        'top': tHe
    });

});

function openNav() {
	$("#myNav").slideDown("1000", function() {
		// Animation complete.

	});
}

function closeNav() {
	$("#myNav").slideUp("1000", function() {
		// Animation complete.

	});
}

$(document).ready(function(){


	$('.register').click(function() {
		$('.overlay').slideDown('fast', function() {
			$('.registerOuter').animate({
				'top': '0'
			}, 500);
		});

	});

	$('.closeRegi').click(function() {
		$('.overlay').fadeOut('fast');
	});

	$('#bottom').click(function() {
		$('.overlay').fadeOut('fast');
	});

	// For Terms & Conditions Checkbox

	function showThankYouMsg($form) {
		$form.trigger("reset");
		$('.overlay').slideDown('fast', function() {
			$('.registerOuter').animate({
				'top': '0'
			}, 500);
		});
		$('.registr').hide();
		$('.latest').hide();
		$('#register-form').hide();
		$('.regiCondition').hide();
		$('.thanks').show();
		$('.confrm').show();
		setTimeout(function() {
			window.location.replace("/");
		}, 7000);
	}
})


$(document).ready(function(){

	$('.openModal').on('click',function(e){
		e.preventDefault();
		var $file = $(this).attr('href');
		var $filename = $(this).attr('data-file');
		window.location.href = $file;

		var $type = $(this).attr('data-type');
	});

	$(".modal").on("hidden.bs.modal", function(){

	});
})
