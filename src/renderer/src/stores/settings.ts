import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';
import yaml from 'js-yaml';

// 如果软件目录存在 init.yaml 并且 settings 还没有初始化，就导入它
let init;
if (window.fs && !localStorage.getItem('settings')) {
  const initPath = window.path.join(window.path.dirname(window.exePath), '..', 'init.yaml');
  if ((window.isAppx || window.exePath.includes('\\MsixCoreApps\\')) && window.fs.existsSync(initPath)) {
    init = yaml.load(window.fs.readFileSync(initPath, 'utf-8'));
  }
}
const settings = createAutoUpdateStorage('settings', {
  countDownName: '高考',
  countDownDate: 1686067200000,
  dateFormat: 'yyyy 年 M 月 d 日',
  timeFormat: 'H:mm:ss',
  // 这里是 em
  countDownSize: 1.5,
  countDownColor: '#ff0000',
  // 这个字体大小大概在壁纸页面的最外层使用，然后内层使用 em
  // 这里用 vw，这样所有设备上看起来都是一样的
  fontSize: 1.2,
  fontColor: '#303133',
  shadowColor: '#fff',
  font: 'BlinkMacSystemFont, "PingFang SC", "Microsoft Yahei", "MicrosoftJhengHei", sans-serif',
  dateSize: 1.7,
  city: 'CN101010100',
  weatherKey: '',
  weatherKeyHidden: false,
  weatherComponents: ['realtime', 'rain', 'props', '24h', '7days'],
  weatherSize: 1,
  weatherColor: '#4a4a4a',
  weatherColorSecondary: '#9b9b9b',
  // 华文黑体永远滴神
  weatherFont: 'STHeiti, 华文细黑, 华文黑体, "Microsoft YaHei", "MicrosoftJhengHei", MingLiu, sans-serif',
  backgroundType: 'color' as 'image' | 'color' | 'advanced' | 'system',
  // image 时使用
  backgroundImage: '',
  // color
  backgroundColor: '#FFFFFF',
  // advanced
  backgroundCss: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),\n' +
    'linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),\n' +
    'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
  // 外层：第几节课 内层：周几。这样的话，加减节次会比较方便
  // 我反复改了好几遍这个（（
  schedule: new Array(10).fill(new Array(7).fill('')) as string[][],
  // 上午和下午的节数
  sessionsMorning: 5,
  sessionsAfternoon: 5,
  // 晚上上课，丧尽天良
  sessionsEvening: 0,
  lessons: [
    { name: '语文', hasHomework: true },
    { name: '数学', hasHomework: true },
    { name: '英语', hasHomework: true },
    { name: '物理', hasHomework: true },
    { name: '化学', hasHomework: true },
    { name: '生物', hasHomework: true },
    { name: '历史', hasHomework: true },
    { name: '政治', hasHomework: true },
    { name: '地理', hasHomework: true },
    { name: '其他', hasHomework: true },
    { name: '班务', hasHomework: true },
    { name: '精神食粮', hasHomework: false },
  ],
  dutyTypes: ['教室', '包干区'],
  duty: new Array(7).fill({}),
  homeworkViewerSize: 1.2,
  homeworkViewerCols: 3,
  showSchedule: true,
  showTomorrowScheduleAfter: '16:00:00',
  showTomorrowDutyAfter: '16:00:00',
  showDuty: true,
  createDesktopShortcut: true,
  autoNewDay: false,
  scheduleSize: 1,
  scheduleSizeHomeworkView: 1,
});
if (init) {
  Object.assign(settings.value, init);
}

// 20220512 更改 showTomorrowScheduleAfter 格式为 HH:mm:ss
if (typeof settings.value.showTomorrowScheduleAfter === 'number') {
  settings.value.showTomorrowScheduleAfter = '16:00:00';
}

export default settings;
