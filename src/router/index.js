import Vue from 'vue'
import VueRouter from 'vue-router'

import Wod from './../components/Wod.vue'

Vue.use(VueRouter);

const routes = [{
        path: '/home',
        name: 'Home',
        component: Wod
    },
    {
        path: '/wod/:permalink',
        name: 'Permalink',
        component: Wod
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router;