import Vue from 'vue'
import Router from 'vue-router'
import WOD from '@/components/wod'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Wod',
        component: WOD
    }]
})