import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

const useSlogan = createAutoUpdateStorage('slogan', {
  content: '',
  author: '',
  // 这里的大小以 em 为单位
  size: 2,
  authorSize: 2,
  color: '#ff0000',
  authorColor: '#303133',
});

export default useSlogan;
