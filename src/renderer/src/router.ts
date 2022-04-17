import { createRouter, createWebHashHistory } from 'vue-router';
import Wallpaper from './views/Wallpaper.vue';
import HomeworkEdit from './views/HomeworkEdit.vue';
import HomeworkView from './views/HomeworkView.vue';
import Settings from './views/Settings.vue';
import SloganEdit from './views/SloganEdit.vue';
import SettingsBasic from './views/settings/Basic.vue';
import SettingsSchedule from './views/settings/Schedule.vue';
import SettingsLessons from './views/settings/Lessons.vue';
import SettingsDuty from './views/settings/Duty.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/wallpaper' },
    { path: '/wallpaper', component: Wallpaper },
    { path: '/homeworkEdit', component: HomeworkEdit },
    { path: '/HomeworkView', component: HomeworkView },
    {
      path: '/settings', component: Settings, children: [
        { path: '', redirect: '/settings/basic' },
        { path: 'basic', component: SettingsBasic, name: 'basic' },
        { path: 'lessons', component: SettingsLessons, name: 'lessons' },
        { path: 'schedule', component: SettingsSchedule, name: 'schedule' },
        { path: 'duty', component: SettingsDuty, name: 'duty' },
      ],
    },
    { path: '/sloganEdit', component: SloganEdit },
  ],
});
