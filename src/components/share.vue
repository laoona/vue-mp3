<template>
    <div class="view-login" transition="expand">
        <div class="header" id="app">
            <header>
                <button class="header-btn-left" v-link="'/'"><i class="ico ico-back"></i></button>
                <p class="header-txt">分享到</p>
            </header>
        </div>

        <section class="login-fields">
            <ul class="share-items">
                <li class="share-item" v-link="'/qrcode'">
                    <img src="../assets/share_w.png" alt="">
                </li>
                <li class="share-item" v-touch:tap="share2wb">
                    <img src="../assets/share_s.png" alt="">
                </li>
                <li class="share-item" v-touch:tap="share2qq">
                    <img src="../assets/share_q.png" alt="" >
                </li>
            </ul>
        </section>
    </div>
</template>

<style>
    .share-items {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        padding-top: 30%;
        font-size: 0;
    }
    .share-items .share-item {
        height: 20px;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
    }
</style>
<script>
    var title = 'Gmusic-基佬音乐'
            , url = 'http://laoono.com/mp3';

    export default {
        methods: {
            share2qzone () {
                var sUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + title;

                window.open(sUrl, "_blank");
            }

            , share2qq () {
                var sUrl = 'http://connect.qq.com/widget/shareqq/index.html?url=' + url + '&title=' + title;

                window.open(sUrl, "_blank");
            }

            , share2wb () {
                var sUrl = 'http://v.t.sina.com.cn/share/share.php?url=' + url + '&title=' +title;

                window.open(sUrl, "_blank");
            }
        }
    };
</script>
