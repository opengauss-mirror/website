$(document).ready(function () {
    $('.container .download-sel').on('change', function () {
        console.log(1);
        if($(this).val() === '1'){
            $('.version1').removeClass('hide');
            $('.version2').addClass('hide');
        } else {
            $('.version2').removeClass('hide');
            $('.version1').addClass('hide');
        }
    })
})