<script setup lang="ts">
import Minimize from '../assets/icons/Minimize.svg';
import Close from '../assets/icons/Close.svg';
import Edit from '../assets/icons/Edit.svg';
import useSettings from '../stores/settings';
import { useNow } from '@vueuse/core';
import useHomeworks from '../stores/homeworks';
import { computed } from 'vue';
import ScheduleDisplay from '../components/ScheduleDisplay.vue';

const settings = useSettings();
const homeworks = useHomeworks();
const now = useNow();

// 需要把作业平均分配到设定好数量到组里
const groupedHomeworks = computed(() => {
  // 筛选有内容的
  const entries = Object.entries(homeworks.value.homeworks)
    .filter(([subject, content]) => content);
  const result: { [subject: string]: string }[] = Array(settings.value.homeworkViewerCols);
  // 这里不能用 fill，因为不然会全都变成同一个对象，只能一个个赋值
  for (let i = 0; i < settings.value.homeworkViewerCols; i++) {
    result[i] = {};
  }
  let current = 0;
  // 分散分配
  for (const [subject, content] of entries) {
    result[current][subject] = content;
    current++;
    if (current === settings.value.homeworkViewerCols) current = 0;
  }
  return result;
});
const tomorrowWeekday = computed(() =>
  new Date(now.value.getTime() + 1000 * 60 * 60 * 24).getDay());
const isScheduleShown = computed(() => // 要确保明天有课
  settings.value.showTomorrowSchedule && settings.value.schedule.some(session => session[tomorrowWeekday.value]));

const close = () => window.close();
</script>

<template>
  <n-layout position="absolute" :style="`font-size: ${settings.homeworkViewerSize}vw`">
    <n-layout-header class="header">
      <n-time :time="homeworks.date" format="yyyy 年 M 月 d 日作业" style="font-size: 1.3em"/>
      <!-- TODO: 值日生显示在这里 -->
    </n-layout-header>
    <n-layout-content has-sider position="absolute" style="top: 3.5em; bottom: 40px" content-style="padding: 0 1em">
      <!-- 不加这个 style 的话，子容器会被上下撑开 -->
      <n-grid x-gap="16" :cols="settings.homeworkViewerCols" style="align-items: flex-start;">
        <n-gi v-for="i in settings.homeworkViewerCols" style="display: grid; gap: 16px; grid-template-columns: 100%">
          <!-- 从 1 开始的，坏坏 -->
          <n-card v-for="(content, subject) in groupedHomeworks[i-1]" :title="subject"
                  style="--n-font-size: 1em; --n-title-font-size: 1.2em"
                  content-style="word-wrap: break-word; white-space: pre-wrap; font-size: 1em">
            {{ content }}
          </n-card>
        </n-gi>
      </n-grid>
      <!-- 把外层的 padding 抵掉，因为课表显示的时候不需要 padding -->
      <div style="flex-shrink: 0; margin-right: -1em" v-if="isScheduleShown">
        <p style="text-align: center; margin-top: 0"><b>明日课表</b></p>
        <ScheduleDisplay :weekday="tomorrowWeekday"/>
      </div>
    </n-layout-content>
    <n-layout-footer position="absolute" class="controlButtons">
      <!-- 控制按钮 -->
      <div style="font-size: 16px">
        <Edit/>
      </div>
      <div>
        <Minimize/>
      </div>
      <div class="close" @click="close">
        <Close/>
      </div>
    </n-layout-footer>
  </n-layout>
</template>

<style scoped lang="scss">
.header {
  height: 3.5em;
  padding: 0 1em;
  display: flex;
  align-items: center;
}

.controlButtons {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;

  div {
    width: 46px;
    color: #333333;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .1s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.close {
      &:hover {
        background-color: rgba(232, 17, 35, 0.9);
      }

      &:active {
        background-color: rgba(232, 17, 35, 0.5);
      }
    }
  }
}
</style>
