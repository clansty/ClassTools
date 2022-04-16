<script setup lang="ts">
import useHomeworks from '../stores/homeworks';
import useSettings from '../stores/settings';
import { computed } from 'vue';

const homeworks = useHomeworks();
const settings = useSettings();

const subjects = computed(() => settings.value.lessons
  .filter(lesson => lesson.hasHomework)
  .map(subject => subject.name));
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-h2>
        <n-time :time="homeworks.date" format="M 月 d 日作业"/>
      </n-h2>
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
