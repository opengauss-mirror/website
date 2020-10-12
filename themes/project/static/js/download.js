$(document).ready(function () {
    $('.container .download-sel').on('change', function () {
        if($(this).val() === '1'){
            $('.version1').removeClass('hide');
            $('.version2').addClass('hide');
            $('.option-v2').addClass('hide');
            $('.table-option').eq(0).trigger('click');
        } else {
            $('.version2').removeClass('hide');
            $('.version1').addClass('hide');
            $('.option-v2').removeClass('hide');
            $('.table-option').eq(0).trigger('click');
        }
    })
})