import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

export default createAutoUpdateStorage('slogan', {
  content: '',
  author: '',
  // 这里的大小以 em 为单位
  size: 2,
  authorSize: 2,
  color: '#ff0000',
  authorColor: '#303133',
});
