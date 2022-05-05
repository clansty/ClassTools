<script setup lang="ts">
import homeworks from '../stores/homeworks';
import { computed } from 'vue';
import settings from '../stores/settings';
import Weather from '../components/Weather/index.vue';
import SloganDisplay from '../components/SloganDisplay.vue';
import DateAndCountDown from '../components/DateAndCountDown.vue';
import HomeworkDisplay from '../components/HomeworkDisplay.vue';
import ScheduleDisplay from '../components/ScheduleDisplay.vue';

const backgroundStyle = computed(() => {
  let css: { [p: string]: string } = {};
  switch (settings.value.backgroundType) {
    case 'image':
      css.backgroundImage = `url('file://${settings.value.backgroundImage}')`;
      break;
    case 'color':
      css.backgroundColor = settings.value.backgroundColor;
      break;
    case 'advanced':
      css.background = settings.value.backgroundCss;
      break;
  }
  css.fontSize = settings.value.fontSize + 'vw';
  css.color = settings.value.fontColor;
  css.fontFamily = settings.value.font;
  return css;
});

</script>

<template>
  <n-layout has-sider>
    <n-layout-content>
      <div class="wallpaperContainer" :style="backgroundStyle">
        <n-grid x-gap="20" cols="3">
          <!-- -webkit-right 可以把天气的 div 也居右 -->
          <n-gi style="text-align: -webkit-right">
            <DateAndCountDown/>
            <Weather/>
          </n-gi>
          <n-gi>
            <SloganDisplay/>
          </n-gi>
          <n-gi style="display: flex">
            <HomeworkDisplay :homeworks="homeworks.homeworks" style="width: 0; flex-grow: 1"/>
            <ScheduleDisplay style="flex-shrink: 0"/>
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
