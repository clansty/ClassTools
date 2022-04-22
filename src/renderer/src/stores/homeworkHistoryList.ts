import { useStorage } from '@vueuse/core';

const useHomeworkHistoryList = () => useStorage('historyHomeworkList', [] as number[]);

export default useHomeworkHistoryList;
