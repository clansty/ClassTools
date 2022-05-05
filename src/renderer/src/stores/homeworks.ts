import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';
import HomeworkRecord from '../types/HomeworkRecord';

export default createAutoUpdateStorage('homeworks', {
  date: new Date().getTime(),
  homeworks: {},
} as HomeworkRecord);

// 本来以为 useStorage 不能实时同步 localStorage 的变化，只能获取 localStorage 的初始值，然后随着输入更新 localStorage，但是实际上可以实时同步 localStorage 的变化。
// 所以本来是准备用 pinia 然后自己写一个 pinia 的插件来同步 localStorage，现在不需要了，直接用 useStorage 就可以了。
