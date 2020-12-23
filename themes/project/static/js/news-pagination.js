$(function () {
    new Pagination({
        element: '#pagination',
        type: 1,
        pageIndex: 1,
        pageSize: 5,
        pageCount: curPage,
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