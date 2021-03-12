$(document).ready(function () {
    if ($('.team__list')) {
        function initMobileCarousel() {
            var checkWidth = $(window).width();
            var owlCarousel = $(".team__list");
            if (checkWidth > 767) {
                if (typeof owlCarousel.data('owl.carousel') != 'undefined') {
                    owlCarousel.data('owl.carousel').destroy();
                }
                owlCarousel.removeClass('owl-carousel');
            } else if (checkWidth < 768) {
                owlCarousel.addClass('owl-carousel');
                owlCarousel.owlCarousel({
                    items: 1,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    dots: true,
                    loop: true
                });
            }
        }

        initMobileCarousel();
        $(window).resize(initMobileCarousel);
    }

    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map");
    }
});