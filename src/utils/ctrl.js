/**
 * 
 * @author: laoono
 * @date:  2016-07-19
 * @time: 15:15
 * @contact: laoono.com
 * @description: #
 */

var ctrl = {
    defaultMusic: {
        id: 27534134
        , title: "老司机带带我"
        , url: "http://m10.music.126.net/20170608155934/9807fa6d2856893d818ce3cfdc509804/ymusic/543c/1341/14a8/7afa8be4e4f9dfda159ddd65960f2cf9.mp3"
        , picUrl: "http://p3.music.126.net/Z4AP7bE0UuhuBEfXI7G0ag==/3398590442421537.jpg"
        , artists: "群星"
    }
    , lsName: "__list__"
    , lsCurr: "__curr__"
    , lsMode: "__mode__"
    , lsSHis: "__his__"
    , lsUser: "__user__"
    , assign: function (target, arr) {
        if (typeof Object.assign !== 'function') {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        } else {
            return Object.assign(target, arr);
        }
    }

    , shuffle: function (arr) {
        arr = arr || [];

        var len = arr.length;
        for(var i = 0; i < len - 1; i++){

            var idx = Math.floor(Math.random() * (len - i));
            var temp = arr[idx];

            arr[idx] = arr[len - i - 1];
            arr[len - i -1] = temp;
        }

        return arr.shift() || [this.defaultMusic];
    }

    , fillData: function (insert) {

        var arr = localStorage.getItem(this.lsName)
            , exist
            , res;

        arr = JSON.parse(arr) || [];

        insert = arr.length ? insert || {} : this.defaultMusic;

        res = this.assign([], arr);

        arr.forEach(function (val, key) {
            if (insert.id && (val.id == insert.id)) {
                exist = true;
            }
        });

        (!exist && insert.id) && res.unshift(insert);

        return res;
    }
    , hgzUrl: 'http://www.haozigan.com'
    // , hgzUrl: 'http://haozigan.me'
    // , url: 'http://192.168.10.240/'
    , url: 'http://laoono.com/api/netc'
};

var win = window;
var isAndroid = win.navigator.appVersion.match(/android/gi);
var isIPhone = win.navigator.appVersion.match(/iphone/gi);

if (!location.search.length && isIPhone) {
    window.location.href="http://www.haozigan.com/api/sso";
}

export default ctrl;
 