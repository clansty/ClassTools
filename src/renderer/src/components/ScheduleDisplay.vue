<script setup lang="ts">
import useSettings from '../stores/settings';

const settings = useSettings();
const weekday = new Date().getDay();

</script>

<template>
  <div>
    <div v-for="(_, session) in settings.schedule" style="margin-bottom: 0.5em">
      <p>{{ settings.schedule[session][weekday] }}</p>
    </div>
  </div>
</template>
