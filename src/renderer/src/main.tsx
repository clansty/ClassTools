import { createApp } from 'vue';
import router from './router';
import { RouterView } from 'vue-router';

createApp({
  render: () => <RouterView/>,
})
  .use(router)
  .mount('#app')
  .$nextTick(window.removeLoading);

// console.log('fs', window.fs)
// console.log('ipcRenderer', window.ipcRenderer)

// Usage of ipcRenderer.on
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});
