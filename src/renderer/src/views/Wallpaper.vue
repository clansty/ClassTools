<script setup lang="ts">
import useHomeworks from '../stores/homeworks';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import useSettings from '../stores/settings';

const homeworks = useHomeworks();
const settings = useSettings();

const getTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
// const getHomework = (id: string) => homeworks.find(h => h.id === id);
const time = ref(getTime());

setInterval(() => {
  time.value = getTime();
}, 1000);

const backgroundStyle = computed(() => {
  switch (settings.value.backgroundType) {
    case 'image':
      return `background-image: url('file://${settings.value.backgroundImage}')`;
    case 'color':
      return `background-color: ${settings.value.backgroundColor}`;
    case 'advanced':
      return `background: ${settings.value.backgroundCss}`;
  }
});

</script>

<template>
  <div class="container" :style="backgroundStyle">
    <n-grid x-gap="12" cols="4">
      <n-gi>
        <div>高考倒计时</div>
        <p>{{ time }}</p>
      </n-gi>
      <n-gi>
        <div>天气</div>
      </n-gi>
      <n-gi>
        <div>作业</div>
        <p>
        </p>
      </n-gi>
      <n-gi>
        <div>课程表</div>
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
