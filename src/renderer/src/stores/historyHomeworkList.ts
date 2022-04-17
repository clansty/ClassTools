import { useStorage } from '@vueuse/core';

const useHistoryHomeworkList = () => useStorage('historyHomeworkList', [] as number[]);

export default useHistoryHomeworkList;
