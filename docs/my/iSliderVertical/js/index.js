require(['../../../../node_modules/jquery/mobile.js', '../../../../node_modules/islider.js/src/js/iSlider.js',/* '/node_modules/islider.js/src/js/ext/animate.js', *//* '/node_modules/islider.js/src/style/iSlider.css' */], function ($, iSlider) {
    // alert(1)
    var list = [
        // picture
        {
            content:'<div style="color:#fff;text-align:center;padding:0 10%;"><h3 style="font-size:2em;">h5翻页demo</h3><p style="font-size:1.5em;">测试试测试测试测试测试</p><p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p></div>'
        },
        {
            content: './imgs/1.jpg'
        },
        // HTML String
        {
            content: './imgs/2.jpg'
        },
        // element
        {
            content: './imgs/3.jpg'
        },
        // fragment
        {
            content: './imgs/4.jpg'
        },
        // dom
        {
            content: './imgs/5.jpg'
        },
        // iframe
        {
            content: './imgs/6.jpg'
        }
    ];

    var S = new iSlider({
        dom: document.getElementById('iSlider-wrapper'),
        data: list,
        isAutoplay: 1,
        isLooping: 1,
        isOverspread: 1,
        animateTime: 800,
        isVertical: true
    });
})