<template>
    <div></div>
</template>
<style>
    .toastBar {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        background: transparent;
        z-index: 99999999;
        height: 100%;
    }

    .toast {
        position: relative;
        left: 50%;
        top: 50%;
        float: left;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        padding: 0.3125rem;
        color: #ffffff;
        margin-top: -20%;
        background-color: rgba(0, 0, 0, 0.8);
        -webkit-border-radius: 0.1875rem;
        -moz-border-radius: 0.1875rem;
        border-radius: 0.1875rem;
        box-shadow: 0 0 0.09375rem rgba(0, 0, 0, 0.75);
        font-size: 14px;
        max-width: 75%;
        word-break: break-all;
        word-wrap: break-word;
    }
    [data-dpr="2"] .toast {
        font-size: 28px;
    }
    [data-dpr="2.5"] .toast {
        font-size: 35px;
    }
    [data-dpr="2.75"] .toast {
        font-size: 39px;
    }
    [data-dpr="3"] .toast {
        font-size: 42px;
    }
    [data-dpr="4"] .toast {
        font-size: 56px;
    }

    .toastIco, .toastTxt {
        display: inline-block;
        vertical-align: middle;
        font-style: normal;
    }

    .toastTxt {
        line-height: 0.5625rem;
    }

    .toastIco {
        height: 0.5625rem;
    }

    .toastIcoLoading {
        width: 0.5625rem;
        height: 0.5625rem;
        border: 0.0625rem solid #fff;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border-left-color: #FE6249;
        animation: toastLoading 800ms infinite linear;
        -webkit-animation: toastLoading 800ms infinite linear;
    }

    @keyframes toastLoading {
        from {
            -webkit-transform: rotate(0);
            -moz-transform: rotate(0);
            -ms-transform: rotate(0);
            -o-transform: rotate(0);
            transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes toastLoading {
        from {
            -webkit-transform: rotate(0);
            -moz-transform: rotate(0);
            -ms-transform: rotate(0);
            -o-transform: rotate(0);
            transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
<script>
    import $ from '../utils/jquery.2.min';

    var toast = {};
    var t = null;
    var delayDefault = 2;

    toast.delay = function(time) {
        this._delay = time || delayDefault;

        return this;
    };

    toast._delay = delayDefault;
    toast.icon = {
        warning: "<i class=\"toastIco toastIcoWarnning\"></i>",
        loading: "<i class=\"toastIco toastIcoLoading\"></i>"
    };

    toast.init = function (txt, p, pos) {
        this._delay = delayDefault;
        this.cb = function() {};

        var wrap = null;
        var parentWrap = $(p).length ? $(p) : $(".main-content");

        pos = pos || "";
        pos = "toastBar-" + pos;

        wrap = $("div.toastBar");
        wrap.addClass(pos);

        if (wrap.length) {
            wrap.unbind("click").remove();
        }

        txt = txt || "";

        if (parentWrap.length) {
            parentWrap.append('<div class="toastBar"><div class="toast"><span class="toastTxt">' + txt + '</span></div></div>');
        } else {
            $("body").append('<div class="toastBar"><div class="toast"><span class="toastTxt">' + txt + '</span></div></div>');
        }

        wrap = $("div.toastBar");
        wrap.addClass(pos);

        //wrap.find("div.toast").animate({top: "30px"});
        wrap.bind("click", function() {
            clearTimeout(t);
            $(this).remove();
            toast.cb();
        });

        return this;
    };

    toast.width = function(num) {
        $("div.toastBar").width(num);
        return this;
    };
    toast.height= function(num) {
        $("div.toastBar").height(num);
        return this;
    };

    toast.warning = function (cb) {
        this.destroy(cb, true);

        var txtBox = $("div.toastBar .toastTxt");
        txtBox.before(this.icon.warning);

        return this;
    };
    toast.loading = function () {
        $("div.toastBar").unbind("click");
        this.destroy(null, false);
        var txtBox = $("div.toastBar .toastTxt");
        txtBox.before(this.icon.loading);
        return this;
    };

    toast.destroy = function (cb, flag) {
        if (typeof cb !== "function") {
            cb = this.cb;
        }

        this.cb = cb;
        clearTimeout(t);
        if (flag === false) {
            if (typeof cb == "function") {
                cb();
            }
            return;
        }

        t = setTimeout(function () {
            $("div.toastBar").animate({
                opacity: 0
            }, "ease-in-out", function () {
                $("div.toastBar").remove();
                cb();
            });
            clearTimeout(t);
        }, this._delay * 1000);
    };

    toast.cb = function() {};

    export default {
        methods: {
            init () {
              return toast;
            }
        }
    };
</script>

