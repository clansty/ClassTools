import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

const useSettings = createAutoUpdateStorage('settings', {
  countDownName: '高考',
  countDownDate: 1686067200000,
  // 这个字体大小大概在壁纸页面的最外层使用，然后内层使用 em
  fontSize: 26,
  fontColor: '#303133',
  city: 'CN101240102',
  weatherKey: '',
  weatherComponents: ['realtime', 'aqi', 'props', '24h', '7days'],
  weatherColor: '#4a4a4a',
  weatherColorSecondary: '#9b9b9b',
  backgroundType: 'color' as 'image' | 'color' | 'advanced',
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
  schedule: new Array(10).fill(new Array(7).fill('')),
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
  duty: new Array(7).fill(''),
});

export default useSettings;
