<script setup lang="ts">
import useHomeworks from '../stores/homeworks';
import dayjs from 'dayjs';
import { ref } from 'vue';

const homeworks = useHomeworks();

const getTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
// const getHomework = (id: string) => homeworks.find(h => h.id === id);
const time = ref(getTime());

setInterval(() => {
  time.value = getTime();
}, 1000);

</script>

<template>
  <n-grid x-gap="12" cols="4">
    <n-gi>
      <div>高考倒计时</div>
      <p>{{time}}</p>
    </n-gi>
    <n-gi>
      <div>天气</div>
    </n-gi>
    <n-gi>
      <div>作业</div>
      <p>
        {{ homeworks.chinese }}
      </p>
    </n-gi>
    <n-gi>
      <div>课程表</div>
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
</style>
