<script setup lang="ts">
import { QWeatherH5Now } from '../../types/QWeather';
import WeatherIcon from './WeatherIcon.vue';
import Degree from './Degree.vue';

const props = defineProps<{
  now: QWeatherH5Now
}>()
</script>

<template>
  <div style="flex-shrink: 0; width: 6em; display: flex; justify-content: center">
    <div>
      <div style="font-size: 2.7em">{{ now.tmp }}<Degree/></div>
      <!-- 下面这个 div 不 flex 会不居中，文字带 svg 通病 -->
      <div style="display: flex; align-items: center; padding-left: 0.15em">
        <WeatherIcon :id="now.cond_code"/>
        <span style="margin-left: 0.2em">{{ now.cond_txt }}</span>
      </div>
    </div>
  </div>
</template>
