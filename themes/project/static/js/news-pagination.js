$(function () {
    new Pagination({
        element: '#pagination',
        type: 1,
        pageIndex: curPage,
        pageSize: 5,
        pageCount: 9,
        total:total,
        jumper: true,
        singlePageHide: false,
        prevText: '<',
        nextText: '>',
        disabled: false,
        currentChange: function(index) {
            window.location.href = '/' + lang + '/news/page/' + index + '.html'
        }
    });
})