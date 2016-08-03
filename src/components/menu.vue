<template>
    <section class="menu-page-wrap" v-bind:class="{'menu-page-wrap-show': menuOpen}">
        <div class="menu-page-mask"></div>
        <div class="menu-page">
            <div class="avatar" v-touch:tap="login">
                <img src="../assets/face1.jpg" alt="" class="avatar-pic" v-bind:style="{opacity: userName ? 1 : 0.7}">
                <p class="user-name">{{userName ? userName : "立即登录"}}</p>
            </div>
            <!--<h3 class="menu-title">二维码</h3>-->
            <div class="menu-center-box">

                <ul class="menu-items">
                    <li v-touch:tap="sync">
                        <i class="ico ico-sync"></i>
                        同步歌单
                    </li>
                    <li v-link="'/qrcode'">
                        <i class="ico ico-qrcode"></i>
                        二维码
                    </li>
                    <li v-link="'/share'">
                        <i class="ico ico-share"></i>
                        分享到
                    </li>
                    <li v-link="'/about'">
                        <i class="ico ico-about"></i>
                        关于
                    </li>
                    <li v-bind:style="{visibility: userName ? 'visible' : 'hidden'}" v-touch:tap="exit">
                        <i class="ico ico-exit"></i>
                        退出
                    </li>
                </ul>
            </div>

            <div class="menu-copyr">
                Gmusic-基佬音乐
            </div>
        </div>
    </section>
</template>
<style>
    .menu-title {
        font-weight: normal;
    }
    .menu-page .avatar-btn {
        margin: .4rem 0;
    }
</style>
<script>
    import ctrl from '../utils/ctrl';
    import router from '../router';
    import Toast from '../components/toast.vue';

    var toast = Toast.methods.init();

    export default {
        props: ['menuOpen', 'view', 'userName', 'song', 'playingLists']

        , methods: {
            sync () {
                if (!this.userName.length) {
                    router.go('/login');
                } else {
                    this.syncPost();
                    this.menuOpen = false;
                }
            }

            , login () {
                if (!this.userName.length) {
                    router.go('/login');
                }
            }

            , exit () {
                var _me = this;
                var url = ctrl.hgzUrl + '/api/loginout';

                this.$http.get(url, {
                    credentials: true
                    , emulateJSON: true
                }).then(function (res) {
                    _me.userName = "";
                }, function (res) {
                    toast.init("error").destroy();
                });
            }
            , syncPost () {
                var url = ctrl.hgzUrl + '/api/syncmp3';
                var mp3 = this.playingLists;
                var _me = this;

                this.$http.post(url, {
                    mp3: mp3
                }, {
                    credentials: true
                    , emulateJSON: true
                }).then(function (res) {
                    var code = res.data.code;
                    var data = res.data.data;

                    if (code == 100) {
                        toast.init("同步成功").destroy();
                        _me.playingLists = data.reverse();
                    }  else if (code == 101) {
                        _me.userName = "";

                        router.go("/login");
                    } else {
                        toast.init("同步失败").destroy();
                    }
                }, function (res) {
                    toast.init("同步失败").destroy();
                });
            }
        }
    };
</script>

