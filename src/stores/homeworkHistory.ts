import { useStorage } from '@vueuse/core';
import HomeworkRecord from '../types/HomeworkRecord';

const useHomeworkHistory = (date: number, homeworks: HomeworkRecord = { date, homeworks: {} }) =>
  useStorage(`homework${date}`, homeworks);

export default useHomeworkHistory;
