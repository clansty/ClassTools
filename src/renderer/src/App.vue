<script setup lang="ts">
import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui';
import RouterView from 'vue-router';

</script>

<template>
  <NConfigProvider :locale="zhCN" :dateLocale="dateZhCN">
    <RouterView/>
  </NConfigProvider>
</template>
