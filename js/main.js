$(document).ready(function () {

    let popup = document.getElementsByClassName('popup');
    let popupSuccess = document.getElementsByClassName('popup-success');
    let overlay = document.getElementsByClassName('overlay');

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

    function openCallbackPopup (title) {
        return function () {
            $('.overlay').fadeIn(300);
            setTimeout(function () {
                $('#popup-callback-title-id').val(title);
                $('.popup-callback').fadeIn(300);
            }, 300);
        }
    }

    $('.page-header__button').click(openCallbackPopup('Обратная заявка с шапки'));
    $('.floating-menu__button').click(openCallbackPopup('Обратная заявка с плавающего меню'));
    $('.page-footer__button').click(openCallbackPopup('Обратная заявка с футера'));
    $('.ten__button').click(openCallbackPopup('Заявка с рассрочкой'));
    $('.pick__button').click(openCallbackPopup('Заявка подобрать лучший способ'));
    $('.intro__button--more-500').click(openCallbackPopup('Заявка более 500тыс.'));
    $('.intro__button--less-500').click(openCallbackPopup('Заявка менее 500тыс.'));

    $('.close-btn').click(function () {
        $('.popup').fadeOut(300);
        setTimeout(function () {
            $('.overlay').fadeOut(300);
        }, 300);
    })

    /*popup-callback*/
    let namePopupInput = document.getElementById('popup-callback-name-id');
    let telephonePopupInput = document.getElementById('popup-callback-tel-id');

    $(telephonePopupInput).inputmask("+X (999) 999-9999", {
        definitions: {
            "X": {
                validator: "[7-9]",
            }
        },
        oncomplete: function(){
            $(this).val('+7' + $(this).val().substring(2));
        }
    });

    let popupCallbackForm = $('#popup-callback-form-id');
    popupCallbackForm.submit(function (ev) {
        $.ajax({
            type: popupCallbackForm.attr('method'),
            url: popupCallbackForm.attr('action'),
            data: popupCallbackForm.serialize(),
            success: function (data) {
                $(popup).fadeOut(300);
                setTimeout(function () {
                    $(popupSuccess).fadeIn(300);
                    setTimeout(function () {
                        $(popupSuccess).fadeOut(300);
                        setTimeout(function () {
                            $(overlay).fadeOut(300);
                        }, 300);
                    }, 2000);
                },300);
                $(namePopupInput).val('');
                $(telephonePopupInput).val('');
                ym(73629022,'reachGoal','order')
            }
        });
        ev.preventDefault();
    });
    /*/popup-callback*/

    /*form-attention*/
    let attentionNameInput = document.getElementById('attention-input-name');
    let attentionTelephoneInput = document.getElementById('attention-input-phone');

    $(attentionTelephoneInput).inputmask("+X (999) 999-9999", {
        definitions: {
            "X": {
                validator: "[7-9]",
            }
        },
        oncomplete: function(){
            $(this).val('+7' + $(this).val().substring(2));
        }
    });

    let attentionForm = $('#attention-form-id');
    attentionForm.submit(function (ev) {
        $.ajax({
            type: attentionForm.attr('method'),
            url: attentionForm.attr('action'),
            data: attentionForm.serialize(),
            success: function (data) {
                $(popupSuccess).fadeIn(300);
                setTimeout(function () {
                    $(popupSuccess).fadeOut(300);
                    setTimeout(function () {
                        $(overlay).fadeOut(300);
                    }, 300);
                }, 2000);
                $(attentionNameInput).val('');
                $(attentionTelephoneInput).val('');
                ym(73629022,'reachGoal','order')
            }
        });
        ev.preventDefault();
    });
    /*/form-attention*/

    /*form-question*/
    let questionNameInput = document.getElementById('question-input-name');
    let questionTelephoneInput = document.getElementById('question-input-phone');

    $(questionTelephoneInput).inputmask("+X (999) 999-9999", {
        definitions: {
            "X": {
                validator: "[7-9]",
            }
        },
        oncomplete: function(){
            $(this).val('+7' + $(this).val().substring(2));
        }
    });

    let questionForm = $('#question-form-id');
    questionForm.submit(function (ev) {
        $.ajax({
            type: questionForm.attr('method'),
            url: questionForm.attr('action'),
            data: questionForm.serialize(),
            success: function (data) {
                $(popupSuccess).fadeIn(300);
                setTimeout(function () {
                    $(popupSuccess).fadeOut(300);
                    setTimeout(function () {
                        $(overlay).fadeOut(300);
                    }, 300);
                }, 2000);
                $(questionNameInput).val('');
                $(questionTelephoneInput).val('');
                ym(73629022,'reachGoal','order')
            }
        });
        ev.preventDefault();
    });
    /*/form-question*/
    let casesItem = document.getElementsByClassName('cases__item');
    casesItem = Array.prototype.slice.call(casesItem);
    for (let i = 2; i <= casesItem.length; i++) {
        $(casesItem[i]).addClass('disable');
    }

    let casesShowMore = document.getElementsByClassName('cases__show-more-btn');
    $(casesShowMore).click(function () {
        $(casesItem).removeClass('disable');
        $(casesShowMore).addClass('disable');
    });

    /*всплывающее меню при скролле вниз*/
    /*троттлинг функция*/
    function throttleFloating(func, ms) {

        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;

            setTimeout(function () {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }
    /* */
    var travelMenu = document.getElementsByClassName('floating-menu');

    var hiddenMenuDown = function () {
        if (window.pageYOffset > 100) {
            $(travelMenu).addClass('active');
        } else {
            $(travelMenu).removeClass('active');
        }
    }

    var hiddenMenuDown100 = throttleFloating(hiddenMenuDown, 100);

    $(window).scroll(function () {
        hiddenMenuDown100();
    });
    /* */
});