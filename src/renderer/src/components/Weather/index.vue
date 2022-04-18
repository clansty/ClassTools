<script setup lang="ts">
import useSettings from '../../stores/settings';
import { useIntervalFn } from '@vueuse/core';
import { ref, watch } from 'vue';
import { QWeather24h, QWeatherH5 } from '../../types/QWeather';

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

</template>
