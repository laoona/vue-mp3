<template>
    <div class="view-login" transition="expand">
        <div class="header" id="app">
            <header>
                <button class="header-btn-left" v-link="'/'"><i class="ico ico-back"></i></button>
                <p class="header-txt">登录</p>
            </header>
        </div>

        <section class="login-fields">
            <div class="login-f-item">
                <div class="login-f-ribbon">
                    <input type="text" data-type="text" required class="login-f-input" v-model="user" placeholder="蒿子杆帐号" @keyup.enter="login">
                    <button v-touch:tap="clear('user')" class="login-f-clear-btn"><i class="ico ico-del"></i></button>
                </div>
            </div>

            <div class="login-f-item">
                <div class="login-f-ribbon">
                    <input type="password" data-type="password" required class="login-f-input" v-model="password" placeholder="密码" @keyup.enter="login">
                    <button v-touch:tap="clear('password')"class="login-f-clear-btn"><i class="ico ico-del"></i></button>
                </div>
            </div>

            <button class="login-f-btn" type="button" v-touch:tap="login">登录</button>

            <div class="login-f-footer">
                <a href="http://www.haozigan.com/reg" target="_blank" class="login-f-f-link">注册帐号</a><a href="http://www.haozigan.com/page/fpw" target="_blank" class="login-f-f-link">找回密码</a>
            </div>
        </section>
    </div>
</template>
<style>
    .view-login .ico-back {
        margin-left: -0.15625rem;
    }

    .view-login {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
        z-index: 10000;
        background: rgba(0, 0, 0, 1);
        -webkit-flex-direction: column;
        -moz-flex-direction: column;
        -ms-flex-direction: column;
        -o-flex-direction: column;
        flex-direction: column;
        transform: translate3d(0, -100%, 0);
    }

    .header-txt {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        font-size: 16px;
        color: white;
        line-height: 1.40625rem;
        text-align: center;
        z-index: -1;
    }

    [data-dpr="2"] .header-txt {
        font-size: 32px;
    }

    [data-dpr="2.5"] .header-txt {
        font-size: 40px;
    }

    [data-dpr="2.75"] .header-txt {
        font-size: 44px;
    }

    [data-dpr="3"] .header-txt {
        font-size: 48px;
    }

    [data-dpr="4"] .header-txt {
        font-size: 64px;
    }

    .login-fields {
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 0.46875rem;
        padding-top: 0.15625rem;
        background-color: rgba(255, 255, 255, 0.15);
    }

    .login-f-item {
        position: relative;
    }

    .login-f-clear-btn {
        display: none;
        position: absolute;
        right: 0;
        top: 50%;
        width: 0.78125rem;
        margin-top: -0.28125rem;
        font-size: 0;
    }

    .login-f-clear-btn .ico-del {
        font-size: 18px;
    }

    [data-dpr="2"] .login-f-clear-btn .ico-del {
        font-size: 36px;
    }

    [data-dpr="2.5"] .login-f-clear-btn .ico-del {
        font-size: 45px;
    }

    [data-dpr="2.75"] .login-f-clear-btn .ico-del {
        font-size: 50px;
    }

    [data-dpr="3"] .login-f-clear-btn .ico-del {
        font-size: 54px;
    }

    [data-dpr="4"] .login-f-clear-btn .ico-del {
        font-size: 72px;
    }

    .login-f-ribbon {
        padding-right: 0.78125rem;
        border-bottom: 0.01563rem solid rgba(255, 255, 255, 0.5);
    }

    .login-f-input {
        display: block;
        width: 100%;
        border: none;
        padding: 0.34375rem 0;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0);
        color: white;
    }

    [data-dpr="2"] .login-f-input {
        font-size: 28px;
    }

    [data-dpr="2.5"] .login-f-input {
        font-size: 35px;
    }

    [data-dpr="2.75"] .login-f-input {
        font-size: 39px;
    }

    [data-dpr="3"] .login-f-input {
        font-size: 42px;
    }

    [data-dpr="4"] .login-f-input {
        font-size: 56px;
    }

    .login-f-input:valid + .login-f-clear-btn {
        display: block;
    }

    .login-f-input::-webkit-search-cancel-button {
        display: none;
    }

    .login-f-btn {
        display: block;
        width: 100%;
        font-size: 14px;
        color: white;
        padding: 0.3125rem 0;
        margin-top: 0.78125rem;
        background-color: #b64e4e;
        border: none;
    }

    [data-dpr="2"] .login-f-btn {
        font-size: 28px;
    }

    [data-dpr="2.5"] .login-f-btn {
        font-size: 35px;
    }

    [data-dpr="2.75"] .login-f-btn {
        font-size: 39px;
    }

    [data-dpr="3"] .login-f-btn {
        font-size: 42px;
    }

    [data-dpr="4"] .login-f-btn {
        font-size: 56px;
    }

    .login-f-btn:active {
        background-color: #c15053;
    }

    .login-f-footer {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -moz-justify-content: space-between;
        -ms-justify-content: space-between;
        -o-justify-content: space-between;
        justify-content: space-between;
        margin-top: 0.46875rem;
        font-size: 0;
    }

    .login-f-f-link {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.1);
    }

    [data-dpr="2"] .login-f-f-link {
        font-size: 28px;
    }

    [data-dpr="2.5"] .login-f-f-link {
        font-size: 35px;
    }

    [data-dpr="2.75"] .login-f-f-link {
        font-size: 39px;
    }

    [data-dpr="3"] .login-f-f-link {
        font-size: 42px;
    }

    [data-dpr="4"] .login-f-f-link {
        font-size: 56px;
    }

    /* 必需 */
    .expand-transition {
        transition: transform 0.35s cubic-bezier(0, 0, 0.25, 1);
    }

    /* .expand-enter 定义进入的开始状态 */
    .expand-enter {
        /*opacity: .1;*/
        transform: translate3d(-100%, -100%, 0);
    }

    /* .expand-leave 定义离开的结束状态 */
    .expand-leave {
        /*opacity: .5;*/
        transform: translate3d(-100%, -100%, 0);
    }
</style>
<script>
    import ctrl from '../utils/ctrl';
    import Toast from '../components/toast.vue';
    import router from "../router";

    var toast = Toast.methods.init();

    export default {
        data () {
            return {
                user: ''
                , password: ''
            }
        }
        , props: ["userName"]
        , methods: {
            login() {
                var url = ctrl.hgzUrl + '/api/login';

                if (!this.user.trim()) {
                    toast.init("帐号不能为空").destroy();
                    return;
                }

                if (!this.password.trim()) {
                    toast.init("密码不能为空").destroy();
                    return;
                }

                toast.init().loading();

                var _me = this;
                this.$http.post(url, {
                    user: this.user
                    , password: this.password
                }, {
                    credentials: true
                    , emulateJSON: true
                }).then(function (res) {
                    var name = res.data.data;
                    var code = res.data.code;

                    if (code == 100) {
                        toast.init("登录成功").destroy(function () {
                            _me.userName = name;
                            router.go("/");
                        });
                    } else if (code == 102) {
                        toast.init("帐号或密码错误").destroy();
                    } else {
                        toast.init("失败").destroy();
                    }
                }, function (res) {
                    toast.init("失败").destroy();
                });
            }

            , clear (val) {
                this[val] = "";
            }
        }

        , route: {
            activate: function (t) {
                var name = window.localStorage.getItem(ctrl.lsUser);
                var auth = t.to.auth;

                name = name ? decodeURIComponent(name) : "";

                if (auth && name.length) {
                    router.go("/");
                } else {
                    t.next();
                }
            }
        }
    };

</script>

