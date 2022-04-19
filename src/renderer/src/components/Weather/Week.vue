<script setup lang="ts">
import { Daily } from '../../types/QWeather';
import WeatherIcon from './WeatherIcon.vue';
import Degree from './Degree.vue';
import locale from '../../language/zh_CN.yaml';

const props = defineProps<{
  data: Daily[]
}>();
</script>

<template>
  <n-grid cols="7">
    <n-gi v-for="day in props.data" style="text-align: center">
      <div style="font-size: 0.7em">
        <n-time :time="new Date(day.fxDate)" format="M/d"/>
      </div>
      <div style="font-size: 0.85em">
        {{ locale.weekdays[new Date(day.fxDate).getDay()] }}
      </div>
      <div style="display: flex; justify-content: center; margin: 0.35em 0; font-size: 1.2em">
        <WeatherIcon :id="day.iconDay"/>
      </div>
      <!--<div style="font-size: 0.85em">-->
      <!--  {{ day.textDay }}-->
      <!--</div>-->
      <div style="font-size: 0.9em">
        <!-- 不能让自动格式化把 Degree 放到新行，因为模板语法不是 jsx，不会自动删除不需要的空格 -->
        {{ day.tempMax }}<Degree/>
      </div>
      <div style="font-size: 0.9em; line-height: 0.5em">
        ~
      </div>
      <div style="font-size: 0.9em">
        <!-- 同 -->
        {{ day.tempMin }}<Degree/>
      </div>
      <div style="display: flex; justify-content: center; margin: 0.35em 0; font-size: 1.2em">
        <!-- 坏，H5 接口返回的图标 ID 不在数字上区分早晚，单独的七天 API 能返回，要换 API 了 -->
        <WeatherIcon :id="day.iconNight"/>
      </div>
      <div style="font-size: 0.8em">
        {{ day.windDirDay }}
      </div>
      <div style="font-size: 0.7em">
        {{ day.windScaleDay }}级
      </div>
    </n-gi>
  </n-grid>

</template>
