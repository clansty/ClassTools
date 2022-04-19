<script setup lang="ts">
import { Hourly } from '../../types/QWeather';
import WeatherIcon from './WeatherIcon.vue';
import Degree from './Degree.vue';

const props = defineProps<{
  data: Hourly[]
}>();
</script>

<template>
  <n-grid cols="8">
    <n-gi v-for="hour in props.data.slice(0, 8)" style="text-align: center">
      <div style="font-size: 0.7em">
        <n-time :time="new Date(hour.fxTime)" format="H:mm"/>
      </div>
      <div style="display: flex; justify-content: center; margin: 0.35em 0; font-size: 1.2em">
        <WeatherIcon :id="hour.icon"/>
      </div>
      <div style="font-size: 0.9em">
        {{ hour.temp }}<Degree/>
      </div>
    </n-gi>
  </n-grid>
</template>
