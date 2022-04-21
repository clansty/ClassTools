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
  color: settings.value.countDownColor,
}));
const dateStyle = computed(() => ({
  fontSize: settings.value.dateSize + 'em',
  marginBlock: '0.2em',
}));
</script>

<template>
  <div>
    <p :style="dateStyle">
      <n-time :time="now" format="yyyy 年 M 月 d 日"/>
    </p>
    <p style="margin-block-start: 0; margin-block-end: 1.5em">
      距离{{ settings.countDownName }}
      <span :style="countDownStyle">{{ countDown }}</span>
      天
    </p>
  </div>
</template>
