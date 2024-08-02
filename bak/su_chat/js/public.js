(function(WIN) {
    var  setFontSize = WIN.setFontSize = function (_width) {
        var  docEl = document.documentElement; 
        // 获取当前窗口的宽度
        var  width = _width || docEl.clientWidth; // docEl.getBoundingClientRect().width;
        // 大于 1080px 按 1080
        if (width > 750) { 
            width = 750;
        }
		console.log(docEl.clientWidth)
        var  rem = 100 * width / 750;
        console.log(rem);

        docEl.style.fontSize = rem + 'px';

        // 误差、兼容性处理
        var  actualSize = WIN.getComputedStyle && parseFloat(WIN.getComputedStyle(docEl)["font-size"]);
        if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
            var remScaled = rem * rem / actualSize;
            docEl.style.fontSize = remScaled + 'px';
        }
    }

    var timer;

    function dbcRefresh() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 100);
    }

    //窗口更新动态改变 font-size
    WIN.addEventListener('resize', dbcRefresh, false);
    //页面显示时计算一次
    WIN.addEventListener('pageshow', function(e) {
        if (e.persisted) { 
            dbcRefresh() 
        }
    }, false);
    setFontSize();
})(window)
