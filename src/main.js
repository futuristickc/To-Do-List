import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import { createVuetify } from 'vuetify'
// import 'vuetify/styles';
import router from './router';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'; 


// const vuetify = createVuetify();

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(BootstrapVue3);
