<script setup lang="ts">
import useSettings from '../stores/settings';
import { useNow } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<{
  weekday?: number
}>();

const settings = useSettings();
const now = useNow();

const scheduleToday = computed(() => // 这里不能用 ||，因为 0 也是假值，但是和 undefined 不一样
  settings.value.schedule.map(session => session[props.weekday !== undefined ? props.weekday : now.value.getDay()]));
</script>

<template>
  <div>
    <p v-for="session in settings.sessionsMorning" style="margin: 0.5em 2em">
      {{ scheduleToday[session - 1] }}
    </p>
    <div style="height: 0.5em;"/>
    <p v-for="session in settings.sessionsAfternoon" style="margin: 0.5em 2em">
      {{ scheduleToday[session - 1 + settings.sessionsMorning] }}
    </p>
    <div style="height: 0.5em;"/>
    <p v-for="session in settings.sessionsEvening" style="margin: 0.5em 2em">
      {{ scheduleToday[session - 1 + settings.sessionsMorning + settings.sessionsAfternoon] }}
    </p>
  </div>
</template>
