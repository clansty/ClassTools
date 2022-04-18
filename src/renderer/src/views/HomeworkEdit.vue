<script setup lang="ts">
import useHomeworks from '../stores/homeworks';
import useSettings from '../stores/settings';
import { computed } from 'vue';
import { isToday } from 'date-fns';
import useHistoryHomeworkList from '../stores/historyHomeworkList';
import useHistoryHomeworks from '../stores/historyHomeworks';

const homeworks = useHomeworks();
const historyHomeworkList = useHistoryHomeworkList();
const settings = useSettings();

const subjects = computed(() => settings.value.lessons
  .filter(lesson => lesson.hasHomework)
  .map(subject => subject.name));

const newDay = () => {
  useHistoryHomeworks(homeworks.value.date, homeworks.value);
  historyHomeworkList.value.push(homeworks.value.date);
  homeworks.value = {
    date: new Date().getTime(),
    homeworks: {},
  };
};
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <div style="display: flex">
        <n-h2 style="flex-grow: 1">
          <n-time :time="homeworks.date" format="M 月 d 日作业"/>
        </n-h2>
        <n-space>
          <n-button v-if="!isToday(homeworks.date)" @click="newDay">
            开启新的一天
          </n-button>
          <n-button @click="$router.push('/homeworkHistory')">
            历史作业
          </n-button>
        </n-space>
      </div>
      <n-form
        label-placement="left"
        label-width="auto"
      >
        <n-form-item
          v-for="subject in subjects"
          :label="subject"
        >
          <n-input type="textarea" v-model:value="homeworks.homeworks[subject]"
                   :placeholder="`${subject}作业`" :autosize="{minRows:2}"/>
        </n-form-item>
      </n-form>
    </n-layout-content>
  </n-layout>
</template>
