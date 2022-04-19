<script setup lang="ts">
import { QWeatherH5Now } from '../../types/QWeather';
import locale from '../../language/zh_CN.yaml';

const props = defineProps<{
  now: QWeatherH5Now
}>();
</script>

<template>
  <n-grid cols="2">
    <n-gi class="item">
      <div class="secondary">{{ locale.weather.props.pcpn }}</div>
      <div>{{ props.now.pcpn }}mm</div>
    </n-gi>
    <n-gi class="item">
      <div class="secondary">{{ locale.weather.props.hum }}</div>
      <div>{{ props.now.hum }}%</div>
    </n-gi>
    <n-gi class="item">
      <div class="secondary">{{ props.now.wind_dir }}</div>
      <div>{{ props.now.wind_sc }}级</div>
    </n-gi>
    <n-gi class="item">
      <div class="secondary">{{ locale.weather.props.pres }}</div>
      <div>{{ props.now.pres }}hpa</div>
    </n-gi>
  </n-grid>
</template>

<style scoped lang="scss">
.item {
  text-align: center;

  .secondary {
    font-size: 0.9em
  }
}
</style>
