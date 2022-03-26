import { createRouter, createWebHashHistory } from 'vue-router';
import Wallpaper from './views/Wallpaper.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/wallpaper' },
    { path: '/wallpaper', component: Wallpaper },
  ],
});
