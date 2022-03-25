import { createRouter, createWebHashHistory } from 'vue-router';
import Homework from './Homework';
import Settings from './Settings';
import Wallpaper from './Wallpaper';
import HomeworkView from './HomeworkView';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/wallpaper' },
    { path: '/wallpaper', component: Wallpaper },
    { path: '/homeworkView', component: HomeworkView },
    { path: '/homework', component: Homework },
    { path: '/settings', component: Settings },
  ],
});
