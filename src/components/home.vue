<template>
    <div style="height: 0; overflow:hidden; display:none;">
    </div>
</template>
<script>
    import router from '../router';
    import ctrl from '../utils/ctrl';

    export default {
        data () {
            return {
                message: ''
            }
        }
        , props: ['userName']
        , ready () {
        }
    };
</script>

