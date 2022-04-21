<script setup lang="ts">
import useHomeworks from '../stores/homeworks';
import { computed } from 'vue';
import useSettings from '../stores/settings';
import { useNow } from '@vueuse/core';
import Weather from '../components/Weather/index.vue';
import SloganDisplay from '../components/SloganDisplay.vue';
import DateAndCountDown from '../components/DateAndCountDown.vue';
import HomeworkDisplay from '../components/HomeworkDisplay.vue';

const homeworks = useHomeworks();
const settings = useSettings();

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
  <n-layout has-sider>
    <n-layout-content>
      <div class="wallpaperContainer" :style="backgroundStyle">
        <n-grid x-gap="12" cols="3">
          <!-- -webkit-right 可以把天气的 div 也居右 -->
          <n-gi style="text-align: -webkit-right">
            <DateAndCountDown/>
            <Weather/>
          </n-gi>
          <n-gi>
            <SloganDisplay/>
          </n-gi>
          <n-gi>
            <HomeworkDisplay :homeworks="homeworks.homeworks"/>
          </n-gi>
        </n-grid>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss">
.wallpaperContainer {
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
