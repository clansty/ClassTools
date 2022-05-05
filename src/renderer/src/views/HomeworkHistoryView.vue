<script setup lang="ts">
import useHistoryHomeworks from '../stores/homeworkHistory';
import { useRoute, useRouter } from 'vue-router';
import HomeworkDisplay from '../components/HomeworkDisplay.vue';
import currentHomeworks from '../stores/homeworks';
import historyHomeworkList from '../stores/homeworkHistoryList';

const route = useRoute();
const router = useRouter();
const date = Number(route.params.date);
const homeworks = useHistoryHomeworks(date);

const setAsCurrent = () => {
  currentHomeworks.value = homeworks.value;
  historyHomeworkList.value.splice(historyHomeworkList.value.indexOf(date), 1);
  router.push('/homeworkEdit');
};
</script>

<template>
  <div>
    <div style="display: flex">
      <n-h2 style="flex-grow: 1">
        <n-time :time="homeworks.date" format="M 月 d 日作业"/>
      </n-h2>
      <n-button @click="setAsCurrent">
        设为当前
      </n-button>
    </div>
    <HomeworkDisplay :homeworks="homeworks.homeworks"/>
  </div>
</template>
