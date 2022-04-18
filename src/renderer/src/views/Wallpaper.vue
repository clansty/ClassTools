<script setup lang="ts">
import useHomeworks from '../stores/homeworks';
import { computed } from 'vue';
import useSettings from '../stores/settings';
import { useNow } from '@vueuse/core';
import Weather from '../components/Weather/index.vue';

const homeworks = useHomeworks();
const settings = useSettings();

const now = useNow();

const backgroundStyle = computed(() => {
  let css = '';
  switch (settings.value.backgroundType) {
    case 'image':
      css += `background-image: url('file://${settings.value.backgroundImage}');`;
      break;
    case 'color':
      css += `background-color: ${settings.value.backgroundColor};`;
      break;
    case 'advanced':
      css += `background: ${settings.value.backgroundCss};`;
      break;
  }
  css += `font-size: ${settings.value.fontSize}px;`;
  css += `color: ${settings.value.fontColor};`;
  return css;
});

</script>

<template>
  <div class="container" :style="backgroundStyle">
    <n-grid x-gap="12" cols="3">
      <n-gi>
        <div>高考倒计时</div>
        <p>
          <n-time :time="now" format="yyyy-M-d H:mm:ss"/>
        </p>
        <Weather/>
      </n-gi>
      <n-gi>
        <div>天气</div>
      </n-gi>
      <n-gi>
        <div>作业</div>
        <p>
        </p>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
