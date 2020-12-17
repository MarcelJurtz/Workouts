import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'

// Components
import Wod from './components/Wod.vue'
import Settings from './components/Settings.vue'

Vue.config.productionTip = false
Vue.use(Vuex);

Vue.component('app-wod', Wod);
Vue.component('app-settings', Settings);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')