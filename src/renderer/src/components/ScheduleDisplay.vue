<script setup lang="ts">
import settings from '../stores/settings';
import { useNow } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<{
  weekday?: number
}>();

const now = useNow();

const scheduleToday = computed(() => // 这里不能用 ||，因为 0 也是假值，但是和 undefined 不一样
  settings.value.schedule.map(session => session[props.weekday !== undefined ? props.weekday : now.value.getDay()]));
const containerStyle = computed(() => ({
  fontSize: settings.value.scheduleSize + 'em',
}));
</script>

<template>
  <div :style="containerStyle">
    <p v-for="session in settings.sessionsMorning">
      {{ scheduleToday[session - 1] }}
    </p>
    <div style="height: 0.5em;"/>
    <p v-for="session in settings.sessionsAfternoon">
      {{ scheduleToday[session - 1 + settings.sessionsMorning] }}
    </p>
    <div style="height: 0.5em;"/>
    <p v-for="session in settings.sessionsEvening">
      {{ scheduleToday[session - 1 + settings.sessionsMorning + settings.sessionsAfternoon] }}
    </p>
  </div>
</template>

<style scoped lang="scss">
div {
  text-align: center;

  > p {
    margin: 0.5em 1.5em
  }
}
</style>
