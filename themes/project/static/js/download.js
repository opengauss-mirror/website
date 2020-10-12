$(document).ready(function () {
    $('.container .download-sel').on('change', function () {
        if($(this).val() === '1'){
            $('.version1').removeClass('hide');
            $('.version2').addClass('hide');
            $('.option-v2').addClass('hide');
            $('.tools-DS').addClass('hide');
        } else {
            $('.version2').removeClass('hide');
            $('.version1').addClass('hide');
            $('.option-v2').removeClass('hide');
            $('.tools-DS').removeClass('hide');
        }
    })
})