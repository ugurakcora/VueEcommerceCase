import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Vue Router'ı içe aktarın
import store from './store'; // Vuex Store'u içe aktarın

const app = createApp(App);
app.use(router); // Vue Router'ı kullanılabilir hale getirin
app.use(store); // Vuex Store'u kullanılabilir hale getirin
app.mount('#app');
