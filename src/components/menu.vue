<template>
    <section class="menu-page-wrap" v-bind:class="{'menu-page-wrap-show': menuOpen}">
        <div class="menu-page-mask"></div>
        <div class="menu-page">
            <h3 class="menu-title">二维码</h3>
            <!--        <ul class="menu-items">
                        <li>
                            <i class="ico ico-search"></i>
                            搜索
                        </li>
                        <li>
                            <i class="ico ico-search"></i>
                            搜索
                        </li>
                    </ul>-->
            <div class="menu-qr-code">
                <img src="../assets/qrcode.png" alt="">
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: ['menuOpen']
    };
</script>

