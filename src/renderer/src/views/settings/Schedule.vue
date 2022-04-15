<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { computed, ref, watch } from 'vue';

const settings = useSettings();
const selectOptions = computed(() =>
  settings.value.lessons.map(lesson => ({ label: lesson.name, value: lesson.name })));

// 节次设置，节次在改的时候有点卡
const sessionCount = ref(settings.value.schedule.length);
watch(sessionCount, (count) => {
  while (settings.value.schedule.length < count) {
    settings.value.schedule.push(new Array(7).fill(''));
  }
  while (settings.value.schedule.length > count) {
    settings.value.schedule.pop();
  }
});
</script>

<template>
  <n-form-item
    :label="locale.settings.sessionCount"
    label-placement="left"
  >
    <n-input-number v-model:value="sessionCount"/>
  </n-form-item>
  <n-grid x-gap="12" cols="7">
    <n-gi v-for="(name, weekday) in locale.weekdays">
      <p>{{ name }}</p>
      <!-- 这里本来想用 n-dynamic-input 的但是它实在是太卡了 -->
      <p v-for="(_, session) in settings.schedule">
        <n-select v-model:value="settings.schedule[session][weekday]" filterable tag :options="selectOptions"/>
      </p>
    </n-gi>
  </n-grid>
</template>
