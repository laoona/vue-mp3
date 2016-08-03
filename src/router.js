/**
 * @author: laoono
 * @date:  2016-07-27
 * @time: 14:00
 * @contact: laoono.com
 * @description: #
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/login';
import Home from './components/home'
import Qrcode from './components/qrcode';
import About from './components/about';
import Share from './components/share';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/': {
        auth: false
        , component: Home
    }
    , "/login": {
        auth: true
        , component (resolve) {
            resolve(Login);
            // require(['./components/login.vue'], resolve);
        }
    }
    , "/qrcode": {
        auth: false
        , component (resolve) {
            resolve(Qrcode);
            // require(['./components/qrcode.vue'], resolve);
        }
    }
    , "/about": {
        auth: false
        , component (resolve) {
            resolve(About);
            // require(['./components/about.vue'], resolve);
        }
    }
    , "/share": {
        auth: false
        , component (resolve) {
            resolve(Share);
            // require(['./components/about.vue'], resolve);
        }
    }
});

router.redirect({
    '*': "/"
});

export default router;

