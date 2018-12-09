/*
    [JS SCRIPTS]

    Template Name: GOX | Coming Soon Template
    Author:  Mehmet Demiray
    Version: 1.0

    ---

    [INDEX]

    1. Smooth Scrolling
    2. Countdown
    3. Slick Carousel
    4. Back-to-top Button
    5. Contact Form  & Validations  
    6. Subscription Form & Validations
    7. Map
	8. Wawe Loading Animation
*/

$(function () {
    "use strict";

    /* 1. Smooth Scrolling */

    $(function () {
        $('.smoth').click(function (oEvent) {
            var id = $(this).attr('href'),
                $target = $(id);
            if ($target.length && $(window).width() < 1025) {
                oEvent.preventDefault();
                $('html,body').animate({
                    scrollTop: $target.offset().top
                }, 'slow');
            } else if ($target.length) {
                oEvent.preventDefault();
                $('#right').animate({
                    scrollTop: $target.offset().top
                }, 'slow')
            }
        });
    });


    /* 2. Countdown */

    $('.countdown').downCount({
        date: '02/16/2019 12:00:00', // Change this time mm/dd/yyyy date
        offset: +10
    }, function () {
        alert('WOOT WOOT, done!'); // Finish Message
    });

    /* 3. Slick Carousel */

    $(document).ready(function () {
        $('.about-gox').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [{
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });

    /* 4. Back-to-top Button */

    var btn = $('#backtoTop');

    window.addEventListener('scroll', function () {
            if ($(window).width() < 1024) {
                if ($(window).scrollTop() > 400) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            } else {
                if ($('#right').scrollTop() > 400) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            }
        },
        true);

    $('#backtoTop').click(function () {
        if ($(window).width() < 1024) {
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        } else {
            $('#right').animate({
                scrollTop: 0
            }, 500);
        }
    });

    /* 5. Contact Form  & Validations */

    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },

            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-exclamation-triangle'></i>Please specify your name.",
            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>We need your email address to contact you.",
                email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact.php",
                success: function () {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function () {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('.successForm').fadeIn();
                    });
                },
                error: function () {
                    $('#contact-form').fadeTo("slow", 0.15, function () {
                        $('.errorForm').fadeIn();
                    });
                    $('#name, #message, #mail').addClass("errorInput");
                }
            });
        }
    });

    /* 6. Subscription Form & Validations */

    var $form = $('#mc-form');

    $('#mc-subscribe').on('click', function (e) {
        if (e)
            e.preventDefault();
        register($form);
    });

    function register($form) {
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (err) {
                $('#mc-notification').html('<span class="alert">Could not connect to server. Please try again later.</span>');
            },
            success: function (data) {
                if (data.result != "success") {
                    var message = data.msg.substring(4);
                    $('#mc-notification').html('<span class="alert alert-warning"><i class="fas fa-exclamation-triangle"></i>' + message + '</span>').fadeIn(1000);
                    $('#mailInput').addClass("errorInput");

                    if ($('#mailInput').hasClass("clearInput")) {
                        $('#mailInput').removeClass("clearInput");
                    }
                } else {
                    var message = data.msg.substring(4);
                    $('#mc-notification').html('<span class="alert alert-success"><i class="fas fa-check"></i>' + 'Awesome! We sent you a confirmation email.' + '</span>').fadeIn(1000);
                    $('#mailInput').addClass("clearInput");

                    if ($('#mailInput').hasClass("errorInput")) {
                        $('#mailInput').removeClass("errorInput");
                    }
                }
            }
        });
    }

    /* 7. Map */

    var coord1 = '41.0227'; // Coordinat - 1
    var coord2 = '28.9733'; // Coordinat - 2
    var popupaddress = 'Taksim/Istanbul'; // Address
    var mapzoom = "11"; // Map Zoom
    /* You can find coordinates very easily. --> www.openstreetmap.org/ */
    var mymap = L.map('map').setView([coord1, coord2], mapzoom);
    mymap.scrollWheelZoom.disable()
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibmVjcm9uYXVnaHQiLCJhIjoiY2puejAwbXdoMGk2dTNxcDlzeHowZnNkaSJ9.JPpx1l6NK_ykoGLsJxmGEg',
        zoomControl: false,
    }).addTo(mymap);
    var markerIcon = L.icon({
        iconUrl: 'dist/img/marker.png',
        iconSize: [75, 75], // size of the icon
        iconAnchor: [30, 56], // point of the icon which will correspond to marker's location
        popupAnchor: [3, -36] // point from which the popup should open relative to the iconAnchor
    });
    L.tileLayer.provider('CartoDB.VoyagerLabelsUnder').addTo(mymap);
    var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {

    });
    L.marker([coord1, coord2], {
        icon: markerIcon,
    }).addTo(mymap).bindPopup(popupaddress);

	/* 8. Wawe Loading Animation */

	var path = document.querySelector('#wave');
	var animation = document.querySelector('#moveTheWave');
	var m = 0.512286623256592433;

	function buildWave(w, h) {
		var a = h / 4;
		var y = h / 2;
		var pathData = ['M', w * 0, y + a / 2, 'c', a * m, 0, -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a, 's', -(1 - a) * m, a, a, a, 's', -(1 - a) * m, -a, a, -a].join(' ');
		path.setAttribute('d', pathData);
	}
	buildWave(90, 60);
	$(window).load(function() {
		$(".loading-page").fadeOut;
		$(".loading-page").delay(100).fadeOut("slow");
	});

});