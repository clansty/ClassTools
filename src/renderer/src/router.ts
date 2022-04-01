import { createRouter, createWebHashHistory } from 'vue-router';
import Wallpaper from './views/Wallpaper.vue';
import Homework from './views/Homework.vue';
import Settings from './views/Settings.vue';
import SloganEdit from './views/SloganEdit.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/wallpaper' },
    { path: '/wallpaper', component: Wallpaper },
    { path: '/homework', component: Homework },
    { path: '/settings', component: Settings },
    { path: '/sloganEdit', component: SloganEdit },
  ],
});
