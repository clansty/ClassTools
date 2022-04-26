<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { computed, ref, watch } from 'vue';

const settings = useSettings();
const selectOptions = computed(() =>
  settings.value.lessons.map(lesson => ({ label: lesson.name, value: lesson.name })));

watch([() => settings.value.sessionsMorning, () => settings.value.sessionsMorning], ([morning, afternoon]) => {
  while (settings.value.schedule.length < morning + afternoon) {
    settings.value.schedule.push(new Array(7).fill(''));
  }
  // 多出来的话就不删了，这样减错了还能加回来
});
</script>

<template>
  <n-form inline label-placement="left">
    <n-form-item :label="locale.settings.sessionsMorning">
      <n-input-number v-model:value="settings.sessionsMorning"/>
    </n-form-item>
    <n-form-item :label="locale.settings.sessionsAfternoon">
      <n-input-number v-model:value="settings.sessionsAfternoon"/>
    </n-form-item>
    <n-form-item :label="locale.settings.sessionsEvening">
      <n-input-number v-model:value="settings.sessionsEvening"/>
    </n-form-item>
  </n-form>
  <n-grid x-gap="12" cols="7">
    <n-gi v-for="(name, weekday) in locale.weekdays">
      <p style="font-weight: bold">{{ name }}</p>
      <p v-for="session in settings.sessionsMorning">
        <n-select v-model:value="settings.schedule[session - 1][weekday]" filterable tag :options="selectOptions"/>
      </p>
      <!-- 设置为 0 的话，上下两个 p 的 margin 会合并。所以给它小一点的高度，中间的间隙会加上 p 的 margin -->
      <div style="height: 0.1em;"/>
      <p v-for="session in settings.sessionsAfternoon">
        <n-select v-model:value="settings.schedule[session - 1 + settings.sessionsMorning][weekday]"
                  filterable tag :options="selectOptions"/>
      </p>
      <div style="height: 0.1em;"/>
      <p v-for="session in settings.sessionsEvening">
        <n-select
          v-model:value="settings.schedule[session - 1 + settings.sessionsMorning + settings.sessionsAfternoon][weekday]"
          filterable tag :options="selectOptions"/>
      </p>
    </n-gi>
  </n-grid>
</template>
