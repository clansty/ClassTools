<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui';
import { RouterView } from 'vue-router';

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider placement="bottom-right">
      <RouterView/>
    </n-notification-provider>
  </n-config-provider>
</template>

<style>
body {
  margin: 0;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  font-family: BlinkMacSystemFont, "PingFang SC", "Microsoft Yahei", "MicrosoftJhengHei", sans-serif;
}

code {
  font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, Fira Code, Fira Mono, Menlo, Monospaced, monospace;
}

* {
  -webkit-user-drag: none;
}
</style>
