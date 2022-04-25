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
    <p v-for="session in scheduleToday" style="margin: 0.5em 2em">
      {{ session }}
    </p>
  </div>
</template>
