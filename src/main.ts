import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mitt from 'mitt';

const app = createApp(App);
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$store = store;
app.use(store).use(router).mount('#app');

store.subscribe((mutation, state) => {
  localStorage.setItem('main', JSON.stringify(state.main));
});
