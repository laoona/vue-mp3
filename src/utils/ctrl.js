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
        , url: "http://m2.music.126.net/TKiRf1KDSzS2NwTg9a3yIw==/5674579511013571.mp3"
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
    , url: 'http://192.168.10.240/'
    , url: 'http://page.laoono.com'
};


export default ctrl;
 