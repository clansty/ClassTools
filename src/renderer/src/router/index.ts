import { createRouter, createWebHashHistory } from 'vue-router';
import MainWindow from './MainWindow';
import Wallpaper from './Wallpaper';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/main', component: MainWindow },
    { path: '/wallpaper', component: Wallpaper },
  ],
});
