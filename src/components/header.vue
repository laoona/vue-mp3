<template>
    <div class="header">
        <header>
            <button class="header-btn-left" v-touch:tap="toggleMenu"><i class="ico ico-menu" v-bind:class="{'ico-close': menuOpen}"></i></button>
            <button class="header-btn-right" v-touch:tap="toggleSearch"><i class="ico ico-search"></i></button>
        </header>
    </div>
</template>
<script>
    export default {
        props: ['menuOpen']
        , methods: {
            toggleSearch () {
                this.$dispatch('toggleSearch');
            }
            , toggleMenu () {
                this.$dispatch('toggleMenu');
            }
        }
    };
</script>
