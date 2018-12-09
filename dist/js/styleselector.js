/* STYLE SELECTOR */
$(document).ready(function () {
    $('.selector-toggle > a').on("click", function () {
        $('#styleSelector').toggleClass('open')
        $('.selector-toggle').toggleClass('open')
    });

    $('#data-theme-color > a.data-theme-color').on("click", function () {
        $('body').attr("data-theme-color", $(this).attr("data-theme-color"));
        $('#data-theme-color').find('.c-active').removeClass('c-active');
        $(this).addClass('c-active');
    });

    $('#effect-types > a').on("click", function () {
        $('#effect-types').find('.e-active').removeClass('e-active');
        $(this).addClass('e-active');
    });

    $('#data-overlay-type > a.data-overlay-type').on("click", function () {
        $('body').attr("data-overlay-type", $(this).attr("data-overlay-type"));
    });
});


$(document).ready(function () {
    $('#spiderAnimation').on("click", function (event) {
        $("#particles").addClass("none");
        $("#canvas").removeClass("none");
    });
    $('#linesAnimation').on("click", function (event) {
        $("#canvas").addClass("none");
        $("#particles").removeClass("none");
        particleLines();
    });
    $('#starsAnimation').on("click", function (event) {
        $("#canvas").addClass("none");
        $("#particles").removeClass("none");
        particleStars();
    });
    $('#nasaAnimation').on("click", function (event) {
        $("#canvas").addClass("none");
        $("#particles").removeClass("none");
        particleNasa();
    });
    $('#snowAnimation').on("click", function (event) {
        $("#canvas").addClass("none");
        $("#particles").removeClass("none");
        particleSnow();
    });
    $('#polygonsAnimation').on("click", function (event) {
        $("#canvas").addClass("none");
        $("#particles").removeClass("none");
        particlePolygons();
    });
});