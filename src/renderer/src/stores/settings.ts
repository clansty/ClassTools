import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

const useSettings = createAutoUpdateStorage('settings', {
  countDownName: '高考',
  countDownDate: 1686067200000,
  fontSize: 32,
  fontColor: '#303133',
  city: 'CN101240102',
  schedule: new Array(7).fill(''),
});

export default useSettings;