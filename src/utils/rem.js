/**
 *
 * @author: laoono
 * @date:  2016-07-16
 * @time: 13:01
 * @contact: laoono.com
 * @description: #
 */
function isMobile () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = (/ipad/i).test(sUserAgent);
    var bIsIphoneOs = (/iphone os/i).test(sUserAgent);
    var bIsMidp = (/midp/i).test(sUserAgent);
    var bIsUc7 = (/rv:1.2.3.4/i).test(sUserAgent);
    var bIsUc = (/ucweb/i).test(sUserAgent);
    var bIsAndroid = (/android/i).test(sUserAgent);
    var bIsCE = (/windows ce/i).test(sUserAgent);
    var bIsWM = (/windows mobile/i).test(sUserAgent);
//                    , bIsWebview = (/webview/i) === 'webview';

    return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
}

function init () {
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');

    dpr = (isMobile() ? window.devicePixelRatio : 1) || 1;
    rem = (isMobile() ? (docEl.clientWidth) : 320) * dpr / 10;
    scale = 1 / dpr;

// 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
    window.rem2px = function (v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.px2rem = function (v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
}

export default {
    init: init
    , isMobile: isMobile
};
