import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

const useSettings = createAutoUpdateStorage('settings', {
  countDownName: '高考',
  countDownDate: 1686067200000,
  fontSize: 32,
  fontColor: '#303133',
  city: 'CN101240102',
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
});

export default useSettings;
