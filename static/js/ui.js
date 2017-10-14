jQuery.fn.rotate = function (degrees) {
    $(this).css({
        '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        'transform': 'rotate(' + degrees + 'deg)'
    });
    return $(this);
};

jQuery.fn.center = function () {
    $(this).css({
        'position': 'absolute;',
        'top': '50%',
        'left': '41%'
    });
    return $(this);
};
