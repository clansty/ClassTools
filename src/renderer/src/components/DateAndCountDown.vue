<script setup lang="ts">
import { computed } from 'vue';
import useSettings from '../stores/settings';
import { useNow } from '@vueuse/core';

const settings = useSettings();
const now = useNow();

const countDown = computed(() =>
  Math.ceil((settings.value.countDownDate - now.value.getTime()) / (60 * 60 * 24 * 1000)));

const countDownStyle = computed(() => ({
  fontSize: settings.value.countDownSize + 'em',
  marginBlockStart: 0,
  marginBlockEnd: 1.5 + 'em',
}));
const conutDownTimeStyle = computed(() => ({
  color: settings.value.countDownColor,
}));
const dateStyle = computed(() => ({
  fontSize: settings.value.dateSize + 'em',
  marginBlock: '0.2em',
  fontVariantNumeric: 'tabular-nums',
}));
</script>

<template>
  <div>
    <p :style="dateStyle">
      <n-time :time="now" :format="settings.dateFormat"/>
    </p>
    <p :style="dateStyle" v-if="settings.timeFormat">
      <n-time :time="now" :format="settings.timeFormat"/>
    </p>
    <p :style="countDownStyle">
      距离{{ settings.countDownName }}
      <span :style="conutDownTimeStyle">{{ countDown }}</span>
      天
    </p>
  </div>
</template>
