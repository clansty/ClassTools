<script setup lang="ts">
import useSettings from '../stores/settings';
import { useNow } from '@vueuse/core';
import { computed } from 'vue';

const settings = useSettings();
const now = useNow();

const scheduleToday = computed(() =>
  settings.value.schedule.map(session => session[now.value.getDay()]));
</script>

<template>
  <div>
    <p v-for="session in scheduleToday" style="margin: 0.5em 2em">
      {{ session }}
    </p>
  </div>
</template>
