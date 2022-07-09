import useHistoryHomeworks from '../stores/homeworkHistory';
import homeworks from '../stores/homeworks';
import historyHomeworkList from '../stores/homeworkHistoryList';

export default () => {
  useHistoryHomeworks(homeworks.value.date, homeworks.value);
  historyHomeworkList.value.push(homeworks.value.date);
  homeworks.value = {
    date: new Date().getTime(),
    homeworks: {},
  };
};
