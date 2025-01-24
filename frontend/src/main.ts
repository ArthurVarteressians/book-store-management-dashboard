import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification'; // Import Toastification
import 'vue-toastification/dist/index.css'; // Import Toastification CSS
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Toast); // Added for Toast

app.mount('#app');
