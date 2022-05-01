<script setup lang="ts">
import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui';
import { RouterView } from 'vue-router';

</script>

<template>
  <NConfigProvider :locale="zhCN" :dateLocale="dateZhCN">
    <RouterView/>
  </NConfigProvider>
</template>

<style>
body {
  margin: 0;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  font-family: BlinkMacSystemFont, "PingFang SC", "Microsoft Yahei", "MicrosoftJhengHei", sans-serif;
}

* {
  -webkit-user-drag: none;
}
</style>
