import { createRouter, createWebHashHistory } from 'vue-router';
import Wallpaper from './views/Wallpaper.vue';
import HomeworkEdit from './views/HomeworkEdit.vue';
import HomeworkView from './views/HomeworkView.vue';
import HomeworkHistory from './views/HomeworkHistory.vue';
import HomeworkHistoryView from './views/HomeworkHistoryView.vue';
import Settings from './views/Settings.vue';
import SloganEdit from './views/SloganEdit.vue';
import About from './views/About.vue';
import Demo from './views/Demo.vue';
import Lots from './views/Lots.vue';
import SettingsBasic from './views/settings/Basic.vue';
import SettingsWallpaper from './views/settings/Wallpaper.vue';
import SettingsSchedule from './views/settings/Schedule.vue';
import SettingsLessons from './views/settings/Lessons.vue';
import SettingsDuty from './views/settings/Duty.vue';
import SettingsWeather from './views/settings/Weather.vue';
import SettingsHomeworkViewer from './views/settings/HomeworkViewer.vue';
import SettingsCountdown from './views/settings/Countdown.vue';
import SettingsNamelist from './views/settings/Namelist.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Demo },
    { path: '/wallpaper', component: Wallpaper },
    { path: '/homeworkEdit', component: HomeworkEdit },
    { path: '/homeworkView', component: HomeworkView },
    { path: '/about', component: About },
    {
      path: '/homeworkHistory', component: HomeworkHistory, children: [
        { path: ':date', component: HomeworkHistoryView },
      ],
    },
    {
      path: '/settings', component: Settings, children: [
        { path: '', redirect: '/settings/basic' },
        { path: 'basic', component: SettingsBasic, name: 'basic' },
        { path: 'wallpaper', component: SettingsWallpaper, name: 'wallpaper' },
        { path: 'lessons', component: SettingsLessons, name: 'lessons' },
        { path: 'schedule', component: SettingsSchedule, name: 'schedule' },
        { path: 'duty', component: SettingsDuty, name: 'duty' },
        { path: 'weather', component: SettingsWeather, name: 'weather' },
        { path: 'homeworkViewer', component: SettingsHomeworkViewer, name: 'homeworkViewer' },
        { path: 'countdown', component: SettingsCountdown, name: 'countdown' },
        { path: 'namelist', component: SettingsNamelist, name: 'namelist' },
      ],
    },
    { path: '/sloganEdit', component: SloganEdit },
    { path: '/lots', component: Lots },
  ],
});
