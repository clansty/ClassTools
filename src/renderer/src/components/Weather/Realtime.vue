<script setup lang="ts">
import { QWeatherH5Now } from '../../types/QWeather';
import WeatherIcon from './WeatherIcon.vue';

const props = defineProps<{
  now: QWeatherH5Now
}>()
</script>

<template>
  <div style="flex-shrink: 0">
    <div style="font-size: 2.7em">{{ now.tmp }}°</div>
    <div style="display: flex; align-items: center; padding-left: 0.3em">
      <WeatherIcon :id="now.cond_code"/>
      <span style="margin-left: 0.2em">{{ now.cond_txt }}</span>
    </div>
  </div>
</template>
