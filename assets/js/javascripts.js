var headerHeight;

function mobileMenuAdjust()
{
    var windowHeight = $(window).outerHeight();
    if ($('header.mobile').length > 0)
    {
        var headerHeight = $('header nav').outerHeight();
        $('header.mobile .menu').css('max-height', (windowHeight - headerHeight) + 'px');
    }
}

$(document).ready(function () {

    /**
     * Document user-agent
     */

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    /**
     * jQuery dotdotdot
     */

    if ($('.dotdotdot').length > 0)
    {
        $('.dotdotdot').dotdotdot({
            watch: "window"
        });
    }

    /**
     * jQuery FitText
     */

    if ($('header.mobile a.current').length > 0)
    {
        // $( 'header.mobile a.current' ).fitText();
    }

    if ($('.page-header').length > 0)
    {
        $('.page-header h1, .page-header h2, .page-header h3').fitText(2, {minFontSize: '24px'});
        $('.page-header p').dotdotdot();
    }

    /**
     * Disable static links on click
     */

    if ($('a[href="#"]').length > 0)
    {
        $('a[href="#"]').click(function () {
            return false;
        });
    }

    /**
     * Header Mobile Menu
     */

    mobileMenuAdjust();

    if ($('header.mobile').length > 0)
    {
        $('header.mobile a.nav-toggle').click(function (e) {
            $('header.mobile .menu').stop().slideToggle('fast');
            e.preventDefault();
            return false;
        });
    }

    /**
     * Header Compact Toggle
     */

    if ($("header:not(.mobile) nav > ul > li.compact-only > a").length > 0)
    {
        $("header:not(.mobile) nav > ul > li.compact-only > a").click(function () {

            // console.log( $( this ).attr( 'class' ) );

            if (!$(this).hasClass('btn-toggle-login'))
            {
                $("header:not(.mobile)").toggleClass('compact');
            }

            var attr = '';
            if ($(this).attr('data-focus') != undefined)
            {
                // console.log( $( this ).attr( 'data-focus' ) );
                var attr = $(this).attr('data-focus');
                if ($('header ' + attr).length > 0)
                {
                    $('header ' + attr).focus();
                }
            }

            return false;
        });
    }

    if ($('header a.toggle-compact').length > 0)
    {
        $('header a.toggle-compact').click(function () {
            $('header').toggleClass('compact');
            return false;
        });
    }


    /**
     * Bootstrap Select
     * http://silviomoreto.github.io/bootstrap-select/
     */

    if ($('.selectpicker').length > 0)
    {
        $('.selectpicker').selectpicker({
            // Options
        });
    }

    /**
     * Bootstrap Select slideDown
     * http://codepen.io/danielyewright/pen/EvckL
     */
    $('header .bootstrap-select').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    });

    // Add slideUp animation to dropdown
    $('header .bootstrap-select').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });

    /**
     * Sign-up form wizard
     */

    var su_form_count = 0;

    if ($('section#form-signup div[id^="form"]').length > 0)
    {
        su_form_count = $('section#form-signup div[id^="form"]').length;
    }

    if ($('#form-steps').length > 0)
    {
        $('#form-steps a.form-steps-item').each(function (index, value) {
            $(this).on('click', function () {
                var href, currentEl, currentId, targetEl;

                href = $(this).attr('href');

                if ($('section#form-signup div[id^="form"].active').length > 0)
                {
                    currentEl = $('section#form-signup div[id^="form"].active');
                    currentId = currentEl.attr('id');
                    $('#form-steps a.form-steps-item').removeClass('active');
                    $(this).addClass('active');
                    if ($('section#form-signup div' + href).length > 0)
                    {
                        targetEl = $('section#form-signup div' + href);

                        currentEl.stop().fadeOut('fast', function () {
                            $(this).removeClass('active');
                            targetEl.fadeIn('fast', function () {
                                $(this).addClass('active');
                            });
                        });

                    }

                }

                return false;
            });
        });
    }

    if (($('a.form-step-next').length > 0) && ($('a.form-step-prev').length > 0))
    {
        $('a.form-step-next, a.form-step-prev').click(function () {

            var href = $(this).attr('href');
            var currentEl = $('section#form-signup div[id^="form"].active');
            var currentId = currentEl.attr('id');

            $('#form-steps a.form-steps-item').removeClass('active');
            $('#form-steps a.form-steps-item[href*="' + href + '"]').addClass('active');

            if ($('section#form-signup div' + href).length > 0)
            {
                targetEl = $('section#form-signup div' + href);
                currentEl.stop().fadeOut('fast', function () {
                    $(this).removeClass('active');
                    targetEl.fadeIn('fast', function () {
                        $(this).addClass('active');
                    });
                });
            }

            return false;
        });
    }

    /**
     * Journal News Slider
     */

    if ($('.news-slider').length > 0)
    {
        var controlIndex = 0;
        var newsItem = $('.news-slider > .news-container > .news-item');
        var newsItemCount = newsItem.length;
        var newsControl = $('.news-slider > .news-control > li');

        if ($('.news-slider > .news-control').length > 0)
        {
            $('.news-slider > .news-control > li > a').click(function () {
                controlIndex = $(this).parent().index();
                newsItem = $(this).parent().parent().parent().find('.news-container');

                newsItem.find('.news-item.active').fadeOut('fast', function () {
                    $(this).removeClass('active');
                    newsItem.find('.news-item:nth-child(' + (controlIndex + 1) + ')').fadeIn('fast', function () {
                        $(this).addClass('active');
                    });
                });

                newsControl.removeClass('active');
                $(this).parent().addClass('active');

                return false;
            });
        }
    }

    /**
     * FAQ section
     */

    if ($('section.faq').length > 0)
    {
        $('section.faq .faq-questions > ul > li > a').each(function (index, value) {
            $(this).click(function () {
                var href = $(this).attr('href');
                $('section.faq .faq-answers .item, section.faq .faq-questions > ul > li').removeClass('active');
                $(this).parent().addClass('active');
                $('section.faq .faq-answers .item' + href).addClass('active');

                /* Check for video boxes */
                if ($('section.faq .faq-answers .item' + href + ' video').length > 0)
                {
                    $('section.faq .faq-answers .item:not(' + href + ') video').each(function (index, value) {
                        $(this).get(0).pause();
                    });
                }

                return false;
            });
        });
    }

    /**
     * Benefits Section
     */

    if ($('.product-benefits').length > 0)
    {
        $('.product-benefits .category ul > li > a').each(function (index, value) {
            $(this).click(function () {
                var href = $(this).attr('href');
                $('.product-benefits .category ul > li').removeClass('active');
                $(this).parent().addClass('active');
                $('.product-benefits .content .citem.active').stop().fadeOut('fast', function () {
                    $('.product-benefits .content .citem').removeClass('active');
                    $('.product-benefits .content .citem' + href).stop().fadeIn('fast', function () {
                        $(this).addClass('active');
                    });
                });
                return false;
            });
        });
    }

    /**
     * Slim Scroll
     */

    if ($('.has-slimscroll').length > 0)
    {
        $('.has-slimscroll').slimScroll({
            alwaysVisible: true,
            height: 'auto'
        });
    }

    /**
     * Product Detail Section Navigation
     */

    if ($('ul.page-nav').length > 0)
    {
        $('ul.page-nav > li > a').click(function () {

            // for non-select all icon
            $('ul.page-nav > li > a > img').each(function (index, value) {
                console.log(value.parentElement.parentElement);
                if (value.src.search("-hover.png") > 0) {
                    value.src = value.src.replace('-hover.png', '.png');
                }
            });
            // end

            // pause  all video in 'FAQ Video' section
            if ($('#how-to-use').length > 0)
            {
                $('#how-to-use video').each(function (index, value) {
                    $(this).get(0).pause();
                });
            }

            var href = $(this).attr('href');
            var target = $(href);
            var targetPos = target.offset().top;
            $('ul.page-nav > li').removeClass('active');
            $(this).parent().addClass('active');
            $('.product-element').stop().fadeOut('fast', function () {
                $(this).removeClass('active');
                $('.product-element' + href).stop().fadeIn('fast', function () {
                    $(this).addClass('active');

                    if ($('.product-element' + href + ' .has-slimscroll').length > 0){
                        $('.product-element' + href + ' .has-slimscroll').slimScroll({
                            alwaysVisible: true,
                            height: 'auto'
                        });
                    }
                });
            });

            // for select active icon
            $('ul.page-nav > li').each(function (index, value) {
                if ($(this).hasClass('active'))
                {
                    var currentImg = $(this).find('img').attr('src');
                    var newImg = currentImg.replace('.png', '-hover.png');
                    $(this).find('img').attr('src', newImg);
                }
            });
            // end

            return false;
        });

        $('ul.page-nav > li > a').hover(
                function ()
                {
                    var currentImg = $(this).find('img').attr('src');
                    if (currentImg.search("-hover") < 1) {
                        var newImg = currentImg.replace('.png', '-hover.png');
                        $(this).find('img').attr('src', newImg);
                    }
                },
                function ()
                {
                    var currentImg = $(this).find('img').attr('src');
                    if (!$(this).parent().hasClass('active')) {
                        var newImg = currentImg.replace('-hover.png', '.png');
                        $(this).find('img').attr('src', newImg);
                    }
                }
        );

        $('ul.page-nav > li').each(function (index, value) {
            if ($(this).hasClass('active'))
            {
                var currentImg = $(this).find('img').attr('src');
                var newImg = currentImg.replace('.png', '-hover.png');
                $(this).find('img').attr('src', newImg);
            }
        });

    }

    /**
     * Product Detail Mobile Navigations
     */

//    if ($('.page-nav-wrapper').length > 0){
//        var swapCurrent = 0;
//        var swapCount = $('.page-nav-wrapper .page-nav li').length;
//        var swapWidth = $('.page-nav-wrapper .page-nav li').outerWidth();
//        var swapWidthTo = swapCount * swapWidth;
//        $('.page-nav-wrapper a.page-nav-control').click(function (e) {
//            if ($(this).hasClass('right'))
//            {
//                if (swapCurrent < (swapCount - 1))
//                {
//                    swapCurrent++;
//                }
//            } else
//            {
//                if (swapCurrent > 0)
//                {
//                    swapCurrent--;
//                }
//            }
//            $('.page-nav-wrapper .page-nav').stop().animate({'left': (-swapCurrent) * swapWidth + 'px'}, 400);
//            e.preventDefault();
//            return false;
//        });
//    }

});

$(window).scroll(function () {

    /**
     * Header minify on scroll
     */

    if ($('header:not(.mobile)').length > 0)
    {
        headerHeight = $('header:not(.mobile)').outerHeight();
    }

    windowScrollTop = $(window).scrollTop();

    // console.log( windowScrollTop + ' / ' + headerHeight );

    if (windowScrollTop >= headerHeight)
    {
        $('header:not(.mobile)').addClass('compact');
    } else
    {
        $('header:not(.mobile)').removeClass('compact');
    }

});

$(window).resize(function () {

    mobileMenuAdjust();

});
