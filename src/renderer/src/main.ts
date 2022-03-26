import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});
