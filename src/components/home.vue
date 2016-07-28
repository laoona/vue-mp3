<template>
    <div style="height: 0; overflow:hidden; display:none;">
        {{ message }}
    </div>
</template>
<script>
    import router from '../router';

    export default {
        data () {
            return {
                message: ''
            }
        }
        , props: ['userName']
        , ready () {
            var _me = this;
            router.beforeEach(function(t) {
                var name = _me.userName;

                if (name.length) {
                    router.go("/");
                } else {
                    t.next();
                }
            });
        }
        , route: {
            data (t) {
                t.next({message: 'hello'});
            }
        }
    };
</script>

