import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

const useSettings = createAutoUpdateStorage('settings', {
  countDownName: '高考',
  countDownDate: 1686067200000,
  // 这里是 em
  countDownSize: 1.5,
  countDownColor: '#ff0000',
  // 这个字体大小大概在壁纸页面的最外层使用，然后内层使用 em
  // 这里用 vw，这样所有设备上看起来都是一样的
  fontSize: 1.2,
  fontColor: '#303133',
  dateSize: 1.7,
  city: 'CN101010100',
  weatherKey: '',
  weatherComponents: ['realtime', 'rain', 'props', '24h', '7days'],
  weatherSize: 1,
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
  schedule: new Array(10).fill(new Array(7).fill('')) as string[][],
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
});

export default useSettings;
