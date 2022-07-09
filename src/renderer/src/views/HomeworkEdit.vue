<script setup lang="ts">
import homeworks from '../stores/homeworks';
import settings from '../stores/settings';
import { computed } from 'vue';
import { isToday } from 'date-fns';
import newDay from '../utils/newDay';

const subjects = computed(() => settings.value.lessons
  .filter(lesson => lesson.hasHomework)
  .map(subject => subject.name));
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <div style="display: flex">
        <n-h2 style="flex-grow: 1">
          <n-time :time="homeworks.date" format="M月d日作业"/>
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
                   :placeholder="`${subject}作业`" :autosize="{ minRows: 2 }"/>
        </n-form-item>
      </n-form>
    </n-layout-content>
  </n-layout>
</template>
