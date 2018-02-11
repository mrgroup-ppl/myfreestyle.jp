jQuery(document).ready(function() {
	revealFunctionality();

	jQuery('.close-reveal-modal').click(function(){
		jQuery('.reveal_click').removeClass('active');
		jQuery('.create-assets-div').removeClass('active');

	});

});


function revealFunctionality(){

/*--------------------------------------
 Defaults for Reveal
----------------------------------------*/

/*--------------------------------------
 Listener for data-reveal-id attributes
---------------------------------------*/
	jQuery('.reveal_click').unbind();
	jQuery('a.reveal_click').click(function(e) {

		//e.preventDefault();
		var modalLocation = jQuery(this).attr('data-reveal-class');
		jQuery('.'+modalLocation).reveal(jQuery(this).data());

		//Form validation for Download popup
		var ctrl=0;
		jQuery('.gtVCB').click(function(){

			if(ctrl==0)
			{
				ctrl=1;

				_downloadTrackingSoft();

			}
			setTimeout(function(){
				ctrl=0;
			},1500);
		})

		jQuery('.fname').keyup(function(){
			jQuery(this).next('span.err').text('');
		})
		jQuery('.lname').keyup(function(){
			jQuery(this).next('span.err').text('');
		})
		jQuery('.email').keyup(function(){
			jQuery(this).next('span.err').text('');
		})
		jQuery('.agrBox').click(function(){
			jQuery('.Aggerr').text('');
		})

		jQuery('.col-view .cbox').click(function(){

			if(jQuery(this).children('div').hasClass('active')){
				jQuery(this).children('div').removeClass('active');
			}else{
				jQuery(this).children('div').addClass('active');
			}
		})

		//Radio Box
		jQuery('.radio-box-view .radio-box').bind('click', function(){
			jQuery(this).children('.tar').addClass('active');
			jQuery(this).siblings('div').children('.tar').removeClass('active');
		})

	});

/*---------------------------
 Extend and Execute
----------------------------*/

    jQuery.fn.reveal = function(options) {


        var defaults = {
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
    	};

        //Extend dem' options
        var options = jQuery.extend({}, defaults, options);

        return this.each(function() {

/*---------------------------
 Global Variables
----------------------------*/
        	var modal = jQuery(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = jQuery('.reveal-modal-bg');

/*---------------------------
 Create Modal BG
----------------------------*/

			if(modalBG.length == 0) {
				modalBG = jQuery('<div class="reveal-modal-bg" />').insertAfter(modal);
			}


/*---------------------------
 Open & Close Animations
----------------------------*/
			//Entrance Animations
			modal.bind('reveal:open', function () {
			  modalBG.unbind('click.modalEvent');
				jQuery('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {

						modal.css({'top': jQuery(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": jQuery(document).scrollTop()+topMeasure + 'px',
							"opacity" : 1
						}, options.animationspeed,unlockModal());
					}
					if(options.animation == "fade") {
						var lef = jQuery(window).width()-modal.width();
						lef = lef/2;
						modal.css({'opacity' : 0, 'visibility' : 'visible', 'margin-left':lef, 'top': jQuery(window).scrollTop()+50/*topMeasure*/});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());
						jQuery(window).resize(function(){
							var lef = jQuery(window).width()-modal.width();
							lef = lef/2;
							modal.css({'margin-left':lef,});

						})
						if(options.Tag)
						{
							var Tag = options.Tag;
							if(Tag==11)
							{
								_fbPageList();
							}
							else if(Tag==12)
							{
								var data = options.Channels;
								//alert(data[0].result.items[0].id);
								//alert(data.id);
								_listYtChannels(data);
                                //console.log(options.Channels.items[0].id);
                               // alert(options.Channels.items[0].id);
							//	alert(options.Channels.items[0].snippet.title);

							}
						}
					}
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible','display' : 'block', 'top':jQuery(document).scrollTop()+topMeasure});
						modalBG.css({"display":"block"});
						unlockModal()
					}
				}
				modal.unbind('reveal:open');
			});

			//Closing Animation
			modal.bind('reveal:close', function () {

			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  jQuery(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden','display' : 'none'});
							unlockModal();
						});

					}
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
							unlockModal();
						});
					}
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});
					}
				}
				modal.unbind('reveal:close');

			});

/*---------------------------
 Open and add Closing Listeners
----------------------------*/
        //Open Modal Immediately
    	modal.trigger('reveal:open')

			//Close Modal Listeners
			var closeButton = jQuery('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
			  modal.trigger('reveal:close')
			});

			if(options.closeonbackgroundclick) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
					//modal.trigger('reveal:close')
					// Remove active class from create assets button on close of pop up
					//jQuery('.reveal_click').removeClass('active');
					//jQuery('.create-assets-div').removeClass('active');

				});
			}
			jQuery('body').keyup(function(e) {
        		if(e.which===27){
					//alert(jQuery("#esc").val());
					if(jQuery("#esc").val()==0)
					{
						modal.trigger('reveal:close');  // 27 is the keycode for the Escape key
					}
				}

			});


/*---------------------------
 Animations Locks
----------------------------*/
			function unlockModal() {
				locked = false;
			}
			function lockModal() {
				locked = true;
			}

        });//each call



    }//orbit plugin call
}



function _downloadTrackingSoft(){
	var fname = jQuery.trim(jQuery('.fname').val());
	var lname = jQuery.trim(jQuery('.lname').val());
	var email = jQuery.trim(jQuery('.email').val());
	var phone = jQuery.trim(jQuery('.phone').val());
	var age = jQuery.trim(jQuery('.age').val());
	var device_id = jQuery('.deviceId').val();
	var insulin_user=0;
	jQuery('.insulinUser .radio-box').each(function(){
		if(jQuery(this).children('.tar').hasClass('active')){
			insulin_user = jQuery(this).children('.active').attr('tp');
		}
	})

	if(_downloadTrackingSoftValidation()){
		jQuery.ajax({
			url:'api/api.php',
			type:'post',
			data:'q=regForUpdate&device_id='+device_id+'&first_name='+fname+'&last_name='+lname+'&age='+age+'&email='+email+'&mobile_no='+phone+'&insulian_user='+insulin_user,
			dataType:'json',
			success: function(data){

				if(data.res==1){
					window.open('https://freestyleserver.com/distribution/fxaa20.aspx?product=aaneo_12_w1&version=1.2&os=win&region=ous&language=xx_yy','_blank');
					jQuery('.close-reveal-modal').click();
				}
			}

		})
	}

}

function _downloadTrackingSoftValidation(){
	var cnt=0

	var fname = jQuery.trim(jQuery('.fname').val());
	var lname = jQuery.trim(jQuery('.lname').val());
	var email = jQuery.trim(jQuery('.email').val());
	if(!fname || fname=="First Name"){
		jQuery('.fname').next('span.err').text("Please enter your first name");
		cnt++;
	}
	if(!lname || lname=="Last Name"){
		jQuery('.lname').next('span.err').text("Please enter your last name");
		cnt++;
	}
	if(!email || email=="Email"){
		jQuery('.email').next('span.err').text("Please enter your email address");
		cnt++;
	}else if(!isValidEmailAddress(email)){
		jQuery('.email').next('span.err').text("Please enter your valid email address");
		cnt++;
	}
	if(!jQuery('.agrBox').children('div').hasClass('active')){
		jQuery('span.Aggerr').text("Please accept aggrement");
		cnt++;
	}

	if(cnt==0){
		return true;
	}else{
		return false;
	}
}

 function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
        return pattern.test(emailAddress);
    };
