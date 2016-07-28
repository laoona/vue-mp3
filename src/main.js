import Vue from 'vue';

import VueResource from 'vue-resource';
import VueTouch from 'vue-touch';
import FastClick from 'fastclick';
import Rem from './utils/rem';

import router from './router';

import App from './App.vue';

Rem.init();
FastClick.attach(document.body);

/* eslint-disable no-new */
Vue.use(VueResource);
Vue.use(VueTouch);

router.start(App, "#app");
