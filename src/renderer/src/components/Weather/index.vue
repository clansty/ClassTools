<script setup lang="ts">
import useSettings from '../../stores/settings';
import { useIntervalFn } from '@vueuse/core';
import { ref, watch } from 'vue';
import { QWeather24h, QWeatherH5 } from '../../types/QWeather';
import Realtime from './Realtime.vue';
import Props from './Props.vue';
import Hourly from './Hourly.vue';

const PUBLIC_KEY = '0fffcb8f8d144d6294cd5f3c331d53da';
const QWEATHER_H5API = new URL('https://widget-api.heweather.net/s6/plugin/h5');
const QWEATHER_24HAPI = new URL('https://devapi.qweather.com/v7/weather/24h');

const settings = useSettings();

const dataH5 = ref<QWeatherH5>();
const data24h = ref<QWeather24h>();

// 更新天气数据
const fetchWeatherApi = async (url: URL, key: string) => {
  url.searchParams.set('key', key);
  url.searchParams.set('location', settings.value.city);
  const res = await fetch(url.toString());
  return await res.json();
};
const updateWeather = async () => {
  // h5api
  dataH5.value = await fetchWeatherApi(QWEATHER_H5API, PUBLIC_KEY);
  // 24h api 需要密钥
  if (!settings.value.weatherKey) return;
  data24h.value = await fetchWeatherApi(QWEATHER_24HAPI, settings.value.weatherKey);
};
useIntervalFn(updateWeather, 1000 * 60 * 5, { immediateCallback: true });
watch([() => settings.value.weatherKey, () => settings.value.city], updateWeather);
</script>

<template>
  <div class="weatherContainer"
       :style="`color: ${settings.weatherColor}; --color-secondary: ${settings.weatherColorSecondary}`">
    <!-- 第一行，左边显示温度和天气状态，右边显示原版第二行的参数 -->
    <div style="display: flex" v-if="dataH5">
      <Realtime :now="dataH5.now" v-if="settings.weatherComponents.includes('realtime')"/>
      <Props :now="dataH5.now" v-if="settings.weatherComponents.includes('props')"/>
    </div>
    <!-- 第二行 八小时天气（因为差不多只能显示八小时的） -->
    <hr/>
    <Hourly :data="data24h.hourly" v-if="data24h"/>
  </div>
</template>

<style lang="scss">
.weatherContainer {
  // 还是这个字体放在天气上好看qwq
  // 华文黑体永远滴神
  font-family: STHeiti, 华文细黑, "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", MingLiu, sans-serif;
  width: 21em;

  .secondary {
    color: var(--color-secondary);
  }

  hr {
    border: 0;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.22);
  }
}
</style>
