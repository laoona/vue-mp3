<template>
    <section class="menu-page-wrap" v-bind:class="{'menu-page-wrap-show': menuOpen}">
        <div class="menu-page-mask"></div>
        <div class="menu-page">
            <h3 class="menu-title">菜单</h3>

            <div class="menu-center-box">
                <div class="avatar" v-link="'/login'">
                    <img src="../assets/face1.jpg" alt="" class="avatar-pic" v-bind:style="{opacity: userName ? 1 : 0.7}">
                </div>

                <button class="avatar-btn" v-link="'/login'" type="button">{{userName ? userName : "立即登录"}}</button>
                <button class="avatar-btn" type="button" v-touch:tap="sync">同步歌单</button>
                <button v-bind:style="{visibility: userName ? 'visible' : 'hidden'}" class="avatar-btn" type="button" v-touch:tap="exit">退出</button>
            </div>
        </div>
    </section>
</template>
<style>
    .menu-title {
        font-weight: normal;
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
                        _me.playingLists = data;
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

