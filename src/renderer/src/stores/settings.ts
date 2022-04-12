import { useStorage } from '@vueuse/core';

const useSettings = () => useStorage('settings', {
  countDownName: '高考',
  countDownDate: 1686067200000,
  fontSize: 32,
  fontColor: '#303133',
  city: 'CN101240102',
  schedule: ['', '', '', '', '', '', ''],
});

export default useSettings;
