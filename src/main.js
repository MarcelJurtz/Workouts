// main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import './index.css'

// Components
import Wod from './components/WodComponent.vue';
import Settings from './components/SettingsComponent.vue';
import Privacy from './components/PrivacyComponent.vue';
import Imprint from './components/ImprintComponent.vue';

// Create the Vue application
const app = createApp(App);

// Use plugins
app.use(store);
app.use(router);

// Register components globally (if needed)
app.component('app-wod', Wod);
app.component('app-settings', Settings);
app.component('app-privacy', Privacy);
app.component('app-imprint', Imprint);

// Mount the app
app.mount('#app');
