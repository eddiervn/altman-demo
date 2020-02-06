var slideSpeed = 200;
var fadeSpeed = 50;
var scrollTop = 350;

function loadPage() {
    var page = location.hash || 'main';
    document.body.className = '';

    $('.nav-links-list > li > a.active').removeClass('active');
    $('.nav-links-list > li > a[href$="' + decodeURI(page) + '"]').addClass('active');

    $('#page').load('pages/' + page.replace('#', '') + '.html', function () {
        var theme = $('.topic').data('theme');
        if (theme) 
            document.body.className = 'body-theme body-theme-' + theme;
    });
    if ($('.nav-menu').hasClass('expanded')) {
        $('.menuLink').trigger('click');
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------

function setImageGallery() {
    $('.image-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeMarkup: '<button title="סגור" type="button" class="mfp-close">&#215;</button>',
        gallery: {
            enabled: true,
            tCounter: '<span class="mfp-counter">%curr% מתוך %total%</span>',
            tPrev: 'קודם',
            tNext: 'הבא'
        },
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below

        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
}

// -----------------------------------------------------------------------------------------------------------------------------------

$(function () {
    	
    $(window).on('hashchange', loadPage);

	var toggle = function (currentTitle) {
        currentTitle.next(".content-box-content-main").slideToggle(slideSpeed, function () {
            $(this).prev(".content-box-content-title")
                .toggleClass("content-box-content-title-open")
                .removeClass("content-box-content-title-loading");
        });
    }

	$(document).on('click','.content-box-content-title',function (e) {
        e.preventDefault();
        currentContent = $(this).next("div.content-box-content-main");
        currentTitle = $(this);

        toggle(currentTitle);
        return;
    });

  
    $(window).scroll(function () {
        if ($(window).scrollTop() > scrollTop) {
            $(".back-to-top").fadeIn(fadeSpeed);
        }
        else
            $(".back-to-top").fadeOut(fadeSpeed);

    });

    $(".back-to-top").hide().click(function () {
        $('html, body').animate({ scrollTop: 0 }, slideSpeed);
    });

    $('.menuLink').click(function (e) {
        $('.nav-menu').toggleClass('expanded');
        $(this).toggleClass('menu-link-open');
        e.preventDefault();
    });

    // $('.lt-thumbnail').lightGallery({ thumbnail: true });
    // $('#year').text(new Date().getFullYear());
    loadPage();
});

