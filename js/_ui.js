var slideSpeed = 200;
var fadeSpeed = 50;
var scrollTop = 350;

function loadPage() {
    var page = location.hash || 'main';
    document.body.className = '';
    $('#page').load('pages/' + page.replace('#', '') + '.html', function () {
        var theme = $('.topic').data('theme');
        if (theme) 
            document.body.className = 'body-theme body-theme-' + theme;
    });
    if ($('.nav-menu').hasClass('expanded')) {
        $('.menuLink').trigger('click');
    }
}

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

