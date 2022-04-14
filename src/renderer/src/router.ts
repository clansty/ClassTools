import { createRouter, createWebHashHistory } from 'vue-router';
import Wallpaper from './views/Wallpaper.vue';
import Homework from './views/Homework.vue';
import Settings from './views/Settings.vue';
import SloganEdit from './views/SloganEdit.vue';
import SettingsBasic from './views/settings/Basic.vue';
import SettingsSchedule from './views/settings/Schedule.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/wallpaper' },
    { path: '/wallpaper', component: Wallpaper },
    { path: '/homework', component: Homework },
    {
      path: '/settings', component: Settings, children: [
        { path: '', redirect: '/settings/basic' },
        { path: 'basic', component: SettingsBasic, name: 'basic' },
        { path: 'schedule', component: SettingsSchedule, name: 'schedule' },
      ],
    },
    { path: '/sloganEdit', component: SloganEdit },
  ],
});
