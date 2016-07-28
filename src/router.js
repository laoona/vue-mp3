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

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/': {
        auth: false
        , component: Home
    }
    , "/login": {
        auth: false
        , component (resolve) {
            resolve(Login);
        }
    }
});

router.redirect({
    '*': "/"
});

export default router;

