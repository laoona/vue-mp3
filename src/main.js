import Vue from 'vue';
import App from './App';

import VueResource from 'vue-resource';
import VueTouch from 'vue-touch';
import FastClick from 'fastclick';
import Rem from './utils/rem';

Rem.init();
FastClick.attach(document.body);

/* eslint-disable no-new */
Vue.use(VueResource);
Vue.use(VueTouch);

new Vue({
    el: '#app'
    , components: {
        app: App
    }
});
