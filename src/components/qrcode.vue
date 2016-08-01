<template>
    <div class="view-login" transition="expand">
        <div class="header" id="app">
            <header>
                <button class="header-btn-left" v-link="'/'"><i class="ico ico-back"></i></button>
                <p class="header-txt">二维码</p>
            </header>
        </div>

        <section class="login-fields">
            <div class="menu-qr-code">
                <img src="../assets/qrcode.png" alt="">
            </div>
        </section>
    </div>
</template>

