<script setup lang="ts">
import locale from '../language/zh_CN.yaml';
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
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <n-form-item
      v-for="subject in subjects"
      :label="subject"
    >
      <n-input type="text" v-model:value="homeworks.homeworks[subject]"/>
    </n-form-item>
  </n-form>
</template>
